import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';
import { Message } from './Message';
import { Participant } from './Participant';

@Entity('users')
@Unique(['email', 'githubId'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    email: string;

    @Column({ type: 'int' })
    githubId: number;

    @OneToMany(() => Message, message => message.user)
    messages: Message[];

    @OneToMany(() => Participant, participant => participant.user)
    participants: Participant[];
}
