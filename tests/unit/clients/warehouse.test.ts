/**
 * WarehouseAPI unit tests
 */

import { describe, it, expect, vi, beforeEach, type MockedFunction } from 'vitest';
import { WarehouseAPI } from '../../../src/clients/warehouse';
import type { HttpClient } from '../../../src/http/HttpClient';
import type { IHttpResponse } from '../../../src/http/types';
import type {
  IWarehouseListResponse,
  IWarehouseDeliveryMethodListRequest,
  IWarehouseDeliveryMethodListResponse,
  IWarehouseListResponseWarehouse,
  IDeliveryMethodListResponseDeliveryMethod
} from '../../../src/types/generated/warehouseapi';

describe('WarehouseAPI', () => {
  let mockHttpClient: {
    get: MockedFunction<HttpClient['get']>;
    post: MockedFunction<HttpClient['post']>;
    put: MockedFunction<HttpClient['put']>;
    delete: MockedFunction<HttpClient['delete']>;
  };
  let warehouseAPI: WarehouseAPI;

  beforeEach(() => {
    mockHttpClient = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
    };
    warehouseAPI = new WarehouseAPI(mockHttpClient as unknown as HttpClient);
  });

  describe('getWarehouseList', () => {
    it('should fetch warehouse list successfully', async () => {
      // Arrange
      const mockWarehouse: IWarehouseListResponseWarehouse = {
        warehouse_id: 15588127982000,
        name: 'Test Warehouse',
        status: 'created',
        is_rfbs: true,
        is_economy: false,
        has_entrusted_acceptance: true,
        can_print_act_in_advance: true,
        has_postings_limit: true,
        is_karantin: false,
        is_kgt: true,
        is_timetable_editable: true,
        min_postings_limit: 10,
        postings_limit: 100,
        min_working_days: 5,
        working_days: ['1', '2', '3', '4', '5'],
        first_mile_type: {
          first_mile_type: 'DropOff',
          dropoff_point_id: 'test-point-123',
          dropoff_timeslot_id: 456789,
          first_mile_is_changing: false
        }
      };

      const mockResponse: IHttpResponse<IWarehouseListResponse> = {
        data: {
          result: [mockWarehouse]
        },
        status: 200,
        headers: {},
        request: {}
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      // Act
      const result = await warehouseAPI.getWarehouseList();

      // Assert
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/warehouse/list', {});
      expect(result.data.result).toHaveLength(1);
      expect(result.data.result?.[0]).toEqual(mockWarehouse);
    });

    it('should handle empty warehouse list', async () => {
      // Arrange
      const mockResponse: IHttpResponse<IWarehouseListResponse> = {
        data: {
          result: []
        },
        status: 200,
        headers: {},
        request: {}
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      // Act
      const result = await warehouseAPI.getWarehouseList();

      // Assert
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/warehouse/list', {});
      expect(result.data.result).toEqual([]);
    });

    it('should handle undefined result', async () => {
      // Arrange
      const mockResponse: IHttpResponse<IWarehouseListResponse> = {
        data: {},
        status: 200,
        headers: {},
        request: {}
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      // Act
      const result = await warehouseAPI.getWarehouseList();

      // Assert
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/warehouse/list', {});
      expect(result.data.result).toBeUndefined();
    });

    it('should propagate network errors', async () => {
      // Arrange
      const error = new Error('Network error');
      mockHttpClient.post.mockRejectedValueOnce(error);

      // Act & Assert
      await expect(warehouseAPI.getWarehouseList()).rejects.toThrow('Network error');
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/warehouse/list', {});
    });
  });

  describe('getDeliveryMethodList', () => {
    it('should fetch delivery methods with basic filter', async () => {
      // Arrange
      const mockDeliveryMethod: IDeliveryMethodListResponseDeliveryMethod = {
        id: 15588127982000,
        company_id: 1,
        name: 'Ozon Логистика курьеру, Есипово',
        status: 'ACTIVE',
        cutoff: '13:00',
        provider_id: 24,
        template_id: 0,
        warehouse_id: 15588127982000,
        created_at: '2019-04-04T15:22:31.048202Z',
        updated_at: '2021-08-15T10:21:44.854209Z',
        sla_cut_in: 1440
      };

      const mockResponse: IHttpResponse<IWarehouseDeliveryMethodListResponse> = {
        data: {
          result: [mockDeliveryMethod],
          has_next: false
        },
        status: 200,
        headers: {},
        request: {}
      };

      const requestParams: IWarehouseDeliveryMethodListRequest = {
        filter: {
          warehouse_id: 15588127982000,
          status: 'ACTIVE'
        },
        limit: 50,
        offset: 0
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      // Act
      const result = await warehouseAPI.getDeliveryMethodList(requestParams);

      // Assert
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/delivery-method/list', requestParams);
      expect(result.data.result).toHaveLength(1);
      expect(result.data.result?.[0]).toEqual(mockDeliveryMethod);
      expect(result.data.has_next).toBe(false);
    });

    it('should fetch delivery methods with provider filter', async () => {
      // Arrange
      const requestParams: IWarehouseDeliveryMethodListRequest = {
        filter: {
          provider_id: 24,
          status: 'ACTIVE'
        },
        limit: 25
      };

      const mockResponse: IHttpResponse<IWarehouseDeliveryMethodListResponse> = {
        data: {
          result: [],
          has_next: false
        },
        status: 200,
        headers: {},
        request: {}
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      // Act
      const result = await warehouseAPI.getDeliveryMethodList(requestParams);

      // Assert
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/delivery-method/list', requestParams);
      expect(result.data.result).toEqual([]);
    });

    it('should handle pagination with has_next true', async () => {
      // Arrange
      const requestParams: IWarehouseDeliveryMethodListRequest = {
        limit: 10,
        offset: 20
      };

      const mockResponse: IHttpResponse<IWarehouseDeliveryMethodListResponse> = {
        data: {
          result: [],
          has_next: true
        },
        status: 200,
        headers: {},
        request: {}
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      // Act
      const result = await warehouseAPI.getDeliveryMethodList(requestParams);

      // Assert
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/delivery-method/list', requestParams);
      expect(result.data.has_next).toBe(true);
    });

    it('should handle filter with all fields', async () => {
      // Arrange
      const requestParams: IWarehouseDeliveryMethodListRequest = {
        filter: {
          warehouse_id: 123456,
          provider_id: 24,
          status: 'DISABLED'
        },
        limit: 50,
        offset: 100
      };

      const mockResponse: IHttpResponse<IWarehouseDeliveryMethodListResponse> = {
        data: {
          result: [],
          has_next: false
        },
        status: 200,
        headers: {},
        request: {}
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      // Act
      const result = await warehouseAPI.getDeliveryMethodList(requestParams);

      // Assert
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/delivery-method/list', requestParams);
      expect(result.data.result).toEqual([]);
    });

    it('should handle request without filter', async () => {
      // Arrange
      const requestParams: IWarehouseDeliveryMethodListRequest = {
        limit: 25
      };

      const mockResponse: IHttpResponse<IWarehouseDeliveryMethodListResponse> = {
        data: {
          result: [],
          has_next: false
        },
        status: 200,
        headers: {},
        request: {}
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      // Act
      await warehouseAPI.getDeliveryMethodList(requestParams);

      // Assert
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/delivery-method/list', requestParams);
    });

    it('should propagate API errors', async () => {
      // Arrange
      const error = new Error('API Error');
      const requestParams: IWarehouseDeliveryMethodListRequest = {
        limit: 50
      };

      mockHttpClient.post.mockRejectedValueOnce(error);

      // Act & Assert
      await expect(warehouseAPI.getDeliveryMethodList(requestParams)).rejects.toThrow('API Error');
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/delivery-method/list', requestParams);
    });
  });

  describe('API endpoint validation', () => {
    it('should use correct endpoint for warehouse list', async () => {
      // Arrange
      const mockResponse: IHttpResponse<IWarehouseListResponse> = {
        data: { result: [] },
        status: 200,
        headers: {},
        request: {}
      };
      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      // Act
      await warehouseAPI.getWarehouseList();

      // Assert
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/warehouse/list', {});
    });

    it('should use correct endpoint for delivery method list', async () => {
      // Arrange
      const mockResponse: IHttpResponse<IWarehouseDeliveryMethodListResponse> = {
        data: { result: [] },
        status: 200,
        headers: {},
        request: {}
      };
      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const params: IWarehouseDeliveryMethodListRequest = { limit: 10 };

      // Act
      await warehouseAPI.getDeliveryMethodList(params);

      // Assert
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/delivery-method/list', params);
    });
  });
});