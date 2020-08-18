import { Request, Response } from 'express';
import { container } from 'tsyringe';

import LikeService from '@modules/engagement/services/LikeService';
import UnlikeService from '@modules/engagement/services/UnlikeService';

export default class LikesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { topicId } = request.body;
    const userId = request.user.id;

    const like = container.resolve(LikeService);
    const liked = await like.execute({
      topicId,
      userId,
    });

    return response.json(liked);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { topicId, userId } = request.query;
    const unlike = container.resolve(UnlikeService);
    const unliked = await unlike.execute({
      topicId: String(topicId),
      userId: String(userId),
    });

    return response.json(unliked);
  }
}
