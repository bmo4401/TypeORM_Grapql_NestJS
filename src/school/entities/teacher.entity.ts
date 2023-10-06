import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Subject } from './subject.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Gender } from 'src/school/types/school.types';
import { Course } from 'src/school/entities/course.entity';
@Entity()
@ObjectType()
/* @InputType('TeacherInput') */
export class Teacher {
  /* return field nullable */
  constructor(partial?: Partial<Teacher>) {
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn()
  @Field({ nullable: true, description: 'Id of user' })
  id: number;

  @Column()
  @Field()
  name: string;
  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.Other,
  })
  @Field(() => Gender)
  gender: Gender;
  /* teacher can has many subjects */
  @ManyToMany(() => Subject, (subject) => subject.teachers)
  /* if array need to declare type */
  @Field(() => [Subject])
  /* Lazy Database Relations */
  subjects: Promise<Subject[]>;

  @OneToMany(() => Course, (course) => course.teacher)
  @Field(() => [Course], { nullable: true })
  courses: Promise<Course[]>;
}
