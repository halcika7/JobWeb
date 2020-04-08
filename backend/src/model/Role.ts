import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'roles' })
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ['user', 'company', 'admin', 'worker'],
    default: 'user',
  })
  type: 'user' | 'company' | 'admin' | 'worker';
}
