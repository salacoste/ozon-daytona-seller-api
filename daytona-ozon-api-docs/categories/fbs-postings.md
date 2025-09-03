# 📋 FBS API - Управление отправлениями

**Детальное руководство по работе с отправлениями FBS** — получение списков, поиск, фильтрация и управление жизненным циклом заказов.

## 🎯 Обзор методов управления отправлениями

| Метод | Endpoint | Версия | Назначение |
|-------|----------|---------|------------|
| `getPostingListV3` | `/v3/posting/fbs/list` | v3 | Список отправлений с расширенной фильтрацией |
| `getUnfulfilledListV3` | `/v3/posting/fbs/unfulfilled/list` | v3 | Необработанные отправления |
| `getPostingV3` | `/v3/posting/fbs/get` | v3 | Детальная информация об отправлении |
| `getPostingByBarcode` | `/v2/posting/fbs/get-by-barcode` | v2 | Поиск отправления по штрихкоду |
| `cancelPosting` | `/v2/posting/fbs/cancel` | v2 | Отмена отправления |
| `moveToAwaitingDelivery` | `/v2/posting/fbs/awaiting-delivery` | v2 | Передача к отгрузке |

---

## 📋 1. Получение списка отправлений

### `getPostingListV3()` - Основной метод списка
```typescript
// Базовый запрос отправлений
const postings = await client.fbs.getPostingListV3({
  filter: {
    since: '2024-01-01T00:00:00Z',
    to: '2024-01-31T23:59:59Z',
    status: 'awaiting_packaging' // Конкретный статус
  },
  limit: 100,
  offset: 0
});

console.log(`📦 Найдено отправлений: ${postings.result?.postings?.length}`);
console.log(`📄 Есть еще страницы: ${postings.result?.has_next}`);

// Обработка результатов
postings.result?.postings?.forEach(posting => {
  console.log(`\n📋 Отправление: ${posting.posting_number}`);
  console.log(`   Статус: ${posting.status}`);
  console.log(`   Дата создания: ${posting.created_at}`);
  console.log(`   Дата отгрузки: ${posting.shipment_date}`);
  console.log(`   Товаров в заказе: ${posting.products?.length}`);
  
  // Информация о товарах
  posting.products?.forEach((product, index) => {
    console.log(`   ${index + 1}. ${product.name} (SKU: ${product.sku})`);
    console.log(`      Количество: ${product.quantity} шт.`);
    console.log(`      Цена: ${product.price}₽`);
  });
});
```

### Расширенная фильтрация
```typescript
// Фильтрация по множественным критериям
const advancedFilter = await client.fbs.getPostingListV3({
  filter: {
    since: '2024-01-01T00:00:00Z',
    to: '2024-01-31T23:59:59Z',
    status: ['awaiting_packaging', 'awaiting_deliver'], // Множественные статусы
    delivery_method_id: [1, 2], // Конкретные методы доставки
    provider_id: [3, 4], // Определенные провайдеры
    warehouse_id: [12345] // Конкретный склад
  },
  limit: 50,
  offset: 0,
  with: {
    analytics_data: true, // Включить аналитические данные
    financial_data: true, // Включить финансовую информацию
    translit: false // Не транслитерировать названия
  }
});

// Пагинация для больших объемов
const getAllPostings = async (filter: any) => {
  const allPostings: any[] = [];
  let offset = 0;
  const limit = 100;
  let hasNext = true;

  while (hasNext) {
    const response = await client.fbs.getPostingListV3({
      filter,
      limit,
      offset,
      with: { analytics_data: true }
    });

    const postings = response.result?.postings || [];
    allPostings.push(...postings);
    
    hasNext = response.result?.has_next || false;
    offset += limit;
    
    console.log(`📄 Загружено отправлений: ${allPostings.length}`);
    
    // Пауза между запросами для избежания лимитов
    if (hasNext) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  return allPostings;
};
```

---

## ⏳ 2. Необработанные отправления

### `getUnfulfilledListV3()` - Приоритетные заказы
```typescript
// Получить все необработанные отправления
const unfulfilledPostings = await client.fbs.getUnfulfilledListV3({
  limit: 100,
  offset: 0
});

console.log(`⏳ Необработанных отправлений: ${unfulfilledPostings.result?.postings?.length}`);

// Группировка по статусам для приоритизации
const groupByStatus = (postings: any[]) => {
  const grouped: { [key: string]: any[] } = {};
  
  postings.forEach(posting => {
    const status = posting.status || 'unknown';
    if (!grouped[status]) {
      grouped[status] = [];
    }
    grouped[status].push(posting);
  });
  
  return grouped;
};

const groupedPostings = groupByStatus(unfulfilledPostings.result?.postings || []);

// Вывод приоритетов
const statusPriority = [
  'awaiting_packaging',    // Высший приоритет
  'awaiting_approve', 
  'awaiting_deliver',
  'acceptance_in_progress',
  'arbitration'           // Требует особого внимания
];

console.log('\n📊 Необработанные отправления по статусам:');
statusPriority.forEach(status => {
  const count = groupedPostings[status]?.length || 0;
  if (count > 0) {
    console.log(`   ${status}: ${count} отправлений`);
    
    // Показать первые несколько для контекста
    groupedPostings[status].slice(0, 3).forEach(posting => {
      console.log(`     - ${posting.posting_number} (${posting.shipment_date})`);
    });
  }
});
```

---

## 🔍 3. Поиск и получение конкретного отправления

### `getPostingV3()` - По идентификатору
```typescript
// Получить детальную информацию об отправлении
const postingDetails = await client.fbs.getPostingV3({
  posting_number: '12345-0001-1',
  with: {
    analytics_data: true,
    financial_data: true
  }
});

const posting = postingDetails.result;
if (posting) {
  console.log(`\n📋 Детали отправления: ${posting.posting_number}`);
  console.log(`   Статус: ${posting.status}`);
  console.log(`   Дата создания: ${posting.created_at}`);
  console.log(`   Дата отгрузки: ${posting.shipment_date}`);
  console.log(`   Адрес доставки: ${posting.delivery_method?.address}`);
  console.log(`   Стоимость доставки: ${posting.delivery_price}₽`);
  
  // Финансовая информация
  if (posting.financial_data) {
    console.log(`   💰 Выручка: ${posting.financial_data.posting_services?.marketplace_service_item_fulfillment}₽`);
    console.log(`   💸 Комиссия: ${posting.financial_data.posting_services?.marketplace_service_item_pickup}₽`);
  }
  
  // Аналитические данные
  if (posting.analytics_data) {
    console.log(`   📊 Регион доставки: ${posting.analytics_data.region}`);
    console.log(`   📊 Город: ${posting.analytics_data.city}`);
  }
}
```

### `getPostingByBarcode()` - По штрихкоду
```typescript
// Поиск отправления по штрихкоду (удобно для сканирования)
const findByBarcode = async (barcode: string) => {
  try {
    const result = await client.fbs.getPostingByBarcode({
      barcode: barcode
    });
    
    if (result.result) {
      console.log(`✅ Найдено отправление: ${result.result.posting_number}`);
      console.log(`   Статус: ${result.result.status}`);
      console.log(`   Товаров: ${result.result.products?.length}`);
      return result.result;
    }
  } catch (error) {
    console.error(`❌ Отправление с штрихкодом ${barcode} не найдено:`, error.message);
    return null;
  }
};

// Использование для сканирования на складе
const processScannedBarcode = async (scannedBarcode: string) => {
  const posting = await findByBarcode(scannedBarcode);
  
  if (posting) {
    if (posting.status === 'awaiting_packaging') {
      console.log('📦 Отправление готово к упаковке');
      // Логика упаковки
    } else if (posting.status === 'awaiting_deliver') {
      console.log('🚚 Отправление готово к отгрузке');
      // Логика отгрузки
    } else {
      console.log(`⚠️ Неожиданный статус: ${posting.status}`);
    }
  }
};
```

---

## ❌ 4. Отмена отправления

### `cancelPosting()` - С указанием причины
```typescript
// Получить список доступных причин отмены
const cancelReasons = await client.fbs.getCancelReasonList();

console.log('📋 Доступные причины отмены:');
cancelReasons.result?.forEach(reason => {
  console.log(`   ${reason.id}: ${reason.name}`);
});

// Отменить отправление с конкретной причиной
const cancelPostingWithReason = async (postingNumber: string, reasonId: number, customMessage?: string) => {
  try {
    const cancelRequest: any = {
      posting_number: postingNumber,
      cancel_reason_id: reasonId
    };
    
    // Если причина 402, требуется дополнительное сообщение
    if (reasonId === 402 && customMessage) {
      cancelRequest.cancel_reason_message = customMessage;
    }
    
    const result = await client.fbs.cancelPosting(cancelRequest);
    
    if (result.result) {
      console.log(`✅ Отправление ${postingNumber} отменено`);
      console.log(`   Причина: ${reasonId}`);
      if (customMessage) {
        console.log(`   Сообщение: ${customMessage}`);
      }
    }
    
    return result;
  } catch (error) {
    console.error(`❌ Ошибка отмены отправления ${postingNumber}:`, error.message);
    throw error;
  }
};

// Массовая отмена с одинаковой причиной
const bulkCancelPostings = async (postingNumbers: string[], reasonId: number) => {
  const results = [];
  
  for (const postingNumber of postingNumbers) {
    try {
      const result = await cancelPostingWithReason(postingNumber, reasonId);
      results.push({ postingNumber, success: true, result });
      
      // Пауза между запросами
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      results.push({ postingNumber, success: false, error: error.message });
    }
  }
  
  console.log(`\n📊 Результаты массовой отмены:`);
  console.log(`✅ Успешно: ${results.filter(r => r.success).length}`);
  console.log(`❌ Ошибок: ${results.filter(r => !r.success).length}`);
  
  return results;
};
```

---

## 🚚 5. Передача к отгрузке

### `moveToAwaitingDelivery()` - Решение спорных ситуаций
```typescript
// Передать спорное отправление к отгрузке
const movePostingToDelivery = async (postingNumber: string) => {
  try {
    const result = await client.fbs.moveToAwaitingDelivery({
      posting_number: postingNumber
    });
    
    if (result.result) {
      console.log(`✅ Отправление ${postingNumber} передано к отгрузке`);
      console.log(`   Новый статус: awaiting_deliver`);
    }
    
    return result;
  } catch (error) {
    console.error(`❌ Ошибка передачи к отгрузке ${postingNumber}:`, error.message);
    throw error;
  }
};

// Пакетное решение арбитражных споров
const resolveArbitrationPostings = async () => {
  // Найти все отправления в арбитраже
  const arbitrationPostings = await client.fbs.getPostingListV3({
    filter: {
      since: '2024-01-01T00:00:00Z',
      to: new Date().toISOString(),
      status: 'arbitration'
    },
    limit: 100
  });
  
  console.log(`⚖️ Отправлений в арбитраже: ${arbitrationPostings.result?.postings?.length || 0}`);
  
  // Обработать каждое арбитражное отправление
  for (const posting of arbitrationPostings.result?.postings || []) {
    try {
      console.log(`\n🔄 Решение арбитража: ${posting.posting_number}`);
      
      // Анализ причины арбитража (логика зависит от бизнес-правил)
      const shouldDeliver = await analyzeArbitrationCase(posting);
      
      if (shouldDeliver) {
        await movePostingToDelivery(posting.posting_number);
        console.log(`   ✅ Передано к отгрузке`);
      } else {
        await cancelPostingWithReason(posting.posting_number, 352); // Причина отмены по арбитражу
        console.log(`   ❌ Отменено`);
      }
      
      // Пауза между обработкой
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`   ❌ Ошибка обработки ${posting.posting_number}:`, error.message);
    }
  }
};

// Пример анализа арбитражного случая
const analyzeArbitrationCase = async (posting: any): Promise<boolean> => {
  // Примерная логика анализа
  const criteria = {
    daysInArbitration: calculateDaysInStatus(posting, 'arbitration'),
    totalValue: posting.products?.reduce((sum: number, p: any) => sum + parseFloat(p.price || '0'), 0) || 0,
    productCount: posting.products?.length || 0
  };
  
  // Простые правила принятия решения
  if (criteria.daysInArbitration > 7) {
    return false; // Слишком долго в арбитраже - отменить
  }
  
  if (criteria.totalValue > 10000) {
    return true; // Дорогой заказ - попытаться доставить
  }
  
  return criteria.productCount <= 3; // Простые заказы - доставить
};

const calculateDaysInStatus = (posting: any, status: string): number => {
  // Логика расчета дней в статусе на основе истории
  const statusDate = new Date(posting.updated_at || posting.created_at);
  const now = new Date();
  return Math.floor((now.getTime() - statusDate.getTime()) / (1000 * 60 * 60 * 24));
};
```

---

## 📊 6. Мониторинг и автоматизация

### Автоматический обработчик отправлений
```typescript
class FbsPostingManager {
  constructor(private client: OzonSellerAPI) {}
  
  async processAllPendingPostings() {
    console.log('🔄 Запуск обработки отправлений...');
    
    try {
      // 1. Обработать новые отправления (упаковка)
      await this.processPackaging();
      
      // 2. Обработать готовые к отгрузке
      await this.processDelivery();
      
      // 3. Решить арбитражные споры
      await this.processArbitration();
      
      // 4. Проверить просроченные отправления
      await this.checkOverduePostings();
      
      console.log('✅ Обработка завершена');
    } catch (error) {
      console.error('❌ Ошибка обработки:', error);
    }
  }
  
  private async processPackaging() {
    const packagingPostings = await this.client.fbs.getPostingListV3({
      filter: {
        since: this.getDateDaysAgo(30),
        to: new Date().toISOString(),
        status: 'awaiting_packaging'
      },
      limit: 50
    });
    
    console.log(`📦 К упаковке: ${packagingPostings.result?.postings?.length || 0}`);
    
    // Уведомить склад о необходимости упаковки
    for (const posting of packagingPostings.result?.postings || []) {
      await this.notifyWarehouseForPackaging(posting);
    }
  }
  
  private async processDelivery() {
    const deliveryPostings = await this.client.fbs.getPostingListV3({
      filter: {
        since: this.getDateDaysAgo(7),
        to: new Date().toISOString(),
        status: 'awaiting_deliver'
      },
      limit: 50
    });
    
    console.log(`🚚 К отгрузке: ${deliveryPostings.result?.postings?.length || 0}`);
    
    // Создать этикетки для отгрузки (это будет в следующем разделе)
    for (const posting of deliveryPostings.result?.postings || []) {
      await this.prepareForDelivery(posting);
    }
  }
  
  private getDateDaysAgo(days: number): string {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date.toISOString();
  }
  
  private async notifyWarehouseForPackaging(posting: any) {
    // Логика уведомления склада
    console.log(`📧 Уведомление склада: ${posting.posting_number}`);
  }
  
  private async prepareForDelivery(posting: any) {
    // Подготовка к отгрузке (создание этикеток и т.д.)
    console.log(`🏷️ Подготовка этикетки: ${posting.posting_number}`);
  }
}

// Использование
const postingManager = new FbsPostingManager(client);
await postingManager.processAllPendingPostings();
```

---

## ⚠️ Важные особенности

### Временные ограничения
- **Фильтр по времени**: максимум 1 год между `since` и `to`
- **Актуальность данных**: регулярно обновляйте информацию или используйте push-уведомления
- **Статус изменения**: могут происходить автоматически системой OZON

### Обработка ошибок
```typescript
const safeGetPostings = async (filter: any) => {
  try {
    return await client.fbs.getPostingListV3(filter);
  } catch (error) {
    if (error.message.includes('time range too large')) {
      console.warn('⚠️ Слишком большой временной диапазон, разбиваем на части...');
      return await getPostingsInBatches(filter);
    }
    throw error;
  }
};

const getPostingsInBatches = async (filter: any) => {
  // Разбить большой период на месячные батчи
  const start = new Date(filter.since);
  const end = new Date(filter.to);
  const results = [];
  
  while (start < end) {
    const batchEnd = new Date(start);
    batchEnd.setMonth(batchEnd.getMonth() + 1);
    if (batchEnd > end) batchEnd.setTime(end.getTime());
    
    const batchFilter = {
      ...filter,
      since: start.toISOString(),
      to: batchEnd.toISOString()
    };
    
    const batch = await client.fbs.getPostingListV3(batchFilter);
    results.push(...(batch.result?.postings || []));
    
    start.setTime(batchEnd.getTime());
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  return { result: { postings: results } };
};
```

---

**💡 Следующий раздел**: [Этикетки и печать (fbs-labels.md)](./fbs-labels.md) — подробное руководство по созданию и печати этикеток для отправлений FBS.