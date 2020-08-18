import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import CreateCommentDTO from '../dtos/CreateCommentDTO';
import Comments from '../infra/typeorm/entities/Comments';
import ICommentsRepository from '../repositories/ICommentsRepository';

@injectable()
export default class CreateCommentService {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    userId,
    topicId,
    comment,
  }: CreateCommentDTO): Promise<Comments> {
    let cacheKey = `FindTopicById:${topicId}`;
    await this.cacheProvider.invalidate(cacheKey);
    cacheKey = `ShowAllTopics`;
    await this.cacheProvider.invalidate(cacheKey);

    const newComment = await this.commentsRepository.create({
      userId,
      topicId,
      comment,
    });

    return newComment;
  }
}
