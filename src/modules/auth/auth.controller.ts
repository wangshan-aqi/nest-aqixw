import {
  Body,
  Controller,
  Post,
  Request,
  SetMetadata,
  UseGuards
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Sign } from 'crypto';
import { UserNameSignInDto } from './dto/name.sign-in-dto';
import { EmailSignInDto } from './dto/email.sign-in-dto';
import { TelPhoneSignInDto } from './dto/phone.sign-in-dto';
import { Public } from 'src/guard/decorator/jwt-auth.decorator';
import { ISignInUserRes } from './interface/res.interface';

@Controller('auth')
// 设置路由是否公开 - 数组中的值为路由名称 - 与路由名称相同的路由将不会被 jwt-auth.guard.ts 拦截
@SetMetadata('isPublic', ['userNameLogin', 'emailLogin', 'telPhoneLogin'])
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 设置路由是否公开 使用了@Public()装饰器的路由将不会被 jwt-auth.guard.ts 拦截 - 但是会被本地策略拦截 单个路由设置
  @Public()
  @UseGuards(AuthGuard('user-name'))
  @Post('userNameLogin')
  async loginForUserName(@Request() req: any): Promise<ISignInUserRes> {
    const user = await this.authService.login(req.user);
    return user;
  }

  @UseGuards(AuthGuard('email'))
  @Post('emailLogin')
  async loginForEmail(@Request() req: any): Promise<ISignInUserRes> {
    return await this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('tel-phone'))
  @Post('telPhoneLogin')
  async loginForTelPhone(@Request() req: any): Promise<ISignInUserRes> {
    return await this.authService.login(req.user);
  }
}
