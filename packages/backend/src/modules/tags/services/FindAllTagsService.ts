import { injectable, inject } from 'tsyringe';
import ITagsRepository from '../repositories/ITagsRepository';
import Tag from '../infra/typeorm/entities/Tag';

@injectable()
export default class FindAllTagsService {
  constructor(
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository,
  ) {}

  public async execute(): Promise<Tag[] | undefined> {
    const tags = await this.tagsRepository.findAll();

    return tags;
  }
}
