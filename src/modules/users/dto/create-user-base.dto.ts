import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
  Validate,
  ValidateIf
} from 'class-validator';

export enum IsDelete {
  DELETE = 0,
  NODELETE = 1
}

export enum Gander {
  '男' = 0,
  '女' = 1,
  '保密' = 2
}

export class CreateUserBaseDto {
  @ApiProperty({
    description: '用户名',
    example: 'admin'
  })
  @IsString()
  @IsNotEmpty({ message: '用户名不能为空' })
  userName: string;

  @ApiProperty({
    description: '密码',
    example: '123456'
  })
  @IsString()
  @IsNotEmpty({ message: '用户名不能为空' })
  @MinLength(6, { message: '密码长度不能小于6位' })
  @MaxLength(18, { message: '密码长度不能大于18位' })
  userPassword: string;

  @IsString()
  avatar: string;

  @ApiProperty({
    description: '个人简介',
    example: '个人简介---1'
  })
  @IsString()
  introduce: string;

  @ApiProperty({
    enum: Gander,
    description: '性别',
    example: 0,
    required: false
  })
  @IsEnum(Gander, {
    message: '性别必须是男、女、保密中的一个枚举',
    each: true // 每个都要验证
  })
  readonly gander: Gander;
}
