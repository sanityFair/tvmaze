import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module.js';

import 'reflect-metadata';

const DEFAULT_PORT = 3000;

const app = await NestFactory.create(AppModule);
app.setGlobalPrefix('api');
app.enableShutdownHooks();

await app.listen(Number(process.env.PORT ?? DEFAULT_PORT));
