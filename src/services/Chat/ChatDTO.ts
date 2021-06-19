export interface FindChatDTO {
    conversationId: string;
}
export interface SaveChatDTO {
    id: string;
}
export interface SaveMessageDTO {
    content: string;
    conversationId: string;
    userId: string;
}
