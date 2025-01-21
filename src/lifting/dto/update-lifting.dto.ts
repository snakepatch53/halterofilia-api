import { PartialType } from '@nestjs/mapped-types';
import { CreateLiftingDto } from './create-lifting.dto';

export class UpdateLiftingDto extends PartialType(CreateLiftingDto) {}
