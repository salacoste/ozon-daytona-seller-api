# Получение информации о товарах

**6 методов** — получение списков товаров и детальной информации на платформе OZON

## 📊 Обзор методов API

### 📋 Получение списков и информации (6 методов)
1. **getList()** — Получить список товаров (v3)
2. **getProductInfoListV3()** — Получить информацию о товарах по идентификаторам
3. **getInfo()** — Получить информацию о товаре (базовая)
4. **getDescription()** — Получить описание товара
5. **getSubscription()** — Количество подписавшихся на товар пользователей
6. **getProductRating()** — Получить контент-рейтинг товаров по SKU

---

## 📋 Полная типизация интерфейсов

### Request Types

```typescript
/**
 * Запрос списка товаров v3
 * Request for product list v3
 */
interface GetProductListV3Request {
  /** Фильтры для поиска товаров */
  filter?: ProductListFilter;
  /** ID последнего товара для пагинации */
  last_id?: string;
  /** Количество товаров на странице (1-1000) */
  limit?: number;
}

interface ProductListFilter {
  /** Артикулы товаров в системе продавца */
  offer_id?: string[];
  /** Идентификаторы товаров */
  product_id?: number[];
  /** Видимость товаров */
  visibility?: 'ALL' | 'VISIBLE' | 'INVISIBLE' | 'EMPTY_STOCK' | 'NOT_MODERATED' | 'MODERATED' | 'DISABLED' | 'STATE_FAILED_MODERATION' | 'READY_TO_SUPPLY' | 'VALIDATION_STATE_PENDING' | 'VALIDATION_STATE_FAIL' | 'VALIDATION_STATE_SUCCESS' | 'TO_SUPPLY' | 'IN_SALE' | 'REMOVED_FROM_SALE' | 'BANNED' | 'OVERPRICED' | 'CRITICALLY_OVERPRICED' | 'EMPTY_BARCODE' | 'BARCODE_EXISTS' | 'QUARANTINE' | 'ARCHIVED' | 'OVERPRICED_WITH_STOCK' | 'PARTIAL_APPROVED' | 'IMAGE_ABSENT' | 'MODERATION_BLOCK';
}

/**
 * Запрос информации о товарах по идентификаторам
 * Request for product info by IDs
 */
interface GetProductInfoListV3Request {
  /** Артикулы товаров */
  offer_id?: string[];
  /** Идентификаторы товаров */
  product_id?: string[];
  /** SKU товаров в системе OZON */
  sku?: string[];
}

/**
 * Запрос описания товара
 * Request for product description
 */
interface GetProductInfoDescriptionRequest {
  /** Артикул товара ИЛИ product_id (одно из двух) */
  offer_id?: string;
  product_id?: number;
}

/**
 * Запрос подписок на товары
 * Request for product subscriptions
 */
interface GetProductInfoSubscriptionRequest {
  /** Список SKU товаров */
  skus: string[];
}

/**
 * Запрос контент-рейтинга товаров
 * Request for product content rating
 */
interface GetProductRatingBySkuRequest {
  /** Список SKU товаров для получения рейтинга */
  skus: string[];
}
```

### Response Types

```typescript
/**
 * Ответ со списком товаров
 * Product list response
 */
interface GetProductListV3Response {
  result?: {
    /** Список товаров */
    items?: ProductListItem[];
    /** ID последнего товара для пагинации */
    last_id?: string;
    /** Общее количество товаров */
    total?: number;
  };
}

interface ProductListItem {
  /** Идентификатор товара */
  product_id: number;
  /** Артикул продавца */
  offer_id: string;
  /** Название товара */
  name: string;
  /** Цена товара */
  price?: string;
  /** Валюта */
  currency_code?: string;
  /** Остатки на складах */
  stocks?: ProductStocks;
  /** Видимость товара */
  visibility?: string;
  /** Статус товара */
  status?: ProductStatus;
  /** Категория товара */
  category_id?: number;
  /** Изображения товара */
  images?: ProductImage[];
  /** SKU товара в системе OZON */
  sku?: number;
  /** Дата создания */
  created_at?: string;
  /** Дата обновления */
  updated_at?: string;
}

/**
 * Детальная информация о товарах
 * Detailed product information response
 */
interface GetProductInfoListV3Response {
  items?: DetailedProductInfo[];
}

interface DetailedProductInfo {
  /** Идентификатор товара */
  id: number;
  /** Артикул продавца */
  offer_id: string;
  /** Название товара */
  name: string;
  /** Описание товара */
  description?: string;
  /** Категория товара */
  category_id: number;
  /** Статус товара */
  status: ProductStatus;
  /** Видимость товара */
  visibility: string;
  /** Цена товара */
  price?: string;
  /** Валюта */
  currency_code?: string;
  /** Изображения */
  images?: ProductImage[];
  /** Атрибуты товара */
  attributes?: ProductAttribute[];
  /** Остатки */
  stocks?: ProductStocks;
  /** SKU в системе OZON */
  sku?: number;
  /** Штрихкод */
  barcode?: string;
  /** Вес товара */
  weight?: number;
  /** Габариты товара */
  dimensions?: ProductDimensions;
}

/**
 * Описание товара
 * Product description response
 */
interface GetProductInfoDescriptionResponse {
  result?: {
    /** Описание товара */
    description?: string;
    /** Rich-текст описание */
    rich_text_description?: string;
    /** HTML описание */
    html_description?: string;
    /** Короткое описание */
    short_description?: string;
  };
}

/**
 * Подписки на товары
 * Product subscriptions response
 */
interface GetProductInfoSubscriptionResponse {
  result?: ProductSubscriptionInfo[];
}

interface ProductSubscriptionInfo {
  /** SKU товара */
  sku: string;
  /** Количество подписавшихся пользователей */
  count: number;
  /** Доступна ли подписка */
  subscription_available: boolean;
}

/**
 * Контент-рейтинг товаров
 * Product content rating response
 */
interface GetProductRatingBySkuResponse {
  products?: ProductRatingInfo[];
}

interface ProductRatingInfo {
  /** SKU товара */
  sku: string;
  /** Контент-рейтинг (0-100) */
  rating: number;
  /** Максимально возможный рейтинг */
  max_rating: number;
  /** Рекомендации по улучшению */
  improvement_suggestions?: RatingImprovement[];
}

interface RatingImprovement {
  /** Тип улучшения */
  type: string;
  /** Описание */
  description: string;
  /** Потенциальное увеличение рейтинга */
  potential_increase: number;
}
```

### Supporting Types

```typescript
interface ProductStocks {
  /** Количество на складе FBS */
  fbs?: number;
  /** Количество на складе FBO */
  fbo?: number;
  /** Общее количество */
  present?: number;
  /** Зарезервировано */
  reserved?: number;
}

interface ProductImage {
  /** Ссылка на изображение */
  file_name: string;
  /** Является ли главным */
  default: boolean;
  /** Порядок отображения */
  index?: number;
}

interface ProductAttribute {
  /** ID атрибута */
  attribute_id: number;
  /** Название атрибута */
  attribute_name: string;
  /** Значения атрибута */
  values: AttributeValue[];
}

interface AttributeValue {
  /** Значение */
  value: string;
  /** ID значения из словаря */
  dictionary_value_id?: number;
}

interface ProductDimensions {
  /** Длина (мм) */
  length?: number;
  /** Ширина (мм) */
  width?: number;
  /** Высота (мм) */
  height?: number;
  /** Единица измерения */
  unit?: string;
}

enum ProductStatus {
  PENDING = 'pending',
  PROCESSING = 'processing', 
  PROCESSED = 'processed',
  FAILED = 'failed',
  ARCHIVED = 'archived'
}
```

---

## 🛠️ Практические примеры использования

### 1. Получение списка товаров с фильтрацией

```typescript
import { ProductApi } from 'daytona-ozon-seller-api';

const productApi = new ProductApi(httpClient);

// Получить все видимые товары
async function getAllVisibleProducts(): Promise<ProductListItem[]> {
  const allProducts: ProductListItem[] = [];
  let lastId = '';

  try {
    do {
      const response = await productApi.getList({
        filter: { visibility: 'VISIBLE' },
        limit: 1000,
        last_id: lastId
      });

      if (response.result?.items?.length) {
        allProducts.push(...response.result.items);
        lastId = response.result.last_id || '';
        
        console.log(`📦 Загружено товаров: ${allProducts.length}`);
        
        // Пауза между запросами
        await delay(1000);
      } else {
        break;
      }
    } while (lastId);

    console.log(`✅ Всего загружено: ${allProducts.length} товаров`);
    return allProducts;

  } catch (error) {
    console.error('❌ Ошибка при загрузке товаров:', error);
    throw error;
  }
}

// Получить товары по определенным артикулам
async function getProductsByOfferIds(offerIds: string[]): Promise<ProductListItem[]> {
  try {
    // Разбиваем на батчи по 1000 товаров (лимит API)
    const batches = chunkArray(offerIds, 1000);
    const allProducts: ProductListItem[] = [];

    for (const batch of batches) {
      console.log(`📦 Загрузка ${batch.length} товаров...`);
      
      const response = await productApi.getList({
        filter: { offer_id: batch },
        limit: 1000
      });

      if (response.result?.items?.length) {
        allProducts.push(...response.result.items);
      }

      await delay(500);
    }

    console.log(`✅ Найдено товаров: ${allProducts.length}/${offerIds.length}`);
    return allProducts;

  } catch (error) {
    console.error('❌ Ошибка при поиске товаров:', error);
    throw error;
  }
}

// Пример использования
const visibleProducts = await getAllVisibleProducts();
const specificProducts = await getProductsByOfferIds(['ITEM-001', 'ITEM-002']);

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}
```

### 2. Получение детальной информации о товарах

```typescript
// Получение расширенной информации о товарах
async function getDetailedProductInfo(identifiers: {
  offer_id?: string[];
  product_id?: string[];
  sku?: string[];
}): Promise<DetailedProductInfo[]> {
  try {
    console.log('🔍 Получение детальной информации о товарах...');
    
    const response = await productApi.getProductInfoListV3(identifiers);

    if (!response.items?.length) {
      console.log('ℹ️ Товары не найдены');
      return [];
    }

    console.log(`✅ Найдено товаров: ${response.items.length}`);
    
    // Анализируем полученную информацию
    response.items.forEach(product => {
      console.log(`\n📦 Товар: ${product.name} (${product.offer_id})`);
      console.log(`💰 Цена: ${product.price} ${product.currency_code}`);
      console.log(`📊 Статус: ${product.status}`);
      console.log(`👁️ Видимость: ${product.visibility}`);
      
      if (product.stocks) {
        const totalStock = product.stocks.present || 0;
        console.log(`📦 Остатки: ${totalStock} шт.`);
      }

      if (product.images?.length) {
        console.log(`🖼️ Изображений: ${product.images.length}`);
      }

      if (product.attributes?.length) {
        console.log(`🏷️ Атрибутов: ${product.attributes.length}`);
      }
    });

    return response.items;

  } catch (error) {
    console.error('❌ Ошибка при получении информации:', error);
    throw error;
  }
}

// Получить информацию по SKU с дополнительным анализом
async function analyzeProductsBySku(skus: string[]): Promise<void> {
  try {
    // Получаем детальную информацию
    const products = await getDetailedProductInfo({ sku: skus });

    // Анализируем качество контента
    const contentAnalysis = products.map(product => ({
      offer_id: product.offer_id,
      name: product.name,
      content_score: calculateContentScore(product),
      missing_elements: getMissingElements(product)
    }));

    console.log('\n📊 Анализ качества контента:');
    contentAnalysis.forEach(analysis => {
      console.log(`\n${analysis.name} (${analysis.offer_id}):`);
      console.log(`  Оценка контента: ${analysis.content_score}%`);
      
      if (analysis.missing_elements.length > 0) {
        console.log('  Отсутствует:');
        analysis.missing_elements.forEach(element => {
          console.log(`    - ${element}`);
        });
      }
    });

  } catch (error) {
    console.error('❌ Ошибка при анализе товаров:', error);
  }
}

function calculateContentScore(product: DetailedProductInfo): number {
  let score = 0;
  const maxScore = 100;

  // Наличие описания (20 баллов)
  if (product.description && product.description.length > 50) {
    score += 20;
  }

  // Наличие изображений (30 баллов)
  const imageCount = product.images?.length || 0;
  if (imageCount >= 3) score += 30;
  else if (imageCount >= 1) score += imageCount * 10;

  // Количество атрибутов (25 баллов)
  const attributeCount = product.attributes?.length || 0;
  if (attributeCount >= 5) score += 25;
  else score += attributeCount * 5;

  // Наличие габаритов и веса (15 баллов)
  if (product.weight && product.dimensions) score += 15;
  else if (product.weight || product.dimensions) score += 7;

  // Наличие штрихкода (10 баллов)
  if (product.barcode) score += 10;

  return Math.min(score, maxScore);
}

function getMissingElements(product: DetailedProductInfo): string[] {
  const missing: string[] = [];

  if (!product.description || product.description.length < 50) {
    missing.push('Подробное описание');
  }

  if (!product.images || product.images.length < 3) {
    missing.push('Достаточное количество изображений (минимум 3)');
  }

  if (!product.attributes || product.attributes.length < 5) {
    missing.push('Детальные характеристики');
  }

  if (!product.weight) {
    missing.push('Вес товара');
  }

  if (!product.dimensions) {
    missing.push('Габариты товара');
  }

  if (!product.barcode) {
    missing.push('Штрихкод');
  }

  return missing;
}

// Пример использования
await analyzeProductsBySku(['123456789', '987654321']);
```

---

## 🔄 Интеграция с другими модулями

### Связь с Product Creation API
- Информация о товарах используется для обновления характеристик
- Статусы товаров влияют на возможность редактирования
- Данные синхронизируются между модулями

### Связь с Analytics API
- Данные о товарах используются для построения аналитических отчётов
- Информация о подписках помогает в анализе спроса
- Контент-рейтинг влияет на рекомендации по оптимизации

### Связь с Pricing Strategy API
- Информация о товарах используется в стратегиях ценообразования
- Статус и видимость товаров влияют на применение стратегий
- Данные о категориях используются для группировки в стратегиях