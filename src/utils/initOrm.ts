import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Test } from 'src/modules/test/entities/test.entity';
import { Conversation } from 'src/modules/conversations/entities/conversation.entity';
import { Message } from 'src/modules/messages/entities/message.entity';
import { ProductDemand } from 'src/modules/product_demands/entities/product_demand.entity';
import { ProductCategory } from 'src/modules/product_categories/entities/product_category.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { ProductSupply } from 'src/modules/product_supplies/entities/product_supply.entity';
import { SmsCode } from 'src/modules/sms_codes/entities/sms_code.entity';
export default function InitTypeOrm() {
  return TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (config: ConfigService) => {
      const type = (config.get<string>('DB_TYPE') || 'mysql') as any;
      const host = config.get<string>('DB_HOST') || 'localhost';
      const port = Number(config.get<string>('DB_PORT') || 3306);
      const username = config.get<string>('DB_USER') || 'root';
      const password = config.get<string>('DB_PASS') || '';
      const database = config.get<string>('DB_NAME') || 'role';
      return {
        type,
        host,
        port,
        username,
        password,
        database,
        entities: [
          Test,
          Conversation,
          Message,
          ProductDemand,
          ProductCategory,
          User,
          ProductSupply,
          SmsCode,
        ],
        synchronize: true,
        charset: 'utf8mb4',
        timezone: 'Z',
      };
    },
  });
}
