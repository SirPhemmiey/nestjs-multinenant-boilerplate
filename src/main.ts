import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import * as compression from 'compression';
import helmet from 'helmet';
import { tenancyMiddleware } from 'modules/tenancy/tenancy.middleware';
import { getDataSource, getTenantConnection } from 'modules/tenancy/tenancy.utils';
import * as morgan from 'morgan';
import { HttpTransformInterceptor } from 'utils/transformers/http-response.transformer';
import { AppModule } from './app.module';
import { AllConfigType } from './config/config.type';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'log']
  });

  app.use(compression());
  app.use(helmet());
  app.enableCors({ origin: true });

  app.use(tenancyMiddleware);

  const initDataSource = await (await getDataSource()).initialize();
  const isInitialized = await initDataSource.isInitialized;

  //public migrations
  await initDataSource.runMigrations();

  const schemas = await initDataSource.query('select schema_name as name from information_schema.schemata;');

  for (let i = 0; i < schemas.length; i += 1) {
    const { name: schema } = schemas[i];

    if (schema.startsWith('tenant_')) {
      const tenantId = schema.replace('tenant_', '');
      const connection = await getTenantConnection(tenantId);
      await connection.runMigrations();
      await connection.destroy();
    }
  }


  //this allows class-validator to use NestJS dependency injection container.
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.enableShutdownHooks();

  const configService = app.get(ConfigService<AllConfigType>);
  app.setGlobalPrefix(
    configService.getOrThrow('app.apiPrefix', { infer: true }),
    {
      exclude: ['/'],
    },
  );

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1'
  });

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: configService.getOrThrow('app.isProduction', { infer: true }) ? true : false,
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  //basic request/response console logging library
  app.use(morgan('tiny'));

  //configure global http transform interceptor
  app.useGlobalInterceptors(new HttpTransformInterceptor());

  const initializedDataSource = (await getDataSource()).initialize();
  (await initializedDataSource).runMigrations();

  await app.listen(configService.getOrThrow('app.port', { infer: true }));
  console.log(`Application is running on: ${await app.getUrl()}`);
}


bootstrap();
