import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}
    create(createUserDto: CreateUserDto) {
        return this.usersRepository.save(createUserDto);
    }

    findAll() {
        return this.usersRepository.find();
    }

    findOne(id: number) {
        return this.usersRepository.findOne({
            where: {
                id,
            },
        });
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        this.usersRepository.update(id, updateUserDto);
        return {
            id,
            ...updateUserDto,
        };
    }

    async remove(id: number) {
        const result = await this.usersRepository.delete(id);
        return {
            message: `User with id ${id} has been deleted`,
            ...result,
            id,
        };
    }
}
