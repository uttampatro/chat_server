import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Conversation } from "./Conversation";
import { User } from "./User";

@Entity("messages")
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column('text')
  content: string;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Conversation, conversation => conversation.id)
  @JoinColumn({ name: 'conversation_id' })
  conversation: Conversation;

  @CreateDateColumn()
  @Index()
  created_at: Date;

  // constructor({content}: { content: string}){
  //   super()
  //   Object.assign(this, content)
  // }  
  
}
