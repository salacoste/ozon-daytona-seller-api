# Report API

Report API для бизнес-отчетности и генерации аналитики с 8 методами для создания различных типов отчетов.

## Обзор

Report API предоставляет комплексные инструменты для создания бизнес-отчетов, аналитики продаж, финансовых отчетов и управления данными.

**Основные возможности:**
- 💰 Финансовые отчеты и анализ денежных потоков
- 📦 Отчеты по товарам и остаткам на складах
- 📊 Аналитика отправлений и заказов
- 🔄 Отчеты о возвратах и уценках
- 📈 Мониторинг статусов отчетов
- 📋 Управление списком созданных отчетов
- 📁 Скачивание готовых отчетов в различных форматах

## Доступные методы

### Финансовые отчеты

**getFinanceCashFlowStatement(request)** - Финансовый отчет
```typescript
const financialReport = await reportApi.getFinanceCashFlowStatement({
  date: { from: '2024-01-01', to: '2024-01-31' },
  page: 1,
  page_size: 100
});
```

### Создание отчетов

**createDiscountedReport(request)** - Отчет об уценённых товарах
```typescript
const discountedReport = await reportApi.createDiscountedReport({});
```

**createPostingsReport(request)** - Отчет об отправлениях
```typescript
const postingsReport = await reportApi.createPostingsReport({
  filter: {
    since: '2024-01-01',
    to: '2024-01-31'
  }
});
```

**createProductsReport(request)** - Отчет по товарам
```typescript
const productsReport = await reportApi.createProductsReport({
  sku: [123456789, 987654321],
  visibility: 'VISIBLE'
});
```

**createStockByWarehouseReport(request)** - Отчет об остатках на FBS-складе
```typescript
const stockReport = await reportApi.createStockByWarehouseReport({
  warehouseId: ['12345', '67890']
});
```

**createReturnsReport(request)** - Отчет о возвратах
```typescript
const returnsReport = await reportApi.createReturnsReport({
  date_from: '2024-01-01',
  date_to: '2024-01-31'
});
```

### Управление отчетами

**getReportInfo(request)** - Информация об отчете
```typescript
const reportInfo = await reportApi.getReportInfo({
  code: 'report_code_123'
});
```

**getReportList(request)** - Список отчетов
```typescript
const reportList = await reportApi.getReportList({
  page: 1,
  page_size: 50
});
```

## TypeScript интерфейсы

```typescript
// Основные запросы
interface ReportFinanceCashFlowStatementListRequest {
  date: {
    from: string;
    to: string;
  };
  page: number;
  page_size: number;
  with_details?: boolean;
}

interface ReportCreateDiscountedRequest {
  // Пустой объект - параметры не требуются
}

interface ReportInfoRequest {
  code: string;
}

interface ReportListRequest {
  page: number;
  page_size: number;
  report_type?: "PRODUCTS" | "POSTINGS" | "DISCOUNTED" | "STOCK" | "RETURNS" | "FINANCE";
}

interface ReportCreatePostingsRequest {
  filter: {
    since: string;
    to: string;
    status?: string[];
  };
  language?: "RU" | "EN";
}

interface ReportCreateProductsRequest {
  sku?: number[];
  visibility?: "VISIBLE" | "INVISIBLE" | "ALL";
  language?: "RU" | "EN";
}

interface ReportCreateStockByWarehouseRequest {
  warehouseId: string[];
  language?: "RU" | "EN";
}

interface ReportCreateReturnsRequest {
  date_from: string;
  date_to: string;
  language?: "RU" | "EN";
}

// Ответы
interface ReportFinanceCashFlowStatementListResponse {
  result: {
    operations: Array<{
      operation_id: string;
      operation_type: string;
      operation_date: string;
      operation_type_name: string;
      delivery_charge: string;
      return_delivery_charge: string;
      accruals_for_sale: string;
      sale_commission: string;
      amount: string;
      currency: string;
      items: Array<{
        sku: number;
        name: string;
        offer_id: string;
        price: string;
        commission_amount: string;
        commission_percent: string;
        quantity: number;
      }>;
    }>;
    page_count: number;
    page_size: number;
    page: number;
    total_count: number;
  };
}

interface ReportCreateDiscountedResponse {
  code: string;
  result: "ok" | "error";
}

interface ReportInfoResponse {
  result: {
    code: string;
    created_at: string;
    error: string;
    file_name: string;
    status: "PROCESSING" | "SUCCESS" | "FAILED";
    download_url?: string;
    report_type: string;
    params: Record<string, any>;
  };
}

interface ReportListResponse {
  result: {
    reports: Array<{
      code: string;
      created_at: string;
      error: string;
      file_name: string;
      status: "PROCESSING" | "SUCCESS" | "FAILED";
      download_url?: string;
      report_type: "PRODUCTS" | "POSTINGS" | "DISCOUNTED" | "STOCK" | "RETURNS" | "FINANCE";
      params: Record<string, any>;
    }>;
    count: number;
  };
}

interface ReportCreateResponse {
  result: {
    code: string;
  };
}

interface ReportCreateReturnsResponse {
  code: string;
  result: "ok" | "error";
}
```

## Примеры использования

### Создание финансового отчета
```typescript
// Получение финансового отчета за январь 2024
const financialReport = await reportApi.getFinanceCashFlowStatement({
  date: {
    from: '2024-01-01',
    to: '2024-01-31'
  },
  page: 1,
  page_size: 100,
  with_details: true
});

console.log(`\n=== Финансовый отчет за ${financialReport.result.page} из ${financialReport.result.page_count} ===`);
console.log(`Общее количество операций: ${financialReport.result.total_count}`);

let totalAmount = 0;
const operationsSummary = new Map<string, { count: number; amount: number }>();

financialReport.result.operations.forEach(operation => {
  const amount = parseFloat(operation.amount);
  totalAmount += amount;

  const existing = operationsSummary.get(operation.operation_type_name) || { count: 0, amount: 0 };
  existing.count++;
  existing.amount += amount;
  operationsSummary.set(operation.operation_type_name, existing);

  console.log(`\n${operation.operation_date}: ${operation.operation_type_name}`);
  console.log(`Сумма: ${operation.amount} ${operation.currency}`);
  
  if (operation.items.length > 0) {
    console.log(`Товары (${operation.items.length}):`);
    operation.items.slice(0, 3).forEach(item => {
      console.log(`  - ${item.name}: ${item.quantity} шт × ${item.price} руб (комиссия: ${item.commission_percent}%)`);
    });
    if (operation.items.length > 3) {
      console.log(`  ... и ещё ${operation.items.length - 3} товаров`);
    }
  }
});

console.log(`\n=== Сводка по типам операций ===`);
operationsSummary.forEach((summary, operationType) => {
  console.log(`${operationType}: ${summary.count} операций на сумму ${summary.amount.toFixed(2)} руб`);
});

console.log(`\nОбщая сумма: ${totalAmount.toFixed(2)} руб`);
```

### Создание и мониторинг отчетов
```typescript
// Создание отчета по товарам
console.log("Создание отчета по товарам...");
const productsReport = await reportApi.createProductsReport({
  visibility: 'VISIBLE',
  language: 'RU'
});

console.log(`Отчет создан с кодом: ${productsReport.result.code}`);

// Создание отчета об отправлениях
console.log("\nСоздание отчета об отправлениях...");
const postingsReport = await reportApi.createPostingsReport({
  filter: {
    since: '2024-01-01',
    to: '2024-01-31',
    status: ['DELIVERED', 'CANCELLED', 'RETURNED']
  },
  language: 'RU'
});

console.log(`Отчет об отправлениях создан: ${postingsReport.result.code}`);

// Создание отчета о возвратах
console.log("\nСоздание отчета о возвратах...");
const returnsReport = await reportApi.createReturnsReport({
  date_from: '2024-01-01',
  date_to: '2024-01-31',
  language: 'RU'
});

console.log(`Отчет о возвратах создан: ${returnsReport.code}`);

// Мониторинг статуса отчетов
const reportCodes = [
  productsReport.result.code,
  postingsReport.result.code,
  returnsReport.code
];

console.log("\n=== Мониторинг статуса отчетов ===");
const checkReportStatus = async (code: string): Promise<void> => {
  let attempts = 0;
  const maxAttempts = 30; // максимум 5 минут ожидания

  while (attempts < maxAttempts) {
    const reportInfo = await reportApi.getReportInfo({ code });
    
    console.log(`Отчет ${code}: ${reportInfo.result.status}`);
    
    if (reportInfo.result.status === 'SUCCESS') {
      console.log(`✅ Отчет готов: ${reportInfo.result.file_name}`);
      if (reportInfo.result.download_url) {
        console.log(`🔗 Ссылка для скачивания: ${reportInfo.result.download_url}`);
      }
      return;
    } else if (reportInfo.result.status === 'FAILED') {
      console.log(`❌ Ошибка создания отчета: ${reportInfo.result.error}`);
      return;
    }
    
    // Ждем 10 секунд перед следующей проверкой
    await new Promise(resolve => setTimeout(resolve, 10000));
    attempts++;
  }
  
  console.log(`⏱️ Превышено время ожидания для отчета ${code}`);
};

// Проверяем статус всех отчетов параллельно
await Promise.all(reportCodes.map(code => checkReportStatus(code)));
```

### Управление списком отчетов
```typescript
// Получение списка всех отчетов
const allReports = await reportApi.getReportList({
  page: 1,
  page_size: 100
});

console.log(`\n=== Управление отчетами (${allReports.result.count} всего) ===`);

// Группировка отчетов по типам и статусам
const reportsByType = new Map<string, any[]>();
const reportsByStatus = new Map<string, any[]>();

allReports.result.reports.forEach(report => {
  // Группировка по типам
  const byType = reportsByType.get(report.report_type) || [];
  byType.push(report);
  reportsByType.set(report.report_type, byType);

  // Группировка по статусам  
  const byStatus = reportsByStatus.get(report.status) || [];
  byStatus.push(report);
  reportsByStatus.set(report.status, byStatus);
});

console.log("\nОтчеты по типам:");
reportsByType.forEach((reports, type) => {
  console.log(`  ${type}: ${reports.length} отчетов`);
  
  // Показываем последние 3 отчета этого типа
  reports
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 3)
    .forEach(report => {
      const date = new Date(report.created_at).toLocaleDateString('ru-RU');
      const status = report.status === 'SUCCESS' ? '✅' : report.status === 'FAILED' ? '❌' : '⏳';
      console.log(`    ${status} ${date}: ${report.file_name || report.code}`);
    });
});

console.log("\nОтчеты по статусам:");
reportsByStatus.forEach((reports, status) => {
  console.log(`  ${status}: ${reports.length} отчетов`);
});

// Поиск и скачивание успешных отчетов за последнюю неделю
const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
const recentSuccessfulReports = allReports.result.reports.filter(report => 
  report.status === 'SUCCESS' && 
  new Date(report.created_at) > weekAgo &&
  report.download_url
);

if (recentSuccessfulReports.length > 0) {
  console.log(`\n📁 Готовые отчеты за последнюю неделю (${recentSuccessfulReports.length}):`);
  recentSuccessfulReports.forEach(report => {
    const date = new Date(report.created_at).toLocaleDateString('ru-RU');
    console.log(`  📊 ${date}: ${report.file_name} (${report.report_type})`);
    console.log(`     🔗 ${report.download_url}`);
  });
}
```

### Анализ уценённых товаров
```typescript
// Создание отчета об уценённых товарах
console.log("Создание отчета об уценённых товарах...");
const discountedReport = await reportApi.createDiscountedReport({});

console.log(`Отчет об уценках создан: ${discountedReport.code}`);

// Ожидание готовности отчета
let discountedReportInfo;
let attempts = 0;
const maxAttempts = 20;

while (attempts < maxAttempts) {
  discountedReportInfo = await reportApi.getReportInfo({ 
    code: discountedReport.code 
  });
  
  if (discountedReportInfo.result.status === 'SUCCESS') {
    console.log("✅ Отчет об уценках готов!");
    break;
  } else if (discountedReportInfo.result.status === 'FAILED') {
    console.log(`❌ Ошибка создания отчета об уценках: ${discountedReportInfo.result.error}`);
    return;
  }
  
  console.log(`⏳ Создание отчета... (попытка ${attempts + 1}/${maxAttempts})`);
  await new Promise(resolve => setTimeout(resolve, 15000)); // ждем 15 секунд
  attempts++;
}

if (discountedReportInfo?.result.status === 'SUCCESS') {
  console.log(`📊 Отчет: ${discountedReportInfo.result.file_name}`);
  if (discountedReportInfo.result.download_url) {
    console.log(`🔗 Скачать: ${discountedReportInfo.result.download_url}`);
  }
  
  // Здесь можно добавить логику для анализа содержимого отчета
  // после его скачивания и парсинга
}
```

## Сложные сценарии

### ReportingDashboard - Система автоматической отчетности
```typescript
class ReportingDashboard {
  constructor(private api: ReportApi) {}

  async generateComprehensiveReport(period: ReportPeriod): Promise<ComprehensiveReport> {
    console.log(`🚀 Создание комплексного отчета за период: ${period.from} - ${period.to}`);

    // Создание всех типов отчетов параллельно
    const reportCreationPromises = await Promise.allSettled([
      this.createFinancialReport(period),
      this.createPostingsReport(period),
      this.createProductsReport(),
      this.createReturnsReport(period),
      this.createDiscountedReport(),
      this.createStockReport()
    ]);

    // Ожидание готовности всех отчетов
    const readyReports = await this.waitForReportsCompletion(reportCreationPromises);
    
    // Анализ и агрегация данных
    const analytics = await this.generateAnalytics(readyReports, period);
    
    return {
      period,
      reports: readyReports,
      analytics,
      recommendations: this.generateRecommendations(analytics),
      created_at: new Date().toISOString()
    };
  }

  private async createFinancialReport(period: ReportPeriod): Promise<FinancialReportData> {
    console.log("📊 Создание финансового отчета...");
    
    const report = await this.api.getFinanceCashFlowStatement({
      date: { from: period.from, to: period.to },
      page: 1,
      page_size: 1000,
      with_details: true
    });

    return {
      type: 'FINANCIAL',
      data: report.result,
      summary: this.analyzeFinancialData(report.result)
    };
  }

  private async createPostingsReport(period: ReportPeriod): Promise<string> {
    console.log("📦 Создание отчета об отправлениях...");
    
    const report = await this.api.createPostingsReport({
      filter: {
        since: period.from,
        to: period.to
      },
      language: 'RU'
    });

    return report.result.code;
  }

  private async waitForReportsCompletion(
    creationPromises: PromiseSettledResult<any>[]
  ): Promise<ReportInfo[]> {
    const reportCodes: string[] = [];
    
    // Извлекаем коды отчетов из успешных запросов создания
    creationPromises.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        const reportTypes = ['FINANCIAL', 'POSTINGS', 'PRODUCTS', 'RETURNS', 'DISCOUNTED', 'STOCK'];
        if (result.value && (result.value.result?.code || result.value.code)) {
          reportCodes.push(result.value.result?.code || result.value.code);
          console.log(`✅ ${reportTypes[index]} отчет создан`);
        }
      } else {
        console.error(`❌ Ошибка создания отчета:`, result.reason);
      }
    });

    // Мониторинг готовности отчетов
    const readyReports: ReportInfo[] = [];
    const maxWaitTime = 10 * 60 * 1000; // 10 минут
    const checkInterval = 15 * 1000; // 15 секунд
    const startTime = Date.now();

    while (readyReports.length < reportCodes.length && (Date.now() - startTime) < maxWaitTime) {
      const pendingCodes = reportCodes.filter(code => 
        !readyReports.some(report => report.code === code)
      );

      for (const code of pendingCodes) {
        try {
          const reportInfo = await this.api.getReportInfo({ code });
          
          if (reportInfo.result.status === 'SUCCESS') {
            readyReports.push(reportInfo.result);
            console.log(`✅ Отчет ${code} готов: ${reportInfo.result.file_name}`);
          } else if (reportInfo.result.status === 'FAILED') {
            console.error(`❌ Отчет ${code} завершился с ошибкой: ${reportInfo.result.error}`);
            // Добавляем неудачный отчет в список, чтобы не ждать его бесконечно
            readyReports.push(reportInfo.result);
          }
        } catch (error) {
          console.error(`Ошибка получения статуса отчета ${code}:`, error);
        }
      }

      if (readyReports.length < reportCodes.length) {
        console.log(`⏳ Ожидание готовности отчетов: ${readyReports.length}/${reportCodes.length}`);
        await new Promise(resolve => setTimeout(resolve, checkInterval));
      }
    }

    return readyReports;
  }

  private async generateAnalytics(reports: ReportInfo[], period: ReportPeriod): Promise<BusinessAnalytics> {
    return {
      revenue_analysis: this.analyzeRevenue(reports),
      product_performance: this.analyzeProductPerformance(reports),
      logistics_efficiency: this.analyzeLogistics(reports),
      return_analysis: this.analyzeReturns(reports),
      cost_analysis: this.analyzeCosts(reports),
      trend_analysis: this.analyzeTrends(reports, period)
    };
  }

  private analyzeFinancialData(financialData: any): FinancialSummary {
    const totalRevenue = financialData.operations.reduce((sum: number, op: any) => {
      return sum + parseFloat(op.accruals_for_sale || '0');
    }, 0);

    const totalCommissions = financialData.operations.reduce((sum: number, op: any) => {
      return sum + parseFloat(op.sale_commission || '0');
    }, 0);

    const totalDeliveryCharges = financialData.operations.reduce((sum: number, op: any) => {
      return sum + parseFloat(op.delivery_charge || '0');
    }, 0);

    return {
      total_revenue: totalRevenue,
      total_commissions: totalCommissions,
      total_delivery_charges: totalDeliveryCharges,
      net_profit: totalRevenue - totalCommissions - totalDeliveryCharges,
      average_order_value: totalRevenue / financialData.operations.length,
      commission_rate: totalCommissions / totalRevenue * 100
    };
  }

  private generateRecommendations(analytics: BusinessAnalytics): BusinessRecommendation[] {
    const recommendations: BusinessRecommendation[] = [];

    // Анализ выручки
    if (analytics.revenue_analysis.growth_rate < 0) {
      recommendations.push({
        category: 'REVENUE',
        priority: 'HIGH',
        title: 'Снижение выручки требует внимания',
        description: `Выручка снизилась на ${Math.abs(analytics.revenue_analysis.growth_rate).toFixed(1)}%`,
        actions: [
          'Проанализировать причины снижения продаж',
          'Рассмотреть расширение ассортимента',
          'Оптимизировать ценовую стратегию'
        ]
      });
    }

    // Анализ возвратов
    if (analytics.return_analysis.return_rate > 0.15) {
      recommendations.push({
        category: 'QUALITY',
        priority: 'MEDIUM',
        title: 'Высокий уровень возвратов',
        description: `Уровень возвратов составляет ${(analytics.return_analysis.return_rate * 100).toFixed(1)}%`,
        actions: [
          'Улучшить качество описаний товаров',
          'Проверить качество упаковки',
          'Проанализировать причины возвратов'
        ]
      });
    }

    return recommendations.sort((a, b) => {
      const priorityOrder = { 'HIGH': 3, 'MEDIUM': 2, 'LOW': 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }
}

interface ReportPeriod {
  from: string;
  to: string;
}

interface ComprehensiveReport {
  period: ReportPeriod;
  reports: ReportInfo[];
  analytics: BusinessAnalytics;
  recommendations: BusinessRecommendation[];
  created_at: string;
}

interface BusinessAnalytics {
  revenue_analysis: RevenueAnalysis;
  product_performance: ProductPerformance;
  logistics_efficiency: LogisticsEfficiency;
  return_analysis: ReturnAnalysis;
  cost_analysis: CostAnalysis;
  trend_analysis: TrendAnalysis;
}

interface BusinessRecommendation {
  category: 'REVENUE' | 'COSTS' | 'LOGISTICS' | 'QUALITY' | 'MARKETING';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  title: string;
  description: string;
  actions: string[];
}
```

### AutomatedReportScheduler - Планировщик автоматических отчетов
```typescript
class AutomatedReportScheduler {
  private scheduledJobs = new Map<string, NodeJS.Timeout>();

  constructor(private api: ReportApi) {}

  scheduleRegularReports(): void {
    // Еженедельные отчеты (каждый понедельник)
    this.scheduleWeeklyReports();
    
    // Ежемесячные отчеты (1-го числа каждого месяца)
    this.scheduleMonthlyReports();
    
    // Ежедневные быстрые отчеты
    this.scheduleDailyReports();
  }

  private scheduleWeeklyReports(): void {
    const weeklyJob = setInterval(async () => {
      if (new Date().getDay() === 1) { // понедельник
        console.log("📅 Запуск еженедельных отчетов...");
        
        const lastWeek = this.getLastWeekPeriod();
        await this.generateWeeklyReportSuite(lastWeek);
      }
    }, 24 * 60 * 60 * 1000); // проверяем каждые 24 часа

    this.scheduledJobs.set('weekly', weeklyJob);
  }

  private async generateWeeklyReportSuite(period: ReportPeriod): Promise<void> {
    try {
      // Создаем набор еженедельных отчетов
      const reports = await Promise.allSettled([
        this.api.createPostingsReport({
          filter: {
            since: period.from,
            to: period.to
          },
          language: 'RU'
        }),
        this.api.createReturnsReport({
          date_from: period.from,
          date_to: period.to,
          language: 'RU'
        }),
        this.api.createDiscountedReport({})
      ]);

      console.log(`✅ Еженедельные отчеты за ${period.from} - ${period.to} созданы`);
      
      // Отправка уведомления о готовности отчетов
      this.notifyReportsReady('weekly', period);
      
    } catch (error) {
      console.error("❌ Ошибка создания еженедельных отчетов:", error);
    }
  }

  private getLastWeekPeriod(): ReportPeriod {
    const now = new Date();
    const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    // Начало недели (понедельник)
    const weekStart = new Date(lastWeek);
    weekStart.setDate(lastWeek.getDate() - lastWeek.getDay() + 1);
    weekStart.setHours(0, 0, 0, 0);
    
    // Конец недели (воскресенье)
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);

    return {
      from: weekStart.toISOString().split('T')[0],
      to: weekEnd.toISOString().split('T')[0]
    };
  }

  private async notifyReportsReady(reportType: string, period: ReportPeriod): Promise<void> {
    // Здесь можно добавить интеграцию с системами уведомлений:
    // - отправка email
    // - Slack/Teams уведомления
    // - сохранение в базе данных
    // - интеграция с внешними системами аналитики
    
    console.log(`📨 Уведомление: ${reportType} отчеты за ${period.from} - ${period.to} готовы`);
  }

  stopAllScheduledJobs(): void {
    this.scheduledJobs.forEach((job, name) => {
      clearInterval(job);
      console.log(`⏹️ Остановлен планировщик: ${name}`);
    });
    this.scheduledJobs.clear();
  }
}
```

## Обработка ошибок

```typescript
try {
  const report = await reportApi.createProductsReport({
    visibility: 'VISIBLE'
  });

  // Ожидание готовности отчета
  let reportInfo;
  let attempts = 0;
  
  while (attempts < 20) {
    reportInfo = await reportApi.getReportInfo({ code: report.result.code });
    
    if (reportInfo.result.status === 'SUCCESS') {
      console.log("Отчет готов:", reportInfo.result.download_url);
      break;
    } else if (reportInfo.result.status === 'FAILED') {
      throw new Error(`Ошибка создания отчета: ${reportInfo.result.error}`);
    }
    
    await new Promise(resolve => setTimeout(resolve, 10000));
    attempts++;
  }
  
} catch (error) {
  if (error.response?.status === 400) {
    console.error("Некорректные параметры отчета:", error.response.data);
  } else if (error.response?.status === 429) {
    console.error("Превышен лимит создания отчетов");
  } else {
    console.error("Ошибка создания отчета:", error.message);
  }
}
```

## Лучшие практики

### Эффективное управление отчетами
```typescript
// Планирование создания отчетов с учетом лимитов
class ReportManager {
  private reportQueue: ReportTask[] = [];
  private processing = false;

  async queueReport(reportTask: ReportTask): Promise<string> {
    return new Promise((resolve, reject) => {
      this.reportQueue.push({
        ...reportTask,
        resolve,
        reject
      });
      
      this.processQueue();
    });
  }

  private async processQueue(): Promise<void> {
    if (this.processing || this.reportQueue.length === 0) return;
    
    this.processing = true;
    
    while (this.reportQueue.length > 0) {
      const task = this.reportQueue.shift()!;
      
      try {
        const reportCode = await this.executeReportCreation(task);
        task.resolve(reportCode);
        
        // Пауза между запросами для соблюдения лимитов
        await new Promise(resolve => setTimeout(resolve, 5000));
        
      } catch (error) {
        task.reject(error);
      }
    }
    
    this.processing = false;
  }
}

interface ReportTask {
  type: 'products' | 'postings' | 'returns' | 'discounted' | 'stock';
  params: any;
  resolve?: (code: string) => void;
  reject?: (error: Error) => void;
}
```

### Кэширование и оптимизация
```typescript
// Система кэширования отчетов
class ReportCache {
  private cache = new Map<string, CachedReport>();
  private readonly cacheTime = 6 * 60 * 60 * 1000; // 6 часов

  async getOrCreateReport(
    reportType: string, 
    params: any, 
    createFn: () => Promise<string>
  ): Promise<string> {
    const cacheKey = this.getCacheKey(reportType, params);
    const cached = this.cache.get(cacheKey);
    
    if (cached && (Date.now() - cached.created) < this.cacheTime) {
      console.log(`📋 Используем кэшированный отчет: ${cached.code}`);
      return cached.code;
    }
    
    console.log(`🔄 Создаем новый отчет: ${reportType}`);
    const reportCode = await createFn();
    
    this.cache.set(cacheKey, {
      code: reportCode,
      created: Date.now(),
      type: reportType,
      params
    });
    
    return reportCode;
  }

  private getCacheKey(reportType: string, params: any): string {
    return `${reportType}_${JSON.stringify(params)}`;
  }
}

interface CachedReport {
  code: string;
  created: number;
  type: string;
  params: any;
}
```

## Интеграционные заметки

- **Report Lifecycle**: Отчеты создаются асинхронно, требуется отслеживание статуса
- **Rate Limiting**: API поддерживает до 50 запросов создания отчетов в час
- **File Formats**: Отчеты доступны в форматах XLS, CSV в зависимости от типа
- **Download Links**: Ссылки для скачивания имеют ограниченное время жизни (24 часа)
- **Storage Period**: Готовые отчеты хранятся в системе 30 дней
- **Data Freshness**: Финансовые данные обновляются с задержкой до 2 часов
- **Language Support**: Отчеты поддерживают локализацию на русский и английский языки
- **Integration**: Отчеты можно интегрировать с внешними системами аналитики и BI