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

SupplierAPI implementation Supplier integration and management ```typescript import { OzonSellerAPI } from 'bmad-ozon-seller-api'; const api = new OzonSellerAPI({ clientId: 'your-client-id', apiKey: 'your-api-key' }); // Upload invoice file const uploadResult = await api.supplier.uploadInvoiceFile({ file: 'base64EncodedPdfContent', file_name: 'invoice_001.pdf', document_type: 'invoice' }); // Create or update invoice const invoice = await api.supplier.createOrUpdateInvoice({ invoice_number: 'INV-2024-001', invoice_date: '2024-01-15', file_id: uploadResult.file_id, total_amount: 10000.00, currency: 'RUB', vat_amount: 1000.00, items: [ { sku: 'SKU123', name: 'Product Name', quantity: 10, unit_price: 900.00, total_price: 9000.00, vat_rate: 20 } ] }); ``` / import { HttpClient } from '../../core/http.js'; import type { RequestOptions } from '../../core/types.js'; // Request types import { SupplierInvoiceDeleteRequest, SupplierInvoiceFileUploadRequest, SupplierInvoiceCreateOrUpdateRequest, SupplierInvoiceGetRequest, } from '../../types/requests/supplier'; // Response types import { SupplierInvoiceDeleteResponse, SupplierInvoiceFileUploadResponse, SupplierInvoiceCreateOrUpdateResponse, SupplierInvoiceGetResponse, } from '../../types/responses/supplier'; /** SupplierAPI class Handles supplier integration and management operations / export class SupplierApi { constructor(private readonly httpClient: HttpClient) {} /** Удалить ссылку на счёт-фактуру Delete invoice reference ```typescript const result = await api.supplier.deleteInvoice({ invoice_id: 'invoice_123' }); console.log('Deletion result:', result.result); ```

**Example:**
```typescript
const result = await client.deleteInvoice(/* parameters */);
console.log(result);
```

### `uploadInvoiceFile()`

Загрузить файл счёт-фактуры Upload invoice file ```typescript const result = await api.supplier.uploadInvoiceFile({ file: 'base64EncodedPdfContent', file_name: 'invoice_001.pdf', document_type: 'invoice' }); console.log('File ID:', result.file_id); console.log('Upload status:', result.status); console.log('File URL:', result.file_url); ```

**Example:**
```typescript
const result = await client.uploadInvoiceFile(/* parameters */);
console.log(result);
```

### `createOrUpdateInvoice()`

Создать или изменить счёт-фактуру Create or update invoice ```typescript // Create new invoice const newInvoice = await api.supplier.createOrUpdateInvoice({ invoice_number: 'INV-2024-001', invoice_date: '2024-01-15', file_id: 'uploaded_file_id', total_amount: 10000.00, currency: 'RUB', vat_amount: 1000.00, items: [ { sku: 'SKU123', name: 'Product Name', quantity: 10, unit_price: 900.00, total_price: 9000.00, vat_rate: 20 } ] }); // Update existing invoice const updatedInvoice = await api.supplier.createOrUpdateInvoice({ invoice_id: 'existing_invoice_id', invoice_number: 'INV-2024-001-UPDATED', total_amount: 12000.00, vat_amount: 1200.00 }); console.log('Invoice ID:', newInvoice.invoice?.invoice_id); console.log('Status:', newInvoice.invoice?.status); ```

**Example:**
```typescript
const result = await client.createOrUpdateInvoice(/* parameters */);
console.log(result);
```

### `getInvoice()`

Получить информацию о счёт-фактуре Get invoice information ```typescript const invoiceInfo = await api.supplier.getInvoice({ invoice_id: 'invoice_123' }); const invoice = invoiceInfo.invoice; console.log('Invoice number:', invoice?.invoice_number); console.log('Status:', invoice?.status); console.log('Total amount:', invoice?.total_amount, invoice?.currency); console.log('Items count:', invoice?.items?.length); invoice?.items?.forEach(item => { console.log(`${item.name}: ${item.quantity} x ${item.unit_price} = ${item.total_price}`); }); if (invoice?.status === 'rejected') { console.log('Rejection reason:', invoice.rejection_reason); } ```

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