import { MigrationInterface, QueryRunner } from 'typeorm';
import { Country } from '../model/Country';
import { Role } from '../model/Role';
import countries from './seederFiles/countryValues';

export class AfterMigration1585999117403 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const allCountries: { id: number; name: string; cities: string[] }[] = [
      ...countries,
    ];

    const roles: {
      id: number;
      type: 'user' | 'company' | 'admin' | 'worker';
    }[] = [
      { id: 1, type: 'user' },
      { id: 2, type: 'company' },
      { id: 3, type: 'worker' },
      { id: 4, type: 'admin' },
    ];

    await Promise.all([
      allCountries.map(
        ({ id, name, cities }): Promise<Country> => {
          const country = new Country();
          country.id = id;
          country.name = name;
          country.cities = cities;
          return queryRunner.manager.save<Country>(country);
        }
      ),
      roles.map(
        ({ id, type }): Promise<Role> => {
          const role = new Role();
          role.id = id;
          role.type = type;
          return queryRunner.manager.save<Role>(role);
        }
      ),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    return null;
  }
}
