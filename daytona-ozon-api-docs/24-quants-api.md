# Quants API

Quants API для управления эконом-товарами с 2 методами для работы с квантовыми единицами товаров.

## Обзор

Quants API предназначен для управления эконом-товарами (квантами) - специальными единицами товаров с фиксированными количествами и ценами.

**Основные возможности:**
- 📋 Получение информации об эконом-товарах
- 🔍 Фильтрация и поиск квантовых единиц
- 📊 Управление видимостью и статусами
- 💰 Контроль цен и количеств

## Доступные методы

**getInfo(request)** - Информация об эконом-товаре
```typescript
const quantInfo = await quantsApi.getInfo({
  quant_code: ['QUANT001', 'QUANT002']
});
```

**getList(request?)** - Список эконом-товаров
```typescript
const quantList = await quantsApi.getList({
  visibility: 'VISIBLE',
  limit: 100
});
```

## TypeScript интерфейсы

```typescript
// Основные запросы
interface QuantInfoRequest {
  quant_code: string[];
}

interface QuantListRequest {
  visibility?: "VISIBLE" | "INVISIBLE" | "IN_SALE" | "NOT_IN_SALE" | "ARCHIVED" | "MODERATED" | "REJECTED";
  status?: "ACTIVE" | "INACTIVE" | "PENDING" | "BLOCKED";
  limit?: number;
  cursor?: string;
}

// Ответы
interface QuantInfoResponse {
  items: Array<{
    quant_code: string;
    name: string;
    description: string;
    quantity: number;
    price: string;
    currency_code: string;
    status: "ACTIVE" | "INACTIVE" | "PENDING" | "BLOCKED";
    visibility: "VISIBLE" | "INVISIBLE" | "IN_SALE" | "NOT_IN_SALE" | "ARCHIVED" | "MODERATED" | "REJECTED";
    created_at: string;
    updated_at: string;
    category_id: number;
    brand: string;
    seller_product_id?: string;
    ozon_product_id?: number;
    attributes: Array<{
      attribute_id: number;
      attribute_name: string;
      value: string;
    }>;
    images: Array<{
      url: string;
      index: number;
      is_main: boolean;
    }>;
    pricing: {
      base_price: string;
      discount_price?: string;
      discount_percentage?: number;
    };
    stock: {
      quantity: number;
      reserved: number;
      available: number;
    };
    metrics: {
      views: number;
      purchases: number;
      conversion_rate: number;
    };
  }>;
  total: number;
}

interface QuantListResponse {
  products: Array<{
    quant_code: string;
    name: string;
    quantity: number;
    price: string;
    currency_code: string;
    status: "ACTIVE" | "INACTIVE" | "PENDING" | "BLOCKED";
    visibility: "VISIBLE" | "INVISIBLE" | "IN_SALE" | "NOT_IN_SALE" | "ARCHIVED" | "MODERATED" | "REJECTED";
    created_at: string;
    updated_at: string;
    category_id: number;
    brand: string;
    images: Array<{
      url: string;
      is_main: boolean;
    }>;
    stock: {
      available: number;
      reserved: number;
    };
  }>;
  total: number;
  cursor?: string;
  has_next: boolean;
}
```

## Примеры использования

### Получение информации об эконом-товарах
```typescript
// Детальная информация по кодам квантов
const quantInfo = await quantsApi.getInfo({
  quant_code: ['QUANT001', 'QUANT002', 'QUANT003']
});

quantInfo.items.forEach(item => {
  console.log(`\n=== ${item.name} (${item.quant_code}) ===`);
  console.log(`Количество: ${item.quantity} шт`);
  console.log(`Цена: ${item.price} ${item.currency_code}`);
  console.log(`Статус: ${item.status}`);
  console.log(`Видимость: ${item.visibility}`);
  
  if (item.pricing.discount_price) {
    console.log(`Скидка: ${item.pricing.discount_percentage}%`);
    console.log(`Цена со скидкой: ${item.pricing.discount_price} ${item.currency_code}`);
  }
  
  console.log(`Остаток: ${item.stock.available} из ${item.stock.quantity}`);
  console.log(`Конверсия: ${item.metrics.conversion_rate}% (${item.metrics.purchases} покупок из ${item.metrics.views} просмотров)`);
  
  // Атрибуты товара
  if (item.attributes.length > 0) {
    console.log("\nАтрибуты:");
    item.attributes.forEach(attr => {
      console.log(`  ${attr.attribute_name}: ${attr.value}`);
    });
  }
});
```

### Получение списка эконом-товаров
```typescript
// Получение всех видимых эконом-товаров
let allQuants: any[] = [];
let cursor: string | undefined;

do {
  const response = await quantsApi.getList({
    visibility: 'VISIBLE',
    status: 'ACTIVE',
    limit: 100,
    cursor
  });

  allQuants.push(...response.products);
  cursor = response.cursor;

  console.log(`Загружено товаров: ${allQuants.length} из ${response.total}`);
  
  // Анализ по ходу загрузки
  const lowStockItems = response.products.filter(p => p.stock.available < 10);
  if (lowStockItems.length > 0) {
    console.log(`⚠️ Товаров с низким остатком в текущей партии: ${lowStockItems.length}`);
  }

} while (cursor && response.has_next);

console.log(`\nОбщая статистика по ${allQuants.length} эконом-товарам:`);
console.log(`Средняя цена: ${calculateAveragePrice(allQuants)} руб.`);
console.log(`Товаров с остатком < 10: ${allQuants.filter(p => p.stock.available < 10).length}`);

function calculateAveragePrice(products: any[]): string {
  const total = products.reduce((sum, p) => sum + parseFloat(p.price), 0);
  return (total / products.length).toFixed(2);
}
```

### Мониторинг статуса эконом-товаров
```typescript
// Анализ статусов и видимости товаров
const statusAnalysis = await quantsApi.getList({
  limit: 1000
});

// Группировка по статусам
const statusGroups = statusAnalysis.products.reduce((groups, product) => {
  const key = `${product.status}_${product.visibility}`;
  if (!groups[key]) {
    groups[key] = [];
  }
  groups[key].push(product);
  return groups;
}, {} as Record<string, any[]>);

console.log("\n=== Анализ статусов эконом-товаров ===");
Object.entries(statusGroups).forEach(([status, products]) => {
  console.log(`${status}: ${products.length} товаров`);
  
  // Показать проблемные товары
  if (status.includes('INACTIVE') || status.includes('BLOCKED')) {
    console.log("  Проблемные товары:");
    products.slice(0, 5).forEach(p => {
      console.log(`    - ${p.name} (${p.quant_code})`);
    });
    if (products.length > 5) {
      console.log(`    ... и еще ${products.length - 5}`);
    }
  }
});
```

## Сложные сценарии

### QuantAnalyticsSystem - Система аналитики эконом-товаров
```typescript
class QuantAnalyticsSystem {
  constructor(private api: QuantsApi) {}

  async generatePerformanceReport(): Promise<QuantPerformanceReport> {
    // Получение всех активных квантов
    const activeQuants = await this.getAllActiveQuants();
    
    // Детальная информация для анализа
    const detailedInfo = await this.getDetailedQuantInfo(activeQuants);
    
    // Анализ производительности
    const performanceMetrics = this.calculatePerformanceMetrics(detailedInfo);
    
    // Рекомендации по оптимизации
    const recommendations = this.generateOptimizationRecommendations(detailedInfo);
    
    return {
      report_date: new Date().toISOString(),
      total_quants: activeQuants.length,
      performance_metrics: performanceMetrics,
      top_performers: this.identifyTopPerformers(detailedInfo),
      underperformers: this.identifyUnderperformers(detailedInfo),
      optimization_recommendations: recommendations,
      inventory_alerts: this.generateInventoryAlerts(detailedInfo)
    };
  }

  private async getAllActiveQuants(): Promise<QuantProduct[]> {
    const quants: QuantProduct[] = [];
    let cursor: string | undefined;

    do {
      const response = await this.api.getList({
        status: 'ACTIVE',
        visibility: 'IN_SALE',
        limit: 500,
        cursor
      });

      quants.push(...response.products);
      cursor = response.cursor;

    } while (cursor);

    return quants;
  }

  private async getDetailedQuantInfo(quants: QuantProduct[]): Promise<DetailedQuantInfo[]> {
    const batchSize = 50;
    const detailedInfo: DetailedQuantInfo[] = [];

    for (let i = 0; i < quants.length; i += batchSize) {
      const batch = quants.slice(i, i + batchSize);
      const quantCodes = batch.map(q => q.quant_code);

      const infoResponse = await this.api.getInfo({ quant_code: quantCodes });
      detailedInfo.push(...infoResponse.items.map(item => ({
        ...item,
        efficiency_score: this.calculateEfficiencyScore(item),
        profitability_score: this.calculateProfitabilityScore(item),
        market_position: this.analyzeMarketPosition(item)
      })));

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    return detailedInfo;
  }

  private calculatePerformanceMetrics(quantsInfo: DetailedQuantInfo[]): PerformanceMetrics {
    const totalViews = quantsInfo.reduce((sum, q) => sum + q.metrics.views, 0);
    const totalPurchases = quantsInfo.reduce((sum, q) => sum + q.metrics.purchases, 0);
    const totalRevenue = quantsInfo.reduce((sum, q) => sum + (q.metrics.purchases * parseFloat(q.price)), 0);

    return {
      overall_conversion_rate: totalPurchases / totalViews,
      average_conversion_rate: quantsInfo.reduce((sum, q) => sum + q.metrics.conversion_rate, 0) / quantsInfo.length,
      total_revenue: totalRevenue,
      average_revenue_per_quant: totalRevenue / quantsInfo.length,
      high_performers_count: quantsInfo.filter(q => q.efficiency_score > 0.8).length,
      low_performers_count: quantsInfo.filter(q => q.efficiency_score < 0.3).length,
      out_of_stock_count: quantsInfo.filter(q => q.stock.available === 0).length,
      low_stock_count: quantsInfo.filter(q => q.stock.available > 0 && q.stock.available < 10).length
    };
  }

  private generateOptimizationRecommendations(quantsInfo: DetailedQuantInfo[]): OptimizationRecommendation[] {
    const recommendations: OptimizationRecommendation[] = [];

    // Анализ цен
    const overpriced = quantsInfo.filter(q => q.efficiency_score < 0.3 && q.metrics.views > 100);
    if (overpriced.length > 0) {
      recommendations.push({
        type: "PRICE_OPTIMIZATION",
        priority: "HIGH",
        affected_quants: overpriced.length,
        description: `${overpriced.length} товаров имеют низкую эффективность при высоком трафике - рекомендуется снижение цен`,
        expected_impact: "Увеличение конверсии на 15-25%"
      });
    }

    // Анализ остатков
    const overstocked = quantsInfo.filter(q => 
      q.stock.available > 50 && q.metrics.purchases / q.stock.available < 0.1
    );
    if (overstocked.length > 0) {
      recommendations.push({
        type: "INVENTORY_OPTIMIZATION", 
        priority: "MEDIUM",
        affected_quants: overstocked.length,
        description: `${overstocked.length} товаров имеют избыточные остатки с низкой оборачиваемостью`,
        expected_impact: "Освобождение складских площадей, снижение затрат на хранение"
      });
    }

    // Анализ трендов
    const trendingProducts = quantsInfo.filter(q => 
      q.metrics.conversion_rate > 0.05 && q.stock.available < 20
    );
    if (trendingProducts.length > 0) {
      recommendations.push({
        type: "STOCK_REPLENISHMENT",
        priority: "HIGH", 
        affected_quants: trendingProducts.length,
        description: `${trendingProducts.length} высокоэффективных товаров нуждаются в пополнении остатков`,
        expected_impact: "Предотвращение потери продаж, увеличение выручки на 20-30%"
      });
    }

    return recommendations.sort((a, b) => {
      const priorityOrder = { "HIGH": 3, "MEDIUM": 2, "LOW": 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  private generateInventoryAlerts(quantsInfo: DetailedQuantInfo[]): InventoryAlert[] {
    const alerts: InventoryAlert[] = [];

    quantsInfo.forEach(quant => {
      // Критически низкий остаток
      if (quant.stock.available === 0 && quant.metrics.conversion_rate > 0.02) {
        alerts.push({
          level: "CRITICAL",
          quant_code: quant.quant_code,
          message: "Товар закончился при высокой конверсии",
          suggested_action: "Срочное пополнение остатков"
        });
      }
      
      // Низкий остаток высокоэффективного товара
      else if (quant.stock.available < 5 && quant.efficiency_score > 0.7) {
        alerts.push({
          level: "WARNING",
          quant_code: quant.quant_code,
          message: "Низкий остаток эффективного товара",
          suggested_action: "Планирование пополнения остатков"
        });
      }
      
      // Избыточный остаток неэффективного товара
      else if (quant.stock.available > 100 && quant.efficiency_score < 0.2) {
        alerts.push({
          level: "INFO",
          quant_code: quant.quant_code,
          message: "Избыточный остаток низкоэффективного товара",
          suggested_action: "Рассмотрение промо-акций или снижения цены"
        });
      }
    });

    return alerts.sort((a, b) => {
      const levelOrder = { "CRITICAL": 3, "WARNING": 2, "INFO": 1 };
      return levelOrder[b.level] - levelOrder[a.level];
    });
  }

  private calculateEfficiencyScore(quant: any): number {
    const conversionWeight = 0.4;
    const viewsWeight = 0.3;
    const stockTurnoverWeight = 0.3;

    const conversionScore = Math.min(quant.metrics.conversion_rate * 20, 1); // нормализация до 1
    const viewsScore = Math.min(quant.metrics.views / 1000, 1); // нормализация до 1
    const turnoverScore = quant.stock.quantity > 0 ? 
      Math.min(quant.metrics.purchases / quant.stock.quantity, 1) : 0;

    return (conversionScore * conversionWeight + 
            viewsScore * viewsWeight + 
            turnoverScore * stockTurnoverWeight);
  }
}

interface QuantProduct {
  quant_code: string;
  name: string;
  quantity: number;
  price: string;
  status: string;
  visibility: string;
}

interface DetailedQuantInfo {
  quant_code: string;
  name: string;
  quantity: number;
  price: string;
  stock: {
    quantity: number;
    available: number;
    reserved: number;
  };
  metrics: {
    views: number;
    purchases: number;
    conversion_rate: number;
  };
  efficiency_score: number;
  profitability_score: number;
  market_position: string;
}

interface QuantPerformanceReport {
  report_date: string;
  total_quants: number;
  performance_metrics: PerformanceMetrics;
  top_performers: DetailedQuantInfo[];
  underperformers: DetailedQuantInfo[];
  optimization_recommendations: OptimizationRecommendation[];
  inventory_alerts: InventoryAlert[];
}
```

### SmartQuantManager - Умный менеджер квантов
```typescript
class SmartQuantManager {
  constructor(private api: QuantsApi) {}

  async optimizeQuantPortfolio(): Promise<OptimizationResult> {
    // Получение текущего состояния портфеля
    const currentPortfolio = await this.analyzeCurrentPortfolio();
    
    // Идентификация возможностей оптимизации
    const opportunities = this.identifyOptimizationOpportunities(currentPortfolio);
    
    // Создание плана оптимизации
    const optimizationPlan = this.createOptimizationPlan(opportunities);
    
    return {
      current_state: currentPortfolio,
      optimization_opportunities: opportunities,
      recommended_actions: optimizationPlan.actions,
      expected_improvements: optimizationPlan.expectedImprovements,
      implementation_timeline: optimizationPlan.timeline
    };
  }

  private async analyzeCurrentPortfolio(): Promise<PortfolioAnalysis> {
    const allQuants = await this.getAllQuantsWithDetails();
    
    // Категоризация товаров по производительности
    const categories = this.categorizeByPerformance(allQuants);
    
    // Анализ распределения по ценовым сегментам
    const priceSegments = this.analyzePriceSegments(allQuants);
    
    // Анализ оборачиваемости
    const turnoverAnalysis = this.analyzeTurnover(allQuants);

    return {
      total_quants: allQuants.length,
      performance_categories: categories,
      price_segments: priceSegments,
      turnover_analysis: turnoverAnalysis,
      health_score: this.calculatePortfolioHealthScore(allQuants)
    };
  }

  private categorizeByPerformance(quants: DetailedQuantInfo[]): PerformanceCategories {
    const stars = quants.filter(q => q.efficiency_score > 0.8 && q.metrics.conversion_rate > 0.03);
    const cashCows = quants.filter(q => q.efficiency_score > 0.6 && q.metrics.purchases > 50);
    const questionMarks = quants.filter(q => q.efficiency_score > 0.4 && q.metrics.views > 500 && q.metrics.purchases < 20);
    const dogs = quants.filter(q => q.efficiency_score < 0.3 && q.metrics.conversion_rate < 0.01);

    return {
      stars: { count: stars.length, items: stars },
      cash_cows: { count: cashCows.length, items: cashCows },
      question_marks: { count: questionMarks.length, items: questionMarks },
      dogs: { count: dogs.length, items: dogs }
    };
  }

  private identifyOptimizationOpportunities(portfolio: PortfolioAnalysis): OptimizationOpportunity[] {
    const opportunities: OptimizationOpportunity[] = [];

    // Возможности для звезд (высокоэффективные товары)
    portfolio.performance_categories.stars.items.forEach(star => {
      if (star.stock.available < 20) {
        opportunities.push({
          type: "INCREASE_INVENTORY",
          quant_code: star.quant_code,
          priority: "HIGH",
          rationale: "Высокоэффективный товар с низким остатком",
          expected_revenue_increase: star.metrics.purchases * parseFloat(star.price) * 0.3
        });
      }
    });

    // Возможности для проблемных товаров
    portfolio.performance_categories.dogs.items.forEach(dog => {
      if (dog.stock.available > 50) {
        opportunities.push({
          type: "REDUCE_PRICE_OR_LIQUIDATE",
          quant_code: dog.quant_code,
          priority: "MEDIUM",
          rationale: "Неэффективный товар с избыточным остатком",
          expected_cost_savings: dog.stock.available * parseFloat(dog.price) * 0.1 // экономия на хранении
        });
      }
    });

    // Возможности для "знаков вопроса"
    portfolio.performance_categories.question_marks.items.forEach(questionMark => {
      opportunities.push({
        type: "TEST_PRICE_REDUCTION",
        quant_code: questionMark.quant_code,
        priority: "MEDIUM",
        rationale: "Высокий трафик, низкая конверсия - возможно, проблема с ценой",
        expected_conversion_increase: 0.02 // увеличение конверсии на 2%
      });
    });

    return opportunities.sort((a, b) => {
      const priorityOrder = { "HIGH": 3, "MEDIUM": 2, "LOW": 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }
}

interface OptimizationOpportunity {
  type: "INCREASE_INVENTORY" | "REDUCE_PRICE_OR_LIQUIDATE" | "TEST_PRICE_REDUCTION" | "IMPROVE_VISIBILITY";
  quant_code: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  rationale: string;
  expected_revenue_increase?: number;
  expected_cost_savings?: number;
  expected_conversion_increase?: number;
}

interface PortfolioAnalysis {
  total_quants: number;
  performance_categories: PerformanceCategories;
  price_segments: PriceSegmentAnalysis;
  turnover_analysis: TurnoverAnalysis;
  health_score: number;
}
```

## Обработка ошибок

```typescript
try {
  const quantInfo = await quantsApi.getInfo({
    quant_code: ['INVALID_CODE']
  });
} catch (error) {
  if (error.response?.status === 404) {
    console.error("Эконом-товары с указанными кодами не найдены");
  } else if (error.response?.status === 400) {
    console.error("Некорректные параметры запроса:", error.response.data);
  } else {
    console.error("Неожиданная ошибка:", error.message);
  }
}
```

## Лучшие практики

### Эффективная работа с пагинацией
```typescript
async function getAllQuantsEfficiently(): Promise<QuantProduct[]> {
  const allQuants: QuantProduct[] = [];
  let cursor: string | undefined;
  let batchCount = 0;

  do {
    const response = await quantsApi.getList({
      limit: 500, // максимальный размер батча
      cursor
    });

    allQuants.push(...response.products);
    cursor = response.cursor;
    batchCount++;

    // Логирование прогресса каждые 10 батчей
    if (batchCount % 10 === 0) {
      console.log(`Загружено ${allQuants.length} товаров в ${batchCount} батчах`);
    }

    // Rate limiting для больших объемов данных
    if (batchCount > 5) {
      await new Promise(resolve => setTimeout(resolve, 50));
    }

  } while (cursor);

  return allQuants;
}
```

### Мониторинг критических метрик
```typescript
interface QuantHealthCheck {
  total_active: number;
  out_of_stock: number;
  low_conversion: number;
  high_performers: number;
  health_score: number;
}

async function performHealthCheck(): Promise<QuantHealthCheck> {
  const activeQuants = await quantsApi.getList({
    status: 'ACTIVE',
    visibility: 'IN_SALE',
    limit: 1000
  });

  const outOfStock = activeQuants.products.filter(q => q.stock.available === 0).length;
  const codes = activeQuants.products.map(q => q.quant_code);
  
  const detailedInfo = await quantsApi.getInfo({ quant_code: codes.slice(0, 100) }); // пример для первых 100
  const lowConversion = detailedInfo.items.filter(q => q.metrics.conversion_rate < 0.01).length;
  const highPerformers = detailedInfo.items.filter(q => q.metrics.conversion_rate > 0.05).length;

  const healthScore = Math.max(0, Math.min(100, 
    100 - (outOfStock * 2) - (lowConversion * 1) + (highPerformers * 0.5)
  ));

  return {
    total_active: activeQuants.products.length,
    out_of_stock: outOfStock,
    low_conversion: lowConversion,
    high_performers: highPerformers,
    health_score: Math.round(healthScore)
  };
}
```

## Интеграционные заметки

- **Rate Limiting**: API поддерживает до 100 запросов в минуту
- **Batch Processing**: Рекомендуется запрашивать информацию батчами до 50 кодов
- **Cursor Pagination**: Используется курсорная пагинация для эффективной навигации
- **Status Management**: Статусы товаров обновляются в реальном времени
- **Stock Synchronization**: Остатки синхронизируются с основной системой учета
- **Performance Metrics**: Метрики обновляются с задержкой до 24 часов