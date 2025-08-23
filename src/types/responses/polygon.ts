/**
 * Response types for PolygonAPI
 * Polygon binding for delivery zones
 * Ready for manual editing and enhancements
 */

/**
 * Ответ создания полигона доставки
 * Create delivery polygon response
 */
export interface PolygonCreateResponse {
  /** 
   * Идентификатор созданного полигона
   * Created polygon identifier
   */
  polygon_id?: number;
  
  readonly [key: string]: unknown;
}