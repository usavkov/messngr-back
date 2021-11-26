import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

import { CommonEntity } from "./utils/common";

@Entity()
export class Message extends CommonEntity {

    @Column({ type: 'uuid' })
    from: string;

    @Column({ type: 'uuid' })
    to: string;

    @Column()
    content: string;

}
