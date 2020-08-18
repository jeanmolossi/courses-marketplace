import { injectable, inject } from 'tsyringe';
import path from 'path';
import fs from 'fs';

import AppError from '@shared/infra/http/errors/AppError';
import uploadConfig from '@config/upload';

import ILessonsRepository from '../repositories/ILessonsRepository';
import Lessons from '../infra/typeorm/entities/Lessons';

interface UpdateWithVideoRequest {
  lessonId: string;
  video: {
    path: string;
    filename: string;
  };
}

@injectable()
export default class UpdateLessonWithVideoService {
  constructor(
    @inject('LessonsRepository')
    private lessonsRepository: ILessonsRepository,
  ) {}

  public async execute({
    lessonId,
    video,
  }: UpdateWithVideoRequest): Promise<Lessons | undefined> {
    const issetLesson = await this.lessonsRepository.findById(lessonId);
    if (!issetLesson) throw new AppError('Lesson does not exists');

    if (issetLesson.videoSource) {
      const lessonVideoFilePath = path.join(
        uploadConfig.lessonsDir,
        issetLesson.videoSource,
      );

      const lessonVideoFileExists = fs.statSync(lessonVideoFilePath);

      if (lessonVideoFileExists) {
        fs.unlink(lessonVideoFilePath, err => {
          // eslint-disable-next-line no-console
          if (err) console.log(err, '>> SECOND UNLINK ERROR');
        });
      }
    }

    const updatedLesson = await this.lessonsRepository.updateWithVideo({
      lessonId,
      video: video.filename,
    });

    if (!updatedLesson) {
      fs.unlink(video.path, err => {
        if (!err) {
          return null;
        }
        throw new AppError(err.message, Number(err.code));
      });
    }

    const newPath = path.join(uploadConfig.lessonsDir, video.filename);

    fs.renameSync(video.path, newPath);

    return updatedLesson;
  }
}
