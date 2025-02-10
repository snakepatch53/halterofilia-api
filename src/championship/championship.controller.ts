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
import { ChampionshipService } from './championship.service';
import { CreateChampionshipDto } from './dto/create-championship.dto';
import { UpdateChampionshipDto } from './dto/update-championship.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { QueryChampionshipDto } from './dto/query-championship.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { ParamChampionshipDto } from './dto/param-championship.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('championship')
export class ChampionshipController {
    constructor(private readonly championshipService: ChampionshipService) {}

    @Get()
    findAll(@Query() query: QueryChampionshipDto, @CurrentUser() user: User) {
        return this.championshipService.findAll(query, user);
    }

    @Get(':id')
    findOne(
        @Param() { id }: ParamChampionshipDto,
        @Query() query: QueryChampionshipDto,
        @CurrentUser() user: User,
    ) {
        return this.championshipService.findOne(id, query, user);
    }

    @Post()
    create(
        @Body() createChampionshipDto: CreateChampionshipDto,
        @Query() query: QueryChampionshipDto,
        @CurrentUser() user: User,
    ) {
        return this.championshipService.create(
            createChampionshipDto,
            query,
            user,
        );
    }

    @Patch(':id')
    update(
        @Param() { id }: ParamChampionshipDto,
        @Body() updateChampionshipDto: UpdateChampionshipDto,
        @Query() query: QueryChampionshipDto,
        @CurrentUser() user: User,
    ) {
        return this.championshipService.update(
            +id,
            updateChampionshipDto,
            query,
            user,
        );
    }

    @Delete(':id')
    remove(@Param() { id }: ParamChampionshipDto, @CurrentUser() user: User) {
        return this.championshipService.remove(+id, user);
    }
}
