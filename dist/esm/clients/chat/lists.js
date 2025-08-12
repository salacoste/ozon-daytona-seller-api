export class ChatLists {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async listChatsV2(params) {
        return this.httpClient.post('/v2/chat/list', params);
    }
    async listChatsV3(params) {
        return this.httpClient.post('/v3/chat/list', params);
    }
    async getChatHistoryV2(params) {
        return this.httpClient.post('/v2/chat/history', params);
    }
    async getChatHistoryV3(params) {
        return this.httpClient.post('/v3/chat/history', params);
    }
}
