# Управление товарами в стратегиях

**4 метода** — полный цикл управления товарами в стратегиях ценообразования на платформе OZON

## 📊 Обзор методов API

### 🛍️ Управление товарами в стратегиях (4 метода)
1. **addItemsToStrategy()** — Добавление товаров в стратегию
2. **removeItemsFromStrategy()** — Удаление товаров из стратегии
3. **getStrategyItems()** — Список товаров в стратегии
4. **getStrategyItemInfo()** — Информация о цене товара у конкурента

---

## 📋 Полная типизация интерфейсов

### Request Types

```typescript
/**
 * Запрос добавления товаров в стратегию
 * Request for adding products to strategy
 */
interface AddStrategyItemsRequest {
  /** Идентификатор стратегии */
  strategy_id: string;
  /** Список идентификаторов товаров в системе продавца (максимум 50) */
  product_id: string[];
}

/**
 * Запрос удаления товаров из стратегии
 * Request for removing products from strategy
 */
interface RemoveStrategyItemsRequest {
  /** Идентификатор стратегии */
  strategy_id: string;
  /** Список идентификаторов товаров для удаления */
  product_id: string[];
}

/**
 * Запрос списка товаров в стратегии
 * Request for getting products in strategy
 */
interface GetStrategyItemsRequest {
  /** Идентификатор стратегии */
  strategy_id: string;
  /** Номер страницы (начиная с 1) */
  page?: number;
  /** Количество элементов на странице (максимум 50) */
  limit?: number;
}

/**
 * Запрос информации о товаре в стратегии
 * Request for getting product info in strategy
 */
interface GetStrategyItemInfoRequest {
  /** Идентификатор товара в системе продавца */
  product_id: number;
}
```

### Response Types

```typescript
/**
 * Результат добавления товаров в стратегию
 * Result of adding products to strategy
 */
interface AddStrategyItemsResponse {
  result: AddStrategyItemsResult;
}

interface AddStrategyItemsResult {
  /** Количество успешно добавленных товаров */
  added_count: number;
  /** Список товаров, которые не удалось добавить */
  failed_products?: FailedProduct[];
  /** Общее количество товаров в стратегии после операции */
  total_count: number;
}

/**
 * Результат удаления товаров из стратегии
 * Result of removing products from strategy
 */
interface RemoveStrategyItemsResponse {
  result: RemoveStrategyItemsResult;
}

interface RemoveStrategyItemsResult {
  /** Количество успешно удалённых товаров */
  removed_count: number;
  /** Список товаров, которые не удалось удалить */
  failed_products?: FailedProduct[];
  /** Общее количество товаров в стратегии после операции */
  total_count: number;
}

/**
 * Список товаров в стратегии
 * List of products in strategy
 */
interface GetStrategyItemsResponse {
  result: GetStrategyItemsResult;
}

interface GetStrategyItemsResult {
  /** Список товаров в стратегии */
  items: StrategyProduct[];
  /** Общее количество товаров в стратегии */
  total_count: number;
  /** Информация о пагинации */
  pagination: {
    page: number;
    limit: number;
    has_next: boolean;
    has_previous: boolean;
  };
}

/**
 * Информация о товаре у конкурента
 * Competitor product information
 */
interface GetStrategyItemInfoResponse {
  result: ProductCompetitorInfo;
}

interface ProductCompetitorInfo {
  /** Идентификатор товара */
  product_id: string;
  /** Информация о конкурентах для данного товара */
  competitors: CompetitorProductInfo[];
  /** Рекомендуемая цена на основе анализа конкурентов */
  recommended_price?: number;
  /** Текущая цена товара */
  current_price: number;
  /** Статус мониторинга */
  monitoring_status: 'active' | 'inactive' | 'error';
}
```

### Supporting Types

```typescript
/**
 * Товар в стратегии ценообразования
 * Product in pricing strategy
 */
interface StrategyProduct {
  /** Идентификатор товара */
  product_id: string;
  /** Название товара */
  name: string;
  /** Артикул продавца (SKU) */
  sku: string;
  /** Текущая цена товара */
  current_price: number;
  /** Рекомендуемая цена */
  recommended_price?: number;
  /** Дата добавления в стратегию */
  added_date: string;
  /** Дата последнего обновления цены */
  last_price_update: string;
  /** Статус товара в стратегии */
  status: 'active' | 'inactive' | 'error';
  /** Настройки товара в стратегии */
  settings?: ProductStrategySettings;
}

/**
 * Настройки товара в стратегии
 * Product settings in strategy
 */
interface ProductStrategySettings {
  /** Минимальная цена */
  min_price?: number;
  /** Максимальная цена */
  max_price?: number;
  /** Минимальная маржа (0.0-1.0) */
  min_margin?: number;
  /** Коэффициент конкурентоспособности */
  competitiveness_factor?: number;
  /** Автоматическое обновление цены */
  auto_update?: boolean;
}

/**
 * Информация о товаре у конкурента
 * Competitor product information
 */
interface CompetitorProductInfo {
  /** Название конкурента */
  competitor_name: string;
  /** Цена у конкурента */
  price: number;
  /** Валюта */
  currency: string;
  /** Ссылка на товар у конкурента */
  product_url?: string;
  /** Дата последнего обновления цены */
  last_updated: string;
  /** Рейтинг товара у конкурента */
  rating?: number;
  /** Количество отзывов */
  reviews_count?: number;
  /** Доступность товара */
  availability: 'in_stock' | 'out_of_stock' | 'limited' | 'unknown';
}

/**
 * Товар, который не удалось обработать
 * Failed product operation
 */
interface FailedProduct {
  /** Идентификатор товара */
  product_id: string;
  /** Код ошибки */
  error_code: string;
  /** Описание ошибки */
  error_message: string;
}
```

---

## 🛠️ Практические примеры использования

### 1. Добавление товаров в стратегию

```typescript
import { PricingStrategyApi } from 'daytona-ozon-seller-api';

const pricingApi = new PricingStrategyApi(httpClient);

// Добавление товаров в существующую стратегию
async function addProductsToStrategy(
  strategyId: string, 
  productIds: string[]
): Promise<void> {
  try {
    const result = await pricingApi.addItemsToStrategy({
      strategy_id: strategyId,
      product_id: productIds.slice(0, 50) // Максимум 50 товаров
    });

    console.log(`✅ Добавлено товаров: ${result.result.added_count}`);
    console.log(`📊 Всего товаров в стратегии: ${result.result.total_count}`);

    // Обработка неудачных операций
    if (result.result.failed_products?.length > 0) {
      console.warn('⚠️ Не удалось добавить товары:');
      result.result.failed_products.forEach(failed => {
        console.warn(`- ${failed.product_id}: ${failed.error_message}`);
      });
    }
  } catch (error) {
    console.error('❌ Ошибка при добавлении товаров:', error);
    throw error;
  }
}

// Пример использования
await addProductsToStrategy('strategy_123', [
  '123456789',
  '987654321',
  '555666777'
]);
```

### 2. Получение списка товаров в стратегии

```typescript
// Получение всех товаров в стратегии с пагинацией
async function getAllStrategyProducts(strategyId: string): Promise<StrategyProduct[]> {
  const allProducts: StrategyProduct[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    try {
      const response = await pricingApi.getStrategyItems({
        strategy_id: strategyId,
        page: page,
        limit: 50
      });

      allProducts.push(...response.result.items);
      
      console.log(`📄 Загружена страница ${page}, товаров: ${response.result.items.length}`);
      
      hasMore = response.result.pagination.has_next;
      page++;
    } catch (error) {
      console.error(`❌ Ошибка при загрузке страницы ${page}:`, error);
      break;
    }
  }

  console.log(`✅ Всего загружено товаров: ${allProducts.length}`);
  return allProducts;
}

// Анализ товаров в стратегии
async function analyzeStrategyProducts(strategyId: string): Promise<void> {
  const products = await getAllStrategyProducts(strategyId);

  const analysis = {
    total: products.length,
    active: products.filter(p => p.status === 'active').length,
    inactive: products.filter(p => p.status === 'inactive').length,
    with_errors: products.filter(p => p.status === 'error').length,
    avg_price: products.reduce((sum, p) => sum + p.current_price, 0) / products.length,
    with_recommendations: products.filter(p => p.recommended_price !== undefined).length
  };

  console.log('📊 Анализ товаров в стратегии:');
  console.log(`- Всего товаров: ${analysis.total}`);
  console.log(`- Активных: ${analysis.active}`);
  console.log(`- Неактивных: ${analysis.inactive}`);
  console.log(`- С ошибками: ${analysis.with_errors}`);
  console.log(`- Средняя цена: ${analysis.avg_price.toFixed(2)} ₽`);
  console.log(`- С рекомендациями: ${analysis.with_recommendations}`);
}
```

### 3. Анализ конкурентов по товару

```typescript
// Получение информации о конкурентах для товара
async function analyzeProductCompetitors(productId: number): Promise<void> {
  try {
    const response = await pricingApi.getStrategyItemInfo({
      product_id: productId
    });

    const info = response.result;
    console.log(`🔍 Анализ товара ${info.product_id}:`);
    console.log(`💰 Текущая цена: ${info.current_price} ₽`);
    
    if (info.recommended_price) {
      const difference = info.recommended_price - info.current_price;
      const percentage = (difference / info.current_price * 100).toFixed(1);
      console.log(`💡 Рекомендуемая цена: ${info.recommended_price} ₽ (${percentage > 0 ? '+' : ''}${percentage}%)`);
    }

    console.log(`📡 Статус мониторинга: ${info.monitoring_status}`);
    console.log(`🏪 Найдено конкурентов: ${info.competitors.length}`);

    // Анализ конкурентов
    if (info.competitors.length > 0) {
      const sortedCompetitors = info.competitors
        .sort((a, b) => a.price - b.price);

      console.log('\n🥇 Топ-5 конкурентов по цене:');
      sortedCompetitors.slice(0, 5).forEach((competitor, index) => {
        console.log(`${index + 1}. ${competitor.competitor_name}: ${competitor.price} ${competitor.currency}`);
        if (competitor.rating) {
          console.log(`   ⭐ Рейтинг: ${competitor.rating} (${competitor.reviews_count} отзывов)`);
        }
        console.log(`   📦 Наличие: ${competitor.availability}`);
      });

      // Статистика по ценам
      const prices = info.competitors.map(c => c.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      const avgPrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;

      console.log('\n📈 Статистика цен конкурентов:');
      console.log(`- Минимальная: ${minPrice} ₽`);
      console.log(`- Максимальная: ${maxPrice} ₽`);
      console.log(`- Средняя: ${avgPrice.toFixed(2)} ₽`);
      console.log(`- Наша позиция: ${info.current_price < minPrice ? '🔥 Ниже всех' : 
                    info.current_price > maxPrice ? '💸 Выше всех' : '🎯 В диапазоне'}`);
    }
  } catch (error) {
    console.error('❌ Ошибка при анализе конкурентов:', error);
  }
}
```

### 4. Массовое управление товарами

```typescript
// Класс для массового управления товарами в стратегиях
class StrategyProductManager {
  constructor(private pricingApi: PricingStrategyApi) {}

  /**
   * Массовое добавление товаров в стратегию с обработкой ошибок
   */
  async bulkAddProducts(
    strategyId: string, 
    productIds: string[],
    batchSize: number = 50
  ): Promise<BulkOperationResult> {
    const result: BulkOperationResult = {
      total_requested: productIds.length,
      total_processed: 0,
      total_successful: 0,
      total_failed: 0,
      failed_products: [],
      batches_processed: 0
    };

    // Разбиваем на батчи
    const batches = this.chunkArray(productIds, batchSize);
    console.log(`🔄 Обработка ${productIds.length} товаров в ${batches.length} батчах`);

    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i];
      console.log(`📦 Обработка батча ${i + 1}/${batches.length} (${batch.length} товаров)`);

      try {
        const response = await this.pricingApi.addItemsToStrategy({
          strategy_id: strategyId,
          product_id: batch
        });

        result.total_successful += response.result.added_count;
        result.total_processed += batch.length;
        result.batches_processed++;

        if (response.result.failed_products) {
          result.failed_products.push(...response.result.failed_products);
          result.total_failed += response.result.failed_products.length;
        }

        // Пауза между батчами для предотвращения rate limiting
        if (i < batches.length - 1) {
          await this.delay(1000);
        }
      } catch (error) {
        console.error(`❌ Ошибка в батче ${i + 1}:`, error);
        // Добавляем все товары из неудачного батча как неудачные
        batch.forEach(productId => {
          result.failed_products.push({
            product_id: productId,
            error_code: 'BATCH_FAILED',
            error_message: `Batch processing failed: ${error}`
          });
        });
        result.total_failed += batch.length;
        result.total_processed += batch.length;
      }
    }

    this.logBulkOperationResults(result);
    return result;
  }

  /**
   * Массовое удаление товаров из стратегии
   */
  async bulkRemoveProducts(
    strategyId: string,
    productIds: string[],
    batchSize: number = 50
  ): Promise<BulkOperationResult> {
    // Аналогичная логика для удаления
    const result: BulkOperationResult = {
      total_requested: productIds.length,
      total_processed: 0,
      total_successful: 0,
      total_failed: 0,
      failed_products: [],
      batches_processed: 0
    };

    const batches = this.chunkArray(productIds, batchSize);
    console.log(`🗑️ Удаление ${productIds.length} товаров в ${batches.length} батчах`);

    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i];
      
      try {
        const response = await this.pricingApi.removeItemsFromStrategy({
          strategy_id: strategyId,
          product_id: batch
        });

        result.total_successful += response.result.removed_count;
        result.total_processed += batch.length;
        result.batches_processed++;

        if (response.result.failed_products) {
          result.failed_products.push(...response.result.failed_products);
          result.total_failed += response.result.failed_products.length;
        }

        await this.delay(1000);
      } catch (error) {
        console.error(`❌ Ошибка при удалении батча ${i + 1}:`, error);
        batch.forEach(productId => {
          result.failed_products.push({
            product_id: productId,
            error_code: 'REMOVE_BATCH_FAILED',
            error_message: `Remove batch failed: ${error}`
          });
        });
        result.total_failed += batch.length;
        result.total_processed += batch.length;
      }
    }

    this.logBulkOperationResults(result);
    return result;
  }

  private chunkArray<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private logBulkOperationResults(result: BulkOperationResult): void {
    console.log('\n📊 Результаты массовой операции:');
    console.log(`✅ Успешно обработано: ${result.total_successful}/${result.total_requested}`);
    console.log(`❌ Неудачных операций: ${result.total_failed}`);
    console.log(`📦 Батчей обработано: ${result.batches_processed}`);
    
    if (result.failed_products.length > 0) {
      console.log('\n⚠️ Товары с ошибками:');
      result.failed_products.slice(0, 10).forEach(failed => {
        console.log(`- ${failed.product_id}: ${failed.error_message}`);
      });
      if (result.failed_products.length > 10) {
        console.log(`... и ещё ${result.failed_products.length - 10} товаров`);
      }
    }
  }
}

interface BulkOperationResult {
  total_requested: number;
  total_processed: number;
  total_successful: number;
  total_failed: number;
  failed_products: FailedProduct[];
  batches_processed: number;
}

// Пример использования
const productManager = new StrategyProductManager(pricingApi);

await productManager.bulkAddProducts('strategy_123', [
  '123456789', '987654321', '555666777', // ... ещё товары
], 30); // По 30 товаров в батче
```

---

## 🎯 Бизнес-логика и автоматизация

### 1. Мониторинг эффективности товаров

```typescript
/**
 * Класс для мониторинга эффективности товаров в стратегиях
 */
class ProductPerformanceMonitor {
  constructor(private pricingApi: PricingStrategyApi) {}

  /**
   * Анализ эффективности всех товаров в стратегии
   */
  async analyzeStrategyPerformance(strategyId: string): Promise<StrategyPerformanceReport> {
    console.log('🔍 Анализ эффективности стратегии...');
    
    const products = await this.getAllProducts(strategyId);
    const performanceData: ProductPerformance[] = [];

    for (const product of products) {
      try {
        const competitorInfo = await this.pricingApi.getStrategyItemInfo({
          product_id: parseInt(product.product_id)
        });

        const performance = await this.calculateProductPerformance(
          product, 
          competitorInfo.result
        );
        
        performanceData.push(performance);
        await this.delay(500); // Избегаем rate limiting
      } catch (error) {
        console.warn(`⚠️ Не удалось проанализировать товар ${product.product_id}:`, error);
      }
    }

    return this.generatePerformanceReport(strategyId, performanceData);
  }

  private async calculateProductPerformance(
    product: StrategyProduct,
    competitorInfo: ProductCompetitorInfo
  ): Promise<ProductPerformance> {
    const competitors = competitorInfo.competitors;
    
    if (competitors.length === 0) {
      return {
        product_id: product.product_id,
        name: product.name,
        current_price: product.current_price,
        performance_score: 0,
        market_position: 'no_data',
        optimization_potential: 'unknown',
        recommendations: ['Добавить мониторинг конкурентов']
      };
    }

    const competitorPrices = competitors.map(c => c.price).sort((a, b) => a - b);
    const minPrice = competitorPrices[0];
    const maxPrice = competitorPrices[competitorPrices.length - 1];
    const avgPrice = competitorPrices.reduce((sum, price) => sum + price, 0) / competitorPrices.length;
    
    // Расчёт позиции на рынке
    let marketPosition: 'leader' | 'competitive' | 'expensive' | 'optimal';
    let performanceScore = 0;
    let optimizationPotential: 'high' | 'medium' | 'low';
    const recommendations: string[] = [];

    if (product.current_price <= minPrice) {
      marketPosition = 'leader';
      performanceScore = 85;
      optimizationPotential = 'medium';
      recommendations.push('Возможно повышение цены без потери конкурентоспособности');
    } else if (product.current_price <= avgPrice) {
      marketPosition = 'competitive';
      performanceScore = 75;
      optimizationPotential = 'low';
      recommendations.push('Цена конкурентоспособна');
    } else if (product.current_price <= maxPrice) {
      marketPosition = 'expensive';
      performanceScore = 45;
      optimizationPotential = 'high';
      recommendations.push('Рекомендуется снижение цены для повышения конкурентоспособности');
    } else {
      marketPosition = 'expensive';
      performanceScore = 25;
      optimizationPotential = 'high';
      recommendations.push('Цена значительно превышает рыночную - требуется коррекция');
    }

    // Дополнительные рекомендации
    if (competitorInfo.recommended_price && competitorInfo.recommended_price !== product.current_price) {
      const priceDiff = competitorInfo.recommended_price - product.current_price;
      const priceDiffPercent = (priceDiff / product.current_price * 100).toFixed(1);
      
      recommendations.push(
        `Рекомендация системы: ${competitorInfo.recommended_price} ₽ (${priceDiff > 0 ? '+' : ''}${priceDiffPercent}%)`
      );
    }

    return {
      product_id: product.product_id,
      name: product.name,
      current_price: product.current_price,
      recommended_price: competitorInfo.recommended_price,
      competitor_count: competitors.length,
      min_competitor_price: minPrice,
      max_competitor_price: maxPrice,
      avg_competitor_price: avgPrice,
      market_position: marketPosition,
      performance_score: performanceScore,
      optimization_potential: optimizationPotential,
      recommendations
    };
  }

  private generatePerformanceReport(
    strategyId: string,
    performanceData: ProductPerformance[]
  ): StrategyPerformanceReport {
    const totalProducts = performanceData.length;
    const avgScore = performanceData.reduce((sum, p) => sum + p.performance_score, 0) / totalProducts;
    
    const positionDistribution = {
      leader: performanceData.filter(p => p.market_position === 'leader').length,
      competitive: performanceData.filter(p => p.market_position === 'competitive').length,
      expensive: performanceData.filter(p => p.market_position === 'expensive').length,
      no_data: performanceData.filter(p => p.market_position === 'no_data').length
    };

    const optimizationDistribution = {
      high: performanceData.filter(p => p.optimization_potential === 'high').length,
      medium: performanceData.filter(p => p.optimization_potential === 'medium').length,
      low: performanceData.filter(p => p.optimization_potential === 'low').length,
      unknown: performanceData.filter(p => p.optimization_potential === 'unknown').length
    };

    const topPerformers = performanceData
      .sort((a, b) => b.performance_score - a.performance_score)
      .slice(0, 10);

    const underperformers = performanceData
      .filter(p => p.performance_score < 50)
      .sort((a, b) => a.performance_score - b.performance_score)
      .slice(0, 10);

    return {
      strategy_id: strategyId,
      analysis_date: new Date().toISOString(),
      total_products: totalProducts,
      avg_performance_score: Math.round(avgScore),
      position_distribution: positionDistribution,
      optimization_distribution: optimizationDistribution,
      top_performers: topPerformers,
      underperformers: underperformers,
      overall_recommendations: this.generateOverallRecommendations(performanceData)
    };
  }

  private generateOverallRecommendations(data: ProductPerformance[]): string[] {
    const recommendations: string[] = [];
    
    const highOptimizationCount = data.filter(p => p.optimization_potential === 'high').length;
    const expensiveCount = data.filter(p => p.market_position === 'expensive').length;
    const leaderCount = data.filter(p => p.market_position === 'leader').length;
    
    if (highOptimizationCount > data.length * 0.3) {
      recommendations.push(`🚨 ${highOptimizationCount} товаров требуют срочной оптимизации цен`);
    }
    
    if (expensiveCount > data.length * 0.4) {
      recommendations.push(`💰 Общая ценовая политика слишком агрессивна - ${expensiveCount} товаров дороже конкурентов`);
    }
    
    if (leaderCount > data.length * 0.6) {
      recommendations.push(`🏆 Есть потенциал для повышения цен - ${leaderCount} товаров лидируют по цене`);
    }
    
    const avgScore = data.reduce((sum, p) => sum + p.performance_score, 0) / data.length;
    if (avgScore < 60) {
      recommendations.push('📉 Общая эффективность стратегии требует улучшения');
    } else if (avgScore > 80) {
      recommendations.push('🎯 Стратегия показывает отличные результаты');
    }

    return recommendations;
  }

  private async getAllProducts(strategyId: string): Promise<StrategyProduct[]> {
    // Реализация получения всех товаров (аналогично предыдущему примеру)
    const allProducts: StrategyProduct[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await this.pricingApi.getStrategyItems({
        strategy_id: strategyId,
        page: page,
        limit: 50
      });

      allProducts.push(...response.result.items);
      hasMore = response.result.pagination.has_next;
      page++;
    }

    return allProducts;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Типы для мониторинга
interface ProductPerformance {
  product_id: string;
  name: string;
  current_price: number;
  recommended_price?: number;
  competitor_count?: number;
  min_competitor_price?: number;
  max_competitor_price?: number;
  avg_competitor_price?: number;
  market_position: 'leader' | 'competitive' | 'expensive' | 'optimal' | 'no_data';
  performance_score: number; // 0-100
  optimization_potential: 'high' | 'medium' | 'low' | 'unknown';
  recommendations: string[];
}

interface StrategyPerformanceReport {
  strategy_id: string;
  analysis_date: string;
  total_products: number;
  avg_performance_score: number;
  position_distribution: {
    leader: number;
    competitive: number;
    expensive: number;
    no_data: number;
  };
  optimization_distribution: {
    high: number;
    medium: number;
    low: number;
    unknown: number;
  };
  top_performers: ProductPerformance[];
  underperformers: ProductPerformance[];
  overall_recommendations: string[];
}
```

---

## 📈 KPI и метрики эффективности

### Основные показатели управления товарами
- **Покрытие товаров**: % товаров в активных стратегиях от общего каталога
- **Эффективность мониторинга**: % товаров с актуальными данными о конкурентах
- **Скорость обработки**: Среднее время добавления/удаления товаров
- **Качество данных**: % товаров с полной информацией о конкурентах

### Метрики конкурентного анализа
- **Конкурентная позиция**: Распределение товаров по ценовым позициям
- **Ценовая эластичность**: Реакция продаж на изменение цены
- **Частота обновления**: Периодичность изменения цен конкурентами
- **Рыночная доля**: Позиция по цене относительно конкурентов

---

## ⚠️ Рекомендации и лучшие практики

### Управление товарами
1. **Батчевая обработка**: Используйте батчи до 50 товаров для оптимальной производительности
2. **Обработка ошибок**: Всегда проверяйте `failed_products` в ответах API
3. **Мониторинг статуса**: Регулярно проверяйте статус товаров в стратегиях
4. **Пагинация**: Используйте пагинацию для больших списков товаров

### Анализ конкурентов
1. **Регулярное обновление**: Настройте автоматическое обновление данных о конкурентах
2. **Качество данных**: Фильтруйте конкурентов по релевантности и качеству данных
3. **Исторический анализ**: Ведите историю изменения цен для трендового анализа
4. **Сегментация**: Группируйте товары по категориям для более точного анализа

### Оптимизация производительности
1. **Кэширование**: Кэшируйте данные о конкурентах для частых запросов
2. **Параллельная обработка**: Обрабатывайте товары параллельно с учётом лимитов API
3. **Rate Limiting**: Соблюдайте лимиты API для предотвращения блокировок
4. **Мониторинг**: Отслеживайте производительность и ошибки операций

---

## 🔄 Интеграция с другими модулями

### Связь с Pricing Strategy Management
- Товары добавляются в стратегии, созданные через методы управления
- Статус стратегии влияет на возможность добавления/удаления товаров
- Настройки стратегии определяют логику ценообразования для товаров

### Связь с Analytics API
- Данные о товарах в стратегиях используются для аналитических отчётов
- Метрики эффективности стратегий строятся на основе данных о товарах
- Исторические данные о ценах используются для прогнозирования

### Связь с Product API
- Информация о товарах (название, SKU, категория) берётся из Product API
- Текущие цены и остатки синхронизируются с данными товаров
- Характеристики товаров используются для группировки в стратегии