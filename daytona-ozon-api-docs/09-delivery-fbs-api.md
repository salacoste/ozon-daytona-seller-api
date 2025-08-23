# Delivery-FBS API - Управление доставкой и отгрузками FBS

Delivery-FBS API предоставляет полный набор инструментов для управления процессом доставки FBS (Fulfillment by Seller), включая создание отгрузок, управление документооборотом, получение штрихкодов и отслеживание статусов.

## Обзор API

**Количество методов:** 18  
**Основные функции:** Создание и управление отгрузками, документооборот, штрихкоды, этикетки  
**Особенности:** Некоторые методы недоступны для продавцов из СНГ

⚠️ **Важно:** Для продавцов из СНГ недоступен метод изменения состава отгрузки.

## Жизненный цикл отгрузки FBS

```
Создание отгрузки → Подтверждение → Формирование документов → Отгрузка → Завершение
      (new)       →   (formed)   →      (confirmed)       → (shipped) → (completed)
```

## Основные группы методов

### 1. Управление отгрузками (6 методов)
- Создание, подтверждение, отмена отгрузок
- Получение информации и списков отгрузок
- Изменение состава отгрузки

### 2. Документооборот и штрихкоды (9 методов) 
- Создание и получение актов
- Формирование штрихкодов и этикеток
- Проверка статусов документов

### 3. Специальные операции (3 метода)
- Разделение отправлений
- Цифровые акты
- Доступные перевозки

## Методы управления отгрузками

### 1. Создание отгрузки

**Метод:** `createCarriage()`  
**Эндпоинт:** `POST /v1/carriage/create`

Создает первую FBS отгрузку, в которую автоматически попадают все отправления со статусом «Готов к отгрузке».

#### Параметры запроса

```typescript
interface DeliveryFbsCarriageCreateRequest {
  delivery_method_id: number;      // ID метода доставки
  first_mile_from_time: string;    // Время начала приёма (HH:mm)
  first_mile_to_time: string;      // Время окончания приёма (HH:mm)
  comment?: string;                // Комментарий к отгрузке
}
```

#### Пример использования

```typescript
import { OzonSellerApiClient } from '@spacechemical/ozon-seller-api';

const client = new OzonSellerApiClient({
  apiKey: 'your-api-key',
  clientId: 'your-client-id'
});

// Создать новую отгрузку
const carriage = await client.deliveryFbs.createCarriage({
  delivery_method_id: 123,
  first_mile_from_time: '09:00',
  first_mile_to_time: '18:00',
  comment: 'Отгрузка заказов за 15.12.2024'
});

if (carriage.result?.carriage_id) {
  console.log(`✅ Отгрузка создана с ID: ${carriage.result.carriage_id}`);
  console.log(`Статус: ${carriage.result.status}`); // "new"
  console.log(`Отправлений: ${carriage.result.postings_count}`);
} else {
  console.log('❌ Не удалось создать отгрузку');
}
```

### 2. Подтверждение отгрузки

**Метод:** `approveCarriage()`  
**Эндпоинт:** `POST /v1/carriage/approve`

Подтверждает отгрузку и переводит её в статус «Сформирована». После подтверждения можно получить документы.

#### Пример использования

```typescript
// Подтвердить отгрузку
const approvalResult = await client.deliveryFbs.approveCarriage({
  carriage_id: 12345
});

if (approvalResult.result) {
  console.log('✅ Отгрузка подтверждена и сформирована');
  
  // Теперь можно создать документы
  const documents = await client.deliveryFbs.createAct({
    carriage_id: 12345,
    posting_number: ['12345-0001-1', '12345-0002-1']
  });
  
  if (documents.result) {
    console.log(`📄 Документы созданы, ID акта: ${documents.act_id}`);
  }
}
```

### 3. Получение информации об отгрузке

**Метод:** `getCarriage()`  
**Эндпоинт:** `POST /v1/carriage/get`

Возвращает подробную информацию о конкретной отгрузке.

#### Пример использования

```typescript
// Получить информацию об отгрузке
const carriageInfo = await client.deliveryFbs.getCarriage({
  carriage_id: 12345
});

if (carriageInfo.result) {
  const carriage = carriageInfo.result;
  console.log(`Статус отгрузки: ${carriage.status}`);
  console.log(`Создана: ${new Date(carriage.created_at!).toLocaleString()}`);
  console.log(`Отправлений: ${carriage.postings_count}`);
  console.log(`Метод доставки: ${carriage.delivery_method?.name}`);
  console.log(`Время приёма: ${carriage.first_mile_from_time} - ${carriage.first_mile_to_time}`);
}
```

### 4. Список отгрузок по методам доставки

**Метод:** `getCarriageDeliveryList()`  
**Эндпоинт:** `POST /v1/carriage/delivery/list`

Возвращает список созданных отгрузок для каждого метода доставки.

#### Пример использования

```typescript
// Получить список отгрузок
const deliveryList = await client.deliveryFbs.getCarriageDeliveryList({
  status: 'new',  // новые отгрузки
  limit: 50
});

console.log('📋 Список отгрузок по методам доставки:');
deliveryList.result?.forEach(item => {
  console.log(`\nМетод доставки: ${item.delivery_method?.name} (ID: ${item.delivery_method?.id})`);
  
  if (item.carriages && item.carriages.length > 0) {
    item.carriages.forEach(carriage => {
      console.log(`  - Отгрузка ${carriage.carriage_id}: ${carriage.status}`);
      console.log(`    Отправлений: ${carriage.postings_count}, создана: ${carriage.created_at}`);
    });
  } else {
    console.log('  Нет отгрузок');
  }
});
```

### 5. Изменение состава отгрузки

**Метод:** `setPostings()`  
**Эндпоинт:** `POST /v1/carriage/set-postings`

⚠️ **Ограничение:** Недоступно для продавцов из СНГ.

Полностью перезаписывает список заказов в отгрузке.

#### Пример использования

```typescript
// Изменить состав отгрузки (только для продавцов не из СНГ)
try {
  const result = await client.deliveryFbs.setPostings({
    carriage_id: 12345,
    posting_number: ['12345-0001-1', '12345-0003-1', '12345-0005-1']
  });

  if (result.result) {
    console.log('✅ Состав отгрузки изменён');
  }
} catch (error) {
  if (error.response?.status === 403) {
    console.log('⚠️ Изменение состава недоступно для продавцов из СНГ');
  }
}
```

### 6. Отмена отгрузки

**Метод:** `cancelCarriage()`  
**Эндпоинт:** `POST /v1/carriage/cancel`

Удаляет отгрузку. Возможно только до подтверждения.

#### Пример использования

```typescript
// Отменить отгрузку
const cancelResult = await client.deliveryFbs.cancelCarriage({
  carriage_id: 12345
});

if (cancelResult.result) {
  console.log('✅ Отгрузка отменена');
}
```

## Методы работы с документами и штрихкодами

### 7. Создание документов отгрузки

**Метод:** `createAct()`  
**Эндпоинт:** `POST /v2/posting/fbs/act/create`

Подтверждает отгрузку и запускает формирование транспортной накладной и штрихкода.

#### Пример использования

```typescript
// Создать документы для отгрузки
const actResult = await client.deliveryFbs.createAct({
  carriage_id: 12345,
  posting_number: ['12345-0001-1', '12345-0002-1', '12345-0003-1']
});

if (actResult.result) {
  console.log(`📄 Акт создан с ID: ${actResult.act_id}`);
  
  // Проверить статус формирования документов
  const status = await client.deliveryFbs.checkActStatus({
    carriage_id: 12345
  });
  
  console.log(`Статус отгрузки: ${status.carriage_status}`);
  console.log(`Статус штрихкода: ${status.barcode_status}`);
}
```

### 8. Проверка статуса документов

**Метод:** `checkActStatus()`  
**Эндпоинт:** `POST /v2/posting/fbs/act/check-status`

Возвращает статус формирования штрихкода и документов отгрузки.

#### Пример использования

```typescript
// Проверить статус документов
const status = await client.deliveryFbs.checkActStatus({
  carriage_id: 12345
});

console.log(`Статус отгрузки: ${status.carriage_status}`);
console.log(`Статус штрихкода: ${status.barcode_status}`);

if (status.documents && status.documents.length > 0) {
  console.log('Статус документов:');
  status.documents.forEach(doc => {
    console.log(`  ${doc.type}: ${doc.status}`);
    if (doc.error_message) {
      console.log(`    Ошибка: ${doc.error_message}`);
    }
  });
}

// Если все готово - получить документы
if (status.barcode_status === 'ready' && status.carriage_status === 'confirmed') {
  console.log('✅ Документы и штрихкод готовы для загрузки');
}
```

### 9. Получение штрихкода отгрузки

**Метод:** `getBarcode()`  
**Эндпоинт:** `POST /v2/posting/fbs/act/get-barcode`

Возвращает штрихкод в виде изображения (base64) для отгрузки.

#### Пример использования

```typescript
// Получить штрихкод отгрузки
const barcode = await client.deliveryFbs.getBarcode({
  carriage_id: 12345
});

if (barcode.barcode) {
  console.log(`📊 Получен штрихкод: ${barcode.content_type}`);
  
  // Сохранить изображение штрихкода
  const fs = require('fs');
  const barcodeBuffer = Buffer.from(barcode.barcode, 'base64');
  fs.writeFileSync(`barcode-${12345}.png`, barcodeBuffer);
  
  console.log('✅ Штрихкод сохранён в файл');
}
```

### 10. Получение текста штрихкода

**Метод:** `getBarcodeText()`  
**Эндпоинт:** `POST /v2/posting/fbs/act/get-barcode/text`

Возвращает штрихкод в текстовом виде.

#### Пример использования

```typescript
// Получить текст штрихкода
const barcodeText = await client.deliveryFbs.getBarcodeText({
  carriage_id: 12345
});

if (barcodeText.barcode_text) {
  console.log(`🏷️ Штрихкод: ${barcodeText.barcode_text}`);
  
  // Можно использовать для печати или отображения
  console.log('Покажите этот код в пункте выдачи:');
  console.log(`******************`);
  console.log(`* ${barcodeText.barcode_text} *`);
  console.log(`******************`);
}
```

### 11. Получение документов отгрузки

**Метод:** `getAct()`  
**Эндпоинт:** `POST /v2/posting/fbs/act/get-pdf`

Возвращает PDF с документами отгрузки (лист отгрузки и транспортная накладная).

#### Пример использования

```typescript
// Получить документы отгрузки
const documents = await client.deliveryFbs.getAct({
  carriage_id: 12345,
  doc_type: 'act'  // или 'transport_waybill'
});

if (documents.content) {
  console.log(`📄 Получен документ: ${documents.filename}`);
  console.log(`Тип содержимого: ${documents.content_type}`);
  
  // Сохранить PDF файл
  const fs = require('fs');
  const docBuffer = Buffer.from(documents.content, 'base64');
  fs.writeFileSync(documents.filename!, docBuffer);
  
  console.log('✅ Документ сохранён в файл');
}
```

### 12. Этикетки для грузовых мест

**Метод:** `getContainerLabels()`  
**Эндпоинт:** `POST /v2/posting/fbs/act/get-container-labels`

Создает этикетки для грузовых мест в отгрузке.

#### Пример использования

```typescript
// Получить этикетки для контейнеров
const labels = await client.deliveryFbs.getContainerLabels({
  carriage_id: 12345,
  container_numbers: ['CONT001', 'CONT002', 'CONT003']
});

if (labels.content) {
  console.log(`🏷️ Получены этикетки: ${labels.content_type}`);
  
  // Сохранить PDF с этикетками
  const fs = require('fs');
  const labelsBuffer = Buffer.from(labels.content, 'base64');
  fs.writeFileSync(`labels-${12345}.pdf`, labelsBuffer);
  
  console.log('✅ Этикетки сохранены в файл');
}
```

## Практические сценарии использования

### 1. Полный цикл создания и отгрузки

```typescript
class FbsShipmentManager {
  constructor(private client: OzonSellerApiClient) {}

  async createCompleteShipment(deliveryMethodId: number, fromTime: string, toTime: string) {
    console.log('🚀 Начинаем процесс создания отгрузки...');
    
    try {
      // 1. Создаем отгрузку
      const carriage = await this.client.deliveryFbs.createCarriage({
        delivery_method_id: deliveryMethodId,
        first_mile_from_time: fromTime,
        first_mile_to_time: toTime,
        comment: `Отгрузка от ${new Date().toLocaleDateString()}`
      });

      if (!carriage.result?.carriage_id) {
        throw new Error('Не удалось создать отгрузку');
      }

      const carriageId = carriage.result.carriage_id;
      console.log(`✅ Отгрузка создана: ID ${carriageId}`);

      // 2. Подтверждаем отгрузку
      await this.client.deliveryFbs.approveCarriage({ carriage_id: carriageId });
      console.log('✅ Отгрузка подтверждена');

      // 3. Получаем список отправлений
      const carriageInfo = await this.client.deliveryFbs.getCarriage({ 
        carriage_id: carriageId 
      });
      
      // 4. Создаем документы (предполагаем, что знаем номера отправлений)
      const actResult = await this.client.deliveryFbs.createAct({
        carriage_id: carriageId,
        posting_number: [] // В реальности здесь должны быть реальные номера
      });

      if (actResult.result) {
        console.log(`📄 Акт создан: ID ${actResult.act_id}`);
      }

      // 5. Ждем готовности документов
      await this.waitForDocuments(carriageId);

      // 6. Скачиваем все необходимые документы
      await this.downloadAllDocuments(carriageId);

      console.log('🎉 Отгрузка полностью готова!');
      
      return {
        carriageId,
        actId: actResult.act_id,
        status: 'ready'
      };

    } catch (error) {
      console.error('❌ Ошибка в процессе создания отгрузки:', error);
      throw error;
    }
  }

  private async waitForDocuments(carriageId: number, maxAttempts: number = 10) {
    console.log('⏳ Ожидаем готовности документов...');
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      const status = await this.client.deliveryFbs.checkActStatus({
        carriage_id: carriageId
      });

      console.log(`Попытка ${attempt}: отгрузка ${status.carriage_status}, штрихкод ${status.barcode_status}`);

      if (status.carriage_status === 'confirmed' && status.barcode_status === 'ready') {
        console.log('✅ Документы готовы!');
        return;
      }

      if (status.carriage_status === 'error' || status.barcode_status === 'error') {
        throw new Error('Ошибка при формировании документов');
      }

      // Ждем 30 секунд перед следующей проверкой
      await new Promise(resolve => setTimeout(resolve, 30000));
    }

    throw new Error('Превышено время ожидания готовности документов');
  }

  private async downloadAllDocuments(carriageId: number) {
    const fs = require('fs');
    const timestamp = Date.now();

    try {
      // Скачиваем штрихкод
      const barcode = await this.client.deliveryFbs.getBarcode({
        carriage_id: carriageId
      });

      if (barcode.barcode) {
        const barcodeBuffer = Buffer.from(barcode.barcode, 'base64');
        fs.writeFileSync(`barcode-${carriageId}-${timestamp}.png`, barcodeBuffer);
        console.log('📊 Штрихкод сохранён');
      }

      // Скачиваем акт
      const act = await this.client.deliveryFbs.getAct({
        carriage_id: carriageId,
        doc_type: 'act'
      });

      if (act.content) {
        const actBuffer = Buffer.from(act.content, 'base64');
        fs.writeFileSync(`act-${carriageId}-${timestamp}.pdf`, actBuffer);
        console.log('📄 Акт сохранён');
      }

      // Скачиваем транспортную накладную
      const waybill = await this.client.deliveryFbs.getAct({
        carriage_id: carriageId,
        doc_type: 'transport_waybill'
      });

      if (waybill.content) {
        const waybillBuffer = Buffer.from(waybill.content, 'base64');
        fs.writeFileSync(`waybill-${carriageId}-${timestamp}.pdf`, waybillBuffer);
        console.log('📋 Транспортная накладная сохранена');
      }

      console.log('✅ Все документы скачаны');

    } catch (error) {
      console.error('❌ Ошибка при скачивании документов:', error);
    }
  }
}

// Использование
const shipmentManager = new FbsShipmentManager(client);

const shipment = await shipmentManager.createCompleteShipment(
  123,      // ID метода доставки
  '09:00',  // Время начала приёма
  '18:00'   // Время окончания приёма
);

console.log(`Отгрузка ${shipment.carriageId} готова к отправке!`);
```

### 2. Мониторинг и управление отгрузками

```typescript
class ShipmentMonitor {
  constructor(private client: OzonSellerApiClient) {}

  // Получить обзор всех отгрузок
  async getShipmentsOverview() {
    const deliveryList = await this.client.deliveryFbs.getCarriageDeliveryList({
      limit: 100
    });

    const overview = {
      totalMethods: 0,
      totalCarriages: 0,
      statusCounts: new Map<string, number>(),
      deliveryMethods: [] as any[]
    };

    deliveryList.result?.forEach(method => {
      overview.totalMethods++;
      
      const methodInfo = {
        id: method.delivery_method?.id,
        name: method.delivery_method?.name,
        carriages: method.carriages || [],
        carriageCount: method.carriages?.length || 0
      };

      overview.deliveryMethods.push(methodInfo);
      overview.totalCarriages += methodInfo.carriageCount;

      // Подсчет по статусам
      method.carriages?.forEach(carriage => {
        const count = overview.statusCounts.get(carriage.status!) || 0;
        overview.statusCounts.set(carriage.status!, count + 1);
      });
    });

    return overview;
  }

  // Мониторинг проблемных отгрузок
  async checkProblematicShipments() {
    const overview = await this.getShipmentsOverview();
    const issues: Array<{
      carriageId: number;
      issue: string;
      severity: 'low' | 'medium' | 'high';
      recommendation: string;
    }> = [];

    // Проверить отгрузки в статусе new слишком долго
    for (const method of overview.deliveryMethods) {
      for (const carriage of method.carriages) {
        if (carriage.status === 'new') {
          const createdAt = new Date(carriage.created_at!);
          const hoursSinceCreation = (Date.now() - createdAt.getTime()) / (1000 * 60 * 60);
          
          if (hoursSinceCreation > 24) {
            issues.push({
              carriageId: carriage.carriage_id!,
              issue: `Отгрузка в статусе "new" более ${Math.round(hoursSinceCreation)} часов`,
              severity: 'high',
              recommendation: 'Подтвердите отгрузку или отмените её'
            });
          }
        }

        // Проверить статус документов для подтверждённых отгрузок
        if (carriage.status === 'formed' || carriage.status === 'confirmed') {
          try {
            const status = await this.client.deliveryFbs.checkActStatus({
              carriage_id: carriage.carriage_id!
            });

            if (status.barcode_status === 'error') {
              issues.push({
                carriageId: carriage.carriage_id!,
                issue: 'Ошибка при формировании штрихкода',
                severity: 'high',
                recommendation: 'Проверьте состав отгрузки и пересоздайте документы'
              });
            }

            if (status.documents?.some(doc => doc.status === 'error')) {
              issues.push({
                carriageId: carriage.carriage_id!,
                issue: 'Ошибка при формировании документов',
                severity: 'high',
                recommendation: 'Проверьте данные отправлений и пересоздайте документы'
              });
            }
          } catch (error) {
            issues.push({
              carriageId: carriage.carriage_id!,
              issue: 'Не удалось получить статус документов',
              severity: 'medium',
              recommendation: 'Проверьте доступность API или повторите запрос позже'
            });
          }
        }
      }
    }

    return issues;
  }

  // Автоматическое решение простых проблем
  async autoFixIssues() {
    const issues = await this.checkProblematicShipments();
    const fixedIssues: number[] = [];
    const failedFixes: Array<{ carriageId: number; error: string }> = [];

    for (const issue of issues) {
      if (issue.severity === 'high' && issue.issue.includes('new')) {
        try {
          // Попробуем подтвердить старые отгрузки
          await this.client.deliveryFbs.approveCarriage({
            carriage_id: issue.carriageId
          });
          
          fixedIssues.push(issue.carriageId);
          console.log(`✅ Автоматически подтверждена отгрузка ${issue.carriageId}`);
          
        } catch (error) {
          failedFixes.push({
            carriageId: issue.carriageId,
            error: error.message
          });
          console.log(`❌ Не удалось подтвердить отгрузку ${issue.carriageId}: ${error.message}`);
        }
      }
    }

    return {
      totalIssues: issues.length,
      fixedCount: fixedIssues.length,
      fixedCarriages: fixedIssues,
      failedFixes
    };
  }

  // Отчет по отгрузкам
  async generateShipmentReport(days: number = 7) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const acts = await this.client.deliveryFbs.getActList({
      filter: {
        since: cutoffDate.toISOString(),
        to: new Date().toISOString()
      },
      limit: 1000
    });

    const report = {
      period: `${cutoffDate.toLocaleDateString()} - ${new Date().toLocaleDateString()}`,
      totalActs: acts.result?.length || 0,
      statusBreakdown: new Map<string, number>(),
      totalPostings: 0,
      averagePostingsPerAct: 0
    };

    acts.result?.forEach(act => {
      // Подсчет по статусам
      const count = report.statusBreakdown.get(act.status!) || 0;
      report.statusBreakdown.set(act.status!, count + 1);
      
      // Общее количество отправлений
      report.totalPostings += act.postings_count || 0;
    });

    report.averagePostingsPerAct = report.totalActs > 0 ? 
      Math.round(report.totalPostings / report.totalActs * 100) / 100 : 0;

    return report;
  }
}

const monitor = new ShipmentMonitor(client);

// Получить обзор отгрузок
const overview = await monitor.getShipmentsOverview();
console.log(`Всего методов доставки: ${overview.totalMethods}`);
console.log(`Всего отгрузок: ${overview.totalCarriages}`);

// Проверить проблемы
const issues = await monitor.checkProblematicShipments();
if (issues.length > 0) {
  console.log(`⚠️ Найдено ${issues.length} проблем:`);
  issues.forEach(issue => {
    console.log(`${issue.severity.toUpperCase()}: Отгрузка ${issue.carriageId} - ${issue.issue}`);
  });
}

// Сгенерировать отчет
const report = await monitor.generateShipmentReport(7);
console.log(`📊 Отчет за ${report.period}: ${report.totalActs} актов, ${report.totalPostings} отправлений`);
```

### 3. Пакетная обработка отгрузок

```typescript
class BatchShipmentProcessor {
  constructor(private client: OzonSellerApiClient) {}

  // Массовое создание отгрузок по методам доставки
  async createMultipleShipments(
    shipmentRequests: Array<{
      deliveryMethodId: number;
      fromTime: string;
      toTime: string;
      comment?: string;
    }>
  ) {
    const results = [];
    const errors = [];

    for (const [index, request] of shipmentRequests.entries()) {
      try {
        console.log(`📦 Создание отгрузки ${index + 1}/${shipmentRequests.length}...`);
        
        const carriage = await this.client.deliveryFbs.createCarriage({
          delivery_method_id: request.deliveryMethodId,
          first_mile_from_time: request.fromTime,
          first_mile_to_time: request.toTime,
          comment: request.comment
        });

        if (carriage.result?.carriage_id) {
          results.push({
            deliveryMethodId: request.deliveryMethodId,
            carriageId: carriage.result.carriage_id,
            status: carriage.result.status,
            postingsCount: carriage.result.postings_count
          });
          
          console.log(`✅ Отгрузка ${carriage.result.carriage_id} создана`);
        } else {
          errors.push({
            deliveryMethodId: request.deliveryMethodId,
            error: 'Не удалось получить ID отгрузки'
          });
        }

        // Пауза между запросами
        if (index < shipmentRequests.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }

      } catch (error) {
        errors.push({
          deliveryMethodId: request.deliveryMethodId,
          error: error.message
        });
        console.error(`❌ Ошибка создания отгрузки для метода ${request.deliveryMethodId}: ${error.message}`);
      }
    }

    return { results, errors };
  }

  // Массовое подтверждение отгрузок
  async approveMultipleCarriages(carriageIds: number[]) {
    const results = [];
    const errors = [];

    for (const carriageId of carriageIds) {
      try {
        await this.client.deliveryFbs.approveCarriage({
          carriage_id: carriageId
        });
        
        results.push(carriageId);
        console.log(`✅ Отгрузка ${carriageId} подтверждена`);
        
      } catch (error) {
        errors.push({
          carriageId,
          error: error.message
        });
        console.error(`❌ Ошибка подтверждения отгрузки ${carriageId}: ${error.message}`);
      }

      // Пауза между запросами
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    return { results, errors };
  }

  // Массовое скачивание документов
  async downloadMultipleDocuments(
    carriageIds: number[],
    documentTypes: Array<'act' | 'transport_waybill'> = ['act', 'transport_waybill']
  ) {
    const fs = require('fs');
    const timestamp = Date.now();
    
    // Создаем папку для сохранения
    const folderName = `shipment-documents-${timestamp}`;
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
    }

    const results = [];
    const errors = [];

    for (const carriageId of carriageIds) {
      try {
        // Проверяем готовность документов
        const status = await this.client.deliveryFbs.checkActStatus({
          carriage_id: carriageId
        });

        if (status.carriage_status !== 'confirmed' || status.barcode_status !== 'ready') {
          errors.push({
            carriageId,
            error: 'Документы еще не готовы'
          });
          continue;
        }

        const carriageFiles = [];

        // Скачиваем штрихкод
        const barcode = await this.client.deliveryFbs.getBarcode({
          carriage_id: carriageId
        });

        if (barcode.barcode) {
          const barcodeBuffer = Buffer.from(barcode.barcode, 'base64');
          const barcodeFilename = `${folderName}/barcode-${carriageId}.png`;
          fs.writeFileSync(barcodeFilename, barcodeBuffer);
          carriageFiles.push(barcodeFilename);
        }

        // Скачиваем документы
        for (const docType of documentTypes) {
          const document = await this.client.deliveryFbs.getAct({
            carriage_id: carriageId,
            doc_type: docType
          });

          if (document.content) {
            const docBuffer = Buffer.from(document.content, 'base64');
            const docFilename = `${folderName}/${docType}-${carriageId}.pdf`;
            fs.writeFileSync(docFilename, docBuffer);
            carriageFiles.push(docFilename);
          }
        }

        results.push({
          carriageId,
          files: carriageFiles
        });

        console.log(`✅ Документы для отгрузки ${carriageId} скачаны`);

      } catch (error) {
        errors.push({
          carriageId,
          error: error.message
        });
        console.error(`❌ Ошибка скачивания документов для отгрузки ${carriageId}: ${error.message}`);
      }

      // Пауза между запросами
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    console.log(`📁 Все документы сохранены в папку: ${folderName}`);
    return { results, errors, folder: folderName };
  }
}

const batchProcessor = new BatchShipmentProcessor(client);

// Создать несколько отгрузок одновременно
const shipmentRequests = [
  {
    deliveryMethodId: 123,
    fromTime: '09:00',
    toTime: '18:00',
    comment: 'Отгрузка курьерская доставка'
  },
  {
    deliveryMethodId: 124,
    fromTime: '10:00',
    toTime: '17:00',
    comment: 'Отгрузка самовывоз'
  }
];

const createResults = await batchProcessor.createMultipleShipments(shipmentRequests);
console.log(`Создано отгрузок: ${createResults.results.length}, ошибок: ${createResults.errors.length}`);

// Подтвердить созданные отгрузки
if (createResults.results.length > 0) {
  const carriageIds = createResults.results.map(r => r.carriageId);
  const approveResults = await batchProcessor.approveMultipleCarriages(carriageIds);
  console.log(`Подтверждено отгрузок: ${approveResults.results.length}`);
}
```

## Обработка ошибок

### Типичные ошибки и их обработка

```typescript
try {
  const carriage = await client.deliveryFbs.createCarriage({
    delivery_method_id: 123,
    first_mile_from_time: '09:00',
    first_mile_to_time: '18:00'
  });
} catch (error) {
  if (error.response?.status === 400) {
    const errorData = error.response.data;
    
    switch (errorData.code) {
      case 'NO_POSTINGS_FOR_SHIPMENT':
        console.error('Нет отправлений готовых к отгрузке');
        break;
      case 'INVALID_DELIVERY_METHOD':
        console.error('Неверный метод доставки');
        break;
      case 'INVALID_TIME_RANGE':
        console.error('Неверный временной диапазон');
        break;
      case 'CARRIAGE_ALREADY_EXISTS':
        console.error('Отгрузка для этого метода доставки уже существует');
        break;
      default:
        console.error('Неизвестная ошибка:', errorData.message);
    }
  } else if (error.response?.status === 403) {
    console.error('Недостаточно прав или функция недоступна для вашего региона');
  } else if (error.response?.status === 429) {
    console.error('Превышен лимит запросов. Повторите попытку позже.');
  } else {
    console.error('Произошла ошибка:', error.message);
  }
}
```

## Лучшие практики

### 1. Управление жизненным циклом отгрузки

```typescript
// Всегда проверяйте статус перед выполнением операций
const checkCarriageStatus = async (carriageId: number) => {
  const carriage = await client.deliveryFbs.getCarriage({
    carriage_id: carriageId
  });
  
  return carriage.result?.status;
};

// Создавайте отгрузки регулярно в определенное время
const scheduleShipmentCreation = () => {
  // Каждый день в 10:00 создавать отгрузки
  const schedule = require('node-schedule');
  
  schedule.scheduleJob('0 10 * * *', async () => {
    console.log('🕙 Запуск ежедневного создания отгрузок...');
    await batchProcessor.createMultipleShipments(dailyShipmentRequests);
  });
};
```

### 2. Мониторинг и алертинг

```typescript
// Настройте мониторинг проблемных отгрузок
const setupShipmentMonitoring = () => {
  setInterval(async () => {
    const issues = await monitor.checkProblematicShipments();
    
    if (issues.length > 0) {
      const criticalIssues = issues.filter(i => i.severity === 'high');
      if (criticalIssues.length > 0) {
        console.log(`🚨 КРИТИЧЕСКИЕ ПРОБЛЕМЫ: ${criticalIssues.length}`);
        // Отправить уведомления администратору
      }
    }
  }, 30 * 60 * 1000); // Каждые 30 минут
};
```

### 3. Оптимизация производительности

```typescript
// Кэшируйте статусы документов для избежания лишних запросов
class DocumentStatusCache {
  private cache = new Map<number, { status: any; timestamp: number }>();
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 минут

  async getStatus(client: OzonSellerApiClient, carriageId: number) {
    const cached = this.cache.get(carriageId);
    
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached.status;
    }

    const status = await client.deliveryFbs.checkActStatus({
      carriage_id: carriageId
    });
    
    this.cache.set(carriageId, {
      status,
      timestamp: Date.now()
    });
    
    return status;
  }
}
```

---

**Связанные API:** FBS API (управление FBS заказами), Delivery-RFBS API (доставка rFBS), Warehouse API (склады)