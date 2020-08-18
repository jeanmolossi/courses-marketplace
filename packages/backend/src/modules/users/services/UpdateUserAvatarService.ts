import { inject, injectable } from 'tsyringe';
import path from 'path';
import fs from 'fs';

import AppError from '@shared/infra/http/errors/AppError';
import uploadConfig from '@config/upload';
import { classToClass } from 'class-transformer';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

interface UpdateUserRequest {
  userId: string;
  avatar: string;
}

@injectable()
export default class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ userId, avatar }: UpdateUserRequest): Promise<User> {
    const issetUser = await this.usersRepository.findById(userId);
    if (!issetUser) throw new AppError('User is not found!');

    if (issetUser.avatar) {
      const avatarFilePath = path.join(
        uploadConfig.avatarDir,
        issetUser.avatar,
      );

      const avatarFileExists = fs.statSync(avatarFilePath);

      if (avatarFileExists) {
        fs.unlink(avatarFilePath, err => {
          if (err) console.log(err, '>> UNLINK ERROR');
        });
      }
    }

    const updatedAvatar = await this.usersRepository.updateUserAvatar({
      userId,
      avatar,
    });

    const tmpPath = path.join(uploadConfig.directory, avatar);

    if (!updatedAvatar) {
      fs.unlink(tmpPath, err => {
        if (!err) {
          return null;
        }
        throw new AppError(err.message, Number(err.code));
      });
    }

    const newPath = path.join(uploadConfig.avatarDir, avatar);

    fs.renameSync(tmpPath, newPath);

    return classToClass(updatedAvatar);
  }
}
