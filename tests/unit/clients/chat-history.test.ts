/**
 * Unit tests for ChatAPI history functionality
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { ChatAPI } from '../../../src/clients/chat';
import { createMockHttpClient } from '../../mocks';

describe('ChatAPI History', () => {
  let chatApi: ChatAPI;
  let mockHttpClient: ReturnType<typeof createMockHttpClient>;

  beforeEach(() => {
    mockHttpClient = createMockHttpClient();
    chatApi = new ChatAPI(mockHttpClient);
  });

  describe('getChatHistoryV2', () => {
    it('should call chat history V2 endpoint with correct parameters', async () => {
      const params = {
        chat_id: '18b8e1f9-4ae7-461c-84ea-8e1f54d1a45e',
        direction: 'Forward' as const,
        from_message_id: '3000000000118032000',
        limit: 20
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          has_next: true,
          messages: [
            {
              message_id: '3000000000817031942',
              user: {
                id: '115568',
                type: 'customer'
              },
              created_at: '2022-07-18T20:58:04.528Z',
              is_read: true,
              data: [
                'Hello, I have a question about your product "Screen protector", article 11223.'
              ]
            }
          ]
        }
      };

      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await chatApi.getChatHistoryV2(params);

      expect(result).toEqual(mockResponse);
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v2/chat/history', params);
    });

    it('should work with minimal required parameters', async () => {
      const params = {
        chat_id: '18b8e1f9-4ae7-461c-84ea-8e1f54d1a45e',
        limit: 50
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          has_next: false,
          messages: []
        }
      };

      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await chatApi.getChatHistoryV2(params);

      expect(result).toEqual(mockResponse);
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v2/chat/history', params);
    });

    it('should handle different message directions', async () => {
      const directions = ['Forward', 'Backward'] as const;

      for (const direction of directions) {
        const params = {
          chat_id: '18b8e1f9-4ae7-461c-84ea-8e1f54d1a45e',
          direction,
          limit: 10
        };

        const mockResponse = {
          status: 200,
          statusText: 'OK',
          headers: {},
          data: { has_next: false, messages: [] }
        };

        mockHttpClient.post.mockResolvedValue(mockResponse);

        await chatApi.getChatHistoryV2(params);

        expect(mockHttpClient.post).toHaveBeenCalledWith('/v2/chat/history', params);
      }
    });
  });

  describe('getChatHistoryV3', () => {
    it('should call chat history V3 endpoint with correct parameters', async () => {
      const params = {
        chat_id: '18b8e1f9-4ae7-461c-84ea-8e1f54d1a45e',
        direction: 'Backward' as const,
        filter: {
          message_ids: ['3000000300211559667']
        },
        from_message_id: '3000000000118032000',
        limit: 20
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          has_next: true,
          messages: [
            {
              context: {
                order_number: '123456789',
                sku: '987654321'
              },
              created_at: '2019-08-24T14:15:22Z',
              data: [
                'Hello, I have a question about your product "Screen protector", article 11223.'
              ],
              is_image: false,
              is_read: true,
              message_id: '3000000000817031942',
              moderate_image_status: 'SUCCESS',
              user: {
                id: '115568',
                type: 'customer'
              }
            }
          ]
        }
      };

      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await chatApi.getChatHistoryV3(params);

      expect(result).toEqual(mockResponse);
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v3/chat/history', params);
    });

    it('should handle image messages with moderation status', async () => {
      const params = {
        chat_id: '18b8e1f9-4ae7-461c-84ea-8e1f54d1a45e'
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          has_next: false,
          messages: [
            {
              created_at: '2019-08-24T14:15:22Z',
              data: ['Image message'],
              is_image: true,
              is_read: false,
              message_id: '3000000000817031943',
              moderate_image_status: 'MODERATION',
              user: {
                id: '115568',
                type: 'customer'
              }
            }
          ]
        }
      };

      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await chatApi.getChatHistoryV3(params);

      expect(result.data.messages?.[0].is_image).toBe(true);
      expect(result.data.messages?.[0].moderate_image_status).toBe('MODERATION');
    });

    it('should handle message context information', async () => {
      const params = {
        chat_id: '18b8e1f9-4ae7-461c-84ea-8e1f54d1a45e',
        limit: 10
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          has_next: false,
          messages: [
            {
              context: {
                order_number: '987654321',
                sku: '123456789'
              },
              created_at: '2019-08-24T14:15:22Z',
              data: ['Message with context'],
              is_image: false,
              is_read: true,
              message_id: '3000000000817031944',
              user: {
                id: '115568',
                type: 'customer'
              }
            }
          ]
        }
      };

      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await chatApi.getChatHistoryV3(params);

      const message = result.data.messages?.[0];
      expect(message?.context?.order_number).toBe('987654321');
      expect(message?.context?.sku).toBe('123456789');
    });

    it('should handle filter by message IDs', async () => {
      const params = {
        chat_id: '18b8e1f9-4ae7-461c-84ea-8e1f54d1a45e',
        filter: {
          message_ids: ['3000000300211559667', '3000000300211559668']
        },
        limit: 5
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          has_next: false,
          messages: [
            {
              message_id: '3000000300211559667',
              data: ['Filtered message'],
              user: { id: '115568', type: 'customer' }
            }
          ]
        }
      };

      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await chatApi.getChatHistoryV3(params);

      expect(result.data.messages?.[0].message_id).toBe('3000000300211559667');
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v3/chat/history', params);
    });
  });

  describe('Error Handling', () => {
    it('should handle chat not found errors', async () => {
      const mockResponse = {
        status: 404,
        statusText: 'Not Found',
        headers: {},
        data: {
          code: 5,
          message: 'Chat not found',
          details: []
        }
      };

      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await chatApi.getChatHistoryV3({
        chat_id: 'non-existent-chat-id'
      });

      expect(result.status).toBe(404);
      expect(result.data.message).toBe('Chat not found');
    });

    it('should handle network timeouts', async () => {
      const timeoutError = new Error('Request timeout');
      timeoutError.name = 'TimeoutError';
      mockHttpClient.post.mockRejectedValue(timeoutError);

      await expect(
        chatApi.getChatHistoryV2({
          chat_id: '18b8e1f9-4ae7-461c-84ea-8e1f54d1a45e',
          limit: 10
        })
      ).rejects.toThrow('Request timeout');
    });
  });
});