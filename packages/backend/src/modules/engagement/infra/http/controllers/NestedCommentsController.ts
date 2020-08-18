import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateNestedCommentService from '@modules/engagement/services/CreateNestedCommentService';

export default class NestedCommentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { commentRef, comment } = request.body;
    const userId = request.user.id;

    const createComment = container.resolve(CreateNestedCommentService);
    const newComment = await createComment.execute({
      userId,
      commentRef,
      comment,
    });

    return response.json(newComment);
  }
}
