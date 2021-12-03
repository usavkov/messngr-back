import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

import { Chat } from "./Chat";

import { CommonEntity } from "./utils/common";

@Entity()
export class Message extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  from: string;

  @Column({ type: 'uuid' })
  to: string;

  @Column()
  content: string;

  @ManyToOne(
    () => Chat,
    chat => chat.messages,
  )
  chat: Chat;

}
