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

export class FindUserDto {
  @IsString()
  userName: string;

  @IsString()
  userPassword?: string;

  @IsString()
  email: string;

  @IsString()
  telPhone: string;

  @IsString()
  avatar: string;

  @IsString()
  introduce: string;

  @IsEnum(Gander, {
    message: '性别必须是男、女、保密中的一个枚举',
    each: true // 每个都要验证
  })
  readonly gander: Gander;

  @IsEnum(RegistrationMethod, {
    message: '注册方式必须是手机号、邮箱、用户名中的一个枚举'
  })
  readonly registrationMethod: RegistrationMethod;
}
