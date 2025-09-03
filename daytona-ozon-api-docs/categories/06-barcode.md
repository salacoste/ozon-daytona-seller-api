# 🏷️ Barcode API - Управление штрихкодами товаров

**Простая и эффективная категория для управления штрихкодами** — создание новых и привязка существующих штрихкодов к товарам в системе OZON.

## 🎯 Назначение API

Barcode API предоставляет инструменты для:
- **Создание штрихкодов** — генерация новых уникальных штрихкодов для товаров без них
- **Привязка штрихкодов** — связывание существующих штрихкодов с товарами в системе
- **Массовые операции** — обработка до 100 товаров за один запрос
- **Управление дублями** — контроль уникальности и корректности штрихкодов

---

## 📋 Список методов (2 endpoints)

### 🏷️ Управление штрихкодами
| Метод | Endpoint | Версия | Назначение |
|-------|----------|---------|------------|
| `addBarcodes` | `/v1/barcode/add` | v1 | Привязка существующих штрихкодов к товарам |
| `generateBarcodes` | `/v1/barcode/generate` | v1 | Создание новых штрихкодов для товаров |

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

### Базовые операции

#### 1. Создание новых штрихкодов
```typescript
try {
  // Создание штрихкодов для товаров без них
  const generateResult = await client.barcode.generateBarcodes({
    product_ids: ['123456789', '987654321', '555666777']
  });

  console.log('📊 Результаты создания штрихкодов:');
  
  // Успешно созданные штрихкоды
  generateResult.results?.forEach(result => {
    console.log(`✅ Товар ${result.product_id}:`);
    result.barcodes?.forEach((barcode, index) => {
      console.log(`   Штрихкод ${index + 1}: ${barcode}`);
    });
  });
  
  // Обработка ошибок
  if (generateResult.errors && generateResult.errors.length > 0) {
    console.log('❌ Ошибки при создании штрихкодов:');
    generateResult.errors.forEach(error => {
      console.log(`   Товар ${error.product_id}: ${error.error} (${error.code})`);
    });
  }
  
} catch (error) {
  console.error('❌ Ошибка создания штрихкодов:', error);
}
```

#### 2. Привязка существующих штрихкодов
```typescript
try {
  // Привязка готовых штрихкодов к товарам
  const addResult = await client.barcode.addBarcodes({
    barcodes: [
      {
        sku: '123456789',
        barcode: '4600051000057' // EAN-13 штрихкод
      },
      {
        sku: '987654321', 
        barcode: '123456789012' // UPC-A штрихкод
      },
      {
        sku: '555666777',
        barcode: 'CUSTOM_BARCODE_001' // Пользовательский код
      }
    ]
  });

  console.log('📊 Результаты привязки штрихкодов:');
  
  // Проверить результаты привязки
  if (addResult.errors && addResult.errors.length > 0) {
    console.log('❌ Ошибки при привязке:');
    addResult.errors.forEach(error => {
      console.log(`   SKU ${error.sku}, код ${error.barcode}:`);
      console.log(`   Ошибка: ${error.error} (${error.code})`);
    });
  } else {
    console.log('✅ Все штрихкоды успешно привязаны!');
  }
  
} catch (error) {
  console.error('❌ Ошибка привязки штрихкодов:', error);
}
```

---

## 🎭 Типовые сценарии

### Сценарий 1: Массовое создание штрихкодов
```typescript
async function createBarcodesForNewProducts() {
  try {
    // Получить товары без штрихкодов
    const productsWithoutBarcodes = await client.product.getList({
      filter: {
        visibility: 'VISIBLE'
      },
      limit: 100
    });
    
    // Фильтровать товары, требующие штрихкоды
    const productIds = productsWithoutBarcodes.result?.items
      ?.filter(product => !product.barcode || product.barcode.length === 0)
      .map(product => product.id.toString())
      .slice(0, 100) || []; // Максимум 100 за запрос
    
    if (productIds.length === 0) {
      console.log('✅ Все товары уже имеют штрихкоды');
      return;
    }
    
    console.log(`🔄 Создаем штрихкоды для ${productIds.length} товаров...`);
    
    // Создать штрихкоды пакетно
    const result = await client.barcode.generateBarcodes({
      product_ids: productIds
    });
    
    console.log(`✅ Создано штрихкодов: ${result.results?.length || 0}`);
    console.log(`❌ Ошибок: ${result.errors?.length || 0}`);
    
    return result;
    
  } catch (error) {
    console.error('❌ Ошибка массового создания штрихкодов:', error);
  }
}
```

### Сценарий 2: Пакетная обработка с ограничениями
```typescript
async function addBarcodesInBatches(barcodesToAdd: BarcodeInfo[]) {
  const batchSize = 100; // Максимальный размер батча
  const results: BarcodeAddResponse[] = [];
  
  for (let i = 0; i < barcodesToAdd.length; i += batchSize) {
    const batch = barcodesToAdd.slice(i, i + batchSize);
    
    try {
      console.log(`🔄 Обработка батча ${Math.floor(i / batchSize) + 1}/${Math.ceil(barcodesToAdd.length / batchSize)}`);
      
      const result = await client.barcode.addBarcodes({ 
        barcodes: batch 
      });
      
      results.push(result);
      
      // Статистика по батчу
      const errors = result.errors?.length || 0;
      const success = batch.length - errors;
      console.log(`   ✅ Успешно: ${success}, ❌ Ошибок: ${errors}`);
      
      // Пауза между запросами (лимит 20 запросов в минуту)
      if (i + batchSize < barcodesToAdd.length) {
        console.log('⏳ Пауза 3 секунды...');
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
      
    } catch (error) {
      console.error(`❌ Ошибка в батче ${Math.floor(i / batchSize) + 1}:`, error);
    }
  }
  
  return results;
}

// Использование
const barcodesToAdd = [
  { sku: '111', barcode: '4600051000001' },
  { sku: '222', barcode: '4600051000002' },
  // ... еще 200 штрихкодов
];

const results = await addBarcodesInBatches(barcodesToAdd);
```

### Сценарий 3: Валидация и исправление штрихкодов
```typescript
async function validateAndFixBarcodes() {
  try {
    // Тестовая привязка для проверки валидности
    const testBarcodes = [
      { sku: '123', barcode: '4600051000057' }, // Валидный EAN-13
      { sku: '456', barcode: '123456789012' },  // Валидный UPC-A
      { sku: '789', barcode: 'INVALID_CODE' }   // Невалидный код
    ];
    
    const validationResult = await client.barcode.addBarcodes({
      barcodes: testBarcodes
    });
    
    // Анализ ошибок валидации
    const invalidBarcodes = validationResult.errors || [];
    const validBarcodes = testBarcodes.filter(barcode => 
      !invalidBarcodes.some(error => 
        error.sku === barcode.sku && error.barcode === barcode.barcode
      )
    );
    
    console.log(`✅ Валидных штрихкодов: ${validBarcodes.length}`);
    console.log(`❌ Невалидных штрихкодов: ${invalidBarcodes.length}`);
    
    // Для невалидных создать новые
    if (invalidBarcodes.length > 0) {
      console.log('🔄 Создаем штрихкоды для товаров с невалидными кодами...');
      
      const productIdsToGenerate = invalidBarcodes.map(error => error.sku);
      
      const generateResult = await client.barcode.generateBarcodes({
        product_ids: productIdsToGenerate
      });
      
      console.log(`✅ Создано новых штрихкодов: ${generateResult.results?.length || 0}`);
    }
    
  } catch (error) {
    console.error('❌ Ошибка валидации штрихкодов:', error);
  }
}
```

---

## 📊 Ограничения и лимиты

### 🚦 Rate Limits
- **Максимум 20 запросов в минуту** с одного аккаунта продавца
- **До 100 товаров за один запрос** для обеих операций
- **До 100 штрихкодов на один товар** максимальное количество

### 📏 Ограничения данных
- **Длина штрихкода**: максимум 100 символов
- **Уникальность**: каждый штрихкод должен быть уникальным в системе
- **Форматы**: поддерживаются EAN-13, UPC-A, пользовательские форматы

### 💡 Рекомендации по производительности
```typescript
// ✅ Хорошо - пакетная обработка с паузами
const processBarcodes = async (barcodes: BarcodeInfo[]) => {
  const batchSize = 100;
  
  for (let i = 0; i < barcodes.length; i += batchSize) {
    const batch = barcodes.slice(i, i + batchSize);
    await client.barcode.addBarcodes({ barcodes: batch });
    
    // Пауза между запросами
    if (i + batchSize < barcodes.length) {
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
};

// ❌ Плохо - превышение лимитов
const badExample = async () => {
  // Слишком быстрые запросы
  for (let i = 0; i < 25; i++) {
    await client.barcode.addBarcodes({ barcodes: [/* ... */] });
  }
  
  // Слишком много товаров за раз
  await client.barcode.generateBarcodes({
    product_ids: Array(150).fill('').map((_, i) => i.toString()) // 150 > 100
  });
};
```

---

## 🔧 TypeScript интерфейсы

### Запросы (Requests)
```typescript
interface BarcodeInfo {
  /** Идентификатор товара в системе Ozon — SKU */
  sku: string;
  /** Значение штрихкода (не более 100 символов) */
  barcode: string;
}

interface BarcodeAddRequest {
  /** Список штрихкодов и товаров (максимум 100) */
  barcodes: BarcodeInfo[];
}

interface BarcodeGenerateRequest {
  /** Идентификаторы товаров для создания штрихкодов (максимум 100) */
  product_ids: string[];
}
```

### Ответы (Responses)
```typescript
interface BarcodeError {
  /** Код ошибки */
  code: string;
  /** Описание ошибки */
  error: string;
  /** SKU товара с ошибкой */
  sku?: string;
  /** Штрихкод с ошибкой */
  barcode?: string;
  /** ID товара с ошибкой */
  product_id?: string;
}

interface BarcodeAddResponse {
  /** Список ошибок при привязке */
  errors?: BarcodeError[];
}

interface BarcodeGenerateResult {
  /** ID товара */
  product_id: string;
  /** Созданные штрихкоды */
  barcodes?: string[];
}

interface BarcodeGenerateResponse {
  /** Результаты создания штрихкодов */
  results?: BarcodeGenerateResult[];
  /** Список ошибок при создании */
  errors?: BarcodeError[];
}
```

---

## 🎓 Следующие шаги

### 1. Изучите связанные API
- **[Products API](./01-products.md)** — Управление товарами (для получения товаров без штрихкодов)
- **Prices & Stocks API** — Обновление цен товаров со штрихкодами

### 2. Интеграционные паттерны
```typescript
// Интеграция с импортом товаров
class ProductImportWithBarcodes {
  async importProducts(products: ProductData[]) {
    // 1. Создать товары
    const createdProducts = await this.createProducts(products);
    
    // 2. Создать штрихкоды для новых товаров
    const productIds = createdProducts.map(p => p.id);
    await this.createBarcodes(productIds);
    
    // 3. Обновить остатки и цены
    await this.updatePricesAndStocks(createdProducts);
  }
  
  private async createBarcodes(productIds: string[]) {
    const batchSize = 100;
    
    for (let i = 0; i < productIds.length; i += batchSize) {
      const batch = productIds.slice(i, i + batchSize);
      
      await client.barcode.generateBarcodes({
        product_ids: batch
      });
      
      // Пауза между батчами
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
}
```

### 3. Мониторинг и логирование
```typescript
const barcodeApiWithLogging = {
  async addBarcodes(request: BarcodeAddRequest) {
    console.log(`🔄 Привязка штрихкодов: ${request.barcodes.length} товаров`);
    
    const startTime = Date.now();
    const result = await client.barcode.addBarcodes(request);
    const duration = Date.now() - startTime;
    
    const errors = result.errors?.length || 0;
    const success = request.barcodes.length - errors;
    
    console.log(`✅ Завершено за ${duration}мс: ${success} успешно, ${errors} ошибок`);
    
    return result;
  }
};
```

---

**💡 Совет**: Barcode API идеально подходит для автоматизации создания штрихкодов при массовом импорте товаров. Используйте пакетную обработку с соблюдением лимитов для максимальной эффективности.