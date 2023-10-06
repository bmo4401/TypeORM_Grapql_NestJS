import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Profile } from 'src/auth/entities/profile.entity';
import { User } from 'src/auth/entities/user.entity';
import { Attendee } from 'src/event/entities/attendee.entity';
import { Event } from 'src/event/entities/event.entity';
import { Course } from 'src/school/entities/course.entity';
import { Subject } from 'src/school/entities/subject.entity';
import { Teacher } from 'src/school/entities/teacher.entity';

export default registerAs(
  'orm.config',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Event, , Attendee, User, Profile, Teacher, Subject, Course],
    synchronize: true,
  }),
);
