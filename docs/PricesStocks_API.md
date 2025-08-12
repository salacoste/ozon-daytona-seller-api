# PricesStocksAPI Documentation

The PricesStocksAPI provides comprehensive price and inventory management for products across Ozon warehouses, with advanced features for discount handling and pricing strategies.

## Table of Contents

- [Basic Usage](#basic-usage)
- [Stock Operations](#stock-operations)
- [Price Operations](#price-operations)
- [Action Timer Management](#action-timer-management)
- [Discount Management](#discount-management)
- [Pagination Iterators](#pagination-iterators)
- [Complete Workflow Examples](#complete-workflow-examples)
- [Error Handling](#error-handling)
- [Best Practices](#best-practices)

## Basic Usage

```typescript
import { OzonClient } from '@ozon/sdk';

const client = new OzonClient({
  clientId: process.env.OZON_CLIENT_ID!,
  apiKey: process.env.OZON_API_KEY!,
});

// Access PricesStocksAPI through the client
const result = await client.pricesStocks.updateStocks({
  stocks: [{
    product_id: 313455276,
    stock: 100,
    warehouse_id: 22142605386000
  }]
});
```

## Stock Operations

The PricesStocksAPI provides 3 endpoints for stock management across different warehouse types and schemes.

### Update Product Stocks

Update inventory quantities for products across different warehouses:

```typescript
const result = await client.pricesStocks.updateStocks({
  stocks: [
    {
      offer_id: "PH11042",
      product_id: 313455276, 
      stock: 100,
      warehouse_id: 22142605386000
    },
    {
      product_id: 313455277,
      stock: 50,
      warehouse_id: 22142605386001
    }
  ]
});

// Check results for each product
for (const item of result.data.result || []) {
  if (item.updated) {
    console.log(`✅ Product ${item.product_id} stock updated at warehouse ${item.warehouse_id}`);
  } else {
    console.log(`❌ Failed to update product ${item.product_id}:`, item.errors);
  }
}
```

**Rate Limits & Constraints:**
- Up to 100 product-warehouse pairs per request
- 80 requests per minute maximum
- 1 request per 30 seconds per product-warehouse pair
- Stock can only be set after product status becomes `price_sent`

### Get Stock Information (v4)

Retrieve detailed stock information for FBS and rFBS schemes with pagination:

```typescript
const stockInfo = await client.pricesStocks.getStockInfo({
  filter: {
    product_id: ["313455276", "313455277"],
    visibility: "ALL",
    with_quant: {
      exists: true,  // Include quant products
      created: true  // Only active quant products
    }
  },
  limit: 100,
  cursor: "" // Start from beginning
});

console.log(`Found ${stockInfo.data.total} products with stock info`);

for (const item of stockInfo.data.items || []) {
  console.log(`\nProduct: ${item.product_id} (${item.offer_id})`);
  
  for (const stock of item.stocks || []) {
    console.log(`  ${stock.type} (SKU: ${stock.sku}):`);
    console.log(`    Present: ${stock.present}, Reserved: ${stock.reserved}`);
    console.log(`    Shipment type: ${stock.shipment_type}`);
    console.log(`    Warehouses: ${stock.warehouse_ids?.join(', ')}`);
  }
}

// Continue pagination if needed
if (stockInfo.data.cursor) {
  const nextPage = await client.pricesStocks.getStockInfo({
    filter: { visibility: "ALL" },
    limit: 100,
    cursor: stockInfo.data.cursor
  });
}
```

### Get FBS Stock by Warehouse

Get warehouse-specific stock information for FBS and rFBS:

```typescript
const warehouseStocks = await client.pricesStocks.getStocksByWarehouse({
  sku: ["148313766", "148313767", "148313768"]
});

for (const stock of warehouseStocks.data.result || []) {
  console.log(`SKU ${stock.sku} at ${stock.warehouse_name}:`);
  console.log(`  Product ID: ${stock.product_id}`);
  console.log(`  Present: ${stock.present}, Reserved: ${stock.reserved}`);
  console.log(`  Warehouse: ${stock.warehouse_id}`);
}
```

## Price Operations

The PricesStocksAPI provides 2 endpoints for comprehensive price management with advanced pricing strategies.

### Update Product Prices

Update pricing for products with advanced options:

```typescript
const priceUpdate = await client.pricesStocks.updatePrices({
  prices: [
    {
      product_id: 1386,
      price: "1448.00",
      old_price: "1600.00", // Crossed-out price
      min_price: "800.00",  // Minimum price for actions
      currency_code: "RUB",
      
      // Action settings
      auto_action_enabled: "ENABLED",  // Auto-participate in Ozon actions
      auto_add_to_ozon_actions_list_enabled: "ENABLED",
      min_price_for_auto_actions_enabled: true,
      
      // Strategy settings  
      price_strategy_enabled: "ENABLED",
      
      // Financial settings
      net_price: "650.00", // Cost price
      vat: "0.1", // 10% VAT
      
      // Quant handling (if needed)
      quant_size: 1 // For regular products
    }
  ]
});

for (const result of priceUpdate.data.result || []) {
  if (result.updated) {
    console.log(`✅ Price updated for product ${result.product_id} (${result.offer_id})`);
  } else {
    console.log(`❌ Price update failed for ${result.product_id}:`, result.errors);
  }
}
```

**Price Rules & Constraints:**
- Each product price can be updated max 10 times per hour
- If `old_price` > 0, minimum difference required:
  - < 400₽: 20₽ difference
  - 400-10,000₽: 5% difference  
  - > 10,000₽: 500₽ difference
- Currency must match account settings
- Price strategy requires `min_price` to be set

### Get Detailed Price Information

Retrieve comprehensive pricing data including commissions and indexes:

```typescript
const priceInfo = await client.pricesStocks.getPriceInfo({
  filter: {
    product_id: ["243686911"],
    offer_id: ["356792"],
    visibility: "ALL"
  },
  limit: 100,
  cursor: ""
});

for (const item of priceInfo.data.items || []) {
  console.log(`\nProduct: ${item.product_id} (${item.offer_id})`);
  
  // Price information
  if (item.price) {
    console.log(`  Current Price: ${item.price.price} ${item.price.currency_code}`);
    console.log(`  Old Price: ${item.price.old_price}`);
    console.log(`  Min Price: ${item.price.min_price}`);
    console.log(`  Marketing Price: ${item.price.marketing_price}`);
    console.log(`  Auto Actions: ${item.price.auto_action_enabled ? 'ON' : 'OFF'}`);
  }
  
  // Commission information
  if (item.commissions) {
    console.log(`  FBO Commission: ${item.commissions.sales_percent_fbo}%`);
    console.log(`  FBS Commission: ${item.commissions.sales_percent_fbs}%`);
  }
  
  // Price competitiveness 
  if (item.price_indexes) {
    console.log(`  Price Index: ${item.price_indexes.color_index}`);
    if (item.price_indexes.ozon_index_data) {
      console.log(`  Min Competitor Price: ${item.price_indexes.ozon_index_data.min_price}`);
    }
  }
  
  // Marketing actions
  if (item.marketing_actions?.actions) {
    console.log(`  Active Actions: ${item.marketing_actions.actions.length}`);
    for (const action of item.marketing_actions.actions) {
      console.log(`    - ${action.title}: ${action.value}% (${action.date_from} - ${action.date_to})`);
    }
  }
}
```

## Action Timer Management

Manage minimum price action timers to maintain pricing strategy effectiveness.

### Update Action Timer

Reset the timer for minimum price action consideration:

```typescript
await client.pricesStocks.updateActionTimer({
  product_ids: ["123456", "789012", "345678"]
});

console.log("Action timers updated successfully");
```

### Get Action Timer Status

Check the current status of action timers:

```typescript
const timerStatus = await client.pricesStocks.getActionTimerStatus({
  product_ids: ["123456", "789012", "345678"]
});

for (const status of timerStatus.data.statuses || []) {
  console.log(`Product ${status.product_id}:`);
  console.log(`  Timer expires: ${status.expired_at}`);
  console.log(`  Min price considered: ${status.min_price_for_auto_actions_enabled ? 'YES' : 'NO'}`);
  
  // Check if timer is about to expire
  const expiredAt = new Date(status.expired_at || '');
  const now = new Date();
  const hoursLeft = (expiredAt.getTime() - now.getTime()) / (1000 * 60 * 60);
  
  if (hoursLeft < 24) {
    console.log(`  ⚠️ Timer expires in ${hoursLeft.toFixed(1)} hours`);
  }
}
```

## Discount Management

Handle discounted products and their condition information (FBO only).

### Get Discounted Product Information

Retrieve information about discounted products and their conditions:

```typescript
const discountedInfo = await client.pricesStocks.getDiscountedInfo({
  discounted_skus: ["635548518", "789012345", "555666777"]
});

for (const item of discountedInfo.data.items || []) {
  console.log(`\nDiscounted SKU: ${item.discounted_sku}`);
  console.log(`Original SKU: ${item.sku}`);
  
  // Condition assessment
  console.log(`Condition: ${item.condition_estimation}/7 (${item.condition})`);
  console.log(`Reason: ${item.reason_damaged}`);
  if (item.comment_reason_damaged) {
    console.log(`Details: ${item.comment_reason_damaged}`);
  }
  
  // Damage details
  if (item.defects) console.log(`Defects: ${item.defects}`);
  if (item.mechanical_damage) console.log(`Mechanical damage: ${item.mechanical_damage}`);
  if (item.package_damage) console.log(`Package damage: ${item.package_damage}`);
  
  // Status indicators
  if (item.packaging_violation) console.log(`⚠️ Packaging violation: ${item.packaging_violation}`);
  if (item.shortage) console.log(`⚠️ Incomplete: ${item.shortage}`);
  if (item.repair) console.log(`🔧 Repaired: ${item.repair}`);
  if (item.warranty_type) console.log(`🛡️ Warranty: ${item.warranty_type}`);
}
```

### Update Discount Percentage

Set discount percentage for FBS discounted products:

```typescript
const discountUpdate = await client.pricesStocks.updateDiscount({
  product_id: 123456,
  discount: 25  // 25% discount (3-99% allowed)
});

if (discountUpdate.data.result) {
  console.log("✅ Discount updated successfully");
} else {
  console.log("❌ Failed to update discount");
}
```

## Pagination Iterators

Use built-in iterators for automatic pagination through large datasets.

### Iterate Through All Stock Information

```typescript
console.log("Fetching all stock information...");

for await (const stockItem of client.pricesStocks.iterateStockInfo({
  filter: {
    visibility: "ALL",
    with_quant: { exists: true }
  },
  limit: 250 // Larger pages for efficiency
})) {
  console.log(`Product ${stockItem.product_id} (${stockItem.offer_id}):`);
  
  const totalStocks = stockItem.stocks?.reduce((sum, stock) => sum + (stock.present || 0), 0) || 0;
  console.log(`  Total stock across warehouses: ${totalStocks}`);
  
  // Process individual warehouses
  for (const stock of stockItem.stocks || []) {
    if ((stock.present || 0) > 0) {
      console.log(`    ${stock.type}: ${stock.present} available`);
    }
  }
}
```

### Iterate Through All Price Information

```typescript
console.log("Analyzing all product prices...");

let totalProducts = 0;
let averagePrice = 0;
const pricesByIndex: Record<string, number> = {};

for await (const priceItem of client.pricesStocks.iteratePriceInfo({
  filter: {
    visibility: "IN_SALE" // Only products in active sale
  },
  limit: 500
})) {
  totalProducts++;
  
  if (priceItem.price?.price) {
    averagePrice += priceItem.price.price;
  }
  
  // Track price competitiveness
  const index = priceItem.price_indexes?.color_index || 'UNKNOWN';
  pricesByIndex[index] = (pricesByIndex[index] || 0) + 1;
  
  // Log expensive products
  if (priceItem.price?.price && priceItem.price.price > 10000) {
    console.log(`High-value product: ${priceItem.product_id} - ${priceItem.price.price} ${priceItem.price.currency_code}`);
  }
}

console.log(`\nAnalysis complete:`);
console.log(`Total products: ${totalProducts}`);
console.log(`Average price: ${(averagePrice / totalProducts).toFixed(2)}`);
console.log(`Price index distribution:`, pricesByIndex);
```

## Complete Workflow Examples

### Inventory Synchronization Workflow

Complete workflow for synchronizing inventory across multiple warehouses:

```typescript
async function synchronizeInventory(inventoryUpdates: Array<{
  sku: string;
  warehouseStocks: Array<{ warehouse_id: number; quantity: number }>;
}>) {
  try {
    console.log('🔄 Starting inventory synchronization...');
    
    // Step 1: Get current stock information
    console.log('📊 Fetching current stock levels...');
    const currentStocks = new Map();
    
    for await (const stockItem of client.pricesStocks.iterateStockInfo({
      filter: {
        offer_id: inventoryUpdates.map(u => u.sku),
        visibility: "ALL"
      },
      limit: 100
    })) {
      currentStocks.set(stockItem.offer_id, stockItem);
    }
    
    // Step 2: Calculate differences and prepare updates
    console.log('🔍 Calculating stock differences...');
    const stockUpdates = [];
    
    for (const update of inventoryUpdates) {
      const currentStock = currentStocks.get(update.sku);
      if (!currentStock) {
        console.log(`⚠️ Product ${update.sku} not found, skipping`);
        continue;
      }
      
      for (const warehouseStock of update.warehouseStocks) {
        // Find current stock for this warehouse
        const currentWarehouseStock = currentStock.stocks?.find(s => 
          s.warehouse_ids?.includes(warehouseStock.warehouse_id.toString())
        );
        
        const currentQuantity = currentWarehouseStock?.present || 0;
        
        if (currentQuantity !== warehouseStock.quantity) {
          stockUpdates.push({
            offer_id: update.sku,
            product_id: currentStock.product_id,
            stock: warehouseStock.quantity,
            warehouse_id: warehouseStock.warehouse_id
          });
          
          console.log(`📦 ${update.sku} at warehouse ${warehouseStock.warehouse_id}: ${currentQuantity} → ${warehouseStock.quantity}`);
        }
      }
    }
    
    if (stockUpdates.length === 0) {
      console.log('✅ No stock updates needed');
      return;
    }
    
    // Step 3: Apply updates in batches
    console.log(`🚀 Applying ${stockUpdates.length} stock updates...`);
    const batchSize = 100;
    
    for (let i = 0; i < stockUpdates.length; i += batchSize) {
      const batch = stockUpdates.slice(i, i + batchSize);
      
      const result = await client.pricesStocks.updateStocks({
        stocks: batch
      });
      
      let successCount = 0;
      let errorCount = 0;
      
      for (const item of result.data.result || []) {
        if (item.updated) {
          successCount++;
        } else {
          errorCount++;
          console.log(`❌ Failed to update ${item.offer_id}:`, item.errors);
        }
      }
      
      console.log(`Batch ${Math.floor(i / batchSize) + 1}: ${successCount} success, ${errorCount} errors`);
      
      // Rate limiting: wait between batches
      if (i + batchSize < stockUpdates.length) {
        console.log('⏳ Waiting 2 seconds for rate limit...');
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
    
    console.log('✅ Inventory synchronization completed');
    
  } catch (error) {
    console.error('❌ Inventory synchronization failed:', error);
    throw error;
  }
}

// Usage
await synchronizeInventory([
  {
    sku: "PH11042",
    warehouseStocks: [
      { warehouse_id: 22142605386000, quantity: 100 },
      { warehouse_id: 22142605386001, quantity: 50 }
    ]
  },
  {
    sku: "PH11043", 
    warehouseStocks: [
      { warehouse_id: 22142605386000, quantity: 75 }
    ]
  }
]);
```

### Dynamic Pricing Strategy Workflow

Implement dynamic pricing based on competition and stock levels:

```typescript
async function implementDynamicPricing() {
  try {
    console.log('💰 Starting dynamic pricing analysis...');
    
    const pricingUpdates = [];
    
    // Analyze all products in sale
    for await (const priceItem of client.pricesStocks.iteratePriceInfo({
      filter: {
        visibility: "IN_SALE"
      },
      limit: 100
    })) {
      if (!priceItem.price?.price || !priceItem.price_indexes) continue;
      
      const currentPrice = priceItem.price.price;
      const priceIndex = priceItem.price_indexes.color_index;
      
      let newPrice = currentPrice;
      let reason = '';
      
      // Get stock information for this product
      const stockInfo = await client.pricesStocks.getStockInfo({
        filter: {
          product_id: [priceItem.product_id?.toString() || ""]
        },
        limit: 1
      });
      
      const totalStock = stockInfo.data.items?.[0]?.stocks?.reduce(
        (sum, stock) => sum + (stock.present || 0), 0
      ) || 0;
      
      // Dynamic pricing logic
      if (priceIndex === 'RED' && totalStock > 50) {
        // High stock + uncompetitive price = reduce price by 5%
        newPrice = Math.round(currentPrice * 0.95);
        reason = 'Reduce price: high stock + uncompetitive';
        
      } else if (priceIndex === 'GREEN' && totalStock < 10) {
        // Low stock + competitive price = increase by 3%
        newPrice = Math.round(currentPrice * 1.03);
        reason = 'Increase price: low stock + competitive';
        
      } else if (totalStock === 0) {
        // Out of stock = don't change price but note it
        console.log(`⚠️ Product ${priceItem.product_id} is out of stock`);
        continue;
      }
      
      // Only update if price changed significantly (>1%)
      const changePercent = Math.abs((newPrice - currentPrice) / currentPrice) * 100;
      
      if (changePercent > 1) {
        pricingUpdates.push({
          product_id: priceItem.product_id,
          offer_id: priceItem.offer_id,
          price: newPrice.toString(),
          old_price: priceItem.price.old_price?.toString(),
          min_price: priceItem.price.min_price?.toString(),
          currency_code: priceItem.price.currency_code,
          auto_action_enabled: "ENABLED",
          reason
        });
        
        console.log(`📈 ${priceItem.offer_id}: ${currentPrice} → ${newPrice} (${reason})`);
      }
    }
    
    if (pricingUpdates.length === 0) {
      console.log('✅ No pricing updates needed');
      return;
    }
    
    // Apply pricing updates
    console.log(`🚀 Applying ${pricingUpdates.length} price updates...`);
    
    const priceResult = await client.pricesStocks.updatePrices({
      prices: pricingUpdates.map(({reason, ...update}) => update)
    });
    
    let successCount = 0;
    let errorCount = 0;
    
    for (const result of priceResult.data.result || []) {
      if (result.updated) {
        successCount++;
      } else {
        errorCount++;
        console.log(`❌ Price update failed for ${result.offer_id}:`, result.errors);
      }
    }
    
    console.log(`✅ Dynamic pricing completed: ${successCount} success, ${errorCount} errors`);
    
  } catch (error) {
    console.error('❌ Dynamic pricing failed:', error);
    throw error;
  }
}

// Run pricing optimization
await implementDynamicPricing();
```

## Error Handling

Handle various error scenarios specific to pricing and stock operations:

```typescript
import { OzonApiError, RateLimitError, ValidationError } from '@ozon/sdk';

async function robustStockUpdate(stockUpdates: any[]) {
  try {
    const result = await client.pricesStocks.updateStocks({
      stocks: stockUpdates
    });
    
    // Check for partial failures
    const errors = [];
    const successes = [];
    
    for (const item of result.data.result || []) {
      if (item.updated) {
        successes.push(item);
      } else {
        errors.push({
          product_id: item.product_id,
          warehouse_id: item.warehouse_id,
          errors: item.errors
        });
      }
    }
    
    if (errors.length > 0) {
      console.log(`⚠️ Partial success: ${successes.length} updated, ${errors.length} failed`);
      
      for (const error of errors) {
        console.log(`Failed: Product ${error.product_id} at warehouse ${error.warehouse_id}`);
        for (const err of error.errors || []) {
          switch (err.code) {
            case 'TOO_MANY_REQUESTS':
              console.log('  ⏳ Rate limit hit - wait 30 seconds before retry');
              break;
            case 'PRODUCT_NOT_FOUND':
              console.log('  ❌ Product not found or not accessible');
              break;
            case 'INVALID_WAREHOUSE':
              console.log('  ❌ Invalid warehouse ID');
              break;
            default:
              console.log(`  ❌ Error: ${err.message} (${err.code})`);
          }
        }
      }
    }
    
    return { successes, errors };
    
  } catch (error) {
    if (error instanceof RateLimitError) {
      console.error(`⏳ Rate limited. Retry after ${error.retryAfter} seconds`);
      
      // Wait and retry
      await new Promise(resolve => setTimeout(resolve, error.retryAfter * 1000));
      return robustStockUpdate(stockUpdates);
      
    } else if (error instanceof ValidationError) {
      console.error('❌ Validation error:', error.message);
      console.error('Invalid fields:', error.details);
      
    } else if (error instanceof OzonApiError) {
      console.error(`❌ API Error ${error.code}: ${error.message}`);
      
      // Handle specific pricing/stock API error codes
      switch (error.code) {
        case 3:
          console.error('Invalid request parameters');
          break;
        case 16:
          console.error('Authentication failed');
          break;
        default:
          console.error('Unknown API error');
      }
      
    } else {
      console.error('❌ Unexpected error:', error);
    }
    
    throw error;
  }
}
```

## Best Practices

### 1. Efficient Stock Management

```typescript
// Good: Batch updates efficiently
const batchStockUpdate = async (updates: StockUpdate[]) => {
  const BATCH_SIZE = 100;
  
  for (let i = 0; i < updates.length; i += BATCH_SIZE) {
    const batch = updates.slice(i, i + BATCH_SIZE);
    
    await client.pricesStocks.updateStocks({ stocks: batch });
    
    // Respect rate limits
    if (i + BATCH_SIZE < updates.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
};

// Bad: One-by-one updates
// ❌ Don't do this - very inefficient and hits rate limits
for (const update of updates) {
  await client.pricesStocks.updateStocks({ stocks: [update] });
}
```

### 2. Smart Price Updates

```typescript
// Good: Validate price rules before API call
const validatePriceUpdate = (price: number, oldPrice?: number) => {
  if (oldPrice && oldPrice > 0) {
    const difference = oldPrice - price;
    const requiredDiff = price < 400 ? 20 : 
                        price <= 10000 ? price * 0.05 : 500;
    
    if (difference < requiredDiff) {
      throw new Error(`Price difference too small: ${difference} < ${requiredDiff}`);
    }
  }
};

// Good: Use comprehensive price updates
const smartPriceUpdate = {
  product_id: 1386,
  price: "1448.00",
  old_price: "1600.00",
  min_price: "800.00",
  auto_action_enabled: "ENABLED", // Enable automatic actions
  min_price_for_auto_actions_enabled: true,
  currency_code: "RUB",
  vat: "0.1"
};
```

### 3. Efficient Data Retrieval

```typescript
// Good: Use pagination iterators for large datasets
for await (const priceItem of client.pricesStocks.iteratePriceInfo({
  filter: { visibility: "ALL" },
  limit: 500 // Use larger page sizes for efficiency
})) {
  // Process individual items
}

// Good: Use specific filters to reduce data
const focusedQuery = await client.pricesStocks.getStockInfo({
  filter: {
    product_id: specificProductIds, // Only what you need
    visibility: "IN_SALE",          // Only relevant products
    with_quant: { exists: true }    // Only quant products if needed
  },
  limit: 1000 // Max limit for fewer API calls
});
```

### 4. Action Timer Maintenance

```typescript
// Good: Proactive timer management
const maintainActionTimers = async () => {
  // Check timer status for products with pricing strategies
  const timerStatus = await client.pricesStocks.getActionTimerStatus({
    product_ids: activeProducts
  });
  
  const expiringSoon = [];
  
  for (const status of timerStatus.data.statuses || []) {
    const expiresAt = new Date(status.expired_at || '');
    const hoursLeft = (expiresAt.getTime() - Date.now()) / (1000 * 60 * 60);
    
    if (hoursLeft < 48) { // Update if expiring in 48 hours
      expiringSoon.push(status.product_id?.toString() || '');
    }
  }
  
  if (expiringSoon.length > 0) {
    await client.pricesStocks.updateActionTimer({
      product_ids: expiringSoon
    });
  }
};
```

### 5. Error Recovery and Retry Logic

```typescript
// Good: Implement exponential backoff for retries
const retryWithBackoff = async <T>(
  operation: () => Promise<T>,
  maxRetries = 3,
  baseDelay = 1000
): Promise<T> => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      if (attempt === maxRetries) throw error;
      
      if (error instanceof RateLimitError) {
        const delay = error.retryAfter * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        const delay = baseDelay * Math.pow(2, attempt - 1);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw new Error('Max retries exceeded');
};

// Usage
await retryWithBackoff(() => 
  client.pricesStocks.updateStocks({ stocks: batchUpdates })
);
```

The PricesStocksAPI provides powerful capabilities for managing both inventory and pricing across the Ozon marketplace. Use these patterns and examples to implement robust, efficient solutions for your specific business needs.