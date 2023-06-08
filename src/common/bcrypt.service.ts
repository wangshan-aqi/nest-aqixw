import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  private static readonly saltOrRounds = 10; // 加盐或者加密次数

  /**
   * 生成 hash
   * @param { string } rawStr 要加密的数据
   * @param { string } salt 用于哈希密码的盐。如果指定为数字，则将使用指定的轮数生成盐并将其使用。推荐 10
   */
  static async hash(rawStr: string, salt: string | number = this.saltOrRounds) {
    return await bcrypt.hash(rawStr, salt);
  }

  /**
   * 对比检查密码
   * @param { string } rawStr 要比较的数据, 使用登录时传递过来的密码
   * @param { string } hashedStr 要比较的数据, 使用从数据库中查询出来的加密过的密码
   */
  static async compare(rawStr: string, hashedStr: string) {
    return await bcrypt.compare(rawStr, hashedStr);
  }
}
