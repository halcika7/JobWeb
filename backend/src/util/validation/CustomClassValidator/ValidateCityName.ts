// validation
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

// models
import { Country } from '@model/Country';
import { User } from '@model/User';

@ValidatorConstraint({ async: true })
export class ValidateCity implements ValidatorConstraintInterface {
  async validate(city: string, args: ValidationArguments): Promise<boolean> {
    const user: User = args.object as User;
    const country = await Country.findOne({
      where: { name: user.country },
      select: ['cities'],
    });
    return country && country.cities.includes(city);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Please select valid city';
  }
}
