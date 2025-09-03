# Бизнес-отчёты - Business Reports API

API для создания детальных бизнес-отчётов по всем аспектам операционной деятельности на платформе OZON. Включает отчёты по товарам, отправлениям, возвратам, остаткам и уценкам.

---

## 📋 Методы бизнес-отчётности

### 1. createDiscountedReport()
Создание отчёта по товарам, уценённым платформой OZON (например, при повреждении).

**Применение**: Анализ потерь от уценки, контроль качества товаров, планирование возмещения.

#### Типизация запроса
```typescript
interface ReportCreateDiscountedRequest {
  // Пустой интерфейс - параметры не требуются
}
```

#### Типизация ответа
```typescript
interface ReportCreateDiscountedResponse {
  /** 
   * Уникальный идентификатор отчёта
   * Unique report identifier
   */
  code?: string;
}
```

### 2. createPostingsReport()
Создание отчёта об отправлениях с информацией по заказам, статусам, стоимости и содержимому.

**Применение**: Анализ логистики, контроль выполнения заказов, аудит отправлений.

#### Типизация запроса
```typescript
type ReportLanguage = 'DEFAULT' | 'RU' | 'EN';

interface ReportPostingsFilter {
  /** 
   * Начало периода в формате YYYY-MM-DD
   * Period start in YYYY-MM-DD format
   */
  since: string;
  
  /** 
   * Конец периода в формате YYYY-MM-DD
   * Period end in YYYY-MM-DD format
   */
  to: string;
  
  /** 
   * Список статусов отправлений
   * List of posting statuses
   */
  status?: string[];
}

interface ReportCreatePostingsRequest {
  /** 
   * Фильтр для отчёта
   * Report filter
   */
  filter: ReportPostingsFilter;
  
  /** 
   * Язык отчёта
   * Report language
   */
  language?: ReportLanguage;
}
```

### 3. createProductsReport()
Создание отчёта по товарам с данными о ценах, количестве, статусах и идентификаторах.

**Применение**: Анализ ассортимента, контроль остатков, ценовая аналитика.

#### Типизация запроса
```typescript
type ReportProductVisibility = 
  | 'ALL' | 'VISIBLE' | 'INVISIBLE' | 'EMPTY_STOCK' | 'NOT_MODERATED' | 'MODERATED' 
  | 'DISABLED' | 'STATE_FAILED_MODERATION' | 'READY_TO_SUPPLY' | 'VALIDATION_STATE_PENDING' 
  | 'VALIDATION_STATE_FAIL' | 'VALIDATION_STATE_SUCCESS' | 'TO_SUPPLY' | 'IN_SALE' 
  | 'REMOVED_FROM_SALE' | 'BANNED' | 'OVERPRICED' | 'CRITICALLY_OVERPRICED' 
  | 'EMPTY_BARCODE' | 'BARCODE_EXISTS' | 'QUARANTINE' | 'ARCHIVED' 
  | 'OVERPRICED_WITH_STOCK' | 'PARTIAL_APPROVED' | 'IMAGE_ABSENT' | 'MODERATION_BLOCK';

interface ReportCreateProductsRequest {
  /** 
   * Язык отчёта
   * Report language
   */
  language?: ReportLanguage;
  
  /** 
   * Идентификаторы товаров в системе продавца — артикулы
   * Product identifiers in seller system - article numbers
   */
  offer_id?: string[];
  
  /** 
   * Поиск по содержанию записи
   * Search by record content
   */
  search?: string;
  
  /** 
   * Идентификаторы товаров в системе Ozon — SKU
   * Product identifiers in Ozon system - SKU
   */
  sku?: number[];
  
  /** 
   * Видимость товаров
   * Product visibility
   */
  visibility?: ReportProductVisibility;
}
```

### 4. createStockByWarehouseReport()
Создание отчёта об остатках товаров на FBS-складах с информацией о доступных и зарезервированных единицах.

**Применение**: Управление запасами, планирование пополнения, контроль резервирования.

#### Типизация запроса
```typescript
interface ReportCreateStockByWarehouseRequest {
  /** 
   * Идентификаторы складов
   * Warehouse identifiers
   */
  warehouseId: string[];
  
  /** 
   * Язык отчёта
   * Report language
   */
  language?: ReportLanguage;
}
```

### 5. createReturnsReport()
Создание отчёта о возвратах товаров для FBO и FBS с детализацией причин и статусов.

**Применение**: Анализ качества товаров, оптимизация логистики, снижение возвратности.

#### Типизация запроса
```typescript
interface ReportCreateReturnsRequest {
  /** 
   * Начало периода в формате YYYY-MM-DD
   * Period start in YYYY-MM-DD format
   */
  date_from: string;
  
  /** 
   * Конец периода в формате YYYY-MM-DD
   * Period end in YYYY-MM-DD format
   */
  date_to: string;
  
  /** 
   * Язык отчёта
   * Report language
   */
  language?: ReportLanguage;
}
```

#### Общая типизация ответов
```typescript
interface ReportCreateCode {
  /** 
   * Уникальный идентификатор отчёта
   * Unique report identifier
   */
  code?: string;
}

interface ReportCreateResponse {
  /** 
   * Код отчёта
   * Report code
   */
  result?: ReportCreateCode;
}

interface ReportCreateReturnsResponse {
  /** 
   * Уникальный идентификатор отчёта
   * Unique report identifier
   */
  code?: string;
}
```

---

## 🔧 Практические примеры использования

### Создание отчёта по товарам с фильтрацией
```typescript
import { ReportApi } from 'daytona-ozon-seller-api';

const reportApi = new ReportApi(httpClient);

try {
  // Создать отчёт по видимым товарам определённых SKU
  const productsReport = await reportApi.createProductsReport({
    sku: [123456789, 987654321, 555666777],
    visibility: 'VISIBLE',
    language: 'RU'
  });

  if (productsReport.result?.code) {
    console.log(`📊 Отчёт по товарам создан: ${productsReport.result.code}`);
    
    // Мониторинг готовности отчёта
    const monitorReport = async (code: string) => {
      let attempts = 0;
      const maxAttempts = 20;
      
      while (attempts < maxAttempts) {
        const info = await reportApi.getReportInfo({ code });
        
        if (info.result?.status === 'SUCCESS') {
          console.log(`✅ Отчёт готов! Размер: ${info.result.file_size} байт`);
          console.log(`📥 Скачать: ${info.result.download_url}`);
          break;
        } else if (info.result?.status === 'FAILED') {
          console.log(`❌ Ошибка: ${info.result.error_message}`);
          break;
        } else {
          console.log(`⏳ Генерация отчёта... (попытка ${attempts + 1})`);
          await new Promise(resolve => setTimeout(resolve, 10000)); // Ждём 10 секунд
        }
        
        attempts++;
      }
    };
    
    monitorReport(productsReport.result.code);
  }
} catch (error) {
  console.error('❌ Ошибка создания отчёта по товарам:', error);
}
```

### Создание отчёта об отправлениях за период
```typescript
// Создать отчёт об отправлениях за январь 2024
const postingsReport = await reportApi.createPostingsReport({
  filter: {
    since: '2024-01-01',
    to: '2024-01-31',
    status: ['DELIVERED', 'CANCELLED', 'RETURNED'] // Только определённые статусы
  },
  language: 'RU'
});

console.log(`📦 Отчёт об отправлениях: ${postingsReport.result?.code}`);
```

### Создание отчёта об остатках на складах
```typescript
// Получить остатки на всех FBS-складах
const stockReport = await reportApi.createStockByWarehouseReport({
  warehouseId: ['warehouse_001', 'warehouse_002', 'warehouse_003'],
  language: 'RU'
});

console.log(`📦 Отчёт об остатках: ${stockReport.result?.code}`);
```

### Создание отчёта о возвратах
```typescript
// Анализ возвратов за квартал
const returnsReport = await reportApi.createReturnsReport({
  date_from: '2024-01-01',
  date_to: '2024-03-31',
  language: 'RU'
});

console.log(`🔄 Отчёт о возвратах: ${returnsReport.code}`);
```

---

## 🤖 Автоматизация бизнес-отчётности

### Класс BusinessReportAutomation
Система для автоматического создания, мониторинга и анализа бизнес-отчётов.

```typescript
interface ReportSchedule {
  /** Тип отчёта */
  type: 'PRODUCTS' | 'POSTINGS' | 'RETURNS' | 'STOCK' | 'DISCOUNTED';
  
  /** Интервал создания в миллисекундах */
  interval: number;
  
  /** Параметры для создания отчёта */
  parameters: any;
  
  /** Callback при готовности отчёта */
  onComplete?: (reportCode: string, downloadUrl: string) => void;
  
  /** Активен ли расписание */
  enabled: boolean;
}

interface BusinessMetrics {
  totalProducts: number;
  visibleProducts: number;
  totalStock: number;
  recentReturns: number;
  discountedItems: number;
  averageOrderValue: number;
  deliverySuccess: number;
}

class BusinessReportAutomation {
  private reportApi: ReportApi;
  private schedules: Map<string, ReportSchedule> = new Map();
  private activeTimers: Map<string, NodeJS.Timeout> = new Map();

  constructor(reportApi: ReportApi) {
    this.reportApi = reportApi;
  }

  /**
   * Добавление расписания для автоматического создания отчётов
   */
  addSchedule(
    scheduleId: string, 
    schedule: ReportSchedule
  ): void {
    this.schedules.set(scheduleId, schedule);
    
    if (schedule.enabled) {
      this.startSchedule(scheduleId);
    }
    
    console.log(`📅 Добавлено расписание: ${scheduleId} (${schedule.type})`);
  }

  /**
   * Запуск расписания
   */
  private startSchedule(scheduleId: string): void {
    const schedule = this.schedules.get(scheduleId);
    if (!schedule) return;

    // Остановить существующий таймер
    this.stopSchedule(scheduleId);

    // Создать новый таймер
    const timer = setInterval(async () => {
      try {
        await this.executeScheduledReport(scheduleId, schedule);
      } catch (error) {
        console.error(`❌ Ошибка выполнения расписания ${scheduleId}:`, error);
      }
    }, schedule.interval);

    this.activeTimers.set(scheduleId, timer);
    console.log(`▶️ Запущено расписание: ${scheduleId}`);
  }

  /**
   * Остановка расписания
   */
  stopSchedule(scheduleId: string): void {
    const timer = this.activeTimers.get(scheduleId);
    if (timer) {
      clearInterval(timer);
      this.activeTimers.delete(scheduleId);
      console.log(`⏹️ Остановлено расписание: ${scheduleId}`);
    }
  }

  /**
   * Выполнение запланированного отчёта
   */
  private async executeScheduledReport(
    scheduleId: string,
    schedule: ReportSchedule
  ): Promise<void> {
    console.log(`🔄 Создание отчёта по расписанию: ${scheduleId}`);

    let reportResponse: any;
    
    try {
      switch (schedule.type) {
        case 'PRODUCTS':
          reportResponse = await this.reportApi.createProductsReport(schedule.parameters);
          break;
          
        case 'POSTINGS':
          // Автоматически обновляем даты для текущего периода
          const now = new Date();
          const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
          const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
          
          const postingsParams = {
            ...schedule.parameters,
            filter: {
              ...schedule.parameters.filter,
              since: lastMonth.toISOString().split('T')[0],
              to: lastMonthEnd.toISOString().split('T')[0]
            }
          };
          
          reportResponse = await this.reportApi.createPostingsReport(postingsParams);
          break;
          
        case 'RETURNS':
          // Отчёт о возвратах за прошлый месяц
          const returnsParams = {
            ...schedule.parameters,
            date_from: lastMonth.toISOString().split('T')[0],
            date_to: lastMonthEnd.toISOString().split('T')[0]
          };
          
          reportResponse = await this.reportApi.createReturnsReport(returnsParams);
          break;
          
        case 'STOCK':
          reportResponse = await this.reportApi.createStockByWarehouseReport(schedule.parameters);
          break;
          
        case 'DISCOUNTED':
          reportResponse = await this.reportApi.createDiscountedReport(schedule.parameters);
          break;
          
        default:
          throw new Error(`Неизвестный тип отчёта: ${schedule.type}`);
      }

      const reportCode = reportResponse?.result?.code || reportResponse?.code;
      if (reportCode) {
        console.log(`📊 Отчёт создан: ${reportCode}`);
        
        // Мониторинг готовности
        this.monitorReportCompletion(reportCode, schedule.onComplete);
      }
      
    } catch (error) {
      console.error(`❌ Ошибка создания отчёта ${schedule.type}:`, error);
    }
  }

  /**
   * Мониторинг готовности отчёта
   */
  private async monitorReportCompletion(
    reportCode: string,
    onComplete?: (reportCode: string, downloadUrl: string) => void
  ): Promise<void> {
    let attempts = 0;
    const maxAttempts = 30; // Максимум 15 минут ожидания
    
    const checkStatus = async (): Promise<void> => {
      if (attempts >= maxAttempts) {
        console.log(`⏰ Таймаут ожидания отчёта: ${reportCode}`);
        return;
      }

      try {
        const info = await this.reportApi.getReportInfo({ code: reportCode });
        
        if (info.result?.status === 'SUCCESS' && info.result.download_url) {
          console.log(`✅ Отчёт готов: ${reportCode}`);
          onComplete?.(reportCode, info.result.download_url);
          return;
        } else if (info.result?.status === 'FAILED') {
          console.log(`❌ Ошибка отчёта ${reportCode}: ${info.result.error_message}`);
          return;
        }

        // Продолжить ожидание
        attempts++;
        setTimeout(checkStatus, 30000); // Проверять каждые 30 секунд
        
      } catch (error) {
        console.error(`❌ Ошибка проверки статуса отчёта ${reportCode}:`, error);
      }
    };

    checkStatus();
  }

  /**
   * Комплексная аналитика на основе всех отчётов
   */
  async generateBusinessMetrics(): Promise<BusinessMetrics> {
    try {
      console.log('📊 Генерация бизнес-метрик...');

      // Создать отчёты параллельно
      const [productsReport, stockReport, discountedReport] = await Promise.all([
        this.reportApi.createProductsReport({
          visibility: 'ALL',
          language: 'RU'
        }),
        this.reportApi.createStockByWarehouseReport({
          warehouseId: ['all'], // Все склады
          language: 'RU'
        }),
        this.reportApi.createDiscountedReport({})
      ]);

      // В реальном приложении здесь был бы код для:
      // 1. Ожидания готовности отчётов
      // 2. Скачивания и парсинга CSV/Excel файлов
      // 3. Извлечения метрик из данных
      
      // Для примера возвращаем моковые данные
      const metrics: BusinessMetrics = {
        totalProducts: 1500,
        visibleProducts: 1200,
        totalStock: 45000,
        recentReturns: 89,
        discountedItems: 12,
        averageOrderValue: 2350,
        deliverySuccess: 96.8
      };

      console.log('✅ Бизнес-метрики сгенерированы');
      return metrics;

    } catch (error) {
      console.error('❌ Ошибка генерации бизнес-метрик:', error);
      throw error;
    }
  }

  /**
   * Создание еженедельного сводного отчёта
   */
  async createWeeklyDigest(): Promise<string> {
    const metrics = await this.generateBusinessMetrics();
    
    let digest = '📅 ЕЖЕНЕДЕЛЬНЫЙ СВОДНЫЙ ОТЧЁТ\n\n';
    digest += `🛍️  Товары:\n`;
    digest += `   • Всего товаров: ${metrics.totalProducts.toLocaleString('ru')}\n`;
    digest += `   • Видимых: ${metrics.visibleProducts.toLocaleString('ru')} (${((metrics.visibleProducts/metrics.totalProducts)*100).toFixed(1)}%)\n\n`;
    
    digest += `📦 Склады:\n`;
    digest += `   • Общий остаток: ${metrics.totalStock.toLocaleString('ru')} единиц\n`;
    digest += `   • Уценённые товары: ${metrics.discountedItems} единиц\n\n`;
    
    digest += `🔄 Операции:\n`;
    digest += `   • Возвраты: ${metrics.recentReturns} за неделю\n`;
    digest += `   • Успешность доставки: ${metrics.deliverySuccess}%\n`;
    digest += `   • Средний чек: ${metrics.averageOrderValue.toLocaleString('ru')} руб.\n\n`;

    // Рекомендации
    digest += `💡 РЕКОМЕНДАЦИИ:\n`;
    
    if (metrics.visibleProducts / metrics.totalProducts < 0.8) {
      digest += `⚠️ Низкий процент видимых товаров - проверьте модерацию\n`;
    }
    
    if (metrics.deliverySuccess < 95) {
      digest += `⚠️ Проблемы с доставкой - анализ логистики\n`;
    }
    
    if (metrics.discountedItems > 20) {
      digest += `⚠️ Высокое количество уценённых товаров - проверьте упаковку\n`;
    }

    return digest;
  }

  /**
   * Получение активных расписаний
   */
  getActiveSchedules(): Array<{ id: string; schedule: ReportSchedule }> {
    return Array.from(this.schedules.entries())
      .filter(([, schedule]) => schedule.enabled)
      .map(([id, schedule]) => ({ id, schedule }));
  }

  /**
   * Остановка всех расписаний
   */
  stopAllSchedules(): void {
    this.activeTimers.forEach((timer, scheduleId) => {
      clearInterval(timer);
      console.log(`⏹️ Остановлено расписание: ${scheduleId}`);
    });
    
    this.activeTimers.clear();
    console.log('🛑 Все расписания остановлены');
  }
}
```

### Пример настройки автоматизации
```typescript
const automation = new BusinessReportAutomation(reportApi);

// Ежедневный отчёт по товарам в 9:00
automation.addSchedule('daily-products', {
  type: 'PRODUCTS',
  interval: 24 * 60 * 60 * 1000, // 24 часа
  parameters: {
    visibility: 'VISIBLE',
    language: 'RU'
  },
  onComplete: (code, url) => {
    console.log(`📊 Ежедневный отчёт по товарам готов: ${url}`);
    // Отправить по email, загрузить в облако, и т.д.
  },
  enabled: true
});

// Еженедельный отчёт об отправлениях по понедельникам
automation.addSchedule('weekly-postings', {
  type: 'POSTINGS',
  interval: 7 * 24 * 60 * 60 * 1000, // 7 дней
  parameters: {
    filter: {
      since: '', // Будет автоматически установлено
      to: '',    // Будет автоматически установлено
      status: ['DELIVERED', 'CANCELLED']
    },
    language: 'RU'
  },
  onComplete: (code, url) => {
    console.log(`📦 Еженедельный отчёт об отправлениях: ${url}`);
  },
  enabled: true
});

// Месячный анализ возвратов
automation.addSchedule('monthly-returns', {
  type: 'RETURNS',
  interval: 30 * 24 * 60 * 60 * 1000, // 30 дней
  parameters: {
    language: 'RU'
    // date_from и date_to будут установлены автоматически
  },
  onComplete: async (code, url) => {
    console.log(`🔄 Месячный отчёт о возвратах: ${url}`);
    
    // Создать сводный отчёт
    const digest = await automation.createWeeklyDigest();
    console.log(digest);
  },
  enabled: true
});

console.log('🚀 Автоматизация отчётов настроена и запущена!');

// Остановить все через 24 часа (для демонстрации)
setTimeout(() => {
  automation.stopAllSchedules();
}, 24 * 60 * 60 * 1000);
```

---

## 📈 Аналитика и KPI бизнес-отчётов

### Ключевые бизнес-метрики

#### Товарные показатели
- **Оборачиваемость товаров**: Скорость продаж по категориям
- **ABC-анализ**: Классификация товаров по прибыльности
- **Уровень возвратности**: Процент возвратов по товарам
- **Маржинальность**: Прибыльность после всех комиссий

#### Операционные показатели
- **Время выполнения заказов**: От заказа до доставки
- **Качество упаковки**: Анализ повреждений и уценок
- **Складская эффективность**: Оборачиваемость остатков
- **Логистические издержки**: Стоимость доставки и хранения

### Автоматические алерты и мониторинг
```typescript
const setupBusinessAlerting = (automation: BusinessReportAutomation) => {
  // Критические алерты
  setInterval(async () => {
    try {
      const metrics = await automation.generateBusinessMetrics();
      
      // Алерт по критически низким остаткам
      if (metrics.totalStock < 1000) {
        console.warn(`🚨 КРИТИЧНО: Остатки на складе менее 1000 единиц!`);
        // Отправить уведомление
      }
      
      // Алерт по высокому проценту возвратов
      const returnRate = (metrics.recentReturns / metrics.totalProducts) * 100;
      if (returnRate > 10) {
        console.warn(`⚠️ Высокий процент возвратов: ${returnRate.toFixed(2)}%`);
      }
      
      // Алерт по проблемам с доставкой
      if (metrics.deliverySuccess < 90) {
        console.warn(`📦 Проблемы с доставкой: ${metrics.deliverySuccess}% успешности`);
      }
      
    } catch (error) {
      console.error('❌ Ошибка проверки критических показателей:', error);
    }
  }, 60 * 60 * 1000); // Проверять каждый час
};
```

---

## 💡 Лучшие практики

### Оптимизация создания отчётов
- **Группировка запросов**: Создавать несколько отчётов одновременно
- **Кэширование данных**: Повторное использование результатов
- **Инкрементальные отчёты**: Обновление только изменённых данных
- **Архивирование**: Регулярное сохранение исторических данных

### Интеграция с бизнес-процессами
- **ERP-системы**: Автоматический импорт данных отчётов
- **BI-платформы**: Подключение к аналитическим системам
- **Мобильные приложения**: Push-уведомления о готовности отчётов
- **Email-рассылки**: Регулярные дайджесты для менеджмента