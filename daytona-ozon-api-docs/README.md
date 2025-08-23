# OZON Seller API SDK - Документация

Полная документация для SDK OZON Seller API с 278 endpoints в 33 категориях.

## 📚 Обзор

Этот SDK предоставляет полный доступ к API OZON для продавцов, включая все основные функции управления товарами, заказами, складами, финансами и аналитикой.

### 🎯 Основные возможности

- **Управление товарами** - создание, редактирование, управление остатками и ценами
- **Обработка заказов** - FBO/FBS заказы, доставка, отслеживание
- **Складская логистика** - управление складами, поставками, возвратами
- **Финансовая отчетность** - транзакции, комиссии, выплаты
- **Маркетинг и продвижение** - акции, реклама, аналитика
- **Взаимодействие с клиентами** - отзывы, вопросы, чат поддержка

## 🚀 Быстрый старт

### Установка

```bash
npm install bmad-ozon-seller-api
```

### Инициализация

```typescript
import { OzonSellerAPI } from 'bmad-ozon-seller-api';

const api = new OzonSellerAPI({
  clientId: 'your-client-id',
  apiKey: 'your-api-key'
});
```

### Первый запрос

```typescript
// Получить информацию о продавце
const sellerInfo = await api.seller.getInfo();
console.log('Продавец:', sellerInfo.name);

// Получить список товаров
const products = await api.product.getList({ limit: 10 });
console.log(`Найдено товаров: ${products.total}`);
```

## 📖 Категории API

### 🛍️ Управление товарами
- **[Product API](./22-product-api.md)** - Основное управление товарами (23 endpoints)
- **[Category API](./06-category-api.md)** - Работа с категориями (6 endpoints)
- **[Brand API](./04-brand-api.md)** - Управление брендами (1 endpoint)
- **[Barcode API](./02-barcode-api.md)** - Генерация штрих-кодов (2 endpoints)

### 📦 Заказы и логистика
- **[FBO API](./12-fbo-api.md)** - Fulfillment by OZON (13 endpoints)
- **[FBS API](./14-fbs-api.md)** - Fulfillment by Seller (22 endpoints)
- **[FBO Supply Request API](./11-fbo-supply-request-api.md)** - Заявки на поставку FBO (19 endpoints)
- **[Delivery FBS API](./09-delivery-fbs-api.md)** - Доставка FBS (18 endpoints)
- **[Delivery RFBS API](./10-delivery-rfbs-api.md)** - Доставка rFBS (8 endpoints)

### 🏭 Склады и инвентарь
- **[Warehouse API](./33-warehouse-api.md)** - Управление складами (2 endpoints)
- **[Prices Stocks API](./19-prices-stocks-api.md)** - Цены и остатки (9 endpoints)
- **[Pricing Strategy API](./20-pricing-strategy-api.md)** - Стратегии ценообразования (12 endpoints)

### 💰 Финансы и платежи
- **[Finance API](./15-finance-api.md)** - Финансовая отчетность (10 endpoints)
- **[Report API](./26-report-api.md)** - Бизнес-отчеты (8 endpoints)
- **[Analytics API](./01-analytics-api.md)** - Аналитические данные (2 endpoints)

### 🔄 Возвраты и отмены
- **[Return API](./27-return-api.md)** - Управление возвратами (8 endpoints)
- **[Returns API](./28-returns-api.md)** - Список возвратов (1 endpoint)
- **[RFBS Returns API](./30-rfbs-returns-api.md)** - Возвраты rFBS (8 endpoints)
- **[Cancellation API](./05-cancellation-api.md)** - Отмены заказов (7 endpoints)

### 🎯 Маркетинг и продвижение
- **[Promos API](./23-promos-api.md)** - Акции и промо-кампании (8 endpoints)
- **[Premium API](./18-premium-api.md)** - Premium сервисы (8 endpoints)
- **[Pricing Strategy API](./20-pricing-strategy-api.md)** - Стратегии ценообразования (12 endpoints)

### 👥 Взаимодействие с клиентами
- **[Review API](./29-review-api.md)** - Отзывы покупателей (7 endpoints) *Premium Plus*
- **[Questions Answers API](./25-questions-answers-api.md)** - Вопросы и ответы (8 endpoints) *Premium Plus*
- **[Chat API](./08-chat-api.md)** - Чат с покупателями (8 endpoints)

### 📊 Рейтинги и качество
- **[Seller Rating API](./31-seller-rating-api.md)** - Рейтинги продавца (2 endpoints)
- **[Quants API](./24-quants-api.md)** - Товары эконом-сегмента (2 endpoints)

### 🔧 Специализированные API
- **[Digital API](./11-digital-api.md)** - Цифровые товары (4 endpoints)
- **[FBS RFBS Marks API](./13-fbs-rfbs-marks-api.md)** - Маркировка товаров (13 endpoints)
- **[Certification API](./07-certification-api.md)** - Сертификация товаров (12 endpoints)
- **[Supplier API](./32-supplier-api.md)** - Интеграция с поставщиками (4 endpoints)

### 🧪 Экспериментальные и служебные
- **[Beta Method API](./03-beta-method-api.md)** - Экспериментальные методы (9 endpoints)
- **[Pass API](./16-pass-api.md)** - Пропуска и доступы (7 endpoints)
- **[Polygon API](./17-polygon-api.md)** - Тестовая среда (4 endpoints)

## 🛡️ Требования к подписке

Некоторые API требуют специальных подписок:

### Premium Plus (требуется подписка)
- **Review API** - Управление отзывами
- **Questions Answers API** - Вопросы и ответы

### Все остальные API доступны для всех продавцов

## 📋 Типовые сценарии использования

### 1. Создание и управление товарами

```typescript
// Создание товара
const newProduct = await api.product.create({
  name: 'Новый товар',
  category_id: 12345,
  price: '1000',
  // ... другие параметры
});

// Обновление остатков
await api.pricesStocks.updateStocks([{
  product_id: newProduct.product_id,
  stock: 100
}]);

// Обновление цены
await api.pricesStocks.updatePrices([{
  product_id: newProduct.product_id,
  price: '1200'
}]);
```

### 2. Обработка заказов FBS

```typescript
// Получение новых заказов
const orders = await api.fbs.getOrdersList({
  filter: { status: 'awaiting_packaging' },
  limit: 50
});

// Сборка заказа
for (const order of orders.result) {
  await api.fbs.packOrder({
    posting_number: order.posting_number,
    packages: [/* пакеты */]
  });
  
  // Передача в доставку
  await api.fbs.shipOrder({
    posting_number: order.posting_number,
    tracking_number: 'TRACK123'
  });
}
```

### 3. Управление финансами

```typescript
// Получение транзакций за месяц
const transactions = await api.finance.getTransactionsList({
  filter: {
    date: {
      from: '2024-01-01T00:00:00Z',
      to: '2024-01-31T23:59:59Z'
    }
  }
});

// Анализ доходов и расходов
const totalIncome = transactions.result
  .filter(t => t.operation_type === 'ClientReturnAgentOperation')
  .reduce((sum, t) => sum + parseFloat(t.amount), 0);

console.log('Доход за месяц:', totalIncome);
```

### 4. Работа с отзывами (Premium Plus)

```typescript
// Получение новых отзывов
const reviews = await api.review.getList({
  status: 'UNPROCESSED',
  limit: 20
});

// Ответ на отзыв
for (const review of reviews.reviews) {
  await api.review.createComment({
    review_id: review.id,
    text: 'Спасибо за отзыв! Учтем ваши пожелания.',
    mark_review_as_processed: true
  });
}
```

## 🔄 Интеграционные паттерны

### Синхронизация товаров
```typescript
class ProductSynchronizer {
  async syncProducts() {
    // 1. Получить товары из внешней системы
    // 2. Сравнить с товарами в OZON
    // 3. Создать/обновить товары
    // 4. Синхронизировать остатки и цены
    // 5. Обновить изображения и описания
  }
}
```

### Автоматизация заказов
```typescript
class OrderAutomation {
  async processOrders() {
    // 1. Получить новые заказы
    // 2. Проверить доступность товаров
    // 3. Собрать и упаковать заказы
    // 4. Передать в службу доставки
    // 5. Отправить уведомления покупателям
  }
}
```

### Мониторинг рейтингов
```typescript
class RatingMonitor {
  async monitorRatings() {
    // 1. Получить текущие рейтинги
    // 2. Сравнить с пороговыми значениями
    // 3. Отправить предупреждения при ухудшении
    // 4. Сгенерировать рекомендации по улучшению
  }
}
```

## 🛠️ Утилиты и хелперы

### Batch операции
```typescript
// Массовое обновление цен
const batchUpdatePrices = async (products: ProductPrice[]) => {
  const batches = chunkArray(products, 1000); // Разбиваем на батчи
  
  for (const batch of batches) {
    await api.pricesStocks.updatePrices(batch);
    await delay(1000); // Соблюдаем лимиты API
  }
};
```

### Обработка ошибок
```typescript
const withRetry = async <T>(
  operation: () => Promise<T>,
  maxRetries: number = 3
): Promise<T> => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      if (attempt === maxRetries) throw error;
      await delay(Math.pow(2, attempt) * 1000);
    }
  }
  throw new Error('All retries failed');
};
```

## 📊 Мониторинг и метрики

### Основные метрики для отслеживания
- **Конверсия заказов** - процент успешно обработанных заказов
- **Время обработки** - среднее время от заказа до отгрузки
- **Рейтинг продавца** - динамика основных показателей
- **Остатки товаров** - контроль наличия популярных позиций
- **Финансовые показатели** - доходы, расходы, рентабельность

### Система алертов
- Критическое снижение рейтинга
- Заканчивающиеся остатки товаров
- Проблемы с заказами
- Финансовые аномалии

## 🔐 Безопасность

### Управление API ключами
- Регулярная ротация ключей
- Ограничение доступа по IP
- Логирование всех запросов
- Мониторинг подозрительной активности

### Лимиты запросов
- **Стандартные операции**: 1000 запросов/минуту
- **Тяжелые операции**: 100 запросов/минуту
- **Загрузка файлов**: 50 запросов/минуту

### Лучшие практики
- Кэширование данных для снижения нагрузки
- Batch операции для массовых обновлений
- Асинхронная обработка для длительных операций
- Graceful degradation при недоступности API

## 🐛 Отладка и диагностика

### Логирование
```typescript
const api = new OzonSellerAPI({
  clientId: 'your-client-id',
  apiKey: 'your-api-key',
  debug: true // Включение подробного логирования
});
```

### Типичные проблемы и решения

**401 Unauthorized**
- Проверьте корректность Client ID и API Key
- Убедитесь, что ключи не истекли

**429 Too Many Requests**
- Реализуйте exponential backoff
- Используйте batch операции
- Добавьте задержки между запросами

**422 Validation Error**
- Проверьте корректность передаваемых данных
- Используйте TypeScript для валидации типов
- Изучите документацию конкретного метода

## 📞 Поддержка

### Официальная документация
- [OZON Seller API](https://docs.ozon.ru/api/seller/)
- [Центр помощи продавцов](https://help.ozon.ru/hc/ru/categories/360000101954)

### Сообщество разработчиков
- [Telegram канал](https://t.me/ozon_api_chat)
- [GitHub Issues](https://github.com/your-repo/issues)

### Техническая поддержка
- Email: api-support@ozon.ru
- Форма обратной связи в личном кабинете продавца

---

## 📝 Лицензия

MIT License - см. файл LICENSE для деталей.

## 🤝 Вклад в развитие

Мы приветствуем вклад сообщества! См. CONTRIBUTING.md для инструкций по внесению изменений.

---

**Версия документации:** 1.0.0  
**Дата обновления:** 2024-01-15  
**Покрытие API:** 278 endpoints в 33 категориях  
**Совместимость:** OZON Seller API v2/v3