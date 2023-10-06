import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Subject } from 'src/school/entities/subject.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Teacher } from './teacher.entity';

@Entity()
@ObjectType()
/* @InputType('SubjectInput') */
/* if don't declare name for input or object a conflict will occur */
export class Course {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { nullable: true })
  id: number;

  @ManyToOne(() => Subject, (subject) => subject.courses)
  @Field(() => Subject, { nullable: true })
  subject: Promise<Subject>;

  @ManyToOne(() => Teacher, (teacher) => teacher.courses)
  @Field(() => Teacher, { nullable: true })
  teacher: Promise<Teacher>;
}
