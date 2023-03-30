import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // app.enableCors({
  //   origin: "*",
  //   methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  //   allowedHeaders:
  //     "Content-Type, Accept, Access-Control-Allow-Origin, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  //   credentials: true,
  // });
  await app.listen(3000);
}
bootstrap();
