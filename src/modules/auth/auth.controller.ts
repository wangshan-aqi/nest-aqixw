import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in-dto';
import { LocalAuthGuard } from 'src/gurad/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signIn')
  async signIn(@Body() signInDto: SignInDto, @Request() req) {
    const res = await this.authService.signIn(signInDto);
    return res;
  }
}
