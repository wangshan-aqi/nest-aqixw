import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';
import { RegistrationMethod } from 'src/modules/users/dto/create-user.dto';
import { IsCustomPhone } from 'src/shard/custom-validation/is-custom-phone.decorator';

/** 手机号登录 DTO */
export class TelPhoneSignInDto {
  @ApiProperty({
    description: '手机号',
    example: '18888888888',
    required: false
  })
  @IsString({ message: '手机号必须是字符串' })
  @IsNotEmpty({ message: '手机号不能为空' })
  @IsCustomPhone({ message: '手机号格式不正确' })
  telPhone: string;

  @ApiProperty({
    description: '密码',
    example: '123456'
  })
  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  userPassword: string;
}
