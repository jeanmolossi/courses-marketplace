import Classes from '../infra/typeorm/entities/Classes';

export default interface IClassesRepository {
  findAll(): Promise<Classes[]>;
  findByName(name: string): Promise<Classes | undefined>;
  findById(id: string): Promise<Classes | undefined>;
  create(name: string): Promise<Classes>;
}
