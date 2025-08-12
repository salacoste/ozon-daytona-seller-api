import { ChatMessaging } from './messaging';
import { ChatLists } from './lists';
export class ChatAPI {
    constructor(httpClient) {
        this.messaging = new ChatMessaging(httpClient);
        this.lists = new ChatLists(httpClient);
    }
    async sendMessageV1(params) {
        return this.messaging.sendMessageV1(params);
    }
    async sendFileV1(params) {
        return this.messaging.sendFileV1(params);
    }
    async startChatV1(params) {
        return this.messaging.startChatV1(params);
    }
    async listChatsV2(params) {
        return this.lists.listChatsV2(params);
    }
    async listChatsV3(params) {
        return this.lists.listChatsV3(params);
    }
    async getChatHistoryV2(params) {
        return this.lists.getChatHistoryV2(params);
    }
    async getChatHistoryV3(params) {
        return this.lists.getChatHistoryV3(params);
    }
    async markChatReadV2(params) {
        return this.messaging.markChatReadV2(params);
    }
}
