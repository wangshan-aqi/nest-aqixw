import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IconListService } from './icon-list.service';
import { CreateIconListDto } from './dto/create-icon-list.dto';
import { UpdateIconListDto } from './dto/update-icon-list.dto';

@Controller('icon-list')
export class IconListController {
  constructor(private readonly iconListService: IconListService) {}

  @Post()
  create(@Body() createIconListDto: CreateIconListDto) {
    return this.iconListService.create(createIconListDto);
  }

  @Get()
  findAll() {
    return this.iconListService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.iconListService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIconListDto: UpdateIconListDto) {
    return this.iconListService.update(+id, updateIconListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.iconListService.remove(+id);
  }
}
