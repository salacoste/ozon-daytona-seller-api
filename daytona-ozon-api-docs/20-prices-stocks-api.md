# Prices & Stocks API Documentation

## Overview

Prices & Stocks API предоставляет полный контроль над ценами и остатками товаров на OZON. API включает **9 методов** для управления ценообразованием, складскими остатками, уценёнными товарами и таймерами актуальности цен.

### Key Features

- 💰 **Управление ценами** - обновление цен, old_price, premium_price
- 📦 **Управление остатками** - синхронизация складских остатков по всем складам
- 🏷️ **Уценённые товары** - работа с уценённой продукцией и установка скидок
- ⏱️ **Таймеры актуальности** - управление таймерами минимальных цен
- 🏭 **FBS/rFBS поддержка** - работа со складами продавца
- 📊 **Детальная информация** - получение подробных данных о ценах и остатках
- 🔄 **Массовые операции** - обновление до 100 товаров за запрос

## Rate Limits

- **Цены**: до 10 обновлений в час на товар
- **Остатки**: до 80 запросов в минуту с аккаунта
- **Массовые операции**: до 100 товаров за запрос

## Available Methods

### Price Management Methods

#### updatePrices()
Обновляет цены одного или нескольких товаров с поддержкой обычной и премиум-цены.

```typescript
const result = await pricesStocksApi.updatePrices({
  prices: [{
    offer_id: 'ITEM001',
    price: '1500',
    old_price: '2000',
    premium_price: '1400',
    currency_code: 'RUB'
  }, {
    product_id: 123456,
    price: '999',
    old_price: '0', // Сброс старой цены
    currency_code: 'RUB'
  }]
});

result.result?.forEach(item => {
  if (item.updated) {
    console.log(`✅ Цена товара ${item.offer_id || item.product_id} обновлена`);
  } else {
    console.log(`❌ Ошибки: ${item.errors?.join(', ')}`);
  }
});
```

#### getPrices()
Получает информацию о ценах товаров с фильтрацией и пагинацией.

```typescript
const prices = await pricesStocksApi.getPrices({
  filter: {
    offer_id: ['ITEM001', 'ITEM002'],
    visibility: 'VISIBLE'
  },
  limit: 100,
  cursor: 'next_page_token'
});

prices.items?.forEach(item => {
  console.log(`Товар ${item.offer_id}: ${item.price} ${item.currency_code}`);
  if (item.old_price) {
    console.log(`  Скидка: ${((item.old_price - item.price) / item.old_price * 100).toFixed(1)}%`);
  }
  if (item.premium_price) {
    console.log(`  Premium цена: ${item.premium_price}`);
  }
});
```

### Stock Management Methods

#### updateStocks()
Обновляет количество товаров на складах.

```typescript
const result = await pricesStocksApi.updateStocks({
  stocks: [{
    offer_id: 'ITEM001',
    stock: 100,
    warehouse_id: 12345
  }, {
    product_id: 987654,
    stock: 50,
    warehouse_id: 67890
  }, {
    offer_id: 'ITEM002',
    stock: 0, // Убрать из продажи
    warehouse_id: 12345
  }]
});

result.result?.forEach(item => {
  if (item.updated) {
    console.log(`✅ Остатки товара ${item.offer_id || item.product_id} обновлены`);
  } else {
    console.log(`❌ Ошибки: ${item.errors?.join(', ')}`);
  }
});
```

#### getStocks()
Получает информацию о количестве товаров по схемам FBS и rFBS.

```typescript
const stocks = await pricesStocksApi.getStocks({
  filter: {
    offer_id: ['ITEM001', 'ITEM002'],
    visibility: 'VISIBLE'
  },
  limit: 100
});

stocks.items?.forEach(item => {
  console.log(`📦 Товар ${item.offer_id} (SKU: ${item.sku})`);
  let totalStock = 0;
  let totalReserved = 0;
  
  item.stocks?.forEach(stock => {
    console.log(`  Склад ${stock.warehouse_id}: ${stock.present} в наличии, ${stock.reserved} зарезервировано`);
    totalStock += stock.present;
    totalReserved += stock.reserved;
  });
  
  console.log(`  Общий остаток: ${totalStock}, зарезервировано: ${totalReserved}`);
});
```

#### getStocksByWarehouseFbs()
Получает детальную информацию об остатках на складах FBS/rFBS.

```typescript
const stockInfo = await pricesStocksApi.getStocksByWarehouseFbs({
  sku: ['123456789', '987654321']
});

stockInfo.result?.forEach(product => {
  console.log(`🏭 SKU: ${product.sku}`);
  product.stocks?.forEach(stock => {
    console.log(`  Склад "${stock.warehouse_name}" (ID: ${stock.warehouse_id})`);
    console.log(`    В наличии: ${stock.present}`);
    console.log(`    Зарезервировано: ${stock.reserved}`);
    console.log(`    Ожидается: ${stock.waiting || 0}`);
  });
});
```

### Discounted Products Methods

#### getDiscountedProductInfo()
Получает информацию об уценённых товарах по их SKU.

```typescript
const discountedInfo = await pricesStocksApi.getDiscountedProductInfo({
  discounted_skus: ['987654321', '123456789']
});

discountedInfo.items?.forEach(item => {
  console.log(`🏷️ Уценённый товар:`);
  console.log(`  Уценённый SKU: ${item.discounted_sku}`);
  console.log(`  Основной SKU: ${item.original_sku}`);
  console.log(`  Состояние: ${item.condition}`);
  console.log(`  Скидка: ${item.discount_percentage}%`);
  console.log(`  Причина уценки: ${item.reason || 'Не указана'}`);
});
```

#### updateDiscountedProductDiscount()
Устанавливает размер скидки на уценённые товары FBS.

```typescript
const result = await pricesStocksApi.updateDiscountedProductDiscount({
  product_id: 123456,
  discount: 25 // 25% скидка
});

if (result.result) {
  console.log('✅ Скидка 25% успешно установлена');
} else {
  console.log('❌ Ошибка при установке скидки');
}
```

### Action Timer Methods

#### getActionTimerStatus()
Получает статус таймеров актуальности минимальной цены.

```typescript
const timerStatus = await pricesStocksApi.getActionTimerStatus({
  product_ids: ['123456', '789012']
});

timerStatus.statuses?.forEach(status => {
  console.log(`⏱️ Товар ${status.product_id}:`);
  console.log(`  Таймер: ${status.is_timer_enabled ? '🟢 включен' : '🔴 выключен'}`);
  if (status.next_update_time) {
    console.log(`  Следующее обновление: ${new Date(status.next_update_time).toLocaleString()}`);
  }
});
```

#### updateActionTimer()
Обновляет таймер актуальности минимальной цены для товаров.

```typescript
await pricesStocksApi.updateActionTimer({
  product_ids: ['123456', '789012']
});

console.log('✅ Таймеры актуальности обновлены');
```

## TypeScript Interfaces

### Request Types

```typescript
interface PricesStocksImportPricesRequest {
  prices: PriceUpdateItem[];
}

interface PriceUpdateItem {
  offer_id?: string;
  product_id?: number;
  price: string;
  old_price?: string;
  premium_price?: string;
  currency_code: 'RUB' | 'USD' | 'EUR';
}

interface PricesStocksUpdateStocksRequest {
  stocks: StockUpdateItem[];
}

interface StockUpdateItem {
  offer_id?: string;
  product_id?: number;
  stock: number;
  warehouse_id: number;
}

interface PricesStocksGetPricesRequest {
  filter?: PricesFilter;
  limit?: number;
  cursor?: string;
}

interface PricesFilter {
  offer_id?: string[];
  product_id?: number[];
  visibility?: 'VISIBLE' | 'INVISIBLE' | 'ALL';
}

interface PricesStocksGetStocksRequest {
  filter?: StocksFilter;
  limit?: number;
  cursor?: string;
}

interface StocksFilter {
  offer_id?: string[];
  product_id?: number[];
  visibility?: 'VISIBLE' | 'INVISIBLE' | 'ALL';
  warehouse_id?: number[];
}

interface PricesStocksGetDiscountedInfoRequest {
  discounted_skus: string[];
}

interface PricesStocksUpdateDiscountRequest {
  product_id: number;
  discount: number;
}

interface PricesStocksActionTimerStatusRequest {
  product_ids: string[];
}

interface PricesStocksActionTimerUpdateRequest {
  product_ids: string[];
}

interface PricesStocksGetStocksByWarehouseFbsRequest {
  sku: string[];
}
```

### Response Types

```typescript
interface PricesStocksImportPricesResponse {
  result?: PriceUpdateResult[];
}

interface PriceUpdateResult {
  offer_id?: string;
  product_id?: number;
  updated: boolean;
  errors?: string[];
}

interface PricesStocksGetPricesResponse {
  items?: PriceInfo[];
  cursor?: string;
  has_next?: boolean;
}

interface PriceInfo {
  offer_id: string;
  product_id: number;
  sku: string;
  price: number;
  old_price?: number;
  premium_price?: number;
  currency_code: string;
  min_ozon_price?: number;
  max_price?: number;
  recommended_price?: number;
}

interface PricesStocksUpdateStocksResponse {
  result?: StockUpdateResult[];
}

interface StockUpdateResult {
  offer_id?: string;
  product_id?: number;
  updated: boolean;
  errors?: string[];
}

interface PricesStocksGetStocksResponse {
  items?: StockInfo[];
  cursor?: string;
  has_next?: boolean;
}

interface StockInfo {
  offer_id: string;
  product_id: number;
  sku: string;
  stocks: WarehouseStock[];
}

interface WarehouseStock {
  warehouse_id: number;
  present: number;
  reserved: number;
  waiting?: number;
}

interface PricesStocksGetDiscountedInfoResponse {
  items?: DiscountedProductInfo[];
}

interface DiscountedProductInfo {
  discounted_sku: string;
  original_sku: string;
  condition: string;
  discount_percentage: number;
  reason?: string;
  defects?: string[];
}

interface PricesStocksActionTimerStatusResponse {
  statuses?: ActionTimerStatus[];
}

interface ActionTimerStatus {
  product_id: string;
  is_timer_enabled: boolean;
  next_update_time?: string;
}

interface PricesStocksGetStocksByWarehouseFbsResponse {
  result?: FbsStockInfo[];
}

interface FbsStockInfo {
  sku: string;
  stocks: FbsWarehouseStock[];
}

interface FbsWarehouseStock {
  warehouse_id: number;
  warehouse_name: string;
  present: number;
  reserved: number;
  waiting?: number;
}
```

## Usage Examples

### Basic Price and Stock Management

```typescript
import { OzonApi } from 'bmad-ozon-seller-api';

const ozonApi = new OzonApi({
  clientId: 'your-client-id',
  apiKey: 'your-api-key'
});

// Синхронизация цен и остатков
async function syncPricesAndStocks() {
  try {
    // Обновить цены с акционными предложениями
    const priceUpdates = await ozonApi.pricesStocks.updatePrices({
      prices: [
        {
          offer_id: 'SMARTPHONE_XYZ',
          price: '25000',
          old_price: '30000', // Показать скидку
          premium_price: '24000', // Цена для Premium покупателей
          currency_code: 'RUB'
        },
        {
          offer_id: 'LAPTOP_ABC',
          price: '75000',
          old_price: '0', // Сбросить старую цену
          currency_code: 'RUB'
        }
      ]
    });
    
    console.log('💰 Результаты обновления цен:');
    priceUpdates.result?.forEach(item => {
      if (item.updated) {
        console.log(`✅ ${item.offer_id}: цена обновлена`);
      } else {
        console.log(`❌ ${item.offer_id}: ${item.errors?.join(', ')}`);
      }
    });
    
    // Обновить остатки на разных складах
    const stockUpdates = await ozonApi.pricesStocks.updateStocks({
      stocks: [
        {
          offer_id: 'SMARTPHONE_XYZ',
          stock: 150,
          warehouse_id: 12345 // Основной склад
        },
        {
          offer_id: 'SMARTPHONE_XYZ',
          stock: 75,
          warehouse_id: 67890 // Дополнительный склад
        },
        {
          offer_id: 'LAPTOP_ABC',
          stock: 25,
          warehouse_id: 12345
        }
      ]
    });
    
    console.log('\n📦 Результаты обновления остатков:');
    stockUpdates.result?.forEach(item => {
      if (item.updated) {
        console.log(`✅ ${item.offer_id}: остатки обновлены`);
      } else {
        console.log(`❌ ${item.offer_id}: ${item.errors?.join(', ')}`);
      }
    });
    
    return { priceUpdates, stockUpdates };
  } catch (error) {
    console.error('❌ Ошибка синхронизации:', error);
    throw error;
  }
}

// Использование
const syncResult = await syncPricesAndStocks();
```

### Comprehensive Inventory Analysis

```typescript
// Получение полной информации о товарах
async function analyzeInventoryStatus(offerIds: string[]) {
  try {
    // Получить информацию о ценах
    const pricesInfo = await ozonApi.pricesStocks.getPrices({
      filter: {
        offer_id: offerIds,
        visibility: 'VISIBLE'
      },
      limit: 1000
    });
    
    // Получить информацию об остатках
    const stocksInfo = await ozonApi.pricesStocks.getStocks({
      filter: {
        offer_id: offerIds,
        visibility: 'VISIBLE'
      },
      limit: 1000
    });
    
    // Объединить данные для анализа
    const analysis = offerIds.map(offerId => {
      const priceData = pricesInfo.items?.find(item => item.offer_id === offerId);
      const stockData = stocksInfo.items?.find(item => item.offer_id === offerId);
      
      if (!priceData || !stockData) {
        return {
          offerId,
          status: 'not_found',
          issues: ['Товар не найден в каталоге']
        };
      }
      
      const totalStock = stockData.stocks?.reduce((sum, stock) => sum + stock.present, 0) || 0;
      const totalReserved = stockData.stocks?.reduce((sum, stock) => sum + stock.reserved, 0) || 0;
      const availableStock = totalStock - totalReserved;
      
      const issues: string[] = [];
      
      // Анализ остатков
      if (totalStock === 0) {
        issues.push('Нет остатков на складах');
      } else if (availableStock < 5) {
        issues.push('Критически низкий остаток (< 5)');
      } else if (availableStock < 20) {
        issues.push('Низкий остаток (< 20)');
      }
      
      // Анализ цен
      if (priceData.min_ozon_price && priceData.price < priceData.min_ozon_price) {
        issues.push(`Цена ниже минимальной (${priceData.min_ozon_price})`);
      }
      
      if (priceData.recommended_price && priceData.price > priceData.recommended_price * 1.2) {
        issues.push('Цена значительно выше рекомендуемой');
      }
      
      const discountPercentage = priceData.old_price 
        ? ((priceData.old_price - priceData.price) / priceData.old_price * 100)
        : 0;
      
      return {
        offerId,
        sku: priceData.sku,
        price: priceData.price,
        oldPrice: priceData.old_price,
        discountPercentage: Math.round(discountPercentage * 10) / 10,
        totalStock,
        availableStock,
        reservedStock: totalReserved,
        warehouseCount: stockData.stocks?.length || 0,
        issues,
        status: issues.length === 0 ? 'ok' : 'attention'
      };
    });
    
    // Вывести результаты анализа
    console.log('📊 АНАЛИЗ ТОВАРНОГО ПОРТФЕЛЯ');
    console.log('================================');
    
    const okProducts = analysis.filter(p => p.status === 'ok');
    const attentionProducts = analysis.filter(p => p.status === 'attention');
    const notFoundProducts = analysis.filter(p => p.status === 'not_found');
    
    console.log(`✅ Товары без проблем: ${okProducts.length}`);
    console.log(`⚠️  Требуют внимания: ${attentionProducts.length}`);
    console.log(`❌ Не найдены: ${notFoundProducts.length}`);
    
    if (attentionProducts.length > 0) {
      console.log('\n⚠️  ТОВАРЫ, ТРЕБУЮЩИЕ ВНИМАНИЯ:');
      attentionProducts.forEach(product => {
        console.log(`\n📦 ${product.offerId} (SKU: ${product.sku})`);
        console.log(`   Цена: ${product.price}₽${product.oldPrice ? ` (было ${product.oldPrice}₽, -${product.discountPercentage}%)` : ''}`);
        console.log(`   Остаток: ${product.availableStock} (всего ${product.totalStock}, зарезервировано ${product.reservedStock})`);
        console.log(`   Складов: ${product.warehouseCount}`);
        console.log(`   Проблемы: ${product.issues.join(', ')}`);
      });
    }
    
    return analysis;
  } catch (error) {
    console.error('❌ Ошибка анализа инвентаря:', error);
    throw error;
  }
}

// Использование
const inventoryAnalysis = await analyzeInventoryStatus([
  'SMARTPHONE_XYZ',
  'LAPTOP_ABC',
  'HEADPHONES_DEF'
]);
```

## Complex Scenarios

### Automated Price & Stock Management System

Система автоматического управления ценами и остатками:

```typescript
class AutomatedPriceStockManager {
  constructor(private ozonApi: OzonApi) {}
  
  /**
   * Автоматическое управление остатками с предупреждениями
   */
  async manageStockLevels(config: StockManagementConfig) {
    try {
      // Получить текущие остатки
      const currentStocks = await this.ozonApi.pricesStocks.getStocks({
        filter: {
          offer_id: config.monitoredProducts,
          visibility: 'VISIBLE'
        },
        limit: 1000
      });
      
      const actions: StockAction[] = [];
      
      currentStocks.items?.forEach(product => {
        const totalStock = product.stocks?.reduce((sum, stock) => sum + stock.present, 0) || 0;
        const totalReserved = product.stocks?.reduce((sum, stock) => sum + stock.reserved, 0) || 0;
        const availableStock = totalStock - totalReserved;
        
        const productConfig = config.productSettings[product.offer_id];
        if (!productConfig) return;
        
        // Проверка критически низкого остатка
        if (availableStock <= productConfig.criticalThreshold) {
          actions.push({
            type: 'critical_low_stock',
            offerId: product.offer_id,
            currentStock: availableStock,
            threshold: productConfig.criticalThreshold,
            action: 'emergency_restock'
          });
        }
        // Проверка низкого остатка
        else if (availableStock <= productConfig.lowThreshold) {
          actions.push({
            type: 'low_stock',
            offerId: product.offer_id,
            currentStock: availableStock,
            threshold: productConfig.lowThreshold,
            action: 'restock_soon'
          });
        }
        // Проверка избыточного остатка
        else if (availableStock >= productConfig.excessThreshold) {
          actions.push({
            type: 'excess_stock',
            offerId: product.offer_id,
            currentStock: availableStock,
            threshold: productConfig.excessThreshold,
            action: 'consider_promotion'
          });
        }
      });
      
      // Выполнить автоматические действия
      for (const action of actions) {
        await this.executeStockAction(action, config);
      }
      
      return actions;
    } catch (error) {
      console.error('❌ Ошибка управления остатками:', error);
      throw error;
    }
  }
  
  /**
   * Динамическое ценообразование на основе остатков и конкуренции
   */
  async dynamicPricing(pricingConfig: DynamicPricingConfig) {
    try {
      const priceUpdates: PriceUpdateItem[] = [];
      
      for (const [offerId, config] of Object.entries(pricingConfig.products)) {
        // Получить текущую информацию о цене и остатках
        const [priceInfo, stockInfo] = await Promise.all([
          this.ozonApi.pricesStocks.getPrices({
            filter: { offer_id: [offerId] },
            limit: 1
          }),
          this.ozonApi.pricesStocks.getStocks({
            filter: { offer_id: [offerId] },
            limit: 1
          })
        ]);
        
        const currentPrice = priceInfo.items?.[0];
        const currentStock = stockInfo.items?.[0];
        
        if (!currentPrice || !currentStock) continue;
        
        const totalStock = currentStock.stocks?.reduce((sum, stock) => sum + stock.present, 0) || 0;
        const availableStock = totalStock - (currentStock.stocks?.reduce((sum, stock) => sum + stock.reserved, 0) || 0);
        
        let newPrice = currentPrice.price;
        let reasoning = '';
        
        // Алгоритм динамического ценообразования
        if (availableStock < config.lowStockThreshold) {
          // Повысить цену при низком остатке
          newPrice = Math.min(
            currentPrice.price * (1 + config.lowStockPriceIncrease),
            config.maxPrice
          );
          reasoning = 'Низкий остаток - повышение цены';
        } else if (availableStock > config.highStockThreshold) {
          // Снизить цену при избыточном остатке
          newPrice = Math.max(
            currentPrice.price * (1 - config.highStockPriceDecrease),
            config.minPrice
          );
          reasoning = 'Избыточный остаток - снижение цены';
        }
        
        // Проверить изменение цены
        const priceChangePercent = Math.abs((newPrice - currentPrice.price) / currentPrice.price);
        if (priceChangePercent >= config.minPriceChangePercent) {
          priceUpdates.push({
            offer_id: offerId,
            price: newPrice.toString(),
            currency_code: 'RUB'
          });
          
          console.log(`💰 ${offerId}: ${currentPrice.price}₽ → ${newPrice}₽ (${reasoning})`);
        }
      }
      
      // Выполнить обновление цен
      if (priceUpdates.length > 0) {
        const result = await this.ozonApi.pricesStocks.updatePrices({
          prices: priceUpdates
        });
        
        console.log(`✅ Обновлено цен: ${result.result?.filter(r => r.updated).length}/${priceUpdates.length}`);
        return result;
      }
      
      console.log('ℹ️ Нет цен для обновления');
      return null;
    } catch (error) {
      console.error('❌ Ошибка динамического ценообразования:', error);
      throw error;
    }
  }
  
  /**
   * Управление уценёнными товарами
   */
  async manageDiscountedProducts() {
    try {
      // Здесь бы был код для получения списка уценённых товаров
      // Но поскольку API не предоставляет метод для получения списка,
      // предположим, что у нас есть список SKU уценённых товаров
      const discountedSkus = await this.getDiscountedSkusFromDatabase();
      
      if (discountedSkus.length === 0) {
        console.log('ℹ️ Нет уценённых товаров для управления');
        return [];
      }
      
      // Получить информацию о уценённых товарах
      const discountedInfo = await this.ozonApi.pricesStocks.getDiscountedProductInfo({
        discounted_skus: discountedSkus
      });
      
      const actions: DiscountAction[] = [];
      
      discountedInfo.items?.forEach(item => {
        // Логика управления скидками
        let newDiscount = item.discount_percentage;
        let reason = '';
        
        // Увеличить скидку для товаров с серьёзными дефектами
        if (item.condition === 'DAMAGED' && item.discount_percentage < 30) {
          newDiscount = 30;
          reason = 'Увеличение скидки для повреждённого товара';
        } else if (item.condition === 'OPENED' && item.discount_percentage < 15) {
          newDiscount = 15;
          reason = 'Установка скидки для вскрытой упаковки';
        }
        
        if (newDiscount !== item.discount_percentage) {
          actions.push({
            discountedSku: item.discounted_sku,
            originalSku: item.original_sku,
            currentDiscount: item.discount_percentage,
            newDiscount,
            reason
          });
        }
      });
      
      // Выполнить обновления скидок
      for (const action of actions) {
        try {
          // Получить product_id по SKU (потребуется дополнительный запрос)
          const productId = await this.getProductIdBySku(action.discountedSku);
          
          if (productId) {
            await this.ozonApi.pricesStocks.updateDiscountedProductDiscount({
              product_id: productId,
              discount: action.newDiscount
            });
            
            console.log(`🏷️ ${action.discountedSku}: скидка ${action.currentDiscount}% → ${action.newDiscount}% (${action.reason})`);
          }
        } catch (error) {
          console.error(`❌ Ошибка обновления скидки для ${action.discountedSku}:`, error);
        }
      }
      
      return actions;
    } catch (error) {
      console.error('❌ Ошибка управления уценёнными товарами:', error);
      throw error;
    }
  }
  
  /**
   * Мониторинг и управление таймерами цен
   */
  async manageActionTimers(productIds: string[]) {
    try {
      // Проверить статус текущих таймеров
      const timerStatus = await this.ozonApi.pricesStocks.getActionTimerStatus({
        product_ids: productIds
      });
      
      const expiredTimers: string[] = [];
      const activeTimers: string[] = [];
      
      timerStatus.statuses?.forEach(status => {
        if (status.is_timer_enabled) {
          if (status.next_update_time && new Date(status.next_update_time) < new Date()) {
            expiredTimers.push(status.product_id);
          } else {
            activeTimers.push(status.product_id);
          }
        }
      });
      
      console.log(`⏱️ Таймеры - активных: ${activeTimers.length}, истекших: ${expiredTimers.length}`);
      
      // Обновить истекшие таймеры
      if (expiredTimers.length > 0) {
        await this.ozonApi.pricesStocks.updateActionTimer({
          product_ids: expiredTimers
        });
        
        console.log(`✅ Обновлено таймеров: ${expiredTimers.length}`);
      }
      
      return {
        activeTimers,
        expiredTimers,
        updated: expiredTimers.length
      };
    } catch (error) {
      console.error('❌ Ошибка управления таймерами:', error);
      throw error;
    }
  }
  
  private async executeStockAction(action: StockAction, config: StockManagementConfig) {
    switch (action.action) {
      case 'emergency_restock':
        console.log(`🚨 КРИТИЧЕСКИ НИЗКИЙ ОСТАТОК: ${action.offerId} (${action.currentStock} шт.)`);
        // Здесь можно добавить автоматическое создание заявки на пополнение
        break;
        
      case 'restock_soon':
        console.log(`⚠️ Низкий остаток: ${action.offerId} (${action.currentStock} шт.) - планируйте пополнение`);
        break;
        
      case 'consider_promotion':
        console.log(`📈 Избыточный остаток: ${action.offerId} (${action.currentStock} шт.) - рассмотрите акцию`);
        break;
    }
  }
  
  private async getDiscountedSkusFromDatabase(): Promise<string[]> {
    // Заглушка - в реальном приложении это был бы запрос к базе данных
    return [];
  }
  
  private async getProductIdBySku(sku: string): Promise<number | null> {
    // Заглушка - в реальном приложении нужно было бы получить product_id
    // через другие методы API или из базы данных
    return null;
  }
}

// Интерфейсы для системы управления
interface StockManagementConfig {
  monitoredProducts: string[];
  productSettings: Record<string, {
    criticalThreshold: number;
    lowThreshold: number;
    excessThreshold: number;
  }>;
}

interface StockAction {
  type: 'critical_low_stock' | 'low_stock' | 'excess_stock';
  offerId: string;
  currentStock: number;
  threshold: number;
  action: 'emergency_restock' | 'restock_soon' | 'consider_promotion';
}

interface DynamicPricingConfig {
  products: Record<string, {
    minPrice: number;
    maxPrice: number;
    lowStockThreshold: number;
    highStockThreshold: number;
    lowStockPriceIncrease: number;
    highStockPriceDecrease: number;
    minPriceChangePercent: number;
  }>;
}

interface DiscountAction {
  discountedSku: string;
  originalSku: string;
  currentDiscount: number;
  newDiscount: number;
  reason: string;
}

// Использование автоматизированной системы
const priceStockManager = new AutomatedPriceStockManager(ozonApi);

// Настройка мониторинга остатков
const stockConfig: StockManagementConfig = {
  monitoredProducts: ['SMARTPHONE_XYZ', 'LAPTOP_ABC', 'HEADPHONES_DEF'],
  productSettings: {
    'SMARTPHONE_XYZ': {
      criticalThreshold: 5,
      lowThreshold: 20,
      excessThreshold: 200
    },
    'LAPTOP_ABC': {
      criticalThreshold: 2,
      lowThreshold: 10,
      excessThreshold: 50
    },
    'HEADPHONES_DEF': {
      criticalThreshold: 10,
      lowThreshold: 50,
      excessThreshold: 500
    }
  }
};

// Запуск мониторинга остатков
const stockActions = await priceStockManager.manageStockLevels(stockConfig);

// Динамическое ценообразование
const pricingConfig: DynamicPricingConfig = {
  products: {
    'SMARTPHONE_XYZ': {
      minPrice: 20000,
      maxPrice: 35000,
      lowStockThreshold: 10,
      highStockThreshold: 100,
      lowStockPriceIncrease: 0.05,
      highStockPriceDecrease: 0.03,
      minPriceChangePercent: 0.02
    }
  }
};

const pricingResult = await priceStockManager.dynamicPricing(pricingConfig);
```

## Error Handling

```typescript
// Комплексная обработка ошибок для операций с ценами и остатками
async function safePriceStockOperations() {
  try {
    // Обновление цен с валидацией
    const priceResult = await ozonApi.pricesStocks.updatePrices({
      prices: [{
        offer_id: 'ITEM001',
        price: '1000',
        currency_code: 'RUB'
      }]
    });
    
    // Проверка результатов обновления цен
    priceResult.result?.forEach(item => {
      if (!item.updated && item.errors) {
        item.errors.forEach(error => {
          console.error(`💰 Ошибка цены ${item.offer_id}: ${error}`);
        });
      }
    });
    
    // Обновление остатков с обработкой ошибок
    const stockResult = await ozonApi.pricesStocks.updateStocks({
      stocks: [{
        offer_id: 'ITEM001',
        stock: 100,
        warehouse_id: 12345
      }]
    });
    
    // Проверка результатов обновления остатков
    stockResult.result?.forEach(item => {
      if (!item.updated && item.errors) {
        item.errors.forEach(error => {
          console.error(`📦 Ошибка остатков ${item.offer_id}: ${error}`);
        });
      }
    });
    
    return { priceResult, stockResult };
  } catch (error) {
    if (error.code === 'PRICE_UPDATE_LIMIT_EXCEEDED') {
      console.error('❌ Превышен лимит обновления цен (10 раз в час)');
    } else if (error.code === 'STOCK_UPDATE_RATE_LIMIT') {
      console.error('❌ Превышен лимит запросов остатков (80 в минуту)');
    } else if (error.code === 'INVALID_WAREHOUSE_ID') {
      console.error('❌ Неверный идентификатор склада');
    } else if (error.code === 'PRODUCT_NOT_FOUND') {
      console.error('❌ Товар не найден в каталоге');
    } else if (error.code === 'INVALID_PRICE_RANGE') {
      console.error('❌ Цена вне допустимого диапазона');
    } else if (error.code === 'DISCOUNTED_PRODUCT_ONLY_FBS') {
      console.error('❌ Уценённые товары доступны только для FBS');
    } else {
      console.error('❌ Неожиданная ошибка:', error);
    }
    
    throw error;
  }
}
```

## Best Practices

### 1. Управление ценами
```typescript
const pricingBestPractices = {
  // Соблюдайте лимиты обновления
  priceUpdateLimit: 10, // обновлений в час на товар
  
  // Используйте валидацию цен
  validatePrices: (price: number, minPrice?: number, maxPrice?: number) => {
    if (minPrice && price < minPrice) return false;
    if (maxPrice && price > maxPrice) return false;
    return price > 0;
  },
  
  // Правильно работайте с old_price
  clearOldPrice: (item: PriceUpdateItem) => ({
    ...item,
    old_price: '0' // Для сброса старой цены
  }),
  
  // Мониторьте рекомендуемые цены
  checkRecommendedPrice: true
};
```

### 2. Управление остатками
```typescript
const stockBestPractices = {
  // Соблюдайте rate limits
  stockUpdateRateLimit: 80, // запросов в минуту
  maxItemsPerRequest: 100,
  
  // Синхронизируйте по всем складам
  syncAllWarehouses: true,
  
  // Учитывайте зарезервированные остатки
  calculateAvailable: (present: number, reserved: number) => present - reserved,
  
  // Устанавливайте критические пороги
  criticalStockThreshold: 5,
  lowStockThreshold: 20
};
```

### 3. Автоматизация
```typescript
const automationBestPractices = {
  // Регулярная синхронизация
  syncInterval: 300000, // 5 минут
  
  // Пакетная обработка
  batchSize: 50,
  
  // Логирование изменений
  logAllChanges: true,
  
  // Откат в случае ошибок
  enableRollback: true,
  
  // Уведомления о критических событиях
  notifyOnCriticalStock: true,
  notifyOnPriceErrors: true
};
```

## Integration Notes

- **Rate Limits**: Цены - 10 обновлений/час/товар, остатки - 80 запросов/минуту
- **Batch Operations**: Максимум 100 товаров за запрос
- **Currency**: Поддерживается RUB, USD, EUR
- **Precision**: Цены с точностью до копеек
- **Warehouses**: Поддержка множественных складов для FBS/rFBS
- **Validation**: Автоматическая проверка min/max цен
- **Timers**: Таймеры актуальности для минимальных цен
- **Discounted Products**: Работа только со схемой FBS

Prices & Stocks API обеспечивает полный контроль над ценообразованием и управлением остатками, позволяя создавать эффективные системы автоматизации и мониторинга товарного портфеля.