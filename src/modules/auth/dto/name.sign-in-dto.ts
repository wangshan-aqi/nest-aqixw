import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, ValidateIf } from 'class-validator';
import { RegistrationMethod } from 'src/modules/users/dto/create-user.dto';
import { IsCustomPhone } from 'src/shard/custom-validation/is-custom-phone.decorator';
import { IsCustomEmail } from 'src/shard/custom-validation/is-custon-email.decorator';

/** 用户名登录 DTO */
export class UserNameSignInDto {
  @ApiProperty({
    description: '用户名',
    example: 'admin',
    required: false,
  })
  @IsString({ message: '用户名必须是字符串' })
  @IsNotEmpty({ message: '用户名不能为空' })
  @ValidateIf(o => o.registrationMethod === RegistrationMethod.USER_NAME)
  userName: string;

  @ApiProperty({
    description: '密码',
    example: '123456',
  })
  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  userPassword: string;
}
