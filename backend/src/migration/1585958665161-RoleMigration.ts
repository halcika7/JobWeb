import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class RoleMigration1585958665161 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'roles',
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
            name: 'type',
            type: 'varchar',
            length: '8',
            isNullable: false,
            isUnique: true,
            enum: ['user', 'company', 'admin', 'worker'],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('roles');
  }
}
