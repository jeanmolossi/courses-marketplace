import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class createVideoAndAddToLesson1595907775320
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'lessons',
      new TableColumn({
        name: 'videoSource',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('lessons', 'videoSource');
  }
}
