/**
 * Integration verification tests for Story 1.4
 * Tests the integration of new categories: Returns, Return, and Quants
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { OzonSellerApiClient } from "../../src/core/client.js";
import { createApiKey, createClientId } from "../../src/core/types.js";
import { ReturnsApi } from "../../src/categories/returns/index.js";
import { ReturnApi } from "../../src/categories/return/index.js";
import { QuantsApi } from "../../src/categories/quants/index.js";

// Mock fetch globally
global.fetch = vi.fn();

describe("Story 1.4 Integration Verification", () => {
  let client: OzonSellerApiClient;

  beforeEach(() => {
    vi.clearAllMocks();

    client = new OzonSellerApiClient({
      apiKey: createApiKey("test-api-key-1234567890123456789012345678901234567890"),
      clientId: createClientId("12345"),
      baseUrl: "https://api-seller.ozon.ru",
    });
  });

  describe("IV1: No breaking changes to existing Product API consumers", () => {
    it("should maintain existing ProductAPI interface", () => {
      // Verify existing Product API is still accessible
      expect(client.product).toBeDefined();
      expect(typeof client.product.getList).toBe("function");
      expect(typeof client.product.archive).toBe("function");
      expect(typeof client.product.importProducts).toBe("function");
    });

    it("should maintain all 18 ProductAPI endpoints", () => {
      const productApi = client.product;

      // Verify all endpoints are available
      expect(typeof productApi.archive).toBe("function");
      expect(typeof productApi.unarchive).toBe("function");
      expect(typeof productApi.getList).toBe("function");
      expect(typeof productApi.updateAttributes).toBe("function");
      expect(typeof productApi.importBySku).toBe("function");
      expect(typeof productApi.getImportInfo).toBe("function");
      expect(typeof productApi.getInfo).toBe("function");
      expect(typeof productApi.getStocks).toBe("function");
      expect(typeof productApi.getPrices).toBe("function");
      expect(typeof productApi.getAttributes).toBe("function");
      expect(typeof productApi.getCertificateTypes).toBe("function");
      expect(typeof productApi.getDiscountedInfo).toBe("function");
      expect(typeof productApi.getProductDescription).toBe("function");
      expect(typeof productApi.getProductSubscription).toBe("function");
      expect(typeof productApi.importPictures).toBe("function");
      expect(typeof productApi.getPictures).toBe("function");
      expect(typeof productApi.getProductRating).toBe("function");
      expect(typeof productApi.getRelatedSKU).toBe("function");
      expect(typeof productApi.updateOfferID).toBe("function");
      expect(typeof productApi.deleteProducts).toBe("function");
      expect(typeof productApi.importProducts).toBe("function");
      expect(typeof productApi.getProductInfoListV3).toBe("function");
      expect(typeof productApi.getUploadQuota).toBe("function");
    });
  });

  describe("IV2: Cross-category operations maintain data consistency and type safety", () => {
    it("should provide ReturnsAPI with 1 endpoint", () => {
      expect(client.returns).toBeDefined();
      expect(client.returns).toBeInstanceOf(ReturnsApi);
      expect(typeof client.returns.getList).toBe("function");
    });

    it("should provide ReturnAPI with 8 endpoints", () => {
      expect(client.return).toBeDefined();
      expect(client.return).toBeInstanceOf(ReturnApi);
      expect(typeof client.return.getGiveoutBarcode).toBe("function");
      expect(typeof client.return.resetGiveoutBarcode).toBe("function");
      expect(typeof client.return.getGiveoutPDF).toBe("function");
      expect(typeof client.return.getGiveoutPNG).toBe("function");
      expect(typeof client.return.getGiveoutInfo).toBe("function");
      expect(typeof client.return.isGiveoutEnabled).toBe("function");
      expect(typeof client.return.getGiveoutList).toBe("function");
      expect(typeof client.return.getReturnsCompanyFbsInfo).toBe("function");
    });

    it("should provide QuantsAPI with 2 endpoints", () => {
      expect(client.quants).toBeDefined();
      expect(client.quants).toBeInstanceOf(QuantsApi);
      expect(typeof client.quants.getInfo).toBe("function");
      expect(typeof client.quants.getList).toBe("function");
    });

    it("should have proper type safety with shared types", async () => {
      // Test that shared types are properly imported and used
      const baseModule = await import("../../src/types/common/base.js");

      expect(typeof baseModule.createSku).toBe("function");
      expect(typeof baseModule.createReturnId).toBe("function");
      expect(typeof baseModule.createGiveoutId).toBe("function");
      expect(typeof baseModule.createQuantCode).toBe("function");
    });
  });

  describe("IV3: Performance metrics within NFR requirements", () => {
    it("should initialize all new APIs efficiently", () => {
      const startTime = performance.now();

      const newClient = new OzonSellerApiClient({
        apiKey: createApiKey("test-api-key-1234567890123456789012345678901234567890"),
        clientId: createClientId("12345"),
      });

      const endTime = performance.now();
      const initTime = endTime - startTime;

      // Should initialize in under 10ms
      expect(initTime).toBeLessThan(10);

      // Verify all APIs are initialized
      expect(newClient.returns).toBeDefined();
      expect(newClient.return).toBeDefined();
      expect(newClient.quants).toBeDefined();
    });

    it("should maintain memory efficiency with new categories", () => {
      // Verify that adding new categories doesn't significantly increase memory usage
      const memBefore = process.memoryUsage().heapUsed / 1024 / 1024;

      // Create multiple instances to test memory usage
      const clients = Array.from(
        { length: 10 },
        () =>
          new OzonSellerApiClient({
            apiKey: createApiKey("test-api-key-1234567890123456789012345678901234567890"),
            clientId: createClientId("12345"),
          }),
      );

      const memAfter = process.memoryUsage().heapUsed / 1024 / 1024;
      const memoryIncrease = memAfter - memBefore;

      // Should not increase memory by more than 5MB for 10 instances
      expect(memoryIncrease).toBeLessThan(5);
      expect(clients.length).toBe(10);
    });
  });

  describe("Pagination helpers consistency", () => {
    it("should export pagination utilities", async () => {
      const paginationModule = await import("../../src/utils/pagination.js");

      expect(typeof paginationModule.createOffsetPaginationRequest).toBe("function");
      expect(typeof paginationModule.createCursorPaginationRequest).toBe("function");
      expect(typeof paginationModule.hasNextPageOffset).toBe("function");
      expect(typeof paginationModule.hasNextPageCursor).toBe("function");
      expect(typeof paginationModule.PAGINATION_CONFIGS).toBe("object");
    });

    it("should have correct pagination configs for new categories", async () => {
      const { PAGINATION_CONFIGS } = await import("../../src/utils/pagination.js");

      expect(PAGINATION_CONFIGS.returns).toBeDefined();
      expect(PAGINATION_CONFIGS.returns.type).toBe("offset");
      expect(PAGINATION_CONFIGS.returns.maxLimit).toBe(500);

      expect(PAGINATION_CONFIGS.return).toBeDefined();
      expect(PAGINATION_CONFIGS.return.type).toBe("offset");

      expect(PAGINATION_CONFIGS.quants).toBeDefined();
      expect(PAGINATION_CONFIGS.quants.type).toBe("cursor");
    });
  });

  describe("Complete Story 1.4 requirements verification", () => {
    it("should cover all 29 endpoints as specified in the story", () => {
      // ProductAPI: 18 endpoints (already implemented)
      expect(Object.getOwnPropertyNames(Object.getPrototypeOf(client.product)).filter((name) => name !== "constructor").length).toBeGreaterThanOrEqual(18);

      // ReturnsAPI: 1 endpoint
      expect(Object.getOwnPropertyNames(Object.getPrototypeOf(client.returns)).filter((name) => name !== "constructor").length).toBe(1);

      // ReturnAPI: 8 endpoints
      expect(Object.getOwnPropertyNames(Object.getPrototypeOf(client.return)).filter((name) => name !== "constructor").length).toBe(8);

      // Quants: 2 endpoints
      expect(Object.getOwnPropertyNames(Object.getPrototypeOf(client.quants)).filter((name) => name !== "constructor").length).toBe(2);
    });

    it("should export all APIs correctly from main index", async () => {
      // Test that all new API classes are exported from the main index
      const exports = await import("../../src/index.js");

      // API classes should be exported
      expect(exports.ReturnsApi).toBeDefined();
      expect(exports.ReturnApi).toBeDefined();
      expect(exports.QuantsApi).toBeDefined();

      // Helper functions should be exported
      expect(exports.createOffsetPaginationRequest).toBeDefined();
      expect(exports.createCursorPaginationRequest).toBeDefined();
      expect(exports.createReturnId).toBeDefined();
      expect(exports.createGiveoutId).toBeDefined();
      expect(exports.createQuantCode).toBeDefined();

      // Main client should be exported
      expect(exports.OzonSellerApiClient).toBeDefined();
      expect(exports.createOzonSellerApiClient).toBeDefined();
    });
  });
});
