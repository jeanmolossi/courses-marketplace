import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Expose } from 'class-transformer';

import User from '@modules/users/infra/typeorm/entities/User';
import Comments from '@modules/engagement/infra/typeorm/entities/Comments';
import Like from '@modules/engagement/infra/typeorm/entities/Like';
import TagTopic from '@modules/tags/infra/typeorm/entities/TagTopic';

@Entity('topics')
class Topic {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(_type => User, userId => userId.id, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: typeof User;

  @OneToMany(_type => Comments, comments => comments.topicId, { eager: true })
  comments: Comments[];

  @Expose({ name: 'commentsCount' })
  get cCount(): number {
    return this.comments.length || 0;
  }

  @OneToMany(_type => Like, likes => likes.topicId, { eager: true })
  likes: Like[];

  @Expose({ name: 'likesCount' })
  get lCount(): number {
    return this.likes.length || 0;
  }

  @Column()
  views: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @Column()
  solved: boolean;

  @OneToMany(_type => TagTopic, tags => tags.topic, {
    cascade: true,
    eager: true,
  })
  tags: TagTopic[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Topic;
