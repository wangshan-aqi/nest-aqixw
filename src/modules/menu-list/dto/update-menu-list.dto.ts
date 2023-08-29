import { PartialType } from '@nestjs/swagger';
import { CreateMenuListDto } from './create-menu-list.dto';

export class UpdateMenuListDto extends PartialType(CreateMenuListDto) {
  id?: number;
}
