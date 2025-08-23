# Barcode API - Управление штрихкодами

Barcode API предоставляет возможности для управления штрихкодами товаров, включая создание новых штрихкодов и привязку существующих к товарам.

## Обзор API

**Количество методов:** 2  
**Основные функции:** Создание штрихкодов, привязка существующих штрихкодов  
**Лимиты:** Максимум 20 запросов в минуту, 100 товаров за запрос

## Методы

### 1. Привязка штрихкодов к товарам

**Метод:** `addBarcodes()`  
**Эндпоинт:** `POST /v1/barcode/add`

Позволяет привязать существующие штрихкоды к товарам в системе OZON. За один запрос можно обработать до 100 товаров, на каждом товаре может быть до 100 штрихкодов.

#### Параметры запроса

```typescript
interface BarcodeAddRequest {
  barcodes: BarcodeInfo[];  // Максимум 100 элементов
}

interface BarcodeInfo {
  sku: number;      // SKU товара в системе OZON
  barcode: string;  // Штрихкод (максимум 100 символов)
}
```

#### Пример использования

```typescript
import { OzonSellerApiClient } from '@spacechemical/ozon-seller-api';

const client = new OzonSellerApiClient({
  apiKey: 'your-api-key',
  clientId: 'your-client-id'
});

// Привязать штрихкоды к товарам
const addResult = await client.barcode.addBarcodes({
  barcodes: [
    {
      sku: 123456789,
      barcode: '4600051000057' // EAN-13 штрихкод
    },
    {
      sku: 987654321,
      barcode: '123456789012' // UPC-A штрихкод
    },
    {
      sku: 555666777,
      barcode: 'CUSTOM_BARCODE_001' // Пользовательский штрихкод
    }
  ]
});

// Проверить результаты привязки
if (addResult.errors && addResult.errors.length > 0) {
  console.log('Обнаружены ошибки при привязке штрихкодов:');
  addResult.errors.forEach(error => {
    console.log(`SKU ${error.sku}, штрихкод ${error.barcode}:`);
    console.log(`  Код ошибки: ${error.code}`);
    console.log(`  Описание: ${error.error}`);
  });
} else {
  console.log('Все штрихкоды успешно привязаны!');
}
```

#### Структура ответа

```typescript
interface BarcodeAddResponse {
  errors?: BarcodeAddError[];  // Список ошибок (если есть)
}

interface BarcodeAddError {
  sku?: number;     // SKU товара с ошибкой
  barcode?: string; // Проблемный штрихкод
  code?: string;    // Код ошибки
  error?: string;   // Описание ошибки
}
```

### 2. Создание штрихкодов для товаров

**Метод:** `generateBarcodes()`  
**Эндпоинт:** `POST /v1/barcode/generate`

Автоматически создает уникальные штрихкоды для товаров, у которых их нет. OZON генерирует штрихкоды автоматически.

#### Параметры запроса

```typescript
interface BarcodeGenerateRequest {
  product_ids: string[];  // Максимум 100 идентификаторов товаров
}
```

#### Пример использования

```typescript
// Создать штрихкоды для новых товаров
const generateResult = await client.barcode.generateBarcodes({
  product_ids: [
    '123456789',
    '987654321',
    '555666777',
    '111222333'
  ]
});

// Проверить результаты создания
if (generateResult.errors && generateResult.errors.length > 0) {
  console.log('Обнаружены ошибки при создании штрихкодов:');
  generateResult.errors.forEach(error => {
    console.log(`Product ID ${error.product_id}:`);
    console.log(`  Код ошибки: ${error.code}`);
    console.log(`  Описание: ${error.error}`);
  });
} else {
  console.log('Все штрихкоды успешно созданы!');
}
```

#### Структура ответа

```typescript
interface BarcodeGenerateResponse {
  errors?: BarcodeGenerateError[];  // Список ошибок (если есть)
}

interface BarcodeGenerateError {
  product_id?: string;  // ID товара с ошибкой
  code?: string;        // Код ошибки
  error?: string;       // Описание ошибки
  barcode?: string;     // Проблемный штрихкод (если есть)
}
```

## Практические сценарии использования

### 1. Массовая привязка штрихкодов с обработкой ошибок

```typescript
async function addBarcodesInBatches(
  client: OzonSellerApiClient,
  barcodes: BarcodeInfo[]
) {
  const batchSize = 100; // Максимальный размер батча
  const results: BarcodeAddResponse[] = [];
  const allErrors: BarcodeAddError[] = [];
  
  for (let i = 0; i < barcodes.length; i += batchSize) {
    const batch = barcodes.slice(i, i + batchSize);
    
    try {
      const result = await client.barcode.addBarcodes({ 
        barcodes: batch 
      });
      
      results.push(result);
      
      if (result.errors) {
        allErrors.push(...result.errors);
      }
      
      console.log(`Обработан батч ${Math.floor(i / batchSize) + 1}/${Math.ceil(barcodes.length / batchSize)}`);
      
      // Задержка для соблюдения rate limits (20 запросов/минуту)
      if (i + batchSize < barcodes.length) {
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    } catch (error) {
      console.error(`Ошибка в батче ${Math.floor(i / batchSize) + 1}:`, error);
    }
  }
  
  const successCount = barcodes.length - allErrors.length;
  console.log(`Успешно привязано: ${successCount} штрихкодов`);
  console.log(`Ошибок: ${allErrors.length}`);
  
  return { results, errors: allErrors, successCount };
}

// Использование
const barcodes = [
  { sku: 123456789, barcode: '4600051000057' },
  { sku: 987654321, barcode: '4600051000064' },
  // ... другие штрихкоды
];

const result = await addBarcodesInBatches(client, barcodes);
```

### 2. Автоматическое создание штрихкодов для новых товаров

```typescript
async function generateBarcodesForProducts(
  client: OzonSellerApiClient,
  productIds: string[]
) {
  const batchSize = 100;
  const allErrors: BarcodeGenerateError[] = [];
  let successCount = 0;
  
  for (let i = 0; i < productIds.length; i += batchSize) {
    const batch = productIds.slice(i, i + batchSize);
    
    try {
      const result = await client.barcode.generateBarcodes({
        product_ids: batch
      });
      
      if (result.errors && result.errors.length > 0) {
        allErrors.push(...result.errors);
        successCount += batch.length - result.errors.length;
      } else {
        successCount += batch.length;
      }
      
      console.log(`Обработан батч ${Math.floor(i / batchSize) + 1}/${Math.ceil(productIds.length / batchSize)}`);
      
      // Соблюдение rate limits
      if (i + batchSize < productIds.length) {
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    } catch (error) {
      console.error(`Ошибка в батче ${Math.floor(i / batchSize) + 1}:`, error);
    }
  }
  
  console.log(`Создано штрихкодов: ${successCount}`);
  console.log(`Ошибок: ${allErrors.length}`);
  
  return { successCount, errors: allErrors };
}
```

### 3. Комплексное управление штрихкодами

```typescript
class BarcodeManager {
  constructor(private client: OzonSellerApiClient) {}

  // Создать штрихкоды для товаров без них
  async createMissingBarcodes(productIds: string[]) {
    console.log(`Создание штрихкодов для ${productIds.length} товаров...`);
    
    return await this.processInBatches(productIds, async (batch) => {
      return this.client.barcode.generateBarcodes({
        product_ids: batch
      });
    });
  }

  // Привязать существующие штрихкоды
  async bindExistingBarcodes(barcodes: BarcodeInfo[]) {
    console.log(`Привязка ${barcodes.length} штрихкодов...`);
    
    return await this.processInBatches(barcodes, async (batch) => {
      return this.client.barcode.addBarcodes({
        barcodes: batch
      });
    });
  }

  // Универсальный метод обработки батчами
  private async processInBatches<T, R>(
    items: T[],
    processor: (batch: T[]) => Promise<R>
  ) {
    const batchSize = 100;
    const results: R[] = [];
    const requestDelay = 3000; // 3 секунды между запросами
    
    for (let i = 0; i < items.length; i += batchSize) {
      const batch = items.slice(i, i + batchSize);
      
      try {
        const result = await processor(batch);
        results.push(result);
        
        const progress = Math.round(((i + batch.length) / items.length) * 100);
        console.log(`Прогресс: ${progress}% (${i + batch.length}/${items.length})`);
        
        // Пауза между запросами для соблюдения лимитов
        if (i + batchSize < items.length) {
          console.log(`Ожидание ${requestDelay / 1000}с...`);
          await new Promise(resolve => setTimeout(resolve, requestDelay));
        }
      } catch (error) {
        console.error(`Ошибка при обработке батча:`, error);
      }
    }
    
    return results;
  }

  // Валидация штрихкодов
  validateBarcode(barcode: string): boolean {
    // Основные проверки
    if (!barcode || barcode.length === 0) return false;
    if (barcode.length > 100) return false;
    
    // Проверка на допустимые символы (цифры и буквы)
    const allowedPattern = /^[a-zA-Z0-9_-]+$/;
    if (!allowedPattern.test(barcode)) return false;
    
    // Проверка на стандартные форматы штрихкодов
    const formats = {
      ean13: /^\\d{13}$/,          // EAN-13
      ean8: /^\\d{8}$/,            // EAN-8
      upca: /^\\d{12}$/,           // UPC-A
      isbn: /^(978|979)\\d{10}$/   // ISBN
    };
    
    // Если соответствует стандартному формату - дополнительная валидация
    for (const [format, pattern] of Object.entries(formats)) {
      if (pattern.test(barcode)) {
        return this.validateStandardBarcode(barcode, format);
      }
    }
    
    return true; // Пользовательские штрихкоды проходят базовую проверку
  }

  private validateStandardBarcode(barcode: string, format: string): boolean {
    // Здесь может быть контрольная сумма для стандартных штрихкодов
    // Упрощенная реализация
    return true;
  }
}

// Использование менеджера штрихкодов
const barcodeManager = new BarcodeManager(client);

// Создание штрихкодов
await barcodeManager.createMissingBarcodes(['123', '456', '789']);

// Привязка существующих
const barcodes = [
  { sku: 123456789, barcode: '4600051000057' }
];
await barcodeManager.bindExistingBarcodes(barcodes);
```

## Rate Limits и ограничения

### Лимиты API
- **Частота запросов:** Максимум 20 запросов в минуту
- **Размер батча:** До 100 товаров за запрос
- **Штрихкодов на товар:** До 100 штрихкодов на один товар
- **Длина штрихкода:** Максимум 100 символов

### Рекомендации по соблюдению лимитов

```typescript
class RateLimitedBarcodeClient {
  private lastRequestTime = 0;
  private readonly minInterval = 3000; // 3 секунды между запросами

  constructor(private client: OzonSellerApiClient) {}

  async addBarcodesWithRateLimit(request: BarcodeAddRequest) {
    await this.waitForRateLimit();
    return this.client.barcode.addBarcodes(request);
  }

  async generateBarcodesWithRateLimit(request: BarcodeGenerateRequest) {
    await this.waitForRateLimit();
    return this.client.barcode.generateBarcodes(request);
  }

  private async waitForRateLimit() {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    
    if (timeSinceLastRequest < this.minInterval) {
      const delay = this.minInterval - timeSinceLastRequest;
      console.log(`Ожидание rate limit: ${delay}мс`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    
    this.lastRequestTime = Date.now();
  }
}
```

## Обработка ошибок

### Типичные ошибки

```typescript
// Обработка различных типов ошибок
try {
  const result = await client.barcode.addBarcodes({
    barcodes: [
      { sku: 123456789, barcode: 'DUPLICATE_BARCODE' }
    ]
  });

  if (result.errors) {
    result.errors.forEach(error => {
      switch (error.code) {
        case 'BARCODE_ALREADY_EXISTS':
          console.warn(`Штрихкод уже существует: ${error.barcode}`);
          break;
        case 'INVALID_SKU':
          console.error(`Неверный SKU: ${error.sku}`);
          break;
        case 'INVALID_BARCODE_FORMAT':
          console.error(`Неверный формат штрихкода: ${error.barcode}`);
          break;
        case 'PRODUCT_NOT_FOUND':
          console.error(`Товар не найден: ${error.sku}`);
          break;
        default:
          console.error(`Неизвестная ошибка: ${error.error}`);
      }
    });
  }
} catch (error) {
  if (error.response?.status === 429) {
    console.error('Превышен лимит запросов. Повторите через минуту.');
  } else if (error.response?.status === 400) {
    console.error('Неверные параметры запроса:', error.response.data);
  } else {
    console.error('Произошла ошибка:', error.message);
  }
}
```

---

**Связанные API:** Product API (управление товарами), FBS API (логистика), Report API (отчеты по товарам)