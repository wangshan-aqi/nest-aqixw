// jwt.strategy.ts文件定义默认使用JWT策略,可以定义多种策略模式
// 引入Strategy类 用于创建策略 ExtractJwt用于提取JWT 从请求中提取JWT 用于验证
import { Strategy, ExtractJwt } from 'passport-jwt';
// 引入PassportStrategy类 用于创建策略 用于验证
import { PassportStrategy } from '@nestjs/passport';

// 引入jwt配置文件
import { jwtConstants } from '../../common/constants';

// 引入Injectable装饰器
import { Injectable } from '@nestjs/common';

// 引入AuthService
import { AuthService } from './auth.service';

@Injectable()
// 继承PassportStrategy类 用于创建策略 用于验证
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    // 引入AuthService
    private readonly authService: AuthService
  ) {
    // 调用super方法 传入参数
    super({
      // jwtFromRequest用于提取JWT 从请求中提取JWT 用于验证
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // secretOrKey用于验证
      secretOrKey: jwtConstants.secret,
      ignoreExpiration: false // 是否忽略过期时间
    });
  }
  // 我们还实现了validate() 方法，Passport中间件将调用该方法，使用适当的策略特定的参数集验证用户。
  // token校验成功,会走到这里,否则会直接走401
  /** 
   * q: 这里的validate方法是什么时候调用的呢?
   * a: 在jwt.strategy.ts文件中,我们继承了PassportStrategy类,并且调用了super方法,传入了参数
      这里的super方法,会调用PassportStrategy类的构造函数,并且传入参数
      在PassportStrategy类的构造函数中,会调用validate方法,并且传入参数
      所以,这里的validate方法,是在PassportStrategy类的构造函数中调用的*/
  async validate(payload: any) {
    // 返回验证后的数据
    const user = await this.authService.validateUser(
      payload.userName,
      payload.password
    );
  }
}
