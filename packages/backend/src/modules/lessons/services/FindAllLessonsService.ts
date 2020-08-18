import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ILessonsRepository from '../repositories/ILessonsRepository';
import Lessons from '../infra/typeorm/entities/Lessons';

@injectable()
class FindAllLessonsSevice {
  constructor(
    @inject('LessonsRepository')
    private lessonsRepository: ILessonsRepository,
  ) {}

  public async execute(): Promise<Lessons[]> {
    const lessons = await this.lessonsRepository.findAll();

    return classToClass(lessons);
  }
}
export default FindAllLessonsSevice;
