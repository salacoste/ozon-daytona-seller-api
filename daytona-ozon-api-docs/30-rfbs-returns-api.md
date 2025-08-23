# RFBS Returns API

API для управления возвратами по схеме rFBS (returnable Fulfillment by Seller).

## Обзор

RFBS Returns API предоставляет инструменты для обработки возвратов товаров по схеме rFBS, где продавец несет ответственность за логистику возвратов. API включает современные методы через `setAction` и устаревшие методы, которые будут удалены в будущих версиях.

**Ключевые возможности:**
- Получение списка заявок на возврат с фильтрацией
- Получение детальной информации о возврате
- Управление действиями по возвратам через единый метод `setAction`
- Обработка различных статусов возвратов
- Компенсации и возврат денег покупателям

## Методы API

### setAction()

Передать доступные действия для rFBS возвратов (рекомендуемый метод).

```typescript
import { OzonSellerAPI } from 'bmad-ozon-seller-api';

const api = new OzonSellerAPI({
  clientId: 'your-client-id',
  apiKey: 'your-api-key'
});

// Одобрение возврата
const approveResult = await api.rfbsReturns.setAction({
  return_id: 123456,
  action: 'approve',
  comment: 'Return approved for inspection'
});

// Отклонение возврата
const rejectResult = await api.rfbsReturns.setAction({
  return_id: 123456,
  action: 'reject',
  comment: 'Product does not meet return policy criteria'
});

// Подтверждение получения товара
const receiveResult = await api.rfbsReturns.setAction({
  return_id: 123456,
  action: 'receive_return'
});

// Возврат денег покупателю
const refundResult = await api.rfbsReturns.setAction({
  return_id: 123456,
  action: 'return_money',
  full_amount: true,
  compensate_shipping: true
});

// Частичная компенсация
const compensateResult = await api.rfbsReturns.setAction({
  return_id: 123456,
  action: 'compensate',
  compensation_amount: 500.00,
  reason: 'Minor defect, partial refund'
});

console.log('Action completed:', approveResult.result);
```

### getReturnsList()

Получить список заявок на возврат с фильтрацией.

```typescript
// Базовый запрос списка возвратов
const returns = await api.rfbsReturns.getReturnsList({
  filter: {
    status: ['awaiting_approve', 'awaiting_return'],
    created_since: '2024-01-01T00:00:00Z',
    created_to: '2024-01-31T23:59:59Z'
  },
  limit: 100,
  offset: 0
});

console.log('Total returns:', returns.total);
returns.returns?.forEach(returnItem => {
  console.log(`Return ${returnItem.return_id}: ${returnItem.status}`);
  console.log(`Customer: ${returnItem.customer_name}`);
  console.log(`Product: ${returnItem.product_name}`);
  console.log(`Amount: ${returnItem.return_amount}`);
});

// Фильтрация по различным критериям
const filteredReturns = await api.rfbsReturns.getReturnsList({
  filter: {
    status: ['returned', 'money_returned'],
    return_reason_id: [1, 2, 3],
    product_offer_id: ['OFFER-123'],
    created_since: '2024-01-15T00:00:00Z'
  },
  limit: 50
});
```

### getReturn()

Получить детальную информацию о конкретной заявке на возврат.

```typescript
// Получение информации о возврате
const returnInfo = await api.rfbsReturns.getReturn({
  return_id: 123456
});

if (returnInfo.return) {
  console.log('Return Details:');
  console.log('Status:', returnInfo.return.status);
  console.log('Customer reason:', returnInfo.return.customer_reason);
  console.log('Return amount:', returnInfo.return.return_amount);
  console.log('Created at:', returnInfo.return.created_at);
  
  // Информация о товарах
  returnInfo.return.products?.forEach(product => {
    console.log(`Product: ${product.name}`);
    console.log(`SKU: ${product.sku}`);
    console.log(`Quantity: ${product.quantity}`);
    console.log(`Price: ${product.price}`);
  });
  
  // Фотографии от покупателя (если есть)
  if (returnInfo.return.images?.length > 0) {
    console.log('Customer provided images:');
    returnInfo.return.images.forEach((image, index) => {
      console.log(`Image ${index + 1}: ${image}`);
    });
  }
}
```

### Устаревшие методы

**⚠️ Внимание:** Следующие методы устарели и будут удалены в будущих версиях. Используйте `setAction()` вместо них.

```typescript
// ❌ Устаревший способ
await api.rfbsReturns.verify({
  return_id: 123456,
  comment: 'Approved'
});

// ✅ Рекомендуемый способ
await api.rfbsReturns.setAction({
  return_id: 123456,
  action: 'approve',
  comment: 'Approved'
});
```

## TypeScript Interfaces

### Request Types

```typescript
interface RfbsReturnsActionSetRequest {
  return_id: number;
  action: 'approve' | 'reject' | 'receive_return' | 'return_money' | 'compensate';
  comment?: string;
  full_amount?: boolean;
  compensate_shipping?: boolean;
  compensation_amount?: number;
  reason?: string;
}

interface RfbsReturnsListRequest {
  filter?: {
    status?: string[];
    created_since?: string;
    created_to?: string;
    return_reason_id?: number[];
    product_offer_id?: string[];
  };
  limit?: number;
  offset?: number;
}

interface RfbsReturnsGetRequest {
  return_id: number;
}

// Устаревшие интерфейсы (не рекомендуется использовать)
interface RfbsReturnsCompensateRequest {
  return_id: number;
  compensation_amount: number;
  reason: string;
}

interface RfbsReturnsReceiveReturnRequest {
  return_id: number;
  received_at?: string;
}

interface RfbsReturnsRejectRequest {
  return_id: number;
  comment: string;
}

interface RfbsReturnsReturnMoneyRequest {
  return_id: number;
  full_amount: boolean;
  compensate_shipping?: boolean;
}

interface RfbsReturnsVerifyRequest {
  return_id: number;
  comment?: string;
}
```

### Response Types

```typescript
interface RfbsReturnsActionSetResponse {
  result: 'ok' | 'error';
  message?: string;
}

interface RfbsReturnsListResponse {
  returns: RfbsReturn[];
  total: number;
  has_next: boolean;
}

interface RfbsReturnsGetResponse {
  return?: RfbsReturnDetailed;
}

interface RfbsReturn {
  return_id: number;
  status: string;
  customer_name: string;
  product_name: string;
  product_offer_id: string;
  sku: string;
  return_amount: number;
  created_at: string;
  updated_at?: string;
  customer_reason: string;
  return_reason_id: number;
}

interface RfbsReturnDetailed {
  return_id: number;
  status: string;
  customer_name: string;
  customer_reason: string;
  return_amount: number;
  created_at: string;
  updated_at?: string;
  products: RfbsReturnProduct[];
  images?: string[];
  tracking_number?: string;
  seller_comment?: string;
}

interface RfbsReturnProduct {
  name: string;
  sku: string;
  offer_id: string;
  quantity: number;
  price: number;
}

interface RfbsReturnsEmptyResponse {
  // Пустой ответ для устаревших методов
}
```

## Примеры использования

### Обработка новых возвратов

```typescript
async function processNewReturns() {
  // Получаем все новые заявки на возврат
  const newReturns = await api.rfbsReturns.getReturnsList({
    filter: {
      status: ['awaiting_approve']
    },
    limit: 100
  });
  
  console.log(`Found ${newReturns.total} new returns to process`);
  
  for (const returnItem of newReturns.returns) {
    // Получаем детальную информацию
    const details = await api.rfbsReturns.getReturn({
      return_id: returnItem.return_id
    });
    
    if (details.return) {
      // Анализируем причину возврата
      const shouldApprove = analyzeReturnReason(details.return);
      
      if (shouldApprove) {
        // Одобряем возврат
        await api.rfbsReturns.setAction({
          return_id: returnItem.return_id,
          action: 'approve',
          comment: 'Return approved automatically based on policy'
        });
        
        console.log(`Approved return ${returnItem.return_id}`);
      } else {
        // Отклоняем возврат
        await api.rfbsReturns.setAction({
          return_id: returnItem.return_id,
          action: 'reject',
          comment: 'Return does not meet our return policy criteria'
        });
        
        console.log(`Rejected return ${returnItem.return_id}`);
      }
    }
    
    // Добавляем задержку для соблюдения лимитов API
    await new Promise(resolve => setTimeout(resolve, 100));
  }
}

function analyzeReturnReason(returnDetails: RfbsReturnDetailed): boolean {
  // Логика анализа причины возврата
  const validReasons = [1, 2, 3]; // ID валидных причин
  return validReasons.includes(returnDetails.return_reason_id);
}
```

### Массовое управление возвратами

```typescript
class RfbsReturnManager {
  constructor(private api: OzonSellerAPI) {}
  
  async processReturnWorkflow(returnId: number) {
    try {
      // Шаг 1: Получаем информацию о возврате
      const returnInfo = await this.api.rfbsReturns.getReturn({
        return_id: returnId
      });
      
      if (!returnInfo.return) {
        throw new Error(`Return ${returnId} not found`);
      }
      
      const status = returnInfo.return.status;
      
      // Шаг 2: Выполняем действие в зависимости от статуса
      switch (status) {
        case 'awaiting_approve':
          await this.approveReturn(returnId, returnInfo.return);
          break;
          
        case 'awaiting_return':
          await this.receiveReturn(returnId);
          break;
          
        case 'returned':
          await this.processReturnedItem(returnId, returnInfo.return);
          break;
          
        default:
          console.log(`No action needed for return ${returnId} with status ${status}`);
      }
      
    } catch (error) {
      console.error(`Error processing return ${returnId}:`, error);
    }
  }
  
  private async approveReturn(returnId: number, returnDetails: RfbsReturnDetailed) {
    const result = await this.api.rfbsReturns.setAction({
      return_id: returnId,
      action: 'approve',
      comment: 'Return approved for inspection'
    });
    
    if (result.result === 'ok') {
      console.log(`Return ${returnId} approved successfully`);
    }
  }
  
  private async receiveReturn(returnId: number) {
    const result = await this.api.rfbsReturns.setAction({
      return_id: returnId,
      action: 'receive_return'
    });
    
    if (result.result === 'ok') {
      console.log(`Confirmed receipt of return ${returnId}`);
    }
  }
  
  private async processReturnedItem(returnId: number, returnDetails: RfbsReturnDetailed) {
    // Логика проверки товара
    const itemCondition = await this.inspectReturnedItem(returnDetails);
    
    if (itemCondition === 'good') {
      // Полный возврат денег
      await this.api.rfbsReturns.setAction({
        return_id: returnId,
        action: 'return_money',
        full_amount: true,
        compensate_shipping: true
      });
      
      console.log(`Full refund processed for return ${returnId}`);
    } else if (itemCondition === 'damaged') {
      // Частичная компенсация
      const compensationAmount = returnDetails.return_amount * 0.7; // 70% от стоимости
      
      await this.api.rfbsReturns.setAction({
        return_id: returnId,
        action: 'compensate',
        compensation_amount: compensationAmount,
        reason: 'Item returned in damaged condition'
      });
      
      console.log(`Partial compensation of ${compensationAmount} processed for return ${returnId}`);
    } else {
      // Отклоняем возврат
      await this.api.rfbsReturns.setAction({
        return_id: returnId,
        action: 'reject',
        comment: 'Item not eligible for return due to condition'
      });
      
      console.log(`Return ${returnId} rejected due to item condition`);
    }
  }
  
  private async inspectReturnedItem(returnDetails: RfbsReturnDetailed): Promise<'good' | 'damaged' | 'not_eligible'> {
    // Имитация логики проверки товара
    // В реальной системе это может включать:
    // - Анализ фотографий от покупателя
    // - Проверка истории товара
    // - Сравнение с политикой возвратов
    
    return 'good'; // Упрощенная логика для примера
  }
  
  async generateReturnReport(dateFrom: string, dateTo: string) {
    const returns = await this.api.rfbsReturns.getReturnsList({
      filter: {
        created_since: dateFrom,
        created_to: dateTo
      },
      limit: 1000
    });
    
    const report = {
      total_returns: returns.total,
      by_status: {} as Record<string, number>,
      total_amount: 0,
      by_reason: {} as Record<string, number>
    };
    
    for (const returnItem of returns.returns) {
      // Группировка по статусам
      report.by_status[returnItem.status] = (report.by_status[returnItem.status] || 0) + 1;
      
      // Суммарная сумма возвратов
      report.total_amount += returnItem.return_amount;
      
      // Группировка по причинам
      report.by_reason[returnItem.return_reason_id] = (report.by_reason[returnItem.return_reason_id] || 0) + 1;
    }
    
    console.log('RFBS Returns Report:');
    console.log(`Total returns: ${report.total_returns}`);
    console.log(`Total amount: ${report.total_amount}`);
    console.log('By status:', report.by_status);
    console.log('By reason:', report.by_reason);
    
    return report;
  }
}

// Использование
const returnManager = new RfbsReturnManager(api);

// Обработка конкретного возврата
await returnManager.processReturnWorkflow(123456);

// Генерация отчета
await returnManager.generateReturnReport(
  '2024-01-01T00:00:00Z',
  '2024-01-31T23:59:59Z'
);
```

## Комплексные сценарии

### Автоматическая система обработки возвратов

```typescript
class AutomatedRfbsReturnSystem {
  private api: OzonSellerAPI;
  private rules: ReturnProcessingRule[];
  
  constructor(api: OzonSellerAPI) {
    this.api = api;
    this.rules = this.initializeProcessingRules();
  }
  
  private initializeProcessingRules(): ReturnProcessingRule[] {
    return [
      {
        condition: (returnItem) => returnItem.return_reason_id === 1, // Брак
        action: 'auto_approve',
        priority: 1
      },
      {
        condition: (returnItem) => returnItem.return_amount > 5000,
        action: 'manual_review',
        priority: 2
      },
      {
        condition: (returnItem) => returnItem.return_reason_id === 5, // Не понравился
        action: 'conditional_approve',
        priority: 3
      }
    ];
  }
  
  async processAllNewReturns() {
    let offset = 0;
    const limit = 100;
    let hasMore = true;
    
    console.log('Starting automated RFBS return processing...');
    
    while (hasMore) {
      const returns = await this.api.rfbsReturns.getReturnsList({
        filter: {
          status: ['awaiting_approve']
        },
        limit,
        offset
      });
      
      for (const returnItem of returns.returns) {
        await this.processReturn(returnItem);
        
        // Соблюдаем лимиты API
        await this.delay(100);
      }
      
      hasMore = returns.has_next;
      offset += limit;
      
      console.log(`Processed ${Math.min(offset, returns.total)} of ${returns.total} returns`);
    }
    
    console.log('Automated processing completed');
  }
  
  private async processReturn(returnItem: RfbsReturn) {
    try {
      // Получаем детальную информацию
      const details = await this.api.rfbsReturns.getReturn({
        return_id: returnItem.return_id
      });
      
      if (!details.return) return;
      
      // Применяем правила обработки
      const applicableRule = this.findApplicableRule(returnItem);
      
      if (applicableRule) {
        await this.executeRule(applicableRule, returnItem, details.return);
      } else {
        // Если нет подходящего правила, отправляем на ручную обработку
        await this.flagForManualReview(returnItem.return_id, 'No matching processing rule');
      }
      
    } catch (error) {
      console.error(`Error processing return ${returnItem.return_id}:`, error);
      await this.flagForManualReview(returnItem.return_id, `Processing error: ${error.message}`);
    }
  }
  
  private findApplicableRule(returnItem: RfbsReturn): ReturnProcessingRule | null {
    return this.rules
      .sort((a, b) => a.priority - b.priority)
      .find(rule => rule.condition(returnItem)) || null;
  }
  
  private async executeRule(rule: ReturnProcessingRule, returnItem: RfbsReturn, details: RfbsReturnDetailed) {
    switch (rule.action) {
      case 'auto_approve':
        await this.api.rfbsReturns.setAction({
          return_id: returnItem.return_id,
          action: 'approve',
          comment: 'Auto-approved based on processing rules'
        });
        console.log(`Auto-approved return ${returnItem.return_id}`);
        break;
        
      case 'conditional_approve':
        const shouldApprove = await this.evaluateConditions(details);
        
        if (shouldApprove) {
          await this.api.rfbsReturns.setAction({
            return_id: returnItem.return_id,
            action: 'approve',
            comment: 'Conditionally approved'
          });
          console.log(`Conditionally approved return ${returnItem.return_id}`);
        } else {
          await this.flagForManualReview(returnItem.return_id, 'Failed conditional approval criteria');
        }
        break;
        
      case 'manual_review':
        await this.flagForManualReview(returnItem.return_id, 'Requires manual review per rules');
        break;
        
      default:
        console.log(`Unknown rule action: ${rule.action}`);
    }
  }
  
  private async evaluateConditions(details: RfbsReturnDetailed): Promise<boolean> {
    // Логика оценки условий для условного одобрения
    const daysSincePurchase = this.calculateDaysSincePurchase(details.created_at);
    const hasValidImages = details.images && details.images.length > 0;
    
    return daysSincePurchase <= 14 && hasValidImages;
  }
  
  private calculateDaysSincePurchase(createdAt: string): number {
    const createdDate = new Date(createdAt);
    const now = new Date();
    const diffMs = now.getTime() - createdDate.getTime();
    return Math.floor(diffMs / (1000 * 60 * 60 * 24));
  }
  
  private async flagForManualReview(returnId: number, reason: string) {
    // В реальной системе здесь была бы отправка в систему управления задачами
    console.log(`Return ${returnId} flagged for manual review: ${reason}`);
  }
  
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

interface ReturnProcessingRule {
  condition: (returnItem: RfbsReturn) => boolean;
  action: 'auto_approve' | 'conditional_approve' | 'manual_review';
  priority: number;
}

// Использование
const returnSystem = new AutomatedRfbsReturnSystem(api);
await returnSystem.processAllNewReturns();
```

## Обработка ошибок

```typescript
async function safeReturnOperation() {
  try {
    const result = await api.rfbsReturns.setAction({
      return_id: 123456,
      action: 'approve',
      comment: 'Approved'
    });
    
    if (result.result === 'ok') {
      console.log('Operation completed successfully');
    } else {
      console.error('Operation failed:', result.message);
    }
    
  } catch (error) {
    if (error.code === 'RETURN_NOT_FOUND') {
      console.error('Return not found');
    } else if (error.code === 'INVALID_STATUS') {
      console.error('Invalid return status for this operation');
    } else if (error.code === 'RATE_LIMIT_EXCEEDED') {
      console.error('API rate limit exceeded, retrying in 1 second...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Повторная попытка
    } else {
      console.error('Unexpected error:', error);
    }
  }
}
```

## Лучшие практики

### 1. Использование современных методов
```typescript
// ✅ Рекомендуется: используйте setAction
await api.rfbsReturns.setAction({
  return_id: returnId,
  action: 'approve',
  comment: 'Approved'
});

// ❌ Устарело: избегайте deprecated методов
await api.rfbsReturns.verify({ return_id: returnId });
```

### 2. Эффективная пагинация
```typescript
async function getAllReturns() {
  const allReturns: RfbsReturn[] = [];
  let offset = 0;
  const limit = 100;
  let hasMore = true;
  
  while (hasMore) {
    const response = await api.rfbsReturns.getReturnsList({
      filter: { status: ['awaiting_approve'] },
      limit,
      offset
    });
    
    allReturns.push(...response.returns);
    hasMore = response.has_next;
    offset += limit;
    
    // Соблюдаем лимиты API
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  return allReturns;
}
```

### 3. Мониторинг и логирование
```typescript
class RfbsReturnLogger {
  static logAction(returnId: number, action: string, result: string) {
    console.log(`[${new Date().toISOString()}] Return ${returnId}: ${action} -> ${result}`);
  }
  
  static logError(returnId: number, error: any) {
    console.error(`[${new Date().toISOString()}] Return ${returnId} error:`, error);
  }
}
```

## Интеграция с другими API

### Связь с основными возвратами
```typescript
async function synchronizeReturns() {
  // Получаем RFBS возвраты
  const rfbsReturns = await api.rfbsReturns.getReturnsList({
    filter: { status: ['money_returned'] },
    limit: 100
  });
  
  // Получаем обычные возвраты для сравнения
  const regularReturns = await api.returns.getList({
    filter: { status: ['NEW'] },
    limit: 100
  });
  
  // Анализируем различия в обработке
  console.log(`RFBS returns: ${rfbsReturns.total}`);
  console.log(`Regular returns: ${regularReturns.returns?.length || 0}`);
}
```

### Интеграция с финансовой отчетностью
```typescript
async function calculateReturnImpact(dateFrom: string, dateTo: string) {
  const returns = await api.rfbsReturns.getReturnsList({
    filter: {
      status: ['money_returned'],
      created_since: dateFrom,
      created_to: dateTo
    },
    limit: 1000
  });
  
  const totalImpact = returns.returns.reduce((sum, ret) => sum + ret.return_amount, 0);
  
  console.log(`Total RFBS return impact: ${totalImpact} руб.`);
  return totalImpact;
}
```