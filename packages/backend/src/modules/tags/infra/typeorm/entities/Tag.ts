import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import TagTopic from './TagTopic';

@Entity('tags')
export default class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(_type => TagTopic, topic => topic.tag)
  topic: TagTopic[];

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
