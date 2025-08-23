# FbsRfbsMarks API

FBS&rFBSMarks API implementation

## Overview

The FbsRfbsMarksApi class provides 13 methods for fbs&rfbsmarks api implementation.

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
const result = await client.fbs-rfbs-marks.createProductExemplar(/* parameters */);
```

## Methods Reference

### `createProductExemplar()`

FBS&rFBSMarks API implementation Product marking and exemplar management ```typescript import { OzonSellerAPI } from 'bmad-ozon-seller-api'; const api = new OzonSellerAPI({ clientId: 'your-client-id', apiKey: 'your-api-key' }); // Upload marking exemplar const uploadResult = await api.fbsRfbsMarks.createProductExemplar({ product_id: 123456, file: 'base64EncodedPdfContent', file_name: 'marking_exemplar.pdf' }); // Upload marking codes for posting const codesResult = await api.fbsRfbsMarks.uploadPostingCodes({ posting_number: 'FBS-123456789', codes: [ { sku: 'SKU123', gtd: 'marking_code_1', quantity: 1 }, { sku: 'SKU456', gtd: 'marking_code_2', quantity: 2 } ] }); ``` / import { HttpClient } from '../../core/http.js'; import type { RequestOptions } from '../../core/types.js'; // Request types import { FbsRfbsMarksProductExemplarCreateRequest, FbsRfbsMarksProductExemplarInfoRequest, FbsRfbsMarksProductExemplarListRequest, FbsRfbsMarksProductExemplarDeleteRequest, FbsRfbsMarksProductExemplarDeleteStatusRequest, FbsRfbsMarksProductExemplarValidateRequest, FbsRfbsMarksProductExemplarValidateStatusRequest, FbsRfbsMarksPostingCodesUploadRequest, FbsRfbsMarksPostingCodesUploadStatusRequest, FbsRfbsMarksPostingCodesValidateRequest, FbsRfbsMarksPostingCodesValidateStatusRequest, FbsRfbsMarksPostingCodesInfoRequest, FbsRfbsMarksPostingListRequest, } from '../../types/requests/fbs-rfbs-marks'; // Response types import { FbsRfbsMarksProductExemplarCreateResponse, FbsRfbsMarksProductExemplarInfoResponse, FbsRfbsMarksProductExemplarListResponse, FbsRfbsMarksProductExemplarDeleteResponse, FbsRfbsMarksProductExemplarDeleteStatusResponse, FbsRfbsMarksProductExemplarValidateResponse, FbsRfbsMarksProductExemplarValidateStatusResponse, FbsRfbsMarksPostingCodesUploadResponse, FbsRfbsMarksPostingCodesUploadStatusResponse, FbsRfbsMarksPostingCodesValidateResponse, FbsRfbsMarksPostingCodesValidateStatusResponse, FbsRfbsMarksPostingCodesInfoResponse, FbsRfbsMarksPostingListResponse, } from '../../types/responses/fbs-rfbs-marks'; /** FBS&rFBSMarks API class Handles product marking and exemplar management operations / export class FbsRfbsMarksApi { constructor(private readonly httpClient: HttpClient) {} /** Загрузить образец маркировки товара Upload product marking exemplar ```typescript const result = await api.fbsRfbsMarks.createProductExemplar({ product_id: 123456, file: 'base64EncodedPdfContent', file_name: 'marking_exemplar.pdf' }); console.log('Upload task ID:', result.task_id); ```

**Example:**
```typescript
const result = await client.createProductExemplar(/* parameters */);
console.log(result);
```

### `getProductExemplarInfo()`

Получить информацию о загруженном образце маркировки Get uploaded marking exemplar information ```typescript const info = await api.fbsRfbsMarks.getProductExemplarInfo({ task_id: 'upload_task_123' }); console.log('Exemplar status:', info.status); ```

**Example:**
```typescript
const result = await client.getProductExemplarInfo(/* parameters */);
console.log(result);
```

### `getProductExemplarList()`

Получить список образцов маркировки товара Get product marking exemplars list ```typescript const exemplars = await api.fbsRfbsMarks.getProductExemplarList({ product_id: 123456, limit: 20, offset: 0 }); console.log('Found exemplars:', exemplars.total); ```

**Example:**
```typescript
const result = await client.getProductExemplarList(/* parameters */);
console.log(result);
```

### `deleteProductExemplar()`

Удалить образец маркировки Delete marking exemplar ```typescript const result = await api.fbsRfbsMarks.deleteProductExemplar({ exemplar_id: 'exemplar_123' }); console.log('Deletion task ID:', result.task_id); ```

**Example:**
```typescript
const result = await client.deleteProductExemplar(/* parameters */);
console.log(result);
```

### `getProductExemplarDeleteStatus()`

Получить статус удаления образца маркировки Get marking exemplar deletion status ```typescript const status = await api.fbsRfbsMarks.getProductExemplarDeleteStatus({ task_id: 'deletion_task_123' }); console.log('Deletion completed:', status.success); ```

**Example:**
```typescript
const result = await client.getProductExemplarDeleteStatus(/* parameters */);
console.log(result);
```

### `validateProductExemplar()`

Валидировать образец маркировки Validate marking exemplar ```typescript const result = await api.fbsRfbsMarks.validateProductExemplar({ exemplar_id: 'exemplar_123' }); console.log('Validation task ID:', result.task_id); ```

**Example:**
```typescript
const result = await client.validateProductExemplar(/* parameters */);
console.log(result);
```

### `getProductExemplarValidateStatus()`

Получить статус валидации образца маркировки Get marking exemplar validation status ```typescript const status = await api.fbsRfbsMarks.getProductExemplarValidateStatus({ task_id: 'validation_task_123' }); console.log('Is valid:', status.is_valid); console.log('Quality check:', status.validation_details?.quality_valid); ```

**Example:**
```typescript
const result = await client.getProductExemplarValidateStatus(/* parameters */);
console.log(result);
```

### `uploadPostingCodes()`

Загрузить коды маркировки для отправления Upload marking codes for posting ```typescript const result = await api.fbsRfbsMarks.uploadPostingCodes({ posting_number: 'FBS-123456789', codes: [ { sku: 'SKU123', gtd: 'marking_code_1', quantity: 1 }, { sku: 'SKU456', gtd: 'marking_code_2', quantity: 2 } ] }); console.log('Upload task ID:', result.task_id); ```

**Example:**
```typescript
const result = await client.uploadPostingCodes(/* parameters */);
console.log(result);
```

### `getPostingCodesUploadStatus()`

Получить статус загрузки кодов маркировки Get marking codes upload status ```typescript const status = await api.fbsRfbsMarks.getPostingCodesUploadStatus({ task_id: 'upload_task_123' }); console.log('Valid codes:', status.upload_result?.valid_codes); console.log('Invalid codes:', status.upload_result?.invalid_codes); ```

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
  const result = await client.fbs-rfbs-marks.createProductExemplar(/* parameters */);
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