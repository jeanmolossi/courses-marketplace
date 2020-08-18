import { Request, Response } from 'express';
import CreateClassService from '@modules/classes/services/CreateClassService';

import { container } from 'tsyringe';
import FindAllClassesSevice from '@modules/classes/services/FindAllClassesService';
import singleUserEmitEvent from '@shared/utils/singleUserEmitEvent';

class ClassesController {
  public async show(request: Request, response: Response): Promise<Response> {
    const findAll = container.resolve(FindAllClassesSevice);

    const users = await findAll.execute();

    return response.json(users);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createClass = container.resolve(CreateClassService);
    const newClass = await createClass.execute(name);

    singleUserEmitEvent('@classes:create', request.user.id, request, newClass);

    return response.json(newClass);
  }
}

export default ClassesController;
