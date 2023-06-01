import { PartialType } from '@nestjs/swagger';
import { CreateUsauthDto } from './create-usauth.dto';

export class UpdateUsauthDto extends PartialType(CreateUsauthDto) {}
