import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsauthModule } from './modules/usauth/usauth.module';
import configuration from './config/configuration';
import databaseConfig from './config/database.config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ValidationInterceptor } from './shard/validation.interceptor';

@Module({
  imports: [
    // https://docs.nestjs.cn/9/techniques?id=%e9%85%8d%e7%bd%ae
    ConfigModule.forRoot({
      envFilePath: ['.env.development', `.env.${process.env.NODE_ENV}`], // 环境变量文件
      isGlobal: true, // 全局模块
      load: [configuration, databaseConfig], // 加载配置文件
      ignoreEnvFile: false, // 忽略环境变量文件
      expandVariables: true, // 扩展变量
      validationSchema: undefined, // 验证模式
      validationOptions: undefined, // 验证选项
      cache: false // 缓存
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const databaseConfig = configService.get('database');
        return {
          type: databaseConfig.type,
          host: databaseConfig.database.host,
          port: databaseConfig.database.port,
          username: databaseConfig.database.username,
          password: databaseConfig.database.password,
          database: databaseConfig.database.database,
          // entities: [__dirname + '/**/*.entity{.ts,.js}'],
          autoLoadEntities: true,
          synchronize: true // 生产环境下不要使用
        };
      },
      inject: [ConfigService]
    }),
    UsersModule,
    UsauthModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // 注册全局的拦截器
    {
      provide: APP_INTERCEPTOR,
      useClass: ValidationInterceptor
    }
  ]
})
export class AppModule {}
