import { PartialType } from '@nestjs/swagger';
import { CreateEnumListDto } from './create-enum-list.dto';

export class UpdateEnumListDto extends PartialType(CreateEnumListDto) {}
