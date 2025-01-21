import { Injectable } from '@nestjs/common';
import { CreateLiftingDto } from './dto/create-lifting.dto';
import { UpdateLiftingDto } from './dto/update-lifting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lifting } from './entities/lifting.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LiftingService {
    constructor(
        @InjectRepository(Lifting)
        private repository: Repository<Lifting>,
    ) {}

    create(createLiftingDto: CreateLiftingDto) {
        return this.repository.save(createLiftingDto);
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

    async update(id: number, updateLiftingDto: UpdateLiftingDto) {
        await this.repository.update(id, updateLiftingDto);
        return {
            id,
            ...updateLiftingDto,
        };
    }

    async remove(id: number) {
        const result = await this.repository.delete(id);
        return {
            message: `Lifting with id ${id} has been deleted`,
            ...result,
            id,
        };
    }
}
