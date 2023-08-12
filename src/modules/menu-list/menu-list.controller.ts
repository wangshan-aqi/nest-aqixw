import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, Query } from '@nestjs/common';
import { MenuListService } from './menu-list.service';
import { CreateMenuListDto } from './dto/create-menu-list.dto';
import { UpdateMenuListDto } from './dto/update-menu-list.dto';
import { ValidationPipe } from 'src/pipe/Validation.pipe';
import { FindMenuListDto } from './dto/find-menu-list.dto';

@Controller()
export class MenuListController {
  constructor(private readonly menuListService: MenuListService) {}

  @Post('menu-list/create')
  @UsePipes(new ValidationPipe())
  create(@Body() createMenuListDto: CreateMenuListDto) {
    return this.menuListService.create(createMenuListDto);
  }

  @Post('menu-list/search')
  @UsePipes(new ValidationPipe())
  async findAll(@Body() findMenuListDto: FindMenuListDto): Promise<any> {
    const res = await this.menuListService.findAll(findMenuListDto);
    return res;
  }

  // async findAll(@Query() findMenuListDto: FindMenuListDto): Promise<any> {
  //   const res = await this.menuListService.findAll(findMenuListDto);
  //   return res;
  // }

  @Get('menu-list:id')
  findOne(@Param('id') id: string) {
    return this.menuListService.findOne(+id);
  }

  @Patch('menu-list:id')
  update(@Param('id') id: string, @Body() updateMenuListDto: UpdateMenuListDto) {
    return this.menuListService.update(+id, updateMenuListDto);
  }

  @Delete('menu-list:id')
  remove(@Param('id') id: string) {
    return this.menuListService.remove(+id);
  }

  @Get('menu-parents')
  findMenuParentsAll() {
    return this.menuListService.findMenuParentsAll();
  }
}
