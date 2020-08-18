import { Request, Response } from 'express';
import AppError from '@shared/infra/http/errors/AppError';
import { container } from 'tsyringe';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import singleUserEmitEvent from '@shared/utils/singleUserEmitEvent';

export default class AvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const validTypes = ['image/png', 'image/jpg', 'image/jpeg'];

    if (!validTypes.includes(request.file.mimetype))
      throw new AppError('Invalid image format');

    const fileInfo = request.file;
    const { id } = request.user;

    const updateUserAvatar = container.resolve(UpdateUserAvatarService);
    const updatedAvatar = await updateUserAvatar.execute({
      userId: id,
      avatar: fileInfo.filename,
    });

    singleUserEmitEvent('@avatar:update', id, request, {
      avatar: fileInfo.filename,
    });

    return response.json(updatedAvatar);
  }
}
