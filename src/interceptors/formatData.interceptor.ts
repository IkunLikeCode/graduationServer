// 格式化数据拦截器
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class FormatDataInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      tap((data) => {
        context.switchToHttp().getResponse().status(200).json({
          code: 200,
          message: '请求成功',
          data,
          success: true,
        });
      }),
    );
  }
}
