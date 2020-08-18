import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class addSolvedColumnToTopics1596513416841
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'topics',
      new TableColumn({
        name: 'solved',
        type: 'boolean',
        isNullable: true,
        default: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('topics', 'solved');
  }
}
