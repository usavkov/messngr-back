import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Chat } from "./Chat";

import { CommonEntity } from "./utils/common";

@Entity()
export class User extends CommonEntity {

    @Column({ unique: true })
    username: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @Column({ type: 'date' })
    birthDay: number;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    phoneNumber: number;

    @Column({ default: false })
    isDeleted: boolean;

    @Column()
    location: string;

    @Column()
    profileImage: string;

    @Column({ type: 'simple-array', default: [] })
    friends: string[];

    // @Column({ type: 'simple-array', default: [] })
    @ManyToMany(
        () => Chat
    )
    @JoinTable({
        name: 'users-chats',
        joinColumn: {
            name: 'userId',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'chatId',
            referencedColumnName: 'id',
        }
    })
    chats: Chat[];

    @Column({ type: 'simple-array', default: [] })
    gallery: string[];

}
