import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ILikeRepository from '../repositories/ILikeRepository';
import LikeDTO from '../dtos/LikeDTO';

@injectable()
export default class UnlikeService {
  constructor(
    @inject('LikeRepository')
    private likeRepository: ILikeRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ topicId, userId }: LikeDTO): Promise<boolean> {
    let cacheKey = `FindTopicById:${topicId}`;
    await this.cacheProvider.invalidate(cacheKey);
    cacheKey = `ShowAllTopics`;
    await this.cacheProvider.invalidate(cacheKey);

    const addLike = await this.likeRepository.unlike({ topicId, userId });

    return addLike;
  }
}
