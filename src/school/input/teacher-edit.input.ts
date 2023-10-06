import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { TeacherAddInput } from 'src/school/input/teacher-add.input';
import { Gender } from 'src/school/types/school.types';

@InputType()
export class TeacherEditInput extends PartialType(
  OmitType(TeacherAddInput, ['name']),
) {}
