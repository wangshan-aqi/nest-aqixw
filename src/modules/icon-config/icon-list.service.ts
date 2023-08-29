import { Injectable } from '@nestjs/common';
import { CreateIconListDto } from './dto/create-icon-list.dto';
import { UpdateIconListDto } from './dto/update-icon-list.dto';
import { IconListEntity } from './entities/icon-list.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class IconListService {
  constructor(
    @InjectRepository(IconListEntity)
    private iconListRepository: Repository<IconListEntity>,
  ) {}

  create(createIconListDto: CreateIconListDto) {
    return 'This action adds a new iconList';
  }

  async findAll() {
    const iconListBuiler = await this.iconListRepository.createQueryBuilder('icon_list');

    const iconListData = await iconListBuiler
      .select(['icon_list.id', 'icon_list.name', 'icon_list.font_class'])
      .getMany();

    return iconListData;
  }

  findOne(id: number) {
    return `This action returns a #${id} iconList`;
  }

  update(id: number, updateIconListDto: UpdateIconListDto) {
    return `This action updates a #${id} iconList`;
  }

  remove(id: number) {
    return `This action removes a #${id} iconList`;
  }
}
