import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// Omit password here - a real project should use a separate "change password"
// endpoint with the current password re-verified, not a plain PATCH.
export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['password'] as const),
) {}
