import { Module } from '@nestjs/common';
import { AllEnumsService } from './all-enums.service';
import { AllEnumsController } from './all-enums.controller';

@Module({
  controllers: [AllEnumsController],
  providers: [AllEnumsService],
})
export class AllEnumsModule {}
