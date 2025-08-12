# FBS API Documentation

The FBS (Fulfillment by Seller) API allows you to manage orders where you handle fulfillment directly, including order processing, shipment management, and returns handling.

## Table of Contents

- [Basic Usage](#basic-usage)
- [Core Operations](#core-operations)
- [Extended Operations](#extended-operations)
- [Management Operations](#management-operations)
- [Pagination](#pagination)
- [Legacy Methods](#legacy-methods)
- [Error Handling](#error-handling)

## Basic Usage

```typescript
import { OzonClient } from '@ozon/sdk';

const client = new OzonClient({
  clientId: process.env.OZON_CLIENT_ID!,
  apiKey: process.env.OZON_API_KEY!,
});

// Access FBS API through the client
const fbsOrders = await client.fbs.listV3({
  filter: { since: '2024-01-01T00:00:00Z' },
  limit: 100
});
```

## Core Operations

### Get Unfulfilled Orders

Retrieve orders that need to be fulfilled:

```typescript
const unfulfilledOrders = await client.fbs.getUnfulfilledV3({
  dir: 'ASC',
  filter: {
    cutoff_from: '2024-01-01T00:00:00Z',
    cutoff_to: '2024-01-31T23:59:59Z'
  },
  limit: 500,
  offset: 0
});

console.log('Unfulfilled orders:', unfulfilledOrders.result.postings.length);
```

### List Orders

Get a list of FBS orders with filtering:

```typescript
const orders = await client.fbs.listV3({
  dir: 'DESC',
  filter: {
    since: '2024-01-01T00:00:00Z',
    to: '2024-01-31T23:59:59Z',
    status: 'awaiting_packaging'
  },
  limit: 100,
  offset: 0
});

orders.result.forEach(order => {
  console.log(`Order ${order.posting_number}: ${order.status}`);
});
```

### Get Order Details

Retrieve detailed information about a specific order:

```typescript
const orderDetails = await client.fbs.getV3({
  posting_number: 'POST-123456',
  with: {
    analytics_data: true,
    barcodes: true,
    financial_data: false
  }
});

console.log('Order details:', orderDetails.result);
```

### Find Order by Barcode

Look up an order using its barcode:

```typescript
const order = await client.fbs.getByBarcode({
  barcode: '1234567890123'
});

console.log('Found order:', order.result.posting_number);
```

## Extended Operations

### Manage Product Countries

Get available countries and set product country information:

```typescript
// Get available countries
const countries = await client.fbs.getCountryList();
console.log('Available countries:', countries.result);

// Set product country
await client.fbs.setProductCountry({
  posting_number: 'POST-123456',
  products: [{
    product_id: 12345,
    country_iso_code: 'CN'
  }]
});
```

### Generate Labels

Create package labels for shipments:

```typescript
// Get package labels immediately
const labels = await client.fbs.getPackageLabelsV2({
  posting_number: ['POST-123456', 'POST-789012']
});

console.log('Label PDF:', labels.result.file_content); // Base64 PDF

// Or create a batch for multiple labels
const batch = await client.fbs.createLabelBatchV2({
  posting_number: ['POST-123456'],
  label_type: 'default'
});

// Check batch status
const batchResult = await client.fbs.getLabelBatch({
  batch_id: batch.result.batch_id
});

if (batchResult.result.status === 'completed') {
  console.log('Batch labels ready:', batchResult.result.file_content);
}
```

## Management Operations

### Order Cancellations

Handle order cancellations with proper reason codes:

```typescript
// Get available cancellation reasons
const reasons = await client.fbs.getCancelReasonsList();
console.log('Cancellation reasons:', reasons.result);

// Cancel entire order
await client.fbs.cancelPosting({
  posting_number: 'POST-123456',
  cancel_reason_id: 400 // Out of stock
});

// Cancel specific products in an order
await client.fbs.cancelPostingProducts({
  posting_number: 'POST-123456',
  products: [{
    product_id: 12345,
    reason_id: 401 // Damaged goods
  }]
});
```

### Order State Management

Move orders through different states:

```typescript
// Move to arbitration
await client.fbs.moveToArbitration({
  posting_number: 'POST-123456'
});

// Move to awaiting delivery
await client.fbs.moveToAwaitingDelivery({
  posting_number: ['POST-123456', 'POST-789012']
});
```

### Pickup Code Verification

Verify pickup codes for order collection:

```typescript
const verification = await client.fbs.verifyPickupCode({
  posting_number: 'POST-123456',
  verification_code: '1234'
});

if (verification.result.verified) {
  console.log('Pickup code verified successfully');
} else {
  console.log('Invalid pickup code');
}
```

### Electronic Transport Documents

Retrieve electronic transport documents (ETGB):

```typescript
const etgb = await client.fbs.getETGB({
  date: {
    from: '2024-01-01T00:00:00Z',
    to: '2024-01-31T23:59:59Z'
  },
  posting_number: ['POST-123456']
});

console.log('Transport document:', etgb.result.document_content);
```

## Pagination

The FBS API supports automatic pagination using async iterators:

### Iterate Through Unfulfilled Orders

```typescript
for await (const page of client.fbs.iterateUnfulfilled({
  filter: { cutoff_from: '2024-01-01T00:00:00Z' },
  limit: 500
})) {
  console.log(`Page ${page.pageNumber}: ${page.value.result.postings?.length} orders`);
  
  // Process each order
  page.value.result.postings?.forEach(order => {
    console.log(`Processing order: ${order.posting_number}`);
  });
}
```

### Iterate Through All Orders

```typescript
for await (const page of client.fbs.iterateList({
  filter: { since: '2024-01-01T00:00:00Z' },
  limit: 1000
})) {
  console.log(`Page ${page.pageNumber}: ${page.value.result?.length} orders`);
  
  page.value.result?.forEach(order => {
    console.log(`Order ${order.posting_number}: ${order.status}`);
  });
}
```

### Custom Pagination Configuration

```typescript
// Configure pagination with custom limits and delays
for await (const page of client.fbs.iterateUnfulfilled(
  { filter: { cutoff_from: '2024-01-01T00:00:00Z' }, limit: 100 },
  { 
    maxPages: 50, 
    delayBetweenPages: 1000 // 1 second delay between requests
  }
)) {
  // Process pages with rate limiting
}
```

## Legacy Methods

For backward compatibility, legacy methods are available:

```typescript
// Legacy list method (simplified interface)
const orders = await client.fbs.list({
  dir: 'ASC',
  filter: { 
    since: '2024-01-01T00:00:00Z',
    status: 'awaiting_packaging' 
  },
  limit: 50
});

// Legacy get method (simplified)
const order = await client.fbs.get('POST-123456');

// Legacy shipping method
const shipResult = await client.fbs.ship({
  posting_number: ['POST-123456'],
  packages: [{
    products: [{ product_id: 12345, quantity: 1 }]
  }]
});
```

## Error Handling

Handle various types of errors that can occur:

```typescript
import { OzonApiError, RateLimitError, ValidationError } from '@ozon/sdk';

try {
  const orders = await client.fbs.listV3({
    filter: { since: 'invalid-date' } // Invalid date format
  });
} catch (error) {
  if (error instanceof ValidationError) {
    console.error('Validation error:', error.message);
    console.error('Field errors:', error.details);
  } else if (error instanceof RateLimitError) {
    console.error('Rate limited. Retry after:', error.retryAfter, 'seconds');
  } else if (error instanceof OzonApiError) {
    console.error(`API Error ${error.code}: ${error.message}`);
    
    // Handle specific error codes
    switch (error.code) {
      case 3:
        console.error('Invalid request parameters');
        break;
      case 16:
        console.error('Authentication failed');
        break;
      default:
        console.error('Unknown API error');
    }
  } else {
    console.error('Unexpected error:', error);
  }
}
```

## Best Practices

### 1. Use Proper Filtering

Always use appropriate filters to limit the data you retrieve:

```typescript
// Good: Specific date range and status
const recentOrders = await client.fbs.listV3({
  filter: {
    since: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Last 24 hours
    status: 'awaiting_packaging'
  },
  limit: 100
});
```

### 2. Handle Pagination Properly

Use iterators for large datasets:

```typescript
// Good: Use iterator for all orders
let totalProcessed = 0;
for await (const page of client.fbs.iterateUnfulfilled({
  filter: { cutoff_from: '2024-01-01T00:00:00Z' }
})) {
  totalProcessed += page.value.result.postings?.length || 0;
  console.log(`Processed ${totalProcessed} orders so far...`);
}
```

### 3. Batch Operations

Group related operations together:

```typescript
// Good: Batch label creation
const labelBatch = await client.fbs.createLabelBatchV2({
  posting_number: ordersToPrint.map(o => o.posting_number),
  label_type: 'default'
});
```

### 4. Proper Error Recovery

Implement retry logic for transient errors:

```typescript
async function safeGetOrder(postingNumber: string, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await client.fbs.getV3({ posting_number: postingNumber });
    } catch (error) {
      if (error instanceof RateLimitError && attempt < maxRetries) {
        await new Promise(resolve => 
          setTimeout(resolve, error.retryAfter * 1000)
        );
        continue;
      }
      throw error;
    }
  }
}
```