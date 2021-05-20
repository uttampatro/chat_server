import {
    BaseEntity,
    Entity,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Message } from './Message';
import { Participant } from './Participant';

@Entity('conversations')
export class Conversation extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @OneToOne(() => Message, message => message.conversation)
    lastMessage: Message;

    @OneToMany(() => Participant, participant => participant.conversation)
    participants: Participant[];
}
