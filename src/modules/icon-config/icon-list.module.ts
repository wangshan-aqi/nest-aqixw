import { Module } from '@nestjs/common';
import { IconListService } from './icon-list.service';
import { IconListController } from './icon-list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IconListEntity } from './entities/icon-list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IconListEntity])],
  controllers: [IconListController],
  providers: [IconListService],
})
export class IconListModule {}
