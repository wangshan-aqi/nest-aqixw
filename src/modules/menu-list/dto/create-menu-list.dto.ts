import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  Matches,
  IsBoolean,
  IsNumber,
  IsNotEmpty,
  MaxLength,
  IsOptional,
} from 'class-validator';
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
  routePath: string;

  @IsString({ message: '组件路径必须为字符串' })
  componentPath: string;

  @IsString({ message: '路由图标必须为字符串' })
  routeIcon: string;

  @IsNumber()
  @IsOptional()
  parentId: number;

  @IsString({ message: '角色权限关系必须为字符串' })
  rolePermissions: string;

  @IsString({ message: '按钮权限关系必须为字符串' })
  buttonPermissions: string;

  //   @IsBoolean({ message: '是否可删除必须为布尔值' })
  //   isDelete: boolean;

  @IsString({ message: '路由描述必须为字符串' })
  description: string;

  //   @IsBoolean({ message: '是否可修改必须为布尔值' })
  //   canModify: boolean;
}
