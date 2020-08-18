import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import { classToClass } from 'class-transformer';
import ITopicsRepository from '../repositories/ITopicsRepository';
import Topic from '../infra/typeorm/entities/Topic';

@injectable()
export default class ShowAllTopicsIfSolved {
  constructor(
    @inject('TopicsRepository')
    private topicsRepository: ITopicsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(solvedString: string): Promise<Topic[] | null> {
    const solved = solvedString === 'true';
    const cacheKey = `ShowAllSolved:${solved}`;
    let topics = await this.cacheProvider.recover<Topic[]>(cacheKey);

    if (!topics) {
      if (solved) {
        topics = classToClass(await this.topicsRepository.findIfSolved());

        await this.cacheProvider.save(cacheKey, topics);
      } else {
        topics = classToClass(await this.topicsRepository.findIsNotSolved());

        await this.cacheProvider.save(cacheKey, topics);
      }
    }

    return topics;
  }
}
