import { ArrayMaxSize, ArrayMinSize, ArrayNotEmpty, ArrayUnique, IsDataURI, isDefined, ValidateIf } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, JoinTable } from "typeorm";

import { Message } from "./Message";
import { User } from "./User";

import { CommonEntity } from "./utils/common";

@Entity()
export class Dialog extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { array: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @ArrayUnique()
  userIds: string[]

  @Column({ nullable: true })
  @ValidateIf(({ imageUrl }) => isDefined(imageUrl))
  @IsDataURI()
  imageUrl: string;

  // ---------
  // Relations

  @OneToMany(
    () => Message,
    message => message.dialog
  )
  messages: Message[];

}
