import { Response, Request } from 'express';
import { container } from 'tsyringe';

import CreateModuleService from '@modules/modules/services/CreateModuleService';
import FindAllModulesSevice from '@modules/modules/services/FindAllModulesService';
import singleUserEmitEvent from '@shared/utils/singleUserEmitEvent';

class ModulesController {
  public async show(request: Request, response: Response): Promise<Response> {
    const findAll = container.resolve(FindAllModulesSevice);
    const modules = await findAll.execute();

    return response.json(modules);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { title, classId } = request.body;

    const createModule = container.resolve(CreateModuleService);

    const newModule = await createModule.execute({ title, classId });

    singleUserEmitEvent('@modules:create', request.user.id, request, newModule);

    return response.json(newModule);
  }
}

export default ModulesController;
