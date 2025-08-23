# Certification API - Управление сертификатами и документами

Certification API предоставляет полный функционал для работы с сертификатами соответствия и другими документами, необходимыми для продажи товаров на OZON, включая создание, привязку к товарам и управление жизненным циклом сертификатов.

## Обзор API

**Количество методов:** 12  
**Основные функции:** Управление сертификатами, привязка к товарам, контроль соответствия  
**Ключевая особенность:** Автоматическая проверка соответствия товаров требованиям сертификации

⚠️ **Важно:** Метод `getProductCertificationList` (v1) устарел и будет отключён 14 апреля 2025 года. Используйте v2.

## Основные методы управления сертификатами

### 1. Получение списка сертификатов

**Метод:** `getCertificateList()`  
**Эндпоинт:** `POST /v1/product/certificate/list`

Возвращает список всех сертификатов продавца с возможностью фильтрации по статусу, типу и другим параметрам.

#### Параметры запроса

```typescript
interface CertificateListRequest {
  page: number;                    // Номер страницы
  page_size: number;              // Количество элементов на странице
  status?: 'ACTIVE' | 'EXPIRED' | 'PENDING' | 'REJECTED';
  type?: string;                  // Тип сертификата
  name?: string;                  // Поиск по названию
}
```

#### Пример использования

```typescript
import { OzonSellerApiClient } from '@spacechemical/ozon-seller-api';

const client = new OzonSellerApiClient({
  apiKey: 'your-api-key',
  clientId: 'your-client-id'
});

// Получить все активные сертификаты
const certificates = await client.certification.getCertificateList({
  page: 1,
  page_size: 100,
  status: 'ACTIVE'
});

console.log(`Найдено сертификатов: ${certificates.result?.total}`);
certificates.result?.certificates.forEach(cert => {
  console.log(`${cert.name} (${cert.status}) - истекает ${cert.expire_date}`);
  console.log(`  Тип: ${cert.type}, Номер: ${cert.number}`);
  console.log(`  Привязано товаров: ${cert.products_count || 0}`);
});

// Поиск сертификатов по названию
const searchResults = await client.certification.getCertificateList({
  page: 1,
  page_size: 50,
  name: 'ГОСТ'
});

console.log(`Найдено сертификатов с "ГОСТ": ${searchResults.result?.certificates.length || 0}`);
```

### 2. Создание нового сертификата

**Метод:** `createCertificate()`  
**Эндпоинт:** `POST /v1/product/certificate/create`

Создает новый сертификат с загрузкой файлов и указанием всех необходимых параметров.

#### Параметры запроса

```typescript
interface CertificateCreateRequest {
  name: string;                   // Название сертификата
  type: string;                   // Тип сертификата (из справочника)
  number: string;                 // Номер сертификата
  expire_date: string;            // Дата окончания действия (ISO 8601)
  file: string[];                 // Файлы в формате base64
  accordance_type_id?: number;    // ID типа соответствия
}
```

#### Пример использования

```typescript
// Создать новый сертификат соответствия
const newCert = await client.certification.createCertificate({
  name: 'Сертификат соответствия ГОСТ Р на электронику',
  type: 'GOST_CERTIFICATE',
  number: 'РОСС RU.АИ37.H00124',
  expire_date: '2025-12-31T23:59:59Z',
  file: [
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIwAAAABJRU5ErkJggg==', // base64 файл 1
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIwAAAABJRU5ErkJggg==' // base64 файл 2
  ],
  accordance_type_id: 1
});

console.log(`Создан сертификат с ID: ${newCert.certificate_id}`);

// Функция для конвертации файла в base64
const fileToBase64 = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      resolve(base64);
    };
    reader.onerror = error => reject(error);
  });
};

// Создание сертификата с загрузкой файлов
const createCertificateWithFiles = async (files: File[]) => {
  const base64Files = await Promise.all(
    files.map(file => fileToBase64(file))
  );
  
  return client.certification.createCertificate({
    name: 'Декларация соответствия ТР ТС',
    type: 'DECLARATION_OF_CONFORMITY',
    number: 'ЕАЭС N RU Д-RU.РА01.В.49567/20',
    expire_date: '2026-06-15T23:59:59Z',
    file: base64Files
  });
};
```

### 3. Привязка товаров к сертификату

**Метод:** `bindCertificate()`  
**Эндпоинт:** `POST /v1/product/certificate/bind`

Привязывает один или несколько товаров к существующему сертификату.

#### Параметры запроса

```typescript
interface CertificateBindRequest {
  certificate_id: number;         // ID сертификата
  product_id: string[];          // Массив ID товаров
}
```

#### Пример использования

```typescript
// Привязать товары к сертификату
const bindResult = await client.certification.bindCertificate({
  certificate_id: 12345,
  product_id: ['product-1', 'product-2', 'product-3']
});

// Обработать результаты привязки
let successCount = 0;
let errorCount = 0;

bindResult.result?.forEach(item => {
  if (item.status === 'success') {
    console.log(`✅ Товар ${item.product_id} успешно привязан к сертификату`);
    successCount++;
  } else {
    console.error(`❌ Ошибка привязки товара ${item.product_id}: ${item.error}`);
    errorCount++;
  }
});

console.log(`Итого: успешно привязано ${successCount}, ошибок ${errorCount}`);
```

### 4. Отвязка товаров от сертификата

**Метод:** `unbindCertificate()`  
**Эндпоинт:** `POST /v1/product/certificate/unbind`

Отвязывает товары от сертификата, например, при изменении требований или замене сертификата.

#### Пример использования

```typescript
// Отвязать товары от сертификата
const unbindResult = await client.certification.unbindCertificate({
  certificate_id: 12345,
  product_id: ['product-1', 'product-2']
});

unbindResult.result?.forEach(item => {
  if (item.status === 'success') {
    console.log(`✅ Товар ${item.product_id} успешно отвязан от сертификата`);
  } else {
    console.error(`❌ Ошибка отвязки товара ${item.product_id}: ${item.error}`);
  }
});
```

### 5. Удаление сертификатов

**Метод:** `deleteCertificates()`  
**Эндпоинт:** `POST /v1/product/certificate/delete`

Удаляет один или несколько сертификатов. Операция необратима.

#### Пример использования

```typescript
// Удалить сертификаты
const deleteResult = await client.certification.deleteCertificates({
  certificate_id: [12345, 12346, 12347]
});

deleteResult.result?.forEach(item => {
  if (item.status === 'success') {
    console.log(`✅ Сертификат ${item.certificate_id} успешно удален`);
  } else {
    console.error(`❌ Ошибка удаления сертификата ${item.certificate_id}: ${item.error}`);
  }
});
```

## Информационные методы

### 6. Получение товаров, привязанных к сертификату

**Метод:** `getCertificateProducts()`  
**Эндпоинт:** `POST /v1/product/certificate/info/from_list`

Возвращает список всех товаров, привязанных к конкретному сертификату.

#### Пример использования

```typescript
// Получить товары, привязанные к сертификату
const products = await client.certification.getCertificateProducts({
  certificate_id: 12345,
  page: 1,
  page_size: 50
});

console.log(`К сертификату привязано товаров: ${products.result?.total}`);
products.result?.products.forEach(product => {
  console.log(`${product.name} (Offer ID: ${product.offer_id})`);
  console.log(`  SKU: ${product.sku}, Статус: ${product.status}`);
  console.log(`  Категория: ${product.category_name}`);
});
```

### 7. Справочник типов сертификатов

**Метод:** `getCertificateTypes()`  
**Эндпоинт:** `GET /v1/product/certificate/types`

Возвращает все доступные типы сертификатов и документов.

#### Пример использования

```typescript
// Получить типы сертификатов
const types = await client.certification.getCertificateTypes();

console.log('Доступные типы сертификатов:');
types.result?.forEach(type => {
  console.log(`${type.code}: ${type.name}`);
  if (type.description) {
    console.log(`  Описание: ${type.description}`);
  }
  console.log(`  Обязательные поля: ${type.required_fields?.join(', ') || 'нет'}`);
});
```

### 8. Справочник статусов сертификатов

**Метод:** `getCertificateStatuses()`  
**Эндпоинт:** `POST /v1/product/certificate/status/list`

Возвращает все возможные статусы сертификатов.

#### Пример использования

```typescript
// Получить статусы сертификатов
const statuses = await client.certification.getCertificateStatuses();

console.log('Возможные статусы сертификатов:');
statuses.result?.forEach(status => {
  console.log(`${status.code}: ${status.name}`);
  if (status.description) {
    console.log(`  Описание: ${status.description}`);
  }
});
```

### 9. Причины отклонения сертификатов

**Метод:** `getRejectionReasons()`  
**Эндпоинт:** `POST /v1/product/certificate/rejection_reasons/list`

Возвращает справочник причин отклонения сертификатов.

#### Пример использования

```typescript
// Получить причины отклонения
const reasons = await client.certification.getRejectionReasons();

console.log('Возможные причины отклонения сертификатов:');
reasons.result?.forEach(reason => {
  console.log(`${reason.code}: ${reason.name}`);
  if (reason.description) {
    console.log(`  Описание: ${reason.description}`);
  }
});
```

## Методы работы с категориями сертификации

### 10. Типы соответствия требованиям (v2)

**Метод:** `getCertificateAccordanceTypes()`  
**Эндпоинт:** `GET /v2/product/certificate/accordance-types/list`

Возвращает актуальные типы соответствия требованиям для сертификации.

#### Пример использования

```typescript
// Получить типы соответствия
const accordanceTypes = await client.certification.getCertificateAccordanceTypes();

console.log('Доступные типы соответствия:');
accordanceTypes.result?.accordance_types.forEach(type => {
  console.log(`${type.code}: ${type.name} (ID: ${type.id})`);
  if (type.description) {
    console.log(`  Описание: ${type.description}`);
  }
});
```

### 11. Список сертифицируемых категорий (v2)

**Метод:** `getProductCertificationListV2()`  
**Эндпоинт:** `POST /v2/product/certification/list`

Возвращает список категорий товаров, которые требуют сертификацию.

#### Пример использования

```typescript
// Получить категории, требующие сертификацию
const certifications = await client.certification.getProductCertificationListV2({
  page: 1,
  page_size: 100
});

console.log(`Всего категорий, требующих сертификацию: ${certifications.total}`);
certifications.certification?.forEach(category => {
  if (category.has_certificate) {
    console.log(`${category.category_name} (ID: ${category.category_id})`);
    console.log(`  Требуется сертификат типа: ${category.certificate_type}`);
    console.log(`  Тип соответствия: ${category.accordance_type}`);
  }
});
```

### 12. Список сертифицируемых категорий (v1) - DEPRECATED

**Метод:** `getProductCertificationList()`  
⚠️ **Устарел:** Будет отключён 14 апреля 2025 года. Используйте v2.

## Практические сценарии использования

### 1. Система управления жизненным циклом сертификатов

```typescript
class CertificationManager {
  constructor(private client: OzonSellerApiClient) {}

  // Проверить истекающие сертификаты
  async checkExpiringCertificates(daysBeforeExpiry: number = 30): Promise<Certificate[]> {
    const certificates = await this.client.certification.getCertificateList({
      page: 1,
      page_size: 1000,
      status: 'ACTIVE'
    });

    const expiringCerts: Certificate[] = [];
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() + daysBeforeExpiry);

    certificates.result?.certificates.forEach(cert => {
      if (cert.expire_date) {
        const expireDate = new Date(cert.expire_date);
        if (expireDate <= cutoffDate) {
          expiringCerts.push(cert);
        }
      }
    });

    return expiringCerts;
  }

  // Автоматическое продление сертификатов
  async renewCertificate(oldCertificateId: number, newCertificateData: CertificateCreateRequest) {
    console.log(`Начинаем процесс продления сертификата ${oldCertificateId}`);

    // 1. Получить товары, привязанные к старому сертификату
    const products = await this.client.certification.getCertificateProducts({
      certificate_id: oldCertificateId,
      page: 1,
      page_size: 1000
    });

    const productIds = products.result?.products.map(p => p.offer_id || p.product_id).filter(Boolean) || [];
    console.log(`Найдено привязанных товаров: ${productIds.length}`);

    // 2. Создать новый сертификат
    const newCert = await this.client.certification.createCertificate(newCertificateData);
    console.log(`Создан новый сертификат с ID: ${newCert.certificate_id}`);

    // 3. Привязать товары к новому сертификату
    if (productIds.length > 0) {
      const bindResult = await this.client.certification.bindCertificate({
        certificate_id: newCert.certificate_id!,
        product_id: productIds
      });

      const successfulBinds = bindResult.result?.filter(r => r.status === 'success').length || 0;
      console.log(`Успешно привязано к новому сертификату: ${successfulBinds} товаров`);
    }

    // 4. Удалить старый сертификат (опционально)
    // await this.client.certification.deleteCertificates({
    //   certificate_id: [oldCertificateId]
    // });

    return {
      oldCertificateId,
      newCertificateId: newCert.certificate_id,
      transferredProductsCount: productIds.length
    };
  }

  // Массовая привязка товаров по категориям
  async bindProductsByCategory(certificateId: number, categoryIds: number[]) {
    // Здесь должна быть логика получения товаров по категориям
    // В реальном приложении это может быть отдельный API или база данных
    console.log(`Привязка товаров из категорий ${categoryIds.join(', ')} к сертификату ${certificateId}`);
    
    // Пример реализации
    const allProductIds: string[] = [];
    
    // В реальном приложении здесь был бы цикл по категориям
    // и получение товаров через Product API
    
    if (allProductIds.length > 0) {
      const bindResult = await this.client.certification.bindCertificate({
        certificate_id: certificateId,
        product_id: allProductIds
      });
      
      return bindResult;
    }
    
    return null;
  }

  // Аудит соответствия сертификации
  async auditCertificationCompliance() {
    const report = {
      totalCertificates: 0,
      activeCertificates: 0,
      expiredCertificates: 0,
      expiringCertificates: 0,
      certificatesWithoutProducts: 0,
      productsWithoutCertificates: 0
    };

    // Получить все сертификаты
    const allCertificates = await this.client.certification.getCertificateList({
      page: 1,
      page_size: 1000
    });

    report.totalCertificates = allCertificates.result?.total || 0;

    for (const cert of allCertificates.result?.certificates || []) {
      // Подсчет по статусам
      switch (cert.status) {
        case 'ACTIVE':
          report.activeCertificates++;
          break;
        case 'EXPIRED':
          report.expiredCertificates++;
          break;
      }

      // Проверка истекающих
      if (cert.expire_date) {
        const expireDate = new Date(cert.expire_date);
        const thirtyDaysFromNow = new Date();
        thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
        
        if (expireDate <= thirtyDaysFromNow && cert.status === 'ACTIVE') {
          report.expiringCertificates++;
        }
      }

      // Проверка привязанных товаров
      const products = await this.client.certification.getCertificateProducts({
        certificate_id: cert.id!,
        page: 1,
        page_size: 1
      });

      if ((products.result?.total || 0) === 0) {
        report.certificatesWithoutProducts++;
      }
    }

    return report;
  }
}

const certManager = new CertificationManager(client);

// Проверить истекающие сертификаты
const expiringCerts = await certManager.checkExpiringCertificates(30);
console.log(`Сертификатов истекает в ближайшие 30 дней: ${expiringCerts.length}`);

// Провести аудит соответствия
const auditReport = await certManager.auditCertificationCompliance();
console.log('Отчет по сертификации:', auditReport);
```

### 2. Автоматизация создания сертификатов

```typescript
class AutoCertificationSystem {
  constructor(private client: OzonSellerApiClient) {}

  async createCertificateFromTemplate(template: CertificationTemplate, files: File[]) {
    try {
      // Конвертировать файлы в base64
      const base64Files = await this.convertFilesToBase64(files);
      
      // Создать сертификат
      const newCert = await this.client.certification.createCertificate({
        name: template.name,
        type: template.type,
        number: template.number,
        expire_date: template.expireDate,
        file: base64Files,
        accordance_type_id: template.accordanceTypeId
      });

      console.log(`✅ Сертификат создан: ${newCert.certificate_id}`);
      
      // Автоматически привязать товары, если указаны
      if (template.productIds && template.productIds.length > 0) {
        await this.bindProductsToCertificate(newCert.certificate_id!, template.productIds);
      }

      return newCert;
      
    } catch (error) {
      console.error('❌ Ошибка создания сертификата:', error);
      throw error;
    }
  }

  private async convertFilesToBase64(files: File[]): Promise<string[]> {
    return Promise.all(files.map(file => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = (reader.result as string).split(',')[1];
          resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }));
  }

  private async bindProductsToCertificate(certificateId: number, productIds: string[]) {
    const BATCH_SIZE = 100; // Привязываем по 100 товаров за раз
    
    for (let i = 0; i < productIds.length; i += BATCH_SIZE) {
      const batch = productIds.slice(i, i + BATCH_SIZE);
      
      try {
        const result = await this.client.certification.bindCertificate({
          certificate_id: certificateId,
          product_id: batch
        });
        
        const successCount = result.result?.filter(r => r.status === 'success').length || 0;
        console.log(`Привязано товаров в батче ${Math.floor(i/BATCH_SIZE) + 1}: ${successCount}/${batch.length}`);
        
      } catch (error) {
        console.error(`Ошибка привязки батча ${Math.floor(i/BATCH_SIZE) + 1}:`, error);
      }
    }
  }

  // Создание сертификата на основе шаблона
  async createFromGovernmentTemplate(
    governmentCertData: GovernmentCertificateData,
    files: File[]
  ) {
    const template: CertificationTemplate = {
      name: `${governmentCertData.type} ${governmentCertData.productType}`,
      type: this.mapGovernmentTypeToOzon(governmentCertData.type),
      number: governmentCertData.registrationNumber,
      expireDate: governmentCertData.validUntil,
      accordanceTypeId: governmentCertData.accordanceTypeId,
      productIds: governmentCertData.applicableProducts
    };

    return this.createCertificateFromTemplate(template, files);
  }

  private mapGovernmentTypeToOzon(govType: string): string {
    const mapping: Record<string, string> = {
      'Сертификат соответствия ГОСТ Р': 'GOST_CERTIFICATE',
      'Декларация соответствия ТР ТС': 'DECLARATION_OF_CONFORMITY',
      'Сертификат пожарной безопасности': 'FIRE_SAFETY_CERTIFICATE',
      'Санитарно-эпидемиологическое заключение': 'SANITARY_CERTIFICATE'
    };
    
    return mapping[govType] || 'OTHER';
  }
}

interface CertificationTemplate {
  name: string;
  type: string;
  number: string;
  expireDate: string;
  accordanceTypeId?: number;
  productIds?: string[];
}

interface GovernmentCertificateData {
  type: string;
  productType: string;
  registrationNumber: string;
  validUntil: string;
  accordanceTypeId?: number;
  applicableProducts?: string[];
}
```

### 3. Система мониторинга и уведомлений

```typescript
class CertificationMonitor {
  constructor(private client: OzonSellerApiClient) {}

  async setupMonitoring() {
    // Проверяем каждый день
    setInterval(async () => {
      await this.dailyCheck();
    }, 24 * 60 * 60 * 1000); // 24 часа

    // Немедленная проверка при запуске
    await this.dailyCheck();
  }

  private async dailyCheck() {
    console.log('🔍 Запуск ежедневной проверки сертификатов...');
    
    const alerts: CertificationAlert[] = [];
    
    // Проверка истекающих сертификатов
    const expiringAlerts = await this.checkExpiringCertificates();
    alerts.push(...expiringAlerts);
    
    // Проверка отклоненных сертификатов
    const rejectedAlerts = await this.checkRejectedCertificates();
    alerts.push(...rejectedAlerts);
    
    // Проверка сертификатов без товаров
    const unusedAlerts = await this.checkUnusedCertificates();
    alerts.push(...unusedAlerts);
    
    if (alerts.length > 0) {
      await this.sendAlerts(alerts);
    } else {
      console.log('✅ Все сертификаты в порядке');
    }
  }

  private async checkExpiringCertificates(): Promise<CertificationAlert[]> {
    const alerts: CertificationAlert[] = [];
    const certificates = await this.client.certification.getCertificateList({
      page: 1,
      page_size: 1000,
      status: 'ACTIVE'
    });

    const now = new Date();
    const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    for (const cert of certificates.result?.certificates || []) {
      if (cert.expire_date) {
        const expireDate = new Date(cert.expire_date);
        
        if (expireDate <= sevenDaysFromNow) {
          alerts.push({
            type: 'CRITICAL_EXPIRY',
            certificateId: cert.id!,
            certificateName: cert.name!,
            message: `Сертификат "${cert.name}" истекает через ${Math.ceil((expireDate.getTime() - now.getTime()) / (24 * 60 * 60 * 1000))} дней`,
            severity: 'critical'
          });
        } else if (expireDate <= thirtyDaysFromNow) {
          alerts.push({
            type: 'WARNING_EXPIRY',
            certificateId: cert.id!,
            certificateName: cert.name!,
            message: `Сертификат "${cert.name}" истекает через ${Math.ceil((expireDate.getTime() - now.getTime()) / (24 * 60 * 60 * 1000))} дней`,
            severity: 'warning'
          });
        }
      }
    }

    return alerts;
  }

  private async checkRejectedCertificates(): Promise<CertificationAlert[]> {
    const alerts: CertificationAlert[] = [];
    const certificates = await this.client.certification.getCertificateList({
      page: 1,
      page_size: 1000,
      status: 'REJECTED'
    });

    for (const cert of certificates.result?.certificates || []) {
      alerts.push({
        type: 'REJECTED_CERTIFICATE',
        certificateId: cert.id!,
        certificateName: cert.name!,
        message: `Сертификат "${cert.name}" был отклонен. Причина: ${cert.rejection_reason || 'не указана'}`,
        severity: 'error'
      });
    }

    return alerts;
  }

  private async checkUnusedCertificates(): Promise<CertificationAlert[]> {
    const alerts: CertificationAlert[] = [];
    const certificates = await this.client.certification.getCertificateList({
      page: 1,
      page_size: 1000,
      status: 'ACTIVE'
    });

    for (const cert of certificates.result?.certificates || []) {
      const products = await this.client.certification.getCertificateProducts({
        certificate_id: cert.id!,
        page: 1,
        page_size: 1
      });

      if ((products.result?.total || 0) === 0) {
        alerts.push({
          type: 'UNUSED_CERTIFICATE',
          certificateId: cert.id!,
          certificateName: cert.name!,
          message: `К сертификату "${cert.name}" не привязано ни одного товара`,
          severity: 'info'
        });
      }
    }

    return alerts;
  }

  private async sendAlerts(alerts: CertificationAlert[]) {
    console.log(`🚨 Найдено ${alerts.length} предупреждений:`);
    
    const critical = alerts.filter(a => a.severity === 'critical');
    const errors = alerts.filter(a => a.severity === 'error');
    const warnings = alerts.filter(a => a.severity === 'warning');
    const info = alerts.filter(a => a.severity === 'info');

    if (critical.length > 0) {
      console.log('\n🔴 КРИТИЧЕСКИЕ:');
      critical.forEach(alert => console.log(`  - ${alert.message}`));
    }

    if (errors.length > 0) {
      console.log('\n🟠 ОШИБКИ:');
      errors.forEach(alert => console.log(`  - ${alert.message}`));
    }

    if (warnings.length > 0) {
      console.log('\n🟡 ПРЕДУПРЕЖДЕНИЯ:');
      warnings.forEach(alert => console.log(`  - ${alert.message}`));
    }

    if (info.length > 0) {
      console.log('\n🔵 ИНФОРМАЦИЯ:');
      info.forEach(alert => console.log(`  - ${alert.message}`));
    }

    // Здесь можно добавить отправку уведомлений через email, Slack, etc.
  }
}

interface CertificationAlert {
  type: string;
  certificateId: number;
  certificateName: string;
  message: string;
  severity: 'critical' | 'error' | 'warning' | 'info';
}

const monitor = new CertificationMonitor(client);
await monitor.setupMonitoring();
```

## Обработка ошибок

### Типичные ошибки и их обработка

```typescript
try {
  const result = await client.certification.createCertificate({
    name: 'Тестовый сертификат',
    type: 'GOST_CERTIFICATE',
    number: 'TEST-001',
    expire_date: '2025-12-31T23:59:59Z',
    file: ['invalid_base64']
  });
} catch (error) {
  if (error.response?.status === 400) {
    const errorData = error.response.data;
    
    switch (errorData.code) {
      case 'INVALID_FILE_FORMAT':
        console.error('Неверный формат файла. Загружайте только JPG, PNG или PDF');
        break;
      case 'FILE_TOO_LARGE':
        console.error('Размер файла превышает допустимый лимит (10 МБ)');
        break;
      case 'CERTIFICATE_NUMBER_EXISTS':
        console.error('Сертификат с таким номером уже существует');
        break;
      case 'INVALID_EXPIRE_DATE':
        console.error('Некорректная дата окончания действия');
        break;
      case 'INVALID_CERTIFICATE_TYPE':
        console.error('Неверный тип сертификата');
        break;
      default:
        console.error('Неизвестная ошибка:', errorData.message);
    }
  } else if (error.response?.status === 413) {
    console.error('Размер загружаемых файлов слишком велик');
  } else if (error.response?.status === 429) {
    console.error('Превышен лимит запросов. Повторите попытку позже.');
  } else {
    console.error('Произошла ошибка:', error.message);
  }
}
```

## Лучшие практики

### 1. Управление файлами сертификатов

```typescript
class CertificateFileManager {
  private readonly MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 МБ
  private readonly ALLOWED_FORMATS = ['image/jpeg', 'image/png', 'application/pdf'];

  validateFile(file: File): { valid: boolean; error?: string } {
    if (file.size > this.MAX_FILE_SIZE) {
      return { valid: false, error: 'Размер файла превышает 10 МБ' };
    }

    if (!this.ALLOWED_FORMATS.includes(file.type)) {
      return { valid: false, error: 'Поддерживаются только JPG, PNG и PDF файлы' };
    }

    return { valid: true };
  }

  async compressImage(file: File, quality: number = 0.8): Promise<File> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob((blob) => {
          resolve(new File([blob!], file.name, { type: file.type }));
        }, file.type, quality);
      };
      
      img.src = URL.createObjectURL(file);
    });
  }
}
```

### 2. Пакетная обработка операций

```typescript
// Пакетная привязка товаров
async function batchBindProducts(
  client: OzonSellerApiClient,
  certificateId: number,
  productIds: string[],
  batchSize: number = 100
) {
  const results = [];
  
  for (let i = 0; i < productIds.length; i += batchSize) {
    const batch = productIds.slice(i, i + batchSize);
    
    try {
      const result = await client.certification.bindCertificate({
        certificate_id: certificateId,
        product_id: batch
      });
      
      results.push(result);
      
      // Пауза между запросами для соблюдения лимитов
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error(`Ошибка в батче ${i / batchSize + 1}:`, error);
    }
  }
  
  return results;
}
```

### 3. Кэширование справочных данных

```typescript
class CertificationDictionaries {
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private cacheTimeout = 24 * 60 * 60 * 1000; // 24 часа

  async getCertificateTypes(client: OzonSellerApiClient, useCache = true) {
    const cacheKey = 'certificate-types';
    
    if (useCache && this.isCacheValid(cacheKey)) {
      return this.cache.get(cacheKey)!.data;
    }

    const data = await client.certification.getCertificateTypes();
    this.cache.set(cacheKey, { data, timestamp: Date.now() });
    
    return data;
  }

  private isCacheValid(key: string): boolean {
    const cached = this.cache.get(key);
    return cached ? Date.now() - cached.timestamp < this.cacheTimeout : false;
  }
}
```

---

**Связанные API:** Product API (создание товаров), Brand API (сертификация брендов), Category API (требования по категориям)