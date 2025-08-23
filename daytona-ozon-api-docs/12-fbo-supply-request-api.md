# FBO Supply Request API

API для управления заявками на поставку FBO в OZON Seller API.

**Количество методов**: 19 методов

## Обзор

FBO Supply Request API предоставляет полный цикл управления заявками на поставку FBO:
- 📝 Создание и управление черновиками заявок
- 📦 Управление грузоместами и их составом
- 🏷️ Генерация этикеток для грузомест
- ✏️ Редактирование товарного состава заявок
- ❌ Отмена заявок на поставку
- 🏭 Получение информации о складах и таймслотах

## Основные возможности

### 🎯 Жизненный цикл заявки
1. **Черновик** → создание с товарным составом
2. **Таймслот** → выбор времени поставки
3. **Заявка** → создание официальной заявки
4. **Грузоместа** → упаковка и маркировка
5. **Этикетки** → генерация для логистики

### 📦 Типы поставок
- **DIRECT** - прямая поставка на склад
- **CROSS_DOCK** - кросс-докинг через сортировочный центр

### 🏷️ Управление грузоместами
- Создание с указанием размеров и веса
- Распределение товаров по грузоместам
- Генерация этикеток для логистики
- Удаление и редактирование грузомест

### ⚠️ Важные ограничения
- Черновики действуют ограниченное время
- Нельзя редактировать заявки в статусе "В пути"
- Обязательное указание размеров и веса грузомест
- Ограничения по количеству палет в таймслоте

## Методы API

### Управление черновиками

#### createDraft()
**Назначение**: Создать черновик заявки на поставку

```typescript
interface FboSupplyRequestDraftCreateRequest {
  supply_type: 'DIRECT' | 'CROSS_DOCK';
  warehouse_id: number;
  items: Array<{
    sku: string;
    quantity: number;
  }>;
}
```

#### getDraftInfo()
**Назначение**: Получить информацию о черновике заявки

#### getTimeslotInfo()
**Назначение**: Получить доступные таймслоты для поставки

#### createSupplyOrderFromDraft()
**Назначение**: Создать заявку на поставку по черновику

#### getSupplyOrderCreateStatus()
**Назначение**: Получить статус создания заявки

### Управление грузоместами

#### createCargoes()
**Назначение**: Установить грузоместа в заявке

```typescript
interface FboSupplyRequestCargoesCreateRequest {
  supply_order_id: number;
  cargoes: Array<{
    cargo_number: string;
    weight: number;
    length: number;
    width: number;
    height: number;
    items: Array<{
      sku: string;
      quantity: number;
    }>;
  }>;
}
```

#### getCargoesCreateInfo()
**Назначение**: Получить информацию о созданных грузоместах

#### deleteCargoes()
**Назначение**: Удалить грузоместа из заявки

#### getCargoesDeleteStatus()
**Назначение**: Получить статус удаления грузомест

#### getCargoRules()
**Назначение**: Получить правила создания грузомест

### Управление этикетками

#### createCargoLabels()
**Назначение**: Сгенерировать этикетки для грузомест

```typescript
interface FboSupplyRequestCargoesLabelCreateRequest {
  supply_order_id: number;
  cargo_ids: number[];
}
```

#### getCargoLabels()
**Назначение**: Получить статус генерации этикеток

#### getCargoLabelsFile()
**Назначение**: Скачать PDF файл с этикетками

### Справочная информация

#### getClusterList()
**Назначение**: Получить список кластеров и складов

#### getWarehouseFboList()
**Назначение**: Найти точки отгрузки для поставки

### Управление заявками

#### cancelSupplyOrder()
**Назначение**: Отменить заявку на поставку

#### getSupplyOrderCancelStatus()
**Назначение**: Получить статус отмены заявки

#### updateSupplyOrderContent()
**Назначение**: Редактировать товарный состав заявки

#### getSupplyOrderContentUpdateStatus()
**Назначение**: Получить статус редактирования состава

## Практические примеры

### Базовое использование

```typescript
import { OzonSellerAPI } from 'bmad-ozon-seller-api';

const api = new OzonSellerAPI({
  clientId: 'your-client-id',
  apiKey: 'your-api-key'
});

// Создать черновик заявки
const draft = await api.fboSupplyRequest.createDraft({
  supply_type: 'DIRECT',
  warehouse_id: 123,
  items: [
    { sku: '123456789', quantity: 10 },
    { sku: '987654321', quantity: 5 }
  ]
});

// Получить доступные таймслоты
const timeslots = await api.fboSupplyRequest.getTimeslotInfo({
  warehouse_id: 123,
  date_from: '2024-01-15',
  date_to: '2024-01-20'
});

// Создать заявку на поставку
const supplyOrder = await api.fboSupplyRequest.createSupplyOrderFromDraft({
  draft_id: draft.draft?.draft_id!,
  timeslot_id: 'slot_67890'
});

// Установить грузоместа
const cargoes = await api.fboSupplyRequest.createCargoes({
  supply_order_id: 12345,
  cargoes: [{
    cargo_number: 'CARGO001',
    weight: 25.5,
    length: 40, width: 30, height: 20,
    items: [
      { sku: '123456789', quantity: 5 },
      { sku: '987654321', quantity: 3 }
    ]
  }]
});

// Сгенерировать этикетки
const labels = await api.fboSupplyRequest.createCargoLabels({
  supply_order_id: 12345,
  cargo_ids: [1001, 1002]
});
```

### Продвинутые сценарии

#### Менеджер поставок FBO

```typescript
class FboSupplyManager {
  constructor(private api: OzonSellerAPI) {}

  async createCompleteSupply(items: Array<{sku: string; quantity: number}>): Promise<void> {
    console.log('🚀 Начинаем создание поставки FBO');
    
    try {
      // 1. Создаем черновик
      const draft = await this.api.fboSupplyRequest.createDraft({
        supply_type: 'DIRECT',
        warehouse_id: 123,
        items
      });

      if (!draft.draft?.draft_id) {
        throw new Error('Не удалось создать черновик');
      }

      console.log(`✅ Черновик создан: ${draft.draft.draft_id}`);

      // 2. Получаем доступные таймслоты
      const timeslots = await this.api.fboSupplyRequest.getTimeslotInfo({
        warehouse_id: 123,
        date_from: new Date().toISOString().split('T')[0],
        date_to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      });

      const availableSlot = timeslots.timeslots?.find(slot => slot.is_available);
      if (!availableSlot?.id) {
        throw new Error('Нет доступных таймслотов');
      }

      console.log(`📅 Выбран таймслот: ${availableSlot.start_time} - ${availableSlot.end_time}`);

      // 3. Создаем заявку на поставку
      const createTask = await this.api.fboSupplyRequest.createSupplyOrderFromDraft({
        draft_id: draft.draft.draft_id,
        timeslot_id: availableSlot.id
      });

      // 4. Ждем создания заявки
      const supplyOrderId = await this.waitForTaskCompletion(
        createTask.task_id!,
        (taskId) => this.api.fboSupplyRequest.getSupplyOrderCreateStatus({ task_id: taskId })
      );

      console.log(`✅ Заявка создана: ${supplyOrderId}`);

      // 5. Создаем оптимальные грузоместа
      const cargoes = await this.createOptimalCargoes(supplyOrderId, items);
      
      // 6. Генерируем этикетки
      const labelsFile = await this.generateLabels(supplyOrderId, cargoes.map(c => c.cargo_id));
      
      console.log('🎉 Поставка FBO полностью готова!');
      console.log(`📄 Этикетки: ${labelsFile}`);
      
    } catch (error) {
      console.error('❌ Ошибка создания поставки:', error);
      throw error;
    }
  }

  private async createOptimalCargoes(supplyOrderId: number, items: Array<{sku: string; quantity: number}>): Promise<any[]> {
    // Оптимизация упаковки товаров в грузоместа
    const cargoes = this.optimizePackaging(items);
    
    const createTask = await this.api.fboSupplyRequest.createCargoes({
      supply_order_id: supplyOrderId,
      cargoes: cargoes.map((cargo, index) => ({
        cargo_number: `CARGO${String(index + 1).padStart(3, '0')}`,
        weight: cargo.weight,
        length: cargo.dimensions.length,
        width: cargo.dimensions.width,
        height: cargo.dimensions.height,
        items: cargo.items
      }))
    });

    const result = await this.waitForTaskCompletion(
      createTask.task_id!,
      (taskId) => this.api.fboSupplyRequest.getCargoesCreateInfo({ task_id: taskId })
    );

    console.log(`📦 Создано грузомест: ${result.cargoes?.length || 0}`);
    return result.cargoes || [];
  }

  private optimizePackaging(items: Array<{sku: string; quantity: number}>): any[] {
    // Простая логика оптимизации упаковки
    const cargoes = [];
    let currentCargo = {
      items: [] as any[],
      weight: 0,
      dimensions: { length: 40, width: 30, height: 20 }
    };

    const maxWeight = 30; // кг
    const weightPerItem = 2; // средний вес товара

    for (const item of items) {
      const itemWeight = item.quantity * weightPerItem;
      
      if (currentCargo.weight + itemWeight > maxWeight) {
        if (currentCargo.items.length > 0) {
          cargoes.push({ ...currentCargo });
        }
        currentCargo = {
          items: [item],
          weight: itemWeight,
          dimensions: { length: 40, width: 30, height: 20 }
        };
      } else {
        currentCargo.items.push(item);
        currentCargo.weight += itemWeight;
      }
    }

    if (currentCargo.items.length > 0) {
      cargoes.push(currentCargo);
    }

    return cargoes;
  }

  private async generateLabels(supplyOrderId: number, cargoIds: number[]): Promise<string> {
    const labelTask = await this.api.fboSupplyRequest.createCargoLabels({
      supply_order_id: supplyOrderId,
      cargo_ids: cargoIds
    });

    const result = await this.waitForTaskCompletion(
      labelTask.task_id!,
      (taskId) => this.api.fboSupplyRequest.getCargoLabels({ task_id: taskId })
    );

    if (result.file_guid) {
      console.log('🏷️ Этикетки сгенерированы');
      return result.file_guid;
    }

    throw new Error('Не удалось сгенерировать этикетки');
  }

  private async waitForTaskCompletion(taskId: string, statusChecker: (id: string) => Promise<any>): Promise<any> {
    const maxAttempts = 30;
    const delay = 2000; // 2 секунды

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const status = await statusChecker(taskId);
      
      if (status.status === 'completed') {
        return status;
      } else if (status.status === 'error') {
        throw new Error(status.error_message || 'Ошибка выполнения задачи');
      }
      
      console.log(`⏳ Ожидание завершения задачи... (${attempt + 1}/${maxAttempts})`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    
    throw new Error('Превышено время ожидания выполнения задачи');
  }
}
```

#### Система мониторинга поставок

```typescript
class FboSupplyMonitor {
  constructor(private api: OzonSellerAPI) {}

  async monitorActiveSupplies(): Promise<void> {
    // Получаем информацию о доступных складах
    const warehouses = await this.api.fboSupplyRequest.getWarehouseFboList({
      warehouse_type: 'DIRECT'
    });

    console.log('🏭 Мониторинг активных поставок FBO');
    console.log('='.repeat(50));

    // Анализируем доступность складов
    const availableWarehouses = warehouses.warehouses?.filter(w => w.is_available) || [];
    console.log(`✅ Доступных складов: ${availableWarehouses.length}`);

    for (const warehouse of availableWarehouses) {
      await this.analyzeWarehouseCapacity(warehouse);
    }

    // Проверяем правила создания грузомест
    await this.checkCargoRules();
  }

  private async analyzeWarehouseCapacity(warehouse: any): Promise<void> {
    console.log(`\n🏭 Анализ склада: ${warehouse.name}`);
    console.log(`📍 Адрес: ${warehouse.address}`);
    console.log(`📊 Тип: ${warehouse.type}`);

    try {
      // Получаем доступные таймслоты на ближайшую неделю
      const timeslots = await this.api.fboSupplyRequest.getTimeslotInfo({
        warehouse_id: warehouse.warehouse_id,
        date_from: new Date().toISOString().split('T')[0],
        date_to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      });

      const availableSlots = timeslots.timeslots?.filter(slot => slot.is_available) || [];
      console.log(`📅 Доступных слотов на неделю: ${availableSlots.length}`);

      if (availableSlots.length > 0) {
        const totalCapacity = availableSlots.reduce((sum, slot) => sum + (slot.max_pallets || 0), 0);
        console.log(`📦 Общая вместимость: ${totalCapacity} палет`);
        
        // Найдем ближайший доступный слот
        const nearestSlot = availableSlots[0];
        console.log(`⏰ Ближайший слот: ${nearestSlot.start_time} - ${nearestSlot.end_time}`);
        console.log(`📦 Макс. палет: ${nearestSlot.max_pallets}`);
      } else {
        console.log('⚠️ Нет доступных слотов на ближайшую неделю');
      }
    } catch (error) {
      console.log(`❌ Ошибка анализа склада: ${error.message}`);
    }
  }

  private async checkCargoRules(): Promise<void> {
    console.log('\n📋 Проверка правил создания грузомест');
    
    try {
      const rules = await this.api.fboSupplyRequest.getCargoRules({});
      
      console.log('📜 Действующие правила:');
      rules.rules?.forEach((rule, index) => {
        const required = rule.required ? '[ОБЯЗАТЕЛЬНО]' : '[РЕКОМЕНДУЕТСЯ]';
        console.log(`${index + 1}. ${required} ${rule.type}: ${rule.description}`);
        
        if (rule.min_value !== undefined || rule.max_value !== undefined) {
          console.log(`   Ограничения: ${rule.min_value || 'мин'} - ${rule.max_value || 'макс'}`);
        }
      });
    } catch (error) {
      console.log(`❌ Ошибка получения правил: ${error.message}`);
    }
  }

  async generateSupplyReport(dateFrom: string, dateTo: string): Promise<void> {
    console.log(`\n📊 Отчет по поставкам FBO (${dateFrom} - ${dateTo})`);
    console.log('='.repeat(60));

    // Получаем список кластеров для анализа
    const clusters = await this.api.fboSupplyRequest.getClusterList({});
    
    console.log('\n🌐 Анализ по кластерам:');
    clusters.clusters?.forEach(cluster => {
      console.log(`\n🏭 Кластер: ${cluster.name} (ID: ${cluster.cluster_id})`);
      console.log(`📍 Регион: ${cluster.region || 'Не указан'}`);
      
      cluster.warehouses?.forEach(warehouse => {
        const status = warehouse.is_available ? '✅ Доступен' : '❌ Недоступен';
        console.log(`  📦 ${warehouse.name} (${warehouse.type}): ${status}`);
        
        if (warehouse.working_hours) {
          console.log(`     ⏰ Время работы: ${warehouse.working_hours}`);
        }
      });
    });

    // Рекомендации по оптимизации
    console.log('\n💡 Рекомендации по оптимизации:');
    console.log('1. Планируйте поставки заранее - слоты быстро заполняются');
    console.log('2. Используйте оптимальную упаковку для экономии места');
    console.log('3. Следите за правилами создания грузомест');
    console.log('4. Рассматривайте кросс-докинг для больших объемов');
  }
}
```

#### Автоматизированный редактор заявок

```typescript
class SupplyOrderEditor {
  constructor(private api: OzonSellerAPI) {}

  async updateSupplyContent(
    supplyOrderId: number, 
    changes: Array<{sku: string; newQuantity: number}>
  ): Promise<void> {
    console.log(`✏️ Редактирование заявки ${supplyOrderId}`);
    
    try {
      // Подготавливаем операции обновления
      const operations = changes.map(change => {
        if (change.newQuantity === 0) {
          return { sku: change.sku, quantity: 0, operation: 'delete' as const };
        } else {
          return { sku: change.sku, quantity: change.newQuantity, operation: 'update' as const };
        }
      });

      // Выполняем обновление
      const updateTask = await this.api.fboSupplyRequest.updateSupplyOrderContent({
        supply_order_id: supplyOrderId,
        items: operations
      });

      console.log(`🔄 Запущена задача редактирования: ${updateTask.task_id}`);

      // Ждем результата
      const result = await this.waitForUpdateCompletion(updateTask.task_id!);
      
      // Анализируем результаты
      let successCount = 0;
      let errorCount = 0;

      result.results?.forEach((itemResult: any) => {
        if (itemResult.success) {
          successCount++;
          console.log(`✅ ${itemResult.sku} (${itemResult.operation}): успешно`);
        } else {
          errorCount++;
          console.log(`❌ ${itemResult.sku} (${itemResult.operation}): ${itemResult.error_message}`);
        }
      });

      console.log(`\n📊 Результат редактирования:`);
      console.log(`✅ Успешно: ${successCount}`);
      console.log(`❌ Ошибок: ${errorCount}`);

      // Если есть ошибки, пересоздаем грузоместа
      if (successCount > 0 && errorCount === 0) {
        console.log('🔄 Пересоздаем грузоместа после изменений...');
        await this.recreateCargoes(supplyOrderId);
      }

    } catch (error) {
      console.error('❌ Ошибка редактирования заявки:', error);
      throw error;
    }
  }

  private async recreateCargoes(supplyOrderId: number): Promise<void> {
    // Здесь была бы логика удаления старых и создания новых грузомест
    // с учетом обновленного товарного состава
    console.log('📦 Грузоместа обновлены с учетом изменений');
  }

  private async waitForUpdateCompletion(taskId: string): Promise<any> {
    const maxAttempts = 20;
    const delay = 1000;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const status = await this.api.fboSupplyRequest.getSupplyOrderContentUpdateStatus({ 
        task_id: taskId 
      });
      
      if (status.status === 'completed') {
        return status;
      } else if (status.status === 'error') {
        throw new Error(status.error_message || 'Ошибка обновления');
      }
      
      console.log(`⏳ Обновление в процессе... (${attempt + 1}/${maxAttempts})`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    
    throw new Error('Превышено время ожидания обновления');
  }

  async cancelSupplyIfNeeded(supplyOrderId: number, reason: string): Promise<boolean> {
    console.log(`❌ Попытка отмены заявки ${supplyOrderId}`);
    console.log(`📝 Причина: ${reason}`);

    try {
      const cancelTask = await this.api.fboSupplyRequest.cancelSupplyOrder({
        supply_order_id: supplyOrderId,
        reason
      });

      const result = await this.waitForCancelCompletion(cancelTask.task_id!);
      
      if (result.success) {
        console.log('✅ Заявка успешно отменена');
        return true;
      } else {
        console.log(`❌ Ошибка отмены: ${result.error_message}`);
        return false;
      }
    } catch (error) {
      console.error('❌ Ошибка процесса отмены:', error);
      return false;
    }
  }

  private async waitForCancelCompletion(taskId: string): Promise<any> {
    const maxAttempts = 15;
    const delay = 2000;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const status = await this.api.fboSupplyRequest.getSupplyOrderCancelStatus({ 
        task_id: taskId 
      });
      
      if (status.status === 'completed') {
        return status;
      } else if (status.status === 'error') {
        throw new Error(status.error_message || 'Ошибка отмены');
      }
      
      console.log(`⏳ Отмена в процессе... (${attempt + 1}/${maxAttempts})`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    
    throw new Error('Превышено время ожидания отмены');
  }
}
```

## Обработка ошибок

```typescript
try {
  await api.fboSupplyRequest.createDraft({
    supply_type: 'DIRECT',
    warehouse_id: 123,
    items: [/* ... */]
  });
} catch (error) {
  if (error.response?.status === 400) {
    console.error('Ошибка валидации данных:', error.response.data);
  } else if (error.response?.status === 404) {
    console.error('Склад не найден или недоступен');
  } else if (error.response?.status === 409) {
    console.error('Конфликт состояния (например, склад заполнен)');
  } else {
    console.error('Неожиданная ошибка:', error.message);
  }
}
```

## Рекомендации по использованию

### 🎯 Планирование поставок
- Создавайте черновики заранее для резервирования товаров
- Проверяйте доступность таймслотов на несколько дней вперед
- Учитывайте время на подготовку грузомест и этикеток

### 📦 Оптимизация грузомест
- Равномерно распределяйте товары по весу и размеру
- Соблюдайте максимальные ограничения по весу (обычно 30 кг)
- Учитывайте хрупкость товаров при упаковке
- Используйте правила создания грузомест из API

### 🏷️ Работа с этикетками
- Генерируйте этикетки заранее для ускорения отгрузки
- Проверяйте качество PDF файлов перед печатью
- Сохраняйте копии этикеток для отчетности

### 🚀 Автоматизация
- Автоматизируйте создание оптимальных грузомест
- Настройте мониторинг доступности таймслотов
- Используйте уведомления об изменении статусов задач

### 🔒 Безопасность и надежность
- Всегда проверяйте статус выполнения асинхронных задач
- Реализуйте retry-логику для критически важных операций
- Логируйте все этапы создания поставки для отладки

FBO Supply Request API обеспечивает полный контроль над процессом поставок FBO, от создания черновика до получения готовых этикеток для отгрузки.