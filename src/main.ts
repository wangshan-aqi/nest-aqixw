import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { BadRequestException, HttpStatus, ValidationPipe, VersioningType } from '@nestjs/common';
import { HttpExceptionFilter } from './filter/all-exception.filter';
import { TransformResInterceptor } from './interceptor/transform-res.interceptor';
import * as session from 'express-session';
import { RequestInterceptor } from './interceptor/request.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  // app.enableVersioning({
  //   type: VersioningType.MEDIA_TYPE,
  //   key: 'v=',
  // });

  app.use(
    session({
      secret: process.env.SESSION_KEY, // session 密钥
      resave: false, // 是否重新保存session
      saveUninitialized: false, // 是否保存未初始化的session
      cookie: {
        secure: false,
      },
    }),
  );

  const port = app.get(ConfigService).get('port');
  const config = new DocumentBuilder()
    .setTitle('用户接口')
    .setDescription('接口文档描述')
    .setVersion('1.0')
    .addTag('user')
    .build();

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
  }); // 允许跨域

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // 自动转换类型 例如：@IsString() name: string; 会自动转换name为string类型
      // whitelist: true, // 白名单 会过滤掉非白名单的属性 例如：@IsString() name: string; 会过滤掉name属性 因为name不是string类型 会报错 但是不会返回给前端 会直接过滤掉
      forbidNonWhitelisted: true, // 禁止非白名单 会报错 例如：@IsString() name: string; 会报错 因为name不是string类型
      transformOptions: {
        enableImplicitConversion: false, // 启用隐式转换
      },
      validationError: {
        target: false, // 是否显示目标对象
        value: false, // 是否显示错误的值
      },
      errorHttpStatusCode: HttpStatus.BAD_REQUEST, // 错误状态码
      exceptionFactory: errors => {
        const message = Object.values(errors[0].constraints)[0];
        return new BadRequestException({
          code: HttpStatus.BAD_REQUEST,
          message,
        });
      },
    }),
  ); // 全局管道
  // 全局过滤器
  app.useGlobalFilters(
    new HttpExceptionFilter(), // 全局错误过滤器
  );
  // 全局拦截器
  app.useGlobalInterceptors(
    new TransformResInterceptor(), // 全局拦截器
  );

  // 全局路由前缀
  // 全局引入中间件
  // 全局引入自定义装饰器
  // 全局引入自定义管道

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))  //  全局替换日志系统
  app.useGlobalInterceptors(new RequestInterceptor()); //  对全局的接口 请求 进行日志记录
  await app.listen(port);
}
bootstrap();
