# Complex Logistics Workflows

This document outlines complex logistics workflows that span across multiple API categories in the OZON Seller API SDK. These workflows represent real-world business processes that require coordination between different API endpoints.

## Overview

The logistics workflows integrate the following API categories:
- **FBS** (22 endpoints) - Fulfillment by Seller operations
- **DeliveryFBS** (18 endpoints) - FBS delivery management and tracking  
- **FBOSupplyRequest** (18 endpoints) - FBO supply order management
- **FBS&rFBSMarks** (13 endpoints) - Product marking and exemplar management
- **FBO** (12 endpoints) - Fulfillment by OZON operations
- **DeliveryrFBS** (8 endpoints) - Return FBS delivery operations
- **RFBSReturnsAPI** (8 endpoints) - RFBS return processing
- **WarehouseAPI** (2 endpoints) - Warehouse management operations
- **SupplierAPI** (4 endpoints) - Supplier integration and management

## Workflow 1: Complete FBS Order Fulfillment

### Description
End-to-end process from posting creation to delivery completion for FBS (Fulfillment by Seller) orders.

### Process Flow
```
1. Posting Creation & Management (FBS)
   ↓
2. Product Marking & Validation (FBS&rFBSMarks)
   ↓
3. Shipping & Delivery Tracking (DeliveryFBS)
   ↓
4. Delivery Status Updates (DeliveryrFBS)
   ↓
5. Return Processing (RFBSReturnsAPI)
```

### Implementation Example
```typescript
// 1. Get available postings
const postings = await api.fbs.getPostingsList({
  filter: { status: ['awaiting_packaging'] },
  limit: 50
});

// 2. Upload marking codes if required
for (const posting of postings.postings || []) {
  await api.fbsRfbsMarks.uploadPostingCodes({
    posting_number: posting.posting_number,
    codes: [
      { sku: 'SKU123', gtd: 'marking_code_1', quantity: 1 }
    ]
  });
}

// 3. Create shipping labels
const labelResult = await api.fbs.createPackageLabel({
  posting_numbers: postings.postings?.map(p => p.posting_number!)
});

// 4. Update delivery status
await api.deliveryRfbs.setDelivering({
  posting_number: 'FBS-123456789',
  delivering_at: new Date().toISOString()
});

// 5. Complete delivery
await api.deliveryRfbs.setDelivered({
  posting_number: 'FBS-123456789',
  delivered_at: new Date().toISOString()
});
```

### Error Handling
- Validate marking codes before shipping
- Handle delivery failures and rescheduling
- Process returns if delivery fails

---

## Workflow 2: FBO Supply Chain Management

### Description
Complete supply order lifecycle from creation to warehouse delivery for FBO (Fulfillment by OZON) operations.

### Process Flow
```
1. Warehouse Selection (FBO)
   ↓
2. Supply Order Creation (FBOSupplyRequest)
   ↓
3. Timeslot Management (FBO)
   ↓
4. Cargo & Documentation (FBOSupplyRequest)
   ↓
5. Invoice Processing (SupplierAPI)
```

### Implementation Example
```typescript
// 1. Get available warehouses
const warehouses = await api.fbo.getWarehouseAvailability();
const selectedWarehouse = warehouses.warehouses?.[0];

// 2. Create supply order draft
const draftResult = await api.fboSupplyRequest.createDraft({
  supply_type: 'DIRECT',
  warehouse_id: selectedWarehouse?.warehouse_id,
  items: [
    { sku: 'SKU123', quantity: 100 }
  ]
});

// 3. Get available timeslots
const timeslots = await api.fbo.getSupplyOrderTimeslots({
  warehouse_id: selectedWarehouse?.warehouse_id,
  date_from: '2024-01-01T00:00:00Z',
  date_to: '2024-01-31T23:59:59Z'
});

// 4. Create supply order from draft
const orderResult = await api.fboSupplyRequest.createSupplyOrderFromDraft({
  draft_id: draftResult.draft?.draft_id,
  timeslot_id: timeslots.timeslots?.[0]?.timeslot_id
});

// 5. Set cargo information
await api.fboSupplyRequest.createCargoes({
  supply_order_id: orderResult.supply_order_id,
  cargoes: [
    {
      cargo_number: 'CARGO001',
      weight: 25.5,
      length: 40,
      width: 30,
      height: 20,
      items: [
        { sku: 'SKU123', quantity: 100 }
      ]
    }
  ]
});

// 6. Upload invoice
const invoiceFile = await api.supplier.uploadInvoiceFile({
  file: 'base64EncodedInvoice',
  file_name: 'supply_invoice.pdf'
});

await api.supplier.createOrUpdateInvoice({
  invoice_number: 'INV-2024-001',
  invoice_date: '2024-01-15',
  file_id: invoiceFile.file_id,
  total_amount: 10000.00,
  currency: 'RUB'
});
```

### Validation Points
- Warehouse capacity and availability
- Timeslot booking confirmation
- Cargo weight and dimension limits
- Invoice completeness and compliance

---

## Workflow 3: Product Marking Compliance

### Description
Comprehensive product marking workflow for items requiring mandatory marking (Честный ЗНАК).

### Process Flow
```
1. Exemplar Upload & Validation (FBS&rFBSMarks)
   ↓
2. Posting Code Management (FBS&rFBSMarks)
   ↓
3. Compliance Verification (FBS&rFBSMarks)
   ↓
4. Shipping Authorization (FBS)
```

### Implementation Example
```typescript
// 1. Upload marking exemplar
const exemplarResult = await api.fbsRfbsMarks.createProductExemplar({
  product_id: 123456,
  file: 'base64EncodedPDF',
  file_name: 'marking_exemplar.pdf'
});

// 2. Check exemplar status
const exemplarInfo = await api.fbsRfbsMarks.getProductExemplarInfo({
  task_id: exemplarResult.task_id
});

// 3. Validate exemplar
if (exemplarInfo.status === 'completed') {
  await api.fbsRfbsMarks.validateProductExemplar({
    exemplar_id: exemplarInfo.exemplar?.exemplar_id
  });
}

// 4. Upload marking codes for posting
await api.fbsRfbsMarks.uploadPostingCodes({
  posting_number: 'FBS-123456789',
  codes: [
    { sku: 'SKU123', gtd: 'marking_code_1', quantity: 1 },
    { sku: 'SKU456', gtd: 'marking_code_2', quantity: 2 }
  ]
});

// 5. Validate codes
const validationResult = await api.fbsRfbsMarks.validatePostingCodes({
  posting_number: 'FBS-123456789'
});

// 6. Check validation status
const validationStatus = await api.fbsRfbsMarks.getPostingCodesValidateStatus({
  task_id: validationResult.task_id
});

// 7. Ship only if validation passes
if (validationStatus.validation_result?.all_valid) {
  await api.fbs.shipPostings({
    posting_numbers: ['FBS-123456789']
  });
}
```

### Compliance Requirements
- Exemplar quality validation
- Code format verification
- Quantity matching
- Regulatory compliance

---

## Workflow 4: Returns Management

### Description
Complete returns processing workflow from customer request to resolution.

### Process Flow
```
1. Return Request Processing (RFBSReturnsAPI)
   ↓
2. Return Logistics (DeliveryrFBS)
   ↓
3. Quality Assessment (RFBSReturnsAPI)
   ↓
4. Resolution & Refund (RFBSReturnsAPI)
```

### Implementation Example
```typescript
// 1. Get pending returns
const returns = await api.rfbsReturns.getReturnsList({
  filter: {
    status: ['awaiting_approve'],
    created_since: '2024-01-01T00:00:00Z'
  }
});

// 2. Process each return
for (const returnItem of returns.returns || []) {
  // Get detailed return information
  const returnDetails = await api.rfbsReturns.getReturn({
    return_id: returnItem.return_id
  });

  // Approve return for inspection
  await api.rfbsReturns.setAction({
    return_id: returnItem.return_id,
    action: 'approve',
    comment: 'Return approved for inspection'
  });

  // Set return logistics
  await api.deliveryRfbs.setTimeslot({
    posting_number: returnDetails.return?.posting_number,
    timeslot_date: '2024-01-25'
  });

  // After receiving the product
  await api.rfbsReturns.setAction({
    return_id: returnItem.return_id,
    action: 'receive_return',
    comment: 'Product received for quality check'
  });

  // Process refund based on condition
  const productCondition = 'good'; // Assessment result
  
  if (productCondition === 'good') {
    await api.rfbsReturns.setAction({
      return_id: returnItem.return_id,
      action: 'return_money',
      comment: 'Full refund - product in good condition'
    });
  } else {
    await api.rfbsReturns.setAction({
      return_id: returnItem.return_id,
      action: 'compensate',
      comment: 'Partial compensation due to product condition',
      compensation_amount: 500.00
    });
  }
}
```

### Decision Points
- Return eligibility assessment
- Product condition evaluation
- Refund amount calculation
- Customer communication

---

## Workflow 5: Multi-Warehouse Operations

### Description
Managing operations across multiple warehouses with different fulfillment models.

### Process Flow
```
1. Warehouse Discovery (WarehouseAPI)
   ↓
2. Capacity Assessment (FBO)
   ↓
3. Order Distribution (FBS/FBO)
   ↓
4. Delivery Coordination (DeliveryFBS/DeliveryrFBS)
```

### Implementation Example
```typescript
// 1. Get all available warehouses
const warehouseList = await api.warehouse.getWarehousesList();
const fboWarehouses = await api.fbo.getWarehouseAvailability();

// 2. Assess warehouse capacities
const warehouseCapacity = fboWarehouses.warehouses?.map(warehouse => ({
  id: warehouse.warehouse_id,
  name: warehouse.name,
  utilization: warehouse.capacity_utilization,
  processingDays: warehouse.processing_days
}));

// 3. Get delivery methods for each warehouse
const warehouseOptions = await Promise.all(
  warehouseList.warehouses?.map(async (warehouse) => {
    const deliveryMethods = await api.warehouse.getDeliveryMethods({
      warehouse_id: warehouse.warehouse_id
    });
    
    return {
      warehouse,
      deliveryMethods: deliveryMethods.delivery_methods
    };
  }) || []
);

// 4. Optimize order distribution
function optimizeWarehouseSelection(orders: any[], warehouses: any[]) {
  return orders.map(order => {
    // Select warehouse based on:
    // - Capacity utilization
    // - Processing time
    // - Delivery cost
    // - Geographic proximity
    
    const optimalWarehouse = warehouses
      .filter(w => w.warehouse.is_active)
      .sort((a, b) => {
        const scoreA = calculateScore(a, order);
        const scoreB = calculateScore(b, order);
        return scoreB - scoreA;
      })[0];
    
    return { order, warehouse: optimalWarehouse };
  });
}

function calculateScore(warehouseOption: any, order: any): number {
  const { warehouse, deliveryMethods } = warehouseOption;
  
  // Scoring algorithm considering multiple factors
  let score = 100;
  
  // Penalize high utilization
  score -= (warehouse.capacity_utilization || 0) * 0.5;
  
  // Penalize long processing times
  score -= (warehouse.processing_days || 0) * 2;
  
  // Reward available delivery methods
  score += (deliveryMethods?.length || 0) * 5;
  
  return score;
}
```

### Optimization Factors
- Warehouse capacity utilization
- Processing time efficiency
- Delivery cost optimization
- Geographic distribution

---

## Workflow 6: Quality Assurance & Compliance

### Description
Comprehensive quality assurance workflow spanning all logistics operations.

### Implementation Strategy
```typescript
class LogisticsQualityAssurance {
  async performQualityChecks(operation: string, data: any) {
    switch (operation) {
      case 'posting_creation':
        return this.validatePostingData(data);
      case 'marking_compliance':
        return this.validateMarkingCompliance(data);
      case 'shipping_readiness':
        return this.validateShippingReadiness(data);
      case 'return_processing':
        return this.validateReturnProcessing(data);
    }
  }

  private async validatePostingData(posting: any) {
    // Validate required fields
    // Check product availability
    // Verify pricing accuracy
    // Confirm delivery address
  }

  private async validateMarkingCompliance(posting: any) {
    // Check marking requirements
    // Validate exemplar status
    // Verify code quantities
    // Confirm regulatory compliance
  }

  private async validateShippingReadiness(posting: any) {
    // Verify packaging requirements
    // Check weight and dimensions
    // Confirm delivery method
    // Validate tracking setup
  }

  private async validateReturnProcessing(returnData: any) {
    // Verify return eligibility
    // Check product condition
    // Validate refund calculations
    // Confirm compliance with policies
  }
}
```

## Error Handling Patterns

### Retry Strategies
```typescript
class LogisticsErrorHandler {
  async withRetry<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    delay: number = 1000
  ): Promise<T> {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        if (attempt === maxRetries) throw error;
        
        if (this.isRetryableError(error)) {
          await this.sleep(delay * attempt);
          continue;
        }
        
        throw error;
      }
    }
    throw new Error('Max retries exceeded');
  }

  private isRetryableError(error: any): boolean {
    // Network errors
    // Temporary server errors
    // Rate limiting
    return error.code === 'NETWORK_ERROR' || 
           error.status === 429 || 
           error.status >= 500;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

### Circuit Breaker Pattern
```typescript
class LogisticsCircuitBreaker {
  private failures = 0;
  private lastFailTime = 0;
  private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';

  async execute<T>(operation: () => Promise<T>): Promise<T> {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailTime > 60000) { // 1 minute
        this.state = 'HALF_OPEN';
      } else {
        throw new Error('Circuit breaker is OPEN');
      }
    }

    try {
      const result = await operation();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess() {
    this.failures = 0;
    this.state = 'CLOSED';
  }

  private onFailure() {
    this.failures++;
    this.lastFailTime = Date.now();
    
    if (this.failures >= 5) {
      this.state = 'OPEN';
    }
  }
}
```

## Performance Optimization

### Batch Operations
```typescript
class LogisticsBatchProcessor {
  async processBatch<T, R>(
    items: T[],
    processor: (item: T) => Promise<R>,
    batchSize: number = 10,
    concurrency: number = 3
  ): Promise<R[]> {
    const results: R[] = [];
    
    for (let i = 0; i < items.length; i += batchSize) {
      const batch = items.slice(i, i + batchSize);
      const batchPromises = batch.map(item => processor(item));
      
      // Process with limited concurrency
      const batchResults = await this.limitConcurrency(batchPromises, concurrency);
      results.push(...batchResults);
    }
    
    return results;
  }

  private async limitConcurrency<T>(
    promises: Promise<T>[],
    limit: number
  ): Promise<T[]> {
    const results: T[] = [];
    
    for (let i = 0; i < promises.length; i += limit) {
      const batch = promises.slice(i, i + limit);
      const batchResults = await Promise.all(batch);
      results.push(...batchResults);
    }
    
    return results;
  }
}
```

## Monitoring & Observability

### Workflow Metrics
```typescript
class LogisticsMetrics {
  private metrics = new Map<string, number>();
  
  trackWorkflowDuration(workflow: string, duration: number) {
    this.metrics.set(`${workflow}_duration`, duration);
  }
  
  trackErrorRate(workflow: string, errors: number, total: number) {
    this.metrics.set(`${workflow}_error_rate`, errors / total);
  }
  
  trackThroughput(workflow: string, processed: number, timeWindow: number) {
    this.metrics.set(`${workflow}_throughput`, processed / timeWindow);
  }
  
  getMetrics() {
    return Object.fromEntries(this.metrics);
  }
}
```

## Conclusion

These complex logistics workflows demonstrate the power of the integrated OZON Seller API SDK. By combining multiple API categories, developers can implement sophisticated business processes that handle the complete logistics lifecycle from order creation to delivery and returns management.

Key benefits:
- **End-to-end visibility** across the entire logistics pipeline
- **Automated compliance** with marking and regulatory requirements  
- **Optimized operations** through intelligent warehouse selection
- **Robust error handling** with retry and circuit breaker patterns
- **Performance optimization** through batch processing and concurrency control
- **Comprehensive monitoring** with metrics and observability

The workflows are designed to be resilient, performant, and maintainable, providing a solid foundation for building production-ready logistics management systems.