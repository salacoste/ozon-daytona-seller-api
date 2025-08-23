/**
 * Request types for WarehouseAPI
 * Generated from OZON API documentation
 * WarehouseAPI - Warehouse management operations
 */

/**
 * Запрос списка методов доставки склада
 * Request for warehouse delivery methods list
 */
export interface WarehouseDeliveryMethodListRequest {
  /** 
   * Идентификатор склада
   * Warehouse ID
   */
  warehouse_id?: number;
  
  /** 
   * Тип доставки
   * Delivery type
   */
  delivery_type?: 'pickup' | 'courier' | 'post';
  
  readonly [key: string]: unknown;
}

/**
 * Запрос списка складов
 * Request for warehouses list
 */
export interface WarehouseListRequest {
  readonly [key: string]: unknown;
}