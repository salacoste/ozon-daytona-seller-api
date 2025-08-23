# Category API - Управление деревом категорий и характеристиками

Category API предоставляет возможности для работы с деревом категорий OZON, получения характеристик категорий и управления справочными значениями для создания и настройки товаров.

## Обзор API

**Количество методов:** 6  
**Основные функции:** Дерево категорий, характеристики товаров, справочники значений  
**Ключевая особенность:** Создание товаров доступно только в категориях последнего уровня

## Методы

### 1. Получение дерева категорий и типов товаров

**Метод:** `getCategoryTree()`  
**Эндпоинт:** `POST /v1/description-category/tree`

Возвращает полное дерево категорий и типов товаров. Создание товаров доступно только в категориях последнего уровня (без подкатегорий).

#### Параметры запроса

```typescript
interface CategoryGetTreeRequest {
  language?: 'DEFAULT' | 'RU' | 'EN';  // Язык ответа (по умолчанию RU)
}
```

#### Пример использования

```typescript
import { OzonSellerApiClient } from '@spacechemical/ozon-seller-api';

const client = new OzonSellerApiClient({
  apiKey: 'your-api-key',
  clientId: 'your-client-id'
});

// Получить дерево категорий
const categoryTree = await client.category.getCategoryTree({
  language: 'RU'
});

// Функция для печати дерева категорий
const printTree = (items: CategoryTreeItem[], level = 0) => {
  items.forEach(item => {
    const indent = '  '.repeat(level);
    const status = item.disabled ? '[НЕДОСТУПНА]' : '[ДОСТУПНА]';
    console.log(`${indent}${item.category_name} (ID: ${item.description_category_id}) ${status}`);
    
    if (item.type_name) {
      console.log(`${indent}  Тип: ${item.type_name} (ID: ${item.type_id})`);
    }
    
    if (item.children && item.children.length > 0) {
      printTree(item.children, level + 1);
    }
  });
};

printTree(categoryTree.result || []);

// Найти категории последнего уровня для создания товаров
const getLeafCategories = (items: CategoryTreeItem[]): CategoryTreeItem[] => {
  const result: CategoryTreeItem[] = [];
  items.forEach(item => {
    if ((!item.children || item.children.length === 0) && !item.disabled) {
      result.push(item);
    } else if (item.children) {
      result.push(...getLeafCategories(item.children));
    }
  });
  return result;
};

const availableCategories = getLeafCategories(categoryTree.result || []);
console.log(`Доступно категорий для создания товаров: ${availableCategories.length}`);
```

#### Структура ответа

```typescript
interface CategoryTreeItem {
  description_category_id?: number;    // ID категории
  category_name?: string;              // Название категории
  disabled?: boolean;                  // Недоступна для создания товаров
  type_id?: number;                    // ID типа товара
  type_name?: string;                  // Название типа товара
  children?: CategoryTreeItem[];       // Подкатегории
}
```

### 2. Получение характеристик категории

**Метод:** `getCategoryAttributes()`  
**Эндпоинт:** `POST /v1/description-category/attribute`

Получает список характеристик для указанной категории и типа товара, включая информацию о справочниках значений.

#### Параметры запроса

```typescript
interface CategoryGetAttributesRequest {
  description_category_id: number;     // ID категории
  type_id: number;                     // ID типа товара
  language?: 'DEFAULT' | 'RU' | 'EN';  // Язык ответа
}
```

#### Пример использования

```typescript
// Получить характеристики для категории и типа товара
const attributes = await client.category.getCategoryAttributes({
  description_category_id: 15621,
  type_id: 31,
  language: 'RU'
});

attributes.result?.forEach(attr => {
  console.log(`Характеристика: ${attr.name} (ID: ${attr.id})`);
  console.log(`  Тип: ${attr.type}`);
  console.log(`  Обязательная: ${attr.is_required ? 'Да' : 'Нет'}`);
  console.log(`  Коллекция: ${attr.is_collection ? 'Да' : 'Нет'}`);
  console.log(`  Аспектная: ${attr.is_aspect ? 'Да' : 'Нет'}`);
  console.log(`  Группа: ${attr.group_name} (ID: ${attr.group_id})`);
  
  if (attr.dictionary_id && attr.dictionary_id > 0) {
    console.log(`  Справочник: ${attr.dictionary_id}`);
    console.log(`  Зависит от категории: ${attr.category_dependent ? 'Да' : 'Нет'}`);
  } else {
    console.log(`  Справочник: отсутствует`);
  }
  
  if (attr.description) {
    console.log(`  Описание: ${attr.description}`);
  }
  
  console.log('');
});

// Найти обязательные характеристики
const requiredAttributes = attributes.result?.filter(attr => attr.is_required) || [];
console.log(`Обязательных характеристик: ${requiredAttributes.length}`);

// Найти характеристики со справочниками
const dictionaryAttributes = attributes.result?.filter(attr => 
  attr.dictionary_id && attr.dictionary_id > 0
) || [];
console.log(`Характеристик со справочниками: ${dictionaryAttributes.length}`);
```

#### Структура характеристики

```typescript
interface CategoryAttribute {
  id?: number;                    // ID характеристики
  name?: string;                  // Название характеристики
  description?: string;           // Описание
  type?: string;                  // Тип характеристики
  is_collection?: boolean;        // Можно указать несколько значений
  is_required?: boolean;          // Обязательная для заполнения
  is_aspect?: boolean;            // Аспектная характеристика
  group_id?: number;              // ID группы характеристик
  group_name?: string;            // Название группы
  dictionary_id?: number;         // ID справочника (0 = нет справочника)
  category_dependent?: boolean;   // Значения зависят от категории
}
```

### 3. Получение значений характеристики

**Метод:** `getCategoryAttributeValues()`  
**Эндпоинт:** `POST /v1/description-category/attribute/values`

Возвращает справочник значений для указанной характеристики с поддержкой пагинации.

#### Параметры запроса

```typescript
interface CategoryGetAttributeValuesRequest {
  attribute_id: number;                // ID характеристики
  description_category_id: number;     // ID категории
  type_id: number;                     // ID типа товара
  language?: 'DEFAULT' | 'RU' | 'EN';  // Язык ответа
  limit?: number;                      // Количество значений (по умолчанию 100)
  last_value_id?: number;              // ID последнего значения для пагинации
}
```

#### Пример использования

```typescript
// Получить первую страницу значений характеристики
const attributeValues = await client.category.getCategoryAttributeValues({
  attribute_id: 85,
  description_category_id: 15621,
  type_id: 31,
  limit: 100,
  language: 'RU'
});

attributeValues.result?.forEach(value => {
  console.log(`Значение: ${value.value} (ID: ${value.id})`);
  if (value.info) {
    console.log(`  Описание: ${value.info}`);
  }
  if (value.picture) {
    console.log(`  Изображение: ${value.picture}`);
  }
});

// Функция для получения всех значений с пагинацией
const getAllAttributeValues = async (attributeId: number, categoryId: number, typeId: number) => {
  const allValues: CategoryAttributeValue[] = [];
  let lastValueId: number | undefined;
  
  do {
    const response = await client.category.getCategoryAttributeValues({
      attribute_id: attributeId,
      description_category_id: categoryId,
      type_id: typeId,
      limit: 1000,
      last_value_id: lastValueId
    });
    
    if (response.result) {
      allValues.push(...response.result);
      lastValueId = response.result[response.result.length - 1]?.id;
    }
    
    if (!response.has_next) {
      break;
    }
  } while (true);
  
  return allValues;
};

const allValues = await getAllAttributeValues(85, 15621, 31);
console.log(`Всего значений: ${allValues.length}`);
```

### 4. Поиск значений характеристики

**Метод:** `searchCategoryAttributeValues()`  
**Эндпоинт:** `POST /v1/description-category/attribute/values/search`

Возвращает справочные значения характеристики по заданному поисковому запросу.

#### Параметры запроса

```typescript
interface CategorySearchAttributeValuesRequest {
  attribute_id: number;                // ID характеристики
  description_category_id: number;     // ID категории
  type_id: number;                     // ID типа товара
  value: string;                       // Поисковый запрос
  limit?: number;                      // Количество значений (максимум 1000)
}
```

#### Пример использования

```typescript
// Поиск значений цвета по запросу "крас"
const searchResults = await client.category.searchCategoryAttributeValues({
  attribute_id: 85,
  description_category_id: 15621,
  type_id: 31,
  value: 'крас',
  limit: 50
});

console.log(`Найдено значений: ${searchResults.result?.length || 0}`);

searchResults.result?.forEach(value => {
  console.log(`- ${value.value} (ID: ${value.id})`);
  if (value.info) {
    console.log(`  Описание: ${value.info}`);
  }
});

// Функция для поиска значения по точному совпадению
const findExactValue = async (attributeId: number, categoryId: number, typeId: number, searchValue: string) => {
  const results = await client.category.searchCategoryAttributeValues({
    attribute_id: attributeId,
    description_category_id: categoryId,
    type_id: typeId,
    value: searchValue,
    limit: 100
  });
  
  return results.result?.find(value => 
    value.value?.toLowerCase() === searchValue.toLowerCase()
  );
};

const exactMatch = await findExactValue(85, 15621, 31, 'красный');
if (exactMatch) {
  console.log(`Найдено точное совпадение: ${exactMatch.value} (ID: ${exactMatch.id})`);
}
```

## Практические сценарии использования

### 1. Выбор категории для нового товара

```typescript
class CategorySelector {
  constructor(private client: OzonSellerApiClient) {}

  // Найти подходящую категорию по ключевым словам
  async findCategoriesByKeywords(keywords: string[]): Promise<CategoryMatch[]> {
    const tree = await this.client.category.getCategoryTree({ language: 'RU' });
    const leafCategories = this.getLeafCategories(tree.result || []);
    
    const matches: CategoryMatch[] = [];
    
    leafCategories.forEach(category => {
      const categoryName = category.category_name?.toLowerCase() || '';
      const typeName = category.type_name?.toLowerCase() || '';
      
      const score = keywords.reduce((acc, keyword) => {
        const lowerKeyword = keyword.toLowerCase();
        if (categoryName.includes(lowerKeyword)) acc += 2;
        if (typeName.includes(lowerKeyword)) acc += 1;
        return acc;
      }, 0);
      
      if (score > 0) {
        matches.push({
          category,
          score,
          matchedKeywords: keywords.filter(keyword => 
            categoryName.includes(keyword.toLowerCase()) || 
            typeName.includes(keyword.toLowerCase())
          )
        });
      }
    });
    
    return matches.sort((a, b) => b.score - a.score);
  }

  // Получить информацию о комиссии для категорий
  async getCategoryCommissionInfo(categoryIds: number[]) {
    // Здесь могла бы быть логика получения информации о комиссиях
    // В реальном приложении это может быть отдельный API или справочник
    console.log('Внимательно выбирайте категорию - для разных категорий применяется разный размер комиссии');
    return categoryIds.map(id => ({
      categoryId: id,
      commission: 'Информация о комиссии доступна в личном кабинете'
    }));
  }

  private getLeafCategories(items: CategoryTreeItem[]): CategoryTreeItem[] {
    const result: CategoryTreeItem[] = [];
    items.forEach(item => {
      if ((!item.children || item.children.length === 0) && !item.disabled) {
        result.push(item);
      } else if (item.children) {
        result.push(...this.getLeafCategories(item.children));
      }
    });
    return result;
  }
}

interface CategoryMatch {
  category: CategoryTreeItem;
  score: number;
  matchedKeywords: string[];
}

const selector = new CategorySelector(client);

// Найти категории для товара "смартфон"
const matches = await selector.findCategoriesByKeywords(['смартфон', 'телефон', 'мобильный']);
console.log(`Найдено ${matches.length} подходящих категорий:`);

matches.slice(0, 5).forEach(match => {
  console.log(`${match.category.category_name} - ${match.category.type_name}`);
  console.log(`  ID категории: ${match.category.description_category_id}, ID типа: ${match.category.type_id}`);
  console.log(`  Совпадения: ${match.matchedKeywords.join(', ')} (score: ${match.score})`);
  console.log('');
});
```

### 2. Анализ характеристик для создания товара

```typescript
class AttributeAnalyzer {
  constructor(private client: OzonSellerApiClient) {}

  async analyzeCategory(categoryId: number, typeId: number) {
    const attributes = await this.client.category.getCategoryAttributes({
      description_category_id: categoryId,
      type_id: typeId,
      language: 'RU'
    });

    const analysis = {
      total: attributes.result?.length || 0,
      required: 0,
      optional: 0,
      withDictionary: 0,
      withoutDictionary: 0,
      collections: 0,
      aspects: 0,
      groups: new Set<string>()
    };

    const attributesByGroup = new Map<string, CategoryAttribute[]>();
    
    attributes.result?.forEach(attr => {
      if (attr.is_required) analysis.required++;
      else analysis.optional++;
      
      if (attr.dictionary_id && attr.dictionary_id > 0) analysis.withDictionary++;
      else analysis.withoutDictionary++;
      
      if (attr.is_collection) analysis.collections++;
      if (attr.is_aspect) analysis.aspects++;
      
      if (attr.group_name) {
        analysis.groups.add(attr.group_name);
        
        if (!attributesByGroup.has(attr.group_name)) {
          attributesByGroup.set(attr.group_name, []);
        }
        attributesByGroup.get(attr.group_name)!.push(attr);
      }
    });

    console.log(`Анализ характеристик для категории ${categoryId}, тип ${typeId}:`);
    console.log(`Всего характеристик: ${analysis.total}`);
    console.log(`Обязательных: ${analysis.required}`);
    console.log(`Опциональных: ${analysis.optional}`);
    console.log(`Со справочниками: ${analysis.withDictionary}`);
    console.log(`Без справочников: ${analysis.withoutDictionary}`);
    console.log(`Коллекций: ${analysis.collections}`);
    console.log(`Аспектных: ${analysis.aspects}`);
    console.log(`Групп характеристик: ${analysis.groups.size}`);
    console.log('');

    // Анализ по группам
    console.log('Характеристики по группам:');
    attributesByGroup.forEach((attrs, groupName) => {
      const requiredInGroup = attrs.filter(a => a.is_required).length;
      console.log(`${groupName}: ${attrs.length} характеристик (${requiredInGroup} обязательных)`);
      
      attrs.filter(a => a.is_required).forEach(attr => {
        console.log(`  - ${attr.name} (ID: ${attr.id}) [ОБЯЗАТЕЛЬНАЯ]`);
      });
    });

    return {
      analysis,
      attributesByGroup,
      requiredAttributes: attributes.result?.filter(a => a.is_required) || []
    };
  }

  async validateProductData(categoryId: number, typeId: number, productData: any) {
    const { requiredAttributes } = await this.analyzeCategory(categoryId, typeId);
    const errors: string[] = [];
    const warnings: string[] = [];

    requiredAttributes.forEach(attr => {
      const attrId = attr.id?.toString();
      if (!productData.attributes || !productData.attributes[attrId!]) {
        errors.push(`Отсутствует обязательная характеристика: ${attr.name} (ID: ${attr.id})`);
      }
    });

    return { errors, warnings, isValid: errors.length === 0 };
  }
}

const analyzer = new AttributeAnalyzer(client);

// Анализ категории смартфонов
const analysis = await analyzer.analyzeCategory(15621, 31);

// Проверка данных товара
const productData = {
  name: 'iPhone 15',
  attributes: {
    '85': [123], // Цвет
    '10096': ['Apple'], // Бренд
    // ... другие характеристики
  }
};

const validation = await analyzer.validateProductData(15621, 31, productData);
if (!validation.isValid) {
  console.log('Ошибки в данных товара:');
  validation.errors.forEach(error => console.log(`- ${error}`));
}
```

### 3. Система автодополнения для характеристик

```typescript
class AttributeAutocomplete {
  constructor(private client: OzonSellerApiClient) {}

  async searchValues(
    attributeId: number, 
    categoryId: number, 
    typeId: number, 
    query: string,
    limit: number = 10
  ) {
    if (query.length < 2) {
      return [];
    }

    try {
      const results = await this.client.category.searchCategoryAttributeValues({
        attribute_id: attributeId,
        description_category_id: categoryId,
        type_id: typeId,
        value: query,
        limit
      });

      return (results.result || []).map(value => ({
        id: value.id,
        value: value.value,
        description: value.info,
        picture: value.picture
      }));
    } catch (error) {
      console.error('Ошибка поиска значений:', error);
      return [];
    }
  }

  async suggestBrands(categoryId: number, typeId: number, query: string) {
    // Предполагаем, что ID характеристики "Бренд" = 10096
    return this.searchValues(10096, categoryId, typeId, query, 20);
  }

  async suggestColors(categoryId: number, typeId: number, query: string) {
    // Предполагаем, что ID характеристики "Цвет" = 85
    return this.searchValues(85, categoryId, typeId, query, 15);
  }

  async suggestSizes(categoryId: number, typeId: number, query: string) {
    // Предполагаем, что ID характеристики "Размер" = 4180
    return this.searchValues(4180, categoryId, typeId, query, 30);
  }
}

const autocomplete = new AttributeAutocomplete(client);

// Поиск брендов, начинающихся на "App"
const brandSuggestions = await autocomplete.suggestBrands(15621, 31, 'App');
console.log('Предложения брендов:');
brandSuggestions.forEach(brand => {
  console.log(`- ${brand.value} (ID: ${brand.id})`);
});

// Поиск цветов, содержащих "син"
const colorSuggestions = await autocomplete.suggestColors(15621, 31, 'син');
console.log('Предложения цветов:');
colorSuggestions.forEach(color => {
  console.log(`- ${color.value} (ID: ${color.id})`);
});
```

### 4. Кэширование данных категорий

```typescript
class CategoryCache {
  private treeCache: Map<string, { data: any; timestamp: number }> = new Map();
  private attributesCache: Map<string, { data: any; timestamp: number }> = new Map();
  private valuesCache: Map<string, { data: any; timestamp: number }> = new Map();
  private cacheTimeout = 60 * 60 * 1000; // 1 час

  constructor(private client: OzonSellerApiClient) {}

  async getCategoryTree(language: string = 'RU', useCache: boolean = true) {
    const cacheKey = `tree-${language}`;
    
    if (useCache && this.isCacheValid(this.treeCache, cacheKey)) {
      return this.treeCache.get(cacheKey)!.data;
    }

    const data = await this.client.category.getCategoryTree({ language });
    this.treeCache.set(cacheKey, { data, timestamp: Date.now() });
    
    return data;
  }

  async getCategoryAttributes(
    categoryId: number, 
    typeId: number, 
    language: string = 'RU',
    useCache: boolean = true
  ) {
    const cacheKey = `attributes-${categoryId}-${typeId}-${language}`;
    
    if (useCache && this.isCacheValid(this.attributesCache, cacheKey)) {
      return this.attributesCache.get(cacheKey)!.data;
    }

    const data = await this.client.category.getCategoryAttributes({
      description_category_id: categoryId,
      type_id: typeId,
      language
    });
    
    this.attributesCache.set(cacheKey, { data, timestamp: Date.now() });
    return data;
  }

  async getAttributeValues(
    attributeId: number,
    categoryId: number,
    typeId: number,
    useCache: boolean = true
  ) {
    const cacheKey = `values-${attributeId}-${categoryId}-${typeId}`;
    
    if (useCache && this.isCacheValid(this.valuesCache, cacheKey)) {
      return this.valuesCache.get(cacheKey)!.data;
    }

    // Получаем все значения с пагинацией
    const allValues: any[] = [];
    let lastValueId: number | undefined;
    
    do {
      const response = await this.client.category.getCategoryAttributeValues({
        attribute_id: attributeId,
        description_category_id: categoryId,
        type_id: typeId,
        limit: 1000,
        last_value_id: lastValueId
      });
      
      if (response.result) {
        allValues.push(...response.result);
        lastValueId = response.result[response.result.length - 1]?.id;
      }
      
      if (!response.has_next) break;
    } while (true);
    
    const data = { result: allValues, total: allValues.length };
    this.valuesCache.set(cacheKey, { data, timestamp: Date.now() });
    
    return data;
  }

  private isCacheValid(cache: Map<string, { data: any; timestamp: number }>, key: string): boolean {
    const cached = cache.get(key);
    if (!cached) return false;
    
    return Date.now() - cached.timestamp < this.cacheTimeout;
  }

  clearCache() {
    this.treeCache.clear();
    this.attributesCache.clear();
    this.valuesCache.clear();
    console.log('Кэш очищен');
  }

  getCacheStats() {
    return {
      tree: this.treeCache.size,
      attributes: this.attributesCache.size,
      values: this.valuesCache.size
    };
  }
}

const cache = new CategoryCache(client);

// Использование с кэшированием
const tree = await cache.getCategoryTree('RU');
const attributes = await cache.getCategoryAttributes(15621, 31, 'RU');
const values = await cache.getAttributeValues(85, 15621, 31);

console.log('Статистика кэша:', cache.getCacheStats());
```

## Обработка ошибок

### Типичные ошибки

```typescript
try {
  const attributes = await client.category.getCategoryAttributes({
    description_category_id: 15621,
    type_id: 31,
    language: 'RU'
  });
} catch (error) {
  if (error.response?.status === 400) {
    const errorData = error.response.data;
    
    switch (errorData.code) {
      case 'INVALID_CATEGORY_ID':
        console.error('Неверный ID категории');
        break;
      case 'INVALID_TYPE_ID':
        console.error('Неверный ID типа товара');
        break;
      case 'CATEGORY_TYPE_MISMATCH':
        console.error('Тип товара не соответствует категории');
        break;
      case 'CATEGORY_DISABLED':
        console.error('Категория недоступна для создания товаров');
        break;
      default:
        console.error('Неизвестная ошибка:', errorData.message);
    }
  } else if (error.response?.status === 404) {
    console.error('Категория или тип товара не найдены');
  } else if (error.response?.status === 429) {
    console.error('Превышен лимит запросов. Повторите попытку позже.');
  } else {
    console.error('Произошла ошибка:', error.message);
  }
}
```

## Лучшие практики

### 1. Оптимизация запросов

```typescript
// Кэшируйте дерево категорий - оно меняется редко
const categoryTree = await client.category.getCategoryTree();

// Используйте пагинацию для больших справочников
async function getAllValues(attributeId: number, categoryId: number, typeId: number) {
  const values = [];
  let lastId: number | undefined;
  
  while (true) {
    const response = await client.category.getCategoryAttributeValues({
      attribute_id: attributeId,
      description_category_id: categoryId,
      type_id: typeId,
      limit: 1000,
      last_value_id: lastId
    });
    
    if (response.result?.length) {
      values.push(...response.result);
      lastId = response.result[response.result.length - 1].id;
    }
    
    if (!response.has_next) break;
  }
  
  return values;
}
```

### 2. Валидация данных товара

```typescript
// Всегда проверяйте обязательные характеристики перед созданием товара
const requiredAttributes = attributes.result?.filter(attr => attr.is_required);

// Убедитесь, что используете правильные значения из справочников
const isValidValue = async (attributeId: number, valueId: number) => {
  const values = await getAllValues(attributeId, categoryId, typeId);
  return values.some(v => v.id === valueId);
};
```

### 3. Работа с многоязычностью

```typescript
// Получайте данные на нужном языке
const treeRU = await client.category.getCategoryTree({ language: 'RU' });
const treeEN = await client.category.getCategoryTree({ language: 'EN' });
```

---

**Связанные API:** Product API (создание товаров), Prices-Stocks API (управление ценами), Barcode API (штрихкоды)