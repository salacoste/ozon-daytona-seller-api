# Cancellation API - Управление заявками на отмену заказов

Cancellation API предоставляет функционал для управления заявками на отмену rFBS-заказов, включая их просмотр, подтверждение и отклонение.

## Обзор API

**Количество методов:** 7 (4 устаревших v1 + 3 актуальных v2)  
**Основные функции:** Управление заявками на отмену rFBS-заказов  
**Статус версий:** v1 методы устарели и будут отключены 3 августа 2025 года

⚠️ **Важно:** Все методы v1 устарели и будут отключены 3 августа 2025 года. Используйте только методы v2.

## Методы API

### Актуальные методы (v2)

### 1. Получение списка заявок на отмену (v2)

**Метод:** `getConditionalCancellationListV2()`  
**Эндпоинт:** `POST /v2/conditional-cancellation/list`

Получает список заявок на отмену rFBS-заказов с cursor-based пагинацией и фильтрацией.

#### Параметры запроса

```typescript
interface CancellationGetListV2Request {
  limit: number;                    // Количество заявок (максимум 1000)
  last_id?: number;                // ID последней заявки для пагинации
  filters?: {
    state?: 'ON_APPROVAL' | 'APPROVED' | 'REJECTED';
    cancellation_initiator?: ('CLIENT' | 'SYSTEM')[];
    posting_number?: string[];      // Номера отправлений
  };
  with?: {
    counter?: boolean;              // Включить счётчик заявок на рассмотрении
  };
}
```

#### Пример использования

```typescript
import { OzonSellerApiClient } from '@spacechemical/ozon-seller-api';

const client = new OzonSellerApiClient({
  apiKey: 'your-api-key',
  clientId: 'your-client-id'
});

// Получить заявки на отмену, ожидающие рассмотрения
const pendingCancellations = await client.cancellation.getConditionalCancellationListV2({
  limit: 100,
  filters: {
    state: 'ON_APPROVAL',
    cancellation_initiator: ['CLIENT']
  },
  with: {
    counter: true
  }
});

// Обработать заявки
pendingCancellations.result?.forEach(cancellation => {
  console.log(`Заявка ${cancellation.cancellation_id}: ${cancellation.posting_number}`);
  console.log(`Статус: ${cancellation.state?.state}`);
  console.log(`Инициатор: ${cancellation.cancellation_initiator}`);
  console.log(`Причина: ${cancellation.cancellation_reason?.name}`);
  console.log(`Создана: ${cancellation.cancelled_at}`);
  
  if (cancellation.auto_approve_date) {
    console.log(`Автоподтверждение: ${cancellation.auto_approve_date}`);
  }
});

console.log(`Заявок на рассмотрении: ${pendingCancellations.counter}`);

// Загрузить следующую страницу
if (pendingCancellations.last_id) {
  const nextPage = await client.cancellation.getConditionalCancellationListV2({
    limit: 100,
    last_id: pendingCancellations.last_id,
    filters: { state: 'ON_APPROVAL' }
  });
}
```

### 2. Подтверждение заявки на отмену (v2)

**Метод:** `approveConditionalCancellationV2()`  
**Эндпоинт:** `POST /v2/conditional-cancellation/approve`

Подтверждает заявку на отмену в статусе ON_APPROVAL. Заказ будет отменён, деньги вернутся покупателю.

#### Параметры запроса

```typescript
interface CancellationApproveV2Request {
  cancellation_id: number;         // ID заявки на отмену
  comment: string;                 // Комментарий к решению
}
```

#### Пример использования

```typescript
// Подтвердить заявку на отмену
await client.cancellation.approveConditionalCancellationV2({
  cancellation_id: 12345,
  comment: 'Заявка обоснована. Товар действительно повреждён при доставке.'
});

console.log('Заявка подтверждена. Заказ отменён, деньги вернутся покупателю.');
```

### 3. Отклонение заявки на отмену (v2)

**Метод:** `rejectConditionalCancellationV2()`  
**Эндпоинт:** `POST /v2/conditional-cancellation/reject`

Отклоняет заявку на отмену в статусе ON_APPROVAL. Заказ останется в прежнем статусе и будет доставлен покупателю.

#### Параметры запроса

```typescript
interface CancellationRejectV2Request {
  cancellation_id: number;         // ID заявки на отмену
  comment: string;                 // Комментарий к решению
}
```

#### Пример использования

```typescript
// Отклонить заявку на отмену
await client.cancellation.rejectConditionalCancellationV2({
  cancellation_id: 12345,
  comment: 'Товар уже отправлен курьером и будет доставлен в ближайшее время.'
});

console.log('Заявка отклонена. Заказ будет доставлен покупателю.');
```

## Устаревшие методы (v1)

⚠️ **Внимание:** Все методы v1 будут отключены 3 августа 2025 года. Переходите на v2.

### 4. Получение списка заявок (v1) - DEPRECATED

**Метод:** `getConditionalCancellationList()`  
**Эндпоинт:** `POST /v1/conditional-cancellation/list`

### 5. Получение информации о заявке (v1) - DEPRECATED

**Метод:** `getConditionalCancellation()`  
**Эндпоинт:** `POST /v1/conditional-cancellation/get`

### 6. Подтверждение заявки (v1) - DEPRECATED

**Метод:** `approveConditionalCancellation()`  
**Эндпоинт:** `POST /v1/conditional-cancellation/approve`

### 7. Отклонение заявки (v1) - DEPRECATED

**Метод:** `rejectConditionalCancellation()`  
**Эндпоинт:** `POST /v1/conditional-cancellation/reject`

## Практические сценарии использования

### 1. Мониторинг заявок на отмену

```typescript
class CancellationMonitor {
  constructor(private client: OzonSellerApiClient) {}

  // Получить все заявки, требующие рассмотрения
  async getPendingCancellations() {
    const cancellations = await this.client.cancellation.getConditionalCancellationListV2({
      limit: 1000,
      filters: {
        state: 'ON_APPROVAL'
      },
      with: {
        counter: true
      }
    });

    return {
      items: cancellations.result || [],
      totalCount: cancellations.counter || 0
    };
  }

  // Анализ причин отмен
  async analyzeCancellationReasons() {
    const { items } = await this.getPendingCancellations();
    
    const reasonStats = items.reduce((acc, cancellation) => {
      const reason = cancellation.cancellation_reason?.name || 'Неизвестная причина';
      acc[reason] = (acc[reason] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    console.log('Статистика причин отмен:');
    Object.entries(reasonStats).forEach(([reason, count]) => {
      console.log(`${reason}: ${count} заявок`);
    });

    return reasonStats;
  }

  // Заявки с истекающим сроком автоподтверждения
  async getExpiringCancellations(hoursBeforeExpiry: number = 24) {
    const { items } = await this.getPendingCancellations();
    const expiryThreshold = new Date();
    expiryThreshold.setHours(expiryThreshold.getHours() + hoursBeforeExpiry);

    return items.filter(cancellation => {
      if (!cancellation.auto_approve_date) return false;
      
      const autoApproveDate = new Date(cancellation.auto_approve_date);
      return autoApproveDate <= expiryThreshold;
    });
  }
}

const monitor = new CancellationMonitor(client);

// Проверить заявки, требующие внимания
const expiringCancellations = await monitor.getExpiringCancellations(12); // 12 часов до автоподтверждения
if (expiringCancellations.length > 0) {
  console.log(`Внимание! ${expiringCancellations.length} заявок будут автоматически подтверждены в ближайшие 12 часов.`);
  
  expiringCancellations.forEach(cancellation => {
    console.log(`Заявка ${cancellation.cancellation_id} (${cancellation.posting_number}) - автоподтверждение: ${cancellation.auto_approve_date}`);
  });
}
```

### 2. Автоматизация обработки заявок

```typescript
class CancellationProcessor {
  constructor(private client: OzonSellerApiClient) {}

  // Автоматическое принятие решений на основе правил
  async processAutomaticDecisions() {
    const { items } = await this.getPendingCancellations();
    const results = {
      approved: 0,
      rejected: 0,
      requiresManualReview: 0
    };

    for (const cancellation of items) {
      const decision = this.evaluateCancellation(cancellation);
      
      if (decision.action === 'approve') {
        try {
          await this.client.cancellation.approveConditionalCancellationV2({
            cancellation_id: cancellation.cancellation_id!,
            comment: decision.comment
          });
          results.approved++;
          console.log(`Автоматически подтверждена заявка ${cancellation.cancellation_id}`);
        } catch (error) {
          console.error(`Ошибка при подтверждении заявки ${cancellation.cancellation_id}:`, error);
        }
      } else if (decision.action === 'reject') {
        try {
          await this.client.cancellation.rejectConditionalCancellationV2({
            cancellation_id: cancellation.cancellation_id!,
            comment: decision.comment
          });
          results.rejected++;
          console.log(`Автоматически отклонена заявка ${cancellation.cancellation_id}`);
        } catch (error) {
          console.error(`Ошибка при отклонении заявки ${cancellation.cancellation_id}:`, error);
        }
      } else {
        results.requiresManualReview++;
        console.log(`Заявка ${cancellation.cancellation_id} требует ручного рассмотрения: ${decision.comment}`);
      }
    }

    return results;
  }

  private evaluateCancellation(cancellation: any): {
    action: 'approve' | 'reject' | 'manual';
    comment: string;
  } {
    const reason = cancellation.cancellation_reason?.name || '';
    const initiator = cancellation.cancellation_initiator;
    const autoApproveDate = cancellation.auto_approve_date ? new Date(cancellation.auto_approve_date) : null;
    
    // Правило 1: Автоматически подтверждать системные отмены
    if (initiator === 'SYSTEM') {
      return {
        action: 'approve',
        comment: 'Автоматическое подтверждение системной отмены'
      };
    }

    // Правило 2: Автоматически подтверждать отмены по качеству товара
    if (reason.includes('повреждён') || reason.includes('дефект') || reason.includes('брак')) {
      return {
        action: 'approve',
        comment: 'Подтверждено: проблемы с качеством товара'
      };
    }

    // Правило 3: Отклонять отмены после отправки
    if (reason.includes('передумал') || reason.includes('не подходит размер')) {
      return {
        action: 'reject',
        comment: 'Отклонено: товар уже отправлен, изменение решения после отправки'
      };
    }

    // Правило 4: Заявки с истекающим сроком требуют ручного рассмотрения
    if (autoApproveDate && autoApproveDate <= new Date(Date.now() + 2 * 60 * 60 * 1000)) { // 2 часа
      return {
        action: 'manual',
        comment: 'Требует срочного ручного рассмотрения - автоподтверждение через 2 часа'
      };
    }

    return {
      action: 'manual',
      comment: 'Требует индивидуального рассмотрения'
    };
  }

  private async getPendingCancellations() {
    const cancellations = await this.client.cancellation.getConditionalCancellationListV2({
      limit: 1000,
      filters: { state: 'ON_APPROVAL' }
    });

    return {
      items: cancellations.result || []
    };
  }
}

const processor = new CancellationProcessor(client);
const results = await processor.processAutomaticDecisions();

console.log(`Результаты автоматической обработки:`);
console.log(`Подтверждено: ${results.approved}`);
console.log(`Отклонено: ${results.rejected}`);
console.log(`Требует ручного рассмотрения: ${results.requiresManualReview}`);
```

### 3. Пакетная обработка с пагинацией

```typescript
async function processAllCancellations(
  client: OzonSellerApiClient,
  processor: (cancellations: any[]) => Promise<void>
) {
  let lastId: number | undefined;
  let totalProcessed = 0;
  const batchSize = 100;

  do {
    try {
      const response = await client.cancellation.getConditionalCancellationListV2({
        limit: batchSize,
        last_id: lastId,
        filters: { state: 'ON_APPROVAL' }
      });

      const cancellations = response.result || [];
      
      if (cancellations.length === 0) {
        break;
      }

      await processor(cancellations);
      totalProcessed += cancellations.length;
      
      lastId = response.last_id;
      
      console.log(`Обработано: ${totalProcessed} заявок`);
      
      // Пауза между запросами для соблюдения rate limits
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error('Ошибка при обработке заявок:', error);
      break;
    }
  } while (lastId);

  console.log(`Всего обработано: ${totalProcessed} заявок`);
}

// Использование
await processAllCancellations(client, async (cancellations) => {
  for (const cancellation of cancellations) {
    // Логика обработки каждой заявки
    console.log(`Обрабатывается заявка ${cancellation.cancellation_id}: ${cancellation.posting_number}`);
  }
});
```

## Обработка ошибок

### Типичные ошибки и их обработка

```typescript
try {
  await client.cancellation.approveConditionalCancellationV2({
    cancellation_id: 12345,
    comment: 'Подтверждаем отмену'
  });
} catch (error) {
  if (error.response?.status === 400) {
    const errorData = error.response.data;
    
    switch (errorData.code) {
      case 'CANCELLATION_NOT_FOUND':
        console.error('Заявка на отмену не найдена');
        break;
      case 'CANCELLATION_ALREADY_PROCESSED':
        console.error('Заявка уже обработана');
        break;
      case 'CANCELLATION_NOT_ON_APPROVAL':
        console.error('Заявка не находится в статусе ожидания рассмотрения');
        break;
      case 'INVALID_COMMENT':
        console.error('Некорректный комментарий');
        break;
      default:
        console.error('Неизвестная ошибка:', errorData.message);
    }
  } else if (error.response?.status === 429) {
    console.error('Превышен лимит запросов. Повторите попытку позже.');
  } else {
    console.error('Произошла ошибка:', error.message);
  }
}
```

### Retry-механизм для обработки временных ошибок

```typescript
async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      
      if (attempt === maxRetries) {
        throw lastError;
      }
      
      // Экспоненциальная задержка
      const retryDelay = delay * Math.pow(2, attempt - 1);
      console.log(`Попытка ${attempt} не удалась. Повтор через ${retryDelay}мс...`);
      await new Promise(resolve => setTimeout(resolve, retryDelay));
    }
  }
  
  throw lastError!;
}

// Использование с retry
await withRetry(async () => {
  return client.cancellation.getConditionalCancellationListV2({
    limit: 100,
    filters: { state: 'ON_APPROVAL' }
  });
}, 3, 1000);
```

## Лучшие практики

### 1. Мониторинг и алертинг

```typescript
class CancellationAlerting {
  constructor(private client: OzonSellerApiClient) {}

  // Проверка критических ситуаций
  async checkCriticalSituations() {
    const alerts = [];
    
    // Много заявок на рассмотрении
    const pendingCount = await this.getPendingCount();
    if (pendingCount > 50) {
      alerts.push({
        type: 'HIGH_PENDING_COUNT',
        message: `Высокое количество заявок на рассмотрении: ${pendingCount}`,
        severity: 'warning'
      });
    }
    
    // Заявки с истекающим сроком
    const expiringCount = await this.getExpiringCount();
    if (expiringCount > 0) {
      alerts.push({
        type: 'EXPIRING_CANCELLATIONS',
        message: `${expiringCount} заявок автоматически подтвердятся в ближайшие 2 часа`,
        severity: 'critical'
      });
    }

    return alerts;
  }

  private async getPendingCount(): Promise<number> {
    const response = await this.client.cancellation.getConditionalCancellationListV2({
      limit: 1,
      filters: { state: 'ON_APPROVAL' },
      with: { counter: true }
    });
    return response.counter || 0;
  }

  private async getExpiringCount(): Promise<number> {
    const response = await this.client.cancellation.getConditionalCancellationListV2({
      limit: 1000,
      filters: { state: 'ON_APPROVAL' }
    });
    
    const now = new Date();
    const twoHoursLater = new Date(now.getTime() + 2 * 60 * 60 * 1000);
    
    return (response.result || []).filter(cancellation => {
      if (!cancellation.auto_approve_date) return false;
      return new Date(cancellation.auto_approve_date) <= twoHoursLater;
    }).length;
  }
}
```

### 2. Логирование и аудит

```typescript
interface CancellationAuditLog {
  timestamp: string;
  cancellation_id: number;
  posting_number: string;
  action: 'approve' | 'reject';
  comment: string;
  processor: 'automatic' | 'manual';
  user_id?: string;
}

class CancellationAuditor {
  private auditLogs: CancellationAuditLog[] = [];
  
  async logDecision(
    cancellationId: number,
    postingNumber: string,
    action: 'approve' | 'reject',
    comment: string,
    processor: 'automatic' | 'manual',
    userId?: string
  ) {
    const log: CancellationAuditLog = {
      timestamp: new Date().toISOString(),
      cancellation_id: cancellationId,
      posting_number: postingNumber,
      action,
      comment,
      processor,
      user_id: userId
    };
    
    this.auditLogs.push(log);
    
    // Отправка в систему логирования
    console.log('Audit Log:', JSON.stringify(log));
  }
  
  generateReport(startDate: Date, endDate: Date) {
    const filteredLogs = this.auditLogs.filter(log => {
      const logDate = new Date(log.timestamp);
      return logDate >= startDate && logDate <= endDate;
    });
    
    return {
      total: filteredLogs.length,
      approved: filteredLogs.filter(log => log.action === 'approve').length,
      rejected: filteredLogs.filter(log => log.action === 'reject').length,
      automatic: filteredLogs.filter(log => log.processor === 'automatic').length,
      manual: filteredLogs.filter(log => log.processor === 'manual').length,
      logs: filteredLogs
    };
  }
}
```

---

**Связанные API:** Return API (обработка возвратов), Returns API (управление возвратами), Order API (управление заказами), FBS API (логистика)