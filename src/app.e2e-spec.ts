import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './app.module';
import { version } from '../package.json';
import * as request from 'supertest';
import { loadTestConfig } from './config/helpers/environmentVariables.helper';

describe('App (e2e)', () => {
  let app: INestApplication;
  loadTestConfig();

  beforeEach(async () => {
    const appModule: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = appModule.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET', () => {
    describe('/health', () => {
      it('should response 200', () => {
        return request(app.getHttpServer()).get('/health').expect(200).expect('OK');
      });
    });

    describe('/version', () => {
      it('should response 200', () => {
        return request(app.getHttpServer()).get('/version').expect(200).expect(version);
      });
    });
  });
});
