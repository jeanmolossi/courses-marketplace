import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import Comments from './Comments';

@Entity('votes')
export default class Votes {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @OneToOne(_type => User, user => user.id, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: typeof User;

  @Column()
  commentId: string;

  @ManyToOne(_type => Comments, comment => comment.id)
  @JoinColumn({ name: 'commentId' })
  comment: Comments;

  @Column()
  type: 'up' | 'down';

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
