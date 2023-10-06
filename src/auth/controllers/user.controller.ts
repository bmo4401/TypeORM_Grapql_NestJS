import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/services/auth.service';
import { CreateUserDto } from 'src/auth/input/create.user.dto';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';

@Controller('users')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    let user = new User();
    if (createUserDto.password !== createUserDto.retypedPassword) {
      throw new BadRequestException(['Passwords are not identical']);
    }
    const existingUser = await this.userRepository.findOne({
      where: [
        {
          username: createUserDto.username,
        },
        {
          email: createUserDto.email,
        },
      ],
    });
    if (existingUser) {
      throw new BadRequestException(['username or email is already taken']);
    }
    user = {
      ...createUserDto,
      id: null,
      password: await this.authService.hashPassword(createUserDto.password),
    };
    return {
      ...(await this.userRepository.save(user)),
      token: this.authService.getTokenForUser(user),
    };
  }
}
