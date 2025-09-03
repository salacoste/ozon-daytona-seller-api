# ⚙️ FBS Special API - Специальные функции

**Продвинутые возможности FBS API** — арбитраж, коды курьеров, ограничения, многокоробочные отправления, международные операции.

## 📋 Методы (7 endpoints)

| Метод | Endpoint | Назначение |
|-------|----------|------------|
| `moveToArbitration` | `/v2/posting/fbs/arbitration` | Открытие споров по отправлениям |
| `verifyPickupCode` | `/v1/posting/fbs/pick-up-code/verify` | Проверка кодов курьеров rFBS Express |
| `getRestrictions` | `/v1/posting/fbs/restrictions` | Ограничения пунктов приема |
| `setMultiBoxQtyV3` | `/v3/posting/multiboxqty/set` | Количество коробок (многокоробочные) |
| `getEtgb` | `/v1/posting/global/etgb` | Таможенные декларации для Турции |
| `getUnpaidLegalProductList` | `/v1/posting/unpaid-legal/product/list` | Неоплаченные B2B заказы |
| `moveToAwaitingDelivery` | `/v2/posting/fbs/awaiting-delivery` | Передача спорных заказов к отгрузке |

---

## 🚀 Быстрый старт

### Арбитраж отправлений
```typescript
try {
  // Открыть спор если отправление не отсканировано в СЦ
  const result = await client.fbs.moveToArbitration({
    posting_number: ['12345-0001-1', '12345-0002-1']
  });

  if (result.result) {
    console.log('✅ Отправления переведены в арбитраж');
  } else {
    console.log('❌ Ошибка открытия спора');
  }
} catch (error) {
  console.error('❌ Ошибка арбитража:', error);
}
```

### Проверка кода курьера (rFBS Express)
```typescript
try {
  // Проверить код курьера при передаче
  const verification = await client.fbs.verifyPickupCode({
    code: '123456',
    posting_number: '12345-0001-1'
  });

  if (verification.result) {
    console.log('✅ Код курьера верный, можно передавать отправление');
  } else {
    console.log('❌ Неверный код курьера');
  }
} catch (error) {
  console.error('❌ Ошибка проверки кода:', error);
}
```

### Ограничения пунктов приема
```typescript
try {
  // Получить ограничения для отправления
  const restrictions = await client.fbs.getRestrictions({
    posting_number: '12345-0001-1'
  });

  if (restrictions.result) {
    const { max_weight, max_dimensions } = restrictions.result;
    console.log(`📏 Макс. вес: ${max_weight}кг`);
    
    if (max_dimensions) {
      console.log(`📦 Макс. габариты: ${max_dimensions.length}x${max_dimensions.width}x${max_dimensions.height}см`);
    }
  }
} catch (error) {
  console.error('❌ Ошибка получения ограничений:', error);
}
```

---

## 🎯 Методы API

### `moveToArbitration()` - Арбитраж
```typescript
interface FbsMovePostingRequest {
  /** Номера отправлений */
  posting_number: string[];
}

interface FbsBooleanResponse {
  /** Результат операции */
  result: boolean;
}
```

### `verifyPickupCode()` - Проверка кода курьера
```typescript
interface FbsPickupCodeVerifyRequest {
  /** Код курьера */
  code: string;
  /** Номер отправления */
  posting_number: string;
}

interface FbsPickupCodeVerifyResponse {
  /** Результат проверки */
  result: boolean;
}
```

### `getRestrictions()` - Ограничения пункта
```typescript
interface FbsGetRestrictionsRequest {
  /** Номер отправления */
  posting_number: string;
}

interface FbsGetRestrictionsResponse {
  result?: {
    /** Максимальный вес (кг) */
    max_weight: number;
    /** Максимальные габариты */
    max_dimensions?: {
      length: number;
      width: number;
      height: number;
    };
    /** Другие ограничения */
    restrictions?: string[];
  };
}
```

### `setMultiBoxQtyV3()` - Многокоробочные отправления
```typescript
interface FbsMultiBoxQtySetV3Request {
  /** Номер отправления */
  posting_number: string;
  /** Количество коробок */
  multi_box_qty: number;
}

interface FbsMultiBoxQtySetV3Response {
  /** Результат операции */
  result: boolean;
}
```

### `getEtgb()` - Таможенные декларации
```typescript
interface FbsGetEtgbRequest {
  /** Номера отправлений */
  posting_number: string[];
  /** Тип документа */
  doc_type: 'ETGB';
}

interface FbsGetEtgbResponse {
  result?: {
    /** Номер отправления */
    posting_number: string;
    /** URL документа */
    document_url: string;
    /** Статус декларации */
    status: string;
  }[];
}
```

---

## 💡 Практические примеры

### Workflow арбитража
```typescript
const handleArbitration = async (postingNumbers: string[]) => {
  try {
    console.log(`🔄 Открытие арбитража для ${postingNumbers.length} отправлений...`);
    
    // 1. Открыть арбитраж
    const arbitration = await client.fbs.moveToArbitration({
      posting_number: postingNumbers
    });
    
    if (arbitration.result) {
      console.log('✅ Арбитраж открыт, отправления в статусе "arbitration"');
      
      // 2. Дождаться решения и передать к отгрузке
      setTimeout(async () => {
        const delivery = await client.fbs.moveToAwaitingDelivery({
          posting_number: postingNumbers
        });
        
        if (delivery.result) {
          console.log('✅ Спорные заказы переданы к отгрузке');
        }
      }, 24 * 60 * 60 * 1000); // 24 часа
    }
    
  } catch (error) {
    console.error('❌ Ошибка workflow арбитража:', error);
  }
};
```

### Проверка ограничений пакетно
```typescript
const checkBulkRestrictions = async (postingNumbers: string[]) => {
  const results = [];
  
  for (const postingNumber of postingNumbers) {
    try {
      const restrictions = await client.fbs.getRestrictions({
        posting_number: postingNumber
      });
      
      if (restrictions.result) {
        results.push({
          posting: postingNumber,
          maxWeight: restrictions.result.max_weight,
          maxDimensions: restrictions.result.max_dimensions,
          valid: true
        });
      }
      
      // Пауза между запросами
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error(`❌ Ошибка для ${postingNumber}:`, error);
      results.push({
        posting: postingNumber,
        valid: false,
        error: error.message
      });
    }
  }
  
  return results;
};
```

### rFBS Express интеграция
```typescript
const handleRfbsExpress = async (posting: string, courierCode: string) => {
  try {
    // 1. Проверить код курьера
    const verification = await client.fbs.verifyPickupCode({
      code: courierCode,
      posting_number: posting
    });
    
    if (!verification.result) {
      throw new Error('Неверный код курьера');
    }
    
    console.log('✅ Код курьера подтвержден');
    
    // 2. Получить ограничения для проверки совместимости
    const restrictions = await client.fbs.getRestrictions({
      posting_number: posting
    });
    
    if (restrictions.result) {
      console.log(`📋 Ограничения проверены: макс. ${restrictions.result.max_weight}кг`);
    }
    
    // 3. Передать отправление курьеру
    console.log('📦 Отправление можно передать курьеру rFBS Express');
    
    return { success: true, verified: true };
    
  } catch (error) {
    console.error('❌ Ошибка rFBS Express:', error);
    return { success: false, error: error.message };
  }
};
```

### Работа с многокоробочными отправлениями
```typescript
const setupMultiBoxPostings = async (postings: Array<{number: string, boxes: number}>) => {
  const results = [];
  
  for (const { number, boxes } of postings) {
    try {
      const result = await client.fbs.setMultiBoxQtyV3({
        posting_number: number,
        multi_box_qty: boxes
      });
      
      if (result.result) {
        console.log(`✅ Установлено ${boxes} коробок для ${number}`);
        results.push({ posting: number, boxes, success: true });
      } else {
        console.log(`❌ Ошибка установки коробок для ${number}`);
        results.push({ posting: number, boxes, success: false });
      }
      
    } catch (error) {
      console.error(`❌ Ошибка для ${number}:`, error);
      results.push({ posting: number, boxes, success: false, error: error.message });
    }
  }
  
  return results;
};
```

---

## ⚠️ Особенности использования

### Арбитраж
- ✅ Только для отправлений, переданных в доставку, но не отсканированных в СЦ
- ⏰ Статус изменится на `arbitration`
- 📝 После решения используйте `moveToAwaitingDelivery()`

### Коды курьеров rFBS Express
- 🔐 Только для схемы rFBS Express
- ✅ Код должен быть получен от курьера перед передачей
- ⚠️ Неверный код блокирует передачу отправления

### Ограничения пунктов приема
- 📏 Вес и габаритные ограничения для каждого пункта
- ⚠️ Превышение ограничений может заблокировать доставку
- 🔄 Проверяйте ограничения перед упаковкой

### Многокоробочные отправления
- 📦 Только для схемы rFBS Агрегатор
- ✅ Используется при доставке партнерами OZON
- 🔢 Указывается точное количество коробок

### ETGB декларации
- 🇹🇷 Только для продавцов из Турции  
- 📋 Elektronik Ticaret Gümrük Beyannamesi
- 🌐 Требуется для международной торговли

---

**💡 Предыдущие разделы**: [Главная FBS API (07-fbs.md)](./07-fbs.md) | [Отправления](./fbs-postings.md) | [Этикетки](./fbs-labels.md) | [Товары](./fbs-products.md)