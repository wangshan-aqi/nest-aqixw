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
import { IsCustomPhone } from 'src/shard/custom-validation/is-custom-phone.decorator';
import { IsCustomEmail } from 'src/shard/custom-validation/is-custon-email.decorator';

export enum IsDelete {
  DELETE = 0,
  NODELETE = 1
}

export enum Gander {
  '男' = 0,
  '女' = 1,
  '保密' = 2
}

/**
 * @description 注册方式
 * @PHONE 手机号
 * @EMAIL 邮箱
 * @USER_NAME 用户名
 */
export enum RegistrationMethod {
  'PHONE' = 0,
  'EMAIL' = 1,
  'USER_NAME' = 2
}

export class CreateUserDto {
  @ApiProperty({
    description: '用户名',
    example: 'admin'
  })
  @ValidateIf(o => !o.telPhone && !o.email)
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString({ message: '用户名必须是字符串' })
  userName: string;

  @ApiProperty({
    description: '密码',
    example: '123456'
  })
  @IsNotEmpty({ message: '密码不能为空' })
  @MinLength(6, { message: '密码长度不能小于6位' })
  @MaxLength(18, { message: '密码长度不能大于18位' })
  @IsString()
  userPassword: string;

  @ApiProperty({
    description: '邮箱',
    example: 'aaaa@bb.com',
    required: false
  })
  @ValidateIf(o => !o.telPhone && !o.userName)
  @IsCustomEmail({ message: '邮箱格式不正确' })
  @IsNotEmpty({ message: '邮箱不能为空' })
  @IsString({ message: '用户名必须是字符串' })
  email: string;

  @ApiProperty({
    description: '手机号',
    example: '18888888888',
    required: false
  })
  @ValidateIf(o => !o.userName && !o.email)
  @MaxLength(11, { message: '手机号长度不能大于11位' })
  @MinLength(11, { message: '手机号长度不能小于11位' })
  @IsCustomPhone({ message: '手机号格式不正确' })
  @IsNotEmpty({ message: '手机号不能为空' })
  @IsString({ message: '用户名必须是字符串' })
  telPhone: string;

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
