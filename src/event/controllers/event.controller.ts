import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendee } from 'src/event/entities/attendee.entity';
import { Event } from 'src/event/entities/event.entity';
import { CreateEventDto } from 'src/event/input/create-event.dto';
import { ListEvents } from 'src/event/input/list.event';
import { UpdateEventDto } from 'src/event/input/update-event.dto';
import { EventsService } from 'src/event/services/event.service';
import { Like, MoreThan, MoreThanOrEqual, Repository } from 'typeorm';

@Controller('/events')
export class EventsController {
  private readonly logger = new Logger(EventsController.name);
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(Attendee)
    private readonly attendeeRepository: Repository<Attendee>,
    private readonly eventsService: EventsService,
  ) {}
  @Get()
  @UsePipes(new ValidationPipe({ transform: true })) //convert string to number
  async findAll(@Query() filter: ListEvents) {
    return await this.eventsService.getEventsWithAttendeeCountFilteredPaginated(
      filter,
      {
        total: true,
        currentPage: filter.page,
        limit: 10,
      },
    );
  }
  @Get('/create/attendee')
  async createAttendee() {
    const event = await this.eventRepository.findOne({
      where: {
        id: 5,
      },
      relations: ['attendees'],
    });
    console.log('❄️ ~ file: event.controller.ts:54 ~ event:', event);
    const attendee = new Attendee();
    attendee.name = 'BMO';

    event.attendees.push(attendee);
    const res = await this.eventRepository.save(event);
    /*     const res = await this.attendeeRepository.save({
      event,
      name: 'BMO',
    }); */
    return res;
  }
  @Get('/practice2')
  async practice2() {
    return await this.eventRepository.find({
      where: [
        {
          attendees: {
            id: MoreThan(4),
          },
        },
      ],
      relations: { attendees: true },
    });
  }

  @Get('/practice')
  async practice() {
    const event = await this.eventRepository.find({
      where: [
        {
          id: MoreThanOrEqual(3),
          description: Like('%talk%'),
        },

        {},
      ],
    });
    return event;
  }
  @Get(':id')
  async findOne(@Param('id') id) {
    return await this.eventsService.getEvent(id);
  }
  @Post()
  async create(
    @Body(new ValidationPipe({ groups: ['create'] })) input: CreateEventDto,
  ) {
    console.log('❄️ ~ file: event.controller.ts:47 ~ input:', input);
    return await this.eventRepository.save({
      ...input,
      when: new Date(),
    });
  }
  @Patch()
  async update(@Body() input: UpdateEventDto) {
    return await this.eventRepository.save({
      ...input,
      when: new Date(),
    });
  }
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id) {
    const result = await this.eventsService.deleteEvent(id);
    if (result?.affected !== 1) {
      throw new NotFoundException();
    }
  }
}
