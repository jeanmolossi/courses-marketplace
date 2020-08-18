import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTopicService from '@modules/topics/services/CreateTopicService';
import ShowAllTopics from '@modules/topics/services/ShowAllTopics';
import FindTopicById from '@modules/topics/services/FindTopicById';
import singleUserEmitEvent from '@shared/utils/singleUserEmitEvent';
import ShowAllTopicsIfSolved from '@modules/topics/services/ShowAllTopicsIfSolved';
import FindTopicsByUserId from '@modules/topics/services/FindTopicsByUserId';

export default class TopicsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { title, text, tags } = request.body;
    const userId = request.user.id;

    const createTopic = container.resolve(CreateTopicService);
    const newTopic = await createTopic.execute({
      title,
      text,
      userId,
      tags,
    });

    singleUserEmitEvent('@topic:create', userId, request, { topic: newTopic });

    return response.json(newTopic);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { solved, me } = request.query;

    if (solved) {
      const findTopics = container.resolve(ShowAllTopicsIfSolved);
      const topics = await findTopics.execute(String(solved));

      return response.json(topics);
    }

    if (me) {
      const findTopics = container.resolve(FindTopicsByUserId);
      const topics = await findTopics.execute(String(me));

      return response.json(topics);
    }

    const findTopics = container.resolve(ShowAllTopics);
    const topics = await findTopics.execute();

    return response.json(topics);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { topicId } = request.params;

    const findTopic = container.resolve(FindTopicById);
    const topic = await findTopic.execute(topicId);

    singleUserEmitEvent('@topic:index', request.user.id, request, '');

    return response.json(topic);
  }
}
