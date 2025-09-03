# FBO Supply Order Management

**Supply Order Management** - Comprehensive supply order operations for FBO (Fulfillment by OZON) API.

## Overview

Supply Order Management handles the complete lifecycle of warehouse deliveries to OZON fulfillment centers. This includes order creation, tracking, bundle management, driver coordination, and status monitoring across 6 specialized methods.

---

## 📋 Methods Overview

### 📦 Order Information (2 methods)
1. **getSupplyOrdersList** - Get supply orders list with filtering
2. **getSupplyOrder** - Get detailed supply order information

### 📋 Order Composition (2 methods)
3. **getSupplyOrderBundle** - Get supply order bundle composition
4. **getSupplyOrderStatusCounter** - Get orders count by status

### 🚛 Driver & Vehicle (2 methods)
5. **createSupplyOrderPass** - Set driver and vehicle data
6. **getSupplyOrderPassStatus** - Get driver/vehicle data status

---

## 📦 Order Information Methods

### getSupplyOrdersList()
Gets filtered list of supply orders with comprehensive search capabilities.

```typescript
interface FboSupplyOrderListRequest {
  since?: string;        // Start date filter
  to?: string;          // End date filter
  filter?: {
    status?: string[];           // Order statuses
    warehouse_id?: number[];     // Warehouse IDs
    supply_order_id?: number[];  // Specific order IDs
  };
  limit?: number;       // Results limit (max 1000)
  offset?: number;      // Pagination offset
}

interface FboSupplyOrderListResponse {
  supply_orders?: Array<{
    supply_order_id?: number;
    status?: 'created' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
    warehouse_id?: number;
    warehouse_name?: string;
    created_at?: string;
    planned_delivery_date?: string;
    actual_delivery_date?: string;
    total_products?: number;
    total_quantity?: number;
    total_amount?: number;
  }>;
  total?: number;
  has_next?: boolean;
}

// Usage Example
const orders = await fboApi.getSupplyOrdersList({
  since: '2024-01-01T00:00:00Z',
  to: '2024-01-31T23:59:59Z',
  filter: {
    status: ['created', 'confirmed', 'shipped'],
    warehouse_id: [123, 456]
  },
  limit: 50
});

console.log(`Found ${orders.total} supply orders`);
orders.supply_orders?.forEach(order => {
  console.log(`Order ${order.supply_order_id}:`);
  console.log(`  Status: ${order.status}`);
  console.log(`  Warehouse: ${order.warehouse_name}`);
  console.log(`  Products: ${order.total_products}`);
  console.log(`  Amount: ${order.total_amount}`);
  
  if (order.status === 'delivered') {
    console.log(`  Delivered: ${order.actual_delivery_date}`);
  } else {
    console.log(`  Planned delivery: ${order.planned_delivery_date}`);
  }
});
```

### getSupplyOrder()
Gets detailed information about specific supply order.

```typescript
interface FboSupplyOrderGetRequest {
  supply_order_id: number;
}

interface FboSupplyOrderGetResponse {
  supply_order?: {
    supply_order_id?: number;
    status?: string;
    warehouse_id?: number;
    warehouse_name?: string;
    warehouse_address?: string;
    created_at?: string;
    updated_at?: string;
    planned_delivery_date?: string;
    actual_delivery_date?: string;
    
    // Products information
    products?: Array<{
      product_id?: number;
      offer_id?: string;
      name?: string;
      quantity?: number;
      price?: number;
      dimensions?: {
        weight?: number;
        width?: number;
        height?: number;
        length?: number;
      };
    }>;
    
    // Summary data
    total_products?: number;
    total_quantity?: number;
    total_amount?: number;
    total_weight?: number;
    
    // Logistics
    timeslot_id?: string;
    driver_info?: {
      name?: string;
      phone?: string;
      vehicle_info?: string;
    };
    
    // Additional info
    notes?: string;
    tracking_number?: string;
  };
}

// Usage Example
const orderDetails = await fboApi.getSupplyOrder({
  supply_order_id: 123456
});

const order = orderDetails.supply_order;
if (order) {
  console.log(`Supply Order ${order.supply_order_id}`);
  console.log(`Status: ${order.status}`);
  console.log(`Warehouse: ${order.warehouse_name}`);
  console.log(`Address: ${order.warehouse_address}`);
  
  // Products breakdown
  console.log(`\nProducts (${order.total_products}):`);
  order.products?.forEach((product, index) => {
    console.log(`  ${index + 1}. ${product.name}`);
    console.log(`     Offer ID: ${product.offer_id}`);
    console.log(`     Quantity: ${product.quantity}`);
    console.log(`     Price: ${product.price}`);
    console.log(`     Weight: ${product.dimensions?.weight}g`);
  });
  
  // Logistics info
  if (order.driver_info) {
    console.log(`\nDriver: ${order.driver_info.name}`);
    console.log(`Phone: ${order.driver_info.phone}`);
    console.log(`Vehicle: ${order.driver_info.vehicle_info}`);
  }
  
  console.log(`\nTotal: ${order.total_quantity} items, ${order.total_amount} RUB`);
}
```

---

## 📋 Order Composition Methods

### getSupplyOrderBundle()
Gets detailed composition of supply order or draft with product breakdown.

```typescript
interface FboSupplyOrderBundleRequest {
  supply_order_id: number;  // Supply order or draft ID
}

interface FboSupplyOrderBundleResponse {
  supply_order_id?: number;
  status?: string;
  
  // Bundle composition
  products?: Array<{
    product_id?: number;
    offer_id?: string;
    name?: string;
    sku?: string;
    
    // Quantities
    requested_quantity?: number;
    confirmed_quantity?: number;
    delivered_quantity?: number;
    
    // Pricing
    unit_price?: number;
    total_price?: number;
    
    // Physical properties
    dimensions?: {
      weight?: number;
      width?: number;
      height?: number;
      length?: number;
    };
    
    // Status
    product_status?: 'pending' | 'confirmed' | 'delivered' | 'rejected';
    rejection_reason?: string;
  }>;
  
  // Summary
  total_products?: number;
  total_requested?: number;
  total_confirmed?: number;
  total_delivered?: number;
  total_amount?: number;
  
  // Bundle status
  bundle_status?: 'incomplete' | 'complete' | 'partially_delivered';
  completion_percentage?: number;
}

// Usage Example
const bundle = await fboApi.getSupplyOrderBundle({
  supply_order_id: 123456
});

console.log(`Supply Order Bundle ${bundle.supply_order_id}`);
console.log(`Status: ${bundle.bundle_status}`);
console.log(`Completion: ${bundle.completion_percentage}%`);

// Products analysis
console.log(`\nProducts Breakdown:`);
console.log(`Total products: ${bundle.total_products}`);
console.log(`Requested: ${bundle.total_requested}`);
console.log(`Confirmed: ${bundle.total_confirmed}`);
console.log(`Delivered: ${bundle.total_delivered}`);

// Detailed product information
bundle.products?.forEach((product, index) => {
  console.log(`\n${index + 1}. ${product.name} (${product.offer_id})`);
  console.log(`   Status: ${product.product_status}`);
  console.log(`   Requested: ${product.requested_quantity}`);
  console.log(`   Confirmed: ${product.confirmed_quantity}`);
  console.log(`   Delivered: ${product.delivered_quantity}`);
  console.log(`   Unit Price: ${product.unit_price} RUB`);
  console.log(`   Total: ${product.total_price} RUB`);
  
  if (product.product_status === 'rejected') {
    console.log(`   Rejection: ${product.rejection_reason}`);
  }
  
  if (product.dimensions) {
    const dims = product.dimensions;
    console.log(`   Dimensions: ${dims.length}x${dims.width}x${dims.height}mm, ${dims.weight}g`);
  }
});
```

### getSupplyOrderStatusCounter()
Gets count of supply orders grouped by status for dashboard analytics.

```typescript
interface FboSupplyOrderStatusCounterRequest {
  // Optional filters
  warehouse_id?: number[];
  date_from?: string;
  date_to?: string;
}

interface FboSupplyOrderStatusCounterResponse {
  counters?: Array<{
    status: string;
    count: number;
  }>;
  total?: number;
  
  // Additional metrics
  metrics?: {
    average_delivery_time?: number;  // in days
    on_time_delivery_rate?: number; // percentage
    total_amount?: number;           // total value
    active_warehouses?: number;
  };
}

// Usage Example
const counters = await fboApi.getSupplyOrderStatusCounter({
  warehouse_id: [123, 456],
  date_from: '2024-01-01T00:00:00Z',
  date_to: '2024-01-31T23:59:59Z'
});

console.log('Supply Orders Dashboard');
console.log('======================');
console.log(`Total Orders: ${counters.total}`);

// Status breakdown
counters.counters?.forEach(counter => {
  const percentage = ((counter.count / (counters.total || 1)) * 100).toFixed(1);
  console.log(`${counter.status}: ${counter.count} (${percentage}%)`);
});

// Performance metrics
if (counters.metrics) {
  console.log('\nPerformance Metrics:');
  console.log(`Average delivery time: ${counters.metrics.average_delivery_time} days`);
  console.log(`On-time delivery rate: ${counters.metrics.on_time_delivery_rate}%`);
  console.log(`Total order value: ${counters.metrics.total_amount} RUB`);
  console.log(`Active warehouses: ${counters.metrics.active_warehouses}`);
}

// Status analysis
const statusMap = new Map(counters.counters?.map(c => [c.status, c.count]));
const completed = statusMap.get('delivered') || 0;
const inProgress = (statusMap.get('created') || 0) + (statusMap.get('confirmed') || 0) + (statusMap.get('shipped') || 0);
const cancelled = statusMap.get('cancelled') || 0;

console.log('\nSummary Analysis:');
console.log(`✅ Completed: ${completed}`);
console.log(`🔄 In Progress: ${inProgress}`);
console.log(`❌ Cancelled: ${cancelled}`);
console.log(`📈 Success Rate: ${((completed / ((counters.total || 1) - cancelled)) * 100).toFixed(1)}%`);
```

---

## 🚛 Driver & Vehicle Methods

### createSupplyOrderPass()
Sets driver and vehicle information for supply order delivery.

```typescript
interface FboSupplyOrderPassCreateRequest {
  supply_order_id: number;
  
  driver: {
    name: string;         // Full name
    phone: string;        // Phone number with country code
    passport?: string;    // Passport series and number
    license?: string;     // Driver license number
  };
  
  vehicle: {
    model: string;        // Make and model
    license_plate: string; // License plate number
    color?: string;       // Vehicle color
    vin?: string;         // VIN number
    registration?: string; // Registration document
  };
  
  // Additional info
  notes?: string;
  planned_arrival?: string; // Planned arrival time
}

interface FboSupplyOrderPassCreateResponse {
  result?: 'success' | 'error';
  task_id?: string;      // Task ID for status tracking
  error_message?: string;
  
  // Validation results
  validation_status?: {
    driver_data_valid?: boolean;
    vehicle_data_valid?: boolean;
    document_verification_required?: boolean;
  };
}

// Usage Example
const passResult = await fboApi.createSupplyOrderPass({
  supply_order_id: 123456,
  
  driver: {
    name: 'Иванов Иван Иванович',
    phone: '+7 (999) 123-45-67',
    passport: '1234 567890',
    license: 'DL123456789'
  },
  
  vehicle: {
    model: 'ГАЗель NEXT',
    license_plate: 'А123БВ777',
    color: 'белый',
    vin: '1HGCM82633A123456'
  },
  
  notes: 'Delivery planned for morning hours',
  planned_arrival: '2024-01-15T09:00:00Z'
});

if (passResult.result === 'success') {
  console.log('✅ Driver and vehicle data submitted successfully');
  console.log(`Task ID: ${passResult.task_id}`);
  
  // Check validation status
  if (passResult.validation_status) {
    const validation = passResult.validation_status;
    console.log(`Driver data valid: ${validation.driver_data_valid}`);
    console.log(`Vehicle data valid: ${validation.vehicle_data_valid}`);
    
    if (validation.document_verification_required) {
      console.log('⚠️  Document verification may be required');
    }
  }
} else {
  console.error('❌ Failed to submit driver data:', passResult.error_message);
}
```

### getSupplyOrderPassStatus()
Gets status of driver and vehicle data submission and verification.

```typescript
interface FboSupplyOrderPassStatusRequest {
  supply_order_id: number;
}

interface FboSupplyOrderPassStatusResponse {
  status?: 'pending' | 'approved' | 'rejected' | 'verification_required';
  
  // Current data
  driver_info?: {
    name?: string;
    phone?: string;
    verification_status?: 'pending' | 'verified' | 'rejected';
  };
  
  vehicle_info?: {
    model?: string;
    license_plate?: string;
    color?: string;
    verification_status?: 'pending' | 'verified' | 'rejected';
  };
  
  // Status details
  approved_at?: string;
  rejection_reason?: string;
  verification_notes?: string;
  
  // Next steps
  required_actions?: string[];
  warehouse_contact?: {
    phone?: string;
    working_hours?: string;
    special_instructions?: string;
  };
}

// Usage Example
const passStatus = await fboApi.getSupplyOrderPassStatus({
  supply_order_id: 123456
});

console.log(`Pass Status: ${passStatus.status}`);

// Driver information
if (passStatus.driver_info) {
  console.log(`\nDriver: ${passStatus.driver_info.name}`);
  console.log(`Phone: ${passStatus.driver_info.phone}`);
  console.log(`Verification: ${passStatus.driver_info.verification_status}`);
}

// Vehicle information
if (passStatus.vehicle_info) {
  console.log(`\nVehicle: ${passStatus.vehicle_info.model}`);
  console.log(`License plate: ${passStatus.vehicle_info.license_plate}`);
  console.log(`Color: ${passStatus.vehicle_info.color}`);
  console.log(`Verification: ${passStatus.vehicle_info.verification_status}`);
}

// Handle status-specific actions
switch (passStatus.status) {
  case 'approved':
    console.log(`✅ Pass approved at: ${passStatus.approved_at}`);
    if (passStatus.warehouse_contact) {
      console.log('\nWarehouse contact:');
      console.log(`Phone: ${passStatus.warehouse_contact.phone}`);
      console.log(`Hours: ${passStatus.warehouse_contact.working_hours}`);
      if (passStatus.warehouse_contact.special_instructions) {
        console.log(`Instructions: ${passStatus.warehouse_contact.special_instructions}`);
      }
    }
    break;
    
  case 'rejected':
    console.log(`❌ Pass rejected: ${passStatus.rejection_reason}`);
    if (passStatus.required_actions?.length) {
      console.log('\nRequired actions:');
      passStatus.required_actions.forEach((action, index) => {
        console.log(`${index + 1}. ${action}`);
      });
    }
    break;
    
  case 'verification_required':
    console.log('⚠️  Additional verification required');
    console.log(`Notes: ${passStatus.verification_notes}`);
    break;
    
  case 'pending':
    console.log('⏳ Pass data under review');
    break;
}
```

---

## 💼 Business Workflows

### 1. Complete Supply Order Workflow
```typescript
async function completeSupplyOrderWorkflow(supplyOrderId: number) {
  try {
    // Step 1: Get order details
    const orderDetails = await fboApi.getSupplyOrder({
      supply_order_id: supplyOrderId
    });
    
    if (!orderDetails.supply_order) {
      throw new Error('Supply order not found');
    }
    
    const order = orderDetails.supply_order;
    console.log(`Processing supply order ${order.supply_order_id}`);
    console.log(`Status: ${order.status}`);
    console.log(`Warehouse: ${order.warehouse_name}`);
    
    // Step 2: Get bundle composition
    const bundle = await fboApi.getSupplyOrderBundle({
      supply_order_id: supplyOrderId
    });
    
    console.log(`Bundle contains ${bundle.total_products} product types`);
    console.log(`Total quantity: ${bundle.total_confirmed}`);
    console.log(`Total amount: ${bundle.total_amount} RUB`);
    
    // Step 3: Set driver and vehicle data (if not set)
    if (order.status === 'confirmed' && !order.driver_info) {
      const passResult = await fboApi.createSupplyOrderPass({
        supply_order_id: supplyOrderId,
        driver: {
          name: 'Петров Петр Петрович',
          phone: '+7 (999) 987-65-43',
          passport: '9876 543210'
        },
        vehicle: {
          model: 'Mercedes Sprinter',
          license_plate: 'В456ГД999',
          color: 'синий'
        }
      });
      
      if (passResult.result === 'success') {
        console.log('✅ Driver data submitted');
        
        // Step 4: Monitor pass status
        let passApproved = false;
        let attempts = 0;
        const maxAttempts = 10;
        
        while (!passApproved && attempts < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, 30000)); // Wait 30 seconds
          
          const passStatus = await fboApi.getSupplyOrderPassStatus({
            supply_order_id: supplyOrderId
          });
          
          console.log(`Pass status check ${attempts + 1}: ${passStatus.status}`);
          
          if (passStatus.status === 'approved') {
            passApproved = true;
            console.log('✅ Pass approved, ready for delivery');
          } else if (passStatus.status === 'rejected') {
            console.error(`❌ Pass rejected: ${passStatus.rejection_reason}`);
            break;
          }
          
          attempts++;
        }
      }
    }
    
    // Step 5: Return comprehensive status
    return {
      orderId: supplyOrderId,
      status: order.status,
      warehouse: order.warehouse_name,
      totalProducts: bundle.total_products,
      totalAmount: bundle.total_amount,
      driverDataSet: !!order.driver_info,
      readyForDelivery: order.status === 'confirmed' && !!order.driver_info
    };
    
  } catch (error) {
    console.error('Supply order workflow failed:', error);
    throw error;
  }
}
```

### 2. Bulk Order Status Monitoring
```typescript
class SupplyOrderMonitor {
  private readonly fboApi: FboApi;
  private readonly checkInterval: number = 300000; // 5 minutes
  
  constructor(fboApi: FboApi) {
    this.fboApi = fboApi;
  }
  
  async monitorActiveOrders() {
    try {
      // Get status overview
      const counters = await this.fboApi.getSupplyOrderStatusCounter({
        date_from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // Last 7 days
      });
      
      console.log('📊 Supply Order Status Overview');
      counters.counters?.forEach(counter => {
        console.log(`${counter.status}: ${counter.count} orders`);
      });
      
      // Get active orders
      const activeOrders = await this.fboApi.getSupplyOrdersList({
        filter: {
          status: ['created', 'confirmed', 'shipped']
        },
        limit: 100
      });
      
      console.log(`\n🔄 Monitoring ${activeOrders.supply_orders?.length} active orders`);
      
      // Process each active order
      const results = await Promise.allSettled(
        activeOrders.supply_orders?.map(order => this.processOrder(order)) || []
      );
      
      // Summary
      const successful = results.filter(r => r.status === 'fulfilled').length;
      const failed = results.filter(r => r.status === 'rejected').length;
      
      console.log(`\n✅ Processed: ${successful} successful, ${failed} failed`);
      
      return {
        total: activeOrders.supply_orders?.length || 0,
        successful,
        failed,
        statusCounts: counters.counters
      };
      
    } catch (error) {
      console.error('Monitoring failed:', error);
      throw error;
    }
  }
  
  private async processOrder(order: any) {
    console.log(`Processing order ${order.supply_order_id}...`);
    
    // Get detailed information
    const details = await this.fboApi.getSupplyOrder({
      supply_order_id: order.supply_order_id
    });
    
    // Check if driver data needed
    if (order.status === 'confirmed' && !details.supply_order?.driver_info) {
      console.log(`⚠️  Order ${order.supply_order_id} needs driver data`);
      return { orderId: order.supply_order_id, action: 'needs_driver_data' };
    }
    
    // Check pass status if driver data exists
    if (details.supply_order?.driver_info) {
      const passStatus = await this.fboApi.getSupplyOrderPassStatus({
        supply_order_id: order.supply_order_id
      });
      
      if (passStatus.status === 'rejected') {
        console.log(`❌ Order ${order.supply_order_id} pass rejected`);
        return { orderId: order.supply_order_id, action: 'pass_rejected', reason: passStatus.rejection_reason };
      }
    }
    
    console.log(`✅ Order ${order.supply_order_id} status: ${order.status}`);
    return { orderId: order.supply_order_id, status: order.status };
  }
  
  startMonitoring() {
    console.log('🚀 Starting supply order monitoring...');
    
    // Initial check
    this.monitorActiveOrders().catch(console.error);
    
    // Set up interval
    const intervalId = setInterval(() => {
      this.monitorActiveOrders().catch(console.error);
    }, this.checkInterval);
    
    return intervalId;
  }
}

// Usage
const monitor = new SupplyOrderMonitor(fboApi);
const intervalId = monitor.startMonitoring();

// Stop monitoring after 1 hour
setTimeout(() => {
  clearInterval(intervalId);
  console.log('Monitoring stopped');
}, 60 * 60 * 1000);
```

---

## 🎯 Best Practices

### Error Handling
```typescript
async function resilientSupplyOrderOperation(supplyOrderId: number) {
  const maxRetries = 3;
  let attempt = 1;
  
  while (attempt <= maxRetries) {
    try {
      const result = await fboApi.getSupplyOrder({
        supply_order_id: supplyOrderId
      });
      
      if (!result.supply_order) {
        throw new Error('Supply order not found');
      }
      
      return result.supply_order;
      
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error.message);
      
      if (attempt === maxRetries) {
        throw new Error(`Failed after ${maxRetries} attempts: ${error.message}`);
      }
      
      // Exponential backoff
      const delay = Math.pow(2, attempt) * 1000;
      console.log(`Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      
      attempt++;
    }
  }
}
```

---

## 📊 API Endpoints Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `getSupplyOrdersList` | `POST /v2/supply-order/list` | Get filtered supply orders list |
| `getSupplyOrder` | `POST /v2/supply-order/get` | Get detailed supply order info |
| `getSupplyOrderBundle` | `POST /v1/supply-order/bundle` | Get order bundle composition |
| `getSupplyOrderStatusCounter` | `POST /v1/supply-order/status/counter` | Get status counters |
| `createSupplyOrderPass` | `POST /v1/supply-order/pass/create` | Set driver/vehicle data |
| `getSupplyOrderPassStatus` | `POST /v1/supply-order/pass/status` | Get pass status |

---

**[← Back to FBO API Main](./16-fbo.md)**