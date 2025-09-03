# Pricing Strategy API — Управление стратегиями

Детальная документация по методам CRUD операций со стратегиями ценообразования: создание, чтение, обновление и удаление стратегий с полным жизненным циклом управления.

## 📋 Методы управления стратегиями (5 методов)

### ➕ `createStrategy()` — Создание новой стратегии
### 📋 `getStrategiesList()` — Получение списка стратегий  
### 🔍 `getStrategyInfo()` — Детальная информация о стратегии
### ✏️ `updateStrategy()` — Обновление параметров стратегии
### ❌ `deleteStrategy()` — Удаление стратегии

---

## 🔧 TypeScript интерфейсы

### Запросы (Requests)

```typescript
// Запрос создания стратегии
interface CreatePricingStrategyRequest {
  strategy_name: string;              // название стратегии
  competitors: CompetitorConfig[];    // список конкурентов с коэффициентами
}

// Запрос списка стратегий
interface GetStrategyListRequest {
  page: number;                       // номер страницы (минимум 1)
  limit: number;                      // количество стратегий на странице (1-50)
}

// Запрос информации о стратегии
interface GetStrategyInfoRequest {
  strategy_id: string;                // ID стратегии для получения информации
}

// Запрос обновления стратегии
interface UpdatePricingStrategyRequest {
  strategy_id: string;                // ID обновляемой стратегии
  strategy_name: string;              // новое название стратегии
  competitors: CompetitorConfig[];    // обновленный список конкурентов
}

// Запрос удаления стратегии
interface DeletePricingStrategyRequest {
  strategy_id: string;                // ID удаляемой стратегии
}

// Конфигурация конкурента в стратегии
interface CompetitorConfig {
  competitor_id: number;              // ID конкурента
  coefficient: number;                // коэффициент ценообразования (0.5-1.2)
}
```

### Ответы (Responses)

```typescript
// Ответ создания стратегии
interface CreatePricingStrategyResponse {
  result?: CreateStrategyResult;      // результат создания
}

interface CreateStrategyResult {
  strategy_id: string;                // ID созданной стратегии
}

// Ответ со списком стратегий
interface GetStrategyListResponse {
  strategies?: StrategyListItem[];    // список стратегий
  total?: number;                     // общее количество стратегий
}

interface StrategyListItem {
  id: string;                         // ID стратегии
  name: string;                       // название стратегии
  type: StrategyType;                 // тип стратегии
  enabled: boolean;                   // статус активности
  update_type: UpdateType;            // тип последнего изменения
  updated_at?: string;                // дата последнего изменения (ISO 8601)
  products_count?: number;            // количество товаров в стратегии
  competitors_count?: number;         // количество конкурентов
}

// Ответ с информацией о стратегии
interface GetStrategyResponse {
  result?: StrategyInfo;              // детальная информация о стратегии
}

interface StrategyInfo {
  name: string;                       // название стратегии
  type: StrategyType;                 // тип стратегии
  enabled: boolean;                   // статус активности
  update_type: UpdateType;            // тип последнего изменения
  competitors?: CompetitorConfig[];   // список конкурентов с коэффициентами
}

// Типы стратегий
type StrategyType = 
  | 'MIN_EXT_PRICE'    // системная стратегия (нельзя изменять)
  | 'COMP_PRICE';      // пользовательская стратегия

// Типы изменений стратегии
type UpdateType =
  | 'strategyCreated'           // стратегия создана
  | 'strategyEnabled'           // стратегия активирована
  | 'strategyDisabled'          // стратегия деактивирована
  | 'strategyChanged'           // параметры стратегии изменены
  | 'strategyItemsListChanged'; // изменен список товаров

// Расширенная информация о стратегии для внутреннего использования
interface ExtendedStrategyInfo extends StrategyInfo {
  performance?: StrategyPerformance;  // показатели эффективности
  risk_assessment?: RiskAssessment;   // оценка рисков
  market_impact?: MarketImpact;       // влияние на рынок
  optimization_suggestions?: string[]; // предложения по оптимизации
}

interface StrategyPerformance {
  revenue_change_percent: number;     // изменение выручки (%)
  margin_change_percent: number;      // изменение маржи (%)
  conversion_change_percent: number;  // изменение конверсии (%)
  average_price_change_percent: number; // изменение средней цены (%)
  products_affected: number;          // количество затронутых товаров
  last_updated: string;               // дата последнего расчёта
}

interface RiskAssessment {
  overall_risk: 'LOW' | 'MEDIUM' | 'HIGH'; // общий уровень риска
  price_volatility: number;           // волатильность цен (0-1)
  competitor_aggressiveness: number;   // агрессивность конкурентов (0-1)
  market_sensitivity: number;         // чувствительность рынка (0-1)
  recommendations: string[];          // рекомендации по снижению рисков
}

interface MarketImpact {
  market_share_change: number;        // изменение доли рынка (%)
  competitor_response_rate: number;   // скорость реакции конкурентов
  customer_price_sensitivity: number; // чувствительность клиентов к цене
  brand_perception_impact: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
}
```

---

## ➕ createStrategy() — Создание новой стратегии

Создает новую стратегию ценообразования с указанными конкурентами и коэффициентами.

### 🔥 Ключевые особенности
- **Системные ограничения**: нельзя создавать стратегии типа `MIN_EXT_PRICE`
- **Коэффициенты**: диапазон от 0.5 до 1.2 для каждого конкурента
- **Валидация**: автоматическая проверка корректности данных конкурентов
- **Статус по умолчанию**: новые стратегии создаются в неактивном состоянии

### 📝 Примеры использования

```typescript
// Базовое создание стратегии
const newStrategy = await pricingApi.createStrategy({
  strategy_name: 'Агрессивная стратегия для электроники',
  competitors: [
    { competitor_id: 123, coefficient: 0.95 }, // -5% от конкурента
    { competitor_id: 456, coefficient: 0.90 }, // -10% от конкурента
    { competitor_id: 789, coefficient: 1.05 }  // +5% к конкуренту
  ]
});

console.log(`✅ Создана стратегия: ${newStrategy.result?.strategy_id}`);

// Создание стратегии с автоматическим подбором конкурентов
async function createOptimalStrategy(
  name: string, 
  targetGoal: 'AGGRESSIVE' | 'BALANCED' | 'PREMIUM'
): Promise<string | null> {
  // Получаем список доступных конкурентов
  const competitors = await pricingApi.getCompetitors({ page: 1, limit: 50 });
  
  if (!competitors.competitor || competitors.competitor.length === 0) {
    console.log('❌ Нет доступных конкурентов');
    return null;
  }

  // Выбираем топ-5 конкурентов
  const selectedCompetitors = competitors.competitor.slice(0, 5);
  
  // Устанавливаем коэффициенты в зависимости от цели
  const competitorConfigs: CompetitorConfig[] = selectedCompetitors.map(comp => {
    let coefficient: number;
    
    switch (targetGoal) {
      case 'AGGRESSIVE':
        coefficient = 0.9;  // Агрессивная цена -10%
        break;
      case 'PREMIUM':
        coefficient = 1.1;  // Премиум цена +10%
        break;
      default:
        coefficient = 0.95; // Сбалансированная -5%
    }
    
    return {
      competitor_id: comp.id,
      coefficient
    };
  });

  try {
    const strategy = await pricingApi.createStrategy({
      strategy_name: name,
      competitors: competitorConfigs
    });

    return strategy.result?.strategy_id || null;
  } catch (error) {
    console.error('❌ Ошибка создания стратегии:', error);
    return null;
  }
}

// Пример использования
const strategyId = await createOptimalStrategy(
  'Автоматическая стратегия Q4 2024', 
  'AGGRESSIVE'
);
```

### 🚀 Фабрика стратегий для разных сценариев

```typescript
class StrategyFactory {
  constructor(private api: PricingStrategyApi) {}

  async createCompetitiveStrategy(config: CompetitiveStrategyConfig): Promise<StrategyCreationResult> {
    const competitors = await this.selectOptimalCompetitors(config.category, config.competitorCount);
    
    const strategyConfig: CreatePricingStrategyRequest = {
      strategy_name: this.generateStrategyName(config),
      competitors: competitors.map(comp => ({
        competitor_id: comp.id,
        coefficient: this.calculateCompetitiveCoefficient(comp, config.aggressiveness)
      }))
    };

    try {
      const result = await this.api.createStrategy(strategyConfig);
      
      return {
        success: true,
        strategyId: result.result?.strategy_id,
        selectedCompetitors: competitors.length,
        averageCoefficient: this.calculateAverageCoefficient(strategyConfig.competitors),
        recommendations: this.generateRecommendations(config, competitors)
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        recommendations: ['Проверьте доступность конкурентов', 'Убедитесь в корректности коэффициентов']
      };
    }
  }

  async createSeasonalStrategy(config: SeasonalStrategyConfig): Promise<StrategyCreationResult> {
    // Адаптируем коэффициенты в зависимости от сезона
    const seasonalMultiplier = this.getSeasonalMultiplier(config.season);
    
    const competitors = await this.selectOptimalCompetitors(config.category, 5);
    
    const strategyConfig: CreatePricingStrategyRequest = {
      strategy_name: `Сезонная стратегия ${config.season} - ${config.category}`,
      competitors: competitors.map(comp => ({
        competitor_id: comp.id,
        coefficient: this.applySeasonalAdjustment(0.95, seasonalMultiplier, config.season)
      }))
    };

    const result = await this.api.createStrategy(strategyConfig);
    
    return {
      success: true,
      strategyId: result.result?.strategy_id,
      selectedCompetitors: competitors.length,
      seasonalAdjustment: seasonalMultiplier,
      recommendations: [
        `Стратегия оптимизирована для сезона ${config.season}`,
        'Рекомендуется пересмотр через 30 дней'
      ]
    };
  }

  async createMarginProtectionStrategy(config: MarginProtectionConfig): Promise<StrategyCreationResult> {
    const competitors = await this.selectOptimalCompetitors(config.category, 3);
    
    // Рассчитываем коэффициенты для защиты целевой маржи
    const protectiveCoefficients = this.calculateMarginProtectiveCoefficients(
      competitors, 
      config.targetMargin,
      config.minimumMargin
    );

    const strategyConfig: CreatePricingStrategyRequest = {
      strategy_name: `Защита маржи ${config.targetMargin * 100}% - ${config.category}`,
      competitors: competitors.map((comp, index) => ({
        competitor_id: comp.id,
        coefficient: protectiveCoefficients[index]
      }))
    };

    const result = await this.api.createStrategy(strategyConfig);
    
    return {
      success: true,
      strategyId: result.result?.strategy_id,
      selectedCompetitors: competitors.length,
      targetMargin: config.targetMargin,
      recommendations: [
        `Коэффициенты настроены для защиты маржи ${config.targetMargin * 100}%`,
        'Мониторинг эффективности каждые 2 недели'
      ]
    };
  }

  private async selectOptimalCompetitors(category: string, count: number): Promise<CompetitorInfo[]> {
    const competitors = await this.api.getCompetitors({ page: 1, limit: 50 });
    
    if (!competitors.competitor) {
      return [];
    }

    // Здесь должна быть логика интеллектуального отбора конкурентов
    // На основе категории, надежности данных, обновляемости цен
    return competitors.competitor
      .slice(0, count) // Простая логика - берем первых N
      .filter(comp => comp.id && comp.name);
  }

  private calculateCompetitiveCoefficient(competitor: CompetitorInfo, aggressiveness: number): number {
    // Базовый коэффициент в зависимости от агрессивности (0-1)
    const baseCoefficient = 1 - (aggressiveness * 0.2); // От 1.0 до 0.8
    
    // Корректировки на основе конкурента
    let adjustment = 0;
    
    const name = competitor.name.toLowerCase();
    if (name.includes('premium') || name.includes('люкс')) {
      adjustment += 0.05; // Можно быть дороже премиум конкурентов
    }
    
    if (name.includes('discount') || name.includes('дешев')) {
      adjustment -= 0.05; // Нужно быть агрессивнее с дискаунтерами
    }

    return Math.max(0.5, Math.min(1.2, baseCoefficient + adjustment));
  }

  private getSeasonalMultiplier(season: 'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER'): number {
    const multipliers = {
      'SPRING': 1.0,    // Базовый сезон
      'SUMMER': 0.95,   // Летние скидки
      'AUTUMN': 1.02,   // Подготовка к зиме
      'WINTER': 1.05    // Высокий спрос
    };
    
    return multipliers[season];
  }

  private applySeasonalAdjustment(baseCoeff: number, multiplier: number, season: string): number {
    const adjusted = baseCoeff * multiplier;
    return Math.max(0.5, Math.min(1.2, adjusted));
  }

  private calculateMarginProtectiveCoefficients(
    competitors: CompetitorInfo[], 
    targetMargin: number, 
    minimumMargin: number
  ): number[] {
    // Упрощенная логика расчета коэффициентов для защиты маржи
    const baseCoefficient = 1 + (targetMargin - 0.1); // Базовый коэффициент от целевой маржи
    
    return competitors.map(() => 
      Math.max(0.5, Math.min(1.2, baseCoefficient))
    );
  }

  private generateStrategyName(config: CompetitiveStrategyConfig): string {
    const aggressivenessTerm = config.aggressiveness > 0.7 ? 'Агрессивная' :
                             config.aggressiveness > 0.4 ? 'Сбалансированная' : 'Консервативная';
    
    const dateSuffix = new Date().toISOString().substr(0, 10);
    
    return `${aggressivenessTerm} стратегия ${config.category} ${dateSuffix}`;
  }

  private calculateAverageCoefficient(competitors: CompetitorConfig[]): number {
    const sum = competitors.reduce((acc, comp) => acc + comp.coefficient, 0);
    return sum / competitors.length;
  }

  private generateRecommendations(config: CompetitiveStrategyConfig, competitors: CompetitorInfo[]): string[] {
    const recommendations: string[] = [];
    
    if (config.aggressiveness > 0.8) {
      recommendations.push('⚠️ Высокая агрессивность может привести к ценовым войнам');
    }
    
    if (competitors.length < 3) {
      recommendations.push('📊 Рекомендуется добавить больше конкурентов для лучшего анализа');
    }
    
    recommendations.push('🔄 Проводите анализ эффективности через 2-3 недели');
    recommendations.push('📈 Отслеживайте изменения конверсии и маржинальности');
    
    return recommendations;
  }
}

interface CompetitiveStrategyConfig {
  category: string;
  aggressiveness: number; // 0-1, где 1 максимально агрессивно
  competitorCount: number;
}

interface SeasonalStrategyConfig {
  category: string;
  season: 'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER';
}

interface MarginProtectionConfig {
  category: string;
  targetMargin: number;    // Целевая маржа (0-1)
  minimumMargin: number;   // Минимальная допустимая маржа (0-1)
}

interface StrategyCreationResult {
  success: boolean;
  strategyId?: string;
  error?: string;
  selectedCompetitors?: number;
  averageCoefficient?: number;
  targetMargin?: number;
  seasonalAdjustment?: number;
  recommendations: string[];
}
```

---

## 📋 getStrategiesList() — Получение списка стратегий

Возвращает список всех доступных стратегий с базовой информацией и статистикой.

### 🔥 Ключевые особенности
- **Пагинация**: до 50 стратегий на страницу
- **Метаданные**: количество товаров и конкурентов для каждой стратегии
- **Статусы**: отслеживание активных и неактивных стратегий
- **История изменений**: информация о последних обновлениях

### 📝 Примеры использования

```typescript
// Получение списка стратегий
const strategiesList = await pricingApi.getStrategiesList({
  page: 1,
  limit: 50
});

console.log(`Всего стратегий: ${strategiesList.total}`);

// Анализ стратегий
strategiesList.strategies?.forEach(strategy => {
  console.log(`\n=== ${strategy.name} ===`);
  console.log(`Статус: ${strategy.enabled ? '🟢 Активна' : '🔴 Неактивна'}`);
  console.log(`Тип: ${strategy.type === 'COMP_PRICE' ? 'Пользовательская' : 'Системная'}`);
  console.log(`Товаров: ${strategy.products_count || 0}`);
  console.log(`Конкурентов: ${strategy.competitors_count || 0}`);
  console.log(`Последнее изменение: ${strategy.update_type} (${strategy.updated_at})`);
});

// Получение всех стратегий с пагинацией
async function getAllStrategies(): Promise<StrategyListItem[]> {
  const allStrategies: StrategyListItem[] = [];
  let page = 1;
  const limit = 50;

  while (true) {
    const response = await pricingApi.getStrategiesList({ page, limit });
    
    if (!response.strategies || response.strategies.length === 0) {
      break;
    }
    
    allStrategies.push(...response.strategies);
    
    if (response.strategies.length < limit) {
      break; // Последняя страница
    }
    
    page++;
  }

  return allStrategies;
}

// Фильтрация и группировка стратегий
function analyzeStrategiesPortfolio(strategies: StrategyListItem[]): PortfolioAnalysis {
  const activeStrategies = strategies.filter(s => s.enabled);
  const inactiveStrategies = strategies.filter(s => !s.enabled);
  const userStrategies = strategies.filter(s => s.type === 'COMP_PRICE');
  const systemStrategies = strategies.filter(s => s.type === 'MIN_EXT_PRICE');

  const totalProducts = strategies.reduce((sum, s) => sum + (s.products_count || 0), 0);
  const averageCompetitors = strategies.length > 0 ? 
    strategies.reduce((sum, s) => sum + (s.competitors_count || 0), 0) / strategies.length : 0;

  return {
    total: strategies.length,
    active: activeStrategies.length,
    inactive: inactiveStrategies.length,
    user: userStrategies.length,
    system: systemStrategies.length,
    totalProducts,
    averageCompetitors: Math.round(averageCompetitors * 10) / 10,
    recentChanges: this.getRecentChanges(strategies),
    recommendations: this.generatePortfolioRecommendations(strategies)
  };
}

interface PortfolioAnalysis {
  total: number;
  active: number;
  inactive: number;
  user: number;
  system: number;
  totalProducts: number;
  averageCompetitors: number;
  recentChanges: StrategyListItem[];
  recommendations: string[];
}
```

---

## 🔍 getStrategyInfo() — Детальная информация о стратегии

Получает подробную информацию о конкретной стратегии, включая список конкурентов с коэффициентами.

### 📝 Примеры использования

```typescript
// Получение детальной информации о стратегии
const strategyInfo = await pricingApi.getStrategyInfo({
  strategy_id: 'strategy_12345'
});

if (strategyInfo.result) {
  const info = strategyInfo.result;
  console.log(`\n=== ${info.name} ===`);
  console.log(`Тип: ${info.type}`);
  console.log(`Статус: ${info.enabled ? 'Активна' : 'Неактивна'}`);
  console.log(`Последнее изменение: ${info.update_type}`);
  
  console.log('\nКонкуренты:');
  info.competitors?.forEach(comp => {
    console.log(`  ID ${comp.competitor_id}: коэффициент ${comp.coefficient}`);
  });
}
```

---

## ✏️ updateStrategy() — Обновление параметров стратегии

Обновляет название стратегии и список конкурентов с коэффициентами. Системные стратегии обновлять нельзя.

### ⚠️ Важные особенности
- **Системные стратегии**: нельзя изменять стратегии типа `MIN_EXT_PRICE`
- **Полная замена**: список конкурентов заменяется полностью
- **Активные стратегии**: изменения применяются немедленно к товарам

### 📝 Примеры использования

```typescript
// Обновление стратегии
await pricingApi.updateStrategy({
  strategy_id: 'strategy_12345',
  strategy_name: 'Обновленная конкурентная стратегия',
  competitors: [
    { competitor_id: 123, coefficient: 0.92 }, // Более агрессивный коэффициент
    { competitor_id: 456, coefficient: 0.98 }, // Менее агрессивный
    { competitor_id: 999, coefficient: 1.05 }  // Новый конкурент
  ]
});

console.log('✅ Стратегия обновлена');

// Безопасное обновление с проверками
async function safeUpdateStrategy(
  strategyId: string, 
  updates: Partial<UpdatePricingStrategyRequest>
): Promise<UpdateResult> {
  try {
    // Получаем текущую информацию о стратегии
    const currentInfo = await pricingApi.getStrategyInfo({ strategy_id: strategyId });
    
    if (!currentInfo.result) {
      return { success: false, error: 'Стратегия не найдена' };
    }

    if (currentInfo.result.type === 'MIN_EXT_PRICE') {
      return { success: false, error: 'Нельзя изменять системные стратегии' };
    }

    // Подготавливаем полный запрос обновления
    const updateRequest: UpdatePricingStrategyRequest = {
      strategy_id: strategyId,
      strategy_name: updates.strategy_name || currentInfo.result.name,
      competitors: updates.competitors || currentInfo.result.competitors || []
    };

    await pricingApi.updateStrategy(updateRequest);
    
    return { 
      success: true, 
      message: 'Стратегия успешно обновлена',
      changes: this.detectChanges(currentInfo.result, updateRequest)
    };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

interface UpdateResult {
  success: boolean;
  error?: string;
  message?: string;
  changes?: string[];
}
```

---

## ❌ deleteStrategy() — Удаление стратегии

Удаляет стратегию ценообразования. Системные стратегии удалять нельзя.

### ⚠️ Важные особенности
- **Необратимость**: удаление нельзя отменить
- **Системные стратегии**: нельзя удалять стратегии типа `MIN_EXT_PRICE`
- **Товары**: при удалении стратегии товары остаются без автоматического ценообразования

### 📝 Примеры использования

```typescript
// Простое удаление стратегии
await pricingApi.deleteStrategy({
  strategy_id: 'strategy_12345'
});

console.log('✅ Стратегия удалена');

// Безопасное удаление с подтверждением
async function safeDeleteStrategy(strategyId: string): Promise<DeleteResult> {
  try {
    // Проверяем информацию о стратегии
    const strategyInfo = await pricingApi.getStrategyInfo({ strategy_id: strategyId });
    
    if (!strategyInfo.result) {
      return { success: false, error: 'Стратегия не найдена' };
    }

    if (strategyInfo.result.type === 'MIN_EXT_PRICE') {
      return { success: false, error: 'Нельзя удалять системные стратегии' };
    }

    // Получаем список товаров в стратегии для предупреждения
    const items = await pricingApi.getStrategyItems({ strategy_id: strategyId });
    const productsCount = items.result?.products?.length || 0;

    await pricingApi.deleteStrategy({ strategy_id: strategyId });
    
    return { 
      success: true, 
      message: `Стратегия "${strategyInfo.result.name}" удалена`,
      affectedProducts: productsCount
    };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

interface DeleteResult {
  success: boolean;
  error?: string;
  message?: string;
  affectedProducts?: number;
}
```

---

## 🚀 Комплексный менеджер стратегий

```typescript
class StrategyManager {
  constructor(private api: PricingStrategyApi) {}

  async createStrategyPipeline(config: PipelineConfig): Promise<PipelineResult> {
    const results: PipelineResult = {
      created: [],
      failed: [],
      summary: {
        total: config.strategies.length,
        successful: 0,
        failed: 0
      }
    };

    for (const strategyConfig of config.strategies) {
      try {
        const strategy = await this.createStrategyWithValidation(strategyConfig);
        results.created.push(strategy);
        results.summary.successful++;
      } catch (error) {
        results.failed.push({
          config: strategyConfig,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
        results.summary.failed++;
      }

      // Задержка между созданием стратегий
      if (config.delayBetweenCreations > 0) {
        await this.delay(config.delayBetweenCreations);
      }
    }

    return results;
  }

  async optimizeExistingStrategies(): Promise<OptimizationReport> {
    const strategies = await this.getAllStrategies();
    const optimizations: StrategyOptimization[] = [];

    for (const strategy of strategies) {
      if (strategy.type === 'MIN_EXT_PRICE') {
        continue; // Пропускаем системные стратегии
      }

      const optimization = await this.analyzeStrategyOptimization(strategy);
      if (optimization.needsOptimization) {
        optimizations.push(optimization);
      }
    }

    return {
      totalAnalyzed: strategies.filter(s => s.type === 'COMP_PRICE').length,
      needOptimization: optimizations.length,
      optimizations,
      globalRecommendations: this.generateGlobalRecommendations(strategies)
    };
  }

  private async createStrategyWithValidation(config: StrategyCreationConfig): Promise<CreatedStrategy> {
    // Валидация конфигурации
    this.validateStrategyConfig(config);

    // Создание стратегии
    const result = await this.api.createStrategy({
      strategy_name: config.name,
      competitors: config.competitors
    });

    if (!result.result?.strategy_id) {
      throw new Error('Failed to create strategy - no ID returned');
    }

    return {
      id: result.result.strategy_id,
      name: config.name,
      competitorsCount: config.competitors.length,
      createdAt: new Date()
    };
  }

  private validateStrategyConfig(config: StrategyCreationConfig): void {
    if (!config.name.trim()) {
      throw new Error('Strategy name cannot be empty');
    }

    if (config.competitors.length === 0) {
      throw new Error('At least one competitor is required');
    }

    for (const comp of config.competitors) {
      if (comp.coefficient < 0.5 || comp.coefficient > 1.2) {
        throw new Error(`Invalid coefficient ${comp.coefficient} for competitor ${comp.competitor_id}`);
      }
    }
  }

  private async analyzeStrategyOptimization(strategy: StrategyListItem): Promise<StrategyOptimization> {
    // Получаем детальную информацию
    const info = await this.api.getStrategyInfo({ strategy_id: strategy.id });
    
    const suggestions: string[] = [];
    let needsOptimization = false;

    // Анализ количества конкурентов
    if ((strategy.competitors_count || 0) < 3) {
      suggestions.push('Добавьте больше конкурентов для лучшего анализа рынка');
      needsOptimization = true;
    }

    // Анализ коэффициентов
    const coefficients = info.result?.competitors?.map(c => c.coefficient) || [];
    if (coefficients.length > 0) {
      const avgCoefficient = coefficients.reduce((a, b) => a + b, 0) / coefficients.length;
      
      if (avgCoefficient < 0.8) {
        suggestions.push('Слишком агрессивные коэффициенты могут снизить маржинальность');
        needsOptimization = true;
      }
      
      if (avgCoefficient > 1.15) {
        suggestions.push('Высокие коэффициенты могут снизить конкурентоспособность');
        needsOptimization = true;
      }
    }

    // Анализ активности
    if (!strategy.enabled) {
      suggestions.push('Стратегия неактивна - рассмотрите активацию');
      needsOptimization = true;
    }

    return {
      strategyId: strategy.id,
      strategyName: strategy.name,
      needsOptimization,
      suggestions,
      currentMetrics: {
        competitorsCount: strategy.competitors_count || 0,
        productsCount: strategy.products_count || 0,
        isActive: strategy.enabled,
        averageCoefficient: coefficients.length > 0 ? 
          coefficients.reduce((a, b) => a + b, 0) / coefficients.length : 0
      }
    };
  }

  private generateGlobalRecommendations(strategies: StrategyListItem[]): string[] {
    const recommendations: string[] = [];
    
    const activeStrategies = strategies.filter(s => s.enabled).length;
    const totalStrategies = strategies.length;
    
    if (activeStrategies / totalStrategies < 0.5) {
      recommendations.push('Менее 50% стратегий активны - рассмотрите активацию неиспользуемых');
    }

    const avgProductsPerStrategy = strategies.length > 0 ?
      strategies.reduce((sum, s) => sum + (s.products_count || 0), 0) / strategies.length : 0;
    
    if (avgProductsPerStrategy < 10) {
      recommendations.push('Низкое среднее количество товаров в стратегиях - рассмотрите расширение');
    }

    return recommendations;
  }

  private async getAllStrategies(): Promise<StrategyListItem[]> {
    const allStrategies: StrategyListItem[] = [];
    let page = 1;

    while (true) {
      const response = await this.api.getStrategiesList({ page, limit: 50 });
      
      if (!response.strategies || response.strategies.length === 0) {
        break;
      }
      
      allStrategies.push(...response.strategies);
      
      if (response.strategies.length < 50) {
        break;
      }
      
      page++;
    }

    return allStrategies;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

interface PipelineConfig {
  strategies: StrategyCreationConfig[];
  delayBetweenCreations: number; // мс
}

interface StrategyCreationConfig {
  name: string;
  competitors: CompetitorConfig[];
}

interface PipelineResult {
  created: CreatedStrategy[];
  failed: { config: StrategyCreationConfig; error: string }[];
  summary: {
    total: number;
    successful: number;
    failed: number;
  };
}

interface CreatedStrategy {
  id: string;
  name: string;
  competitorsCount: number;
  createdAt: Date;
}

interface OptimizationReport {
  totalAnalyzed: number;
  needOptimization: number;
  optimizations: StrategyOptimization[];
  globalRecommendations: string[];
}

interface StrategyOptimization {
  strategyId: string;
  strategyName: string;
  needsOptimization: boolean;
  suggestions: string[];
  currentMetrics: {
    competitorsCount: number;
    productsCount: number;
    isActive: boolean;
    averageCoefficient: number;
  };
}
```

---

## 🎯 Лучшие практики управления стратегиями

### ✅ Рекомендуемые подходы

1. **Именование стратегий**: Используйте описательные имена с указанием цели и даты
2. **Тестирование**: Начинайте с небольшого количества товаров для тестирования
3. **Мониторинг**: Отслеживайте эффективность стратегий еженедельно
4. **Диверсификация**: Используйте разные типы стратегий для разных категорий
5. **Документирование**: Ведите журнал изменений и их результатов

### ⚠️ Частые ошибки

- **Слишком агрессивные коэффициенты**: приводят к ценовым войнам
- **Игнорирование системных стратегий**: попытки изменить неизменяемые стратегии
- **Редкие обновления**: устаревшие стратегии теряют эффективность
- **Отсутствие мониторинга**: не отслеживание влияния на бизнес-показатели

### 📊 KPI для стратегий ценообразования

- **Охват товаров**: % товаров в активных стратегиях
- **Эффективность**: влияние на выручку и маржинальность  
- **Стабильность**: частота изменений цен
- **Конкурентоспособность**: позиция относительно конкурентов