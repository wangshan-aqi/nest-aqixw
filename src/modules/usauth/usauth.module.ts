import { Module } from '@nestjs/common';
import { UsauthService } from './usauth.service';
import { UsauthController } from './usauth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usauth } from './entities/usauth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usauth])],
  controllers: [UsauthController],
  providers: [UsauthService]
})
export class UsauthModule {}
