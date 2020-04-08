import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CountryMigration1585948757614 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'countries',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isUnique: true,
            isNullable: false,
            isGenerated: true,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '150',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'cities',
            type: 'varchar',
            isNullable: true,
            isArray: true,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('countries');
  }
}
