import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'src/auth/controllers/auth.controller';
import { AuthService } from 'src/auth/services/auth.service';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { LocalStrategy } from 'src/auth/strategies/local.strategy';
import { UserController } from 'src/auth/controllers/user.controller';
import { User } from 'src/auth/entities/user.entity';
import { UserResolver } from 'src/auth/resolvers/user.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.AUTH_SECRET,
        signOptions: {
          expiresIn: '60m',
        },
      }),
    }),
  ],
  controllers: [AuthController, UserController],
  providers: [LocalStrategy, JwtStrategy, AuthService, UserResolver],
})
export class AuthModule {}
