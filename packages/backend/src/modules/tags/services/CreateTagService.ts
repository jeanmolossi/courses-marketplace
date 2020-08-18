import { injectable, inject } from 'tsyringe';

import ITagsRepository from '../repositories/ITagsRepository';
import Tag from '../infra/typeorm/entities/Tag';

@injectable()
export default class CreateTagService {
  constructor(
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository,
  ) {}

  public async execute(name: string): Promise<Tag> {
    const issetTag = await this.tagsRepository.findByName(name);
    if (issetTag) return issetTag;

    const newTag = await this.tagsRepository.create(name);

    return newTag;
  }
}
