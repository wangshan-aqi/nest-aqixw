import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { EnumListService } from './enum-list.service';
import { EnumListController } from './enum-list.controller';
import { EnumListEntity } from './entities/enum-list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EnumListEntity])],
  controllers: [EnumListController],
  providers: [EnumListService],
})
export class EnumListModule {}
