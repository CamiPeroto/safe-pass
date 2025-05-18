import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

 app.enableCors({
    origin: 'http://localhost:3000', // endereço do frontend
    credentials: true, // permite envio de cookies e headers como Authorization
  });

  await app.listen(process.env.PORT ?? 3333);
}
bootstrap();


