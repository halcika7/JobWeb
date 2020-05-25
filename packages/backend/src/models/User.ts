import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  BeforeUpdate,
  AfterLoad,
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
  @IsString({ message: 'Username must be a string', groups: ['registration'] })
  @Validate(UniqueUsername, { groups: ['registration'] })
  @MinLength(6, {
    message: 'Username must contain at least 6 characters',
    groups: ['registration'],
  })
  @MaxLength(15, {
    message: 'Username cannot exceed 15 characters',
    groups: ['registration'],
  })
  username!: string;

  @Column('varchar', { unique: true, nullable: false, length: 100 })
  @Validate(UniqueEmail, { groups: ['registration'] })
  @MaxLength(100, {
    message: 'Email cannot exceed 100 characters',
    groups: ['registration'],
  })
  @IsEmail(
    {},
    { message: 'Please provide valid email', groups: ['registration'] }
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
  @Validate(EqualPasswords, { groups: ['registration'] })
  password!: string;

  private tempPassword: string | undefined;

  @Column('varchar', { nullable: false })
  @Validate(ValidateCountry, { groups: ['registration'] })
  country!: string;

  @Column('varchar', { nullable: false })
  @Validate(ValidateCity, { groups: ['registration'] })
  city!: string;

  @Column('varchar', { nullable: false })
  @IsPhoneNumber(null, {
    message: 'Please provide valid phone number',
    groups: ['registration'],
  })
  phone!: string;

  @Column('varchar', { nullable: true })
  @ValidateIf(o => o.role === 2)
  @IsString({ message: 'Company  is required', groups: ['registration'] })
  company!: string | null;

  @Column('varchar', { nullable: true })
  @ValidateIf(o => o.website)
  @IsUrl(
    {},
    { message: 'Please provide valid website url.', groups: ['registration'] }
  )
  website!: string | null;

  @Column('varchar', { nullable: true, default: null })
  reset_password_token!: string | null;

  @Column('varchar', { nullable: true })
  activation_token!: string | null;

  @ManyToOne(_ => Role)
  @JoinColumn({ name: 'role' })
  role!: number;

  @AfterLoad()
  loadTempPassword() {
    this.tempPassword = this.password;
  }

  async encryptPassword() {
    const salt = await BcryptService.generateSalt(12);
    this.password = await BcryptService.hash(this.password, salt);
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.tempPassword) {
      if (this.tempPassword !== this.password) {
        await this.encryptPassword();
      }
    } else {
      await this.encryptPassword();
    }
  }
}
