# FBO API Reference (Complete)

This document provides a comprehensive overview of the FBO (Fulfillment by Ozon) API client implementation covering all 13 endpoints across Parts 1, 2, and 3.

## Overview

The FBO API client (`client.fbo`) handles Fulfillment by Ozon operations, including:
- Order listing and management
- Order details retrieval  
- Cancel reason management
- Supply order status and composition
- Timeslot management and scheduling
- Driver pass creation and status tracking
- Advanced supply order listing and details
- Supplier warehouse availability management

## API Method Overview - Part 1 (Endpoints 1-5)

### Core Posting Operations (1-3)

| SDK Method | HTTP Endpoint | Description |
|------------|---------------|-------------|
| `getPostingListV2()` | `POST /v2/posting/fbo/list` | List FBO orders with filtering and pagination |
| `getPostingV2()` | `POST /v2/posting/fbo/get` | Get detailed order information by posting number |
| `getPostingCancelReasonListV1()` | `POST /v1/posting/fbo/cancel-reason/list` | Get available cancel reasons for FBO orders |

### Supply Order Operations (4-5)

| SDK Method | HTTP Endpoint | Description |
|------------|---------------|-------------|
| `getSupplyOrderStatusCounterV1()` | `POST /v1/supply-order/status/counter` | Get supply order status counters |
| `getSupplyOrderBundleV1()` | `POST /v1/supply-order/bundle` | Get supply order bundle composition |

## API Method Overview - Part 2 (Endpoints 6-10)

### Timeslot Operations (6-8)

| SDK Method | HTTP Endpoint | Description |
|------------|---------------|-------------|
| `getSupplyOrderTimeslotsV1()` | `POST /v1/supply-order/timeslot/get` | Get available timeslots for supply order |
| `updateSupplyOrderTimeslotV1()` | `POST /v1/supply-order/timeslot/update` | Update/assign timeslot for supply order |
| `getSupplyOrderTimeslotStatusV1()` | `POST /v1/supply-order/timeslot/status` | Check timeslot assignment status |

### Pass Operations (9-10)

| SDK Method | HTTP Endpoint | Description |
|------------|---------------|-------------|
| `supplyOrderPassCreateV1()` | `POST /v1/supply-order/pass/create` | Create driver pass with vehicle data |
| `getSupplyOrderPassStatusV1()` | `POST /v1/supply-order/pass/status` | Get driver pass status |

## API Method Overview - Part 3 (Endpoints 11-13)

### Advanced Supply Order Operations (11-13)

| SDK Method | HTTP Endpoint | Description |
|------------|---------------|-------------|
| `getSupplyOrdersListV2()` | `POST /v2/supply-order/list` | Get supply orders list with filtering and pagination |
| `getSupplyOrdersV2()` | `POST /v2/supply-order/get` | Get detailed supply order information by IDs |
| `getSupplierAvailableWarehousesV1()` | `GET /v1/supplier/available_warehouses` | Get available warehouses with load information |

## Usage Examples

### 1. Listing FBO Orders

```typescript
import { OzonClient } from '@ozon/sdk';

const client = new OzonClient({
  clientId: process.env.OZON_CLIENT_ID!,
  apiKey: process.env.OZON_API_KEY!
});

// Get FBO orders for date range
const orders = await client.fbo.getPostingListV2({
  filter: {
    since: '2024-01-01T00:00:00.000Z',
    to: '2024-01-31T23:59:59.999Z'
  },
  limit: 100,
  offset: 0,
  with: {
    analytics_data: true,
    financial_data: true
  }
});

console.log(`Found ${orders.data.result?.length} orders`);
```

### 2. Pagination with Iterator

```typescript
// Iterate through all orders with automatic pagination
for await (const page of client.fbo.iteratePostingListV2({
  filter: {
    since: '2024-01-01T00:00:00.000Z',
    to: '2024-01-31T23:59:59.999Z'
  },
  limit: 1000
})) {
  console.log(`Page ${page.pageNumber}: ${page.value.data.result?.length} orders`);
  // Process orders in page.value.data.result
}
```

### 3. Get Order Details

```typescript
// Get detailed information about specific order
const orderDetails = await client.fbo.getPostingV2({
  posting_number: 'POST-123456789',
  with: {
    analytics_data: true,
    financial_data: true,
    legal_info: true
  }
});

console.log('Order details:', orderDetails.data.result);
```

### 4. Get Cancel Reasons

```typescript
// Get all available cancel reasons
const cancelReasons = await client.fbo.getPostingCancelReasonListV1();

cancelReasons.data.result?.forEach(reason => {
  console.log(`Reason ${reason.id}: ${reason.title} (Available: ${reason.is_available_for_cancellation})`);
});
```

### 5. Supply Order Status Counters

```typescript
// Get status counters for supply orders
const counters = await client.fbo.getSupplyOrderStatusCounterV1();

counters.data.items?.forEach(item => {
  console.log(`Status ${item.order_state}: ${item.count} orders`);
});
```

### 6. Supply Order Bundle with Pagination

```typescript
// Get supply order bundle composition
const bundle = await client.fbo.getSupplyOrderBundleV1({
  bundle_ids: ['bundle-123'],
  limit: 100,
  sort_field: 'NAME',
  is_asc: true
});

console.log(`Bundle contains ${bundle.data.items?.length} items`);

// Use iterator for large bundles
for await (const page of client.fbo.iterateSupplyOrderBundleV1({
  bundle_ids: ['bundle-123', 'bundle-456'],
  limit: 250
})) {
  console.log(`Page ${page.pageNumber}: ${page.value.data.items?.length} items`);
  // Process items in page.value.data.items
}
```

### 7. Timeslot Management

```typescript
// Get available timeslots for supply order
const timeslots = await client.fbo.getSupplyOrderTimeslotsV1({
  supply_order_id: 123456
});

console.log(`Available timeslots in ${timeslots.data.timezone}:`);
timeslots.data.timeslots?.forEach(slot => {
  console.log(`Timeslot ${slot.timeslot_id}: ${slot.date_from} - ${slot.date_to}`);
});

// Update/assign a timeslot
const updateResult = await client.fbo.updateSupplyOrderTimeslotV1({
  supply_order_id: 123456,
  timeslot_id: 789
});

console.log('Timeslot update result:', updateResult.data);

// Check timeslot status
const status = await client.fbo.getSupplyOrderTimeslotStatusV1({
  supply_order_id: 123456
});

console.log('Current timeslot status:', status.data);
```

### 8. Driver Pass Management

```typescript
// Create driver pass with vehicle information
const passResult = await client.fbo.supplyOrderPassCreateV1({
  supply_order_id: 123456,
  driver_name: 'John Doe',
  driver_phone: '+7-900-123-4567',
  vehicle_model: 'Ford Transit',
  vehicle_number: 'A123BC777',
  vehicle_type: 'truck'
});

console.log('Pass created:', passResult.data);

// Check pass status
const passStatus = await client.fbo.getSupplyOrderPassStatusV1({
  supply_order_id: 123456
});

console.log('Pass status:', passStatus.data.status);
console.log('Pass details:', passStatus.data.pass_data);
```

### 9. Advanced Supply Order Management

```typescript
// Get supply orders list with filtering
const ordersList = await client.fbo.getSupplyOrdersListV2({
  paging: {
    limit: 100,
    from_supply_order_id: 123456
  },
  filter: {
    states: ['ORDER_STATE_READY_TO_SUPPLY', 'ORDER_STATE_IN_TRANSIT']
  }
});

console.log(`Found ${ordersList.data.supply_order_id?.length} supply orders`);

// Iterate through all supply orders
for await (const page of client.fbo.iterateSupplyOrdersListV2({
  paging: { limit: 100 },
  filter: { states: ['ORDER_STATE_READY_TO_SUPPLY'] }
})) {
  console.log(`Page ${page.pageNumber}: ${page.value.data.supply_order_id?.length} orders`);
  // Process orders in page.value.data.supply_order_id
}

// Get detailed information about specific supply orders
const orderDetails = await client.fbo.getSupplyOrdersV2({
  order_ids: ['123456', '789012']
});

console.log(`Order details:`);
orderDetails.data.orders?.forEach(order => {
  console.log(`Order ${order.order_id}: ${order.order_state} - ${order.order_supply?.supply_name}`);
});

console.log(`Warehouses info:`);
orderDetails.data.warehouses?.forEach(warehouse => {
  console.log(`Warehouse ${warehouse.id}: ${warehouse.name} (${warehouse.address})`);
});
```

### 10. Warehouse Availability

```typescript
// Get available warehouses with load information
const warehouses = await client.fbo.getSupplierAvailableWarehousesV1();

console.log('Available warehouses:');
warehouses.data.warehouses?.forEach(warehouse => {
  console.log(`${warehouse.name}: Free capacity ${warehouse.free_capacity_l} liters`);
  console.log(`  Address: ${warehouse.address}`);
  console.log(`  Working hours: ${warehouse.working_hours}`);
});
```

## Pagination Patterns

### 1. Offset-based Pagination (Orders)
Used by: `getPostingListV2()`

```typescript
let offset = 0;
const limit = 1000;
let hasMore = true;

while (hasMore) {
  const response = await client.fbo.getPostingListV2({
    filter: { since: '2024-01-01', to: '2024-01-31' },
    limit,
    offset
  });
  
  // Process response.data.result
  hasMore = response.data.result?.length === limit;
  offset += limit;
}
```

### 2. last_id Pagination (Supply Order Bundle)
Used by: `getSupplyOrderBundleV1()`

```typescript
let lastId: string | undefined;
let hasMore = true;

while (hasMore) {
  const response = await client.fbo.getSupplyOrderBundleV1({
    bundle_ids: ['bundle-123'],
    limit: 100,
    ...(lastId ? { last_id: lastId } : {})
  });
  
  // Process response.data.items
  hasMore = response.data.has_next || false;
  lastId = response.data.last_id;
}
```

## Error Handling

All FBO methods follow the standard SDK error handling patterns:

```typescript
import { OzonApiError, RateLimitError } from '@ozon/sdk';

try {
  const orders = await client.fbo.getPostingListV2({
    filter: { since: '2024-01-01', to: '2024-01-31' },
    limit: 100
  });
} catch (error) {
  if (error instanceof OzonApiError) {
    console.error(`API Error ${error.code}: ${error.message}`);
    console.error('Details:', error.details);
  } else if (error instanceof RateLimitError) {
    console.error('Rate limited, retry after:', error.retryAfter);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

## Request Validation

The SDK includes built-in validation for required parameters:

- `getPostingListV2()`: Requires `filter.since`, `filter.to`, `limit` (1-1000), `offset` ≤ 20000
- `getPostingV2()`: Requires non-empty `posting_number`
- `getSupplyOrderBundleV1()`: Requires `bundle_ids` array and `limit`

## Backward Compatibility

For backward compatibility, the following deprecated methods are still available:

### Part 1 Deprecated Methods
- `list()` → Use `getPostingListV2()` instead
- `get()` → Use `getPostingV2()` instead  
- `getCancelReasons()` → Use `getPostingCancelReasonListV1()` instead
- `getSupplyOrderStatusCounters()` → Use `getSupplyOrderStatusCounterV1()` instead
- `getSupplyOrderBundle()` → Use `getSupplyOrderBundleV1()` instead

### Part 2 Deprecated Methods
- `getSupplyOrderTimeslots()` → Use `getSupplyOrderTimeslotsV1()` instead
- `updateSupplyOrderTimeslot()` → Use `updateSupplyOrderTimeslotV1()` instead
- `getSupplyOrderTimeslotStatus()` → Use `getSupplyOrderTimeslotStatusV1()` instead
- `createSupplyOrderPass()` → Use `supplyOrderPassCreateV1()` instead
- `getSupplyOrderPassStatus()` → Use `getSupplyOrderPassStatusV1()` instead

### Part 3 Deprecated Methods
- `getSupplyOrdersList()` → Use `getSupplyOrdersListV2()` instead
- `getSupplyOrder()` → Use `getSupplyOrdersV2()` instead
- `getAvailableWarehouses()` → Use `getSupplierAvailableWarehousesV1()` instead
- `iterateSupplyOrders()` → Use `iterateSupplyOrdersListV2()` instead

## operationId Mapping

All methods are mapped to their corresponding Ozon API operationIds:

### Part 1 Methods
- `getPostingListV2` → `PostingAPI_GetFboPostingList`
- `getPostingV2` → `PostingAPI_GetFboPosting` 
- `getPostingCancelReasonListV1` → `PostingAPI_GetPostingFboCancelReasonList`
- `getSupplyOrderStatusCounterV1` → `SupplyOrderAPI_SupplyOrderStatusCounter`
- `getSupplyOrderBundleV1` → `SupplyOrderBundle`

### Part 2 Methods
- `getSupplyOrderTimeslotsV1` → `SupplyOrderAPI_GetSupplyOrderTimeslots`
- `updateSupplyOrderTimeslotV1` → `SupplyOrderAPI_UpdateSupplyOrderTimeslot`
- `getSupplyOrderTimeslotStatusV1` → `SupplyOrderAPI_GetSupplyOrderTimeslotStatus`
- `supplyOrderPassCreateV1` → `SupplyOrderAPI_SupplyOrderPassCreate`
- `getSupplyOrderPassStatusV1` → `SupplyOrderAPI_SupplyOrderPassStatus`

### Part 3 Methods
- `getSupplyOrdersListV2` → `SupplyOrderAPI_GetSupplyOrdersListV2`
- `getSupplyOrdersV2` → `SupplyOrderAPI_GetSupplyOrdersV2`
- `getSupplierAvailableWarehousesV1` → `SupplierAPI_SupplierAvailableWarehouses`

## Complete FBO Implementation

The FBO API client is now **fully implemented** covering all 13 endpoints across Parts 1, 2, and 3:

✅ **Part 1 (Endpoints 1-5)**: Core posting operations and basic supply order management  
✅ **Part 2 (Endpoints 6-10)**: Timeslot management and driver pass operations  
✅ **Part 3 (Endpoints 11-13)**: Advanced supply order operations and warehouse management  

This implementation provides complete FBO (Fulfillment by Ozon) functionality including:
- Complete order lifecycle management
- Supply order composition and status tracking
- Timeslot scheduling and coordination
- Driver pass and vehicle management
- Warehouse capacity and availability tracking

For complete operationId mapping, advanced usage patterns, and implementation details, refer to the method documentation in the source code.