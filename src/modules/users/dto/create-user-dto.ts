import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Validate,
} from 'class-validator';
import { Match } from 'utils/decorators/match.decorator';
import { LowerCaseTransformer } from 'utils/transformers/lower-case.transformer';
import { IfDuplicateEmail } from 'utils/validators/if-email-duplicate.validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsEmail()
  @Transform(LowerCaseTransformer)
  @Validate(IfDuplicateEmail)
  email: string;

  @IsOptional()
  @IsNotEmpty()
  phone: string;

  @IsOptional()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @Match('password')
  readonly confirmPassword: string;
}
