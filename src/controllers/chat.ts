import { Request, Response } from 'express';
import { User } from '../entity/User';
import { get } from 'lodash';
import { ConversationService } from '../services';

class ChatController {
    fetchConversationList = async (req: Request, res: Response) => {
        try {
            console.log('hit1');
            const conversations = await ConversationService.findConversations();
            console.log('hit2');
            return res.json(conversations);
        } catch (error) {
            console.log('hit3');
            return res.status(500).json({
                success: false,
                message: 'Something went wrong',
            });
        }
    };

    fetchChat = async (req: Request, res: Response) => {
        try {
            const Id = get(req, 'params.id');
            const conversation =
                await ConversationService.findConversationsChat({
                    id: Id,
                });
            return res.json(conversation);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Something went wrong',
            });
        }
    };

    createConversation = async (req: Request, res: Response) => {
        try {
            const lastMessageId = get(req, 'body.lastMessageId');
            const conversations = await ConversationService.saveConversion({
                lastMessageId,
            });
            return res.json(conversations);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Something went wrong',
            });
        }
    };
}

export default new ChatController();
