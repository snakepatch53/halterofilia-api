import { Module } from '@nestjs/common';
import { LiftingService } from './lifting.service';
import { LiftingController } from './lifting.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lifting } from './entities/lifting.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Lifting])],
    controllers: [LiftingController],
    providers: [LiftingService],
})
export class LiftingModule {}
