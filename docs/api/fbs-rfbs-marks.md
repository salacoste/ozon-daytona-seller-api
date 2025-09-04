# FbsRfbsMarks API

FBS&rFBSMarks API implementation

## Overview

The FbsRfbsMarksApi class provides 17 methods for fbs&rfbsmarks api implementation.

## Core Features

- **Core Operations** - 17 methods for comprehensive functionality
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
const result = await client.fbs-rfbs-marks.updateProductExemplar(/* parameters */);
```

## Methods Reference

### `updateProductExemplar()`

FBS&rFBSMarks API implementation Product marking and exemplar management ```typescript import { OzonSellerAPI } from 'bmad-ozon-seller-api'; const api = new OzonSellerAPI({ clientId: 'your-client-id', apiKey: 'your-api-key' }); // Update exemplar data const updateResult = await api.fbsRfbsMarks.updateProductExemplar({ posting_number: 'FBS-123456789', products: [{ product_id: 123456, exemplars: [{ exemplar_id: 'exemplar_123', marking_code: 'marking_code_123', gtd: 'GTD123456' }] }] }); // Set exemplar data (v4) const setResult = await api.fbsRfbsMarks.setProductExemplarV4({ posting_number: 'FBS-123456789', products: [{ product_id: 123456, exemplars: [{ marking_code: 'marking_code_123', gtd: 'GTD123456' }] }] }); ``` / import { HttpClient } from '../../core/http.js'; import type { RequestOptions } from '../../core/types.js'; // Request types import { FbsRfbsMarksProductExemplarUpdateRequest, FbsRfbsMarksProductExemplarSetV4Request, FbsRfbsMarksProductExemplarStatusV4Request, FbsRfbsMarksProductExemplarValidateV4Request, FbsRfbsMarksPostingShipV4Request, FbsRfbsMarksPostingShipPackageV4Request, FbsRfbsMarksProductExemplarCreateOrGetV5Request, FbsRfbsMarksProductExemplarSetV5Request, FbsRfbsMarksProductExemplarStatusV5Request, FbsRfbsMarksProductExemplarValidateV5Request, FbsRfbsMarksProductExemplarCreateOrGetV6Request, FbsRfbsMarksProductExemplarSetV6Request, FbsRfbsMarksPostingCodesUploadStatusRequest, FbsRfbsMarksPostingCodesValidateRequest, FbsRfbsMarksPostingCodesValidateStatusRequest, FbsRfbsMarksPostingCodesInfoRequest, FbsRfbsMarksPostingListRequest, } from '../../types/requests/fbs-rfbs-marks.js'; // Response types import { FbsRfbsMarksProductExemplarUpdateResponse, FbsRfbsMarksProductExemplarSetV4Response, FbsRfbsMarksProductExemplarStatusV4Response, FbsRfbsMarksProductExemplarValidateV4Response, FbsRfbsMarksPostingShipV4Response, FbsRfbsMarksPostingShipPackageV4Response, FbsRfbsMarksProductExemplarCreateOrGetV5Response, FbsRfbsMarksProductExemplarSetV5Response, FbsRfbsMarksProductExemplarStatusV5Response, FbsRfbsMarksProductExemplarValidateV5Response, FbsRfbsMarksProductExemplarCreateOrGetV6Response, FbsRfbsMarksProductExemplarSetV6Response, FbsRfbsMarksPostingCodesUploadStatusResponse, FbsRfbsMarksPostingCodesValidateResponse, FbsRfbsMarksPostingCodesValidateStatusResponse, FbsRfbsMarksPostingCodesInfoResponse, FbsRfbsMarksPostingListResponse, } from '../../types/responses/fbs-rfbs-marks.js'; /** FBS&rFBSMarks API class Handles product marking and exemplar management operations / export class FbsRfbsMarksApi { constructor(private readonly httpClient: HttpClient) {} // ============ V1 API Methods ============ /** Обновить данные экземпляров Update exemplar data ```typescript const result = await api.fbsRfbsMarks.updateProductExemplar({ posting_number: 'FBS-123456789', products: [{ product_id: 123456, exemplars: [{ exemplar_id: 'exemplar_123', marking_code: 'marking_code_123', gtd: 'GTD123456' }] }] }); console.log('Update result:', result.result); ```

**Example:**
```typescript
const result = await client.updateProductExemplar(/* parameters */);
console.log(result);
```

### `setProductExemplarV4()`

Проверить и сохранить данные экземпляров (v4) Check and save exemplar data (v4) ```typescript const result = await api.fbsRfbsMarks.setProductExemplarV4({ posting_number: 'FBS-123456789', products: [{ product_id: 123456, exemplars: [{ marking_code: 'marking_code_123', gtd: 'GTD123456', is_gtd_absent: false }] }] }); console.log('Set result:', result.result); ```

**Example:**
```typescript
const result = await client.setProductExemplarV4(/* parameters */);
console.log(result);
```

### `getProductExemplarStatusV4()`

Получить статус добавления экземпляров (v4) Get exemplar addition status (v4) ```typescript const status = await api.fbsRfbsMarks.getProductExemplarStatusV4({ posting_number: 'FBS-123456789' }); console.log('Status:', status.status); console.log('Exemplars:', status.exemplars); ```

**Example:**
```typescript
const result = await client.getProductExemplarStatusV4(/* parameters */);
console.log(result);
```

### `validateProductExemplarV4()`

Валидация кодов маркировки (v4) Validate marking codes (v4) ```typescript const result = await api.fbsRfbsMarks.validateProductExemplarV4({ posting_number: 'FBS-123456789', products: [{ product_id: 123456, exemplars: [{ marking_code: 'marking_code_123', gtd: 'GTD123456' }] }] }); console.log('Validation result:', result.result); ```

**Example:**
```typescript
const result = await client.validateProductExemplarV4(/* parameters */);
console.log(result);
```

### `shipPostingV4()`

Собрать заказ (v4) Ship order (v4) ```typescript const result = await api.fbsRfbsMarks.shipPostingV4({ posting_number: 'FBS-123456789', packages: [{ products: [{ product_id: 123456, quantity: 2 }] }] }); console.log('Ship result:', result.result); ```

**Example:**
```typescript
const result = await client.shipPostingV4(/* parameters */);
console.log(result);
```

### `shipPostingPackageV4()`

Частичная сборка отправления (v4) Partial posting assembly (v4) ```typescript const result = await api.fbsRfbsMarks.shipPostingPackageV4({ posting_number: 'FBS-123456789', products: [{ product_id: 123456, quantity: 1 }] }); console.log('Ship package result:', result.result); ```

**Example:**
```typescript
const result = await client.shipPostingPackageV4(/* parameters */);
console.log(result);
```

### `createOrGetProductExemplarV5()`

Получить информацию об экземплярах (v5) Get exemplar information (v5) ```typescript const result = await api.fbsRfbsMarks.createOrGetProductExemplarV5({ posting_number: 'FBS-123456789', products: [{ product_id: 123456, quantity: 2 }] }); console.log('Exemplars:', result.exemplars); ```

**Example:**
```typescript
const result = await client.createOrGetProductExemplarV5(/* parameters */);
console.log(result);
```

### `setProductExemplarV5()`

Проверить и сохранить данные экземпляров (v5) Check and save exemplar data (v5) ```typescript const result = await api.fbsRfbsMarks.setProductExemplarV5({ posting_number: 'FBS-123456789', products: [{ product_id: 123456, exemplars: [{ marking_code: 'marking_code_123', gtd: 'GTD123456', is_gtd_absent: false, additional_info: { serial_number: 'SN123', production_date: '2024-01-01', ean_code: '1234567890123' } }] }] }); console.log('Set result:', result.result); ```

**Example:**
```typescript
const result = await client.setProductExemplarV5(/* parameters */);
console.log(result);
```

### `getProductExemplarStatusV5()`

Получить статус добавления экземпляров (v5) Get exemplar addition status (v5) ```typescript const status = await api.fbsRfbsMarks.getProductExemplarStatusV5({ posting_number: 'FBS-123456789' }); console.log('Status:', status.status); console.log('Exemplars:', status.exemplars); ```

**Example:**
```typescript
const result = await client.getProductExemplarStatusV5(/* parameters */);
console.log(result);
```

### `validateProductExemplarV5()`

Валидация кодов маркировки (v5) Validate marking codes (v5) ```typescript const result = await api.fbsRfbsMarks.validateProductExemplarV5({ posting_number: 'FBS-123456789', products: [{ product_id: 123456, exemplars: [{ marking_code: 'marking_code_123', gtd: 'GTD123456', is_gtd_absent: false }] }] }); console.log('Validation result:', result.result); ```

**Example:**
```typescript
const result = await client.validateProductExemplarV5(/* parameters */);
console.log(result);
```

### `createOrGetProductExemplarV6()`

Получить данные созданных экземпляров (v6) Get created exemplar data (v6) ```typescript const result = await api.fbsRfbsMarks.createOrGetProductExemplarV6({ posting_number: 'FBS-123456789', products: [{ product_id: 123456, quantity: 2 }] }); console.log('Exemplars:', result.exemplars); ```

**Example:**
```typescript
const result = await client.createOrGetProductExemplarV6(/* parameters */);
console.log(result);
```

### `setProductExemplarV6()`

Проверить и сохранить данные экземпляров (v6) Check and save exemplar data (v6) ```typescript const result = await api.fbsRfbsMarks.setProductExemplarV6({ posting_number: 'FBS-123456789', products: [{ product_id: 123456, exemplars: [{ marking_code: 'marking_code_123', gtd: 'GTD123456', is_gtd_absent: false, extended_data: { serial_number: 'SN123', production_date: '2024-01-01', ean_code: '1234567890123', attributes: { custom_field: 'custom_value' } } }] }] }); console.log('Set result:', result.result); ```

**Example:**
```typescript
const result = await client.setProductExemplarV6(/* parameters */);
console.log(result);
```

### `getPostingCodesUploadStatus()`

Получить статус загрузки кодов маркировки Get marking codes upload status ```typescript const status = await api.fbsRfbsMarks.getPostingCodesUploadStatus({ task_id: 'upload_task_123' }); console.log('Upload status:', status.status); ```

**Example:**
```typescript
const result = await client.getPostingCodesUploadStatus(/* parameters */);
console.log(result);
```

### `validatePostingCodes()`

Проверить коды маркировки отправления Validate posting marking codes ```typescript const result = await api.fbsRfbsMarks.validatePostingCodes({ posting_number: 'FBS-123456789' }); console.log('Validation task ID:', result.task_id); ```

**Example:**
```typescript
const result = await client.validatePostingCodes(/* parameters */);
console.log(result);
```

### `getPostingCodesValidateStatus()`

Получить статус проверки кодов маркировки Get marking codes validation status ```typescript const status = await api.fbsRfbsMarks.getPostingCodesValidateStatus({ task_id: 'validation_task_123' }); console.log('All valid:', status.validation_result?.all_valid); console.log('Valid percentage:', status.validation_result?.valid_percentage); ```

**Example:**
```typescript
const result = await client.getPostingCodesValidateStatus(/* parameters */);
console.log(result);
```

### `getPostingCodesInfo()`

Получить информацию о кодах маркировки отправления Get posting marking codes information ```typescript const info = await api.fbsRfbsMarks.getPostingCodesInfo({ posting_number: 'FBS-123456789' }); console.log('Marking required:', info.marking_required); console.log('Products with codes:', info.summary?.products_with_codes); ```

**Example:**
```typescript
const result = await client.getPostingCodesInfo(/* parameters */);
console.log(result);
```

### `getPostingList()`

Получить список отправлений с обязательной маркировкой Get postings with mandatory marking list ```typescript const postings = await api.fbsRfbsMarks.getPostingList({ status: 'awaiting_codes', date_from: '2024-01-01T00:00:00Z', date_to: '2024-01-31T23:59:59Z', limit: 50 }); console.log('Postings awaiting codes:', postings.total); ```

**Example:**
```typescript
const result = await client.getPostingList(/* parameters */);
console.log(result);
```

## Type Definitions

The FbsRfbsMarks API uses strongly typed TypeScript interfaces for all requests and responses. Import the necessary types from the SDK:

```typescript
import type {
  // Request types
  Fbs-rfbs-marks*Request
} from '@ozon/seller-api';

import type {
  // Response types  
  Fbs-rfbs-marks*Response
} from '@ozon/seller-api';
```

## Error Handling

```typescript
try {
  const result = await client.fbs-rfbs-marks.updateProductExemplar(/* parameters */);
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