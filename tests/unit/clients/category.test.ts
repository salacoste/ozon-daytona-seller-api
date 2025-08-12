/**
 * Unit tests for CategoryAPI
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CategoryAPI } from '../../../src/clients/category';
import { createMockHttpClient } from '../../mocks';

describe('CategoryAPI', () => {
  let categoryApi: CategoryAPI;
  let mockHttpClient: ReturnType<typeof createMockHttpClient>;

  beforeEach(() => {
    mockHttpClient = createMockHttpClient();
    categoryApi = new CategoryAPI(mockHttpClient);
  });

  describe('getTreeV1', () => {
    it('should call category tree endpoint with default language', async () => {
      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: [
            {
              description_category_id: 17027492,
              category_name: 'Канцелярские товары',
              disabled: false,
              children: [
                {
                  description_category_id: 17029016,
                  category_name: 'Печати и штампы',
                  disabled: false,
                  children: [
                    {
                      type_name: 'Пистолет-маркиратор',
                      type_id: 970778135,
                      disabled: false,
                      children: []
                    }
                  ]
                }
              ]
            }
          ]
        }
      };

      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await categoryApi.getTreeV1();

      expect(result).toEqual(mockResponse);
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/description-category/tree', {
        language: 'DEFAULT'
      });
    });

    it('should support custom language parameter', async () => {
      const params = { language: 'RU' as const };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: []
        }
      };

      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await categoryApi.getTreeV1(params);

      expect(result).toEqual(mockResponse);
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/description-category/tree', {
        language: 'RU'
      });
    });

    it('should handle empty tree response', async () => {
      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: []
        }
      };

      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await categoryApi.getTreeV1();

      expect(result).toEqual(mockResponse);
      expect(result.data.result).toHaveLength(0);
    });
  });

  describe('getAttributesV1', () => {
    it('should call attributes endpoint with correct parameters', async () => {
      const params = {
        description_category_id: 200000933,
        type_id: 93080,
        language: 'DEFAULT' as const
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: [
            {
              id: 31,
              attribute_complex_id: 0,
              name: 'Бренд в одежде и обуви',
              description: 'Укажите наименование бренда',
              type: 'string',
              is_collection: false,
              is_required: true,
              is_aspect: false,
              max_value_count: 0,
              group_name: '',
              group_id: 0,
              dictionary_id: 28732849,
              category_dependent: true,
              complex_is_collection: true
            }
          ]
        }
      };

      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await categoryApi.getAttributesV1(params);

      expect(result).toEqual(mockResponse);
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/description-category/attribute', params);
    });

    it('should work with minimal required parameters', async () => {
      const params = {
        description_category_id: 200000933,
        type_id: 93080
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: []
        }
      };

      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await categoryApi.getAttributesV1(params);

      expect(result).toEqual(mockResponse);
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/description-category/attribute', {
        ...params,
        language: 'DEFAULT'
      });
    });

    it('should handle attributes with different dictionary_id values', async () => {
      const params = {
        description_category_id: 200000933,
        type_id: 93080
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: [
            {
              id: 1,
              name: 'No Dictionary Attribute',
              dictionary_id: 0, // No dictionary
              is_required: false,
              attribute_complex_id: 0,
              description: '',
              type: 'string',
              is_collection: false,
              is_aspect: false,
              max_value_count: 0,
              group_name: '',
              group_id: 0,
              category_dependent: false,
              complex_is_collection: false
            },
            {
              id: 2,
              name: 'With Dictionary Attribute',
              dictionary_id: 12345, // Has dictionary
              is_required: true,
              attribute_complex_id: 0,
              description: '',
              type: 'string',
              is_collection: false,
              is_aspect: false,
              max_value_count: 0,
              group_name: '',
              group_id: 0,
              category_dependent: true,
              complex_is_collection: false
            }
          ]
        }
      };

      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await categoryApi.getAttributesV1(params);

      expect(result.data.result[0].dictionary_id).toBe(0);
      expect(result.data.result[1].dictionary_id).toBe(12345);
    });
  });

  describe('getAttributeValuesV1', () => {
    it('should call attribute values endpoint with correct parameters', async () => {
      const params = {
        attribute_id: 85,
        description_category_id: 17054869,
        type_id: 97311,
        limit: 100
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: [
            {
              id: 5055881,
              value: 'Sunshine',
              info: '',
              picture: 'https://cdn1.ozone.ru/s3/multimedia-i/6010930878.jpg'
            },
            {
              id: 5056737,
              value: 'Essence',
              info: 'Красота и здоровье',
              picture: 'https://cdn1.ozone.ru/s3/multimedia-v/6088253599.jpg'
            }
          ],
          has_next: true
        }
      };

      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await categoryApi.getAttributeValuesV1(params);

      expect(result).toEqual(mockResponse);
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/description-category/attribute/values', {
        ...params,
        language: 'DEFAULT'
      });
    });

    it('should support pagination with last_value_id', async () => {
      const params = {
        attribute_id: 85,
        description_category_id: 17054869,
        type_id: 97311,
        last_value_id: 971082156,
        limit: 50
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: [
            {
              id: 971082158,
              value: 'Puma'
            }
          ],
          has_next: false
        }
      };

      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await categoryApi.getAttributeValuesV1(params);

      expect(result).toEqual(mockResponse);
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/description-category/attribute/values', {
        ...params,
        language: 'DEFAULT'
      });
    });

    it('should handle empty values response', async () => {
      const params = {
        attribute_id: 999,
        description_category_id: 17054869,
        type_id: 97311,
        limit: 10
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: [],
          has_next: false
        }
      };

      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await categoryApi.getAttributeValuesV1(params);

      expect(result).toEqual(mockResponse);
      expect(result.data.result).toHaveLength(0);
      expect(result.data.has_next).toBe(false);
    });
  });

  describe('searchAttributeValuesV1', () => {
    it('should call search endpoint with correct parameters', async () => {
      const params = {
        attribute_id: 85,
        description_category_id: 17054869,
        type_id: 97311,
        value: 'Nike',
        limit: 50
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: [
            {
              id: 5055881,
              value: 'Sunshine Brand',
              info: 'Поиск по слову "Nike"'
            },
            {
              id: 5056737,
              value: 'Nike Essential',
              info: 'Найдено по запросу'
            }
          ]
        }
      };

      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await categoryApi.searchAttributeValuesV1(params);

      expect(result).toEqual(mockResponse);
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/description-category/attribute/values/search', {
        ...params,
        language: 'DEFAULT'
      });
    });

    it('should work with minimal required parameters', async () => {
      const params = {
        attribute_id: 85,
        description_category_id: 17054869,
        type_id: 97311,
        value: 'Test',
        limit: 100
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: []
        }
      };

      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await categoryApi.searchAttributeValuesV1(params);

      expect(result).toEqual(mockResponse);
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/description-category/attribute/values/search', {
        ...params,
        language: 'DEFAULT'
      });
    });

    it('should handle search with no results', async () => {
      const params = {
        attribute_id: 85,
        description_category_id: 17054869,
        type_id: 97311,
        value: 'NonExistentBrand',
        limit: 50
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: []
        }
      };

      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await categoryApi.searchAttributeValuesV1(params);

      expect(result).toEqual(mockResponse);
      expect(result.data.result).toHaveLength(0);
    });
  });

  describe('Error Handling', () => {
    it('should handle API errors gracefully', async () => {
      const mockError = new Error('API Error');
      mockHttpClient.post.mockRejectedValue(mockError);

      await expect(categoryApi.getTreeV1()).rejects.toThrow('API Error');
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/description-category/tree', {
        language: 'DEFAULT'
      });
    });

    it('should handle invalid category/type parameters', async () => {
      const params = {
        description_category_id: -1,
        type_id: -1
      };

      const mockResponse = {
        status: 400,
        statusText: 'Bad Request',
        headers: {},
        data: {
          code: 3,
          message: 'Invalid category or type ID',
          details: []
        }
      };

      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await categoryApi.getAttributesV1(params);

      expect(result.status).toBe(400);
      expect(result.data.message).toBe('Invalid category or type ID');
    });

    it('should handle network timeouts', async () => {
      const timeoutError = new Error('Request timeout');
      timeoutError.name = 'TimeoutError';
      mockHttpClient.post.mockRejectedValue(timeoutError);

      await expect(
        categoryApi.getAttributeValuesV1({
          attribute_id: 85,
          description_category_id: 17054869,
          type_id: 97311,
          limit: 100
        })
      ).rejects.toThrow('Request timeout');
    });
  });

  describe('Input Validation Edge Cases', () => {
    it('should handle different language options', async () => {
      const languages = ['DEFAULT', 'RU', 'EN', 'TR', 'ZH_HANS'] as const;

      for (const language of languages) {
        const mockResponse = {
          status: 200,
          statusText: 'OK',
          headers: {},
          data: { result: [] }
        };

        mockHttpClient.post.mockResolvedValue(mockResponse);

        await categoryApi.getTreeV1({ language });

        expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/description-category/tree', {
          language
        });
      }
    });

    it('should handle large limit values in pagination', async () => {
      const params = {
        attribute_id: 85,
        description_category_id: 17054869,
        type_id: 97311,
        limit: 10000
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: [],
          has_next: false
        }
      };

      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await categoryApi.getAttributeValuesV1(params);

      expect(result.status).toBe(200);
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/description-category/attribute/values', {
        ...params,
        language: 'DEFAULT'
      });
    });

    it('should handle special characters in search values', async () => {
      const params = {
        attribute_id: 85,
        description_category_id: 17054869,
        type_id: 97311,
        value: 'Test & Special "Characters" 123',
        limit: 50
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: []
        }
      };

      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await categoryApi.searchAttributeValuesV1(params);

      expect(result).toEqual(mockResponse);
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/description-category/attribute/values/search', {
        ...params,
        language: 'DEFAULT'
      });
    });
  });
});