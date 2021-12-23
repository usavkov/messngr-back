import { IsDataURI, ValidateIf, isDefined, MaxLength, IsNotEmpty } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { MessageTypes } from "../components/message/constants";

import { Chat } from "./Chat";
import { Dialog } from "./Dialog";

import { CommonEntity } from "./utils/common";

@Entity()
export class Message extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: MessageTypes;

  @Column({ type: 'uuid' })
  from: string;

  @Column({
    type: 'uuid',
    nullable: true,
  })
  to: string;

  @Column()
  @ValidateIf(({ content }) => isDefined(content))
  @MaxLength(1000)
  content: string;

  @Column('text', {
    array: true,
    nullable: true,
  })
  @ValidateIf(({ attachments }) => isDefined(attachments))
  @IsDataURI()
  attachments: string[];

  // ---------
  // Relations

  @ManyToOne(
    () => Chat,
    chat => chat.messages,
  )
  @JoinColumn({
    name: 'chatId',
  })
  @ValidateIf(({ dialog }) => !isDefined(dialog))
  @IsNotEmpty()
  chat: Chat;

  @ManyToOne(
    () => Dialog,
    dialog => dialog.messages,
  )
  @JoinColumn({
    name: 'dialogId',
  })
  @ValidateIf(({ chat }) => !isDefined(chat))
  @IsNotEmpty()
  dialog: Dialog;

}
