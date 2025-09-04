/**
 * Request types for WarehouseAPI
 * Generated from OZON API documentation
 * WarehouseAPI - Warehouse management operations
 */

/**
 * Фильтр для поиска методов доставки
 * Filter for searching delivery methods
 */
export interface DeliveryMethodListRequestFilter {
  /**
   * Идентификатор службы доставки
   * Delivery service provider ID
   */
  provider_id?: number;

  /**
   * Статус метода доставки
   * Delivery method status
   *
   * - `NEW` — создан
   * - `EDITED` — редактируется
   * - `ACTIVE` — активный
   * - `DISABLED` — неактивный
   */
  status?: "NEW" | "EDITED" | "ACTIVE" | "DISABLED";

  /**
   * Идентификатор склада
   * Warehouse ID
   *
   * Можно получить с помощью метода /v1/warehouse/list
   */
  warehouse_id?: number;

  readonly [key: string]: unknown;
}

/**
 * Запрос списка методов доставки склада
 * Request for warehouse delivery methods list
 */
export interface WarehouseDeliveryMethodListRequest {
  /**
   * Количество элементов в ответе
   * Number of elements in response
   *
   * Максимум — 50, минимум — 1.
   */
  limit: number;

  /**
   * Количество элементов, которое будет пропущено в ответе
   * Number of elements to skip in response
   *
   * Например, если offset = 10, то ответ начнётся с 11-го найденного элемента.
   */
  offset?: number;

  /**
   * Фильтр для поиска методов доставки
   * Filter for searching delivery methods
   */
  filter?: DeliveryMethodListRequestFilter;

  readonly [key: string]: unknown;
}

/**
 * Запрос списка складов
 * Request for warehouses list
 */
export interface WarehouseListRequest {
  readonly [key: string]: unknown;
}
