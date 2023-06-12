// jwt.strategy.ts文件定义默认使用JWT策略,可以定义多种策略模式
// 引入Strategy类 用于创建策略 ExtractJwt用于提取JWT 从请求中提取JWT 用于验证
import { Strategy, ExtractJwt } from 'passport-jwt';
// 引入PassportStrategy类 用于创建策略 用于验证
import { PassportStrategy } from '@nestjs/passport';

// 引入jwt配置文件
import { jwtConstants } from '../../common/constants';

// 引入Injectable装饰器
import { Injectable, UnauthorizedException } from '@nestjs/common';

// 引入AuthService
import { AuthService } from './auth.service';

@Injectable()
// 继承PassportStrategy类 用于创建策略 用于验证
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    // 引入AuthService
    private readonly authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret,
      ignoreExpiration: false // 是否忽略过期时间
    });
  }

  async validate(payload: any) {
    // 返回验证后的数据
    const existUser = await this.authService.validateUser(payload);

    if (!existUser) {
      throw new UnauthorizedException('token验证失败');
    }
    return existUser;
  }
}
