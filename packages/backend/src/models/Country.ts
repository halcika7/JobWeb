import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'countries' })
export class Country extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { unique: true, nullable: false, length: 150 })
  name!: string;

  @Column('varchar', { nullable: false, array: true })
  cities!: string[];
}
