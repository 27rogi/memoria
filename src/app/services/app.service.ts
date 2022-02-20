import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  welcome(): object {
    return {
      message: '🌃 Hello there, General Kenobi',
      response:
        'Looks like you are working with my API or just got here by mistake!',
    };
  }
}
