/**
 * CategoryAPI client for Ozon Seller API
 * 
 * Implements the category endpoints from /methods/20-categoryapi.json:
 * - Category tree retrieval
 * - Category attributes listing
 * - Attribute values retrieval with pagination
 * - Attribute values search functionality
 */

import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type {
  GetTreeRequest,
  GetTreeResponse,
  GetAttributesRequest,
  GetAttributesResponse,
  GetAttributeValuesRequest,
  GetAttributeValuesResponse,
  SearchAttributeValuesRequest,
  SearchAttributeValuesResponse
} from './types';

/**
 * Category API client implementing category tree and attributes endpoints
 */
export class CategoryAPI {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Get category tree V1
   * 
   * Returns categories and types in a tree structure.
   * Product creation is only available in leaf-level categories.
   * 
   * @param params - Tree request parameters
   * @returns Category tree structure
   * 
   * @example
   * ```typescript
   * const tree = await client.category.getTreeV1({
   *   language: 'DEFAULT'
   * });
   * 
   * // Navigate through categories
   * tree.data.result.forEach(category => {
   *   console.log(`Category: ${category.category_name} (${category.description_category_id})`);
   *   category.children.forEach(child => {
   *     if (child.type_id) {
   *       console.log(`  Type: ${child.type_name} (${child.type_id})`);
   *     }
   *   });
   * });
   * ```
   */
  async getTreeV1(params: GetTreeRequest = {}): Promise<IHttpResponse<GetTreeResponse>> {
    return this.httpClient.post('/v1/description-category/tree', {
      language: 'DEFAULT',
      ...params
    });
  }

  /**
   * Get category attributes V1
   * 
   * Returns attributes for specified category and product type.
   * If dictionary_id is 0, the attribute has no nested dictionaries.
   * If dictionary_id is non-zero, use getAttributeValuesV1 to get values.
   * 
   * @param params - Attributes request parameters
   * @returns List of category attributes
   * 
   * @example
   * ```typescript
   * const attributes = await client.category.getAttributesV1({
   *   description_category_id: 200000933,
   *   type_id: 93080,
   *   language: 'DEFAULT'
   * });
   * 
   * attributes.data.result.forEach(attr => {
   *   console.log(`${attr.name}: ${attr.description}`);
   *   console.log(`  Required: ${attr.is_required}, Dictionary: ${attr.dictionary_id}`);
   * });
   * ```
   */
  async getAttributesV1(params: GetAttributesRequest): Promise<IHttpResponse<GetAttributesResponse>> {
    return this.httpClient.post('/v1/description-category/attribute', {
      language: 'DEFAULT',
      ...params
    });
  }

  /**
   * Get attribute values V1
   * 
   * Returns dictionary values for a specific attribute.
   * Supports pagination using last_value_id.
   * 
   * @param params - Attribute values request parameters
   * @returns List of attribute values with pagination info
   * 
   * @example
   * ```typescript
   * const values = await client.category.getAttributeValuesV1({
   *   attribute_id: 85,
   *   description_category_id: 17054869,
   *   type_id: 97311,
   *   limit: 100  // Required parameter
   * });
   * 
   * values.data.result.forEach(value => {
   *   console.log(`${value.id}: ${value.value}`);
   *   if (value.picture) {
   *     console.log(`  Picture: ${value.picture}`);
   *   }
   * });
   * 
   * // Handle pagination
   * if (values.data.has_next) {
   *   const lastId = values.data.result[values.data.result.length - 1].id;
   *   const nextPage = await client.category.getAttributeValuesV1({
   *     ...params,
   *     last_value_id: lastId
   *   });
   * }
   * ```
   */
  async getAttributeValuesV1(params: GetAttributeValuesRequest): Promise<IHttpResponse<GetAttributeValuesResponse>> {
    return this.httpClient.post('/v1/description-category/attribute/values', {
      language: 'DEFAULT',
      ...params
    });
  }

  /**
   * Search attribute values V1
   * 
   * Returns dictionary values for an attribute that match the search term.
   * 
   * @param params - Search request parameters
   * @returns List of matching attribute values
   * 
   * @example
   * ```typescript
   * const searchResults = await client.category.searchAttributeValuesV1({
   *   attribute_id: 85,
   *   description_category_id: 17054869,
   *   type_id: 97311,
   *   value: 'Nike',
   *   limit: 50  // Required parameter
   * });
   * 
   * searchResults.data.result.forEach(value => {
   *   console.log(`Found: ${value.value} (ID: ${value.id})`);
   * });
   * ```
   */
  async searchAttributeValuesV1(params: SearchAttributeValuesRequest): Promise<IHttpResponse<SearchAttributeValuesResponse>> {
    return this.httpClient.post('/v1/description-category/attribute/values/search', {
      language: 'DEFAULT',
      ...params
    });
  }
}