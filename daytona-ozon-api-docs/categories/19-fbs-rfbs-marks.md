# 19. FBS & rFBS Marks API

**FBS & rFBS Marks API** - Product marking and exemplar management for OZON Seller API with mandatory Russian compliance.

## Overview

The FBS & rFBS Marks API provides comprehensive product marking and exemplar management functionality required by Russian law for trackable goods. This specialized API covers exemplar data management, marking code validation, posting shipping with compliance verification, and status monitoring across 15 methods spanning multiple API versions.

### Key Features
- **Product Marking Compliance**: Russian mandatory marking system integration
- **Exemplar Management**: Product instance tracking with GTD (customs declaration) support
- **Multi-Version API**: Support for v1, v4, v5, v6 with progressive feature enhancement
- **Code Validation**: Marking code validation and verification systems
- **Shipping Integration**: Compliant order fulfillment with marking verification
- **Status Monitoring**: Real-time tracking of marking processes and validation

### Regulatory Context
Russian law requires certain product categories to have **mandatory marking** with unique identification codes. This API ensures compliance with:
- **Federal Law 381-FZ**: Mandatory marking requirements
- **GTD Integration**: Customs declaration number tracking
- **CRPT System**: Connection to State Information System for marking
- **Product Categories**: Textiles, shoes, perfumes, tobacco, dairy, etc.

---

## 📋 Methods Overview

### Version Distribution
- **v1 (1 method)**: Legacy exemplar updates
- **v4 (5 methods)**: Core marking functionality (deprecated for some)
- **v5 (4 methods)**: Enhanced marking with additional data
- **v6 (2 methods)**: Latest version with extended attributes
- **Additional (3 methods)**: Validation and listing utilities

### Core Method Categories

#### Exemplar Management
1. **updateProductExemplar (v1)** - Legacy exemplar data updates
2. **createOrGetProductExemplarV5/V6** - Retrieve or create exemplar information
3. **setProductExemplarV4/V5/V6** - Set exemplar data with marking codes
4. **getProductExemplarStatusV4/V5** - Check exemplar processing status

#### Validation & Verification
5. **validateProductExemplarV4/V5** - Validate marking codes before shipping
6. **validatePostingCodes** - Validate all codes for a posting
7. **getPostingCodesValidateStatus** - Check validation task status
8. **getPostingCodesUploadStatus** - Monitor code upload processes

#### Shipping & Fulfillment
9. **shipPostingV4** - Complete order shipping with marking verification
10. **shipPostingPackageV4** - Partial order assembly with compliance

#### Information & Monitoring
11. **getPostingCodesInfo** - Get detailed marking information for posting
12. **getPostingList** - List postings requiring mandatory marking

---

## 🚀 Quick Start Example

```typescript
import { OzonSellerAPI } from 'daytona-ozon-seller-api';

const api = new OzonSellerAPI({
  clientId: 'your-client-id',
  apiKey: 'your-api-key'
});

// Complete marking workflow example
async function markingWorkflowExample() {
  const postingNumber = 'FBS-123456789';
  const productId = 123456;
  
  // 1. Create or get exemplars for marking
  const exemplarInfo = await api.fbsRfbsMarks.createOrGetProductExemplarV6({
    posting_number: postingNumber,
    products: [{
      product_id: productId,
      quantity: 2
    }]
  });
  
  console.log(`Created ${exemplarInfo.exemplars?.length} exemplars`);
  
  // 2. Set marking codes with GTD data
  const setResult = await api.fbsRfbsMarks.setProductExemplarV6({
    posting_number: postingNumber,
    products: [{
      product_id: productId,
      exemplars: [{
        marking_code: '0104600000000001221SgCU4BrhN6WQ\\u001d93dGVz',
        gtd: '10702100/250121/0000123',
        is_gtd_absent: false,
        extended_data: {
          serial_number: 'SN123456',
          production_date: '2024-01-01',
          ean_code: '1234567890123'
        }
      }, {
        marking_code: '0104600000000001221SgCU4BrhN6WR\\u001d93dGVz',
        gtd: '10702100/250121/0000123',
        is_gtd_absent: false,
        extended_data: {
          serial_number: 'SN123457',
          production_date: '2024-01-01',
          ean_code: '1234567890123'
        }
      }]
    }]
  });
  
  console.log('Exemplar data set:', setResult.result);
  
  // 3. Validate marking codes
  const validation = await api.fbsRfbsMarks.validateProductExemplarV5({
    posting_number: postingNumber,
    products: [{
      product_id: productId,
      exemplars: [{
        marking_code: '0104600000000001221SgCU4BrhN6WQ\\u001d93dGVz',
        gtd: '10702100/250121/0000123',
        is_gtd_absent: false
      }]
    }]
  });
  
  console.log('Validation result:', validation.result);
  
  // 4. Ship the order with verified marking
  const shipResult = await api.fbsRfbsMarks.shipPostingV4({
    posting_number: postingNumber,
    packages: [{
      products: [{
        product_id: productId,
        quantity: 2
      }]
    }]
  });
  
  console.log('Order shipped:', shipResult.result);
  
  // 5. Monitor status
  const status = await api.fbsRfbsMarks.getProductExemplarStatusV5({
    posting_number: postingNumber
  });
  
  console.log('Final status:', status.status);
  console.log('Exemplars status:', status.exemplars?.map(e => e.status));
}
```

---

## 📊 Core Data Models

### Exemplar Structure
```typescript
interface ProductExemplar {
  exemplar_id: string;              // Unique exemplar identifier
  marking_code: string;             // DataMatrix marking code (required for compliance)
  gtd?: string;                     // Customs declaration number (GTD)
  is_gtd_absent: boolean;           // Whether GTD is absent
  
  // v5+ Extended data
  additional_info?: {
    serial_number?: string;         // Product serial number
    production_date?: string;       // Production date (YYYY-MM-DD)
    ean_code?: string;             // EAN barcode
  };
  
  // v6+ Extended attributes
  extended_data?: {
    serial_number?: string;
    production_date?: string;
    ean_code?: string;
    attributes?: Record<string, any>; // Custom attributes
  };
  
  status?: 'created' | 'validated' | 'shipped' | 'error'; // Processing status
  error_message?: string;           // Error details if status is 'error'
}
```

### Marking Code Format
Russian marking codes follow DataMatrix format:
```
Format: GTIN + Serial Number + Verification Code
Example: 0104600000000001221SgCU4BrhN6WQ\u001d93dGVz
- 01: Application Identifier (GTIN)
- 04600000000001: GTIN-14 code
- 221SgCU4BrhN6WQ: Serial number (base64)
- \u001d: Group Separator
- 93dGVz: Verification code
```

### Posting Status Types
```typescript
type PostingStatus = 
  | 'awaiting_codes'      // Waiting for marking codes
  | 'codes_provided'      // Codes provided, awaiting validation
  | 'validated'           // Codes validated successfully
  | 'shipping'            // In shipping process
  | 'shipped'             // Successfully shipped with compliance
  | 'error';              // Error in marking process
```

---

## 🛠️ Method Details by Version

## V1 API Methods

### 1. updateProductExemplar

Updates exemplar data for products (legacy method).

**Request Interface:**
```typescript
interface FbsRfbsMarksProductExemplarUpdateRequest {
  posting_number: string;
  products: Array<{
    product_id: number;
    exemplars: Array<{
      exemplar_id: string;          // Existing exemplar ID
      marking_code: string;         // DataMatrix marking code
      gtd?: string;                // Customs declaration
    }>;
  }>;
}
```

**Response Interface:**
```typescript
interface FbsRfbsMarksProductExemplarUpdateResponse {
  result: boolean;                  // Operation success
  errors?: Array<{
    code: string;
    message: string;
    product_id?: number;
    exemplar_id?: string;
  }>;
}
```

**Usage Example:**
```typescript
async function updateExemplarData() {
  const result = await api.fbsRfbsMarks.updateProductExemplar({
    posting_number: 'FBS-123456789',
    products: [{
      product_id: 123456,
      exemplars: [{
        exemplar_id: 'exemplar_123',
        marking_code: '0104600000000001221SgCU4BrhN6WQ\\u001d93dGVz',
        gtd: '10702100/250121/0000123'
      }]
    }]
  });
  
  if (result.result) {
    console.log('Exemplar data updated successfully');
  } else {
    console.error('Update errors:', result.errors);
  }
}
```

---

## V4 API Methods

### 2. setProductExemplarV4 (⚠️ Deprecated)

Sets exemplar data with marking codes (v4 - deprecated, use v5+).

**Request Interface:**
```typescript
interface FbsRfbsMarksProductExemplarSetV4Request {
  posting_number: string;
  products: Array<{
    product_id: number;
    exemplars: Array<{
      marking_code: string;         // DataMatrix code
      gtd?: string;                // Customs declaration
      is_gtd_absent: boolean;      // GTD absence flag
    }>;
  }>;
}
```

**Response Interface:**
```typescript
interface FbsRfbsMarksProductExemplarSetV4Response {
  result: boolean;
  errors?: Array<{
    code: string;
    message: string;
    product_id?: number;
    marking_code?: string;
  }>;
}
```

### 3. getProductExemplarStatusV4

Gets exemplar processing status (v4).

**Request Interface:**
```typescript
interface FbsRfbsMarksProductExemplarStatusV4Request {
  posting_number: string;
}
```

**Response Interface:**
```typescript
interface FbsRfbsMarksProductExemplarStatusV4Response {
  status: 'processing' | 'completed' | 'error';
  exemplars?: Array<{
    product_id: number;
    exemplar_id: string;
    marking_code: string;
    status: 'created' | 'validated' | 'error';
    error_message?: string;
  }>;
}
```

### 4. validateProductExemplarV4

Validates marking codes before shipping (v4).

**Request Interface:**
```typescript
interface FbsRfbsMarksProductExemplarValidateV4Request {
  posting_number: string;
  products: Array<{
    product_id: number;
    exemplars: Array<{
      marking_code: string;
      gtd?: string;
      is_gtd_absent?: boolean;
    }>;
  }>;
}
```

**Response Interface:**
```typescript
interface FbsRfbsMarksProductExemplarValidateV4Response {
  result: boolean;
  validation_results?: Array<{
    product_id: number;
    exemplar_results: Array<{
      marking_code: string;
      is_valid: boolean;
      error_message?: string;
      validation_details?: {
        code_format_valid: boolean;
        code_exists_in_crpt: boolean;
        gtd_matches: boolean;
      };
    }>;
  }>;
}
```

**Usage Example:**
```typescript
async function validateMarkingCodes() {
  const result = await api.fbsRfbsMarks.validateProductExemplarV4({
    posting_number: 'FBS-123456789',
    products: [{
      product_id: 123456,
      exemplars: [{
        marking_code: '0104600000000001221SgCU4BrhN6WQ\\u001d93dGVz',
        gtd: '10702100/250121/0000123',
        is_gtd_absent: false
      }]
    }]
  });
  
  if (result.result) {
    result.validation_results?.forEach(product => {
      product.exemplar_results.forEach(exemplar => {
        if (exemplar.is_valid) {
          console.log(`✅ Code ${exemplar.marking_code} is valid`);
        } else {
          console.error(`❌ Code ${exemplar.marking_code} failed: ${exemplar.error_message}`);
        }
      });
    });
  }
}
```

### 5. shipPostingV4

Ships order with marking verification (v4).

**Request Interface:**
```typescript
interface FbsRfbsMarksPostingShipV4Request {
  posting_number: string;
  packages: Array<{
    products: Array<{
      product_id: number;
      quantity: number;
    }>;
  }>;
}
```

**Response Interface:**
```typescript
interface FbsRfbsMarksPostingShipV4Response {
  result: boolean;
  additional_data?: Array<{
    product_id: number;
    marking_codes_required: boolean;
    codes_provided: number;
    codes_required: number;
  }>;
}
```

### 6. shipPostingPackageV4

Partial posting assembly with compliance (v4).

**Request Interface:**
```typescript
interface FbsRfbsMarksPostingShipPackageV4Request {
  posting_number: string;
  products: Array<{
    product_id: number;
    quantity: number;
  }>;
}
```

---

## V5 API Methods

### 7. createOrGetProductExemplarV5

Creates or retrieves exemplar information (v5).

**Request Interface:**
```typescript
interface FbsRfbsMarksProductExemplarCreateOrGetV5Request {
  posting_number: string;
  products: Array<{
    product_id: number;
    quantity: number;
  }>;
}
```

**Response Interface:**
```typescript
interface FbsRfbsMarksProductExemplarCreateOrGetV5Response {
  exemplars?: Array<{
    product_id: number;
    exemplar_id: string;
    status: 'created' | 'exists';
    marking_required: boolean;
    gtd_required: boolean;
  }>;
}
```

### 8. setProductExemplarV5

Sets exemplar data with enhanced attributes (v5).

**Request Interface:**
```typescript
interface FbsRfbsMarksProductExemplarSetV5Request {
  posting_number: string;
  products: Array<{
    product_id: number;
    exemplars: Array<{
      marking_code: string;
      gtd?: string;
      is_gtd_absent: boolean;
      additional_info?: {
        serial_number?: string;       // Product serial
        production_date?: string;     // YYYY-MM-DD
        ean_code?: string;           // EAN barcode
      };
    }>;
  }>;
}
```

**Usage Example:**
```typescript
async function setEnhancedExemplarData() {
  const result = await api.fbsRfbsMarks.setProductExemplarV5({
    posting_number: 'FBS-123456789',
    products: [{
      product_id: 123456,
      exemplars: [{
        marking_code: '0104600000000001221SgCU4BrhN6WQ\\u001d93dGVz',
        gtd: '10702100/250121/0000123',
        is_gtd_absent: false,
        additional_info: {
          serial_number: 'SN123456',
          production_date: '2024-01-15',
          ean_code: '1234567890123'
        }
      }]
    }]
  });
  
  console.log('Enhanced exemplar data set:', result.result);
}
```

---

## V6 API Methods (Latest)

### 9. createOrGetProductExemplarV6

Latest version for exemplar creation/retrieval.

**Request Interface:**
```typescript
interface FbsRfbsMarksProductExemplarCreateOrGetV6Request {
  posting_number: string;
  products: Array<{
    product_id: number;
    quantity: number;
  }>;
}
```

### 10. setProductExemplarV6

Latest version with maximum extensibility.

**Request Interface:**
```typescript
interface FbsRfbsMarksProductExemplarSetV6Request {
  posting_number: string;
  products: Array<{
    product_id: number;
    exemplars: Array<{
      marking_code: string;
      gtd?: string;
      is_gtd_absent: boolean;
      extended_data?: {
        serial_number?: string;
        production_date?: string;
        ean_code?: string;
        attributes?: Record<string, any>; // Custom fields
      };
    }>;
  }>;
}
```

**Usage Example:**
```typescript
async function setLatestExemplarData() {
  const result = await api.fbsRfbsMarks.setProductExemplarV6({
    posting_number: 'FBS-123456789',
    products: [{
      product_id: 123456,
      exemplars: [{
        marking_code: '0104600000000001221SgCU4BrhN6WQ\\u001d93dGVz',
        gtd: '10702100/250121/0000123',
        is_gtd_absent: false,
        extended_data: {
          serial_number: 'SN123456',
          production_date: '2024-01-15',
          ean_code: '1234567890123',
          attributes: {
            color: 'blue',
            size: 'L',
            material: 'cotton',
            custom_tracking_id: 'CT-123456'
          }
        }
      }]
    }]
  });
}
```

---

## Additional Utility Methods

### 11. getPostingCodesUploadStatus

Monitors marking codes upload progress.

**Request Interface:**
```typescript
interface FbsRfbsMarksPostingCodesUploadStatusRequest {
  task_id: string;                  // Upload task identifier
}
```

**Response Interface:**
```typescript
interface FbsRfbsMarksPostingCodesUploadStatusResponse {
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress?: {
    total_products: number;
    processed_products: number;
    successful_products: number;
    failed_products: number;
  };
  errors?: Array<{
    product_id: number;
    error_message: string;
  }>;
}
```

### 12. validatePostingCodes

Initiates comprehensive code validation.

**Request Interface:**
```typescript
interface FbsRfbsMarksPostingCodesValidateRequest {
  posting_number: string;
}
```

**Response Interface:**
```typescript
interface FbsRfbsMarksPostingCodesValidateResponse {
  task_id: string;                  // Validation task ID
  estimated_completion_time?: string; // ISO timestamp
}
```

### 13. getPostingCodesValidateStatus

Retrieves detailed validation results.

**Request Interface:**
```typescript
interface FbsRfbsMarksPostingCodesValidateStatusRequest {
  task_id: string;
}
```

**Response Interface:**
```typescript
interface FbsRfbsMarksPostingCodesValidateStatusResponse {
  status: 'pending' | 'processing' | 'completed' | 'error';
  validation_result?: {
    all_valid: boolean;
    total_codes: number;
    valid_codes: number;
    invalid_codes: number;
    valid_percentage: number;
    detailed_results: Array<{
      product_id: number;
      marking_code: string;
      is_valid: boolean;
      error_message?: string;
      validation_checks: {
        format_valid: boolean;
        crpt_registered: boolean;
        gtd_matches: boolean;
        not_used_elsewhere: boolean;
      };
    }>;
  };
}
```

**Usage Example:**
```typescript
async function validateAllPostingCodes(postingNumber: string) {
  // Start validation
  const validationTask = await api.fbsRfbsMarks.validatePostingCodes({
    posting_number: postingNumber
  });
  
  console.log(`Validation started: ${validationTask.task_id}`);
  
  // Poll for completion
  let completed = false;
  while (!completed) {
    await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
    
    const status = await api.fbsRfbsMarks.getPostingCodesValidateStatus({
      task_id: validationTask.task_id
    });
    
    console.log(`Validation status: ${status.status}`);
    
    if (status.status === 'completed') {
      const result = status.validation_result!;
      console.log(`Validation complete: ${result.valid_percentage}% valid`);
      console.log(`Valid codes: ${result.valid_codes}/${result.total_codes}`);
      
      if (!result.all_valid) {
        console.log('Invalid codes:');
        result.detailed_results.forEach(code => {
          if (!code.is_valid) {
            console.log(`- ${code.marking_code}: ${code.error_message}`);
          }
        });
      }
      
      completed = true;
    } else if (status.status === 'error') {
      console.error('Validation failed');
      completed = true;
    }
  }
}
```

### 14. getPostingCodesInfo

Gets comprehensive marking information.

**Request Interface:**
```typescript
interface FbsRfbsMarksPostingCodesInfoRequest {
  posting_number: string;
}
```

**Response Interface:**
```typescript
interface FbsRfbsMarksPostingCodesInfoResponse {
  marking_required: boolean;
  summary?: {
    total_products: number;
    products_requiring_marking: number;
    products_with_codes: number;
    products_missing_codes: number;
    compliance_percentage: number;
  };
  products?: Array<{
    product_id: number;
    product_name: string;
    requires_marking: boolean;
    codes_provided: number;
    codes_required: number;
    compliance_status: 'compliant' | 'partial' | 'non_compliant';
  }>;
}
```

### 15. getPostingList

Lists postings requiring mandatory marking.

**Request Interface:**
```typescript
interface FbsRfbsMarksPostingListRequest {
  status?: 'awaiting_codes' | 'codes_provided' | 'validated' | 'error';
  date_from?: string;              // ISO date
  date_to?: string;                // ISO date
  limit?: number;                  // Max 1000
  offset?: number;
}
```

**Response Interface:**
```typescript
interface FbsRfbsMarksPostingListResponse {
  total: number;
  has_next: boolean;
  postings?: Array<{
    posting_number: string;
    status: string;
    created_at: string;
    requires_marking: boolean;
    products_count: number;
    compliance_status: 'compliant' | 'partial' | 'non_compliant';
    products?: Array<{
      product_id: number;
      name: string;
      requires_marking: boolean;
      codes_status: 'missing' | 'partial' | 'complete';
    }>;
  }>;
}
```

---

## 🏗️ Implementation Classes

### MarkingManager Class
```typescript
interface MarkingConfig {
  apiVersion?: 'v4' | 'v5' | 'v6';
  validationTimeout?: number;
  retryAttempts?: number;
  batchSize?: number;
}

class MarkingManager {
  private api: OzonSellerAPI;
  private config: Required<MarkingConfig>;
  
  constructor(api: OzonSellerAPI, config: MarkingConfig = {}) {
    this.api = api;
    this.config = {
      apiVersion: 'v6',
      validationTimeout: 300000, // 5 minutes
      retryAttempts: 3,
      batchSize: 10,
      ...config
    };
  }

  /**
   * Complete marking workflow for a posting
   */
  async processPostingMarking(
    postingNumber: string,
    markingData: Array<{
      productId: number;
      quantity: number;
      markingCodes: Array<{
        code: string;
        gtd?: string;
        additionalData?: any;
      }>;
    }>
  ): Promise<{
    success: boolean;
    exemplarsCreated: number;
    codesValidated: number;
    shipped: boolean;
    errors: string[];
  }> {
    const result = {
      success: false,
      exemplarsCreated: 0,
      codesValidated: 0,
      shipped: false,
      errors: [] as string[]
    };

    try {
      // 1. Create or get exemplars
      const exemplarRequest = {
        posting_number: postingNumber,
        products: markingData.map(item => ({
          product_id: item.productId,
          quantity: item.quantity
        }))
      };

      let exemplarInfo;
      if (this.config.apiVersion === 'v6') {
        exemplarInfo = await this.api.fbsRfbsMarks.createOrGetProductExemplarV6(exemplarRequest);
      } else {
        exemplarInfo = await this.api.fbsRfbsMarks.createOrGetProductExemplarV5(exemplarRequest);
      }

      result.exemplarsCreated = exemplarInfo.exemplars?.length || 0;

      // 2. Set marking codes
      const setRequest = {
        posting_number: postingNumber,
        products: markingData.map(item => ({
          product_id: item.productId,
          exemplars: item.markingCodes.map(codeData => ({
            marking_code: codeData.code,
            gtd: codeData.gtd,
            is_gtd_absent: !codeData.gtd,
            ...(this.config.apiVersion === 'v6' && {
              extended_data: {
                ...codeData.additionalData
              }
            }),
            ...(this.config.apiVersion === 'v5' && codeData.additionalData && {
              additional_info: codeData.additionalData
            })
          }))
        }))
      };

      let setResult;
      if (this.config.apiVersion === 'v6') {
        setResult = await this.api.fbsRfbsMarks.setProductExemplarV6(setRequest);
      } else if (this.config.apiVersion === 'v5') {
        setResult = await this.api.fbsRfbsMarks.setProductExemplarV5(setRequest);
      } else {
        setResult = await this.api.fbsRfbsMarks.setProductExemplarV4(setRequest);
      }

      if (!setResult.result) {
        result.errors.push('Failed to set exemplar data');
        return result;
      }

      // 3. Validate codes
      const validationResult = await this.validateCodesWithRetry(postingNumber);
      result.codesValidated = validationResult.validCount;

      if (validationResult.errors.length > 0) {
        result.errors.push(...validationResult.errors);
      }

      // 4. Ship if all codes are valid
      if (validationResult.allValid) {
        const shipResult = await this.api.fbsRfbsMarks.shipPostingV4({
          posting_number: postingNumber,
          packages: [{
            products: markingData.map(item => ({
              product_id: item.productId,
              quantity: item.quantity
            }))
          }]
        });

        result.shipped = shipResult.result || false;
        if (!result.shipped) {
          result.errors.push('Shipping failed');
        }
      } else {
        result.errors.push('Cannot ship: not all codes are valid');
      }

      result.success = result.shipped && result.errors.length === 0;

    } catch (error: any) {
      result.errors.push(`Processing error: ${error.message}`);
    }

    return result;
  }

  /**
   * Validate codes with automatic retry and timeout
   */
  private async validateCodesWithRetry(postingNumber: string): Promise<{
    allValid: boolean;
    validCount: number;
    totalCount: number;
    errors: string[];
  }> {
    let attempt = 0;
    
    while (attempt < this.config.retryAttempts) {
      try {
        // Start validation
        const validationTask = await this.api.fbsRfbsMarks.validatePostingCodes({
          posting_number: postingNumber
        });

        // Wait for completion
        const startTime = Date.now();
        let completed = false;

        while (!completed && (Date.now() - startTime) < this.config.validationTimeout) {
          await new Promise(resolve => setTimeout(resolve, 5000));

          const status = await this.api.fbsRfbsMarks.getPostingCodesValidateStatus({
            task_id: validationTask.task_id
          });

          if (status.status === 'completed' && status.validation_result) {
            const result = status.validation_result;
            return {
              allValid: result.all_valid,
              validCount: result.valid_codes,
              totalCount: result.total_codes,
              errors: result.detailed_results
                .filter(r => !r.is_valid)
                .map(r => `${r.marking_code}: ${r.error_message}`)
            };
          } else if (status.status === 'error') {
            throw new Error('Validation task failed');
          }
        }

        throw new Error('Validation timeout');

      } catch (error: any) {
        attempt++;
        if (attempt >= this.config.retryAttempts) {
          return {
            allValid: false,
            validCount: 0,
            totalCount: 0,
            errors: [`Validation failed after ${this.config.retryAttempts} attempts: ${error.message}`]
          };
        }
        
        // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }

    return {
      allValid: false,
      validCount: 0,
      totalCount: 0,
      errors: ['Validation failed - maximum retries exceeded']
    };
  }

  /**
   * Monitor postings requiring marking
   */
  async monitorMarkingRequirements(): Promise<{
    totalPostings: number;
    awaitingCodes: number;
    validated: number;
    errors: number;
    urgentActions: Array<{
      postingNumber: string;
      issue: string;
      recommendation: string;
    }>;
  }> {
    const result = {
      totalPostings: 0,
      awaitingCodes: 0,
      validated: 0,
      errors: 0,
      urgentActions: [] as Array<{
        postingNumber: string;
        issue: string;
        recommendation: string;
      }>
    };

    try {
      // Get postings requiring marking
      const postings = await this.api.fbsRfbsMarks.getPostingList({
        date_from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // Last 7 days
        limit: 1000
      });

      result.totalPostings = postings.total;

      for (const posting of postings.postings || []) {
        switch (posting.status) {
          case 'awaiting_codes':
            result.awaitingCodes++;
            if (new Date(posting.created_at).getTime() < Date.now() - 2 * 24 * 60 * 60 * 1000) {
              result.urgentActions.push({
                postingNumber: posting.posting_number,
                issue: 'Awaiting codes for >48 hours',
                recommendation: 'Provide marking codes immediately to avoid shipping delays'
              });
            }
            break;
          case 'validated':
            result.validated++;
            break;
          case 'error':
            result.errors++;
            result.urgentActions.push({
              postingNumber: posting.posting_number,
              issue: 'Marking validation error',
              recommendation: 'Check and correct marking codes'
            });
            break;
        }

        // Check compliance
        if (posting.compliance_status === 'non_compliant') {
          result.urgentActions.push({
            postingNumber: posting.posting_number,
            issue: 'Non-compliant with marking requirements',
            recommendation: 'Review product marking requirements and provide valid codes'
          });
        }
      }

    } catch (error: any) {
      console.error('Error monitoring marking requirements:', error.message);
    }

    return result;
  }
}
```

---

## 🔄 Business Workflows

### Complete Marking Compliance Workflow
```typescript
async function completeMarkingWorkflow() {
  const manager = new MarkingManager(api, { apiVersion: 'v6' });
  
  console.log('🏷️ Complete Marking Compliance Workflow');
  
  // 1. Monitor current marking requirements
  const monitoring = await manager.monitorMarkingRequirements();
  
  console.log(`📊 Monitoring Results:`);
  console.log(`- Total postings: ${monitoring.totalPostings}`);
  console.log(`- Awaiting codes: ${monitoring.awaitingCodes}`);
  console.log(`- Validated: ${monitoring.validated}`);
  console.log(`- Errors: ${monitoring.errors}`);
  
  if (monitoring.urgentActions.length > 0) {
    console.log('\n🚨 Urgent Actions Required:');
    monitoring.urgentActions.forEach(action => {
      console.log(`- ${action.postingNumber}: ${action.issue}`);
      console.log(`  Recommendation: ${action.recommendation}`);
    });
  }
  
  // 2. Process a new posting with marking
  const postingNumber = 'FBS-123456789';
  const markingData = [{
    productId: 123456,
    quantity: 2,
    markingCodes: [{
      code: '0104600000000001221SgCU4BrhN6WQ\\u001d93dGVz',
      gtd: '10702100/250121/0000123',
      additionalData: {
        serial_number: 'SN123456',
        production_date: '2024-01-15',
        ean_code: '1234567890123',
        attributes: {
          color: 'blue',
          size: 'L'
        }
      }
    }, {
      code: '0104600000000001221SgCU4BrhN6WR\\u001d93dGVz',
      gtd: '10702100/250121/0000123',
      additionalData: {
        serial_number: 'SN123457',
        production_date: '2024-01-15',
        ean_code: '1234567890123',
        attributes: {
          color: 'blue',
          size: 'L'
        }
      }
    }]
  }];
  
  console.log(`\n📦 Processing posting: ${postingNumber}`);
  
  const result = await manager.processPostingMarking(postingNumber, markingData);
  
  console.log(`✅ Processing Results:`);
  console.log(`- Success: ${result.success}`);
  console.log(`- Exemplars created: ${result.exemplarsCreated}`);
  console.log(`- Codes validated: ${result.codesValidated}`);
  console.log(`- Shipped: ${result.shipped}`);
  
  if (result.errors.length > 0) {
    console.log(`❌ Errors:`);
    result.errors.forEach(error => console.log(`  - ${error}`));
  }
  
  return result;
}
```

### Bulk Marking Code Validation
```typescript
async function bulkValidateMarkingCodes(postingNumbers: string[]) {
  const results: Array<{
    postingNumber: string;
    valid: boolean;
    validPercentage: number;
    errors: string[];
  }> = [];
  
  console.log(`🔍 Bulk Validation for ${postingNumbers.length} postings`);
  
  for (const postingNumber of postingNumbers) {
    try {
      // Start validation
      const validationTask = await api.fbsRfbsMarks.validatePostingCodes({
        posting_number: postingNumber
      });
      
      // Wait for completion with timeout
      let completed = false;
      let attempts = 0;
      const maxAttempts = 60; // 5 minutes max
      
      while (!completed && attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        attempts++;
        
        const status = await api.fbsRfbsMarks.getPostingCodesValidateStatus({
          task_id: validationTask.task_id
        });
        
        if (status.status === 'completed' && status.validation_result) {
          const result = status.validation_result;
          
          results.push({
            postingNumber,
            valid: result.all_valid,
            validPercentage: result.valid_percentage,
            errors: result.detailed_results
              .filter(r => !r.is_valid)
              .map(r => `${r.marking_code}: ${r.error_message}`)
          });
          
          completed = true;
          
        } else if (status.status === 'error') {
          results.push({
            postingNumber,
            valid: false,
            validPercentage: 0,
            errors: ['Validation task failed']
          });
          completed = true;
        }
      }
      
      if (!completed) {
        results.push({
          postingNumber,
          valid: false,
          validPercentage: 0,
          errors: ['Validation timeout']
        });
      }
      
    } catch (error: any) {
      results.push({
        postingNumber,
        valid: false,
        validPercentage: 0,
        errors: [error.message]
      });
    }
  }
  
  // Summary
  const validPostings = results.filter(r => r.valid).length;
  const avgValidPercentage = results.reduce((sum, r) => sum + r.validPercentage, 0) / results.length;
  
  console.log(`\n📈 Validation Summary:`);
  console.log(`- Fully valid postings: ${validPostings}/${results.length} (${Math.round(validPostings / results.length * 100)}%)`);
  console.log(`- Average validation rate: ${Math.round(avgValidPercentage)}%`);
  
  // Show problematic postings
  const problematicPostings = results.filter(r => !r.valid || r.validPercentage < 100);
  if (problematicPostings.length > 0) {
    console.log(`\n⚠️ Postings requiring attention:`);
    problematicPostings.forEach(posting => {
      console.log(`- ${posting.postingNumber}: ${posting.validPercentage}% valid`);
      if (posting.errors.length > 0) {
        posting.errors.slice(0, 3).forEach(error => console.log(`  • ${error}`));
        if (posting.errors.length > 3) {
          console.log(`  • ... and ${posting.errors.length - 3} more errors`);
        }
      }
    });
  }
  
  return results;
}
```

---

## ⚠️ Error Handling & Compliance

### Common Error Scenarios
```typescript
async function robustMarkingOperations() {
  try {
    // Exemplar creation with error handling
    const exemplarResult = await api.fbsRfbsMarks.createOrGetProductExemplarV6({
      posting_number: 'FBS-123456789',
      products: [{
        product_id: 123456,
        quantity: 2
      }]
    });
    
  } catch (error: any) {
    if (error.response?.status === 400) {
      console.error('Invalid request parameters:', error.response.data);
    } else if (error.response?.status === 404) {
      console.error('Posting not found or not eligible for marking');
    } else if (error.response?.status === 409) {
      console.error('Exemplars already exist for this posting');
    } else {
      console.error('Exemplar creation failed:', error.message);
    }
  }
  
  try {
    // Marking code validation with error handling
    const validationResult = await api.fbsRfbsMarks.validateProductExemplarV5({
      posting_number: 'FBS-123456789',
      products: [{
        product_id: 123456,
        exemplars: [{
          marking_code: 'invalid-code',
          gtd: '10702100/250121/0000123',
          is_gtd_absent: false
        }]
      }]
    });
    
  } catch (error: any) {
    if (error.response?.status === 422) {
      console.error('Marking code validation failed:', error.response.data);
      // Handle specific validation errors
      const validationErrors = error.response.data.validation_results;
      validationErrors?.forEach(productResult => {
        productResult.exemplar_results.forEach(exemplarResult => {
          if (!exemplarResult.is_valid) {
            console.error(`Code ${exemplarResult.marking_code} failed: ${exemplarResult.error_message}`);
            
            // Handle specific error types
            if (exemplarResult.error_message?.includes('format')) {
              console.error('  → Fix: Check DataMatrix code format');
            } else if (exemplarResult.error_message?.includes('CRPT')) {
              console.error('  → Fix: Register code in CRPT system');
            } else if (exemplarResult.error_message?.includes('GTD')) {
              console.error('  → Fix: Verify customs declaration number');
            }
          }
        });
      });
    }
  }
}
```

### Compliance Validation
```typescript
class ComplianceValidator {
  /**
   * Validate DataMatrix code format
   */
  static validateDataMatrixFormat(code: string): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];
    
    // Check basic structure
    if (!code.includes('\\u001d')) {
      errors.push('Missing group separator (\\u001d)');
    }
    
    // Check GTIN prefix (01)
    if (!code.startsWith('01')) {
      errors.push('Missing GTIN application identifier (01)');
    }
    
    // Check length constraints
    if (code.length < 20 || code.length > 150) {
      errors.push('Code length outside valid range (20-150 characters)');
    }
    
    // Extract GTIN part
    const gtinMatch = code.match(/^01(\d{14})/);
    if (!gtinMatch) {
      errors.push('Invalid GTIN-14 format');
    } else {
      const gtin = gtinMatch[1];
      if (!this.validateGTIN14(gtin)) {
        errors.push('Invalid GTIN-14 check digit');
      }
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }
  
  /**
   * Validate GTIN-14 check digit
   */
  private static validateGTIN14(gtin: string): boolean {
    if (gtin.length !== 14 || !/^\d{14}$/.test(gtin)) return false;
    
    const digits = gtin.split('').map(Number);
    const checkDigit = digits.pop()!;
    
    let sum = 0;
    for (let i = 0; i < digits.length; i++) {
      sum += digits[i] * (i % 2 === 0 ? 3 : 1);
    }
    
    const calculatedCheckDigit = (10 - (sum % 10)) % 10;
    return calculatedCheckDigit === checkDigit;
  }
  
  /**
   * Validate GTD format
   */
  static validateGTDFormat(gtd: string): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];
    
    // GTD format: NNNNNMMM/DDMMYY/NNNNNNN
    const gtdPattern = /^\d{8}\/\d{6}\/\d{7}$/;
    
    if (!gtdPattern.test(gtd)) {
      errors.push('GTD must follow format: NNNNNMMM/DDMMYY/NNNNNNN');
    } else {
      const [customsCode, date, regNumber] = gtd.split('/');
      
      // Validate customs code (first 5 digits - customs office code)
      const customsOfficeCode = customsCode.substring(0, 5);
      if (parseInt(customsOfficeCode) < 10000) {
        errors.push('Invalid customs office code');
      }
      
      // Validate date part
      const day = parseInt(date.substring(0, 2));
      const month = parseInt(date.substring(2, 4));
      const year = parseInt(date.substring(4, 6));
      
      if (day < 1 || day > 31) errors.push('Invalid day in GTD');
      if (month < 1 || month > 12) errors.push('Invalid month in GTD');
      if (year < 0 || year > 99) errors.push('Invalid year in GTD');
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }
}
```

---

## 📈 Performance & Monitoring

### Performance Optimizations
```typescript
class OptimizedMarkingManager extends MarkingManager {
  private validationCache = new Map<string, any>();
  private readonly CACHE_TTL = 10 * 60 * 1000; // 10 minutes
  
  /**
   * Cached validation to avoid duplicate API calls
   */
  async getCachedValidationResult(postingNumber: string): Promise<any> {
    const cacheKey = `validation_${postingNumber}`;
    const cached = this.validationCache.get(cacheKey);
    
    if (cached && (Date.now() - cached.timestamp) < this.CACHE_TTL) {
      return cached.result;
    }
    
    // Start fresh validation
    const validationTask = await this.api.fbsRfbsMarks.validatePostingCodes({
      posting_number: postingNumber
    });
    
    // Wait for completion
    const result = await this.waitForValidation(validationTask.task_id);
    
    // Cache result
    this.validationCache.set(cacheKey, {
      result,
      timestamp: Date.now()
    });
    
    return result;
  }
  
  /**
   * Batch processing with concurrency control
   */
  async processBatchWithConcurrency(
    postings: string[],
    concurrency: number = 3
  ): Promise<Array<{
    postingNumber: string;
    success: boolean;
    error?: string;
  }>> {
    const results: Array<{
      postingNumber: string;
      success: boolean;
      error?: string;
    }> = [];
    
    const processPosting = async (postingNumber: string) => {
      try {
        const info = await this.api.fbsRfbsMarks.getPostingCodesInfo({
          posting_number: postingNumber
        });
        
        if (info.marking_required && info.summary?.compliance_percentage !== 100) {
          // Process marking for non-compliant posting
          const validation = await this.getCachedValidationResult(postingNumber);
          
          return {
            postingNumber,
            success: validation?.validation_result?.all_valid || false,
            error: validation?.validation_result?.all_valid ? undefined : 'Validation failed'
          };
        }
        
        return {
          postingNumber,
          success: true
        };
        
      } catch (error: any) {
        return {
          postingNumber,
          success: false,
          error: error.message
        };
      }
    };
    
    // Process in batches with concurrency limit
    for (let i = 0; i < postings.length; i += concurrency) {
      const batch = postings.slice(i, i + concurrency);
      const batchPromises = batch.map(processPosting);
      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);
      
      // Rate limiting between batches
      if (i + concurrency < postings.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    return results;
  }
  
  private async waitForValidation(taskId: string): Promise<any> {
    const maxAttempts = 60; // 5 minutes
    let attempts = 0;
    
    while (attempts < maxAttempts) {
      const status = await this.api.fbsRfbsMarks.getPostingCodesValidateStatus({
        task_id: taskId
      });
      
      if (status.status === 'completed') {
        return status;
      } else if (status.status === 'error') {
        throw new Error('Validation task failed');
      }
      
      await new Promise(resolve => setTimeout(resolve, 5000));
      attempts++;
    }
    
    throw new Error('Validation timeout');
  }
}
```

---

## 📖 Version Migration Guide

### Upgrading from v4 to v5
```typescript
// V4 (Deprecated)
await api.fbsRfbsMarks.setProductExemplarV4({
  posting_number: 'FBS-123456789',
  products: [{
    product_id: 123456,
    exemplars: [{
      marking_code: 'code123',
      gtd: 'GTD123',
      is_gtd_absent: false
    }]
  }]
});

// V5 (Enhanced)
await api.fbsRfbsMarks.setProductExemplarV5({
  posting_number: 'FBS-123456789',
  products: [{
    product_id: 123456,
    exemplars: [{
      marking_code: 'code123',
      gtd: 'GTD123',
      is_gtd_absent: false,
      additional_info: {              // New in v5
        serial_number: 'SN123',
        production_date: '2024-01-01',
        ean_code: '1234567890123'
      }
    }]
  }]
});
```

### Upgrading from v5 to v6
```typescript
// V5
await api.fbsRfbsMarks.setProductExemplarV5({
  posting_number: 'FBS-123456789',
  products: [{
    product_id: 123456,
    exemplars: [{
      marking_code: 'code123',
      gtd: 'GTD123',
      is_gtd_absent: false,
      additional_info: {
        serial_number: 'SN123',
        production_date: '2024-01-01',
        ean_code: '1234567890123'
      }
    }]
  }]
});

// V6 (Latest)
await api.fbsRfbsMarks.setProductExemplarV6({
  posting_number: 'FBS-123456789',
  products: [{
    product_id: 123456,
    exemplars: [{
      marking_code: 'code123',
      gtd: 'GTD123',
      is_gtd_absent: false,
      extended_data: {               // Renamed and enhanced
        serial_number: 'SN123',
        production_date: '2024-01-01',
        ean_code: '1234567890123',
        attributes: {                // New: Custom attributes
          color: 'blue',
          size: 'L',
          material: 'cotton'
        }
      }
    }]
  }]
});
```

---

## 🔗 Related Documentation

- **[FBS API (18-fbs.md)](./18-fbs.md)** - Core FBS operations and posting management
- **[Product API (product.md)](./product.md)** - Product catalog and management
- **[Analytics API (analytics.md)](./analytics.md)** - Sales and performance analytics

---

**Implementation Status**: ✅ Complete  
**Last Updated**: 2024  
**API Versions**: v1, v4 (deprecated), v5, v6 (latest)  
**Methods Count**: 15 methods across 4 API versions  
**Compliance**: Russian Federal Law 381-FZ mandatory marking requirements