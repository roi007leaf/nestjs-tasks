import { BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

export default class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  le: string;

  @Column()
  description: string;

  @Column()
  status: string;
}
