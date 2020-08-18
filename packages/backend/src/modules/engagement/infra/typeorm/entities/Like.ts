import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import Topic from '@modules/topics/infra/typeorm/entities/Topic';

@Entity('likes')
export default class Like {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(_type => User, user => user.id, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: typeof User;

  @ManyToOne(_type => Topic, topicId => topicId.id)
  @JoinColumn({ name: 'topicId' })
  topicId: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
