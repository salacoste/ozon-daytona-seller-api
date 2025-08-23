# Delivery-RFBS API - Управление доставкой возвратной логистики FBS

Delivery-RFBS API предоставляет инструменты для управления возвратной логистикой FBS (Return Fulfillment by Seller), включая изменение статусов доставки, добавление трек-номеров и управление расписанием доставки.

## Обзор API

**Количество методов:** 8  
**Основные функции:** Управление статусами доставки, трекинг, перенос сроков доставки  
**Назначение:** Возвратная логистика FBS заказов

## Статусы доставки RFBS

```
Отправлено продавцом → Последняя миля → Доставляется → Доставлено
   (sent_by_seller)  →  (last_mile)  → (delivering) → (delivered)
```

## Методы API

### 1. Установка даты отгрузки

**Метод:** `setCutoff()`  
**Эндпоинт:** `POST /v1/posting/cutoff/set`

Уточняет дату отгрузки отправления для планирования логистики.

#### Параметры запроса

```typescript
interface DeliveryRfbsSetCutoffRequest {
  posting_number: string;          // Номер отправления
  cutoff_at: string;              // Дата отгрузки в ISO 8601
}
```

#### Пример использования

```typescript
import { OzonSellerApiClient } from '@spacechemical/ozon-seller-api';

const client = new OzonSellerApiClient({
  apiKey: 'your-api-key',
  clientId: 'your-client-id'
});

// Установить дату отгрузки
const result = await client.deliveryRfbs.setCutoff({
  posting_number: 'FBS-123456789',
  cutoff_at: '2024-01-15T10:00:00Z'
});

if (result.result) {
  console.log('✅ Дата отгрузки установлена');
}
```

### 2. Получение ограничений для переноса доставки

**Метод:** `getTimeslotChangeRestrictions()`  
**Эндпоинт:** `POST /v1/posting/fbs/timeslot/change-restrictions`

Возвращает доступные даты для переноса доставки и количество оставшихся переносов.

#### Пример использования

```typescript
// Получить ограничения для переноса
const restrictions = await client.deliveryRfbs.getTimeslotChangeRestrictions({
  posting_number: 'FBS-123456789'
});

if (restrictions.restrictions) {
  console.log('Доступные даты для переноса:');
  restrictions.restrictions.available_dates?.forEach(date => {
    console.log(`- ${date}`);
  });
  
  console.log(`Осталось переносов: ${restrictions.restrictions.available_reschedules}`);
  console.log(`Можно ли перенести: ${restrictions.restrictions.can_change ? 'Да' : 'Нет'}`);
}
```

### 3. Перенос даты доставки

**Метод:** `setTimeslot()`  
**Эндпоинт:** `POST /v1/posting/fbs/timeslot/set`

Переносит дату доставки на новую доступную дату.

#### Пример использования

```typescript
// Перенести дату доставки
const rescheduleResult = await client.deliveryRfbs.setTimeslot({
  posting_number: 'FBS-123456789',
  timeslot_date: '2024-01-25'
});

if (rescheduleResult.new_timeslot_date) {
  console.log(`✅ Доставка перенесена на: ${rescheduleResult.new_timeslot_date}`);
}
```

### 4. Добавление трек-номеров

**Метод:** `setTrackingNumbers()`  
**Эндпоинт:** `POST /v2/fbs/posting/tracking-number/set`

Добавляет трек-номера к отправлениям для отслеживания.

#### Параметры запроса

```typescript
interface DeliveryRfbsTrackingNumberSetRequest {
  tracking_numbers: Array<{
    posting_number: string;        // Номер отправления
    tracking_number: string;       // Трек-номер
    delivery_service: string;      // Служба доставки
  }>;
}
```

#### Пример использования

```typescript
// Добавить трек-номера к нескольким отправлениям
const trackingResult = await client.deliveryRfbs.setTrackingNumbers({
  tracking_numbers: [
    {
      posting_number: 'FBS-123456789',
      tracking_number: 'TRACK123456',
      delivery_service: 'CDEK'
    },
    {
      posting_number: 'FBS-987654321',
      tracking_number: 'TRACK789012',
      delivery_service: 'Russian Post'
    },
    {
      posting_number: 'FBS-555666777',
      tracking_number: 'TRACK345678',
      delivery_service: 'DPD'
    }
  ]
});

// Проверить результаты
trackingResult.results?.forEach(res => {
  if (res.result === 'success') {
    console.log(`✅ Трек-номер добавлен для ${res.posting_number}`);
  } else {
    console.error(`❌ Ошибка для ${res.posting_number}: ${res.error}`);
  }
});
```

## Методы изменения статусов доставки

### 5. Статус "Отправлено продавцом"

**Метод:** `setSentBySeller()`  
**Эндпоинт:** `POST /v2/fbs/posting/sent-by-seller`

Устанавливает статус "Отправлено продавцом" - первый статус в цепочке доставки.

#### Пример использования

```typescript
// Изменить статус на "Отправлено продавцом"
const sentResult = await client.deliveryRfbs.setSentBySeller({
  posting_number: 'FBS-123456789',
  sent_by_seller_at: '2024-01-15T12:00:00Z'
});

if (sentResult.posting_number) {
  console.log(`✅ Статус изменен на "Отправлено продавцом" для ${sentResult.posting_number}`);
}
```

### 6. Статус "Последняя миля"

**Метод:** `setLastMile()`  
**Эндпоинт:** `POST /v2/fbs/posting/last-mile`

Устанавливает статус "Последняя миля" - товар находится в пункте выдачи или у курьера.

#### Пример использования

```typescript
// Изменить статус на "Последняя миля"
const lastMileResult = await client.deliveryRfbs.setLastMile({
  posting_number: 'FBS-123456789',
  last_mile_at: '2024-01-19T14:00:00Z'
});

console.log(`✅ Начата последняя миля для ${lastMileResult.posting_number}`);
```

### 7. Статус "Доставляется"

**Метод:** `setDelivering()`  
**Эндпоинт:** `POST /v2/fbs/posting/delivering`

Устанавливает статус "Доставляется" - товар находится в процессе доставки покупателю.

#### Пример использования

```typescript
// Изменить статус на "Доставляется"
const deliveringResult = await client.deliveryRfbs.setDelivering({
  posting_number: 'FBS-123456789',
  delivering_at: '2024-01-20T09:00:00Z'
});

console.log(`✅ Начата доставка для ${deliveringResult.posting_number}`);
```

### 8. Статус "Доставлено"

**Метод:** `setDelivered()`  
**Эндпоинт:** `POST /v2/fbs/posting/delivered`

Устанавливает финальный статус "Доставлено" - товар успешно доставлен покупателю.

#### Пример использования

```typescript
// Изменить статус на "Доставлено"
const deliveredResult = await client.deliveryRfbs.setDelivered({
  posting_number: 'FBS-123456789',
  delivered_at: '2024-01-20T15:30:00Z'
});

console.log(`✅ Доставка завершена для ${deliveredResult.posting_number}`);
```

## Практические сценарии использования

### 1. Полный цикл управления доставкой

```typescript
class RfbsDeliveryManager {
  constructor(private client: OzonSellerApiClient) {}

  async manageFullDeliveryFlow(
    postingNumber: string,
    trackingNumber: string,
    deliveryService: string
  ) {
    console.log(`🚀 Начинаем управление доставкой ${postingNumber}`);

    try {
      // 1. Установить дату отгрузки
      await this.client.deliveryRfbs.setCutoff({
        posting_number: postingNumber,
        cutoff_at: new Date().toISOString()
      });
      console.log('✅ Дата отгрузки установлена');

      // 2. Добавить трек-номер
      const trackingResult = await this.client.deliveryRfbs.setTrackingNumbers({
        tracking_numbers: [{
          posting_number: postingNumber,
          tracking_number: trackingNumber,
          delivery_service: deliveryService
        }]
      });

      const trackingSuccess = trackingResult.results?.some(r => r.result === 'success');
      if (trackingSuccess) {
        console.log('✅ Трек-номер добавлен');
      }

      // 3. Установить статус "Отправлено продавцом"
      await this.client.deliveryRfbs.setSentBySeller({
        posting_number: postingNumber,
        sent_by_seller_at: new Date().toISOString()
      });
      console.log('✅ Статус: Отправлено продавцом');

      // Имитация времени в пути
      console.log('⏳ Ожидаем поступления в пункт выдачи...');

      // 4. Статус "Последняя миля" (обычно через 1-3 дня)
      const lastMileDate = new Date();
      lastMileDate.setDate(lastMileDate.getDate() + 2);
      
      setTimeout(async () => {
        await this.client.deliveryRfbs.setLastMile({
          posting_number: postingNumber,
          last_mile_at: lastMileDate.toISOString()
        });
        console.log('✅ Статус: Последняя миля');
      }, 2000);

      // 5. Статус "Доставляется" (день доставки)
      const deliveringDate = new Date();
      deliveringDate.setDate(deliveringDate.getDate() + 3);
      
      setTimeout(async () => {
        await this.client.deliveryRfbs.setDelivering({
          posting_number: postingNumber,
          delivering_at: deliveringDate.toISOString()
        });
        console.log('✅ Статус: Доставляется');
      }, 4000);

      // 6. Статус "Доставлено" (после получения покупателем)
      const deliveredDate = new Date();
      deliveredDate.setDate(deliveredDate.getDate() + 3);
      deliveredDate.setHours(deliveredDate.getHours() + 4);
      
      setTimeout(async () => {
        await this.client.deliveryRfbs.setDelivered({
          posting_number: postingNumber,
          delivered_at: deliveredDate.toISOString()
        });
        console.log('🎉 Доставка завершена успешно!');
      }, 6000);

      return {
        postingNumber,
        trackingNumber,
        status: 'processing'
      };

    } catch (error) {
      console.error(`❌ Ошибка в управлении доставкой ${postingNumber}:`, error);
      throw error;
    }
  }

  // Управление переносом доставки по запросу покупателя
  async handleDeliveryReschedule(postingNumber: string, preferredDate: string) {
    console.log(`📅 Обработка запроса на перенос доставки ${postingNumber}`);

    try {
      // Получить доступные даты для переноса
      const restrictions = await this.client.deliveryRfbs.getTimeslotChangeRestrictions({
        posting_number: postingNumber
      });

      if (!restrictions.restrictions?.can_change) {
        return {
          success: false,
          reason: 'Перенос недоступен',
          remainingReschedules: restrictions.restrictions?.available_reschedules || 0
        };
      }

      // Проверить, доступна ли предпочтительная дата
      const availableDates = restrictions.restrictions.available_dates || [];
      const isDateAvailable = availableDates.includes(preferredDate);

      if (!isDateAvailable) {
        return {
          success: false,
          reason: 'Выбранная дата недоступна',
          availableDates,
          remainingReschedules: restrictions.restrictions.available_reschedules || 0
        };
      }

      // Выполнить перенос
      const rescheduleResult = await this.client.deliveryRfbs.setTimeslot({
        posting_number: postingNumber,
        timeslot_date: preferredDate
      });

      return {
        success: true,
        newDate: rescheduleResult.new_timeslot_date,
        remainingReschedules: (restrictions.restrictions.available_reschedules || 1) - 1
      };

    } catch (error) {
      console.error(`❌ Ошибка переноса доставки ${postingNumber}:`, error);
      return {
        success: false,
        reason: 'Техническая ошибка',
        error: error.message
      };
    }
  }
}

// Использование
const deliveryManager = new RfbsDeliveryManager(client);

// Полный цикл доставки
const delivery = await deliveryManager.manageFullDeliveryFlow(
  'FBS-123456789',
  'TRACK123456',
  'CDEK'
);

// Перенос доставки
const reschedule = await deliveryManager.handleDeliveryReschedule(
  'FBS-123456789',
  '2024-01-25'
);

if (reschedule.success) {
  console.log(`✅ Доставка перенесена на ${reschedule.newDate}`);
  console.log(`Осталось переносов: ${reschedule.remainingReschedules}`);
} else {
  console.log(`❌ Не удалось перенести: ${reschedule.reason}`);
}
```

### 2. Массовое управление доставками

```typescript
class BulkDeliveryProcessor {
  constructor(private client: OzonSellerApiClient) {}

  // Массовое добавление трек-номеров
  async addMultipleTrackingNumbers(
    trackingData: Array<{
      postingNumber: string;
      trackingNumber: string;
      deliveryService: string;
    }>
  ) {
    const BATCH_SIZE = 100; // Максимум за один запрос
    const results = [];
    const errors = [];

    for (let i = 0; i < trackingData.length; i += BATCH_SIZE) {
      const batch = trackingData.slice(i, i + BATCH_SIZE);
      
      try {
        const batchRequest = {
          tracking_numbers: batch.map(item => ({
            posting_number: item.postingNumber,
            tracking_number: item.trackingNumber,
            delivery_service: item.deliveryService
          }))
        };

        const result = await this.client.deliveryRfbs.setTrackingNumbers(batchRequest);
        
        result.results?.forEach(res => {
          if (res.result === 'success') {
            results.push(res.posting_number);
          } else {
            errors.push({
              postingNumber: res.posting_number,
              error: res.error
            });
          }
        });

        console.log(`📦 Обработан батч ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(trackingData.length / BATCH_SIZE)}`);
        
        // Пауза между батчами
        if (i + BATCH_SIZE < trackingData.length) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }

      } catch (error) {
        console.error(`❌ Ошибка в батче ${Math.floor(i / BATCH_SIZE) + 1}:`, error);
        batch.forEach(item => {
          errors.push({
            postingNumber: item.postingNumber,
            error: error.message
          });
        });
      }
    }

    return {
      totalProcessed: trackingData.length,
      successCount: results.length,
      errorCount: errors.length,
      successfulPostings: results,
      errors
    };
  }

  // Массовое изменение статусов
  async bulkStatusUpdate(
    postingNumbers: string[],
    status: 'sent_by_seller' | 'last_mile' | 'delivering' | 'delivered',
    timestamp?: string
  ) {
    const results = [];
    const errors = [];
    const updateTime = timestamp || new Date().toISOString();

    console.log(`🔄 Массовое изменение статуса на "${status}" для ${postingNumbers.length} отправлений`);

    for (const postingNumber of postingNumbers) {
      try {
        let result;

        switch (status) {
          case 'sent_by_seller':
            result = await this.client.deliveryRfbs.setSentBySeller({
              posting_number: postingNumber,
              sent_by_seller_at: updateTime
            });
            break;

          case 'last_mile':
            result = await this.client.deliveryRfbs.setLastMile({
              posting_number: postingNumber,
              last_mile_at: updateTime
            });
            break;

          case 'delivering':
            result = await this.client.deliveryRfbs.setDelivering({
              posting_number: postingNumber,
              delivering_at: updateTime
            });
            break;

          case 'delivered':
            result = await this.client.deliveryRfbs.setDelivered({
              posting_number: postingNumber,
              delivered_at: updateTime
            });
            break;
        }

        if (result?.posting_number) {
          results.push(postingNumber);
          console.log(`✅ ${postingNumber}: статус обновлен`);
        }

      } catch (error) {
        errors.push({
          postingNumber,
          error: error.message
        });
        console.error(`❌ ${postingNumber}: ${error.message}`);
      }

      // Пауза между запросами для соблюдения лимитов
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    return {
      status,
      totalPostings: postingNumbers.length,
      successCount: results.length,
      errorCount: errors.length,
      successfulPostings: results,
      errors
    };
  }

  // Автоматическое продвижение статусов по расписанию
  async scheduleStatusProgression(
    postingNumber: string,
    trackingNumber: string,
    deliveryService: string,
    schedule: {
      sentBySellerDelay?: number;    // минуты до "Отправлено продавцом"
      lastMileDelay?: number;        // минуты до "Последняя миля"
      deliveringDelay?: number;      // минуты до "Доставляется"
      deliveredDelay?: number;       // минуты до "Доставлено"
    } = {}
  ) {
    const defaultSchedule = {
      sentBySellerDelay: 0,          // сразу
      lastMileDelay: 2880,           // через 2 дня
      deliveringDelay: 4320,         // через 3 дня  
      deliveredDelay: 4440,          // через 3 дня 2 часа
      ...schedule
    };

    console.log(`⏰ Запланировано автоматическое продвижение для ${postingNumber}`);

    // Добавить трек-номер
    await this.client.deliveryRfbs.setTrackingNumbers({
      tracking_numbers: [{
        posting_number: postingNumber,
        tracking_number: trackingNumber,
        delivery_service: deliveryService
      }]
    });

    // Запланировать статусы
    const baseTime = Date.now();

    if (defaultSchedule.sentBySellerDelay === 0) {
      // Сразу установить "Отправлено продавцом"
      await this.client.deliveryRfbs.setSentBySeller({
        posting_number: postingNumber,
        sent_by_seller_at: new Date().toISOString()
      });
      console.log(`✅ ${postingNumber}: Отправлено продавцом`);
    } else {
      setTimeout(async () => {
        await this.client.deliveryRfbs.setSentBySeller({
          posting_number: postingNumber,
          sent_by_seller_at: new Date().toISOString()
        });
        console.log(`✅ ${postingNumber}: Отправлено продавцом`);
      }, defaultSchedule.sentBySellerDelay * 60 * 1000);
    }

    // Последняя миля
    setTimeout(async () => {
      await this.client.deliveryRfbs.setLastMile({
        posting_number: postingNumber,
        last_mile_at: new Date().toISOString()
      });
      console.log(`✅ ${postingNumber}: Последняя миля`);
    }, defaultSchedule.lastMileDelay * 60 * 1000);

    // Доставляется
    setTimeout(async () => {
      await this.client.deliveryRfbs.setDelivering({
        posting_number: postingNumber,
        delivering_at: new Date().toISOString()
      });
      console.log(`✅ ${postingNumber}: Доставляется`);
    }, defaultSchedule.deliveringDelay * 60 * 1000);

    // Доставлено
    setTimeout(async () => {
      await this.client.deliveryRfbs.setDelivered({
        posting_number: postingNumber,
        delivered_at: new Date().toISOString()
      });
      console.log(`🎉 ${postingNumber}: Доставлено!`);
    }, defaultSchedule.deliveredDelay * 60 * 1000);

    return {
      postingNumber,
      trackingNumber,
      scheduled: true,
      timeline: {
        sentBySeller: new Date(baseTime + defaultSchedule.sentBySellerDelay * 60 * 1000),
        lastMile: new Date(baseTime + defaultSchedule.lastMileDelay * 60 * 1000),
        delivering: new Date(baseTime + defaultSchedule.deliveringDelay * 60 * 1000),
        delivered: new Date(baseTime + defaultSchedule.deliveredDelay * 60 * 1000)
      }
    };
  }
}

// Использование пакетного процессора
const bulkProcessor = new BulkDeliveryProcessor(client);

// Массовое добавление трек-номеров
const trackingData = [
  {
    postingNumber: 'FBS-123456789',
    trackingNumber: 'TRACK123456',
    deliveryService: 'CDEK'
  },
  {
    postingNumber: 'FBS-987654321',
    trackingNumber: 'TRACK789012',
    deliveryService: 'Russian Post'
  }
  // ... еще данные
];

const trackingResults = await bulkProcessor.addMultipleTrackingNumbers(trackingData);
console.log(`📊 Трек-номера: успешно ${trackingResults.successCount}, ошибок ${trackingResults.errorCount}`);

// Массовое изменение статусов на "Отправлено продавцом"
const postingNumbers = ['FBS-123456789', 'FBS-987654321', 'FBS-555666777'];
const statusResults = await bulkProcessor.bulkStatusUpdate(
  postingNumbers,
  'sent_by_seller'
);

console.log(`📊 Статусы обновлены: ${statusResults.successCount}/${statusResults.totalPostings}`);
```

### 3. Система мониторинга доставок

```typescript
class DeliveryMonitor {
  constructor(private client: OzonSellerApiClient) {}

  // Мониторинг переносов доставки
  async monitorRescheduleRequests(postingNumbers: string[]) {
    const rescheduleInfo = [];

    for (const postingNumber of postingNumbers) {
      try {
        const restrictions = await this.client.deliveryRfbs.getTimeslotChangeRestrictions({
          posting_number: postingNumber
        });

        if (restrictions.restrictions) {
          rescheduleInfo.push({
            postingNumber,
            canChange: restrictions.restrictions.can_change,
            availableReschedules: restrictions.restrictions.available_reschedules,
            availableDates: restrictions.restrictions.available_dates,
            status: 'active'
          });
        }

      } catch (error) {
        rescheduleInfo.push({
          postingNumber,
          canChange: false,
          availableReschedules: 0,
          availableDates: [],
          status: 'error',
          error: error.message
        });
      }

      // Пауза между запросами
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    return rescheduleInfo;
  }

  // Автоматический перенос доставок при критических ситуациях
  async autoRescheduleOnEmergency(
    emergencyPostings: Array<{
      postingNumber: string;
      reason: string;
      urgency: 'low' | 'medium' | 'high';
    }>
  ) {
    const rescheduledPostings = [];
    const failedReschedules = [];

    for (const emergency of emergencyPostings) {
      try {
        // Получить доступные даты
        const restrictions = await this.client.deliveryRfbs.getTimeslotChangeRestrictions({
          posting_number: emergency.postingNumber
        });

        if (!restrictions.restrictions?.can_change || 
            !restrictions.restrictions.available_dates ||
            restrictions.restrictions.available_dates.length === 0) {
          failedReschedules.push({
            ...emergency,
            reason: 'Нет доступных дат для переноса'
          });
          continue;
        }

        // Выбрать дату в зависимости от срочности
        let targetDate: string;
        const availableDates = restrictions.restrictions.available_dates;

        switch (emergency.urgency) {
          case 'high':
            // Ближайшая дата
            targetDate = availableDates[0];
            break;
          case 'medium':
            // Вторая доступная дата или первая, если только одна
            targetDate = availableDates[1] || availableDates[0];
            break;
          case 'low':
            // Последняя доступная дата
            targetDate = availableDates[availableDates.length - 1];
            break;
        }

        // Выполнить перенос
        const rescheduleResult = await this.client.deliveryRfbs.setTimeslot({
          posting_number: emergency.postingNumber,
          timeslot_date: targetDate
        });

        rescheduledPostings.push({
          ...emergency,
          oldDate: 'unknown', // API не возвращает старую дату
          newDate: rescheduleResult.new_timeslot_date,
          rescheduledAt: new Date().toISOString()
        });

        console.log(`✅ Автоперенос ${emergency.postingNumber}: ${emergency.urgency} → ${rescheduleResult.new_timeslot_date}`);

      } catch (error) {
        failedReschedules.push({
          ...emergency,
          reason: error.message
        });
        console.error(`❌ Не удалось перенести ${emergency.postingNumber}: ${error.message}`);
      }

      // Пауза между операциями
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return {
      totalEmergencies: emergencyPostings.length,
      rescheduledCount: rescheduledPostings.length,
      failedCount: failedReschedules.length,
      rescheduled: rescheduledPostings,
      failed: failedReschedules
    };
  }

  // Отчет по доставкам за период
  async generateDeliveryReport(deliveryData: Array<{
    postingNumber: string;
    trackingNumber?: string;
    deliveryService?: string;
    currentStatus: string;
    statusHistory: Array<{
      status: string;
      timestamp: string;
    }>;
  }>) {
    const report = {
      totalDeliveries: deliveryData.length,
      statusBreakdown: new Map<string, number>(),
      averageDeliveryTime: 0,
      serviceBreakdown: new Map<string, number>(),
      completedDeliveries: 0,
      pendingDeliveries: 0
    };

    deliveryData.forEach(delivery => {
      // Подсчет по текущим статусам
      const count = report.statusBreakdown.get(delivery.currentStatus) || 0;
      report.statusBreakdown.set(delivery.currentStatus, count + 1);

      // Подсчет по службам доставки
      if (delivery.deliveryService) {
        const serviceCount = report.serviceBreakdown.get(delivery.deliveryService) || 0;
        report.serviceBreakdown.set(delivery.deliveryService, serviceCount + 1);
      }

      // Подсчет завершенных и ожидающих
      if (delivery.currentStatus === 'delivered') {
        report.completedDeliveries++;

        // Подсчет времени доставки
        const sentStatus = delivery.statusHistory.find(s => s.status === 'sent_by_seller');
        const deliveredStatus = delivery.statusHistory.find(s => s.status === 'delivered');
        
        if (sentStatus && deliveredStatus) {
          const sentTime = new Date(sentStatus.timestamp).getTime();
          const deliveredTime = new Date(deliveredStatus.timestamp).getTime();
          const deliveryTimeHours = (deliveredTime - sentTime) / (1000 * 60 * 60);
          
          report.averageDeliveryTime += deliveryTimeHours;
        }
      } else {
        report.pendingDeliveries++;
      }
    });

    // Среднее время доставки
    if (report.completedDeliveries > 0) {
      report.averageDeliveryTime = Math.round(
        (report.averageDeliveryTime / report.completedDeliveries) * 10
      ) / 10;
    }

    return report;
  }
}

const monitor = new DeliveryMonitor(client);

// Мониторинг возможностей переноса
const postingsToCheck = ['FBS-123456789', 'FBS-987654321'];
const rescheduleInfo = await monitor.monitorRescheduleRequests(postingsToCheck);

rescheduleInfo.forEach(info => {
  console.log(`${info.postingNumber}: переносов доступно ${info.availableReschedules}`);
  if (info.availableDates && info.availableDates.length > 0) {
    console.log(`  Доступные даты: ${info.availableDates.join(', ')}`);
  }
});

// Экстренный перенос доставок
const emergencies = [
  {
    postingNumber: 'FBS-123456789',
    reason: 'Повреждение товара, требуется замена',
    urgency: 'high' as const
  },
  {
    postingNumber: 'FBS-987654321', 
    reason: 'Задержка на складе',
    urgency: 'medium' as const
  }
];

const emergencyReschedule = await monitor.autoRescheduleOnEmergency(emergencies);
console.log(`🚨 Экстренных переносов: ${emergencyReschedule.rescheduledCount}/${emergencyReschedule.totalEmergencies}`);
```

## Обработка ошибок

### Типичные ошибки и их обработка

```typescript
try {
  const result = await client.deliveryRfbs.setDelivered({
    posting_number: 'FBS-123456789',
    delivered_at: '2024-01-20T15:30:00Z'
  });
} catch (error) {
  if (error.response?.status === 400) {
    const errorData = error.response.data;
    
    switch (errorData.code) {
      case 'POSTING_NOT_FOUND':
        console.error('Отправление не найдено');
        break;
      case 'INVALID_STATUS_TRANSITION':
        console.error('Неверный переход статуса. Проверьте текущий статус отправления');
        break;
      case 'INVALID_DELIVERY_DATE':
        console.error('Некорректная дата доставки');
        break;
      case 'TRACKING_NUMBER_ALREADY_EXISTS':
        console.error('Трек-номер уже привязан к другому отправлению');
        break;
      case 'NO_RESCHEDULE_AVAILABLE':
        console.error('Перенос недоступен или исчерпаны попытки');
        break;
      default:
        console.error('Неизвестная ошибка:', errorData.message);
    }
  } else if (error.response?.status === 422) {
    console.error('Ошибка валидации данных:', error.response.data);
  } else if (error.response?.status === 429) {
    console.error('Превышен лимит запросов. Повторите попытку позже.');
  } else {
    console.error('Произошла ошибка:', error.message);
  }
}
```

## Лучшие практики

### 1. Корректная последовательность статусов

```typescript
// Всегда соблюдайте правильную последовательность статусов
const statusFlow = [
  'sent_by_seller',
  'last_mile', 
  'delivering',
  'delivered'
];

// Никогда не пропускайте промежуточные статусы
const updateStatusSequentially = async (postingNumber: string) => {
  // ❌ Неправильно - пропускаем статусы
  // await client.deliveryRfbs.setDelivered({...});
  
  // ✅ Правильно - последовательно
  await client.deliveryRfbs.setSentBySeller({
    posting_number: postingNumber,
    sent_by_seller_at: new Date().toISOString()
  });
  
  // Ждем реального времени в пути
  await new Promise(resolve => setTimeout(resolve, 60000)); // 1 минута для примера
  
  await client.deliveryRfbs.setLastMile({
    posting_number: postingNumber,
    last_mile_at: new Date().toISOString()
  });
  
  // И так далее...
};
```

### 2. Управление трек-номерами

```typescript
// Централизованное управление трек-номерами
class TrackingManager {
  private trackingCache = new Map<string, string>();

  async addTrackingNumber(postingNumber: string, trackingNumber: string, deliveryService: string) {
    // Проверить, не добавлен ли уже трек-номер
    if (this.trackingCache.has(postingNumber)) {
      console.log(`Трек-номер для ${postingNumber} уже добавлен`);
      return this.trackingCache.get(postingNumber);
    }

    const result = await client.deliveryRfbs.setTrackingNumbers({
      tracking_numbers: [{
        posting_number: postingNumber,
        tracking_number: trackingNumber,
        delivery_service: deliveryService
      }]
    });

    if (result.results?.[0]?.result === 'success') {
      this.trackingCache.set(postingNumber, trackingNumber);
      return trackingNumber;
    }

    throw new Error(`Не удалось добавить трек-номер для ${postingNumber}`);
  }
}
```

### 3. Соблюдение лимитов API

```typescript
// Используйте очереди запросов для соблюдения лимитов
class RequestQueue {
  private queue: Array<() => Promise<any>> = [];
  private processing = false;
  private readonly DELAY_MS = 500; // Задержка между запросами

  async enqueue<T>(requestFn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await requestFn();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });

      if (!this.processing) {
        this.processQueue();
      }
    });
  }

  private async processQueue() {
    if (this.processing || this.queue.length === 0) return;

    this.processing = true;

    while (this.queue.length > 0) {
      const request = this.queue.shift()!;
      await request();
      
      if (this.queue.length > 0) {
        await new Promise(resolve => setTimeout(resolve, this.DELAY_MS));
      }
    }

    this.processing = false;
  }
}
```

---

**Связанные API:** Delivery-FBS API (основная доставка), FBS API (управление заказами), Return API (управление возвратами)