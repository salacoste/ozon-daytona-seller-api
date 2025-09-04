# Fbo API

FBO API implementation

## Overview

The FboApi class provides 13 methods for fbo api implementation.

## Core Features

- **Core Operations** - 13 methods for comprehensive functionality
- **Type Safety** - Full TypeScript support with typed interfaces
- **Error Handling** - Robust error handling and validation
- **Documentation** - Detailed method documentation and examples

## Quick Start

```typescript
import { OzonSellerApiClient, createApiKey, createClientId } from '@ozon/seller-api';

const client = new OzonSellerApiClient({
  apiKey: createApiKey('your-api-key'),
  clientId: createClientId('your-client-id')
});

// Example usage
const result = await client.fbo.getCancelReasons(/* parameters */);
```

## Methods Reference

### `getCancelReasons()`

FBO API implementation Fulfillment by OZON operations ```typescript import { OzonSellerAPI } from 'bmad-ozon-seller-api'; const api = new OzonSellerAPI({ clientId: 'your-client-id', apiKey: 'your-api-key' }); // Get warehouse availability const warehouses = await api.fbo.getWarehouseAvailability(); console.log('Available warehouses:', warehouses.warehouses); // Get posting information const posting = await api.fbo.getPosting({ posting_number: 'FBO-123456789', with: { analytics_data: true, financial_data: true } }); // Get supply orders list const orders = await api.fbo.getSupplyOrdersList({ since: '2024-01-01T00:00:00Z', to: '2024-01-31T23:59:59Z', filter: { status: ['created', 'confirmed'] } }); ``` / import { HttpClient } from "../../core/http.js"; import type { RequestOptions } from "../../core/types.js"; // Request types import { FboCancelReasonListRequest, FboWarehouseAvailabilityRequest, FboSupplyOrderBundleRequest, FboSupplyOrderPassCreateRequest, FboSupplyOrderPassStatusRequest, FboSupplyOrderStatusCounterRequest, FboSupplyOrderTimeslotGetRequest, FboSupplyOrderTimeslotStatusRequest, FboSupplyOrderTimeslotUpdateRequest, FboPostingGetRequest, FboPostingListRequest, FboSupplyOrderGetRequest, FboSupplyOrderListRequest, } from "../../types/requests/fbo"; // Response types import { FboCancelReasonListResponse, FboWarehouseAvailabilityResponse, FboSupplyOrderBundleResponse, FboSupplyOrderPassCreateResponse, FboSupplyOrderPassStatusResponse, FboSupplyOrderStatusCounterResponse, FboSupplyOrderTimeslotGetResponse, FboSupplyOrderTimeslotStatusResponse, FboSupplyOrderTimeslotUpdateResponse, FboPostingGetResponse, FboPostingListResponse, FboSupplyOrderGetResponse, FboSupplyOrderListResponse, } from "../../types/responses/fbo"; /** FBO API class Handles Fulfillment by OZON operations / export class FboApi { constructor(private readonly httpClient: HttpClient) {} /** Получить список причин отмены отправлений FBO Get FBO posting cancel reasons list ```typescript const reasons = await api.fbo.getCancelReasons(); console.log('Available cancel reasons:', reasons.cancel_reasons); ```

**Example:**
```typescript
const result = await client.getCancelReasons(/* parameters */);
console.log(result);
```

### `getWarehouseAvailability()`

Получить информацию о загруженности складов Ozon Get Ozon warehouse availability information ```typescript const availability = await api.fbo.getWarehouseAvailability(); availability.warehouses?.forEach(warehouse => { console.log(`${warehouse.name}: ${warehouse.capacity_utilization}% utilized`); }); ```

**Example:**
```typescript
const result = await client.getWarehouseAvailability(/* parameters */);
console.log(result);
```

### `getSupplyOrderBundle()`

Получить состав поставки или заявки на поставку Get supply order bundle composition ```typescript const bundle = await api.fbo.getSupplyOrderBundle({ supply_order_id: 123456 }); console.log('Products in order:', bundle.products?.length); console.log('Total amount:', bundle.total_amount); ```

**Example:**
```typescript
const result = await client.getSupplyOrderBundle(/* parameters */);
console.log(result);
```

### `createSupplyOrderPass()`

Указать данные о водителе и автомобиле Set driver and vehicle data ```typescript const result = await api.fbo.createSupplyOrderPass({ supply_order_id: 123456, driver: { name: 'Иванов Иван Иванович', phone: '+7 (999) 123-45-67', passport: '1234 567890' }, vehicle: { model: 'ГАЗель NEXT', license_plate: 'А123БВ777', color: 'белый' } }); console.log('Task ID:', result.task_id); ```

**Example:**
```typescript
const result = await client.createSupplyOrderPass(/* parameters */);
console.log(result);
```

### `getSupplyOrderPassStatus()`

Получить статус ввода данных о водителе и автомобиле Get driver and vehicle data status ```typescript const status = await api.fbo.getSupplyOrderPassStatus({ supply_order_id: 123456 }); console.log('Pass status:', status.status); if (status.status === 'rejected') { console.log('Rejection reason:', status.rejection_reason); } ```

**Example:**
```typescript
const result = await client.getSupplyOrderPassStatus(/* parameters */);
console.log(result);
```

### `getSupplyOrderStatusCounter()`

Получить количество заявок по статусам Get supply orders count by statuses ```typescript const counters = await api.fbo.getSupplyOrderStatusCounter(); counters.counters?.forEach(counter => { console.log(`Status ${counter.status}: ${counter.count} orders`); }); console.log('Total orders:', counters.total); ```

**Example:**
```typescript
const result = await client.getSupplyOrderStatusCounter(/* parameters */);
console.log(result);
```

### `getSupplyOrderTimeslots()`

Получить интервалы поставки Get supply order timeslots ```typescript const timeslots = await api.fbo.getSupplyOrderTimeslots({ warehouse_id: 123, date_from: '2024-01-01T00:00:00Z', date_to: '2024-01-31T23:59:59Z' }); timeslots.timeslots?.forEach(slot => { console.log(`Timeslot ${slot.timeslot_id}: ${slot.start_time} - ${slot.end_time}`); console.log(`Available: ${slot.is_available}, Max pallets: ${slot.max_pallets}`); }); ```

**Example:**
```typescript
const result = await client.getSupplyOrderTimeslots(/* parameters */);
console.log(result);
```

### `getSupplyOrderTimeslotStatus()`

Получить статус интервала поставки Get supply order timeslot status ```typescript const status = await api.fbo.getSupplyOrderTimeslotStatus({ timeslot_id: 'timeslot_123' }); console.log('Booking status:', status.booking_status); console.log('Current occupancy:', status.timeslot?.current_occupancy); ```

**Example:**
```typescript
const result = await client.getSupplyOrderTimeslotStatus(/* parameters */);
console.log(result);
```

### `updateSupplyOrderTimeslot()`

Обновить интервал поставки Update supply order timeslot ```typescript const result = await api.fbo.updateSupplyOrderTimeslot({ supply_order_id: 123456, timeslot_id: 'new_timeslot_789' }); console.log('Update task ID:', result.task_id); ```

**Example:**
```typescript
const result = await client.updateSupplyOrderTimeslot(/* parameters */);
console.log(result);
```

### `getPosting()`

Получить информацию об отправлении FBO Get FBO posting information ```typescript const posting = await api.fbo.getPosting({ posting_number: 'FBO-123456789', with: { analytics_data: true, products: true, financial_data: true } }); console.log('Posting status:', posting.posting?.status); console.log('Products:', posting.posting?.products?.length); console.log('Payout amount:', posting.posting?.financial_data?.payout_amount); ```

**Example:**
```typescript
const result = await client.getPosting(/* parameters */);
console.log(result);
```

### `getPostingsList()`

Получить список отправлений FBO Get FBO postings list ```typescript const postings = await api.fbo.getPostingsList({ since: '2024-01-01T00:00:00Z', to: '2024-01-31T23:59:59Z', filter: { status: ['shipped', 'delivered'], warehouse_id: [123, 456] }, with: { analytics_data: true }, limit: 100 }); console.log('Found postings:', postings.total); postings.postings?.forEach(posting => { console.log(`${posting.posting_number}: ${posting.status}`); }); ```

**Example:**
```typescript
const result = await client.getPostingsList(/* parameters */);
console.log(result);
```

### `getSupplyOrder()`

Получить информацию о заявке на поставку Get supply order information ```typescript const order = await api.fbo.getSupplyOrder({ supply_order_id: 123456 }); console.log('Order status:', order.supply_order?.status); console.log('Planned delivery:', order.supply_order?.planned_delivery_date); console.log('Total products:', order.supply_order?.total_products); ```

**Example:**
```typescript
const result = await client.getSupplyOrder(/* parameters */);
console.log(result);
```

### `getSupplyOrdersList()`

Получить список заявок на поставку Get supply orders list ```typescript const orders = await api.fbo.getSupplyOrdersList({ since: '2024-01-01T00:00:00Z', to: '2024-01-31T23:59:59Z', filter: { status: ['created', 'confirmed', 'shipped'], warehouse_id: [123] }, limit: 50 }); console.log('Found orders:', orders.total); orders.supply_orders?.forEach(order => { console.log(`Order ${order.supply_order_id}: ${order.status}`); }); ```

**Example:**
```typescript
const result = await client.getSupplyOrdersList(/* parameters */);
console.log(result);
```

## Type Definitions

The Fbo API uses strongly typed TypeScript interfaces for all requests and responses. Import the necessary types from the SDK:

```typescript
import type {
  // Request types
  Fbo*Request
} from '@ozon/seller-api';

import type {
  // Response types  
  Fbo*Response
} from '@ozon/seller-api';
```

## Error Handling

```typescript
try {
  const result = await client.fbo.getCancelReasons(/* parameters */);
} catch (error) {
  if (error.code === 'INVALID_ARGUMENT') {
    console.error('Invalid request parameters');
  } else if (error.code === 'PERMISSION_DENIED') {
    console.error('Insufficient permissions');
  } else {
    console.error('Operation failed:', error.message);
  }
}
```

## Best Practices

1. **Type Safety** - Use TypeScript interfaces for all requests and responses
2. **Error Handling** - Implement comprehensive error handling for all operations
3. **Rate Limiting** - Respect API rate limits and implement retry logic
4. **Validation** - Validate input parameters before making API calls
5. **Documentation** - Refer to method-specific documentation for detailed usage

## Related APIs

- **[Product](./product.md)** - Product operations
- **[Analytics](./analytics.md)** - Analytics operations
- **[Report](./report.md)** - Report operations

---

*This documentation is auto-generated from the TypeScript implementation. For the most up-to-date information, refer to the source code and TypeScript definitions.*