import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Message {

    @PrimaryGeneratedColumn()
    id: string;

    @Column({ type: 'uuid' })
    from: string;

    @Column({ type: 'uuid' })
    to: string;

    @Column()
    content: string;

}
