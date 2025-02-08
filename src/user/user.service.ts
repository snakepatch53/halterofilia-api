import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SaveFiles } from 'src/common/decorators/save-files.decorator';
import { USER_FILES_PATH } from 'src/common/constants/path.constants';
import { QueryUserDto } from './dto/query-user.dto';
import { UpdateFiles } from 'src/common/decorators/update-file.decorator';
import { DtoArg, FilesArg, IdArg } from 'src/common/decorators/file.decorators';
import { DeleteFiles } from 'src/common/decorators/delete-file.decorator';
import { ROLE } from 'src/common/constants/role.constants';
import { encryptPassword } from 'src/common/utils/encrypt.password';

const optionsFiles = {
    fieldName: 'photo',
    destination: USER_FILES_PATH,
};

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private repository: Repository<User>,
    ) {}

    findAll(query: QueryUserDto): Promise<User[]> {
        return this.repository.find({
            relations: query.include,
        });
    }

    @SaveFiles(optionsFiles)
    async create(
        @DtoArg() createUserDto: CreateUserDto,
        @FilesArg() files,
        query: QueryUserDto,
    ) {
        createUserDto.password = await encryptPassword(createUserDto.password);
        const created = await this.repository.save(createUserDto);
        return this.repository.findOne({
            where: { id: created.id },
            relations: query.include,
        });
    }

    @UpdateFiles(optionsFiles)
    async update(
        @DtoArg() updateUserDto: UpdateUserDto,
        @IdArg() id: number,
        @FilesArg() files,
        query: QueryUserDto,
    ) {
        if (updateUserDto.password)
            updateUserDto.password = await encryptPassword(
                updateUserDto.password,
            );
        await this.repository.save({ id, ...updateUserDto });
        return this.repository.findOne({
            where: { id },
            relations: query.include,
        });
    }

    @DeleteFiles(optionsFiles)
    async remove(@IdArg() id: number) {
        const result = await this.repository.delete(id);
        return {
            message: `User con id ${id} ha sido eliminado`,
            ...result,
            id,
        };
    }
}
