# ❓ FAQ - Часто задаваемые вопросы

Ответы на наиболее частые вопросы при работе с OZON Seller API SDK.

## 📋 Содержание

- [🔑 Аутентификация и доступ](#-аутентификация-и-доступ)
- [⚠️ Ошибки API](#️-ошибки-api)
- [🚀 Производительность](#-производительность)
- [💰 Лимиты и ограничения](#-лимиты-и-ограничения)
- [📦 Управление товарами](#-управление-товарами)
- [🚚 Заказы и логистика](#-заказы-и-логистика)
- [💸 Финансы и платежи](#-финансы-и-платежи)
- [🔄 Возвраты](#-возвраты)
- [⭐ Отзывы и рейтинги](#-отзывы-и-рейтинги)
- [🛠️ Технические вопросы](#️-технические-вопросы)

---

## 🔑 Аутентификация и доступ

### Как получить API ключи?

**Вопрос:** Где найти Client ID и API Key для подключения к OZON API?

**Ответ:**
1. Войдите в [личный кабинет продавца OZON](https://seller.ozon.ru/)
2. Перейдите в **Настройки** → **API ключи**
3. Нажмите **"Создать ключ"**
4. Выберите необходимые права доступа
5. Скопируйте **Client ID** и **API Key**

```typescript
const api = new OzonSellerAPI({
  clientId: 'your-client-id', // Client-Id из личного кабинета
  apiKey: 'your-api-key'      // Api-Key из личного кабинета
});
```

### Ошибка 401 Unauthorized

**Вопрос:** Получаю ошибку "401 Unauthorized" при запросах к API.

**Ответ:** Проверьте следующие моменты:

1. **Корректность ключей:**
```typescript
// Убедитесь, что ключи скопированы без лишних символов
const api = new OzonSellerAPI({
  clientId: process.env.OZON_CLIENT_ID?.trim(),
  apiKey: process.env.OZON_API_KEY?.trim()
});
```

2. **Права доступа:** Убедитесь, что API ключ имеет необходимые права для выполняемых операций.

3. **Срок действия:** Проверьте, не истек ли срок действия API ключа.

### Как ограничить доступ API ключа?

**Вопрос:** Можно ли ограничить права доступа для API ключа?

**Ответ:** Да, при создании API ключа в личном кабинете вы можете выбрать конкретные разрешения:

- **Чтение товаров** - получение информации о товарах
- **Управление товарами** - создание и редактирование товаров
- **Управление заказами** - работа с заказами FBS/FBO
- **Финансовые операции** - доступ к финансовой информации
- **Маркетинг** - управление акциями и промокампаниями

---

## ⚠️ Ошибки API

### Ошибка 429 Too Many Requests

**Вопрос:** Получаю ошибку "429 Too Many Requests" при множественных запросах.

**Ответ:** Вы превысили лимиты API. Реализуйте контроль скорости запросов:

```typescript
class RateLimitedOzonAPI {
  private api: OzonSellerAPI;
  private requestQueue: Array<() => Promise<any>> = [];
  private processing = false;
  
  constructor(config: any) {
    this.api = new OzonSellerAPI(config);
  }
  
  private async processQueue() {
    if (this.processing || this.requestQueue.length === 0) return;
    
    this.processing = true;
    
    while (this.requestQueue.length > 0) {
      const request = this.requestQueue.shift()!;
      try {
        await request();
      } catch (error) {
        console.error('Request failed:', error);
      }
      
      // Пауза между запросами (1 секунда)
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    this.processing = false;
  }
  
  async makeRequest<T>(requestFn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.requestQueue.push(async () => {
        try {
          const result = await requestFn();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
      
      this.processQueue();
    });
  }
}

// Использование
const rateLimitedAPI = new RateLimitedOzonAPI({
  clientId: 'your-client-id',
  apiKey: 'your-api-key'
});

const products = await rateLimitedAPI.makeRequest(() => 
  api.product.getList({ limit: 20 })
);
```

### Ошибка 422 Unprocessable Entity

**Вопрос:** При создании товара получаю ошибку 422 с сообщением о некорректных данных.

**Ответ:** Проверьте валидность передаваемых данных:

```typescript
// Правильное создание товара
const productData = {
  name: 'Название товара',           // Обязательно, не пустое
  offer_id: 'UNIQUE-OFFER-123',      // Обязательно, уникальное
  category_id: 17028922,             // Обязательно, валидный ID категории
  price: '999.00',                   // Строка, положительное число
  vat: '0.20',                       // НДС в формате строки (0.20 = 20%)
  height: 10,                        // Положительное число
  depth: 15,                         // Положительное число
  width: 20,                         // Положительное число
  weight: 500,                       // Положительное число в граммах
  dimension_unit: 'cm',              // 'mm', 'cm', 'in'
  weight_unit: 'g',                  // 'g', 'kg', 'lb'
  images: ['https://example.com/image.jpg'], // Массив URL
  attributes: [
    {
      complex_id: 0,
      id: 85,                        // ID атрибута из category.getAttributes()
      values: [{ value: 'Значение атрибута' }]
    }
  ]
};

try {
  const result = await api.product.create([productData]);
  console.log('Товар создан:', result);
} catch (error: any) {
  // Детальная информация об ошибке
  console.error('Ошибка создания товара:');
  console.error('Message:', error.message);
  console.error('Response:', error.response?.data);
}
```

### Таймаут запросов

**Вопрос:** Запросы API часто прерываются по таймауту.

**Ответ:** Увеличьте значение таймаута и реализуйте повторные попытки:

```typescript
const api = new OzonSellerAPI({
  clientId: 'your-client-id',
  apiKey: 'your-api-key',
  timeout: 60000 // 60 секунд вместо стандартных 30
});

// Функция с повторными попытками
async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error: any) {
      console.error(`Попытка ${attempt}/${maxRetries} не удалась:`, error.message);
      
      if (attempt === maxRetries) {
        throw error;
      }
      
      // Экспоненциальная задержка
      const delay = baseDelay * Math.pow(2, attempt - 1);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw new Error('Все попытки исчерпаны');
}

// Использование
const products = await withRetry(() => api.product.getList({ limit: 100 }));
```

---

## 🚀 Производительность

### Как ускорить массовые операции?

**Вопрос:** Обновление цен для 10,000 товаров занимает очень много времени.

**Ответ:** Используйте батчевые операции:

```typescript
async function updatePricesBatch(
  priceUpdates: Array<{product_id: number, price: string}>,
  batchSize: number = 1000
) {
  const results = [];
  
  for (let i = 0; i < priceUpdates.length; i += batchSize) {
    const batch = priceUpdates.slice(i, i + batchSize);
    
    try {
      console.log(`Обновление батча ${Math.floor(i/batchSize) + 1}...`);
      
      const result = await api.pricesStocks.updatePrices(batch);
      results.push(result);
      
      console.log(`Батч обработан: ${batch.length} товаров`);
      
      // Пауза между батчами для соблюдения лимитов
      if (i + batchSize < priceUpdates.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
    } catch (error: any) {
      console.error(`Ошибка в батче ${Math.floor(i/batchSize) + 1}:`, error.message);
      // Продолжаем с следующим батчем
    }
  }
  
  return results;
}

// Использование
const priceUpdates = [
  { product_id: 123456, price: '1000.00' },
  { product_id: 123457, price: '1500.00' },
  // ... остальные обновления
];

const results = await updatePricesBatch(priceUpdates);
console.log(`Обработано ${results.length} батчей`);
```

### Кэширование данных

**Вопрос:** Как избежать повторных запросов за одними и теми же данными?

**Ответ:** Реализуйте кэширование:

```typescript
class CachedOzonAPI {
  private cache = new Map<string, { data: any, timestamp: number }>();
  private cacheTTL = 5 * 60 * 1000; // 5 минут
  
  constructor(private api: OzonSellerAPI) {}
  
  private getCacheKey(method: string, params: any): string {
    return `${method}_${JSON.stringify(params)}`;
  }
  
  private isExpired(timestamp: number): boolean {
    return Date.now() - timestamp > this.cacheTTL;
  }
  
  async getProductList(params: any) {
    const cacheKey = this.getCacheKey('product.getList', params);
    const cached = this.cache.get(cacheKey);
    
    if (cached && !this.isExpired(cached.timestamp)) {
      console.log('Возвращаем данные из кэша');
      return cached.data;
    }
    
    console.log('Запрашиваем данные с API');
    const data = await this.api.product.getList(params);
    
    this.cache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });
    
    return data;
  }
  
  clearCache() {
    this.cache.clear();
  }
}

// Использование
const cachedAPI = new CachedOzonAPI(api);

// Первый вызов - запрос к API
const products1 = await cachedAPI.getProductList({ limit: 20 });

// Второй вызов - данные из кэша
const products2 = await cachedAPI.getProductList({ limit: 20 });
```

---

## 💰 Лимиты и ограничения

### Какие существуют лимиты API?

**Вопрос:** Какие ограничения по количеству запросов в OZON API?

**Ответ:** Основные лимиты (могут изменяться):

| Тип операции | Лимит | Период |
|--------------|-------|---------|
| Стандартные запросы | 1000 | в минуту |
| Тяжелые операции | 100 | в минуту |
| Загрузка файлов | 50 | в минуту |
| Создание товаров | 200 | в минуту |
| Обновление цен | 1000 товаров | за запрос |

### Превышение лимитов

**Вопрос:** Что делать при превышении лимитов?

**Ответ:** Реализуйте стратегию backoff:

```typescript
class BackoffStrategy {
  private delay = 1000; // Начальная задержка 1 секунда
  private maxDelay = 300000; // Максимальная задержка 5 минут
  private multiplier = 2;
  
  async executeWithBackoff<T>(operation: () => Promise<T>): Promise<T> {
    while (true) {
      try {
        const result = await operation();
        this.reset(); // Сбрасываем задержку при успехе
        return result;
      } catch (error: any) {
        if (error.response?.status === 429) {
          console.log(`Rate limit exceeded, waiting ${this.delay}ms...`);
          await this.wait();
          this.increaseDelay();
        } else {
          throw error;
        }
      }
    }
  }
  
  private wait(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, this.delay));
  }
  
  private increaseDelay() {
    this.delay = Math.min(this.delay * this.multiplier, this.maxDelay);
  }
  
  private reset() {
    this.delay = 1000;
  }
}

// Использование
const backoff = new BackoffStrategy();

const products = await backoff.executeWithBackoff(() => 
  api.product.getList({ limit: 100 })
);
```

---

## 📦 Управление товарами

### Товар не отображается на сайте

**Вопрос:** Создал товар через API, но он не появляется на сайте OZON.

**Ответ:** Проверьте статус товара и модерацию:

```typescript
async function checkProductStatus(productId: number) {
  try {
    const productInfo = await api.product.getInfo({
      product_id: productId
    });
    
    const product = productInfo.result;
    console.log('Статус товара:', product.status);
    
    // Возможные статусы:
    // - draft: черновик
    // - moderating: на модерации
    // - failed_moderation: не прошел модерацию
    // - ready_to_supply: готов к поставке
    // - supply_failed: ошибка поставки
    // - archived: архивный
    
    if (product.status?.state === 'failed_moderation') {
      console.log('Причины отклонения:', product.status.state_failed_moderation_reasons);
      
      // Исправьте проблемы и обновите товар
      await api.product.updateStatus({
        products: [{
          product_id: productId,
          status: 'ready_to_supply'
        }]
      });
    }
    
    // Проверьте видимость товара
    console.log('Видимость:', product.visibility?.visible);
    
    return product;
    
  } catch (error) {
    console.error('Ошибка получения статуса товара:', error);
  }
}

await checkProductStatus(123456789);
```

### Ошибки при создании товаров

**Вопрос:** При создании товара получаю различные ошибки валидации.

**Ответ:** Используйте валидацию данных перед отправкой:

```typescript
interface ProductValidationResult {
  isValid: boolean;
  errors: string[];
}

function validateProductData(productData: any): ProductValidationResult {
  const errors: string[] = [];
  
  // Проверка обязательных полей
  if (!productData.name || productData.name.trim().length === 0) {
    errors.push('Название товара обязательно');
  }
  
  if (!productData.offer_id) {
    errors.push('offer_id обязателен');
  }
  
  if (!productData.category_id) {
    errors.push('category_id обязателен');
  }
  
  // Проверка цены
  if (!productData.price) {
    errors.push('Цена обязательна');
  } else {
    const price = parseFloat(productData.price);
    if (isNaN(price) || price <= 0) {
      errors.push('Цена должна быть положительным числом');
    }
  }
  
  // Проверка размеров
  if (productData.height && productData.height <= 0) {
    errors.push('Высота должна быть положительным числом');
  }
  
  if (productData.width && productData.width <= 0) {
    errors.push('Ширина должна быть положительным числом');
  }
  
  if (productData.depth && productData.depth <= 0) {
    errors.push('Глубина должна быть положительным числом');
  }
  
  // Проверка изображений
  if (!productData.images || productData.images.length === 0) {
    errors.push('Необходимо хотя бы одно изображение');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// Использование
const productData = {
  name: 'Тестовый товар',
  offer_id: 'TEST-123',
  category_id: 17028922,
  price: '999.00',
  // ... остальные поля
};

const validation = validateProductData(productData);
if (!validation.isValid) {
  console.error('Ошибки валидации:', validation.errors);
  return;
}

const result = await api.product.create([productData]);
```

### Массовое обновление атрибутов

**Вопрос:** Как эффективно обновить атрибуты у множества товаров?

**Ответ:** Используйте batch-обновления:

```typescript
async function updateProductAttributes(
  updates: Array<{
    product_id: number;
    attributes: Array<{
      complex_id: number;
      id: number;
      values: Array<{ value: string }>;
    }>;
  }>
) {
  const batchSize = 100; // Обновляем по 100 товаров за раз
  const results = [];
  
  for (let i = 0; i < updates.length; i += batchSize) {
    const batch = updates.slice(i, i + batchSize);
    
    try {
      // Формируем данные для обновления
      const updateData = batch.map(update => ({
        product_id: update.product_id,
        attributes: update.attributes
      }));
      
      const result = await api.product.edit(updateData);
      results.push(result);
      
      console.log(`Обновлен батч ${Math.floor(i/batchSize) + 1}: ${batch.length} товаров`);
      
      // Пауза между батчами
      if (i + batchSize < updates.length) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      
    } catch (error) {
      console.error(`Ошибка в батче ${Math.floor(i/batchSize) + 1}:`, error);
    }
  }
  
  return results;
}
```

---

## 🚚 Заказы и логистика

### Заказы не переходят в следующий статус

**Вопрос:** После упаковки заказа он не переходит в статус "готов к отгрузке".

**Ответ:** Проверьте корректность упаковки:

```typescript
async function packOrderCorrectly(postingNumber: string) {
  try {
    // Сначала получаем информацию о заказе
    const orderInfo = await api.fbs.getOrder({
      posting_number: postingNumber,
      translit: true
    });
    
    const order = orderInfo.result;
    console.log('Статус заказа:', order.status);
    
    if (order.status !== 'awaiting_packaging') {
      console.log('Заказ не готов к упаковке');
      return;
    }
    
    // Корректно формируем пакеты
    const packages = [{
      products: order.products.map(product => ({
        product_id: product.product_id,
        quantity: product.quantity
      }))
    }];
    
    // Упаковываем заказ
    const packResult = await api.fbs.packOrder({
      posting_number: postingNumber,
      packages: packages
    });
    
    console.log('Заказ упакован:', packResult);
    
    // Проверяем статус после упаковки
    const updatedOrder = await api.fbs.getOrder({
      posting_number: postingNumber,
      translit: true
    });
    
    console.log('Новый статус:', updatedOrder.result.status);
    
    return updatedOrder.result;
    
  } catch (error: any) {
    console.error('Ошибка упаковки заказа:', error.message);
    
    // Дополнительная информация об ошибке
    if (error.response?.data) {
      console.error('Детали ошибки:', error.response.data);
    }
  }
}

await packOrderCorrectly('39808541-0120-1');
```

### Проблемы с этикетками

**Вопрос:** Не могу получить этикетки для отправлений FBS.

**Ответ:** Убедитесь, что заказ упакован и готов к отгрузке:

```typescript
async function getShippingLabels(postingNumbers: string[]) {
  try {
    // Получаем этикетки для нескольких отправлений
    const labelsResult = await api.fbs.getPackageLabel({
      posting_number: postingNumbers
    });
    
    // Этикетки возвращаются в формате Base64
    if (labelsResult.result) {
      // Сохраняем этикетки в файлы
      for (let i = 0; i < postingNumbers.length; i++) {
        const postingNumber = postingNumbers[i];
        const labelData = labelsResult.result;
        
        // Декодируем Base64 и сохраняем как PDF
        const buffer = Buffer.from(labelData, 'base64');
        await fs.writeFile(`label_${postingNumber}.pdf`, buffer);
        
        console.log(`Этикетка сохранена: label_${postingNumber}.pdf`);
      }
    }
    
    return labelsResult;
    
  } catch (error: any) {
    console.error('Ошибка получения этикеток:', error.message);
    
    // Проверяем статус заказов
    for (const postingNumber of postingNumbers) {
      const order = await api.fbs.getOrder({
        posting_number: postingNumber,
        translit: true
      });
      console.log(`Заказ ${postingNumber} статус:`, order.result.status);
    }
  }
}

await getShippingLabels(['39808541-0120-1', '39808541-0120-2']);
```

---

## 💸 Финансы и платежи

### Несоответствие в финансовых отчетах

**Вопрос:** Данные в отчетах не соответствуют ожидаемым значениям.

**Ответ:** Учитывайте особенности финансовой отчетности OZON:

```typescript
async function analyzeFinancialReports(dateFrom: string, dateTo: string) {
  try {
    // Получаем транзакции за период
    const transactions = await api.finance.getTransactionsList({
      filter: {
        date: {
          from: dateFrom,
          to: dateTo
        }
      },
      page: 1,
      page_size: 1000
    });
    
    // Анализируем типы транзакций
    const transactionTypes = new Map<string, number>();
    let totalIncome = 0;
    let totalExpenses = 0;
    
    for (const transaction of transactions.result) {
      const amount = parseFloat(transaction.amount);
      const type = transaction.operation_type;
      
      // Группируем по типам операций
      transactionTypes.set(type, (transactionTypes.get(type) || 0) + amount);
      
      // Разделяем на доходы и расходы
      if (amount > 0) {
        totalIncome += amount;
      } else {
        totalExpenses += Math.abs(amount);
      }
    }
    
    console.log('Анализ транзакций:');
    console.log('Общий доход:', totalIncome);
    console.log('Общие расходы:', totalExpenses);
    console.log('Чистая прибыль:', totalIncome - totalExpenses);
    
    console.log('\\nПо типам операций:');
    for (const [type, amount] of transactionTypes.entries()) {
      console.log(`${type}: ${amount}`);
    }
    
    // Получаем баланс счета
    const balance = await api.finance.getAccountBalance();
    console.log('\\nТекущий баланс:', balance.balance, balance.currency);
    
    return {
      totalIncome,
      totalExpenses,
      netProfit: totalIncome - totalExpenses,
      transactionTypes: Object.fromEntries(transactionTypes),
      currentBalance: balance
    };
    
  } catch (error) {
    console.error('Ошибка анализа финансовых отчетов:', error);
  }
}

// Анализ за последний месяц
const lastMonth = new Date();
lastMonth.setMonth(lastMonth.getMonth() - 1);

await analyzeFinancialReports(
  lastMonth.toISOString(),
  new Date().toISOString()
);
```

### Отслеживание комиссий OZON

**Вопрос:** Как правильно отслеживать комиссии и сборы OZON?

**Ответ:** Фильтруйте транзакции по типу операций:

```typescript
async function trackOzonCommissions(dateFrom: string, dateTo: string) {
  const transactions = await api.finance.getTransactionsList({
    filter: {
      date: { from: dateFrom, to: dateTo }
    },
    page_size: 1000
  });
  
  const commissions = {
    selling: 0,          // Комиссия за продажу
    fulfillment: 0,      // Комиссия за обработку
    delivery: 0,         // Стоимость доставки
    return: 0,           // Комиссия за возврат
    other: 0             // Прочие комиссии
  };
  
  for (const transaction of transactions.result) {
    const amount = Math.abs(parseFloat(transaction.amount));
    const type = transaction.operation_type;
    
    // Классифицируем комиссии по типам
    if (type.includes('MarketplaceSellerRecharge')) {
      commissions.selling += amount;
    } else if (type.includes('FulfillmentOperation')) {
      commissions.fulfillment += amount;
    } else if (type.includes('DeliveryOperation')) {
      commissions.delivery += amount;
    } else if (type.includes('ReturnOperation')) {
      commissions.return += amount;
    } else if (amount > 0 && transaction.amount.startsWith('-')) {
      commissions.other += amount;
    }
  }
  
  const totalCommissions = Object.values(commissions).reduce((sum, val) => sum + val, 0);
  
  console.log('Анализ комиссий OZON:');
  console.log('Комиссия за продажи:', commissions.selling);
  console.log('Комиссия за обработку:', commissions.fulfillment);
  console.log('Стоимость доставки:', commissions.delivery);
  console.log('Комиссия за возвраты:', commissions.return);
  console.log('Прочие расходы:', commissions.other);
  console.log('Общие комиссии:', totalCommissions);
  
  return commissions;
}
```

---

## 🔄 Возвраты

### Не обновляется статус возврата

**Вопрос:** Обновляю статус возврата, но изменения не применяются.

**Ответ:** Используйте правильный метод для типа возврата:

```typescript
async function processReturn(returnId: number, action: string) {
  try {
    // Для возвратов RFBS используйте setAction (новый универсальный метод)
    const result = await api.rfbsReturns.setAction({
      id: returnId,
      action: action // 'approve', 'reject', 'refund'
    });
    
    console.log('Возврат обработан:', result);
    
    // Проверяем обновленный статус
    const returnInfo = await api.rfbsReturns.getInfo({
      return_id: returnId
    });
    
    console.log('Новый статус возврата:', returnInfo.result.status);
    
    return returnInfo;
    
  } catch (error: any) {
    console.error('Ошибка обработки возврата:', error.message);
    
    // Проверяем, какие действия доступны для возврата
    const availableActions = await api.rfbsReturns.getList({
      filter: {
        return_id: returnId
      }
    });
    
    console.log('Доступные действия:', availableActions.result[0]?.available_actions);
  }
}

await processReturn(123456, 'approve');
```

### Массовая обработка возвратов

**Вопрос:** Как эффективно обработать много возвратов одновременно?

**Ответ:** Используйте батчевую обработку с контролем ошибок:

```typescript
async function processBulkReturns(
  returns: Array<{id: number, action: string}>,
  batchSize: number = 10
) {
  const results = [];
  const errors = [];
  
  for (let i = 0; i < returns.length; i += batchSize) {
    const batch = returns.slice(i, i + batchSize);
    
    // Обрабатываем батч параллельно
    const batchPromises = batch.map(async (returnItem) => {
      try {
        const result = await api.rfbsReturns.setAction({
          id: returnItem.id,
          action: returnItem.action
        });
        
        return {
          id: returnItem.id,
          success: true,
          result
        };
      } catch (error: any) {
        return {
          id: returnItem.id,
          success: false,
          error: error.message
        };
      }
    });
    
    const batchResults = await Promise.all(batchPromises);
    
    // Разделяем успешные и неуспешные операции
    batchResults.forEach(result => {
      if (result.success) {
        results.push(result);
      } else {
        errors.push(result);
      }
    });
    
    console.log(`Обработан батч ${Math.floor(i/batchSize) + 1}: ${batchResults.length} возвратов`);
    
    // Пауза между батчами
    if (i + batchSize < returns.length) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  console.log(`Обработка завершена:`);
  console.log(`Успешно: ${results.length}`);
  console.log(`С ошибками: ${errors.length}`);
  
  if (errors.length > 0) {
    console.log('Ошибки:', errors);
  }
  
  return { results, errors };
}

// Пример использования
const returnsToProcess = [
  { id: 123456, action: 'approve' },
  { id: 123457, action: 'reject' },
  { id: 123458, action: 'refund' }
];

await processBulkReturns(returnsToProcess);
```

---

## ⭐ Отзывы и рейтинги

### Требуется Premium Plus для работы с отзывами

**Вопрос:** Получаю ошибку при попытке работать с отзывами.

**Ответ:** API отзывов требует подписку Premium Plus:

```typescript
async function checkPremiumStatus() {
  try {
    // Проверяем статус подписки
    const subscriptions = await api.premium.getSubscriptions();
    
    const premiumPlus = subscriptions.result.find(
      sub => sub.name === 'Premium Plus'
    );
    
    if (!premiumPlus || premiumPlus.status !== 'active') {
      console.log('❌ Для работы с отзывами требуется активная подписка Premium Plus');
      console.log('Перейдите в личный кабинет для подключения: https://seller.ozon.ru/');
      return false;
    }
    
    console.log('✅ Premium Plus активен, можно работать с отзывами');
    return true;
    
  } catch (error: any) {
    if (error.message.includes('Premium Plus')) {
      console.log('❌ API отзывов недоступен без подписки Premium Plus');
      return false;
    }
    throw error;
  }
}

// Безопасная работа с отзывами
async function safeReviewOperations() {
  const hasPremium = await checkPremiumStatus();
  
  if (!hasPremium) {
    return;
  }
  
  // Теперь можно работать с отзывами
  const reviews = await api.review.getList({
    status: 'UNPROCESSED',
    limit: 20
  });
  
  console.log(`Найдено отзывов: ${reviews.reviews?.length || 0}`);
}
```

### Автоматизация ответов на отзывы

**Вопрос:** Как автоматизировать ответы на отзывы в зависимости от оценки?

**Ответ:** Создайте систему автоматических ответов:

```typescript
class ReviewResponseSystem {
  private responseTemplates = {
    excellent: [
      'Спасибо за отличный отзыв! 😊 Мы рады, что товар превзошел ваши ожидания!',
      'Благодарим за высокую оценку! Ваше мнение очень важно для нас.',
      'Отлично! Спасибо, что выбрали наш магазин. Ждем вас снова!'
    ],
    good: [
      'Спасибо за отзыв! Мы рады, что товар вам понравился.',
      'Благодарим за оценку! Работаем над тем, чтобы стать еще лучше.',
      'Спасибо за обратную связь! Учтем ваши пожелания.'
    ],
    average: [
      'Спасибо за честный отзыв! Мы учтем ваши замечания для улучшения качества.',
      'Благодарим за обратную связь. Работаем над устранением недочетов.',
      'Ценим ваше мнение! Стремимся к совершенству в каждом товаре.'
    ],
    poor: [
      'Извините за доставленные неудобства. Свяжитесь с нашей поддержкой для решения вопроса.',
      'Сожалеем, что товар не оправдал ожиданий. Готовы помочь с возвратом или обменом.',
      'Приносим извинения! Напишите нам в чат для быстрого решения проблемы.'
    ]
  };
  
  private getResponseTemplate(rating: number): string {
    let templates: string[];
    
    if (rating >= 5) {
      templates = this.responseTemplates.excellent;
    } else if (rating >= 4) {
      templates = this.responseTemplates.good;
    } else if (rating >= 3) {
      templates = this.responseTemplates.average;
    } else {
      templates = this.responseTemplates.poor;
    }
    
    // Выбираем случайный шаблон
    return templates[Math.floor(Math.random() * templates.length)];
  }
  
  async processNewReviews() {
    try {
      const reviews = await api.review.getList({
        status: 'UNPROCESSED',
        limit: 50
      });
      
      if (!reviews.reviews || reviews.reviews.length === 0) {
        console.log('Нет новых отзывов для обработки');
        return;
      }
      
      console.log(`Найдено ${reviews.reviews.length} новых отзывов`);
      
      for (const review of reviews.reviews) {
        try {
          const responseText = this.getResponseTemplate(review.rating);
          
          await api.review.createComment({
            review_id: review.id,
            text: responseText,
            mark_review_as_processed: true
          });
          
          console.log(`✅ Ответ отправлен на отзыв ${review.id} (⭐${review.rating})`);
          
          // Пауза между ответами
          await new Promise(resolve => setTimeout(resolve, 3000));
          
        } catch (error: any) {
          console.error(`❌ Ошибка ответа на отзыв ${review.id}:`, error.message);
        }
      }
      
    } catch (error: any) {
      console.error('Ошибка обработки отзывов:', error.message);
    }
  }
}

// Использование
const reviewSystem = new ReviewResponseSystem();
await reviewSystem.processNewReviews();
```

---

## 🛠️ Технические вопросы

### Проблемы с TypeScript типами

**Вопрос:** TypeScript не распознает типы из SDK.

**Ответ:** Убедитесь в правильной настройке типов:

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "moduleResolution": "node"
  }
}

// Явное импортирование типов
import { 
  OzonSellerAPI,
  ProductCreateRequest,
  ProductListResponse,
  OrderInfo 
} from 'bmad-ozon-seller-api';

// Типизация пользовательских функций
interface ProductFilter {
  visibility?: 'ALL' | 'VISIBLE' | 'INVISIBLE';
  offer_id?: string[];
  product_id?: number[];
}

async function getFilteredProducts(
  api: OzonSellerAPI,
  filter: ProductFilter
): Promise<ProductListResponse> {
  return await api.product.getList({
    filter,
    limit: 50
  });
}
```

### Отладка сетевых запросов

**Вопрос:** Как отследить, какие запросы отправляет SDK?

**Ответ:** Используйте режим отладки:

```typescript
const api = new OzonSellerAPI({
  clientId: 'your-client-id',
  apiKey: 'your-api-key',
  debug: true, // Включает подробное логирование
  onRequest: (config) => {
    console.log('📤 Исходящий запрос:', {
      method: config.method,
      url: config.url,
      data: config.data
    });
  },
  onResponse: (response) => {
    console.log('📥 Входящий ответ:', {
      status: response.status,
      statusText: response.statusText,
      data: response.data
    });
  },
  onError: (error) => {
    console.error('❌ Ошибка запроса:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
  }
});
```

### Тестирование API интеграций

**Вопрос:** Как тестировать код с OZON API без реальных запросов?

**Ответ:** Используйте моки и тестовую среду:

```typescript
// __tests__/ozon-api.test.ts
import { OzonSellerAPI } from 'bmad-ozon-seller-api';

// Мок для API
jest.mock('bmad-ozon-seller-api');
const MockedOzonAPI = OzonSellerAPI as jest.MockedClass<typeof OzonSellerAPI>;

describe('OZON API Integration', () => {
  let api: jest.Mocked<OzonSellerAPI>;
  
  beforeEach(() => {
    api = new MockedOzonAPI({
      clientId: 'test-client-id',
      apiKey: 'test-api-key'
    }) as jest.Mocked<OzonSellerAPI>;
  });
  
  test('should get product list', async () => {
    // Настраиваем мок
    const mockResponse = {
      result: {
        items: [
          { id: 1, name: 'Test Product', offer_id: 'TEST-1' }
        ],
        total: 1
      }
    };
    
    api.product.getList.mockResolvedValue(mockResponse);
    
    // Тестируем функцию
    const result = await api.product.getList({ limit: 10 });
    
    expect(result).toEqual(mockResponse);
    expect(api.product.getList).toHaveBeenCalledWith({ limit: 10 });
  });
  
  test('should handle API errors', async () => {
    // Настраиваем мок для ошибки
    const mockError = new Error('API Error');
    api.product.getList.mockRejectedValue(mockError);
    
    // Тестируем обработку ошибок
    await expect(api.product.getList({ limit: 10 })).rejects.toThrow('API Error');
  });
});

// Интеграционное тестирование с реальным API (осторожно!)
describe('OZON API Integration Tests', () => {
  const api = new OzonSellerAPI({
    clientId: process.env.TEST_OZON_CLIENT_ID!,
    apiKey: process.env.TEST_OZON_API_KEY!
  });
  
  // Используйте только для тестирования в песочнице
  test.skip('should connect to real API', async () => {
    const result = await api.product.getList({ limit: 1 });
    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });
});
```

### Работа в разных окружениях

**Вопрос:** Как настроить SDK для работы в development/staging/production?

**Ответ:** Используйте конфигурацию по окружениям:

```typescript
// config/environments.ts
interface Environment {
  name: string;
  ozon: {
    clientId: string;
    apiKey: string;
    baseURL: string;
    timeout: number;
    debug: boolean;
  };
}

const environments: Record<string, Environment> = {
  development: {
    name: 'development',
    ozon: {
      clientId: process.env.DEV_OZON_CLIENT_ID!,
      apiKey: process.env.DEV_OZON_API_KEY!,
      baseURL: 'https://api-seller.ozon.ru',
      timeout: 30000,
      debug: true
    }
  },
  staging: {
    name: 'staging',
    ozon: {
      clientId: process.env.STAGING_OZON_CLIENT_ID!,
      apiKey: process.env.STAGING_OZON_API_KEY!,
      baseURL: 'https://api-seller.ozon.ru',
      timeout: 30000,
      debug: false
    }
  },
  production: {
    name: 'production',
    ozon: {
      clientId: process.env.PROD_OZON_CLIENT_ID!,
      apiKey: process.env.PROD_OZON_API_KEY!,
      baseURL: 'https://api-seller.ozon.ru',
      timeout: 60000,
      debug: false
    }
  }
};

export function getCurrentEnvironment(): Environment {
  const env = process.env.NODE_ENV || 'development';
  return environments[env] || environments.development;
}

export function createOzonAPI(): OzonSellerAPI {
  const config = getCurrentEnvironment().ozon;
  
  return new OzonSellerAPI({
    clientId: config.clientId,
    apiKey: config.apiKey,
    baseURL: config.baseURL,
    timeout: config.timeout,
    debug: config.debug
  });
}
```

---

## 📞 Получение помощи

### Где найти дополнительную поддержку?

**Официальные ресурсы:**
- 📖 [Документация OZON API](https://docs.ozon.ru/api/seller/)
- 💬 [Telegram чат разработчиков](https://t.me/ozon_api_chat)
- 📧 [Техподдержка](mailto:api-support@ozon.ru)
- 🏪 [Центр помощи продавцов](https://help.ozon.ru/)

**Сообщество:**
- 🐙 [GitHub Issues](https://github.com/your-repo/issues)
- 💡 [Stack Overflow](https://stackoverflow.com/questions/tagged/ozon-api)
- 📱 [Форумы продавцов](https://seller.ozon.ru/forum/)

---

**Последнее обновление:** 2024-01-15  
**Версия SDK:** 1.0.0  
**Покрытие API:** 278 endpoints