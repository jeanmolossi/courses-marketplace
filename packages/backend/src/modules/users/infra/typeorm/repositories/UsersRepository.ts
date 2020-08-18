import { Repository, getRepository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import CreateUserDTO from '@modules/users/dtos/CreateUserDTO';

import UpdateUserAvatarDTO from '@modules/users/dtos/UpdateUserAvatarDTO';
import AppError from '@shared/infra/http/errors/AppError';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository<User>(User);
  }

  async findAll(): Promise<User[]> {
    const users = await this.ormRepository.find();
    return users;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne(id);

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  async create({ name, email, password }: CreateUserDTO): Promise<User> {
    const newUser = await this.ormRepository.create({
      name,
      email,
      password,
    });

    await this.ormRepository.save(newUser);

    return newUser;
  }

  async updateUserAvatar({
    userId,
    avatar,
  }: UpdateUserAvatarDTO): Promise<User> {
    const user = await this.ormRepository.findOne(userId);

    if (!user) throw new AppError('User is not found');

    user.avatar = avatar;

    await this.ormRepository.save(user);

    return user;
  }
}

export default UsersRepository;
