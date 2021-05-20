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

    fetchChat = async (req: Request, res: Response) => {
        try {
            const Id = get(req, 'params.id');
            const chat = await ChatService.findChatConversation({
                id: Id,
            });
            return res.json(chat);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Something went wrong',
            });
        }
    };

    // createConversation = async (req: Request, res: Response) => {
    //     try {
    //         const Id = get(req, 'params.id');
    //         const conversations = await ChatService.saveChat({ Id });
    //         return res.json(conversations);
    //     } catch (error) {
    //         return res.status(500).json({
    //             success: false,
    //             message: 'Something went wrong',
    //         });
    //     }
    // };
    deleteConversation = async (req: Request, res: Response) => {
        try {
            const Id = get(req, 'params.id');
            const conversation = await ChatService.deleteChat({
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
}

export default new ChatController();
