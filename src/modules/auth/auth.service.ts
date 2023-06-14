import {
  BadRequestException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { RegistrationMethod } from '../users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserNameSignInDto } from './dto/name.sign-in-dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  //   async validateUser(
  //     username: string,
  //     pass: string,
  //     type: RegistrationMethod
  //   ): Promise<any> {
  async validateUser(
    type: RegistrationMethod,
    username: string,
    pass: string
  ): Promise<any> {
    const user = await this.usersService.findOneUserExist(type, username);
    /** 检查用户是否存在 */
    if (!user) throw new BadRequestException(`${username}用户未注册`);
    /** 检查密码和数据库中的密码是否匹配 返回布尔值 */
    const passwordValid = await bcrypt.compare(
      pass, // 用户输入的密码
      user.userPassword // 数据库中的密码
    );
    /** 检查密码是否有效 */
    if (!passwordValid) {
      throw new UnauthorizedException('密码错误！');
    }
    /** 如果密码有效，则返回token 和 除密码外的用户信息 */
    if (user && passwordValid) {
      const { userPassword, ...result } = user;
      // TODO: Generate a JWT and return it here
      // instead of the user object
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { userName: user.userName, userId: user.userId };
    return {
      access_token: this.signToken(payload)
    };
  }

  /** 生成token */
  signToken(user: any) {
    const payload = { username: user.userName, sub: user.userId };
    return this.jwtService.sign(payload);
  }
}
