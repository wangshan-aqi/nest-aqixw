import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BannerModule } from './banner/banner.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "Chang521",
      database: "test",
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true
    }),
    BannerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
