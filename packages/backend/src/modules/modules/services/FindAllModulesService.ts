import { injectable, inject } from 'tsyringe';

import IModulesRepository from '../repositories/IModulesRepository';
import Modules from '../infra/typeorm/entities/Modules';

@injectable()
class FindAllModulesSevice {
  constructor(
    @inject('ModulesRepository')
    private modulesRepository: IModulesRepository,
  ) {}

  public async execute(): Promise<Modules[]> {
    const modules = await this.modulesRepository.findAll();

    return modules;
  }
}
export default FindAllModulesSevice;
