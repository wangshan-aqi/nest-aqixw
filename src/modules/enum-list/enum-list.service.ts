import { Injectable } from '@nestjs/common';
import { CreateEnumListDto, EnumData, EnumDataGrouped } from './dto/create-enum-list.dto';
import { UpdateEnumListDto } from './dto/update-enum-list.dto';
import { EnumListEntity } from './entities/enum-list.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EnumListService {
  constructor(
    @InjectRepository(EnumListEntity)
    private readonly enumListRepository: Repository<EnumListEntity>,
  ) {}
  async create(createEnumListDto: CreateEnumListDto): Promise<EnumListEntity> {
    const { type, enumName, enumCode, enumValue, enumDesc } = createEnumListDto;
    const enumItem = new EnumListEntity();
    enumItem.type = type;
    enumItem.enumName = enumName;
    enumItem.enumCode = enumCode;
    enumItem.enumValue = enumValue;
    enumItem.enumDesc = enumDesc;
    return await this.enumListRepository.save(enumItem);
  }

  async findAll(): Promise<EnumDataGrouped> {
    const enumBuilder = await this.enumListRepository.createQueryBuilder('enum_list');
    const enumList = await enumBuilder.getMany();

    return enumGroupDataByType(enumList);
  }

  async findOne(id: number): Promise<EnumListEntity> {
    const enumBuilder = await this.enumListRepository.createQueryBuilder('enum_list');
    const enumItem = await enumBuilder.where('enum_list.id = :id', { id }).getOne();
    return enumItem;
  }
  async findOneEnumType(type: string): Promise<any> {
    const enumBuilder = await this.enumListRepository.createQueryBuilder('enum_list');
    const enumItem = await enumBuilder.where('enum_list.type = :type', { type }).getMany(); // a: getOne 返回的是一个对象，getMany 返回的是一个数组

    return enumItem;
  }

  async update(id: number, updateEnumListDto: UpdateEnumListDto): Promise<EnumListEntity> {
    const enumBuilder = await this.enumListRepository.createQueryBuilder('enum_list');
    const enumItem = await enumBuilder.where('enum_list.id = :id', { id }).getOne();
    const { type, enumName, enumCode, enumValue, enumDesc } = updateEnumListDto;
    enumItem.type = type;
    enumItem.enumName = enumName;
    enumItem.enumCode = enumCode;
    enumItem.enumValue = enumValue;
    enumItem.enumDesc = enumDesc;
    return await this.enumListRepository.save(enumItem);
  }

  async remove(id: number) {
    const enumBuilder = await this.enumListRepository.createQueryBuilder('enum_list');
    const isExist = await enumBuilder.where('enum_list.id = :id', { id }).getOne();
    if (!isExist) {
      return {
        code: 400,
        message: '枚举不存在',
      };
    }
    await this.enumListRepository.delete(id);
  }
}

function enumGroupDataByType(data: EnumData[]): EnumDataGrouped {
  const enumGroupData: EnumDataGrouped = {};

  data.forEach((enumItem: EnumData) => {
    const { type } = enumItem;
    if (!enumGroupData[type]) {
      enumGroupData[type] = [];
    }

    enumGroupData[type].push(enumItem);
  });

  return enumGroupData;
}
