import { Repository, getRepository, In } from 'typeorm';

import ITagsRepository from '@modules/tags/repositories/ITagsRepository';

import Tag from '../entities/Tag';

export default class TagsRepository implements ITagsRepository {
  private ormRepository: Repository<Tag>;

  constructor() {
    this.ormRepository = getRepository(Tag);
  }

  public async findAll(): Promise<Tag[] | undefined> {
    const findTag = await this.ormRepository.find();

    return findTag;
  }

  public async findAllByName(names: string[]): Promise<Tag[] | undefined> {
    const tags = await this.ormRepository.find({
      where: { name: In(names) },
    });

    return tags;
  }

  public async findByName(name: string): Promise<Tag | undefined> {
    const findTag = await this.ormRepository.findOne({
      where: { name },
    });

    return findTag;
  }

  public async create(name: string): Promise<Tag> {
    const newTag = this.ormRepository.create({
      name,
    });

    await this.ormRepository.save(newTag);

    return newTag;
  }
}
