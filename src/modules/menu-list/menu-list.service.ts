import { FindMenuListDto } from './dto/find-menu-list.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMenuListDto } from './dto/create-menu-list.dto';
import { UpdateMenuListDto } from './dto/update-menu-list.dto';
import { MenuListEntity } from './entities/menu-list.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MenuListService {
  constructor(
    @InjectRepository(MenuListEntity)
    private readonly menuListRepository: Repository<MenuListEntity>,
  ) {}

  async create(createMenuListDto: CreateMenuListDto) {
    const {
      menuName,
      routeName,
      routePath,
      filePath,
      icon,
      parentId,
      roleCode,
      order,
      isModifiable,
    } = createMenuListDto;
    // console.log(createMenuListDto);

    const menuItem = new MenuListEntity();
    menuItem.menuName = menuName;
    menuItem.routeName = routeName;
    menuItem.routePath = routePath;
    menuItem.filePath = filePath;
    menuItem.icon = icon;
    menuItem.parentId = parentId;
    menuItem.roleCode = roleCode;
    menuItem.order = order;
    menuItem.isDelete = 1;
    menuItem.isModifiable = isModifiable;
    if (parentId === null) {
      menuItem.parentId = 0;
    }

    const isExist = await this.menuListRepository.findOne({
      where: { menuName },
    });
    console.log(isExist, 'isExist');

    if (isExist) {
      throw new HttpException('菜单名称已存在', HttpStatus.BAD_REQUEST);
    }
    await this.menuListRepository.save(menuItem);
    return {
      code: 200,
      message: '创建成功',
    };
  }

  async findAll(findMenuListDto): Promise<any> {
    const { page, pageSize } = findMenuListDto;
    const menuQueryBuilder = await this.menuListRepository.createQueryBuilder('menu_list');

    const [items, total] = await menuQueryBuilder
      .select([
        'menu_list.id',
        'menu_list.menuName',
        'menu_list.routeName',
        'menu_list.routePath',
        'menu_list.filePath',
        'menu_list.icon',
        'menu_list.parentId',
        'menu_list.roleCode',
        'menu_list.order',
        'menu_list.isModifiable',
      ])
      .where('menu_list.isDelete = :isDelete', { isDelete: '1' })
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    return {
      data: items,
      currentPage: page,
      pageSize: pageSize,
      total,
    };
  }
  async findMenuParentsAll() {
    const res = await this.menuListRepository.find();
    if (res.length > 0) {
      const parents = res.map(item => {
        return {
          id: item.id,
          name: item.menuName,
        };
      });
      return parents;
    } else {
      return [];
    }
  }

  async findOne(id: number) {
    const res = await this.menuListRepository.findOne({
      where: { id },
    });
    if (res) {
      const { isDelete, ...result } = res;
      return result;
    }
  }

  async update(id: number, updateMenuListDto: UpdateMenuListDto) {
    const isExist = await this.menuListRepository.findOne({
      where: { id },
    });

    if (isExist) {
      const updateData = {
        ...isExist,
        updateMenuListDto,
      };
      return this.menuListRepository.save(updateData);
    }
    throw new HttpException('菜单不存在', HttpStatus.BAD_REQUEST);
  }

  remove(id: number) {
    return `This action removes a #${id} menuList`;
  }
}
