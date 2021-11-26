import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

import { CommonEntity } from "./utils/common";

@Entity()
export class Chat extends CommonEntity {

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

    @Column({ type: 'simple-array' })
    participants: string[];

    @Column({ type: 'simple-array', default: [] })
    messages: string[];

}
