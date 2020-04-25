import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

// validators
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
  Validate,
  ValidateIf,
} from 'class-validator';
import {
  EqualPasswords,
  UniqueEmail,
  UniqueUsername,
  ValidateCity,
  ValidateCountry,
} from '@validation/CustomClassValidator';

// models
import { Role } from '@model/Role';

// services
import BcryptService from '@service/Bcrypt';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { unique: true, nullable: false, length: 15 })
  @IsNotEmpty({ message: 'Username is required' })
  @IsString({ message: 'Username must be a string' })
  @Validate(UniqueUsername)
  @MinLength(6, { message: 'Username must contain at least 6 characters' })
  @MaxLength(15, { message: 'Username cannot exceed 15 characters' })
  username: string;

  @Column('varchar', { unique: true, nullable: false, length: 100 })
  @IsNotEmpty({ message: 'Email is required' })
  @Validate(UniqueEmail)
  @MaxLength(100, { message: 'Email cannot exceed 100 characters' })
  @IsEmail({}, { message: 'Please provide valid email' })
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
  @Validate(EqualPasswords)
  password: string;

  @Column('varchar', { nullable: false })
  @IsNotEmpty({ message: 'Country is required' })
  @Validate(ValidateCountry)
  country: string;

  @Column('varchar', { nullable: false })
  @IsNotEmpty({ message: 'City is required' })
  @Validate(ValidateCity)
  city: string;

  @Column('varchar', { nullable: false })
  @IsNotEmpty({ message: 'Phone is required' })
  @IsPhoneNumber(null, { message: 'Please provide valid phone number' })
  phone: string;

  @Column('varchar', { nullable: true })
  @ValidateIf(o => o.role === 2)
  @IsNotEmpty({ message: 'Company name is required' })
  company: string;

  @Column('varchar', { nullable: true })
  @ValidateIf(o => o.website !== '')
  @IsUrl({}, { message: 'Please provide valid website url.' })
  website: string;

  @Column('varchar', { nullable: true, default: null })
  reset_password_token: string;

  @Column('varchar', { nullable: true })
  activation_token: string;

  @ManyToOne(type => Role)
  @JoinColumn({ name: 'role' })
  role: number;

  @BeforeInsert()
  async hashPassword() {
    const salt = await BcryptService.generateSalt(12);
    this.password = await BcryptService.hash(this.password, salt);
  }
}
