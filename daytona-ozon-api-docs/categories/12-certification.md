# 🏆 Certification API - Управление сертификатами товаров

**API для работы с сертификатами и документами соответствия** — создание, привязка к товарам, управление жизненным циклом сертификации.

## 📋 Методы (15 endpoints)

| Категория | Метод | Endpoint | Назначение |
|-----------|-------|----------|------------|
| **Основные операции** | `getCertificateList` | `/v1/product/certificate/list` | Список сертификатов с фильтрацией |
| | `createCertificate` | `/v1/product/certificate/create` | Создание нового сертификата |
| | `getCertificateInfo` | `/v1/product/certificate/info` | Детальная информация о сертификате |
| | `deleteCertificates` | `/v1/product/certificate/delete` | Удаление сертификатов |
| **Привязка товаров** | `bindCertificate` | `/v1/product/certificate/bind` | Привязка товаров к сертификату |
| | `unbindCertificate` | `/v1/product/certificate/unbind` | Отвязка товаров от сертификата |
| | `getCertificateProductsList` | `/v1/product/certificate/products/list` | Товары, привязанные к сертификату |
| **Справочники** | `getCertificateTypes` | `/v1/product/certificate/types` | Типы сертификатов и документов |
| | `getCertificateStatuses` | `/v1/product/certificate/status/list` | Статусы сертификатов |
| | `getRejectionReasons` | `/v1/product/certificate/rejection_reasons/list` | Причины отклонения |
| | `getProductStatusList` | `/v1/product/certificate/product_status/list` | Статусы товаров |
| **Требования категорий** | `getProductCertificationListV2` | `/v2/product/certification/list` | Категории, требующие сертификацию |
| | `getCertificateAccordanceTypesV2` | `/v2/product/certificate/accordance-types/list` | Типы соответствия v2 |
| | ~~getProductCertificationList~~ | `/v1/product/certification/list` | ⚠️ Устарел (до 14.04.2025) |
| | `getCertificateAccordanceTypesV1` | `/v1/product/certificate/accordance-types` | Типы соответствия v1 |

---

## 🚀 Быстрый старт

### Инициализация клиента
```typescript
import { OzonSellerAPI } from 'daytona-ozon-seller-api';

const client = new OzonSellerAPI({
  clientId: 'your-client-id',
  apiKey: 'your-api-key'
});
```

### Базовый workflow работы с сертификатами
```typescript
try {
  // 1. Получить доступные типы сертификатов
  const types = await client.certification.getCertificateTypes();
  console.log(`📋 Доступно типов сертификатов: ${types.result?.length}`);

  // 2. Создать новый сертификат
  const newCertificate = await client.certification.createCertificate({
    name: 'Сертификат соответствия ГОСТ Р',
    type_code: 'GOST_CERTIFICATE',
    number: 'РОСС RU.АИ37.H00124',
    issue_date: '2024-01-01T00:00:00Z',
    files: ['base64_encoded_file_content'] // PDF/JPG файл в base64
  });

  console.log(`✅ Создан сертификат с ID: ${newCertificate.id}`);

  // 3. Привязать товары к сертификату
  const bindResult = await client.certification.bindCertificate({
    certificate_id: newCertificate.id!,
    product_id: ['product-123', 'product-456', 'product-789']
  });

  console.log('🔗 Результаты привязки товаров:');
  bindResult.result?.forEach(item => {
    if (item.status === 'success') {
      console.log(`   ✅ ${item.product_id} - успешно привязан`);
    } else {
      console.log(`   ❌ ${item.product_id} - ошибка: ${item.error}`);
    }
  });

  // 4. Получить список сертификатов
  const certificates = await client.certification.getCertificateList({
    page: 1,
    page_size: 50,
    status: 'ACTIVE'
  });

  console.log(`📊 Активных сертификатов: ${certificates.result?.certificates.length}`);

} catch (error) {
  console.error('❌ Ошибка работы с сертификатами:', error);
}
```

---

## 🎯 Основные методы

### `createCertificate()` - Создание сертификата
```typescript
interface CertificateCreateRequest {
  /** Название сертификата */
  name: string;
  /** Код типа сертификата */
  type_code: string;
  /** Номер сертификата */
  number: string;
  /** Дата выдачи (ISO 8601) */
  issue_date: string;
  /** Файлы в base64 (PDF/JPG) */
  files: any[];
}

interface CertificateCreateResponse {
  /** ID созданного сертификата */
  id?: number;
}
```

### `getCertificateList()` - Список сертификатов
```typescript
interface CertificateListRequest {
  /** Артикул товара */
  offer_id?: string;
  /** Статус сертификата */
  status?: string;
  /** Тип сертификата */
  type?: string;
  /** Страница (>=1) */
  page: number;
  /** Размер страницы (1-1000) */
  page_size: number;
}

interface CertificateInfo {
  id: number;
  name: string;
  number: string;
  type: string;
  status: string;
  issue_date: string;
  expire_date?: string;
}
```

### `bindCertificate()` / `unbindCertificate()` - Управление привязками
```typescript
interface CertificateBindRequest {
  /** ID сертификата */
  certificate_id: number;
  /** Список артикулов товаров */
  product_id: string[];
}

interface CertificateBindResponse {
  result?: {
    product_id: string;
    status: 'success' | 'error';
    error?: string;
  }[];
}
```

### `getProductCertificationListV2()` - Категории для сертификации
```typescript
interface ProductCertificationListV2Request {
  /** Страница */
  page: number;
  /** Размер страницы (1-1000) */
  page_size: number;
}

interface ProductCertificationInfo {
  /** Название категории */
  category_name: string;
  /** Требует ли сертификацию */
  has_certificate: boolean;
  /** Тип требуемого сертификата */
  certificate_type?: string;
}
```

---

## 💡 Практические примеры

### Массовое создание и привязка сертификатов
```typescript
const createBulkCertificates = async (certificateData: Array<{
  name: string;
  type_code: string;
  number: string;
  issue_date: string;
  file_content: string; // base64
  product_ids: string[];
}>) => {
  const results = {
    created: 0,
    failed: 0,
    bound: 0,
    bindErrors: 0
  };

  for (const certData of certificateData) {
    try {
      console.log(`🔄 Создание сертификата: ${certData.name}`);
      
      // 1. Создать сертификат
      const certificate = await client.certification.createCertificate({
        name: certData.name,
        type_code: certData.type_code,
        number: certData.number,
        issue_date: certData.issue_date,
        files: [certData.file_content]
      });

      if (certificate.id) {
        results.created++;
        console.log(`   ✅ Создан с ID: ${certificate.id}`);

        // 2. Привязать товары
        const bindResult = await client.certification.bindCertificate({
          certificate_id: certificate.id,
          product_id: certData.product_ids
        });

        bindResult.result?.forEach(item => {
          if (item.status === 'success') {
            results.bound++;
          } else {
            results.bindErrors++;
            console.log(`   ⚠️ Ошибка привязки ${item.product_id}: ${item.error}`);
          }
        });

      } else {
        results.failed++;
        console.log(`   ❌ Не удалось создать сертификат`);
      }

      // Пауза между запросами
      await new Promise(resolve => setTimeout(resolve, 2000));

    } catch (error) {
      results.failed++;
      console.error(`❌ Ошибка обработки сертификата ${certData.name}:`, error);
    }
  }

  console.log('\n📊 Итоги массового создания:');
  console.log(`   Создано сертификатов: ${results.created}`);
  console.log(`   Ошибок создания: ${results.failed}`);
  console.log(`   Товаров привязано: ${results.bound}`);
  console.log(`   Ошибок привязки: ${results.bindErrors}`);

  return results;
};
```

### Мониторинг статусов сертификатов
```typescript
const monitorCertificateStatuses = async () => {
  try {
    // Получить все сертификаты с пагинацией
    const allCertificates: any[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await client.certification.getCertificateList({
        page,
        page_size: 100
      });

      if (response.result?.certificates) {
        allCertificates.push(...response.result.certificates);
      }

      hasMore = (response.result?.total || 0) > page * 100;
      page++;
    }

    console.log(`📊 Всего сертификатов: ${allCertificates.length}`);

    // Группировка по статусам
    const statusGroups = allCertificates.reduce((groups: Record<string, any[]>, cert) => {
      const status = cert.status || 'UNKNOWN';
      if (!groups[status]) groups[status] = [];
      groups[status].push(cert);
      return groups;
    }, {});

    console.log('\n📈 Статистика по статусам:');
    Object.entries(statusGroups).forEach(([status, certificates]) => {
      console.log(`   ${status}: ${certificates.length} сертификатов`);
    });

    // Поиск истекающих сертификатов (следующие 30 дней)
    const now = new Date();
    const in30Days = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    
    const expiringSoon = allCertificates.filter(cert => {
      if (!cert.expire_date) return false;
      const expireDate = new Date(cert.expire_date);
      return expireDate >= now && expireDate <= in30Days;
    });

    if (expiringSoon.length > 0) {
      console.log('\n⚠️ Истекают в ближайшие 30 дней:');
      expiringSoon.forEach(cert => {
        console.log(`   ${cert.name} (${cert.number}) - истекает ${cert.expire_date}`);
      });
    }

    // Сертификаты с проблемами
    const problemCertificates = allCertificates.filter(cert => 
      cert.status === 'REJECTED' || cert.status === 'EXPIRED'
    );

    if (problemCertificates.length > 0) {
      console.log('\n🚨 Сертификаты с проблемами:');
      problemCertificates.forEach(cert => {
        console.log(`   ${cert.name} - статус: ${cert.status}`);
      });
    }

    return {
      total: allCertificates.length,
      byStatus: statusGroups,
      expiringSoon: expiringSoon.length,
      problems: problemCertificates.length
    };

  } catch (error) {
    console.error('❌ Ошибка мониторинга сертификатов:', error);
  }
};
```

### Анализ требований к сертификации по категориям
```typescript
const analyzeCategorizationRequirements = async () => {
  try {
    // Получить все категории, требующие сертификацию
    const allCategories: any[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await client.certification.getProductCertificationListV2({
        page,
        page_size: 1000 // максимум
      });

      if (response.certification) {
        allCategories.push(...response.certification);
      }

      hasMore = (response.total || 0) > page * 1000;
      page++;
    }

    console.log(`📊 Всего категорий: ${allCategories.length}`);

    // Анализ требований
    const analysis = {
      total: allCategories.length,
      requiringCertification: 0,
      notRequiring: 0,
      byType: {} as Record<string, number>
    };

    allCategories.forEach(category => {
      if (category.has_certificate) {
        analysis.requiringCertification++;
        
        const type = category.certificate_type || 'UNKNOWN';
        analysis.byType[type] = (analysis.byType[type] || 0) + 1;
      } else {
        analysis.notRequiring++;
      }
    });

    console.log('\n📈 Анализ требований к сертификации:');
    console.log(`   Всего категорий: ${analysis.total}`);
    console.log(`   Требуют сертификацию: ${analysis.requiringCertification} (${(analysis.requiringCertification / analysis.total * 100).toFixed(1)}%)`);
    console.log(`   Не требуют: ${analysis.notRequiring} (${(analysis.notRequiring / analysis.total * 100).toFixed(1)}%)`);

    console.log('\n📋 Типы требуемых сертификатов:');
    Object.entries(analysis.byType).forEach(([type, count]) => {
      console.log(`   ${type}: ${count} категорий`);
    });

    // Топ категорий, требующих сертификацию
    const requiring = allCategories
      .filter(cat => cat.has_certificate)
      .slice(0, 20);

    console.log('\n🔝 Топ-20 категорий, требующих сертификацию:');
    requiring.forEach((category, index) => {
      console.log(`${index + 1}. ${category.category_name} (${category.certificate_type})`);
    });

    return analysis;

  } catch (error) {
    console.error('❌ Ошибка анализа категорий:', error);
  }
};
```

### Управление привязками товаров к сертификатам
```typescript
const manageCertificateBindings = async (certificateId: number) => {
  try {
    // 1. Получить текущие привязки
    const currentBindings = await client.certification.getCertificateProductsList({
      certificate_id: certificateId,
      page: 1,
      page_size: 100
    });

    console.log(`🔗 К сертификату ${certificateId} привязано товаров: ${currentBindings.result?.total || 0}`);

    // 2. Получить информацию о сертификате
    const certInfo = await client.certification.getCertificateInfo({
      certificate_id: certificateId
    });

    console.log(`📋 Сертификат: ${certInfo.result?.name}`);
    console.log(`   Номер: ${certInfo.result?.number}`);
    console.log(`   Статус: ${certInfo.result?.status}`);
    console.log(`   Тип: ${certInfo.result?.type}`);

    // 3. Анализ привязанных товаров по статусам
    if (currentBindings.result?.products) {
      const statusCount = currentBindings.result.products.reduce((count: Record<string, number>, product) => {
        const status = product.status || 'UNKNOWN';
        count[status] = (count[status] || 0) + 1;
        return count;
      }, {});

      console.log('\n📊 Статусы привязанных товаров:');
      Object.entries(statusCount).forEach(([status, count]) => {
        console.log(`   ${status}: ${count} товаров`);
      });

      // Проблемные товары
      const problemProducts = currentBindings.result.products.filter(
        product => product.status === 'REJECTED' || product.status === 'EXPIRED'
      );

      if (problemProducts.length > 0) {
        console.log('\n⚠️ Товары с проблемами:');
        problemProducts.forEach(product => {
          console.log(`   ${product.name} (${product.offer_id}) - ${product.status}`);
        });
      }
    }

    return {
      certificateId,
      certificateName: certInfo.result?.name,
      certificateStatus: certInfo.result?.status,
      totalProducts: currentBindings.result?.total || 0,
      products: currentBindings.result?.products || []
    };

  } catch (error) {
    console.error(`❌ Ошибка управления привязками сертификата ${certificateId}:`, error);
  }
};
```

### Проверка соответствия товара требованиям сертификации
```typescript
const checkProductCertificationRequirements = async (productCategoryName: string) => {
  try {
    // Поиск категории в списке сертифицируемых
    let found = false;
    let page = 1;
    let categoryInfo = null;

    while (!found) {
      const response = await client.certification.getProductCertificationListV2({
        page,
        page_size: 1000
      });

      if (!response.certification) break;

      const category = response.certification.find(cat => 
        cat.category_name.toLowerCase().includes(productCategoryName.toLowerCase())
      );

      if (category) {
        found = true;
        categoryInfo = category;
      }

      if ((response.total || 0) <= page * 1000) break;
      page++;
    }

    if (!categoryInfo) {
      console.log(`❌ Категория "${productCategoryName}" не найдена`);
      return { found: false, requiresCertification: false };
    }

    console.log(`🔍 Найдена категория: "${categoryInfo.category_name}"`);

    if (categoryInfo.has_certificate) {
      console.log('🔐 Статус: Требуется сертификация');
      console.log(`   Тип сертификата: ${categoryInfo.certificate_type}`);
      
      // Получить доступные типы сертификатов
      const types = await client.certification.getCertificateTypes();
      const requiredType = types.result?.find(type => 
        type.code === categoryInfo.certificate_type
      );

      if (requiredType) {
        console.log(`   Название типа: ${requiredType.name}`);
        if (requiredType.description) {
          console.log(`   Описание: ${requiredType.description}`);
        }
      }

      console.log('\n💡 Рекомендации:');
      console.log('   1. Подготовьте необходимые документы');
      console.log('   2. Создайте сертификат через API');
      console.log('   3. Привяжите товары к сертификату');
      console.log('   4. Дождитесь модерации');

    } else {
      console.log('✅ Статус: Сертификация не требуется');
      console.log('💡 Можно продавать товары этой категории без дополнительных документов');
    }

    return {
      found: true,
      category: categoryInfo,
      requiresCertification: categoryInfo.has_certificate,
      certificateType: categoryInfo.certificate_type
    };

  } catch (error) {
    console.error('❌ Ошибка проверки требований сертификации:', error);
    return { found: false, requiresCertification: false, error: error.message };
  }
};

// Использование
const checkResult = await checkProductCertificationRequirements('детские игрушки');
```

---

## ⚠️ Ограничения и особенности

### Файлы и форматы
- 📄 **Поддерживаемые форматы**: PDF, JPG для загрузки сертификатов
- 💾 **Размер файлов**: ограничения на размер файлов в base64
- 🔐 **Безопасность**: файлы проходят проверку на вирусы и корректность

### Статусы сертификатов
- `ACTIVE` - активный сертификат, можно использовать
- `PENDING` - на модерации
- `REJECTED` - отклонен, требуются исправления
- `EXPIRED` - истек срок действия
- `DRAFT` - черновик, не отправлен на модерацию

### Пагинация и лимиты
- **Список сертификатов**: 1-1000 элементов на страницу
- **Список категорий**: 1-1000 элементов на страницу
- **Привязка товаров**: множественная операция в одном запросе

### Устаревшие методы
- ⚠️ **getProductCertificationList (v1)**: будет отключен 14 апреля 2025 года
- ✅ **getProductCertificationListV2**: рекомендуемая версия
- 🔄 **Миграция**: используйте v2 методы для новых интеграций

### Типы документов
Наиболее распространенные типы сертификатов:
- `GOST_CERTIFICATE` - сертификат соответствия ГОСТ
- `DECLARATION` - декларация соответствия
- `SGR_CERTIFICATE` - свидетельство о государственной регистрации
- `QUALITY_CERTIFICATE` - сертификат качества
- `SAFETY_CERTIFICATE` - сертификат безопасности

### Рекомендации по использованию
- 🔄 **Автоматизация**: настройте мониторинг сроков действия сертификатов
- 📊 **Аналитика**: регулярно анализируйте статусы и требования категорий
- 🚨 **Превентивные меры**: обновляйте сертификаты заблаговременно
- 📝 **Документооборот**: ведите учет всех сертификатов и их привязок

---

**💡 Совет**: Certification API - критически важный инструмент для соблюдения требований OZON. Регулярно мониторьте статусы сертификатов, следите за сроками действия и автоматизируйте процессы для избежания проблем с продажами.