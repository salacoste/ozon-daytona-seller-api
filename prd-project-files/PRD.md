# PRD: TypeScript SDK for Ozon Seller API (v1)

## 1) Контекст и цели
- **Цель**: разработать надёжный TypeScript SDK для Ozon Seller API, покрывающий ключевые группы методов, с типобезопасными моделями, удобной пагинацией, ретраями и унифицированной обработкой ошибок.
- **Использование**: Node.js сервисы, CLI-утилиты, потенциально browser (с ограничениями).
- **Источник истины**: `api-doc/ozon-api-documentation/INDEX.json` + группы в `methods/`, `beta/`, `components/schemas-part-*.json`.
- **Объём API**: 263 endpoints, 32 группы, 1069 схем (см. `INDEX.json`).

## 2) Потребители и сценарии
- Разработчики продавцов Ozon (интеграции: поставки FBO/FBS, склады, цены/остатки, аналитика, отчёты).
- BI/аналитика (получение агрегированных данных AnalyticsAPI/ReportsAPI).
- Операционные задачи (возвраты, отмены, чаты, маркировка, промо, финансы).

## 3) Обязательные требования (MVP v1)
- TypeScript SDK с ESM/CJS сборками.
- Базовый клиент: `OzonClient` с конфигом `clientId`, `apiKey`, `baseUrl`.
- Подклиенты по группам (из `methods/`):
  - `FBS`, `FBO`, `FboSupplyRequest`, `DeliveryFBS`, `DeliveryrFBS`, `Prices&StocksAPI`, `ProductAPI`, `CategoryAPI`, `WarehouseAPI`, `PricingStrategyAPI`, `Promos`, `FinanceAPI`, `ReportAPI`, `AnalyticsAPI`, `ReturnsAPI`, `RFBSReturnsAPI`, `ReturnAPI`, `CancellationAPI`, `ChatAPI`, `SupplierAPI`, `BarcodeAPI`, `PolygonAPI`, `SellerRating`, `Pass` и др.
- Генерация типов запросов/ответов из `components/schemas-part-*.json` (автоген или полуавтоген).
- Единообразная отправка заголовков `Client-Id` и `Api-Key` (см. примеры в `beta/*.json`, `methods/*.json`).
- Пагинация-хелперы для паттернов `last_id`, `cursor`, `limit/offset`.
- Ретраи с backoff (конфигурируемые), таймауты, отмена через `AbortSignal`.
- Нормализация ошибок: маппинг `rpcStatus` → типизированные ошибки SDK.
- Логирование (опционально, хуки): запросы, ответы, попытки ретраев. Комментарии/логи — ENGLISH.
- Документация и примеры кода для каждой группы.

## 4) Невходящее в v1 (Out of scope)
- WebSockets/стриминг (если не требуется API).
- Автоподписки на push-уведомления (backlog).
- UI/CLI-инструменты поверх SDK (отдельные проекты).

## 5) Архитектура SDK
- `OzonClient`
  - Хранит конфиг, общие middlewares (auth headers, retry, rate-limit, logging).
  - Предоставляет подклиенты: `client.product`, `client.fbo`, `client.fbs`, `client.analytics`, ...
- Транспорт: `fetch`-совместимый слой с перехватчиками.
- Типы: генерируются из `components/` (минимум используемые схемы), руками доопределяем спорные места.
- Совместимость: Node 18+, ESM/CJS. Browser — best-effort (без секретов).

### Пример DX (псевдокод)
```ts
import { OzonClient } from '@ozon/sdk';

const client = new OzonClient({ clientId, apiKey });

// Prices & Stocks
const stocks = await client.pricesStocks.analyticsStocks({ skus: ['148313766'] });

// Pagination helper (last_id)
for await (const page of client.fbo.listReturnsPaginated({ date_from, date_to, limit: 500 })) {
  // handle page
}
```

## 6) Функциональные блоки (группы методов) и приоритеты покрытия
Основано на `methods/` и `INDEX.json`:
- P0 (первыми): `FBO` (06-fbo), `FBS` (01-fbs), `FboSupplyRequest` (02-fbosupplyrequest), `Prices&StocksAPI` (10-prices-stocksapi), `WarehouseAPI` (23-warehouseapi), `ProductAPI` (03-productapi).
- P1: `AnalyticsAPI` (19-analyticsapi), `ReportAPI` (16-reportapi), `FinanceAPI` (09-financeapi), `ReturnsAPI`/`RFBSReturnsAPI`/`ReturnAPI`.
- P2: `Promos`, `PricingStrategyAPI`, `CategoryAPI`, `SupplierAPI`, `ChatAPI`, `CancellationAPI`, `BarcodeAPI`, `PolygonAPI`, `SellerRating`, `Pass`.
- Beta: `beta/*.json` доступны под флагом `enableBeta` с дисклеймером.

## 7) Транспорт, безопасность, конфигурация
- Заголовки: всегда добавлять `Client-Id`, `Api-Key`.
- Base URL: конфигурируемый (прод/санбокс, сверить в `documentation/*`).
- Timeout по умолчанию: 30s (перенастраивается).
- Retries: по `5xx` и сетевым ошибкам (экспоненциальный backoff), `maxRetries=3` по умолчанию.
- Rate limiting: конфигурируемый токен-бакет.
- Идемпотентность: если метод поддерживает — позволить передавать идемпотентный ключ (TBD по ревизии методов).
- Логи: по умолчанию off; включаются колбэками/hook-ами; PII не логируем.

## 8) Пагинация и удобные итераторы
- Поддержать:
  - `last_id` — итератор до пустого `last_id`.
  - `cursor` — курсорное API (если встречается).
  - `limit/offset` — генератор страниц до исчерпания.

## 9) Обработка ошибок
- Нормализовать `rpcStatus { code, message, details[] }` → `OzonApiError` (с HTTP статусом, operationId, requestId если есть).
- Доп. классы: `RateLimitError`, `AuthError`, `ValidationError`.
- Тексты/комментарии — ENGLISH.

## 10) Документация и примеры
- Автоген JSDoc из сигнатур + примеры для каждой ключевой группы.
- Маппинг `operationId` → метод SDK (из файлов групп).
- Readme/Guide: как настроить ключи, базовые примеры, пагинация, ретраи, ошибки.

## 11) Тестирование
- Unit: мок транспорта (whatwg-fetch/nock/MSW для Node), проверки типов.
- Contract: валидация `example` из JSON против моделей.
- E2E (опционально): ручной прогон с реальным ключом.
- Покрытие: 80%+ по lines/branches для ядра и P0.

## 12) Версионирование и релизы
- SemVer: `major.minor.patch`.
- Breaking — батчируем, changelog.
- Генерация типов/клиентов — фиксируем версию генератора; lockfile.

## 13) План релиза (вехи)
- M1 (Core, 2 недели): каркас SDK, auth, транспорт, ошибки, пагинация, P0-группы (минимум по 1–2 методу/группу), базовая дока, unit-тесты.
- M2 (Coverage, 2–3 недели): добор P0 полностью, P1 критические методы, контрактные тесты, примеры.
- M3 (Analytics/Reports, 2 недели): покрыть `AnalyticsAPI`, `ReportAPI`, улучшить пагинацию и агрегации.
- M4 (Stabilize/Beta, 1–2 недели): флаг `enableBeta`, шлифовка DX, perf, релиз 1.0.0.

## 14) KPI/успех
- DX: время «hello world» < 10 мин.
- Надёжность: < 1% необработанных ошибок при корректном использовании.
- Типобезопасность: zero `any` в публичном API.
- Покрытие тестами ядра ≥ 80%.
- Документация: пример для каждой P0-группы.

## 15) Риски и меры
- Изменчивость API/схем: регулярная синхронизация с `INDEX.json`, скрипт обновления.
- Несогласованность схем: fallback-правки типов вручную, тесты на парсинг `example`.
- Квоты/лимиты: конфигурируемые лимитеры, экспоненциальный backoff.
- Beta-методы: за флагом, с дисклеймером.

## 16) Открытые вопросы (TBD)
- Sandbox/baseUrl и SLA по таймаутам.
- Единый идемпотентный ключ для отдельных операций?
- Требования к локализации ошибок (EN only?) — ориентир: EN для логов/комментариев.

## 17) Артефакты, файлы, источники
- Каталог спецификаций: `api-doc/ozon-api-documentation/`.
- Индекс: `INDEX.json` (статистика, группы, порядок).
- Схемы: `components/schemas-part-*.json`.
- Группы методов: `methods/*.json`, `beta/*.json`.

## 18) Мини-спецификация публичного API SDK (черновик)
```ts
class OzonClient {
  constructor(cfg: { clientId: string; apiKey: string; baseUrl?: string; timeoutMs?: number; retries?: number })
  readonly product: ProductAPI;
  readonly fbo: FBOAPI;
  readonly fbs: FBSAPI;
  readonly pricesStocks: PricesStocksAPI;
  readonly warehouse: WarehouseAPI;
  readonly analytics: AnalyticsAPI;
  // ...прочие группы по methods/
}
```

## 19) Нотации качества
- Чистые типы TS, без `any` в публичном контракте.
- Guard-ы и валидация входных параметров в SDK до запроса.
- Минимальные побочные эффекты; идемпотентные хелперы пагинации.

## Приложение A) Детализация групп методов и объём (по INDEX.json)

На основании `api-doc/ozon-api-documentation/INDEX.json` → `files.byDirectory.methods` и `files.byDirectory.beta`.

### A.1 Продакшен группы (methods/) — 27 групп
- FBS — 22 endpoints (`methods/01-fbs.json`)
- FboSupplyRequest — 19 endpoints (`methods/02-fbosupplyrequest.json`)
- ProductAPI — 18 endpoints (`methods/03-productapi.json`)
- DeliveryFBS — 18 endpoints (`methods/04-deliveryfbs.json`)
- CertificationAPI — 15 endpoints (`methods/05-certificationapi.json`)
- FBO — 13 endpoints (`methods/06-fbo.json`)
- PricingStrategyAPI — 12 endpoints (`methods/07-pricingstrategyapi.json`)
- FBS&rFBSMarks — 12 endpoints (`methods/08-fbs-rfbsmarks.json`)
- FinanceAPI — 11 endpoints (`methods/09-financeapi.json`)
- Prices&StocksAPI — 9 endpoints (`methods/10-prices-stocksapi.json`)
- Promos — 8 endpoints (`methods/11-promos.json`)
- DeliveryrFBS — 8 endpoints (`methods/12-deliveryrfbs.json`)
- RFBSReturnsAPI — 8 endpoints (`methods/13-rfbsreturnsapi.json`)
- ReturnAPI — 8 endpoints (`methods/14-returnapi.json`)
- ChatAPI — 8 endpoints (`methods/15-chatapi.json`)
- ReportAPI — 8 endpoints (`methods/16-reportapi.json`)
- Pass — 7 endpoints (`methods/17-pass.json`)
- CancellationAPI — 7 endpoints (`methods/18-cancellationapi.json`)
- AnalyticsAPI — 5 endpoints (`methods/19-analyticsapi.json`)
- CategoryAPI — 4 endpoints (`methods/20-categoryapi.json`)
- SupplierAPI — 4 endpoints (`methods/21-supplierapi.json`)
- BarcodeAPI — 2 endpoints (`methods/22-barcodeapi.json`)
- WarehouseAPI — 2 endpoints (`methods/23-warehouseapi.json`)
- PolygonAPI — 2 endpoints (`methods/24-polygonapi.json`)
- SellerRating — 2 endpoints (`methods/25-sellerrating.json`)
- BrandAPI — 1 endpoint (`methods/26-brandapi.json`)
- ReturnsAPI — 1 endpoint (`methods/27-returnsapi.json`)

Итого (prod): 27 групп. Суммарно все методы (prod + beta) дают 263 endpoints (см. статистику в `INDEX.json`).

### A.2 Бета-группы (beta/) — 5 групп
- BetaMethod — 9 endpoints (`beta/01-betamethod.json`)
- Questions&Answers — 8 endpoints (`beta/02-questions-answers.json`)
- ReviewAPI — 7 endpoints (`beta/03-reviewapi.json`)
- Digital — 3 endpoints (`beta/04-digital.json`)
- Quants — 2 endpoints (`beta/05-quants.json`)

Итого (beta): 5 групп. Бета-методы будут включаться по флагу `enableBeta` с дисклеймером о нестабильности.

### A.3 Примечания к оценке объёма задач
- На один endpoint ориентировочно формируется минимум:
  - 1 метод SDK (транспорт + типы request/response),
  - 1–2 unit-теста (успешный путь + ошибка),
  - 1 пример использования в документации,
  - при наличии пагинации — 1 итератор/хелпер.
- Таким образом, объём задач масштабируется ~линейно от числа endpoints в группе и выбранной глубины покрытия (пагинация, ретраи, примеры).

---
Статус: документ предназначен для детализации задач (Tasks) и декомпозиции на эпики/истории в следующем этапе планирования.
