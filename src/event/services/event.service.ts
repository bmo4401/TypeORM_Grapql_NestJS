import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttendeeAnswerEnum } from 'src/event/entities/attendee.entity';
import { Event } from 'src/event/entities/event.entity';
import { ListEvents, WhenEventFiler } from 'src/event/input/list.event';
import { PaginateOptions, paginate } from 'src/pagination/paginator';
import { DeleteResult, Repository } from 'typeorm';

export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,
  ) {}
  private readonly logger = new Logger(EventsService.name);
  private getEventsBaseQuery() {
    return this.eventsRepository
      .createQueryBuilder('e')
      .orderBy('e.id', 'DESC');
  }

  public getEventsWithAttendeeCountQuery() {
    return this.getEventsBaseQuery()
      .loadRelationCountAndMap('e.attendeeCount', 'e.attendees')
      .loadRelationCountAndMap(
        'e.attendeeAccepted',
        'e.attendees',
        'attendee',
        (qb) =>
          qb.where('attendee.answer = :answer', {
            answer: AttendeeAnswerEnum.Accepted,
          }),
      )
      .loadRelationCountAndMap(
        'e.attendeeMaybe',
        'e.attendees',
        'attendee',
        (qb) =>
          qb.where('attendee.answer = :answer', {
            answer: AttendeeAnswerEnum.Maybe,
          }),
      )
      .loadRelationCountAndMap(
        'e.attendeeAccepted',
        'e.attendees',
        'attendee',
        (qb) =>
          qb.where('attendee.answer = :answer', {
            answer: AttendeeAnswerEnum.Rejected,
          }),
      );
  }

  private async getEventsWithAttendeeCountFiltered(filter?: ListEvents) {
    console.log('❄️ ~ file: event.service.ts:53 ~ filter:', filter);
    let query = this.getEventsWithAttendeeCountQuery();
    if (!filter) return await query;
    if (filter.when == WhenEventFiler.Today) {
      query = query.andWhere(
        `e.when >= CURRENT_DATE AND e.when <= CURRENT_DATE + INTERVAL '1 day' `,
      );
    }

    if (filter.when == WhenEventFiler.Tomorrow) {
      query = query.andWhere(
        `e.when >= CURRENT_DATE() + INTERVAL '1 day' AND e.when <= CURRENT_DATE() + INTERVAL '2 day' `,
      );
    }
    if (filter.when == WhenEventFiler.ThisWeek) {
      query = query.andWhere(
        'EXTRACT(WEEK FROM CURRENT_DATE) =  EXTRACT(WEEK FROM e.when)',
      );
    }
    if (filter.when == WhenEventFiler.NextWeek) {
      query = query.andWhere(
        "EXTRACT(WEEK FROM CURRENT_DATE  + INTERVAL '1 week') =  EXTRACT(WEEK FROM e.when)",
      );
    }
    return query;
  }
  public async getEventsWithAttendeeCountFilteredPaginated(
    filter: ListEvents,
    paginateOptions: PaginateOptions,
  ) {
    return await paginate(
      await this.getEventsWithAttendeeCountFiltered(filter),
      paginateOptions,
    );
  }
  public async getEvent(id: number): Promise<Event | undefined> {
    const query = this.getEventsWithAttendeeCountQuery().andWhere(
      'e.id = :id',
      {
        id,
      },
    );
    this.logger.debug(query.getSql());
    return await query.getOne();
  }

  public async deleteEvent(id: number): Promise<DeleteResult> {
    return await this.eventsRepository
      .createQueryBuilder('e')
      .delete()
      .where('id = :id', { id })
      .execute();
  }
}
