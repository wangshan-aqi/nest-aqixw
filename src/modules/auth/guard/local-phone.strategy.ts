import { RegistrationMethod } from '../../users/dto/create-user.dto';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { decryptedText } from 'src/shard/constant';

// 本地策略 - 手机号
@Injectable()
export class TelPhoneLocalStrategy extends PassportStrategy(Strategy, 'tel-phone') {
  constructor(private readonly authService: AuthService) {
    super({
      // 用于验证的字段
      usernameField: 'telPhone',
      passwordField: 'userPassword',
    });
  }

  async validate(telPhone: string, pass: string): Promise<any> {
    const decryptTelPhone = decryptedText(telPhone);
    const decryptPass = decryptedText(pass);
    const user = await this.authService.validateUser(
      RegistrationMethod.PHONE,
      decryptTelPhone,
      decryptPass,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
