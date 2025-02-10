import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    UploadedFile,
    UploadedFiles,
    Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ROLE } from 'src/common/constants/role.constants';
import { ParamUserDto } from './dto/param-user.dto';
import { ValidateFiles } from 'src/common/decorators/validate-files.decorator';
import { plainToInstance } from 'class-transformer';
import { ResponseUserDto } from './dto/response-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { Public } from 'src/auth/decorators/public.decorator';

const optionsFiles = {
    fieldName: 'photo',
    allowedTypes: ['image/png', 'image/jpg', 'image/jpeg'],
};
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Public()
    @Get()
    async findAll(@Query() query: QueryUserDto): Promise<ResponseUserDto[]> {
        return plainToInstance(
            ResponseUserDto,
            await this.userService.findAll(query),
        );
    }

    @Roles(ROLE.ADMIN)
    @Post()
    @ValidateFiles(optionsFiles)
    async create(
        @UploadedFiles() files,
        @Body() createUserDto: CreateUserDto,
        @Query() query: QueryUserDto,
    ): Promise<ResponseUserDto> {
        return plainToInstance(
            ResponseUserDto,
            await this.userService.create(createUserDto, files, query),
        );
    }

    @Roles(ROLE.ADMIN)
    @Patch(':id')
    @ValidateFiles(optionsFiles)
    async update(
        @Param() { id }: ParamUserDto,
        @UploadedFiles() files,
        @Body() updateUserDto: UpdateUserDto,
        @Query() query: QueryUserDto,
    ): Promise<ResponseUserDto> {
        return plainToInstance(
            ResponseUserDto,
            await this.userService.update(updateUserDto, id, files, query),
        );
    }

    @Roles(ROLE.ADMIN)
    @Delete(':id')
    remove(@Param() { id }: ParamUserDto) {
        return this.userService.remove(+id);
    }
}
