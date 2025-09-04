/**
 * CertificationApi unit tests
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { CertificationApi } from "../../../../src/categories/certification/index.js";
import { HttpClient } from "../../../../src/core/http.js";
import type { CertificateListRequest, CertificateBindRequest, CertificateCreateRequest, CertificateDeleteRequest, CertificateInfoFromListRequest, CertificateUnbindRequest, ProductCertificationListRequest, ProductCertificationListV2Request } from "../../../../src/types/requests/certification.js";

// Mock HttpClient
const mockHttpClient = {
  request: vi.fn(),
} as unknown as HttpClient;

describe("CertificationApi", () => {
  let certificationApi: CertificationApi;

  beforeEach(() => {
    certificationApi = new CertificationApi(mockHttpClient);
    vi.clearAllMocks();
  });

  describe("getCertificateList", () => {
    it("should get certificate list successfully", async () => {
      const request: CertificateListRequest = {
        page: 1,
        page_size: 50,
      };

      const expectedResponse = {
        result: {
          certificates: [
            {
              id: 12345,
              name: "Сертификат соответствия ГОСТ",
              type: "GOST_CERTIFICATE",
              number: "РОСС RU.АИ37.H00124",
              status: "ACTIVE",
              created_at: "2024-01-15T10:00:00Z",
              expire_date: "2025-12-31T23:59:59Z",
              files: ["file-1", "file-2"],
            },
          ],
          total: 1,
        },
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await certificationApi.getCertificateList(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/product/certificate/list", request, undefined);
      expect(result).toEqual(expectedResponse);
    });

    it("should get certificate list with filters", async () => {
      const request: CertificateListRequest = {
        page: 1,
        page_size: 100,
        offer_id: "product-123",
        status: "ACTIVE",
        type: "GOST_CERTIFICATE",
      };

      const expectedResponse = {
        result: {
          certificates: [],
          total: 0,
        },
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await certificationApi.getCertificateList(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/product/certificate/list", request, undefined);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe("bindCertificate", () => {
    it("should bind certificate successfully", async () => {
      const request: CertificateBindRequest = {
        certificate_id: 12345,
        product_id: ["product-1", "product-2"],
      };

      const expectedResponse = {
        result: [
          {
            product_id: "product-1",
            status: "success",
          },
          {
            product_id: "product-2",
            status: "success",
          },
        ],
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await certificationApi.bindCertificate(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/product/certificate/bind", request, undefined);
      expect(result).toEqual(expectedResponse);
    });

    it("should handle binding errors", async () => {
      const request: CertificateBindRequest = {
        certificate_id: 12345,
        product_id: ["invalid-product"],
      };

      const expectedResponse = {
        result: [
          {
            product_id: "invalid-product",
            status: "error",
            error: "Product not found",
          },
        ],
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await certificationApi.bindCertificate(request);

      expect(result).toEqual(expectedResponse);
    });
  });

  describe("createCertificate", () => {
    it("should create certificate successfully", async () => {
      const request: CertificateCreateRequest = {
        name: "Сертификат соответствия ГОСТ",
        type: "GOST_CERTIFICATE",
        number: "РОСС RU.АИ37.H00124",
        expire_date: "2025-12-31T23:59:59Z",
        file: ["base64_file_content_1", "base64_file_content_2"],
      };

      const expectedResponse = {
        certificate_id: 12346,
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await certificationApi.createCertificate(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/product/certificate/create", request, undefined);
      expect(result).toEqual(expectedResponse);
    });

    it("should create certificate with minimal data", async () => {
      const request: CertificateCreateRequest = {
        name: "Декларация о соответствии",
        type: "DECLARATION",
      };

      const expectedResponse = {
        certificate_id: 12347,
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await certificationApi.createCertificate(request);

      expect(result).toEqual(expectedResponse);
    });
  });

  describe("deleteCertificates", () => {
    it("should delete certificates successfully", async () => {
      const request: CertificateDeleteRequest = {
        certificate_id: [12345, 12346],
      };

      const expectedResponse = {
        result: [
          {
            certificate_id: 12345,
            status: "success",
          },
          {
            certificate_id: 12346,
            status: "success",
          },
        ],
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await certificationApi.deleteCertificates(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/product/certificate/delete", request, undefined);
      expect(result).toEqual(expectedResponse);
    });

    it("should handle deletion errors", async () => {
      const request: CertificateDeleteRequest = {
        certificate_id: [99999],
      };

      const expectedResponse = {
        result: [
          {
            certificate_id: 99999,
            status: "error",
            error: "Certificate not found",
          },
        ],
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await certificationApi.deleteCertificates(request);

      expect(result).toEqual(expectedResponse);
    });
  });

  describe("getCertificateProductsList", () => {
    it("should get certificate products successfully", async () => {
      const request: CertificateInfoFromListRequest = {
        certificate_id: 12345,
        page: 1,
        page_size: 50,
      };

      const expectedResponse = {
        result: {
          products: [
            {
              product_id: "product-1",
              offer_id: "offer-123",
              name: "Товар 1",
              status: "ACTIVE",
            },
            {
              product_id: "product-2",
              offer_id: "offer-456",
              name: "Товар 2",
              status: "ACTIVE",
            },
          ],
          total: 2,
        },
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await certificationApi.getCertificateProductsList(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/product/certificate/products/list", request, undefined);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe("getRejectionReasons", () => {
    it("should get rejection reasons successfully", async () => {
      const expectedResponse = {
        result: [
          {
            code: "INVALID_FORMAT",
            name: "Неверный формат документа",
          },
          {
            code: "EXPIRED",
            name: "Документ просрочен",
          },
          {
            code: "ILLEGIBLE",
            name: "Документ нечитаем",
          },
        ],
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await certificationApi.getRejectionReasons();

      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/product/certificate/rejection_reasons/list", {}, undefined);
      expect(result).toEqual(expectedResponse);
    });

    it("should get rejection reasons with empty request", async () => {
      const request = {};

      const expectedResponse = {
        result: [],
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await certificationApi.getRejectionReasons(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/product/certificate/rejection_reasons/list", request, undefined);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe("getCertificateStatuses", () => {
    it("should get certificate statuses successfully", async () => {
      const expectedResponse = {
        result: [
          {
            code: "NEW",
            name: "Новый",
          },
          {
            code: "ACTIVE",
            name: "Активный",
          },
          {
            code: "EXPIRED",
            name: "Просрочен",
          },
          {
            code: "REJECTED",
            name: "Отклонен",
          },
        ],
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await certificationApi.getCertificateStatuses();

      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/product/certificate/status/list", {}, undefined);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe("getCertificateTypes", () => {
    it("should get certificate types successfully", async () => {
      const expectedResponse = {
        result: [
          {
            code: "GOST_CERTIFICATE",
            name: "Сертификат соответствия ГОСТ",
            description: "Документ, подтверждающий соответствие товара ГОСТ",
          },
          {
            code: "DECLARATION",
            name: "Декларация о соответствии",
            description: "Документ декларирования соответствия",
          },
          {
            code: "QUALITY_CERTIFICATE",
            name: "Сертификат качества",
          },
        ],
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await certificationApi.getCertificateTypes();

      expect(mockHttpClient.request).toHaveBeenCalledWith("GET", "/v1/product/certificate/types", {}, undefined);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe("unbindCertificate", () => {
    it("should unbind certificate successfully", async () => {
      const request: CertificateUnbindRequest = {
        certificate_id: 12345,
        product_id: ["product-1", "product-2"],
      };

      const expectedResponse = {
        result: [
          {
            product_id: "product-1",
            status: "success",
          },
          {
            product_id: "product-2",
            status: "success",
          },
        ],
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await certificationApi.unbindCertificate(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/product/certificate/unbind", request, undefined);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe("getProductCertificationList (v1 - deprecated)", () => {
    it("should get product certification list v1", async () => {
      const request: ProductCertificationListRequest = {
        page: 1,
        page_size: 100,
      };

      const expectedResponse = {
        result: {
          certification: [
            {
              category_id: 15621,
              category_name: "Электроника",
              has_certificate: true,
              certificate_type: "GOST_CERTIFICATE",
            },
          ],
          total: 1,
        },
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await certificationApi.getProductCertificationList(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/product/certification/list", request, undefined);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe("getCertificateAccordanceTypesV2", () => {
    it("should get certificate accordance types successfully", async () => {
      const expectedResponse = {
        result: {
          accordance_types: [
            {
              id: 1,
              name: "Техрегламент ТР ТС",
              code: "TR_TS",
            },
            {
              id: 2,
              name: "ГОСТ Р",
              code: "GOST_R",
            },
          ],
        },
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await certificationApi.getCertificateAccordanceTypesV2();

      expect(mockHttpClient.request).toHaveBeenCalledWith("GET", "/v2/product/certificate/accordance-types/list", {}, undefined);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe("getProductCertificationListV2", () => {
    it("should get product certification list v2 successfully", async () => {
      const request: ProductCertificationListV2Request = {
        page: 1,
        page_size: 100,
      };

      const expectedResponse = {
        certification: [
          {
            category_id: 15621,
            category_name: "Электроника",
            has_certificate: true,
            certificate_type: "GOST_CERTIFICATE",
            requirements: ["Сертификат соответствия", "Декларация"],
          },
          {
            category_id: 15622,
            category_name: "Одежда",
            has_certificate: false,
          },
        ],
        total: 2,
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await certificationApi.getProductCertificationListV2(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v2/product/certification/list", request, undefined);
      expect(result).toEqual(expectedResponse);
    });

    it("should get product certification list v2 with pagination", async () => {
      const request: ProductCertificationListV2Request = {
        page: 2,
        page_size: 50,
      };

      const expectedResponse = {
        certification: [],
        total: 2,
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await certificationApi.getProductCertificationListV2(request);

      expect(result).toEqual(expectedResponse);
    });
  });

  describe("error handling", () => {
    it("should handle API errors", async () => {
      const request: CertificateListRequest = {
        page: 1,
        page_size: 50,
      };

      const error = new Error("API Error");
      (mockHttpClient.request as any).mockRejectedValue(error);

      await expect(certificationApi.getCertificateList(request)).rejects.toThrow("API Error");
    });

    it("should handle certificate not found errors", async () => {
      const request: CertificateBindRequest = {
        certificate_id: 99999,
        product_id: ["product-1"],
      };

      const error = new Error("Certificate not found");
      (mockHttpClient.request as any).mockRejectedValue(error);

      await expect(certificationApi.bindCertificate(request)).rejects.toThrow("Certificate not found");
    });

    it("should handle validation errors", async () => {
      const request: CertificateCreateRequest = {
        name: "", // Empty name should cause validation error
        type: "INVALID_TYPE",
      };

      const error = new Error("Invalid certificate data");
      (mockHttpClient.request as any).mockRejectedValue(error);

      await expect(certificationApi.createCertificate(request)).rejects.toThrow("Invalid certificate data");
    });
  });

  describe("request options", () => {
    it("should pass custom request options", async () => {
      const request: CertificateListRequest = {
        page: 1,
        page_size: 50,
      };

      const options = {
        timeout: 15000,
        retries: 5,
      };

      const expectedResponse = {
        result: {
          certificates: [],
          total: 0,
        },
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await certificationApi.getCertificateList(request, options);

      expect(mockHttpClient.request).toHaveBeenCalledWith("POST", "/v1/product/certificate/list", request, options);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe("pagination handling", () => {
    it("should handle large page sizes", async () => {
      const request: CertificateListRequest = {
        page: 1,
        page_size: 1000, // Maximum allowed
      };

      const expectedResponse = {
        result: {
          certificates: [],
          total: 0,
        },
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await certificationApi.getCertificateList(request);

      expect(result).toEqual(expectedResponse);
    });

    it("should handle multiple pages", async () => {
      const request: CertificateListRequest = {
        page: 5,
        page_size: 100,
      };

      const expectedResponse = {
        result: {
          certificates: [],
          total: 500,
        },
      };

      (mockHttpClient.request as any).mockResolvedValue(expectedResponse);

      const result = await certificationApi.getCertificateList(request);

      expect(result).toEqual(expectedResponse);
    });
  });
});
