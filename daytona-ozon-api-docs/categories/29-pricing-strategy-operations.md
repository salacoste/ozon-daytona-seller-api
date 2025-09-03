# Дополнительные операции со стратегиями

**3 метода** — дополнительные операции управления стратегиями ценообразования на платформе OZON

## 📊 Обзор методов API

### ⚙️ Дополнительные операции (3 метода)
1. **updateStrategyStatus()** — Изменение статуса стратегии (активная/неактивная)
2. **getStrategyIDsByItemIDs()** — Поиск стратегий по товарам
3. **[Резерв для будущего расширения]** — Планируемый функционал

---

## 📋 Полная типизация интерфейсов

### Request Types

```typescript
/**
 * Запрос изменения статуса стратегии
 * Request for updating strategy status
 */
interface UpdateStatusStrategyRequest {
  /** Идентификатор стратегии */
  strategy_id: string;
  /** 
   * Статус стратегии:
   * - true — включена
   * - false — отключена
   */
  enabled?: boolean;
}

/**
 * Запрос поиска стратегий по товарам
 * Request for finding strategies by product IDs
 */
interface GetStrategyIDsByItemIDsRequest {
  /** Список идентификаторов товаров для поиска связанных стратегий */
  product_ids: string[];
  /** Фильтр по статусу стратегий */
  status_filter?: 'active' | 'inactive' | 'all';
  /** Включать системные стратегии в результат */
  include_system?: boolean;
}
```

### Response Types

```typescript
/**
 * Результат изменения статуса стратегии
 * Result of strategy status update
 */
interface UpdateStatusStrategyResponse {
  /** Пустой результат при успешном выполнении */
  result: EmptyResult;
}

interface EmptyResult {
  /** Статус операции */
  status: 'ok';
  /** Дополнительная информация об операции */
  message?: string;
}

/**
 * Результат поиска стратегий по товарам
 * Result of finding strategies by product IDs
 */
interface GetStrategyIDsByItemIDsResponse {
  result: StrategyIDsByItemIDsResult;
}

interface StrategyIDsByItemIDsResult {
  /** Маппинг товаров к их стратегиям */
  product_strategy_mapping: ProductStrategyMapping[];
  /** Общее количество найденных связей */
  total_mappings: number;
  /** Количество товаров без стратегий */
  products_without_strategies: number;
}
```

### Supporting Types

```typescript
/**
 * Связь товара со стратегиями
 * Product to strategy mapping
 */
interface ProductStrategyMapping {
  /** Идентификатор товара */
  product_id: string;
  /** Список стратегий, к которым привязан товар */
  strategy_ids: StrategyReference[];
  /** Основная (приоритетная) стратегия для товара */
  primary_strategy_id?: string;
  /** Дата последнего обновления связи */
  last_updated: string;
}

/**
 * Ссылка на стратегию с дополнительной информацией
 * Strategy reference with additional info
 */
interface StrategyReference {
  /** Идентификатор стратегии */
  strategy_id: string;
  /** Название стратегии */
  strategy_name: string;
  /** Тип стратегии */
  strategy_type: 'COMPETITIVE' | 'PREMIUM_PRICING' | 'DYNAMIC_MARGIN' | 'MARKET_LEADER' | 'VALUE_BASED';
  /** Статус стратегии */
  status: 'ACTIVE' | 'INACTIVE' | 'DRAFT' | 'SYSTEM';
  /** Является ли системной стратегией */
  is_system: boolean;
  /** Дата добавления товара в стратегию */
  added_date: string;
  /** Приоритет стратегии для товара (1-100) */
  priority?: number;
}

/**
 * Расширенная информация о статусе стратегии
 * Extended strategy status information
 */
interface StrategyStatusInfo {
  /** Идентификатор стратегии */
  strategy_id: string;
  /** Предыдущий статус */
  previous_status: boolean;
  /** Новый статус */
  current_status: boolean;
  /** Время изменения статуса */
  status_changed_at: string;
  /** Пользователь, изменивший статус */
  changed_by?: string;
  /** Количество товаров в стратегии */
  products_count: number;
  /** Влияние изменения статуса */
  impact_summary: StatusChangeImpact;
}

/**
 * Влияние изменения статуса стратегии
 * Impact of strategy status change
 */
interface StatusChangeImpact {
  /** Количество товаров, затронутых изменением */
  affected_products_count: number;
  /** Ожидаемые изменения цен */
  expected_price_changes: {
    /** Товары с ожидаемым повышением цены */
    price_increases: number;
    /** Товары с ожидаемым снижением цены */
    price_decreases: number;
    /** Товары без изменения цены */
    no_change: number;
  };
  /** Статус автоматического обновления цен */
  auto_update_status: 'enabled' | 'disabled' | 'partial';
}
```

---

## 🛠️ Практические примеры использования

### 1. Управление статусом стратегии

```typescript
import { PricingStrategyApi } from 'daytona-ozon-seller-api';

const pricingApi = new PricingStrategyApi(httpClient);

// Активация стратегии ценообразования
async function enablePricingStrategy(strategyId: string): Promise<void> {
  try {
    console.log(`🔄 Активация стратегии ${strategyId}...`);
    
    const result = await pricingApi.updateStrategyStatus({
      strategy_id: strategyId,
      enabled: true
    });

    if (result.result.status === 'ok') {
      console.log(`✅ Стратегия ${strategyId} успешно активирована`);
      
      // Получаем дополнительную информацию о стратегии
      const strategyInfo = await pricingApi.getStrategyInfo({
        strategy_id: strategyId
      });
      
      console.log(`📊 Товаров в стратегии: ${strategyInfo.result.products_count || 'неизвестно'}`);
      console.log(`🎯 Тип стратегии: ${strategyInfo.result.strategy_type}`);
    }
  } catch (error) {
    console.error(`❌ Ошибка при активации стратегии ${strategyId}:`, error);
    throw error;
  }
}

// Деактивация стратегии ценообразования
async function disablePricingStrategy(strategyId: string): Promise<void> {
  try {
    console.log(`⏸️ Деактивация стратегии ${strategyId}...`);
    
    const result = await pricingApi.updateStrategyStatus({
      strategy_id: strategyId,
      enabled: false
    });

    if (result.result.status === 'ok') {
      console.log(`✅ Стратегия ${strategyId} успешно деактивирована`);
      console.log('ℹ️ Автоматическое обновление цен приостановлено');
    }
  } catch (error) {
    console.error(`❌ Ошибка при деактивации стратегии ${strategyId}:`, error);
    throw error;
  }
}

// Пример использования
await enablePricingStrategy('strategy_123');
await disablePricingStrategy('strategy_456');
```

### 2. Поиск стратегий по товарам

```typescript
// Поиск всех стратегий для списка товаров
async function findStrategiesForProducts(productIds: string[]): Promise<void> {
  try {
    console.log(`🔍 Поиск стратегий для ${productIds.length} товаров...`);
    
    const result = await pricingApi.getStrategyIDsByItemIDs({
      product_ids: productIds,
      status_filter: 'all',
      include_system: true
    });

    const mappings = result.result.product_strategy_mapping;
    
    console.log(`📊 Статистика поиска:`);
    console.log(`- Всего связей: ${result.result.total_mappings}`);
    console.log(`- Товаров без стратегий: ${result.result.products_without_strategies}`);
    console.log(`- Товаров со стратегиями: ${mappings.length}`);

    // Анализ найденных связей
    for (const mapping of mappings) {
      console.log(`\n🛍️ Товар: ${mapping.product_id}`);
      console.log(`📋 Стратегий: ${mapping.strategy_ids.length}`);
      
      if (mapping.primary_strategy_id) {
        console.log(`🎯 Основная стратегия: ${mapping.primary_strategy_id}`);
      }

      mapping.strategy_ids.forEach((strategy, index) => {
        const statusIcon = strategy.status === 'ACTIVE' ? '✅' : 
                          strategy.status === 'INACTIVE' ? '⏸️' : '📝';
        const systemIcon = strategy.is_system ? '🏢' : '👤';
        
        console.log(`  ${index + 1}. ${statusIcon} ${systemIcon} ${strategy.strategy_name}`);
        console.log(`     ID: ${strategy.strategy_id}`);
        console.log(`     Тип: ${strategy.strategy_type}`);
        console.log(`     Добавлен: ${new Date(strategy.added_date).toLocaleDateString()}`);
        
        if (strategy.priority) {
          console.log(`     Приоритет: ${strategy.priority}`);
        }
      });
    }

    // Найти товары без активных стратегий
    const productsWithoutActiveStrategies = mappings.filter(mapping => 
      !mapping.strategy_ids.some(s => s.status === 'ACTIVE')
    );

    if (productsWithoutActiveStrategies.length > 0) {
      console.log(`\n⚠️ Товары без активных стратегий (${productsWithoutActiveStrategies.length}):`);
      productsWithoutActiveStrategies.forEach(mapping => {
        console.log(`- ${mapping.product_id}`);
      });
    }

  } catch (error) {
    console.error('❌ Ошибка при поиске стратегий:', error);
    throw error;
  }
}

// Поиск только активных стратегий
async function findActiveStrategiesForProducts(productIds: string[]): Promise<ProductStrategyMapping[]> {
  const result = await pricingApi.getStrategyIDsByItemIDs({
    product_ids: productIds,
    status_filter: 'active',
    include_system: false // Исключаем системные стратегии
  });

  return result.result.product_strategy_mapping.filter(mapping =>
    mapping.strategy_ids.some(s => s.status === 'ACTIVE')
  );
}

// Пример использования
await findStrategiesForProducts(['123456789', '987654321', '555666777']);
```

### 3. Массовое управление статусами стратегий

```typescript
/**
 * Класс для массового управления статусами стратегий
 */
class StrategyStatusManager {
  constructor(private pricingApi: PricingStrategyApi) {}

  /**
   * Массовая активация стратегий
   */
  async bulkEnableStrategies(strategyIds: string[]): Promise<BulkStatusResult> {
    console.log(`🔄 Массовая активация ${strategyIds.length} стратегий...`);
    
    const result: BulkStatusResult = {
      total_requested: strategyIds.length,
      successful: [],
      failed: [],
      summary: {
        success_count: 0,
        failure_count: 0,
        total_products_affected: 0
      }
    };

    for (const strategyId of strategyIds) {
      try {
        // Получаем информацию о стратегии перед активацией
        const strategyInfo = await pricingApi.getStrategyInfo({
          strategy_id: strategyId
        });

        // Проверяем, можно ли активировать стратегию
        if (strategyInfo.result.is_system) {
          result.failed.push({
            strategy_id: strategyId,
            error: 'Системную стратегию нельзя активировать',
            error_code: 'SYSTEM_STRATEGY'
          });
          continue;
        }

        // Активируем стратегию
        await pricingApi.updateStrategyStatus({
          strategy_id: strategyId,
          enabled: true
        });

        result.successful.push({
          strategy_id: strategyId,
          previous_status: strategyInfo.result.status,
          new_status: 'ACTIVE',
          products_count: strategyInfo.result.products_count || 0
        });

        result.summary.total_products_affected += strategyInfo.result.products_count || 0;
        
        // Пауза между запросами
        await this.delay(500);
        
      } catch (error) {
        result.failed.push({
          strategy_id: strategyId,
          error: error.message || 'Неизвестная ошибка',
          error_code: 'ACTIVATION_FAILED'
        });
      }
    }

    result.summary.success_count = result.successful.length;
    result.summary.failure_count = result.failed.length;

    this.logBulkStatusResults('активации', result);
    return result;
  }

  /**
   * Массовая деактивация стратегий
   */
  async bulkDisableStrategies(strategyIds: string[]): Promise<BulkStatusResult> {
    console.log(`⏸️ Массовая деактивация ${strategyIds.length} стратегий...`);
    
    const result: BulkStatusResult = {
      total_requested: strategyIds.length,
      successful: [],
      failed: [],
      summary: {
        success_count: 0,
        failure_count: 0,
        total_products_affected: 0
      }
    };

    for (const strategyId of strategyIds) {
      try {
        const strategyInfo = await pricingApi.getStrategyInfo({
          strategy_id: strategyId
        });

        if (strategyInfo.result.is_system) {
          result.failed.push({
            strategy_id: strategyId,
            error: 'Системную стратегию нельзя деактивировать',
            error_code: 'SYSTEM_STRATEGY'
          });
          continue;
        }

        await pricingApi.updateStrategyStatus({
          strategy_id: strategyId,
          enabled: false
        });

        result.successful.push({
          strategy_id: strategyId,
          previous_status: strategyInfo.result.status,
          new_status: 'INACTIVE',
          products_count: strategyInfo.result.products_count || 0
        });

        result.summary.total_products_affected += strategyInfo.result.products_count || 0;
        
        await this.delay(500);
        
      } catch (error) {
        result.failed.push({
          strategy_id: strategyId,
          error: error.message || 'Неизвестная ошибка',
          error_code: 'DEACTIVATION_FAILED'
        });
      }
    }

    result.summary.success_count = result.successful.length;
    result.summary.failure_count = result.failed.length;

    this.logBulkStatusResults('деактивации', result);
    return result;
  }

  /**
   * Умное переключение статуса на основе анализа
   */
  async smartStatusToggle(strategyId: string): Promise<void> {
    try {
      // Получаем текущую информацию о стратегии
      const strategyInfo = await pricingApi.getStrategyInfo({
        strategy_id: strategyId
      });

      // Получаем список товаров в стратегии
      const productsResponse = await pricingApi.getStrategyItems({
        strategy_id: strategyId,
        limit: 1
      });

      const hasProducts = productsResponse.result.total_count > 0;
      const isActive = strategyInfo.result.status === 'ACTIVE';

      console.log(`🤖 Умный анализ стратегии ${strategyId}:`);
      console.log(`- Текущий статус: ${isActive ? '✅ Активна' : '⏸️ Неактивна'}`);
      console.log(`- Товаров в стратегии: ${productsResponse.result.total_count}`);

      // Логика умного переключения
      if (!hasProducts && isActive) {
        console.log('🎯 Рекомендация: Деактивировать (нет товаров)');
        await this.bulkDisableStrategies([strategyId]);
      } else if (hasProducts && !isActive) {
        console.log('🎯 Рекомендация: Активировать (есть товары)');
        await this.bulkEnableStrategies([strategyId]);
      } else if (!hasProducts && !isActive) {
        console.log('ℹ️ Стратегия уже неактивна и не содержит товаров');
      } else {
        console.log('✅ Стратегия активна и содержит товары - изменения не требуются');
      }

    } catch (error) {
      console.error(`❌ Ошибка при умном переключении статуса:`, error);
      throw error;
    }
  }

  private logBulkStatusResults(operation: string, result: BulkStatusResult): void {
    console.log(`\n📊 Результаты массовой ${operation}:`);
    console.log(`✅ Успешно: ${result.summary.success_count}/${result.total_requested}`);
    console.log(`❌ Ошибок: ${result.summary.failure_count}`);
    console.log(`📦 Товаров затронуто: ${result.summary.total_products_affected}`);
    
    if (result.failed.length > 0) {
      console.log('\n⚠️ Ошибки:');
      result.failed.forEach(failed => {
        console.log(`- ${failed.strategy_id}: ${failed.error}`);
      });
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Типы для массового управления
interface BulkStatusResult {
  total_requested: number;
  successful: SuccessfulStatusChange[];
  failed: FailedStatusChange[];
  summary: {
    success_count: number;
    failure_count: number;
    total_products_affected: number;
  };
}

interface SuccessfulStatusChange {
  strategy_id: string;
  previous_status: string;
  new_status: string;
  products_count: number;
}

interface FailedStatusChange {
  strategy_id: string;
  error: string;
  error_code: string;
}

// Пример использования
const statusManager = new StrategyStatusManager(pricingApi);

// Массовая активация
await statusManager.bulkEnableStrategies([
  'strategy_123', 'strategy_456', 'strategy_789'
]);

// Умное переключение
await statusManager.smartStatusToggle('strategy_123');
```

### 4. Аналитика по связям товаров и стратегий

```typescript
/**
 * Класс для анализа связей между товарами и стратегиями
 */
class ProductStrategyAnalyzer {
  constructor(private pricingApi: PricingStrategyApi) {}

  /**
   * Комплексный анализ покрытия товаров стратегиями
   */
  async analyzeStrategyCoverage(productIds: string[]): Promise<StrategyCoverageReport> {
    console.log(`🔍 Анализ покрытия стратегиями для ${productIds.length} товаров...`);

    const result = await pricingApi.getStrategyIDsByItemIDs({
      product_ids: productIds,
      status_filter: 'all',
      include_system: true
    });

    const mappings = result.result.product_strategy_mapping;
    
    // Статистика по покрытию
    const coverageStats = {
      total_products: productIds.length,
      products_with_strategies: mappings.length,
      products_without_strategies: result.result.products_without_strategies,
      coverage_percentage: (mappings.length / productIds.length * 100).toFixed(1)
    };

    // Статистика по типам стратегий
    const strategyTypeStats = this.analyzeStrategyTypes(mappings);
    
    // Статистика по статусам
    const statusStats = this.analyzeStrategyStatuses(mappings);
    
    // Конфликты и проблемы
    const issues = this.identifyIssues(mappings);
    
    // Рекомендации
    const recommendations = this.generateCoverageRecommendations(
      coverageStats, strategyTypeStats, statusStats, issues
    );

    const report: StrategyCoverageReport = {
      analysis_date: new Date().toISOString(),
      coverage_stats: coverageStats,
      strategy_type_distribution: strategyTypeStats,
      status_distribution: statusStats,
      identified_issues: issues,
      recommendations: recommendations,
      product_mappings: mappings
    };

    this.logCoverageReport(report);
    return report;
  }

  private analyzeStrategyTypes(mappings: ProductStrategyMapping[]): StrategyTypeDistribution {
    const typeCount = new Map<string, number>();
    const systemVsUserCount = { system: 0, user: 0 };

    mappings.forEach(mapping => {
      mapping.strategy_ids.forEach(strategy => {
        typeCount.set(strategy.strategy_type, (typeCount.get(strategy.strategy_type) || 0) + 1);
        
        if (strategy.is_system) {
          systemVsUserCount.system++;
        } else {
          systemVsUserCount.user++;
        }
      });
    });

    return {
      by_type: Object.fromEntries(typeCount),
      system_vs_user: systemVsUserCount,
      most_common_type: [...typeCount.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || 'none'
    };
  }

  private analyzeStrategyStatuses(mappings: ProductStrategyMapping[]): StatusDistribution {
    const statusCount = new Map<string, number>();
    let productsWithActiveStrategies = 0;

    mappings.forEach(mapping => {
      let hasActiveStrategy = false;
      
      mapping.strategy_ids.forEach(strategy => {
        statusCount.set(strategy.status, (statusCount.get(strategy.status) || 0) + 1);
        
        if (strategy.status === 'ACTIVE') {
          hasActiveStrategy = true;
        }
      });

      if (hasActiveStrategy) {
        productsWithActiveStrategies++;
      }
    });

    return {
      by_status: Object.fromEntries(statusCount),
      products_with_active_strategies: productsWithActiveStrategies,
      active_coverage_percentage: (productsWithActiveStrategies / mappings.length * 100).toFixed(1)
    };
  }

  private identifyIssues(mappings: ProductStrategyMapping[]): CoverageIssue[] {
    const issues: CoverageIssue[] = [];

    mappings.forEach(mapping => {
      // Товары с множественными активными стратегиями
      const activeStrategies = mapping.strategy_ids.filter(s => s.status === 'ACTIVE');
      if (activeStrategies.length > 1) {
        issues.push({
          type: 'MULTIPLE_ACTIVE_STRATEGIES',
          product_id: mapping.product_id,
          description: `Товар привязан к ${activeStrategies.length} активным стратегиям`,
          severity: 'medium',
          strategy_ids: activeStrategies.map(s => s.strategy_id)
        });
      }

      // Товары без активных стратегий, но с неактивными
      if (activeStrategies.length === 0 && mapping.strategy_ids.length > 0) {
        issues.push({
          type: 'NO_ACTIVE_STRATEGIES',
          product_id: mapping.product_id,
          description: 'Товар имеет стратегии, но все неактивны',
          severity: 'high',
          strategy_ids: mapping.strategy_ids.map(s => s.strategy_id)
        });
      }

      // Товары только с системными стратегиями
      const userStrategies = mapping.strategy_ids.filter(s => !s.is_system);
      if (userStrategies.length === 0 && mapping.strategy_ids.length > 0) {
        issues.push({
          type: 'ONLY_SYSTEM_STRATEGIES',
          product_id: mapping.product_id,
          description: 'Товар привязан только к системным стратегиям',
          severity: 'low',
          strategy_ids: mapping.strategy_ids.map(s => s.strategy_id)
        });
      }
    });

    return issues;
  }

  private generateCoverageRecommendations(
    coverage: any,
    types: StrategyTypeDistribution,
    statuses: StatusDistribution,
    issues: CoverageIssue[]
  ): string[] {
    const recommendations: string[] = [];

    // Рекомендации по покрытию
    if (parseFloat(coverage.coverage_percentage) < 80) {
      recommendations.push(
        `🎯 Низкое покрытие товаров стратегиями (${coverage.coverage_percentage}%). ` +
        `Рекомендуется создать стратегии для ${coverage.products_without_strategies} товаров.`
      );
    }

    // Рекомендации по активным стратегиям
    if (parseFloat(statuses.active_coverage_percentage) < 60) {
      recommendations.push(
        `⚡ Низкое покрытие активными стратегиями (${statuses.active_coverage_percentage}%). ` +
        `Рекомендуется активировать неактивные стратегии или создать новые.`
      );
    }

    // Рекомендации по конфликтам
    const multipleActiveIssues = issues.filter(i => i.type === 'MULTIPLE_ACTIVE_STRATEGIES');
    if (multipleActiveIssues.length > 0) {
      recommendations.push(
        `⚠️ Найдено ${multipleActiveIssues.length} товаров с множественными активными стратегиями. ` +
        `Рекомендуется настроить приоритеты или деактивировать лишние стратегии.`
      );
    }

    // Рекомендации по типам стратегий
    if (types.system_vs_user.user < types.system_vs_user.system * 0.5) {
      recommendations.push(
        `🏗️ Преобладают системные стратегии. Рекомендуется создать больше пользовательских ` +
        `стратегий для более точного управления ценами.`
      );
    }

    return recommendations;
  }

  private logCoverageReport(report: StrategyCoverageReport): void {
    console.log('\n📊 Отчёт о покрытии товаров стратегиями:');
    console.log(`📈 Общее покрытие: ${report.coverage_stats.coverage_percentage}%`);
    console.log(`⚡ Активные стратегии: ${report.status_distribution.active_coverage_percentage}%`);
    console.log(`🎯 Товаров со стратегиями: ${report.coverage_stats.products_with_strategies}`);
    console.log(`❓ Товаров без стратегий: ${report.coverage_stats.products_without_strategies}`);
    
    if (report.identified_issues.length > 0) {
      console.log(`\n⚠️ Выявленные проблемы: ${report.identified_issues.length}`);
      report.identified_issues.slice(0, 5).forEach(issue => {
        console.log(`- ${issue.description} (${issue.product_id})`);
      });
    }

    if (report.recommendations.length > 0) {
      console.log('\n💡 Рекомендации:');
      report.recommendations.forEach(rec => {
        console.log(`${rec}`);
      });
    }
  }
}

// Типы для аналитики
interface StrategyCoverageReport {
  analysis_date: string;
  coverage_stats: {
    total_products: number;
    products_with_strategies: number;
    products_without_strategies: number;
    coverage_percentage: string;
  };
  strategy_type_distribution: StrategyTypeDistribution;
  status_distribution: StatusDistribution;
  identified_issues: CoverageIssue[];
  recommendations: string[];
  product_mappings: ProductStrategyMapping[];
}

interface StrategyTypeDistribution {
  by_type: Record<string, number>;
  system_vs_user: { system: number; user: number };
  most_common_type: string;
}

interface StatusDistribution {
  by_status: Record<string, number>;
  products_with_active_strategies: number;
  active_coverage_percentage: string;
}

interface CoverageIssue {
  type: 'MULTIPLE_ACTIVE_STRATEGIES' | 'NO_ACTIVE_STRATEGIES' | 'ONLY_SYSTEM_STRATEGIES';
  product_id: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  strategy_ids: string[];
}

// Пример использования
const analyzer = new ProductStrategyAnalyzer(pricingApi);

const coverageReport = await analyzer.analyzeStrategyCoverage([
  '123456789', '987654321', '555666777'
  // ... больше товаров
]);
```

---

## 🚀 Планируемое развитие (Резерв функционала)

### Будущие возможности
1. **Batch Operations API** — Массовые операции со стратегиями
2. **Strategy Templates API** — Шаблоны стратегий для быстрого создания
3. **Advanced Analytics API** — Углубленная аналитика эффективности
4. **Notification System API** — Система уведомлений о изменениях
5. **Integration Webhooks** — Веб-хуки для интеграции с внешними системами

### Расширенная функциональность
```typescript
// Примеры будущего API (планируется)

/**
 * Будущий метод для массовых операций
 * Future batch operations method
 */
async batchUpdateStrategiesStatus(request: BatchStatusUpdateRequest): Promise<BatchStatusUpdateResponse>;

/**
 * Будущий метод для создания стратегий по шаблонам  
 * Future template-based strategy creation
 */
async createStrategyFromTemplate(request: CreateFromTemplateRequest): Promise<CreateStrategyResponse>;

/**
 * Будущий метод для настройки уведомлений
 * Future notification configuration
 */
async configureNotifications(request: NotificationConfigRequest): Promise<NotificationConfigResponse>;

/**
 * Будущий метод для экспорта данных
 * Future data export functionality
 */
async exportStrategyData(request: ExportDataRequest): Promise<ExportDataResponse>;
```

---

## 📈 KPI и метрики эффективности

### Операционные метрики
- **Скорость переключения статуса**: Среднее время активации/деактивации стратегии
- **Покрытие товаров**: % товаров в активных стратегиях от общего каталога
- **Конфликты стратегий**: Количество товаров с множественными активными стратегиями
- **Системная нагрузка**: Время отклика операций управления статусом

### Аналитические метрики
- **Эффективность стратегий**: ROI активных vs неактивных стратегий
- **Использование типов**: Распределение товаров по типам стратегий
- **Частота изменений**: Количество переключений статуса за период
- **Автоматизация**: % операций, выполненных автоматически

---

## ⚠️ Рекомендации и лучшие практики

### Управление статусами
1. **Плавное переключение**: Избегайте массовых изменений статуса в пиковые часы
2. **Мониторинг влияния**: Отслеживайте влияние изменений статуса на продажи
3. **Резервное копирование**: Сохраняйте состояние стратегий перед массовыми изменениями
4. **Тестирование**: Тестируйте изменения на небольшом количестве товаров

### Поиск и анализ
1. **Регулярный аудит**: Проводите регулярный анализ связей товаров и стратегий
2. **Устранение конфликтов**: Своевременно устраняйте конфликты множественных стратегий
3. **Оптимизация покрытия**: Стремитесь к 80%+ покрытию товаров активными стратегиями
4. **Документирование**: Ведите документацию изменений в стратегиях

### Автоматизация и интеграция
1. **Умные правила**: Используйте умную логику для автоматического переключения статусов
2. **Интеграция с аналитикой**: Связывайте операции со стратегиями с бизнес-метриками
3. **Уведомления**: Настройте уведомления о критических изменениях
4. **Логирование**: Ведите детальные логи всех операций для аудита

---

## 🔄 Интеграция с другими модулями

### Связь с Strategy Management
- Статус стратегий управляется через методы данного модуля
- Создание и настройка стратегий влияет на доступные операции
- Системные стратегии имеют ограничения на изменение статуса

### Связь с Product Management
- Товары в стратегиях влияют на логику переключения статуса
- Поиск стратегий по товарам используется для анализа покрытия
- Связи товаров и стратегий влияют на ценообразование

### Связь с Analytics API
- Данные о статусах стратегий используются в аналитических отчётах
- История изменений статусов анализируется для оптимизации
- Метрики эффективности связаны с активностью стратегий