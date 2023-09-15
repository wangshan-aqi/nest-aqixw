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
      // routeName,
      routePath,
      filePath,
      icon,
      parentId,
      roleCode,
      order,
      isModifiable,
    } = createMenuListDto;

    const menuItem = new MenuListEntity();
    menuItem.menuName = menuName;
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
        'menu_list.routePath',
        'menu_list.filePath',
        'menu_list.icon',
        'menu_list.parentId',
        'menu_list.roleCode',
        'menu_list.order',
        'menu_list.isModifiable',
        'menu_list.createdAt',
        'menu_list.updatedAt',
      ])
      .where('menu_list.isDelete = :isDelete', { isDelete: '1' })
      .orderBy('menu_list.order', 'ASC')
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
    const menuParentsBuilder = await this.menuListRepository.createQueryBuilder('menu_list');
    const res = await menuParentsBuilder
      .select(['menu_list.id', 'menu_list.menuName'])
      .where('menu_list.parentId Is NULL')
      .getMany();

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

  async update(updateMenuListDto: UpdateMenuListDto) {
    const isExist = await this.menuListRepository.findOne({
      where: { id: updateMenuListDto.id },
    });

    if (isExist) {
      const updateData = {
        ...isExist,
        ...updateMenuListDto,
      };
      return {
        code: 200,
        data: this.menuListRepository.save(updateData),
        message: '修改成功',
      };
    }
    throw new HttpException('菜单不存在', HttpStatus.BAD_REQUEST);
  }

  remove(id: number) {
    return `This action removes a #${id} menuList`;
  }
}
