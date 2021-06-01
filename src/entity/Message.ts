import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';

@Entity('messages')
export class Message extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column('text')
    content: string;

    @Column({ type: 'uuid' })
    conversationId: number;

    @ManyToOne(() => User, user => user.messages)
    @JoinColumn()
    user: User;

    @CreateDateColumn()
    @Index()
    createdAt: Date;
}
