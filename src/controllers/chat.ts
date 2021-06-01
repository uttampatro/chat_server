import { Request, Response } from 'express';
import { get } from 'lodash';
import { ChatService } from '../services';

class ChatController {
    fetchConversationList = async (req: Request, res: Response) => {
        try {
            // console.log('hit1');
            const conversations = await ChatService.findChats();
            // console.log('hit2');
            return res.json(conversations);
        } catch (error) {
            // console.log('hit3');
            return res.status(500).json({
                success: false,
                message: 'Something went wrong',
            });
        }
    };
    saveChat = async (req: Request, res: Response) => {
        try {
            // console.log('hit1');
            const Id = get(req, 'params.id');
            const conversation = await ChatService.saveChats({ id: Id });
            // console.log('hit2');
            return res.json(conversation);
        } catch (error) {
            // console.log('hit3');
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
            // console.log(conversationId);
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
