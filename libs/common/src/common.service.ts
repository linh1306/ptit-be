import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHmac } from 'crypto';

@Injectable()
export class CommonService {
  private readonly keySecret: string;

  constructor(private readonly config: ConfigService) {
    this.keySecret = this.config.get<string>('KEY_SECRET');
  }

  createHashPassword(password: string): string {
    const hmac = createHmac('sha256', this.keySecret);
    return hmac.update(password).digest('hex');
  }
}
