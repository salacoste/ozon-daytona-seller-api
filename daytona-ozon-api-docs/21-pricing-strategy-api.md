# Pricing Strategy API Documentation

## Overview

Pricing Strategy API предоставляет инструменты для создания и управления автоматизированными стратегиями ценообразования на OZON. API включает **12 методов** для динамического управления ценами на основе конкуренции, рыночных условий и пользовательских настроек.

### Key Features

- 🎯 **Стратегии ценообразования** - создание и управление различными типами стратегий
- 🏪 **Анализ конкурентов** - мониторинг цен конкурентов и реакция на изменения
- 📊 **Автоматизация** - автоматическое изменение цен по заданным правилам
- 🔄 **Гибкие настройки** - индивидуальные параметры для каждого товара
- 📈 **Оптимизация прибыли** - максимизация доходности при сохранении конкурентоспособности
- ⏱️ **Мониторинг в реальном времени** - отслеживание эффективности стратегий

## Available Methods

### Strategy Management Methods

#### createStrategy()
Создает новую стратегию ценообразования с настраиваемыми параметрами.

```typescript
const strategy = await pricingStrategyApi.createStrategy({
  name: 'Конкурентная стратегия Electronics',
  description: 'Автоматическое ценообразование для электроники',
  strategy_type: 'COMPETITIVE',
  settings: {
    margin_min: 0.10, // Минимальная маржа 10%
    margin_max: 0.25, // Максимальная маржа 25%
    update_frequency: 'hourly',
    competitor_analysis_depth: 'deep',
    price_adjustment_speed: 'medium'
  }
});

console.log(`Стратегия создана с ID: ${strategy.result?.strategy_id}`);
```

#### getStrategiesList()
Получает список всех созданных стратегий ценообразования.

```typescript
const strategies = await pricingStrategyApi.getStrategiesList({
  limit: 50,
  offset: 0,
  filter: {
    status: 'active',
    strategy_type: 'COMPETITIVE'
  }
});

strategies.strategies?.forEach(strategy => {
  console.log(`📈 ${strategy.name} (${strategy.status})`);
  console.log(`   Описание: ${strategy.description}`);
  console.log(`   Товаров: ${strategy.products_count || 0}`);
  console.log(`   Создана: ${new Date(strategy.created_at).toLocaleDateString()}`);
});
```

#### getStrategyInfo()
Получает подробную информацию о конкретной стратегии.

```typescript
const strategyInfo = await pricingStrategyApi.getStrategyInfo({
  strategy_id: 'strategy_123'
});

console.log(`🎯 Стратегия: ${strategyInfo.strategy?.name}`);
console.log(`📊 Статус: ${strategyInfo.strategy?.status}`);
console.log(`⚙️ Настройки:`, strategyInfo.strategy?.settings);
console.log(`📈 Статистика:`, strategyInfo.strategy?.performance_stats);
```

#### updateStrategy()
Обновляет параметры существующей стратегии.

```typescript
await pricingStrategyApi.updateStrategy({
  strategy_id: 'strategy_123',
  name: 'Обновлённая стратегия Electronics',
  description: 'Улучшенная стратегия с новыми параметрами',
  settings: {
    margin_min: 0.12,
    margin_max: 0.30,
    update_frequency: 'every_30_minutes'
  }
});

console.log('✅ Стратегия обновлена');
```

#### deleteStrategy()
Удаляет стратегию ценообразования (кроме системных).

```typescript
await pricingStrategyApi.deleteStrategy({
  strategy_id: 'strategy_123'
});

console.log('🗑️ Стратегия удалена');
```

### Product Management Methods

#### addItemsToStrategy()
Добавляет товары в существующую стратегию с индивидуальными настройками.

```typescript
const result = await pricingStrategyApi.addItemsToStrategy({
  strategy_id: 'strategy_123',
  items: [
    {
      sku: '123456789',
      settings: {
        min_price: 1000,
        max_price: 5000,
        target_margin: 0.20,
        priority: 'high'
      }
    },
    {
      sku: '987654321',
      settings: {
        min_price: 500,
        max_price: 2000,
        target_margin: 0.15,
        priority: 'medium'
      }
    }
  ]
});

console.log(`✅ Добавлено товаров: ${result.added_count || 0}`);
console.log(`❌ Ошибок: ${result.errors?.length || 0}`);
```

#### getStrategyItems()
Получает список всех товаров в стратегии с их настройками.

```typescript
const items = await pricingStrategyApi.getStrategyItems({
  strategy_id: 'strategy_123',
  limit: 100,
  offset: 0
});

items.items?.forEach(item => {
  console.log(`📦 SKU: ${item.sku}`);
  console.log(`   Текущая цена: ${item.current_price}₽`);
  console.log(`   Цена конкурентов: ${item.competitor_min_price}-${item.competitor_max_price}₽`);
  console.log(`   Статус: ${item.status}`);
  console.log(`   Последнее обновление: ${new Date(item.last_updated).toLocaleString()}`);
});
```

#### removeItemsFromStrategy()
Удаляет товары из стратегии ценообразования.

```typescript
const result = await pricingStrategyApi.removeItemsFromStrategy({
  strategy_id: 'strategy_123',
  sku_list: ['123456789', '987654321']
});

console.log(`🗑️ Удалено товаров: ${result.removed_count || 0}`);
```

#### getStrategyIDsByItemIDs()
Находит стратегии, к которым привязаны указанные товары.

```typescript
const strategiesByItems = await pricingStrategyApi.getStrategyIDsByItemIDs({
  product_ids: ['123456789', '987654321']
});

strategiesByItems.items?.forEach(item => {
  console.log(`📦 Товар ${item.product_id}: стратегии [${item.strategy_ids?.join(', ')}]`);
});
```

### Competition Analysis Methods

#### getCompetitors()
Получает список конкурентов и их цены для указанных товаров.

```typescript
const competitors = await pricingStrategyApi.getCompetitors({
  sku: ['123456789', '987654321'],
  limit: 20,
  include_details: true
});

competitors.competitors?.forEach(competitor => {
  console.log(`🏪 ${competitor.store_name}`);
  console.log(`   Товар: ${competitor.product_name}`);
  console.log(`   Цена: ${competitor.price} ${competitor.currency}`);
  console.log(`   Рейтинг: ${competitor.rating}/5 (${competitor.reviews_count} отзывов)`);
  console.log(`   Ссылка: ${competitor.url}`);
});
```

#### getStrategyItemInfo()
Получает детальную информацию о товаре в стратегии, включая цены конкурентов.

```typescript
const itemInfo = await pricingStrategyApi.getStrategyItemInfo({
  strategy_id: 'strategy_123',
  sku: '123456789'
});

console.log(`📊 Анализ товара SKU: ${itemInfo.sku}`);
console.log(`💰 Ваша цена: ${itemInfo.current_price}₽`);
console.log(`🏪 Конкуренты:`);
itemInfo.competitors?.forEach(competitor => {
  console.log(`   ${competitor.store_name}: ${competitor.price}₽`);
});
console.log(`📈 Рекомендация: ${itemInfo.recommended_price}₽`);
console.log(`📊 Прогнозируемая маржа: ${itemInfo.predicted_margin}%`);
```

### Strategy Control Methods

#### updateStrategyStatus()
Изменяет статус стратегии (активна/неактивна).

```typescript
await pricingStrategyApi.updateStrategyStatus({
  strategy_id: 'strategy_123',
  status: 'active' // 'active' | 'inactive' | 'paused'
});

console.log('✅ Статус стратегии изменён');
```

## TypeScript Interfaces

### Request Types

```typescript
interface CreatePricingStrategyRequest {
  name: string;
  description?: string;
  strategy_type: StrategyType;
  settings?: StrategySettings;
}

interface StrategyType {
  type: 'COMPETITIVE' | 'MARGIN_BASED' | 'DYNAMIC' | 'PREMIUM_PRICING' | 'MARKET_PENETRATION';
}

interface StrategySettings {
  margin_min?: number;
  margin_max?: number;
  update_frequency?: 'hourly' | 'daily' | 'every_30_minutes' | 'real_time';
  competitor_analysis_depth?: 'basic' | 'deep' | 'comprehensive';
  price_adjustment_speed?: 'slow' | 'medium' | 'fast' | 'aggressive';
  max_price_change_percent?: number;
  competitor_count_limit?: number;
}

interface AddStrategyItemsRequest {
  strategy_id: string;
  items: StrategyItem[];
}

interface StrategyItem {
  sku: string;
  settings?: ItemSettings;
}

interface ItemSettings {
  min_price?: number;
  max_price?: number;
  target_margin?: number;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  custom_rules?: CustomPricingRule[];
}

interface CustomPricingRule {
  condition: string;
  action: string;
  value: number;
}

interface GetCompetitorsRequest {
  sku: string[];
  limit?: number;
  include_details?: boolean;
  competitor_types?: string[];
}

interface GetStrategyListRequest {
  limit?: number;
  offset?: number;
  filter?: StrategyFilter;
}

interface StrategyFilter {
  status?: 'active' | 'inactive' | 'paused';
  strategy_type?: string;
  created_after?: string;
}
```

### Response Types

```typescript
interface CreatePricingStrategyResponse {
  result?: {
    strategy_id: string;
    status: string;
  };
}

interface GetStrategyListResponse {
  strategies?: PricingStrategy[];
  total_count?: number;
  has_next?: boolean;
}

interface PricingStrategy {
  strategy_id: string;
  name: string;
  description?: string;
  status: 'active' | 'inactive' | 'paused';
  strategy_type: string;
  settings?: StrategySettings;
  products_count?: number;
  created_at: string;
  updated_at?: string;
  performance_stats?: PerformanceStats;
}

interface PerformanceStats {
  total_revenue_change?: number;
  avg_margin_improvement?: number;
  price_updates_count?: number;
  competitor_beat_rate?: number;
}

interface GetCompetitorsResponse {
  competitors?: Competitor[];
  total_found?: number;
}

interface Competitor {
  store_name: string;
  product_name: string;
  price: number;
  currency: string;
  rating?: number;
  reviews_count?: number;
  url?: string;
  availability?: 'in_stock' | 'out_of_stock' | 'limited';
  shipping_cost?: number;
  last_updated?: string;
}

interface GetStrategyItemsResponse {
  items?: StrategyItemInfo[];
  total_count?: number;
  has_next?: boolean;
}

interface StrategyItemInfo {
  sku: string;
  current_price: number;
  competitor_min_price?: number;
  competitor_max_price?: number;
  recommended_price?: number;
  status: 'active' | 'inactive' | 'error';
  last_updated: string;
  settings?: ItemSettings;
  performance?: ItemPerformance;
}

interface ItemPerformance {
  revenue_change?: number;
  margin_change?: number;
  sales_volume_change?: number;
  competitor_position?: number;
}
```

## Usage Examples

### Basic Strategy Setup

```typescript
import { OzonApi } from 'bmad-ozon-seller-api';

const ozonApi = new OzonApi({
  clientId: 'your-client-id',
  apiKey: 'your-api-key'
});

// Создание комплексной конкурентной стратегии
async function setupCompetitiveStrategy() {
  try {
    // 1. Создать стратегию
    const strategy = await ozonApi.pricingStrategy.createStrategy({
      name: 'Aggressive Electronics Strategy',
      description: 'Агрессивная стратегия для электроники с быстрой реакцией на конкурентов',
      strategy_type: 'COMPETITIVE',
      settings: {
        margin_min: 0.08,
        margin_max: 0.22,
        update_frequency: 'every_30_minutes',
        competitor_analysis_depth: 'comprehensive',
        price_adjustment_speed: 'fast',
        max_price_change_percent: 0.15,
        competitor_count_limit: 10
      }
    });
    
    if (!strategy.result?.strategy_id) {
      throw new Error('Не удалось создать стратегию');
    }
    
    const strategyId = strategy.result.strategy_id;
    console.log(`✅ Стратегия создана: ${strategyId}`);
    
    // 2. Добавить товары с индивидуальными настройками
    const products = [
      {
        sku: 'SMARTPHONE_PREMIUM',
        settings: {
          min_price: 50000,
          max_price: 150000,
          target_margin: 0.18,
          priority: 'high'
        }
      },
      {
        sku: 'LAPTOP_GAMING',
        settings: {
          min_price: 80000,
          max_price: 200000,
          target_margin: 0.15,
          priority: 'high'
        }
      },
      {
        sku: 'HEADPHONES_WIRELESS',
        settings: {
          min_price: 5000,
          max_price: 25000,
          target_margin: 0.20,
          priority: 'medium'
        }
      }
    ];
    
    const addResult = await ozonApi.pricingStrategy.addItemsToStrategy({
      strategy_id: strategyId,
      items: products
    });
    
    console.log(`✅ Добавлено товаров: ${addResult.added_count || 0}`);
    
    // 3. Активировать стратегию
    await ozonApi.pricingStrategy.updateStrategyStatus({
      strategy_id: strategyId,
      status: 'active'
    });
    
    console.log('🚀 Стратегия активирована');
    
    return strategyId;
  } catch (error) {
    console.error('❌ Ошибка настройки стратегии:', error);
    throw error;
  }
}

// Использование
const strategyId = await setupCompetitiveStrategy();
```

### Advanced Competition Analysis

```typescript
// Комплексный анализ конкурентной среды
async function performCompetitionAnalysis(skus: string[]) {
  try {
    // Получить детальную информацию о конкурентах
    const competitors = await ozonApi.pricingStrategy.getCompetitors({
      sku: skus,
      limit: 50,
      include_details: true,
      competitor_types: ['marketplace', 'direct_seller', 'retailer']
    });
    
    console.log('🔍 АНАЛИЗ КОНКУРЕНТНОЙ СРЕДЫ');
    console.log('============================');
    
    const analysis: Record<string, any> = {};
    
    // Группировать конкурентов по SKU
    competitors.competitors?.forEach(competitor => {
      const sku = competitor.sku || 'unknown';
      if (!analysis[sku]) {
        analysis[sku] = {
          competitors: [],
          minPrice: Infinity,
          maxPrice: 0,
          avgPrice: 0,
          totalCompetitors: 0
        };
      }
      
      analysis[sku].competitors.push(competitor);
      analysis[sku].minPrice = Math.min(analysis[sku].minPrice, competitor.price);
      analysis[sku].maxPrice = Math.max(analysis[sku].maxPrice, competitor.price);
      analysis[sku].totalCompetitors++;
    });
    
    // Вычислить средние цены и провести анализ
    Object.entries(analysis).forEach(([sku, data]: [string, any]) => {
      data.avgPrice = data.competitors.reduce((sum: number, c: any) => sum + c.price, 0) / data.totalCompetitors;
      
      console.log(`\n📦 SKU: ${sku}`);
      console.log(`🏪 Конкурентов: ${data.totalCompetitors}`);
      console.log(`💰 Диапазон цен: ${data.minPrice.toLocaleString()} - ${data.maxPrice.toLocaleString()}₽`);
      console.log(`📊 Средняя цена: ${data.avgPrice.toLocaleString()}₽`);
      console.log(`📈 Разброс: ${((data.maxPrice - data.minPrice) / data.avgPrice * 100).toFixed(1)}%`);
      
      // Топ-3 самых дешёвых конкурента
      const topCompetitors = data.competitors
        .sort((a: any, b: any) => a.price - b.price)
        .slice(0, 3);
      
      console.log('🎯 Топ-3 конкурента по цене:');
      topCompetitors.forEach((competitor: any, index: number) => {
        console.log(`   ${index + 1}. ${competitor.store_name}: ${competitor.price.toLocaleString()}₽ (⭐${competitor.rating || 'N/A'})`);
      });
    });
    
    return analysis;
  } catch (error) {
    console.error('❌ Ошибка анализа конкуренции:', error);
    throw error;
  }
}

// Использование
const competitionAnalysis = await performCompetitionAnalysis([
  'SMARTPHONE_PREMIUM',
  'LAPTOP_GAMING',
  'HEADPHONES_WIRELESS'
]);
```

## Complex Scenarios

### Automated Strategy Management System

Система автоматического управления стратегиями ценообразования:

```typescript
class PricingStrategyManager {
  constructor(private ozonApi: OzonApi) {}
  
  /**
   * Создание и оптимизация стратегий по категориям товаров
   */
  async createCategoryBasedStrategies(categories: CategoryStrategy[]) {
    const results: StrategyResult[] = [];
    
    for (const category of categories) {
      try {
        // Создать стратегию для категории
        const strategy = await this.ozonApi.pricingStrategy.createStrategy({
          name: `${category.name} Auto Strategy`,
          description: category.description,
          strategy_type: category.strategyType,
          settings: category.settings
        });
        
        if (!strategy.result?.strategy_id) {
          throw new Error(`Не удалось создать стратегию для ${category.name}`);
        }
        
        const strategyId = strategy.result.strategy_id;
        
        // Добавить товары в стратегию
        if (category.products.length > 0) {
          const addResult = await this.ozonApi.pricingStrategy.addItemsToStrategy({
            strategy_id: strategyId,
            items: category.products
          });
          
          console.log(`📦 ${category.name}: добавлено ${addResult.added_count || 0} товаров`);
        }
        
        // Активировать стратегию
        await this.ozonApi.pricingStrategy.updateStrategyStatus({
          strategy_id: strategyId,
          status: 'active'
        });
        
        results.push({
          category: category.name,
          strategyId,
          status: 'success',
          productsAdded: category.products.length
        });
        
        console.log(`✅ Стратегия для ${category.name} создана и активирована`);
        
        // Задержка между создания стратегий
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        results.push({
          category: category.name,
          status: 'failed',
          error: error.message
        });
        
        console.error(`❌ Ошибка создания стратегии для ${category.name}:`, error);
      }
    }
    
    return results;
  }
  
  /**
   * Мониторинг и оптимизация существующих стратегий
   */
  async monitorAndOptimizeStrategies() {
    try {
      // Получить список всех активных стратегий
      const strategies = await this.ozonApi.pricingStrategy.getStrategiesList({
        filter: { status: 'active' },
        limit: 100
      });
      
      const optimizations: OptimizationResult[] = [];
      
      for (const strategy of strategies.strategies || []) {
        console.log(`🔍 Анализ стратегии: ${strategy.name}`);
        
        // Получить товары в стратегии
        const items = await this.ozonApi.pricingStrategy.getStrategyItems({
          strategy_id: strategy.strategy_id,
          limit: 1000
        });
        
        // Анализировать производительность каждого товара
        const itemAnalysis = await this.analyzeStrategyItems(items.items || []);
        
        // Определить необходимые оптимизации
        const optimizationNeeded = this.identifyOptimizations(strategy, itemAnalysis);
        
        if (optimizationNeeded.length > 0) {
          // Применить оптимизации
          const result = await this.applyOptimizations(strategy.strategy_id, optimizationNeeded);
          optimizations.push(result);
          
          console.log(`🔧 Применено оптимизаций: ${optimizationNeeded.length}`);
        } else {
          console.log(`✅ Стратегия ${strategy.name} работает оптимально`);
        }
      }
      
      return optimizations;
    } catch (error) {
      console.error('❌ Ошибка мониторинга стратегий:', error);
      throw error;
    }
  }
  
  /**
   * Автоматическое реагирование на изменения рынка
   */
  async respondToMarketChanges(marketConditions: MarketCondition[]) {
    const responses: MarketResponse[] = [];
    
    for (const condition of marketConditions) {
      try {
        console.log(`📈 Реагирование на рыночное условие: ${condition.type}`);
        
        // Найти стратегии, затронутые изменением
        const affectedStrategies = await this.findAffectedStrategies(condition);
        
        for (const strategyId of affectedStrategies) {
          // Получить информацию о стратегии
          const strategyInfo = await this.ozonApi.pricingStrategy.getStrategyInfo({
            strategy_id: strategyId
          });
          
          if (!strategyInfo.strategy) continue;
          
          // Определить необходимые изменения
          const adjustments = this.calculateMarketAdjustments(condition, strategyInfo.strategy);
          
          if (adjustments.updateSettings) {
            // Обновить настройки стратегии
            await this.ozonApi.pricingStrategy.updateStrategy({
              strategy_id: strategyId,
              settings: adjustments.newSettings
            });
          }
          
          if (adjustments.statusChange) {
            // Изменить статус стратегии при необходимости
            await this.ozonApi.pricingStrategy.updateStrategyStatus({
              strategy_id: strategyId,
              status: adjustments.newStatus
            });
          }
          
          responses.push({
            condition: condition.type,
            strategyId,
            adjustments: adjustments.changes,
            result: 'applied'
          });
          
          console.log(`🔄 Стратегия ${strategyId} адаптирована к условию ${condition.type}`);
        }
      } catch (error) {
        responses.push({
          condition: condition.type,
          result: 'failed',
          error: error.message
        });
        
        console.error(`❌ Ошибка реагирования на ${condition.type}:`, error);
      }
    }
    
    return responses;
  }
  
  /**
   * Генерация отчётов по эффективности стратегий
   */
  async generatePerformanceReport() {
    try {
      const strategies = await this.ozonApi.pricingStrategy.getStrategiesList({
        limit: 100
      });
      
      const report: PerformanceReport = {
        generated_at: new Date().toISOString(),
        total_strategies: strategies.strategies?.length || 0,
        active_strategies: 0,
        inactive_strategies: 0,
        performance_summary: {
          total_revenue_impact: 0,
          avg_margin_improvement: 0,
          best_performing_strategy: null,
          worst_performing_strategy: null
        },
        strategy_details: []
      };
      
      for (const strategy of strategies.strategies || []) {
        if (strategy.status === 'active') {
          report.active_strategies++;
        } else {
          report.inactive_strategies++;
        }
        
        // Получить детали производительности
        const items = await this.ozonApi.pricingStrategy.getStrategyItems({
          strategy_id: strategy.strategy_id,
          limit: 1000
        });
        
        const strategyPerformance = this.calculateStrategyPerformance(strategy, items.items || []);
        report.strategy_details.push(strategyPerformance);
        
        // Обновить общую статистику
        if (strategyPerformance.revenue_impact) {
          report.performance_summary.total_revenue_impact += strategyPerformance.revenue_impact;
        }
      }
      
      // Найти лучшую и худшую стратегии
      if (report.strategy_details.length > 0) {
        report.performance_summary.best_performing_strategy = report.strategy_details
          .reduce((best, current) => 
            (current.efficiency_score || 0) > (best.efficiency_score || 0) ? current : best
          );
        
        report.performance_summary.worst_performing_strategy = report.strategy_details
          .reduce((worst, current) => 
            (current.efficiency_score || 0) < (worst.efficiency_score || 0) ? current : worst
          );
        
        report.performance_summary.avg_margin_improvement = 
          report.strategy_details.reduce((sum, s) => sum + (s.avg_margin_improvement || 0), 0) / 
          report.strategy_details.length;
      }
      
      console.log('📊 ОТЧЁТ ПО ЭФФЕКТИВНОСТИ СТРАТЕГИЙ');
      console.log('=====================================');
      console.log(`📈 Всего стратегий: ${report.total_strategies}`);
      console.log(`🟢 Активных: ${report.active_strategies}`);
      console.log(`🔴 Неактивных: ${report.inactive_strategies}`);
      console.log(`💰 Общее влияние на выручку: ${report.performance_summary.total_revenue_impact?.toLocaleString()}₽`);
      console.log(`📊 Среднее улучшение маржи: ${report.performance_summary.avg_margin_improvement?.toFixed(2)}%`);
      
      if (report.performance_summary.best_performing_strategy) {
        console.log(`🏆 Лучшая стратегия: ${report.performance_summary.best_performing_strategy.strategy_name}`);
      }
      
      return report;
    } catch (error) {
      console.error('❌ Ошибка генерации отчёта:', error);
      throw error;
    }
  }
  
  private async analyzeStrategyItems(items: StrategyItemInfo[]) {
    return items.map(item => ({
      sku: item.sku,
      performance_score: this.calculateItemPerformanceScore(item),
      needs_optimization: this.itemNeedsOptimization(item),
      suggested_changes: this.suggestItemChanges(item)
    }));
  }
  
  private identifyOptimizations(strategy: PricingStrategy, itemAnalysis: any[]) {
    const optimizations: Optimization[] = [];
    
    // Анализ общей производительности стратегии
    const lowPerformingItems = itemAnalysis.filter(item => item.performance_score < 0.6);
    
    if (lowPerformingItems.length > itemAnalysis.length * 0.3) {
      optimizations.push({
        type: 'strategy_settings_adjustment',
        reason: 'Более 30% товаров показывают низкую производительность',
        action: 'adjust_aggressiveness'
      });
    }
    
    // Проверка частоты обновлений
    if (strategy.settings?.update_frequency === 'hourly' && itemAnalysis.length > 100) {
      optimizations.push({
        type: 'update_frequency_optimization',
        reason: 'Слишком частые обновления для большого количества товаров',
        action: 'reduce_frequency'
      });
    }
    
    return optimizations;
  }
  
  private async applyOptimizations(strategyId: string, optimizations: Optimization[]) {
    // Здесь была бы логика применения оптимизаций
    return {
      strategyId,
      optimizations: optimizations.length,
      success: true
    };
  }
  
  private async findAffectedStrategies(condition: MarketCondition): Promise<string[]> {
    // Логика поиска стратегий, затронутых рыночными условиями
    return [];
  }
  
  private calculateMarketAdjustments(condition: MarketCondition, strategy: PricingStrategy) {
    // Логика расчёта необходимых корректировок
    return {
      updateSettings: false,
      statusChange: false,
      newSettings: {},
      newStatus: 'active' as const,
      changes: []
    };
  }
  
  private calculateItemPerformanceScore(item: StrategyItemInfo): number {
    // Алгоритм расчёта оценки производительности товара
    let score = 0.5;
    
    if (item.performance?.revenue_change) {
      score += Math.min(item.performance.revenue_change / 100, 0.3);
    }
    
    if (item.performance?.margin_change) {
      score += Math.min(item.performance.margin_change / 50, 0.2);
    }
    
    return Math.max(0, Math.min(1, score));
  }
  
  private itemNeedsOptimization(item: StrategyItemInfo): boolean {
    return this.calculateItemPerformanceScore(item) < 0.6;
  }
  
  private suggestItemChanges(item: StrategyItemInfo): string[] {
    const suggestions: string[] = [];
    
    if (item.current_price < (item.competitor_min_price || 0)) {
      suggestions.push('Рассмотреть повышение цены');
    }
    
    if (item.performance?.margin_change && item.performance.margin_change < 0) {
      suggestions.push('Пересмотреть целевую маржу');
    }
    
    return suggestions;
  }
  
  private calculateStrategyPerformance(strategy: PricingStrategy, items: StrategyItemInfo[]) {
    return {
      strategy_id: strategy.strategy_id,
      strategy_name: strategy.name,
      items_count: items.length,
      efficiency_score: items.reduce((sum, item) => sum + this.calculateItemPerformanceScore(item), 0) / items.length,
      revenue_impact: strategy.performance_stats?.total_revenue_change || 0,
      avg_margin_improvement: strategy.performance_stats?.avg_margin_improvement || 0
    };
  }
}

// Интерфейсы для системы управления
interface CategoryStrategy {
  name: string;
  description: string;
  strategyType: StrategyType;
  settings: StrategySettings;
  products: StrategyItem[];
}

interface StrategyResult {
  category: string;
  strategyId?: string;
  status: 'success' | 'failed';
  productsAdded?: number;
  error?: string;
}

interface OptimizationResult {
  strategyId: string;
  optimizations: number;
  success: boolean;
}

interface MarketCondition {
  type: 'competitor_price_drop' | 'demand_increase' | 'supply_shortage' | 'seasonal_change';
  severity: 'low' | 'medium' | 'high';
  affected_categories: string[];
  data: Record<string, any>;
}

interface MarketResponse {
  condition: string;
  strategyId?: string;
  adjustments?: string[];
  result: 'applied' | 'failed';
  error?: string;
}

interface Optimization {
  type: string;
  reason: string;
  action: string;
}

interface PerformanceReport {
  generated_at: string;
  total_strategies: number;
  active_strategies: number;
  inactive_strategies: number;
  performance_summary: {
    total_revenue_impact: number;
    avg_margin_improvement: number;
    best_performing_strategy: any;
    worst_performing_strategy: any;
  };
  strategy_details: any[];
}

// Использование системы управления стратегиями
const strategyManager = new PricingStrategyManager(ozonApi);

// Создание стратегий по категориям
const categoryStrategies: CategoryStrategy[] = [
  {
    name: 'Electronics',
    description: 'Высокотехнологичные товары с быстрой сменой цен',
    strategyType: 'COMPETITIVE',
    settings: {
      margin_min: 0.08,
      margin_max: 0.20,
      update_frequency: 'every_30_minutes',
      price_adjustment_speed: 'fast'
    },
    products: [
      { sku: 'SMARTPHONE_001' },
      { sku: 'LAPTOP_002' },
      { sku: 'TABLET_003' }
    ]
  },
  {
    name: 'Fashion',
    description: 'Одежда и аксессуары с сезонными колебаниями',
    strategyType: 'DYNAMIC',
    settings: {
      margin_min: 0.15,
      margin_max: 0.40,
      update_frequency: 'daily',
      price_adjustment_speed: 'medium'
    },
    products: [
      { sku: 'DRESS_001' },
      { sku: 'SHOES_002' },
      { sku: 'BAG_003' }
    ]
  }
];

const strategyResults = await strategyManager.createCategoryBasedStrategies(categoryStrategies);

// Мониторинг и оптимизация
const optimizations = await strategyManager.monitorAndOptimizeStrategies();

// Генерация отчёта
const performanceReport = await strategyManager.generatePerformanceReport();
```

## Error Handling

```typescript
// Обработка ошибок стратегий ценообразования
async function safePricingStrategyOperations() {
  try {
    const strategy = await ozonApi.pricingStrategy.createStrategy({
      name: 'Test Strategy',
      strategy_type: 'COMPETITIVE'
    });
    
    return strategy;
  } catch (error) {
    if (error.code === 'STRATEGY_LIMIT_EXCEEDED') {
      console.error('❌ Превышен лимит количества стратегий');
    } else if (error.code === 'INVALID_STRATEGY_TYPE') {
      console.error('❌ Неверный тип стратегии');
    } else if (error.code === 'INSUFFICIENT_PERMISSIONS') {
      console.error('❌ Недостаточно прав для создания стратегии');
    } else if (error.code === 'PRODUCT_ALREADY_IN_STRATEGY') {
      console.error('❌ Товар уже находится в другой стратегии');
    } else if (error.code === 'STRATEGY_NOT_FOUND') {
      console.error('❌ Стратегия не найдена');
    } else if (error.code === 'SYSTEM_STRATEGY_MODIFICATION') {
      console.error('❌ Системные стратегии нельзя изменять');
    } else {
      console.error('❌ Неожиданная ошибка:', error);
    }
    
    throw error;
  }
}
```

## Best Practices

### 1. Дизайн стратегий
```typescript
const strategyDesignBestPractices = {
  // Начинайте с консервативных настроек
  startConservative: {
    margin_min: 0.10,
    price_adjustment_speed: 'medium',
    max_price_change_percent: 0.10
  },
  
  // Тестируйте на малом количестве товаров
  testFirst: true,
  initialProductCount: 10,
  
  // Мониторьте производительность
  monitoringInterval: 'daily',
  
  // Группируйте товары по характеристикам
  groupSimilarProducts: true
};
```

### 2. Управление рисками
```typescript
const riskManagementBestPractices = {
  // Устанавливайте лимиты изменения цен
  maxPriceChange: 0.15, // 15%
  
  // Устанавливайте минимальные маржи
  minMarginSafety: 0.08, // 8%
  
  // Мониторьте конкурентов
  competitorMonitoring: true,
  maxCompetitors: 10,
  
  // Создавайте резервные стратегии
  backupStrategies: true
};
```

### 3. Оптимизация производительности
```typescript
const performanceOptimization = {
  // Оптимальная частота обновлений
  updateFrequency: {
    highVolume: 'hourly',      // >1000 товаров
    mediumVolume: 'every_30_minutes', // 100-1000 товаров
    lowVolume: 'every_15_minutes'     // <100 товаров
  },
  
  // Пакетная обработка
  batchSize: 50,
  
  // Кэширование результатов
  cacheCompetitorData: true,
  cacheTimeout: 1800, // 30 минут
  
  // Приоритизация товаров
  priorityLevels: ['critical', 'high', 'medium', 'low']
};
```

## Integration Notes

- **Strategy Types**: Поддерживаются различные типы стратегий (конкурентная, на основе маржи, динамическая)
- **Real-time Updates**: Возможность обновления цен в реальном времени
- **Multi-marketplace**: Анализ конкурентов из различных источников
- **Custom Rules**: Поддержка пользовательских правил ценообразования
- **Performance Tracking**: Детальная аналитика эффективности стратегий
- **Automated Optimization**: Автоматическая оптимизация на основе производительности
- **Risk Management**: Встроенные механизмы управления рисками
- **Scalability**: Поддержка большого количества товаров и стратегий

Pricing Strategy API предоставляет мощные инструменты для автоматизации ценообразования и оптимизации прибыльности, позволяя создавать сложные системы динамического управления ценами.