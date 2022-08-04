import { Controller, Get, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('banner')
@ApiTags('测试')
export class BannerController {
  @Get()
  findAll(@Query() request: string): string {
    console.log(request);

    return `This action returns all cats ${request}`;
  }
}
