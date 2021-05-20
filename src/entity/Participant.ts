import {
    BaseEntity,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
} from 'typeorm';
import { Conversation } from './Conversation';
import { User } from './User';

@Entity('participants')
export class Participant extends BaseEntity {
    @PrimaryColumn('int')
    @ManyToOne(() => User, user => user.participants)
    @JoinColumn()
    user: User;

    @PrimaryColumn('int')
    @ManyToOne(() => Conversation, conversation => conversation.participants)
    @JoinColumn()
    conversation: Conversation;
    
    @CreateDateColumn()
    messageReadAt: Date;
}
