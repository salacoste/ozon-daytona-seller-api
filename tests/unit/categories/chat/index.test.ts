/**
 * ChatApi unit tests
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { ChatApi } from "../../../../src/categories/chat/index.js";
import { HttpClient } from "../../../../src/core/http.js";
import type { ChatStartRequest, ChatSendMessageRequest, ChatSendFileRequest, ChatReadRequest, ChatHistoryV2Request, ChatHistoryV3Request, ChatListV2Request, ChatListV3Request } from "../../../../src/types/requests/chat.js";

// Mock HttpClient
const mockHttpClient = {
  request: vi.fn(),
} as unknown as HttpClient;

describe("ChatApi", () => {
  let chatApi: ChatApi;

  beforeEach(() => {
    chatApi = new ChatApi(mockHttpClient);
    vi.clearAllMocks();
  });

  describe("startChat", () => {
    it("should start chat successfully", async () => {
      const request: ChatStartRequest = {
        posting_number: "FBS-123456",
      };

      const expectedResponse = {
        result: {
          chat_id: "chat-123",
        },
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await chatApi.startChat(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/chat/start", request, undefined);
      expect(result).toEqual(expectedResponse);
    });

    it("should handle different posting numbers", async () => {
      const request: ChatStartRequest = {
        posting_number: "FBO-789123",
      };

      const expectedResponse = {
        result: {
          chat_id: "chat-456",
        },
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await chatApi.startChat(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/chat/start", request, undefined);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe("sendMessage", () => {
    it("should send message successfully", async () => {
      const request: ChatSendMessageRequest = {
        chat_id: "chat-123",
        text: "Здравствуйте! Когда ожидается доставка?",
      };

      const expectedResponse = {
        result: {
          message_id: "msg-123",
        },
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await chatApi.sendMessage(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/chat/send/message", request, undefined);
      expect(result).toEqual(expectedResponse);
    });

    it("should handle long messages", async () => {
      const request: ChatSendMessageRequest = {
        chat_id: "chat-123",
        text: "Это длинное сообщение для проверки лимитов. ".repeat(10),
      };

      const expectedResponse = {
        result: {
          message_id: "msg-456",
        },
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await chatApi.sendMessage(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/chat/send/message", request, undefined);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe("sendFile", () => {
    it("should send file successfully", async () => {
      const request: ChatSendFileRequest = {
        chat_id: "chat-123",
        base64_content: "base64_encoded_file_data",
        name: "document.pdf",
      };

      const expectedResponse = {
        result: {
          file_id: "file-123",
        },
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await chatApi.sendFile(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/chat/send/file", request, undefined);
      expect(result).toEqual(expectedResponse);
    });

    it("should send file without name", async () => {
      const request: ChatSendFileRequest = {
        chat_id: "chat-123",
        base64_content: "base64_encoded_image_data",
      };

      const expectedResponse = {
        result: {
          file_id: "file-456",
        },
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await chatApi.sendFile(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/chat/send/file", request, undefined);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe("markAsRead", () => {
    it("should mark messages as read successfully", async () => {
      const request: ChatReadRequest = {
        chat_id: "chat-123",
        from_message_id: 123,
      };

      const expectedResponse = {
        result: {
          success: true,
        },
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await chatApi.markAsRead(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v2/chat/read", request, undefined);
      expect(result).toEqual(expectedResponse);
    });

    it("should mark all messages as read", async () => {
      const request: ChatReadRequest = {
        chat_id: "chat-123",
      };

      const expectedResponse = {
        result: {
          success: true,
        },
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await chatApi.markAsRead(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v2/chat/read", request, undefined);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe("getChatHistoryV2", () => {
    it("should get chat history v2 successfully", async () => {
      const request: ChatHistoryV2Request = {
        chat_id: "chat-123",
        limit: 50,
      };

      const expectedResponse = {
        result: {
          messages: [
            {
              id: "msg-1",
              text: "Здравствуйте!",
              created_at: "2024-01-15T10:00:00Z",
              author: "SELLER",
            },
            {
              id: "msg-2",
              text: "Добрый день!",
              created_at: "2024-01-15T10:01:00Z",
              author: "CUSTOMER",
            },
          ],
        },
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await chatApi.getChatHistoryV2(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v2/chat/history", request, undefined);
      expect(result).toEqual(expectedResponse);
    });

    it("should get chat history v2 with direction", async () => {
      const request: ChatHistoryV2Request = {
        chat_id: "chat-123",
        limit: 25,
        direction: "Forward",
        from_message_id: 100,
      };

      const expectedResponse = {
        result: {
          messages: [],
        },
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await chatApi.getChatHistoryV2(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v2/chat/history", request, undefined);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe("getChatHistoryV3", () => {
    it("should get chat history v3 successfully", async () => {
      const request: ChatHistoryV3Request = {
        chat_id: "chat-123",
        limit: 100,
        direction: "Backward",
      };

      const expectedResponse = {
        result: {
          messages: [
            {
              id: "msg-1",
              text: "Enhanced message with v3 features",
              created_at: "2024-01-15T10:00:00Z",
              author: "SELLER",
              files: [],
            },
          ],
        },
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await chatApi.getChatHistoryV3(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v3/chat/history", request, undefined);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe("getChatListV2", () => {
    it("should get chat list v2 successfully", async () => {
      const request: ChatListV2Request = {
        limit: 30,
        offset: 0,
      };

      const expectedResponse = {
        result: {
          chats: [
            {
              chat_id: "chat-1",
              posting_number: "FBS-123",
              created_at: "2024-01-15T09:00:00Z",
              last_message_at: "2024-01-15T10:00:00Z",
              unread_count: 2,
            },
          ],
        },
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await chatApi.getChatListV2(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v2/chat/list", request, undefined);
      expect(result).toEqual(expectedResponse);
    });

    it("should get chat list v2 with filters", async () => {
      const request: ChatListV2Request = {
        limit: 50,
        offset: 100,
        filter: {},
      };

      const expectedResponse = {
        result: {
          chats: [],
        },
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await chatApi.getChatListV2(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v2/chat/list", request, undefined);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe("getChatListV3", () => {
    it("should get chat list v3 successfully", async () => {
      const request: ChatListV3Request = {
        limit: 30,
        cursor: "next-cursor",
      };

      const expectedResponse = {
        result: {
          chats: [
            {
              chat_id: "chat-1",
              posting_number: "FBS-123",
              created_at: "2024-01-15T09:00:00Z",
              last_message: {
                id: "msg-last",
                text: "Последнее сообщение",
                created_at: "2024-01-15T10:00:00Z",
                author: "CUSTOMER",
              },
              unread_count: 1,
            },
          ],
          next_cursor: "next-cursor-2",
        },
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await chatApi.getChatListV3(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v3/chat/list", request, undefined);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe("error handling", () => {
    it("should handle API errors", async () => {
      const request: ChatStartRequest = {
        posting_number: "INVALID-POST",
      };

      const error = new Error("Invalid posting number");
      (mockHttpClient.request as any).mockRejectedValue(error);

      await expect(chatApi.startChat(request)).rejects.toThrow("Invalid posting number");
    });

    it("should handle network errors", async () => {
      const request: ChatSendMessageRequest = {
        chat_id: "chat-123",
        text: "Test message",
      };

      const error = new Error("Network error");
      (mockHttpClient.request as any).mockRejectedValue(error);

      await expect(chatApi.sendMessage(request)).rejects.toThrow("Network error");
    });

    it("should handle Premium Plus subscription errors", async () => {
      const request: ChatListV2Request = {
        limit: 30,
      };

      const error = new Error("Premium Plus subscription required");
      (mockHttpClient.request as any).mockRejectedValue(error);

      await expect(chatApi.getChatListV2(request)).rejects.toThrow("Premium Plus subscription required");
    });
  });

  describe("request options", () => {
    it("should pass custom request options", async () => {
      const request: ChatStartRequest = {
        posting_number: "FBS-123",
      };

      const options = {
        timeout: 5000,
        retries: 2,
      };

      const expectedResponse = {
        result: {
          chat_id: "chat-123",
        },
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await chatApi.startChat(request, options);

      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/chat/start", request, options);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe("Premium Plus subscription requirements", () => {
    it("should work with Premium Plus subscription", async () => {
      const request: ChatHistoryV2Request = {
        chat_id: "chat-123",
        limit: 50,
      };

      const expectedResponse = {
        result: {
          messages: [
            {
              id: "msg-premium",
              text: "Premium feature message",
              created_at: "2024-01-15T10:00:00Z",
              author: "SELLER",
            },
          ],
        },
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await chatApi.getChatHistoryV2(request);

      expect(result).toEqual(expectedResponse);
    });

    it("should handle subscription restriction errors", async () => {
      const request: ChatHistoryV2Request = {
        chat_id: "chat-123",
        limit: 50,
      };

      const error = new Error("Premium Plus subscription required for chat features");
      (mockHttpClient.request as any).mockRejectedValue(error);

      await expect(chatApi.getChatHistoryV2(request)).rejects.toThrow("Premium Plus subscription required for chat features");
    });
  });
});
