/**
 * CategoryAPI implementation
 * Product category tree management
 */

import { HttpClient } from "../../core/http.js";
import type { RequestOptions } from "../../core/types.js";
import type { CategoryGetTreeRequest, CategoryGetAttributesRequest, CategoryGetAttributeValuesRequest, CategorySearchAttributeValuesRequest } from "../../types/requests/category.js";
import type { CategoryGetTreeResponse, CategoryGetAttributesResponse, CategoryGetAttributeValuesResponse, CategorySearchAttributeValuesResponse } from "../../types/responses/category.js";

/**
 * CategoryAPI для управления деревом категорий и характеристиками товаров
 * CategoryAPI for product category tree and attributes management
 *
 * @example
 * ```typescript
 * // Получить дерево категорий
 * const categoryTree = await categoryApi.getCategoryTree({
 *   language: 'RU'
 * });
 *
 * // Найти категорию последнего уровня
 * const findLeafCategories = (items: CategoryTreeItem[]): CategoryTreeItem[] => {
 *   const leafCategories: CategoryTreeItem[] = [];
 *   items.forEach(item => {
 *     if (!item.children || item.children.length === 0) {
 *       if (!item.disabled) {
 *         leafCategories.push(item);
 *       }
 *     } else {
 *       leafCategories.push(...findLeafCategories(item.children));
 *     }
 *   });
 *   return leafCategories;
 * };
 *
 * const leafCategories = findLeafCategories(categoryTree.result || []);
 *
 * // Получить характеристики для категории
 * if (leafCategories.length > 0) {
 *   const attributes = await categoryApi.getCategoryAttributes({
 *     description_category_id: leafCategories[0].description_category_id!,
 *     type_id: leafCategories[0].type_id!,
 *     language: 'RU'
 *   });
 * }
 * ```
 */
export class CategoryApi {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Получить дерево категорий и типов товаров
   * Get category and product type tree
   *
   * Возвращает полное дерево категорий и типов товаров. Создание товаров доступно только
   * в категориях последнего уровня (без подкатегорий). Внимательно выбирайте категорию,
   * так как для разных категорий применяется разный размер комиссии.
   *
   * @param request - Параметры запроса дерева категорий
   * @param options - Дополнительные опции запроса
   * @returns Дерево категорий и типов товаров
   *
   * @example
   * ```typescript
   * const categoryTree = await categoryApi.getCategoryTree({
   *   language: 'RU'
   * });
   *
   * const printTree = (items: CategoryTreeItem[], level = 0) => {
   *   items.forEach(item => {
   *     const indent = '  '.repeat(level);
   *     const status = item.disabled ? '[НЕДОСТУПНА]' : '[ДОСТУПНА]';
   *     console.log(`${indent}${item.category_name} (ID: ${item.description_category_id}) ${status}`);
   *
   *     if (item.type_name) {
   *       console.log(`${indent}  Тип: ${item.type_name} (ID: ${item.type_id})`);
   *     }
   *
   *     if (item.children && item.children.length > 0) {
   *       printTree(item.children, level + 1);
   *     }
   *   });
   * };
   *
   * printTree(categoryTree.result || []);
   *
   * // Найти категории для создания товаров
   * const getLeafCategories = (items: CategoryTreeItem[]): CategoryTreeItem[] => {
   *   const result: CategoryTreeItem[] = [];
   *   items.forEach(item => {
   *     if ((!item.children || item.children.length === 0) && !item.disabled) {
   *       result.push(item);
   *     } else if (item.children) {
   *       result.push(...getLeafCategories(item.children));
   *     }
   *   });
   *   return result;
   * };
   *
   * const availableCategories = getLeafCategories(categoryTree.result || []);
   * console.log(`Доступно категорий для создания товаров: ${availableCategories.length}`);
   * ```
   */
  async getCategoryTree(request: CategoryGetTreeRequest = {}, options?: RequestOptions): Promise<CategoryGetTreeResponse> {
    return this.httpClient.request<CategoryGetTreeRequest, CategoryGetTreeResponse>("POST", "/v1/description-category/tree", request, options);
  }

  /**
   * Получить характеристики категории
   * Get category attributes
   *
   * Получение списка характеристик для указанной категории и типа товара.
   * Если у характеристики dictionary_id равен 0, то у неё нет справочника значений.
   * Если dictionary_id не равен 0, то у характеристики есть справочник значений.
   *
   * @param request - Параметры запроса характеристик категории
   * @param options - Дополнительные опции запроса
   * @returns Список характеристик категории
   *
   * @example
   * ```typescript
   * const attributes = await categoryApi.getCategoryAttributes({
   *   description_category_id: 15621,
   *   type_id: 31,
   *   language: 'RU'
   * });
   *
   * attributes.result?.forEach(attr => {
   *   console.log(`Характеристика: ${attr.name} (ID: ${attr.id})`);
   *   console.log(`  Тип: ${attr.type}`);
   *   console.log(`  Обязательная: ${attr.is_required ? 'Да' : 'Нет'}`);
   *   console.log(`  Коллекция: ${attr.is_collection ? 'Да' : 'Нет'}`);
   *   console.log(`  Аспектная: ${attr.is_aspect ? 'Да' : 'Нет'}`);
   *   console.log(`  Группа: ${attr.group_name} (ID: ${attr.group_id})`);
   *
   *   if (attr.dictionary_id && attr.dictionary_id > 0) {
   *     console.log(`  Справочник: ${attr.dictionary_id}`);
   *     console.log(`  Зависит от категории: ${attr.category_dependent ? 'Да' : 'Нет'}`);
   *   } else {
   *     console.log(`  Справочник: отсутствует`);
   *   }
   *
   *   if (attr.description) {
   *     console.log(`  Описание: ${attr.description}`);
   *   }
   *
   *   console.log('');
   * });
   *
   * // Найти обязательные характеристики
   * const requiredAttributes = attributes.result?.filter(attr => attr.is_required) || [];
   * console.log(`Обязательных характеристик: ${requiredAttributes.length}`);
   *
   * // Найти характеристики со справочниками
   * const dictionaryAttributes = attributes.result?.filter(attr =>
   *   attr.dictionary_id && attr.dictionary_id > 0
   * ) || [];
   * console.log(`Характеристик со справочниками: ${dictionaryAttributes.length}`);
   * ```
   */
  async getCategoryAttributes(request: CategoryGetAttributesRequest, options?: RequestOptions): Promise<CategoryGetAttributesResponse> {
    return this.httpClient.request<CategoryGetAttributesRequest, CategoryGetAttributesResponse>("POST", "/v1/description-category/attribute", request, options);
  }

  /**
   * Получить значения характеристики
   * Get attribute values
   *
   * Возвращает справочник значений для указанной характеристики.
   * Используйте пагинацию через last_value_id для получения всех значений.
   *
   * @param request - Параметры запроса значений характеристики
   * @param options - Дополнительные опции запроса
   * @returns Значения характеристики с пагинацией
   *
   * @example
   * ```typescript
   * // Получить первую страницу значений
   * const attributeValues = await categoryApi.getCategoryAttributeValues({
   *   attribute_id: 85,
   *   description_category_id: 15621,
   *   type_id: 31,
   *   limit: 100,
   *   language: 'RU'
   * });
   *
   * attributeValues.result?.forEach(value => {
   *   console.log(`Значение: ${value.value} (ID: ${value.id})`);
   *   if (value.info) {
   *     console.log(`  Описание: ${value.info}`);
   *   }
   *   if (value.picture) {
   *     console.log(`  Изображение: ${value.picture}`);
   *   }
   * });
   *
   * // Получить все значения с пагинацией
   * const getAllValues = async (attributeId: number, categoryId: number, typeId: number) => {
   *   const allValues: CategoryAttributeValue[] = [];
   *   let lastValueId: number | undefined;
   *
   *   do {
   *     const response = await categoryApi.getCategoryAttributeValues({
   *       attribute_id: attributeId,
   *       description_category_id: categoryId,
   *       type_id: typeId,
   *       limit: 1000,
   *       last_value_id: lastValueId
   *     });
   *
   *     if (response.result) {
   *       allValues.push(...response.result);
   *       lastValueId = response.result[response.result.length - 1]?.id;
   *     }
   *
   *     if (!response.has_next) {
   *       break;
   *     }
   *   } while (true);
   *
   *   return allValues;
   * };
   *
   * const allValues = await getAllValues(85, 15621, 31);
   * console.log(`Всего значений: ${allValues.length}`);
   * ```
   */
  async getCategoryAttributeValues(request: CategoryGetAttributeValuesRequest, options?: RequestOptions): Promise<CategoryGetAttributeValuesResponse> {
    // Валидация параметров согласно API
    if (!request.limit || request.limit < 1 || request.limit > 2000) {
      throw new Error('Parameter "limit" must be between 1 and 2000');
    }

    return this.httpClient.request<CategoryGetAttributeValuesRequest, CategoryGetAttributeValuesResponse>("POST", "/v1/description-category/attribute/values", request, options);
  }

  /**
   * Поиск значений характеристики
   * Search attribute values
   *
   * Возвращает справочные значения характеристики по заданному поисковому запросу.
   * Полезно для автодополнения и поиска конкретных значений.
   *
   * @param request - Параметры поиска значений характеристики
   * @param options - Дополнительные опции запроса
   * @returns Найденные значения характеристики
   *
   * @example
   * ```typescript
   * // Поиск значений цвета по запросу "крас"
   * const searchResults = await categoryApi.searchCategoryAttributeValues({
   *   attribute_id: 85,
   *   description_category_id: 15621,
   *   type_id: 31,
   *   value: 'крас',
   *   limit: 50
   * });
   *
   * console.log(`Найдено значений: ${searchResults.result?.length || 0}`);
   *
   * searchResults.result?.forEach(value => {
   *   console.log(`- ${value.value} (ID: ${value.id})`);
   *   if (value.info) {
   *     console.log(`  Описание: ${value.info}`);
   *   }
   * });
   *
   * // Функция для поиска значения по точному совпадению
   * const findExactValue = async (attributeId: number, categoryId: number, typeId: number, searchValue: string) => {
   *   const results = await categoryApi.searchCategoryAttributeValues({
   *     attribute_id: attributeId,
   *     description_category_id: categoryId,
   *     type_id: typeId,
   *     value: searchValue,
   *     limit: 100
   *   });
   *
   *   return results.result?.find(value =>
   *     value.value?.toLowerCase() === searchValue.toLowerCase()
   *   );
   * };
   *
   * const exactMatch = await findExactValue(85, 15621, 31, 'красный');
   * if (exactMatch) {
   *   console.log(`Найдено точное совпадение: ${exactMatch.value} (ID: ${exactMatch.id})`);
   * }
   * ```
   */
  async searchCategoryAttributeValues(request: CategorySearchAttributeValuesRequest, options?: RequestOptions): Promise<CategorySearchAttributeValuesResponse> {
    // Валидация параметров согласно API
    if (!request.limit || request.limit < 1 || request.limit > 100) {
      throw new Error('Parameter "limit" must be between 1 and 100');
    }

    if (!request.value || request.value.length < 2) {
      throw new Error('Parameter "value" must be at least 2 characters long');
    }

    return this.httpClient.request<CategorySearchAttributeValuesRequest, CategorySearchAttributeValuesResponse>("POST", "/v1/description-category/attribute/values/search", request, options);
  }
}
