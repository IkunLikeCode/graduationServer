import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './modules/test/test.module';
import InitTypeOrm from './utils/initOrm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { ProductSuppliesModule } from './modules/product_supplies/product_supplies.module';
import { ProductDemandsModule } from './modules/product_demands/product_demands.module';
import { ProductCategoriesModule } from './modules/product_categories/product_categories.module';
import { ConversationsModule } from './modules/conversations/conversations.module';
import { MessagesModule } from './modules/messages/messages.module';
import { SmsCodesModule } from './modules/sms_codes/sms_codes.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, //全局模块，其他模块可以直接注入ConfigService
      envFilePath: ['.env'],
    }),
    TestModule,
    InitTypeOrm(),
    UsersModule,
    ProductSuppliesModule,
    ProductDemandsModule,
    ProductCategoriesModule,
    ConversationsModule,
    MessagesModule,
    SmsCodesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
