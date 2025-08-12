/**
 * ProductAPI client - Product management and catalog operations
 * 
 * Provides access to Ozon product catalog management including:
 * - Product creation, update, and import operations
 * - Product information retrieval and listing
 * - Product attributes and characteristics management
 * - Image and media uploads
 * - Archive and catalog management
 * 
 * Features:
 * - Bulk product import with validation
 * - Detailed product information queries
 * - Image and video management
 * - Product rating and analytics
 * - Archive/unarchive operations
 */

import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type {
  IV3ImportProductsRequest,
  IV3ImportProductsResponse,
  IProductGetImportProductsInfoRequest,
  IProductGetImportProductsInfoResponse,
  IProductImportProductsBySKURequest,
  IProductImportProductsBySKUResponse,
  IV1ProductUpdateAttributesRequest,
  IV1ProductUpdateAttributesResponse,
  IProductv1ProductImportPicturesRequest,
  IProductv1ProductInfoPicturesResponse,
  IProductv3GetProductListRequest,
  IProductv3GetProductListResponse,
  IV3GetProductInfoListRequest,
  IV3GetProductInfoListResponse,
  IProductv4GetProductAttributesV4Request,
  IV4GetProductAttributesResponsePdf,
  IV4GetUploadQuotaResponse,
  IProductProductArchiveRequest,
  IProductProductUnarchiveRequest,
  IProductGetProductInfoDescriptionRequest,
  IProductGetProductInfoDescriptionResponse,
  IV1ProductUpdateOfferIdRequest,
  IV1ProductUpdateOfferIdResponse,
} from '../../types/generated/productapi';

/**
 * ProductAPI client for product management operations
 * 
 * @example
 * ```typescript
 * import { OzonClient } from '@ozon/sdk';
 * 
 * const client = new OzonClient({ clientId, apiKey });
 * 
 * // Get product list
 * const products = await client.product.getList({
 *   filter: {
 *     visibility: 'ALL'
 *   },
 *   limit: 100
 * });
 * 
 * // Import new products
 * const importResult = await client.product.importV3({
 *   items: [
 *     {
 *       offer_id: 'TEST-001',
 *       name: 'Test Product',
 *       description_category_id: 15621,
 *       type_id: 97311,
 *       attributes: [
 *         { id: 85, values: [{ value: 'Test Brand' }] }
 *       ],
 *       images: ['https://example.com/image.jpg']
 *     }
 *   ]
 * });
 * ```
 */
export class ProductAPI {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Create or update products (v3)
   * 
   * Main method for creating new products or updating existing ones.
   * Supports up to 100 products per request with comprehensive attribute management.
   * 
   * @param params - Import request with product items and configuration
   * @returns Import task information
   * 
   * @example
   * ```typescript
   * const result = await client.product.importV3({
   *   items: [
   *     {
   *       offer_id: 'SAMPLE-001',
   *       name: 'Sample Product',
   *       description_category_id: 15621,
   *       type_id: 97311,
   *       price: '1299.99',
   *       old_price: '1599.99',
   *       currency_code: 'RUB',
   *       vat: '0.2',
   *       weight: 500,
   *       weight_unit: 'g',
   *       width: 100,
   *       height: 50,
   *       depth: 20,
   *       dimension_unit: 'mm',
   *       attributes: [
   *         {
   *           id: 85, // Brand
   *           values: [{ dictionary_value_id: 5060050, value: 'Samsung' }]
   *         },
   *         {
   *           id: 5076, // Product type
   *           values: [{ dictionary_value_id: 971082156, value: 'Accessories' }]
   *         }
   *       ],
   *       images: [
   *         'https://example.com/main-image.jpg',
   *         'https://example.com/side-image.jpg'
   *       ],
   *       primary_image: 'https://example.com/primary-image.jpg'
   *     }
   *   ]
   * });
   * 
   * console.log(`Import task ID: ${result.data.result?.task_id}`);
   * ```
   */
  async importV3(params: IV3ImportProductsRequest): Promise<IHttpResponse<IV3ImportProductsResponse>> {
    return this.httpClient.post('/v3/product/import', params);
  }

  /**
   * Get import task status and results
   * 
   * Check the status of a product import operation, including any errors
   * that occurred during processing.
   * 
   * @param params - Task ID from import operation
   * @returns Task status with detailed results and errors
   * 
   * @example
   * ```typescript
   * const status = await client.product.getImportInfo({ task_id: 123456 });
   * 
   * console.log(`Total items: ${status.data.result?.total}`);
   * console.log(`Processed: ${status.data.result?.processed}`);
   * 
   * if (status.data.result?.errors) {
   *   for (const error of status.data.result.errors) {
   *     console.log(`Error in ${error.offer_id}: ${error.message}`);
   *   }
   * }
   * ```
   */
  async getImportInfo(params: IProductGetImportProductsInfoRequest): Promise<IHttpResponse<IProductGetImportProductsInfoResponse>> {
    return this.httpClient.post('/v1/product/import/info', params);
  }

  /**
   * Create products by copying from existing SKUs
   * 
   * Create new products by copying data from existing products using their SKUs.
   * This is useful for creating product variations or similar products.
   * 
   * @param params - Request with SKUs to copy and new product data
   * @returns Import results with task information
   * 
   * @example
   * ```typescript
   * const result = await client.product.importBySku({
   *   items: [
   *     {
   *       sku: 148313766, // Existing product SKU to copy
   *       name: "New Product Name",
   *       offer_id: "NEW-OFFER-001",
   *       price: "999.99",
   *       old_price: "1199.99",
   *       currency_code: "RUB"
   *     }
   *   ]
   * });
   * 
   * console.log(`Task ID: ${result.data.result?.task_id}`);
   * ```
   */
  async importBySku(params: IProductImportProductsBySKURequest): Promise<IHttpResponse<IProductImportProductsBySKUResponse>> {
    return this.httpClient.post('/v1/product/import-by-sku', params);
  }

  /**
   * Update product attributes
   * 
   * Update product attributes without changing other product data.
   * Creates a task for processing the attribute updates.
   * 
   * @param params - Request with product attributes to update
   * @returns Task information for attribute update operation
   * 
   * @example
   * ```typescript
   * const result = await client.product.updateAttributes({
   *   items: [
   *     {
   *       offer_id: "PROD-001",
   *       attributes: [
   *         {
   *           id: 85, // Brand attribute
   *           values: [{ dictionary_value_id: 5060050, value: "Samsung" }]
   *         },
   *         {
   *           id: 5076, // Product type
   *           values: [{ value: "Smartphone" }]
   *         }
   *       ]
   *     }
   *   ]
   * });
   * 
   * console.log(`Task ID: ${result.data.result?.task_id}`);
   * ```
   */
  async updateAttributes(params: IV1ProductUpdateAttributesRequest): Promise<IHttpResponse<IV1ProductUpdateAttributesResponse>> {
    return this.httpClient.post('/v1/product/attributes/update', params);
  }

  /**
   * Import product images
   * 
   * Replace all product images with new ones. This completely replaces
   * the existing image set, so include all images you want to keep.
   * 
   * @param params - Request with image URLs and configuration
   * @returns Import results and processing status
   * 
   * @example
   * ```typescript
   * const result = await client.product.importPictures({
   *   product_id: 123456,
   *   images: [
   *     { url: "https://example.com/main-image.jpg", default: true },
   *     { url: "https://example.com/side-view.jpg" },
   *     { url: "https://example.com/back-view.jpg" }
   *   ],
   *   images360: [
   *     { url: "https://example.com/360/image001.jpg" },
   *     { url: "https://example.com/360/image002.jpg" }
   *   ],
   *   color_image: "https://example.com/color-swatch.jpg"
   * });
   * 
   * console.log(`Images imported successfully: ${result.data.result?.pictures?.length} images`);
   * ```
   */
  async importPictures(params: IProductv1ProductImportPicturesRequest): Promise<IHttpResponse<IProductv1ProductInfoPicturesResponse>> {
    return this.httpClient.post('/v1/product/pictures/import', params);
  }

  /**
   * Get product list with filtering and pagination (v3)
   * 
   * Retrieve products from your catalog with comprehensive filtering options
   * and cursor-based pagination support.
   * 
   * @param params - Filter and pagination parameters
   * @returns Product list with pagination info
   * 
   * @example
   * ```typescript
   * // Get all visible products
   * const products = await client.product.getList({
   *   filter: {
   *     visibility: 'VISIBLE'
   *   },
   *   limit: 50
   * });
   * 
   * console.log(`Found ${products.data.result?.items.length} products`);
   * 
   * for (const product of products.data.result?.items || []) {
   *   console.log(`${product.name} (${product.offer_id})`);
   *   console.log(`  ID: ${product.id}`);
   *   console.log(`  Status: ${product.status?.state}`);
   *   console.log(`  Created: ${product.created_at}`);
   * }
   * 
   * // Continue pagination if needed
   * if (products.data.result?.has_next) {
   *   const nextPage = await client.product.getList({
   *     ...params,
   *     cursor: products.data.result.cursor
   *   });
   * }
   * ```
   * 
   * @example
   * ```typescript
   * // Get products by specific offer IDs
   * const specificProducts = await client.product.getList({
   *   filter: {
   *     offer_id: ['PROD-001', 'PROD-002', 'PROD-003']
   *   },
   *   limit: 10
   * });
   * ```
   */
  async getList(params: IProductv3GetProductListRequest): Promise<IHttpResponse<IProductv3GetProductListResponse>> {
    return this.httpClient.post('/v3/product/list', params);
  }

  /**
   * Get detailed product information (v3)
   * 
   * Retrieve comprehensive product information including attributes,
   * images, pricing, and status for specified products.
   * 
   * @param params - Product identifiers and optional fields to include
   * @returns Detailed product information
   * 
   * @example
   * ```typescript
   * // Get detailed info for specific products
   * const productInfo = await client.product.getInfoList({
   *   filter: {
   *     product_id: [123456789, 987654321],
   *     visibility: 'VISIBLE'
   *   },
   *   limit: 10
   * });
   * 
   * for (const product of productInfo.data.result?.items || []) {
   *   console.log(`Product: ${product.name}`);
   *   console.log(`  Offer ID: ${product.offer_id}`);
   *   console.log(`  Category: ${product.description_category_id}`);
   *   console.log(`  Status: ${product.status?.state}`);
   *   
   *   if (product.images) {
   *     console.log(`  Images: ${product.images.length} found`);
   *   }
   *   
   *   if (product.sources) {
   *     for (const source of product.sources) {
   *       console.log(`  Source: ${source.source} - ${source.sku}`);
   *     }
   *   }
   * }
   * ```
   */
  async getInfoList(params: IV3GetProductInfoListRequest): Promise<IHttpResponse<IV3GetProductInfoListResponse>> {
    return this.httpClient.post('/v3/product/info/list', params);
  }

  /**
   * Get product attributes (v4)
   * 
   * Retrieve product attributes and characteristics with support for
   * filtering by specific products and attribute types.
   * 
   * @param params - Filter parameters for attributes
   * @returns Product attributes information
   * 
   * @example
   * ```typescript
   * const attributes = await client.product.getAttributesV4({
   *   filter: {
   *     product_id: [123456789],
   *     visibility: 'VISIBLE'
   *   },
   *   limit: 50,
   *   sort_dir: 'ASC'
   * });
   * 
   * for (const item of attributes.data.result?.items || []) {
   *   console.log(`Product: ${item.id} (${item.offer_id})`);
   *   
   *   if (item.attributes) {
   *     for (const attr of item.attributes) {
   *       console.log(`  ${attr.attribute_id}: ${attr.values?.map(v => v.value).join(', ')}`);
   *     }
   *   }
   * }
   * ```
   */
  async getAttributesV4(params: IProductv4GetProductAttributesV4Request): Promise<IHttpResponse<IV4GetProductAttributesResponsePdf>> {
    return this.httpClient.post('/v4/product/info/attributes', params);
  }

  /**
   * Get daily upload quota information
   * 
   * Check your daily limit for product creation and updates to avoid
   * exceeding the allowed quota.
   * 
   * @returns Current quota status and limits
   * 
   * @example
   * ```typescript
   * const quota = await client.product.getUploadQuota();
   * 
   * console.log(`Daily limit: ${quota.data.result?.daily_create_limit}`);
   * console.log(`Today's usage: ${quota.data.result?.daily_create_usage}`);
   * console.log(`Remaining: ${quota.data.result?.daily_create_limit - quota.data.result?.daily_create_usage}`);
   * 
   * if (quota.data.result?.daily_create_usage >= quota.data.result?.daily_create_limit) {
   *   console.log('Daily quota exceeded. Please try again tomorrow.');
   * }
   * ```
   */
  async getUploadQuota(): Promise<IHttpResponse<IV4GetUploadQuotaResponse>> {
    return this.httpClient.post('/v4/product/info/limit', {});
  }

  /**
   * Archive products
   * 
   * Move products to archive, making them invisible to customers
   * while preserving their data and settings.
   * 
   * @param params - Products to archive
   * @returns Archive operation results
   * 
   * @example
   * ```typescript
   * const archiveResult = await client.product.archive({
   *   products: [
   *     { offer_id: 'PROD-001' },
   *     { offer_id: 'PROD-002' }
   *   ]
   * });
   * 
   * console.log(`Archived ${archiveResult.data.result?.length} products`);
   * 
   * for (const result of archiveResult.data.result || []) {
   *   if (result.errors) {
   *     console.log(`Error archiving ${result.offer_id}: ${result.errors[0]?.message}`);
   *   } else {
   *     console.log(`Successfully archived ${result.offer_id}`);
   *   }
   * }
   * ```
   */
  async archive(params: IProductProductArchiveRequest): Promise<IHttpResponse<any>> {
    return this.httpClient.post('/v1/product/archive', params);
  }

  /**
   * Unarchive products
   * 
   * Restore products from archive, making them available for sale again.
   * 
   * @param params - Products to unarchive
   * @returns Unarchive operation results
   * 
   * @example
   * ```typescript
   * const unarchiveResult = await client.product.unarchive({
   *   products: [
   *     { offer_id: 'PROD-001' },
   *     { offer_id: 'PROD-002' }
   *   ]
   * });
   * 
   * console.log(`Unarchived ${unarchiveResult.data.result?.length} products`);
   * 
   * for (const result of unarchiveResult.data.result || []) {
   *   if (result.errors) {
   *     console.log(`Error unarchiving ${result.offer_id}: ${result.errors[0]?.message}`);
   *   } else {
   *     console.log(`Successfully unarchived ${result.offer_id}`);
   *   }
   * }
   * ```
   */
  async unarchive(params: IProductProductUnarchiveRequest): Promise<IHttpResponse<any>> {
    return this.httpClient.post('/v1/product/unarchive', params);
  }

  // ======= NEW METHODS FOR SECTION 14 (Part 3 of 4) =======

  /**
   * Get product description
   * 
   * Retrieve detailed product description by product ID or offer ID.
   * Exactly one identifier must be provided.
   * 
   * @param params - Request with product identifier
   * @returns Product description information
   * 
   * @example
   * ```typescript
   * // Get description by product ID
   * const description = await client.product.getProductDescription({
   *   product_id: 123456789
   * });
   * 
   * console.log(`Product: ${description.data.result?.name}`);
   * console.log(`Description: ${description.data.result?.description}`);
   * console.log(`Category: ${description.data.result?.description_category_id}`);
   * 
   * // Get description by offer ID
   * const descriptionByOffer = await client.product.getProductDescription({
   *   offer_id: 'PROD-001'
   * });
   * ```
   */
  async getProductDescription(params: IProductGetProductInfoDescriptionRequest): Promise<IHttpResponse<IProductGetProductInfoDescriptionResponse>> {
    // Validation: require exactly one identifier
    const hasProductId = params.product_id !== undefined;
    const hasOfferId = params.offer_id !== undefined;
    
    if (!hasProductId && !hasOfferId) {
      throw new Error('Either product_id or offer_id must be provided');
    }
    
    if (hasProductId && hasOfferId) {
      throw new Error('Cannot provide both product_id and offer_id - use exactly one');
    }

    return this.httpClient.post('/v1/product/info/description', params);
  }

  /**
   * Update product offer ID
   * 
   * Change the offer_id of an existing product. The new offer_id must be unique
   * within your product catalog.
   * 
   * @param params - Request with product ID and new offer ID
   * @returns Update operation results
   * 
   * @example
   * ```typescript
   * const updateResult = await client.product.updateOfferId({
   *   update_offer_id: [
   *     {
   *       offer_id: 'OLD-OFFER-001',
   *       new_offer_id: 'NEW-OFFER-001',
   *       product_id: 123456789
   *     }
   *   ]
   * });
   * 
   * for (const result of updateResult.data.result || []) {
   *   if (result.errors) {
   *     console.log(`Error updating ${result.offer_id}: ${result.errors[0]?.message}`);
   *   } else {
   *     console.log(`Successfully updated offer ID for product ${result.product_id}`);
   *   }
   * }
   * ```
   */
  async updateOfferId(params: IV1ProductUpdateOfferIdRequest): Promise<IHttpResponse<IV1ProductUpdateOfferIdResponse>> {
    // Validation: require update_offer_id array with valid items
    const updateItems = params.update_offer_id as any[];
    if (!updateItems || !Array.isArray(updateItems) || updateItems.length === 0) {
      throw new Error('update_offer_id array cannot be empty');
    }

    for (const item of updateItems) {
      if (!item.product_id) {
        throw new Error('product_id is required for each update item');
      }
      if (!item.new_offer_id) {
        throw new Error('new_offer_id is required for each update item');
      }
      if (item.offer_id === item.new_offer_id) {
        throw new Error(`new_offer_id "${item.new_offer_id}" must be different from current offer_id`);
      }
    }

    return this.httpClient.post('/v1/product/update/offer-id', params);
  }

  // ======= SECTION 13 METHODS (Part 2 of 4) =======

  /**
   * Get product list V3 - Section 13 compliant method
   * @see getList - Use the main getList method which already implements v3 endpoint
   */
  async getProductListV3(params: IProductv3GetProductListRequest): Promise<IHttpResponse<IProductv3GetProductListResponse>> {
    return this.getList(params);
  }

  /**
   * Get product info list V3 - Section 13 compliant method
   * @see getInfoList - Use the main getInfoList method which already implements v3 endpoint
   */
  async getProductInfoListV3(params: IV3GetProductInfoListRequest): Promise<IHttpResponse<IV3GetProductInfoListResponse>> {
    return this.getInfoList(params);
  }

  /**
   * Get product attributes V4 - Section 13 compliant method
   * @see getAttributesV4 - Use the main getAttributesV4 method
   */
  async getProductAttributesV4(params: IProductv4GetProductAttributesV4Request): Promise<IHttpResponse<IV4GetProductAttributesResponsePdf>> {
    return this.getAttributesV4(params);
  }

  // ======= PAGINATION ITERATORS =======

  /**
   * Iterate through product list with last_id based pagination
   * 
   * @param params - Product list parameters
   * @param config - Pagination configuration
   * @returns Async iterator for product pages
   * 
   * @example
   * ```typescript
   * for await (const page of client.product.iterateProductListV3({ 
   *   filter: { visibility: 'VISIBLE' },
   *   limit: 100 
   * })) {
   *   console.log(`Page ${page.pageNumber}: ${page.value.data.result?.items?.length} products`);
   *   
   *   for (const product of page.value.data.result?.items || []) {
   *     console.log(`- ${product.name} (${product.offer_id})`);
   *   }
   * }
   * ```
   */
  async *iterateProductListV3(
    params: IProductv3GetProductListRequest,
    config: { maxPages?: number; delayBetweenPages?: number } = {}
  ) {
    const { maxPages = 100, delayBetweenPages = 0 } = config;
    let pageNumber = 1;
    let lastId: string | undefined;

    while (pageNumber <= maxPages) {
      const pageParams: IProductv3GetProductListRequest = {
        ...params,
        ...(lastId ? { last_id: lastId } : {})
      };

      const response = await this.getProductListV3(pageParams);
      
      yield {
        value: response,
        pageNumber,
        totalFetched: pageNumber,
        done: false,
      };

      // Check if we should continue based on last_id
      const result = response.data.result;
      if (!result?.last_id || !result.items || (result.items as any[]).length === 0) {
        break;
      }

      lastId = result.last_id;
      pageNumber++;

      if (delayBetweenPages > 0) {
        await new Promise(resolve => setTimeout(resolve, delayBetweenPages));
      }
    }
  }

  // ======= SECTION 14 METHODS (Part 3 of 4) =======

  /**
   * Get product description V1 - Section 14 compliant method
   * @see getProductDescription - Use the main getProductDescription method
   */
  async getProductDescriptionV1(params: IProductGetProductInfoDescriptionRequest): Promise<IHttpResponse<IProductGetProductInfoDescriptionResponse>> {
    return this.getProductDescription(params);
  }

  /**
   * Get upload quota V4 - Section 14 compliant method
   * @see getUploadQuota - Use the main getUploadQuota method which already implements v4 endpoint
   */
  async getUploadQuotaV4(): Promise<IHttpResponse<IV4GetUploadQuotaResponse>> {
    return this.getUploadQuota();
  }

  /**
   * Update offer ID V1 - Section 14 compliant method
   * @see updateOfferId - Use the main updateOfferId method
   */
  async updateOfferIdV1(params: IV1ProductUpdateOfferIdRequest): Promise<IHttpResponse<IV1ProductUpdateOfferIdResponse>> {
    return this.updateOfferId(params);
  }

  /**
   * Archive products V1 - Section 14 compliant method
   * @see archive - Use the main archive method which already implements v1 endpoint
   */
  async archiveV1(params: IProductProductArchiveRequest): Promise<IHttpResponse<any>> {
    return this.archive(params);
  }

  /**
   * Unarchive products V1 - Section 14 compliant method
   * @see unarchive - Use the main unarchive method which already implements v1 endpoint
   */
  async unarchiveV1(params: IProductProductUnarchiveRequest): Promise<IHttpResponse<any>> {
    return this.unarchive(params);
  }
}