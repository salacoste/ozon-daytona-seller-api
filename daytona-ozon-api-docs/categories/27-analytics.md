# Analytics API

API для бизнес-аналитики, управления остатками и анализа оборачиваемости товаров на складах OZON FBO.

## Обзор методов

### 🔄 `getStocksTurnover()` — Оборачиваемость товара
Анализ оборачиваемости товаров с расчетом дней до исчерпания остатков. Соответствует разделу "FBO → Управление остатками" в личном кабинете.

**Ограничения:** Не более 1 запроса в минуту по Client-Id.

### 📊 `getAnalyticsStocks()` — Новая аналитика по остаткам (рекомендуемый)
Современный метод получения детальной аналитики по остаткам товаров с группировкой по кластерам и складам. Обновляется ежедневно в 07:00 UTC.

### ⚠️ `getStockOnWarehouses()` — Отчёт по остаткам (устаревший)
Устаревший метод для получения отчёта по остаткам. Будет отключён в будущем. Рекомендуется перейти на `getAnalyticsStocks()`.

---

## TypeScript интерфейсы

### Запросы (Requests)

```typescript
// Запрос оборачиваемости товаров
interface AnalyticsTurnoverStocksRequest {
  limit?: number;          // 1-1000, количество значений в ответе
  offset?: number;         // сдвиг для пагинации
  sku?: string[];         // SKU товаров для анализа
}

// Запрос новой аналитики по остаткам (рекомендуемый)
interface AnalyticsStocksV1Request {
  skus: string[];                    // ОБЯЗАТЕЛЬНО: до 100 SKU товаров
  cluster_ids?: string[];            // фильтр по кластерам
  warehouse_ids?: string[];          // фильтр по складам
  item_tags?: ItemTag[];            // фильтр по тегам товаров
  turnover_grades?: TurnoverGrade[]; // фильтр по статусу ликвидности
}

// Устаревший запрос остатков на складах
interface AnalyticsStockOnWarehouseRequest {
  limit: number;                     // ОБЯЗАТЕЛЬНО: количество ответов
  offset?: number;                   // сдвиг для пагинации
  warehouse_type?: WarehouseType;    // тип склада: ALL, FULFILLMENT
}

// Теги товаров
type ItemTag = 
  | 'ITEM_ATTRIBUTE_NONE'    // без тега
  | 'ECONOM'                 // эконом-товар
  | 'NOVEL'                  // новинка  
  | 'DISCOUNT'               // уценённый
  | 'FBS_RETURN'             // из возврата FBS
  | 'SUPER';                 // Super-товар

// Статусы ликвидности
type TurnoverGrade =
  | 'TURNOVER_GRADE_NONE'    // нет статуса
  | 'DEFICIT'                // дефицитный (до 28 дней)
  | 'POPULAR'                // очень популярный (28-56 дней)
  | 'ACTUAL'                 // популярный (56-120 дней)
  | 'SURPLUS'                // избыточный (>120 дней)
  | 'NO_SALES'               // без продаж 28 дней
  | 'WAS_NO_SALES'           // был без продаж и остатков
  | 'RESTRICTED_NO_SALES'    // ограничен (>120 дней без продаж)
  | 'COLLECTING_DATA'        // сбор данных для нового товара
  | 'WAITING_FOR_SUPPLY'     // ожидаем поставки
  | 'WAS_DEFICIT' | 'WAS_POPULAR' | 'WAS_ACTUAL' | 'WAS_SURPLUS'; // был в статусе

// Уровни оборачиваемости и остатков
type StockGrade =
  | 'GRADES_NONE'      // ожидаются поставки
  | 'GRADES_NOSALES'   // нет продаж
  | 'GRADES_GREEN'     // хороший уровень
  | 'GRADES_YELLOW'    // средний уровень
  | 'GRADES_RED'       // плохой уровень
  | 'GRADES_CRITICAL'; // критический уровень
```

### Ответы (Responses)

```typescript
// Ответ с данными оборачиваемости
interface AnalyticsTurnoverStocksResponse {
  items?: TurnoverStockItem[];
}

interface TurnoverStockItem {
  sku: number;                    // SKU товара в системе OZON
  offer_id: string;               // артикул продавца
  name: string;                   // название товара
  current_stock: number;          // остаток в штуках
  ads: number;                    // среднесуточные продажи за 60 дней
  turnover: number;               // фактическая оборачиваемость в днях
  idc: number;                    // на сколько дней хватит остатка
  turnover_grade: StockGrade;     // уровень оборачиваемости
  idc_grade: StockGrade;          // уровень остатка
}

// Ответ новой аналитики по остаткам
interface AnalyticsStocksV1Response {
  items?: AnalyticsStockItem[];
}

interface AnalyticsStockItem {
  sku: number;                              // SKU товара
  offer_id: string;                         // артикул продавца
  name: string;                             // название товара
  
  // Данные по кластеру
  cluster_id: number;                       // ID кластера
  cluster_name: string;                     // название кластера
  warehouse_id: number;                     // ID склада
  warehouse_name: string;                   // название склада
  
  // Остатки товаров
  available_stock_count: number;            // доступно к продаже
  requested_stock_count: number;            // в заявках на поставку
  transit_stock_count: number;              // в поставках в пути
  valid_stock_count: number;                // без брака с нормальным сроком
  other_stock_count: number;                // проходит проверку
  
  // Проблемные остатки
  expiring_stock_count: number;             // с истекающим сроком
  excess_stock_count: number;               // излишки к вывозу
  stock_defect_stock_count: number;         // брак к вывозу со стока
  transit_defect_stock_count: number;       // брак к вывозу с поставки
  
  // Возвраты
  return_from_customer_stock_count: number; // в процессе возврата
  return_to_seller_stock_count: number;     // готовятся к вывозу
  waiting_docs_stock_count: number;         // ожидают маркировки
  
  // Аналитика продаж
  ads: number;                              // среднесуточные продажи (28 дней, все кластеры)
  ads_cluster: number;                      // среднесуточные продажи в кластере
  idc: number;                              // дни до исчерпания (все кластеры)
  idc_cluster: number;                      // дни до исчерпания в кластере
  days_without_sales: number;               // дней без продаж (все кластеры)
  days_without_sales_cluster: number;       // дней без продаж в кластере
  
  // Статусы и теги
  turnover_grade: TurnoverGrade;            // статус ликвидности (все кластеры)
  turnover_grade_cluster: TurnoverGrade;    // статус ликвидности в кластере
  item_tags: ItemTag[];                     // теги товара
}
```

---

## Примеры использования

### Базовое использование API

```typescript
import { AnalyticsApi } from 'daytona-ozon-seller-api';

const analyticsApi = new AnalyticsApi(httpClient);

// 1. Получить оборачиваемость конкретных товаров
const turnoverData = await analyticsApi.getStocksTurnover({
  limit: 50,
  sku: ['123456789', '987654321']
});

turnoverData.items?.forEach(item => {
  console.log(`${item.name}: остаток ${item.current_stock} шт.`);
  console.log(`Среднесуточные продажи: ${item.ads}`);
  console.log(`На ${item.idc} дней остатка (уровень: ${item.idc_grade})`);
  console.log(`Оборачиваемость: ${item.turnover} дней (уровень: ${item.turnover_grade})`);
});

// 2. РЕКОМЕНДУЕМОЕ: Получить детальную аналитику по остаткам
const analytics = await analyticsApi.getAnalyticsStocks({
  skus: ['123456789', '987654321'],
  item_tags: ['NOVEL', 'SUPER'],
  turnover_grades: ['POPULAR', 'DEFICIT']
});

analytics.items?.forEach(item => {
  console.log(`\n=== ${item.name} ===`);
  console.log(`Кластер: ${item.cluster_name} (${item.warehouse_name})`);
  console.log(`Доступно: ${item.available_stock_count}, В пути: ${item.transit_stock_count}`);
  console.log(`Статус ликвидности: ${item.turnover_grade}`);
  console.log(`Среднесуточные продажи: ${item.ads} (кластер: ${item.ads_cluster})`);
  console.log(`Дней без продаж: ${item.days_without_sales}`);
});
```

### Продвинутые сценарии использования

```typescript
// Анализатор остатков для автоматического управления поставками
class StockAnalyzer {
  constructor(private analyticsApi: AnalyticsApi) {}

  async analyzeStockLevels(skus: string[]): Promise<StockAnalysis> {
    const analytics = await this.analyticsApi.getAnalyticsStocks({
      skus: skus,
      turnover_grades: ['DEFICIT', 'POPULAR', 'SURPLUS', 'NO_SALES']
    });

    const analysis: StockAnalysis = {
      needRestock: [],      // требуют пополнения
      overstock: [],        // излишки
      noSales: [],          // без продаж
      optimal: []           // оптимальные остатки
    };

    analytics.items?.forEach(item => {
      const recommendation = this.categorizeStock(item);
      analysis[recommendation.category].push({
        item,
        recommendation: recommendation.action,
        urgency: recommendation.urgency,
        suggestedQuantity: recommendation.quantity
      });
    });

    return analysis;
  }

  private categorizeStock(item: AnalyticsStockItem): StockRecommendation {
    // Дефицитные товары - критично пополнить
    if (item.turnover_grade === 'DEFICIT' && item.idc < 14) {
      return {
        category: 'needRestock',
        action: 'Срочно создать поставку',
        urgency: 'high',
        quantity: Math.ceil(item.ads * 60) // на 60 дней вперед
      };
    }

    // Популярные с низкими остатками
    if (item.turnover_grade === 'POPULAR' && item.idc < 35) {
      return {
        category: 'needRestock', 
        action: 'Планировать пополнение',
        urgency: 'medium',
        quantity: Math.ceil(item.ads * 45) // на 45 дней
      };
    }

    // Излишки
    if (item.turnover_grade === 'SURPLUS' && item.excess_stock_count > 0) {
      return {
        category: 'overstock',
        action: 'Рассмотреть продвижение или вывоз',
        urgency: 'low',
        quantity: item.excess_stock_count
      };
    }

    // Товары без продаж
    if (['NO_SALES', 'RESTRICTED_NO_SALES'].includes(item.turnover_grade)) {
      return {
        category: 'noSales',
        action: 'Анализ причин, возможная отмена',
        urgency: 'medium',
        quantity: item.available_stock_count
      };
    }

    return {
      category: 'optimal',
      action: 'Остатки в норме',
      urgency: 'none',
      quantity: 0
    };
  }
}

interface StockAnalysis {
  needRestock: StockAlert[];
  overstock: StockAlert[];
  noSales: StockAlert[];
  optimal: StockAlert[];
}

interface StockAlert {
  item: AnalyticsStockItem;
  recommendation: string;
  urgency: 'high' | 'medium' | 'low' | 'none';
  suggestedQuantity: number;
}

interface StockRecommendation {
  category: 'needRestock' | 'overstock' | 'noSales' | 'optimal';
  action: string;
  urgency: 'high' | 'medium' | 'low' | 'none';
  quantity: number;
}

// Использование анализатора
const analyzer = new StockAnalyzer(analyticsApi);
const analysis = await analyzer.analyzeStockLevels([
  '123456789', '987654321', '456789123'
]);

console.log(`🚨 Требуют пополнения: ${analysis.needRestock.length} товаров`);
console.log(`⚠️ Излишки: ${analysis.overstock.length} товаров`);
console.log(`❌ Без продаж: ${analysis.noSales.length} товаров`);
console.log(`✅ Оптимальные: ${analysis.optimal.length} товаров`);
```

### Мониторинг оборачиваемости

```typescript
// Система мониторинга оборачиваемости с алертами
class TurnoverMonitor {
  constructor(private analyticsApi: AnalyticsApi) {}

  async monitorTurnover(skus: string[]): Promise<TurnoverReport> {
    const turnover = await this.analyticsApi.getStocksTurnover({
      limit: 1000,
      sku: skus
    });

    const report: TurnoverReport = {
      critical: [],     // критические (красный уровень)
      warning: [],      // предупреждение (желтый уровень)  
      good: [],         // хорошие (зеленый уровень)
      noSales: []       // без продаж
    };

    turnover.items?.forEach(item => {
      const alert = this.createTurnoverAlert(item);
      report[alert.level].push(alert);
    });

    return report;
  }

  private createTurnoverAlert(item: TurnoverStockItem): TurnoverAlert {
    const baseAlert = {
      sku: item.sku,
      name: item.name,
      currentStock: item.current_stock,
      dailySales: item.ads,
      daysLeft: item.idc,
      turnoverDays: item.turnover
    };

    // Критический уровень
    if (item.idc_grade === 'GRADES_CRITICAL' || item.idc < 7) {
      return {
        ...baseAlert,
        level: 'critical',
        message: `КРИТИЧНО: Остатки закончатся через ${Math.floor(item.idc)} дней!`,
        action: 'Срочно создать поставку или снять с продажи'
      };
    }

    // Предупреждение  
    if (item.idc_grade === 'GRADES_RED' || item.idc < 14) {
      return {
        ...baseAlert,
        level: 'warning',
        message: `Низкие остатки: ${Math.floor(item.idc)} дней до исчерпания`,
        action: 'Планировать поставку в ближайшее время'
      };
    }

    // Без продаж
    if (item.idc_grade === 'GRADES_NOSALES') {
      return {
        ...baseAlert,
        level: 'noSales',
        message: 'Товар не продается последние 28+ дней',
        action: 'Проанализировать причины, рассмотреть продвижение'
      };
    }

    // Хороший уровень
    return {
      ...baseAlert,
      level: 'good',
      message: `Оптимальные остатки на ${Math.floor(item.idc)} дней`,
      action: 'Мониторить без изменений'
    };
  }

  // Автоматическая отправка уведомлений
  async sendAlerts(report: TurnoverReport): Promise<void> {
    if (report.critical.length > 0) {
      await this.sendCriticalAlert(report.critical);
    }
    
    if (report.warning.length > 0) {
      await this.sendWarningAlert(report.warning);
    }
    
    // Еженедельный отчет по товарам без продаж
    if (report.noSales.length > 0) {
      await this.sendNoSalesReport(report.noSales);
    }
  }

  private async sendCriticalAlert(items: TurnoverAlert[]): Promise<void> {
    const message = `🚨 КРИТИЧЕСКИЕ ОСТАТКИ (${items.length} товаров)\n\n` +
      items.map(item => 
        `• ${item.name}: ${item.daysLeft} дней (${item.currentStock} шт.)`
      ).join('\n');
    
    // Отправка через Telegram, email, Slack и т.д.
    console.log('CRITICAL ALERT:', message);
  }

  private async sendWarningAlert(items: TurnoverAlert[]): Promise<void> {
    // Реализация отправки предупреждений
  }

  private async sendNoSalesReport(items: TurnoverAlert[]): Promise<void> {
    // Реализация еженедельного отчета
  }
}

interface TurnoverReport {
  critical: TurnoverAlert[];
  warning: TurnoverAlert[];
  good: TurnoverAlert[];
  noSales: TurnoverAlert[];
}

interface TurnoverAlert {
  sku: number;
  name: string;
  currentStock: number;
  dailySales: number;
  daysLeft: number;
  turnoverDays: number;
  level: 'critical' | 'warning' | 'good' | 'noSales';
  message: string;
  action: string;
}

// Использование мониторинга
const monitor = new TurnoverMonitor(analyticsApi);
const report = await monitor.monitorTurnover(['123456789', '987654321']);
await monitor.sendAlerts(report);
```

---

## Интеграция с бизнес-логикой

### Автоматизация управления поставками

```typescript
// Интеграция с системой планирования поставок
class SupplyPlanningIntegration {
  constructor(
    private analyticsApi: AnalyticsApi,
    private supplyApi: any // Другие API для управления поставками
  ) {}

  async createOptimalSupplyPlan(skus: string[]): Promise<SupplyPlan> {
    // Получаем актуальную аналитику
    const [turnover, stocks] = await Promise.all([
      this.analyticsApi.getStocksTurnover({ sku: skus, limit: 1000 }),
      this.analyticsApi.getAnalyticsStocks({ 
        skus, 
        turnover_grades: ['DEFICIT', 'POPULAR', 'ACTUAL']
      })
    ]);

    const supplyPlan: SupplyPlan = {
      urgentItems: [],
      plannedItems: [],
      totalValue: 0,
      deliveryDate: this.calculateOptimalDeliveryDate()
    };

    // Анализируем каждый товар
    stocks.items?.forEach(stockItem => {
      const turnoverItem = turnover.items?.find(t => t.sku === stockItem.sku);
      if (!turnoverItem) return;

      const planItem = this.calculateSupplyQuantity(stockItem, turnoverItem);
      if (planItem) {
        if (planItem.urgency === 'urgent') {
          supplyPlan.urgentItems.push(planItem);
        } else {
          supplyPlan.plannedItems.push(planItem);
        }
        supplyPlan.totalValue += planItem.estimatedCost;
      }
    });

    return supplyPlan;
  }

  private calculateSupplyQuantity(
    stock: AnalyticsStockItem, 
    turnover: TurnoverStockItem
  ): SupplyPlanItem | null {
    // Дефицитные товары - срочная поставка
    if (turnover.idc < 14 && stock.turnover_grade === 'DEFICIT') {
      return {
        sku: stock.sku,
        name: stock.name,
        currentStock: stock.available_stock_count,
        dailySales: stock.ads,
        recommendedQuantity: Math.ceil(stock.ads * 60), // на 2 месяца
        urgency: 'urgent',
        reason: `Критически низкие остатки (${Math.floor(turnover.idc)} дней)`,
        estimatedCost: this.estimateCost(stock.sku, Math.ceil(stock.ads * 60))
      };
    }

    // Популярные товары - плановая поставка
    if (turnover.idc < 35 && stock.turnover_grade === 'POPULAR') {
      return {
        sku: stock.sku,
        name: stock.name,
        currentStock: stock.available_stock_count,
        dailySales: stock.ads,
        recommendedQuantity: Math.ceil(stock.ads * 45), // на 1.5 месяца
        urgency: 'planned',
        reason: `Популярный товар требует пополнения`,
        estimatedCost: this.estimateCost(stock.sku, Math.ceil(stock.ads * 45))
      };
    }

    return null;
  }

  private calculateOptimalDeliveryDate(): Date {
    const now = new Date();
    const deliveryDate = new Date(now);
    deliveryDate.setDate(now.getDate() + 7); // +7 дней на подготовку
    return deliveryDate;
  }

  private estimateCost(sku: number, quantity: number): number {
    // Интеграция с системой себестоимости
    // Возвращает примерную стоимость закупки
    return quantity * 100; // заглушка
  }
}

interface SupplyPlan {
  urgentItems: SupplyPlanItem[];
  plannedItems: SupplyPlanItem[];
  totalValue: number;
  deliveryDate: Date;
}

interface SupplyPlanItem {
  sku: number;
  name: string;
  currentStock: number;
  dailySales: number;
  recommendedQuantity: number;
  urgency: 'urgent' | 'planned';
  reason: string;
  estimatedCost: number;
}
```

---

## Рекомендации по использованию

### 🚀 Лучшие практики

1. **Используйте новый метод `getAnalyticsStocks()`**
   - Более детальная информация по кластерам и складам
   - Ежедневное обновление данных в 07:00 UTC
   - Замена устаревшего `getStockOnWarehouses()`

2. **Соблюдайте лимиты запросов**
   - `getStocksTurnover()`: максимум 1 запрос/минуту
   - `getAnalyticsStocks()`: максимум 100 SKU за запрос

3. **Фильтрация для оптимизации**
   - Используйте фильтры `turnover_grades` для анализа проблемных товаров
   - Применяйте `item_tags` для работы с определенными категориями

4. **Мониторинг критических показателей**
   - IDC < 14 дней — критично низкие остатки
   - Статус `DEFICIT` — срочно требует пополнения  
   - `NO_SALES` > 28 дней — анализ причин отсутствия продаж

### ⚠️ Особенности и ограничения

- **Время обновления**: данные `getAnalyticsStocks()` обновляются в 07:00 UTC
- **Историчность**: анализ основан на данных за последние 28-60 дней
- **Кластерная специфика**: показатели различаются по кластерам и складам
- **Устаревший метод**: `getStockOnWarehouses()` будет отключен в будущем

### 📊 KPI и метрики

- **IDC (Inventory Days Coverage)**: дни до исчерпания остатков
- **ADS (Average Daily Sales)**: среднесуточные продажи
- **Turnover Grade**: статус ликвидности товара
- **Stock Grade**: уровень текущих остатков (зеленый/желтый/красный)