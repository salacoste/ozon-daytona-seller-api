# 📦 FBS Products API - Работа с товарами в отправлениях

**Методы для управления товарами в отправлениях FBS** — изменение веса, отмена позиций, управление странами-изготовителями.

## 📋 Методы (4 endpoints)

| Метод | Endpoint | Назначение |
|-------|----------|------------|
| `cancelProducts` | `/v2/posting/fbs/product/cancel` | Отмена отдельных товаров в отправлении |
| `changeProducts` | `/v2/posting/fbs/product/change` | Изменение веса товаров в отправлении |
| `getProductCountriesList` | `/v2/posting/fbs/product/country/list` | Список стран-изготовителей |
| `setProductCountry` | `/v2/posting/fbs/product/country/set` | Установка страны-изготовителя |

---

## 🚀 Быстрый старт

### Отмена товаров в отправлении
```typescript
try {
  // Отменить часть товаров из отправления
  const result = await client.fbs.cancelProducts({
    posting_number: '12345-0001-1',
    products: [
      {
        sku: '123456789',
        quantity: 1,
        cancel_reason_id: 402 // Товар не в наличии
      },
      {
        sku: '987654321', 
        quantity: 2,
        cancel_reason_id: 665 // Брак товара
      }
    ]
  });

  result.result?.forEach(product => {
    if (product.result) {
      console.log(`✅ Товар ${product.sku} отменён`);
    } else {
      console.log(`❌ Ошибка отмены ${product.sku}: ${product.error}`);
    }
  });
  
} catch (error) {
  console.error('❌ Ошибка отмены товаров:', error);
}
```

### Изменение веса товаров
```typescript
try {
  // Добавить вес для весовых товаров
  const result = await client.fbs.changeProducts({
    posting_number: '12345-0001-1',
    products: [
      {
        sku: '123456789',
        quantity: 2,
        weight: 1.5 // кг на единицу товара
      },
      {
        sku: '987654321',
        quantity: 1, 
        weight: 2.3
      }
    ]
  });

  result.result?.forEach(product => {
    if (product.result) {
      console.log(`✅ Вес для товара ${product.sku} установлен`);
    } else {
      console.log(`❌ Ошибка изменения ${product.sku}: ${product.error}`);
    }
  });
  
} catch (error) {
  console.error('❌ Ошибка изменения товаров:', error);
}
```

---

## 🎯 Методы API

### `cancelProducts()` - Отмена товаров
```typescript
interface FbsProductCancelRequest {
  /** Номер отправления */
  posting_number: string;
  /** Товары для отмены */
  products: {
    /** SKU товара */
    sku: string;
    /** Количество для отмены */
    quantity: number;
    /** ID причины отмены */
    cancel_reason_id: number;
  }[];
}

interface FbsProductCancelResponse {
  result?: {
    /** SKU товара */
    sku: string;
    /** Успешность операции */
    result: boolean;
    /** Сообщение об ошибке */
    error?: string;
  }[];
}
```

### `changeProducts()` - Изменение товаров
```typescript
interface FbsProductChangeRequest {
  /** Номер отправления */
  posting_number: string;
  /** Товары для изменения */
  products: {
    /** SKU товара */
    sku: string;
    /** Количество */
    quantity: number;
    /** Вес единицы товара в кг */
    weight?: number;
  }[];
}

interface FbsProductChangeResponse {
  result?: {
    /** SKU товара */
    sku: string;
    /** Успешность операции */
    result: boolean;
    /** Сообщение об ошибке */
    error?: string;
  }[];
}
```

### `getProductCountriesList()` - Список стран
```typescript
interface FbsProductCountryListRequest {
  /** Пустой объект для получения всех стран */
}

interface FbsProductCountryListResponse {
  result?: {
    /** Название страны */
    name: string;
    /** ISO код страны */
    iso_code: string;
  }[];
}
```

### `setProductCountry()` - Установка страны
```typescript
interface FbsProductCountrySetRequest {
  /** Номер отправления */
  posting_number: string;
  /** Товары для установки страны */
  products: {
    /** SKU товара */
    sku: string;
    /** ISO код страны-изготовителя */
    country_iso_code: string;
  }[];
}

interface FbsProductCountrySetResponse {
  result?: {
    /** SKU товара */
    sku: string;
    /** Успешность операции */
    result: boolean;
    /** Сообщение об ошибке */
    error?: string;
  }[];
}
```

---

## 💡 Практические примеры

### Массовая отмена товаров
```typescript
const cancelBulkProducts = async (posting: string, productsToCancel: Array<{sku: string, qty: number, reason: number}>) => {
  try {
    const result = await client.fbs.cancelProducts({
      posting_number: posting,
      products: productsToCancel.map(p => ({
        sku: p.sku,
        quantity: p.qty,
        cancel_reason_id: p.reason
      }))
    });

    const success = result.result?.filter(p => p.result) || [];
    const failed = result.result?.filter(p => !p.result) || [];
    
    console.log(`✅ Отменено: ${success.length}, ❌ Ошибок: ${failed.length}`);
    
    failed.forEach(p => {
      console.log(`Ошибка ${p.sku}: ${p.error}`);
    });
    
    return { success: success.length, failed: failed.length };
    
  } catch (error) {
    console.error('Ошибка массовой отмены:', error);
    return { success: 0, failed: productsToCancel.length };
  }
};
```

### Работа со странами-изготовителями
```typescript
const setupProductCountries = async () => {
  try {
    // 1. Получить список доступных стран
    const countries = await client.fbs.getProductCountriesList({});
    
    console.log('📍 Доступные страны:');
    countries.result?.forEach(country => {
      console.log(`   ${country.name} (${country.iso_code})`);
    });
    
    // 2. Установить страны для товаров
    const result = await client.fbs.setProductCountry({
      posting_number: '12345-0001-1',
      products: [
        { sku: '123456789', country_iso_code: 'RU' },
        { sku: '987654321', country_iso_code: 'CN' },
        { sku: '555666777', country_iso_code: 'US' }
      ]
    });
    
    result.result?.forEach(product => {
      if (product.result) {
        console.log(`✅ Страна для ${product.sku} установлена`);
      } else {
        console.log(`❌ Ошибка для ${product.sku}: ${product.error}`);
      }
    });
    
  } catch (error) {
    console.error('❌ Ошибка работы со странами:', error);
  }
};
```

### Обновление весовых товаров
```typescript
const updateWeightedProducts = async (posting: string, weightUpdates: Array<{sku: string, weight: number, qty: number}>) => {
  try {
    const result = await client.fbs.changeProducts({
      posting_number: posting,
      products: weightUpdates.map(item => ({
        sku: item.sku,
        quantity: item.qty,
        weight: item.weight
      }))
    });
    
    let totalWeight = 0;
    let updatedCount = 0;
    
    result.result?.forEach(product => {
      if (product.result) {
        const item = weightUpdates.find(u => u.sku === product.sku);
        if (item) {
          totalWeight += item.weight * item.qty;
          updatedCount++;
        }
      }
    });
    
    console.log(`✅ Обновлено товаров: ${updatedCount}`);
    console.log(`📦 Общий вес: ${totalWeight.toFixed(2)} кг`);
    
    return { updatedCount, totalWeight };
    
  } catch (error) {
    console.error('❌ Ошибка обновления весов:', error);
    return { updatedCount: 0, totalWeight: 0 };
  }
};
```

---

## ⚠️ Ограничения и правила

### Отмена товаров
- ❌ Условно-доставленные отправления отменить нельзя
- ⚠️ При `cancel_reason_id: 402` требуется заполнить `cancel_reason_message`
- ✅ Можно отменить только часть товаров из отправления

### Изменение товаров  
- ✅ Используется для добавления веса весовым товарам
- ✅ Вес указывается в килограммах на единицу товара
- ⚠️ Изменения применяются только к весовым характеристикам

### Страны-изготовители
- ✅ Обязательный атрибут для многих категорий товаров
- ✅ Используются стандартные ISO коды стран (RU, CN, US, etc.)
- ⚠️ Нельзя изменить уже установленную страну-изготовителя

---

**💡 Следующий раздел**: [Специальные функции (fbs-special.md)](./fbs-special.md)