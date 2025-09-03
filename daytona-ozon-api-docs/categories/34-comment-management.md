# Управление комментариями - Comment Management API

API для управления комментариями продавца на отзывы покупателей. Обеспечивает полный цикл взаимодействия с клиентами через систему комментариев с поддержкой многоуровневых диалогов.

**⚠️ ТРЕБУЕТ ПОДПИСКУ PREMIUM PLUS** — доступно только для продавцов с подпиской Premium Plus.

---

## 💬 Методы управления комментариями

### 1. createComment()
Создание комментария продавца на отзыв покупателя с возможностью автоматической смены статуса отзыва.

**Применение**: Ответы на отзывы, диалог с покупателями, управление репутацией.

#### Типизация запроса
```typescript
interface CommentCreateRequest {
  /** Идентификатор отзыва */
  review_id: string;
  
  /** Текст комментария */
  text: string;
  
  /** 
   * Обновление статуса у отзыва:
   * - `true` — статус изменится на `PROCESSED`.
   * - `false` — статус не изменится.
   */
  mark_review_as_processed?: boolean;
  
  /** Идентификатор родительского комментария, на который вы отвечаете */
  parent_comment_id?: string;
}
```

#### Типизация ответа
```typescript
interface CommentCreateResponse {
  /** Идентификатор созданного комментария */
  comment_id?: string;
}
```

### 2. deleteComment()
Удаление ранее оставленного комментария продавца.

**Применение**: Исправление ошибок, удаление некорректных ответов, управление диалогами.

#### Типизация запроса
```typescript
interface CommentDeleteRequest {
  /** Идентификатор комментария */
  comment_id: string;
}
```

#### Типизация ответа
```typescript
interface CommentDeleteResponse {
  /** Результат операции */
  result?: 'ok';
}
```

### 3. getCommentList()
Получение списка комментариев к отзыву, включая комментарии покупателей и продавца.

**Применение**: Просмотр диалогов, анализ взаимодействий, подготовка к ответу.

#### Типизация запроса
```typescript
type CommentSort = 'ASC' | 'DESC';

interface CommentListRequest {
  /** Идентификатор отзыва */
  review_id: string;
  
  /** 
   * Ограничение значений в ответе.
   * Минимум — 20. Максимум — 100.
   */
  limit: number;
  
  /** 
   * Количество элементов, которое будет пропущено с начала списка в ответе. 
   * Например, если `offset = 10`, то ответ начнётся с 11-го найденного элемента.
   */
  offset?: number;
  
  /** Направление сортировки */
  sort_dir?: CommentSort;
}
```

#### Типизация ответа
```typescript
interface ReviewComment {
  /** Идентификатор комментария */
  id: string;
  
  /** Текст комментария */
  text: string;
  
  /** Дата публикации комментария */
  published_at: string;
  
  /** `true`, если комментарий оставило официальное лицо, `false` — покупатель */
  is_official: boolean;
  
  /** `true`, если комментарий оставил продавец, `false` — покупатель */
  is_owner: boolean;
  
  /** Идентификатор родительского комментария, на который ответили */
  parent_comment_id?: string;
}

interface CommentListResponse {
  /** Информация о комментариях */
  comments?: ReviewComment[];
  
  /** Количество пропущенных элементов (для пагинации) */
  offset?: number;
}
```

---

## 🔧 Практические примеры использования

### Базовый пример работы с комментариями
```typescript
import { ReviewApi } from 'daytona-ozon-seller-api';

const reviewApi = new ReviewApi(httpClient);

try {
  const reviewId = 'review-123456';
  
  // 1. Получить существующие комментарии к отзыву
  console.log('📋 Получение существующих комментариев...');
  
  const existingComments = await reviewApi.getCommentList({
    review_id: reviewId,
    limit: 50,
    sort_dir: 'ASC' // От старых к новым
  });

  if (existingComments.comments && existingComments.comments.length > 0) {
    console.log(`💬 Найдено ${existingComments.comments.length} комментариев:`);
    
    existingComments.comments.forEach((comment, index) => {
      const authorIcon = comment.is_owner ? '👤' : '👥';
      const authorType = comment.is_owner ? 'Продавец' : 'Покупатель';
      const officialMark = comment.is_official ? ' 🏢' : '';
      const parentMark = comment.parent_comment_id ? ` ↳ отвечает на ${comment.parent_comment_id}` : '';
      
      console.log(`\n${index + 1}. ${authorIcon} ${authorType}${officialMark}${parentMark}`);
      console.log(`   ID: ${comment.id}`);
      console.log(`   Дата: ${comment.published_at}`);
      console.log(`   Текст: "${comment.text}"`);
    });
  } else {
    console.log('📭 Комментариев к отзыву пока нет');
  }

  // 2. Создать новый комментарий
  console.log('\n✍️ Создание нового комментария...');
  
  const newComment = await reviewApi.createComment({
    review_id: reviewId,
    text: 'Спасибо за ваш отзыв! Мы ценим ваше мнение и будем работать над улучшением наших товаров и сервиса.',
    mark_review_as_processed: true
  });

  if (newComment.comment_id) {
    console.log(`✅ Комментарий успешно создан с ID: ${newComment.comment_id}`);
    console.log('📝 Статус отзыва изменён на "PROCESSED"');
    
    // 3. Получить обновлённый список комментариев
    const updatedComments = await reviewApi.getCommentList({
      review_id: reviewId,
      limit: 50,
      sort_dir: 'DESC' // Новые сначала
    });
    
    if (updatedComments.comments) {
      const latestComment = updatedComments.comments[0];
      if (latestComment.is_owner) {
        console.log('🎉 Ваш комментарий успешно добавлен:');
        console.log(`   "${latestComment.text}"`);
        console.log(`   Дата публикации: ${latestComment.published_at}`);
      }
    }
  }

} catch (error) {
  console.error('❌ Ошибка работы с комментариями:', error);
}
```

### Многоуровневый диалог с покупателем
```typescript
const manageDialogWithCustomer = async (reviewId: string): Promise<void> => {
  try {
    console.log(`🗣️ Управление диалогом для отзыва ${reviewId}`);
    
    // Получить все комментарии
    const comments = await reviewApi.getCommentList({
      review_id: reviewId,
      limit: 100,
      sort_dir: 'ASC'
    });

    if (!comments.comments || comments.comments.length === 0) {
      console.log('💬 Диалог пуст, создаём первый комментарий...');
      
      const firstComment = await reviewApi.createComment({
        review_id: reviewId,
        text: 'Здравствуйте! Спасибо за ваш отзыв. Если у вас есть какие-либо вопросы или пожелания, мы всегда готовы помочь.',
        mark_review_as_processed: true
      });
      
      console.log(`✅ Первый комментарий создан: ${firstComment.comment_id}`);
      return;
    }

    // Анализ структуры диалога
    console.log(`\n📊 АНАЛИЗ ДИАЛОГА (${comments.comments.length} комментариев):`);
    
    const dialogStructure = {
      total: comments.comments.length,
      byAuthor: {
        seller: comments.comments.filter(c => c.is_owner).length,
        customer: comments.comments.filter(c => !c.is_owner).length
      },
      official: comments.comments.filter(c => c.is_official).length,
      withParent: comments.comments.filter(c => c.parent_comment_id).length,
      rootLevel: comments.comments.filter(c => !c.parent_comment_id).length
    };
    
    console.log(`Всего комментариев: ${dialogStructure.total}`);
    console.log(`От продавца: ${dialogStructure.byAuthor.seller}`);
    console.log(`От покупателя: ${dialogStructure.byAuthor.customer}`);
    console.log(`Официальных: ${dialogStructure.official}`);
    console.log(`Ответов на комментарии: ${dialogStructure.withParent}`);
    console.log(`Комментариев верхнего уровня: ${dialogStructure.rootLevel}`);
    
    // Построение дерева комментариев
    const commentTree = buildCommentTree(comments.comments);
    console.log(`\n🌳 СТРУКТУРА ДИАЛОГА:`);
    displayCommentTree(commentTree);
    
    // Поиск последних комментариев покупателя без ответа
    const unansweredCustomerComments = findUnansweredCustomerComments(comments.comments);
    
    if (unansweredCustomerComments.length > 0) {
      console.log(`\n❓ НЕОБХОДИМО ОТВЕТИТЬ (${unansweredCustomerComments.length} комментариев):`);
      
      for (const comment of unansweredCustomerComments) {
        console.log(`\n💭 Комментарий от покупателя (${comment.published_at}):`);
        console.log(`"${comment.text}"`);
        
        // Генерация персонализированного ответа
        const suggestedReply = generatePersonalizedReply(comment, comments.comments);
        console.log(`💡 Рекомендуемый ответ: "${suggestedReply}"`);
        
        // Создание ответа (в реальном приложении можно добавить подтверждение)
        const reply = await reviewApi.createComment({
          review_id: reviewId,
          text: suggestedReply,
          parent_comment_id: comment.id,
          mark_review_as_processed: true
        });
        
        console.log(`✅ Ответ создан с ID: ${reply.comment_id}`);
        
        // Пауза между ответами
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    } else {
      console.log('✅ Все комментарии покупателей имеют ответы');
    }
    
  } catch (error) {
    console.error('❌ Ошибка управления диалогом:', error);
  }
};

// Построение дерева комментариев
interface CommentTreeNode extends ReviewComment {
  children: CommentTreeNode[];
  depth: number;
}

const buildCommentTree = (comments: ReviewComment[]): CommentTreeNode[] => {
  const commentMap = new Map<string, CommentTreeNode>();
  const rootComments: CommentTreeNode[] = [];

  // Создание узлов
  comments.forEach(comment => {
    commentMap.set(comment.id, {
      ...comment,
      children: [],
      depth: 0
    });
  });

  // Построение дерева
  comments.forEach(comment => {
    const node = commentMap.get(comment.id)!;
    
    if (comment.parent_comment_id) {
      const parent = commentMap.get(comment.parent_comment_id);
      if (parent) {
        parent.children.push(node);
        node.depth = parent.depth + 1;
      } else {
        rootComments.push(node); // Родитель не найден
      }
    } else {
      rootComments.push(node);
    }
  });

  return rootComments;
};

// Отображение дерева комментариев
const displayCommentTree = (tree: CommentTreeNode[], indent: string = ''): void => {
  tree.forEach((node, index) => {
    const isLast = index === tree.length - 1;
    const connector = isLast ? '└─ ' : '├─ ';
    const authorIcon = node.is_owner ? '👤' : '👥';
    const authorType = node.is_owner ? 'Продавец' : 'Покупатель';
    
    console.log(`${indent}${connector}${authorIcon} ${authorType}: "${node.text.substring(0, 60)}${node.text.length > 60 ? '...' : ''}"`);
    
    if (node.children.length > 0) {
      const nextIndent = indent + (isLast ? '    ' : '│   ');
      displayCommentTree(node.children, nextIndent);
    }
  });
};

// Поиск неотвеченных комментариев покупателя
const findUnansweredCustomerComments = (comments: ReviewComment[]): ReviewComment[] => {
  const customerComments = comments.filter(c => !c.is_owner);
  const sellerReplies = new Set(
    comments
      .filter(c => c.is_owner && c.parent_comment_id)
      .map(c => c.parent_comment_id)
  );

  return customerComments.filter(comment => !sellerReplies.has(comment.id));
};

// Генерация персонализированного ответа
const generatePersonalizedReply = (
  customerComment: ReviewComment, 
  allComments: ReviewComment[]
): string => {
  const text = customerComment.text.toLowerCase();
  
  // Простая логика генерации ответов на основе ключевых слов
  if (text.includes('спасибо') || text.includes('благодар')) {
    return 'Спасибо за тёплые слова! Нам очень приятно, что вы довольны покупкой. Всегда рады видеть вас снова!';
  }
  
  if (text.includes('проблема') || text.includes('дефект') || text.includes('брак')) {
    return 'Приносим извинения за доставленные неудобства. Мы обязательно разберём эту ситуацию. Пожалуйста, свяжитесь с нами напрямую для быстрого решения проблемы.';
  }
  
  if (text.includes('доставка') || text.includes('курьер')) {
    return 'Благодарим за информацию о доставке. Мы передадим ваш отзыв логистической службе для улучшения качества обслуживания.';
  }
  
  if (text.includes('размер') || text.includes('маломер') || text.includes('большемер')) {
    return 'Спасибо за информацию о размерах! Мы учтём ваше замечание и постараемся улучшить описание товара для других покупателей.';
  }
  
  if (text.includes('качество')) {
    return 'Благодарим за оценку качества товара. Ваш отзыв помогает нам становиться лучше и улучшать наш ассортимент.';
  }
  
  // Общий ответ
  return 'Спасибо за ваш комментарий! Мы внимательно изучили вашу обратную связь. Если у вас есть дополнительные вопросы, мы всегда готовы помочь.';
};

// Запуск управления диалогом
manageDialogWithCustomer('review-123456');
```

### Пакетная обработка комментариев
```typescript
const batchCommentProcessing = async (): Promise<void> => {
  try {
    console.log('🔄 Запуск пакетной обработки комментариев...');
    
    // Получить все необработанные отзывы
    const unprocessedReviews = await reviewApi.getList({
      limit: 100,
      status: 'UNPROCESSED',
      sort_dir: 'DESC'
    });

    if (!unprocessedReviews.reviews || unprocessedReviews.reviews.length === 0) {
      console.log('✅ Нет необработанных отзывов');
      return;
    }

    console.log(`📋 Найдено ${unprocessedReviews.reviews.length} необработанных отзывов`);
    
    const processingStats = {
      total: unprocessedReviews.reviews.length,
      processed: 0,
      withExistingComments: 0,
      newCommentsCreated: 0,
      errors: 0
    };

    // Обработка каждого отзыва
    for (const review of unprocessedReviews.reviews) {
      try {
        console.log(`\n🔍 Обработка отзыва ${review.id} (SKU: ${review.sku})`);
        
        // Проверить существующие комментарии
        const existingComments = await reviewApi.getCommentList({
          review_id: review.id,
          limit: 20,
          sort_dir: 'ASC'
        });

        const hasSellerComments = existingComments.comments?.some(c => c.is_owner) || false;
        
        if (hasSellerComments) {
          console.log('💬 У отзыва уже есть комментарии продавца');
          processingStats.withExistingComments++;
        } else {
          console.log('✍️ Создание первого комментария продавца...');
          
          // Генерация комментария на основе рейтинга
          const commentText = generateCommentByRating(review.rating, review.text);
          
          const newComment = await reviewApi.createComment({
            review_id: review.id,
            text: commentText,
            mark_review_as_processed: true
          });
          
          if (newComment.comment_id) {
            console.log(`✅ Комментарий создан: ${newComment.comment_id}`);
            processingStats.newCommentsCreated++;
          }
        }
        
        processingStats.processed++;
        
        // Пауза между запросами
        await new Promise(resolve => setTimeout(resolve, 1500));
        
      } catch (error) {
        console.error(`❌ Ошибка обработки отзыва ${review.id}:`, error);
        processingStats.errors++;
      }
    }

    // Итоговая статистика
    console.log('\n📊 ИТОГИ ПАКЕТНОЙ ОБРАБОТКИ:');
    console.log(`Всего отзывов: ${processingStats.total}`);
    console.log(`Обработано: ${processingStats.processed}`);
    console.log(`С существующими комментариями: ${processingStats.withExistingComments}`);
    console.log(`Новых комментариев создано: ${processingStats.newCommentsCreated}`);
    console.log(`Ошибок: ${processingStats.errors}`);
    
    const successRate = ((processingStats.processed - processingStats.errors) / processingStats.total * 100).toFixed(1);
    console.log(`Процент успешности: ${successRate}%`);
    
  } catch (error) {
    console.error('❌ Ошибка пакетной обработки:', error);
  }
};

// Генерация комментария на основе рейтинга
const generateCommentByRating = (rating: number, reviewText: string): string => {
  const text = reviewText.toLowerCase();
  
  if (rating >= 4) {
    // Положительные отзывы
    const positiveResponses = [
      'Спасибо большое за такой замечательный отзыв! Нам очень приятно, что товар вам понравился. 😊',
      'Благодарим за высокую оценку! Ваше мнение очень важно для нас. Рады, что смогли оправдать ваши ожидания!',
      'Огромное спасибо за позитивный отзыв! Мы стараемся предлагать только качественные товары. До новых встреч! 👍'
    ];
    
    return positiveResponses[Math.floor(Math.random() * positiveResponses.length)];
    
  } else if (rating === 3) {
    // Нейтральные отзывы
    return 'Спасибо за ваш отзыв! Мы учтём ваши замечания и будем работать над улучшением. Если у вас есть предложения, мы всегда открыты для диалога.';
    
  } else {
    // Негативные отзывы
    if (text.includes('брак') || text.includes('дефект') || text.includes('поломк')) {
      return 'Приносим искренние извинения за качество товара! Это недопустимо. Пожалуйста, свяжитесь с нами для решения вопроса. Мы обязательно исправим ситуацию.';
    }
    
    if (text.includes('доставка') || text.includes('курьер')) {
      return 'Извините за проблемы с доставкой. Мы передадим вашу информацию службе логистики. Такие случаи недопустимы, и мы примем меры.';
    }
    
    return 'Приносим свои извинения за негативный опыт покупки. Мы обязательно разберём ситуацию и примем все необходимые меры. Пожалуйста, свяжитесь с нами для решения проблемы.';
  }
};

// Запуск пакетной обработки
batchCommentProcessing();
```

---

## 🤖 Автоматизация управления комментариями

### Класс CommentManager
Автоматизированная система управления комментариями с поддержкой шаблонов и персонализации.

```typescript
interface CommentTemplate {
  id: string;
  name: string;
  template: string;
  conditions: {
    ratingRange?: [number, number];
    keywords?: string[];
    hasMedia?: boolean;
    isFirstComment?: boolean;
  };
  variables?: string[];
}

interface CommentManagerConfig {
  /** Максимальная длина комментария */
  maxCommentLength: number;
  
  /** Задержка между созданием комментариев (мс) */
  commentDelay: number;
  
  /** Автоматически помечать отзывы как обработанные */
  autoMarkProcessed: boolean;
  
  /** Включить персонализацию ответов */
  enablePersonalization: boolean;
  
  /** Шаблоны комментариев */
  templates: CommentTemplate[];
}

class CommentManager {
  private reviewApi: ReviewApi;
  private config: CommentManagerConfig;

  constructor(reviewApi: ReviewApi, config: CommentManagerConfig) {
    this.reviewApi = reviewApi;
    this.config = config;
  }

  /**
   * Создание персонализированного комментария
   */
  async createPersonalizedComment(
    reviewId: string,
    reviewData: { rating: number; text: string; photos_amount: number; videos_amount: number },
    parentCommentId?: string
  ): Promise<string | null> {
    try {
      // Получить существующие комментарии
      const existingComments = await this.reviewApi.getCommentList({
        review_id: reviewId,
        limit: 50,
        sort_dir: 'ASC'
      });

      const hasSellerComments = existingComments.comments?.some(c => c.is_owner) || false;
      
      // Найти подходящий шаблон
      const template = this.findMatchingTemplate(reviewData, hasSellerComments);
      
      if (!template) {
        console.warn('⚠️ Не найдено подходящего шаблона для отзыва');
        return null;
      }

      // Сгенерировать персонализированный текст
      const commentText = this.generateCommentText(template, reviewData, existingComments.comments || []);
      
      // Проверить длину комментария
      if (commentText.length > this.config.maxCommentLength) {
        console.warn(`⚠️ Комментарий слишком длинный (${commentText.length} символов)`);
        return null;
      }

      // Создать комментарий
      const result = await this.reviewApi.createComment({
        review_id: reviewId,
        text: commentText,
        parent_comment_id: parentCommentId,
        mark_review_as_processed: this.config.autoMarkProcessed && !parentCommentId
      });

      if (result.comment_id) {
        console.log(`✅ Персонализированный комментарий создан: ${result.comment_id}`);
        console.log(`📝 Текст: "${commentText}"`);
        
        // Задержка перед следующим комментарием
        if (this.config.commentDelay > 0) {
          await this.delay(this.config.commentDelay);
        }
        
        return result.comment_id;
      }

      return null;
      
    } catch (error) {
      console.error('❌ Ошибка создания персонализированного комментария:', error);
      return null;
    }
  }

  /**
   * Поиск подходящего шаблона
   */
  private findMatchingTemplate(
    reviewData: { rating: number; text: string; photos_amount: number; videos_amount: number },
    hasSellerComments: boolean
  ): CommentTemplate | null {
    const reviewText = reviewData.text.toLowerCase();
    
    return this.config.templates.find(template => {
      const conditions = template.conditions;
      
      // Проверка рейтинга
      if (conditions.ratingRange) {
        const [min, max] = conditions.ratingRange;
        if (reviewData.rating < min || reviewData.rating > max) {
          return false;
        }
      }
      
      // Проверка ключевых слов
      if (conditions.keywords) {
        const hasKeywords = conditions.keywords.some(keyword => 
          reviewText.includes(keyword.toLowerCase())
        );
        if (!hasKeywords) return false;
      }
      
      // Проверка наличия медиа
      if (conditions.hasMedia !== undefined) {
        const hasMedia = reviewData.photos_amount > 0 || reviewData.videos_amount > 0;
        if (conditions.hasMedia !== hasMedia) return false;
      }
      
      // Проверка первого комментария
      if (conditions.isFirstComment !== undefined) {
        if (conditions.isFirstComment !== !hasSellerComments) return false;
      }
      
      return true;
    }) || null;
  }

  /**
   * Генерация текста комментария из шаблона
   */
  private generateCommentText(
    template: CommentTemplate,
    reviewData: { rating: number; text: string; photos_amount: number; videos_amount: number },
    existingComments: ReviewComment[]
  ): string {
    let text = template.template;
    
    // Замена переменных
    const variables: Record<string, string> = {
      '{rating}': reviewData.rating.toString(),
      '{rating_stars}': '⭐'.repeat(reviewData.rating),
      '{photos_count}': reviewData.photos_amount.toString(),
      '{videos_count}': reviewData.videos_amount.toString(),
      '{comments_count}': existingComments.length.toString(),
      '{customer_name}': 'уважаемый покупатель', // По умолчанию
      '{current_date}': new Date().toLocaleDateString('ru-RU')
    };

    // Персонализация на основе содержания отзыва
    if (this.config.enablePersonalization) {
      const reviewText = reviewData.text.toLowerCase();
      
      // Определение тона
      if (reviewText.includes('спасибо') || reviewText.includes('отлич') || reviewText.includes('супер')) {
        variables['{tone}'] = 'позитивный';
      } else if (reviewText.includes('проблема') || reviewText.includes('плох') || reviewText.includes('ужас')) {
        variables['{tone}'] = 'извиняющийся';
      } else {
        variables['{tone}'] = 'нейтральный';
      }
      
      // Определение категории товара (упрощённо)
      if (reviewText.includes('размер') || reviewText.includes('одежд') || reviewText.includes('обув')) {
        variables['{product_category}'] = 'одежда и обувь';
      } else if (reviewText.includes('электрон') || reviewText.includes('техник')) {
        variables['{product_category}'] = 'электроника';
      } else {
        variables['{product_category}'] = 'товар';
      }
    }

    // Применение замен
    Object.entries(variables).forEach(([placeholder, value]) => {
      text = text.replace(new RegExp(placeholder.replace(/[{}]/g, '\\$&'), 'g'), value);
    });

    return text;
  }

  /**
   * Массовая обработка отзывов с комментариями
   */
  async processReviewsBatch(reviewIds: string[]): Promise<{
    processed: number;
    created: number;
    skipped: number;
    errors: number;
  }> {
    const stats = { processed: 0, created: 0, skipped: 0, errors: 0 };
    
    console.log(`🔄 Начинается обработка ${reviewIds.length} отзывов...`);
    
    for (const reviewId of reviewIds) {
      try {
        stats.processed++;
        
        // Получить детальную информацию об отзыве
        const reviewInfo = await this.reviewApi.getInfo({ review_id: reviewId });
        
        const reviewData = {
          rating: reviewInfo.rating || 0,
          text: reviewInfo.text || '',
          photos_amount: reviewInfo.photos_amount || 0,
          videos_amount: reviewInfo.videos_amount || 0
        };
        
        // Создать персонализированный комментарий
        const commentId = await this.createPersonalizedComment(reviewId, reviewData);
        
        if (commentId) {
          stats.created++;
        } else {
          stats.skipped++;
        }
        
      } catch (error) {
        console.error(`❌ Ошибка обработки отзыва ${reviewId}:`, error);
        stats.errors++;
      }
    }
    
    console.log('\n📊 РЕЗУЛЬТАТЫ МАССОВОЙ ОБРАБОТКИ:');
    console.log(`Обработано отзывов: ${stats.processed}`);
    console.log(`Создано комментариев: ${stats.created}`);
    console.log(`Пропущено: ${stats.skipped}`);
    console.log(`Ошибок: ${stats.errors}`);
    
    return stats;
  }

  /**
   * Управление диалогом с автоответами
   */
  async manageDialogWithAutoReplies(reviewId: string): Promise<void> {
    try {
      const comments = await this.reviewApi.getCommentList({
        review_id: reviewId,
        limit: 100,
        sort_dir: 'ASC'
      });

      if (!comments.comments) return;

      // Найти неотвеченные комментарии покупателя
      const unansweredComments = this.findUnansweredCustomerComments(comments.comments);
      
      if (unansweredComments.length === 0) {
        console.log('✅ Все комментарии покупателя имеют ответы');
        return;
      }

      console.log(`💬 Найдено ${unansweredComments.length} неотвеченных комментариев`);

      // Получить информацию об отзыве для контекста
      const reviewInfo = await this.reviewApi.getInfo({ review_id: reviewId });
      const reviewData = {
        rating: reviewInfo.rating || 0,
        text: reviewInfo.text || '',
        photos_amount: reviewInfo.photos_amount || 0,
        videos_amount: reviewInfo.videos_amount || 0
      };

      // Ответить на каждый неотвеченный комментарий
      for (const comment of unansweredComments) {
        console.log(`\n💭 Отвечаем на комментарий: "${comment.text}"`);
        
        // Найти шаблон для ответа на комментарий
        const replyTemplate = this.findReplyTemplate(comment.text, reviewData);
        
        if (replyTemplate) {
          const replyText = this.generateCommentText(replyTemplate, reviewData, comments.comments);
          
          const reply = await this.reviewApi.createComment({
            review_id: reviewId,
            text: replyText,
            parent_comment_id: comment.id
          });

          if (reply.comment_id) {
            console.log(`✅ Ответ создан: "${replyText}"`);
          }
        }
        
        await this.delay(this.config.commentDelay);
      }
      
    } catch (error) {
      console.error('❌ Ошибка управления диалогом:', error);
    }
  }

  /**
   * Поиск шаблона для ответа на комментарий
   */
  private findReplyTemplate(
    commentText: string, 
    reviewData: { rating: number; text: string; photos_amount: number; videos_amount: number }
  ): CommentTemplate | null {
    const text = commentText.toLowerCase();
    
    // Специальные шаблоны для ответов на комментарии
    const replyTemplates = this.config.templates.filter(t => t.id.includes('reply'));
    
    return replyTemplates.find(template => {
      return template.conditions.keywords?.some(keyword => 
        text.includes(keyword.toLowerCase())
      );
    }) || null;
  }

  /**
   * Поиск неотвеченных комментариев покупателя
   */
  private findUnansweredCustomerComments(comments: ReviewComment[]): ReviewComment[] {
    const customerComments = comments.filter(c => !c.is_owner);
    const sellerReplies = new Set(
      comments
        .filter(c => c.is_owner && c.parent_comment_id)
        .map(c => c.parent_comment_id)
    );

    return customerComments.filter(comment => !sellerReplies.has(comment.id));
  }

  /**
   * Удаление комментария с подтверждением
   */
  async deleteCommentSafely(commentId: string): Promise<boolean> {
    try {
      console.log(`🗑️ Удаление комментария ${commentId}...`);
      
      const result = await this.reviewApi.deleteComment({
        comment_id: commentId
      });

      if (result.result === 'ok') {
        console.log(`✅ Комментарий ${commentId} успешно удалён`);
        return true;
      }

      console.log(`❌ Не удалось удалить комментарий ${commentId}`);
      return false;
      
    } catch (error) {
      console.error(`❌ Ошибка удаления комментария ${commentId}:`, error);
      return false;
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

### Пример использования CommentManager
```typescript
const commentManager = new CommentManager(reviewApi, {
  maxCommentLength: 1000,
  commentDelay: 2000,
  autoMarkProcessed: true,
  enablePersonalization: true,
  templates: [
    {
      id: 'positive_first',
      name: 'Первый ответ на положительный отзыв',
      template: 'Спасибо большое за {rating_stars} и такой замечательный отзыв! Нам очень приятно, что {product_category} вам понравился. Всегда рады видеть вас снова! 😊',
      conditions: {
        ratingRange: [4, 5],
        isFirstComment: true
      }
    },
    {
      id: 'negative_first',
      name: 'Первый ответ на негативный отзыв',
      template: 'Приносим искренние извинения за негативный опыт покупки! Это недопустимо. Пожалуйста, свяжитесь с нами напрямую для быстрого решения проблемы. Мы обязательно исправим ситуацию.',
      conditions: {
        ratingRange: [1, 2],
        isFirstComment: true
      }
    },
    {
      id: 'with_media',
      name: 'Отзыв с медиа-контентом',
      template: 'Спасибо за отзыв и прилагаемые фото/видео! Нам очень важна такая детальная обратная связь. {photos_count > 0 ? "Фотографии" : "Видео"} помогают другим покупателям сделать правильный выбор.',
      conditions: {
        hasMedia: true,
        isFirstComment: true
      }
    },
    {
      id: 'reply_thanks',
      name: 'Ответ на благодарность',
      template: 'Пожалуйста! Нам очень приятно помогать нашим покупателям. Если возникнут вопросы, всегда обращайтесь! 🤝',
      conditions: {
        keywords: ['спасибо', 'благодар', 'отлично', 'супер']
      }
    },
    {
      id: 'reply_problem',
      name: 'Ответ на жалобу в комментарии',
      template: 'Понимаем ваше беспокойство. Давайте решим эту проблему как можно быстрее. Пожалуйста, напишите нам в личные сообщения с деталями, и мы всё исправим.',
      conditions: {
        keywords: ['проблема', 'не работает', 'сломался', 'дефект']
      }
    }
  ]
});

// Обработка конкретного отзыва
const processSpecificReview = async () => {
  const reviewInfo = await reviewApi.getInfo({ review_id: 'review-123' });
  
  const commentId = await commentManager.createPersonalizedComment(
    'review-123',
    {
      rating: reviewInfo.rating || 0,
      text: reviewInfo.text || '',
      photos_amount: reviewInfo.photos_amount || 0,
      videos_amount: reviewInfo.videos_amount || 0
    }
  );
  
  if (commentId) {
    console.log('🎉 Персонализированный комментарий создан успешно');
  }
};

// Массовая обработка отзывов
const processBatchReviews = async () => {
  const reviewIds = ['review-123', 'review-456', 'review-789'];
  const results = await commentManager.processReviewsBatch(reviewIds);
  
  console.log(`✅ Обработано: ${results.created}/${results.processed} отзывов`);
};

// Управление диалогами
const manageDialogs = async () => {
  await commentManager.manageDialogWithAutoReplies('review-123');
};

processSpecificReview();
```

---

## 📈 Аналитика комментариев и диалогов

### Метрики эффективности
- **Время отклика**: Среднее время от публикации отзыва до ответа продавца
- **Качество диалогов**: Количество ответных комментариев от покупателей
- **Процент покрытия**: Доля отзывов, получивших ответ от продавца
- **Длина диалогов**: Среднее количество сообщений в цепочке

### Мониторинг взаимодействий
```typescript
// Еженедельная аналитика диалогов
const weeklyDialogAnalysis = async () => {
  const reviews = await reviewApi.getList({ 
    limit: 100, 
    status: 'ALL', 
    sort_dir: 'DESC' 
  });

  if (!reviews.reviews) return;

  let totalDialogs = 0;
  let totalMessages = 0;
  let dialogsWithSellerReply = 0;

  for (const review of reviews.reviews.slice(0, 50)) {
    const comments = await reviewApi.getCommentList({
      review_id: review.id,
      limit: 100
    });

    if (comments.comments && comments.comments.length > 0) {
      totalDialogs++;
      totalMessages += comments.comments.length;

      const hasSellerReply = comments.comments.some(c => c.is_owner);
      if (hasSellerReply) dialogsWithSellerReply++;
    }
  }

  console.log('📊 ЕЖЕНЕДЕЛЬНАЯ АНАЛИТИКА ДИАЛОГОВ:');
  console.log(`Всего диалогов: ${totalDialogs}`);
  console.log(`Всего сообщений: ${totalMessages}`);
  console.log(`Среднее сообщений в диалоге: ${(totalMessages / totalDialogs).toFixed(1)}`);
  console.log(`Процент ответов от продавца: ${((dialogsWithSellerReply / totalDialogs) * 100).toFixed(1)}%`);
};

setInterval(weeklyDialogAnalysis, 7 * 24 * 60 * 60 * 1000);
```

---

## 💡 Лучшие практики

### Эффективная коммуникация
- **Персонализация**: Избегайте шаблонных ответов
- **Быстрота реагирования**: Отвечайте в течение 24 часов
- **Профессионализм**: Сохраняйте деловой, но дружелюбный тон
- **Решение проблем**: Предлагайте конкретные способы решения

### Управление диалогами
- **Структурированность**: Отвечайте по пунктам на развёрнутые отзывы
- **Завершённость**: Доводите диалоги до логического завершения
- **Эскалация**: Переводите сложные вопросы в личную переписку
- **Благодарность**: Всегда благодарите за конструктивную обратную связь