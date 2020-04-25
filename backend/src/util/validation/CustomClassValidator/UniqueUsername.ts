import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { User } from '@model/User';

@ValidatorConstraint({ async: true })
export class UniqueUsername implements ValidatorConstraintInterface {
  async validate(
    username: string,
    args: ValidationArguments
  ): Promise<boolean> {
    const user = await User.findOne({ where: { username } });
    const valid: boolean = user ? false : true;
    return valid;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Username is aready taken';
  }
}
