import { loadMongoConfig } from './config/helpers/loadMongoConfig';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { environmentVariables } from './config/helpers/environmentVariables.helper';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [environmentVariables],
    }),
    MongooseModule.forRootAsync({
      useFactory: loadMongoConfig,
      inject: [environmentVariables.KEY],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
