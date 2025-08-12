/**
 * PolygonAPI base types
 */

/**
 * Polygon binding information
 */
export interface PolygonBinding {
  /** Polygon ID */
  polygon_id: number;
  /** Delivery time in minutes within this polygon */
  time: number;
}

/**
 * Warehouse location coordinates
 */
export interface WarehouseLocation {
  /** Geographic latitude of the warehouse */
  lat: string;
  /** Geographic longitude of the warehouse */
  lon: string;
}