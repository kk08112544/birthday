import { PickType } from '@nestjs/mapped-types';
import { CreateWisherDto } from './create-wisher.dto';

export class UpdateWisherDto extends PickType(CreateWisherDto, [
  'wishWord',
] as const) {}
