import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class UserMigration1585958685286 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
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
            name: 'username',
            type: 'varchar',
            isUnique: true,
            isNullable: false,
            length: '15',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
            isNullable: false,
            length: '100',
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'country',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'city',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'phone',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'company',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'website',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'reset_password_token',
            type: 'varchar',
            isNullable: true,
            default: null,
          },
          {
            name: 'activation_token',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'facebookId',
            type: 'varchar',
            isNullable: true,
            default: null,
          },
          {
            name: 'googleId',
            type: 'varchar',
            isNullable: true,
            default: null,
          },
          {
            name: 'twitterId',
            type: 'varchar',
            isNullable: true,
            default: null,
          },
          {
            name: 'linkedInId',
            type: 'varchar',
            isNullable: true,
            default: null,
          },
          {
            name: 'role',
            type: 'int',
            isNullable: false,
            default: 1,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
