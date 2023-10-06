import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { Gender } from 'src/school/types/school.types';

@InputType()
export class TeacherAddInput {
  @Field()
  @IsNotEmpty()
  @MinLength(2)
  name: string;
  @Field(() => Gender)
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;
}
