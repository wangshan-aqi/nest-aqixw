import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ButtonPermissionsService } from './button-permissions.service';
import { CreateButtonPermissionDto } from './dto/create-button-permission.dto';
import { UpdateButtonPermissionDto } from './dto/update-button-permission.dto';

@Controller('button-permissions')
export class ButtonPermissionsController {
  constructor(private readonly buttonPermissionsService: ButtonPermissionsService) {}

  @Post()
  create(@Body() createButtonPermissionDto: CreateButtonPermissionDto) {
    return this.buttonPermissionsService.create(createButtonPermissionDto);
  }

  @Get()
  findAll() {
    return this.buttonPermissionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.buttonPermissionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateButtonPermissionDto: UpdateButtonPermissionDto) {
    return this.buttonPermissionsService.update(+id, updateButtonPermissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.buttonPermissionsService.remove(+id);
  }
}
