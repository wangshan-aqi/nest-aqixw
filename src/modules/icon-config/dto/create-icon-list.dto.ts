import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateIconListDto {
  @IsString({
    message: 'icon类id必须为字符串',
  })
  @IsNotEmpty()
  id: string;

  @IsString({
    message: 'icon类名称必须为字符串',
  })
  @IsNotEmpty()
  name: string;

  @IsString({
    message: 'icon类必须为字符串',
  })
  @IsNotEmpty()
  font_class: string;

  @IsString({
    message: 'icon类unicode必须为字符串',
  })
  @IsNotEmpty()
  unicode: string;

  @IsNumber()
  @IsNotEmpty()
  unicode_decimal: number;
}
