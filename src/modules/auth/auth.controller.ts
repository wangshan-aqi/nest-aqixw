import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Sign } from 'crypto';
import { UserNameSignInDto } from './dto/name.sign-in-dto';
import { EmailSignInDto } from './dto/email.sign-in-dto';
import { TelPhoneSignInDto } from './dto/phone.sign-in-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('user-name'))
  @Post('userNameLogin')
  async loginForUserName(@Body() body: UserNameSignInDto) {
    return await this.authService.login(body);
  }

  @UseGuards(AuthGuard('email'))
  @Post('emailLogin')
  async loginForEmail(@Body() body: EmailSignInDto) {
    return await this.authService.login(body);
  }

  @UseGuards(AuthGuard('tel-phone'))
  @Post('telPhoneLogin')
  async loginForTelPhone(@Body() body: TelPhoneSignInDto) {
    return await this.authService.login(body);
  }
}
