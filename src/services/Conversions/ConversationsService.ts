import { Conversation } from '../../entity/Conversation';
import {
    deleteConversationDTO,
    FindConversationsDTO,
    SaveConversationDTO,
} from './ConversationsDTO';

class ConversationService {
    async saveConversion(dto: SaveConversationDTO) {
        const { lastMessageId } = dto;
        const conversation = new Conversation();
        conversation.lastMessageId = lastMessageId;
        return await conversation.save();
    }
    async findConversations() {
        const conversation = await Conversation.find({
            relations: ['messages'],
        });
        return conversation;
    }
    async findConversationChat(dto: FindConversationsDTO) {
        const { id } = dto;
        const conversation = await Conversation.findOneOrFail(
            { id },
            { relations: ['messages'] }
        );
        return conversation;
    }
    async deleteConversation(dto: deleteConversationDTO) {
        const { id } = dto;
        const conversation = await Conversation.findOneOrFail({ id });
        return conversation.remove();
    }
}

export default new ConversationService();
