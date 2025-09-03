# 💬 Review API - Управление отзывами клиентов

**API для работы с отзывами и комментариями** — доступен только для продавцов с подпиской Premium Plus.

## 📋 Методы (7 endpoints)

| Метод | Endpoint | Назначение |
|-------|----------|------------|
| `getList` | `/v1/review/list` | Список отзывов с фильтрацией |
| `getInfo` | `/v1/review/info` | Подробная информация об отзыве |
| `getCount` | `/v1/review/count` | Количество отзывов по статусам |
| `changeStatus` | `/v1/review/change-status` | Изменение статуса отзывов |
| `createComment` | `/v1/review/comment/create` | Ответ на отзыв |
| `deleteComment` | `/v1/review/comment/delete` | Удаление комментария |
| `getCommentList` | `/v1/review/comment/list` | Список комментариев к отзыву |

---

## 🚀 Быстрый старт

### Инициализация клиента
```typescript
import { OzonSellerAPI } from 'daytona-ozon-seller-api';

const client = new OzonSellerAPI({
  clientId: 'your-client-id',
  apiKey: 'your-api-key'
});

// ⚠️ Требуется подписка Premium Plus
```

### Базовый workflow управления отзывами
```typescript
try {
  // 1. Получить статистику отзывов
  const counts = await client.review.getCount();
  console.log(`📊 Всего: ${counts.total}, Необработанных: ${counts.unprocessed}`);

  // 2. Получить список необработанных отзывов
  const reviews = await client.review.getList({
    limit: 50,
    status: 'UNPROCESSED',
    sort_dir: 'DESC'
  });

  // 3. Обработать каждый отзыв
  for (const review of reviews.reviews || []) {
    console.log(`\n⭐ ${review.rating}/5 - SKU: ${review.sku}`);
    console.log(`📝 ${review.text.substring(0, 100)}...`);
    
    // 4. Ответить на отзыв
    if (review.rating >= 4) {
      await client.review.createComment({
        review_id: review.id,
        text: 'Спасибо за положительный отзыв! 😊',
        mark_review_as_processed: true
      });
    } else {
      await client.review.createComment({
        review_id: review.id,
        text: 'Благодарим за отзыв. Мы учтем ваши замечания для улучшения качества.',
        mark_review_as_processed: true
      });
    }
  }

} catch (error) {
  console.error('❌ Ошибка управления отзывами:', error);
}
```

---

## 🎯 Основные методы

### `getList()` - Список отзывов
```typescript
interface ReviewListRequest {
  /** Количество отзывов (20-100) */
  limit: number;
  /** ID последнего отзыва для пагинации */
  last_id?: string;
  /** Направление сортировки */
  sort_dir?: 'ASC' | 'DESC';
  /** Фильтр по статусу */
  status?: 'ALL' | 'UNPROCESSED' | 'PROCESSED';
}

interface ReviewListResponse {
  reviews?: ReviewListItem[];
  has_next?: boolean;
  last_id?: string;
}

interface ReviewListItem {
  id: string;
  sku: number;
  text: string;
  rating: number;
  published_at: string;
  status: 'UNPROCESSED' | 'PROCESSED';
  order_status: 'DELIVERED' | 'CANCELLED';
  comments_amount: number;
  photos_amount: number;
  videos_amount: number;
}
```

### `createComment()` - Ответ на отзыв
```typescript
interface CommentCreateRequest {
  /** ID отзыва */
  review_id: string;
  /** Текст комментария */
  text: string;
  /** Отметить отзыв как обработанный */
  mark_review_as_processed?: boolean;
  /** ID родительского комментария (для ответа на комментарий) */
  parent_comment_id?: string;
}

interface CommentCreateResponse {
  /** ID созданного комментария */
  comment_id?: string;
}
```

### `getInfo()` - Подробная информация
```typescript
interface ReviewInfoRequest {
  review_id: string;
}

interface ReviewInfo {
  id: string;
  sku: number;
  text: string;
  rating: number;
  published_at: string;
  status: 'UNPROCESSED' | 'PROCESSED';
  comments_amount: number;
  likes_amount: number;
  dislikes_amount: number;
  photos_amount: number;
  videos_amount: number;
  photos: ReviewPhoto[];
  videos: ReviewVideo[];
}
```

---

## 💡 Практические примеры

### Автоматическая обработка отзывов
```typescript
const autoProcessReviews = async () => {
  try {
    // Получить необработанные отзывы
    const reviews = await client.review.getList({
      limit: 100,
      status: 'UNPROCESSED'
    });

    const results = {
      processed: 0,
      positive: 0,
      negative: 0,
      withMedia: 0
    };

    for (const review of reviews.reviews || []) {
      // Анализ отзыва
      const isPositive = review.rating >= 4;
      const hasMedia = review.photos_amount > 0 || review.videos_amount > 0;
      
      if (hasMedia) results.withMedia++;
      if (isPositive) results.positive++;
      else results.negative++;

      // Персонализированный ответ
      let responseText = '';
      
      if (isPositive) {
        responseText = hasMedia 
          ? 'Благодарим за подробный отзыв с фото! Ваше мнение очень важно для нас. 📸✨'
          : 'Спасибо за положительную оценку! Рады, что товар вам понравился! 😊';
      } else {
        responseText = 'Благодарим за ваш отзыв. Мы внимательно изучили ваши замечания и учтем их для улучшения качества. 🔧';
      }

      // Создать комментарий
      await client.review.createComment({
        review_id: review.id,
        text: responseText,
        mark_review_as_processed: true
      });

      results.processed++;
      
      // Пауза между запросами
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log(`✅ Обработано отзывов: ${results.processed}`);
    console.log(`😊 Положительных: ${results.positive}`);
    console.log(`😔 Отрицательных: ${results.negative}`);
    console.log(`📸 С медиа: ${results.withMedia}`);

    return results;

  } catch (error) {
    console.error('❌ Ошибка автообработки:', error);
  }
};
```

### Пагинация через все отзывы
```typescript
const getAllReviews = async (status: 'ALL' | 'UNPROCESSED' | 'PROCESSED' = 'ALL') => {
  const allReviews = [];
  let hasNext = true;
  let lastId = undefined;

  while (hasNext) {
    try {
      const response = await client.review.getList({
        limit: 100,
        last_id: lastId,
        status,
        sort_dir: 'DESC'
      });

      if (response.reviews) {
        allReviews.push(...response.reviews);
        console.log(`📥 Загружено отзывов: ${allReviews.length}`);
      }

      hasNext = response.has_next || false;
      lastId = response.last_id;

      // Пауза между запросами
      if (hasNext) {
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

    } catch (error) {
      console.error('❌ Ошибка загрузки отзывов:', error);
      break;
    }
  }

  return allReviews;
};
```

### Управление комментариями
```typescript
const manageComments = async (reviewId: string) => {
  try {
    // 1. Получить список комментариев
    const comments = await client.review.getCommentList({
      review_id: reviewId,
      limit: 50,
      sort_dir: 'ASC'
    });

    console.log(`💬 Комментариев к отзыву: ${comments.comments?.length || 0}`);

    // 2. Показать диалог
    comments.comments?.forEach((comment, index) => {
      const author = comment.is_owner ? '🏪 Продавец' : '👤 Покупатель';
      console.log(`${index + 1}. ${author}: ${comment.text}`);
      console.log(`   📅 ${comment.published_at}`);
      if (comment.parent_comment_id) {
        console.log(`   ↳ Ответ на комментарий ${comment.parent_comment_id}`);
      }
    });

    // 3. Ответить на последний комментарий покупателя
    const lastCustomerComment = comments.comments?.reverse().find(c => !c.is_owner);
    
    if (lastCustomerComment) {
      const reply = await client.review.createComment({
        review_id: reviewId,
        text: 'Спасибо за дополнение к отзыву!',
        parent_comment_id: lastCustomerComment.id
      });
      
      console.log(`✅ Ответ создан: ${reply.comment_id}`);
    }

  } catch (error) {
    console.error('❌ Ошибка управления комментариями:', error);
  }
};
```

### Аналитика отзывов
```typescript
const analyzeReviews = async () => {
  try {
    // Получить счетчики
    const counts = await client.review.getCount();
    
    // Получить все отзывы для анализа
    const allReviews = await client.review.getList({
      limit: 100,
      status: 'ALL'
    });

    const analytics = {
      total: counts.total || 0,
      processed: counts.processed || 0,
      unprocessed: counts.unprocessed || 0,
      rating: {
        5: 0, 4: 0, 3: 0, 2: 0, 1: 0
      },
      withPhotos: 0,
      withVideos: 0,
      withComments: 0
    };

    // Анализ по рейтингам и медиа
    allReviews.reviews?.forEach(review => {
      analytics.rating[review.rating as keyof typeof analytics.rating]++;
      
      if (review.photos_amount > 0) analytics.withPhotos++;
      if (review.videos_amount > 0) analytics.withVideos++;
      if (review.comments_amount > 0) analytics.withComments++;
    });

    // Средний рейтинг
    const totalRatings = Object.values(analytics.rating);
    const weightedSum = totalRatings.reduce((sum, count, index) => sum + count * (index + 1), 0);
    const totalReviews = totalRatings.reduce((sum, count) => sum + count, 0);
    const averageRating = totalReviews > 0 ? (weightedSum / totalReviews).toFixed(2) : '0';

    console.log('📊 Аналитика отзывов:');
    console.log(`   Всего: ${analytics.total}`);
    console.log(`   Средний рейтинг: ${averageRating}⭐`);
    console.log(`   Обработанных: ${analytics.processed} (${(analytics.processed/analytics.total*100).toFixed(1)}%)`);
    console.log('📈 Распределение по рейтингам:');
    Object.entries(analytics.rating).forEach(([rating, count]) => {
      const percentage = totalReviews > 0 ? (count / totalReviews * 100).toFixed(1) : '0';
      console.log(`   ${rating}⭐: ${count} (${percentage}%)`);
    });
    console.log(`📸 С фото: ${analytics.withPhotos}`);
    console.log(`🎥 С видео: ${analytics.withVideos}`);
    console.log(`💬 С комментариями: ${analytics.withComments}`);

    return analytics;

  } catch (error) {
    console.error('❌ Ошибка аналитики:', error);
  }
};
```

---

## ⚠️ Ограничения и особенности

### Доступность
- 🔒 **Только для Premium Plus** - API недоступен для базовых тарифов
- ✅ Полный доступ к отзывам и комментариям
- 📊 Расширенная аналитика и статистика

### Лимиты и пагинация
- **Размер страницы**: 20-100 отзывов за запрос
- **Пагинация**: через `last_id` (курсор)
- **Rate limiting**: стандартные лимиты API OZON

### Статусы отзывов
- `UNPROCESSED` - новые отзывы, требующие внимания
- `PROCESSED` - обработанные продавцом отзывы
- Автоматическая смена статуса при создании комментария с `mark_review_as_processed: true`

### Комментарии
- ✅ Многоуровневые ответы (через `parent_comment_id`)
- ✅ Различение комментариев продавца и покупателя
- ❌ Нельзя редактировать комментарии, только удалять
- ✅ Модерация комментариев перед публикацией

### Медиа в отзывах
- 📸 Фото: ссылки с размерами
- 🎥 Видео: основной файл + превью
- ❌ Нельзя добавлять медиа через API (только просмотр)

---

**💡 Совет**: Review API идеально подходит для создания автоматизированных систем работы с отзывами. Используйте персонализированные ответы и регулярный мониторинг для повышения лояльности клиентов.