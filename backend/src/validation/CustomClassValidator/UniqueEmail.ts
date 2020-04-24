import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { User } from '../../model/User';

@ValidatorConstraint({ async: true })
export class UniqueEmail implements ValidatorConstraintInterface {
  async validate(email: string, args: ValidationArguments): Promise<boolean> {
    const user = await User.findOne({ where: { email } });
    const valid: boolean = user ? false : true;
    return valid;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Email already in use';
  }
}
