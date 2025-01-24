import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import * as dotenv from 'dotenv';
import { WsAdapter } from './common/adapters/ws.adapter';
dotenv.config();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
        }),
    );

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
