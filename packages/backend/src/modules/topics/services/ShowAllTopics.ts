import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';
import { classToClass } from 'class-transformer';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Topic from '../infra/typeorm/entities/Topic';
import ITopicsRepository from '../repositories/ITopicsRepository';

@injectable()
export default class ShowAllTopics {
  constructor(
    @inject('TopicsRepository')
    private topicsRepository: ITopicsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<Topic[] | undefined> {
    const cacheKey = `ShowAllTopics`;
    let topics = await this.cacheProvider.recover<Topic[]>(cacheKey);

    if (!topics) {
      topics = classToClass(await this.topicsRepository.findAll());

      await this.cacheProvider.save(cacheKey, topics);
    }

    if (!topics) throw new AppError('No topics found');

    return topics;
  }
}
