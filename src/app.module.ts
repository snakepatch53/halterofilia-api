import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import * as dotenv from 'dotenv';
dotenv.config();

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            entities: [join(__dirname, '**', '*.entity.{ts,js}')],
            synchronize: process.env.PROD === 'true' ? false : true,
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
