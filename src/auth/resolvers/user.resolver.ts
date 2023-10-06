import { Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';

@Resolver(() => User)
export class UserResolver {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
  @Query(() => [User])
  public async users(): Promise<User[]> {
    return await this.usersRepository.find();
  }
}
