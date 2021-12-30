import { ArrayMaxSize, ArrayMinSize, ArrayNotEmpty, ArrayUnique, IsDataURI, isDefined, ValidateIf } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, JoinTable } from "typeorm";

import { Message } from "./Message";
import { User } from "./User";

import { CommonEntity } from "./utils/common";

@Entity()
export class Dialog extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { array: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  userIds: string[]

  // ---------
  // Relations
  
  @ManyToMany(
    () => User,
    user => user.dialogs,
  )
  @JoinTable({
    name: 'dialogs-users',
    joinColumn: {
      name: 'dialogId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'userId',
      referencedColumnName: 'id'
    },
  })
  @ArrayMaxSize(2)
  interlocutors: User[];

  @OneToMany(
    () => Message,
    message => message.dialog
  )
  messages: Message[];

}
