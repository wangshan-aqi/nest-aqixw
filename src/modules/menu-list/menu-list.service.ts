import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMenuListDto } from './dto/create-menu-list.dto';
import { UpdateMenuListDto } from './dto/update-menu-list.dto';
import { MenuList } from './entities/menu-list.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MenuListService {
  constructor(
    @InjectRepository(MenuList)
    private readonly menuListRepository: Repository<MenuList>,
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
      //  canModify
    } = createMenuListDto;
    const menuList = new MenuList();
    menuList.menuName = menuName;
    menuList.routeName = routeName;
    menuList.routePath = routePath;
    menuList.filePath = filePath;
    menuList.icon = icon;
    menuList.parentId = parentId;
    menuList.roleCode = roleCode;
    // menuList.canModify = canModify;
    if (parentId === null) {
      menuList.parentId = 0;
    }

    const isExist = await this.menuListRepository.findOne({
      where: { menuName },
    });
    console.log(isExist);

    if (isExist) {
      throw new HttpException('菜单名称已存在', HttpStatus.BAD_REQUEST);
    }
    return await this.menuListRepository.save(menuList);
  }

  async findAll() {
    const res = await this.menuListRepository.find();

    return res;
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
