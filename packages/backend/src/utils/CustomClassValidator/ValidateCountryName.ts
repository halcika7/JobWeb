// validation
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

// models
import { Country } from '@model/Country';

@ValidatorConstraint({ async: true })
export class ValidateCountry implements ValidatorConstraintInterface {
  async validate(name: string, _: ValidationArguments): Promise<boolean> {
    const country = await Country.findOne({ where: { name } });
    return !!country;
  }

  defaultMessage(_: ValidationArguments) {
    return 'Please select valid country';
  }
}
