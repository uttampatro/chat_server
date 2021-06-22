import { Request, Response } from 'express';
import { get } from 'lodash';
import { ChatService } from '../services';

class ChatController {
    fetchConversationList = async (req: Request, res: Response) => {
        try {
            const conversations = await ChatService.findChats();
            return res.json(conversations);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Something went wrong',
            });
        }
    };
    saveChat = async (req: Request, res: Response) => {
        try {
            const Id = get(req, 'params.id');
            const conversation = await ChatService.saveChat({ id: Id });
            return res.json(conversation);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Something went wrong',
            });
        }
    };
    fetchChat = async (req: Request, res: Response) => {
        try {
            const conversationId = get(req, 'params.id');
            const messages = await ChatService.findChatById({ conversationId });
            return res.json(messages);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Something went wrong',
            });
        }
    };
}

export default new ChatController();
