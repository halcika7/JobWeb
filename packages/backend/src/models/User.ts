import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  BeforeUpdate,
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
  IsEqualPasswords,
  IsUniqueEmail,
  IsUniqueUsername,
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
  @IsString({
    message: 'Username must be a string',
    groups: ['registration', 'company-registration'],
  })
  @IsUniqueUsername({
    groups: ['registration', 'company-registration'],
    always: false,
  })
  @MinLength(6, {
    message: 'Username must contain at least 6 characters',
    groups: ['registration', 'company-registration'],
  })
  @MaxLength(15, {
    message: 'Username cannot exceed 15 characters',
    groups: ['registration', 'company-registration'],
  })
  username!: string;

  @Column('varchar', { unique: true, nullable: false, length: 100 })
  @IsUniqueEmail({
    groups: ['registration', 'company-registration'],
    always: false,
  })
  @MaxLength(100, {
    message: 'Email cannot exceed 100 characters',
    groups: ['registration', 'company-registration'],
  })
  @IsEmail(
    {},
    {
      message: 'Please provide valid email',
      groups: ['registration', 'company-registration'],
    }
  )
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
  @IsEqualPasswords()
  password!: string;

  @Column('varchar', { nullable: false })
  @Validate(ValidateCountry, {
    groups: ['registration', 'company-registration'],
  })
  country!: string;

  @Column('varchar', { nullable: false })
  @Validate(ValidateCity, { groups: ['registration', 'company-registration'] })
  city!: string;

  @Column('varchar', { nullable: false })
  @IsPhoneNumber(null, {
    message: 'Please provide valid phone number',
    groups: ['registration', 'company-registration'],
  })
  phone!: string;

  @Column('varchar', { nullable: true })
  @ValidateIf(o => o.role === 2)
  @IsString({
    message: 'Company  is required',
    groups: ['company-registration'],
  })
  company!: string | null;

  @Column('varchar', { nullable: true })
  @ValidateIf(o => o.website)
  @IsUrl(
    {},
    {
      message: 'Please provide valid website url.',
      groups: ['company-registration'],
    }
  )
  website!: string | null;

  @Column('varchar', { nullable: true, default: null })
  reset_password_token!: string | null;

  @Column('varchar', { nullable: true })
  activation_token!: string | null;

  @Column('varchar', { nullable: true, default: null })
  facebookId!: string | null;

  @Column('varchar', { nullable: true, default: null })
  googleId!: string | null;

  @Column('varchar', { nullable: true, default: null })
  twitterId!: string | null;

  @Column('varchar', { nullable: true, default: null })
  linkedInId!: string | null;

  @ManyToOne(_ => Role)
  @JoinColumn({ name: 'role' })
  role!: number;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password.length <= 15) {
      const salt = await BcryptService.generateSalt(12);
      this.password = await BcryptService.hash(this.password, salt);
    }
  }
}
