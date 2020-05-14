import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class ContactMessages1588799674187 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'contact_messages',
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
            isNullable: false,
            length: '150',
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
            length: '150',
          },
          {
            name: 'subject',
            type: 'varchar',
            isNullable: false,
            length: '150',
          },
          {
            name: 'message',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'phone',
            type: 'varchar',
            isNullable: false,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('contact_messages');
  }
}
