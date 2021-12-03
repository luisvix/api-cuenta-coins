import { Injectable } from '@nestjs/common';
import { version } from '../package.json';

@Injectable()
export class AppService {
  getHealth(): string {
    return 'OK';
  }

  getVersion(): string {
    return version;
  }
}
