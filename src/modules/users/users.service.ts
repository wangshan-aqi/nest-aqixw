import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly usersRepository: Repository<Users>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = new Users();
    user.user_name = createUserDto.user_name;
    user.user_password = createUserDto.user_password;
    user.email = createUserDto.email;
    user.tel_phone = createUserDto.tel_phone;
    user.avatar = createUserDto.avatar;
    user.introduce = createUserDto.introduce;
    user.gander = createUserDto.gander;

    return await this.usersRepository.save(user);
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
