# FBO Supply Request - Draft & Order Management

**Draft & Order Management** - Supply order draft creation, lifecycle management, and order operations for FBO Supply Request API.

## Overview

Draft & Order Management handles the complete supply order lifecycle from initial draft creation through final order processing. This includes draft validation, timeslot coordination, order creation, cancellation, and content updates across 8 specialized methods.

---

## 📋 Methods Overview

### 📝 Draft Operations (4 methods)
1. **createDraft** - Create supply order draft
2. **getDraftInfo** - Get draft information and status
3. **getTimeslotInfo** - Get available delivery timeslots
4. **createSupplyOrderFromDraft** - Convert draft to supply order

### 📦 Order Management (4 methods)
5. **getSupplyOrderCreateStatus** - Get order creation status
6. **cancelSupplyOrder** - Cancel existing supply order
7. **getSupplyOrderCancelStatus** - Get cancellation status
8. **updateSupplyOrderContent** - Update order product content

---

## 📝 Draft Operations Methods

### createDraft()
Creates supply order draft with product specifications and warehouse assignment.

```typescript
interface FboSupplyRequestDraftCreateRequest {
  supply_type: 'DIRECT' | 'CROSS_DOCK';
  warehouse_id: number;
  items: Array<{
    sku: string;
    quantity: number;
  }>;
}

interface FboSupplyRequestDraftCreateResponse {
  draft?: {
    draft_id?: string;
    supply_type?: 'DIRECT' | 'CROSS_DOCK';
    warehouse_id?: number;
    warehouse?: {
      name?: string;
      address?: string;
      type?: string;
      working_hours?: Record<string, { start: string; end: string; }>;
    };
    items?: Array<{
      sku?: string;
      name?: string;
      quantity?: number;
      available_quantity?: number;
      dimensions?: {
        weight?: number;
        width?: number;
        height?: number;
        length?: number;
      };
      validation_status?: 'valid' | 'invalid' | 'warning';
      validation_messages?: string[];
    }>;
    total_items?: number;
    total_quantity?: number;
    estimated_weight?: number;
    estimated_pallets?: number;
    status?: 'created' | 'validated' | 'ready' | 'error';
    validation_errors?: string[];
    created_at?: string;
  };
}

// Usage Example
const draft = await fboSupplyRequestApi.createDraft({
  supply_type: 'DIRECT',
  warehouse_id: 123,
  items: [
    { sku: '123456789', quantity: 10 },
    { sku: '987654321', quantity: 5 },
    { sku: '555666777', quantity: 20 },
    { sku: '111222333', quantity: 8 }
  ]
});

if (draft.draft) {
  console.log(`✅ Draft created: ${draft.draft.draft_id}`);
  console.log(`Supply type: ${draft.draft.supply_type}`);
  console.log(`Warehouse: ${draft.draft.warehouse?.name}`);
  console.log(`Total items: ${draft.draft.total_items}`);
  console.log(`Total quantity: ${draft.draft.total_quantity}`);
  console.log(`Estimated pallets: ${draft.draft.estimated_pallets}`);
  
  // Validate items
  console.log('\n📦 Items validation:');
  draft.draft.items?.forEach((item, index) => {
    const status = item.validation_status === 'valid' ? '✅' : 
                  item.validation_status === 'warning' ? '⚠️' : '❌';
    
    console.log(`${index + 1}. ${item.name} (${item.sku})`);
    console.log(`   Status: ${status} ${item.validation_status}`);
    console.log(`   Requested: ${item.quantity}, Available: ${item.available_quantity}`);
    
    if (item.dimensions) {
      console.log(`   Dimensions: ${item.dimensions.length}x${item.dimensions.width}x${item.dimensions.height}mm`);
      console.log(`   Weight: ${item.dimensions.weight}g`);
    }
    
    if (item.validation_messages?.length) {
      item.validation_messages.forEach(msg => {
        console.log(`   📝 ${msg}`);
      });
    }
  });
  
  // Check overall validation
  if (draft.draft.status === 'error' || draft.draft.validation_errors?.length) {
    console.log('\n❌ Draft validation errors:');
    draft.draft.validation_errors?.forEach(error => {
      console.log(`  - ${error}`);
    });
  } else if (draft.draft.status === 'ready') {
    console.log('\n✅ Draft is ready for supply order creation');
  }
}
```

### getDraftInfo()
Gets detailed information about existing draft including current status and validation results.

```typescript
interface FboSupplyRequestDraftCreateInfoRequest {
  draft_id: string;
}

// Response interface same as createDraft response

// Usage Example
const draftInfo = await fboSupplyRequestApi.getDraftInfo({
  draft_id: 'draft_12345'
});

if (draftInfo.draft) {
  console.log(`Draft Status: ${draftInfo.draft.status}`);
  console.log(`Created: ${draftInfo.draft.created_at}`);
  console.log(`Items: ${draftInfo.draft.total_items}`);
  
  // Show warehouse information
  if (draftInfo.draft.warehouse) {
    const warehouse = draftInfo.draft.warehouse;
    console.log(`\n🏢 Warehouse: ${warehouse.name}`);
    console.log(`Type: ${warehouse.type}`);
    console.log(`Address: ${warehouse.address}`);
    
    // Working hours
    if (warehouse.working_hours) {
      console.log('Working hours:');
      Object.entries(warehouse.working_hours).forEach(([day, hours]) => {
        console.log(`  ${day}: ${hours.start} - ${hours.end}`);
      });
    }
  }
  
  // Item details
  console.log('\n📋 Items breakdown:');
  draftInfo.draft.items?.forEach((item, index) => {
    console.log(`${index + 1}. ${item.name}`);
    console.log(`   SKU: ${item.sku}`);
    console.log(`   Quantity: ${item.quantity}`);
    console.log(`   Status: ${item.validation_status}`);
  });
}
```

### getTimeslotInfo()
Gets available delivery timeslots for warehouse within specified date range.

```typescript
interface FboSupplyRequestDraftTimeslotInfoRequest {
  warehouse_id: number;
  date_from: string;    // YYYY-MM-DD format
  date_to: string;      // YYYY-MM-DD format
}

interface FboSupplyRequestDraftTimeslotInfoResponse {
  warehouse_info?: {
    warehouse_id?: number;
    name?: string;
    type?: string;
    max_pallets_per_slot?: number;
  };
  
  timeslots?: Array<{
    timeslot_id?: string;
    date?: string;        // YYYY-MM-DD
    start_time?: string;  // HH:MM
    end_time?: string;    // HH:MM
    duration?: number;    // minutes
    
    is_available?: boolean;
    available_pallets?: number;
    max_pallets?: number;
    current_bookings?: number;
    
    // Pricing
    base_cost?: number;
    peak_hour_multiplier?: number;
    total_cost?: number;
    
    // Conditions
    weather_conditions?: 'good' | 'fair' | 'poor';
    traffic_conditions?: 'light' | 'moderate' | 'heavy';
    
    // Restrictions
    restrictions?: {
      min_pallets?: number;
      max_pallets?: number;
      vehicle_types?: string[];
      special_requirements?: string[];
    };
    
    // Recommendations
    recommended?: boolean;
    recommendation_reason?: string;
  }>;
  
  total_available_slots?: number;
  recommended_slot_id?: string;
}

// Usage Example
const timeslots = await fboSupplyRequestApi.getTimeslotInfo({
  warehouse_id: 123,
  date_from: '2024-01-15',
  date_to: '2024-01-22'
});

console.log(`Warehouse: ${timeslots.warehouse_info?.name}`);
console.log(`Found ${timeslots.total_available_slots} available timeslots`);

if (timeslots.recommended_slot_id) {
  console.log(`Recommended slot: ${timeslots.recommended_slot_id}`);
}

console.log('\n📅 Available Timeslots:');
timeslots.timeslots?.forEach((slot, index) => {
  const statusIcon = slot.is_available ? '✅' : '❌';
  const recommendedIcon = slot.recommended ? '⭐' : '';
  
  console.log(`\n${index + 1}. ${statusIcon}${recommendedIcon} ${slot.timeslot_id}`);
  console.log(`   Date: ${slot.date}`);
  console.log(`   Time: ${slot.start_time} - ${slot.end_time} (${slot.duration} min)`);
  
  if (slot.is_available) {
    console.log(`   Capacity: ${slot.available_pallets}/${slot.max_pallets} pallets`);
    console.log(`   Bookings: ${slot.current_bookings}`);
    
    // Pricing
    if (slot.total_cost) {
      console.log(`   Cost: ${slot.base_cost} RUB`);
      if (slot.peak_hour_multiplier && slot.peak_hour_multiplier > 1) {
        console.log(`   Peak hour: ${slot.peak_hour_multiplier}x (Total: ${slot.total_cost} RUB)`);
      }
    }
    
    // Conditions
    console.log(`   Weather: ${slot.weather_conditions}, Traffic: ${slot.traffic_conditions}`);
    
    // Restrictions
    if (slot.restrictions) {
      const restr = slot.restrictions;
      if (restr.min_pallets || restr.max_pallets) {
        console.log(`   Pallet limits: ${restr.min_pallets || 0} - ${restr.max_pallets || 'unlimited'}`);
      }
      if (restr.vehicle_types?.length) {
        console.log(`   Vehicle types: ${restr.vehicle_types.join(', ')}`);
      }
      if (restr.special_requirements?.length) {
        console.log(`   Requirements: ${restr.special_requirements.join(', ')}`);
      }
    }
    
    // Recommendation
    if (slot.recommended && slot.recommendation_reason) {
      console.log(`   🎯 ${slot.recommendation_reason}`);
    }
  }
});
```

### createSupplyOrderFromDraft()
Converts validated draft into actual supply order with selected timeslot.

```typescript
interface FboSupplyRequestDraftSupplyCreateRequest {
  draft_id: string;
  timeslot_id: string;
}

interface FboSupplyRequestDraftSupplyCreateResponse {
  task_id?: string;
  status?: 'pending' | 'processing' | 'completed' | 'error';
  estimated_completion?: string;
}

// Usage Example
const createOrderTask = await fboSupplyRequestApi.createSupplyOrderFromDraft({
  draft_id: 'draft_12345',
  timeslot_id: 'slot_67890'
});

console.log(`✅ Supply order creation initiated`);
console.log(`Task ID: ${createOrderTask.task_id}`);
console.log(`Status: ${createOrderTask.status}`);

if (createOrderTask.estimated_completion) {
  console.log(`Estimated completion: ${createOrderTask.estimated_completion}`);
}

// Continue to monitor with getSupplyOrderCreateStatus()
```

---

## 📦 Order Management Methods

### getSupplyOrderCreateStatus()
Monitors supply order creation progress and retrieves final order details.

```typescript
interface FboSupplyRequestDraftSupplyCreateStatusRequest {
  task_id: string;
}

interface FboSupplyRequestDraftSupplyCreateStatusResponse {
  status?: 'pending' | 'processing' | 'completed' | 'error';
  supply_order_id?: number;
  
  // Progress information
  progress?: {
    current_step?: string;
    completed_steps?: string[];
    remaining_steps?: string[];
    completion_percentage?: number;
  };
  
  // Created order details
  supply_order?: {
    supply_order_id?: number;
    status?: string;
    warehouse_name?: string;
    timeslot_info?: {
      date?: string;
      start_time?: string;
      end_time?: string;
    };
    total_items?: number;
    total_quantity?: number;
    estimated_pallets?: number;
  };
  
  // Error information
  error_message?: string;
  error_code?: string;
  validation_errors?: string[];
  
  // Next steps
  next_actions?: string[];
}

// Usage Example
async function monitorOrderCreation(taskId: string): Promise<number> {
  console.log(`🔄 Monitoring order creation: ${taskId}`);
  
  while (true) {
    const status = await fboSupplyRequestApi.getSupplyOrderCreateStatus({
      task_id: taskId
    });
    
    console.log(`Status: ${status.status}`);
    
    // Show progress
    if (status.progress) {
      console.log(`Progress: ${status.progress.completion_percentage}%`);
      console.log(`Current step: ${status.progress.current_step}`);
      
      if (status.progress.completed_steps?.length) {
        console.log('Completed steps:');
        status.progress.completed_steps.forEach(step => {
          console.log(`  ✅ ${step}`);
        });
      }
      
      if (status.progress.remaining_steps?.length) {
        console.log('Remaining steps:');
        status.progress.remaining_steps.forEach(step => {
          console.log(`  ⏳ ${step}`);
        });
      }
    }
    
    if (status.status === 'completed') {
      console.log('✅ Supply order created successfully!');
      
      if (status.supply_order) {
        const order = status.supply_order;
        console.log(`Order ID: ${order.supply_order_id}`);
        console.log(`Status: ${order.status}`);
        console.log(`Warehouse: ${order.warehouse_name}`);
        
        if (order.timeslot_info) {
          const timeslot = order.timeslot_info;
          console.log(`Delivery: ${timeslot.date} ${timeslot.start_time}-${timeslot.end_time}`);
        }
        
        console.log(`Items: ${order.total_items} types, ${order.total_quantity} total`);
        console.log(`Estimated pallets: ${order.estimated_pallets}`);
      }
      
      if (status.next_actions?.length) {
        console.log('Next actions:');
        status.next_actions.forEach((action, index) => {
          console.log(`  ${index + 1}. ${action}`);
        });
      }
      
      return status.supply_order_id!;
      
    } else if (status.status === 'error') {
      console.error('❌ Order creation failed');
      console.error(`Error: ${status.error_message}`);
      
      if (status.validation_errors?.length) {
        console.error('Validation errors:');
        status.validation_errors.forEach(error => {
          console.error(`  - ${error}`);
        });
      }
      
      throw new Error(`Order creation failed: ${status.error_message}`);
    }
    
    // Wait 5 seconds before next check
    await new Promise(resolve => setTimeout(resolve, 5000));
  }
}
```

### updateSupplyOrderContent()
Updates product composition in existing supply order.

```typescript
interface FboSupplyRequestSupplyOrderContentUpdateRequest {
  supply_order_id: number;
  items: Array<{
    sku: string;
    quantity: number;
    operation: 'add' | 'update' | 'delete';
  }>;
}

interface FboSupplyRequestSupplyOrderContentUpdateResponse {
  task_id?: string;
  status?: 'pending' | 'processing' | 'completed' | 'error';
}

// Usage Example
const updateTask = await fboSupplyRequestApi.updateSupplyOrderContent({
  supply_order_id: 12345,
  items: [
    { sku: '123456789', quantity: 15, operation: 'update' },  // Increase quantity
    { sku: '987654321', quantity: 10, operation: 'add' },     // Add new item
    { sku: '555666777', quantity: 0, operation: 'delete' }    // Remove item
  ]
});

console.log(`Content update task: ${updateTask.task_id}`);
```

### cancelSupplyOrder()
Cancels existing supply order with reason specification.

```typescript
interface FboSupplyRequestSupplyOrderCancelRequest {
  supply_order_id: number;
  reason?: string;
}

interface FboSupplyRequestSupplyOrderCancelResponse {
  task_id?: string;
  status?: 'pending' | 'processing' | 'completed' | 'error';
}

// Usage Example
const cancelTask = await fboSupplyRequestApi.cancelSupplyOrder({
  supply_order_id: 12345,
  reason: 'Inventory shortage - unable to fulfill order'
});

console.log(`Cancellation task: ${cancelTask.task_id}`);
```

---

## 💼 Business Workflows

### 1. Complete Draft to Order Workflow
```typescript
class SupplyOrderManager {
  private readonly api: FboSupplyRequestApi;
  
  constructor(api: FboSupplyRequestApi) {
    this.api = api;
  }
  
  async createCompleteSupplyOrder(
    warehouseId: number,
    supplyType: 'DIRECT' | 'CROSS_DOCK',
    items: Array<{ sku: string; quantity: number }>,
    preferences: {
      preferredDate?: string;
      maxCost?: number;
      minPallets?: number;
      maxPallets?: number;
    } = {}
  ) {
    try {
      // Step 1: Create draft
      console.log('📝 Creating draft...');
      const draft = await this.api.createDraft({
        supply_type: supplyType,
        warehouse_id: warehouseId,
        items
      });
      
      if (!draft.draft?.draft_id) {
        throw new Error('Failed to create draft');
      }
      
      if (draft.draft.status === 'error') {
        throw new Error(`Draft validation failed: ${draft.draft.validation_errors?.join(', ')}`);
      }
      
      console.log(`✅ Draft created: ${draft.draft.draft_id}`);
      
      // Step 2: Find optimal timeslot
      console.log('🕒 Finding optimal timeslot...');
      const timeslots = await this.api.getTimeslotInfo({
        warehouse_id: warehouseId,
        date_from: preferences.preferredDate || new Date().toISOString().split('T')[0],
        date_to: this.getDatePlusWeeks(2)
      });
      
      const optimalSlot = this.selectOptimalTimeslot(timeslots.timeslots || [], preferences);
      if (!optimalSlot) {
        throw new Error('No suitable timeslots available');
      }
      
      console.log(`✅ Selected timeslot: ${optimalSlot.timeslot_id} (${optimalSlot.date} ${optimalSlot.start_time})`);
      
      // Step 3: Create supply order
      console.log('📦 Creating supply order...');
      const createTask = await this.api.createSupplyOrderFromDraft({
        draft_id: draft.draft.draft_id,
        timeslot_id: optimalSlot.timeslot_id!
      });
      
      // Step 4: Monitor creation
      const supplyOrderId = await this.monitorOrderCreation(createTask.task_id!);
      
      return {
        draftId: draft.draft.draft_id,
        supplyOrderId,
        timeslotId: optimalSlot.timeslot_id,
        warehouseName: draft.draft.warehouse?.name,
        scheduledDelivery: `${optimalSlot.date} ${optimalSlot.start_time}-${optimalSlot.end_time}`
      };
      
    } catch (error) {
      console.error('Supply order creation failed:', error);
      throw error;
    }
  }
  
  private selectOptimalTimeslot(timeslots: any[], preferences: any) {
    // Filter available slots
    let available = timeslots.filter(slot => slot.is_available);
    
    // Apply preferences
    if (preferences.maxCost) {
      available = available.filter(slot => !slot.total_cost || slot.total_cost <= preferences.maxCost);
    }
    
    if (preferences.minPallets) {
      available = available.filter(slot => slot.available_pallets >= preferences.minPallets);
    }
    
    if (preferences.maxPallets) {
      available = available.filter(slot => slot.max_pallets >= preferences.maxPallets);
    }
    
    if (preferences.preferredDate) {
      // Prefer slots closer to preferred date
      available.sort((a, b) => {
        const diffA = Math.abs(new Date(a.date).getTime() - new Date(preferences.preferredDate).getTime());
        const diffB = Math.abs(new Date(b.date).getTime() - new Date(preferences.preferredDate).getTime());
        return diffA - diffB;
      });
    }
    
    // Prefer recommended slots
    const recommended = available.filter(slot => slot.recommended);
    if (recommended.length > 0) {
      return recommended[0];
    }
    
    // Prefer slots with good conditions
    const goodConditions = available.filter(slot => 
      slot.weather_conditions === 'good' && slot.traffic_conditions === 'light'
    );
    
    return goodConditions.length > 0 ? goodConditions[0] : available[0];
  }
  
  private getDatePlusWeeks(weeks: number): string {
    const date = new Date();
    date.setDate(date.getDate() + weeks * 7);
    return date.toISOString().split('T')[0];
  }
  
  private async monitorOrderCreation(taskId: string): Promise<number> {
    while (true) {
      const status = await this.api.getSupplyOrderCreateStatus({ task_id: taskId });
      
      if (status.status === 'completed') {
        return status.supply_order_id!;
      } else if (status.status === 'error') {
        throw new Error(`Order creation failed: ${status.error_message}`);
      }
      
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
}
```

### 2. Draft Validation and Optimization
```typescript
async function validateAndOptimizeDraft(draftId: string) {
  const draftInfo = await fboSupplyRequestApi.getDraftInfo({
    draft_id: draftId
  });
  
  if (!draftInfo.draft) {
    throw new Error('Draft not found');
  }
  
  const issues = [];
  const recommendations = [];
  
  // Check overall status
  if (draftInfo.draft.status === 'error') {
    issues.push(...(draftInfo.draft.validation_errors || []));
  }
  
  // Analyze items
  draftInfo.draft.items?.forEach(item => {
    if (item.validation_status === 'invalid') {
      issues.push(`${item.name} (${item.sku}): Invalid item configuration`);
    }
    
    if (item.validation_status === 'warning') {
      recommendations.push(`${item.name} (${item.sku}): ${item.validation_messages?.join(', ')}`);
    }
    
    if (item.quantity > (item.available_quantity || 0)) {
      issues.push(`${item.name} (${item.sku}): Requested ${item.quantity}, but only ${item.available_quantity} available`);
    }
  });
  
  // Check warehouse capacity
  if (draftInfo.draft.estimated_pallets && draftInfo.draft.warehouse) {
    // This would require additional warehouse capacity checking
    recommendations.push('Consider splitting large orders across multiple timeslots');
  }
  
  return {
    isValid: issues.length === 0,
    issues,
    recommendations,
    summary: {
      totalItems: draftInfo.draft.total_items,
      totalQuantity: draftInfo.draft.total_quantity,
      estimatedPallets: draftInfo.draft.estimated_pallets,
      estimatedWeight: draftInfo.draft.estimated_weight
    }
  };
}
```

---

## 🎯 Best Practices

### Error Handling
```typescript
async function resilientDraftCreation(request: any) {
  const maxRetries = 3;
  let attempt = 1;
  
  while (attempt <= maxRetries) {
    try {
      const result = await fboSupplyRequestApi.createDraft(request);
      
      if (result.draft?.status === 'error') {
        throw new Error(`Draft validation failed: ${result.draft.validation_errors?.join(', ')}`);
      }
      
      return result.draft;
      
    } catch (error) {
      console.error(`Draft creation attempt ${attempt} failed:`, error.message);
      
      if (attempt === maxRetries) {
        throw new Error(`Failed after ${maxRetries} attempts: ${error.message}`);
      }
      
      // Exponential backoff
      const delay = Math.pow(2, attempt) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
      attempt++;
    }
  }
}
```

---

## 📊 API Endpoints Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `createDraft` | `POST /v1/draft/create` | Create supply order draft |
| `getDraftInfo` | `POST /v1/draft/create/info` | Get draft information |
| `getTimeslotInfo` | `POST /v1/draft/timeslot/info` | Get available timeslots |
| `createSupplyOrderFromDraft` | `POST /v1/draft/supply/create` | Create order from draft |
| `getSupplyOrderCreateStatus` | `POST /v1/draft/supply/create/status` | Get creation status |
| `cancelSupplyOrder` | `POST /v1/supply-order/cancel` | Cancel supply order |
| `getSupplyOrderCancelStatus` | `POST /v1/supply-order/cancel/status` | Get cancel status |
| `updateSupplyOrderContent` | `POST /v1/supply-order/content/update` | Update order content |

---

**[← Back to FBO Supply Request Main](./17-fbo-supply-request.md)**