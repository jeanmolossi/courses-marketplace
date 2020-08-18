import { Repository, getRepository } from 'typeorm';

import IVoteRepository from '@modules/engagement/repositories/IVoteRepository';
import VoteDTO from '@modules/engagement/dtos/VoteDTO';

import Votes from '../entities/Votes';

export default class VoteRepository implements IVoteRepository {
  private ormRepository: Repository<Votes>;

  constructor() {
    this.ormRepository = getRepository(Votes);
  }

  public async findByCommentIdAndUserId({
    commentId,
    userId,
  }: Pick<VoteDTO, 'commentId' | 'userId'>): Promise<Votes | undefined> {
    const vote = await this.ormRepository.findOne({
      where: { commentId, userId },
    });

    return vote;
  }

  public async vote({ commentId, userId, type }: VoteDTO): Promise<Votes> {
    const vote = this.ormRepository.create({
      commentId,
      userId,
      type,
    });

    await this.ormRepository.save(vote);

    return vote;
  }

  public async unvote({
    commentId,
    userId,
  }: Pick<VoteDTO, 'commentId' | 'userId'>): Promise<boolean> {
    const { affected } = await this.ormRepository.delete({
      commentId,
      userId,
    });

    if (affected && affected > 0) return true;

    return false;
  }
}
