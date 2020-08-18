import { injectable, inject } from 'tsyringe';
import AppError from '@shared/infra/http/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';
import CreateUserDTO from '../dtos/CreateUserDTO';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

@injectable()
export default class CreateUserService {
  constructor(
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    name,
    email,
    password,
  }: CreateUserDTO): Promise<User> {
    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) throw new AppError('The email already in use');

    const hashedPassword = await this.hashProvider.generate(password);

    const newUser = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return newUser;
  }
}
