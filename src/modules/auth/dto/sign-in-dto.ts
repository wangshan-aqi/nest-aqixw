import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf
} from 'class-validator';
import { RegistrationMethod } from 'src/modules/users/dto/create-user.dto';
import { IsCustomPhone } from 'src/shard/custom-validation/is-custom-phone.decorator';
import { IsCustomEmail } from 'src/shard/custom-validation/is-custon-email.decorator';

export class SignInDto {
  @ApiProperty({
    description: '用户名',
    example: 'admin',
    required: false
  })
  @IsString({ message: '用户名必须是字符串' })
  @IsNotEmpty({ message: '用户名不能为空' })
  @ValidateIf(o => o.registrationMethod === RegistrationMethod.USER_NAME)
  userName: string;

  @ApiProperty({
    description: '手机号',
    example: '18888888888',
    required: false
  })
  @IsString({ message: '手机号必须是字符串' })
  @IsNotEmpty({ message: '手机号不能为空' })
  @IsCustomPhone({ message: '手机号格式不正确' })
  @ValidateIf(o => o.registrationMethod === RegistrationMethod.PHONE)
  telPhone: string;

  @ApiProperty({
    description: '邮箱',
    example: 'aaa@qq.com',
    required: false
  })
  @IsString({ message: '邮箱必须是字符串' })
  @IsNotEmpty({ message: '邮箱不能为空' })
  @IsCustomEmail({ message: '邮箱格式不正确' })
  @ValidateIf(o => o.registrationMethod === RegistrationMethod.EMAIL)
  email: string;

  @ApiProperty({
    description: '密码',
    example: '123456'
  })
  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  userPassword: string;

  @ApiProperty({
    description: '注册方式',
    example: 0,
    enum: RegistrationMethod,
    required: false
  })
  @IsEnum(RegistrationMethod, {
    message: '登录方式不正确'
  })
  @IsNotEmpty({ message: '登录方式不能为空' })
  registrationMethod: RegistrationMethod;
}
