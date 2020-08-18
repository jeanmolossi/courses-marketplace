import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import IClassesRepository from '../repositories/IClassesRepository';
import Classes from '../infra/typeorm/entities/Classes';

@injectable()
class CreateClassService {
  constructor(
    @inject('ClassesRepository')
    private classesRepository: IClassesRepository,
  ) {}

  public async execute(name: string): Promise<Classes> {
    const classExists = await this.classesRepository.findByName(name);

    if (classExists)
      throw new AppError('The class with this name already exists');

    const newClass = await this.classesRepository.create(name);

    return newClass;
  }
}

export default CreateClassService;
