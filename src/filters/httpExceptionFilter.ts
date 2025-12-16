// 捕获所有的http异常
import {
  ExceptionFilter,
  Catch,
  HttpException,
  ArgumentsHost,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const errorMessage = exception.getResponse().message || '未知错误';
    response.status(status).json({
      code: status, //http状态码
      timestamp: new Date().toISOString(), //报错时间
      path: request.url, //请求路径
      message: errorMessage, //异常信息
      success: false,
    });
  }
}
