import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { LiftingService } from './lifting.service';
import { CreateLiftingDto } from './dto/create-lifting.dto';
import { UpdateLiftingDto } from './dto/update-lifting.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('lifting')
export class LiftingController {
    constructor(private readonly liftingService: LiftingService) {}

    @Post()
    create(@Body() createLiftingDto: CreateLiftingDto) {
        return this.liftingService.create(createLiftingDto);
    }

    @Get()
    findAll() {
        return this.liftingService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.liftingService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateLiftingDto: UpdateLiftingDto,
    ) {
        return this.liftingService.update(+id, updateLiftingDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.liftingService.remove(+id);
    }
}
