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
import { QualificationService } from './qualification.service';
import { CreateQualificationDto } from './dto/create-qualification.dto';
import { UpdateQualificationDto } from './dto/update-qualification.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('qualification')
export class QualificationController {
    constructor(private readonly qualificationService: QualificationService) {}

    @Post()
    create(@Body() createQualificationDto: CreateQualificationDto) {
        return this.qualificationService.create(createQualificationDto);
    }

    @Get()
    findAll() {
        return this.qualificationService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.qualificationService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateQualificationDto: UpdateQualificationDto,
    ) {
        return this.qualificationService.update(+id, updateQualificationDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.qualificationService.remove(+id);
    }
}
