# Управление отчётами - Report Management API

API для централизованного управления всеми типами отчётов на платформе OZON. Обеспечивает мониторинг статусов, отслеживание готовности и управление жизненным циклом отчётов.

---

## 🔧 Методы управления отчётами

### 1. getReportInfo()
Получение детальной информации о статусе и параметрах конкретного отчёта по его уникальному идентификатору.

**Применение**: Проверка готовности отчёта, получение ссылки на скачивание, диагностика ошибок.

#### Типизация запроса
```typescript
interface ReportInfoRequest {
  /** 
   * Уникальный идентификатор отчёта
   * Unique report identifier
   */
  code: string;
}
```

#### Типизация ответа
```typescript
type ReportStatus = 'PENDING' | 'SUCCESS' | 'FAILED' | 'CANCELLED';

interface ReportInfo {
  /** 
   * Уникальный идентификатор отчёта
   * Unique report identifier
   */
  code?: string;
  
  /** 
   * Статус отчёта
   * Report status
   */
  status?: ReportStatus;
  
  /** 
   * Дата создания отчёта
   * Report creation date
   */
  created_at?: string;
  
  /** 
   * Дата обновления отчёта
   * Report update date
   */
  updated_at?: string;
  
  /** 
   * Ссылка на скачивание отчёта
   * Report download link
   */
  download_url?: string;
  
  /** 
   * Размер файла отчёта в байтах
   * Report file size in bytes
   */
  file_size?: number;
  
  /** 
   * Тип отчёта
   * Report type
   */
  report_type?: string;
  
  /** 
   * Сообщение об ошибке (если есть)
   * Error message (if any)
   */
  error_message?: string;
}

interface ReportInfoResponse {
  /** 
   * Информация об отчёте
   * Report information
   */
  result?: ReportInfo;
}
```

### 2. getReportList()
Получение списка всех отчётов с возможностью фильтрации по типу и статусу, включая пагинацию для больших объёмов данных.

**Применение**: Мониторинг всех отчётов, поиск конкретного отчёта, аналитика использования.

#### Типизация запроса
```typescript
type ReportListType = 'ALL' | 'PRODUCTS' | 'POSTINGS' | 'RETURNS' | 'DISCOUNTED' | 'STOCK_BY_WAREHOUSE';

interface ReportListRequest {
  /** 
   * Номер страницы
   * Page number
   */
  page: number;
  
  /** 
   * Количество значений на странице (по умолчанию — 100, максимальное — 1000)
   * Number of values per page (default 100, maximum 1000)
   */
  page_size: number;
  
  /** 
   * Тип отчёта
   * Report type
   */
  report_type?: ReportListType;
}
```

#### Типизация ответа
```typescript
interface ReportListItem {
  /** 
   * Уникальный идентификатор отчёта
   * Unique report identifier
   */
  code?: string;
  
  /** 
   * Статус отчёта
   * Report status
   */
  status?: ReportStatus;
  
  /** 
   * Дата создания отчёта
   * Report creation date
   */
  created_at?: string;
  
  /** 
   * Тип отчёта
   * Report type
   */
  report_type?: string;
  
  /** 
   * Размер файла отчёта в байтах
   * Report file size in bytes
   */
  file_size?: number;
}

interface ReportListResult {
  /** 
   * Список отчётов
   * Reports list
   */
  reports?: ReportListItem[];
  
  /** 
   * Общее количество отчётов
   * Total reports count
   */
  total_count?: number;
  
  /** 
   * Номер текущей страницы
   * Current page number
   */
  page?: number;
  
  /** 
   * Количество элементов на странице
   * Number of elements per page
   */
  page_size?: number;
}

interface ReportListResponse {
  /** 
   * Результат списка отчётов
   * Report list result
   */
  result?: ReportListResult;
}
```

---

## 🔧 Практические примеры использования

### Базовый пример проверки статуса отчёта
```typescript
import { ReportApi } from 'daytona-ozon-seller-api';

const reportApi = new ReportApi(httpClient);

try {
  // Проверить статус конкретного отчёта
  const reportInfo = await reportApi.getReportInfo({
    code: 'report_abc123def456'
  });

  if (reportInfo.result) {
    const report = reportInfo.result;
    console.log(`📊 Отчёт: ${report.code}`);
    console.log(`Тип: ${report.report_type}`);
    console.log(`Статус: ${report.status}`);
    console.log(`Создан: ${report.created_at}`);
    
    switch (report.status) {
      case 'SUCCESS':
        console.log(`✅ Отчёт готов! Размер: ${report.file_size} байт`);
        console.log(`📥 Ссылка для скачивания: ${report.download_url}`);
        break;
        
      case 'PENDING':
        console.log('⏳ Отчёт в процессе генерации...');
        break;
        
      case 'FAILED':
        console.log(`❌ Ошибка создания отчёта: ${report.error_message}`);
        break;
        
      case 'CANCELLED':
        console.log('🚫 Отчёт был отменён');
        break;
    }
  }
} catch (error) {
  console.error('❌ Ошибка получения информации об отчёте:', error);
}
```

### Получение списка отчётов с фильтрацией
```typescript
// Получить все отчёты по товарам
const productReports = await reportApi.getReportList({
  page: 1,
  page_size: 50,
  report_type: 'PRODUCTS'
});

if (productReports.result?.reports) {
  console.log('📋 Отчёты по товарам:');
  console.log(`Всего: ${productReports.result.total_count}`);
  
  productReports.result.reports.forEach(report => {
    const statusEmoji = {
      'SUCCESS': '✅',
      'PENDING': '⏳', 
      'FAILED': '❌',
      'CANCELLED': '🚫'
    }[report.status || ''] || '❓';
    
    console.log(`${statusEmoji} ${report.code} (${report.created_at})`);
    if (report.file_size) {
      console.log(`   Размер: ${(report.file_size / 1024 / 1024).toFixed(2)} МБ`);
    }
  });
}

// Получить все типы отчётов
const allReports = await reportApi.getReportList({
  page: 1,
  page_size: 100,
  report_type: 'ALL'
});
```

---

## 🤖 Автоматизация управления отчётами

### Класс ReportManager
Автоматизированная система управления отчётами с мониторингом и автоматическим скачиванием.

```typescript
interface ReportManagerConfig {
  /** Интервал проверки статусов в миллисекундах */
  checkInterval: number;
  
  /** Максимальное время ожидания готовности отчёта в минутах */
  maxWaitTimeMinutes: number;
  
  /** Размер страницы для списка отчётов */
  pageSize: number;
  
  /** Автоматическое скачивание готовых отчётов */
  autoDownload: boolean;
  
  /** Директория для сохранения отчётов */
  downloadDirectory?: string;
}

interface ReportTask {
  code: string;
  type: string;
  createdAt: Date;
  status: ReportStatus;
  retryCount: number;
  onComplete?: (downloadUrl: string, fileSize: number) => void;
  onError?: (error: string) => void;
}

class ReportManager {
  private reportApi: ReportApi;
  private config: ReportManagerConfig;
  private activeTasks: Map<string, ReportTask> = new Map();
  private monitoringInterval?: NodeJS.Timeout;

  constructor(reportApi: ReportApi, config: ReportManagerConfig) {
    this.reportApi = reportApi;
    this.config = config;
  }

  /**
   * Запуск мониторинга отчётов
   */
  startMonitoring(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
    }

    this.monitoringInterval = setInterval(() => {
      this.checkPendingReports();
    }, this.config.checkInterval);

    console.log('🔄 Мониторинг отчётов запущен');
  }

  /**
   * Остановка мониторинга отчётов
   */
  stopMonitoring(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = undefined;
    }
    console.log('⏹️ Мониторинг отчётов остановлен');
  }

  /**
   * Добавление отчёта в очередь мониторинга
   */
  addReportToMonitoring(
    reportCode: string, 
    reportType: string,
    callbacks?: {
      onComplete?: (downloadUrl: string, fileSize: number) => void;
      onError?: (error: string) => void;
    }
  ): void {
    const task: ReportTask = {
      code: reportCode,
      type: reportType,
      createdAt: new Date(),
      status: 'PENDING',
      retryCount: 0,
      onComplete: callbacks?.onComplete,
      onError: callbacks?.onError
    };

    this.activeTasks.set(reportCode, task);
    console.log(`📋 Добавлен отчёт в мониторинг: ${reportCode}`);
  }

  /**
   * Проверка статусов всех ожидающих отчётов
   */
  private async checkPendingReports(): Promise<void> {
    const pendingTasks = Array.from(this.activeTasks.values())
      .filter(task => task.status === 'PENDING');

    if (pendingTasks.length === 0) return;

    console.log(`🔍 Проверка ${pendingTasks.length} отчётов...`);

    for (const task of pendingTasks) {
      try {
        await this.checkReportStatus(task);
      } catch (error) {
        console.error(`❌ Ошибка проверки отчёта ${task.code}:`, error);
        task.retryCount++;
        
        if (task.retryCount > 3) {
          task.status = 'FAILED';
          task.onError?.(`Превышено количество попыток проверки: ${error}`);
          this.activeTasks.delete(task.code);
        }
      }
    }
  }

  /**
   * Проверка статуса конкретного отчёта
   */
  private async checkReportStatus(task: ReportTask): Promise<void> {
    const info = await this.reportApi.getReportInfo({ code: task.code });
    const report = info.result;
    
    if (!report) return;

    // Проверка таймаута
    const now = new Date();
    const createdMinutesAgo = (now.getTime() - task.createdAt.getTime()) / (1000 * 60);
    
    if (createdMinutesAgo > this.config.maxWaitTimeMinutes && report.status === 'PENDING') {
      console.log(`⏱️ Таймаут ожидания отчёта ${task.code}`);
      task.status = 'FAILED';
      task.onError?.('Превышено время ожидания генерации отчёта');
      this.activeTasks.delete(task.code);
      return;
    }

    // Обновление статуса
    if (report.status !== task.status) {
      task.status = report.status || 'PENDING';
      console.log(`📊 Отчёт ${task.code}: ${task.status}`);

      switch (report.status) {
        case 'SUCCESS':
          if (report.download_url && report.file_size) {
            task.onComplete?.(report.download_url, report.file_size);
            
            if (this.config.autoDownload) {
              await this.downloadReport(task.code, report.download_url);
            }
          }
          this.activeTasks.delete(task.code);
          break;

        case 'FAILED':
          task.onError?.(report.error_message || 'Неизвестная ошибка');
          this.activeTasks.delete(task.code);
          break;

        case 'CANCELLED':
          task.onError?.('Отчёт был отменён');
          this.activeTasks.delete(task.code);
          break;
      }
    }
  }

  /**
   * Автоматическое скачивание отчёта
   */
  private async downloadReport(code: string, downloadUrl: string): Promise<void> {
    try {
      console.log(`📥 Скачивание отчёта ${code}...`);
      
      // Здесь был бы код для скачивания файла
      // В реальном приложении можно использовать axios, fetch или fs для Node.js
      
      console.log(`✅ Отчёт ${code} успешно скачан`);
    } catch (error) {
      console.error(`❌ Ошибка скачивания отчёта ${code}:`, error);
    }
  }

  /**
   * Получение статистики по всем отчётам
   */
  async getReportsStatistics(): Promise<{
    totalReports: number;
    reportsByType: Record<string, number>;
    reportsByStatus: Record<string, number>;
    averageFileSize: number;
    recentReports: ReportListItem[];
  }> {
    try {
      // Получить первые страницы всех отчётов для статистики
      const allReports = await this.reportApi.getReportList({
        page: 1,
        page_size: 1000,
        report_type: 'ALL'
      });

      if (!allReports.result?.reports) {
        throw new Error('Не удалось получить список отчётов');
      }

      const reports = allReports.result.reports;
      
      const reportsByType: Record<string, number> = {};
      const reportsByStatus: Record<string, number> = {};
      let totalFileSize = 0;
      let fileCount = 0;

      reports.forEach(report => {
        // Статистика по типам
        const type = report.report_type || 'UNKNOWN';
        reportsByType[type] = (reportsByType[type] || 0) + 1;

        // Статистика по статусам
        const status = report.status || 'UNKNOWN';
        reportsByStatus[status] = (reportsByStatus[status] || 0) + 1;

        // Средний размер файла
        if (report.file_size) {
          totalFileSize += report.file_size;
          fileCount++;
        }
      });

      // Последние 10 отчётов
      const recentReports = reports
        .sort((a, b) => {
          const dateA = new Date(a.created_at || '').getTime();
          const dateB = new Date(b.created_at || '').getTime();
          return dateB - dateA;
        })
        .slice(0, 10);

      return {
        totalReports: allReports.result.total_count || 0,
        reportsByType,
        reportsByStatus,
        averageFileSize: fileCount > 0 ? totalFileSize / fileCount : 0,
        recentReports
      };
      
    } catch (error) {
      console.error('❌ Ошибка получения статистики отчётов:', error);
      throw error;
    }
  }

  /**
   * Поиск отчётов по критериям
   */
  async findReports(criteria: {
    type?: ReportListType;
    status?: ReportStatus;
    createdAfter?: Date;
    createdBefore?: Date;
    minFileSize?: number;
    maxFileSize?: number;
  }): Promise<ReportListItem[]> {
    const foundReports: ReportListItem[] = [];
    let page = 1;
    const pageSize = this.config.pageSize;

    try {
      while (true) {
        const response = await this.reportApi.getReportList({
          page,
          page_size: pageSize,
          report_type: criteria.type || 'ALL'
        });

        if (!response.result?.reports?.length) break;

        const filteredReports = response.result.reports.filter(report => {
          // Фильтр по статусу
          if (criteria.status && report.status !== criteria.status) {
            return false;
          }

          // Фильтр по дате создания
          if (criteria.createdAfter || criteria.createdBefore) {
            const createdAt = new Date(report.created_at || '');
            if (criteria.createdAfter && createdAt < criteria.createdAfter) {
              return false;
            }
            if (criteria.createdBefore && createdAt > criteria.createdBefore) {
              return false;
            }
          }

          // Фильтр по размеру файла
          if (report.file_size) {
            if (criteria.minFileSize && report.file_size < criteria.minFileSize) {
              return false;
            }
            if (criteria.maxFileSize && report.file_size > criteria.maxFileSize) {
              return false;
            }
          }

          return true;
        });

        foundReports.push(...filteredReports);

        if (response.result.reports.length < pageSize) break;
        page++;

        // Задержка между запросами
        await this.delay(500);
      }

      return foundReports;
      
    } catch (error) {
      console.error('❌ Ошибка поиска отчётов:', error);
      return foundReports;
    }
  }

  /**
   * Получение активных задач мониторинга
   */
  getActiveTasks(): ReportTask[] {
    return Array.from(this.activeTasks.values());
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

### Пример использования ReportManager
```typescript
const reportManager = new ReportManager(reportApi, {
  checkInterval: 30000, // Проверять каждые 30 секунд
  maxWaitTimeMinutes: 60, // Максимум 60 минут ожидания
  pageSize: 100,
  autoDownload: true,
  downloadDirectory: './reports'
});

// Запустить мониторинг
reportManager.startMonitoring();

// Создать отчёт и добавить в мониторинг
const newReport = await reportApi.createProductsReport({
  visibility: 'VISIBLE',
  language: 'RU'
});

if (newReport.result?.code) {
  reportManager.addReportToMonitoring(
    newReport.result.code,
    'PRODUCTS',
    {
      onComplete: (downloadUrl, fileSize) => {
        console.log(`🎉 Отчёт готов! Размер: ${fileSize} байт`);
        console.log(`📥 Ссылка: ${downloadUrl}`);
      },
      onError: (error) => {
        console.error(`😞 Ошибка создания отчёта: ${error}`);
      }
    }
  );
}

// Получить статистику через час
setTimeout(async () => {
  const stats = await reportManager.getReportsStatistics();
  console.log('📊 Статистика отчётов:', stats);
  
  // Остановить мониторинг
  reportManager.stopMonitoring();
}, 60 * 60 * 1000);
```

---

## 📈 Мониторинг и аналитика отчётов

### Ключевые метрики
- **Время генерации**: Среднее время создания отчётов по типам
- **Успешность**: Процент успешно созданных отчётов
- **Размеры файлов**: Статистика по размерам отчётов
- **Частота использования**: Популярность различных типов отчётов

### Автоматические алерты
```typescript
// Настройка алертов для критических ситуаций
const setupAlerting = (manager: ReportManager) => {
  // Проверка зависших отчётов каждые 10 минут
  setInterval(async () => {
    const activeTasks = manager.getActiveTasks();
    const stuckReports = activeTasks.filter(task => {
      const minutesElapsed = (new Date().getTime() - task.createdAt.getTime()) / (1000 * 60);
      return minutesElapsed > 30 && task.status === 'PENDING';
    });

    if (stuckReports.length > 0) {
      console.warn(`⚠️ Обнаружено ${stuckReports.length} зависших отчётов`);
      // Отправить уведомление администратору
    }
  }, 10 * 60 * 1000);

  // Ежедневная сводка по отчётам
  setInterval(async () => {
    const stats = await manager.getReportsStatistics();
    console.log('📅 Ежедневная сводка отчётов:', {
      total: stats.totalReports,
      byStatus: stats.reportsByStatus,
      avgSize: `${(stats.averageFileSize / 1024 / 1024).toFixed(2)} МБ`
    });
  }, 24 * 60 * 60 * 1000);
};
```

---

## 💡 Лучшие практики

### Эффективное управление отчётами
- **Пакетная обработка**: Группировка запросов для снижения нагрузки
- **Кэширование результатов**: Сохранение часто запрашиваемых данных
- **Мониторинг производительности**: Отслеживание времени отклика API
- **Обработка ошибок**: Graceful handling неудачных запросов

### Оптимизация ресурсов
- **Умная пагинация**: Адаптивный размер страниц в зависимости от объёма
- **Асинхронная обработка**: Неблокирующие операции мониторинга
- **Автоматическая очистка**: Удаление устаревших задач мониторинга
- **Балансировка нагрузки**: Распределение запросов во времени