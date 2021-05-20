import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Conversation } from './Conversation';
import { User } from './User';

@Entity('messages')
export class Message extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column('text')
    content: string;

    @ManyToOne(() => User, user => user.messages)
    @JoinColumn()
    user: User;

    @OneToOne(() => Conversation, conversation => conversation.lastMessage)
    @JoinColumn()
    conversation: Conversation;
    
    @CreateDateColumn()
    @Index()
    createdAt: Date;
}