/**
 * Unit tests for ChatAPI messaging functionality
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { ChatAPI } from '../../../src/clients/chat';
import { createMockHttpClient } from '../../mocks';

describe('ChatAPI Messaging', () => {
  let chatApi: ChatAPI;
  let mockHttpClient: ReturnType<typeof createMockHttpClient>;

  beforeEach(() => {
    mockHttpClient = createMockHttpClient();
    chatApi = new ChatAPI(mockHttpClient);
  });

  describe('sendMessageV1', () => {
    it('should call send message endpoint with correct parameters', async () => {
      const params = {
        chat_id: '99feb3fc-a474-469f-95d5-268b470cc607',
        text: 'Hello! Thank you for your question about the product.'
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: 'success'
        }
      };

      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await chatApi.sendMessageV1(params);

      expect(result).toEqual(mockResponse);
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/chat/send/message', params);
    });

    it('should handle long messages (up to 1000 chars)', async () => {
      const params = {
        chat_id: '99feb3fc-a474-469f-95d5-268b470cc607',
        text: 'A'.repeat(1000) // Maximum allowed length
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: { result: 'success' }
      };

      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await chatApi.sendMessageV1(params);

      expect(result).toEqual(mockResponse);
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/chat/send/message', params);
    });

    it('should handle Premium Plus access errors', async () => {
      const params = {
        chat_id: '99feb3fc-a474-469f-95d5-268b470cc607',
        text: 'Test message'
      };

      const mockResponse = {
        status: 403,
        statusText: 'Forbidden',
        headers: {},
        data: {
          code: 7,
          message: 'Premium Plus subscription required',
          details: []
        }
      };

      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await chatApi.sendMessageV1(params);

      expect(result.status).toBe(403);
      expect(result.data.message).toBe('Premium Plus subscription required');
    });

    it('should handle special characters in chat messages', async () => {
      const params = {
        chat_id: '99feb3fc-a474-469f-95d5-268b470cc607',
        text: 'Привет! Это сообщение с эмодзи: 😊 и специальными символами: & < > " \''
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: { result: 'success' }
      };

      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await chatApi.sendMessageV1(params);

      expect(result).toEqual(mockResponse);
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/chat/send/message', params);
    });
  });

  describe('sendFileV1', () => {
    it('should call send file endpoint with correct parameters', async () => {
      const params = {
        chat_id: '99feb3fc-a474-469f-95d5-268b470cc607',
        base64_content: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=',
        name: 'product-image.png'
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: 'success'
        }
      };

      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await chatApi.sendFileV1(params);

      expect(result).toEqual(mockResponse);
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/chat/send/file', params);
    });

    it('should work with minimal required parameters', async () => {
      const params = {
        chat_id: '99feb3fc-a474-469f-95d5-268b470cc607'
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: { result: 'success' }
      };

      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await chatApi.sendFileV1(params);

      expect(result).toEqual(mockResponse);
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/chat/send/file', params);
    });
  });

  describe('startChatV1', () => {
    it('should call start chat endpoint with correct parameters', async () => {
      const params = {
        posting_number: '47873153-0052-1'
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            chat_id: '5969c331-2e64-44b7-8a0e-ff9526762c62'
          }
        }
      };

      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await chatApi.startChatV1(params);

      expect(result).toEqual(mockResponse);
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/chat/start', params);
    });
  });

  describe('markChatReadV2', () => {
    it('should call mark chat read endpoint with correct parameters', async () => {
      const params = {
        chat_id: '99feb3fc-a474-469f-95d5-268b470cc607',
        from_message_id: '3000000000118032000'
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          unread_count: 2
        }
      };

      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await chatApi.markChatReadV2(params);

      expect(result).toEqual(mockResponse);
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v2/chat/read', params);
    });

    it('should work with minimal required parameters', async () => {
      const params = {
        chat_id: '99feb3fc-a474-469f-95d5-268b470cc607'
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          unread_count: 0
        }
      };

      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await chatApi.markChatReadV2(params);

      expect(result).toEqual(mockResponse);
      expect(result.data.unread_count).toBe(0);
    });
  });

  describe('Error Handling', () => {
    it('should handle API errors gracefully', async () => {
      const mockError = new Error('API Error');
      mockHttpClient.post.mockRejectedValue(mockError);

      await expect(
        chatApi.sendMessageV1({
          chat_id: '99feb3fc-a474-469f-95d5-268b470cc607',
          text: 'Test message'
        })
      ).rejects.toThrow('API Error');
    });

    it('should handle network timeouts', async () => {
      const timeoutError = new Error('Request timeout');
      timeoutError.name = 'TimeoutError';
      mockHttpClient.post.mockRejectedValue(timeoutError);

      await expect(
        chatApi.sendFileV1({
          chat_id: '99feb3fc-a474-469f-95d5-268b470cc607'
        })
      ).rejects.toThrow('Request timeout');
    });
  });
});