# Analytics API - Аналитика и отчетность

Analytics API предоставляет доступ к бизнес-аналитике и отчетности данных OZON, включая оборачиваемость товаров и отчеты по остаткам на складах.

## Обзор API

**Количество методов:** 2  
**Основные функции:** Аналитика товаров, отчеты по остаткам, оборачиваемость

## Методы

### 1. Получение оборачиваемости товаров

**Метод:** `getStocksTurnover()`  
**Эндпоинт:** `POST /v1/analytics/turnover/stocks`

Позволяет узнать оборачиваемость товара и количество дней, на которое хватит текущего остатка.

#### Параметры запроса

```typescript
interface AnalyticsTurnoverStocksRequest {
  limit?: number;    // Количество значений в ответе (1-1000)
  offset?: number;   // Количество пропущенных элементов
  sku?: string[];    // Массив SKU товаров для анализа
}
```

#### Пример использования

```typescript
import { OzonSellerApiClient } from '@spacechemical/ozon-seller-api';

const client = new OzonSellerApiClient({
  apiKey: 'your-api-key',
  clientId: 'your-client-id'
});

// Получить оборачиваемость для конкретных товаров
const turnover = await client.analytics.getStocksTurnover({
  limit: 50,
  offset: 0,
  sku: ['123456789', '987654321']
});

// Обработка результатов
turnover.items?.forEach(item => {
  console.log(`
    SKU: ${item.sku}
    Оборачиваемость: ${item.turnover_days} дней
    Текущий остаток: ${item.current_stock}
    Средние дневные продажи: ${item.daily_sales}
  `);
});
```

#### Структура ответа

```typescript
interface AnalyticsTurnoverStocksResponse {
  items?: Array<{
    sku?: number;           // SKU товара
    turnover_days?: number; // Дни оборачиваемости
    current_stock?: number; // Остаток товара
    daily_sales?: number;   // Средние дневные продажи
  }>;
}
```

### 2. Отчет по остаткам на складах

**Метод:** `getStockOnWarehouses()`  
**Эндпоинт:** `POST /v2/analytics/stock_on_warehouses`

⚠️ **Важно:** В будущем метод будет отключён. Рекомендуется переключиться на `/v1/analytics/stocks`.

#### Параметры запроса

```typescript
interface AnalyticsStockOnWarehouseRequest {
  limit: number;                    // Обязательный: количество товаров на странице
  offset?: number;                  // Количество пропущенных товаров
  warehouse_type?: AnalyticsWarehouseType; // Тип склада
}

type AnalyticsWarehouseType = 'ALL' | 'CROSSDOCK' | 'FULFILLMENT';
```

#### Пример использования

```typescript
// Получить отчет по остаткам на всех складах
const report = await client.analytics.getStockOnWarehouses({
  limit: 100,
  offset: 0,
  warehouse_type: 'ALL'
});

// Анализ остатков
report.result?.rows?.forEach(row => {
  console.log(`
    Товар: ${row.name}
    SKU: ${row.sku}
    Остаток на складе: ${row.present}
    В пути: ${row.reserved}
  `);
});

// Поиск товаров с низким остатком
const lowStock = report.result?.rows?.filter(row => 
  (row.present || 0) < 10
);

console.log(`Товаров с низким остатком: ${lowStock?.length}`);
```

#### Структура ответа

```typescript
interface AnalyticsStockOnWarehouseResponse {
  result?: {
    rows?: Array<{
      sku?: number;      // SKU товара
      name?: string;     // Название товара
      present?: number;  // Остаток на складе
      reserved?: number; // Товар в пути
    }>;
  };
}
```

## Практические сценарии использования

### 1. Мониторинг оборачиваемости топ-товаров

```typescript
async function monitorTopProducts(client: OzonSellerApiClient, topSkus: string[]) {
  const turnover = await client.analytics.getStocksTurnover({
    limit: 1000,
    sku: topSkus
  });

  const slowMovingProducts = turnover.items?.filter(item => 
    (item.turnover_days || 0) > 30
  );

  console.log(`Медленно оборачивающихся товаров: ${slowMovingProducts?.length}`);
  
  return slowMovingProducts;
}
```

### 2. Анализ товаров с критически низким остатком

```typescript
async function getCriticalStockAlerts(client: OzonSellerApiClient) {
  const report = await client.analytics.getStockOnWarehouses({
    limit: 1000,
    warehouse_type: 'FULFILLMENT'
  });

  const criticalStock = report.result?.rows?.filter(row => {
    const present = row.present || 0;
    const reserved = row.reserved || 0;
    return present <= 5 && reserved === 0; // Мало на складе и нет в пути
  });

  // Уведомления о критических остатках
  criticalStock?.forEach(item => {
    console.warn(`⚠️ Критический остаток: ${item.name} (SKU: ${item.sku}) - ${item.present} шт.`);
  });

  return criticalStock;
}
```

### 3. Комплексный анализ эффективности товаров

```typescript
async function analyzeProductPerformance(client: OzonSellerApiClient) {
  // Получаем данные по оборачиваемости
  const turnover = await client.analytics.getStocksTurnover({
    limit: 500
  });

  // Получаем данные по остаткам
  const stocks = await client.analytics.getStockOnWarehouses({
    limit: 500,
    warehouse_type: 'ALL'
  });

  // Объединяем данные для анализа
  const analysis = turnover.items?.map(turnoverItem => {
    const stockItem = stocks.result?.rows?.find(stock => 
      stock.sku === turnoverItem.sku
    );

    return {
      sku: turnoverItem.sku,
      turnover_days: turnoverItem.turnover_days,
      daily_sales: turnoverItem.daily_sales,
      current_stock: stockItem?.present || 0,
      reserved: stockItem?.reserved || 0,
      efficiency_score: calculateEfficiencyScore(turnoverItem, stockItem)
    };
  });

  return analysis?.sort((a, b) => (b.efficiency_score || 0) - (a.efficiency_score || 0));
}

function calculateEfficiencyScore(turnover: any, stock: any) {
  const turnoverScore = turnover.turnover_days ? Math.max(0, 100 - turnover.turnover_days) : 0;
  const stockScore = (stock?.present || 0) > 0 ? 20 : 0;
  const salesScore = (turnover.daily_sales || 0) * 10;
  
  return turnoverScore + stockScore + salesScore;
}
```

## Ограничения и рекомендации

### Ограничения
- Максимум 1000 элементов в одном запросе `getStocksTurnover`
- Метод `getStockOnWarehouses` будет выведен из эксплуатации
- Данные могут обновляться с задержкой до нескольких часов

### Рекомендации
1. **Переход на новый API**: Планируйте миграцию с `/v2/analytics/stock_on_warehouses`
2. **Оптимизация запросов**: Используйте пагинацию для больших выборок
3. **Кэширование**: Данные аналитики обновляются редко, используйте кэширование
4. **Комбинирование методов**: Объединяйте данные разных методов для полной картины

## Обработка ошибок

```typescript
try {
  const turnover = await client.analytics.getStocksTurnover({
    limit: 100,
    sku: ['invalid-sku']
  });
} catch (error) {
  if (error.response?.status === 400) {
    console.error('Неверные параметры запроса');
  } else if (error.response?.status === 429) {
    console.error('Превышен лимит запросов, повторите позже');
  } else {
    console.error('Произошла ошибка:', error.message);
  }
}
```

---

**Связанные API:** Product API (управление товарами), Finance API (финансовая аналитика), Report API (расширенные отчеты)