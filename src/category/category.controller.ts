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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { QueryCategoryDto } from './dto/query-category.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { ParamCategoryDto } from './dto/param-category.dto';
import { ParamChampionshipDto } from 'src/championship/dto/param-championship.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get('championship/:id')
    findAllByChampionshipId(
        @Param() { id }: ParamChampionshipDto,
        @Query() query: QueryCategoryDto,
        @CurrentUser() user: User,
    ) {
        return this.categoryService.findAllByChampionshipId(id, query, user);
    }

    @Post()
    create(
        @Body() createCategoryDto: CreateCategoryDto,
        @Query() query: QueryCategoryDto,
        @CurrentUser() user: User,
    ) {
        return this.categoryService.create(createCategoryDto, query, user);
    }

    @Patch(':id')
    update(
        @Param() { id }: ParamCategoryDto,
        @Body() updateCategoryDto: UpdateCategoryDto,
        @Query() query: QueryCategoryDto,
        @CurrentUser() user: User,
    ) {
        return this.categoryService.update(id, updateCategoryDto, query, user);
    }

    @Delete(':id')
    remove(@Param() { id }: ParamCategoryDto, @CurrentUser() user: User) {
        return this.categoryService.remove(id, user);
    }
}
