import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { version } from '../package.json';
import { loadConfig, config } from './config/helpers/environmentVariables.helper';

(async () => {
  await loadConfig();

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const documentation = new DocumentBuilder()
    .setTitle('Finanzas personales')
    .setVersion(version)
    .build();
  const document = SwaggerModule.createDocument(app, documentation);
  SwaggerModule.setup('docs', app, document);

  await app.listen(config.port, '0.0.0.0');
})();
