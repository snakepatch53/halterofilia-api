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

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('institution')
export class InstitutionController {
    constructor(private readonly institutionService: InstitutionService) {}

    @Post()
    create(
        @Body() createInstitutionDto: CreateInstitutionDto,
        @Query() query: QueriesInstitutionDto,
    ) {
        return this.institutionService.create(createInstitutionDto, query);
    }

    @Get()
    findAll(@Query() query: QueriesInstitutionDto) {
        return this.institutionService.findAll(query);
    }

    @Get(':id')
    findOne(
        @Param() { id }: ParamInstitutionDto,
        @Query() query: QueriesInstitutionDto,
    ) {
        return this.institutionService.findOne(+id, query);
    }

    @Patch(':id')
    update(
        @Param() { id }: ParamInstitutionDto,
        @Body() updateInstitutionDto: UpdateInstitutionDto,
        @Query() query: QueriesInstitutionDto,
    ) {
        return this.institutionService.update(+id, updateInstitutionDto, query);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.institutionService.remove(+id);
    }
}
