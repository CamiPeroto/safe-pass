import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Conexão realizada com sucesso, tome o Hello World!';
  }
}
