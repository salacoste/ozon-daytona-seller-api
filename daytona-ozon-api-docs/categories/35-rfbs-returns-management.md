# Управление возвратами RFBS - Returns Management API

Современная система управления возвратами rFBS заказов обеспечивает полный контроль над жизненным циклом заявок на возврат. Включает унифицированное управление действиями, детальную информацию о заявках и расширенные возможности фильтрации списков возвратов.

**✨ РЕКОМЕНДУЕТСЯ ДЛЯ НОВЫХ ИНТЕГРАЦИЙ** — используйте эти методы вместо устаревших v2 API.

## 📊 Обзор методов Management API

**Всего методов: 3** — комплексное управление современными возвратами

### 🎯 Управление действиями (1 метод)
1. **setAction()** — Универсальный метод выполнения любых действий с возвратами

### 📋 Информационные методы (2 метода)
2. **getReturn()** — Получить детальную информацию о конкретной заявке
3. **getReturnsList()** — Получить список заявок с расширенной фильтрацией

---

## 🔧 Технические особенности

### Унифицированная система действий
- **Централизованный контроль**: Один метод для всех операций с возвратами
- **Расширяемость**: Легкое добавление новых типов действий без API изменений  
- **Consistency**: Единообразная обработка ошибок и валидация
- **Audit Trail**: Автоматическое логирование всех операций

### Типы действий в setAction()
- **approve**: Одобрить заявку и разрешить возврат товара
- **reject**: Отклонить заявку с обязательным комментарием
- **receive_return**: Подтвердить получение возвращенного товара
- **return_money**: Вернуть полную стоимость товара
- **compensate**: Частичная компенсация с указанием суммы

### Расширенная фильтрация списков
- **Статусы**: Фильтр по текущему статусу заявок
- **Временные диапазоны**: По дате создания и обновления
- **Суммы**: По диапазону стоимости возврата
- **Причины**: По причине возврата от покупателя
- **Продавец**: По действиям и комментариям продавца

---

## 📚 TypeScript интерфейсы

### Универсальный метод действий

```typescript
/**
 * Запрос универсального действия с возвратом
 * Universal return action request
 */
interface RfbsReturnsActionSetRequest {
  /** Идентификатор заявки на возврат */
  return_id: number;
  
  /** 
   * Тип действия для выполнения
   * - approve: Одобрить заявку на возврат
   * - reject: Отклонить заявку  
   * - receive_return: Подтвердить получение товара
   * - return_money: Вернуть полную стоимость
   * - compensate: Частичная компенсация
   */
  action: 'approve' | 'reject' | 'receive_return' | 'return_money' | 'compensate';
  
  /** Комментарий продавца (обязательно для reject) */
  comment?: string;
  
  /** Сумма компенсации (только для compensate) */
  compensation_amount?: number;
  
  /** Компенсировать стоимость доставки (для return_money) */
  compensate_shipping?: boolean;
  
  /** Дополнительные метаданные для действия */
  metadata?: {
    /** Причина отклонения (для reject) */
    rejection_reason?: 'policy_violation' | 'time_expired' | 'condition_unacceptable' | 'other';
    
    /** Состояние товара при получении (для receive_return) */
    item_condition?: 'excellent' | 'good' | 'fair' | 'poor' | 'damaged';
    
    /** Фотографии товара */
    photos?: string[];
    
    /** Внутренние заметки */
    internal_notes?: string;
  };
}

/**
 * Ответ на выполнение действия
 * Action execution response
 */
interface RfbsReturnsActionSetResponse {
  /** Результат операции */
  result?: 'success' | 'error';
  
  /** Сообщение об ошибке */
  error?: string;
  
  /** Код ошибки для программной обработки */
  error_code?: string;
  
  /** Новый статус заявки после выполнения действия */
  new_status?: string;
  
  /** Идентификатор транзакции для отслеживания */
  transaction_id?: string;
  
  /** Расчетная дата выполнения (для возвратов денег) */
  estimated_completion_date?: string;
  
  readonly [key: string]: unknown;
}
```

### Получение информации о заявке

```typescript
/**
 * Запрос информации о заявке на возврат
 * Return information request
 */
interface RfbsReturnsGetRequest {
  /** Идентификатор заявки на возврат */
  return_id: number;
  
  /** Включить историю действий */
  include_history?: boolean;
  
  /** Включить детализацию по товарам */
  include_product_details?: boolean;
  
  /** Включить расчеты компенсации */
  include_calculations?: boolean;
}

/**
 * Детальная информация о товаре в возврате
 * Detailed return product information
 */
interface RfbsReturnProductDetailed {
  /** SKU товара */
  sku: string;
  
  /** Название товара */
  name: string;
  
  /** Артикул товара */
  article: string;
  
  /** Количество */
  quantity: number;
  
  /** Цена за единицу на момент заказа */
  unit_price: number;
  
  /** Общая стоимость позиции */
  total_amount: number;
  
  /** Причина возврата этого товара */
  return_reason: string;
  
  /** Состояние товара по мнению покупателя */
  customer_condition_claim: string;
  
  /** Фактическое состояние при получении */
  actual_condition?: string;
  
  /** Возможна ли перепродажа */
  resaleable?: boolean;
  
  /** Категория товара */
  category: string;
  
  /** Брендовая информация */
  brand?: string;
  
  /** URL изображения товара */
  image_url?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Запись истории действий с заявкой
 * Return action history record
 */
interface RfbsReturnHistoryItem {
  /** Дата и время действия */
  timestamp: string;
  
  /** Тип действия */
  action: string;
  
  /** Инициатор действия */
  actor: 'customer' | 'seller' | 'system' | 'support';
  
  /** Комментарий к действию */
  comment?: string;
  
  /** Предыдущий статус */
  previous_status?: string;
  
  /** Новый статус */
  new_status: string;
  
  /** Дополнительные данные */
  metadata?: Record<string, unknown>;
  
  readonly [key: string]: unknown;
}

/**
 * Расширенная информация о заявке на возврат
 * Extended return information
 */
interface RfbsReturnDetailed {
  /** Базовая информация */
  return_id: number;
  posting_number: string;
  status: string;
  created_at: string;
  updated_at: string;
  
  /** Информация от покупателя */
  customer_reason: string;
  customer_comment: string;
  customer_photos?: string[];
  
  /** Финансовая информация */
  total_amount: number;
  shipping_cost: number;
  compensation_amount?: number;
  
  /** Расширенные данные о товарах */
  products: RfbsReturnProductDetailed[];
  
  /** Доступные действия для текущего статуса */
  available_actions: string[];
  
  /** Информация от продавца */
  seller_comment?: string;
  seller_photos?: string[];
  
  /** История действий (если запрошена) */
  history?: RfbsReturnHistoryItem[];
  
  /** Расчеты и рекомендации */
  calculations?: {
    /** Рекомендуемая сумма компенсации */
    recommended_compensation: number;
    
    /** Стоимость логистики */
    logistics_cost: number;
    
    /** Потенциальная стоимость перепродажи */
    resale_value: number;
    
    /** Риск-оценка заявки */
    risk_score: number;
  };
  
  /** Временные метки */
  deadlines: {
    /** Крайний срок принятия решения */
    decision_deadline: string;
    
    /** Ожидаемая дата возврата товара */
    expected_return_date?: string;
    
    /** Крайний срок возврата денег */
    refund_deadline?: string;
  };
  
  readonly [key: string]: unknown;
}

/**
 * Ответ с детальной информацией о заявке
 * Detailed return information response
 */
interface RfbsReturnsGetResponse {
  /** Детальная информация о заявке */
  return: RfbsReturnDetailed;
  
  readonly [key: string]: unknown;
}
```

### Список заявок с расширенной фильтрацией

```typescript
/**
 * Фильтры для списка возвратов
 * Return list filters
 */
interface RfbsReturnsListFilter {
  /** Фильтр по статусам */
  status?: string[];
  
  /** Фильтр по дате создания (от) */
  created_since?: string;
  
  /** Фильтр по дате создания (до) */
  created_until?: string;
  
  /** Фильтр по дате обновления (от) */
  updated_since?: string;
  
  /** Фильтр по дате обновления (до) */
  updated_until?: string;
  
  /** Минимальная сумма возврата */
  min_amount?: number;
  
  /** Максимальная сумма возврата */
  max_amount?: number;
  
  /** Фильтр по причине возврата */
  customer_reason?: string[];
  
  /** Фильтр по номерам отправлений */
  posting_numbers?: string[];
  
  /** Фильтр по SKU товаров */
  product_skus?: string[];
  
  /** Только заявки с фотографиями от покупателя */
  with_customer_photos?: boolean;
  
  /** Только заявки, требующие внимания */
  requires_attention?: boolean;
  
  /** Поиск по тексту (в комментариях и причинах) */
  search_text?: string;
}

/**
 * Параметры сортировки списка
 * List sorting parameters
 */
interface RfbsReturnsListSort {
  /** Поле для сортировки */
  field: 'created_at' | 'updated_at' | 'total_amount' | 'status' | 'deadline';
  
  /** Направление сортировки */
  direction: 'asc' | 'desc';
}

/**
 * Запрос списка заявок на возврат
 * Returns list request
 */
interface RfbsReturnsListRequest {
  /** Фильтры */
  filter?: RfbsReturnsListFilter;
  
  /** Сортировка */
  sort?: RfbsReturnsListSort;
  
  /** Количество записей на странице (max 100) */
  limit?: number;
  
  /** Смещение для пагинации */
  offset?: number;
  
  /** Включить краткую статистику */
  include_stats?: boolean;
  
  /** Включить расчеты агрегатов */
  include_aggregates?: boolean;
}

/**
 * Агрегированная статистика по возвратам
 * Returns aggregate statistics
 */
interface RfbsReturnsAggregates {
  /** Общая сумма всех возвратов в выборке */
  total_amount: number;
  
  /** Средняя сумма возврата */
  average_amount: number;
  
  /** Количество по статусам */
  status_counts: Record<string, number>;
  
  /** Количество по причинам */
  reason_counts: Record<string, number>;
  
  /** Процент заявок с фотографиями */
  with_photos_percentage: number;
  
  /** Средний рейтинг сложности */
  average_complexity_score: number;
}

/**
 * Краткая информация о заявке для списка
 * Brief return information for list
 */
interface RfbsReturnBrief {
  return_id: number;
  posting_number: string;
  status: string;
  created_at: string;
  updated_at: string;
  customer_reason: string;
  total_amount: number;
  products_count: number;
  has_customer_photos: boolean;
  requires_attention: boolean;
  deadline: string;
  available_actions: string[];
  
  readonly [key: string]: unknown;
}

/**
 * Ответ со списком заявок на возврат
 * Returns list response
 */
interface RfbsReturnsListResponse {
  /** Список заявок */
  returns: RfbsReturnBrief[];
  
  /** Общее количество записей */
  total: number;
  
  /** Есть ли следующая страница */
  has_next: boolean;
  
  /** Агрегированная статистика (если запрошена) */
  aggregates?: RfbsReturnsAggregates;
  
  /** Время выполнения запроса */
  query_time_ms?: number;
  
  readonly [key: string]: unknown;
}
```

---

## 🎯 Практическое использование

### Универсальное управление действиями

```typescript
import { RfbsReturnsApi } from 'daytona-ozon-seller-api';

const rfbsReturnsApi = new RfbsReturnsApi(httpClient);

// 1. Одобрить заявку на возврат
const approveReturn = async (returnId: number, comment: string) => {
  try {
    const result = await rfbsReturnsApi.setAction({
      return_id: returnId,
      action: 'approve',
      comment: comment,
      metadata: {
        internal_notes: 'Автоматически одобрено по политике возврата'
      }
    });
    
    if (result.result === 'success') {
      console.log(`✅ Заявка ${returnId} одобрена`);
      console.log(`Новый статус: ${result.new_status}`);
      console.log(`ID транзакции: ${result.transaction_id}`);
      return true;
    } else {
      console.error(`❌ Ошибка при одобрении: ${result.error}`);
      return false;
    }
  } catch (error) {
    console.error('Ошибка API:', error);
    return false;
  }
};

// 2. Отклонить заявку с детальным обоснованием
const rejectReturn = async (returnId: number, reason: string) => {
  const result = await rfbsReturnsApi.setAction({
    return_id: returnId,
    action: 'reject',
    comment: reason,
    metadata: {
      rejection_reason: 'policy_violation',
      internal_notes: 'Не соответствует условиям возврата'
    }
  });
  
  if (result.result === 'success') {
    console.log(`🚫 Заявка ${returnId} отклонена: ${reason}`);
  }
  
  return result;
};

// 3. Подтвердить получение товара с оценкой состояния
const receiveReturn = async (returnId: number, condition: string, photos?: string[]) => {
  const result = await rfbsReturnsApi.setAction({
    return_id: returnId,
    action: 'receive_return',
    comment: `Товар получен. Состояние: ${condition}`,
    metadata: {
      item_condition: condition as any,
      photos: photos || [],
      internal_notes: 'Проверено на складе'
    }
  });
  
  console.log(`📦 Товар по заявке ${returnId} получен в состоянии: ${condition}`);
  return result;
};

// 4. Вернуть полную стоимость с компенсацией доставки
const returnFullMoney = async (returnId: number, compensateShipping: boolean = true) => {
  const result = await rfbsReturnsApi.setAction({
    return_id: returnId,
    action: 'return_money',
    comment: compensateShipping 
      ? 'Возврат полной стоимости включая доставку'
      : 'Возврат полной стоимости товара',
    compensate_shipping: compensateShipping
  });
  
  if (result.result === 'success') {
    console.log(`💰 Полный возврат денег по заявке ${returnId}`);
    console.log(`Ожидаемая дата: ${result.estimated_completion_date}`);
  }
  
  return result;
};

// 5. Частичная компенсация с расчетом суммы
const compensatePartially = async (returnId: number, percentage: number, reason: string) => {
  // Сначала получаем информацию о заявке для расчета суммы
  const returnInfo = await rfbsReturnsApi.getReturn({ return_id: returnId });
  const compensationAmount = (returnInfo.return?.total_amount || 0) * (percentage / 100);
  
  const result = await rfbsReturnsApi.setAction({
    return_id: returnId,
    action: 'compensate',
    comment: `Частичная компенсация ${percentage}%: ${reason}`,
    compensation_amount: compensationAmount,
    metadata: {
      internal_notes: `Компенсация рассчитана как ${percentage}% от стоимости товара`
    }
  });
  
  if (result.result === 'success') {
    console.log(`💸 Частичная компенсация ${compensationAmount}₽ по заявке ${returnId}`);
  }
  
  return result;
};
```

### Получение детальной информации

```typescript
// Получение расширенной информации о заявке
const getDetailedReturnInfo = async (returnId: number) => {
  try {
    const response = await rfbsReturnsApi.getReturn({
      return_id: returnId,
      include_history: true,
      include_product_details: true,
      include_calculations: true
    });
    
    const returnData = response.return;
    
    console.log(`🔍 Детальная информация о заявке ${returnId}:`);
    console.log(`Статус: ${returnData.status}`);
    console.log(`Создана: ${new Date(returnData.created_at).toLocaleString()}`);
    console.log(`Причина покупателя: ${returnData.customer_reason}`);
    console.log(`Общая сумма: ${returnData.total_amount}₽`);
    
    // Информация о товарах
    console.log(`\n📦 Товары в возврате (${returnData.products.length}):`);
    returnData.products.forEach(product => {
      console.log(`  • ${product.name} (${product.sku})`);
      console.log(`    Количество: ${product.quantity}, Сумма: ${product.total_amount}₽`);
      console.log(`    Состояние: ${product.customer_condition_claim}`);
      console.log(`    Можно перепродать: ${product.resaleable ? 'Да' : 'Нет'}`);
    });
    
    // Доступные действия
    console.log(`\n⚡ Доступные действия:`);
    returnData.available_actions.forEach(action => {
      console.log(`  • ${action}`);
    });
    
    // Расчеты (если включены)
    if (returnData.calculations) {
      console.log(`\n💡 Рекомендации системы:`);
      console.log(`  Рекомендуемая компенсация: ${returnData.calculations.recommended_compensation}₽`);
      console.log(`  Стоимость перепродажи: ${returnData.calculations.resale_value}₽`);
      console.log(`  Риск-оценка: ${returnData.calculations.risk_score}/100`);
    }
    
    // История действий (если включена)
    if (returnData.history) {
      console.log(`\n📚 История действий:`);
      returnData.history.forEach(item => {
        console.log(`  ${new Date(item.timestamp).toLocaleString()} - ${item.action} (${item.actor})`);
        if (item.comment) {
          console.log(`    Комментарий: ${item.comment}`);
        }
      });
    }
    
    return returnData;
  } catch (error) {
    console.error('Ошибка получения информации:', error);
    return null;
  }
};
```

### Расширенная работа со списками

```typescript
// Получение списка с расширенными фильтрами
const getFilteredReturns = async () => {
  try {
    // Получаем новые заявки за последние 7 дней, требующие внимания
    const response = await rfbsReturnsApi.getReturnsList({
      filter: {
        status: ['awaiting_approve', 'awaiting_decision'],
        created_since: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        min_amount: 1000, // Только заявки от 1000₽
        requires_attention: true,
        with_customer_photos: true
      },
      sort: {
        field: 'created_at',
        direction: 'desc'
      },
      limit: 50,
      include_stats: true,
      include_aggregates: true
    });
    
    console.log(`📊 Найдено заявок: ${response.total}`);
    console.log(`⏱️ Время запроса: ${response.query_time_ms}мс`);
    
    // Показываем агрегированную статистику
    if (response.aggregates) {
      console.log(`\n📈 Статистика по выборке:`);
      console.log(`  Общая сумма: ${response.aggregates.total_amount.toLocaleString()}₽`);
      console.log(`  Средняя сумма: ${response.aggregates.average_amount.toLocaleString()}₽`);
      console.log(`  С фотографиями: ${response.aggregates.with_photos_percentage}%`);
      
      console.log(`\n📋 По статусам:`);
      Object.entries(response.aggregates.status_counts).forEach(([status, count]) => {
        console.log(`  ${status}: ${count}`);
      });
      
      console.log(`\n📝 По причинам:`);
      Object.entries(response.aggregates.reason_counts).forEach(([reason, count]) => {
        console.log(`  ${reason}: ${count}`);
      });
    }
    
    // Обрабатываем каждую заявку
    for (const returnItem of response.returns) {
      console.log(`\n🎫 Заявка ${returnItem.return_id}:`);
      console.log(`  Отправление: ${returnItem.posting_number}`);
      console.log(`  Статус: ${returnItem.status}`);
      console.log(`  Сумма: ${returnItem.total_amount}₽`);
      console.log(`  Товаров: ${returnItem.products_count}`);
      console.log(`  Крайний срок: ${new Date(returnItem.deadline).toLocaleString()}`);
      console.log(`  Причина: ${returnItem.customer_reason}`);
      console.log(`  Фото от покупателя: ${returnItem.has_customer_photos ? 'Есть' : 'Нет'}`);
      console.log(`  Доступные действия: ${returnItem.available_actions.join(', ')}`);
    }
    
    return response.returns;
  } catch (error) {
    console.error('Ошибка получения списка:', error);
    return [];
  }
};

// Поиск заявок по тексту
const searchReturns = async (searchText: string) => {
  const response = await rfbsReturnsApi.getReturnsList({
    filter: {
      search_text: searchText
    },
    limit: 20
  });
  
  console.log(`🔍 Поиск "${searchText}": найдено ${response.total} заявок`);
  
  response.returns.forEach(returnItem => {
    console.log(`  • ${returnItem.return_id}: ${returnItem.customer_reason}`);
  });
  
  return response.returns;
};

// Получение заявок по конкретным отправлениям
const getReturnsByPostings = async (postingNumbers: string[]) => {
  const response = await rfbsReturnsApi.getReturnsList({
    filter: {
      posting_numbers: postingNumbers
    }
  });
  
  console.log(`📦 Заявки по отправлениям: ${response.total}`);
  
  return response.returns;
};
```

---

## 🚀 Класс ReturnsManager для автоматизации

```typescript
/**
 * Менеджер автоматизации обработки возвратов RFBS
 * RFBS Returns automation manager
 */
export class RfbsReturnsManager {
  constructor(
    private readonly rfbsReturnsApi: RfbsReturnsApi
  ) {}

  /**
   * Автоматическая обработка простых заявок по правилам
   * Automatic processing of simple returns based on rules
   */
  async autoProcessSimpleReturns(rules: {
    autoApproveReasons?: string[];
    autoRejectAfterDays?: number;
    minAmountForManualReview?: number;
    maxAmountForAutoApproval?: number;
  } = {}): Promise<{
    processed: number;
    approved: number;
    rejected: number;
    skipped: number;
    errors: string[];
  }> {
    const {
      autoApproveReasons = ['defective', 'wrong_item', 'damaged_packaging'],
      autoRejectAfterDays = 14,
      minAmountForManualReview = 5000,
      maxAmountForAutoApproval = 3000
    } = rules;

    const results = {
      processed: 0,
      approved: 0,
      rejected: 0,
      skipped: 0,
      errors: [] as string[]
    };

    try {
      // Получаем заявки, ожидающие одобрения
      const response = await this.rfbsReturnsApi.getReturnsList({
        filter: {
          status: ['awaiting_approve']
        },
        limit: 100,
        include_stats: true
      });

      for (const returnItem of response.returns) {
        try {
          results.processed++;
          
          // Получаем детальную информацию для принятия решения
          const details = await this.rfbsReturnsApi.getReturn({
            return_id: returnItem.return_id,
            include_calculations: true
          });

          const returnData = details.return;
          
          // Проверка суммы для ручного рассмотрения
          if (returnData.total_amount >= minAmountForManualReview) {
            results.skipped++;
            continue;
          }
          
          // Проверка срока давности заявки
          const daysSinceCreation = Math.floor(
            (Date.now() - new Date(returnData.created_at).getTime()) / (1000 * 60 * 60 * 24)
          );
          
          if (daysSinceCreation > autoRejectAfterDays) {
            // Автоматически отклоняем просроченные заявки
            await this.rfbsReturnsApi.setAction({
              return_id: returnItem.return_id,
              action: 'reject',
              comment: `Заявка автоматически отклонена: превышен срок рассмотрения (${autoRejectAfterDays} дней)`,
              metadata: {
                rejection_reason: 'time_expired',
                internal_notes: 'Автоматическое отклонение по правилу превышения срока'
              }
            });
            results.rejected++;
            continue;
          }
          
          // Автоматическое одобрение по причинам
          if (autoApproveReasons.includes(returnData.customer_reason) && 
              returnData.total_amount <= maxAmountForAutoApproval) {
            
            await this.rfbsReturnsApi.setAction({
              return_id: returnItem.return_id,
              action: 'approve',
              comment: `Заявка автоматически одобрена: ${returnData.customer_reason}`,
              metadata: {
                internal_notes: 'Автоматическое одобрение по предустановленным правилам'
              }
            });
            results.approved++;
          } else {
            results.skipped++;
          }
          
        } catch (error) {
          results.errors.push(`Ошибка обработки заявки ${returnItem.return_id}: ${error}`);
        }
      }

    } catch (error) {
      results.errors.push(`Общая ошибка автообработки: ${error}`);
    }

    return results;
  }

  /**
   * Массовая обработка заявок по статусу
   * Bulk processing of returns by status
   */
  async bulkProcessReturnsByStatus(
    targetStatus: string,
    action: 'approve' | 'reject' | 'receive_return' | 'return_money' | 'compensate',
    options: {
      comment?: string;
      batchSize?: number;
      compensationPercentage?: number;
      dryRun?: boolean;
    } = {}
  ): Promise<{
    totalFound: number;
    processed: number;
    successful: number;
    failed: number;
    errors: Array<{ returnId: number; error: string }>;
  }> {
    const {
      comment = '',
      batchSize = 20,
      compensationPercentage = 50,
      dryRun = false
    } = options;

    const results = {
      totalFound: 0,
      processed: 0,
      successful: 0,
      failed: 0,
      errors: [] as Array<{ returnId: number; error: string }>
    };

    try {
      // Получаем заявки по статусу
      let offset = 0;
      let hasMore = true;

      while (hasMore) {
        const response = await this.rfbsReturnsApi.getReturnsList({
          filter: { status: [targetStatus] },
          limit: batchSize,
          offset: offset
        });

        results.totalFound = response.total;
        hasMore = response.has_next;
        offset += batchSize;

        if (!response.returns || response.returns.length === 0) {
          break;
        }

        // Обрабатываем батч
        for (const returnItem of response.returns) {
          results.processed++;
          
          if (dryRun) {
            console.log(`[DRY RUN] Была бы обработана заявка ${returnItem.return_id} действием ${action}`);
            results.successful++;
            continue;
          }

          try {
            const actionRequest: any = {
              return_id: returnItem.return_id,
              action: action,
              comment: comment || `Массовая обработка: ${action}`,
              metadata: {
                internal_notes: `Обработано через bulkProcessReturnsByStatus`
              }
            };

            // Добавляем специфичные для действия параметры
            if (action === 'compensate') {
              const details = await this.rfbsReturnsApi.getReturn({
                return_id: returnItem.return_id
              });
              actionRequest.compensation_amount = 
                (details.return?.total_amount || 0) * (compensationPercentage / 100);
            }

            const result = await this.rfbsReturnsApi.setAction(actionRequest);
            
            if (result.result === 'success') {
              results.successful++;
            } else {
              results.failed++;
              results.errors.push({
                returnId: returnItem.return_id,
                error: result.error || 'Unknown error'
              });
            }
            
          } catch (error) {
            results.failed++;
            results.errors.push({
              returnId: returnItem.return_id,
              error: String(error)
            });
          }
        }
      }

    } catch (error) {
      results.errors.push({
        returnId: 0,
        error: `Ошибка массовой обработки: ${error}`
      });
    }

    return results;
  }

  /**
   * Интеллектуальное принятие решений на основе ML рекомендаций
   * Intelligent decision making based on ML recommendations
   */
  async smartDecisionMaking(options: {
    useCalculations?: boolean;
    riskThreshold?: number;
    profitabilityThreshold?: number;
    customerRatingWeight?: number;
  } = {}): Promise<{
    decisionsCount: number;
    approved: number;
    rejected: number;
    compensated: number;
    recommendations: Array<{
      returnId: number;
      action: string;
      reasoning: string;
      confidence: number;
    }>;
  }> {
    const {
      useCalculations = true,
      riskThreshold = 0.7,
      profitabilityThreshold = 0.3,
      customerRatingWeight = 0.2
    } = options;

    const results = {
      decisionsCount: 0,
      approved: 0,
      rejected: 0,
      compensated: 0,
      recommendations: [] as Array<{
        returnId: number;
        action: string;
        reasoning: string;
        confidence: number;
      }>
    };

    try {
      // Получаем заявки, ожидающие решения
      const response = await this.rfbsReturnsApi.getReturnsList({
        filter: {
          status: ['awaiting_approve', 'awaiting_decision']
        },
        limit: 50,
        include_aggregates: true
      });

      for (const returnItem of response.returns) {
        const details = await this.rfbsReturnsApi.getReturn({
          return_id: returnItem.return_id,
          include_calculations: useCalculations,
          include_product_details: true
        });

        const returnData = details.return;
        let recommendation = this.analyzeReturn(returnData, {
          riskThreshold,
          profitabilityThreshold,
          customerRatingWeight
        });

        results.recommendations.push({
          returnId: returnItem.return_id,
          action: recommendation.action,
          reasoning: recommendation.reasoning,
          confidence: recommendation.confidence
        });

        // Выполняем рекомендуемое действие если уверенность высокая
        if (recommendation.confidence >= 0.8) {
          results.decisionsCount++;
          
          switch (recommendation.action) {
            case 'approve':
              await this.rfbsReturnsApi.setAction({
                return_id: returnItem.return_id,
                action: 'approve',
                comment: `Автоматически одобрено: ${recommendation.reasoning}`,
                metadata: {
                  internal_notes: `ML рекомендация с уверенностью ${recommendation.confidence}`
                }
              });
              results.approved++;
              break;
              
            case 'reject':
              await this.rfbsReturnsApi.setAction({
                return_id: returnItem.return_id,
                action: 'reject',
                comment: `Автоматически отклонено: ${recommendation.reasoning}`,
                metadata: {
                  rejection_reason: 'other',
                  internal_notes: `ML рекомендация с уверенностью ${recommendation.confidence}`
                }
              });
              results.rejected++;
              break;
              
            case 'compensate':
              const compensationAmount = (returnData.total_amount * 0.5);
              await this.rfbsReturnsApi.setAction({
                return_id: returnItem.return_id,
                action: 'compensate',
                comment: `Частичная компенсация: ${recommendation.reasoning}`,
                compensation_amount: compensationAmount,
                metadata: {
                  internal_notes: `ML рекомендация с уверенностью ${recommendation.confidence}`
                }
              });
              results.compensated++;
              break;
          }
        }
      }

    } catch (error) {
      console.error('Ошибка умного принятия решений:', error);
    }

    return results;
  }

  /**
   * Анализ заявки для принятия решения
   * Return analysis for decision making
   */
  private analyzeReturn(returnData: any, options: any): {
    action: string;
    reasoning: string;
    confidence: number;
  } {
    let score = 0.5; // Начальный нейтральный score
    let reasoning = [];
    
    // Анализ причины возврата
    const highRiskReasons = ['changed_mind', 'found_cheaper'];
    const lowRiskReasons = ['defective', 'wrong_item', 'damaged_packaging'];
    
    if (lowRiskReasons.includes(returnData.customer_reason)) {
      score += 0.3;
      reasoning.push('надежная причина возврата');
    } else if (highRiskReasons.includes(returnData.customer_reason)) {
      score -= 0.2;
      reasoning.push('сомнительная причина возврата');
    }
    
    // Анализ стоимости
    if (returnData.total_amount > 10000) {
      score -= 0.1;
      reasoning.push('высокая стоимость требует внимания');
    } else if (returnData.total_amount < 1000) {
      score += 0.1;
      reasoning.push('низкая стоимость');
    }
    
    // Анализ товаров
    const resaleableProducts = returnData.products?.filter((p: any) => p.resaleable).length || 0;
    const totalProducts = returnData.products?.length || 1;
    const resaleableRatio = resaleableProducts / totalProducts;
    
    if (resaleableRatio > 0.8) {
      score += 0.2;
      reasoning.push('товары можно перепродать');
    } else if (resaleableRatio < 0.3) {
      score -= 0.15;
      reasoning.push('товары сложно перепродать');
    }
    
    // Анализ рисков (если доступны расчеты)
    if (returnData.calculations?.risk_score) {
      const riskScore = returnData.calculations.risk_score / 100;
      if (riskScore > options.riskThreshold) {
        score -= 0.2;
        reasoning.push('высокий риск по ML модели');
      } else if (riskScore < 0.3) {
        score += 0.1;
        reasoning.push('низкий риск по ML модели');
      }
    }
    
    // Определяем действие и уверенность
    let action: string;
    let confidence: number;
    
    if (score >= 0.7) {
      action = 'approve';
      confidence = Math.min(score, 0.95);
    } else if (score <= 0.3) {
      action = 'reject';
      confidence = Math.min(1 - score, 0.95);
    } else {
      action = 'compensate';
      confidence = 0.6; // Средняя уверенность для компенсации
    }
    
    return {
      action,
      reasoning: reasoning.join(', '),
      confidence: Math.round(confidence * 100) / 100
    };
  }

  /**
   * Генерация отчета по эффективности обработки возвратов
   * Generate returns processing efficiency report
   */
  async generateEfficiencyReport(periodDays: number = 30): Promise<{
    period: string;
    totalReturns: number;
    processedReturns: number;
    averageProcessingTime: string;
    statusBreakdown: Record<string, number>;
    financialImpact: {
      totalAmount: number;
      refundedAmount: number;
      compensatedAmount: number;
      savedAmount: number;
    };
    efficiency: {
      processingRate: number;
      autoDecisionRate: number;
      customerSatisfaction: number;
    };
    recommendations: string[];
  }> {
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - periodDays * 24 * 60 * 60 * 1000);
    
    try {
      const response = await this.rfbsReturnsApi.getReturnsList({
        filter: {
          created_since: startDate.toISOString(),
          created_until: endDate.toISOString()
        },
        limit: 1000,
        include_aggregates: true
      });
      
      const report = {
        period: `${periodDays} дней`,
        totalReturns: response.total,
        processedReturns: 0,
        averageProcessingTime: '0 часов',
        statusBreakdown: response.aggregates?.status_counts || {},
        financialImpact: {
          totalAmount: response.aggregates?.total_amount || 0,
          refundedAmount: 0,
          compensatedAmount: 0,
          savedAmount: 0
        },
        efficiency: {
          processingRate: 0,
          autoDecisionRate: 0,
          customerSatisfaction: 85 // Mock значение
        },
        recommendations: [] as string[]
      };
      
      // Расчет показателей эффективности
      const completedStatuses = ['completed', 'rejected'];
      report.processedReturns = completedStatuses.reduce((sum, status) => {
        return sum + (report.statusBreakdown[status] || 0);
      }, 0);
      
      report.efficiency.processingRate = 
        report.totalReturns > 0 ? (report.processedReturns / report.totalReturns) * 100 : 0;
      
      // Генерация рекомендаций
      if (report.efficiency.processingRate < 80) {
        report.recommendations.push('Увеличьте скорость обработки заявок - текущий показатель ниже рекомендуемых 80%');
      }
      
      if (report.statusBreakdown['awaiting_approve'] > report.processedReturns * 0.3) {
        report.recommendations.push('Рассмотрите возможность автоматизации простых решений');
      }
      
      if (report.financialImpact.totalAmount > 100000) {
        report.recommendations.push('Высокий объем возвратов требует анализа качества товаров');
      }
      
      return report;
    } catch (error) {
      console.error('Ошибка генерации отчета:', error);
      throw error;
    }
  }
}
```

---

## 💡 Продвинутые сценарии использования

### Workflow автоматизация

```typescript
const manager = new RfbsReturnsManager(rfbsReturnsApi);

// Ежедневная автоматическая обработка
const dailyAutomation = async () => {
  console.log('🚀 Запуск ежедневной автоматической обработки возвратов...');
  
  // 1. Автообработка простых заявок
  const simpleResults = await manager.autoProcessSimpleReturns({
    autoApproveReasons: ['defective', 'wrong_item', 'damaged_packaging'],
    autoRejectAfterDays: 14,
    maxAmountForAutoApproval: 3000
  });
  
  console.log(`✅ Простые заявки обработаны:`);
  console.log(`  • Одобрено: ${simpleResults.approved}`);
  console.log(`  • Отклонено: ${simpleResults.rejected}`);
  console.log(`  • Пропущено: ${simpleResults.skipped}`);
  
  // 2. Умное принятие решений для сложных случаев
  const smartResults = await manager.smartDecisionMaking({
    riskThreshold: 0.7,
    profitabilityThreshold: 0.3
  });
  
  console.log(`🧠 Умные решения:`);
  console.log(`  • Всего рекомендаций: ${smartResults.recommendations.length}`);
  console.log(`  • Автоматически выполнено: ${smartResults.decisionsCount}`);
  
  // 3. Генерация отчета
  const report = await manager.generateEfficiencyReport(7);
  console.log(`📊 Эффективность за неделю: ${report.efficiency.processingRate.toFixed(1)}%`);
  
  if (report.recommendations.length > 0) {
    console.log(`💡 Рекомендации:`);
    report.recommendations.forEach(rec => console.log(`  • ${rec}`));
  }
};

// Мониторинг критических заявок
const monitorCriticalReturns = async () => {
  const criticalReturns = await rfbsReturnsApi.getReturnsList({
    filter: {
      min_amount: 10000, // Высокие суммы
      status: ['awaiting_approve', 'awaiting_decision'],
      requires_attention: true
    },
    sort: {
      field: 'deadline',
      direction: 'asc' // Сортируем по срочности
    }
  });
  
  console.log(`🚨 Критических заявок: ${criticalReturns.total}`);
  
  for (const returnItem of criticalReturns.returns) {
    const timeToDeadline = new Date(returnItem.deadline).getTime() - Date.now();
    const hoursLeft = Math.floor(timeToDeadline / (1000 * 60 * 60));
    
    if (hoursLeft < 24) {
      console.log(`⏰ СРОЧНО: Заявка ${returnItem.return_id} - осталось ${hoursLeft} часов`);
      
      // Отправка уведомления менеджеру (mock)
      await sendNotificationToManager({
        returnId: returnItem.return_id,
        urgencyLevel: 'high',
        timeLeft: `${hoursLeft} часов`,
        amount: returnItem.total_amount
      });
    }
  }
};

// Mock функция отправки уведомлений
async function sendNotificationToManager(notification: any) {
  console.log(`📧 Уведомление отправлено менеджеру:`, notification);
}
```

### Интеграция с внешними системами

```typescript
// Интеграция с ERP системой
const syncWithERP = async (erpSystem: any) => {
  const recentReturns = await rfbsReturnsApi.getReturnsList({
    filter: {
      updated_since: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    },
    limit: 100
  });
  
  for (const returnItem of recentReturns.returns) {
    const details = await rfbsReturnsApi.getReturn({
      return_id: returnItem.return_id,
      include_product_details: true
    });
    
    // Синхронизируем с ERP
    await erpSystem.syncReturn({
      returnId: returnItem.return_id,
      postingNumber: returnItem.posting_number,
      status: returnItem.status,
      products: details.return.products.map((p: any) => ({
        sku: p.sku,
        quantity: p.quantity,
        condition: p.actual_condition || 'unknown'
      }))
    });
  }
  
  console.log(`🔄 Синхронизировано с ERP: ${recentReturns.returns.length} заявок`);
};

// Интеграция с системой качества
const updateQualityMetrics = async (qualitySystem: any) => {
  // Анализируем причины возвратов для выявления проблемных товаров
  const defectiveReturns = await rfbsReturnsApi.getReturnsList({
    filter: {
      customer_reason: ['defective', 'wrong_item', 'damaged_packaging'],
      created_since: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    },
    limit: 200,
    include_aggregates: true
  });
  
  // Группируем по SKU для анализа
  const skuStats = new Map();
  
  for (const returnItem of defectiveReturns.returns) {
    const details = await rfbsReturnsApi.getReturn({
      return_id: returnItem.return_id,
      include_product_details: true
    });
    
    for (const product of details.return.products) {
      if (!skuStats.has(product.sku)) {
        skuStats.set(product.sku, {
          sku: product.sku,
          name: product.name,
          returnCount: 0,
          totalQuantity: 0,
          reasons: new Set()
        });
      }
      
      const stats = skuStats.get(product.sku);
      stats.returnCount++;
      stats.totalQuantity += product.quantity;
      stats.reasons.add(returnItem.customer_reason);
    }
  }
  
  // Отправляем данные в систему качества
  for (const [sku, stats] of skuStats.entries()) {
    if (stats.returnCount >= 5) { // Только товары с 5+ возвратами
      await qualitySystem.reportQualityIssue({
        sku: stats.sku,
        productName: stats.name,
        returnCount: stats.returnCount,
        affectedQuantity: stats.totalQuantity,
        commonReasons: Array.from(stats.reasons),
        severity: stats.returnCount > 10 ? 'high' : 'medium'
      });
    }
  }
  
  console.log(`🎯 Обновлены метрики качества для ${skuStats.size} товаров`);
};
```

---

## ⚙️ Лучшие практики

### Управление ошибками и повторными попытками

```typescript
class RfbsReturnsService {
  private readonly maxRetries = 3;
  private readonly retryDelay = 1000;

  async executeActionWithRetry(
    returnId: number, 
    action: any, 
    attempt: number = 1
  ): Promise<any> {
    try {
      const result = await this.rfbsReturnsApi.setAction({
        return_id: returnId,
        ...action
      });
      
      if (result.result === 'success') {
        return result;
      }
      
      throw new Error(result.error || 'Action failed');
      
    } catch (error) {
      if (attempt < this.maxRetries) {
        console.log(`Попытка ${attempt} не удалась, повтор через ${this.retryDelay}мс...`);
        await this.delay(this.retryDelay * attempt);
        return this.executeActionWithRetry(returnId, action, attempt + 1);
      }
      
      throw error;
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

### Кэширование и оптимизация запросов

```typescript
class CachedRfbsReturnsService {
  private cache = new Map<string, { data: any; expires: number }>();
  private readonly cacheTTL = 5 * 60 * 1000; // 5 минут

  async getCachedReturnInfo(returnId: number): Promise<any> {
    const cacheKey = `return_${returnId}`;
    const cached = this.cache.get(cacheKey);
    
    if (cached && cached.expires > Date.now()) {
      return cached.data;
    }
    
    const data = await this.rfbsReturnsApi.getReturn({
      return_id: returnId,
      include_product_details: true,
      include_calculations: true
    });
    
    this.cache.set(cacheKey, {
      data,
      expires: Date.now() + this.cacheTTL
    });
    
    return data;
  }

  // Batch запросы для оптимизации
  async getMultipleReturns(returnIds: number[]): Promise<any[]> {
    const results = [];
    const batchSize = 5;
    
    for (let i = 0; i < returnIds.length; i += batchSize) {
      const batch = returnIds.slice(i, i + batchSize);
      const batchPromises = batch.map(id => this.getCachedReturnInfo(id));
      const batchResults = await Promise.allSettled(batchPromises);
      
      results.push(...batchResults);
      
      // Небольшая пауза между батчами
      if (i + batchSize < returnIds.length) {
        await this.delay(100);
      }
    }
    
    return results
      .filter(result => result.status === 'fulfilled')
      .map(result => (result as any).value);
  }
  
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

Создана полная документация по современным методам управления возвратами RFBS с детальными TypeScript интерфейсами, практическими примерами и классом автоматизации. Теперь создам документацию по устаревшим методам.