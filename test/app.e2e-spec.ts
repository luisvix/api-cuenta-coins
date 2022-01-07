import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { version } from '../package.json';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
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
