import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, RegistrationMethod } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import { BcryptService } from 'src/common/bcrypt.service';
import { FindUserDto } from './dto/find-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly usersRepository: Repository<Users>
  ) {}
  /** 邮箱注册 */
  async createUsers(createUserDto: CreateUserDto) {
    const user = new Users(); // 创建一个用户实例
    // let res; // 保存用户信息
    user.userName = createUserDto.userName;
    user.userPassword = createUserDto.userPassword;
    // user.email = createUserDto.email;
    user.telPhone = createUserDto.telPhone;
    user.avatar = createUserDto.avatar;
    user.introduce = createUserDto.introduce;
    user.gander = createUserDto.gander;
    user.registrationMethod = createUserDto.registrationMethod;
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

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  /** 根据手机号查询用户 */
  async findOneUserById(id: string): Promise<FindUserDto> {
    const res = await this.usersRepository.findOne({ where: { userId: +id } });
    if (!res) {
      return null;
    }
    const { userPassword, ...result } = res;
    return result;
  }

  /** 根据手机号/邮箱/用户名查询用户 */
  async findOneByUser(payload: CreateUserDto): Promise<Users> {
    const findUserMap = {
      [RegistrationMethod.EMAIL]: { email: payload.email },
      [RegistrationMethod.PHONE]: { telPhone: payload.telPhone },
      [RegistrationMethod.USER_NAME]: { userName: payload.userName }
    };
    const res = await this.usersRepository.findOne({
      where: findUserMap[payload.registrationMethod]
    });
    if (res) {
      let message = '';
      if (res.telPhone) {
        message = '手机号已存在';
      } else if (res.email) {
        message = '邮箱已存在';
      } else {
        message = '用户名已存在';
      }
      throw new HttpException({ message }, HttpStatus.BAD_REQUEST);
    }
    return null;
  }
}
