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

import { PartialType } from '@nestjs/swagger';
import { CreateUserBaseDto } from './create-user-base.dto';

export class CreateUserEmailDto extends PartialType(CreateUserBaseDto) {
  @ApiProperty({
    description: '邮箱',
    example: 'aaaa@bb.com',
    required: false
  })
  @IsOptional()
  @IsString()
  @ValidateIf(o => o.email !== undefined)
  @IsEmail({}, { message: '邮箱格式不正确' })
  email: string;
}

export enum IsDelete {
  DELETE = 0,
  NODELETE = 1
}

export enum Gander {
  '男' = 0,
  '女' = 1,
  '保密' = 2
}

// export class CreateUserDto {
//   @ApiProperty({
//     description: '用户名',
//     example: 'admin'
//   })
//   @IsString()
//   @IsNotEmpty({ message: '用户名不能为空' })
//   userName: string;

//   @ApiProperty({
//     description: '密码',
//     example: '123456'
//   })
//   @IsString()
//   @IsNotEmpty({ message: '用户名不能为空' })
//   @MinLength(6, { message: '密码长度不能小于6位' })
//   @MaxLength(18, { message: '密码长度不能大于18位' })
//   userPassword: string;

//   @ApiProperty({
//     description: '手机号',
//     example: '18888888888',
//     required: false
//   })
//   @MaxLength(11, { message: '手机号长度不能大于11位' })
//   @MinLength(11, { message: '手机号长度不能小于11位' })
//   @IsString()
//   @ValidateIf(o => o.telPhone !== undefined)
//   @IsPhoneNumber('CN', { message: '手机号格式不正确' })
//   telPhone: string;

//   @IsString()
//   avatar: string;

//   @ApiProperty({
//     description: '个人简介',
//     example: '个人简介---1'
//   })
//   @IsString()
//   introduce: string;

//   @ApiProperty({
//     enum: Gander,
//     description: '性别',
//     example: 0,
//     required: false
//   })
//   @IsEnum(Gander, {
//     message: '性别必须是男、女、保密中的一个枚举',
//     each: true // 每个都要验证
//   })
//   readonly gander: Gander;
// }
