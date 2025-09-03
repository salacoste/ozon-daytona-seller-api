# DeliveryRfbs API

DeliveryrFBS API implementation

## Overview

The DeliveryRfbsApi class provides 8 methods for deliveryrfbs api implementation.

## Core Features

- **Core Operations** - 8 methods for comprehensive functionality
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
const result = await client.delivery-rfbs.setCutoff(/* parameters */);
```

## Methods Reference

### `setCutoff()`

DeliveryrFBS API implementation Return FBS delivery operations ```typescript import { OzonSellerAPI } from 'bmad-ozon-seller-api'; const api = new OzonSellerAPI({ clientId: 'your-client-id', apiKey: 'your-api-key' }); // Set posting cutoff date await api.deliveryRfbs.setCutoff({ posting_number: 'FBS-123456789', cutoff_at: '2024-01-15T10:00:00Z' }); // Add tracking numbers await api.deliveryRfbs.setTrackingNumbers({ tracking_numbers: [ { posting_number: 'FBS-123456789', tracking_number: 'TRACK123456', delivery_service: 'CDEK' } ] }); // Change status to delivered await api.deliveryRfbs.setDelivered({ posting_number: 'FBS-123456789', delivered_at: '2024-01-20T15:30:00Z' }); ``` / import { HttpClient } from '../../core/http.js'; import type { RequestOptions } from '../../core/types.js'; // Request types import { DeliveryRfbsSetCutoffRequest, DeliveryRfbsTimeslotChangeRestrictionsRequest, DeliveryRfbsTimeslotSetRequest, DeliveryRfbsPostingDeliveredRequest, DeliveryRfbsPostingDeliveringRequest, DeliveryRfbsPostingLastMileRequest, DeliveryRfbsPostingSentBySellerRequest, DeliveryRfbsTrackingNumberSetRequest, } from '../../types/requests/delivery-rfbs'; // Response types import { DeliveryRfbsSetCutoffResponse, DeliveryRfbsTimeslotChangeRestrictionsResponse, DeliveryRfbsTimeslotSetResponse, DeliveryRfbsPostingDeliveredResponse, DeliveryRfbsPostingDeliveringResponse, DeliveryRfbsPostingLastMileResponse, DeliveryRfbsPostingSentBySellerResponse, DeliveryRfbsTrackingNumberSetResponse, } from '../../types/responses/delivery-rfbs'; /** DeliveryrFBS API class Handles return FBS delivery operations / export class DeliveryRfbsApi { constructor(private readonly httpClient: HttpClient) {} /** Уточнить дату отгрузки отправления Set posting shipment cutoff date ```typescript const result = await api.deliveryRfbs.setCutoff({ posting_number: 'FBS-123456789', cutoff_at: '2024-01-15T10:00:00Z' }); console.log('Cutoff set:', result.result); ```

**Example:**
```typescript
const result = await client.setCutoff(/* parameters */);
console.log(result);
```

### `getTimeslotChangeRestrictions()`

Получить доступные даты для переноса доставки Get available dates for delivery rescheduling ```typescript const restrictions = await api.deliveryRfbs.getTimeslotChangeRestrictions({ posting_number: 'FBS-123456789' }); console.log('Available dates:', restrictions.restrictions?.available_dates); console.log('Remaining reschedules:', restrictions.restrictions?.available_reschedules); ```

**Example:**
```typescript
const result = await client.getTimeslotChangeRestrictions(/* parameters */);
console.log(result);
```

### `setTimeslot()`

Перенести дату доставки Reschedule delivery date ```typescript const result = await api.deliveryRfbs.setTimeslot({ posting_number: 'FBS-123456789', timeslot_date: '2024-01-25' }); console.log('New delivery date:', result.new_timeslot_date); ```

**Example:**
```typescript
const result = await client.setTimeslot(/* parameters */);
console.log(result);
```

### `setDelivered()`

Изменить статус на "Доставлено" Change status to "Delivered" ```typescript const result = await api.deliveryRfbs.setDelivered({ posting_number: 'FBS-123456789', delivered_at: '2024-01-20T15:30:00Z' }); console.log('Status changed:', result.status); ```

**Example:**
```typescript
const result = await client.setDelivered(/* parameters */);
console.log(result);
```

### `setDelivering()`

Изменить статус на "Доставляется" Change status to "Delivering" ```typescript const result = await api.deliveryRfbs.setDelivering({ posting_number: 'FBS-123456789', delivering_at: '2024-01-18T09:00:00Z' }); console.log('Status changed to delivering:', result.status); ```

**Example:**
```typescript
const result = await client.setDelivering(/* parameters */);
console.log(result);
```

### `setLastMile()`

Изменить статус на "Последняя миля" Change status to "Last mile" ```typescript const result = await api.deliveryRfbs.setLastMile({ posting_number: 'FBS-123456789', last_mile_at: '2024-01-19T14:00:00Z' }); console.log('Last mile started:', result.status); ```

**Example:**
```typescript
const result = await client.setLastMile(/* parameters */);
console.log(result);
```

### `setSentBySeller()`

Изменить статус на "Отправлено продавцом" Change status to "Sent by seller" ```typescript const result = await api.deliveryRfbs.setSentBySeller({ posting_number: 'FBS-123456789', sent_by_seller_at: '2024-01-15T12:00:00Z' }); console.log('Sent by seller:', result.posting_number); ```

**Example:**
```typescript
const result = await client.setSentBySeller(/* parameters */);
console.log(result);
```

### `setTrackingNumbers()`

Добавить трек-номера к отправлениям Add tracking numbers to postings ```typescript const result = await api.deliveryRfbs.setTrackingNumbers({ tracking_numbers: [ { posting_number: 'FBS-123456789', tracking_number: 'TRACK123456', delivery_service: 'CDEK' }, { posting_number: 'FBS-987654321', tracking_number: 'TRACK789012', delivery_service: 'Russian Post' } ] }); result.results?.forEach(res => { console.log(`${res.posting_number}: ${res.result}`); }); ```

**Example:**
```typescript
const result = await client.setTrackingNumbers(/* parameters */);
console.log(result);
```

## Type Definitions

The DeliveryRfbs API uses strongly typed TypeScript interfaces for all requests and responses. Import the necessary types from the SDK:

```typescript
import type {
  // Request types
  Delivery-rfbs*Request
} from '@ozon/seller-api';

import type {
  // Response types  
  Delivery-rfbs*Response
} from '@ozon/seller-api';
```

## Error Handling

```typescript
try {
  const result = await client.delivery-rfbs.setCutoff(/* parameters */);
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