import { Injectable } from '@nestjs/common';
import { CreateJudgeDto } from './dto/create-judge.dto';
import { UpdateJudgeDto } from './dto/update-judge.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Judge } from './entities/judge.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JudgeService {
    constructor(
        @InjectRepository(Judge)
        private repository: Repository<Judge>,
    ) {}

    create(createJudgeDto: CreateJudgeDto) {
        return this.repository.save(createJudgeDto);
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

    async update(id: number, updateJudgeDto: UpdateJudgeDto) {
        await this.repository.update(id, updateJudgeDto);
        return {
            id,
            ...updateJudgeDto,
        };
    }

    async remove(id: number) {
        const result = await this.repository.delete(id);
        return {
            message: `Judge with id ${id} has been deleted`,
            ...result,
            id,
        };
    }
}
