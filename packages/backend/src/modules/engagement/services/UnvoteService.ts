import { injectable, inject } from 'tsyringe';
import IVoteRepository from '../repositories/IVoteRepository';
import ICommentsRepository from '../repositories/ICommentsRepository';
import VoteDTO from '../dtos/VoteDTO';

@injectable()
export default class UnvoteService {
  constructor(
    @inject('VotesRepository')
    private votesRepository: IVoteRepository,
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,
  ) {}

  public async execute({
    commentId,
    userId,
  }: Pick<VoteDTO, 'commentId' | 'userId'>): Promise<boolean> {
    const unvoteStatus = await this.votesRepository.unvote({
      commentId,
      userId,
    });

    if (unvoteStatus) {
      await this.commentsRepository.updateVotes({
        commentId,
        type: 'down',
      });
    }

    return unvoteStatus;
  }
}
