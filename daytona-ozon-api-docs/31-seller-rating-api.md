# Seller Rating API

API для получения информации о рейтингах и показателях эффективности продавца.

## Обзор

Seller Rating API предоставляет доступ к рейтингам продавца, которые влияют на видимость товаров и статус аккаунта на OZON. API позволяет отслеживать ключевые показатели эффективности, получать исторические данные и мониторить изменения рейтингов.

**📊 Соответствует разделу "Рейтинги → Рейтинги продавца" в личном кабинете**

**Ключевые возможности:**
- Получение текущих рейтингов по всем показателям
- История изменений рейтингов за любой период
- Мониторинг штрафных баллов Premium/Premium Plus
- Отслеживание индекса локализации
- Анализ статусов и пороговых значений

## Методы API

### getCurrentRatings()

Получить текущие рейтинги продавца по всем показателям.

```typescript
import { OzonSellerAPI } from 'bmad-ozon-seller-api';

const api = new OzonSellerAPI({
  clientId: 'your-client-id',
  apiKey: 'your-api-key'
});

// Получение текущих рейтингов
const currentRatings = await api.sellerRating.getCurrentRatings();

console.log(`Premium статус: ${currentRatings.premium ? 'активен' : 'неактивен'}`);
console.log(`Premium Plus статус: ${currentRatings.premium_plus ? 'активен' : 'неактивен'}`);
console.log(`Штрафные баллы превышены: ${currentRatings.penalty_score_exceeded ? 'да' : 'нет'}`);

// Обработать группы рейтингов
currentRatings.groups?.forEach(group => {
  console.log(`\nГруппа: ${group.group_name}`);
  
  group.items?.forEach(item => {
    console.log(`  Рейтинг: ${item.name} (${item.rating})`);
    console.log(`  Текущее значение: ${item.current_value}`);
    console.log(`  Предыдущее значение: ${item.past_value}`);
    console.log(`  Статус: ${item.status}`);
    console.log(`  Тип значения: ${item.value_type}`);
    console.log(`  Направление: ${item.rating_direction}`);
    
    if (item.change) {
      const changeIcon = item.change.direction === 'DIRECTION_RISE' ? '↗️' : 
                        item.change.direction === 'DIRECTION_FALL' ? '↘️' : '➡️';
      const meaningIcon = item.change.meaning === 'MEANING_GOOD' ? '✅' : 
                         item.change.meaning === 'MEANING_BAD' ? '❌' : '🔄';
      console.log(`  Изменение: ${changeIcon} ${meaningIcon}`);
    }
  });
});

// Показать информацию об индексе локализации
if (currentRatings.localization_index && currentRatings.localization_index.length > 0) {
  const locIndex = currentRatings.localization_index[0];
  console.log(`\nИндекс локализации: ${locIndex.localization_percentage}%`);
  console.log(`Дата расчёта: ${locIndex.calculation_date}`);
} else {
  console.log('\nИндекс локализации: нет данных (нет продаж за последние 14 дней)');
}

// Найти критичные рейтинги
const criticalRatings: any[] = [];
currentRatings.groups?.forEach(group => {
  group.items?.forEach(item => {
    if (item.status === 'CRITICAL') {
      criticalRatings.push(item);
    }
  });
});

if (criticalRatings.length > 0) {
  console.log('\n⚠️ КРИТИЧНЫЕ РЕЙТИНГИ:');
  criticalRatings.forEach(rating => {
    console.log(`  - ${rating.name}: ${rating.current_value}`);
  });
}
```

### getRatingHistory()

Получить историю рейтингов продавца за определенный период.

```typescript
// Получить историю основных рейтингов за последний месяц
const lastMonth = new Date();
lastMonth.setMonth(lastMonth.getMonth() - 1);

const ratingHistory = await api.sellerRating.getRatingHistory({
  date_from: lastMonth.toISOString(),
  date_to: new Date().toISOString(),
  ratings: [
    'rating_on_time',                // Заказы вовремя
    'rating_review_avg_score_total', // Средняя оценка
    'rating_price',                  // Индекс цен
    'rating_order_cancellation'      // Отмены заказов
  ],
  with_premium_scores: true
});

// Обработать рейтинги
ratingHistory.ratings?.forEach(rating => {
  console.log(`\nРейтинг: ${rating.rating}`);
  console.log(`Пороги: опасный=${rating.danger_threshold}, премиум=${rating.premium_threshold}, предупреждение=${rating.warning_threshold}`);
  
  // Показать значения по периодам
  rating.values?.forEach(value => {
    console.log(`  Период: ${value.date_from} - ${value.date_to}`);
    console.log(`  Значение: ${value.value}`);
    
    if (value.status) {
      const statusFlags = [];
      if (value.status.danger) statusFlags.push('ОПАСНО');
      if (value.status.warning) statusFlags.push('ПРЕДУПРЕЖДЕНИЕ');
      if (value.status.premium) statusFlags.push('ПРЕМИУМ');
      console.log(`  Статус: ${statusFlags.join(', ') || 'ОК'}`);
    }
  });
});

// Показать штрафные баллы Premium
if (ratingHistory.premium_scores && ratingHistory.premium_scores.length > 0) {
  console.log('\n💰 ШТРАФНЫЕ БАЛЛЫ PREMIUM:');
  ratingHistory.premium_scores.forEach(premiumScore => {
    console.log(`Рейтинг: ${premiumScore.rating}`);
    premiumScore.scores?.forEach(score => {
      console.log(`  Дата: ${score.date}`);
      console.log(`  Значение рейтинга: ${score.rating_value}`);
      console.log(`  Штрафных баллов: ${score.value}`);
    });
  });
}
```

## TypeScript Interfaces

### Request Types

```typescript
interface SellerRatingHistoryRequest {
  /** Дата начала периода в формате ISO 8601 */
  date_from: string;
  
  /** Дата окончания периода в формате ISO 8601 */
  date_to: string;
  
  /** 
   * Список рейтингов для получения истории
   * Доступные значения:
   * - rating_on_time: Заказы вовремя
   * - rating_review_avg_score_total: Средняя оценка отзывов
   * - rating_price: Индекс цен
   * - rating_order_cancellation: Отмены заказов
   * - rating_return: Возвраты
   * - rating_complaint: Жалобы
   * И другие рейтинги
   */
  ratings: string[];
  
  /** Включить информацию о штрафных баллах Premium */
  with_premium_scores?: boolean;
}
```

### Response Types

```typescript
interface SellerRatingSummaryResponse {
  /** Активен ли статус Premium */
  premium: boolean;
  
  /** Активен ли статус Premium Plus */
  premium_plus: boolean;
  
  /** Превышены ли штрафные баллы */
  penalty_score_exceeded: boolean;
  
  /** Группы рейтингов */
  groups?: RatingGroup[];
  
  /** Индекс локализации */
  localization_index?: LocalizationIndex[];
}

interface RatingGroup {
  /** Название группы рейтингов */
  group_name: string;
  
  /** Элементы рейтингов в группе */
  items?: RatingItem[];
}

interface RatingItem {
  /** Внутреннее название рейтинга */
  rating: string;
  
  /** Отображаемое название рейтинга */
  name: string;
  
  /** Текущее значение */
  current_value: string;
  
  /** Предыдущее значение */
  past_value: string;
  
  /** Статус рейтинга (OK, WARNING, CRITICAL, DANGER) */
  status: string;
  
  /** Тип значения (PERCENT, COUNT, SCORE, etc.) */
  value_type: string;
  
  /** Направление рейтинга (HIGHER_IS_BETTER, LOWER_IS_BETTER) */
  rating_direction: string;
  
  /** Информация об изменении */
  change?: RatingChange;
}

interface RatingChange {
  /** Направление изменения (DIRECTION_RISE, DIRECTION_FALL, DIRECTION_STABLE) */
  direction: string;
  
  /** Значение изменения (MEANING_GOOD, MEANING_BAD, MEANING_NEUTRAL) */
  meaning: string;
}

interface LocalizationIndex {
  /** Процент локализации */
  localization_percentage: number;
  
  /** Дата расчета индекса */
  calculation_date: string;
}

interface SellerRatingHistoryResponse {
  /** История рейтингов */
  ratings?: RatingHistory[];
  
  /** Штрафные баллы Premium */
  premium_scores?: PremiumScore[];
}

interface RatingHistory {
  /** Название рейтинга */
  rating: string;
  
  /** Пороговое значение для статуса "опасно" */
  danger_threshold: number;
  
  /** Пороговое значение для статуса Premium */
  premium_threshold: number;
  
  /** Пороговое значение для статуса "предупреждение" */
  warning_threshold: number;
  
  /** Значения рейтинга по периодам */
  values?: RatingValue[];
}

interface RatingValue {
  /** Дата начала периода */
  date_from?: string;
  
  /** Дата окончания периода */
  date_to?: string;
  
  /** Значение рейтинга */
  value: number;
  
  /** Статус рейтинга */
  status?: RatingStatus;
}

interface RatingStatus {
  /** Опасный уровень */
  danger: boolean;
  
  /** Предупреждение */
  warning: boolean;
  
  /** Уровень Premium */
  premium: boolean;
}

interface PremiumScore {
  /** Название рейтинга */
  rating: string;
  
  /** Штрафные баллы по периодам */
  scores?: PremiumScoreValue[];
}

interface PremiumScoreValue {
  /** Дата */
  date: string;
  
  /** Значение рейтинга */
  rating_value: number;
  
  /** Количество штрафных баллов */
  value: number;
}
```

## Примеры использования

### Мониторинг рейтингов

```typescript
class SellerRatingMonitor {
  constructor(private api: OzonSellerAPI) {}
  
  async monitorCurrentRatings(): Promise<RatingAlert[]> {
    const ratings = await this.api.sellerRating.getCurrentRatings();
    const alerts: RatingAlert[] = [];
    
    // Проверяем общие статусы
    if (ratings.penalty_score_exceeded) {
      alerts.push({
        level: 'CRITICAL',
        message: 'Превышены штрафные баллы Premium!',
        action: 'Требуется немедленное улучшение рейтингов'
      });
    }
    
    if (!ratings.premium) {
      alerts.push({
        level: 'WARNING',
        message: 'Статус Premium неактивен',
        action: 'Проверьте требования для Premium'
      });
    }
    
    // Анализируем рейтинги по группам
    ratings.groups?.forEach(group => {
      group.items?.forEach(item => {
        switch (item.status) {
          case 'CRITICAL':
            alerts.push({
              level: 'CRITICAL',
              message: `Критический рейтинг: ${item.name}`,
              value: item.current_value,
              action: 'Требует немедленного внимания'
            });
            break;
            
          case 'DANGER':
            alerts.push({
              level: 'DANGER',
              message: `Опасный уровень: ${item.name}`,
              value: item.current_value,
              action: 'Срочно принять меры'
            });
            break;
            
          case 'WARNING':
            if (item.change?.meaning === 'MEANING_BAD') {
              alerts.push({
                level: 'WARNING',
                message: `Ухудшение рейтинга: ${item.name}`,
                value: item.current_value,
                action: 'Мониторить изменения'
              });
            }
            break;
        }
      });
    });
    
    return alerts;
  }
  
  async generateRatingReport(periodDays: number = 30): Promise<RatingReport> {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - periodDays);
    
    // Получаем текущие рейтинги
    const currentRatings = await this.api.sellerRating.getCurrentRatings();
    
    // Получаем историю основных рейтингов
    const history = await this.api.sellerRating.getRatingHistory({
      date_from: startDate.toISOString(),
      date_to: endDate.toISOString(),
      ratings: [
        'rating_on_time',
        'rating_review_avg_score_total',
        'rating_price',
        'rating_order_cancellation',
        'rating_return',
        'rating_complaint'
      ],
      with_premium_scores: true
    });
    
    const report: RatingReport = {
      period: `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`,
      current_status: {
        premium: currentRatings.premium,
        premium_plus: currentRatings.premium_plus,
        penalty_exceeded: currentRatings.penalty_score_exceeded
      },
      rating_analysis: [],
      trends: [],
      recommendations: []
    };
    
    // Анализируем каждый рейтинг
    history.ratings?.forEach(rating => {
      const values = rating.values || [];
      if (values.length === 0) return;
      
      const latestValue = values[values.length - 1];
      const firstValue = values[0];
      
      const analysis: RatingAnalysis = {
        rating_name: rating.rating,
        current_value: latestValue.value,
        change_from_start: latestValue.value - firstValue.value,
        trend: this.calculateTrend(values),
        status: latestValue.status || { danger: false, warning: false, premium: false },
        threshold_info: {
          danger: rating.danger_threshold,
          warning: rating.warning_threshold,
          premium: rating.premium_threshold
        }
      };
      
      report.rating_analysis.push(analysis);
      
      // Генерируем рекомендации
      if (analysis.status.danger) {
        report.recommendations.push(`Критично: ${rating.rating} - требует немедленных действий`);
      } else if (analysis.status.warning && analysis.trend === 'DECLINING') {
        report.recommendations.push(`Внимание: ${rating.rating} - ухудшается, требует мониторинга`);
      } else if (analysis.trend === 'IMPROVING') {
        report.recommendations.push(`Позитив: ${rating.rating} - показывает улучшение`);
      }
    });
    
    return report;
  }
  
  private calculateTrend(values: RatingValue[]): 'IMPROVING' | 'DECLINING' | 'STABLE' {
    if (values.length < 2) return 'STABLE';
    
    const recentValues = values.slice(-3); // Последние 3 значения
    let improvements = 0;
    let declines = 0;
    
    for (let i = 1; i < recentValues.length; i++) {
      if (recentValues[i].value > recentValues[i - 1].value) {
        improvements++;
      } else if (recentValues[i].value < recentValues[i - 1].value) {
        declines++;
      }
    }
    
    if (improvements > declines) return 'IMPROVING';
    if (declines > improvements) return 'DECLINING';
    return 'STABLE';
  }
}

interface RatingAlert {
  level: 'CRITICAL' | 'DANGER' | 'WARNING' | 'INFO';
  message: string;
  value?: string;
  action: string;
}

interface RatingReport {
  period: string;
  current_status: {
    premium: boolean;
    premium_plus: boolean;
    penalty_exceeded: boolean;
  };
  rating_analysis: RatingAnalysis[];
  trends: string[];
  recommendations: string[];
}

interface RatingAnalysis {
  rating_name: string;
  current_value: number;
  change_from_start: number;
  trend: 'IMPROVING' | 'DECLINING' | 'STABLE';
  status: RatingStatus;
  threshold_info: {
    danger: number;
    warning: number;
    premium: number;
  };
}

// Использование мониторинга
const monitor = new SellerRatingMonitor(api);

// Проверка текущих рейтингов
const alerts = await monitor.monitorCurrentRatings();
if (alerts.length > 0) {
  console.log('🚨 УВЕДОМЛЕНИЯ О РЕЙТИНГАХ:');
  alerts.forEach(alert => {
    const emoji = alert.level === 'CRITICAL' ? '🚨' : 
                  alert.level === 'DANGER' ? '⚠️' : 
                  alert.level === 'WARNING' ? '⚡' : 'ℹ️';
    console.log(`${emoji} ${alert.message}`);
    if (alert.value) console.log(`   Значение: ${alert.value}`);
    console.log(`   Действие: ${alert.action}`);
  });
}

// Генерация отчета за 30 дней
const report = await monitor.generateRatingReport(30);
console.log('\n📊 ОТЧЕТ О РЕЙТИНГАХ:');
console.log(`Период: ${report.period}`);
console.log(`Premium: ${report.current_status.premium ? '✅' : '❌'}`);
console.log(`Premium Plus: ${report.current_status.premium_plus ? '✅' : '❌'}`);

if (report.recommendations.length > 0) {
  console.log('\n💡 РЕКОМЕНДАЦИИ:');
  report.recommendations.forEach(rec => console.log(`  • ${rec}`));
}
```

### Анализ трендов рейтингов

```typescript
class RatingTrendAnalyzer {
  constructor(private api: OzonSellerAPI) {}
  
  async analyzeTrends(months: number = 6): Promise<TrendAnalysis> {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - months);
    
    const history = await this.api.sellerRating.getRatingHistory({
      date_from: startDate.toISOString(),
      date_to: endDate.toISOString(),
      ratings: [
        'rating_on_time',
        'rating_review_avg_score_total',
        'rating_price',
        'rating_order_cancellation'
      ],
      with_premium_scores: true
    });
    
    const trends: TrendAnalysis = {
      period_months: months,
      rating_trends: [],
      overall_performance: 'STABLE',
      predictions: [],
      action_items: []
    };
    
    history.ratings?.forEach(rating => {
      const values = rating.values || [];
      if (values.length < 2) return;
      
      const trend = this.calculateDetailedTrend(values);
      const seasonality = this.detectSeasonality(values);
      const volatility = this.calculateVolatility(values);
      
      trends.rating_trends.push({
        rating_name: rating.rating,
        trend_direction: trend.direction,
        trend_strength: trend.strength,
        volatility_level: volatility,
        seasonality_detected: seasonality.detected,
        key_events: this.identifyKeyEvents(values, rating)
      });
      
      // Предсказания
      if (trend.direction === 'DECLINING' && trend.strength > 0.7) {
        trends.predictions.push(
          `${rating.rating} может достичь опасного уровня в течение ${this.estimateTimeToThreshold(values, rating.danger_threshold)} дней`
        );
      }
      
      // План действий
      if (volatility > 0.5) {
        trends.action_items.push(`Стабилизировать ${rating.rating} - высокая волатильность`);
      }
    });
    
    return trends;
  }
  
  private calculateDetailedTrend(values: RatingValue[]): { direction: string; strength: number } {
    // Линейная регрессия для определения тренда
    const n = values.length;
    const sumX = (n * (n + 1)) / 2;
    const sumY = values.reduce((sum, val) => sum + val.value, 0);
    const sumXY = values.reduce((sum, val, index) => sum + (index + 1) * val.value, 0);
    const sumX2 = (n * (n + 1) * (2 * n + 1)) / 6;
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const strength = Math.abs(slope) / (Math.max(...values.map(v => v.value)) - Math.min(...values.map(v => v.value)));
    
    return {
      direction: slope > 0 ? 'IMPROVING' : slope < 0 ? 'DECLINING' : 'STABLE',
      strength: Math.min(strength, 1)
    };
  }
  
  private detectSeasonality(values: RatingValue[]): { detected: boolean; period?: number } {
    if (values.length < 12) return { detected: false };
    
    // Простейший анализ сезонности на основе автокорреляции
    // В реальном приложении используйте более сложные алгоритмы
    return { detected: false };
  }
  
  private calculateVolatility(values: RatingValue[]): number {
    if (values.length < 2) return 0;
    
    const mean = values.reduce((sum, val) => sum + val.value, 0) / values.length;
    const variance = values.reduce((sum, val) => sum + Math.pow(val.value - mean, 2), 0) / values.length;
    
    return Math.sqrt(variance) / mean; // Коэффициент вариации
  }
  
  private identifyKeyEvents(values: RatingValue[], rating: RatingHistory): KeyEvent[] {
    const events: KeyEvent[] = [];
    
    values.forEach((value, index) => {
      if (index === 0) return;
      
      const prevValue = values[index - 1];
      const change = Math.abs(value.value - prevValue.value);
      const changePercent = change / prevValue.value;
      
      if (changePercent > 0.1) { // Изменение более 10%
        events.push({
          date: value.date_from || '',
          type: value.value > prevValue.value ? 'IMPROVEMENT' : 'DETERIORATION',
          magnitude: changePercent,
          description: `Значительное изменение: ${change.toFixed(2)}`
        });
      }
      
      // Пересечение пороговых значений
      if (prevValue.value > rating.danger_threshold && value.value <= rating.danger_threshold) {
        events.push({
          date: value.date_from || '',
          type: 'THRESHOLD_BREACH',
          magnitude: 1,
          description: 'Достижение опасного уровня'
        });
      }
    });
    
    return events;
  }
  
  private estimateTimeToThreshold(values: RatingValue[], threshold: number): number {
    if (values.length < 2) return 365; // По умолчанию год
    
    const trend = this.calculateDetailedTrend(values);
    if (trend.direction !== 'DECLINING') return 365;
    
    const currentValue = values[values.length - 1].value;
    const rateOfChange = Math.abs((values[values.length - 1].value - values[0].value) / values.length);
    
    if (rateOfChange === 0) return 365;
    
    return Math.max(1, Math.floor((currentValue - threshold) / rateOfChange));
  }
}

interface TrendAnalysis {
  period_months: number;
  rating_trends: RatingTrend[];
  overall_performance: 'IMPROVING' | 'DECLINING' | 'STABLE';
  predictions: string[];
  action_items: string[];
}

interface RatingTrend {
  rating_name: string;
  trend_direction: string;
  trend_strength: number;
  volatility_level: number;
  seasonality_detected: boolean;
  key_events: KeyEvent[];
}

interface KeyEvent {
  date: string;
  type: 'IMPROVEMENT' | 'DETERIORATION' | 'THRESHOLD_BREACH';
  magnitude: number;
  description: string;
}

// Использование анализа трендов
const analyzer = new RatingTrendAnalyzer(api);
const trendAnalysis = await analyzer.analyzeTrends(6);

console.log('📈 АНАЛИЗ ТРЕНДОВ РЕЙТИНГОВ:');
console.log(`Период: ${trendAnalysis.period_months} месяцев`);
console.log(`Общая производительность: ${trendAnalysis.overall_performance}`);

trendAnalysis.rating_trends.forEach(trend => {
  console.log(`\n${trend.rating_name}:`);
  console.log(`  Направление: ${trend.trend_direction}`);
  console.log(`  Сила тренда: ${(trend.trend_strength * 100).toFixed(1)}%`);
  console.log(`  Волатильность: ${(trend.volatility_level * 100).toFixed(1)}%`);
  
  if (trend.key_events.length > 0) {
    console.log('  Ключевые события:');
    trend.key_events.forEach(event => {
      console.log(`    ${event.date}: ${event.description}`);
    });
  }
});

if (trendAnalysis.predictions.length > 0) {
  console.log('\n🔮 ПРОГНОЗЫ:');
  trendAnalysis.predictions.forEach(prediction => {
    console.log(`  • ${prediction}`);
  });
}

if (trendAnalysis.action_items.length > 0) {
  console.log('\n✅ ПЛАН ДЕЙСТВИЙ:');
  trendAnalysis.action_items.forEach(action => {
    console.log(`  • ${action}`);
  });
}
```

## Комплексные сценарии

### Автоматизированная система мониторинга

```typescript
class SellerPerformanceMonitor {
  private api: OzonSellerAPI;
  private alertThresholds: AlertThresholds;
  private notificationService: NotificationService;
  
  constructor(api: OzonSellerAPI) {
    this.api = api;
    this.alertThresholds = this.initializeThresholds();
    this.notificationService = new NotificationService();
  }
  
  private initializeThresholds(): AlertThresholds {
    return {
      critical_ratings: ['rating_on_time', 'rating_review_avg_score_total'],
      penalty_threshold: 0.8, // 80% от лимита
      decline_threshold: 0.15, // 15% снижение за период
      volatility_threshold: 0.3 // 30% волатильность
    };
  }
  
  async runDailyMonitoring(): Promise<MonitoringResult> {
    console.log('🔍 Начинаем ежедневный мониторинг рейтингов...');
    
    const result: MonitoringResult = {
      timestamp: new Date().toISOString(),
      alerts: [],
      recommendations: [],
      metrics: {}
    };
    
    try {
      // Получаем текущие рейтинги
      const currentRatings = await this.api.sellerRating.getCurrentRatings();
      
      // Анализ текущего состояния
      const currentAlerts = await this.analyzeCurrentState(currentRatings);
      result.alerts.push(...currentAlerts);
      
      // Получаем историю за последние 7 дней
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      
      const recentHistory = await this.api.sellerRating.getRatingHistory({
        date_from: weekAgo.toISOString(),
        date_to: new Date().toISOString(),
        ratings: this.alertThresholds.critical_ratings,
        with_premium_scores: true
      });
      
      // Анализ трендов
      const trendAlerts = await this.analyzeTrends(recentHistory);
      result.alerts.push(...trendAlerts);
      
      // Генерируем рекомендации
      result.recommendations = await this.generateRecommendations(currentRatings, recentHistory);
      
      // Сохраняем метрики
      result.metrics = this.extractMetrics(currentRatings, recentHistory);
      
      // Отправляем уведомления при необходимости
      if (result.alerts.some(alert => alert.priority === 'HIGH')) {
        await this.notificationService.sendAlert(result);
      }
      
      console.log(`✅ Мониторинг завершен. Найдено ${result.alerts.length} предупреждений.`);
      
    } catch (error) {
      console.error('❌ Ошибка при мониторинге:', error);
      result.alerts.push({
        type: 'SYSTEM_ERROR',
        priority: 'HIGH',
        message: `Ошибка системы мониторинга: ${error.message}`
      });
    }
    
    return result;
  }
  
  private async analyzeCurrentState(ratings: SellerRatingSummaryResponse): Promise<Alert[]> {
    const alerts: Alert[] = [];
    
    // Проверка статуса Premium
    if (!ratings.premium) {
      alerts.push({
        type: 'PREMIUM_STATUS',
        priority: 'MEDIUM',
        message: 'Статус Premium неактивен',
        action: 'Проверить требования для активации Premium'
      });
    }
    
    if (ratings.penalty_score_exceeded) {
      alerts.push({
        type: 'PENALTY_EXCEEDED',
        priority: 'HIGH',
        message: 'Превышены штрафные баллы Premium',
        action: 'Срочно улучшить проблемные рейтинги'
      });
    }
    
    // Анализ рейтингов по группам
    ratings.groups?.forEach(group => {
      group.items?.forEach(item => {
        if (item.status === 'CRITICAL' || item.status === 'DANGER') {
          alerts.push({
            type: 'CRITICAL_RATING',
            priority: 'HIGH',
            message: `Критический рейтинг: ${item.name} (${item.current_value})`,
            rating: item.rating,
            current_value: item.current_value,
            action: 'Требует немедленного внимания'
          });
        }
        
        if (item.change?.direction === 'DIRECTION_FALL' && item.change?.meaning === 'MEANING_BAD') {
          alerts.push({
            type: 'DECLINING_RATING',
            priority: 'MEDIUM',
            message: `Снижение рейтинга: ${item.name}`,
            rating: item.rating,
            action: 'Мониторить дальнейшие изменения'
          });
        }
      });
    });
    
    return alerts;
  }
  
  private async analyzeTrends(history: SellerRatingHistoryResponse): Promise<Alert[]> {
    const alerts: Alert[] = [];
    
    history.ratings?.forEach(rating => {
      const values = rating.values || [];
      if (values.length < 2) return;
      
      // Проверка тренда снижения
      const recentValues = values.slice(-3);
      const isDecreasing = recentValues.every((val, i) => 
        i === 0 || val.value < recentValues[i - 1].value
      );
      
      if (isDecreasing) {
        const decline = (recentValues[0].value - recentValues[recentValues.length - 1].value) / recentValues[0].value;
        
        if (decline > this.alertThresholds.decline_threshold) {
          alerts.push({
            type: 'DECLINING_TREND',
            priority: 'MEDIUM',
            message: `Устойчивый тренд снижения: ${rating.rating}`,
            rating: rating.rating,
            decline_percentage: decline * 100,
            action: 'Принять меры для стабилизации'
          });
        }
      }
      
      // Проверка приближения к пороговым значениям
      const latestValue = values[values.length - 1];
      if (latestValue.value <= rating.danger_threshold * 1.1) { // В пределах 10% от опасного уровня
        alerts.push({
          type: 'THRESHOLD_APPROACH',
          priority: 'HIGH',
          message: `Приближение к опасному уровню: ${rating.rating}`,
          rating: rating.rating,
          current_value: latestValue.value.toString(),
          threshold: rating.danger_threshold,
          action: 'Срочно принять меры предотвращения'
        });
      }
    });
    
    return alerts;
  }
  
  private async generateRecommendations(
    current: SellerRatingSummaryResponse,
    history: SellerRatingHistoryResponse
  ): Promise<string[]> {
    const recommendations: string[] = [];
    
    // Анализируем каждый рейтинг и даем рекомендации
    history.ratings?.forEach(rating => {
      const values = rating.values || [];
      if (values.length === 0) return;
      
      const latest = values[values.length - 1];
      
      switch (rating.rating) {
        case 'rating_on_time':
          if (latest.status?.danger || latest.status?.warning) {
            recommendations.push('Улучшить своевременность доставки: проверить настройки сроков обработки заказов');
          }
          break;
          
        case 'rating_review_avg_score_total':
          if (latest.value < 4.0) {
            recommendations.push('Повысить качество товаров и сервиса для улучшения отзывов покупателей');
          }
          break;
          
        case 'rating_price':
          if (latest.status?.warning) {
            recommendations.push('Пересмотреть ценовую политику: возможно, цены выше рыночных');
          }
          break;
          
        case 'rating_order_cancellation':
          if (latest.value > 5) {
            recommendations.push('Сократить количество отмен заказов: улучшить управление запасами');
          }
          break;
      }
    });
    
    // Общие рекомендации
    if (!current.premium) {
      recommendations.push('Активировать Premium статус для получения дополнительных преимуществ');
    }
    
    if (current.penalty_score_exceeded) {
      recommendations.push('Приоритет: устранить проблемы, вызывающие штрафные баллы Premium');
    }
    
    return recommendations;
  }
  
  private extractMetrics(
    current: SellerRatingSummaryResponse,
    history: SellerRatingHistoryResponse
  ): Record<string, any> {
    const metrics: Record<string, any> = {
      premium_active: current.premium,
      premium_plus_active: current.premium_plus,
      penalty_exceeded: current.penalty_score_exceeded,
      critical_ratings_count: 0,
      warning_ratings_count: 0
    };
    
    // Подсчитываем критичные и предупреждающие рейтинги
    current.groups?.forEach(group => {
      group.items?.forEach(item => {
        if (item.status === 'CRITICAL' || item.status === 'DANGER') {
          metrics.critical_ratings_count++;
        } else if (item.status === 'WARNING') {
          metrics.warning_ratings_count++;
        }
      });
    });
    
    return metrics;
  }
}

interface AlertThresholds {
  critical_ratings: string[];
  penalty_threshold: number;
  decline_threshold: number;
  volatility_threshold: number;
}

interface MonitoringResult {
  timestamp: string;
  alerts: Alert[];
  recommendations: string[];
  metrics: Record<string, any>;
}

interface Alert {
  type: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  message: string;
  rating?: string;
  current_value?: string;
  threshold?: number;
  decline_percentage?: number;
  action?: string;
}

class NotificationService {
  async sendAlert(result: MonitoringResult): Promise<void> {
    // Имитация отправки уведомления
    console.log('📧 Отправка уведомления о критических изменениях рейтингов...');
    
    const criticalAlerts = result.alerts.filter(alert => alert.priority === 'HIGH');
    if (criticalAlerts.length > 0) {
      console.log(`🚨 Найдено ${criticalAlerts.length} критических предупреждений:`);
      criticalAlerts.forEach(alert => {
        console.log(`  - ${alert.message}`);
      });
    }
  }
}

// Использование системы мониторинга
const monitor = new SellerPerformanceMonitor(api);

// Запуск ежедневного мониторинга
const monitoringResult = await monitor.runDailyMonitoring();

// Обработка результатов
if (monitoringResult.alerts.length > 0) {
  console.log('\n📋 РЕЗУЛЬТАТЫ МОНИТОРИНГА:');
  console.log(`Время проверки: ${new Date(monitoringResult.timestamp).toLocaleString()}`);
  
  const highPriorityAlerts = monitoringResult.alerts.filter(a => a.priority === 'HIGH');
  if (highPriorityAlerts.length > 0) {
    console.log('\n🚨 КРИТИЧЕСКИЕ ПРЕДУПРЕЖДЕНИЯ:');
    highPriorityAlerts.forEach(alert => {
      console.log(`  • ${alert.message}`);
      if (alert.action) console.log(`    Действие: ${alert.action}`);
    });
  }
  
  if (monitoringResult.recommendations.length > 0) {
    console.log('\n💡 РЕКОМЕНДАЦИИ:');
    monitoringResult.recommendations.forEach(rec => {
      console.log(`  • ${rec}`);
    });
  }
}
```

## Обработка ошибок

```typescript
async function safeGetRatings() {
  try {
    const ratings = await api.sellerRating.getCurrentRatings();
    return ratings;
    
  } catch (error) {
    if (error.code === 'UNAUTHORIZED') {
      console.error('Неавторизованный доступ - проверьте API ключи');
    } else if (error.code === 'RATE_LIMIT_EXCEEDED') {
      console.error('Превышен лимит запросов - повторите через минуту');
      await new Promise(resolve => setTimeout(resolve, 60000));
      // Повторная попытка
    } else {
      console.error('Ошибка получения рейтингов:', error);
    }
    
    return null;
  }
}

// Безопасное получение истории с повторными попытками
async function getRatingHistoryWithRetry(request: SellerRatingHistoryRequest, maxRetries: number = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await api.sellerRating.getRatingHistory(request);
    } catch (error) {
      console.error(`Попытка ${attempt}/${maxRetries} не удалась:`, error.message);
      
      if (attempt === maxRetries) {
        throw new Error(`Не удалось получить историю рейтингов после ${maxRetries} попыток`);
      }
      
      // Экспоненциальная задержка
      const delay = Math.pow(2, attempt) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}
```

## Лучшие практики

### 1. Регулярный мониторинг
```typescript
// Запускайте проверку рейтингов ежедневно
setInterval(async () => {
  const alerts = await monitor.monitorCurrentRatings();
  if (alerts.length > 0) {
    // Обработать предупреждения
    await handleRatingAlerts(alerts);
  }
}, 24 * 60 * 60 * 1000); // Каждые 24 часа
```

### 2. Пороговые значения
```typescript
const RATING_THRESHOLDS = {
  CRITICAL: 0.8,    // 80% от опасного уровня
  WARNING: 0.9,     // 90% от опасного уровня
  MONITOR: 0.95     // 95% от опасного уровня
};
```

### 3. Историческое сравнение
```typescript
async function compareWithPreviousPeriod() {
  const currentPeriod = await api.sellerRating.getRatingHistory({
    date_from: '2024-01-01T00:00:00Z',
    date_to: '2024-01-31T23:59:59Z',
    ratings: ['rating_on_time']
  });
  
  const previousPeriod = await api.sellerRating.getRatingHistory({
    date_from: '2023-12-01T00:00:00Z',
    date_to: '2023-12-31T23:59:59Z',
    ratings: ['rating_on_time']
  });
  
  // Сравнить показатели
  const comparison = comparePeriods(currentPeriod, previousPeriod);
  console.log('Изменение по сравнению с предыдущим периодом:', comparison);
}
```

## Интеграция с другими API

### Связь с финансовыми данными
```typescript
async function correlateRatingsWithFinance() {
  // Получаем рейтинги
  const ratings = await api.sellerRating.getCurrentRatings();
  
  // Получаем финансовые данные (если доступно Finance API)
  // const financeData = await api.finance.getTransactionsList(...);
  
  // Анализируем корреляцию между рейтингами и продажами
  console.log('Анализ влияния рейтингов на финансовые показатели');
}
```

### Интеграция с управлением товарами
```typescript
async function optimizeProductsBasedOnRatings() {
  const ratings = await api.sellerRating.getCurrentRatings();
  
  // Находим проблемные рейтинги
  const lowRatings = findLowRatings(ratings);
  
  if (lowRatings.includes('rating_review_avg_score_total')) {
    console.log('Низкие отзывы - проверить качество товаров');
    // Получить список товаров с плохими отзывами
    // const badReviewProducts = await api.product.getList(...);
  }
  
  if (lowRatings.includes('rating_price')) {
    console.log('Проблемы с ценами - пересмотреть ценовую стратегию');
    // Получить данные о конкурентных ценах
    // const priceData = await api.pricingStrategy.getPrices(...);
  }
}

function findLowRatings(ratings: SellerRatingSummaryResponse): string[] {
  const problematic: string[] = [];
  
  ratings.groups?.forEach(group => {
    group.items?.forEach(item => {
      if (item.status === 'CRITICAL' || item.status === 'DANGER') {
        problematic.push(item.rating);
      }
    });
  });
  
  return problematic;
}
```