import { IsEnum, IsString, MaxLength, MinLength } from 'class-validator';

export enum IsDelete {
  DELETE = 0,
  NODELETE = 1
}

export enum Gander {
  '男' = 0,
  '女' = 1,
  '保密' = 2
}

export class CreateUserDto {
  @IsString()
  user_name: string;

  @IsString()
  user_password: string;

  @IsString()
  email: string;

  @IsString()
  @MaxLength(11, { message: '手机号长度不能大于11位' })
  @MinLength(11, { message: '手机号长度不能小于11位' })
  tel_phone: string;

  @IsString()
  avatar: string;

  @IsString()
  introduce: string;

  @IsEnum({ enum: IsDelete })
  is_deleted: IsDelete;

  @IsEnum({ enum: Gander })
  gander: Gander;
}
