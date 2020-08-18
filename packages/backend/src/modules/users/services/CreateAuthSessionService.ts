import { injectable, inject } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import AppError from '@shared/infra/http/errors/AppError';
import jwtConfig from '@config/jwt';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface Response {
  user: User;
  token: string;
}

@injectable()
export default class CreateAuthSessionService {
  constructor(
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(email: string, password: string): Promise<Response> {
    const userExists = await this.usersRepository.findByEmail(email);

    if (!userExists) throw new AppError('Invalid credentials.');

    const compareValidPassword = await this.hashProvider.decode(
      userExists.password,
      password,
    );

    if (!compareValidPassword) throw new AppError('Invalid credentials');

    const token = sign({}, jwtConfig.secret, {
      subject: userExists.id,
      expiresIn: jwtConfig.expiresIn,
    });

    return {
      user: userExists,
      token,
    };
  }
}
