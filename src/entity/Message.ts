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

    @CreateDateColumn()
    @Index()
    createdAt: Date;
}
