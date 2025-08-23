# Finance API

API для работы с финансовыми отчетами и транзакциями в OZON Seller API.

**Количество методов**: 10 методов

## Обзор

Finance API предоставляет полный набор инструментов для финансовой отчетности:
- 💰 Отчеты о компенсациях и декомпенсациях
- 📊 Отчеты о реализации товаров
- 🏢 Отчеты по продажам юридическим лицам (B2B)
- 💳 Списки транзакций и итоговые суммы
- 📋 Взаиморасчеты с OZON
- 📈 Отчеты о выкупленных товарах

## Основные возможности

### 💰 Компенсационная система
- **Компенсации** - выплаты продавцу за утерянные/поврежденные товары
- **Декомпенсации** - возврат ранее выплаченных компенсаций
- Автоматическое формирование отчетов по периодам

### 📊 Отчеты о реализации
- Детализация по SKU и отправлениям
- Группировка по периодам
- Расчет комиссий и выплат
- Версии v1 и v2 с расширенным функционалом

### 🏢 B2B отчетность
- Специальные отчеты для продаж юридическим лицам
- Форматы Excel и JSON
- Информация о счетах и НДС

### 💳 Финансовые транзакции
- Полная история всех финансовых операций
- Фильтрация по типам и периодам
- Агрегированные итоги по транзакциям

## Методы API

### Отчеты о компенсациях

#### createCompensationReport()
**Назначение**: Создать отчет о компенсациях

```typescript
interface GetCompensationReportRequest {
  date: string; // Формат 'YYYY-MM'
  language: 'DEFAULT' | 'RU' | 'EN';
}
```

#### createDecompensationReport()
**Назначение**: Создать отчет о декомпенсациях

### Отчеты о реализации

#### getRealizationReportPosting()
**Назначение**: Получить отчет о реализации с группировкой по отправлениям

```typescript
interface GetRealizationReportPostingRequest {
  date: {
    from: string;
    to: string;
  };
}
```

#### getRealizationReportV2()
**Назначение**: Получить отчет о реализации (версия 2)

```typescript
interface GetRealizationReportV2Request {
  month: string; // Формат 'YYYY-MM'
  language: 'DEFAULT' | 'RU' | 'EN';
}
```

### B2B отчетность

#### createDocumentB2BSalesReport()
**Назначение**: Создать реестр продаж юридическим лицам (Excel)

#### createDocumentB2BSalesJSONReport()
**Назначение**: Создать реестр продаж юридическим лицам (JSON)

### Финансовые операции

#### getTransactionList()
**Назначение**: Получить список транзакций (версия 3)

```typescript
interface FinanceTransactionListV3Request {
  page: number;
  page_size: number;
  filter: {
    date?: {
      from: string;
      to: string;
    };
    operation_type?: string[];
    posting_number?: string;
  };
}
```

#### getTransactionTotals()
**Назначение**: Получить итоги по транзакциям

### Дополнительные отчеты

#### getProductsBuyout()
**Назначение**: Получить отчет о выкупленных товарах

#### createMutualSettlementReport()
**Назначение**: Создать отчет о взаиморасчетах

## Практические примеры

### Базовое использование

```typescript
import { OzonSellerAPI } from 'bmad-ozon-seller-api';

const api = new OzonSellerAPI({
  clientId: 'your-client-id',
  apiKey: 'your-api-key'
});

// Создать отчет о компенсациях за январь 2024
const compensationReport = await api.finance.createCompensationReport({
  date: '2024-01',
  language: 'RU'
});

// Получить список транзакций за период
const transactions = await api.finance.getTransactionList({
  page: 1,
  page_size: 100,
  filter: {
    date: {
      from: '2024-01-01',
      to: '2024-01-31'
    }
  }
});

// Получить отчет о реализации
const realizationReport = await api.finance.getRealizationReportV2({
  month: '2024-01',
  language: 'RU'
});

// Получить итоги по транзакциям
const totals = await api.finance.getTransactionTotals({
  filter: {
    date: {
      from: '2024-01-01',
      to: '2024-01-31'
    }
  }
});
```

### Продвинутые сценарии

#### Система финансовой отчетности

```typescript
class FinancialReportingSystem {
  constructor(private api: OzonSellerAPI) {}

  async generateMonthlyFinancialReport(month: string): Promise<void> {
    console.log(`📊 Создание финансового отчета за ${month}`);
    console.log('='.repeat(50));

    try {
      // 1. Получаем отчет о реализации
      const realizationReport = await this.getRealizationData(month);
      
      // 2. Получаем данные о транзакциях
      const transactionData = await this.getTransactionData(month);
      
      // 3. Получаем данные о компенсациях
      const compensationData = await this.getCompensationData(month);
      
      // 4. Получаем B2B данные
      const b2bData = await this.getB2BData(month);
      
      // 5. Создаем сводный отчет
      const summary = this.createFinancialSummary({
        realization: realizationReport,
        transactions: transactionData,
        compensations: compensationData,
        b2b: b2bData,
        month
      });
      
      // 6. Выводим результаты
      this.printFinancialSummary(summary);
      
      // 7. Сохраняем отчет
      await this.saveFinancialReport(summary, month);
      
    } catch (error) {
      console.error('❌ Ошибка создания финансового отчета:', error);
      throw error;
    }
  }

  private async getRealizationData(month: string): Promise<any> {
    console.log('📈 Получение данных о реализации...');
    
    const realizationReport = await this.api.finance.getRealizationReportV2({
      month,
      language: 'RU'
    });

    // Парсим данные отчета
    const realizationData = {
      totalSales: 0,
      totalCommission: 0,
      totalPayout: 0,
      itemsSold: 0,
      topProducts: []
    };

    if (realizationReport.result?.data) {
      const productStats = new Map();
      
      realizationReport.result.data.forEach((row: any) => {
        // Предполагаем структуру данных отчета
        const sales = parseFloat(row.sale_amount) || 0;
        const commission = parseFloat(row.commission_amount) || 0;
        const quantity = parseInt(row.quantity) || 0;
        const sku = row.sku || 'unknown';
        
        realizationData.totalSales += sales;
        realizationData.totalCommission += commission;
        realizationData.itemsSold += quantity;
        
        if (!productStats.has(sku)) {
          productStats.set(sku, {
            sku,
            name: row.product_name || 'Неизвестно',
            sales: 0,
            commission: 0,
            quantity: 0
          });
        }
        
        const productStat = productStats.get(sku);
        productStat.sales += sales;
        productStat.commission += commission;
        productStat.quantity += quantity;
      });
      
      realizationData.totalPayout = realizationData.totalSales - realizationData.totalCommission;
      
      // Топ-10 товаров по продажам
      realizationData.topProducts = Array.from(productStats.values())
        .sort((a, b) => b.sales - a.sales)
        .slice(0, 10);
    }

    console.log(`✅ Реализация: ${realizationData.totalSales.toFixed(2)} руб. (${realizationData.itemsSold} шт.)`);
    return realizationData;
  }

  private async getTransactionData(month: string): Promise<any> {
    console.log('💳 Получение данных о транзакциях...');
    
    const [year, monthNum] = month.split('-');
    const fromDate = `${year}-${monthNum}-01`;
    const toDate = new Date(parseInt(year), parseInt(monthNum), 0).toISOString().split('T')[0];
    
    // Получаем все транзакции постранично
    let allTransactions = [];
    let page = 1;
    let hasMore = true;
    
    while (hasMore) {
      const transactions = await this.api.finance.getTransactionList({
        page,
        page_size: 1000,
        filter: {
          date: { from: fromDate, to: toDate }
        }
      });
      
      if (transactions.result?.operations) {
        allTransactions.push(...transactions.result.operations);
        hasMore = transactions.result.operations.length === 1000;
        page++;
      } else {
        hasMore = false;
      }
      
      // Пауза между запросами
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // Анализируем транзакции
    const transactionData = {
      totalTransactions: allTransactions.length,
      totalIncome: 0,
      totalExpense: 0,
      netIncome: 0,
      typeStats: new Map(),
      dailyStats: new Map()
    };

    allTransactions.forEach((transaction: any) => {
      const amount = parseFloat(transaction.amount) || 0;
      const type = transaction.operation_type || 'unknown';
      const date = transaction.operation_date?.split('T')[0] || 'unknown';
      
      if (amount > 0) {
        transactionData.totalIncome += amount;
      } else {
        transactionData.totalExpense += Math.abs(amount);
      }
      
      // Статистика по типам
      if (!transactionData.typeStats.has(type)) {
        transactionData.typeStats.set(type, { count: 0, total: 0 });
      }
      const typeStat = transactionData.typeStats.get(type);
      typeStat.count++;
      typeStat.total += amount;
      
      // Ежедневная статистика
      if (!transactionData.dailyStats.has(date)) {
        transactionData.dailyStats.set(date, { income: 0, expense: 0 });
      }
      const dailyStat = transactionData.dailyStats.get(date);
      if (amount > 0) {
        dailyStat.income += amount;
      } else {
        dailyStat.expense += Math.abs(amount);
      }
    });

    transactionData.netIncome = transactionData.totalIncome - transactionData.totalExpense;
    
    console.log(`✅ Транзакции: ${allTransactions.length} операций, чистый доход ${transactionData.netIncome.toFixed(2)} руб.`);
    return transactionData;
  }

  private async getCompensationData(month: string): Promise<any> {
    console.log('💰 Получение данных о компенсациях...');
    
    try {
      // Создаем отчеты о компенсациях и декомпенсациях
      const [compensationResult, decompensationResult] = await Promise.all([
        this.api.finance.createCompensationReport({
          date: month,
          language: 'RU'
        }),
        this.api.finance.createDecompensationReport({
          date: month,
          language: 'RU'
        })
      ]);

      const compensationData = {
        compensations: {
          created: compensationResult.result?.code === 'SUCCESS',
          message: compensationResult.result?.message || 'Не удалось создать отчет'
        },
        decompensations: {
          created: decompensationResult.result?.code === 'SUCCESS',
          message: decompensationResult.result?.message || 'Не удалось создать отчет'
        }
      };

      console.log('✅ Отчеты о компенсациях созданы');
      return compensationData;
    } catch (error) {
      console.log('⚠️ Ошибка получения данных о компенсациях:', error.message);
      return { compensations: null, decompensations: null };
    }
  }

  private async getB2BData(month: string): Promise<any> {
    console.log('🏢 Получение B2B данных...');
    
    try {
      const [year, monthNum] = month.split('-');
      const fromDate = `${year}-${monthNum}-01`;
      const toDate = new Date(parseInt(year), parseInt(monthNum), 0).toISOString().split('T')[0];
      
      const b2bJsonReport = await this.api.finance.createDocumentB2BSalesJSONReport({
        date_from: fromDate,
        date_to: toDate
      });

      const b2bData = {
        invoices: b2bJsonReport.result?.invoices || [],
        totalAmount: b2bJsonReport.result?.total_amount || 0,
        invoiceCount: b2bJsonReport.result?.invoices?.length || 0
      };

      console.log(`✅ B2B: ${b2bData.invoiceCount} счетов на сумму ${b2bData.totalAmount.toFixed(2)} руб.`);
      return b2bData;
    } catch (error) {
      console.log('⚠️ B2B данные недоступны:', error.message);
      return { invoices: [], totalAmount: 0, invoiceCount: 0 };
    }
  }

  private createFinancialSummary(data: any): any {
    const summary = {
      month: data.month,
      generatedAt: new Date().toISOString(),
      realization: {
        totalSales: data.realization.totalSales,
        totalCommission: data.realization.totalCommission,
        totalPayout: data.realization.totalPayout,
        itemsSold: data.realization.itemsSold,
        averageOrderValue: data.realization.itemsSold > 0 ? 
          data.realization.totalSales / data.realization.itemsSold : 0,
        commissionRate: data.realization.totalSales > 0 ? 
          (data.realization.totalCommission / data.realization.totalSales) * 100 : 0
      },
      transactions: {
        totalCount: data.transactions.totalTransactions,
        totalIncome: data.transactions.totalIncome,
        totalExpense: data.transactions.totalExpense,
        netIncome: data.transactions.netIncome,
        profitMargin: data.realization.totalSales > 0 ? 
          (data.transactions.netIncome / data.realization.totalSales) * 100 : 0
      },
      b2b: {
        invoiceCount: data.b2b.invoiceCount,
        totalAmount: data.b2b.totalAmount,
        shareOfB2B: data.realization.totalSales > 0 ?
          (data.b2b.totalAmount / data.realization.totalSales) * 100 : 0
      },
      kpis: {
        roi: data.transactions.totalExpense > 0 ?
          (data.transactions.netIncome / data.transactions.totalExpense) * 100 : 0,
        revenuePerTransaction: data.transactions.totalCount > 0 ?
          data.realization.totalSales / data.transactions.totalCount : 0,
        averageCommissionPerItem: data.realization.itemsSold > 0 ?
          data.realization.totalCommission / data.realization.itemsSold : 0
      },
      topProducts: data.realization.topProducts
    };

    return summary;
  }

  private printFinancialSummary(summary: any): void {
    console.log('\n📊 ФИНАНСОВЫЙ ОТЧЕТ');
    console.log('='.repeat(60));
    console.log(`📅 Период: ${summary.month}`);
    console.log(`🕐 Создан: ${new Date(summary.generatedAt).toLocaleString()}`);

    console.log('\n💰 РЕАЛИЗАЦИЯ:');
    console.log(`Общая сумма продаж: ${summary.realization.totalSales.toFixed(2)} руб.`);
    console.log(`Комиссия OZON: ${summary.realization.totalCommission.toFixed(2)} руб. (${summary.realization.commissionRate.toFixed(1)}%)`);
    console.log(`К выплате: ${summary.realization.totalPayout.toFixed(2)} руб.`);
    console.log(`Продано товаров: ${summary.realization.itemsSold} шт.`);
    console.log(`Средний чек: ${summary.realization.averageOrderValue.toFixed(2)} руб.`);

    console.log('\n💳 ТРАНЗАКЦИИ:');
    console.log(`Всего операций: ${summary.transactions.totalCount}`);
    console.log(`Доходы: ${summary.transactions.totalIncome.toFixed(2)} руб.`);
    console.log(`Расходы: ${summary.transactions.totalExpense.toFixed(2)} руб.`);
    console.log(`Чистый доход: ${summary.transactions.netIncome.toFixed(2)} руб.`);
    console.log(`Маржа прибыли: ${summary.transactions.profitMargin.toFixed(1)}%`);

    console.log('\n🏢 B2B ПРОДАЖИ:');
    console.log(`Количество счетов: ${summary.b2b.invoiceCount}`);
    console.log(`Сумма B2B: ${summary.b2b.totalAmount.toFixed(2)} руб.`);
    console.log(`Доля B2B: ${summary.b2b.shareOfB2B.toFixed(1)}%`);

    console.log('\n📈 КЛЮЧЕВЫЕ ПОКАЗАТЕЛИ:');
    console.log(`ROI: ${summary.kpis.roi.toFixed(1)}%`);
    console.log(`Выручка на операцию: ${summary.kpis.revenuePerTransaction.toFixed(2)} руб.`);
    console.log(`Средняя комиссия за товар: ${summary.kpis.averageCommissionPerItem.toFixed(2)} руб.`);

    if (summary.topProducts.length > 0) {
      console.log('\n🏆 ТОП-5 ТОВАРОВ ПО ПРОДАЖАМ:');
      summary.topProducts.slice(0, 5).forEach((product: any, index: number) => {
        console.log(`${index + 1}. ${product.name} (${product.sku})`);
        console.log(`   Продано: ${product.quantity} шт. на ${product.sales.toFixed(2)} руб.`);
      });
    }
  }

  private async saveFinancialReport(summary: any, month: string): Promise<void> {
    // В реальном приложении здесь была бы логика сохранения отчета
    const fileName = `financial_report_${month}.json`;
    console.log(`\n💾 Отчет сохранен: ${fileName}`);
    
    // Пример сохранения:
    // await fs.writeFile(fileName, JSON.stringify(summary, null, 2));
  }
}
```

#### Система мониторинга транзакций

```typescript
class TransactionMonitoringSystem {
  constructor(private api: OzonSellerAPI) {}

  async monitorDailyTransactions(): Promise<void> {
    console.log('🔍 Мониторинг транзакций за сегодня');

    const today = new Date().toISOString().split('T')[0];
    
    try {
      // Получаем транзакции за сегодня
      const todayTransactions = await this.api.finance.getTransactionList({
        page: 1,
        page_size: 1000,
        filter: {
          date: {
            from: today,
            to: today
          }
        }
      });

      if (!todayTransactions.result?.operations || todayTransactions.result.operations.length === 0) {
        console.log('ℹ️ Транзакций за сегодня не найдено');
        return;
      }

      // Анализируем транзакции
      const analysis = this.analyzeTransactions(todayTransactions.result.operations);
      
      // Проверяем аномалии
      const anomalies = await this.detectAnomalies(analysis);
      
      // Создаем отчет
      this.generateDailyTransactionReport(analysis, anomalies);
      
      // Отправляем уведомления при необходимости
      if (anomalies.length > 0) {
        await this.sendAnomalyAlerts(anomalies);
      }

    } catch (error) {
      console.error('❌ Ошибка мониторинга транзакций:', error);
    }
  }

  private analyzeTransactions(transactions: any[]): any {
    const analysis = {
      totalCount: transactions.length,
      income: { count: 0, total: 0, transactions: [] },
      expense: { count: 0, total: 0, transactions: [] },
      typeBreakdown: new Map(),
      hourlyDistribution: new Map(),
      averageAmount: 0,
      largestTransaction: null,
      suspiciousTransactions: []
    };

    let totalAmount = 0;

    transactions.forEach(transaction => {
      const amount = parseFloat(transaction.amount) || 0;
      const type = transaction.operation_type || 'unknown';
      const time = new Date(transaction.operation_date).getHours();
      
      totalAmount += Math.abs(amount);

      // Доходы и расходы
      if (amount > 0) {
        analysis.income.count++;
        analysis.income.total += amount;
        analysis.income.transactions.push(transaction);
      } else {
        analysis.expense.count++;
        analysis.expense.total += Math.abs(amount);
        analysis.expense.transactions.push(transaction);
      }

      // Разбивка по типам
      if (!analysis.typeBreakdown.has(type)) {
        analysis.typeBreakdown.set(type, { count: 0, total: 0 });
      }
      const typeData = analysis.typeBreakdown.get(type);
      typeData.count++;
      typeData.total += Math.abs(amount);

      // Почасовое распределение
      if (!analysis.hourlyDistribution.has(time)) {
        analysis.hourlyDistribution.set(time, 0);
      }
      analysis.hourlyDistribution.set(time, analysis.hourlyDistribution.get(time) + 1);

      // Самая крупная транзакция
      if (!analysis.largestTransaction || Math.abs(amount) > Math.abs(parseFloat(analysis.largestTransaction.amount))) {
        analysis.largestTransaction = transaction;
      }

      // Подозрительные транзакции (очень крупные)
      if (Math.abs(amount) > 50000) {
        analysis.suspiciousTransactions.push({
          ...transaction,
          reason: 'Large amount'
        });
      }
    });

    analysis.averageAmount = analysis.totalCount > 0 ? totalAmount / analysis.totalCount : 0;
    
    return analysis;
  }

  private async detectAnomalies(analysis: any): Promise<any[]> {
    const anomalies = [];

    // Аномалия 1: Слишком много расходных транзакций
    const expenseRatio = analysis.totalCount > 0 ? analysis.expense.count / analysis.totalCount : 0;
    if (expenseRatio > 0.8) {
      anomalies.push({
        type: 'high_expense_ratio',
        severity: 'medium',
        message: `Высокий процент расходных операций: ${(expenseRatio * 100).toFixed(1)}%`,
        value: expenseRatio
      });
    }

    // Аномалия 2: Очень крупная транзакция
    if (analysis.largestTransaction && Math.abs(parseFloat(analysis.largestTransaction.amount)) > 100000) {
      anomalies.push({
        type: 'large_transaction',
        severity: 'high',
        message: `Обнаружена крупная транзакция: ${analysis.largestTransaction.amount} руб.`,
        transaction: analysis.largestTransaction
      });
    }

    // Аномалия 3: Подозрительно малое количество транзакций
    const currentHour = new Date().getHours();
    if (currentHour > 10 && analysis.totalCount < 5) {
      anomalies.push({
        type: 'low_transaction_count',
        severity: 'low',
        message: `Мало транзакций для времени ${currentHour}:00 - только ${analysis.totalCount}`,
        value: analysis.totalCount
      });
    }

    // Аномалия 4: Нетипичное время активности
    const nightTransactions = Array.from(analysis.hourlyDistribution.entries())
      .filter(([hour, count]) => hour >= 23 || hour <= 5)
      .reduce((sum, [, count]) => sum + count, 0);
      
    if (nightTransactions > analysis.totalCount * 0.3) {
      anomalies.push({
        type: 'unusual_timing',
        severity: 'medium',
        message: `Много ночных транзакций: ${nightTransactions} из ${analysis.totalCount}`,
        value: nightTransactions
      });
    }

    return anomalies;
  }

  private generateDailyTransactionReport(analysis: any, anomalies: any[]): void {
    console.log('\n📊 ЕЖЕДНЕВНЫЙ ОТЧЕТ ПО ТРАНЗАКЦИЯМ');
    console.log('='.repeat(50));
    console.log(`📅 Дата: ${new Date().toLocaleDateString()}`);

    console.log('\n💰 ОБЩАЯ СТАТИСТИКА:');
    console.log(`Всего операций: ${analysis.totalCount}`);
    console.log(`Доходных операций: ${analysis.income.count} (${analysis.income.total.toFixed(2)} руб.)`);
    console.log(`Расходных операций: ${analysis.expense.count} (${analysis.expense.total.toFixed(2)} руб.)`);
    console.log(`Средняя сумма операции: ${analysis.averageAmount.toFixed(2)} руб.`);
    console.log(`Чистый результат: ${(analysis.income.total - analysis.expense.total).toFixed(2)} руб.`);

    console.log('\n📊 РАЗБИВКА ПО ТИПАМ ОПЕРАЦИЙ:');
    Array.from(analysis.typeBreakdown.entries())
      .sort(([,a], [,b]) => b.total - a.total)
      .slice(0, 5)
      .forEach(([type, data]) => {
        console.log(`${type}: ${data.count} операций, ${data.total.toFixed(2)} руб.`);
      });

    if (analysis.largestTransaction) {
      console.log('\n💎 САМАЯ КРУПНАЯ ТРАНЗАКЦИЯ:');
      console.log(`Сумма: ${analysis.largestTransaction.amount} руб.`);
      console.log(`Тип: ${analysis.largestTransaction.operation_type}`);
      console.log(`Время: ${new Date(analysis.largestTransaction.operation_date).toLocaleString()}`);
    }

    if (anomalies.length > 0) {
      console.log('\n⚠️ ОБНАРУЖЕННЫЕ АНОМАЛИИ:');
      anomalies.forEach(anomaly => {
        const emoji = anomaly.severity === 'high' ? '🚨' : 
                     anomaly.severity === 'medium' ? '⚠️' : 'ℹ️';
        console.log(`${emoji} ${anomaly.message}`);
      });
    } else {
      console.log('\n✅ Аномалий не обнаружено');
    }

    // Почасовое распределение
    if (analysis.hourlyDistribution.size > 0) {
      console.log('\n🕐 АКТИВНОСТЬ ПО ЧАСАМ:');
      const sortedHours = Array.from(analysis.hourlyDistribution.entries())
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5);
        
      sortedHours.forEach(([hour, count]) => {
        console.log(`${hour}:00 - ${count} операций`);
      });
    }
  }

  private async sendAnomalyAlerts(anomalies: any[]): Promise<void> {
    const highSeverityAnomalies = anomalies.filter(a => a.severity === 'high');
    
    if (highSeverityAnomalies.length > 0) {
      console.log('\n🚨 КРИТИЧЕСКИЕ АНОМАЛИИ - ТРЕБУЕТСЯ ВНИМАНИЕ!');
      highSeverityAnomalies.forEach(anomaly => {
        console.log(`🚨 ${anomaly.message}`);
      });
      
      // Здесь была бы логика отправки уведомлений:
      // - Email уведомления
      // - Push уведомления
      // - Slack/Telegram боты
      // - SMS для критических случаев
    }
  }

  async generateWeeklyFinancialSummary(): Promise<void> {
    console.log('📈 Еженедельная финансовая сводка');

    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const fromDate = weekAgo.toISOString().split('T')[0];
    const toDate = new Date().toISOString().split('T')[0];

    try {
      // Получаем итоги по транзакциям за неделю
      const weeklyTotals = await this.api.finance.getTransactionTotals({
        filter: {
          date: { from: fromDate, to: toDate }
        }
      });

      // Получаем детализированный список для анализа
      let allWeeklyTransactions = [];
      let page = 1;
      let hasMore = true;

      while (hasMore) {
        const transactions = await this.api.finance.getTransactionList({
          page,
          page_size: 1000,
          filter: {
            date: { from: fromDate, to: toDate }
          }
        });

        if (transactions.result?.operations) {
          allWeeklyTransactions.push(...transactions.result.operations);
          hasMore = transactions.result.operations.length === 1000;
          page++;
        } else {
          hasMore = false;
        }
      }

      // Анализируем тренды
      const weeklyAnalysis = this.analyzeWeeklyTrends(allWeeklyTransactions);
      
      // Создаем сводку
      this.printWeeklySummary(weeklyTotals.result, weeklyAnalysis, fromDate, toDate);

    } catch (error) {
      console.error('❌ Ошибка создания еженедельной сводки:', error);
    }
  }

  private analyzeWeeklyTrends(transactions: any[]): any {
    const dailyStats = new Map();
    const typeGrowth = new Map();

    transactions.forEach(transaction => {
      const date = transaction.operation_date.split('T')[0];
      const amount = parseFloat(transaction.amount) || 0;
      const type = transaction.operation_type;

      // Ежедневная статистика
      if (!dailyStats.has(date)) {
        dailyStats.set(date, { income: 0, expense: 0, count: 0 });
      }
      const dayStat = dailyStats.get(date);
      dayStat.count++;
      if (amount > 0) {
        dayStat.income += amount;
      } else {
        dayStat.expense += Math.abs(amount);
      }

      // Статистика по типам
      if (!typeGrowth.has(type)) {
        typeGrowth.set(type, []);
      }
      typeGrowth.get(type).push({ date, amount: Math.abs(amount) });
    });

    // Вычисляем тренды
    const dailyTotals = Array.from(dailyStats.entries())
      .map(([date, stats]) => ({
        date,
        total: stats.income - stats.expense,
        income: stats.income,
        expense: stats.expense,
        count: stats.count
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

    const trend = this.calculateTrend(dailyTotals.map(d => d.total));

    return {
      dailyTotals,
      trend,
      bestDay: dailyTotals.reduce((best, current) => 
        current.total > best.total ? current : best, dailyTotals[0]),
      worstDay: dailyTotals.reduce((worst, current) => 
        current.total < worst.total ? current : worst, dailyTotals[0])
    };
  }

  private calculateTrend(values: number[]): string {
    if (values.length < 2) return 'недостаточно данных';
    
    const firstHalf = values.slice(0, Math.floor(values.length / 2));
    const secondHalf = values.slice(Math.floor(values.length / 2));
    
    const firstAvg = firstHalf.reduce((sum, v) => sum + v, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((sum, v) => sum + v, 0) / secondHalf.length;
    
    const change = ((secondAvg - firstAvg) / Math.abs(firstAvg)) * 100;
    
    if (change > 10) return '📈 растущий';
    if (change < -10) return '📉 падающий';
    return '➡️ стабильный';
  }

  private printWeeklySummary(totals: any, analysis: any, fromDate: string, toDate: string): void {
    console.log('\n📈 ЕЖЕНЕДЕЛЬНАЯ ФИНАНСОВАЯ СВОДКА');
    console.log('='.repeat(50));
    console.log(`📅 Период: ${fromDate} - ${toDate}`);

    if (totals) {
      console.log('\n💰 ИТОГИ ЗА НЕДЕЛЮ:');
      console.log(`Общая сумма доходов: ${totals.income?.toFixed(2) || 0} руб.`);
      console.log(`Общая сумма расходов: ${totals.expense?.toFixed(2) || 0} руб.`);
      console.log(`Чистый результат: ${(totals.income - totals.expense).toFixed(2)} руб.`);
      console.log(`Количество операций: ${totals.operation_count || 0}`);
    }

    if (analysis.trend) {
      console.log(`\n📊 ТРЕНД: ${analysis.trend}`);
    }

    if (analysis.bestDay && analysis.worstDay) {
      console.log('\n🏆 ЛУЧШИЙ ДЕНЬ:');
      console.log(`${analysis.bestDay.date}: ${analysis.bestDay.total.toFixed(2)} руб. (${analysis.bestDay.count} операций)`);
      
      console.log('\n📉 ХУДШИЙ ДЕНЬ:');
      console.log(`${analysis.worstDay.date}: ${analysis.worstDay.total.toFixed(2)} руб. (${analysis.worstDay.count} операций)`);
    }

    console.log('\n📊 ЕЖЕДНЕВНАЯ ДИНАМИКА:');
    analysis.dailyTotals.forEach((day: any) => {
      const emoji = day.total > 0 ? '📈' : day.total < 0 ? '📉' : '➡️';
      console.log(`${emoji} ${day.date}: ${day.total.toFixed(2)} руб. (${day.count} оп.)`);
    });
  }
}
```

## Обработка ошибок

```typescript
try {
  await api.finance.getTransactionList({
    page: 1,
    page_size: 100,
    filter: { /* ... */ }
  });
} catch (error) {
  if (error.response?.status === 400) {
    console.error('Ошибка валидации параметров запроса:', error.response.data);
  } else if (error.response?.status === 403) {
    console.error('Нет доступа к финансовым данным');
  } else if (error.response?.status === 429) {
    console.error('Превышен лимит запросов к Finance API');
  } else {
    console.error('Неожиданная ошибка:', error.message);
  }
}
```

## Рекомендации по использованию

### 📊 Планирование отчетности
- Создавайте месячные отчеты в первые дни следующего месяца
- Настройте автоматическое создание регулярных отчетов
- Сохраняйте исторические данные для анализа трендов
- Используйте разные языки отчетов для международной отчетности

### 💰 Мониторинг финансов
- Настройте ежедневный мониторинг транзакций
- Отслеживайте аномалии в финансовых операциях
- Анализируйте тренды доходов и расходов
- Контролируйте процент комиссий от оборота

### 🏢 B2B отчетность
- Отдельно отслеживайте продажи юридическим лицам
- Используйте JSON формат для автоматической обработки
- Контролируйте НДС и документооборот
- Интегрируйте с учетными системами предприятия

### 📈 Аналитика и KPI
- Рассчитывайте ROI по периодам
- Анализируйте рентабельность по товарным группам
- Отслеживайте динамику среднего чека
- Мониторьте соотношение доходов к расходам

### 🚀 Автоматизация процессов
- Автоматизируйте создание ежемесячных отчетов
- Настройте уведомления о критических финансовых событиях
- Интегрируйте с системами бухгалтерского учета
- Используйте webhook для получения уведомлений о новых транзакциях

Finance API предоставляет полную картину финансовых операций на OZON, позволяя эффективно управлять денежными потоками и принимать обоснованные бизнес-решения.