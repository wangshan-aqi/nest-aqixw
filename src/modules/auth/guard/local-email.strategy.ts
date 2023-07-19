import { RegistrationMethod } from '../../users/dto/create-user.dto';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { decryptedText } from 'src/shard/constant';

// 本地策略 - 邮箱
@Injectable()
export class EmailLocalStrategy extends PassportStrategy(Strategy, 'email') {
  constructor(private readonly authService: AuthService) {
    super({
      // 用于验证的字段
      usernameField: 'email',
      passwordField: 'userPassword',
    });
  }

  async validate(email: string, pass: string): Promise<any> {
    const decryptEmail = decryptedText(email);
    const decryptPass = decryptedText(pass);

    const user = await this.authService.validateUser(
      RegistrationMethod.EMAIL,
      decryptEmail,
      decryptPass,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
