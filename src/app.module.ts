import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { InstitutionModule } from './institution/institution.module';
import { RegistrationModule } from './registration/registration.module';
import { ChampionshipModule } from './championship/championship.module';
import { CategoryModule } from './category/category.module';
import { LiftingModule } from './lifting/lifting.module';
import { QualificationModule } from './qualification/qualification.module';
import { JudgeModule } from './judge/judge.module';

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
        InstitutionModule,
        RegistrationModule,
        ChampionshipModule,
        CategoryModule,
        LiftingModule,
        QualificationModule,
        JudgeModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
