import { Injectable } from '@nestjs/common';
import { CreateUserPhoneDto } from './dto/create-user-phone.dto';
import { CreateUserEmailDto } from './dto/create-user-email.dto';
import { UpdateUserPhoneDto } from './dto/update-user-phone.dto';
import { UpdateUserEmailDto } from './dto/update-user-email.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import { BcryptService } from 'src/common/bcrypt.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly usersRepository: Repository<Users>
  ) {}
  /** 邮箱注册 */
  async createEmailUsers(createUserPhoneDto: CreateUserPhoneDto) {
    const user = new Users();
    user.userName = createUserPhoneDto.userName;
    user.userPassword = createUserPhoneDto.userPassword;
    // user.email = createUserPhoneDto.email;
    user.telPhone = createUserPhoneDto.telPhone;
    user.avatar = createUserPhoneDto.avatar;
    user.introduce = createUserPhoneDto.introduce;
    user.gander = createUserPhoneDto.gander;

    const res = await this.usersRepository.save(user);
    return res.userId;
  }

  /** 手机号注册 */
  async createPhoneUsers(createUserPhoneDto: CreateUserPhoneDto) {
    const user = new Users();
    const passwordValid = await BcryptService.hash(
      createUserPhoneDto.userPassword
    );

    user.userName = createUserPhoneDto.userName;
    user.userPassword = passwordValid;
    // user.email = createUserPhoneDto.email;
    user.telPhone = createUserPhoneDto.telPhone;
    user.avatar = createUserPhoneDto.avatar;
    user.introduce = createUserPhoneDto.introduce;
    user.gander = createUserPhoneDto.gander;

    const res = await this.usersRepository.save(user);
    return res.userId;
  }

  findAll() {
    return `This action returns all users`;
  }
  // 根据id查询用户
  async findOne(id: number) {
    const res = await this.usersRepository.findOne({
      where: {
        userId: id
      }
    });
    return res;
  }

  // 根据用户名查询用户
  async findOneUserForUserName(userName: string): Promise<Users | null> {
    const res = await this.usersRepository.findOne({ where: { userName } });
    return res;
  }

  update(id: number, updateUserPhoneDto: UpdateUserPhoneDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  /** 根据手机号查询用户 */
  async findOneByTelPhone(
    telPhone: string
  ): Promise<{ type: string; res: Users }> {
    const res = await this.usersRepository.findOne({ where: { telPhone } });
    if (!res) {
      return null;
    }
    return { type: '手机号', res };
  }

  /** 根据手机号查询用户 */
  async findOneByEmail(email: string): Promise<{ type: string; res: Users }> {
    const res = await this.usersRepository.findOne({ where: { email } });
    if (!res) {
      return null;
    }
    return { type: '邮箱', res };
  }
}
