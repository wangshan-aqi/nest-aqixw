import { PartialType } from '@nestjs/swagger';
import { CreateIconListDto } from './create-icon-list.dto';

export class UpdateIconListDto extends PartialType(CreateIconListDto) {}
