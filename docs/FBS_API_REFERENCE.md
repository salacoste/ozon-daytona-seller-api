# FBS API Reference

This document provides a comprehensive overview of the FBS (Fulfillment by Seller) API client implementation.

## Overview

The FBS API client (`client.fbs`) handles all operations related to Fulfillment by Seller orders, including:
- Order management and fulfillment
- Product country management and restrictions
- Package labeling and batch processing  
- Order cancellation and state transitions
- Pickup code verification and customs declarations

## API Method Overview

### Part 1 - Core Operations (Endpoints 1-6)

| SDK Method | HTTP Endpoint | Description |
|------------|---------------|-------------|
| `getUnfulfilledV3()` | `POST /v3/posting/fbs/unfulfilled/list` | Get unfulfilled FBS orders |
| `listV3()` | `POST /v3/posting/fbs/list` | List FBS orders with filtering |
| `getV3()` | `POST /v3/posting/fbs/get` | Get detailed order information |
| `getByBarcode()` | `POST /v2/posting/fbs/get-by-barcode` | Get order by barcode |
| `setMultiBoxQuantity()` | `POST /v3/posting/fbs/multi-box-qty/set` | Set multi-box quantities |
| `changeProduct()` | `POST /v2/posting/fbs/product/change` | Change product in order |

### Part 2 - Extended Operations (Endpoints 7-15)

| SDK Method | HTTP Endpoint | Description |
|------------|---------------|-------------|
| `listProductCountryV2()` | `POST /v2/posting/fbs/product/country/list` | List available manufacturing countries |
| `setProductCountryV2()` | `POST /v2/posting/fbs/product/country/set` | Set product manufacturing country |
| `getRestrictionsV1()` | `POST /v1/posting/fbs/restrictions` | Get pickup point restrictions |
| `getPackageLabelPdfV2()` | `POST /v2/posting/fbs/package-label` | Generate package labels (PDF) |
| `createLabelBatchV1()` | `POST /v1/posting/fbs/package-label/create` | Create label batch (legacy) |
| `createLabelBatchV2()` | `POST /v2/posting/fbs/package-label/create` | Create label batch (enhanced) |
| `getLabelBatchV1()` | `POST /v1/posting/fbs/package-label/get` | Get label batch status |
| `getCancelReasonV1()` | `POST /v1/posting/fbs/cancel-reason` | Get cancel reasons for posting |
| `getCancelReasonListV2()` | `POST /v2/posting/fbs/cancel-reason/list` | Get all cancel reasons |

### Part 3 - Posting Management (Endpoints 16-21)

| SDK Method | HTTP Endpoint | Description |
|------------|---------------|-------------|
| `cancelPostingProductV2()` | `POST /v2/posting/fbs/product/cancel` | Cancel products in posting |
| `cancelPostingV2()` | `POST /v2/posting/fbs/cancel` | Cancel entire posting |
| `moveToArbitrationV2()` | `POST /v2/posting/fbs/arbitration` | Move posting to arbitration |
| `moveToAwaitingDeliveryV2()` | `POST /v2/posting/fbs/awaiting-delivery` | Move to awaiting delivery |
| `verifyPickupCodeV1()` | `POST /v1/posting/fbs/pick-up-code/verify` | Verify pickup code |
| `getEtgbV1()` | `POST /v1/posting/global/etgb` | Get ETGB documents |

### Part 4 - Additional Operations (Endpoint 22)

| SDK Method | HTTP Endpoint | Description |
|------------|---------------|-------------|
| `getUnpaidLegalProductListV1()` | `POST /v1/posting/unpaid/legal-product-list` | Get unpaid legal products |

## Pagination Patterns

The FBS API uses three different pagination patterns:

### 1. Offset + has_next Pattern
Used by: `getUnfulfilledV3()`, `listV3()`

```typescript
for await (const page of client.fbs.iterators.iteratePostingsV3({
  filter: { since: '2024-01-01T00:00:00Z' },
  limit: 1000
})) {
  console.log(`Page: ${page.value.result?.length} orders`);
}
```

### 2. Cursor Pattern  
Used by: `getUnpaidLegalProductListV1()`

```typescript
for await (const page of client.fbs.iterators.iterateUnpaidLegalProducts({
  limit: 100
})) {
  console.log(`Page: ${page.value.length} products`);
}
```

### 3. Batch Processing Pattern
Used by: Label batch operations

```typescript
// Create batch
const batch = await client.fbs.createLabelBatchV2({
  posting_number: ['POST-123456', 'POST-789012']
});

// Poll for completion
for (const task of batch.data.tasks || []) {
  const status = await client.fbs.getLabelBatchV1({ task_id: task.task_id });
  if (status.data.result?.status === 'completed') {
    console.log('Labels ready:', status.data.result.file_url);
  }
}
```

## PDF Handling Patterns

### Synchronous PDF Generation (up to 20 postings)
```typescript
const labels = await client.fbs.getPackageLabelPdfV2({
  posting_number: ['POST-123456', 'POST-789012']
});

// Save PDF to file
if (labels.data.content) {
  const fs = require('fs');
  fs.writeFileSync('labels.pdf', labels.data.content);
}
```

### Asynchronous Batch PDF Generation (20+ postings)
```typescript
// Create batch
const batch = await client.fbs.createLabelBatchV2({
  posting_number: postingNumbers // array of posting numbers
});

// Poll until ready
const pollStatus = async (taskId: number) => {
  while (true) {
    const status = await client.fbs.getLabelBatchV1({ task_id: taskId });
    if (status.data.result?.status === 'completed') {
      return status.data.result.file_url;
    }
    await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
  }
};
```

## Cancel Flow Patterns

### 1. Get Available Cancel Reasons
```typescript
// For specific posting
const reasons = await client.fbs.getCancelReasonV1({
  posting_number: 'POST-123456'
});

// All available reasons
const allReasons = await client.fbs.getCancelReasonListV2();
```

### 2. Cancel Products or Entire Posting
```typescript
// Cancel specific products
await client.fbs.cancelPostingProductV2({
  posting_number: 'POST-123456',
  cancel_reason_id: 400,
  cancel_reason_message: 'Product damaged',
  products: [
    { product_id: 12345, quantity: 1 }
  ]
});

// Cancel entire posting
await client.fbs.cancelPostingV2({
  posting_number: 'POST-123456', 
  cancel_reason_id: 400,
  cancel_reason_message: 'Customer request' // Required when cancel_reason_id = 402
});
```

## State Transition Patterns

```typescript
// Move to arbitration (if not scanned at sorting center)
await client.fbs.moveToArbitrationV2({
  posting_number: ['POST-123456']
});

// Move to awaiting delivery (resolve disputes)
await client.fbs.moveToAwaitingDeliveryV2({
  posting_number: ['POST-123456', 'POST-789012']
});
```

## Error Handling

All FBS methods follow the standard SDK error handling patterns:

```typescript
try {
  const result = await client.fbs.listV3({ limit: 100 });
} catch (error) {
  if (error instanceof OzonApiError) {
    console.error(`API Error ${error.code}: ${error.message}`);
  } else if (error instanceof RateLimitError) {
    console.error('Rate limited, retry after:', error.retryAfter);
  }
}
```

## Specialized Access

For advanced usage, you can access specialized method groups:

```typescript
// Management operations (cancellation, arbitration, etc.)
await client.fbs.managementMethods.getUnpaidLegalProductListV1();

// Legacy methods for backward compatibility  
await client.fbs.legacyMethods.getPackageLabel(['POST-123456']);
```

## operationId Mapping

All methods are mapped to their corresponding Ozone API operationIds:

- `getUnfulfilledV3` → `PostingAPI_GetFbsPostingUnfulfilledList`
- `listV3` → `PostingAPI_GetFbsPostingListV3`
- `getV3` → `PostingAPI_GetFbsPostingV3`
- `cancelPostingV2` → `PostingAPI_CancelFbsPosting`
- `verifyPickupCodeV1` → `PostingAPI_PostingFBSPickupCodeVerify`
- `getEtgbV1` → `PostingAPI_GetEtgb`

For complete operationId mapping, refer to the method documentation in the source code.