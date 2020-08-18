import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import Lessons from '../infra/typeorm/entities/Lessons';
import ILessonsRepository from '../repositories/ILessonsRepository';

@injectable()
export default class FindByIdService {
  constructor(
    @inject('LessonsRepository')
    private lessonsRepository: ILessonsRepository,
  ) {}

  public async execute(id: string): Promise<Lessons | undefined> {
    const lesson = await this.lessonsRepository.findById(id);

    return classToClass(lesson);
  }
}
