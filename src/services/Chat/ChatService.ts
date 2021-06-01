import { Conversation } from '../../entity/Conversation';
import { Message } from '../../entity/Message';
import { FindChatDTO, SaveChatDTO } from './ChatDTO';

class ChatService {
    async findChats() {
        const conversations = await Conversation.find({
            relations: ['lastMessage'],
        });
        return conversations;
    }
    async saveChats(dto: SaveChatDTO) {
        const { id } = dto
        const conversation = new Conversation()
        conversation.id = id
        return await conversation.save()
    }
    async findChatById(dto: FindChatDTO) {
        const { conversationId } = dto;
        const messages = await Message.find({
            where: {conversationId},
            relations: ['user']
        });
        return messages;
    }
}

export default new ChatService();
