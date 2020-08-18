import { Repository, getRepository } from 'typeorm';

import INestedCommentsRepository from '@modules/engagement/repositories/INestedCommentsRepository';
import CreateNestedCommentDTO from '@modules/engagement/dtos/CreateNestedCommentDTO';

import NestedComments from '../entities/NestedComments';

export default class NestedCommentsRepository
  implements INestedCommentsRepository {
  private ormRepository: Repository<NestedComments>;

  constructor() {
    this.ormRepository = getRepository(NestedComments);
  }

  public async findById(id: string): Promise<NestedComments | undefined> {
    const comment = await this.ormRepository.findOne(id, {
      relations: ['userId'],
    });

    return comment;
  }

  public async findAll(): Promise<NestedComments[] | undefined> {
    const comments = await this.ormRepository.find();

    return comments;
  }

  public async create({
    userId,
    comment,
    commentRef,
  }: CreateNestedCommentDTO): Promise<NestedComments> {
    const newComment = this.ormRepository.create({
      comment,
      commentRef,
      userId,
    });

    await this.ormRepository.save(newComment);

    return newComment;
  }
}
