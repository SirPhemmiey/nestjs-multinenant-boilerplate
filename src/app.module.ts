import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import appConfig from 'config/app.config';
import authConfig from 'config/auth.config';
import databaseConfig from 'config/database.config';
import { TenancyModule } from 'modules/tenancy/tenancy.module';
import { SnakeNamingStrategy } from 'snake-naming-strategy';
import { DataSourceOptions } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { OrganizationsModule } from './modules/public/organizations/organization.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, authConfig, appConfig],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        type: config.get<DataSourceOptions>('database.type', {
          infer: true,
        }),
        host: config.get<string>('database.host', { infer: true }),
        port: config.get<number>('database.port', { infer: true }),
        database: config.get<string>('database.name', { infer: true }),
        username: config.get<string>('database.username', { infer: true }),
        password: config.get<string>('database.password', { infer: true }),
        autoLoadEntities: true,
        entities: [],
        logging: true,
        synchronize: config.get('database.synchronize', {
          infer: true,
        }),
        keepConnectionAlive: true,
        namingStrategy: new SnakeNamingStrategy()
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    UsersModule,
    OrganizationsModule,
    TenancyModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
