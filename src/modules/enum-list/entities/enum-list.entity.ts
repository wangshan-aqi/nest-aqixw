import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('enum-list')
export class EnumListEntity {
  @PrimaryGeneratedColumn()
  id: number; // 枚举id

  @Column()
  @ApiProperty({ description: '枚举类型', example: 'menu' })
  type: string; // 枚举类型

  @Column()
  @ApiProperty({ description: '枚举名称', example: 'menu' })
  enumName: string; // 枚举名称

  @Column()
  @ApiProperty({ description: '枚举键', example: 0 })
  enumCode: number; // 枚举键

  @Column()
  @ApiProperty({ description: '枚举值', example: '普通用户' })
  enumValue: string; // 枚举值

  @Column()
  @ApiProperty({ description: '枚举描述', example: 'menu' })
  enumDesc: string; // 枚举描述
}
