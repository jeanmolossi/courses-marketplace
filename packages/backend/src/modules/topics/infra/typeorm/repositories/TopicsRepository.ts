import { Repository, getRepository } from 'typeorm';

import ITopicsRepository from '@modules/topics/repositories/ITopicsRepository';
import CreateTopicDTO from '@modules/topics/dtos/CreateTopicDTO';

import Topic from '../entities/Topic';

export default class TopicRepository implements ITopicsRepository {
  private ormRepository: Repository<Topic>;

  constructor() {
    this.ormRepository = getRepository(Topic);
  }

  public async findAll(): Promise<Topic[] | null> {
    const topics = await this.ormRepository.find({
      order: { created_at: 'DESC' },
    });

    return topics;
  }

  public async findById(topicId: string): Promise<Topic | null> {
    const findTopicById = await this.ormRepository.findOne(topicId, {
      loadEagerRelations: true,
    });

    await this.incrementView(topicId);

    return findTopicById || null;
  }

  public async findByUserId(userId: string): Promise<Topic[] | null> {
    const findTopicById = await this.ormRepository.find({
      where: { userId },
      loadEagerRelations: true,
    });

    return findTopicById || null;
  }

  public async findByTitle(title: string): Promise<Topic | null> {
    const findTopicWithSameTitle = await this.ormRepository.findOne({
      where: { title },
    });

    return findTopicWithSameTitle || null;
  }

  public async findIfSolved(): Promise<Topic[] | null> {
    const findTopic = await this.ormRepository.find({
      where: { solved: true },
    });

    return findTopic || null;
  }

  public async findIsNotSolved(): Promise<Topic[] | null> {
    const findTopic = await this.ormRepository.find({
      where: { solved: false },
    });

    return findTopic || null;
  }

  public async create({
    title,
    text,
    userId,
    tags,
  }: CreateTopicDTO): Promise<Topic> {
    const newTopic = this.ormRepository.create({
      title,
      text,
      userId,
      tags,
    });

    await this.ormRepository.save(newTopic);

    return newTopic;
  }

  public async incrementView(topicId: string): Promise<void> {
    const topic = await this.ormRepository.findOne(topicId);
    if (!topic) return;
    await this.ormRepository.update(topicId, {
      views: topic.views + 1,
    });
  }
}
