# Управление рабочими процессами с вопросами

**4 метода** — управление статусами, получение информации и статистики по вопросам покупателей

**⚠️ ТРЕБУЕТ ПОДПИСКУ PREMIUM PLUS** — все методы доступны только для продавцов с подпиской Premium Plus.

## 📊 Обзор методов API

### 📋 Управление вопросами (4 метода)
1. **changeQuestionStatus()** — Изменить статус вопросов
2. **getQuestionInfo()** — Получить информацию по вопросу
3. **getQuestionsList()** — Получить список вопросов
4. **getQuestionsCount()** — Получить количество вопросов по статусам

---

## 📋 Полная типизация интерфейсов

### Request Types

```typescript
/**
 * Запрос изменения статуса вопросов
 * Request for changing questions status
 */
interface ChangeQuestionStatusRequest {
  /** Список идентификаторов вопросов */
  question_ids: string[];
  /** Новый статус для вопросов */
  status: QuestionStatus;
}

/**
 * Запрос информации о конкретном вопросе
 * Request for question information
 */
interface GetQuestionInfoRequest {
  /** Идентификатор вопроса */
  question_id: string;
}

/**
 * Запрос списка вопросов с фильтрацией
 * Request for questions list with filtering
 */
interface GetQuestionsListRequest {
  /** Фильтры для поиска вопросов */
  filter?: QuestionListFilter;
  /** ID последнего элемента для пагинации */
  last_id?: string;
}

interface QuestionListFilter {
  /** Фильтр по статусу вопросов */
  status?: QuestionStatus;
  /** Дата начала периода */
  date_from?: string;
  /** Дата окончания периода */
  date_to?: string;
  /** Фильтр по SKU товара */
  sku?: number;
  /** Фильтр по тексту вопроса */
  text?: string;
  /** Только вопросы без ответов */
  unanswered_only?: boolean;
}

/**
 * Запрос количества вопросов по статусам
 * Request for questions count by statuses
 */
interface GetQuestionsCountRequest {
  // Пустой запрос - статистика возвращается по всем статусам
}
```

### Response Types

```typescript
/**
 * Результат изменения статуса вопросов
 * Response for changing questions status
 */
interface ChangeQuestionStatusResponse {
  /** Результат операции */
  result?: {
    /** Количество успешно обновлённых вопросов */
    updated_count: number;
    /** Список вопросов с ошибками */
    failed_updates?: FailedStatusUpdate[];
  };
}

interface FailedStatusUpdate {
  /** Идентификатор вопроса */
  question_id: string;
  /** Код ошибки */
  error_code: string;
  /** Описание ошибки */
  error_message: string;
}

/**
 * Детальная информация о вопросе
 * Detailed question information
 */
interface GetQuestionInfoResponse {
  /** Идентификатор вопроса */
  id: string;
  /** Текст вопроса */
  text: string;
  /** Статус вопроса */
  status: QuestionStatus;
  /** Автор вопроса */
  author_name: string;
  /** Дата публикации вопроса */
  published_at: string;
  /** SKU товара */
  sku: number;
  /** Ссылка на товар */
  product_url: string;
  /** Ссылка на вопрос на сайте */
  question_link: string;
  /** Количество ответов на вопрос */
  answers_count: number;
}

/**
 * Список вопросов
 * Questions list response
 */
interface GetQuestionsListResponse {
  /** Список вопросов */
  questions?: QuestionListItem[];
  /** ID последнего элемента для пагинации */
  last_id?: string;
}

interface QuestionListItem {
  /** Идентификатор вопроса */
  id: string;
  /** Текст вопроса */
  text: string;
  /** Статус вопроса */
  status: QuestionStatus;
  /** Автор вопроса */
  author_name: string;
  /** Дата публикации */
  published_at: string;
  /** SKU товара */
  sku: number;
  /** Название товара */
  product_name?: string;
  /** Количество ответов */
  answers_count: number;
  /** Есть ли непрочитанные ответы */
  has_unread_answers: boolean;
  /** Приоритет вопроса */
  priority: 'low' | 'medium' | 'high';
  /** Теги вопроса */
  tags: string[];
}

/**
 * Статистика вопросов по статусам
 * Questions count by statuses
 */
interface GetQuestionsCountResponse {
  /** Всего вопросов */
  all: number;
  /** Новые вопросы */
  new: number;
  /** Просмотренные вопросы */
  viewed: number;
  /** Обработанные вопросы */
  processed: number;
  /** Необработанные вопросы */
  unprocessed: number;
}

/**
 * Статусы вопросов
 * Question statuses
 */
enum QuestionStatus {
  /** Новый вопрос */
  NEW = 'NEW',
  /** Все вопросы (для фильтрации) */
  ALL = 'ALL',
  /** Просмотренный вопрос */
  VIEWED = 'VIEWED',
  /** Обработанный вопрос */
  PROCESSED = 'PROCESSED',
  /** Необработанный вопрос */
  UNPROCESSED = 'UNPROCESSED'
}
```

### Supporting Types

```typescript
/**
 * Расширенная информация о вопросе
 * Extended question information
 */
interface ExtendedQuestionInfo extends GetQuestionInfoResponse {
  /** Информация о товаре */
  product: {
    /** Название товара */
    name: string;
    /** Категория товара */
    category_name: string;
    /** Цена товара */
    price: number;
    /** Изображение товара */
    image_url: string;
    /** Рейтинг товара */
    rating: number;
  };
  /** История изменения статуса */
  status_history: StatusChange[];
  /** Связанные вопросы */
  related_questions: RelatedQuestion[];
  /** Метки и теги */
  tags: QuestionTag[];
  /** Приоритет обработки */
  priority_score: number;
}

interface StatusChange {
  /** Предыдущий статус */
  from_status: QuestionStatus;
  /** Новый статус */
  to_status: QuestionStatus;
  /** Время изменения */
  changed_at: string;
  /** Кто изменил */
  changed_by?: string;
  /** Причина изменения */
  reason?: string;
}

interface RelatedQuestion {
  /** ID связанного вопроса */
  question_id: string;
  /** Текст вопроса */
  text: string;
  /** Тип связи */
  relation_type: 'similar' | 'same_product' | 'same_category';
  /** Релевантность связи */
  relevance_score: number;
}

interface QuestionTag {
  /** Название тега */
  name: string;
  /** Тип тега */
  type: 'auto' | 'manual' | 'system';
  /** Уверенность в теге (для автоматических) */
  confidence?: number;
}

/**
 * Фильтр для продвинутого поиска
 * Advanced search filter
 */
interface AdvancedQuestionFilter extends QuestionListFilter {
  /** Фильтр по категории товара */
  category_id?: number;
  /** Фильтр по рейтингу товара */
  product_rating?: {
    min?: number;
    max?: number;
  };
  /** Фильтр по количеству ответов */
  answers_count?: {
    min?: number;
    max?: number;
  };
  /** Фильтр по приоритету */
  priority?: 'low' | 'medium' | 'high';
  /** Фильтр по тегам */
  tags?: string[];
  /** Фильтр по автору */
  author_name?: string;
  /** Сортировка результатов */
  sort_by?: 'date' | 'priority' | 'answers_count' | 'product_rating';
  /** Направление сортировки */
  sort_direction?: 'asc' | 'desc';
}
```

---

## 🛠️ Практические примеры использования

### 1. Управление статусами вопросов

```typescript
import { QuestionsAnswersApi } from 'daytona-ozon-seller-api';

const qaApi = new QuestionsAnswersApi(httpClient);

// Изменение статуса одного вопроса
async function changeQuestionStatus(questionId: string, newStatus: QuestionStatus): Promise<void> {
  try {
    console.log(`🔄 Изменение статуса вопроса ${questionId} на ${newStatus}...`);
    
    const response = await qaApi.changeQuestionStatus({
      question_ids: [questionId],
      status: newStatus
    });

    if (response.result?.updated_count === 1) {
      console.log(`✅ Статус вопроса успешно изменён на ${newStatus}`);
      
      // Логируем изменение для аудита
      await logStatusChange(questionId, newStatus);
      
    } else {
      console.warn('⚠️ Не удалось изменить статус вопроса');
      
      if (response.result?.failed_updates?.length) {
        response.result.failed_updates.forEach(failed => {
          console.error(`❌ ${failed.question_id}: ${failed.error_message}`);
        });
      }
    }

  } catch (error) {
    console.error('❌ Ошибка при изменении статуса:', error);
    throw error;
  }
}

// Массовое изменение статусов с валидацией
async function bulkChangeStatus(questionIds: string[], newStatus: QuestionStatus): Promise<void> {
  try {
    console.log(`📦 Массовое изменение статуса для ${questionIds.length} вопросов на ${newStatus}...`);

    // Валидируем каждый вопрос перед изменением статуса
    const validQuestions: string[] = [];
    const invalidQuestions: {id: string, reason: string}[] = [];

    for (const questionId of questionIds) {
      const isValid = await validateStatusChange(questionId, newStatus);
      if (isValid.allowed) {
        validQuestions.push(questionId);
      } else {
        invalidQuestions.push({ id: questionId, reason: isValid.reason || 'Неизвестная причина' });
      }
    }

    console.log(`✅ Валидных вопросов: ${validQuestions.length}`);
    console.log(`❌ Невалидных вопросов: ${invalidQuestions.length}`);

    if (invalidQuestions.length > 0) {
      console.log('⚠️ Вопросы с ошибками валидации:');
      invalidQuestions.forEach(item => {
        console.log(`  ${item.id}: ${item.reason}`);
      });
    }

    if (validQuestions.length === 0) {
      console.log('ℹ️ Нет вопросов для обработки');
      return;
    }

    // Обрабатываем валидные вопросы батчами
    const batchSize = 50; // Лимит для безопасной обработки
    const batches = chunkArray(validQuestions, batchSize);
    
    let totalUpdated = 0;
    const allFailedUpdates: FailedStatusUpdate[] = [];

    for (let i = 0; i < batches.length; i++) {
      console.log(`📦 Обработка батча ${i + 1}/${batches.length} (${batches[i].length} вопросов)`);
      
      try {
        const batchResponse = await qaApi.changeQuestionStatus({
          question_ids: batches[i],
          status: newStatus
        });

        if (batchResponse.result?.updated_count) {
          totalUpdated += batchResponse.result.updated_count;
          console.log(`✅ Батч ${i + 1}: обновлено ${batchResponse.result.updated_count} вопросов`);
        }

        if (batchResponse.result?.failed_updates) {
          allFailedUpdates.push(...batchResponse.result.failed_updates);
        }

        // Пауза между батчами
        await delay(1000);

      } catch (error) {
        console.error(`❌ Ошибка в батче ${i + 1}:`, error);
        
        // Добавляем все вопросы из неудачного батча как неудачные
        batches[i].forEach(questionId => {
          allFailedUpdates.push({
            question_id: questionId,
            error_code: 'BATCH_FAILED',
            error_message: `Batch processing failed: ${error}`
          });
        });
      }
    }

    console.log(`\n📊 Результаты массового изменения статуса:`);
    console.log(`✅ Успешно обновлено: ${totalUpdated}/${questionIds.length}`);
    console.log(`❌ Ошибок: ${allFailedUpdates.length}`);

    if (allFailedUpdates.length > 0) {
      console.log('\n❌ Вопросы с ошибками:');
      allFailedUpdates.slice(0, 10).forEach(failed => {
        console.log(`  ${failed.question_id}: ${failed.error_message}`);
      });
      if (allFailedUpdates.length > 10) {
        console.log(`  ... и ещё ${allFailedUpdates.length - 10} ошибок`);
      }
    }

  } catch (error) {
    console.error('❌ Критическая ошибка при массовом изменении статуса:', error);
    throw error;
  }
}

// Автоматическая обработка вопросов по правилам
async function processQuestionsByRules(): Promise<void> {
  try {
    console.log('🤖 Автоматическая обработка вопросов по правилам...');

    // Получаем новые вопросы
    const newQuestions = await qaApi.getQuestionsList({
      filter: { status: QuestionStatus.NEW }
    });

    if (!newQuestions.questions?.length) {
      console.log('ℹ️ Новых вопросов для обработки нет');
      return;
    }

    console.log(`📋 Найдено новых вопросов: ${newQuestions.questions.length}`);

    const processingRules = await getProcessingRules();
    const processedQuestions: string[] = [];

    for (const question of newQuestions.questions) {
      const rule = findMatchingRule(question, processingRules);
      
      if (rule) {
        console.log(`🎯 Применяем правило "${rule.name}" к вопросу ${question.id}`);
        
        // Изменяем статус согласно правилу
        await changeQuestionStatus(question.id, rule.target_status);
        
        // Если правило предусматривает автоответ
        if (rule.auto_answer && rule.answer_template) {
          await qaApi.createAnswer({
            question_id: question.id,
            text: rule.answer_template
          });
          console.log(`💬 Создан автоматический ответ для вопроса ${question.id}`);
        }
        
        processedQuestions.push(question.id);
      }
    }

    console.log(`✅ Автоматически обработано вопросов: ${processedQuestions.length}`);

  } catch (error) {
    console.error('❌ Ошибка при автоматической обработке:', error);
    throw error;
  }
}

// Вспомогательные функции
async function validateStatusChange(questionId: string, newStatus: QuestionStatus): Promise<{allowed: boolean, reason?: string}> {
  try {
    // Получаем информацию о вопросе
    const questionInfo = await qaApi.getQuestionInfo({ question_id: questionId });
    
    if (!questionInfo) {
      return { allowed: false, reason: 'Вопрос не найден' };
    }

    // Проверяем логику переходов статусов
    const currentStatus = questionInfo.status;
    
    // Нельзя изменить статус на тот же
    if (currentStatus === newStatus) {
      return { allowed: false, reason: 'Статус уже установлен' };
    }

    // Бизнес-правила для переходов статусов
    if (currentStatus === QuestionStatus.PROCESSED && newStatus === QuestionStatus.NEW) {
      return { allowed: false, reason: 'Нельзя вернуть обработанный вопрос в статус "новый"' };
    }

    // Если у вопроса есть ответы, нельзя сделать его необработанным
    if (questionInfo.answers_count > 0 && newStatus === QuestionStatus.UNPROCESSED) {
      return { allowed: false, reason: 'У вопроса есть ответы, нельзя пометить как необработанный' };
    }

    return { allowed: true };

  } catch (error) {
    return { allowed: false, reason: `Ошибка валидации: ${error}` };
  }
}

async function logStatusChange(questionId: string, newStatus: QuestionStatus): Promise<void> {
  // В реальном приложении здесь будет запись в систему аудита
  console.log(`📝 Логирование: вопрос ${questionId} изменён на статус ${newStatus}`);
}

async function getProcessingRules(): Promise<QuestionProcessingRule[]> {
  // В реальном приложении загружаются из конфигурации
  return [
    {
      name: 'Вопросы о размерах',
      keywords: ['размер', 'размеры', 'size', 'какой размер'],
      target_status: QuestionStatus.VIEWED,
      auto_answer: true,
      answer_template: 'Спасибо за вопрос! Размерная таблица доступна в описании товара.'
    },
    {
      name: 'Вопросы о доставке',
      keywords: ['доставка', 'когда придёт', 'сроки доставки'],
      target_status: QuestionStatus.VIEWED,
      auto_answer: true,
      answer_template: 'Сроки доставки указаны при оформлении заказа и зависят от вашего региона.'
    },
    {
      name: 'Сложные технические вопросы',
      keywords: ['совместимость', 'характеристики', 'технические'],
      target_status: QuestionStatus.VIEWED,
      auto_answer: false
    }
  ];
}

function findMatchingRule(question: QuestionListItem, rules: QuestionProcessingRule[]): QuestionProcessingRule | null {
  const questionText = question.text.toLowerCase();
  
  for (const rule of rules) {
    const hasMatchingKeyword = rule.keywords.some(keyword => 
      questionText.includes(keyword.toLowerCase())
    );
    
    if (hasMatchingKeyword) {
      return rule;
    }
  }
  
  return null;
}

interface QuestionProcessingRule {
  name: string;
  keywords: string[];
  target_status: QuestionStatus;
  auto_answer: boolean;
  answer_template?: string;
}

function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Примеры использования
await changeQuestionStatus('question-123', QuestionStatus.PROCESSED);

await bulkChangeStatus(['question-456', 'question-789'], QuestionStatus.VIEWED);

await processQuestionsByRules();
```

### 2. Получение и анализ информации о вопросах

```typescript
// Детальный анализ конкретного вопроса
async function analyzeQuestionDetails(questionId: string): Promise<void> {
  try {
    console.log(`🔍 Анализ вопроса ${questionId}...`);
    
    const questionInfo = await qaApi.getQuestionInfo({ question_id: questionId });
    
    if (!questionInfo) {
      console.log('❌ Вопрос не найден');
      return;
    }

    console.log('\n📋 Информация о вопросе:');
    console.log(`📝 Текст: "${questionInfo.text}"`);
    console.log(`👤 Автор: ${questionInfo.author_name}`);
    console.log(`📅 Опубликован: ${new Date(questionInfo.published_at).toLocaleString()}`);
    console.log(`📊 Статус: ${questionInfo.status}`);
    console.log(`💬 Ответов: ${questionInfo.answers_count}`);
    console.log(`🛍️ SKU товара: ${questionInfo.sku}`);
    
    // Анализируем приоритет вопроса
    const priority = calculateQuestionPriority(questionInfo);
    console.log(`🎯 Приоритет: ${priority.level} (${priority.score} баллов)`);
    
    if (priority.reasons.length > 0) {
      console.log('📌 Причины приоритета:');
      priority.reasons.forEach(reason => console.log(`  - ${reason}`));
    }

    // Проверяем необходимость срочного ответа
    const urgency = checkQuestionUrgency(questionInfo);
    if (urgency.is_urgent) {
      console.log(`🚨 ТРЕБУЕТ СРОЧНОГО ВНИМАНИЯ: ${urgency.reason}`);
    }

    // Анализируем похожие вопросы
    const similarQuestions = await findSimilarQuestions(questionInfo);
    if (similarQuestions.length > 0) {
      console.log(`🔗 Найдено похожих вопросов: ${similarQuestions.length}`);
      similarQuestions.slice(0, 3).forEach((similar, index) => {
        console.log(`  ${index + 1}. "${similar.text.substring(0, 50)}..." (${similar.relevance_score}% совпадение)`);
      });
    }

    // Рекомендации по обработке
    const recommendations = generateQuestionRecommendations(questionInfo, priority, urgency);
    if (recommendations.length > 0) {
      console.log('\n💡 Рекомендации:');
      recommendations.forEach(rec => console.log(`  ${rec}`));
    }

  } catch (error) {
    console.error('❌ Ошибка при анализе вопроса:', error);
    throw error;
  }
}

// Получение списка вопросов с продвинутой фильтрацией
async function getFilteredQuestions(filter: AdvancedQuestionFilter): Promise<QuestionListItem[]> {
  try {
    console.log('🔍 Поиск вопросов с фильтрами...');
    
    const allQuestions: QuestionListItem[] = [];
    let lastId = '';

    do {
      const response = await qaApi.getQuestionsList({
        filter: {
          status: filter.status,
          date_from: filter.date_from,
          date_to: filter.date_to,
          sku: filter.sku,
          text: filter.text,
          unanswered_only: filter.unanswered_only
        },
        last_id: lastId
      });

      if (response.questions?.length) {
        // Применяем дополнительную фильтрацию на стороне клиента
        const filteredQuestions = applyAdvancedFilter(response.questions, filter);
        allQuestions.push(...filteredQuestions);
        
        lastId = response.last_id || '';
        
        console.log(`📦 Загружено вопросов: ${allQuestions.length}`);
      } else {
        break;
      }

      // Пауза между запросами
      await delay(500);

    } while (lastId && allQuestions.length < 1000); // Лимит безопасности

    // Сортируем результаты
    if (filter.sort_by) {
      allQuestions.sort((a, b) => sortQuestions(a, b, filter.sort_by!, filter.sort_direction));
    }

    console.log(`✅ Найдено вопросов: ${allQuestions.length}`);
    return allQuestions;

  } catch (error) {
    console.error('❌ Ошибка при поиске вопросов:', error);
    throw error;
  }
}

// Аналитический отчёт по вопросам
async function generateQuestionsReport(dateFrom: string, dateTo: string): Promise<void> {
  try {
    console.log(`📊 Генерация отчёта по вопросам с ${dateFrom} по ${dateTo}...`);

    // Получаем статистику по статусам
    const countStats = await qaApi.getQuestionsCount();
    
    // Получаем вопросы за период
    const periodQuestions = await getFilteredQuestions({
      date_from: dateFrom,
      date_to: dateTo,
      sort_by: 'date',
      sort_direction: 'desc'
    });

    console.log('\n📈 Отчёт по вопросам:');
    console.log(`📅 Период: ${dateFrom} - ${dateTo}`);
    console.log(`📊 Всего вопросов в системе: ${countStats.all}`);
    console.log(`📋 Вопросов за период: ${periodQuestions.length}`);
    
    console.log('\n📊 Распределение по статусам:');
    console.log(`🆕 Новые: ${countStats.new}`);
    console.log(`👁️ Просмотренные: ${countStats.viewed}`);
    console.log(`✅ Обработанные: ${countStats.processed}`);
    console.log(`⏳ Необработанные: ${countStats.unprocessed}`);

    if (periodQuestions.length > 0) {
      // Анализ вопросов за период
      const periodAnalysis = analyzePeriodQuestions(periodQuestions);
      
      console.log('\n📊 Анализ за период:');
      console.log(`💬 Средне ответов на вопрос: ${periodAnalysis.avg_answers_per_question.toFixed(1)}`);
      console.log(`🎯 Вопросов без ответов: ${periodAnalysis.unanswered_count} (${periodAnalysis.unanswered_percentage}%)`);
      console.log(`⚡ Вопросов высокого приоритета: ${periodAnalysis.high_priority_count}`);

      console.log('\n🏆 Топ-5 товаров с наибольшим количеством вопросов:');
      periodAnalysis.top_products.slice(0, 5).forEach((product, index) => {
        console.log(`  ${index + 1}. SKU ${product.sku}: ${product.questions_count} вопросов`);
      });

      console.log('\n🔤 Популярные темы вопросов:');
      periodAnalysis.popular_topics.slice(0, 5).forEach((topic, index) => {
        console.log(`  ${index + 1}. "${topic.keyword}": ${topic.count} упоминаний`);
      });

      // Рекомендации по улучшению
      const insights = generateReportInsights(countStats, periodAnalysis);
      if (insights.length > 0) {
        console.log('\n💡 Выводы и рекомендации:');
        insights.forEach(insight => console.log(`  ${insight}`));
      }
    }

  } catch (error) {
    console.error('❌ Ошибка при генерации отчёта:', error);
    throw error;
  }
}

// Вспомогательные функции для анализа
function calculateQuestionPriority(question: GetQuestionInfoResponse): {level: string, score: number, reasons: string[]} {
  let score = 0;
  const reasons: string[] = [];

  // Факторы приоритета
  if (question.answers_count === 0) {
    score += 3;
    reasons.push('Нет ответов на вопрос');
  }

  // Анализ текста на наличие срочных слов
  const urgentKeywords = ['срочно', 'быстро', 'проблема', 'не работает', 'сломан', 'брак'];
  const hasUrgentWords = urgentKeywords.some(keyword => 
    question.text.toLowerCase().includes(keyword)
  );
  
  if (hasUrgentWords) {
    score += 2;
    reasons.push('Содержит слова, указывающие на срочность');
  }

  // Возраст вопроса
  const questionAge = (Date.now() - new Date(question.published_at).getTime()) / (1000 * 60 * 60);
  if (questionAge > 24 && question.answers_count === 0) {
    score += 2;
    reasons.push('Вопрос без ответа более 24 часов');
  }

  // Определяем уровень приоритета
  let level = 'low';
  if (score >= 5) level = 'high';
  else if (score >= 3) level = 'medium';

  return { level, score, reasons };
}

function checkQuestionUrgency(question: GetQuestionInfoResponse): {is_urgent: boolean, reason?: string} {
  const urgentIndicators = [
    { keywords: ['не работает', 'сломан', 'брак'], reason: 'Возможен брак или неисправность товара' },
    { keywords: ['возврат', 'вернуть деньги'], reason: 'Запрос на возврат товара' },
    { keywords: ['где товар', 'не пришёл', 'потерялся'], reason: 'Проблемы с доставкой' },
    { keywords: ['аллергия', 'опасно', 'вред'], reason: 'Вопросы безопасности' }
  ];

  const questionText = question.text.toLowerCase();
  
  for (const indicator of urgentIndicators) {
    if (indicator.keywords.some(keyword => questionText.includes(keyword))) {
      return { is_urgent: true, reason: indicator.reason };
    }
  }

  return { is_urgent: false };
}

async function findSimilarQuestions(question: GetQuestionInfoResponse): Promise<RelatedQuestion[]> {
  // В реальном приложении здесь будет поиск по семантическому сходству
  // Для примера возвращаем mock данные
  return [];
}

function generateQuestionRecommendations(
  question: GetQuestionInfoResponse,
  priority: any,
  urgency: any
): string[] {
  const recommendations: string[] = [];

  if (urgency.is_urgent) {
    recommendations.push(`🚨 Срочно ответить: ${urgency.reason}`);
  }

  if (question.answers_count === 0) {
    recommendations.push('💬 Создать ответ на вопрос');
  }

  if (priority.level === 'high') {
    recommendations.push('🎯 Высокий приоритет - обработать в первую очередь');
  }

  const questionAge = (Date.now() - new Date(question.published_at).getTime()) / (1000 * 60 * 60);
  if (questionAge > 48) {
    recommendations.push('⏰ Вопрос задан более 48 часов назад - требует внимания');
  }

  return recommendations;
}

function applyAdvancedFilter(questions: QuestionListItem[], filter: AdvancedQuestionFilter): QuestionListItem[] {
  return questions.filter(question => {
    // Дополнительные фильтры, которые API не поддерживает
    if (filter.priority && question.priority !== filter.priority) {
      return false;
    }

    if (filter.tags && filter.tags.length > 0) {
      const hasMatchingTag = filter.tags.some(tag => 
        question.tags.includes(tag)
      );
      if (!hasMatchingTag) return false;
    }

    if (filter.answers_count) {
      if (filter.answers_count.min && question.answers_count < filter.answers_count.min) {
        return false;
      }
      if (filter.answers_count.max && question.answers_count > filter.answers_count.max) {
        return false;
      }
    }

    return true;
  });
}

function sortQuestions(a: QuestionListItem, b: QuestionListItem, sortBy: string, direction?: string): number {
  const multiplier = direction === 'desc' ? -1 : 1;
  
  switch (sortBy) {
    case 'date':
      return multiplier * (new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
    case 'answers_count':
      return multiplier * (b.answers_count - a.answers_count);
    case 'priority':
      const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
      return multiplier * (priorityOrder[b.priority] - priorityOrder[a.priority]);
    default:
      return 0;
  }
}

function analyzePeriodQuestions(questions: QuestionListItem[]) {
  const totalAnswers = questions.reduce((sum, q) => sum + q.answers_count, 0);
  const unansweredQuestions = questions.filter(q => q.answers_count === 0);
  const highPriorityQuestions = questions.filter(q => q.priority === 'high');

  // Группировка по товарам
  const productStats = questions.reduce((acc, question) => {
    acc[question.sku] = (acc[question.sku] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const topProducts = Object.entries(productStats)
    .map(([sku, count]) => ({ sku: parseInt(sku), questions_count: count }))
    .sort((a, b) => b.questions_count - a.questions_count);

  // Анализ тем
  const topicKeywords = ['размер', 'цвет', 'доставка', 'качество', 'цена', 'гарантия'];
  const popularTopics = topicKeywords.map(keyword => ({
    keyword,
    count: questions.filter(q => q.text.toLowerCase().includes(keyword)).length
  })).sort((a, b) => b.count - a.count);

  return {
    avg_answers_per_question: totalAnswers / questions.length,
    unanswered_count: unansweredQuestions.length,
    unanswered_percentage: ((unansweredQuestions.length / questions.length) * 100).toFixed(1),
    high_priority_count: highPriorityQuestions.length,
    top_products: topProducts,
    popular_topics: popularTopics.filter(t => t.count > 0)
  };
}

function generateReportInsights(countStats: GetQuestionsCountResponse, analysis: any): string[] {
  const insights: string[] = [];

  const unprocessedRate = (countStats.unprocessed / countStats.all) * 100;
  if (unprocessedRate > 20) {
    insights.push(`⚠️ Высокий процент необработанных вопросов (${unprocessedRate.toFixed(1)}%) - рекомендуется увеличить ресурсы поддержки`);
  }

  if (parseFloat(analysis.unanswered_percentage) > 30) {
    insights.push(`💬 Много вопросов без ответов (${analysis.unanswered_percentage}%) - рекомендуется активизировать работу с ответами`);
  }

  if (analysis.high_priority_count > analysis.unanswered_count * 0.1) {
    insights.push(`🎯 Выявлено ${analysis.high_priority_count} высокоприоритетных вопросов - требуется срочное внимание`);
  }

  if (analysis.top_products.length > 0 && analysis.top_products[0].questions_count > 10) {
    insights.push(`🛍️ Товар SKU ${analysis.top_products[0].sku} генерирует много вопросов (${analysis.top_products[0].questions_count}) - рекомендуется улучшить описание`);
  }

  return insights;
}

// Примеры использования
await analyzeQuestionDetails('question-123');

const highPriorityQuestions = await getFilteredQuestions({
  status: QuestionStatus.NEW,
  unanswered_only: true,
  priority: 'high',
  sort_by: 'date',
  sort_direction: 'desc'
});

await generateQuestionsReport('2024-01-01', '2024-12-31');
```

### 3. Получение статистики вопросов

```typescript
// Получение и анализ статистики вопросов
async function analyzeQuestionsStatistics(): Promise<void> {
  try {
    console.log('📊 Получение статистики по вопросам...');
    
    const stats = await qaApi.getQuestionsCount();
    
    console.log('\n📊 Общая статистика вопросов:');
    console.log(`📋 Всего вопросов: ${stats.all.toLocaleString()}`);
    console.log(`🆕 Новые: ${stats.new.toLocaleString()} (${(stats.new / stats.all * 100).toFixed(1)}%)`);
    console.log(`👁️ Просмотренные: ${stats.viewed.toLocaleString()} (${(stats.viewed / stats.all * 100).toFixed(1)}%)`);
    console.log(`✅ Обработанные: ${stats.processed.toLocaleString()} (${(stats.processed / stats.all * 100).toFixed(1)}%)`);
    console.log(`⏳ Необработанные: ${stats.unprocessed.toLocaleString()} (${(stats.unprocessed / stats.all * 100).toFixed(1)}%)`);

    // Анализ эффективности обработки
    const processingAnalysis = analyzeProcessingEfficiency(stats);
    console.log('\n📈 Анализ эффективности обработки:');
    console.log(`🎯 Коэффициент обработки: ${processingAnalysis.processing_rate}%`);
    console.log(`⚡ Скорость обработки: ${processingAnalysis.processing_speed}`);
    console.log(`📊 Качество работы: ${processingAnalysis.quality_rating}`);

    // Рекомендации по улучшению
    const recommendations = generateStatisticsRecommendations(stats, processingAnalysis);
    if (recommendations.length > 0) {
      console.log('\n💡 Рекомендации по улучшению:');
      recommendations.forEach(rec => console.log(`  ${rec}`));
    }

    // Прогноз нагрузки
    const forecast = generateWorkloadForecast(stats);
    console.log('\n🔮 Прогноз рабочей нагрузки:');
    console.log(`📅 Ожидаемые новые вопросы (неделя): ${forecast.weekly_new_questions}`);
    console.log(`👥 Рекомендуемый размер команды: ${forecast.recommended_team_size} операторов`);
    console.log(`⏱️ Среднее время на обработку: ${forecast.avg_processing_time} минут`);

  } catch (error) {
    console.error('❌ Ошибка при анализе статистики:', error);
    throw error;
  }
}

// Мониторинг статистики в реальном времени
async function monitorQuestionsStatistics(): Promise<void> {
  console.log('📊 Запуск мониторинга статистики вопросов...');
  
  let previousStats: GetQuestionsCountResponse | null = null;
  
  setInterval(async () => {
    try {
      const currentStats = await qaApi.getQuestionsCount();
      
      if (previousStats) {
        const changes = calculateStatisticsChanges(previousStats, currentStats);
        
        if (changes.hasSignificantChanges) {
          console.log('\n🔔 Обнаружены изменения в статистике:');
          changes.changes.forEach(change => console.log(`  ${change}`));
          
          // Отправляем уведомления о критических изменениях
          const criticalChanges = changes.changes.filter(change => 
            change.includes('🚨') || change.includes('⚠️')
          );
          
          if (criticalChanges.length > 0) {
            await sendCriticalNotifications(criticalChanges);
          }
        }
      }
      
      previousStats = currentStats;
      
    } catch (error) {
      console.error('❌ Ошибка при мониторинге статистики:', error);
    }
  }, 5 * 60 * 1000); // Проверяем каждые 5 минут
}

// Вспомогательные функции для анализа статистики
function analyzeProcessingEfficiency(stats: GetQuestionsCountResponse) {
  const totalProcessed = stats.viewed + stats.processed;
  const processingRate = (totalProcessed / stats.all * 100).toFixed(1);
  
  let processingSpeed = 'Низкая';
  let qualityRating = 'Удовлетворительно';
  
  if (parseFloat(processingRate) > 80) {
    processingSpeed = 'Высокая';
    qualityRating = 'Отлично';
  } else if (parseFloat(processingRate) > 60) {
    processingSpeed = 'Средняя';
    qualityRating = 'Хорошо';
  }
  
  return {
    processing_rate: processingRate,
    processing_speed: processingSpeed,
    quality_rating: qualityRating
  };
}

function generateStatisticsRecommendations(stats: GetQuestionsCountResponse, analysis: any): string[] {
  const recommendations: string[] = [];
  
  const newQuestionsRatio = stats.new / stats.all;
  if (newQuestionsRatio > 0.3) {
    recommendations.push('🆕 Высокий процент новых вопросов - рекомендуется увеличить частоту проверки');
  }
  
  const unprocessedRatio = stats.unprocessed / stats.all;
  if (unprocessedRatio > 0.2) {
    recommendations.push('⏳ Много необработанных вопросов - требуется дополнительный персонал или автоматизация');
  }
  
  if (parseFloat(analysis.processing_rate) < 60) {
    recommendations.push('📈 Низкая эффективность обработки - рекомендуется анализ процессов и обучение команды');
  }
  
  const viewedVsProcessed = stats.viewed / (stats.processed || 1);
  if (viewedVsProcessed > 2) {
    recommendations.push('👁️ Много просмотренных, но необработанных вопросов - требуется завершение работы');
  }
  
  return recommendations;
}

function generateWorkloadForecast(stats: GetQuestionsCountResponse) {
  // Простая модель прогнозирования на основе текущих данных
  const avgDailyNew = Math.round(stats.new / 7); // Предполагаем недельный цикл
  const weeklyNewQuestions = avgDailyNew * 7;
  
  // Предполагаем, что один оператор может обработать 50 вопросов в день
  const questionsPerOperator = 50;
  const recommendedTeamSize = Math.ceil(avgDailyNew / questionsPerOperator);
  
  // Среднее время обработки (в минутах)
  const avgProcessingTime = 15; // Базовая оценка
  
  return {
    weekly_new_questions: weeklyNewQuestions,
    recommended_team_size: Math.max(recommendedTeamSize, 1),
    avg_processing_time: avgProcessingTime
  };
}

function calculateStatisticsChanges(
  previous: GetQuestionsCountResponse, 
  current: GetQuestionsCountResponse
): {hasSignificantChanges: boolean, changes: string[]} {
  const changes: string[] = [];
  let hasSignificantChanges = false;
  
  // Проверяем изменения в новых вопросах
  const newQuestionsChange = current.new - previous.new;
  if (newQuestionsChange > 0) {
    changes.push(`🆕 Новых вопросов: +${newQuestionsChange}`);
    if (newQuestionsChange > 10) {
      changes.push('🚨 Резкий рост новых вопросов - требует внимания');
      hasSignificantChanges = true;
    }
  }
  
  // Проверяем изменения в необработанных вопросах
  const unprocessedChange = current.unprocessed - previous.unprocessed;
  if (unprocessedChange > 0) {
    changes.push(`⏳ Необработанных: +${unprocessedChange}`);
    if (unprocessedChange > 5) {
      changes.push('⚠️ Рост количества необработанных вопросов');
      hasSignificantChanges = true;
    }
  } else if (unprocessedChange < 0) {
    changes.push(`✅ Обработано дополнительно: ${Math.abs(unprocessedChange)} вопросов`);
  }
  
  // Проверяем общий рост
  const totalChange = current.all - previous.all;
  if (totalChange > 20) {
    changes.push(`📊 Значительный рост общего количества вопросов: +${totalChange}`);
    hasSignificantChanges = true;
  }
  
  return { hasSignificantChanges, changes };
}

async function sendCriticalNotifications(criticalChanges: string[]): Promise<void> {
  // В реальном приложении здесь была бы отправка уведомлений
  console.log('🚨 КРИТИЧЕСКИЕ УВЕДОМЛЕНИЯ:');
  criticalChanges.forEach(change => console.log(`  ${change}`));
  
  // Здесь можно интегрировать:
  // - Email уведомления
  // - SMS уведомления  
  // - Slack/Teams уведомления
  // - Push уведомления
}

// Примеры использования
await analyzeQuestionsStatistics();

// Запуск мониторинга (в реальном приложении)
// await monitorQuestionsStatistics();
```

---

## 🎯 Бизнес-логика и автоматизация

### Система автоматизации рабочих процессов

```typescript
/**
 * Менеджер автоматизации рабочих процессов с вопросами
 */
class QuestionWorkflowManager {
  constructor(private qaApi: QuestionsAnswersApi) {}

  /**
   * Автоматическая обработка новых вопросов
   */
  async processNewQuestions(): Promise<void> {
    try {
      console.log('🤖 Запуск автоматической обработки новых вопросов...');

      const newQuestions = await this.qaApi.getQuestionsList({
        filter: { status: QuestionStatus.NEW }
      });

      if (!newQuestions.questions?.length) {
        console.log('ℹ️ Новых вопросов для обработки нет');
        return;
      }

      console.log(`📋 Найдено новых вопросов: ${newQuestions.questions.length}`);

      const processingRules = await this.loadAutomationRules();
      let processedCount = 0;

      for (const question of newQuestions.questions) {
        const processed = await this.applyAutomationRules(question, processingRules);
        if (processed) {
          processedCount++;
        }
        
        // Пауза между обработкой
        await delay(500);
      }

      console.log(`✅ Автоматически обработано: ${processedCount}/${newQuestions.questions.length} вопросов`);

    } catch (error) {
      console.error('❌ Ошибка при автоматической обработке:', error);
      throw error;
    }
  }

  private async applyAutomationRules(question: QuestionListItem, rules: AutomationRule[]): Promise<boolean> {
    for (const rule of rules) {
      if (await this.matchesRule(question, rule)) {
        console.log(`🎯 Применяем правило "${rule.name}" к вопросу ${question.id}`);
        
        try {
          // Изменяем статус
          if (rule.actions.change_status) {
            await this.qaApi.changeQuestionStatus({
              question_ids: [question.id],
              status: rule.actions.change_status
            });
          }

          // Создаём автоматический ответ
          if (rule.actions.auto_answer) {
            const personalizedAnswer = await this.generatePersonalizedAnswer(question, rule.actions.answer_template!);
            await this.qaApi.createAnswer({
              question_id: question.id,
              text: personalizedAnswer
            });
          }

          // Назначаем теги
          if (rule.actions.assign_tags && rule.actions.assign_tags.length > 0) {
            await this.assignQuestionTags(question.id, rule.actions.assign_tags);
          }

          return true;

        } catch (error) {
          console.error(`❌ Ошибка при применении правила "${rule.name}":`, error);
          return false;
        }
      }
    }

    return false;
  }

  private async matchesRule(question: QuestionListItem, rule: AutomationRule): Promise<boolean> {
    const questionText = question.text.toLowerCase();

    // Проверка ключевых слов
    if (rule.conditions.keywords && rule.conditions.keywords.length > 0) {
      const hasKeyword = rule.conditions.keywords.some(keyword =>
        questionText.includes(keyword.toLowerCase())
      );
      if (!hasKeyword) return false;
    }

    // Проверка категории товара
    if (rule.conditions.category_id) {
      // В реальном приложении здесь будет запрос к Product API
      const productInfo = await this.getProductInfo(question.sku);
      if (productInfo?.category_id !== rule.conditions.category_id) {
        return false;
      }
    }

    // Проверка времени без ответа
    if (rule.conditions.hours_without_answer) {
      const questionAge = (Date.now() - new Date(question.published_at).getTime()) / (1000 * 60 * 60);
      if (questionAge < rule.conditions.hours_without_answer) {
        return false;
      }
    }

    return true;
  }

  private async generatePersonalizedAnswer(question: QuestionListItem, template: string): Promise<string> {
    let personalizedAnswer = template;

    // Получаем информацию о товаре для персонализации
    const productInfo = await this.getProductInfo(question.sku);
    
    if (productInfo) {
      personalizedAnswer = personalizedAnswer.replace(/\{product_name\}/g, productInfo.name);
      personalizedAnswer = personalizedAnswer.replace(/\{category\}/g, productInfo.category_name || '');
    }

    personalizedAnswer = personalizedAnswer.replace(/\{customer_name\}/g, question.author_name || 'Уважаемый покупатель');

    return personalizedAnswer;
  }

  private async loadAutomationRules(): Promise<AutomationRule[]> {
    // В реальном приложении загружаются из конфигурации или БД
    return [
      {
        name: 'Вопросы о размерах',
        conditions: {
          keywords: ['размер', 'размеры', 'какой размер выбрать', 'size'],
        },
        actions: {
          change_status: QuestionStatus.VIEWED,
          auto_answer: true,
          answer_template: 'Здравствуйте, {customer_name}! Для выбора размера {product_name} рекомендуем воспользоваться размерной таблицей в описании товара. Если у вас остались вопросы, мы всегда готовы помочь!',
          assign_tags: ['размеры', 'автоответ']
        },
        priority: 1
      },
      {
        name: 'Вопросы о доставке',
        conditions: {
          keywords: ['доставка', 'когда придёт', 'сколько ждать', 'сроки'],
        },
        actions: {
          change_status: QuestionStatus.VIEWED,
          auto_answer: true,
          answer_template: 'Здравствуйте! Сроки доставки {product_name} зависят от вашего региона. Точную информацию вы можете увидеть при оформлении заказа. Обычно доставка занимает от 1 до 5 рабочих дней.',
          assign_tags: ['доставка', 'автоответ']
        },
        priority: 1
      },
      {
        name: 'Длительные вопросы без ответа',
        conditions: {
          hours_without_answer: 24
        },
        actions: {
          change_status: QuestionStatus.VIEWED,
          assign_tags: ['требует_внимания', 'просрочен']
        },
        priority: 2
      }
    ];
  }

  private async getProductInfo(sku: number): Promise<any> {
    // В реальном приложении здесь будет запрос к Product API
    return {
      name: `Товар SKU-${sku}`,
      category_name: 'Электроника',
      category_id: 123
    };
  }

  private async assignQuestionTags(questionId: string, tags: string[]): Promise<void> {
    // В реальном приложении здесь будет сохранение тегов
    console.log(`🏷️ Назначены теги для вопроса ${questionId}: ${tags.join(', ')}`);
  }
}

interface AutomationRule {
  name: string;
  conditions: {
    keywords?: string[];
    category_id?: number;
    hours_without_answer?: number;
    priority?: 'low' | 'medium' | 'high';
  };
  actions: {
    change_status?: QuestionStatus;
    auto_answer?: boolean;
    answer_template?: string;
    assign_tags?: string[];
  };
  priority: number;
}

// Пример использования
const workflowManager = new QuestionWorkflowManager(qaApi);
await workflowManager.processNewQuestions();
```

---

## 📈 KPI и метрики эффективности

### Основные показатели рабочего процесса
- **Время обработки**: Среднее время от получения до изменения статуса
- **Коэффициент обработки**: % вопросов, переведённых в статус "обработан"
- **Качество сортировки**: Точность автоматической категоризации
- **Скорость реагирования**: Время до первого изменения статуса

### Метрики качества процессов
- **Точность статусов**: % правильно установленных статусов
- **Полнота обработки**: % вопросов с полным жизненным циклом
- **Возвраты в работу**: % вопросов, требующих повторной обработки
- **Автоматизация**: % вопросов, обработанных автоматически

---

## ⚠️ Рекомендации и лучшие практики

### Управление статусами
1. **Чёткие критерии**: Определите точные критерии для каждого статуса
2. **Автоматизация**: Настройте правила для автоматического изменения статусов
3. **Мониторинг**: Отслеживайте распределение вопросов по статусам
4. **Обучение**: Регулярно обучайте команду правилам работы со статусами

### Эффективная обработка
1. **Приоритизация**: Обрабатывайте срочные вопросы в первую очередь
2. **Батчевая обработка**: Группируйте похожие вопросы для эффективности
3. **Шаблоны**: Используйте готовые шаблоны для типовых ситуаций
4. **Аналитика**: Регулярно анализируйте статистику для оптимизации

### Автоматизация процессов
1. **Умные правила**: Создавайте правила на основе анализа данных
2. **Постоянное улучшение**: Регулярно обновляйте правила автоматизации
3. **Мониторинг качества**: Контролируйте качество автоматических решений
4. **Баланс**: Сочетайте автоматизацию с человеческим контролем