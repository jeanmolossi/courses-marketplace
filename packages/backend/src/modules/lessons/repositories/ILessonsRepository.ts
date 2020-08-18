import CreateLessonDTO from '../dtos/CreateLessonDTO';
import Lessons from '../infra/typeorm/entities/Lessons';
import UpdateLessonWithVideoDTO from '../dtos/UpdateLessonWithVideoDTO';

export default interface ILessonsRepository {
  findAll(): Promise<Lessons[]>;

  findByTitle(title: string): Promise<Lessons | undefined>;
  findById(id: string): Promise<Lessons | undefined>;

  create(data: CreateLessonDTO): Promise<Lessons>;

  updateWithVideo(data: UpdateLessonWithVideoDTO): Promise<Lessons | undefined>;
}
