# 14. Delivery FBS API

**Delivery FBS API** - Comprehensive FBS delivery management and tracking for OZON Seller API.

## Overview

The Delivery FBS API provides complete shipment lifecycle management for FBS (Fulfillment by Seller) operations. This API handles carriage creation, document management, barcode generation, and delivery tracking across 17 specialized methods.

### Key Features
- **Carriage Management**: Create, approve, and cancel FBS shipments
- **Document Generation**: Generate PDF documents, acts, and waybills
- **Barcode System**: Generate and retrieve shipment barcodes
- **Status Tracking**: Monitor shipment and document formation status
- **Digital Acts**: Handle digital waybill formation and retrieval

## 📋 Methods Overview

### 🚛 Carriage Management (7 methods)
1. **createCarriage** - Create new FBS shipment
2. **approveCarriage** - Approve created shipment  
3. **cancelCarriage** - Cancel existing shipment
4. **getCarriage** - Get carriage information
5. **getCarriageDeliveryList** - List delivery methods and carriages
6. **setPostings** - Modify carriage composition (Not available for CIS)
7. **getCarriageAvailableList** - Get available carriages for processing

### 📝 Documents & Acts (7 methods)
8. **createAct** - Confirm shipment and create documents
9. **checkActStatus** - Check shipment and document status
10. **getAct** - Get PDF documents (act/waybill/shipment list)
11. **getActPostings** - Get postings list in act
12. **getActList** - Get acts list by shipments
13. **checkDigitalActStatus** - Check waybill formation status
14. **getDigitalAct** - Get digital shipment list PDF

### 📊 Barcode & Labels (2 methods)
15. **getBarcode** - Get shipment barcode image
16. **getBarcodeText** - Get barcode text value
17. **getContainerLabels** - Generate container labels

### 🔧 Utility (1 method)
18. **splitPosting** - Split order into separate postings

---

## 🚛 Carriage Management Methods

### createCarriage()
Creates first FBS shipment with all postings in "Ready to ship" status.

```typescript
interface DeliveryFbsCarriageCreateRequest {
  delivery_method_id?: number;
  first_mile_from_time?: string;  // "09:00"
  first_mile_to_time?: string;    // "18:00"
}

interface DeliveryFbsCarriageCreateResponse {
  result?: {
    carriage_id?: number;
    status?: string;
    created_at?: string;
    first_mile_from_time?: string;
    first_mile_to_time?: string;
  };
}

// Usage Example
const carriage = await deliveryFbsApi.createCarriage({
  delivery_method_id: 123,
  first_mile_from_time: '09:00',
  first_mile_to_time: '18:00'
});

if (carriage.result?.carriage_id) {
  console.log(`Carriage created: ${carriage.result.carriage_id}`);
}
```

### approveCarriage()
Approves carriage after creation, changing status to "Formed".

```typescript
interface DeliveryFbsCarriageApproveRequest {
  carriage_id?: number;
}

// Usage Example
const approved = await deliveryFbsApi.approveCarriage({
  carriage_id: 12345
});

if (approved.result) {
  console.log('Carriage approved successfully');
  // Now you can get shipment list and barcode
}
```

### getCarriageDeliveryList()
Gets list of created carriages for delivery method with their statuses.

```typescript
interface DeliveryFbsCarriageDeliveryListRequest {
  status?: string;
  limit?: number;
  offset?: number;
}

interface DeliveryFbsCarriageDeliveryListResponse {
  result?: Array<{
    delivery_method?: {
      id?: number;
      name?: string;
      type?: string;
      is_available?: boolean;
    };
    carriages?: Array<{
      carriage_id?: number;
      status?: string;
      created_at?: string;
    }>;
  }>;
  has_next?: boolean;
}

// Usage Example
const deliveryList = await deliveryFbsApi.getCarriageDeliveryList({
  status: 'new',
  limit: 50
});

deliveryList.result?.forEach(item => {
  console.log(`Delivery method: ${item.delivery_method?.name}`);
  item.carriages?.forEach(carriage => {
    console.log(`- Carriage ${carriage.carriage_id}: ${carriage.status}`);
  });
});
```

---

## 📝 Documents & Acts Methods

### createAct()
Confirms shipment and starts formation of transport waybill and barcode.

```typescript
interface DeliveryFbsActCreateRequest {
  carriage_id?: number;
  posting_number?: string[];
}

interface DeliveryFbsActCreateResponse {
  result?: boolean;
  act_id?: number;
}

// Usage Example
const result = await deliveryFbsApi.createAct({
  carriage_id: 12345,
  posting_number: ['12345-0001-1', '12345-0002-1']
});

if (result.result) {
  console.log(`Act created with ID: ${result.act_id}`);
}
```

### checkActStatus()
Returns formation status of shipment barcode and documents.

```typescript
interface DeliveryFbsActCheckStatusResponse {
  carriage_status?: string;
  documents?: Array<{
    type?: string;
    status?: 'pending' | 'processing' | 'ready' | 'error';
    url?: string;
  }>;
  barcode_status?: string;
}

// Usage Example
const status = await deliveryFbsApi.checkActStatus({
  carriage_id: 12345
});

console.log(`Carriage status: ${status.carriage_status}`);
console.log(`Barcode status: ${status.barcode_status}`);
status.documents?.forEach(doc => {
  console.log(`${doc.type}: ${doc.status}`);
});
```

### getAct()
Gets PDF with documents - shipment list and transport waybill for Russian sellers, or act and transport waybill for CIS sellers.

```typescript
interface DeliveryFbsGetActRequest {
  carriage_id?: number;
  doc_type?: 'act' | 'waybill' | 'shipment_list';
}

interface DeliveryFbsGetActResponse {
  content?: string;        // PDF in base64
  content_type?: string;   // "application/pdf"
  filename?: string;
}

// Usage Example
const documents = await deliveryFbsApi.getAct({
  carriage_id: 12345,
  doc_type: 'act'
});

if (documents.content) {
  // Save PDF file from base64
  const docBuffer = Buffer.from(documents.content, 'base64');
  console.log(`Document received: ${documents.filename}`);
}
```

---

## 📊 Barcode & Labels Methods

### getBarcode()
Gets barcode image that needs to be shown at pickup point or sorting center during shipment.

```typescript
interface DeliveryFbsGetBarcodeResponse {
  barcode?: string;        // Image in base64
  content_type?: string;   // "image/png"
}

// Usage Example
const barcode = await deliveryFbsApi.getBarcode({
  carriage_id: 12345
});

if (barcode.barcode) {
  // Save barcode image from base64
  const barcodeBuffer = Buffer.from(barcode.barcode, 'base64');
  console.log(`Barcode received: ${barcode.content_type}`);
}
```

### getBarcodeText()
Gets barcode in text format.

```typescript
interface DeliveryFbsGetBarcodeTextResponse {
  barcode_text?: string;
}

// Usage Example
const barcodeText = await deliveryFbsApi.getBarcodeText({
  carriage_id: 12345
});

if (barcodeText.barcode_text) {
  console.log(`Barcode: ${barcodeText.barcode_text}`);
}
```

### getContainerLabels()
Creates labels for cargo containers.

```typescript
interface DeliveryFbsGetContainerLabelsRequest {
  carriage_id?: number;
  container_numbers?: string[];
}

interface DeliveryFbsGetContainerLabelsResponse {
  content?: string;        // PDF in base64
  content_type?: string;   // "application/pdf"
}

// Usage Example
const labels = await deliveryFbsApi.getContainerLabels({
  carriage_id: 12345,
  container_numbers: ['CONT001', 'CONT002']
});

if (labels.content) {
  // Save PDF file from base64
  const labelsBuffer = Buffer.from(labels.content, 'base64');
  console.log(`Labels received: ${labels.content_type}`);
}
```

---

## 🔧 Utility Methods

### splitPosting()
Splits order into separate postings without assembly.

```typescript
interface DeliveryFbsPostingSplitRequest {
  posting_number?: string;
}

interface DeliveryFbsPostingSplitResponse {
  result?: boolean;
  created_postings?: string[];
}

// Usage Example
const result = await deliveryFbsApi.splitPosting({
  posting_number: '12345-0001-1'
});

if (result.result) {
  console.log('Order split into postings');
  result.created_postings?.forEach(posting => {
    console.log(`Created posting: ${posting}`);
  });
}
```

---

## 💼 Business Workflows

### 1. Complete FBS Shipment Workflow
```typescript
async function completeFbsShipmentWorkflow() {
  try {
    // Step 1: Create carriage
    const carriage = await deliveryFbsApi.createCarriage({
      delivery_method_id: 123,
      first_mile_from_time: '09:00',
      first_mile_to_time: '18:00'
    });
    
    const carriageId = carriage.result?.carriage_id;
    if (!carriageId) throw new Error('Failed to create carriage');
    
    // Step 2: Approve carriage
    const approved = await deliveryFbsApi.approveCarriage({
      carriage_id: carriageId
    });
    
    if (!approved.result) throw new Error('Failed to approve carriage');
    
    // Step 3: Create act and documents
    const act = await deliveryFbsApi.createAct({
      carriage_id: carriageId,
      posting_number: ['12345-0001-1', '12345-0002-1']
    });
    
    if (!act.result) throw new Error('Failed to create act');
    
    // Step 4: Wait for documents to be ready
    let status;
    do {
      await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
      status = await deliveryFbsApi.checkActStatus({
        carriage_id: carriageId
      });
    } while (status.documents?.some(doc => doc.status === 'processing'));
    
    // Step 5: Get documents and barcode
    const [documents, barcode] = await Promise.all([
      deliveryFbsApi.getAct({
        carriage_id: carriageId,
        doc_type: 'act'
      }),
      deliveryFbsApi.getBarcode({
        carriage_id: carriageId
      })
    ]);
    
    console.log('FBS shipment workflow completed successfully');
    return {
      carriageId,
      actId: act.act_id,
      documents: documents.content,
      barcode: barcode.barcode
    };
    
  } catch (error) {
    console.error('FBS shipment workflow failed:', error);
    throw error;
  }
}
```

### 2. Batch Document Processing
```typescript
async function processBatchDocuments(carriageIds: number[]) {
  const results = [];
  
  for (const carriageId of carriageIds) {
    try {
      // Check status first
      const status = await deliveryFbsApi.checkActStatus({
        carriage_id: carriageId
      });
      
      if (status.documents?.every(doc => doc.status === 'ready')) {
        // Get all documents
        const [act, waybill, shipmentList] = await Promise.all([
          deliveryFbsApi.getAct({ carriage_id: carriageId, doc_type: 'act' }),
          deliveryFbsApi.getAct({ carriage_id: carriageId, doc_type: 'waybill' }),
          deliveryFbsApi.getAct({ carriage_id: carriageId, doc_type: 'shipment_list' })
        ]);
        
        results.push({
          carriageId,
          status: 'completed',
          documents: { act, waybill, shipmentList }
        });
      } else {
        results.push({
          carriageId,
          status: 'pending',
          documentStatuses: status.documents
        });
      }
    } catch (error) {
      results.push({
        carriageId,
        status: 'error',
        error: error.message
      });
    }
  }
  
  return results;
}
```

### 3. Digital Waybill Management
```typescript
async function manageDigitalWaybills(carriageId: number) {
  try {
    // Check digital act status
    const status = await deliveryFbsApi.checkDigitalActStatus({
      carriage_id: carriageId
    });
    
    console.log(`Digital act status: ${status.status}`);
    
    // Only proceed if status allows document retrieval
    const allowedStatuses = ['FORMED', 'CONFIRMED', 'CONFIRMED_WITH_MISMATCH'];
    if (!allowedStatuses.includes(status.status)) {
      throw new Error(`Cannot get documents. Status: ${status.status}`);
    }
    
    // Get digital act
    const digitalAct = await deliveryFbsApi.getDigitalAct({
      carriage_id: carriageId
    });
    
    if (digitalAct.content) {
      // Save PDF file from base64
      const actBuffer = Buffer.from(digitalAct.content, 'base64');
      console.log(`Digital act received: ${digitalAct.filename}`);
      
      return {
        status: 'success',
        filename: digitalAct.filename,
        content: actBuffer
      };
    }
    
  } catch (error) {
    console.error('Digital waybill management failed:', error);
    throw error;
  }
}
```

---

## 🎯 Best Practices

### Error Handling
```typescript
async function robustCarriageOperation(carriageId: number) {
  try {
    const result = await deliveryFbsApi.approveCarriage({
      carriage_id: carriageId
    });
    
    if (!result.result) {
      throw new Error('Carriage approval failed');
    }
    
    return result;
  } catch (error) {
    if (error.message.includes('not found')) {
      console.error(`Carriage ${carriageId} not found`);
    } else if (error.message.includes('already approved')) {
      console.warn(`Carriage ${carriageId} already approved`);
    }
    throw error;
  }
}
```

### Status Polling
```typescript
async function waitForDocumentReady(carriageId: number, maxAttempts = 30) {
  let attempts = 0;
  
  while (attempts < maxAttempts) {
    const status = await deliveryFbsApi.checkActStatus({
      carriage_id: carriageId
    });
    
    const allReady = status.documents?.every(doc => 
      doc.status === 'ready' || doc.status === 'error'
    );
    
    if (allReady) {
      return status;
    }
    
    attempts++;
    await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10 seconds
  }
  
  throw new Error(`Documents not ready after ${maxAttempts} attempts`);
}
```

### Resource Management
```typescript
class DeliveryFbsManager {
  private readonly deliveryFbsApi: DeliveryFbsApi;
  private readonly batchSize = 10;
  
  constructor(deliveryFbsApi: DeliveryFbsApi) {
    this.deliveryFbsApi = deliveryFbsApi;
  }
  
  async processBatchOperations(carriageIds: number[]) {
    const batches = [];
    for (let i = 0; i < carriageIds.length; i += this.batchSize) {
      batches.push(carriageIds.slice(i, i + this.batchSize));
    }
    
    const results = [];
    for (const batch of batches) {
      const batchResults = await Promise.allSettled(
        batch.map(id => this.processCarriage(id))
      );
      results.push(...batchResults);
      
      // Rate limiting - wait between batches
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    return results;
  }
  
  private async processCarriage(carriageId: number) {
    // Implementation specific processing logic
    return await this.deliveryFbsApi.getCarriage({
      carriage_id: carriageId
    });
  }
}
```

---

## 📊 API Endpoints Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| **Carriage Management** |
| `createCarriage` | `POST /v1/carriage/create` | Create new FBS shipment |
| `approveCarriage` | `POST /v1/carriage/approve` | Approve created shipment |
| `cancelCarriage` | `POST /v1/carriage/cancel` | Cancel existing shipment |
| `getCarriage` | `POST /v1/carriage/get` | Get carriage information |
| `getCarriageDeliveryList` | `POST /v1/carriage/delivery/list` | List delivery methods and carriages |
| `setPostings` | `POST /v1/carriage/set-postings` | Modify carriage composition |
| `getCarriageAvailableList` | `POST /v1/posting/carriage-available/list` | Get available carriages |
| **Documents & Acts** |
| `createAct` | `POST /v2/posting/fbs/act/create` | Create documents |
| `checkActStatus` | `POST /v2/posting/fbs/act/check-status` | Check document status |
| `getAct` | `POST /v2/posting/fbs/act/get-pdf` | Get PDF documents |
| `getActPostings` | `POST /v2/posting/fbs/act/get-postings` | Get postings in act |
| `getActList` | `POST /v2/posting/fbs/act/list` | Get acts list |
| `checkDigitalActStatus` | `POST /v2/posting/fbs/digital/act/check-status` | Check waybill status |
| `getDigitalAct` | `POST /v2/posting/fbs/digital/act/get-pdf` | Get digital waybill |
| **Barcodes & Labels** |
| `getBarcode` | `POST /v2/posting/fbs/act/get-barcode` | Get barcode image |
| `getBarcodeText` | `POST /v2/posting/fbs/act/get-barcode/text` | Get barcode text |
| `getContainerLabels` | `POST /v2/posting/fbs/act/get-container-labels` | Get container labels |
| **Utilities** |
| `splitPosting` | `POST /v1/posting/fbs/split` | Split posting |

---

## 🔗 Related Documentation

- **[FBS API (07-fbs.md)](./07-fbs.md)** - Main FBS operations and posting management
- **[Return API (return.md)](./return.md)** - Returns and refunds management
- **[Report API (report.md)](./report.md)** - Analytics and reporting

---

**Implementation Status**: ✅ Complete  
**Last Updated**: 2024  
**API Version**: v1/v2