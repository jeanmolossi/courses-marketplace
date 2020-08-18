import { hash, compare } from 'bcrypt';
import IHashProvider from '../models/IHashProvider';

class BCryptHashProvider implements IHashProvider {
  public async generate(toHash: string): Promise<string> {
    const hashedPassword = await hash(toHash, 8);

    return hashedPassword;
  }

  public async decode(hashed: string, toCompare: string): Promise<boolean> {
    const decoded = await compare(toCompare, hashed);

    return decoded;
  }
}

export default BCryptHashProvider;
