import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

/** 返回数据拦截器 - 统一处理返回数据格式 */
@Injectable()
export class TransformResInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const statusCode = response.statusCode;
    const { method, url } = request;
    return next.handle().pipe(
      map(data => {
        return {
          statusCode: statusCode || 200,
          data,
          message: '请求成功',
          cmd: `${method} ${url}`,
        };
      }),
    );
  }
}
