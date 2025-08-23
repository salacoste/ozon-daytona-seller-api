/**
 * Request types for PolygonAPI
 * Polygon binding for delivery zones
 * Ready for manual editing and enhancements
 */

/**
 * Запрос создания полигона доставки
 * Create delivery polygon request
 */
export interface PolygonCreateRequest {
  /** 
   * Координаты полигона доставки в формате [[[lat long]]]
   * Polygon coordinates in format [[[lat long]]]
   * 
   * @example "[[[55.7558, 37.6176], [55.7558, 37.7176], [55.8558, 37.7176], [55.8558, 37.6176], [55.7558, 37.6176]]]"
   */
  coordinates: string;
  
  readonly [key: string]: unknown;
}

/**
 * Расположение склада
 * Warehouse location
 */
export interface PolygonWarehouseLocation {
  /** 
   * Географическая широта склада
   * Warehouse latitude
   */
  lat: string;
  
  /** 
   * Географическая долгота склада
   * Warehouse longitude
   */
  lon: string;
  
  readonly [key: string]: unknown;
}

/**
 * Полигон для привязки к методу доставки
 * Polygon for delivery method binding
 */
export interface PolygonBindInfo {
  /** 
   * Идентификатор полигона
   * Polygon identifier
   */
  polygon_id: number;
  
  /** 
   * Время доставки в минутах для данного полигона
   * Delivery time in minutes for this polygon
   */
  time: number;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос привязки полигонов к методу доставки
 * Bind polygons to delivery method request
 */
export interface PolygonBindRequest {
  /** 
   * Идентификатор метода доставки
   * Delivery method identifier
   */
  delivery_method_id: number;
  
  /** 
   * Список полигонов для привязки
   * List of polygons to bind
   */
  polygons: PolygonBindInfo[];
  
  /** 
   * Расположение склада
   * Warehouse location
   */
  warehouse_location: PolygonWarehouseLocation;
  
  readonly [key: string]: unknown;
}