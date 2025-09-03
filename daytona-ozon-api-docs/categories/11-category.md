# 🗂️ Category API - Управление категориями и характеристиками

**API для работы с деревом категорий и характеристиками товаров** — получение структуры категорий OZON, их атрибутов и справочных значений.

## 📋 Методы (4 endpoints)

| Метод | Endpoint | Назначение |
|-------|----------|------------|
| `getCategoryTree` | `/v1/description-category/tree` | Полное дерево категорий и типов товаров |
| `getCategoryAttributes` | `/v1/description-category/attribute` | Характеристики категории |
| `getCategoryAttributeValues` | `/v1/description-category/attribute/values` | Значения характеристики с пагинацией |
| `searchCategoryAttributeValues` | `/v1/description-category/attribute/values/search` | Поиск значений характеристики |

---

## 🚀 Быстрый старт

### Инициализация клиента
```typescript
import { OzonSellerAPI } from 'daytona-ozon-seller-api';

const client = new OzonSellerAPI({
  clientId: 'your-client-id',
  apiKey: 'your-api-key'
});
```

### Базовый workflow работы с категориями
```typescript
try {
  // 1. Получить дерево категорий
  const categoryTree = await client.category.getCategoryTree({
    language: 'RU'
  });

  console.log('🌳 Дерево категорий загружено');

  // 2. Найти категории для создания товаров (конечные узлы)
  const findLeafCategories = (items: any[]): any[] => {
    const leafCategories: any[] = [];
    items.forEach(item => {
      if ((!item.children || item.children.length === 0) && !item.disabled) {
        leafCategories.push(item);
      } else if (item.children) {
        leafCategories.push(...findLeafCategories(item.children));
      }
    });
    return leafCategories;
  };

  const leafCategories = findLeafCategories(categoryTree.result || []);
  console.log(`📂 Доступно категорий для создания товаров: ${leafCategories.length}`);

  if (leafCategories.length > 0) {
    const selectedCategory = leafCategories[0];
    console.log(`\n🎯 Выбрана категория: ${selectedCategory.category_name}`);
    console.log(`   ID категории: ${selectedCategory.description_category_id}`);
    console.log(`   ID типа: ${selectedCategory.type_id}`);

    // 3. Получить характеристики категории
    const attributes = await client.category.getCategoryAttributes({
      description_category_id: selectedCategory.description_category_id,
      type_id: selectedCategory.type_id,
      language: 'RU'
    });

    console.log(`\n📋 Характеристик в категории: ${attributes.result?.length || 0}`);

    // 4. Найти характеристики со справочниками значений
    const dictionaryAttributes = attributes.result?.filter(attr => 
      attr.dictionary_id && attr.dictionary_id > 0
    ) || [];

    console.log(`📖 Характеристик со справочниками: ${dictionaryAttributes.length}`);

    // 5. Получить значения для первой характеристики со справочником
    if (dictionaryAttributes.length > 0) {
      const attr = dictionaryAttributes[0];
      console.log(`\n🔍 Получение значений для "${attr.name}"...`);

      const values = await client.category.getCategoryAttributeValues({
        attribute_id: attr.id,
        description_category_id: selectedCategory.description_category_id,
        type_id: selectedCategory.type_id,
        limit: 10
      });

      console.log(`   Получено значений: ${values.result?.length || 0}`);
      values.result?.slice(0, 5).forEach((value, index) => {
        console.log(`   ${index + 1}. ${value.value} (ID: ${value.id})`);
      });
    }
  }

} catch (error) {
  console.error('❌ Ошибка работы с категориями:', error);
}
```

---

## 🎯 Основные методы

### `getCategoryTree()` - Дерево категорий
```typescript
interface CategoryGetTreeRequest {
  /** Язык ответа */
  language?: 'DEFAULT' | 'RU' | 'EN' | 'TR' | 'ZH_HANS';
}

interface CategoryTreeItem {
  /** Название категории */
  category_name: string;
  /** ID категории */
  description_category_id?: number;
  /** ID типа товара */
  type_id?: number;
  /** Название типа */
  type_name?: string;
  /** Категория отключена для создания товаров */
  disabled?: boolean;
  /** Подкategории */
  children?: CategoryTreeItem[];
}
```

### `getCategoryAttributes()` - Характеристики категории
```typescript
interface CategoryGetAttributesRequest {
  /** ID категории */
  description_category_id: number;
  /** ID типа товара */
  type_id: number;
  /** Язык ответа */
  language?: CategoryLanguage;
}

interface CategoryAttribute {
  /** ID характеристики */
  id: number;
  /** Название */
  name: string;
  /** Описание */
  description?: string;
  /** Тип данных */
  type: string;
  /** Обязательная характеристика */
  is_required: boolean;
  /** Коллекция значений */
  is_collection: boolean;
  /** Аспектная характеристика */
  is_aspect: boolean;
  /** ID справочника (0 = без справочника) */
  dictionary_id?: number;
  /** Зависит от категории */
  category_dependent?: boolean;
  /** ID группы характеристик */
  group_id?: number;
  /** Название группы */
  group_name?: string;
}
```

### `getCategoryAttributeValues()` - Значения характеристики
```typescript
interface CategoryGetAttributeValuesRequest {
  /** ID характеристики */
  attribute_id: number;
  /** ID категории */
  description_category_id: number;
  /** ID типа товара */
  type_id: number;
  /** Количество значений (1-2000) */
  limit: number;
  /** Язык ответа */
  language?: CategoryLanguage;
  /** ID для пагинации */
  last_value_id?: number;
}

interface CategoryAttributeValue {
  /** ID значения */
  id: number;
  /** Значение */
  value: string;
  /** Описание */
  info?: string;
  /** URL изображения */
  picture?: string;
}
```

### `searchCategoryAttributeValues()` - Поиск значений
```typescript
interface CategorySearchAttributeValuesRequest {
  /** ID характеристики */
  attribute_id: number;
  /** ID категории */
  description_category_id: number;
  /** ID типа товара */
  type_id: number;
  /** Поисковый запрос (мин. 2 символа) */
  value: string;
  /** Количество результатов (1-100) */
  limit: number;
}
```

---

## 💡 Практические примеры

### Анализ структуры категорий
```typescript
const analyzeCategoryTree = async () => {
  try {
    const tree = await client.category.getCategoryTree({ language: 'RU' });
    
    const stats = {
      totalCategories: 0,
      leafCategories: 0,
      disabledCategories: 0,
      maxDepth: 0
    };
    
    const analyzeNode = (items: any[], depth = 0): void => {
      stats.maxDepth = Math.max(stats.maxDepth, depth);
      
      items.forEach(item => {
        stats.totalCategories++;
        
        if (item.disabled) {
          stats.disabledCategories++;
        }
        
        if (!item.children || item.children.length === 0) {
          stats.leafCategories++;
        } else {
          analyzeNode(item.children, depth + 1);
        }
      });
    };
    
    analyzeNode(tree.result || []);
    
    console.log('📊 Анализ дерева категорий:');
    console.log(`   Всего категорий: ${stats.totalCategories}`);
    console.log(`   Конечных категорий: ${stats.leafCategories}`);
    console.log(`   Отключенных категорий: ${stats.disabledCategories}`);
    console.log(`   Максимальная глубина: ${stats.maxDepth}`);
    console.log(`   Доступно для создания товаров: ${stats.leafCategories - stats.disabledCategories}`);
    
    return stats;
    
  } catch (error) {
    console.error('❌ Ошибка анализа категорий:', error);
  }
};
```

### Поиск категории по названию
```typescript
const findCategoryByName = async (searchName: string): Promise<any[]> => {
  const tree = await client.category.getCategoryTree({ language: 'RU' });
  const results: any[] = [];
  
  const searchInTree = (items: any[], path: string[] = []): void => {
    items.forEach(item => {
      const currentPath = [...path, item.category_name];
      
      if (item.category_name.toLowerCase().includes(searchName.toLowerCase())) {
        results.push({
          ...item,
          path: currentPath.join(' → '),
          depth: currentPath.length
        });
      }
      
      if (item.children) {
        searchInTree(item.children, currentPath);
      }
    });
  };
  
  searchInTree(tree.result || []);
  
  console.log(`🔍 Найдено категорий для "${searchName}": ${results.length}`);
  results.forEach((result, index) => {
    const status = result.disabled ? '[НЕДОСТУПНА]' : '[ДОСТУПНА]';
    console.log(`${index + 1}. ${result.path} ${status}`);
    if (result.type_name) {
      console.log(`   Тип: ${result.type_name} (ID: ${result.type_id})`);
    }
  });
  
  return results;
};

// Использование
const laptopCategories = await findCategoryByName('ноутбук');
```

### Получение всех значений характеристики
```typescript
const getAllAttributeValues = async (
  attributeId: number, 
  categoryId: number, 
  typeId: number
): Promise<CategoryAttributeValue[]> => {
  const allValues: CategoryAttributeValue[] = [];
  let lastValueId: number | undefined;
  let hasMore = true;
  
  while (hasMore) {
    try {
      console.log(`📥 Загрузка значений (уже загружено: ${allValues.length})...`);
      
      const response = await client.category.getCategoryAttributeValues({
        attribute_id: attributeId,
        description_category_id: categoryId,
        type_id: typeId,
        limit: 1000,
        last_value_id: lastValueId
      });
      
      if (response.result && response.result.length > 0) {
        allValues.push(...response.result);
        lastValueId = response.result[response.result.length - 1].id;
        hasMore = response.has_next || false;
      } else {
        hasMore = false;
      }
      
      // Пауза между запросами
      if (hasMore) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
    } catch (error) {
      console.error('❌ Ошибка загрузки значений:', error);
      break;
    }
  }
  
  console.log(`✅ Всего загружено значений: ${allValues.length}`);
  return allValues;
};
```

### Анализ характеристик категории
```typescript
const analyzeCategoryAttributes = async (categoryId: number, typeId: number) => {
  try {
    const attributes = await client.category.getCategoryAttributes({
      description_category_id: categoryId,
      type_id: typeId,
      language: 'RU'
    });
    
    const analysis = {
      total: attributes.result?.length || 0,
      required: 0,
      optional: 0,
      collections: 0,
      aspects: 0,
      withDictionary: 0,
      withoutDictionary: 0,
      groups: new Set<string>()
    };
    
    const attributesByType: Record<string, number> = {};
    const requiredAttributes: any[] = [];
    const dictionaryAttributes: any[] = [];
    
    attributes.result?.forEach(attr => {
      // Базовая статистика
      if (attr.is_required) {
        analysis.required++;
        requiredAttributes.push(attr);
      } else {
        analysis.optional++;
      }
      
      if (attr.is_collection) analysis.collections++;
      if (attr.is_aspect) analysis.aspects++;
      
      // Справочники
      if (attr.dictionary_id && attr.dictionary_id > 0) {
        analysis.withDictionary++;
        dictionaryAttributes.push(attr);
      } else {
        analysis.withoutDictionary++;
      }
      
      // Группы
      if (attr.group_name) {
        analysis.groups.add(attr.group_name);
      }
      
      // Типы данных
      const type = attr.type || 'unknown';
      attributesByType[type] = (attributesByType[type] || 0) + 1;
    });
    
    console.log('📊 Анализ характеристик категории:');
    console.log(`   Всего характеристик: ${analysis.total}`);
    console.log(`   Обязательных: ${analysis.required}`);
    console.log(`   Необязательных: ${analysis.optional}`);
    console.log(`   Коллекций: ${analysis.collections}`);
    console.log(`   Аспектных: ${analysis.aspects}`);
    console.log(`   Со справочником: ${analysis.withDictionary}`);
    console.log(`   Без справочника: ${analysis.withoutDictionary}`);
    console.log(`   Групп характеристик: ${analysis.groups.size}`);
    
    console.log('\n📋 Типы данных:');
    Object.entries(attributesByType).forEach(([type, count]) => {
      console.log(`   ${type}: ${count}`);
    });
    
    console.log('\n🔴 Обязательные характеристики:');
    requiredAttributes.slice(0, 10).forEach((attr, index) => {
      console.log(`${index + 1}. ${attr.name} (${attr.type})`);
    });
    
    return {
      analysis,
      requiredAttributes,
      dictionaryAttributes,
      attributesByType
    };
    
  } catch (error) {
    console.error('❌ Ошибка анализа характеристик:', error);
  }
};
```

### Поиск и автодополнение значений
```typescript
const createAttributeAutoComplete = (attributeId: number, categoryId: number, typeId: number) => {
  return async (query: string): Promise<CategoryAttributeValue[]> => {
    if (query.length < 2) {
      return [];
    }
    
    try {
      const response = await client.category.searchCategoryAttributeValues({
        attribute_id: attributeId,
        description_category_id: categoryId,
        type_id: typeId,
        value: query,
        limit: 20
      });
      
      return response.result || [];
      
    } catch (error) {
      console.error('❌ Ошибка поиска значений:', error);
      return [];
    }
  };
};

// Использование автодополнения
const colorAutoComplete = createAttributeAutoComplete(85, 15621, 31);

const searchColors = async (query: string) => {
  console.log(`🔍 Поиск цветов: "${query}"`);
  const results = await colorAutoComplete(query);
  
  console.log(`Найдено: ${results.length} вариантов`);
  results.forEach((result, index) => {
    console.log(`${index + 1}. ${result.value} (ID: ${result.id})`);
  });
  
  return results;
};

// Поиск цветов
await searchColors('красн');
await searchColors('синий');
await searchColors('зелен');
```

### Валидация товара по категории
```typescript
const validateProductForCategory = async (categoryId: number, typeId: number, productData: any) => {
  try {
    const attributes = await client.category.getCategoryAttributes({
      description_category_id: categoryId,
      type_id: typeId,
      language: 'RU'
    });
    
    const requiredAttributes = attributes.result?.filter(attr => attr.is_required) || [];
    const errors: string[] = [];
    const warnings: string[] = [];
    
    console.log(`🔍 Валидация товара для категории ${categoryId}...`);
    
    // Проверка обязательных характеристик
    for (const attr of requiredAttributes) {
      const value = productData[attr.name] || productData[attr.id];
      
      if (!value) {
        errors.push(`Отсутствует обязательная характеристика: ${attr.name}`);
      } else if (attr.dictionary_id && attr.dictionary_id > 0) {
        // Проверка значения из справочника
        try {
          const searchResult = await client.category.searchCategoryAttributeValues({
            attribute_id: attr.id,
            description_category_id: categoryId,
            type_id: typeId,
            value: value.toString(),
            limit: 1
          });
          
          const exactMatch = searchResult.result?.find(v => 
            v.value?.toLowerCase() === value.toString().toLowerCase()
          );
          
          if (!exactMatch) {
            warnings.push(`Значение "${value}" не найдено в справочнике для "${attr.name}"`);
          }
        } catch (error) {
          warnings.push(`Не удалось проверить значение для "${attr.name}"`);
        }
      }
    }
    
    const isValid = errors.length === 0;
    
    console.log(`${isValid ? '✅' : '❌'} Валидация завершена:`);
    console.log(`   Ошибок: ${errors.length}`);
    console.log(`   Предупреждений: ${warnings.length}`);
    
    if (errors.length > 0) {
      console.log('\n🔴 Ошибки:');
      errors.forEach((error, index) => {
        console.log(`${index + 1}. ${error}`);
      });
    }
    
    if (warnings.length > 0) {
      console.log('\n🟡 Предупреждения:');
      warnings.forEach((warning, index) => {
        console.log(`${index + 1}. ${warning}`);
      });
    }
    
    return {
      isValid,
      errors,
      warnings,
      requiredAttributesCount: requiredAttributes.length
    };
    
  } catch (error) {
    console.error('❌ Ошибка валидации товара:', error);
    return {
      isValid: false,
      errors: [`Ошибка валидации: ${error.message}`],
      warnings: [],
      requiredAttributesCount: 0
    };
  }
};

// Использование валидации
const validationResult = await validateProductForCategory(15621, 31, {
  'Цвет': 'красный',
  'Материал': 'хлопок',
  // ... другие характеристики товара
});
```

---

## ⚠️ Ограничения и особенности

### Дерево категорий
- 🌳 **Создание товаров**: доступно только в категориях последнего уровня (без подкатегорий)
- ❌ **Отключенные категории**: помечены флагом `disabled`, нельзя использовать для создания товаров
- 💰 **Комиссия**: разные категории имеют разные размеры комиссии OZON

### Характеристики
- 🔴 **Обязательные**: должны быть заполнены при создании товара
- 📖 **Справочники**: `dictionary_id > 0` означает наличие справочника значений
- 🏷️ **Аспектные**: используются для фильтрации на сайте
- 📦 **Коллекции**: могут содержать несколько значений

### Лимиты и пагинация
- **Значения характеристик**: максимум 2000 за запрос
- **Поиск значений**: максимум 100 результатов, минимум 2 символа в запросе
- **Пагинация**: через `last_value_id` для получения следующих страниц

### Языки
- 🇷🇺 **RU**: русский (по умолчанию)
- 🇬🇧 **EN**: английский
- 🇹🇷 **TR**: турецкий
- 🇨🇳 **ZH_HANS**: китайский упрощенный

### Рекомендации по использованию
- 💾 **Кэширование**: сохраняйте дерево категорий локально для повышения производительности
- 🔄 **Обновления**: периодически обновляйте кэш категорий и характеристик
- ✅ **Валидация**: всегда проверяйте обязательные характеристики перед созданием товара
- 🔍 **Поиск**: используйте поиск значений для автодополнения в формах

---

**💡 Совет**: Category API - это фундамент для создания товаров на OZON. Изучите структуру категорий вашей ниши, определите обязательные характеристики и создайте систему валидации для предотвращения ошибок при создании товаров.