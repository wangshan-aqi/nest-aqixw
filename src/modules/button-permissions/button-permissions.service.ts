import { Injectable } from '@nestjs/common';
import { CreateButtonPermissionDto } from './dto/create-button-permission.dto';
import { UpdateButtonPermissionDto } from './dto/update-button-permission.dto';

@Injectable()
export class ButtonPermissionsService {
  create(createButtonPermissionDto: CreateButtonPermissionDto) {
    return 'This action adds a new buttonPermission';
  }

  findAll() {
    return `This action returns all buttonPermissions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} buttonPermission`;
  }

  update(id: number, updateButtonPermissionDto: UpdateButtonPermissionDto) {
    return `This action updates a #${id} buttonPermission`;
  }

  remove(id: number) {
    return `This action removes a #${id} buttonPermission`;
  }
}
