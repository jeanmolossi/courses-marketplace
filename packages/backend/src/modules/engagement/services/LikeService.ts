import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import Like from '../infra/typeorm/entities/Like';
import ILikeRepository from '../repositories/ILikeRepository';
import LikeDTO from '../dtos/LikeDTO';

@injectable()
export default class LikeService {
  constructor(
    @inject('LikeRepository')
    private likeRepository: ILikeRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ topicId, userId }: LikeDTO): Promise<Like> {
    let cacheKey = `FindTopicById:${topicId}`;
    await this.cacheProvider.invalidate(cacheKey);
    cacheKey = `ShowAllTopics`;
    await this.cacheProvider.invalidate(cacheKey);

    const addLike = await this.likeRepository.like({
      topicId,
      userId,
    });

    return addLike;
  }
}
