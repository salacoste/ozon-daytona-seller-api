/**
 * PolygonAPI implementation
 * Polygon binding for delivery zones
 */

import { HttpClient } from '../../core/http.js';
import type { RequestOptions } from '../../core/types.js';
import type { EmptyResponse } from '../../types/common/base.js';
import type { 
  PolygonCreateRequest,
  PolygonBindRequest
} from '../../types/requests/polygon.js';
import type { 
  PolygonCreateResponse
} from '../../types/responses/polygon.js';

/**
 * PolygonAPI для управления полигонами доставки
 * PolygonAPI for delivery polygon management
 * 
 * 🗺️ Используйте https://geojson.io для создания координат полигонов
 * 🗺️ Use https://geojson.io to create polygon coordinates
 * 
 * @example
 * ```typescript
 * // Создать полигон доставки для Москвы
 * const polygonResult = await polygonApi.createDeliveryPolygon({
 *   coordinates: "[[[55.7558, 37.6176], [55.7558, 37.7176], [55.8558, 37.7176], [55.8558, 37.6176], [55.7558, 37.6176]]]"
 * });
 * 
 * // Привязать полигон к методу доставки
 * await polygonApi.bindPolygonToDeliveryMethod({
 *   delivery_method_id: 123,
 *   polygons: [{
 *     polygon_id: polygonResult.polygon_id!,
 *     time: 120 // 2 часа доставки
 *   }],
 *   warehouse_location: {
 *     lat: "55.7558",
 *     lon: "37.6176"
 *   }
 * });
 * ```
 */
export class PolygonApi {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Создать полигон доставки
   * Create delivery polygon
   * 
   * Создайте полигон для зоны доставки, указав координаты в формате GeoJSON.
   * Для создания координат используйте https://geojson.io - отметьте на карте
   * минимум 3 точки и соедините их линиями.
   * 
   * @param request - Параметры запроса создания полигона
   * @param options - Дополнительные опции запроса
   * @returns Идентификатор созданного полигона
   * 
   * @example
   * ```typescript
   * // Создать полигон для центра Москвы
   * const moscowCenterPolygon = await polygonApi.createDeliveryPolygon({
   *   coordinates: `[[[
   *     [55.7558, 37.6176], // Красная площадь
   *     [55.7558, 37.7176], // Восточная граница
   *     [55.8558, 37.7176], // Северо-восточный угол
   *     [55.8558, 37.6176], // Северная граница
   *     [55.7558, 37.6176]  // Замыкание полигона
   *   ]]]`
   * });
   * 
   * console.log(`Создан полигон с ID: ${moscowCenterPolygon.polygon_id}`);
   * 
   * // Создать полигон для Санкт-Петербурга
   * const spbPolygon = await polygonApi.createDeliveryPolygon({
   *   coordinates: `[[[
   *     [59.9311, 30.3609], // Дворцовая площадь
   *     [59.9311, 30.4609], // Восточная граница
   *     [60.0311, 30.4609], // Северо-восточный угол
   *     [60.0311, 30.3609], // Северная граница
   *     [59.9311, 30.3609]  // Замыкание полигона
   *   ]]]`
   * });
   * 
   * // Создать сложный полигон с несколькими зонами
   * const complexPolygon = await polygonApi.createDeliveryPolygon({
   *   coordinates: `[[[
   *     [55.7000, 37.5000],
   *     [55.7000, 37.8000],
   *     [55.9000, 37.8000],
   *     [55.9000, 37.5000],
   *     [55.7000, 37.5000]
   *   ]], [[
   *     [55.7200, 37.5200], // Исключаемая зона (отверстие в полигоне)
   *     [55.7200, 37.5800],
   *     [55.7800, 37.5800],
   *     [55.7800, 37.5200],
   *     [55.7200, 37.5200]
   *   ]]]`
   * });
   * 
   * // Функция-помощник для создания прямоугольного полигона
   * const createRectangularPolygon = async (
   *   minLat: number, minLon: number,
   *   maxLat: number, maxLon: number
   * ) => {
   *   const coordinates = `[[[
   *     [${minLat}, ${minLon}],
   *     [${minLat}, ${maxLon}],
   *     [${maxLat}, ${maxLon}],
   *     [${maxLat}, ${minLon}],
   *     [${minLat}, ${minLon}]
   *   ]]]`;
   *   
   *   return await polygonApi.createDeliveryPolygon({ coordinates });
   * };
   * 
   * const rectPolygon = await createRectangularPolygon(55.7, 37.6, 55.8, 37.7);
   * ```
   */
  async createDeliveryPolygon(
    request: PolygonCreateRequest,
    options?: RequestOptions
  ): Promise<PolygonCreateResponse> {
    return this.httpClient.request<PolygonCreateRequest, PolygonCreateResponse>(
      'POST',
      '/v1/polygon/create',
      request,
      options
    );
  }

  /**
   * Привязать полигон к методу доставки
   * Bind polygon to delivery method
   * 
   * Свяжите созданные полигоны с методом доставки, указав время доставки
   * для каждого полигона и местоположение склада.
   * 
   * @param request - Параметры запроса привязки полигонов
   * @param options - Дополнительные опции запроса
   * @returns Результат привязки полигонов
   * 
   * @example
   * ```typescript
   * // Привязать несколько полигонов к методу экспресс-доставки
   * await polygonApi.bindPolygonToDeliveryMethod({
   *   delivery_method_id: 123, // ID метода экспресс-доставки
   *   warehouse_location: {
   *     lat: "55.7558", // Широта склада в Москве
   *     lon: "37.6176"  // Долгота склада в Москве
   *   },
   *   polygons: [
   *     {
   *       polygon_id: 1001, // Центр Москвы
   *       time: 60         // 1 час доставки
   *     },
   *     {
   *       polygon_id: 1002, // Ближние районы
   *       time: 120        // 2 часа доставки
   *     },
   *     {
   *       polygon_id: 1003, // Дальние районы
   *       time: 240        // 4 часа доставки
   *     }
   *   ]
   * });
   * 
   * // Привязать полигон к методу обычной доставки
   * await polygonApi.bindPolygonToDeliveryMethod({
   *   delivery_method_id: 456, // ID метода обычной доставки
   *   warehouse_location: {
   *     lat: "59.9311", // Широта склада в СПб
   *     lon: "30.3609"  // Долгота склада в СПб
   *   },
   *   polygons: [{
   *     polygon_id: 2001, // Весь Санкт-Петербург
   *     time: 1440       // 24 часа (1 день)
   *   }]
   * });
   * 
   * // Пример создания и привязки полигона в одном workflow
   * const setupDeliveryZone = async (
   *   coordinates: string,
   *   deliveryMethodId: number,
   *   deliveryTimeMinutes: number,
   *   warehouseLat: string,
   *   warehouseLon: string
   * ) => {
   *   // 1. Создаём полигон
   *   const polygonResult = await polygonApi.createDeliveryPolygon({
   *     coordinates
   *   });
   *   
   *   if (!polygonResult.polygon_id) {
   *     throw new Error('Не удалось создать полигон');
   *   }
   *   
   *   // 2. Привязываем полигон к методу доставки
   *   await polygonApi.bindPolygonToDeliveryMethod({
   *     delivery_method_id: deliveryMethodId,
   *     warehouse_location: {
   *       lat: warehouseLat,
   *       lon: warehouseLon
   *     },
   *     polygons: [{
   *       polygon_id: polygonResult.polygon_id,
   *       time: deliveryTimeMinutes
   *     }]
   *   });
   *   
   *   return polygonResult.polygon_id;
   * };
   * 
   * // Настроить экспресс-доставку для МКАД
   * const mkadPolygonId = await setupDeliveryZone(
   *   `[[[55.5742, 37.1427], [55.5742, 37.8427], [55.9742, 37.8427], [55.9742, 37.1427], [55.5742, 37.1427]]]`,
   *   789, // ID экспресс-доставки
   *   180, // 3 часа
   *   "55.7558", // Широта склада
   *   "37.6176"  // Долгота склада
   * );
   * 
   * console.log(`Настроена зона экспресс-доставки, полигон ID: ${mkadPolygonId}`);
   * ```
   */
  async bindPolygonToDeliveryMethod(
    request: PolygonBindRequest,
    options?: RequestOptions
  ): Promise<void> {
    await this.httpClient.request<PolygonBindRequest, EmptyResponse>(
      'POST',
      '/v1/polygon/bind',
      request,
      options
    );
  }
}