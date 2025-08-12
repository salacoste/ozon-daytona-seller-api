# FBO API Documentation

The FBO (Fulfillment by Ozon) API allows you to manage orders where Ozon handles fulfillment, including supply order management, timeslot booking, and pass creation for warehouse deliveries.

## Table of Contents

- [Basic Usage](#basic-usage)
- [Core Posting Operations](#core-posting-operations)
- [Supply Order Management](#supply-order-management)
- [Timeslot Operations](#timeslot-operations)
- [Pass Management](#pass-management)
- [Pagination](#pagination)
- [Error Handling](#error-handling)
- [Best Practices](#best-practices)

## Basic Usage

```typescript
import { OzonClient } from '@ozon/sdk';

const client = new OzonClient({
  clientId: process.env.OZON_CLIENT_ID!,
  apiKey: process.env.OZON_API_KEY!,
});

// Access FBO API through the client
const fboOrders = await client.fbo.list({
  filter: { since: '2024-01-01T00:00:00Z', to: '2024-01-31T23:59:59Z' },
  limit: 100
});
```

## Core Posting Operations

### Get FBO Orders List

Retrieve orders with flexible filtering options:

```typescript
const orders = await client.fbo.list({
  filter: {
    since: '2024-01-01T00:00:00Z',
    to: '2024-01-31T23:59:59Z',
    status: 'delivered' // Optional status filter
  },
  limit: 100,
  offset: 0
});

orders.result.forEach(order => {
  console.log(`Order ${order.posting_number}: ${order.status}`);
});
```

### Get Order Details

Retrieve detailed information about a specific FBO order:

```typescript
const orderDetails = await client.fbo.get({
  posting_number: 'FBO-123456',
  with: {
    analytics_data: true,
    barcodes: true,
    financial_data: false
  }
});

console.log('Order details:', orderDetails.result);
console.log('Delivery status:', orderDetails.result.status);
console.log('Products:', orderDetails.result.products);
```

### Get Cancellation Reasons

Retrieve available cancellation reasons for FBO orders:

```typescript
const reasons = await client.fbo.getCancelReasons();

console.log('Available cancellation reasons:');
reasons.result.forEach(reason => {
  console.log(`${reason.id}: ${reason.name}`);
});
```

## Supply Order Management

### Get Supply Order Status Counters

Get overview of supply orders by status:

```typescript
const counters = await client.fbo.getSupplyOrderStatusCounters();

console.log(`Awaiting supply: ${counters.result.awaiting_supply}`);
console.log(`In processing: ${counters.result.in_processing}`);
console.log(`Delivered: ${counters.result.delivered}`);
```

### Get Supply Order Bundle

Retrieve detailed composition of a supply order:

```typescript
const bundle = await client.fbo.getSupplyOrderBundle({
  supply_order_id: 123456
});

console.log(`Supply Order ${bundle.result.supply_order_id}:`);
bundle.result.products.forEach(product => {
  console.log(`  SKU ${product.sku}: ${product.quantity} units @ ${product.price}`);
});
```

### List Supply Orders

Get paginated list of supply orders with filtering:

```typescript
const supplyOrders = await client.fbo.getSupplyOrdersList({
  paging: { page: 1, size: 100 },
  filter: {
    status: 'awaiting_supply',
    warehouse_id: 22204339479000
  }
});

console.log(`Found ${supplyOrders.result.supply_orders.length} supply orders`);
supplyOrders.result.supply_orders.forEach(order => {
  console.log(`Supply Order ${order.supply_order_id}: ${order.status}`);
});
```

### Get Supply Order Details

Retrieve detailed information about a specific supply order:

```typescript
const supplyOrder = await client.fbo.getSupplyOrder({
  supply_order_id: 123456
});

console.log('Supply Order Details:');
console.log(`ID: ${supplyOrder.result.supply_order_id}`);
console.log(`Status: ${supplyOrder.result.status}`);
console.log(`Warehouse: ${supplyOrder.result.warehouse_id}`);
console.log(`Products: ${supplyOrder.result.products.length}`);
```

### Get Available Warehouses

Find available warehouses with capacity information:

```typescript
const warehouses = await client.fbo.getAvailableWarehouses();

console.log('Available warehouses:');
warehouses.result.warehouses.forEach(warehouse => {
  console.log(`${warehouse.name} (ID: ${warehouse.warehouse_id})`);
  console.log(`  Capacity: ${warehouse.capacity} units`);
});
```

## Timeslot Operations

### Get Available Timeslots

Retrieve available delivery timeslots for a supply order:

```typescript
const timeslots = await client.fbo.getSupplyOrderTimeslots({
  supply_order_id: 123456
});

console.log('Available timeslots:');
timeslots.result.timeslots.forEach(slot => {
  console.log(`${slot.date} ${slot.time_from} - ${slot.time_to} (ID: ${slot.timeslot_id})`);
});
```

### Book a Timeslot

Reserve a specific timeslot for supply order delivery:

```typescript
const bookingResult = await client.fbo.updateSupplyOrderTimeslot({
  supply_order_id: 123456,
  timeslot_id: 789
});

if (bookingResult.result.success) {
  console.log(`Successfully booked timeslot ${bookingResult.result.updated_timeslot_id}`);
} else {
  console.log('Failed to book timeslot');
}
```

### Check Timeslot Status

Monitor the status of your timeslot booking:

```typescript
const status = await client.fbo.getSupplyOrderTimeslotStatus({
  supply_order_id: 123456
});

console.log(`Supply Order ${status.result.supply_order_id}:`);
console.log(`Timeslot Status: ${status.result.timeslot_status}`);
console.log(`Timeslot ID: ${status.result.timeslot_id}`);
```

## Pass Management

### Create Driver Pass

Generate a warehouse entry pass for your driver and vehicle:

```typescript
const pass = await client.fbo.createSupplyOrderPass({
  supply_order_id: 123456,
  driver_name: 'John Doe',
  vehicle_number: 'ABC123',
  phone_number: '+7999123456'
});

console.log(`Pass created: ${pass.result.pass_id}`);
console.log(`Status: ${pass.result.status}`);
console.log('QR Code for entry:', pass.result.qr_code);
```

### Check Pass Status

Monitor the status of your warehouse entry pass:

```typescript
const passStatus = await client.fbo.getSupplyOrderPassStatus({
  supply_order_id: 123456
});

console.log(`Pass Status: ${passStatus.result.pass_status}`);
console.log(`Pass ID: ${passStatus.result.pass_id}`);
console.log(`Valid until: ${passStatus.result.valid_until}`);
```

## Pagination

The FBO API supports automatic pagination using async iterators:

### Iterate Through FBO Orders

```typescript
for await (const page of client.fbo.iterateOrders({
  filter: { since: '2024-01-01T00:00:00Z', to: '2024-01-31T23:59:59Z' },
  limit: 500
})) {
  console.log(`Page ${page.pageNumber}: ${page.value.data.result?.length} orders`);
  
  // Process each order
  page.value.data.result?.forEach(order => {
    console.log(`Processing FBO order: ${order.posting_number}`);
  });
}
```

### Iterate Through Supply Orders

```typescript
for await (const page of client.fbo.iterateSupplyOrders({
  paging: { size: 100 },
  filter: { status: 'awaiting_supply' }
})) {
  console.log(`Page ${page.pageNumber}: ${page.result.supply_orders?.length} supply orders`);
  
  page.result.supply_orders?.forEach(order => {
    console.log(`Supply Order ${order.supply_order_id}: ${order.status}`);
  });
}
```

### Custom Pagination Configuration

```typescript
// Configure pagination with custom limits and delays
for await (const page of client.fbo.iterateOrders(
  { filter: { since: '2024-01-01T00:00:00Z' }, limit: 100 },
  { 
    maxPages: 20, 
    delayBetweenPages: 500 // 500ms delay between requests
  }
)) {
  // Process pages with rate limiting
  console.log(`Processing page ${page.pageNumber}`);
}
```

## Error Handling

Handle various types of errors that can occur with FBO operations:

```typescript
import { OzonApiError, RateLimitError, ValidationError } from '@ozon/sdk';

try {
  const supplyOrder = await client.fbo.getSupplyOrder({
    supply_order_id: -1 // Invalid ID
  });
} catch (error) {
  if (error instanceof ValidationError) {
    console.error('Validation error:', error.message);
    console.error('Invalid fields:', error.details);
  } else if (error instanceof RateLimitError) {
    console.error('Rate limited. Retry after:', error.retryAfter, 'seconds');
  } else if (error instanceof OzonApiError) {
    console.error(`API Error ${error.code}: ${error.message}`);
    
    // Handle specific FBO error codes
    switch (error.code) {
      case 3:
        console.error('Invalid supply_order_id or parameters');
        break;
      case 16:
        console.error('Authentication failed - check your API credentials');
        break;
      case 404:
        console.error('Supply order not found');
        break;
      default:
        console.error('Unknown FBO API error');
    }
  } else {
    console.error('Unexpected error:', error);
  }
}
```

## Best Practices

### 1. Efficient Supply Order Management

Use status counters to get overview before detailed queries:

```typescript
// Good: Check counters first
const counters = await client.fbo.getSupplyOrderStatusCounters();

if (counters.result.awaiting_supply > 0) {
  // Only fetch details if there are orders to process
  const awaitingOrders = await client.fbo.getSupplyOrdersList({
    paging: { page: 1, size: 100 },
    filter: { status: 'awaiting_supply' }
  });
  
  // Process orders...
}
```

### 2. Timeslot Management Workflow

Follow the proper sequence for timeslot booking:

```typescript
async function bookDeliveryTimeslot(supplyOrderId: number, preferredDate: string) {
  try {
    // 1. Get available timeslots
    const timeslots = await client.fbo.getSupplyOrderTimeslots({
      supply_order_id: supplyOrderId
    });
    
    // 2. Find preferred timeslot
    const preferredSlot = timeslots.result.timeslots.find(
      slot => slot.date === preferredDate && slot.time_from === '09:00'
    );
    
    if (!preferredSlot) {
      console.log('Preferred timeslot not available');
      return;
    }
    
    // 3. Book the timeslot
    const booking = await client.fbo.updateSupplyOrderTimeslot({
      supply_order_id: supplyOrderId,
      timeslot_id: preferredSlot.timeslot_id
    });
    
    // 4. Verify booking
    if (booking.result.success) {
      const status = await client.fbo.getSupplyOrderTimeslotStatus({
        supply_order_id: supplyOrderId
      });
      console.log(`Timeslot booked: ${status.result.timeslot_status}`);
    }
  } catch (error) {
    console.error('Failed to book timeslot:', error);
  }
}
```

### 3. Complete Pass Creation Workflow

Create and validate warehouse entry passes:

```typescript
async function createWarehousePass(supplyOrderId: number, driverInfo: {
  name: string;
  vehicle: string;
  phone: string;
}) {
  try {
    // 1. Create the pass
    const pass = await client.fbo.createSupplyOrderPass({
      supply_order_id: supplyOrderId,
      driver_name: driverInfo.name,
      vehicle_number: driverInfo.vehicle,
      phone_number: driverInfo.phone
    });
    
    console.log(`Pass created: ${pass.result.pass_id}`);
    console.log(`QR Code: ${pass.result.qr_code}`);
    
    // 2. Monitor pass status
    const checkStatus = async () => {
      const status = await client.fbo.getSupplyOrderPassStatus({
        supply_order_id: supplyOrderId
      });
      
      console.log(`Pass status: ${status.result.pass_status}`);
      return status.result.pass_status === 'active';
    };
    
    // Wait for pass to become active
    let attempts = 0;
    while (attempts < 5) {
      if (await checkStatus()) {
        console.log('Pass is now active');
        break;
      }
      await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
      attempts++;
    }
    
  } catch (error) {
    console.error('Failed to create warehouse pass:', error);
  }
}
```

### 4. Pagination for Large Datasets

Use iterators with proper error handling for large operations:

```typescript
async function processAllSupplyOrders() {
  let totalProcessed = 0;
  let errors = 0;
  
  try {
    for await (const page of client.fbo.iterateSupplyOrders({
      paging: { size: 100 }
    })) {
      try {
        // Process each supply order in the page
        for (const order of page.result.supply_orders || []) {
          await processSupplyOrder(order);
          totalProcessed++;
        }
        
        console.log(`Processed page ${page.pageNumber}, total: ${totalProcessed}`);
        
      } catch (pageError) {
        console.error(`Error processing page ${page.pageNumber}:`, pageError);
        errors++;
      }
    }
  } catch (error) {
    console.error('Fatal error in pagination:', error);
  }
  
  console.log(`Processing complete. Processed: ${totalProcessed}, Errors: ${errors}`);
}

async function processSupplyOrder(order: any) {
  // Your supply order processing logic here
  console.log(`Processing supply order ${order.supply_order_id}`);
}
```

### 5. Proper Resource Management

Clean up resources and handle rate limits properly:

```typescript
class FBOManager {
  private client: OzonClient;
  private requestQueue: Promise<any>[] = [];
  
  constructor(client: OzonClient) {
    this.client = client;
  }
  
  async getAllSupplyOrderDetails(supplyOrderIds: number[]) {
    const results = [];
    
    // Process in batches to avoid rate limits
    const batchSize = 10;
    for (let i = 0; i < supplyOrderIds.length; i += batchSize) {
      const batch = supplyOrderIds.slice(i, i + batchSize);
      
      const batchPromises = batch.map(async (id) => {
        try {
          return await this.client.fbo.getSupplyOrder({ supply_order_id: id });
        } catch (error) {
          console.error(`Failed to get supply order ${id}:`, error);
          return null;
        }
      });
      
      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults.filter(result => result !== null));
      
      // Small delay between batches
      if (i + batchSize < supplyOrderIds.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    return results;
  }
}
```