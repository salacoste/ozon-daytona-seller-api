# 🏷️ Brand API - Управление брендами и сертификацией

**API для работы с брендами и требованиями к сертификации** — получение информации о том, какие бренды требуют сертификаты для продажи на OZON.

## 📋 Методы (1 endpoint)

| Метод | Endpoint | Назначение |
|-------|----------|------------|
| `getCertificationList` | `/v1/brand/company-certification/list` | Список брендов, требующих сертификацию |

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

### Получение списка брендов для сертификации
```typescript
try {
  // Получить первую страницу брендов
  const brands = await client.brand.getCertificationList({
    page: 1,
    page_size: 100
  });

  console.log(`📊 Всего брендов: ${brands.result?.total}`);

  // Фильтрация брендов, требующих сертификацию
  const brandsRequiringCerts = brands.result?.brand_certification.filter(
    brand => brand.has_certificate
  ) || [];

  const brandsNotRequiringCerts = brands.result?.brand_certification.filter(
    brand => !brand.has_certificate
  ) || [];

  console.log(`🔐 Брендов, требующих сертификацию: ${brandsRequiringCerts.length}`);
  console.log(`✅ Брендов без требований: ${brandsNotRequiringCerts.length}`);

  // Вывести бренды, требующие сертификаты
  console.log('\n🔐 Бренды, требующие сертификацию:');
  brandsRequiringCerts.slice(0, 10).forEach((brand, index) => {
    console.log(`${index + 1}. ${brand.brand_name}`);
  });

  // Пагинация для получения всех брендов
  const totalPages = Math.ceil((brands.result?.total || 0) / 100);
  if (totalPages > 1) {
    console.log(`\n📄 Всего страниц: ${totalPages}`);
  }

} catch (error) {
  console.error('❌ Ошибка получения списка брендов:', error);
}
```

---

## 🎯 Основные методы

### `getCertificationList()` - Список сертифицируемых брендов
```typescript
interface BrandCertificationListRequest {
  /** Номер страницы (>=1) */
  page: number;
  /** Количество элементов на странице (>=1) */
  page_size: number;
}

interface BrandCertificationInfo {
  /** Название бренда */
  brand_name: string;
  /** 
   * Требуется ли сертификат:
   * - true — требуется сертификат
   * - false — сертификат не нужен
   */
  has_certificate: boolean;
}

interface BrandCertificationListResponse {
  result?: {
    /** Информация о брендах */
    brand_certification: BrandCertificationInfo[];
    /** Общее количество брендов */
    total: number;
  };
}
```

---

## 💡 Практические примеры

### Получение всех брендов с пагинацией
```typescript
const getAllBrands = async () => {
  const allBrands: BrandCertificationInfo[] = [];
  let page = 1;
  const pageSize = 100;
  let hasMorePages = true;

  while (hasMorePages) {
    try {
      console.log(`📥 Загружается страница ${page}...`);
      
      const response = await client.brand.getCertificationList({
        page,
        page_size: pageSize
      });

      if (response.result?.brand_certification) {
        allBrands.push(...response.result.brand_certification);
      }

      const total = response.result?.total || 0;
      const loadedCount = page * pageSize;
      
      hasMorePages = loadedCount < total;
      page++;

      // Пауза между запросами
      if (hasMorePages) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

    } catch (error) {
      console.error(`❌ Ошибка загрузки страницы ${page}:`, error);
      break;
    }
  }

  console.log(`✅ Всего загружено брендов: ${allBrands.length}`);
  return allBrands;
};
```

### Анализ требований к сертификации
```typescript
const analyzeCertificationRequirements = async () => {
  try {
    const allBrands = await getAllBrands();
    
    const analysis = {
      total: allBrands.length,
      requiresCertification: 0,
      noCertificationRequired: 0,
      brandsByRequirement: {
        required: [] as string[],
        notRequired: [] as string[]
      }
    };

    allBrands.forEach(brand => {
      if (brand.has_certificate) {
        analysis.requiresCertification++;
        analysis.brandsByRequirement.required.push(brand.brand_name);
      } else {
        analysis.noCertificationRequired++;
        analysis.brandsByRequirement.notRequired.push(brand.brand_name);
      }
    });

    // Сортировка по алфавиту
    analysis.brandsByRequirement.required.sort((a, b) => a.localeCompare(b, 'ru'));
    analysis.brandsByRequirement.notRequired.sort((a, b) => a.localeCompare(b, 'ru'));

    console.log('📊 Анализ требований к сертификации:');
    console.log(`   Всего брендов: ${analysis.total}`);
    console.log(`   Требуют сертификацию: ${analysis.requiresCertification} (${(analysis.requiresCertification / analysis.total * 100).toFixed(1)}%)`);
    console.log(`   Не требуют сертификацию: ${analysis.noCertificationRequired} (${(analysis.noCertificationRequired / analysis.total * 100).toFixed(1)}%)`);

    return analysis;

  } catch (error) {
    console.error('❌ Ошибка анализа сертификации:', error);
  }
};
```

### Поиск бренда в списке сертификации
```typescript
const checkBrandCertification = async (brandNameToCheck: string) => {
  try {
    let found = false;
    let page = 1;
    const pageSize = 100;

    while (!found) {
      const response = await client.brand.getCertificationList({
        page,
        page_size: pageSize
      });

      if (!response.result?.brand_certification) {
        break;
      }

      // Поиск бренда (нечувствительный к регистру)
      const brandInfo = response.result.brand_certification.find(
        brand => brand.brand_name.toLowerCase().includes(brandNameToCheck.toLowerCase())
      );

      if (brandInfo) {
        console.log(`🔍 Найден бренд: "${brandInfo.brand_name}"`);
        
        if (brandInfo.has_certificate) {
          console.log('🔐 Статус: Требуется сертификат');
          console.log('💡 Действие: Необходимо предоставить сертификат для продажи товаров этого бренда');
        } else {
          console.log('✅ Статус: Сертификат не требуется');
          console.log('💡 Действие: Можно продавать товары этого бренда без дополнительных сертификатов');
        }
        
        return {
          found: true,
          brand: brandInfo,
          requiresCertification: brandInfo.has_certificate
        };
      }

      // Проверка на последнюю страницу
      const total = response.result.total || 0;
      if (page * pageSize >= total) {
        break;
      }

      page++;
    }

    console.log(`❌ Бренд "${brandNameToCheck}" не найден в базе`);
    console.log('💡 Это может означать:');
    console.log('   - У вас нет товаров этого бренда');
    console.log('   - Бренд написан с ошибкой');
    console.log('   - Бренд не требует особых требований к сертификации');

    return { found: false, brand: null, requiresCertification: false };

  } catch (error) {
    console.error('❌ Ошибка поиска бренда:', error);
    return { found: false, brand: null, requiresCertification: false, error: error.message };
  }
};

// Использование
const checkResult = await checkBrandCertification('Apple');
```

### Мониторинг изменений требований к брендам
```typescript
const monitorBrandChanges = async (intervalMinutes = 60) => {
  let previousBrands: BrandCertificationInfo[] = [];
  
  const checkForChanges = async () => {
    try {
      console.log(`🔄 Проверка изменений в требованиях к брендам...`);
      
      const currentBrands = await getAllBrands();
      
      if (previousBrands.length === 0) {
        previousBrands = currentBrands;
        console.log(`✅ Базовый снимок создан: ${currentBrands.length} брендов`);
        return;
      }
      
      // Поиск изменений
      const changes = {
        newRequirements: [] as string[],
        removedRequirements: [] as string[],
        newBrands: [] as string[],
        removedBrands: [] as string[]
      };
      
      // Сравнение требований
      currentBrands.forEach(currentBrand => {
        const previousBrand = previousBrands.find(p => p.brand_name === currentBrand.brand_name);
        
        if (!previousBrand) {
          changes.newBrands.push(currentBrand.brand_name);
        } else if (currentBrand.has_certificate !== previousBrand.has_certificate) {
          if (currentBrand.has_certificate) {
            changes.newRequirements.push(currentBrand.brand_name);
          } else {
            changes.removedRequirements.push(currentBrand.brand_name);
          }
        }
      });
      
      // Поиск удаленных брендов
      previousBrands.forEach(previousBrand => {
        const currentBrand = currentBrands.find(c => c.brand_name === previousBrand.brand_name);
        if (!currentBrand) {
          changes.removedBrands.push(previousBrand.brand_name);
        }
      });
      
      // Отчет об изменениях
      const hasChanges = Object.values(changes).some(arr => arr.length > 0);
      
      if (hasChanges) {
        console.log('🚨 Обнаружены изменения:');
        
        if (changes.newRequirements.length > 0) {
          console.log(`   🔐 Новые требования к сертификации (${changes.newRequirements.length}):`);
          changes.newRequirements.forEach(brand => console.log(`     - ${brand}`));
        }
        
        if (changes.removedRequirements.length > 0) {
          console.log(`   ✅ Убраны требования к сертификации (${changes.removedRequirements.length}):`);
          changes.removedRequirements.forEach(brand => console.log(`     - ${brand}`));
        }
        
        if (changes.newBrands.length > 0) {
          console.log(`   ➕ Новые бренды (${changes.newBrands.length}):`);
          changes.newBrands.forEach(brand => console.log(`     - ${brand}`));
        }
        
        if (changes.removedBrands.length > 0) {
          console.log(`   ➖ Удаленные бренды (${changes.removedBrands.length}):`);
          changes.removedBrands.forEach(brand => console.log(`     - ${brand}`));
        }
      } else {
        console.log('✅ Изменений не обнаружено');
      }
      
      // Обновление базового снимка
      previousBrands = currentBrands;
      
      return changes;
      
    } catch (error) {
      console.error('❌ Ошибка мониторинга изменений:', error);
    }
  };
  
  // Первоначальная проверка
  await checkForChanges();
  
  // Запуск периодической проверки
  const intervalId = setInterval(checkForChanges, intervalMinutes * 60 * 1000);
  
  console.log(`⏰ Мониторинг запущен с интервалом ${intervalMinutes} минут`);
  
  // Возврат функции для остановки мониторинга
  return () => {
    clearInterval(intervalId);
    console.log('⏹️ Мониторинг остановлен');
  };
};

// Запуск мониторинга каждые 2 часа
const stopMonitoring = await monitorBrandChanges(120);
```

---

## ⚠️ Ограничения и особенности

### Данные и содержимое
- 📋 **Список брендов**: содержит только те бренды, товары которых есть в вашем личном кабинете
- 🔄 **Изменения требований**: список может изменяться, если OZON получит требование от бренда
- ✅ **Актуальность**: данные отражают текущие требования к сертификации

### Пагинация
- 📄 **Обязательные параметры**: `page` и `page_size` должны быть >= 1
- 🔢 **Рекомендуемый размер страницы**: 100 элементов для оптимальной производительности
- ➡️ **Навигация**: используйте `total` для определения общего количества страниц

### Требования к сертификации
- 🔐 **has_certificate: true**: требуется предоставить сертификат для продажи товаров этого бренда
- ✅ **has_certificate: false**: сертификат не требуется, можно продавать без ограничений
- ⚡ **Обновления**: следите за изменениями требований через регулярные проверки

### Практические рекомендации
- 🔄 **Регулярная проверка**: проверяйте список ежедневно или еженедельно
- 📝 **Документооборот**: ведите учет брендов, требующих сертификацию
- ⚠️ **Превентивные меры**: проверяйте требования к сертификации перед добавлением новых товаров
- 📊 **Аналитика**: анализируйте долю брендов, требующих сертификацию, в вашем ассортименте

---

**💡 Совет**: Brand API поможет избежать проблем с продажей товаров брендов, требующих сертификацию. Регулярно проверяйте список и подготавливайте необходимые документы заранее для бесперебойной работы вашего магазина.