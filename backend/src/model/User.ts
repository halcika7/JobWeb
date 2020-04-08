import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './Role';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { unique: true, nullable: false, length: 15 })
  @IsNotEmpty({ message: 'Username is required' })
  @IsString({ message: 'Username must be a string' })
  @MinLength(6, { message: 'Username must contain at least 6 characters' })
  @MaxLength(15, { message: 'Username cannot exceed 15 characters' })
  username: string;

  @Column('varchar', { unique: true, nullable: false, length: 100 })
  @IsNotEmpty({ message: 'Email is required' })
  @MaxLength(100, { message: 'Email cannot exceed 100 characters' })
  @IsEmail({ message: 'Please provide valid email' })
  email: string;

  @Column('varchar', { nullable: false })
  @IsNotEmpty({ message: 'Passworrd is required' })
  @MinLength(6, { message: 'Password must contain at least 6 characters' })
  @MaxLength(15, { message: 'Password cannot exceed 15 characters' })
  @Matches(
    new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,15})'),
    {
      message:
        'Password needs to contain both lower and upper case characters, number and a special character',
    }
  )
  password: string;

  @Column()
  @IsNotEmpty({ message: 'Country is required' })
  country: string;

  @Column()
  @IsNotEmpty({ message: 'City is required' })
  city: string;

  @Column()
  @IsNotEmpty({ message: 'Phone is required' })
  @IsPhoneNumber(null, { message: 'Please provide valid phone number' })
  phone: string;

  @Column()
  company_name: string;

  @Column()
  website: string;

  @Column('varchar', { nullable: true, default: null })
  reset_password_token: string;

  @Column('varchar', { nullable: true })
  activation_token: string;

  @Column('varchar', { nullable: true })
  some_field: string;

  @ManyToOne(type => Role)
  @JoinColumn({ name: 'role' })
  role: number;
}
