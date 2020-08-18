import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import Classes from '@modules/classes/infra/typeorm/entities/Classes';
import Lessons from '@modules/lessons/infra/typeorm/entities/Lessons';

@Entity('modules')
export default class Modules {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(_type => Classes)
  @JoinColumn({ name: 'classId' })
  classId: string;

  @OneToMany(_type => Lessons, lessons => lessons.moduleId)
  lessons: Lessons[];

  @Column()
  title: string;

  @CreateDateColumn()
  created_at: string | Date;

  @UpdateDateColumn()
  updated_at: string | Date;
}
