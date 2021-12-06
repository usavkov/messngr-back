import * as dayjs from 'dayjs';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import {
  IsDataURI,
  isDefined,
  IsEmail,
  IsMobilePhone,
  Length,
  Min,
  MinDate,
  ValidateIf
  } from 'class-validator';

import { UNDER_LAW_AGE } from '../constants.ts';
import { Chat } from "./Chat";
import { CommonEntity } from "./utils/common";

@Entity()
export class User extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 'User' })
  role: string;

  @Column({ unique: true })
  @Length(3, 20)
  username: string;

  @Column({ nullable: true })
  @ValidateIf(({ firstName }) => isDefined(firstName))
  @Length(2, 64)
  firstName: string;

  @Column({ nullable: true })
  @ValidateIf(({ lastName }) => isDefined(lastName))
  @Length(2, 64)
  lastName: string;

  @Column({ nullable: true })
  @ValidateIf(({ age }) => isDefined(age))
  @Min(18)
  age: number;

  // TODO: use as reauired
  @Column({ type: 'date', nullable: true })
  @ValidateIf(({ birthDate }) => isDefined(birthDate))
  @MinDate(
    dayjs().subtract(18, 'year').toDate(),
    {
      message: 'Too young',
      context: {
        code: UNDER_LAW_AGE,
        readable: 'You must be at least $constraint1 years old, but you - $value'
      }
    }
  )
  birthDate: number;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ default: 'ru-RU' })
  locale: string;

  @Column({ unique: true, nullable: true }) // TODO: use as reauired
  // @IsMobilePhone()
  phoneNumber: number;

  @Column({ nullable: true })
  @ValidateIf(({ profileImage }) => isDefined(profileImage))
  @IsDataURI()
  profileImage: string;

  @Column({ type: 'simple-array', default: [] })
  gallery: string[];

  // ---------
  // Relations

  @ManyToMany(() => User)
  @JoinTable({
    name: 'users-friends',
    joinColumn: {
      name: 'userId',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'friendId',
      referencedColumnName: 'id',
    }
  })
  friends: User[];

  @ManyToMany(() => Chat)
  @JoinTable({
    name: 'users-chats',
    joinColumn: {
      name: 'userId',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'chatId',
      referencedColumnName: 'id',
    }
  })
  chats: Chat[];
}
