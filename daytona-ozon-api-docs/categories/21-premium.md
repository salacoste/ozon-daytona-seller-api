# 21. Premium API

**Premium API** - Premium seller features and advanced analytics for OZON Seller API.

## Overview

The Premium API provides advanced seller features and comprehensive analytics capabilities exclusively available to Premium and Premium Plus subscribers. This premium-tier API covers enhanced analytics, product query insights, chat functionality, financial reporting, and customer communication across 8 specialized methods.

### ⚠️ Subscription Requirements
- **Premium**: Required for product queries and basic analytics
- **Premium Plus**: Required for advanced analytics, chat features, and financial reports
- **Rate Limits**: Analytics methods limited to 1 request per minute
- **Data Retention**: Financial data available for up to 32 days

### Key Features
- **Advanced Analytics**: Multi-dimensional data analysis with custom metrics
- **Product Queries**: Search term insights and CTR optimization
- **Chat Integration**: Direct customer communication capabilities
- **Financial Reporting**: Daily realization reports with detailed breakdowns
- **Premium Insights**: Enhanced business intelligence and performance metrics

---

## 📋 Available Methods

### Analytics & Insights (Premium Plus)
1. **getAnalyticsData** - Advanced multi-dimensional analytics data
2. **getRealizationByDay** - Daily financial realization reports

### Product Performance (Premium/Premium Plus)
3. **getProductQueries** - Product search query analytics
4. **getProductQueriesDetails** - Detailed query performance metrics

### Customer Communication (Premium Plus)
5. **startChat** - Initiate customer chat sessions
6. **sendChatMessage** - Send messages to customers
7. **getChatHistory** - Retrieve chat conversation history
8. **markChatAsRead** - Mark messages as read

---

## 🚀 Quick Start Example

```typescript
import { OzonSellerAPI } from 'daytona-ozon-seller-api';

const api = new OzonSellerAPI({
  clientId: 'your-client-id',
  apiKey: 'your-api-key'
});

// Complete Premium workflow example
async function premiumWorkflowExample() {
  // ⚠️ Requires Premium Plus subscription
  
  // 1. Get advanced analytics data
  const analytics = await api.premium.getAnalyticsData({
    date_from: '2024-01-01',
    date_to: '2024-01-31',
    dimension: ['sku', 'week', 'category1'],
    metrics: ['revenue', 'ordered_units', 'hits_view', 'conv_tocart'],
    limit: 500,
    filters: [{
      field: 'category1',
      values: ['Electronics', 'Home & Garden']
    }]
  });
  
  console.log(`📊 Analytics Data: ${analytics.result?.data?.length} records`);
  
  // Analyze top performing products
  const topProducts = analytics.result?.data
    ?.sort((a, b) => (b.metrics?.revenue || 0) - (a.metrics?.revenue || 0))
    .slice(0, 10);
    
  console.log('🏆 Top 10 Products by Revenue:');
  topProducts?.forEach((item, index) => {
    console.log(`${index + 1}. SKU: ${item.dimensions?.sku}, Revenue: ${item.metrics?.revenue}`);
    console.log(`   Views: ${item.metrics?.hits_view}, Conversion: ${item.metrics?.conv_tocart}%`);
  });
  
  // 2. Analyze product search queries
  const queries = await api.premium.getProductQueries({
    date_from: '2024-01-01',
    date_to: '2024-01-31',
    skus: topProducts?.map(p => p.dimensions?.sku).filter(Boolean) || [],
    page_size: 50,
    sort_by: 'queries_count',
    sort_dir: 'DESC'
  });
  
  console.log(`🔍 Product Queries: ${queries.items?.length} items`);
  
  // Find products with low CTR for optimization
  const lowCtrProducts = queries.items?.filter(item => 
    (item.ctr || 0) < 5 && (item.queries_count || 0) > 100
  );
  
  if (lowCtrProducts && lowCtrProducts.length > 0) {
    console.log('⚠️ Products needing SEO optimization (low CTR):');
    lowCtrProducts.forEach(product => {
      console.log(`  SKU: ${product.sku}, CTR: ${product.ctr}%, Queries: ${product.queries_count}`);
    });
  }
  
  // 3. Get detailed query information for optimization
  if (lowCtrProducts && lowCtrProducts.length > 0) {
    const queryDetails = await api.premium.getProductQueriesDetails({
      date_from: '2024-01-01',
      date_to: '2024-01-31',
      skus: [lowCtrProducts[0].sku],
      limit_by_sku: 20,
      page_size: 100,
      sort_by: 'clicks',
      sort_dir: 'DESC'
    });
    
    console.log(`📝 Search Queries for SKU ${lowCtrProducts[0].sku}:`);
    queryDetails.queries?.slice(0, 5).forEach(query => {
      console.log(`  "${query.query}": ${query.clicks} clicks, position ${query.position}, CTR: ${query.ctr}%`);
    });
  }
  
  // 4. Start customer communication
  const posting = '12345-0001-1';
  const newChat = await api.premium.startChat({
    posting_number: posting
  });
  
  if (newChat.result?.chat_id) {
    console.log(`💬 Chat started: ${newChat.result.chat_id}`);
    
    // Send welcome message
    const message = await api.premium.sendChatMessage({
      chat_id: newChat.result.chat_id,
      text: 'Здравствуйте! Спасибо за покупку. Есть вопросы по заказу?'
    });
    
    console.log(`📨 Message sent: ${message.result}`);
  }
  
  // 5. Get daily financial report
  const today = new Date();
  const report = await api.premium.getRealizationByDay({
    day: today.getDate(),
    month: today.getMonth() + 1,
    year: today.getFullYear()
  });
  
  console.log(`💰 Today's Realization Report:`);
  console.log(`Total Products: ${report.rows?.length}`);
  
  const totalRevenue = report.rows?.reduce((sum, row) => sum + (parseFloat(row.amount) || 0), 0);
  console.log(`Total Revenue: ${totalRevenue?.toFixed(2)} RUB`);
  
  // Top selling products today
  const topSelling = report.rows
    ?.sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount))
    .slice(0, 5);
    
  console.log('🔥 Top Selling Today:');
  topSelling?.forEach((item, index) => {
    console.log(`${index + 1}. ${item.name}: ${item.quantity} units, ${item.amount} ${item.currency}`);
  });
}
```

---

## 📊 Core Data Models

### Analytics Data Structure
```typescript
interface AnalyticsData {
  dimensions?: {
    sku?: string;              // Product SKU
    day?: string;              // Date (YYYY-MM-DD)
    week?: string;             // Week number
    month?: string;            // Month number
    category1?: string;        // Primary category
    category2?: string;        // Secondary category
    category3?: string;        // Tertiary category
    brand?: string;            // Brand name
  };
  metrics?: {
    revenue?: number;          // Revenue in rubles
    ordered_units?: number;    // Units ordered
    hits_view?: number;        // Product page views
    hits_tocart?: number;      // Add to cart actions
    conv_tocart?: number;      // Conversion to cart (%)
    session_view?: number;     // Unique sessions with views
    postings?: number;         // Number of orders
  };
}

type AnalyticsDimension = 
  | 'sku'                     // Product level analysis
  | 'day'                     // Daily breakdown
  | 'week'                    // Weekly aggregation
  | 'month'                   // Monthly aggregation
  | 'category1'               // Primary category grouping
  | 'category2'               // Secondary category grouping
  | 'category3'               // Tertiary category grouping
  | 'brand';                  // Brand-level analysis

type AnalyticsMetric = 
  | 'revenue'                 // Total revenue
  | 'ordered_units'           // Units sold
  | 'hits_view'               // Page views
  | 'hits_tocart'             // Cart additions
  | 'conv_tocart'             // Conversion rate
  | 'session_view'            // Unique sessions
  | 'postings';               // Order count
```

### Product Query Structure
```typescript
interface ProductQuery {
  sku: string;                // Product SKU
  queries_count: number;      // Total query count
  ctr: number;                // Click-through rate (%)
  avg_position: number;       // Average search position
  clicks: number;             // Total clicks
  shows: number;              // Total impressions
}

interface QueryDetail {
  query: string;              // Search term
  clicks: number;             // Clicks for this query
  shows: number;              // Impressions for this query
  ctr: number;                // CTR for this query (%)
  position: number;           // Average position in search results
}
```

### Chat Message Structure
```typescript
interface ChatMessage {
  message_id: string;         // Unique message identifier
  chat_id: string;            // Chat session identifier
  author: 'seller' | 'buyer'; // Message author type
  text: string;               // Message content
  created_at: string;         // ISO timestamp
  is_read: boolean;           // Read status
  attachments?: Array<{       // Optional file attachments
    type: 'image' | 'document';
    url: string;
    filename: string;
  }>;
}
```

### Financial Report Structure
```typescript
interface RealizationItem {
  name: string;               // Product name
  sku: string;                // Product SKU
  quantity: number;           // Units sold
  amount: string;             // Revenue amount
  currency: string;           // Currency code (RUB)
  commission: string;         // Commission amount
  net_amount: string;         // Net revenue after commission
}
```

---

## 🛠️ Method Details

## Analytics Methods (Premium Plus Required)

### 1. getAnalyticsData

Advanced multi-dimensional analytics with custom metrics and filtering.

**Request Interface:**
```typescript
interface PremiumAnalyticsGetDataRequest {
  date_from: string;          // Start date (YYYY-MM-DD)
  date_to: string;            // End date (YYYY-MM-DD)
  dimension: AnalyticsDimension[]; // Grouping dimensions
  metrics: AnalyticsMetric[]; // Metrics to calculate
  limit?: number;             // Max results (default 100)
  offset?: number;            // Pagination offset
  filters?: Array<{           // Optional filters
    field: string;            // Filter field
    values: string[];         // Filter values
  }>;
}
```

**Response Interface:**
```typescript
interface PremiumAnalyticsGetDataResponse {
  result?: {
    data?: AnalyticsData[];   // Analytics data points
    total_count: number;      // Total available records
    timestamp: string;        // Report generation time
  };
}
```

**Usage Examples:**

#### Multi-Dimensional Revenue Analysis
```typescript
async function analyzeRevenuePerformance() {
  const analytics = await api.premium.getAnalyticsData({
    date_from: '2024-01-01',
    date_to: '2024-01-31',
    dimension: ['category1', 'week'],
    metrics: ['revenue', 'ordered_units', 'conv_tocart'],
    limit: 1000,
    filters: [{
      field: 'category1',
      values: ['Electronics', 'Home & Garden', 'Fashion']
    }]
  });
  
  // Group by category and analyze trends
  const categoryAnalysis = new Map();
  
  analytics.result?.data?.forEach(item => {
    const category = item.dimensions?.category1;
    if (!category) return;
    
    if (!categoryAnalysis.has(category)) {
      categoryAnalysis.set(category, {
        totalRevenue: 0,
        totalUnits: 0,
        weeks: []
      });
    }
    
    const categoryData = categoryAnalysis.get(category);
    categoryData.totalRevenue += item.metrics?.revenue || 0;
    categoryData.totalUnits += item.metrics?.ordered_units || 0;
    categoryData.weeks.push({
      week: item.dimensions?.week,
      revenue: item.metrics?.revenue,
      units: item.metrics?.ordered_units,
      conversion: item.metrics?.conv_tocart
    });
  });
  
  // Display analysis
  console.log('📈 Category Performance Analysis:');
  categoryAnalysis.forEach((data, category) => {
    console.log(`\n${category}:`);
    console.log(`  Total Revenue: ${data.totalRevenue.toLocaleString()} RUB`);
    console.log(`  Total Units: ${data.totalUnits.toLocaleString()}`);
    console.log(`  Average Revenue per Week: ${(data.totalRevenue / data.weeks.length).toFixed(0)} RUB`);
    
    // Find best performing week
    const bestWeek = data.weeks.sort((a, b) => (b.revenue || 0) - (a.revenue || 0))[0];
    console.log(`  Best Week: Week ${bestWeek.week} (${bestWeek.revenue} RUB)`);
  });
}
```

#### Product Performance Deep Dive
```typescript
async function analyzeTopProducts() {
  const analytics = await api.premium.getAnalyticsData({
    date_from: '2024-01-01',
    date_to: '2024-01-31',
    dimension: ['sku'],
    metrics: ['revenue', 'ordered_units', 'hits_view', 'hits_tocart', 'conv_tocart'],
    limit: 100
  });
  
  // Calculate additional metrics
  const enrichedData = analytics.result?.data?.map(item => {
    const revenue = item.metrics?.revenue || 0;
    const units = item.metrics?.ordered_units || 0;
    const views = item.metrics?.hits_view || 0;
    const cartAdds = item.metrics?.hits_tocart || 0;
    
    return {
      sku: item.dimensions?.sku,
      revenue,
      units,
      views,
      cartAdds,
      conversion: item.metrics?.conv_tocart || 0,
      avgPrice: units > 0 ? revenue / units : 0,
      viewToCartRate: views > 0 ? (cartAdds / views) * 100 : 0,
      cartToOrderRate: cartAdds > 0 ? (units / cartAdds) * 100 : 0
    };
  }) || [];
  
  // Find different types of top performers
  const topByRevenue = enrichedData.sort((a, b) => b.revenue - a.revenue).slice(0, 5);
  const topByConversion = enrichedData.sort((a, b) => b.conversion - a.conversion).slice(0, 5);
  const topByViews = enrichedData.sort((a, b) => b.views - a.views).slice(0, 5);
  
  console.log('💰 Top Products by Revenue:');
  topByRevenue.forEach((product, index) => {
    console.log(`${index + 1}. SKU: ${product.sku}`);
    console.log(`   Revenue: ${product.revenue.toLocaleString()} RUB`);
    console.log(`   Units: ${product.units}, Avg Price: ${product.avgPrice.toFixed(2)} RUB`);
  });
  
  console.log('\n🎯 Top Products by Conversion:');
  topByConversion.forEach((product, index) => {
    console.log(`${index + 1}. SKU: ${product.sku}, Conversion: ${product.conversion}%`);
  });
  
  console.log('\n👀 Top Products by Views:');
  topByViews.forEach((product, index) => {
    console.log(`${index + 1}. SKU: ${product.sku}, Views: ${product.views.toLocaleString()}`);
  });
}
```

### 2. getRealizationByDay

Daily financial realization reports with detailed product breakdowns.

**Request Interface:**
```typescript
interface PremiumRealizationByDayRequest {
  day: number;                // Day of month (1-31)
  month: number;              // Month (1-12)  
  year: number;               // Year (YYYY)
}
```

**Response Interface:**
```typescript
interface PremiumRealizationByDayResponse {
  rows?: Array<{
    name: string;             // Product name
    sku: string;              // Product SKU
    quantity: number;         // Units sold
    amount: string;           // Revenue amount
    currency: string;         // Currency (RUB)
    commission: string;       // Commission paid
    net_amount?: string;      // Net revenue
  }>;
  total_amount?: string;      // Total daily revenue
  total_commission?: string;  // Total daily commission
}
```

**Usage Example:**
```typescript
async function generateDailyFinancialReport() {
  const today = new Date();
  const report = await api.premium.getRealizationByDay({
    day: today.getDate(),
    month: today.getMonth() + 1,
    year: today.getFullYear()
  });
  
  console.log(`💼 Financial Report for ${today.toDateString()}:`);
  console.log(`Total Revenue: ${report.total_amount} RUB`);
  console.log(`Total Commission: ${report.total_commission} RUB`);
  
  if (report.rows && report.rows.length > 0) {
    // Calculate summary statistics
    const totalUnits = report.rows.reduce((sum, item) => sum + item.quantity, 0);
    const avgOrderValue = parseFloat(report.total_amount || '0') / totalUnits;
    
    console.log(`Total Units Sold: ${totalUnits}`);
    console.log(`Average Order Value: ${avgOrderValue.toFixed(2)} RUB`);
    
    // Top selling products
    const topSelling = report.rows
      .sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount))
      .slice(0, 10);
      
    console.log('\n🔥 Top Selling Products Today:');
    topSelling.forEach((item, index) => {
      const profit = parseFloat(item.amount) - parseFloat(item.commission);
      console.log(`${index + 1}. ${item.name}`);
      console.log(`   SKU: ${item.sku}`);
      console.log(`   Quantity: ${item.quantity} units`);
      console.log(`   Revenue: ${item.amount} ${item.currency}`);
      console.log(`   Commission: ${item.commission} ${item.currency}`);
      console.log(`   Profit: ${profit.toFixed(2)} ${item.currency}`);
    });
  } else {
    console.log('No sales recorded for today');
  }
}
```

---

## Product Query Methods (Premium/Premium Plus Required)

### 3. getProductQueries

Product search query analytics with CTR and performance metrics.

**Request Interface:**
```typescript
interface PremiumProductQueriesRequest {
  date_from: string;          // Start date (YYYY-MM-DD)
  date_to?: string;           // End date (defaults to date_from)
  skus?: string[];            // Specific SKUs to analyze
  page_size?: number;         // Results per page (max 1000)
  page_token?: string;        // Pagination token
  sort_by?: 'queries_count' | 'ctr' | 'clicks' | 'shows';
  sort_dir?: 'ASC' | 'DESC';
}
```

**Response Interface:**
```typescript
interface PremiumProductQueriesResponse {
  items?: Array<{
    sku: string;              // Product SKU
    queries_count: number;    // Total unique queries
    ctr: number;              // Click-through rate (%)
    avg_position: number;     // Average search position
    clicks: number;           // Total clicks
    shows: number;            // Total impressions
  }>;
  page_token?: string;        // Next page token
  has_next: boolean;          // More pages available
}
```

**Usage Example:**
```typescript
async function optimizeProductQueries() {
  const queries = await api.premium.getProductQueries({
    date_from: '2024-01-01',
    date_to: '2024-01-31',
    page_size: 100,
    sort_by: 'queries_count',
    sort_dir: 'DESC'
  });
  
  console.log('🔍 Product Query Optimization Analysis:');
  
  if (!queries.items || queries.items.length === 0) {
    console.log('No query data available');
    return;
  }
  
  // Categorize products by performance
  const highVolumeLowCTR = queries.items.filter(item => 
    item.queries_count > 100 && item.ctr < 3
  );
  
  const lowVolumeHighCTR = queries.items.filter(item => 
    item.queries_count < 50 && item.ctr > 10
  );
  
  const wellPerforming = queries.items.filter(item => 
    item.queries_count > 100 && item.ctr > 5
  );
  
  console.log(`\n📊 Query Performance Breakdown:`);
  console.log(`Total Products Analyzed: ${queries.items.length}`);
  console.log(`High Volume, Low CTR (needs optimization): ${highVolumeLowCTR.length}`);
  console.log(`Low Volume, High CTR (potential for growth): ${lowVolumeHighCTR.length}`);
  console.log(`Well Performing: ${wellPerforming.length}`);
  
  // Show products needing optimization
  if (highVolumeLowCTR.length > 0) {
    console.log('\n⚠️ Products Needing SEO Optimization:');
    highVolumeLowCTR.slice(0, 5).forEach(product => {
      console.log(`SKU: ${product.sku}`);
      console.log(`  Queries: ${product.queries_count}, CTR: ${product.ctr}%`);
      console.log(`  Position: ${product.avg_position.toFixed(1)}, Clicks: ${product.clicks}`);
      console.log(`  Opportunity: High search volume but low conversion`);
    });
  }
  
  // Show growth opportunities
  if (lowVolumeHighCTR.length > 0) {
    console.log('\n🚀 Growth Opportunities:');
    lowVolumeHighCTR.slice(0, 3).forEach(product => {
      console.log(`SKU: ${product.sku}`);
      console.log(`  CTR: ${product.ctr}%, Position: ${product.avg_position.toFixed(1)}`);
      console.log(`  Opportunity: High conversion rate, expand keyword targeting`);
    });
  }
}
```

### 4. getProductQueriesDetails

Detailed query performance for specific products with search term breakdown.

**Request Interface:**
```typescript
interface PremiumProductQueriesDetailsRequest {
  date_from: string;
  date_to?: string;
  skus: string[];             // Required: SKUs to analyze
  limit_by_sku?: number;      // Max queries per SKU
  page_size?: number;         // Results per page
  page_token?: string;        // Pagination token
  sort_by?: 'clicks' | 'shows' | 'ctr' | 'position';
  sort_dir?: 'ASC' | 'DESC';
}
```

**Response Interface:**
```typescript
interface PremiumProductQueriesDetailsResponse {
  queries?: Array<{
    sku: string;              // Product SKU
    query: string;            // Search term
    clicks: number;           // Clicks for this query
    shows: number;            // Impressions for this query
    ctr: number;              // CTR for this query (%)
    position: number;         // Average position
  }>;
  page_token?: string;
  has_next: boolean;
}
```

**Usage Example:**
```typescript
async function analyzeSearchTerms(sku: string) {
  const details = await api.premium.getProductQueriesDetails({
    date_from: '2024-01-01',
    date_to: '2024-01-31',
    skus: [sku],
    limit_by_sku: 50,
    sort_by: 'clicks',
    sort_dir: 'DESC'
  });
  
  console.log(`🎯 Search Term Analysis for SKU: ${sku}`);
  
  if (!details.queries || details.queries.length === 0) {
    console.log('No search data available for this SKU');
    return;
  }
  
  // Analyze search terms
  const highPerformingTerms = details.queries.filter(q => q.ctr > 5 && q.clicks > 10);
  const lowPerformingTerms = details.queries.filter(q => q.ctr < 2 && q.shows > 100);
  const longTailTerms = details.queries.filter(q => q.query.split(' ').length > 3);
  
  console.log(`\n📈 Search Term Categories:`);
  console.log(`Total Terms: ${details.queries.length}`);
  console.log(`High Performing: ${highPerformingTerms.length}`);
  console.log(`Low Performing: ${lowPerformingTerms.length}`);
  console.log(`Long Tail: ${longTailTerms.length}`);
  
  // Top performing search terms
  console.log('\n🏆 Top Performing Search Terms:');
  highPerformingTerms.slice(0, 5).forEach(term => {
    console.log(`"${term.query}"`);
    console.log(`  Clicks: ${term.clicks}, CTR: ${term.ctr}%, Position: ${term.position}`);
  });
  
  // Optimization opportunities
  console.log('\n⚡ Optimization Opportunities:');
  lowPerformingTerms.slice(0, 3).forEach(term => {
    console.log(`"${term.query}"`);
    console.log(`  Shows: ${term.shows}, CTR: ${term.ctr}%, Position: ${term.position}`);
    console.log(`  Action: Improve title/images, position ${term.position} → target top 3`);
  });
  
  // Long tail opportunities  
  if (longTailTerms.length > 0) {
    console.log('\n🎪 Long Tail Opportunities:');
    longTailTerms.slice(0, 3).forEach(term => {
      console.log(`"${term.query}"`);
      console.log(`  CTR: ${term.ctr}%, Position: ${term.position}`);
      console.log(`  Action: Create targeted content for this specific query`);
    });
  }
}
```

---

## Customer Communication Methods (Premium Plus Required)

### 5. startChat

Initiate customer chat sessions for order-related communication.

**Request Interface:**
```typescript
interface PremiumChatStartRequest {
  posting_number: string;     // Order/posting number
}
```

**Response Interface:**
```typescript
interface PremiumChatStartResponse {
  result?: {
    chat_id: string;          // Created chat identifier
  };
}
```

### 6. sendChatMessage

Send messages to customers in existing chat sessions.

**Request Interface:**
```typescript
interface PremiumChatSendMessageRequest {
  chat_id: string;            // Chat session identifier
  text: string;               // Message content
}
```

**Response Interface:**
```typescript
interface PremiumChatSendMessageResponse {
  result: boolean;            // Message sent successfully
}
```

### 7. getChatHistory

Retrieve conversation history for chat sessions.

**Request Interface:**
```typescript
interface PremiumChatHistoryRequest {
  chat_id: string;            // Chat session identifier
  limit?: number;             // Max messages (default 50)
  from_message_id?: string;   // Start from specific message
}
```

**Response Interface:**
```typescript
interface PremiumChatHistoryResponse {
  messages?: Array<{
    message_id: string;       // Message identifier
    author: 'seller' | 'buyer'; // Message author
    text: string;             // Message content
    created_at: string;       // ISO timestamp
    is_read: boolean;         // Read status
  }>;
  has_next: boolean;          // More messages available
}
```

### 8. markChatAsRead

Mark messages as read in chat sessions.

**Request Interface:**
```typescript
interface PremiumChatReadRequest {
  chat_id: string;            // Chat session identifier
  message_id: string;         // Mark this message and all previous as read
}
```

**Usage Example for Chat Methods:**
```typescript
async function manageCustomerCommunication() {
  const posting = '12345-0001-1';
  
  // 1. Start new chat
  const chat = await api.premium.startChat({
    posting_number: posting
  });
  
  if (!chat.result?.chat_id) {
    console.log('Failed to start chat');
    return;
  }
  
  const chatId = chat.result.chat_id;
  console.log(`💬 Started chat: ${chatId}`);
  
  // 2. Send welcome message
  await api.premium.sendChatMessage({
    chat_id: chatId,
    text: 'Здравствуйте! Спасибо за покупку. Есть вопросы по заказу?'
  });
  
  // 3. Send order status update
  await api.premium.sendChatMessage({
    chat_id: chatId,
    text: 'Ваш заказ обработан и готовится к отправке. Ожидаемая дата доставки: завтра.'
  });
  
  // 4. Get chat history
  const history = await api.premium.getChatHistory({
    chat_id: chatId,
    limit: 50
  });
  
  console.log(`📜 Chat History (${history.messages?.length} messages):`);
  history.messages?.forEach(message => {
    const author = message.author === 'seller' ? '🏪 Seller' : '👤 Buyer';
    const status = message.is_read ? '✓' : '○';
    console.log(`${author} ${status}: ${message.text}`);
    console.log(`   ${new Date(message.created_at).toLocaleString()}`);
  });
  
  // 5. Mark last message as read
  const lastMessage = history.messages?.[0];
  if (lastMessage && lastMessage.author === 'buyer') {
    await api.premium.markChatAsRead({
      chat_id: chatId,
      message_id: lastMessage.message_id
    });
    console.log('✓ Marked messages as read');
  }
}
```

---

## 🏗️ Implementation Classes

### PremiumAnalyticsManager Class
```typescript
interface PremiumConfig {
  rateLimitDelay?: number;    // Delay between analytics calls (ms)
  maxRetries?: number;        // Retry attempts for failed calls
  cacheTTL?: number;          // Cache time-to-live (ms)
}

class PremiumAnalyticsManager {
  private api: OzonSellerAPI;
  private config: Required<PremiumConfig>;
  private cache = new Map();
  private lastApiCall = 0;
  
  constructor(api: OzonSellerAPI, config: PremiumConfig = {}) {
    this.api = api;
    this.config = {
      rateLimitDelay: 60000, // 1 minute between calls
      maxRetries: 3,
      cacheTTL: 300000, // 5 minutes
      ...config
    };
  }

  /**
   * Comprehensive business intelligence report
   */
  async generateBusinessIntelligence(
    dateFrom: string,
    dateTo: string
  ): Promise<{
    overview: {
      totalRevenue: number;
      totalUnits: number;
      totalProducts: number;
      avgOrderValue: number;
    };
    categoryPerformance: Array<{
      category: string;
      revenue: number;
      units: number;
      products: number;
      growth: number;
    }>;
    topProducts: Array<{
      sku: string;
      revenue: number;
      units: number;
      conversionRate: number;
    }>;
    searchInsights: {
      totalQueries: number;
      avgCTR: number;
      optimizationOpportunities: Array<{
        sku: string;
        issue: string;
        recommendation: string;
      }>;
    };
  }> {
    await this.ensureRateLimit();
    
    // Get analytics data
    const analytics = await this.api.premium.getAnalyticsData({
      date_from: dateFrom,
      date_to: dateTo,
      dimension: ['sku', 'category1'],
      metrics: ['revenue', 'ordered_units', 'hits_view', 'conv_tocart'],
      limit: 1000
    });
    
    await this.ensureRateLimit();
    
    // Get query data
    const queries = await this.api.premium.getProductQueries({
      date_from: dateFrom,
      date_to: dateTo,
      page_size: 1000,
      sort_by: 'queries_count',
      sort_dir: 'DESC'
    });
    
    // Process analytics data
    let totalRevenue = 0;
    let totalUnits = 0;
    const skuMap = new Map();
    const categoryMap = new Map();
    
    analytics.result?.data?.forEach(item => {
      const revenue = item.metrics?.revenue || 0;
      const units = item.metrics?.ordered_units || 0;
      const sku = item.dimensions?.sku;
      const category = item.dimensions?.category1;
      
      totalRevenue += revenue;
      totalUnits += units;
      
      // SKU tracking
      if (sku) {
        if (!skuMap.has(sku)) {
          skuMap.set(sku, { revenue: 0, units: 0, views: 0, conversion: 0 });
        }
        const skuData = skuMap.get(sku);
        skuData.revenue += revenue;
        skuData.units += units;
        skuData.views += item.metrics?.hits_view || 0;
        skuData.conversion = item.metrics?.conv_tocart || 0;
      }
      
      // Category tracking
      if (category) {
        if (!categoryMap.has(category)) {
          categoryMap.set(category, { revenue: 0, units: 0, products: 0 });
        }
        const categoryData = categoryMap.get(category);
        categoryData.revenue += revenue;
        categoryData.units += units;
        if (sku) categoryData.products++;
      }
    });
    
    // Process query data for insights
    let totalQueries = 0;
    let totalCTR = 0;
    const optimizationOpportunities: Array<any> = [];
    
    queries.items?.forEach(item => {
      totalQueries += item.queries_count;
      totalCTR += item.ctr;
      
      // Identify optimization opportunities
      if (item.queries_count > 100 && item.ctr < 3) {
        optimizationOpportunities.push({
          sku: item.sku,
          issue: 'High volume, low CTR',
          recommendation: 'Optimize title, images, and positioning'
        });
      } else if (item.avg_position > 20 && item.ctr > 5) {
        optimizationOpportunities.push({
          sku: item.sku,
          issue: 'Good CTR but low position',
          recommendation: 'Improve search ranking through SEO and pricing'
        });
      }
    });
    
    return {
      overview: {
        totalRevenue,
        totalUnits,
        totalProducts: skuMap.size,
        avgOrderValue: totalUnits > 0 ? totalRevenue / totalUnits : 0
      },
      categoryPerformance: Array.from(categoryMap.entries()).map(([category, data]) => ({
        category,
        revenue: data.revenue,
        units: data.units,
        products: data.products,
        growth: 0 // Would need historical data for growth calculation
      })),
      topProducts: Array.from(skuMap.entries())
        .sort(([, a], [, b]) => b.revenue - a.revenue)
        .slice(0, 10)
        .map(([sku, data]) => ({
          sku,
          revenue: data.revenue,
          units: data.units,
          conversionRate: data.conversion
        })),
      searchInsights: {
        totalQueries,
        avgCTR: queries.items ? totalCTR / queries.items.length : 0,
        optimizationOpportunities: optimizationOpportunities.slice(0, 10)
      }
    };
  }

  /**
   * Automated SEO optimization recommendations
   */
  async generateSEORecommendations(skus?: string[]): Promise<Array<{
    sku: string;
    currentPerformance: {
      ctr: number;
      position: number;
      queries: number;
    };
    issues: string[];
    recommendations: string[];
    priority: 'high' | 'medium' | 'low';
  }>> {
    await this.ensureRateLimit();
    
    const queryParams: any = {
      date_from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      page_size: 1000,
      sort_by: 'queries_count',
      sort_dir: 'DESC'
    };
    
    if (skus) queryParams.skus = skus;
    
    const queries = await this.api.premium.getProductQueries(queryParams);
    
    const recommendations: Array<any> = [];
    
    queries.items?.forEach(item => {
      const issues: string[] = [];
      const recs: string[] = [];
      let priority: 'high' | 'medium' | 'low' = 'low';
      
      // Analyze performance issues
      if (item.queries_count > 100 && item.ctr < 2) {
        issues.push('Very high search volume but extremely low CTR');
        recs.push('Urgently review and improve product title and main image');
        recs.push('Check competitor products for title optimization ideas');
        priority = 'high';
      } else if (item.queries_count > 50 && item.ctr < 3) {
        issues.push('High search volume but low CTR');
        recs.push('Improve product title with relevant keywords');
        recs.push('Update main product image to be more appealing');
        priority = priority === 'high' ? 'high' : 'medium';
      }
      
      if (item.avg_position > 50) {
        issues.push('Very low search position');
        recs.push('Review and optimize pricing strategy');
        recs.push('Improve product description and features');
        recs.push('Consider promotional campaigns to boost rankings');
        priority = 'high';
      } else if (item.avg_position > 20) {
        issues.push('Low search position');
        recs.push('Optimize product attributes and categories');
        recs.push('Review competitor positioning strategies');
        priority = priority === 'high' ? 'high' : 'medium';
      }
      
      if (item.shows > 1000 && item.clicks < 50) {
        issues.push('High impressions but very low clicks');
        recs.push('Improve visual appeal of product in search results');
        recs.push('Check if product title matches search intent');
      }
      
      if (issues.length > 0) {
        recommendations.push({
          sku: item.sku,
          currentPerformance: {
            ctr: item.ctr,
            position: item.avg_position,
            queries: item.queries_count
          },
          issues,
          recommendations: recs,
          priority
        });
      }
    });
    
    return recommendations.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  private async ensureRateLimit(): Promise<void> {
    const now = Date.now();
    const timeSinceLastCall = now - this.lastApiCall;
    
    if (timeSinceLastCall < this.config.rateLimitDelay) {
      const waitTime = this.config.rateLimitDelay - timeSinceLastCall;
      console.log(`⏰ Rate limiting: waiting ${Math.round(waitTime / 1000)} seconds...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
    
    this.lastApiCall = Date.now();
  }
}
```

### ChatManager Class
```typescript
class ChatManager {
  private api: OzonSellerAPI;
  private activeChats = new Map<string, any>();
  
  constructor(api: OzonSellerAPI) {
    this.api = api;
  }

  /**
   * Automated customer service workflow
   */
  async automatedCustomerService(
    postingNumber: string,
    templates: {
      welcome: string;
      orderProcessed: string;
      shipped: string;
      delivered: string;
    }
  ): Promise<{
    chatId: string;
    messagesSent: number;
    success: boolean;
  }> {
    try {
      // Start chat
      const chat = await this.api.premium.startChat({
        posting_number: postingNumber
      });
      
      if (!chat.result?.chat_id) {
        throw new Error('Failed to start chat');
      }
      
      const chatId = chat.result.chat_id;
      let messagesSent = 0;
      
      // Send welcome message
      await this.api.premium.sendChatMessage({
        chat_id: chatId,
        text: templates.welcome
      });
      messagesSent++;
      
      // Store chat info
      this.activeChats.set(chatId, {
        postingNumber,
        startTime: new Date(),
        messageCount: messagesSent
      });
      
      return {
        chatId,
        messagesSent,
        success: true
      };
      
    } catch (error: any) {
      return {
        chatId: '',
        messagesSent: 0,
        success: false
      };
    }
  }

  /**
   * Bulk message sending for order updates
   */
  async sendBulkUpdates(
    updates: Array<{
      chatId: string;
      message: string;
    }>
  ): Promise<{
    successful: number;
    failed: number;
    errors: string[];
  }> {
    const result = {
      successful: 0,
      failed: 0,
      errors: [] as string[]
    };
    
    for (const update of updates) {
      try {
        await this.api.premium.sendChatMessage({
          chat_id: update.chatId,
          text: update.message
        });
        result.successful++;
        
        // Rate limiting - avoid spam
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error: any) {
        result.failed++;
        result.errors.push(`Chat ${update.chatId}: ${error.message}`);
      }
    }
    
    return result;
  }

  /**
   * Monitor and respond to unread messages
   */
  async monitorUnreadMessages(): Promise<Array<{
    chatId: string;
    unreadCount: number;
    lastMessage: string;
    requiresResponse: boolean;
  }>> {
    const unreadChats: Array<any> = [];
    
    for (const [chatId, chatInfo] of this.activeChats.entries()) {
      try {
        const history = await this.api.premium.getChatHistory({
          chat_id: chatId,
          limit: 20
        });
        
        const unreadMessages = history.messages?.filter(msg => 
          !msg.is_read && msg.author === 'buyer'
        ) || [];
        
        if (unreadMessages.length > 0) {
          const lastMessage = unreadMessages[0];
          const requiresResponse = this.analyzeMessageForResponse(lastMessage.text);
          
          unreadChats.push({
            chatId,
            unreadCount: unreadMessages.length,
            lastMessage: lastMessage.text,
            requiresResponse
          });
        }
        
      } catch (error: any) {
        console.error(`Error checking chat ${chatId}:`, error.message);
      }
    }
    
    return unreadChats;
  }
  
  private analyzeMessageForResponse(message: string): boolean {
    const responseKeywords = [
      'вопрос', 'когда', 'где', 'как', 'почему', 'можно ли',
      'что делать', 'помогите', 'не получается', 'проблема',
      'question', 'when', 'where', 'how', 'why', 'can you', 'help'
    ];
    
    return responseKeywords.some(keyword => 
      message.toLowerCase().includes(keyword)
    );
  }
}
```

---

## 🔄 Business Workflows

### Complete Premium Analytics Workflow
```typescript
async function completePremiumWorkflow() {
  const analyticsManager = new PremiumAnalyticsManager(api);
  const chatManager = new ChatManager(api);
  
  console.log('🏆 Premium Analytics & Optimization Workflow');
  
  // 1. Generate comprehensive business intelligence
  const dateFrom = '2024-01-01';
  const dateTo = '2024-01-31';
  
  const intelligence = await analyticsManager.generateBusinessIntelligence(dateFrom, dateTo);
  
  console.log('📊 Business Intelligence Summary:');
  console.log(`Total Revenue: ${intelligence.overview.totalRevenue.toLocaleString()} RUB`);
  console.log(`Total Units: ${intelligence.overview.totalUnits.toLocaleString()}`);
  console.log(`Average Order Value: ${intelligence.overview.avgOrderValue.toFixed(2)} RUB`);
  console.log(`Product Count: ${intelligence.overview.totalProducts}`);
  
  // Top categories
  console.log('\n🏷️ Top Categories:');
  intelligence.categoryPerformance.slice(0, 5).forEach((cat, index) => {
    console.log(`${index + 1}. ${cat.category}: ${cat.revenue.toLocaleString()} RUB`);
  });
  
  // Top products
  console.log('\n🔥 Top Products:');
  intelligence.topProducts.slice(0, 5).forEach((product, index) => {
    console.log(`${index + 1}. SKU ${product.sku}: ${product.revenue.toLocaleString()} RUB`);
  });
  
  // 2. Generate SEO recommendations
  const seoRecommendations = await analyticsManager.generateSEORecommendations();
  
  console.log(`\n🎯 SEO Optimization (${seoRecommendations.length} products need attention):`);
  
  const highPriorityItems = seoRecommendations.filter(r => r.priority === 'high');
  console.log(`🚨 High Priority: ${highPriorityItems.length} products`);
  
  highPriorityItems.slice(0, 3).forEach(item => {
    console.log(`\nSKU: ${item.sku}`);
    console.log(`Current: CTR ${item.currentPerformance.ctr}%, Position ${item.currentPerformance.position}`);
    console.log(`Issues: ${item.issues.join(', ')}`);
    console.log(`Actions: ${item.recommendations.slice(0, 2).join(', ')}`);
  });
  
  // 3. Customer communication setup
  const customerMessages = {
    welcome: 'Здравствуйте! Спасибо за покупку. Мы обработали ваш заказ и скоро отправим.',
    orderProcessed: 'Ваш заказ обработан и передан в доставку. Трек-номер будет доступен в течение суток.',
    shipped: 'Товар отправлен! Трек-номер для отслеживания: [TRACK_NUMBER]',
    delivered: 'Спасибо за покупку! Надеемся, товар вам понравился. Оставьте, пожалуйста, отзыв.'
  };
  
  // Example: Start chat for recent order
  const recentOrders = ['12345-0001-1', '12345-0002-1', '12345-0003-1'];
  
  for (const posting of recentOrders.slice(0, 1)) { // Limit for example
    const chatResult = await chatManager.automatedCustomerService(posting, customerMessages);
    
    if (chatResult.success) {
      console.log(`💬 Chat started for ${posting}: ${chatResult.chatId}`);
    }
  }
  
  // 4. Monitor customer messages
  const unreadMessages = await chatManager.monitorUnreadMessages();
  
  if (unreadMessages.length > 0) {
    console.log(`\n📬 Unread Messages: ${unreadMessages.length} chats need attention`);
    
    unreadMessages.forEach(chat => {
      const priority = chat.requiresResponse ? '🔴' : '🟡';
      console.log(`${priority} Chat ${chat.chatId}: ${chat.unreadCount} unread`);
      console.log(`   Last: "${chat.lastMessage.substring(0, 50)}..."`);
    });
  }
  
  return {
    intelligence,
    seoRecommendations: seoRecommendations.length,
    chatsStarted: 1,
    unreadMessages: unreadMessages.length
  };
}
```

---

## ⚠️ Error Handling & Subscription Management

### Subscription-Aware Error Handling
```typescript
async function robustPremiumOperations() {
  try {
    // Premium Plus required method
    const analytics = await api.premium.getAnalyticsData({
      date_from: '2024-01-01',
      date_to: '2024-01-31',
      dimension: ['sku'],
      metrics: ['revenue'],
      limit: 100
    });
    
  } catch (error: any) {
    if (error.response?.status === 403) {
      console.error('❌ Premium Plus subscription required for analytics data');
      console.log('💡 Upgrade to Premium Plus to access advanced analytics');
      
    } else if (error.response?.status === 429) {
      console.error('⏰ Rate limit exceeded - analytics methods limited to 1/minute');
      console.log('💡 Wait 60 seconds before next analytics request');
      
    } else if (error.response?.status === 400) {
      console.error('📝 Invalid analytics parameters:', error.response.data);
      
      // Handle specific validation errors
      const errors = error.response.data.errors || [];
      errors.forEach(err => {
        switch (err.code) {
          case 'INVALID_DATE_RANGE':
            console.log('💡 Fix: Use valid date range (max 365 days)');
            break;
          case 'INVALID_DIMENSION':
            console.log('💡 Fix: Use valid dimensions: sku, day, week, month, category1-3, brand');
            break;
          case 'INVALID_METRIC':
            console.log('💡 Fix: Use valid metrics: revenue, ordered_units, hits_view, conv_tocart, etc.');
            break;
        }
      });
    }
  }
  
  try {
    // Premium/Premium Plus method
    const queries = await api.premium.getProductQueries({
      date_from: '2024-01-01',
      skus: ['nonexistent-sku']
    });
    
  } catch (error: any) {
    if (error.response?.status === 402) {
      console.error('💳 Premium subscription required for product queries');
      console.log('💡 Upgrade to Premium or Premium Plus to access query analytics');
      
    } else if (error.response?.status === 404) {
      console.error('🔍 No query data found for specified SKUs');
      console.log('💡 Check SKU validity and ensure products have search activity');
    }
  }
  
  try {
    // Premium Plus chat method
    const chat = await api.premium.startChat({
      posting_number: 'invalid-posting'
    });
    
  } catch (error: any) {
    if (error.response?.status === 403) {
      console.error('🔒 Premium Plus subscription required for chat features');
      
    } else if (error.response?.status === 404) {
      console.error('📦 Posting not found or chat not available for this order');
      console.log('💡 Verify posting number and ensure order allows customer communication');
    }
  }
}
```

---

## 📈 Performance & Best Practices

### Rate Limiting and Optimization
```typescript
class OptimizedPremiumManager {
  private lastAnalyticsCall = 0;
  private readonly ANALYTICS_RATE_LIMIT = 60000; // 1 minute
  
  async safeAnalyticsCall<T>(
    apiCall: () => Promise<T>
  ): Promise<T> {
    const now = Date.now();
    const timeSinceLastCall = now - this.lastAnalyticsCall;
    
    if (timeSinceLastCall < this.ANALYTICS_RATE_LIMIT) {
      const waitTime = this.ANALYTICS_RATE_LIMIT - timeSinceLastCall;
      console.log(`⏰ Waiting ${Math.round(waitTime / 1000)}s for rate limit...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
    
    this.lastAnalyticsCall = Date.now();
    return await apiCall();
  }
  
  /**
   * Batch multiple analytics requests efficiently
   */
  async batchAnalyticsRequests<T>(
    requests: Array<() => Promise<T>>
  ): Promise<T[]> {
    const results: T[] = [];
    
    for (const request of requests) {
      const result = await this.safeAnalyticsCall(request);
      results.push(result);
    }
    
    return results;
  }
}
```

### Best Practices
- **Rate Limiting**: Analytics methods limited to 1 request per minute
- **Data Caching**: Cache analytics results to minimize API calls
- **Batch Processing**: Combine related analytics requests
- **Error Recovery**: Implement subscription-aware error handling
- **Cost Management**: Monitor Premium subscription usage and optimize

---

## 🔗 Related Documentation

- **[Analytics API (analytics.md)](./analytics.md)** - Basic analytics (non-premium)
- **[Chat API (chat.md)](./chat.md)** - Standard chat operations
- **[Product API (product.md)](./product.md)** - Product catalog management

---

**Implementation Status**: ✅ Complete  
**Last Updated**: 2024  
**API Version**: Multiple (v1, v2, v3)  
**Methods Count**: 8 methods across analytics, queries, chat, and financial reporting  
**Subscription Requirements**: Premium/Premium Plus tiers required