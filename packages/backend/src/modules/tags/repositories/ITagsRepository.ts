import Tag from '../infra/typeorm/entities/Tag';

export default interface ITagsRepository {
  create(name: string): Promise<Tag>;
  findByName(name: string): Promise<Tag | undefined>;
  findAll(): Promise<Tag[] | undefined>;
  findAllByName(names: string[]): Promise<Tag[] | undefined>;
}
