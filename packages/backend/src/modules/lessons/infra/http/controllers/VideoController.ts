import { Response, Request } from 'express';

import AppError from '@shared/infra/http/errors/AppError';
import { container } from 'tsyringe';
import UpdateLessonWithVideoService from '@modules/lessons/services/UpdateLessonWithVideoService';
import singleUserEmitEvent from '@shared/utils/singleUserEmitEvent';

export default class VideoController {
  public async update(request: Request, response: Response): Promise<Response> {
    const validTypes = ['video/ogg', 'video/mp4', 'video/webm'];
    if (!validTypes.includes(request.file.mimetype))
      throw new AppError('Invalid video format');

    const filesInfo = request.file;
    const { lessonId } = request.body;

    const updateLessonVideo = container.resolve(UpdateLessonWithVideoService);
    const updatedLesson = await updateLessonVideo.execute({
      lessonId,
      video: filesInfo,
    });

    singleUserEmitEvent('@lessons:video:update', request.user.id, request, {
      lessonUpdated: updatedLesson ? updatedLesson.title : 'Nada atualizado',
    });

    return response.json(updatedLesson);
  }
}
