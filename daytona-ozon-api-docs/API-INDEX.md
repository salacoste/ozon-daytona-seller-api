# OZON Seller API - Полный индекс методов

Справочник всех 278 endpoints, организованных по категориям и функциональности.

## 📊 Сводная статистика

- **Всего категорий API:** 33
- **Всего endpoints:** 278
- **Premium Plus методы:** 15
- **Экспериментальные методы:** 9

## 🔍 Поиск по категориям

### A
- **[Analytics API](./01-analytics-api.md)** (2 методa)
  - `getStockOnWarehouses()` - Аналитика остатков
  - `getStockOnWarehousesV2()` - Аналитика остатков v2

### B
- **[Barcode API](./02-barcode-api.md)** (2 методa)
  - `generateBarcode()` - Генерация штрих-кода
  - `createTaskBarcodes()` - Создание задачи генерации

- **[Beta Method API](./03-beta-method-api.md)** (9 методов)
  - `getProductsRatingBySku()` - Рейтинг товара по SKU
  - `getProductsStocksV4()` - Остатки товаров v4
  - `getProductsInfoStocksV4()` - Информация и остатки v4
  - `getProductsInfoListV4()` - Список товаров v4
  - `getProductsPricesV4()` - Цены товаров v4
  - `updateProductsPricesV4()` - Обновление цен v4
  - `updateProductsStocksV4()` - Обновление остатков v4
  - `getProductsCampaignProducts()` - Товары кампании
  - `getBrandCompanyCertificationList()` - Сертификаты бренда

- **[Brand API](./04-brand-api.md)** (1 метод)
  - `getBrandsList()` - Список брендов

### C
- **[Cancellation API](./05-cancellation-api.md)** (7 методов)
  - `getFbsCancellationReasonsList()` - Причины отмен FBS
  - `getFboCancellationReasonsList()` - Причины отмен FBO
  - `cancelFbsOrder()` - Отмена заказа FBS
  - `cancelFboOrder()` - Отмена заказа FBO
  - `getCancellationReasons()` - Все причины отмен
  - `submitCancellation()` - Подача заявки на отмену
  - `getCancellationInfo()` - Информация об отмене

- **[Category API](./06-category-api.md)** (6 методов)
  - `getCategoryTree()` - Дерево категорий
  - `getCategoryAttributes()` - Атрибуты категории
  - `getCategoryAttributeValues()` - Значения атрибутов
  - `searchCategoryByName()` - Поиск категории по имени
  - `getCategoryAttributeValue()` - Значение атрибута
  - `getCategoryDescription()` - Описание категории

- **[Certification API](./07-certification-api.md)** (12 методов)
  - `getCertificationList()` - Список сертификатов
  - `getCertificationInfo()` - Информация о сертификате
  - `createCertification()` - Создание сертификата
  - `updateCertification()` - Обновление сертификата
  - `deleteCertification()` - Удаление сертификата
  - `submitCertificationForReview()` - Отправка на модерацию
  - `getCertificationReviewStatus()` - Статус модерации
  - `bindCertificationToProducts()` - Привязка к товарам
  - `unbindCertificationFromProducts()` - Отвязка от товаров
  - `getCertificationBoundProducts()` - Привязанные товары
  - `downloadCertificationDocument()` - Скачать документ
  - `uploadCertificationDocument()` - Загрузить документ

- **[Chat API](./08-chat-api.md)** (8 методов)
  - `getChatList()` - Список чатов
  - `getChatHistory()` - История сообщений
  - `sendMessage()` - Отправка сообщения
  - `sendFile()` - Отправка файла
  - `markChatAsRead()` - Отметить как прочитанное
  - `getUnreadChatsCount()` - Количество непрочитанных
  - `updateChatSettings()` - Настройки чата
  - `getChatInfo()` - Информация о чате

### D
- **[Delivery FBS API](./09-delivery-fbs-api.md)** (18 методов)
  - `getFbsDeliveryList()` - Список отправлений FBS
  - `createFbsDelivery()` - Создание отправления
  - `cancelFbsDelivery()` - Отмена отправления
  - `getFbsDeliveryLabels()` - Ярлыки отправлений
  - `getFbsDeliveryManifest()` - Манифест
  - `confirmFbsDelivery()` - Подтверждение передачи
  - `getFbsDeliveryRestrictions()` - Ограничения доставки
  - `calculateFbsDeliveryCost()` - Расчет стоимости
  - `getFbsDeliveryTimeslots()` - Временные слоты
  - `bookFbsDeliveryTimeslot()` - Бронирование слота
  - `getFbsDeliveryTariffs()` - Тарифы доставки
  - `getDeliveryVariants()` - Варианты доставки
  - `createDeliveryRequest()` - Заявка на доставку
  - `getDeliveryTrackingInfo()` - Трекинг доставки
  - `updateDeliveryDimensions()` - Обновление габаритов
  - `getDeliveryActs()` - Акты доставки
  - `confirmDeliveryAct()` - Подтверждение акта
  - `getDeliveryStatistics()` - Статистика доставки

- **[Delivery RFBS API](./10-delivery-rfbs-api.md)** (8 методов)
  - `getRfbsDeliveryList()` - Список доставок rFBS
  - `createRfbsDelivery()` - Создание доставки
  - `getRfbsDeliveryLabels()` - Ярлыки rFBS
  - `getRfbsTimeslots()` - Временные слоты
  - `bookRfbsTimeslot()` - Бронирование слота
  - `getRfbsDeliveryCost()` - Стоимость доставки
  - `confirmRfbsDelivery()` - Подтверждение доставки
  - `getRfbsDeliveryManifest()` - Манифест rFBS

- **[Digital API](./11-digital-api.md)** (4 метода)
  - `getDigitalProductsList()` - Список цифровых товаров
  - `createDigitalProduct()` - Создание цифрового товара
  - `updateDigitalProduct()` - Обновление товара
  - `deleteDigitalProduct()` - Удаление товара

### F
- **[FBO API](./12-fbo-api.md)** (13 методов)
  - `getFboOrdersList()` - Список заказов FBO
  - `getFboOrderInfo()` - Информация о заказе
  - `getFboOrderItems()` - Товары заказа
  - `updateFboOrderTracking()` - Обновление трекинга
  - `getFboOrderShipment()` - Информация об отгрузке
  - `createFboOrderShipment()` - Создание отгрузки
  - `getFboOrderLabels()` - Ярлыки заказов
  - `getFboOrderDocuments()` - Документы заказа
  - `getFboOrderHistory()` - История заказа
  - `getFboOrderFinance()` - Финансы заказа
  - `getFboActsList()` - Список актов
  - `getFboActInfo()` - Информация об акте
  - `confirmFboAct()` - Подтверждение акта

- **[FBO Supply Request API](./11-fbo-supply-request-api.md)** (19 методов)
  - `getSupplyRequestsList()` - Список заявок поставки
  - `createSupplyRequest()` - Создание заявки
  - `getSupplyRequestInfo()` - Информация о заявке
  - `updateSupplyRequest()` - Обновление заявки
  - `deleteSupplyRequest()` - Удаление заявки
  - `submitSupplyRequest()` - Подача заявки
  - `getSupplyRequestItems()` - Товары заявки
  - `addSupplyRequestItems()` - Добавление товаров
  - `updateSupplyRequestItems()` - Обновление товаров
  - `removeSupplyRequestItems()` - Удаление товаров
  - `getSupplyRequestLabels()` - Ярлыки заявки
  - `getSupplyRequestDocuments()` - Документы заявки
  - `getSupplyRequestTimeslots()` - Временные слоты
  - `bookSupplyRequestTimeslot()` - Бронирование слота
  - `confirmSupplyRequestDelivery()` - Подтверждение доставки
  - `getSupplyRequestHistory()` - История заявки
  - `getSupplyRequestFinance()` - Финансы заявки
  - `getSupplyRequestRestrictions()` - Ограничения заявки
  - `calculateSupplyRequestCost()` - Расчет стоимости

- **[FBS API](./14-fbs-api.md)** (22 метода)
  - `getFbsOrdersList()` - Список заказов FBS
  - `getFbsOrderInfo()` - Информация о заказе
  - `packFbsOrder()` - Упаковка заказа
  - `shipFbsOrder()` - Отгрузка заказа
  - `getFbsOrderLabels()` - Ярлыки заказов
  - `getFbsOrderDocuments()` - Документы заказа
  - `updateFbsOrderTracking()` - Обновление трекинга
  - `getFbsOrderItems()` - Товары заказа
  - `getFbsOrderFinance()` - Финансы заказа
  - `getFbsOrderHistory()` - История заказа
  - `getFbsActsList()` - Список актов
  - `getFbsActInfo()` - Информация об акте
  - `confirmFbsAct()` - Подтверждение акта
  - `getFbsSupplyOrders()` - Заказы поставки
  - `createFbsSupplyOrder()` - Создание поставки
  - `getFbsArbitrageList()` - Список арбитражей
  - `createFbsArbitrage()` - Создание арбитража
  - `getFbsArbitrageInfo()` - Информация об арбитраже
  - `getFbsCertificatesList()` - Список сертификатов
  - `uploadFbsCertificate()` - Загрузка сертификата
  - `getFbsRestrictionsList()` - Список ограничений
  - `getFbsStatistics()` - Статистика FBS

- **[FBS RFBS Marks API](./13-fbs-rfbs-marks-api.md)** (13 методов)
  - `getMarksList()` - Список маркировок
  - `createMark()` - Создание маркировки
  - `getMarkInfo()` - Информация о маркировке
  - `updateMark()` - Обновление маркировки
  - `deleteMark()` - Удаление маркировки
  - `bindMarksToOrder()` - Привязка к заказу
  - `unbindMarksFromOrder()` - Отвязка от заказа
  - `getOrderMarks()` - Маркировки заказа
  - `verifyMark()` - Проверка маркировки
  - `getMarkHistory()` - История маркировки
  - `generateMarksReport()` - Отчет по маркировкам
  - `uploadMarksFile()` - Загрузка файла маркировок
  - `downloadMarksTemplate()` - Шаблон маркировок

- **[Finance API](./15-finance-api.md)** (10 методов)
  - `getTransactionsList()` - Список транзакций
  - `getTransactionInfo()` - Информация о транзакции
  - `getAccountBalance()` - Баланс счета
  - `getFinanceReport()` - Финансовый отчет
  - `getRealizationReport()` - Отчет о реализации
  - `getCommissionReport()` - Отчет о комиссиях
  - `getPayoutsList()` - Список выплат
  - `getPayoutInfo()` - Информация о выплате
  - `requestPayout()` - Запрос выплаты
  - `getTaxInfo()` - Налоговая информация

### P
- **[Pass API](./16-pass-api.md)** (7 методов)
  - `getPassesList()` - Список пропусков
  - `createPass()` - Создание пропуска
  - `getPassInfo()` - Информация о пропуске
  - `updatePass()` - Обновление пропуска
  - `deletePass()` - Удаление пропуска
  - `activatePass()` - Активация пропуска
  - `deactivatePass()` - Деактивация пропуска

- **[Polygon API](./17-polygon-api.md)** (4 метода)
  - `getPolygonInfo()` - Информация о полигоне
  - `getPolygonOrders()` - Заказы полигона
  - `createPolygonOrder()` - Создание заказа
  - `updatePolygonOrder()` - Обновление заказа

- **[Premium API](./18-premium-api.md)** (8 методов)
  - `getPremiumInfo()` - Информация о Premium
  - `getPremiumServices()` - Premium сервисы
  - `activatePremiumService()` - Активация сервиса
  - `deactivatePremiumService()` - Деактивация сервиса
  - `getPremiumHistory()` - История Premium
  - `getPremiumBalance()` - Баланс Premium
  - `getPremiumTariffs()` - Тарифы Premium
  - `changePremiumTariff()` - Смена тарифа

- **[Prices Stocks API](./19-prices-stocks-api.md)** (9 методов)
  - `getPricesList()` - Список цен
  - `updatePrices()` - Обновление цен
  - `getStocksList()` - Список остатков
  - `updateStocks()` - Обновление остатков
  - `getPricesInfo()` - Информация о ценах
  - `getStocksInfo()` - Информация об остатках
  - `getWarehouseStocks()` - Остатки по складам
  - `updateWarehouseStocks()` - Обновление остатков склада
  - `getStocksHistory()` - История остатков

- **[Pricing Strategy API](./20-pricing-strategy-api.md)** (12 методов)
  - `getPricingStrategiesList()` - Список стратегий
  - `createPricingStrategy()` - Создание стратегии
  - `getPricingStrategyInfo()` - Информация о стратегии
  - `updatePricingStrategy()` - Обновление стратегии
  - `deletePricingStrategy()` - Удаление стратегии
  - `activatePricingStrategy()` - Активация стратегии
  - `deactivatePricingStrategy()` - Деактивация стратегии
  - `bindProductsToPricingStrategy()` - Привязка товаров
  - `unbindProductsFromPricingStrategy()` - Отвязка товаров
  - `getPricingStrategyProducts()` - Товары стратегии
  - `getPricingStrategyHistory()` - История стратегии
  - `getPricingStrategyStatistics()` - Статистика стратегии

- **[Product API](./22-product-api.md)** (23 метода)
  - `getProductsList()` - Список товаров
  - `getProductInfo()` - Информация о товаре
  - `createProduct()` - Создание товара
  - `updateProduct()` - Обновление товара
  - `deleteProduct()` - Удаление товара
  - `getProductsInfo()` - Информация о товарах
  - `updateProductsInfo()` - Обновление товаров
  - `getProductAttributes()` - Атрибуты товара
  - `updateProductAttributes()` - Обновление атрибутов
  - `getProductImages()` - Изображения товара
  - `uploadProductImage()` - Загрузка изображения
  - `deleteProductImage()` - Удаление изображения
  - `getProductVideos()` - Видео товара
  - `uploadProductVideo()` - Загрузка видео
  - `deleteProductVideo()` - Удаление видео
  - `getProductDescriptions()` - Описания товара
  - `updateProductDescriptions()` - Обновление описаний
  - `getProductsStatus()` - Статусы товаров
  - `archiveProducts()` - Архивация товаров
  - `unarchiveProducts()` - Разархивация товаров
  - `getProductsImportStatus()` - Статус импорта
  - `importProducts()` - Импорт товаров
  - `exportProducts()` - Экспорт товаров

- **[Promos API](./23-promos-api.md)** (8 методов)
  - `getPromosList()` - Список акций
  - `createPromo()` - Создание акции
  - `getPromoInfo()` - Информация об акции
  - `updatePromo()` - Обновление акции
  - `deletePromo()` - Удаление акции
  - `activatePromo()` - Активация акции
  - `deactivatePromo()` - Деактивация акции
  - `getPromoStatistics()` - Статистика акции

### Q
- **[Quants API](./24-quants-api.md)** (2 метода)
  - `getQuantsProductsList()` - Список товаров Quants
  - `getQuantsProductInfo()` - Информация о товаре Quants

- **[Questions Answers API](./25-questions-answers-api.md)** (8 методов) *Premium Plus*
  - `getQuestionsList()` - Список вопросов
  - `getQuestionInfo()` - Информация о вопросе
  - `answerQuestion()` - Ответ на вопрос
  - `updateAnswer()` - Обновление ответа
  - `deleteAnswer()` - Удаление ответа
  - `getAnswersList()` - Список ответов
  - `getAnswerInfo()` - Информация об ответе
  - `getQuestionsStatistics()` - Статистика вопросов

### R
- **[Report API](./26-report-api.md)** (8 методов)
  - `getReportsList()` - Список отчетов
  - `createReport()` - Создание отчета
  - `getReportInfo()` - Информация об отчете
  - `downloadReport()` - Скачивание отчета
  - `deleteReport()` - Удаление отчета
  - `getReportTypes()` - Типы отчетов
  - `scheduleReport()` - Запланировать отчет
  - `getScheduledReports()` - Запланированные отчеты

- **[Return API](./27-return-api.md)** (8 методов)
  - `getReturnsList()` - Список возвратов
  - `getReturnInfo()` - Информация о возврате
  - `processReturn()` - Обработка возврата
  - `approveReturn()` - Одобрение возврата
  - `rejectReturn()` - Отклонение возврата
  - `getReturnReasons()` - Причины возвратов
  - `updateReturnStatus()` - Обновление статуса
  - `getReturnStatistics()` - Статистика возвратов

- **[Returns API](./28-returns-api.md)** (1 метод)
  - `getReturnsList()` - Список возвратов FBO/FBS

- **[Review API](./29-review-api.md)** (7 методов) *Premium Plus*
  - `getReviewsList()` - Список отзывов
  - `getReviewInfo()` - Информация об отзыве
  - `createComment()` - Создание комментария
  - `deleteComment()` - Удаление комментария
  - `getCommentsList()` - Список комментариев
  - `changeStatus()` - Изменение статуса
  - `getCount()` - Количество отзывов

- **[RFBS Returns API](./30-rfbs-returns-api.md)** (8 методов)
  - `setAction()` - Действия с возвратом
  - `getReturn()` - Информация о возврате
  - `getReturnsList()` - Список возвратов rFBS
  - `compensate()` - Компенсация (устарел)
  - `receiveReturn()` - Получение возврата (устарел)
  - `reject()` - Отклонение возврата (устарел)
  - `returnMoney()` - Возврат денег (устарел)
  - `verify()` - Одобрение возврата (устарел)

### S
- **[Seller Rating API](./31-seller-rating-api.md)** (2 метода)
  - `getCurrentRatings()` - Текущие рейтинги
  - `getRatingHistory()` - История рейтингов

- **[Supplier API](./32-supplier-api.md)** (4 метода)
  - `uploadInvoiceFile()` - Загрузка файла счета
  - `createOrUpdateInvoice()` - Создание/обновление счета
  - `getInvoice()` - Информация о счете
  - `deleteInvoice()` - Удаление счета

### W
- **[Warehouse API](./33-warehouse-api.md)** (2 метода)
  - `getWarehousesList()` - Список складов
  - `getDeliveryMethods()` - Методы доставки

## 🎯 Поиск по функциональности

### Управление товарами
- **Product API** - Создание, обновление, управление товарами (23 метода)
- **Category API** - Работа с категориями и атрибутами (6 методов)
- **Brand API** - Управление брендами (1 метод)
- **Barcode API** - Генерация штрих-кодов (2 метода)
- **Prices Stocks API** - Управление ценами и остатками (9 методов)

### Логистика и заказы
- **FBS API** - Заказы с доставкой продавцом (22 метода)
- **FBO API** - Заказы с доставкой OZON (13 методов)
- **Delivery FBS API** - Доставка FBS (18 методов)
- **Delivery RFBS API** - Доставка rFBS (8 методов)
- **FBO Supply Request API** - Заявки на поставку (19 методов)

### Возвраты и отмены
- **Return API** - Управление возвратами (8 методов)
- **Returns API** - Список возвратов (1 метод)
- **RFBS Returns API** - Возвраты rFBS (8 методов)
- **Cancellation API** - Отмены заказов (7 методов)

### Финансы и отчеты
- **Finance API** - Финансовые операции (10 методов)
- **Report API** - Бизнес-отчеты (8 методов)
- **Analytics API** - Аналитические данные (2 метода)

### Взаимодействие с клиентами
- **Review API** - Отзывы (7 методов) *Premium Plus*
- **Questions Answers API** - Вопросы и ответы (8 методов) *Premium Plus*
- **Chat API** - Чат с покупателями (8 методов)

### Маркетинг и продвижение
- **Promos API** - Акции и промо (8 методов)
- **Premium API** - Premium сервисы (8 методов)
- **Pricing Strategy API** - Стратегии ценообразования (12 методов)

### Специализированные функции
- **Digital API** - Цифровые товары (4 метода)
- **FBS RFBS Marks API** - Маркировка товаров (13 методов)
- **Certification API** - Сертификация (12 методов)
- **Supplier API** - Интеграция с поставщиками (4 метода)
- **Warehouse API** - Управление складами (2 метода)

### Рейтинги и качество
- **Seller Rating API** - Рейтинги продавца (2 метода)
- **Quants API** - Товары эконом-сегмента (2 метода)

### Экспериментальные и служебные
- **Beta Method API** - Экспериментальные методы (9 методов)
- **Pass API** - Пропуска и доступы (7 методов)
- **Polygon API** - Тестовая среда (4 метода)

## 🔐 Требования к доступу

### Стандартный доступ (263 метода)
Доступны всем зарегистрированным продавцам OZON.

### Premium Plus (15 методов)
Требуется подписка Premium Plus:
- **Review API** - все 7 методов
- **Questions Answers API** - все 8 методов

### Экспериментальные (9 методов)
Доступ может быть ограничен:
- **Beta Method API** - все 9 методов

## 📊 Группировка по HTTP методам

### POST методы (278 методов)
Все методы OZON Seller API используют POST для единообразия и поддержки сложных параметров.

## 🏷️ Теги и метки

### Основные теги
- `товары` - Product, Category, Brand APIs
- `заказы` - FBS, FBO, Cancellation APIs  
- `доставка` - Delivery FBS, Delivery RFBS APIs
- `финансы` - Finance, Report APIs
- `склады` - Warehouse, Prices Stocks APIs
- `клиенты` - Review, Questions, Chat APIs
- `маркетинг` - Promos, Premium APIs
- `возвраты` - Return, Returns, RFBS Returns APIs

### Специальные метки
- 🔒 **Premium Plus** - требует подписки
- 🧪 **Beta** - экспериментальные методы
- ⚠️ **Deprecated** - устаревшие методы
- 🆕 **New** - новые методы в API

## 🔍 Быстрый поиск методов

### По ключевым словам
- **create** - создание (15 методов)
- **update** - обновление (18 методов)
- **delete** - удаление (12 методов)
- **get** - получение данных (180+ методов)
- **list** - списки (45+ методов)
- **info** - детальная информация (25+ методов)

### По типу операций
- **CRUD операции** - создание, чтение, обновление, удаление
- **Batch операции** - массовые операции
- **File операции** - работа с файлами
- **Report операции** - генерация отчетов
- **Status операции** - изменение статусов

## 📋 Часто используемые комбинации

### Управление товарами
```typescript
// Полный цикл работы с товаром
api.product.create() → api.pricesStocks.updatePrices() → api.pricesStocks.updateStocks()
```

### Обработка заказов FBS
```typescript
// Цикл обработки заказа
api.fbs.getOrdersList() → api.fbs.packOrder() → api.fbs.shipOrder()
```

### Работа с отзывами
```typescript
// Управление отзывами
api.review.getList() → api.review.createComment() → api.review.changeStatus()
```

### Финансовая отчетность
```typescript
// Финансовый анализ
api.finance.getTransactionsList() → api.finance.getRealizationReport() → api.report.createReport()
```

---

**Общее количество методов:** 278  
**Последнее обновление:** 2024-01-15  
**Версия API:** v2/v3