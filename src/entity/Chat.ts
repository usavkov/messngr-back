import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsDataURI,
  isDefined,
  ValidateIf,
} from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  JoinTable,
} from 'typeorm';

import { Message } from './Message';
import { User } from './User';

import { CommonEntity } from './utils/common';

@Entity()
export class Chat extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  @ValidateIf(({ imageUrl }) => isDefined(imageUrl))
  @IsDataURI()
  imageUrl: string;

  @Column('uuid', {
    nullable: true,
    array: true,
  })
  @ArrayNotEmpty()
  moderators: string[];

  // ---------
  // Relations

  @ManyToMany(() => User, (user) => user.chats)
  @JoinTable({
    name: 'chats-users',
    joinColumn: {
      name: 'chatId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
  })
  @ArrayMinSize(2)
  participants: User[];

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];
}
