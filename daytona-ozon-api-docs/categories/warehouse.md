# 🏪 Warehouse API

**Управление складами FBS и rFBS**

Warehouse API предоставляет инструменты для управления складами FBS (Fulfillment by Seller) и rFBS (regional FBS), а также методами доставки. 

> ⚠️ **Важно**: Для получения списка складов FBO используйте отдельный метод `/v1/cluster/list`

## 📋 Обзор методов

| Метод | Endpoint | Описание |
|-------|----------|----------|
| `getWarehousesList()` | `POST /v1/warehouse/list` | Список складов FBS/rFBS |
| `getDeliveryMethods()` | `POST /v1/delivery-method/list` | Методы доставки склада |

## 🏢 Типы складов

### FBS (Fulfillment by Seller)
- Товары хранятся на складе продавца
- Продавец сам упаковывает и передает в службу доставки
- Полный контроль над логистикой

### rFBS (regional FBS)  
- Региональная схема FBS
- Склады в различных регионах для быстрой доставки
- Оптимизация логистических затрат

## 📊 Основные сценарии использования

### 1. 🔍 Получение списка складов

```typescript
// Получить все доступные склады
const warehouses = await client.warehouse.getWarehousesList();

console.log(`Доступно складов: ${warehouses.result?.length}`);

warehouses.result?.forEach(warehouse => {
  console.log(`\n📦 ${warehouse.name} (ID: ${warehouse.warehouse_id})`);
  console.log(`   Статус: ${getStatusText(warehouse.status)}`);
  console.log(`   Тип: ${warehouse.is_rfbs ? 'rFBS' : 'FBS'}`);
  console.log(`   Эконом товары: ${warehouse.is_economy ? '✅' : '❌'}`);
  console.log(`   КГТ товары: ${warehouse.is_kgt ? '✅' : '❌'}`);
  
  if (warehouse.has_postings_limit) {
    console.log(`   Лимит отправлений: ${warehouse.postings_limit} (мин: ${warehouse.min_postings_limit})`);
  }
  
  if (warehouse.working_days?.length) {
    const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    const workingDayNames = warehouse.working_days.map(day => dayNames[parseInt(day) - 1]);
    console.log(`   Рабочие дни: ${workingDayNames.join(', ')}`);
  }
  
  if (warehouse.first_mile_type) {
    console.log(`   Первая миля: ${warehouse.first_mile_type.first_mile_type}`);
    if (warehouse.first_mile_type.first_mile_is_changing) {
      console.log(`   ⚠️ Настройки склада обновляются`);
    }
  }
});

// Вспомогательная функция для статусов
function getStatusText(status: string): string {
  const statusMap = {
    'new': '🔄 Активируется',
    'created': '✅ Активный', 
    'disabled': '📁 В архиве',
    'blocked': '🚫 Заблокирован',
    'disabled_due_to_limit': '⏸️ На паузе',
    'error': '❌ Ошибка'
  };
  return statusMap[status] || status;
}
```

### 2. 🚚 Поиск методов доставки

```typescript
// Получить методы доставки для конкретного склада
const deliveryMethods = await client.warehouse.getDeliveryMethods({
  limit: 50,
  offset: 0,
  filter: {
    warehouse_id: 123456,
    status: 'ACTIVE'
  }
});

console.log(`Найдено методов доставки: ${deliveryMethods.result?.length}`);
if (deliveryMethods.has_next) {
  console.log('⏭️ Есть еще методы, используйте пагинацию');
}

deliveryMethods.result?.forEach(method => {
  console.log(`\n🚛 ${method.name} (ID: ${method.id})`);
  console.log(`   Провайдер: ${method.provider_id}`);
  console.log(`   Статус: ${method.status}`);
  console.log(`   Время сборки: ${method.sla_cut_in} мин`);
  console.log(`   Cutoff: ${method.cutoff}`);
  console.log(`   Склад: ${method.warehouse_id}`);
  console.log(`   Создан: ${method.created_at}`);
  console.log(`   Обновлен: ${method.updated_at}`);
});
```

### 3. 📈 Пагинация методов доставки

```typescript
async function getAllDeliveryMethods(warehouseId: number) {
  const allMethods = [];
  let offset = 0;
  const limit = 50;
  let hasNext = true;
  
  while (hasNext) {
    const response = await client.warehouse.getDeliveryMethods({
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
    
    hasNext = response.has_next ?? false;
    offset += limit;
    
    console.log(`📦 Загружено методов: ${allMethods.length}`);
    
    // Пауза между запросами
    if (hasNext) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  
  return allMethods;
}

// Использование
const allMethods = await getAllDeliveryMethods(123456);
console.log(`Всего методов доставки: ${allMethods.length}`);
```

### 4. 📊 Фильтрация и анализ складов

```typescript
// Анализ складов с различными фильтрами
const warehouses = await client.warehouse.getWarehousesList();

// Активные склады
const activeWarehouses = warehouses.result?.filter(w => w.status === 'created') ?? [];
console.log(`✅ Активных складов: ${activeWarehouses.length}`);

// rFBS склады  
const rfbsWarehouses = warehouses.result?.filter(w => w.is_rfbs) ?? [];
console.log(`🌐 rFBS складов: ${rfbsWarehouses.length}`);

// Склады с эконом товарами
const economyWarehouses = warehouses.result?.filter(w => w.is_economy) ?? [];
console.log(`💰 Эконом складов: ${economyWarehouses.length}`);

// Склады с КГТ
const kgtWarehouses = warehouses.result?.filter(w => w.is_kgt) ?? [];
console.log(`📦 КГТ складов: ${kgtWarehouses.length}`);

// Склады с лимитами
const limitedWarehouses = warehouses.result?.filter(w => w.has_postings_limit) ?? [];
console.log(`⚠️ Складов с лимитами: ${limitedWarehouses.length}`);

// Статистика по статусам
const statusStats = warehouses.result?.reduce((acc, w) => {
  acc[w.status || 'unknown'] = (acc[w.status || 'unknown'] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

console.log('\n📊 Статистика складов по статусам:');
Object.entries(statusStats || {}).forEach(([status, count]) => {
  console.log(`   ${getStatusText(status)}: ${count}`);
});
```

### 5. 🔄 Мониторинг изменений складов

```typescript
class WarehouseMonitor {
  private previousWarehouses: Map<number, any> = new Map();
  
  async checkWarehouseChanges() {
    const response = await client.warehouse.getWarehousesList();
    const currentWarehouses = response.result || [];
    
    const changes = [];
    
    for (const warehouse of currentWarehouses) {
      const warehouseId = warehouse.warehouse_id!;
      const previous = this.previousWarehouses.get(warehouseId);
      
      if (!previous) {
        changes.push({
          type: 'new',
          warehouse,
          message: `🆕 Новый склад: ${warehouse.name}`
        });
      } else if (previous.status !== warehouse.status) {
        changes.push({
          type: 'status_change',
          warehouse,
          previous: previous.status,
          current: warehouse.status,
          message: `🔄 Изменен статус склада ${warehouse.name}: ${getStatusText(previous.status)} → ${getStatusText(warehouse.status!)}`
        });
      } else if (previous.postings_limit !== warehouse.postings_limit) {
        changes.push({
          type: 'limit_change', 
          warehouse,
          previous: previous.postings_limit,
          current: warehouse.postings_limit,
          message: `📊 Изменен лимит склада ${warehouse.name}: ${previous.postings_limit} → ${warehouse.postings_limit}`
        });
      }
      
      // Проверка изменений первой мили
      if (warehouse.first_mile_type?.first_mile_is_changing) {
        changes.push({
          type: 'first_mile_updating',
          warehouse,
          message: `⚠️ Обновляются настройки первой мили для склада ${warehouse.name}`
        });
      }
    }
    
    // Сохраняем текущее состояние
    this.previousWarehouses.clear();
    currentWarehouses.forEach(w => {
      if (w.warehouse_id) {
        this.previousWarehouses.set(w.warehouse_id, { ...w });
      }
    });
    
    return changes;
  }
}

// Использование мониторинга
const monitor = new WarehouseMonitor();

// Периодическая проверка каждые 15 минут
setInterval(async () => {
  try {
    const changes = await monitor.checkWarehouseChanges();
    
    if (changes.length > 0) {
      console.log(`\n🔔 Обнаружено изменений: ${changes.length}`);
      changes.forEach(change => console.log(change.message));
      
      // Здесь можно отправить уведомления
      // await sendNotifications(changes);
    }
  } catch (error) {
    console.error('Ошибка при мониторинге складов:', error);
  }
}, 15 * 60 * 1000);
```

## 🏗️ TypeScript типы

### Основные интерфейсы

```typescript
// Запрос списка складов
interface WarehouseListRequest {
  readonly [key: string]: unknown;
}

// Склад из ответа
interface Warehouse {
  warehouse_id?: number;
  name?: string;
  status?: 'new' | 'created' | 'disabled' | 'blocked' | 'disabled_due_to_limit' | 'error';
  is_rfbs?: boolean;
  is_economy?: boolean;
  is_kgt?: boolean;
  is_karantin?: boolean;
  has_postings_limit?: boolean;
  postings_limit?: number;
  min_postings_limit?: number;
  working_days?: ('1' | '2' | '3' | '4' | '5' | '6' | '7')[];
  first_mile_type?: WarehouseFirstMileType;
  // ... другие поля
}

// Тип первой мили
interface WarehouseFirstMileType {
  first_mile_type?: 'DropOff' | 'Pickup';
  first_mile_is_changing?: boolean;
  dropoff_point_id?: string;
  dropoff_timeslot_id?: number;
}

// Запрос методов доставки
interface WarehouseDeliveryMethodListRequest {
  limit: number; // обязательный, 1-50
  offset?: number;
  filter?: DeliveryMethodListRequestFilter;
}

// Фильтр для методов доставки
interface DeliveryMethodListRequestFilter {
  warehouse_id?: number;
  provider_id?: number;
  status?: 'NEW' | 'EDITED' | 'ACTIVE' | 'DISABLED';
}

// Метод доставки
interface WarehouseDeliveryMethod {
  id?: number;
  name?: string;
  status?: 'NEW' | 'EDITED' | 'ACTIVE' | 'DISABLED';
  warehouse_id?: number;
  provider_id?: number;
  company_id?: number;
  template_id?: number;
  cutoff?: string;
  sla_cut_in?: number;
  created_at?: string;
  updated_at?: string;
}
```

### Ответы API

```typescript
// Ответ списка складов
interface WarehouseListResponse {
  result?: Warehouse[];
}

// Ответ методов доставки
interface WarehouseDeliveryMethodListResponse {
  result?: WarehouseDeliveryMethod[];
  has_next?: boolean;
}
```

## ⚠️ Важные особенности

### Статусы складов

| Статус | Описание в кабинете | Описание |
|--------|-------------------|-----------|
| `new` | Активируется | Склад в процессе активации |
| `created` | Активный | Склад активен и работает |
| `disabled` | В архиве | Склад отключен |
| `blocked` | Заблокирован | Склад заблокирован системой |
| `disabled_due_to_limit` | На паузе | Склад приостановлен из-за лимитов |
| `error` | Ошибка | Ошибка в настройках склада |

### Рабочие дни

Дни недели представлены числами:
- `'1'` — Понедельник
- `'2'` — Вторник  
- `'3'` — Среда
- `'4'` — Четверг
- `'5'` — Пятница
- `'6'` — Суббота
- `'7'` — Воскресенье

### Первая миля

- **DropOff** — доставка товаров в точку приема
- **Pickup** — самовывоз товаров со склада продавца

### Лимиты API

- **Список складов**: без ограничений (данные кэшируются)
- **Методы доставки**: максимум 50 элементов за запрос
- **Rate limiting**: стандартные лимиты OZON API

## 🔧 Продвинутые примеры

### Автоматическая настройка складов

```typescript
class WarehouseManager {
  async optimizeWarehouses() {
    const warehouses = await client.warehouse.getWarehousesList();
    const active = warehouses.result?.filter(w => w.status === 'created') ?? [];
    
    const report = {
      total: warehouses.result?.length ?? 0,
      active: active.length,
      rfbs: active.filter(w => w.is_rfbs).length,
      economy: active.filter(w => w.is_economy).length,
      kgt: active.filter(w => w.is_kgt).length,
      withLimits: active.filter(w => w.has_postings_limit).length,
      recommendations: [] as string[]
    };
    
    // Анализ и рекомендации
    if (report.rfbs === 0) {
      report.recommendations.push('🌐 Рассмотрите подключение rFBS для улучшения логистики');
    }
    
    if (report.economy === 0) {
      report.recommendations.push('💰 Подключите эконом-склады для расширения ассортимента');
    }
    
    active.forEach(warehouse => {
      if (warehouse.has_postings_limit && warehouse.postings_limit === warehouse.min_postings_limit) {
        report.recommendations.push(`⚠️ Склад ${warehouse.name} работает на минимальном лимите`);
      }
      
      if (warehouse.working_days && warehouse.working_days.length < 5) {
        report.recommendations.push(`📅 Склад ${warehouse.name} работает менее 5 дней в неделю`);
      }
    });
    
    return report;
  }
}
```

### Интеграция с мониторингом

```typescript
class WarehouseAnalytics {
  async generateDashboard() {
    const [warehouses, ...deliveryMethodsPromises] = await Promise.all([
      client.warehouse.getWarehousesList(),
      // Получаем методы доставки для первых 5 складов
      ...Array(5).fill(0).map((_, i) => 
        client.warehouse.getDeliveryMethods({
          limit: 10,
          filter: { warehouse_id: i + 1 }
        }).catch(() => ({ result: [], has_next: false }))
      )
    ]);
    
    const dashboard = {
      timestamp: new Date().toISOString(),
      summary: {
        warehouses: warehouses.result?.length ?? 0,
        activeWarehouses: warehouses.result?.filter(w => w.status === 'created').length ?? 0,
        totalDeliveryMethods: deliveryMethodsPromises.reduce((sum, methods) => 
          sum + (methods.result?.length ?? 0), 0)
      },
      alerts: [] as string[],
      metrics: {
        rfbsRatio: 0,
        economyRatio: 0,
        kgtRatio: 0,
        avgWorkingDays: 0
      }
    };
    
    const active = warehouses.result?.filter(w => w.status === 'created') ?? [];
    
    if (active.length > 0) {
      dashboard.metrics.rfbsRatio = active.filter(w => w.is_rfbs).length / active.length;
      dashboard.metrics.economyRatio = active.filter(w => w.is_economy).length / active.length;
      dashboard.metrics.kgtRatio = active.filter(w => w.is_kgt).length / active.length;
      dashboard.metrics.avgWorkingDays = active.reduce((sum, w) => 
        sum + (w.working_days?.length ?? 0), 0) / active.length;
    }
    
    // Генерация алертов
    if (dashboard.summary.activeWarehouses === 0) {
      dashboard.alerts.push('🚨 Нет активных складов!');
    }
    
    if (dashboard.metrics.avgWorkingDays < 5) {
      dashboard.alerts.push('⚠️ Средняя рабочая неделя меньше 5 дней');
    }
    
    return dashboard;
  }
}
```

## 🤝 Связанные API

- **[FBS API](https://github.com/salacoste/ozon-daytona-seller-api)** — Управление FBS заказами
- **[Delivery FBS API](https://github.com/salacoste/ozon-daytona-seller-api)** — Настройка доставки FBS
- **[Prices & Stocks API](https://github.com/salacoste/ozon-daytona-seller-api)** — Управление остатками по складам
- **[Analytics API](https://github.com/salacoste/ozon-daytona-seller-api)** — Аналитика по складам

## 📞 Поддержка

**Нашли ошибку или хотите улучшить документацию?**
- 🐛 [Создать Issue](https://github.com/salacoste/ozon-daytona-seller-api/issues/new)
- 🔧 [Pull Request](https://github.com/salacoste/ozon-daytona-seller-api/compare)
- 💬 [GitHub Discussions](https://github.com/salacoste/ozon-daytona-seller-api/discussions)

**Полезные ресурсы:**
- 📚 [Официальная документация OZON](https://docs.ozon.ru/api/seller/)
- ⭐ [Репозиторий SDK](https://github.com/salacoste/ozon-daytona-seller-api)
- 📦 [NPM пакет](https://www.npmjs.com/package/daytona-ozon-seller-api)

---

🏠 [Главная документация](../README.md) | 📚 [Все категории](./README.md)