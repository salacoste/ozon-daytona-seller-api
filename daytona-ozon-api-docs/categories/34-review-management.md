# Управление отзывами - Review Management API

API для работы с отзывами покупателей на платформе OZON. Обеспечивает получение, анализ и обработку клиентских отзывов с поддержкой медиа-контента и статусной модели.

**⚠️ ТРЕБУЕТ ПОДПИСКУ PREMIUM PLUS** — доступно только для продавцов с подпиской Premium Plus.

---

## 🔍 Методы управления отзывами

### 1. getList()
Получение списка отзывов с расширенными возможностями фильтрации и пагинации.

**Применение**: Мониторинг новых отзывов, работа с очередью обработки, аналитика по статусам.

#### Типизация запроса
```typescript
type ReviewStatus = 'ALL' | 'UNPROCESSED' | 'PROCESSED';
type ReviewSortDirection = 'ASC' | 'DESC';

interface ReviewListRequest {
  /** 
   * Количество отзывов в ответе. 
   * Минимум — 20, максимум — 100.
   */
  limit: number;
  
  /** Идентификатор последнего отзыва на странице */
  last_id?: string;
  
  /** 
   * Направление сортировки:
   * - `ASC` — по возрастанию,
   * - `DESC` — по убыванию.
   */
  sort_dir?: ReviewSortDirection;
  
  /** 
   * Статусы отзывов:
   * - `ALL` — все,
   * - `UNPROCESSED` — необработанные,
   * - `PROCESSED` — обработанные.
   */
  status?: ReviewStatus;
}
```

#### Типизация ответа
```typescript
type ReviewOrderStatus = 'DELIVERED' | 'CANCELLED';
type ReviewProcessingStatus = 'UNPROCESSED' | 'PROCESSED';

interface ReviewListItem {
  /** Идентификатор отзыва */
  id: string;
  
  /** Идентификатор товара в системе Ozon — SKU */
  sku: number;
  
  /** Текст отзыва */
  text: string;
  
  /** Оценка отзыва */
  rating: number;
  
  /** Дата публикации отзыва */
  published_at: string;
  
  /** Статус отзыва */
  status: ReviewProcessingStatus;
  
  /** Статус заказа, на который покупатель оставил отзыв */
  order_status: ReviewOrderStatus;
  
  /** `true`, если отзыв участвует в подсчёте рейтинга */
  is_rating_participant: boolean;
  
  /** Количество комментариев у отзыва */
  comments_amount: number;
  
  /** Количество изображений у отзыва */
  photos_amount: number;
  
  /** Количество видео у отзыва */
  videos_amount: number;
}

interface ReviewListResponse {
  /** Информация об отзывах */
  reviews?: ReviewListItem[];
  
  /** `true`, если в ответе вернули не все отзывы */
  has_next?: boolean;
  
  /** Идентификатор последнего отзыва на странице */
  last_id?: string;
}
```

### 2. getInfo()
Получение подробной информации об отзыве, включая медиа-контент и детализацию взаимодействий.

**Применение**: Детальный анализ отзыва перед ответом, просмотр фото/видео от покупателей.

#### Типизация запроса
```typescript
interface ReviewInfoRequest {
  /** Идентификатор отзыва */
  review_id: string;
}
```

#### Типизация ответа
```typescript
interface ReviewPhoto {
  /** Ссылка на изображение */
  url: string;
  
  /** Ширина */
  width: number;
  
  /** Высота */
  height: number;
}

interface ReviewVideo {
  /** Ссылка на видео */
  url: string;
  
  /** Ссылка на превью видео */
  preview_url: string;
  
  /** Ссылка на короткое видео */
  short_video_preview_url: string;
  
  /** Ширина */
  width: number;
  
  /** Высота */
  height: number;
}

interface ReviewInfo {
  /** Идентификатор отзыва */
  id: string;
  
  /** Идентификатор товара в системе Ozon — SKU */
  sku: number;
  
  /** Текст отзыва */
  text: string;
  
  /** Оценка отзыва */
  rating: number;
  
  /** Дата публикации отзыва */
  published_at: string;
  
  /** Статус отзыва */
  status: ReviewProcessingStatus;
  
  /** Статус заказа, на который покупатель оставил отзыв */
  order_status: ReviewOrderStatus;
  
  /** `true`, если отзыв участвует в подсчёте рейтинга */
  is_rating_participant: boolean;
  
  /** Количество комментариев к отзыву */
  comments_amount: number;
  
  /** Количество лайков на отзыве */
  likes_amount: number;
  
  /** Количество дизлайков на отзыве */
  dislikes_amount: number;
  
  /** Количество изображений у отзыва */
  photos_amount: number;
  
  /** Количество видео у отзыва */
  videos_amount: number;
  
  /** Информация об изображениях */
  photos: ReviewPhoto[];
  
  /** Информация о видео */
  videos: ReviewVideo[];
}

interface ReviewInfoResponse extends ReviewInfo {
  // Расширяет ReviewInfo всеми полями
}
```

### 3. getCount()
Получение статистики по количеству отзывов в разных статусах обработки.

**Применение**: Мониторинг рабочей нагрузки, планирование обработки отзывов, дашборды.

#### Типизация запроса
```typescript
interface ReviewCountRequest {
  // Пустой интерфейс - метод не требует параметров
}
```

#### Типизация ответа
```typescript
interface ReviewCountResponse {
  /** Количество всех отзывов */
  total?: number;
  
  /** Количество обработанных отзывов */
  processed?: number;
  
  /** Количество необработанных отзывов */
  unprocessed?: number;
}
```

---

## 🔧 Практические примеры использования

### Базовый пример работы с отзывами
```typescript
import { ReviewApi } from 'daytona-ozon-seller-api';

const reviewApi = new ReviewApi(httpClient);

try {
  // 1. Получить общую статистику
  const counts = await reviewApi.getCount();
  console.log('📊 Статистика отзывов:');
  console.log(`Всего отзывов: ${counts.total}`);
  console.log(`Обработанных: ${counts.processed}`);
  console.log(`Требуют внимания: ${counts.unprocessed}`);
  
  if (counts.unprocessed && counts.unprocessed > 0) {
    // 2. Получить необработанные отзывы
    const unprocessedReviews = await reviewApi.getList({
      limit: 50,
      status: 'UNPROCESSED',
      sort_dir: 'DESC' // Сначала новые
    });
    
    console.log(`\n📋 Найдено ${unprocessedReviews.reviews?.length} необработанных отзывов`);
    
    if (unprocessedReviews.reviews) {
      unprocessedReviews.reviews.forEach((review, index) => {
        const ratingStars = '⭐'.repeat(review.rating);
        const mediaInfo = [];
        
        if (review.photos_amount > 0) mediaInfo.push(`📷 ${review.photos_amount} фото`);
        if (review.videos_amount > 0) mediaInfo.push(`🎥 ${review.videos_amount} видео`);
        if (review.comments_amount > 0) mediaInfo.push(`💬 ${review.comments_amount} комментариев`);
        
        console.log(`\n${index + 1}. Отзыв ${review.id}`);
        console.log(`   SKU: ${review.sku}`);
        console.log(`   Рейтинг: ${ratingStars} (${review.rating})`);
        console.log(`   Дата: ${review.published_at}`);
        console.log(`   Статус заказа: ${review.order_status}`);
        console.log(`   Текст: ${review.text.substring(0, 150)}${review.text.length > 150 ? '...' : ''}`);
        
        if (mediaInfo.length > 0) {
          console.log(`   Медиа: ${mediaInfo.join(', ')}`);
        }
        
        if (!review.is_rating_participant) {
          console.log(`   ⚠️ Не участвует в рейтинге`);
        }
      });
      
      // Показать информацию о пагинации
      if (unprocessedReviews.has_next) {
        console.log(`\n📄 Есть ещё отзывы. Последний ID: ${unprocessedReviews.last_id}`);
      }
    }
  } else {
    console.log('✅ Все отзывы обработаны!');
  }
  
} catch (error) {
  console.error('❌ Ошибка получения отзывов:', error);
}
```

### Детальный анализ отзыва с медиа-контентом
```typescript
const analyzeReviewDetails = async (reviewId: string): Promise<void> => {
  try {
    console.log(`🔍 Анализ отзыва ${reviewId}...`);
    
    const reviewDetails = await reviewApi.getInfo({
      review_id: reviewId
    });
    
    console.log(`\n📝 ДЕТАЛЬНАЯ ИНФОРМАЦИЯ ОБ ОТЗЫВЕ`);
    console.log(`ID: ${reviewDetails.id}`);
    console.log(`SKU товара: ${reviewDetails.sku}`);
    console.log(`Рейтинг: ${'⭐'.repeat(reviewDetails.rating)} (${reviewDetails.rating}/5)`);
    console.log(`Дата публикации: ${reviewDetails.published_at}`);
    console.log(`Статус: ${reviewDetails.status === 'UNPROCESSED' ? '🔴 Не обработан' : '✅ Обработан'}`);
    console.log(`Статус заказа: ${reviewDetails.order_status}`);
    console.log(`Участвует в рейтинге: ${reviewDetails.is_rating_participant ? '✅' : '❌'}`);
    
    console.log(`\n📊 ВЗАИМОДЕЙСТВИЕ:`);
    console.log(`Комментариев: ${reviewDetails.comments_amount}`);
    console.log(`Лайков: ${reviewDetails.likes_amount}`);
    console.log(`Дизлайков: ${reviewDetails.dislikes_amount}`);
    
    console.log(`\n💬 ТЕКСТ ОТЗЫВА:`);
    console.log(`"${reviewDetails.text}"`);
    
    // Анализ медиа-контента
    if (reviewDetails.photos.length > 0) {
      console.log(`\n📷 ФОТОГРАФИИ (${reviewDetails.photos.length}):`);
      reviewDetails.photos.forEach((photo, index) => {
        console.log(`  ${index + 1}. ${photo.url}`);
        console.log(`     Размер: ${photo.width}x${photo.height} пикселей`);
      });
    }
    
    if (reviewDetails.videos.length > 0) {
      console.log(`\n🎥 ВИДЕО (${reviewDetails.videos.length}):`);
      reviewDetails.videos.forEach((video, index) => {
        console.log(`  ${index + 1}. Видео: ${video.url}`);
        console.log(`     Превью: ${video.preview_url}`);
        console.log(`     Короткое превью: ${video.short_video_preview_url}`);
        console.log(`     Размер: ${video.width}x${video.height} пикселей`);
      });
    }
    
    // Рекомендации по ответу
    console.log(`\n💡 РЕКОМЕНДАЦИИ ПО ОТВЕТУ:`);
    
    if (reviewDetails.rating >= 4) {
      console.log('✨ Положительный отзыв - поблагодарите клиента');
    } else if (reviewDetails.rating >= 3) {
      console.log('🤔 Нейтральный отзыв - выясните причины и предложите улучшения');
    } else {
      console.log('🚨 Негативный отзыв - срочно свяжитесь с клиентом и решите проблему');
    }
    
    if (reviewDetails.photos.length > 0) {
      console.log('📷 В отзыве есть фото - обязательно изучите визуальную составляющую');
    }
    
    if (reviewDetails.videos.length > 0) {
      console.log('🎥 В отзыве есть видео - посмотрите для полного понимания ситуации');
    }
    
    if (reviewDetails.comments_amount === 0) {
      console.log('💬 Нет комментариев - самое время оставить первый ответ');
    } else {
      console.log('💬 Есть комментарии - проверьте диалог перед ответом');
    }
    
  } catch (error) {
    console.error(`❌ Ошибка анализа отзыва ${reviewId}:`, error);
  }
};

// Анализ конкретного отзыва
analyzeReviewDetails('review-123456');
```

### Пагинация и обработка больших объёмов
```typescript
const processAllUnprocessedReviews = async (): Promise<void> => {
  const allReviews: ReviewListItem[] = [];
  let lastId: string | undefined;
  let hasNext = true;
  
  console.log('📥 Загрузка всех необработанных отзывов...');
  
  try {
    while (hasNext) {
      const response = await reviewApi.getList({
        limit: 100, // Максимальный размер страницы
        status: 'UNPROCESSED',
        sort_dir: 'DESC',
        last_id: lastId
      });
      
      if (response.reviews && response.reviews.length > 0) {
        allReviews.push(...response.reviews);
        console.log(`📋 Загружено отзывов: ${allReviews.length}`);
        
        lastId = response.last_id;
        hasNext = response.has_next || false;
        
        // Пауза между запросами для соблюдения лимитов
        await new Promise(resolve => setTimeout(resolve, 500));
      } else {
        hasNext = false;
      }
    }
    
    console.log(`✅ Загрузка завершена. Всего отзывов: ${allReviews.length}`);
    
    // Анализ загруженных отзывов
    const statistics = {
      total: allReviews.length,
      withPhotos: allReviews.filter(r => r.photos_amount > 0).length,
      withVideos: allReviews.filter(r => r.videos_amount > 0).length,
      withComments: allReviews.filter(r => r.comments_amount > 0).length,
      ratingDistribution: {
        5: allReviews.filter(r => r.rating === 5).length,
        4: allReviews.filter(r => r.rating === 4).length,
        3: allReviews.filter(r => r.rating === 3).length,
        2: allReviews.filter(r => r.rating === 2).length,
        1: allReviews.filter(r => r.rating === 1).length,
      },
      deliveredOrders: allReviews.filter(r => r.order_status === 'DELIVERED').length,
      cancelledOrders: allReviews.filter(r => r.order_status === 'CANCELLED').length
    };
    
    console.log('\n📊 СТАТИСТИКА НЕОБРАБОТАННЫХ ОТЗЫВОВ:');
    console.log(`Всего отзывов: ${statistics.total}`);
    console.log(`С фотографиями: ${statistics.withPhotos} (${((statistics.withPhotos/statistics.total)*100).toFixed(1)}%)`);
    console.log(`С видео: ${statistics.withVideos} (${((statistics.withVideos/statistics.total)*100).toFixed(1)}%)`);
    console.log(`С комментариями: ${statistics.withComments} (${((statistics.withComments/statistics.total)*100).toFixed(1)}%)`);
    
    console.log('\n⭐ РАСПРЕДЕЛЕНИЕ ПО РЕЙТИНГАМ:');
    Object.entries(statistics.ratingDistribution).forEach(([rating, count]) => {
      const percentage = ((count/statistics.total)*100).toFixed(1);
      const stars = '⭐'.repeat(parseInt(rating));
      console.log(`${stars} (${rating}): ${count} отзывов (${percentage}%)`);
    });
    
    console.log('\n📦 СТАТУС ЗАКАЗОВ:');
    console.log(`Доставленные: ${statistics.deliveredOrders} (${((statistics.deliveredOrders/statistics.total)*100).toFixed(1)}%)`);
    console.log(`Отменённые: ${statistics.cancelledOrders} (${((statistics.cancelledOrders/statistics.total)*100).toFixed(1)}%)`);
    
    // Приоритизация отзывов для обработки
    const priorityReviews = allReviews
      .filter(review => review.rating <= 2) // Негативные отзывы
      .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
      .slice(0, 10);
    
    if (priorityReviews.length > 0) {
      console.log('\n🚨 ПРИОРИТЕТНЫЕ ОТЗЫВЫ (негативные, требуют срочного ответа):');
      priorityReviews.forEach((review, index) => {
        console.log(`${index + 1}. ID: ${review.id}, SKU: ${review.sku}, Рейтинг: ${review.rating}⭐`);
        console.log(`   Дата: ${review.published_at}`);
        console.log(`   Текст: ${review.text.substring(0, 100)}...`);
      });
    }
    
  } catch (error) {
    console.error('❌ Ошибка обработки отзывов:', error);
  }
};

// Запуск обработки всех необработанных отзывов
processAllUnprocessedReviews();
```

---

## 🤖 Автоматизация управления отзывами

### Класс ReviewManager
Автоматизированная система управления отзывами с приоритизацией и мониторингом.

```typescript
interface ReviewManagerConfig {
  /** Интервал проверки новых отзывов в миллисекундах */
  checkInterval: number;
  
  /** Максимальное количество отзывов для обработки за раз */
  batchSize: number;
  
  /** Приоритезация по рейтингу (низкие рейтинги = высокий приоритет) */
  prioritizeByRating: boolean;
  
  /** Автоматическое скачивание медиа-контента */
  downloadMedia: boolean;
  
  /** Директория для сохранения медиа */
  mediaDirectory?: string;
}

interface ReviewPriorityItem extends ReviewListItem {
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  urgencyScore: number;
  analysisNotes: string[];
}

class ReviewManager {
  private reviewApi: ReviewApi;
  private config: ReviewManagerConfig;
  private monitoringInterval?: NodeJS.Timeout;
  private processedToday: Set<string> = new Set();

  constructor(reviewApi: ReviewApi, config: ReviewManagerConfig) {
    this.reviewApi = reviewApi;
    this.config = config;
  }

  /**
   * Запуск мониторинга отзывов
   */
  startMonitoring(): void {
    if (this.monitoringInterval) {
      this.stopMonitoring();
    }

    this.monitoringInterval = setInterval(() => {
      this.processNewReviews();
    }, this.config.checkInterval);

    console.log('🔄 Мониторинг отзывов запущен');
    
    // Сразу выполнить первую проверку
    this.processNewReviews();
  }

  /**
   * Остановка мониторинга
   */
  stopMonitoring(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = undefined;
      console.log('⏹️ Мониторинг отзывов остановлен');
    }
  }

  /**
   * Обработка новых отзывов
   */
  private async processNewReviews(): Promise<void> {
    try {
      console.log('🔍 Поиск новых отзывов...');
      
      const unprocessedReviews = await this.reviewApi.getList({
        limit: this.config.batchSize,
        status: 'UNPROCESSED',
        sort_dir: 'DESC'
      });

      if (!unprocessedReviews.reviews || unprocessedReviews.reviews.length === 0) {
        console.log('✅ Новых отзывов не найдено');
        return;
      }

      // Фильтровать уже обработанные сегодня
      const newReviews = unprocessedReviews.reviews.filter(
        review => !this.processedToday.has(review.id)
      );

      if (newReviews.length === 0) {
        console.log('✅ Все найденные отзывы уже обработаны сегодня');
        return;
      }

      console.log(`📋 Найдено ${newReviews.length} новых отзывов`);
      
      // Приоритизация отзывов
      const prioritizedReviews = await this.prioritizeReviews(newReviews);
      
      // Обработка приоритетных отзывов
      for (const review of prioritizedReviews) {
        await this.processReview(review);
        this.processedToday.add(review.id);
        
        // Пауза между обработкой отзывов
        await this.delay(1000);
      }

    } catch (error) {
      console.error('❌ Ошибка обработки новых отзывов:', error);
    }
  }

  /**
   * Приоритизация отзывов
   */
  private async prioritizeReviews(reviews: ReviewListItem[]): Promise<ReviewPriorityItem[]> {
    const prioritizedReviews: ReviewPriorityItem[] = [];

    for (const review of reviews) {
      let urgencyScore = 0;
      let priority: 'HIGH' | 'MEDIUM' | 'LOW' = 'LOW';
      const analysisNotes: string[] = [];

      // Оценка по рейтингу
      if (review.rating <= 2) {
        urgencyScore += 50;
        priority = 'HIGH';
        analysisNotes.push('Негативный отзыв - требует срочного ответа');
      } else if (review.rating === 3) {
        urgencyScore += 20;
        priority = 'MEDIUM';
        analysisNotes.push('Нейтральный отзыв - можно улучшить впечатление');
      } else {
        urgencyScore += 5;
        analysisNotes.push('Положительный отзыв - поблагодарить клиента');
      }

      // Дополнительные факторы
      if (review.photos_amount > 0) {
        urgencyScore += 10;
        analysisNotes.push(`Содержит ${review.photos_amount} фото`);
      }

      if (review.videos_amount > 0) {
        urgencyScore += 15;
        analysisNotes.push(`Содержит ${review.videos_amount} видео`);
      }

      if (review.comments_amount > 0) {
        urgencyScore += 5;
        analysisNotes.push(`Уже есть ${review.comments_amount} комментариев`);
      }

      if (review.order_status === 'CANCELLED') {
        urgencyScore += 25;
        analysisNotes.push('Отзыв по отменённому заказу');
      }

      if (!review.is_rating_participant) {
        urgencyScore -= 10;
        analysisNotes.push('Не участвует в рейтинге продавца');
      }

      // Финальная приоритизация
      if (urgencyScore >= 40) {
        priority = 'HIGH';
      } else if (urgencyScore >= 20) {
        priority = 'MEDIUM';
      }

      prioritizedReviews.push({
        ...review,
        priority,
        urgencyScore,
        analysisNotes
      });
    }

    // Сортировка по приоритету и срочности
    return prioritizedReviews.sort((a, b) => {
      const priorityOrder = { 'HIGH': 3, 'MEDIUM': 2, 'LOW': 1 };
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
      
      if (priorityDiff !== 0) return priorityDiff;
      
      return b.urgencyScore - a.urgencyScore;
    });
  }

  /**
   * Обработка одного отзыва
   */
  private async processReview(review: ReviewPriorityItem): Promise<void> {
    try {
      const priorityEmoji = {
        'HIGH': '🚨',
        'MEDIUM': '⚠️',
        'LOW': 'ℹ️'
      }[review.priority];

      console.log(`\n${priorityEmoji} ОБРАБОТКА ОТЗЫВА (Приоритет: ${review.priority})`);
      console.log(`ID: ${review.id}`);
      console.log(`SKU: ${review.sku}`);
      console.log(`Рейтинг: ${'⭐'.repeat(review.rating)} (${review.rating})`);
      console.log(`Срочность: ${review.urgencyScore} баллов`);
      console.log(`Дата: ${review.published_at}`);
      console.log(`Заметки: ${review.analysisNotes.join(', ')}`);
      console.log(`Текст: ${review.text.substring(0, 200)}${review.text.length > 200 ? '...' : ''}`);

      // Получить детальную информацию
      const detailedReview = await this.reviewApi.getInfo({
        review_id: review.id
      });

      // Скачать медиа если настроено
      if (this.config.downloadMedia && this.config.mediaDirectory) {
        await this.downloadReviewMedia(detailedReview);
      }

      // Генерация рекомендаций
      const recommendations = this.generateRecommendations(review, detailedReview);
      
      console.log('💡 Рекомендации:');
      recommendations.forEach(rec => console.log(`   • ${rec}`));

    } catch (error) {
      console.error(`❌ Ошибка обработки отзыва ${review.id}:`, error);
    }
  }

  /**
   * Скачивание медиа-контента отзыва
   */
  private async downloadReviewMedia(review: ReviewInfo): Promise<void> {
    if (!this.config.mediaDirectory) return;

    try {
      const fs = await import('fs');
      const path = await import('path');
      
      const reviewDir = path.join(this.config.mediaDirectory, `review_${review.id}`);
      
      if (!fs.existsSync(reviewDir)) {
        fs.mkdirSync(reviewDir, { recursive: true });
      }

      // Скачивание фото
      if (review.photos.length > 0) {
        console.log(`📷 Скачивание ${review.photos.length} фото...`);
        
        for (let i = 0; i < review.photos.length; i++) {
          const photo = review.photos[i];
          const filename = `photo_${i + 1}_${photo.width}x${photo.height}.jpg`;
          const filepath = path.join(reviewDir, filename);
          
          try {
            // В реальном приложении здесь был бы код скачивания
            console.log(`   💾 Сохранено: ${filename}`);
          } catch (error) {
            console.error(`   ❌ Ошибка скачивания фото ${i + 1}:`, error);
          }
        }
      }

      // Скачивание видео
      if (review.videos.length > 0) {
        console.log(`🎥 Скачивание ${review.videos.length} видео...`);
        
        for (let i = 0; i < review.videos.length; i++) {
          const video = review.videos[i];
          const filename = `video_${i + 1}_${video.width}x${video.height}.mp4`;
          const filepath = path.join(reviewDir, filename);
          
          try {
            // В реальном приложении здесь был бы код скачивания
            console.log(`   💾 Сохранено: ${filename}`);
          } catch (error) {
            console.error(`   ❌ Ошибка скачивания видео ${i + 1}:`, error);
          }
        }
      }
      
    } catch (error) {
      console.error('❌ Ошибка скачивания медиа:', error);
    }
  }

  /**
   * Генерация рекомендаций по ответу
   */
  private generateRecommendations(
    review: ReviewPriorityItem, 
    detailedReview: ReviewInfo
  ): string[] {
    const recommendations: string[] = [];

    // Рекомендации по рейтингу
    if (review.rating >= 4) {
      recommendations.push('Поблагодарите клиента за положительный отзыв');
      recommendations.push('Предложите скидку на следующую покупку');
    } else if (review.rating === 3) {
      recommendations.push('Выясните, что можно улучшить');
      recommendations.push('Предложите персональную помощь');
    } else {
      recommendations.push('СРОЧНО свяжитесь с клиентом для решения проблемы');
      recommendations.push('Предложите возврат или обмен товара');
      recommendations.push('Извинитесь за неудобства');
    }

    // Рекомендации по медиа
    if (detailedReview.photos.length > 0) {
      recommendations.push('Обязательно изучите прилагаемые фотографии');
      if (review.rating <= 3) {
        recommendations.push('Используйте фото для анализа проблемы');
      }
    }

    if (detailedReview.videos.length > 0) {
      recommendations.push('Просмотрите видео для полного понимания ситуации');
    }

    // Рекомендации по взаимодействию
    if (detailedReview.comments_amount === 0) {
      recommendations.push('Станьте первым, кто ответит на отзыв');
    } else {
      recommendations.push('Изучите существующую переписку перед ответом');
    }

    // Специальные случаи
    if (review.order_status === 'CANCELLED') {
      recommendations.push('Уточните причину отмены заказа');
      recommendations.push('Предложите повторное оформление со скидкой');
    }

    if (!review.is_rating_participant) {
      recommendations.push('Отзыв не влияет на рейтинг, но важен для репутации');
    }

    return recommendations;
  }

  /**
   * Получение статистики работы
   */
  async getDailyStatistics(): Promise<{
    processedToday: number;
    totalUnprocessed: number;
    priorityBreakdown: Record<'HIGH' | 'MEDIUM' | 'LOW', number>;
    averageRating: number;
    mediaReviews: { withPhotos: number; withVideos: number };
  }> {
    try {
      const counts = await this.reviewApi.getCount();
      const unprocessedReviews = await this.reviewApi.getList({
        limit: 100,
        status: 'UNPROCESSED'
      });

      const reviews = unprocessedReviews.reviews || [];
      const prioritizedReviews = await this.prioritizeReviews(reviews);

      const priorityBreakdown = prioritizedReviews.reduce((acc, review) => {
        acc[review.priority] = (acc[review.priority] || 0) + 1;
        return acc;
      }, {} as Record<'HIGH' | 'MEDIUM' | 'LOW', number>);

      const averageRating = reviews.length > 0 
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
        : 0;

      const mediaReviews = {
        withPhotos: reviews.filter(r => r.photos_amount > 0).length,
        withVideos: reviews.filter(r => r.videos_amount > 0).length
      };

      return {
        processedToday: this.processedToday.size,
        totalUnprocessed: counts.unprocessed || 0,
        priorityBreakdown: {
          HIGH: priorityBreakdown.HIGH || 0,
          MEDIUM: priorityBreakdown.MEDIUM || 0,
          LOW: priorityBreakdown.LOW || 0
        },
        averageRating,
        mediaReviews
      };

    } catch (error) {
      console.error('❌ Ошибка получения статистики:', error);
      throw error;
    }
  }

  /**
   * Сброс дневного счётчика
   */
  resetDailyCounters(): void {
    this.processedToday.clear();
    console.log('🔄 Дневные счётчики сброшены');
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

### Пример использования ReviewManager
```typescript
const reviewManager = new ReviewManager(reviewApi, {
  checkInterval: 30 * 60 * 1000, // Проверять каждые 30 минут
  batchSize: 50,
  prioritizeByRating: true,
  downloadMedia: true,
  mediaDirectory: './review_media'
});

// Запуск мониторинга
reviewManager.startMonitoring();

// Получение дневной статистики каждый час
setInterval(async () => {
  try {
    const stats = await reviewManager.getDailyStatistics();
    
    console.log('\n📊 ДНЕВНАЯ СТАТИСТИКА ОТЗЫВОВ:');
    console.log(`Обработано сегодня: ${stats.processedToday}`);
    console.log(`Всего необработанных: ${stats.totalUnprocessed}`);
    console.log(`Средний рейтинг: ${stats.averageRating.toFixed(2)}⭐`);
    
    console.log('\n🎯 Приоритеты:');
    console.log(`  🚨 Высокий: ${stats.priorityBreakdown.HIGH}`);
    console.log(`  ⚠️ Средний: ${stats.priorityBreakdown.MEDIUM}`);
    console.log(`  ℹ️ Низкий: ${stats.priorityBreakdown.LOW}`);
    
    console.log('\n📱 Медиа-контент:');
    console.log(`  📷 С фото: ${stats.mediaReviews.withPhotos}`);
    console.log(`  🎥 С видео: ${stats.mediaReviews.withVideos}`);
    
  } catch (error) {
    console.error('❌ Ошибка получения статистики:', error);
  }
}, 60 * 60 * 1000);

// Сброс счётчиков в полночь
const resetAtMidnight = () => {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  
  const msUntilMidnight = tomorrow.getTime() - now.getTime();
  
  setTimeout(() => {
    reviewManager.resetDailyCounters();
    setInterval(() => {
      reviewManager.resetDailyCounters();
    }, 24 * 60 * 60 * 1000);
  }, msUntilMidnight);
};

resetAtMidnight();

// Остановка через сутки (для примера)
setTimeout(() => {
  reviewManager.stopMonitoring();
}, 24 * 60 * 60 * 1000);
```

---

## 📈 Мониторинг и аналитика

### Ключевые метрики
- **Время обработки**: От поступления отзыва до первого ответа
- **Процент покрытия**: Доля отзывов, получивших ответ
- **Качество ответов**: Реакция покупателей на ответы продавца
- **Конверсия медиа**: Эффективность обработки отзывов с фото/видео

### Автоматические алерты
```typescript
// Настройка критических уведомлений
const setupCriticalAlerts = (manager: ReviewManager) => {
  setInterval(async () => {
    try {
      const stats = await manager.getDailyStatistics();
      
      // Алерт по количеству необработанных отзывов
      if (stats.totalUnprocessed > 50) {
        console.warn(`🚨 КРИТИЧНО: Более 50 необработанных отзывов (${stats.totalUnprocessed})`);
      }
      
      // Алерт по среднему рейтингу
      if (stats.averageRating < 3.0) {
        console.warn(`⚠️ ВНИМАНИЕ: Низкий средний рейтинг отзывов (${stats.averageRating.toFixed(2)})`);
      }
      
      // Алерт по критическим отзывам
      if (stats.priorityBreakdown.HIGH > 10) {
        console.warn(`🚨 СРОЧНО: Более 10 критических отзывов требуют немедленного внимания`);
      }
      
    } catch (error) {
      console.error('❌ Ошибка проверки критических показателей:', error);
    }
  }, 15 * 60 * 1000); // Каждые 15 минут
};
```

---

## 💡 Лучшие практики

### Организация работы с отзывами
- **Приоритизация**: Сначала отвечайте на негативные отзывы
- **Персонализация**: Избегайте шаблонных ответов
- **Скорость реагирования**: Отвечайте в течение 24 часов
- **Профессионализм**: Всегда сохраняйте деловой тон

### Работа с медиа-контентом
- **Внимательное изучение**: Всегда просматривайте фото и видео
- **Использование в ответах**: Ссылайтесь на медиа в своих комментариях  
- **Анализ проблем**: Используйте визуальную информацию для улучшения товаров
- **Сохранение**: Создавайте архив медиа для анализа трендов

### Автоматизация процессов
- **Мониторинг**: Автоматическая проверка новых отзывов
- **Категоризация**: Автоматическое определение приоритетов
- **Уведомления**: Алерты о критических отзывах
- **Отчётность**: Регулярные сводки по обработке отзывов