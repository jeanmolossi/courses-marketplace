import CreateModuleDTO from '@modules/modules/dtos/CreateModuleDTO';
import IModulesRepository from '@modules/modules/repositories/IModulesRepository';

import { Repository, getRepository } from 'typeorm';
import Modules from '../entities/Modules';

class ModulesRepository implements IModulesRepository {
  private ormRepository: Repository<Modules>;

  constructor() {
    this.ormRepository = getRepository(Modules);
  }

  public async findAll(): Promise<Modules[]> {
    const modules = await this.ormRepository.find({
      relations: ['classId', 'lessons'],
    });

    return modules;
  }

  public async findById(id: string): Promise<Modules | undefined> {
    const module = this.ormRepository.findOne(id);

    return module;
  }

  public async findByTitle(title: string): Promise<Modules | undefined> {
    const module = this.ormRepository.findOne({
      where: { title },
    });

    return module;
  }

  public async create({ classId, title }: CreateModuleDTO): Promise<Modules> {
    const newModule = this.ormRepository.create({
      classId,
      title,
    });

    await this.ormRepository.save(newModule);

    return newModule;
  }
}

export default ModulesRepository;
