import { Request, Response } from 'express';
import { Country } from '../model/Country';
import { RedisService as Redis } from '../service/RedisService';
import { BaseController } from './BaseController';

class CountryController extends BaseController {
  constructor() {
    super(CountryController);
    this.getCountries = this.getCountries.bind(this);
  }

  public async getCountries(req: Request, res: Response) {
    try {
      // console.log(os.hostname());
      // console.log(os.platform());
      // console.log(os.arch());
      // console.log(os.userInfo());
      // console.log(req.connection.address());
      // console.log(req.connection.localAddress);
      // console.log(req.connection.remoteAddress);
      // console.log(req.connection.remoteFamily);
      // console.log(req.connection.remotePort);
      // console.log(req.headers['x-forwarded-for']);
      // console.log(req.ip);
      // console.log(req.headers);
      // console.log(req.url);
      // console.log(req.originalUrl);
      // console.log(req.baseUrl);
      this.logger.info('get countries', 'getCountries');
      const countryCities = await Redis.getAsync('countryCity');

      if (countryCities) {
        const { countries, cities } = JSON.parse(countryCities);
        return res.status(200).json({ countries, cities });
      }

      const allCountries: Country[] = await Country.find({
        select: ['name', 'cities'],
      });

      const cities: { [key: string]: { value: string; label: string }[] } = {};

      const countries = allCountries.map(({ name, cities: allCities }) => {
        // eslint-disable-next-line security/detect-object-injection
        cities[name] = allCities.map(val => ({
          value: val,
          label: val,
        }));
        return { value: name, label: name };
      });

      Redis.setex('countryCity', 420, JSON.stringify({ countries, cities }));

      return res.status(200).json({ countries, cities });
    } catch (error) {
      this.logger.error(error, 'getCountries');
      return res.status(400).json({ error });
    }
  }
}

export const CountryControllerinstance = new CountryController();
