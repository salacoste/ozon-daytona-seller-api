# Pricing Strategy API — Анализ конкурентов

Детальная документация по методу анализа конкурентов для создания эффективных стратегий ценообразования на основе мониторинга цен конкурентов.

## 📋 Метод анализа конкурентов (1 метод)

### 🏆 `getCompetitors()` — Получение списка конкурентов

---

## 🔧 TypeScript интерфейсы

### Запросы (Requests)

```typescript
// Запрос списка конкурентов
interface GetCompetitorsRequest {
  page: number;                       // номер страницы (минимум 1)
  limit: number;                      // количество конкурентов на странице (1-50)
}

// Конкурент для использования в стратегиях
interface CompetitorConfig {
  competitor_id: number;              // ID конкурента из getCompetitors()
  coefficient: number;                // коэффициент ценообразования (0.5-1.2)
}
```

### Ответы (Responses)

```typescript
// Ответ со списком конкурентов
interface GetCompetitorsResponse {
  competitor?: CompetitorInfo[];      // список доступных конкурентов
  total?: number;                     // общее количество конкурентов
}

interface CompetitorInfo {
  id: number;                         // уникальный ID конкурента
  name: string;                       // название конкурента/маркетплейса
}

// Расширенная информация о конкуренте (для внутреннего использования)
interface ExtendedCompetitorInfo extends CompetitorInfo {
  type?: CompetitorType;              // тип конкурента
  market_share?: number;              // примерная доля рынка
  average_price_level?: PriceLevel;   // средний уровень цен
  update_frequency?: UpdateFrequency; // частота обновления данных
  reliability?: number;               // надёжность данных (0-1)
}

type CompetitorType = 
  | 'MARKETPLACE'      // маркетплейс
  | 'RETAIL_CHAIN'     // сетевой ритейл  
  | 'ONLINE_STORE'     // интернет-магазин
  | 'MANUFACTURER'     // производитель
  | 'DISTRIBUTOR';     // дистрибьютор

type PriceLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'PREMIUM';

type UpdateFrequency = 
  | 'REAL_TIME'        // в реальном времени
  | 'HOURLY'           // каждый час
  | 'DAILY'            // ежедневно  
  | 'WEEKLY';          // еженедельно
```

---

## 🏆 getCompetitors() — Получение списка конкурентов

Получает список доступных конкурентов — продавцов с похожими товарами в других интернет-магазинах и маркетплейсах для создания стратегий ценообразования.

### 🔥 Ключевые особенности
- **Пагинация**: до 50 конкурентов на страницу
- **Фильтрация**: автоматический отбор релевантных конкурентов
- **Качество данных**: только проверенные источники с регулярными обновлениями
- **Интеграция**: прямая связь с созданием стратегий ценообразования

### 💡 Бизнес-логика конкурентного анализа

**Конкуренты** в системе OZON — это внешние продавцы и маркетплейсы, данные о ценах которых используются для автоматического ценообразования. Система автоматически отслеживает цены и предоставляет данные для корректировки собственных цен.

### 📝 Примеры использования

```typescript
// Получение списка конкурентов
const competitorsData = await pricingApi.getCompetitors({
  page: 1,
  limit: 50
});

// Анализ доступных конкурентов
console.log(`Найдено ${competitorsData.total} конкурентов`);

competitorsData.competitor?.forEach(competitor => {
  console.log(`${competitor.name} (ID: ${competitor.id})`);
});

// Использование конкурентов для создания стратегии
const selectedCompetitors: CompetitorConfig[] = competitorsData.competitor?.slice(0, 5).map(comp => ({
  competitor_id: comp.id,
  coefficient: 0.95  // Устанавливаем цену на 5% ниже конкурента
})) || [];

// Получение всех конкурентов с пагинацией
async function getAllCompetitors(): Promise<CompetitorInfo[]> {
  const allCompetitors: CompetitorInfo[] = [];
  let page = 1;
  const limit = 50;

  while (true) {
    const response = await pricingApi.getCompetitors({ page, limit });
    
    if (!response.competitor || response.competitor.length === 0) {
      break;
    }
    
    allCompetitors.push(...response.competitor);
    
    // Если получили меньше чем limit, значит это последняя страница
    if (response.competitor.length < limit) {
      break;
    }
    
    page++;
  }

  return allCompetitors;
}
```

### 🔍 Система анализа и выбора конкурентов

```typescript
class CompetitorAnalyzer {
  constructor(private api: PricingStrategyApi) {}

  async analyzeCompetitorsForCategory(categoryId: string): Promise<CompetitorAnalysis> {
    // Получаем всех доступных конкурентов
    const allCompetitors = await this.getAllCompetitors();
    
    // Анализируем каждого конкурента
    const analyzedCompetitors = await this.analyzeCompetitors(allCompetitors, categoryId);
    
    // Генерируем рекомендации
    const recommendations = this.generateRecommendations(analyzedCompetitors);

    return {
      totalCompetitors: allCompetitors.length,
      analyzedCompetitors,
      recommendations,
      optimalSelection: recommendations.slice(0, 5), // Топ-5 конкурентов
      diversityScore: this.calculateDiversityScore(analyzedCompetitors)
    };
  }

  private async analyzeCompetitors(
    competitors: CompetitorInfo[], 
    categoryId: string
  ): Promise<AnalyzedCompetitor[]> {
    return competitors.map(competitor => ({
      ...competitor,
      // В реальном приложении здесь была бы интеграция с внешними API
      // для получения дополнительной информации о конкурентах
      
      relevanceScore: this.calculateRelevanceScore(competitor, categoryId),
      priceLevel: this.estimatePriceLevel(competitor),
      marketPresence: this.estimateMarketPresence(competitor),
      updateFrequency: this.estimateUpdateFrequency(competitor),
      recommendedCoefficient: this.calculateOptimalCoefficient(competitor)
    }));
  }

  private calculateRelevanceScore(competitor: CompetitorInfo, categoryId: string): number {
    // Алгоритм оценки релевантности конкурента для категории
    let score = 0.5; // Базовый балл

    // Анализ названия конкурента для определения специализации
    const name = competitor.name.toLowerCase();
    
    if (name.includes('электрон') || name.includes('техник')) {
      score += categoryId.includes('electronics') ? 0.3 : 0;
    }
    
    if (name.includes('книг') || name.includes('литер')) {
      score += categoryId.includes('books') ? 0.3 : 0;
    }
    
    if (name.includes('спорт') || name.includes('фитнес')) {
      score += categoryId.includes('sports') ? 0.3 : 0;
    }

    // Популярные маркетплейсы получают бонус
    if (['wildberries', 'yandex market', 'avito', 'dns'].some(popular => 
        name.includes(popular))) {
      score += 0.2;
    }

    return Math.min(1.0, score);
  }

  private estimatePriceLevel(competitor: CompetitorInfo): PriceLevel {
    const name = competitor.name.toLowerCase();
    
    if (name.includes('премиум') || name.includes('люкс') || name.includes('элит')) {
      return 'PREMIUM';
    }
    
    if (name.includes('дискаунт') || name.includes('эконом') || name.includes('низк')) {
      return 'LOW';
    }
    
    if (name.includes('wildberries') || name.includes('market')) {
      return 'MEDIUM'; // Популярные маркетплейсы обычно средний сегмент
    }

    return 'MEDIUM'; // По умолчанию
  }

  private estimateMarketPresence(competitor: CompetitorInfo): number {
    // Оценка присутствия на рынке от 0 до 1
    const name = competitor.name.toLowerCase();
    
    const majorPlayers = [
      'wildberries', 'yandex market', 'avito', 'dns', 'mvideo', 'eldorado'
    ];
    
    if (majorPlayers.some(player => name.includes(player))) {
      return 0.9; // Высокое присутствие на рынке
    }
    
    if (name.length < 10) {
      return 0.3; // Короткое название может указывать на небольшого игрока
    }
    
    return 0.6; // Средний уровень
  }

  private estimateUpdateFrequency(competitor: CompetitorInfo): UpdateFrequency {
    const name = competitor.name.toLowerCase();
    
    // Крупные маркетплейсы обновляют цены часто
    if (['wildberries', 'market', 'avito'].some(major => name.includes(major))) {
      return 'HOURLY';
    }
    
    // Региональные магазины обновляют реже
    if (name.includes('регион') || name.includes('город')) {
      return 'WEEKLY';
    }
    
    return 'DAILY'; // По умолчанию
  }

  private calculateOptimalCoefficient(competitor: CompetitorInfo): number {
    const name = competitor.name.toLowerCase();
    
    // Для премиум конкурентов можно ставить цену выше
    if (name.includes('премиум') || name.includes('люкс')) {
      return 1.1; // +10% к цене конкурента
    }
    
    // Для дискаунтеров нужно быть более агрессивным
    if (name.includes('дискаунт') || name.includes('низк')) {
      return 0.9; // -10% от цены конкурента
    }
    
    // Для основных конкурентов небольшое преимущество
    return 0.95; // -5% от цены конкурента
  }

  private generateRecommendations(competitors: AnalyzedCompetitor[]): CompetitorRecommendation[] {
    return competitors
      .map(comp => ({
        competitor: comp,
        priority: this.calculatePriority(comp),
        reasoning: this.generateReasoning(comp),
        riskLevel: this.assessRiskLevel(comp),
        expectedImpact: this.estimateImpact(comp)
      }))
      .sort((a, b) => b.priority - a.priority);
  }

  private calculatePriority(competitor: AnalyzedCompetitor): number {
    // Комплексный расчёт приоритета конкурента
    return (
      competitor.relevanceScore * 0.4 +
      competitor.marketPresence * 0.3 +
      (competitor.updateFrequency === 'HOURLY' ? 0.3 : 
       competitor.updateFrequency === 'DAILY' ? 0.2 : 0.1) * 0.2 +
      (competitor.priceLevel === 'MEDIUM' ? 0.1 : 0.05) * 0.1
    );
  }

  private generateReasoning(competitor: AnalyzedCompetitor): string {
    const reasons: string[] = [];
    
    if (competitor.relevanceScore > 0.8) {
      reasons.push('высокая релевантность для категории');
    }
    
    if (competitor.marketPresence > 0.8) {
      reasons.push('сильное присутствие на рынке');
    }
    
    if (competitor.updateFrequency === 'HOURLY') {
      reasons.push('частые обновления цен');
    }
    
    if (competitor.priceLevel === 'MEDIUM') {
      reasons.push('сбалансированный уровень цен');
    }

    return reasons.length > 0 ? reasons.join(', ') : 'стандартный анализ';
  }

  private assessRiskLevel(competitor: AnalyzedCompetitor): 'LOW' | 'MEDIUM' | 'HIGH' {
    if (competitor.updateFrequency === 'REAL_TIME' || competitor.marketPresence > 0.9) {
      return 'HIGH'; // Высокий риск ценовых войн
    }
    
    if (competitor.priceLevel === 'LOW' || competitor.updateFrequency === 'HOURLY') {
      return 'MEDIUM';
    }
    
    return 'LOW';
  }

  private estimateImpact(competitor: AnalyzedCompetitor): 'LOW' | 'MEDIUM' | 'HIGH' {
    const impactScore = competitor.relevanceScore * competitor.marketPresence;
    
    if (impactScore > 0.7) return 'HIGH';
    if (impactScore > 0.4) return 'MEDIUM';
    return 'LOW';
  }

  private calculateDiversityScore(competitors: AnalyzedCompetitor[]): number {
    // Оценка разнообразия конкурентов (избегание зависимости от одного типа)
    const priceLevels = new Set(competitors.map(c => c.priceLevel));
    const updateFrequencies = new Set(competitors.map(c => c.updateFrequency));
    
    const diversityScore = (priceLevels.size / 4) * 0.5 + (updateFrequencies.size / 4) * 0.5;
    
    return Math.min(1.0, diversityScore);
  }

  private async getAllCompetitors(): Promise<CompetitorInfo[]> {
    const allCompetitors: CompetitorInfo[] = [];
    let page = 1;

    while (true) {
      const response = await this.api.getCompetitors({ page, limit: 50 });
      
      if (!response.competitor || response.competitor.length === 0) {
        break;
      }
      
      allCompetitors.push(...response.competitor);
      
      if (response.competitor.length < 50) {
        break;
      }
      
      page++;
    }

    return allCompetitors;
  }
}

interface AnalyzedCompetitor extends CompetitorInfo {
  relevanceScore: number;              // релевантность для категории (0-1)
  priceLevel: PriceLevel;              // уровень цен конкурента
  marketPresence: number;              // присутствие на рынке (0-1)
  updateFrequency: UpdateFrequency;    // частота обновления цен
  recommendedCoefficient: number;      // рекомендуемый коэффициент
}

interface CompetitorRecommendation {
  competitor: AnalyzedCompetitor;
  priority: number;                    // приоритет использования (0-1)
  reasoning: string;                   // обоснование выбора
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH'; // уровень риска
  expectedImpact: 'LOW' | 'MEDIUM' | 'HIGH'; // ожидаемое влияние
}

interface CompetitorAnalysis {
  totalCompetitors: number;
  analyzedCompetitors: AnalyzedCompetitor[];
  recommendations: CompetitorRecommendation[];
  optimalSelection: CompetitorRecommendation[];
  diversityScore: number;
}
```

### 🤖 Автоматизированный мониторинг конкурентов

```typescript
class CompetitorMonitor {
  constructor(
    private api: PricingStrategyApi,
    private analyzer: CompetitorAnalyzer
  ) {}

  async setupCompetitorMonitoring(config: MonitoringConfig): Promise<MonitoringResult> {
    console.log('🚀 Настройка мониторинга конкурентов...');

    // Анализируем конкурентов для каждой категории
    const categoryAnalyses = new Map<string, CompetitorAnalysis>();
    
    for (const category of config.categories) {
      const analysis = await this.analyzer.analyzeCompetitorsForCategory(category);
      categoryAnalyses.set(category, analysis);
      
      console.log(`📊 ${category}: найдено ${analysis.totalCompetitors} конкурентов, рекомендовано ${analysis.optimalSelection.length}`);
    }

    // Создаём стратегии для каждой категории
    const createdStrategies: string[] = [];
    
    for (const [category, analysis] of categoryAnalyses.entries()) {
      const competitors = analysis.optimalSelection.map(rec => ({
        competitor_id: rec.competitor.id,
        coefficient: rec.competitor.recommendedCoefficient
      }));

      try {
        const strategy = await this.api.createStrategy({
          strategy_name: `Автоматическая стратегия для ${category}`,
          competitors: competitors
        });

        createdStrategies.push(strategy.result.strategy_id);
        console.log(`✅ Создана стратегия для ${category}: ${strategy.result.strategy_id}`);
      } catch (error) {
        console.error(`❌ Ошибка создания стратегии для ${category}:`, error);
      }
    }

    // Настраиваем периодический мониторинг
    if (config.enablePeriodicUpdates) {
      this.schedulePeriodicUpdates(config.updateIntervalHours);
    }

    return {
      analyzedCategories: categoryAnalyses.size,
      createdStrategies: createdStrategies.length,
      strategyIds: createdStrategies,
      averageDiversityScore: Array.from(categoryAnalyses.values())
        .reduce((sum, analysis) => sum + analysis.diversityScore, 0) / categoryAnalyses.size
    };
  }

  private schedulePeriodicUpdates(intervalHours: number): void {
    console.log(`⏰ Настройка автообновления каждые ${intervalHours} часов`);
    
    setInterval(async () => {
      try {
        console.log('🔄 Выполняется периодическое обновление конкурентов...');
        await this.performPeriodicUpdate();
        console.log('✅ Обновление завершено успешно');
      } catch (error) {
        console.error('❌ Ошибка периодического обновления:', error);
      }
    }, intervalHours * 60 * 60 * 1000);
  }

  private async performPeriodicUpdate(): Promise<void> {
    // Получаем актуальный список конкурентов
    const currentCompetitors = await this.getAllCompetitors();
    
    // Получаем существующие стратегии
    const strategies = await this.api.getStrategiesList({ page: 1, limit: 50 });
    
    // Проверяем каждую стратегию на актуальность конкурентов
    for (const strategy of strategies.strategies || []) {
      const needsUpdate = await this.checkIfStrategyNeedsUpdate(strategy.id, currentCompetitors);
      
      if (needsUpdate) {
        await this.updateStrategyCompetitors(strategy.id, currentCompetitors);
      }
    }
  }

  private async checkIfStrategyNeedsUpdate(
    strategyId: string, 
    currentCompetitors: CompetitorInfo[]
  ): Promise<boolean> {
    // Здесь должна быть логика проверки актуальности стратегии
    // В реальном приложении это включало бы:
    // - Проверку доступности конкурентов
    // - Анализ изменений в рыночной ситуации
    // - Проверку эффективности текущих коэффициентов
    
    return Math.random() > 0.8; // Заглушка: 20% стратегий требуют обновления
  }

  private async updateStrategyCompetitors(
    strategyId: string,
    competitors: CompetitorInfo[]
  ): Promise<void> {
    console.log(`🔄 Обновление конкурентов для стратегии ${strategyId}`);
    
    // Здесь должна быть логика обновления конкурентов в стратегии
    // Это может включать удаление устаревших и добавление новых конкурентов
  }

  private async getAllCompetitors(): Promise<CompetitorInfo[]> {
    const allCompetitors: CompetitorInfo[] = [];
    let page = 1;

    while (true) {
      const response = await this.api.getCompetitors({ page, limit: 50 });
      
      if (!response.competitor || response.competitor.length === 0) {
        break;
      }
      
      allCompetitors.push(...response.competitor);
      
      if (response.competitor.length < 50) {
        break;
      }
      
      page++;
    }

    return allCompetitors;
  }
}

interface MonitoringConfig {
  categories: string[];               // список категорий для мониторинга
  enablePeriodicUpdates: boolean;     // включить автообновления
  updateIntervalHours: number;        // интервал обновления в часах
}

interface MonitoringResult {
  analyzedCategories: number;         // количество проанализированных категорий
  createdStrategies: number;          // количество созданных стратегий
  strategyIds: string[];              // ID созданных стратегий
  averageDiversityScore: number;      // средний балл разнообразия
}
```

---

## 📊 Интеграция с бизнес-процессами

### Выбор оптимальных коэффициентов

```typescript
class CoefficientsOptimizer {
  constructor(private competitorAnalyzer: CompetitorAnalyzer) {}

  calculateOptimalCoefficients(
    competitors: CompetitorInfo[],
    businessGoals: BusinessGoals
  ): CompetitorConfig[] {
    return competitors.map(competitor => ({
      competitor_id: competitor.id,
      coefficient: this.calculateCoefficient(competitor, businessGoals)
    }));
  }

  private calculateCoefficient(competitor: CompetitorInfo, goals: BusinessGoals): number {
    let baseCoefficient = 0.95; // Базовый коэффициент -5%

    // Корректировка на основе бизнес-целей
    if (goals.strategy === 'AGGRESSIVE_PRICING') {
      baseCoefficient -= 0.1; // Более агрессивная цена
    } else if (goals.strategy === 'PREMIUM_POSITIONING') {
      baseCoefficient += 0.15; // Премиум позиционирование
    }

    // Корректировка на основе целевой маржи
    if (goals.targetMargin > 0.3) {
      baseCoefficient += 0.05; // Высокая маржа требует более высоких цен
    }

    // Корректировка на основе типа товара
    if (goals.productType === 'COMMODITY') {
      baseCoefficient -= 0.05; // Для товаров широкого потребления цена критична
    } else if (goals.productType === 'UNIQUE') {
      baseCoefficient += 0.1; // Уникальные товары могут быть дороже
    }

    // Ограничиваем коэффициент допустимым диапазоном
    return Math.max(0.5, Math.min(1.2, baseCoefficient));
  }
}

interface BusinessGoals {
  strategy: 'AGGRESSIVE_PRICING' | 'BALANCED' | 'PREMIUM_POSITIONING';
  targetMargin: number;               // целевая маржа (0-1)
  productType: 'COMMODITY' | 'DIFFERENTIATED' | 'UNIQUE';
  marketPosition: 'LEADER' | 'CHALLENGER' | 'FOLLOWER';
}
```

---

## 🎯 Лучшие практики работы с конкурентами

### ✅ Рекомендуемые подходы

1. **Регулярный анализ**: Обновляйте список конкурентов ежемесячно
2. **Диверсификация**: Используйте конкурентов из разных сегментов
3. **Осторожные коэффициенты**: Начинайте с консервативных значений
4. **Мониторинг результатов**: Отслеживайте влияние на продажи и маржу
5. **Гибкость**: Корректируйте стратегии на основе результатов

### ⚠️ Частые ошибки

- **Слишком агрессивные коэффициенты**: приводят к ценовым войнам
- **Игнорирование качества данных**: неточные данные конкурентов
- **Отсутствие диверсификации**: зависимость от одного типа конкурентов
- **Редкие обновления**: устаревшая информация о конкурентах
- **Игнорирование контекста**: не учёт специфики товарных категорий

### 📊 KPI для анализа конкурентов

- **Покрытие категорий**: % категорий с настроенными стратегиями
- **Качество данных**: % актуальных данных о ценах конкурентов
- **Эффективность**: изменение продаж после внедрения стратегий
- **Стабильность**: частота изменений коэффициентов