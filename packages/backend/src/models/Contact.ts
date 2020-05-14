import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import {
  IsString,
  MaxLength,
  MinLength,
  IsEmail,
  ValidateIf,
  IsPhoneNumber,
} from 'class-validator';

@Entity({ name: 'contact_messages' })
export class Contact extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { nullable: false, length: 150 })
  @IsString({ message: 'Name must be a string value' })
  @MaxLength(150, { message: 'Name can not excedd 150 characters' })
  @MinLength(4, { message: 'Name must contain at least 1 character' })
  name!: string;

  @Column('varchar', { nullable: false })
  @MaxLength(100, { message: 'Email cannot exceed 100 characters' })
  @IsEmail({}, { message: 'Please provide valid email' })
  email!: string;

  @Column('varchar', { nullable: false })
  @MinLength(1, { message: 'Subject must contain at least 5 character' })
  subject!: string;

  @Column('text', { nullable: false })
  @MinLength(10, { message: 'Message must contain at least 10 character' })
  message!: string;

  @Column('varchar', { nullable: true })
  @ValidateIf(o => o.phone)
  @IsPhoneNumber(null, { message: 'Please provide valid phone number' })
  phone!: string;
}
