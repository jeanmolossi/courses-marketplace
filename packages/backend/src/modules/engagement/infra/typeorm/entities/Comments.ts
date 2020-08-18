import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Expose, Exclude } from 'class-transformer';

import User from '@modules/users/infra/typeorm/entities/User';
import Topic from '@modules/topics/infra/typeorm/entities/Topic';
import NestedComments from './NestedComments';
import Votes from './Votes';

@Entity('comments')
export default class Comments {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(_type => User, userId => userId.id, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: typeof User;

  @ManyToOne(_type => Topic, topicId => topicId.id)
  @JoinColumn({ name: 'topicId' })
  topicId: string;

  @Column()
  comment: string;

  @OneToMany(
    _type => NestedComments,
    nestedComment => nestedComment.commentRef,
    { eager: true },
  )
  nestedComments: NestedComments[];

  @Expose({ name: 'nestedCommentsCount' })
  get ncCount(): number {
    return this.nestedComments.length || 0;
  }

  @Column()
  votes: number;

  @OneToMany(_type => Votes, votesTotal => votesTotal.comment, {
    eager: true,
  })
  @JoinColumn({ name: 'votes' })
  votesTotal: Votes[];

  @Column()
  best: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
