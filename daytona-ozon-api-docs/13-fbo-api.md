# FBO API

API для работы с логистикой "Выполнение OZON" (Fulfillment by OZON) в OZON Seller API.

**Количество методов**: 13 методов

## Обзор

FBO API предоставляет возможности для работы с логистической схемой FBO:
- 📋 Управление заявками на поставку и отправлениями
- 🏭 Мониторинг загруженности складов OZON
- 📅 Управление временными слотами поставок
- 🚚 Регистрация водителей и транспорта
- 📊 Аналитика по статусам заказов
- ❌ Причины отмены отправлений

## Основные возможности

### 🎯 Схема работы FBO
1. **Поставка товаров** → на склады OZON
2. **Хранение** → OZON управляет остатками
3. **Обработка заказов** → OZON упаковывает и отправляет
4. **Доставка** → через сеть OZON
5. **Возвраты** → OZON обрабатывает возвраты

### 📦 Преимущества FBO
- Быстрая доставка через сеть OZON
- Автоматическая обработка заказов
- Управление возвратами
- Масштабируемость операций

### 🏭 Управление складами
- Мониторинг загруженности складов
- Планирование поставок по доступности
- Оптимизация размещения товаров
- Контроль таймслотов поставки

## Методы API

### Справочная информация

#### getCancelReasons()
**Назначение**: Получить список причин отмены отправлений FBO

```typescript
interface FboCancelReasonListRequest {
  // Пустой интерфейс, дополнительные параметры не требуются
}
```

#### getWarehouseAvailability()
**Назначение**: Получить информацию о загруженности складов OZON

### Управление заявками на поставку

#### getSupplyOrdersList()
**Назначение**: Получить список заявок на поставку

```typescript
interface FboSupplyOrderListRequest {
  since: string;
  to: string;
  filter?: {
    status?: string[];
    warehouse_id?: number[];
  };
  limit?: number;
  offset?: number;
}
```

#### getSupplyOrder()
**Назначение**: Получить детальную информацию о заявке на поставку

#### getSupplyOrderBundle()
**Назначение**: Получить состав заявки на поставку

#### getSupplyOrderStatusCounter()
**Назначение**: Получить количество заявок по статусам

### Управление временными слотами

#### getSupplyOrderTimeslots()
**Назначение**: Получить доступные интервалы поставки

```typescript
interface FboSupplyOrderTimeslotGetRequest {
  warehouse_id: number;
  date_from: string;
  date_to: string;
}
```

#### getSupplyOrderTimeslotStatus()
**Назначение**: Получить статус интервала поставки

#### updateSupplyOrderTimeslot()
**Назначение**: Обновить интервал поставки

### Управление транспортом

#### createSupplyOrderPass()
**Назначение**: Указать данные о водителе и автомобиле

```typescript
interface FboSupplyOrderPassCreateRequest {
  supply_order_id: number;
  driver: {
    name: string;
    phone: string;
    passport: string;
  };
  vehicle: {
    model: string;
    license_plate: string;
    color: string;
  };
}
```

#### getSupplyOrderPassStatus()
**Назначение**: Получить статус ввода данных о водителе и автомобиле

### Управление отправлениями

#### getPostingsList()
**Назначение**: Получить список отправлений FBO

```typescript
interface FboPostingListRequest {
  since: string;
  to: string;
  filter?: {
    status?: string[];
    warehouse_id?: number[];
  };
  with?: {
    analytics_data?: boolean;
    financial_data?: boolean;
  };
  limit?: number;
}
```

#### getPosting()
**Назначение**: Получить детальную информацию об отправлении FBO

## Практические примеры

### Базовое использование

```typescript
import { OzonSellerAPI } from 'bmad-ozon-seller-api';

const api = new OzonSellerAPI({
  clientId: 'your-client-id',
  apiKey: 'your-api-key'
});

// Проверить доступность складов
const warehouses = await api.fbo.getWarehouseAvailability();
console.log('Доступные склады:', warehouses.warehouses?.length);

// Получить список заявок на поставку
const supplyOrders = await api.fbo.getSupplyOrdersList({
  since: '2024-01-01T00:00:00Z',
  to: '2024-01-31T23:59:59Z',
  filter: {
    status: ['created', 'confirmed']
  },
  limit: 100
});

// Получить доступные временные слоты
const timeslots = await api.fbo.getSupplyOrderTimeslots({
  warehouse_id: 123,
  date_from: '2024-01-15T00:00:00Z',
  date_to: '2024-01-20T23:59:59Z'
});

// Зарегистрировать водителя и транспорт
const passResult = await api.fbo.createSupplyOrderPass({
  supply_order_id: 123456,
  driver: {
    name: 'Иванов Иван Иванович',
    phone: '+7 (999) 123-45-67',
    passport: '1234 567890'
  },
  vehicle: {
    model: 'ГАЗель NEXT',
    license_plate: 'А123БВ777',
    color: 'белый'
  }
});

// Получить список отправлений
const postings = await api.fbo.getPostingsList({
  since: '2024-01-01T00:00:00Z',
  to: '2024-01-31T23:59:59Z',
  filter: {
    status: ['shipped', 'delivered']
  },
  with: {
    analytics_data: true,
    financial_data: true
  },
  limit: 50
});
```

### Продвинутые сценарии

#### Менеджер поставок FBO

```typescript
class FboSupplyManager {
  constructor(private api: OzonSellerAPI) {}

  async planOptimalSupplies(): Promise<void> {
    console.log('📊 Планирование оптимальных поставок FBO');

    // 1. Анализ загруженности складов
    const warehouseData = await this.analyzeWarehouseCapacity();
    
    // 2. Получение статистики текущих заявок
    const orderStats = await this.analyzeCurrentOrders();
    
    // 3. Планирование новых поставок
    const recommendations = await this.generateSupplyRecommendations(warehouseData, orderStats);
    
    console.log('\n💡 Рекомендации по планированию поставок:');
    recommendations.forEach((rec, index) => {
      console.log(`${index + 1}. ${rec.warehouse}: ${rec.recommendation}`);
      if (rec.optimal_slots?.length > 0) {
        console.log(`   Оптимальные слоты: ${rec.optimal_slots.join(', ')}`);
      }
    });
  }

  private async analyzeWarehouseCapacity(): Promise<any[]> {
    const warehouses = await this.api.fbo.getWarehouseAvailability();
    const warehouseAnalysis = [];

    for (const warehouse of warehouses.warehouses || []) {
      const utilizationLevel = this.getUtilizationLevel(warehouse.capacity_utilization || 0);
      
      // Получаем доступные слоты для планирования
      const timeslots = await this.api.fbo.getSupplyOrderTimeslots({
        warehouse_id: warehouse.warehouse_id,
        date_from: new Date().toISOString(),
        date_to: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
      });

      const availableSlots = timeslots.timeslots?.filter(slot => slot.is_available) || [];
      
      warehouseAnalysis.push({
        warehouse_id: warehouse.warehouse_id,
        name: warehouse.name,
        utilization: warehouse.capacity_utilization,
        utilization_level: utilizationLevel,
        available_slots: availableSlots.length,
        total_capacity: availableSlots.reduce((sum, slot) => sum + (slot.max_pallets || 0), 0),
        next_available: availableSlots[0]?.start_time,
        region: warehouse.region
      });
    }

    console.log('\n🏭 Анализ складов:');
    warehouseAnalysis.forEach(analysis => {
      console.log(`${analysis.name} (${analysis.region}):`);
      console.log(`  Загруженность: ${analysis.utilization}% (${analysis.utilization_level})`);
      console.log(`  Доступно слотов: ${analysis.available_slots}`);
      console.log(`  Общая вместимость: ${analysis.total_capacity} палет`);
      console.log(`  Ближайший слот: ${analysis.next_available || 'Нет доступных'}`);
    });

    return warehouseAnalysis;
  }

  private async analyzeCurrentOrders(): Promise<any> {
    // Получаем статистику по статусам заявок
    const statusCounters = await this.api.fbo.getSupplyOrderStatusCounter();
    
    // Получаем детали активных заявок
    const activeOrders = await this.api.fbo.getSupplyOrdersList({
      since: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      to: new Date().toISOString(),
      filter: {
        status: ['created', 'confirmed', 'in_progress']
      },
      limit: 1000
    });

    console.log('\n📈 Статистика текущих заявок:');
    statusCounters.counters?.forEach(counter => {
      console.log(`${counter.status}: ${counter.count} заявок`);
    });
    console.log(`Всего активных: ${activeOrders.total || 0}`);

    // Анализ по складам
    const warehouseStats = new Map();
    activeOrders.supply_orders?.forEach(order => {
      const warehouseId = order.warehouse_id;
      if (!warehouseStats.has(warehouseId)) {
        warehouseStats.set(warehouseId, {
          orders_count: 0,
          total_volume: 0,
          avg_lead_time: 0
        });
      }
      const stats = warehouseStats.get(warehouseId);
      stats.orders_count++;
      stats.total_volume += order.total_products || 0;
    });

    return {
      status_counters: statusCounters.counters,
      active_orders_total: activeOrders.total,
      warehouse_stats: warehouseStats
    };
  }

  private async generateSupplyRecommendations(warehouseData: any[], orderStats: any): Promise<any[]> {
    const recommendations = [];

    for (const warehouse of warehouseData) {
      let recommendation = '';
      let priority = 'normal';
      let optimal_slots = [];

      // Анализ загруженности
      if (warehouse.utilization < 60) {
        recommendation = 'Увеличить объем поставок - низкая загруженность';
        priority = 'high';
      } else if (warehouse.utilization > 85) {
        recommendation = 'Сократить поставки или найти альтернативный склад';
        priority = 'urgent';
      } else {
        recommendation = 'Поддерживать текущий уровень поставок';
      }

      // Поиск оптимальных слотов
      if (warehouse.available_slots > 0) {
        try {
          const detailedSlots = await this.api.fbo.getSupplyOrderTimeslots({
            warehouse_id: warehouse.warehouse_id,
            date_from: new Date().toISOString(),
            date_to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
          });

          optimal_slots = detailedSlots.timeslots
            ?.filter(slot => slot.is_available && (slot.max_pallets || 0) > 10)
            ?.slice(0, 3)
            ?.map(slot => new Date(slot.start_time).toLocaleDateString()) || [];
        } catch (error) {
          console.log(`Ошибка получения слотов для склада ${warehouse.name}`);
        }
      }

      recommendations.push({
        warehouse: warehouse.name,
        warehouse_id: warehouse.warehouse_id,
        recommendation,
        priority,
        utilization: warehouse.utilization,
        optimal_slots
      });
    }

    return recommendations.sort((a, b) => {
      const priorityOrder = { urgent: 3, high: 2, normal: 1 };
      return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
    });
  }

  private getUtilizationLevel(utilization: number): string {
    if (utilization < 60) return 'Низкая';
    if (utilization < 75) return 'Средняя';
    if (utilization < 85) return 'Высокая';
    return 'Критическая';
  }
}
```

#### Система мониторинга отправлений FBO

```typescript
class FboMonitoringSystem {
  constructor(private api: OzonSellerAPI) {}

  async monitorFboOperations(): Promise<void> {
    console.log('🔍 Мониторинг операций FBO');
    console.log('='.repeat(50));

    // Мониторинг отправлений
    await this.monitorPostings();
    
    // Мониторинг заявок на поставку
    await this.monitorSupplyOrders();
    
    // Анализ производительности
    await this.analyzePerformance();
    
    // Проверка транспортных данных
    await this.checkTransportData();
  }

  private async monitorPostings(): Promise<void> {
    console.log('\n📦 Мониторинг отправлений FBO:');
    
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const now = new Date().toISOString();

    const postings = await this.api.fbo.getPostingsList({
      since: oneWeekAgo,
      to: now,
      with: {
        analytics_data: true,
        financial_data: true
      },
      limit: 1000
    });

    // Группировка по статусам
    const statusGroups = new Map();
    let totalRevenue = 0;
    let totalOrders = postings.total || 0;

    postings.postings?.forEach(posting => {
      const status = posting.status || 'unknown';
      if (!statusGroups.has(status)) {
        statusGroups.set(status, 0);
      }
      statusGroups.set(status, statusGroups.get(status) + 1);
      
      if (posting.financial_data?.payout_amount) {
        totalRevenue += posting.financial_data.payout_amount;
      }
    });

    console.log(`Всего отправлений за неделю: ${totalOrders}`);
    console.log(`Общая выручка: ${totalRevenue.toFixed(2)} руб.`);
    console.log('\nРаспределение по статусам:');
    
    Array.from(statusGroups.entries()).forEach(([status, count]) => {
      const percentage = ((count / totalOrders) * 100).toFixed(1);
      console.log(`  ${status}: ${count} (${percentage}%)`);
    });

    // Анализ проблемных отправлений
    const problemStatuses = ['cancelled', 'cancelled_by_ozon', 'returned'];
    const problemPostings = postings.postings?.filter(p => 
      problemStatuses.includes(p.status || '')
    ) || [];

    if (problemPostings.length > 0) {
      console.log(`\n⚠️ Проблемные отправления: ${problemPostings.length}`);
      
      // Получаем причины отмен
      const cancelReasons = await this.api.fbo.getCancelReasons();
      console.log('Доступные причины отмен:', cancelReasons.cancel_reasons?.length);
    }
  }

  private async monitorSupplyOrders(): Promise<void> {
    console.log('\n🚛 Мониторинг заявок на поставку:');

    const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString();
    const now = new Date().toISOString();

    // Получаем статистику по статусам
    const statusCounter = await this.api.fbo.getSupplyOrderStatusCounter();
    console.log('Статистика по статусам:');
    statusCounter.counters?.forEach(counter => {
      console.log(`  ${counter.status}: ${counter.count} заявок`);
    });

    // Получаем детали активных заявок
    const supplyOrders = await this.api.fbo.getSupplyOrdersList({
      since: twoWeeksAgo,
      to: now,
      limit: 500
    });

    // Анализ по типам заявок
    const warehouseStats = new Map();
    let overdueOrders = 0;
    const currentTime = new Date();

    supplyOrders.supply_orders?.forEach(order => {
      const warehouseId = order.warehouse_id || 'unknown';
      if (!warehouseStats.has(warehouseId)) {
        warehouseStats.set(warehouseId, {
          orders: 0,
          products: 0,
          statuses: new Set()
        });
      }
      
      const stats = warehouseStats.get(warehouseId);
      stats.orders++;
      stats.products += order.total_products || 0;
      stats.statuses.add(order.status);

      // Проверка просроченных заявок
      if (order.planned_delivery_date && new Date(order.planned_delivery_date) < currentTime) {
        if (['created', 'confirmed'].includes(order.status || '')) {
          overdueOrders++;
        }
      }
    });

    console.log(`\nВсего заявок: ${supplyOrders.total}`);
    console.log(`Просроченных заявок: ${overdueOrders}`);
    
    console.log('\nСтатистика по складам:');
    Array.from(warehouseStats.entries()).forEach(([warehouseId, stats]) => {
      console.log(`  Склад ${warehouseId}: ${stats.orders} заявок, ${stats.products} товаров`);
      console.log(`    Статусы: ${Array.from(stats.statuses).join(', ')}`);
    });
  }

  private async analyzePerformance(): Promise<void> {
    console.log('\n📊 Анализ производительности:');

    try {
      // Анализ доступности складов
      const warehouses = await this.api.fbo.getWarehouseAvailability();
      const totalWarehouses = warehouses.warehouses?.length || 0;
      const highUtilization = warehouses.warehouses?.filter(w => 
        (w.capacity_utilization || 0) > 80
      ).length || 0;

      console.log(`Всего складов: ${totalWarehouses}`);
      console.log(`С высокой загрузкой (>80%): ${highUtilization}`);

      if (highUtilization > 0) {
        console.log('⚠️ Рекомендуется перераспределить нагрузку между складами');
      }

      // Средняя загрузка складов
      const avgUtilization = warehouses.warehouses?.reduce((sum, w) => 
        sum + (w.capacity_utilization || 0), 0) / totalWarehouses;
      
      console.log(`Средняя загрузка складов: ${avgUtilization?.toFixed(1)}%`);

    } catch (error) {
      console.log('Ошибка анализа производительности:', error.message);
    }
  }

  private async checkTransportData(): Promise<void> {
    console.log('\n🚚 Проверка транспортных данных:');

    // Получаем недавние заявки для проверки
    const recentOrders = await this.api.fbo.getSupplyOrdersList({
      since: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      to: new Date().toISOString(),
      filter: {
        status: ['confirmed', 'in_progress']
      },
      limit: 50
    });

    let ordersWithoutTransport = 0;
    let ordersWithPendingTransport = 0;

    for (const order of recentOrders.supply_orders || []) {
      try {
        const passStatus = await this.api.fbo.getSupplyOrderPassStatus({
          supply_order_id: order.supply_order_id!
        });

        if (passStatus.status === 'not_provided') {
          ordersWithoutTransport++;
        } else if (passStatus.status === 'pending') {
          ordersWithPendingTransport++;
        }
      } catch (error) {
        // Игнорируем ошибки для заявок, где данные о транспорте не требуются
      }
    }

    console.log(`Заявок без данных о транспорте: ${ordersWithoutTransport}`);
    console.log(`Заявок с ожидающими данными: ${ordersWithPendingTransport}`);

    if (ordersWithoutTransport > 0) {
      console.log('⚠️ Требуется заполнить данные о водителях и транспорте');
    }
  }

  async generateDailyReport(): Promise<void> {
    console.log('📈 Ежедневный отчет FBO');
    console.log('='.repeat(40));
    console.log(`Дата: ${new Date().toLocaleDateString()}`);

    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const now = new Date().toISOString();

    // Отправления за сутки
    const dailyPostings = await this.api.fbo.getPostingsList({
      since: yesterday,
      to: now,
      with: { financial_data: true },
      limit: 1000
    });

    const dailyRevenue = dailyPostings.postings?.reduce((sum, posting) => {
      return sum + (posting.financial_data?.payout_amount || 0);
    }, 0) || 0;

    console.log(`\n📦 Отправления за сутки: ${dailyPostings.total}`);
    console.log(`💰 Выручка за сутки: ${dailyRevenue.toFixed(2)} руб.`);
    
    if (dailyPostings.total && dailyPostings.total > 0) {
      const avgOrderValue = dailyRevenue / dailyPostings.total;
      console.log(`📊 Средний чек: ${avgOrderValue.toFixed(2)} руб.`);
    }

    // Рекомендации
    console.log('\n💡 Рекомендации:');
    if (dailyRevenue > 50000) {
      console.log('✅ Отличные результаты! Рассмотрите расширение ассортимента');
    } else if (dailyRevenue > 20000) {
      console.log('📈 Хорошие результаты. Продолжайте в том же направлении');
    } else {
      console.log('📉 Результаты ниже среднего. Проанализируйте причины');
    }
  }
}
```

#### Автоматизация регистрации транспорта

```typescript
class TransportRegistrationService {
  constructor(private api: OzonSellerAPI) {}

  async autoRegisterTransport(
    supplyOrderId: number,
    transportData: {
      driver: { name: string; phone: string; passport: string };
      vehicle: { model: string; license_plate: string; color: string };
    }
  ): Promise<boolean> {
    console.log(`🚛 Регистрация транспорта для заявки ${supplyOrderId}`);

    try {
      // Проверяем текущий статус
      const currentStatus = await this.api.fbo.getSupplyOrderPassStatus({
        supply_order_id: supplyOrderId
      });

      if (currentStatus.status === 'approved') {
        console.log('✅ Транспорт уже зарегистрирован и одобрен');
        return true;
      }

      // Регистрируем транспорт
      const registrationResult = await this.api.fbo.createSupplyOrderPass({
        supply_order_id: supplyOrderId,
        driver: transportData.driver,
        vehicle: transportData.vehicle
      });

      console.log(`📋 Заявка на регистрацию создана: ${registrationResult.task_id}`);

      // Ожидаем обработки
      const approved = await this.waitForApproval(supplyOrderId, 60000); // 1 минута

      if (approved) {
        console.log('✅ Транспорт успешно зарегистрирован');
        return true;
      } else {
        console.log('⏳ Регистрация все еще обрабатывается');
        return false;
      }

    } catch (error) {
      console.error(`❌ Ошибка регистрации транспорта: ${error.message}`);
      return false;
    }
  }

  private async waitForApproval(supplyOrderId: number, maxWaitTime: number): Promise<boolean> {
    const startTime = Date.now();
    const checkInterval = 5000; // 5 секунд

    while (Date.now() - startTime < maxWaitTime) {
      try {
        const status = await this.api.fbo.getSupplyOrderPassStatus({
          supply_order_id: supplyOrderId
        });

        if (status.status === 'approved') {
          return true;
        } else if (status.status === 'rejected') {
          console.log(`❌ Регистрация отклонена: ${status.rejection_reason}`);
          return false;
        }

        console.log(`⏳ Статус: ${status.status}, ожидаем...`);
        await new Promise(resolve => setTimeout(resolve, checkInterval));

      } catch (error) {
        console.log('Ошибка проверки статуса, повторяем...');
        await new Promise(resolve => setTimeout(resolve, checkInterval));
      }
    }

    return false;
  }

  async batchRegisterTransport(
    registrations: Array<{
      supply_order_id: number;
      driver: { name: string; phone: string; passport: string };
      vehicle: { model: string; license_plate: string; color: string };
    }>
  ): Promise<void> {
    console.log(`🚛 Массовая регистрация транспорта для ${registrations.length} заявок`);

    const results = [];
    for (const registration of registrations) {
      const success = await this.autoRegisterTransport(
        registration.supply_order_id,
        {
          driver: registration.driver,
          vehicle: registration.vehicle
        }
      );
      
      results.push({
        supply_order_id: registration.supply_order_id,
        success
      });

      // Пауза между запросами
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Отчет о результатах
    const successful = results.filter(r => r.success).length;
    const failed = results.length - successful;

    console.log(`\n📊 Результаты массовой регистрации:`);
    console.log(`✅ Успешно: ${successful}`);
    console.log(`❌ Неудачно: ${failed}`);

    if (failed > 0) {
      console.log('\n❌ Неудачные регистрации:');
      results.filter(r => !r.success).forEach(r => {
        console.log(`  Заявка ${r.supply_order_id}: требует ручной проверки`);
      });
    }
  }
}
```

## Обработка ошибок

```typescript
try {
  await api.fbo.getPostingsList({
    since: '2024-01-01T00:00:00Z',
    to: '2024-01-31T23:59:59Z'
  });
} catch (error) {
  if (error.response?.status === 400) {
    console.error('Ошибка валидации параметров:', error.response.data);
  } else if (error.response?.status === 404) {
    console.error('Заявка или отправление не найдено');
  } else if (error.response?.status === 403) {
    console.error('Нет доступа к FBO операциям');
  } else {
    console.error('Неожиданная ошибка:', error.message);
  }
}
```

## Рекомендации по использованию

### 🎯 Планирование поставок
- Регулярно мониторьте загруженность складов
- Планируйте поставки с учетом доступных временных слотов
- Используйте аналитику для оптимизации размещения товаров

### 📦 Управление отправлениями
- Отслеживайте статусы отправлений в режиме реального времени
- Анализируйте причины отмен для улучшения качества
- Используйте финансовые данные для расчета рентабельности

### 🚚 Работа с транспортом
- Заранее регистрируйте данные водителей и транспорта
- Подготавливайте резервные варианты транспорта
- Мониторьте статусы одобрения транспортных данных

### 🔍 Мониторинг и аналитика
- Настройте автоматические отчеты по ключевым метрикам
- Используйте исторические данные для прогнозирования
- Анализируйте производительность по складам и регионам

### 🚀 Автоматизация
- Автоматизируйте регистрацию транспорта для регулярных поставок
- Настройте уведомления о критических событиях
- Интегрируйте с системами планирования ресурсов

FBO API обеспечивает полный контроль над логистическими операциями схемы "Выполнение OZON", от планирования поставок до мониторинга доставки заказов.