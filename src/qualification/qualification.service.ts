import { Injectable } from '@nestjs/common';
import { CreateQualificationDto } from './dto/create-qualification.dto';
import { UpdateQualificationDto } from './dto/update-qualification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Qualification } from './entities/qualification.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QualificationService {
    constructor(
        @InjectRepository(Qualification)
        private repository: Repository<Qualification>,
    ) {}

    create(createQualificationDto: CreateQualificationDto) {
        return this.repository.save(createQualificationDto);
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

    async update(id: number, updateQualificationDto: UpdateQualificationDto) {
        await this.repository.update(id, updateQualificationDto);
        return {
            id,
            ...updateQualificationDto,
        };
    }

    async remove(id: number) {
        const result = await this.repository.delete(id);
        return {
            message: `Qualification with id ${id} has been deleted`,
            ...result,
            id,
        };
    }
}
