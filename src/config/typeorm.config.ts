import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'roi',
  password: 'eWUBa3PEGGnXpZ27n943AWFpnUX',
  database: 'taskmanagement',
  entities: [`${__dirname  }/../**/*.entity.{js,ts}`],
  synchronize: true,
};
