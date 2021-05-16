import { Conversation } from "../../entity/Conversation";
import { FetchConversationDTO, FindConversationsDTO, SaveConversationDTO } from "./ConversationsDTO";

class ConversationService {
  async saveConversion(dto: SaveConversationDTO) {
    const { lastMessageId } = dto;
    const conversation = new Conversation();
    conversation.lastMessageId = lastMessageId;
    return await conversation.save();
  }
  async findConversations() {
    const conversation = await Conversation.find();
    return conversation
  }
  async findConversationsChat(dto: FindConversationsDTO) {
    const { id } = dto;
    const conversation = await Conversation.findOneOrFail({ id });
    return conversation;
  }
}

export default new ConversationService();
