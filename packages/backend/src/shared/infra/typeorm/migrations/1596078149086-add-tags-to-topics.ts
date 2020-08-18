import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class addTagsToTopics1596078149086
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'topics',
      new TableColumn({
        name: 'tags',
        type: 'json',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('topics', 'tags');
  }
}
