# 💰 Finance API - Финансовая отчётность

**Ключевая категория для управления финансами продавца** — получение отчётов, анализ транзакций и взаиморасчёты с маркетплейсом OZON.

## 🎯 Назначение API

Finance API предоставляет полный набор инструментов для:
- **Финансовая отчётность** — детальные отчёты по продажам и реализации
- **Анализ транзакций** — подробная информация о всех начислениях и списаниях
- **Взаиморасчёты** — отчёты о взаиморасчётах с OZON
- **Компенсации** — управление компенсациями и декомпенсациями
- **B2B продажи** — специализированные отчёты для юридических лиц
- **Выкупленные товары** — отчёты по товарам для продажи в ЕАЭС

---

## 📋 Список методов (10 endpoints)

### 📊 Основные отчёты
| Метод | Endpoint | Версия | Назначение |
|-------|----------|---------|------------|
| `getTransactionList` | `/v3/finance/transaction/list` | v3 | Список транзакций с детализацией |
| `getTransactionTotals` | `/v3/finance/transaction/totals` | v3 | Итоговые суммы транзакций |
| `getRealizationReport` | `/v2/finance/realization` | v2 | Отчёт о реализации товаров |
| `getRealizationReportPosting` | `/v1/finance/realization/posting` | v1 | Позаказный отчёт о реализации |

### 🏢 B2B отчёты
| Метод | Endpoint | Версия | Назначение |
|-------|----------|---------|------------|
| `getDocumentB2BSalesReport` | `/v1/finance/document-b2b-sales` | v1 | Реестр продаж юридическим лицам |
| `getDocumentB2BSalesJSON` | `/v1/finance/document-b2b-sales/json` | v1 | B2B отчёт в JSON формате |
| `getMutualSettlementReport` | `/v1/finance/mutual-settlement` | v1 | Отчёт о взаиморасчётах |

### 🔄 Компенсации и специальные отчёты  
| Метод | Endpoint | Версия | Назначение |
|-------|----------|---------|------------|
| `getCompensationReport` | `/v1/finance/compensation` | v1 | Отчёт о компенсациях |
| `getDecompensationReport` | `/v1/finance/decompensation` | v1 | Отчёт о декомпенсациях |
| `getProductsBuyoutReport` | `/v1/finance/products/buyout` | v1 | Отчёт о выкупленных товарах |

---

## 🚀 Быстрый старт

### Инициализация клиента
```typescript
import { OzonSellerAPI } from 'daytona-ozon-seller-api';

const client = new OzonSellerAPI({
  clientId: 'your-client-id',
  apiKey: 'your-api-key'
});
```

### Базовые операции

#### 1. Получение списка транзакций
```typescript
try {
  const transactions = await client.finance.getTransactionList({
    filter: {
      date: {
        from: '2024-01-01T00:00:00.000Z',
        to: '2024-01-31T23:59:59.999Z'
      },
      operation_type: ['orders'], // Только заказы
      posting_number: [] // Все отправления
    },
    page: 1,
    page_size: 1000
  });

  console.log(`💰 Найдено транзакций: ${transactions.result?.operations?.length || 0}`);
  
  // Анализ транзакций
  let totalIncome = 0;
  let totalExpenses = 0;
  
  transactions.result?.operations?.forEach(operation => {
    const amount = parseFloat(operation.amount || '0');
    if (amount > 0) {
      totalIncome += amount;
    } else {
      totalExpenses += Math.abs(amount);
    }
    
    console.log(`${operation.operation_date}: ${operation.operation_type} - ${amount}₽`);
  });
  
  console.log(`📈 Доходы: ${totalIncome}₽`);
  console.log(`📉 Расходы: ${totalExpenses}₽`);
  console.log(`💰 Прибыль: ${totalIncome - totalExpenses}₽`);
  
} catch (error) {
  console.error('❌ Ошибка получения транзакций:', error);
}
```

#### 2. Получение итогов по транзакциям
```typescript
try {
  const totals = await client.finance.getTransactionTotals({
    date: {
      from: '2024-01-01T00:00:00.000Z',
      to: '2024-01-31T23:59:59.999Z'
    },
    transaction_type: 'all' // Все типы операций
  });

  const result = totals.result;
  if (result) {
    console.log('📊 Финансовая сводка за месяц:');
    console.log(`💸 Акции: ${result.accruals_for_sale || 0}₽`);
    console.log(`📦 Товары: ${result.sale_commission || 0}₽`);
    console.log(`🚚 Доставка: ${result.postings || 0}₽`);
    console.log(`🔄 Возвраты: ${result.returns || 0}₽`);
    console.log(`💰 Итого к выплате: ${result.others || 0}₽`);
  }
} catch (error) {
  console.error('❌ Ошибка получения итогов:', error);
}
```

#### 3. Отчёт о реализации товаров
```typescript
try {
  // Получаем отчёт за прошлый месяц
  const currentDate = new Date();
  const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
  
  const report = await client.finance.getRealizationReport({
    month: lastMonth.getMonth() + 1, // Месяц от 1 до 12
    year: lastMonth.getFullYear()
  });

  console.log('📋 Отчёт о реализации готов');
  console.log(`📄 Заголовок: ${report.result?.header?.doc_number || 'N/A'}`);
  console.log(`📅 Период: ${report.result?.header?.doc_date || 'N/A'}`);
  
  // Обработка строк отчёта
  const rows = report.result?.rows || [];
  let totalSales = 0;
  
  rows.forEach(row => {
    if (row.row_number && row.row_number > 0) {
      const amount = parseFloat(row.sale_price || '0');
      totalSales += amount;
      
      console.log(`📦 ${row.product_name}: ${amount}₽`);
    }
  });
  
  console.log(`💰 Общие продажи: ${totalSales}₽`);
  
} catch (error) {
  console.error('❌ Ошибка получения отчёта о реализации:', error);
}
```

---

## 🎯 Детальные сценарии использования

### 📊 Сценарий 1: Полный финансовый анализ за период

**Задача**: Провести комплексный анализ финансов за месяц с детализацией по типам операций

```typescript
class FinanceAnalyzer {
  async analyzeMonth(year: number, month: number) {
    console.log(`📊 Анализ финансов за ${month}/${year}...`);
    
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999);
    
    try {
      // 1. Получаем все транзакции за месяц
      const allTransactions = await this.getAllTransactions(startDate, endDate);
      
      // 2. Получаем итоговые суммы
      const totals = await client.finance.getTransactionTotals({
        date: {
          from: startDate.toISOString(),
          to: endDate.toISOString()
        },
        transaction_type: 'all'
      });
      
      // 3. Получаем отчёт о реализации
      const realizationReport = await client.finance.getRealizationReport({
        month: month,
        year: year
      });
      
      // 4. Анализируем данные
      const analysis = this.processFinancialData(
        allTransactions,
        totals.result,
        realizationReport.result
      );
      
      // 5. Генерируем отчёт
      this.generateReport(analysis);
      
      return analysis;
      
    } catch (error) {
      console.error('❌ Ошибка анализа финансов:', error);
      throw error;
    }
  }
  
  private async getAllTransactions(startDate: Date, endDate: Date) {
    const allOperations = [];
    let page = 1;
    const pageSize = 1000;
    
    while (true) {
      const batch = await client.finance.getTransactionList({
        filter: {
          date: {
            from: startDate.toISOString(),
            to: endDate.toISOString()
          }
        },
        page: page,
        page_size: pageSize
      });
      
      const operations = batch.result?.operations || [];
      allOperations.push(...operations);
      
      console.log(`📥 Загружено транзакций: ${allOperations.length}`);
      
      if (operations.length < pageSize) {
        break; // Последняя страница
      }
      
      page++;
      
      // Пауза между запросами
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    return allOperations;
  }
  
  private processFinancialData(transactions: any[], totals: any, realization: any) {
    // Группировка транзакций по типам
    const groupedTransactions = this.groupTransactionsByType(transactions);
    
    // Расчёт ключевых метрик
    const metrics = {
      totalRevenue: 0,
      totalExpenses: 0,
      netProfit: 0,
      orderCount: 0,
      avgOrderValue: 0,
      returnRate: 0,
      // ... другие метрики
    };
    
    // Анализ по категориям товаров
    const categoryAnalysis = this.analyzeByCatgeories(transactions);
    
    // Анализ трендов
    const trends = this.analyzeTrends(transactions);
    
    return {
      metrics,
      groupedTransactions,
      categoryAnalysis,
      trends,
      totals,
      realization
    };
  }
  
  private groupTransactionsByType(transactions: any[]) {
    const groups: { [key: string]: any[] } = {};
    
    transactions.forEach(transaction => {
      const type = transaction.operation_type || 'unknown';
      if (!groups[type]) {
        groups[type] = [];
      }
      groups[type].push(transaction);
    });
    
    return groups;
  }
  
  private generateReport(analysis: any) {
    console.log('\n📊 ФИНАНСОВЫЙ ОТЧЁТ');
    console.log('===================');
    
    console.log('\n💰 Основные показатели:');
    console.log(`  Общая выручка: ${analysis.metrics.totalRevenue}₽`);
    console.log(`  Общие расходы: ${analysis.metrics.totalExpenses}₽`);
    console.log(`  Чистая прибыль: ${analysis.metrics.netProfit}₽`);
    console.log(`  Количество заказов: ${analysis.metrics.orderCount}`);
    console.log(`  Средний чек: ${analysis.metrics.avgOrderValue}₽`);
    
    console.log('\n📦 По типам операций:');
    Object.entries(analysis.groupedTransactions).forEach(([type, operations]) => {
      const total = operations.reduce((sum: number, op: any) => 
        sum + parseFloat(op.amount || '0'), 0);
      console.log(`  ${type}: ${total}₽ (${operations.length} операций)`);
    });
  }
}

// Использование
const analyzer = new FinanceAnalyzer();
const analysis = await analyzer.analyzeMonth(2024, 1);
```

### 🏢 Сценарий 2: Автоматическая генерация B2B отчётов

**Задача**: Создать систему автоматического формирования отчётов для бухгалтерии

```typescript
class B2BReportGenerator {
  async generateMonthlyReports(year: number, month: number) {
    console.log(`📋 Генерация B2B отчётов за ${month}/${year}...`);
    
    const dateStr = `${year}-${month.toString().padStart(2, '0')}`;
    
    try {
      // 1. Реестр продаж юридическим лицам (PDF)
      const salesReportPDF = await client.finance.getDocumentB2BSalesReport({
        date: dateStr,
        language: 'RU'
      });
      
      console.log('✅ PDF отчёт о продажах B2B создан');
      
      // 2. Реестр продаж в JSON формате для обработки
      const salesReportJSON = await client.finance.getDocumentB2BSalesJSON({
        date: dateStr
      });
      
      console.log('✅ JSON отчёт о продажах B2B получен');
      
      // 3. Отчёт о взаиморасчётах
      const settlementReport = await client.finance.getMutualSettlementReport({
        date: dateStr,
        language: 'RU'
      });
      
      console.log('✅ Отчёт о взаиморасчётах создан');
      
      // 4. Обработка JSON данных для анализа
      const jsonData = salesReportJSON;
      if (jsonData.invoices) {
        console.log(`📄 Найдено счетов-фактур: ${jsonData.invoices.length}`);
        
        let totalB2BSales = 0;
        jsonData.invoices.forEach((invoice: any) => {
          const amount = parseFloat(invoice.total_amount || '0');
          totalB2BSales += amount;
          
          console.log(`🏢 ${invoice.buyer_name}: ${amount}₽`);
        });
        
        console.log(`💰 Общие B2B продажи: ${totalB2BSales}₽`);
      }
      
      // 5. Отправка отчётов в бухгалтерию (пример интеграции)
      await this.sendReportsToAccounting({
        salesReportPDF,
        settlementReport,
        jsonAnalysis: this.analyzeB2BData(salesReportJSON),
        period: `${month}/${year}`
      });
      
      console.log('📧 Отчёты отправлены в бухгалтерию');
      
    } catch (error) {
      console.error('❌ Ошибка генерации B2B отчётов:', error);
      throw error;
    }
  }
  
  private analyzeB2BData(jsonData: any) {
    const analysis = {
      totalInvoices: 0,
      totalAmount: 0,
      topClients: [] as Array<{name: string, amount: number}>,
      avgInvoiceAmount: 0
    };
    
    if (jsonData.invoices && Array.isArray(jsonData.invoices)) {
      analysis.totalInvoices = jsonData.invoices.length;
      
      const clientTotals = new Map<string, number>();
      
      jsonData.invoices.forEach((invoice: any) => {
        const amount = parseFloat(invoice.total_amount || '0');
        analysis.totalAmount += amount;
        
        const clientName = invoice.buyer_name || 'Unknown';
        const currentTotal = clientTotals.get(clientName) || 0;
        clientTotals.set(clientName, currentTotal + amount);
      });
      
      analysis.avgInvoiceAmount = analysis.totalAmount / analysis.totalInvoices;
      
      // Топ клиенты
      analysis.topClients = Array.from(clientTotals.entries())
        .map(([name, amount]) => ({ name, amount }))
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 10);
    }
    
    return analysis;
  }
  
  private async sendReportsToAccounting(reports: any) {
    // Здесь может быть интеграция с системой бухгалтерии
    // Например, отправка через API, email или файловое хранилище
    console.log('📊 Подготовка отчётов для отправки...');
    
    // Пример сохранения в файловую систему
    const fs = require('fs').promises;
    const reportsDir = `./reports/${reports.period}`;
    
    // await fs.mkdir(reportsDir, { recursive: true });
    // await fs.writeFile(`${reportsDir}/b2b_analysis.json`, JSON.stringify(reports.jsonAnalysis, null, 2));
    
    console.log(`💾 Отчёты сохранены в ${reportsDir}`);
  }
}
```

### 💸 Сценарий 3: Мониторинг компенсаций и декомпенсаций

**Задача**: Отслеживать все компенсации и создавать алерты при значительных суммах

```typescript
class CompensationMonitor {
  private readonly ALERT_THRESHOLD = 10000; // 10,000₽
  
  async monitorCompensations(year: number, month: number) {
    console.log(`🔍 Мониторинг компенсаций за ${month}/${year}...`);
    
    const dateStr = `${year}-${month.toString().padStart(2, '0')}`;
    
    try {
      // 1. Получаем отчёт о компенсациях
      const compensationReport = await client.finance.getCompensationReport({
        date: dateStr,
        language: 'RU'
      });
      
      console.log('✅ Отчёт о компенсациях получен');
      
      // 2. Получаем отчёт о декомпенсациях  
      const decompensationReport = await client.finance.getDecompensationReport({
        date: dateStr,
        language: 'RU'
      });
      
      console.log('✅ Отчёт о декомпенсациях получен');
      
      // 3. Анализируем компенсации из транзакций
      const transactions = await this.getCompensationTransactions(dateStr);
      
      const analysis = this.analyzeCompensations(transactions);
      
      // 4. Проверяем на превышение лимитов
      const alerts = this.checkAlerts(analysis);
      
      if (alerts.length > 0) {
        console.log('🚨 ОБНАРУЖЕНЫ АЛЕРТЫ:');
        alerts.forEach(alert => {
          console.log(`  ⚠️ ${alert.type}: ${alert.amount}₽ - ${alert.reason}`);
        });
        
        // Отправка уведомлений
        await this.sendAlerts(alerts);
      }
      
      // 5. Создаём сводный отчёт
      this.generateCompensationSummary(analysis);
      
      return analysis;
      
    } catch (error) {
      console.error('❌ Ошибка мониторинга компенсаций:', error);
      throw error;
    }
  }
  
  private async getCompensationTransactions(dateStr: string) {
    const [year, month] = dateStr.split('-').map(Number);
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999);
    
    const transactions = await client.finance.getTransactionList({
      filter: {
        date: {
          from: startDate.toISOString(),
          to: endDate.toISOString()
        },
        operation_type: ['compensation'] // Только компенсации
      },
      page: 1,
      page_size: 1000
    });
    
    return transactions.result?.operations || [];
  }
  
  private analyzeCompensations(transactions: any[]) {
    const analysis = {
      totalCompensation: 0,
      totalDecompensation: 0,
      netCompensation: 0,
      compensationCount: 0,
      decompensationCount: 0,
      largeCompensations: [] as any[],
      byReason: new Map<string, { amount: number, count: number }>()
    };
    
    transactions.forEach(transaction => {
      const amount = parseFloat(transaction.amount || '0');
      const reason = transaction.operation_type_name || 'Unknown';
      
      if (amount > 0) {
        // Компенсация (положительная сумма)
        analysis.totalCompensation += amount;
        analysis.compensationCount++;
        
        if (amount > this.ALERT_THRESHOLD) {
          analysis.largeCompensations.push({
            amount,
            reason,
            date: transaction.operation_date,
            posting: transaction.posting_number
          });
        }
      } else {
        // Декомпенсация (отрицательная сумма)
        const absAmount = Math.abs(amount);
        analysis.totalDecompensation += absAmount;
        analysis.decompensationCount++;
        
        if (absAmount > this.ALERT_THRESHOLD) {
          analysis.largeCompensations.push({
            amount: absAmount,
            reason: `Декомпенсация: ${reason}`,
            date: transaction.operation_date,
            posting: transaction.posting_number
          });
        }
      }
      
      // Группировка по причинам
      const current = analysis.byReason.get(reason) || { amount: 0, count: 0 };
      analysis.byReason.set(reason, {
        amount: current.amount + Math.abs(amount),
        count: current.count + 1
      });
    });
    
    analysis.netCompensation = analysis.totalCompensation - analysis.totalDecompensation;
    
    return analysis;
  }
  
  private checkAlerts(analysis: any) {
    const alerts = [];
    
    // Проверка крупных компенсаций
    analysis.largeCompensations.forEach((comp: any) => {
      alerts.push({
        type: 'Крупная компенсация',
        amount: comp.amount,
        reason: comp.reason,
        details: `Отправление: ${comp.posting}, Дата: ${comp.date}`
      });
    });
    
    // Проверка общей суммы декомпенсаций
    if (analysis.totalDecompensation > 50000) {
      alerts.push({
        type: 'Высокая сумма декомпенсаций',
        amount: analysis.totalDecompensation,
        reason: 'Общая сумма декомпенсаций превышает 50,000₽',
        details: `Количество операций: ${analysis.decompensationCount}`
      });
    }
    
    return alerts;
  }
  
  private async sendAlerts(alerts: any[]) {
    // Отправка алертов через различные каналы
    console.log('📧 Отправка алертов...');
    
    // Здесь может быть интеграция с:
    // - Электронной почтой
    // - Slack/Telegram
    // - SMS уведомлениями
    // - Системой мониторинга
    
    alerts.forEach(alert => {
      console.log(`🔔 Алерт: ${JSON.stringify(alert, null, 2)}`);
    });
  }
  
  private generateCompensationSummary(analysis: any) {
    console.log('\n💸 ОТЧЁТ ПО КОМПЕНСАЦИЯМ');
    console.log('=======================');
    
    console.log(`💰 Общие компенсации: ${analysis.totalCompensation}₽ (${analysis.compensationCount} операций)`);
    console.log(`💸 Общие декомпенсации: ${analysis.totalDecompensation}₽ (${analysis.decompensationCount} операций)`);
    console.log(`🏦 Чистые компенсации: ${analysis.netCompensation}₽`);
    
    console.log('\n📊 По причинам:');
    Array.from(analysis.byReason.entries())
      .sort(([,a], [,b]) => b.amount - a.amount)
      .slice(0, 10)
      .forEach(([reason, data]) => {
        console.log(`  ${reason}: ${data.amount}₽ (${data.count} операций)`);
      });
  }
}
```

---

## 📝 TypeScript типы и интерфейсы

### Основные Request интерфейсы

```typescript
// Список транзакций
interface FinanceTransactionListV3Request {
  filter?: FinanceTransactionListV3RequestFilter;
  page: number;
  page_size: number;
}

interface FinanceTransactionListV3RequestFilter {
  date?: {
    from: string; // ISO 8601 format
    to: string;   // ISO 8601 format
  };
  operation_type?: ('orders' | 'returns' | 'services' | 'compensation' | 'transferDelivery' | 'other')[];
  posting_number?: string[];
  transaction_type?: 'all' | 'orders' | 'returns' | 'services' | 'compensation' | 'transferDelivery' | 'other';
}

// Итоги транзакций
interface FinanceTransactionTotalsV3Request {
  date?: {
    from: string; // ISO 8601 format
    to: string;   // ISO 8601 format
  };
  posting_number?: string;
  transaction_type?: 'all' | 'orders' | 'returns' | 'services' | 'compensation' | 'transferDelivery' | 'other';
}

// Отчёт о реализации
interface GetRealizationReportRequestV2 {
  month: number; // 1-12
  year: number;  // Например, 2024
}

interface GetRealizationReportPostingRequest {
  month: number; // 1-12
  year: number;  // Например, 2024
}

// B2B отчёты
interface CreateDocumentB2BSalesReportRequest {
  date: string;    // Формат YYYY-MM
  language?: 'RU' | 'EN';
}

interface CreateDocumentB2BSalesJSONReportRequest {
  date: string; // Формат YYYY-MM, доступен до января 2019
}

interface CreateMutualSettlementReportRequest {
  date: string;    // Формат YYYY-MM
  language?: 'RU' | 'EN';
}

// Компенсации
interface GetCompensationReportRequest {
  date: string;    // Формат YYYY-MM
  language?: 'RU' | 'EN';
}

interface GetDecompensationReportRequest {
  date: string;    // Формат YYYY-MM
  language?: 'RU' | 'EN';
}

// Выкупленные товары
interface GetFinanceProductsBuyoutRequest {
  date_from: string; // Дата начала периода
  date_to: string;   // Дата окончания (макс. 31 день)
}
```

### Response интерфейсы

```typescript
// Список транзакций
interface FinanceTransactionListV3Response {
  result?: {
    operations?: FinanceOperation[];
    page?: number;
    page_size?: number;
    page_count?: number;
  };
}

interface FinanceOperation {
  operation_id?: string;
  operation_type?: string;
  operation_type_name?: string;
  operation_date?: string;
  operation_date_full?: string;
  description?: string;
  accruals_for_sale?: string;
  sale_commission?: string;
  amount?: string;
  type?: string;
  posting_number?: string;
  posting_number_child?: string;
  cluster_from?: string;
  cluster_to?: string;
  product_id?: number;
  product_name?: string;
  warehouse_id?: number;
  warehouse_name?: string;
  region_from?: string;
  region_to?: string;
  delivery_schema?: string;
  tariff_zone?: string;
  payment_subject?: string;
  delivery_type?: string;
}

// Итоги транзакций
interface FinanceTransactionTotalsV3Response {
  result?: {
    accruals_for_sale?: string;
    sale_commission?: string;
    postings?: string;
    returns?: string;
    services?: string;
    compensation?: string;
    others?: string;
    acquiring_bank?: string;
    acquiring_percent?: string;
    acquiring_fix?: string;
    claim?: string;
    revenue?: string;
  };
}

// Отчёт о реализации
interface GetRealizationReportResponseV2 {
  result?: {
    header?: RealizationReportHeader;
    rows?: RealizationReportRow[];
  };
}

interface RealizationReportHeader {
  doc_number?: string;
  doc_date?: string;
  contract_date?: string;
  contract_number?: string;
  currency_code?: string;
  seller_name?: string;
  seller_inn?: string;
  seller_kpp?: string;
  seller_address?: string;
}

interface RealizationReportRow {
  row_number?: number;
  product_id?: number;
  product_name?: string;
  brand_name?: string;
  model?: string;
  posting_number?: string;
  posting_date?: string;
  warehouse_name?: string;
  supplier_name?: string;
  sale_price?: string;
  for_pay?: string;
  partial_num?: number;
}

// B2B JSON отчёт
interface CreateDocumentB2BSalesJSONReportResponse {
  date_from?: string;     // YYYY-MM-DD
  date_to?: string;       // YYYY-MM-DD
  invoices?: B2BInvoice[];
  seller_info?: B2BSellerInfo;
}

interface B2BInvoice {
  invoice_number?: string;
  invoice_date?: string;
  buyer_name?: string;
  buyer_inn?: string;
  buyer_kpp?: string;
  total_amount?: string;
  currency_code?: string;
  items?: B2BInvoiceItem[];
}

interface B2BInvoiceItem {
  product_name?: string;
  quantity?: number;
  unit_price?: string;
  total_price?: string;
  vat_rate?: string;
  vat_amount?: string;
}

interface B2BSellerInfo {
  name?: string;
  inn?: string;
  kpp?: string;
  address?: string;
}

// Выкупленные товары
interface GetFinanceProductsBuyoutResponse {
  products?: BuyoutProduct[];
}

interface BuyoutProduct {
  product_id?: number;
  offer_id?: string;
  product_name?: string;
  price?: string;
  quantity?: number;
  amount?: string;
  currency_code?: string;
  warehouse_id?: number;
  warehouse_name?: string;
  cluster_from?: string;
  cluster_to?: string;
  region_from?: string;
  region_to?: string;
}

// Базовые response типы для отчётов
interface CreateReportResponse {
  result?: string; // Обычно "ok"
}
```

---

## 🚨 Особенности API и ограничения

### Региональные ограничения
⚠️ **Важно**: Некоторые методы недоступны для продавцов с договором ТОО «ОЗОН Маркетплейс Казахстан»:
- `getRealizationReport` (v2)  
- `getRealizationReportPosting` (v1)

### Временные ограничения
- **Транзакции**: Максимальный период в одном запросе — 1 месяц
- **Выкупленные товары**: Максимальный период — 31 день
- **B2B JSON отчёт**: Доступен только до января 2019 включительно
- **Отчёты о реализации**: Доступны с августа 2023 года

### Rate Limiting
```typescript
// ⚠️ Используйте последовательные запросы
async function getTransactionsSequentially() {
  const results = [];
  
  for (const dateRange of dateRanges) {
    const transactions = await client.finance.getTransactionList({
      filter: { date: dateRange },
      page: 1,
      page_size: 1000
    });
    
    results.push(...transactions.result?.operations || []);
    
    // Обязательная пауза между запросами
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  return results;
}
```

### Несоответствие данных
⚠️ **Внимание**: Данные методов `getTransactionList` и `getTransactionTotals` могут не соответствовать информации в личном кабинете. Для точных данных используйте официальные отчёты через интерфейс кабинета.

---

## 💡 Лучшие практики

### 1. Управление большими объёмами данных
```typescript
class FinanceDataManager {
  private readonly BATCH_SIZE = 1000;
  private readonly DELAY_BETWEEN_REQUESTS = 1000; // 1 секунда
  
  async getAllTransactions(startDate: Date, endDate: Date) {
    const allOperations = [];
    let page = 1;
    
    // Разбиваем большой период на месячные интервалы
    const monthlyRanges = this.splitIntoMonths(startDate, endDate);
    
    for (const range of monthlyRanges) {
      console.log(`📥 Загрузка транзакций за ${range.from} - ${range.to}`);
      
      let hasMorePages = true;
      page = 1;
      
      while (hasMorePages) {
        const batch = await client.finance.getTransactionList({
          filter: {
            date: {
              from: range.from,
              to: range.to
            }
          },
          page: page,
          page_size: this.BATCH_SIZE
        });
        
        const operations = batch.result?.operations || [];
        allOperations.push(...operations);
        
        hasMorePages = operations.length === this.BATCH_SIZE;
        page++;
        
        // Обязательная пауза
        await this.delay(this.DELAY_BETWEEN_REQUESTS);
      }
    }
    
    console.log(`✅ Загружено всего транзакций: ${allOperations.length}`);
    return allOperations;
  }
  
  private splitIntoMonths(startDate: Date, endDate: Date) {
    const ranges = [];
    const current = new Date(startDate);
    
    while (current <= endDate) {
      const monthStart = new Date(current.getFullYear(), current.getMonth(), 1);
      const monthEnd = new Date(current.getFullYear(), current.getMonth() + 1, 0, 23, 59, 59, 999);
      
      ranges.push({
        from: monthStart.toISOString(),
        to: Math.min(monthEnd.getTime(), endDate.getTime()) === endDate.getTime() 
          ? endDate.toISOString() 
          : monthEnd.toISOString()
      });
      
      current.setMonth(current.getMonth() + 1);
    }
    
    return ranges;
  }
  
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

### 2. Кэширование финансовых данных
```typescript
class FinanceCache {
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();
  
  async getTransactionsCached(filter: any, ttl = 5 * 60 * 1000) { // 5 минут по умолчанию
    const cacheKey = this.generateCacheKey(filter);
    const cached = this.cache.get(cacheKey);
    
    if (cached && (Date.now() - cached.timestamp) < cached.ttl) {
      console.log('📋 Данные получены из кэша');
      return cached.data;
    }
    
    console.log('🔄 Загрузка данных из API...');
    const data = await client.finance.getTransactionList(filter);
    
    this.cache.set(cacheKey, {
      data,
      timestamp: Date.now(),
      ttl
    });
    
    return data;
  }
  
  private generateCacheKey(filter: any): string {
    return `transactions_${JSON.stringify(filter)}`;
  }
  
  clearCache() {
    this.cache.clear();
    console.log('🗑️ Кэш очищен');
  }
}
```

### 3. Обработка ошибок и валидация
```typescript
class FinanceValidator {
  validateDateRange(startDate: Date, endDate: Date) {
    const diffInMs = endDate.getTime() - startDate.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    
    if (diffInDays > 31) {
      throw new Error('❌ Максимальный период для запроса — 31 день');
    }
    
    if (startDate > endDate) {
      throw new Error('❌ Дата начала не может быть больше даты окончания');
    }
    
    if (endDate > new Date()) {
      throw new Error('❌ Нельзя запрашивать данные из будущего');
    }
  }
  
  validateTransactionType(type: string) {
    const validTypes = ['all', 'orders', 'returns', 'services', 'compensation', 'transferDelivery', 'other'];
    
    if (!validTypes.includes(type)) {
      throw new Error(`❌ Недопустимый тип транзакции: ${type}. Разрешены: ${validTypes.join(', ')}`);
    }
  }
  
  async safeTransactionRequest<T>(
    operation: () => Promise<T>,
    retries = 3
  ): Promise<T> {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        return await operation();
      } catch (error: any) {
        console.error(`❌ Попытка ${attempt} не удалась:`, error.message);
        
        if (attempt === retries) {
          throw new Error(`Не удалось выполнить операцию после ${retries} попыток: ${error.message}`);
        }
        
        // Экспоненциальная задержка
        const delay = Math.pow(2, attempt) * 1000;
        console.log(`⏳ Ожидание ${delay}мс перед повторной попыткой...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    throw new Error('Unexpected end of retry loop');
  }
}
```

### 4. Автоматизация отчётности
```typescript
class AutomatedReporting {
  private scheduler = new Map<string, NodeJS.Timeout>();
  
  scheduleMonthlyReports() {
    // Генерация отчётов каждое 5 число месяца в 9:00
    const cronExpression = '0 9 5 * *'; // 5 число каждого месяца в 9:00
    
    this.scheduler.set('monthly_reports', this.createSchedule(cronExpression, async () => {
      try {
        const lastMonth = this.getPreviousMonth();
        
        console.log(`📅 Автоматическая генерация отчётов за ${lastMonth.month}/${lastMonth.year}`);
        
        // Генерация всех необходимых отчётов
        await Promise.all([
          this.generateTransactionSummary(lastMonth.year, lastMonth.month),
          this.generateB2BReports(lastMonth.year, lastMonth.month),
          this.generateRealizationReport(lastMonth.year, lastMonth.month),
          this.checkCompensations(lastMonth.year, lastMonth.month)
        ]);
        
        console.log('✅ Все отчёты созданы успешно');
        
      } catch (error) {
        console.error('❌ Ошибка автоматической генерации отчётов:', error);
        await this.sendErrorAlert(error);
      }
    }));
  }
  
  private createSchedule(cronExpression: string, callback: () => Promise<void>) {
    // Здесь должна быть реализация cron scheduler
    // Например, с использованием библиотеки node-cron
    console.log(`⏰ Запланированo выполнение: ${cronExpression}`);
    
    // Простая имитация для примера
    const now = new Date();
    const nextRun = new Date(now.getFullYear(), now.getMonth(), 5, 9, 0, 0);
    
    if (nextRun < now) {
      nextRun.setMonth(nextRun.getMonth() + 1);
    }
    
    const delay = nextRun.getTime() - now.getTime();
    
    return setTimeout(() => {
      callback();
      this.scheduleMonthlyReports(); // Перепланировать на следующий месяц
    }, delay);
  }
  
  private getPreviousMonth() {
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1);
    
    return {
      year: lastMonth.getFullYear(),
      month: lastMonth.getMonth() + 1
    };
  }
  
  stopAllSchedules() {
    this.scheduler.forEach((timeout, name) => {
      clearTimeout(timeout);
      console.log(`⏹️ Остановлено расписание: ${name}`);
    });
    this.scheduler.clear();
  }
}
```

---

## 🔗 Связанные API

- **[Products API](./products.md)** — товары для финансового анализа
- **[FBO API](https://github.com/salacoste/ozon-daytona-seller-api)** — заказы FBO для сверки транзакций  
- **[FBS API](https://github.com/salacoste/ozon-daytona-seller-api)** — заказы FBS для сверки транзакций
- **[Analytics API](https://github.com/salacoste/ozon-daytona-seller-api)** — аналитика продаж
- **[Report API](https://github.com/salacoste/ozon-daytona-seller-api)** — дополнительные отчёты

## 📞 Поддержка

**Нашли ошибку или хотите улучшить документацию?**
- 🐛 [Создать Issue](https://github.com/salacoste/ozon-daytona-seller-api/issues/new)
- 🔧 [Pull Request](https://github.com/salacoste/ozon-daytona-seller-api/compare)
- 💬 [GitHub Discussions](https://github.com/salacoste/ozon-daytona-seller-api/discussions)

**Полезные ресурсы:**
- 📚 [Официальная документация OZON](https://docs.ozon.ru/api/seller/)
- ⭐ [Репозиторий SDK](https://github.com/salacoste/ozon-daytona-seller-api)
- 📦 [NPM пакет](https://www.npmjs.com/package/daytona-ozon-seller-api)
- 🎓 [База знаний OZON](https://seller-edu.ozon.ru/docs/finances-documents/)

---

🏠 [Главная документация](../README.md) | 📚 [Все категории](./README.md)
```