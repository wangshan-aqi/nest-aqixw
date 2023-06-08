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

export class CreateUserPhoneDto extends PartialType(CreateUserBaseDto) {
  @ApiProperty({
    description: '手机号',
    example: '18888888888',
    required: false
  })
  @MaxLength(11, { message: '手机号长度不能大于11位' })
  @MinLength(11, { message: '手机号长度不能小于11位' })
  @IsString()
  @ValidateIf(o => o.telPhone !== undefined)
  @IsPhoneNumber('CN', { message: '手机号格式不正确' })
  telPhone: string;
}
