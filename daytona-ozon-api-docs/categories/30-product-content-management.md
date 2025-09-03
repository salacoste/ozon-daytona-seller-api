# Управление контентом товаров

**3 метода** — управление изображениями, видео и связанными товарами на платформе OZON

## 📊 Обзор методов API

### 🖼️ Управление контентом (3 метода)
1. **importPictures()** — Загрузить или обновить изображения товара
2. **getPictures()** — Получить изображения товаров
3. **getRelatedSKU()** — Получить связанные SKU

---

## 📋 Полная типизация интерфейсов

### Request Types

```typescript
/**
 * Запрос загрузки изображений товара
 * Request for importing product pictures
 */
interface ProductImportPicturesRequest {
  /** Идентификатор товара */
  product_id: number;
  /** Список изображений товара (до 15 изображений) */
  images?: ProductImageUpload[];
  /** Изображения 360 градусов */
  images360?: ProductImageUpload[];
  /** Маркетинговое изображение цвета */
  color_image?: string;
}

interface ProductImageUpload {
  /** Ссылка на изображение в облачном хранилище */
  file_name: string;
  /** Является ли главным изображением */
  default?: boolean;
}

/**
 * Запрос получения изображений товаров
 * Request for getting product pictures
 */
interface GetProductPicturesRequest {
  /** Список идентификаторов товаров */
  product_id?: number[];
  /** Список артикулов товаров */
  offer_id?: string[];
  /** Последний идентификатор для пагинации */
  last_id?: string;
  /** Количество товаров на странице (до 1000) */
  limit?: number;
}

/**
 * Запрос связанных SKU
 * Request for related SKU
 */
interface GetRelatedSKURequest {
  /** Список SKU для поиска связанных (до 200 SKU) */
  skus: string[];
}
```

### Response Types

```typescript
/**
 * Ответ загрузки изображений
 * Response for picture import
 */
interface ProductImportPicturesResponse {
  /** Результат операции */
  result?: {
    /** Статус загрузки */
    upload_status: 'success' | 'pending' | 'failed';
    /** Список обработанных изображений */
    uploaded_images?: UploadedImageInfo[];
    /** Ошибки при загрузке */
    errors?: ImageUploadError[];
  };
}

interface UploadedImageInfo {
  /** Оригинальная ссылка */
  original_url: string;
  /** Ссылка на обработанное изображение */
  processed_url: string;
  /** Является ли главным */
  default: boolean;
  /** Порядок отображения */
  index: number;
}

interface ImageUploadError {
  /** Ссылка на изображение с ошибкой */
  file_name: string;
  /** Код ошибки */
  error_code: string;
  /** Описание ошибки */
  error_message: string;
}

/**
 * Ответ с изображениями товаров
 * Response with product pictures
 */
interface GetProductPicturesResponse {
  /** Результат операции */
  result?: {
    /** Список товаров с изображениями */
    items: ProductWithPictures[];
    /** Последний идентификатор для пагинации */
    last_id?: string;
    /** Общее количество товаров */
    total?: number;
  };
}

interface ProductWithPictures {
  /** Идентификатор товара */
  product_id: number;
  /** Артикул продавца */
  offer_id: string;
  /** Основные изображения */
  images: ProductImageInfo[];
  /** Изображения 360 */
  images360: ProductImageInfo[];
  /** Маркетинговое изображение цвета */
  color_image?: string;
  /** Главное изображение */
  primary_image?: string;
}

interface ProductImageInfo {
  /** Имя файла */
  file_name: string;
  /** Полная ссылка на изображение */
  url: string;
  /** Является ли изображение по умолчанию */
  default: boolean;
  /** Порядок отображения */
  index: number;
  /** Размер файла в байтах */
  file_size?: number;
  /** Разрешение изображения */
  resolution?: {
    width: number;
    height: number;
  };
}

/**
 * Ответ со связанными SKU
 * Response with related SKU
 */
interface GetRelatedSKUResponse {
  /** Результат операции */
  result?: {
    /** Список связанных SKU */
    items: RelatedSKUGroup[];
  };
}

interface RelatedSKUGroup {
  /** Исходный SKU */
  source_sku: string;
  /** Связанные SKU */
  related_skus: RelatedSKUInfo[];
}

interface RelatedSKUInfo {
  /** SKU товара */
  sku: string;
  /** Тип связи */
  relation_type: 'unified' | 'fbs_fbo_pair' | 'variant' | 'bundle';
  /** Статус товара */
  status: 'active' | 'inactive' | 'archived' | 'deleted';
  /** Артикул продавца */
  offer_id?: string;
  /** Название товара */
  name?: string;
}
```

### Supporting Types

```typescript
/**
 * Типы изображений
 * Image types
 */
enum ImageType {
  /** Основное изображение товара */
  PRODUCT = 'product',
  /** Изображение 360 градусов */
  ROTATION_360 = '360',
  /** Маркетинговое изображение цвета */
  COLOR = 'color',
  /** Схема или чертеж */
  SCHEME = 'scheme',
  /** Видеообложка */
  VIDEO_COVER = 'video_cover'
}

/**
 * Требования к изображениям
 * Image requirements
 */
interface ImageRequirements {
  /** Поддерживаемые форматы */
  supported_formats: ('JPG' | 'PNG' | 'JPEG')[];
  /** Минимальное разрешение */
  min_resolution: {
    width: number;
    height: number;
  };
  /** Максимальный размер файла (в байтах) */
  max_file_size: number;
  /** Максимальное количество изображений */
  max_count: number;
}

/**
 * Настройки обработки изображений
 * Image processing settings
 */
interface ImageProcessingSettings {
  /** Автоматическое сжатие */
  auto_compress: boolean;
  /** Целевое качество (1-100) */
  target_quality: number;
  /** Создание превью */
  generate_thumbnails: boolean;
  /** Размеры превью */
  thumbnail_sizes: { width: number; height: number }[];
}
```

---

## 🛠️ Практические примеры использования

### 1. Загрузка и управление изображениями

```typescript
import { ProductApi } from 'daytona-ozon-seller-api';

const productApi = new ProductApi(httpClient);

// Загрузка изображений для товара
async function uploadProductImages(productId: number, imageUrls: string[]): Promise<void> {
  try {
    console.log(`🖼️ Загрузка ${imageUrls.length} изображений для товара ${productId}...`);

    // Подготовка запроса
    const importRequest: ProductImportPicturesRequest = {
      product_id: productId,
      images: imageUrls.map((url, index) => ({
        file_name: url,
        default: index === 0 // Первое изображение - главное
      }))
    };

    const response = await productApi.importPictures(importRequest);

    if (response.result?.upload_status === 'success') {
      console.log('✅ Изображения успешно загружены');
      
      // Показываем информацию о загруженных изображениях
      if (response.result.uploaded_images) {
        response.result.uploaded_images.forEach((img, index) => {
          console.log(`  ${index + 1}. ${img.processed_url} ${img.default ? '(главное)' : ''}`);
        });
      }
    } else if (response.result?.upload_status === 'pending') {
      console.log('⏳ Изображения обрабатываются...');
    }

    // Показываем ошибки, если есть
    if (response.result?.errors?.length) {
      console.warn('⚠️ Ошибки при загрузке:');
      response.result.errors.forEach(error => {
        console.warn(`  ${error.file_name}: ${error.error_message}`);
      });
    }

  } catch (error) {
    console.error('❌ Ошибка при загрузке изображений:', error);
    throw error;
  }
}

// Загрузка изображений с изображениями 360 и цветовым маркетингом
async function uploadRichMediaContent(productId: number, content: {
  mainImages: string[];
  images360: string[];
  colorImage?: string;
}): Promise<void> {
  try {
    console.log(`🎨 Загрузка расширенного контента для товара ${productId}...`);

    const request: ProductImportPicturesRequest = {
      product_id: productId,
      images: content.mainImages.map((url, index) => ({
        file_name: url,
        default: index === 0
      })),
      images360: content.images360.map(url => ({
        file_name: url,
        default: false
      })),
      color_image: content.colorImage
    };

    const response = await productApi.importPictures(request);

    if (response.result?.upload_status === 'success') {
      console.log('✅ Расширенный контент загружен:');
      console.log(`  📷 Основных изображений: ${content.mainImages.length}`);
      console.log(`  🔄 Изображений 360: ${content.images360.length}`);
      if (content.colorImage) {
        console.log(`  🎨 Цветовое изображение: загружено`);
      }
    }

  } catch (error) {
    console.error('❌ Ошибка при загрузке расширенного контента:', error);
    throw error;
  }
}

// Массовая загрузка изображений для множества товаров
async function bulkUploadImages(uploads: {productId: number, images: string[]}[]): Promise<void> {
  try {
    console.log(`📦 Массовая загрузка изображений для ${uploads.length} товаров...`);

    const results: {productId: number, success: boolean, error?: string}[] = [];

    for (const upload of uploads) {
      try {
        await uploadProductImages(upload.productId, upload.images);
        results.push({ productId: upload.productId, success: true });
        
        // Пауза между загрузками
        await delay(2000);
      } catch (error) {
        results.push({ 
          productId: upload.productId, 
          success: false, 
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    // Статистика результатов
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;

    console.log(`\n📊 Результаты массовой загрузки:`);
    console.log(`✅ Успешно: ${successful}/${uploads.length}`);
    console.log(`❌ Ошибок: ${failed}`);

    if (failed > 0) {
      console.log('\n❌ Товары с ошибками:');
      results.filter(r => !r.success).forEach(result => {
        console.log(`  Товар ${result.productId}: ${result.error}`);
      });
    }

  } catch (error) {
    console.error('❌ Ошибка при массовой загрузке:', error);
    throw error;
  }
}

// Пример использования
await uploadProductImages(123456, [
  'https://example.com/product1-main.jpg',
  'https://example.com/product1-side.jpg',
  'https://example.com/product1-back.jpg'
]);

await uploadRichMediaContent(789012, {
  mainImages: [
    'https://example.com/main1.jpg',
    'https://example.com/main2.jpg'
  ],
  images360: [
    'https://example.com/360-1.jpg',
    'https://example.com/360-2.jpg',
    'https://example.com/360-3.jpg'
  ],
  colorImage: 'https://example.com/color-red.jpg'
});

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```

### 2. Получение и анализ изображений товаров

```typescript
// Получение изображений товаров с анализом
async function analyzeProductImages(productIds: number[]): Promise<void> {
  try {
    console.log(`🔍 Анализ изображений для ${productIds.length} товаров...`);

    const response = await productApi.getPictures({
      product_id: productIds,
      limit: 1000
    });

    if (!response.result?.items?.length) {
      console.log('ℹ️ Товары с изображениями не найдены');
      return;
    }

    console.log(`📊 Найдено товаров с изображениями: ${response.result.items.length}`);

    // Анализируем каждый товар
    const analysis = response.result.items.map(product => ({
      product_id: product.product_id,
      offer_id: product.offer_id,
      main_images_count: product.images?.length || 0,
      images_360_count: product.images360?.length || 0,
      has_color_image: !!product.color_image,
      has_primary_image: !!product.primary_image,
      total_images: (product.images?.length || 0) + (product.images360?.length || 0),
      quality_score: calculateImageQualityScore(product)
    }));

    // Общая статистика
    const stats = {
      total_products: analysis.length,
      with_images: analysis.filter(a => a.total_images > 0).length,
      with_360_images: analysis.filter(a => a.images_360_count > 0).length,
      with_color_images: analysis.filter(a => a.has_color_image).length,
      avg_images_per_product: analysis.reduce((sum, a) => sum + a.main_images_count, 0) / analysis.length,
      avg_quality_score: analysis.reduce((sum, a) => sum + a.quality_score, 0) / analysis.length
    };

    console.log('\n📊 Статистика изображений:');
    console.log(`📷 Товаров с изображениями: ${stats.with_images}/${stats.total_products}`);
    console.log(`🔄 Товаров с изображениями 360: ${stats.with_360_images}`);
    console.log(`🎨 Товаров с цветовыми изображениями: ${stats.with_color_images}`);
    console.log(`📊 Среднее количество изображений: ${stats.avg_images_per_product.toFixed(1)}`);
    console.log(`⭐ Средняя оценка качества: ${stats.avg_quality_score.toFixed(1)}%`);

    // Товары, требующие улучшения
    const needsImprovement = analysis.filter(a => a.quality_score < 60);
    if (needsImprovement.length > 0) {
      console.log(`\n⚠️ Товары, требующие улучшения изображений: ${needsImprovement.length}`);
      needsImprovement.slice(0, 10).forEach(product => {
        console.log(`  ${product.offer_id}: ${product.quality_score}% (${product.main_images_count} изображений)`);
      });
    }

    // Рекомендации
    console.log('\n💡 Рекомендации:');
    if (stats.avg_images_per_product < 3) {
      console.log('  📷 Добавьте больше основных изображений (рекомендуется минимум 3)');
    }
    if (stats.with_360_images < stats.total_products * 0.2) {
      console.log('  🔄 Рассмотрите добавление изображений 360° для ключевых товаров');
    }
    if (stats.with_color_images < stats.total_products * 0.3) {
      console.log('  🎨 Добавьте цветовые изображения для товаров с вариантами цветов');
    }

  } catch (error) {
    console.error('❌ Ошибка при анализе изображений:', error);
    throw error;
  }
}

function calculateImageQualityScore(product: ProductWithPictures): number {
  let score = 0;

  // Наличие основных изображений (40 баллов)
  const mainImagesCount = product.images?.length || 0;
  if (mainImagesCount >= 5) score += 40;
  else if (mainImagesCount >= 3) score += 30;
  else if (mainImagesCount >= 1) score += 20;

  // Наличие главного изображения (20 баллов)
  if (product.primary_image) score += 20;

  // Наличие изображений 360 (20 баллов)
  if (product.images360?.length > 0) score += 20;

  // Наличие цветового изображения (10 баллов)
  if (product.color_image) score += 10;

  // Качество изображений (10 баллов)
  // Проверяем разрешение, если доступно
  const hasHighResImages = product.images?.some(img => 
    img.resolution && img.resolution.width >= 1000 && img.resolution.height >= 1000
  );
  if (hasHighResImages) score += 10;

  return Math.min(score, 100);
}

// Пример использования
await analyzeProductImages([123456, 789012, 345678]);
```

### 3. Работа со связанными SKU

```typescript
// Анализ связанных товаров
async function analyzeRelatedProducts(skus: string[]): Promise<void> {
  try {
    console.log(`🔗 Анализ связанных товаров для ${skus.length} SKU...`);

    // Разбиваем на батчи по 200 SKU (лимит API)
    const batches = chunkArray(skus, 200);
    const allRelated: RelatedSKUGroup[] = [];

    for (const batch of batches) {
      const response = await productApi.getRelatedSKU({ skus: batch });
      
      if (response.result?.items) {
        allRelated.push(...response.result.items);
      }

      await delay(1000);
    }

    console.log(`📊 Найдено групп связанных товаров: ${allRelated.length}`);

    // Анализируем связи
    const analysisResults = allRelated.map(group => ({
      source_sku: group.source_sku,
      related_count: group.related_skus.length,
      active_count: group.related_skus.filter(sku => sku.status === 'active').length,
      relation_types: [...new Set(group.related_skus.map(sku => sku.relation_type))],
      has_fbs_fbo_pair: group.related_skus.some(sku => sku.relation_type === 'fbs_fbo_pair'),
      has_variants: group.related_skus.some(sku => sku.relation_type === 'variant'),
      has_unified: group.related_skus.some(sku => sku.relation_type === 'unified')
    }));

    // Статистика
    const stats = {
      total_groups: analysisResults.length,
      with_fbs_fbo: analysisResults.filter(a => a.has_fbs_fbo_pair).length,
      with_variants: analysisResults.filter(a => a.has_variants).length,
      with_unified: analysisResults.filter(a => a.has_unified).length,
      avg_related_count: analysisResults.reduce((sum, a) => sum + a.related_count, 0) / analysisResults.length
    };

    console.log('\n📊 Статистика связей:');
    console.log(`🔗 Средне связанных SKU на группу: ${stats.avg_related_count.toFixed(1)}`);
    console.log(`📦 Групп с FBS/FBO парами: ${stats.with_fbs_fbo}`);
    console.log(`🎨 Групп с вариантами: ${stats.with_variants}`);
    console.log(`🔄 Групп с объединенными SKU: ${stats.with_unified}`);

    // Детальная информация о связях
    console.log('\n🔍 Детали связей:');
    analysisResults.forEach(analysis => {
      console.log(`\nSKU: ${analysis.source_sku}`);
      console.log(`  Связанных товаров: ${analysis.related_count} (активных: ${analysis.active_count})`);
      console.log(`  Типы связей: ${analysis.relation_types.join(', ')}`);
    });

    // Рекомендации по оптимизации
    const recommendations = generateRelatedSKURecommendations(analysisResults);
    if (recommendations.length > 0) {
      console.log('\n💡 Рекомендации:');
      recommendations.forEach(rec => console.log(`  ${rec}`);
    }

  } catch (error) {
    console.error('❌ Ошибка при анализе связанных товаров:', error);
    throw error;
  }
}

function generateRelatedSKURecommendations(analysis: any[]): string[] {
  const recommendations: string[] = [];

  // Товары без связей
  const noRelated = analysis.filter(a => a.related_count === 0);
  if (noRelated.length > 0) {
    recommendations.push(`🔗 ${noRelated.length} товаров не имеют связанных SKU. Проверьте возможность создания вариантов.`);
  }

  // Товары с неактивными связями
  const withInactive = analysis.filter(a => a.related_count > a.active_count);
  if (withInactive.length > 0) {
    recommendations.push(`⚠️ ${withInactive.length} товаров имеют неактивные связанные SKU. Рассмотрите их активацию.`);
  }

  // Товары без FBS/FBO пар
  const noFbsFbo = analysis.filter(a => !a.has_fbs_fbo_pair && a.related_count > 0);
  if (noFbsFbo.length > 0) {
    recommendations.push(`📦 Рассмотрите создание FBS/FBO пар для ${noFbsFbo.length} товаров.`);
  }

  return recommendations;
}

// Поиск и анализ объединенных товаров
async function findUnifiedProducts(skus: string[]): Promise<void> {
  try {
    const response = await productApi.getRelatedSKU({ skus });

    const unifiedGroups = response.result?.items?.filter(group =>
      group.related_skus.some(sku => sku.relation_type === 'unified')
    ) || [];

    console.log(`🔄 Найдено объединенных групп: ${unifiedGroups.length}`);

    unifiedGroups.forEach(group => {
      console.log(`\nГруппа SKU: ${group.source_sku}`);
      const unifiedSKUs = group.related_skus.filter(sku => sku.relation_type === 'unified');
      
      unifiedSKUs.forEach(sku => {
        console.log(`  ↳ ${sku.sku} (${sku.status}) - ${sku.offer_id || 'Без артикула'}`);
      });
    });

  } catch (error) {
    console.error('❌ Ошибка при поиске объединенных товаров:', error);
  }
}

// Пример использования
await analyzeRelatedProducts(['123456789', '987654321', '555666777']);
await findUnifiedProducts(['123456789', '987654321']);

function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}
```

---

## 🎯 Бизнес-логика и автоматизация

### 1. Автоматическая оптимизация контента

```typescript
/**
 * Класс для автоматической оптимизации контента товаров
 */
class ContentOptimizationManager {
  constructor(private productApi: ProductApi) {}

  /**
   * Автоматическая оптимизация изображений товаров
   */
  async optimizeProductImages(productIds: number[]): Promise<void> {
    console.log(`🎨 Оптимизация контента для ${productIds.length} товаров...`);

    try {
      // Получаем текущие изображения
      const currentImages = await this.productApi.getPictures({
        product_id: productIds,
        limit: 1000
      });

      if (!currentImages.result?.items?.length) {
        console.log('ℹ️ Товары без изображений не найдены');
        return;
      }

      const optimizationTasks: OptimizationTask[] = [];

      // Анализируем каждый товар
      currentImages.result.items.forEach(product => {
        const task = this.analyzeProductForOptimization(product);
        if (task.recommendations.length > 0) {
          optimizationTasks.push(task);
        }
      });

      console.log(`📋 Товаров требующих оптимизации: ${optimizationTasks.length}`);

      // Выполняем оптимизацию по приоритету
      await this.executeOptimizationTasks(optimizationTasks);

    } catch (error) {
      console.error('❌ Ошибка при оптимизации контента:', error);
      throw error;
    }
  }

  private analyzeProductForOptimization(product: ProductWithPictures): OptimizationTask {
    const recommendations: OptimizationRecommendation[] = [];
    const currentScore = calculateImageQualityScore(product);

    // Недостаточно основных изображений
    if ((product.images?.length || 0) < 3) {
      recommendations.push({
        type: 'ADD_MORE_IMAGES',
        priority: 'high',
        description: 'Добавить больше основных изображений',
        target_count: 5,
        current_count: product.images?.length || 0
      });
    }

    // Нет главного изображения
    if (!product.primary_image && product.images?.length > 0) {
      recommendations.push({
        type: 'SET_PRIMARY_IMAGE',
        priority: 'high',
        description: 'Установить главное изображение',
        suggested_image: product.images[0].file_name
      });
    }

    // Нет изображений 360
    if ((product.images360?.length || 0) === 0 && currentScore < 80) {
      recommendations.push({
        type: 'ADD_360_IMAGES',
        priority: 'medium',
        description: 'Добавить изображения 360°',
        estimated_improvement: 20
      });
    }

    // Низкое разрешение изображений
    const lowResImages = product.images?.filter(img =>
      img.resolution && (img.resolution.width < 1000 || img.resolution.height < 1000)
    ) || [];

    if (lowResImages.length > 0) {
      recommendations.push({
        type: 'IMPROVE_RESOLUTION',
        priority: 'medium',
        description: 'Улучшить разрешение изображений',
        affected_images: lowResImages.map(img => img.file_name)
      });
    }

    return {
      product_id: product.product_id,
      offer_id: product.offer_id,
      current_score: currentScore,
      recommendations,
      estimated_improvement: recommendations.reduce((sum, rec) => 
        sum + (rec.estimated_improvement || 0), 0
      )
    };
  }

  private async executeOptimizationTasks(tasks: OptimizationTask[]): Promise<void> {
    // Сортируем по приоритету и потенциальному улучшению
    const sortedTasks = tasks.sort((a, b) => {
      const priorityScore = (task: OptimizationTask) => {
        const highPriority = task.recommendations.filter(r => r.priority === 'high').length * 3;
        const mediumPriority = task.recommendations.filter(r => r.priority === 'medium').length * 2;
        const lowPriority = task.recommendations.filter(r => r.priority === 'low').length * 1;
        return highPriority + mediumPriority + lowPriority;
      };

      return priorityScore(b) - priorityScore(a);
    });

    for (const task of sortedTasks.slice(0, 50)) { // Ограничиваем количество задач
      try {
        console.log(`🔧 Оптимизация товара ${task.offer_id}...`);
        await this.optimizeProduct(task);
        await delay(2000);
      } catch (error) {
        console.error(`❌ Ошибка при оптимизации товара ${task.offer_id}:`, error);
      }
    }
  }

  private async optimizeProduct(task: OptimizationTask): Promise<void> {
    for (const recommendation of task.recommendations) {
      try {
        await this.executeRecommendation(task.product_id, recommendation);
      } catch (error) {
        console.error(`❌ Ошибка при выполнении рекомендации ${recommendation.type}:`, error);
      }
    }
  }

  private async executeRecommendation(productId: number, rec: OptimizationRecommendation): Promise<void> {
    switch (rec.type) {
      case 'ADD_MORE_IMAGES':
        // В реальном приложении здесь была бы логика поиска дополнительных изображений
        console.log(`📷 Рекомендация: добавить ${(rec.target_count || 5) - (rec.current_count || 0)} изображений`);
        break;

      case 'SET_PRIMARY_IMAGE':
        if (rec.suggested_image) {
          // Логика установки главного изображения
          console.log(`🎯 Установка главного изображения: ${rec.suggested_image}`);
        }
        break;

      case 'ADD_360_IMAGES':
        console.log(`🔄 Рекомендация: добавить изображения 360°`);
        break;

      case 'IMPROVE_RESOLUTION':
        if (rec.affected_images?.length) {
          console.log(`📐 Улучшение разрешения для ${rec.affected_images.length} изображений`);
        }
        break;
    }
  }
}

// Типы для оптимизации
interface OptimizationTask {
  product_id: number;
  offer_id: string;
  current_score: number;
  recommendations: OptimizationRecommendation[];
  estimated_improvement: number;
}

interface OptimizationRecommendation {
  type: 'ADD_MORE_IMAGES' | 'SET_PRIMARY_IMAGE' | 'ADD_360_IMAGES' | 'IMPROVE_RESOLUTION';
  priority: 'low' | 'medium' | 'high';
  description: string;
  estimated_improvement?: number;
  target_count?: number;
  current_count?: number;
  suggested_image?: string;
  affected_images?: string[];
}

// Пример использования
const contentOptimizer = new ContentOptimizationManager(productApi);
await contentOptimizer.optimizeProductImages([123456, 789012, 345678]);
```

---

## 📈 KPI и метрики эффективности

### Основные показатели контента
- **Покрытие изображениями**: % товаров с минимум 3 изображениями
- **Качество изображений**: Средний балл качества контента
- **360° покрытие**: % товаров с изображениями 360°
- **Скорость загрузки**: Среднее время загрузки изображений

### Метрики связанности товаров
- **Связанность каталога**: % товаров с связанными SKU
- **Активность связей**: % активных связанных товаров
- **Типы связей**: Распределение по типам связей
- **Конверсия связей**: Влияние связанных товаров на продажи

---

## ⚠️ Рекомендации и лучшие практики

### Управление изображениями
1. **Качество изображений**: Используйте изображения высокого разрешения (минимум 1000x1000)
2. **Количество изображений**: Добавляйте минимум 3-5 основных изображений
3. **Форматы файлов**: Предпочитайте JPG для фотографий, PNG для графики
4. **Размер файлов**: Оптимизируйте размер файлов для быстрой загрузки

### Контент-стратегия
1. **Главное изображение**: Всегда устанавливайте наиболее привлекательное изображение как главное
2. **Изображения 360°**: Добавляйте для сложных или дорогих товаров
3. **Цветовые варианты**: Используйте цветовые изображения для товаров с вариантами цветов
4. **Обновление контента**: Регулярно обновляйте изображения для поддержания актуальности

### Работа со связанными SKU
1. **Мониторинг связей**: Регулярно проверяйте актуальность связанных SKU
2. **FBS/FBO пары**: Создавайте пары для товаров, доступных в разных схемах
3. **Варианты товаров**: Связывайте товары одной модели с разными характеристиками
4. **Очистка связей**: Удаляйте связи с неактивными или удаленными товарами