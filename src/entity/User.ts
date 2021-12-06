import * as dayjs from 'dayjs';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { IsDataURI, isDefined, IsEmail, IsMobilePhone, Length, Min, MinDate, ValidateIf } from "class-validator";

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
  @ValidateIf(isDefined)
  @Length(2, 64)
  firstName: string;

  @Column({ nullable: true })
  @ValidateIf(isDefined)
  @Length(2, 64)
  lastName: string;

  @Column({ nullable: true })
  @ValidateIf(val => val !== undefined)
  @Min(18)
  age: number;

  @Column({ type: 'date' })
  @MinDate(dayjs().subtract(18, 'year').toDate())
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
  @ValidateIf(isDefined)
  @IsDataURI()
  profileImage: string;

  @Column({ type: 'simple-array', default: [] })
  gallery: string[];

  // @Column({ type: 'simple-array', default: [] })
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

  // @Column({ type: 'simple-array', default: [] })
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
