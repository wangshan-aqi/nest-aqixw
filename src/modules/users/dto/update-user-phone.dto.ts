import { PartialType } from '@nestjs/swagger';
import { CreateUserPhoneDto } from './create-user-phone.dto';

export class UpdateUserPhoneDto extends PartialType(CreateUserPhoneDto) {}
