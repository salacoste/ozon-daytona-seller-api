# Supplier API

SupplierAPI implementation

## Overview

The SupplierApi class provides 4 methods for supplierapi implementation.

## Core Features

- **Core Operations** - 4 methods for comprehensive functionality
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
const result = await client.supplier.deleteInvoice(/* parameters */);
```

## Methods Reference

### `deleteInvoice()`

SupplierAPI implementation Supplier integration and management 📄 **Управление таможенными счёт-фактурами для возврата НДС продавцам из Турции** 📄 **Customs invoice management for VAT refund to Turkish sellers** ```typescript import { OzonSellerAPI } from 'bmad-ozon-seller-api'; const api = new OzonSellerAPI({ clientId: 'your-client-id', apiKey: 'your-api-key' }); // Upload invoice file (JPEG or PDF, max 10MB) const uploadResult = await api.supplier.uploadInvoiceFile({ base64_content: 'base64EncodedPdfContent', posting_number: '0001-1234567-0000001' }); // Create or update invoice const invoice = await api.supplier.createOrUpdateInvoice({ date: '2024-01-15T10:00:00Z', posting_number: '0001-1234567-0000001', url: uploadResult.url!, number: 'INV-2024-001', price: 10000.50, price_currency: 'TRY', hs_codes: [ { code: '1234567890' } ] }); // Get invoice information const invoiceInfo = await api.supplier.getInvoice({ posting_number: '0001-1234567-0000001' }); // Delete invoice reference const deleteResult = await api.supplier.deleteInvoice({ posting_number: '0001-1234567-0000001' }); ``` / import { HttpClient } from "../../core/http.js"; import type { RequestOptions } from "../../core/types.js"; // Request types import { SupplierInvoiceDeleteRequest, SupplierInvoiceFileUploadRequest, SupplierInvoiceCreateOrUpdateRequest, SupplierInvoiceGetRequest } from "../../types/requests/supplier"; // Response types import { SupplierInvoiceDeleteResponse, SupplierInvoiceFileUploadResponse, SupplierInvoiceCreateOrUpdateResponse, SupplierInvoiceGetResponse } from "../../types/responses/supplier"; /** SupplierAPI class Handles supplier integration and management operations / export class SupplierApi { constructor(private readonly httpClient: HttpClient) {} /** Удалить ссылку на счёт-фактуру Delete invoice reference ```typescript const result = await api.supplier.deleteInvoice({ posting_number: '0001-1234567-0000001' }); console.log('Deletion result:', result.result); ```

**Example:**
```typescript
const result = await client.deleteInvoice(/* parameters */);
console.log(result);
```

### `uploadInvoiceFile()`

Загрузить файл счёт-фактуры Upload invoice file ```typescript const result = await api.supplier.uploadInvoiceFile({ base64_content: 'base64EncodedPdfContent', posting_number: '0001-1234567-0000001' }); console.log('Invoice URL:', result.url); ```

**Example:**
```typescript
const result = await client.uploadInvoiceFile(/* parameters */);
console.log(result);
```

### `createOrUpdateInvoice()`

Создать или изменить счёт-фактуру Create or update invoice ```typescript const result = await api.supplier.createOrUpdateInvoice({ date: '2024-01-15T10:00:00Z', posting_number: '0001-1234567-0000001', url: 'https://ozon.ru/invoice/abc123', number: 'INV-2024-001', price: 10000.50, price_currency: 'USD', hs_codes: [ { code: '1234567890' }, { code: '0987654321' } ] }); console.log('Creation result:', result.result); ```

**Example:**
```typescript
const result = await client.createOrUpdateInvoice(/* parameters */);
console.log(result);
```

### `getInvoice()`

Получить информацию о счёт-фактуре Get invoice information ```typescript const invoiceInfo = await api.supplier.getInvoice({ posting_number: '0001-1234567-0000001' }); const invoice = invoiceInfo.result; console.log('Invoice number:', invoice?.number); console.log('Date:', invoice?.date); console.log('Price:', invoice?.price, invoice?.price_currency); console.log('File URL:', invoice?.file_url); invoice?.hs_codes?.forEach(hsCode => { console.log('HS Code:', hsCode.code); }); ```

**Example:**
```typescript
const result = await client.getInvoice(/* parameters */);
console.log(result);
```

## Type Definitions

The Supplier API uses strongly typed TypeScript interfaces for all requests and responses. Import the necessary types from the SDK:

```typescript
import type {
  // Request types
  Supplier*Request
} from '@ozon/seller-api';

import type {
  // Response types  
  Supplier*Response
} from '@ozon/seller-api';
```

## Error Handling

```typescript
try {
  const result = await client.supplier.deleteInvoice(/* parameters */);
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