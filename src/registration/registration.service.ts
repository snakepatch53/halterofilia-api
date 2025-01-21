import { Injectable } from '@nestjs/common';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Registration } from './entities/registration.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RegistrationService {
    constructor(
        @InjectRepository(Registration)
        private repository: Repository<Registration>,
    ) {}

    create(createRegistrationDto: CreateRegistrationDto) {
        return this.repository.save(createRegistrationDto);
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

    async update(id: number, updateRegistrationDto: UpdateRegistrationDto) {
        await this.repository.update(id, updateRegistrationDto);
        return {
            id,
            ...updateRegistrationDto,
        };
    }

    async remove(id: number) {
        const result = await this.repository.delete(id);
        return {
            message: `Registration with id ${id} has been deleted`,
            ...result,
            id,
        };
    }
}
