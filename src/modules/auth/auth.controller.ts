import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  Session,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Public } from 'src/guard/decorator/jwt-auth.decorator';
import { ISignInUserRes } from './interface/res.interface';
import { ToolService } from 'src/common/tool.service';
import { Request, Response } from 'express';
// import { InjectRedis, Redis } from '@nestjs-modules/ioredis';

@Controller('auth')
// 设置路由是否公开 - 数组中的值为路由名称 - 与路由名称相同的路由将不会被 jwt-auth.guard.ts 拦截
@SetMetadata('isPublic', ['userNameLogin', 'emailLogin', 'telPhoneLogin'])
export class AuthController {
  constructor(
    // @InjectRedis() private readonly redis: Redis,
    private readonly authService: AuthService,
    private readonly toolService: ToolService,
  ) {}

  // 设置路由是否公开 使用了@Public()装饰器的路由将不会被 jwt-auth.guard.ts 拦截 - 但是会被本地策略拦截 单个路由设置
  // @Public()
  @UseGuards(AuthGuard('user-name'))
  @Post('userNameLogin')
  async loginForUserName(@Req() req: any): Promise<ISignInUserRes> {
    return await this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('email'))
  @Post('emailLogin')
  async loginForEmail(@Req() req: any): Promise<ISignInUserRes> {
    console.log(req, 'req.user');

    return await this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('tel-phone'))
  @Post('telPhoneLogin')
  async loginForTelPhone(@Req() req: any): Promise<ISignInUserRes> {
    return await this.authService.login(req.user);
  }

  @Public()
  @Get('authCode/:id') // 获取验证码
  async getAuthCode(@Req() req: Request, @Param('id') id: string, @Res() res: any) {
    const svgCaptcha = await this.toolService.captchaCode();
    res.type('image/svg+xml'); // 响应的类型
    res.send(svgCaptcha.data);
  }

  @Public()
  @Post('refresh') // 刷新token
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    console.log(req.body, 'req.body');

    const { refresh_token } = req.body;
    console.log(refresh_token, 'refresh_token');

    // const { userId } = await this.toolService.verifyToken(refresh_token);
    // const user = await this.authService.findOneUser(userId);
    // const access_token = this.authService.signToken(user);
    // const new_refresh_token = this.authService.signRefreshToken(user);
    // await this.redis.set(`user:${user.userId}`, new_refresh_token);
    // return res.json({
    //   access_token,
    //   refresh_token: new_refresh_token,
    // });
  }
}
