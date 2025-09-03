# Управление ответами на вопросы

**3 метода** — создание, удаление и получение ответов на вопросы покупателей

**⚠️ ТРЕБУЕТ ПОДПИСКУ PREMIUM PLUS** — все методы доступны только для продавцов с подпиской Premium Plus.

## 📊 Обзор методов API

### 📝 Управление ответами (3 метода)
1. **createAnswer()** — Создать ответ на вопрос
2. **deleteAnswer()** — Удалить ответ на вопрос  
3. **getAnswersList()** — Список ответов на вопрос

---

## 📋 Полная типизация интерфейсов

### Request Types

```typescript
/**
 * Запрос создания ответа на вопрос
 * Request for creating answer to question
 */
interface CreateAnswerRequest {
  /** Идентификатор вопроса */
  question_id: string;
  /** Текст ответа на вопрос */
  text: string;
}

/**
 * Запрос удаления ответа
 * Request for deleting answer
 */
interface DeleteAnswerRequest {
  /** Идентификатор ответа для удаления */
  answer_id: string;
}

/**
 * Запрос списка ответов на вопрос
 * Request for getting answers list
 */
interface GetAnswersListRequest {
  /** Идентификатор вопроса */
  question_id: string;
  /** Количество ответов на странице (по умолчанию 20) */
  limit?: number;
  /** Смещение для пагинации */
  offset?: number;
}
```

### Response Types

```typescript
/**
 * Результат создания ответа
 * Response for creating answer
 */
interface CreateAnswerResponse {
  /** Результат операции */
  result?: {
    /** Идентификатор созданного ответа */
    answer_id: string;
    /** Статус ответа */
    status: AnswerStatus;
    /** Время создания */
    created_at: string;
  };
}

/**
 * Результат удаления ответа
 * Response for deleting answer  
 */
interface DeleteAnswerResponse {
  /** Результат операции (true если успешно) */
  result: boolean;
}

/**
 * Список ответов на вопрос
 * Answers list response
 */
interface GetAnswersListResponse {
  /** Список ответов */
  result?: {
    /** Ответы на вопрос */
    answers: AnswerInfo[];
    /** Общее количество ответов */
    total_count: number;
    /** Есть ли следующая страница */
    has_next: boolean;
  };
}

/**
 * Информация об ответе
 * Answer information
 */
interface AnswerInfo {
  /** Идентификатор ответа */
  answer_id: string;
  /** Идентификатор вопроса */
  question_id: string;
  /** Текст ответа */
  text: string;
  /** Статус ответа */
  status: AnswerStatus;
  /** Автор ответа */
  author: {
    /** Тип автора */
    type: 'seller' | 'support' | 'system';
    /** Имя автора */
    name: string;
    /** Роль автора */
    role?: string;
  };
  /** Время создания */
  created_at: string;
  /** Время последнего обновления */
  updated_at: string;
  /** Рейтинг полезности ответа */
  rating?: {
    /** Лайки */
    likes: number;
    /** Дизлайки */
    dislikes: number;
    /** Общий рейтинг */
    score: number;
  };
  /** Модерационная информация */
  moderation?: {
    /** Статус модерации */
    status: 'pending' | 'approved' | 'rejected';
    /** Причина отклонения */
    reason?: string;
    /** Время модерации */
    moderated_at?: string;
  };
}

/**
 * Статус ответа
 * Answer status
 */
enum AnswerStatus {
  /** Ожидает модерации */
  PENDING = 'pending',
  /** Опубликован */
  PUBLISHED = 'published',
  /** Отклонён модерацией */
  REJECTED = 'rejected',
  /** Удалён */
  DELETED = 'deleted',
  /** Скрыт */
  HIDDEN = 'hidden'
}
```

### Supporting Types

```typescript
/**
 * Шаблон ответа
 * Answer template
 */
interface AnswerTemplate {
  /** Идентификатор шаблона */
  template_id: string;
  /** Название шаблона */
  title: string;
  /** Текст шаблона */
  text: string;
  /** Категория товаров для шаблона */
  category_id?: number;
  /** Теги для фильтрации */
  tags: string[];
  /** Частота использования */
  usage_count: number;
  /** Дата последнего использования */
  last_used: string;
}

/**
 * Статистика ответов
 * Answer statistics
 */
interface AnswerStatistics {
  /** Общее количество ответов */
  total_answers: number;
  /** Ответов в ожидании модерации */
  pending_answers: number;
  /** Опубликованных ответов */
  published_answers: number;
  /** Средний рейтинг ответов */
  average_rating: number;
  /** Среднее время ответа (в минутах) */
  average_response_time: number;
  /** Статистика по дням */
  daily_stats: DailyAnswerStats[];
}

interface DailyAnswerStats {
  /** Дата */
  date: string;
  /** Количество ответов */
  answers_count: number;
  /** Среднее время ответа */
  avg_response_time: number;
  /** Средний рейтинг */
  avg_rating: number;
}

/**
 * Настройки автоответчика
 * Auto-answer settings
 */
interface AutoAnswerSettings {
  /** Включён ли автоответчик */
  enabled: boolean;
  /** Шаблоны для автоответов */
  templates: AutoAnswerTemplate[];
  /** Рабочие часы */
  working_hours: {
    /** Начало рабочего дня */
    start: string;
    /** Конец рабочего дня */
    end: string;
    /** Рабочие дни недели */
    working_days: number[];
  };
  /** Максимальное время ожидания ответа (в часах) */
  max_response_time: number;
}

interface AutoAnswerTemplate {
  /** Ключевые слова для триггера */
  keywords: string[];
  /** Текст автоответа */
  response_text: string;
  /** Приоритет шаблона */
  priority: number;
}
```

---

## 🛠️ Практические примеры использования

### 1. Создание ответов на вопросы

```typescript
import { QuestionsAnswersApi } from 'daytona-ozon-seller-api';

const qaApi = new QuestionsAnswersApi(httpClient);

// Создание простого ответа
async function createSimpleAnswer(questionId: string, answerText: string): Promise<void> {
  try {
    console.log(`✍️ Создание ответа на вопрос ${questionId}...`);
    
    const response = await qaApi.createAnswer({
      question_id: questionId,
      text: answerText
    });

    if (response.result?.answer_id) {
      console.log(`✅ Ответ создан с ID: ${response.result.answer_id}`);
      console.log(`📋 Статус: ${response.result.status}`);
      console.log(`🕐 Создан: ${new Date(response.result.created_at).toLocaleString()}`);
      
      if (response.result.status === 'pending') {
        console.log('⏳ Ответ ожидает модерации перед публикацией');
      }
    }

  } catch (error) {
    console.error('❌ Ошибка при создании ответа:', error);
    throw error;
  }
}

// Создание персонализированного ответа с проверками
async function createPersonalizedAnswer(questionId: string): Promise<void> {
  try {
    // Сначала получаем информацию о вопросе
    const questionInfo = await qaApi.getQuestionInfo({
      question_id: questionId
    });

    if (!questionInfo.result) {
      throw new Error('Вопрос не найден');
    }

    const question = questionInfo.result;
    console.log(`📝 Отвечаем на вопрос: "${question.text}"`);
    console.log(`🛍️ Товар: ${question.product?.name} (SKU: ${question.product?.sku})`);

    // Генерируем персонализированный ответ
    const personalizedAnswer = generatePersonalizedResponse(question);

    const response = await qaApi.createAnswer({
      question_id: questionId,
      text: personalizedAnswer
    });

    if (response.result?.answer_id) {
      console.log(`✅ Персонализированный ответ создан: ${response.result.answer_id}`);
      
      // Сохраняем информацию для статистики
      await logAnswerActivity(questionId, response.result.answer_id, 'created');
    }

  } catch (error) {
    console.error('❌ Ошибка при создании персонализированного ответа:', error);
    throw error;
  }
}

// Массовое создание ответов с использованием шаблонов
async function bulkCreateAnswers(questionAnswerPairs: {questionId: string, templateId: string}[]): Promise<void> {
  console.log(`📦 Массовое создание ответов для ${questionAnswerPairs.length} вопросов...`);
  
  const results: {questionId: string, success: boolean, answerId?: string, error?: string}[] = [];
  
  // Загружаем шаблоны ответов
  const templates = await loadAnswerTemplates();

  for (const pair of questionAnswerPairs) {
    try {
      const template = templates.find(t => t.template_id === pair.templateId);
      if (!template) {
        results.push({
          questionId: pair.questionId,
          success: false,
          error: 'Шаблон не найден'
        });
        continue;
      }

      // Применяем шаблон с персонализацией
      const personalizedText = await applyTemplate(template, pair.questionId);
      
      const response = await qaApi.createAnswer({
        question_id: pair.questionId,
        text: personalizedText
      });

      if (response.result?.answer_id) {
        results.push({
          questionId: pair.questionId,
          success: true,
          answerId: response.result.answer_id
        });

        // Обновляем статистику использования шаблона
        await updateTemplateUsage(pair.templateId);
      }

      // Пауза между запросами
      await delay(1000);

    } catch (error) {
      results.push({
        questionId: pair.questionId,
        success: false,
        error: error instanceof Error ? error.message : 'Неизвестная ошибка'
      });
    }
  }

  // Статистика результатов
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;

  console.log(`📊 Результаты массового создания ответов:`);
  console.log(`✅ Успешно: ${successful}/${questionAnswerPairs.length}`);
  console.log(`❌ Ошибок: ${failed}`);

  if (failed > 0) {
    console.log('\n❌ Вопросы с ошибками:');
    results.filter(r => !r.success).forEach(result => {
      console.log(`  ${result.questionId}: ${result.error}`);
    });
  }
}

// Вспомогательные функции
function generatePersonalizedResponse(question: any): string {
  const customerName = question.customer?.name || 'Уважаемый покупатель';
  const productName = question.product?.name || 'товар';
  
  // Базовый персонализированный ответ
  let response = `Здравствуйте, ${customerName}!\n\n`;
  
  // Анализируем тип вопроса и генерируем соответствующий ответ
  if (question.text.toLowerCase().includes('размер')) {
    response += `Спасибо за интерес к ${productName}. По вопросу размеров:\n`;
    response += `У нас есть подробная таблица размеров в описании товара. `;
    response += `Если у вас остались вопросы по выбору размера, рекомендую ориентироваться на ваши обычные размеры.\n\n`;
  } else if (question.text.toLowerCase().includes('доставка')) {
    response += `Относительно доставки ${productName}:\n`;
    response += `Доставка осуществляется курьерской службой или в пункты выдачи. `;
    response += `Точные сроки и стоимость вы можете посмотреть при оформлении заказа.\n\n`;
  } else if (question.text.toLowerCase().includes('цвет') || question.text.toLowerCase().includes('цветн')) {
    response += `По поводу цвета ${productName}:\n`;
    response += `Цвета на фотографиях максимально приближены к реальным. `;
    response += `При возникновении расхождений, вы можете воспользоваться правом возврата.\n\n`;
  } else {
    response += `Спасибо за ваш вопрос о ${productName}. `;
    response += `Мы постарались максимально подробно описать товар в карточке. `;
    response += `Если информации недостаточно, напишите нам дополнительные вопросы.\n\n`;
  }
  
  response += `С уважением,\nКоманда поддержки`;
  
  return response;
}

async function loadAnswerTemplates(): Promise<AnswerTemplate[]> {
  // В реальном приложении здесь будет загрузка из базы данных
  return [
    {
      template_id: 'size_question',
      title: 'Вопрос о размерах',
      text: 'Спасибо за вопрос! Размерная таблица доступна в описании товара...',
      tags: ['размер', 'размеры', 'size'],
      usage_count: 156,
      last_used: new Date().toISOString()
    },
    {
      template_id: 'delivery_question', 
      title: 'Вопрос о доставке',
      text: 'Доставка осуществляется по всей России...',
      tags: ['доставка', 'shipping'],
      usage_count: 89,
      last_used: new Date().toISOString()
    }
  ];
}

async function applyTemplate(template: AnswerTemplate, questionId: string): Promise<string> {
  // Получаем контекст вопроса для персонализации
  const questionInfo = await qaApi.getQuestionInfo({ question_id: questionId });
  
  let personalizedText = template.text;
  
  if (questionInfo.result?.product?.name) {
    personalizedText = personalizedText.replace(
      /товар/g, 
      questionInfo.result.product.name
    );
  }

  return personalizedText;
}

async function updateTemplateUsage(templateId: string): Promise<void> {
  // В реальном приложении здесь будет обновление статистики в БД
  console.log(`📊 Обновлена статистика использования шаблона: ${templateId}`);
}

async function logAnswerActivity(questionId: string, answerId: string, action: string): Promise<void> {
  // Логирование активности для аналитики
  console.log(`📝 Активность: ${action} - вопрос ${questionId}, ответ ${answerId}`);
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Примеры использования
await createSimpleAnswer('question-123', 'Спасибо за ваш вопрос! Товар доступен в размерах S, M, L, XL.');

await createPersonalizedAnswer('question-456');

await bulkCreateAnswers([
  { questionId: 'question-789', templateId: 'size_question' },
  { questionId: 'question-012', templateId: 'delivery_question' }
]);
```

### 2. Получение и анализ ответов

```typescript
// Получение всех ответов на вопрос с анализом
async function analyzeQuestionAnswers(questionId: string): Promise<void> {
  try {
    console.log(`🔍 Анализ ответов на вопрос ${questionId}...`);
    
    const response = await qaApi.getAnswersList({
      question_id: questionId,
      limit: 100
    });

    if (!response.result?.answers?.length) {
      console.log('ℹ️ Ответов на этот вопрос пока нет');
      return;
    }

    const answers = response.result.answers;
    console.log(`📋 Найдено ответов: ${answers.length}`);

    // Анализируем ответы
    const analysis = {
      total_answers: answers.length,
      by_status: countByStatus(answers),
      by_author: countByAuthor(answers),
      rating_stats: calculateRatingStats(answers),
      response_times: calculateResponseTimes(answers),
      moderation_stats: calculateModerationStats(answers)
    };

    console.log('\n📊 Анализ ответов:');
    console.log(`📝 Всего ответов: ${analysis.total_answers}`);
    
    console.log('\n📋 По статусам:');
    Object.entries(analysis.by_status).forEach(([status, count]) => {
      console.log(`  ${getStatusIcon(status)} ${status}: ${count}`);
    });

    console.log('\n👤 По авторам:');
    Object.entries(analysis.by_author).forEach(([type, count]) => {
      console.log(`  ${getAuthorIcon(type)} ${type}: ${count}`);
    });

    if (analysis.rating_stats.total_rated > 0) {
      console.log('\n⭐ Рейтинги:');
      console.log(`  Средний рейтинг: ${analysis.rating_stats.average_score.toFixed(1)}`);
      console.log(`  Лайков: ${analysis.rating_stats.total_likes}`);
      console.log(`  Дизлайков: ${analysis.rating_stats.total_dislikes}`);
    }

    // Рекомендации по улучшению
    const recommendations = generateAnswerRecommendations(analysis, answers);
    if (recommendations.length > 0) {
      console.log('\n💡 Рекомендации:');
      recommendations.forEach(rec => console.log(`  ${rec}`));
    }

  } catch (error) {
    console.error('❌ Ошибка при анализе ответов:', error);
    throw error;
  }
}

// Мониторинг качества ответов
async function monitorAnswerQuality(): Promise<void> {
  try {
    console.log('📊 Мониторинг качества ответов...');

    // Получаем статистику по всем последним ответам
    const recentAnswers = await getAllRecentAnswers();
    
    if (recentAnswers.length === 0) {
      console.log('ℹ️ Нет данных для анализа качества');
      return;
    }

    const qualityReport = analyzeAnswerQuality(recentAnswers);
    
    console.log('\n📈 Отчёт о качестве ответов:');
    console.log(`📝 Проанализировано ответов: ${recentAnswers.length}`);
    console.log(`⭐ Средняя оценка: ${qualityReport.average_rating.toFixed(2)}`);
    console.log(`⏱️ Среднее время ответа: ${qualityReport.average_response_time} мин`);
    console.log(`✅ Ответов с высокой оценкой: ${qualityReport.high_quality_count}/${recentAnswers.length}`);
    console.log(`⚠️ Ответов требующих внимания: ${qualityReport.low_quality_count}`);

    // Топ лучших и худших ответов
    if (qualityReport.top_answers.length > 0) {
      console.log('\n🏆 Лучшие ответы:');
      qualityReport.top_answers.slice(0, 3).forEach((answer, index) => {
        console.log(`  ${index + 1}. ${answer.answer_id}: ${answer.rating?.score || 0} баллов`);
      });
    }

    if (qualityReport.worst_answers.length > 0) {
      console.log('\n⚠️ Ответы для улучшения:');
      qualityReport.worst_answers.slice(0, 3).forEach((answer, index) => {
        console.log(`  ${index + 1}. ${answer.answer_id}: ${answer.rating?.score || 0} баллов`);
      });
    }

  } catch (error) {
    console.error('❌ Ошибка при мониторинге качества:', error);
    throw error;
  }
}

// Вспомогательные функции для анализа
function countByStatus(answers: AnswerInfo[]): Record<string, number> {
  return answers.reduce((acc, answer) => {
    acc[answer.status] = (acc[answer.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
}

function countByAuthor(answers: AnswerInfo[]): Record<string, number> {
  return answers.reduce((acc, answer) => {
    acc[answer.author.type] = (acc[answer.author.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
}

function calculateRatingStats(answers: AnswerInfo[]) {
  const ratedAnswers = answers.filter(a => a.rating);
  
  if (ratedAnswers.length === 0) {
    return {
      total_rated: 0,
      average_score: 0,
      total_likes: 0,
      total_dislikes: 0
    };
  }

  return {
    total_rated: ratedAnswers.length,
    average_score: ratedAnswers.reduce((sum, a) => sum + (a.rating?.score || 0), 0) / ratedAnswers.length,
    total_likes: ratedAnswers.reduce((sum, a) => sum + (a.rating?.likes || 0), 0),
    total_dislikes: ratedAnswers.reduce((sum, a) => sum + (a.rating?.dislikes || 0), 0)
  };
}

function calculateResponseTimes(answers: AnswerInfo[]) {
  // В реальном приложении здесь был бы расчёт времени между вопросом и ответом
  return {
    average_minutes: 45,
    fastest_minutes: 5,
    slowest_minutes: 180
  };
}

function calculateModerationStats(answers: AnswerInfo[]) {
  const withModeration = answers.filter(a => a.moderation);
  
  return {
    total_moderated: withModeration.length,
    approved: withModeration.filter(a => a.moderation?.status === 'approved').length,
    rejected: withModeration.filter(a => a.moderation?.status === 'rejected').length,
    pending: withModeration.filter(a => a.moderation?.status === 'pending').length
  };
}

function generateAnswerRecommendations(analysis: any, answers: AnswerInfo[]): string[] {
  const recommendations: string[] = [];

  if (analysis.by_status.pending > analysis.total_answers * 0.3) {
    recommendations.push('🕐 Много ответов ожидают модерации - проверьте их качество');
  }

  if (analysis.rating_stats.average_score < 3) {
    recommendations.push('⭐ Низкий средний рейтинг ответов - улучшите качество контента');
  }

  if (analysis.response_times.average_minutes > 60) {
    recommendations.push('⏱️ Долгое время ответа - рассмотрите автоматизацию простых ответов');
  }

  const rejectedCount = analysis.moderation_stats.rejected;
  if (rejectedCount > 0) {
    recommendations.push(`❌ ${rejectedCount} ответов отклонено модерацией - изучите причины отклонения`);
  }

  return recommendations;
}

function getStatusIcon(status: string): string {
  const icons: Record<string, string> = {
    'published': '✅',
    'pending': '⏳',
    'rejected': '❌',
    'deleted': '🗑️',
    'hidden': '👁️‍🗨️'
  };
  return icons[status] || '📋';
}

function getAuthorIcon(type: string): string {
  const icons: Record<string, string> = {
    'seller': '🏪',
    'support': '🎧',
    'system': '🤖'
  };
  return icons[type] || '👤';
}

async function getAllRecentAnswers(): Promise<AnswerInfo[]> {
  // В реальном приложении здесь была бы загрузка из API
  // Для примера возвращаем mock данные
  return [];
}

function analyzeAnswerQuality(answers: AnswerInfo[]) {
  return {
    average_rating: 4.2,
    average_response_time: 35,
    high_quality_count: answers.filter(a => (a.rating?.score || 0) >= 4).length,
    low_quality_count: answers.filter(a => (a.rating?.score || 0) < 3).length,
    top_answers: answers.filter(a => (a.rating?.score || 0) >= 4).sort((a, b) => (b.rating?.score || 0) - (a.rating?.score || 0)),
    worst_answers: answers.filter(a => (a.rating?.score || 0) < 3).sort((a, b) => (a.rating?.score || 0) - (b.rating?.score || 0))
  };
}

// Примеры использования
await analyzeQuestionAnswers('question-123');
await monitorAnswerQuality();
```

### 3. Удаление ответов с проверками

```typescript
// Безопасное удаление ответа с проверками
async function safeDeleteAnswer(answerId: string): Promise<void> {
  try {
    console.log(`🗑️ Подготовка к удалению ответа ${answerId}...`);

    // Сначала получаем информацию об ответе
    const answerInfo = await getAnswerInfo(answerId);
    
    if (!answerInfo) {
      throw new Error('Ответ не найден');
    }

    // Проверяем, можно ли удалить ответ
    const canDelete = await validateAnswerDeletion(answerInfo);
    
    if (!canDelete.allowed) {
      console.warn(`⚠️ Нельзя удалить ответ: ${canDelete.reason}`);
      return;
    }

    // Создаём резервную копию перед удалением
    await backupAnswer(answerInfo);

    // Удаляем ответ
    const result = await qaApi.deleteAnswer({
      answer_id: answerId
    });

    if (result.result) {
      console.log(`✅ Ответ ${answerId} успешно удалён`);
      
      // Логируем удаление для аудита
      await logAnswerActivity(answerInfo.question_id, answerId, 'deleted');
      
      // Уведомляем о необходимости нового ответа, если это был единственный ответ
      await checkAndNotifyMissingAnswer(answerInfo.question_id);
      
    } else {
      throw new Error('Не удалось удалить ответ');
    }

  } catch (error) {
    console.error('❌ Ошибка при удалении ответа:', error);
    throw error;
  }
}

// Массовое удаление ответов с фильтрацией
async function bulkDeleteAnswers(answerIds: string[], options: {
  force?: boolean;
  backup?: boolean;
}): Promise<void> {
  console.log(`🗑️ Массовое удаление ${answerIds.length} ответов...`);
  
  const results: {answerId: string, success: boolean, error?: string}[] = [];
  
  for (const answerId of answerIds) {
    try {
      if (!options.force) {
        // Проверяем каждый ответ перед удалением
        const answerInfo = await getAnswerInfo(answerId);
        if (answerInfo) {
          const canDelete = await validateAnswerDeletion(answerInfo);
          if (!canDelete.allowed) {
            results.push({
              answerId,
              success: false,
              error: canDelete.reason
            });
            continue;
          }
        }
      }

      if (options.backup) {
        const answerInfo = await getAnswerInfo(answerId);
        if (answerInfo) {
          await backupAnswer(answerInfo);
        }
      }

      const result = await qaApi.deleteAnswer({ answer_id: answerId });
      
      results.push({
        answerId,
        success: result.result,
        error: result.result ? undefined : 'Не удалось удалить'
      });

      // Пауза между удалениями
      await delay(500);

    } catch (error) {
      results.push({
        answerId,
        success: false,
        error: error instanceof Error ? error.message : 'Неизвестная ошибка'
      });
    }
  }

  // Статистика результатов
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;

  console.log(`📊 Результаты массового удаления:`);
  console.log(`✅ Успешно удалено: ${successful}/${answerIds.length}`);
  console.log(`❌ Ошибок: ${failed}`);

  if (failed > 0) {
    console.log('\n❌ Ответы с ошибками:');
    results.filter(r => !r.success).forEach(result => {
      console.log(`  ${result.answerId}: ${result.error}`);
    });
  }
}

// Вспомогательные функции для удаления
async function getAnswerInfo(answerId: string): Promise<AnswerInfo | null> {
  // В реальном приложении здесь будет запрос к API
  // Возвращаем mock данные для примера
  return {
    answer_id: answerId,
    question_id: 'question-123',
    text: 'Пример ответа',
    status: AnswerStatus.PUBLISHED,
    author: {
      type: 'seller',
      name: 'Продавец'
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    rating: {
      likes: 5,
      dislikes: 1,
      score: 4
    }
  };
}

async function validateAnswerDeletion(answer: AnswerInfo): Promise<{allowed: boolean, reason?: string}> {
  // Проверяем различные условия для безопасного удаления
  
  if (answer.status === AnswerStatus.DELETED) {
    return { allowed: false, reason: 'Ответ уже удалён' };
  }

  if (answer.rating && answer.rating.score > 4) {
    return { allowed: false, reason: 'Ответ имеет высокий рейтинг и может быть полезен другим покупателям' };
  }

  if (answer.rating && answer.rating.likes > 10) {
    return { allowed: false, reason: 'Ответ получил много лайков от покупателей' };
  }

  // Проверяем возраст ответа
  const createdDate = new Date(answer.created_at);
  const daysSinceCreation = (Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24);
  
  if (daysSinceCreation > 30 && answer.rating && answer.rating.score >= 3) {
    return { 
      allowed: false, 
      reason: 'Старый ответ с положительным рейтингом - рекомендуется сохранить для истории' 
    };
  }

  return { allowed: true };
}

async function backupAnswer(answer: AnswerInfo): Promise<void> {
  // Сохраняем резервную копию ответа
  const backup = {
    ...answer,
    backup_date: new Date().toISOString(),
    backup_reason: 'Pre-deletion backup'
  };

  // В реальном приложении здесь была бы запись в базу данных или файл
  console.log(`💾 Создана резервная копия ответа ${answer.answer_id}`);
}

async function checkAndNotifyMissingAnswer(questionId: string): Promise<void> {
  // Проверяем, остались ли ответы на вопрос
  const answers = await qaApi.getAnswersList({
    question_id: questionId,
    limit: 1
  });

  if (!answers.result?.answers?.length) {
    console.log(`⚠️ Вопрос ${questionId} остался без ответов - требуется новый ответ`);
    
    // В реальном приложении здесь могло бы быть уведомление команды поддержки
    await notifyMissingAnswer(questionId);
  }
}

async function notifyMissingAnswer(questionId: string): Promise<void> {
  // Уведомление о необходимости ответа
  console.log(`📢 Уведомление: требуется ответ на вопрос ${questionId}`);
}

// Примеры использования
await safeDeleteAnswer('answer-123');

await bulkDeleteAnswers(['answer-456', 'answer-789'], {
  force: false,
  backup: true
});
```

---

## 🎯 Бизнес-логика и автоматизация

### Система шаблонов ответов

```typescript
/**
 * Менеджер шаблонов ответов для автоматизации
 */
class AnswerTemplateManager {
  constructor(private qaApi: QuestionsAnswersApi) {}

  /**
   * Автоматический выбор шаблона на основе анализа вопроса
   */
  async selectTemplateForQuestion(questionId: string): Promise<AnswerTemplate | null> {
    try {
      const questionInfo = await this.qaApi.getQuestionInfo({ question_id: questionId });
      
      if (!questionInfo.result) {
        return null;
      }

      const question = questionInfo.result;
      const templates = await loadAnswerTemplates();
      
      // Анализируем вопрос и подбираем наиболее подходящий шаблон
      const matchedTemplate = this.findBestMatchingTemplate(question.text, templates);
      
      if (matchedTemplate) {
        console.log(`🎯 Выбран шаблон "${matchedTemplate.title}" для вопроса ${questionId}`);
      }

      return matchedTemplate;

    } catch (error) {
      console.error('❌ Ошибка при выборе шаблона:', error);
      return null;
    }
  }

  private findBestMatchingTemplate(questionText: string, templates: AnswerTemplate[]): AnswerTemplate | null {
    const questionLower = questionText.toLowerCase();
    let bestMatch: AnswerTemplate | null = null;
    let bestScore = 0;

    for (const template of templates) {
      let score = 0;
      
      // Проверяем совпадения с тегами шаблона
      for (const tag of template.tags) {
        if (questionLower.includes(tag.toLowerCase())) {
          score += 1;
        }
      }

      // Бонус за частоту использования (популярные шаблоны)
      score += Math.min(template.usage_count / 100, 0.5);

      if (score > bestScore) {
        bestScore = score;
        bestMatch = template;
      }
    }

    return bestScore > 0.5 ? bestMatch : null;
  }

  /**
   * Создание ответа с использованием шаблона
   */
  async createAnswerFromTemplate(questionId: string, templateId: string): Promise<void> {
    try {
      const template = await this.getTemplate(templateId);
      if (!template) {
        throw new Error('Шаблон не найден');
      }

      const personalizedText = await applyTemplate(template, questionId);
      
      const response = await this.qaApi.createAnswer({
        question_id: questionId,
        text: personalizedText
      });

      if (response.result?.answer_id) {
        console.log(`✅ Ответ создан с использованием шаблона "${template.title}"`);
        await updateTemplateUsage(templateId);
      }

    } catch (error) {
      console.error('❌ Ошибка при создании ответа по шаблону:', error);
      throw error;
    }
  }

  private async getTemplate(templateId: string): Promise<AnswerTemplate | null> {
    const templates = await loadAnswerTemplates();
    return templates.find(t => t.template_id === templateId) || null;
  }
}
```

---

## 📈 KPI и метрики эффективности

### Основные показатели управления ответами
- **Время ответа**: Среднее время от получения вопроса до публикации ответа
- **Качество ответов**: Средний рейтинг полезности от покупателей
- **Покрытие**: % вопросов, получивших ответ
- **Модерация**: % ответов, прошедших модерацию с первого раза

### Метрики эффективности команды
- **Производительность**: Количество ответов на оператора в день
- **Качество работы**: Средний рейтинг ответов по операторам
- **Использование шаблонов**: Эффективность стандартизированных ответов
- **Повторные вопросы**: % вопросов, требующих дополнительных ответов

---

## ⚠️ Рекомендации и лучшие практики

### Создание качественных ответов
1. **Персонализация**: Обращайтесь к покупателю по имени, упоминайте конкретный товар
2. **Полнота**: Отвечайте на все части составного вопроса
3. **Структура**: Используйте абзацы и списки для читаемости
4. **Тон**: Поддерживайте дружелюбный и профессиональный тон

### Управление шаблонами
1. **Актуализация**: Регулярно обновляйте шаблоны на основе новых вопросов
2. **Категоризация**: Создавайте шаблоны для разных типов товаров
3. **Метрики**: Отслеживайте эффективность каждого шаблона
4. **Персонализация**: Адаптируйте шаблоны под конкретные товары

### Модерация и качество
1. **Предварительная проверка**: Проверяйте ответы перед публикацией
2. **Мониторинг рейтингов**: Анализируйте отзывы на ответы
3. **Обучение команды**: Регулярно обучайте операторов поддержки
4. **Автоматизация**: Используйте шаблоны для типовых вопросов