import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('icon_list')
export class IconListEntity {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty({ description: 'icon类id' })
  id: number;

  @PrimaryColumn()
  @ApiProperty({ description: 'icon类编码' })
  icon_id: string;

  @Column()
  name: string;

  @Column()
  @ApiProperty({ description: 'icon类' })
  font_class: string;

  @Column()
  unicode: string;

  @Column()
  unicode_decimal: number;
}
