# FBO Warehouse & Operations

**Warehouse & Operations Management** - Warehouse availability monitoring and posting operations for FBO API.

## Overview

Warehouse & Operations management provides real-time warehouse capacity monitoring, posting lifecycle management, and operational data for FBO fulfillment operations across 4 specialized methods.

---

## 📋 Methods Overview

### 🏢 Warehouse Management (1 method)
1. **getWarehouseAvailability** - Get warehouse capacity and availability

### 📦 Posting Operations (2 methods)
2. **getPosting** - Get detailed FBO posting information
3. **getPostingsList** - Get filtered list of FBO postings

### ❌ Support Operations (1 method)
4. **getCancelReasons** - Get available cancellation reasons

---

## 🏢 Warehouse Management Methods

### getWarehouseAvailability()
Gets real-time warehouse capacity, availability, and operational status.

```typescript
interface FboWarehouseAvailabilityRequest {
  // Optional filters
  region?: string;
  warehouse_type?: 'standard' | 'express' | 'cross_dock';
}

interface FboWarehouseAvailabilityResponse {
  warehouses?: Array<{
    warehouse_id?: number;
    name?: string;
    code?: string;
    region?: string;
    city?: string;
    address?: string;
    
    // Availability status
    is_active?: boolean;
    is_accepting_supply?: boolean;
    capacity_utilization?: number; // 0-100%
    
    // Capacity details
    capacity_info?: {
      max_pallets?: number;
      current_pallets?: number;
      available_pallets?: number;
      max_daily_orders?: number;
      current_daily_orders?: number;
      utilization_forecast?: Array<{
        date?: string;
        predicted_utilization?: number;
      }>;
    };
    
    // Operational hours
    working_hours?: {
      monday?: { start: string; end: string; breaks?: Array<{start: string; end: string;}> };
      tuesday?: { start: string; end: string; breaks?: Array<{start: string; end: string;}> };
      wednesday?: { start: string; end: string; breaks?: Array<{start: string; end: string;}> };
      thursday?: { start: string; end: string; breaks?: Array<{start: string; end: string;}> };
      friday?: { start: string; end: string; breaks?: Array<{start: string; end: string;}> };
      saturday?: { start: string; end: string; breaks?: Array<{start: string; end: string;}> };
      sunday?: { start: string; end: string; breaks?: Array<{start: string; end: string;}> };
    };
    
    // Contact information
    contact_info?: {
      phone?: string;
      email?: string;
      manager_name?: string;
      emergency_contact?: string;
    };
    
    // Performance metrics
    performance?: {
      avg_processing_time?: number; // hours
      on_time_rate?: number;        // percentage
      quality_score?: number;       // 0-100
      customer_rating?: number;     // 0-5
    };
    
    // Restrictions and requirements
    restrictions?: {
      min_order_value?: number;
      max_pallet_weight?: number;
      prohibited_categories?: string[];
      special_requirements?: string[];
    };
    
    // Current status
    current_status?: {
      status?: 'normal' | 'busy' | 'critical' | 'maintenance';
      estimated_delay?: number;     // minutes
      next_available_slot?: string;
      status_message?: string;
    };
  }>;
  
  total_warehouses?: number;
  available_warehouses?: number;
  last_updated?: string;
}

// Usage Example
const availability = await fboApi.getWarehouseAvailability({
  region: 'moscow'
});

console.log(`Found ${availability.available_warehouses}/${availability.total_warehouses} available warehouses`);
console.log(`Last updated: ${availability.last_updated}`);

availability.warehouses?.forEach((warehouse, index) => {
  console.log(`\n${index + 1}. ${warehouse.name} (${warehouse.code})`);
  console.log(`   Location: ${warehouse.city}, ${warehouse.address}`);
  console.log(`   Status: ${warehouse.is_accepting_supply ? '✅ Accepting' : '❌ Not accepting'}`);
  console.log(`   Capacity: ${warehouse.capacity_utilization}%`);
  
  if (warehouse.capacity_info) {
    const capacity = warehouse.capacity_info;
    console.log(`   Pallets: ${capacity.current_pallets}/${capacity.max_pallets} (${capacity.available_pallets} available)`);
    console.log(`   Daily orders: ${capacity.current_daily_orders}/${capacity.max_daily_orders}`);
  }
  
  if (warehouse.performance) {
    const perf = warehouse.performance;
    console.log(`   Performance: ${perf.on_time_rate}% on-time, ${perf.quality_score}/100 quality`);
    console.log(`   Avg processing: ${perf.avg_processing_time} hours`);
    console.log(`   Rating: ${perf.customer_rating}/5 stars`);
  }
  
  if (warehouse.current_status) {
    const status = warehouse.current_status;
    console.log(`   Current status: ${status.status}`);
    if (status.estimated_delay) {
      console.log(`   Estimated delay: ${status.estimated_delay} minutes`);
    }
    if (status.next_available_slot) {
      console.log(`   Next slot: ${status.next_available_slot}`);
    }
    if (status.status_message) {
      console.log(`   Message: ${status.status_message}`);
    }
  }
  
  // Contact information
  if (warehouse.contact_info) {
    console.log(`   Contact: ${warehouse.contact_info.phone} (${warehouse.contact_info.manager_name})`);
  }
  
  // Working hours (show today's hours)
  const today = new Date().toLocaleLowerCase().slice(0, 3) + 'day'; // e.g., 'monday'
  const todayHours = warehouse.working_hours?.[today];
  if (todayHours) {
    console.log(`   Today's hours: ${todayHours.start} - ${todayHours.end}`);
  }
});
```

---

## 📦 Posting Operations Methods

### getPosting()
Gets detailed information about specific FBO posting including analytics and financial data.

```typescript
interface FboPostingGetRequest {
  posting_number: string;
  with?: {
    analytics_data?: boolean;
    products?: boolean;
    financial_data?: boolean;
  };
}

interface FboPostingGetResponse {
  posting?: {
    posting_number?: string;
    status?: 'awaiting_deliver' | 'delivered' | 'cancelled';
    warehouse_id?: number;
    warehouse_name?: string;
    
    // Order details
    order_id?: number;
    order_date?: string;
    delivery_date?: string;
    delivered_date?: string;
    
    // Customer information (limited)
    customer_info?: {
      delivery_city?: string;
      delivery_region?: string;
      delivery_method?: string;
    };
    
    // Products
    products?: Array<{
      product_id?: number;
      offer_id?: string;
      name?: string;
      sku?: string;
      quantity?: number;
      price?: number;
      
      // Product status
      item_status?: 'awaiting' | 'picked' | 'packed' | 'shipped' | 'delivered';
      
      // Dimensions and weight
      dimensions?: {
        weight?: number;
        width?: number;
        height?: number;
        length?: number;
      };
    }>;
    
    // Analytics data
    analytics_data?: {
      processing_time?: {
        order_to_pick?: number;    // hours
        pick_to_pack?: number;     // hours
        pack_to_ship?: number;     // hours
        ship_to_deliver?: number;  // hours
        total_time?: number;       // hours
      };
      
      warehouse_performance?: {
        pick_accuracy?: number;    // percentage
        pack_quality?: number;     // percentage
        on_time_ship?: boolean;
        damage_rate?: number;      // percentage
      };
      
      delivery_metrics?: {
        first_attempt_success?: boolean;
        delivery_attempts?: number;
        customer_rating?: number;  // 0-5
        delivery_feedback?: string;
      };
    };
    
    // Financial data
    financial_data?: {
      product_price?: number;
      commission?: number;
      fulfillment_fee?: number;
      storage_fee?: number;
      additional_fees?: Array<{
        type?: string;
        amount?: number;
        description?: string;
      }>;
      total_fees?: number;
      payout_amount?: number;
      currency?: string;
      
      // Payment info
      payment_status?: 'pending' | 'paid' | 'cancelled';
      payout_date?: string;
    };
  };
}

// Usage Example
const posting = await fboApi.getPosting({
  posting_number: 'FBO-123456789',
  with: {
    analytics_data: true,
    products: true,
    financial_data: true
  }
});

if (posting.posting) {
  const p = posting.posting;
  console.log(`FBO Posting: ${p.posting_number}`);
  console.log(`Status: ${p.status}`);
  console.log(`Warehouse: ${p.warehouse_name}`);
  console.log(`Order Date: ${p.order_date}`);
  
  if (p.delivered_date) {
    console.log(`Delivered: ${p.delivered_date}`);
  } else if (p.delivery_date) {
    console.log(`Planned Delivery: ${p.delivery_date}`);
  }
  
  // Products
  console.log(`\nProducts (${p.products?.length}):`);
  p.products?.forEach((product, index) => {
    console.log(`${index + 1}. ${product.name}`);
    console.log(`   SKU: ${product.sku} | Offer: ${product.offer_id}`);
    console.log(`   Quantity: ${product.quantity} | Price: ${product.price} RUB`);
    console.log(`   Status: ${product.item_status}`);
    
    if (product.dimensions) {
      const d = product.dimensions;
      console.log(`   Size: ${d.length}×${d.width}×${d.height}mm, ${d.weight}g`);
    }
  });
  
  // Analytics
  if (p.analytics_data) {
    console.log('\n📊 Analytics:');
    
    if (p.analytics_data.processing_time) {
      const pt = p.analytics_data.processing_time;
      console.log(`Processing times:`);
      console.log(`  Order → Pick: ${pt.order_to_pick}h`);
      console.log(`  Pick → Pack: ${pt.pick_to_pack}h`);
      console.log(`  Pack → Ship: ${pt.pack_to_ship}h`);
      console.log(`  Ship → Deliver: ${pt.ship_to_deliver}h`);
      console.log(`  Total: ${pt.total_time}h`);
    }
    
    if (p.analytics_data.warehouse_performance) {
      const wp = p.analytics_data.warehouse_performance;
      console.log(`Warehouse performance:`);
      console.log(`  Pick accuracy: ${wp.pick_accuracy}%`);
      console.log(`  Pack quality: ${wp.pack_quality}%`);
      console.log(`  On-time ship: ${wp.on_time_ship ? 'Yes' : 'No'}`);
      console.log(`  Damage rate: ${wp.damage_rate}%`);
    }
    
    if (p.analytics_data.delivery_metrics) {
      const dm = p.analytics_data.delivery_metrics;
      console.log(`Delivery metrics:`);
      console.log(`  First attempt success: ${dm.first_attempt_success ? 'Yes' : 'No'}`);
      console.log(`  Delivery attempts: ${dm.delivery_attempts}`);
      console.log(`  Customer rating: ${dm.customer_rating}/5`);
      if (dm.delivery_feedback) {
        console.log(`  Feedback: ${dm.delivery_feedback}`);
      }
    }
  }
  
  // Financial data
  if (p.financial_data) {
    const fd = p.financial_data;
    console.log('\n💰 Financial Summary:');
    console.log(`Product price: ${fd.product_price} ${fd.currency}`);
    console.log(`Commission: ${fd.commission} ${fd.currency}`);
    console.log(`Fulfillment fee: ${fd.fulfillment_fee} ${fd.currency}`);
    console.log(`Storage fee: ${fd.storage_fee} ${fd.currency}`);
    
    if (fd.additional_fees?.length) {
      console.log('Additional fees:');
      fd.additional_fees.forEach(fee => {
        console.log(`  ${fee.type}: ${fee.amount} ${fd.currency} - ${fee.description}`);
      });
    }
    
    console.log(`Total fees: ${fd.total_fees} ${fd.currency}`);
    console.log(`Payout amount: ${fd.payout_amount} ${fd.currency}`);
    console.log(`Payment status: ${fd.payment_status}`);
    
    if (fd.payout_date) {
      console.log(`Payout date: ${fd.payout_date}`);
    }
  }
}
```

### getPostingsList()
Gets filtered list of FBO postings with comprehensive search and analytics options.

```typescript
interface FboPostingListRequest {
  since: string;
  to: string;
  
  filter?: {
    status?: string[];
    warehouse_id?: number[];
    delivery_schema?: string[];
  };
  
  with?: {
    analytics_data?: boolean;
    financial_data?: boolean;
  };
  
  limit?: number;
  offset?: number;
}

// Usage Example - Compact due to space limits
const postings = await fboApi.getPostingsList({
  since: '2024-01-01T00:00:00Z',
  to: '2024-01-31T23:59:59Z',
  filter: {
    status: ['delivered', 'shipped'],
    warehouse_id: [123, 456]
  },
  with: { analytics_data: true },
  limit: 50
});

console.log(`Found ${postings.total} FBO postings`);
postings.postings?.forEach(posting => {
  console.log(`${posting.posting_number}: ${posting.status}`);
});
```

---

## ❌ Support Operations Methods

### getCancelReasons()
Gets list of available cancellation reasons for FBO postings.

```typescript
interface FboCancelReasonListResponse {
  cancel_reasons?: Array<{
    id?: number;
    name?: string;
    description?: string;
    category?: 'seller' | 'buyer' | 'system' | 'logistics';
    is_active?: boolean;
    requires_comment?: boolean;
  }>;
}

// Usage Example  
const reasons = await fboApi.getCancelReasons();

console.log('Available cancellation reasons:');
reasons.cancel_reasons?.forEach((reason, index) => {
  console.log(`${index + 1}. ${reason.name} (${reason.category})`);
  console.log(`   Description: ${reason.description}`);
  if (reason.requires_comment) {
    console.log('   ⚠️  Requires additional comment');
  }
});
```

---

## 💼 Business Workflows

### 1. Warehouse Selection Optimizer
```typescript
class WarehouseSelector {
  private readonly fboApi: FboApi;
  
  constructor(fboApi: FboApi) {
    this.fboApi = fboApi;
  }
  
  async selectOptimalWarehouse(requirements: {
    region?: string;
    maxCapacityUtilization?: number;
    minQualityScore?: number;
    requiredCapacity?: number;
  }) {
    const availability = await this.fboApi.getWarehouseAvailability({
      region: requirements.region
    });
    
    const suitable = availability.warehouses?.filter(warehouse => {
      if (!warehouse.is_accepting_supply) return false;
      
      if (requirements.maxCapacityUtilization && 
          warehouse.capacity_utilization! > requirements.maxCapacityUtilization) {
        return false;
      }
      
      if (requirements.minQualityScore && 
          warehouse.performance?.quality_score! < requirements.minQualityScore) {
        return false;
      }
      
      if (requirements.requiredCapacity &&
          warehouse.capacity_info?.available_pallets! < requirements.requiredCapacity) {
        return false;
      }
      
      return true;
    });
    
    // Score warehouses
    const scored = suitable?.map(warehouse => ({
      warehouse,
      score: this.calculateWarehouseScore(warehouse)
    })).sort((a, b) => b.score - a.score);
    
    return scored?.[0]?.warehouse;
  }
  
  private calculateWarehouseScore(warehouse: any): number {
    let score = 0;
    
    // Capacity score (0-25)
    score += Math.max(0, 25 - (warehouse.capacity_utilization * 0.25));
    
    // Performance score (0-40)
    if (warehouse.performance) {
      score += (warehouse.performance.on_time_rate / 100) * 15;
      score += (warehouse.performance.quality_score / 100) * 15;
      score += (warehouse.performance.customer_rating / 5) * 10;
    }
    
    // Status score (0-20)
    if (warehouse.current_status?.status === 'normal') score += 20;
    else if (warehouse.current_status?.status === 'busy') score += 10;
    
    // Availability score (0-15)
    if (warehouse.capacity_info?.available_pallets) {
      const availabilityRatio = warehouse.capacity_info.available_pallets / 
                               warehouse.capacity_info.max_pallets;
      score += availabilityRatio * 15;
    }
    
    return Math.min(100, score);
  }
}
```

---

## 📊 API Endpoints Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `getWarehouseAvailability` | `GET /v1/supplier/available_warehouses` | Get warehouse availability |
| `getPosting` | `POST /v2/posting/fbo/get` | Get FBO posting details |
| `getPostingsList` | `POST /v2/posting/fbo/list` | Get FBO postings list |
| `getCancelReasons` | `POST /v1/posting/fbo/cancel-reason/list` | Get cancellation reasons |

---

**[← Back to FBO API Main](./16-fbo.md)**