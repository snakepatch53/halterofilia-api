import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { QueryCategoryDto } from './dto/query-category.dto';
import { User } from 'src/user/entities/user.entity';
import { ROLE } from 'src/common/constants/role.constants';
import { Championship } from 'src/championship/entities/championship.entity';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private repository: Repository<Category>,
        @InjectRepository(Championship)
        private repositoryChampionship: Repository<Championship>,
    ) {}

    findAllByChampionshipId(id: number, query: QueryCategoryDto, user: User) {
        if (user.role === ROLE.ADMIN)
            return this.repository.find({
                where: { championship: { id } },
                relations: query.include,
            });
        return this.repository.find({
            where: { championship: { id, user } },
            relations: query.include,
        });
    }

    findOne(id: number, query: QueryCategoryDto, user: User) {
        if (user.role === ROLE.ADMIN)
            return this.repository.findOne({
                where: { id },
                relations: query.include,
            });
        return this.repository.findOne({
            where: { id, championship: { user: user } },
            relations: query.include,
        });
    }

    async create(
        createCategoryDto: CreateCategoryDto,
        query: QueryCategoryDto,
        user: User,
    ) {
        let created = null;
        if (user.role === ROLE.ADMIN)
            created = await this.repository.save(createCategoryDto);
        else {
            const myChampionships = await this.repositoryChampionship.findOne({
                where: { id: createCategoryDto.championshipId, user },
            });
            if (!myChampionships)
                throw new ForbiddenException(
                    'No puedes crear una categoría en una competencia que no te pertenece',
                );

            created = await this.repository.save({
                ...createCategoryDto,
                championship: createCategoryDto.championship,
            });
        }

        return this.repository.findOne({
            where: { id: created.id },
            relations: query.include,
        });
    }

    async update(
        id: number,
        updateCategoryDto: UpdateCategoryDto,
        query: QueryCategoryDto,
        user: User,
    ) {
        if (user.role === ROLE.ADMIN)
            await this.repository.save({
                id,
                ...updateCategoryDto,
                championship: updateCategoryDto.championship,
            });
        else {
            const myRow = await this.repository.findOne({
                where: { id, championship: { user } },
                relations: ['championship', 'championship.user'],
            });
            if (!myRow)
                throw new ForbiddenException(
                    'No puedes editar una categoría en una competencia que no te pertenece',
                );
            await this.repository.save({
                id,
                ...updateCategoryDto,
                championship: updateCategoryDto.championship,
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
                where: { id, championship: { user } },
                relations: ['championship', 'championship.user'],
            });

            if (myRow) result = await this.repository.delete(id);
            else
                throw new ForbiddenException(
                    'No puedes eliminar una categoría en una competencia que no te pertenece',
                );
        }
        return result;
    }
}
