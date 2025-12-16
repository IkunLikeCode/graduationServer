import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Test } from 'src/modules/test/entities/test.entity';
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
        entities: [Test],
        synchronize: true,
        charset: 'utf8mb4',
        timezone: 'Z',
      };
    },
  });
}
