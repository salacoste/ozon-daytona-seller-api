# Warehouse Operations API

Подробная документация по управлению складскими операциями OZON с полной типизацией TypeScript.

**🏪 СКЛАДСКОЕ УПРАВЛЕНИЕ** — Детальное описание всех методов работы со складами FBS и rFBS.

## 📋 Методы складских операций

### 1. getWarehousesList() — Получение списка складов

Основной метод для получения полной информации обо всех складах продавца.

**Зачем нужен:**
- **Инвентаризация складских ресурсов**: Полный аудит доступных складских мощностей
- **Планирование логистики**: Выбор оптимальных складов для различных регионов
- **Контроль статусов**: Мониторинг работоспособности складских комплексов
- **Настройка работы**: Анализ ограничений и возможностей каждого склада

**TypeScript Interface:**
```typescript
interface WarehouseListRequest {
  readonly [key: string]: unknown;
}

interface WarehouseListResponse {
  /** Список складов */
  result?: Warehouse[];
  readonly [key: string]: unknown;
}

interface Warehouse {
  /** Возможность печати акта приёма-передачи заранее */
  can_print_act_in_advance?: boolean;
  
  /** Первая миля FBS */
  first_mile_type?: WarehouseFirstMileType;
  
  /** Признак доверительной приёмки */
  has_entrusted_acceptance?: boolean;
  
  /** Признак наличия лимита минимального количества заказов */
  has_postings_limit?: boolean;
  
  /** `true`, если склад работает с эконом-товарами */
  is_economy?: boolean;
  
  /** Признак, что склад не работает из-за карантина */
  is_karantin?: boolean;
  
  /** Признак, что склад принимает крупногабаритные товары */
  is_kgt?: boolean;
  
  /** Признак работы склада по схеме rFBS */
  is_rfbs?: boolean;
  
  /** Признак, что можно менять расписание работы складов */
  is_timetable_editable?: boolean;
  
  /** Минимальное значение лимита */
  min_postings_limit?: number;
  
  /** Количество рабочих дней склада */
  min_working_days?: number;
  
  /** Название склада */
  name?: string;
  
  /** Значение лимита (-1, если лимита нет) */
  postings_limit?: number;
  
  /** 
   * Статус склада:
   * - `new` — Активируется
   * - `created` — Активный
   * - `disabled` — В архиве
   * - `blocked` — Заблокирован
   * - `disabled_due_to_limit` — На паузе
   * - `error` — Ошибка
   */
  status?: 'new' | 'created' | 'disabled' | 'blocked' | 'disabled_due_to_limit' | 'error';
  
  /** Идентификатор склада */
  warehouse_id?: number;
  
  /** 
   * Рабочие дни склада
   * Дни недели от 1 (понедельник) до 7 (воскресенье)
   */
  working_days?: ('1' | '2' | '3' | '4' | '5' | '6' | '7')[];
  
  readonly [key: string]: unknown;
}

interface WarehouseFirstMileType {
  /** Идентификатор DropOff-точки */
  dropoff_point_id?: string;
  
  /** Идентификатор временного слота для DropOff */
  dropoff_timeslot_id?: number;
  
  /** Признак, что настройки склада обновляются */
  first_mile_is_changing?: boolean;
  
  /** 
   * Тип первой мили:
   * - `DropOff` — доставка в точку
   * - `Pickup` — самовывоз
   */
  first_mile_type?: 'DropOff' | 'Pickup';
  
  readonly [key: string]: unknown;
}
```

**Практический пример:**
```typescript
import { WarehouseApi } from 'daytona-ozon-seller-api';

const warehouseApi = new WarehouseApi(httpClient);

// Получение полного списка складов
const warehouses = await warehouseApi.getWarehousesList();

console.log(`📦 Найдено складов: ${warehouses.result?.length}`);

// Анализ каждого склада
warehouses.result?.forEach(warehouse => {
  console.log(`\n🏪 ${warehouse.name} (ID: ${warehouse.warehouse_id})`);
  
  // Статус и тип склада
  console.log(`   📊 Статус: ${getStatusName(warehouse.status)}`);
  console.log(`   🚀 Тип: ${warehouse.is_rfbs ? 'rFBS (региональный)' : 'FBS (продавца)'}`);
  
  // Возможности склада
  const capabilities = [];
  if (warehouse.is_economy) capabilities.push('Эконом товары');
  if (warehouse.is_kgt) capabilities.push('КГТ товары');
  if (warehouse.is_karantin) capabilities.push('Карантинные товары');
  if (warehouse.has_entrusted_acceptance) capabilities.push('Доверительная приемка');
  
  console.log(`   💼 Возможности: ${capabilities.join(', ') || 'Стандартные'}`);
  
  // Лимиты отправлений
  if (warehouse.has_postings_limit) {
    console.log(`   📦 Лимит отправлений: ${warehouse.postings_limit} (минимум: ${warehouse.min_postings_limit})`);
  } else {
    console.log(`   📦 Лимит отправлений: не установлен`);
  }
  
  // Рабочее расписание
  if (warehouse.working_days?.length) {
    const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    const workingDayNames = warehouse.working_days.map(day => dayNames[parseInt(day) - 1]);
    console.log(`   📅 Рабочие дни: ${workingDayNames.join(', ')}`);
    console.log(`   📅 Минимум дней: ${warehouse.min_working_days}`);
  }
  
  // Настройки первой мили
  if (warehouse.first_mile_type) {
    console.log(`   🚚 Первая миля: ${warehouse.first_mile_type.first_mile_type}`);
    if (warehouse.first_mile_type.first_mile_is_changing) {
      console.log(`   ⚠️ Настройки обновляются`);
    }
    if (warehouse.first_mile_type.dropoff_point_id) {
      console.log(`   📍 DropOff точка: ${warehouse.first_mile_type.dropoff_point_id}`);
    }
  }
  
  // Дополнительные возможности
  console.log(`   📋 Печать актов заранее: ${warehouse.can_print_act_in_advance ? 'Да' : 'Нет'}`);
  console.log(`   ⏰ Изменение расписания: ${warehouse.is_timetable_editable ? 'Разрешено' : 'Запрещено'}`);
});

// Утилита для человекочитаемых статусов
function getStatusName(status?: string): string {
  const statusMap = {
    'new': 'Активируется ⏳',
    'created': 'Активный ✅',
    'disabled': 'В архиве 📁',
    'blocked': 'Заблокирован 🚫',
    'disabled_due_to_limit': 'На паузе ⏸️',
    'error': 'Ошибка ❌'
  };
  return statusMap[status as keyof typeof statusMap] || status || 'Неизвестно';
}
```

### 2. getDeliveryMethods() — Получение методов доставки

Метод для получения всех доступных методов доставки для указанного склада с возможностью фильтрации.

**Зачем нужен:**
- **Настройка логистики**: Выбор оптимальных методов доставки для каждого склада
- **Мониторинг доступности**: Отслеживание активности служб доставки
- **Управление SLA**: Контроль времени сборки и cutoff времени
- **Оптимизация затрат**: Анализ доступных поставщиков логистических услуг

**TypeScript Interface:**
```typescript
interface WarehouseDeliveryMethodListRequest {
  /** 
   * Количество элементов в ответе
   * Максимум — 50, минимум — 1
   */
  limit: number;
  
  /** 
   * Количество элементов, которое будет пропущено в ответе
   * Для пагинации результатов
   */
  offset?: number;
  
  /** Фильтр для поиска методов доставки */
  filter?: DeliveryMethodListRequestFilter;
  
  readonly [key: string]: unknown;
}

interface DeliveryMethodListRequestFilter {
  /** Идентификатор службы доставки */
  provider_id?: number;
  
  /** 
   * Статус метода доставки:
   * - `NEW` — создан
   * - `EDITED` — редактируется
   * - `ACTIVE` — активный
   * - `DISABLED` — неактивный
   */
  status?: 'NEW' | 'EDITED' | 'ACTIVE' | 'DISABLED';
  
  /** 
   * Идентификатор склада
   * Можно получить с помощью getWarehousesList()
   */
  warehouse_id?: number;
  
  readonly [key: string]: unknown;
}

interface WarehouseDeliveryMethodListResponse {
  /** 
   * Признак, что в запросе вернулась только часть методов доставки
   * - `true` — используйте offset для получения остальных методов
   * - `false` — ответ содержит все методы доставки по запросу
   */
  has_next?: boolean;
  
  /** Результат запроса */
  result?: WarehouseDeliveryMethod[];
  
  readonly [key: string]: unknown;
}

interface WarehouseDeliveryMethod {
  /** Идентификатор продавца */
  company_id?: number;
  
  /** Дата и время создания метода доставки */
  created_at?: string;
  
  /** Время, до которого продавцу нужно собрать заказ */
  cutoff?: string;
  
  /** Идентификатор метода доставки */
  id?: number;
  
  /** Название метода доставки */
  name?: string;
  
  /** Идентификатор службы доставки */
  provider_id?: number;
  
  /** 
   * Минимальное время на сборку заказа в минутах
   * В соответствии с настройками склада
   */
  sla_cut_in?: number;
  
  /** 
   * Статус метода доставки:
   * - `NEW` — создан
   * - `EDITED` — редактируется
   * - `ACTIVE` — активный
   * - `DISABLED` — неактивный
   */
  status?: 'NEW' | 'EDITED' | 'ACTIVE' | 'DISABLED';
  
  /** Идентификатор услуги по доставке заказа */
  template_id?: number;
  
  /** Дата и время последнего обновления метода доставки */
  updated_at?: string;
  
  /** Идентификатор склада */
  warehouse_id?: number;
  
  readonly [key: string]: unknown;
}
```

**Практический пример:**
```typescript
import { WarehouseApi } from 'daytona-ozon-seller-api';

const warehouseApi = new WarehouseApi(httpClient);

// Сначала получаем список активных складов
const warehouses = await warehouseApi.getWarehousesList();
const activeWarehouses = warehouses.result?.filter(w => w.status === 'created');

if (activeWarehouses && activeWarehouses.length > 0) {
  const warehouseId = activeWarehouses[0].warehouse_id;
  
  console.log(`🚚 Анализ методов доставки для склада ${warehouseId}`);
  
  // Получение всех методов доставки с пагинацией
  let offset = 0;
  const limit = 20;
  let allMethods: WarehouseDeliveryMethod[] = [];
  
  do {
    const deliveryMethods = await warehouseApi.getDeliveryMethods({
      limit,
      offset,
      filter: {
        warehouse_id: warehouseId,
        status: 'ACTIVE' // Только активные методы
      }
    });
    
    if (deliveryMethods.result) {
      allMethods.push(...deliveryMethods.result);
    }
    
    console.log(`   📦 Загружено методов: ${deliveryMethods.result?.length}`);
    console.log(`   🔄 Есть еще данные: ${deliveryMethods.has_next ? 'Да' : 'Нет'}`);
    
    // Переход к следующей странице
    if (deliveryMethods.has_next) {
      offset += limit;
    } else {
      break;
    }
  } while (true);
  
  console.log(`\n📊 Всего найдено активных методов: ${allMethods.length}`);
  
  // Анализ методов доставки
  const methodsByProvider = new Map<number, WarehouseDeliveryMethod[]>();
  
  allMethods.forEach(method => {
    console.log(`\n📦 ${method.name} (ID: ${method.id})`);
    console.log(`   📊 Статус: ${getMethodStatusName(method.status)}`);
    console.log(`   🏢 Поставщик: ${method.provider_id}`);
    console.log(`   ⏰ Cutoff: ${method.cutoff || 'Не установлен'}`);
    console.log(`   🕐 SLA сборки: ${method.sla_cut_in} минут`);
    console.log(`   📅 Создан: ${formatDate(method.created_at)}`);
    console.log(`   🔄 Обновлен: ${formatDate(method.updated_at)}`);
    
    // Группировка по поставщикам
    if (method.provider_id) {
      if (!methodsByProvider.has(method.provider_id)) {
        methodsByProvider.set(method.provider_id, []);
      }
      methodsByProvider.get(method.provider_id)?.push(method);
    }
  });
  
  // Анализ по поставщикам
  console.log(`\n📈 Анализ по поставщикам доставки:`);
  methodsByProvider.forEach((methods, providerId) => {
    const avgCutoff = methods
      .filter(m => m.sla_cut_in)
      .reduce((sum, m) => sum + (m.sla_cut_in || 0), 0) / methods.length;
    
    console.log(`   🏢 Поставщик ${providerId}: ${methods.length} методов`);
    console.log(`   ⏱️ Среднее SLA: ${Math.round(avgCutoff)} минут`);
  });
  
  // Поиск методов с быстрой сборкой (менее 2 часов)
  const fastMethods = allMethods.filter(m => (m.sla_cut_in || 0) < 120);
  console.log(`\n⚡ Быстрые методы доставки (< 2 часа): ${fastMethods.length}`);
  
  fastMethods.forEach(method => {
    console.log(`   📦 ${method.name}: ${method.sla_cut_in} мин (cutoff: ${method.cutoff})`);
  });
}

// Утилиты для форматирования
function getMethodStatusName(status?: string): string {
  const statusMap = {
    'NEW': 'Создан 🆕',
    'EDITED': 'Редактируется ✏️',
    'ACTIVE': 'Активный ✅',
    'DISABLED': 'Неактивный ❌'
  };
  return statusMap[status as keyof typeof statusMap] || status || 'Неизвестно';
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return 'Не указано';
  return new Date(dateStr).toLocaleString('ru-RU');
}
```

## 🔧 Расширенные примеры использования

### Сценарий 1: Мониторинг складской сети

```typescript
// Комплексный мониторинг всех складов и методов доставки
class WarehouseMonitor {
  private warehouseApi: WarehouseApi;
  
  constructor(httpClient: HttpClient) {
    this.warehouseApi = new WarehouseApi(httpClient);
  }
  
  async generateFullReport(): Promise<WarehouseReport> {
    // Получение всех складов
    const warehouses = await this.warehouseApi.getWarehousesList();
    
    if (!warehouses.result) {
      throw new Error('Не удалось получить список складов');
    }
    
    const report: WarehouseReport = {
      totalWarehouses: warehouses.result.length,
      warehousesByStatus: {},
      warehousesByType: { fbs: 0, rfbs: 0 },
      capabilities: {
        economy: 0,
        kgt: 0,
        karantin: 0,
        entrustedAcceptance: 0
      },
      deliveryMethods: [],
      recommendations: []
    };
    
    // Анализ складов по статусам
    for (const warehouse of warehouses.result) {
      const status = warehouse.status || 'unknown';
      report.warehousesByStatus[status] = (report.warehousesByStatus[status] || 0) + 1;
      
      // Анализ типов складов
      if (warehouse.is_rfbs) {
        report.warehousesByType.rfbs++;
      } else {
        report.warehousesByType.fbs++;
      }
      
      // Анализ возможностей
      if (warehouse.is_economy) report.capabilities.economy++;
      if (warehouse.is_kgt) report.capabilities.kgt++;
      if (warehouse.is_karantin) report.capabilities.karantin++;
      if (warehouse.has_entrusted_acceptance) report.capabilities.entrustedAcceptance++;
      
      // Получение методов доставки для активных складов
      if (warehouse.status === 'created' && warehouse.warehouse_id) {
        const deliveryMethods = await this.getWarehouseDeliveryMethods(warehouse.warehouse_id);
        report.deliveryMethods.push({
          warehouseId: warehouse.warehouse_id,
          warehouseName: warehouse.name || `Склад ${warehouse.warehouse_id}`,
          methods: deliveryMethods
        });
      }
    }
    
    // Генерация рекомендаций
    report.recommendations = this.generateRecommendations(warehouses.result, report);
    
    return report;
  }
  
  private async getWarehouseDeliveryMethods(warehouseId: number): Promise<WarehouseDeliveryMethod[]> {
    const allMethods: WarehouseDeliveryMethod[] = [];
    let offset = 0;
    const limit = 50;
    
    do {
      const response = await this.warehouseApi.getDeliveryMethods({
        limit,
        offset,
        filter: {
          warehouse_id: warehouseId,
          status: 'ACTIVE'
        }
      });
      
      if (response.result) {
        allMethods.push(...response.result);
      }
      
      if (!response.has_next) break;
      offset += limit;
    } while (true);
    
    return allMethods;
  }
  
  private generateRecommendations(warehouses: Warehouse[], report: WarehouseReport): string[] {
    const recommendations: string[] = [];
    
    // Рекомендации по статусам складов
    if (report.warehousesByStatus['error'] > 0) {
      recommendations.push(`⚠️ Требует внимания: ${report.warehousesByStatus['error']} склад(ов) в статусе "Ошибка"`);
    }
    
    if (report.warehousesByStatus['blocked'] > 0) {
      recommendations.push(`🚫 Заблокировано: ${report.warehousesByStatus['blocked']} склад(ов) требуют разблокировки`);
    }
    
    // Рекомендации по типам складов
    if (report.warehousesByType.rfbs === 0 && report.totalWarehouses > 2) {
      recommendations.push(`🚀 Рекомендуется настроить rFBS склады для улучшения региональной логистики`);
    }
    
    // Рекомендации по возможностям
    const activeWarehouses = warehouses.filter(w => w.status === 'created').length;
    if (report.capabilities.economy < activeWarehouses / 2) {
      recommendations.push(`💰 Рассмотрите подключение эконом-товаров на большем количестве складов`);
    }
    
    return recommendations;
  }
}

interface WarehouseReport {
  totalWarehouses: number;
  warehousesByStatus: Record<string, number>;
  warehousesByType: { fbs: number; rfbs: number };
  capabilities: {
    economy: number;
    kgt: number;
    karantin: number;
    entrustedAcceptance: number;
  };
  deliveryMethods: Array<{
    warehouseId: number;
    warehouseName: string;
    methods: WarehouseDeliveryMethod[];
  }>;
  recommendations: string[];
}
```

### Сценарий 2: Оптимизация методов доставки

```typescript
// Инструмент для анализа и оптимизации методов доставки
class DeliveryOptimizer {
  private warehouseApi: WarehouseApi;
  
  constructor(httpClient: HttpClient) {
    this.warehouseApi = new WarehouseApi(httpClient);
  }
  
  async optimizeDeliveryMethods(): Promise<DeliveryOptimizationReport> {
    const warehouses = await this.warehouseApi.getWarehousesList();
    const activeWarehouses = warehouses.result?.filter(w => w.status === 'created') || [];
    
    const report: DeliveryOptimizationReport = {
      warehouseAnalysis: [],
      globalInsights: {
        averageSLA: 0,
        providerDistribution: new Map(),
        cutoffAnalysis: new Map()
      },
      optimizationSuggestions: []
    };
    
    let totalSLA = 0;
    let totalMethods = 0;
    
    for (const warehouse of activeWarehouses) {
      if (!warehouse.warehouse_id) continue;
      
      const methods = await this.getAllDeliveryMethods(warehouse.warehouse_id);
      const analysis = this.analyzeWarehouseMethods(warehouse, methods);
      
      report.warehouseAnalysis.push(analysis);
      
      // Сбор глобальной статистики
      methods.forEach(method => {
        if (method.sla_cut_in) {
          totalSLA += method.sla_cut_in;
          totalMethods++;
        }
        
        if (method.provider_id) {
          const count = report.globalInsights.providerDistribution.get(method.provider_id) || 0;
          report.globalInsights.providerDistribution.set(method.provider_id, count + 1);
        }
        
        if (method.cutoff) {
          const count = report.globalInsights.cutoffAnalysis.get(method.cutoff) || 0;
          report.globalInsights.cutoffAnalysis.set(method.cutoff, count + 1);
        }
      });
    }
    
    report.globalInsights.averageSLA = totalMethods > 0 ? totalSLA / totalMethods : 0;
    report.optimizationSuggestions = this.generateOptimizationSuggestions(report);
    
    return report;
  }
  
  private async getAllDeliveryMethods(warehouseId: number): Promise<WarehouseDeliveryMethod[]> {
    const allMethods: WarehouseDeliveryMethod[] = [];
    let offset = 0;
    const limit = 50;
    
    do {
      const response = await this.warehouseApi.getDeliveryMethods({
        limit,
        offset,
        filter: { warehouse_id: warehouseId }
      });
      
      if (response.result) {
        allMethods.push(...response.result);
      }
      
      if (!response.has_next) break;
      offset += limit;
    } while (true);
    
    return allMethods;
  }
  
  private analyzeWarehouseMethods(warehouse: Warehouse, methods: WarehouseDeliveryMethod[]): WarehouseMethodAnalysis {
    const activeMethods = methods.filter(m => m.status === 'ACTIVE');
    const avgSLA = activeMethods
      .filter(m => m.sla_cut_in)
      .reduce((sum, m) => sum + (m.sla_cut_in || 0), 0) / activeMethods.length;
    
    const providerCount = new Set(activeMethods.map(m => m.provider_id)).size;
    
    return {
      warehouseId: warehouse.warehouse_id!,
      warehouseName: warehouse.name || `Склад ${warehouse.warehouse_id}`,
      totalMethods: methods.length,
      activeMethods: activeMethods.length,
      averageSLA: Math.round(avgSLA),
      providerCount,
      fastMethodsCount: activeMethods.filter(m => (m.sla_cut_in || 0) < 120).length,
      issues: this.identifyWarehouseIssues(warehouse, methods)
    };
  }
  
  private identifyWarehouseIssues(warehouse: Warehouse, methods: WarehouseDeliveryMethod[]): string[] {
    const issues: string[] = [];
    
    const activeMethods = methods.filter(m => m.status === 'ACTIVE');
    
    if (activeMethods.length === 0) {
      issues.push('Нет активных методов доставки');
    } else if (activeMethods.length < 3) {
      issues.push('Мало активных методов доставки - рекомендуется добавить больше вариантов');
    }
    
    const avgSLA = activeMethods
      .filter(m => m.sla_cut_in)
      .reduce((sum, m) => sum + (m.sla_cut_in || 0), 0) / activeMethods.length;
    
    if (avgSLA > 240) { // 4 часа
      issues.push('Высокое среднее время сборки - может влиять на скорость доставки');
    }
    
    const providerCount = new Set(activeMethods.map(m => m.provider_id)).size;
    if (providerCount < 2) {
      issues.push('Зависимость от одного поставщика доставки - риск для бизнеса');
    }
    
    return issues;
  }
  
  private generateOptimizationSuggestions(report: DeliveryOptimizationReport): string[] {
    const suggestions: string[] = [];
    
    // Анализ общих проблем
    const warehousesWithIssues = report.warehouseAnalysis.filter(w => w.issues.length > 0);
    if (warehousesWithIssues.length > 0) {
      suggestions.push(`🔧 ${warehousesWithIssues.length} складов требуют внимания к настройке методов доставки`);
    }
    
    // Рекомендации по SLA
    if (report.globalInsights.averageSLA > 180) { // 3 часа
      suggestions.push(`⚡ Среднее время сборки ${Math.round(report.globalInsights.averageSLA)} мин - рекомендуется оптимизация процессов`);
    }
    
    // Анализ распределения поставщиков
    const dominantProvider = Array.from(report.globalInsights.providerDistribution.entries())
      .sort(([,a], [,b]) => b - a)[0];
    
    if (dominantProvider && dominantProvider[1] > report.warehouseAnalysis.length * 0.7) {
      suggestions.push(`⚠️ Высокая зависимость от поставщика ${dominantProvider[0]} - рекомендуется диверсификация`);
    }
    
    return suggestions;
  }
}

interface DeliveryOptimizationReport {
  warehouseAnalysis: WarehouseMethodAnalysis[];
  globalInsights: {
    averageSLA: number;
    providerDistribution: Map<number, number>;
    cutoffAnalysis: Map<string, number>;
  };
  optimizationSuggestions: string[];
}

interface WarehouseMethodAnalysis {
  warehouseId: number;
  warehouseName: string;
  totalMethods: number;
  activeMethods: number;
  averageSLA: number;
  providerCount: number;
  fastMethodsCount: number;
  issues: string[];
}
```

---

## ⚠️ Важные особенности и ограничения

### API Ограничения
- **Пагинация**: Максимум 50 методов доставки за запрос
- **Фильтрация**: Поддержка по складу, статусу, поставщику
- **Только FBS/rFBS**: API не работает со складами FBO

### Бизнес-логика
- **Статусы складов**: Различные стадии жизненного цикла склада
- **Лимиты отправлений**: Минимальные требования к размеру поставки
- **Первая миля**: Выбор между самовывозом и доставкой в точку

### Рекомендации по использованию
- **Кэширование**: Складская информация обновляется не часто
- **Мониторинг**: Регулярная проверка статусов складов
- **Оптимизация**: Выбор оптимальных методов доставки по SLA и стоимости