import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import Modules from '@modules/modules/infra/typeorm/entities/Modules';

@Entity('classes')
export default class Classes {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(_type => Modules, modules => modules.classId)
  modules: Modules[];

  @CreateDateColumn()
  created_at: string | Date;

  @UpdateDateColumn()
  updated_at: string | Date;
}
