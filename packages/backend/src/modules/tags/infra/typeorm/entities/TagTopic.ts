import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import Topic from '@modules/topics/infra/typeorm/entities/Topic';

import Tag from './Tag';

@Entity('tags_topics')
export default class TagTopic {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  topicId: string;

  @ManyToOne(_type => Topic)
  @JoinColumn({ name: 'topicId' })
  topic: Topic;

  @Column()
  tagId: string;

  @ManyToOne(_type => Tag, { eager: true })
  @JoinColumn({ name: 'tagId' })
  tag: Tag;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
