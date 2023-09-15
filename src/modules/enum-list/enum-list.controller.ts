import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EnumListService } from './enum-list.service';
import { CreateEnumListDto } from './dto/create-enum-list.dto';
import { UpdateEnumListDto } from './dto/update-enum-list.dto';

@Controller()
export class EnumListController {
  constructor(private readonly enumListService: EnumListService) {}

  @Post('enum-list/create')
  async create(@Body() createEnumlistDto: CreateEnumListDto) {
    return await this.enumListService.create(createEnumlistDto);
  }

  @Get('enum-list')
  async findAll() {
    return await this.enumListService.findAll();
  }

  @Get('enum-list:id')
  async findOne(@Param('id') id: string) {
    return await this.enumListService.findOne(+id);
  }

  @Get('enum-list/search')
  async findOneMenu(@Query('type') type: string) {
    return await this.enumListService.findOneEnumType(type);
  }

  @Patch('enum-list:id')
  async update(@Param('id') id: string, @Body() updateEnumlistDto: UpdateEnumListDto) {
    return await this.enumListService.update(+id, updateEnumlistDto);
  }

  @Delete('enum-list:id')
  async remove(@Param('id') id: string) {
    return await this.enumListService.remove(+id);
  }
}
