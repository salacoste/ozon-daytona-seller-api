# OZON Seller API Documentation Structure

## 📋 Информация об API
- **Название**: Документация Ozon Seller API
- **Версия**: 2.1
- **OpenAPI**: 3.0.0
- **Дата генерации**: 09.08.2025, 19:28:42

## 📊 Статистика
- **Всего путей**: 263
- **Всего методов**: 263
- **Всего схем**: 1069
- **Групп методов**: 32

## 📁 Структура директорий

```
ozon-api-documentation/
├── INDEX.json                 # Главный индексный файл
├── README.md                  # Этот файл
├── general/                   # Общая информация
│   └── 00-api-info.json      # Информация об API
├── documentation/             # Документационные разделы
│   ├── 00-all-tags.json      # Полный список тегов
│   └── *.json                 # Группы документации
├── methods/                   # Основные методы API
│   ├── 01-*.json             # Группы методов
│   └── ...
├── beta/                      # Бета-методы
│   └── ...
├── push/                      # Пуш-уведомления
│   └── ...
├── appendix/                  # Приложения
│   └── ...
└── components/                # Компоненты и схемы
    ├── schemas*.json          # Схемы данных
    └── other-components.json  # Другие компоненты
```

## 🏷️ Группы тегов

### Общее описание
- **Количество тегов**: 5
- **Теги**: Introduction, Getting started, Auth, Environment, Process

### Методы Seller API
- **Количество тегов**: 28
- **Теги**: CategoryAPI, ProductAPI, BarcodeAPI, Prices&StocksAPI, Promos, PricingStrategyAPI, BrandAPI, CertificationAPI, WarehouseAPI, FBS, PolygonAPI, FBO, FboSupplyRequest, FBS&rFBSMarks, DeliveryFBS, DeliveryrFBS, Pass, ReturnsAPI, RFBSReturnsAPI, ReturnAPI, CancellationAPI, ChatAPI, SupplierAPI, ReportAPI, AnalyticsAPI, FinanceAPI, SellerRating, InvoiceAPI

### Бета-методы Seller API
- **Количество тегов**: 6
- **Теги**: BetaIntro, BetaMethod, Digital, Quants, ReviewAPI, Questions&Answers

### Приложения
- **Количество тегов**: 1
- **Теги**: Errors

### Пуш-уведомления
- **Количество тегов**: 5
- **Теги**: push_intro, push_start, push_resending, push_types, service_response

### Обновления
- **Количество тегов**: 1
- **Теги**: News


## 📚 Инструкция по использованию

1. **Начните с INDEX.json** - содержит полную навигацию по документации
2. **Изучите general/00-api-info.json** - общая информация об API
3. **Просмотрите documentation/** - документационные разделы с описанием концепций
4. **Обрабатывайте группы методов по порядку**:
   - general/ - введение и общие концепции
   - documentation/ - подробная документация
   - methods/ - основные рабочие методы
   - beta/ - экспериментальные методы
   - push/ - работа с уведомлениями
   - appendix/ - справочная информация
5. **Используйте components/** для полного списка схем данных

## 🔧 Формат файлов групп

Каждый файл группы методов содержит:
- **metadata** - метаинформация о группе
- **endpoints** - список методов с полным описанием
- **schemas** - связанные схемы данных

## 📌 Примечания

- Файлы внутри директорий отсортированы по количеству методов
- Каждый файл группы самодостаточен и содержит все необходимые схемы
- Полный набор всех схем находится в components/

---
*Сгенерировано с помощью OZON API Splitter v2.0*
