import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取上下文 也就是获取http模块获取请求和响应对象
    const response = ctx.getResponse<Response>(); // 获取响应对象
    const request = ctx.getRequest<Request>(); // 获取请求对象
    console.log('exception', exception);

    const status = exception.getStatus(); // 获取错误状态码
    const exceptionRes = exception.getResponse() as any; // 获取错误信息
    const { code, message } = exceptionRes as any;
    const { method, url } = request;

    const errorResponse = {
      // 错误信息的格式
      statusCode: status || code, // 状态码
      message: message || '请求失败', // 错误信息
      data: null, // 返回的数据
      success: false, // 是否请求成功
      path: `${method} - ${url}`, // 请求方式 错误的接口地址
      timestamp: new Date().toLocaleDateString(), // 错误的时间
    };
    response.status(status).json(errorResponse); // 返回错误信息
  }
}
