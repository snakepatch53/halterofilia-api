import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

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
        AuthModule,
        UserModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
