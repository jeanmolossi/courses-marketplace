import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';
import IModulesRepository from '@modules/modules/repositories/IModulesRepository';

import CreateLessonDTO from '../dtos/CreateLessonDTO';
import ILessonsRepository from '../repositories/ILessonsRepository';
import Lessons from '../infra/typeorm/entities/Lessons';

@injectable()
class CreateLessonService {
  constructor(
    @inject('ModulesRepository')
    private modulesRepository: IModulesRepository,
    @inject('LessonsRepository')
    private lessonsRepository: ILessonsRepository,
  ) {}

  public async execute({
    title,
    moduleId,
    classesId,
  }: CreateLessonDTO): Promise<Lessons> {
    const issetModuleId = await this.modulesRepository.findById(moduleId);
    if (!issetModuleId) throw new AppError('The moduleId cannot be found');

    const issetLessonWithSameTitle = await this.lessonsRepository.findByTitle(
      title,
    );
    if (
      issetLessonWithSameTitle &&
      issetLessonWithSameTitle.moduleId === moduleId
    )
      throw new AppError(
        'Another lesson has the same title in the same Module',
      );

    const newLesson = await this.lessonsRepository.create({
      title,
      moduleId,
      classesId,
    });

    return newLesson;
  }
}

export default CreateLessonService;
