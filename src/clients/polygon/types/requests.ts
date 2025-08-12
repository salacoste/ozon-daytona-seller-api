/**
 * PolygonAPI request types
 */

import type { PolygonBinding, WarehouseLocation } from './base';

/**
 * Create polygon request
 */
export interface CreatePolygonRequest {
  /** 
   * Polygon coordinates in format `[[[lat long]]]`
   * 
   * Create a polygon by getting its coordinates at https://geojson.io:
   * mark at least 3 points on the map and connect them with lines.
   * 
   * @example "[[[30.149574279785153,59.86550435303646],[30.21205902099609,59.846884387977326],[30.255661010742184,59.86240174913176],[30.149574279785153,59.86550435303646]]]"
   */
  coordinates: string;
}

/**
 * Bind polygon to delivery method request
 */
export interface BindPolygonRequest {
  /** Delivery method ID */
  delivery_method_id: number;
  /** List of polygons to bind */
  polygons: PolygonBinding[];
  /** Warehouse location coordinates */
  warehouse_location: WarehouseLocation;
}