# 🚀 Быстрый старт с OZON Seller API SDK

Руководство для быстрого начала работы с SDK всего за 5 минут.

## 📋 Содержание

- [Установка](#установка)
- [Первоначальная настройка](#первоначальная-настройка)
- [Базовые операции](#базовые-операции)
- [Типовые сценарии](#типовые-сценарии)
- [Следующие шаги](#следующие-шаги)

## 🛠️ Установка

### npm
```bash
npm install daytona-ozon-seller-api
```

### yarn
```bash
yarn add daytona-ozon-seller-api
```

### pnpm
```bash
pnpm add daytona-ozon-seller-api
```

## 🔑 Первоначальная настройка

### 1. Получение API ключей

1. Войдите в [личный кабинет продавца OZON](https://seller.ozon.ru/)
2. Перейдите в **Настройки** → **API ключи**
3. Создайте новый API ключ
4. Скопируйте **Client ID** и **API Key**

### 2. Инициализация SDK

```typescript
import { OzonSellerAPI } from 'daytona-ozon-seller-api';

// Базовая инициализация
const api = new OzonSellerAPI({
  clientId: 'your-client-id',
  apiKey: 'your-api-key'
});

// С дополнительными настройками
const api = new OzonSellerAPI({
  clientId: 'your-client-id',
  apiKey: 'your-api-key',
  baseURL: 'https://api-seller.ozon.ru', // По умолчанию
  timeout: 30000, // 30 секунд
  debug: false // Включить логи для отладки
});
```

### 3. Проверка подключения

```typescript
async function testConnection() {
  try {
    // Получаем информацию о продавце
    const sellerInfo = await api.seller.getInfo();
    console.log('✅ Подключение успешно!');
    console.log('Продавец:', sellerInfo.name);
    
    // Получаем первые 5 товаров
    const products = await api.product.getList({ limit: 5 });
    console.log(`📦 Найдено товаров: ${products.total}`);
    
  } catch (error) {
    console.error('❌ Ошибка подключения:', error.message);
  }
}

testConnection();
```

## 🎯 Базовые операции

### Работа с товарами

```typescript
// 1. Получение списка товаров
const products = await api.product.getList({
  limit: 20,
  last_id: '',
  filter: {
    visibility: 'ALL'
  }
});

console.log('Товары:', products.result?.items?.length);

// 2. Получение информации о товаре
const productInfo = await api.product.getInfo({
  product_id: 123456789,
  sku: 1000,
  offer_id: 'OFFER-123'
});

console.log('Название:', productInfo.result.name);
console.log('Цена:', productInfo.result.marketing_price);

// 3. Обновление цены товара
await api.pricesStocks.updatePrices([{
  product_id: 123456789,
  price: '1500.00'
}]);

console.log('💰 Цена обновлена');

// 4. Обновление остатка
await api.pricesStocks.updateStocks([{
  product_id: 123456789,
  stock: 50
}]);

console.log('📦 Остаток обновлен');
```

### Работа с заказами FBS

```typescript
// 1. Получение новых заказов
const orders = await api.fbs.getOrdersList({
  dir: 'ASC',
  filter: {
    since: '2024-01-01T00:00:00Z',
    to: '2024-01-31T23:59:59Z',
    status: 'awaiting_packaging'
  },
  limit: 50
});

console.log('📋 Новых заказов:', orders.result.length);

// 2. Обработка каждого заказа
for (const order of orders.result) {
  console.log(`\n🔄 Обработка заказа: ${order.posting_number}`);
  
  // Упаковка заказа
  await api.fbs.packOrder({
    posting_number: order.posting_number,
    packages: [{
      products: order.products.map(p => ({
        product_id: p.product_id,
        quantity: p.quantity
      }))
    }]
  });
  
  console.log('📦 Заказ упакован');
  
  // Отгрузка заказа
  await api.fbs.shipOrder({
    posting_number: order.posting_number,
    tracking_number: `TRACK${Date.now()}`,
    shipping_provider_id: 1
  });
  
  console.log('🚚 Заказ отгружен');
}
```

### Работа с финансами

```typescript
// 1. Получение баланса
const balance = await api.finance.getAccountBalance();
console.log('💳 Текущий баланс:', balance.balance, balance.currency);

// 2. Получение транзакций за последние 30 дней
const thirtyDaysAgo = new Date();
thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

const transactions = await api.finance.getTransactionsList({
  filter: {
    date: {
      from: thirtyDaysAgo.toISOString(),
      to: new Date().toISOString()
    }
  },
  page: 1,
  page_size: 100
});

console.log('💸 Транзакций за месяц:', transactions.result.length);

// 3. Анализ доходов
const income = transactions.result
  .filter(t => parseFloat(t.amount) > 0)
  .reduce((sum, t) => sum + parseFloat(t.amount), 0);

console.log('💰 Доход за месяц:', income.toFixed(2));
```

## 🎭 Типовые сценарии

### Сценарий 1: Создание нового товара

```typescript
async function createNewProduct() {
  try {
    // 1. Создаем товар
    const newProduct = await api.product.create([{
      name: 'Новый товар',
      offer_id: 'NEW-PRODUCT-001',
      category_id: 17028922,
      price: '999.00',
      old_price: '1299.00',
      premium_price: '899.00',
      vat: '0.20',
      height: 10,
      depth: 15,
      width: 20,
      dimension_unit: 'cm',
      weight: 500,
      weight_unit: 'g',
      images: ['https://example.com/image1.jpg'],
      attributes: [
        {
          complex_id: 0,
          id: 85,
          values: [{ value: 'Бренд товара' }]
        }
      ]
    }]);
    
    const productId = newProduct.result[0].product_id;
    console.log('✅ Товар создан, ID:', productId);
    
    // 2. Устанавливаем остаток
    await api.pricesStocks.updateStocks([{
      product_id: productId,
      stock: 100
    }]);
    
    console.log('📦 Остаток установлен: 100 шт.');
    
    // 3. Проверяем статус модерации
    const productInfo = await api.product.getInfo({
      product_id: productId
    });
    
    console.log('📋 Статус:', productInfo.result.status.state);
    
  } catch (error) {
    console.error('❌ Ошибка создания товара:', error.message);
  }
}

createNewProduct();
```

### Сценарий 2: Массовое обновление цен

```typescript
async function updatePricesBulk() {
  try {
    // 1. Получаем все товары
    const products = await api.product.getList({ limit: 1000 });
    
    // 2. Подготавливаем обновления цен (скидка 10%)
    const priceUpdates = products.result?.items
      ?.filter(p => p.marketing_price)
      .map(p => ({
        product_id: p.id,
        price: (parseFloat(p.marketing_price) * 0.9).toFixed(2)
      }))
      .slice(0, 100); // Обновляем первые 100 товаров
    
    if (priceUpdates && priceUpdates.length > 0) {
      // 3. Обновляем цены батчами по 1000 товаров
      const batchSize = 1000;
      for (let i = 0; i < priceUpdates.length; i += batchSize) {
        const batch = priceUpdates.slice(i, i + batchSize);
        
        await api.pricesStocks.updatePrices(batch);
        
        console.log(`💰 Обновлено цен: ${i + batch.length}/${priceUpdates.length}`);
        
        // Пауза между запросами
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      console.log('✅ Все цены обновлены!');
    }
    
  } catch (error) {
    console.error('❌ Ошибка обновления цен:', error.message);
  }
}

updatePricesBulk();
```

### Сценарий 3: Автоматическая обработка отзывов (Premium Plus)

```typescript
async function autoProcessReviews() {
  try {
    // 1. Получаем необработанные отзывы
    const reviews = await api.review.getList({
      status: 'UNPROCESSED',
      limit: 50
    });
    
    console.log('📝 Новых отзывов:', reviews.reviews?.length || 0);
    
    // 2. Обрабатываем каждый отзыв
    for (const review of reviews.reviews || []) {
      console.log(`\n⭐ Отзыв ${review.id}: ${review.rating} звезд`);
      
      // Формируем ответ в зависимости от рейтинга
      let responseText = '';
      
      if (review.rating >= 4) {
        responseText = 'Спасибо за отличный отзыв! 😊 Мы рады, что товар вам понравился!';
      } else if (review.rating >= 3) {
        responseText = 'Спасибо за отзыв! Мы учтем ваши замечания для улучшения качества.';
      } else {
        responseText = 'Извините за доставленные неудобства. Обращайтесь в нашу поддержку для решения вопроса.';
      }
      
      // Отвечаем на отзыв
      await api.review.createComment({
        review_id: review.id,
        text: responseText,
        mark_review_as_processed: true
      });
      
      console.log('💬 Ответ отправлен');
      
      // Пауза между ответами
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    console.log('✅ Все отзывы обработаны!');
    
  } catch (error) {
    if (error.message.includes('Premium Plus')) {
      console.error('🔒 Для работы с отзывами требуется подписка Premium Plus');
    } else {
      console.error('❌ Ошибка обработки отзывов:', error.message);
    }
  }
}

autoProcessReviews();
```

## 🎓 Следующие шаги

### 1. Изучите документацию API
- **[Полное README](./README.md)** - Обзор всех возможностей
- **[Индекс API](./API-INDEX.md)** - Справочник всех 278 методов
- **[Функциональный индекс](./FUNCTIONAL-INDEX.md)** - Поиск методов по функциональности
- **[Категории API](./categories/)** - Подробная документация по категориям

### 2. Ключевые API для изучения

**Новичкам:**
- [Products API](./categories/products.md) - Управление товарами (создание, редактирование, поиск)
- Цены и остатки - Обновление цен и складских остатков
- FBS API - Заказы с фулфилментом от продавца

**Продвинутым:**
- [Finance API](./categories/finance.md) - Финансовая отчетность (баланс, транзакции, отчеты)
- Review API - Работа с отзывами (Premium Plus)
- [Analytics API](./categories/analytics.md) - Аналитика (популярные товары, средние цены)

### 3. Изучите паттерны интеграции

```typescript
// Пример архитектуры приложения
class OzonIntegration {
  constructor(private api: OzonSellerAPI) {}
  
  // Модуль товаров
  products = new ProductManager(this.api);
  
  // Модуль заказов
  orders = new OrderProcessor(this.api);
  
  // Модуль финансов
  finance = new FinanceTracker(this.api);
  
  // Модуль аналитики
  analytics = new AnalyticsService(this.api);
}
```

### 4. Настройте мониторинг

```typescript
// Логирование и мониторинг
const api = new OzonSellerAPI({
  clientId: 'your-client-id',
  apiKey: 'your-api-key',
  debug: true,
  onRequest: (config) => {
    console.log('📤 Request:', config.url);
  },
  onResponse: (response) => {
    console.log('📥 Response:', response.status);
  },
  onError: (error) => {
    console.error('❌ Error:', error.message);
    // Отправка в систему мониторинга
  }
});
```

### 5. Реализуйте обработку ошибок

```typescript
// Универсальная функция с повторными попытками
async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3
): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      console.error(`Попытка ${attempt}/${maxRetries} не удалась:`, error.message);
      
      if (attempt === maxRetries) {
        throw error;
      }
      
      // Экспоненциальная задержка
      const delay = Math.pow(2, attempt) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw new Error('Все попытки исчерпаны');
}

// Использование
const products = await withRetry(() => 
  api.product.getList({ limit: 100 })
);
```

## 🎯 Полезные ресурсы

### SDK и документация
- **[GitHub репозиторий](https://github.com/salacoste/ozon-daytona-seller-api)** - Исходный код и Issues
- **[NPM пакет](https://www.npmjs.com/package/daytona-ozon-seller-api)** - Установка и обновления
- **[Интеграционные паттерны](./INTEGRATION-PATTERNS.md)** - Архитектурные решения
- **[Примеры фреймворков](./FRAMEWORK-INTEGRATION.md)** - Готовые примеры Next.js, Express, NestJS

### Официальные ресурсы OZON
- [OZON API Documentation](https://docs.ozon.ru/api/seller/)
- [Центр помощи продавцов](https://help.ozon.ru/)
- [Сообщество разработчиков](https://t.me/ozon_api_chat)

### Инструменты разработчика
- [Postman коллекция](https://www.postman.com/ozon-api)
- [OpenAPI спецификация](https://api-seller.ozon.ru/docs/openapi.json)
- [Онлайн песочница](https://api-seller.ozon.ru/docs/)

### Поддержка SDK
- **Issues**: https://github.com/salacoste/ozon-daytona-seller-api/issues
- **Discussions**: https://github.com/salacoste/ozon-daytona-seller-api/discussions  
- **Pull Requests**: https://github.com/salacoste/ozon-daytona-seller-api/pulls

---

**🎉 Поздравляем!** Теперь вы готовы к работе с **daytona-ozon-seller-api** SDK. Начните с простых операций и постепенно изучайте более сложные возможности системы.

**Нужна помощь?** Обратитесь к подробной документации, создайте Issue на GitHub или обратитесь в официальное сообщество разработчиков OZON.