import { Repository, getRepository } from 'typeorm';

import ILessonsRepository from '@modules/lessons/repositories/ILessonsRepository';
import CreateLessonDTO from '@modules/lessons/dtos/CreateLessonDTO';

import UpdateLessonWithVideoDTO from '@modules/lessons/dtos/UpdateLessonWithVideoDTO';

import AppError from '@shared/infra/http/errors/AppError';
import Lessons from '../entities/Lessons';

class LessonsRepository implements ILessonsRepository {
  private ormRepository: Repository<Lessons>;

  constructor() {
    this.ormRepository = getRepository(Lessons);
  }

  public async findAll(): Promise<Lessons[]> {
    return this.ormRepository.find({
      relations: ['classesId', 'moduleId'],
    });
  }

  public async findByTitle(title: string): Promise<Lessons | undefined> {
    const findWithThisTitle = await this.ormRepository.findOne({
      where: { title },
    });

    return findWithThisTitle;
  }

  public async findById(id: string): Promise<Lessons | undefined> {
    const findWithThisId = await this.ormRepository.findOne(id);

    return findWithThisId;
  }

  public async create({
    title,
    moduleId,
    classesId,
  }: CreateLessonDTO): Promise<Lessons> {
    const newLesson = this.ormRepository.create({
      title,
      moduleId,
      classesId,
    });

    await this.ormRepository.save(newLesson);

    return newLesson;
  }

  public async updateWithVideo({
    lessonId,
    video,
  }: UpdateLessonWithVideoDTO): Promise<Lessons | undefined> {
    const lesson = await this.ormRepository.findOne(lessonId);

    if (!lesson) throw new AppError('Repository failed. Not Found Lesson');

    lesson.videoSource = video;
    await this.ormRepository.save(lesson);

    return lesson;
  }
}

export default LessonsRepository;
