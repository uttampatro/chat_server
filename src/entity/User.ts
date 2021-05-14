import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Message } from "./Message";
import { Participant } from "./Participant";


@Entity("users")
@Unique(['username', 'github_id'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: number

    @Column()
    username: string

    @Column({ type: 'int' })
    github_id: number

    @OneToMany(() => Message, (message) => message.user)
    messages: Message[]

    @OneToMany(() => Participant, (participant) => participant.user)
    participants: Participant[]
}

