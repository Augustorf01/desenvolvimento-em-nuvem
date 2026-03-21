import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";
import { getBackendEnv } from "./config/env";

async function bootstrap() {
  const env = getBackendEnv();
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: env.corsOrigin,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle("Biblioteca em Nuvem API")
    .setDescription("API para autenticacao, catalogo de itens e reviews.")
    .setVersion("1.0.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  await app.listen(env.port);
}

void bootstrap();
