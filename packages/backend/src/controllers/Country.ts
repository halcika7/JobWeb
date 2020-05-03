import { Response } from 'express';
import { BaseController } from './Base';

// models
import { Country } from '@model/Country';

// services
import { RedisService } from '@service/Redis';

// decorators
import { Controller } from '@decorator/class';
import { Get } from '@decorator/method';
import { Res } from '@decorator/param';

import { HTTPCodes } from '@job/common';

@Controller('api/country')
export class CountryController extends BaseController {
  private readonly redis = RedisService;

  constructor() {
    super(CountryController);
  }

  @Get('')
  async getCountries(@Res() res: Response): Promise<Response> {
    try {
      const countryCities = await this.redis.getAsync('countryCity');

      if (countryCities) {
        const { countries, cities } = JSON.parse(countryCities);
        return res.status(HTTPCodes.OK).json({ countries, cities });
      }

      const allCountries: Country[] = await Country.find({
        select: ['name', 'cities'],
        cache: false,
      });

      const cities: { [key: string]: { value: string; label: string }[] } = {};

      const countries = allCountries.map(({ name, cities: allCities }) => {
        cities[`${name}`] = allCities.map(val => ({
          value: val,
          label: val,
        }));
        return { value: name, label: name };
      });

      this.redis.setex(
        'countryCity',
        20,
        JSON.stringify({ countries, cities })
      );

      return res.status(HTTPCodes.OK).json({
        countries: JSON.stringify(countries),
        cities: JSON.stringify(cities),
      });
    } catch (error) {
      this.logger.error(error, 'getCountries');
      return res.status(HTTPCodes.BAD_REQUEST).json({ error });
    }
  }
}
