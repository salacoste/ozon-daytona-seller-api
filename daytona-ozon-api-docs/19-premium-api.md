# Premium API Documentation

## Overview

Premium API предоставляет доступ к расширенной аналитике, чат-функциям и премиальным возможностям OZON. API включает **8 методов** для работы с углубленной аналитикой товаров, чатами с покупателями и премиальной отчётностью.

### Key Features

- 📊 **Углублённая аналитика** - детализированные данные о продажах, просмотрах и конверсии
- 🔍 **Анализ поисковых запросов** - информация о том, как покупатели находят ваши товары
- 💬 **Чаты с покупателями** - возможность общения с клиентами напрямую
- 📈 **Ежедневные отчёты о реализации** - детальная финансовая отчётность
- 🎯 **Премиальные метрики** - расширенные показатели эффективности
- ⚠️ **Подписочная модель** - требуется подписка Premium или Premium Plus

## Subscription Requirements

- **Premium** - доступны методы анализа поисковых запросов
- **Premium Plus** - полный доступ ко всем методам, включая аналитику и чаты
- **Rate Limiting** - некоторые методы ограничены 1 запросом в минуту

## Available Methods

### Analytics Methods (Premium Plus Required)

#### getAnalyticsData()
Получает детализированные данные аналитики с группировкой по различным измерениям.

```typescript
const analytics = await premiumApi.getAnalyticsData({
  date_from: '2024-01-01',
  date_to: '2024-01-31',
  dimension: ['sku', 'week'],
  metrics: ['revenue', 'hits_view', 'conv_tocart', 'ordered_units'],
  limit: 500,
  filters: [{
    field: 'category1',
    values: ['Electronics']
  }]
});

analytics.result?.data?.forEach(item => {
  console.log(`SKU: ${item.dimensions?.sku}`);
  console.log(`Выручка: ${item.metrics?.revenue}`);
  console.log(`Просмотры: ${item.metrics?.hits_view}`);
  console.log(`Конверсия в корзину: ${item.metrics?.conv_tocart}%`);
});
```

#### getRealizationByDay()
Получает отчёт о реализации товаров за конкретный день.

```typescript
const report = await premiumApi.getRealizationByDay({
  day: 15,
  month: 1,
  year: 2024
});

console.log(`Общая выручка за день: ${report.total_amount} ${report.currency}`);
report.rows?.forEach(row => {
  console.log(`${row.name}: ${row.quantity} шт., ${row.amount} ${row.currency}`);
});
```

### Search Analytics Methods (Premium/Premium Plus Required)

#### getProductQueries()
Получает информацию о поисковых запросах для ваших товаров.

```typescript
const queries = await premiumApi.getProductQueries({
  date_from: '2024-01-01',
  date_to: '2024-01-31',
  skus: ['123456789', '987654321'],
  page_size: 50,
  sort_by: 'queries_count',
  sort_dir: 'DESC'
});

queries.items?.forEach(item => {
  console.log(`SKU: ${item.sku}`);
  console.log(`Запросов: ${item.queries_count}`);
  console.log(`Показы: ${item.impressions}`);
  console.log(`Клики: ${item.clicks}`);
  console.log(`CTR: ${item.ctr}%`);
});
```

#### getProductQueriesDetails()
Получает детализацию по конкретным поисковым запросам для товара.

```typescript
const details = await premiumApi.getProductQueriesDetails({
  date_from: '2024-01-01',
  date_to: '2024-01-31',
  skus: ['123456789'],
  limit_by_sku: 10,
  page_size: 100,
  sort_by: 'clicks',
  sort_dir: 'DESC'
});

details.queries?.forEach(query => {
  console.log(`Запрос: "${query.query}"`);
  console.log(`Показы: ${query.impressions}, Клики: ${query.clicks}`);
  console.log(`Средняя позиция: ${query.position}, CTR: ${query.ctr}%`);
});
```

### Chat Methods (Premium Plus Required)

#### startChat()
Создает новый чат с покупателем по отправлению.

```typescript
const chat = await premiumApi.startChat({
  posting_number: '12345-0001-1'
});

if (chat.result?.chat_id) {
  console.log(`Чат создан: ${chat.result.chat_id}`);
  
  // Отправить первое сообщение
  await premiumApi.sendChatMessage({
    chat_id: chat.result.chat_id,
    text: 'Здравствуйте! Есть вопросы по вашему заказу?'
  });
}
```

#### sendChatMessage()
Отправляет сообщение в существующий чат.

```typescript
const result = await premiumApi.sendChatMessage({
  chat_id: 'chat_123456',
  text: 'Ваш заказ готов к отправке. Ожидайте СМС с трек-номером.'
});

console.log(`Сообщение отправлено: ${result.result}`);
```

#### getChatHistory()
Получает историю сообщений чата.

```typescript
const history = await premiumApi.getChatHistory({
  chat_id: 'chat_123456',
  limit: 50
});

history.messages?.forEach(message => {
  const time = new Date(message.created_at).toLocaleString();
  console.log(`[${time}] ${message.author}: ${message.text}`);
});
```

#### markChatAsRead()
Отмечает сообщения в чате как прочитанные.

```typescript
await premiumApi.markChatAsRead({
  chat_id: 'chat_123456',
  message_id: 'msg_789012'
});

console.log('Сообщения отмечены как прочитанные');
```

## TypeScript Interfaces

### Request Types

```typescript
interface PremiumAnalyticsGetDataRequest {
  date_from: string;
  date_to: string;
  dimension: string[];
  metrics: string[];
  limit?: number;
  filters?: AnalyticsFilter[];
}

interface AnalyticsFilter {
  field: string;
  values: string[];
}

interface PremiumProductQueriesRequest {
  date_from: string;
  date_to?: string;
  skus?: string[];
  page_size?: number;
  page_token?: string;
  sort_by?: 'queries_count' | 'impressions' | 'clicks' | 'ctr';
  sort_dir?: 'ASC' | 'DESC';
}

interface PremiumProductQueriesDetailsRequest {
  date_from: string;
  date_to?: string;
  skus: string[];
  limit_by_sku?: number;
  page_size?: number;
  page_token?: string;
  sort_by?: 'impressions' | 'clicks' | 'ctr' | 'position';
  sort_dir?: 'ASC' | 'DESC';
}

interface PremiumChatStartRequest {
  posting_number: string;
}

interface PremiumChatSendMessageRequest {
  chat_id: string;
  text: string;
}

interface PremiumChatHistoryRequest {
  chat_id: string;
  limit?: number;
  message_id_from?: string;
}

interface PremiumChatReadRequest {
  chat_id: string;
  message_id: string;
}

interface PremiumRealizationByDayRequest {
  day: number;
  month: number;
  year: number;
}
```

### Response Types

```typescript
interface PremiumAnalyticsGetDataResponse {
  result?: {
    data?: AnalyticsDataItem[];
    totals?: AnalyticsMetrics;
  };
}

interface AnalyticsDataItem {
  dimensions?: Record<string, string>;
  metrics?: AnalyticsMetrics;
}

interface AnalyticsMetrics {
  revenue?: number;
  hits_view?: number;
  hits_tocart?: number;
  hits_tobasket?: number;
  session_view?: number;
  session_view_search?: number;
  session_view_pdp?: number;
  conv_tocart?: number;
  conv_tobasket?: number;
  ordered_units?: number;
  returns?: number;
}

interface PremiumProductQueriesResponse {
  items?: ProductQuery[];
  page_token?: string;
  has_next?: boolean;
}

interface ProductQuery {
  sku: string;
  queries_count?: number;
  impressions?: number;
  clicks?: number;
  ctr?: number;
  position_avg?: number;
}

interface PremiumProductQueriesDetailsResponse {
  queries?: QueryDetails[];
  page_token?: string;
  has_next?: boolean;
}

interface QueryDetails {
  query: string;
  sku: string;
  impressions?: number;
  clicks?: number;
  ctr?: number;
  position?: number;
}

interface PremiumChatStartResponse {
  result?: {
    chat_id?: string;
  };
}

interface PremiumChatSendMessageResponse {
  result?: boolean;
  message_id?: string;
}

interface PremiumChatHistoryResponse {
  messages?: ChatMessage[];
  has_next?: boolean;
}

interface ChatMessage {
  message_id: string;
  author: 'seller' | 'buyer';
  text: string;
  created_at: string;
  is_read?: boolean;
}

interface PremiumRealizationByDayResponse {
  rows?: RealizationRow[];
  total_amount?: number;
  currency?: string;
}

interface RealizationRow {
  name: string;
  quantity: number;
  amount: number;
  currency: string;
  sku?: string;
}
```

## Usage Examples

### Basic Premium Analytics

```typescript
import { OzonApi } from 'bmad-ozon-seller-api';

const ozonApi = new OzonApi({
  clientId: 'your-client-id',
  apiKey: 'your-api-key'
});

// Получение основных метрик за месяц
async function getMonthlyAnalytics() {
  try {
    const analytics = await ozonApi.premium.getAnalyticsData({
      date_from: '2024-01-01',
      date_to: '2024-01-31',
      dimension: ['sku', 'day'],
      metrics: ['revenue', 'ordered_units', 'hits_view', 'conv_tocart'],
      limit: 1000
    });
    
    let totalRevenue = 0;
    let totalViews = 0;
    let totalOrders = 0;
    
    analytics.result?.data?.forEach(item => {
      totalRevenue += item.metrics?.revenue || 0;
      totalViews += item.metrics?.hits_view || 0;
      totalOrders += item.metrics?.ordered_units || 0;
    });
    
    console.log(`📊 Общая статистика за месяц:`);
    console.log(`💰 Выручка: ${totalRevenue.toLocaleString()} ₽`);
    console.log(`👁️ Просмотры: ${totalViews.toLocaleString()}`);
    console.log(`🛒 Заказы: ${totalOrders.toLocaleString()}`);
    console.log(`📈 Конверсия: ${((totalOrders / totalViews) * 100).toFixed(2)}%`);
    
    return { totalRevenue, totalViews, totalOrders };
  } catch (error) {
    console.error('❌ Ошибка получения аналитики:', error);
    throw error;
  }
}

// Использование
const monthlyStats = await getMonthlyAnalytics();
```

### Search Query Analysis

```typescript
// Анализ эффективности поиска товаров
async function analyzeSearchPerformance(skus: string[]) {
  try {
    // Получить общие метрики по запросам
    const queries = await ozonApi.premium.getProductQueries({
      date_from: '2024-01-01',
      date_to: '2024-01-31',
      skus,
      page_size: 100,
      sort_by: 'ctr',
      sort_dir: 'DESC'
    });
    
    console.log('🔍 Топ товары по CTR:');
    queries.items?.slice(0, 5).forEach((item, index) => {
      console.log(`${index + 1}. SKU ${item.sku}: ${item.ctr}% CTR (${item.clicks}/${item.impressions})`);
    });
    
    // Получить детализацию по лучшему товару
    if (queries.items?.[0]) {
      const details = await ozonApi.premium.getProductQueriesDetails({
        date_from: '2024-01-01',
        date_to: '2024-01-31',
        skus: [queries.items[0].sku],
        limit_by_sku: 10,
        sort_by: 'clicks',
        sort_dir: 'DESC'
      });
      
      console.log(`\n🎯 Топ запросы для SKU ${queries.items[0].sku}:`);
      details.queries?.forEach((query, index) => {
        console.log(`${index + 1}. "${query.query}" - ${query.clicks} кликов, позиция ${query.position}`);
      });
    }
    
    return queries.items;
  } catch (error) {
    console.error('❌ Ошибка анализа поиска:', error);
    throw error;
  }
}

// Использование
const searchAnalysis = await analyzeSearchPerformance(['123456789', '987654321']);
```

## Complex Scenarios

### Premium Analytics Dashboard

Система для комплексного анализа премиальной аналитики:

```typescript
class PremiumAnalyticsDashboard {
  constructor(private ozonApi: OzonApi) {}
  
  /**
   * Получение комплексного отчёта за период
   */
  async generateComprehensiveReport(dateFrom: string, dateTo: string, skus?: string[]) {
    try {
      // Получить основные метрики
      const analytics = await this.ozonApi.premium.getAnalyticsData({
        date_from: dateFrom,
        date_to: dateTo,
        dimension: ['sku'],
        metrics: ['revenue', 'ordered_units', 'hits_view', 'conv_tocart', 'returns'],
        limit: 1000,
        filters: skus ? [{
          field: 'sku',
          values: skus
        }] : undefined
      });
      
      // Получить данные по поисковым запросам
      const searchData = skus ? await this.ozonApi.premium.getProductQueries({
        date_from: dateFrom,
        date_to: dateTo,
        skus,
        page_size: 1000
      }) : null;
      
      // Обработать данные
      const report = this.processAnalyticsData(analytics, searchData);
      
      console.log('📊 === КОМПЛЕКСНЫЙ ОТЧЁТ ===');
      console.log(`📅 Период: ${dateFrom} - ${dateTo}`);
      console.log(`💰 Общая выручка: ${report.totalRevenue.toLocaleString()} ₽`);
      console.log(`🛒 Заказов: ${report.totalOrders.toLocaleString()}`);
      console.log(`👁️ Просмотров: ${report.totalViews.toLocaleString()}`);
      console.log(`📈 Средняя конверсия: ${report.avgConversion.toFixed(2)}%`);
      console.log(`🔄 Возвратов: ${report.totalReturns.toLocaleString()}`);
      
      if (report.topPerformers.length > 0) {
        console.log('\n🏆 Топ товары по выручке:');
        report.topPerformers.forEach((item, index) => {
          console.log(`${index + 1}. SKU ${item.sku}: ${item.revenue.toLocaleString()} ₽`);
        });
      }
      
      if (report.searchInsights) {
        console.log('\n🔍 Поисковая аналитика:');
        console.log(`Средний CTR: ${report.searchInsights.avgCTR.toFixed(2)}%`);
        console.log(`Средняя позиция: ${report.searchInsights.avgPosition.toFixed(1)}`);
      }
      
      return report;
    } catch (error) {
      console.error('❌ Ошибка генерации отчёта:', error);
      throw error;
    }
  }
  
  /**
   * Мониторинг производительности товаров
   */
  async monitorProductPerformance(skus: string[], thresholds: PerformanceThresholds) {
    try {
      const analytics = await this.ozonApi.premium.getAnalyticsData({
        date_from: this.getDateDaysAgo(7), // Последние 7 дней
        date_to: this.getToday(),
        dimension: ['sku'],
        metrics: ['revenue', 'ordered_units', 'hits_view', 'conv_tocart'],
        filters: [{
          field: 'sku',
          values: skus
        }]
      });
      
      const alerts: PerformanceAlert[] = [];
      
      analytics.result?.data?.forEach(item => {
        const sku = item.dimensions?.sku;
        const metrics = item.metrics;
        
        if (!sku || !metrics) return;
        
        // Проверка конверсии
        if (metrics.conv_tocart && metrics.conv_tocart < thresholds.minConversion) {
          alerts.push({
            sku,
            type: 'low_conversion',
            value: metrics.conv_tocart,
            threshold: thresholds.minConversion,
            severity: 'warning'
          });
        }
        
        // Проверка просмотров
        if (metrics.hits_view && metrics.hits_view < thresholds.minViews) {
          alerts.push({
            sku,
            type: 'low_views',
            value: metrics.hits_view,
            threshold: thresholds.minViews,
            severity: 'info'
          });
        }
        
        // Проверка выручки
        if (metrics.revenue && metrics.revenue < thresholds.minRevenue) {
          alerts.push({
            sku,
            type: 'low_revenue',
            value: metrics.revenue,
            threshold: thresholds.minRevenue,
            severity: 'critical'
          });
        }
      });
      
      if (alerts.length > 0) {
        console.log(`⚠️ Найдено ${alerts.length} предупреждений о производительности:`);
        alerts.forEach(alert => {
          const emoji = alert.severity === 'critical' ? '🚨' : alert.severity === 'warning' ? '⚠️' : 'ℹ️';
          console.log(`${emoji} SKU ${alert.sku}: ${alert.type} (${alert.value} < ${alert.threshold})`);
        });
      } else {
        console.log('✅ Все товары работают в пределах нормы');
      }
      
      return alerts;
    } catch (error) {
      console.error('❌ Ошибка мониторинга производительности:', error);
      throw error;
    }
  }
  
  /**
   * Анализ трендов по дням
   */
  async analyzeDailyTrends(dateFrom: string, dateTo: string) {
    try {
      const analytics = await this.ozonApi.premium.getAnalyticsData({
        date_from: dateFrom,
        date_to: dateTo,
        dimension: ['day'],
        metrics: ['revenue', 'ordered_units', 'hits_view'],
        limit: 1000
      });
      
      const dailyData: DailyTrendData[] = [];
      
      analytics.result?.data?.forEach(item => {
        const day = item.dimensions?.day;
        const metrics = item.metrics;
        
        if (day && metrics) {
          dailyData.push({
            date: day,
            revenue: metrics.revenue || 0,
            orders: metrics.ordered_units || 0,
            views: metrics.hits_view || 0
          });
        }
      });
      
      // Сортировка по дате
      dailyData.sort((a, b) => a.date.localeCompare(b.date));
      
      // Вычисление трендов
      const trends = this.calculateTrends(dailyData);
      
      console.log('📈 Анализ трендов:');
      console.log(`Выручка: ${trends.revenue > 0 ? '↗️' : trends.revenue < 0 ? '↘️' : '➡️'} ${trends.revenue.toFixed(2)}%`);
      console.log(`Заказы: ${trends.orders > 0 ? '↗️' : trends.orders < 0 ? '↘️' : '➡️'} ${trends.orders.toFixed(2)}%`);
      console.log(`Просмотры: ${trends.views > 0 ? '↗️' : trends.views < 0 ? '↘️' : '➡️'} ${trends.views.toFixed(2)}%`);
      
      return { dailyData, trends };
    } catch (error) {
      console.error('❌ Ошибка анализа трендов:', error);
      throw error;
    }
  }
  
  private processAnalyticsData(analytics: any, searchData: any) {
    const data = analytics.result?.data || [];
    
    let totalRevenue = 0;
    let totalOrders = 0;
    let totalViews = 0;
    let totalReturns = 0;
    let conversionSum = 0;
    let conversionCount = 0;
    
    const skuMetrics: Record<string, any> = {};
    
    data.forEach((item: any) => {
      const sku = item.dimensions?.sku;
      const metrics = item.metrics;
      
      if (sku && metrics) {
        totalRevenue += metrics.revenue || 0;
        totalOrders += metrics.ordered_units || 0;
        totalViews += metrics.hits_view || 0;
        totalReturns += metrics.returns || 0;
        
        if (metrics.conv_tocart) {
          conversionSum += metrics.conv_tocart;
          conversionCount++;
        }
        
        skuMetrics[sku] = metrics;
      }
    });
    
    const topPerformers = Object.entries(skuMetrics)
      .map(([sku, metrics]) => ({ sku, revenue: metrics.revenue || 0 }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
    
    let searchInsights = null;
    if (searchData?.items) {
      const totalCTR = searchData.items.reduce((sum: number, item: any) => sum + (item.ctr || 0), 0);
      const totalPosition = searchData.items.reduce((sum: number, item: any) => sum + (item.position_avg || 0), 0);
      
      searchInsights = {
        avgCTR: totalCTR / searchData.items.length,
        avgPosition: totalPosition / searchData.items.length
      };
    }
    
    return {
      totalRevenue,
      totalOrders,
      totalViews,
      totalReturns,
      avgConversion: conversionCount > 0 ? conversionSum / conversionCount : 0,
      topPerformers,
      searchInsights
    };
  }
  
  private calculateTrends(data: DailyTrendData[]) {
    if (data.length < 2) {
      return { revenue: 0, orders: 0, views: 0 };
    }
    
    const first = data[0];
    const last = data[data.length - 1];
    
    return {
      revenue: ((last.revenue - first.revenue) / first.revenue) * 100,
      orders: ((last.orders - first.orders) / first.orders) * 100,
      views: ((last.views - first.views) / first.views) * 100
    };
  }
  
  private getToday(): string {
    return new Date().toISOString().split('T')[0];
  }
  
  private getDateDaysAgo(days: number): string {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date.toISOString().split('T')[0];
  }
}

// Интерфейсы для системы аналитики
interface PerformanceThresholds {
  minConversion: number;
  minViews: number;
  minRevenue: number;
}

interface PerformanceAlert {
  sku: string;
  type: string;
  value: number;
  threshold: number;
  severity: 'info' | 'warning' | 'critical';
}

interface DailyTrendData {
  date: string;
  revenue: number;
  orders: number;
  views: number;
}

// Использование системы аналитики
const dashboard = new PremiumAnalyticsDashboard(ozonApi);

// Генерация комплексного отчёта
const report = await dashboard.generateComprehensiveReport(
  '2024-01-01',
  '2024-01-31',
  ['123456789', '987654321']
);

// Мониторинг производительности
const alerts = await dashboard.monitorProductPerformance(
  ['123456789', '987654321'],
  {
    minConversion: 2.0, // 2%
    minViews: 100,
    minRevenue: 10000
  }
);

// Анализ трендов
const trends = await dashboard.analyzeDailyTrends('2024-01-01', '2024-01-31');
```

### Premium Chat Manager

Система управления чатами с покупателями:

```typescript
class PremiumChatManager {
  constructor(private ozonApi: OzonApi) {}
  
  /**
   * Создание и настройка чата для заказа
   */
  async setupOrderChat(postingNumber: string, welcomeMessage?: string) {
    try {
      // Создать чат
      const chat = await this.ozonApi.premium.startChat({
        posting_number: postingNumber
      });
      
      if (!chat.result?.chat_id) {
        throw new Error('Не удалось создать чат');
      }
      
      const chatId = chat.result.chat_id;
      console.log(`✅ Чат создан: ${chatId}`);
      
      // Отправить приветственное сообщение
      if (welcomeMessage) {
        await this.ozonApi.premium.sendChatMessage({
          chat_id: chatId,
          text: welcomeMessage
        });
        
        console.log('📝 Приветственное сообщение отправлено');
      }
      
      return chatId;
    } catch (error) {
      console.error(`❌ Ошибка создания чата для заказа ${postingNumber}:`, error);
      throw error;
    }
  }
  
  /**
   * Массовая отправка уведомлений по заказам
   */
  async sendBulkNotifications(notifications: OrderNotification[]) {
    const results: NotificationResult[] = [];
    
    for (const notification of notifications) {
      try {
        let chatId = notification.chatId;
        
        // Создать чат если не существует
        if (!chatId) {
          const chat = await this.ozonApi.premium.startChat({
            posting_number: notification.postingNumber
          });
          
          if (chat.result?.chat_id) {
            chatId = chat.result.chat_id;
          } else {
            throw new Error('Не удалось создать чат');
          }
        }
        
        // Отправить сообщение
        await this.ozonApi.premium.sendChatMessage({
          chat_id: chatId,
          text: notification.message
        });
        
        results.push({
          postingNumber: notification.postingNumber,
          chatId,
          status: 'sent',
          timestamp: new Date().toISOString()
        });
        
        console.log(`✅ Уведомление отправлено для заказа ${notification.postingNumber}`);
        
        // Задержка между сообщениями
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        results.push({
          postingNumber: notification.postingNumber,
          status: 'failed',
          error: error.message,
          timestamp: new Date().toISOString()
        });
        
        console.error(`❌ Ошибка отправки для заказа ${notification.postingNumber}:`, error);
      }
    }
    
    return results;
  }
  
  /**
   * Получение и обработка истории чата
   */
  async processChatHistory(chatId: string) {
    try {
      const history = await this.ozonApi.premium.getChatHistory({
        chat_id: chatId,
        limit: 100
      });
      
      if (!history.messages) {
        console.log('История чата пуста');
        return null;
      }
      
      const analysis = {
        totalMessages: history.messages.length,
        sellerMessages: history.messages.filter(m => m.author === 'seller').length,
        buyerMessages: history.messages.filter(m => m.author === 'buyer').length,
        unreadMessages: history.messages.filter(m => !m.is_read).length,
        lastMessage: history.messages[0],
        firstMessage: history.messages[history.messages.length - 1]
      };
      
      console.log(`📊 Анализ чата ${chatId}:`);
      console.log(`Всего сообщений: ${analysis.totalMessages}`);
      console.log(`От продавца: ${analysis.sellerMessages}`);
      console.log(`От покупателя: ${analysis.buyerMessages}`);
      console.log(`Непрочитанных: ${analysis.unreadMessages}`);
      
      // Отметить как прочитанные если есть непрочитанные
      if (analysis.unreadMessages > 0 && analysis.lastMessage) {
        await this.ozonApi.premium.markChatAsRead({
          chat_id: chatId,
          message_id: analysis.lastMessage.message_id
        });
        
        console.log('✅ Сообщения отмечены как прочитанные');
      }
      
      return analysis;
    } catch (error) {
      console.error(`❌ Ошибка обработки истории чата ${chatId}:`, error);
      throw error;
    }
  }
  
  /**
   * Автоматические ответы на часто задаваемые вопросы
   */
  async handleCommonQuestions(chatId: string, incomingMessage: string) {
    const commonResponses: Record<string, string> = {
      'когда отправите': 'Ваш заказ будет отправлен в течение 1-2 рабочих дней. Как только заказ будет передан в доставку, вы получите SMS с трек-номером.',
      'где мой заказ': 'Для отслеживания заказа используйте трек-номер из SMS. Также вы можете следить за статусом в мобильном приложении OZON.',
      'можно ли отменить': 'Отмена заказа возможна до момента передачи в доставку. Обратитесь в службу поддержки OZON для отмены.',
      'неправильный размер': 'Если размер не подойдет, вы можете вернуть товар в течение 14 дней. Возврат оформляется через ваш личный кабинет.',
      'гарантия': 'На товар распространяется гарантия производителя. Подробности указаны в карточке товара и в документах при получении.'
    };
    
    const lowerMessage = incomingMessage.toLowerCase();
    
    for (const [keyword, response] of Object.entries(commonResponses)) {
      if (lowerMessage.includes(keyword)) {
        await this.ozonApi.premium.sendChatMessage({
          chat_id: chatId,
          text: response
        });
        
        console.log(`🤖 Автоматический ответ отправлен для вопроса о "${keyword}"`);
        return true;
      }
    }
    
    return false;
  }
}

// Интерфейсы для системы чатов
interface OrderNotification {
  postingNumber: string;
  chatId?: string;
  message: string;
}

interface NotificationResult {
  postingNumber: string;
  chatId?: string;
  status: 'sent' | 'failed';
  error?: string;
  timestamp: string;
}

// Использование системы управления чатами
const chatManager = new PremiumChatManager(ozonApi);

// Массовая отправка уведомлений о готовности к отправке
const notifications: OrderNotification[] = [
  {
    postingNumber: '12345-0001-1',
    message: 'Ваш заказ собран и готов к отправке. Ожидайте SMS с трек-номером.'
  },
  {
    postingNumber: '12345-0002-1',
    message: 'Заказ отправлен! Трек-номер придёт в SMS в течение часа.'
  }
];

const notificationResults = await chatManager.sendBulkNotifications(notifications);
console.log('Результаты отправки:', notificationResults);

// Обработка истории чата
const chatAnalysis = await chatManager.processChatHistory('chat_123456');
```

## Error Handling

```typescript
// Комплексная обработка ошибок премиальных методов
async function safePremiumOperations() {
  try {
    // Проверка доступности премиальных функций
    const analytics = await ozonApi.premium.getAnalyticsData({
      date_from: '2024-01-01',
      date_to: '2024-01-31',
      dimension: ['sku'],
      metrics: ['revenue'],
      limit: 10
    });
    
    return analytics;
  } catch (error) {
    if (error.code === 'PREMIUM_SUBSCRIPTION_REQUIRED') {
      console.error('❌ Требуется подписка Premium Plus для доступа к аналитике');
    } else if (error.code === 'RATE_LIMIT_EXCEEDED') {
      console.error('❌ Превышен лимит запросов (1 запрос в минуту)');
      console.log('⏳ Повторите запрос через минуту');
    } else if (error.code === 'INVALID_DATE_RANGE') {
      console.error('❌ Неверный диапазон дат');
    } else if (error.code === 'CHAT_NOT_FOUND') {
      console.error('❌ Чат не найден или недоступен');
    } else if (error.code === 'MESSAGE_TOO_LONG') {
      console.error('❌ Сообщение слишком длинное (максимум 4000 символов)');
    } else {
      console.error('❌ Неожиданная ошибка:', error);
    }
    
    throw error;
  }
}
```

## Best Practices

### 1. Управление подпиской
```typescript
const subscriptionBestPractices = {
  // Проверяйте доступность методов
  checkSubscription: async () => {
    try {
      await ozonApi.premium.getAnalyticsData({
        date_from: '2024-01-01',
        date_to: '2024-01-01',
        dimension: ['sku'],
        metrics: ['revenue'],
        limit: 1
      });
      return 'premium_plus';
    } catch (error) {
      if (error.code === 'PREMIUM_SUBSCRIPTION_REQUIRED') {
        return 'basic';
      }
      throw error;
    }
  },
  
  // Кэшируйте результаты аналитики
  useCache: true,
  cacheTTL: 3600000, // 1 час
  
  // Соблюдайте rate limits
  respectRateLimit: true,
  minRequestInterval: 60000 // 1 минута
};
```

### 2. Оптимизация запросов аналитики
```typescript
const analyticsOptimization = {
  // Запрашивайте только нужные метрики
  selectiveMetrics: ['revenue', 'ordered_units'], // Не все сразу
  
  // Используйте фильтры для уменьшения объёма данных
  useFilters: true,
  
  // Разбивайте большие периоды на части
  maxDateRange: 31, // дней
  
  // Ограничивайте количество результатов
  reasonableLimit: 1000
};
```

### 3. Управление чатами
```typescript
const chatBestPractices = {
  // Шаблоны сообщений
  messageTemplates: {
    welcome: 'Здравствуйте! Спасибо за покупку. Есть вопросы по заказу?',
    shipped: 'Ваш заказ отправлен! Трек-номер: {trackNumber}',
    support: 'По возникшим вопросам обращайтесь в службу поддержки OZON.'
  },
  
  // Автоматические ответы
  enableAutoResponses: true,
  
  // Мониторинг непрочитанных сообщений
  checkUnreadInterval: 300000, // 5 минут
  
  // Максимальная длина сообщения
  maxMessageLength: 4000
};
```

## Integration Notes

- **Подписка**: Premium методы требуют активной подписки Premium или Premium Plus
- **Rate Limiting**: getAnalyticsData - 1 запрос в минуту, остальные методы - стандартные лимиты
- **Данные**: Аналитические данные доступны с задержкой 1-2 дня
- **Чаты**: Доступны только для Premium Plus подписчиков
- **Период**: Максимальный период для аналитики - 92 дня
- **Реализация**: Данные о реализации доступны за последние 32 дня
- **Фильтры**: Поддерживаются фильтры по категориям, брендам, SKU

Premium API открывает доступ к мощным инструментам аналитики и коммуникации, позволяя глубоко анализировать эффективность продаж и поддерживать прямую связь с покупателями.