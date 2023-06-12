import { CreateUserDto, RegistrationMethod } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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
  async create(@Body() createUserDto: CreateUserDto) {
    const isExist = await this.usersService.findOneByUser(createUserDto);
    console.log(isExist, 'isExist');

    // 用户没有注册
    if (!isExist) {
      return await this.usersService.createUsers(createUserDto);
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
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
