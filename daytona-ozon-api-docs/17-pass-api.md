# Pass API Documentation

## Overview

Pass API предоставляет возможности для управления пропусками прибытия и доступом к складу OZON. API включает **7 методов** для создания, обновления и удаления пропусков как для доставки товаров, так и для их возврата.

### Key Features

- 🚛 **Управление пропусками перевозки** - создание, обновление и удаление пропусков для доставки товаров
- 📋 **Список пропусков** - получение списка всех пропусков с фильтрацией
- 🔄 **Пропуски для возврата** - управление пропусками для возврата товаров
- 👤 **Информация о водителях** - данные о водителях и транспортных средствах
- 📅 **Планирование прибытия** - указание даты и времени прибытия на склад
- 💬 **Комментарии** - добавление комментариев к пропускам
- 📄 **Интеграция с отправлениями** - связь пропусков с posting_number

## Available Methods

### Carriage Pass Methods

#### createCarriagePass()
Создает пропуск для перевозки товаров на склад OZON.

```typescript
const carriagePass = await passApi.createCarriagePass({
  carriage_id: 12345,
  arrival_passes: [{
    vehicle_number: 'А123БВ777',
    driver_name: 'Иванов Иван Иванович',
    driver_license: '12 34 567890',
    arrival_date: '2024-01-15T09:00:00Z',
    comment: 'Плановая поставка товаров'
  }]
});

console.log(`Создано пропусков: ${carriagePass.arrival_pass_ids?.length}`);
```

#### updateCarriagePass()
Обновляет существующие пропуски для перевозки.

```typescript
await passApi.updateCarriagePass({
  carriage_id: 12345,
  arrival_passes: [{
    arrival_pass_id: '67890',
    vehicle_number: 'В789ДЕ999',
    driver_name: 'Сидоров Сидор Сидорович',
    driver_license: '11 22 334455',
    arrival_date: '2024-01-16T10:00:00Z',
    comment: 'Изменено время прибытия'
  }]
});
```

#### deleteCarriagePass()
Удаляет пропуски для перевозки.

```typescript
await passApi.deleteCarriagePass({
  carriage_id: 12345,
  arrival_pass_ids: ['67890', '54321']
});
```

### Return Pass Methods

#### createReturnPass()
Создает пропуск для возврата товаров.

```typescript
const returnPass = await passApi.createReturnPass({
  arrival_passes: [{
    vehicle_number: 'С123ЖЗ111',
    driver_name: 'Федоров Федор Федорович',
    driver_license: '55 66 778899',
    arrival_date: '2024-01-20T11:00:00Z',
    posting_number: '12345-0001-1',
    comment: 'Возврат бракованных товаров'
  }]
});
```

#### updateReturnPass()
Обновляет пропуски для возврата.

```typescript
await passApi.updateReturnPass({
  arrival_passes: [{
    arrival_pass_id: '11111',
    vehicle_number: 'Т456УФ222',
    driver_name: 'Николаев Николай Николаевич',
    driver_license: '33 44 556677',
    arrival_date: '2024-01-21T15:00:00Z',
    posting_number: '12345-0002-1',
    comment: 'Обновлено время прибытия для возврата'
  }]
});
```

#### deleteReturnPass()
Удаляет пропуски для возврата.

```typescript
await passApi.deleteReturnPass({
  arrival_pass_ids: ['11111', '22222']
});
```

### List Method

#### getPassList()
Получает список пропусков с возможностью фильтрации.

```typescript
const passList = await passApi.getPassList({
  limit: 50,
  filter: {
    carriage_id: 12345,
    status: 'ACTIVE',
    date_from: '2024-01-01',
    date_to: '2024-01-31'
  }
});

passList.arrival_passes?.forEach(pass => {
  console.log(`Пропуск ${pass.arrival_pass_id}:`);
  console.log(`  Автомобиль: ${pass.vehicle_number}`);
  console.log(`  Водитель: ${pass.driver_name}`);
  console.log(`  Прибытие: ${pass.arrival_date}`);
  console.log(`  Статус: ${pass.status}`);
});
```

## TypeScript Interfaces

### Request Types

```typescript
interface PassCreateCarriagePassRequest {
  carriage_id: number;
  arrival_passes: ArrivalPassInfo[];
}

interface PassCreateReturnPassRequest {
  arrival_passes: ReturnPassInfo[];
}

interface PassUpdateCarriagePassRequest {
  carriage_id: number;
  arrival_passes: UpdateArrivalPassInfo[];
}

interface PassUpdateReturnPassRequest {
  arrival_passes: UpdateReturnPassInfo[];
}

interface PassDeleteCarriagePassRequest {
  carriage_id: number;
  arrival_pass_ids: string[];
}

interface PassDeleteReturnPassRequest {
  arrival_pass_ids: string[];
}

interface PassListRequest {
  limit?: number;
  cursor?: string;
  filter?: {
    carriage_id?: number;
    status?: 'ACTIVE' | 'EXPIRED' | 'CANCELLED';
    date_from?: string;
    date_to?: string;
  };
}

interface ArrivalPassInfo {
  vehicle_number: string;
  driver_name: string;
  driver_license: string;
  arrival_date: string;
  comment?: string;
}

interface ReturnPassInfo extends ArrivalPassInfo {
  posting_number: string;
}

interface UpdateArrivalPassInfo extends ArrivalPassInfo {
  arrival_pass_id: string;
}

interface UpdateReturnPassInfo extends ReturnPassInfo {
  arrival_pass_id: string;
}
```

### Response Types

```typescript
interface PassCreateCarriagePassResponse {
  arrival_pass_ids?: string[];
}

interface PassCreateReturnPassResponse {
  arrival_pass_ids?: string[];
}

interface PassListResponse {
  arrival_passes?: PassInfo[];
  cursor?: string;
  has_next?: boolean;
}

interface PassInfo {
  arrival_pass_id: string;
  carriage_id?: number;
  vehicle_number: string;
  driver_name: string;
  driver_license: string;
  arrival_date: string;
  status: 'ACTIVE' | 'EXPIRED' | 'CANCELLED' | 'USED';
  comment?: string;
  posting_number?: string;
  created_at: string;
  updated_at?: string;
}
```

## Usage Examples

### Basic Pass Management

```typescript
import { OzonApi } from 'bmad-ozon-seller-api';

const ozonApi = new OzonApi({
  clientId: 'your-client-id',
  apiKey: 'your-api-key'
});

// Создание пропуска для доставки
async function createDeliveryPass() {
  try {
    const result = await ozonApi.pass.createCarriagePass({
      carriage_id: 12345,
      arrival_passes: [{
        vehicle_number: 'А123БВ777',
        driver_name: 'Иванов Иван Иванович',
        driver_license: '12 34 567890',
        arrival_date: '2024-01-15T09:00:00Z',
        comment: 'Доставка товаров партнера'
      }]
    });
    
    console.log('Пропуск создан:', result.arrival_pass_ids);
    return result.arrival_pass_ids;
  } catch (error) {
    console.error('Ошибка создания пропуска:', error);
  }
}

// Создание пропуска для возврата
async function createReturnPass() {
  try {
    const result = await ozonApi.pass.createReturnPass({
      arrival_passes: [{
        vehicle_number: 'Б456ГД888',
        driver_name: 'Петров Петр Петрович',
        driver_license: '98 76 543210',
        arrival_date: '2024-01-20T14:00:00Z',
        posting_number: '12345-0001-1',
        comment: 'Возврат поврежденных товаров'
      }]
    });
    
    console.log('Пропуск для возврата создан:', result.arrival_pass_ids);
    return result.arrival_pass_ids;
  } catch (error) {
    console.error('Ошибка создания пропуска для возврата:', error);
  }
}
```

### Advanced Pass Filtering

```typescript
// Получение списка активных пропусков за период
async function getActivePassesForPeriod(carriageId: number, dateFrom: string, dateTo: string) {
  try {
    let allPasses: PassInfo[] = [];
    let cursor: string | undefined;
    
    do {
      const response = await ozonApi.pass.getPassList({
        limit: 100,
        cursor,
        filter: {
          carriage_id: carriageId,
          status: 'ACTIVE',
          date_from: dateFrom,
          date_to: dateTo
        }
      });
      
      if (response.arrival_passes) {
        allPasses = allPasses.concat(response.arrival_passes);
      }
      
      cursor = response.has_next ? response.cursor : undefined;
    } while (cursor);
    
    return allPasses;
  } catch (error) {
    console.error('Ошибка получения списка пропусков:', error);
    return [];
  }
}

// Использование
const activePasses = await getActivePassesForPeriod(
  12345, 
  '2024-01-01', 
  '2024-01-31'
);

console.log(`Найдено активных пропусков: ${activePasses.length}`);
activePasses.forEach(pass => {
  console.log(`${pass.arrival_pass_id}: ${pass.vehicle_number} - ${pass.arrival_date}`);
});
```

## Complex Scenarios

### Pass Management System

Класс для комплексного управления пропусками:

```typescript
class PassManagementSystem {
  constructor(private ozonApi: OzonApi) {}
  
  /**
   * Планирование доставок на несколько дней
   */
  async planDeliveries(carriageId: number, deliveries: DeliveryPlan[]) {
    const results = [];
    
    for (const delivery of deliveries) {
      try {
        const pass = await this.ozonApi.pass.createCarriagePass({
          carriage_id: carriageId,
          arrival_passes: [{
            vehicle_number: delivery.vehicleNumber,
            driver_name: delivery.driverName,
            driver_license: delivery.driverLicense,
            arrival_date: delivery.arrivalDate,
            comment: delivery.comment
          }]
        });
        
        results.push({
          delivery,
          passIds: pass.arrival_pass_ids,
          status: 'success'
        });
        
        console.log(`✅ Пропуск создан для ${delivery.vehicleNumber}`);
      } catch (error) {
        results.push({
          delivery,
          error: error.message,
          status: 'failed'
        });
        
        console.error(`❌ Ошибка создания пропуска для ${delivery.vehicleNumber}:`, error);
      }
      
      // Небольшая задержка между запросами
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    return results;
  }
  
  /**
   * Обновление времени прибытия для нескольких пропусков
   */
  async updateArrivalTimes(updates: PassTimeUpdate[]) {
    const results = [];
    
    for (const update of updates) {
      try {
        if (update.type === 'carriage') {
          await this.ozonApi.pass.updateCarriagePass({
            carriage_id: update.carriageId!,
            arrival_passes: [{
              arrival_pass_id: update.passId,
              vehicle_number: update.vehicleNumber,
              driver_name: update.driverName,
              driver_license: update.driverLicense,
              arrival_date: update.newArrivalDate,
              comment: update.comment
            }]
          });
        } else {
          await this.ozonApi.pass.updateReturnPass({
            arrival_passes: [{
              arrival_pass_id: update.passId,
              vehicle_number: update.vehicleNumber,
              driver_name: update.driverName,
              driver_license: update.driverLicense,
              arrival_date: update.newArrivalDate,
              posting_number: update.postingNumber!,
              comment: update.comment
            }]
          });
        }
        
        results.push({
          passId: update.passId,
          status: 'updated'
        });
        
        console.log(`✅ Пропуск ${update.passId} обновлен`);
      } catch (error) {
        results.push({
          passId: update.passId,
          status: 'failed',
          error: error.message
        });
        
        console.error(`❌ Ошибка обновления пропуска ${update.passId}:`, error);
      }
    }
    
    return results;
  }
  
  /**
   * Получение статистики по пропускам
   */
  async getPassStatistics(carriageId?: number, dateFrom?: string, dateTo?: string) {
    try {
      const passes = await this.getAllPasses(carriageId, dateFrom, dateTo);
      
      const stats = passes.reduce((acc, pass) => {
        acc.total++;
        acc.byStatus[pass.status] = (acc.byStatus[pass.status] || 0) + 1;
        
        if (pass.posting_number) {
          acc.returnPasses++;
        } else {
          acc.deliveryPasses++;
        }
        
        return acc;
      }, {
        total: 0,
        byStatus: {} as Record<string, number>,
        deliveryPasses: 0,
        returnPasses: 0
      });
      
      return stats;
    } catch (error) {
      console.error('Ошибка получения статистики:', error);
      throw error;
    }
  }
  
  private async getAllPasses(carriageId?: number, dateFrom?: string, dateTo?: string) {
    let allPasses: PassInfo[] = [];
    let cursor: string | undefined;
    
    do {
      const response = await this.ozonApi.pass.getPassList({
        limit: 1000,
        cursor,
        filter: {
          carriage_id: carriageId,
          date_from: dateFrom,
          date_to: dateTo
        }
      });
      
      if (response.arrival_passes) {
        allPasses = allPasses.concat(response.arrival_passes);
      }
      
      cursor = response.has_next ? response.cursor : undefined;
    } while (cursor);
    
    return allPasses;
  }
}

// Интерфейсы для системы управления
interface DeliveryPlan {
  vehicleNumber: string;
  driverName: string;
  driverLicense: string;
  arrivalDate: string;
  comment?: string;
}

interface PassTimeUpdate {
  passId: string;
  type: 'carriage' | 'return';
  carriageId?: number;
  postingNumber?: string;
  vehicleNumber: string;
  driverName: string;
  driverLicense: string;
  newArrivalDate: string;
  comment?: string;
}

// Использование системы управления пропусками
const passManager = new PassManagementSystem(ozonApi);

// Планирование доставок
const deliveryPlans: DeliveryPlan[] = [
  {
    vehicleNumber: 'А111БВ222',
    driverName: 'Иванов И.И.',
    driverLicense: '12 34 567890',
    arrivalDate: '2024-01-15T09:00:00Z',
    comment: 'Утренняя доставка'
  },
  {
    vehicleNumber: 'Г333ДЕ444',
    driverName: 'Петров П.П.',
    driverLicense: '98 76 543210',
    arrivalDate: '2024-01-15T14:00:00Z',
    comment: 'Дневная доставка'
  }
];

const deliveryResults = await passManager.planDeliveries(12345, deliveryPlans);
console.log('Результаты планирования:', deliveryResults);

// Получение статистики
const stats = await passManager.getPassStatistics(12345, '2024-01-01', '2024-01-31');
console.log('Статистика пропусков:', stats);
```

### Pass Monitoring Dashboard

Система мониторинга пропусков:

```typescript
class PassMonitoringDashboard {
  constructor(private ozonApi: OzonApi) {}
  
  /**
   * Мониторинг просроченных пропусков
   */
  async monitorExpiredPasses() {
    try {
      const passes = await this.getAllActivePasses();
      const now = new Date();
      const expiredPasses = passes.filter(pass => {
        const arrivalDate = new Date(pass.arrival_date);
        return arrivalDate < now && pass.status === 'ACTIVE';
      });
      
      if (expiredPasses.length > 0) {
        console.warn(`⚠️ Найдено ${expiredPasses.length} просроченных пропусков:`);
        expiredPasses.forEach(pass => {
          console.warn(`  - ${pass.arrival_pass_id}: ${pass.vehicle_number} (${pass.arrival_date})`);
        });
        
        return expiredPasses;
      }
      
      console.log('✅ Просроченных пропусков не найдено');
      return [];
    } catch (error) {
      console.error('Ошибка мониторинга просроченных пропусков:', error);
      throw error;
    }
  }
  
  /**
   * Отчет о пропусках за день
   */
  async generateDailyReport(date: string) {
    try {
      const dateStart = `${date}T00:00:00Z`;
      const dateEnd = `${date}T23:59:59Z`;
      
      const passes = await this.getPassesForPeriod(dateStart, dateEnd);
      
      const report = {
        date,
        totalPasses: passes.length,
        deliveryPasses: passes.filter(p => !p.posting_number).length,
        returnPasses: passes.filter(p => p.posting_number).length,
        statusBreakdown: this.getStatusBreakdown(passes),
        hourlyDistribution: this.getHourlyDistribution(passes),
        topDrivers: this.getTopDrivers(passes, 5)
      };
      
      console.log('📊 Отчет о пропусках за', date);
      console.log('Всего пропусков:', report.totalPasses);
      console.log('Доставки:', report.deliveryPasses);
      console.log('Возвраты:', report.returnPasses);
      console.log('Статусы:', report.statusBreakdown);
      
      return report;
    } catch (error) {
      console.error('Ошибка создания отчета:', error);
      throw error;
    }
  }
  
  private async getAllActivePasses() {
    return this.getPassesForPeriod();
  }
  
  private async getPassesForPeriod(dateFrom?: string, dateTo?: string) {
    let allPasses: PassInfo[] = [];
    let cursor: string | undefined;
    
    do {
      const response = await this.ozonApi.pass.getPassList({
        limit: 1000,
        cursor,
        filter: {
          date_from: dateFrom,
          date_to: dateTo
        }
      });
      
      if (response.arrival_passes) {
        allPasses = allPasses.concat(response.arrival_passes);
      }
      
      cursor = response.has_next ? response.cursor : undefined;
    } while (cursor);
    
    return allPasses;
  }
  
  private getStatusBreakdown(passes: PassInfo[]) {
    return passes.reduce((acc, pass) => {
      acc[pass.status] = (acc[pass.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }
  
  private getHourlyDistribution(passes: PassInfo[]) {
    const distribution: Record<number, number> = {};
    
    passes.forEach(pass => {
      const hour = new Date(pass.arrival_date).getHours();
      distribution[hour] = (distribution[hour] || 0) + 1;
    });
    
    return distribution;
  }
  
  private getTopDrivers(passes: PassInfo[], limit: number) {
    const driverCounts = passes.reduce((acc, pass) => {
      acc[pass.driver_name] = (acc[pass.driver_name] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(driverCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, limit)
      .map(([name, count]) => ({ name, count }));
  }
}

// Использование системы мониторинга
const dashboard = new PassMonitoringDashboard(ozonApi);

// Мониторинг просроченных пропусков
const expiredPasses = await dashboard.monitorExpiredPasses();

// Ежедневный отчет
const dailyReport = await dashboard.generateDailyReport('2024-01-15');
```

## Error Handling

```typescript
// Обработка ошибок при работе с пропусками
async function safePassOperation() {
  try {
    const result = await ozonApi.pass.createCarriagePass({
      carriage_id: 12345,
      arrival_passes: [{
        vehicle_number: 'А123БВ777',
        driver_name: 'Иванов И.И.',
        driver_license: '12 34 567890',
        arrival_date: '2024-01-15T09:00:00Z'
      }]
    });
    
    return result;
  } catch (error) {
    if (error.code === 'INVALID_PARAMETER') {
      console.error('Неверные параметры пропуска:', error.message);
    } else if (error.code === 'CARRIAGE_NOT_FOUND') {
      console.error('Перевозка не найдена:', error.message);
    } else if (error.code === 'ACCESS_DENIED') {
      console.error('Недостаточно прав для создания пропуска:', error.message);
    } else {
      console.error('Неожиданная ошибка:', error);
    }
    
    throw error;
  }
}
```

## Best Practices

### 1. Валидация данных водителей
```typescript
function validateDriverInfo(driverInfo: ArrivalPassInfo): boolean {
  // Проверка номера автомобиля (российский формат)
  const vehicleRegex = /^[АВЕКМНОРСТУХ]\d{3}[АВЕКМНОРСТУХ]{2}\d{2,3}$/;
  if (!vehicleRegex.test(driverInfo.vehicle_number)) {
    throw new Error('Неверный формат номера автомобиля');
  }
  
  // Проверка водительских прав
  const licenseRegex = /^\d{2}\s\d{2}\s\d{6}$/;
  if (!licenseRegex.test(driverInfo.driver_license)) {
    throw new Error('Неверный формат водительских прав');
  }
  
  // Проверка даты прибытия
  const arrivalDate = new Date(driverInfo.arrival_date);
  const now = new Date();
  if (arrivalDate <= now) {
    throw new Error('Дата прибытия должна быть в будущем');
  }
  
  return true;
}
```

### 2. Оптимизация работы с большим количеством пропусков
```typescript
async function processManyPasses(passes: ArrivalPassInfo[], batchSize = 10) {
  const results = [];
  
  for (let i = 0; i < passes.length; i += batchSize) {
    const batch = passes.slice(i, i + batchSize);
    const batchPromises = batch.map(pass => 
      ozonApi.pass.createCarriagePass({
        carriage_id: pass.carriage_id,
        arrival_passes: [pass]
      }).catch(error => ({ error, pass }))
    );
    
    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);
    
    // Задержка между батчами
    if (i + batchSize < passes.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  return results;
}
```

### 3. Кэширование списка пропусков
```typescript
class PassCache {
  private cache = new Map<string, { data: PassListResponse; timestamp: number }>();
  private readonly ttl = 5 * 60 * 1000; // 5 минут
  
  async getPassList(request: PassListRequest): Promise<PassListResponse> {
    const key = JSON.stringify(request);
    const cached = this.cache.get(key);
    
    if (cached && Date.now() - cached.timestamp < this.ttl) {
      return cached.data;
    }
    
    const data = await ozonApi.pass.getPassList(request);
    this.cache.set(key, { data, timestamp: Date.now() });
    
    return data;
  }
  
  clearCache() {
    this.cache.clear();
  }
}
```

## Integration Notes

- **Время прибытия**: Указывайте время в UTC формате ISO 8601
- **Номера автомобилей**: Используйте российский формат номерных знаков
- **Водительские права**: Формат "XX XX XXXXXX" (серия и номер)
- **Комментарии**: Ограничение длины - 500 символов
- **Rate Limiting**: Максимум 100 запросов в минуту
- **Carriage ID**: Обязательно для пропусков доставки
- **Posting Number**: Обязательно для пропусков возврата

Pass API обеспечивает полный контроль над процессом управления пропусками на склады OZON, позволяя эффективно планировать и отслеживать все поставки и возвраты товаров.