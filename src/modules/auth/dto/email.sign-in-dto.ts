import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { RegistrationMethod } from 'src/modules/users/dto/create-user.dto';
import { IsCustomPhone } from 'src/shard/custom-validation/is-custom-phone.decorator';
import { IsCustomEmail } from 'src/shard/custom-validation/is-custon-email.decorator';

/** 邮箱登录 DTO */
export class EmailSignInDto {
  @ApiProperty({
    description: '邮箱',
    example: 'aaa@qq.com',
    required: false,
  })
  @IsString({ message: '邮箱必须是字符串' })
  @IsNotEmpty({ message: '邮箱不能为空' })
  @IsCustomEmail({ message: '邮箱格式不正确' })
  @ValidateIf(o => o.registrationMethod === RegistrationMethod.EMAIL)
  email: string;

  @ApiProperty({
    description: '密码',
    example: '123456',
  })
  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  userPassword: string;
}
