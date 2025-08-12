/**
 * Unit tests for FboSupplyRequestAPI
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { FboSupplyRequestAPI } from '../../../src/clients/fboSupplyRequest/FboSupplyRequestAPI';
import { createMockHttpClient } from '../../mocks';

describe('FboSupplyRequestAPI', () => {
  let fboSupplyRequestApi: FboSupplyRequestAPI;
  let mockHttpClient: ReturnType<typeof createMockHttpClient>;

  beforeEach(() => {
    mockHttpClient = createMockHttpClient();
    fboSupplyRequestApi = new FboSupplyRequestAPI(mockHttpClient);
  });

  describe('Draft Operations (Endpoints 1-5)', () => {
    it('should get cluster list', async () => {
      const params = {
        cluster_type: 'CLUSTER_TYPE_OZON' as const,
        cluster_ids: ['1', '2'],
      };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          clusters: [
            { id: 1, name: 'Moscow Cluster', type: 'CLUSTER_TYPE_OZON' },
            { id: 2, name: 'SPb Cluster', type: 'CLUSTER_TYPE_OZON' },
          ],
        },
      });

      const result = await fboSupplyRequestApi.getClusterList(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/cluster/list', params);
      expect(result.status).toBe(200);
      expect(result.data.clusters).toHaveLength(2);
    });

    it('should get warehouse FBO list', async () => {
      const params = {
        filter_by_supply_type: ['CREATE_TYPE_CROSSDOCK' as const],
        search: 'Moscow',
      };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          warehouses: [
            { warehouse_id: 22204339479000, name: 'Moscow Warehouse', type: 'CROSS_DOCK' },
          ],
        },
      });

      const result = await fboSupplyRequestApi.getWarehouseFboList(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/warehouse/fbo/list', params);
      expect(result.status).toBe(200);
      expect(result.data.warehouses).toHaveLength(1);
    });

    it('should create draft', async () => {
      const params = {
        warehouse_id: 22204339479000,
        cluster_id: '1',
        supply_type: 'CREATE_TYPE_CROSSDOCK' as const,
        items: [{ sku: 12345, quantity: 10 }],
      };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          draft_id: 'draft-123',
          status: 'created',
        },
      });

      const result = await fboSupplyRequestApi.createDraft(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/draft/create', params);
      expect(result.status).toBe(200);
      expect(result.data.draft_id).toBe('draft-123');
    });

    it('should get draft create info', async () => {
      const params = { draft_id: 'draft-123' };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          draft_id: 'draft-123',
          status: 'ready',
          calculation_status: 'CALCULATION_STATUS_SUCCESS',
        },
      });

      const result = await fboSupplyRequestApi.getDraftCreateInfo(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/draft/create/info', params);
      expect(result.status).toBe(200);
      expect(result.data.draft_id).toBe('draft-123');
    });

    it('should get draft timeslot info', async () => {
      const params = { draft_id: 'draft-123', warehouse_id: 22204339479000 };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          draft_id: 'draft-123',
          days: [
            {
              date: '2024-02-01',
              time_slots: [
                { time_from: '09:00', time_to: '12:00', available: true },
              ],
            },
          ],
        },
      });

      const result = await fboSupplyRequestApi.getDraftTimeslotInfo(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/draft/timeslot/info', params);
      expect(result.status).toBe(200);
      expect(result.data.days).toHaveLength(1);
    });
  });

  describe('Supply Operations (Endpoints 6-7)', () => {
    it('should create supply', async () => {
      const params = {
        draft_id: 'draft-123',
        timeslot_id: 'slot-456',
      };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          request_id: 'req-789',
          supply_id: 'supply-123',
        },
      });

      const result = await fboSupplyRequestApi.createSupply(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/draft/supply/create', params);
      expect(result.status).toBe(200);
      expect(result.data.request_id).toBe('req-789');
    });

    it('should get supply create status', async () => {
      const params = { request_id: 'req-789' };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          request_id: 'req-789',
          status: 'DraftSupplyCreateStatusSuccess',
          result: { supply_id: 'supply-123' },
        },
      });

      const result = await fboSupplyRequestApi.getSupplyCreateStatus(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/draft/supply/create/status', params);
      expect(result.status).toBe(200);
      expect(result.data.status).toBe('DraftSupplyCreateStatusSuccess');
    });
  });

  describe('Cargoes Operations (Endpoints 8-15)', () => {
    it('should create cargoes', async () => {
      const params = {
        supply_id: 'supply-123',
        cargoes: [
          {
            cargo_type: 'BOX' as const,
            items: [{ sku: 12345, quantity: 5 }],
          },
        ],
      };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          request_id: 'req-456',
          cargo_ids: ['cargo-123'],
        },
      });

      const result = await fboSupplyRequestApi.createCargoes(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/cargoes/create', params);
      expect(result.status).toBe(200);
      expect(result.data.request_id).toBe('req-456');
    });

    it('should get cargoes create info', async () => {
      const params = { request_id: 'req-456' };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          request_id: 'req-456',
          status: 'SUCCESS',
          result: {
            cargoes: [{ cargo_id: 'cargo-123', cargo_type: 'BOX' }],
          },
        },
      });

      const result = await fboSupplyRequestApi.getCargoesCreateInfo(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/cargoes/create/info', params);
      expect(result.status).toBe(200);
      expect(result.data.status).toBe('SUCCESS');
    });

    it('should delete cargoes', async () => {
      const params = { cargo_ids: ['cargo-123'] };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          request_id: 'req-delete-123',
          deleted_cargo_ids: ['cargo-123'],
        },
      });

      const result = await fboSupplyRequestApi.deleteCargoes(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/cargoes/delete', params);
      expect(result.status).toBe(200);
      expect(result.data.request_id).toBe('req-delete-123');
    });

    it('should get cargoes delete status', async () => {
      const params = { request_id: 'req-delete-123' };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          request_id: 'req-delete-123',
          status: 'SUCCESS',
          deleted_cargo_ids: ['cargo-123'],
        },
      });

      const result = await fboSupplyRequestApi.getCargoesDeleteStatus(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/cargoes/delete/status', params);
      expect(result.status).toBe(200);
      expect(result.data.status).toBe('SUCCESS');
    });

    it('should get cargoes rules', async () => {
      const params = { supply_id: 'supply-123' };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          supply_check: {
            cargo_present: { min_cargo_count: 1 },
            is_valid_distribution: { is_valid: true },
          },
        },
      });

      const result = await fboSupplyRequestApi.getCargoesRules(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/cargoes/rules/get', params);
      expect(result.status).toBe(200);
      expect(result.data.supply_check).toBeDefined();
    });

    it('should create cargoes label', async () => {
      const params = {
        cargoes: ['cargo-123', 'cargo-456'],
        label_format: 'PDF',
      };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          request_id: 'req-label-123',
          task_id: 'task-456',
        },
      });

      const result = await fboSupplyRequestApi.createCargoesLabel(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/cargoes-label/create', params);
      expect(result.status).toBe(200);
      expect(result.data.request_id).toBe('req-label-123');
    });

    it('should get cargoes label', async () => {
      const params = { request_id: 'req-label-123' };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          request_id: 'req-label-123',
          status: 'SUCCESS',
          result: {
            file_guid: 'file-guid-789',
            file_url: 'https://example.com/file.pdf',
          },
        },
      });

      const result = await fboSupplyRequestApi.getCargoesLabel(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/cargoes-label/get', params);
      expect(result.status).toBe(200);
      expect(result.data.status).toBe('SUCCESS');
    });

    it('should get cargoes label file', async () => {
      const fileGuid = 'file-guid-789';

      mockHttpClient.get.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: { 'content-type': 'application/pdf' },
        data: new ArrayBuffer(1024), // Mock PDF data
      });

      const result = await fboSupplyRequestApi.getCargoesLabelFile(fileGuid);

      expect(mockHttpClient.get).toHaveBeenCalledWith('/v1/cargoes-label/file/file-guid-789');
      expect(result.status).toBe(200);
      expect(result.data).toBeInstanceOf(ArrayBuffer);
    });
  });

  describe('Supply Order Operations (Endpoints 16-19)', () => {
    it('should cancel supply order', async () => {
      const params = {
        supply_order_id: 123456,
        reason: 'Changed plans',
      };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          request_id: 'req-cancel-123',
          supply_order_id: 123456,
        },
      });

      const result = await fboSupplyRequestApi.cancelSupplyOrder(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/supply-order/cancel', params);
      expect(result.status).toBe(200);
      expect(result.data.request_id).toBe('req-cancel-123');
    });

    it('should get supply order cancel status', async () => {
      const params = { request_id: 'req-cancel-123' };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          request_id: 'req-cancel-123',
          status: 'SUCCESS',
          result: {
            cancelled_supply_ids: ['supply-123'],
          },
        },
      });

      const result = await fboSupplyRequestApi.getSupplyOrderCancelStatus(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/supply-order/cancel/status', params);
      expect(result.status).toBe(200);
      expect(result.data.status).toBe('SUCCESS');
    });

    it('should update supply order content', async () => {
      const params = {
        supply_order_id: 123456,
        items: [
          { sku: 12345, quantity: 15 },
          { sku: 67890, quantity: 5 },
        ],
      };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          request_id: 'req-update-123',
          supply_order_id: 123456,
        },
      });

      const result = await fboSupplyRequestApi.updateSupplyOrderContent(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/supply-order/content/update', params);
      expect(result.status).toBe(200);
      expect(result.data.request_id).toBe('req-update-123');
    });

    it('should get supply order content update status', async () => {
      const params = { request_id: 'req-update-123' };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          request_id: 'req-update-123',
          status: 'SUCCESS',
          updated_items_count: 2,
        },
      });

      const result = await fboSupplyRequestApi.getSupplyOrderContentUpdateStatus(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/supply-order/content/update/status', params);
      expect(result.status).toBe(200);
      expect(result.data.status).toBe('SUCCESS');
    });
  });

  describe('Error Handling', () => {
    it('should handle HTTP errors gracefully', async () => {
      mockHttpClient.post.mockResolvedValueOnce({
        status: 400,
        statusText: 'Bad Request',
        headers: {},
        data: { code: 3, message: 'Invalid draft_id', details: [] },
      });

      const result = await fboSupplyRequestApi.getDraftCreateInfo({ draft_id: 'invalid' });

      expect(result.status).toBe(400);
      expect(result.data.message).toBe('Invalid draft_id');
    });

    it('should handle network errors', async () => {
      mockHttpClient.post.mockRejectedValueOnce(new Error('Connection timeout'));

      await expect(fboSupplyRequestApi.getClusterList({ cluster_type: 'CLUSTER_TYPE_OZON' }))
        .rejects.toThrow('Connection timeout');
    });
  });

  describe('Method Delegation', () => {
    it('should properly delegate draft methods', async () => {
      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: { clusters: [] },
      });

      await fboSupplyRequestApi.getClusterList({ cluster_type: 'CLUSTER_TYPE_OZON' });

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/cluster/list', {
        cluster_type: 'CLUSTER_TYPE_OZON',
      });
    });

    it('should properly delegate supply methods', async () => {
      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: { request_id: 'req-123' },
      });

      await fboSupplyRequestApi.createSupply({ draft_id: 'draft-123', timeslot_id: 'slot-456' });

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/draft/supply/create', {
        draft_id: 'draft-123',
        timeslot_id: 'slot-456',
      });
    });

    it('should properly delegate cargoes methods', async () => {
      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: { request_id: 'req-123' },
      });

      await fboSupplyRequestApi.createCargoes({
        supply_id: 'supply-123',
        cargoes: [{ cargo_type: 'BOX', items: [] }],
      });

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/cargoes/create', {
        supply_id: 'supply-123',
        cargoes: [{ cargo_type: 'BOX', items: [] }],
      });
    });

    it('should properly delegate orders methods', async () => {
      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: { request_id: 'req-123' },
      });

      await fboSupplyRequestApi.cancelSupplyOrder({
        supply_order_id: 123456,
        reason: 'Test cancellation',
      });

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/supply-order/cancel', {
        supply_order_id: 123456,
        reason: 'Test cancellation',
      });
    });
  });
});