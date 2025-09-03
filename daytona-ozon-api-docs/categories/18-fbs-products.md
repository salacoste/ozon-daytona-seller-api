# FBS Product & Cancel Management

**Product & Cancel Management** - Product operations, cancellations, and administrative functions for FBS API.

## Overview

Product & Cancel Management handles product modifications, order cancellations, country origin management, and cancellation reason administration across 6 specialized methods.

---

## 📋 Methods Overview

### 📦 Product Operations (3 methods)
1. **cancelProducts** - Cancel specific products in posting
2. **changeProducts** - Modify products in posting
3. **setProductCountry** - Set product country of origin

### 📋 Administrative Functions (3 methods)
4. **getProductCountriesList** - Get available countries list
5. **getCancelReasons** - Get cancellation reasons for posting
6. **getCancelReasonsList** - Get all available cancel reasons

---

## 📦 Product Operations Methods

### cancelProducts()
Cancels specific products within a posting while keeping the posting active.

```typescript
interface FbsProductCancelRequest {
  posting_number: string;
  products: Array<{
    product_id: number;
    cancel_reason_id: number;
    cancel_reason_message?: string;
    quantity?: number; // If partial cancellation
  }>;
}

interface FbsProductCancelResponse {
  result?: Array<{
    product_id?: number;
    status?: 'cancelled' | 'error';
    
    // Cancellation details
    cancellation_info?: {
      cancel_reason_id?: number;
      cancel_reason?: string;
      cancelled_quantity?: number;
      remaining_quantity?: number;
      cancelled_at?: string;
    };
    
    // Financial impact
    financial_impact?: {
      cancelled_amount?: number;
      refund_amount?: number;
      commission_adjustment?: number;
      currency?: string;
    };
    
    // Error information
    error?: {
      code?: string;
      message?: string;
      details?: string;
    };
  }>;
  
  // Posting status after cancellation
  posting_status?: {
    posting_number?: string;
    new_status?: string;
    remaining_products?: number;
    total_remaining_amount?: number;
  };
}

// Usage Example
const cancelResult = await fbsApi.cancelProducts({
  posting_number: 'FBS-123456789',
  products: [
    {
      product_id: 12345,
      cancel_reason_id: 402,
      cancel_reason_message: 'Product damaged during packaging',
      quantity: 1 // Partial cancellation
    },
    {
      product_id: 67890,
      cancel_reason_id: 404,
      cancel_reason_message: 'Product out of stock'
      // Full quantity cancellation (no quantity specified)
    }
  ]
});

if (cancelResult.result) {
  console.log(`📦 Product Cancellation Results for ${cancelResult.posting_status?.posting_number}`);
  
  cancelResult.result.forEach((result, index) => {
    console.log(`\n${index + 1}. Product ID: ${result.product_id}`);
    console.log(`   Status: ${result.status}`);
    
    if (result.status === 'cancelled' && result.cancellation_info) {
      const info = result.cancellation_info;
      console.log(`   ✅ Successfully cancelled`);
      console.log(`   Reason: ${info.cancel_reason} (ID: ${info.cancel_reason_id})`);
      console.log(`   Cancelled quantity: ${info.cancelled_quantity}`);
      console.log(`   Remaining quantity: ${info.remaining_quantity}`);
      console.log(`   Cancelled at: ${info.cancelled_at}`);
      
      if (result.financial_impact) {
        const financial = result.financial_impact;
        console.log(`   Financial impact:`);
        console.log(`     Cancelled amount: ${financial.cancelled_amount} ${financial.currency}`);
        console.log(`     Refund amount: ${financial.refund_amount} ${financial.currency}`);
        console.log(`     Commission adjustment: ${financial.commission_adjustment} ${financial.currency}`);
      }
      
    } else if (result.status === 'error' && result.error) {
      console.log(`   ❌ Cancellation failed`);
      console.log(`   Error: ${result.error.message} (${result.error.code})`);
      if (result.error.details) {
        console.log(`   Details: ${result.error.details}`);
      }
    }
  });
  
  // Overall posting status
  if (cancelResult.posting_status) {
    const status = cancelResult.posting_status;
    console.log(`\n📋 Posting Status After Cancellation:`);
    console.log(`   New status: ${status.new_status}`);
    console.log(`   Remaining products: ${status.remaining_products}`);
    console.log(`   Remaining amount: ${status.total_remaining_amount} RUB`);
  }
  
  // Summary
  const successful = cancelResult.result.filter(r => r.status === 'cancelled').length;
  const failed = cancelResult.result.filter(r => r.status === 'error').length;
  console.log(`\n📊 Summary: ${successful} cancelled, ${failed} failed`);
}
```

### changeProducts()
Modifies product details within existing posting (quantities, prices, etc.).

```typescript
interface FbsProductChangeRequest {
  posting_number: string;
  products: Array<{
    product_id: number;
    
    // What to change
    changes: {
      quantity?: number;
      price?: number;
      dimensions?: {
        height?: number;
        length?: number;
        width?: number;
        weight?: number;
      };
    };
    
    // Change reason
    change_reason?: string;
  }>;
}

interface FbsProductChangeResponse {
  result?: Array<{
    product_id?: number;
    status?: 'changed' | 'error';
    
    // Change details
    change_info?: {
      applied_changes?: {
        quantity?: {
          old_value?: number;
          new_value?: number;
        };
        price?: {
          old_value?: number;
          new_value?: number;
        };
        dimensions?: {
          old_dimensions?: {
            height?: number;
            length?: number;
            width?: number;
            weight?: number;
          };
          new_dimensions?: {
            height?: number;
            length?: number;
            width?: number;
            weight?: number;
          };
        };
      };
      
      change_reason?: string;
      changed_at?: string;
    };
    
    // Financial impact
    financial_impact?: {
      price_difference?: number;
      total_difference?: number;
      commission_adjustment?: number;
      currency?: string;
    };
    
    // Validation results
    validation?: {
      dimension_compliance?: boolean;
      weight_compliance?: boolean;
      price_compliance?: boolean;
      category_compliance?: boolean;
      warnings?: string[];
    };
    
    // Error information
    error?: {
      code?: string;
      message?: string;
      field?: string; // Which field caused the error
    };
  }>;
}

// Usage Example
const changeResult = await fbsApi.changeProducts({
  posting_number: 'FBS-123456789',
  products: [
    {
      product_id: 12345,
      changes: {
        quantity: 2, // Reduce quantity from 3 to 2
        price: 1500  // Update price
      },
      change_reason: 'Customer requested quantity reduction'
    },
    {
      product_id: 67890,
      changes: {
        dimensions: {
          height: 15,
          length: 25,
          width: 20,
          weight: 500
        }
      },
      change_reason: 'Corrected packaging dimensions'
    }
  ]
});

if (changeResult.result) {
  console.log('🔄 Product Change Results:');
  
  changeResult.result.forEach((result, index) => {
    console.log(`\n${index + 1}. Product ID: ${result.product_id}`);
    console.log(`   Status: ${result.status}`);
    
    if (result.status === 'changed' && result.change_info) {
      const info = result.change_info;
      console.log(`   ✅ Changes applied successfully`);
      console.log(`   Reason: ${info.change_reason}`);
      console.log(`   Changed at: ${info.changed_at}`);
      
      // Show applied changes
      if (info.applied_changes) {
        const changes = info.applied_changes;
        
        if (changes.quantity) {
          console.log(`   Quantity: ${changes.quantity.old_value} → ${changes.quantity.new_value}`);
        }
        
        if (changes.price) {
          console.log(`   Price: ${changes.price.old_value} → ${changes.price.new_value} RUB`);
        }
        
        if (changes.dimensions) {
          const oldDims = changes.dimensions.old_dimensions;
          const newDims = changes.dimensions.new_dimensions;
          console.log(`   Dimensions:`);
          console.log(`     Old: ${oldDims?.length}×${oldDims?.width}×${oldDims?.height}mm, ${oldDims?.weight}g`);
          console.log(`     New: ${newDims?.length}×${newDims?.width}×${newDims?.height}mm, ${newDims?.weight}g`);
        }
      }
      
      // Financial impact
      if (result.financial_impact) {
        const financial = result.financial_impact;
        console.log(`   Financial impact:`);
        console.log(`     Price difference: ${financial.price_difference} ${financial.currency}`);
        console.log(`     Total difference: ${financial.total_difference} ${financial.currency}`);
        console.log(`     Commission adjustment: ${financial.commission_adjustment} ${financial.currency}`);
      }
      
      // Validation results
      if (result.validation) {
        const validation = result.validation;
        console.log(`   Validation:`);
        console.log(`     Dimensions: ${validation.dimension_compliance ? '✅' : '❌'}`);
        console.log(`     Weight: ${validation.weight_compliance ? '✅' : '❌'}`);
        console.log(`     Price: ${validation.price_compliance ? '✅' : '❌'}`);
        console.log(`     Category: ${validation.category_compliance ? '✅' : '❌'}`);
        
        if (validation.warnings?.length) {
          console.log(`   Warnings:`);
          validation.warnings.forEach(warning => {
            console.log(`     ⚠️  ${warning}`);
          });
        }
      }
      
    } else if (result.status === 'error' && result.error) {
      console.log(`   ❌ Change failed`);
      console.log(`   Error: ${result.error.message} (${result.error.code})`);
      if (result.error.field) {
        console.log(`   Field: ${result.error.field}`);
      }
    }
  });
}
```

### setProductCountry()
Sets country of origin for products in posting for customs and legal compliance.

```typescript
interface FbsProductCountrySetRequest {
  posting_number: string;
  products: Array<{
    product_id: number;
    country_iso: string; // ISO 3166-1 alpha-2 code (e.g., "RU", "CN", "US")
  }>;
}

interface FbsProductCountrySetResponse {
  result?: Array<{
    product_id?: number;
    country_iso?: string;
    status?: 'success' | 'error';
    
    // Country information
    country_info?: {
      country_name?: string;
      country_code?: string;
      region?: string;
    };
    
    // Compliance impact
    compliance_impact?: {
      customs_declaration_required?: boolean;
      certificate_of_origin_required?: boolean;
      additional_fees?: Array<{
        fee_type?: string;
        amount?: number;
        currency?: string;
      }>;
      processing_time_impact?: number; // additional days
    };
    
    // Error information
    error?: {
      code?: string;
      message?: string;
    };
  }>;
}

// Usage Example
const countryResult = await fbsApi.setProductCountry({
  posting_number: 'FBS-123456789',
  products: [
    { product_id: 12345, country_iso: 'CN' }, // Made in China
    { product_id: 67890, country_iso: 'RU' }, // Made in Russia
    { product_id: 11111, country_iso: 'DE' }  // Made in Germany
  ]
});

if (countryResult.result) {
  console.log('🌍 Product Country Assignment Results:');
  
  countryResult.result.forEach((result, index) => {
    console.log(`\n${index + 1}. Product ID: ${result.product_id}`);
    console.log(`   Status: ${result.status}`);
    
    if (result.status === 'success') {
      console.log(`   ✅ Country set successfully`);
      console.log(`   Country: ${result.country_info?.country_name} (${result.country_iso})`);
      console.log(`   Region: ${result.country_info?.region}`);
      
      if (result.compliance_impact) {
        const compliance = result.compliance_impact;
        console.log(`   Compliance requirements:`);
        console.log(`     Customs declaration: ${compliance.customs_declaration_required ? 'Required' : 'Not required'}`);
        console.log(`     Certificate of origin: ${compliance.certificate_of_origin_required ? 'Required' : 'Not required'}`);
        
        if (compliance.additional_fees?.length) {
          console.log(`     Additional fees:`);
          compliance.additional_fees.forEach(fee => {
            console.log(`       ${fee.fee_type}: ${fee.amount} ${fee.currency}`);
          });
        }
        
        if (compliance.processing_time_impact) {
          console.log(`     Processing time: +${compliance.processing_time_impact} days`);
        }
      }
      
    } else if (result.status === 'error' && result.error) {
      console.log(`   ❌ Failed to set country`);
      console.log(`   Error: ${result.error.message} (${result.error.code})`);
    }
  });
}
```

---

## 📋 Administrative Functions Methods

### getProductCountriesList()
Gets list of available countries for product origin assignment.

```typescript
interface FbsProductCountryListResponse {
  result?: Array<{
    country_iso?: string;
    country_name?: string;
    region?: string;
    
    // Usage information
    is_active?: boolean;
    is_popular?: boolean; // Frequently used countries
    
    // Requirements for this country
    requirements?: {
      customs_declaration_required?: boolean;
      certificate_of_origin_required?: boolean;
      special_documentation?: string[];
    };
    
    // Processing information
    processing_info?: {
      additional_processing_days?: number;
      requires_approval?: boolean;
    };
  }>;
}

// Usage Example
const countries = await fbsApi.getProductCountriesList({});

if (countries.result) {
  console.log('🌍 Available Product Countries:');
  console.log(`Total countries: ${countries.result.length}`);
  
  // Show popular countries first
  const popularCountries = countries.result.filter(c => c.is_popular);
  const otherCountries = countries.result.filter(c => !c.is_popular);
  
  if (popularCountries.length) {
    console.log('\n⭐ Popular Countries:');
    popularCountries.forEach(country => {
      console.log(`   ${country.country_iso}: ${country.country_name} (${country.region})`);
      
      if (country.requirements?.customs_declaration_required) {
        console.log(`      📋 Requires customs declaration`);
      }
      if (country.processing_info?.additional_processing_days) {
        console.log(`      ⏳ +${country.processing_info.additional_processing_days} days processing`);
      }
    });
  }
  
  console.log(`\n📋 All Countries Available: ${countries.result.length} total`);
  console.log('Use country ISO codes (e.g., RU, CN, US, DE) when setting product countries');
}
```

### getCancelReasons()
Gets available cancellation reasons for specific posting.

```typescript
interface FbsCancelReasonResponse {
  result?: Array<{
    id?: number;
    reason?: string;
    
    // Reason details
    category?: 'seller' | 'buyer' | 'system' | 'logistics';
    is_active?: boolean;
    affects_rating?: boolean;
    
    // When this reason applies
    applicable_stages?: string[]; // posting statuses when this reason can be used
    requires_comment?: boolean;
    
    // Impact information
    impact_info?: {
      cancellation_fee?: number;
      affects_seller_metrics?: boolean;
      customer_compensation?: boolean;
      return_logistics_required?: boolean;
    };
  }>;
}

// Usage Example  
const reasons = await fbsApi.getCancelReasons({
  posting_number: 'FBS-123456789'
});

if (reasons.result) {
  console.log('❌ Available Cancellation Reasons:');
  
  const byCategory = reasons.result.reduce((acc, reason) => {
    const category = reason.category || 'unknown';
    if (!acc[category]) acc[category] = [];
    acc[category].push(reason);
    return acc;
  }, {} as Record<string, any[]>);
  
  Object.entries(byCategory).forEach(([category, categoryReasons]) => {
    console.log(`\n📂 ${category.toUpperCase()} (${categoryReasons.length} reasons):`);
    
    categoryReasons.forEach(reason => {
      const ratingIcon = reason.affects_rating ? '📉' : '';
      const commentIcon = reason.requires_comment ? '💬' : '';
      
      console.log(`   ${reason.id}: ${reason.reason} ${ratingIcon}${commentIcon}`);
      
      if (reason.impact_info) {
        const impact = reason.impact_info;
        if (impact.cancellation_fee) {
          console.log(`      💰 Fee: ${impact.cancellation_fee} RUB`);
        }
        if (impact.affects_seller_metrics) {
          console.log(`      📊 Affects seller metrics`);
        }
        if (impact.customer_compensation) {
          console.log(`      💸 Customer compensation required`);
        }
      }
      
      if (reason.applicable_stages?.length) {
        console.log(`      📋 Applicable in: ${reason.applicable_stages.join(', ')}`);
      }
    });
  });
}
```

---

## 💼 Business Workflows

### 1. Smart Product Management System
```typescript
class ProductManagementSystem {
  private readonly api: FbsApi;
  
  constructor(api: FbsApi) {
    this.api = api;
  }
  
  async handleInventoryAdjustments(adjustments: Array<{
    postingNumber: string;
    productId: number;
    availableQuantity: number;
    reason: string;
  }>) {
    const results = [];
    
    for (const adjustment of adjustments) {
      try {
        // Get current posting details
        const posting = await this.api.getPostingV3({
          posting_number: adjustment.postingNumber
        });
        
        const product = posting.result?.products?.find(p => p.sku === adjustment.productId);
        if (!product) {
          results.push({
            postingNumber: adjustment.postingNumber,
            productId: adjustment.productId,
            action: 'error',
            reason: 'Product not found in posting'
          });
          continue;
        }
        
        const requestedQuantity = product.quantity || 0;
        
        if (adjustment.availableQuantity === 0) {
          // Cancel the product completely
          await this.api.cancelProducts({
            posting_number: adjustment.postingNumber,
            products: [{
              product_id: adjustment.productId,
              cancel_reason_id: 402,
              cancel_reason_message: adjustment.reason
            }]
          });
          
          results.push({
            postingNumber: adjustment.postingNumber,
            productId: adjustment.productId,
            action: 'cancelled',
            reason: adjustment.reason
          });
          
        } else if (adjustment.availableQuantity < requestedQuantity) {
          // Reduce quantity
          await this.api.changeProducts({
            posting_number: adjustment.postingNumber,
            products: [{
              product_id: adjustment.productId,
              changes: {
                quantity: adjustment.availableQuantity
              },
              change_reason: adjustment.reason
            }]
          });
          
          results.push({
            postingNumber: adjustment.postingNumber,
            productId: adjustment.productId,
            action: 'reduced',
            oldQuantity: requestedQuantity,
            newQuantity: adjustment.availableQuantity,
            reason: adjustment.reason
          });
        } else {
          // No adjustment needed
          results.push({
            postingNumber: adjustment.postingNumber,
            productId: adjustment.productId,
            action: 'no_change',
            reason: 'Sufficient inventory available'
          });
        }
        
      } catch (error) {
        results.push({
          postingNumber: adjustment.postingNumber,
          productId: adjustment.productId,
          action: 'error',
          reason: error.message
        });
      }
    }
    
    return results;
  }
}
```

---

## 📊 API Endpoints Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `cancelProducts` | `POST /v2/posting/fbs/product/cancel` | Cancel products |
| `changeProducts` | `POST /v2/posting/fbs/product/change` | Change products |
| `setProductCountry` | `POST /v1/posting/fbs/product/country/set` | Set product country |
| `getProductCountriesList` | `POST /v1/posting/fbs/product/country/list` | Get countries list |
| `getCancelReasons` | `POST /v2/posting/fbs/cancel-reason` | Get cancel reasons |
| `getCancelReasonsList` | `POST /v1/posting/fbs/cancel-reason/list` | Get all reasons |

---

**[← Back to FBS API Main](./18-fbs.md)**