# Beta-Method API - Экспериментальные возможности

Beta-Method API предоставляет доступ к экспериментальным функциям и бета-возможностям OZON, включая расширенную аналитику, управление остатками и специальные отчеты.

## Обзор API

**Количество методов:** 9  
**Основные функции:** Аналитика доставки, управление остатками, отчеты по утилизации, роли API  
**Статус:** ⚠️ Экспериментальные методы, могут изменяться

## Методы

### 1. Аналитика среднего времени доставки

**Метод:** `getAverageDeliveryTime()`  
**Эндпоинт:** `POST /v1/analytics/average-delivery-time`

Получает аналитику по среднему времени доставки товара до покупателя. Соответствует разделу "Аналитика → География продаж → Среднее время доставки" в личном кабинете.

#### Параметры запроса

```typescript
interface BetaMethodAverageDeliveryTimeRequest {
  delivery_schema?: 'FBO' | 'FBS';  // Схема доставки
  supply_period?: {                 // Период поставки
    from: string;                   // Дата начала (YYYY-MM-DD)
    to: string;                     // Дата окончания (YYYY-MM-DD)
  };
  sku?: string[];                   // Массив SKU товаров
}
```

#### Пример использования

```typescript
import { OzonSellerApiClient } from '@spacechemical/ozon-seller-api';

const client = new OzonSellerApiClient({
  apiKey: 'your-api-key',
  clientId: 'your-client-id'
});

// Получить аналитику времени доставки для FBO
const analytics = await client.betaMethod.getAverageDeliveryTime({
  delivery_schema: 'FBO',
  supply_period: {
    from: '2024-01-01',
    to: '2024-01-31'
  },
  sku: ['123456789', '987654321']
});

console.log(`Общее среднее время: ${analytics.total?.average_delivery_time} дней`);
console.log(`Количество заказов: ${analytics.total?.orders_count}`);
```

### 2. Детальная аналитика времени доставки

**Метод:** `getAverageDeliveryTimeDetails()`  
**Эндпоинт:** `POST /v1/analytics/average-delivery-time/details`

Предоставляет детализированную аналитику по времени доставки с разбивкой по товарам и регионам.

#### Пример использования

```typescript
const details = await client.betaMethod.getAverageDeliveryTimeDetails({
  cluster_id: 123,
  limit: 100,
  offset: 0,
  filters: {
    sku: ['123456789'],
    regions: ['Москва', 'Санкт-Петербург']
  }
});

details.data?.forEach(item => {
  console.log(`Товар: ${item.product_name} (SKU: ${item.sku})`);
  console.log(`Время доставки: ${item.average_delivery_time} дней`);
  console.log(`Регион: ${item.region}, заказов: ${item.orders_count}`);
});
```

### 3. Общая сводка времени доставки

**Метод:** `getAverageDeliveryTimeSummary()`  
**Эндпоинт:** `POST /v1/analytics/average-delivery-time/summary`

Получает общую аналитику с рекомендациями по оптимизации логистических расходов.

#### Пример использования

```typescript
const summary = await client.betaMethod.getAverageDeliveryTimeSummary();

console.log(`Текущее среднее время доставки: ${summary.average_delivery_time} дней`);
console.log(`Рекомендуемое время: ${summary.perfect_delivery_time} дней`);
console.log(`Переплата за логистику: ${summary.lost_profit} руб.`);
console.log(`Текущий тариф: ${summary.current_tariff?.name}`);
```

### 4. Управление остатками (устаревший)

**Метод:** `getManageStocks()`  
**Эндпоинт:** `POST /v1/analytics/manage-stocks`

⚠️ **Устаревший метод** - будет отключен в будущем. Рекомендуется использовать `getAnalyticsStocks()`.

#### Пример использования

```typescript
// ⚠️ Устаревший метод - используйте getAnalyticsStocks()
const manageStocks = await client.betaMethod.getManageStocks({
  limit: 100,
  offset: 0,
  filters: {
    sku: ['123456789'],
    warehouse_type: 'FULFILLMENT'
  }
});
```

### 5. Аналитика остатков

**Метод:** `getAnalyticsStocks()`  
**Эндпоинт:** `POST /v1/analytics/stocks`

Современный метод для получения аналитики по остаткам товаров на складах.

#### Пример использования

```typescript
const stocks = await client.betaMethod.getAnalyticsStocks({
  skus: ['123456789', '987654321'],
  turnover_grades: ['DEFICIT', 'POPULAR', 'SURPLUS'],
  item_tags: ['NOVEL', 'SUPER']
});

stocks.items?.forEach(item => {
  console.log(`${item.name}: остаток ${item.available_stock_count}`);
  console.log(`Склад: ${item.warehouse_name}, кластер: ${item.cluster_name}`);
  console.log(`Статус ликвидности: ${item.turnover_grade}`);
  console.log(`Среднесуточные продажи: ${item.ads}, дней хватит: ${item.idc}`);
});
```

### 6. Товары с некорректным объемом

**Метод:** `getProductsWithWrongVolume()`  
**Эндпоинт:** `POST /v1/product/info/wrong-volume`

Получает список товаров с некорректными объемно-весовыми характеристиками (ОВХ).

#### Пример использования

```typescript
const wrongVolumeProducts = await client.betaMethod.getProductsWithWrongVolume({
  limit: 100,
  offset: 0
});

wrongVolumeProducts.result?.products?.forEach(product => {
  console.warn(`Товар с неверными ОВХ: ${product.name}`);
  console.log(`SKU: ${product.sku}, офер: ${product.offer_id}`);
  console.log(`Текущий объем: ${product.volume_weight}г`);
  console.log(`Рекомендуемый объем: ${product.expected_volume_weight}г`);
});
```

### 7. Отчет по вывозу и утилизации со склада

**Метод:** `getRemovalFromStockReport()`  
**Эндпоинт:** `POST /v1/removal/from-stock/list`

Получает отчет по вывозу и утилизации товаров со склада FBO.

#### Пример использования

```typescript
const stockRemovalReport = await client.betaMethod.getRemovalFromStockReport({
  date_from: '2024-01-01',
  date_to: '2024-01-31',
  limit: 100,
  offset: 0,
  operation_types: ['DISPOSAL', 'REMOVAL']
});

stockRemovalReport.returns_summary_report_rows?.forEach(row => {
  console.log(`${row.product_name}: ${row.quantity} шт.`);
  console.log(`Операция: ${row.operation_type}, дата: ${row.operation_date}`);
  console.log(`Стоимость: ${row.operation_cost} руб., статус: ${row.status}`);
});
```

### 8. Отчет по вывозу и утилизации с поставки

**Метод:** `getRemovalFromSupplyReport()`  
**Эндпоинт:** `POST /v1/removal/from-supply/list`

Получает отчет по вывозу и утилизации товаров с поставки FBO.

#### Пример использования

```typescript
const supplyRemovalReport = await client.betaMethod.getRemovalFromSupplyReport({
  date_from: '2024-01-01',
  date_to: '2024-01-31',
  limit: 100,
  supply_order_number: 'SO-123456'
});

supplyRemovalReport.returns_summary_report_rows?.forEach(row => {
  console.log(`${row.product_name}: ${row.quantity} шт.`);
  console.log(`Поставка: ${row.supply_order_number}`);
  console.log(`Причина утилизации: ${row.disposal_reason}`);
});
```

### 9. Получение ролей API-ключа

**Метод:** `getRolesByToken()`  
**Эндпоинт:** `POST /v1/roles`

Получает информацию о ролях и доступных методах для текущего API-ключа.

#### Пример использования

```typescript
const roles = await client.betaMethod.getRolesByToken();

console.log('Доступные роли API-ключа:');
roles.roles?.forEach(role => {
  console.log(`Роль: ${role.name}`);
  console.log(`Описание: ${role.description}`);
  console.log(`Методы: ${role.methods?.join(', ')}`);
});
```

## Практические сценарии использования

### 1. Аудит логистических расходов

```typescript
async function analyzeDeliveryEfficiency(client: OzonSellerApiClient) {
  // Получаем общую сводку
  const summary = await client.betaMethod.getAverageDeliveryTimeSummary();
  
  // Получаем детальную аналитику по FBO
  const fboAnalytics = await client.betaMethod.getAverageDeliveryTime({
    delivery_schema: 'FBO',
    supply_period: {
      from: '2024-01-01',
      to: '2024-01-31'
    }
  });

  // Анализируем эффективность
  const analysis = {
    current_delivery_time: summary.average_delivery_time,
    optimal_delivery_time: summary.perfect_delivery_time,
    potential_savings: summary.lost_profit,
    fbo_orders: fboAnalytics.total?.orders_count,
    efficiency_score: summary.average_delivery_time && summary.perfect_delivery_time 
      ? (summary.perfect_delivery_time / summary.average_delivery_time) * 100 
      : 0
  };

  console.log('📊 Анализ логистической эффективности:');
  console.log(`Текущее время доставки: ${analysis.current_delivery_time} дней`);
  console.log(`Оптимальное время: ${analysis.optimal_delivery_time} дней`);
  console.log(`Потенциальная экономия: ${analysis.potential_savings} руб./мес.`);
  console.log(`Эффективность: ${Math.round(analysis.efficiency_score)}%`);

  return analysis;
}
```

### 2. Мониторинг качества остатков

```typescript
async function monitorStockQuality(client: OzonSellerApiClient) {
  // Получаем аналитику остатков
  const stocks = await client.betaMethod.getAnalyticsStocks({
    skus: ['123456789', '987654321'], // Укажите реальные SKU
    turnover_grades: ['DEFICIT', 'SURPLUS', 'NO_SALES']
  });

  // Получаем товары с неверными ОВХ
  const wrongVolumeProducts = await client.betaMethod.getProductsWithWrongVolume({
    limit: 1000
  });

  // Анализ проблемных позиций
  const lowStockItems = stocks.items?.filter(item => 
    (item.available_stock_count || 0) < 10 && (item.transit_stock_count || 0) === 0
  );

  const overstockItems = stocks.items?.filter(item => 
    (item.available_stock_count || 0) > 1000 && item.turnover_grade === 'SURPLUS'
  );

  console.log('📈 Качество остатков:');
  console.log(`Товаров с низким остатком: ${lowStockItems?.length}`);
  console.log(`Товаров с избыточным остатком: ${overstockItems?.length}`);
  console.log(`Товаров с неверными ОВХ: ${wrongVolumeProducts.result?.products?.length}`);

  return {
    low_stock: lowStockItems,
    overstock: overstockItems,
    wrong_volume: wrongVolumeProducts.result?.products
  };
}
```

### 3. Анализ утилизации и потерь

```typescript
async function analyzeDisposalLosses(
  client: OzonSellerApiClient,
  dateFrom: string,
  dateTo: string
) {
  // Получаем отчеты по утилизации
  const stockDisposal = await client.betaMethod.getRemovalFromStockReport({
    date_from: dateFrom,
    date_to: dateTo,
    limit: 1000,
    operation_types: ['DISPOSAL', 'DAMAGE']
  });

  const supplyDisposal = await client.betaMethod.getRemovalFromSupplyReport({
    date_from: dateFrom,
    date_to: dateTo,
    limit: 1000
  });

  // Анализ потерь
  const stockLosses = stockDisposal.returns_summary_report_rows
    ?.filter(row => row.operation_type === 'DISPOSAL')
    .reduce((sum, row) => sum + (row.operation_cost || 0), 0) || 0;

  const supplyLosses = supplyDisposal.returns_summary_report_rows
    ?.filter(row => row.operation_type === 'DISPOSAL')
    .reduce((sum, row) => sum + (row.operation_cost || 0), 0) || 0;

  const totalLosses = stockLosses + supplyLosses;

  // Анализ причин утилизации
  const disposalReasons = supplyDisposal.returns_summary_report_rows
    ?.reduce((acc, row) => {
      const reason = row.disposal_reason || 'Неизвестно';
      acc[reason] = (acc[reason] || 0) + (row.quantity || 0);
      return acc;
    }, {} as Record<string, number>);

  console.log('💸 Анализ утилизации и потерь:');
  console.log(`Потери со склада: ${stockLosses.toLocaleString()} руб.`);
  console.log(`Потери с поставок: ${supplyLosses.toLocaleString()} руб.`);
  console.log(`Общие потери: ${totalLosses.toLocaleString()} руб.`);
  
  console.log('\\n📋 Основные причины утилизации:');
  Object.entries(disposalReasons || {})
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .forEach(([reason, count]) => {
      console.log(`  ${reason}: ${count} шт.`);
    });

  return {
    stock_losses: stockLosses,
    supply_losses: supplyLosses,
    total_losses: totalLosses,
    disposal_reasons: disposalReasons
  };
}
```

### 4. Аудит доступов API-ключа

```typescript
async function auditApiPermissions(client: OzonSellerApiClient) {
  try {
    const roles = await client.betaMethod.getRolesByToken();

    console.log('🔐 Аудит доступов API-ключа:');
    
    roles.roles?.forEach(role => {
      console.log(`\\n📝 Роль: ${role.name}`);
      console.log(`   Описание: ${role.description}`);
      
      if (role.methods && role.methods.length > 0) {
        console.log(`   Доступные методы (${role.methods.length}):`);
        
        // Группировка методов по категориям
        const methodGroups = role.methods.reduce((acc, method) => {
          const category = method.split('/')[1] || 'other';
          if (!acc[category]) acc[category] = [];
          acc[category].push(method);
          return acc;
        }, {} as Record<string, string[]>);

        Object.entries(methodGroups).forEach(([category, methods]) => {
          console.log(`     ${category}: ${methods.length} методов`);
        });
      }
    });

    // Рекомендации по безопасности
    const hasFullAccess = roles.roles?.some(role => 
      role.methods?.includes('*') || role.methods?.length > 50
    );

    if (hasFullAccess) {
      console.log('\\n⚠️  ВНИМАНИЕ: API-ключ имеет расширенные права доступа');
      console.log('   Рекомендуется создать отдельные ключи для разных задач');
    }

    return roles;
  } catch (error) {
    console.error('Ошибка при получении ролей:', error.message);
    return null;
  }
}
```

## Важные особенности Beta-методов

### Экспериментальный статус
⚠️ **Все методы Beta-Method API являются экспериментальными:**
- Интерфейсы могут изменяться без предупреждения
- Методы могут быть удалены или переименованы
- Не рекомендуется для критически важных процессов

### Устаревшие методы
- `getManageStocks()` - будет удален, используйте `getAnalyticsStocks()`
- При использовании устаревших методов добавляйте обработку ошибок

### Рекомендации по использованию

```typescript
// Правильный подход с обработкой экспериментального статуса
try {
  const result = await client.betaMethod.getAverageDeliveryTime({
    delivery_schema: 'FBO',
    supply_period: { from: '2024-01-01', to: '2024-01-31' }
  });
  
  // Обработка результата
} catch (error) {
  if (error.response?.status === 404) {
    console.warn('Метод больше не доступен (404)');
    // Fallback на альтернативный способ получения данных
  } else if (error.response?.status === 400) {
    console.error('Изменились параметры запроса');
  } else {
    console.error('Неожиданная ошибка:', error.message);
  }
}
```

## Миграция с устаревших методов

```typescript
// ❌ Устаревший способ
const oldStocks = await client.betaMethod.getManageStocks({
  limit: 100,
  filters: { warehouse_type: 'FULFILLMENT' }
});

// ✅ Современный способ
const newStocks = await client.betaMethod.getAnalyticsStocks({
  skus: ['123456789', '987654321'],
  turnover_grades: ['DEFICIT', 'POPULAR', 'SURPLUS']
});
```

---

**Связанные API:** Analytics API (основная аналитика), Product API (управление товарами), Report API (отчеты), FBO API (логистика)