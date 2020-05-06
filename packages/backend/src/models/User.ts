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
} from '@model-validator';

// models
import { Role } from '@model/Role';

// services
import { BcryptService } from '@service/Bcrypt';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { unique: true, nullable: false, length: 15 })
  @IsString({ message: 'Username must be a string' })
  @Validate(UniqueUsername)
  @MinLength(6, { message: 'Username must contain at least 6 characters' })
  @MaxLength(15, { message: 'Username cannot exceed 15 characters' })
  username!: string;

  @Column('varchar', { unique: true, nullable: false, length: 100 })
  @Validate(UniqueEmail)
  @MaxLength(100, { message: 'Email cannot exceed 100 characters' })
  @IsEmail({}, { message: 'Please provide valid email' })
  email!: string;

  @Column('varchar', { nullable: false })
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
  password!: string;

  @Column('varchar', { nullable: false })
  @Validate(ValidateCountry)
  country!: string;

  @Column('varchar', { nullable: false })
  @Validate(ValidateCity)
  city!: string;

  @Column('varchar', { nullable: false })
  @IsPhoneNumber(null, { message: 'Please provide valid phone number' })
  phone!: string;

  @Column('varchar', { nullable: true })
  @ValidateIf(o => o.role === 2)
  @IsString({ message: 'Company  is required' })
  company!: string | null;

  @Column('varchar', { nullable: true })
  @ValidateIf(o => o.website)
  @IsUrl({}, { message: 'Please provide valid website url.' })
  website!: string | null;

  @Column('varchar', { nullable: true, default: null })
  reset_password_token!: string | null;

  @Column('varchar', { nullable: true })
  activation_token!: string | null;

  @ManyToOne(_ => Role)
  @JoinColumn({ name: 'role' })
  role!: number;

  @BeforeInsert()
  async hashPassword() {
    const salt = await BcryptService.generateSalt(12);
    this.password = await BcryptService.hash(this.password, salt);
  }
}
