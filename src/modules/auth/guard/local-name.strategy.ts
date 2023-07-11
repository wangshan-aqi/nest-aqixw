import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Request } from 'express';
import { RegistrationMethod } from '../../users/dto/create-user.dto';
import { decryptedText } from '../../../shard/constant';

// 本地策略 - 用户名
@Injectable()
export class UserNameLocalStrategy extends PassportStrategy(Strategy, 'user-name') {
  constructor(private readonly authService: AuthService) {
    super({
      // 用于验证的字段
      usernameField: 'userName',
      passwordField: 'userPassword',
    });
  }

  // 本地策略验证 - 返回值为用户信息 - 用于生成token - 在auth.controller.ts中使用
  // 用@Request() req: any接收
  async validate(username: string, pass: string): Promise<any> {
    const decryptUserName = decryptedText(username);
    const decryptPass = decryptedText(pass);

    const user = await this.authService.validateUser(
      RegistrationMethod.USER_NAME,
      decryptUserName,
      decryptPass,
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
