/**
 * PolygonAPI response types
 */

/**
 * Create polygon response
 */
export interface CreatePolygonResponse {
  /** Created polygon ID */
  polygon_id?: number;
}

/**
 * Bind polygon response (empty response indicates success)
 */
export interface BindPolygonResponse {
  // Empty response
}