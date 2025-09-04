/**
 * Unit tests for ProductApi
 * Tests all product API methods with proper type validation
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { ProductApi } from "../../../../src/categories/product/index.js";
import { HttpClient } from "../../../../src/core/http.js";
import { createProductId, createOfferId } from "../../../../src/types/common/base.js";
import type {
  ProductArchiveRequest,
  ProductUnarchiveRequest,
  GetProductListRequest,
  ProductUpdateAttributesRequest,
  ImportProductsBySKURequest,
  GetProductInfoRequest,
  GetProductInfoDescriptionRequest,
  GetProductInfoSubscriptionRequest,
  ProductImportPicturesRequest,
  GetProductPicturesRequest,
  GetProductRatingBySkuRequest,
  GetRelatedSKURequest,
  UpdateOfferIdRequest,
  DeleteProductsRequest,
  ImportProductsV3Request,
  GetProductInfoListV3Request,
  GetUploadQuotaRequest,
} from "../../../../src/types/requests/product.js";
import type {
  GetProductListResponse,
  GetProductStocksResponse,
  GetProductPricesResponse,
  GetProductAttributesResponse,
  ImportProductsResponse,
  ImportProductsStatusResponse,
  GetCertificateTypesResponse,
  GetProductInfoDescriptionResponse,
  GetProductInfoSubscriptionResponse,
  ProductImportPicturesResponse,
  GetProductPicturesResponse,
  GetProductRatingBySkuResponse,
  GetRelatedSKUResponse,
  UpdateOfferIdResponse,
  DeleteProductsResponse,
  ImportProductsV3Response,
  GetProductInfoListV3Response,
  GetUploadQuotaResponse,
} from "../../../../src/types/responses/product.js";
import type { ProductBooleanResponse } from "../../../../src/types/common/base.js";

// Mock HttpClient
const mockHttpClient = {
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
  request: vi.fn(),
} as unknown as HttpClient;

describe("ProductApi", () => {
  let productApi: ProductApi;

  beforeEach(() => {
    productApi = new ProductApi(mockHttpClient);
    vi.clearAllMocks();
  });

  describe("archive", () => {
    it("should archive products by ID list", async () => {
      const request: ProductArchiveRequest = {
        product_id: [createProductId(123), createProductId(456)],
      };

      const expectedResponse: ProductBooleanResponse = {
        result: true,
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await productApi.archive(request);

      expect(result).toEqual(expectedResponse);
      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/product/archive", request, undefined);
    });

    it("should handle archive with custom options", async () => {
      const request: ProductArchiveRequest = {
        product_id: [createProductId(789)],
      };

      const options = { timeout: 10000 };
      const expectedResponse: ProductBooleanResponse = { result: true };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      await productApi.archive(request, options);

      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/product/archive", request, options);
    });
  });

  describe("unarchive", () => {
    it("should unarchive products by ID list", async () => {
      const request: ProductUnarchiveRequest = {
        product_id: [createProductId(123), createProductId(456)],
      };

      const expectedResponse: ProductBooleanResponse = {
        result: true,
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await productApi.unarchive(request);

      expect(result).toEqual(expectedResponse);
      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/product/unarchive", request, undefined);
    });
  });

  describe("getList", () => {
    it("should get product list with default parameters", async () => {
      const expectedResponse: GetProductListResponse = {
        result: {
          items: [
            {
              id: createProductId(123),
              name: "Test Product",
              offer_id: createOfferId("TEST-001"),
              barcode: "1234567890",
              description: "Test product description",
              category_id: 12345,
              state: "PUBLISHED",
              state_name: "Published",
              state_description: "",
              is_fbo_visible: true,
              is_fbs_visible: true,
              archived: false,
              is_discounted: false,
            },
          ],
          last_id: "abc123",
          total: 1,
        },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await productApi.getList();

      expect(result).toEqual(expectedResponse);
      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v3/product/list", {}, undefined);
    });

    it("should get product list with filters", async () => {
      const request: GetProductListRequest = {
        filter: {
          offer_id: ["TEST-001", "TEST-002"],
          visibility: "VISIBLE",
        },
        limit: 10,
        last_id: "xyz789",
      };

      const expectedResponse: GetProductListResponse = {
        result: {
          items: [],
          last_id: "",
          total: 0,
        },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await productApi.getList(request);

      expect(result).toEqual(expectedResponse);
      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v3/product/list", request, undefined);
    });
  });

  describe("updateAttributes", () => {
    it("should update product attributes", async () => {
      const request: ProductUpdateAttributesRequest = {
        items: [
          {
            offer_id: createOfferId("TEST-001"),
            attributes: [
              {
                id: 1001,
                values: [
                  {
                    value: "Updated Value",
                    dictionary_value_id: 5001,
                  },
                ],
              },
            ],
          },
        ],
      };

      const expectedResponse: ProductBooleanResponse = { result: true };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await productApi.updateAttributes(request);

      expect(result).toEqual(expectedResponse);
      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/product/attributes/update", request, undefined);
    });
  });

  describe("importBySku", () => {
    it("should import products by SKU", async () => {
      const request: ImportProductsBySKURequest = {
        items: [
          {
            sku: 123456,
            name: "New Product",
            offer_id: createOfferId("NEW-001"),
            price: "1999.99",
            currency_code: "RUB",
          },
        ],
      };

      const expectedResponse: ImportProductsResponse = {
        result: {
          task_id: 789,
        },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await productApi.importBySku(request);

      expect(result).toEqual(expectedResponse);
      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/product/import-by-sku", request, undefined);
    });
  });

  describe("getImportInfo", () => {
    it("should get import task status", async () => {
      const request = { task_id: 789 };

      const expectedResponse: ImportProductsStatusResponse = {
        result: {
          total: 1,
          processed: 1,
          status: "completed",
          items: [
            {
              offer_id: createOfferId("NEW-001"),
              product_id: createProductId(999),
              status: "imported",
              errors: [],
            },
          ],
        },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await productApi.getImportInfo(request);

      expect(result).toEqual(expectedResponse);
      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/product/import/info", request, undefined);
    });
  });

  describe("getInfo", () => {
    it("should get product info by offer_id", async () => {
      const request: GetProductInfoRequest = {
        offer_id: createOfferId("TEST-001"),
      };

      const expectedResponse: GetProductAttributesResponse = {
        result: [
          {
            id: createProductId(123),
            offer_id: createOfferId("TEST-001"),
            attributes: [
              {
                attribute_id: 1001,
                complex_id: 0,
                attribute_name: "Brand",
                values: [
                  {
                    dictionary_value_id: 5001,
                    value: "Test Brand",
                  },
                ],
              },
            ],
          },
        ],
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await productApi.getInfo(request);

      expect(result).toEqual(expectedResponse);
      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v2/product/info", request, undefined);
    });
  });

  describe("getStocks", () => {
    it("should get product stocks", async () => {
      const request = {
        filter: {
          offer_id: ["TEST-001", "TEST-002"],
        },
      };

      const expectedResponse: GetProductStocksResponse = {
        result: [
          {
            offer_id: createOfferId("TEST-001"),
            product_id: createProductId(123),
            stock: 10,
            reserved: 2,
          },
        ],
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await productApi.getStocks(request);

      expect(result).toEqual(expectedResponse);
      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v3/product/info/stocks", request, undefined);
    });
  });

  describe("getPrices", () => {
    it("should get product prices", async () => {
      const request = {
        filter: {
          product_id: [createProductId(123)],
        },
      };

      const expectedResponse: GetProductPricesResponse = {
        result: {
          items: [
            {
              offer_id: createOfferId("TEST-001"),
              product_id: createProductId(123),
              price: "1999.99",
              old_price: "2499.99",
              currency_code: "RUB",
              min_price: "1899.99",
            },
          ],
        },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await productApi.getPrices(request);

      expect(result).toEqual(expectedResponse);
      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v4/product/info/prices", request, undefined);
    });
  });

  describe("getAttributes", () => {
    it("should get product attributes", async () => {
      const request = {
        filter: {
          offer_id: ["TEST-001"],
        },
        limit: 100,
      };

      const expectedResponse: GetProductAttributesResponse = {
        result: [
          {
            id: createProductId(123),
            offer_id: createOfferId("TEST-001"),
            attributes: [
              {
                attribute_id: 1001,
                complex_id: 0,
                attribute_name: "Color",
                values: [
                  {
                    dictionary_value_id: 5001,
                    value: "Red",
                  },
                ],
              },
            ],
          },
        ],
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await productApi.getAttributes(request);

      expect(result).toEqual(expectedResponse);
      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v4/product/info/attributes", request, undefined);
    });
  });

  describe("getCertificateTypes", () => {
    it("should get certificate types", async () => {
      const expectedResponse: GetCertificateTypesResponse = {
        result: [
          {
            id: 1,
            name: "Декларация соответствия",
            mandatory: true,
          },
          {
            id: 2,
            name: "Сертификат соответствия",
            mandatory: false,
          },
        ],
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await productApi.getCertificateTypes();

      expect(result).toEqual(expectedResponse);
      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/product/certificate-types", {}, undefined);
    });
  });

  describe("getDiscountedInfo", () => {
    it("should get discounted products info", async () => {
      const request = {
        discounted_skus: ["SKU001", "SKU002"],
      };

      const expectedResponse = {
        result: {
          discounted_skus: [
            {
              sku: "SKU001",
              discount_value: 100,
              discount_percent: 5,
            },
          ],
        },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await productApi.getDiscountedInfo(request);

      expect(result).toEqual(expectedResponse);
      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/product/info/discounted", request, undefined);
    });
  });

  // === NEW METHODS TESTS ===

  describe("getProductDescription", () => {
    it("should get product description by offer_id", async () => {
      const request: GetProductInfoDescriptionRequest = {
        offer_id: createOfferId("TEST-001"),
      };

      const expectedResponse: GetProductInfoDescriptionResponse = {
        result: {
          description: "Detailed product description with HTML markup",
        },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await productApi.getProductDescription(request);

      expect(result).toEqual(expectedResponse);
      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/product/info/description", request, undefined);
    });

    it("should get product description by product_id", async () => {
      const request: GetProductInfoDescriptionRequest = {
        product_id: createProductId(123),
      };

      const expectedResponse: GetProductInfoDescriptionResponse = {
        result: {
          description: "Product description for ID 123",
        },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await productApi.getProductDescription(request);

      expect(result).toEqual(expectedResponse);
      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/product/info/description", request, undefined);
    });
  });

  describe("getProductSubscription", () => {
    it("should get product subscription info", async () => {
      const request: GetProductInfoSubscriptionRequest = {
        skus: ["SKU001", "SKU002", "SKU003"],
      };

      const expectedResponse: GetProductInfoSubscriptionResponse = {
        result: [
          {
            sku: "SKU001",
            subscription_count: 15,
          },
          {
            sku: "SKU002",
            subscription_count: 8,
          },
        ],
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await productApi.getProductSubscription(request);

      expect(result).toEqual(expectedResponse);
      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/product/info/subscription", request, undefined);
    });
  });

  describe("importPictures", () => {
    it("should import product pictures", async () => {
      const request: ProductImportPicturesRequest = {
        product_id: createProductId(123),
        images: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
        images360: ["https://example.com/360_1.jpg"],
        color_image: "https://example.com/color.jpg",
      };

      const expectedResponse: ProductImportPicturesResponse = {
        result: {
          task_id: 456789,
          status: "pending",
        },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await productApi.importPictures(request);

      expect(result).toEqual(expectedResponse);
      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/product/pictures/import", request, undefined);
    });
  });

  describe("getPictures", () => {
    it("should get product pictures", async () => {
      const request: GetProductPicturesRequest = {
        product_id: [createProductId(123), createProductId(456)],
      };

      const expectedResponse: GetProductPicturesResponse = {
        result: [
          {
            product_id: createProductId(123),
            pictures: [
              {
                url: "https://example.com/image1.jpg",
                primary: true,
              },
              {
                url: "https://example.com/image2.jpg",
                primary: false,
              },
            ],
          },
        ],
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await productApi.getPictures(request);

      expect(result).toEqual(expectedResponse);
      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v2/product/pictures/info", request, undefined);
    });
  });

  describe("getProductRating", () => {
    it("should get product rating by SKU", async () => {
      const request: GetProductRatingBySkuRequest = {
        skus: ["SKU001", "SKU002"],
      };

      const expectedResponse: GetProductRatingBySkuResponse = {
        result: [
          {
            sku: "SKU001",
            rating: 4.5,
            review_count: 125,
          },
          {
            sku: "SKU002",
            rating: 3.8,
            review_count: 67,
          },
        ],
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await productApi.getProductRating(request);

      expect(result).toEqual(expectedResponse);
      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/product/rating-by-sku", request, undefined);
    });
  });

  describe("getRelatedSKU", () => {
    it("should get related SKUs", async () => {
      const request: GetRelatedSKURequest = {
        skus: ["SKU001", "SKU002"],
      };

      const expectedResponse: GetRelatedSKUResponse = {
        result: [
          {
            sku: "SKU001",
            related_skus: ["SKU003", "SKU004", "SKU005"],
          },
          {
            sku: "SKU002",
            related_skus: ["SKU006", "SKU007"],
          },
        ],
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await productApi.getRelatedSKU(request);

      expect(result).toEqual(expectedResponse);
      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/product/related-sku/get", request, undefined);
    });
  });

  describe("updateOfferID", () => {
    it("should update product offer IDs", async () => {
      const request: UpdateOfferIdRequest = {
        update_offer_id: [
          {
            offer_id: createOfferId("OLD-001"),
            new_offer_id: createOfferId("NEW-001"),
          },
          {
            offer_id: createOfferId("OLD-002"),
            new_offer_id: createOfferId("NEW-002"),
          },
        ],
      };

      const expectedResponse: UpdateOfferIdResponse = {
        result: {
          updated_count: 2,
          errors: [],
        },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await productApi.updateOfferID(request);

      expect(result).toEqual(expectedResponse);
      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/product/update/offer-id", request, undefined);
    });
  });

  describe("deleteProducts", () => {
    it("should delete products without SKU", async () => {
      const request: DeleteProductsRequest = {
        products: [{ offer_id: createOfferId("DELETE-001") }, { offer_id: createOfferId("DELETE-002") }],
      };

      const expectedResponse: DeleteProductsResponse = {
        result: {
          deleted_count: 2,
          task_id: 789456,
        },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await productApi.deleteProducts(request);

      expect(result).toEqual(expectedResponse);
      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v2/products/delete", request, undefined);
    });
  });

  describe("importProducts", () => {
    it("should create/update products v3", async () => {
      const request: ImportProductsV3Request = {
        items: [
          {
            offer_id: createOfferId("IMPORT-001"),
            name: "New Product Name",
            description: "Detailed product description",
            category_id: 12345,
            price: "1999.99",
            old_price: "2499.99",
            currency_code: "RUB",
            barcode: "1234567890123",
            weight: 500,
            weight_unit: "g",
            width: 10,
            height: 20,
            depth: 5,
            dimension_unit: "cm",
            images: ["https://example.com/main.jpg", "https://example.com/side.jpg"],
            primary_image: "https://example.com/main.jpg",
            attributes: [
              {
                id: 1001,
                values: [
                  {
                    dictionary_value_id: 5001,
                    value: "Brand Name",
                  },
                ],
              },
            ],
          },
        ],
      };

      const expectedResponse: ImportProductsV3Response = {
        result: {
          task_id: 987654,
          status: "pending",
        },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await productApi.importProducts(request);

      expect(result).toEqual(expectedResponse);
      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v3/product/import", request, undefined);
    });
  });

  describe("getProductInfoListV3", () => {
    it("should get extended product info list v3", async () => {
      const request: GetProductInfoListV3Request = {
        offer_id: [createOfferId("TEST-001"), createOfferId("TEST-002")],
        product_id: [createProductId(123)],
        sku: [456789, 789456],
      };

      const expectedResponse: GetProductInfoListV3Response = {
        result: {
          items: [
            {
              id: createProductId(123),
              offer_id: createOfferId("TEST-001"),
              sku: 456789,
              name: "Product Name",
              description: "Product Description",
              category_id: 12345,
              state: "READY_TO_SUPPLY",
              attributes: [],
            },
          ],
        },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await productApi.getProductInfoListV3(request);

      expect(result).toEqual(expectedResponse);
      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v3/product/info/list", request, undefined);
    });
  });

  describe("getUploadQuota", () => {
    it("should get upload quota limits", async () => {
      const request: GetUploadQuotaRequest = {};

      const expectedResponse: GetUploadQuotaResponse = {
        daily_create: {
          limit: 1000,
          reset_at: "2024-12-31T23:59:59Z",
          usage: 150,
        },
        daily_update: {
          limit: 5000,
          reset_at: "2024-12-31T23:59:59Z",
          usage: 250,
        },
        total: {
          limit: 50000,
          usage: 12500,
        },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await productApi.getUploadQuota(request);

      expect(result).toEqual(expectedResponse);
      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v4/product/info/limit", {}, undefined);
    });

    it("should get upload quota with default empty request", async () => {
      const expectedResponse: GetUploadQuotaResponse = {
        daily_create: {
          limit: 1000,
          reset_at: "2024-12-31T23:59:59Z",
          usage: 0,
        },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValueOnce(expectedResponse);

      const result = await productApi.getUploadQuota();

      expect(result).toEqual(expectedResponse);
      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v4/product/info/limit", {}, undefined);
    });
  });
});
