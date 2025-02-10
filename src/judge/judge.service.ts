import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateJudgeDto } from './dto/create-judge.dto';
import { UpdateJudgeDto } from './dto/update-judge.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Judge } from './entities/judge.entity';
import { Repository } from 'typeorm';
import { QueryJudgeDto } from './dto/query-judge.dto';
import { User } from 'src/user/entities/user.entity';
import { ROLE } from 'src/common/constants/role.constants';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class JudgeService {
    constructor(
        @InjectRepository(Judge)
        private repository: Repository<Judge>,
        @InjectRepository(Category)
        private repositoryCategory: Repository<Category>,
    ) {}

    findAllByCategoryId(id: number, query: QueryJudgeDto, user: User) {
        if (user.role === ROLE.ADMIN)
            return this.repository.find({
                where: { category: { id } },
                relations: query.include,
            });
        return this.repository.find({
            where: { category: { id, championship: { user } } },
            relations: query.include,
        });
    }

    async create(
        createJudgeDto: CreateJudgeDto,
        query: QueryJudgeDto,
        user: User,
    ) {
        let created = null;
        if (user.role === ROLE.ADMIN)
            created = await this.repository.save(createJudgeDto);
        else {
            const myCategories = await this.repositoryCategory.findOne({
                where: {
                    id: createJudgeDto.categoryId,
                    championship: { user },
                },
            });
            if (!myCategories)
                throw new ForbiddenException(
                    'No puedes crear un Juez en la categoría de una competencia que no te pertenece',
                );
            created = await this.repository.save(createJudgeDto);
        }
        return this.repository.findOne({
            where: { id: created.id },
            relations: query.include,
        });
    }

    async update(
        id: number,
        updateJudgeDto: UpdateJudgeDto,
        query: QueryJudgeDto,
        user: User,
    ) {
        if (user.role === ROLE.ADMIN)
            await this.repository.save({
                id,
                ...updateJudgeDto,
                user: updateJudgeDto.user,
                category: updateJudgeDto.category,
            });
        else {
            const myRow = await this.repository.findOne({
                where: { id, category: { championship: { user } } },
            });
            if (!myRow)
                throw new ForbiddenException(
                    'No puedes editar un Juez en la categoría de una competencia que no te pertenece',
                );
            await this.repository.save({
                id,
                ...updateJudgeDto,
                user: updateJudgeDto.user,
                category: updateJudgeDto.category,
            });
        }
        return this.repository.findOne({
            where: { id },
            relations: query.include,
        });
    }

    async remove(id: number, user: User) {
        let result = null;
        if (user.role === ROLE.ADMIN) result = await this.repository.delete(id);
        else {
            const myRow = await this.repository.findOne({
                where: { id, category: { championship: { user } } },
            });

            if (myRow) result = await this.repository.delete(id);
            else
                throw new ForbiddenException(
                    'No puedes eliminar un Juez en la categoría de una competencia que no te pertenece',
                );
        }
        return result;
    }
}
