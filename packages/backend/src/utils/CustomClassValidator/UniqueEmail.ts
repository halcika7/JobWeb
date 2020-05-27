import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { User } from '@model/User';

@ValidatorConstraint({ async: true })
class UniqueEmailConstraint implements ValidatorConstraintInterface {
  async validate(email: string, _: ValidationArguments): Promise<boolean> {
    const user = await User.findOne({ where: { email } });
    return !user;
  }

  defaultMessage(_: ValidationArguments) {
    return 'Email already in use';
  }
}

export function IsUniqueEmail(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: UniqueEmailConstraint,
    });
  };
}
