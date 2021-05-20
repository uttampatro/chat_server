import { Conversation } from '../../entity/Conversation';
import { deleteChatDTO, FindChatsDTO, SaveChatDTO } from './ChatDTO';

class ChatService {
    async saveChat(dto: SaveChatDTO) {
        const conversation = new Conversation();
        return await conversation.save();
    }
    async findChats() {
        const conversation = await Conversation.find({
            relations: ['lastMessages'],
        });
        return conversation;
    }
    async findChatConversation(dto: FindChatsDTO) {
        const { id } = dto;
        const conversation = await Conversation.findOneOrFail(
            { id },
            { relations: ['lastMessages'] }
        );
        return conversation;
    }
    async deleteChat(dto: deleteChatDTO) {
        const { id } = dto;
        const conversation = await Conversation.findOneOrFail({ id });
        return conversation.remove();
    }
}

export default new ChatService();
