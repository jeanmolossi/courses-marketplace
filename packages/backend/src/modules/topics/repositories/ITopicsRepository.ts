import CreateTopicDTO from '../dtos/CreateTopicDTO';
import Topic from '../infra/typeorm/entities/Topic';

export default interface ITopicsRepository {
  create(data: CreateTopicDTO): Promise<Topic>;
  findByTitle(title: string): Promise<Topic | null>;
  findById(topicId: string): Promise<Topic | null>;
  findByUserId(userId: string): Promise<Topic[] | null>;
  findIfSolved(): Promise<Topic[] | null>;
  findIsNotSolved(): Promise<Topic[] | null>;
  findAll(): Promise<Topic[] | null>;
  incrementView(topicId: string): Promise<void>;
}
