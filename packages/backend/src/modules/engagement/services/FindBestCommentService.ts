import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import Comments from '../infra/typeorm/entities/Comments';
import ICommentsRepository from '../repositories/ICommentsRepository';

@injectable()
export default class FindBestCommentService {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,
  ) {}

  public async execute(topicId: string): Promise<Comments | undefined> {
    let findComment = await this.commentsRepository.findBestComment(topicId);

    if (!findComment)
      findComment = await this.commentsRepository.findByTopicId(topicId);

    return classToClass(findComment);
  }
}
