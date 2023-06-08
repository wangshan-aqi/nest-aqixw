import {
  Injectable,
  NotAcceptableException,
  UnauthorizedException
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}
  // 在这里，我们创建了validateUser 方法来检查来自user.model 的用户是否与数据库中的用户记录匹配。
  // 如果没有匹配，该方法返回一个null 的值。

  async validateUser(userName: string, password: string): Promise<any> {
    const user = await this.usersService.findOneUserForUserName(userName);
    console.log(user, 'user');
    if (!user) return null;
    // const passwordValid = await bcrypt.compare(password, user.userPassword);
    if (!user) throw new NotAcceptableException();
    if (user?.userPassword !== password) {
      throw new UnauthorizedException();
    }
    if (user && user.userPassword === password) {
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
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}
