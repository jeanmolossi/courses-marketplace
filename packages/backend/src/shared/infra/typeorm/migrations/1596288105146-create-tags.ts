import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export default class createTags1596288105146 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tags',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
            isNullable: false,
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: true,
            isUnique: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.dropColumn('topics', 'tags');

    await queryRunner.createTable(
      new Table({
        name: 'tags_topics',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'tagId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'topicId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'tagTopicTag',
            columnNames: ['tagId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'tags',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
          {
            name: 'tagTopicTopic',
            columnNames: ['topicId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'topics',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tags_topics');
    await queryRunner.addColumn(
      'topics',
      new TableColumn({
        name: 'tags',
        type: 'json',
        isNullable: true,
      }),
    );
    await queryRunner.dropTable('tags');
  }
}
