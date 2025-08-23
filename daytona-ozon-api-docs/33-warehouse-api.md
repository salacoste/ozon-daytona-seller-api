# Warehouse API

API для управления складами и методами доставки.

## Обзор

Warehouse API предоставляет инструменты для управления складской системой и настройки методов доставки. API позволяет получать информацию о доступных складах, их характеристиках и поддерживаемых способах доставки товаров.

**Ключевые возможности:**
- Получение списка доступных складов
- Просмотр информации о складах (адреса, режим работы, статус)
- Управление методами доставки для каждого склада
- Настройка параметров логистики и стоимости доставки

## Методы API

### getWarehousesList()

Получить список всех доступных складов с детальной информацией.

```typescript
import { OzonSellerAPI } from 'bmad-ozon-seller-api';

const api = new OzonSellerAPI({
  clientId: 'your-client-id',
  apiKey: 'your-api-key'
});

// Получение полного списка складов
const warehouses = await api.warehouse.getWarehousesList();

console.log('Total warehouses:', warehouses.total);
warehouses.warehouses?.forEach(warehouse => {
  console.log(`\n📦 Склад: ${warehouse.name} (ID: ${warehouse.warehouse_id})`);
  console.log(`Тип: ${warehouse.type}`);
  console.log(`Адрес: ${warehouse.address}, ${warehouse.city}`);
  console.log(`Регион: ${warehouse.region}`);
  console.log(`Активен: ${warehouse.is_active ? '✅' : '❌'}`);
  
  // Информация о координатах
  if (warehouse.coordinates) {
    console.log(`Координаты: ${warehouse.coordinates.latitude}, ${warehouse.coordinates.longitude}`);
  }
  
  // Режим работы
  if (warehouse.working_hours) {
    console.log('Режим работы:');
    warehouse.working_hours.forEach(hours => {
      if (hours.is_day_off) {
        console.log(`  ${hours.day}: Выходной`);
      } else {
        console.log(`  ${hours.day}: ${hours.open_time} - ${hours.close_time}`);
      }
    });
  }
  
  // Контактная информация
  if (warehouse.contact_info) {
    console.log('Контакты:');
    if (warehouse.contact_info.phone) {
      console.log(`  Телефон: ${warehouse.contact_info.phone}`);
    }
    if (warehouse.contact_info.email) {
      console.log(`  Email: ${warehouse.contact_info.email}`);
    }
  }
  
  // Дополнительные сервисы
  if (warehouse.services && warehouse.services.length > 0) {
    console.log('Доступные сервисы:', warehouse.services.join(', '));
  }
  
  // Ограничения
  if (warehouse.restrictions) {
    console.log('Ограничения:');
    if (warehouse.restrictions.max_weight) {
      console.log(`  Максимальный вес: ${warehouse.restrictions.max_weight} кг`);
    }
    if (warehouse.restrictions.max_dimensions) {
      console.log(`  Максимальные размеры: ${warehouse.restrictions.max_dimensions.length}x${warehouse.restrictions.max_dimensions.width}x${warehouse.restrictions.max_dimensions.height} см`);
    }
    if (warehouse.restrictions.prohibited_categories) {
      console.log(`  Запрещенные категории: ${warehouse.restrictions.prohibited_categories.join(', ')}`);
    }
  }
});

// Фильтрация активных складов
const activeWarehouses = warehouses.warehouses?.filter(w => w.is_active) || [];
console.log(`\n✅ Активных складов: ${activeWarehouses.length}`);

// Группировка по типам
const warehousesByType = warehouses.warehouses?.reduce((acc, warehouse) => {
  const type = warehouse.type || 'unknown';
  if (!acc[type]) {
    acc[type] = [];
  }
  acc[type].push(warehouse);
  return acc;
}, {} as Record<string, any[]>);

console.log('\n📊 Склады по типам:');
Object.entries(warehousesByType || {}).forEach(([type, items]) => {
  console.log(`  ${type}: ${items.length} складов`);
});
```

### getDeliveryMethods()

Получить список доступных методов доставки для конкретного склада.

```typescript
// Получение методов доставки для конкретного склада
const deliveryMethods = await api.warehouse.getDeliveryMethods({
  warehouse_id: 123,
  delivery_type: 'courier'
});

console.log(`Найдено ${deliveryMethods.delivery_methods?.length} методов доставки`);

deliveryMethods.delivery_methods?.forEach(method => {
  console.log(`\n🚚 Метод доставки: ${method.name}`);
  console.log(`ID: ${method.delivery_method_id}`);
  console.log(`Тип: ${method.type}`);
  console.log(`Стоимость: ${method.cost} ${method.currency}`);
  console.log(`Время доставки: ${method.delivery_days} дней`);
  console.log(`Активен: ${method.is_active ? '✅' : '❌'}`);
  
  // Зоны доставки
  if (method.delivery_zones && method.delivery_zones.length > 0) {
    console.log('Зоны доставки:');
    method.delivery_zones.forEach(zone => {
      console.log(`  📍 ${zone.name}: ${zone.description || 'нет описания'}`);
      if (zone.cities && zone.cities.length > 0) {
        console.log(`    Города: ${zone.cities.slice(0, 5).join(', ')}${zone.cities.length > 5 ? '...' : ''}`);
      }
      if (zone.additional_cost > 0) {
        console.log(`    Доплата: ${zone.additional_cost} ${method.currency}`);
      }
    });
  }
  
  // Ограничения по весу и размерам
  if (method.weight_limits) {
    console.log('Ограничения по весу:');
    console.log(`  Минимум: ${method.weight_limits.min_weight || 0} кг`);
    console.log(`  Максимум: ${method.weight_limits.max_weight} кг`);
  }
  
  if (method.size_limits) {
    console.log('Ограничения по размерам:');
    console.log(`  Максимальные: ${method.size_limits.max_length}x${method.size_limits.max_width}x${method.size_limits.max_height} см`);
  }
  
  // Дополнительные услуги
  if (method.additional_services && method.additional_services.length > 0) {
    console.log('Дополнительные услуги:');
    method.additional_services.forEach(service => {
      console.log(`  ✨ ${service.name}: ${service.cost} ${method.currency}`);
      if (service.description) {
        console.log(`     ${service.description}`);
      }
    });
  }
  
  // Расписание доставки
  if (method.delivery_schedule) {
    console.log('Расписание доставки:');
    method.delivery_schedule.forEach(schedule => {
      console.log(`  ${schedule.day}: ${schedule.time_slots.join(', ')}`);
    });
  }
});

// Фильтрация по различным критериям
const courierMethods = await api.warehouse.getDeliveryMethods({
  warehouse_id: 123,
  delivery_type: 'courier'
});

const pickupMethods = await api.warehouse.getDeliveryMethods({
  warehouse_id: 123,
  delivery_type: 'pickup'
});

const postalMethods = await api.warehouse.getDeliveryMethods({
  warehouse_id: 123,
  delivery_type: 'postal'
});

console.log('\n📈 Статистика методов доставки:');
console.log(`Курьерская доставка: ${courierMethods.delivery_methods?.length || 0}`);
console.log(`Самовывоз: ${pickupMethods.delivery_methods?.length || 0}`);
console.log(`Почтовая доставка: ${postalMethods.delivery_methods?.length || 0}`);
```

## TypeScript Interfaces

### Request Types

```typescript
interface WarehouseListRequest {
  /** Фильтр по статусу активности склада */
  is_active?: boolean;
  
  /** Фильтр по типу склада */
  warehouse_type?: 'fbo' | 'fbs' | 'crossdock' | 'fulfillment';
  
  /** Фильтр по городу */
  city?: string;
  
  /** Фильтр по региону */
  region?: string;
  
  /** Лимит количества записей */
  limit?: number;
  
  /** Смещение для пагинации */
  offset?: number;
}

interface WarehouseDeliveryMethodListRequest {
  /** ID склада */
  warehouse_id: number;
  
  /** Тип доставки */
  delivery_type?: 'courier' | 'pickup' | 'postal' | 'express';
  
  /** Фильтр по активным методам */
  is_active?: boolean;
  
  /** Фильтр по городу доставки */
  delivery_city?: string;
  
  /** Максимальная стоимость доставки */
  max_cost?: number;
  
  /** Максимальное время доставки в днях */
  max_delivery_days?: number;
}
```

### Response Types

```typescript
interface WarehouseListResponse {
  /** Список складов */
  warehouses?: Warehouse[];
  
  /** Общее количество складов */
  total: number;
  
  /** Есть ли следующая страница */
  has_next: boolean;
}

interface Warehouse {
  /** ID склада */
  warehouse_id: number;
  
  /** Название склада */
  name: string;
  
  /** Тип склада */
  type: 'fbo' | 'fbs' | 'crossdock' | 'fulfillment';
  
  /** Активность склада */
  is_active: boolean;
  
  /** Адрес склада */
  address: string;
  
  /** Город */
  city: string;
  
  /** Регион */
  region: string;
  
  /** Почтовый индекс */
  postal_code?: string;
  
  /** Координаты */
  coordinates?: WarehouseCoordinates;
  
  /** Режим работы */
  working_hours?: WorkingHours[];
  
  /** Контактная информация */
  contact_info?: ContactInfo;
  
  /** Доступные сервисы */
  services?: string[];
  
  /** Ограничения склада */
  restrictions?: WarehouseRestrictions;
  
  /** Дата создания */
  created_at: string;
  
  /** Дата последнего обновления */
  updated_at: string;
}

interface WarehouseCoordinates {
  /** Широта */
  latitude: number;
  
  /** Долгота */
  longitude: number;
}

interface WorkingHours {
  /** День недели */
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  
  /** Выходной день */
  is_day_off: boolean;
  
  /** Время открытия */
  open_time?: string;
  
  /** Время закрытия */
  close_time?: string;
  
  /** Обеденный перерыв */
  lunch_break?: {
    start_time: string;
    end_time: string;
  };
}

interface ContactInfo {
  /** Номер телефона */
  phone?: string;
  
  /** Email адрес */
  email?: string;
  
  /** Контактное лицо */
  contact_person?: string;
  
  /** Дополнительная информация */
  notes?: string;
}

interface WarehouseRestrictions {
  /** Максимальный вес товара в кг */
  max_weight?: number;
  
  /** Максимальные размеры */
  max_dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  
  /** Запрещенные категории товаров */
  prohibited_categories?: string[];
  
  /** Требования к упаковке */
  packaging_requirements?: string[];
  
  /** Минимальная температура хранения */
  min_temperature?: number;
  
  /** Максимальная температура хранения */
  max_temperature?: number;
}

interface WarehouseDeliveryMethodListResponse {
  /** Список методов доставки */
  delivery_methods?: DeliveryMethod[];
  
  /** Общее количество методов */
  total: number;
}

interface DeliveryMethod {
  /** ID метода доставки */
  delivery_method_id: number;
  
  /** Название метода */
  name: string;
  
  /** Тип доставки */
  type: 'courier' | 'pickup' | 'postal' | 'express';
  
  /** Стоимость доставки */
  cost: number;
  
  /** Валюта */
  currency: 'RUB' | 'USD' | 'EUR';
  
  /** Время доставки в днях */
  delivery_days: number;
  
  /** Активность метода */
  is_active: boolean;
  
  /** Зоны доставки */
  delivery_zones?: DeliveryZone[];
  
  /** Ограничения по весу */
  weight_limits?: WeightLimits;
  
  /** Ограничения по размерам */
  size_limits?: SizeLimits;
  
  /** Дополнительные услуги */
  additional_services?: AdditionalService[];
  
  /** Расписание доставки */
  delivery_schedule?: DeliverySchedule[];
  
  /** Описание метода */
  description?: string;
}

interface DeliveryZone {
  /** ID зоны */
  zone_id: number;
  
  /** Название зоны */
  name: string;
  
  /** Описание зоны */
  description?: string;
  
  /** Список городов в зоне */
  cities?: string[];
  
  /** Дополнительная стоимость */
  additional_cost: number;
  
  /** Дополнительное время доставки */
  additional_days: number;
}

interface WeightLimits {
  /** Минимальный вес в кг */
  min_weight?: number;
  
  /** Максимальный вес в кг */
  max_weight: number;
  
  /** Стоимость за каждый дополнительный кг */
  cost_per_kg?: number;
}

interface SizeLimits {
  /** Максимальная длина в см */
  max_length: number;
  
  /** Максимальная ширина в см */
  max_width: number;
  
  /** Максимальная высота в см */
  max_height: number;
  
  /** Максимальный объемный вес */
  max_volume_weight?: number;
}

interface AdditionalService {
  /** ID услуги */
  service_id: number;
  
  /** Название услуги */
  name: string;
  
  /** Описание услуги */
  description?: string;
  
  /** Стоимость услуги */
  cost: number;
  
  /** Валюта */
  currency: string;
  
  /** Обязательность услуги */
  is_mandatory: boolean;
}

interface DeliverySchedule {
  /** День недели */
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  
  /** Временные слоты */
  time_slots: string[];
  
  /** Доступность в этот день */
  is_available: boolean;
}
```

## Примеры использования

### Анализ складской сети

```typescript
class WarehouseAnalyzer {
  constructor(private api: OzonSellerAPI) {}
  
  async analyzeWarehouseNetwork(): Promise<WarehouseAnalysis> {
    const warehouses = await this.api.warehouse.getWarehousesList();
    
    const analysis: WarehouseAnalysis = {
      total_warehouses: warehouses.total,
      active_warehouses: 0,
      inactive_warehouses: 0,
      by_type: {},
      by_region: {},
      coverage_analysis: {
        cities_covered: new Set<string>(),
        regions_covered: new Set<string>()
      },
      service_availability: {},
      capacity_analysis: {
        total_capacity: 0,
        utilization: 0,
        bottlenecks: []
      }
    };
    
    // Анализ по складам
    warehouses.warehouses?.forEach(warehouse => {
      // Подсчет активных/неактивных
      if (warehouse.is_active) {
        analysis.active_warehouses++;
      } else {
        analysis.inactive_warehouses++;
      }
      
      // Группировка по типам
      const type = warehouse.type || 'unknown';
      analysis.by_type[type] = (analysis.by_type[type] || 0) + 1;
      
      // Группировка по регионам
      analysis.by_region[warehouse.region] = (analysis.by_region[warehouse.region] || 0) + 1;
      
      // Покрытие
      analysis.coverage_analysis.cities_covered.add(warehouse.city);
      analysis.coverage_analysis.regions_covered.add(warehouse.region);
      
      // Анализ сервисов
      warehouse.services?.forEach(service => {
        analysis.service_availability[service] = (analysis.service_availability[service] || 0) + 1;
      });
      
      // Анализ ограничений (потенциальные узкие места)
      if (warehouse.restrictions) {
        if (warehouse.restrictions.max_weight && warehouse.restrictions.max_weight < 50) {
          analysis.capacity_analysis.bottlenecks.push({
            warehouse_id: warehouse.warehouse_id,
            warehouse_name: warehouse.name,
            issue: 'low_weight_limit',
            value: warehouse.restrictions.max_weight
          });
        }
      }
    });
    
    // Преобразуем Set в числа для финального анализа
    analysis.coverage_analysis.cities_count = analysis.coverage_analysis.cities_covered.size;
    analysis.coverage_analysis.regions_count = analysis.coverage_analysis.regions_covered.size;
    
    return analysis;
  }
  
  async generateRecommendations(analysis: WarehouseAnalysis): Promise<WarehouseRecommendation[]> {
    const recommendations: WarehouseRecommendation[] = [];
    
    // Рекомендации по покрытию
    if (analysis.coverage_analysis.regions_count < 5) {
      recommendations.push({
        type: 'coverage',
        priority: 'high',
        title: 'Расширить географическое покрытие',
        description: 'Недостаточное покрытие регионов. Рекомендуется открыть склады в новых регионах.',
        action: 'Рассмотреть возможность открытия складов в крупных городах без покрытия'
      });
    }
    
    // Рекомендации по активности
    const inactivePercentage = (analysis.inactive_warehouses / analysis.total_warehouses) * 100;
    if (inactivePercentage > 20) {
      recommendations.push({
        type: 'efficiency',
        priority: 'medium',
        title: 'Оптимизировать использование складов',
        description: `${inactivePercentage.toFixed(1)}% складов неактивны`,
        action: 'Проанализировать причины неактивности и активировать или закрыть неэффективные склады'
      });
    }
    
    // Рекомендации по узким местам
    if (analysis.capacity_analysis.bottlenecks.length > 0) {
      recommendations.push({
        type: 'capacity',
        priority: 'high',
        title: 'Устранить ограничения по весу',
        description: `${analysis.capacity_analysis.bottlenecks.length} складов имеют низкие лимиты веса`,
        action: 'Увеличить допустимые лимиты веса или обновить оборудование'
      });
    }
    
    return recommendations;
  }
  
  async findOptimalWarehouses(criteria: OptimalWarehouseCriteria): Promise<Warehouse[]> {
    const warehouses = await this.api.warehouse.getWarehousesList();
    
    return warehouses.warehouses?.filter(warehouse => {
      // Проверяем активность
      if (criteria.must_be_active && !warehouse.is_active) {
        return false;
      }
      
      // Проверяем тип
      if (criteria.warehouse_types && !criteria.warehouse_types.includes(warehouse.type)) {
        return false;
      }
      
      // Проверяем регион
      if (criteria.regions && !criteria.regions.includes(warehouse.region)) {
        return false;
      }
      
      // Проверяем наличие требуемых сервисов
      if (criteria.required_services) {
        const hasAllServices = criteria.required_services.every(service => 
          warehouse.services?.includes(service)
        );
        if (!hasAllServices) {
          return false;
        }
      }
      
      // Проверяем ограничения по весу
      if (criteria.min_weight_capacity && warehouse.restrictions?.max_weight) {
        if (warehouse.restrictions.max_weight < criteria.min_weight_capacity) {
          return false;
        }
      }
      
      return true;
    }) || [];
  }
}

interface WarehouseAnalysis {
  total_warehouses: number;
  active_warehouses: number;
  inactive_warehouses: number;
  by_type: Record<string, number>;
  by_region: Record<string, number>;
  coverage_analysis: {
    cities_covered: Set<string>;
    regions_covered: Set<string>;
    cities_count?: number;
    regions_count?: number;
  };
  service_availability: Record<string, number>;
  capacity_analysis: {
    total_capacity: number;
    utilization: number;
    bottlenecks: CapacityBottleneck[];
  };
}

interface CapacityBottleneck {
  warehouse_id: number;
  warehouse_name: string;
  issue: 'low_weight_limit' | 'size_constraints' | 'service_limitations';
  value: number;
}

interface WarehouseRecommendation {
  type: 'coverage' | 'efficiency' | 'capacity' | 'cost';
  priority: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  action: string;
}

interface OptimalWarehouseCriteria {
  must_be_active?: boolean;
  warehouse_types?: ('fbo' | 'fbs' | 'crossdock' | 'fulfillment')[];
  regions?: string[];
  required_services?: string[];
  min_weight_capacity?: number;
  max_distance_km?: number;
  target_city?: string;
}

// Использование анализатора
const analyzer = new WarehouseAnalyzer(api);

// Комплексный анализ складской сети
const analysis = await analyzer.analyzeWarehouseNetwork();

console.log('📊 АНАЛИЗ СКЛАДСКОЙ СЕТИ:');
console.log(`Всего складов: ${analysis.total_warehouses}`);
console.log(`Активных: ${analysis.active_warehouses}`);
console.log(`Неактивных: ${analysis.inactive_warehouses}`);

console.log('\n🏭 По типам складов:');
Object.entries(analysis.by_type).forEach(([type, count]) => {
  console.log(`  ${type}: ${count}`);
});

console.log('\n🗺️ Покрытие:');
console.log(`Городов: ${analysis.coverage_analysis.cities_count}`);
console.log(`Регионов: ${analysis.coverage_analysis.regions_count}`);

// Получение рекомендаций
const recommendations = await analyzer.generateRecommendations(analysis);

if (recommendations.length > 0) {
  console.log('\n💡 РЕКОМЕНДАЦИИ:');
  recommendations.forEach(rec => {
    const priorityEmoji = rec.priority === 'high' ? '🔥' : rec.priority === 'medium' ? '⚠️' : 'ℹ️';
    console.log(`${priorityEmoji} ${rec.title}`);
    console.log(`   ${rec.description}`);
    console.log(`   Действие: ${rec.action}\n`);
  });
}

// Поиск оптимальных складов
const optimalWarehouses = await analyzer.findOptimalWarehouses({
  must_be_active: true,
  warehouse_types: ['fbo', 'fbs'],
  required_services: ['packaging', 'quality_check'],
  min_weight_capacity: 100
});

console.log(`\n🎯 Найдено ${optimalWarehouses.length} оптимальных складов`);
optimalWarehouses.forEach(warehouse => {
  console.log(`  • ${warehouse.name} (${warehouse.city})`);
});
```

### Оптимизация доставки

```typescript
class DeliveryOptimizer {
  constructor(private api: OzonSellerAPI) {}
  
  async optimizeDeliveryForOrder(order: DeliveryOrder): Promise<DeliveryOptimization> {
    // Получаем список складов в регионе заказа
    const warehouses = await this.api.warehouse.getWarehousesList({
      region: order.delivery_region,
      is_active: true
    });
    
    const optimizationResults: DeliveryOption[] = [];
    
    // Анализируем каждый склад
    for (const warehouse of warehouses.warehouses || []) {
      // Проверяем совместимость склада с заказом
      if (!this.isWarehouseCompatible(warehouse, order)) {
        continue;
      }
      
      // Получаем методы доставки для склада
      const deliveryMethods = await this.api.warehouse.getDeliveryMethods({
        warehouse_id: warehouse.warehouse_id,
        delivery_city: order.delivery_city,
        max_cost: order.max_delivery_cost,
        max_delivery_days: order.max_delivery_days
      });
      
      // Анализируем каждый метод доставки
      for (const method of deliveryMethods.delivery_methods || []) {
        if (!method.is_active) continue;
        
        const option = this.calculateDeliveryOption(warehouse, method, order);
        if (option) {
          optimizationResults.push(option);
        }
      }
      
      // Задержка для соблюдения лимитов API
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // Сортируем варианты по оптимальности
    const sortedOptions = this.rankDeliveryOptions(optimizationResults, order.preferences);
    
    return {
      order_id: order.order_id,
      total_options: optimizationResults.length,
      recommended_options: sortedOptions.slice(0, 3),
      all_options: sortedOptions,
      optimization_criteria: order.preferences,
      analysis: this.generateOptimizationAnalysis(sortedOptions)
    };
  }
  
  private isWarehouseCompatible(warehouse: Warehouse, order: DeliveryOrder): boolean {
    // Проверяем вес
    if (warehouse.restrictions?.max_weight && order.total_weight > warehouse.restrictions.max_weight) {
      return false;
    }
    
    // Проверяем размеры
    if (warehouse.restrictions?.max_dimensions) {
      const { length, width, height } = warehouse.restrictions.max_dimensions;
      if (order.dimensions.length > length || 
          order.dimensions.width > width || 
          order.dimensions.height > height) {
        return false;
      }
    }
    
    // Проверяем запрещенные категории
    if (warehouse.restrictions?.prohibited_categories) {
      const hasProhibited = order.product_categories.some(category => 
        warehouse.restrictions!.prohibited_categories!.includes(category)
      );
      if (hasProhibited) {
        return false;
      }
    }
    
    return true;
  }
  
  private calculateDeliveryOption(
    warehouse: Warehouse, 
    method: DeliveryMethod, 
    order: DeliveryOrder
  ): DeliveryOption | null {
    // Базовая стоимость
    let totalCost = method.cost;
    let totalDays = method.delivery_days;
    
    // Дополнительные расходы по зонам
    if (method.delivery_zones) {
      const zone = method.delivery_zones.find(z => 
        z.cities?.includes(order.delivery_city)
      );
      if (zone) {
        totalCost += zone.additional_cost;
        totalDays += zone.additional_days;
      }
    }
    
    // Дополнительные расходы по весу
    if (method.weight_limits?.cost_per_kg && order.total_weight > 1) {
      totalCost += (order.total_weight - 1) * method.weight_limits.cost_per_kg;
    }
    
    // Проверяем лимиты заказа
    if (order.max_delivery_cost && totalCost > order.max_delivery_cost) {
      return null;
    }
    
    if (order.max_delivery_days && totalDays > order.max_delivery_days) {
      return null;
    }
    
    // Рассчитываем оценку оптимальности
    const score = this.calculateOptimalityScore(
      { totalCost, totalDays, warehouse, method },
      order.preferences
    );
    
    return {
      warehouse_id: warehouse.warehouse_id,
      warehouse_name: warehouse.name,
      warehouse_city: warehouse.city,
      delivery_method_id: method.delivery_method_id,
      delivery_method_name: method.name,
      delivery_type: method.type,
      total_cost: totalCost,
      currency: method.currency,
      delivery_days: totalDays,
      optimality_score: score,
      features: this.extractDeliveryFeatures(method),
      estimated_delivery_date: this.calculateDeliveryDate(totalDays)
    };
  }
  
  private calculateOptimalityScore(
    option: {
      totalCost: number;
      totalDays: number;
      warehouse: Warehouse;
      method: DeliveryMethod;
    },
    preferences: DeliveryPreferences
  ): number {
    let score = 0;
    
    // Весовые коэффициенты
    const costWeight = preferences.cost_importance || 0.3;
    const speedWeight = preferences.speed_importance || 0.4;
    const reliabilityWeight = preferences.reliability_importance || 0.3;
    
    // Нормализованная оценка стоимости (меньше = лучше)
    const costScore = Math.max(0, 100 - (option.totalCost / 10));
    
    // Нормализованная оценка скорости (меньше дней = лучше)
    const speedScore = Math.max(0, 100 - (option.totalDays * 10));
    
    // Оценка надежности (на основе типа доставки и склада)
    let reliabilityScore = 70; // базовая оценка
    if (option.method.type === 'express') reliabilityScore += 20;
    if (option.method.type === 'courier') reliabilityScore += 10;
    if (option.warehouse.type === 'fbo') reliabilityScore += 15;
    
    // Итоговая оценка
    score = (costScore * costWeight) + (speedScore * speedWeight) + (reliabilityScore * reliabilityWeight);
    
    return Math.min(100, Math.max(0, score));
  }
  
  private rankDeliveryOptions(options: DeliveryOption[], preferences: DeliveryPreferences): DeliveryOption[] {
    return options.sort((a, b) => {
      // Основная сортировка по оценке оптимальности
      if (b.optimality_score !== a.optimality_score) {
        return b.optimality_score - a.optimality_score;
      }
      
      // Вторичная сортировка по предпочтениям
      if (preferences.primary_criteria === 'cost') {
        return a.total_cost - b.total_cost;
      } else if (preferences.primary_criteria === 'speed') {
        return a.delivery_days - b.delivery_days;
      }
      
      return 0;
    });
  }
  
  private extractDeliveryFeatures(method: DeliveryMethod): string[] {
    const features: string[] = [];
    
    if (method.additional_services) {
      features.push(...method.additional_services.map(s => s.name));
    }
    
    if (method.delivery_schedule && method.delivery_schedule.length > 0) {
      features.push('Гибкое расписание');
    }
    
    if (method.type === 'express') {
      features.push('Экспресс-доставка');
    }
    
    return features;
  }
  
  private calculateDeliveryDate(deliveryDays: number): string {
    const date = new Date();
    date.setDate(date.getDate() + deliveryDays);
    return date.toISOString().split('T')[0];
  }
  
  private generateOptimizationAnalysis(options: DeliveryOption[]): OptimizationAnalysis {
    if (options.length === 0) {
      return {
        best_option: null,
        cost_range: { min: 0, max: 0 },
        delivery_time_range: { min: 0, max: 0 },
        recommendations: ['Нет доступных вариантов доставки для данного заказа']
      };
    }
    
    const costs = options.map(o => o.total_cost);
    const days = options.map(o => o.delivery_days);
    
    return {
      best_option: options[0],
      cost_range: {
        min: Math.min(...costs),
        max: Math.max(...costs)
      },
      delivery_time_range: {
        min: Math.min(...days),
        max: Math.max(...days)
      },
      recommendations: this.generateRecommendations(options)
    };
  }
  
  private generateRecommendations(options: DeliveryOption[]): string[] {
    const recommendations: string[] = [];
    
    const bestOption = options[0];
    if (bestOption) {
      recommendations.push(`Рекомендуем: ${bestOption.delivery_method_name} через ${bestOption.warehouse_name}`);
    }
    
    const budgetOption = options.reduce((min, option) => 
      option.total_cost < min.total_cost ? option : min
    );
    
    if (budgetOption && budgetOption !== bestOption) {
      recommendations.push(`Экономный вариант: ${budgetOption.delivery_method_name} (${budgetOption.total_cost} руб.)`);
    }
    
    const fastestOption = options.reduce((min, option) => 
      option.delivery_days < min.delivery_days ? option : min
    );
    
    if (fastestOption && fastestOption !== bestOption && fastestOption !== budgetOption) {
      recommendations.push(`Самый быстрый: ${fastestOption.delivery_method_name} (${fastestOption.delivery_days} дней)`);
    }
    
    return recommendations;
  }
}

// Интерфейсы для оптимизатора доставки
interface DeliveryOrder {
  order_id: string;
  total_weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  product_categories: string[];
  delivery_city: string;
  delivery_region: string;
  max_delivery_cost?: number;
  max_delivery_days?: number;
  preferences: DeliveryPreferences;
}

interface DeliveryPreferences {
  primary_criteria: 'cost' | 'speed' | 'reliability';
  cost_importance?: number;
  speed_importance?: number;
  reliability_importance?: number;
}

interface DeliveryOption {
  warehouse_id: number;
  warehouse_name: string;
  warehouse_city: string;
  delivery_method_id: number;
  delivery_method_name: string;
  delivery_type: string;
  total_cost: number;
  currency: string;
  delivery_days: number;
  optimality_score: number;
  features: string[];
  estimated_delivery_date: string;
}

interface DeliveryOptimization {
  order_id: string;
  total_options: number;
  recommended_options: DeliveryOption[];
  all_options: DeliveryOption[];
  optimization_criteria: DeliveryPreferences;
  analysis: OptimizationAnalysis;
}

interface OptimizationAnalysis {
  best_option: DeliveryOption | null;
  cost_range: { min: number; max: number };
  delivery_time_range: { min: number; max: number };
  recommendations: string[];
}

// Использование оптимизатора доставки
const deliveryOptimizer = new DeliveryOptimizer(api);

// Пример заказа
const sampleOrder: DeliveryOrder = {
  order_id: 'ORDER-2024-001',
  total_weight: 2.5,
  dimensions: {
    length: 30,
    width: 20,
    height: 15
  },
  product_categories: ['electronics', 'accessories'],
  delivery_city: 'Санкт-Петербург',
  delivery_region: 'Ленинградская область',
  max_delivery_cost: 500,
  max_delivery_days: 7,
  preferences: {
    primary_criteria: 'speed',
    cost_importance: 0.3,
    speed_importance: 0.5,
    reliability_importance: 0.2
  }
};

// Оптимизация доставки
const optimization = await deliveryOptimizer.optimizeDeliveryForOrder(sampleOrder);

console.log('🚚 РЕЗУЛЬТАТЫ ОПТИМИЗАЦИИ ДОСТАВКИ:');
console.log(`Заказ: ${optimization.order_id}`);
console.log(`Найдено вариантов: ${optimization.total_options}`);

console.log('\n🏆 РЕКОМЕНДУЕМЫЕ ВАРИАНТЫ:');
optimization.recommended_options.forEach((option, index) => {
  console.log(`\n${index + 1}. ${option.delivery_method_name}`);
  console.log(`   Склад: ${option.warehouse_name} (${option.warehouse_city})`);
  console.log(`   Стоимость: ${option.total_cost} ${option.currency}`);
  console.log(`   Время доставки: ${option.delivery_days} дней`);
  console.log(`   Оценка оптимальности: ${option.optimality_score.toFixed(1)}/100`);
  console.log(`   Дата доставки: ${option.estimated_delivery_date}`);
  
  if (option.features.length > 0) {
    console.log(`   Особенности: ${option.features.join(', ')}`);
  }
});

console.log('\n📊 АНАЛИЗ:');
console.log(`Диапазон стоимости: ${optimization.analysis.cost_range.min} - ${optimization.analysis.cost_range.max} руб.`);
console.log(`Диапазон времени: ${optimization.analysis.delivery_time_range.min} - ${optimization.analysis.delivery_time_range.max} дней`);

console.log('\n💡 РЕКОМЕНДАЦИИ:');
optimization.analysis.recommendations.forEach(rec => {
  console.log(`  • ${rec}`);
});
```

## Комплексные сценарии

### Система мониторинга складов

```typescript
class WarehouseMonitoringSystem {
  private api: OzonSellerAPI;
  private monitoringConfig: MonitoringConfig;
  private alerts: Alert[] = [];
  
  constructor(api: OzonSellerAPI, config: MonitoringConfig) {
    this.api = api;
    this.monitoringConfig = config;
  }
  
  async runCompleteMonitoring(): Promise<MonitoringReport> {
    console.log('🔍 Запуск комплексного мониторинга складов...');
    
    const report: MonitoringReport = {
      timestamp: new Date().toISOString(),
      warehouse_status: [],
      delivery_performance: [],
      alerts: [],
      recommendations: [],
      kpis: {
        warehouse_availability: 0,
        average_delivery_cost: 0,
        average_delivery_time: 0,
        service_coverage: 0
      }
    };
    
    try {
      // 1. Мониторинг складов
      const warehouseStatus = await this.monitorWarehouses();
      report.warehouse_status = warehouseStatus;
      
      // 2. Мониторинг доставки
      const deliveryPerformance = await this.monitorDeliveryMethods();
      report.delivery_performance = deliveryPerformance;
      
      // 3. Расчет KPI
      report.kpis = this.calculateKPIs(warehouseStatus, deliveryPerformance);
      
      // 4. Генерация предупреждений
      report.alerts = this.generateAlerts(warehouseStatus, deliveryPerformance);
      
      // 5. Генерация рекомендаций
      report.recommendations = this.generateRecommendations(report);
      
      console.log('✅ Мониторинг завершен успешно');
      
    } catch (error) {
      console.error('❌ Ошибка при мониторинге:', error);
      report.alerts.push({
        type: 'system_error',
        severity: 'high',
        message: `Системная ошибка мониторинга: ${error.message}`,
        timestamp: new Date().toISOString()
      });
    }
    
    return report;
  }
  
  private async monitorWarehouses(): Promise<WarehouseStatus[]> {
    const warehouses = await this.api.warehouse.getWarehousesList();
    const statuses: WarehouseStatus[] = [];
    
    for (const warehouse of warehouses.warehouses || []) {
      const status: WarehouseStatus = {
        warehouse_id: warehouse.warehouse_id,
        warehouse_name: warehouse.name,
        is_active: warehouse.is_active,
        type: warehouse.type,
        city: warehouse.city,
        region: warehouse.region,
        health_score: 100,
        issues: [],
        last_checked: new Date().toISOString()
      };
      
      // Проверка активности
      if (!warehouse.is_active) {
        status.health_score -= 50;
        status.issues.push('Склад неактивен');
      }
      
      // Проверка ограничений
      if (warehouse.restrictions) {
        if (warehouse.restrictions.max_weight && warehouse.restrictions.max_weight < 10) {
          status.health_score -= 20;
          status.issues.push('Низкий лимит веса');
        }
        
        if (warehouse.restrictions.prohibited_categories && 
            warehouse.restrictions.prohibited_categories.length > 10) {
          status.health_score -= 15;
          status.issues.push('Много запрещенных категорий');
        }
      }
      
      // Проверка контактной информации
      if (!warehouse.contact_info?.phone) {
        status.health_score -= 10;
        status.issues.push('Нет контактного телефона');
      }
      
      // Проверка режима работы
      if (!warehouse.working_hours || warehouse.working_hours.length === 0) {
        status.health_score -= 15;
        status.issues.push('Не указан режим работы');
      } else {
        const workingDays = warehouse.working_hours.filter(h => !h.is_day_off).length;
        if (workingDays < 5) {
          status.health_score -= 10;
          status.issues.push('Мало рабочих дней');
        }
      }
      
      statuses.push(status);
    }
    
    return statuses;
  }
  
  private async monitorDeliveryMethods(): Promise<DeliveryPerformance[]> {
    const warehouses = await this.api.warehouse.getWarehousesList({ is_active: true });
    const performances: DeliveryPerformance[] = [];
    
    for (const warehouse of warehouses.warehouses || []) {
      const deliveryMethods = await this.api.warehouse.getDeliveryMethods({
        warehouse_id: warehouse.warehouse_id
      });
      
      for (const method of deliveryMethods.delivery_methods || []) {
        const performance: DeliveryPerformance = {
          warehouse_id: warehouse.warehouse_id,
          warehouse_name: warehouse.name,
          delivery_method_id: method.delivery_method_id,
          method_name: method.name,
          method_type: method.type,
          cost: method.cost,
          delivery_days: method.delivery_days,
          is_active: method.is_active,
          performance_score: 100,
          issues: []
        };
        
        // Оценка производительности
        if (!method.is_active) {
          performance.performance_score -= 50;
          performance.issues.push('Метод доставки неактивен');
        }
        
        if (method.cost > 1000) {
          performance.performance_score -= 20;
          performance.issues.push('Высокая стоимость доставки');
        }
        
        if (method.delivery_days > 7) {
          performance.performance_score -= 25;
          performance.issues.push('Долгое время доставки');
        }
        
        if (!method.delivery_zones || method.delivery_zones.length === 0) {
          performance.performance_score -= 15;
          performance.issues.push('Нет зон доставки');
        }
        
        performances.push(performance);
      }
      
      // Задержка для соблюдения лимитов API
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    return performances;
  }
  
  private calculateKPIs(
    warehouseStatus: WarehouseStatus[], 
    deliveryPerformance: DeliveryPerformance[]
  ): KPIs {
    const activeWarehouses = warehouseStatus.filter(w => w.is_active);
    const activeMethods = deliveryPerformance.filter(d => d.is_active);
    
    return {
      warehouse_availability: (activeWarehouses.length / warehouseStatus.length) * 100,
      average_delivery_cost: activeMethods.reduce((sum, m) => sum + m.cost, 0) / activeMethods.length,
      average_delivery_time: activeMethods.reduce((sum, m) => sum + m.delivery_days, 0) / activeMethods.length,
      service_coverage: this.calculateServiceCoverage(warehouseStatus)
    };
  }
  
  private calculateServiceCoverage(warehouses: WarehouseStatus[]): number {
    const totalRegions = new Set(warehouses.map(w => w.region)).size;
    const activeRegions = new Set(warehouses.filter(w => w.is_active).map(w => w.region)).size;
    
    return (activeRegions / totalRegions) * 100;
  }
  
  private generateAlerts(
    warehouseStatus: WarehouseStatus[], 
    deliveryPerformance: DeliveryPerformance[]
  ): Alert[] {
    const alerts: Alert[] = [];
    
    // Критические проблемы складов
    const criticalWarehouses = warehouseStatus.filter(w => w.health_score < 50);
    if (criticalWarehouses.length > 0) {
      alerts.push({
        type: 'warehouse_critical',
        severity: 'high',
        message: `${criticalWarehouses.length} складов в критическом состоянии`,
        details: criticalWarehouses.map(w => `${w.warehouse_name}: ${w.issues.join(', ')}`),
        timestamp: new Date().toISOString()
      });
    }
    
    // Проблемы с доставкой
    const problematicMethods = deliveryPerformance.filter(d => d.performance_score < 60);
    if (problematicMethods.length > 0) {
      alerts.push({
        type: 'delivery_issues',
        severity: 'medium',
        message: `${problematicMethods.length} методов доставки с проблемами`,
        details: problematicMethods.map(m => `${m.warehouse_name} - ${m.method_name}: ${m.issues.join(', ')}`),
        timestamp: new Date().toISOString()
      });
    }
    
    // Проверка покрытия регионов
    const activeRegions = new Set(warehouseStatus.filter(w => w.is_active).map(w => w.region));
    const totalRegions = new Set(warehouseStatus.map(w => w.region));
    const uncoveredRegions = [...totalRegions].filter(r => !activeRegions.has(r));
    
    if (uncoveredRegions.length > 0) {
      alerts.push({
        type: 'coverage_gap',
        severity: 'medium',
        message: `${uncoveredRegions.length} регионов без активных складов`,
        details: uncoveredRegions,
        timestamp: new Date().toISOString()
      });
    }
    
    return alerts;
  }
  
  private generateRecommendations(report: MonitoringReport): string[] {
    const recommendations: string[] = [];
    
    // Рекомендации по KPI
    if (report.kpis.warehouse_availability < 80) {
      recommendations.push('Активировать неактивные склады или исследовать причины их отключения');
    }
    
    if (report.kpis.average_delivery_cost > 500) {
      recommendations.push('Пересмотреть тарифы доставки или найти более экономные методы');
    }
    
    if (report.kpis.average_delivery_time > 5) {
      recommendations.push('Оптимизировать время доставки за счет экспресс-методов');
    }
    
    if (report.kpis.service_coverage < 90) {
      recommendations.push('Расширить покрытие регионов для улучшения доступности сервиса');
    }
    
    // Рекомендации по предупреждениям
    const highSeverityAlerts = report.alerts.filter(a => a.severity === 'high');
    if (highSeverityAlerts.length > 0) {
      recommendations.push('Немедленно устранить критические проблемы складов');
    }
    
    return recommendations;
  }
  
  async generateDetailedReport(): Promise<string> {
    const report = await this.runCompleteMonitoring();
    
    let output = '# 📊 ДЕТАЛЬНЫЙ ОТЧЕТ МОНИТОРИНГА СКЛАДОВ\n\n';
    output += `**Время создания:** ${new Date(report.timestamp).toLocaleString()}\n\n`;
    
    // KPI
    output += '## 🎯 Ключевые показатели\n\n';
    output += `- **Доступность складов:** ${report.kpis.warehouse_availability.toFixed(1)}%\n`;
    output += `- **Средняя стоимость доставки:** ${report.kpis.average_delivery_cost.toFixed(0)} руб.\n`;
    output += `- **Среднее время доставки:** ${report.kpis.average_delivery_time.toFixed(1)} дней\n`;
    output += `- **Покрытие сервиса:** ${report.kpis.service_coverage.toFixed(1)}%\n\n`;
    
    // Предупреждения
    if (report.alerts.length > 0) {
      output += '## 🚨 Предупреждения\n\n';
      report.alerts.forEach(alert => {
        const emoji = alert.severity === 'high' ? '🔥' : alert.severity === 'medium' ? '⚠️' : 'ℹ️';
        output += `### ${emoji} ${alert.message}\n`;
        if (alert.details) {
          alert.details.forEach(detail => {
            output += `- ${detail}\n`;
          });
        }
        output += '\n';
      });
    }
    
    // Рекомендации
    if (report.recommendations.length > 0) {
      output += '## 💡 Рекомендации\n\n';
      report.recommendations.forEach((rec, index) => {
        output += `${index + 1}. ${rec}\n`;
      });
      output += '\n';
    }
    
    // Статус складов
    output += '## 🏭 Статус складов\n\n';
    report.warehouse_status.forEach(status => {
      const healthEmoji = status.health_score >= 80 ? '✅' : status.health_score >= 60 ? '⚠️' : '❌';
      output += `### ${healthEmoji} ${status.warehouse_name}\n`;
      output += `- **Регион:** ${status.region}, ${status.city}\n`;
      output += `- **Тип:** ${status.type}\n`;
      output += `- **Активен:** ${status.is_active ? 'Да' : 'Нет'}\n`;
      output += `- **Оценка здоровья:** ${status.health_score}/100\n`;
      if (status.issues.length > 0) {
        output += `- **Проблемы:** ${status.issues.join(', ')}\n`;
      }
      output += '\n';
    });
    
    return output;
  }
}

// Интерфейсы для системы мониторинга
interface MonitoringConfig {
  check_interval_minutes: number;
  alert_thresholds: {
    warehouse_health_score: number;
    delivery_performance_score: number;
    cost_threshold: number;
    time_threshold: number;
  };
  notification_settings: {
    email_alerts: boolean;
    webhook_url?: string;
  };
}

interface MonitoringReport {
  timestamp: string;
  warehouse_status: WarehouseStatus[];
  delivery_performance: DeliveryPerformance[];
  alerts: Alert[];
  recommendations: string[];
  kpis: KPIs;
}

interface WarehouseStatus {
  warehouse_id: number;
  warehouse_name: string;
  is_active: boolean;
  type: string;
  city: string;
  region: string;
  health_score: number;
  issues: string[];
  last_checked: string;
}

interface DeliveryPerformance {
  warehouse_id: number;
  warehouse_name: string;
  delivery_method_id: number;
  method_name: string;
  method_type: string;
  cost: number;
  delivery_days: number;
  is_active: boolean;
  performance_score: number;
  issues: string[];
}

interface Alert {
  type: string;
  severity: 'low' | 'medium' | 'high';
  message: string;
  details?: string[];
  timestamp: string;
}

interface KPIs {
  warehouse_availability: number;
  average_delivery_cost: number;
  average_delivery_time: number;
  service_coverage: number;
}

// Использование системы мониторинга
const monitoringConfig: MonitoringConfig = {
  check_interval_minutes: 60,
  alert_thresholds: {
    warehouse_health_score: 70,
    delivery_performance_score: 60,
    cost_threshold: 500,
    time_threshold: 7
  },
  notification_settings: {
    email_alerts: true,
    webhook_url: 'https://your-webhook-url.com/alerts'
  }
};

const monitoringSystem = new WarehouseMonitoringSystem(api, monitoringConfig);

// Запуск мониторинга
const monitoringReport = await monitoringSystem.runCompleteMonitoring();

console.log('🔍 РЕЗУЛЬТАТЫ МОНИТОРИНГА:');
console.log(`Проверено складов: ${monitoringReport.warehouse_status.length}`);
console.log(`Проверено методов доставки: ${monitoringReport.delivery_performance.length}`);
console.log(`Найдено предупреждений: ${monitoringReport.alerts.length}`);

// Вывод KPI
console.log('\n📈 КЛЮЧЕВЫЕ ПОКАЗАТЕЛИ:');
console.log(`Доступность складов: ${monitoringReport.kpis.warehouse_availability.toFixed(1)}%`);
console.log(`Средняя стоимость доставки: ${monitoringReport.kpis.average_delivery_cost.toFixed(0)} руб.`);
console.log(`Среднее время доставки: ${monitoringReport.kpis.average_delivery_time.toFixed(1)} дней`);
console.log(`Покрытие сервиса: ${monitoringReport.kpis.service_coverage.toFixed(1)}%`);

// Генерация детального отчета
const detailedReport = await monitoringSystem.generateDetailedReport();
console.log('\n📄 ДЕТАЛЬНЫЙ ОТЧЕТ ГОТОВ');

// В реальном приложении здесь можно сохранить отчет в файл
// fs.writeFileSync('./warehouse_monitoring_report.md', detailedReport);
```

## Обработка ошибок

```typescript
async function safeWarehouseOperation() {
  try {
    const warehouses = await api.warehouse.getWarehousesList();
    return warehouses;
    
  } catch (error) {
    if (error.code === 'ACCESS_DENIED') {
      console.error('Нет доступа к информации о складах');
    } else if (error.code === 'WAREHOUSE_NOT_FOUND') {
      console.error('Склад не найден');
    } else if (error.code === 'DELIVERY_METHOD_UNAVAILABLE') {
      console.error('Метод доставки недоступен');
    } else if (error.code === 'RATE_LIMIT_EXCEEDED') {
      console.error('Превышен лимит запросов - повторите через минуту');
      await new Promise(resolve => setTimeout(resolve, 60000));
      // Повторная попытка
    } else {
      console.error('Неизвестная ошибка:', error);
    }
    
    return null;
  }
}

// Функция с повторными попытками для получения методов доставки
async function getDeliveryMethodsWithRetry(
  warehouseId: number, 
  maxRetries: number = 3
): Promise<any> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await api.warehouse.getDeliveryMethods({ warehouse_id: warehouseId });
    } catch (error) {
      console.error(`Попытка ${attempt}/${maxRetries} не удалась:`, error.message);
      
      if (attempt === maxRetries) {
        throw new Error(`Не удалось получить методы доставки после ${maxRetries} попыток`);
      }
      
      // Экспоненциальная задержка
      const delay = Math.pow(2, attempt) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}
```

## Лучшие практики

### 1. Кэширование данных о складах
```typescript
class WarehouseCache {
  private warehouseCache = new Map<string, { data: any; expiry: number }>();
  private readonly CACHE_TTL = 30 * 60 * 1000; // 30 минут
  
  async getWarehouses(useCache: boolean = true): Promise<any> {
    const cacheKey = 'warehouses_list';
    
    if (useCache) {
      const cached = this.warehouseCache.get(cacheKey);
      if (cached && Date.now() < cached.expiry) {
        return cached.data;
      }
    }
    
    const data = await api.warehouse.getWarehousesList();
    
    this.warehouseCache.set(cacheKey, {
      data,
      expiry: Date.now() + this.CACHE_TTL
    });
    
    return data;
  }
}
```

### 2. Оптимизация запросов методов доставки
```typescript
async function getOptimizedDeliveryMethods(warehouseIds: number[]) {
  const results = new Map();
  
  // Группируем запросы для минимизации API calls
  for (const warehouseId of warehouseIds) {
    try {
      const methods = await api.warehouse.getDeliveryMethods({
        warehouse_id: warehouseId,
        is_active: true // Получаем только активные
      });
      
      results.set(warehouseId, methods);
      
      // Соблюдаем лимиты API
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`Ошибка для склада ${warehouseId}:`, error);
      results.set(warehouseId, null);
    }
  }
  
  return results;
}
```

### 3. Валидация данных склада
```typescript
function validateWarehouseData(warehouse: Warehouse): string[] {
  const errors: string[] = [];
  
  if (!warehouse.name || warehouse.name.trim() === '') {
    errors.push('Название склада обязательно');
  }
  
  if (!warehouse.address || warehouse.address.trim() === '') {
    errors.push('Адрес склада обязателен');
  }
  
  if (!warehouse.city || warehouse.city.trim() === '') {
    errors.push('Город обязателен');
  }
  
  if (warehouse.coordinates) {
    if (warehouse.coordinates.latitude < -90 || warehouse.coordinates.latitude > 90) {
      errors.push('Некорректная широта');
    }
    if (warehouse.coordinates.longitude < -180 || warehouse.coordinates.longitude > 180) {
      errors.push('Некорректная долгота');
    }
  }
  
  return errors;
}
```

## Интеграция с другими API

### Связь с FBS/FBO API
```typescript
async function getWarehouseOrderCapacity() {
  // Получаем склады
  const warehouses = await api.warehouse.getWarehousesList();
  
  // Для каждого склада получаем данные о заказах
  for (const warehouse of warehouses.warehouses || []) {
    if (warehouse.type === 'fbs') {
      // Получаем FBS заказы для склада
      // const fbsOrders = await api.fbs.getOrdersList({ warehouse_id: warehouse.warehouse_id });
      console.log(`FBS склад ${warehouse.name}: обработка заказов`);
    } else if (warehouse.type === 'fbo') {
      // Получаем FBO поставки для склада
      // const fboSupplies = await api.fbo.getSupplyList({ warehouse_id: warehouse.warehouse_id });
      console.log(`FBO склад ${warehouse.name}: управление поставками`);
    }
  }
}
```

### Интеграция с товарами и остатками
```typescript
async function optimizeInventoryByWarehouses() {
  const warehouses = await api.warehouse.getWarehousesList({ is_active: true });
  
  for (const warehouse of warehouses.warehouses || []) {
    console.log(`Анализ товаров для склада ${warehouse.name}:`);
    
    // Получаем остатки товаров на складе
    // const stocks = await api.pricesStocks.getStocksList({ warehouse_id: warehouse.warehouse_id });
    
    // Анализируем ограничения склада
    if (warehouse.restrictions) {
      console.log(`Ограничения склада:`);
      console.log(`- Максимальный вес: ${warehouse.restrictions.max_weight} кг`);
      console.log(`- Запрещенные категории: ${warehouse.restrictions.prohibited_categories?.join(', ')}`);
    }
  }
}
```