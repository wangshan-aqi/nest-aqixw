import { PartialType } from '@nestjs/swagger';
import { CreateButtonPermissionDto } from './create-button-permission.dto';

export class UpdateButtonPermissionDto extends PartialType(CreateButtonPermissionDto) {}
