import { BaseEntity, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Message } from "./Message";
import { Participant } from "./Participant";


@Entity("conversations")
export class Conversation extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: number

    @Column({ type: "int" })
    @Index()
    last_message_id: number

    @OneToMany(() => Message, (message) => message.conversation)
    messages: Message[]

    @OneToMany(() => Participant, (participant) => participant.conversation)
    participants: Participant[]

}

