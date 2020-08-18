import CreateUserDTO from '../dtos/CreateUserDTO';

import User from '../infra/typeorm/entities/User';
import UpdateUserAvatarDTO from '../dtos/UpdateUserAvatarDTO';

export default interface IUsersRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: CreateUserDTO): Promise<User>;
  updateUserAvatar(data: UpdateUserAvatarDTO): Promise<User>;
}
