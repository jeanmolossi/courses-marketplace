import { injectable, inject } from 'tsyringe';

import IClassesRepository from '../repositories/IClassesRepository';
import Classes from '../infra/typeorm/entities/Classes';

@injectable()
class FindAllClassesSevice {
  constructor(
    @inject('ClassesRepository')
    private classesRepository: IClassesRepository,
  ) {}

  public async execute(): Promise<Classes[]> {
    const classes = await this.classesRepository.findAll();

    return classes;
  }
}
export default FindAllClassesSevice;
