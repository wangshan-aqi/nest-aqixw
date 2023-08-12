import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  Matches,
  IsBoolean,
  IsNumber,
  IsNotEmpty,
  MaxLength,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Modifiable } from 'src/modules/users/dto/create-user.dto';
import { Role } from '../interface/models';
export class CreateMenuListDto {
  @IsString({ message: '菜单名称必须为字符串' })
  @Matches(/^[\u4e00-\u9fa5]+$/, { message: '菜单名称必须为中文' })
  @IsNotEmpty()
  @MaxLength(100)
  menuName: string;

  @IsString({ message: '路由名称必须为字符串' })
  @Matches(/^[A-Z][A-Za-z0-9]*$/, { message: '路由名称必须以大写字母开头，且只能包含字母和数字' })
  @IsNotEmpty()
  @MaxLength(100)
  routeName: string;

  @IsString({ message: '路由路径必须为字符串' })
  @IsNotEmpty()
  routePath: string;

  @IsString({ message: '组件路径必须为字符串' })
  @IsNotEmpty()
  filePath: string;

  @IsString({ message: '路由图标必须为字符串' })
  @IsOptional()
  icon: string;

  @IsNumber()
  @IsOptional()
  parentId: number;

  @IsNotEmpty()
  @IsEnum(Role, { message: '角色必须是枚举值' })
  roleCode: number;

  @IsNumber()
  @IsOptional()
  order: number;

  @IsEnum(Modifiable, { message: '是否可修改必须为数字枚举' })
  @IsNotEmpty()
  isModifiable: number;
}
