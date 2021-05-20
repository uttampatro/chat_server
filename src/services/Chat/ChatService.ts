import { Conversation } from '../../entity/Conversation';
import { FindChatDTO } from "./ChatDTO"

class ChatService {
    async findChats() {
        const conversations = await Conversation.find();
        return conversations;
    }
    async findChatById (dto: FindChatDTO) {
        const { id } = dto;
        const conversation = await Conversation.findOneOrFail({
            id
        })
        return conversation
    }
}

export default new ChatService();
