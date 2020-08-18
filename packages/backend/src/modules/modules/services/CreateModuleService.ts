import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';
import IClassesRepository from '@modules/classes/repositories/IClassesRepository';

import CreateModuleDTO from '../dtos/CreateModuleDTO';
import IModulesRepository from '../repositories/IModulesRepository';
import Modules from '../infra/typeorm/entities/Modules';

@injectable()
class CreateModuleService {
  constructor(
    @inject('ModulesRepository')
    private modulesRepository: IModulesRepository,
    @inject('ClassesRepository')
    private classesRepository: IClassesRepository,
  ) {}

  public async execute({ title, classId }: CreateModuleDTO): Promise<Modules> {
    const issetClassId = await this.classesRepository.findById(classId);
    if (!issetClassId) throw new AppError('Cannot found that class');

    const issetWithTitle = await this.modulesRepository.findByTitle(title);
    if (issetWithTitle && issetWithTitle.classId === classId)
      throw new AppError('This title is already in use');

    const newModule = await this.modulesRepository.create({ title, classId });

    return newModule;
  }
}

export default CreateModuleService;
