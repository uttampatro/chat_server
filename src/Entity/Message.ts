import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
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

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Conversation)
  conversation: Conversation;

  @CreateDateColumn()
  @Index()
  created_at: Date;
}
