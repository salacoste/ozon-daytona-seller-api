# Polygon API Documentation

## Overview

Polygon API предоставляет возможности для создания полигонов доставки и их привязки к методам доставки OZON. API включает **4 метода** для управления географическими зонами доставки и настройки времени доставки.

### Key Features

- 🗺️ **Создание полигонов доставки** - определение географических зон с помощью координат GeoJSON
- 📍 **Привязка к методам доставки** - связывание полигонов с конкретными способами доставки
- ⏱️ **Настройка времени доставки** - указание времени доставки для каждого полигона
- 🏪 **Геопозиционирование складов** - привязка полигонов к местоположению складов
- 🎯 **Зональная доставка** - создание различных зон с разным временем доставки
- 🛠️ **Интеграция с GeoJSON.io** - использование онлайн-инструментов для создания координат

## Available Methods

### Main Methods

#### createDeliveryPolygon()
Создает полигон для зоны доставки с указанием координат в формате GeoJSON.

```typescript
// Создать простой прямоугольный полигон для центра Москвы
const moscowPolygon = await polygonApi.createDeliveryPolygon({
  coordinates: `[[[
    [55.7558, 37.6176], // Красная площадь
    [55.7558, 37.7176], // Восточная граница
    [55.8558, 37.7176], // Северо-восточный угол
    [55.8558, 37.6176], // Северная граница
    [55.7558, 37.6176]  // Замыкание полигона
  ]]]`
});

console.log(`Создан полигон с ID: ${moscowPolygon.polygon_id}`);
```

#### bindPolygonToDeliveryMethod()
Привязывает созданные полигоны к методу доставки с указанием времени доставки и местоположения склада.

```typescript
// Привязать полигон к экспресс-доставке
await polygonApi.bindPolygonToDeliveryMethod({
  delivery_method_id: 123,
  warehouse_location: {
    lat: "55.7558", // Широта склада
    lon: "37.6176"  // Долгота склада
  },
  polygons: [{
    polygon_id: moscowPolygon.polygon_id!,
    time: 120 // 2 часа доставки
  }]
});
```

## TypeScript Interfaces

### Request Types

```typescript
interface PolygonCreateRequest {
  coordinates: string; // GeoJSON строка с координатами полигона
}

interface PolygonBindRequest {
  delivery_method_id: number;
  warehouse_location: WarehouseLocation;
  polygons: PolygonBinding[];
}

interface WarehouseLocation {
  lat: string;  // Широта склада
  lon: string;  // Долгота склада
}

interface PolygonBinding {
  polygon_id: number;
  time: number; // Время доставки в минутах
}
```

### Response Types

```typescript
interface PolygonCreateResponse {
  polygon_id?: number;
  success?: boolean;
  message?: string;
}

// bindPolygonToDeliveryMethod возвращает void при успешном выполнении
```

## Usage Examples

### Basic Polygon Management

```typescript
import { OzonApi } from 'bmad-ozon-seller-api';

const ozonApi = new OzonApi({
  clientId: 'your-client-id',
  apiKey: 'your-api-key'
});

// Создание простого полигона для зоны доставки
async function createDeliveryZone() {
  try {
    // Создать полигон для центра города
    const polygon = await ozonApi.polygon.createDeliveryPolygon({
      coordinates: `[[[
        [55.7400, 37.6000],
        [55.7400, 37.6800],
        [55.7800, 37.6800],
        [55.7800, 37.6000],
        [55.7400, 37.6000]
      ]]]`
    });
    
    if (!polygon.polygon_id) {
      throw new Error('Не удалось создать полигон');
    }
    
    console.log(`✅ Полигон создан с ID: ${polygon.polygon_id}`);
    
    // Привязать полигон к методу быстрой доставки
    await ozonApi.polygon.bindPolygonToDeliveryMethod({
      delivery_method_id: 456, // ID быстрой доставки
      warehouse_location: {
        lat: "55.7558",
        lon: "37.6176"
      },
      polygons: [{
        polygon_id: polygon.polygon_id,
        time: 90 // 1.5 часа доставки
      }]
    });
    
    console.log('✅ Полигон успешно привязан к методу доставки');
    return polygon.polygon_id;
  } catch (error) {
    console.error('❌ Ошибка создания зоны доставки:', error);
    throw error;
  }
}

// Использование
const zoneId = await createDeliveryZone();
```

### Advanced Multi-Zone Setup

```typescript
// Создание нескольких зон с разным временем доставки
async function setupMultiZoneDelivery() {
  const zones = [
    {
      name: 'Центр Москвы',
      coordinates: `[[[
        [55.7400, 37.5800],
        [55.7400, 37.6400],
        [55.7700, 37.6400],
        [55.7700, 37.5800],
        [55.7400, 37.5800]
      ]]]`,
      deliveryTime: 60 // 1 час
    },
    {
      name: 'Ближние районы',
      coordinates: `[[[
        [55.7000, 37.5000],
        [55.7000, 37.7000],
        [55.8000, 37.7000],
        [55.8000, 37.5000],
        [55.7000, 37.5000]
      ]]]`,
      deliveryTime: 180 // 3 часа
    },
    {
      name: 'Дальние районы',
      coordinates: `[[[
        [55.6000, 37.4000],
        [55.6000, 37.8000],
        [55.9000, 37.8000],
        [55.9000, 37.4000],
        [55.6000, 37.4000]
      ]]]`,
      deliveryTime: 360 // 6 часов
    }
  ];
  
  const results = [];
  
  for (const zone of zones) {
    try {
      // Создать полигон
      const polygon = await ozonApi.polygon.createDeliveryPolygon({
        coordinates: zone.coordinates
      });
      
      if (polygon.polygon_id) {
        // Привязать к методу доставки
        await ozonApi.polygon.bindPolygonToDeliveryMethod({
          delivery_method_id: 789, // ID основного метода доставки
          warehouse_location: {
            lat: "55.7558",
            lon: "37.6176"
          },
          polygons: [{
            polygon_id: polygon.polygon_id,
            time: zone.deliveryTime
          }]
        });
        
        results.push({
          name: zone.name,
          polygonId: polygon.polygon_id,
          deliveryTime: zone.deliveryTime,
          status: 'success'
        });
        
        console.log(`✅ ${zone.name}: полигон ${polygon.polygon_id}, доставка ${zone.deliveryTime} мин`);
      }
      
      // Небольшая задержка между запросами
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      results.push({
        name: zone.name,
        error: error.message,
        status: 'failed'
      });
      
      console.error(`❌ Ошибка создания зоны ${zone.name}:`, error);
    }
  }
  
  return results;
}

// Использование
const zoneResults = await setupMultiZoneDelivery();
console.log('Результаты настройки зон:', zoneResults);
```

## Complex Scenarios

### Delivery Zone Management System

Класс для комплексного управления зонами доставки:

```typescript
class DeliveryZoneManager {
  constructor(private ozonApi: OzonApi) {}
  
  /**
   * Создание полигона-донута (с отверстием)
   */
  async createDonutPolygon(
    outerBounds: number[][],
    innerBounds: number[][],
    deliveryMethodId: number,
    deliveryTime: number,
    warehouseLat: string,
    warehouseLon: string
  ) {
    try {
      // Создать полигон с отверстием (donut shape)
      const coordinates = `[${JSON.stringify(outerBounds)}, ${JSON.stringify(innerBounds)}]`;
      
      const polygon = await this.ozonApi.polygon.createDeliveryPolygon({
        coordinates
      });
      
      if (!polygon.polygon_id) {
        throw new Error('Не удалось создать полигон-донут');
      }
      
      // Привязать к методу доставки
      await this.ozonApi.polygon.bindPolygonToDeliveryMethod({
        delivery_method_id: deliveryMethodId,
        warehouse_location: {
          lat: warehouseLat,
          lon: warehouseLon
        },
        polygons: [{
          polygon_id: polygon.polygon_id,
          time: deliveryTime
        }]
      });
      
      return polygon.polygon_id;
    } catch (error) {
      console.error('Ошибка создания полигона-донута:', error);
      throw error;
    }
  }
  
  /**
   * Создание радиального полигона (приближение к кругу)
   */
  createCircularPolygon(centerLat: number, centerLon: number, radiusKm: number, points = 12) {
    const coordinates: number[][] = [];
    const earthRadius = 6371; // км
    
    for (let i = 0; i <= points; i++) {
      const angle = (i * 2 * Math.PI) / points;
      
      // Вычисление координат точки на окружности
      const deltaLat = (radiusKm / earthRadius) * Math.cos(angle) * (180 / Math.PI);
      const deltaLon = (radiusKm / earthRadius) * Math.sin(angle) * (180 / Math.PI) / Math.cos(centerLat * Math.PI / 180);
      
      const lat = centerLat + deltaLat;
      const lon = centerLon + deltaLon;
      
      coordinates.push([lat, lon]);
    }
    
    return `[${JSON.stringify(coordinates)}]`;
  }
  
  /**
   * Создание зоны быстрой доставки в радиусе от склада
   */
  async setupExpressDeliveryZone(
    warehouseLat: number,
    warehouseLon: number,
    radiusKm: number,
    deliveryMethodId: number,
    deliveryTimeMinutes: number
  ) {
    try {
      const coordinates = this.createCircularPolygon(warehouseLat, warehouseLon, radiusKm);
      
      const polygon = await this.ozonApi.polygon.createDeliveryPolygon({
        coordinates: `[${coordinates}]`
      });
      
      if (!polygon.polygon_id) {
        throw new Error('Не удалось создать зону экспресс-доставки');
      }
      
      await this.ozonApi.polygon.bindPolygonToDeliveryMethod({
        delivery_method_id: deliveryMethodId,
        warehouse_location: {
          lat: warehouseLat.toString(),
          lon: warehouseLon.toString()
        },
        polygons: [{
          polygon_id: polygon.polygon_id,
          time: deliveryTimeMinutes
        }]
      });
      
      console.log(`✅ Создана зона экспресс-доставки радиусом ${radiusKm}км, время ${deliveryTimeMinutes}мин`);
      return polygon.polygon_id;
    } catch (error) {
      console.error('Ошибка создания зоны экспресс-доставки:', error);
      throw error;
    }
  }
  
  /**
   * Создание зон доставки по районам города
   */
  async setupCityDistrictDelivery(districts: CityDistrict[]) {
    const results: DistrictResult[] = [];
    
    for (const district of districts) {
      try {
        const polygon = await this.ozonApi.polygon.createDeliveryPolygon({
          coordinates: district.coordinates
        });
        
        if (polygon.polygon_id) {
          await this.ozonApi.polygon.bindPolygonToDeliveryMethod({
            delivery_method_id: district.deliveryMethodId,
            warehouse_location: district.warehouseLocation,
            polygons: [{
              polygon_id: polygon.polygon_id,
              time: district.deliveryTime
            }]
          });
          
          results.push({
            district: district.name,
            polygonId: polygon.polygon_id,
            status: 'success',
            deliveryTime: district.deliveryTime
          });
          
          console.log(`✅ Район ${district.name}: полигон ${polygon.polygon_id}`);
        }
      } catch (error) {
        results.push({
          district: district.name,
          status: 'failed',
          error: error.message
        });
        
        console.error(`❌ Ошибка настройки района ${district.name}:`, error);
      }
      
      // Задержка между запросами
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    return results;
  }
  
  /**
   * Массовое создание полигонов
   */
  async createBulkPolygons(polygonConfigs: PolygonConfig[], batchSize = 5) {
    const results: BulkPolygonResult[] = [];
    
    for (let i = 0; i < polygonConfigs.length; i += batchSize) {
      const batch = polygonConfigs.slice(i, i + batchSize);
      
      const batchPromises = batch.map(async (config) => {
        try {
          const polygon = await this.ozonApi.polygon.createDeliveryPolygon({
            coordinates: config.coordinates
          });
          
          if (polygon.polygon_id) {
            await this.ozonApi.polygon.bindPolygonToDeliveryMethod({
              delivery_method_id: config.deliveryMethodId,
              warehouse_location: config.warehouseLocation,
              polygons: [{
                polygon_id: polygon.polygon_id,
                time: config.deliveryTime
              }]
            });
            
            return {
              name: config.name,
              polygonId: polygon.polygon_id,
              status: 'success' as const
            };
          }
          
          throw new Error('Polygon ID не получен');
        } catch (error) {
          return {
            name: config.name,
            status: 'failed' as const,
            error: error.message
          };
        }
      });
      
      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);
      
      console.log(`Обработан batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(polygonConfigs.length/batchSize)}`);
      
      // Задержка между батчами
      if (i + batchSize < polygonConfigs.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    return results;
  }
}

// Интерфейсы для системы управления
interface CityDistrict {
  name: string;
  coordinates: string;
  deliveryMethodId: number;
  deliveryTime: number;
  warehouseLocation: WarehouseLocation;
}

interface DistrictResult {
  district: string;
  polygonId?: number;
  status: 'success' | 'failed';
  deliveryTime?: number;
  error?: string;
}

interface PolygonConfig {
  name: string;
  coordinates: string;
  deliveryMethodId: number;
  deliveryTime: number;
  warehouseLocation: WarehouseLocation;
}

interface BulkPolygonResult {
  name: string;
  polygonId?: number;
  status: 'success' | 'failed';
  error?: string;
}

// Использование системы управления зонами
const zoneManager = new DeliveryZoneManager(ozonApi);

// Создание зоны экспресс-доставки
const expressZoneId = await zoneManager.setupExpressDeliveryZone(
  55.7558, 37.6176, // Координаты склада в Москве
  15, // Радиус 15 км
  123, // ID экспресс-доставки
  120 // 2 часа
);

// Создание полигона-донута (доставляем везде кроме центра)
const donutZoneId = await zoneManager.createDonutPolygon(
  [ // Внешние границы (большой прямоугольник)
    [55.6500, 37.4500],
    [55.6500, 37.7500],
    [55.8500, 37.7500],
    [55.8500, 37.4500],
    [55.6500, 37.4500]
  ],
  [ // Внутренние границы (исключаемая зона в центре)
    [55.7400, 37.5800],
    [55.7400, 37.6400],
    [55.7700, 37.6400],
    [55.7700, 37.5800],
    [55.7400, 37.5800]
  ],
  456, // ID метода доставки
  240, // 4 часа доставки
  "55.7558", "37.6176"
);

// Настройка доставки по районам
const districts: CityDistrict[] = [
  {
    name: 'Центральный административный округ',
    coordinates: `[[[55.7400, 37.5800], [55.7400, 37.6600], [55.7700, 37.6600], [55.7700, 37.5800], [55.7400, 37.5800]]]`,
    deliveryMethodId: 789,
    deliveryTime: 60,
    warehouseLocation: { lat: "55.7558", lon: "37.6176" }
  },
  {
    name: 'Северный административный округ',
    coordinates: `[[[55.7700, 37.5000], [55.7700, 37.7000], [55.8500, 37.7000], [55.8500, 37.5000], [55.7700, 37.5000]]]`,
    deliveryMethodId: 789,
    deliveryTime: 120,
    warehouseLocation: { lat: "55.7558", lon: "37.6176" }
  }
];

const districtResults = await zoneManager.setupCityDistrictDelivery(districts);
console.log('Результаты настройки районов:', districtResults);
```

### GeoJSON Helper Functions

Вспомогательные функции для работы с координатами:

```typescript
class GeoJSONHelper {
  /**
   * Создание прямоугольного полигона
   */
  static createRectangle(
    minLat: number, minLon: number,
    maxLat: number, maxLon: number
  ): string {
    return `[[[
      [${minLat}, ${minLon}],
      [${minLat}, ${maxLon}],
      [${maxLat}, ${maxLon}],
      [${maxLat}, ${minLon}],
      [${minLat}, ${minLon}]
    ]]]`;
  }
  
  /**
   * Создание полигона вокруг точки с заданным отступом
   */
  static createBoundingBox(
    centerLat: number, centerLon: number,
    offsetDegrees: number
  ): string {
    const minLat = centerLat - offsetDegrees;
    const maxLat = centerLat + offsetDegrees;
    const minLon = centerLon - offsetDegrees;
    const maxLon = centerLon + offsetDegrees;
    
    return this.createRectangle(minLat, minLon, maxLat, maxLon);
  }
  
  /**
   * Валидация координат полигона
   */
  static validatePolygonCoordinates(coordinates: string): boolean {
    try {
      const parsed = JSON.parse(coordinates);
      
      // Проверяем что это массив
      if (!Array.isArray(parsed)) return false;
      
      // Проверяем структуру [[[lat, lon], [lat, lon], ...]]
      for (const ring of parsed) {
        if (!Array.isArray(ring)) return false;
        
        for (const point of ring) {
          if (!Array.isArray(point) || point.length !== 2) return false;
          if (typeof point[0] !== 'number' || typeof point[1] !== 'number') return false;
          
          // Проверяем диапазоны координат
          const [lat, lon] = point;
          if (lat < -90 || lat > 90 || lon < -180 || lon > 180) return false;
        }
        
        // Проверяем что первая и последняя точки совпадают (замкнутый полигон)
        const firstPoint = ring[0];
        const lastPoint = ring[ring.length - 1];
        if (firstPoint[0] !== lastPoint[0] || firstPoint[1] !== lastPoint[1]) return false;
        
        // Минимум 4 точки (3 угла + замыкающая)
        if (ring.length < 4) return false;
      }
      
      return true;
    } catch {
      return false;
    }
  }
  
  /**
   * Получение центра полигона (приблизительно)
   */
  static getPolygonCenter(coordinates: string): { lat: number; lon: number } {
    try {
      const parsed = JSON.parse(coordinates);
      const ring = parsed[0]; // Берем первое кольцо
      
      let sumLat = 0;
      let sumLon = 0;
      let count = 0;
      
      for (const point of ring) {
        sumLat += point[0];
        sumLon += point[1];
        count++;
      }
      
      return {
        lat: sumLat / count,
        lon: sumLon / count
      };
    } catch (error) {
      throw new Error('Невозможно определить центр полигона: ' + error.message);
    }
  }
  
  /**
   * Конвертация полигона из различных форматов
   */
  static convertToGeoJSONString(input: any): string {
    if (typeof input === 'string') {
      // Уже строка, проверяем валидность
      if (this.validatePolygonCoordinates(input)) {
        return input;
      }
      throw new Error('Неверный формат строки координат');
    }
    
    if (Array.isArray(input)) {
      // Массив координат, конвертируем в строку
      const coordinates = JSON.stringify(input);
      if (this.validatePolygonCoordinates(coordinates)) {
        return coordinates;
      }
      throw new Error('Неверный формат массива координат');
    }
    
    throw new Error('Неподдерживаемый формат входных данных');
  }
}

// Использование GeoJSON Helper
const helper = GeoJSONHelper;

// Создать прямоугольник
const rectCoords = helper.createRectangle(55.7, 37.6, 55.8, 37.7);

// Создать зону вокруг точки
const boundingBox = helper.createBoundingBox(55.7558, 37.6176, 0.05);

// Валидировать координаты
const isValid = helper.validatePolygonCoordinates(rectCoords);
console.log('Координаты валидны:', isValid);

// Найти центр полигона
const center = helper.getPolygonCenter(rectCoords);
console.log('Центр полигона:', center);
```

## Error Handling

```typescript
// Комплексная обработка ошибок при работе с полигонами
async function safePolygonOperations() {
  try {
    // Валидация координат перед отправкой
    const coordinates = `[[[55.7400, 37.5800], [55.7400, 37.6400], [55.7700, 37.6400], [55.7700, 37.5800], [55.7400, 37.5800]]]`;
    
    if (!GeoJSONHelper.validatePolygonCoordinates(coordinates)) {
      throw new Error('Неверный формат координат полигона');
    }
    
    // Создание полигона
    const polygon = await ozonApi.polygon.createDeliveryPolygon({
      coordinates
    });
    
    if (!polygon.polygon_id) {
      throw new Error('Не получен ID созданного полигона');
    }
    
    // Привязка к методу доставки
    await ozonApi.polygon.bindPolygonToDeliveryMethod({
      delivery_method_id: 123,
      warehouse_location: {
        lat: "55.7558",
        lon: "37.6176"
      },
      polygons: [{
        polygon_id: polygon.polygon_id,
        time: 120
      }]
    });
    
    return polygon.polygon_id;
  } catch (error) {
    if (error.code === 'INVALID_COORDINATES') {
      console.error('Неверные координаты полигона:', error.message);
    } else if (error.code === 'DELIVERY_METHOD_NOT_FOUND') {
      console.error('Метод доставки не найден:', error.message);
    } else if (error.code === 'WAREHOUSE_LOCATION_INVALID') {
      console.error('Неверные координаты склада:', error.message);
    } else if (error.code === 'POLYGON_TOO_LARGE') {
      console.error('Полигон слишком большой:', error.message);
    } else if (error.code === 'POLYGON_TOO_SMALL') {
      console.error('Полигон слишком маленький:', error.message);
    } else {
      console.error('Неожиданная ошибка:', error);
    }
    
    throw error;
  }
}
```

## Best Practices

### 1. Создание качественных полигонов
```typescript
const bestPractices = {
  // Используйте https://geojson.io для визуального создания полигонов
  useGeoJSONIO: true,
  
  // Минимальные требования к полигону
  minPoints: 4, // Минимум 3 угла + замыкающая точка
  
  // Замыкание полигона (первая и последняя точки должны совпадать)
  closedPolygon: true,
  
  // Порядок точек (по часовой стрелке для внешнего кольца)
  clockwiseOrder: true,
  
  // Разумные размеры полигона
  maxAreaKmSq: 10000, // Не более 10,000 км²
  minAreaKmSq: 1,     // Не менее 1 км²
  
  // Валидация координат
  validateBeforeSend: true
};
```

### 2. Оптимизация времени доставки
```typescript
const deliveryTimeStrategy = {
  // Экспресс-доставка (в пределах 10 км от склада)
  express: {
    radiusKm: 10,
    timeMinutes: 60
  },
  
  // Быстрая доставка (10-25 км от склада)
  fast: {
    radiusKm: 25,
    timeMinutes: 180
  },
  
  // Обычная доставка (25-50 км от склада)
  standard: {
    radiusKm: 50,
    timeMinutes: 360
  },
  
  // Экономичная доставка (более 50 км)
  economy: {
    radiusKm: 100,
    timeMinutes: 1440 // 24 часа
  }
};
```

### 3. Кэширование полигонов
```typescript
class PolygonCache {
  private cache = new Map<string, number>();
  
  async getOrCreatePolygon(coordinates: string): Promise<number> {
    const key = this.hashCoordinates(coordinates);
    const cached = this.cache.get(key);
    
    if (cached) {
      console.log('Использован кэшированный полигон:', cached);
      return cached;
    }
    
    const polygon = await ozonApi.polygon.createDeliveryPolygon({ coordinates });
    if (polygon.polygon_id) {
      this.cache.set(key, polygon.polygon_id);
      return polygon.polygon_id;
    }
    
    throw new Error('Не удалось создать полигон');
  }
  
  private hashCoordinates(coordinates: string): string {
    // Простой хеш для координат (в продакшене используйте более надежный)
    return btoa(coordinates).replace(/[^a-zA-Z0-9]/g, '').substring(0, 32);
  }
}
```

### 4. Мониторинг зон доставки
```typescript
class DeliveryZoneMonitor {
  constructor(private ozonApi: OzonApi) {}
  
  async validateDeliveryConfiguration() {
    const issues = [];
    
    // Проверка перекрывающихся зон с разным временем доставки
    // Проверка зон без покрытия
    // Проверка неоптимальных маршрутов
    
    return {
      isValid: issues.length === 0,
      issues,
      recommendations: this.generateRecommendations(issues)
    };
  }
  
  private generateRecommendations(issues: any[]) {
    // Генерация рекомендаций по оптимизации зон
    return [
      'Объедините перекрывающиеся зоны',
      'Создайте дополнительные зоны для непокрытых областей',
      'Оптимизируйте время доставки для удаленных зон'
    ];
  }
}
```

## Integration Notes

- **Координаты**: Используйте формат [latitude, longitude] (широта, долгота)
- **GeoJSON**: Поддерживается формат Polygon с возможными отверстиями
- **Инструменты**: Рекомендуется https://geojson.io для создания координат
- **Время доставки**: Указывается в минутах от 1 до 10080 (неделя)
- **Склады**: Координаты склада должны быть в виде строк
- **Полигоны**: Минимум 3 точки, максимум 1000 точек на полигон
- **Rate Limiting**: Максимум 50 запросов в минуту
- **Валидация**: Полигон должен быть замкнутым (первая точка = последняя)

Polygon API предоставляет мощные инструменты для создания гибкой системы зональной доставки, позволяя точно настроить географическое покрытие и время доставки для каждой зоны.