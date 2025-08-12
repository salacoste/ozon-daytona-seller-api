/**
 * BarcodeAPI client for Ozon Seller API
 * 
 * Implements product barcode management endpoints from /methods/22-barcodeapi.json:
 * - Add existing barcodes to products
 * - Generate new barcodes for products
 * 
 * Rate limits: 20 requests per minute per seller account
 * Batch limits: Maximum 100 products per request
 * Product limits: Up to 100 barcodes per product
 */

import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type {
  AddBarcodeRequest,
  AddBarcodeResponse,
  GenerateBarcodeRequest,
  GenerateBarcodeResponse,
  BarcodeAssignment
} from './types';

/**
 * BarcodeAPI client for managing product barcodes
 * 
 * Provides functionality to add existing barcodes to products or generate
 * new barcodes when products don't have them. Essential for product
 * identification and fulfillment operations.
 * 
 * **Rate Limits:**
 * - 20 requests per minute per seller account
 * - Maximum 100 products per request
 * - Up to 100 barcodes per product
 * 
 * @example
 * ```typescript
 * // Add existing barcodes to products
 * const addResult = await client.barcode.addBarcode({
 *   barcodes: [
 *     { barcode: '4607002994359', sku: 123456 },
 *     { barcode: '4607002994366', sku: 123457 }
 *   ]
 * });
 * 
 * if (addResult.data.errors && addResult.data.errors.length > 0) {
 *   addResult.data.errors.forEach(error => {
 *     console.error(`Failed to add barcode ${error.barcode}: ${error.error}`);
 *   });
 * } else {
 *   console.log('All barcodes added successfully');
 * }
 * 
 * // Generate new barcodes for products without them
 * const generateResult = await client.barcode.generateBarcode({
 *   product_ids: ['789012', '789013', '789014']
 * });
 * 
 * if (generateResult.data.errors && generateResult.data.errors.length > 0) {
 *   generateResult.data.errors.forEach(error => {
 *     console.error(`Failed to generate barcode for product ${error.product_id}: ${error.error}`);
 *   });
 * } else {
 *   console.log('All barcodes generated successfully');
 * }
 * ```
 */
export class BarcodeAPI {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Add existing barcode to product
   * 
   * If a product has a barcode that is not registered in the Ozon system,
   * use this method to link it. If the product doesn't have a barcode,
   * use generateBarcode() method instead.
   * 
   * **Limits:**
   * - Maximum 100 products per request
   * - Up to 100 barcodes per product
   * - Rate limit: 20 requests per minute per seller account
   * 
   * @param params - Barcode assignment parameters
   * @returns Result of barcode assignment with any errors
   * 
   * @example
   * ```typescript
   * // Add a single barcode
   * const result = await client.barcode.addBarcode({
   *   barcodes: [
   *     { barcode: '4607002994359', sku: 123456 }
   *   ]
   * });
   * 
   * // Add multiple barcodes in batch
   * const batchResult = await client.barcode.addBarcode({
   *   barcodes: [
   *     { barcode: '4607002994359', sku: 123456 },
   *     { barcode: '4607002994366', sku: 123457 },
   *     { barcode: '4607002994373', sku: 123458 }
   *   ]
   * });
   * 
   * // Handle errors
   * if (batchResult.data.errors && batchResult.data.errors.length > 0) {
   *   console.log(`${batchResult.data.errors.length} barcodes failed:`);
   *   batchResult.data.errors.forEach(error => {
   *     console.error(`SKU ${error.sku}: ${error.error} (code: ${error.code})`);
   *   });
   * } else {
   *   console.log('All barcodes added successfully');
   * }
   * 
   * // Add multiple barcodes to one product
   * const multiBarcode = await client.barcode.addBarcode({
   *   barcodes: [
   *     { barcode: '4607002994359', sku: 123456 },
   *     { barcode: '8594002994359', sku: 123456 }, // Same SKU, different barcode
   *   ]
   * });
   * ```
   */
  async addBarcode(
    params: AddBarcodeRequest
  ): Promise<IHttpResponse<AddBarcodeResponse>> {
    return this.httpClient.post('/v1/barcode/add', params);
  }

  /**
   * Generate barcode for product
   * 
   * If a product doesn't have a barcode, use this method to generate one.
   * If the product already has a barcode but it's not in the Ozon system,
   * use addBarcode() method instead.
   * 
   * **Limits:**
   * - Maximum 100 products per request
   * - Rate limit: 20 requests per minute per seller account
   * 
   * @param params - Barcode generation parameters
   * @returns Result of barcode generation with any errors
   * 
   * @example
   * ```typescript
   * // Generate barcode for a single product
   * const result = await client.barcode.generateBarcode({
   *   product_ids: ['789012']
   * });
   * 
   * // Generate barcodes for multiple products
   * const batchResult = await client.barcode.generateBarcode({
   *   product_ids: ['789012', '789013', '789014', '789015']
   * });
   * 
   * // Handle errors
   * if (batchResult.data.errors && batchResult.data.errors.length > 0) {
   *   console.log(`${batchResult.data.errors.length} barcodes failed to generate:`);
   *   batchResult.data.errors.forEach(error => {
   *     console.error(`Product ${error.product_id}: ${error.error} (code: ${error.code})`);
   *   });
   *   
   *   // Get list of successful product IDs
   *   const failedIds = new Set(batchResult.data.errors.map(e => e.product_id));
   *   const requestedIds = ['789012', '789013', '789014', '789015'];
   *   const successfulIds = requestedIds.filter(id => !failedIds.has(parseInt(id)));
   *   console.log(`Successfully generated barcodes for: ${successfulIds.join(', ')}`);
   * } else {
   *   console.log('All barcodes generated successfully');
   * }
   * 
   * // Process in batches if you have more than 100 products
   * async function generateBarcodesInBatches(productIds: string[]) {
   *   const batchSize = 100;
   *   const errors = [];
   *   
   *   for (let i = 0; i < productIds.length; i += batchSize) {
   *     const batch = productIds.slice(i, i + batchSize);
   *     const result = await client.barcode.generateBarcode({
   *       product_ids: batch
   *     });
   *     
   *     if (result.data.errors) {
   *       errors.push(...result.data.errors);
   *     }
   *     
   *     // Respect rate limit (20 req/min = 3 seconds between requests)
   *     if (i + batchSize < productIds.length) {
   *       await new Promise(resolve => setTimeout(resolve, 3000));
   *     }
   *   }
   *   
   *   return errors;
   * }
   * ```
   */
  async generateBarcode(
    params: GenerateBarcodeRequest
  ): Promise<IHttpResponse<GenerateBarcodeResponse>> {
    return this.httpClient.post('/v1/barcode/generate', params);
  }

  /**
   * Helper method to process barcode operations in batches
   * 
   * Since the API has a limit of 100 items per request and 20 requests per minute,
   * this helper manages batching and rate limiting automatically.
   * 
   * @param items - Items to process
   * @param batchSize - Maximum items per batch (default: 100)
   * @param delayMs - Delay between batches in milliseconds (default: 3000)
   * @param processor - Function to process each batch
   * @returns Combined results from all batches
   * 
   * @example
   * ```typescript
   * // Process barcode additions in batches
   * const barcodes: BarcodeAssignment[] = [
   *   // ... potentially hundreds of items
   * ];
   * 
   * const errors = await client.barcode.processBarcodesBatch(
   *   barcodes,
   *   100,
   *   3000,
   *   async (batch) => {
   *     const result = await client.barcode.addBarcode({ barcodes: batch });
   *     return result.data.errors || [];
   *   }
   * );
   * 
   * console.log(`Total errors: ${errors.length}`);
   * ```
   * 
   * @internal
   */
  async processBarcodesBatch<T, R>(
    items: T[],
    batchSize: number = 100,
    delayMs: number = 3000,
    processor: (batch: T[]) => Promise<R[]>
  ): Promise<R[]> {
    const results: R[] = [];
    
    for (let i = 0; i < items.length; i += batchSize) {
      const batch = items.slice(i, i + batchSize);
      const batchResults = await processor(batch);
      results.push(...batchResults);
      
      // Add delay between batches to respect rate limit
      if (i + batchSize < items.length && delayMs > 0) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }
    
    return results;
  }
}

// Re-export types for convenience
export type * from './types';