/**
 * Response types for WarehouseAPI
 * Generated from OZON API documentation
 * WarehouseAPI - Warehouse management operations
 */

/**
 * Информация о методе доставки из ответа MCP
 * Delivery method information from MCP response
 */
export interface WarehouseDeliveryMethod {
  /**
   * Идентификатор продавца
   * Company ID
   */
  company_id?: number;

  /**
   * Дата и время создания метода доставки
   * Creation date and time
   */
  created_at?: string;

  /**
   * Время, до которого продавцу нужно собрать заказ
   * Cutoff time for order assembly
   */
  cutoff?: string;

  /**
   * Идентификатор метода доставки
   * Delivery method ID
   */
  id?: number;

  /**
   * Название метода доставки
   * Delivery method name
   */
  name?: string;

  /**
   * Идентификатор службы доставки
   * Delivery service provider ID
   */
  provider_id?: number;

  /**
   * Минимальное время на сборку заказа в минутах
   * Minimum order assembly time in minutes
   *
   * В соответствии с настройками склада.
   */
  sla_cut_in?: number;

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
   * Идентификатор услуги по доставке заказа
   * Delivery service template ID
   */
  template_id?: number;

  /**
   * Дата и время последнего обновления метода доставки
   * Last update date and time
   */
  updated_at?: string;

  /**
   * Идентификатор склада
   * Warehouse ID
   */
  warehouse_id?: number;

  readonly [key: string]: unknown;
}

/**
 * Ответ со списком методов доставки склада
 * Response with warehouse delivery methods list
 */
export interface WarehouseDeliveryMethodListResponse {
  /**
   * Признак, что в запросе вернулась только часть методов доставки
   * Indicates that only part of delivery methods were returned
   *
   * - `true` — сделайте повторный запрос с новым параметром offset для получения остальных методов
   * - `false` — ответ содержит все методы доставки по запросу
   */
  has_next?: boolean;

  /**
   * Результат запроса
   * Request result
   */
  result?: WarehouseDeliveryMethod[];

  readonly [key: string]: unknown;
}

/**
 * Первая миля FBS
 * First mile FBS
 */
export interface WarehouseFirstMileType {
  /**
   * Идентификатор DropOff-точки
   * DropOff point ID
   */
  dropoff_point_id?: string;

  /**
   * Идентификатор временного слота для DropOff
   * DropOff timeslot ID
   */
  dropoff_timeslot_id?: number;

  /**
   * Признак, что настройки склада обновляются
   * Indicates warehouse settings are being updated
   */
  first_mile_is_changing?: boolean;

  /**
   * Тип первой мили
   * First mile type
   *
   * - `DropOff` — доставка в точку
   * - `Pickup` — самовывоз
   */
  first_mile_type?: "DropOff" | "Pickup";

  readonly [key: string]: unknown;
}

/**
 * Информация о складе из ответа MCP
 * Warehouse information from MCP response
 */
export interface Warehouse {
  /**
   * Возможность печати акта приёма-передачи заранее
   * Ability to print transfer act in advance
   *
   * `true`, если печатать заранее возможно.
   */
  can_print_act_in_advance?: boolean;

  /**
   * Первая миля FBS
   * First mile FBS
   */
  first_mile_type?: WarehouseFirstMileType;

  /**
   * Признак доверительной приёмки
   * Entrusted acceptance flag
   *
   * `true`, если доверительная приёмка включена на складе.
   */
  has_entrusted_acceptance?: boolean;

  /**
   * Признак наличия лимита минимального количества заказов
   * Has minimum postings limit flag
   *
   * `true`, если лимит есть.
   */
  has_postings_limit?: boolean;

  /**
   * `true`, если склад работает с эконом-товарами
   * Economy goods flag
   */
  is_economy?: boolean;

  /**
   * Признак, что склад не работает из-за карантина
   * Quarantine flag
   */
  is_karantin?: boolean;

  /**
   * Признак, что склад принимает крупногабаритные товары
   * Large goods acceptance flag
   */
  is_kgt?: boolean;

  /**
   * Признак работы склада по схеме rFBS
   * rFBS scheme flag
   *
   * - `true` — склад работает по схеме rFBS
   * - `false` — не работает по схеме rFBS
   */
  is_rfbs?: boolean;

  /**
   * Признак, что можно менять расписание работы складов
   * Timetable editable flag
   */
  is_timetable_editable?: boolean;

  /**
   * Минимальное значение лимита
   * Minimum postings limit value
   *
   * Количество заказов, которые можно привезти в одной поставке.
   */
  min_postings_limit?: number;

  /**
   * Количество рабочих дней склада
   * Number of working days
   */
  min_working_days?: number;

  /**
   * Название склада
   * Warehouse name
   */
  name?: string;

  /**
   * Значение лимита
   * Postings limit value
   *
   * `-1`, если лимита нет.
   */
  postings_limit?: number;

  /**
   * Статус склада
   * Warehouse status
   *
   * Соответствие статусов склада со статусами в личном кабинете:
   * - `new` — Активируется
   * - `created` — Активный
   * - `disabled` — В архиве
   * - `blocked` — Заблокирован
   * - `disabled_due_to_limit` — На паузе
   * - `error` — Ошибка
   */
  status?: "new" | "created" | "disabled" | "blocked" | "disabled_due_to_limit" | "error";

  /**
   * Идентификатор склада
   * Warehouse ID
   */
  warehouse_id?: number;

  /**
   * Рабочие дни склада
   * Warehouse working days
   *
   * Дни недели от 1 (понедельник) до 7 (воскресенье)
   */
  working_days?: ("1" | "2" | "3" | "4" | "5" | "6" | "7")[];

  readonly [key: string]: unknown;
}

/**
 * Ответ со списком складов
 * Response with warehouses list
 */
export interface WarehouseListResponse {
  /**
   * Список складов
   * List of warehouses
   */
  result?: Warehouse[];

  readonly [key: string]: unknown;
}
