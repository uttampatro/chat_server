import { Socket } from "socket.io";
import { ChatService } from "../services";
import { IMessage } from "../services/Chat/ChatService";


export const socketInit = (io: Socket) => {
    io.on('connection', (socket: any) => {
        socket.on('join_room', (conversationId: string) => {
            socket.join(conversationId);
            console.log('user joined ', conversationId);
        });

        socket.on('new_message', async (message: IMessage) => {
            try {
                console.log(
                    `user message ${message.content} from ${message.user.email}`
                );
                await ChatService.saveMessage({
                    content: message.content,
                    conversationId: message.conversationId,
                    userId: message.user.id,
                });
                socket
                    .to(message.conversationId)
                    .emit('receive_message', message);
            } catch (error) {
                console.log(error);
            }
        });

        socket.on('disconnect', (conversationId: string) => {
            console.log('User disconnected');
            socket.leave(conversationId);
        });
    });
};
