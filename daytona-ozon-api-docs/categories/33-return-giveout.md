# Управление возвратными отгрузками - Return Giveout Management API

API для полного управления процессом возвратных отгрузок на платформе OZON. Включает генерацию штрихкодов, управление их безопасностью и отслеживание статусов отгрузок.

---

## 🔄 Методы управления возвратными отгрузками

### 1. getGiveoutBarcode()
Получение значения штрихкода для возвратных отгрузок в текстовом виде.

**Применение**: Интеграция с внешними системами, хранение штрихкодов в базе данных.

#### Типизация запроса
```typescript
interface EmptyRequest {
  // Метод не требует входных параметров
}
```

#### Типизация ответа
```typescript
interface GiveoutGetBarcodeResponse {
  /** Значение штрихкода */
  barcode?: string;
}
```

### 2. resetGiveoutBarcode()
Генерация нового штрихкода взамен скомпрометированного.

**Применение**: Экстренная замена штрихкода при нарушении безопасности.

#### Типизация ответа
```typescript
interface GiveoutBarcodeResetResponse {
  /** Base64 изображение PNG с новым штрихкодом */
  barcode_png?: string;
}
```

### 3. getGiveoutPDF()
Получение штрихкода в формате PDF для высококачественной печати.

**Применение**: Профессиональная печать этикеток, только для FBS схемы.

#### Типизация ответа
```typescript
interface GiveoutGetPDFResponse {
  /** Base64 PDF файл со штрихкодом */
  barcode_pdf?: string;
}
```

### 4. getGiveoutPNG()
Получение штрихкода в формате PNG для универсального использования.

**Применение**: Веб-интерфейсы, мобильные приложения, быстрая печать.

#### Типизация ответа
```typescript
interface GiveoutGetPNGResponse {
  /** Base64 изображение PNG со штрихкодом */
  barcode_png?: string;
}
```

### 5. getGiveoutInfo()
Получение детальной информации о конкретной возвратной отгрузке.

**Применение**: Мониторинг статуса, просмотр состава отгрузки, отслеживание изменений.

#### Типизация запроса
```typescript
type GiveoutId = number;

interface GiveoutInfoRequest {
  /** Идентификатор возвратной отгрузки */
  giveout_id: GiveoutId;
}
```

#### Типизация ответа
```typescript
type GiveoutStatus = 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'COMPLETED' | 'CANCELLED';
type DateString = string; // ISO 8601 format

interface BasicProductInfo {
  /** Артикул продавца */
  offer_id?: string;
  /** SKU в системе OZON */
  sku?: number;
  /** Название товара */
  name?: string;
}

interface GiveoutInfoResponseItem extends BasicProductInfo {
  /** Количество товаров в возврате */
  quantity?: number;
}

interface GiveoutInfoResponse {
  /** Идентификатор возвратной отгрузки */
  giveout_id?: GiveoutId;
  
  /** Статус возвратной отгрузки */
  status?: GiveoutStatus;
  
  /** Дата создания */
  created_at?: DateString;
  
  /** Дата обновления */
  updated_at?: DateString;
  
  /** Товары в возвратной отгрузке */
  items?: GiveoutInfoResponseItem[];
}
```

### 6. isGiveoutEnabled()
Проверка доступности функции возвратных отгрузок по штрихкоду.

**Применение**: Валидация доступа перед использованием других методов.

#### Типизация ответа
```typescript
interface GiveoutIsEnabledResponse {
  /** Доступность функции возвратных отгрузок */
  enabled?: boolean;
}
```

### 7. getGiveoutList()
Получение списка возвратных отгрузок с поддержкой пагинации.

**Применение**: Мониторинг всех отгрузок, поиск конкретных отгрузок, аналитика.

#### Типизация запроса
```typescript
interface PaginationRequest {
  /** Количество элементов на странице */
  limit?: number;
  
  /** ID последнего элемента с предыдущей страницы */
  last_id?: number;
}

interface GiveoutListRequest extends PaginationRequest {
  // Наследует limit и last_id от PaginationRequest
}
```

#### Типизация ответа
```typescript
interface GiveoutListResponseItem {
  /** Идентификатор возвратной отгрузки */
  giveout_id?: GiveoutId;
  
  /** Статус возвратной отгрузки */
  status?: GiveoutStatus;
  
  /** Дата создания */
  created_at?: DateString;
  
  /** Количество товаров в отгрузке */
  items_count?: number;
}

interface PaginationResponse {
  /** Есть ли ещё данные */
  has_next?: boolean;
  
  /** ID последнего элемента текущей страницы */
  last_id?: number;
}

interface GiveoutListResponse extends PaginationResponse {
  /** Список возвратных отгрузок */
  giveouts?: GiveoutListResponseItem[];
}
```

---

## 🔧 Практические примеры использования

### Базовый пример работы с возвратными отгрузками
```typescript
import { ReturnApi } from 'daytona-ozon-seller-api';

const returnApi = new ReturnApi(httpClient);

try {
  // 1. Проверить доступность функции
  const isEnabled = await returnApi.isGiveoutEnabled();
  
  if (!isEnabled.enabled) {
    console.log('❌ Функция возвратных отгрузок недоступна');
    return;
  }
  
  console.log('✅ Функция возвратных отгрузок доступна');
  
  // 2. Получить список отгрузок
  const giveoutList = await returnApi.getGiveoutList({
    limit: 50
  });
  
  if (giveoutList.giveouts && giveoutList.giveouts.length > 0) {
    console.log(`📦 Найдено ${giveoutList.giveouts.length} отгрузок:`);
    
    giveoutList.giveouts.forEach(giveout => {
      const statusEmoji = {
        'ACTIVE': '🟢',
        'INACTIVE': '🔴',
        'PENDING': '🟡',
        'COMPLETED': '✅',
        'CANCELLED': '❌'
      }[giveout.status || ''] || '❓';
      
      console.log(`${statusEmoji} ID: ${giveout.giveout_id}, статус: ${giveout.status}, товаров: ${giveout.items_count}`);
    });
    
    // 3. Получить детальную информацию о первой отгрузке
    const firstGiveout = giveoutList.giveouts[0];
    if (firstGiveout.giveout_id) {
      const giveoutInfo = await returnApi.getGiveoutInfo({
        giveout_id: firstGiveout.giveout_id
      });
      
      console.log(`\n📋 Детали отгрузки ${giveoutInfo.giveout_id}:`);
      console.log(`Создана: ${giveoutInfo.created_at}`);
      console.log(`Обновлена: ${giveoutInfo.updated_at}`);
      console.log(`Статус: ${giveoutInfo.status}`);
      
      if (giveoutInfo.items) {
        console.log(`\n📦 Товары в отгрузке (${giveoutInfo.items.length}):`);
        giveoutInfo.items.forEach((item, index) => {
          console.log(`  ${index + 1}. ${item.name} (${item.offer_id})`);
          console.log(`     SKU: ${item.sku}, количество: ${item.quantity}`);
        });
      }
    }
  } else {
    console.log('📭 Возвратных отгрузок не найдено');
  }
  
} catch (error) {
  console.error('❌ Ошибка работы с возвратными отгрузками:', error);
}
```

### Генерация и работа со штрихкодами
```typescript
// Получение штрихкодов в различных форматах
const generateBarcodes = async (): Promise<void> => {
  try {
    // 1. Получить текстовое значение штрихкода
    const textBarcode = await returnApi.getGiveoutBarcode();
    if (textBarcode.barcode) {
      console.log(`📊 Штрихкод (текст): ${textBarcode.barcode}`);
    }
    
    // 2. Получить штрихкод в формате PNG
    const pngBarcode = await returnApi.getGiveoutPNG();
    if (pngBarcode.barcode_png) {
      console.log('🖼️ Штрихкод в формате PNG получен (Base64)');
      
      // Сохранение в файл (Node.js)
      const fs = await import('fs');
      const pngBuffer = Buffer.from(pngBarcode.barcode_png, 'base64');
      fs.writeFileSync('./barcode.png', pngBuffer);
      console.log('💾 Штрихкод сохранён в barcode.png');
    }
    
    // 3. Получить штрихкод в формате PDF (только FBS)
    const pdfBarcode = await returnApi.getGiveoutPDF();
    if (pdfBarcode.barcode_pdf) {
      console.log('📄 Штрихкод в формате PDF получен (Base64)');
      
      // Сохранение в файл (Node.js)
      const fs = await import('fs');
      const pdfBuffer = Buffer.from(pdfBarcode.barcode_pdf, 'base64');
      fs.writeFileSync('./barcode.pdf', pdfBuffer);
      console.log('💾 Штрихкод сохранён в barcode.pdf');
    }
    
  } catch (error) {
    console.error('❌ Ошибка генерации штрихкодов:', error);
  }
};

generateBarcodes();
```

### Экстренная замена штрихкода
```typescript
const emergencyBarcodeReset = async (): Promise<void> => {
  try {
    console.log('⚠️ Выполняется экстренная замена штрихкода...');
    
    const resetResult = await returnApi.resetGiveoutBarcode();
    
    if (resetResult.barcode_png) {
      console.log('✅ Новый штрихкод сгенерирован успешно');
      
      // Сохранить новый штрихкод
      const fs = await import('fs');
      const newBarcodeBuffer = Buffer.from(resetResult.barcode_png, 'base64');
      const filename = `emergency_barcode_${new Date().getTime()}.png`;
      fs.writeFileSync(`./${filename}`, newBarcodeBuffer);
      
      console.log(`💾 Новый штрихкод сохранён: ${filename}`);
      console.log('⚠️ ВАЖНО: Старые штрихкоды больше не действительны!');
      
      // Уведомить всех пользователей об изменении
      console.log('📨 Необходимо уведомить всех пользователей о новом штрихкоде');
    }
    
  } catch (error) {
    console.error('❌ Ошибка при экстренной замене штрихкода:', error);
  }
};

// Использование в случае компрометации
// emergencyBarcodeReset();
```

---

## 🤖 Автоматизация управления отгрузками

### Класс GiveoutManager
Автоматизированная система управления возвратными отгрузками с мониторингом и уведомлениями.

```typescript
interface GiveoutManagerConfig {
  /** Интервал проверки статусов в миллисекундах */
  checkInterval: number;
  
  /** Максимальное количество отгрузок для мониторинга */
  maxMonitoredGiveouts: number;
  
  /** Автоматическое обновление штрихкодов при истечении */
  autoUpdateBarcodes: boolean;
  
  /** Директория для сохранения штрихкодов */
  barcodeDirectory: string;
  
  /** Формат штрихкодов по умолчанию */
  defaultBarcodeFormat: 'PNG' | 'PDF' | 'TEXT';
}

interface GiveoutMonitoringTask {
  giveoutId: GiveoutId;
  lastStatus: GiveoutStatus;
  lastCheck: Date;
  onStatusChange?: (oldStatus: GiveoutStatus, newStatus: GiveoutStatus) => void;
  onError?: (error: string) => void;
}

class GiveoutManager {
  private returnApi: ReturnApi;
  private config: GiveoutManagerConfig;
  private monitoringTasks: Map<GiveoutId, GiveoutMonitoringTask> = new Map();
  private monitoringInterval?: NodeJS.Timeout;

  constructor(returnApi: ReturnApi, config: GiveoutManagerConfig) {
    this.returnApi = returnApi;
    this.config = config;
  }

  /**
   * Инициализация менеджера
   */
  async initialize(): Promise<boolean> {
    try {
      // Проверить доступность функции
      const isEnabled = await this.returnApi.isGiveoutEnabled();
      
      if (!isEnabled.enabled) {
        console.error('❌ Функция возвратных отгрузок недоступна');
        return false;
      }
      
      console.log('✅ Менеджер возвратных отгрузок инициализирован');
      return true;
      
    } catch (error) {
      console.error('❌ Ошибка инициализации менеджера:', error);
      return false;
    }
  }

  /**
   * Запуск мониторинга отгрузок
   */
  startMonitoring(): void {
    if (this.monitoringInterval) {
      this.stopMonitoring();
    }

    this.monitoringInterval = setInterval(() => {
      this.checkAllGiveouts();
    }, this.config.checkInterval);

    console.log('🔄 Мониторинг возвратных отгрузок запущен');
  }

  /**
   * Остановка мониторинга
   */
  stopMonitoring(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = undefined;
      console.log('⏹️ Мониторинг остановлен');
    }
  }

  /**
   * Добавление отгрузки в мониторинг
   */
  addGiveoutToMonitoring(
    giveoutId: GiveoutId,
    callbacks?: {
      onStatusChange?: (oldStatus: GiveoutStatus, newStatus: GiveoutStatus) => void;
      onError?: (error: string) => void;
    }
  ): void {
    if (this.monitoringTasks.size >= this.config.maxMonitoredGiveouts) {
      console.warn(`⚠️ Достигнуто максимальное количество отслеживаемых отгрузок: ${this.config.maxMonitoredGiveouts}`);
      return;
    }

    const task: GiveoutMonitoringTask = {
      giveoutId,
      lastStatus: 'PENDING',
      lastCheck: new Date(),
      onStatusChange: callbacks?.onStatusChange,
      onError: callbacks?.onError
    };

    this.monitoringTasks.set(giveoutId, task);
    console.log(`📋 Отгрузка ${giveoutId} добавлена в мониторинг`);
  }

  /**
   * Проверка всех отслеживаемых отгрузок
   */
  private async checkAllGiveouts(): Promise<void> {
    if (this.monitoringTasks.size === 0) return;

    console.log(`🔍 Проверка ${this.monitoringTasks.size} отгрузок...`);

    for (const [giveoutId, task] of this.monitoringTasks) {
      try {
        await this.checkGiveoutStatus(giveoutId, task);
      } catch (error) {
        console.error(`❌ Ошибка проверки отгрузки ${giveoutId}:`, error);
        task.onError?.(String(error));
      }
    }
  }

  /**
   * Проверка статуса конкретной отгрузки
   */
  private async checkGiveoutStatus(
    giveoutId: GiveoutId,
    task: GiveoutMonitoringTask
  ): Promise<void> {
    const info = await this.returnApi.getGiveoutInfo({ giveout_id: giveoutId });
    
    if (info.status && info.status !== task.lastStatus) {
      console.log(`📊 Отгрузка ${giveoutId}: ${task.lastStatus} → ${info.status}`);
      
      task.onStatusChange?.(task.lastStatus, info.status);
      task.lastStatus = info.status;
      
      // Удалить из мониторинга завершённые отгрузки
      if (info.status === 'COMPLETED' || info.status === 'CANCELLED') {
        this.monitoringTasks.delete(giveoutId);
        console.log(`🏁 Отгрузка ${giveoutId} удалена из мониторинга`);
      }
    }
    
    task.lastCheck = new Date();
  }

  /**
   * Получение и сохранение штрихкодов
   */
  async generateAndSaveBarcodes(): Promise<{
    text?: string;
    pngPath?: string;
    pdfPath?: string;
  }> {
    const result: { text?: string; pngPath?: string; pdfPath?: string } = {};
    
    try {
      // Создать директорию если не существует
      const fs = await import('fs');
      const path = await import('path');
      
      if (!fs.existsSync(this.config.barcodeDirectory)) {
        fs.mkdirSync(this.config.barcodeDirectory, { recursive: true });
      }

      const timestamp = new Date().getTime();

      // Получить текстовое значение
      const textBarcode = await this.returnApi.getGiveoutBarcode();
      if (textBarcode.barcode) {
        result.text = textBarcode.barcode;
        
        // Сохранить в текстовый файл
        const textPath = path.join(this.config.barcodeDirectory, `barcode_${timestamp}.txt`);
        fs.writeFileSync(textPath, textBarcode.barcode, 'utf8');
        console.log(`📝 Текстовый штрихкод сохранён: ${textPath}`);
      }

      // Получить PNG
      const pngBarcode = await this.returnApi.getGiveoutPNG();
      if (pngBarcode.barcode_png) {
        const pngPath = path.join(this.config.barcodeDirectory, `barcode_${timestamp}.png`);
        const pngBuffer = Buffer.from(pngBarcode.barcode_png, 'base64');
        fs.writeFileSync(pngPath, pngBuffer);
        result.pngPath = pngPath;
        console.log(`🖼️ PNG штрихкод сохранён: ${pngPath}`);
      }

      // Получить PDF (если доступно)
      try {
        const pdfBarcode = await this.returnApi.getGiveoutPDF();
        if (pdfBarcode.barcode_pdf) {
          const pdfPath = path.join(this.config.barcodeDirectory, `barcode_${timestamp}.pdf`);
          const pdfBuffer = Buffer.from(pdfBarcode.barcode_pdf, 'base64');
          fs.writeFileSync(pdfPath, pdfBuffer);
          result.pdfPath = pdfPath;
          console.log(`📄 PDF штрихкод сохранён: ${pdfPath}`);
        }
      } catch (error) {
        console.log('ℹ️ PDF штрихкод недоступен (возможно, не FBS схема)');
      }

      return result;
      
    } catch (error) {
      console.error('❌ Ошибка генерации штрихкодов:', error);
      throw error;
    }
  }

  /**
   * Получение статистики по отгрузкам
   */
  async getGiveoutStatistics(limit: number = 100): Promise<{
    totalGiveouts: number;
    statusBreakdown: Record<GiveoutStatus, number>;
    averageItemsPerGiveout: number;
    recentGiveouts: GiveoutListResponseItem[];
    oldestActiveGiveout?: GiveoutListResponseItem;
  }> {
    try {
      const allGiveouts: GiveoutListResponseItem[] = [];
      let lastId: number | undefined;

      // Собрать все отгрузки с пагинацией
      while (true) {
        const response = await this.returnApi.getGiveoutList({
          limit: Math.min(limit, 1000),
          last_id: lastId
        });

        if (!response.giveouts || response.giveouts.length === 0) break;
        
        allGiveouts.push(...response.giveouts);
        
        if (!response.has_next) break;
        lastId = response.last_id;
      }

      // Анализ статистики
      const statusBreakdown: Record<GiveoutStatus, number> = {
        'ACTIVE': 0,
        'INACTIVE': 0,
        'PENDING': 0,
        'COMPLETED': 0,
        'CANCELLED': 0
      };

      let totalItems = 0;
      
      allGiveouts.forEach(giveout => {
        if (giveout.status) {
          statusBreakdown[giveout.status] = (statusBreakdown[giveout.status] || 0) + 1;
        }
        if (giveout.items_count) {
          totalItems += giveout.items_count;
        }
      });

      // Найти самую старую активную отгрузку
      const oldestActive = allGiveouts
        .filter(g => g.status === 'ACTIVE')
        .sort((a, b) => {
          const dateA = new Date(a.created_at || '').getTime();
          const dateB = new Date(b.created_at || '').getTime();
          return dateA - dateB;
        })[0];

      // Последние отгрузки
      const recentGiveouts = allGiveouts
        .sort((a, b) => {
          const dateA = new Date(a.created_at || '').getTime();
          const dateB = new Date(b.created_at || '').getTime();
          return dateB - dateA;
        })
        .slice(0, 10);

      return {
        totalGiveouts: allGiveouts.length,
        statusBreakdown,
        averageItemsPerGiveout: allGiveouts.length > 0 ? totalItems / allGiveouts.length : 0,
        recentGiveouts,
        oldestActiveGiveout: oldestActive
      };
      
    } catch (error) {
      console.error('❌ Ошибка получения статистики:', error);
      throw error;
    }
  }

  /**
   * Экстренное обновление всех штрихкодов
   */
  async emergencyBarcodeUpdate(): Promise<string> {
    try {
      console.log('🚨 ЭКСТРЕННОЕ ОБНОВЛЕНИЕ ШТРИХКОДОВ');
      
      const resetResult = await this.returnApi.resetGiveoutBarcode();
      
      if (resetResult.barcode_png) {
        // Сохранить новый штрихкод с меткой экстренного обновления
        const fs = await import('fs');
        const path = await import('path');
        
        const emergencyDir = path.join(this.config.barcodeDirectory, 'emergency');
        if (!fs.existsSync(emergencyDir)) {
          fs.mkdirSync(emergencyDir, { recursive: true });
        }
        
        const filename = `emergency_barcode_${new Date().getTime()}.png`;
        const filepath = path.join(emergencyDir, filename);
        const barcodeBuffer = Buffer.from(resetResult.barcode_png, 'base64');
        fs.writeFileSync(filepath, barcodeBuffer);
        
        console.log(`💾 Экстренный штрихкод сохранён: ${filepath}`);
        console.log('⚠️ ВСЕ СТАРЫЕ ШТРИХКОДЫ НЕДЕЙСТВИТЕЛЬНЫ!');
        
        return filepath;
      }
      
      throw new Error('Не удалось получить новый штрихкод');
      
    } catch (error) {
      console.error('❌ Ошибка экстренного обновления:', error);
      throw error;
    }
  }

  /**
   * Получение активных задач мониторинга
   */
  getMonitoringTasks(): GiveoutMonitoringTask[] {
    return Array.from(this.monitoringTasks.values());
  }

  /**
   * Очистка завершённых задач
   */
  cleanupCompletedTasks(): number {
    let cleaned = 0;
    
    for (const [giveoutId, task] of this.monitoringTasks) {
      if (task.lastStatus === 'COMPLETED' || task.lastStatus === 'CANCELLED') {
        this.monitoringTasks.delete(giveoutId);
        cleaned++;
      }
    }
    
    if (cleaned > 0) {
      console.log(`🧹 Очищено ${cleaned} завершённых задач мониторинга`);
    }
    
    return cleaned;
  }
}
```

### Пример использования GiveoutManager
```typescript
const giveoutManager = new GiveoutManager(returnApi, {
  checkInterval: 30000, // Проверять каждые 30 секунд
  maxMonitoredGiveouts: 100,
  autoUpdateBarcodes: false,
  barcodeDirectory: './barcodes',
  defaultBarcodeFormat: 'PNG'
});

// Инициализация и запуск
const startGiveoutManagement = async () => {
  const initialized = await giveoutManager.initialize();
  
  if (!initialized) {
    console.log('❌ Не удалось инициализировать менеджер');
    return;
  }
  
  // Запустить мониторинг
  giveoutManager.startMonitoring();
  
  // Получить и сохранить штрихкоды
  const barcodes = await giveoutManager.generateAndSaveBarcodes();
  console.log('📊 Штрихкоды сгенерированы:', barcodes);
  
  // Получить статистику
  const stats = await giveoutManager.getGiveoutStatistics();
  console.log('📈 Статистика отгрузок:');
  console.log(`Всего отгрузок: ${stats.totalGiveouts}`);
  console.log(`Разбивка по статусам:`, stats.statusBreakdown);
  console.log(`Среднее количество товаров: ${stats.averageItemsPerGiveout.toFixed(1)}`);
  
  if (stats.oldestActiveGiveout) {
    console.log(`Самая старая активная отгрузка: ${stats.oldestActiveGiveout.giveout_id} (${stats.oldestActiveGiveout.created_at})`);
  }
  
  // Добавить отгрузки в мониторинг
  stats.recentGiveouts
    .filter(g => g.status === 'ACTIVE' || g.status === 'PENDING')
    .slice(0, 5)
    .forEach(giveout => {
      if (giveout.giveout_id) {
        giveoutManager.addGiveoutToMonitoring(giveout.giveout_id, {
          onStatusChange: (oldStatus, newStatus) => {
            console.log(`🔄 Отгрузка ${giveout.giveout_id}: ${oldStatus} → ${newStatus}`);
          },
          onError: (error) => {
            console.error(`❌ Ошибка отгрузки ${giveout.giveout_id}: ${error}`);
          }
        });
      }
    });
  
  // Остановить через час
  setTimeout(() => {
    giveoutManager.stopMonitoring();
  }, 60 * 60 * 1000);
};

startGiveoutManagement();
```

---

## 📈 Мониторинг и аналитика отгрузок

### Ключевые метрики
- **Время жизни отгрузки**: От создания до завершения
- **Процент активации**: Доля отгрузок, переведённых в активное состояние
- **Скорость обработки**: Среднее время между статусами
- **Частота использования форматов**: Популярность PNG vs PDF vs TEXT

### Автоматические алерты
```typescript
// Настройка системы алертов
const setupAlerting = (manager: GiveoutManager) => {
  // Проверка зависших отгрузок каждый час
  setInterval(async () => {
    const stats = await manager.getGiveoutStatistics();
    
    // Алерт по старым активным отгрузкам
    if (stats.oldestActiveGiveout) {
      const createdAt = new Date(stats.oldestActiveGiveout.created_at || '');
      const hoursAgo = (new Date().getTime() - createdAt.getTime()) / (1000 * 60 * 60);
      
      if (hoursAgo > 48) {
        console.warn(`⚠️ Отгрузка ${stats.oldestActiveGiveout.giveout_id} активна уже ${hoursAgo.toFixed(1)} часов`);
      }
    }
    
    // Алерт по большому количеству ожидающих отгрузок
    if (stats.statusBreakdown.PENDING > 20) {
      console.warn(`⚠️ Большое количество ожидающих отгрузок: ${stats.statusBreakdown.PENDING}`);
    }
    
  }, 60 * 60 * 1000); // Каждый час
};
```

---

## 💡 Лучшие практики

### Безопасность штрихкодов
- **Регулярная ротация**: Плановое обновление штрихкодов по расписанию
- **Мониторинг инцидентов**: Отслеживание подозрительной активности
- **Экстренная замена**: Быстрое реагирование на компрометацию
- **Контроль доступа**: Ограничение доступа к функциям генерации

### Оптимизация производительности
- **Пакетная обработка**: Группировка запросов для снижения нагрузки
- **Кэширование**: Сохранение часто используемых данных
- **Асинхронная обработка**: Неблокирующие операции мониторинга
- **Интеллектуальная пагинация**: Адаптивный размер страниц

### Интеграция с бизнес-процессами
- **Уведомления**: Автоматические алерты об изменении статусов
- **Дашборды**: Визуализация данных в реальном времени
- **Отчётность**: Регулярные сводки по активности отгрузок
- **Автоматизация**: Интеграция с системами складского учёта