# Promos API

The Promos API enables comprehensive promotional campaign and discount management for OZON sellers.

## Overview

The PromosApi class provides 8 methods for managing promotional campaigns, discounts, and special offers. This includes discovering available promotions, managing product participation, and handling customer discount requests.

## Core Features

- **Promotion Discovery** - Find available OZON promotional campaigns
- **Product Participation** - Add/remove products from promotions
- **Discount Management** - Handle customer discount requests
- **Campaign Analytics** - Track promotion performance
- **Inventory Control** - Manage promotional stock levels
- **Pricing Strategy** - Set promotional pricing

## Quick Start

```typescript
import { OzonSellerApiClient, createApiKey, createClientId } from '@ozon/seller-api';

const client = new OzonSellerApiClient({
  apiKey: createApiKey('your-api-key'),
  clientId: createClientId('your-client-id')
});

// Get available promotions
const actions = await client.promos.getActions();

// Get promotion candidates
const candidates = await client.promos.getCandidates({
  action_id: 12345,
  limit: 100
});

// Add products to promotion
const activation = await client.promos.activateProducts({
  action_id: 12345,
  products: [{
    product_id: 67890,
    action_price: '999',
    stock: 50
  }]
});
```

## Methods Reference

### Promotion Discovery

#### `getActions(): Promise<PromosGetActionsResponse>`

Retrieves list of available OZON promotional campaigns.

**Example:**
```typescript
const actions = await client.promos.getActions();

actions.result?.forEach(action => {
  console.log(`Promotion: ${action.title}`);
  console.log(`Period: ${action.date_start} - ${action.date_end}`);
  console.log(`Status: ${action.status}`);
  console.log(`Can participate: ${action.is_participating_available ? 'Yes' : 'No'}`);
});
```

**Features:**
- Lists all available promotional campaigns
- Shows participation eligibility
- Includes campaign dates and requirements
- Provides campaign status and details

### Product Management

#### `getCandidates(request: PromosGetProductsRequest): Promise<PromosGetProductsResponse>`

Gets list of products eligible for a specific promotion.

**Parameters:**
- `request.action_id` - Promotion ID
- `request.limit` - Maximum products to return
- `request.last_id` - Pagination cursor

**Example:**
```typescript
const candidates = await client.promos.getCandidates({
  action_id: 12345,
  limit: 50,
  last_id: 0
});

candidates.result?.products?.forEach(product => {
  console.log(`Product: ${product.name} (ID: ${product.product_id})`);
  console.log(`Price: ${product.price}, eligible: ${product.is_available}`);
});
```

#### `getParticipatingProducts(request: PromosGetProductsRequest): Promise<PromosGetProductsResponse>`

Retrieves list of products currently participating in a promotion.

**Parameters:**
- `request.action_id` - Promotion ID
- `request.limit` - Maximum products to return

**Example:**
```typescript
const participants = await client.promos.getParticipatingProducts({
  action_id: 12345,
  limit: 100
});

participants.result?.products?.forEach(product => {
  console.log(`Participating: ${product.name} (ID: ${product.product_id})`);
  console.log(`Promotion price: ${product.action_price}, stock: ${product.stock}`);
});
```

#### `activateProducts(request: PromosActivateProductsRequest): Promise<PromosActivateProductsResponse>`

Adds products to an active promotion.

**Parameters:**
- `request.action_id` - Promotion ID
- `request.products` - Array of products with promotional details

**Example:**
```typescript
const activationResult = await client.promos.activateProducts({
  action_id: 12345,
  products: [{
    product_id: 67890,
    action_price: '999',
    stock: 100
  }, {
    product_id: 11111,
    action_price: '599',
    stock: 50
  }]
});

activationResult.result?.results?.forEach(result => {
  if (result.is_updated) {
    console.log(`Product ${result.product_id} successfully added to promotion`);
  } else {
    console.log(`Errors for product ${result.product_id}: ${result.errors?.join(', ')}`);
  }
});
```

#### `deactivateProducts(request: PromosDeactivateProductsRequest): Promise<PromosDeactivateProductsResponse>`

Removes products from a promotion.

**Parameters:**
- `request.action_id` - Promotion ID
- `request.product_ids` - Array of product IDs to remove

**Example:**
```typescript
const deactivationResult = await client.promos.deactivateProducts({
  action_id: 12345,
  product_ids: [67890, 11111, 22222]
});

deactivationResult.result?.results?.forEach(result => {
  if (result.is_updated) {
    console.log(`Product ${result.product_id} successfully removed from promotion`);
  } else {
    console.log(`Errors for product ${result.product_id}: ${result.errors?.join(', ')}`);
  }
});
```

### Discount Request Management

#### `getDiscountTasks(request: PromosGetDiscountTasksRequest): Promise<PromosGetDiscountTasksResponse>`

Retrieves customer discount requests that need seller approval.

**Parameters:**
- `request.status` - Filter by task status (NEW, SEEN, etc.)
- `request.limit` - Maximum tasks to return
- `request.page` - Page number for pagination

**Example:**
```typescript
const tasks = await client.promos.getDiscountTasks({
  status: 'NEW',
  limit: 50,
  page: 1
});

tasks.result?.forEach(task => {
  console.log(`Request: ${task.product_name}`);
  console.log(`Current price: ${task.current_price}, desired: ${task.desired_price}`);
  console.log(`Discount: ${task.discount_percentage}%`);
});
```

#### `approveDiscountTasks(request: PromosApproveDiscountTasksRequest): Promise<PromosProcessDiscountTasksResponse>`

Approves customer discount requests.

**Parameters:**
- `request.tasks` - Array of tasks to approve with discount details

**Example:**
```typescript
const approvalResult = await client.promos.approveDiscountTasks({
  tasks: [{
    task_id: 'task_123',
    product_id: 67890,
    discount_percentage: 15
  }]
});

console.log(`Processed tasks: ${approvalResult.result?.processed_count}`);
if (approvalResult.result?.errors?.length) {
  console.log(`Errors: ${approvalResult.result.errors.join(', ')}`);
}
```

**Notes:**
- Can approve tasks in NEW or SEEN status
- Requires specific discount percentage
- Provides batch processing results

#### `declineDiscountTasks(request: PromosDeclineDiscountTasksRequest): Promise<PromosProcessDiscountTasksResponse>`

Declines customer discount requests.

**Parameters:**
- `request.tasks` - Array of tasks to decline with reasons

**Example:**
```typescript
const declineResult = await client.promos.declineDiscountTasks({
  tasks: [{
    task_id: 'task_456',
    product_id: 67890,
    decline_reason: 'Discount too large'
  }]
});

console.log(`Declined tasks: ${declineResult.result?.processed_count}`);
```

## Promotion Workflow

### Joining a Promotion

1. **Discover Promotions** - Use `getActions()` to find available campaigns
2. **Check Eligibility** - Use `getCandidates()` to see eligible products
3. **Join Promotion** - Use `activateProducts()` to add products
4. **Monitor Performance** - Use `getParticipatingProducts()` to track

```typescript
// Step 1: Find available promotions
const actions = await client.promos.getActions();
const targetPromo = actions.result?.find(action => 
  action.is_participating_available && 
  action.status === 'ACTIVE'
);

if (targetPromo) {
  // Step 2: Check eligible products
  const candidates = await client.promos.getCandidates({
    action_id: targetPromo.id,
    limit: 100
  });

  // Step 3: Add products to promotion
  const productsToAdd = candidates.result?.products
    ?.filter(p => p.is_available)
    ?.slice(0, 5) // Add first 5 eligible products
    ?.map(p => ({
      product_id: p.product_id,
      action_price: (parseFloat(p.price) * 0.9).toString(), // 10% discount
      stock: 50
    }));

  if (productsToAdd?.length) {
    const result = await client.promos.activateProducts({
      action_id: targetPromo.id,
      products: productsToAdd
    });
    
    console.log(`Added ${result.result?.results?.filter(r => r.is_updated).length} products to promotion`);
  }
}
```

### Managing Discount Requests

```typescript
// Get pending discount requests
const tasks = await client.promos.getDiscountTasks({
  status: 'NEW',
  limit: 50,
  page: 1
});

// Process requests based on business rules
for (const task of tasks.result || []) {
  if (task.discount_percentage <= 20) {
    // Approve reasonable discounts
    await client.promos.approveDiscountTasks({
      tasks: [{
        task_id: task.task_id,
        product_id: task.product_id,
        discount_percentage: task.discount_percentage
      }]
    });
  } else {
    // Decline excessive discounts
    await client.promos.declineDiscountTasks({
      tasks: [{
        task_id: task.task_id,
        product_id: task.product_id,
        decline_reason: 'Discount exceeds business limits'
      }]
    });
  }
}
```

## Type Definitions

### Request Types

```typescript
interface PromosGetProductsRequest {
  action_id: number;
  limit?: number;
  last_id?: number;
}

interface PromosActivateProductsRequest {
  action_id: number;
  products: {
    product_id: number;
    action_price: string;
    stock: number;
  }[];
}

interface PromosGetDiscountTasksRequest {
  status?: 'NEW' | 'SEEN' | 'APPROVED' | 'DECLINED';
  limit?: number;
  page?: number;
}

interface PromosApproveDiscountTasksRequest {
  tasks: {
    task_id: string;
    product_id: number;
    discount_percentage: number;
  }[];
}
```

### Response Types

```typescript
interface PromosGetActionsResponse {
  result?: {
    id: number;
    title: string;
    date_start: string;
    date_end: string;
    status: string;
    is_participating_available: boolean;
  }[];
}

interface PromosActivateProductsResponse {
  result?: {
    results: {
      product_id: number;
      is_updated: boolean;
      errors?: string[];
    }[];
  };
}
```

## Error Handling

```typescript
try {
  const result = await client.promos.activateProducts({
    action_id: 12345,
    products: [{
      product_id: 67890,
      action_price: '999',
      stock: 50
    }]
  });
} catch (error) {
  if (error.code === 'PROMOTION_NOT_FOUND') {
    console.error('Promotion not found or not available');
  } else if (error.code === 'PRODUCT_NOT_ELIGIBLE') {
    console.error('Product not eligible for this promotion');
  } else if (error.code === 'INVALID_PRICE') {
    console.error('Promotional price is invalid');
  } else {
    console.error('Promotion operation failed:', error.message);
  }
}
```

## Best Practices

1. **Eligibility Check** - Always verify product eligibility before joining promotions
2. **Price Strategy** - Set competitive promotional prices within campaign requirements
3. **Stock Management** - Ensure adequate inventory for promotional periods
4. **Request Processing** - Regularly process customer discount requests
5. **Performance Monitoring** - Track promotional campaign effectiveness
6. **Compliance** - Follow OZON promotional guidelines and terms

## Related APIs

- **[Product](./product.md)** - Product information for promotions
- **[Pricing Strategy](./pricing-strategy.md)** - Dynamic pricing management
- **[Analytics](./analytics.md)** - Promotion performance tracking
- **[Report](./report.md)** - Promotional campaign reporting