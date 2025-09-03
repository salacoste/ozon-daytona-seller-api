# 📊 Analytics API - Аналитика остатков и оборачиваемости

**Специализированная категория для анализа остатков товаров** — получение данных об оборачиваемости товаров и остатках на складах OZON.

## 🎯 Назначение API

Analytics API предоставляет инструменты для:
- **Анализ оборачиваемости** — расчёт оборачиваемости товаров и дней до конца остатка
- **Мониторинг остатков** — контроль товаров на складах с детализацией по типам
- **Планирование закупок** — данные для принятия решений о поставках
- **Оптимизация склада** — анализ эффективности управления остатками

---

## 📋 Список методов (2 endpoints)

### 📈 Анализ оборачиваемости
| Метод | Endpoint | Версия | Назначение |
|-------|----------|---------|------------|
| `getStocksTurnover` | `/v1/analytics/turnover/stocks` | v1 | Оборачиваемость товаров с прогнозом |

### 📦 Анализ остатков  
| Метод | Endpoint | Версия | Назначение |
|-------|----------|---------|------------|
| `getStockOnWarehouses` | `/v2/analytics/stock_on_warehouses` | v2 | Отчёт по остаткам на складах ⚠️ Deprecated |

⚠️ **Важно**: Метод `getStockOnWarehouses` будет отключён в будущем. Рекомендуется использовать `/v1/analytics/stocks`.

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

#### 1. Анализ оборачиваемости товаров
```typescript
try {
  // Получение оборачиваемости всех товаров (с пагинацией)
  const turnoverReport = await client.analytics.getStocksTurnover({
    limit: 100,
    offset: 0
    // sku: [] - если нужны конкретные товары
  });

  console.log(`📊 Найдено товаров: ${turnoverReport.items?.length || 0}`);
  
  // Анализ товаров по уровням остатка
  const analysis = {
    critical: 0,
    red: 0,
    yellow: 0,
    green: 0,
    noSales: 0
  };
  
  turnoverReport.items?.forEach(item => {
    console.log(`📦 ${item.name} (${item.offer_id}):`);
    console.log(`  • Остаток: ${item.current_stock} шт.`);
    console.log(`  • Средние продажи: ${item.ads?.toFixed(1)} шт/день`);
    console.log(`  • Хватит на: ${item.idc?.toFixed(0)} дней`);
    console.log(`  • Оборачиваемость: ${item.turnover?.toFixed(1)} дней`);
    console.log(`  • Уровень: ${getGradeEmoji(item.idc_grade)} ${item.idc_grade}`);
    
    // Подсчёт по уровням
    switch (item.idc_grade) {
      case 'GRADES_CRITICAL': analysis.critical++; break;
      case 'GRADES_RED': analysis.red++; break;
      case 'GRADES_YELLOW': analysis.yellow++; break;
      case 'GRADES_GREEN': analysis.green++; break;
      case 'GRADES_NOSALES': analysis.noSales++; break;
    }
  });
  
  console.log('\n📈 Сводка по уровням остатка:');
  console.log(`🔴 Критический: ${analysis.critical} товаров`);
  console.log(`🔴 Красный: ${analysis.red} товаров`);
  console.log(`🟡 Жёлтый: ${analysis.yellow} товаров`);
  console.log(`🟢 Зелёный: ${analysis.green} товаров`);
  console.log(`⚪ Без продаж: ${analysis.noSales} товаров`);
  
} catch (error) {
  console.error('❌ Ошибка получения оборачиваемости:', error);
}

function getGradeEmoji(grade: string): string {
  const gradeEmojis: { [key: string]: string } = {
    'GRADES_CRITICAL': '🆘',
    'GRADES_RED': '🔴',
    'GRADES_YELLOW': '🟡',
    'GRADES_GREEN': '🟢',
    'GRADES_NOSALES': '⚪',
    'GRADES_NONE': '⏳'
  };
  return gradeEmojis[grade] || '❓';
}
```

#### 2. Получение остатков по складам
```typescript
try {
  const stocksReport = await client.analytics.getStockOnWarehouses({
    limit: 100,
    offset: 0,
    warehouse_type: 'ALL' // ALL, FBO, FBS, CROSSDOCK
  });

  console.log('🏪 Отчёт по остаткам на складах:');
  
  const warehouseGroups = new Map<string, any[]>();
  
  stocksReport.result?.rows?.forEach(row => {
    const warehouse = row.warehouse_name || 'Неизвестный склад';
    
    if (!warehouseGroups.has(warehouse)) {
      warehouseGroups.set(warehouse, []);
    }
    warehouseGroups.get(warehouse)!.push(row);
    
    console.log(`📦 ${row.item_name} (${row.item_code}):`);
    console.log(`  • Склад: ${warehouse}`);
    console.log(`  • Доступно к продаже: ${row.free_to_sell_amount} шт.`);
    console.log(`  • В резерве: ${row.reserved_amount} шт.`);
    console.log(`  • Ожидается: ${row.promised_amount} шт.`);
  });
  
  // Группировка по складам
  console.log('\n🏭 Сводка по складам:');
  warehouseGroups.forEach((items, warehouse) => {
    const totalAvailable = items.reduce((sum, item) => sum + (item.free_to_sell_amount || 0), 0);
    const totalReserved = items.reduce((sum, item) => sum + (item.reserved_amount || 0), 0);
    const totalPromised = items.reduce((sum, item) => sum + (item.promised_amount || 0), 0);
    
    console.log(`🏪 ${warehouse}:`);
    console.log(`  • Товаров: ${items.length}`);
    console.log(`  • Доступно: ${totalAvailable} шт.`);
    console.log(`  • В резерве: ${totalReserved} шт.`);
    console.log(`  • Ожидается: ${totalPromised} шт.`);
  });
  
} catch (error) {
  console.error('❌ Ошибка получения остатков:', error);
}
```

---

## 🎯 Детальные сценарии использования

### 📊 Сценарий 1: Система автоматического пополнения остатков

**Задача**: Создать систему мониторинга остатков с автоматическими уведомлениями о необходимости пополнения

```typescript
class StockReplenishmentSystem {
  private readonly CRITICAL_DAYS_THRESHOLD = 7; // Критический порог в днях
  private readonly WARNING_DAYS_THRESHOLD = 14; // Порог предупреждения
  private readonly RATE_LIMIT_DELAY = 60000; // 1 минута между запросами
  
  async monitorAndAlert() {
    console.log('🔍 Запуск мониторинга остатков...');
    
    try {
      // Получаем все товары с оборачиваемостью
      const allItems = await this.getAllTurnoverData();
      
      // Анализируем критические товары
      const analysis = this.analyzeStockLevels(allItems);
      
      // Создаём рекомендации по пополнению
      const recommendations = this.generateReplenishmentRecommendations(analysis);
      
      // Отправляем уведомления
      if (recommendations.alerts.length > 0) {
        await this.sendAlerts(recommendations);
      }
      
      // Сохраняем отчёт
      await this.saveAnalysisReport(recommendations);
      
      console.log(`✅ Мониторинг завершён. Найдено ${recommendations.alerts.length} критических товаров`);
      
      return recommendations;
      
    } catch (error) {
      console.error('❌ Ошибка мониторинга остатков:', error);
      throw error;
    }
  }
  
  private async getAllTurnoverData() {
    const allItems = [];
    let offset = 0;
    const limit = 1000;
    
    while (true) {
      console.log(`📥 Загрузка товаров: offset ${offset}`);
      
      const batch = await client.analytics.getStocksTurnover({
        limit: limit,
        offset: offset
      });
      
      const items = batch.items || [];
      allItems.push(...items);
      
      if (items.length < limit) {
        break; // Последняя страница
      }
      
      offset += limit;
      
      // Соблюдаем лимит 1 запрос в минуту
      await this.delay(this.RATE_LIMIT_DELAY);
    }
    
    console.log(`📊 Загружено всего товаров: ${allItems.length}`);
    return allItems;
  }
  
  private analyzeStockLevels(items: any[]) {
    const analysis = {
      total: items.length,
      critical: [] as any[],
      warning: [] as any[],
      healthy: [] as any[],
      noSales: [] as any[],
      summary: {
        criticalCount: 0,
        warningCount: 0,
        healthyCount: 0,
        noSalesCount: 0,
        averageDaysLeft: 0,
        averageTurnover: 0
      }
    };
    
    let totalDaysLeft = 0;
    let totalTurnover = 0;
    let itemsWithData = 0;
    
    items.forEach(item => {
      const daysLeft = item.idc || 0;
      const hasData = item.ads && item.ads > 0;
      
      if (hasData) {
        totalDaysLeft += daysLeft;
        totalTurnover += item.turnover || 0;
        itemsWithData++;
      }
      
      // Классификация товаров
      if (item.idc_grade === 'GRADES_NOSALES') {
        analysis.noSales.push(item);
        analysis.summary.noSalesCount++;
      } else if (daysLeft <= this.CRITICAL_DAYS_THRESHOLD || item.idc_grade === 'GRADES_CRITICAL') {
        analysis.critical.push(item);
        analysis.summary.criticalCount++;
      } else if (daysLeft <= this.WARNING_DAYS_THRESHOLD || item.idc_grade === 'GRADES_RED') {
        analysis.warning.push(item);
        analysis.summary.warningCount++;
      } else {
        analysis.healthy.push(item);
        analysis.summary.healthyCount++;
      }
    });
    
    // Рассчитываем средние показатели
    if (itemsWithData > 0) {
      analysis.summary.averageDaysLeft = totalDaysLeft / itemsWithData;
      analysis.summary.averageTurnover = totalTurnover / itemsWithData;
    }
    
    return analysis;
  }
  
  private generateReplenishmentRecommendations(analysis: any) {
    const recommendations = {
      timestamp: new Date().toISOString(),
      summary: analysis.summary,
      alerts: [] as any[],
      actions: [] as any[]
    };
    
    // Критические товары - требуют немедленного внимания
    analysis.critical.forEach((item: any) => {
      const daysLeft = Math.max(0, item.idc || 0);
      const dailySales = item.ads || 0;
      
      // Рекомендуемое количество для заказа (на 30 дней + запас 20%)
      const recommendedOrder = Math.ceil(dailySales * 30 * 1.2);
      
      recommendations.alerts.push({
        severity: 'CRITICAL',
        offerId: item.offer_id,
        name: item.name,
        currentStock: item.current_stock,
        daysLeft: daysLeft,
        dailySales: dailySales,
        recommendedOrder: recommendedOrder,
        message: `🆘 КРИТИЧЕСКИЙ ОСТАТОК: ${item.name} закончится через ${daysLeft.toFixed(0)} дней`
      });
      
      recommendations.actions.push({
        type: 'URGENT_REPLENISHMENT',
        offerId: item.offer_id,
        quantity: recommendedOrder,
        priority: 1,
        reason: `Остаток на ${daysLeft.toFixed(0)} дней при продажах ${dailySales.toFixed(1)} шт/день`
      });
    });
    
    // Товары на предупреждении
    analysis.warning.forEach((item: any) => {
      const daysLeft = item.idc || 0;
      const dailySales = item.ads || 0;
      const recommendedOrder = Math.ceil(dailySales * 45 * 1.1); // На 45 дней + 10%
      
      recommendations.alerts.push({
        severity: 'WARNING',
        offerId: item.offer_id,
        name: item.name,
        currentStock: item.current_stock,
        daysLeft: daysLeft,
        dailySales: dailySales,
        recommendedOrder: recommendedOrder,
        message: `⚠️ Требует внимания: ${item.name} закончится через ${daysLeft.toFixed(0)} дней`
      });
      
      recommendations.actions.push({
        type: 'PLANNED_REPLENISHMENT',
        offerId: item.offer_id,
        quantity: recommendedOrder,
        priority: 2,
        reason: `Рекомендуется пополнить в ближайшие дни`
      });
    });
    
    return recommendations;
  }
  
  private async sendAlerts(recommendations: any) {
    const criticalCount = recommendations.alerts.filter((a: any) => a.severity === 'CRITICAL').length;
    const warningCount = recommendations.alerts.filter((a: any) => a.severity === 'WARNING').length;
    
    console.log('📧 Отправка уведомлений...');
    console.log(`🆘 Критических товаров: ${criticalCount}`);
    console.log(`⚠️ Товаров на контроле: ${warningCount}`);
    
    // Здесь может быть интеграция с системами уведомлений:
    // - Email
    // - Slack/Teams
    // - Telegram бот
    // - SMS
    
    // Пример отправки в консоль
    if (criticalCount > 0) {
      console.log('\n🆘 КРИТИЧЕСКИЕ ТОВАРЫ:');
      recommendations.alerts
        .filter((a: any) => a.severity === 'CRITICAL')
        .forEach((alert: any) => {
          console.log(`  • ${alert.name}: ${alert.daysLeft.toFixed(0)} дней (заказать ${alert.recommendedOrder} шт.)`);
        });
    }
  }
  
  private async saveAnalysisReport(recommendations: any) {
    // Здесь может быть сохранение в базу данных или файл
    console.log('💾 Сохранение отчёта анализа...');
    
    const reportSummary = {
      timestamp: recommendations.timestamp,
      totalItems: recommendations.summary.criticalCount + 
                  recommendations.summary.warningCount + 
                  recommendations.summary.healthyCount + 
                  recommendations.summary.noSalesCount,
      critical: recommendations.summary.criticalCount,
      warning: recommendations.summary.warningCount,
      healthy: recommendations.summary.healthyCount,
      noSales: recommendations.summary.noSalesCount,
      averageDaysLeft: recommendations.summary.averageDaysLeft.toFixed(1),
      averageTurnover: recommendations.summary.averageTurnover.toFixed(1)
    };
    
    console.log('📊 Сводка отчёта:', reportSummary);
  }
  
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Использование системы
const replenishmentSystem = new StockReplenishmentSystem();
const analysis = await replenishmentSystem.monitorAndAlert();
```

### 🏭 Сценарий 2: Оптимизация складских операций

**Задача**: Анализ эффективности распределения товаров по складам для оптимизации логистики

```typescript
class WarehouseOptimizer {
  async analyzeWarehouseEfficiency() {
    console.log('🏭 Анализ эффективности складов...');
    
    try {
      // Получаем данные по остаткам на складах
      const stockData = await this.getAllWarehouseStocks();
      
      // Получаем данные по оборачиваемости
      const turnoverData = await this.getTurnoverData();
      
      // Объединяем данные
      const combinedAnalysis = this.combineData(stockData, turnoverData);
      
      // Анализируем эффективность
      const efficiency = this.analyzeEfficiency(combinedAnalysis);
      
      // Генерируем рекомендации
      const recommendations = this.generateOptimizationRecommendations(efficiency);
      
      console.log('📊 Анализ завершён');
      return recommendations;
      
    } catch (error) {
      console.error('❌ Ошибка анализа складов:', error);
      throw error;
    }
  }
  
  private async getAllWarehouseStocks() {
    const allStocks = [];
    let offset = 0;
    const limit = 100;
    
    while (true) {
      const batch = await client.analytics.getStockOnWarehouses({
        limit: limit,
        offset: offset,
        warehouse_type: 'ALL'
      });
      
      const stocks = batch.result?.rows || [];
      allStocks.push(...stocks);
      
      if (stocks.length < limit) break;
      offset += limit;
      
      await this.delay(1000);
    }
    
    return allStocks;
  }
  
  private async getTurnoverData() {
    const allTurnover = [];
    let offset = 0;
    const limit = 1000;
    
    while (true) {
      const batch = await client.analytics.getStocksTurnover({
        limit: limit,
        offset: offset
      });
      
      const items = batch.items || [];
      allTurnover.push(...items);
      
      if (items.length < limit) break;
      offset += limit;
      
      await this.delay(60000); // 1 минута для turnover API
    }
    
    return allTurnover;
  }
  
  private combineData(stockData: any[], turnoverData: any[]) {
    const turnoverMap = new Map(
      turnoverData.map(item => [item.sku, item])
    );
    
    return stockData.map(stock => ({
      ...stock,
      turnover: turnoverMap.get(stock.sku)
    }));
  }
  
  private analyzeEfficiency(combinedData: any[]) {
    const warehouseStats = new Map();
    
    combinedData.forEach(item => {
      const warehouse = item.warehouse_name;
      const turnover = item.turnover;
      
      if (!warehouseStats.has(warehouse)) {
        warehouseStats.set(warehouse, {
          name: warehouse,
          totalItems: 0,
          totalStock: 0,
          totalReserved: 0,
          totalPromised: 0,
          fastMovingItems: 0,
          slowMovingItems: 0,
          noSalesItems: 0,
          averageDaysLeft: 0,
          efficiency: 0
        });
      }
      
      const stats = warehouseStats.get(warehouse);
      stats.totalItems++;
      stats.totalStock += item.free_to_sell_amount || 0;
      stats.totalReserved += item.reserved_amount || 0;
      stats.totalPromised += item.promised_amount || 0;
      
      if (turnover) {
        const daysLeft = turnover.idc || 0;
        
        if (daysLeft <= 7) {
          stats.fastMovingItems++;
        } else if (daysLeft > 30) {
          stats.slowMovingItems++;
        }
        
        if (turnover.idc_grade === 'GRADES_NOSALES') {
          stats.noSalesItems++;
        }
        
        stats.averageDaysLeft += daysLeft;
      }
    });
    
    // Рассчитываем эффективность каждого склада
    warehouseStats.forEach(stats => {
      if (stats.totalItems > 0) {
        stats.averageDaysLeft = stats.averageDaysLeft / stats.totalItems;
        
        // Коэффициент эффективности (0-100)
        const fastMovingRatio = stats.fastMovingItems / stats.totalItems;
        const slowMovingRatio = stats.slowMovingItems / stats.totalItems;
        const utilizationRatio = stats.totalStock / (stats.totalStock + stats.totalReserved + 1);
        
        stats.efficiency = Math.round(
          (fastMovingRatio * 40 + (1 - slowMovingRatio) * 30 + utilizationRatio * 30) * 100
        );
      }
    });
    
    return Array.from(warehouseStats.values());
  }
  
  private generateOptimizationRecommendations(efficiency: any[]) {
    const recommendations = {
      timestamp: new Date().toISOString(),
      warehouseRanking: efficiency.sort((a, b) => b.efficiency - a.efficiency),
      actions: [] as any[],
      summary: {
        totalWarehouses: efficiency.length,
        bestWarehouse: '',
        worstWarehouse: '',
        averageEfficiency: 0
      }
    };
    
    if (efficiency.length > 0) {
      recommendations.summary.bestWarehouse = efficiency[0].name;
      recommendations.summary.worstWarehouse = efficiency[efficiency.length - 1].name;
      recommendations.summary.averageEfficiency = Math.round(
        efficiency.reduce((sum, w) => sum + w.efficiency, 0) / efficiency.length
      );
    }
    
    // Генерируем рекомендации для каждого склада
    efficiency.forEach(warehouse => {
      if (warehouse.efficiency < 50) {
        recommendations.actions.push({
          warehouse: warehouse.name,
          type: 'OPTIMIZATION_NEEDED',
          priority: 'HIGH',
          issues: [
            warehouse.slowMovingItems > warehouse.totalItems * 0.3 && 'Много медленно движущихся товаров',
            warehouse.noSalesItems > warehouse.totalItems * 0.2 && 'Много товаров без продаж',
            warehouse.totalReserved > warehouse.totalStock * 0.5 && 'Высокий уровень резервов'
          ].filter(Boolean),
          recommendations: [
            'Перераспределить медленно движущиеся товары',
            'Провести анализ товаров без продаж',
            'Оптимизировать процесс резервирования'
          ]
        });
      } else if (warehouse.efficiency > 80) {
        recommendations.actions.push({
          warehouse: warehouse.name,
          type: 'BEST_PRACTICE',
          priority: 'LOW',
          message: 'Высокая эффективность - использовать как образец'
        });
      }
    });
    
    return recommendations;
  }
  
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

---

## 📝 TypeScript типы и интерфейсы

### Основные Request интерфейсы

```typescript
// Оборачиваемость товаров
interface AnalyticsTurnoverStocksRequest {
  limit?: number;    // 1-1000, количество в ответе
  offset?: number;   // Пропустить элементы
  sku?: string[];    // SKU конкретных товаров (int64 как string)
}

// Остатки на складах (deprecated)
interface AnalyticsStockOnWarehouseRequest {
  limit: number;     // Количество ответов на странице (по умолчанию 100)
  offset?: number;   // Количество пропускаемых элементов
  warehouse_type?: WarehouseType;
}

type WarehouseType = 'ALL' | 'FBO' | 'FBS' | 'CROSSDOCK';
```

### Response интерфейсы

```typescript
// Ответ оборачиваемости
interface AnalyticsTurnoverStocksResponse {
  items?: TurnoverItem[];
}

interface TurnoverItem {
  ads?: number;           // Среднесуточные продажи за 60 дней
  current_stock?: number; // Остаток товара, шт.
  idc?: number;          // На сколько дней хватит остатка
  idc_grade?: StockGrade; // Уровень остатка
  name?: string;         // Название товара
  offer_id?: string;     // Артикул продавца
  sku?: number;          // SKU товара в системе OZON
  turnover?: number;     // Фактическая оборачиваемость в днях
  turnover_grade?: StockGrade; // Уровень оборачиваемости
}

type StockGrade = 
  | 'GRADES_NONE'      // Ожидаются поставки
  | 'GRADES_NOSALES'   // Нет продаж
  | 'GRADES_GREEN'     // Зелёный, «хороший»
  | 'GRADES_YELLOW'    // Жёлтый, «средний»
  | 'GRADES_RED'       // Красный, «плохой»
  | 'GRADES_CRITICAL'; // Критический

// Ответ остатков на складах
interface AnalyticsStockOnWarehouseResponse {
  result?: {
    rows?: StockWarehouseRow[];
  };
}

interface StockWarehouseRow {
  sku?: number;                // SKU товара
  item_code?: string;          // Артикул продавца
  item_name?: string;          // Название товара
  free_to_sell_amount?: number; // Доступно к продаже
  promised_amount?: number;     // Ожидается в поставках
  reserved_amount?: number;     // В резерве
  warehouse_name?: string;      // Название склада
}
```

---

## 🚨 Особенности API и ограничения

### Rate Limiting - КРИТИЧНО важно! ⚠️
- **Оборачиваемость товаров**: Максимум **1 запрос в минуту** на один Client-Id
- **Остатки на складах**: Стандартные лимиты OZON API

⚠️ **Нарушение лимита оборачиваемости заблокирует доступ к API!**

```typescript
// ✅ Правильно - соблюдение лимита
async function getTurnoverSafely() {
  console.log('📊 Запрос оборачиваемости...');
  
  const result = await client.analytics.getStocksTurnover({
    limit: 1000,
    offset: 0
  });
  
  // Обязательная задержка 61 секунда перед следующим запросом
  console.log('⏳ Ожидание 61 секунду до следующего запроса...');
  await new Promise(resolve => setTimeout(resolve, 61000));
  
  return result;
}

// ❌ Неправильно - превышение лимита
async function getTurnoverIncorrect() {
  const batch1 = await client.analytics.getStocksTurnover({ limit: 500, offset: 0 });
  const batch2 = await client.analytics.getStocksTurnover({ limit: 500, offset: 500 }); // ❌ Заблокируют!
}
```

### Устаревшие методы
⚠️ **Метод `getStockOnWarehouses` будет отключён** - переходите на `/v1/analytics/stocks`

### Отличия от личного кабинета
⚠️ **Важно**: Отчёт `getStockOnWarehouses` отличается от отчёта в разделе **Аналитика → Отчёты → Отчёт по остаткам и товарам в пути на склады Ozon** в личном кабинете.

### Оптимизация запросов SKU
```typescript
// ✅ Если запрашиваете конкретные товары по SKU
const specificItems = await client.analytics.getStocksTurnover({
  sku: ['12345', '67890', '11111'] // limit и offset не обязательны
});

// ✅ Для получения всех товаров используйте пагинацию
const allItems = await client.analytics.getStocksTurnover({
  limit: 1000, // Максимум за раз
  offset: 0
});
```

---

## 💡 Лучшие практики

### 1. Соблюдение Rate Limiting
```typescript
class AnalyticsRateLimiter {
  private lastTurnoverRequest = 0;
  private readonly TURNOVER_COOLDOWN = 61000; // 61 секунда
  
  async getTurnoverWithRateLimit(request: any) {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastTurnoverRequest;
    
    if (timeSinceLastRequest < this.TURNOVER_COOLDOWN) {
      const waitTime = this.TURNOVER_COOLDOWN - timeSinceLastRequest;
      console.log(`⏳ Ожидание ${Math.ceil(waitTime / 1000)} секунд...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
    
    try {
      const result = await client.analytics.getStocksTurnover(request);
      this.lastTurnoverRequest = Date.now();
      
      console.log('✅ Запрос выполнен успешно');
      return result;
    } catch (error) {
      console.error('❌ Ошибка запроса:', error);
      throw error;
    }
  }
}
```

### 2. Кэширование данных аналитики
```typescript
class AnalyticsCache {
  private turnoverCache = new Map<string, { data: any; timestamp: number }>();
  private readonly CACHE_TTL = 6 * 60 * 60 * 1000; // 6 часов
  
  async getCachedTurnover(request: any) {
    const cacheKey = JSON.stringify(request);
    const cached = this.turnoverCache.get(cacheKey);
    
    if (cached && (Date.now() - cached.timestamp) < this.CACHE_TTL) {
      console.log('📋 Данные получены из кэша');
      return cached.data;
    }
    
    console.log('🔄 Запрос свежих данных...');
    const data = await client.analytics.getStocksTurnover(request);
    
    this.turnoverCache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });
    
    return data;
  }
  
  clearCache() {
    this.turnoverCache.clear();
    console.log('🗑️ Кэш очищен');
  }
}
```

### 3. Мониторинг метрик оборачиваемости
```typescript
class TurnoverMetrics {
  calculateMetrics(items: TurnoverItem[]) {
    const metrics = {
      totalItems: items.length,
      averageTurnover: 0,
      averageDaysLeft: 0,
      gradeDistribution: {
        critical: 0,
        red: 0,
        yellow: 0,
        green: 0,
        noSales: 0,
        none: 0
      },
      topSlowMoving: [] as any[],
      topFastMoving: [] as any[]
    };
    
    let totalTurnover = 0;
    let totalDaysLeft = 0;
    let itemsWithData = 0;
    
    items.forEach(item => {
      // Подсчёт по уровням
      switch (item.idc_grade) {
        case 'GRADES_CRITICAL': metrics.gradeDistribution.critical++; break;
        case 'GRADES_RED': metrics.gradeDistribution.red++; break;
        case 'GRADES_YELLOW': metrics.gradeDistribution.yellow++; break;
        case 'GRADES_GREEN': metrics.gradeDistribution.green++; break;
        case 'GRADES_NOSALES': metrics.gradeDistribution.noSales++; break;
        default: metrics.gradeDistribution.none++; break;
      }
      
      // Средние показатели
      if (item.turnover && item.turnover > 0) {
        totalTurnover += item.turnover;
        itemsWithData++;
      }
      
      if (item.idc && item.idc > 0) {
        totalDaysLeft += item.idc;
      }
    });
    
    if (itemsWithData > 0) {
      metrics.averageTurnover = totalTurnover / itemsWithData;
      metrics.averageDaysLeft = totalDaysLeft / itemsWithData;
    }
    
    // Топ медленно движущихся товаров
    metrics.topSlowMoving = items
      .filter(item => item.turnover && item.turnover > 0)
      .sort((a, b) => (b.turnover || 0) - (a.turnover || 0))
      .slice(0, 10)
      .map(item => ({
        name: item.name,
        offer_id: item.offer_id,
        turnover: item.turnover,
        current_stock: item.current_stock
      }));
    
    // Топ быстро движущихся товаров
    metrics.topFastMoving = items
      .filter(item => item.turnover && item.turnover > 0)
      .sort((a, b) => (a.turnover || 0) - (b.turnover || 0))
      .slice(0, 10)
      .map(item => ({
        name: item.name,
        offer_id: item.offer_id,
        turnover: item.turnover,
        ads: item.ads
      }));
    
    return metrics;
  }
  
  generateReport(metrics: any) {
    console.log('\n📊 ОТЧЁТ ПО ОБОРАЧИВАЕМОСТИ');
    console.log('============================');
    
    console.log(`📦 Всего товаров: ${metrics.totalItems}`);
    console.log(`⏱️ Средняя оборачиваемость: ${metrics.averageTurnover.toFixed(1)} дней`);
    console.log(`📅 Средний запас: ${metrics.averageDaysLeft.toFixed(1)} дней`);
    
    console.log('\n🎯 Распределение по уровням:');
    console.log(`🆘 Критический: ${metrics.gradeDistribution.critical} товаров`);
    console.log(`🔴 Красный: ${metrics.gradeDistribution.red} товаров`);
    console.log(`🟡 Жёлтый: ${metrics.gradeDistribution.yellow} товаров`);
    console.log(`🟢 Зелёный: ${metrics.gradeDistribution.green} товаров`);
    console.log(`⚪ Без продаж: ${metrics.gradeDistribution.noSales} товаров`);
    
    if (metrics.topSlowMoving.length > 0) {
      console.log('\n🐌 Топ медленно движущихся товаров:');
      metrics.topSlowMoving.forEach((item: any, index: number) => {
        console.log(`  ${index + 1}. ${item.name} - ${item.turnover.toFixed(1)} дней`);
      });
    }
    
    if (metrics.topFastMoving.length > 0) {
      console.log('\n🚀 Топ быстро движущихся товаров:');
      metrics.topFastMoving.forEach((item: any, index: number) => {
        console.log(`  ${index + 1}. ${item.name} - ${item.turnover.toFixed(1)} дней (${item.ads?.toFixed(1)} шт/день)`);
      });
    }
  }
}
```

---

## 🔗 Связанные API

- **[Products API](./products.md)** — управление товарами для анализа
- **[Warehouse API](./warehouse.md)** — данные о складах для анализа
- **[Finance API](./finance.md)** — финансовая аналитика
- **[FBO API](https://github.com/salacoste/ozon-daytona-seller-api)** — товары FBO
- **[FBS API](https://github.com/salacoste/ozon-daytona-seller-api)** — товары FBS

## 📞 Поддержка

**Нашли ошибку или хотите улучшить документацию?**
- 🐛 [Создать Issue](https://github.com/salacoste/ozon-daytona-seller-api/issues/new)
- 🔧 [Pull Request](https://github.com/salacoste/ozon-daytona-seller-api/compare)
- 💬 [GitHub Discussions](https://github.com/salacoste/ozon-daytona-seller-api/discussions)

**Полезные ресурсы:**
- 📚 [Официальная документация OZON](https://docs.ozon.ru/api/seller/)
- ⭐ [Репозиторий SDK](https://github.com/salacoste/ozon-daytona-seller-api)
- 📦 [NPM пакет](https://www.npmjs.com/package/daytona-ozon-seller-api)
- 🏪 [FBO -> Управление остатками](https://seller.ozon.ru/app/supply/stocks-management) в личном кабинете

---

🏠 [Главная документация](../README.md) | 📚 [Все категории](./README.md)
```