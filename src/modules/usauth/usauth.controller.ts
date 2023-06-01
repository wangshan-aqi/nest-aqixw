import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import { UsauthService } from './usauth.service';
import { CreateUsauthDto } from './dto/create-usauth.dto';
import { UpdateUsauthDto } from './dto/update-usauth.dto';

@Controller('usauth')
export class UsauthController {
  constructor(private readonly usauthService: UsauthService) {}

  @Post()
  create(@Body() createUsauthDto: CreateUsauthDto) {
    return this.usauthService.create(createUsauthDto);
  }

  @Get()
  findAll() {
    return this.usauthService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usauthService.findOne(parseInt(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsauthDto: UpdateUsauthDto) {
    return this.usauthService.update(+id, updateUsauthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usauthService.remove(+id);
  }
}
