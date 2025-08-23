# Supplier API

API для интеграции с поставщиками и управления счетами-фактурами.

## Обзор

Supplier API предоставляет инструменты для работы с поставщиками и документооборотом. API позволяет загружать файлы счетов-фактур, создавать и обновлять документы, а также получать информацию о статусе обработки документов.

**Ключевые возможности:**
- Загрузка файлов счетов-фактур в различных форматах
- Создание и обновление счетов-фактур
- Получение детальной информации о документах
- Управление статусами документов
- Интеграция с системой налогового учета

## Методы API

### uploadInvoiceFile()

Загрузить файл счета-фактуры в систему.

```typescript
import { OzonSellerAPI } from 'bmad-ozon-seller-api';

const api = new OzonSellerAPI({
  clientId: 'your-client-id',
  apiKey: 'your-api-key'
});

// Загрузка PDF файла счета-фактуры
const fileResult = await api.supplier.uploadInvoiceFile({
  file: 'JVBERi0xLjQKJcfsj6IKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwov...', // Base64 PDF
  file_name: 'invoice_2024_001.pdf',
  document_type: 'invoice'
});

console.log('Загружен файл с ID:', fileResult.file_id);
console.log('Статус загрузки:', fileResult.status);
console.log('URL файла:', fileResult.file_url);

// Загрузка изображения счета
const imageResult = await api.supplier.uploadInvoiceFile({
  file: '/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJ...', // Base64 JPEG
  file_name: 'invoice_scan_001.jpg',
  document_type: 'invoice'
});

// Функция для загрузки файла из файловой системы
async function uploadInvoiceFromFile(filePath: string, fileName: string) {
  const fs = require('fs');
  
  try {
    // Читаем файл и конвертируем в Base64
    const fileBuffer = fs.readFileSync(filePath);
    const base64File = fileBuffer.toString('base64');
    
    const result = await api.supplier.uploadInvoiceFile({
      file: base64File,
      file_name: fileName,
      document_type: 'invoice'
    });
    
    return result;
  } catch (error) {
    console.error('Ошибка при загрузке файла:', error);
    throw error;
  }
}

// Использование функции загрузки
const uploadResult = await uploadInvoiceFromFile('./invoices/invoice_001.pdf', 'invoice_001.pdf');
console.log('Файл загружен, ID:', uploadResult.file_id);
```

### createOrUpdateInvoice()

Создать новый или обновить существующий счет-фактуру.

```typescript
// Создание нового счета-фактуры
const newInvoice = await api.supplier.createOrUpdateInvoice({
  invoice_number: 'INV-2024-001',
  invoice_date: '2024-01-15',
  file_id: 'uploaded_file_id_123',
  supplier_info: {
    name: 'ООО "Поставщик"',
    inn: '7712345678',
    kpp: '771234567',
    address: 'г. Москва, ул. Примерная, д. 1'
  },
  buyer_info: {
    name: 'ООО "Покупатель"',
    inn: '9876543210',
    address: 'г. Санкт-Петербург, пр. Покупательский, д. 2'
  },
  total_amount: 118000.00,
  currency: 'RUB',
  vat_amount: 18000.00,
  vat_rate: 20,
  items: [
    {
      sku: 'PROD-001',
      name: 'Товар 1',
      quantity: 100,
      unit_price: 1000.00,
      total_price: 100000.00,
      vat_rate: 20,
      vat_amount: 15000.00
    }
  ],
  additional_info: {
    payment_terms: '30 дней',
    delivery_terms: 'EXW Москва',
    contract_number: 'CONTRACT-2024-001'
  }
});

console.log('Создан счет с ID:', newInvoice.invoice?.invoice_id);
console.log('Статус:', newInvoice.invoice?.status);

// Обновление существующего счета
const updatedInvoice = await api.supplier.createOrUpdateInvoice({
  invoice_id: 'existing_invoice_id_456',
  invoice_number: 'INV-2024-001-CORRECTED',
  total_amount: 120000.00,
  vat_amount: 18000.00,
  items: [
    {
      sku: 'PROD-001',
      name: 'Товар 1 (исправленный)',
      quantity: 100,
      unit_price: 1020.00,
      total_price: 102000.00,
      vat_rate: 20,
      vat_amount: 15300.00
    }
  ],
  correction_info: {
    original_invoice_number: 'INV-2024-001',
    correction_reason: 'Корректировка цены товара'
  }
});

console.log('Обновлен счет:', updatedInvoice.invoice?.invoice_number);
```

### getInvoice()

Получить информацию о счете-фактуре.

```typescript
// Получение информации о счете
const invoiceInfo = await api.supplier.getInvoice({
  invoice_id: 'invoice_123'
});

const invoice = invoiceInfo.invoice;
if (invoice) {
  console.log('Номер счета:', invoice.invoice_number);
  console.log('Дата:', invoice.invoice_date);
  console.log('Статус:', invoice.status);
  console.log('Общая сумма:', invoice.total_amount, invoice.currency);
  console.log('НДС:', invoice.vat_amount);
  
  // Информация о поставщике
  if (invoice.supplier_info) {
    console.log('Поставщик:', invoice.supplier_info.name);
    console.log('ИНН:', invoice.supplier_info.inn);
    console.log('КПП:', invoice.supplier_info.kpp);
  }
  
  // Информация о покупателе
  if (invoice.buyer_info) {
    console.log('Покупатель:', invoice.buyer_info.name);
    console.log('ИНН покупателя:', invoice.buyer_info.inn);
  }
  
  // Детали по товарам
  console.log('\nТовары:');
  invoice.items?.forEach((item, index) => {
    console.log(`${index + 1}. ${item.name} (${item.sku})`);
    console.log(`   Количество: ${item.quantity}`);
    console.log(`   Цена за единицу: ${item.unit_price} ${invoice.currency}`);
    console.log(`   Общая стоимость: ${item.total_price} ${invoice.currency}`);
    console.log(`   НДС: ${item.vat_rate}% (${item.vat_amount})`);
  });
  
  // Обработка различных статусов
  switch (invoice.status) {
    case 'pending':
      console.log('📝 Счет находится на рассмотрении');
      break;
    case 'approved':
      console.log('✅ Счет одобрен');
      break;
    case 'rejected':
      console.log('❌ Счет отклонен');
      if (invoice.rejection_reason) {
        console.log('Причина отклонения:', invoice.rejection_reason);
      }
      break;
    case 'processing':
      console.log('⏳ Счет обрабатывается');
      break;
    case 'paid':
      console.log('💰 Счет оплачен');
      break;
  }
  
  // Дополнительная информация
  if (invoice.additional_info) {
    console.log('\nДополнительная информация:');
    console.log('Условия оплаты:', invoice.additional_info.payment_terms);
    console.log('Условия поставки:', invoice.additional_info.delivery_terms);
    console.log('Номер договора:', invoice.additional_info.contract_number);
  }
  
  // История изменений
  if (invoice.history && invoice.history.length > 0) {
    console.log('\nИстория изменений:');
    invoice.history.forEach(historyItem => {
      console.log(`${historyItem.date}: ${historyItem.action} - ${historyItem.comment}`);
    });
  }
}
```

### deleteInvoice()

Удалить ссылку на счет-фактуру.

```typescript
// Удаление счета-фактуры
const deleteResult = await api.supplier.deleteInvoice({
  invoice_id: 'invoice_to_delete_123'
});

if (deleteResult.result === 'success') {
  console.log('✅ Счет успешно удален');
} else {
  console.log('❌ Ошибка при удалении:', deleteResult.message);
}

// Функция для безопасного удаления с подтверждением
async function safeDeleteInvoice(invoiceId: string): Promise<boolean> {
  try {
    // Сначала получаем информацию о счете
    const invoiceInfo = await api.supplier.getInvoice({ invoice_id: invoiceId });
    
    if (!invoiceInfo.invoice) {
      console.log('Счет не найден');
      return false;
    }
    
    console.log(`Удаление счета: ${invoiceInfo.invoice.invoice_number}`);
    console.log(`Сумма: ${invoiceInfo.invoice.total_amount} ${invoiceInfo.invoice.currency}`);
    console.log(`Статус: ${invoiceInfo.invoice.status}`);
    
    // Проверяем, можно ли удалить
    if (invoiceInfo.invoice.status === 'paid') {
      console.log('⚠️ Внимание: счет уже оплачен!');
      // В реальном приложении здесь может быть запрос подтверждения
    }
    
    // Выполняем удаление
    const result = await api.supplier.deleteInvoice({ invoice_id: invoiceId });
    
    return result.result === 'success';
  } catch (error) {
    console.error('Ошибка при удалении счета:', error);
    return false;
  }
}

// Использование безопасного удаления
const wasDeleted = await safeDeleteInvoice('invoice_123');
console.log('Результат удаления:', wasDeleted ? 'успешно' : 'неудачно');
```

## TypeScript Interfaces

### Request Types

```typescript
interface SupplierInvoiceFileUploadRequest {
  /** Файл в формате Base64 */
  file: string;
  
  /** Имя файла */
  file_name: string;
  
  /** Тип документа */
  document_type: 'invoice' | 'act' | 'contract' | 'other';
  
  /** Описание файла (опционально) */
  description?: string;
}

interface SupplierInvoiceCreateOrUpdateRequest {
  /** ID счета для обновления (опционально для создания) */
  invoice_id?: string;
  
  /** Номер счета-фактуры */
  invoice_number: string;
  
  /** Дата счета в формате YYYY-MM-DD */
  invoice_date: string;
  
  /** ID загруженного файла */
  file_id?: string;
  
  /** Информация о поставщике */
  supplier_info?: SupplierInfo;
  
  /** Информация о покупателе */
  buyer_info?: BuyerInfo;
  
  /** Общая сумма */
  total_amount: number;
  
  /** Валюта */
  currency: 'RUB' | 'USD' | 'EUR';
  
  /** Сумма НДС */
  vat_amount: number;
  
  /** Ставка НДС */
  vat_rate: number;
  
  /** Позиции счета */
  items: InvoiceItem[];
  
  /** Дополнительная информация */
  additional_info?: AdditionalInfo;
  
  /** Информация о корректировке */
  correction_info?: CorrectionInfo;
}

interface SupplierInfo {
  /** Наименование поставщика */
  name: string;
  
  /** ИНН */
  inn: string;
  
  /** КПП */
  kpp?: string;
  
  /** Адрес */
  address: string;
  
  /** Банковские реквизиты */
  bank_details?: BankDetails;
}

interface BuyerInfo {
  /** Наименование покупателя */
  name: string;
  
  /** ИНН */
  inn: string;
  
  /** КПП */
  kpp?: string;
  
  /** Адрес */
  address: string;
}

interface InvoiceItem {
  /** Артикул товара */
  sku: string;
  
  /** Наименование товара */
  name: string;
  
  /** Количество */
  quantity: number;
  
  /** Единица измерения */
  unit?: string;
  
  /** Цена за единицу */
  unit_price: number;
  
  /** Общая стоимость */
  total_price: number;
  
  /** Ставка НДС */
  vat_rate: number;
  
  /** Сумма НДС */
  vat_amount: number;
  
  /** Код товара */
  product_code?: string;
}

interface AdditionalInfo {
  /** Условия оплаты */
  payment_terms?: string;
  
  /** Условия поставки */
  delivery_terms?: string;
  
  /** Номер договора */
  contract_number?: string;
  
  /** Номер заказа */
  order_number?: string;
  
  /** Дополнительные примечания */
  notes?: string;
}

interface CorrectionInfo {
  /** Номер оригинального счета */
  original_invoice_number: string;
  
  /** Причина корректировки */
  correction_reason: string;
  
  /** Дата корректировки */
  correction_date?: string;
}

interface BankDetails {
  /** Наименование банка */
  bank_name: string;
  
  /** БИК */
  bik: string;
  
  /** Корреспондентский счет */
  correspondent_account: string;
  
  /** Расчетный счет */
  account_number: string;
}

interface SupplierInvoiceGetRequest {
  /** ID счета */
  invoice_id: string;
}

interface SupplierInvoiceDeleteRequest {
  /** ID счета для удаления */
  invoice_id: string;
  
  /** Причина удаления */
  deletion_reason?: string;
}
```

### Response Types

```typescript
interface SupplierInvoiceFileUploadResponse {
  /** ID загруженного файла */
  file_id: string;
  
  /** Статус загрузки */
  status: 'uploaded' | 'processing' | 'error';
  
  /** URL файла */
  file_url?: string;
  
  /** Размер файла в байтах */
  file_size?: number;
  
  /** MIME тип файла */
  mime_type?: string;
  
  /** Сообщение об ошибке (если есть) */
  error_message?: string;
}

interface SupplierInvoiceCreateOrUpdateResponse {
  /** Информация о счете */
  invoice?: InvoiceDetails;
  
  /** Результат операции */
  result: 'success' | 'error';
  
  /** Сообщение о результате */
  message?: string;
}

interface InvoiceDetails {
  /** ID счета */
  invoice_id: string;
  
  /** Номер счета */
  invoice_number: string;
  
  /** Дата счета */
  invoice_date: string;
  
  /** Статус счета */
  status: 'pending' | 'approved' | 'rejected' | 'processing' | 'paid';
  
  /** Причина отклонения (если отклонен) */
  rejection_reason?: string;
  
  /** Информация о поставщике */
  supplier_info?: SupplierInfo;
  
  /** Информация о покупателе */
  buyer_info?: BuyerInfo;
  
  /** Общая сумма */
  total_amount: number;
  
  /** Валюта */
  currency: string;
  
  /** Сумма НДС */
  vat_amount: number;
  
  /** Ставка НДС */
  vat_rate: number;
  
  /** Позиции счета */
  items?: InvoiceItem[];
  
  /** Дополнительная информация */
  additional_info?: AdditionalInfo;
  
  /** История изменений */
  history?: InvoiceHistoryItem[];
  
  /** Дата создания */
  created_at: string;
  
  /** Дата последнего обновления */
  updated_at: string;
}

interface InvoiceHistoryItem {
  /** Дата изменения */
  date: string;
  
  /** Тип действия */
  action: 'created' | 'updated' | 'approved' | 'rejected' | 'paid';
  
  /** Комментарий */
  comment?: string;
  
  /** Пользователь, внесший изменение */
  user?: string;
}

interface SupplierInvoiceGetResponse {
  /** Информация о счете */
  invoice?: InvoiceDetails;
}

interface SupplierInvoiceDeleteResponse {
  /** Результат операции */
  result: 'success' | 'error';
  
  /** Сообщение о результате */
  message?: string;
}
```

## Примеры использования

### Управление счетами-фактурами

```typescript
class InvoiceManager {
  constructor(private api: OzonSellerAPI) {}
  
  async createInvoiceFromOrder(orderData: OrderData): Promise<string | null> {
    try {
      // Шаг 1: Подготавливаем данные счета на основе заказа
      const invoiceData = this.prepareInvoiceData(orderData);
      
      // Шаг 2: Загружаем файл счета (если есть)
      let fileId: string | undefined;
      if (orderData.invoiceFilePath) {
        const uploadResult = await this.uploadInvoiceFile(orderData.invoiceFilePath);
        if (uploadResult.status === 'uploaded') {
          fileId = uploadResult.file_id;
        }
      }
      
      // Шаг 3: Создаем счет
      const createResult = await this.api.supplier.createOrUpdateInvoice({
        ...invoiceData,
        file_id: fileId
      });
      
      if (createResult.result === 'success' && createResult.invoice) {
        console.log(`Создан счет: ${createResult.invoice.invoice_number}`);
        return createResult.invoice.invoice_id;
      }
      
      return null;
    } catch (error) {
      console.error('Ошибка при создании счета:', error);
      return null;
    }
  }
  
  private prepareInvoiceData(orderData: OrderData): SupplierInvoiceCreateOrUpdateRequest {
    const invoiceNumber = `INV-${new Date().getFullYear()}-${orderData.orderNumber}`;
    
    // Рассчитываем НДС
    const vatRate = 20; // 20%
    const totalWithoutVat = orderData.items.reduce((sum, item) => 
      sum + (item.quantity * item.price), 0
    );
    const vatAmount = totalWithoutVat * (vatRate / 100);
    const totalAmount = totalWithoutVat + vatAmount;
    
    return {
      invoice_number: invoiceNumber,
      invoice_date: new Date().toISOString().split('T')[0],
      supplier_info: {
        name: 'ООО "Наша Компания"',
        inn: '7712345678',
        kpp: '771234567',
        address: 'г. Москва, ул. Поставщиков, д. 1',
        bank_details: {
          bank_name: 'Сбербанк России',
          bik: '044525225',
          correspondent_account: '30101810400000000225',
          account_number: '40702810400000012345'
        }
      },
      buyer_info: {
        name: orderData.buyerName,
        inn: orderData.buyerInn,
        address: orderData.buyerAddress
      },
      total_amount: totalAmount,
      currency: 'RUB',
      vat_amount: vatAmount,
      vat_rate: vatRate,
      items: orderData.items.map(item => ({
        sku: item.sku,
        name: item.name,
        quantity: item.quantity,
        unit: 'шт',
        unit_price: item.price,
        total_price: item.quantity * item.price,
        vat_rate: vatRate,
        vat_amount: (item.quantity * item.price) * (vatRate / 100)
      })),
      additional_info: {
        payment_terms: '14 дней',
        delivery_terms: 'EXW Москва',
        contract_number: orderData.contractNumber,
        order_number: orderData.orderNumber
      }
    };
  }
  
  private async uploadInvoiceFile(filePath: string): Promise<SupplierInvoiceFileUploadResponse> {
    const fs = require('fs');
    const path = require('path');
    
    const fileBuffer = fs.readFileSync(filePath);
    const base64File = fileBuffer.toString('base64');
    const fileName = path.basename(filePath);
    
    return this.api.supplier.uploadInvoiceFile({
      file: base64File,
      file_name: fileName,
      document_type: 'invoice'
    });
  }
  
  async getInvoiceStatus(invoiceId: string): Promise<string> {
    try {
      const result = await this.api.supplier.getInvoice({ invoice_id: invoiceId });
      return result.invoice?.status || 'unknown';
    } catch (error) {
      console.error('Ошибка при получении статуса:', error);
      return 'error';
    }
  }
  
  async processInvoiceApproval(invoiceId: string): Promise<void> {
    const invoice = await this.api.supplier.getInvoice({ invoice_id: invoiceId });
    
    if (!invoice.invoice) {
      throw new Error('Счет не найден');
    }
    
    switch (invoice.invoice.status) {
      case 'approved':
        console.log('✅ Счет одобрен и готов к оплате');
        await this.sendApprovalNotification(invoice.invoice);
        break;
        
      case 'rejected':
        console.log('❌ Счет отклонен:', invoice.invoice.rejection_reason);
        await this.handleRejection(invoice.invoice);
        break;
        
      case 'pending':
        console.log('⏳ Счет ожидает рассмотрения');
        break;
        
      case 'processing':
        console.log('🔄 Счет обрабатывается');
        break;
        
      case 'paid':
        console.log('💰 Счет оплачен');
        await this.handlePayment(invoice.invoice);
        break;
    }
  }
  
  private async sendApprovalNotification(invoice: InvoiceDetails): Promise<void> {
    // Отправка уведомления об одобрении
    console.log(`Отправка уведомления об одобрении счета ${invoice.invoice_number}`);
  }
  
  private async handleRejection(invoice: InvoiceDetails): Promise<void> {
    // Обработка отклонения счета
    console.log(`Обработка отклонения счета ${invoice.invoice_number}`);
    console.log(`Причина: ${invoice.rejection_reason}`);
    
    // Здесь можно добавить логику для исправления и повторной отправки
  }
  
  private async handlePayment(invoice: InvoiceDetails): Promise<void> {
    // Обработка оплаты
    console.log(`Обработка оплаты счета ${invoice.invoice_number}`);
    console.log(`Сумма: ${invoice.total_amount} ${invoice.currency}`);
  }
}

interface OrderData {
  orderNumber: string;
  contractNumber: string;
  buyerName: string;
  buyerInn: string;
  buyerAddress: string;
  items: OrderItem[];
  invoiceFilePath?: string;
}

interface OrderItem {
  sku: string;
  name: string;
  quantity: number;
  price: number;
}

// Использование менеджера счетов
const invoiceManager = new InvoiceManager(api);

// Пример создания счета из заказа
const orderData: OrderData = {
  orderNumber: 'ORD-2024-001',
  contractNumber: 'CONTRACT-2024-001',
  buyerName: 'ООО "Покупатель"',
  buyerInn: '9876543210',
  buyerAddress: 'г. СПб, ул. Покупательская, д. 1',
  items: [
    {
      sku: 'PROD-001',
      name: 'Товар 1',
      quantity: 10,
      price: 1000.00
    },
    {
      sku: 'PROD-002', 
      name: 'Товар 2',
      quantity: 5,
      price: 2000.00
    }
  ],
  invoiceFilePath: './documents/invoice_template.pdf'
};

const invoiceId = await invoiceManager.createInvoiceFromOrder(orderData);
if (invoiceId) {
  console.log('Счет создан с ID:', invoiceId);
  
  // Проверяем статус через некоторое время
  setTimeout(async () => {
    await invoiceManager.processInvoiceApproval(invoiceId);
  }, 5000);
}
```

### Массовая обработка счетов

```typescript
class BulkInvoiceProcessor {
  constructor(private api: OzonSellerAPI) {}
  
  async processBulkInvoices(invoicesData: BulkInvoiceData[]): Promise<ProcessingResult[]> {
    const results: ProcessingResult[] = [];
    
    console.log(`Начинаем обработку ${invoicesData.length} счетов...`);
    
    for (const [index, invoiceData] of invoicesData.entries()) {
      console.log(`Обработка счета ${index + 1}/${invoicesData.length}: ${invoiceData.invoice_number}`);
      
      try {
        const result = await this.processInvoice(invoiceData);
        results.push(result);
        
        // Задержка для соблюдения лимитов API
        await this.delay(1000);
      } catch (error) {
        results.push({
          invoice_number: invoiceData.invoice_number,
          status: 'error',
          error: error.message
        });
        
        console.error(`Ошибка при обработке ${invoiceData.invoice_number}:`, error);
      }
    }
    
    this.generateProcessingReport(results);
    return results;
  }
  
  private async processInvoice(invoiceData: BulkInvoiceData): Promise<ProcessingResult> {
    // Загрузка файла (если есть)
    let fileId: string | undefined;
    if (invoiceData.file_path) {
      const uploadResult = await this.uploadFile(invoiceData.file_path, invoiceData.invoice_number);
      if (uploadResult.status === 'uploaded') {
        fileId = uploadResult.file_id;
      }
    }
    
    // Создание счета
    const createResult = await this.api.supplier.createOrUpdateInvoice({
      invoice_number: invoiceData.invoice_number,
      invoice_date: invoiceData.invoice_date,
      file_id: fileId,
      supplier_info: invoiceData.supplier_info,
      buyer_info: invoiceData.buyer_info,
      total_amount: invoiceData.total_amount,
      currency: invoiceData.currency,
      vat_amount: invoiceData.vat_amount,
      vat_rate: invoiceData.vat_rate,
      items: invoiceData.items
    });
    
    return {
      invoice_number: invoiceData.invoice_number,
      status: createResult.result === 'success' ? 'created' : 'error',
      invoice_id: createResult.invoice?.invoice_id,
      error: createResult.message
    };
  }
  
  private async uploadFile(filePath: string, invoiceNumber: string): Promise<SupplierInvoiceFileUploadResponse> {
    const fs = require('fs');
    const path = require('path');
    
    try {
      const fileBuffer = fs.readFileSync(filePath);
      const base64File = fileBuffer.toString('base64');
      const fileName = `${invoiceNumber}_${path.basename(filePath)}`;
      
      return await this.api.supplier.uploadInvoiceFile({
        file: base64File,
        file_name: fileName,
        document_type: 'invoice'
      });
    } catch (error) {
      throw new Error(`Не удалось загрузить файл ${filePath}: ${error.message}`);
    }
  }
  
  private generateProcessingReport(results: ProcessingResult[]): void {
    const successful = results.filter(r => r.status === 'created').length;
    const failed = results.filter(r => r.status === 'error').length;
    
    console.log('\n📊 ОТЧЕТ О МАССОВОЙ ОБРАБОТКЕ:');
    console.log(`Всего обработано: ${results.length}`);
    console.log(`Успешно создано: ${successful}`);
    console.log(`Ошибок: ${failed}`);
    
    if (failed > 0) {
      console.log('\n❌ НЕУДАЧНЫЕ ОПЕРАЦИИ:');
      results.filter(r => r.status === 'error').forEach(result => {
        console.log(`  - ${result.invoice_number}: ${result.error}`);
      });
    }
    
    if (successful > 0) {
      console.log('\n✅ УСПЕШНО СОЗДАННЫЕ СЧЕТА:');
      results.filter(r => r.status === 'created').forEach(result => {
        console.log(`  - ${result.invoice_number} (ID: ${result.invoice_id})`);
      });
    }
  }
  
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  async monitorInvoiceStatuses(invoiceIds: string[]): Promise<StatusReport[]> {
    const statusReports: StatusReport[] = [];
    
    console.log(`Проверка статусов ${invoiceIds.length} счетов...`);
    
    for (const invoiceId of invoiceIds) {
      try {
        const result = await this.api.supplier.getInvoice({ invoice_id: invoiceId });
        
        if (result.invoice) {
          statusReports.push({
            invoice_id: invoiceId,
            invoice_number: result.invoice.invoice_number,
            status: result.invoice.status,
            created_at: result.invoice.created_at,
            updated_at: result.invoice.updated_at
          });
        }
        
        await this.delay(500);
      } catch (error) {
        console.error(`Ошибка при получении статуса ${invoiceId}:`, error);
      }
    }
    
    this.generateStatusReport(statusReports);
    return statusReports;
  }
  
  private generateStatusReport(reports: StatusReport[]): void {
    const statusCounts = reports.reduce((acc, report) => {
      acc[report.status] = (acc[report.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    console.log('\n📈 ОТЧЕТ О СТАТУСАХ:');
    Object.entries(statusCounts).forEach(([status, count]) => {
      const emoji = {
        'pending': '⏳',
        'approved': '✅',
        'rejected': '❌',
        'processing': '🔄',
        'paid': '💰'
      }[status] || '❓';
      
      console.log(`${emoji} ${status}: ${count}`);
    });
  }
}

interface BulkInvoiceData {
  invoice_number: string;
  invoice_date: string;
  file_path?: string;
  supplier_info: SupplierInfo;
  buyer_info: BuyerInfo;
  total_amount: number;
  currency: 'RUB' | 'USD' | 'EUR';
  vat_amount: number;
  vat_rate: number;
  items: InvoiceItem[];
}

interface ProcessingResult {
  invoice_number: string;
  status: 'created' | 'error';
  invoice_id?: string;
  error?: string;
}

interface StatusReport {
  invoice_id: string;
  invoice_number: string;
  status: string;
  created_at: string;
  updated_at: string;
}

// Использование массовой обработки
const bulkProcessor = new BulkInvoiceProcessor(api);

// Пример массового создания счетов
const bulkData: BulkInvoiceData[] = [
  {
    invoice_number: 'BULK-001',
    invoice_date: '2024-01-15',
    file_path: './invoices/bulk_001.pdf',
    supplier_info: {
      name: 'ООО "Поставщик"',
      inn: '7712345678',
      address: 'г. Москва, ул. Поставщиков, д. 1'
    },
    buyer_info: {
      name: 'ООО "Покупатель"',
      inn: '9876543210',
      address: 'г. СПб, ул. Покупательская, д. 1'
    },
    total_amount: 118000,
    currency: 'RUB',
    vat_amount: 18000,
    vat_rate: 20,
    items: [
      {
        sku: 'BULK-PROD-001',
        name: 'Товар для массовой обработки',
        quantity: 100,
        unit_price: 1000,
        total_price: 100000,
        vat_rate: 20,
        vat_amount: 15000
      }
    ]
  }
  // ... другие счета
];

const processingResults = await bulkProcessor.processBulkInvoices(bulkData);

// Мониторинг созданных счетов
const createdInvoiceIds = processingResults
  .filter(r => r.status === 'created' && r.invoice_id)
  .map(r => r.invoice_id!);

if (createdInvoiceIds.length > 0) {
  setTimeout(async () => {
    await bulkProcessor.monitorInvoiceStatuses(createdInvoiceIds);
  }, 30000); // Проверяем через 30 секунд
}
```

## Комплексные сценарии

### Интегрированная система документооборота

```typescript
class DocumentManagementSystem {
  private api: OzonSellerAPI;
  private documentTemplates: Map<string, DocumentTemplate>;
  private auditLog: AuditEntry[];
  
  constructor(api: OzonSellerAPI) {
    this.api = api;
    this.documentTemplates = new Map();
    this.auditLog = [];
    this.initializeTemplates();
  }
  
  private initializeTemplates(): void {
    // Инициализация шаблонов документов
    this.documentTemplates.set('standard_invoice', {
      name: 'Стандартный счет-фактура',
      required_fields: ['supplier_info', 'buyer_info', 'items', 'total_amount'],
      vat_included: true,
      currency: 'RUB'
    });
    
    this.documentTemplates.set('export_invoice', {
      name: 'Экспортный счет-фактура',
      required_fields: ['supplier_info', 'buyer_info', 'items', 'total_amount'],
      vat_included: false,
      currency: 'USD'
    });
  }
  
  async processDocumentWorkflow(request: DocumentWorkflowRequest): Promise<WorkflowResult> {
    console.log(`🔄 Начало обработки документа: ${request.document_type}`);
    
    const result: WorkflowResult = {
      workflow_id: `WF-${Date.now()}`,
      status: 'started',
      steps: [],
      created_at: new Date().toISOString()
    };
    
    try {
      // Шаг 1: Валидация данных
      const validationResult = await this.validateDocumentData(request);
      result.steps.push({
        step: 'validation',
        status: validationResult.valid ? 'completed' : 'failed',
        message: validationResult.message,
        timestamp: new Date().toISOString()
      });
      
      if (!validationResult.valid) {
        result.status = 'failed';
        return result;
      }
      
      // Шаг 2: Генерация документа (если нужно)
      if (request.generate_file) {
        const generationResult = await this.generateDocument(request);
        result.steps.push({
          step: 'generation',
          status: generationResult.success ? 'completed' : 'failed',
          message: generationResult.message,
          timestamp: new Date().toISOString()
        });
        
        if (generationResult.success && generationResult.file_path) {
          request.file_path = generationResult.file_path;
        }
      }
      
      // Шаг 3: Загрузка файла
      if (request.file_path) {
        const uploadResult = await this.uploadDocumentFile(request.file_path, request);
        result.steps.push({
          step: 'upload',
          status: uploadResult.status === 'uploaded' ? 'completed' : 'failed',
          message: `File uploaded with ID: ${uploadResult.file_id}`,
          timestamp: new Date().toISOString()
        });
        
        request.file_id = uploadResult.file_id;
      }
      
      // Шаг 4: Создание записи в системе
      const createResult = await this.createDocumentRecord(request);
      result.steps.push({
        step: 'creation',
        status: createResult.result === 'success' ? 'completed' : 'failed',
        message: createResult.message || 'Document created successfully',
        timestamp: new Date().toISOString()
      });
      
      if (createResult.result === 'success') {
        result.document_id = createResult.invoice?.invoice_id;
        result.status = 'completed';
        
        // Шаг 5: Отправка уведомлений
        await this.sendNotifications(request, createResult.invoice!);
        result.steps.push({
          step: 'notification',
          status: 'completed',
          message: 'Notifications sent',
          timestamp: new Date().toISOString()
        });
      } else {
        result.status = 'failed';
      }
      
      // Логирование операции
      this.auditLog.push({
        workflow_id: result.workflow_id,
        action: 'document_workflow',
        user: request.user || 'system',
        timestamp: new Date().toISOString(),
        details: request
      });
      
    } catch (error) {
      console.error('Ошибка в workflow:', error);
      result.status = 'error';
      result.error = error.message;
    }
    
    console.log(`✅ Завершение обработки документа: ${result.status}`);
    return result;
  }
  
  private async validateDocumentData(request: DocumentWorkflowRequest): Promise<ValidationResult> {
    const template = this.documentTemplates.get(request.template_type);
    if (!template) {
      return {
        valid: false,
        message: `Unknown template type: ${request.template_type}`
      };
    }
    
    // Проверяем обязательные поля
    for (const field of template.required_fields) {
      if (!request.invoice_data[field]) {
        return {
          valid: false,
          message: `Missing required field: ${field}`
        };
      }
    }
    
    // Валидация НДС
    if (template.vat_included && !request.invoice_data.vat_amount) {
      return {
        valid: false,
        message: 'VAT amount is required for this template'
      };
    }
    
    // Валидация валюты
    if (template.currency && request.invoice_data.currency !== template.currency) {
      return {
        valid: false,
        message: `Currency must be ${template.currency} for this template`
      };
    }
    
    return {
      valid: true,
      message: 'Validation passed'
    };
  }
  
  private async generateDocument(request: DocumentWorkflowRequest): Promise<GenerationResult> {
    // Имитация генерации PDF документа
    console.log('📄 Генерация PDF документа...');
    
    try {
      // Здесь была бы реальная генерация PDF
      const fileName = `generated_${request.invoice_data.invoice_number}.pdf`;
      const filePath = `./temp/${fileName}`;
      
      // Симуляция создания файла
      const fs = require('fs');
      fs.writeFileSync(filePath, 'PDF content placeholder');
      
      return {
        success: true,
        file_path: filePath,
        message: 'Document generated successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: `Generation failed: ${error.message}`
      };
    }
  }
  
  private async uploadDocumentFile(filePath: string, request: DocumentWorkflowRequest): Promise<SupplierInvoiceFileUploadResponse> {
    const fs = require('fs');
    const path = require('path');
    
    const fileBuffer = fs.readFileSync(filePath);
    const base64File = fileBuffer.toString('base64');
    const fileName = path.basename(filePath);
    
    return this.api.supplier.uploadInvoiceFile({
      file: base64File,
      file_name: fileName,
      document_type: request.document_type,
      description: `Generated for workflow ${request.workflow_id || 'unknown'}`
    });
  }
  
  private async createDocumentRecord(request: DocumentWorkflowRequest): Promise<SupplierInvoiceCreateOrUpdateResponse> {
    return this.api.supplier.createOrUpdateInvoice({
      ...request.invoice_data,
      file_id: request.file_id
    });
  }
  
  private async sendNotifications(request: DocumentWorkflowRequest, invoice: InvoiceDetails): Promise<void> {
    console.log('📧 Отправка уведомлений...');
    
    const notifications = [
      {
        type: 'email',
        recipient: request.notification_email || 'default@company.com',
        subject: `Создан документ: ${invoice.invoice_number}`,
        body: `Счет-фактура ${invoice.invoice_number} успешно создан в системе.`
      },
      {
        type: 'webhook',
        url: request.webhook_url,
        data: {
          event: 'document_created',
          invoice_id: invoice.invoice_id,
          invoice_number: invoice.invoice_number
        }
      }
    ];
    
    for (const notification of notifications) {
      try {
        if (notification.type === 'webhook' && notification.url) {
          // Отправка webhook
          console.log(`Webhook sent to: ${notification.url}`);
        } else if (notification.type === 'email') {
          // Отправка email
          console.log(`Email sent to: ${notification.recipient}`);
        }
      } catch (error) {
        console.error(`Failed to send ${notification.type} notification:`, error);
      }
    }
  }
  
  async getWorkflowStatus(workflowId: string): Promise<WorkflowResult | null> {
    // В реальном приложении это был бы запрос к базе данных
    const auditEntry = this.auditLog.find(entry => entry.workflow_id === workflowId);
    if (!auditEntry) {
      return null;
    }
    
    // Возвращаем статус workflow
    return {
      workflow_id: workflowId,
      status: 'completed', // Получили бы из БД
      steps: [], // Получили бы из БД
      created_at: auditEntry.timestamp
    };
  }
  
  async generateReport(dateFrom: string, dateTo: string): Promise<ActivityReport> {
    const relevantEntries = this.auditLog.filter(entry => 
      entry.timestamp >= dateFrom && entry.timestamp <= dateTo
    );
    
    return {
      period: `${dateFrom} - ${dateTo}`,
      total_workflows: relevantEntries.length,
      successful_workflows: relevantEntries.filter(e => e.details.status === 'completed').length,
      failed_workflows: relevantEntries.filter(e => e.details.status === 'failed').length,
      document_types: this.getDocumentTypeStats(relevantEntries),
      timeline: this.getTimelineStats(relevantEntries)
    };
  }
  
  private getDocumentTypeStats(entries: AuditEntry[]): Record<string, number> {
    return entries.reduce((acc, entry) => {
      const docType = entry.details.document_type || 'unknown';
      acc[docType] = (acc[docType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }
  
  private getTimelineStats(entries: AuditEntry[]): TimelineEntry[] {
    // Группировка по дням
    const dailyStats = entries.reduce((acc, entry) => {
      const date = entry.timestamp.split('T')[0];
      if (!acc[date]) {
        acc[date] = { date, count: 0, successful: 0 };
      }
      acc[date].count++;
      if (entry.details.status === 'completed') {
        acc[date].successful++;
      }
      return acc;
    }, {} as Record<string, TimelineEntry>);
    
    return Object.values(dailyStats).sort((a, b) => a.date.localeCompare(b.date));
  }
}

// Интерфейсы для системы документооборота
interface DocumentWorkflowRequest {
  workflow_id?: string;
  document_type: 'invoice' | 'act' | 'contract';
  template_type: string;
  invoice_data: SupplierInvoiceCreateOrUpdateRequest;
  file_path?: string;
  file_id?: string;
  generate_file?: boolean;
  notification_email?: string;
  webhook_url?: string;
  user?: string;
}

interface DocumentTemplate {
  name: string;
  required_fields: string[];
  vat_included: boolean;
  currency: string;
}

interface ValidationResult {
  valid: boolean;
  message: string;
}

interface GenerationResult {
  success: boolean;
  file_path?: string;
  message: string;
}

interface WorkflowResult {
  workflow_id: string;
  status: 'started' | 'completed' | 'failed' | 'error';
  steps: WorkflowStep[];
  document_id?: string;
  error?: string;
  created_at: string;
}

interface WorkflowStep {
  step: string;
  status: 'completed' | 'failed' | 'skipped';
  message: string;
  timestamp: string;
}

interface AuditEntry {
  workflow_id: string;
  action: string;
  user: string;
  timestamp: string;
  details: any;
}

interface ActivityReport {
  period: string;
  total_workflows: number;
  successful_workflows: number;
  failed_workflows: number;
  document_types: Record<string, number>;
  timeline: TimelineEntry[];
}

interface TimelineEntry {
  date: string;
  count: number;
  successful: number;
}

// Использование системы документооборота
const docSystem = new DocumentManagementSystem(api);

// Пример обработки документа
const workflowRequest: DocumentWorkflowRequest = {
  document_type: 'invoice',
  template_type: 'standard_invoice',
  invoice_data: {
    invoice_number: 'WF-INV-001',
    invoice_date: '2024-01-15',
    supplier_info: {
      name: 'ООО "Автоматизация"',
      inn: '7712345678',
      address: 'г. Москва, ул. Технологическая, д. 1'
    },
    buyer_info: {
      name: 'ООО "Заказчик"',
      inn: '9876543210',
      address: 'г. СПб, ул. Заказная, д. 1'
    },
    total_amount: 118000,
    currency: 'RUB',
    vat_amount: 18000,
    vat_rate: 20,
    items: [
      {
        sku: 'AUTO-001',
        name: 'Автоматизированная система',
        quantity: 1,
        unit_price: 100000,
        total_price: 100000,
        vat_rate: 20,
        vat_amount: 15000
      }
    ]
  },
  generate_file: true,
  notification_email: 'notifications@company.com',
  user: 'system_user'
};

const workflowResult = await docSystem.processDocumentWorkflow(workflowRequest);

if (workflowResult.status === 'completed') {
  console.log('🎉 Документооборот завершен успешно!');
  console.log('ID документа:', workflowResult.document_id);
  
  // Генерация отчета
  const report = await docSystem.generateReport(
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    new Date().toISOString()
  );
  
  console.log('📊 Отчет за последние 30 дней:', report);
} else {
  console.log('❌ Ошибка в документообороте:', workflowResult.error);
}
```

## Обработка ошибок

```typescript
async function safeSupplierOperation() {
  try {
    const result = await api.supplier.createOrUpdateInvoice({
      invoice_number: 'SAFE-001',
      invoice_date: '2024-01-15',
      total_amount: 100000,
      currency: 'RUB',
      vat_amount: 15000,
      vat_rate: 20,
      items: []
    });
    
    return result;
    
  } catch (error) {
    if (error.code === 'INVALID_FILE_FORMAT') {
      console.error('Неподдерживаемый формат файла');
    } else if (error.code === 'FILE_TOO_LARGE') {
      console.error('Файл превышает максимально допустимый размер');
    } else if (error.code === 'INVOICE_NUMBER_EXISTS') {
      console.error('Счет с таким номером уже существует');
    } else if (error.code === 'INVALID_VAT_CALCULATION') {
      console.error('Ошибка в расчете НДС');
    } else if (error.code === 'UNAUTHORIZED') {
      console.error('Недостаточно прав для операции');
    } else {
      console.error('Неизвестная ошибка:', error);
    }
    
    return null;
  }
}

// Функция с повторными попытками
async function uploadFileWithRetry(fileData: any, maxRetries: number = 3): Promise<any> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await api.supplier.uploadInvoiceFile(fileData);
    } catch (error) {
      console.error(`Попытка ${attempt}/${maxRetries} не удалась:`, error.message);
      
      if (attempt === maxRetries) {
        throw new Error(`Не удалось загрузить файл после ${maxRetries} попыток`);
      }
      
      // Экспоненциальная задержка
      const delay = Math.pow(2, attempt) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}
```

## Лучшие практики

### 1. Валидация данных перед отправкой
```typescript
function validateInvoiceData(data: SupplierInvoiceCreateOrUpdateRequest): string[] {
  const errors: string[] = [];
  
  if (!data.invoice_number || data.invoice_number.trim() === '') {
    errors.push('Номер счета обязателен');
  }
  
  if (!data.total_amount || data.total_amount <= 0) {
    errors.push('Сумма должна быть положительной');
  }
  
  if (data.items && data.items.length === 0) {
    errors.push('Должна быть хотя бы одна позиция');
  }
  
  // Проверка НДС
  const calculatedVat = (data.total_amount - data.vat_amount) * (data.vat_rate / 100);
  if (Math.abs(calculatedVat - data.vat_amount) > 0.01) {
    errors.push('Неправильный расчет НДС');
  }
  
  return errors;
}
```

### 2. Оптимизация размера файлов
```typescript
function optimizeFileSize(base64File: string): string {
  // Проверка размера (максимум 10MB в base64)
  const maxSize = 10 * 1024 * 1024 * 4/3; // base64 увеличивает размер на 33%
  
  if (base64File.length > maxSize) {
    console.warn('Файл превышает рекомендуемый размер');
    // Здесь можно добавить сжатие или предупреждение
  }
  
  return base64File;
}
```

### 3. Кэширование результатов
```typescript
class InvoiceCache {
  private cache = new Map<string, any>();
  private readonly TTL = 5 * 60 * 1000; // 5 минут
  
  get(key: string): any {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() - item.timestamp > this.TTL) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data;
  }
  
  set(key: string, data: any): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }
}
```

## Интеграция с другими API

### Связь с Product API
```typescript
async function createInvoiceFromProducts(productIds: string[]) {
  // Получаем информацию о товарах
  // const products = await api.product.getInfo({ product_ids: productIds });
  
  // Создаем позиции счета на основе товаров
  const items: InvoiceItem[] = productIds.map(id => ({
    sku: `PROD-${id}`,
    name: `Товар ${id}`,
    quantity: 1,
    unit_price: 1000,
    total_price: 1000,
    vat_rate: 20,
    vat_amount: 150
  }));
  
  return api.supplier.createOrUpdateInvoice({
    invoice_number: `INV-PROD-${Date.now()}`,
    invoice_date: new Date().toISOString().split('T')[0],
    total_amount: items.reduce((sum, item) => sum + item.total_price, 0),
    currency: 'RUB',
    vat_amount: items.reduce((sum, item) => sum + item.vat_amount, 0),
    vat_rate: 20,
    items
  });
}
```

### Интеграция с финансовой отчетностью
```typescript
async function reconcileInvoicesWithPayments() {
  // Получаем оплаченные счета за период
  // const payments = await api.finance.getTransactionsList(...);
  
  console.log('Сверка счетов с платежами...');
  // Логика сверки документооборота с финансовыми операциями
}
```