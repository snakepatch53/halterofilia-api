import { Injectable } from '@nestjs/common';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Institution } from './entities/institution.entity';
import { Repository } from 'typeorm';
import { QueriesInstitutionDto } from './dto/queries-institution.dto';

@Injectable()
export class InstitutionService {
    constructor(
        @InjectRepository(Institution)
        private repository: Repository<Institution>,
    ) {}

    async create(
        createInstitutionDto: CreateInstitutionDto,
        query: QueriesInstitutionDto,
    ) {
        const created = await this.repository.save(createInstitutionDto);
        return this.repository.findOne({
            where: {
                id: created.id,
            },
            relations: query.include,
        });
    }

    findAll(query: QueriesInstitutionDto) {
        return this.repository.find({
            relations: query.include,
        });
    }

    findOne(id: number, query: QueriesInstitutionDto) {
        return this.repository.findOne({
            where: {
                id,
            },
            relations: query.include,
        });
    }

    async update(
        id: number,
        updateInstitutionDto: UpdateInstitutionDto,
        query: QueriesInstitutionDto,
    ) {
        await this.repository.save({
            id,
            ...updateInstitutionDto,
        });
        return this.repository.findOne({
            where: {
                id,
            },
            relations: query.include,
        });
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
