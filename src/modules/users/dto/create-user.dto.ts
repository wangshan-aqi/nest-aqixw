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
  ValidateIf,
} from 'class-validator';
import { IsCustomPhone } from 'src/shard/custom-validation/is-custom-phone.decorator';
import { IsCustomEmail } from 'src/shard/custom-validation/is-custon-email.decorator';

export enum IsDelete {
  DELETE = 0,
  NODELETE = 1,
}

export enum Gander {
  '男' = 0,
  '女' = 1,
  '保密' = 2,
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
  'USER_NAME' = 2,
}

export class CreateUserDto {
  @ApiProperty({
    description: '用户名',
    example: 'admin',
  })
  @ValidateIf(
    o => o.registrationMethod === RegistrationMethod.USER_NAME && !o.userName,
  )
  @MaxLength(50, { message: '用户名长度不能大于50位' })
  @MinLength(2, { message: '用户名长度不能小于2位' })
  @IsString({ message: '用户名必须是字符串' })
  @IsNotEmpty({ message: '用户名不能为空' })
  userName: string;

  @ApiProperty({
    description: '手机号',
    example: '18888888888',
  })
  @IsCustomPhone({ message: '手机号格式不正确' })
  @ValidateIf(
    o => o.registrationMethod === RegistrationMethod.PHONE && !o.telPhone,
  )
  @IsString({ message: '手机号必须是字符串' })
  @IsNotEmpty({ message: '手机号不能为空' })
  telPhone: string;

  @ApiProperty({
    description: '邮箱',
    example: 'aaaa@bb.com',
  })
  @IsCustomEmail({ message: '邮箱格式不正确' })
  @ValidateIf(
    o => o.registrationMethod === RegistrationMethod.EMAIL && !o.email,
  )
  @IsString({ message: '邮箱必须是字符串' })
  @IsNotEmpty({ message: '邮箱不能为空' })
  email: string;

  @ApiProperty({
    description: '密码',
    example: '123456',
  })
  @MinLength(6, { message: '密码长度不能小于6位' })
  @MaxLength(18, { message: '密码长度不能大于18位' })
  @IsNotEmpty({ message: '密码不能为空' })
  @IsString({ message: '密码必须是字符串' })
  userPassword: string;

  @ApiProperty({
    description: '验证码',
    example: 0,
    enum: RegistrationMethod,
    required: false,
  })
  @IsNotEmpty({ message: '验证码不能为空' })
  code: string;

  @ApiProperty({
    description: '注册方式',
    example: 0,
    enum: RegistrationMethod,
    required: false,
  })
  @IsEnum(RegistrationMethod, { message: '注册方式不正确' })
  @IsNotEmpty({ message: '注册方式不能为空' })
  registrationMethod: RegistrationMethod;
}
