# Финансовая отчётность - Financial Reports API

API для получения детальной финансовой отчётности и анализа движения денежных средств на платформе OZON. Обеспечивает полную прозрачность финансовых операций продавца.

---

## 💰 Метод финансовой отчётности

### 1. getFinanceCashFlowStatement()
Получение финансового отчёта движения денежных средств за заданный период с детализацией всех операций.

**Применение**: Анализ финансовых потоков, планирование бюджета, налоговая отчётность.

#### Типизация запроса
```typescript
interface ReportFinancePeriod {
  /** 
   * Начало периода в формате YYYY-MM-DD
   * Period start in YYYY-MM-DD format
   */
  from: string;
  
  /** 
   * Конец периода в формате YYYY-MM-DD
   * Period end in YYYY-MM-DD format
   */
  to: string;
}

interface ReportFinanceCashFlowStatementListRequest {
  /** 
   * Период отчёта
   * Report period
   */
  date: ReportFinancePeriod;
  
  /** 
   * Номер страницы, возвращаемой в запросе
   * Page number returned in request
   */
  page: number;
  
  /** 
   * Количество элементов на странице
   * Number of elements per page
   */
  page_size: number;
  
  /** 
   * true, если нужно добавить дополнительные параметры в ответ
   * true if additional parameters need to be added to response
   */
  with_details?: boolean;
}
```

#### Типизация ответа
```typescript
interface ReportFinanceItem {
  /** 
   * Название операции
   * Operation name
   */
  operation_type?: string;
  
  /** 
   * Дата операции
   * Operation date
   */
  operation_date?: string;
  
  /** 
   * Сумма операции
   * Operation amount
   */
  amount?: number;
  
  /** 
   * Валюта
   * Currency
   */
  currency?: string;
  
  /** 
   * Детали операции
   * Operation details
   */
  details?: Record<string, unknown>;
}

interface ReportFinanceCashFlowResult {
  /** 
   * Список операций
   * Operations list
   */
  operations?: ReportFinanceItem[];
  
  /** 
   * Общее количество операций
   * Total operations count
   */
  total_count?: number;
  
  /** 
   * Итоговая сумма
   * Total amount
   */
  total_amount?: number;
}

interface ReportFinanceCashFlowStatementListResponse {
  /** 
   * Результат отчёта
   * Report result
   */
  result?: ReportFinanceCashFlowResult;
}
```

---

## 🔧 Практические примеры использования

### Базовый пример получения финансового отчёта
```typescript
import { ReportApi } from 'daytona-ozon-seller-api';

const reportApi = new ReportApi(httpClient);

try {
  // Получить финансовый отчёт за январь 2024
  const financialReport = await reportApi.getFinanceCashFlowStatement({
    date: {
      from: '2024-01-01',
      to: '2024-01-31'
    },
    page: 1,
    page_size: 100,
    with_details: true
  });

  if (financialReport.result?.operations) {
    console.log('💰 Финансовый отчёт за январь 2024:');
    console.log(`Всего операций: ${financialReport.result.total_count}`);
    console.log(`Итоговая сумма: ${financialReport.result.total_amount} руб.`);
    
    // Анализ операций
    let income = 0;
    let expenses = 0;
    
    financialReport.result.operations.forEach(operation => {
      console.log(`${operation.operation_date}: ${operation.operation_type}`);
      console.log(`  Сумма: ${operation.amount} ${operation.currency}`);
      
      if (operation.amount && operation.amount > 0) {
        income += operation.amount;
      } else if (operation.amount && operation.amount < 0) {
        expenses += Math.abs(operation.amount);
      }
      
      // Детали операции
      if (operation.details) {
        console.log(`  Детали:`, operation.details);
      }
    });
    
    console.log(`\n📊 Сводка за период:`);
    console.log(`Доходы: ${income} руб.`);
    console.log(`Расходы: ${expenses} руб.`);
    console.log(`Чистая прибыль: ${income - expenses} руб.`);
  }
} catch (error) {
  console.error('❌ Ошибка получения финансового отчёта:', error);
}
```

### Постраничная обработка больших отчётов
```typescript
const getAllFinancialOperations = async (
  from: string, 
  to: string
): Promise<ReportFinanceItem[]> => {
  const allOperations: ReportFinanceItem[] = [];
  let page = 1;
  const pageSize = 500; // Максимальный размер страницы
  
  try {
    while (true) {
      const response = await reportApi.getFinanceCashFlowStatement({
        date: { from, to },
        page,
        page_size: pageSize,
        with_details: true
      });

      if (!response.result?.operations || response.result.operations.length === 0) {
        break; // Больше данных нет
      }

      allOperations.push(...response.result.operations);
      
      console.log(`Загружена страница ${page}, операций: ${response.result.operations.length}`);
      
      // Если получили меньше операций чем запрашивали, значит это последняя страница
      if (response.result.operations.length < pageSize) {
        break;
      }
      
      page++;
      
      // Добавить задержку между запросами для соблюдения лимитов
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log(`✅ Всего загружено операций: ${allOperations.length}`);
    return allOperations;
    
  } catch (error) {
    console.error('❌ Ошибка при постраничной загрузке:', error);
    return allOperations; // Возвращаем частично загруженные данные
  }
};

// Использование для получения всех операций за квартал
const quarterOperations = await getAllFinancialOperations(
  '2024-01-01',
  '2024-03-31'
);
```

---

## 🤖 Автоматизация финансовой отчётности

### Класс FinancialAnalyzer
Автоматизированная система анализа финансовых потоков с расчётом ключевых метрик.

```typescript
interface FinancialMetrics {
  totalIncome: number;
  totalExpenses: number;
  netProfit: number;
  averageOperationAmount: number;
  operationsByType: Record<string, {
    count: number;
    totalAmount: number;
    averageAmount: number;
  }>;
  dailyBreakdown: Record<string, {
    income: number;
    expenses: number;
    netProfit: number;
  }>;
}

interface FinancialPeriodConfig {
  /** Период анализа в днях */
  periodDays: number;
  
  /** Размер страницы для загрузки */
  pageSize: number;
  
  /** Включать детали операций */
  includeDetails: boolean;
  
  /** Валюта для анализа */
  currency: string;
}

class FinancialAnalyzer {
  private reportApi: ReportApi;
  private config: FinancialPeriodConfig;

  constructor(reportApi: ReportApi, config: FinancialPeriodConfig) {
    this.reportApi = reportApi;
    this.config = config;
  }

  /**
   * Комплексный анализ финансовых показателей
   */
  async analyzeFinancialPeriod(
    startDate: string,
    endDate: string
  ): Promise<FinancialMetrics> {
    try {
      const operations = await this.getAllOperations(startDate, endDate);
      return this.calculateMetrics(operations);
    } catch (error) {
      console.error('❌ Ошибка анализа финансов:', error);
      throw error;
    }
  }

  /**
   * Получение всех операций за период
   */
  private async getAllOperations(
    from: string,
    to: string
  ): Promise<ReportFinanceItem[]> {
    const operations: ReportFinanceItem[] = [];
    let page = 1;
    
    while (true) {
      const response = await this.reportApi.getFinanceCashFlowStatement({
        date: { from, to },
        page,
        page_size: this.config.pageSize,
        with_details: this.config.includeDetails
      });

      if (!response.result?.operations?.length) break;
      
      operations.push(...response.result.operations);
      
      if (response.result.operations.length < this.config.pageSize) break;
      page++;
      
      // Соблюдение лимитов API
      await this.delay(500);
    }
    
    return operations;
  }

  /**
   * Расчёт финансовых метрик
   */
  private calculateMetrics(operations: ReportFinanceItem[]): FinancialMetrics {
    const metrics: FinancialMetrics = {
      totalIncome: 0,
      totalExpenses: 0,
      netProfit: 0,
      averageOperationAmount: 0,
      operationsByType: {},
      dailyBreakdown: {}
    };

    operations.forEach(operation => {
      if (!operation.amount || !operation.operation_type) return;

      const amount = operation.amount;
      const type = operation.operation_type;
      const date = operation.operation_date?.split('T')[0] || '';

      // Общие метрики
      if (amount > 0) {
        metrics.totalIncome += amount;
      } else {
        metrics.totalExpenses += Math.abs(amount);
      }

      // Анализ по типам операций
      if (!metrics.operationsByType[type]) {
        metrics.operationsByType[type] = {
          count: 0,
          totalAmount: 0,
          averageAmount: 0
        };
      }

      const typeStats = metrics.operationsByType[type];
      typeStats.count += 1;
      typeStats.totalAmount += amount;
      typeStats.averageAmount = typeStats.totalAmount / typeStats.count;

      // Ежедневная разбивка
      if (date && !metrics.dailyBreakdown[date]) {
        metrics.dailyBreakdown[date] = {
          income: 0,
          expenses: 0,
          netProfit: 0
        };
      }

      if (date) {
        const dailyStats = metrics.dailyBreakdown[date];
        if (amount > 0) {
          dailyStats.income += amount;
        } else {
          dailyStats.expenses += Math.abs(amount);
        }
        dailyStats.netProfit = dailyStats.income - dailyStats.expenses;
      }
    });

    // Финальные расчёты
    metrics.netProfit = metrics.totalIncome - metrics.totalExpenses;
    metrics.averageOperationAmount = operations.length > 0 
      ? (metrics.totalIncome + metrics.totalExpenses) / operations.length 
      : 0;

    return metrics;
  }

  /**
   * Генерация отчёта с рекомендациями
   */
  async generateFinancialReport(
    startDate: string,
    endDate: string
  ): Promise<string> {
    const metrics = await this.analyzeFinancialPeriod(startDate, endDate);
    
    let report = '📊 ФИНАНСОВЫЙ ОТЧЁТ\n\n';
    report += `Период: ${startDate} - ${endDate}\n\n`;
    
    // Основные показатели
    report += '💰 ОСНОВНЫЕ ПОКАЗАТЕЛИ:\n';
    report += `Доходы: ${metrics.totalIncome.toLocaleString('ru')} руб.\n`;
    report += `Расходы: ${metrics.totalExpenses.toLocaleString('ru')} руб.\n`;
    report += `Чистая прибыль: ${metrics.netProfit.toLocaleString('ru')} руб.\n`;
    report += `Средняя операция: ${metrics.averageOperationAmount.toLocaleString('ru')} руб.\n\n`;

    // Анализ по типам операций
    report += '📋 АНАЛИЗ ПО ТИПАМ ОПЕРАЦИЙ:\n';
    Object.entries(metrics.operationsByType)
      .sort(([,a], [,b]) => Math.abs(b.totalAmount) - Math.abs(a.totalAmount))
      .slice(0, 10) // Топ 10 типов операций
      .forEach(([type, stats]) => {
        report += `${type}: ${stats.count} операций, `;
        report += `${stats.totalAmount.toLocaleString('ru')} руб. `;
        report += `(среднее: ${stats.averageAmount.toLocaleString('ru')} руб.)\n`;
      });

    // Рекомендации
    report += '\n💡 РЕКОМЕНДАЦИИ:\n';
    
    if (metrics.netProfit < 0) {
      report += '⚠️ Отрицательная рентабельность - необходим анализ затрат\n';
    } else if (metrics.netProfit > 0) {
      report += '✅ Положительная рентабельность - хорошая динамика\n';
    }
    
    const profitability = (metrics.netProfit / metrics.totalIncome) * 100;
    report += `📈 Рентабельность: ${profitability.toFixed(2)}%\n`;

    return report;
  }

  /**
   * Сравнительный анализ периодов
   */
  async comparePeriodsAnalysis(
    currentStart: string,
    currentEnd: string,
    previousStart: string,
    previousEnd: string
  ): Promise<{
    current: FinancialMetrics;
    previous: FinancialMetrics;
    comparison: {
      incomeGrowth: number;
      expenseGrowth: number;
      profitGrowth: number;
      trends: string[];
    };
  }> {
    const [current, previous] = await Promise.all([
      this.analyzeFinancialPeriod(currentStart, currentEnd),
      this.analyzeFinancialPeriod(previousStart, previousEnd)
    ]);

    const comparison = {
      incomeGrowth: ((current.totalIncome - previous.totalIncome) / previous.totalIncome) * 100,
      expenseGrowth: ((current.totalExpenses - previous.totalExpenses) / previous.totalExpenses) * 100,
      profitGrowth: ((current.netProfit - previous.netProfit) / Math.abs(previous.netProfit)) * 100,
      trends: [] as string[]
    };

    // Анализ трендов
    if (comparison.incomeGrowth > 10) {
      comparison.trends.push('Значительный рост доходов');
    } else if (comparison.incomeGrowth < -10) {
      comparison.trends.push('Снижение доходов');
    }

    if (comparison.expenseGrowth > 15) {
      comparison.trends.push('Рост расходов выше нормы');
    }

    if (comparison.profitGrowth > 20) {
      comparison.trends.push('Отличная динамика прибыли');
    } else if (comparison.profitGrowth < -20) {
      comparison.trends.push('Ухудшение прибыльности');
    }

    return { current, previous, comparison };
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

### Пример использования аналитики
```typescript
const analyzer = new FinancialAnalyzer(reportApi, {
  periodDays: 31,
  pageSize: 500,
  includeDetails: true,
  currency: 'RUB'
});

// Анализ текущего месяца
const report = await analyzer.generateFinancialReport(
  '2024-02-01',
  '2024-02-29'
);
console.log(report);

// Сравнительный анализ с предыдущим месяцем
const comparison = await analyzer.comparePeriodsAnalysis(
  '2024-02-01', '2024-02-29', // Текущий период
  '2024-01-01', '2024-01-31'  // Предыдущий период
);

console.log('📈 Сравнительный анализ:');
console.log(`Рост доходов: ${comparison.comparison.incomeGrowth.toFixed(2)}%`);
console.log(`Рост расходов: ${comparison.comparison.expenseGrowth.toFixed(2)}%`);
console.log(`Рост прибыли: ${comparison.comparison.profitGrowth.toFixed(2)}%`);
comparison.comparison.trends.forEach(trend => console.log(`• ${trend}`));
```

---

## 📈 Особенности финансовой отчётности OZON

### Структура финансовых операций
- **Продажи товаров**: Основной источник дохода
- **Комиссии OZON**: Платформенные сборы
- **Логистические расходы**: Доставка и хранение
- **Маркетинговые расходы**: Реклама и продвижение
- **Возвраты и компенсации**: Корректировки по возвратам

### Периодичность отчётов
- **Фиксированные периоды**: 1-15 и 16-31 число каждого месяца
- **Автоматическое закрытие**: Отчёты формируются автоматически
- **Задержки обработки**: Финальные данные доступны с задержкой 1-2 дня
- **Корректировки**: Возможны корректировки в последующих периодах

### Валютные операции
- **Основная валюта**: Российский рубль (RUB)
- **Курсовые разности**: Автоматический пересчёт для международных операций
- **НДС и налоги**: Включение налоговых компонентов в отчётность

---

## 💡 Лучшие практики

### Регулярный мониторинг
```typescript
// Ежедневная проверка новых финансовых операций
const dailyFinanceCheck = async () => {
  const today = new Date();
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
  
  const dateStr = yesterday.toISOString().split('T')[0];
  
  const dailyReport = await reportApi.getFinanceCashFlowStatement({
    date: { from: dateStr, to: dateStr },
    page: 1,
    page_size: 100
  });

  if (dailyReport.result?.operations?.length) {
    console.log(`💰 За ${dateStr} выполнено ${dailyReport.result.operations.length} операций`);
    console.log(`Общая сумма: ${dailyReport.result.total_amount} руб.`);
  }
};

// Запуск ежедневной проверки
setInterval(dailyFinanceCheck, 24 * 60 * 60 * 1000);
```

### Интеграция с учётными системами
- **1С интеграция**: Автоматический импорт финансовых данных
- **Excel отчёты**: Экспорт в табличные форматы для анализа
- **API интеграция**: Подключение к внешним аналитическим системам
- **Налоговая отчётность**: Подготовка данных для налоговых деклараций