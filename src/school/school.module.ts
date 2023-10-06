import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';
import { Teacher } from './entities/teacher.entity';
/* import { TrainingController } from './controllers/training.controller'; */
import { TeacherResolver } from 'src/school/resolvers/teacher.resolver';
import { SubjectResolver } from 'src/school/resolvers/subject.resolver';
import { CourseResolver } from 'src/school/resolvers/course.resolver';
import { Course } from 'src/school/entities/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subject, Teacher, Course])],
  providers: [TeacherResolver, SubjectResolver, CourseResolver],
  /*   controllers: [TrainingController], */
})
export class SchoolModule {}
