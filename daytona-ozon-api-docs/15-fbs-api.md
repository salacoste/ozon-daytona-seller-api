# FBS API

API для управления отправлениями "Выполнение продавцом" (Fulfillment by Seller) в OZON Seller API.

**Количество методов**: 22 метода

## Обзор

FBS API предоставляет полный набор инструментов для работы с логистической схемой FBS:
- 📦 Управление жизненным циклом отправлений
- 🏷️ Печать этикеток и документов
- ❌ Отмена отправлений и товаров
- 🔍 Отслеживание и мониторинг статусов
- 📊 Аналитика и финансовые данные
- 🌍 Работа с таможенными документами

## Основные возможности

### 🎯 Схема работы FBS
1. **Заказ поступает** → продавец получает уведомление
2. **Сборка** → продавец собирает заказ на своем складе
3. **Печать этикеток** → генерация документов для отправки
4. **Передача курьеру** → курьер забирает у продавца
5. **Доставка** → OZON доставляет покупателю

### 📦 Статусы отправлений FBS
- `awaiting_packaging` - ожидает сборки
- `awaiting_deliver` - ожидает передачи курьеру
- `arbitration` - в споре
- `delivering` - доставляется
- `delivered` - доставлено
- `cancelled` - отменено

### 🏷️ Система этикеток
- Автоматическая генерация PDF-этикеток
- Поддержка batch-обработки (до 20 отправлений)
- Маленькие и большие форматы этикеток
- Асинхронная обработка больших партий

## Методы API

### Справочная информация

#### getCancelReasons()
**Назначение**: Получить причины отмены для конкретных отправлений

#### getCancelReasonsList()
**Назначение**: Получить полный список причин отмены

### Управление этикетками

#### packageLabel()
**Назначение**: Напечатать этикетки для отправлений (синхронно)

```typescript
interface FbsPackageLabelRequest {
  posting_number: string[];
}
```

#### createLabelBatchV2()
**Назначение**: Создать задание на формирование этикеток (асинхронно)

#### getLabelBatch()
**Назначение**: Получить результат создания этикеток

### Управление отправлениями

#### getPostingListV3()
**Назначение**: Получить список отправлений (v3)

```typescript
interface FbsGetPostingListV3Request {
  filter: {
    since: string;
    to: string;
    status?: string;
  };
  limit?: number;
  offset?: number;
  dir?: 'ASC' | 'DESC';
  with?: {
    analytics_data?: boolean;
    financial_data?: boolean;
  };
}
```

#### getPostingV3()
**Назначение**: Получить детальную информацию об отправлении (v3)

#### getUnfulfilledListV3()
**Назначение**: Получить список необработанных отправлений

#### cancelPosting()
**Назначение**: Отменить отправление

#### moveToArbitration()
**Назначение**: Открыть спор по отправлению

#### moveToAwaitingDelivery()
**Назначение**: Передать отправление к отгрузке

### Управление товарами

#### cancelProducts()
**Назначение**: Отменить отправку некоторых товаров в отправлении

```typescript
interface FbsProductCancelRequest {
  posting_number: string;
  products: Array<{
    sku: string;
    quantity: number;
    cancel_reason_id: number;
  }>;
}
```

#### changeProducts()
**Назначение**: Изменить товары в отправлении (добавить вес)

#### setProductCountry()
**Назначение**: Добавить информацию о стране-изготовителе

#### getProductCountriesList()
**Назначение**: Получить список доступных стран-изготовителей

### Дополнительные функции

#### getRestrictions()
**Назначение**: Получить ограничения пункта приёма

#### verifyPickupCode()
**Назначение**: Проверить код курьера (для realFBS Express)

#### setMultiBoxQtyV3()
**Назначение**: Указать количество коробок для многокоробочных отправлений

#### getEtgb()
**Назначение**: Получить таможенные декларации для продавцов из Турции

#### getUnpaidLegalProductList()
**Назначение**: Получить список неоплаченных товаров юридических лиц

## Практические примеры

### Базовое использование

```typescript
import { OzonSellerAPI } from 'bmad-ozon-seller-api';

const api = new OzonSellerAPI({
  clientId: 'your-client-id',
  apiKey: 'your-api-key'
});

// Получить список отправлений
const postings = await api.fbs.getPostingListV3({
  filter: {
    since: '2024-01-01T00:00:00Z',
    to: '2024-01-31T23:59:59Z',
    status: 'awaiting_deliver'
  },
  limit: 100,
  with: {
    analytics_data: true,
    financial_data: true
  }
});

// Напечатать этикетки
const label = await api.fbs.packageLabel({
  posting_number: ['12345-0001-1']
});

// Отменить отправление
const cancelled = await api.fbs.cancelPosting({
  posting_number: '12345-0001-1',
  cancel_reason_id: 402,
  cancel_reason_message: 'Товар не в наличии'
});

// Получить детальную информацию об отправлении
const posting = await api.fbs.getPostingV3({
  posting_number: '12345-0001-1',
  translit: true
});
```

### Продвинутые сценарии

#### Система управления отправлениями FBS

```typescript
class FbsOrderManager {
  constructor(private api: OzonSellerAPI) {}

  async processAwaitingOrders(): Promise<void> {
    console.log('📦 Обработка ожидающих отправлений FBS');

    // 1. Получаем отправления, ожидающие сборки
    const awaitingPostings = await this.api.fbs.getPostingListV3({
      filter: {
        since: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        to: new Date().toISOString(),
        status: 'awaiting_packaging'
      },
      limit: 1000,
      with: {
        analytics_data: true,
        financial_data: true
      }
    });

    if (!awaitingPostings.result || awaitingPostings.result.length === 0) {
      console.log('✅ Нет отправлений, ожидающих сборки');
      return;
    }

    console.log(`📋 Найдено ${awaitingPostings.result.length} отправлений для обработки`);

    // 2. Группируем по приоритетам
    const prioritizedOrders = this.prioritizeOrders(awaitingPostings.result);

    // 3. Обрабатываем по группам
    for (const [priority, orders] of prioritizedOrders.entries()) {
      console.log(`\n🔥 Обработка приоритета "${priority}": ${orders.length} заказов`);
      
      for (const order of orders) {
        await this.processOrder(order);
        // Пауза между заказами
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    console.log('\n🎉 Обработка отправлений завершена');
  }

  private prioritizeOrders(orders: any[]): Map<string, any[]> {
    const prioritized = new Map([
      ['express', []],
      ['premium', []], 
      ['standard', []],
      ['overdue', []]
    ]);

    const now = new Date();

    orders.forEach(order => {
      const shipmentDate = new Date(order.shipment_date);
      const hoursUntilShipment = (shipmentDate.getTime() - now.getTime()) / (1000 * 60 * 60);

      // Определяем приоритет
      if (hoursUntilShipment < 0) {
        prioritized.get('overdue')?.push(order);
      } else if (order.delivery_method?.name?.includes('Express') || hoursUntilShipment < 2) {
        prioritized.get('express')?.push(order);
      } else if (order.customer?.customer_type === 'premium' || hoursUntilShipment < 12) {
        prioritized.get('premium')?.push(order);
      } else {
        prioritized.get('standard')?.push(order);
      }
    });

    return prioritized;
  }

  private async processOrder(order: any): Promise<void> {
    console.log(`\n📦 Обработка заказа: ${order.posting_number}`);

    try {
      // 1. Проверяем доступность товаров
      const stockStatus = await this.checkStockAvailability(order.products);
      
      if (!stockStatus.allAvailable) {
        await this.handleOutOfStockItems(order, stockStatus.unavailableItems);
        return;
      }

      // 2. Проверяем ограничения доставки
      const restrictions = await this.checkDeliveryRestrictions(order);
      
      if (!restrictions.canDeliver) {
        await this.handleDeliveryRestrictions(order, restrictions);
        return;
      }

      // 3. Генерируем этикетки
      const labelGenerated = await this.generateOrderLabel(order);
      
      if (!labelGenerated) {
        console.log('❌ Ошибка генерации этикетки, пропускаем заказ');
        return;
      }

      // 4. Переводим в статус ожидания курьера
      await this.moveToAwaitingDelivery(order);
      
      console.log('✅ Заказ готов к передаче курьеру');

    } catch (error) {
      console.error(`❌ Ошибка обработки заказа ${order.posting_number}:`, error.message);
    }
  }

  private async checkStockAvailability(products: any[]): Promise<{allAvailable: boolean; unavailableItems: any[]}> {
    // Эмуляция проверки остатков
    const unavailableItems = products.filter(product => {
      // Здесь была бы реальная проверка остатков в вашей системе
      return Math.random() < 0.1; // 10% вероятность отсутствия товара
    });

    return {
      allAvailable: unavailableItems.length === 0,
      unavailableItems
    };
  }

  private async handleOutOfStockItems(order: any, unavailableItems: any[]): Promise<void> {
    console.log(`⚠️ Недоступные товары в заказе ${order.posting_number}: ${unavailableItems.length}`);

    // Получаем причины отмены
    const cancelReasons = await this.api.fbs.getCancelReasonsList();
    const outOfStockReasonId = cancelReasons.result?.find(reason => 
      reason.name?.toLowerCase().includes('наличии')
    )?.id || 402;

    // Отменяем недоступные товары
    const cancelResult = await this.api.fbs.cancelProducts({
      posting_number: order.posting_number,
      products: unavailableItems.map(item => ({
        sku: item.sku,
        quantity: item.quantity,
        cancel_reason_id: outOfStockReasonId
      }))
    });

    // Логируем результаты
    cancelResult.result?.forEach(result => {
      if (result.result) {
        console.log(`✅ Товар ${result.sku} отменен`);
      } else {
        console.log(`❌ Ошибка отмены товара ${result.sku}: ${result.error}`);
      }
    });

    // Если все товары отменены, отменяем заказ полностью
    const remainingProducts = order.products.filter(p => 
      !unavailableItems.some(u => u.sku === p.sku)
    );

    if (remainingProducts.length === 0) {
      await this.api.fbs.cancelPosting({
        posting_number: order.posting_number,
        cancel_reason_id: outOfStockReasonId,
        cancel_reason_message: 'Все товары отсутствуют на складе'
      });
      console.log('🚫 Заказ полностью отменен');
    }
  }

  private async checkDeliveryRestrictions(order: any): Promise<{canDeliver: boolean; restrictions?: any}> {
    try {
      const restrictions = await this.api.fbs.getRestrictions({
        posting_number: order.posting_number
      });

      // Проверяем габариты и вес
      const totalWeight = order.products.reduce((sum: number, product: any) => 
        sum + (product.weight * product.quantity), 0);
      
      const maxWeight = restrictions.result?.max_weight || Infinity;
      
      if (totalWeight > maxWeight) {
        return {
          canDeliver: false,
          restrictions: { reason: 'weight_exceeded', maxWeight, actualWeight: totalWeight }
        };
      }

      return { canDeliver: true };
    } catch (error) {
      console.log('Не удалось получить ограничения, продолжаем обработку');
      return { canDeliver: true };
    }
  }

  private async handleDeliveryRestrictions(order: any, restrictions: any): Promise<void> {
    console.log(`📏 Ограничения доставки для ${order.posting_number}:`, restrictions.restrictions);

    // Здесь можно реализовать логику разбиения заказа на несколько отправлений
    // или другие способы решения проблем с ограничениями
    
    console.log('⚠️ Заказ требует ручной обработки из-за ограничений доставки');
  }

  private async generateOrderLabel(order: any): Promise<boolean> {
    try {
      console.log(`🏷️ Генерация этикетки для ${order.posting_number}`);

      const labelResult = await this.api.fbs.packageLabel({
        posting_number: [order.posting_number]
      });

      if (labelResult.content) {
        console.log(`✅ Этикетка сгенерирована (${labelResult.content.length} символов base64)`);
        
        // Здесь можно сохранить этикетку в файл или отправить на печать
        // await this.saveLabelToFile(order.posting_number, labelResult.content);
        
        return true;
      } else {
        console.log('❌ Не удалось получить содержимое этикетки');
        return false;
      }
    } catch (error) {
      console.error('❌ Ошибка генерации этикетки:', error.message);
      return false;
    }
  }

  private async moveToAwaitingDelivery(order: any): Promise<void> {
    // В реальном API этот метод может быть доступен или статус может изменяться автоматически
    console.log(`📤 Заказ ${order.posting_number} готов к передаче курьеру`);
  }
}
```

#### Система мониторинга и аналитики FBS

```typescript
class FbsAnalyticsSystem {
  constructor(private api: OzonSellerAPI) {}

  async generateDailyReport(date: string): Promise<void> {
    console.log(`📊 Ежедневный отчет FBS за ${date}`);
    console.log('='.repeat(60));

    const startOfDay = `${date}T00:00:00Z`;
    const endOfDay = `${date}T23:59:59Z`;

    // 1. Общая статистика по отправлениям
    const allPostings = await this.api.fbs.getPostingListV3({
      filter: {
        since: startOfDay,
        to: endOfDay
      },
      limit: 1000,
      with: {
        analytics_data: true,
        financial_data: true
      }
    });

    // 2. Статистика по статусам
    const statusStats = this.analyzePostingStatuses(allPostings.result || []);
    
    console.log('\n📦 Статистика по отправлениям:');
    console.log(`Всего отправлений: ${allPostings.result?.length || 0}`);
    
    Object.entries(statusStats).forEach(([status, count]) => {
      const percentage = allPostings.result ? ((count / allPostings.result.length) * 100).toFixed(1) : '0';
      console.log(`  ${status}: ${count} (${percentage}%)`);
    });

    // 3. Финансовая аналитика
    const financialSummary = this.analyzeFinancialData(allPostings.result || []);
    
    console.log('\n💰 Финансовая сводка:');
    console.log(`Общая сумма заказов: ${financialSummary.totalOrderAmount.toFixed(2)} руб.`);
    console.log(`Общая выплата: ${financialSummary.totalPayout.toFixed(2)} руб.`);
    console.log(`Средний чек: ${financialSummary.averageOrderValue.toFixed(2)} руб.`);

    // 4. География доставки
    const geoStats = this.analyzeGeography(allPostings.result || []);
    
    console.log('\n🌍 География доставки:');
    const topRegions = Object.entries(geoStats)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);
      
    topRegions.forEach(([region, count]) => {
      console.log(`  ${region}: ${count} отправлений`);
    });

    // 5. Анализ проблем
    await this.analyzeIssues(allPostings.result || []);

    // 6. Рекомендации
    this.generateRecommendations(statusStats, financialSummary);
  }

  private analyzePostingStatuses(postings: any[]): Record<string, number> {
    const stats: Record<string, number> = {};
    
    postings.forEach(posting => {
      const status = posting.status || 'unknown';
      stats[status] = (stats[status] || 0) + 1;
    });
    
    return stats;
  }

  private analyzeFinancialData(postings: any[]): {
    totalOrderAmount: number;
    totalPayout: number;
    averageOrderValue: number;
  } {
    let totalOrderAmount = 0;
    let totalPayout = 0;
    
    postings.forEach(posting => {
      if (posting.financial_data) {
        totalOrderAmount += posting.financial_data.order_amount || 0;
        totalPayout += posting.financial_data.payout_amount || 0;
      }
    });
    
    return {
      totalOrderAmount,
      totalPayout,
      averageOrderValue: postings.length > 0 ? totalOrderAmount / postings.length : 0
    };
  }

  private analyzeGeography(postings: any[]): Record<string, number> {
    const geoStats: Record<string, number> = {};
    
    postings.forEach(posting => {
      const region = posting.analytics_data?.region || 'Неизвестно';
      geoStats[region] = (geoStats[region] || 0) + 1;
    });
    
    return geoStats;
  }

  private async analyzeIssues(postings: any[]): Promise<void> {
    console.log('\n⚠️ Анализ проблем:');

    // Просроченные заказы
    const now = new Date();
    const overduePostings = postings.filter(posting => {
      const shipmentDate = new Date(posting.shipment_date);
      return shipmentDate < now && posting.status === 'awaiting_packaging';
    });

    if (overduePostings.length > 0) {
      console.log(`🚨 Просроченных заказов: ${overduePostings.length}`);
      
      // Анализ причин просрочек
      const reasonsMap = new Map();
      for (const posting of overduePostings.slice(0, 10)) { // Анализируем первые 10
        // Здесь можно добавить логику определения причин просрочек
        const reason = 'Требует анализа';
        reasonsMap.set(reason, (reasonsMap.get(reason) || 0) + 1);
      }
      
      console.log('Основные причины просрочек:');
      Array.from(reasonsMap.entries()).forEach(([reason, count]) => {
        console.log(`  ${reason}: ${count} случаев`);
      });
    }

    // Отмененные заказы
    const cancelledPostings = postings.filter(p => p.status === 'cancelled');
    if (cancelledPostings.length > 0) {
      console.log(`❌ Отмененных заказов: ${cancelledPostings.length}`);
      
      // Получаем статистику по причинам отмен
      if (cancelledPostings.length > 0) {
        try {
          const cancelReasons = await this.api.fbs.getCancelReasons({
            related_posting_numbers: cancelledPostings.slice(0, 5).map(p => p.posting_number)
          });
          
          // Анализ причин отмен
          const reasonStats = new Map();
          cancelReasons.result?.forEach(posting => {
            posting.cancel_reasons?.forEach(reason => {
              reasonStats.set(reason.name, (reasonStats.get(reason.name) || 0) + 1);
            });
          });
          
          if (reasonStats.size > 0) {
            console.log('Причины отмен:');
            Array.from(reasonStats.entries()).forEach(([reason, count]) => {
              console.log(`  ${reason}: ${count} случаев`);
            });
          }
        } catch (error) {
          console.log('Не удалось получить детали причин отмен');
        }
      }
    }
  }

  private generateRecommendations(
    statusStats: Record<string, number>, 
    financialSummary: any
  ): void {
    console.log('\n💡 Рекомендации:');

    const awaitingCount = statusStats['awaiting_packaging'] || 0;
    const deliveredCount = statusStats['delivered'] || 0;
    const cancelledCount = statusStats['cancelled'] || 0;
    const totalCount = Object.values(statusStats).reduce((sum, count) => sum + count, 0);

    // Анализ скорости обработки
    if (awaitingCount > deliveredCount) {
      console.log('📈 Увеличьте скорость сборки заказов - много заказов ожидает обработки');
    }

    // Анализ отмен
    const cancellationRate = totalCount > 0 ? (cancelledCount / totalCount) * 100 : 0;
    if (cancellationRate > 5) {
      console.log(`📉 Высокий процент отмен (${cancellationRate.toFixed(1)}%) - проанализируйте причины`);
    }

    // Финансовые рекомендации
    if (financialSummary.averageOrderValue < 1000) {
      console.log('💰 Низкий средний чек - рассмотрите кросс-продажи и апселлинг');
    }

    // Общие рекомендации
    console.log('🚀 Автоматизируйте процессы печати этикеток');
    console.log('📊 Настройте мониторинг KPI для контроля качества сервиса');
    console.log('🔔 Используйте push-уведомления для оперативного реагирования');
  }

  async monitorRealTime(): Promise<void> {
    console.log('🔍 Мониторинг FBS в реальном времени');

    const checkInterval = 5 * 60 * 1000; // 5 минут
    
    setInterval(async () => {
      try {
        // Проверяем новые заказы за последние 15 минут
        const recentPostings = await this.api.fbs.getPostingListV3({
          filter: {
            since: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
            to: new Date().toISOString(),
            status: 'awaiting_packaging'
          },
          limit: 100
        });

        if (recentPostings.result && recentPostings.result.length > 0) {
          console.log(`🔔 Новых заказов за 15 минут: ${recentPostings.result.length}`);
          
          // Проверяем срочные заказы
          const urgentOrders = recentPostings.result.filter(posting => {
            const shipmentDate = new Date(posting.shipment_date);
            const hoursUntilShipment = (shipmentDate.getTime() - Date.now()) / (1000 * 60 * 60);
            return hoursUntilShipment < 2; // Менее 2 часов до отгрузки
          });

          if (urgentOrders.length > 0) {
            console.log(`🚨 СРОЧНО: ${urgentOrders.length} заказов требуют немедленной обработки!`);
          }
        }
      } catch (error) {
        console.error('❌ Ошибка мониторинга:', error.message);
      }
    }, checkInterval);
  }
}
```

#### Автоматизация печати этикеток

```typescript
class FbsLabelPrintingService {
  constructor(private api: OzonSellerAPI) {}

  async processBatchLabelPrinting(): Promise<void> {
    console.log('🏷️ Пакетная печать этикеток FBS');

    // 1. Получаем отправления, готовые к печати этикеток
    const readyForLabels = await this.api.fbs.getPostingListV3({
      filter: {
        since: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        to: new Date().toISOString(),
        status: 'awaiting_deliver'
      },
      limit: 500
    });

    if (!readyForLabels.result || readyForLabels.result.length === 0) {
      console.log('✅ Нет отправлений, требующих печати этикеток');
      return;
    }

    console.log(`📋 Найдено ${readyForLabels.result.length} отправлений для печати этикеток`);

    // 2. Группируем по батчам (максимум 20 на батч для синхронной печати)
    const batches = this.createBatches(readyForLabels.result, 20);

    console.log(`📦 Создано ${batches.length} батчей для обработки`);

    // 3. Обрабатываем каждый батч
    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i];
      console.log(`\n🔄 Обработка батча ${i + 1}/${batches.length} (${batch.length} отправлений)`);

      if (batch.length <= 10) {
        // Небольшие батчи - синхронная печать
        await this.processSyncBatch(batch);
      } else {
        // Большие батчи - асинхронная печать
        await this.processAsyncBatch(batch);
      }

      // Пауза между батчами
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    console.log('\n🎉 Пакетная печать этикеток завершена');
  }

  private createBatches<T>(items: T[], batchSize: number): T[][] {
    const batches: T[][] = [];
    for (let i = 0; i < items.length; i += batchSize) {
      batches.push(items.slice(i, i + batchSize));
    }
    return batches;
  }

  private async processSyncBatch(postings: any[]): Promise<void> {
    const postingNumbers = postings.map(p => p.posting_number);
    
    try {
      console.log(`🏷️ Синхронная печать для ${postingNumbers.length} отправлений`);

      const labelResult = await this.api.fbs.packageLabel({
        posting_number: postingNumbers
      });

      if (labelResult.content) {
        console.log(`✅ Этикетки получены (${labelResult.content.length} символов base64)`);
        
        // Сохраняем этикетки
        const fileName = `labels_batch_${Date.now()}.pdf`;
        await this.saveLabelFile(fileName, labelResult.content);
        
        console.log(`💾 Этикетки сохранены в файл: ${fileName}`);
      } else {
        console.log('❌ Не удалось получить содержимое этикеток');
      }
    } catch (error) {
      console.error('❌ Ошибка синхронной печати:', error.message);
    }
  }

  private async processAsyncBatch(postings: any[]): Promise<void> {
    const postingNumbers = postings.map(p => p.posting_number);
    
    try {
      console.log(`⏳ Асинхронная печать для ${postingNumbers.length} отправлений`);

      // Создаем задание на печать
      const batchTask = await this.api.fbs.createLabelBatchV2({
        posting_number: postingNumbers
      });

      if (!batchTask.result?.task_id) {
        console.log('❌ Не удалось создать задание на печать');
        return;
      }

      console.log(`📋 Создано задание: ${batchTask.result.task_id}`);

      // Ждем выполнения задания
      const labelResult = await this.waitForBatchCompletion(batchTask.result.task_id);

      if (labelResult && labelResult.file_url) {
        console.log(`✅ Этикетки готовы: ${labelResult.file_url}`);
        
        // Загружаем и сохраняем файл
        await this.downloadAndSaveLabelFile(labelResult.file_url, `batch_${batchTask.result.task_id}.pdf`);
      } else {
        console.log('❌ Не удалось получить файл с этикетками');
      }
    } catch (error) {
      console.error('❌ Ошибка асинхронной печати:', error.message);
    }
  }

  private async waitForBatchCompletion(taskId: number, maxAttempts: number = 30): Promise<any> {
    const delay = 2000; // 2 секунды между проверками

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        const result = await this.api.fbs.getLabelBatch({ task_id: taskId });

        if (result.result?.status === 'completed') {
          return result.result;
        } else if (result.result?.status === 'failed') {
          throw new Error(`Задание завершилось ошибкой: ${result.result.error_message}`);
        }

        console.log(`⏳ Ожидание завершения задания... (${attempt + 1}/${maxAttempts})`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } catch (error) {
        console.error('Ошибка проверки статуса задания:', error.message);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    throw new Error('Превышено время ожидания выполнения задания');
  }

  private async saveLabelFile(fileName: string, base64Content: string): Promise<void> {
    // В реальном приложении здесь была бы логика сохранения файла
    console.log(`💾 Сохраняем ${fileName} (${base64Content.length} байт base64)`);
    
    // Пример декодирования base64 в Buffer
    // const pdfBuffer = Buffer.from(base64Content, 'base64');
    // await fs.writeFile(fileName, pdfBuffer);
  }

  private async downloadAndSaveLabelFile(fileUrl: string, fileName: string): Promise<void> {
    // В реальном приложении здесь была бы логика загрузки файла по URL
    console.log(`🌐 Загружаем файл с URL: ${fileUrl}`);
    console.log(`💾 Сохраняем как: ${fileName}`);
    
    // Пример загрузки:
    // const response = await fetch(fileUrl);
    // const buffer = await response.buffer();
    // await fs.writeFile(fileName, buffer);
  }

  async printLabelsForUrgentOrders(): Promise<void> {
    console.log('🚨 Печать этикеток для срочных заказов');

    // Получаем заказы, которые нужно отгрузить в ближайшие 2 часа
    const urgentPostings = await this.api.fbs.getPostingListV3({
      filter: {
        since: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // За последние 6 часов
        to: new Date().toISOString(),
        status: 'awaiting_deliver'
      },
      limit: 100
    });

    if (!urgentPostings.result) {
      console.log('✅ Срочных заказов не найдено');
      return;
    }

    // Фильтруем действительно срочные
    const now = new Date();
    const reallyUrgent = urgentPostings.result.filter(posting => {
      const shipmentDate = new Date(posting.shipment_date);
      const hoursUntilShipment = (shipmentDate.getTime() - now.getTime()) / (1000 * 60 * 60);
      return hoursUntilShipment < 2 && hoursUntilShipment > 0;
    });

    if (reallyUrgent.length === 0) {
      console.log('✅ Нет заказов, требующих срочной печати');
      return;
    }

    console.log(`🚨 Найдено ${reallyUrgent.length} срочных заказов`);

    // Печатаем этикетки немедленно (небольшими батчами)
    const urgentBatches = this.createBatches(reallyUrgent, 5);
    
    for (const batch of urgentBatches) {
      await this.processSyncBatch(batch);
      console.log(`✅ Срочная печать для ${batch.length} заказов завершена`);
    }
  }
}
```

## Обработка ошибок

```typescript
try {
  await api.fbs.packageLabel({
    posting_number: ['12345-0001-1']
  });
} catch (error) {
  if (error.response?.status === 400) {
    console.error('Ошибка валидации данных:', error.response.data);
  } else if (error.response?.status === 404) {
    console.error('Отправление не найдено');
  } else if (error.response?.status === 409) {
    console.error('Отправление в неподходящем статусе для операции');
  } else if (error.response?.status === 429) {
    console.error('Превышен лимит запросов, повторите позднее');
  } else {
    console.error('Неожиданная ошибка:', error.message);
  }
}
```

## Рекомендации по использованию

### 🎯 Оптимизация процессов
- Запрашивайте этикетки через 45-60 секунд после сборки заказа
- Используйте batch-обработку для печати этикеток (до 20 за раз)
- Группируйте заказы по приоритетам и срокам отгрузки
- Автоматизируйте процесс проверки остатков товаров

### 📊 Мониторинг и KPI
- Отслеживайте время от получения заказа до отгрузки
- Мониторьте процент отмененных заказов и их причины
- Контролируйте просроченные отправления
- Анализируйте географию доставки для планирования

### 🏷️ Работа с этикетками
- Для небольших партий (до 10) используйте синхронную печать
- Для больших партий используйте асинхронную обработку
- Сохраняйте копии этикеток для отчетности
- Настройте автоматическую печать для срочных заказов

### 🔄 Управление статусами
- Регулярно синхронизируйте статусы с OZON
- Используйте push-уведомления для оперативных изменений
- Автоматизируйте перевод заказов в следующие статусы
- Обрабатывайте спорные ситуации через арбитраж

### 🚀 Автоматизация и интеграция
- Интегрируйте с системой управления складом (WMS)
- Автоматизируйте проверку остатков и резервирование товаров
- Настройте автоматическую отмену недоступных позиций
- Используйте API для синхронизации с учетными системами

FBS API обеспечивает полный контроль над логистическими процессами схемы "Выполнение продавцом", от получения заказа до успешной доставки покупателю.