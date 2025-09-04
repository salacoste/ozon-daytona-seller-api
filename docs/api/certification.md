# Certification API

Certification API implementation

## Overview

The CertificationApi class provides 15 methods for certification api implementation.

## Core Features

- **Core Operations** - 15 methods for comprehensive functionality
- **Type Safety** - Full TypeScript support with typed interfaces
- **Error Handling** - Robust error handling and validation
- **Documentation** - Detailed method documentation and examples

## Quick Start

```typescript
import { OzonSellerApiClient, createApiKey, createClientId } from '@ozon/seller-api';

const client = new OzonSellerApiClient({
  apiKey: createApiKey('your-api-key'),
  clientId: createClientId('your-client-id')
});

// Example usage
const result = await client.certification.getCertificateList(/* parameters */);
```

## Methods Reference

### `getCertificateList()`

Certification API implementation Generated from MCP documentation: certificationapi--chunk-001.md, certificationapi--chunk-002.md Handles product certification and document management / import { HttpClient } from '../../core/http.js'; import type { RequestOptions } from '../../core/types.js'; import type { CertificateListRequest, CertificateBindRequest, CertificateCreateRequest, CertificateDeleteRequest, CertificateInfoRequest, CertificateProductsListRequest, ProductStatusListRequest, CertificateRejectionReasonsListRequest, CertificateStatusListRequest, CertificateUnbindRequest, ProductCertificationListRequest, ProductCertificationListV2Request, } from '../../types/requests/certification.js'; import type { CertificateListResponse, CertificateBindResponse, CertificateCreateResponse, CertificateDeleteResponse, CertificateInfoResponse, CertificateProductsListResponse, ProductStatusListResponse, CertificateRejectionReasonsListResponse, CertificateStatusListResponse, ProductCertificateTypesResponse, CertificateUnbindResponse, ProductCertificationListResponse, CertificateAccordanceTypesResponse, CertificateAccordanceTypesV1Response, ProductCertificationListV2Response, } from '../../types/responses/certification.js'; /** Certification API для управления сертификатами и документами Certification API for certificate and document management ```typescript // Получить список сертификатов const certificates = await certificationApi.getCertificateList({ page: 1, page_size: 50 }); // Привязать товар к сертификату await certificationApi.bindCertificate({ certificate_id: 12345, product_id: ['product-1', 'product-2'] }); ``` / export class CertificationApi { constructor(private readonly httpClient: HttpClient) {} /** Получить список сертификатов Get certificate list Возвращает список сертификатов продавца с возможностью фильтрации по различным параметрам. ```typescript const certificates = await certificationApi.getCertificateList({ page: 1, page_size: 100, status: 'ACTIVE', type: 'CERTIFICATE' }); console.log(`Найдено сертификатов: ${certificates.result?.total}`); certificates.result?.certificates.forEach(cert => { console.log(`${cert.name} (${cert.status}) - истекает ${cert.expire_date}`); }); ```

**Example:**
```typescript
const result = await client.getCertificateList(/* parameters */);
console.log(result);
```

### `bindCertificate()`

Привязать товар к сертификату Bind product to certificate Привязывает один или несколько товаров к существующему сертификату. ```typescript const result = await certificationApi.bindCertificate({ certificate_id: 12345, product_id: ['product-1', 'product-2', 'product-3'] }); result.result?.forEach(item => { if (item.status === 'success') { console.log(`Товар ${item.product_id} успешно привязан`); } else { console.error(`Ошибка привязки ${item.product_id}: ${item.error}`); } }); ```

**Example:**
```typescript
const result = await client.bindCertificate(/* parameters */);
console.log(result);
```

### `createCertificate()`

Создать сертификат Create certificate Создает новый сертификат с указанными параметрами и файлами. ```typescript const newCert = await certificationApi.createCertificate({ name: 'Сертификат соответствия ГОСТ', type_code: 'GOST_CERTIFICATE', number: 'РОСС RU.АИ37.H00124', issue_date: '2025-08-21T00:00:00Z', files: ['base64_file_content_1', 'base64_file_content_2'] }); console.log(`Создан сертификат с ID: ${newCert.id}`); ```

**Example:**
```typescript
const result = await client.createCertificate(/* parameters */);
console.log(result);
```

### `deleteCertificates()`

Удалить сертификаты Delete certificates Удаляет один или несколько сертификатов по идентификаторам. ```typescript const result = await certificationApi.deleteCertificates({ certificate_id: [12345, 12346, 12347] }); result.result?.forEach(item => { if (item.status === 'success') { console.log(`Сертификат ${item.certificate_id} успешно удален`); } else { console.error(`Ошибка удаления ${item.certificate_id}: ${item.error}`); } }); ```

**Example:**
```typescript
const result = await client.deleteCertificates(/* parameters */);
console.log(result);
```

### `getCertificateInfo()`

Получить информацию о сертификате Get certificate info Возвращает детальную информацию о сертификате по его идентификатору. ```typescript const certInfo = await certificationApi.getCertificateInfo({ certificate_id: 12345 }); console.log(`Сертификат: ${certInfo.result?.name}`); console.log(`Статус: ${certInfo.result?.status}`); console.log(`Номер: ${certInfo.result?.number}`); ```

**Example:**
```typescript
const result = await client.getCertificateInfo(/* parameters */);
console.log(result);
```

### `getCertificateProductsList()`

Получить список товаров, привязанных к сертификату Get certificate products list Возвращает список товаров, которые привязаны к указанному сертификату. ```typescript const products = await certificationApi.getCertificateProductsList({ certificate_id: 12345, page: 1, page_size: 50 }); console.log(`К сертификату привязано товаров: ${products.result?.total}`); products.result?.products.forEach(product => { console.log(`${product.name} (${product.offer_id}) - ${product.status}`); }); ```

**Example:**
```typescript
const result = await client.getCertificateProductsList(/* parameters */);
console.log(result);
```

### `getProductStatusList()`

Получить список возможных статусов товаров Get product status list Возвращает список возможных статусов товаров при их привязке к сертификату. ```typescript const statuses = await certificationApi.getProductStatusList(); console.log('Возможные статусы товаров:'); statuses.result?.forEach(status => { console.log(`${status.code}: ${status.name}`); }); ```

**Example:**
```typescript
const result = await client.getProductStatusList(/* parameters */);
console.log(result);
```

### `getRejectionReasons()`

Получить возможные причины отклонения сертификата Get certificate rejection reasons Возвращает справочник причин, по которым сертификаты могут быть отклонены. ```typescript const reasons = await certificationApi.getRejectionReasons(); console.log('Возможные причины отклонения:'); reasons.result?.forEach(reason => { console.log(`${reason.code}: ${reason.name}`); }); ```

**Example:**
```typescript
const result = await client.getRejectionReasons(/* parameters */);
console.log(result);
```

### `getCertificateStatuses()`

Получить возможные статусы сертификатов Get certificate statuses Возвращает справочник всех возможных статусов сертификатов. ```typescript const statuses = await certificationApi.getCertificateStatuses(); console.log('Возможные статусы сертификатов:'); statuses.result?.forEach(status => { console.log(`${status.code}: ${status.name}`); }); ```

**Example:**
```typescript
const result = await client.getCertificateStatuses(/* parameters */);
console.log(result);
```

### `getCertificateTypes()`

Получить справочник типов документов Get certificate types Возвращает справочник всех типов сертификатов и документов, которые можно загружать. ```typescript const types = await certificationApi.getCertificateTypes(); console.log('Доступные типы сертификатов:'); types.result?.forEach(type => { console.log(`${type.code}: ${type.name}`); if (type.description) { console.log(`  Описание: ${type.description}`); } }); ```

**Example:**
```typescript
const result = await client.getCertificateTypes(/* parameters */);
console.log(result);
```

### `unbindCertificate()`

Отвязать товар от сертификата Unbind product from certificate Отвязывает один или несколько товаров от указанного сертификата. ```typescript const result = await certificationApi.unbindCertificate({ certificate_id: 12345, product_id: ['product-1', 'product-2'] }); result.result?.forEach(item => { if (item.status === 'success') { console.log(`Товар ${item.product_id} успешно отвязан`); } else { console.error(`Ошибка отвязки ${item.product_id}: ${item.error}`); } }); ```

**Example:**
```typescript
const result = await client.unbindCertificate(/* parameters */);
console.log(result);
```

### `getProductCertificationList()`

Получить список сертифицируемых категорий (v1 - устарел) Get product certification list v1 (deprecated) Возвращает список категорий товаров, которые требуют сертификацию.

**Example:**
```typescript
const result = await client.getProductCertificationList(/* parameters */);
console.log(result);
```

### `getCertificateAccordanceTypesV1()`

Получить список типов соответствия требованиям (версия 1) Get certificate accordance types v1 Возвращает список типов соответствия требованиям для сертификации (версия 1). ```typescript const accordanceTypesV1 = await certificationApi.getCertificateAccordanceTypesV1(); console.log('Доступные типы соответствия (v1):'); accordanceTypesV1.result?.forEach(type => { console.log(`${type.code}: ${type.name}`); }); ```

**Example:**
```typescript
const result = await client.getCertificateAccordanceTypesV1(/* parameters */);
console.log(result);
```

### `getCertificateAccordanceTypesV2()`

Получить список типов соответствия требованиям (версия 2) Get certificate accordance types v2 Возвращает список типов соответствия требованиям для сертификации. ```typescript const accordanceTypes = await certificationApi.getCertificateAccordanceTypesV2(); console.log('Доступные типы соответствия:'); accordanceTypes.result?.accordance_types.forEach(type => { console.log(`${type.code}: ${type.name} (ID: ${type.id})`); }); ```

**Example:**
```typescript
const result = await client.getCertificateAccordanceTypesV2(/* parameters */);
console.log(result);
```

### `getProductCertificationListV2()`

Получить список сертифицируемых категорий (версия 2) Get product certification list v2 Возвращает список категорий товаров, которые требуют сертификацию. Рекомендуется использовать этот метод вместо устаревшей версии v1. ```typescript const certifications = await certificationApi.getProductCertificationListV2({ page: 1, page_size: 100 }); console.log(`Всего категорий: ${certifications.total}`); certifications.certification?.forEach(category => { if (category.has_certificate) { console.log(`${category.category_name} требует сертификацию типа: ${category.certificate_type}`); } }); ```

**Example:**
```typescript
const result = await client.getProductCertificationListV2(/* parameters */);
console.log(result);
```

## Type Definitions

The Certification API uses strongly typed TypeScript interfaces for all requests and responses. Import the necessary types from the SDK:

```typescript
import type {
  // Request types
  Certification*Request
} from '@ozon/seller-api';

import type {
  // Response types  
  Certification*Response
} from '@ozon/seller-api';
```

## Error Handling

```typescript
try {
  const result = await client.certification.getCertificateList(/* parameters */);
} catch (error) {
  if (error.code === 'INVALID_ARGUMENT') {
    console.error('Invalid request parameters');
  } else if (error.code === 'PERMISSION_DENIED') {
    console.error('Insufficient permissions');
  } else {
    console.error('Operation failed:', error.message);
  }
}
```

## Best Practices

1. **Type Safety** - Use TypeScript interfaces for all requests and responses
2. **Error Handling** - Implement comprehensive error handling for all operations
3. **Rate Limiting** - Respect API rate limits and implement retry logic
4. **Validation** - Validate input parameters before making API calls
5. **Documentation** - Refer to method-specific documentation for detailed usage

## Related APIs

- **[Product](./product.md)** - Product operations
- **[Analytics](./analytics.md)** - Analytics operations
- **[Report](./report.md)** - Report operations

---

*This documentation is auto-generated from the TypeScript implementation. For the most up-to-date information, refer to the source code and TypeScript definitions.*