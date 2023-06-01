import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum AuthType {
  MENU = '0',
  BUTTON = '1'
}

export enum IsDelete {
  DELETE = '0',
  NODELETE = '1'
}

@Entity()
export class Usauth {
  @PrimaryGeneratedColumn()
  auth_id: number;

  @Column({ length: 255 })
  auth_name: string;

  @Column({ type: 'enum', enum: AuthType, comment: '0: 菜单, 1: 按钮' })
  auth_type: AuthType;

  @Column({ length: 255 })
  auth_url: string;

  @Column({ length: 255, comment: '权限图标' })
  auth_icon: string;

  @Column({ type: 'enum', enum: IsDelete, comment: '0: 否, 1: 是' })
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
