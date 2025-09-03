# Prices & Stocks API — Управление остатками

Детальная документация по методам управления остатками товаров на складах: обновление запасов, получение информации об остатках и мониторинг складских остатков для схем FBS и rFBS.

## 📋 Методы управления остатками (3 метода)

### 📦 `updateStocks()` — Обновление остатков товаров
### 📊 `getStocks()` — Получение информации об остатках  
### 🏠 `getStocksByWarehouseFbs()` — Детализация по складам FBS

---

## 🔧 TypeScript интерфейсы

### Запросы (Requests)

```typescript
// Запрос обновления остатков
interface PricesStocksUpdateStocksRequest {
  stocks: StockUpdateItem[];          // до 100 пар товар-склад за запрос
}

interface StockUpdateItem {
  // Идентификация товара (один из двух)
  offer_id?: string;                  // артикул продавца (рекомендуется)
  product_id?: number;                // ID товара в системе OZON
  
  // Складская информация (обязательные)
  stock: number;                      // количество товара (без резерва)
  warehouse_id: number;               // ID склада из /v1/warehouse/list
  
  // Специальные параметры (устаревает в 2025)
  quant_size?: number;                // размер кванта (будет отключён 26.06.2025)
}

// Запрос получения остатков
interface PricesStocksGetStocksRequest {
  filter: StocksFilter;               // обязательный фильтр
  limit: number;                      // 1-1000, количество на странице
  cursor?: string;                    // указатель для пагинации
}

interface StocksFilter {
  offer_id?: string[];               // фильтр по артикулам
  product_id?: string[];             // фильтр по ID товаров
  visibility?: ProductVisibility;    // видимость товаров
  with_quant?: WithQuantFilter;      // фильтр по квантам
}

type WithQuantFilter = 'WITH_QUANT' | 'WITHOUT_QUANT' | 'ALL';

// Запрос информации по складам FBS
interface PricesStocksGetStocksByWarehouseFbsRequest {
  sku: string[];                     // SKU товаров в системе OZON
}
```

### Ответы (Responses)

```typescript
// Ответ обновления остатков
interface PricesStocksUpdateStocksResponse {
  result?: StockUpdateResult[];       // результаты для каждой пары товар-склад
}

interface StockUpdateResult {
  offer_id?: string;                  // артикул товара
  product_id?: number;                // ID товара
  warehouse_id?: number;              // ID склада
  updated: boolean;                   // успешно ли обновлены остатки
  errors?: StockUpdateError[];        // массив ошибок при обновлении
}

interface StockUpdateError {
  code: string;                       // код ошибки
  message: string;                    // описание ошибки
  field: string;                      // поле с ошибкой
}

// Ответ получения остатков
interface PricesStocksGetStocksResponse {
  items?: StockInfoItem[];            // информация об остатках товаров
  total?: number;                     // общее количество товаров
  cursor?: string;                    // указатель для следующей страницы
}

interface StockInfoItem {
  product_id: number;                 // ID товара
  offer_id: string;                   // артикул товара
  stocks?: StockDetails[];            // остатки по складам
}

interface StockDetails {
  warehouse_id: number;               // ID склада
  warehouse_name?: string;            // название склада
  present: number;                    // количество в наличии
  reserved: number;                   // зарезервированное количество
  available: number;                  // доступно для продажи
  
  // Дополнительная информация
  coming?: number;                    // ожидается поступление
  defect?: number;                    // бракованные товары
  
  // Статусы
  status?: StockStatus;               // статус товара на складе
  last_updated?: string;              // время последнего обновления
}

type StockStatus = 'ACTIVE' | 'INACTIVE' | 'LIMITED' | 'BLOCKED';

// Ответ информации по складам FBS
interface PricesStocksGetStocksByWarehouseFbsResponse {
  result?: FbsWarehouseStockItem[];   // остатки по складам FBS
}

interface FbsWarehouseStockItem {
  sku: string;                        // SKU товара
  offer_id?: string;                  // артикул товара
  name?: string;                      // название товара
  stocks?: FbsWarehouseStock[];       // остатки по складам
}

interface FbsWarehouseStock {
  warehouse_id: number;               // ID склада
  warehouse_name: string;             // название склада
  present: number;                    // количество в наличии
  reserved: number;                   // зарезервированное количество
  
  // Региональная специфика для rFBS
  region?: string;                    // регион склада
  is_main_warehouse?: boolean;        // основной склад
}
```

---

## 📦 updateStocks() — Обновление остатков товаров

Позволяет изменить информацию о количестве товара в наличии на складах продавца.

### 🔥 Ключевые особенности
- **Лимит**: до 80 запросов в минуту
- **Объём**: до 100 пар товар-склад за запрос
- **Частота**: 1 раз в 30 секунд для одной пары товар-склад
- **Схемы**: FBS и rFBS (для FBO используйте поставки)

### ⚠️ Важные правила обновления остатков

1. **Остатки без резерва**: Указывайте количество без зарезервированных товаров
2. **Проверка резерва**: Используйте `getStocksByWarehouseFbs()` для проверки резерва
3. **Статус товара**: Товар должен иметь статус `price_sent`
4. **Крупногабаритные товары**: только на специализированных складах

### 📝 Примеры использования

```typescript
// Базовое обновление остатков
const basicStockUpdate = await pricesStocksApi.updateStocks({
  stocks: [{
    offer_id: 'LAPTOP001',
    stock: 50,
    warehouse_id: 12345
  }, {
    offer_id: 'SMARTPHONE001', 
    stock: 100,
    warehouse_id: 67890
  }]
});

// Обработка результатов
basicStockUpdate.result?.forEach(result => {
  if (result.updated) {
    console.log(`✅ Остатки товара ${result.offer_id} на складе ${result.warehouse_id} обновлены`);
  } else {
    console.log(`❌ Ошибки для ${result.offer_id}:`);
    result.errors?.forEach(error => {
      console.log(`  - ${error.code}: ${error.message} (поле: ${error.field})`);
    });
  }
});

// Массовое обновление остатков с валидацией
async function massStockUpdate(updates: MassStockUpdate[]): Promise<StockUpdateSummary> {
  // Группировка по размеру батча (100 товаров max)
  const batches = this.chunkArray(updates, 100);
  const results: StockUpdateSummary = {
    successful: 0,
    failed: 0,
    errors: []
  };

  for (const batch of batches) {
    try {
      const batchRequest: PricesStocksUpdateStocksRequest = {
        stocks: batch.map(update => ({
          offer_id: update.offerId,
          stock: update.newStock,
          warehouse_id: update.warehouseId
        }))
      };

      const response = await pricesStocksApi.updateStocks(batchRequest);
      
      // Подсчёт результатов
      response.result?.forEach(result => {
        if (result.updated) {
          results.successful++;
        } else {
          results.failed++;
          if (result.errors) {
            results.errors.push(...result.errors);
          }
        }
      });

      // Задержка между батчами для соблюдения rate limit
      await this.delay(1000); // 1 секунда между батчами

    } catch (error) {
      console.error(`Ошибка при обновлении батча:`, error);
      results.failed += batch.length;
    }
  }

  return results;
}

interface MassStockUpdate {
  offerId: string;
  newStock: number;
  warehouseId: number;
}

interface StockUpdateSummary {
  successful: number;
  failed: number;
  errors: StockUpdateError[];
}
```

### 🚀 Автоматизированный менеджер остатков

```typescript
class StockManager {
  constructor(private api: PricesStocksApi) {}

  async synchronizeStocks(warehouseData: WarehouseStockData[]): Promise<SyncResult> {
    // Получаем текущие остатки из OZON
    const currentOzonStocks = await this.getCurrentOzonStocks(warehouseData.map(d => d.offerId));
    
    // Сравниваем с данными складской системы
    const discrepancies = this.findStockDiscrepancies(currentOzonStocks, warehouseData);
    
    if (discrepancies.length === 0) {
      return { message: 'Все остатки синхронизированы', updatesCount: 0 };
    }

    // Обновляем только те товары, где есть расхождения
    const updateResult = await this.updateStocks({
      stocks: discrepancies.map(d => ({
        offer_id: d.offerId,
        stock: d.correctStock,
        warehouse_id: d.warehouseId
      }))
    });

    return {
      message: `Синхронизация завершена`,
      updatesCount: updateResult.result?.filter(r => r.updated).length || 0,
      errorsCount: updateResult.result?.filter(r => !r.updated).length || 0
    };
  }

  private findStockDiscrepancies(
    ozonStocks: Map<string, number>, 
    warehouseData: WarehouseStockData[]
  ): StockDiscrepancy[] {
    return warehouseData
      .filter(data => {
        const currentOzonStock = ozonStocks.get(data.offerId) || 0;
        return currentOzonStock !== data.actualStock;
      })
      .map(data => ({
        offerId: data.offerId,
        warehouseId: data.warehouseId,
        currentStock: ozonStocks.get(data.offerId) || 0,
        correctStock: data.actualStock
      }));
  }

  async setLowStockAlerts(threshold: number): Promise<LowStockAlert[]> {
    const allStocks = await this.getAllStocks();
    
    return allStocks
      .filter(stock => stock.stocks?.some(s => s.available <= threshold))
      .map(stock => ({
        offerId: stock.offer_id,
        productId: stock.product_id,
        criticalWarehouses: stock.stocks?.filter(s => s.available <= threshold) || []
      }));
  }

  private async getAllStocks(): Promise<StockInfoItem[]> {
    const allStocks: StockInfoItem[] = [];
    let cursor: string | undefined = undefined;

    do {
      const response = await this.api.getStocks({
        filter: { visibility: 'IN_SALE' },
        limit: 1000,
        cursor
      });

      if (response.items) {
        allStocks.push(...response.items);
      }
      
      cursor = response.cursor;
    } while (cursor);

    return allStocks;
  }
}

interface WarehouseStockData {
  offerId: string;
  warehouseId: number;
  actualStock: number;
}

interface StockDiscrepancy {
  offerId: string;
  warehouseId: number;
  currentStock: number;
  correctStock: number;
}

interface SyncResult {
  message: string;
  updatesCount: number;
  errorsCount?: number;
}

interface LowStockAlert {
  offerId: string;
  productId: number;
  criticalWarehouses: StockDetails[];
}
```

---

## 📊 getStocks() — Получение информации об остатках

Возвращает детальную информацию о количестве товаров по схемам FBS и rFBS с поддержкой фильтрации и пагинации.

### 🔥 Ключевые особенности  
- **Схемы**: FBS и rFBS (для FBO используйте Analytics API)
- **Детализация**: наличие, резерв, доступность по каждому складу
- **Пагинация**: курсорная пагинация для больших объёмов
- **Фильтрация**: по видимости, артикулам, квантам

### 📝 Примеры использования

```typescript
// Получение остатков по артикулам
const stocksInfo = await pricesStocksApi.getStocks({
  filter: {
    offer_id: ['LAPTOP001', 'SMARTPHONE001'],
    visibility: 'IN_SALE'
  },
  limit: 100
});

// Детальный анализ остатков
stocksInfo.items?.forEach(item => {
  console.log(`\n=== ${item.offer_id} ===`);
  
  item.stocks?.forEach(stock => {
    console.log(`📦 Склад ${stock.warehouse_name || stock.warehouse_id}:`);
    console.log(`  В наличии: ${stock.present}`);
    console.log(`  Резерв: ${stock.reserved}`);
    console.log(`  Доступно: ${stock.available}`);
    
    if (stock.coming) {
      console.log(`  Ожидается: ${stock.coming}`);
    }
    
    if (stock.defect && stock.defect > 0) {
      console.log(`  ⚠️ Брак: ${stock.defect}`);
    }
    
    // Анализ критических остатков
    if (stock.available <= 5) {
      console.log(`  🚨 КРИТИЧЕСКИЕ ОСТАТКИ!`);
    } else if (stock.available <= 20) {
      console.log(`  ⚠️ Низкие остатки`);
    }
  });
});

// Получение всех товаров с низкими остатками
async function getLowStockProducts(threshold: number = 10): Promise<LowStockProduct[]> {
  const lowStockProducts: LowStockProduct[] = [];
  let cursor: string | undefined = undefined;

  do {
    const response = await pricesStocksApi.getStocks({
      filter: { visibility: 'IN_SALE' },
      limit: 1000,
      cursor
    });

    response.items?.forEach(item => {
      const criticalStocks = item.stocks?.filter(stock => stock.available <= threshold) || [];
      
      if (criticalStocks.length > 0) {
        lowStockProducts.push({
          offerId: item.offer_id,
          productId: item.product_id,
          totalAvailable: item.stocks?.reduce((sum, stock) => sum + stock.available, 0) || 0,
          criticalWarehouses: criticalStocks.length,
          warehouseDetails: criticalStocks
        });
      }
    });
    
    cursor = response.cursor;
  } while (cursor);

  return lowStockProducts.sort((a, b) => a.totalAvailable - b.totalAvailable);
}

interface LowStockProduct {
  offerId: string;
  productId: number;
  totalAvailable: number;
  criticalWarehouses: number;
  warehouseDetails: StockDetails[];
}
```

### 📈 Аналитический дашборд остатков

```typescript
class StockAnalytics {
  constructor(private api: PricesStocksApi) {}

  async generateStockReport(): Promise<StockReport> {
    const allStocks = await this.getAllStocks();
    
    return {
      totalProducts: allStocks.length,
      warehouseAnalysis: this.analyzeWarehouses(allStocks),
      stockDistribution: this.analyzeStockDistribution(allStocks),
      criticalAlerts: this.findCriticalAlerts(allStocks),
      reservationAnalysis: this.analyzeReservations(allStocks),
      recommendations: this.generateRecommendations(allStocks)
    };
  }

  private analyzeWarehouses(stocks: StockInfoItem[]): WarehouseAnalysis {
    const warehouseStats = new Map<number, WarehouseStats>();

    stocks.forEach(item => {
      item.stocks?.forEach(stock => {
        const currentStats = warehouseStats.get(stock.warehouse_id) || {
          warehouseId: stock.warehouse_id,
          warehouseName: stock.warehouse_name || `Склад ${stock.warehouse_id}`,
          totalProducts: 0,
          totalStock: 0,
          totalReserved: 0,
          totalAvailable: 0,
          criticalProducts: 0
        };

        currentStats.totalProducts++;
        currentStats.totalStock += stock.present;
        currentStats.totalReserved += stock.reserved;
        currentStats.totalAvailable += stock.available;
        
        if (stock.available <= 5) {
          currentStats.criticalProducts++;
        }

        warehouseStats.set(stock.warehouse_id, currentStats);
      });
    });

    return {
      totalWarehouses: warehouseStats.size,
      warehouseStats: Array.from(warehouseStats.values())
    };
  }

  private analyzeStockDistribution(stocks: StockInfoItem[]): StockDistribution {
    const distribution = {
      outOfStock: 0,      // 0 товаров
      critical: 0,        // 1-5 товаров
      low: 0,             // 6-20 товаров
      normal: 0,          // 21-100 товаров
      high: 0             // 100+ товаров
    };

    stocks.forEach(item => {
      const totalAvailable = item.stocks?.reduce((sum, stock) => sum + stock.available, 0) || 0;

      if (totalAvailable === 0) {
        distribution.outOfStock++;
      } else if (totalAvailable <= 5) {
        distribution.critical++;
      } else if (totalAvailable <= 20) {
        distribution.low++;
      } else if (totalAvailable <= 100) {
        distribution.normal++;
      } else {
        distribution.high++;
      }
    });

    return distribution;
  }

  private findCriticalAlerts(stocks: StockInfoItem[]): CriticalAlert[] {
    return stocks
      .filter(item => {
        const totalAvailable = item.stocks?.reduce((sum, stock) => sum + stock.available, 0) || 0;
        return totalAvailable <= 5;
      })
      .map(item => ({
        offerId: item.offer_id,
        productId: item.product_id,
        totalAvailable: item.stocks?.reduce((sum, stock) => sum + stock.available, 0) || 0,
        alertLevel: (item.stocks?.reduce((sum, stock) => sum + stock.available, 0) || 0) === 0 ? 'OUT_OF_STOCK' : 'CRITICAL',
        affectedWarehouses: item.stocks?.filter(s => s.available <= 5).length || 0
      }))
      .sort((a, b) => a.totalAvailable - b.totalAvailable);
  }

  private generateRecommendations(stocks: StockInfoItem[]): Recommendation[] {
    const recommendations: Recommendation[] = [];

    // Рекомендации по критическим остаткам
    const criticalItems = stocks.filter(item => {
      const totalAvailable = item.stocks?.reduce((sum, stock) => sum + stock.available, 0) || 0;
      return totalAvailable <= 5;
    });

    if (criticalItems.length > 0) {
      recommendations.push({
        type: 'URGENT_RESTOCK',
        priority: 'HIGH',
        message: `${criticalItems.length} товаров требуют срочного пополнения`,
        affectedProducts: criticalItems.length,
        action: 'Создать поставки или временно снять с продажи'
      });
    }

    // Рекомендации по оптимизации резерва
    const highReservationItems = stocks.filter(item => {
      const totalReserved = item.stocks?.reduce((sum, stock) => sum + stock.reserved, 0) || 0;
      const totalPresent = item.stocks?.reduce((sum, stock) => sum + stock.present, 0) || 0;
      return totalPresent > 0 && (totalReserved / totalPresent) > 0.8;
    });

    if (highReservationItems.length > 0) {
      recommendations.push({
        type: 'OPTIMIZE_RESERVATION',
        priority: 'MEDIUM',
        message: `${highReservationItems.length} товаров имеют высокий процент резерва`,
        affectedProducts: highReservationItems.length,
        action: 'Проверить настройки резервирования'
      });
    }

    return recommendations;
  }
}

interface StockReport {
  totalProducts: number;
  warehouseAnalysis: WarehouseAnalysis;
  stockDistribution: StockDistribution;
  criticalAlerts: CriticalAlert[];
  reservationAnalysis: ReservationAnalysis;
  recommendations: Recommendation[];
}

interface WarehouseAnalysis {
  totalWarehouses: number;
  warehouseStats: WarehouseStats[];
}

interface WarehouseStats {
  warehouseId: number;
  warehouseName: string;
  totalProducts: number;
  totalStock: number;
  totalReserved: number;
  totalAvailable: number;
  criticalProducts: number;
}

interface StockDistribution {
  outOfStock: number;
  critical: number;
  low: number;
  normal: number;
  high: number;
}

interface CriticalAlert {
  offerId: string;
  productId: number;
  totalAvailable: number;
  alertLevel: 'OUT_OF_STOCK' | 'CRITICAL';
  affectedWarehouses: number;
}

interface Recommendation {
  type: 'URGENT_RESTOCK' | 'OPTIMIZE_RESERVATION' | 'REBALANCE_STOCK';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  message: string;
  affectedProducts: number;
  action: string;
}
```

---

## 🏠 getStocksByWarehouseFbs() — Детализация по складам FBS

Получает детальную информацию об остатках товаров на складах продавца по схемам FBS и rFBS.

### 🔥 Ключевые особенности
- **Детализация**: остатки и резерв по каждому складу отдельно
- **Схемы**: FBS и rFBS с региональной спецификой
- **SKU-ориентированность**: работает с SKU товаров

### 📝 Примеры использования

```typescript
// Получение остатков по складам FBS
const fbsStocks = await pricesStocksApi.getStocksByWarehouseFbs({
  sku: ['123456789', '987654321', '456789123']
});

// Анализ остатков по складам
fbsStocks.result?.forEach(item => {
  console.log(`\n=== ${item.name || `SKU: ${item.sku}`} ===`);
  
  if (!item.stocks || item.stocks.length === 0) {
    console.log(`❌ Товар не найден на складах`);
    return;
  }

  let totalStock = 0;
  let totalReserved = 0;

  item.stocks.forEach(stock => {
    console.log(`📦 ${stock.warehouse_name} (ID: ${stock.warehouse_id}):`);
    console.log(`  В наличии: ${stock.present}`);
    console.log(`  Резерв: ${stock.reserved}`);
    console.log(`  Доступно: ${stock.present - stock.reserved}`);
    
    totalStock += stock.present;
    totalReserved += stock.reserved;
    
    if (stock.region) {
      console.log(`  Регион: ${stock.region}`);
    }
    
    if (stock.is_main_warehouse) {
      console.log(`  🏢 Основной склад`);
    }
  });

  console.log(`📊 ИТОГО: ${totalStock} шт. (резерв: ${totalReserved})`);
});

// Сравнение остатков по регионам для rFBS
function analyzeRegionalStocks(fbsData: FbsWarehouseStockItem[]): RegionalAnalysis {
  const regionalStats = new Map<string, RegionalStats>();

  fbsData.forEach(item => {
    item.stocks?.forEach(stock => {
      const region = stock.region || 'Не указан';
      
      const currentStats = regionalStats.get(region) || {
        region,
        warehouses: new Set(),
        totalStock: 0,
        totalReserved: 0,
        products: new Set()
      };

      currentStats.warehouses.add(stock.warehouse_id);
      currentStats.totalStock += stock.present;
      currentStats.totalReserved += stock.reserved;
      currentStats.products.add(item.sku);

      regionalStats.set(region, currentStats);
    });
  });

  return {
    totalRegions: regionalStats.size,
    regionStats: Array.from(regionalStats.entries()).map(([region, stats]) => ({
      region,
      warehouseCount: stats.warehouses.size,
      productCount: stats.products.size,
      totalStock: stats.totalStock,
      totalReserved: stats.totalReserved,
      availableStock: stats.totalStock - stats.totalReserved
    }))
  };
}

interface RegionalStats {
  region: string;
  warehouses: Set<number>;
  totalStock: number;
  totalReserved: number;
  products: Set<string>;
}

interface RegionalAnalysis {
  totalRegions: number;
  regionStats: {
    region: string;
    warehouseCount: number;
    productCount: number;
    totalStock: number;
    totalReserved: number;
    availableStock: number;
  }[];
}
```

### 🔄 Автоматическая синхронизация остатков

```typescript
class FbsStockSynchronizer {
  constructor(private api: PricesStocksApi) {}

  async syncWithWarehouseSystem(warehouseSku: string[]): Promise<SyncReport> {
    // Получаем текущие данные из OZON
    const ozonStocks = await this.api.getStocksByWarehouseFbs({ sku: warehouseSku });
    
    // Получаем данные из внешней складской системы
    const externalStocks = await this.getExternalWarehouseData(warehouseSku);
    
    // Находим расхождения
    const discrepancies = this.findDiscrepancies(ozonStocks.result || [], externalStocks);
    
    if (discrepancies.length === 0) {
      return {
        status: 'SUCCESS',
        message: 'Все остатки синхронизированы',
        syncedItems: 0,
        discrepancies: []
      };
    }

    // Подготавливаем обновления остатков
    const stockUpdates = this.prepareStockUpdates(discrepancies);
    
    // Выполняем обновления
    const updateResults = await this.executeStockUpdates(stockUpdates);
    
    return {
      status: updateResults.allSuccess ? 'SUCCESS' : 'PARTIAL',
      message: `Обновлено ${updateResults.successCount} из ${discrepancies.length} позиций`,
      syncedItems: updateResults.successCount,
      discrepancies: discrepancies.map(d => ({
        sku: d.sku,
        warehouseId: d.warehouseId,
        ozonStock: d.ozonStock,
        actualStock: d.actualStock,
        difference: d.actualStock - d.ozonStock
      }))
    };
  }

  private findDiscrepancies(
    ozonData: FbsWarehouseStockItem[], 
    externalData: ExternalWarehouseData[]
  ): StockDiscrepancy[] {
    const discrepancies: StockDiscrepancy[] = [];

    externalData.forEach(external => {
      const ozonItem = ozonData.find(item => item.sku === external.sku);
      
      if (!ozonItem) {
        discrepancies.push({
          sku: external.sku,
          warehouseId: external.warehouseId,
          ozonStock: 0,
          actualStock: external.actualStock
        });
        return;
      }

      const ozonWarehouseStock = ozonItem.stocks?.find(s => s.warehouse_id === external.warehouseId);
      const ozonStock = ozonWarehouseStock?.present || 0;

      if (ozonStock !== external.actualStock) {
        discrepancies.push({
          sku: external.sku,
          warehouseId: external.warehouseId,
          ozonStock,
          actualStock: external.actualStock
        });
      }
    });

    return discrepancies;
  }

  private prepareStockUpdates(discrepancies: StockDiscrepancy[]): StockUpdateItem[] {
    return discrepancies.map(d => ({
      offer_id: d.sku, // Assuming SKU can be used as offer_id
      stock: d.actualStock,
      warehouse_id: d.warehouseId
    }));
  }

  private async executeStockUpdates(updates: StockUpdateItem[]): Promise<UpdateExecutionResult> {
    // Разбиваем на батчи по 100 товаров
    const batches = this.chunkArray(updates, 100);
    let successCount = 0;
    let failureCount = 0;

    for (const batch of batches) {
      try {
        const result = await this.api.updateStocks({ stocks: batch });
        
        result.result?.forEach(r => {
          if (r.updated) {
            successCount++;
          } else {
            failureCount++;
          }
        });

        // Задержка между батчами
        await this.delay(1000);

      } catch (error) {
        failureCount += batch.length;
      }
    }

    return {
      successCount,
      failureCount,
      allSuccess: failureCount === 0
    };
  }

  private async getExternalWarehouseData(skus: string[]): Promise<ExternalWarehouseData[]> {
    // Здесь должна быть интеграция с внешней складской системой
    // Возвращаем mock данные для примера
    return skus.map(sku => ({
      sku,
      warehouseId: 12345,
      actualStock: Math.floor(Math.random() * 100)
    }));
  }

  private chunkArray<T>(array: T[], chunkSize: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

interface ExternalWarehouseData {
  sku: string;
  warehouseId: number;
  actualStock: number;
}

interface StockDiscrepancy {
  sku: string;
  warehouseId: number;
  ozonStock: number;
  actualStock: number;
}

interface UpdateExecutionResult {
  successCount: number;
  failureCount: number;
  allSuccess: boolean;
}

interface SyncReport {
  status: 'SUCCESS' | 'PARTIAL' | 'FAILED';
  message: string;
  syncedItems: number;
  discrepancies: {
    sku: string;
    warehouseId: number;
    ozonStock: number;
    actualStock: number;
    difference: number;
  }[];
}
```

---

## ⚠️ Обработка ошибок и рекомендации

### Частые ошибки обновления остатков

```typescript
class StockErrorHandler {
  static handleStockUpdateErrors(errors: StockUpdateError[]): void {
    errors.forEach(error => {
      switch (error.code) {
        case 'TOO_MANY_REQUESTS':
          console.log('⏰ Превышен лимит запросов. Уменьшите частоту обновлений');
          break;
          
        case 'INVALID_WAREHOUSE':
          console.log('🏠 Некорректный ID склада. Получите список через /v1/warehouse/list');
          break;
          
        case 'PRODUCT_NOT_FOUND':
          console.log('❌ Товар не найден. Проверьте offer_id или product_id');
          break;
          
        case 'STOCK_UPDATE_TOO_FREQUENT':
          console.log('🕐 Слишком частое обновление. Ждите 30 секунд между обновлениями одной пары');
          break;
          
        case 'INVALID_STOCK_VALUE':
          console.log('📊 Некорректное значение остатков. Должно быть неотрицательное число');
          break;
          
        case 'PRODUCT_STATUS_NOT_READY':
          console.log('⏳ Товар не готов. Статус должен быть "price_sent"');
          break;
          
        default:
          console.log(`❓ Неизвестная ошибка: ${error.code} - ${error.message}`);
      }
    });
  }
}
```

### 🎯 Лучшие практики управления остатками

1. **Соблюдение лимитов**: Не более 80 запросов в минуту, 30 секунд между обновлениями пары товар-склад
2. **Проверка резерва**: Всегда проверяйте зарезервированные товары перед обновлением
3. **Мониторинг**: Настройте алерты на критические остатки
4. **Синхронизация**: Регулярно синхронизируйте с внутренними складскими системами
5. **Логирование**: Ведите журнал всех изменений остатков для аудита