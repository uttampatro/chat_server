import {
    BaseEntity,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Message } from './Message';
import { Participant } from './Participant';

@Entity('conversations')
export class Conversation extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => Message)
    @JoinColumn()
    lastMessage: Message;

    @OneToMany(() => Participant, participant => participant.conversation)
    participants: Participant[];
}
