import { Module } from '@nestjs/common';
import { ButtonPermissionsService } from './button-permissions.service';
import { ButtonPermissionsController } from './button-permissions.controller';

@Module({
  controllers: [ButtonPermissionsController],
  providers: [ButtonPermissionsService],
})
export class ButtonPermissionsModule {}
