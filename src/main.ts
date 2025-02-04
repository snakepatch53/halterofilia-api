import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { WsAdapter } from './common/adapters/ws.adapter';
import { useContainer } from 'class-validator';
import * as express from 'express';
import { join } from 'path';

import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use('/public', express.static(join(__dirname, '..', 'public')));
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            transformOptions: { enableImplicitConversion: true }, // 🔥 Permite conversiones automáticas
        }),
    );
    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    // Centraliza la config de CORS en un solo objeto:
    const corsConfig = {
        origin: ['http://localhost:5173', 'https://ideasoft.one'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        credentials: true,
    };

    // 1. CORS para HTTP:
    app.enableCors(corsConfig);

    // 2. CORS para WebSockets (con adaptador):
    app.useWebSocketAdapter(new WsAdapter(app, corsConfig));

    await app.listen(process.env.APP_PORT ?? 3000);
}
void bootstrap();
