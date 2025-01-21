import { Module } from '@nestjs/common';
import { ChampionshipService } from './championship.service';
import { ChampionshipController } from './championship.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Championship } from './entities/championship.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Championship])],
    controllers: [ChampionshipController],
    providers: [ChampionshipService],
})
export class ChampionshipModule {}
