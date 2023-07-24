/* eslint-disable prettier/prettier */
import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.services';
console.log('AQUI');
@Controller()
export class AppController {
  constructor(private authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    console.log('AQUI', req);
    return { success: true };
  }
}
