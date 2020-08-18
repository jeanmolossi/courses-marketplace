import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/infra/http/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import Topic from '../infra/typeorm/entities/Topic';
import ITopicsRepository from '../repositories/ITopicsRepository';

@injectable()
export default class FindTopicsByUserId {
  constructor(
    @inject('TopicsRepository')
    private topicsRepository: ITopicsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(userId: string): Promise<Topic[]> {
    const cacheKey = `FindTopicByUserId:${userId}`;
    let topic = await this.cacheProvider.recover<Topic[]>(cacheKey);

    if (!topic) {
      topic = classToClass(await this.topicsRepository.findByUserId(userId));

      await this.cacheProvider.save(cacheKey, topic);
    }

    if (!topic) throw new AppError('No topics found');

    return topic;
  }
}
