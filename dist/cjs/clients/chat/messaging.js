"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatMessaging = void 0;
class ChatMessaging {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async sendMessageV1(params) {
        return this.httpClient.post('/v1/chat/send/message', params);
    }
    async sendFileV1(params) {
        return this.httpClient.post('/v1/chat/send/file', params);
    }
    async startChatV1(params) {
        return this.httpClient.post('/v1/chat/start', params);
    }
    async markChatReadV2(params) {
        return this.httpClient.post('/v2/chat/read', params);
    }
}
exports.ChatMessaging = ChatMessaging;
