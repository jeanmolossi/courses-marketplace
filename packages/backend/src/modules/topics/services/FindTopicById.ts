import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/infra/http/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import Topic from '../infra/typeorm/entities/Topic';
import ITopicsRepository from '../repositories/ITopicsRepository';

@injectable()
export default class FindTopicById {
  constructor(
    @inject('TopicsRepository')
    private topicsRepository: ITopicsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(topicId: string): Promise<Topic> {
    const cacheKey = `FindTopicById:${topicId}`;
    let topic = await this.cacheProvider.recover<Topic>(cacheKey);

    if (!topic) {
      topic = classToClass(await this.topicsRepository.findById(topicId));

      await this.cacheProvider.save(cacheKey, topic);
    }

    if (!topic) throw new AppError('No topics found');

    return topic;
  }
}
