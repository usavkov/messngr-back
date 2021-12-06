import { IsDataURI, ValidateIf, isDefined } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

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
  @ValidateIf(({ content }) => isDefined(content))
  @IsDataURI()
  content: string;

  // ---------
  // Relations

  @ManyToOne(
    () => Chat,
    chat => chat.messages,
  )
  @JoinColumn({
    name: 'chat_id',
  })
  chat: Chat;

}
