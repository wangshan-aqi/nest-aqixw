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
      componentPath,
      routeIcon,
      parentId,
      rolePermissions,
      buttonPermissions,
      // isDelete,
      description,
      // canModify,
    } = createMenuListDto;
    const menuList = new MenuList();
    menuList.menuName = menuName;
    menuList.routeName = routeName;
    menuList.routePath = routePath;
    menuList.componentPath = componentPath;
    menuList.routeIcon = routeIcon;
    menuList.parentId = parentId;
    menuList.rolePermissions = rolePermissions;
    menuList.buttonPermissions = buttonPermissions;
    // menuList.isDelete = isDelete;
    menuList.description = description;
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
      where: { menuId: id },
    });
    if (res) {
      const { isDelete, ...result } = res;
      return result;
    }
  }

  update(id: number, updateMenuListDto: UpdateMenuListDto) {
    return `This action updates a #${id} menuList`;
  }

  remove(id: number) {
    return `This action removes a #${id} menuList`;
  }
}
