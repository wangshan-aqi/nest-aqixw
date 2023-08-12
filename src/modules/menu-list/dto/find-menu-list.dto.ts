import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { Role } from '../interface/models';

export class FindMenuListDto {
  @IsNotEmpty()
  @IsNumber()
  page: number;

  @IsNotEmpty()
  @IsNumber()
  pageSize: number;
  // name?: string;
  // id?: number;
  // menuName?: string;
  // routeName?: string;

  // @IsEnum(Role, { message: '角色编码不正确' })
  // roleCode?: number;
}
