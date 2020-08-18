import NestedComments from '../infra/typeorm/entities/NestedComments';
import CreateNestedCommentDTO from '../dtos/CreateNestedCommentDTO';

export default interface INestedCommentsRepository {
  create(data: CreateNestedCommentDTO): Promise<NestedComments>;
  findAll(): Promise<NestedComments[] | undefined>;
  findById(id: string): Promise<NestedComments | undefined>;
}
