import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAuthSessionService from '@modules/users/services/CreateAuthSessionService';
import { classToClass } from 'class-transformer';
import singleUserEmitEvent from '@shared/utils/singleUserEmitEvent';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSession = container.resolve(CreateAuthSessionService);

    const { user, token } = await createSession.execute(email, password);

    const parsedUser = classToClass(user);

    singleUserEmitEvent('@session:create', parsedUser.id, request, {
      status: 'online',
    });

    return response.json({ user: parsedUser, token });
  }
}
