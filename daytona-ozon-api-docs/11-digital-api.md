# Digital API

API для управления цифровыми товарами в OZON Seller API.

**Количество методов**: 4 метода (1 дополнительный для совместимости)

## Обзор

Digital API предоставляет функциональность для управления цифровыми товарами:
- 📦 Получение списка отправлений с цифровыми товарами
- 🔑 Загрузка кодов цифровых товаров (лицензии, ключи активации)
- 📊 Обновление остатков цифровых товаров
- ⏰ Соблюдение дедлайнов загрузки кодов (24 часа)

## Основные возможности

### 🎯 Управление отправлениями
- Получение списка отправлений, требующих загрузки кодов
- Фильтрация по дате и статусу
- Получение аналитических и финансовых данных

### 🔐 Управление кодами
- Загрузка цифровых кодов (лицензии, ключи, коды активации)
- Обработка недоступных кодов
- Контроль качества загруженных кодов

### 📦 Управление остатками
- Обновление информации о количестве доступных цифровых товаров
- Пакетные обновления остатков
- Обработка ошибок валидации

### ⚠️ Ограничения
- Доступно только продавцам, работающим с цифровыми товарами
- Коды должны быть загружены в течение 24 часов с момента получения заказа
- Рекомендуемый размер батча для обновления остатков: 100 товаров

## Методы API

### getDigitalPostingsList()

**Назначение**: Получить список отправлений с цифровыми товарами

```typescript
interface DigitalListPostingCodesRequest {
  dir?: 'ASC' | 'DESC';
  filter?: {
    since?: string;
    to?: string;
    cutoff_from?: string;
    cutoff_to?: string;
  };
  limit?: number;
  offset?: number;
  with?: {
    financial_data?: boolean;
    analytics_data?: boolean;
    legal_info?: boolean;
  };
}
```

### uploadDigitalCodes()

**Назначение**: Загрузить коды цифровых товаров для отправления

```typescript
interface DigitalUploadPostingCodesRequest {
  posting_number: string;
  exemplars_by_sku: Array<{
    sku: number;
    exemplar_qty: number;
    not_available_exemplar_qty: number;
    exemplar_keys: string[];
  }>;
}
```

### updateDigitalStocks()

**Назначение**: Обновить остатки цифровых товаров

```typescript
interface DigitalStocksImportRequest {
  stocks: Array<{
    offer_id: string;
    stock: number;
  }>;
}
```

## Практические примеры

### Базовое использование

```typescript
import { OzonSellerAPI } from 'bmad-ozon-seller-api';

const api = new OzonSellerAPI({
  clientId: 'your-client-id',
  apiKey: 'your-api-key'
});

// Получить отправления, ожидающие загрузки кодов
const weekAgo = new Date();
weekAgo.setDate(weekAgo.getDate() - 7);

const digitalPostings = await api.digital.getDigitalPostingsList({
  filter: {
    since: weekAgo.toISOString().split('T')[0],
    to: new Date().toISOString().split('T')[0]
  },
  limit: 100,
  with: {
    financial_data: true,
    analytics_data: true
  }
});

// Загрузить коды для отправления
await api.digital.uploadDigitalCodes({
  posting_number: '12345-0001-1',
  exemplars_by_sku: [{
    sku: 123456789,
    exemplar_qty: 3,
    not_available_exemplar_qty: 0,
    exemplar_keys: [
      'GAME_KEY_001_ABC123',
      'GAME_KEY_002_DEF456', 
      'GAME_KEY_003_GHI789'
    ]
  }]
});

// Обновить остатки цифровых товаров
await api.digital.updateDigitalStocks({
  stocks: [
    {
      offer_id: 'GAME_DIGITAL_001',
      stock: 50
    },
    {
      offer_id: 'SOFTWARE_LICENSE_002', 
      stock: 25
    }
  ]
});
```

### Продвинутые сценарии

#### Менеджер цифровых заказов

```typescript
class DigitalOrderManager {
  constructor(private api: OzonSellerAPI) {}

  async processDigitalOrders(): Promise<void> {
    // Получить все заказы, ожидающие загрузки кодов
    const pendingOrders = await this.api.digital.getDigitalPostingsList({
      filter: {
        since: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      },
      limit: 1000,
      with: {
        analytics_data: true,
        financial_data: true
      }
    });

    const ordersNeedingCodes = pendingOrders.result?.filter(posting => 
      posting.status === 'awaiting_packaging' &&
      posting.products?.some(product => product.required_qty_for_digital_code > 0)
    ) || [];

    console.log(`Найдено ${ordersNeedingCodes.length} заказов, требующих загрузки кодов`);

    for (const order of ordersNeedingCodes) {
      await this.uploadCodesForOrder(order);
      
      // Задержка между обработкой заказов
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  private async uploadCodesForOrder(order: any): Promise<void> {
    try {
      const codesByProduct = [];
      
      for (const product of order.products || []) {
        if (product.required_qty_for_digital_code > 0) {
          const codes = await this.generateCodesForProduct(
            product.sku, 
            product.required_qty_for_digital_code
          );
          
          codesByProduct.push({
            sku: product.sku,
            exemplar_qty: codes.length,
            not_available_exemplar_qty: 0,
            exemplar_keys: codes
          });
        }
      }

      if (codesByProduct.length > 0) {
        const result = await this.api.digital.uploadDigitalCodes({
          posting_number: order.posting_number,
          exemplars_by_sku: codesByProduct
        });

        this.validateUploadResults(order.posting_number, result);
      }
    } catch (error) {
      console.error(`Ошибка обработки заказа ${order.posting_number}:`, error);
    }
  }

  private async generateCodesForProduct(sku: number, quantity: number): Promise<string[]> {
    // Логика генерации или получения кодов из внешней системы
    const codes: string[] = [];
    
    for (let i = 0; i < quantity; i++) {
      codes.push(`${sku}_KEY_${Date.now()}_${Math.random().toString(36).substring(7).toUpperCase()}`);
    }
    
    return codes;
  }

  private validateUploadResults(postingNumber: string, result: any): void {
    let totalReceived = 0;
    let totalRejected = 0;

    result.exemplars_by_sku?.forEach((skuResult: any) => {
      totalReceived += skuResult.received_qty || 0;
      totalRejected += skuResult.rejected_qty || 0;
      
      if (skuResult.failed_exemplars?.length > 0) {
        console.warn(`Отклоненные коды для SKU ${skuResult.sku} в заказе ${postingNumber}:`);
        skuResult.failed_exemplars.forEach((error: any) => {
          console.warn(`  ${error.code}: ${error.message}`);
        });
      }
    });

    console.log(`Заказ ${postingNumber}: принято кодов ${totalReceived}, отклонено ${totalRejected}`);
  }
}
```

#### Система мониторинга остатков

```typescript
class DigitalStockMonitor {
  constructor(
    private api: OzonSellerAPI,
    private lowStockThreshold: number = 10
  ) {}

  async monitorAndUpdateStocks(): Promise<void> {
    // Получить текущие остатки из внешней системы
    const stockData = await this.getExternalStockData();
    
    // Найти товары с низкими остатками
    const lowStockItems = stockData.filter(item => item.availableStock <= this.lowStockThreshold);
    
    if (lowStockItems.length > 0) {
      console.warn(`Обнаружено ${lowStockItems.length} товаров с низкими остатками`);
      await this.sendLowStockAlert(lowStockItems);
    }
    
    // Обновить остатки в OZON
    await this.updateStocksBatch(stockData);
    
    // Генерация отчета по остаткам
    await this.generateStockReport(stockData);
  }

  private async updateStocksBatch(stockData: any[]): Promise<void> {
    const batchSize = 100;
    let successCount = 0;
    let errorCount = 0;
    
    for (let i = 0; i < stockData.length; i += batchSize) {
      const batch = stockData.slice(i, i + batchSize);
      
      try {
        const result = await this.api.digital.updateDigitalStocks({
          stocks: batch.map(item => ({
            offer_id: item.offerId,
            stock: item.availableStock
          }))
        });
        
        // Подсчет результатов
        result.status?.forEach(status => {
          if (status.updated) {
            successCount++;
          } else {
            errorCount++;
            console.error(`Ошибка обновления ${status.offer_id}:`, status.errors);
          }
        });
        
        console.log(`Обработан батч ${Math.floor(i / batchSize) + 1}/${Math.ceil(stockData.length / batchSize)}`);
        
        // Задержка между батчами
        if (i + batchSize < stockData.length) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      } catch (error) {
        console.error(`Ошибка обновления батча:`, error);
        errorCount += batch.length;
      }
    }
    
    console.log(`Обновление остатков завершено: успешно ${successCount}, ошибок ${errorCount}`);
  }

  private async getExternalStockData(): Promise<any[]> {
    // Эмуляция получения данных из внешней системы
    return [
      { offerId: 'GAME_DIGITAL_001', availableStock: 50 },
      { offerId: 'SOFTWARE_LICENSE_002', availableStock: 5 }, // Низкий остаток
      { offerId: 'DIGITAL_BOOK_003', availableStock: 100 },
      { offerId: 'MUSIC_ALBUM_004', availableStock: 2 }, // Критически низкий остаток
    ];
  }

  private async sendLowStockAlert(lowStockItems: any[]): Promise<void> {
    // Логика отправки уведомлений о низких остатках
    console.log('🚨 Уведомление о низких остатках:');
    lowStockItems.forEach(item => {
      const severity = item.availableStock <= 5 ? '🔴 КРИТИЧНО' : '🟡 ВНИМАНИЕ';
      console.log(`${severity} ${item.offerId}: ${item.availableStock} шт.`);
    });
  }

  private async generateStockReport(stockData: any[]): Promise<void> {
    const totalItems = stockData.length;
    const totalStock = stockData.reduce((sum, item) => sum + item.availableStock, 0);
    const avgStock = Math.round(totalStock / totalItems);
    const lowStockCount = stockData.filter(item => item.availableStock <= this.lowStockThreshold).length;
    
    console.log('\n📊 Отчет по остаткам цифровых товаров:');
    console.log(`Всего товаров: ${totalItems}`);
    console.log(`Общий остаток: ${totalStock} шт.`);
    console.log(`Средний остаток: ${avgStock} шт.`);
    console.log(`Товаров с низким остатком: ${lowStockCount} (${Math.round(lowStockCount / totalItems * 100)}%)`);
  }
}
```

#### Аналитическая система отчетности

```typescript
class DigitalAnalyticsReporter {
  constructor(private api: OzonSellerAPI) {}

  async generateDigitalSalesReport(dateFrom: string, dateTo: string): Promise<void> {
    const digitalPostings = await this.api.digital.getDigitalPostingsList({
      filter: {
        since: dateFrom,
        to: dateTo
      },
      limit: 1000,
      with: {
        financial_data: true,
        analytics_data: true
      }
    });

    const analytics = this.analyzeDigitalSales(digitalPostings.result || []);
    this.generateReport(analytics, dateFrom, dateTo);
  }

  private analyzeDigitalSales(postings: any[]): any {
    const analytics = {
      totalOrders: postings.length,
      totalRevenue: 0,
      totalCommission: 0,
      productStats: new Map(),
      regionStats: new Map(),
      statusStats: new Map(),
      codeUploadStats: {
        totalRequired: 0,
        uploaded: 0,
        pending: 0
      }
    };

    postings.forEach(posting => {
      // Финансовая аналитика
      if (posting.financial_data) {
        analytics.totalRevenue += posting.financial_data.order_amount || 0;
        analytics.totalCommission += posting.financial_data.commission || 0;
      }

      // Статистика статусов
      const currentCount = analytics.statusStats.get(posting.status) || 0;
      analytics.statusStats.set(posting.status, currentCount + 1);

      // Региональная аналитика
      if (posting.analytics_data?.region) {
        const regionCount = analytics.regionStats.get(posting.analytics_data.region) || 0;
        analytics.regionStats.set(posting.analytics_data.region, regionCount + 1);
      }

      // Аналитика по продуктам и кодам
      posting.products?.forEach((product: any) => {
        const sku = product.sku.toString();
        if (!analytics.productStats.has(sku)) {
          analytics.productStats.set(sku, {
            name: product.name,
            totalSold: 0,
            totalRevenue: 0,
            codesRequired: 0
          });
        }

        const productStat = analytics.productStats.get(sku);
        productStat.totalSold += product.quantity;
        productStat.totalRevenue += (product.price || 0) * product.quantity;
        productStat.codesRequired += product.required_qty_for_digital_code || 0;

        analytics.codeUploadStats.totalRequired += product.required_qty_for_digital_code || 0;
        
        if (product.required_qty_for_digital_code > 0 && posting.status === 'awaiting_packaging') {
          analytics.codeUploadStats.pending += product.required_qty_for_digital_code;
        } else if (product.required_qty_for_digital_code > 0) {
          analytics.codeUploadStats.uploaded += product.required_qty_for_digital_code;
        }
      });
    });

    return analytics;
  }

  private generateReport(analytics: any, dateFrom: string, dateTo: string): void {
    console.log(`\n📈 Отчет по цифровым товарам (${dateFrom} - ${dateTo})`);
    console.log('='.repeat(60));
    
    // Общая статистика
    console.log('\n📊 Общая статистика:');
    console.log(`Всего заказов: ${analytics.totalOrders}`);
    console.log(`Общая выручка: ${analytics.totalRevenue.toFixed(2)} руб.`);
    console.log(`Общая комиссия: ${analytics.totalCommission.toFixed(2)} руб.`);
    console.log(`Чистая прибыль: ${(analytics.totalRevenue - analytics.totalCommission).toFixed(2)} руб.`);
    console.log(`Средний чек: ${(analytics.totalRevenue / analytics.totalOrders).toFixed(2)} руб.`);

    // Статистика по кодам
    console.log('\n🔑 Статистика по кодам:');
    console.log(`Всего требуется кодов: ${analytics.codeUploadStats.totalRequired}`);
    console.log(`Загружено кодов: ${analytics.codeUploadStats.uploaded}`);
    console.log(`Ожидает загрузки: ${analytics.codeUploadStats.pending}`);
    
    if (analytics.codeUploadStats.totalRequired > 0) {
      const uploadRate = (analytics.codeUploadStats.uploaded / analytics.codeUploadStats.totalRequired * 100).toFixed(1);
      console.log(`Процент загрузки: ${uploadRate}%`);
    }

    // Топ товары
    console.log('\n🏆 Топ-5 товаров по продажам:');
    const topProducts = Array.from(analytics.productStats.entries())
      .sort(([,a], [,b]) => b.totalRevenue - a.totalRevenue)
      .slice(0, 5);
      
    topProducts.forEach(([sku, stats], index) => {
      console.log(`${index + 1}. ${stats.name} (SKU: ${sku})`);
      console.log(`   Продано: ${stats.totalSold} шт., Выручка: ${stats.totalRevenue.toFixed(2)} руб.`);
    });

    // Статистика по регионам
    if (analytics.regionStats.size > 0) {
      console.log('\n🌍 Топ-5 регионов:');
      const topRegions = Array.from(analytics.regionStats.entries())
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5);
        
      topRegions.forEach(([region, count], index) => {
        const percentage = (count / analytics.totalOrders * 100).toFixed(1);
        console.log(`${index + 1}. ${region}: ${count} заказов (${percentage}%)`);
      });
    }

    // Статистика по статусам
    console.log('\n📦 Статусы заказов:');
    Array.from(analytics.statusStats.entries()).forEach(([status, count]) => {
      const percentage = (count / analytics.totalOrders * 100).toFixed(1);
      console.log(`${status}: ${count} заказов (${percentage}%)`);
    });
  }
}
```

## Обработка ошибок

```typescript
try {
  await api.digital.uploadDigitalCodes({
    posting_number: '12345-0001-1',
    exemplars_by_sku: [/* ... */]
  });
} catch (error) {
  if (error.response?.status === 400) {
    console.error('Ошибка валидации данных:', error.response.data);
  } else if (error.response?.status === 403) {
    console.error('Нет доступа к цифровым товарам');
  } else if (error.response?.status === 404) {
    console.error('Отправление не найдено');
  } else {
    console.error('Неожиданная ошибка:', error.message);
  }
}
```

## Рекомендации по использованию

### 🎯 Производительность
- Используйте пакетные обновления остатков (до 100 товаров за запрос)
- Добавляйте задержки между запросами для избежания rate limiting
- Кешируйте результаты получения списка отправлений

### 🔒 Безопасность  
- Храните цифровые коды в зашифрованном виде
- Логируйте все операции с кодами для аудита
- Используйте уникальные и сложные коды для предотвращения мошенничества

### 📊 Мониторинг
- Отслеживайте дедлайны загрузки кодов (24 часа)
- Мониторьте низкие остатки цифровых товаров
- Анализируйте статистику отклоненных кодов

### 🚀 Автоматизация
- Автоматизируйте процесс генерации и загрузки кодов
- Настройте уведомления о низких остатках
- Интегрируйте с внешними системами управления лицензиями

Digital API предоставляет полный контроль над цифровыми товарами, от управления отправлениями до обновления остатков, обеспечивая эффективную работу с цифровым контентом на платформе OZON.