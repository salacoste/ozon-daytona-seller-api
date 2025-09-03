# FBS Posting Management

**Posting Management** - Core posting operations and order lifecycle management for FBS API.

## Overview

Posting Management handles the complete order fulfillment lifecycle for FBS operations including order retrieval, status updates, delivery coordination, and barcode processing across 8 essential methods.

---

## 📋 Methods Overview

### 📋 Order Retrieval (3 methods)
1. **getPostingV3** - Get detailed posting information
2. **getPostingListV3** - Get filtered posting list
3. **getUnfulfilledListV3** - Get orders awaiting fulfillment

### 📦 Status Management (3 methods)
4. **moveToAwaitingDelivery** - Move posting to delivery status
5. **moveToArbitration** - Move posting to arbitration
6. **cancelPosting** - Cancel posting with reason

### 🔍 Utilities (2 methods)
7. **getPostingByBarcode** - Find posting by barcode
8. **setMultiBoxQtyV3** - Set multi-box quantities

---

## 📋 Order Retrieval Methods

### getPostingV3()
Gets comprehensive information about specific posting including products, customer, and delivery details.

```typescript
interface FbsGetPostingV3Request {
  posting_number: string;
  with?: {
    analytics_data?: boolean;
    barcodes?: boolean;
    financial_data?: boolean;
    translit?: boolean;
  };
}

interface FbsGetPostingV3Response {
  result?: {
    posting_number?: string;
    status?: string;
    bs_id?: number;
    created_at?: string;
    in_process_at?: string;
    
    // Customer information
    customer?: {
      address?: {
        address_line?: string;
        building?: string;
        city?: string;
        comment?: string;
        country?: string;
        district?: string;
        latitude?: number;
        longitude?: number;
        region?: string;
        zip_code?: string;
      };
      customer_id?: number;
      name?: string;
      phone?: string;
    };
    
    // Delivery method
    delivery_method?: {
      id?: number;
      name?: string;
      warehouse_id?: number;
      warehouse?: string;
      tpl_provider_id?: number;
      tpl_provider?: string;
    };
    
    // Products in posting
    products?: Array<{
      name?: string;
      offer_id?: string;
      price?: string;
      quantity?: number;
      sku?: number;
      currency_code?: string;
      
      // Product details
      dimensions?: {
        height?: string;
        length?: string;
        weight?: string;
        width?: string;
      };
      
      // Status
      mandatory_mark?: string[];
      fbo_commission_percent?: number;
      fbo_commission_value?: number;
    }>;
    
    // Analytics data (if requested)
    analytics_data?: {
      city?: string;
      delivery_date_begin?: string;
      delivery_date_end?: string;
      delivery_type?: string;
      is_legal?: boolean;
      is_premium?: boolean;
      payment_type_group_name?: string;
      region?: string;
      warehouse_id?: number;
      warehouse_name?: string;
    };
    
    // Financial data (if requested)
    financial_data?: {
      cluster_from?: string;
      cluster_to?: string;
      posting_services?: Array<{
        marketplace_service_item_fulfillment?: number;
        marketplace_service_item_pickup?: number;
        marketplace_service_item_dropoff_pvz?: number;
        marketplace_service_item_dropoff_sc?: number;
        marketplace_service_item_dropoff_ff?: number;
        marketplace_service_item_direct_flow_trans?: number;
        marketplace_service_item_return_flow_trans?: number;
        marketplace_service_item_deliv_to_customer?: number;
        marketplace_service_item_return_not_deliv_to_customer?: number;
        marketplace_service_item_return_part_goods_customer?: number;
        marketplace_service_item_return_after_deliv_to_customer?: number;
      }>;
    };
    
    // Additional data
    required_meta?: Array<{
      key?: string;
      value?: string;
    }>;
    
    addressee?: {
      name?: string;
      phone?: string;
    };
    
    cancellation?: {
      affect_cancellation_rating?: boolean;
      cancel_reason?: string;
      cancel_reason_id?: number;
      cancelled_after_ship?: boolean;
      cancellation_initiator?: string;
      cancellation_type?: string;
    };
    
    // Multi-box info
    multi_box_qty?: number;
  };
}

// Usage Example
const posting = await fbsApi.getPostingV3({
  posting_number: 'FBS-123456789',
  with: {
    analytics_data: true,
    financial_data: true,
    barcodes: true
  }
});

if (posting.result) {
  const p = posting.result;
  console.log(`📦 Posting: ${p.posting_number}`);
  console.log(`Status: ${p.status}`);
  console.log(`Created: ${p.created_at}`);
  console.log(`BS ID: ${p.bs_id}`);
  
  // Customer information
  if (p.customer) {
    console.log(`\n👤 Customer: ${p.customer.name}`);
    console.log(`Phone: ${p.customer.phone}`);
    
    if (p.customer.address) {
      const addr = p.customer.address;
      console.log(`Address: ${addr.city}, ${addr.address_line}`);
      if (addr.comment) {
        console.log(`Comment: ${addr.comment}`);
      }
    }
  }
  
  // Delivery method
  if (p.delivery_method) {
    const delivery = p.delivery_method;
    console.log(`\n🚚 Delivery: ${delivery.name}`);
    console.log(`Warehouse: ${delivery.warehouse}`);
    console.log(`Provider: ${delivery.tpl_provider}`);
  }
  
  // Products
  console.log(`\n📋 Products (${p.products?.length}):`);
  p.products?.forEach((product, index) => {
    console.log(`${index + 1}. ${product.name}`);
    console.log(`   Offer ID: ${product.offer_id}`);
    console.log(`   SKU: ${product.sku}`);
    console.log(`   Quantity: ${product.quantity}`);
    console.log(`   Price: ${product.price} ${product.currency_code}`);
    
    if (product.dimensions) {
      const dims = product.dimensions;
      console.log(`   Dimensions: ${dims.length}×${dims.width}×${dims.height}mm`);
      console.log(`   Weight: ${dims.weight}g`);
    }
    
    if (product.mandatory_mark?.length) {
      console.log(`   Mandatory marks: ${product.mandatory_mark.join(', ')}`);
    }
  });
  
  // Analytics data
  if (p.analytics_data) {
    const analytics = p.analytics_data;
    console.log(`\n📊 Analytics:`);
    console.log(`Region: ${analytics.region}, City: ${analytics.city}`);
    console.log(`Delivery: ${analytics.delivery_date_begin} - ${analytics.delivery_date_end}`);
    console.log(`Payment: ${analytics.payment_type_group_name}`);
    console.log(`Premium: ${analytics.is_premium ? 'Yes' : 'No'}`);
    console.log(`Legal entity: ${analytics.is_legal ? 'Yes' : 'No'}`);
  }
  
  // Multi-box information
  if (p.multi_box_qty && p.multi_box_qty > 1) {
    console.log(`\n📦 Multi-box: ${p.multi_box_qty} boxes`);
  }
  
  // Required meta
  if (p.required_meta?.length) {
    console.log(`\n🏷️ Required meta:`);
    p.required_meta.forEach(meta => {
      console.log(`   ${meta.key}: ${meta.value}`);
    });
  }
}
```

### getPostingListV3()
Gets filtered list of postings with comprehensive search and sorting capabilities.

```typescript
interface FbsGetPostingListV3Request {
  filter?: {
    since: string;
    to: string;
    status?: string;
  };
  with?: {
    analytics_data?: boolean;
    financial_data?: boolean;
  };
  limit?: number;
  offset?: number;
}

// Usage Example - Compact version
const postingsList = await fbsApi.getPostingListV3({
  filter: {
    since: '2024-01-01T00:00:00Z',
    to: '2024-01-31T23:59:59Z',
    status: 'awaiting_deliver'
  },
  with: { analytics_data: true },
  limit: 100
});

console.log(`Found ${postingsList.result?.postings?.length} postings`);
postingsList.result?.postings?.forEach(posting => {
  console.log(`${posting.posting_number}: ${posting.status}`);
});
```

### getUnfulfilledListV3()
Gets list of orders that require fulfillment action from seller.

```typescript
interface FbsGetUnfulfilledListV3Request {
  cutoff?: {
    from?: string;
    to?: string;
  };
  limit?: number;
  offset?: number;
}

// Usage Example
const unfulfilled = await fbsApi.getUnfulfilledListV3({
  limit: 50
});

console.log(`📋 Unfulfilled Orders: ${unfulfilled.result?.postings?.length}`);

unfulfilled.result?.postings?.forEach((posting, index) => {
  console.log(`\n${index + 1}. ${posting.posting_number}`);
  console.log(`   Status: ${posting.status}`);
  console.log(`   Created: ${posting.created_at}`);
  console.log(`   Products: ${posting.products?.length}`);
  
  // Show cutoff information if available
  if (posting.in_process_at) {
    const cutoffTime = new Date(posting.in_process_at);
    const hoursLeft = (cutoffTime.getTime() - Date.now()) / (1000 * 60 * 60);
    
    if (hoursLeft > 0) {
      console.log(`   ⏰ Cutoff in: ${hoursLeft.toFixed(1)} hours`);
    } else {
      console.log(`   ⚠️ Cutoff passed ${Math.abs(hoursLeft).toFixed(1)} hours ago`);
    }
  }
});
```

---

## 📦 Status Management Methods

### moveToAwaitingDelivery()
Moves posting to delivery status with tracking information.

```typescript
interface FbsMovePostingRequest {
  posting_number: string;
  carrier_id?: number;
  tracking_number?: string;
}

// Usage Example
const moved = await fbsApi.moveToAwaitingDelivery({
  posting_number: 'FBS-123456789',
  carrier_id: 1,
  tracking_number: 'TRACK123456789'
});

if (moved.result) {
  console.log('✅ Posting moved to awaiting delivery');
} else {
  console.log('❌ Failed to move posting');
}
```

### cancelPosting()
Cancels posting with specified reason and message.

```typescript
interface FbsCancelPostingRequest {
  posting_number: string;
  cancel_reason_id: number;
  cancel_reason_message?: string;
}

// Usage Example
const cancelled = await fbsApi.cancelPosting({
  posting_number: 'FBS-123456789',
  cancel_reason_id: 402,
  cancel_reason_message: 'Product out of stock'
});

if (cancelled.result) {
  console.log('✅ Posting cancelled successfully');
} else {
  console.log('❌ Failed to cancel posting');
}
```

---

## 💼 Business Workflows

### 1. Complete Order Processing Workflow
```typescript
class FbsOrderProcessor {
  private readonly api: FbsApi;
  
  constructor(api: FbsApi) {
    this.api = api;
  }
  
  async processPendingOrders() {
    try {
      // Get unfulfilled orders
      const unfulfilled = await this.api.getUnfulfilledListV3({
        limit: 100
      });
      
      const orders = unfulfilled.result?.postings || [];
      console.log(`📋 Processing ${orders.length} unfulfilled orders`);
      
      const results = {
        processed: 0,
        cancelled: 0,
        errors: 0
      };
      
      for (const posting of orders) {
        try {
          const result = await this.processOrder(posting);
          
          if (result === 'processed') {
            results.processed++;
          } else if (result === 'cancelled') {
            results.cancelled++;
          }
          
        } catch (error) {
          console.error(`Error processing ${posting.posting_number}:`, error.message);
          results.errors++;
        }
      }
      
      console.log(`\n📊 Processing Results:`);
      console.log(`✅ Processed: ${results.processed}`);
      console.log(`❌ Cancelled: ${results.cancelled}`);
      console.log(`🔴 Errors: ${results.errors}`);
      
      return results;
      
    } catch (error) {
      console.error('Order processing failed:', error);
      throw error;
    }
  }
  
  private async processOrder(posting: any): Promise<'processed' | 'cancelled'> {
    // Get detailed posting information
    const details = await this.api.getPostingV3({
      posting_number: posting.posting_number,
      with: { analytics_data: true }
    });
    
    if (!details.result) {
      throw new Error('Failed to get posting details');
    }
    
    const postingDetails = details.result;
    
    // Check inventory for all products
    const inventoryCheck = await this.checkInventory(postingDetails.products || []);
    
    if (!inventoryCheck.allAvailable) {
      // Cancel if inventory not available
      await this.api.cancelPosting({
        posting_number: posting.posting_number,
        cancel_reason_id: 402,
        cancel_reason_message: `Out of stock: ${inventoryCheck.unavailableItems.join(', ')}`
      });
      
      console.log(`❌ Cancelled ${posting.posting_number} - inventory unavailable`);
      return 'cancelled';
    }
    
    // Generate tracking number
    const trackingNumber = this.generateTrackingNumber();
    
    // Move to awaiting delivery
    const moved = await this.api.moveToAwaitingDelivery({
      posting_number: posting.posting_number,
      carrier_id: 1, // Your carrier ID
      tracking_number: trackingNumber
    });
    
    if (!moved.result) {
      throw new Error('Failed to move posting to delivery');
    }
    
    console.log(`✅ Processed ${posting.posting_number} - tracking: ${trackingNumber}`);
    return 'processed';
  }
  
  private async checkInventory(products: any[]) {
    // Simulate inventory check
    const unavailableItems: string[] = [];
    
    for (const product of products) {
      // Your inventory check logic here
      const available = Math.random() > 0.1; // 90% availability simulation
      
      if (!available) {
        unavailableItems.push(product.offer_id);
      }
    }
    
    return {
      allAvailable: unavailableItems.length === 0,
      unavailableItems
    };
  }
  
  private generateTrackingNumber(): string {
    return `TRACK${Date.now()}${Math.floor(Math.random() * 1000)}`;
  }
}
```

### 2. Posting Analytics Dashboard
```typescript
async function generatePostingAnalytics(dateRange: { since: string; to: string }) {
  // Get all postings for period
  const postings = await fbsApi.getPostingListV3({
    filter: dateRange,
    with: { analytics_data: true },
    limit: 1000
  });
  
  const stats = {
    total: 0,
    byStatus: new Map<string, number>(),
    byRegion: new Map<string, number>(),
    byPaymentType: new Map<string, number>(),
    premium: 0,
    legal: 0,
    totalRevenue: 0
  };
  
  postings.result?.postings?.forEach(posting => {
    stats.total++;
    
    // Status breakdown
    const status = posting.status || 'unknown';
    stats.byStatus.set(status, (stats.byStatus.get(status) || 0) + 1);
    
    // Analytics data
    if (posting.analytics_data) {
      const analytics = posting.analytics_data;
      
      // Region breakdown
      if (analytics.region) {
        stats.byRegion.set(analytics.region, (stats.byRegion.get(analytics.region) || 0) + 1);
      }
      
      // Payment type
      if (analytics.payment_type_group_name) {
        stats.byPaymentType.set(analytics.payment_type_group_name, (stats.byPaymentType.get(analytics.payment_type_group_name) || 0) + 1);
      }
      
      // Premium/Legal counts
      if (analytics.is_premium) stats.premium++;
      if (analytics.is_legal) stats.legal++;
    }
    
    // Revenue calculation
    posting.products?.forEach(product => {
      stats.totalRevenue += parseFloat(product.price || '0') * (product.quantity || 0);
    });
  });
  
  console.log('📊 FBS Posting Analytics');
  console.log('========================');
  console.log(`Total postings: ${stats.total}`);
  console.log(`Total revenue: ${stats.totalRevenue.toFixed(2)} RUB`);
  console.log(`Premium orders: ${stats.premium} (${(stats.premium/stats.total*100).toFixed(1)}%)`);
  console.log(`Legal entities: ${stats.legal} (${(stats.legal/stats.total*100).toFixed(1)}%)`);
  
  console.log('\nStatus breakdown:');
  Array.from(stats.byStatus.entries())
    .sort((a, b) => b[1] - a[1])
    .forEach(([status, count]) => {
      console.log(`  ${status}: ${count} (${(count/stats.total*100).toFixed(1)}%)`);
    });
  
  console.log('\nTop regions:');
  Array.from(stats.byRegion.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .forEach(([region, count]) => {
      console.log(`  ${region}: ${count} (${(count/stats.total*100).toFixed(1)}%)`);
    });
  
  return stats;
}
```

---

## 📊 API Endpoints Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `getPostingV3` | `POST /v3/posting/fbs/get` | Get posting details |
| `getPostingListV3` | `POST /v3/posting/fbs/list` | Get posting list |
| `getUnfulfilledListV3` | `POST /v3/posting/fbs/unfulfilled/list` | Get unfulfilled orders |
| `moveToAwaitingDelivery` | `POST /v2/posting/fbs/ship` | Move to delivery |
| `moveToArbitration` | `POST /v2/posting/fbs/arbitration` | Move to arbitration |
| `cancelPosting` | `POST /v2/posting/fbs/cancel` | Cancel posting |
| `getPostingByBarcode` | `POST /v3/posting/fbs/get-by-barcode` | Get by barcode |
| `setMultiBoxQtyV3` | `POST /v3/posting/fbs/multi-box-qty/set` | Set multi-box quantity |

---

**[← Back to FBS API Main](./18-fbs.md)**