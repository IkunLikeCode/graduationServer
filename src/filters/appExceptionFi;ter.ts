// 捕获整个应用异常
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  // 注入HttpAdapterHost 这是 用来获取http适配器的
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  catch(exception: any, host: ArgumentsHost) {
    // 由专门的 HttpExceptionFilter 处理 HTTP 异常，避免重复响应
    if (exception instanceof HttpException) {
      return;
    }
    const { httpAdapter } = this.httpAdapterHost; //拿到http适配器 为了适配不同的http平台 比如说 express 或者 fastify
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    // 如果响应已发送，直接退出，避免重复设置响应头
    // @ts-ignore
    if (response && response.headersSent) {
      return;
    }
    const request = ctx.getRequest();
    // 处理异常  如果是http异常 就用http异常的状态码 否则用500
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const responseBody = {
      code: httpStatus,
      timestamp: new Date().toISOString(), //报错时间
      path: request.url, //请求路径
      message: exception.message || '未知错误', //异常信息
      success: false,
    };
    httpAdapter.reply(response, responseBody, httpStatus);
  }
}
