import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { User } from '@model/User';

@ValidatorConstraint({ async: true })
class UniqueUsernameConstraint implements ValidatorConstraintInterface {
  async validate(username: string, _: ValidationArguments): Promise<boolean> {
    const user = await User.findOne({ where: { username } });
    return !user;
  }

  defaultMessage(_: ValidationArguments) {
    return 'Username is already taken';
  }
}

export function IsUniqueUsername(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: UniqueUsernameConstraint,
    });
  };
}
