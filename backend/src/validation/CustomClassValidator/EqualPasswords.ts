import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { User } from '../../model/User';

@ValidatorConstraint({ async: false })
export class EqualPasswords implements ValidatorConstraintInterface {
  validate(password: string, args: ValidationArguments): boolean {
    const user = args.object as User & { password2: string };
    return password === user.password2;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Both passwords need to be the same';
  }
}
