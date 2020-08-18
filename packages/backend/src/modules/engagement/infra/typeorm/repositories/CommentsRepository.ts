import { Repository, getRepository } from 'typeorm';

import CreateCommentDTO from '@modules/engagement/dtos/CreateCommentDTO';

import ICommentsRepository from '@modules/engagement/repositories/ICommentsRepository';
import AppError from '@shared/infra/http/errors/AppError';
import UpdatesVotesInCommentDTO from '@modules/engagement/dtos/UpdateVotesInCommentDTO';
import Comments from '../entities/Comments';

export default class CommentsRepository implements ICommentsRepository {
  private ormRepository: Repository<Comments>;

  constructor() {
    this.ormRepository = getRepository(Comments);
  }

  public async findBestComment(topicId: string): Promise<Comments | undefined> {
    const comment = await this.ormRepository.findOne({
      where: { topicId, best: true },
      relations: ['nestedComments', 'user'],
      order: { votes: 'DESC', created_at: 'DESC' },
    });

    return comment;
  }

  public async findByTopicId(topicId: string): Promise<Comments | undefined> {
    const comment = await this.ormRepository.findOne({
      where: { topicId },
      relations: ['nestedComments', 'user'],
      order: { votes: 'DESC', created_at: 'DESC' },
    });

    return comment;
  }

  public async findById(id: string): Promise<Comments | undefined> {
    const comment = await this.ormRepository.findOne(id, {
      relations: ['nestedComments', 'userId'],
    });

    return comment;
  }

  public async findAll(): Promise<Comments[] | undefined> {
    const comments = await this.ormRepository.find();

    return comments;
  }

  public async create({
    userId,
    topicId,
    comment,
  }: CreateCommentDTO): Promise<Comments> {
    const newComment = this.ormRepository.create({
      userId,
      topicId,
      comment,
    });

    await this.ormRepository.save(newComment);

    return newComment;
  }

  public async updateVotes({
    commentId,
    type,
  }: UpdatesVotesInCommentDTO): Promise<Comments> {
    const commentToUpdate = await this.ormRepository.findOne(commentId);
    if (!commentToUpdate) throw new AppError('Invalid comment to vote');

    const votes =
      type === 'up' ? commentToUpdate.votes + 1 : commentToUpdate.votes - 1;
    commentToUpdate.votes = votes;

    await this.ormRepository.save(commentToUpdate);

    return commentToUpdate;
  }
}
