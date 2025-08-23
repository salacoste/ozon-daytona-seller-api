# Questions & Answers API

Questions & Answers API для управления вопросами и ответами с 8 методами для взаимодействия с покупателями.

## Обзор

Questions & Answers API предоставляет инструменты для управления системой вопросов и ответов на товары. Доступно для продавцов с подпиской Premium Plus.

**Основные возможности:**
- 💬 Создание и управление ответами на вопросы покупателей  
- 📊 Получение статистики по вопросам
- 🔍 Фильтрация и поиск вопросов по статусам
- 📈 Анализ топовых товаров по количеству вопросов
- ⚙️ Массовое изменение статусов вопросов
- 🎯 Улучшение качества обслуживания клиентов

**Требования:** Подписка Premium Plus

## Доступные методы

### Управление ответами

**createAnswer(request)** - Создать ответ на вопрос
```typescript
const answer = await questionsAnswersApi.createAnswer({
  question_id: 'question-123',
  sku: 123456789,
  text: 'Да, товар совместим с указанной моделью.'
});
```

**deleteAnswer(request)** - Удалить ответ
```typescript
const result = await questionsAnswersApi.deleteAnswer({
  answer_id: 'answer-456',
  sku: 123456789
});
```

**getAnswerList(request)** - Список ответов на вопрос
```typescript
const answers = await questionsAnswersApi.getAnswerList({
  question_id: 'question-123',
  sku: 123456789
});
```

### Управление вопросами

**getQuestionInfo(request)** - Информация о вопросе
```typescript
const question = await questionsAnswersApi.getQuestionInfo({
  question_id: 'question-123'
});
```

**getQuestionList(request?)** - Список вопросов
```typescript
const questions = await questionsAnswersApi.getQuestionList({
  filter: {
    status: 'NEW',
    date_from: '2024-01-01T00:00:00Z'
  }
});
```

**changeQuestionStatus(request)** - Изменить статус вопросов
```typescript
const result = await questionsAnswersApi.changeQuestionStatus({
  question_ids: ['question-1', 'question-2'],
  status: 'PROCESSED'
});
```

### Аналитика и статистика

**getQuestionCount(request?)** - Количество вопросов по статусам
```typescript
const counts = await questionsAnswersApi.getQuestionCount();
```

**getTopQuestionedProducts(request)** - Товары с наибольшим количеством вопросов
```typescript
const topProducts = await questionsAnswersApi.getTopQuestionedProducts({
  limit: 10
});
```

## TypeScript интерфейсы

```typescript
// Основные запросы
interface QuestionAnswerCreateRequest {
  question_id: string;
  sku: number;
  text: string;
}

interface QuestionAnswerDeleteRequest {
  answer_id: string;
  sku: number;
}

interface QuestionAnswerListRequest {
  question_id: string;
  sku: number;
  limit?: number;
  last_id?: string;
}

interface QuestionChangeStatusRequest {
  question_ids: string[];
  status: "NEW" | "VIEWED" | "PROCESSED" | "UNPROCESSED";
}

interface QuestionCountRequest {
  // Пустой объект
}

interface QuestionInfoRequest {
  question_id: string;
}

interface QuestionListRequest {
  filter?: {
    status?: "NEW" | "VIEWED" | "PROCESSED" | "UNPROCESSED";
    date_from?: string;
    date_to?: string;
    sku?: number[];
  };
  limit?: number;
  last_id?: string;
}

interface QuestionTopSkuRequest {
  limit: number;
  date_from?: string;
  date_to?: string;
}

// Ответы
interface QuestionAnswerCreateResponse {
  answer_id: string;
  result: "ok" | "error";
}

interface QuestionAnswerDeleteResponse {
  result: "ok" | "error";
}

interface QuestionAnswerListResponse {
  answers: Array<{
    answer_id: string;
    author_name: string;
    author_type: "SELLER" | "BUYER" | "OZON";
    text: string;
    created_at: string;
    updated_at: string;
    is_seller_answer: boolean;
  }>;
  total: number;
  last_id?: string;
  has_next: boolean;
}

interface QuestionChangeStatusResponse {
  result: "ok" | "error";
  processed_count?: number;
  errors?: Array<{
    question_id: string;
    error_message: string;
  }>;
}

interface QuestionCountResponse {
  all: number;
  new: number;
  viewed: number;
  processed: number;
  unprocessed: number;
  answered: number;
  unanswered: number;
}

interface QuestionInfoResponse {
  question_id: string;
  text: string;
  author_name: string;
  author_type: "BUYER" | "OZON";
  status: "NEW" | "VIEWED" | "PROCESSED" | "UNPROCESSED";
  created_at: string;
  updated_at: string;
  sku: number;
  product_name: string;
  product_url?: string;
  answers_count: number;
  is_answered: boolean;
  category_id: number;
  category_name: string;
  urgency_level: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  language: string;
  region: string;
}

interface QuestionListResponse {
  questions: Array<{
    question_id: string;
    text: string;
    author_name: string;
    author_type: "BUYER" | "OZON";
    status: "NEW" | "VIEWED" | "PROCESSED" | "UNPROCESSED";
    created_at: string;
    updated_at: string;
    sku: number;
    product_name: string;
    answers_count: number;
    is_answered: boolean;
    urgency_level: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
    category_id: number;
  }>;
  total: number;
  last_id?: string;
  has_next: boolean;
}

interface QuestionTopSkuResponse {
  sku: Array<{
    sku: number;
    product_name: string;
    questions_count: number;
    unanswered_count: number;
    average_response_time: number;
    last_question_date: string;
  }>;
  total: number;
}
```

## Примеры использования

### Обработка новых вопросов
```typescript
// Получение списка новых вопросов
const newQuestions = await questionsAnswersApi.getQuestionList({
  filter: {
    status: 'NEW'
  }
});

console.log(`Новых вопросов: ${newQuestions.questions.length}`);

// Обработка каждого вопроса
for (const question of newQuestions.questions) {
  console.log(`\n=== Вопрос ${question.question_id} ===`);
  console.log(`Товар: ${question.product_name} (SKU: ${question.sku})`);
  console.log(`Вопрос: ${question.text}`);
  console.log(`Автор: ${question.author_name}`);
  console.log(`Дата: ${question.created_at}`);
  console.log(`Приоритет: ${question.urgency_level}`);

  // Проверка уже существующих ответов
  const answers = await questionsAnswersApi.getAnswerList({
    question_id: question.question_id,
    sku: question.sku
  });

  if (answers.answers.length === 0) {
    console.log("❗ Вопрос без ответа - требует внимания");
    
    // Создание ответа (пример автоматического ответа для частых вопросов)
    if (question.text.toLowerCase().includes('доставка')) {
      await questionsAnswersApi.createAnswer({
        question_id: question.question_id,
        sku: question.sku,
        text: 'Спасибо за вопрос! Доставка товара осуществляется курьером или в пункт выдачи OZON. Сроки доставки зависят от вашего региона и обычно составляют 1-3 рабочих дня.'
      });
      console.log("✅ Автоматический ответ создан");
    } else if (question.text.toLowerCase().includes('гарантия')) {
      await questionsAnswersApi.createAnswer({
        question_id: question.question_id,
        sku: question.sku,
        text: 'На данный товар предоставляется гарантия в соответствии с действующим законодательством. Подробные условия гарантийного обслуживания указаны в описании товара.'
      });
      console.log("✅ Автоматический ответ создан");
    }
  } else {
    console.log(`ℹ️ Уже есть ${answers.answers.length} ответов`);
  }

  // Изменение статуса на "просмотрено"
  await questionsAnswersApi.changeQuestionStatus({
    question_ids: [question.question_id],
    status: 'VIEWED'
  });
}
```

### Аналитика вопросов и ответов
```typescript
// Получение общей статистики
const stats = await questionsAnswersApi.getQuestionCount();

console.log("\n=== Статистика вопросов ===");
console.log(`Всего вопросов: ${stats.all}`);
console.log(`Новых: ${stats.new}`);
console.log(`Просмотренных: ${stats.viewed}`);
console.log(`Обработанных: ${stats.processed}`);
console.log(`Необработанных: ${stats.unprocessed}`);
console.log(`С ответами: ${stats.answered}`);
console.log(`Без ответов: ${stats.unanswered}`);

// Вычисление показателей эффективности
const responseRate = stats.all > 0 ? (stats.answered / stats.all * 100).toFixed(1) : '0';
const processingRate = stats.all > 0 ? (stats.processed / stats.all * 100).toFixed(1) : '0';

console.log(`\n=== Показатели эффективности ===`);
console.log(`Процент ответов: ${responseRate}%`);
console.log(`Процент обработки: ${processingRate}%`);

if (stats.unanswered > 0) {
  console.log(`⚠️ Требует внимания: ${stats.unanswered} вопросов без ответов`);
}

if (stats.new > 10) {
  console.log(`🚨 Много новых вопросов: ${stats.new} - рекомендуется ускорить обработку`);
}
```

### Анализ проблемных товаров
```typescript
// Получение товаров с наибольшим количеством вопросов
const topProducts = await questionsAnswersApi.getTopQuestionedProducts({
  limit: 20,
  date_from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString() // последние 30 дней
});

console.log("\n=== Товары с наибольшим количеством вопросов ===");

for (let i = 0; i < topProducts.sku.length; i++) {
  const product = topProducts.sku[i];
  
  console.log(`\n${i + 1}. ${product.product_name}`);
  console.log(`   SKU: ${product.sku}`);
  console.log(`   Всего вопросов: ${product.questions_count}`);
  console.log(`   Без ответов: ${product.unanswered_count}`);
  console.log(`   Среднее время ответа: ${product.average_response_time} часов`);
  console.log(`   Последний вопрос: ${product.last_question_date}`);

  // Анализ проблемных индикаторов
  const responseRate = product.questions_count > 0 ? 
    ((product.questions_count - product.unanswered_count) / product.questions_count * 100) : 0;
  
  if (responseRate < 80) {
    console.log(`   ⚠️ Низкий процент ответов: ${responseRate.toFixed(1)}%`);
  }
  
  if (product.average_response_time > 24) {
    console.log(`   🐌 Медленное время ответа: ${product.average_response_time} часов`);
  }
  
  if (product.unanswered_count > 5) {
    console.log(`   🚨 Критично: ${product.unanswered_count} вопросов без ответов`);
    
    // Получение конкретных вопросов без ответов для этого товара
    const unansweredQuestions = await questionsAnswersApi.getQuestionList({
      filter: {
        sku: [product.sku],
        status: 'NEW'
      },
      limit: product.unanswered_count
    });

    console.log(`   📝 Требуют ответа:`);
    unansweredQuestions.questions.slice(0, 3).forEach((q, idx) => {
      console.log(`     ${idx + 1}. "${q.text.substring(0, 100)}..."`);
    });
    
    if (unansweredQuestions.questions.length > 3) {
      console.log(`     ... и еще ${unansweredQuestions.questions.length - 3} вопросов`);
    }
  }
}
```

### Массовая обработка вопросов
```typescript
// Получение всех необработанных вопросов
const unprocessedQuestions = await questionsAnswersApi.getQuestionList({
  filter: {
    status: 'UNPROCESSED'
  },
  limit: 100
});

console.log(`\nМассовая обработка ${unprocessedQuestions.questions.length} необработанных вопросов...`);

// Группировка по типам вопросов для автоматизации
const questionCategories = {
  delivery: [] as string[],
  warranty: [] as string[],
  compatibility: [] as string[],
  usage: [] as string[],
  other: [] as string[]
};

unprocessedQuestions.questions.forEach(question => {
  const text = question.text.toLowerCase();
  
  if (text.includes('доставка') || text.includes('курьер') || text.includes('получение')) {
    questionCategories.delivery.push(question.question_id);
  } else if (text.includes('гарантия') || text.includes('возврат') || text.includes('брак')) {
    questionCategories.warranty.push(question.question_id);
  } else if (text.includes('совмест') || text.includes('подход') || text.includes('работает с')) {
    questionCategories.compatibility.push(question.question_id);
  } else if (text.includes('как использовать') || text.includes('инструкция') || text.includes('настройка')) {
    questionCategories.usage.push(question.question_id);
  } else {
    questionCategories.other.push(question.question_id);
  }
});

// Массовое изменение статуса на "обработано" для стандартных категорий
const standardCategories = ['delivery', 'warranty', 'compatibility', 'usage'];

for (const category of standardCategories) {
  const questionIds = questionCategories[category as keyof typeof questionCategories];
  
  if (questionIds.length > 0) {
    await questionsAnswersApi.changeQuestionStatus({
      question_ids: questionIds,
      status: 'PROCESSED'
    });
    
    console.log(`✅ Обработано ${questionIds.length} вопросов категории "${category}"`);
  }
}

// Вопросы "other" требуют индивидуального рассмотрения
if (questionCategories.other.length > 0) {
  console.log(`⚠️ ${questionCategories.other.length} вопросов требуют индивидуального рассмотрения`);
  
  await questionsAnswersApi.changeQuestionStatus({
    question_ids: questionCategories.other,
    status: 'VIEWED'
  });
}
```

## Сложные сценарии

### QAAutomationSystem - Система автоматизации Q&A
```typescript
class QAAutomationSystem {
  constructor(private api: QuestionsAnswersApi) {}

  async runDailyQAProcessing(): Promise<QAProcessingReport> {
    console.log("🚀 Запуск ежедневной обработки Q&A...");

    // 1. Анализ текущего состояния
    const currentStats = await this.getCurrentStats();
    
    // 2. Обработка критических вопросов
    const criticalProcessing = await this.processCriticalQuestions();
    
    // 3. Автоматические ответы на типовые вопросы
    const automaticResponses = await this.generateAutomaticResponses();
    
    // 4. Анализ производительности товаров
    const productPerformance = await this.analyzeProductPerformance();
    
    // 5. Рекомендации по улучшению
    const recommendations = await this.generateRecommendations(
      currentStats, productPerformance
    );

    return {
      processing_date: new Date().toISOString(),
      initial_stats: currentStats,
      critical_questions_processed: criticalProcessing.processed_count,
      automatic_responses_created: automaticResponses.responses_count,
      performance_analysis: productPerformance,
      recommendations,
      final_stats: await this.getCurrentStats()
    };
  }

  private async processCriticalQuestions(): Promise<CriticalProcessingResult> {
    // Получение критических вопросов (высокий приоритет + давно без ответа)
    const criticalQuestions = await this.api.getQuestionList({
      filter: {
        status: 'NEW',
        date_from: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString() // старше 48 часов
      },
      limit: 100
    });

    const criticalByUrgency = criticalQuestions.questions.filter(q => 
      q.urgency_level === 'HIGH' || q.urgency_level === 'CRITICAL'
    );

    let processedCount = 0;
    const urgentResponses: string[] = [];

    for (const question of criticalByUrgency) {
      // Проверяем, есть ли уже ответы
      const existingAnswers = await this.api.getAnswerList({
        question_id: question.question_id,
        sku: question.sku
      });

      if (existingAnswers.answers.length === 0) {
        // Создаем приоритетный ответ
        const response = this.generatePriorityResponse(question);
        
        await this.api.createAnswer({
          question_id: question.question_id,
          sku: question.sku,
          text: response
        });

        urgentResponses.push(question.question_id);
        processedCount++;

        // Обновляем статус
        await this.api.changeQuestionStatus({
          question_ids: [question.question_id],
          status: 'PROCESSED'
        });
      }
    }

    return {
      processed_count: processedCount,
      urgent_responses_created: urgentResponses.length,
      question_ids: urgentResponses
    };
  }

  private async generateAutomaticResponses(): Promise<AutomaticResponseResult> {
    const newQuestions = await this.api.getQuestionList({
      filter: { status: 'NEW' },
      limit: 200
    });

    const automaticResponses = new Map<string, string>([
      ['доставка', 'Спасибо за вопрос! Доставка осуществляется службой OZON. Сроки доставки: 1-3 рабочих дня в зависимости от региона. Вы можете выбрать доставку курьером или получение в пункте выдачи.'],
      ['гарантия', 'На товар предоставляется официальная гарантия производителя. Срок гарантии указан в описании товара. В случае обнаружения брака в гарантийный период, товар подлежит замене или возврату.'],
      ['возврат', 'Товар можно вернуть в течение 14 дней с момента получения в соответствии с законом о защите прав потребителей. Товар должен сохранить первоначальный вид и потребительские свойства.'],
      ['размер', 'Подробные размеры товара указаны в описании в разделе "Характеристики". Если у вас есть сомнения по поводу размера, рекомендуем ознакомиться с таблицей размеров или задать уточняющий вопрос.'],
      ['цвет', 'Цвет товара соответствует изображениям в карточке. Обратите внимание, что из-за особенностей мониторов цвет может незначительно отличаться от реального.']
    ]);

    let responsesCreated = 0;
    const processedQuestions: string[] = [];

    for (const question of newQuestions.questions) {
      const questionText = question.text.toLowerCase();
      
      // Проверяем, подходит ли вопрос для автоматического ответа
      for (const [keyword, response] of automaticResponses) {
        if (questionText.includes(keyword)) {
          // Проверяем, нет ли уже ответов
          const existingAnswers = await this.api.getAnswerList({
            question_id: question.question_id,
            sku: question.sku
          });

          if (existingAnswers.answers.length === 0) {
            await this.api.createAnswer({
              question_id: question.question_id,
              sku: question.sku,
              text: response
            });

            await this.api.changeQuestionStatus({
              question_ids: [question.question_id],
              status: 'PROCESSED'
            });

            responsesCreated++;
            processedQuestions.push(question.question_id);
          }
          break; // Прерываем после первого совпадения
        }
      }
    }

    return {
      responses_count: responsesCreated,
      processed_question_ids: processedQuestions
    };
  }

  private async analyzeProductPerformance(): Promise<ProductQAPerformance[]> {
    const topProducts = await this.api.getTopQuestionedProducts({
      limit: 50,
      date_from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    });

    const performance: ProductQAPerformance[] = [];

    for (const product of topProducts.sku) {
      const responseRate = product.questions_count > 0 ? 
        ((product.questions_count - product.unanswered_count) / product.questions_count) : 1;
      
      const healthScore = this.calculateProductQAHealthScore({
        questions_count: product.questions_count,
        unanswered_count: product.unanswered_count,
        average_response_time: product.average_response_time,
        response_rate: responseRate
      });

      performance.push({
        sku: product.sku,
        product_name: product.product_name,
        questions_count: product.questions_count,
        unanswered_count: product.unanswered_count,
        response_rate: responseRate,
        average_response_time: product.average_response_time,
        health_score: healthScore,
        status: this.determineProductQAStatus(healthScore),
        recommendations: this.generateProductRecommendations(product, healthScore)
      });
    }

    return performance.sort((a, b) => a.health_score - b.health_score); // худшие первыми
  }

  private calculateProductQAHealthScore(metrics: {
    questions_count: number;
    unanswered_count: number;
    average_response_time: number;
    response_rate: number;
  }): number {
    let score = 100;

    // Штраф за неотвеченные вопросы
    const unansweredPenalty = (metrics.unanswered_count / Math.max(metrics.questions_count, 1)) * 40;
    score -= unansweredPenalty;

    // Штраф за медленный ответ
    if (metrics.average_response_time > 24) {
      score -= Math.min((metrics.average_response_time - 24) * 2, 30);
    }

    // Бонус за высокий процент ответов
    if (metrics.response_rate > 0.9) {
      score += 10;
    }

    return Math.max(0, Math.min(100, score));
  }

  private generateProductRecommendations(
    product: any, 
    healthScore: number
  ): string[] {
    const recommendations: string[] = [];

    if (healthScore < 50) {
      recommendations.push("Критически низкое качество обслуживания - требуется срочное вмешательство");
    }

    if (product.unanswered_count > 5) {
      recommendations.push(`Ответить на ${product.unanswered_count} неотвеченных вопросов`);
    }

    if (product.average_response_time > 48) {
      recommendations.push("Сократить время ответа - текущее время превышает 48 часов");
    }

    if (product.questions_count > 20) {
      recommendations.push("Рассмотреть обновление описания товара для предотвращения типовых вопросов");
    }

    return recommendations;
  }
}

interface QAProcessingReport {
  processing_date: string;
  initial_stats: QuestionCountResponse;
  critical_questions_processed: number;
  automatic_responses_created: number;
  performance_analysis: ProductQAPerformance[];
  recommendations: string[];
  final_stats: QuestionCountResponse;
}

interface ProductQAPerformance {
  sku: number;
  product_name: string;
  questions_count: number;
  unanswered_count: number;
  response_rate: number;
  average_response_time: number;
  health_score: number;
  status: "EXCELLENT" | "GOOD" | "NEEDS_ATTENTION" | "CRITICAL";
  recommendations: string[];
}
```

### SmartResponseGenerator - Генератор умных ответов
```typescript
class SmartResponseGenerator {
  private responseTemplates = new Map<string, ResponseTemplate>([
    ['delivery', {
      keywords: ['доставка', 'когда получу', 'сроки', 'курьер'],
      template: 'Спасибо за интерес к нашему товару! {delivery_info} Если у вас есть дополнительные вопросы о доставке, обращайтесь!',
      variables: {
        delivery_info: 'Доставка осуществляется в течение 1-3 рабочих дней'
      }
    }],
    ['technical', {
      keywords: ['характеристики', 'параметры', 'спецификация', 'техническая'],
      template: 'Благодарим за вопрос о технических характеристиках! {tech_info} Подробные характеристики также доступны в описании товара.',
      variables: {
        tech_info: 'Все технические параметры указаны в карточке товара'
      }
    }]
  ]);

  async generateContextualResponse(question: QuestionInfoResponse): Promise<string> {
    // Анализ контекста вопроса
    const context = await this.analyzeQuestionContext(question);
    
    // Поиск подходящего шаблона
    const template = this.findBestTemplate(question.text, context);
    
    if (template) {
      return this.populateTemplate(template, question, context);
    }

    // Генерация персонализированного ответа
    return this.generatePersonalizedResponse(question, context);
  }

  private async analyzeQuestionContext(question: QuestionInfoResponse): Promise<QuestionContext> {
    return {
      product_category: question.category_name,
      urgency_level: question.urgency_level,
      question_type: this.classifyQuestionType(question.text),
      customer_region: question.region,
      language: question.language,
      similar_questions_count: await this.countSimilarQuestions(question.sku, question.text)
    };
  }

  private classifyQuestionType(questionText: string): QuestionType {
    const text = questionText.toLowerCase();
    
    if (text.includes('доставка') || text.includes('получение')) {
      return 'DELIVERY';
    } else if (text.includes('возврат') || text.includes('гарантия')) {
      return 'WARRANTY';
    } else if (text.includes('размер') || text.includes('цвет') || text.includes('характеристики')) {
      return 'SPECIFICATIONS';
    } else if (text.includes('совмест') || text.includes('подходит')) {
      return 'COMPATIBILITY';
    } else if (text.includes('как использовать') || text.includes('инструкция')) {
      return 'USAGE';
    } else {
      return 'OTHER';
    }
  }
}

interface ResponseTemplate {
  keywords: string[];
  template: string;
  variables: Record<string, string>;
}

interface QuestionContext {
  product_category: string;
  urgency_level: string;
  question_type: QuestionType;
  customer_region: string;
  language: string;
  similar_questions_count: number;
}

type QuestionType = 'DELIVERY' | 'WARRANTY' | 'SPECIFICATIONS' | 'COMPATIBILITY' | 'USAGE' | 'OTHER';
```

## Обработка ошибок

```typescript
try {
  const answer = await questionsAnswersApi.createAnswer({
    question_id: 'question-123',
    sku: 123456789,
    text: 'Ответ на вопрос'
  });

  if (answer.result === 'error') {
    console.error('Не удалось создать ответ');
  }
} catch (error) {
  if (error.response?.status === 403) {
    console.error('Недостаточно прав - требуется подписка Premium Plus');
  } else if (error.response?.status === 404) {
    console.error('Вопрос не найден');
  } else if (error.response?.status === 400) {
    console.error('Некорректные параметры:', error.response.data);
  } else {
    console.error('Неожиданная ошибка:', error.message);
  }
}
```

## Лучшие практики

### Эффективное управление очередью Q&A
```typescript
// Приоритизация вопросов
async function prioritizeQuestions(): Promise<PrioritizedQuestion[]> {
  const questions = await questionsAnswersApi.getQuestionList({
    filter: { status: 'NEW' },
    limit: 200
  });

  return questions.questions
    .map(q => ({
      ...q,
      priority_score: calculatePriorityScore(q)
    }))
    .sort((a, b) => b.priority_score - a.priority_score);
}

function calculatePriorityScore(question: any): number {
  let score = 0;
  
  // Приоритет по срочности
  const urgencyScores = { 'CRITICAL': 40, 'HIGH': 30, 'MEDIUM': 20, 'LOW': 10 };
  score += urgencyScores[question.urgency_level as keyof typeof urgencyScores] || 10;
  
  // Возраст вопроса
  const ageHours = (Date.now() - new Date(question.created_at).getTime()) / (1000 * 60 * 60);
  if (ageHours > 48) score += 20;
  else if (ageHours > 24) score += 15;
  else if (ageHours > 12) score += 10;
  
  // Отсутствие ответов
  if (!question.is_answered) score += 25;
  
  return score;
}
```

### Автоматизация стандартных ответов
```typescript
class StandardResponseManager {
  private templates = new Map([
    ['shipping', {
      triggers: ['доставка', 'отправка', 'когда получу'],
      response: 'Доставка осуществляется в течение 1-3 рабочих дней. Вы получите SMS с трек-номером для отслеживания.'
    }],
    ['return', {
      triggers: ['возврат', 'вернуть', 'не подошел'],
      response: 'Товар можно вернуть в течение 14 дней. Возврат оформляется в личном кабинете или через службу поддержки.'
    }]
  ]);

  async processStandardQuestions(): Promise<number> {
    const newQuestions = await questionsAnswersApi.getQuestionList({
      filter: { status: 'NEW' }
    });

    let processedCount = 0;

    for (const question of newQuestions.questions) {
      const standardResponse = this.findStandardResponse(question.text);
      
      if (standardResponse) {
        await questionsAnswersApi.createAnswer({
          question_id: question.question_id,
          sku: question.sku,
          text: standardResponse
        });

        await questionsAnswersApi.changeQuestionStatus({
          question_ids: [question.question_id],
          status: 'PROCESSED'
        });

        processedCount++;
      }
    }

    return processedCount;
  }

  private findStandardResponse(questionText: string): string | null {
    const text = questionText.toLowerCase();
    
    for (const [_, template] of this.templates) {
      if (template.triggers.some(trigger => text.includes(trigger))) {
        return template.response;
      }
    }
    
    return null;
  }
}
```

## Интеграционные заметки

- **Premium Plus Required**: API доступно только для подписчиков Premium Plus
- **Rate Limiting**: API поддерживает до 300 запросов в минуту
- **Response Time Monitoring**: Рекомендуется отвечать на вопросы в течение 24 часов
- **Text Validation**: Ответы проходят автоматическую модерацию
- **Analytics Integration**: Метрики Q&A влияют на общий рейтинг продавца
- **Language Support**: API поддерживает автоопределение языка вопросов
- **Status Tracking**: Все изменения статусов логируются для аналитики