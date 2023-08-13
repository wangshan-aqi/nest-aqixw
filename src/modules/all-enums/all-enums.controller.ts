import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AllEnumsService } from './all-enums.service';
import { CreateAllEnumDto } from './dto/create-all-enum.dto';
import { UpdateAllEnumDto } from './dto/update-all-enum.dto';

@Controller('all-enums')
export class AllEnumsController {
  constructor(private readonly allEnumsService: AllEnumsService) {}

  @Post()
  create(@Body() createAllEnumDto: CreateAllEnumDto) {
    return this.allEnumsService.create(createAllEnumDto);
  }

  @Get()
  findAll() {
    return this.allEnumsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.allEnumsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAllEnumDto: UpdateAllEnumDto) {
    return this.allEnumsService.update(+id, updateAllEnumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.allEnumsService.remove(+id);
  }
}
