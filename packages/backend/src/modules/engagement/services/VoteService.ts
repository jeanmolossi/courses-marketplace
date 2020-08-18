import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';
import ICommentsRepository from '../repositories/ICommentsRepository';
import IVoteRepository from '../repositories/IVoteRepository';
import VoteDTO from '../dtos/VoteDTO';
import Votes from '../infra/typeorm/entities/Votes';

@injectable()
export default class VoteService {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,
    @inject('VotesRepository')
    private votesRepository: IVoteRepository,
  ) {}

  public async execute({ commentId, userId, type }: VoteDTO): Promise<Votes> {
    const hasVoted = await this.votesRepository.findByCommentIdAndUserId({
      commentId,
      userId,
    });
    if (hasVoted) throw new AppError('You has voted here');

    const vote = await this.votesRepository.vote({
      commentId,
      userId,
      type,
    });

    await this.commentsRepository.updateVotes({
      commentId,
      type,
    });

    return vote;
  }
}
