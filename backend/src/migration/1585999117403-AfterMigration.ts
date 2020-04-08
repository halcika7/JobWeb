import { MigrationInterface, QueryRunner } from 'typeorm';
import { Country } from '../model/Country';
import countries from './seederFiles/countryValues';

export class AfterMigration1585999117403 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const allCountries = [...countries];

    await Promise.all(
      allCountries.map(
        ({
          id,
          name,
          cities,
        }: {
          id: number;
          name: string;
          cities: string[];
        }) => {
          const country = new Country();
          country.id = id;
          country.name = name;
          country.cities = cities;
          return queryRunner.manager.save<Country>(country);
        }
      )
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    return null;
  }
}
