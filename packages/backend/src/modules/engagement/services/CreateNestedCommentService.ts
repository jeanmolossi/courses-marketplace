import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INestedCommentsRepository from '../repositories/INestedCommentsRepository';
import NestedComments from '../infra/typeorm/entities/NestedComments';
import CreateNestedCommentDTO from '../dtos/CreateNestedCommentDTO';

@injectable()
export default class CreateNestedCommentService {
  constructor(
    @inject('NestedCommentsRepository')
    private nestedCommentsRepository: INestedCommentsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    userId,
    comment,
    commentRef,
  }: CreateNestedCommentDTO): Promise<NestedComments> {
    let cacheKey = `FindTopicById`;
    await this.cacheProvider.invalidatePreffix(cacheKey);
    cacheKey = `ShowAllTopics`;
    await this.cacheProvider.invalidate(cacheKey);

    const newComment = await this.nestedCommentsRepository.create({
      userId,
      comment,
      commentRef,
    });

    return newComment;
  }
}
