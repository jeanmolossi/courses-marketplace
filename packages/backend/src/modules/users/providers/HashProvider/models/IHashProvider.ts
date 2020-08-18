export default interface IHashProvider {
  generate(toHash: string): Promise<string>;

  decode(hashed: string, toCompare: string): Promise<boolean>;
}
