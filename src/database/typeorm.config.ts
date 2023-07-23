import { ConfigService } from "@nestjs/config";
import * as dotenv from "dotenv";
import { join } from "path";
import { DataSource, DataSourceOptions } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
dotenv.config();

const config = new ConfigService();

export const ormConfig: PostgresConnectionOptions = {
  type: config.get<DataSourceOptions>('DATABASE_TYPE', {
    infer: true,
  }),
  host: config.get<string>('DATABASE_HOST', { infer: true }),
  port: config.get<number>('DATABASE_PORT', { infer: true }),
  database: config.get<string>('DATABASE_NAME', { infer: true }),
  username: config.get<string>('DATABASE_USERNAME', { infer: true }),
  password: config.get<string>('DATABASE_PASSWORD', { infer: true }),
  migrations: [join(__dirname, '/migrations/public/*{.ts,.js}')],
  entities: [join(__dirname, '/modules/public/**/entities/*{.ts,.js}')],
  logging: true,
  synchronize: config.get('DATABASE_SYNCHRONIZE', {
    infer: true,
  }),
  cache: {
    alwaysEnabled: true,
  },
  // namingStrategy: new SnakeNamingStrategy(),

};

const AppDataSource = new DataSource(ormConfig);

export default AppDataSource;
