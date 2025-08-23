# FBS & rFBS Marks API

API для управления маркировкой товаров и кодами DataMatrix в схемах FBS и rFBS в OZON Seller API.

**Количество методов**: 13 методов

## Обзор

FBS & rFBS Marks API предоставляет полный набор инструментов для работы с маркировкой:
- 📝 Управление образцами маркировки товаров
- 📋 Загрузка и валидация кодов DataMatrix
- ✅ Проверка соответствия требованиям маркировки
- 📊 Мониторинг статуса загрузки и валидации
- 🔍 Получение информации об отправлениях, требующих маркировку

## Основные возможности

### 🎯 Система маркировки товаров
**Обязательная маркировка** - российское законодательство требует маркировки определенных категорий товаров кодами DataMatrix для отслеживания в системе "Честный ЗНАК".

### 📝 Образцы маркировки
- Загрузка PDF-образцов правильной маркировки
- Валидация качества и соответствия образцов
- Управление библиотекой образцов для каждого товара

### 🔢 Коды DataMatrix
- Загрузка кодов для конкретных отправлений
- Валидация кодов в системе "Честный ЗНАК"  
- Контроль соответствия количества кодов товарам

### ⚠️ Требования соответствия
- Коды должны быть получены из системы "Честный ЗНАК"
- Обязательная валидация перед отправкой
- Соответствие образцам маркировки
- Контроль сроков загрузки кодов

## Методы API

### Управление образцами маркировки

#### createProductExemplar()
**Назначение**: Загрузить образец маркировки товара

```typescript
interface FbsRfbsMarksProductExemplarCreateRequest {
  product_id: number;
  file: string; // Base64 encoded PDF content
  file_name: string;
}
```

#### getProductExemplarInfo()
**Назначение**: Получить информацию о загруженном образце

#### getProductExemplarList()
**Назначение**: Получить список образцов маркировки товара

#### deleteProductExemplar()
**Назначение**: Удалить образец маркировки

#### getProductExemplarDeleteStatus()
**Назначение**: Получить статус удаления образца

#### validateProductExemplar()
**Назначение**: Валидировать образец маркировки

#### getProductExemplarValidateStatus()
**Назначение**: Получить статус валидации образца

### Управление кодами маркировки

#### uploadPostingCodes()
**Назначение**: Загрузить коды маркировки для отправления

```typescript
interface FbsRfbsMarksPostingCodesUploadRequest {
  posting_number: string;
  codes: Array<{
    sku: string;
    gtd: string; // DataMatrix код
    quantity: number;
  }>;
}
```

#### getPostingCodesUploadStatus()
**Назначение**: Получить статус загрузки кодов маркировки

#### validatePostingCodes()
**Назначение**: Проверить коды маркировки отправления

#### getPostingCodesValidateStatus()
**Назначение**: Получить статус проверки кодов маркировки

#### getPostingCodesInfo()
**Назначение**: Получить информацию о кодах маркировки отправления

### Управление отправлениями

#### getPostingList()
**Назначение**: Получить список отправлений с обязательной маркировкой

```typescript
interface FbsRfbsMarksPostingListRequest {
  status?: 'awaiting_codes' | 'codes_uploaded' | 'validated';
  date_from?: string;
  date_to?: string;
  limit?: number;
  offset?: number;
}
```

## Практические примеры

### Базовое использование

```typescript
import { OzonSellerAPI } from 'bmad-ozon-seller-api';

const api = new OzonSellerAPI({
  clientId: 'your-client-id',
  apiKey: 'your-api-key'
});

// Загрузить образец маркировки
const exemplarResult = await api.fbsRfbsMarks.createProductExemplar({
  product_id: 123456,
  file: 'base64EncodedPdfContent',
  file_name: 'marking_exemplar.pdf'
});

// Получить отправления, требующие маркировку
const postingsWithMarking = await api.fbsRfbsMarks.getPostingList({
  status: 'awaiting_codes',
  date_from: '2024-01-01T00:00:00Z',
  date_to: '2024-01-31T23:59:59Z',
  limit: 100
});

// Загрузить коды маркировки
const codesResult = await api.fbsRfbsMarks.uploadPostingCodes({
  posting_number: 'FBS-123456789',
  codes: [
    { sku: 'SKU123', gtd: 'marking_code_1', quantity: 1 },
    { sku: 'SKU456', gtd: 'marking_code_2', quantity: 2 }
  ]
});

// Валидировать коды
const validationResult = await api.fbsRfbsMarks.validatePostingCodes({
  posting_number: 'FBS-123456789'
});
```

### Продвинутые сценарии

#### Менеджер маркировки товаров

```typescript
class ProductMarkingManager {
  constructor(private api: OzonSellerAPI) {}

  async setupProductMarking(productId: number, exemplarFile: Buffer): Promise<void> {
    console.log(`🏷️ Настройка маркировки для товара ${productId}`);

    try {
      // 1. Конвертируем файл в base64
      const base64File = exemplarFile.toString('base64');
      const fileName = `product_${productId}_exemplar.pdf`;

      // 2. Загружаем образец маркировки
      const uploadResult = await this.api.fbsRfbsMarks.createProductExemplar({
        product_id: productId,
        file: base64File,
        file_name: fileName
      });

      console.log(`📤 Образец загружен, задача: ${uploadResult.task_id}`);

      // 3. Ждем обработки загрузки
      const uploadStatus = await this.waitForTaskCompletion(
        uploadResult.task_id!,
        (taskId) => this.api.fbsRfbsMarks.getProductExemplarInfo({ task_id: taskId })
      );

      if (uploadStatus.status !== 'completed') {
        throw new Error(`Ошибка загрузки образца: ${uploadStatus.error_message}`);
      }

      console.log(`✅ Образец успешно загружен: ${uploadStatus.exemplar_id}`);

      // 4. Валидируем образец
      const validationTask = await this.api.fbsRfbsMarks.validateProductExemplar({
        exemplar_id: uploadStatus.exemplar_id!
      });

      console.log(`🔍 Запущена валидация: ${validationTask.task_id}`);

      // 5. Ждем результатов валидации
      const validationStatus = await this.waitForTaskCompletion(
        validationTask.task_id!,
        (taskId) => this.api.fbsRfbsMarks.getProductExemplarValidateStatus({ task_id: taskId })
      );

      // 6. Анализируем результаты валидации
      if (validationStatus.is_valid) {
        console.log('✅ Образец прошел валидацию');
        this.logValidationDetails(validationStatus.validation_details);
      } else {
        console.log('❌ Образец не прошел валидацию');
        this.logValidationErrors(validationStatus.validation_errors);
        throw new Error('Образец маркировки не соответствует требованиям');
      }

    } catch (error) {
      console.error('❌ Ошибка настройки маркировки:', error);
      throw error;
    }
  }

  async getProductExemplars(productId: number): Promise<any[]> {
    const exemplars = await this.api.fbsRfbsMarks.getProductExemplarList({
      product_id: productId,
      limit: 50
    });

    console.log(`📚 Найдено образцов для товара ${productId}: ${exemplars.total}`);
    
    return exemplars.exemplars?.map(exemplar => ({
      id: exemplar.exemplar_id,
      filename: exemplar.file_name,
      status: exemplar.status,
      created_at: exemplar.created_at,
      is_valid: exemplar.validation_result?.is_valid
    })) || [];
  }

  async cleanupOldExemplars(productId: number): Promise<void> {
    const exemplars = await this.getProductExemplars(productId);
    const oldExemplars = exemplars.filter(exemplar => 
      exemplar.status === 'invalid' || 
      (exemplar.created_at && new Date(exemplar.created_at) < new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
    );

    console.log(`🧹 Удаление ${oldExemplars.length} устаревших образцов`);

    for (const exemplar of oldExemplars) {
      try {
        const deleteResult = await this.api.fbsRfbsMarks.deleteProductExemplar({
          exemplar_id: exemplar.id
        });

        const deleteStatus = await this.waitForTaskCompletion(
          deleteResult.task_id!,
          (taskId) => this.api.fbsRfbsMarks.getProductExemplarDeleteStatus({ task_id: taskId })
        );

        if (deleteStatus.success) {
          console.log(`✅ Удален образец: ${exemplar.filename}`);
        } else {
          console.log(`❌ Ошибка удаления: ${exemplar.filename}`);
        }
      } catch (error) {
        console.log(`❌ Ошибка удаления образца ${exemplar.id}:`, error.message);
      }
    }
  }

  private logValidationDetails(details: any): void {
    if (!details) return;
    
    console.log('📋 Детали валидации:');
    if (details.quality_valid !== undefined) {
      console.log(`  Качество изображения: ${details.quality_valid ? '✅' : '❌'}`);
    }
    if (details.format_valid !== undefined) {
      console.log(`  Формат файла: ${details.format_valid ? '✅' : '❌'}`);
    }
    if (details.content_valid !== undefined) {
      console.log(`  Содержимое маркировки: ${details.content_valid ? '✅' : '❌'}`);
    }
  }

  private logValidationErrors(errors: any[]): void {
    if (!errors || errors.length === 0) return;
    
    console.log('❌ Ошибки валидации:');
    errors.forEach((error, index) => {
      console.log(`  ${index + 1}. ${error.code}: ${error.message}`);
    });
  }

  private async waitForTaskCompletion(taskId: string, statusChecker: (id: string) => Promise<any>): Promise<any> {
    const maxAttempts = 30;
    const delay = 2000;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const status = await statusChecker(taskId);
      
      if (status.status === 'completed' || status.is_valid !== undefined) {
        return status;
      } else if (status.status === 'error') {
        throw new Error(status.error_message || 'Ошибка выполнения задачи');
      }
      
      console.log(`⏳ Ожидание завершения... (${attempt + 1}/${maxAttempts})`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    
    throw new Error('Превышено время ожидания выполнения задачи');
  }
}
```

#### Автоматизация загрузки кодов маркировки

```typescript
class MarkingCodesProcessor {
  constructor(private api: OzonSellerAPI) {}

  async processMarkingCodes(): Promise<void> {
    console.log('🔢 Автоматическая обработка кодов маркировки');

    // 1. Получаем отправления, ожидающие коды
    const pendingPostings = await this.api.fbsRfbsMarks.getPostingList({
      status: 'awaiting_codes',
      limit: 100
    });

    if (!pendingPostings.postings || pendingPostings.postings.length === 0) {
      console.log('✅ Нет отправлений, ожидающих коды маркировки');
      return;
    }

    console.log(`📦 Найдено ${pendingPostings.total} отправлений, требующих коды`);

    // 2. Обрабатываем каждое отправление
    for (const posting of pendingPostings.postings) {
      await this.processPostingCodes(posting);
      
      // Пауза между отправлениями
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('🎉 Обработка кодов маркировки завершена');
  }

  private async processPostingCodes(posting: any): Promise<void> {
    console.log(`\n📋 Обработка отправления: ${posting.posting_number}`);

    try {
      // 1. Получаем детальную информацию о требованиях к кодам
      const codesInfo = await this.api.fbsRfbsMarks.getPostingCodesInfo({
        posting_number: posting.posting_number
      });

      if (!codesInfo.marking_required) {
        console.log('ℹ️ Маркировка не требуется');
        return;
      }

      console.log(`🏷️ Требуется кодов: ${codesInfo.total_codes_required || 'неизвестно'}`);

      // 2. Получаем коды из внешней системы (например, "Честный ЗНАК")
      const markingCodes = await this.getMarkingCodesFromExternalSystem(codesInfo.products);

      if (markingCodes.length === 0) {
        console.log('⚠️ Не удалось получить коды маркировки');
        return;
      }

      // 3. Загружаем коды
      const uploadResult = await this.api.fbsRfbsMarks.uploadPostingCodes({
        posting_number: posting.posting_number,
        codes: markingCodes
      });

      console.log(`📤 Коды загружены, задача: ${uploadResult.task_id}`);

      // 4. Ждем результатов загрузки
      const uploadStatus = await this.waitForUploadCompletion(uploadResult.task_id!);

      // 5. Анализируем результаты загрузки
      if (uploadStatus.upload_result?.valid_codes > 0) {
        console.log(`✅ Валидных кодов: ${uploadStatus.upload_result.valid_codes}`);
        
        if (uploadStatus.upload_result.invalid_codes > 0) {
          console.log(`⚠️ Невалидных кодов: ${uploadStatus.upload_result.invalid_codes}`);
          this.logInvalidCodes(uploadStatus.upload_result.invalid_codes_details);
        }

        // 6. Запускаем валидацию загруженных кодов
        await this.validatePostingCodes(posting.posting_number);
      } else {
        console.log('❌ Все коды невалидны');
        this.logInvalidCodes(uploadStatus.upload_result?.invalid_codes_details);
      }

    } catch (error) {
      console.error(`❌ Ошибка обработки ${posting.posting_number}:`, error.message);
    }
  }

  private async validatePostingCodes(postingNumber: string): Promise<void> {
    console.log('🔍 Запуск валидации кодов');

    try {
      const validationResult = await this.api.fbsRfbsMarks.validatePostingCodes({
        posting_number: postingNumber
      });

      const validationStatus = await this.waitForValidationCompletion(validationResult.task_id!);

      if (validationStatus.validation_result?.all_valid) {
        console.log('✅ Все коды прошли валидацию');
      } else {
        const validPercentage = validationStatus.validation_result?.valid_percentage || 0;
        console.log(`⚠️ Валидность кодов: ${validPercentage}%`);
        
        if (validPercentage < 100) {
          this.logValidationIssues(validationStatus.validation_result?.issues);
        }
      }
    } catch (error) {
      console.error('❌ Ошибка валидации кодов:', error.message);
    }
  }

  private async getMarkingCodesFromExternalSystem(products: any[]): Promise<any[]> {
    // Эмуляция получения кодов из системы "Честный ЗНАК"
    const codes = [];
    
    for (const product of products || []) {
      for (let i = 0; i < (product.required_codes_count || 1); i++) {
        codes.push({
          sku: product.sku,
          gtd: this.generateMockDataMatrixCode(),
          quantity: 1
        });
      }
    }
    
    return codes;
  }

  private generateMockDataMatrixCode(): string {
    // Генерация mock кода DataMatrix для демонстрации
    const prefix = '01'; // GTIN prefix
    const gtin = '12345678901234'; // 14-digit GTIN
    const serialPrefix = '21'; // Serial number prefix
    const serial = Math.random().toString(36).substring(2, 15).toUpperCase();
    
    return `${prefix}${gtin}${serialPrefix}${serial}`;
  }

  private async waitForUploadCompletion(taskId: string): Promise<any> {
    const maxAttempts = 20;
    const delay = 1500;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const status = await this.api.fbsRfbsMarks.getPostingCodesUploadStatus({ task_id: taskId });
      
      if (status.status === 'completed') {
        return status;
      } else if (status.status === 'error') {
        throw new Error(status.error_message || 'Ошибка загрузки кодов');
      }
      
      console.log(`⏳ Загрузка кодов... (${attempt + 1}/${maxAttempts})`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    
    throw new Error('Превышено время ожидания загрузки кодов');
  }

  private async waitForValidationCompletion(taskId: string): Promise<any> {
    const maxAttempts = 15;
    const delay = 2000;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const status = await this.api.fbsRfbsMarks.getPostingCodesValidateStatus({ task_id: taskId });
      
      if (status.status === 'completed') {
        return status;
      } else if (status.status === 'error') {
        throw new Error(status.error_message || 'Ошибка валидации кодов');
      }
      
      console.log(`⏳ Валидация кодов... (${attempt + 1}/${maxAttempts})`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    
    throw new Error('Превышено время ожидания валидации кодов');
  }

  private logInvalidCodes(invalidCodesDetails: any[]): void {
    if (!invalidCodesDetails || invalidCodesDetails.length === 0) return;
    
    console.log('❌ Детали невалидных кодов:');
    invalidCodesDetails.forEach((detail, index) => {
      console.log(`  ${index + 1}. SKU ${detail.sku}: ${detail.error_message}`);
      console.log(`     Код: ${detail.code}`);
    });
  }

  private logValidationIssues(issues: any[]): void {
    if (!issues || issues.length === 0) return;
    
    console.log('⚠️ Проблемы валидации:');
    issues.forEach((issue, index) => {
      console.log(`  ${index + 1}. ${issue.type}: ${issue.description}`);
      if (issue.affected_codes) {
        console.log(`     Затронуто кодов: ${issue.affected_codes.length}`);
      }
    });
  }
}
```

#### Система мониторинга маркировки

```typescript
class MarkingMonitoringSystem {
  constructor(private api: OzonSellerAPI) {}

  async generateMarkingReport(dateFrom: string, dateTo: string): Promise<void> {
    console.log(`📊 Отчет по маркировке (${dateFrom} - ${dateTo})`);
    console.log('='.repeat(60));

    // 1. Общая статистика по отправлениям
    const allPostings = await this.api.fbsRfbsMarks.getPostingList({
      date_from: dateFrom,
      date_to: dateTo,
      limit: 1000
    });

    // 2. Группировка по статусам
    const statusStats = new Map();
    let totalCodesRequired = 0;
    let totalCodesUploaded = 0;

    for (const posting of allPostings.postings || []) {
      const status = posting.marking_status || 'unknown';
      statusStats.set(status, (statusStats.get(status) || 0) + 1);
      
      // Получаем детали для каждого отправления
      try {
        const codesInfo = await this.api.fbsRfbsMarks.getPostingCodesInfo({
          posting_number: posting.posting_number
        });
        
        totalCodesRequired += codesInfo.total_codes_required || 0;
        totalCodesUploaded += codesInfo.summary?.uploaded_codes || 0;
      } catch (error) {
        // Игнорируем ошибки для отдельных отправлений
      }
      
      // Пауза между запросами
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // 3. Вывод статистики
    console.log(`\n📦 Общая статистика:`);
    console.log(`Всего отправлений с маркировкой: ${allPostings.total}`);
    console.log(`Требуется кодов: ${totalCodesRequired}`);
    console.log(`Загружено кодов: ${totalCodesUploaded}`);
    
    if (totalCodesRequired > 0) {
      const completionRate = (totalCodesUploaded / totalCodesRequired * 100).toFixed(1);
      console.log(`Процент выполнения: ${completionRate}%`);
    }

    console.log(`\n📋 Распределение по статусам:`);
    Array.from(statusStats.entries()).forEach(([status, count]) => {
      const percentage = ((count / allPostings.total) * 100).toFixed(1);
      console.log(`  ${status}: ${count} (${percentage}%)`);
    });

    // 4. Проблемные отправления
    const awaitingPostings = allPostings.postings?.filter(p => 
      p.marking_status === 'awaiting_codes'
    ) || [];
    
    if (awaitingPostings.length > 0) {
      console.log(`\n⚠️ Отправления, ожидающие коды: ${awaitingPostings.length}`);
      
      // Группировка по срокам
      const urgentPostings = awaitingPostings.filter(p => {
        if (!p.deadline) return false;
        const deadline = new Date(p.deadline);
        const now = new Date();
        return deadline.getTime() - now.getTime() < 24 * 60 * 60 * 1000; // меньше 24 часов
      });
      
      if (urgentPostings.length > 0) {
        console.log(`🚨 Срочных (меньше 24ч): ${urgentPostings.length}`);
        urgentPostings.slice(0, 5).forEach(posting => {
          console.log(`  ${posting.posting_number} (дедлайн: ${posting.deadline})`);
        });
      }
    }

    // 5. Рекомендации
    this.generateRecommendations(statusStats, totalCodesRequired, totalCodesUploaded);
  }

  async monitorMarkingQuality(): Promise<void> {
    console.log('🔍 Мониторинг качества маркировки');

    // Получаем недавно валидированные отправления  
    const recentPostings = await this.api.fbsRfbsMarks.getPostingList({
      status: 'codes_uploaded',
      date_from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      limit: 50
    });

    let totalValidationScore = 0;
    let validatedCount = 0;
    const qualityIssues = [];

    for (const posting of recentPostings.postings || []) {
      try {
        const codesInfo = await this.api.fbsRfbsMarks.getPostingCodesInfo({
          posting_number: posting.posting_number
        });

        if (codesInfo.validation_result) {
          const validPercentage = codesInfo.validation_result.valid_percentage || 0;
          totalValidationScore += validPercentage;
          validatedCount++;

          if (validPercentage < 100) {
            qualityIssues.push({
              posting_number: posting.posting_number,
              valid_percentage: validPercentage,
              issues: codesInfo.validation_result.issues || []
            });
          }
        }
      } catch (error) {
        console.log(`Ошибка проверки ${posting.posting_number}:`, error.message);
      }
    }

    // Анализ качества
    if (validatedCount > 0) {
      const avgQuality = (totalValidationScore / validatedCount).toFixed(1);
      console.log(`📊 Средний процент валидности кодов: ${avgQuality}%`);
      
      if (qualityIssues.length > 0) {
        console.log(`\n⚠️ Отправления с проблемами качества: ${qualityIssues.length}`);
        
        // Группировка проблем по типам
        const issueTypes = new Map();
        qualityIssues.forEach(issue => {
          issue.issues.forEach(problemType => {
            const type = problemType.type || 'unknown';
            issueTypes.set(type, (issueTypes.get(type) || 0) + 1);
          });
        });

        console.log('\n📋 Типы проблем:');
        Array.from(issueTypes.entries()).forEach(([type, count]) => {
          console.log(`  ${type}: ${count} случаев`);
        });
      }
    }
  }

  private generateRecommendations(
    statusStats: Map<string, number>, 
    totalRequired: number, 
    totalUploaded: number
  ): void {
    console.log('\n💡 Рекомендации:');

    const completionRate = totalRequired > 0 ? (totalUploaded / totalRequired) : 0;
    const awaitingCount = statusStats.get('awaiting_codes') || 0;

    if (completionRate < 0.8) {
      console.log('📈 Низкий процент загрузки кодов - автоматизируйте процесс');
    }

    if (awaitingCount > 10) {
      console.log('⚠️ Много отправлений ожидает коды - проверьте интеграцию с "Честный ЗНАК"');
    }

    if (completionRate > 0.95) {
      console.log('✅ Отличная работа с маркировкой!');
    }

    console.log('🔄 Настройте автоматическое получение кодов из системы "Честный ЗНАК"');
    console.log('📱 Используйте уведомления для контроля дедлайнов');
    console.log('📊 Регулярно анализируйте качество загружаемых кодов');
  }
}
```

## Обработка ошибок

```typescript
try {
  await api.fbsRfbsMarks.uploadPostingCodes({
    posting_number: 'FBS-123456789',
    codes: [/* ... */]
  });
} catch (error) {
  if (error.response?.status === 400) {
    console.error('Ошибка валидации кодов:', error.response.data);
  } else if (error.response?.status === 404) {
    console.error('Отправление не найдено или не требует маркировки');
  } else if (error.response?.status === 409) {
    console.error('Коды уже загружены для этого отправления');
  } else {
    console.error('Неожиданная ошибка:', error.message);
  }
}
```

## Рекомендации по использованию

### 🎯 Подготовка образцов
- Используйте высококачественные PDF-файлы для образцов
- Убедитесь, что маркировка четко видна и читаема
- Валидируйте все загруженные образцы
- Регулярно обновляйте устаревшие образцы

### 🔢 Работа с кодами DataMatrix
- Получайте коды только из официальной системы "Честный ЗНАК"
- Проверяйте соответствие количества кодов товарам
- Загружайте коды заранее, не дожидаясь дедлайнов
- Всегда валидируйте коды после загрузки

### 📊 Мониторинг и контроль
- Отслеживайте дедлайны загрузки кодов
- Мониторьте процент валидности кодов
- Анализируйте причины невалидных кодов
- Настройте уведомления о проблемах

### 🚀 Автоматизация процессов
- Автоматизируйте получение кодов из "Честный ЗНАК"
- Настройте автоматическую загрузку для регулярных товаров
- Используйте batch-обработку для массовых операций
- Интегрируйте с системами управления складом

### 🔒 Соответствие требованиям
- Следуйте требованиям российского законодательства
- Поддерживайте актуальность форматов маркировки
- Ведите учет всех операций с кодами маркировки
- Обеспечивайте целостность данных маркировки

FBS & rFBS Marks API обеспечивает полное соответствие требованиям российского законодательства по маркировке товаров, автоматизируя процессы от загрузки образцов до валидации кодов DataMatrix.