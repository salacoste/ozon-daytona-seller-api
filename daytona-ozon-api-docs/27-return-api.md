# Return API

Return API для управления процессами возврата с 8 методами для работы с возвратными отгрузками и штрихкодами.

## Обзор

Return API предоставляет инструменты для управления возвратными отгрузками, генерации штрихкодов и получения аналитики по возвратам.

**Основные возможности:**
- 📋 Управление возвратными отгрузками
- 🔍 Генерация и управление штрихкодами
- 📊 Получение информации о возвратах FBS
- 📄 Экспорт штрихкодов в PDF и PNG форматах
- ⚙️ Проверка доступности функций возврата
- 📈 Аналитика возвратов по периодам

## Доступные методы

### Управление штрихкодами

**getGiveoutBarcode()** - Получить значение штрихкода
```typescript
const barcode = await returnApi.getGiveoutBarcode();
```

**resetGiveoutBarcode()** - Сгенерировать новый штрихкод
```typescript
const newBarcode = await returnApi.resetGiveoutBarcode();
```

**getGiveoutPDF()** - Получить штрихкод в PDF формате
```typescript
const pdfBarcode = await returnApi.getGiveoutPDF();
```

**getGiveoutPNG()** - Получить штрихкод в PNG формате
```typescript
const pngBarcode = await returnApi.getGiveoutPNG();
```

### Управление возвратными отгрузками

**getGiveoutInfo(request)** - Информация о возвратной отгрузке
```typescript
const giveoutInfo = await returnApi.getGiveoutInfo({
  giveout_id: 12345
});
```

**getGiveoutList(request?)** - Список возвратных отгрузок
```typescript
const giveouts = await returnApi.getGiveoutList({
  limit: 100
});
```

**isGiveoutEnabled()** - Проверить доступность функции
```typescript
const isEnabled = await returnApi.isGiveoutEnabled();
```

### Аналитика возвратов

**getReturnsCompanyFbsInfo(request?)** - Информация о возвратах FBS
```typescript
const fbsInfo = await returnApi.getReturnsCompanyFbsInfo({
  date_from: '2024-01-01T00:00:00Z',
  date_to: '2024-01-31T23:59:59Z'
});
```

## TypeScript интерфейсы

```typescript
// Основные запросы
interface GiveoutInfoRequest {
  giveout_id: number;
}

interface GiveoutListRequest {
  limit?: number;
  last_id?: number;
}

interface ReturnsCompanyFbsInfoRequest {
  date_from?: string;
  date_to?: string;
}

// Ответы
interface GiveoutGetBarcodeResponse {
  barcode: string;
  expiry_date: string;
}

interface GiveoutBarcodeResetResponse {
  barcode: string;
  png_data: string;
  expiry_date: string;
}

interface GiveoutGetPDFResponse {
  pdf_data: string;
  file_name: string;
}

interface GiveoutGetPNGResponse {
  png_data: string;
  file_name: string;
}

interface GiveoutInfoResponse {
  giveout_id: number;
  status: "PENDING" | "IN_PROCESS" | "COMPLETED" | "CANCELLED";
  created_at: string;
  updated_at: string;
  total_amount: string;
  currency_code: string;
  items: Array<{
    sku: number;
    offer_id: string;
    name: string;
    quantity: number;
    price: string;
    return_reason: string;
    return_reason_name: string;
    condition: "NEW" | "DAMAGED" | "USED";
    refund_amount: string;
    commission_amount: string;
  }>;
  delivery_info: {
    delivery_id: string;
    tracking_number: string;
    delivery_service: string;
    pickup_address: string;
    expected_pickup_date: string;
  };
}

interface GiveoutIsEnabledResponse {
  is_enabled: boolean;
  message?: string;
  restrictions?: Array<{
    type: string;
    description: string;
  }>;
}

interface GiveoutListResponse {
  giveouts: Array<{
    giveout_id: number;
    status: "PENDING" | "IN_PROCESS" | "COMPLETED" | "CANCELLED";
    created_at: string;
    updated_at: string;
    items_count: number;
    total_amount: string;
    currency_code: string;
    delivery_service: string;
    tracking_number?: string;
  }>;
  total: number;
  has_next: boolean;
  last_id?: number;
}

interface ReturnsCompanyFbsInfoResponse {
  returns_info: Array<{
    date: string;
    count: number;
    amount: string;
    currency_code: string;
    return_reasons: Array<{
      reason: string;
      reason_name: string;
      count: number;
      amount: string;
    }>;
  }>;
  total_returns: number;
  total_amount: string;
  currency_code: string;
}
```

## Примеры использования

### Настройка штрихкода для возвратов
```typescript
// Проверка доступности функции возврата
const giveoutStatus = await returnApi.isGiveoutEnabled();

if (!giveoutStatus.is_enabled) {
  console.log("❌ Функция возвратных отгрузок недоступна");
  if (giveoutStatus.restrictions) {
    console.log("Ограничения:");
    giveoutStatus.restrictions.forEach(restriction => {
      console.log(`  - ${restriction.type}: ${restriction.description}`);
    });
  }
  return;
}

console.log("✅ Функция возвратных отгрузок доступна");

// Получение текущего штрихкода
let barcodeInfo = await returnApi.getGiveoutBarcode();
console.log(`Текущий штрихкод: ${barcodeInfo.barcode}`);
console.log(`Срок действия: ${barcodeInfo.expiry_date}`);

// Проверка срока действия штрихкода
const expiryDate = new Date(barcodeInfo.expiry_date);
const now = new Date();
const daysUntilExpiry = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

if (daysUntilExpiry < 7) {
  console.log(`⚠️ Штрихкод истекает через ${daysUntilExpiry} дней - генерируем новый`);
  
  const newBarcodeInfo = await returnApi.resetGiveoutBarcode();
  console.log(`✅ Новый штрихкод: ${newBarcodeInfo.barcode}`);
  console.log(`Новый срок действия: ${newBarcodeInfo.expiry_date}`);
  
  // Сохранение PNG версии нового штрихкода
  const pngData = Buffer.from(newBarcodeInfo.png_data, 'base64');
  console.log(`📁 PNG штрихкод размером: ${pngData.length} байт`);
}

// Получение штрихкода в различных форматах
const pdfBarcode = await returnApi.getGiveoutPDF();
const pngBarcode = await returnApi.getGiveoutPNG();

console.log(`📄 PDF штрихкод: ${pdfBarcode.file_name}`);
console.log(`🖼️ PNG штрихкод: ${pngBarcode.file_name}`);

// Сохранение файлов (пример)
const fs = require('fs');
fs.writeFileSync('return-barcode.pdf', Buffer.from(pdfBarcode.pdf_data, 'base64'));
fs.writeFileSync('return-barcode.png', Buffer.from(pngBarcode.png_data, 'base64'));

console.log("✅ Штрихкоды сохранены в файлы");
```

### Мониторинг возвратных отгрузок
```typescript
// Получение всех активных возвратных отгрузок
let allGiveouts: any[] = [];
let lastId: number | undefined;

do {
  const giveouts = await returnApi.getGiveoutList({
    limit: 100,
    last_id: lastId
  });

  allGiveouts.push(...giveouts.giveouts);
  lastId = giveouts.has_next ? giveouts.last_id : undefined;

  console.log(`Загружено отгрузок: ${allGiveouts.length} из ${giveouts.total}`);

} while (lastId);

console.log(`\n=== Анализ ${allGiveouts.length} возвратных отгрузок ===`);

// Группировка по статусам
const statusGroups = allGiveouts.reduce((groups, giveout) => {
  const status = giveout.status;
  if (!groups[status]) {
    groups[status] = [];
  }
  groups[status].push(giveout);
  return groups;
}, {} as Record<string, any[]>);

Object.entries(statusGroups).forEach(([status, giveouts]) => {
  const totalAmount = giveouts.reduce((sum, g) => sum + parseFloat(g.total_amount), 0);
  const totalItems = giveouts.reduce((sum, g) => sum + g.items_count, 0);
  
  console.log(`\n${status}: ${giveouts.length} отгрузок`);
  console.log(`  Общая сумма: ${totalAmount.toFixed(2)} руб`);
  console.log(`  Общее количество товаров: ${totalItems}`);
});

// Анализ отгрузок, требующих внимания
const pendingGiveouts = statusGroups['PENDING'] || [];
const inProcessGiveouts = statusGroups['IN_PROCESS'] || [];

if (pendingGiveouts.length > 0) {
  console.log(`\n⏳ Ожидающие обработки: ${pendingGiveouts.length}`);
  
  // Показываем самые старые ожидающие отгрузки
  const oldestPending = pendingGiveouts
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    .slice(0, 5);

  oldestPending.forEach(giveout => {
    const daysWaiting = Math.floor((Date.now() - new Date(giveout.created_at).getTime()) / (1000 * 60 * 60 * 24));
    console.log(`  - Отгрузка ${giveout.giveout_id}: ожидает ${daysWaiting} дней (${giveout.items_count} товаров)`);
  });
}

if (inProcessGiveouts.length > 0) {
  console.log(`\n🔄 В процессе: ${inProcessGiveouts.length}`);
}
```

### Детальный анализ возвратной отгрузки
```typescript
// Получение детальной информации о конкретной отгрузке
const giveoutId = 12345;
const giveoutInfo = await returnApi.getGiveoutInfo({ giveout_id: giveoutId });

console.log(`\n=== Детали отгрузки ${giveoutId} ===`);
console.log(`Статус: ${giveoutInfo.status}`);
console.log(`Создана: ${giveoutInfo.created_at}`);
console.log(`Обновлена: ${giveoutInfo.updated_at}`);
console.log(`Общая сумма: ${giveoutInfo.total_amount} ${giveoutInfo.currency_code}`);

// Информация о доставке
if (giveoutInfo.delivery_info) {
  console.log(`\nДоставка:`);
  console.log(`  Служба доставки: ${giveoutInfo.delivery_info.delivery_service}`);
  console.log(`  Трек-номер: ${giveoutInfo.delivery_info.tracking_number}`);
  console.log(`  Адрес забора: ${giveoutInfo.delivery_info.pickup_address}`);
  console.log(`  Ожидаемая дата забора: ${giveoutInfo.delivery_info.expected_pickup_date}`);
}

// Анализ товаров в отгрузке
console.log(`\nТовары (${giveoutInfo.items.length}):`);

const reasonCounts = new Map<string, number>();
const conditionCounts = new Map<string, number>();
let totalRefund = 0;
let totalCommission = 0;

giveoutInfo.items.forEach(item => {
  console.log(`\n  ${item.name} (${item.offer_id})`);
  console.log(`    SKU: ${item.sku}`);
  console.log(`    Количество: ${item.quantity}`);
  console.log(`    Цена: ${item.price} руб`);
  console.log(`    Причина возврата: ${item.return_reason_name}`);
  console.log(`    Состояние: ${item.condition}`);
  console.log(`    Возврат: ${item.refund_amount} руб`);
  console.log(`    Комиссия: ${item.commission_amount} руб`);

  // Статистика
  reasonCounts.set(item.return_reason_name, (reasonCounts.get(item.return_reason_name) || 0) + 1);
  conditionCounts.set(item.condition, (conditionCounts.get(item.condition) || 0) + 1);
  totalRefund += parseFloat(item.refund_amount);
  totalCommission += parseFloat(item.commission_amount);
});

console.log(`\n=== Статистика по отгрузке ===`);
console.log(`Общая сумма возврата: ${totalRefund.toFixed(2)} руб`);
console.log(`Общая комиссия: ${totalCommission.toFixed(2)} руб`);

console.log(`\nПричины возврата:`);
reasonCounts.forEach((count, reason) => {
  console.log(`  ${reason}: ${count} товаров`);
});

console.log(`\nСостояние товаров:`);
conditionCounts.forEach((count, condition) => {
  console.log(`  ${condition}: ${count} товаров`);
});
```

### Аналитика возвратов FBS
```typescript
// Получение аналитики возвратов за последние 3 месяца
const threeMonthsAgo = new Date();
threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

const fbsReturnsInfo = await returnApi.getReturnsCompanyFbsInfo({
  date_from: threeMonthsAgo.toISOString(),
  date_to: new Date().toISOString()
});

console.log(`\n=== Аналитика возвратов FBS ===`);
console.log(`Общее количество возвратов: ${fbsReturnsInfo.total_returns}`);
console.log(`Общая сумма возвратов: ${fbsReturnsInfo.total_amount} ${fbsReturnsInfo.currency_code}`);

// Анализ по дням
console.log(`\nДетализация по дням:`);
fbsReturnsInfo.returns_info.forEach(dayInfo => {
  const date = new Date(dayInfo.date).toLocaleDateString('ru-RU');
  console.log(`\n${date}:`);
  console.log(`  Возвратов: ${dayInfo.count}`);
  console.log(`  Сумма: ${dayInfo.amount} ${dayInfo.currency_code}`);
  
  if (dayInfo.return_reasons.length > 0) {
    console.log(`  Причины возвратов:`);
    dayInfo.return_reasons
      .sort((a, b) => b.count - a.count)
      .forEach(reason => {
        console.log(`    ${reason.reason_name}: ${reason.count} (${reason.amount} руб)`);
      });
  }
});

// Статистика по причинам возвратов
const allReasons = new Map<string, { count: number; amount: number }>();

fbsReturnsInfo.returns_info.forEach(dayInfo => {
  dayInfo.return_reasons.forEach(reason => {
    const existing = allReasons.get(reason.reason_name) || { count: 0, amount: 0 };
    existing.count += reason.count;
    existing.amount += parseFloat(reason.amount);
    allReasons.set(reason.reason_name, existing);
  });
});

console.log(`\n=== Топ причин возвратов ===`);
const sortedReasons = Array.from(allReasons.entries())
  .sort((a, b) => b[1].count - a[1].count)
  .slice(0, 10);

sortedReasons.forEach(([reason, stats], index) => {
  const percentage = (stats.count / fbsReturnsInfo.total_returns * 100).toFixed(1);
  console.log(`${index + 1}. ${reason}:`);
  console.log(`   ${stats.count} возвратов (${percentage}%)`);
  console.log(`   ${stats.amount.toFixed(2)} руб`);
});

// Анализ трендов
const dailyStats = fbsReturnsInfo.returns_info.map(day => ({
  date: day.date,
  count: day.count,
  amount: parseFloat(day.amount)
})).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

if (dailyStats.length > 7) {
  const lastWeekAvg = dailyStats.slice(-7).reduce((sum, day) => sum + day.count, 0) / 7;
  const previousWeekAvg = dailyStats.slice(-14, -7).reduce((sum, day) => sum + day.count, 0) / 7;
  const trendChange = ((lastWeekAvg - previousWeekAvg) / previousWeekAvg * 100);
  
  console.log(`\n=== Анализ трендов ===`);
  console.log(`Средние возвраты за последнюю неделю: ${lastWeekAvg.toFixed(1)} в день`);
  console.log(`Средние возвраты за предыдущую неделю: ${previousWeekAvg.toFixed(1)} в день`);
  
  if (trendChange > 10) {
    console.log(`📈 Рост возвратов: +${trendChange.toFixed(1)}% - требует внимания`);
  } else if (trendChange < -10) {
    console.log(`📉 Снижение возвратов: ${trendChange.toFixed(1)}%`);
  } else {
    console.log(`➡️ Стабильный уровень возвратов: ${trendChange.toFixed(1)}%`);
  }
}
```

## Сложные сценарии

### ReturnWorkflowManager - Система управления возвратами
```typescript
class ReturnWorkflowManager {
  constructor(private api: ReturnApi) {}

  async processReturnWorkflow(): Promise<ReturnWorkflowResult> {
    console.log("🔄 Запуск процесса управления возвратами...");

    // 1. Проверка доступности функций
    const systemCheck = await this.checkSystemAvailability();
    
    // 2. Обновление штрихкодов при необходимости
    const barcodeManagement = await this.manageBarcodes();
    
    // 3. Обработка активных отгрузок
    const giveoutProcessing = await this.processActiveGiveouts();
    
    // 4. Анализ возвратов и генерация отчетов
    const analytics = await this.generateReturnAnalytics();
    
    // 5. Генерация рекомендаций
    const recommendations = this.generateRecommendations(analytics);

    return {
      timestamp: new Date().toISOString(),
      system_status: systemCheck,
      barcode_management: barcodeManagement,
      giveout_processing: giveoutProcessing,
      analytics,
      recommendations
    };
  }

  private async checkSystemAvailability(): Promise<SystemStatus> {
    const enabledStatus = await this.api.isGiveoutEnabled();
    
    return {
      is_available: enabledStatus.is_enabled,
      message: enabledStatus.message,
      restrictions: enabledStatus.restrictions || [],
      health_score: enabledStatus.is_enabled ? 100 : 0
    };
  }

  private async manageBarcodes(): Promise<BarcodeManagement> {
    // Получение текущего штрихкода
    const currentBarcode = await this.api.getGiveoutBarcode();
    const expiryDate = new Date(currentBarcode.expiry_date);
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    
    let barcodeUpdate: BarcodeUpdate | null = null;

    // Проверка необходимости обновления штрихкода
    if (daysUntilExpiry < 7) {
      console.log(`⚠️ Штрихкод истекает через ${daysUntilExpiry} дней - обновление...`);
      
      const newBarcodeInfo = await this.api.resetGiveoutBarcode();
      
      // Сохранение новых штрихкодов
      const [pdfBarcode, pngBarcode] = await Promise.all([
        this.api.getGiveoutPDF(),
        this.api.getGiveoutPNG()
      ]);

      barcodeUpdate = {
        old_barcode: currentBarcode.barcode,
        new_barcode: newBarcodeInfo.barcode,
        new_expiry: newBarcodeInfo.expiry_date,
        pdf_generated: !!pdfBarcode.pdf_data,
        png_generated: !!pngBarcode.png_data,
        updated_at: new Date().toISOString()
      };

      console.log(`✅ Штрихкод обновлен: ${newBarcodeInfo.barcode}`);
    }

    return {
      current_barcode: currentBarcode.barcode,
      expiry_date: currentBarcode.expiry_date,
      days_until_expiry: daysUntilExpiry,
      requires_update: daysUntilExpiry < 7,
      update_performed: !!barcodeUpdate,
      update_details: barcodeUpdate
    };
  }

  private async processActiveGiveouts(): Promise<GiveoutProcessingResult> {
    // Получение всех активных отгрузок
    const giveouts = await this.getAllGiveouts();
    
    // Группировка по статусам
    const statusGroups = this.groupGiveoutsByStatus(giveouts);
    
    // Обработка проблемных отгрузок
    const problemGiveouts = await this.identifyProblemGiveouts(giveouts);
    
    // Анализ производительности
    const performanceMetrics = this.calculateGiveoutPerformance(giveouts);

    return {
      total_giveouts: giveouts.length,
      status_breakdown: statusGroups,
      problem_giveouts: problemGiveouts,
      performance_metrics: performanceMetrics,
      recommendations: this.generateGiveoutRecommendations(statusGroups, problemGiveouts)
    };
  }

  private async generateReturnAnalytics(): Promise<ReturnAnalytics> {
    // Получение данных за последние 30 дней
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const fbsInfo = await this.api.getReturnsCompanyFbsInfo({
      date_from: thirtyDaysAgo.toISOString(),
      date_to: new Date().toISOString()
    });

    // Анализ трендов
    const trendAnalysis = this.analyzeTrends(fbsInfo.returns_info);
    
    // Анализ причин возвратов
    const reasonAnalysis = this.analyzeReturnReasons(fbsInfo.returns_info);
    
    // Расчет ключевых метрик
    const keyMetrics = this.calculateReturnMetrics(fbsInfo);

    return {
      period: "30 days",
      total_returns: fbsInfo.total_returns,
      total_amount: parseFloat(fbsInfo.total_amount),
      currency: fbsInfo.currency_code,
      trend_analysis: trendAnalysis,
      reason_analysis: reasonAnalysis,
      key_metrics: keyMetrics
    };
  }

  private generateRecommendations(analytics: ReturnAnalytics): Recommendation[] {
    const recommendations: Recommendation[] = [];

    // Анализ уровня возвратов
    if (analytics.key_metrics.return_rate > 0.15) {
      recommendations.push({
        type: 'HIGH_RETURN_RATE',
        priority: 'HIGH',
        title: 'Высокий уровень возвратов',
        description: `Уровень возвратов составляет ${(analytics.key_metrics.return_rate * 100).toFixed(1)}%`,
        actions: [
          'Улучшить качество описаний товаров',
          'Проанализировать основные причины возвратов',
          'Рассмотреть улучшение упаковки'
        ],
        expected_impact: 'Снижение возвратов на 20-30%'
      });
    }

    // Анализ трендов
    if (analytics.trend_analysis.weekly_growth > 0.2) {
      recommendations.push({
        type: 'GROWING_RETURNS',
        priority: 'MEDIUM',
        title: 'Растущий тренд возвратов',
        description: `Возвраты выросли на ${(analytics.trend_analysis.weekly_growth * 100).toFixed(1)}% за неделю`,
        actions: [
          'Провести углубленный анализ причин роста',
          'Проверить изменения в ассортименте',
          'Оценить качество новых поставщиков'
        ],
        expected_impact: 'Стабилизация уровня возвратов'
      });
    }

    return recommendations.sort((a, b) => {
      const priorityOrder = { 'HIGH': 3, 'MEDIUM': 2, 'LOW': 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }
}

interface ReturnWorkflowResult {
  timestamp: string;
  system_status: SystemStatus;
  barcode_management: BarcodeManagement;
  giveout_processing: GiveoutProcessingResult;
  analytics: ReturnAnalytics;
  recommendations: Recommendation[];
}

interface BarcodeManagement {
  current_barcode: string;
  expiry_date: string;
  days_until_expiry: number;
  requires_update: boolean;
  update_performed: boolean;
  update_details: BarcodeUpdate | null;
}

interface ReturnAnalytics {
  period: string;
  total_returns: number;
  total_amount: number;
  currency: string;
  trend_analysis: TrendAnalysis;
  reason_analysis: ReasonAnalysis;
  key_metrics: ReturnMetrics;
}
```

### SmartBarcodeManager - Умный менеджер штрихкодов
```typescript
class SmartBarcodeManager {
  private readonly warningThresholdDays = 7;
  private readonly criticalThresholdDays = 3;

  constructor(private api: ReturnApi) {}

  async maintainBarcodeHealth(): Promise<BarcodeHealthReport> {
    // Проверка текущего состояния штрихкода
    const currentStatus = await this.checkBarcodeStatus();
    
    // Автоматическое обновление при необходимости
    const updateResult = await this.performAutomaticUpdate(currentStatus);
    
    // Генерация и сохранение файлов штрихкодов
    const fileGeneration = await this.generateBarcodeFiles();
    
    // Планирование следующего обслуживания
    const maintenanceSchedule = this.planNextMaintenance(updateResult?.new_expiry || currentStatus.expiry_date);

    return {
      current_status: currentStatus,
      update_result: updateResult,
      file_generation: fileGeneration,
      maintenance_schedule: maintenanceSchedule,
      health_score: this.calculateHealthScore(currentStatus, updateResult)
    };
  }

  private async checkBarcodeStatus(): Promise<BarcodeStatus> {
    const barcodeInfo = await this.api.getGiveoutBarcode();
    const expiryDate = new Date(barcodeInfo.expiry_date);
    const now = new Date();
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    let status: 'HEALTHY' | 'WARNING' | 'CRITICAL' | 'EXPIRED';
    
    if (daysUntilExpiry < 0) {
      status = 'EXPIRED';
    } else if (daysUntilExpiry <= this.criticalThresholdDays) {
      status = 'CRITICAL';
    } else if (daysUntilExpiry <= this.warningThresholdDays) {
      status = 'WARNING';
    } else {
      status = 'HEALTHY';
    }

    return {
      barcode: barcodeInfo.barcode,
      expiry_date: barcodeInfo.expiry_date,
      days_until_expiry: daysUntilExpiry,
      status,
      requires_immediate_action: status === 'EXPIRED' || status === 'CRITICAL'
    };
  }

  private async performAutomaticUpdate(status: BarcodeStatus): Promise<BarcodeUpdateResult | null> {
    if (!status.requires_immediate_action && status.days_until_expiry > this.warningThresholdDays) {
      return null;
    }

    console.log(`🔄 Автоматическое обновление штрихкода (статус: ${status.status})`);
    
    try {
      const updateResult = await this.api.resetGiveoutBarcode();
      
      console.log(`✅ Штрихкод успешно обновлен: ${updateResult.barcode}`);
      
      return {
        success: true,
        old_barcode: status.barcode,
        new_barcode: updateResult.barcode,
        new_expiry: updateResult.expiry_date,
        updated_at: new Date().toISOString(),
        png_data: updateResult.png_data
      };
      
    } catch (error) {
      console.error(`❌ Ошибка обновления штрихкода:`, error);
      
      return {
        success: false,
        old_barcode: status.barcode,
        error_message: error.message,
        updated_at: new Date().toISOString()
      };
    }
  }

  private async generateBarcodeFiles(): Promise<FileGenerationResult> {
    const results: FileGenerationResult = {
      pdf_generated: false,
      png_generated: false,
      files: []
    };

    try {
      // Генерация PDF версии
      const pdfBarcode = await this.api.getGiveoutPDF();
      if (pdfBarcode.pdf_data) {
        results.pdf_generated = true;
        results.files.push({
          type: 'PDF',
          name: pdfBarcode.file_name,
          size: Buffer.from(pdfBarcode.pdf_data, 'base64').length,
          data: pdfBarcode.pdf_data
        });
        console.log(`📄 PDF штрихкод сгенерирован: ${pdfBarcode.file_name}`);
      }

      // Генерация PNG версии
      const pngBarcode = await this.api.getGiveoutPNG();
      if (pngBarcode.png_data) {
        results.png_generated = true;
        results.files.push({
          type: 'PNG',
          name: pngBarcode.file_name,
          size: Buffer.from(pngBarcode.png_data, 'base64').length,
          data: pngBarcode.png_data
        });
        console.log(`🖼️ PNG штрихкод сгенерирован: ${pngBarcode.file_name}`);
      }

      results.success = results.pdf_generated && results.png_generated;

    } catch (error) {
      console.error(`❌ Ошибка генерации файлов штрихкода:`, error);
      results.success = false;
      results.error_message = error.message;
    }

    return results;
  }

  private planNextMaintenance(expiryDate: string): MaintenanceSchedule {
    const expiry = new Date(expiryDate);
    const warningDate = new Date(expiry.getTime() - this.warningThresholdDays * 24 * 60 * 60 * 1000);
    const criticalDate = new Date(expiry.getTime() - this.criticalThresholdDays * 24 * 60 * 60 * 1000);

    return {
      next_check_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // ежедневная проверка
      warning_date: warningDate.toISOString(),
      critical_date: criticalDate.toISOString(),
      expiry_date: expiryDate,
      automated_update_enabled: true
    };
  }

  private calculateHealthScore(status: BarcodeStatus, updateResult: BarcodeUpdateResult | null): number {
    let score = 100;

    // Снижение за близость к истечению
    if (status.days_until_expiry < this.criticalThresholdDays) {
      score -= 40;
    } else if (status.days_until_expiry < this.warningThresholdDays) {
      score -= 20;
    }

    // Бонус за успешное обновление
    if (updateResult?.success) {
      score = Math.min(100, score + 20);
    }

    // Штраф за неудачное обновление
    if (updateResult && !updateResult.success) {
      score -= 30;
    }

    return Math.max(0, score);
  }
}

interface BarcodeHealthReport {
  current_status: BarcodeStatus;
  update_result: BarcodeUpdateResult | null;
  file_generation: FileGenerationResult;
  maintenance_schedule: MaintenanceSchedule;
  health_score: number;
}

interface BarcodeStatus {
  barcode: string;
  expiry_date: string;
  days_until_expiry: number;
  status: 'HEALTHY' | 'WARNING' | 'CRITICAL' | 'EXPIRED';
  requires_immediate_action: boolean;
}
```

## Обработка ошибок

```typescript
try {
  const giveoutInfo = await returnApi.getGiveoutInfo({
    giveout_id: 12345
  });
  
  console.log("Информация о возвратной отгрузке получена");
} catch (error) {
  if (error.response?.status === 404) {
    console.error("Возвратная отгрузка не найдена");
  } else if (error.response?.status === 403) {
    console.error("Недостаточно прав для доступа к возвратам");
  } else if (error.response?.status === 400) {
    console.error("Некорректные параметры запроса:", error.response.data);
  } else {
    console.error("Неожиданная ошибка:", error.message);
  }
}
```

## Лучшие практики

### Автоматизация управления штрихкодами
```typescript
// Планировщик обслуживания штрихкодов
class BarcodeMaintenanceScheduler {
  private maintenanceJob: NodeJS.Timeout | null = null;

  startAutomaticMaintenance(): void {
    // Ежедневная проверка в 9:00
    this.maintenanceJob = setInterval(async () => {
      const now = new Date();
      if (now.getHours() === 9 && now.getMinutes() === 0) {
        await this.performDailyMaintenance();
      }
    }, 60 * 1000); // проверяем каждую минуту
  }

  private async performDailyMaintenance(): Promise<void> {
    console.log("🕘 Запуск ежедневного обслуживания штрихкодов...");
    
    const manager = new SmartBarcodeManager(returnApi);
    const healthReport = await manager.maintainBarcodeHealth();
    
    if (healthReport.health_score < 80) {
      console.log(`⚠️ Низкий показатель здоровья штрихкода: ${healthReport.health_score}`);
      // Отправить уведомление администратору
    }
  }

  stopAutomaticMaintenance(): void {
    if (this.maintenanceJob) {
      clearInterval(this.maintenanceJob);
      this.maintenanceJob = null;
      console.log("⏹️ Автоматическое обслуживание остановлено");
    }
  }
}
```

### Мониторинг производительности возвратов
```typescript
// Система мониторинга KPI возвратов
class ReturnKPIMonitor {
  async generateKPIDashboard(): Promise<ReturnKPIDashboard> {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const fbsInfo = await returnApi.getReturnsCompanyFbsInfo({
      date_from: thirtyDaysAgo.toISOString(),
      date_to: new Date().toISOString()
    });

    return {
      return_rate: this.calculateReturnRate(fbsInfo),
      avg_return_value: this.calculateAverageReturnValue(fbsInfo),
      processing_time: await this.calculateProcessingTime(),
      top_return_reasons: this.getTopReturnReasons(fbsInfo),
      monthly_trend: this.calculateMonthlyTrend(fbsInfo),
      quality_score: this.calculateQualityScore(fbsInfo)
    };
  }

  private calculateReturnRate(fbsInfo: any): number {
    // Примерный расчет на основе средних показателей
    return fbsInfo.total_returns / 1000; // предполагаемые продажи
  }
}
```

## Интеграционные заметки

- **FBS Compatibility**: Штрихкоды работают только для схемы FBS
- **Barcode Expiry**: Штрихкоды имеют ограниченный срок действия
- **File Formats**: Поддерживаются форматы PDF и PNG для штрихкодов
- **Rate Limiting**: API поддерживает до 100 запросов в минуту
- **Data Retention**: Информация о возвратах хранится до 1 года
- **Real-time Updates**: Статусы возвратных отгрузок обновляются в реальном времени
- **Integration Support**: API интегрируется с системами логистики и учета
- **Security**: Штрихкоды содержат зашифрованную информацию для безопасности