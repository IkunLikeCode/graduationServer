import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './modules/test/test.module';
import InitTypeOrm from './utils/initOrm';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, //全局模块，其他模块可以直接注入ConfigService
      envFilePath: ['.env'],
    }),
    TestModule,
    InitTypeOrm(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
