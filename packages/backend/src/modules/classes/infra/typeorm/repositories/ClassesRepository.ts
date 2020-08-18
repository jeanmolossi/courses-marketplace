import { Repository, getRepository } from 'typeorm';
import Classes from '../entities/Classes';

class ClassesRepository {
  private ormRepository: Repository<Classes>;

  constructor() {
    this.ormRepository = getRepository(Classes);
  }

  public async findAll(): Promise<Classes[]> {
    return this.ormRepository.find({
      relations: ['modules'],
    });
  }

  public async findByName(name: string): Promise<Classes | undefined> {
    const hasWithThisName = await this.ormRepository.findOne({
      where: { name },
    });

    return hasWithThisName;
  }

  public async findById(id: string): Promise<Classes | undefined> {
    const hasWithThisId = await this.ormRepository.findOne(id);

    return hasWithThisId;
  }

  public async create(name: string): Promise<Classes> {
    const newClass = this.ormRepository.create({
      name,
    });

    await this.ormRepository.save(newClass);

    return newClass;
  }
}

export default ClassesRepository;
