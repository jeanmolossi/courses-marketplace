import { inject, injectable } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import ITagsRepository from '@modules/tags/repositories/ITagsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ITopicsRepository from '../repositories/ITopicsRepository';
import Topic from '../infra/typeorm/entities/Topic';

interface CreateTopicsRequest {
  title: string;
  text: string;
  userId: string;
  tags: string[];
}

@injectable()
export default class CreateTopicService {
  constructor(
    @inject('TopicsRepository')
    private topicsRepository: ITopicsRepository,
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    title,
    text,
    userId,
    tags,
  }: CreateTopicsRequest): Promise<Topic> {
    const issetTopic = await this.topicsRepository.findByTitle(title);
    if (issetTopic) throw new AppError('The topic already exists');

    const validTags = await this.tagsRepository.findAllByName(tags);

    if (!validTags) {
      throw new AppError('Invalid tags');
    }

    const tagsFilter = validTags.map(t => {
      return {
        tagId: t.id,
      };
    });

    const newTopic = await this.topicsRepository.create({
      title,
      text,
      userId,
      tags: tagsFilter,
    });

    await this.cacheProvider.invalidatePreffix(`ShowAllTopics`);
    await this.cacheProvider.invalidatePreffix(`ShowAllSolved`);
    await this.cacheProvider.invalidatePreffix(`FindTopicById`);

    return newTopic;
  }
}
