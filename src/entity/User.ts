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
@Unique(['email'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    email: string;

    @Column({ nullable: true })
    password: string;

    @OneToMany(() => Message, message => message.user)
    messages: Message[];

    @OneToMany(() => Participant, participant => participant.user)
    participants: Participant[];
}
