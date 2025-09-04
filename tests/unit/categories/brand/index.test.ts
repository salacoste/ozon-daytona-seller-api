/**
 * BrandApi unit tests
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { BrandApi } from "../../../../src/categories/brand/index.js";
import { HttpClient } from "../../../../src/core/http.js";
import type { BrandCertificationListRequest } from "../../../../src/types/requests/brand.js";

// Mock HttpClient
const mockHttpClient = {
  request: vi.fn(),
} as unknown as HttpClient;

describe("BrandApi", () => {
  let brandApi: BrandApi;

  beforeEach(() => {
    brandApi = new BrandApi(mockHttpClient);
    vi.clearAllMocks();
  });

  describe("getCertificationList", () => {
    it("should get brand certification list successfully", async () => {
      const request: BrandCertificationListRequest = {
        page: 1,
        page_size: 50,
      };

      const expectedResponse = {
        result: {
          brand_certification: [
            {
              brand_name: "Apple",
              has_certificate: true,
            },
            {
              brand_name: "Samsung",
              has_certificate: true,
            },
            {
              brand_name: "Xiaomi",
              has_certificate: false,
            },
          ],
          total: 3,
        },
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await brandApi.getCertificationList(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/brand/company-certification/list", request, undefined);
      expect(result).toEqual(expectedResponse);
    });

    it("should get brand certification list with maximum page size", async () => {
      const request: BrandCertificationListRequest = {
        page: 1,
        page_size: 100,
      };

      const expectedResponse = {
        result: {
          brand_certification: [
            {
              brand_name: "Sony",
              has_certificate: true,
            },
            {
              brand_name: "LG",
              has_certificate: false,
            },
          ],
          total: 2,
        },
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await brandApi.getCertificationList(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/brand/company-certification/list", request, undefined);
      expect(result).toEqual(expectedResponse);
    });

    it("should handle pagination correctly", async () => {
      const request: BrandCertificationListRequest = {
        page: 2,
        page_size: 25,
      };

      const expectedResponse = {
        result: {
          brand_certification: [
            {
              brand_name: "Nike",
              has_certificate: true,
            },
          ],
          total: 26,
        },
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await brandApi.getCertificationList(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/brand/company-certification/list", request, undefined);
      expect(result).toEqual(expectedResponse);
    });

    it("should handle empty response", async () => {
      const request: BrandCertificationListRequest = {
        page: 1,
        page_size: 50,
      };

      const expectedResponse = {
        result: {
          brand_certification: [],
          total: 0,
        },
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await brandApi.getCertificationList(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/brand/company-certification/list", request, undefined);
      expect(result).toEqual(expectedResponse);
    });

    it("should filter brands requiring certificates", async () => {
      const request: BrandCertificationListRequest = {
        page: 1,
        page_size: 50,
      };

      const expectedResponse = {
        result: {
          brand_certification: [
            {
              brand_name: "Apple",
              has_certificate: true,
            },
            {
              brand_name: "Samsung",
              has_certificate: true,
            },
            {
              brand_name: "Huawei",
              has_certificate: true,
            },
            {
              brand_name: "Generic Brand",
              has_certificate: false,
            },
          ],
          total: 4,
        },
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await brandApi.getCertificationList(request);

      // Verify that we can identify brands requiring certificates
      const brandsRequiringCerts = result.result?.brand_certification.filter((brand) => brand.has_certificate);

      expect(brandsRequiringCerts).toHaveLength(3);
      expect(brandsRequiringCerts?.[0].brand_name).toBe("Apple");
      expect(brandsRequiringCerts?.[1].brand_name).toBe("Samsung");
      expect(brandsRequiringCerts?.[2].brand_name).toBe("Huawei");
    });

    it("should handle brands with different certification requirements", async () => {
      const request: BrandCertificationListRequest = {
        page: 1,
        page_size: 10,
      };

      const expectedResponse = {
        result: {
          brand_certification: [
            {
              brand_name: "Prestigious Brand A",
              has_certificate: true,
            },
            {
              brand_name: "Regular Brand B",
              has_certificate: false,
            },
            {
              brand_name: "Luxury Brand C",
              has_certificate: true,
            },
            {
              brand_name: "Budget Brand D",
              has_certificate: false,
            },
          ],
          total: 4,
        },
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await brandApi.getCertificationList(request);

      expect(result.result?.brand_certification).toHaveLength(4);
      expect(result.result?.total).toBe(4);

      // Check mix of certificate requirements
      const withCerts = result.result?.brand_certification.filter((b) => b.has_certificate);
      const withoutCerts = result.result?.brand_certification.filter((b) => !b.has_certificate);

      expect(withCerts).toHaveLength(2);
      expect(withoutCerts).toHaveLength(2);
    });
  });

  describe("error handling", () => {
    it("should handle API errors", async () => {
      const request: BrandCertificationListRequest = {
        page: 1,
        page_size: 50,
      };

      const error = new Error("API Error");
      (mockHttpClient.request as any).mockRejectedValue(error);

      await expect(brandApi.getCertificationList(request)).rejects.toThrow("API Error");
    });

    it("should handle validation errors", async () => {
      const request: BrandCertificationListRequest = {
        page: 0, // Invalid page number
        page_size: 50,
      };

      const error = new Error("Invalid page number");
      (mockHttpClient.request as any).mockRejectedValue(error);

      await expect(brandApi.getCertificationList(request)).rejects.toThrow('Parameter "page" is required and must be >= 1');
    });

    it("should handle page size validation", async () => {
      const request: BrandCertificationListRequest = {
        page: 1,
        page_size: 0, // Invalid page size
      };

      const error = new Error("Invalid page size");
      (mockHttpClient.request as any).mockRejectedValue(error);

      await expect(brandApi.getCertificationList(request)).rejects.toThrow('Parameter "page_size" is required and must be >= 1');
    });

    it("should handle network errors", async () => {
      const request: BrandCertificationListRequest = {
        page: 1,
        page_size: 50,
      };

      const error = new Error("Network timeout");
      (mockHttpClient.request as any).mockRejectedValue(error);

      await expect(brandApi.getCertificationList(request)).rejects.toThrow("Network timeout");
    });

    it("should handle server errors", async () => {
      const request: BrandCertificationListRequest = {
        page: 1,
        page_size: 50,
      };

      const error = new Error("Internal server error");
      (mockHttpClient.request as any).mockRejectedValue(error);

      await expect(brandApi.getCertificationList(request)).rejects.toThrow("Internal server error");
    });
  });

  describe("request options", () => {
    it("should pass custom request options", async () => {
      const request: BrandCertificationListRequest = {
        page: 1,
        page_size: 50,
      };

      const options = {
        timeout: 10000,
        retries: 3,
        headers: {
          "Custom-Header": "custom-value",
        },
      };

      const expectedResponse = {
        result: {
          brand_certification: [
            {
              brand_name: "Test Brand",
              has_certificate: true,
            },
          ],
          total: 1,
        },
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await brandApi.getCertificationList(request, options);

      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/brand/company-certification/list", request, options);
      expect(result).toEqual(expectedResponse);
    });

    it("should work without custom options", async () => {
      const request: BrandCertificationListRequest = {
        page: 1,
        page_size: 50,
      };

      const expectedResponse = {
        result: {
          brand_certification: [],
          total: 0,
        },
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await brandApi.getCertificationList(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/brand/company-certification/list", request, undefined);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe("business logic scenarios", () => {
    it("should handle dynamic brand certification requirements", async () => {
      // Test scenario: Ozon receives requirement from brand to provide certificate
      const request: BrandCertificationListRequest = {
        page: 1,
        page_size: 50,
      };

      const expectedResponse = {
        result: {
          brand_certification: [
            {
              brand_name: "Previously No Cert Brand",
              has_certificate: true, // Now requires certificate
            },
          ],
          total: 1,
        },
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await brandApi.getCertificationList(request);

      expect(result.result?.brand_certification[0].has_certificate).toBe(true);
    });

    it("should handle large number of brands", async () => {
      const request: BrandCertificationListRequest = {
        page: 1,
        page_size: 100,
      };

      // Simulate response with many brands
      const brands = Array.from({ length: 100 }, (_, i) => ({
        brand_name: `Brand ${i + 1}`,
        has_certificate: i % 3 === 0, // Every 3rd brand requires certificate
      }));

      const expectedResponse = {
        result: {
          brand_certification: brands,
          total: 1000, // Total across all pages
        },
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await brandApi.getCertificationList(request);

      expect(result.result?.brand_certification).toHaveLength(100);
      expect(result.result?.total).toBe(1000);

      // Verify certification pattern
      const withCertificates = result.result?.brand_certification.filter((brand) => brand.has_certificate);
      expect(withCertificates).toHaveLength(34); // 100/3 + 1 = 34 brands
    });

    it("should handle brands from seller personal account", async () => {
      const request: BrandCertificationListRequest = {
        page: 1,
        page_size: 50,
      };

      const expectedResponse = {
        result: {
          brand_certification: [
            {
              brand_name: "Seller Own Brand",
              has_certificate: false,
            },
            {
              brand_name: "Third Party Brand",
              has_certificate: true,
            },
          ],
          total: 2,
        },
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await brandApi.getCertificationList(request);

      // The response contains brands whose products are in seller's personal account
      expect(result.result?.brand_certification).toHaveLength(2);
      expect(result.result?.brand_certification.some((b) => !b.has_certificate)).toBe(true);
      expect(result.result?.brand_certification.some((b) => b.has_certificate)).toBe(true);
    });
  });

  describe("edge cases", () => {
    it("should handle minimum page size", async () => {
      const request: BrandCertificationListRequest = {
        page: 1,
        page_size: 1,
      };

      const expectedResponse = {
        result: {
          brand_certification: [
            {
              brand_name: "Single Brand",
              has_certificate: true,
            },
          ],
          total: 50,
        },
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await brandApi.getCertificationList(request);

      expect(result.result?.brand_certification).toHaveLength(1);
      expect(result.result?.total).toBe(50);
    });

    it("should handle last page with fewer items", async () => {
      const request: BrandCertificationListRequest = {
        page: 3,
        page_size: 50,
      };

      const expectedResponse = {
        result: {
          brand_certification: [
            {
              brand_name: "Last Brand",
              has_certificate: false,
            },
          ],
          total: 101, // 2 full pages + 1 item on last page
        },
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await brandApi.getCertificationList(request);

      expect(result.result?.brand_certification).toHaveLength(1);
      expect(result.result?.total).toBe(101);
    });

    it("should handle brands with special characters in names", async () => {
      const request: BrandCertificationListRequest = {
        page: 1,
        page_size: 50,
      };

      const expectedResponse = {
        result: {
          brand_certification: [
            {
              brand_name: "L'Oréal",
              has_certificate: true,
            },
            {
              brand_name: "M&M's",
              has_certificate: false,
            },
            {
              brand_name: "H&M",
              has_certificate: true,
            },
          ],
          total: 3,
        },
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await brandApi.getCertificationList(request);

      expect(result.result?.brand_certification[0].brand_name).toBe("L'Oréal");
      expect(result.result?.brand_certification[1].brand_name).toBe("M&M's");
      expect(result.result?.brand_certification[2].brand_name).toBe("H&M");
    });
  });
});
