import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { version } from '../package.json';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getHealth(): any {
    return 'OK';
  }

  getVersion(): string {
    return version;
  }
}
