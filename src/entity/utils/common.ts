import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class CommonEntity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'simple-json' })
    metadata: {
        createdAt: number;
        updatedAt: number;
        deletedAt: number;
        createdBy: string;
        updatedBy: string;
        deletedBy: string;
    };

}
