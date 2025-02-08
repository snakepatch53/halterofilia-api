import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateChampionshipDto } from './dto/create-championship.dto';
import { UpdateChampionshipDto } from './dto/update-championship.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Championship } from './entities/championship.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { QueryChampionshipDto } from './dto/query-championship.dto';
import { ROLE } from 'src/common/constants/role.constants';

@Injectable()
export class ChampionshipService {
    constructor(
        @InjectRepository(Championship)
        private repository: Repository<Championship>,
    ) {}

    findAll(query: QueryChampionshipDto, user: User) {
        if (user.role === ROLE.ADMIN)
            return this.repository.find({
                relations: query.include,
            });

        return this.repository.find({
            where: { user: user },
            relations: query.include,
        });
    }

    async create(
        createChampionshipDto: CreateChampionshipDto,
        query: QueryChampionshipDto,
        user: User,
    ) {
        let created = null;
        if (user.role === ROLE.ADMIN)
            created = await this.repository.save(createChampionshipDto);
        else
            created = await this.repository.save({
                ...createChampionshipDto,
                user: user,
            });

        return this.repository.findOne({
            where: { id: created.id },
            relations: query.include,
        });
    }

    async update(
        id: number,
        updateChampionshipDto: UpdateChampionshipDto,
        query: QueryChampionshipDto,
        user: User,
    ) {
        if (user.role === ROLE.ADMIN)
            await this.repository.save({
                id,
                ...updateChampionshipDto,
                user: updateChampionshipDto.user, // Hay que definir explícitamente la relación que no se mapea automáticamente
            });
        else {
            const row = await this.repository.findOne({
                where: { id },
                relations: ['user'],
            });

            if (row.user.id === user.id)
                await this.repository.save({
                    id,
                    ...updateChampionshipDto,
                    user: user,
                });
            else
                throw new ForbiddenException(
                    'Solo puedes editar tus instituciones',
                );
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
            const row = await this.repository.findOne({
                where: { id },
                relations: ['user'],
            });

            if (row.user.id === user.id)
                result = await this.repository.delete(id);
            else
                throw new ForbiddenException(
                    'Solo puedes eliminar tus instituciones',
                );
        }

        return {
            ...result,
            message: `Institución con id ${id} ha sido eliminada`,
        };
    }
}
