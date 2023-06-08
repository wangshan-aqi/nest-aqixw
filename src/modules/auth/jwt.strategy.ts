// jwt.strategy.ts文件定义默认使用JWT策略,可以定义多种策略模式
// 引入Strategy类 用于创建策略 ExtractJwt用于提取JWT 从请求中提取JWT 用于验证
import { Strategy, ExtractJwt } from 'passport-jwt';
// 引入PassportStrategy类 用于创建策略 用于验证
import { PassportStrategy } from '@nestjs/passport';

// 引入jwt配置文件
import { jwtConstants } from '../../common/constants';

// 引入Injectable装饰器
import { Injectable } from '@nestjs/common';

@Injectable()
// 继承PassportStrategy类 用于创建策略 用于验证
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    // 调用super方法 传入参数
    super({
      // jwtFromRequest用于提取JWT 从请求中提取JWT 用于验证
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // secretOrKey用于验证
      secretOrKey: jwtConstants.secret,
      ignoreExpiration: false // 是否忽略过期时间
    });
  }

  // token校验成功,会走到这里,否则会直接走401
  async validate(payload: any) {
    // 返回验证后的数据
    return { userId: payload.sub, username: payload.username };
  }
}
