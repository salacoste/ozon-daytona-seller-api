# Управление каталогом товаров

**4 метода** — управление жизненным циклом товаров и контроль лимитов на платформе OZON

## 📊 Обзор методов API

### 🗃️ Управление каталогом (4 метода)
1. **archive()** — Перенести товар в архив
2. **unarchive()** — Вернуть товар из архива
3. **deleteProducts()** — Удалить товар без SKU из архива
4. **getUploadQuota()** — Лимиты на ассортимент, создание и обновление товаров

---

## 📋 Полная типизация интерфейсов

### Request Types

```typescript
/**
 * Запрос архивирования товаров
 * Request for archiving products
 */
interface ProductArchiveRequest {
  /** Список идентификаторов товаров (до 100 идентификаторов за раз) */
  product_id: number[];
}

/**
 * Запрос разархивирования товаров
 * Request for unarchiving products
 */
interface ProductUnarchiveRequest {
  /** 
   * Список идентификаторов товаров (до 100 идентификаторов за раз)
   * Лимит: 10 товаров в сутки для автоматически архивированных товаров
   * Лимит обновляется в 03:00 по московскому времени
   * На товары, архивированные вручную, ограничений нет
   */
  product_id: number[];
}

/**
 * Запрос удаления товаров без SKU
 * Request for deleting products without SKU
 */
interface DeleteProductsRequest {
  /** Список товаров для удаления (до 500 идентификаторов за раз) */
  products: DeleteProductItem[];
}

interface DeleteProductItem {
  /** Идентификатор товара в системе продавца */
  product_id: number;
}

/**
 * Запрос получения лимитов
 * Request for getting upload quota
 */
interface GetUploadQuotaRequest {
  // Пустой запрос - лимиты возвращаются автоматически
}
```

### Response Types

```typescript
/**
 * Базовый булевый ответ
 * Basic boolean response
 */
interface ProductBooleanResponse {
  /** Результат операции (true если успешно) */
  result: boolean;
}

/**
 * Результат удаления товаров
 * Result of products deletion
 */
interface DeleteProductsResponse {
  /** Статусы обработки каждого товара */
  status: DeleteProductStatus[];
}

interface DeleteProductStatus {
  /** Идентификатор товара */
  product_id: number;
  /** Успешность операции */
  is_success: boolean;
  /** Код ошибки (если есть) */
  error_code?: string;
  /** Описание ошибки */
  error_message?: string;
}

/**
 * Информация о лимитах
 * Upload quota information
 */
interface GetUploadQuotaResponse {
  /** Лимиты на создание товаров */
  daily_create?: DailyQuota;
  /** Лимиты на обновление товаров */
  daily_update?: DailyQuota;
  /** Общий лимит на ассортимент */
  total?: TotalQuota;
}

interface DailyQuota {
  /** Общий лимит в сутки */
  limit: number;
  /** Использовано сегодня */
  used: number;
  /** Осталось до конца дня */
  left: number;
  /** Время обновления лимита (UTC) */
  reset_time: string;
}

interface TotalQuota {
  /** Общий лимит товаров в каталоге */
  limit: number;
  /** Текущее количество товаров */
  used: number;
  /** Доступно для создания */
  left: number;
}
```

### Supporting Types

```typescript
/**
 * Статус товара в системе
 * Product status in system
 */
enum ProductStatus {
  /** Активный товар */
  ACTIVE = 'ACTIVE',
  /** Архивный товар */
  ARCHIVED = 'ARCHIVED',
  /** Удалённый товар */
  DELETED = 'DELETED',
  /** Заблокированный товар */
  BLOCKED = 'BLOCKED'
}

/**
 * Причина архивирования
 * Archiving reason
 */
enum ArchiveReason {
  /** Ручное архивирование */
  MANUAL = 'MANUAL',
  /** Автоматическое архивирование */
  AUTOMATIC = 'AUTOMATIC',
  /** Нарушение правил */
  POLICY_VIOLATION = 'POLICY_VIOLATION',
  /** Технические проблемы */
  TECHNICAL_ISSUES = 'TECHNICAL_ISSUES'
}

/**
 * Расширенная информация о товаре в каталоге
 * Extended catalog product information
 */
interface CatalogProduct {
  /** Идентификатор товара */
  product_id: number;
  /** Артикул продавца */
  offer_id: string;
  /** Название товара */
  name: string;
  /** Статус товара */
  status: ProductStatus;
  /** Дата создания */
  created_at: string;
  /** Дата последнего обновления */
  updated_at: string;
  /** Дата архивирования (если применимо) */
  archived_at?: string;
  /** Причина архивирования */
  archive_reason?: ArchiveReason;
  /** Можно ли разархивировать */
  can_unarchive: boolean;
}
```

---

## 🛠️ Практические примеры использования

### 1. Архивирование товаров

```typescript
import { ProductApi } from 'daytona-ozon-seller-api';

const productApi = new ProductApi(httpClient);

// Архивирование отдельных товаров
async function archiveProducts(productIds: number[]): Promise<void> {
  try {
    // Разбиваем на батчи по 100 товаров
    const batches = chunkArray(productIds, 100);
    
    for (const batch of batches) {
      console.log(`📦 Архивирование ${batch.length} товаров...`);
      
      const result = await productApi.archive({
        product_id: batch
      });

      if (result.result) {
        console.log(`✅ Успешно архивировано: ${batch.length} товаров`);
      } else {
        console.error(`❌ Ошибка при архивировании товаров:`, batch);
      }

      // Пауза между батчами
      await delay(1000);
    }
  } catch (error) {
    console.error('❌ Ошибка при архивировании товаров:', error);
    throw error;
  }
}

// Архивирование товаров по фильтру
async function archiveProductsByFilter(
  filter: { category?: number; price_min?: number; stock_max?: number }
): Promise<void> {
  try {
    // Сначала получаем список товаров по фильтру
    const products = await productApi.getList({
      filter: {
        visibility: 'ALL',
        // Добавляем фильтры по категории, цене, остаткам
      },
      limit: 1000
    });

    if (!products.result?.items?.length) {
      console.log('ℹ️ Товары для архивирования не найдены');
      return;
    }

    // Фильтруем товары по критериям
    const toArchive = products.result.items.filter(product => {
      let shouldArchive = true;
      
      if (filter.category && product.category_id !== filter.category) {
        shouldArchive = false;
      }
      
      if (filter.price_min && parseFloat(product.price || '0') < filter.price_min) {
        shouldArchive = false;
      }
      
      if (filter.stock_max && (product.stocks?.present || 0) > filter.stock_max) {
        shouldArchive = false;
      }

      return shouldArchive;
    });

    console.log(`🎯 Найдено товаров для архивирования: ${toArchive.length}`);
    
    const productIds = toArchive.map(p => p.product_id).filter(Boolean) as number[];
    await archiveProducts(productIds);

  } catch (error) {
    console.error('❌ Ошибка при фильтрации и архивировании:', error);
    throw error;
  }
}

// Пример использования
await archiveProducts([123456, 789012, 345678]);

await archiveProductsByFilter({
  price_min: 100,   // Архивировать товары дешевле 100 руб
  stock_max: 0      // Архивировать товары без остатков
});
```

### 2. Разархивирование товаров

```typescript
// Умное разархивирование с проверкой лимитов
async function smartUnarchiveProducts(productIds: number[]): Promise<void> {
  try {
    // Проверяем лимиты на разархивирование
    const quota = await productApi.getUploadQuota();
    console.log('📊 Информация о лимитах разархивирования:');
    
    // Получаем информацию о товарах
    const productsInfo = await getArchivedProductsInfo(productIds);
    
    // Разделяем на автоматически и вручную архивированные
    const autoArchived = productsInfo.filter(p => p.archive_reason === 'AUTOMATIC');
    const manualArchived = productsInfo.filter(p => p.archive_reason === 'MANUAL');
    
    console.log(`🤖 Автоматически архивировано: ${autoArchived.length} (лимит 10/день)`);
    console.log(`👤 Вручную архивировано: ${manualArchived.length} (без лимитов)`);

    // Сначала разархивируем товары без лимитов
    if (manualArchived.length > 0) {
      console.log('🔄 Разархивирование товаров, архивированных вручную...');
      const manualIds = manualArchived.map(p => p.product_id);
      await unarchiveProductsBatch(manualIds);
    }

    // Затем разархивируем автоматически архивированные с учётом лимита
    if (autoArchived.length > 0) {
      console.log('🔄 Разархивирование автоматически архивированных товаров...');
      const autoIds = autoArchived.map(p => p.product_id);
      
      // Учитываем дневной лимит в 10 товаров
      const canUnarchiveToday = Math.min(10, autoIds.length);
      const todayBatch = autoIds.slice(0, canUnarchiveToday);
      
      if (todayBatch.length > 0) {
        await unarchiveProductsBatch(todayBatch);
        console.log(`✅ Разархивировано сегодня: ${todayBatch.length} товаров`);
      }
      
      if (autoIds.length > canUnarchiveToday) {
        console.log(`⏳ Осталось разархивировать завтра: ${autoIds.length - canUnarchiveToday} товаров`);
      }
    }

  } catch (error) {
    console.error('❌ Ошибка при разархивировании:', error);
    throw error;
  }
}

async function unarchiveProductsBatch(productIds: number[]): Promise<void> {
  const batches = chunkArray(productIds, 100);
  
  for (const batch of batches) {
    try {
      console.log(`📦 Разархивирование ${batch.length} товаров...`);
      
      const result = await productApi.unarchive({
        product_id: batch
      });

      if (result.result) {
        console.log(`✅ Успешно разархивировано: ${batch.length} товаров`);
      } else {
        console.error(`❌ Ошибка при разархивировании:`, batch);
      }

      await delay(1000);
    } catch (error) {
      console.error(`❌ Ошибка в батче разархивирования:`, error);
    }
  }
}

// Получение информации об архивных товарах (mock функция)
async function getArchivedProductsInfo(productIds: number[]): Promise<CatalogProduct[]> {
  // В реальном приложении здесь будет запрос к API для получения 
  // информации о товарах, включая причину архивирования
  
  return productIds.map(id => ({
    product_id: id,
    offer_id: `OFFER_${id}`,
    name: `Product ${id}`,
    status: ProductStatus.ARCHIVED,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    archived_at: new Date().toISOString(),
    archive_reason: Math.random() > 0.5 ? ArchiveReason.AUTOMATIC : ArchiveReason.MANUAL,
    can_unarchive: true
  }));
}

// Пример использования
await smartUnarchiveProducts([123456, 789012, 345678]);
```

### 3. Удаление товаров без SKU

```typescript
// Безопасное удаление товаров с проверками
async function safeDeleteProducts(productIds: number[]): Promise<void> {
  try {
    console.log(`🗑️ Подготовка к удалению ${productIds.length} товаров...`);
    
    // Создаем запрос на удаление
    const deleteRequest: DeleteProductsRequest = {
      products: productIds.map(id => ({ product_id: id }))
    };

    // Разбиваем на батчи по 500 товаров (лимит API)
    const batches = chunkArray(deleteRequest.products, 500);
    const results: DeleteProductStatus[] = [];

    for (let i = 0; i < batches.length; i++) {
      console.log(`📦 Обработка батча ${i + 1}/${batches.length} (${batches[i].length} товаров)`);
      
      try {
        const response = await productApi.deleteProducts({
          products: batches[i]
        });

        results.push(...response.status);

        // Анализируем результаты батча
        const batchSuccessful = response.status.filter(s => s.is_success).length;
        const batchFailed = response.status.filter(s => !s.is_success).length;
        
        console.log(`✅ Успешно удалено в батче: ${batchSuccessful}`);
        if (batchFailed > 0) {
          console.warn(`⚠️ Не удалось удалить в батче: ${batchFailed}`);
        }

        await delay(2000); // Пауза между батчами
      } catch (error) {
        console.error(`❌ Ошибка в батче ${i + 1}:`, error);
        
        // Добавляем ошибочные записи для всех товаров в батче
        batches[i].forEach(product => {
          results.push({
            product_id: product.product_id,
            is_success: false,
            error_code: 'BATCH_ERROR',
            error_message: `Batch processing failed: ${error}`
          });
        });
      }
    }

    // Общая статистика
    const totalSuccessful = results.filter(r => r.is_success).length;
    const totalFailed = results.filter(r => !r.is_success).length;

    console.log('\n📊 Итоговая статистика удаления:');
    console.log(`✅ Успешно удалено: ${totalSuccessful}/${productIds.length}`);
    console.log(`❌ Ошибок: ${totalFailed}`);

    // Показываем детали ошибок
    if (totalFailed > 0) {
      console.log('\n⚠️ Детали ошибок:');
      const errorGroups = groupBy(
        results.filter(r => !r.is_success),
        r => r.error_code || 'UNKNOWN'
      );

      Object.entries(errorGroups).forEach(([errorCode, errors]) => {
        console.log(`- ${errorCode}: ${errors.length} товаров`);
        if (errors.length <= 5) {
          errors.forEach(error => {
            console.log(`  Product ${error.product_id}: ${error.error_message}`);
          });
        } else {
          console.log(`  Первые 3: ${errors.slice(0, 3).map(e => e.product_id).join(', ')}`);
        }
      });
    }

  } catch (error) {
    console.error('❌ Критическая ошибка при удалении товаров:', error);
    throw error;
  }
}

// Предварительная проверка товаров перед удалением
async function validateProductsForDeletion(productIds: number[]): Promise<number[]> {
  console.log('🔍 Проверка товаров перед удалением...');
  
  try {
    // Получаем информацию о товарах
    const products = await productApi.getProductInfoListV3({
      product_id: productIds.slice(0, 1000) // API лимит
    });

    if (!products.result?.items?.length) {
      console.warn('⚠️ Товары не найдены или недоступны');
      return [];
    }

    const validForDeletion: number[] = [];
    const warnings: string[] = [];

    products.result.items.forEach(product => {
      // Проверяем условия для безопасного удаления
      const canDelete = checkDeletionCriteria(product);
      
      if (canDelete.allowed) {
        validForDeletion.push(product.id);
      } else {
        warnings.push(`Product ${product.id}: ${canDelete.reason}`);
      }
    });

    if (warnings.length > 0) {
      console.warn('⚠️ Предупреждения при проверке:');
      warnings.slice(0, 10).forEach(warning => console.warn(`  ${warning}`));
      if (warnings.length > 10) {
        console.warn(`  ... и ещё ${warnings.length - 10} предупреждений`);
      }
    }

    console.log(`✅ Товаров готово к удалению: ${validForDeletion.length}/${productIds.length}`);
    return validForDeletion;

  } catch (error) {
    console.error('❌ Ошибка при проверке товаров:', error);
    return productIds; // Возвращаем исходный список при ошибке
  }
}

function checkDeletionCriteria(product: any): { allowed: boolean; reason?: string } {
  // Проверяем различные критерии безопасности
  
  if (product.visibility === 'VISIBLE') {
    return { allowed: false, reason: 'Товар активен и видим покупателям' };
  }

  if (product.has_discounted_item) {
    return { allowed: false, reason: 'У товара есть уценка' };
  }

  if (product.stocks?.present > 0) {
    return { allowed: false, reason: 'У товара есть остатки на складе' };
  }

  if (product.status === 'FAILED_MODERATION') {
    return { allowed: true }; // Можно удалять товары с ошибками модерации
  }

  if (!product.sku) {
    return { allowed: true }; // Можно удалять товары без SKU
  }

  return { allowed: false, reason: 'Товар не соответствует критериям удаления' };
}

// Пример использования
const validProducts = await validateProductsForDeletion([123456, 789012, 345678]);
if (validProducts.length > 0) {
  await safeDeleteProducts(validProducts);
}
```

### 4. Мониторинг лимитов и квот

```typescript
/**
 * Класс для мониторинга лимитов и управления квотами
 */
class QuotaManager {
  constructor(private productApi: ProductApi) {}

  /**
   * Получить подробную информацию о лимитах
   */
  async getDetailedQuotaInfo(): Promise<QuotaAnalysis> {
    try {
      const quota = await this.productApi.getUploadQuota();
      
      if (!quota.daily_create && !quota.daily_update && !quota.total) {
        throw new Error('Не удалось получить информацию о лимитах');
      }

      const analysis: QuotaAnalysis = {
        timestamp: new Date().toISOString(),
        daily_create: this.analyzeQuota(quota.daily_create, 'Создание товаров'),
        daily_update: this.analyzeQuota(quota.daily_update, 'Обновление товаров'),
        total_catalog: this.analyzeQuota(quota.total, 'Общий каталог'),
        recommendations: this.generateQuotaRecommendations(quota)
      };

      this.logQuotaAnalysis(analysis);
      return analysis;

    } catch (error) {
      console.error('❌ Ошибка при получении лимитов:', error);
      throw error;
    }
  }

  private analyzeQuota(
    quota: DailyQuota | TotalQuota | undefined, 
    type: string
  ): QuotaAnalysisItem | null {
    if (!quota) return null;

    const utilizationPercent = (quota.used / quota.limit * 100);
    const status = this.getQuotaStatus(utilizationPercent);

    return {
      type,
      limit: quota.limit,
      used: quota.used,
      left: quota.left,
      utilization_percent: Math.round(utilizationPercent),
      status,
      reset_time: 'reset_time' in quota ? quota.reset_time : undefined
    };
  }

  private getQuotaStatus(utilizationPercent: number): QuotaStatus {
    if (utilizationPercent >= 90) return 'critical';
    if (utilizationPercent >= 75) return 'warning';
    if (utilizationPercent >= 50) return 'moderate';
    return 'good';
  }

  private generateQuotaRecommendations(quota: GetUploadQuotaResponse): string[] {
    const recommendations: string[] = [];

    // Рекомендации по созданию товаров
    if (quota.daily_create) {
      const createPercent = quota.daily_create.used / quota.daily_create.limit * 100;
      if (createPercent >= 90) {
        recommendations.push('🚨 Лимит создания товаров почти исчерпан. Планируйте создание на завтра.');
      } else if (createPercent >= 75) {
        recommendations.push('⚠️ Используйте лимит создания товаров осторожно до конца дня.');
      }
    }

    // Рекомендации по обновлению товаров
    if (quota.daily_update) {
      const updatePercent = quota.daily_update.used / quota.daily_update.limit * 100;
      if (updatePercent >= 90) {
        recommendations.push('🚨 Лимит обновления товаров почти исчерпан.');
      }
    }

    // Рекомендации по общему каталогу
    if (quota.total) {
      const totalPercent = quota.total.used / quota.total.limit * 100;
      if (totalPercent >= 95) {
        recommendations.push('🚨 Каталог переполнен! Необходимо архивировать или удалить товары.');
      } else if (totalPercent >= 85) {
        recommendations.push('⚠️ Каталог близок к переполнению. Рассмотрите архивирование неактивных товаров.');
      }
    }

    if (recommendations.length === 0) {
      recommendations.push('✅ Все лимиты в пределах нормы.');
    }

    return recommendations;
  }

  private logQuotaAnalysis(analysis: QuotaAnalysis): void {
    console.log('\n📊 Анализ лимитов и квот:');
    console.log(`🕐 Время анализа: ${new Date(analysis.timestamp).toLocaleString()}`);

    [analysis.daily_create, analysis.daily_update, analysis.total_catalog]
      .filter(Boolean)
      .forEach(item => {
        if (!item) return;
        
        const statusIcon = this.getStatusIcon(item.status);
        console.log(`\n${statusIcon} ${item.type}:`);
        console.log(`  Лимит: ${item.limit.toLocaleString()}`);
        console.log(`  Использовано: ${item.used.toLocaleString()} (${item.utilization_percent}%)`);
        console.log(`  Осталось: ${item.left.toLocaleString()}`);
        
        if (item.reset_time) {
          const resetTime = new Date(item.reset_time);
          console.log(`  Обновление: ${resetTime.toLocaleString()}`);
        }
      });

    if (analysis.recommendations.length > 0) {
      console.log('\n💡 Рекомендации:');
      analysis.recommendations.forEach(rec => console.log(`  ${rec}`);
    }
  }

  private getStatusIcon(status: QuotaStatus): string {
    switch (status) {
      case 'critical': return '🚨';
      case 'warning': return '⚠️';
      case 'moderate': return '🟡';
      case 'good': return '✅';
      default: return 'ℹ️';
    }
  }

  /**
   * Проверить можно ли выполнить операцию с учётом лимитов
   */
  async canPerformOperation(operation: QuotaOperation): Promise<OperationCheck> {
    const quota = await this.productApi.getUploadQuota();
    
    const check: OperationCheck = {
      allowed: true,
      reasons: []
    };

    switch (operation.type) {
      case 'create':
        if (quota.daily_create && operation.count > quota.daily_create.left) {
          check.allowed = false;
          check.reasons.push(`Недостаточно лимита создания: нужно ${operation.count}, доступно ${quota.daily_create.left}`);
        }
        if (quota.total && operation.count > quota.total.left) {
          check.allowed = false;
          check.reasons.push(`Недостаточно места в каталоге: нужно ${operation.count}, доступно ${quota.total.left}`);
        }
        break;

      case 'update':
        if (quota.daily_update && operation.count > quota.daily_update.left) {
          check.allowed = false;
          check.reasons.push(`Недостаточно лимита обновления: нужно ${operation.count}, доступно ${quota.daily_update.left}`);
        }
        break;

      case 'unarchive':
        // Для автоматически архивированных товаров есть лимит 10/день
        if (operation.auto_archived_count && operation.auto_archived_count > 10) {
          check.allowed = false;
          check.reasons.push(`Превышен лимит разархивирования автоматически архивированных товаров: ${operation.auto_archived_count} > 10`);
        }
        break;
    }

    return check;
  }
}

// Типы для мониторинга квот
interface QuotaAnalysis {
  timestamp: string;
  daily_create: QuotaAnalysisItem | null;
  daily_update: QuotaAnalysisItem | null;
  total_catalog: QuotaAnalysisItem | null;
  recommendations: string[];
}

interface QuotaAnalysisItem {
  type: string;
  limit: number;
  used: number;
  left: number;
  utilization_percent: number;
  status: QuotaStatus;
  reset_time?: string;
}

type QuotaStatus = 'good' | 'moderate' | 'warning' | 'critical';

interface QuotaOperation {
  type: 'create' | 'update' | 'unarchive';
  count: number;
  auto_archived_count?: number; // Для операций разархивирования
}

interface OperationCheck {
  allowed: boolean;
  reasons: string[];
}

// Пример использования
const quotaManager = new QuotaManager(productApi);

// Получить анализ лимитов
const analysis = await quotaManager.getDetailedQuotaInfo();

// Проверить возможность создания 50 товаров
const canCreate = await quotaManager.canPerformOperation({
  type: 'create',
  count: 50
});

if (canCreate.allowed) {
  console.log('✅ Можно создать 50 товаров');
} else {
  console.log('❌ Нельзя создать товары:');
  canCreate.reasons.forEach(reason => console.log(`  - ${reason}`));
}
```

---

## 🎯 Бизнес-логика и автоматизация

### 1. Автоматическое управление жизненным циклом товаров

```typescript
/**
 * Класс для автоматического управления жизненным циклом товаров
 */
class ProductLifecycleManager {
  constructor(private productApi: ProductApi) {}

  /**
   * Автоматическое архивирование неэффективных товаров
   */
  async autoArchiveUnperformingProducts(): Promise<void> {
    console.log('🤖 Запуск автоматического архивирования неэффективных товаров...');

    try {
      // Получаем все активные товары
      const products = await this.getAllActiveProducts();
      
      // Анализируем эффективность каждого товара
      const analysisResults = await this.analyzeProductPerformance(products);
      
      // Отбираем товары для архивирования
      const toArchive = analysisResults
        .filter(result => result.recommendation === 'ARCHIVE')
        .map(result => result.product_id);

      if (toArchive.length === 0) {
        console.log('✅ Товары для архивирования не найдены');
        return;
      }

      console.log(`📋 Найдено товаров для архивирования: ${toArchive.length}`);
      
      // Архивируем товары батчами
      await this.archiveProductsBatch(toArchive);
      
      // Создаём отчёт
      await this.generateArchivingReport(analysisResults.filter(r => r.recommendation === 'ARCHIVE'));

    } catch (error) {
      console.error('❌ Ошибка при автоматическом архивировании:', error);
      throw error;
    }
  }

  /**
   * Умное разархивирование на основе трендов
   */
  async smartUnarchiveByTrends(): Promise<void> {
    console.log('🧠 Умное разархивирование на основе трендов...');

    try {
      // Получаем архивные товары
      const archivedProducts = await this.getArchivedProducts();
      
      // Анализируем тренды для каждого товара
      const trendAnalysis = await this.analyzeTrendsForProducts(archivedProducts);
      
      // Отбираем товары с положительными трендами
      const toUnarchive = trendAnalysis
        .filter(analysis => analysis.trend_score > 0.7)
        .map(analysis => analysis.product_id);

      if (toUnarchive.length === 0) {
        console.log('📊 Товары с положительными трендами не найдены');
        return;
      }

      console.log(`📈 Найдено товаров с положительными трендами: ${toUnarchive.length}`);
      
      // Разархивируем с учётом лимитов
      await this.unarchiveWithLimits(toUnarchive);

    } catch (error) {
      console.error('❌ Ошибка при умном разархивировании:', error);
      throw error;
    }
  }

  private async getAllActiveProducts(): Promise<any[]> {
    // Получение всех активных товаров с пагинацией
    const allProducts: any[] = [];
    let lastId = '';
    
    do {
      const response = await this.productApi.getList({
        filter: { visibility: 'VISIBLE' },
        limit: 1000,
        last_id: lastId
      });

      if (response.result?.items?.length) {
        allProducts.push(...response.result.items);
        lastId = response.result.last_id || '';
      } else {
        break;
      }
    } while (lastId);

    return allProducts;
  }

  private async analyzeProductPerformance(products: any[]): Promise<ProductAnalysis[]> {
    // Анализ эффективности товаров
    return products.map(product => {
      const analysis: ProductAnalysis = {
        product_id: product.id,
        offer_id: product.offer_id,
        name: product.name,
        performance_score: this.calculatePerformanceScore(product),
        recommendation: 'KEEP' // По умолчанию
      };

      // Определяем рекомендацию на основе оценки
      if (analysis.performance_score < 0.3) {
        analysis.recommendation = 'ARCHIVE';
        analysis.reasons = [
          'Низкие продажи за последние 90 дней',
          'Высокие остатки при низком спросе',
          'Низкий контент-рейтинг'
        ];
      } else if (analysis.performance_score < 0.5) {
        analysis.recommendation = 'REVIEW';
        analysis.reasons = ['Требует анализа и возможной оптимизации'];
      }

      return analysis;
    });
  }

  private calculatePerformanceScore(product: any): number {
    let score = 0.5; // Базовая оценка

    // Фактор продаж
    const salesFactor = this.calculateSalesFactor(product);
    score += salesFactor * 0.4;

    // Фактор остатков
    const stockFactor = this.calculateStockFactor(product);
    score += stockFactor * 0.2;

    // Фактор контент-рейтинга
    const contentFactor = this.calculateContentFactor(product);
    score += contentFactor * 0.2;

    // Фактор цены
    const priceFactor = this.calculatePriceFactor(product);
    score += priceFactor * 0.2;

    return Math.max(0, Math.min(1, score));
  }

  private calculateSalesFactor(product: any): number {
    // Анализ продаж за последние 90 дней
    const sales = product.sales_90d || 0;
    const avgCategorySales = product.category_avg_sales || 1;
    
    return Math.min(1, sales / avgCategorySales);
  }

  private calculateStockFactor(product: any): number {
    // Анализ соотношения остатков к продажам
    const stock = product.stocks?.present || 0;
    const sales = product.sales_30d || 1;
    
    if (stock === 0) return 0; // Нет остатков
    
    const stockTurnover = sales / stock;
    return Math.min(1, stockTurnover);
  }

  private calculateContentFactor(product: any): number {
    // Анализ качества контента
    let contentScore = 0;
    
    if (product.images?.length >= 3) contentScore += 0.3;
    if (product.description?.length > 100) contentScore += 0.3;
    if (product.attributes?.length >= 5) contentScore += 0.4;
    
    return contentScore;
  }

  private calculatePriceFactor(product: any): number {
    // Анализ конкурентоспособности цены
    const price = parseFloat(product.price || '0');
    const avgCategoryPrice = product.category_avg_price || price;
    
    if (price <= avgCategoryPrice * 0.8) return 1; // Очень конкурентная цена
    if (price <= avgCategoryPrice * 1.2) return 0.7; // Средняя цена
    return 0.3; // Высокая цена
  }

  private async archiveProductsBatch(productIds: number[]): Promise<void> {
    const batches = chunkArray(productIds, 100);
    
    for (const batch of batches) {
      await this.productApi.archive({ product_id: batch });
      await delay(2000);
    }
  }

  private async generateArchivingReport(archivedProducts: ProductAnalysis[]): Promise<void> {
    console.log('\n📋 Отчёт об архивировании:');
    console.log(`📦 Всего архивировано: ${archivedProducts.length} товаров`);
    
    // Группировка по причинам
    const reasonGroups = groupBy(archivedProducts, p => p.reasons?.[0] || 'Неизвестная причина');
    
    console.log('\n📊 Распределение по причинам:');
    Object.entries(reasonGroups).forEach(([reason, products]) => {
      console.log(`  ${reason}: ${products.length} товаров`);
    });

    // Топ-5 архивированных товаров с наихудшими показателями
    const worstProducts = archivedProducts
      .sort((a, b) => a.performance_score - b.performance_score)
      .slice(0, 5);

    console.log('\n🔻 Товары с наихудшими показателями:');
    worstProducts.forEach(product => {
      console.log(`  ${product.name} (${product.offer_id}): ${(product.performance_score * 100).toFixed(1)}%`);
    });
  }
}

// Типы для управления жизненным циклом
interface ProductAnalysis {
  product_id: number;
  offer_id: string;
  name: string;
  performance_score: number;
  recommendation: 'KEEP' | 'REVIEW' | 'ARCHIVE';
  reasons?: string[];
}

// Вспомогательные функции
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

function groupBy<T, K extends string | number>(
  array: T[], 
  keyFn: (item: T) => K
): Record<K, T[]> {
  return array.reduce((groups, item) => {
    const key = keyFn(item);
    (groups[key] = groups[key] || []).push(item);
    return groups;
  }, {} as Record<K, T[]>);
}

// Пример использования
const lifecycleManager = new ProductLifecycleManager(productApi);

// Автоматическое архивирование
await lifecycleManager.autoArchiveUnperformingProducts();

// Умное разархивирование
await lifecycleManager.smartUnarchiveByTrends();
```

---

## 📈 KPI и метрики эффективности

### Основные показатели управления каталогом
- **Размер каталога**: Общее количество товаров и их распределение по статусам
- **Использование лимитов**: % использования дневных и общих квот
- **Скорость операций**: Среднее время выполнения операций архивирования/разархивирования
- **Эффективность каталога**: Соотношение активных к архивным товарам

### Метрики жизненного цикла товаров
- **Время жизни товара**: Среднее время от создания до архивирования
- **Частота архивирования**: Количество товаров, архивируемых в месяц
- **Успешность разархивирования**: % товаров, успешно возвращённых в продажу
- **Причины архивирования**: Распределение товаров по причинам архивирования

---

## ⚠️ Рекомендации и лучшие практики

### Управление каталогом
1. **Мониторинг лимитов**: Регулярно проверяйте использование квот
2. **Планирование операций**: Распределяйте создание товаров равномерно в течение дня
3. **Автоматизация**: Настройте автоматическое архивирование неэффективных товаров
4. **Резервное копирование**: Сохраняйте копии важных данных перед массовыми операциями

### Архивирование и удаление
1. **Проверка перед удалением**: Всегда проверяйте товары на наличие остатков и активных продаж
2. **Поэтапное архивирование**: Архивируйте товары постепенно, анализируя результаты
3. **Документирование**: Ведите записи о причинах архивирования для анализа
4. **Восстановление**: Периодически анализируйте архивные товары на предмет возврата в продажу

### Оптимизация производительности
1. **Батчевая обработка**: Используйте максимальные размеры батчей в пределах лимитов API
2. **Паузы между запросами**: Добавляйте задержки для предотвращения rate limiting
3. **Параллельная обработка**: Обрабатывайте независимые операции параллельно
4. **Мониторинг ошибок**: Реализуйте систему мониторинга и уведомлений об ошибках

---

## 🔄 Интеграция с другими модулями

### Связь с Product Information API
- Архивирование и разархивирование влияют на видимость товаров в списках
- Информация о товарах используется для принятия решений об архивировании
- Статус товаров синхронизируется между модулями

### Связь с Prices & Stocks API
- Остатки товаров учитываются при принятии решений об архивировании
- Архивные товары не участвуют в обновлении цен и остатков
- Лимиты на обновление товаров связаны с общими квотами

### Связь с Analytics API
- Данные о продажах используются для анализа эффективности товаров
- Метрики каталога включаются в общие аналитические отчёты
- История изменений статусов товаров анализируется для оптимизации