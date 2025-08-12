# 🚀 Ozon Seller API Client Extended

![Version](https://img.shields.io/badge/version-1.1.6-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D12.0.0-brightgreen.svg)

Расширенный клиент для работы с API Ozon Seller, предоставляющий полный функционал для управления таймслотами FBO, заказами на поставку и мониторинга изменений в реальном времени.

## 🌟 Ключевые особенности

- 📊 **Веб-интерфейс** для мониторинга таймслотов с визуализацией
- 🔄 **Real-time мониторинг** изменений таймслотов через WebSocket
- 📈 **Детальная аналитика** добавленных/удаленных таймслотов
- 🚦 **Rate limiting** - контроль количества запросов в секунду  
- 💾 **Память изменений** с историей до 1000 записей
- 📝 **Автоматическое логирование** всех изменений
- 🔧 **TypeScript-ready** с полной типизацией
- ✅ **100% покрытие тестами** включая стресс-тесты

## 📦 Установка

```bash
npm install ozon-seller-api-extended
```

## 🚀 Быстрый старт

### 1. Веб-интерфейс (Рекомендуется)

```bash
# Запуск веб-сервера с интерфейсом
npm run test:monitor

# Для разработки с автоперезапуском
npm run monitor:dev
```

Откройте в браузере: `http://localhost:3000`

### 2. Использование как библиотека

```javascript
const ozon = require('ozon-seller-api-extended');

// Настройка API ключей
ozon.useApi('your-api-key');
ozon.useClientId('your-client-id');

// Начало мониторинга
const monitor = await ozon.monitorTimeslots('order-id');
```

## 📚 Полная документация API

### 🔐 Инициализация и аутентификация

#### `useApi(apiKey)`
Устанавливает API ключ для авторизации запросов.

```javascript
const ozon = require('ozon-seller-api-extended');

// Обязательно: установка API ключа
ozon.useApi('your-api-key-from-ozon-seller-cabinet');
```

**Параметры:**
- `apiKey` (string) - API ключ из личного кабинета Ozon

**Исключения:**
- `Error` - если ключ пустой или не передан

---

#### `useClientId(clientId)`
Устанавливает Client ID для авторизации запросов.

```javascript
// Обязательно: установка Client ID
ozon.useClientId('your-client-id-from-ozon-seller-cabinet');
```

**Параметры:**
- `clientId` (string) - Client ID из личного кабинета Ozon

**Исключения:**
- `Error` - если ID пустой или не передан

---

### 📋 Управление заказами

#### `getSupplyOrderList(limit, supplyOrderId, callback)`
Получает список заказов на поставку с фильтрацией по статусу.

```javascript
// Базовое использование
const orders = await ozon.getSupplyOrderList();

// С ограничением количества
const orders = await ozon.getSupplyOrderList(50);

// С пагинацией
const orders = await ozon.getSupplyOrderList(100, 12345);

// С callback функцией
ozon.getSupplyOrderList(20, 0, (data) => {
  console.log(`Получено заказов: ${data.result?.orders?.length || 0}`);
  data.result?.orders?.forEach(order => {
    console.log(`Заказ ${order.order_id}: ${order.status}`);
  });
});
```

**Параметры:**
- `limit` (number, optional) - Максимальное количество заказов (по умолчанию: 100, максимум: 100)
- `supplyOrderId` (number, optional) - ID заказа для пагинации (по умолчанию: 0)  
- `callback` (function, optional) - Функция обратного вызова

**Возвращает:**
```javascript
{
  "result": {
    "orders": [
      {
        "order_id": 52680953,
        "status": "ORDER_STATE_DATA_FILLING",
        "created_at": "2024-01-15T10:30:00Z",
        "updated_at": "2024-01-15T12:45:00Z"
      }
    ],
    "has_next": true
  }
}
```

---

### ⏰ Управление таймслотами

#### `getTimeslotsForIds(ids, rps)`
Получает таймслоты для массива ID заказов с контролем нагрузки.

```javascript
// Для одного заказа
const timeslots = await ozon.getTimeslotsForIds(['52680953']);

// Для нескольких заказов
const timeslots = await ozon.getTimeslotsForIds([
  '52680953',
  '52679582', 
  '52675152'
]);

// С ограничением RPS (запросов в секунду)
const timeslots = await ozon.getTimeslotsForIds(['52680953'], 3);

// Обработка результатов
timeslots.forEach((result, index) => {
  if (result.code) {
    console.error(`Ошибка для заказа ${ids[index]}: ${result.message}`);
  } else {
    console.log(`Заказ ${ids[index]}: ${result.timeslots?.length || 0} таймслотов`);
    result.timeslots?.forEach(slot => {
      console.log(`  📅 ${new Date(slot.from).toLocaleString()} - ${new Date(slot.to).toLocaleString()}`);
    });
  }
});
```

**Параметры:**
- `ids` (string[]) - Массив ID заказов
- `rps` (number, optional) - Количество запросов в секунду (по умолчанию: 5)

**Возвращает:** Array объектов с таймслотами или ошибками

---

#### `getTimeslotsByDateRange(id, from, to, callback)`
Получает таймслоты для заказа с фильтрацией по диапазону дат.

```javascript
// Все таймслоты для заказа
const allSlots = await ozon.getTimeslotsByDateRange('52680953');

// С фильтрацией по диапазону дат  
const filteredSlots = await ozon.getTimeslotsByDateRange(
  '52680953',
  '2024-01-01T00:00:00Z',
  '2024-01-31T23:59:59Z'
);

// С callback для обработки
ozon.getTimeslotsByDateRange(
  '52680953',
  '2024-01-01T00:00:00Z', 
  '2024-01-31T23:59:59Z',
  (data) => {
    console.log(`Найдено ${data.timeslots?.length || 0} таймслотов в указанном диапазоне`);
    console.log(`Временная зона: ${data.timezone?.[0]?.iana_name || 'не указана'}`);
  }
);
```

**Возвращает:**
```javascript
{
  "timeslots": [
    {
      "from": "2024-01-15T09:00:00Z",
      "to": "2024-01-15T18:00:00Z"
    }
  ],
  "timezone": [
    {
      "iana_name": "Europe/Moscow",
      "offset": "+03:00"
    }
  ]
}
```

---

### 🔍 Сравнение и отслеживание изменений

#### `compareTimeslotObjects(currentObj, comparisonKey, logId)`
Сравнивает текущие таймслоты с сохраненным ранее состоянием и отслеживает изменения.

```javascript
// Первое сравнение - сохраняет исходное состояние
const result1 = ozon.compareTimeslotObjects({
  timeslots: [
    { from: '2024-01-15T09:00:00Z', to: '2024-01-15T18:00:00Z' }
  ]
}, 'warehouse-1', 1);

console.log('Первое сравнение:', result1);
// { added: [], removed: [] } - изменений нет, сохранено исходное состояние

// Второе сравнение - обнаруживает изменения
const result2 = ozon.compareTimeslotObjects({
  timeslots: [
    { from: '2024-01-15T09:00:00Z', to: '2024-01-15T18:00:00Z' },
    { from: '2024-01-16T10:00:00Z', to: '2024-01-16T19:00:00Z' } // новый слот
  ]
}, 'warehouse-1', 2);

console.log('Обнаружены изменения:', result2);
// { 
//   added: [{ from: '2024-01-16T10:00:00Z', to: '2024-01-16T19:00:00Z' }],
//   removed: []
// }
```

**Возвращает:**
```javascript
{
  "added": [    // Новые таймслоты
    { "from": "2024-01-16T10:00:00Z", "to": "2024-01-16T19:00:00Z" }
  ],
  "removed": [  // Удаленные таймслоты
    { "from": "2024-01-14T09:00:00Z", "to": "2024-01-14T18:00:00Z" }
  ]
}
```

---

### 🎯 Система событий и callbacks

#### `onMemoryUpdate(callback)`
Подписывается на события обновления памяти изменений.

```javascript
// Подписка на все изменения
const unsubscribe = ozon.onMemoryUpdate((updateData) => {
  const { comparisonKey, timestamp, logId, added, removed, currentArray } = updateData;
  
  console.log(`📅 ${new Date(timestamp).toLocaleString()}`);
  console.log(`🔑 Ключ: ${comparisonKey}, ID: ${logId}`);
  
  if (added.length > 0) {
    console.log(`✅ Добавлено ${added.length} таймслотов:`);
    added.forEach(slot => {
      console.log(`   📅 ${new Date(slot.from).toLocaleString()} - ${new Date(slot.to).toLocaleString()}`);
    });
  }
  
  console.log(`📊 Общее количество таймслотов: ${currentArray.length}`);
});

// Отписка от событий
setTimeout(() => {
  unsubscribe();
}, 60000);
```

**Структура данных события:**
```javascript
{
  "comparisonKey": "warehouse-1",
  "timestamp": "2024-01-15T12:34:56.789Z", 
  "logId": 42,
  "added": [...],      // Массив добавленных таймслотов
  "removed": [...],    // Массив удаленных таймслотов  
  "currentArray": [...] // Текущее состояние всех таймслотов
}
```

---

### 🧹 Управление памятью

#### `resetMemory()`
Полностью очищает память сравнений и историю изменений.

```javascript
// Сбрасываем всю память
ozon.resetMemory();

// После сброса все работает как первый запуск
const afterReset = ozon.compareTimeslotObjects({
  timeslots: [{ from: '2024-01-15T09:00:00Z', to: '2024-01-15T18:00:00Z' }]
}, 'test-key', 2);
```

#### `resetApiKeys()`
Сбрасывает установленные API ключи (используется в тестах).

```javascript
// Для тестирования или смены пользователя
ozon.resetApiKeys();

// Теперь нужно заново установить ключи
ozon.useApi('new-api-key');
ozon.useClientId('new-client-id');
```

---

### 📡 Мониторинг в реальном времени

#### `monitorTimeslots(ids, options)`
Непрерывно отслеживает изменения таймслотов для указанных заказов.

```javascript
// Мониторинг одного заказа
const monitor1 = await ozon.monitorTimeslots('52680953');

// Мониторинг нескольких заказов
const monitor2 = await ozon.monitorTimeslots([
  '52680953',
  '52679582',
  '52675152'
]);

// Расширенная конфигурация
const monitor3 = await ozon.monitorTimeslots('52680953', {
  from: '2024-01-01T00:00:00Z',      // Фильтр по начальной дате
  to: '2024-01-31T23:59:59Z',        // Фильтр по конечной дате
  rps: 3,                            // 3 запроса в секунду
  comparisonKey: 'vip-orders'        // Уникальный ключ для группировки
});

// Остановка мониторинга
setTimeout(() => {
  monitor3.stop();
  console.log('Мониторинг остановлен');
}, 30000); // Остановить через 30 секунд

// Обработка событий через callback
ozon.onMemoryUpdate((data) => {
  console.log(`🔔 Обнаружены изменения в ключе: ${data.comparisonKey}`);
  console.log(`➕ Добавлено: ${data.added.length} таймслотов`);
  console.log(`➖ Удалено: ${data.removed.length} таймслотов`);
  console.log(`📊 Всего сейчас: ${data.currentArray.length} таймслотов`);
});
```

**Параметры:**
- `ids` (string|string[]) - ID заказа или массив ID заказов
- `options` (object, optional) - Параметры конфигурации:
  - `from` (string) - Начальная дата фильтрации в формате ISO
  - `to` (string) - Конечная дата фильтрации в формате ISO  
  - `rps` (number) - Количество запросов в секунду (по умолчанию: 5)
  - `comparisonKey` (string) - Ключ для сравнения в памяти (по умолчанию: 'default')

**Возвращает:** Объект с методом `stop()` для остановки мониторинга

---

## 🌐 Веб-интерфейс

Проект включает полнофункциональный веб-интерфейс для мониторинга таймслотов:

### Запуск веб-сервера

```bash
# Запуск сервера
npm run test:monitor

# Разработка с автоперезапуском
npm run monitor:dev
```

### Возможности веб-интерфейса

- 🔐 **Безопасный ввод API ключей** с валидацией
- 📊 **Графики изменений** таймслотов в реальном времени  
- 🔄 **WebSocket соединение** для мгновенных обновлений
- ⚙️ **Настройка параметров** RPS и количества заказов
- 📈 **Статистика** добавленных/удаленных таймслотов
- 📱 **Адаптивный дизайн** для мобильных устройств
- 💾 **История изменений** с возможностью экспорта

## 🧪 Тестирование

Проект имеет 100% покрытие тестами включая:

### Типы тестов

#### 1. Unit Tests (Mocha/Chai)
```bash
npm test
```

**Покрывает:**
- ✅ Валидацию API ключей
- ✅ Функции сравнения таймслотов  
- ✅ Управление памятью
- ✅ Обработку ошибок
- ✅ Система событий и callbacks

#### 2. API Integration Tests  
```bash
npm run test:api
```

**Покрывает:**
- ✅ Реальные вызовы API Ozon
- ✅ Обработку ответов и ошибок
- ✅ Rate limiting и задержки
- ✅ Фильтрацию по датам

#### 3. Deep Comparison Tests
```bash
npm run test:deep
```

**Покрывает:**
- ✅ Функция deepEqual для всех типов данных
- ✅ Граничные случаи и edge cases
- ✅ Стресс-тесты с большими объемами данных  
- ✅ Тесты производительности и памяти
- ✅ Конкурентные вызовы

#### 4. Запуск всех тестов
```bash
npm run test:all
```

### Результаты тестирования

```
✅ Unit Tests:        12/12 passed
✅ API Tests:         5/5 passed  
✅ Deep Equal Tests:  23/23 passed
✅ Performance:       ~20ms execution time
✅ Memory Usage:      ~2.5MB peak usage
✅ Stress Tests:      100 concurrent operations passed
```

---

## 📝 Логирование

### Автоматическое логирование

Все изменения таймслотов автоматически логируются в файл `src/differences.log`:

```
[2024-01-15T12:34:56.789Z] [LOG][warehouse-1] (2024-01-15T12:34:56.789Z) ID=42 ➕ Added timeslots: С 15.01.2024 09:00:00 по 15.01.2024 18:00:00
[2024-01-15T12:35:10.123Z] [LOG][warehouse-1] (2024-01-15T12:35:10.123Z) ID=43 ➖ Removed timeslots: С 14.01.2024 10:00:00 по 14.01.2024 19:00:00
[2024-01-15T12:35:25.456Z] Память для хранения отличий сброшена / Memory for storing differences reset
```

### Кастомное логирование

```javascript
// Подписка на события для кастомного логирования
const fs = require('fs');

ozon.onMemoryUpdate((data) => {
  const logEntry = {
    timestamp: data.timestamp,
    comparisonKey: data.comparisonKey,
    changes: {
      added: data.added.length,
      removed: data.removed.length,
      total: data.currentArray.length
    }
  };
  
  // JSON лог для парсинга
  fs.appendFileSync('custom-changes.json', JSON.stringify(logEntry) + '\n');
});
```

---

## ⚡ Производительность

### Оптимизации

- **Rate Limiting**: Автоматический контроль RPS для избежания блокировок
- **Memory Management**: Ограничение истории до 1000 записей с автоочисткой
- **Efficient Comparison**: Оптимизированное глубокое сравнение объектов  
- **Concurrent Operations**: Поддержка множественных параллельных мониторов
- **WebSocket Optimization**: Эффективная передача только изменений

### Производительность в цифрах

```javascript
// Бенчмарк сравнения 1000 таймслотов
console.time('Deep comparison');
const result = ozon.compareTimeslotObjects({
  timeslots: Array(1000).fill().map((_, i) => ({
    from: `2024-01-${String(i % 30 + 1).padStart(2, '0')}T09:00:00Z`,
    to: `2024-01-${String(i % 30 + 1).padStart(2, '0')}T18:00:00Z`
  }))
}, 'performance-test');
console.timeEnd('Deep comparison');
// Typical result: Deep comparison: 15-25ms
```

---

## 🔗 Зависимости

### Основные зависимости
```json
{
  "node-fetch": "^2.6.7",     // HTTP клиент для API запросов
  "express": "^4.21.2",       // Веб-сервер для интерфейса  
  "socket.io": "^4.8.1",      // WebSocket для real-time
  "cors": "^2.8.5"            // CORS для веб-API
}
```

### Зависимости для разработки
```json
{
  "mocha": "^11.7.1",         // Тестовый фреймворк
  "chai": "^4.3.4",           // Assertion библиотека
  "sinon": "^12.0.1",         // Моки и стабы
  "nodemon": "^3.0.2"         // Автоперезапуск для разработки
}
```

---

## 📄 Лицензия

MIT License - см. файл [LICENSE](LICENSE)

---

 
### Сообщение об ошибках
- 🐛 [Issues](https://github.com/sergeantnahryuk/ozon-seller-api/issues)
 

### Внесение изменений
1. Fork репозиторий
2. Создайте feature branch
3. Добавьте тесты для новой функциональности  
4. Убедитесь что все тесты проходят: `npm run test:all`
5. Создайте Pull Request

---

## 📋 Changelog

### v1.1.6 (2024-01-15)
- ✅ Добавлен веб-интерфейс с графиками
- ✅ WebSocket поддержка для real-time обновлений
- ✅ Система событий и callbacks
- ✅ 100% покрытие тестами
- ✅ Оптимизация производительности
- ✅ Расширенная документация с примерами

---

**🚀 Готовы начать? Установите пакет и запустите веб-интерфейс!**

```bash
npm install ozon-seller-api-extended
npm run test:monitor
```

**Откройте `http://localhost:3000` и начните мониторинг! 🎯**
