# Brand API - Управление брендами

Brand API предоставляет доступ к информации о брендах и их сертификационных требованиях в системе OZON. Позволяет получить список брендов, которые требуют предоставления сертификатов.

## Обзор API

**Количество методов:** 1  
**Основные функции:** Получение списка брендов с требованиями к сертификации  
**Область применения:** Соответствие требованиям брендов, управление сертификацией

## Методы

### 1. Получение списка сертифицируемых брендов

**Метод:** `getCertificationList()`  
**Эндпоинт:** `POST /v1/brand/company-certification/list`

Получает список брендов, для которых требуется предоставить сертификат. Ответ содержит только те бренды, товары которых присутствуют в вашем личном кабинете.

#### Параметры запроса

```typescript
interface BrandCertificationListRequest {
  page?: number;      // Номер страницы (по умолчанию 1)
  page_size?: number; // Количество элементов на странице
}
```

#### Пример использования

```typescript
import { OzonSellerApiClient } from '@spacechemical/ozon-seller-api';

const client = new OzonSellerApiClient({
  apiKey: 'your-api-key',
  clientId: 'your-client-id'
});

// Получить список брендов с требованиями к сертификации
const brands = await client.brand.getCertificationList({
  page: 1,
  page_size: 100
});

console.log(`Всего брендов в каталоге: ${brands.result?.total}`);

// Найти бренды, требующие сертификацию
const brandsRequiringCerts = brands.result?.brand_certification?.filter(
  brand => brand.has_certificate
);

console.log(`Брендов, требующих сертификацию: ${brandsRequiringCerts?.length}`);

// Вывести информацию о каждом бренде
brands.result?.brand_certification?.forEach(brand => {
  console.log(`
    Бренд: ${brand.brand_name}
    Требует сертификат: ${brand.has_certificate ? 'Да' : 'Нет'}
    ID бренда: ${brand.brand_id}
  `);
  
  if (brand.has_certificate) {
    console.log(`  ⚠️ Требуется предоставить сертификат для бренда ${brand.brand_name}`);
  }
});
```

#### Структура ответа

```typescript
interface BrandCertificationListResponse {
  result?: {
    brand_certification?: Array<{
      brand_id?: number;        // ID бренда
      brand_name?: string;      // Название бренда
      has_certificate?: boolean; // Требуется ли сертификат
    }>;
    total?: number;             // Общее количество брендов
  };
}
```

## Практические сценарии использования

### 1. Аудит соответствия брендовым требованиям

```typescript
async function auditBrandCompliance(client: OzonSellerApiClient) {
  const allBrands: any[] = [];
  let page = 1;
  const pageSize = 100;
  
  // Получаем все бренды с пагинацией
  while (true) {
    const response = await client.brand.getCertificationList({
      page,
      page_size: pageSize
    });
    
    if (!response.result?.brand_certification?.length) {
      break;
    }
    
    allBrands.push(...response.result.brand_certification);
    
    // Если получили меньше, чем размер страницы - это последняя страница
    if (response.result.brand_certification.length < pageSize) {
      break;
    }
    
    page++;
  }
  
  // Анализ соответствия
  const brandsRequiringCerts = allBrands.filter(brand => brand.has_certificate);
  const brandsWithoutCertReqs = allBrands.filter(brand => !brand.has_certificate);
  
  const complianceReport = {
    total_brands: allBrands.length,
    brands_requiring_certs: brandsRequiringCerts.length,
    brands_without_cert_reqs: brandsWithoutCertReqs.length,
    compliance_rate: allBrands.length > 0 
      ? ((brandsWithoutCertReqs.length / allBrands.length) * 100).toFixed(1)
      : 0,
    critical_brands: brandsRequiringCerts
  };
  
  console.log('📋 Отчет о соответствии брендовым требованиям:');
  console.log(`Всего брендов в каталоге: ${complianceReport.total_brands}`);
  console.log(`Требуют сертификацию: ${complianceReport.brands_requiring_certs}`);
  console.log(`Не требуют сертификацию: ${complianceReport.brands_without_cert_reqs}`);
  console.log(`Процент соответствия: ${complianceReport.compliance_rate}%`);
  
  if (complianceReport.critical_brands.length > 0) {
    console.log('\\n⚠️ Критические бренды, требующие внимания:');
    complianceReport.critical_brands.forEach(brand => {
      console.log(`  • ${brand.brand_name} (ID: ${brand.brand_id})`);
    });
  }
  
  return complianceReport;
}
```

### 2. Мониторинг изменений в требованиях брендов

```typescript
class BrandComplianceMonitor {
  private lastKnownBrands: Map<number, boolean> = new Map();
  
  constructor(private client: OzonSellerApiClient) {}
  
  async checkForChanges(): Promise<{
    new_requirements: any[];
    removed_requirements: any[];
    unchanged: any[];
  }> {
    // Получаем текущее состояние брендов
    const currentBrands = await this.getAllBrands();
    const currentRequirements = new Map<number, boolean>();
    
    currentBrands.forEach(brand => {
      if (brand.brand_id) {
        currentRequirements.set(brand.brand_id, brand.has_certificate || false);
      }
    });
    
    const changes = {
      new_requirements: [] as any[],
      removed_requirements: [] as any[],
      unchanged: [] as any[]
    };
    
    // Анализируем изменения
    for (const [brandId, requiresCert] of currentRequirements) {
      const previousRequirement = this.lastKnownBrands.get(brandId);
      const brand = currentBrands.find(b => b.brand_id === brandId);
      
      if (previousRequirement === undefined) {
        // Новый бренд
        if (requiresCert) {
          changes.new_requirements.push(brand);
        } else {
          changes.unchanged.push(brand);
        }
      } else if (previousRequirement !== requiresCert) {
        // Изменение требований
        if (requiresCert) {
          changes.new_requirements.push(brand);
        } else {
          changes.removed_requirements.push(brand);
        }
      } else {
        // Без изменений
        changes.unchanged.push(brand);
      }
    }
    
    // Обновляем состояние
    this.lastKnownBrands = currentRequirements;
    
    // Уведомления об изменениях
    if (changes.new_requirements.length > 0) {
      console.log('🚨 Новые требования к сертификации:');
      changes.new_requirements.forEach(brand => {
        console.log(`  • ${brand.brand_name}: теперь требует сертификат`);
      });
    }
    
    if (changes.removed_requirements.length > 0) {
      console.log('✅ Сняты требования к сертификации:');
      changes.removed_requirements.forEach(brand => {
        console.log(`  • ${brand.brand_name}: больше не требует сертификат`);
      });
    }
    
    return changes;
  }
  
  private async getAllBrands() {
    const allBrands: any[] = [];
    let page = 1;
    const pageSize = 100;
    
    while (true) {
      const response = await this.client.brand.getCertificationList({
        page,
        page_size: pageSize
      });
      
      if (!response.result?.brand_certification?.length) break;
      
      allBrands.push(...response.result.brand_certification);
      
      if (response.result.brand_certification.length < pageSize) break;
      page++;
    }
    
    return allBrands;
  }
  
  async startMonitoring(intervalMinutes: number = 60) {
    console.log(`🔍 Начинаем мониторинг изменений брендовых требований (интервал: ${intervalMinutes} мин)`);
    
    // Первоначальная загрузка
    await this.checkForChanges();
    
    // Периодическая проверка
    setInterval(async () => {
      try {
        await this.checkForChanges();
      } catch (error) {
        console.error('Ошибка при проверке изменений брендов:', error.message);
      }
    }, intervalMinutes * 60 * 1000);
  }
}

// Использование монитора
const monitor = new BrandComplianceMonitor(client);
await monitor.startMonitoring(60); // Проверка каждый час
```

### 3. Интеграция с системой сертификации товаров

```typescript
async function integrateBrandRequirementsWithProducts(
  client: OzonSellerApiClient
) {
  // Получаем бренды с требованиями к сертификации
  const brands = await client.brand.getCertificationList({
    page: 1,
    page_size: 1000
  });
  
  const criticalBrands = brands.result?.brand_certification
    ?.filter(brand => brand.has_certificate)
    ?.map(brand => ({
      id: brand.brand_id,
      name: brand.brand_name
    })) || [];
  
  if (criticalBrands.length === 0) {
    console.log('✅ Нет брендов, требующих сертификацию');
    return { critical_brands: [], actions_required: [] };
  }
  
  // Для каждого критического бренда составляем план действий
  const actionsRequired = criticalBrands.map(brand => ({
    brand_id: brand.id,
    brand_name: brand.name,
    actions: [
      {
        priority: 'HIGH',
        action: 'Получить сертификат соответствия',
        deadline: '30 дней',
        description: `Необходимо получить сертификат для бренда ${brand.name}`
      },
      {
        priority: 'MEDIUM',
        action: 'Обновить карточки товаров',
        deadline: '7 дней после получения сертификата',
        description: 'Добавить информацию о сертификате в карточки товаров'
      },
      {
        priority: 'LOW',
        action: 'Мониторинг соответствия',
        deadline: 'Постоянно',
        description: 'Регулярно проверять актуальность сертификата'
      }
    ]
  }));
  
  console.log(`🎯 План действий по ${criticalBrands.length} брендам:`);
  actionsRequired.forEach((brandPlan, index) => {
    console.log(`\\n${index + 1}. ${brandPlan.brand_name}:`);
    brandPlan.actions.forEach(action => {
      const priority = action.priority === 'HIGH' ? '🔴' : 
                       action.priority === 'MEDIUM' ? '🟡' : '🟢';
      console.log(`   ${priority} ${action.action} (${action.deadline})`);
      console.log(`      ${action.description}`);
    });
  });
  
  return {
    critical_brands: criticalBrands,
    actions_required: actionsRequired
  };
}
```

### 4. Автоматизация уведомлений

```typescript
class BrandNotificationSystem {
  constructor(private client: OzonSellerApiClient) {}
  
  async sendComplianceAlerts(webhookUrl?: string) {
    try {
      const brands = await client.brand.getCertificationList({
        page: 1,
        page_size: 1000
      });
      
      const criticalBrands = brands.result?.brand_certification
        ?.filter(brand => brand.has_certificate) || [];
      
      if (criticalBrands.length === 0) {
        console.log('✅ Все бренды соответствуют требованиям');
        return;
      }
      
      const alert = {
        timestamp: new Date().toISOString(),
        level: 'WARNING',
        message: `Обнаружено ${criticalBrands.length} брендов, требующих сертификацию`,
        brands: criticalBrands.map(brand => ({
          name: brand.brand_name,
          id: brand.brand_id,
          action_required: 'Предоставить сертификат соответствия'
        }))
      };
      
      // Консольное уведомление
      console.log('🚨 УВЕДОМЛЕНИЕ О СООТВЕТСТВИИ БРЕНДАМ:');
      console.log(`Дата: ${alert.timestamp}`);
      console.log(`Статус: ${alert.message}`);
      console.log('Требуют внимания:');
      alert.brands.forEach(brand => {
        console.log(`  • ${brand.name} (ID: ${brand.id})`);
      });
      
      // Отправка веб-хука (если настроен)
      if (webhookUrl) {
        try {
          const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(alert)
          });
          
          if (response.ok) {
            console.log('✅ Уведомление отправлено на webhook');
          } else {
            console.warn('⚠️ Ошибка отправки webhook:', response.statusText);
          }
        } catch (error) {
          console.error('❌ Ошибка webhook:', error.message);
        }
      }
      
      return alert;
    } catch (error) {
      console.error('Ошибка при отправке уведомлений:', error.message);
      return null;
    }
  }
  
  async scheduleRegularChecks(intervalHours: number = 24, webhookUrl?: string) {
    console.log(`📅 Настроена регулярная проверка брендовых требований каждые ${intervalHours} часов`);
    
    // Первоначальная проверка
    await this.sendComplianceAlerts(webhookUrl);
    
    // Регулярные проверки
    setInterval(async () => {
      await this.sendComplianceAlerts(webhookUrl);
    }, intervalHours * 60 * 60 * 1000);
  }
}

// Использование системы уведомлений
const notificationSystem = new BrandNotificationSystem(client);

// Единоразовая проверка
await notificationSystem.sendComplianceAlerts();

// Регулярные проверки с webhook
await notificationSystem.scheduleRegularChecks(12, 'https://your-webhook-url.com/ozon-alerts');
```

## Важные особенности

### Динамичность списка брендов
- Список брендов может изменяться при получении новых требований от правообладателей
- Рекомендуется регулярно проверять изменения в требованиях
- Бренды могут как добавляться в список требующих сертификацию, так и удаляться из него

### Рекомендации по использованию

```typescript
// Правильный подход с обработкой пагинации
async function getAllBrands(client: OzonSellerApiClient) {
  const allBrands: any[] = [];
  let page = 1;
  const pageSize = 100; // Оптимальный размер страницы
  
  while (true) {
    try {
      const response = await client.brand.getCertificationList({
        page,
        page_size: pageSize
      });
      
      if (!response.result?.brand_certification?.length) {
        break; // Нет больше данных
      }
      
      allBrands.push(...response.result.brand_certification);
      
      // Если получили меньше чем размер страницы - последняя страница
      if (response.result.brand_certification.length < pageSize) {
        break;
      }
      
      page++;
      
      // Небольшая пауза между запросами для соблюдения rate limits
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`Ошибка при загрузке страницы ${page}:`, error.message);
      break;
    }
  }
  
  return allBrands;
}
```

## Обработка ошибок

```typescript
try {
  const brands = await client.brand.getCertificationList({
    page: 1,
    page_size: 100
  });
  
  if (!brands.result) {
    console.warn('Пустой результат от API');
    return;
  }
  
  // Обработка данных...
} catch (error) {
  if (error.response?.status === 400) {
    console.error('Неверные параметры запроса:', error.response.data);
  } else if (error.response?.status === 429) {
    console.error('Превышен лимит запросов, повторите позже');
  } else if (error.response?.status === 500) {
    console.error('Внутренняя ошибка сервера, попробуйте позже');
  } else {
    console.error('Произошла ошибка:', error.message);
  }
}
```

---

**Связанные API:** Certification API (управление сертификатами), Product API (управление товарами), Report API (отчеты по соответствию)