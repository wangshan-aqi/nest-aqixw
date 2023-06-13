import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, RegistrationMethod } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import { BcryptService } from 'src/common/bcrypt.service';
import { SignInDto } from '../auth/dto/sign-in-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly usersRepository: Repository<Users>
  ) {}
  /** 邮箱注册 */
  async createUsersForEmail(createUserDto: CreateUserDto): Promise<number> {
    const user = new Users(); // 创建一个用户实例
    const isExist = await this.findOneByUser(createUserDto, '邮箱已存在');
    user.email = createUserDto.email;
    user.userPassword = createUserDto.userPassword;
    if (!isExist) {
      const res = await this.usersRepository.save(user);
      return res.userId;
    }
  }
  /** 手机号注册 */
  async createUsersForPhone(createUserDto: CreateUserDto): Promise<number> {
    const user = new Users(); // 创建一个用户实例
    const isExist = await this.findOneByUser(createUserDto, '手机号已存在');
    user.telPhone = createUserDto.telPhone;
    user.userPassword = createUserDto.userPassword;
    if (!isExist) {
      const res = await this.usersRepository.save(user);
      return res.userId;
    }
  }
  /** 用户名注册 */
  async createUsersForUserName(createUserDto: CreateUserDto): Promise<number> {
    const user = new Users(); // 创建一个用户实例
    const isExist = await this.findOneByUser(createUserDto, '用户名已存在');
    user.userName = createUserDto.userName;
    user.userPassword = createUserDto.userPassword;
    if (!isExist) {
      const res = await this.usersRepository.save(user);
      return res.userId;
    }
  }

  findAll() {
    return `This action returns all users`;
  }
  // 根据id查询用户
  async findOne(username: string): Promise<Users> {
    const res = await this.usersRepository.findOne({
      where: {
        userName: username
      }
    });
    return res;
  }

  // 查询用户是否存在
  async findOneUserExist(payload: SignInDto): Promise<Users> {
    let res = null;
    const searchMap = {
      [RegistrationMethod.EMAIL]: { email: payload.email },
      [RegistrationMethod.PHONE]: { telPhone: payload.telPhone },
      [RegistrationMethod.USER_NAME]: { userName: payload.userName }
    };
    switch (payload.registrationMethod) {
      case RegistrationMethod.EMAIL:
        res = await this.usersRepository.findOneBy(
          searchMap[payload.registrationMethod]
        );
        if (!res) this.errorFun('邮箱未注册');
        return res;
      case RegistrationMethod.PHONE:
        res = await this.usersRepository.findOneBy(
          searchMap[payload.registrationMethod]
        );
        if (!res) this.errorFun('手机号未注册');
        return res;
      case RegistrationMethod.USER_NAME:
        res = await this.usersRepository.findOneBy(
          searchMap[payload.registrationMethod]
        );
        if (!res) this.errorFun('用户名未注册');
        return res;
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  /** 根据手机号/邮箱/用户名查询用户 */
  async findOneByUser(payload: CreateUserDto, message: string): Promise<Users> {
    const searchMap = {
      [RegistrationMethod.EMAIL]: { email: payload.email },
      [RegistrationMethod.PHONE]: { telPhone: payload.telPhone },
      [RegistrationMethod.USER_NAME]: { userName: payload.userName }
    };

    let res = null;
    switch (payload.registrationMethod) {
      case RegistrationMethod.EMAIL:
        res = await this.usersRepository.findOneBy(
          searchMap[payload.registrationMethod]
        );
        if (res) this.errorFun('邮箱已注册');
        break;
      case RegistrationMethod.PHONE:
        res = await this.usersRepository.findOneBy(
          searchMap[payload.registrationMethod]
        );
        if (res) this.errorFun('手机号已注册');
        break;
      case RegistrationMethod.USER_NAME:
        res = await this.usersRepository.findOneBy(
          searchMap[payload.registrationMethod]
        );
        if (res) this.errorFun('用户名已注册');
        break;
    }
    return res;
  }

  /** 判断用户是否存在 返回错误信息 */
  errorFun(message: string) {
    throw new HttpException({ message }, HttpStatus.BAD_REQUEST);
  }
}
