import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { loadConfigs } from './config/helpers/loadConfigs.helper';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [loadConfigs],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
