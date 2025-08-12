# FboSupplyRequest API Documentation

The FboSupplyRequest API allows you to manage FBO supply requests - from draft creation through supply order management, including cargo operations and warehouse coordination.

## Table of Contents

- [Basic Usage](#basic-usage)
- [Draft Operations](#draft-operations)
- [Supply Operations](#supply-operations)
- [Cargoes Operations](#cargoes-operations)
- [Supply Order Operations](#supply-order-operations)
- [Complete Workflow Example](#complete-workflow-example)
- [Error Handling](#error-handling)
- [Best Practices](#best-practices)

## Basic Usage

```typescript
import { OzonClient } from '@ozon/sdk';

const client = new OzonClient({
  clientId: process.env.OZON_CLIENT_ID!,
  apiKey: process.env.OZON_API_KEY!,
});

// Access FboSupplyRequest API through the client
const clusters = await client.fboSupplyRequest.getClusterList({
  cluster_type: 'CLUSTER_TYPE_OZON'
});
```

## Draft Operations

Draft operations help you plan and prepare supply requests before committing to them.

### Get Cluster Information

Retrieve information about available clusters and their warehouses:

```typescript
const clusters = await client.fboSupplyRequest.getClusterList({
  cluster_type: 'CLUSTER_TYPE_OZON', // or 'CLUSTER_TYPE_CIS'
  cluster_ids: ['1', '2'] // optional filter
});

console.log('Available clusters:');
clusters.result.clusters?.forEach(cluster => {
  console.log(`${cluster.name} (ID: ${cluster.id})`);
  cluster.logistic_clusters?.forEach(logCluster => {
    logCluster.warehouses?.forEach(warehouse => {
      console.log(`  - ${warehouse.name} (${warehouse.type})`);
    });
  });
});
```

### Search Warehouses

Find suitable warehouses for your supply type:

```typescript
const warehouses = await client.fboSupplyRequest.getWarehouseFboList({
  filter_by_supply_type: ['CREATE_TYPE_CROSSDOCK', 'CREATE_TYPE_DIRECT'],
  search: 'Moscow' // search by warehouse name
});

console.log('Found warehouses:');
warehouses.result.warehouses?.forEach(warehouse => {
  console.log(`${warehouse.name} - ${warehouse.address}`);
  console.log(`  Type: ${warehouse.type}`);
  console.log(`  Coordinates: ${warehouse.coordinate?.latitude}, ${warehouse.coordinate?.longitude}`);
});
```

### Create Supply Draft

Create a draft supply request with your products:

```typescript
const draft = await client.fboSupplyRequest.createDraft({
  warehouse_id: 22204339479000,
  cluster_id: '1',
  supply_type: 'CREATE_TYPE_CROSSDOCK',
  items: [
    { sku: 12345, quantity: 50 },
    { sku: 67890, quantity: 25 }
  ]
});

console.log(`Draft created: ${draft.result.draft_id}`);
```

### Monitor Draft Processing

Check the status of your draft and get calculation results:

```typescript
const draftInfo = await client.fboSupplyRequest.getDraftCreateInfo({
  draft_id: 'draft-123'
});

console.log(`Draft status: ${draftInfo.result.calculation_status}`);

if (draftInfo.result.calculation_status === 'CALCULATION_STATUS_SUCCESS') {
  console.log('Draft is ready for supply creation');
  
  // Get available timeslots
  const timeslots = await client.fboSupplyRequest.getDraftTimeslotInfo({
    draft_id: 'draft-123',
    warehouse_id: 22204339479000
  });
  
  console.log('Available delivery timeslots:');
  timeslots.result.days?.forEach(day => {
    console.log(`${day.date}:`);
    day.time_slots?.forEach(slot => {
      if (slot.available) {
        console.log(`  ${slot.time_from} - ${slot.time_to}`);
      }
    });
  });
}
```

## Supply Operations

Convert approved drafts into actual supplies.

### Create Supply from Draft

Convert a draft into an active supply with a selected timeslot:

```typescript
const supply = await client.fboSupplyRequest.createSupply({
  draft_id: 'draft-123',
  timeslot_id: 'slot-456'
});

console.log(`Supply creation started: ${supply.result.request_id}`);
```

### Monitor Supply Creation

Track the progress of supply creation:

```typescript
const checkSupplyStatus = async (requestId: string) => {
  const status = await client.fboSupplyRequest.getSupplyCreateStatus({
    request_id: requestId
  });
  
  console.log(`Supply creation status: ${status.result.status}`);
  
  switch (status.result.status) {
    case 'DraftSupplyCreateStatusSuccess':
      console.log(`Supply created successfully: ${status.result.result?.supply_id}`);
      break;
    case 'DraftSupplyCreateStatusFailed':
      console.log('Supply creation failed');
      break;
    case 'DraftSupplyCreateStatusInProgress':
      console.log('Supply creation in progress...');
      // Poll again after a delay
      setTimeout(() => checkSupplyStatus(requestId), 5000);
      break;
  }
};

await checkSupplyStatus('req-789');
```

## Cargoes Operations

Manage cargo creation, labeling, and organization within supplies.

### Create Cargoes

Organize your supply into logical cargo units:

```typescript
const cargoes = await client.fboSupplyRequest.createCargoes({
  supply_id: 'supply-123',
  cargoes: [
    {
      cargo_type: 'BOX',
      items: [
        { sku: 12345, quantity: 25 },
        { sku: 67890, quantity: 10 }
      ]
    },
    {
      cargo_type: 'PALLET',
      items: [
        { sku: 11111, quantity: 100 }
      ]
    }
  ]
});

console.log(`Cargo creation started: ${cargoes.result.request_id}`);
```

### Monitor Cargo Creation

Check cargo creation status and get cargo IDs:

```typescript
const cargoStatus = await client.fboSupplyRequest.getCargoesCreateInfo({
  request_id: 'req-456'
});

if (cargoStatus.result.status === 'SUCCESS') {
  console.log('Cargoes created successfully:');
  cargoStatus.result.result?.cargoes?.forEach(cargo => {
    console.log(`  Cargo ${cargo.cargo_id}: ${cargo.cargo_type}`);
  });
}
```

### Get Cargo Rules

Understanding requirements and limitations:

```typescript
const rules = await client.fboSupplyRequest.getCargoesRules({
  supply_id: 'supply-123'
});

const supplyCheck = rules.result.supply_check;
console.log('Supply requirements:');
console.log(`Min cargo count: ${supplyCheck?.cargo_present?.min_cargo_count}`);
console.log(`Valid distribution: ${supplyCheck?.is_valid_distribution?.is_valid}`);
```

### Create and Manage Labels

Generate shipping labels for your cargoes:

```typescript
// Create labels
const labelJob = await client.fboSupplyRequest.createCargoesLabel({
  cargoes: ['cargo-123', 'cargo-456'],
  label_format: 'PDF'
});

console.log(`Label creation started: ${labelJob.result.request_id}`);

// Check label status
const labelStatus = await client.fboSupplyRequest.getCargoesLabel({
  request_id: labelJob.result.request_id
});

if (labelStatus.result.status === 'SUCCESS') {
  const fileGuid = labelStatus.result.result?.file_guid;
  
  if (fileGuid) {
    // Download the PDF file
    const labelFile = await client.fboSupplyRequest.getCargoesLabelFile(fileGuid);
    
    // Save or process the PDF data
    console.log(`Downloaded label PDF: ${labelFile.data.byteLength} bytes`);
  }
}
```

### Delete Cargoes

Remove cargoes if needed:

```typescript
const deleteResult = await client.fboSupplyRequest.deleteCargoes({
  cargo_ids: ['cargo-123']
});

// Monitor deletion status
const deleteStatus = await client.fboSupplyRequest.getCargoesDeleteStatus({
  request_id: deleteResult.result.request_id
});

if (deleteStatus.result.status === 'SUCCESS') {
  console.log('Cargoes deleted successfully');
}
```

## Supply Order Operations

Manage active supply orders - cancellations and content updates.

### Cancel Supply Order

Cancel a supply order with a reason:

```typescript
const cancellation = await client.fboSupplyRequest.cancelSupplyOrder({
  supply_order_id: 123456,
  reason: 'Inventory shortage'
});

console.log(`Cancellation request: ${cancellation.result.request_id}`);

// Check cancellation status
const cancelStatus = await client.fboSupplyRequest.getSupplyOrderCancelStatus({
  request_id: cancellation.result.request_id
});

if (cancelStatus.result.status === 'SUCCESS') {
  console.log('Supply order cancelled successfully');
  console.log('Cancelled supplies:', cancelStatus.result.result?.cancelled_supply_ids);
}
```

### Update Supply Order Content

Modify quantities or add/remove products:

```typescript
const updateResult = await client.fboSupplyRequest.updateSupplyOrderContent({
  supply_order_id: 123456,
  items: [
    { sku: 12345, quantity: 30 }, // reduced quantity
    { sku: 99999, quantity: 10 }  // new item
  ]
});

console.log(`Content update request: ${updateResult.result.request_id}`);

// Monitor update status
const updateStatus = await client.fboSupplyRequest.getSupplyOrderContentUpdateStatus({
  request_id: updateResult.result.request_id
});

if (updateStatus.result.status === 'SUCCESS') {
  console.log(`Updated ${updateStatus.result.updated_items_count} items`);
}
```

## Complete Workflow Example

Here's a complete workflow from warehouse search to supply creation:

```typescript
async function createSupplyRequest(products: Array<{ sku: number; quantity: number }>) {
  try {
    // 1. Find suitable warehouses
    console.log('🔍 Searching for warehouses...');
    const warehouses = await client.fboSupplyRequest.getWarehouseFboList({
      filter_by_supply_type: ['CREATE_TYPE_CROSSDOCK'],
      search: 'Moscow'
    });
    
    const selectedWarehouse = warehouses.result.warehouses?.[0];
    if (!selectedWarehouse) {
      throw new Error('No suitable warehouses found');
    }
    
    console.log(`📦 Selected warehouse: ${selectedWarehouse.name}`);
    
    // 2. Get cluster information
    const clusters = await client.fboSupplyRequest.getClusterList({
      cluster_type: 'CLUSTER_TYPE_OZON'
    });
    
    const selectedCluster = clusters.result.clusters?.[0];
    if (!selectedCluster) {
      throw new Error('No clusters available');
    }
    
    // 3. Create draft
    console.log('📝 Creating draft...');
    const draft = await client.fboSupplyRequest.createDraft({
      warehouse_id: selectedWarehouse.warehouse_id!,
      cluster_id: selectedCluster.id!.toString(),
      supply_type: 'CREATE_TYPE_CROSSDOCK',
      items: products
    });
    
    console.log(`✅ Draft created: ${draft.result.draft_id}`);
    
    // 4. Wait for draft processing
    console.log('⏳ Processing draft...');
    let draftReady = false;
    let attempts = 0;
    
    while (!draftReady && attempts < 10) {
      const draftInfo = await client.fboSupplyRequest.getDraftCreateInfo({
        draft_id: draft.result.draft_id!
      });
      
      if (draftInfo.result.calculation_status === 'CALCULATION_STATUS_SUCCESS') {
        draftReady = true;
        console.log('✅ Draft processing completed');
      } else if (draftInfo.result.calculation_status === 'CALCULATION_STATUS_FAILED') {
        throw new Error('Draft processing failed');
      } else {
        console.log('⏳ Still processing...');
        await new Promise(resolve => setTimeout(resolve, 3000));
        attempts++;
      }
    }
    
    // 5. Get available timeslots
    console.log('📅 Getting available timeslots...');
    const timeslots = await client.fboSupplyRequest.getDraftTimeslotInfo({
      draft_id: draft.result.draft_id!,
      warehouse_id: selectedWarehouse.warehouse_id!
    });
    
    const availableSlot = timeslots.result.days?.[0]?.time_slots?.[0];
    if (!availableSlot?.available) {
      throw new Error('No available timeslots');
    }
    
    console.log(`📅 Selected timeslot: ${availableSlot.time_from} - ${availableSlot.time_to}`);
    
    // 6. Create supply
    console.log('🚛 Creating supply...');
    const supply = await client.fboSupplyRequest.createSupply({
      draft_id: draft.result.draft_id!,
      timeslot_id: availableSlot.timeslot_id!
    });
    
    // 7. Monitor supply creation
    let supplyReady = false;
    attempts = 0;
    
    while (!supplyReady && attempts < 10) {
      const supplyStatus = await client.fboSupplyRequest.getSupplyCreateStatus({
        request_id: supply.result.request_id!
      });
      
      if (supplyStatus.result.status === 'DraftSupplyCreateStatusSuccess') {
        supplyReady = true;
        console.log(`🎉 Supply created successfully: ${supplyStatus.result.result?.supply_id}`);
        return supplyStatus.result.result?.supply_id;
      } else if (supplyStatus.result.status === 'DraftSupplyCreateStatusFailed') {
        throw new Error('Supply creation failed');
      } else {
        console.log('⏳ Creating supply...');
        await new Promise(resolve => setTimeout(resolve, 3000));
        attempts++;
      }
    }
    
    throw new Error('Supply creation timed out');
    
  } catch (error) {
    console.error('❌ Supply request failed:', error);
    throw error;
  }
}

// Usage
const supplyId = await createSupplyRequest([
  { sku: 12345, quantity: 50 },
  { sku: 67890, quantity: 25 }
]);
```

## Error Handling

Handle various error scenarios properly:

```typescript
import { OzonApiError, RateLimitError, ValidationError } from '@ozon/sdk';

try {
  const draft = await client.fboSupplyRequest.createDraft({
    warehouse_id: -1, // Invalid warehouse ID
    cluster_id: '1',
    supply_type: 'CREATE_TYPE_CROSSDOCK',
    items: []
  });
} catch (error) {
  if (error instanceof ValidationError) {
    console.error('Validation error:', error.message);
    console.error('Invalid fields:', error.details);
  } else if (error instanceof RateLimitError) {
    console.error('Rate limited. Retry after:', error.retryAfter, 'seconds');
  } else if (error instanceof OzonApiError) {
    console.error(`API Error ${error.code}: ${error.message}`);
    
    // Handle specific FboSupplyRequest error codes
    switch (error.code) {
      case 3:
        console.error('Invalid request parameters');
        break;
      case 16:
        console.error('Authentication failed - check your API credentials');
        break;
      default:
        console.error('Unknown FboSupplyRequest API error');
    }
  } else {
    console.error('Unexpected error:', error);
  }
}
```

## Best Practices

### 1. Efficient Warehouse Selection

Always search for warehouses that match your supply requirements:

```typescript
// Good: Filter by supply type
const warehouses = await client.fboSupplyRequest.getWarehouseFboList({
  filter_by_supply_type: ['CREATE_TYPE_CROSSDOCK'], // Only crossdock warehouses
  search: 'Moscow' // Geographic filter
});

// Select based on your criteria
const selectedWarehouse = warehouses.result.warehouses?.find(w => 
  w.type === 'CROSS_DOCK' && w.coordinate?.latitude // Has coordinates for mapping
);
```

### 2. Draft Validation Workflow

Always validate drafts before creating supplies:

```typescript
async function validateAndCreateSupply(draftId: string) {
  const draftInfo = await client.fboSupplyRequest.getDraftCreateInfo({
    draft_id: draftId
  });
  
  // Check calculation status
  if (draftInfo.result.calculation_status !== 'CALCULATION_STATUS_SUCCESS') {
    throw new Error('Draft not ready for supply creation');
  }
  
  // Check for validation errors
  if (draftInfo.result.items_validation?.has_errors) {
    console.warn('Draft has validation warnings');
    // Handle or log warnings
  }
  
  // Proceed with supply creation
  return createSupplyFromDraft(draftId);
}
```

### 3. Cargo Organization Strategy

Organize products into logical cargo units:

```typescript
function organizeCargoes(products: Array<{ sku: number; quantity: number; size: 'small' | 'large' }>) {
  const boxItems = products.filter(p => p.size === 'small');
  const palletItems = products.filter(p => p.size === 'large');
  
  const cargoes = [];
  
  // Group small items into boxes
  if (boxItems.length > 0) {
    cargoes.push({
      cargo_type: 'BOX' as const,
      items: boxItems
    });
  }
  
  // Large items on pallets
  palletItems.forEach(item => {
    cargoes.push({
      cargo_type: 'PALLET' as const,
      items: [item]
    });
  });
  
  return cargoes;
}
```

### 4. Asynchronous Operation Monitoring

Implement proper polling with timeouts:

```typescript
async function pollOperationStatus<T>(
  checkStatus: () => Promise<{ status: string; result?: T }>,
  successStatus: string,
  failureStatus: string,
  timeoutMs = 60000,
  intervalMs = 3000
): Promise<T> {
  const startTime = Date.now();
  
  while (Date.now() - startTime < timeoutMs) {
    const status = await checkStatus();
    
    if (status.status === successStatus) {
      return status.result!;
    }
    
    if (status.status === failureStatus) {
      throw new Error(`Operation failed with status: ${status.status}`);
    }
    
    await new Promise(resolve => setTimeout(resolve, intervalMs));
  }
  
  throw new Error('Operation timed out');
}

// Usage
const supplyId = await pollOperationStatus(
  () => client.fboSupplyRequest.getSupplyCreateStatus({ request_id: 'req-123' }),
  'DraftSupplyCreateStatusSuccess',
  'DraftSupplyCreateStatusFailed'
);
```

### 5. Label Management

Efficiently handle label creation and file management:

```typescript
async function createAndDownloadLabels(cargoIds: string[]): Promise<ArrayBuffer> {
  // Create label job
  const labelJob = await client.fboSupplyRequest.createCargoesLabel({
    cargoes: cargoIds,
    label_format: 'PDF'
  });
  
  // Poll for completion
  const labelResult = await pollOperationStatus(
    () => client.fboSupplyRequest.getCargoesLabel({
      request_id: labelJob.result.request_id!
    }),
    'SUCCESS',
    'FAILED'
  );
  
  // Download the file
  const fileGuid = labelResult.result?.file_guid;
  if (!fileGuid) {
    throw new Error('No file GUID provided');
  }
  
  const file = await client.fboSupplyRequest.getCargoesLabelFile(fileGuid);
  return file.data;
}
```

### 6. Resource Cleanup

Clean up resources when operations fail:

```typescript
async function createSupplyWithCleanup(draftId: string, timeslotId: string) {
  let supplyId: string | undefined;
  
  try {
    const supply = await client.fboSupplyRequest.createSupply({
      draft_id: draftId,
      timeslot_id: timeslotId
    });
    
    supplyId = supply.result.supply_id;
    
    // Continue with cargo creation...
    
  } catch (error) {
    // Cleanup: cancel supply if it was created but cargo creation failed
    if (supplyId) {
      try {
        await client.fboSupplyRequest.cancelSupplyOrder({
          supply_order_id: parseInt(supplyId),
          reason: 'Automatic cleanup due to error'
        });
      } catch (cleanupError) {
        console.warn('Failed to cleanup supply:', cleanupError);
      }
    }
    
    throw error;
  }
}
```