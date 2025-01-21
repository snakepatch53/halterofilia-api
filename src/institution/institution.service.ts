import { Injectable } from '@nestjs/common';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Institution } from './entities/institution.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InstitutionService {
    constructor(
        @InjectRepository(Institution)
        private repository: Repository<Institution>,
    ) {}

    create(createInstitutionDto: CreateInstitutionDto) {
        return this.repository.save(createInstitutionDto);
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

    async update(id: number, updateInstitutionDto: UpdateInstitutionDto) {
        await this.repository.update(id, updateInstitutionDto);
        return {
            id,
            ...updateInstitutionDto,
        };
    }

    async remove(id: number) {
        const result = await this.repository.delete(id);
        return {
            message: `Institution with id ${id} has been deleted`,
            ...result,
            id,
        };
    }
}
