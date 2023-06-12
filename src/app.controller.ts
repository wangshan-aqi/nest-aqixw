import { AuthService } from './modules/auth/auth.service';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './gurad/local-auth.guard';
import { SignInDto } from './modules/auth/dto/sign-in-dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
