import Like from '@modules/engagement/infra/typeorm/entities/Like';
import LikeDTO from '../dtos/LikeDTO';

export default interface ILikeRepository {
  like(data: LikeDTO): Promise<Like>;
  unlike(data: LikeDTO): Promise<boolean>;
}
