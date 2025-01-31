import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Query,
} from '@nestjs/common';
import { InstitutionService } from './institution.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { QueriesInstitutionDto } from './dto/queries-institution.dto';
import { ParamInstitutionDto } from './dto/param-institution.dto';
import { User } from 'src/user/entities/user.entity';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ROLE } from 'src/common/enums/role.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('institution')
export class InstitutionController {
    constructor(private readonly institutionService: InstitutionService) {}

    @Post()
    create(
        @Body() createInstitutionDto: CreateInstitutionDto,
        @Query() query: QueriesInstitutionDto,
        @CurrentUser() user: User,
    ) {
        return this.institutionService.create(
            createInstitutionDto,
            query,
            user,
        );
    }

    @Roles(ROLE.ADMIN, ROLE.USER)
    @Get()
    findAll(@Query() query: QueriesInstitutionDto, @CurrentUser() user: User) {
        return this.institutionService.findAll(query, user);
    }

    @Patch(':id')
    update(
        @Param() { id }: ParamInstitutionDto,
        @Body() updateInstitutionDto: UpdateInstitutionDto,
        @Query() query: QueriesInstitutionDto,
        @CurrentUser() user: User,
    ) {
        return this.institutionService.update(
            +id,
            updateInstitutionDto,
            query,
            user,
        );
    }

    @Delete(':id')
    remove(@Param() { id }: ParamInstitutionDto, @CurrentUser() user: User) {
        return this.institutionService.remove(+id, user);
    }
}
