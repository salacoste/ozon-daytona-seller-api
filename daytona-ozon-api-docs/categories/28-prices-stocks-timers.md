# Prices & Stocks API — Таймеры актуальности

Детальная документация по методам управления таймерами актуальности минимальных цен: получение статуса и обновление таймеров для автоматизации акционной деятельности.

## 📋 Методы таймеров актуальности (2 метода)

### ⏰ `getActionTimerStatus()` — Статус таймеров актуальности
### 🔄 `updateActionTimer()` — Обновление таймеров актуальности

---

## 🔧 TypeScript интерфейсы

### Запросы (Requests)

```typescript
// Запрос статуса таймеров
interface PricesStocksActionTimerStatusRequest {
  product_ids: string[];              // до 1000 ID товаров
}

// Запрос обновления таймеров  
interface PricesStocksActionTimerUpdateRequest {
  product_ids: string[];              // до 1000 ID товаров для обновления
}
```

### Ответы (Responses)

```typescript
// Ответ статуса таймеров
interface PricesStocksActionTimerStatusResponse {
  statuses?: TimerStatus[];           // статусы таймеров для каждого товара
}

interface TimerStatus {
  product_id: number;                 // ID товара
  expired_at?: string;                // время окончания таймера (ISO 8601)
  min_price_for_auto_actions_enabled: boolean; // учёт минимальной цены в акциях
}

// Ответ обновления таймеров (пустой)
interface PricesStocksActionTimerUpdateResponse {
  // Метод возвращает пустой ответ при успешном выполнении
}
```

---

## ⏰ getActionTimerStatus() — Статус таймеров актуальности

Получает статус таймера актуальности минимальной цены для указанных товаров.

### 🔥 Ключевые особенности
- **Объём**: до 1000 товаров за запрос
- **Информация**: время окончания таймера, статус учёта минимальной цены
- **Цель**: контроль автоматического участия в акциях OZON

### 💡 Бизнес-логика таймеров

**Таймер актуальности** — механизм OZON для контроля актуальности минимальных цен товаров. Когда таймер истекает, система может автоматически исключить товар из акций, если минимальная цена устарела.

### 📝 Примеры использования

```typescript
// Проверка статуса таймеров
const timerStatus = await pricesStocksApi.getActionTimerStatus({
  product_ids: ['123456', '789012', '345678']
});

// Анализ статусов таймеров
timerStatus.statuses?.forEach(status => {
  console.log(`\n=== Товар ${status.product_id} ===`);
  
  if (status.expired_at) {
    const expiryDate = new Date(status.expired_at);
    const now = new Date();
    const timeLeft = expiryDate.getTime() - now.getTime();
    
    if (timeLeft > 0) {
      const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));
      console.log(`⏰ Таймер истекает через ${daysLeft} дней (${expiryDate.toLocaleDateString()})`);
      
      if (daysLeft <= 7) {
        console.log(`⚠️ ВНИМАНИЕ: Таймер истекает скоро!`);
      }
    } else {
      console.log(`❌ Таймер истёк ${Math.abs(Math.ceil(timeLeft / (1000 * 60 * 60 * 24)))} дней назад`);
    }
  } else {
    console.log(`❓ Информация о таймере недоступна`);
  }
  
  console.log(`🎯 Учёт минимальной цены в акциях: ${status.min_price_for_auto_actions_enabled ? 'включен' : 'отключен'}`);
});

// Фильтрация товаров по статусу таймера
function categorizeByTimerStatus(statuses: TimerStatus[]): TimerCategories {
  const now = new Date();
  
  return statuses.reduce((acc, status) => {
    if (!status.expired_at) {
      acc.unknown.push(status);
      return acc;
    }
    
    const expiryDate = new Date(status.expired_at);
    const daysLeft = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysLeft < 0) {
      acc.expired.push(status);
    } else if (daysLeft <= 7) {
      acc.expiringSoon.push(status);
    } else if (daysLeft <= 30) {
      acc.expiringThisMonth.push(status);
    } else {
      acc.active.push(status);
    }
    
    return acc;
  }, {
    expired: [] as TimerStatus[],
    expiringSoon: [] as TimerStatus[],
    expiringThisMonth: [] as TimerStatus[],
    active: [] as TimerStatus[],
    unknown: [] as TimerStatus[]
  });
}

interface TimerCategories {
  expired: TimerStatus[];
  expiringSoon: TimerStatus[];
  expiringThisMonth: TimerStatus[];
  active: TimerStatus[];
  unknown: TimerStatus[];
}
```

### 📊 Мониторинг таймеров

```typescript
class TimerMonitor {
  constructor(private api: PricesStocksApi) {}

  async generateTimerReport(productIds: string[]): Promise<TimerReport> {
    const statuses = await this.api.getActionTimerStatus({ product_ids: productIds });
    
    if (!statuses.statuses) {
      return {
        totalProducts: 0,
        categories: this.getEmptyCategories(),
        alerts: [],
        recommendations: []
      };
    }

    const categories = categorizeByTimerStatus(statuses.statuses);
    
    return {
      totalProducts: statuses.statuses.length,
      categories: {
        expired: categories.expired.length,
        expiringSoon: categories.expiringSoon.length,
        expiringThisMonth: categories.expiringThisMonth.length,
        active: categories.active.length,
        unknown: categories.unknown.length
      },
      alerts: this.generateAlerts(categories),
      recommendations: this.generateRecommendations(categories)
    };
  }

  private generateAlerts(categories: TimerCategories): TimerAlert[] {
    const alerts: TimerAlert[] = [];

    if (categories.expired.length > 0) {
      alerts.push({
        type: 'EXPIRED_TIMERS',
        severity: 'HIGH',
        count: categories.expired.length,
        message: `${categories.expired.length} товаров имеют истёкшие таймеры`,
        productIds: categories.expired.map(s => s.product_id)
      });
    }

    if (categories.expiringSoon.length > 0) {
      alerts.push({
        type: 'EXPIRING_SOON',
        severity: 'MEDIUM',
        count: categories.expiringSoon.length,
        message: `${categories.expiringSoon.length} товаров истекают в течение 7 дней`,
        productIds: categories.expiringSoon.map(s => s.product_id)
      });
    }

    return alerts;
  }

  private generateRecommendations(categories: TimerCategories): Recommendation[] {
    const recommendations: Recommendation[] = [];

    if (categories.expired.length > 0) {
      recommendations.push({
        type: 'UPDATE_EXPIRED_TIMERS',
        priority: 'HIGH',
        message: `Обновите таймеры для ${categories.expired.length} товаров`,
        action: 'Вызовите updateActionTimer() для истёкших товаров',
        affectedProducts: categories.expired.length
      });
    }

    if (categories.expiringSoon.length > 0) {
      recommendations.push({
        type: 'PREPARE_TIMER_UPDATE',
        priority: 'MEDIUM',
        message: `Подготовьте обновление для ${categories.expiringSoon.length} товаров`,
        action: 'Запланируйте обновление таймеров на ближайшие дни',
        affectedProducts: categories.expiringSoon.length
      });
    }

    // Рекомендации по минимальным ценам
    const withoutMinPriceControl = categories.active.filter(s => !s.min_price_for_auto_actions_enabled);
    if (withoutMinPriceControl.length > 0) {
      recommendations.push({
        type: 'ENABLE_MIN_PRICE_CONTROL',
        priority: 'LOW',
        message: `${withoutMinPriceControl.length} товаров без контроля минимальной цены`,
        action: 'Рассмотрите включение учёта минимальной цены для лучшего контроля акций',
        affectedProducts: withoutMinPriceControl.length
      });
    }

    return recommendations;
  }

  private getEmptyCategories() {
    return {
      expired: 0,
      expiringSoon: 0,
      expiringThisMonth: 0,
      active: 0,
      unknown: 0
    };
  }

  async scheduleTimerUpdates(): Promise<ScheduleResult> {
    const productIds = await this.getAllProductIds(); // Получаем все ID товаров
    const report = await this.generateTimerReport(productIds);

    const urgentUpdates = [
      ...report.alerts.find(a => a.type === 'EXPIRED_TIMERS')?.productIds || [],
      ...report.alerts.find(a => a.type === 'EXPIRING_SOON')?.productIds || []
    ];

    if (urgentUpdates.length === 0) {
      return {
        scheduled: false,
        message: 'Нет товаров, требующих срочного обновления таймеров'
      };
    }

    // Планируем автоматическое обновление
    setTimeout(async () => {
      try {
        await this.api.updateActionTimer({ 
          product_ids: urgentUpdates.map(id => id.toString()) 
        });
        console.log(`✅ Автоматически обновлены таймеры для ${urgentUpdates.length} товаров`);
      } catch (error) {
        console.error(`❌ Ошибка автообновления таймеров:`, error);
      }
    }, 60000); // Задержка 1 минута

    return {
      scheduled: true,
      message: `Запланировано обновление таймеров для ${urgentUpdates.length} товаров`,
      productCount: urgentUpdates.length
    };
  }

  private async getAllProductIds(): Promise<string[]> {
    // Здесь должна быть логика получения всех ID товаров
    // Можно интегрировать с другими методами API для получения списка товаров
    return ['123456', '789012', '345678']; // Заглушка
  }
}

interface TimerReport {
  totalProducts: number;
  categories: {
    expired: number;
    expiringSoon: number;
    expiringThisMonth: number;
    active: number;
    unknown: number;
  };
  alerts: TimerAlert[];
  recommendations: Recommendation[];
}

interface TimerAlert {
  type: 'EXPIRED_TIMERS' | 'EXPIRING_SOON';
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  count: number;
  message: string;
  productIds: number[];
}

interface Recommendation {
  type: 'UPDATE_EXPIRED_TIMERS' | 'PREPARE_TIMER_UPDATE' | 'ENABLE_MIN_PRICE_CONTROL';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  message: string;
  action: string;
  affectedProducts: number;
}

interface ScheduleResult {
  scheduled: boolean;
  message: string;
  productCount?: number;
}
```

---

## 🔄 updateActionTimer() — Обновление таймеров актуальности

Обновляет таймер актуальности минимальной цены для указанных товаров.

### 🔥 Ключевые особенности
- **Объём**: до 1000 товаров за запрос
- **Результат**: продлевает срок действия таймера
- **Цель**: поддержание участия товаров в автоматических акциях

### ⚡ Эффекты обновления таймера

1. **Продление срока**: Таймер получает новый срок действия
2. **Сохранение в акциях**: Товар продолжает участвовать в автоматических акциях  
3. **Актуализация цены**: Подтверждается актуальность минимальной цены

### 📝 Примеры использования

```typescript
// Простое обновление таймеров
await pricesStocksApi.updateActionTimer({
  product_ids: ['123456', '789012', '345678']
});

console.log('✅ Таймеры актуальности обновлены');

// Обновление с проверкой статуса до и после
async function updateTimersWithVerification(productIds: string[]): Promise<UpdateVerificationResult> {
  // Получаем статус до обновления
  const statusBefore = await pricesStocksApi.getActionTimerStatus({ product_ids: productIds });
  
  // Обновляем таймеры
  await pricesStocksApi.updateActionTimer({ product_ids: productIds });
  
  // Ждём и проверяем статус после обновления
  await delay(5000); // 5 секунд задержки
  const statusAfter = await pricesStocksApi.getActionTimerStatus({ product_ids: productIds });
  
  // Анализируем изменения
  const results = productIds.map(productId => {
    const before = statusBefore.statuses?.find(s => s.product_id.toString() === productId);
    const after = statusAfter.statuses?.find(s => s.product_id.toString() === productId);
    
    return {
      productId,
      updated: after?.expired_at !== before?.expired_at,
      expiryBefore: before?.expired_at,
      expiryAfter: after?.expired_at,
      timeDifference: after?.expired_at && before?.expired_at 
        ? new Date(after.expired_at).getTime() - new Date(before.expired_at).getTime()
        : null
    };
  });
  
  return {
    totalProducts: productIds.length,
    successfulUpdates: results.filter(r => r.updated).length,
    failedUpdates: results.filter(r => !r.updated).length,
    details: results
  };
}

interface UpdateVerificationResult {
  totalProducts: number;
  successfulUpdates: number;
  failedUpdates: number;
  details: {
    productId: string;
    updated: boolean;
    expiryBefore?: string;
    expiryAfter?: string;
    timeDifference?: number;
  }[];
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```

### 🤖 Автоматизированная система обновления таймеров

```typescript
class AutoTimerUpdater {
  constructor(private api: PricesStocksApi) {}

  async setupAutomaticUpdates(config: AutoUpdateConfig): Promise<void> {
    console.log(`🚀 Запуск автоматического обновления таймеров`);
    console.log(`📅 Интервал проверки: ${config.checkIntervalHours} часов`);
    console.log(`⏰ Обновлять при остатке: ${config.updateThresholdDays} дней`);

    setInterval(async () => {
      try {
        await this.performScheduledUpdate(config);
      } catch (error) {
        console.error('❌ Ошибка автообновления таймеров:', error);
      }
    }, config.checkIntervalHours * 60 * 60 * 1000);
  }

  private async performScheduledUpdate(config: AutoUpdateConfig): Promise<void> {
    console.log(`🔍 Проверка таймеров...`);

    // Получаем все товары для проверки
    const allProductIds = await this.getActiveProductIds();
    
    if (allProductIds.length === 0) {
      console.log(`ℹ️ Нет товаров для проверки`);
      return;
    }

    // Проверяем статус таймеров батчами (по 1000 товаров)
    const batches = this.chunkArray(allProductIds, 1000);
    const productsToUpdate: string[] = [];

    for (const batch of batches) {
      const statuses = await this.api.getActionTimerStatus({ product_ids: batch });
      
      const needUpdate = this.filterProductsNeedingUpdate(
        statuses.statuses || [], 
        config.updateThresholdDays
      );
      
      productsToUpdate.push(...needUpdate);
      
      // Задержка между батчами
      await delay(1000);
    }

    if (productsToUpdate.length === 0) {
      console.log(`✅ Все таймеры актуальны`);
      return;
    }

    console.log(`🔄 Обновление таймеров для ${productsToUpdate.length} товаров`);

    // Обновляем таймеры батчами
    const updateBatches = this.chunkArray(productsToUpdate, 1000);
    let successCount = 0;

    for (const batch of updateBatches) {
      try {
        await this.api.updateActionTimer({ product_ids: batch });
        successCount += batch.length;
        
        // Задержка между обновлениями
        await delay(2000);
      } catch (error) {
        console.error(`❌ Ошибка обновления батча из ${batch.length} товаров:`, error);
      }
    }

    console.log(`✅ Успешно обновлено ${successCount} из ${productsToUpdate.length} таймеров`);
    
    // Отправляем отчёт
    if (config.reportCallback) {
      config.reportCallback({
        timestamp: new Date(),
        totalChecked: allProductIds.length,
        totalUpdated: successCount,
        failed: productsToUpdate.length - successCount
      });
    }
  }

  private filterProductsNeedingUpdate(statuses: TimerStatus[], thresholdDays: number): string[] {
    const now = new Date();
    const thresholdMs = thresholdDays * 24 * 60 * 60 * 1000;

    return statuses
      .filter(status => {
        if (!status.expired_at) {
          return false; // Нет информации о таймере
        }

        const expiryDate = new Date(status.expired_at);
        const timeLeft = expiryDate.getTime() - now.getTime();

        return timeLeft <= thresholdMs; // Истекает в течение порогового времени
      })
      .map(status => status.product_id.toString());
  }

  private async getActiveProductIds(): Promise<string[]> {
    // Здесь должна быть интеграция с другими API для получения списка активных товаров
    // Например, через Product API или из базы данных
    return ['123456', '789012', '345678']; // Заглушка
  }

  private chunkArray<T>(array: T[], chunkSize: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }

  // Метод для остановки автообновления
  async stopAutomaticUpdates(): Promise<void> {
    console.log(`🛑 Автоматическое обновление таймеров остановлено`);
    // Здесь можно добавить логику остановки интервалов
  }
}

interface AutoUpdateConfig {
  checkIntervalHours: number;         // как часто проверять таймеры
  updateThresholdDays: number;        // за сколько дней до истечения обновлять
  reportCallback?: (report: UpdateReport) => void; // колбэк для отчётов
}

interface UpdateReport {
  timestamp: Date;
  totalChecked: number;
  totalUpdated: number;
  failed: number;
}

// Пример использования
async function setupTimerAutomation() {
  const autoUpdater = new AutoTimerUpdater(pricesStocksApi);
  
  await autoUpdater.setupAutomaticUpdates({
    checkIntervalHours: 24,           // проверка раз в день
    updateThresholdDays: 7,           // обновлять за неделю до истечения
    reportCallback: (report) => {
      console.log(`📊 Отчёт об обновлении таймеров:`, report);
      // Можно отправить уведомление в Slack, Telegram и т.д.
    }
  });
}
```

---

## ⚡ Интеграция с системой управления ценами

```typescript
class PriceTimerIntegration {
  constructor(
    private api: PricesStocksApi
  ) {}

  async synchronizePricesWithTimers(priceUpdates: PriceUpdateWithTimer[]): Promise<SyncResult> {
    const results: SyncResult = {
      pricesUpdated: 0,
      timersUpdated: 0,
      errors: []
    };

    try {
      // Сначала обновляем цены
      const priceResult = await this.api.updatePrices({
        prices: priceUpdates.map(update => ({
          offer_id: update.offerId,
          price: update.newPrice.toString(),
          min_price: update.minPrice?.toString(),
          currency_code: 'RUB',
          auto_action_enabled: 'ENABLED',
          min_price_for_auto_actions_enabled: true
        }))
      });

      // Подсчитываем успешные обновления цен
      results.pricesUpdated = priceResult.result?.filter(r => r.updated).length || 0;

      // Получаем product_ids для успешно обновлённых товаров
      const successfulProductIds = priceResult.result
        ?.filter(r => r.updated)
        ?.map(r => r.product_id?.toString())
        ?.filter((id): id is string => id !== undefined) || [];

      if (successfulProductIds.length > 0) {
        // Обновляем таймеры для товаров с обновлёнными ценами
        await this.api.updateActionTimer({ product_ids: successfulProductIds });
        results.timersUpdated = successfulProductIds.length;
      }

      // Собираем ошибки
      priceResult.result?.forEach(result => {
        if (!result.updated && result.errors) {
          results.errors.push(...result.errors.map(e => ({
            productId: result.product_id?.toString() || result.offer_id || 'unknown',
            type: 'PRICE_UPDATE_ERROR',
            code: e.code,
            message: e.message
          })));
        }
      });

    } catch (error) {
      results.errors.push({
        productId: 'batch',
        type: 'API_ERROR',
        code: 'UNKNOWN',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    return results;
  }

  async validateTimersBeforePriceChange(productIds: string[]): Promise<TimerValidationResult> {
    const statuses = await this.api.getActionTimerStatus({ product_ids: productIds });
    const now = new Date();

    const validation = productIds.map(productId => {
      const status = statuses.statuses?.find(s => s.product_id.toString() === productId);
      
      if (!status) {
        return {
          productId,
          valid: false,
          reason: 'Статус таймера не найден'
        };
      }

      if (!status.expired_at) {
        return {
          productId,
          valid: true,
          reason: 'Таймер активен'
        };
      }

      const expiryDate = new Date(status.expired_at);
      const timeLeft = expiryDate.getTime() - now.getTime();
      const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));

      if (timeLeft <= 0) {
        return {
          productId,
          valid: false,
          reason: `Таймер истёк ${Math.abs(daysLeft)} дней назад`
        };
      }

      if (daysLeft <= 7) {
        return {
          productId,
          valid: false,
          reason: `Таймер истекает через ${daysLeft} дней - требуется обновление`
        };
      }

      return {
        productId,
        valid: true,
        reason: `Таймер активен ещё ${daysLeft} дней`
      };
    });

    return {
      totalProducts: productIds.length,
      validProducts: validation.filter(v => v.valid).length,
      invalidProducts: validation.filter(v => !v.valid).length,
      details: validation
    };
  }
}

interface PriceUpdateWithTimer {
  offerId: string;
  productId?: string;
  newPrice: number;
  minPrice?: number;
}

interface SyncResult {
  pricesUpdated: number;
  timersUpdated: number;
  errors: {
    productId: string;
    type: 'PRICE_UPDATE_ERROR' | 'TIMER_UPDATE_ERROR' | 'API_ERROR';
    code: string;
    message: string;
  }[];
}

interface TimerValidationResult {
  totalProducts: number;
  validProducts: number;
  invalidProducts: number;
  details: {
    productId: string;
    valid: boolean;
    reason: string;
  }[];
}
```

---

## 🎯 Лучшие практики работы с таймерами

### ✅ Рекомендуемые подходы

1. **Регулярный мониторинг**: Проверяйте статус таймеров еженедельно
2. **Проактивное обновление**: Обновляйте таймеры за 7-14 дней до истечения
3. **Автоматизация**: Настройте автоматическое обновление для критически важных товаров
4. **Интеграция**: Связывайте обновление таймеров с обновлением цен
5. **Мониторинг**: Отслеживайте товары с истёкшими таймерами

### ⚠️ Частые ошибки

- **Забытые таймеры**: товары исключаются из акций из-за истёкших таймеров
- **Массовые обновления**: превышение лимита в 1000 товаров за запрос  
- **Игнорирование минимальных цен**: отключение контроля минимальной цены снижает эффективность
- **Редкие проверки**: нерегулярная проверка приводит к внезапному исключению из акций

### 📊 KPI для таймеров

- **% товаров с активными таймерами**: > 95%
- **Средний срок до истечения**: > 30 дней  
- **Частота обновлений**: еженедельно
- **% товаров в акциях**: отслеживание связи с таймерами