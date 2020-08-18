import { container } from 'tsyringe';
import { Request, Response } from 'express';

import FindBestCommentService from '@modules/engagement/services/FindBestCommentService';

export default class CommentController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { topicId } = request.params;

    const findBest = container.resolve(FindBestCommentService);
    const bestComment = await findBest.execute(topicId);

    return response.json(bestComment);
  }
}
