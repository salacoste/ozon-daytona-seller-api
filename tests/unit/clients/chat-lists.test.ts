/**
 * Unit tests for ChatAPI list functionality
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { ChatAPI } from '../../../src/clients/chat';
import { createMockHttpClient } from '../../mocks';

describe('ChatAPI Lists', () => {
  let chatApi: ChatAPI;
  let mockHttpClient: ReturnType<typeof createMockHttpClient>;

  beforeEach(() => {
    mockHttpClient = createMockHttpClient();
    chatApi = new ChatAPI(mockHttpClient);
  });

  describe('listChatsV2', () => {
    it('should call list chats V2 endpoint with correct parameters', async () => {
      const params = {
        filter: {
          chat_status: 'Opened' as const,
          unread_only: true
        },
        limit: 30,
        offset: 0
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          chats: [
            {
              chat_id: '5e767w03-b400-4y1b-a841-75319ca8a5c8',
              chat_status: 'Opened',
              chat_type: 'Seller_Support',
              created_at: '2022-07-22T08:07:19.581Z',
              first_unread_message_id: '3000000000118021931',
              last_message_id: '30000000001280042740',
              unread_count: 1
            }
          ],
          total_chats_count: 25,
          total_unread_count: 5
        }
      };

      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await chatApi.listChatsV2(params);

      expect(result).toEqual(mockResponse);
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v2/chat/list', params);
    });

    it('should work with minimal required parameters', async () => {
      const params = {
        limit: 50
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          chats: [],
          total_chats_count: 0,
          total_unread_count: 0
        }
      };

      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await chatApi.listChatsV2(params);

      expect(result).toEqual(mockResponse);
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v2/chat/list', params);
    });

    it('should handle different chat statuses', async () => {
      const statuses = ['All', 'Opened', 'Closed'] as const;

      for (const status of statuses) {
        const params = {
          filter: { chat_status: status },
          limit: 10
        };

        const mockResponse = {
          status: 200,
          statusText: 'OK',
          headers: {},
          data: {
            chats: [],
            total_chats_count: 0,
            total_unread_count: 0
          }
        };

        mockHttpClient.post.mockResolvedValue(mockResponse);

        await chatApi.listChatsV2(params);

        expect(mockHttpClient.post).toHaveBeenCalledWith('/v2/chat/list', params);
      }
    });
  });

  describe('listChatsV3', () => {
    it('should call list chats V3 endpoint with correct parameters', async () => {
      const params = {
        filter: {
          chat_status: 'Opened' as const,
          unread_only: true
        },
        limit: 30,
        cursor: '304000402034'
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          chats: [
            {
              chat: {
                created_at: '2022-07-22T08:07:19.581Z',
                chat_id: '5e767w03-b400-4y1b-a841-75319ca8a5c8',
                chat_status: 'Opened',
                chat_type: 'Seller_Support'
              },
              first_unread_message_id: '3000000000118021931',
              last_message_id: '30000000001280042740',
              unread_count: 1
            }
          ],
          total_unread_count: 5,
          cursor: '30000002342123123',
          has_next: true
        }
      };

      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await chatApi.listChatsV3(params);

      expect(result).toEqual(mockResponse);
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v3/chat/list', params);
    });

    it('should handle pagination with cursor', async () => {
      const params = {
        limit: 10,
        cursor: 'next-page-cursor'
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          chats: [],
          total_unread_count: 0,
          cursor: 'final-cursor',
          has_next: false
        }
      };

      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await chatApi.listChatsV3(params);

      expect(result.data.has_next).toBe(false);
      expect(result.data.cursor).toBe('final-cursor');
    });

    it('should handle unread only filter', async () => {
      const params = {
        filter: { unread_only: true },
        limit: 25
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          chats: [
            {
              chat: {
                chat_id: 'unread-chat-id',
                chat_status: 'Opened',
                chat_type: 'Buyer_Seller'
              },
              unread_count: 5
            }
          ],
          total_unread_count: 5,
          has_next: false
        }
      };

      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await chatApi.listChatsV3(params);

      expect(result.data.total_unread_count).toBe(5);
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v3/chat/list', params);
    });
  });
});