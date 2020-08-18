import Votes from '../infra/typeorm/entities/Votes';
import VoteDTO from '../dtos/VoteDTO';

export default interface IVoteRepository {
  vote(data: VoteDTO): Promise<Votes>;
  unvote(data: Pick<VoteDTO, 'commentId' | 'userId'>): Promise<boolean>;
  findByCommentIdAndUserId(
    data: Pick<VoteDTO, 'commentId' | 'userId'>,
  ): Promise<Votes | undefined>;
}
