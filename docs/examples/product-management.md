# Product Management Tutorial

Complete guide to managing your product catalog using the OZON Seller API SDK.

## Overview

This tutorial covers the full product lifecycle: listing, updating, managing inventory, pricing, and analytics. You'll learn to automate product operations efficiently and safely.

## Prerequisites

- Completed [Quick Start Guide](./quick-start.md)
- Basic understanding of OZON seller operations
- Product catalog data ready for import/update

## Table of Contents

1. [Product Lifecycle Overview](#product-lifecycle-overview)
2. [Listing Products](#listing-products)
3. [Managing Product Information](#managing-product-information)
4. [Inventory Management](#inventory-management)
5. [Pricing Operations](#pricing-operations)
6. [Product Analytics](#product-analytics)
7. [Bulk Operations](#bulk-operations)
8. [Complete Workflow Example](#complete-workflow-example)

## Product Lifecycle Overview

```typescript
import { 
  OzonSellerApiClient, 
  createApiKey, 
  createClientId 
} from '@ozon/seller-api';

class ProductManager {
  private client: OzonSellerApiClient;

  constructor(apiKey: string, clientId: string) {
    this.client = new OzonSellerApiClient({
      apiKey: createApiKey(apiKey),
      clientId: createClientId(clientId)
    });
  }

  // Product lifecycle: Create → Update → Monitor → Archive
  async manageProductLifecycle(productData: any) {
    try {
      // 1. Create/Import products
      const importResult = await this.importProducts([productData]);
      
      // 2. Update product information
      await this.updateProductInfo(productData.offer_id, {
        name: productData.name,
        description: productData.description
      });
      
      // 3. Set pricing
      await this.updateProductPricing(productData.offer_id, {
        price: productData.price,
        old_price: productData.old_price
      });
      
      // 4. Monitor performance
      const analytics = await this.getProductAnalytics(productData.offer_id);
      
      // 5. Archive if needed
      if (analytics.performance === 'poor') {
        await this.archiveProduct(productData.product_id);
      }
      
      return { success: true, analytics };
    } catch (error) {
      console.error('Product lifecycle management failed:', error);
      throw error;
    }
  }
}
```

## Listing Products

### Single Product Import

```typescript
async function importSingleProduct() {
  const client = new OzonSellerApiClient({
    apiKey: createApiKey('your-api-key'),
    clientId: createClientId('your-client-id')
  });

  try {
    const productData = {
      offer_id: "UNIQUE-SKU-001",
      name: "Premium Wireless Headphones",
      description: "High-quality wireless headphones with noise cancellation",
      category_id: 17028922, // Electronics category
      price: "15999", // Price in kopecks (159.99 rubles)
      old_price: "19999",
      vat: "0.2", // 20% VAT
      height: 100,
      depth: 200,
      width: 150,
      weight: 250,
      images: [
        "https://example.com/image1.jpg",
        "https://example.com/image2.jpg"
      ],
      attributes: [
        {
          attribute_id: 85,
          value: "Sony"
        },
        {
          attribute_id: 8229,
          value: "Black"
        }
      ]
    };

    const importResult = await client.product.importProducts({
      items: [productData]
    });

    console.log('Import task ID:', importResult.result?.task_id);

    // Check import status
    if (importResult.result?.task_id) {
      const status = await client.product.getImportTaskStatus(
        importResult.result.task_id
      );
      
      console.log('Import status:', status.result?.state);
      
      if (status.result?.items) {
        status.result.items.forEach(item => {
          if (item.errors?.length) {
            console.error('Import errors for', item.offer_id, ':', item.errors);
          } else {
            console.log('✅ Successfully imported:', item.offer_id);
          }
        });
      }
    }

    return importResult;
  } catch (error) {
    console.error('Product import failed:', error);
    throw error;
  }
}
```

### Bulk Product Import

```typescript
async function importMultipleProducts() {
  const products = [
    {
      offer_id: "HEADPHONES-001",
      name: "Wireless Headphones Pro",
      category_id: 17028922,
      price: "15999",
      // ... other product fields
    },
    {
      offer_id: "HEADPHONES-002", 
      name: "Gaming Headset Ultra",
      category_id: 17028922,
      price: "8999",
      // ... other product fields
    }
    // Add more products...
  ];

  try {
    // Import in batches to avoid API limits
    const batchSize = 100;
    const results = [];

    for (let i = 0; i < products.length; i += batchSize) {
      const batch = products.slice(i, i + batchSize);
      
      console.log(`Importing batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(products.length/batchSize)}`);
      
      const batchResult = await client.product.importProducts({
        items: batch
      });
      
      results.push(batchResult);
      
      // Wait between batches to respect rate limits
      if (i + batchSize < products.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    return results;
  } catch (error) {
    console.error('Bulk import failed:', error);
    throw error;
  }
}
```

## Managing Product Information

### Updating Product Attributes

```typescript
async function updateProductAttributes(offer_id: string) {
  try {
    const updateResult = await client.product.updateAttributes({
      items: [{
        offer_id,
        attributes: [
          {
            attribute_id: 85, // Brand
            value: "Updated Brand Name"
          },
          {
            attribute_id: 8229, // Color
            value: "Blue"
          },
          {
            attribute_id: 9048, // Material
            value: "Plastic"
          }
        ]
      }]
    });

    console.log('Attribute update result:', updateResult);
    return updateResult;
  } catch (error) {
    console.error('Failed to update attributes:', error);
    throw error;
  }
}
```

### Managing Product Images

```typescript
async function updateProductImages(offer_id: string, imageUrls: string[]) {
  try {
    const importResult = await client.product.importPictures({
      items: [{
        offer_id,
        images: imageUrls.map((url, index) => ({
          file_name: `image_${index + 1}.jpg`,
          url: url
        }))
      }]
    });

    console.log('Image import task:', importResult.result?.task_id);

    // Monitor image import status
    if (importResult.result?.task_id) {
      const checkStatus = async () => {
        const pictures = await client.product.getProductPictures({
          offer_id: [offer_id]
        });
        
        return pictures.result?.items?.[0]?.images || [];
      };

      // Wait for images to be processed
      let attempts = 0;
      while (attempts < 10) {
        const images = await checkStatus();
        if (images.length >= imageUrls.length) {
          console.log('✅ All images processed');
          return images;
        }
        
        await new Promise(resolve => setTimeout(resolve, 5000));
        attempts++;
      }
    }

    return importResult;
  } catch (error) {
    console.error('Image update failed:', error);
    throw error;
  }
}
```

## Inventory Management

### Stock Level Management

```typescript
async function manageInventory() {
  try {
    // Get current stock levels
    const currentStocks = await client.product.getProductStocks({
      filter: {
        offer_id: ["HEADPHONES-001", "HEADPHONES-002"],
        product_id: [],
        visibility: "ALL"
      },
      limit: 100
    });

    console.log('Current stock levels:');
    currentStocks.result?.items?.forEach(item => {
      console.log(`${item.offer_id}: ${item.stocks?.present || 0} units`);
    });

    // Update stock levels using FBS API
    const stockUpdate = await client.fbs.updateStocks({
      stocks: [
        {
          offer_id: "HEADPHONES-001",
          stock: 50,
          warehouse_id: 12345
        },
        {
          offer_id: "HEADPHONES-002", 
          stock: 25,
          warehouse_id: 12345
        }
      ]
    });

    console.log('Stock update result:', stockUpdate);
    return stockUpdate;
  } catch (error) {
    console.error('Inventory management failed:', error);
    throw error;
  }
}
```

### Warehouse Analytics

```typescript
async function getWarehouseAnalytics() {
  try {
    const warehouseData = await client.analytics.getStockOnWarehouses({
      limit: 1000,
      offset: 0,
      warehouse_type: "ALL"
    });

    // Analyze stock levels
    const analysis = {
      totalProducts: warehouseData.result?.rows?.length || 0,
      lowStock: 0,
      outOfStock: 0,
      overStock: 0,
      totalValue: 0
    };

    warehouseData.result?.rows?.forEach(item => {
      const stock = item.free_to_sell_amount || 0;
      const price = parseFloat(item.price || '0');
      
      analysis.totalValue += stock * price;
      
      if (stock === 0) {
        analysis.outOfStock++;
      } else if (stock < 5) {
        analysis.lowStock++;
      } else if (stock > 100) {
        analysis.overStock++;
      }
    });

    console.log('📊 Warehouse Analytics:');
    console.log(`Total Products: ${analysis.totalProducts}`);
    console.log(`Out of Stock: ${analysis.outOfStock}`);
    console.log(`Low Stock (<5): ${analysis.lowStock}`);
    console.log(`Over Stock (>100): ${analysis.overStock}`);
    console.log(`Total Inventory Value: ₽${analysis.totalValue.toFixed(2)}`);

    return analysis;
  } catch (error) {
    console.error('Warehouse analytics failed:', error);
    throw error;
  }
}
```

## Pricing Operations

### Dynamic Pricing Updates

```typescript
async function updateProductPricing() {
  try {
    // Get current market data for pricing decisions
    const products = await client.product.getList({
      filter: { visibility: 'VISIBLE' },
      last_id: "",
      limit: 100
    });

    const priceUpdates = [];

    for (const product of products.result?.items || []) {
      // Calculate competitive pricing (simplified logic)
      const currentPrice = parseFloat(product.price || '0');
      const suggestedPrice = Math.round(currentPrice * 0.95); // 5% discount

      priceUpdates.push({
        offer_id: product.offer_id,
        price: suggestedPrice.toString(),
        old_price: product.price,
        premium_price: Math.round(suggestedPrice * 0.9).toString()
      });
    }

    // Update prices using Pricing Strategy API
    const pricingResult = await client['pricing-strategy'].importPrices({
      prices: priceUpdates
    });

    console.log('Pricing update task:', pricingResult.result?.task_id);

    // Monitor pricing update status
    if (pricingResult.result?.task_id) {
      let attempts = 0;
      while (attempts < 5) {
        // Check if pricing update is complete
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        const updatedProducts = await client.product.getProductPrices({
          filter: {
            offer_id: priceUpdates.slice(0, 10).map(p => p.offer_id),
            product_id: [],
            visibility: "ALL"
          },
          limit: 10
        });

        console.log('Updated prices:', updatedProducts.result?.items?.length);
        break;
      }
    }

    return pricingResult;
  } catch (error) {
    console.error('Pricing update failed:', error);
    throw error;
  }
}
```

### Promotional Pricing

```typescript
async function setupPromotionalPricing(offer_id: string, discountPercent: number) {
  try {
    // Get current product price
    const priceInfo = await client.product.getProductPrices({
      filter: {
        offer_id: [offer_id],
        product_id: [],
        visibility: "ALL"
      },
      limit: 1
    });

    const currentPrice = parseFloat(priceInfo.result?.items?.[0]?.price?.price || '0');
    const promoPrice = Math.round(currentPrice * (1 - discountPercent / 100));

    // Set promotional price
    const promoResult = await client['pricing-strategy'].importPrices({
      prices: [{
        offer_id,
        price: promoPrice.toString(),
        old_price: currentPrice.toString(),
        premium_price: Math.round(promoPrice * 0.95).toString()
      }]
    });

    // Check for available promotions
    const promotions = await client.promos.getActions();
    const activePromos = promotions.result?.filter(p => p.is_participating_available);

    if (activePromos?.length) {
      console.log(`Found ${activePromos.length} available promotions`);
      
      // Try to add product to first available promotion
      const candidates = await client.promos.getCandidates({
        action_id: activePromos[0].id,
        limit: 100
      });

      const isEligible = candidates.result?.products?.find(p => p.offer_id === offer_id);
      
      if (isEligible) {
        const activationResult = await client.promos.activateProducts({
          action_id: activePromos[0].id,
          products: [{
            product_id: isEligible.product_id,
            action_price: promoPrice.toString(),
            stock: 50
          }]
        });

        console.log('✅ Product added to promotion:', activationResult);
      }
    }

    return { promoResult, promotions: activePromos };
  } catch (error) {
    console.error('Promotional pricing setup failed:', error);
    throw error;
  }
}
```

## Product Analytics

### Performance Tracking

```typescript
async function trackProductPerformance(offer_ids: string[]) {
  try {
    const analytics = {
      products: [],
      summary: {
        totalRevenue: 0,
        totalUnits: 0,
        averageRating: 0,
        lowStockItems: 0
      }
    };

    for (const offer_id of offer_ids) {
      // Get product details
      const productInfo = await client.product.getProductInfo({
        offer_id,
        product_id: 0,
        sku: 0
      });

      // Get stock information
      const stockInfo = await client.product.getProductStocks({
        filter: {
          offer_id: [offer_id],
          product_id: [],
          visibility: "ALL"
        },
        limit: 1
      });

      // Get pricing information
      const priceInfo = await client.product.getProductPrices({
        filter: {
          offer_id: [offer_id],
          product_id: [],
          visibility: "ALL"
        },
        limit: 1
      });

      // Get ratings if available
      const ratingInfo = await client.product.getProductRatingBySku({
        sku: [offer_id]
      });

      const productAnalytics = {
        offer_id,
        name: productInfo.result?.name,
        stock: stockInfo.result?.items?.[0]?.stocks?.present || 0,
        price: parseFloat(priceInfo.result?.items?.[0]?.price?.price || '0'),
        rating: ratingInfo.result?.products?.[0]?.rating || 0,
        reviews: ratingInfo.result?.products?.[0]?.review_count || 0
      };

      analytics.products.push(productAnalytics);

      // Update summary
      analytics.summary.totalRevenue += productAnalytics.price * productAnalytics.stock;
      analytics.summary.totalUnits += productAnalytics.stock;
      if (productAnalytics.stock < 5) analytics.summary.lowStockItems++;
    }

    analytics.summary.averageRating = 
      analytics.products.reduce((sum, p) => sum + p.rating, 0) / analytics.products.length;

    console.log('📈 Product Performance Analytics:');
    console.log(`Total Products: ${analytics.products.length}`);
    console.log(`Total Inventory Value: ₽${analytics.summary.totalRevenue.toFixed(2)}`);
    console.log(`Total Units: ${analytics.summary.totalUnits}`);
    console.log(`Average Rating: ${analytics.summary.averageRating.toFixed(2)}`);
    console.log(`Low Stock Items: ${analytics.summary.lowStockItems}`);

    return analytics;
  } catch (error) {
    console.error('Performance tracking failed:', error);
    throw error;
  }
}
```

## Bulk Operations

### Mass Product Updates

```typescript
class BulkProductManager {
  private client: OzonSellerApiClient;
  private batchSize = 100;

  constructor(client: OzonSellerApiClient) {
    this.client = client;
  }

  async bulkUpdatePrices(priceUpdates: { offer_id: string; price: string; old_price?: string }[]) {
    try {
      const results = [];
      
      // Process in batches
      for (let i = 0; i < priceUpdates.length; i += this.batchSize) {
        const batch = priceUpdates.slice(i, i + this.batchSize);
        
        console.log(`Processing price batch ${Math.floor(i/this.batchSize) + 1}/${Math.ceil(priceUpdates.length/this.batchSize)}`);
        
        const batchResult = await this.client['pricing-strategy'].importPrices({
          prices: batch
        });
        
        results.push(batchResult);
        
        // Rate limiting delay
        if (i + this.batchSize < priceUpdates.length) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      return results;
    } catch (error) {
      console.error('Bulk price update failed:', error);
      throw error;
    }
  }

  async bulkUpdateStock(stockUpdates: { offer_id: string; stock: number; warehouse_id: number }[]) {
    try {
      const results = [];
      
      for (let i = 0; i < stockUpdates.length; i += this.batchSize) {
        const batch = stockUpdates.slice(i, i + this.batchSize);
        
        console.log(`Processing stock batch ${Math.floor(i/this.batchSize) + 1}/${Math.ceil(stockUpdates.length/this.batchSize)}`);
        
        const batchResult = await this.client.fbs.updateStocks({
          stocks: batch
        });
        
        results.push(batchResult);
        
        // Rate limiting delay
        if (i + this.batchSize < stockUpdates.length) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      return results;
    } catch (error) {
      console.error('Bulk stock update failed:', error);
      throw error;
    }
  }

  async bulkArchiveProducts(product_ids: number[]) {
    try {
      // Archive in smaller batches for safety
      const archiveBatchSize = 50;
      const results = [];

      for (let i = 0; i < product_ids.length; i += archiveBatchSize) {
        const batch = product_ids.slice(i, i + archiveBatchSize);
        
        console.log(`Archiving batch ${Math.floor(i/archiveBatchSize) + 1}/${Math.ceil(product_ids.length/archiveBatchSize)}`);
        
        const archiveResult = await this.client.product.archive({
          product_id: batch
        });
        
        results.push(archiveResult);
        
        // Wait between batches
        if (i + archiveBatchSize < product_ids.length) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }

      return results;
    } catch (error) {
      console.error('Bulk archive failed:', error);
      throw error;
    }
  }
}
```

## Complete Workflow Example

Here's a comprehensive example that puts it all together:

```typescript
class ProductCatalogManager {
  private client: OzonSellerApiClient;
  private bulkManager: BulkProductManager;

  constructor(apiKey: string, clientId: string) {
    this.client = new OzonSellerApiClient({
      apiKey: createApiKey(apiKey),
      clientId: createClientId(clientId)
    });
    this.bulkManager = new BulkProductManager(this.client);
  }

  async performDailyMaintenance() {
    try {
      console.log('🔄 Starting daily product maintenance...');

      // 1. Get all products
      const allProducts = await this.getAllProducts();
      console.log(`📦 Found ${allProducts.length} products`);

      // 2. Analyze performance
      const analytics = await this.analyzePerformance(allProducts);
      
      // 3. Update pricing based on performance
      await this.optimizePricing(analytics);
      
      // 4. Manage inventory
      await this.manageInventory(allProducts);
      
      // 5. Handle promotional opportunities
      await this.managePromotions(allProducts);
      
      // 6. Generate report
      const report = await this.generateMaintenanceReport(analytics);
      
      console.log('✅ Daily maintenance completed');
      return report;
    } catch (error) {
      console.error('❌ Daily maintenance failed:', error);
      throw error;
    }
  }

  private async getAllProducts() {
    const allProducts = [];
    let lastId = "";
    
    while (true) {
      const batch = await this.client.product.getList({
        filter: { visibility: 'VISIBLE' },
        last_id: lastId,
        limit: 1000
      });

      if (!batch.result?.items?.length) break;
      
      allProducts.push(...batch.result.items);
      lastId = batch.result.last_id || "";
      
      if (batch.result.items.length < 1000) break;
    }
    
    return allProducts;
  }

  private async analyzePerformance(products: any[]) {
    // Analyze top performers and underperformers
    const performance = {
      topPerformers: [],
      underPerformers: [],
      averageRating: 0,
      totalValue: 0
    };

    // Implementation details...
    return performance;
  }

  private async optimizePricing(analytics: any) {
    // Implement dynamic pricing logic
    console.log('💰 Optimizing pricing...');
    
    // Example: Reduce prices for underperformers
    const priceUpdates = analytics.underPerformers.map((product: any) => ({
      offer_id: product.offer_id,
      price: Math.round(parseFloat(product.price) * 0.95).toString(),
      old_price: product.price
    }));

    if (priceUpdates.length > 0) {
      await this.bulkManager.bulkUpdatePrices(priceUpdates);
      console.log(`Updated prices for ${priceUpdates.length} underperforming products`);
    }
  }

  private async manageInventory(products: any[]) {
    console.log('📊 Managing inventory...');
    
    // Check stock levels and reorder if needed
    const lowStockProducts = products.filter(p => (p.stocks?.present || 0) < 5);
    
    if (lowStockProducts.length > 0) {
      console.log(`⚠️ Found ${lowStockProducts.length} low stock products`);
      
      const stockUpdates = lowStockProducts.map(product => ({
        offer_id: product.offer_id,
        stock: 50, // Restock to 50 units
        warehouse_id: 12345 // Your warehouse ID
      }));

      await this.bulkManager.bulkUpdateStock(stockUpdates);
    }
  }

  private async managePromotions(products: any[]) {
    console.log('🎯 Managing promotions...');
    
    const promotions = await this.client.promos.getActions();
    const activePromotions = promotions.result?.filter(p => p.is_participating_available);

    if (activePromotions?.length) {
      console.log(`Found ${activePromotions.length} available promotions`);
      // Add products to promotions based on business logic
    }
  }

  private async generateMaintenanceReport(analytics: any) {
    console.log('📋 Generating maintenance report...');
    
    const report = {
      timestamp: new Date().toISOString(),
      analytics,
      recommendations: [
        'Consider promotional campaigns for underperforming products',
        'Monitor stock levels for seasonal variations',
        'Review pricing strategy for competitive advantage'
      ]
    };

    return report;
  }
}

// Usage
async function runDailyMaintenance() {
  const manager = new ProductCatalogManager(
    'your-api-key',
    'your-client-id'
  );

  try {
    const report = await manager.performDailyMaintenance();
    console.log('Maintenance report:', report);
  } catch (error) {
    console.error('Maintenance failed:', error);
  }
}

// Schedule to run daily
// runDailyMaintenance();
```

## Best Practices

### 1. Rate Limiting
- Implement delays between batch operations
- Monitor API rate limits and adjust batch sizes
- Use exponential backoff for retries

### 2. Error Handling
- Always wrap API calls in try-catch blocks
- Implement specific error handling for common scenarios
- Log errors with sufficient context for debugging

### 3. Data Validation
- Validate product data before import
- Check required fields and format constraints
- Implement business rule validation

### 4. Performance Optimization
- Use bulk operations for multiple items
- Implement caching for frequently accessed data
- Paginate through large datasets efficiently

### 5. Monitoring
- Track import/update success rates
- Monitor product performance metrics
- Set up alerts for critical issues

## Next Steps

- **[Inventory Management](./inventory-management.md)** - Advanced inventory operations
- **[Multi-API Integration](./multi-api-integration.md)** - Combining multiple APIs
- **[Analytics Dashboard](./analytics-dashboard.md)** - Building comprehensive analytics

---

*This product management tutorial is part of the OZON Seller API SDK documentation suite.*