import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersService } from 'modules/users/users.service';

@Injectable()
@ValidatorConstraint()
export class IfUserExists implements ValidatorConstraintInterface {
  constructor(private readonly userService: UsersService) { }

  async validate(id: number, _: ValidationArguments) {
    try {
      const user = await this.userService.findOne(id);
      if (!user) {
        return false;
      }
      return true;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `User ID ${args.value} does not exist`;
  }
}
