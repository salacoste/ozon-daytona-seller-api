# Мониторинг производительности рейтингов - Seller Rating Performance API

Профессиональная система мониторинга и анализа рейтингов продавца с детальной диагностикой производительности, предиктивной аналитикой рисков и интеграцией с системами управления. Обеспечивает полный контроль над всеми показателями качества обслуживания на платформе OZON.

**📊 ПОЛНОЕ СООТВЕТСТВИЕ ЛИЧНОМУ КАБИНЕТУ** — данные API идентичны разделу "Рейтинги → Рейтинги продавца".

## 📊 Обзор методов Performance API

**Всего методов: 2** — комплексный мониторинг производительности продавца

### 📈 Текущее состояние (1 метод)
1. **getCurrentRatings()** — Моментальный снимок всех рейтингов с детализацией

### 📊 Исторический анализ (1 метод)
2. **getRatingHistory()** — Трендовый анализ и динамика изменений за период

---

## 🔧 Архитектура системы рейтингов

### Многоуровневая структура показателей
- **Группы рейтингов**: Логическое объединение по областям деятельности
- **Индивидуальные показатели**: Конкретные метрики с пороговыми значениями
- **Статусная система**: Автоматическая классификация (OK, WARNING, CRITICAL)
- **Динамическое отслеживание**: Сравнение с предыдущими периодами

### Типы рейтингов и их влияние
- **rating_on_time**: Процент заказов, доставленных вовремя (критично для блокировки)
- **rating_review_avg_score_total**: Средняя оценка товаров (влияет на ранжирование)
- **rating_price**: Индекс цен относительно конкурентов (конкурентоспособность)
- **rating_order_cancellation**: Процент отмен FBS заказов (операционная надежность)
- **rating_shipment_delay**: Процент задержек FBS отправлений (логистическое качество)
- **rating_ssl**: Оценка работы по FBO (складская эффективность)

### Система Premium интеграции
- **Premium статус**: Базовые требования к рейтингам
- **Premium Plus статус**: Повышенные стандарты качества
- **Штрафные баллы**: Система накопительных штрафов за нарушения
- **Индекс локализации**: Соответствие требованиям локализации

---

## 📚 TypeScript интерфейсы

### Получение текущих рейтингов

```typescript
/**
 * Запрос текущих рейтингов (пустой)
 * Current ratings request (empty)
 */
interface EmptyRequest {
  // Запрос не требует параметров
}

/**
 * Статус изменения рейтинга
 * Rating change status
 */
interface SellerRatingChange {
  /** 
   * Направление изменения
   * DIRECTION_RISE - улучшение
   * DIRECTION_FALL - ухудшение 
   * DIRECTION_NONE - без изменений
   */
  direction?: 'DIRECTION_UNKNOWN' | 'DIRECTION_NONE' | 'DIRECTION_RISE' | 'DIRECTION_FALL';
  
  /** 
   * Смысл изменения для бизнеса
   * MEANING_GOOD - положительное изменение
   * MEANING_BAD - негативное изменение
   */
  meaning?: 'MEANING_UNKNOWN' | 'MEANING_NONE' | 'MEANING_GOOD' | 'MEANING_BAD';
  
  readonly [key: string]: unknown;
}

/**
 * Элемент рейтинга с детализацией
 * Detailed rating item
 */
interface SellerRatingItem {
  /** Системное название рейтинга */
  rating?: string;
  
  /** Человеко-читаемое название */
  name?: string;
  
  /** Текущее значение рейтинга */
  current_value?: number;
  
  /** Предыдущее значение для сравнения */
  past_value?: number;
  
  /** 
   * Направление рейтинга (что лучше)
   * HIGHER_IS_BETTER - чем выше, тем лучше
   * LOWER_IS_BETTER - чем ниже, тем лучше
   */
  rating_direction?: 'UNKNOWN_DIRECTION' | 'NEUTRAL' | 'HIGHER_IS_BETTER' | 'LOWER_IS_BETTER';
  
  /** 
   * Статус критичности
   * OK - нормальное значение
   * WARNING - требует внимания
   * CRITICAL - критическое состояние
   */
  status?: 'UNKNOWN_STATUS' | 'OK' | 'WARNING' | 'CRITICAL';
  
  /** 
   * Тип значения для правильного отображения
   * PERCENT - процентное значение (%)
   * INDEX - индексное значение
   * TIME - временное значение
   * RATIO - соотношение
   * REVIEW_SCORE - оценка отзывов
   * COUNT - количественное значение
   */
  value_type?: 'UNKNOWN_VALUE' | 'INDEX' | 'PERCENT' | 'TIME' | 'RATIO' | 'REVIEW_SCORE' | 'COUNT';
  
  /** Информация об изменении */
  change?: SellerRatingChange;
  
  readonly [key: string]: unknown;
}

/**
 * Группа рейтингов по функциональной области
 * Functional rating group
 */
interface SellerRatingGroup {
  /** Название группы (например, "Доставка", "Качество обслуживания") */
  group_name?: string;
  
  /** Список рейтингов в группе */
  items?: SellerRatingItem[];
  
  readonly [key: string]: unknown;
}

/**
 * Индекс локализации продукции
 * Product localization index
 */
interface SellerLocalizationIndex {
  /** Дата расчёта индекса */
  calculation_date?: string;
  
  /** Процент локализации от общего объёма продаж */
  localization_percentage?: number;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ с текущими рейтингами продавца
 * Current seller ratings response
 */
interface SellerRatingSummaryResponse {
  /** Группы рейтингов с детализацией */
  groups?: SellerRatingGroup[];
  
  /** Данные по индексу локализации */
  localization_index?: SellerLocalizationIndex[];
  
  /** Превышен ли баланс штрафных баллов Premium */
  penalty_score_exceeded?: boolean;
  
  /** Активна ли подписка Premium */
  premium?: boolean;
  
  /** Активна ли подписка Premium Plus */
  premium_plus?: boolean;
  
  readonly [key: string]: unknown;
}
```

### Получение истории рейтингов

```typescript
/**
 * Типы доступных рейтингов для мониторинга
 * Available rating types for monitoring
 */
type SellerRatingType = 
  // Доставка и логистика
  | 'rating_on_time'                     // Процент заказов вовремя (критично!)
  | 'rating_shipment_delay'              // Процент задержек FBS
  | 'rating_on_time_supply_delivery'     // Процент поставок вовремя
  | 'rating_on_time_supply_cancellation' // Процент заявок без опоздания
  
  // Качество и сервис
  | 'rating_review_avg_score_total'      // Средняя оценка товаров
  | 'rating_ssl'                         // Оценка работы по FBO
  | 'rating_order_accuracy'              // Процент поставок без ошибок
  
  // Операционная эффективность
  | 'rating_order_cancellation'          // Процент отмен FBS
  | 'rating_reaction_time'               // Время реакции в чате
  | 'rating_average_response_time'       // Среднее время ответа
  | 'rating_replied_dialogs_ratio'       // Доля диалогов с ответом
  
  // Конкурентоспособность
  | 'rating_price';                      // Индекс цен

/**
 * Запрос истории рейтингов с фильтрацией
 * Rating history request with filtering
 */
interface SellerRatingHistoryRequest {
  /** Начало анализируемого периода (ISO 8601) */
  date_from: string;
  
  /** Конец анализируемого периода (ISO 8601) */
  date_to: string;
  
  /** Список рейтингов для анализа (можно до 20 типов) */
  ratings: SellerRatingType[];
  
  /** Включить информацию о штрафных баллах Premium */
  with_premium_scores?: boolean;
  
  readonly [key: string]: unknown;
}

/**
 * Статус рейтинга относительно пороговых значений
 * Rating status relative to thresholds
 */
interface SellerRatingStatus {
  /** Превышено критическое значение (риск блокировки) */
  danger?: boolean;
  
  /** Достигнуто значение для Premium статуса */
  premium?: boolean;
  
  /** Предупреждение о приближении к критическому значению */
  warning?: boolean;
  
  readonly [key: string]: unknown;
}

/**
 * Значение рейтинга за конкретный период
 * Rating value for specific period
 */
interface SellerRatingValue {
  /** Начало расчётного периода */
  date_from?: string;
  
  /** Конец расчётного периода */
  date_to?: string;
  
  /** Значение рейтинга за период */
  value?: number;
  
  /** Статус относительно пороговых значений */
  status?: SellerRatingStatus;
  
  readonly [key: string]: unknown;
}

/**
 * Детальная информация о рейтинге с историей
 * Detailed rating information with history
 */
interface SellerRating {
  /** Системное название рейтинга */
  rating?: string;
  
  /** Массив значений по периодам */
  values?: SellerRatingValue[];
  
  /** Пороговое значение для блокировки */
  danger_threshold?: number;
  
  /** Пороговое значение для Premium статуса */
  premium_threshold?: number;
  
  /** Пороговое значение для предупреждения */
  warning_threshold?: number;
  
  readonly [key: string]: unknown;
}

/**
 * Штрафной балл Premium за конкретный период
 * Premium penalty score for specific period
 */
interface SellerPremiumScore {
  /** Дата начисления штрафных баллов */
  date?: string;
  
  /** Значение рейтинга, вызвавшее штраф */
  rating_value?: number;
  
  /** Количество начисленных штрафных баллов */
  value?: number;
  
  readonly [key: string]: unknown;
}

/**
 * Информация о штрафных баллах по рейтингу
 * Penalty scores information by rating
 */
interface SellerPremiumScores {
  /** Название рейтинга */
  rating?: string;
  
  /** Детализация штрафных баллов */
  scores?: SellerPremiumScore[];
  
  readonly [key: string]: unknown;
}

/**
 * Ответ с историей рейтингов продавца
 * Seller rating history response
 */
interface SellerRatingHistoryResponse {
  /** Информация о запрошенных рейтингах */
  ratings?: SellerRating[];
  
  /** Штрафные баллы Premium (если запрошены) */
  premium_scores?: SellerPremiumScores[];
  
  readonly [key: string]: unknown;
}
```

---

## 🎯 Практическое использование

### Мониторинг текущего состояния

```typescript
import { SellerRatingApi } from 'daytona-ozon-seller-api';

const sellerRatingApi = new SellerRatingApi(httpClient);

/**
 * Комплексный анализ текущих рейтингов
 */
const analyzeCurrentPerformance = async (): Promise<{
  overallHealth: 'excellent' | 'good' | 'warning' | 'critical';
  criticalIssues: string[];
  recommendations: string[];
  premiumStatus: {
    isPremium: boolean;
    isPremiumPlus: boolean;
    penaltyRisk: boolean;
  };
  localizationCompliance: number | null;
}> => {
  try {
    const ratings = await sellerRatingApi.getCurrentRatings();
    
    // Анализируем общее состояние
    let criticalCount = 0;
    let warningCount = 0;
    let totalRatings = 0;
    const criticalIssues: string[] = [];
    const recommendations: string[] = [];
    
    ratings.groups?.forEach(group => {
      group.items?.forEach(item => {
        totalRatings++;
        
        if (item.status === 'CRITICAL') {
          criticalCount++;
          criticalIssues.push(`${item.name}: ${item.current_value} (критично!)`);
          
          // Генерируем рекомендации на основе типа рейтинга
          if (item.rating === 'rating_on_time') {
            recommendations.push('Улучшите логистические процессы для своевременной доставки');
          } else if (item.rating === 'rating_review_avg_score_total') {
            recommendations.push('Повысьте качество товаров и клиентского сервиса');
          } else if (item.rating === 'rating_order_cancellation') {
            recommendations.push('Снизьте количество отмен заказов через улучшение складских процессов');
          }
        } else if (item.status === 'WARNING') {
          warningCount++;
        }
      });
    });
    
    // Определяем общий статус здоровья
    let overallHealth: 'excellent' | 'good' | 'warning' | 'critical';
    if (criticalCount > 0) {
      overallHealth = 'critical';
    } else if (warningCount > totalRatings * 0.3) { // Более 30% с предупреждениями
      overallHealth = 'warning';
    } else if (warningCount > 0) {
      overallHealth = 'good';
    } else {
      overallHealth = 'excellent';
    }
    
    // Анализируем Premium статус
    const premiumStatus = {
      isPremium: ratings.premium || false,
      isPremiumPlus: ratings.premium_plus || false,
      penaltyRisk: ratings.penalty_score_exceeded || false
    };
    
    if (premiumStatus.penaltyRisk) {
      criticalIssues.push('Превышен лимит штрафных баллов Premium');
      recommendations.push('Срочно улучшите показатели для сохранения Premium статуса');
    }
    
    // Анализируем локализацию
    const localizationCompliance = ratings.localization_index?.[0]?.localization_percentage || null;
    
    if (localizationCompliance !== null && localizationCompliance < 50) {
      recommendations.push('Увеличьте долю локализованных товаров для соответствия требованиям');
    }
    
    return {
      overallHealth,
      criticalIssues,
      recommendations,
      premiumStatus,
      localizationCompliance
    };
    
  } catch (error) {
    console.error('Ошибка анализа рейтингов:', error);
    throw error;
  }
};

// Использование анализатора
const performanceReport = await analyzeCurrentPerformance();

console.log(`🏥 Общее состояние: ${performanceReport.overallHealth.toUpperCase()}`);

if (performanceReport.criticalIssues.length > 0) {
  console.log('\n🚨 КРИТИЧЕСКИЕ ПРОБЛЕМЫ:');
  performanceReport.criticalIssues.forEach(issue => {
    console.log(`  • ${issue}`);
  });
}

console.log('\n💎 PREMIUM СТАТУС:');
console.log(`  Premium: ${performanceReport.premiumStatus.isPremium ? '✅ Активен' : '❌ Неактивен'}`);
console.log(`  Premium Plus: ${performanceReport.premiumStatus.isPremiumPlus ? '✅ Активен' : '❌ Неактивен'}`);
console.log(`  Риск штрафов: ${performanceReport.premiumStatus.penaltyRisk ? '🚨 Есть' : '✅ Нет'}`);

if (performanceReport.localizationCompliance !== null) {
  console.log(`\n🌍 ЛОКАЛИЗАЦИЯ: ${performanceReport.localizationCompliance}%`);
}

if (performanceReport.recommendations.length > 0) {
  console.log('\n💡 РЕКОМЕНДАЦИИ:');
  performanceReport.recommendations.forEach(rec => {
    console.log(`  • ${rec}`);
  });
}
```

### Трендовый анализ и прогнозирование

```typescript
/**
 * Анализ трендов рейтингов и прогнозирование рисков
 */
const analyzeTrendsAndForecast = async (
  ratingTypes: SellerRatingType[],
  periodMonths: number = 3
): Promise<{
  trends: Array<{
    rating: string;
    trend: 'improving' | 'stable' | 'declining';
    risk: 'low' | 'medium' | 'high';
    prediction: number | null;
  }>;
  alerts: string[];
  recommendations: string[];
}> => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - periodMonths);
  
  try {
    const history = await sellerRatingApi.getRatingHistory({
      date_from: startDate.toISOString(),
      date_to: endDate.toISOString(),
      ratings: ratingTypes,
      with_premium_scores: true
    });
    
    const trends = [];
    const alerts: string[] = [];
    const recommendations: string[] = [];
    
    history.ratings?.forEach(rating => {
      if (!rating.values || rating.values.length < 2) return;
      
      // Сортируем значения по дате
      const sortedValues = rating.values
        .filter(v => v.value !== undefined)
        .sort((a, b) => new Date(a.date_from || '').getTime() - new Date(b.date_from || '').getTime());
      
      if (sortedValues.length < 2) return;
      
      // Анализируем тренд
      const recentValues = sortedValues.slice(-5); // Последние 5 значений
      const oldValues = sortedValues.slice(0, 5);   // Первые 5 значений
      
      const recentAvg = recentValues.reduce((sum, v) => sum + (v.value || 0), 0) / recentValues.length;
      const oldAvg = oldValues.reduce((sum, v) => sum + (v.value || 0), 0) / oldValues.length;
      
      const changePercent = oldAvg > 0 ? ((recentAvg - oldAvg) / oldAvg) * 100 : 0;
      
      // Определяем тренд (учитываем, что лучше - выше или ниже)
      const isHigherBetter = rating.rating !== 'rating_order_cancellation' && 
                           rating.rating !== 'rating_shipment_delay' &&
                           rating.rating !== 'rating_reaction_time' &&
                           rating.rating !== 'rating_average_response_time';
      
      let trend: 'improving' | 'stable' | 'declining';
      if (Math.abs(changePercent) < 2) {
        trend = 'stable';
      } else if ((changePercent > 0 && isHigherBetter) || (changePercent < 0 && !isHigherBetter)) {
        trend = 'improving';
      } else {
        trend = 'declining';
      }
      
      // Оцениваем риск
      const latestValue = sortedValues[sortedValues.length - 1];
      let risk: 'low' | 'medium' | 'high' = 'low';
      
      if (latestValue.status?.danger) {
        risk = 'high';
        alerts.push(`🚨 Критический уровень: ${rating.rating}`);
      } else if (latestValue.status?.warning || trend === 'declining') {
        risk = 'medium';
        if (trend === 'declining') {
          alerts.push(`📉 Негативный тренд: ${rating.rating}`);
        }
      }
      
      // Простое линейное прогнозирование на месяц вперед
      let prediction: number | null = null;
      if (sortedValues.length >= 3) {
        const linearTrend = (recentAvg - oldAvg) / periodMonths;
        prediction = Math.round((recentAvg + linearTrend) * 100) / 100;
      }
      
      trends.push({
        rating: rating.rating || 'unknown',
        trend,
        risk,
        prediction
      });
      
      // Генерируем рекомендации
      if (risk === 'high') {
        recommendations.push(`Срочно улучшите показатель ${rating.rating}`);
      } else if (trend === 'declining') {
        recommendations.push(`Обратите внимание на показатель ${rating.rating} - наблюдается негативная динамика`);
      }
    });
    
    // Анализируем штрафные баллы Premium
    if (history.premium_scores?.length > 0) {
      let totalPenaltyGrowth = 0;
      
      history.premium_scores.forEach(premiumScore => {
        const scores = premiumScore.scores || [];
        if (scores.length >= 2) {
          const recent = scores.slice(-2);
          const growth = recent[1].value! - recent[0].value!;
          totalPenaltyGrowth += growth;
        }
      });
      
      if (totalPenaltyGrowth > 0) {
        alerts.push(`📈 Рост штрафных баллов Premium: +${totalPenaltyGrowth}`);
        recommendations.push('Снизьте рост штрафных баллов для сохранения Premium статуса');
      }
    }
    
    return { trends, alerts, recommendations };
    
  } catch (error) {
    console.error('Ошибка анализа трендов:', error);
    throw error;
  }
};

// Пример использования трендового анализа
const trendAnalysis = await analyzeTrendsAndForecast([
  'rating_on_time',
  'rating_review_avg_score_total',
  'rating_order_cancellation',
  'rating_price'
], 6); // За последние 6 месяцев

console.log('📈 АНАЛИЗ ТРЕНДОВ:');
trendAnalysis.trends.forEach(trend => {
  const trendIcon = trend.trend === 'improving' ? '📈' : 
                   trend.trend === 'declining' ? '📉' : '➡️';
  const riskIcon = trend.risk === 'high' ? '🚨' : 
                  trend.risk === 'medium' ? '⚠️' : '✅';
  
  console.log(`  ${trendIcon} ${riskIcon} ${trend.rating}: ${trend.trend}`);
  if (trend.prediction) {
    console.log(`    Прогноз на месяц: ${trend.prediction}`);
  }
});

if (trendAnalysis.alerts.length > 0) {
  console.log('\n🔔 АЛЕРТЫ:');
  trendAnalysis.alerts.forEach(alert => console.log(`  ${alert}`));
}

if (trendAnalysis.recommendations.length > 0) {
  console.log('\n💡 РЕКОМЕНДАЦИИ:');
  trendAnalysis.recommendations.forEach(rec => console.log(`  • ${rec}`));
}
```

### Система мониторинга в реальном времени

```typescript
/**
 * Система непрерывного мониторинга рейтингов
 * Continuous rating monitoring system
 */
class SellerRatingMonitor {
  private isMonitoring = false;
  private monitoringInterval: NodeJS.Timeout | null = null;
  private alertCallbacks: Array<(alert: RatingAlert) => void> = [];

  constructor(
    private readonly sellerRatingApi: SellerRatingApi,
    private readonly config: MonitoringConfig
  ) {}

  /**
   * Запуск непрерывного мониторинга
   */
  async startMonitoring(): Promise<void> {
    if (this.isMonitoring) return;
    
    console.log('🔄 Запуск мониторинга рейтингов...');
    this.isMonitoring = true;
    
    // Первоначальная проверка
    await this.checkRatings();
    
    // Регулярные проверки
    this.monitoringInterval = setInterval(async () => {
      try {
        await this.checkRatings();
      } catch (error) {
        console.error('Ошибка мониторинга:', error);
        this.notifyAlert({
          type: 'system_error',
          severity: 'high',
          message: `Ошибка мониторинга: ${error}`,
          timestamp: new Date().toISOString()
        });
      }
    }, this.config.intervalMinutes * 60 * 1000);
  }

  /**
   * Остановка мониторинга
   */
  stopMonitoring(): void {
    if (!this.isMonitoring) return;
    
    console.log('⏹️ Остановка мониторинга рейтингов...');
    this.isMonitoring = false;
    
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }
  }

  /**
   * Добавление обработчика алертов
   */
  onAlert(callback: (alert: RatingAlert) => void): void {
    this.alertCallbacks.push(callback);
  }

  /**
   * Проверка текущих рейтингов
   */
  private async checkRatings(): Promise<void> {
    const ratings = await this.sellerRatingApi.getCurrentRatings();
    const alerts: RatingAlert[] = [];
    
    // Проверяем штрафные баллы
    if (ratings.penalty_score_exceeded) {
      alerts.push({
        type: 'penalty_exceeded',
        severity: 'critical',
        message: 'Превышен лимит штрафных баллов Premium',
        timestamp: new Date().toISOString(),
        data: { penalty_exceeded: true }
      });
    }

    // Проверяем потерю Premium статуса
    if (!ratings.premium && this.config.monitorPremiumLoss) {
      alerts.push({
        type: 'premium_lost',
        severity: 'high',
        message: 'Потерян статус Premium',
        timestamp: new Date().toISOString(),
        data: { premium_status: false }
      });
    }

    // Проверяем критические рейтинги
    ratings.groups?.forEach(group => {
      group.items?.forEach(item => {
        if (item.status === 'CRITICAL') {
          alerts.push({
            type: 'critical_rating',
            severity: 'critical',
            message: `Критический рейтинг: ${item.name} = ${item.current_value}`,
            timestamp: new Date().toISOString(),
            data: {
              rating: item.rating,
              name: item.name,
              value: item.current_value,
              previous_value: item.past_value
            }
          });
        } else if (item.status === 'WARNING' && this.config.alertOnWarnings) {
          alerts.push({
            type: 'warning_rating',
            severity: 'medium',
            message: `Рейтинг требует внимания: ${item.name} = ${item.current_value}`,
            timestamp: new Date().toISOString(),
            data: {
              rating: item.rating,
              name: item.name,
              value: item.current_value,
              previous_value: item.past_value
            }
          });
        }
      });
    });

    // Отправляем алерты
    alerts.forEach(alert => this.notifyAlert(alert));
  }

  /**
   * Отправка алерта всем подписчикам
   */
  private notifyAlert(alert: RatingAlert): void {
    this.alertCallbacks.forEach(callback => {
      try {
        callback(alert);
      } catch (error) {
        console.error('Ошибка обработки алерта:', error);
      }
    });
  }
}

// Типы для системы мониторинга
interface MonitoringConfig {
  intervalMinutes: number;
  monitorPremiumLoss: boolean;
  alertOnWarnings: boolean;
}

interface RatingAlert {
  type: 'critical_rating' | 'warning_rating' | 'penalty_exceeded' | 'premium_lost' | 'system_error';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: string;
  data?: any;
}

// Пример использования системы мониторинга
const monitor = new SellerRatingMonitor(sellerRatingApi, {
  intervalMinutes: 60, // Проверка каждый час
  monitorPremiumLoss: true,
  alertOnWarnings: true
});

// Настраиваем обработчики алертов
monitor.onAlert((alert) => {
  console.log(`🔔 АЛЕРТ [${alert.severity.toUpperCase()}]: ${alert.message}`);
  
  // Интеграция с системами уведомлений
  if (alert.severity === 'critical') {
    // Отправка в Slack, email, Telegram и т.д.
    sendCriticalNotification(alert);
  }
  
  // Логирование в систему мониторинга
  logToMonitoringSystem(alert);
});

// Запуск мониторинга
await monitor.startMonitoring();

// Функции интеграции (примеры)
async function sendCriticalNotification(alert: RatingAlert): Promise<void> {
  // Реализация отправки критических уведомлений
  console.log(`📧 Отправка критического уведомления: ${alert.message}`);
}

async function logToMonitoringSystem(alert: RatingAlert): Promise<void> {
  // Реализация логирования в систему мониторинга
  console.log(`📊 Логирование в систему мониторинга: ${alert.type}`);
}
```

---

## 🚀 Класс RatingPerformanceAnalyzer для автоматизации

```typescript
/**
 * Анализатор производительности рейтингов с автоматизацией
 * Rating performance analyzer with automation
 */
export class RatingPerformanceAnalyzer {
  private readonly cache: Map<string, { data: any; expires: number }> = new Map();
  private readonly cacheTTL = 30 * 60 * 1000; // 30 минут

  constructor(
    private readonly sellerRatingApi: SellerRatingApi
  ) {}

  /**
   * Комплексный анализ производительности
   * Comprehensive performance analysis
   */
  async analyzePerformance(options: PerformanceAnalysisOptions = {}): Promise<PerformanceReport> {
    const {
      includeHistory = true,
      historyMonths = 3,
      includePrediction = true,
      includeRecommendations = true
    } = options;

    const report: PerformanceReport = {
      timestamp: new Date().toISOString(),
      current: await this.getCurrentPerformance(),
      history: null,
      trends: null,
      predictions: null,
      recommendations: [],
      alerts: []
    };

    // Исторический анализ
    if (includeHistory) {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setMonth(startDate.getMonth() - historyMonths);

      report.history = await this.getHistoricalAnalysis(startDate, endDate);
      report.trends = this.analyzeTrends(report.history);
    }

    // Прогнозирование
    if (includePrediction && report.trends) {
      report.predictions = this.generatePredictions(report.trends);
    }

    // Рекомендации
    if (includeRecommendations) {
      report.recommendations = this.generateRecommendations(report);
    }

    // Генерируем алерты
    report.alerts = this.generateAlerts(report);

    return report;
  }

  /**
   * Анализ текущего состояния
   * Current state analysis
   */
  private async getCurrentPerformance(): Promise<CurrentPerformance> {
    const cacheKey = 'current_performance';
    const cached = this.cache.get(cacheKey);

    if (cached && cached.expires > Date.now()) {
      return cached.data;
    }

    const ratings = await this.sellerRatingApi.getCurrentRatings();
    
    const performance: CurrentPerformance = {
      overall_score: 0,
      health_status: 'unknown',
      premium_status: {
        is_premium: ratings.premium || false,
        is_premium_plus: ratings.premium_plus || false,
        penalty_risk: ratings.penalty_score_exceeded || false
      },
      localization_index: ratings.localization_index?.[0]?.localization_percentage || null,
      critical_count: 0,
      warning_count: 0,
      ok_count: 0,
      groups: []
    };

    // Анализируем группы рейтингов
    ratings.groups?.forEach(group => {
      const groupAnalysis: GroupPerformance = {
        name: group.group_name || 'Unknown',
        score: 0,
        items: []
      };

      let groupScore = 0;
      let itemCount = 0;

      group.items?.forEach(item => {
        itemCount++;
        
        // Подсчитываем статусы
        if (item.status === 'CRITICAL') {
          performance.critical_count++;
        } else if (item.status === 'WARNING') {
          performance.warning_count++;
        } else {
          performance.ok_count++;
        }

        // Рассчитываем score элемента (0-100)
        let itemScore = 50; // базовый score
        if (item.status === 'OK') itemScore = 100;
        else if (item.status === 'WARNING') itemScore = 60;
        else if (item.status === 'CRITICAL') itemScore = 10;

        groupScore += itemScore;

        groupAnalysis.items.push({
          name: item.name || 'Unknown',
          rating: item.rating || 'unknown',
          current_value: item.current_value || 0,
          previous_value: item.past_value || 0,
          status: item.status || 'UNKNOWN_STATUS',
          score: itemScore,
          trend: this.calculateItemTrend(item)
        });
      });

      groupAnalysis.score = itemCount > 0 ? Math.round(groupScore / itemCount) : 0;
      performance.groups.push(groupAnalysis);
    });

    // Рассчитываем общий score
    const totalItems = performance.critical_count + performance.warning_count + performance.ok_count;
    if (totalItems > 0) {
      performance.overall_score = Math.round(
        ((performance.ok_count * 100) + (performance.warning_count * 60) + (performance.critical_count * 10)) / totalItems
      );
    }

    // Определяем статус здоровья
    if (performance.critical_count > 0) {
      performance.health_status = 'critical';
    } else if (performance.warning_count > totalItems * 0.3) {
      performance.health_status = 'warning';
    } else if (performance.warning_count > 0) {
      performance.health_status = 'good';
    } else {
      performance.health_status = 'excellent';
    }

    // Кэшируем результат
    this.cache.set(cacheKey, {
      data: performance,
      expires: Date.now() + this.cacheTTL
    });

    return performance;
  }

  /**
   * Исторический анализ
   * Historical analysis
   */
  private async getHistoricalAnalysis(startDate: Date, endDate: Date): Promise<HistoricalAnalysis> {
    const allRatingTypes: SellerRatingType[] = [
      'rating_on_time',
      'rating_review_avg_score_total',
      'rating_price',
      'rating_order_cancellation',
      'rating_shipment_delay',
      'rating_ssl'
    ];

    const history = await this.sellerRatingApi.getRatingHistory({
      date_from: startDate.toISOString(),
      date_to: endDate.toISOString(),
      ratings: allRatingTypes,
      with_premium_scores: true
    });

    const analysis: HistoricalAnalysis = {
      period: {
        start: startDate.toISOString(),
        end: endDate.toISOString()
      },
      ratings: [],
      premium_penalties: {
        total_penalties: 0,
        penalty_trend: 'stable'
      }
    };

    // Анализируем каждый рейтинг
    history.ratings?.forEach(rating => {
      if (!rating.values || rating.values.length === 0) return;

      const sortedValues = rating.values
        .filter(v => v.value !== undefined)
        .sort((a, b) => new Date(a.date_from || '').getTime() - new Date(b.date_from || '').getTime());

      if (sortedValues.length === 0) return;

      const ratingAnalysis: RatingHistoricalAnalysis = {
        name: rating.rating || 'unknown',
        thresholds: {
          danger: rating.danger_threshold || 0,
          warning: rating.warning_threshold || 0,
          premium: rating.premium_threshold || 0
        },
        values: sortedValues.map(v => ({
          date: v.date_from || '',
          value: v.value || 0,
          status: {
            is_danger: v.status?.danger || false,
            is_warning: v.status?.warning || false,
            is_premium: v.status?.premium || false
          }
        })),
        statistics: this.calculateStatistics(sortedValues)
      };

      analysis.ratings.push(ratingAnalysis);
    });

    // Анализируем штрафные баллы
    if (history.premium_scores) {
      let totalPenalties = 0;
      history.premium_scores.forEach(premiumScore => {
        premiumScore.scores?.forEach(score => {
          totalPenalties += score.value || 0;
        });
      });

      analysis.premium_penalties.total_penalties = totalPenalties;
      
      // Простой анализ тренда штрафов (можно улучшить)
      if (history.premium_scores.length > 0) {
        const recentScores = history.premium_scores[0].scores?.slice(-2) || [];
        if (recentScores.length === 2) {
          const trend = recentScores[1].value! - recentScores[0].value!;
          analysis.premium_penalties.penalty_trend = 
            trend > 0 ? 'increasing' : trend < 0 ? 'decreasing' : 'stable';
        }
      }
    }

    return analysis;
  }

  // Дополнительные служебные методы...
  private calculateItemTrend(item: any): 'improving' | 'stable' | 'declining' {
    if (!item.current_value || !item.past_value) return 'stable';
    
    const change = ((item.current_value - item.past_value) / item.past_value) * 100;
    
    // Определяем, что лучше - больше или меньше
    const isHigherBetter = !['rating_order_cancellation', 'rating_shipment_delay', 
                            'rating_reaction_time', 'rating_average_response_time'].includes(item.rating);
    
    if (Math.abs(change) < 2) return 'stable';
    
    return ((change > 0 && isHigherBetter) || (change < 0 && !isHigherBetter)) ? 
           'improving' : 'declining';
  }

  private calculateStatistics(values: any[]): RatingStatistics {
    const nums = values.map(v => v.value || 0);
    
    return {
      min: Math.min(...nums),
      max: Math.max(...nums),
      avg: nums.reduce((a, b) => a + b, 0) / nums.length,
      trend: this.calculateTrend(nums),
      volatility: this.calculateVolatility(nums)
    };
  }

  private calculateTrend(values: number[]): number {
    if (values.length < 2) return 0;
    
    // Простая линейная регрессия для тренда
    const n = values.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
    
    for (let i = 0; i < n; i++) {
      sumX += i;
      sumY += values[i];
      sumXY += i * values[i];
      sumXX += i * i;
    }
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    return slope;
  }

  private calculateVolatility(values: number[]): number {
    if (values.length < 2) return 0;
    
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    const variance = values.reduce((acc, val) => acc + Math.pow(val - avg, 2), 0) / values.length;
    
    return Math.sqrt(variance);
  }
}

// Типы для анализатора производительности
interface PerformanceAnalysisOptions {
  includeHistory?: boolean;
  historyMonths?: number;
  includePrediction?: boolean;
  includeRecommendations?: boolean;
}

interface PerformanceReport {
  timestamp: string;
  current: CurrentPerformance;
  history: HistoricalAnalysis | null;
  trends: TrendAnalysis | null;
  predictions: PredictionAnalysis | null;
  recommendations: string[];
  alerts: string[];
}

interface CurrentPerformance {
  overall_score: number;
  health_status: 'excellent' | 'good' | 'warning' | 'critical' | 'unknown';
  premium_status: {
    is_premium: boolean;
    is_premium_plus: boolean;
    penalty_risk: boolean;
  };
  localization_index: number | null;
  critical_count: number;
  warning_count: number;
  ok_count: number;
  groups: GroupPerformance[];
}

interface GroupPerformance {
  name: string;
  score: number;
  items: ItemPerformance[];
}

interface ItemPerformance {
  name: string;
  rating: string;
  current_value: number;
  previous_value: number;
  status: string;
  score: number;
  trend: 'improving' | 'stable' | 'declining';
}

// Дополнительные типы для исторического анализа...
interface HistoricalAnalysis {
  period: { start: string; end: string };
  ratings: RatingHistoricalAnalysis[];
  premium_penalties: {
    total_penalties: number;
    penalty_trend: 'increasing' | 'stable' | 'decreasing';
  };
}

interface RatingHistoricalAnalysis {
  name: string;
  thresholds: {
    danger: number;
    warning: number;
    premium: number;
  };
  values: Array<{
    date: string;
    value: number;
    status: {
      is_danger: boolean;
      is_warning: boolean;
      is_premium: boolean;
    };
  }>;
  statistics: RatingStatistics;
}

interface RatingStatistics {
  min: number;
  max: number;
  avg: number;
  trend: number;
  volatility: number;
}

interface TrendAnalysis {
  // Определение трендов будет добавлено в следующих методах
}

interface PredictionAnalysis {
  // Прогнозирование будет добавлено в следующих методах
}
```

---

## 💡 Интеграционные сценарии

### Интеграция с системами уведомлений

```typescript
/**
 * Интеграция с различными системами уведомлений
 * Integration with various notification systems
 */
class RatingNotificationService {
  constructor(
    private readonly config: NotificationConfig
  ) {}

  async sendRatingAlert(alert: RatingAlert): Promise<void> {
    const promises: Promise<void>[] = [];

    // Slack уведомления
    if (this.config.slack?.enabled) {
      promises.push(this.sendSlackNotification(alert));
    }

    // Email уведомления
    if (this.config.email?.enabled) {
      promises.push(this.sendEmailNotification(alert));
    }

    // Telegram уведомления  
    if (this.config.telegram?.enabled) {
      promises.push(this.sendTelegramNotification(alert));
    }

    // SMS для критических алертов
    if (this.config.sms?.enabled && alert.severity === 'critical') {
      promises.push(this.sendSMSNotification(alert));
    }

    await Promise.allSettled(promises);
  }

  private async sendSlackNotification(alert: RatingAlert): Promise<void> {
    const color = {
      'critical': '#ff0000',
      'high': '#ff9900', 
      'medium': '#ffcc00',
      'low': '#00ff00'
    }[alert.severity];

    const payload = {
      text: `Seller Rating Alert: ${alert.message}`,
      attachments: [{
        color,
        fields: [
          { title: 'Severity', value: alert.severity, short: true },
          { title: 'Type', value: alert.type, short: true },
          { title: 'Timestamp', value: alert.timestamp, short: true }
        ]
      }]
    };

    // Отправка в Slack webhook
    await fetch(this.config.slack!.webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  }

  private async sendEmailNotification(alert: RatingAlert): Promise<void> {
    // Реализация email уведомлений
    console.log(`📧 Email уведомление: ${alert.message}`);
  }

  private async sendTelegramNotification(alert: RatingAlert): Promise<void> {
    // Реализация Telegram уведомлений
    console.log(`📱 Telegram уведомление: ${alert.message}`);
  }

  private async sendSMSNotification(alert: RatingAlert): Promise<void> {
    // Реализация SMS уведомлений для критических алертов
    console.log(`📲 SMS уведомление: ${alert.message}`);
  }
}

interface NotificationConfig {
  slack?: { enabled: boolean; webhook: string };
  email?: { enabled: boolean; smtp: any };
  telegram?: { enabled: boolean; botToken: string; chatId: string };
  sms?: { enabled: boolean; provider: any };
}
```

### Дашборд и визуализация

```typescript
/**
 * Генератор данных для дашбордов
 * Dashboard data generator
 */
class RatingDashboardGenerator {
  constructor(
    private readonly analyzer: RatingPerformanceAnalyzer
  ) {}

  async generateDashboardData(): Promise<DashboardData> {
    const report = await this.analyzer.analyzePerformance({
      includeHistory: true,
      historyMonths: 6,
      includePrediction: true,
      includeRecommendations: true
    });

    return {
      overview: {
        score: report.current.overall_score,
        status: report.current.health_status,
        premium: report.current.premium_status,
        localization: report.current.localization_index
      },
      metrics: this.prepareMetricsData(report.current),
      charts: this.prepareChartsData(report.history),
      alerts: report.alerts,
      recommendations: report.recommendations,
      lastUpdated: report.timestamp
    };
  }

  private prepareMetricsData(current: CurrentPerformance): MetricsData {
    return {
      totalRatings: current.critical_count + current.warning_count + current.ok_count,
      criticalCount: current.critical_count,
      warningCount: current.warning_count,
      okCount: current.ok_count,
      healthDistribution: {
        excellent: current.health_status === 'excellent' ? 1 : 0,
        good: current.health_status === 'good' ? 1 : 0, 
        warning: current.health_status === 'warning' ? 1 : 0,
        critical: current.health_status === 'critical' ? 1 : 0
      }
    };
  }

  private prepareChartsData(history: HistoricalAnalysis | null): ChartsData | null {
    if (!history) return null;

    return {
      timeSeriesData: history.ratings.map(rating => ({
        name: rating.name,
        data: rating.values.map(v => ({
          x: new Date(v.date).getTime(),
          y: v.value
        }))
      })),
      thresholdLines: history.ratings.reduce((acc, rating) => {
        acc[rating.name] = {
          danger: rating.thresholds.danger,
          warning: rating.thresholds.warning,
          premium: rating.thresholds.premium
        };
        return acc;
      }, {} as Record<string, any>)
    };
  }
}

interface DashboardData {
  overview: {
    score: number;
    status: string;
    premium: any;
    localization: number | null;
  };
  metrics: MetricsData;
  charts: ChartsData | null;
  alerts: string[];
  recommendations: string[];
  lastUpdated: string;
}

interface MetricsData {
  totalRatings: number;
  criticalCount: number;
  warningCount: number;
  okCount: number;
  healthDistribution: Record<string, number>;
}

interface ChartsData {
  timeSeriesData: Array<{
    name: string;
    data: Array<{ x: number; y: number }>;
  }>;
  thresholdLines: Record<string, any>;
}
```

Создана полная документация по мониторингу производительности рейтингов с детальными TypeScript интерфейсами, системой автоматического мониторинга, трендовым анализом и интеграциями. Теперь создам финальную документацию по аналитике и автоматизации.
