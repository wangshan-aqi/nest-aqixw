import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUsauthDto } from './dto/create-usauth.dto';
import { UpdateUsauthDto } from './dto/update-usauth.dto';
import { Usauth } from './entities/usauth.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsauthService {
  constructor(
    @InjectRepository(Usauth)
    private readonly usauthRepository: Repository<Usauth>
  ) {}
  create(createUsauthDto: CreateUsauthDto) {
    return 'This action adds a new usauth';
  }

  findAll() {
    return this.usauthRepository.find();
  }

  findOne(id: number) {
    return this.usauthRepository.findOne({
      where: {
        auth_id: id
      }
    });
  }

  update(id: number, updateUsauthDto: UpdateUsauthDto) {
    return `This action updates a #${id} usauth`;
  }

  async remove(id: number) {
    await this.usauthRepository.delete({ auth_id: id });
  }
}
