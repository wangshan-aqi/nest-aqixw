import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { UsauthModule } from './usauth/usauth.module';
import { AuthModule } from './auth/auth.module';
import { MenuListModule } from './menu-list/menu-list.module';
import { ButtonPermissionsModule } from './button-permissions/button-permissions.module';
import { RolePermissionsModule } from './role-permissions/role-permissions.module';

@Module({
  imports: [
    UsersModule,
    UsauthModule,
    AuthModule,
    MenuListModule,
    ButtonPermissionsModule,
    RolePermissionsModule,
  ],
  exports: [
    UsersModule,
    UsauthModule,
    AuthModule,
    MenuListModule,
    ButtonPermissionsModule,
    RolePermissionsModule,
  ],
})
export class ModulesModule {}
