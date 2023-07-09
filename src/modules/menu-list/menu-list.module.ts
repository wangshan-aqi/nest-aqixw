import { Module } from '@nestjs/common';
import { MenuListService } from './menu-list.service';
import { MenuListController } from './menu-list.controller';
import { MenuList } from './entities/menu-list.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MenuList])],
  controllers: [MenuListController],
  providers: [MenuListService],
})
export class MenuListModule {}
