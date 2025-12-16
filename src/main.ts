import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/httpExceptionFilter';
import { AppExceptionFilter } from './filters/appExceptionFi;ter';
import { FormatDataInterceptor } from './interceptors/formatData.interceptor';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpAdapterHost = app.get(HttpAdapterHost);
  const config = app.get(ConfigService);
  // 注册全局验证管道
  app.useGlobalPipes(new ValidationPipe());
  // 添加请求前缀
  app.setGlobalPrefix('api');
  // 注册全局应用异常过滤器
  app.useGlobalFilters(new AppExceptionFilter(httpAdapterHost));
  // 注册全局Http异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 注册全局格式化数据拦截器
  app.useGlobalInterceptors(new FormatDataInterceptor());
  const appPort = Number(config.get<string>('APP_PORT') ?? 3000);
  await app.listen(appPort);
}
bootstrap();
