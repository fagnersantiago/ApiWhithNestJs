import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use((req, res, next) => {
    console.log(`Route: ${req.method} ${req.url}`);
    next();
  });
  await app.listen(3333, () => {
    console.log('server started on port 3333');
  });
}
bootstrap();
