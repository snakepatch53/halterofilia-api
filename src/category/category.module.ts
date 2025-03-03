import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Championship } from 'src/championship/entities/championship.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Category, Championship])],
    controllers: [CategoryController],
    providers: [CategoryService],
})
export class CategoryModule {}
