import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private repository: Repository<Category>,
    ) {}

    create(createCategoryDto: CreateCategoryDto) {
        return this.repository.save(createCategoryDto);
    }

    findAll() {
        return this.repository.find();
    }

    findOne(id: number) {
        return this.repository.findOne({
            where: {
                id,
            },
        });
    }

    async update(id: number, updateCategoryDto: UpdateCategoryDto) {
        await this.repository.update(id, updateCategoryDto);
        return {
            id,
            ...updateCategoryDto,
        };
    }

    async remove(id: number) {
        const result = await this.repository.delete(id);
        return {
            message: `Category with id ${id} has been deleted`,
            ...result,
            id,
        };
    }
}
