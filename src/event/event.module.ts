import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendee } from 'src/event/entities/attendee.entity';

import { EventsController } from 'src/event/controllers/event.controller';
import { Event } from 'src/event/entities/event.entity';
import { EventsService } from 'src/event/services/event.service';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Attendee])],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventModule {}
