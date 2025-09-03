# Supplier Invoice Management

Система управления счёт-фактурами с полным контролем жизненного цикла документов от загрузки до получения детальной информации.

**📋 ЯДРО ФУНКЦИОНАЛЬНОСТИ** — 4 основных метода для работы с таможенными счёт-фактурами турецких продавцов.

## 📊 Методы управления счёт-фактурами

**Всего методов: 4** — полный цикл CRUD операций

### 📤 Загрузка файлов
1. **uploadInvoiceFile()** — Загрузка файла счёт-фактуры

### 📋 Управление данными  
2. **createOrUpdateInvoice()** — Создание или обновление счёт-фактуры
3. **getInvoice()** — Получение информации о счёт-фактуре

### 🗑️ Управление жизненным циклом
4. **deleteInvoice()** — Удаление ссылки на счёт-фактуру

---

## 📤 Метод uploadInvoiceFile()

### Описание и назначение
Загрузка файла счёт-фактуры на сервер OZON для последующего создания записи документа. Этот метод является первым шагом в процессе регистрации счёт-фактуры.

**Зачем нужен:**
- Централизованное хранение файлов счёт-фактур
- Валидация формата и размера документов
- Получение постоянной ссылки для использования в других методах
- Обеспечение доступности документа для таможенных органов

### TypeScript интерфейсы

```typescript
/**
 * Запрос на загрузку файла счёт-фактуры
 * Invoice file upload request
 */
interface SupplierInvoiceFileUploadRequest {
  /** 
   * Файл счёт-фактуры в кодировке Base64
   * Invoice file in Base64 encoding
   * 
   * Поддерживаемые форматы: JPEG, PDF
   * Максимальный размер: 10 МБ
   */
  base64_content: string;
  
  /** 
   * Номер отправления OZON
   * OZON posting number
   * 
   * Формат: 0001-1234567-0000001
   */
  posting_number: string;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ на загрузку файла счёт-фактуры
 * Invoice file upload response
 */
interface SupplierInvoiceFileUploadResponse {
  /** 
   * Постоянная ссылка на загруженный файл
   * Permanent URL to uploaded file
   * 
   * Используется в методе createOrUpdateInvoice()
   */
  url?: string;
  
  readonly [key: string]: unknown;
}
```

### Практические примеры

```typescript
/**
 * Класс для загрузки файлов счёт-фактур с валидацией
 * Invoice file uploader with validation
 */
export class InvoiceFileUploader {
  constructor(private readonly supplierApi: SupplierApi) {}

  /**
   * Загрузка PDF файла счёт-фактуры
   * Upload PDF invoice file
   */
  async uploadPdfInvoice(
    filePath: string, 
    postingNumber: string
  ): Promise<string> {
    console.log(`📄 Загрузка PDF счёт-фактуры: ${path.basename(filePath)}`);
    
    // Валидация файла
    await this.validateFile(filePath, 'pdf');
    
    // Чтение и кодирование файла
    const fileBuffer = await fs.readFile(filePath);
    const base64Content = fileBuffer.toString('base64');
    
    console.log(`   Размер файла: ${Math.round(fileBuffer.length / 1024)} КБ`);
    console.log(`   Base64 длина: ${base64Content.length} символов`);
    
    // Отправка на сервер
    const result = await this.supplierApi.uploadInvoiceFile({
      base64_content: base64Content,
      posting_number: postingNumber
    });
    
    if (!result.url) {
      throw new Error('Сервер не вернул URL загруженного файла');
    }
    
    console.log(`✅ PDF успешно загружен`);
    console.log(`   URL: ${result.url}`);
    
    return result.url;
  }

  /**
   * Загрузка JPEG скана счёт-фактуры
   * Upload JPEG scan of invoice
   */
  async uploadJpegScan(
    imagePath: string, 
    postingNumber: string
  ): Promise<string> {
    console.log(`🖼️ Загрузка JPEG скана: ${path.basename(imagePath)}`);
    
    // Валидация изображения
    await this.validateFile(imagePath, 'jpeg');
    
    const imageBuffer = await fs.readFile(imagePath);
    const base64Content = imageBuffer.toString('base64');
    
    console.log(`   Размер изображения: ${Math.round(imageBuffer.length / 1024)} КБ`);
    console.log(`   Рекомендация: используйте PDF для лучшего качества`);
    
    const result = await this.supplierApi.uploadInvoiceFile({
      base64_content: base64Content,
      posting_number: postingNumber
    });
    
    if (!result.url) {
      throw new Error('Ошибка загрузки изображения');
    }
    
    console.log(`✅ JPEG скан успешно загружен`);
    return result.url;
  }

  /**
   * Валидация файла перед загрузкой
   * File validation before upload
   */
  private async validateFile(filePath: string, expectedType: 'pdf' | 'jpeg'): Promise<void> {
    // Проверка существования файла
    const stats = await fs.stat(filePath);
    
    // Проверка размера (10 МБ)
    const maxSize = 10 * 1024 * 1024;
    if (stats.size > maxSize) {
      throw new Error(
        `Файл слишком большой: ${Math.round(stats.size / 1024 / 1024)} МБ ` +
        `(максимум: 10 МБ)`
      );
    }
    
    // Проверка расширения
    const ext = path.extname(filePath).toLowerCase();
    const validExtensions = expectedType === 'pdf' ? ['.pdf'] : ['.jpg', '.jpeg'];
    
    if (!validExtensions.includes(ext)) {
      throw new Error(
        `Неподдерживаемый формат файла: ${ext}. ` +
        `Ожидается: ${validExtensions.join(', ')}`
      );
    }
    
    console.log(`✅ Валидация файла пройдена`);
    console.log(`   Формат: ${ext.toUpperCase()}`);
    console.log(`   Размер: ${Math.round(stats.size / 1024)} КБ`);
  }

  /**
   * Пакетная загрузка нескольких файлов
   * Batch upload multiple files
   */
  async uploadMultipleInvoices(
    files: Array<{ path: string; postingNumber: string; type: 'pdf' | 'jpeg' }>
  ): Promise<Array<{ postingNumber: string; url: string; success: boolean }>> {
    console.log(`🔄 Пакетная загрузка ${files.length} файлов`);
    
    const results = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      console.log(`\n📁 [${i + 1}/${files.length}] Обработка: ${file.postingNumber}`);
      
      try {
        const url = file.type === 'pdf' 
          ? await this.uploadPdfInvoice(file.path, file.postingNumber)
          : await this.uploadJpegScan(file.path, file.postingNumber);
          
        results.push({ 
          postingNumber: file.postingNumber, 
          url, 
          success: true 
        });
        
        // Пауза между загрузками для соблюдения лимитов API
        if (i < files.length - 1) {
          console.log(`   ⏸️ Пауза 1 секунда...`);
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
      } catch (error) {
        console.error(`❌ Ошибка загрузки ${file.postingNumber}:`, error);
        results.push({ 
          postingNumber: file.postingNumber, 
          url: '', 
          success: false 
        });
      }
    }
    
    // Итоговая статистика
    const successful = results.filter(r => r.success).length;
    console.log(`\n📊 Результаты пакетной загрузки:`);
    console.log(`   ✅ Успешно: ${successful}/${files.length}`);
    console.log(`   ❌ Ошибок: ${files.length - successful}/${files.length}`);
    
    return results;
  }
}
```

### Обработка ошибок

```typescript
/**
 * Обработчик ошибок загрузки файлов
 * File upload error handler
 */
class UploadErrorHandler {
  static async handleUploadError(error: any, context: string): Promise<never> {
    console.error(`❌ Ошибка в ${context}:`, error);
    
    if (error.response?.status === 413) {
      throw new Error('Файл слишком большой (максимум: 10 МБ)');
    }
    
    if (error.response?.status === 415) {
      throw new Error('Неподдерживаемый формат файла (только PDF и JPEG)');
    }
    
    if (error.response?.status === 422) {
      throw new Error('Некорректные данные в запросе');
    }
    
    if (error.response?.status === 429) {
      throw new Error('Превышен лимит запросов, попробуйте позже');
    }
    
    if (error.code === 'ENOENT') {
      throw new Error('Файл не найден');
    }
    
    if (error.code === 'EACCES') {
      throw new Error('Нет прав доступа к файлу');
    }
    
    throw new Error(`Неизвестная ошибка: ${error.message || error}`);
  }
}
```

---

## 📋 Метод createOrUpdateInvoice()

### Описание и назначение
Создание новой или обновление существующей записи о счёт-фактуре с указанием всех необходимых метаданных для таможенного оформления.

**Зачем нужен:**
- Регистрация счёт-фактуры в системе OZON
- Привязка метаданных к загруженному файлу
- Указание HS-кодов для таможенной классификации
- Обновление данных при изменении информации

### TypeScript интерфейсы

```typescript
/**
 * HS-код товара для таможенной классификации
 * HS code for customs classification
 */
interface SupplierHsCode {
  /** 
   * 10-значный HS-код товара
   * 10-digit HS code
   * 
   * Формат: 1234567890
   * Пример: 6203420000 (мужские брюки из хлопка)
   */
  code?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос на создание/обновление счёт-фактуры
 * Invoice create/update request
 */
interface SupplierInvoiceCreateOrUpdateRequest {
  /** 
   * Дата счёт-фактуры в формате ISO 8601
   * Invoice date in ISO 8601 format
   * 
   * Пример: "2024-01-15T10:00:00Z"
   */
  date: string;
  
  /** 
   * Номер отправления OZON
   * OZON posting number
   * 
   * Формат: 0001-1234567-0000001
   */
  posting_number: string;
  
  /** 
   * URL файла счёт-фактуры
   * Invoice file URL
   * 
   * Получается из метода uploadInvoiceFile()
   */
  url: string;
  
  /** 
   * Номер счёт-фактуры (опционально)
   * Invoice number (optional)
   * 
   * Максимальная длина: 50 символов
   * Может содержать буквы, цифры, дефисы
   */
  number?: string;
  
  /** 
   * Стоимость из счёт-фактуры (опционально)
   * Invoice amount (optional)
   * 
   * Формат: до 2 знаков после точки
   * Пример: 1999.99
   */
  price?: number;
  
  /** 
   * Валюта счёт-фактуры (опционально)
   * Invoice currency (optional)
   * 
   * По умолчанию: USD
   */
  price_currency?: 'USD' | 'EUR' | 'TRY' | 'CNY' | 'RUB' | 'GBP';
  
  /** 
   * HS-коды товаров (опционально)
   * Product HS codes (optional)
   * 
   * Массив 10-значных кодов для таможенной классификации
   */
  hs_codes?: SupplierHsCode[];
  
  readonly [key: string]: unknown;
}

/**
 * Ответ на создание/обновление счёт-фактуры
 * Invoice create/update response
 */
interface SupplierInvoiceCreateOrUpdateResponse {
  /** 
   * Результат выполнения операции
   * Operation execution result
   * 
   * true - успешно, false - ошибка
   */
  result?: boolean;
  
  readonly [key: string]: unknown;
}
```

### Практические примеры

```typescript
/**
 * Менеджер создания и обновления счёт-фактур
 * Invoice creation and update manager
 */
export class InvoiceManager {
  constructor(private readonly supplierApi: SupplierApi) {}

  /**
   * Создание счёт-фактуры для турецкого продавца
   * Create invoice for Turkish seller
   */
  async createTurkishInvoice(
    postingNumber: string,
    fileUrl: string,
    invoiceData: {
      invoiceNumber: string;
      date: Date;
      amount: number;
      hsCodes: string[];
    }
  ): Promise<boolean> {
    console.log(`🇹🇷 Создание турецкой счёт-фактуры: ${invoiceData.invoiceNumber}`);
    console.log(`   Отправление: ${postingNumber}`);
    console.log(`   Сумма: ${invoiceData.amount} TRY`);
    console.log(`   HS-коды: ${invoiceData.hsCodes.length} товарных позиций`);
    
    const response = await this.supplierApi.createOrUpdateInvoice({
      date: invoiceData.date.toISOString(),
      posting_number: postingNumber,
      url: fileUrl,
      number: invoiceData.invoiceNumber,
      price: invoiceData.amount,
      price_currency: 'TRY', // Турецкая лира
      hs_codes: invoiceData.hsCodes.map(code => ({ code }))
    });
    
    if (response.result) {
      console.log(`✅ Турецкая счёт-фактура успешно создана`);
      return true;
    } else {
      console.error(`❌ Ошибка создания турецкой счёт-фактуры`);
      return false;
    }
  }

  /**
   * Создание международной счёт-фактуры в USD
   * Create international invoice in USD
   */
  async createInternationalInvoice(
    postingNumber: string,
    fileUrl: string,
    invoiceData: {
      invoiceNumber: string;
      date: Date;
      amount: number;
      currency: 'USD' | 'EUR' | 'GBP';
      hsCodes: string[];
    }
  ): Promise<boolean> {
    console.log(`🌍 Создание международной счёт-фактуры: ${invoiceData.invoiceNumber}`);
    console.log(`   Валюта: ${invoiceData.currency}`);
    console.log(`   Сумма: ${invoiceData.amount} ${invoiceData.currency}`);
    
    const response = await this.supplierApi.createOrUpdateInvoice({
      date: invoiceData.date.toISOString(),
      posting_number: postingNumber,
      url: fileUrl,
      number: invoiceData.invoiceNumber,
      price: invoiceData.amount,
      price_currency: invoiceData.currency,
      hs_codes: invoiceData.hsCodes.map(code => ({ code }))
    });
    
    return response.result || false;
  }

  /**
   * Обновление существующей счёт-фактуры
   * Update existing invoice
   */
  async updateInvoice(
    postingNumber: string,
    updates: {
      newPrice?: number;
      newCurrency?: 'USD' | 'EUR' | 'TRY' | 'CNY' | 'RUB' | 'GBP';
      additionalHsCodes?: string[];
      newInvoiceNumber?: string;
    }
  ): Promise<boolean> {
    console.log(`📝 Обновление счёт-фактуры: ${postingNumber}`);
    
    // Сначала получаем текущие данные
    const currentInvoice = await this.supplierApi.getInvoice({
      posting_number: postingNumber
    });
    
    if (!currentInvoice.result) {
      throw new Error(`Счёт-фактура не найдена: ${postingNumber}`);
    }
    
    const current = currentInvoice.result;
    
    // Подготавливаем обновленные данные
    const updatedData = {
      date: current.date!,
      posting_number: postingNumber,
      url: current.file_url!,
      number: updates.newInvoiceNumber || current.number,
      price: updates.newPrice || current.price,
      price_currency: updates.newCurrency || current.price_currency,
      hs_codes: [
        ...(current.hs_codes || []),
        ...(updates.additionalHsCodes?.map(code => ({ code })) || [])
      ]
    };
    
    console.log(`   Обновляемые поля:`);
    if (updates.newPrice) console.log(`     Цена: ${current.price} → ${updates.newPrice}`);
    if (updates.newCurrency) console.log(`     Валюта: ${current.price_currency} → ${updates.newCurrency}`);
    if (updates.additionalHsCodes) console.log(`     Добавлено HS-кодов: ${updates.additionalHsCodes.length}`);
    if (updates.newInvoiceNumber) console.log(`     Номер: ${current.number} → ${updates.newInvoiceNumber}`);
    
    const response = await this.supplierApi.createOrUpdateInvoice(updatedData);
    
    if (response.result) {
      console.log(`✅ Счёт-фактура успешно обновлена`);
      return true;
    } else {
      console.error(`❌ Ошибка обновления счёт-фактуры`);
      return false;
    }
  }
}
```

### Валидация HS-кодов

```typescript
/**
 * Валидатор HS-кодов товаров
 * Product HS code validator
 */
export class HsCodeValidator {
  // Справочник популярных HS-кодов для турецкого экспорта
  private static readonly COMMON_TURKISH_CODES: Record<string, string> = {
    '6203420000': 'Мужские брюки из хлопка',
    '6109100000': 'Футболки из хлопка',
    '6204620000': 'Женские брюки из хлопка',
    '6403990000': 'Обувь прочая',
    '4202920000': 'Сумки и чемоданы',
    '6110200000': 'Свитера из хлопка',
    '6211430000': 'Женская одежда из синтетических материалов',
    '6212100000': 'Бюстгальтеры',
    '7113190000': 'Ювелирные изделия из драгоценных металлов',
    '8517120000': 'Мобильные телефоны'
  };

  /**
   * Валидация формата HS-кода
   * Validate HS code format
   */
  static validateFormat(code: string): boolean {
    return /^\d{10}$/.test(code);
  }

  /**
   * Получение описания HS-кода
   * Get HS code description
   */
  static getDescription(code: string): string {
    return this.COMMON_TURKISH_CODES[code] || 'Описание не найдено';
  }

  /**
   * Валидация массива HS-кодов
   * Validate array of HS codes
   */
  static validateHsCodes(codes: string[]): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (codes.length === 0) {
      errors.push('Должен быть указан хотя бы один HS-код');
    }
    
    codes.forEach((code, index) => {
      if (!this.validateFormat(code)) {
        errors.push(`HS-код ${index + 1} (${code}) должен содержать ровно 10 цифр`);
      }
    });
    
    // Проверка на дубликаты
    const duplicates = codes.filter((code, index) => codes.indexOf(code) !== index);
    if (duplicates.length > 0) {
      errors.push(`Обнаружены дублирующиеся HS-коды: ${[...new Set(duplicates)].join(', ')}`);
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Анализ HS-кодов с описаниями
   * Analyze HS codes with descriptions
   */
  static analyzeHsCodes(codes: string[]): Array<{
    code: string;
    description: string;
    isCommon: boolean;
  }> {
    return codes.map(code => ({
      code,
      description: this.getDescription(code),
      isCommon: code in this.COMMON_TURKISH_CODES
    }));
  }
}
```

---

## 🔍 Метод getInvoice()

### Описание и назначение
Получение полной информации о ранее созданной счёт-фактуре по номеру отправления для просмотра деталей и проверки статуса.

**Зачем нужен:**
- Получение всех данных о зарегистрированной счёт-фактуре
- Проверка корректности сохраненной информации
- Получение URL файла для повторного доступа
- Аудит и отчетность по документам

### TypeScript интерфейсы

```typescript
/**
 * Запрос информации о счёт-фактуре
 * Invoice information request
 */
interface SupplierInvoiceGetRequest {
  /** 
   * Номер отправления OZON
   * OZON posting number
   * 
   * Формат: 0001-1234567-0000001
   */
  posting_number: string;
  
  readonly [key: string]: unknown;
}

/**
 * HS-код в ответе
 * HS code in response
 */
interface SupplierResponseHsCode {
  /** 
   * 10-значный HS-код
   * 10-digit HS code
   */
  code?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Информация о счёт-фактуре
 * Invoice information
 */
interface SupplierInvoiceInfo {
  /** 
   * Дата создания/обновления счёт-фактуры
   * Invoice creation/update date
   */
  date?: string;
  
  /** 
   * Постоянная ссылка на файл
   * Permanent file URL
   */
  file_url?: string;
  
  /** 
   * Массив HS-кодов товаров
   * Array of product HS codes
   */
  hs_codes?: SupplierResponseHsCode[];
  
  /** 
   * Номер счёт-фактуры
   * Invoice number
   */
  number?: string;
  
  /** 
   * Сумма счёт-фактуры
   * Invoice amount
   * 
   * До 2 знаков после точки
   */
  price?: number;
  
  /** 
   * Валюта счёт-фактуры
   * Invoice currency
   */
  price_currency?: 'USD' | 'EUR' | 'TRY' | 'CNY' | 'RUB' | 'GBP';
  
  readonly [key: string]: unknown;
}

/**
 * Ответ с информацией о счёт-фактуре
 * Invoice information response
 */
interface SupplierInvoiceGetResponse {
  /** 
   * Детальная информация о счёт-фактуре
   * Detailed invoice information
   * 
   * null если счёт-фактура не найдена
   */
  result?: SupplierInvoiceInfo;
  
  readonly [key: string]: unknown;
}
```

### Практические примеры

```typescript
/**
 * Анализатор счёт-фактур
 * Invoice analyzer
 */
export class InvoiceAnalyzer {
  constructor(private readonly supplierApi: SupplierApi) {}

  /**
   * Получение и анализ детальной информации
   * Get and analyze detailed information
   */
  async analyzeInvoice(postingNumber: string): Promise<InvoiceAnalysisResult> {
    console.log(`🔍 Анализ счёт-фактуры: ${postingNumber}`);
    
    const response = await this.supplierApi.getInvoice({
      posting_number: postingNumber
    });
    
    if (!response.result) {
      console.log(`❌ Счёт-фактура не найдена: ${postingNumber}`);
      return {
        found: false,
        postingNumber,
        analysis: null
      };
    }
    
    const invoice = response.result;
    
    console.log(`✅ Счёт-фактура найдена`);
    console.log(`   📄 Номер: ${invoice.number || 'Не указан'}`);
    console.log(`   📅 Дата: ${this.formatDate(invoice.date)}`);
    console.log(`   💰 Сумма: ${invoice.price || 0} ${invoice.price_currency || 'USD'}`);
    console.log(`   🔗 URL файла: ${invoice.file_url ? 'Доступен' : 'Недоступен'}`);
    console.log(`   📦 HS-коды: ${invoice.hs_codes?.length || 0} товарных позиций`);
    
    // Анализ HS-кодов
    const hsCodesAnalysis = this.analyzeHsCodes(invoice.hs_codes || []);
    
    // Валидация данных
    const validationResults = this.validateInvoiceData(invoice);
    
    // Определение валютного региона
    const currencyRegion = this.determineCurrencyRegion(invoice.price_currency);
    
    return {
      found: true,
      postingNumber,
      analysis: {
        basicInfo: {
          number: invoice.number,
          date: invoice.date,
          price: invoice.price,
          currency: invoice.price_currency,
          fileUrl: invoice.file_url
        },
        hsCodesAnalysis,
        validationResults,
        currencyRegion,
        completenessScore: this.calculateCompletenessScore(invoice)
      }
    };
  }

  /**
   * Пакетный анализ нескольких счёт-фактур
   * Batch analysis of multiple invoices
   */
  async batchAnalyzeInvoices(
    postingNumbers: string[]
  ): Promise<InvoiceAnalysisResult[]> {
    console.log(`📊 Пакетный анализ ${postingNumbers.length} счёт-фактур`);
    
    const results = [];
    
    for (let i = 0; i < postingNumbers.length; i++) {
      const postingNumber = postingNumbers[i];
      console.log(`\n[${i + 1}/${postingNumbers.length}] Анализ: ${postingNumber}`);
      
      try {
        const analysis = await this.analyzeInvoice(postingNumber);
        results.push(analysis);
        
        // Пауза между запросами
        if (i < postingNumbers.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
        
      } catch (error) {
        console.error(`❌ Ошибка анализа ${postingNumber}:`, error);
        results.push({
          found: false,
          postingNumber,
          analysis: null,
          error: String(error)
        });
      }
    }
    
    // Сводная статистика
    this.printBatchStatistics(results);
    
    return results;
  }

  /**
   * Анализ HS-кодов товаров
   * Product HS codes analysis
   */
  private analyzeHsCodes(hsCodes: SupplierResponseHsCode[]): HsCodesAnalysis {
    const codes = hsCodes.map(h => h.code).filter(Boolean) as string[];
    
    return {
      totalCodes: codes.length,
      validCodes: codes.filter(code => HsCodeValidator.validateFormat(code)).length,
      invalidCodes: codes.filter(code => !HsCodeValidator.validateFormat(code)),
      codeDetails: codes.map(code => ({
        code,
        description: HsCodeValidator.getDescription(code),
        isValid: HsCodeValidator.validateFormat(code),
        isCommonTurkish: code in HsCodeValidator['COMMON_TURKISH_CODES']
      }))
    };
  }

  /**
   * Валидация данных счёт-фактуры
   * Invoice data validation
   */
  private validateInvoiceData(invoice: SupplierInvoiceInfo): ValidationResults {
    const issues = [];
    const warnings = [];
    
    // Критические проблемы
    if (!invoice.number) {
      issues.push('Отсутствует номер счёт-фактуры');
    }
    
    if (!invoice.date) {
      issues.push('Отсутствует дата счёт-фактуры');
    }
    
    if (!invoice.file_url) {
      issues.push('Отсутствует ссылка на файл');
    }
    
    if (!invoice.price || invoice.price <= 0) {
      issues.push('Некорректная или отсутствующая сумма');
    }
    
    // Предупреждения
    if (!invoice.hs_codes || invoice.hs_codes.length === 0) {
      warnings.push('Не указаны HS-коды товаров (могут потребоваться для таможни)');
    }
    
    if (invoice.number && invoice.number.length > 50) {
      warnings.push('Номер счёт-фактуры слишком длинный (максимум 50 символов)');
    }
    
    if (invoice.price && invoice.price > 999999.99) {
      warnings.push('Очень большая сумма счёт-фактуры');
    }
    
    return {
      isValid: issues.length === 0,
      issues,
      warnings,
      score: Math.max(0, 100 - (issues.length * 25) - (warnings.length * 10))
    };
  }

  /**
   * Определение валютного региона
   * Currency region determination
   */
  private determineCurrencyRegion(currency?: string): CurrencyRegion {
    const regions: Record<string, CurrencyRegion> = {
      'USD': { region: 'Северная Америка', code: 'USD', symbol: '$' },
      'EUR': { region: 'Европейский союз', code: 'EUR', symbol: '€' },
      'TRY': { region: 'Турция', code: 'TRY', symbol: '₺' },
      'CNY': { region: 'Китай', code: 'CNY', symbol: '¥' },
      'RUB': { region: 'Россия', code: 'RUB', symbol: '₽' },
      'GBP': { region: 'Великобритания', code: 'GBP', symbol: '£' }
    };
    
    return regions[currency || 'USD'] || regions['USD'];
  }

  /**
   * Расчет полноты заполнения данных
   * Calculate data completeness score
   */
  private calculateCompletenessScore(invoice: SupplierInvoiceInfo): number {
    const fields = [
      { name: 'number', weight: 20, value: !!invoice.number },
      { name: 'date', weight: 20, value: !!invoice.date },
      { name: 'price', weight: 15, value: !!invoice.price },
      { name: 'currency', weight: 10, value: !!invoice.price_currency },
      { name: 'file_url', weight: 20, value: !!invoice.file_url },
      { name: 'hs_codes', weight: 15, value: !!(invoice.hs_codes?.length) }
    ];
    
    const totalScore = fields.reduce((sum, field) => {
      return sum + (field.value ? field.weight : 0);
    }, 0);
    
    return totalScore;
  }

  /**
   * Форматирование даты для отображения
   * Format date for display
   */
  private formatDate(dateString?: string): string {
    if (!dateString) return 'Не указана';
    
    try {
      return new Date(dateString).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  }

  /**
   * Печать статистики пакетного анализа
   * Print batch analysis statistics
   */
  private printBatchStatistics(results: InvoiceAnalysisResult[]): void {
    const found = results.filter(r => r.found).length;
    const notFound = results.length - found;
    const avgCompleteness = results
      .filter(r => r.analysis)
      .reduce((sum, r) => sum + (r.analysis!.completenessScore || 0), 0) / found || 0;
    
    console.log(`\n📊 Статистика пакетного анализа:`);
    console.log(`   ✅ Найдено счёт-фактур: ${found}/${results.length}`);
    console.log(`   ❌ Не найдено: ${notFound}/${results.length}`);
    console.log(`   📈 Средняя полнота данных: ${Math.round(avgCompleteness)}%`);
    
    if (found > 0) {
      const validData = results.filter(r => r.analysis?.validationResults.isValid).length;
      console.log(`   ✅ Валидных записей: ${validData}/${found}`);
      
      // Статистика по валютам
      const currencies = new Map<string, number>();
      results.forEach(r => {
        if (r.analysis?.basicInfo.currency) {
          const curr = r.analysis.basicInfo.currency;
          currencies.set(curr, (currencies.get(curr) || 0) + 1);
        }
      });
      
      console.log(`   💰 Валюты:`);
      currencies.forEach((count, currency) => {
        console.log(`      ${currency}: ${count} счёт-фактур`);
      });
    }
  }
}

// Типы для анализа
interface InvoiceAnalysisResult {
  found: boolean;
  postingNumber: string;
  analysis: {
    basicInfo: {
      number?: string;
      date?: string;
      price?: number;
      currency?: string;
      fileUrl?: string;
    };
    hsCodesAnalysis: HsCodesAnalysis;
    validationResults: ValidationResults;
    currencyRegion: CurrencyRegion;
    completenessScore: number;
  } | null;
  error?: string;
}

interface HsCodesAnalysis {
  totalCodes: number;
  validCodes: number;
  invalidCodes: string[];
  codeDetails: Array<{
    code: string;
    description: string;
    isValid: boolean;
    isCommonTurkish: boolean;
  }>;
}

interface ValidationResults {
  isValid: boolean;
  issues: string[];
  warnings: string[];
  score: number;
}

interface CurrencyRegion {
  region: string;
  code: string;
  symbol: string;
}
```

---

## 🗑️ Метод deleteInvoice()

### Описание и назначение
Удаление ссылки на счёт-фактуру из системы OZON при необходимости отзыва или исправления документа.

**Зачем нужен:**
- Удаление некорректно загруженных документов
- Отзыв счёт-фактур при изменении условий отправления
- Очистка системы от тестовых или дублирующихся записей
- Соблюдение требований документооборота

### TypeScript интерфейсы

```typescript
/**
 * Запрос на удаление ссылки на счёт-фактуру
 * Invoice reference deletion request
 */
interface SupplierInvoiceDeleteRequest {
  /** 
   * Номер отправления OZON
   * OZON posting number
   * 
   * Формат: 0001-1234567-0000001
   */
  posting_number: string;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ на удаление ссылки на счёт-фактуру
 * Invoice reference deletion response
 */
interface SupplierInvoiceDeleteResponse {
  /** 
   * Результат выполнения операции удаления
   * Deletion operation result
   * 
   * true - успешно удалено
   * false - ошибка удаления
   */
  result?: boolean;
  
  readonly [key: string]: unknown;
}
```

### Практические примеры

```typescript
/**
 * Менеджер жизненного цикла счёт-фактур
 * Invoice lifecycle manager
 */
export class InvoiceLifecycleManager {
  constructor(private readonly supplierApi: SupplierApi) {}

  /**
   * Безопасное удаление с подтверждением
   * Safe deletion with confirmation
   */
  async safeDeleteInvoice(
    postingNumber: string,
    reason: string,
    confirmationCallback?: () => Promise<boolean>
  ): Promise<boolean> {
    console.log(`🗑️ Запрос на удаление счёт-фактуры: ${postingNumber}`);
    console.log(`   Причина: ${reason}`);
    
    // Получаем информацию перед удалением для логирования
    let invoiceInfo = null;
    try {
      const response = await this.supplierApi.getInvoice({
        posting_number: postingNumber
      });
      invoiceInfo = response.result;
    } catch (error) {
      console.warn(`⚠️ Не удалось получить информацию перед удалением: ${error}`);
    }
    
    if (invoiceInfo) {
      console.log(`📋 Удаляемая счёт-фактура:`);
      console.log(`   📄 Номер: ${invoiceInfo.number || 'Не указан'}`);
      console.log(`   📅 Дата: ${invoiceInfo.date}`);
      console.log(`   💰 Сумма: ${invoiceInfo.price} ${invoiceInfo.price_currency}`);
      console.log(`   📦 HS-коды: ${invoiceInfo.hs_codes?.length || 0} позиций`);
    }
    
    // Запрос подтверждения, если задан колбэк
    if (confirmationCallback) {
      const confirmed = await confirmationCallback();
      if (!confirmed) {
        console.log(`❌ Удаление отменено пользователем`);
        return false;
      }
    }
    
    // Выполнение удаления
    try {
      const result = await this.supplierApi.deleteInvoice({
        posting_number: postingNumber
      });
      
      if (result.result) {
        console.log(`✅ Ссылка на счёт-фактуру успешно удалена`);
        
        // Логирование операции удаления
        this.logDeletionOperation(postingNumber, reason, invoiceInfo);
        
        return true;
      } else {
        console.error(`❌ Ошибка удаления счёт-фактуры`);
        return false;
      }
      
    } catch (error) {
      console.error(`❌ Критическая ошибка при удалении:`, error);
      return false;
    }
  }

  /**
   * Пакетное удаление счёт-фактур
   * Batch invoice deletion
   */
  async batchDeleteInvoices(
    postingNumbers: string[],
    reason: string
  ): Promise<BatchDeletionResult> {
    console.log(`🗑️ Пакетное удаление ${postingNumbers.length} счёт-фактур`);
    console.log(`   Причина: ${reason}`);
    
    const results: Array<{
      postingNumber: string;
      success: boolean;
      error?: string;
    }> = [];
    
    for (let i = 0; i < postingNumbers.length; i++) {
      const postingNumber = postingNumbers[i];
      console.log(`\n[${i + 1}/${postingNumbers.length}] Удаление: ${postingNumber}`);
      
      try {
        const success = await this.safeDeleteInvoice(postingNumber, reason);
        results.push({ postingNumber, success });
        
        // Пауза между удалениями
        if (i < postingNumbers.length - 1) {
          console.log(`   ⏸️ Пауза 1 секунда...`);
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
      } catch (error) {
        console.error(`❌ Ошибка удаления ${postingNumber}:`, error);
        results.push({ 
          postingNumber, 
          success: false, 
          error: String(error) 
        });
      }
    }
    
    // Статистика результатов
    const successful = results.filter(r => r.success).length;
    const failed = results.length - successful;
    
    console.log(`\n📊 Результаты пакетного удаления:`);
    console.log(`   ✅ Успешно удалено: ${successful}/${postingNumbers.length}`);
    console.log(`   ❌ Ошибок: ${failed}/${postingNumbers.length}`);
    
    if (failed > 0) {
      console.log(`\n❌ Неудачные удаления:`);
      results.filter(r => !r.success).forEach(r => {
        console.log(`   - ${r.postingNumber}: ${r.error || 'Неизвестная ошибка'}`);
      });
    }
    
    return {
      total: postingNumbers.length,
      successful,
      failed,
      results
    };
  }

  /**
   * Условное удаление (только если соответствует критериям)
   * Conditional deletion (only if matches criteria)
   */
  async conditionalDelete(
    postingNumber: string,
    conditions: {
      maxPrice?: number;
      allowedCurrencies?: string[];
      requireEmptyHsCodes?: boolean;
      olderThanDays?: number;
    },
    reason: string
  ): Promise<boolean> {
    console.log(`🔍 Условное удаление счёт-фактуры: ${postingNumber}`);
    
    // Получаем текущую информацию
    const response = await this.supplierApi.getInvoice({
      posting_number: postingNumber
    });
    
    if (!response.result) {
      console.log(`❌ Счёт-фактура не найдена: ${postingNumber}`);
      return false;
    }
    
    const invoice = response.result;
    
    // Проверка условий
    const checks = [];
    
    if (conditions.maxPrice && invoice.price && invoice.price > conditions.maxPrice) {
      checks.push(`Цена ${invoice.price} превышает лимит ${conditions.maxPrice}`);
    }
    
    if (conditions.allowedCurrencies && invoice.price_currency) {
      if (!conditions.allowedCurrencies.includes(invoice.price_currency)) {
        checks.push(`Валюта ${invoice.price_currency} не разрешена`);
      }
    }
    
    if (conditions.requireEmptyHsCodes && invoice.hs_codes && invoice.hs_codes.length > 0) {
      checks.push(`Содержит HS-коды (${invoice.hs_codes.length} шт.)`);
    }
    
    if (conditions.olderThanDays && invoice.date) {
      const invoiceDate = new Date(invoice.date);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - conditions.olderThanDays);
      
      if (invoiceDate > cutoffDate) {
        checks.push(`Слишком новая (создана ${invoiceDate.toLocaleDateString()})`);
      }
    }
    
    if (checks.length > 0) {
      console.log(`❌ Условия не выполнены:`);
      checks.forEach(check => console.log(`   - ${check}`));
      return false;
    }
    
    console.log(`✅ Все условия выполнены, выполняем удаление`);
    return this.safeDeleteInvoice(postingNumber, reason);
  }

  /**
   * Логирование операции удаления
   * Log deletion operation
   */
  private logDeletionOperation(
    postingNumber: string,
    reason: string,
    invoiceInfo: SupplierInvoiceInfo | null
  ): void {
    const logEntry = {
      timestamp: new Date().toISOString(),
      operation: 'DELETE_INVOICE',
      postingNumber,
      reason,
      deletedData: invoiceInfo ? {
        invoiceNumber: invoiceInfo.number,
        amount: invoiceInfo.price,
        currency: invoiceInfo.price_currency,
        hsCodesCount: invoiceInfo.hs_codes?.length || 0
      } : null
    };
    
    // В реальной системе здесь была бы запись в базу данных или файл логов
    console.log(`📝 Операция удаления зафиксирована в логах`);
    console.log(`   Время: ${logEntry.timestamp}`);
    console.log(`   Причина: ${logEntry.reason}`);
  }
}

// Типы для управления жизненным циклом
interface BatchDeletionResult {
  total: number;
  successful: number;
  failed: number;
  results: Array<{
    postingNumber: string;
    success: boolean;
    error?: string;
  }>;
}
```

### Лучшие практики удаления

```typescript
/**
 * Утилиты для безопасного удаления
 * Safe deletion utilities
 */
export class SafeDeletionUtils {
  
  /**
   * Создание интерактивного подтверждения удаления
   * Create interactive deletion confirmation
   */
  static async createConfirmationPrompt(
    postingNumber: string,
    invoiceInfo: SupplierInvoiceInfo | null
  ): Promise<boolean> {
    console.log(`\n⚠️ ПОДТВЕРЖДЕНИЕ УДАЛЕНИЯ`);
    console.log(`   Отправление: ${postingNumber}`);
    
    if (invoiceInfo) {
      console.log(`   Счёт-фактура: ${invoiceInfo.number || 'Без номера'}`);
      console.log(`   Сумма: ${invoiceInfo.price || 0} ${invoiceInfo.price_currency || 'USD'}`);
    }
    
    console.log(`\n❗ ВНИМАНИЕ: Это действие нельзя отменить!`);
    console.log(`❗ Файл будет недоступен для скачивания после удаления.`);
    console.log(`❗ Данные будут удалены из системы OZON безвозвратно.\n`);
    
    // В реальной системе здесь был бы интерактивный промпт
    // Для примера возвращаем true
    return true;
  }

  /**
   * Валидация возможности удаления
   * Validate deletion possibility
   */
  static validateDeletionEligibility(
    invoiceInfo: SupplierInvoiceInfo | null
  ): { canDelete: boolean; reasons: string[] } {
    const reasons: string[] = [];
    
    if (!invoiceInfo) {
      reasons.push('Счёт-фактура не найдена или уже удалена');
      return { canDelete: false, reasons };
    }
    
    // Проверяем, не является ли документ критически важным
    if (invoiceInfo.price && invoiceInfo.price > 10000) {
      reasons.push('Высокая сумма документа - требует дополнительного подтверждения');
    }
    
    if (invoiceInfo.hs_codes && invoiceInfo.hs_codes.length > 10) {
      reasons.push('Большое количество товарных позиций - возможны сложности в учете');
    }
    
    // Проверка даты создания
    if (invoiceInfo.date) {
      const invoiceDate = new Date(invoiceInfo.date);
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
      
      if (invoiceDate > threeDaysAgo) {
        reasons.push('Недавно созданный документ - рекомендуется подождать обработки');
      }
    }
    
    return {
      canDelete: reasons.length === 0,
      reasons
    };
  }

  /**
   * Создание резервной копии перед удалением
   * Create backup before deletion
   */
  static async createBackupBeforeDeletion(
    postingNumber: string,
    invoiceInfo: SupplierInvoiceInfo | null
  ): Promise<boolean> {
    if (!invoiceInfo) return true;
    
    console.log(`💾 Создание резервной копии перед удалением...`);
    
    const backup = {
      timestamp: new Date().toISOString(),
      postingNumber,
      invoiceData: {
        number: invoiceInfo.number,
        date: invoiceInfo.date,
        price: invoiceInfo.price,
        currency: invoiceInfo.price_currency,
        fileUrl: invoiceInfo.file_url,
        hsCodes: invoiceInfo.hs_codes?.map(code => code.code)
      }
    };
    
    try {
      // В реальной системе здесь была бы запись в систему резервного копирования
      console.log(`✅ Резервная копия создана`);
      console.log(`   Размер данных: ${JSON.stringify(backup).length} байт`);
      
      return true;
    } catch (error) {
      console.error(`❌ Ошибка создания резервной копии:`, error);
      return false;
    }
  }
}
```

---

## 💡 Комплексные сценарии использования

### Полный цикл работы с документом

```typescript
/**
 * Демонстрация полного цикла работы со счёт-фактурой
 * Complete invoice lifecycle demonstration
 */
async function demonstrateFullInvoiceLifecycle() {
  const supplierApi = new SupplierApi(httpClient);
  const fileUploader = new InvoiceFileUploader(supplierApi);
  const invoiceManager = new InvoiceManager(supplierApi);
  const analyzer = new InvoiceAnalyzer(supplierApi);
  const lifecycleManager = new InvoiceLifecycleManager(supplierApi);
  
  const postingNumber = '0001-1234567-0000001';
  
  try {
    console.log(`🚀 НАЧАЛО: Полный цикл работы со счёт-фактурой`);
    console.log(`   Отправление: ${postingNumber}\n`);
    
    // 1. Загрузка файла
    console.log(`📤 ЭТАП 1: Загрузка файла счёт-фактуры`);
    const fileUrl = await fileUploader.uploadPdfInvoice(
      './documents/turkish-invoice-001.pdf',
      postingNumber
    );
    
    // 2. Создание записи
    console.log(`\n📋 ЭТАП 2: Создание счёт-фактуры`);
    const created = await invoiceManager.createTurkishInvoice(
      postingNumber,
      fileUrl,
      {
        invoiceNumber: 'TR-2024-0001',
        date: new Date('2024-01-15'),
        amount: 2850.75,
        hsCodes: ['6203420000', '6109100000', '6204620000']
      }
    );
    
    if (!created) {
      throw new Error('Ошибка создания счёт-фактуры');
    }
    
    // 3. Получение и анализ
    console.log(`\n🔍 ЭТАП 3: Анализ созданной счёт-фактуры`);
    const analysis = await analyzer.analyzeInvoice(postingNumber);
    
    if (!analysis.found) {
      throw new Error('Созданная счёт-фактура не найдена');
    }
    
    console.log(`📊 Результаты анализа:`);
    console.log(`   Полнота данных: ${analysis.analysis!.completenessScore}%`);
    console.log(`   Валидность: ${analysis.analysis!.validationResults.isValid ? 'Да' : 'Нет'}`);
    console.log(`   HS-коды: ${analysis.analysis!.hsCodesAnalysis.totalCodes} (${analysis.analysis!.hsCodesAnalysis.validCodes} валидных)`);
    
    // 4. Обновление данных (если нужно)
    if (analysis.analysis!.validationResults.warnings.length > 0) {
      console.log(`\n📝 ЭТАП 4: Обновление данных`);
      await invoiceManager.updateInvoice(postingNumber, {
        additionalHsCodes: ['7113190000'] // Добавляем ювелирные изделия
      });
    }
    
    // 5. Повторный анализ после обновления
    console.log(`\n🔍 ЭТАП 5: Повторный анализ`);
    const updatedAnalysis = await analyzer.analyzeInvoice(postingNumber);
    console.log(`   Новая полнота данных: ${updatedAnalysis.analysis!.completenessScore}%`);
    
    // 6. Опциональное удаление (для демонстрации)
    console.log(`\n🗑️ ЭТАП 6: Демонстрация возможности удаления`);
    const eligibility = SafeDeletionUtils.validateDeletionEligibility(
      updatedAnalysis.analysis!.basicInfo as any
    );
    
    if (eligibility.canDelete) {
      console.log(`✅ Документ может быть удален при необходимости`);
    } else {
      console.log(`⚠️ Удаление требует дополнительных проверок:`);
      eligibility.reasons.forEach(reason => console.log(`   - ${reason}`));
    }
    
    console.log(`\n🎉 ЗАВЕРШЕНО: Полный цикл успешно продемонстрирован`);
    
  } catch (error) {
    console.error(`❌ ОШИБКА в цикле:`, error);
    throw error;
  }
}

// Запуск демонстрации
demonstrateFullInvoiceLifecycle().catch(console.error);
```

Создана полная документация по управлению счёт-фактурами со всеми 4 методами Supplier API!