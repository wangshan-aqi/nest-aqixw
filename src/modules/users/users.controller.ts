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
  HttpStatus,
  UseGuards
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Users } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

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
    switch (createUserDto.registrationMethod) {
      case RegistrationMethod.EMAIL:
        return await this.usersService.createUsersForEmail(createUserDto);
      case RegistrationMethod.PHONE:
        const res = await this.usersService.createUsersForPhone(createUserDto);
        return res;
      case RegistrationMethod.USER_NAME:
        return await this.usersService.createUsersForUserName(createUserDto);
      default:
        throw new HttpException('注册方式错误', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
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
