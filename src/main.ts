import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { version } from '../package.json';
import { loadConfig, config } from './config/helpers/environmentVariables.helper';

(async () => {
  await loadConfig();

  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({ transform: true, transformOptions: { enableImplicitConversion: true } }),
  );

  const documentation = new DocumentBuilder()
    .setTitle('Finanzas personales')
    .setVersion(version)
    .build();
  const document = SwaggerModule.createDocument(app, documentation);
  SwaggerModule.setup('docs', app, document);

  await app.listen(config.port, '0.0.0.0');
})();
