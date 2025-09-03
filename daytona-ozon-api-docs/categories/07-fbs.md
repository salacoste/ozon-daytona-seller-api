# 📋 FBS API - Fulfillment by Seller

**Самая комплексная категория для управления отправлениями FBS** — полный жизненный цикл заказов от получения до доставки со схемой фулфилмента от продавца.

## 🎯 Назначение API

FBS API предоставляет полный набор инструментов для схемы Fulfillment by Seller:
- **Управление отправлениями** — получение списков, фильтрация, отслеживание статусов
- **Печать этикеток** — создание и получение этикеток для отправлений  
- **Отмена и споры** — управление отменами, арбитражами и проблемными заказами
- **Работа с товарами** — изменение весов, отмена отдельных позиций, управление странами-изготовителями
- **Специальные функции** — коды курьеров, ограничения, многокоробочные отправления
- **Международная торговля** — таможенные декларации ETGB для турецких продавцов

---

## 📊 Обзор методов (22 endpoints)

### 🗂️ Категории методов

| Категория | Количество | Сложность | Описание |
|-----------|------------|-----------|----------|
| **Управление отправлениями** | 6 методов | 🟡 Средняя | Список, поиск, получение, отмена отправлений |
| **Этикетки и печать** | 4 метода | 🟢 Простая | Создание, получение этикеток, пакетная печать |
| **Работа с товарами** | 4 метода | 🟡 Средняя | Изменение весов, отмена позиций, страны-изготовители |
| **Специальные функции** | 5 методов | 🔴 Сложная | Арбитраж, коды курьеров, ограничения, rFBS |
| **Международные операции** | 2 метода | 🟡 Средняя | ETGB декларации, неоплаченные B2B заказы |
| **Причины отмены** | 1 метод | 🟢 Простая | Справочник причин отмены |

---

## 🚀 Быстрый старт

### Инициализация клиента
```typescript
import { OzonSellerAPI } from 'daytona-ozon-seller-api';

const client = new OzonSellerAPI({
  clientId: 'your-client-id',
  apiKey: 'your-api-key'
});
```

### Базовый workflow FBS
```typescript
try {
  // 1. Получить новые отправления
  const newPostings = await client.fbs.getPostingListV3({
    filter: {
      since: '2024-01-01T00:00:00Z',
      to: '2024-01-31T23:59:59Z',
      status: 'awaiting_packaging' // Ожидают упаковки
    },
    limit: 50
  });

  console.log(`📦 Новых отправлений: ${newPostings.result?.postings?.length || 0}`);

  // 2. Обработать каждое отправление
  for (const posting of newPostings.result?.postings || []) {
    console.log(`\n🔄 Отправление: ${posting.posting_number}`);
    console.log(`   Статус: ${posting.status}`);
    console.log(`   Товаров: ${posting.products?.length}`);
    console.log(`   Дата отгрузки: ${posting.shipment_date}`);
    
    // 3. Создать этикетку для отправления
    const label = await client.fbs.packageLabel({
      posting_number: [posting.posting_number]
    });
    
    if (label.content) {
      console.log(`   ✅ Этикетка создана (${label.content.length} байт)`);
    }
  }

  // 4. Получить необработанные отправления
  const unfulfilledPostings = await client.fbs.getUnfulfilledListV3({
    limit: 100
  });
  
  console.log(`⏳ Необработанных отправлений: ${unfulfilledPostings.result?.postings?.length || 0}`);

} catch (error) {
  console.error('❌ Ошибка FBS workflow:', error);
}
```

---

## 📚 Подробные разделы документации

### 🗂️ 1. Управление отправлениями
**[→ Подробная документация: fbs-postings.md](./fbs-postings.md)**

Основные методы работы с отправлениями:
- `getPostingListV3()` — список отправлений (v3) с расширенной фильтрацией
- `getUnfulfilledListV3()` — необработанные отправления
- `getPostingV3()` — детальная информация по ID
- `getPostingByBarcode()` — поиск по штрихкоду
- `cancelPosting()` — отмена отправления
- `moveToAwaitingDelivery()` — передача к отгрузке

### 🏷️ 2. Этикетки и печать  
**[→ Подробная документация: fbs-labels.md](./fbs-labels.md)**

Методы для работы с этикетками:
- `packageLabel()` — прямая печать этикеток (до 20 за раз)
- `createLabelBatch()` — создание задания на этикетки (асинхронно)
- `createLabelBatchV2()` — улучшенная версия с поддержкой размеров
- `getLabelBatch()` — получение готовых этикеток

### 📦 3. Работа с товарами
**[→ Подробная документация: fbs-products.md](./fbs-products.md)**

Методы управления товарами в отправлениях:
- `cancelPostingProduct()` — отмена отдельных товаров
- `changePostingProduct()` — изменение веса товаров
- `getProductCountryList()` — список стран-изготовителей
- `setProductCountry()` — установка страны-изготовителя

### ⚙️ 4. Специальные функции
**[→ Подробная документация: fbs-special.md](./fbs-special.md)**

Продвинутые возможности FBS:
- `moveToArbitration()` — открытие споров
- `verifyPickupCode()` — проверка кодов курьеров rFBS Express
- `getRestrictions()` — ограничения пунктов приема
- `setMultiBoxQty()` — количество коробок для многокоробочных товаров
- `getEtgb()` — таможенные декларации для Турции

---

## 🔄 Статусы отправлений FBS

### Жизненный цикл отправления
```
awaiting_registration → acceptance_in_progress → awaiting_approve
         ↓
awaiting_packaging → awaiting_deliver → delivering → delivered
         ↓                    ↓             ↓
    cancelled         not_accepted    driver_pickup
         ↓                    ↓             ↓
    arbitration      client_arbitration  sent_by_seller
```

### Описание статусов
| Статус | Описание | Действия продавца |
|--------|----------|-------------------|
| `awaiting_registration` | Ожидает регистрации | Ожидание |
| `acceptance_in_progress` | Идет приемка | Ожидание |
| `awaiting_approve` | Ожидает подтверждения | Подтвердить получение |
| `awaiting_packaging` | Ожидает упаковки | **Упаковать и создать этикетку** |
| `awaiting_deliver` | Ожидает отгрузки | **Передать в доставку** |
| `arbitration` | Арбитраж | Решить спорную ситуацию |
| `delivering` | Доставляется | Мониторинг |
| `delivered` | Доставлено | Завершено ✅ |
| `cancelled` | Отменено | Обработать отмену |

---

## ⚠️ Важные ограничения и особенности

### 🚦 Лимиты операций
- **Печать этикеток**: максимум 20 отправлений за один запрос
- **Временной период**: максимум 1 год для фильтрации отправлений
- **Отмена отправлений**: условно-доставленные отменить нельзя

### 🔧 Специфика работы
- **Рекомендуемая задержка**: запрашивать этикетки через 45-60 секунд после сборки
- **Статус этикеток**: ошибка "The next postings aren't ready" = повторить запрос позже
- **rFBS Express**: специальные коды курьеров для передачи отправлений

### 💡 Best Practices
```typescript
// ✅ Хорошо - проверка готовности этикеток
const createLabelWithRetry = async (postingNumbers: string[]) => {
  let attempts = 0;
  const maxAttempts = 5;
  
  while (attempts < maxAttempts) {
    try {
      const label = await client.fbs.packageLabel({
        posting_number: postingNumbers
      });
      
      return label;
    } catch (error) {
      if (error.message.includes("aren't ready")) {
        attempts++;
        console.log(`⏳ Этикетки не готовы, попытка ${attempts}/${maxAttempts}`);
        await new Promise(resolve => setTimeout(resolve, 60000)); // 1 минута
      } else {
        throw error;
      }
    }
  }
  
  throw new Error('Этикетки не готовы после максимального количества попыток');
};

// ❌ Плохо - игнорирование статусов и ошибок
const badExample = async () => {
  await client.fbs.packageLabel({ posting_number: ['123-456-1'] });
  // Нет проверки готовности этикеток
};
```

---

## 📊 Схемы FBS и rFBS

### FBS (Fulfillment by Seller)
- Товары хранятся на складе продавца
- Продавец сам упаковывает и передает в доставку
- Полный контроль над процессом

### rFBS (regional FBS)
- Региональные склады для быстрой доставки
- Возможность Express доставки с кодами курьеров
- Оптимизация логистических затрат

### Выбор схемы
```typescript
// Определение подходящей схемы на основе товара
const chooseFbsScheme = (product: Product): 'FBS' | 'rFBS' => {
  const criteria = {
    weight: product.weight,
    dimensions: product.dimensions,
    fragility: product.fragile,
    region: product.region
  };
  
  if (criteria.weight > 10000 || criteria.fragility) {
    return 'FBS'; // Больше контроля для тяжелых/хрупких товаров
  }
  
  if (criteria.region === 'moscow' || criteria.region === 'spb') {
    return 'rFBS'; // Быстрая доставка в крупных городах
  }
  
  return 'FBS';
};
```

---

## 🎓 Следующие шаги

### 1. Изучите детальную документацию
- **[fbs-postings.md](./fbs-postings.md)** — Управление отправлениями
- **[fbs-labels.md](./fbs-labels.md)** — Этикетки и печать  
- **[fbs-products.md](./fbs-products.md)** — Работа с товарами
- **[fbs-special.md](./fbs-special.md)** — Специальные функции

### 2. Интеграция с другими API
- **[Products API](./01-products.md)** — для получения информации о товарах
- **[Warehouse API](./04-warehouse.md)** — для управления складами
- **Prices & Stocks API** — для обновления остатков после отгрузки

### 3. Автоматизация процессов
```typescript
// Пример автоматизированного обработчика FBS
class FbsOrderProcessor {
  async processNewOrders() {
    // 1. Получить новые заказы
    const newOrders = await this.getNewOrders();
    
    // 2. Создать этикетки
    const labels = await this.createLabelsWithRetry(newOrders);
    
    // 3. Уведомить склад об упаковке
    await this.notifyWarehouse(newOrders);
    
    // 4. Обновить статусы
    await this.updateOrderStatuses(newOrders, 'processing');
  }
  
  async handleCancellations() {
    const reasons = await client.fbs.getCancelReasonList();
    // Обработка отмен с правильными причинами
  }
}
```

---

**💡 Совет**: FBS API требует понимания полного жизненного цикла заказов. Начните с базовых операций (список → этикетки → отгрузка) и постепенно добавляйте продвинутые функции как споры и специальные схемы доставки.