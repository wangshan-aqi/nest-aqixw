import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsOptional() // 可选
  userName: string;

  @IsString()
  @IsNotEmpty({ message: '手机号不能为空' })
  @IsOptional() // 可选
  telPhone: string;

  @IsString()
  @IsNotEmpty({ message: '邮箱不能为空' })
  @IsOptional() // 可选
  email: string;

  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  userPassword: string;
}
