import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { User } from '@model/User';

@ValidatorConstraint({ async: true })
export class UniqueEmail implements ValidatorConstraintInterface {
  async validate(email: string, _: ValidationArguments): Promise<boolean> {
    const user = await User.findOne({ where: { email } });
    return !user;
  }

  defaultMessage(_: ValidationArguments) {
    return 'Email already in use';
  }
}
