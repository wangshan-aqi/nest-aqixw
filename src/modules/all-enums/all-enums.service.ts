import { Injectable } from '@nestjs/common';
import { CreateAllEnumDto } from './dto/create-all-enum.dto';
import { UpdateAllEnumDto } from './dto/update-all-enum.dto';

@Injectable()
export class AllEnumsService {
  create(createAllEnumDto: CreateAllEnumDto) {
    return 'This action adds a new allEnum';
  }

  findAll() {
    return `This action returns all allEnums`;
  }

  findOne(id: number) {
    return `This action returns a #${id} allEnum`;
  }

  update(id: number, updateAllEnumDto: UpdateAllEnumDto) {
    return `This action updates a #${id} allEnum`;
  }

  remove(id: number) {
    return `This action removes a #${id} allEnum`;
  }
}
