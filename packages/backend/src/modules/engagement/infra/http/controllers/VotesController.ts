import { Response, Request } from 'express';
import { container } from 'tsyringe';

import VoteService from '@modules/engagement/services/VoteService';
import UnvoteService from '@modules/engagement/services/UnvoteService';

export default class VoteController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { commentId, type } = request.body;
    const userId = request.user.id;

    const vote = container.resolve(VoteService);
    const voted = await vote.execute({
      commentId,
      type,
      userId,
    });

    return response.json(voted);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { commentId } = request.query;
    const userId = request.user.id;

    const unvote = container.resolve(UnvoteService);
    const unvoted = await unvote.execute({
      commentId: String(commentId),
      userId,
    });

    return response.json(unvoted);
  }
}
