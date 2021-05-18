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
    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @PrimaryColumn('int')
    @ManyToOne(() => Conversation, conversation => conversation.id)
    @JoinColumn({ name: 'conversation_id' })
    conversation: Conversation;

    @CreateDateColumn()
    messageReadAt: Date;
}
