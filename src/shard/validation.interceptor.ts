import {
  BadRequestException,
  CallHandler,
  ClassSerializerInterceptorOptions,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import {
  ClassTransformOptions,
  classToPlain,
  plainToClass
} from 'class-transformer';
import { Observable, map } from 'rxjs';
import { validate } from 'class-validator';

@Injectable()
export class ValidationInterceptor implements NestInterceptor {
  constructor(
    private readonly validationOptions?: ClassSerializerInterceptorOptions,
    private readonly transformOptions?: ClassTransformOptions
  ) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    if (req.body) {
      const transformedBody = plainToClass(
        req.body.constructor,
        req.body,
        this.transformOptions
      ); // 对请求体进行转换
      const errors = await validate(transformedBody, this.validationOptions);
      if (errors.length > 0) {
        throw new BadRequestException(errors);
      }
    }
    // const dto = plainToClass(context.getClass(), req.body);
    return next
      .handle()
      .pipe(map(data => classToPlain(data, this.transformOptions))); // 对响应数据类型进行转换
  }
}
