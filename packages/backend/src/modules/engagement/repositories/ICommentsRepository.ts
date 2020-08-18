import Comments from '../infra/typeorm/entities/Comments';
import CreateCommentDTO from '../dtos/CreateCommentDTO';
import UpdatesVotesInCommentDTO from '../dtos/UpdateVotesInCommentDTO';

export default interface ICommentsRepository {
  create(data: CreateCommentDTO): Promise<Comments>;
  findAll(): Promise<Comments[] | undefined>;
  findById(id: string): Promise<Comments | undefined>;
  findByTopicId(topicId: string): Promise<Comments | undefined>;
  findBestComment(topicId: string): Promise<Comments | undefined>;
  updateVotes({ commentId, type }: UpdatesVotesInCommentDTO): Promise<Comments>;
}
