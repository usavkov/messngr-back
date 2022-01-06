import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class CommonEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  // @Column({ type: 'simple-json' })
  // metadata: {
  //     createdAt: number;
  //     updatedAt: number;
  //     deletedAt: number;
  //     createdBy: string;
  //     updatedBy: string;
  //     deletedBy: string;
  // };
}
