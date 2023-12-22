import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
// import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { Request } from 'express';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    // @InjectRedis() private readonly redis: Redis
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET, // 密钥
      passReqToCallback: true,
    });
  }

  async validate(req: Request, user: any) {
    // 登录 token
    const access_token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    // redis 缓存 token
    // const cacheToken = await this.redis.get(`user:${user.sub}`);

    // 判断缓存token
    // if (!cacheToken) {
    //   throw new UnauthorizedException('token已过期');
    // }

    if (!user) {
      throw new ForbiddenException('未授权');
    }
    return user;
  }
}
