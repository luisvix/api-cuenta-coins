import { Injectable } from '@nestjs/common';
import { version } from '../package.json';

@Injectable()
export class AppService {
  getHealth(): any {
    return 'OK';
  }

  getVersion(): string {
    return version;
  }
}
