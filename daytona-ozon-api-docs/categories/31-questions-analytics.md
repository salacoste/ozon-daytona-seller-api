# Аналитика вопросов - Questions & Answers Analytics API

Аналитический API для анализа активности вопросов от покупателей на платформе OZON. Позволяет выявлять товары с наибольшим количеством вопросов для оптимизации контента и улучшения описаний.

**⚠️ ТРЕБУЕТ ПОДПИСКУ PREMIUM PLUS** — все методы доступны только для продавцов с подпиской Premium Plus.

---

## 📊 Метод аналитики

### 1. getTopSKUWithQuestions()
Получение списка товаров с наибольшим количеством вопросов от покупателей за указанный период.

**Применение**: Выявление товаров, требующих улучшения описаний или дополнительной информации.

#### Типизация запроса
```typescript
interface GetTopSKUWithQuestionsRequest {
  /** Ограничение на количество товаров в ответе */
  limit: number;
  
  /** Фильтры для аналитики (опционально) */
  filter?: {
    /** Период анализа - начальная дата */
    date_from?: string; // ISO 8601 format
    
    /** Период анализа - конечная дата */
    date_to?: string; // ISO 8601 format
    
    /** Минимальное количество вопросов для включения в результат */
    min_questions_count?: number;
  };
}
```

#### Типизация ответа
```typescript
interface GetTopSKUWithQuestionsResponse {
  /** Статус выполнения запроса */
  result: 'success' | 'error';
  
  /** Список товаров с аналитикой вопросов */
  items?: Array<{
    /** SKU товара */
    sku: number;
    
    /** Название товара */
    name: string;
    
    /** Общее количество вопросов */
    questions_count: number;
    
    /** Количество новых вопросов (требующих ответа) */
    new_questions_count: number;
    
    /** Количество отвеченных вопросов */
    answered_questions_count: number;
    
    /** Процент отвеченных вопросов */
    answer_rate: number;
    
    /** Средняя оценка полезности ответов */
    average_answer_rating?: number;
    
    /** Дата последнего вопроса */
    last_question_date?: string;
    
    /** Категория товара */
    category?: string;
    
    /** URL товара в магазине */
    product_url?: string;
  }>;
  
  /** Общая статистика */
  statistics?: {
    /** Общее количество проанализированных товаров */
    total_products_analyzed: number;
    
    /** Общее количество вопросов за период */
    total_questions_period: number;
    
    /** Средний процент ответов по всем товарам */
    average_response_rate: number;
  };
  
  /** Ошибка, если result = 'error' */
  error?: {
    code: string;
    message: string;
  };
}
```

---

## 🔧 Практические примеры использования

### Базовый пример получения топ-товаров
```typescript
import { QuestionsAnswersApi } from 'daytona-ozon-seller-api';

const qaApi = new QuestionsAnswersApi(httpClient);

try {
  // Получить топ-10 товаров с наибольшим количеством вопросов
  const analytics = await qaApi.getTopSKUWithQuestions({
    limit: 10
  });

  if (analytics.result === 'success' && analytics.items) {
    console.log('📊 Товары с наибольшим количеством вопросов:');
    
    analytics.items.forEach((item, index) => {
      console.log(`${index + 1}. ${item.name}`);
      console.log(`   SKU: ${item.sku}`);
      console.log(`   Всего вопросов: ${item.questions_count}`);
      console.log(`   Новых вопросов: ${item.new_questions_count}`);
      console.log(`   Процент ответов: ${item.answer_rate}%`);
      console.log('---');
    });
    
    // Общая статистика
    if (analytics.statistics) {
      console.log(`\n📈 Общая статистика:`);
      console.log(`Проанализировано товаров: ${analytics.statistics.total_products_analyzed}`);
      console.log(`Всего вопросов: ${analytics.statistics.total_questions_period}`);
      console.log(`Средний % ответов: ${analytics.statistics.average_response_rate}%`);
    }
  }
} catch (error) {
  console.error('❌ Ошибка получения аналитики:', error);
}
```

### Расширенная аналитика с фильтрами
```typescript
// Анализ за последний месяц с минимальным порогом
const monthlyAnalytics = await qaApi.getTopSKUWithQuestions({
  limit: 20,
  filter: {
    date_from: '2024-01-01T00:00:00Z',
    date_to: '2024-01-31T23:59:59Z',
    min_questions_count: 5 // Только товары с 5+ вопросами
  }
});

if (monthlyAnalytics.result === 'success' && monthlyAnalytics.items) {
  // Выявление проблемных товаров (низкий процент ответов)
  const problematicProducts = monthlyAnalytics.items.filter(item => 
    item.answer_rate < 50
  );

  if (problematicProducts.length > 0) {
    console.log('🚨 Товары требующие внимания (< 50% ответов):');
    problematicProducts.forEach(product => {
      console.log(`- ${product.name} (SKU: ${product.sku})`);
      console.log(`  Вопросов: ${product.questions_count}, Ответов: ${product.answer_rate}%`);
    });
  }
  
  // Товары с высокой активностью вопросов
  const highActivityProducts = monthlyAnalytics.items.filter(item => 
    item.questions_count > 20
  );

  console.log('\n🔥 Товары с высокой активностью (20+ вопросов):');
  highActivityProducts.forEach(product => {
    console.log(`- ${product.name}: ${product.questions_count} вопросов`);
  });
}
```

---

## 🤖 Автоматизация аналитики

### Класс QuestionsAnalyzer
Автоматизированная система анализа вопросов для выявления проблем и возможностей улучшения.

```typescript
interface AnalyticsConfig {
  /** Минимальный порог вопросов для анализа */
  minQuestionsThreshold: number;
  
  /** Критический порог процента ответов */
  criticalResponseRate: number;
  
  /** Период анализа в днях */
  analysisPeriodDays: number;
  
  /** Размер выборки для анализа */
  sampleSize: number;
}

interface ProductAnalysis {
  sku: number;
  name: string;
  issues: string[];
  recommendations: string[];
  priority: 'high' | 'medium' | 'low';
  questionsCount: number;
  responseRate: number;
}

class QuestionsAnalyzer {
  private qaApi: QuestionsAnswersApi;
  private config: AnalyticsConfig;

  constructor(qaApi: QuestionsAnswersApi, config: AnalyticsConfig) {
    this.qaApi = qaApi;
    this.config = config;
  }

  /**
   * Комплексный анализ товаров с вопросами
   */
  async performComprehensiveAnalysis(): Promise<ProductAnalysis[]> {
    try {
      // Получение данных за период
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - this.config.analysisPeriodDays);

      const analytics = await this.qaApi.getTopSKUWithQuestions({
        limit: this.config.sampleSize,
        filter: {
          date_from: startDate.toISOString(),
          date_to: endDate.toISOString(),
          min_questions_count: this.config.minQuestionsThreshold
        }
      });

      if (analytics.result !== 'success' || !analytics.items) {
        throw new Error('Не удалось получить данные аналитики');
      }

      return analytics.items.map(item => this.analyzeProduct(item));
    } catch (error) {
      console.error('❌ Ошибка анализа:', error);
      return [];
    }
  }

  /**
   * Анализ отдельного товара
   */
  private analyzeProduct(item: any): ProductAnalysis {
    const issues: string[] = [];
    const recommendations: string[] = [];
    let priority: 'high' | 'medium' | 'low' = 'low';

    // Анализ процента ответов
    if (item.answer_rate < this.config.criticalResponseRate) {
      issues.push('Низкий процент ответов на вопросы');
      recommendations.push('Увеличить скорость ответа на вопросы');
      priority = 'high';
    } else if (item.answer_rate < 70) {
      issues.push('Средний процент ответов');
      recommendations.push('Оптимизировать процесс ответа на вопросы');
      priority = priority === 'high' ? 'high' : 'medium';
    }

    // Анализ количества новых вопросов
    if (item.new_questions_count > 10) {
      issues.push('Много неотвеченных вопросов');
      recommendations.push('Приоритезировать ответы на новые вопросы');
      priority = 'high';
    }

    // Анализ общего количества вопросов
    if (item.questions_count > 30) {
      issues.push('Высокая активность вопросов указывает на проблемы в описании');
      recommendations.push('Улучшить описание товара на основе частых вопросов');
    }

    // Анализ оценки ответов
    if (item.average_answer_rating && item.average_answer_rating < 3.0) {
      issues.push('Низкая оценка полезности ответов');
      recommendations.push('Улучшить качество ответов, добавить больше деталей');
    }

    return {
      sku: item.sku,
      name: item.name,
      issues,
      recommendations,
      priority,
      questionsCount: item.questions_count,
      responseRate: item.answer_rate
    };
  }

  /**
   * Генерация отчёта с приоритизацией задач
   */
  async generateActionReport(): Promise<string> {
    const analyses = await this.performComprehensiveAnalysis();
    
    const highPriority = analyses.filter(a => a.priority === 'high');
    const mediumPriority = analyses.filter(a => a.priority === 'medium');
    const lowPriority = analyses.filter(a => a.priority === 'low');

    let report = '📊 ОТЧЁТ АНАЛИЗА ВОПРОСОВ И ОТВЕТОВ\n\n';
    
    if (highPriority.length > 0) {
      report += '🚨 ВЫСОКИЙ ПРИОРИТЕТ (требует немедленного внимания):\n\n';
      highPriority.forEach(analysis => {
        report += `${analysis.name} (SKU: ${analysis.sku})\n`;
        report += `  Вопросов: ${analysis.questionsCount}, Ответов: ${analysis.responseRate}%\n`;
        report += `  Проблемы: ${analysis.issues.join(', ')}\n`;
        report += `  Рекомендации: ${analysis.recommendations.join(', ')}\n\n`;
      });
    }

    if (mediumPriority.length > 0) {
      report += '⚠️ СРЕДНИЙ ПРИОРИТЕТ:\n\n';
      mediumPriority.forEach(analysis => {
        report += `${analysis.name} (SKU: ${analysis.sku})\n`;
        report += `  Рекомендации: ${analysis.recommendations.join(', ')}\n\n`;
      });
    }

    // Общие рекомендации
    report += '💡 ОБЩИЕ РЕКОМЕНДАЦИИ:\n\n';
    report += '1. Регулярно отвечайте на новые вопросы (цель: в течение 24 часов)\n';
    report += '2. Анализируйте частые вопросы для улучшения описаний товаров\n';
    report += '3. Создавайте FAQ секции для популярных товаров\n';
    report += '4. Мониторьте оценки полезности ваших ответов\n';

    return report;
  }

  /**
   * Автоматическое выявление трендов в вопросах
   */
  async identifyQuestionTrends(): Promise<{
    category: string;
    commonQuestions: string[];
    suggestedImprovements: string[];
  }[]> {
    // В реальном приложении здесь был бы анализ текста вопросов
    // Пока возвращаем базовые категории для примера
    return [
      {
        category: 'Размеры и характеристики',
        commonQuestions: [
          'Какие размеры доступны?',
          'Какой материал?',
          'Сколько весит товар?'
        ],
        suggestedImprovements: [
          'Добавить таблицу размеров',
          'Указать материал в описании',
          'Добавить вес в характеристики'
        ]
      },
      {
        category: 'Доставка и наличие',
        commonQuestions: [
          'Когда будет в наличии?',
          'Сколько стоит доставка?',
          'Можно ли забрать самовывозом?'
        ],
        suggestedImprovements: [
          'Обновлять информацию о наличии',
          'Указать условия доставки',
          'Добавить информацию о пунктах выдачи'
        ]
      }
    ];
  }
}
```

### Пример использования класса аналитики
```typescript
const analyzer = new QuestionsAnalyzer(qaApi, {
  minQuestionsThreshold: 5,
  criticalResponseRate: 50,
  analysisPeriodDays: 30,
  sampleSize: 50
});

// Получение отчёта с рекомендациями
const report = await analyzer.generateActionReport();
console.log(report);

// Анализ трендов в вопросах
const trends = await analyzer.identifyQuestionTrends();
trends.forEach(trend => {
  console.log(`\n📂 Категория: ${trend.category}`);
  console.log(`Частые вопросы: ${trend.commonQuestions.join(', ')}`);
  console.log(`Улучшения: ${trend.suggestedImprovements.join(', ')}`);
});
```

---

## 📈 KPI и метрики эффективности

### Ключевые показатели аналитики
- **Топ проблемных товаров**: Товары с наибольшим количеством вопросов
- **Процент покрытия ответами**: Доля отвеченных вопросов от общего количества
- **Скорость реакции**: Среднее время от вопроса до ответа
- **Качество ответов**: Средняя оценка полезности от покупателей

### Бизнес-метрики
- **Конверсия после ответа**: Процент покупок после получения ответа
- **Снижение возвратов**: Связь качества Q&A с уровнем возвратов
- **Улучшение рейтинга**: Влияние активной работы с вопросами на рейтинг товара
- **Оптимизация контента**: Метрики улучшения описаний на основе вопросов

---

## 💡 Лучшие практики использования

### Регулярный мониторинг
```typescript
// Еженедельная проверка проблемных товаров
const weeklyCheck = async () => {
  const analytics = await qaApi.getTopSKUWithQuestions({
    limit: 20,
    filter: {
      min_questions_count: 3
    }
  });

  // Выявление товаров с критически низким процентом ответов
  const criticalProducts = analytics.items?.filter(item => 
    item.answer_rate < 30 && item.new_questions_count > 0
  );

  if (criticalProducts && criticalProducts.length > 0) {
    console.log('🚨 Критически важно: отвечайте на вопросы по этим товарам!');
    criticalProducts.forEach(product => {
      console.log(`- ${product.name}: ${product.new_questions_count} новых вопросов`);
    });
  }
};

// Запуск еженедельной проверки
setInterval(weeklyCheck, 7 * 24 * 60 * 60 * 1000); // раз в неделю
```

### Интеграция с системами аналитики
- **Дашборды**: Визуализация данных в реальном времени
- **Алерты**: Автоматические уведомления о критических ситуациях
- **Отчётность**: Регулярные отчёты для менеджмента
- **A/B тестирование**: Тестирование влияния улучшений описаний

### Оптимизация работы с вопросами
- **Приоритизация**: Фокус на товарах с высокой активностью вопросов
- **Шаблоны ответов**: Создание шаблонов для часто задаваемых вопросов
- **Превентивные меры**: Улучшение описаний на основе анализа вопросов
- **Командная работа**: Распределение ответственности между сотрудниками

---

## ⚠️ Ограничения и особенности

### Технические ограничения
- **Подписка Premium Plus**: Обязательна для доступа к аналитике
- **Лимиты API**: Стандартные ограничения на количество запросов
- **Глубина истории**: Ограниченный период доступных данных
- **Обновление данных**: Данные могут обновляться с задержкой

### Рекомендации по использованию
- Используйте аналитику для планирования работы службы поддержки
- Регулярно анализируйте тренды для предотвращения проблем
- Интегрируйте данные с системами управления контентом
- Мониторьте влияние улучшений на метрики вопросов

---

## 🔮 Планы развития аналитики

### Будущие возможности
- **ИИ-анализ текста вопросов**: Автоматическая категоризация и анализ тем
- **Прогнозная аналитика**: Предсказание популярных вопросов
- **Интеграция с контентом**: Автоматические рекомендации по улучшению описаний
- **Сентимент-анализ**: Анализ тональности вопросов и ответов