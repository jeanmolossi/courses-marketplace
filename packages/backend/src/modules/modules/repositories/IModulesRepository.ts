import CreateModuleDTO from '../dtos/CreateModuleDTO';
import Modules from '../infra/typeorm/entities/Modules';

export default interface IModulesRepository {
  findAll(): Promise<Modules[]>;

  findById(id: string): Promise<Modules | undefined>;

  findByTitle(title: string): Promise<Modules | undefined>;

  create({ classId, title }: CreateModuleDTO): Promise<Modules>;
}
