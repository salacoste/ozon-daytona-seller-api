# 🧪 Beta Method API - Экспериментальные функции

**API для бета-функций и экспериментальных возможностей OZON** — новые методы, которые могут изменяться в будущих версиях.

## ⚠️ Важное предупреждение
Это экспериментальные методы в стадии тестирования. API может изменяться без предварительного уведомления.

## 📋 Методы (9 endpoints)

| Категория | Метод | Endpoint | Назначение |
|-----------|-------|----------|------------|
| **Аналитика времени доставки** | `getAverageDeliveryTime` | `/v1/analytics/average-delivery-time` | Аналитика по среднему времени доставки |
| | `getAverageDeliveryTimeDetails` | `/v1/analytics/average-delivery-time/details` | Детальная аналитика времени доставки |
| | `getAverageDeliveryTimeSummary` | `/v1/analytics/average-delivery-time/summary` | Общая аналитика времени доставки |
| **Управление остатками** | `getManageStocks` | `/v1/analytics/manage/stocks` | ⚠️ Управление остатками (устарел) |
| | `getAnalyticsStocks` | `/v1/analytics/stocks` | Аналитика по остаткам товаров |
| **Качество товаров** | `getProductsWithWrongVolume` | `/v1/product/info/wrong-volume` | Товары с некорректными ОВХ |
| **Отчеты по вывозу** | `getRemovalFromStockReport` | `/v1/removal/from-stock/list` | Отчёт по вывозу со склада FBO |
| | `getRemovalFromSupplyReport` | `/v1/removal/from-supply/list` | Отчёт по вывозу с поставки FBO |
| **Управление доступом** | `getRolesByToken` | `/v1/roles` | Роли и методы API-ключа |

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

### Базовая аналитика времени доставки
```typescript
try {
  // 1. Получить аналитику по времени доставки
  const deliveryAnalytics = await client.betaMethod.getAverageDeliveryTime({
    delivery_schema: 'FBO',
    supply_period: {
      from: '2024-01-01',
      to: '2024-01-31'
    },
    sku: ['123456789', '987654321']
  });

  console.log('📊 Аналитика времени доставки:');
  deliveryAnalytics.data?.forEach(cluster => {
    console.log(`  ${cluster.cluster_name}: ${cluster.average_delivery_time} дней`);
    console.log(`  Заказов: ${cluster.orders_count} (${cluster.orders_share}%)`);
  });

  console.log(`📈 Общее среднее время: ${deliveryAnalytics.total?.average_delivery_time} дней`);

  // 2. Получить общую сводку
  const summary = await client.betaMethod.getAverageDeliveryTimeSummary();
  
  console.log('\n📋 Сводка:');
  console.log(`   Текущее время: ${summary.average_delivery_time} дней`);
  console.log(`   Рекомендуемое: ${summary.perfect_delivery_time} дней`);
  console.log(`   Переплата: ${summary.lost_profit} руб.`);

} catch (error) {
  console.error('❌ Ошибка получения аналитики:', error);
}
```

---

## 🎯 Основные методы

### 📊 Аналитика времени доставки

#### `getAverageDeliveryTime()` - Базовая аналитика
```typescript
interface BetaMethodAverageDeliveryTimeRequest {
  /** Схема доставки */
  delivery_schema: 'FBO' | 'FBS' | 'RFBS';
  /** Период анализа */
  supply_period: {
    from: string; // YYYY-MM-DD
    to: string;   // YYYY-MM-DD
  };
  /** SKU товаров (макс. 100) */
  sku?: string[];
}

interface BetaMethodAverageDeliveryTimeResponse {
  data?: {
    cluster_name: string;
    average_delivery_time: number;
    orders_count: number;
    orders_share: number;
  }[];
  total?: {
    average_delivery_time: number;
  };
}
```

#### `getAverageDeliveryTimeDetails()` - Детальная аналитика
```typescript
interface BetaMethodAverageDeliveryTimeDetailsRequest {
  cluster_id: number;
  limit: number;
  offset: number;
  filters?: {
    sku?: string[];
    regions?: string[];
  };
}
```

### 📦 Управление остатками

#### `getAnalyticsStocks()` - Современная аналитика остатков
```typescript
interface BetaMethodAnalyticsStocksRequest {
  /** SKU товаров (макс. 100) */
  skus: string[];
  /** Фильтр по кластерам */
  cluster_ids?: string[];
  /** Теги товаров */
  item_tags?: ('ECONOM' | 'NOVEL' | 'DISCOUNT' | 'FBS_RETURN' | 'SUPER')[];
  /** Статусы ликвидности */
  turnover_grades?: ('DEFICIT' | 'POPULAR' | 'ACTUAL' | 'SURPLUS' | 'NO_SALES')[];
  /** ID складов */
  warehouse_ids?: string[];
}

interface BetaMethodAnalyticsStocksResponse {
  items?: {
    sku: number;
    offer_id: string;
    name: string;
    cluster_id: number;
    cluster_name: string;
    warehouse_id: number;
    warehouse_name: string;
    item_tags: string[];
    turnover_grade: string;
    turnover_grade_cluster: string;
    ads: number;
    ads_cluster: number;
    idc: number;
    idc_cluster: number;
    days_without_sales: number;
    days_without_sales_cluster: number;
    available_stock_count: number;
    transit_stock_count: number;
    requested_stock_count: number;
    valid_stock_count: number;
    waiting_docs_stock_count: number;
    other_stock_count: number;
    return_from_customer_stock_count: number;
    return_to_seller_stock_count: number;
    stock_defect_stock_count: number;
    transit_defect_stock_count: number;
    excess_stock_count: number;
    expiring_stock_count: number;
  }[];
}
```

### 📏 Контроль качества товаров

#### `getProductsWithWrongVolume()` - Товары с некорректными ОВХ
```typescript
interface BetaMethodProductInfoWrongVolumeRequest {
  cursor?: string; // для пагинации
  limit?: number;  // 1-1000
}

interface BetaMethodProductInfoWrongVolumeResponse {
  products?: {
    sku: string;
    product_name: string;
    current_volume?: {
      length: number;
      width: number;
      height: number;
      weight: number;
    };
    recommended_volume?: {
      length: number;
      width: number;
      height: number;
      weight: number;
    };
  }[];
  cursor?: string;
}
```

---

## 💡 Практические примеры

### Оптимизация времени доставки
```typescript
const optimizeDeliveryTime = async () => {
  try {
    // 1. Получить общую сводку
    const summary = await client.betaMethod.getAverageDeliveryTimeSummary();
    
    const currentTime = summary.average_delivery_time || 0;
    const perfectTime = summary.perfect_delivery_time || 0;
    const lostProfit = summary.lost_profit || 0;
    
    console.log(`📊 Анализ доставки:`);
    console.log(`   Текущее время: ${currentTime} дней`);
    console.log(`   Оптимальное время: ${perfectTime} дней`);
    console.log(`   Потери: ${lostProfit} руб/мес`);
    
    if (currentTime > perfectTime) {
      console.log(`⚠️  Время доставки превышает оптимальное на ${currentTime - perfectTime} дней`);
      
      // 2. Получить детальную аналитику
      const analytics = await client.betaMethod.getAverageDeliveryTime({
        delivery_schema: 'FBO',
        supply_period: {
          from: '2024-01-01',
          to: '2024-01-31'
        }
      });
      
      // 3. Найти проблемные кластеры
      const slowClusters = analytics.data?.filter(cluster => 
        cluster.average_delivery_time > perfectTime
      ) || [];
      
      console.log(`🐌 Медленные кластеры (${slowClusters.length}):`);
      slowClusters.forEach(cluster => {
        console.log(`   ${cluster.cluster_name}: ${cluster.average_delivery_time} дней (${cluster.orders_share}% заказов)`);
      });
      
      return {
        needsOptimization: true,
        timeDifference: currentTime - perfectTime,
        lostProfit,
        slowClusters: slowClusters.length
      };
    } else {
      console.log(`✅ Время доставки оптимально!`);
      return { needsOptimization: false };
    }
    
  } catch (error) {
    console.error('❌ Ошибка анализа доставки:', error);
    return { needsOptimization: false, error: error.message };
  }
};
```

### Управление остатками товаров
```typescript
const manageStockLevels = async (skus: string[]) => {
  try {
    const analytics = await client.betaMethod.getAnalyticsStocks({
      skus: skus.slice(0, 100), // максимум 100 SKU
      turnover_grades: ['DEFICIT', 'SURPLUS', 'NO_SALES']
    });

    const summary = {
      deficit: [] as any[],
      surplus: [] as any[],
      noSales: [] as any[],
      recommendations: [] as string[]
    };

    analytics.items?.forEach(item => {
      switch (item.turnover_grade) {
        case 'DEFICIT':
          summary.deficit.push(item);
          summary.recommendations.push(`📈 Увеличить поставку для ${item.name} (SKU: ${item.sku}) - остаток ${item.available_stock_count}, дней хватит ${item.idc}`);
          break;
        case 'SURPLUS':
          summary.surplus.push(item);
          summary.recommendations.push(`📉 Снизить цену для ${item.name} (SKU: ${item.sku}) - остаток ${item.available_stock_count}, дней хватит ${item.idc}`);
          break;
        case 'NO_SALES':
          summary.noSales.push(item);
          summary.recommendations.push(`🛑 Проверить товар ${item.name} (SKU: ${item.sku}) - нет продаж ${item.days_without_sales} дней`);
          break;
      }
    });

    console.log('📊 Анализ остатков:');
    console.log(`   Дефицит: ${summary.deficit.length} товаров`);
    console.log(`   Избыток: ${summary.surplus.length} товаров`);
    console.log(`   Без продаж: ${summary.noSales.length} товаров`);
    
    console.log('\n💡 Рекомендации:');
    summary.recommendations.forEach(rec => console.log(`   ${rec}`));

    return summary;

  } catch (error) {
    console.error('❌ Ошибка анализа остатков:', error);
  }
};
```

### Исправление некорректных ОВХ
```typescript
const fixWrongVolumeProducts = async () => {
  const wrongVolumeProducts = [];
  let cursor = undefined;
  let hasMore = true;

  while (hasMore) {
    try {
      const response = await client.betaMethod.getProductsWithWrongVolume({
        cursor,
        limit: 100
      });

      if (response.products) {
        wrongVolumeProducts.push(...response.products);
      }

      cursor = response.cursor;
      hasMore = !!cursor;

      console.log(`📥 Загружено товаров с неверными ОВХ: ${wrongVolumeProducts.length}`);

    } catch (error) {
      console.error('❌ Ошибка загрузки товаров с неверными ОВХ:', error);
      break;
    }
  }

  // Анализ и формирование отчета
  const report = wrongVolumeProducts.map(product => {
    const current = product.current_volume;
    const recommended = product.recommended_volume;
    
    const currentVolume = current ? current.length * current.width * current.height : 0;
    const recommendedVolume = recommended ? recommended.length * recommended.width * recommended.height : 0;
    
    const volumeDifference = recommendedVolume - currentVolume;
    const weightDifference = (recommended?.weight || 0) - (current?.weight || 0);
    
    return {
      sku: product.sku,
      product_name: product.product_name,
      current_dimensions: current ? `${current.length}×${current.width}×${current.height} см` : 'Не указано',
      recommended_dimensions: recommended ? `${recommended.length}×${recommended.width}×${recommended.height} см` : 'Не указано',
      current_weight: current?.weight || 0,
      recommended_weight: recommended?.weight || 0,
      volume_difference: volumeDifference,
      weight_difference: weightDifference,
      needs_update: Math.abs(volumeDifference) > 100 || Math.abs(weightDifference) > 50 // критерий для обновления
    };
  });

  // Фильтрация товаров, требующих обновления
  const needsUpdate = report.filter(item => item.needs_update);
  
  console.log(`\n📋 Отчет по ОВХ:`);
  console.log(`   Всего товаров с неверными ОВХ: ${wrongVolumeProducts.length}`);
  console.log(`   Требуют критичного обновления: ${needsUpdate.length}`);
  
  console.log(`\n🔧 Товары для приоритетного обновления:`);
  needsUpdate.slice(0, 10).forEach((item, index) => {
    console.log(`${index + 1}. ${item.product_name} (${item.sku})`);
    console.log(`   Габариты: ${item.current_dimensions} → ${item.recommended_dimensions}`);
    console.log(`   Вес: ${item.current_weight}г → ${item.recommended_weight}г`);
  });

  return { total: wrongVolumeProducts.length, needsUpdate: needsUpdate.length, report };
};
```

### Мониторинг доступа к API
```typescript
const checkApiAccess = async () => {
  try {
    const roles = await client.betaMethod.getRolesByToken();
    
    console.log('🔑 Информация о доступе к API:');
    
    roles.roles?.forEach(role => {
      console.log(`\n📋 Роль: ${role.name}`);
      console.log(`   Описание: ${role.description}`);
      
      if (role.methods && role.methods.length > 0) {
        console.log(`   Доступные методы (${role.methods.length}):`);
        role.methods.slice(0, 5).forEach(method => {
          console.log(`     • ${method}`);
        });
        
        if (role.methods.length > 5) {
          console.log(`     ... и еще ${role.methods.length - 5} методов`);
        }
      }
    });
    
    // Подсчет общего количества доступных методов
    const totalMethods = roles.roles?.reduce((sum, role) => sum + (role.methods?.length || 0), 0) || 0;
    console.log(`\n📊 Итого доступно методов: ${totalMethods}`);
    
    return roles;
    
  } catch (error) {
    console.error('❌ Ошибка получения информации о ролях:', error);
  }
};
```

---

## ⚠️ Ограничения и особенности

### Экспериментальный статус
- 🧪 **Бета-версия**: методы могут изменяться без предупреждения
- ⚡ **Частые обновления**: следите за изменениями в API
- 📝 **Документация**: может отставать от реальной реализации

### Лимиты запросов
- **SKU в аналитике**: максимум 100 за запрос
- **Товары с неверными ОВХ**: максимум 1000 за запрос
- **Отчеты по вывозу**: максимум 500 записей за запрос
- **Обновление данных**: аналитика остатков обновляется в 07:00 UTC

### Доступность методов
- ✅ **Аналитика времени доставки**: доступна всем
- ✅ **Аналитика остатков**: только для FBO товаров
- ⚠️ **Управление остатками**: устаревший метод, используйте `getAnalyticsStocks`
- 🔐 **Роли API**: зависят от настроек аккаунта

### Статусы ликвидности товаров
- `DEFICIT` - дефицит, нужно увеличить поставки
- `POPULAR` - популярный товар, стабильные продажи
- `ACTUAL` - актуальный товар
- `SURPLUS` - избыток, нужно снизить цены или остановить поставки
- `NO_SALES` - нет продаж, требует анализа

### Теги товаров
- `ECONOM` - эконом-сегмент
- `NOVEL` - новинка
- `DISCOUNT` - товар со скидкой
- `FBS_RETURN` - возврат FBS
- `SUPER` - товар с высоким рейтингом

---

**💡 Совет**: Beta Method API идеально подходит для создания аналитических инструментов и систем мониторинга. Используйте эти методы для оптимизации логистики, управления остатками и контроля качества товаров, но помните об экспериментальном статусе API.