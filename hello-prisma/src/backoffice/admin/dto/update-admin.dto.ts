import { PartialType, PickType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsString, ValidateIf } from 'class-validator';

import { CreateAdminDto } from './create-admin.dto';
import { Match } from 'src/common/decorator/match.decorator';

export class UpdateAdminDto extends PartialType(
  PickType(CreateAdminDto, ['firstName', 'email', 'phoneNumber'] as const),
) {}