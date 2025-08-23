# Returns API

Returns API для управления возвратами FBO и FBS с 1 методом для получения информации о возвратах.

## Обзор

Returns API предоставляет базовый интерфейс для получения информации о возвратах товаров как по схеме FBO (со склада Ozon), так и по схеме FBS (со склада продавца).

**Основные возможности:**
- 📋 Получение списка возвратов с фильтрацией
- 🔍 Поиск возвратов по статусам и датам
- 📊 Пагинация для больших объемов данных
- 📈 Аналитика возвратов по различным критериям
- ⚙️ Интеграция с системами учета и аналитики

## Доступные методы

**getList(request)** - Получить список возвратов FBO и FBS
```typescript
const returns = await returnsApi.getList({
  filter: {
    status: ['NEW', 'PROCESSING'],
    created_at_from: '2024-01-01T00:00:00Z'
  },
  limit: 100
});
```

## TypeScript интерфейсы

```typescript
// Основные запросы
interface GetReturnsListRequest {
  filter?: {
    created_at_from?: string;
    created_at_to?: string;
    updated_at_from?: string;
    updated_at_to?: string;
    status?: Array<"NEW" | "PROCESSING" | "COMPLETED" | "CANCELLED" | "RETURNED_TO_SELLER" | "DISPOSED">;
    posting_number?: string[];
    return_id?: number[];
    product_id?: number[];
    sku?: number[];
    return_reason_id?: number[];
  };
  limit?: number;
  last_id?: string;
  sort?: "created_at" | "updated_at" | "return_date";
  sort_dir?: "asc" | "desc";
}

// Ответы
interface GetReturnsListResponse {
  returns: Array<{
    id: number;
    posting_number: string;
    name: string;
    sku: number;
    product_id: number;
    quantity: number;
    price: string;
    currency_code: string;
    status: "NEW" | "PROCESSING" | "COMPLETED" | "CANCELLED" | "RETURNED_TO_SELLER" | "DISPOSED";
    return_reason_id: number;
    return_reason_name: string;
    return_date: string;
    created_at: string;
    updated_at: string;
    delivery_schema: "FBO" | "FBS";
    commission_amount: string;
    commission_percent: string;
    refund_amount: string;
    pickup_amount: string;
    return_clearing_id?: number;
    customer_info: {
      customer_id: string;
      customer_name: string;
      return_comment?: string;
    };
    logistics_info: {
      logistics_status: string;
      tracking_number?: string;
      pickup_date?: string;
      delivery_date?: string;
      warehouse_id?: number;
      warehouse_name?: string;
    };
    financial_info: {
      return_cost: string;
      logistics_cost: string;
      total_refund: string;
      seller_compensation: string;
    };
  }>;
  total: number;
  has_next: boolean;
  last_id?: string;
}
```

## Примеры использования

### Получение списка возвратов с фильтрацией
```typescript
// Получение новых возвратов за текущий месяц
const currentMonth = new Date();
const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);

const newReturns = await returnsApi.getList({
  filter: {
    created_at_from: firstDayOfMonth.toISOString(),
    created_at_to: new Date().toISOString(),
    status: ['NEW', 'PROCESSING']
  },
  limit: 100,
  sort: 'created_at',
  sort_dir: 'desc'
});

console.log(`\n=== Новые возвраты за текущий месяц: ${newReturns.returns.length} ===`);

// Группировка по статусам
const statusGroups = newReturns.returns.reduce((groups, returnItem) => {
  const status = returnItem.status;
  if (!groups[status]) {
    groups[status] = [];
  }
  groups[status].push(returnItem);
  return groups;
}, {} as Record<string, any[]>);

Object.entries(statusGroups).forEach(([status, returns]) => {
  const totalValue = returns.reduce((sum, ret) => sum + parseFloat(ret.refund_amount), 0);
  console.log(`${status}: ${returns.length} возвратов на сумму ${totalValue.toFixed(2)} руб`);
});

// Детализация по каждому возврату
newReturns.returns.slice(0, 10).forEach(returnItem => {
  console.log(`\n📦 Возврат ${returnItem.id} (${returnItem.posting_number})`);
  console.log(`   Товар: ${returnItem.name} (SKU: ${returnItem.sku})`);
  console.log(`   Количество: ${returnItem.quantity}`);
  console.log(`   Статус: ${returnItem.status}`);
  console.log(`   Причина: ${returnItem.return_reason_name}`);
  console.log(`   Схема: ${returnItem.delivery_schema}`);
  console.log(`   Сумма возврата: ${returnItem.refund_amount} ${returnItem.currency_code}`);
  console.log(`   Дата возврата: ${returnItem.return_date}`);
  
  if (returnItem.customer_info.return_comment) {
    console.log(`   Комментарий клиента: "${returnItem.customer_info.return_comment}"`);
  }
  
  if (returnItem.logistics_info.tracking_number) {
    console.log(`   Трек-номер: ${returnItem.logistics_info.tracking_number}`);
  }
});
```

### Аналитика возвратов по причинам
```typescript
// Получение всех возвратов за последние 3 месяца
const threeMonthsAgo = new Date();
threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

let allReturns: any[] = [];
let lastId: string | undefined;

do {
  const response = await returnsApi.getList({
    filter: {
      created_at_from: threeMonthsAgo.toISOString(),
      created_at_to: new Date().toISOString()
    },
    limit: 1000,
    last_id: lastId
  });

  allReturns.push(...response.returns);
  lastId = response.has_next ? response.last_id : undefined;

  console.log(`Загружено возвратов: ${allReturns.length} из ${response.total}`);

} while (lastId);

console.log(`\n=== Анализ ${allReturns.length} возвратов за 3 месяца ===`);

// Анализ по причинам возврата
const reasonAnalysis = new Map<string, {
  count: number;
  total_amount: number;
  products: Set<number>;
  fbo_count: number;
  fbs_count: number;
}>();

allReturns.forEach(returnItem => {
  const reason = returnItem.return_reason_name;
  const amount = parseFloat(returnItem.refund_amount);
  
  if (!reasonAnalysis.has(reason)) {
    reasonAnalysis.set(reason, {
      count: 0,
      total_amount: 0,
      products: new Set(),
      fbo_count: 0,
      fbs_count: 0
    });
  }
  
  const analysis = reasonAnalysis.get(reason)!;
  analysis.count++;
  analysis.total_amount += amount;
  analysis.products.add(returnItem.product_id);
  
  if (returnItem.delivery_schema === 'FBO') {
    analysis.fbo_count++;
  } else {
    analysis.fbs_count++;
  }
});

// Сортировка причин по количеству возвратов
const sortedReasons = Array.from(reasonAnalysis.entries())
  .sort((a, b) => b[1].count - a[1].count);

console.log(`\n=== Топ-10 причин возвратов ===`);
sortedReasons.slice(0, 10).forEach(([reason, analysis], index) => {
  const avgAmount = analysis.total_amount / analysis.count;
  const percentage = (analysis.count / allReturns.length * 100);
  
  console.log(`\n${index + 1}. ${reason}:`);
  console.log(`   Количество: ${analysis.count} (${percentage.toFixed(1)}%)`);
  console.log(`   Общая сумма: ${analysis.total_amount.toFixed(2)} руб`);
  console.log(`   Средняя сумма: ${avgAmount.toFixed(2)} руб`);
  console.log(`   Уникальных товаров: ${analysis.products.size}`);
  console.log(`   FBO: ${analysis.fbo_count}, FBS: ${analysis.fbs_count}`);
});

// Анализ по схемам доставки
const schemaAnalysis = allReturns.reduce((acc, returnItem) => {
  const schema = returnItem.delivery_schema;
  if (!acc[schema]) {
    acc[schema] = { count: 0, amount: 0 };
  }
  acc[schema].count++;
  acc[schema].amount += parseFloat(returnItem.refund_amount);
  return acc;
}, {} as Record<string, { count: number; amount: number }>);

console.log(`\n=== Анализ по схемам доставки ===`);
Object.entries(schemaAnalysis).forEach(([schema, data]) => {
  const percentage = (data.count / allReturns.length * 100);
  const avgAmount = data.amount / data.count;
  
  console.log(`${schema}:`);
  console.log(`  Возвратов: ${data.count} (${percentage.toFixed(1)}%)`);
  console.log(`  Общая сумма: ${data.amount.toFixed(2)} руб`);
  console.log(`  Средняя сумма: ${avgAmount.toFixed(2)} руб`);
});
```

### Мониторинг проблемных товаров
```typescript
// Анализ товаров с высоким уровнем возвратов
const productReturns = new Map<number, {
  sku: number;
  name: string;
  return_count: number;
  total_quantity_returned: number;
  total_refund_amount: number;
  reasons: Map<string, number>;
  avg_return_value: number;
}>();

allReturns.forEach(returnItem => {
  const productId = returnItem.product_id;
  
  if (!productReturns.has(productId)) {
    productReturns.set(productId, {
      sku: returnItem.sku,
      name: returnItem.name,
      return_count: 0,
      total_quantity_returned: 0,
      total_refund_amount: 0,
      reasons: new Map(),
      avg_return_value: 0
    });
  }
  
  const product = productReturns.get(productId)!;
  product.return_count++;
  product.total_quantity_returned += returnItem.quantity;
  product.total_refund_amount += parseFloat(returnItem.refund_amount);
  
  const reason = returnItem.return_reason_name;
  product.reasons.set(reason, (product.reasons.get(reason) || 0) + 1);
});

// Рассчет средней стоимости возврата для каждого товара
productReturns.forEach(product => {
  product.avg_return_value = product.total_refund_amount / product.return_count;
});

// Сортировка товаров по количеству возвратов
const problematicProducts = Array.from(productReturns.entries())
  .sort((a, b) => b[1].return_count - a[1].return_count)
  .slice(0, 20);

console.log(`\n=== Топ-20 товаров по возвратам ===`);
problematicProducts.forEach(([productId, product], index) => {
  const mainReason = Array.from(product.reasons.entries())
    .sort((a, b) => b[1] - a[1])[0];
  
  console.log(`\n${index + 1}. ${product.name} (ID: ${productId}, SKU: ${product.sku})`);
  console.log(`   Возвратов: ${product.return_count}`);
  console.log(`   Количество: ${product.total_quantity_returned} шт`);
  console.log(`   Сумма возвратов: ${product.total_refund_amount.toFixed(2)} руб`);
  console.log(`   Средняя стоимость: ${product.avg_return_value.toFixed(2)} руб`);
  console.log(`   Главная причина: ${mainReason[0]} (${mainReason[1]} случаев)`);
  
  // Показываем все причины для товаров с большим количеством возвратов
  if (product.return_count > 10) {
    console.log(`   Все причины:`);
    Array.from(product.reasons.entries())
      .sort((a, b) => b[1] - a[1])
      .forEach(([reason, count]) => {
        const percentage = (count / product.return_count * 100);
        console.log(`     ${reason}: ${count} (${percentage.toFixed(1)}%)`);
      });
  }
});
```

### Временной анализ и тренды
```typescript
// Анализ возвратов по неделям
const weeklyAnalysis = new Map<string, {
  count: number;
  amount: number;
  new_count: number;
  processing_count: number;
  completed_count: number;
}>();

allReturns.forEach(returnItem => {
  const returnDate = new Date(returnItem.created_at);
  const weekStart = new Date(returnDate);
  weekStart.setDate(returnDate.getDate() - returnDate.getDay()); // начало недели
  const weekKey = weekStart.toISOString().split('T')[0];
  
  if (!weeklyAnalysis.has(weekKey)) {
    weeklyAnalysis.set(weekKey, {
      count: 0,
      amount: 0,
      new_count: 0,
      processing_count: 0,
      completed_count: 0
    });
  }
  
  const week = weeklyAnalysis.get(weekKey)!;
  week.count++;
  week.amount += parseFloat(returnItem.refund_amount);
  
  switch (returnItem.status) {
    case 'NEW':
      week.new_count++;
      break;
    case 'PROCESSING':
      week.processing_count++;
      break;
    case 'COMPLETED':
      week.completed_count++;
      break;
  }
});

// Сортировка по неделям
const sortedWeeks = Array.from(weeklyAnalysis.entries())
  .sort((a, b) => a[0].localeCompare(b[0]));

console.log(`\n=== Анализ возвратов по неделям ===`);
sortedWeeks.forEach(([week, data]) => {
  const weekDate = new Date(week).toLocaleDateString('ru-RU');
  const avgAmount = data.amount / data.count;
  
  console.log(`\nНеделя с ${weekDate}:`);
  console.log(`  Всего возвратов: ${data.count}`);
  console.log(`  Общая сумма: ${data.amount.toFixed(2)} руб`);
  console.log(`  Средняя сумма: ${avgAmount.toFixed(2)} руб`);
  console.log(`  По статусам: NEW=${data.new_count}, PROCESSING=${data.processing_count}, COMPLETED=${data.completed_count}`);
});

// Расчет трендов
if (sortedWeeks.length >= 4) {
  const lastFourWeeks = sortedWeeks.slice(-4);
  const firstTwoWeeks = lastFourWeeks.slice(0, 2);
  const lastTwoWeeks = lastFourWeeks.slice(2);
  
  const firstHalfAvg = firstTwoWeeks.reduce((sum, [, data]) => sum + data.count, 0) / 2;
  const secondHalfAvg = lastTwoWeeks.reduce((sum, [, data]) => sum + data.count, 0) / 2;
  
  const trend = ((secondHalfAvg - firstHalfAvg) / firstHalfAvg * 100);
  
  console.log(`\n=== Тренд за последние 4 недели ===`);
  if (trend > 10) {
    console.log(`📈 Рост возвратов: +${trend.toFixed(1)}% - требует внимания`);
  } else if (trend < -10) {
    console.log(`📉 Снижение возвратов: ${trend.toFixed(1)}%`);
  } else {
    console.log(`➡️ Стабильный уровень: ${trend.toFixed(1)}%`);
  }
}
```

## Сложные сценарии

### ReturnAnalyticsEngine - Система аналитики возвратов
```typescript
class ReturnAnalyticsEngine {
  constructor(private api: ReturnsApi) {}

  async generateComprehensiveReport(period: AnalysisPeriod): Promise<ReturnAnalyticsReport> {
    console.log(`📊 Генерация комплексного отчета по возвратам за период: ${period.from} - ${period.to}`);

    // Получение всех возвратов за период
    const allReturns = await this.getAllReturnsForPeriod(period);
    
    // Базовая статистика
    const basicStats = this.calculateBasicStatistics(allReturns);
    
    // Анализ по причинам
    const reasonAnalysis = this.analyzeReturnReasons(allReturns);
    
    // Анализ по товарам
    const productAnalysis = this.analyzeProductReturns(allReturns);
    
    // Временной анализ
    const temporalAnalysis = this.analyzeTemporalPatterns(allReturns);
    
    // Финансовый анализ
    const financialAnalysis = this.analyzeFinancialImpact(allReturns);
    
    // Анализ логистики
    const logisticsAnalysis = this.analyzeLogisticsPerformance(allReturns);
    
    // Генерация рекомендаций
    const recommendations = this.generateRecommendations(
      basicStats, reasonAnalysis, productAnalysis, temporalAnalysis
    );

    return {
      period,
      generated_at: new Date().toISOString(),
      basic_statistics: basicStats,
      reason_analysis: reasonAnalysis,
      product_analysis: productAnalysis,
      temporal_analysis: temporalAnalysis,
      financial_analysis: financialAnalysis,
      logistics_analysis: logisticsAnalysis,
      recommendations
    };
  }

  private async getAllReturnsForPeriod(period: AnalysisPeriod): Promise<any[]> {
    const returns: any[] = [];
    let lastId: string | undefined;

    do {
      const response = await this.api.getList({
        filter: {
          created_at_from: period.from,
          created_at_to: period.to
        },
        limit: 1000,
        last_id: lastId
      });

      returns.push(...response.returns);
      lastId = response.has_next ? response.last_id : undefined;

      console.log(`📥 Загружено возвратов: ${returns.length}`);

    } while (lastId);

    return returns;
  }

  private calculateBasicStatistics(returns: any[]): BasicReturnStatistics {
    const totalReturns = returns.length;
    const totalRefundAmount = returns.reduce((sum, ret) => sum + parseFloat(ret.refund_amount), 0);
    const avgRefundAmount = totalRefundAmount / totalReturns;

    const statusCounts = returns.reduce((counts, ret) => {
      counts[ret.status] = (counts[ret.status] || 0) + 1;
      return counts;
    }, {});

    const schemaCounts = returns.reduce((counts, ret) => {
      counts[ret.delivery_schema] = (counts[ret.delivery_schema] || 0) + 1;
      return counts;
    }, {});

    const uniqueProducts = new Set(returns.map(ret => ret.product_id)).size;
    const uniqueCustomers = new Set(returns.map(ret => ret.customer_info.customer_id)).size;

    return {
      total_returns: totalReturns,
      total_refund_amount: totalRefundAmount,
      average_refund_amount: avgRefundAmount,
      status_breakdown: statusCounts,
      schema_breakdown: schemaCounts,
      unique_products_affected: uniqueProducts,
      unique_customers_affected: uniqueCustomers,
      return_rate_estimate: this.estimateReturnRate(totalReturns)
    };
  }

  private analyzeReturnReasons(returns: any[]): ReasonAnalysis {
    const reasonStats = new Map<string, ReasonStatistics>();

    returns.forEach(returnItem => {
      const reason = returnItem.return_reason_name;
      
      if (!reasonStats.has(reason)) {
        reasonStats.set(reason, {
          reason_name: reason,
          reason_id: returnItem.return_reason_id,
          count: 0,
          total_amount: 0,
          affected_products: new Set(),
          fbo_count: 0,
          fbs_count: 0,
          avg_processing_days: 0,
          completion_rate: 0
        });
      }

      const stats = reasonStats.get(reason)!;
      stats.count++;
      stats.total_amount += parseFloat(returnItem.refund_amount);
      stats.affected_products.add(returnItem.product_id);
      
      if (returnItem.delivery_schema === 'FBO') {
        stats.fbo_count++;
      } else {
        stats.fbs_count++;
      }
    });

    // Вычисление дополнительных метрик
    reasonStats.forEach(stats => {
      stats.avg_amount = stats.total_amount / stats.count;
      stats.product_diversity = stats.affected_products.size;
    });

    const sortedReasons = Array.from(reasonStats.values())
      .sort((a, b) => b.count - a.count);

    return {
      total_unique_reasons: reasonStats.size,
      top_reasons: sortedReasons.slice(0, 10),
      reason_distribution: Object.fromEntries(
        sortedReasons.map(r => [r.reason_name, (r.count / returns.length * 100).toFixed(2)])
      ),
      high_value_reasons: sortedReasons.filter(r => r.avg_amount > 1000),
      problematic_reasons: sortedReasons.filter(r => r.count > returns.length * 0.1) // >10% от всех возвратов
    };
  }

  private generateRecommendations(
    basicStats: BasicReturnStatistics,
    reasonAnalysis: ReasonAnalysis,
    productAnalysis: ProductAnalysis,
    temporalAnalysis: TemporalAnalysis
  ): ReturnRecommendation[] {
    const recommendations: ReturnRecommendation[] = [];

    // Анализ общего уровня возвратов
    if (basicStats.return_rate_estimate > 0.15) {
      recommendations.push({
        category: 'RETURN_RATE',
        priority: 'HIGH',
        title: 'Высокий уровень возвратов',
        description: `Уровень возвратов составляет ${(basicStats.return_rate_estimate * 100).toFixed(1)}%`,
        actions: [
          'Улучшить качество описаний товаров',
          'Проанализировать качество упаковки',
          'Рассмотреть изменения в ассортименте'
        ],
        expected_impact: 'Снижение возвратов на 20-30%'
      });
    }

    // Анализ основных причин возвратов
    const topReason = reasonAnalysis.top_reasons[0];
    if (topReason && topReason.count > basicStats.total_returns * 0.25) {
      recommendations.push({
        category: 'TOP_REASON',
        priority: 'HIGH',
        title: 'Доминирующая причина возвратов',
        description: `"${topReason.reason_name}" составляет ${(topReason.count / basicStats.total_returns * 100).toFixed(1)}% возвратов`,
        actions: [
          'Детально изучить причину возвратов',
          'Внедрить меры по устранению основной причины',
          'Мониторить изменения после внедрения мер'
        ],
        expected_impact: 'Снижение возвратов на 15-25%'
      });
    }

    // Анализ проблемных товаров
    const problematicProducts = productAnalysis.high_return_products.slice(0, 5);
    if (problematicProducts.length > 0) {
      recommendations.push({
        category: 'PROBLEMATIC_PRODUCTS',
        priority: 'MEDIUM',
        title: 'Товары с высоким уровнем возвратов',
        description: `${problematicProducts.length} товаров имеют аномально высокий уровень возвратов`,
        actions: [
          'Пересмотреть описания проблемных товаров',
          'Проверить качество товаров у поставщиков',
          'Рассмотреть исключение проблемных товаров из ассортимента'
        ],
        expected_impact: 'Снижение возвратов на 10-20%'
      });
    }

    return recommendations.sort((a, b) => {
      const priorityOrder = { 'HIGH': 3, 'MEDIUM': 2, 'LOW': 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }
}

interface AnalysisPeriod {
  from: string;
  to: string;
}

interface ReturnAnalyticsReport {
  period: AnalysisPeriod;
  generated_at: string;
  basic_statistics: BasicReturnStatistics;
  reason_analysis: ReasonAnalysis;
  product_analysis: ProductAnalysis;
  temporal_analysis: TemporalAnalysis;
  financial_analysis: FinancialAnalysis;
  logistics_analysis: LogisticsAnalysis;
  recommendations: ReturnRecommendation[];
}

interface BasicReturnStatistics {
  total_returns: number;
  total_refund_amount: number;
  average_refund_amount: number;
  status_breakdown: Record<string, number>;
  schema_breakdown: Record<string, number>;
  unique_products_affected: number;
  unique_customers_affected: number;
  return_rate_estimate: number;
}

interface ReturnRecommendation {
  category: 'RETURN_RATE' | 'TOP_REASON' | 'PROBLEMATIC_PRODUCTS' | 'LOGISTICS' | 'FINANCIAL';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  title: string;
  description: string;
  actions: string[];
  expected_impact: string;
}
```

### ReturnMonitoringSystem - Система мониторинга возвратов
```typescript
class ReturnMonitoringSystem {
  private alertThresholds = {
    dailyReturnLimit: 50,
    highValueReturnAmount: 5000,
    returnRateThreshold: 0.15,
    newReturnsAlertLimit: 20
  };

  constructor(private api: ReturnsApi) {}

  async runDailyMonitoring(): Promise<MonitoringReport> {
    console.log("🔍 Запуск ежедневного мониторинга возвратов...");

    const today = new Date();
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);

    // Получение возвратов за последние 24 часа
    const recentReturns = await this.api.getList({
      filter: {
        created_at_from: yesterday.toISOString(),
        created_at_to: today.toISOString()
      },
      limit: 1000
    });

    // Анализ алертов
    const alerts = this.analyzeAlerts(recentReturns.returns);
    
    // Анализ трендов
    const trends = await this.analyzeTrends();
    
    // Генерация сводки
    const summary = this.generateDailySummary(recentReturns.returns);

    const report: MonitoringReport = {
      date: today.toISOString().split('T')[0],
      total_returns_24h: recentReturns.returns.length,
      alerts,
      trends,
      summary,
      requires_attention: alerts.some(alert => alert.severity === 'HIGH')
    };

    // Отправка уведомлений при критических алертах
    if (report.requires_attention) {
      await this.sendCriticalAlerts(report);
    }

    return report;
  }

  private analyzeAlerts(returns: any[]): MonitoringAlert[] {
    const alerts: MonitoringAlert[] = [];

    // Проверка превышения лимита возвратов
    if (returns.length > this.alertThresholds.dailyReturnLimit) {
      alerts.push({
        type: 'HIGH_VOLUME',
        severity: 'HIGH',
        message: `Превышен дневной лимит возвратов: ${returns.length} > ${this.alertThresholds.dailyReturnLimit}`,
        count: returns.length,
        threshold: this.alertThresholds.dailyReturnLimit
      });
    }

    // Проверка высокостоимостных возвратов
    const highValueReturns = returns.filter(ret => 
      parseFloat(ret.refund_amount) > this.alertThresholds.highValueReturnAmount
    );

    if (highValueReturns.length > 0) {
      const totalHighValue = highValueReturns.reduce((sum, ret) => 
        sum + parseFloat(ret.refund_amount), 0
      );

      alerts.push({
        type: 'HIGH_VALUE',
        severity: 'MEDIUM',
        message: `${highValueReturns.length} высокостоимостных возвратов на сумму ${totalHighValue.toFixed(2)} руб`,
        count: highValueReturns.length,
        threshold: this.alertThresholds.highValueReturnAmount,
        details: highValueReturns.slice(0, 5).map(ret => 
          `${ret.name}: ${ret.refund_amount} руб (${ret.return_reason_name})`
        )
      });
    }

    // Проверка новых возвратов, требующих обработки
    const newReturns = returns.filter(ret => ret.status === 'NEW');
    if (newReturns.length > this.alertThresholds.newReturnsAlertLimit) {
      alerts.push({
        type: 'PROCESSING_BACKLOG',
        severity: 'MEDIUM',
        message: `Накопилось ${newReturns.length} новых возвратов для обработки`,
        count: newReturns.length,
        threshold: this.alertThresholds.newReturnsAlertLimit
      });
    }

    return alerts;
  }

  private async sendCriticalAlerts(report: MonitoringReport): Promise<void> {
    const criticalAlerts = report.alerts.filter(alert => alert.severity === 'HIGH');
    
    if (criticalAlerts.length > 0) {
      console.log("🚨 Критические алерты по возвратам:");
      criticalAlerts.forEach(alert => {
        console.log(`   ${alert.type}: ${alert.message}`);
      });
      
      // Здесь можно добавить интеграцию с системами уведомлений:
      // - отправка email
      // - Slack/Teams уведомления
      // - SMS для критических случаев
      // - интеграция с системами мониторинга
    }
  }
}

interface MonitoringReport {
  date: string;
  total_returns_24h: number;
  alerts: MonitoringAlert[];
  trends: TrendAnalysis;
  summary: DailySummary;
  requires_attention: boolean;
}

interface MonitoringAlert {
  type: 'HIGH_VOLUME' | 'HIGH_VALUE' | 'PROCESSING_BACKLOG' | 'ANOMALY';
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  message: string;
  count: number;
  threshold: number;
  details?: string[];
}
```

## Обработка ошибок

```typescript
try {
  const returns = await returnsApi.getList({
    filter: {
      status: ['NEW', 'PROCESSING']
    },
    limit: 100
  });

  console.log(`Получено ${returns.returns.length} возвратов`);
} catch (error) {
  if (error.response?.status === 400) {
    console.error("Некорректные параметры фильтра:", error.response.data);
  } else if (error.response?.status === 403) {
    console.error("Недостаточно прав для доступа к возвратам");
  } else if (error.response?.status === 429) {
    console.error("Превышен лимит запросов - повтор через минуту");
    await new Promise(resolve => setTimeout(resolve, 60000));
  } else {
    console.error("Неожиданная ошибка:", error.message);
  }
}
```

## Лучшие практики

### Оптимизация работы с большими объемами данных
```typescript
// Эффективная загрузка всех возвратов с прогресс-баром
async function loadAllReturnsWithProgress(
  api: ReturnsApi,
  filter: any
): Promise<any[]> {
  const allReturns: any[] = [];
  let lastId: string | undefined;
  let totalLoaded = 0;

  console.log("📥 Начинаем загрузку возвратов...");
  
  do {
    const response = await api.getList({
      filter,
      limit: 1000,
      last_id: lastId
    });

    allReturns.push(...response.returns);
    totalLoaded += response.returns.length;
    lastId = response.has_next ? response.last_id : undefined;

    // Прогресс-бар
    const progress = response.total ? (totalLoaded / response.total * 100).toFixed(1) : '?';
    console.log(`📊 Загружено: ${totalLoaded} возвратов (${progress}%)`);

    // Пауза для соблюдения rate limits
    if (lastId) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }

  } while (lastId);

  console.log(`✅ Загрузка завершена: ${allReturns.length} возвратов`);
  return allReturns;
}
```

### Кэширование результатов для аналитики
```typescript
// Система кэширования для повторяющихся запросов
class ReturnsCache {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private cacheTime = 30 * 60 * 1000; // 30 минут

  async getCachedReturns(filter: any): Promise<any[] | null> {
    const cacheKey = JSON.stringify(filter);
    const cached = this.cache.get(cacheKey);
    
    if (cached && (Date.now() - cached.timestamp) < this.cacheTime) {
      console.log("📋 Используем кэшированные данные");
      return cached.data;
    }
    
    return null;
  }

  setCachedReturns(filter: any, data: any[]): void {
    const cacheKey = JSON.stringify(filter);
    this.cache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });
  }

  clearCache(): void {
    this.cache.clear();
    console.log("🗑️ Кэш очищен");
  }
}
```

## Интеграционные заметки

- **Single Endpoint**: API содержит только один метод для получения списка возвратов
- **Unified Returns**: Обрабатывает возвраты как FBO, так и FBS в едином формате
- **Rich Filtering**: Поддерживает множественные фильтры по датам, статусам, товарам
- **Pagination Support**: Курсорная пагинация для эффективной работы с большими объемами
- **Rate Limiting**: API поддерживает до 100 запросов в минуту
- **Data Retention**: Данные о возвратах хранятся до 2 лет
- **Real-time Updates**: Статусы возвратов обновляются в режиме реального времени
- **Integration Friendly**: Структура данных оптимизирована для интеграции с внешними системами