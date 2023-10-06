import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/services/auth.service';
import { CurrentUser } from 'src/auth/dtos/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @UseGuards(AuthGuard('local')) //call passport to verify credentials
  async login(@CurrentUser() user) {
    return {
      userId: user.id,
      token: this.authService.getTokenForUser(user),
    };
  }
  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@CurrentUser() user) {
    return user;
  }
}
