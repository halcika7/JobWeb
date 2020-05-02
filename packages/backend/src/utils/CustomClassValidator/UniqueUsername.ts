import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { User } from '@model/User';

@ValidatorConstraint({ async: true })
export class UniqueUsername implements ValidatorConstraintInterface {
  async validate(username: string, _: ValidationArguments): Promise<boolean> {
    const user = await User.findOne({ where: { username } });
    return !user;
  }

  defaultMessage(_: ValidationArguments) {
    return 'Username is aready taken';
  }
}
