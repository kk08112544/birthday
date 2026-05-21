import { PartialType, PickType } from '@nestjs/mapped-types';

import { CreateAdminDto } from './create-admin.dto';

export class UpdateAdminDto extends PartialType(
  PickType(CreateAdminDto, ['firstName', 'email', 'phoneNumber'] as const),
) {}
