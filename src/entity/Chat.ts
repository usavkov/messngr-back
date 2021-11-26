import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { User } from "./User";

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

    @ManyToMany(
        () => User
    )
    participants: User[];

    @Column({ type: 'simple-array', default: [] })
    messages: string[];

}
