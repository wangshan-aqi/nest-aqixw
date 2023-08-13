import { PartialType } from '@nestjs/swagger';
import { CreateAllEnumDto } from './create-all-enum.dto';

export class UpdateAllEnumDto extends PartialType(CreateAllEnumDto) {}
