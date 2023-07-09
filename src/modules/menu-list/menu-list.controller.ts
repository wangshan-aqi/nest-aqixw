import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MenuListService } from './menu-list.service';
import { CreateMenuListDto } from './dto/create-menu-list.dto';
import { UpdateMenuListDto } from './dto/update-menu-list.dto';

@Controller('menu-list')
export class MenuListController {
  constructor(private readonly menuListService: MenuListService) {}

  @Post()
  create(@Body() createMenuListDto: CreateMenuListDto) {
    return this.menuListService.create(createMenuListDto);
  }

  @Get()
  findAll() {
    return this.menuListService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuListService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuListDto: UpdateMenuListDto) {
    return this.menuListService.update(+id, updateMenuListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuListService.remove(+id);
  }
}
