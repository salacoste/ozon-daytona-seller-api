# 22.1 API Управление ценами

**API Управление ценами** - Обновление цен, получение ценовой информации и управление скидками на уценённые товары для OZON Seller API.

## Обзор

API Управление ценами предоставляет полный контроль над ценообразованием товаров, включая основные цены, старые цены для показа скидок, премиум-цены для подписчиков и специальные скидки на уценённые товары.

### Ключевые особенности
- **Массовое обновление цен**: До 100 товаров за один запрос
- **Гибкое ценообразование**: Основная цена, старая цена, премиум-цена
- **Управление скидками**: Специальная работа с уценёнными товарами
- **Лимиты безопасности**: Не более 10 обновлений в час на товар

---

## 📋 Доступные методы

### Управление ценами
1. **updatePrices** - Массовое обновление цен товаров
2. **getPrices** - Получение информации о ценах товаров
3. **updateDiscountedProductDiscount** - Установка скидки на уценённые товары

---

## 🛠️ Детали методов

## 1. updatePrices

Массовое обновление цен одного или нескольких товаров.

### Интерфейс запроса
```typescript
interface PricesStocksImportPricesRequest {
  prices: Array<{
    offer_id?: string;            // ID товара продавца (один из offer_id/product_id обязателен)
    product_id?: number;          // ID товара в системе OZON
    price: string;                // Новая цена товара (обязательно)
    old_price?: string;           // Старая цена для показа скидки (опционально)
    premium_price?: string;       // Цена для Premium подписчиков (опционально) 
    currency_code: string;        // Код валюты (обычно RUB)
  }>;
}
```

### Интерфейс ответа
```typescript
interface PricesStocksImportPricesResponse {
  result?: Array<{
    offer_id?: string;            // ID товара продавца
    product_id?: number;          // ID товара в системе
    updated: boolean;             // Успешно ли обновлена цена
    errors?: string[];            // Список ошибок при обновлении
  }>;
}
```

### Примеры использования

#### Базовое обновление цен
```typescript
async function updateProductPrices() {
  const result = await api.pricesStocks.updatePrices({
    prices: [{
      offer_id: 'ТОВАР001',
      price: '1500',
      old_price: '2000',           // Показываем скидку с 2000 до 1500
      currency_code: 'RUB'
    }, {
      offer_id: 'ТОВАР002', 
      price: '999',
      old_price: '0',              // Сбрасываем старую цену
      currency_code: 'RUB'
    }, {
      product_id: 123456,
      price: '750',
      premium_price: '700',        // Цена для Premium подписчиков
      currency_code: 'RUB'
    }]
  });
  
  console.log(`💰 Результат обновления цен:`);
  result.result?.forEach(product => {
    if (product.updated) {
      console.log(`✅ ${product.offer_id || product.product_id}: цена обновлена`);
    } else {
      console.log(`❌ ${product.offer_id || product.product_id}: ошибка обновления`);
      product.errors?.forEach(error => console.log(`   - ${error}`));
    }
  });
  
  return result;
}
```

#### Массовое обновление со скидками
```typescript
async function bulkPriceUpdate() {
  const products = [
    { offer_id: 'ЭЛЕКТРОНИКА001', старая_цена: 15000, новая_цена: 12000 },
    { offer_id: 'ЭЛЕКТРОНИКА002', старая_цена: 8000, новая_цена: 6500 },
    { offer_id: 'ОДЕЖДА001', старая_цена: 3000, новая_цена: 2100 },
    { offer_id: 'ДОМ001', старая_цена: 5000, новая_цена: 4000 }
  ];
  
  const result = await api.pricesStocks.updatePrices({
    prices: товары.map(товар => ({
      offer_id: товар.offer_id,
      price: товар.новая_цена.toString(),
      old_price: товар.старая_цена.toString(),
      currency_code: 'RUB'
    }))
  });
  
  console.log('🏷️ Массовое обновление цен:');
  
  let успешно = 0;
  let ошибок = 0;
  
  результат.result?.forEach(товар => {
    if (товар.updated) {
      успешно++;
      const исходный = товары.find(т => т.offer_id === товар.offer_id);
      const скидка = исходный ? 
        Math.round((1 - исходный.новая_цена / исходный.старая_цена) * 100) : 0;
      console.log(`✅ ${товар.offer_id}: скидка ${скидка}%`);
    } else {
      ошибок++;
      console.log(`❌ ${товар.offer_id}: ${товар.errors?.join(', ')}`);
    }
  });
  
  console.log(`📊 Итого: ${успешно} успешно, ${ошибок} ошибок`);
}
```

#### Премиум-ценообразование
```typescript
async function установитьПремиумЦены() {
  const премиумТовары = [
    {
      offer_id: 'ПРЕМИУМ001',
      обычная_цена: 5000,
      премиум_цена: 4500,    // 10% скидка для Premium
      старая_цена: 6000
    },
    {
      offer_id: 'ПРЕМИУМ002', 
      обычная_цена: 2000,
      премиум_цена: 1800,    // 10% скидка для Premium
      старая_цена: 2500
    }
  ];
  
  const result = await api.pricesStocks.updatePrices({
    prices: премиумТовары.map(товар => ({
      offer_id: товар.offer_id,
      price: товар.обычная_цена.toString(),
      old_price: товар.старая_цена.toString(),
      premium_price: товар.премиум_цена.toString(),
      currency_code: 'RUB'
    }))
  });
  
  console.log('⭐ Установка премиум-цен:');
  результат.result?.forEach(товар => {
    if (товар.updated) {
      const исходный = премиумТовары.find(т => т.offer_id === товар.offer_id);
      if (исходный) {
        const премиумСкидка = Math.round((1 - исходный.премиум_цена / исходный.обычная_цена) * 100);
        console.log(`✅ ${товар.offer_id}: Premium скидка ${премиумСкидка}%`);
      }
    } else {
      console.log(`❌ ${товар.offer_id}: ошибка установки Premium цены`);
    }
  });
}
```

---

## 2. getPrices

Получение информации о ценах товаров с фильтрацией и пагинацией.

### Интерфейс запроса
```typescript
interface PricesStocksGetPricesRequest {
  filter?: {
    offer_id?: string[];          // Фильтр по ID товаров продавца
    product_id?: number[];        // Фильтр по ID товаров в системе
    visibility?: ВидимостьТовара; // Фильтр по видимости товаров
  };
  last_id?: string;               // ID для пагинации
  limit?: number;                 // Лимит записей (макс 1000)
}

type ВидимостьТовара = 'ALL' | 'VISIBLE' | 'INVISIBLE' | 'EMPTY_STOCK' | 'NOT_MODERATED' | 'MODERATED' | 'DISABLED' | 'STATE_FAILED';
```

### Интерфейс ответа
```typescript
interface PricesStocksGetPricesResponse {
  items?: Array<{
    offer_id: string;             // ID товара продавца
    product_id: number;           // ID товара в системе OZON
    price: string;                // Текущая цена товара
    old_price?: string;           // Старая цена (если установлена)
    premium_price?: string;       // Premium цена (если установлена)
    currency_code: string;        // Код валюты
    auto_action_enabled: boolean; // Включены ли автоправила
    commissions?: {               // Информация о комиссиях
      fbo?: number;               // Комиссия FBO (%)
      fbs?: number;               // Комиссия FBS (%)
      rfbs?: number;              // Комиссия rFBS (%)
    };
    marketing_actions?: Array<{   // Активные маркетинговые акции
      title: string;              // Название акции
      action_type: string;        // Тип акции
      date_from?: string;         // Дата начала
      date_to?: string;           // Дата окончания
    }>;
  }>;
  last_id?: string;               // ID для следующей страницы
  has_next: boolean;              // Есть ли следующая страница
}
```

### Примеры использования

#### Получение цен конкретных товаров
```typescript
async function getProductPrices() {
  const цены = await api.pricesStocks.getPrices({
    filter: {
      offer_id: ['ТОВАР001', 'ТОВАР002', 'ТОВАР003'],
      visibility: 'VISIBLE'
    },
    limit: 100
  });
  
  console.log('💰 Информация о ценах товаров:');
  
  цены.items?.forEach(товар => {
    console.log(`\n📦 Товар: ${товар.offer_id} (ID: ${товар.product_id})`);
    console.log(`   💵 Цена: ${товар.price} ${товар.currency_code}`);
    
    if (товар.old_price && товар.old_price !== '0') {
      const скидка = Math.round((1 - parseFloat(товар.price) / parseFloat(товар.old_price)) * 100);
      console.log(`   🏷️ Старая цена: ${товар.old_price} ${товар.currency_code} (скидка ${скидка}%)`);
    }
    
    if (товар.premium_price) {
      const премиумСкидка = Math.round((1 - parseFloat(товар.premium_price) / parseFloat(товар.price)) * 100);
      console.log(`   ⭐ Premium цена: ${товар.premium_price} ${товар.currency_code} (скидка ${премиумСкидка}%)`);
    }
    
    if (товар.commissions) {
      console.log(`   💼 Комиссии: FBO ${товар.commissions.fbo}%, FBS ${товар.commissions.fbs}%, rFBS ${товар.commissions.rfbs}%`);
    }
    
    if (товар.marketing_actions && товар.marketing_actions.length > 0) {
      console.log(`   🎯 Акции: ${товар.marketing_actions.map(акция => акция.title).join(', ')}`);
    }
    
    console.log(`   🤖 Автоправила: ${товар.auto_action_enabled ? 'включены' : 'выключены'}`);
  });
  
  if (цены.has_next) {
    console.log(`📄 Доступна следующая страница (last_id: ${цены.last_id})`);
  }
  
  return цены;
}
```

#### Постраничное получение всех цен
```typescript
async function getAllPrices() {
  let всеТовары: any[] = [];
  let последнийId: string | undefined;
  let страница = 1;
  
  do {
    console.log(`📄 Загружаем страницу ${страница}...`);
    
    const цены = await api.pricesStocks.getPrices({
      filter: {
        visibility: 'VISIBLE'
      },
      last_id: последнийId,
      limit: 1000
    });
    
    if (цены.items) {
      всеТовары.push(...цены.items);
      console.log(`   ✅ Загружено ${цены.items.length} товаров`);
    }
    
    последнийId = цены.last_id;
    страница++;
    
    // Защита от бесконечного цикла
    if (страница > 100) {
      console.log('⚠️ Достигнут лимит страниц (100), остановка');
      break;
    }
    
  } while (последнийId);
  
  console.log(`📊 Итого загружено: ${всеТовары.length} товаров`);
  
  // Анализ цен
  const анализЦен = {
    общееКоличество: всеТовары.length,
    соСкидками: всеТовары.filter(т => т.old_price && т.old_price !== '0').length,
    сПремиумЦенами: всеТовары.filter(т => т.premium_price).length,
    сАвтоправилами: всеТовары.filter(т => т.auto_action_enabled).length,
    средняяЦена: всеТовары.reduce((сумма, товар) => сумма + parseFloat(товар.price), 0) / всеТовары.length
  };
  
  console.log('\n📈 Анализ цен:');
  console.log(`   📦 Общее количество: ${анализЦен.общееКоличество}`);
  console.log(`   🏷️ Со скидками: ${анализЦен.соСкидками} (${Math.round(анализЦен.соСкидками / анализЦен.общееКоличество * 100)}%)`);
  console.log(`   ⭐ С Premium ценами: ${анализЦен.сПремиумЦенами} (${Math.round(анализЦен.сПремиумЦенами / анализЦен.общееКоличество * 100)}%)`);
  console.log(`   🤖 С автоправилами: ${анализЦен.сАвтоправилами} (${Math.round(анализЦен.сАвтоправилами / анализЦен.общееКоличество * 100)}%)`);
  console.log(`   💰 Средняя цена: ${анализЦен.средняяЦена.toFixed(2)} RUB`);
  
  return всеТовары;
}
```

#### Анализ ценовой конкурентоспособности
```typescript
async function анализЦеновойКонкурентоспособности() {
  const цены = await api.pricesStocks.getPrices({
    filter: { visibility: 'VISIBLE' },
    limit: 1000
  });
  
  if (!цены.items) return;
  
  const категории = new Map<string, Array<any>>();
  
  // Группируем товары (в реальности нужна информация о категориях)
  цены.items.forEach(товар => {
    // Примерная группировка по первым символам offer_id
    const категория = товар.offer_id.split(/[0-9]/)[0] || 'ПРОЧЕЕ';
    
    if (!категории.has(категория)) {
      категории.set(категория, []);
    }
    категории.get(категория)!.push(товар);
  });
  
  console.log('🎯 Анализ ценовой конкурентоспособности по категориям:');
  
  категории.forEach((товары, категория) => {
    const цены = товары.map(т => parseFloat(т.price));
    const средняяЦена = цены.reduce((а, б) => а + б, 0) / цены.length;
    const минЦена = Math.min(...цены);
    const максЦена = Math.max(...цены);
    
    const соСкидками = товары.filter(т => т.old_price && т.old_price !== '0').length;
    const процентСкидок = Math.round(соСкидками / товары.length * 100);
    
    console.log(`\n📂 Категория: ${категория}`);
    console.log(`   📦 Товаров: ${товары.length}`);
    console.log(`   💰 Средняя цена: ${средняяЦена.toFixed(2)} RUB`);
    console.log(`   📊 Диапазон: ${минЦена} - ${максЦена} RUB`);
    console.log(`   🏷️ Процент скидок: ${процентСкидок}%`);
    
    // Рекомендации
    if (процентСкидок < 30) {
      console.log(`   💡 Рекомендация: Рассмотрите добавление скидок для повышения конкурентоспособности`);
    }
    
    if (максЦена / минЦена > 3) {
      console.log(`   💡 Рекомендация: Большой разброс цен - проверьте ценовую политику`);
    }
  });
}
```

---

## 3. updateDiscountedProductDiscount

Установка размера скидки на уценённые товары (только для FBS).

### Интерфейс запроса
```typescript
interface PricesStocksUpdateDiscountRequest {
  product_id: number;             // ID уценённого товара
  discount: number;               // Размер скидки в процентах (0-95)
}
```

### Интерфейс ответа
```typescript
interface PricesStocksUpdateDiscountResponse {
  result: boolean;                // Успешно ли установлена скидка
}
```

### Примеры использования

#### Установка скидки на уценённый товар
```typescript
async function установитьСкидкуНаУценённыйТовар() {
  const result = await api.pricesStocks.updateDiscountedProductDiscount({
    product_id: 123456789,
    discount: 25                  // 25% скидка
  });
  
  if (результат.result) {
    console.log('✅ Скидка 25% успешно установлена на уценённый товар');
  } else {
    console.log('❌ Ошибка при установке скидки на уценённый товар');
  }
  
  return результат;
}
```

#### Массовая установка скидок на уценённые товары
```typescript
async function массовоУстановитьСкидкиНаУценённые() {
  const уценённыеТовары = [
    { product_id: 123456, discount: 30, причина: 'Небольшие царапины' },
    { product_id: 234567, discount: 50, причина: 'Повреждённая упаковка' },
    { product_id: 345678, discount: 20, причина: 'Витринный образец' },
    { product_id: 456789, discount: 15, причина: 'Минимальные дефекты' }
  ];
  
  console.log('🏷️ Установка скидок на уценённые товары:');
  
  let успешно = 0;
  let ошибок = 0;
  
  for (const товар of уценённыеТовары) {
    try {
      const result = await api.pricesStocks.updateDiscountedProductDiscount({
        product_id: товар.product_id,
        discount: товар.discount
      });
      
      if (результат.result) {
        успешно++;
        console.log(`✅ Товар ${товар.product_id}: скидка ${товар.discount}% (${товар.причина})`);
      } else {
        ошибок++;
        console.log(`❌ Товар ${товар.product_id}: ошибка установки скидки`);
      }
      
      // Пауза между запросами для избежания лимитов
      await new Promise(resolve => setTimeout(resolve, 100));
      
    } catch (error: any) {
      ошибок++;
      console.log(`❌ Товар ${товар.product_id}: ${error.message}`);
    }
  }
  
  console.log(`\n📊 Результат: ${успешно} успешно, ${ошибок} ошибок`);
  
  return {
    успешно,
    ошибок,
    общее: уценённыеТовары.length
  };
}
```

---

## 🏗️ Классы для реализации

### Менеджер цен
```typescript
interface КонфигурацияЦен {
  лимитОбновленийВЧас?: number;     // Лимит обновлений цены на товар в час
  размерПакета?: number;            // Размер пакета для массовых операций
  задержкаМеждуЗапросами?: number;  // Задержка между запросами (мс)
  максимумПопыток?: number;         // Максимум попыток при ошибках
}

class МенеджерЦен {
  private api: OzonSellerAPI;
  private конфиг: Required<КонфигурацияЦен>;
  private счётчикОбновлений = new Map<string, { количество: number; последнееОбновление: number }>();
  
  constructor(api: OzonSellerAPI, конфиг: КонфигурацияЦен = {}) {
    this.api = api;
    this.конфиг = {
      лимитОбновленийВЧас: 10,
      размерПакета: 100,
      задержкаМеждуЗапросами: 1000,
      максимумПопыток: 3,
      ...конфиг
    };
  }

  /**
   * Безопасное обновление цен с проверкой лимитов
   */
  async безопасноеОбновлениеЦен(
    цены: Array<{
      товарId: string;
      цена: number;
      стараяЦена?: number;
      премиумЦена?: number;
    }>
  ): Promise<{
    успешно: number;
    пропущено: number;
    ошибок: number;
    детали: Array<{ товарId: string; статус: 'успешно' | 'пропущено' | 'ошибка'; причина?: string }>;
  }> {
    const результат = {
      успешно: 0,
      пропущено: 0,
      ошибок: 0,
      детали: [] as Array<{ товарId: string; статус: 'успешно' | 'пропущено' | 'ошибка'; причина?: string }>
    };

    // Проверяем лимиты для каждого товара
    const разрешённыеЦены = цены.filter(цена => {
      if (this.проверитьЛимитОбновлений(цена.товарId)) {
        return true;
      } else {
        результат.пропущено++;
        результат.детали.push({
          товарId: цена.товарId,
          статус: 'пропущено',
          причина: `Превышен лимит ${this.конфиг.лимитОбновленийВЧас} обновлений в час`
        });
        return false;
      }
    });

    // Обрабатываем пакетами
    for (let i = 0; i < разрешённыеЦены.length; i += this.конфиг.размерПакета) {
      const пакет = разрешённыеЦены.slice(i, i + this.конфиг.размерПакета);
      
      try {
        const запрос = {
          prices: пакет.map(цена => ({
            offer_id: цена.товарId,
            price: цена.цена.toString(),
            old_price: цена.стараяЦена?.toString(),
            premium_price: цена.премиумЦена?.toString(),
            currency_code: 'RUB'
          }))
        };

        const ответ = await this.api.pricesStocks.updatePrices(запрос);

        // Обрабатываем результаты
        ответ.result?.forEach(товар => {
          if (товар.updated) {
            результат.успешно++;
            результат.детали.push({
              товарId: товар.offer_id || товар.product_id?.toString() || '',
              статус: 'успешно'
            });
            
            // Обновляем счётчик
            this.зарегистрироватьОбновление(товар.offer_id || товар.product_id?.toString() || '');
          } else {
            результат.ошибок++;
            результат.детали.push({
              товарId: товар.offer_id || товар.product_id?.toString() || '',
              статус: 'ошибка',
              причина: товар.errors?.join(', ')
            });
          }
        });

      } catch (error: any) {
        // Все товары в пакете считаем ошибочными
        пакет.forEach(цена => {
          результат.ошибок++;
          результат.детали.push({
            товарId: цена.товарId,
            статус: 'ошибка',
            причина: error.message
          });
        });
      }

      // Задержка между пакетами
      if (i + this.конфиг.размерПакета < разрешённыеЦены.length) {
        await new Promise(resolve => setTimeout(resolve, this.конфиг.задержкаМеждуЗапросами));
      }
    }

    return результат;
  }

  /**
   * Автоматическое ценообразование на основе правил
   */
  async автоценообразование(
    правила: {
      категория: string;
      минимальнаяМаржа: number;      // Минимальная маржа в процентах
      максимальнаяСкидка: number;     // Максимальная скидка в процентах
      конкурентнаяНадбавка: number;   // Надбавка к конкурентной цене
    }[]
  ): Promise<void> {
    console.log('🤖 Запуск автоматического ценообразования');

    // Получаем все текущие цены
    const текущиеЦены = await this.получитьВсеЦены();
    
    for (const правило of правила) {
      console.log(`\n📂 Обработка категории: ${правило.категория}`);
      
      // Фильтруем товары по категории (упрощённо по названию)
      const товарыКатегории = текущиеЦены.filter(товар => 
        товар.offer_id.startsWith(правило.категория)
      );
      
      const новыеЦены: Array<any> = [];
      
      for (const товар of товарыКатегории) {
        const текущаяЦена = parseFloat(товар.price);
        
        // Примерный расчёт себестоимости (в реальности из внешней системы)
        const себестоимость = текущаяЦена * 0.7; // Предполагаем 30% маржи
        
        // Рассчитываем минимально допустимую цену
        const минимальнаяЦена = себестоимость * (1 + правило.минимальнаяМаржа / 100);
        
        // Рассчитываем цену со скидкой
        const цена = Math.max(
          минимальнаяЦена,
          текущаяЦена * (1 - правило.максимальнаяСкидка / 100)
        );
        
        if (Math.abs(цена - текущаяЦена) / текущаяЦена > 0.05) { // Изменение больше 5%
          новыеЦены.push({
            товарId: товар.offer_id,
            цена: Math.round(цена),
            стараяЦена: текущаяЦена
          });
        }
      }
      
      if (новыеЦены.length > 0) {
        console.log(`💰 Обновляем цены для ${новыеЦены.length} товаров`);
        const result = await this.безопасноеОбновлениеЦен(новыеЦены);
        console.log(`✅ Успешно: ${результат.успешно}, ❌ Ошибок: ${результат.ошибок}, ⏸️ Пропущено: ${результат.пропущено}`);
      } else {
        console.log('📊 Изменения цен не требуются');
      }
    }
  }

  private проверитьЛимитОбновлений(товарId: string): boolean {
    const сейчас = Date.now();
    const часТомуНазад = сейчас - 60 * 60 * 1000;
    
    const запись = this.счётчикОбновлений.get(товарId);
    
    if (!запись || запись.последнееОбновление < часТомуНазад) {
      return true;
    }
    
    return запись.количество < this.конфиг.лимитОбновленийВЧас;
  }

  private зарегистрироватьОбновление(товарId: string): void {
    const сейчас = Date.now();
    const часТомуНазад = сейчас - 60 * 60 * 1000;
    
    const запись = this.счётчикОбновлений.get(товарId);
    
    if (!запись || запись.последнееОбновление < часТомуНазад) {
      this.счётчикОбновлений.set(товарId, {
        количество: 1,
        последнееОбновление: сейчас
      });
    } else {
      запись.количество++;
      запись.последнееОбновление = сейчас;
    }
  }

  private async получитьВсеЦены(): Promise<any[]> {
    // Упрощённая реализация - в реальности нужна постраничная загрузка
    const цены = await this.api.pricesStocks.getPrices({
      filter: { visibility: 'VISIBLE' },
      limit: 1000
    });
    
    return цены.items || [];
  }
}
```

---

## ⚠️ Обработка ошибок

### Частые сценарии ошибок
```typescript
async function устойчивыеОперацииСЦенами() {
  try {
    // Обновление цен с обработкой ошибок
    const result = await api.pricesStocks.updatePrices({
      prices: [{
        offer_id: 'НЕДОПУСТИМЫЙ-ТОВАР',
        price: '-100',              // Недопустимая цена
        currency_code: 'USD'        // Недопустимая валюта
      }]
    });
    
  } catch (error: any) {
    if (error.response?.status === 400) {
      console.error('❌ Неправильные параметры запроса:', error.response.data);
      
      // Обрабатываем конкретные ошибки валидации
      const ошибки = error.response.data.errors || [];
      ошибки.forEach(ошибка => {
        switch (ошибка.code) {
          case 'INVALID_PRICE':
            console.log('💡 Исправление: Цена должна быть положительным числом');
            break;
          case 'INVALID_CURRENCY':
            console.log('💡 Исправление: Используйте валюту RUB');
            break;
          case 'PRODUCT_NOT_FOUND':
            console.log('💡 Исправление: Проверьте правильность offer_id или product_id');
            break;
          case 'RATE_LIMIT_EXCEEDED':
            console.log('💡 Исправление: Превышен лимит 10 обновлений в час на товар');
            break;
        }
      });
      
    } else if (error.response?.status === 429) {
      console.error('⏰ Превышен лимит запросов - повторите через некоторое время');
      
    } else {
      console.error('❌ Ошибка обновления цен:', error.message);
    }
  }
  
  try {
    // Получение цен с обработкой ошибок
    const цены = await api.pricesStocks.getPrices({
      filter: {
        offer_id: ['НЕСУЩЕСТВУЮЩИЙ-ТОВАР']
      }
    });
    
    if (!цены.items || цены.items.length === 0) {
      console.log('🔍 Товары с указанными ID не найдены');
    }
    
  } catch (error: any) {
    if (error.response?.status === 404) {
      console.error('🔍 Товары не найдены');
    } else {
      console.error('❌ Ошибка получения цен:', error.message);
    }
  }
}
```

---

## 🔗 Связанная документация

- **[API Цены и Остатки (22-цены-остатки.md)](./22-цены-остатки.md)** - Основной обзор API
- **[Таймеры актуальности (22-цены-остатки-таймеры.md)](./22-цены-остатки-таймеры.md)** - Управление таймерами цен
- **[Управление остатками (22-цены-остатки-остатки.md)](./22-цены-остатки-остатки.md)** - Операции с остатками товаров

---

**Статус реализации**: ✅ Завершено  
**Последнее обновление**: 2024  
**Версии API**: v1, v5  
**Количество методов**: 3 метода управления ценами