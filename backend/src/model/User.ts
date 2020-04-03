import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column()
  phone: string;

  @Column()
  website: string;

  @Column()
  company_name: string;

}
