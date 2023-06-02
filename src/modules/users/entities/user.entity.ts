import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Gander, IsDelete } from '../dto/create-user.dto';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid', { comment: '用户id' })
  user_id: string;

  @ApiProperty({ description: '用户名', example: 'admin' })
  @Column({ type: 'varchar', length: 50, nullable: false, comment: '用户名' })
  user_name: string;

  @ApiProperty({ description: '密码', example: '123456' })
  @Column({ type: 'varchar', length: 50, comment: '密码' })
  user_password: string;

  @ApiProperty({
    description: '邮箱',
    example: 'test123@qq.com'
  })
  @Column({
    type: 'varchar',
    length: 50,
    nullable: true, // 可以为空
    comment: '邮箱'
  })
  email: string;

  @ApiProperty({
    description: '手机号',
    example: '12345678901',
    required: true,
    type: 'string'
  })
  @Column({ type: 'varchar', length: 11, comment: '手机号' })
  tel_phone: string;

  @ApiProperty({
    description: '头像',
    example: 'http://xxx.com/xxx.png',
    required: false,
    type: 'string'
  })
  @Column({ type: 'varchar', length: 255, nullable: true, comment: '头像' })
  avatar: string;

  @ApiProperty({
    description: '个人简介',
    example: '个人简介---1'
  })
  @Column({ type: 'varchar', length: 255, comment: '个人简介' })
  introduce: string;

  @ApiProperty({
    description: '性别',
    example: 0,
    required: false,
    type: 'number'
  })
  @Column({ type: 'enum', enum: Gander, comment: '性别' })
  gander: Gander;

  // @ApiProperty({
  //   description: '是否删除',
  //   example: 0,
  //   required: false,
  //   type: IsDelete
  // })
  @Column({
    type: 'enum',
    enum: IsDelete,
    default: IsDelete.NODELETE,
    comment: '是否删除'
  })
  is_deleted: IsDelete;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  create_time: Date;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP'
  })
  update_time: Date;
}
