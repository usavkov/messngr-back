import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from "typeorm";

import { Message } from "./Message";
import { User } from "./User";

import { CommonEntity } from "./utils/common";

@Entity()
export class Chat extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  from: string;

  @Column({ type: 'uuid' })
  to: string;

  @Column()
  content: string;

  @Column()
  imageUrl: string;

  @Column({ type: 'simple-array' })
  moderators: string[];

  // ---------
  // Relations

  @ManyToMany(() => User)
  participants: User[];

  @OneToMany(
    () => Message,
    message => message.chat
  )
  messages: Message[];

}
