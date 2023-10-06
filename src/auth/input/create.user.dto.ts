import { Length } from 'class-validator';

export class CreateUserDto {
  @Length(5)
  username: string;
  password: string;
  retypedPassword: string;
  firstName: string;
  lastName: string;
  email: string;
}
