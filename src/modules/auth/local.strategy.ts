import { SignInDto } from './dto/sign-in-dto';
import { Strategy, IStrategyOptions } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(signInDto: SignInDto): Promise<any> {
    console.log(signInDto, 'userName, password');

    const user = await this.authService.validateUser(signInDto);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
