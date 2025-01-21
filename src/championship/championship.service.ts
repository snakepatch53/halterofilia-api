import { Injectable } from '@nestjs/common';
import { CreateChampionshipDto } from './dto/create-championship.dto';
import { UpdateChampionshipDto } from './dto/update-championship.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Championship } from './entities/championship.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChampionshipService {
    constructor(
        @InjectRepository(Championship)
        private repository: Repository<Championship>,
    ) {}

    create(createChampionshipDto: CreateChampionshipDto) {
        return this.repository.save(createChampionshipDto);
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

    async update(id: number, updateChampionshipDto: UpdateChampionshipDto) {
        await this.repository.update(id, updateChampionshipDto);
        return {
            id,
            ...updateChampionshipDto,
        };
    }

    async remove(id: number) {
        const result = await this.repository.delete(id);
        return {
            message: `Championship with id ${id} has been deleted`,
            ...result,
            id,
        };
    }
}
