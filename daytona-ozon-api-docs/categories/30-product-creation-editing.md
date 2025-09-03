# Создание и редактирование товаров

**5 методов** — полный цикл создания и редактирования товаров на платформе OZON

## 📊 Обзор методов API

### 🛠️ Создание и редактирование (5 методов)
1. **importProducts()** — Создать или обновить товар (основной метод v3)
2. **importBySku()** — Создать товар по SKU (копирование)
3. **updateAttributes()** — Обновить характеристики товара
4. **updateOfferID()** — Изменить артикулы товаров из системы продавца
5. **getImportInfo()** — Узнать статус добавления или обновления товара

---

## 📋 Полная типизация интерфейсов

### Request Types

```typescript
/**
 * Запрос создания/обновления товара v3
 * Request for creating/updating product v3
 */
interface ImportProductsV3Request {
  /** Список товаров для создания/обновления (до 100 товаров) */
  items: ProductImportItem[];
}

interface ProductImportItem {
  /** Артикул продавца (обязательно) */
  offer_id: string;
  /** Название товара */
  name: string;
  /** Описание товара */
  description?: string;
  /** ID категории товара */
  category_id: number;
  /** Цена товара */
  price: string;
  /** Код валюты (должен совпадать с настройками кабинета) */
  currency_code: 'RUB' | 'USD' | 'EUR' | 'CNY' | 'KZT' | 'BYN';
  /** Главное изображение товара */
  primary_image?: string;
  /** Дополнительные изображения (до 14, если есть primary_image) */
  images?: string[];
  /** Изображения 360 */
  images360?: string[];
  /** Маркетинговое изображение цвета */
  color_image?: string;
  /** Вес товара */
  weight?: number;
  /** Единица измерения веса */
  weight_unit?: 'g' | 'kg' | 'lb';
  /** Ширина товара */
  width?: number;
  /** Высота товара */
  height?: number;
  /** Глубина товара */
  depth?: number;
  /** Единица измерения габаритов */
  dimension_unit?: 'mm' | 'cm' | 'in';
  /** Атрибуты товара */
  attributes?: ProductAttribute[];
  /** Сложные атрибуты (для видео, таблиц размеров) */
  complex_attributes?: ComplexAttribute[];
  /** Штрихкод */
  barcode?: string;
  /** VAT ставка */
  vat?: string;
}

interface ProductAttribute {
  /** ID атрибута */
  id: number;
  /** Значения атрибута */
  values: AttributeValue[];
}

interface ComplexAttribute {
  /** Список атрибутов */
  attributes: ComplexAttributeItem[];
}

interface ComplexAttributeItem {
  /** ID сложного атрибута */
  complex_id: number;
  /** ID атрибута */
  id: number;
  /** Значения */
  values: ComplexAttributeValue[];
}

/**
 * Запрос создания товара по SKU
 * Request for creating product by SKU
 */
interface ImportProductsBySKURequest {
  /** Список товаров для копирования */
  items: ImportBySKUItem[];
}

interface ImportBySKUItem {
  /** SKU товара для копирования */
  sku: string;
  /** Новый артикул продавца */
  offer_id: string;
  /** Валюта (если отличается) */
  currency_code?: string;
}

/**
 * Запрос обновления атрибутов товара
 * Request for updating product attributes
 */
interface ProductUpdateAttributesRequest {
  /** Список товаров для обновления атрибутов */
  items: UpdateAttributesItem[];
}

interface UpdateAttributesItem {
  /** Артикул товара */
  offer_id: string;
  /** Новые атрибуты товара */
  attributes: ProductAttribute[];
}

/**
 * Запрос изменения артикулов
 * Request for updating offer IDs
 */
interface UpdateOfferIdRequest {
  /** Список товаров для изменения артикулов (до 250 товаров) */
  update_offer_id: OfferIdUpdate[];
}

interface OfferIdUpdate {
  /** Текущий артикул */
  offer_id: string;
  /** Новый артикул */
  new_offer_id: string;
  /** ID товара (альтернативно offer_id) */
  product_id?: number;
}

/**
 * Запрос статуса импорта
 * Request for import status
 */
interface GetImportInfoRequest {
  /** ID задачи импорта */
  task_id: number;
}
```

### Response Types

```typescript
/**
 * Ответ создания/обновления товаров v3
 * Response for creating/updating products v3
 */
interface ImportProductsV3Response {
  /** Результат операции */
  result?: {
    /** ID задачи для отслеживания статуса */
    task_id: number;
  };
}

/**
 * Ответ создания товара по SKU
 * Response for creating product by SKU
 */
interface ImportProductsBySKUResponse {
  /** Результат операции */
  result?: {
    /** ID задачи */
    task_id: number;
    /** Список товаров с результатами */
    items?: ImportBySKUResult[];
  };
}

interface ImportBySKUResult {
  /** Артикул продавца */
  offer_id: string;
  /** ID товара (если создан успешно) */
  product_id?: number;
  /** Список ошибок */
  errors?: ImportError[];
}

/**
 * Статус импорта товаров
 * Import status response
 */
interface ImportProductsStatusResponse {
  /** Результат операции */
  result?: {
    /** ID задачи */
    task_id: number;
    /** Статус задачи */
    status: ImportStatus;
    /** Общее количество товаров */
    total: number;
    /** Обработано товаров */
    processed: number;
    /** Успешно обработано */
    succeeded: number;
    /** Обработано с ошибками */
    failed: number;
    /** Список товаров с результатами */
    items?: ImportStatusItem[];
  };
}

interface ImportStatusItem {
  /** Артикул продавца */
  offer_id: string;
  /** ID товара */
  product_id?: number;
  /** Статус обработки товара */
  status: 'imported' | 'failed' | 'processing';
  /** Список ошибок (если есть) */
  errors?: ImportError[];
}

interface ImportError {
  /** Код ошибки */
  code: string;
  /** Описание ошибки */
  message: string;
  /** Поле, в котором ошибка */
  field?: string;
  /** Дополнительная информация */
  details?: any;
}

/**
 * Ответ обновления артикулов
 * Response for updating offer IDs
 */
interface UpdateOfferIdResponse {
  /** Результаты для каждого товара */
  result?: OfferIdUpdateResult[];
}

interface OfferIdUpdateResult {
  /** Старый артикул */
  offer_id: string;
  /** Новый артикул */
  new_offer_id: string;
  /** Успешность операции */
  updated: boolean;
  /** Ошибки (если есть) */
  errors?: ImportError[];
}

enum ImportStatus {
  /** Задача ожидает обработки */
  PENDING = 'pending',
  /** Задача выполняется */
  PROCESSING = 'processing',
  /** Задача завершена */
  PROCESSED = 'processed',
  /** Задача завершена с ошибками */
  FAILED = 'failed'
}
```

---

## 🛠️ Практические примеры использования

### 1. Создание товаров с полным набором атрибутов

```typescript
import { ProductApi } from 'daytona-ozon-seller-api';

const productApi = new ProductApi(httpClient);

// Создание товара с видео и таблицей размеров
async function createProductWithRichContent(): Promise<void> {
  try {
    const productRequest: ImportProductsV3Request = {
      items: [{
        offer_id: 'PREMIUM-TSHIRT-001',
        name: 'Премиум футболка с принтом',
        description: 'Высококачественная хлопковая футболка с уникальным дизайном. Комфортная посадка и яркие цвета.',
        category_id: 15621, // Категория "Футболки"
        price: '2990.00',
        currency_code: 'RUB',
        primary_image: 'https://example.com/images/tshirt-main.jpg',
        images: [
          'https://example.com/images/tshirt-front.jpg',
          'https://example.com/images/tshirt-back.jpg',
          'https://example.com/images/tshirt-detail.jpg'
        ],
        images360: [
          'https://example.com/images/360/tshirt-1.jpg',
          'https://example.com/images/360/tshirt-2.jpg'
        ],
        color_image: 'https://example.com/images/color-red.jpg',
        weight: 180,
        weight_unit: 'g',
        width: 500,
        height: 600,
        depth: 10,
        dimension_unit: 'mm',
        attributes: [
          {
            id: 4180, // Цвет
            values: [{ value: 'Красный' }]
          },
          {
            id: 4185, // Размер
            values: [{ value: 'M' }, { value: 'L' }, { value: 'XL' }]
          },
          {
            id: 4191, // Материал
            values: [{ value: '100% хлопок' }]
          },
          {
            id: 4205, // Пол
            values: [{ dictionary_value_id: 61576 }] // Унисекс
          }
        ],
        complex_attributes: [
          {
            // Видео товара
            attributes: [
              {
                complex_id: 100001,
                id: 21841, // Ссылка на видео
                values: [{ value: 'https://youtube.com/watch?v=example' }]
              },
              {
                complex_id: 100001,
                id: 21837, // Название видео
                values: [{ value: 'Обзор премиум футболки' }]
              }
            ]
          },
          {
            // Таблица размеров в формате JSON
            attributes: [
              {
                complex_id: 0,
                id: 13164, // Rich-контент
                values: [{
                  value: JSON.stringify({
                    type: 'size_table',
                    data: {
                      headers: ['Размер', 'Грудь (см)', 'Длина (см)'],
                      rows: [
                        ['M', '96-104', '70'],
                        ['L', '104-112', '73'],
                        ['XL', '112-120', '76']
                      ]
                    }
                  })
                }]
              }
            ]
          }
        ],
        barcode: '4607177123456'
      }]
    };

    console.log('🚀 Создание товара с расширенным контентом...');
    
    const response = await productApi.importProducts(productRequest);
    
    if (response.result?.task_id) {
      console.log(`✅ Товар поставлен в очередь на создание: ${response.result.task_id}`);
      
      // Отслеживаем статус выполнения
      await trackImportStatus(response.result.task_id);
    }

  } catch (error) {
    console.error('❌ Ошибка при создании товара:', error);
    throw error;
  }
}

// Массовое создание товаров
async function bulkCreateProducts(products: Partial<ProductImportItem>[]): Promise<void> {
  try {
    // Разбиваем на батчи по 100 товаров
    const batches = chunkArray(products, 100);
    const taskIds: number[] = [];

    for (let i = 0; i < batches.length; i++) {
      console.log(`📦 Обработка батча ${i + 1}/${batches.length} (${batches[i].length} товаров)`);
      
      const batchRequest: ImportProductsV3Request = {
        items: batches[i].map(product => ({
          offer_id: product.offer_id || `AUTO-${Date.now()}-${Math.random()}`,
          name: product.name || 'Товар без названия',
          category_id: product.category_id || 15621,
          price: product.price || '100.00',
          currency_code: product.currency_code || 'RUB',
          ...product
        })) as ProductImportItem[]
      };

      const response = await productApi.importProducts(batchRequest);
      
      if (response.result?.task_id) {
        taskIds.push(response.result.task_id);
        console.log(`✅ Батч поставлен в очередь: ${response.result.task_id}`);
      }

      // Пауза между батчами
      await delay(2000);
    }

    console.log(`📊 Всего создано задач: ${taskIds.length}`);
    
    // Отслеживаем все задачи
    await Promise.all(taskIds.map(taskId => trackImportStatus(taskId)));

  } catch (error) {
    console.error('❌ Ошибка при массовом создании товаров:', error);
    throw error;
  }
}

// Отслеживание статуса импорта
async function trackImportStatus(taskId: number): Promise<void> {
  const maxAttempts = 20;
  let attempt = 0;

  while (attempt < maxAttempts) {
    try {
      const status = await productApi.getImportInfo({ task_id: taskId });
      
      if (!status.result) {
        console.warn(`⚠️ Не удалось получить статус задачи ${taskId}`);
        return;
      }

      const { status: taskStatus, total, processed, succeeded, failed } = status.result;
      
      console.log(`📊 Задача ${taskId}: ${taskStatus} (${processed}/${total})`);

      if (taskStatus === 'processed') {
        console.log(`✅ Задача завершена: успешно ${succeeded}, ошибок ${failed}`);
        
        // Показываем детали ошибок, если есть
        if (status.result.items) {
          const failedItems = status.result.items.filter(item => item.status === 'failed');
          if (failedItems.length > 0) {
            console.log('❌ Товары с ошибками:');
            failedItems.forEach(item => {
              console.log(`  ${item.offer_id}: ${item.errors?.map(e => e.message).join(', ')}`);
            });
          }
        }
        return;
      }

      if (taskStatus === 'failed') {
        console.error(`❌ Задача ${taskId} завершена с ошибкой`);
        return;
      }

      // Ждем перед следующей проверкой
      await delay(5000);
      attempt++;

    } catch (error) {
      console.error(`❌ Ошибка при проверке статуса задачи ${taskId}:`, error);
      return;
    }
  }

  console.warn(`⚠️ Превышено максимальное количество попыток для задачи ${taskId}`);
}

// Пример использования
await createProductWithRichContent();

await bulkCreateProducts([
  {
    name: 'Товар 1',
    price: '1000.00',
    category_id: 15621
  },
  {
    name: 'Товар 2', 
    price: '2000.00',
    category_id: 15621
  }
]);

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

### 2. Копирование товаров по SKU

```typescript
// Копирование существующих товаров
async function copyProductsBySku(skuMappings: {sku: string, newOfferId: string}[]): Promise<void> {
  try {
    console.log(`📋 Копирование ${skuMappings.length} товаров...`);

    const copyRequest: ImportProductsBySKURequest = {
      items: skuMappings.map(mapping => ({
        sku: mapping.sku,
        offer_id: mapping.newOfferId,
        currency_code: 'RUB' // При необходимости можно изменить валюту
      }))
    };

    const response = await productApi.importBySku(copyRequest);

    if (response.result?.task_id) {
      console.log(`✅ Копирование поставлено в очередь: ${response.result.task_id}`);
      
      // Показываем предварительные результаты
      if (response.result.items) {
        response.result.items.forEach(item => {
          if (item.product_id) {
            console.log(`✅ ${item.offer_id}: скопирован как ${item.product_id}`);
          } else if (item.errors) {
            console.log(`❌ ${item.offer_id}: ${item.errors.map(e => e.message).join(', ')}`);
          }
        });
      }

      await trackImportStatus(response.result.task_id);
    }

  } catch (error) {
    console.error('❌ Ошибка при копировании товаров:', error);
    throw error;
  }
}

// Пример использования
await copyProductsBySku([
  { sku: '123456789', newOfferId: 'COPY-ITEM-001' },
  { sku: '987654321', newOfferId: 'COPY-ITEM-002' }
]);
```

---

## 🎯 Бизнес-логика и автоматизация

### 1. Автоматическое создание товаров из каталога

```typescript
/**
 * Класс для автоматического создания товаров из внешних источников
 */
class ProductCreationAutomation {
  constructor(private productApi: ProductApi) {}

  /**
   * Импорт товаров из CSV файла
   */
  async importFromCSV(csvData: any[]): Promise<void> {
    console.log(`📊 Импорт ${csvData.length} товаров из CSV...`);

    try {
      // Валидируем данные
      const validProducts = this.validateCSVData(csvData);
      console.log(`✅ Валидных товаров: ${validProducts.length}/${csvData.length}`);

      // Конвертируем в формат API
      const productItems = validProducts.map(row => this.csvRowToProduct(row));

      // Создаем товары батчами
      await this.createProductsBatched(productItems);

    } catch (error) {
      console.error('❌ Ошибка при импорте из CSV:', error);
      throw error;
    }
  }

  private validateCSVData(csvData: any[]): any[] {
    return csvData.filter((row, index) => {
      const errors: string[] = [];

      if (!row.offer_id?.trim()) errors.push('отсутствует артикул');
      if (!row.name?.trim()) errors.push('отсутствует название');
      if (!row.price || isNaN(parseFloat(row.price))) errors.push('некорректная цена');
      if (!row.category_id || isNaN(parseInt(row.category_id))) errors.push('некорректная категория');

      if (errors.length > 0) {
        console.warn(`⚠️ Строка ${index + 1}: ${errors.join(', ')}`);
        return false;
      }

      return true;
    });
  }

  private csvRowToProduct(row: any): ProductImportItem {
    return {
      offer_id: row.offer_id.trim(),
      name: row.name.trim(),
      description: row.description?.trim() || '',
      category_id: parseInt(row.category_id),
      price: parseFloat(row.price).toFixed(2),
      currency_code: row.currency_code || 'RUB',
      weight: row.weight ? parseInt(row.weight) : undefined,
      weight_unit: row.weight_unit || 'g',
      width: row.width ? parseInt(row.width) : undefined,
      height: row.height ? parseInt(row.height) : undefined,
      depth: row.depth ? parseInt(row.depth) : undefined,
      dimension_unit: 'mm',
      images: row.images ? row.images.split(',').map((img: string) => img.trim()) : [],
      barcode: row.barcode?.trim(),
      attributes: this.parseAttributes(row)
    };
  }

  private parseAttributes(row: any): ProductAttribute[] {
    const attributes: ProductAttribute[] = [];

    // Базовые атрибуты
    if (row.color) {
      attributes.push({
        id: 4180, // ID атрибута "Цвет"
        values: [{ value: row.color }]
      });
    }

    if (row.size) {
      attributes.push({
        id: 4185, // ID атрибута "Размер"
        values: [{ value: row.size }]
      });
    }

    if (row.material) {
      attributes.push({
        id: 4191, // ID атрибута "Материал"
        values: [{ value: row.material }]
      });
    }

    if (row.brand) {
      attributes.push({
        id: 4180, // ID атрибута "Бренд"
        values: [{ value: row.brand }]
      });
    }

    return attributes;
  }

  private async createProductsBatched(products: ProductImportItem[]): Promise<void> {
    const batches = chunkArray(products, 100);
    const results: { taskId: number; batchIndex: number }[] = [];

    for (let i = 0; i < batches.length; i++) {
      try {
        console.log(`📦 Создание батча ${i + 1}/${batches.length}`);
        
        const response = await this.productApi.importProducts({
          items: batches[i]
        });

        if (response.result?.task_id) {
          results.push({ taskId: response.result.task_id, batchIndex: i });
        }

        await delay(2000);
      } catch (error) {
        console.error(`❌ Ошибка в батче ${i + 1}:`, error);
      }
    }

    // Отслеживаем все задачи
    console.log('📊 Отслеживание выполнения всех задач...');
    await Promise.all(results.map(result => 
      this.trackBatchImport(result.taskId, result.batchIndex)
    ));
  }

  private async trackBatchImport(taskId: number, batchIndex: number): Promise<void> {
    try {
      await trackImportStatus(taskId);
      console.log(`✅ Батч ${batchIndex + 1} завершен`);
    } catch (error) {
      console.error(`❌ Ошибка в батче ${batchIndex + 1}:`, error);
    }
  }
}
```

---

## 📈 KPI и метрики эффективности

### Основные показатели создания товаров
- **Скорость создания**: Среднее время создания одного товара
- **Успешность импорта**: % товаров, созданных без ошибок
- **Полнота данных**: % товаров с полным набором характеристик
- **Качество контента**: Средний контент-рейтинг новых товаров

### Метрики качества данных
- **Обязательные поля**: % товаров с заполненными обязательными полями
- **Изображения**: Среднее количество изображений на товар
- **Описания**: % товаров с подробными описаниями
- **Атрибуты**: Среднее количество заполненных атрибутов

---

## ⚠️ Рекомендации и лучшие практики

### Создание товаров
1. **Валидация данных**: Всегда проверяйте данные перед отправкой
2. **Батчевая обработка**: Используйте максимальные размеры батчей (100 товаров)
3. **Мониторинг лимитов**: Проверяйте лимиты перед массовыми операциями
4. **Качество контента**: Добавляйте максимум атрибутов и изображений

### Обработка ошибок
1. **Логирование**: Ведите подробные логи всех операций
2. **Повторные попытки**: Реализуйте механизм повторных попыток
3. **Анализ ошибок**: Группируйте и анализируйте типы ошибок
4. **Уведомления**: Настройте уведомления о критических ошибках