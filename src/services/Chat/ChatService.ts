import { User } from '../../entity/User';
import { Conversation } from '../../entity/Conversation';
import { Message } from '../../entity/Message';
import { FindChatDTO, SaveChatDTO, SaveMessageDTO } from './ChatDTO';

export interface IMessage {
    content: string;
    conversationId: string;
    createdAt: string;
    user: IUser;
}

export interface IUser {
    id: string;
    email: string;
}

class ChatService {
    async findChats() {
        const conversations = await Conversation.createQueryBuilder(
            'conversations'
        )
            .leftJoinAndSelect('conversations.lastMessage', 'lastMessage')
            .leftJoinAndSelect('lastMessage.user', 'user')
            .select('conversations.id')  //IMP
            .addSelect('user.id')
            .addSelect('user.email')
            .addSelect('lastMessage.id')
            .addSelect('lastMessage.conversationId')
            .addSelect('lastMessage.content')
            .addSelect('lastMessage.createdAt')
            .getMany();
        return conversations;
    }

    async saveChat(dto: SaveChatDTO) {
        const { id } = dto;
        const conversation = new Conversation();
        conversation.id = id;
        return await conversation.save();
    }

    async saveMessage(dto: SaveMessageDTO) {
        const { content, conversationId, userId } = dto;
        const user = await User.findOne({
            where: { id: userId },
        });
        const message = new Message();
        message.content = content;
        message.conversationId = conversationId;
        message.user = user!;
        await message.save();
        await Conversation.update(
            { id: conversationId },
            { lastMessage: message }
        );
        return message;
    }

    async findChatById(dto: FindChatDTO) {
        const { conversationId } = dto;
        const messages = await Message.createQueryBuilder('messages')
            .leftJoinAndSelect('messages.user', 'user')
            .where('messages.conversationId = :conversationId', {
                conversationId,
            })
            .select('user.id')
            .addSelect('user.email')
            .addSelect('messages.id')
            .addSelect('messages.conversationId')
            .addSelect('messages.content')
            .addSelect('messages.createdAt')
            .getMany();
        return messages;
    }
}

export default new ChatService();
