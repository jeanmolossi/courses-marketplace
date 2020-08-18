import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class addViewsColumnTopics1596297880365
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'topics',
      new TableColumn({
        name: 'views',
        type: 'integer',
        isNullable: true,
        default: 0,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('topics', 'views');
  }
}
