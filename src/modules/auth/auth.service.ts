import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  UnauthorizedException
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/sign-in-dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}
  // 在这里，我们创建了validateUser 方法来检查来自user.model 的用户是否与数据库中的用户记录匹配。
  // 如果没有匹配，该方法返回一个null 的值。
  // 如果有匹配，该方法返回一个包含用户信息的对象，但是不包含密码。
  async validateUser(signInDto: SignInDto): Promise<any> {
    const user = await this.usersService.findOneUserExist(signInDto);
    console.log(user, 'user--');

    /** 检查用户是否存在 */
    if (!user) throw new BadRequestException(`用户${signInDto.userName}未注册`);
    /** 检查密码和数据库中的密码是否匹配 返回布尔值 */
    const passwordValid = await bcrypt.compare(
      signInDto.userPassword, // 用户输入的密码
      user.userPassword // 数据库中的密码
    );
    console.log(passwordValid, 'passwordValid');

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

  // 创建signIn 方法，该方法使用jwtService.sign 方法
  // 为从我们的validate 中返回的用户生成一个JWT访问令牌LocalStrategy 。
  async signIn(user: any) {
    const payload = { username: user.userName, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}
