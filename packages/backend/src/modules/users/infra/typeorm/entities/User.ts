import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Expose, classToClass } from 'class-transformer';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Exclude()
  @Column()
  avatar: string;

  @Expose({ name: 'avatarURL' })
  get url(): string {
    const baseUrl = `${process.env.API_URL}/userfiles/`;
    const avatar = this.avatar ? this.avatar : 'ghost.png';
    const url = `${baseUrl}${avatar}`;

    return url;
  }

  @CreateDateColumn()
  created_at: string | Date | number;

  @UpdateDateColumn()
  updated_at: string | Date | number;
}

export default classToClass(User);
