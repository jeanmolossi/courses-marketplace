import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Expose, Exclude } from 'class-transformer';

import Modules from '@modules/modules/infra/typeorm/entities/Modules';
import Classes from '@modules/classes/infra/typeorm/entities/Classes';

@Entity('lessons')
class Lessons {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @ManyToOne(_type => Modules)
  @JoinColumn({ name: 'moduleId' })
  moduleId: string;

  @ManyToOne(_type => Classes)
  @JoinColumn({ name: 'classesId' })
  classesId: string;

  @Exclude()
  @Column()
  videoSource: string;

  @Expose({ name: 'videoURL' })
  get videoUrl(): string | null {
    const url = `${process.env.API_URL}/encryptedFiles/${this.videoSource}`;

    return this.videoSource ? url : null;
  }

  @CreateDateColumn()
  created_at: string | Date;

  @UpdateDateColumn()
  updated_at: string | Date;
}

export default Lessons;
