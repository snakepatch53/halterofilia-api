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
import { JudgeService } from './judge.service';
import { CreateJudgeDto } from './dto/create-judge.dto';
import { UpdateJudgeDto } from './dto/update-judge.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ParamCategoryDto } from 'src/category/dto/param-category.dto';
import { QueryJudgeDto } from './dto/query-judge.dto';
import { User } from 'src/user/entities/user.entity';
import { ParamJudgeDto } from './dto/param-judge.dto';
import { AssignParamsToBody } from 'src/common/decorators/assign-params-to-body.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('judge')
export class JudgeController {
    constructor(private readonly judgeService: JudgeService) {}

    @Get('category/:id')
    findAllByCategoryId(
        @Param() { id }: ParamCategoryDto,
        @Query() query: QueryJudgeDto,
        @CurrentUser() user: User,
    ) {
        return this.judgeService.findAllByCategoryId(id, query, user);
    }

    @Post()
    create(
        @Body() createJudgeDto: CreateJudgeDto,
        @Query() query: QueryJudgeDto,
        @CurrentUser() user: User,
    ) {
        return this.judgeService.create(createJudgeDto, query, user);
    }

    @Patch(':id')
    @AssignParamsToBody()
    update(
        @Param() { id }: ParamJudgeDto,
        @Body() updateJudgeDto: UpdateJudgeDto,
        @Query() query: QueryJudgeDto,
        @CurrentUser() user: User,
    ) {
        return this.judgeService.update(id, updateJudgeDto, query, user);
    }

    @Delete(':id')
    remove(@Param() { id }: ParamJudgeDto, @CurrentUser() user: User) {
        return this.judgeService.remove(id, user);
    }
}
