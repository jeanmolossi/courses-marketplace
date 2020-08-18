import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateLessonService from '@modules/lessons/services/CreateLessonService';
import FindAllLessonsSevice from '@modules/lessons/services/FindAllLessonsService';
import FindByIdService from '@modules/lessons/services/FindByIdService';
import singleUserEmitEvent from '@shared/utils/singleUserEmitEvent';

class LessonsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { title, moduleId, classesId } = request.body;

    const createLesson = container.resolve(CreateLessonService);

    const newLesson = await createLesson.execute({
      title,
      moduleId,
      classesId,
    });

    singleUserEmitEvent('@lessons:create', request.user.id, request, newLesson);

    return response.json(newLesson);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const findAll = container.resolve(FindAllLessonsSevice);

    const lessons = await findAll.execute();

    return response.json(lessons);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    request.io.to(request.connectedUsers[request.user.id]).emit('test', {
      id,
      user: 'tru',
    });

    const findById = container.resolve(FindByIdService);
    const lesson = await findById.execute(id);

    return response.json(lesson);
  }
}

export default LessonsController;
