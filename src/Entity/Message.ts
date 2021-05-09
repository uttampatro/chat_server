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

  @ManyToOne(() => User, user => user.username)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Conversation, conversation => conversation.last_message_id)
  @JoinColumn({ name: 'conversation_id' })
  conversation: Conversation;

  @CreateDateColumn()
  @Index()
  created_at: Date;
}
