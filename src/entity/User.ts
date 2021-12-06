import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { isEmail } from "class-validator";

import { Chat } from "./Chat";

import { CommonEntity } from "./utils/common";

@Entity()
export class User extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 'User' })
  role: string;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  age: number;

  @Column({ type: 'date', nullable: true }) // TODO: use as reauired
  birthDay: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true, nullable: true }) // TODO: use as reauired
  phoneNumber: number;

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  profileImage: string;

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

  @Column({ type: 'simple-array', default: [] })
  gallery: string[];

}
