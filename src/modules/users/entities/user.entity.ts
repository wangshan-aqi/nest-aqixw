import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn, QueryBuilder } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsDelete, RegistrationMethod } from '../dto/create-user.dto';
import { BcryptService } from '../../../common/bcrypt.service';

@Entity()
export class Users {
  @PrimaryGeneratedColumn({ comment: '用户id' })
  userId: number;

  @Column({ type: 'varchar', length: 50, nullable: true, comment: '用户名' })
  userName: string;

  @Column({
    type: 'varchar',
    length: 11,
    unique: true, // 唯一
    nullable: true, // 可以为空
    comment: '手机号',
  })
  telPhone: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true, // 可以为空
    unique: true, // 唯一
    comment: '邮箱',
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false, // 不可为空
    comment: '密码',
  })
  userPassword: string;
  @Column({
    type: 'enum',
    enum: RegistrationMethod,
    default: RegistrationMethod.PHONE,
    comment: '注册方式',
  })
  registrationMethod: RegistrationMethod;

  @Column({
    type: 'enum',
    enum: IsDelete,
    default: IsDelete.NODELETE,
    comment: '是否删除',
  })
  isDeleted: IsDelete;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updateDate: Date;

  /**
   * 使用装饰器@BeforeInsert来装饰encryptPwd方法，表示该方法在数据插入之前调用，这样就能保证插入数据库的密码都是加密后的。
   */
  @BeforeInsert() // 在插入之前调用 加密密码 保证插入数据库的密码都是加密后的 密码加密 用到了bcryptjs 这个库
  private async encryptPwd() {
    this.userPassword = await BcryptService.hash(this.userPassword);
  }
}
