import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateCommentService from '@modules/engagement/services/CreateCommentService';

export default class CommentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { topic, comment } = request.body;
    const userId = request.user.id;

    const createComment = container.resolve(CreateCommentService);
    const newComment = await createComment.execute({
      userId,
      topicId: topic,
      comment,
    });

    return response.json(newComment);
  }
}
