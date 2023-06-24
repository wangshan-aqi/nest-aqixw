import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/common/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../users/entities/user.entity';
import { UserNameLocalStrategy } from './guard/local-name.strategy';
import { EmailLocalStrategy } from './guard/local-email.strategy';
import { TelPhoneLocalStrategy } from './guard/local-phone.strategy';
import { JwtStrategy } from './guard/jwt.strategy';
import { ToolService } from 'src/common/tool.service';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([Users]),
    PassportModule.register({}),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    UserNameLocalStrategy,
    EmailLocalStrategy,
    TelPhoneLocalStrategy,
    JwtStrategy,
    ToolService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
