# 18.4 FBS Legal & Compliance API

**Legal & Compliance API** - Legal entity management and customs declaration operations for OZON Seller API.

## Overview

The Legal & Compliance API provides specialized functionality for legal entity operations and customs documentation management. This focused API covers customs declarations for Turkish sellers (ETGB) and unpaid product tracking for legal entities across 2 essential methods.

### Key Features
- **ETGB Declarations**: Electronic Turkish customs declaration management
- **Legal Entity Tracking**: Unpaid product monitoring for legal entities
- **Compliance Management**: Regulatory document handling
- **Multi-Region Support**: Turkish market compliance integration

---

## 📋 Available Methods

### Customs & Documentation
1. **getEtgb** - Get ETGB customs declarations for Turkish sellers
2. **getUnpaidLegalProductList** - List unpaid products for legal entities

---

## 🚀 Quick Start Example

```typescript
import { OzonSellerAPI } from 'daytona-ozon-seller-api';

const api = new OzonSellerAPI({
  clientId: 'your-client-id',
  apiKey: 'your-api-key'
});

// Legal compliance workflow example
async function complianceWorkflowExample() {
  // 1. Get ETGB customs declarations
  const declarations = await api.fbs.getEtgb({
    posting_number: ['12345-0001-1', '12345-0002-1'],
    doc_type: 'ETGB'
  });
  
  console.log(`Found ${declarations.result?.length} customs declarations`);
  
  // 2. Process each declaration
  for (const declaration of declarations.result || []) {
    console.log(`Declaration for ${declaration.posting_number}: ${declaration.document_url}`);
    
    // Download or process declaration document
    if (declaration.document_url) {
      console.log(`Processing customs document: ${declaration.document_url}`);
    }
  }

  // 3. Check unpaid legal products
  const unpaidProducts = await api.fbs.getUnpaidLegalProductList({
    limit: 100,
    offset: 0
  });
  
  console.log(`Found ${unpaidProducts.result?.length} unpaid legal products`);
  
  // 4. Process unpaid products
  for (const product of unpaidProducts.result || []) {
    console.log(`Unpaid: ${product.name} (${product.sku})`);
    console.log(`Posting: ${product.posting_number}, Price: ${product.price}`);
    
    // Handle unpaid product notification or processing
  }
}
```

---

## 📊 Method Details

## 1. getEtgb

Gets ETGB (Elektronik Ticaret Gümrük Beyannamesi) customs declarations for Turkish sellers.

### Request Interface
```typescript
interface FbsGetEtgbRequest {
  posting_number: string[];  // Array of posting numbers
  doc_type: 'ETGB';         // Document type (only ETGB supported)
}
```

### Response Interface
```typescript
interface FbsGetEtgbResponse {
  result?: Array<{
    posting_number: string;     // Posting number
    document_url: string;       // URL to customs declaration document
    created_at: string;         // Creation timestamp
    status: string;             // Declaration status
    tracking_number?: string;   // Tracking number if available
  }>;
}
```

### Usage Examples

#### Basic ETGB Declaration Retrieval
```typescript
async function getCustomsDeclarations() {
  const result = await api.fbs.getEtgb({
    posting_number: ['12345-0001-1', '12345-0002-1'],
    doc_type: 'ETGB'
  });

  if (result.result && result.result.length > 0) {
    console.log('Customs declarations retrieved successfully:');
    
    result.result.forEach(declaration => {
      console.log(`- Posting: ${declaration.posting_number}`);
      console.log(`  Document: ${declaration.document_url}`);
      console.log(`  Status: ${declaration.status}`);
      console.log(`  Created: ${new Date(declaration.created_at).toLocaleDateString()}`);
    });
  } else {
    console.log('No customs declarations found');
  }
}
```

#### Bulk Declaration Processing
```typescript
async function processBulkDeclarations(postingNumbers: string[]) {
  // Process in batches to avoid API limits
  const batchSize = 10;
  const declarations: any[] = [];
  
  for (let i = 0; i < postingNumbers.length; i += batchSize) {
    const batch = postingNumbers.slice(i, i + batchSize);
    
    try {
      const result = await api.fbs.getEtgb({
        posting_number: batch,
        doc_type: 'ETGB'
      });
      
      if (result.result) {
        declarations.push(...result.result);
      }
      
      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error(`Failed to get declarations for batch ${i}-${i + batchSize}:`, error);
    }
  }
  
  console.log(`Retrieved ${declarations.length} total declarations`);
  return declarations;
}
```

---

## 2. getUnpaidLegalProductList

Retrieves list of unpaid products ordered by legal entities.

### Request Interface
```typescript
interface FbsUnpaidLegalProductListRequest {
  limit?: number;    // Number of items to return (max 1000)
  offset?: number;   // Offset for pagination
}
```

### Response Interface
```typescript
interface FbsUnpaidLegalProductListResponse {
  result?: Array<{
    posting_number: string;        // Posting number
    sku: number;                  // Product SKU
    name: string;                 // Product name
    price: string;                // Product price
    currency_code: string;        // Currency code
    quantity: number;             // Quantity ordered
    offer_id: string;             // Seller's offer ID
    created_at: string;           // Order creation date
    legal_entity_name: string;    // Legal entity name
    legal_entity_type: string;    // Type of legal entity
    payment_deadline?: string;    // Payment deadline
    overdue_days?: number;        // Days overdue
  }>;
  has_next: boolean;             // Whether there are more items
  total_count: number;           // Total number of unpaid products
}
```

### Usage Examples

#### Basic Unpaid Products Retrieval
```typescript
async function getUnpaidProducts() {
  const result = await api.fbs.getUnpaidLegalProductList({
    limit: 50,
    offset: 0
  });

  if (result.result && result.result.length > 0) {
    console.log(`Found ${result.total_count} total unpaid products`);
    console.log(`Showing ${result.result.length} items:`);
    
    result.result.forEach(product => {
      console.log(`\n- Product: ${product.name} (SKU: ${product.sku})`);
      console.log(`  Legal Entity: ${product.legal_entity_name} (${product.legal_entity_type})`);
      console.log(`  Posting: ${product.posting_number}`);
      console.log(`  Price: ${product.price} ${product.currency_code}`);
      console.log(`  Quantity: ${product.quantity}`);
      
      if (product.overdue_days) {
        console.log(`  ⚠️ Overdue: ${product.overdue_days} days`);
      }
    });
  } else {
    console.log('No unpaid products found');
  }
}
```

#### Paginated Unpaid Products Processing
```typescript
async function processAllUnpaidProducts() {
  let offset = 0;
  const limit = 100;
  let totalProcessed = 0;
  let hasMore = true;
  
  const overdueProducts: any[] = [];
  
  while (hasMore) {
    try {
      const result = await api.fbs.getUnpaidLegalProductList({
        limit,
        offset
      });
      
      if (result.result && result.result.length > 0) {
        console.log(`Processing batch ${offset + 1}-${offset + result.result.length} of ${result.total_count}`);
        
        // Filter overdue products
        const overdue = result.result.filter(product => 
          product.overdue_days && product.overdue_days > 0
        );
        
        overdueProducts.push(...overdue);
        
        totalProcessed += result.result.length;
        hasMore = result.has_next;
        offset += limit;
        
        // Rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));
        
      } else {
        hasMore = false;
      }
      
    } catch (error) {
      console.error(`Error processing batch at offset ${offset}:`, error);
      break;
    }
  }
  
  console.log(`\nProcessing complete:`);
  console.log(`- Total products processed: ${totalProcessed}`);
  console.log(`- Overdue products found: ${overdueProducts.length}`);
  
  return { totalProcessed, overdueProducts };
}
```

---

## 🛠️ Implementation Classes

### ComplianceManager Class
```typescript
interface ComplianceConfig {
  batchSize?: number;
  retryAttempts?: number;
  rateLimit?: number;
  alertThresholds?: {
    overdueWarning: number;    // Days
    overdueUrgent: number;     // Days
  };
}

class ComplianceManager {
  private api: OzonSellerAPI;
  private config: Required<ComplianceConfig>;
  
  constructor(api: OzonSellerAPI, config: ComplianceConfig = {}) {
    this.api = api;
    this.config = {
      batchSize: 10,
      retryAttempts: 3,
      rateLimit: 1000,
      alertThresholds: {
        overdueWarning: 7,
        overdueUrgent: 14
      },
      ...config
    };
  }

  /**
   * Process ETGB declarations with error handling
   */
  async processETGBDeclarations(postingNumbers: string[]): Promise<{
    successful: any[];
    failed: string[];
    documentUrls: string[];
  }> {
    const successful: any[] = [];
    const failed: string[] = [];
    const documentUrls: string[] = [];
    
    // Process in batches
    for (let i = 0; i < postingNumbers.length; i += this.config.batchSize) {
      const batch = postingNumbers.slice(i, i + this.config.batchSize);
      
      try {
        const result = await this.api.fbs.getEtgb({
          posting_number: batch,
          doc_type: 'ETGB'
        });
        
        if (result.result) {
          successful.push(...result.result);
          
          // Collect document URLs
          result.result.forEach(declaration => {
            if (declaration.document_url) {
              documentUrls.push(declaration.document_url);
            }
          });
        }
        
      } catch (error) {
        console.error(`ETGB batch failed for ${batch.join(', ')}:`, error);
        failed.push(...batch);
      }
      
      // Rate limiting
      if (i + this.config.batchSize < postingNumbers.length) {
        await new Promise(resolve => setTimeout(resolve, this.config.rateLimit));
      }
    }
    
    return { successful, failed, documentUrls };
  }

  /**
   * Monitor unpaid legal products with alerts
   */
  async monitorUnpaidProducts(): Promise<{
    total: number;
    warning: any[];
    urgent: any[];
    summary: {
      totalAmount: number;
      currency: string;
      oldestOverdue: number;
    };
  }> {
    let offset = 0;
    const limit = 100;
    let hasMore = true;
    
    const allProducts: any[] = [];
    
    // Collect all unpaid products
    while (hasMore) {
      const result = await this.api.fbs.getUnpaidLegalProductList({
        limit,
        offset
      });
      
      if (result.result && result.result.length > 0) {
        allProducts.push(...result.result);
        hasMore = result.has_next;
        offset += limit;
        
        await new Promise(resolve => setTimeout(resolve, this.config.rateLimit));
      } else {
        hasMore = false;
      }
    }
    
    // Categorize by urgency
    const warning = allProducts.filter(p => 
      p.overdue_days && 
      p.overdue_days >= this.config.alertThresholds.overdueWarning &&
      p.overdue_days < this.config.alertThresholds.overdueUrgent
    );
    
    const urgent = allProducts.filter(p => 
      p.overdue_days && 
      p.overdue_days >= this.config.alertThresholds.overdueUrgent
    );
    
    // Calculate summary
    const totalAmount = allProducts.reduce((sum, p) => 
      sum + parseFloat(p.price) * p.quantity, 0
    );
    
    const oldestOverdue = Math.max(...allProducts.map(p => p.overdue_days || 0));
    
    return {
      total: allProducts.length,
      warning,
      urgent,
      summary: {
        totalAmount,
        currency: allProducts[0]?.currency_code || 'RUB',
        oldestOverdue
      }
    };
  }

  /**
   * Generate compliance report
   */
  async generateComplianceReport(includeETGB: boolean = true): Promise<{
    timestamp: string;
    etgbDeclarations?: any;
    unpaidProducts: any;
    recommendations: string[];
  }> {
    const report: any = {
      timestamp: new Date().toISOString(),
      recommendations: []
    };
    
    // ETGB declarations if requested
    if (includeETGB) {
      // This would require posting numbers - simplified for example
      report.etgbDeclarations = {
        status: 'Available on request',
        note: 'Provide posting numbers to retrieve ETGB declarations'
      };
    }
    
    // Unpaid products analysis
    const unpaidAnalysis = await this.monitorUnpaidProducts();
    report.unpaidProducts = unpaidAnalysis;
    
    // Generate recommendations
    if (unpaidAnalysis.urgent.length > 0) {
      report.recommendations.push(`⚠️ ${unpaidAnalysis.urgent.length} products are critically overdue (>${this.config.alertThresholds.overdueUrgent} days)`);
    }
    
    if (unpaidAnalysis.warning.length > 0) {
      report.recommendations.push(`⚠️ ${unpaidAnalysis.warning.length} products approaching overdue (>${this.config.alertThresholds.overdueWarning} days)`);
    }
    
    if (unpaidAnalysis.summary.totalAmount > 100000) {
      report.recommendations.push(`💰 High unpaid amount: ${unpaidAnalysis.summary.totalAmount.toLocaleString()} ${unpaidAnalysis.summary.currency}`);
    }
    
    return report;
  }
}
```

---

## 🔄 Business Workflows

### Turkish Seller Customs Workflow
```typescript
async function turkishSellerCustomsWorkflow(postingNumbers: string[]) {
  const manager = new ComplianceManager(api);
  
  console.log('🇹🇷 Turkish Seller Customs Workflow');
  console.log(`Processing ${postingNumbers.length} postings...`);
  
  // 1. Get ETGB declarations
  const etgbResult = await manager.processETGBDeclarations(postingNumbers);
  
  console.log(`✅ Successful declarations: ${etgbResult.successful.length}`);
  console.log(`❌ Failed declarations: ${etgbResult.failed.length}`);
  console.log(`📄 Document URLs obtained: ${etgbResult.documentUrls.length}`);
  
  // 2. Process documents
  for (const url of etgbResult.documentUrls) {
    console.log(`📋 Processing customs document: ${url}`);
    // Download, validate, or store document
  }
  
  // 3. Handle failures
  if (etgbResult.failed.length > 0) {
    console.log('⚠️ Failed postings require manual review:', etgbResult.failed);
    // Implement retry logic or manual review process
  }
  
  return {
    processedCount: etgbResult.successful.length,
    documentCount: etgbResult.documentUrls.length,
    failedCount: etgbResult.failed.length
  };
}
```

### Legal Entity Payment Monitoring
```typescript
async function legalEntityPaymentMonitoring() {
  const manager = new ComplianceManager(api, {
    alertThresholds: {
      overdueWarning: 5,    // 5 days warning
      overdueUrgent: 10     // 10 days urgent
    }
  });
  
  console.log('💼 Legal Entity Payment Monitoring');
  
  // 1. Generate compliance report
  const report = await manager.generateComplianceReport(false);
  
  console.log(`📊 Compliance Report - ${new Date(report.timestamp).toLocaleDateString()}`);
  console.log(`Total unpaid products: ${report.unpaidProducts.total}`);
  console.log(`Warning level: ${report.unpaidProducts.warning.length}`);
  console.log(`Urgent level: ${report.unpaidProducts.urgent.length}`);
  console.log(`Total unpaid amount: ${report.unpaidProducts.summary.totalAmount.toLocaleString()} ${report.unpaidProducts.summary.currency}`);
  
  // 2. Process urgent cases
  if (report.unpaidProducts.urgent.length > 0) {
    console.log('\n🚨 Urgent Cases Requiring Immediate Action:');
    
    for (const product of report.unpaidProducts.urgent) {
      console.log(`- ${product.legal_entity_name}: ${product.name}`);
      console.log(`  Overdue: ${product.overdue_days} days, Amount: ${product.price} ${product.currency_code}`);
      console.log(`  Posting: ${product.posting_number}`);
      
      // Implement urgent action (email, phone call, legal notice)
      await sendUrgentPaymentNotice(product);
    }
  }
  
  // 3. Process warnings
  if (report.unpaidProducts.warning.length > 0) {
    console.log('\n⚠️ Warning Cases:');
    
    for (const product of report.unpaidProducts.warning) {
      console.log(`- ${product.legal_entity_name}: ${product.name} (${product.overdue_days} days overdue)`);
      
      // Implement warning action (automated reminder)
      await sendPaymentReminder(product);
    }
  }
  
  // 4. Recommendations
  if (report.recommendations.length > 0) {
    console.log('\n💡 Recommendations:');
    report.recommendations.forEach(rec => console.log(`  ${rec}`));
  }
  
  return report;
}

async function sendUrgentPaymentNotice(product: any) {
  // Implement urgent payment notice logic
  console.log(`  📧 Sending urgent notice to ${product.legal_entity_name}`);
}

async function sendPaymentReminder(product: any) {
  // Implement payment reminder logic
  console.log(`  📨 Sending reminder to ${product.legal_entity_name}`);
}
```

---

## ⚠️ Error Handling

### Common Error Scenarios
```typescript
async function robustComplianceOperations() {
  try {
    // ETGB with error handling
    const etgbResult = await api.fbs.getEtgb({
      posting_number: ['invalid-posting'],
      doc_type: 'ETGB'
    });
    
  } catch (error: any) {
    if (error.response?.status === 400) {
      console.error('Invalid posting numbers provided');
    } else if (error.response?.status === 404) {
      console.error('ETGB declarations not found');
    } else if (error.response?.status === 403) {
      console.error('Turkish seller access required for ETGB');
    } else {
      console.error('ETGB request failed:', error.message);
    }
  }
  
  try {
    // Unpaid products with pagination error handling
    const result = await api.fbs.getUnpaidLegalProductList({
      limit: 1001, // Invalid - exceeds maximum
      offset: 0
    });
    
  } catch (error: any) {
    if (error.response?.status === 400) {
      console.error('Invalid pagination parameters');
      // Retry with valid parameters
      const retryResult = await api.fbs.getUnpaidLegalProductList({
        limit: 1000,
        offset: 0
      });
    }
  }
}
```

---

## 📈 Performance Considerations

### Optimization Strategies
- **Batch Processing**: Process ETGB requests in small batches
- **Rate Limiting**: Implement proper delays between API calls
- **Caching**: Cache unpaid product lists for short periods
- **Pagination**: Use appropriate page sizes for large datasets
- **Error Recovery**: Implement retry logic with exponential backoff

### Resource Management
```typescript
class OptimizedComplianceManager extends ComplianceManager {
  private cache = new Map();
  private lastCacheTime = 0;
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes
  
  async getCachedUnpaidProducts() {
    const now = Date.now();
    
    if (this.cache.has('unpaid') && (now - this.lastCacheTime) < this.CACHE_TTL) {
      return this.cache.get('unpaid');
    }
    
    const result = await this.monitorUnpaidProducts();
    this.cache.set('unpaid', result);
    this.lastCacheTime = now;
    
    return result;
  }
}
```

---

## 🔗 Related Documentation

- **[FBS Main API (18-fbs.md)](./18-fbs.md)** - Complete FBS operations overview
- **[FBS Posting Management (18-fbs-posting.md)](./18-fbs-posting.md)** - Order and delivery management
- **[FBS Product Management (18-fbs-products.md)](./18-fbs-products.md)** - Product operations and cancellations

---

**Implementation Status**: ✅ Complete  
**Last Updated**: 2024  
**API Version**: v1  
**Methods Count**: 2 methods (ETGB declarations, unpaid products)