# 🎯 Функциональный индекс методов OZON Seller API

Навигация по 278 методам API, сгруппированных по функциональности для быстрого поиска решений.

## 📦 Управление товарами

### Создание и редактирование товаров
- **[product.create()](./22-product-api.md#create)** - Создание новых товаров
- **[product.importByGtin()](./22-product-api.md#importByGtin)** - Импорт по штрих-коду GTIN
- **[product.updateRequirements()](./22-product-api.md#updateRequirements)** - Обновление обязательных атрибутов
- **[product.updateStatus()](./22-product-api.md#updateStatus)** - Управление статусом товара
- **[product.delete()](./22-product-api.md#delete)** - Удаление товаров
- **[product.edit()](./22-product-api.md#edit)** - Редактирование атрибутов

### Поиск и получение информации о товарах
- **[product.getList()](./22-product-api.md#getList)** - Список товаров с фильтрацией
- **[product.getInfo()](./22-product-api.md#getInfo)** - Подробная информация о товаре
- **[product.getInfoV3()](./22-product-api.md#getInfoV3)** - Расширенная информация (v3)
- **[product.getInfoStocks()](./22-product-api.md#getInfoStocks)** - Остатки товаров
- **[product.getInfoPrices()](./22-product-api.md#getInfoPrices)** - Цены товаров
- **[product.getInfoDescription()](./22-product-api.md#getInfoDescription)** - Описания товаров
- **[product.getIncomingEntries()](./22-product-api.md#getIncomingEntries)** - Входящие поставки

### Цены и остатки
- **[pricesStocks.getInfo()](./20-prices-stocks-api.md#getInfo)** - Информация о ценах и остатках
- **[pricesStocks.updatePrices()](./20-prices-stocks-api.md#updatePrices)** - Обновление цен
- **[pricesStocks.updateStocks()](./20-prices-stocks-api.md#updateStocks)** - Обновление остатков
- **[pricesStocks.updateDiscounts()](./20-prices-stocks-api.md#updateDiscounts)** - Управление скидками

### Категории и атрибуты
- **[category.getTree()](./06-category-api.md#getTree)** - Дерево категорий
- **[category.getAttributes()](./06-category-api.md#getAttributes)** - Атрибуты категории
- **[category.getAttributeValues()](./06-category-api.md#getAttributeValues)** - Значения атрибутов

### Бренды и штрих-коды
- **[brand.getBrandsCertificationList()](./04-brand-api.md#getBrandsCertificationList)** - Сертификация брендов
- **[barcode.create()](./02-barcode-api.md#create)** - Создание штрих-кодов
- **[barcode.getInfo()](./02-barcode-api.md#getInfo)** - Информация о штрих-кодах

## 🚚 Управление заказами

### Заказы FBS (Fulfillment by Seller)
- **[fbs.getOrdersList()](./15-fbs-api.md#getOrdersList)** - Список заказов FBS
- **[fbs.getOrder()](./15-fbs-api.md#getOrder)** - Детальная информация о заказе
- **[fbs.packOrder()](./15-fbs-api.md#packOrder)** - Упаковка заказа
- **[fbs.shipOrder()](./15-fbs-api.md#shipOrder)** - Отправка в доставку
- **[fbs.getPackageLabel()](./15-fbs-api.md#getPackageLabel)** - Этикетки для упаковок
- **[fbs.getShipmentLabel()](./15-fbs-api.md#getShipmentLabel)** - Этикетки для отправлений

### Заказы FBO (Fulfillment by OZON)
- **[fbo.getOrdersList()](./13-fbo-api.md#getOrdersList)** - Список заказов FBO
- **[fbo.getOrder()](./13-fbo-api.md#getOrder)** - Информация о заказе FBO
- **[fbo.getShipmentInfo()](./13-fbo-api.md#getShipmentInfo)** - Информация об отправлении

### Доставка FBS
- **[deliveryFbs.getDeliveryVariants()](./09-delivery-fbs-api.md#getDeliveryVariants)** - Варианты доставки
- **[deliveryFbs.createDelivery()](./09-delivery-fbs-api.md#createDelivery)** - Создание заявки на доставку
- **[deliveryFbs.getDeliveryInfo()](./09-delivery-fbs-api.md#getDeliveryInfo)** - Статус доставки

### Доставка RFBS
- **[deliveryRfbs.getDeliveryVariants()](./10-delivery-rfbs-api.md#getDeliveryVariants)** - Варианты доставки RFBS
- **[deliveryRfbs.createDelivery()](./10-delivery-rfbs-api.md#createDelivery)** - Создание доставки RFBS

### Отмена заказов
- **[cancellation.getReasons()](./05-cancellation-api.md#getReasons)** - Причины отмены
- **[cancellation.cancelOrder()](./05-cancellation-api.md#cancelOrder)** - Отмена заказа
- **[cancellation.getCancellationInfo()](./05-cancellation-api.md#getCancellationInfo)** - Информация об отменах

## 💰 Финансы и отчетность

### Финансовая информация
- **[finance.getAccountBalance()](./16-finance-api.md#getAccountBalance)** - Текущий баланс
- **[finance.getTransactionsList()](./16-finance-api.md#getTransactionsList)** - История транзакций
- **[finance.getCashFlowStatement()](./16-finance-api.md#getCashFlowStatement)** - Отчет о движении денежных средств
- **[finance.getReportsInfo()](./16-finance-api.md#getReportsInfo)** - Информация об отчетах

### Отчеты и аналитика
- **[report.getStock()](./26-report-api.md#getStock)** - Отчет об остатках
- **[report.getDiscountedProducts()](./26-report-api.md#getDiscountedProducts)** - Товары со скидками
- **[report.getReturns()](./26-report-api.md#getReturns)** - Отчет по возвратам
- **[report.getOrders()](./26-report-api.md#getOrders)** - Отчет по заказам

### Аналитические данные
- **[analytics.getMostPopularSku()](./01-analytics-api.md#getMostPopularSku)** - Популярные товары
- **[analytics.getAveragePrice()](./01-analytics-api.md#getAveragePrice)** - Средние цены

## 🔄 Возвраты и обмены

### Управление возвратами FBS
- **[return.getReturns()](./27-return-api.md#getReturns)** - Список возвратов FBS
- **[return.getCompensations()](./27-return-api.md#getCompensations)** - Компенсации
- **[return.updateReturnTracking()](./27-return-api.md#updateReturnTracking)** - Трекинг возврата

### Возвраты RFBS
- **[rfbsReturns.setAction()](./30-rfbs-returns-api.md#setAction)** - Универсальные действия с возвратами
- **[rfbsReturns.getList()](./30-rfbs-returns-api.md#getList)** - Список возвратов RFBS
- **[rfbsReturns.getInfo()](./30-rfbs-returns-api.md#getInfo)** - Детальная информация

### Общие возвраты
- **[returns.getFboReturns()](./28-returns-api.md#getFboReturns)** - Возвраты FBO

## 🏭 Складская логистика

### Поставки FBO
- **[fboSupplyRequest.create()](./12-fbo-supply-request-api.md#create)** - Создание заявки на поставку
- **[fboSupplyRequest.getInfo()](./12-fbo-supply-request-api.md#getInfo)** - Информация о поставке
- **[fboSupplyRequest.cancel()](./12-fbo-supply-request-api.md#cancel)** - Отмена поставки

### Склады
- **[warehouse.getWarehousesList()](./33-warehouse-api.md#getWarehousesList)** - Список складов
- **[warehouse.getDeliveryMethods()](./33-warehouse-api.md#getDeliveryMethods)** - Методы доставки

### Маркировка товаров
- **[fbsRfbsMarks.create()](./14-fbs-rfbs-marks-api.md#create)** - Создание маркировки
- **[fbsRfbsMarks.getInfo()](./14-fbs-rfbs-marks-api.md#getInfo)** - Информация о маркировке

## 💬 Взаимодействие с покупателями

### Отзывы покупателей *Premium Plus*
- **[review.getList()](./29-review-api.md#getList)** - Список отзывов
- **[review.getInfo()](./29-review-api.md#getInfo)** - Детальная информация об отзыве
- **[review.createComment()](./29-review-api.md#createComment)** - Ответ на отзыв

### Вопросы и ответы *Premium Plus*
- **[questionsAnswers.getList()](./25-questions-answers-api.md#getList)** - Список вопросов
- **[questionsAnswers.createAnswer()](./25-questions-answers-api.md#createAnswer)** - Ответ на вопрос

### Чат с покупателями
- **[chat.getChatsList()](./08-chat-api.md#getChatsList)** - Список чатов
- **[chat.getChatHistory()](./08-chat-api.md#getChatHistory)** - История чата
- **[chat.sendMessage()](./08-chat-api.md#sendMessage)** - Отправка сообщения

## 🎯 Маркетинг и продвижение

### Акции и промокампании
- **[promos.getPromosList()](./23-promos-api.md#getPromosList)** - Список акций
- **[promos.getPromoProducts()](./23-promos-api.md#getPromoProducts)** - Товары в акциях
- **[promos.setPromoProducts()](./23-promos-api.md#setPromoProducts)** - Добавление товаров в акции

### Premium сервисы
- **[premium.getSubscriptions()](./19-premium-api.md#getSubscriptions)** - Подписки Premium
- **[premium.getUsageStats()](./19-premium-api.md#getUsageStats)** - Статистика использования

### Стратегии ценообразования
- **[pricingStrategy.getStrategies()](./21-pricing-strategy-api.md#getStrategies)** - Список стратегий
- **[pricingStrategy.createStrategy()](./21-pricing-strategy-api.md#createStrategy)** - Создание стратегии
- **[pricingStrategy.updateStrategy()](./21-pricing-strategy-api.md#updateStrategy)** - Обновление стратегии

## 📊 Качество и рейтинги

### Рейтинги продавца
- **[sellerRating.getCurrentRatings()](./31-seller-rating-api.md#getCurrentRatings)** - Текущие рейтинги
- **[sellerRating.getRatingHistory()](./31-seller-rating-api.md#getRatingHistory)** - История рейтингов

### Товары эконом-сегмента
- **[quants.getOrdersAnalytics()](./24-quants-api.md#getOrdersAnalytics)** - Аналитика заказов Quant
- **[quants.getForecast()](./24-quants-api.md#getForecast)** - Прогноз продаж

## 🔧 Специализированные API

### Цифровые товары
- **[digital.getKeys()](./11-digital-api.md#getKeys)** - Ключи цифровых товаров
- **[digital.createKey()](./11-digital-api.md#createKey)** - Создание ключа

### Сертификация товаров
- **[certification.getBrandList()](./07-certification-api.md#getBrandList)** - Список брендов для сертификации
- **[certification.createRequest()](./07-certification-api.md#createRequest)** - Создание заявки на сертификацию

### Работа с поставщиками
- **[supplier.getInvoices()](./32-supplier-api.md#getInvoices)** - Счета от поставщиков
- **[supplier.uploadInvoice()](./32-supplier-api.md#uploadInvoice)** - Загрузка счета

### Пропуска и доступы
- **[pass.create()](./17-pass-api.md#create)** - Создание пропуска
- **[pass.getInfo()](./17-pass-api.md#getInfo)** - Информация о пропуске

### Тестовая среда
- **[polygon.createProduct()](./18-polygon-api.md#createProduct)** - Тестовое создание товара
- **[polygon.getCategories()](./18-polygon-api.md#getCategories)** - Категории в тестовой среде

### Экспериментальные методы
- **[betaMethod.getNewFeatures()](./03-beta-method-api.md#getNewFeatures)** - Новые функции
- **[betaMethod.getProductSubscriptions()](./03-beta-method-api.md#getProductSubscriptions)** - Подписки на товары

## 🎯 Сценарии использования

### Запуск нового товара
1. **[category.getTree()](./06-category-api.md#getTree)** → Выбор категории
2. **[category.getAttributes()](./06-category-api.md#getAttributes)** → Получение атрибутов
3. **[product.create()](./22-product-api.md#create)** → Создание товара
4. **[pricesStocks.updateStocks()](./20-prices-stocks-api.md#updateStocks)** → Установка остатков
5. **[pricesStocks.updatePrices()](./20-prices-stocks-api.md#updatePrices)** → Установка цен

### Обработка заказов FBS
1. **[fbs.getOrdersList()](./15-fbs-api.md#getOrdersList)** → Получение новых заказов
2. **[fbs.packOrder()](./15-fbs-api.md#packOrder)** → Упаковка заказа
3. **[fbs.getPackageLabel()](./15-fbs-api.md#getPackageLabel)** → Печать этикетки
4. **[fbs.shipOrder()](./15-fbs-api.md#shipOrder)** → Передача в доставку

### Мониторинг производительности
1. **[sellerRating.getCurrentRatings()](./31-seller-rating-api.md#getCurrentRatings)** → Текущие рейтинги
2. **[analytics.getMostPopularSku()](./01-analytics-api.md#getMostPopularSku)** → Популярные товары
3. **[finance.getAccountBalance()](./16-finance-api.md#getAccountBalance)** → Финансовое состояние
4. **[report.getOrders()](./26-report-api.md#getOrders)** → Анализ заказов

### Работа с отзывами *(Premium Plus)*
1. **[review.getList()](./29-review-api.md#getList)** → Получение новых отзывов
2. **[review.getInfo()](./29-review-api.md#getInfo)** → Анализ отзыва
3. **[review.createComment()](./29-review-api.md#createComment)** → Ответ на отзыв

### Управление возвратами
1. **[return.getReturns()](./27-return-api.md#getReturns)** → Список возвратов
2. **[rfbsReturns.getInfo()](./30-rfbs-returns-api.md#getInfo)** → Детали возврата
3. **[rfbsReturns.setAction()](./30-rfbs-returns-api.md#setAction)** → Обработка возврата

## 🔍 Поиск по функциональности

### Создание сущностей
- Товары: `product.create()`, `product.importByGtin()`
- Заявки: `fboSupplyRequest.create()`, `deliveryFbs.createDelivery()`
- Маркировка: `fbsRfbsMarks.create()`
- Стратегии: `pricingStrategy.createStrategy()`

### Получение списков
- Товары: `product.getList()`, `product.getInfoStocks()`
- Заказы: `fbs.getOrdersList()`, `fbo.getOrdersList()`
- Финансы: `finance.getTransactionsList()`
- Отзывы: `review.getList()`, `questionsAnswers.getList()`

### Обновление данных
- Цены: `pricesStocks.updatePrices()`, `pricesStocks.updateDiscounts()`
- Остатки: `pricesStocks.updateStocks()`
- Товары: `product.updateStatus()`, `product.edit()`
- Возвраты: `return.updateReturnTracking()`

### Получение отчетов
- Склад: `report.getStock()`, `report.getReturns()`
- Финансы: `finance.getCashFlowStatement()`, `finance.getReportsInfo()`
- Аналитика: `analytics.getMostPopularSku()`, `quants.getOrdersAnalytics()`

---

**Навигация:**
- **[📖 Главная](./README.md)** - Обзор всех возможностей
- **[🚀 Быстрый старт](./QUICK-START.md)** - Начало работы за 5 минут
- **[🔧 Паттерны интеграции](./INTEGRATION-PATTERNS.md)** - Архитектурные решения
- **[📑 Алфавитный индекс](./API-INDEX.md)** - Все 278 методов по алфавиту

**Подписки:**
- ***Premium Plus*** - Требуется для работы с отзывами и вопросами покупателей
- Все остальные API доступны для всех продавцов

**Общее количество:** 278 endpoints в 33 категориях