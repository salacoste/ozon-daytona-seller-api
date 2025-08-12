/**
 * PolygonAPI client for Ozon Seller API
 * 
 * Implements delivery polygon management endpoints from /methods/24-polygonapi.json:
 * - Create delivery polygons with geographical boundaries
 * - Bind polygons to delivery methods with delivery times
 * 
 * Used for defining geographical areas for delivery services with 
 * specific delivery timeframes and warehouse locations.
 */

import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type {
  CreatePolygonRequest,
  CreatePolygonResponse,
  BindPolygonRequest,
  BindPolygonResponse,
  PolygonBinding,
  WarehouseLocation
} from './types';

/**
 * PolygonAPI client for managing delivery polygons
 * 
 * Provides functionality to create geographical delivery areas and bind them
 * to delivery methods. Essential for sellers offering regional delivery
 * services with different time guarantees based on location.
 * 
 * **Key Concepts:**
 * - **Polygon**: Geographical area defined by coordinate points
 * - **Binding**: Association between polygon, delivery method, and delivery time
 * - **Warehouse Location**: Central point for distance calculations
 * 
 * @example
 * ```typescript
 * // 1. Create a delivery polygon
 * const polygonResult = await client.polygon.createPolygon({
 *   coordinates: "[[[30.149574,59.865504],[30.212059,59.846884],[30.255661,59.862402],[30.149574,59.865504]]]"
 * });
 * 
 * const polygonId = polygonResult.data.polygon_id!;
 * console.log(`Created polygon: ${polygonId}`);
 * 
 * // 2. Bind polygon to delivery method
 * await client.polygon.bindPolygon({
 *   delivery_method_id: 123,
 *   polygons: [
 *     { polygon_id: polygonId, time: 60 } // 60 minutes delivery time
 *   ],
 *   warehouse_location: {
 *     lat: "59.856234",
 *     lon: "30.198765"
 *   }
 * });
 * 
 * console.log('Polygon successfully bound to delivery method');
 * ```
 */
export class PolygonAPI {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Create delivery polygon
   * 
   * Creates a geographical polygon that can be added to a delivery method.
   * Use https://geojson.io to create polygon coordinates: mark at least 
   * 3 points on the map and connect them with lines.
   * 
   * **Requirements:**
   * - Minimum 3 points to form a polygon
   * - First and last coordinate points must be identical (GeoJSON standard)
   * - At least 4 unique vertices for complete polygons
   * - Each coordinate point must have both latitude and longitude
   * 
   * @param params - Polygon creation parameters
   * @returns Created polygon information
   * 
   * @example
   * ```typescript
   * // Create a simple delivery polygon (St. Petersburg area example)
   * const result = await client.polygon.createPolygon({
   *   coordinates: "[[[30.149574279785153,59.86550435303646],[30.21205902099609,59.846884387977326],[30.255661010742184,59.86240174913176],[30.149574279785153,59.86550435303646]]]"
   * });
   * 
   * console.log(`Created polygon ID: ${result.data.polygon_id}`);
   * 
   * // Create a more complex polygon with additional points
   * const complexResult = await client.polygon.createPolygon({
   *   coordinates: "[[[30.1,59.8],[30.2,59.8],[30.3,59.85],[30.25,59.9],[30.15,59.9],[30.1,59.8]]]"
   * });
   * 
   * // Handle potential errors
   * try {
   *   const polygon = await client.polygon.createPolygon({
   *     coordinates: "invalid coordinates"
   *   });
   * } catch (error) {
   *   // Common error messages:
   *   // - "coordinates not provided"
   *   // - "invalid coordinates, must have two points in coordinate"
   *   // - "the first and last points in loop must be same"
   *   // - "non-full loops must have at least 4 unique vertices for polygons"
   *   console.error('Polygon creation failed:', error.message);
   * }
   * ```
   */
  async createPolygon(
    params: CreatePolygonRequest
  ): Promise<IHttpResponse<CreatePolygonResponse>> {
    return this.httpClient.post('/v1/polygon/create', params);
  }

  /**
   * Bind delivery method to polygon
   * 
   * Links a delivery method with one or more polygons, setting delivery
   * time guarantees for each geographical area. The warehouse location
   * must be within at least one of the provided polygons.
   * 
   * **Requirements:**
   * - Valid delivery method ID
   * - At least one polygon to bind
   * - Warehouse location must be within one of the polygons
   * - All polygon IDs must exist in the system
   * 
   * @param params - Polygon binding parameters
   * @returns Success confirmation (empty response)
   * 
   * @example
   * ```typescript
   * // Bind single polygon to delivery method
   * await client.polygon.bindPolygon({
   *   delivery_method_id: 123,
   *   polygons: [
   *     { polygon_id: 1323, time: 30 } // 30 minutes delivery
   *   ],
   *   warehouse_location: {
   *     lat: "58.52391272075821",
   *     lon: "31.236791610717773"
   *   }
   * });
   * 
   * // Bind multiple polygons with different delivery times
   * await client.polygon.bindPolygon({
   *   delivery_method_id: 456,
   *   polygons: [
   *     { polygon_id: 1001, time: 30 }, // City center: 30 min
   *     { polygon_id: 1002, time: 60 }, // Suburbs: 60 min
   *     { polygon_id: 1003, time: 120 } // Outskirts: 120 min
   *   ],
   *   warehouse_location: {
   *     lat: "59.93428",
   *     lon: "30.31561" // St. Petersburg center
   *   }
   * });
   * 
   * // Handle binding errors
   * try {
   *   await client.polygon.bindPolygon({
   *     delivery_method_id: 789,
   *     polygons: [
   *       { polygon_id: 9999, time: 45 } // Non-existent polygon
   *     ],
   *     warehouse_location: {
   *       lat: "0",
   *       lon: "0" // Invalid location
   *     }
   *   });
   * } catch (error) {
   *   // Common error messages:
   *   // - "delivery target polygons not provided"
   *   // - "no delivery method id provided"
   *   // - "no warehouse points provided"
   *   // - "polygon id .... not found"
   *   // - "not found polygon for warehouse point"
   *   console.error('Polygon binding failed:', error.message);
   * }
   * ```
   */
  async bindPolygon(
    params: BindPolygonRequest
  ): Promise<IHttpResponse<BindPolygonResponse>> {
    return this.httpClient.post('/v1/polygon/bind', params);
  }

  /**
   * Helper method to validate polygon coordinates
   * 
   * Validates polygon coordinate string format before sending to API.
   * Helps prevent common coordinate formatting errors.
   * 
   * @param coordinates - Coordinate string to validate
   * @returns Validation result with error details
   * 
   * @example
   * ```typescript
   * const coordinates = "[[[30.1,59.8],[30.2,59.8],[30.1,59.8]]]";
   * const validation = client.polygon.validateCoordinates(coordinates);
   * 
   * if (!validation.isValid) {
   *   console.error('Coordinate validation failed:', validation.errors);
   * } else {
   *   // Proceed with polygon creation
   *   const result = await client.polygon.createPolygon({ coordinates });
   * }
   * ```
   */
  validateCoordinates(coordinates: string): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!coordinates || coordinates.trim() === '') {
      errors.push('Coordinates not provided');
      return { isValid: false, errors };
    }

    try {
      const parsed = JSON.parse(coordinates);
      
      // Check if it's a valid coordinate array structure
      if (!Array.isArray(parsed) || !Array.isArray(parsed[0]) || !Array.isArray(parsed[0][0])) {
        errors.push('Invalid coordinate structure, expected [[[lat,lng],...]]');
        return { isValid: false, errors };
      }

      const coordinateLoop = parsed[0][0];
      
      // Check minimum points (need at least 4 for a closed polygon)
      if (coordinateLoop.length < 4) {
        errors.push('Non-full loops must have at least 4 unique vertices for polygons');
      }

      // Check each coordinate point has lat and lng
      for (let i = 0; i < coordinateLoop.length; i++) {
        const point = coordinateLoop[i];
        if (!Array.isArray(point) || point.length !== 2) {
          errors.push(`Invalid coordinates, must have two points in coordinate at index ${i}`);
        }
      }

      // Check if first and last points are the same
      const firstPoint = coordinateLoop[0];
      const lastPoint = coordinateLoop[coordinateLoop.length - 1];
      if (JSON.stringify(firstPoint) !== JSON.stringify(lastPoint)) {
        errors.push('The first and last points in loop must be same');
      }

    } catch (parseError) {
      errors.push('Invalid JSON format for coordinates');
    }

    return { isValid: errors.length === 0, errors };
  }

  /**
   * Helper method to create coordinates string from lat/lng pairs
   * 
   * Converts array of coordinate points to proper GeoJSON coordinate string.
   * Automatically closes the polygon by repeating the first point as the last.
   * 
   * @param points - Array of {lat, lng} coordinate points
   * @returns GeoJSON coordinate string ready for API
   * 
   * @example
   * ```typescript
   * const points = [
   *   { lat: 59.865504, lng: 30.149574 },
   *   { lat: 59.846884, lng: 30.212059 },
   *   { lat: 59.862402, lng: 30.255661 }
   * ];
   * 
   * const coordinates = client.polygon.createCoordinatesString(points);
   * console.log(coordinates);
   * // "[[[30.149574,59.865504],[30.212059,59.846884],[30.255661,59.862402],[30.149574,59.865504]]]"
   * 
   * // Use with polygon creation
   * const result = await client.polygon.createPolygon({ coordinates });
   * ```
   */
  createCoordinatesString(points: Array<{ lat: number; lng: number }>): string {
    if (points.length < 3) {
      throw new Error('At least 3 points are required to create a polygon');
    }

    // Convert to [lng, lat] format (GeoJSON standard)
    const coordinates = points.map(point => [point.lng, point.lat]);
    
    // Close the polygon by adding the first point at the end (if exists)
    if (points[0]) {
      coordinates.push([points[0].lng, points[0].lat]);
    }

    // Return as GeoJSON polygon coordinate string
    return JSON.stringify([coordinates]);
  }
}

// Re-export types for convenience
export type * from './types';