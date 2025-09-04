/**
 * Unit tests for FbsApi
 * Tests all FBS API methods with proper type validation
 * FBS - Fulfillment by Seller operations
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { FbsApi } from "../../../../src/categories/fbs/index.js";
import { HttpClient } from "../../../../src/core/http.js";
import type {
  FbsCancelReasonRequest,
  FbsCreateLabelBatchRequest,
  FbsGetLabelBatchRequest,
  FbsPickupCodeVerifyRequest,
  FbsGetRestrictionsRequest,
  FbsMovePostingRequest,
  FbsCancelPostingRequest,
  FbsGetPostingByBarcodeRequest,
  FbsPackageLabelRequest,
  FbsProductCancelRequest,
  FbsProductChangeRequest,
  FbsProductCountryListRequest,
  FbsProductCountrySetRequest,
  FbsGetPostingV3Request,
  FbsGetPostingListV3Request,
  FbsGetUnfulfilledListV3Request,
  FbsMultiBoxQtySetV3Request,
  FbsGetEtgbRequest,
  FbsUnpaidLegalProductListRequest,
} from "../../../../src/types/requests/fbs.js";
import type {
  FbsCancelReasonResponse,
  FbsCancelReasonListResponse,
  FbsCreateLabelBatchResponse,
  FbsGetLabelBatchResponse,
  FbsPickupCodeVerifyResponse,
  FbsGetRestrictionsResponse,
  FbsBooleanResponse,
  FbsPostingResponse,
  FbsPackageLabelResponse,
  FbsProductCancelResponse,
  FbsProductChangeResponse,
  FbsProductCountryListResponse,
  FbsProductCountrySetResponse,
  FbsGetPostingV3Response,
  FbsGetPostingListV3Response,
  FbsGetUnfulfilledListV3Response,
  FbsMultiBoxQtySetV3Response,
  FbsGetEtgbResponse,
  FbsUnpaidLegalProductListResponse,
} from "../../../../src/types/responses/fbs.js";

// Mock HttpClient
const mockHttpClient = {
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
  request: vi.fn(),
} as unknown as HttpClient;

describe("FbsApi", () => {
  let fbsApi: FbsApi;

  beforeEach(() => {
    fbsApi = new FbsApi(mockHttpClient);
    vi.clearAllMocks();
  });

  // ============ Причины отмены ============

  describe("getCancelReasons", () => {
    it("should get posting cancellation reasons", async () => {
      const request: FbsCancelReasonRequest = {
        related_posting_numbers: ["12345-0001-1", "12345-0002-1"],
      };

      const expectedResponse: FbsCancelReasonResponse = {
        result: [
          {
            posting_number: "12345-0001-1",
            cancel_reasons: [
              {
                id: 401,
                name: "Нет товара в наличии",
                type_id: 1,
              },
              {
                id: 402,
                name: "Другая причина",
                type_id: 2,
              },
            ],
          },
        ],
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await fbsApi.getCancelReasons(request);

      expect(result).toEqual(expectedResponse);
      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/posting/fbs/cancel-reason", request, undefined);
    });
  });

  describe("getCancelReasonsList", () => {
    it("should get all posting cancellation reasons", async () => {
      const expectedResponse: FbsCancelReasonListResponse = {
        result: [
          {
            id: 401,
            name: "Нет товара в наличии",
            type_id: 1,
          },
          {
            id: 402,
            name: "Другая причина",
            type_id: 2,
          },
        ],
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await fbsApi.getCancelReasonsList();

      expect(result).toEqual(expectedResponse);
      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v2/posting/fbs/cancel-reason/list", {}, undefined);
    });
  });

  // ============ Этикетки ============

  describe("createLabelBatch", () => {
    it("should create label batch task (v1)", async () => {
      const request: FbsCreateLabelBatchRequest = {
        posting_number: ["12345-0001-1", "12345-0002-1"],
      };

      const expectedResponse: FbsCreateLabelBatchResponse = {
        result: {
          task_id: 123456,
          status: "pending",
        },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await fbsApi.createLabelBatch(request);

      expect(result).toEqual(expectedResponse);
      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/posting/fbs/package-label/create", request, undefined);
    });
  });

  describe("createLabelBatchV2", () => {
    it("should create label batch task (v2)", async () => {
      const request: FbsCreateLabelBatchRequest = {
        posting_number: ["12345-0001-1"],
      };

      const expectedResponse: FbsCreateLabelBatchResponse = {
        result: {
          task_id: 789456,
          status: "processing",
        },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await fbsApi.createLabelBatchV2(request);

      expect(result).toEqual(expectedResponse);
      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v2/posting/fbs/package-label/create", request, undefined);
    });
  });

  describe("getLabelBatch", () => {
    it("should get label batch file", async () => {
      const request: FbsGetLabelBatchRequest = {
        task_id: 123456,
      };

      const expectedResponse: FbsGetLabelBatchResponse = {
        result: {
          task_id: 123456,
          status: "completed",
          file_url: "https://cdn.ozon.ru/labels/batch_123456.pdf",
        },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await fbsApi.getLabelBatch(request);

      expect(result).toEqual(expectedResponse);
      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/posting/fbs/package-label/get", request, undefined);
    });

    it("should handle processing status", async () => {
      const request: FbsGetLabelBatchRequest = {
        task_id: 123456,
      };

      const expectedResponse: FbsGetLabelBatchResponse = {
        result: {
          task_id: 123456,
          status: "processing",
        },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await fbsApi.getLabelBatch(request);

      expect(result).toEqual(expectedResponse);
      expect(result.result?.status).toBe("processing");
    });
  });

  describe("packageLabel", () => {
    it("should print package labels", async () => {
      const request: FbsPackageLabelRequest = {
        posting_number: ["12345-0001-1"],
      };

      const expectedResponse: FbsPackageLabelResponse = {
        content: "JVBERi0xLjQKMSAwIG9iago8PC9UeXBlL0NhdGFsb2cvUGFnZXMgMiAwIFI+PmVuZG9iago==",
        content_type: "application/pdf",
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await fbsApi.packageLabel(request);

      expect(result).toEqual(expectedResponse);
      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v2/posting/fbs/package-label", request, undefined);
    });
  });

  // ============ Проверка и ограничения ============

  describe("verifyPickupCode", () => {
    it("should verify courier pickup code", async () => {
      const request: FbsPickupCodeVerifyRequest = {
        code: "123456",
        posting_number: "12345-0001-1",
      };

      const expectedResponse: FbsPickupCodeVerifyResponse = {
        result: true,
        verification_info: {
          is_valid: true,
          posting_number: "12345-0001-1",
        },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await fbsApi.verifyPickupCode(request);

      expect(result).toEqual(expectedResponse);
      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/posting/fbs/pick-up-code/verify", request, undefined);
    });

    it("should handle invalid code", async () => {
      const request: FbsPickupCodeVerifyRequest = {
        code: "invalid",
        posting_number: "12345-0001-1",
      };

      const expectedResponse: FbsPickupCodeVerifyResponse = {
        result: false,
        verification_info: {
          is_valid: false,
          posting_number: "12345-0001-1",
          error_message: "Неверный код курьера",
        },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await fbsApi.verifyPickupCode(request);

      expect(result).toEqual(expectedResponse);
      expect(result.result).toBe(false);
    });
  });

  describe("getRestrictions", () => {
    it("should get pickup point restrictions", async () => {
      const request: FbsGetRestrictionsRequest = {
        posting_number: "12345-0001-1",
      };

      const expectedResponse: FbsGetRestrictionsResponse = {
        result: {
          max_weight: 20,
          max_dimensions: {
            length: 40,
            width: 30,
            height: 50,
          },
          additional_restrictions: ["Негабаритный груз", "Хрупкое"],
        },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await fbsApi.getRestrictions(request);

      expect(result).toEqual(expectedResponse);
      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/posting/fbs/restrictions", request, undefined);
    });
  });

  // ============ Управление отправлениями ============

  describe("moveToArbitration", () => {
    it("should move posting to arbitration", async () => {
      const request: FbsMovePostingRequest = {
        posting_number: ["12345-0001-1"],
      };

      const expectedResponse: FbsBooleanResponse = {
        result: true,
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await fbsApi.moveToArbitration(request);

      expect(result).toEqual(expectedResponse);
      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v2/posting/fbs/arbitration", request, undefined);
    });
  });

  describe("moveToAwaitingDelivery", () => {
    it("should move posting to awaiting delivery", async () => {
      const request: FbsMovePostingRequest = {
        posting_number: ["12345-0001-1"],
      };

      const expectedResponse: FbsBooleanResponse = {
        result: true,
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await fbsApi.moveToAwaitingDelivery(request);

      expect(result).toEqual(expectedResponse);
      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v2/posting/fbs/awaiting-delivery", request, undefined);
    });
  });

  describe("cancelPosting", () => {
    it("should cancel FBS posting", async () => {
      const request: FbsCancelPostingRequest = {
        posting_number: "12345-0001-1",
        cancel_reason_id: 401,
      };

      const expectedResponse: FbsBooleanResponse = {
        result: true,
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await fbsApi.cancelPosting(request);

      expect(result).toEqual(expectedResponse);
      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v2/posting/fbs/cancel", request, undefined);
    });

    it("should cancel posting with custom message", async () => {
      const request: FbsCancelPostingRequest = {
        posting_number: "12345-0001-1",
        cancel_reason_id: 402,
        cancel_reason_message: "Товар не в наличии",
      };

      const expectedResponse: FbsBooleanResponse = {
        result: true,
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await fbsApi.cancelPosting(request);

      expect(result).toEqual(expectedResponse);
    });
  });

  describe("getPostingByBarcode", () => {
    it("should get posting information by barcode", async () => {
      const request: FbsGetPostingByBarcodeRequest = {
        barcode: "1234567890123",
      };

      const expectedResponse: FbsPostingResponse = {
        result: {
          posting_number: "12345-0001-1",
          status: "awaiting_deliver",
          created_at: "2024-01-15T10:00:00Z",
          shipment_date: "2024-01-16T12:00:00Z",
          products: [
            {
              sku: "123456789",
              name: "Test Product",
              quantity: 1,
              offer_id: "TEST-001",
              price: "1999.99",
              currency_code: "RUB",
            },
          ],
          barcodes: ["1234567890123"],
        },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await fbsApi.getPostingByBarcode(request);

      expect(result).toEqual(expectedResponse);
      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v2/posting/fbs/get-by-barcode", request, undefined);
    });
  });

  // ============ Управление товарами в отправлениях ============

  describe("cancelProducts", () => {
    it("should cancel products in posting", async () => {
      const request: FbsProductCancelRequest = {
        posting_number: "12345-0001-1",
        products: [
          {
            sku: "123456789",
            quantity: 1,
            cancel_reason_id: 401,
          },
        ],
      };

      const expectedResponse: FbsProductCancelResponse = {
        result: [
          {
            sku: "123456789",
            result: true,
          },
        ],
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await fbsApi.cancelProducts(request);

      expect(result).toEqual(expectedResponse);
      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v2/posting/fbs/product/cancel", request, undefined);
    });

    it("should handle cancellation errors", async () => {
      const request: FbsProductCancelRequest = {
        posting_number: "12345-0001-1",
        products: [
          {
            sku: "123456789",
            quantity: 1,
            cancel_reason_id: 401,
          },
        ],
      };

      const expectedResponse: FbsProductCancelResponse = {
        result: [
          {
            sku: "123456789",
            result: false,
            error: "Товар уже отгружен",
          },
        ],
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await fbsApi.cancelProducts(request);

      expect(result).toEqual(expectedResponse);
      expect(result.result?.[0].result).toBe(false);
    });
  });

  describe("changeProducts", () => {
    it("should change products in posting", async () => {
      const request: FbsProductChangeRequest = {
        posting_number: "12345-0001-1",
        products: [
          {
            sku: "123456789",
            quantity: 2,
            weight: 1.5,
          },
        ],
      };

      const expectedResponse: FbsProductChangeResponse = {
        result: [
          {
            sku: "123456789",
            result: true,
          },
        ],
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await fbsApi.changeProducts(request);

      expect(result).toEqual(expectedResponse);
      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v2/posting/fbs/product/change", request, undefined);
    });
  });

  // ============ Страны-изготовители ============

  describe("getProductCountriesList", () => {
    it("should get available product countries list", async () => {
      const request: FbsProductCountryListRequest = {};

      const expectedResponse: FbsProductCountryListResponse = {
        result: [
          {
            iso_code: "RU",
            name: "Россия",
          },
          {
            iso_code: "CN",
            name: "Китай",
          },
        ],
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await fbsApi.getProductCountriesList(request);

      expect(result).toEqual(expectedResponse);
      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v2/posting/fbs/product/country/list", request, undefined);
    });
  });

  describe("setProductCountry", () => {
    it("should set product country information", async () => {
      const request: FbsProductCountrySetRequest = {
        posting_number: "12345-0001-1",
        products: [
          {
            sku: "123456789",
            country_iso_code: "RU",
          },
        ],
      };

      const expectedResponse: FbsProductCountrySetResponse = {
        result: [
          {
            sku: "123456789",
            result: true,
          },
        ],
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await fbsApi.setProductCountry(request);

      expect(result).toEqual(expectedResponse);
      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v2/posting/fbs/product/country/set", request, undefined);
    });
  });

  // ============ Получение информации об отправлениях v3 ============

  describe("getPostingV3", () => {
    it("should get posting information by ID (v3)", async () => {
      const request: FbsGetPostingV3Request = {
        posting_number: "12345-0001-1",
        translit: true,
      };

      const expectedResponse: FbsGetPostingV3Response = {
        result: {
          posting_number: "12345-0001-1",
          status: "awaiting_deliver",
          created_at: "2024-01-15T10:00:00Z",
          shipment_date: "2024-01-16T12:00:00Z",
          products: [
            {
              sku: "123456789",
              name: "Test Product",
              quantity: 1,
              offer_id: "TEST-001",
              price: "1999.99",
              currency_code: "RUB",
            },
          ],
          delivery_address: {
            city: "Moscow",
            address: "Red Square, 1",
            name: "Ivan Petrov",
            phone: "+7 (999) 123-45-67",
          },
        },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await fbsApi.getPostingV3(request);

      expect(result).toEqual(expectedResponse);
      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v3/posting/fbs/get", request, undefined);
    });
  });

  describe("getPostingListV3", () => {
    it("should get postings list (v3)", async () => {
      const request: FbsGetPostingListV3Request = {
        filter: {
          since: "2024-01-01T00:00:00Z",
          to: "2024-01-31T23:59:59Z",
          status: "awaiting_deliver",
        },
        limit: 100,
        offset: 0,
        dir: "DESC",
        with: {
          analytics_data: true,
          financial_data: true,
        },
      };

      const expectedResponse: FbsGetPostingListV3Response = {
        result: [
          {
            posting_number: "12345-0001-1",
            status: "awaiting_deliver",
            created_at: "2024-01-15T10:00:00Z",
            products: [
              {
                sku: "123456789",
                name: "Test Product",
                quantity: 1,
              },
            ],
          },
          {
            posting_number: "12345-0002-1",
            status: "delivering",
            created_at: "2024-01-14T15:30:00Z",
            products: [
              {
                sku: "987654321",
                name: "Another Product",
                quantity: 2,
              },
            ],
          },
        ],
        has_next: false,
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await fbsApi.getPostingListV3(request);

      expect(result).toEqual(expectedResponse);
      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v3/posting/fbs/list", request, undefined);
    });

    it("should handle pagination", async () => {
      const request: FbsGetPostingListV3Request = {
        filter: {
          since: "2024-01-01T00:00:00Z",
          to: "2024-01-31T23:59:59Z",
        },
        limit: 10,
        offset: 100,
      };

      const expectedResponse: FbsGetPostingListV3Response = {
        result: [],
        has_next: true,
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await fbsApi.getPostingListV3(request);

      expect(result.has_next).toBe(true);
    });
  });

  describe("getUnfulfilledListV3", () => {
    it("should get unfulfilled postings list (v3)", async () => {
      const request: FbsGetUnfulfilledListV3Request = {
        filter: {
          since: "2024-01-01T00:00:00Z",
          to: "2024-01-31T23:59:59Z",
        },
        limit: 50,
      };

      const expectedResponse: FbsGetUnfulfilledListV3Response = {
        result: [
          {
            posting_number: "12345-0003-1",
            status: "awaiting_packaging",
            created_at: "2024-01-15T08:00:00Z",
            products: [
              {
                sku: "555666777",
                name: "Unfulfilled Product",
                quantity: 1,
              },
            ],
          },
        ],
        has_next: false,
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await fbsApi.getUnfulfilledListV3(request);

      expect(result).toEqual(expectedResponse);
      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v3/posting/fbs/unfulfilled/list", request, undefined);
    });
  });

  // ============ Многокоробочные отправления ============

  describe("setMultiBoxQtyV3", () => {
    it("should set multi-box quantity for postings", async () => {
      const request: FbsMultiBoxQtySetV3Request = {
        posting_number: "12345-0001-1",
        multi_box_qty: 3,
      };

      const expectedResponse: FbsMultiBoxQtySetV3Response = {
        result: true,
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await fbsApi.setMultiBoxQtyV3(request);

      expect(result).toEqual(expectedResponse);
      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v3/posting/multiboxqty/set", request, undefined);
    });
  });

  // ============ Дополнительные методы ============

  describe("getEtgb", () => {
    it("should get ETGB customs declarations", async () => {
      const request: FbsGetEtgbRequest = {
        posting_number: ["12345-0001-1", "12345-0002-1"],
        doc_type: "ETGB",
      };

      const expectedResponse: FbsGetEtgbResponse = {
        result: [
          {
            posting_number: "12345-0001-1",
            document_url: "https://cdn.ozon.ru/etgb/12345-0001-1.pdf",
            document_type: "ETGB",
          },
          {
            posting_number: "12345-0002-1",
            document_url: "https://cdn.ozon.ru/etgb/12345-0002-1.pdf",
            document_type: "ETGB",
          },
        ],
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await fbsApi.getEtgb(request);

      expect(result).toEqual(expectedResponse);
      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/posting/global/etgb", request, undefined);
    });
  });

  describe("getUnpaidLegalProductList", () => {
    it("should get unpaid legal products list", async () => {
      const request: FbsUnpaidLegalProductListRequest = {
        limit: 100,
        offset: 0,
      };

      const expectedResponse: FbsUnpaidLegalProductListResponse = {
        result: [
          {
            sku: "123456789",
            name: "Unpaid Product",
            quantity: 1,
            price: "1999.99",
            posting_number: "12345-0001-1",
          },
          {
            sku: "987654321",
            name: "Another Unpaid Product",
            quantity: 2,
            price: "2999.99",
            posting_number: "12345-0002-1",
          },
        ],
        has_next: false,
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await fbsApi.getUnpaidLegalProductList(request);

      expect(result).toEqual(expectedResponse);
      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/posting/unpaid-legal/product/list", request, undefined);
    });
  });

  // ============ Error handling and edge cases ============

  describe("error handling", () => {
    it("should handle network errors", async () => {
      const request: FbsCancelReasonRequest = {
        related_posting_numbers: ["12345-0001-1"],
      };

      const networkError = new Error("Network error");
      vi.mocked(mockHttpClient.request).mockRejectedValueOnce(networkError);

      await expect(fbsApi.getCancelReasons(request)).rejects.toThrow("Network error");
    });

    it("should handle API errors", async () => {
      const request: FbsGetPostingV3Request = {
        posting_number: "invalid-posting",
      };

      const apiError = {
        error: {
          code: "POSTING_NOT_FOUND",
          message: "Posting not found",
        },
      };
      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(apiError);

      const result = await fbsApi.getPostingV3(request);
      expect(result).toEqual(apiError);
    });
  });

  // ============ Custom options handling ============

  describe("custom options", () => {
    it("should pass custom options to HTTP client", async () => {
      const request: FbsGetPostingV3Request = {
        posting_number: "12345-0001-1",
      };

      const options = { timeout: 30000 };
      const expectedResponse: FbsGetPostingV3Response = {
        result: {
          posting_number: "12345-0001-1",
          status: "delivered",
        },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      await fbsApi.getPostingV3(request, options);

      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v3/posting/fbs/get", request, options);
    });
  });
});
