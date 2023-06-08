import { PartialType } from '@nestjs/swagger';
import { CreateUserEmailDto } from './create-user-email.dto';

export class UpdateUserEmailDto extends PartialType(CreateUserEmailDto) {}
