import { IsNotEmpty, Length } from 'class-validator';
import { group } from 'console';

export class CreateEventDto {
  id?: number;
  @IsNotEmpty()
  @Length(50, 255, { groups: ['create'] })
  name: string;
  description: string;
  when?: Date;
  address: string;
}
