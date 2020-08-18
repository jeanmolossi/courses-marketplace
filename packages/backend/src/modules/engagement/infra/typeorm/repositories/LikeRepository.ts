import { Repository, getRepository } from 'typeorm';

import ILikeRepository from '@modules/engagement/repositories/ILikeRepository';
import LikeDTO from '@modules/engagement/dtos/LikeDTO';

import Like from '../entities/Like';

export default class LikeRepository implements ILikeRepository {
  private ormRepository: Repository<Like>;

  constructor() {
    this.ormRepository = getRepository(Like);
  }

  public async like({ topicId, userId }: LikeDTO): Promise<Like> {
    const newLike = this.ormRepository.create({
      userId,
      topicId,
    });

    await this.ormRepository.save(newLike);

    return newLike;
  }

  public async unlike({ topicId, userId }: LikeDTO): Promise<boolean> {
    try {
      await this.ormRepository.delete({
        topicId,
        userId,
      });
      return true;
    } catch {
      return false;
    }
  }
}
