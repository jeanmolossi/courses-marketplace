import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

import Comments from './Comments';

@Entity('nested_comments')
export default class NestedComments {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(_type => User, user => user.id, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: typeof User;

  @Column()
  comment: string;

  @ManyToOne(_type => Comments, commentRef => commentRef.id)
  @JoinColumn({ name: 'commentRef' })
  commentRef: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
