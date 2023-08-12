import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Matches, MaxLength, IsOptional } from 'class-validator';
import { Modifiable, IsDelete } from 'src/modules/users/dto/create-user.dto';
import { Role } from '../interface/models';

@Entity('menu_list')
export class MenuListEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: '菜单id' })
  id: number;

  @Column()
  @ApiProperty({ description: '菜单名称', example: '首页' })
  menuName: string;

  @Column()
  @ApiProperty({ description: '路由名称', example: 'Home' })
  routeName: string;

  @Column()
  @ApiProperty({ description: '路由路径' })
  routePath: string;

  @Column()
  @ApiProperty({ description: '组件路径' })
  filePath: string;

  @Column({ nullable: true })
  @ApiProperty({ description: '路由图标' })
  icon: string;

  @Column({ nullable: true, default: '0' })
  @ApiProperty({ description: '父级id' })
  @IsOptional()
  parentId: number;

  @Column({ nullable: true, default: 0 })
  @ApiProperty({ description: '序号' })
  order: number;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.SUPER_ADMIN,
  })
  @ApiProperty({ description: '角色权限' })
  roleCode: Role;

  @Column({
    type: 'enum',
    enum: IsDelete,
    default: IsDelete.NODELETE,
  })
  @ApiProperty({ description: '是否删除' })
  isDelete: IsDelete;

  @Column({ nullable: true, default: () => 'CURRENT_TIMESTAMP', comment: '路由创建时间' })
  @ApiProperty({ description: '路由创建时间' })
  createdAt: Date;

  @Column({ nullable: true, onUpdate: 'CURRENT_TIMESTAMP', comment: '修改时间' })
  @ApiProperty({ description: '修改时间' })
  updatedAt: Date;

  @Column({
    type: 'enum',
    enum: Modifiable,
    default: Modifiable.MODIFY,
  })
  @ApiProperty({ description: '是否可修改' })
  isModifiable: number;
}
