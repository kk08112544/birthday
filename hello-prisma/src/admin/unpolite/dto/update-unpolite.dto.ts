import { PartialType } from '@nestjs/mapped-types';
import { CreateUnpoliteDto } from './create-unpolite.dto';

export class UpdateUnpoliteDto extends PartialType(CreateUnpoliteDto) {}
