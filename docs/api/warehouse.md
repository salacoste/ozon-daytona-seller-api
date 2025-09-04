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

WarehouseAPI implementation Warehouse management operations 🏪 **Управление складами FBS и rFBS** 🏪 **FBS and rFBS warehouse management** ⚠️ **Для получения списка складов FBO используйте метод /v1/cluster/list** ⚠️ **For FBO warehouses list use /v1/cluster/list method** ```typescript import { OzonSellerAPI } from 'bmad-ozon-seller-api'; const api = new OzonSellerAPI({ clientId: 'your-client-id', apiKey: 'your-api-key' }); // Get warehouses list (FBS and rFBS only) const warehouses = await api.warehouse.getWarehousesList(); console.log('Available warehouses:', warehouses.result?.length); // Get delivery methods for specific warehouse const deliveryMethods = await api.warehouse.getDeliveryMethods({ limit: 10, filter: { warehouse_id: 123, status: 'ACTIVE' } }); console.log('Delivery methods:', deliveryMethods.result?.length); ``` / import { HttpClient } from "../../core/http.js"; import type { RequestOptions } from "../../core/types.js"; // Request types import { WarehouseDeliveryMethodListRequest, WarehouseListRequest } from "../../types/requests/warehouse"; // Response types import { WarehouseDeliveryMethodListResponse, WarehouseListResponse } from "../../types/responses/warehouse"; /** WarehouseAPI class Handles warehouse management operations / export class WarehouseApi { constructor(private readonly httpClient: HttpClient) {} /** Получить список методов доставки склада Get warehouse delivery methods list ```typescript const methods = await api.warehouse.getDeliveryMethods({ limit: 20, offset: 0, filter: { warehouse_id: 123, status: 'ACTIVE', provider_id: 456 } }); console.log(`Found ${methods.result?.length} methods`); if (methods.has_next) { console.log('More methods available, use offset for pagination'); } methods.result?.forEach(method => { console.log(`ID: ${method.id}, Name: ${method.name}`); console.log(`Status: ${method.status}, Cutoff: ${method.cutoff}`); console.log(`Created: ${method.created_at}, Updated: ${method.updated_at}`); }); ```

**Example:**
```typescript
const result = await client.getDeliveryMethods(/* parameters */);
console.log(result);
```

### `getWarehousesList()`

Получить список складов Get warehouses list ```typescript const warehouses = await api.warehouse.getWarehousesList(); console.log('Total warehouses:', warehouses.result?.length); warehouses.result?.forEach(warehouse => { console.log(`${warehouse.name} (ID: ${warehouse.warehouse_id})`); console.log(`Status: ${warehouse.status}`); console.log(`rFBS: ${warehouse.is_rfbs ? 'Yes' : 'No'}`); console.log(`Economy goods: ${warehouse.is_economy ? 'Yes' : 'No'}`); console.log(`Large goods (KGT): ${warehouse.is_kgt ? 'Yes' : 'No'}`); if (warehouse.has_postings_limit) { console.log(`Postings limit: ${warehouse.postings_limit} (min: ${warehouse.min_postings_limit})`); } if (warehouse.working_days?.length) { const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']; const workingDayNames = warehouse.working_days.map(day => dayNames[parseInt(day) - 1]); console.log(`Working days: ${workingDayNames.join(', ')}`); } if (warehouse.first_mile_type) { console.log(`First mile: ${warehouse.first_mile_type.first_mile_type}`); if (warehouse.first_mile_type.first_mile_is_changing) { console.log('Settings are being updated'); } } }); ```

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