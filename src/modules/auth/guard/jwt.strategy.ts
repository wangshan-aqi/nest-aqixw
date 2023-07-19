import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(@InjectRedis() private readonly redis: Redis) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET, // 密钥
      passReqToCallback: true,
    });
  }

  async validate(req, user: any) {
    const cache_access_token = await this.redis.get(`user:${user.sub}`);

    const access_token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    if (cache_access_token !== access_token) {
      throw new ForbiddenException('token令牌无效');
    }

    if (!user) {
      throw new ForbiddenException('未授权');
    }
    return user;
  }
}
