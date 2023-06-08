import { CreateUserEmailDto } from './dto/create-user-email.dto';
import { CreateUserPhoneDto } from './dto/create-user-phone.dto';
import { UpdateUserEmailDto } from './dto/update-user-email.dto';
import { UpdateUserPhoneDto } from './dto/update-user-phone.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  Query,
  HttpException,
  HttpCode,
  UseFilters,
  HttpStatus
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Users } from './entities/user.entity';

@ApiTags('用户')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signUp')
  @ApiTags('创建用户')
  @ApiBody({
    type: Users
  })
  async create(@Body() createUserDto: CreateUserPhoneDto) {
    // 手机号是否已存在
    const isExistingUser = await this.usersService.findOneByTelPhone(
      createUserDto.telPhone
    );
    if (isExistingUser) {
      // 如果手机号已存在，抛出异常
      throw new HttpException(
        { message: '手机号已存在' },
        HttpStatus.BAD_REQUEST
      );
    } else {
      // 如果手机号不存在，创建用户
      return this.usersService.createPhoneUsers(createUserDto);
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserPhoneDto: UpdateUserPhoneDto
  ) {
    return this.usersService.update(+id, updateUserPhoneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
