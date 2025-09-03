# 🏭 Supplier API

**Управление таможенными счёт-фактурами для возврата НДС продавцам из Турции**

Supplier API предназначен для работы с таможенными счёт-фактурами в рамках программы возврата НДС для продавцов из Турции. Этот API позволяет загружать, создавать, обновлять и получать информацию о счёт-фактурах.

## 📋 Обзор методов

| Метод | Endpoint | Описание |
|-------|----------|----------|
| `uploadInvoiceFile()` | `POST /v1/invoice/file/upload` | Загрузка файла счёт-фактуры |
| `createOrUpdateInvoice()` | `POST /v2/invoice/create-or-update` | Создание/обновление счёт-фактуры |
| `getInvoice()` | `POST /v2/invoice/get` | Получение информации о счёт-фактуре |
| `deleteInvoice()` | `POST /v1/invoice/delete` | Удаление ссылки на счёт-фактуру |

## 🎯 Целевая аудитория

Этот API предназначен специально для **продавцов из Турции**, которые участвуют в программе возврата НДС через таможенные счёт-фактуры.

## 📄 Поддерживаемые форматы файлов

- **JPEG** — для сканированных документов
- **PDF** — для цифровых документов
- **Максимальный размер**: 10 МБ

## 💱 Поддерживаемые валюты

| Код | Валюта |
|-----|--------|
| `USD` | Доллар США (по умолчанию) |
| `EUR` | Евро |
| `TRY` | Турецкая лира |
| `CNY` | Китайский юань |
| `RUB` | Российский рубль |
| `GBP` | Британский фунт стерлингов |

## 🚀 Быстрый старт

### Полный цикл работы с счёт-фактурой

```typescript
// 1. Загрузка файла счёт-фактуры
const file = await fs.readFile('invoice.pdf');
const base64Content = file.toString('base64');

const uploadResult = await client.supplier.uploadInvoiceFile({
  base64_content: base64Content,
  posting_number: '0001-1234567-0000001'
});

console.log(`📄 Файл загружен: ${uploadResult.url}`);

// 2. Создание записи о счёт-фактуре
const invoice = await client.supplier.createOrUpdateInvoice({
  date: '2024-01-15T10:00:00Z',
  posting_number: '0001-1234567-0000001',
  url: uploadResult.url!,
  number: 'INV-TR-2024-001',
  price: 15000.50,
  price_currency: 'TRY',
  hs_codes: [
    { code: '6203420000' }, // Мужские брюки из хлопка
    { code: '6109100000' }  // Футболки из хлопка
  ]
});

console.log(`✅ Счёт-фактура создана: ${invoice.result ? 'успешно' : 'ошибка'}`);

// 3. Получение информации о счёт-фактуре
const invoiceInfo = await client.supplier.getInvoice({
  posting_number: '0001-1234567-0000001'
});

console.log('📋 Информация о счёт-фактуре:');
console.log(`   Номер: ${invoiceInfo.result?.number}`);
console.log(`   Дата: ${invoiceInfo.result?.date}`);
console.log(`   Сумма: ${invoiceInfo.result?.price} ${invoiceInfo.result?.price_currency}`);
console.log(`   HS-коды: ${invoiceInfo.result?.hs_codes?.length} шт.`);
```

## 📊 Детальные примеры использования

### 1. 📤 Загрузка различных форматов файлов

```typescript
import * as fs from 'fs/promises';
import * as path from 'path';

class InvoiceFileUploader {
  async uploadInvoiceFile(filePath: string, postingNumber: string) {
    // Проверка формата файла
    const ext = path.extname(filePath).toLowerCase();
    if (!['.pdf', '.jpg', '.jpeg'].includes(ext)) {
      throw new Error('Поддерживаются только PDF и JPEG файлы');
    }
    
    // Проверка размера файла (10 МБ = 10 * 1024 * 1024 байт)
    const stats = await fs.stat(filePath);
    const maxSize = 10 * 1024 * 1024;
    if (stats.size > maxSize) {
      throw new Error(`Размер файла превышает 10 МБ (текущий: ${Math.round(stats.size / 1024 / 1024)} МБ)`);
    }
    
    // Загрузка и кодирование файла
    const fileBuffer = await fs.readFile(filePath);
    const base64Content = fileBuffer.toString('base64');
    
    console.log(`📁 Загружаем файл: ${path.basename(filePath)}`);
    console.log(`   Размер: ${Math.round(stats.size / 1024)} КБ`);
    console.log(`   Формат: ${ext.toUpperCase()}`);
    
    // Отправка на сервер
    const result = await client.supplier.uploadInvoiceFile({
      base64_content: base64Content,
      posting_number: postingNumber
    });
    
    console.log(`✅ Файл успешно загружен`);
    console.log(`   URL: ${result.url}`);
    
    return result;
  }
}

// Использование
const uploader = new InvoiceFileUploader();
const result = await uploader.uploadInvoiceFile('./documents/invoice-tr-001.pdf', '0001-1234567-0000001');
```

### 2. 🧾 Создание счёт-фактур с различными валютами

```typescript
interface InvoiceData {
  postingNumber: string;
  invoiceNumber: string;
  date: Date;
  amount: number;
  currency: 'USD' | 'EUR' | 'TRY' | 'CNY' | 'RUB' | 'GBP';
  hsCodes: string[];
  fileUrl: string;
}

class InvoiceManager {
  async createInvoice(data: InvoiceData) {
    console.log(`🧾 Создание счёт-фактуры ${data.invoiceNumber}`);
    console.log(`   Отправление: ${data.postingNumber}`);
    console.log(`   Сумма: ${data.amount} ${data.currency}`);
    console.log(`   HS-коды: ${data.hsCodes.length} шт.`);
    
    const response = await client.supplier.createOrUpdateInvoice({
      date: data.date.toISOString(),
      posting_number: data.postingNumber,
      url: data.fileUrl,
      number: data.invoiceNumber,
      price: data.amount,
      price_currency: data.currency,
      hs_codes: data.hsCodes.map(code => ({ code }))
    });
    
    if (response.result) {
      console.log(`✅ Счёт-фактура успешно создана`);
    } else {
      console.log(`❌ Ошибка при создании счёт-фактуры`);
    }
    
    return response;
  }
  
  // Пример с турецкой лирой
  async createTurkishInvoice(postingNumber: string, fileUrl: string) {
    return this.createInvoice({
      postingNumber,
      invoiceNumber: `TR-${Date.now()}`,
      date: new Date(),
      amount: 2500.75,
      currency: 'TRY',
      hsCodes: [
        '6203420000', // Мужские брюки
        '6109100000', // Футболки
        '6204620000'  // Женские брюки
      ],
      fileUrl
    });
  }
  
  // Пример с долларом США
  async createUSDInvoice(postingNumber: string, fileUrl: string) {
    return this.createInvoice({
      postingNumber,
      invoiceNumber: `USD-${Date.now()}`,
      date: new Date(),
      amount: 850.00,
      currency: 'USD',
      hsCodes: [
        '6403990000', // Обувь
        '4202920000'  // Сумки
      ],
      fileUrl
    });
  }
}
```

### 3. 🔍 Получение и анализ информации о счёт-фактурах

```typescript
class InvoiceAnalyzer {
  async getInvoiceDetails(postingNumber: string) {
    console.log(`🔍 Запрос информации о счёт-фактуре для отправления: ${postingNumber}`);
    
    const response = await client.supplier.getInvoice({
      posting_number: postingNumber
    });
    
    if (!response.result) {
      console.log('❌ Счёт-фактура не найдена');
      return null;
    }
    
    const invoice = response.result;
    
    console.log('📋 Детали счёт-фактуры:');
    console.log(`   📄 Номер: ${invoice.number || 'Не указан'}`);
    console.log(`   📅 Дата: ${invoice.date ? new Date(invoice.date).toLocaleDateString('ru-RU') : 'Не указана'}`);
    console.log(`   💰 Сумма: ${invoice.price || 0} ${invoice.price_currency || 'USD'}`);
    console.log(`   🔗 URL файла: ${invoice.file_url || 'Недоступен'}`);
    
    if (invoice.hs_codes && invoice.hs_codes.length > 0) {
      console.log(`   📦 HS-коды товаров:`);
      invoice.hs_codes.forEach((hsCode, index) => {
        console.log(`      ${index + 1}. ${hsCode.code} (${this.getHSCodeDescription(hsCode.code)})`);
      });
    } else {
      console.log(`   📦 HS-коды: не указаны`);
    }
    
    return invoice;
  }
  
  // Описания HS-кодов (примеры)
  private getHSCodeDescription(code?: string): string {
    const descriptions: Record<string, string> = {
      '6203420000': 'Мужские брюки из хлопка',
      '6109100000': 'Футболки из хлопка', 
      '6204620000': 'Женские брюки из хлопка',
      '6403990000': 'Обувь прочая',
      '4202920000': 'Сумки и чемоданы'
    };
    
    return descriptions[code || ''] || 'Описание недоступно';
  }
  
  async validateInvoiceData(invoice: any) {
    const issues = [];
    
    if (!invoice.number) {
      issues.push('⚠️ Не указан номер счёт-фактуры');
    }
    
    if (!invoice.date) {
      issues.push('⚠️ Не указана дата счёт-фактуры');
    }
    
    if (!invoice.price || invoice.price <= 0) {
      issues.push('⚠️ Некорректная сумма счёт-фактуры');
    }
    
    if (!invoice.file_url) {
      issues.push('⚠️ Отсутствует ссылка на файл');
    }
    
    if (!invoice.hs_codes || invoice.hs_codes.length === 0) {
      issues.push('⚠️ Не указаны HS-коды товаров');
    }
    
    if (issues.length > 0) {
      console.log('❌ Обнаружены проблемы с данными:');
      issues.forEach(issue => console.log(`   ${issue}`));
      return false;
    }
    
    console.log('✅ Данные счёт-фактуры корректны');
    return true;
  }
}
```

### 4. 🗑️ Управление жизненным циклом счёт-фактур

```typescript
class InvoiceLifecycleManager {
  async deleteInvoice(postingNumber: string, reason?: string) {
    console.log(`🗑️ Удаление ссылки на счёт-фактуру для отправления: ${postingNumber}`);
    if (reason) {
      console.log(`   Причина: ${reason}`);
    }
    
    // Сначала получаем информацию для логирования
    const invoiceInfo = await client.supplier.getInvoice({
      posting_number: postingNumber
    });
    
    if (invoiceInfo.result) {
      console.log(`   📄 Удаляемая счёт-фактура: ${invoiceInfo.result.number}`);
      console.log(`   💰 Сумма: ${invoiceInfo.result.price} ${invoiceInfo.result.price_currency}`);
    }
    
    // Выполняем удаление
    const result = await client.supplier.deleteInvoice({
      posting_number: postingNumber
    });
    
    if (result.result) {
      console.log(`✅ Ссылка на счёт-фактуру успешно удалена`);
    } else {
      console.log(`❌ Ошибка при удалении ссылки на счёт-фактуру`);
    }
    
    return result;
  }
  
  async updateInvoice(postingNumber: string, updates: Partial<InvoiceData>) {
    console.log(`📝 Обновление счёт-фактуры для отправления: ${postingNumber}`);
    
    // Получаем текущую информацию
    const currentInvoice = await client.supplier.getInvoice({
      posting_number: postingNumber
    });
    
    if (!currentInvoice.result) {
      throw new Error('Счёт-фактура не найдена');
    }
    
    // Подготавливаем данные для обновления
    const updateData = {
      date: updates.date?.toISOString() || currentInvoice.result.date!,
      posting_number: postingNumber,
      url: updates.fileUrl || currentInvoice.result.file_url!,
      number: updates.invoiceNumber || currentInvoice.result.number,
      price: updates.amount || currentInvoice.result.price,
      price_currency: updates.currency || currentInvoice.result.price_currency,
      hs_codes: updates.hsCodes?.map(code => ({ code })) || currentInvoice.result.hs_codes || []
    };
    
    console.log(`   Обновляемые поля: ${Object.keys(updates).join(', ')}`);
    
    const result = await client.supplier.createOrUpdateInvoice(updateData);
    
    if (result.result) {
      console.log(`✅ Счёт-фактура успешно обновлена`);
    } else {
      console.log(`❌ Ошибка при обновлении счёт-фактуры`);
    }
    
    return result;
  }
}
```

### 5. 📊 Пакетная обработка счёт-фактур

```typescript
class BatchInvoiceProcessor {
  async processMultipleInvoices(invoices: InvoiceData[]) {
    console.log(`🔄 Пакетная обработка ${invoices.length} счёт-фактур`);
    
    const results = [];
    const batchSize = 3; // Обрабатываем по 3 счёт-фактуры одновременно
    
    for (let i = 0; i < invoices.length; i += batchSize) {
      const batch = invoices.slice(i, i + batchSize);
      console.log(`📦 Обработка пакета ${Math.floor(i / batchSize) + 1}/${Math.ceil(invoices.length / batchSize)}`);
      
      // Обрабатываем пакет параллельно
      const batchPromises = batch.map(async (invoiceData, index) => {
        try {
          console.log(`   ⏳ [${i + index + 1}] Обработка ${invoiceData.invoiceNumber}`);
          
          const result = await client.supplier.createOrUpdateInvoice({
            date: invoiceData.date.toISOString(),
            posting_number: invoiceData.postingNumber,
            url: invoiceData.fileUrl,
            number: invoiceData.invoiceNumber,
            price: invoiceData.amount,
            price_currency: invoiceData.currency,
            hs_codes: invoiceData.hsCodes.map(code => ({ code }))
          });
          
          console.log(`   ✅ [${i + index + 1}] ${invoiceData.invoiceNumber} - успешно`);
          return { success: true, invoiceNumber: invoiceData.invoiceNumber, result };
          
        } catch (error) {
          console.log(`   ❌ [${i + index + 1}] ${invoiceData.invoiceNumber} - ошибка: ${error}`);
          return { success: false, invoiceNumber: invoiceData.invoiceNumber, error: String(error) };
        }
      });
      
      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);
      
      // Пауза между пакетами для соблюдения лимитов API
      if (i + batchSize < invoices.length) {
        console.log(`   ⏸️ Пауза 1 секунда перед следующим пакетом...`);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    // Сводка результатов
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;
    
    console.log(`\n📊 Итоги пакетной обработки:`);
    console.log(`   ✅ Успешно: ${successful}`);
    console.log(`   ❌ Ошибок: ${failed}`);
    console.log(`   📈 Процент успеха: ${Math.round(successful / results.length * 100)}%`);
    
    if (failed > 0) {
      console.log(`\n❌ Неудачные операции:`);
      results.filter(r => !r.success).forEach(r => {
        console.log(`   - ${r.invoiceNumber}: ${r.error}`);
      });
    }
    
    return results;
  }
}
```

## 🏗️ TypeScript типы

### Основные интерфейсы

```typescript
// Запрос загрузки файла
interface SupplierInvoiceFileUploadRequest {
  base64_content: string;  // обязательное поле
  posting_number: string;  // обязательное поле
}

// Ответ загрузки файла
interface SupplierInvoiceFileUploadResponse {
  url?: string;  // ссылка на загруженный файл
}

// HS-код товара
interface SupplierHsCode {
  code?: string;
}

// Запрос создания/обновления счёт-фактуры
interface SupplierInvoiceCreateOrUpdateRequest {
  date: string;           // обязательное поле (ISO 8601)
  posting_number: string; // обязательное поле
  url: string;           // обязательное поле (ссылка из upload)
  number?: string;       // номер счёт-фактуры (макс. 50 символов)
  price?: number;        // сумма (до 2 знаков после точки)
  price_currency?: 'USD' | 'EUR' | 'TRY' | 'CNY' | 'RUB' | 'GBP';
  hs_codes?: SupplierHsCode[];
}

// Ответ создания/обновления
interface SupplierInvoiceCreateOrUpdateResponse {
  result?: boolean;  // результат операции
}

// Запрос получения информации
interface SupplierInvoiceGetRequest {
  posting_number: string;  // обязательное поле
}

// Информация о счёт-фактуре
interface SupplierInvoiceInfo {
  date?: string;           // дата загрузки
  file_url?: string;       // ссылка на файл
  hs_codes?: SupplierResponseHsCode[];
  number?: string;         // номер счёт-фактуры
  price?: number;          // сумма
  price_currency?: 'USD' | 'EUR' | 'TRY' | 'CNY' | 'RUB' | 'GBP';
}

// Ответ получения информации
interface SupplierInvoiceGetResponse {
  result?: SupplierInvoiceInfo;
}

// Запрос удаления
interface SupplierInvoiceDeleteRequest {
  posting_number: string;  // обязательное поле
}

// Ответ удаления
interface SupplierInvoiceDeleteResponse {
  result?: boolean;  // результат операции
}
```

## ⚠️ Важные особенности

### Ограничения файлов
- **Форматы**: только JPEG и PDF
- **Размер**: максимум 10 МБ
- **Кодирование**: Base64 для передачи

### Нумерация счёт-фактур
- Максимальная длина: 50 символов
- Может содержать буквы и цифры
- Рекомендуется использовать уникальные номера

### Валюты и цены
- По умолчанию используется USD
- Разделитель дробной части: точка
- Максимум 2 знака после точки
- Пример: `199.99`

### HS-коды товаров
- Используются для таможенного оформления
- 10-значные коды международной номенклатуры
- Обязательны для корректного возврата НДС

## 🔧 Лучшие практики

### 1. Обработка ошибок

```typescript
async function safeInvoiceOperation<T>(
  operation: () => Promise<T>,
  operationName: string
): Promise<T | null> {
  try {
    console.log(`⏳ Выполнение: ${operationName}`);
    const result = await operation();
    console.log(`✅ Завершено: ${operationName}`);
    return result;
  } catch (error) {
    console.error(`❌ Ошибка в ${operationName}:`, error);
    
    // Логирование для различных типов ошибок
    if (error instanceof Error) {
      if (error.message.includes('413')) {
        console.error('   Файл слишком большой (больше 10 МБ)');
      } else if (error.message.includes('422')) {
        console.error('   Некорректные данные в запросе');
      } else if (error.message.includes('429')) {
        console.error('   Превышен лимит запросов, повторите позже');
      }
    }
    
    return null;
  }
}
```

### 2. Валидация данных

```typescript
function validateInvoiceData(data: InvoiceData): string[] {
  const errors: string[] = [];
  
  // Проверка номера отправления
  if (!data.postingNumber.match(/^\d{4}-\d{7}-\d{7}$/)) {
    errors.push('Некорректный формат номера отправления');
  }
  
  // Проверка суммы
  if (data.amount <= 0) {
    errors.push('Сумма должна быть больше 0');
  }
  
  if (data.amount > 999999.99) {
    errors.push('Сумма не может превышать 999,999.99');
  }
  
  // Проверка HS-кодов
  data.hsCodes.forEach((code, index) => {
    if (!code.match(/^\d{10}$/)) {
      errors.push(`HS-код ${index + 1} должен содержать ровно 10 цифр`);
    }
  });
  
  // Проверка номера счёт-фактуры
  if (data.invoiceNumber.length > 50) {
    errors.push('Номер счёт-фактуры не может превышать 50 символов');
  }
  
  return errors;
}
```

### 3. Мониторинг и логирование

```typescript
class InvoiceAuditLogger {
  private logs: Array<{
    timestamp: Date;
    operation: string;
    postingNumber: string;
    status: 'success' | 'error';
    details?: any;
  }> = [];
  
  log(operation: string, postingNumber: string, status: 'success' | 'error', details?: any) {
    const logEntry = {
      timestamp: new Date(),
      operation,
      postingNumber,
      status,
      details
    };
    
    this.logs.push(logEntry);
    
    // Консольное логирование
    const timestamp = logEntry.timestamp.toISOString();
    const statusIcon = status === 'success' ? '✅' : '❌';
    console.log(`${statusIcon} [${timestamp}] ${operation} - ${postingNumber}`);
    
    if (details) {
      console.log(`   Детали:`, details);
    }
  }
  
  generateReport() {
    const successful = this.logs.filter(l => l.status === 'success').length;
    const failed = this.logs.filter(l => l.status === 'error').length;
    
    return {
      total: this.logs.length,
      successful,
      failed,
      successRate: this.logs.length > 0 ? successful / this.logs.length : 0,
      recentLogs: this.logs.slice(-10) // последние 10 записей
    };
  }
}
```

## 🤝 Связанные API

Supplier API часто используется совместно с другими API для комплексной работы с международными отправлениями:

- **[Product API](./products.md)** — Управление товарами для экспорта
- **[FBS API](./fbs.md)** — Международные FBS отправления  
- **[Finance API](./finance.md)** — Финансовые операции и возвраты НДС
- **[Returns API](./returns.md)** — Возвраты международных отправлений

## ❓ FAQ

**Q: Кто может использовать Supplier API?**  
A: API предназначен специально для продавцов из Турции, участвующих в программе возврата НДС.

**Q: Какие файлы можно загружать?**  
A: Только PDF и JPEG файлы размером до 10 МБ.

**Q: Можно ли обновить уже созданную счёт-фактуру?**  
A: Да, используйте тот же метод `createOrUpdateInvoice` с теми же данными отправления.

**Q: Что такое HS-коды и зачем они нужны?**  
A: HS-коды — это международные коды товаров для таможенного оформления, необходимые для корректного возврата НДС.

**Q: В каких валютах можно создавать счёт-фактуры?**  
A: Поддерживаются USD, EUR, TRY, CNY, RUB, GBP. По умолчанию — USD.

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