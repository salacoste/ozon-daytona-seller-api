# Review API

Review API для управления отзывами и комментариями с 7 методами для взаимодействия с отзывами покупателей.

## Обзор

Review API предоставляет инструменты для управления отзывами покупателей и комментариями продавца. Доступно для продавцов с подпиской Premium Plus.

**Основные возможности:**
- 💬 Создание и управление комментариями к отзывам
- 📊 Получение статистики по отзывам
- 🔍 Фильтрация отзывов по статусам и рейтингам
- ⚙️ Изменение статусов отзывов
- 📈 Анализ качества обслуживания через отзывы
- 🎯 Повышение лояльности клиентов

**Требования:** Подписка Premium Plus

## Доступные методы

### Управление комментариями

**createComment(request)** - Оставить комментарий на отзыв
```typescript
const comment = await reviewApi.createComment({
  review_id: 'review-123',
  text: 'Спасибо за отзыв!',
  mark_review_as_processed: true
});
```

**deleteComment(request)** - Удалить комментарий
```typescript
const result = await reviewApi.deleteComment({
  comment_id: 'comment-123'
});
```

**getCommentList(request)** - Список комментариев на отзыв
```typescript
const comments = await reviewApi.getCommentList({
  review_id: 'review-123',
  limit: 50
});
```

### Управление отзывами

**getInfo(request)** - Информация об отзыве
```typescript
const review = await reviewApi.getInfo({
  review_id: 'review-123'
});
```

**getList(request?)** - Список отзывов
```typescript
const reviews = await reviewApi.getList({
  limit: 100,
  status: 'UNPROCESSED'
});
```

**changeStatus(request)** - Изменить статус отзывов
```typescript
const result = await reviewApi.changeStatus({
  review_ids: ['review-123', 'review-456'],
  status: 'PROCESSED'
});
```

### Аналитика отзывов

**getCount(request?)** - Количество отзывов по статусам
```typescript
const counts = await reviewApi.getCount();
```

## TypeScript интерфейсы

```typescript
// Основные запросы
interface CommentCreateRequest {
  review_id: string;
  text: string;
  mark_review_as_processed?: boolean;
}

interface CommentDeleteRequest {
  comment_id: string;
}

interface CommentListRequest {
  review_id: string;
  limit?: number;
  last_id?: string;
  sort_dir?: "ASC" | "DESC";
}

interface ReviewChangeStatusRequest {
  review_ids: string[];
  status: "PROCESSED" | "UNPROCESSED";
}

interface ReviewCountRequest {
  // Пустой объект
}

interface ReviewInfoRequest {
  review_id: string;
}

interface ReviewListRequest {
  limit?: number;
  last_id?: string;
  status?: "PROCESSED" | "UNPROCESSED";
  rating?: 1 | 2 | 3 | 4 | 5;
  sort_dir?: "ASC" | "DESC";
  date_from?: string;
  date_to?: string;
}

// Ответы
interface CommentCreateResponse {
  comment_id: string;
  result: "ok" | "error";
}

interface CommentDeleteResponse {
  result: "ok" | "error";
}

interface CommentListResponse {
  comments: Array<{
    comment_id: string;
    text: string;
    author_name: string;
    is_owner: boolean;
    created_at: string;
    updated_at: string;
    status: "MODERATED" | "PENDING" | "REJECTED";
  }>;
  total: number;
  has_next: boolean;
  last_id?: string;
}

interface ReviewChangeStatusResponse {
  result: "ok" | "error";
  processed_count?: number;
}

interface ReviewCountResponse {
  total: number;
  processed: number;
  unprocessed: number;
  with_photos: number;
  with_videos: number;
  by_rating: {
    "1": number;
    "2": number;
    "3": number;
    "4": number;
    "5": number;
  };
}

interface ReviewInfoResponse {
  review_id: string;
  text: string;
  rating: 1 | 2 | 3 | 4 | 5;
  author_name: string;
  status: "PROCESSED" | "UNPROCESSED";
  created_at: string;
  updated_at: string;
  product_id: number;
  product_name: string;
  sku: number;
  photos_amount: number;
  videos_amount: number;
  photos?: Array<{
    url: string;
    thumbnail_url: string;
  }>;
  videos?: Array<{
    url: string;
    thumbnail_url: string;
    duration: number;
  }>;
  advantages?: string;
  disadvantages?: string;
  comment?: string;
  helpful_votes: number;
  not_helpful_votes: number;
  is_verified_purchase: boolean;
  purchase_date?: string;
}

interface ReviewListResponse {
  reviews: Array<{
    review_id: string;
    text: string;
    rating: 1 | 2 | 3 | 4 | 5;
    author_name: string;
    status: "PROCESSED" | "UNPROCESSED";
    created_at: string;
    updated_at: string;
    product_id: number;
    product_name: string;
    sku: number;
    photos_amount: number;
    videos_amount: number;
    has_comment: boolean;
    helpful_votes: number;
    not_helpful_votes: number;
    is_verified_purchase: boolean;
  }>;
  total: number;
  has_next: boolean;
  last_id?: string;
}
```

## Примеры использования

### Обработка новых отзывов
```typescript
// Получение статистики по отзывам
const reviewStats = await reviewApi.getCount();

console.log("=== Статистика отзывов ===");
console.log(`Всего отзывов: ${reviewStats.total}`);
console.log(`Обработанных: ${reviewStats.processed}`);
console.log(`Необработанных: ${reviewStats.unprocessed}`);
console.log(`С фотографиями: ${reviewStats.with_photos}`);
console.log(`С видео: ${reviewStats.with_videos}`);

console.log("\nРаспределение по рейтингам:");
Object.entries(reviewStats.by_rating).forEach(([rating, count]) => {
  const percentage = reviewStats.total > 0 ? (count / reviewStats.total * 100).toFixed(1) : '0';
  console.log(`${rating}⭐: ${count} отзывов (${percentage}%)`);
});

// Анализ необходимости обработки
if (reviewStats.unprocessed > 0) {
  console.log(`\n⚠️ Требует внимания: ${reviewStats.unprocessed} необработанных отзывов`);
  
  // Получение новых отзывов
  const newReviews = await reviewApi.getList({
    status: 'UNPROCESSED',
    limit: 50,
    sort_dir: 'DESC'
  });

  console.log(`\nПоследние необработанные отзывы:`);
  
  for (const review of newReviews.reviews.slice(0, 10)) {
    console.log(`\n${review.rating}⭐ ${review.product_name}`);
    console.log(`Автор: ${review.author_name}`);
    console.log(`Дата: ${review.created_at}`);
    console.log(`Текст: ${review.text.substring(0, 200)}${review.text.length > 200 ? '...' : ''}`);
    
    if (review.photos_amount > 0) {
      console.log(`📷 Фото: ${review.photos_amount}`);
    }
    
    if (review.videos_amount > 0) {
      console.log(`🎥 Видео: ${review.videos_amount}`);
    }
    
    // Получение детальной информации при необходимости
    if (review.rating <= 2) {
      const detailedReview = await reviewApi.getInfo({
        review_id: review.review_id
      });
      
      console.log(`⚠️ Негативный отзыв - требует ответа`);
      if (detailedReview.disadvantages) {
        console.log(`Недостатки: ${detailedReview.disadvantages}`);
      }
      
      // Создание ответа на негативный отзыв
      if (!review.has_comment) {
        const response = generateResponseForNegativeReview(detailedReview);
        
        await reviewApi.createComment({
          review_id: review.review_id,
          text: response,
          mark_review_as_processed: true
        });
        
        console.log(`✅ Ответ создан и отзыв отмечен как обработанный`);
      }
    }
  }
}

function generateResponseForNegativeReview(review: any): string {
  const responses = [
    `Благодарим за отзыв! Мы внимательно изучили ваши замечания и обязательно учтем их в работе. Если у вас есть вопросы, обращайтесь к нам напрямую.`,
    `Спасибо за обратную связь! Нам важно мнение каждого покупателя. Мы работаем над устранением указанных недостатков.`,
    `Приносим извинения за возникшие неудобства. Ваш отзыв поможет нам улучшить качество товаров и сервиса.`
  ];
  
  // Выбираем ответ в зависимости от рейтинга
  return responses[Math.min(review.rating - 1, responses.length - 1)];
}
```

### Управление комментариями
```typescript
// Получение отзыва с комментариями
const reviewId = 'review-123';
const reviewInfo = await reviewApi.getInfo({ review_id: reviewId });

console.log(`\n=== Отзыв ${reviewId} ===`);
console.log(`Товар: ${reviewInfo.product_name}`);
console.log(`Рейтинг: ${reviewInfo.rating}⭐`);
console.log(`Автор: ${reviewInfo.author_name}`);
console.log(`Подтвержденная покупка: ${reviewInfo.is_verified_purchase ? 'Да' : 'Нет'}`);
console.log(`Текст: ${reviewInfo.text}`);

if (reviewInfo.advantages) {
  console.log(`Достоинства: ${reviewInfo.advantages}`);
}

if (reviewInfo.disadvantages) {
  console.log(`Недостатки: ${reviewInfo.disadvantages}`);
}

console.log(`Полезность: ${reviewInfo.helpful_votes} 👍 / ${reviewInfo.not_helpful_votes} 👎`);

// Получение комментариев к отзыву
const comments = await reviewApi.getCommentList({
  review_id: reviewId,
  limit: 20
});

if (comments.comments.length > 0) {
  console.log(`\nКомментарии (${comments.total}):`);
  
  comments.comments.forEach(comment => {
    const authorType = comment.is_owner ? 'Продавец' : 'Покупатель';
    const statusIcon = comment.status === 'MODERATED' ? '✅' : 
                      comment.status === 'PENDING' ? '⏳' : '❌';
    
    console.log(`\n${statusIcon} ${authorType}: ${comment.author_name}`);
    console.log(`Дата: ${comment.created_at}`);
    console.log(`Текст: ${comment.text}`);
  });
  
  // Удаление неудачного комментария (если нужно)
  const badComment = comments.comments.find(c => 
    c.is_owner && c.text.includes('ошибка')
  );
  
  if (badComment) {
    console.log(`\n🗑️ Удаляем неудачный комментарий: ${badComment.comment_id}`);
    
    const deleteResult = await reviewApi.deleteComment({
      comment_id: badComment.comment_id
    });
    
    if (deleteResult.result === 'ok') {
      console.log('✅ Комментарий удален');
      
      // Создаем новый, исправленный комментарий
      const newComment = await reviewApi.createComment({
        review_id: reviewId,
        text: 'Благодарим за ваш отзыв! Мы ценим обратную связь от наших клиентов.',
        mark_review_as_processed: true
      });
      
      console.log(`✅ Создан исправленный комментарий: ${newComment.comment_id}`);
    }
  }
} else {
  console.log('\nКомментариев пока нет');
  
  // Автоматический ответ на положительные отзывы
  if (reviewInfo.rating >= 4) {
    const thankYouComment = await reviewApi.createComment({
      review_id: reviewId,
      text: 'Спасибо за положительную оценку! Нам приятно, что вы довольны покупкой. 😊',
      mark_review_as_processed: true
    });
    
    console.log(`✅ Создан благодарственный комментарий: ${thankYouComment.comment_id}`);
  }
}
```

### Массовая обработка отзывов
```typescript
// Получение всех отзывов за определенный период
const lastMonth = new Date();
lastMonth.setMonth(lastMonth.getMonth() - 1);

let allReviews: any[] = [];
let lastId: string | undefined;

do {
  const response = await reviewApi.getList({
    limit: 200,
    last_id: lastId,
    date_from: lastMonth.toISOString(),
    sort_dir: 'DESC'
  });

  allReviews.push(...response.reviews);
  lastId = response.has_next ? response.last_id : undefined;

  console.log(`Загружено отзывов: ${allReviews.length}`);

} while (lastId);

console.log(`\n=== Анализ ${allReviews.length} отзывов за месяц ===`);

// Анализ по рейтингам
const ratingAnalysis = allReviews.reduce((acc, review) => {
  acc[review.rating] = (acc[review.rating] || 0) + 1;
  return acc;
}, {} as Record<number, number>);

console.log('\nРаспределение по рейтингам:');
Object.entries(ratingAnalysis).forEach(([rating, count]) => {
  const percentage = (count / allReviews.length * 100).toFixed(1);
  console.log(`${rating}⭐: ${count} отзывов (${percentage}%)`);
});

// Средний рейтинг
const avgRating = allReviews.reduce((sum, review) => sum + review.rating, 0) / allReviews.length;
console.log(`\nСредний рейтинг: ${avgRating.toFixed(2)}⭐`);

// Анализ отзывов без ответов
const reviewsWithoutComments = allReviews.filter(review => !review.has_comment);
console.log(`\nОтзывы без ответов: ${reviewsWithoutComments.length} (${(reviewsWithoutComments.length / allReviews.length * 100).toFixed(1)}%)`);

// Приоритеты для ответов
const priorityReviews = reviewsWithoutComments
  .filter(review => review.rating <= 3 || review.photos_amount > 0)
  .sort((a, b) => a.rating - b.rating); // сначала самые низкие оценки

console.log(`\nПриоритетных отзывов для ответа: ${priorityReviews.length}`);

// Массовая обработка приоритетных отзывов
const reviewsToProcess: string[] = [];

for (const review of priorityReviews.slice(0, 20)) { // обрабатываем максимум 20 за раз
  try {
    let responseText: string;
    
    if (review.rating <= 2) {
      responseText = `Приносим извинения за возникшие неудобства с товаром "${review.product_name}". Мы внимательно изучили ваш отзыв и обязательно учтем замечания. Обращайтесь к нам при любых вопросах!`;
    } else if (review.rating === 3) {
      responseText = `Благодарим за честную оценку товара "${review.product_name}". Ваша обратная связь помогает нам становиться лучше. Будем рады видеть вас среди наших покупателей снова!`;
    } else if (review.photos_amount > 0) {
      responseText = `Спасибо за подробный отзыв с фотографиями! Это очень помогает другим покупателям сделать правильный выбор. 📷✨`;
    } else {
      responseText = `Благодарим за ваш отзыв! Нам важно мнение каждого покупателя. 😊`;
    }

    await reviewApi.createComment({
      review_id: review.review_id,
      text: responseText,
      mark_review_as_processed: true
    });

    reviewsToProcess.push(review.review_id);
    
    // Пауза между запросами
    await new Promise(resolve => setTimeout(resolve, 1000));
    
  } catch (error) {
    console.error(`Ошибка при ответе на отзыв ${review.review_id}:`, error);
  }
}

console.log(`✅ Обработано отзывов: ${reviewsToProcess.length}`);
```

### Аналитика товаров по отзывам
```typescript
// Анализ отзывов по товарам
const productReviews = new Map<number, {
  product_name: string;
  reviews: any[];
  avg_rating: number;
  total_photos: number;
  total_videos: number;
  response_rate: number;
}>();

allReviews.forEach(review => {
  if (!productReviews.has(review.product_id)) {
    productReviews.set(review.product_id, {
      product_name: review.product_name,
      reviews: [],
      avg_rating: 0,
      total_photos: 0,
      total_videos: 0,
      response_rate: 0
    });
  }
  
  const productData = productReviews.get(review.product_id)!;
  productData.reviews.push(review);
  productData.total_photos += review.photos_amount;
  productData.total_videos += review.videos_amount;
});

// Расчет метрик для каждого товара
productReviews.forEach(productData => {
  productData.avg_rating = productData.reviews.reduce((sum, r) => sum + r.rating, 0) / productData.reviews.length;
  productData.response_rate = productData.reviews.filter(r => r.has_comment).length / productData.reviews.length;
});

// Топ товаров по количеству отзывов
const topReviewedProducts = Array.from(productReviews.entries())
  .sort((a, b) => b[1].reviews.length - a[1].reviews.length)
  .slice(0, 10);

console.log('\n=== Топ-10 товаров по отзывам ===');
topReviewedProducts.forEach(([productId, data], index) => {
  console.log(`\n${index + 1}. ${data.product_name}`);
  console.log(`   Отзывов: ${data.reviews.length}`);
  console.log(`   Средний рейтинг: ${data.avg_rating.toFixed(2)}⭐`);
  console.log(`   Процент ответов: ${(data.response_rate * 100).toFixed(1)}%`);
  console.log(`   Фото: ${data.total_photos}, Видео: ${data.total_videos}`);
});

// Товары с низким рейтингом, требующие внимания
const problematicProducts = Array.from(productReviews.entries())
  .filter(([, data]) => data.avg_rating < 3.5 && data.reviews.length >= 5)
  .sort((a, b) => a[1].avg_rating - b[1].avg_rating);

if (problematicProducts.length > 0) {
  console.log('\n⚠️ === Товары с низким рейтингом ===');
  problematicProducts.forEach(([productId, data]) => {
    console.log(`\n❌ ${data.product_name}`);
    console.log(`   Рейтинг: ${data.avg_rating.toFixed(2)}⭐ (${data.reviews.length} отзывов)`);
    console.log(`   Процент ответов: ${(data.response_rate * 100).toFixed(1)}%`);
    
    // Анализ негативных отзывов
    const negativeReviews = data.reviews.filter(r => r.rating <= 2);
    if (negativeReviews.length > 0) {
      console.log(`   Негативных отзывов: ${negativeReviews.length}`);
      console.log(`   Требует срочного улучшения качества или замены`);
    }
  });
}
```

## Сложные сценарии

### ReviewManagementSystem - Система управления отзывами
```typescript
class ReviewManagementSystem {
  constructor(private api: ReviewApi) {}

  async runDailyReviewProcessing(): Promise<ReviewProcessingReport> {
    console.log('🔄 Запуск ежедневной обработки отзывов...');

    // 1. Получение статистики
    const currentStats = await this.api.getCount();
    
    // 2. Обработка критически важных отзывов
    const criticalReviews = await this.processCriticalReviews();
    
    // 3. Автоматические ответы на типовые отзывы
    const automaticResponses = await this.generateAutomaticResponses();
    
    // 4. Анализ трендов и качества
    const qualityAnalysis = await this.analyzeQualityTrends();
    
    // 5. Генерация рекомендаций
    const recommendations = this.generateActionableRecommendations(qualityAnalysis);

    return {
      processing_date: new Date().toISOString(),
      initial_stats: currentStats,
      critical_reviews_processed: criticalReviews.processed_count,
      automatic_responses_created: automaticResponses.responses_count,
      quality_analysis: qualityAnalysis,
      recommendations,
      final_stats: await this.api.getCount()
    };
  }

  private async processCriticalReviews(): Promise<CriticalProcessingResult> {
    // Критические отзывы: 1-2 звезды с фото/видео за последние 24 часа
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    const lowRatingReviews = await this.api.getList({
      rating: 1,
      date_from: yesterday.toISOString(),
      status: 'UNPROCESSED',
      limit: 100
    });

    const veryLowRatingReviews = await this.api.getList({
      rating: 2,
      date_from: yesterday.toISOString(),
      status: 'UNPROCESSED',
      limit: 100
    });

    const allCriticalReviews = [...lowRatingReviews.reviews, ...veryLowRatingReviews.reviews];
    
    // Приоритезируем отзывы с медиа-контентом
    const criticalWithMedia = allCriticalReviews.filter(review => 
      review.photos_amount > 0 || review.videos_amount > 0
    );

    let processedCount = 0;
    const urgentResponses: string[] = [];

    for (const review of criticalWithMedia) {
      // Получаем детальную информацию
      const detailedReview = await this.api.getInfo({
        review_id: review.review_id
      });

      // Создаем персонализированный ответ
      const response = this.generateCriticalResponse(detailedReview);
      
      await this.api.createComment({
        review_id: review.review_id,
        text: response,
        mark_review_as_processed: true
      });

      urgentResponses.push(review.review_id);
      processedCount++;

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    return {
      processed_count: processedCount,
      urgent_responses_created: urgentResponses.length,
      review_ids: urgentResponses
    };
  }

  private generateCriticalResponse(review: any): string {
    const productName = review.product_name;
    const hasPhotos = review.photos_amount > 0;
    const hasVideos = review.videos_amount > 0;
    
    let response = `Благодарим за подробный отзыв о товаре "${productName}". `;
    
    if (hasPhotos || hasVideos) {
      response += `Мы внимательно изучили приложенные материалы и `;
    }
    
    response += `серьезно отнесемся к вашим замечаниям. Наша команда проанализирует указанные проблемы `;
    response += `и примет меры для их устранения. `;
    
    if (review.disadvantages) {
      response += `Особое внимание будет уделено вопросам, которые вы отметили в недостатках. `;
    }
    
    response += `Мы ценим честную обратную связь и используем её для улучшения качества наших товаров. `;
    response += `При возникновении дополнительных вопросов обращайтесь к нам напрямую.`;
    
    return response;
  }

  private async analyzeQualityTrends(): Promise<QualityAnalysis> {
    // Получение отзывов за последние 30 дней
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    
    const recentReviews = await this.getAllReviewsForPeriod(
      thirtyDaysAgo.toISOString(), 
      new Date().toISOString()
    );

    // Анализ трендов рейтинга
    const ratingTrend = this.calculateRatingTrend(recentReviews);
    
    // Анализ скорости ответов
    const responseSpeedAnalysis = this.analyzeResponseSpeed(recentReviews);
    
    // Анализ качества ответов
    const responseQualityAnalysis = await this.analyzeResponseQuality(recentReviews);

    return {
      period: '30 days',
      total_reviews: recentReviews.length,
      average_rating: recentReviews.reduce((sum, r) => sum + r.rating, 0) / recentReviews.length,
      rating_trend: ratingTrend,
      response_rate: recentReviews.filter(r => r.has_comment).length / recentReviews.length,
      response_speed: responseSpeedAnalysis,
      response_quality: responseQualityAnalysis,
      media_engagement: {
        reviews_with_photos: recentReviews.filter(r => r.photos_amount > 0).length,
        reviews_with_videos: recentReviews.filter(r => r.videos_amount > 0).length,
        total_media_reviews: recentReviews.filter(r => r.photos_amount > 0 || r.videos_amount > 0).length
      }
    };
  }

  private generateActionableRecommendations(analysis: QualityAnalysis): ReviewRecommendation[] {
    const recommendations: ReviewRecommendation[] = [];

    // Анализ среднего рейтинга
    if (analysis.average_rating < 4.0) {
      recommendations.push({
        category: 'QUALITY_IMPROVEMENT',
        priority: 'HIGH',
        title: 'Низкий средний рейтинг',
        description: `Средний рейтинг составляет ${analysis.average_rating.toFixed(2)} звезд`,
        actions: [
          'Проанализировать основные причины негативных отзывов',
          'Улучшить качество товаров с низким рейтингом',
          'Усилить контроль качества'
        ],
        expected_impact: 'Повышение среднего рейтинга на 0.3-0.5 звезд'
      });
    }

    // Анализ скорости ответов
    if (analysis.response_rate < 0.8) {
      recommendations.push({
        category: 'RESPONSE_RATE',
        priority: 'MEDIUM',
        title: 'Низкий процент ответов на отзывы',
        description: `Процент ответов составляет ${(analysis.response_rate * 100).toFixed(1)}%`,
        actions: [
          'Настроить автоматические ответы на типовые отзывы',
          'Увеличить частоту проверки новых отзывов',
          'Создать шаблоны ответов для разных ситуаций'
        ],
        expected_impact: 'Увеличение процента ответов до 90%+'
      });
    }

    // Анализ медиа-контента
    const mediaRate = analysis.media_engagement.total_media_reviews / analysis.total_reviews;
    if (mediaRate > 0.3) {
      recommendations.push({
        category: 'MEDIA_ENGAGEMENT',
        priority: 'LOW',
        title: 'Высокая доля отзывов с медиа-контентом',
        description: `${(mediaRate * 100).toFixed(1)}% отзывов содержат фото или видео`,
        actions: [
          'Поощрять покупателей оставлять отзывы с фото',
          'Использовать медиа-контент в маркетинге',
          'Благодарить за подробные отзывы с фото/видео'
        ],
        expected_impact: 'Увеличение вовлеченности и доверия покупателей'
      });
    }

    return recommendations.sort((a, b) => {
      const priorityOrder = { 'HIGH': 3, 'MEDIUM': 2, 'LOW': 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }
}

interface ReviewProcessingReport {
  processing_date: string;
  initial_stats: ReviewCountResponse;
  critical_reviews_processed: number;
  automatic_responses_created: number;
  quality_analysis: QualityAnalysis;
  recommendations: ReviewRecommendation[];
  final_stats: ReviewCountResponse;
}

interface QualityAnalysis {
  period: string;
  total_reviews: number;
  average_rating: number;
  rating_trend: TrendData;
  response_rate: number;
  response_speed: ResponseSpeedData;
  response_quality: ResponseQualityData;
  media_engagement: MediaEngagementData;
}

interface ReviewRecommendation {
  category: 'QUALITY_IMPROVEMENT' | 'RESPONSE_RATE' | 'MEDIA_ENGAGEMENT' | 'CUSTOMER_SERVICE';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  title: string;
  description: string;
  actions: string[];
  expected_impact: string;
}
```

### AutomatedResponseEngine - Генератор автоматических ответов
```typescript
class AutomatedResponseEngine {
  private responseTemplates = new Map<string, ResponseTemplate>([
    ['positive_high', {
      condition: (review: any) => review.rating >= 5,
      templates: [
        'Благодарим за отличную оценку! Нам очень приятно, что товар полностью оправдал ваши ожидания! 🌟',
        'Спасибо за 5 звезд! Такие отзывы вдохновляют нас работать еще лучше! ⭐⭐⭐⭐⭐',
        'Ваша высокая оценка - лучшая награда для нашей команды! Благодарим за доверие! 😊'
      ]
    }],
    ['positive_with_photo', {
      condition: (review: any) => review.rating >= 4 && review.photos_amount > 0,
      templates: [
        'Спасибо за подробный отзыв с фотографиями! Это очень помогает другим покупателям! 📷✨',
        'Благодарим за отличные фото! Ваш отзыв поможет другим сделать правильный выбор! 📸',
        'Отличные фотографии! Спасибо, что делитесь опытом с другими покупателями! 🤳'
      ]
    }],
    ['neutral_constructive', {
      condition: (review: any) => review.rating === 3,
      templates: [
        'Благодарим за честную оценку! Ваше мнение помогает нам становиться лучше!',
        'Спасибо за обратную связь! Мы учтем ваши замечания в нашей работе!',
        'Ценим ваше мнение! Постараемся оправдать ваши ожидания в следующий раз!'
      ]
    }]
  ]);

  async generateContextualResponse(review: any): Promise<string | null> {
    // Поиск подходящего шаблона
    for (const [templateKey, template] of this.responseTemplates) {
      if (template.condition(review)) {
        const randomTemplate = template.templates[
          Math.floor(Math.random() * template.templates.length)
        ];
        
        // Персонализация ответа
        return this.personalizeResponse(randomTemplate, review);
      }
    }
    
    return null;
  }

  private personalizeResponse(template: string, review: any): string {
    let response = template;
    
    // Добавляем упоминание товара для важных отзывов
    if (review.rating <= 2 || review.photos_amount > 0) {
      response = response.replace('товар', `товар "${review.product_name}"`);
    }
    
    // Добавляем благодарность за детали
    if (review.text.length > 200) {
      response += ' Спасибо за подробности!';
    }
    
    return response;
  }
}

interface ResponseTemplate {
  condition: (review: any) => boolean;
  templates: string[];
}
```

## Обработка ошибок

```typescript
try {
  const comment = await reviewApi.createComment({
    review_id: 'review-123',
    text: 'Спасибо за отзыв!'
  });
  
  if (comment.result !== 'ok') {
    console.error('Не удалось создать комментарий');
  }
} catch (error) {
  if (error.response?.status === 403) {
    console.error('Недостаточно прав - требуется подписка Premium Plus');
  } else if (error.response?.status === 404) {
    console.error('Отзыв не найден');
  } else if (error.response?.status === 400) {
    console.error('Некорректные данные:', error.response.data);
  } else {
    console.error('Неожиданная ошибка:', error.message);
  }
}
```

## Лучшие практики

### Стратегия ответов на отзывы
```typescript
// Система приоритизации ответов
function calculateResponsePriority(review: any): number {
  let priority = 0;
  
  // Рейтинг (чем ниже, тем выше приоритет)
  priority += (6 - review.rating) * 20;
  
  // Наличие медиа-контента
  if (review.photos_amount > 0) priority += 15;
  if (review.videos_amount > 0) priority += 10;
  
  // Длина отзыва (подробные отзывы важнее)
  if (review.text.length > 300) priority += 10;
  
  // Новизна (свежие отзывы важнее)
  const daysOld = (Date.now() - new Date(review.created_at).getTime()) / (1000 * 60 * 60 * 24);
  if (daysOld < 3) priority += 15;
  
  return priority;
}

// Автоматическая категоризация отзывов
function categorizeReview(review: any): ReviewCategory {
  const text = review.text.toLowerCase();
  
  if (text.includes('доставка') || text.includes('упаковка')) {
    return 'LOGISTICS';
  } else if (text.includes('качество') || text.includes('дефект')) {
    return 'QUALITY';
  } else if (text.includes('размер') || text.includes('цвет')) {
    return 'SPECIFICATIONS';
  } else if (text.includes('цена') || text.includes('стоимость')) {
    return 'PRICING';
  } else {
    return 'GENERAL';
  }
}

type ReviewCategory = 'LOGISTICS' | 'QUALITY' | 'SPECIFICATIONS' | 'PRICING' | 'GENERAL';
```

### Мониторинг качества ответов
```typescript
// Анализ эффективности ответов
class ResponseQualityAnalyzer {
  async analyzeResponseImpact(reviewId: string): Promise<ResponseImpact> {
    // Получение отзыва до и после ответа
    const review = await reviewApi.getInfo({ review_id: reviewId });
    const comments = await reviewApi.getCommentList({ 
      review_id: reviewId,
      limit: 10 
    });
    
    const sellerComments = comments.comments.filter(c => c.is_owner);
    
    if (sellerComments.length === 0) {
      return { has_response: false, impact_score: 0 };
    }
    
    // Анализ полезности отзыва
    const helpfulnessRatio = review.helpful_votes / 
      Math.max(1, review.helpful_votes + review.not_helpful_votes);
    
    return {
      has_response: true,
      response_count: sellerComments.length,
      response_quality_score: this.assessResponseQuality(sellerComments[0].text),
      helpfulness_ratio: helpfulnessRatio,
      impact_score: this.calculateImpactScore(review, sellerComments[0])
    };
  }

  private assessResponseQuality(responseText: string): number {
    let score = 50; // базовый балл
    
    // Длина ответа
    if (responseText.length > 100) score += 10;
    if (responseText.length > 200) score += 10;
    
    // Персонализация
    if (responseText.includes('товар') || responseText.includes('покупк')) score += 15;
    
    // Эмпатия и благодарность
    if (responseText.includes('спасибо') || responseText.includes('благодар')) score += 10;
    if (responseText.includes('извин') || responseText.includes('сожале')) score += 15;
    
    // Конструктивность
    if (responseText.includes('учтем') || responseText.includes('улучш')) score += 10;
    
    return Math.min(100, score);
  }
}

interface ResponseImpact {
  has_response: boolean;
  response_count?: number;
  response_quality_score?: number;
  helpfulness_ratio?: number;
  impact_score: number;
}
```

## Интеграционные заметки

- **Premium Plus Required**: API доступно только для подписчиков Premium Plus
- **Rate Limiting**: API поддерживает до 200 запросов в минуту
- **Moderation**: Все комментарии проходят модерацию перед публикацией
- **Response Time**: Рекомендуется отвечать на отзывы в течение 48 часов
- **Character Limits**: Комментарии ограничены 3000 символами
- **Media Support**: API предоставляет информацию о фото и видео в отзывах
- **Status Tracking**: Система отслеживает статусы обработки отзывов
- **Analytics Integration**: Данные интегрируются с общей аналитикой продавца