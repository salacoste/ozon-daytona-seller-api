/**
 * Response types for CategoryAPI
 * Product category tree management
 * Ready for manual editing and enhancements
 */

/**
 * Элемент дерева категорий
 * Category tree item
 */
export interface CategoryTreeItem {
  /** 
   * Идентификатор категории
   * Category identifier
   */
  description_category_id?: number;
  
  /** 
   * Название категории
   * Category name
   */
  category_name?: string;
  
  /** 
   * Дерево подкатегорий
   * Subcategories tree
   */
  children?: CategoryTreeItem[];
  
  /** 
   * Признак недоступности для создания товаров
   * Flag indicating category is disabled for product creation
   */
  disabled?: boolean;
  
  /** 
   * Идентификатор типа товара
   * Product type identifier
   */
  type_id?: number;
  
  /** 
   * Название типа товара
   * Product type name
   */
  type_name?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ дерева категорий
 * Category tree response
 */
export interface CategoryGetTreeResponse {
  /** 
   * Список категорий
   * Categories list
   */
  result?: CategoryTreeItem[];
  
  readonly [key: string]: unknown;
}

/**
 * Характеристика категории
 * Category attribute
 */
export interface CategoryAttribute {
  /** 
   * Идентификатор характеристики
   * Attribute identifier
   */
  id?: number;
  
  /** 
   * Название характеристики
   * Attribute name
   */
  name?: string;
  
  /** 
   * Описание характеристики
   * Attribute description
   */
  description?: string;
  
  /** 
   * Тип характеристики
   * Attribute type
   */
  type?: string;
  
  /** 
   * Признак обязательной характеристики
   * Required attribute flag
   */
  is_required?: boolean;
  
  /** 
   * Признак коллекции значений
   * Collection values flag
   */
  is_collection?: boolean;
  
  /** 
   * Признак аспектного атрибута
   * Aspect attribute flag
   */
  is_aspect?: boolean;
  
  /** 
   * Идентификатор справочника
   * Dictionary identifier
   */
  dictionary_id?: number;
  
  /** 
   * Идентификатор группы характеристик
   * Attribute group identifier
   */
  group_id?: number;
  
  /** 
   * Название группы характеристик
   * Attribute group name
   */
  group_name?: string;
  
  /** 
   * Признак зависимости от категории
   * Category dependent flag
   */
  category_dependent?: boolean;
  
  /** 
   * Идентификатор комплексного атрибута
   * Complex attribute identifier
   */
  attribute_complex_id?: number;
  
  /** 
   * Максимальное количество значений
   * Maximum value count
   */
  max_value_count?: number;
  
  /** 
   * Признак коллекции для комплексной характеристики
   * Complex collection flag
   */
  complex_is_collection?: boolean;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ характеристик категории
 * Category attributes response
 */
export interface CategoryGetAttributesResponse {
  /** 
   * Список характеристик
   * Attributes list
   */
  result?: CategoryAttribute[];
  
  readonly [key: string]: unknown;
}

/**
 * Значение характеристики
 * Attribute value
 */
export interface CategoryAttributeValue {
  /** 
   * Идентификатор значения
   * Value identifier
   */
  id?: number;
  
  /** 
   * Значение характеристики
   * Attribute value
   */
  value?: string;
  
  /** 
   * Дополнительное описание
   * Additional description
   */
  info?: string;
  
  /** 
   * Ссылка на изображение
   * Image link
   */
  picture?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ значений характеристики
 * Attribute values response
 */
export interface CategoryGetAttributeValuesResponse {
  /** 
   * Значения характеристики
   * Attribute values
   */
  result?: CategoryAttributeValue[];
  
  /** 
   * Признак наличия следующих значений
   * Flag indicating more values available
   */
  has_next?: boolean;
  
  readonly [key: string]: unknown;
}

/**
 * Результат поиска значений характеристики
 * Search attribute values result
 */
export interface CategorySearchAttributeValue {
  /** 
   * Идентификатор значения
   * Value identifier
   */
  id?: number;
  
  /** 
   * Значение характеристики
   * Attribute value
   */
  value?: string;
  
  /** 
   * Дополнительная информация
   * Additional information
   */
  info?: string;
  
  /** 
   * Ссылка на изображение
   * Image link
   */
  picture?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ поиска значений характеристики
 * Search attribute values response
 */
export interface CategorySearchAttributeValuesResponse {
  /** 
   * Найденные значения характеристики
   * Found attribute values
   */
  result?: CategorySearchAttributeValue[];
  
  readonly [key: string]: unknown;
}