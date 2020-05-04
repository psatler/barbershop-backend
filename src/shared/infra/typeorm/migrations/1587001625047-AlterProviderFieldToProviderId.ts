import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterProviderFieldToProviderId1587001625047
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // delete provider column from appointments table
    await queryRunner.dropColumn('appointments', 'provider');

    // create the new column to replace the deleted one
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: true, // to cover those cases when a provider deletes its account from the app, so we preserve the appointment records
      }),
    );

    // create the foreign key relationship
    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'AppointmentProvider', // naming it to be able to refer to it on the 'down' method below
        columnNames: ['provider_id'], // which columns will receive the foreign key
        referencedColumnNames: ['id'], // which column on the Users table (in this case) the provider_id will refer to
        referencedTableName: 'users',
        onDelete: 'SET NULL', // what will happen to the appointments when a user is deleted
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // the steps need to be executed in the reverse order of the 'up' method above
    await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');

    await queryRunner.dropColumn('appointments', 'provider_id');

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider',
        type: 'varchar',
      }),
    );
  }
}
