# Report API

The Report API enables comprehensive business reporting and analytics generation for OZON sellers.

## Overview

The ReportApi class provides 8 methods for generating various business reports, including financial statements, product analytics, order processing, and inventory analysis. Reports are generated asynchronously and can be downloaded once ready.

## Core Features

- **Financial Reporting** - Cash flow statements and financial analytics
- **Product Reports** - Product performance and inventory analysis
- **Order Analytics** - Shipping and fulfillment reports
- **Return Analysis** - Return processing and analytics
- **Discounted Products** - Markdown and discount reporting
- **Warehouse Reports** - FBS warehouse stock analysis
- **Async Processing** - Non-blocking report generation
- **Multiple Formats** - CSV, XLS, and other export formats

## Quick Start

```typescript
import { OzonSellerApiClient, createApiKey, createClientId } from '@ozon/seller-api';

const client = new OzonSellerApiClient({
  apiKey: createApiKey('your-api-key'),
  clientId: createClientId('your-client-id')
});

// Generate financial report
const financialReport = await client.report.getFinanceCashFlowStatement({
  date: { from: '2024-01-01', to: '2024-01-31' },
  page: 1,
  page_size: 100
});

// Create products report
const productsReport = await client.report.createProductsReport({
  sku: [123456789, 987654321],
  visibility: 'VISIBLE',
  language: 'RU'
});

// Get report status
const reportInfo = await client.report.getReportInfo({
  code: productsReport.result?.code
});
```

## Methods Reference

### Financial Reports

#### `getFinanceCashFlowStatement(request: ReportFinanceCashFlowStatementListRequest): Promise<ReportFinanceCashFlowStatementListResponse>`

Generates financial cash flow statement for specified periods.

**Parameters:**
- `request.date` - Date range (from/to)
- `request.page` - Page number for pagination
- `request.page_size` - Items per page
- `request.with_details` - Include detailed information

**Example:**
```typescript
const report = await client.report.getFinanceCashFlowStatement({
  date: { from: '2024-01-01', to: '2024-01-31' },
  page: 1,
  page_size: 50,
  with_details: true
});

report.result?.operations?.forEach(operation => {
  console.log(`${operation.operation_type}: ${operation.amount} ${operation.currency}`);
});
```

**Notes:**
- Reports are generated for periods 01-15 and 16-31 of each month
- Individual day reports are not available
- Corresponds to "Finances → Balance" section in personal cabinet

### Product Reports

#### `createProductsReport(request: ReportCreateProductsRequest): Promise<ReportCreateResponse>`

Creates a comprehensive products report with pricing, inventory, and status data.

**Parameters:**
- `request.sku` - Array of SKU numbers to include
- `request.visibility` - Product visibility filter
- `request.language` - Report language (RU/EN)

**Example:**
```typescript
const productsReport = await client.report.createProductsReport({
  sku: [123456789, 987654321],
  visibility: 'VISIBLE',
  language: 'RU'
});

console.log(`Products report created: ${productsReport.result?.code}`);

// Check report status
const reportInfo = await client.report.getReportInfo({ 
  code: productsReport.result?.code 
});
```

**Notes:**
- Corresponds to "Products and Prices → Product List → Download → Products CSV"
- Includes Ozon ID, quantities, prices, and status information

#### `createDiscountedReport(request: ReportCreateDiscountedRequest): Promise<ReportCreateDiscountedResponse>`

Generates report for products discounted by Ozon due to damage or other reasons.

**Example:**
```typescript
const report = await client.report.createDiscountedReport({});
console.log(`Discounted products report created: ${report.code}`);

// Get ready report through getReportInfo
const reportInfo = await client.report.getReportInfo({ code: report.code });
```

**Notes:**
- Corresponds to "Analytics → Reports → Ozon Warehouse Sales → Products Discounted by Ozon"
- Ozon may discount products due to damage or quality issues

### Order & Shipping Reports

#### `createPostingsReport(request: ReportCreatePostingsRequest): Promise<ReportCreateResponse>`

Creates detailed shipping and order processing report.

**Parameters:**
- `request.filter` - Date range and status filters
- `request.language` - Report language

**Example:**
```typescript
const postingsReport = await client.report.createPostingsReport({
  filter: {
    since: '2024-01-01',
    to: '2024-01-31',
    status: ['DELIVERED', 'CANCELLED']
  },
  language: 'RU'
});

console.log(`Postings report created: ${postingsReport.result?.code}`);
```

**Features:**
- Order statuses and processing dates
- Order numbers and shipping numbers
- Shipping costs and contents
- Corresponds to "FBO → Ozon Warehouse Orders" and "FBS → My Warehouse Orders → CSV"

### Warehouse & Inventory Reports

#### `createStockByWarehouseReport(request: ReportCreateStockByWarehouseRequest): Promise<ReportCreateResponse>`

Generates FBS warehouse stock level report.

**Parameters:**
- `request.warehouseId` - Array of warehouse IDs
- `request.language` - Report language

**Example:**
```typescript
const stockReport = await client.report.createStockByWarehouseReport({
  warehouseId: ['12345', '67890'],
  language: 'RU'
});

console.log(`Stock report created: ${stockReport.result?.code}`);
```

**Features:**
- Available and reserved product quantities
- Warehouse-specific inventory levels
- Corresponds to "FBS → Logistics Management → Stock Management → Download XLS"

### Return Analysis

#### `createReturnsReport(request: ReportCreateReturnsRequest): Promise<ReportCreateReturnsResponse>`

Generates comprehensive returns report for FBO and FBS operations.

**Parameters:**
- `request.date_from` - Start date
- `request.date_to` - End date
- `request.language` - Report language

**Example:**
```typescript
const returnsReport = await client.report.createReturnsReport({
  date_from: '2024-01-01',
  date_to: '2024-01-31',
  language: 'RU'
});

console.log(`Returns report created: ${returnsReport.code}`);
```

### Report Management

#### `getReportInfo(request: ReportInfoRequest): Promise<ReportInfoResponse>`

Retrieves information about a previously created report.

**Parameters:**
- `request.code` - Report unique identifier

**Example:**
```typescript
const reportInfo = await client.report.getReportInfo({
  code: 'report_code_123'
});

if (reportInfo.result?.status === 'SUCCESS') {
  console.log(`Report ready: ${reportInfo.result.download_url}`);
} else {
  console.log(`Status: ${reportInfo.result?.status}`);
}
```

#### `getReportList(request: ReportListRequest): Promise<ReportListResponse>`

Gets list of previously generated reports.

**Parameters:**
- `request.page` - Page number
- `request.page_size` - Items per page
- `request.report_type` - Filter by report type

**Example:**
```typescript
const reportList = await client.report.getReportList({
  page: 1,
  page_size: 50,
  report_type: 'PRODUCTS'
});

reportList.result?.reports?.forEach(report => {
  console.log(`${report.report_type}: ${report.status} (${report.created_at})`);
});
```

## Report Workflow

### Async Report Generation

1. **Create Report** - Call creation method (returns report code)
2. **Check Status** - Use `getReportInfo()` to check processing status
3. **Download** - Once status is 'SUCCESS', download via provided URL

```typescript
// Step 1: Create report
const report = await client.report.createProductsReport({
  sku: [123456789],
  language: 'RU'
});

// Step 2: Check status periodically
const checkStatus = async (code: string) => {
  const info = await client.report.getReportInfo({ code });
  
  if (info.result?.status === 'SUCCESS') {
    console.log(`Report ready: ${info.result.download_url}`);
    return info.result.download_url;
  } else if (info.result?.status === 'FAILED') {
    throw new Error('Report generation failed');
  } else {
    // Still processing, check again later
    setTimeout(() => checkStatus(code), 5000);
  }
};

await checkStatus(report.result?.code);
```

## Type Definitions

### Request Types

```typescript
interface ReportFinanceCashFlowStatementListRequest {
  date: {
    from: string; // YYYY-MM-DD
    to: string;   // YYYY-MM-DD
  };
  page: number;
  page_size: number;
  with_details?: boolean;
}

interface ReportCreateProductsRequest {
  sku?: number[];
  visibility?: 'ALL' | 'VISIBLE' | 'INVISIBLE';
  language?: 'RU' | 'EN';
}

interface ReportCreatePostingsRequest {
  filter: {
    since: string;
    to: string;
    status?: string[];
  };
  language?: 'RU' | 'EN';
}
```

### Response Types

```typescript
interface ReportCreateResponse {
  result?: {
    code: string;
  };
}

interface ReportInfoResponse {
  result?: {
    status: 'PROCESSING' | 'SUCCESS' | 'FAILED';
    download_url?: string;
    created_at?: string;
    completed_at?: string;
  };
}
```

## Error Handling

```typescript
try {
  const report = await client.report.createProductsReport({
    sku: [123456],
    language: 'RU'
  });
} catch (error) {
  if (error.code === 'INVALID_ARGUMENT') {
    console.error('Invalid SKU or parameters');
  } else if (error.code === 'QUOTA_EXCEEDED') {
    console.error('Report generation quota exceeded');
  } else {
    console.error('Report creation failed:', error.message);
  }
}
```

## Best Practices

1. **Async Processing** - Always check report status before downloading
2. **Date Ranges** - Use appropriate date ranges for financial reports (01-15, 16-31)
3. **Language Settings** - Specify language for consistent report formatting
4. **Status Polling** - Implement reasonable polling intervals for status checks
5. **Error Handling** - Handle both creation and download errors
6. **Resource Management** - Clean up downloaded reports appropriately

## Related APIs

- **[Analytics](./analytics.md)** - Real-time analytics data
- **[Finance](./finance.md)** - Financial operations
- **[Product](./product.md)** - Product information for reports
- **[FBS](./fbs.md)** - FBS operations for warehouse reports