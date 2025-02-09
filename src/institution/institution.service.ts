import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Institution } from './entities/institution.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { ROLE } from 'src/common/constants/role.constants';
import { QueryInstitutionDto } from './dto/query-institution.dto';

@Injectable()
export class InstitutionService {
    constructor(
        @InjectRepository(Institution)
        private repository: Repository<Institution>,
    ) {}

    findAll(query: QueryInstitutionDto, user: User) {
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
        createInstitutionDto: CreateInstitutionDto,
        query: QueryInstitutionDto,
        user: User,
    ) {
        let created = null;
        if (user.role === ROLE.ADMIN)
            created = await this.repository.save(createInstitutionDto);
        else
            created = await this.repository.save({
                ...createInstitutionDto,
                user: user,
            });

        return this.repository.findOne({
            where: { id: created.id },
            relations: query.include,
        });
    }

    async update(
        id: number,
        updateInstitutionDto: UpdateInstitutionDto,
        query: QueryInstitutionDto,
        user: User,
    ) {
        if (user.role === ROLE.ADMIN)
            await this.repository.save({
                id,
                ...updateInstitutionDto,
                user: updateInstitutionDto.user, // Hay que definir explícitamente la relación que no se mapea automáticamente
            });
        else {
            const institution = await this.repository.findOne({
                where: { id },
                relations: ['user'],
            });

            if (institution.user.id === user.id)
                await this.repository.save({
                    id,
                    ...updateInstitutionDto,
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
            const institution = await this.repository.findOne({
                where: { id },
                relations: ['user'],
            });

            if (institution.user.id === user.id)
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
