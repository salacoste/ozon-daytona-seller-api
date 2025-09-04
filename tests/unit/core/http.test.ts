/**
 * Unit tests for HttpClient
 * Tests retry logic, timeout handling, and error scenarios
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { HttpClient } from "../../../src/core/http.js";
import { createApiKey, createClientId } from "../../../src/core/types.js";
import { NetworkError, TimeoutError, ApiError, RateLimitError } from "../../../src/core/errors.js";
import type { OzonConfig } from "../../../src/core/types.js";

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("HttpClient", () => {
  let httpClient: HttpClient;
  let config: OzonConfig;

  beforeEach(() => {
    config = {
      apiKey: createApiKey("12345678-1234-5678-9abc-123456789012"),
      clientId: createClientId("12345678"),
      baseUrl: "https://api-seller.ozon.ru",
      timeout: 5000,
      retries: 3,
    };
    httpClient = new HttpClient(config);
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("successful requests", () => {
    it("should make successful GET request", async () => {
      const mockResponse = { result: { test: "data" } };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ "content-type": "application/json" }),
        text: () => Promise.resolve(JSON.stringify(mockResponse)),
      });

      const result = await httpClient.get("/test/endpoint");

      expect(result).toEqual(mockResponse);
      expect(mockFetch).toHaveBeenCalledWith(
        "https://api-seller.ozon.ru/test/endpoint",
        expect.objectContaining({
          method: "GET",
          headers: expect.objectContaining({
            "Api-Key": "12345678-1234-5678-9abc-123456789012",
            "Client-Id": "12345678",
            "Content-Type": "application/json",
          }),
        }),
      );
    });

    it("should make successful POST request with data", async () => {
      const requestData = { product_id: [123, 456] };
      const mockResponse = { result: true };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ "content-type": "application/json" }),
        text: () => Promise.resolve(JSON.stringify(mockResponse)),
      });

      const result = await httpClient.post("/test/endpoint", requestData);

      expect(result).toEqual(mockResponse);
      expect(mockFetch).toHaveBeenCalledWith(
        "https://api-seller.ozon.ru/test/endpoint",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify(requestData),
          headers: expect.objectContaining({
            "Api-Key": "12345678-1234-5678-9abc-123456789012",
            "Client-Id": "12345678",
            "Content-Type": "application/json",
          }),
        }),
      );
    });
  });

  describe("error handling", () => {
    it("should throw ApiError for 4xx responses", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        headers: new Headers({ "content-type": "application/json" }),
        json: () =>
          Promise.resolve({
            error: {
              code: "INVALID_REQUEST",
              message: "Invalid request parameters",
            },
          }),
      });

      await expect(httpClient.get("/test/endpoint")).rejects.toThrow(ApiError);
    });

    it("should throw RateLimitError for 429 responses", async () => {
      // Create client with no retries to avoid timeout
      const noRetryClient = new HttpClient({
        ...config,
        retries: 0,
      });

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 429,
        headers: new Headers({
          "content-type": "application/json",
          "retry-after": "60",
        }),
        text: () =>
          Promise.resolve(
            JSON.stringify({
              error: {
                message: "Too many requests",
              },
            }),
          ),
      });

      await expect(noRetryClient.get("/test/endpoint")).rejects.toThrow(RateLimitError);
    });

    it("should throw NetworkError for network failures", async () => {
      mockFetch.mockRejectedValueOnce(new Error("Network error"));

      await expect(httpClient.get("/test/endpoint")).rejects.toThrow(NetworkError);
    });
  });

  describe("retry logic", () => {
    it("should retry failed requests with exponential backoff", async () => {
      // Mock first two attempts to fail, third to succeed
      mockFetch
        .mockRejectedValueOnce(new Error("Network error"))
        .mockRejectedValueOnce(new Error("Network error"))
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          headers: new Headers({ "content-type": "application/json" }),
          text: () => Promise.resolve(JSON.stringify({ result: "success" })),
        });

      const result = await httpClient.get("/test/endpoint");

      expect(result).toEqual({ result: "success" });
      expect(mockFetch).toHaveBeenCalledTimes(3);
    });

    it("should not retry 4xx client errors", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        headers: new Headers({ "content-type": "application/json" }),
        text: () =>
          Promise.resolve(
            JSON.stringify({
              error: { message: "Bad request" },
            }),
          ),
      });

      await expect(httpClient.get("/test/endpoint")).rejects.toThrow(ApiError);
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    it("should retry 5xx server errors", async () => {
      mockFetch
        .mockResolvedValueOnce({
          ok: false,
          status: 500,
          headers: new Headers({ "content-type": "application/json" }),
          text: () =>
            Promise.resolve(
              JSON.stringify({
                error: { message: "Internal server error" },
              }),
            ),
        })
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          headers: new Headers({ "content-type": "application/json" }),
          text: () => Promise.resolve(JSON.stringify({ result: "recovered" })),
        });

      const result = await httpClient.get("/test/endpoint");

      expect(result).toEqual({ result: "recovered" });
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });

    it("should respect maximum retry limit", async () => {
      mockFetch.mockRejectedValue(new Error("Persistent network error"));

      await expect(httpClient.get("/test/endpoint")).rejects.toThrow(NetworkError);
      expect(mockFetch).toHaveBeenCalledTimes(4); // Initial + 3 retries
    });
  });

  describe("timeout handling", () => {
    it("should timeout long-running requests", async () => {
      // Create HttpClient with minimum timeout for testing and no retries
      const shortTimeoutClient = new HttpClient({
        ...config,
        timeout: 1000,
        retries: 0,
      });

      // Create a promise that resolves after the timeout
      mockFetch.mockImplementationOnce(
        () =>
          new Promise((resolve) =>
            setTimeout(
              () =>
                resolve({
                  ok: true,
                  status: 200,
                  headers: new Headers(),
                  text: () => Promise.resolve("{}"),
                }),
              1500,
            ),
          ), // Resolves after 1500ms, but timeout is 1000ms
      );

      await expect(shortTimeoutClient.get("/test/endpoint")).rejects.toThrow(TimeoutError);
    }, 3000); // Set test timeout to 3 seconds
  });

  describe("request headers", () => {
    it("should include authentication headers", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ "content-type": "application/json" }),
        text: () => Promise.resolve(JSON.stringify({})),
      });

      await httpClient.get("/test/endpoint");

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            "Api-Key": "12345678-1234-5678-9abc-123456789012",
            "Client-Id": "12345678",
          }),
        }),
      );
    });

    it("should merge custom headers with default headers", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ "content-type": "application/json" }),
        text: () => Promise.resolve(JSON.stringify({})),
      });

      await httpClient.get("/test/endpoint", {
        headers: {
          "Custom-Header": "custom-value",
        },
      });

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            "Api-Key": "12345678-1234-5678-9abc-123456789012",
            "Client-Id": "12345678",
            "Custom-Header": "custom-value",
          }),
        }),
      );
    });
  });

  describe("URL construction", () => {
    it("should construct URLs correctly with base URL", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ "content-type": "application/json" }),
        text: () => Promise.resolve(JSON.stringify({})),
      });

      await httpClient.get("/v1/product/list");

      expect(mockFetch).toHaveBeenCalledWith("https://api-seller.ozon.ru/v1/product/list", expect.any(Object));
    });

    it("should handle paths without leading slash", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ "content-type": "application/json" }),
        text: () => Promise.resolve(JSON.stringify({})),
      });

      await httpClient.get("v1/product/list");

      expect(mockFetch).toHaveBeenCalledWith("https://api-seller.ozon.ru/v1/product/list", expect.any(Object));
    });
  });
});
