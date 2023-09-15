import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEnumListDto {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  enumName: string;

  @IsNumber()
  @IsNotEmpty()
  enumCode: number;

  @IsString()
  @IsNotEmpty()
  enumValue: string;

  @IsString()
  @IsOptional()
  enumDesc: string;
}

export interface EnumData {
  id: number;
  type: string;
  enumName: string;
  enumCode: number;
  enumValue: string;
  enumDesc: string;
}
export interface EnumDataGrouped {
  [type: string]: EnumData[];
}
