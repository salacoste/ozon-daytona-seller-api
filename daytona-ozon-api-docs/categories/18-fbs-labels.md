# FBS Label & Shipping Management

**Label & Shipping Management** - Comprehensive label generation, batch processing, and shipping coordination for FBS API.

## Overview

Label & Shipping Management handles all aspects of shipping label generation, batch processing, pickup verification, and shipping restrictions for FBS operations across 6 specialized methods.

---

## 📋 Methods Overview

### 🏷️ Label Generation (4 methods)
1. **packageLabel** - Generate individual shipping labels
2. **createLabelBatch** - Create batch label generation task
3. **createLabelBatchV2** - Enhanced batch label generation
4. **getLabelBatch** - Get batch generation status and results

### 🔍 Verification & Restrictions (2 methods)
5. **verifyPickupCode** - Verify pickup codes
6. **getRestrictions** - Get shipping restrictions

---

## 🏷️ Label Generation Methods

### packageLabel()
Generates shipping labels for individual postings with comprehensive formatting options.

```typescript
interface FbsPackageLabelRequest {
  posting_number: string[];
}

interface FbsPackageLabelResponse {
  result?: Array<{
    posting_number?: string;
    status?: 'success' | 'error';
    
    // Label data
    label?: {
      content?: string;      // Base64 encoded PDF
      content_type?: string; // "application/pdf"
      file_name?: string;    // "label_123.pdf"
    };
    
    // Error information
    error?: {
      code?: string;
      message?: string;
      details?: string;
    };
    
    // Label metadata
    metadata?: {
      created_at?: string;
      expires_at?: string;
      format?: 'PDF' | 'ZPL' | 'PNG';
      size?: {
        width?: number;   // mm
        height?: number;  // mm
      };
    };
    
    // Shipping information
    shipping_info?: {
      carrier?: string;
      service_type?: string;
      tracking_number?: string;
      estimated_delivery?: string;
    };
  }>;
}

// Usage Example
const labels = await fbsApi.packageLabel({
  posting_number: ['FBS-123456789', 'FBS-987654321', 'FBS-555666777']
});

console.log('📄 Label Generation Results:');
labels.result?.forEach((result, index) => {
  console.log(`\n${index + 1}. Posting: ${result.posting_number}`);
  console.log(`   Status: ${result.status}`);
  
  if (result.status === 'success' && result.label) {
    const label = result.label;
    console.log(`   ✅ Label generated: ${label.file_name}`);
    console.log(`   Format: ${label.content_type}`);
    console.log(`   Size: ${(label.content?.length || 0)} bytes`);
    
    if (result.metadata) {
      const meta = result.metadata;
      console.log(`   Created: ${meta.created_at}`);
      console.log(`   Expires: ${meta.expires_at}`);
      console.log(`   Dimensions: ${meta.size?.width}×${meta.size?.height}mm`);
    }
    
    if (result.shipping_info) {
      const shipping = result.shipping_info;
      console.log(`   Carrier: ${shipping.carrier}`);
      console.log(`   Service: ${shipping.service_type}`);
      console.log(`   Tracking: ${shipping.tracking_number}`);
      console.log(`   ETA: ${shipping.estimated_delivery}`);
    }
    
    // Save label file
    if (label.content) {
      const labelBuffer = Buffer.from(label.content, 'base64');
      // Save to file system or send to printer
      console.log(`   📄 Label ready for printing (${labelBuffer.length} bytes)`);
    }
    
  } else if (result.status === 'error' && result.error) {
    console.log(`   ❌ Error: ${result.error.message}`);
    console.log(`   Code: ${result.error.code}`);
    if (result.error.details) {
      console.log(`   Details: ${result.error.details}`);
    }
  }
});

// Batch save labels
const successfulLabels = labels.result?.filter(r => r.status === 'success') || [];
console.log(`\n✅ Successfully generated ${successfulLabels.length} labels`);

if (successfulLabels.length > 0) {
  // Could combine multiple labels into single PDF or process individually
  console.log('Labels ready for printing/shipping');
}
```

### createLabelBatch()
Initiates batch label generation for multiple postings with progress tracking.

```typescript
interface FbsCreateLabelBatchRequest {
  posting_number: string[];
}

interface FbsCreateLabelBatchResponse {
  result?: {
    task_id?: string;
    status?: 'pending' | 'processing' | 'completed' | 'error';
    
    // Batch information
    batch_info?: {
      total_postings?: number;
      estimated_completion?: string;
      priority?: 'normal' | 'high' | 'urgent';
    };
    
    // Progress tracking
    progress?: {
      processed_count?: number;
      success_count?: number;
      error_count?: number;
      completion_percentage?: number;
    };
  };
}

// Usage Example
const batchTask = await fbsApi.createLabelBatch({
  posting_number: [
    'FBS-001', 'FBS-002', 'FBS-003', 'FBS-004', 'FBS-005',
    'FBS-006', 'FBS-007', 'FBS-008', 'FBS-009', 'FBS-010'
  ]
});

if (batchTask.result?.task_id) {
  console.log('🏭 Batch Label Generation Started');
  console.log(`Task ID: ${batchTask.result.task_id}`);
  console.log(`Status: ${batchTask.result.status}`);
  
  if (batchTask.result.batch_info) {
    const info = batchTask.result.batch_info;
    console.log(`Total postings: ${info.total_postings}`);
    console.log(`Priority: ${info.priority}`);
    console.log(`Estimated completion: ${info.estimated_completion}`);
  }
  
  if (batchTask.result.progress) {
    const progress = batchTask.result.progress;
    console.log(`\nProgress: ${progress.completion_percentage}%`);
    console.log(`Processed: ${progress.processed_count}/${batchTask.result.batch_info?.total_postings}`);
    console.log(`Success: ${progress.success_count}`);
    console.log(`Errors: ${progress.error_count}`);
  }
  
  // Continue with getLabelBatch to monitor progress
  console.log('\n⏳ Use getLabelBatch() to monitor progress...');
} else {
  console.error('❌ Failed to start batch generation');
}
```

### getLabelBatch()
Retrieves batch generation status, progress, and download links for completed labels.

```typescript
interface FbsGetLabelBatchRequest {
  task_id: string;
}

interface FbsGetLabelBatchResponse {
  result?: {
    task_id?: string;
    status?: 'pending' | 'processing' | 'completed' | 'error';
    
    // Overall progress
    progress?: {
      total_postings?: number;
      processed_count?: number;
      success_count?: number;
      error_count?: number;
      completion_percentage?: number;
    };
    
    // Completed labels
    labels?: Array<{
      posting_number?: string;
      status?: 'success' | 'error';
      
      // Download information
      label_url?: string;
      expires_at?: string;
      file_size?: number;
      
      // Error details
      error_code?: string;
      error_message?: string;
    }>;
    
    // Batch download
    batch_download?: {
      zip_url?: string;
      zip_expires_at?: string;
      zip_file_size?: number;
      contains_count?: number;
    };
    
    // Processing details
    processing_info?: {
      started_at?: string;
      completed_at?: string;
      processing_time?: number; // seconds
      average_time_per_label?: number; // seconds
    };
    
    // Error summary
    error_summary?: Array<{
      error_code?: string;
      error_message?: string;
      affected_postings?: string[];
      count?: number;
    }>;
  };
}

// Usage Example - Monitor batch progress
async function monitorLabelBatch(taskId: string): Promise<any> {
  console.log(`🔄 Monitoring label batch: ${taskId}`);
  
  while (true) {
    const status = await fbsApi.getLabelBatch({ task_id: taskId });
    
    if (!status.result) {
      throw new Error('Failed to get batch status');
    }
    
    const result = status.result;
    console.log(`\nStatus: ${result.status}`);
    
    if (result.progress) {
      const progress = result.progress;
      console.log(`Progress: ${progress.completion_percentage}%`);
      console.log(`Processed: ${progress.processed_count}/${progress.total_postings}`);
      console.log(`✅ Success: ${progress.success_count}`);
      console.log(`❌ Errors: ${progress.error_count}`);
    }
    
    if (result.status === 'completed') {
      console.log('\n✅ Batch generation completed!');
      
      if (result.processing_info) {
        const info = result.processing_info;
        console.log(`Processing time: ${info.processing_time}s`);
        console.log(`Average per label: ${info.average_time_per_label}s`);
      }
      
      // Individual labels
      if (result.labels?.length) {
        console.log(`\n📄 Individual Labels (${result.labels.length}):`);
        result.labels.forEach((label, index) => {
          if (label.status === 'success') {
            console.log(`${index + 1}. ✅ ${label.posting_number}`);
            console.log(`   URL: ${label.label_url}`);
            console.log(`   Size: ${label.file_size} bytes`);
            console.log(`   Expires: ${label.expires_at}`);
          } else {
            console.log(`${index + 1}. ❌ ${label.posting_number}`);
            console.log(`   Error: ${label.error_message} (${label.error_code})`);
          }
        });
      }
      
      // Batch download
      if (result.batch_download) {
        const batch = result.batch_download;
        console.log(`\n📦 Batch Download:`);
        console.log(`ZIP URL: ${batch.zip_url}`);
        console.log(`Contains: ${batch.contains_count} labels`);
        console.log(`Size: ${batch.zip_file_size} bytes`);
        console.log(`Expires: ${batch.zip_expires_at}`);
      }
      
      // Error summary
      if (result.error_summary?.length) {
        console.log(`\n🔍 Error Summary:`);
        result.error_summary.forEach((error, index) => {
          console.log(`${index + 1}. ${error.error_message} (${error.error_code})`);
          console.log(`   Affected: ${error.count} postings`);
          console.log(`   Postings: ${error.affected_postings?.slice(0, 5).join(', ')}${(error.affected_postings?.length || 0) > 5 ? '...' : ''}`);
        });
      }
      
      return result;
      
    } else if (result.status === 'error') {
      console.error('❌ Batch generation failed');
      throw new Error('Batch generation failed');
    }
    
    // Wait 10 seconds before next check
    console.log('⏳ Checking again in 10 seconds...');
    await new Promise(resolve => setTimeout(resolve, 10000));
  }
}
```

---

## 🔍 Verification & Restrictions Methods

### verifyPickupCode()
Verifies pickup codes for posting collection and validates access permissions.

```typescript
interface FbsPickupCodeVerifyRequest {
  posting_number: string;
  pickup_code: string;
}

interface FbsPickupCodeVerifyResponse {
  result?: {
    is_valid?: boolean;
    posting_number?: string;
    pickup_code?: string;
    
    // Verification details
    verification_info?: {
      verified_at?: string;
      expires_at?: string;
      attempts_remaining?: number;
      max_attempts?: number;
    };
    
    // Posting information (if valid)
    posting_info?: {
      status?: string;
      customer_name?: string;
      pickup_point?: {
        id?: number;
        name?: string;
        address?: string;
        working_hours?: string;
      };
      
      // Products summary
      products_summary?: {
        total_items?: number;
        total_quantity?: number;
        estimated_weight?: number;
      };
    };
    
    // Error information (if invalid)
    error_info?: {
      reason?: 'INVALID_CODE' | 'EXPIRED' | 'ALREADY_USED' | 'TOO_MANY_ATTEMPTS' | 'POSTING_NOT_FOUND';
      message?: string;
      next_attempt_allowed_at?: string;
    };
  };
}

// Usage Example
const verification = await fbsApi.verifyPickupCode({
  posting_number: 'FBS-123456789',
  pickup_code: '1234'
});

if (verification.result) {
  const result = verification.result;
  console.log(`🔍 Pickup Code Verification: ${result.posting_number}`);
  console.log(`Code: ${result.pickup_code}`);
  console.log(`Valid: ${result.is_valid ? '✅ Yes' : '❌ No'}`);
  
  if (result.is_valid && result.posting_info) {
    const posting = result.posting_info;
    console.log(`\n📦 Posting Information:`);
    console.log(`Status: ${posting.status}`);
    console.log(`Customer: ${posting.customer_name}`);
    
    if (posting.pickup_point) {
      const point = posting.pickup_point;
      console.log(`\n📍 Pickup Point:`);
      console.log(`Name: ${point.name}`);
      console.log(`Address: ${point.address}`);
      console.log(`Hours: ${point.working_hours}`);
    }
    
    if (posting.products_summary) {
      const summary = posting.products_summary;
      console.log(`\n📋 Products Summary:`);
      console.log(`Items: ${summary.total_items} types`);
      console.log(`Quantity: ${summary.total_quantity} units`);
      console.log(`Weight: ${summary.estimated_weight}g`);
    }
    
    if (result.verification_info) {
      const info = result.verification_info;
      console.log(`\n🔒 Verification Info:`);
      console.log(`Verified at: ${info.verified_at}`);
      console.log(`Expires: ${info.expires_at}`);
      console.log(`Attempts left: ${info.attempts_remaining}/${info.max_attempts}`);
    }
    
    console.log('\n✅ Code verified - pickup authorized');
    
  } else if (!result.is_valid && result.error_info) {
    const error = result.error_info;
    console.log(`\n❌ Verification Failed:`);
    console.log(`Reason: ${error.reason}`);
    console.log(`Message: ${error.message}`);
    
    if (error.next_attempt_allowed_at) {
      console.log(`Next attempt allowed: ${error.next_attempt_allowed_at}`);
    }
  }
  
  if (result.verification_info) {
    const info = result.verification_info;
    if (info.attempts_remaining && info.attempts_remaining <= 2) {
      console.log(`⚠️  Warning: Only ${info.attempts_remaining} attempts remaining`);
    }
  }
}
```

### getRestrictions()
Gets shipping restrictions and requirements for specific regions or delivery methods.

```typescript
interface FbsGetRestrictionsRequest {
  delivery_method_id?: number;
  region?: string;
  warehouse_id?: number;
}

interface FbsGetRestrictionsResponse {
  result?: {
    delivery_method_id?: number;
    region?: string;
    warehouse_id?: number;
    
    // General restrictions
    general_restrictions?: {
      max_weight?: number;          // kg
      max_dimensions?: {
        length?: number;            // cm
        width?: number;             // cm  
        height?: number;            // cm
      };
      max_declared_value?: number; // RUB
      prohibited_categories?: string[];
      restricted_categories?: string[];
    };
    
    // Packaging requirements
    packaging_requirements?: {
      mandatory_packaging?: boolean;
      fragile_items_extra_packaging?: boolean;
      liquid_items_special_packaging?: boolean;
      temperature_sensitive_packaging?: boolean;
      
      // Packaging materials
      allowed_materials?: string[];
      prohibited_materials?: string[];
      
      // Labeling requirements
      mandatory_labels?: Array<{
        type?: string;
        description?: string;
        required_for_categories?: string[];
      }>;
    };
    
    // Documentation requirements
    documentation_requirements?: {
      customs_declaration?: boolean;
      certificate_of_origin?: boolean;
      safety_certificate?: boolean;
      age_verification?: boolean;
      
      // Special documents
      special_documents?: Array<{
        document_type?: string;
        required_for_categories?: string[];
        description?: string;
      }>;
    };
    
    // Delivery restrictions
    delivery_restrictions?: {
      no_weekend_delivery?: boolean;
      no_evening_delivery?: boolean;
      appointment_required?: boolean;
      signature_required?: boolean;
      adult_signature_required?: boolean;
      
      // Time windows
      delivery_time_windows?: Array<{
        day_of_week?: string;
        start_time?: string;
        end_time?: string;
      }>;
    };
    
    // Regional specifics
    regional_specifics?: {
      additional_customs_requirements?: string[];
      local_restrictions?: string[];
      seasonal_restrictions?: Array<{
        period?: string;
        restriction?: string;
        affected_categories?: string[];
      }>;
    };
    
    // Cost implications
    cost_implications?: {
      additional_fees?: Array<{
        fee_type?: string;
        amount?: number;
        currency?: string;
        applies_to?: string[];
      }>;
      
      insurance_requirements?: {
        mandatory_insurance?: boolean;
        min_coverage?: number;
        max_coverage?: number;
      };
    };
  };
}

// Usage Example
const restrictions = await fbsApi.getRestrictions({
  delivery_method_id: 123,
  region: 'Moscow',
  warehouse_id: 456
});

if (restrictions.result) {
  const r = restrictions.result;
  console.log('📋 Shipping Restrictions');
  console.log('========================');
  console.log(`Delivery Method: ${r.delivery_method_id}`);
  console.log(`Region: ${r.region}`);
  console.log(`Warehouse: ${r.warehouse_id}`);
  
  // General restrictions
  if (r.general_restrictions) {
    const general = r.general_restrictions;
    console.log('\n🚫 General Restrictions:');
    console.log(`Max weight: ${general.max_weight}kg`);
    
    if (general.max_dimensions) {
      const dims = general.max_dimensions;
      console.log(`Max dimensions: ${dims.length}×${dims.width}×${dims.height}cm`);
    }
    
    console.log(`Max declared value: ${general.max_declared_value} RUB`);
    
    if (general.prohibited_categories?.length) {
      console.log(`Prohibited categories: ${general.prohibited_categories.join(', ')}`);
    }
    
    if (general.restricted_categories?.length) {
      console.log(`Restricted categories: ${general.restricted_categories.join(', ')}`);
    }
  }
  
  // Packaging requirements
  if (r.packaging_requirements) {
    const packaging = r.packaging_requirements;
    console.log('\n📦 Packaging Requirements:');
    console.log(`Mandatory packaging: ${packaging.mandatory_packaging ? 'Yes' : 'No'}`);
    console.log(`Fragile items extra: ${packaging.fragile_items_extra_packaging ? 'Yes' : 'No'}`);
    console.log(`Liquid special: ${packaging.liquid_items_special_packaging ? 'Yes' : 'No'}`);
    
    if (packaging.allowed_materials?.length) {
      console.log(`Allowed materials: ${packaging.allowed_materials.join(', ')}`);
    }
    
    if (packaging.mandatory_labels?.length) {
      console.log('Mandatory labels:');
      packaging.mandatory_labels.forEach((label, index) => {
        console.log(`  ${index + 1}. ${label.type}: ${label.description}`);
        if (label.required_for_categories?.length) {
          console.log(`     Categories: ${label.required_for_categories.join(', ')}`);
        }
      });
    }
  }
  
  // Documentation requirements
  if (r.documentation_requirements) {
    const docs = r.documentation_requirements;
    console.log('\n📄 Documentation Requirements:');
    console.log(`Customs declaration: ${docs.customs_declaration ? 'Required' : 'Not required'}`);
    console.log(`Certificate of origin: ${docs.certificate_of_origin ? 'Required' : 'Not required'}`);
    console.log(`Safety certificate: ${docs.safety_certificate ? 'Required' : 'Not required'}`);
    console.log(`Age verification: ${docs.age_verification ? 'Required' : 'Not required'}`);
    
    if (docs.special_documents?.length) {
      console.log('Special documents:');
      docs.special_documents.forEach((doc, index) => {
        console.log(`  ${index + 1}. ${doc.document_type}: ${doc.description}`);
      });
    }
  }
  
  // Delivery restrictions
  if (r.delivery_restrictions) {
    const delivery = r.delivery_restrictions;
    console.log('\n🚚 Delivery Restrictions:');
    console.log(`Weekend delivery: ${delivery.no_weekend_delivery ? 'Not allowed' : 'Allowed'}`);
    console.log(`Evening delivery: ${delivery.no_evening_delivery ? 'Not allowed' : 'Allowed'}`);
    console.log(`Appointment required: ${delivery.appointment_required ? 'Yes' : 'No'}`);
    console.log(`Signature required: ${delivery.signature_required ? 'Yes' : 'No'}`);
    console.log(`Adult signature: ${delivery.adult_signature_required ? 'Yes' : 'No'}`);
    
    if (delivery.delivery_time_windows?.length) {
      console.log('Time windows:');
      delivery.delivery_time_windows.forEach(window => {
        console.log(`  ${window.day_of_week}: ${window.start_time} - ${window.end_time}`);
      });
    }
  }
  
  // Cost implications
  if (r.cost_implications?.additional_fees?.length) {
    console.log('\n💰 Additional Fees:');
    r.cost_implications.additional_fees.forEach((fee, index) => {
      console.log(`${index + 1}. ${fee.fee_type}: ${fee.amount} ${fee.currency}`);
      console.log(`   Applies to: ${fee.applies_to?.join(', ')}`);
    });
  }
}
```

---

## 💼 Business Workflows

### 1. Automated Label Processing System
```typescript
class LabelProcessingSystem {
  private readonly api: FbsApi;
  private readonly batchSize = 50;
  
  constructor(api: FbsApi) {
    this.api = api;
  }
  
  async processLabelsForPostings(postingNumbers: string[]) {
    try {
      console.log(`🏭 Processing labels for ${postingNumbers.length} postings`);
      
      // Split into batches
      const batches = this.createBatches(postingNumbers, this.batchSize);
      const results = [];
      
      for (let i = 0; i < batches.length; i++) {
        const batch = batches[i];
        console.log(`\nProcessing batch ${i + 1}/${batches.length} (${batch.length} postings)`);
        
        if (batch.length <= 10) {
          // Use individual label generation for small batches
          const result = await this.processIndividualLabels(batch);
          results.push(...result);
        } else {
          // Use batch processing for larger batches
          const result = await this.processBatchLabels(batch);
          results.push(...result);
        }
        
        // Rate limiting between batches
        if (i < batches.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }
      
      // Generate summary
      const summary = this.generateSummary(results);
      console.log('\n📊 Label Processing Summary:');
      console.log(`Total processed: ${summary.total}`);
      console.log(`✅ Successful: ${summary.successful}`);
      console.log(`❌ Failed: ${summary.failed}`);
      console.log(`📄 Labels generated: ${summary.labels_generated}`);
      
      return { results, summary };
      
    } catch (error) {
      console.error('Label processing failed:', error);
      throw error;
    }
  }
  
  private async processIndividualLabels(postingNumbers: string[]) {
    const labels = await this.api.packageLabel({
      posting_number: postingNumbers
    });
    
    return labels.result?.map(result => ({
      posting_number: result.posting_number,
      status: result.status,
      error: result.error?.message,
      label_size: result.label?.content?.length || 0
    })) || [];
  }
  
  private async processBatchLabels(postingNumbers: string[]) {
    // Create batch task
    const batchTask = await this.api.createLabelBatch({
      posting_number: postingNumbers
    });
    
    if (!batchTask.result?.task_id) {
      throw new Error('Failed to create batch task');
    }
    
    // Monitor batch completion
    const batchResult = await this.monitorBatchCompletion(batchTask.result.task_id);
    
    return batchResult.labels?.map(label => ({
      posting_number: label.posting_number,
      status: label.status,
      error: label.error_message,
      label_size: label.file_size || 0
    })) || [];
  }
  
  private async monitorBatchCompletion(taskId: string, maxWaitTime = 300000) {
    const startTime = Date.now();
    
    while (Date.now() - startTime < maxWaitTime) {
      const status = await this.api.getLabelBatch({ task_id: taskId });
      
      if (status.result?.status === 'completed') {
        return status.result;
      } else if (status.result?.status === 'error') {
        throw new Error('Batch processing failed');
      }
      
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
    
    throw new Error('Batch processing timeout');
  }
  
  private createBatches<T>(array: T[], batchSize: number): T[][] {
    const batches: T[][] = [];
    for (let i = 0; i < array.length; i += batchSize) {
      batches.push(array.slice(i, i + batchSize));
    }
    return batches;
  }
  
  private generateSummary(results: any[]) {
    return {
      total: results.length,
      successful: results.filter(r => r.status === 'success').length,
      failed: results.filter(r => r.status === 'error').length,
      labels_generated: results.filter(r => r.status === 'success' && r.label_size > 0).length
    };
  }
}
```

---

## 📊 API Endpoints Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `packageLabel` | `POST /v2/posting/fbs/package-label` | Generate shipping labels |
| `createLabelBatch` | `POST /v1/label/batch/create` | Create label batch task |
| `createLabelBatchV2` | `POST /v2/label/batch/create` | Enhanced batch creation |
| `getLabelBatch` | `POST /v1/label/batch/get` | Get batch status |
| `verifyPickupCode` | `POST /v1/posting/fbs/verify-pickup-code` | Verify pickup codes |
| `getRestrictions` | `POST /v1/posting/fbs/restrictions` | Get shipping restrictions |

---

**[← Back to FBS API Main](./18-fbs.md)**