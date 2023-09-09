import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { RegistrationMethod } from '../users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ISignInUserRes } from './interface/res.interface';
import { decryptedText } from 'src/shard/constant';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';

@Injectable()
export class AuthService {
  constructor(
    @InjectRedis() private readonly redis: Redis,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(type: RegistrationMethod, username: string, pass: string): Promise<any> {
    switch (type) {
      case RegistrationMethod.USER_NAME:
        if (!username || !pass) throw new BadRequestException('用户名或密码不能为空');
        break;
      case RegistrationMethod.EMAIL:
        if (!username || !pass) throw new BadRequestException('邮箱或密码不能为空');
        break;
      case RegistrationMethod.PHONE:
        if (!username || !pass) throw new BadRequestException('手机号或密码不能为空');
        break;
    }
    const user = await this.usersService.findOneUserExist(type, username);

    /** 检查用户是否存在 */
    // if (!user) throw new BadRequestException(`用户未注册`);
    if (!user) throw new BadRequestException(this.getNoExist(type, 0));
    /** 检查密码和数据库中的密码是否匹配 返回布尔值 */
    const passwordValid = await bcrypt.compare(
      pass, // 用户输入的密码
      user.userPassword, // 数据库中的密码
    );
    /** 检查密码是否有效 */
    if (!passwordValid) {
      // throw new UnauthorizedException('密码错误！');
      throw new UnauthorizedException(this.getNoExist(type, 1));
    }
    /** 如果密码有效，则返回token 和 除密码外的用户信息 */
    if (user && passwordValid) {
      const { userPassword, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any): Promise<ISignInUserRes> {
    const access_token = this.signToken(user);
    const refresh_token = this.signRefreshToken(user);
    await this.redis.set(`user:${user.userId}`, refresh_token);

    return await {
      userId: user.userId,
      userName: user.userName,
      access_token, // 生成token
      refresh_token, // 生成RefreshToken
    };
  }

  /** 生成token */
  signToken(user: any) {
    const payload = { username: user.userName, sub: user.userId };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_ACCESS_TOKEN_TTL + 's', // 过期时间
    });
  }

  /** 生成RefreshToken */
  signRefreshToken(user: any) {
    const payload = {
      type: 'refresh',
      username: user.userName,
      sub: user.userId,
    };
    return this.jwtService.sign(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET, // 密钥
      expiresIn: process.env.REFRESH_TOKEN_TTL, // 过期时间
    });
  }

  /** 获取用户不存在的提示信息 */
  getNoExist(type, status) {
    if (status === 1) {
      switch (type) {
        case RegistrationMethod.USER_NAME:
          return '用户名或密码错误';
        case RegistrationMethod.EMAIL:
          return '邮箱或密码错误';
        case RegistrationMethod.PHONE:
          return '手机号或密码错误';
      }
    }
    if (status === 0) {
      switch (type) {
        case RegistrationMethod.USER_NAME:
          return '用户名未注册';
        case RegistrationMethod.EMAIL:
          return '邮箱未注册';
        case RegistrationMethod.PHONE:
          return '手机号未注册';
      }
    }
  }
}
