# Prices & Stocks API — Управление ценами

Детальная документация по методам управления ценами товаров: обновление цен, получение информации о ценах и управление скидками на уценённые товары.

## 📋 Методы управления ценами (3 метода)

### 💰 `updatePrices()` — Обновление цен товаров
### 🔍 `getPrices()` — Получение информации о ценах  
### 🏷️ `updateDiscountedProductDiscount()` — Скидки на уценённые товары

---

## 🔧 TypeScript интерфейсы

### Запросы (Requests)

```typescript
// Запрос обновления цен товаров
interface PricesStocksImportPricesRequest {
  prices: PriceUpdateItem[];          // до 1000 товаров за запрос
}

interface PriceUpdateItem {
  // Идентификация товара (один из двух)
  offer_id?: string;                  // артикул продавца (рекомендуется)
  product_id?: number;                // ID товара в системе OZON
  
  // Основные цены (обязательные)
  price: string;                      // текущая цена товара
  currency_code: string;              // валюта: RUB, USD, EUR, CNY, BYN, KZT
  
  // Дополнительные цены (опциональные)
  old_price?: string;                 // зачёркнутая цена (до скидки)
  min_price?: string;                 // минимальная цена для акций
  net_price?: string;                 // себестоимость товара
  vat?: string;                       // НДС: "0", "0.05", "0.07", "0.1", "0.2"
  
  // Автоматизация и акции
  auto_action_enabled?: AutoActionState;           // авто-применение акций OZON
  auto_add_to_ozon_actions_list_enabled?: AutoActionState; // авто-добавление в акции
  price_strategy_enabled?: AutoActionState;       // авто-применение стратегий цен
  min_price_for_auto_actions_enabled?: boolean;   // учёт минимальной цены
  
  // Специальные параметры
  quant_size?: number;                // размер кванта для эконом-товаров
}

// Состояния автоматизации
type AutoActionState = 'ENABLED' | 'DISABLED' | 'UNKNOWN';

// Запрос получения цен
interface PricesStocksGetPricesRequest {
  filter: PricesFilter;               // обязательный фильтр
  limit: number;                      // 1-1000, количество на странице
  cursor?: string;                    // указатель для пагинации
}

interface PricesFilter {
  offer_id?: string[];               // фильтр по артикулам
  product_id?: number[];             // фильтр по ID товаров
  visibility?: ProductVisibility;    // видимость товаров
}

type ProductVisibility = 'ALL' | 'VISIBLE' | 'INVISIBLE' | 'EMPTY_STOCK' | 'NOT_MODERATED' | 'MODERATED' | 'DISABLED' | 'STATE_FAILED' | 'READY_TO_SUPPLY' | 'VALIDATION_STATE_PENDING' | 'VALIDATION_STATE_FAIL' | 'VALIDATION_STATE_SUCCESS' | 'TO_SUPPLY' | 'IN_SALE' | 'REMOVED_FROM_SALE' | 'BANNED' | 'OVERPRICED' | 'CRITICALLY_OVERPRICED' | 'EMPTY_BARCODE' | 'BARCODE_EXISTS' | 'QUARANTINE' | 'ARCHIVED' | 'OVERPRICED_WITH_STOCK' | 'PARTIAL_APPROVED' | 'IMAGE_ABSENT' | 'MODERATION_BLOCK';

// Запрос скидки на уценённый товар
interface PricesStocksUpdateDiscountRequest {
  product_id: number;                 // ID уценённого товара
  discount: number;                   // размер скидки в процентах
}
```

### Ответы (Responses)

```typescript
// Ответ обновления цен
interface PricesStocksImportPricesResponse {
  result?: PriceUpdateResult[];       // результаты для каждого товара
}

interface PriceUpdateResult {
  offer_id?: string;                  // артикул товара
  product_id?: number;                // ID товара
  updated: boolean;                   // успешно ли обновлена цена
  errors?: PriceUpdateError[];        // массив ошибок при обновлении
}

interface PriceUpdateError {
  code: string;                       // код ошибки
  message: string;                    // описание ошибки
}

// Ответ получения цен
interface PricesStocksGetPricesResponse {
  items?: PriceInfoItem[];            // информация о ценах товаров
  total?: number;                     // общее количество товаров
  cursor?: string;                    // указатель для следующей страницы
}

interface PriceInfoItem {
  product_id: number;                 // ID товара
  offer_id: string;                   // артикул товара
  
  // Цены товара
  price: PriceDetails;                // основная цена
  old_price?: PriceDetails;           // старая цена (зачёркнутая)
  premium_price?: PriceDetails;       // премиум цена
  min_price?: PriceDetails;           // минимальная цена
  
  // Автоматизация
  auto_action_enabled: AutoActionState;
  price_strategy_enabled: AutoActionState;
  min_price_for_auto_actions_enabled: boolean;
  
  // Статусы и метаданные
  currency_code: string;              // валюта
  marketing_price?: PriceDetails;     // маркетинговая цена
  marketing_actions?: string[];       // активные акции
  volume_ordered_units?: VolumeOrderedUnits[]; // заказанные объёмы
}

interface PriceDetails {
  value?: string;                     // значение цены
  currency_code?: string;             // валюта цены
  converted_value?: string;           // конвертированная цена
  converted_currency_code?: string;   // валюта после конвертации
}

// Ответ скидки на уценённый товар
interface PricesStocksUpdateDiscountResponse {
  result?: boolean;                   // успешность установки скидки
}
```

---

## 💰 updatePrices() — Обновление цен товаров

Позволяет изменить цену одного или нескольких товаров с поддержкой автоматизации и акций.

### 🔥 Ключевые особенности
- **Лимит**: не более 10 обновлений в час на товар
- **Объём**: до 1000 товаров за один запрос  
- **Автоматизация**: поддержка авто-акций и стратегий ценообразования
- **Валюты**: RUB, USD, EUR, CNY, BYN, KZT

### ⚠️ Важные правила ценообразования

1. **Разница между ценами**: При указании `old_price` должна быть минимальная разница:
   - < 400₽: минимум 20₽ разницы
   - 400₽-10,000₽: минимум 5% разницы  
   - > 10,000₽: минимум 500₽ разницы

2. **Минимальные цены**: При включении автоматизации обязательно указать `min_price`

3. **Приоритет идентификации**: Если указаны `offer_id` и `product_id`, используется `offer_id`

### 📝 Примеры использования

```typescript
// Базовое обновление цены
const basicPriceUpdate = await pricesStocksApi.updatePrices({
  prices: [{
    offer_id: 'LAPTOP001',
    price: '45000',
    old_price: '50000',
    currency_code: 'RUB'
  }]
});

// Продвинутое ценообразование с автоматизацией
const advancedPricing = await pricesStocksApi.updatePrices({
  prices: [{
    offer_id: 'SMARTPHONE001', 
    price: '25000',
    old_price: '30000',
    min_price: '23000',
    net_price: '20000',
    currency_code: 'RUB',
    vat: '0.2',
    
    // Автоматизация
    auto_action_enabled: 'ENABLED',
    auto_add_to_ozon_actions_list_enabled: 'ENABLED',
    price_strategy_enabled: 'ENABLED',
    min_price_for_auto_actions_enabled: true
  }]
});

// Обработка результатов
basicPriceUpdate.result?.forEach(result => {
  if (result.updated) {
    console.log(`✅ Цена товара ${result.offer_id} успешно обновлена`);
  } else {
    console.log(`❌ Ошибки для ${result.offer_id}:`);
    result.errors?.forEach(error => {
      console.log(`  - ${error.code}: ${error.message}`);
    });
  }
});
```

### 🚀 Автоматизированный менеджер цен

```typescript
class PricingManager {
  constructor(private api: PricesStocksApi) {}

  async updateCompetitivePricing(items: CompetitivePriceItem[]): Promise<PricingResult> {
    const priceUpdates: PriceUpdateItem[] = items.map(item => ({
      offer_id: item.offerId,
      price: this.calculateCompetitivePrice(item),
      old_price: item.currentPrice > item.competitivePrice ? item.currentPrice : undefined,
      min_price: this.calculateMinPrice(item),
      currency_code: 'RUB',
      
      // Включаем автоматизацию для конкурентного ценообразования
      auto_action_enabled: 'ENABLED',
      price_strategy_enabled: 'ENABLED',
      min_price_for_auto_actions_enabled: true
    }));

    const result = await this.api.updatePrices({ prices: priceUpdates });
    
    return this.analyzePricingResults(result);
  }

  private calculateCompetitivePrice(item: CompetitivePriceItem): string {
    // Логика расчёта конкурентной цены
    const competitivePrice = Math.min(
      item.competitorPrice * 0.95, // 5% ниже конкурента
      item.maxPrice
    );
    
    return Math.max(competitivePrice, item.minPrice).toFixed(2);
  }

  private calculateMinPrice(item: CompetitivePriceItem): string {
    // Минимальная цена = себестоимость + минимальная маржа
    return (item.costPrice * 1.1).toFixed(2); // 10% маржа
  }

  private analyzePricingResults(result: PricesStocksImportPricesResponse): PricingResult {
    const successful = result.result?.filter(r => r.updated) || [];
    const failed = result.result?.filter(r => !r.updated) || [];
    
    return {
      successCount: successful.length,
      failureCount: failed.length,
      failureReasons: failed.flatMap(f => f.errors?.map(e => e.code) || [])
    };
  }
}

interface CompetitivePriceItem {
  offerId: string;
  currentPrice: number;
  competitorPrice: number;
  costPrice: number;
  minPrice: number;
  maxPrice: number;
}

interface PricingResult {
  successCount: number;
  failureCount: number;
  failureReasons: string[];
}
```

---

## 🔍 getPrices() — Получение информации о ценах

Возвращает детальную информацию о ценах товаров с поддержкой фильтрации и пагинации.

### 🔥 Ключевые особенности
- **Пагинация**: курсорная пагинация для больших объёмов
- **Фильтрация**: по артикулам, ID товаров, видимости
- **Детализация**: все типы цен, акции, автоматизация

### 📝 Примеры использования

```typescript
// Получение цен по артикулам
const pricesInfo = await pricesStocksApi.getPrices({
  filter: {
    offer_id: ['LAPTOP001', 'SMARTPHONE001'],
    visibility: 'IN_SALE'
  },
  limit: 100
});

// Обработка результатов
pricesInfo.items?.forEach(item => {
  console.log(`\n=== ${item.offer_id} ===`);
  console.log(`Цена: ${item.price.value} ${item.currency_code}`);
  
  if (item.old_price?.value) {
    console.log(`Старая цена: ${item.old_price.value}`);
    const discount = ((parseFloat(item.old_price.value) - parseFloat(item.price.value!)) / parseFloat(item.old_price.value) * 100).toFixed(1);
    console.log(`Скидка: ${discount}%`);
  }
  
  if (item.premium_price?.value) {
    console.log(`Premium цена: ${item.premium_price.value}`);
  }
  
  console.log(`Автоакции: ${item.auto_action_enabled}`);
  console.log(`Стратегии: ${item.price_strategy_enabled}`);
  
  if (item.marketing_actions?.length) {
    console.log(`Участвует в акциях: ${item.marketing_actions.join(', ')}`);
  }
});

// Пагинация для получения всех товаров
async function getAllPrices(): Promise<PriceInfoItem[]> {
  const allPrices: PriceInfoItem[] = [];
  let cursor: string | undefined = undefined;

  do {
    const response = await pricesStocksApi.getPrices({
      filter: { visibility: 'IN_SALE' },
      limit: 1000,
      cursor
    });

    if (response.items) {
      allPrices.push(...response.items);
    }
    
    cursor = response.cursor;
  } while (cursor);

  return allPrices;
}
```

### 📊 Аналитический менеджер цен

```typescript
class PriceAnalytics {
  constructor(private api: PricesStocksApi) {}

  async generatePricingReport(): Promise<PricingReport> {
    const allPrices = await this.getAllProductPrices();
    
    return {
      totalProducts: allPrices.length,
      averagePrice: this.calculateAveragePrice(allPrices),
      discountAnalysis: this.analyzeDiscounts(allPrices),
      automationAnalysis: this.analyzeAutomation(allPrices),
      currencyDistribution: this.analyzeCurrencies(allPrices),
      actionParticipation: this.analyzeActions(allPrices)
    };
  }

  private analyzeDiscounts(prices: PriceInfoItem[]): DiscountAnalysis {
    const withDiscount = prices.filter(p => p.old_price?.value);
    
    const discounts = withDiscount.map(p => {
      const current = parseFloat(p.price.value!);
      const old = parseFloat(p.old_price!.value!);
      return ((old - current) / old * 100);
    });

    return {
      productsWithDiscount: withDiscount.length,
      discountPercentage: (withDiscount.length / prices.length * 100),
      averageDiscount: discounts.reduce((a, b) => a + b, 0) / discounts.length,
      maxDiscount: Math.max(...discounts),
      minDiscount: Math.min(...discounts)
    };
  }

  private analyzeAutomation(prices: PriceInfoItem[]): AutomationAnalysis {
    const autoActionsEnabled = prices.filter(p => p.auto_action_enabled === 'ENABLED').length;
    const strategiesEnabled = prices.filter(p => p.price_strategy_enabled === 'ENABLED').length;
    
    return {
      autoActionsUsage: (autoActionsEnabled / prices.length * 100),
      strategiesUsage: (strategiesEnabled / prices.length * 100),
      fullyAutomated: prices.filter(p => 
        p.auto_action_enabled === 'ENABLED' && 
        p.price_strategy_enabled === 'ENABLED'
      ).length
    };
  }

  private analyzeActions(prices: PriceInfoItem[]): ActionAnalysis {
    const inActions = prices.filter(p => p.marketing_actions && p.marketing_actions.length > 0);
    const actionTypes = new Map<string, number>();
    
    inActions.forEach(p => {
      p.marketing_actions?.forEach(action => {
        actionTypes.set(action, (actionTypes.get(action) || 0) + 1);
      });
    });

    return {
      productsInActions: inActions.length,
      actionParticipationRate: (inActions.length / prices.length * 100),
      topActions: Array.from(actionTypes.entries())
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
    };
  }

  private async getAllProductPrices(): Promise<PriceInfoItem[]> {
    // Реализация пагинации как в примере выше
    const allPrices: PriceInfoItem[] = [];
    let cursor: string | undefined = undefined;

    do {
      const response = await this.api.getPrices({
        filter: { visibility: 'IN_SALE' },
        limit: 1000,
        cursor
      });

      if (response.items) {
        allPrices.push(...response.items);
      }
      
      cursor = response.cursor;
    } while (cursor);

    return allPrices;
  }
}

interface PricingReport {
  totalProducts: number;
  averagePrice: number;
  discountAnalysis: DiscountAnalysis;
  automationAnalysis: AutomationAnalysis;
  currencyDistribution: Map<string, number>;
  actionParticipation: ActionAnalysis;
}

interface DiscountAnalysis {
  productsWithDiscount: number;
  discountPercentage: number;
  averageDiscount: number;
  maxDiscount: number;
  minDiscount: number;
}

interface AutomationAnalysis {
  autoActionsUsage: number;
  strategiesUsage: number;
  fullyAutomated: number;
}

interface ActionAnalysis {
  productsInActions: number;
  actionParticipationRate: number;
  topActions: [string, number][];
}
```

---

## 🏷️ updateDiscountedProductDiscount() — Скидки на уценённые товары

Устанавливает размер скидки на уценённые товары, продающиеся по схеме FBS.

### 🔥 Ключевые особенности
- **Схема**: только FBS (не FBO)
- **Уценённые товары**: товары с дефектами или повреждениями
- **Гибкость**: установка произвольного процента скидки

### 📝 Примеры использования

```typescript
// Установка скидки на уценённый товар
const discountResult = await pricesStocksApi.updateDiscountedProductDiscount({
  product_id: 123456789,
  discount: 25  // 25% скидка
});

if (discountResult.result) {
  console.log('✅ Скидка 25% успешно установлена на уценённый товар');
} else {
  console.log('❌ Ошибка при установке скидки');
}

// Массовая установка скидок на уценённые товары
async function setDiscountsForDamaged(items: DamagedItem[]): Promise<DiscountResults> {
  const results = await Promise.allSettled(
    items.map(item => 
      pricesStocksApi.updateDiscountedProductDiscount({
        product_id: item.productId,
        discount: item.suggestedDiscount
      })
    )
  );

  return {
    successful: results.filter(r => r.status === 'fulfilled' && r.value.result).length,
    failed: results.filter(r => r.status === 'rejected' || !r.value.result).length
  };
}

interface DamagedItem {
  productId: number;
  damageType: 'packaging' | 'minor_defect' | 'major_defect';
  suggestedDiscount: number;
}

interface DiscountResults {
  successful: number;
  failed: number;
}
```

---

## ⚠️ Обработка ошибок и рекомендации

### Частые ошибки обновления цен

```typescript
class PriceErrorHandler {
  static handlePriceUpdateErrors(errors: PriceUpdateError[]): void {
    errors.forEach(error => {
      switch (error.code) {
        case 'INVALID_PRICE':
          console.log('❌ Некорректная цена. Проверьте формат и валюту');
          break;
          
        case 'TOO_MANY_REQUESTS':
          console.log('⏰ Превышен лимит запросов. Повторите через час');
          break;
          
        case 'MIN_PRICE_VIOLATION':
          console.log('📉 Цена ниже минимально допустимой');
          break;
          
        case 'OLD_PRICE_DIFFERENCE_TOO_SMALL':
          console.log('💰 Недостаточная разница между старой и новой ценой');
          break;
          
        case 'ACTION_PRICE_ENABLED_MIN_PRICE_MISSING':
          console.log('🎯 При включении акций требуется указать минимальную цену');
          break;
          
        default:
          console.log(`❓ Неизвестная ошибка: ${error.code} - ${error.message}`);
      }
    });
  }
}
```

### 🎯 Лучшие практики

1. **Валидация цен**: Всегда проверяйте корректность цен перед отправкой
2. **Обработка лимитов**: Реализуйте очереди для соблюдения лимитов API
3. **Мониторинг**: Отслеживайте успешность обновлений цен
4. **Автоматизация**: Используйте авто-акции для повышения продаж
5. **Стратегии**: Применяйте стратегии ценообразования для оптимизации