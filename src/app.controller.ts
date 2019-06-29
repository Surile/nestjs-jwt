import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './fetaure/auth/auth.service';

@Controller('api')
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/me')
  getProfile(@Request() req) {
    return req.user;
  }
}
