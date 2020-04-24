import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Country } from '../../model/Country';

@ValidatorConstraint({ async: true })
export class ValidateCountry implements ValidatorConstraintInterface {
  async validate(name: string, args: ValidationArguments): Promise<boolean> {
    const country = await Country.findOne({ where: { name } });
    const valid: boolean = country ? true : false;
    return valid;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Please select valid country';
  }
}
