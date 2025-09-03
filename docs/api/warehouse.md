# Warehouse API

WarehouseAPI implementation

## Overview

The WarehouseApi class provides 2 methods for warehouseapi implementation.

## Core Features

- **Core Operations** - 2 methods for comprehensive functionality
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
const result = await client.warehouse.getDeliveryMethods(/* parameters */);
```

## Methods Reference

### `getDeliveryMethods()`

WarehouseAPI implementation Warehouse management operations ```typescript import { OzonSellerAPI } from 'bmad-ozon-seller-api'; const api = new OzonSellerAPI({ clientId: 'your-client-id', apiKey: 'your-api-key' }); // Get warehouses list const warehouses = await api.warehouse.getWarehousesList(); console.log('Available warehouses:', warehouses.warehouses?.length); // Get delivery methods for specific warehouse const deliveryMethods = await api.warehouse.getDeliveryMethods({ warehouse_id: 123, delivery_type: 'courier' }); console.log('Delivery methods:', deliveryMethods.delivery_methods?.length); ``` / import { HttpClient } from '../../core/http.js'; import type { RequestOptions } from '../../core/types.js'; // Request types import { WarehouseDeliveryMethodListRequest, WarehouseListRequest, } from '../../types/requests/warehouse'; // Response types import { WarehouseDeliveryMethodListResponse, WarehouseListResponse, } from '../../types/responses/warehouse'; /** WarehouseAPI class Handles warehouse management operations / export class WarehouseApi { constructor(private readonly httpClient: HttpClient) {} /** Получить список методов доставки склада Get warehouse delivery methods list ```typescript const methods = await api.warehouse.getDeliveryMethods({ warehouse_id: 123, delivery_type: 'courier' }); methods.delivery_methods?.forEach(method => { console.log(`${method.name}: ${method.cost} ${method.currency}`); console.log(`Delivery time: ${method.delivery_days} days`); }); ```

**Example:**
```typescript
const result = await client.getDeliveryMethods(/* parameters */);
console.log(result);
```

### `getWarehousesList()`

Получить список складов Get warehouses list ```typescript const warehouses = await api.warehouse.getWarehousesList(); console.log('Total warehouses:', warehouses.total); warehouses.warehouses?.forEach(warehouse => { console.log(`${warehouse.name} (${warehouse.type})`); console.log(`Address: ${warehouse.address}, ${warehouse.city}`); console.log(`Active: ${warehouse.is_active}`); if (warehouse.working_hours) { console.log('Working hours:'); warehouse.working_hours.forEach(hours => { if (hours.is_day_off) { console.log(`  ${hours.day}: Day off`); } else { console.log(`  ${hours.day}: ${hours.open_time} - ${hours.close_time}`); } }); } }); ```

**Example:**
```typescript
const result = await client.getWarehousesList(/* parameters */);
console.log(result);
```

## Type Definitions

The Warehouse API uses strongly typed TypeScript interfaces for all requests and responses. Import the necessary types from the SDK:

```typescript
import type {
  // Request types
  Warehouse*Request
} from '@ozon/seller-api';

import type {
  // Response types  
  Warehouse*Response
} from '@ozon/seller-api';
```

## Error Handling

```typescript
try {
  const result = await client.warehouse.getDeliveryMethods(/* parameters */);
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