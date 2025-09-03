# 15. Delivery rFBS API

**Delivery rFBS API** - Regional FBS delivery management and status tracking for OZON Seller API.

## Overview

The Delivery rFBS API provides comprehensive management of regional FBS (rFBS) delivery operations. This API handles delivery scheduling, status updates, tracking number management, and timeslot modifications for regional fulfillment operations across 8 specialized methods.

### Key Features
- **Delivery Scheduling**: Set cutoff dates and manage delivery timeslots
- **Status Management**: Track delivery lifecycle with precise status updates
- **Tracking Integration**: Add and manage tracking numbers for shipments
- **Timeslot Control**: Reschedule deliveries with availability checking

## 📋 Methods Overview

### 📅 Scheduling & Timing (3 methods)
1. **setCutoff** - Set posting shipment cutoff date
2. **getTimeslotChangeRestrictions** - Get available rescheduling dates
3. **setTimeslot** - Reschedule delivery date

### 📦 Status Management (4 methods)
4. **setSentBySeller** - Change status to "Sent by seller"
5. **setDelivering** - Change status to "Delivering"
6. **setLastMile** - Change status to "Last mile"
7. **setDelivered** - Change status to "Delivered"

### 🔍 Tracking (1 method)
8. **setTrackingNumbers** - Add tracking numbers to postings

---

## 📅 Scheduling & Timing Methods

### setCutoff()
Sets posting shipment cutoff date for precise delivery scheduling.

```typescript
interface DeliveryRfbsSetCutoffRequest {
  posting_number?: string;
  cutoff_at?: string;  // ISO 8601 format
}

interface DeliveryRfbsSetCutoffResponse {
  result?: 'success' | 'error';
  error?: string;
}

// Usage Example
const result = await deliveryRfbsApi.setCutoff({
  posting_number: 'FBS-123456789',
  cutoff_at: '2024-01-15T10:00:00Z'
});

if (result.result === 'success') {
  console.log('Cutoff date set successfully');
} else {
  console.error('Error setting cutoff:', result.error);
}
```

### getTimeslotChangeRestrictions()
Gets available dates for delivery rescheduling with restrictions information.

```typescript
interface DeliveryRfbsTimeslotChangeRestrictionsRequest {
  posting_number?: string;
}

interface DeliveryRfbsTimeslotChangeRestrictionsResponse {
  restrictions?: {
    available_dates?: string[];
    available_reschedules?: number;
    max_reschedules?: number;
  };
}

// Usage Example
const restrictions = await deliveryRfbsApi.getTimeslotChangeRestrictions({
  posting_number: 'FBS-123456789'
});

console.log('Available dates:', restrictions.restrictions?.available_dates);
console.log('Remaining reschedules:', restrictions.restrictions?.available_reschedules);
console.log('Max reschedules allowed:', restrictions.restrictions?.max_reschedules);

// Check if rescheduling is possible
const canReschedule = (restrictions.restrictions?.available_reschedules ?? 0) > 0;
if (canReschedule) {
  console.log('Rescheduling available');
}
```

### setTimeslot()
Reschedules delivery to a new date from available options.

```typescript
interface DeliveryRfbsTimeslotSetRequest {
  posting_number?: string;
  timeslot_date?: string;  // YYYY-MM-DD format
}

interface DeliveryRfbsTimeslotSetResponse {
  result?: 'success' | 'error';
  new_timeslot_date?: string;
  error?: string;
}

// Usage Example
const result = await deliveryRfbsApi.setTimeslot({
  posting_number: 'FBS-123456789',
  timeslot_date: '2024-01-25'
});

if (result.result === 'success') {
  console.log('New delivery date:', result.new_timeslot_date);
} else {
  console.error('Rescheduling failed:', result.error);
}
```

---

## 📦 Status Management Methods

### setSentBySeller()
Changes posting status to "Sent by seller" when package leaves seller facility.

```typescript
interface DeliveryRfbsPostingSentBySellerRequest {
  posting_number?: string;
  sent_by_seller_at?: string;  // ISO 8601 format
}

interface DeliveryRfbsPostingSentBySellerResponse {
  result?: 'success' | 'error';
  posting_number?: string;
  status?: string;
  sent_by_seller_at?: string;
  error?: string;
}

// Usage Example
const result = await deliveryRfbsApi.setSentBySeller({
  posting_number: 'FBS-123456789',
  sent_by_seller_at: '2024-01-15T12:00:00Z'
});

if (result.result === 'success') {
  console.log(`${result.posting_number} sent by seller at ${result.sent_by_seller_at}`);
} else {
  console.error('Status update failed:', result.error);
}
```

### setDelivering()
Changes posting status to "Delivering" when package is out for delivery.

```typescript
interface DeliveryRfbsPostingDeliveringRequest {
  posting_number?: string;
  delivering_at?: string;  // ISO 8601 format
}

interface DeliveryRfbsPostingDeliveringResponse {
  result?: 'success' | 'error';
  status?: string;
  status_changed_at?: string;
  error?: string;
}

// Usage Example
const result = await deliveryRfbsApi.setDelivering({
  posting_number: 'FBS-123456789',
  delivering_at: '2024-01-18T09:00:00Z'
});

if (result.result === 'success') {
  console.log('Status changed to delivering:', result.status);
  console.log('Status changed at:', result.status_changed_at);
}
```

### setLastMile()
Changes posting status to "Last mile" during final delivery stage.

```typescript
interface DeliveryRfbsPostingLastMileRequest {
  posting_number?: string;
  last_mile_at?: string;  // ISO 8601 format
}

interface DeliveryRfbsPostingLastMileResponse {
  result?: 'success' | 'error';
  status?: string;
  status_changed_at?: string;
  error?: string;
}

// Usage Example
const result = await deliveryRfbsApi.setLastMile({
  posting_number: 'FBS-123456789',
  last_mile_at: '2024-01-19T14:00:00Z'
});

if (result.result === 'success') {
  console.log('Last mile started:', result.status);
}
```

### setDelivered()
Changes posting status to "Delivered" when package reaches customer.

```typescript
interface DeliveryRfbsPostingDeliveredRequest {
  posting_number?: string;
  delivered_at?: string;  // ISO 8601 format
}

interface DeliveryRfbsPostingDeliveredResponse {
  result?: 'success' | 'error';
  status?: string;
  status_changed_at?: string;
  error?: string;
}

// Usage Example
const result = await deliveryRfbsApi.setDelivered({
  posting_number: 'FBS-123456789',
  delivered_at: '2024-01-20T15:30:00Z'
});

if (result.result === 'success') {
  console.log('Delivery completed:', result.status);
  console.log('Delivered at:', result.status_changed_at);
}
```

---

## 🔍 Tracking Methods

### setTrackingNumbers()
Adds tracking numbers to multiple postings with delivery service information.

```typescript
interface DeliveryRfbsTrackingNumberSetRequest {
  tracking_numbers?: Array<{
    posting_number?: string;
    tracking_number?: string;
    delivery_service?: string;
  }>;
}

interface DeliveryRfbsTrackingNumberSetResponse {
  results?: Array<{
    posting_number?: string;
    result?: 'success' | 'error';
    tracking_number?: string;
    error?: string;
  }>;
}

// Usage Example
const result = await deliveryRfbsApi.setTrackingNumbers({
  tracking_numbers: [
    {
      posting_number: 'FBS-123456789',
      tracking_number: 'TRACK123456',
      delivery_service: 'CDEK'
    },
    {
      posting_number: 'FBS-987654321',
      tracking_number: 'TRACK789012',
      delivery_service: 'Russian Post'
    },
    {
      posting_number: 'FBS-555666777',
      tracking_number: 'TRACK345678',
      delivery_service: 'DPD'
    }
  ]
});

// Process results
result.results?.forEach(res => {
  if (res.result === 'success') {
    console.log(`✅ ${res.posting_number}: Tracking ${res.tracking_number} added`);
  } else {
    console.error(`❌ ${res.posting_number}: ${res.error}`);
  }
});

// Summary statistics
const successful = result.results?.filter(r => r.result === 'success').length ?? 0;
const failed = result.results?.filter(r => r.result === 'error').length ?? 0;
console.log(`Summary: ${successful} successful, ${failed} failed`);
```

---

## 💼 Business Workflows

### 1. Complete rFBS Delivery Lifecycle
```typescript
async function completeRfbsDeliveryLifecycle(postingNumber: string) {
  try {
    // Step 1: Set cutoff date for shipment
    const cutoff = await deliveryRfbsApi.setCutoff({
      posting_number: postingNumber,
      cutoff_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // +1 day
    });
    
    if (cutoff.result !== 'success') {
      throw new Error(`Cutoff setting failed: ${cutoff.error}`);
    }
    
    // Step 2: Add tracking number
    const tracking = await deliveryRfbsApi.setTrackingNumbers({
      tracking_numbers: [{
        posting_number: postingNumber,
        tracking_number: `TRACK${Date.now()}`,
        delivery_service: 'CDEK'
      }]
    });
    
    const trackingResult = tracking.results?.[0];
    if (trackingResult?.result !== 'success') {
      throw new Error(`Tracking number failed: ${trackingResult?.error}`);
    }
    
    // Step 3: Status progression with delays
    const statusUpdates = [
      { method: 'setSentBySeller', timestamp: Date.now() },
      { method: 'setDelivering', timestamp: Date.now() + 2 * 24 * 60 * 60 * 1000 }, // +2 days
      { method: 'setLastMile', timestamp: Date.now() + 4 * 24 * 60 * 60 * 1000 }, // +4 days
      { method: 'setDelivered', timestamp: Date.now() + 5 * 24 * 60 * 60 * 1000 } // +5 days
    ];
    
    for (const update of statusUpdates) {
      // In real implementation, these would be scheduled or triggered by events
      const result = await deliveryRfbsApi[update.method]({
        posting_number: postingNumber,
        [`${update.method.replace('set', '').toLowerCase()}_at`]: new Date(update.timestamp).toISOString()
      });
      
      if (result.result !== 'success') {
        console.warn(`Status update ${update.method} failed: ${result.error}`);
      } else {
        console.log(`✅ ${update.method} completed`);
      }
    }
    
    return {
      status: 'completed',
      postingNumber,
      trackingNumber: trackingResult.tracking_number
    };
    
  } catch (error) {
    console.error('rFBS delivery lifecycle failed:', error);
    throw error;
  }
}
```

### 2. Smart Delivery Rescheduling
```typescript
async function smartDeliveryRescheduling(postingNumber: string, preferredDate?: string) {
  try {
    // Check rescheduling availability
    const restrictions = await deliveryRfbsApi.getTimeslotChangeRestrictions({
      posting_number: postingNumber
    });
    
    const availableDates = restrictions.restrictions?.available_dates ?? [];
    const remainingReschedules = restrictions.restrictions?.available_reschedules ?? 0;
    
    if (remainingReschedules <= 0) {
      throw new Error('No reschedules remaining for this posting');
    }
    
    if (availableDates.length === 0) {
      throw new Error('No available dates for rescheduling');
    }
    
    // Select optimal date
    let selectedDate = preferredDate;
    
    // If preferred date is not available, select the earliest available
    if (!selectedDate || !availableDates.includes(selectedDate)) {
      selectedDate = availableDates.sort()[0];
      console.log(`Preferred date not available. Selected: ${selectedDate}`);
    }
    
    // Perform rescheduling
    const result = await deliveryRfbsApi.setTimeslot({
      posting_number: postingNumber,
      timeslot_date: selectedDate
    });
    
    if (result.result !== 'success') {
      throw new Error(`Rescheduling failed: ${result.error}`);
    }
    
    return {
      success: true,
      originalPreference: preferredDate,
      actualDate: result.new_timeslot_date,
      remainingReschedules: remainingReschedules - 1
    };
    
  } catch (error) {
    console.error('Smart rescheduling failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
}
```

### 3. Bulk Tracking Number Management
```typescript
interface TrackingNumberEntry {
  postingNumber: string;
  trackingNumber: string;
  deliveryService: string;
}

class BulkTrackingManager {
  private readonly deliveryRfbsApi: DeliveryRfbsApi;
  private readonly batchSize = 50; // API limit consideration
  
  constructor(deliveryRfbsApi: DeliveryRfbsApi) {
    this.deliveryRfbsApi = deliveryRfbsApi;
  }
  
  async processBulkTrackingNumbers(entries: TrackingNumberEntry[]) {
    const batches = this.createBatches(entries);
    const allResults: any[] = [];
    
    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i];
      console.log(`Processing batch ${i + 1}/${batches.length} (${batch.length} items)`);
      
      try {
        const result = await this.deliveryRfbsApi.setTrackingNumbers({
          tracking_numbers: batch.map(entry => ({
            posting_number: entry.postingNumber,
            tracking_number: entry.trackingNumber,
            delivery_service: entry.deliveryService
          }))
        });
        
        allResults.push(...(result.results ?? []));
        
        // Rate limiting between batches
        if (i < batches.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
      } catch (error) {
        console.error(`Batch ${i + 1} failed:`, error);
        // Add failed entries to results
        batch.forEach(entry => {
          allResults.push({
            posting_number: entry.postingNumber,
            result: 'error',
            error: `Batch processing failed: ${error.message}`
          });
        });
      }
    }
    
    return this.generateSummaryReport(allResults);
  }
  
  private createBatches(entries: TrackingNumberEntry[]): TrackingNumberEntry[][] {
    const batches: TrackingNumberEntry[][] = [];
    for (let i = 0; i < entries.length; i += this.batchSize) {
      batches.push(entries.slice(i, i + this.batchSize));
    }
    return batches;
  }
  
  private generateSummaryReport(results: any[]) {
    const successful = results.filter(r => r.result === 'success');
    const failed = results.filter(r => r.result === 'error');
    
    const report = {
      total: results.length,
      successful: successful.length,
      failed: failed.length,
      successRate: ((successful.length / results.length) * 100).toFixed(2) + '%',
      failedEntries: failed.map(f => ({
        postingNumber: f.posting_number,
        error: f.error
      }))
    };
    
    console.log('📊 Bulk Tracking Summary:');
    console.log(`Total: ${report.total}`);
    console.log(`✅ Successful: ${report.successful}`);
    console.log(`❌ Failed: ${report.failed}`);
    console.log(`📈 Success Rate: ${report.successRate}`);
    
    if (report.failed > 0) {
      console.log('\n❌ Failed Entries:');
      report.failedEntries.forEach(entry => {
        console.log(`  ${entry.postingNumber}: ${entry.error}`);
      });
    }
    
    return report;
  }
}

// Usage Example
const trackingManager = new BulkTrackingManager(deliveryRfbsApi);

const trackingEntries: TrackingNumberEntry[] = [
  { postingNumber: 'FBS-123456789', trackingNumber: 'TRACK123456', deliveryService: 'CDEK' },
  { postingNumber: 'FBS-987654321', trackingNumber: 'TRACK789012', deliveryService: 'Russian Post' },
  // ... more entries
];

const report = await trackingManager.processBulkTrackingNumbers(trackingEntries);
```

---

## 🎯 Best Practices

### Status Progression Validation
```typescript
const VALID_STATUS_TRANSITIONS = {
  'awaiting_packaging': ['sent_by_seller'],
  'sent_by_seller': ['delivering'],
  'delivering': ['last_mile'],
  'last_mile': ['delivered']
};

function validateStatusTransition(currentStatus: string, newStatus: string): boolean {
  const validNext = VALID_STATUS_TRANSITIONS[currentStatus] || [];
  return validNext.includes(newStatus);
}

async function safeStatusUpdate(
  postingNumber: string, 
  newStatus: string, 
  timestamp: string,
  currentStatus?: string
) {
  if (currentStatus && !validateStatusTransition(currentStatus, newStatus)) {
    throw new Error(`Invalid status transition from ${currentStatus} to ${newStatus}`);
  }
  
  const methodMap = {
    sent_by_seller: 'setSentBySeller',
    delivering: 'setDelivering',
    last_mile: 'setLastMile',
    delivered: 'setDelivered'
  };
  
  const method = methodMap[newStatus];
  if (!method) {
    throw new Error(`Unsupported status: ${newStatus}`);
  }
  
  return await deliveryRfbsApi[method]({
    posting_number: postingNumber,
    [`${newStatus}_at`]: timestamp
  });
}
```

### Error Recovery Patterns
```typescript
async function resilientTrackingUpdate(postingNumber: string, trackingNumber: string, deliveryService: string) {
  const maxRetries = 3;
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await deliveryRfbsApi.setTrackingNumbers({
        tracking_numbers: [{
          posting_number: postingNumber,
          tracking_number: trackingNumber,
          delivery_service: deliveryService
        }]
      });
      
      const trackingResult = result.results?.[0];
      if (trackingResult?.result === 'success') {
        return trackingResult;
      }
      
      lastError = trackingResult?.error || 'Unknown error';
      
    } catch (error) {
      lastError = error.message;
    }
    
    if (attempt < maxRetries) {
      const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
      console.log(`Attempt ${attempt} failed, retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw new Error(`Failed after ${maxRetries} attempts. Last error: ${lastError}`);
}
```

### Date Handling Utilities
```typescript
class DeliveryDateManager {
  static formatCutoffDate(date: Date): string {
    return date.toISOString();
  }
  
  static formatTimeslotDate(date: Date): string {
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
  }
  
  static addBusinessDays(date: Date, days: number): Date {
    const result = new Date(date);
    let addedDays = 0;
    
    while (addedDays < days) {
      result.setDate(result.getDate() + 1);
      
      // Skip weekends (0 = Sunday, 6 = Saturday)
      if (result.getDay() !== 0 && result.getDay() !== 6) {
        addedDays++;
      }
    }
    
    return result;
  }
  
  static isValidDeliveryTime(date: Date): boolean {
    const hour = date.getHours();
    const dayOfWeek = date.getDay();
    
    // Monday to Friday, 9 AM to 6 PM
    return dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour <= 18;
  }
  
  static getNextValidDeliveryTime(date: Date = new Date()): Date {
    let nextDate = new Date(date);
    
    while (!this.isValidDeliveryTime(nextDate)) {
      if (nextDate.getHours() >= 18 || nextDate.getDay() === 0 || nextDate.getDay() === 6) {
        // Move to next business day at 9 AM
        nextDate = this.addBusinessDays(nextDate, 1);
        nextDate.setHours(9, 0, 0, 0);
      } else if (nextDate.getHours() < 9) {
        // Move to 9 AM same day
        nextDate.setHours(9, 0, 0, 0);
      } else {
        nextDate.setTime(nextDate.getTime() + 60 * 60 * 1000); // +1 hour
      }
    }
    
    return nextDate;
  }
}

// Usage Examples
const cutoffDate = DeliveryDateManager.getNextValidDeliveryTime();
const timeslotDate = DeliveryDateManager.formatTimeslotDate(
  DeliveryDateManager.addBusinessDays(new Date(), 3)
);
```

---

## 📊 API Endpoints Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| **Scheduling & Timing** |
| `setCutoff` | `POST /v1/posting/cutoff/set` | Set shipment cutoff date |
| `getTimeslotChangeRestrictions` | `POST /v1/posting/fbs/timeslot/change-restrictions` | Get rescheduling availability |
| `setTimeslot` | `POST /v1/posting/fbs/timeslot/set` | Reschedule delivery date |
| **Status Management** |
| `setSentBySeller` | `POST /v2/fbs/posting/sent-by-seller` | Set "Sent by seller" status |
| `setDelivering` | `POST /v2/fbs/posting/delivering` | Set "Delivering" status |
| `setLastMile` | `POST /v2/fbs/posting/last-mile` | Set "Last mile" status |
| `setDelivered` | `POST /v2/fbs/posting/delivered` | Set "Delivered" status |
| **Tracking** |
| `setTrackingNumbers` | `POST /v2/fbs/posting/tracking-number/set` | Add tracking numbers |

---

## 🔗 Related Documentation

- **[FBS API (07-fbs.md)](./07-fbs.md)** - Main FBS operations and posting management
- **[Delivery FBS API (14-delivery-fbs.md)](./14-delivery-fbs.md)** - Standard FBS delivery management
- **[Return API (return.md)](./return.md)** - Returns and refunds for rFBS

---

**Implementation Status**: ✅ Complete  
**Last Updated**: 2024  
**API Version**: v1/v2