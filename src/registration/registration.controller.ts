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
import { RegistrationService } from './registration.service';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('registration')
export class RegistrationController {
    constructor(private readonly registrationService: RegistrationService) {}

    @Post()
    create(@Body() createRegistrationDto: CreateRegistrationDto) {
        return this.registrationService.create(createRegistrationDto);
    }

    @Get()
    findAll() {
        return this.registrationService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.registrationService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateRegistrationDto: UpdateRegistrationDto,
    ) {
        return this.registrationService.update(+id, updateRegistrationDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.registrationService.remove(+id);
    }
}
