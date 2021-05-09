import { BaseEntity, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, } from "typeorm";
import { Conversation } from "./Conversation";
import { User } from "./User";


@Entity("participants")
export class Participant extends BaseEntity {
   @PrimaryColumn()
   @ManyToOne(() => User)
   user: User

   @PrimaryColumn()
   @ManyToOne(() => Conversation)
   conversation: Conversation

   @CreateDateColumn()
   messages_read_at: Date

}

