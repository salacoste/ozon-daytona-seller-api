# Аналитика отзывов - Review Analytics API

Аналитика отзывов представляет собой система управления статусами и автоматизации обработки отзывов на платформе OZON. Этот компонент позволяет продавцам управлять рабочими процессами, автоматизировать изменение статусов и получать детальную аналитику по взаимодействию с клиентами.

**⚠️ ТРЕБУЕТ ПОДПИСКУ PREMIUM PLUS** — доступно только для продавцов с подпиской Premium Plus.

## 📊 Обзор методов Analytics API

**Всего методов: 1** — управление статусами и аналитическая обработка

### 📋 Управление статусами (1 метод)
1. **changeStatus()** — Изменить статус отзывов на обработанный/необработанный

---

## 🔧 Технические особенности

### Система статусов отзывов
- **UNPROCESSED**: Новые отзывы, требующие внимания продавца
- **PROCESSED**: Отзывы, обработанные продавцом (с ответами или без)
- **Batch Processing**: Массовое изменение статусов до 100 отзывов за раз
- **Workflow Integration**: Интеграция с CRM и системами автоматизации

### Модель обработки отзывов
- **Статусная модель**: Двухуровневая система (UNPROCESSED → PROCESSED)
- **Автоматизация**: Возможность массового изменения статусов
- **Трекинг**: Отслеживание изменений для аналитики
- **KPI интеграция**: Влияние на показатели работы продавца

---

## 📚 TypeScript интерфейсы

### Request типы

```typescript
/**
 * Запрос изменения статуса отзывов
 * Review status change request
 */
interface ReviewChangeStatusRequest {
  /** Список идентификаторов отзывов для изменения статуса */
  review_ids: string[];
  
  /** 
   * Новый статус для отзывов
   * - PROCESSED: Отзыв обработан
   * - UNPROCESSED: Отзыв не обработан
   */
  status: 'PROCESSED' | 'UNPROCESSED';
}
```

### Response типы

```typescript
/**
 * Ответ изменения статуса отзывов
 * Review status change response
 */
interface ReviewChangeStatusResponse extends BaseResponse {
  /** Результат операции */
  result?: 'ok';
  
  /** Количество успешно обработанных отзывов */
  processed_count?: number;
  
  /** Список идентификаторов отзывов, которые не удалось обработать */
  failed_ids?: string[];
  
  /** Причины неудачной обработки для каждого failed_id */
  failure_reasons?: Array<{
    review_id: string;
    error_code: string;
    error_message: string;
  }>;
  
  readonly [key: string]: unknown;
}

/**
 * Статистические данные по статусам отзывов
 * Review status statistics
 */
interface ReviewStatusStats {
  /** Общее количество отзывов */
  total_reviews: number;
  
  /** Количество обработанных отзывов */
  processed_reviews: number;
  
  /** Количество необработанных отзывов */
  unprocessed_reviews: number;
  
  /** Процент обработанных отзывов */
  processed_percentage: number;
  
  /** Среднее время ответа на отзывы (в часах) */
  avg_response_time_hours?: number;
  
  /** Количество отзывов с ответами продавца */
  reviews_with_seller_response: number;
}
```

---

## 🎯 Практическое использование

### Базовое изменение статусов

```typescript
import { ReviewApi } from 'daytona-ozon-seller-api';

const reviewApi = new ReviewApi(httpClient);

// Отметить отзывы как обработанные
const markAsProcessed = async (reviewIds: string[]) => {
  try {
    const result = await reviewApi.changeStatus({
      review_ids: reviewIds,
      status: 'PROCESSED'
    });
    
    if (result.result === 'ok') {
      console.log(`✅ Обработано отзывов: ${result.processed_count || reviewIds.length}`);
      
      if (result.failed_ids && result.failed_ids.length > 0) {
        console.log(`⚠️ Не удалось обработать: ${result.failed_ids.length} отзывов`);
        result.failure_reasons?.forEach(failure => {
          console.log(`❌ ${failure.review_id}: ${failure.error_message}`);
        });
      }
      
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Ошибка при изменении статуса отзывов:', error);
    return false;
  }
};

// Вернуть отзывы в статус "необработанный"
const markAsUnprocessed = async (reviewIds: string[]) => {
  try {
    const result = await reviewApi.changeStatus({
      review_ids: reviewIds,
      status: 'UNPROCESSED'
    });
    
    console.log(`🔄 Возвращено в необработанные: ${result.processed_count || reviewIds.length}`);
    return result.result === 'ok';
  } catch (error) {
    console.error('Ошибка при возврате статуса отзывов:', error);
    return false;
  }
};
```

---

## 🚀 Класс ReviewAnalytics для автоматизации

```typescript
/**
 * Класс для аналитики и автоматизации обработки отзывов
 * Review analytics and automation class
 */
export class ReviewAnalytics {
  constructor(
    private readonly reviewApi: ReviewApi
  ) {}

  /**
   * Получить статистику по статусам отзывов
   * Get review status statistics
   */
  async getStatusStatistics(): Promise<ReviewStatusStats> {
    const counts = await this.reviewApi.getCount();
    const total = counts.total || 0;
    const processed = counts.processed || 0;
    const unprocessed = counts.unprocessed || 0;
    
    return {
      total_reviews: total,
      processed_reviews: processed,
      unprocessed_reviews: unprocessed,
      processed_percentage: total > 0 ? (processed / total) * 100 : 0,
      reviews_with_seller_response: 0 // Требует дополнительный запрос
    };
  }

  /**
   * Массовая обработка отзывов с retry механизмом
   * Batch process reviews with retry mechanism
   */
  async batchProcessReviews(
    reviewIds: string[],
    targetStatus: 'PROCESSED' | 'UNPROCESSED',
    options: {
      batchSize?: number;
      retryAttempts?: number;
      retryDelay?: number;
    } = {}
  ): Promise<{
    totalRequested: number;
    successfullyProcessed: number;
    failedIds: string[];
    errors: Array<{ reviewId: string; error: string }>;
  }> {
    const {
      batchSize = 50,
      retryAttempts = 3,
      retryDelay = 1000
    } = options;

    const results = {
      totalRequested: reviewIds.length,
      successfullyProcessed: 0,
      failedIds: [] as string[],
      errors: [] as Array<{ reviewId: string; error: string }>
    };

    // Разбиваем на батчи
    for (let i = 0; i < reviewIds.length; i += batchSize) {
      const batch = reviewIds.slice(i, i + batchSize);
      let attempt = 0;
      let batchSuccessful = false;

      while (attempt < retryAttempts && !batchSuccessful) {
        try {
          const response = await this.reviewApi.changeStatus({
            review_ids: batch,
            status: targetStatus
          });

          if (response.result === 'ok') {
            results.successfullyProcessed += (response.processed_count || batch.length);
            
            if (response.failed_ids) {
              results.failedIds.push(...response.failed_ids);
              response.failure_reasons?.forEach(failure => {
                results.errors.push({
                  reviewId: failure.review_id,
                  error: failure.error_message
                });
              });
            }
            
            batchSuccessful = true;
          }
        } catch (error) {
          attempt++;
          if (attempt < retryAttempts) {
            await new Promise(resolve => setTimeout(resolve, retryDelay * attempt));
          } else {
            // Если все попытки неудачны, помечаем весь батч как неудачный
            results.failedIds.push(...batch);
            results.errors.push({
              reviewId: batch.join(','),
              error: `Batch failed after ${retryAttempts} attempts: ${error}`
            });
          }
        }
      }
    }

    return results;
  }

  /**
   * Автоматическая обработка отзывов на основе критериев
   * Automatic review processing based on criteria
   */
  async autoProcessReviews(criteria: {
    maxDaysOld?: number;
    minRating?: number;
    hasSellerResponse?: boolean;
    orderStatus?: 'DELIVERED' | 'CANCELLED';
  }): Promise<{
    processed: number;
    skipped: number;
    errors: string[];
  }> {
    const results = {
      processed: 0,
      skipped: 0,
      errors: [] as string[]
    };

    try {
      // Получаем список необработанных отзывов
      const unprocessedReviews = await this.reviewApi.getList({
        limit: 100,
        status: 'UNPROCESSED',
        sort_dir: 'ASC' // Старые отзывы первыми
      });

      if (!unprocessedReviews.reviews) {
        return results;
      }

      const reviewsToProcess: string[] = [];
      const currentDate = new Date();

      for (const review of unprocessedReviews.reviews) {
        let shouldProcess = true;

        // Проверка возраста отзыва
        if (criteria.maxDaysOld) {
          const reviewDate = new Date(review.published_at);
          const daysDiff = Math.floor((currentDate.getTime() - reviewDate.getTime()) / (1000 * 60 * 60 * 24));
          if (daysDiff > criteria.maxDaysOld) {
            shouldProcess = false;
          }
        }

        // Проверка рейтинга
        if (criteria.minRating && review.rating < criteria.minRating) {
          shouldProcess = false;
        }

        // Проверка статуса заказа
        if (criteria.orderStatus && review.order_status !== criteria.orderStatus) {
          shouldProcess = false;
        }

        // Проверка наличия ответа продавца
        if (criteria.hasSellerResponse !== undefined) {
          const hasResponse = review.comments_amount > 0;
          if (criteria.hasSellerResponse !== hasResponse) {
            shouldProcess = false;
          }
        }

        if (shouldProcess) {
          reviewsToProcess.push(review.id);
        } else {
          results.skipped++;
        }
      }

      // Обрабатываем отфильтованные отзывы
      if (reviewsToProcess.length > 0) {
        const batchResult = await this.batchProcessReviews(reviewsToProcess, 'PROCESSED');
        results.processed = batchResult.successfullyProcessed;
        results.errors = batchResult.errors.map(e => `${e.reviewId}: ${e.error}`);
      }

    } catch (error) {
      results.errors.push(`Auto-processing error: ${error}`);
    }

    return results;
  }

  /**
   * Генерация отчета по производительности обработки отзывов
   * Generate review processing performance report
   */
  async generateProcessingReport(periodDays: number = 30): Promise<{
    period: string;
    stats: ReviewStatusStats;
    recommendations: string[];
    kpis: {
      responseRate: number;
      avgProcessingTime: string;
      customerSatisfactionTrend: 'improving' | 'stable' | 'declining';
    };
  }> {
    const stats = await this.getStatusStatistics();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - periodDays);
    
    const recommendations: string[] = [];
    
    // Анализ производительности и рекомендации
    if (stats.processed_percentage < 80) {
      recommendations.push('Увеличьте скорость обработки отзывов - текущий показатель ниже рекомендуемых 80%');
    }
    
    if (stats.unprocessed_reviews > 50) {
      recommendations.push('Рассмотрите возможность автоматизации обработки отзывов');
    }
    
    if (stats.reviews_with_seller_response / stats.total_reviews < 0.6) {
      recommendations.push('Увеличьте количество персональных ответов на отзывы для улучшения репутации');
    }

    return {
      period: `${periodDays} дней`,
      stats,
      recommendations,
      kpis: {
        responseRate: (stats.reviews_with_seller_response / stats.total_reviews) * 100,
        avgProcessingTime: `${stats.avg_response_time_hours || 24} часов`,
        customerSatisfactionTrend: stats.processed_percentage > 85 ? 'improving' : 'stable'
      }
    };
  }
}
```

---

## 💡 Продвинутые сценарии использования

### Автоматизированная обработка

```typescript
const analytics = new ReviewAnalytics(reviewApi);

// Автоматическая обработка старых положительных отзывов
const autoProcessPositiveReviews = async () => {
  const result = await analytics.autoProcessReviews({
    maxDaysOld: 7,           // Отзывы старше недели
    minRating: 4,            // Рейтинг 4+ звезды
    orderStatus: 'DELIVERED', // Только доставленные заказы
    hasSellerResponse: false  // Без ответа продавца
  });
  
  console.log(`📊 Результаты автообработки:`);
  console.log(`✅ Обработано: ${result.processed}`);
  console.log(`⏭️ Пропущено: ${result.skipped}`);
  console.log(`❌ Ошибки: ${result.errors.length}`);
};

// Ежедневный отчет по производительности
const generateDailyReport = async () => {
  const report = await analytics.generateProcessingReport(7); // За неделю
  
  console.log(`📈 Отчет за ${report.period}:`);
  console.log(`• Общий процент обработки: ${report.stats.processed_percentage.toFixed(1)}%`);
  console.log(`• Скорость ответа: ${report.kpis.responseRate.toFixed(1)}%`);
  console.log(`• Среднее время обработки: ${report.kpis.avgProcessingTime}`);
  
  if (report.recommendations.length > 0) {
    console.log(`💡 Рекомендации:`);
    report.recommendations.forEach(rec => console.log(`  - ${rec}`));
  }
};
```

### Workflow интеграция

```typescript
// Интеграция с CRM системой
const syncWithCRM = async (crmApi: any) => {
  const stats = await analytics.getStatusStatistics();
  
  // Отправка метрик в CRM
  await crmApi.updateMetrics('review_processing', {
    processed_percentage: stats.processed_percentage,
    pending_reviews: stats.unprocessed_reviews,
    response_rate: (stats.reviews_with_seller_response / stats.total_reviews) * 100
  });
  
  // Создание задач для менеджеров при низкой производительности
  if (stats.processed_percentage < 70) {
    await crmApi.createTask({
      type: 'review_management',
      priority: 'high',
      description: `Низкий процент обработки отзывов: ${stats.processed_percentage.toFixed(1)}%`,
      assignee: 'customer_success_manager'
    });
  }
};

// Планировщик автоматической обработки
const scheduleAutoProcessing = () => {
  // Каждый час обрабатываем положительные отзывы старше 6 часов
  setInterval(async () => {
    await analytics.autoProcessReviews({
      maxDaysOld: 0.25, // 6 часов
      minRating: 4,
      hasSellerResponse: false
    });
  }, 60 * 60 * 1000); // Каждый час

  // Ежедневно обрабатываем все отзывы старше 3 дней
  setInterval(async () => {
    await analytics.autoProcessReviews({
      maxDaysOld: 3,
      orderStatus: 'DELIVERED'
    });
  }, 24 * 60 * 60 * 1000); // Каждый день
};
```

---

## 📊 KPI и метрики эффективности

### Ключевые показатели производительности

```typescript
interface ReviewProcessingKPIs {
  // Операционные показатели
  responseTimeHours: number;        // Среднее время ответа на отзыв
  processingRate: number;           // Процент обработанных отзывов
  dailyProcessedCount: number;      // Количество обработанных отзывов в день
  
  // Качественные показатели
  customerSatisfactionScore: number; // Оценка удовлетворенности клиентов
  responseQualityScore: number;     // Качество ответов (оценка модерации)
  repeatCustomerRate: number;       // Процент повторных покупок после ответа
  
  // Репутационные метрики
  ratingImprovement: number;        // Улучшение рейтинга продавца
  negativeReviewResolutionRate: number; // Процент решенных негативных отзывов
  publicResponseVisibility: number; // Видимость ответов для других покупателей
}
```

### Бизнес-результаты

```typescript
interface ReviewBusinessImpact {
  // Влияние на продажи
  conversionRateImprovement: number; // Улучшение конверсии после ответов
  averageOrderValueChange: number;   // Изменение среднего чека
  organicTrafficGrowth: number;      // Рост органического трафика
  
  // Репутационные результаты
  brandTrustScore: number;           // Индекс доверия к бренду
  competitorAdvantage: number;       // Преимущество над конкурентами
  customerRetentionRate: number;     // Удержание клиентов
}
```

---

## ⚠️ Лимиты и ограничения

### Технические ограничения
- **Batch Size**: Максимум 100 отзывов за один запрос
- **Rate Limiting**: Не более 60 запросов в минуту
- **Timeout**: 30 секунд на обработку одного запроса
- **Retry Policy**: Максимум 3 попытки с экспоненциальным backoff

### Бизнес-ограничения
- **Premium Plus**: Обязательная подписка для всех операций
- **Модерация**: Изменение статуса не влияет на модерацию OZON
- **Публичность**: Все статусы внутренние, не видны покупателям
- **История**: Нет API для получения истории изменения статусов

---

## 🔮 Будущее развитие

### Планируемые улучшения
- **Машинное обучение**: Автоматическая категоризация отзывов по тональности
- **Predictive Analytics**: Прогнозирование негативных отзывов
- **Advanced Automation**: Умные триггеры для автоматической обработки
- **Integration Hub**: Интеграция с популярными CRM и маркетинговыми платформами

### Экспериментальные возможности
- **Sentiment Analysis**: Анализ настроений покупателей через API
- **Auto-Response**: Автоматические ответы на типовые отзывы
- **Performance Predictions**: Прогнозирование влияния ответов на продажи
- **Competitive Intelligence**: Сравнительная аналитика с конкурентами

---

## 📈 Заключение

Review Analytics API предоставляет мощный инструмент для управления репутацией и автоматизации обработки отзывов на платформе OZON. Комбинируя массовые операции со статусами, детальную аналитику и интеллектуальную автоматизацию, продавцы могут:

- **Оптимизировать workflow**: Автоматизировать рутинные задачи обработки отзывов
- **Повышать качество**: Системно улучшать качество взаимодействия с клиентами  
- **Масштабировать операции**: Эффективно обрабатывать большие объемы отзывов
- **Измерять результаты**: Отслеживать KPI и влияние на бизнес-показатели

Правильное использование этого API в сочетании с другими методами Review API позволяет создать комплексную систему управления репутацией, которая напрямую влияет на успех продаж и лояльность покупателей на платформе OZON.