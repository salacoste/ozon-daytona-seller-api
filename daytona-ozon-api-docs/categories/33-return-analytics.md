# Аналитика возвратов - Returns Analytics API

API для получения детальной аналитики по возвратам товаров в схеме FBS. Обеспечивает полную прозрачность финансовых показателей возвратов с разбивкой по дням.

---

## 📊 Метод аналитики возвратов

### 1. getReturnsCompanyFbsInfo()
Получение информации о количестве и суммах возвратов FBS с детализацией по дням.

**Применение**: Анализ динамики возвратов, планирование операционных ресурсов, оценка финансового воздействия возвратов.

#### Типизация запроса
```typescript
type DateString = string; // ISO 8601 format: YYYY-MM-DDTHH:mm:ssZ

interface ReturnsCompanyFbsInfoRequest {
  /** Дата начала периода */
  date_from?: DateString;
  
  /** Дата окончания периода */
  date_to?: DateString;
}
```

#### Типизация ответа
```typescript
type CurrencyCode = 'RUB' | 'USD' | 'EUR' | 'CNY';

interface ReturnsCompanyFbsInfoResponseItem {
  /** Дата */
  date?: DateString;
  
  /** Количество возвратов */
  count?: number;
  
  /** Общая сумма возвратов */
  amount?: string;
  
  /** Валюта */
  currency_code?: CurrencyCode;
}

interface ReturnsCompanyFbsInfoResponse {
  /** Информация о возвратах FBS по дням */
  returns_info?: ReturnsCompanyFbsInfoResponseItem[];
}
```

---

## 🔧 Практические примеры использования

### Базовый пример получения аналитики возвратов
```typescript
import { ReturnApi } from 'daytona-ozon-seller-api';

const returnApi = new ReturnApi(httpClient);

try {
  // Получить аналитику возвратов за последний месяц
  const endDate = new Date();
  const startDate = new Date();
  startDate.setMonth(endDate.getMonth() - 1);

  const fbsAnalytics = await returnApi.getReturnsCompanyFbsInfo({
    date_from: startDate.toISOString(),
    date_to: endDate.toISOString()
  });

  if (fbsAnalytics.returns_info && fbsAnalytics.returns_info.length > 0) {
    console.log('📊 Аналитика возвратов FBS за последний месяц:');
    
    let totalReturns = 0;
    let totalAmount = 0;
    const currencyGroups: Record<string, { count: number; amount: number }> = {};
    
    fbsAnalytics.returns_info.forEach(info => {
      const date = info.date?.split('T')[0] || 'N/A';
      const count = info.count || 0;
      const amount = parseFloat(info.amount || '0');
      const currency = info.currency_code || 'RUB';
      
      console.log(`📅 ${date}: ${count} возвратов на сумму ${amount.toLocaleString('ru')} ${currency}`);
      
      totalReturns += count;
      
      // Группировка по валютам
      if (!currencyGroups[currency]) {
        currencyGroups[currency] = { count: 0, amount: 0 };
      }
      currencyGroups[currency].count += count;
      currencyGroups[currency].amount += amount;
    });
    
    console.log(`\n📈 Итоговая статистика:`);
    console.log(`Всего возвратов: ${totalReturns}`);
    
    Object.entries(currencyGroups).forEach(([currency, data]) => {
      console.log(`${currency}: ${data.count} возвратов на ${data.amount.toLocaleString('ru')} ${currency}`);
    });
    
    // Средние показатели
    const avgReturnsPerDay = totalReturns / fbsAnalytics.returns_info.length;
    console.log(`Среднее количество возвратов в день: ${avgReturnsPerDay.toFixed(1)}`);
    
  } else {
    console.log('📭 За указанный период возвратов не найдено');
  }
  
} catch (error) {
  console.error('❌ Ошибка получения аналитики возвратов:', error);
}
```

### Сравнительный анализ периодов
```typescript
const compareReturnsPeriods = async (
  currentStart: string,
  currentEnd: string,
  previousStart: string,
  previousEnd: string
): Promise<void> => {
  try {
    console.log('🔄 Выполнение сравнительного анализа возвратов...');
    
    const [currentPeriod, previousPeriod] = await Promise.all([
      returnApi.getReturnsCompanyFbsInfo({
        date_from: currentStart,
        date_to: currentEnd
      }),
      returnApi.getReturnsCompanyFbsInfo({
        date_from: previousStart,
        date_to: previousEnd
      })
    ]);
    
    const calculateTotals = (data: ReturnsCompanyFbsInfoResponseItem[]) => {
      return data.reduce((acc, item) => {
        acc.count += item.count || 0;
        acc.amount += parseFloat(item.amount || '0');
        return acc;
      }, { count: 0, amount: 0 });
    };
    
    const currentTotals = calculateTotals(currentPeriod.returns_info || []);
    const previousTotals = calculateTotals(previousPeriod.returns_info || []);
    
    const countChange = previousTotals.count > 0 
      ? ((currentTotals.count - previousTotals.count) / previousTotals.count) * 100 
      : 0;
      
    const amountChange = previousTotals.amount > 0 
      ? ((currentTotals.amount - previousTotals.amount) / previousTotals.amount) * 100 
      : 0;
    
    console.log('\n📊 СРАВНИТЕЛЬНЫЙ АНАЛИЗ ВОЗВРАТОВ:');
    console.log(`Текущий период: ${currentStart.split('T')[0]} - ${currentEnd.split('T')[0]}`);
    console.log(`Предыдущий период: ${previousStart.split('T')[0]} - ${previousEnd.split('T')[0]}\n`);
    
    console.log(`Количество возвратов:`);
    console.log(`  Текущий период: ${currentTotals.count}`);
    console.log(`  Предыдущий период: ${previousTotals.count}`);
    console.log(`  Изменение: ${countChange > 0 ? '+' : ''}${countChange.toFixed(1)}%\n`);
    
    console.log(`Сумма возвратов:`);
    console.log(`  Текущий период: ${currentTotals.amount.toLocaleString('ru')} руб.`);
    console.log(`  Предыдущий период: ${previousTotals.amount.toLocaleString('ru')} руб.`);
    console.log(`  Изменение: ${amountChange > 0 ? '+' : ''}${amountChange.toFixed(1)}%\n`);
    
    // Анализ трендов
    console.log('💡 Анализ трендов:');
    
    if (countChange > 20) {
      console.log('⚠️ Значительный рост количества возвратов - требует внимания');
    } else if (countChange < -20) {
      console.log('✅ Существенное снижение возвратов - положительная динамика');
    } else {
      console.log('➖ Стабильное количество возвратов');
    }
    
    if (amountChange > 25) {
      console.log('🚨 Критический рост суммы возвратов - необходимы меры');
    } else if (amountChange < -25) {
      console.log('🎉 Значительное снижение суммы возвратов');
    }
    
  } catch (error) {
    console.error('❌ Ошибка сравнительного анализа:', error);
  }
};

// Сравнение текущего и предыдущего месяца
const now = new Date();
const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
const currentMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
const previousMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
const previousMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

compareReturnsPeriods(
  currentMonthStart.toISOString(),
  currentMonthEnd.toISOString(),
  previousMonthStart.toISOString(),
  previousMonthEnd.toISOString()
);
```

### Детальная аналитика с трендами
```typescript
const detailedReturnsAnalysis = async (
  startDate: string,
  endDate: string
): Promise<void> => {
  try {
    const analytics = await returnApi.getReturnsCompanyFbsInfo({
      date_from: startDate,
      date_to: endDate
    });

    if (!analytics.returns_info || analytics.returns_info.length === 0) {
      console.log('📭 Нет данных за указанный период');
      return;
    }

    console.log('🔍 ДЕТАЛЬНАЯ АНАЛИТИКА ВОЗВРАТОВ FBS\n');

    // Сортировка по дате
    const sortedData = analytics.returns_info
      .filter(item => item.date && item.count && item.amount)
      .sort((a, b) => new Date(a.date!).getTime() - new Date(b.date!).getTime());

    if (sortedData.length === 0) {
      console.log('📭 Нет корректных данных за период');
      return;
    }

    // Основная статистика
    const totalCount = sortedData.reduce((sum, item) => sum + (item.count || 0), 0);
    const totalAmount = sortedData.reduce((sum, item) => sum + parseFloat(item.amount || '0'), 0);
    const avgPerDay = totalCount / sortedData.length;
    const avgAmountPerReturn = totalAmount / totalCount;

    console.log('📊 Основные показатели:');
    console.log(`Период: ${sortedData[0].date?.split('T')[0]} - ${sortedData[sortedData.length - 1].date?.split('T')[0]}`);
    console.log(`Общее количество возвратов: ${totalCount}`);
    console.log(`Общая сумма возвратов: ${totalAmount.toLocaleString('ru')} руб.`);
    console.log(`Среднее количество в день: ${avgPerDay.toFixed(1)}`);
    console.log(`Средняя стоимость возврата: ${avgAmountPerReturn.toLocaleString('ru')} руб.\n`);

    // Анализ трендов
    console.log('📈 Анализ трендов:');
    
    // Найти пиковые дни
    const maxCountDay = sortedData.reduce((max, current) => 
      (current.count || 0) > (max.count || 0) ? current : max
    );
    
    const maxAmountDay = sortedData.reduce((max, current) => 
      parseFloat(current.amount || '0') > parseFloat(max.amount || '0') ? current : max
    );

    console.log(`День с максимальным количеством возвратов: ${maxCountDay.date?.split('T')[0]} (${maxCountDay.count} возвратов)`);
    console.log(`День с максимальной суммой возвратов: ${maxAmountDay.date?.split('T')[0]} (${parseFloat(maxAmountDay.amount || '0').toLocaleString('ru')} руб.)\n`);

    // Анализ по дням недели
    const dayOfWeekStats: Record<string, { count: number; amount: number; days: number }> = {};
    const weekdays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

    sortedData.forEach(item => {
      const date = new Date(item.date!);
      const dayOfWeek = weekdays[date.getDay()];
      
      if (!dayOfWeekStats[dayOfWeek]) {
        dayOfWeekStats[dayOfWeek] = { count: 0, amount: 0, days: 0 };
      }
      
      dayOfWeekStats[dayOfWeek].count += item.count || 0;
      dayOfWeekStats[dayOfWeek].amount += parseFloat(item.amount || '0');
      dayOfWeekStats[dayOfWeek].days += 1;
    });

    console.log('📅 Статистика по дням недели:');
    Object.entries(dayOfWeekStats).forEach(([day, stats]) => {
      const avgCount = stats.count / stats.days;
      const avgAmount = stats.amount / stats.days;
      console.log(`${day}: среднее ${avgCount.toFixed(1)} возвратов, ${avgAmount.toLocaleString('ru')} руб. в день`);
    });

    // Анализ волатильности
    const dailyCounts = sortedData.map(item => item.count || 0);
    const mean = dailyCounts.reduce((sum, count) => sum + count, 0) / dailyCounts.length;
    const variance = dailyCounts.reduce((sum, count) => sum + Math.pow(count - mean, 2), 0) / dailyCounts.length;
    const standardDeviation = Math.sqrt(variance);
    const volatility = (standardDeviation / mean) * 100;

    console.log(`\n📊 Показатели волатильности:`);
    console.log(`Стандартное отклонение: ${standardDeviation.toFixed(2)}`);
    console.log(`Коэффициент вариации: ${volatility.toFixed(1)}%`);
    
    if (volatility > 50) {
      console.log('⚠️ Высокая волатильность возвратов - нестабильные показатели');
    } else if (volatility < 20) {
      console.log('✅ Низкая волатильность - стабильные показатели возвратов');
    } else {
      console.log('➖ Умеренная волатильность возвратов');
    }

    // Рекомендации
    console.log('\n💡 Рекомендации:');
    
    if (avgPerDay > 10) {
      console.log('• Высокий уровень возвратов - рекомендуется анализ причин');
    }
    
    if (avgAmountPerReturn > 2000) {
      console.log('• Высокая средняя стоимость возврата - фокус на дорогие товары');
    }
    
    if (volatility > 40) {
      console.log('• Нестабильность показателей - необходим мониторинг факторов влияния');
    }
    
  } catch (error) {
    console.error('❌ Ошибка детальной аналитики:', error);
  }
};

// Анализ за последние 30 дней
const thirtyDaysAgo = new Date();
thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

detailedReturnsAnalysis(
  thirtyDaysAgo.toISOString(),
  new Date().toISOString()
);
```

---

## 🤖 Автоматизация аналитики возвратов

### Класс ReturnsAnalytics
Автоматизированная система анализа возвратов с расчётом KPI и прогнозированием.

```typescript
interface AnalyticsConfig {
  /** Количество дней для анализа трендов */
  trendAnalysisDays: number;
  
  /** Пороговые значения для алертов */
  alertThresholds: {
    dailyReturnsCount: number;
    dailyReturnsAmount: number;
    volatilityPercent: number;
    growthPercent: number;
  };
  
  /** Валюта для анализа */
  defaultCurrency: CurrencyCode;
  
  /** Интервал автоматического анализа в миллисекундах */
  autoAnalysisInterval: number;
}

interface ReturnsTrend {
  period: string;
  count: number;
  amount: number;
  avgPerDay: number;
  volatility: number;
  trend: 'GROWING' | 'DECLINING' | 'STABLE';
}

interface ReturnsAlert {
  type: 'HIGH_COUNT' | 'HIGH_AMOUNT' | 'HIGH_VOLATILITY' | 'TREND_CHANGE';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  message: string;
  value: number;
  threshold: number;
  date: string;
}

class ReturnsAnalytics {
  private returnApi: ReturnApi;
  private config: AnalyticsConfig;
  private alerts: ReturnsAlert[] = [];
  private analyticsInterval?: NodeJS.Timeout;

  constructor(returnApi: ReturnApi, config: AnalyticsConfig) {
    this.returnApi = returnApi;
    this.config = config;
  }

  /**
   * Запуск автоматической аналитики
   */
  startAutoAnalysis(): void {
    if (this.analyticsInterval) {
      this.stopAutoAnalysis();
    }

    this.analyticsInterval = setInterval(() => {
      this.performDailyAnalysis();
    }, this.config.autoAnalysisInterval);

    console.log('📊 Автоматическая аналитика возвратов запущена');
  }

  /**
   * Остановка автоматической аналитики
   */
  stopAutoAnalysis(): void {
    if (this.analyticsInterval) {
      clearInterval(this.analyticsInterval);
      this.analyticsInterval = undefined;
      console.log('⏹️ Автоматическая аналитика остановлена');
    }
  }

  /**
   * Ежедневный анализ возвратов
   */
  private async performDailyAnalysis(): Promise<void> {
    try {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      yesterday.setHours(0, 0, 0, 0);
      
      const dayEnd = new Date(yesterday);
      dayEnd.setHours(23, 59, 59, 999);

      const analytics = await this.returnApi.getReturnsCompanyFbsInfo({
        date_from: yesterday.toISOString(),
        date_to: dayEnd.toISOString()
      });

      if (analytics.returns_info && analytics.returns_info.length > 0) {
        const dayData = analytics.returns_info[0];
        await this.checkAlerts(dayData, yesterday.toISOString().split('T')[0]);
      }
      
    } catch (error) {
      console.error('❌ Ошибка ежедневного анализа:', error);
    }
  }

  /**
   * Проверка условий для алертов
   */
  private async checkAlerts(
    dayData: ReturnsCompanyFbsInfoResponseItem,
    date: string
  ): Promise<void> {
    const count = dayData.count || 0;
    const amount = parseFloat(dayData.amount || '0');

    // Алерт по количеству возвратов
    if (count > this.config.alertThresholds.dailyReturnsCount) {
      this.addAlert({
        type: 'HIGH_COUNT',
        severity: count > this.config.alertThresholds.dailyReturnsCount * 2 ? 'CRITICAL' : 'HIGH',
        message: `Высокое количество возвратов за день: ${count}`,
        value: count,
        threshold: this.config.alertThresholds.dailyReturnsCount,
        date
      });
    }

    // Алерт по сумме возвратов
    if (amount > this.config.alertThresholds.dailyReturnsAmount) {
      this.addAlert({
        type: 'HIGH_AMOUNT',
        severity: amount > this.config.alertThresholds.dailyReturnsAmount * 2 ? 'CRITICAL' : 'HIGH',
        message: `Высокая сумма возвратов за день: ${amount.toLocaleString('ru')} руб.`,
        value: amount,
        threshold: this.config.alertThresholds.dailyReturnsAmount,
        date
      });
    }
  }

  /**
   * Добавление алерта
   */
  private addAlert(alert: ReturnsAlert): void {
    this.alerts.push(alert);
    
    // Ограничить количество алертов
    if (this.alerts.length > 100) {
      this.alerts = this.alerts.slice(-100);
    }

    console.log(`🚨 [${alert.severity}] ${alert.message}`);
  }

  /**
   * Анализ трендов за период
   */
  async analyzeTrends(days: number = 30): Promise<ReturnsTrend> {
    try {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - days);

      const analytics = await this.returnApi.getReturnsCompanyFbsInfo({
        date_from: startDate.toISOString(),
        date_to: endDate.toISOString()
      });

      if (!analytics.returns_info || analytics.returns_info.length === 0) {
        throw new Error('Нет данных для анализа трендов');
      }

      const data = analytics.returns_info.filter(item => item.count && item.amount);
      const totalCount = data.reduce((sum, item) => sum + (item.count || 0), 0);
      const totalAmount = data.reduce((sum, item) => sum + parseFloat(item.amount || '0'), 0);
      const avgPerDay = totalCount / data.length;

      // Расчёт волатильности
      const dailyCounts = data.map(item => item.count || 0);
      const mean = dailyCounts.reduce((sum, count) => sum + count, 0) / dailyCounts.length;
      const variance = dailyCounts.reduce((sum, count) => sum + Math.pow(count - mean, 2), 0) / dailyCounts.length;
      const volatility = (Math.sqrt(variance) / mean) * 100;

      // Определение тренда
      const firstHalf = data.slice(0, Math.floor(data.length / 2));
      const secondHalf = data.slice(Math.floor(data.length / 2));
      
      const firstHalfAvg = firstHalf.reduce((sum, item) => sum + (item.count || 0), 0) / firstHalf.length;
      const secondHalfAvg = secondHalf.reduce((sum, item) => sum + (item.count || 0), 0) / secondHalf.length;
      
      const change = ((secondHalfAvg - firstHalfAvg) / firstHalfAvg) * 100;
      
      let trend: 'GROWING' | 'DECLINING' | 'STABLE' = 'STABLE';
      if (Math.abs(change) > this.config.alertThresholds.growthPercent) {
        trend = change > 0 ? 'GROWING' : 'DECLINING';
      }

      return {
        period: `${days} дней`,
        count: totalCount,
        amount: totalAmount,
        avgPerDay,
        volatility,
        trend
      };
      
    } catch (error) {
      console.error('❌ Ошибка анализа трендов:', error);
      throw error;
    }
  }

  /**
   * Прогнозирование возвратов
   */
  async forecastReturns(forecastDays: number = 7): Promise<{
    dailyForecast: Array<{ date: string; expectedCount: number; expectedAmount: number }>;
    confidence: number;
    methodology: string;
  }> {
    try {
      // Получить исторические данные за последние 30 дней
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - 30);

      const analytics = await this.returnApi.getReturnsCompanyFbsInfo({
        date_from: startDate.toISOString(),
        date_to: endDate.toISOString()
      });

      if (!analytics.returns_info || analytics.returns_info.length < 7) {
        throw new Error('Недостаточно исторических данных для прогнозирования');
      }

      const historicalData = analytics.returns_info
        .filter(item => item.count && item.amount)
        .sort((a, b) => new Date(a.date!).getTime() - new Date(b.date!).getTime());

      // Простой прогноз на основе скользящего среднего
      const windowSize = Math.min(7, historicalData.length);
      const recentData = historicalData.slice(-windowSize);
      
      const avgCount = recentData.reduce((sum, item) => sum + (item.count || 0), 0) / recentData.length;
      const avgAmount = recentData.reduce((sum, item) => sum + parseFloat(item.amount || '0'), 0) / recentData.length;

      // Учёт тренда
      const trend = await this.analyzeTrends(14);
      const trendMultiplier = trend.trend === 'GROWING' ? 1.05 : trend.trend === 'DECLINING' ? 0.95 : 1.0;

      const dailyForecast = [];
      for (let i = 1; i <= forecastDays; i++) {
        const forecastDate = new Date(endDate);
        forecastDate.setDate(endDate.getDate() + i);
        
        // Простая модель с учётом тренда и сезонности (день недели)
        const dayOfWeek = forecastDate.getDay();
        const weekendMultiplier = (dayOfWeek === 0 || dayOfWeek === 6) ? 0.8 : 1.0; // Меньше возвратов в выходные
        
        dailyForecast.push({
          date: forecastDate.toISOString().split('T')[0],
          expectedCount: Math.round(avgCount * trendMultiplier * weekendMultiplier),
          expectedAmount: Math.round(avgAmount * trendMultiplier * weekendMultiplier)
        });
      }

      // Расчёт доверительного интервала (упрощённый)
      const confidence = Math.min(90, 50 + (historicalData.length * 2)); // Больше данных = больше уверенности

      return {
        dailyForecast,
        confidence,
        methodology: `Скользящее среднее за ${windowSize} дней с учётом тренда и сезонности`
      };
      
    } catch (error) {
      console.error('❌ Ошибка прогнозирования:', error);
      throw error;
    }
  }

  /**
   * Генерация сводного отчёта
   */
  async generateSummaryReport(days: number = 30): Promise<string> {
    try {
      const trend = await this.analyzeTrends(days);
      const forecast = await this.forecastReturns(7);
      
      let report = '📊 СВОДНЫЙ ОТЧЁТ ПО ВОЗВРАТАМ FBS\n\n';
      
      report += `📅 Период анализа: ${trend.period}\n`;
      report += `📦 Общее количество возвратов: ${trend.count}\n`;
      report += `💰 Общая сумма возвратов: ${trend.amount.toLocaleString('ru')} руб.\n`;
      report += `📈 Среднее в день: ${trend.avgPerDay.toFixed(1)} возвратов\n`;
      report += `📊 Волатильность: ${trend.volatility.toFixed(1)}%\n`;
      
      const trendEmoji = {
        'GROWING': '📈',
        'DECLINING': '📉',
        'STABLE': '➖'
      }[trend.trend];
      
      report += `${trendEmoji} Тренд: ${trend.trend === 'GROWING' ? 'Рост' : trend.trend === 'DECLINING' ? 'Снижение' : 'Стабильность'}\n\n`;
      
      // Прогноз
      report += '🔮 ПРОГНОЗ НА НЕДЕЛЮ:\n';
      report += `Методология: ${forecast.methodology}\n`;
      report += `Доверительный интервал: ${forecast.confidence}%\n\n`;
      
      forecast.dailyForecast.forEach(day => {
        report += `${day.date}: ~${day.expectedCount} возвратов, ~${day.expectedAmount.toLocaleString('ru')} руб.\n`;
      });
      
      // Алерты
      const recentAlerts = this.alerts.slice(-5);
      if (recentAlerts.length > 0) {
        report += '\n🚨 ПОСЛЕДНИЕ АЛЕРТЫ:\n';
        recentAlerts.forEach(alert => {
          const severityEmoji = {
            'LOW': '🟡',
            'MEDIUM': '🟠',
            'HIGH': '🔴',
            'CRITICAL': '🚨'
          }[alert.severity];
          
          report += `${severityEmoji} ${alert.date}: ${alert.message}\n`;
        });
      }
      
      // Рекомендации
      report += '\n💡 РЕКОМЕНДАЦИИ:\n';
      
      if (trend.trend === 'GROWING') {
        report += '• Растущий тренд возвратов - необходим анализ причин\n';
      }
      
      if (trend.volatility > 50) {
        report += '• Высокая волатильность - рекомендуется стабилизация процессов\n';
      }
      
      if (trend.avgPerDay > 20) {
        report += '• Высокий уровень возвратов - фокус на качестве товаров\n';
      }
      
      const totalWeeklyForecast = forecast.dailyForecast.reduce((sum, day) => sum + day.expectedCount, 0);
      if (totalWeeklyForecast > trend.avgPerDay * 7 * 1.2) {
        report += '• Ожидается рост возвратов - подготовить дополнительные ресурсы\n';
      }
      
      return report;
      
    } catch (error) {
      console.error('❌ Ошибка генерации отчёта:', error);
      throw error;
    }
  }

  /**
   * Получение активных алертов
   */
  getActiveAlerts(severity?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'): ReturnsAlert[] {
    return this.alerts.filter(alert => 
      !severity || alert.severity === severity
    );
  }

  /**
   * Очистка старых алертов
   */
  clearOldAlerts(daysOld: number = 30): number {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);
    const cutoffString = cutoffDate.toISOString().split('T')[0];
    
    const initialCount = this.alerts.length;
    this.alerts = this.alerts.filter(alert => alert.date >= cutoffString);
    
    const cleaned = initialCount - this.alerts.length;
    if (cleaned > 0) {
      console.log(`🧹 Очищено ${cleaned} старых алертов`);
    }
    
    return cleaned;
  }
}
```

### Пример использования ReturnsAnalytics
```typescript
const returnsAnalytics = new ReturnsAnalytics(returnApi, {
  trendAnalysisDays: 30,
  alertThresholds: {
    dailyReturnsCount: 15,
    dailyReturnsAmount: 10000,
    volatilityPercent: 40,
    growthPercent: 20
  },
  defaultCurrency: 'RUB',
  autoAnalysisInterval: 24 * 60 * 60 * 1000 // Каждые 24 часа
});

// Запуск автоматической аналитики
returnsAnalytics.startAutoAnalysis();

// Анализ трендов
const trends = await returnsAnalytics.analyzeTrends(30);
console.log('📈 Тренд возвратов:', trends);

// Прогнозирование
const forecast = await returnsAnalytics.forecastReturns(7);
console.log('🔮 Прогноз на неделю:', forecast);

// Генерация отчёта
const report = await returnsAnalytics.generateSummaryReport(30);
console.log(report);

// Получение активных алертов
const criticalAlerts = returnsAnalytics.getActiveAlerts('CRITICAL');
if (criticalAlerts.length > 0) {
  console.log('🚨 Критические алерты:', criticalAlerts);
}

// Остановка через сутки (для примера)
setTimeout(() => {
  returnsAnalytics.stopAutoAnalysis();
}, 24 * 60 * 60 * 1000);
```

---

## 📈 KPI и метрики возвратов

### Ключевые показатели
- **Процент возвратности**: Доля возвратов от общего количества продаж
- **Средняя стоимость возврата**: Финансовое воздействие одного возврата
- **Время цикла возврата**: От инициации до завершения процесса
- **Сезонные колебания**: Влияние временных факторов на количество возвратов

### Бизнес-метрики
- **ROI возвратов**: Соотношение затрат на обработку к стоимости возвращённых товаров
- **Удовлетворённость клиентов**: Влияние процесса возврата на лояльность
- **Операционная эффективность**: Стоимость обработки одного возврата
- **Предотвращение возвратов**: Эффективность мер по снижению возвратности

### Автоматические отчёты
```typescript
// Еженедельный отчёт по возвратам
const weeklyReporting = () => {
  setInterval(async () => {
    try {
      const report = await returnsAnalytics.generateSummaryReport(7);
      console.log('📅 ЕЖЕНЕДЕЛЬНЫЙ ОТЧЁТ ПО ВОЗВРАТАМ:\n', report);
      
      // Отправить отчёт по email/Slack/Telegram
      // await sendReport('weekly_returns_report', report);
      
    } catch (error) {
      console.error('❌ Ошибка еженедельного отчёта:', error);
    }
  }, 7 * 24 * 60 * 60 * 1000); // Каждую неделю
};

weeklyReporting();
```

---

## 💡 Лучшие практики

### Аналитический подход
- **Регулярный мониторинг**: Ежедневная проверка ключевых показателей
- **Трендовый анализ**: Выявление долгосрочных тенденций
- **Сравнительная аналитика**: Сопоставление периодов и показателей
- **Прогнозное планирование**: Использование данных для планирования ресурсов

### Автоматизация процессов
- **Алертинг**: Автоматические уведомления о критических изменениях  
- **Отчётность**: Регулярные сводки для менеджмента
- **Интеграция с BI**: Подключение к системам бизнес-аналитики
- **Дашборды**: Визуализация данных в реальном времени

### Оптимизация возвратов
- **Анализ причин**: Выявление основных факторов возвратности
- **Превентивные меры**: Снижение вероятности возвратов
- **Процессная оптимизация**: Улучшение операционных показателей
- **Клиентский сервис**: Повышение удовлетворённости процессом возврата