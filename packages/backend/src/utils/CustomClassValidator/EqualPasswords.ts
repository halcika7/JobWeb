import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { User } from '@model/User';

@ValidatorConstraint({ async: false })
class EqualPasswordsConstraint implements ValidatorConstraintInterface {
  validate(password: string, args: ValidationArguments): boolean {
    const user = args.object as User & { password2: string };
    return password === user.password2;
  }

  defaultMessage(_: ValidationArguments) {
    return 'Both passwords need to be the same';
  }
}

export function IsEqualPasswords(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: EqualPasswordsConstraint,
    });
  };
}
