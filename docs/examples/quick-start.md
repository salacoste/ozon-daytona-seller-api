# Quick Start Guide

Get up and running with the OZON Seller API SDK in minutes.

## Overview

This guide walks you through the basic setup and your first API calls using the OZON Seller API SDK. You'll learn how to authenticate, make basic requests, and handle responses.

## Prerequisites

- Node.js 18 or higher
- TypeScript knowledge (basic)
- OZON Seller API credentials:
  - API Key (from OZON Seller Portal)
  - Client ID (from OZON Seller Portal)

## Step 1: Installation

```bash
npm install @ozon/seller-api
# or
yarn add @ozon/seller-api
```

## Step 2: Basic Setup

Create a new TypeScript file and import the SDK:

```typescript
import { 
  OzonSellerApiClient, 
  createApiKey, 
  createClientId 
} from '@ozon/seller-api';

// Initialize the client with your credentials
const client = new OzonSellerApiClient({
  apiKey: createApiKey('your-api-key-here'),
  clientId: createClientId('your-client-id-here'),
  baseUrl: 'https://api-seller.ozon.ru' // Optional: defaults to production
});
```

## Step 3: Your First API Call

Let's start with getting your product list:

```typescript
async function getMyProducts() {
  try {
    const response = await client.product.getList({
      filter: {
        visibility: 'VISIBLE' // Only show visible products
      },
      last_id: "", // Start from beginning
      limit: 10    // Get first 10 products
    });

    console.log('Products found:', response.result?.items?.length);
    
    response.result?.items?.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} (${product.offer_id})`);
      console.log(`   Status: ${product.state}`);
      console.log(`   Price: ${product.price}`);
      console.log(`   Stock: ${product.stocks?.coming || 0}`);
      console.log('---');
    });

    return response.result?.items;
  } catch (error) {
    console.error('Error fetching products:', error.message);
    throw error;
  }
}

// Run the function
getMyProducts()
  .then(products => console.log(`Successfully retrieved ${products?.length} products`))
  .catch(error => console.error('Failed to get products:', error));
```

## Step 4: Working with Different APIs

The SDK includes 32 different API categories. Here are some common ones:

### Analytics API
```typescript
async function getAnalytics() {
  try {
    const stockAnalytics = await client.analytics.getStockOnWarehouses({
      limit: 50,
      offset: 0,
      warehouse_type: "ALL"
    });

    console.log('Warehouse analytics:', stockAnalytics.result?.rows?.length, 'entries');
    return stockAnalytics.result?.rows;
  } catch (error) {
    console.error('Analytics error:', error.message);
    throw error;
  }
}
```

### Finance API
```typescript
async function getFinancialData() {
  try {
    const transactions = await client.finance.getTransactionList({
      filter: {
        date: {
          from: '2024-01-01',
          to: '2024-01-31'
        },
        operation_type: [],
        posting_number: "",
        transaction_type: "all"
      },
      page: 1,
      page_size: 50
    });

    console.log('Transactions found:', transactions.result?.transactions?.length);
    return transactions.result?.transactions;
  } catch (error) {
    console.error('Finance error:', error.message);
    throw error;
  }
}
```

### Report API
```typescript
async function generateReport() {
  try {
    // Create a products report
    const reportRequest = await client.report.createProductsReport({
      sku: [], // Empty array means all products
      visibility: 'VISIBLE',
      language: 'RU'
    });

    console.log('Report created with code:', reportRequest.result?.code);

    // Check report status
    if (reportRequest.result?.code) {
      const reportInfo = await client.report.getReportInfo({
        code: reportRequest.result.code
      });

      console.log('Report status:', reportInfo.result?.status);
      
      if (reportInfo.result?.status === 'SUCCESS') {
        console.log('Report download URL:', reportInfo.result.download_url);
      }
    }

    return reportRequest.result?.code;
  } catch (error) {
    console.error('Report error:', error.message);
    throw error;
  }
}
```

## Step 5: Complete Example Application

Here's a complete example that demonstrates multiple API calls:

```typescript
import { 
  OzonSellerApiClient, 
  createApiKey, 
  createClientId 
} from '@ozon/seller-api';

class OzonSellerDashboard {
  private client: OzonSellerApiClient;

  constructor(apiKey: string, clientId: string) {
    this.client = new OzonSellerApiClient({
      apiKey: createApiKey(apiKey),
      clientId: createClientId(clientId)
    });
  }

  async getDashboardData() {
    try {
      console.log('📊 Loading dashboard data...');

      // Get product overview
      const products = await this.getProductOverview();
      
      // Get sales analytics
      const analytics = await this.getAnalyticsOverview();
      
      // Get recent financial data
      const finance = await this.getFinancialOverview();

      return {
        products,
        analytics,
        finance,
        summary: {
          totalProducts: products.total,
          visibleProducts: products.visible,
          warehouseEntries: analytics.warehouseData.length,
          recentTransactions: finance.transactions.length
        }
      };
    } catch (error) {
      console.error('❌ Dashboard loading failed:', error.message);
      throw error;
    }
  }

  private async getProductOverview() {
    const products = await this.client.product.getList({
      filter: {},
      last_id: "",
      limit: 1000 // Get more products for overview
    });

    const visible = products.result?.items?.filter(p => p.visible === true) || [];
    
    return {
      total: products.result?.items?.length || 0,
      visible: visible.length,
      items: products.result?.items?.slice(0, 5) // First 5 for preview
    };
  }

  private async getAnalyticsOverview() {
    const stockData = await this.client.analytics.getStockOnWarehouses({
      limit: 100,
      offset: 0,
      warehouse_type: "ALL"
    });

    return {
      warehouseData: stockData.result?.rows || []
    };
  }

  private async getFinancialOverview() {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const transactions = await this.client.finance.getTransactionList({
      filter: {
        date: {
          from: oneMonthAgo.toISOString().split('T')[0],
          to: new Date().toISOString().split('T')[0]
        },
        operation_type: [],
        posting_number: "",
        transaction_type: "all"
      },
      page: 1,
      page_size: 50
    });

    return {
      transactions: transactions.result?.transactions || []
    };
  }

  async printDashboard() {
    try {
      const data = await this.getDashboardData();
      
      console.log('\n🎯 OZON Seller Dashboard');
      console.log('========================');
      console.log(`📦 Products: ${data.summary.totalProducts} total, ${data.summary.visibleProducts} visible`);
      console.log(`📊 Analytics: ${data.summary.warehouseEntries} warehouse entries`);
      console.log(`💰 Finance: ${data.summary.recentTransactions} recent transactions`);
      
      console.log('\n📦 Recent Products:');
      data.products.items.forEach((product: any, index: number) => {
        console.log(`   ${index + 1}. ${product.name} - ${product.offer_id}`);
      });

      return data;
    } catch (error) {
      console.error('Dashboard error:', error);
      throw error;
    }
  }
}

// Usage
async function main() {
  const dashboard = new OzonSellerDashboard(
    'your-api-key-here',
    'your-client-id-here'
  );

  await dashboard.printDashboard();
}

// Run the application
if (require.main === module) {
  main().catch(console.error);
}

export { OzonSellerDashboard };
```

## Step 6: Error Handling Best Practices

Always implement proper error handling:

```typescript
async function robustApiCall() {
  try {
    const result = await client.product.getList({
      filter: { visibility: 'VISIBLE' },
      last_id: "",
      limit: 100
    });

    return result;
  } catch (error: any) {
    // Handle specific OZON API errors
    if (error.code === 'INVALID_ARGUMENT') {
      console.error('Invalid request parameters:', error.message);
      // Handle invalid parameters
    } else if (error.code === 'PERMISSION_DENIED') {
      console.error('Insufficient permissions:', error.message);
      // Handle authentication issues
    } else if (error.code === 'RATE_LIMIT_EXCEEDED') {
      console.error('Rate limit exceeded, retry later');
      // Implement retry logic
    } else {
      console.error('Unexpected error:', error.message);
      // Handle other errors
    }
    
    throw error; // Re-throw if needed
  }
}
```

## Next Steps

Now that you have the basics working:

1. **[Product Management Tutorial](./product-management.md)** - Learn comprehensive product operations
2. **[Error Handling Guide](./error-handling.md)** - Implement robust error handling
3. **[Multi-API Integration](./multi-api-integration.md)** - Combine multiple APIs for workflows
4. **[Authentication Setup](./authentication.md)** - Advanced authentication patterns

## Testing Your Setup

Create a simple test to verify everything works:

```typescript
// test-setup.ts
import { OzonSellerApiClient, createApiKey, createClientId } from '@ozon/seller-api';

async function testConnection() {
  const client = new OzonSellerApiClient({
    apiKey: createApiKey('your-api-key'),
    clientId: createClientId('your-client-id')
  });

  try {
    // Simple test - get first product
    const products = await client.product.getList({
      filter: {},
      last_id: "",
      limit: 1
    });

    console.log('✅ Connection successful!');
    console.log('📦 Product count:', products.result?.total || 0);
    
    return true;
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    return false;
  }
}

testConnection();
```

## Troubleshooting

### Common Issues

1. **Authentication Errors**
   - Verify your API key and Client ID are correct
   - Check that credentials have proper permissions
   - Ensure you're using the correct base URL

2. **Network Errors**
   - Check internet connection
   - Verify firewall settings
   - Try with different network if needed

3. **TypeScript Errors**
   - Ensure you have proper TypeScript configuration
   - Update to latest SDK version
   - Check type definitions are properly imported

### Getting Help

- **[API Documentation](../api/README.md)** - Complete API reference
- **[Migration Guide](../MIGRATION.md)** - Migration assistance
- **[Examples](./README.md)** - More examples and tutorials

Congratulations! You now have a working OZON Seller API SDK setup and can start building your seller automation tools.

---

*This quick start guide is part of the OZON Seller API SDK documentation suite.*