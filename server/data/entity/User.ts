import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    id1C: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    phone: string



}
