# Product API

Product API для управления товарами в каталоге продавца с 23 методами для комплексного управления товарным ассортиментом.

## Обзор

Product API обеспечивает полный жизненный цикл товаров от создания до архивирования. Включает управление атрибутами, изображениями, SKU, ценами, остатками и метаинформацией.

**Основные возможности:**
- 📦 Архивирование и восстановление товаров
- 📋 Получение списков товаров с фильтрацией
- 🔧 Обновление атрибутов и характеристик
- 📤 Импорт товаров по SKU
- 🖼️ Управление изображениями
- 📊 Мониторинг цен и остатков
- ⭐ Анализ рейтингов и отзывов
- 🔗 Связанные SKU и рекомендации

## Доступные методы

### Управление жизненным циклом товаров

**archiveProducts(request)** - Архивирование товаров
```typescript
const result = await productApi.archiveProducts({
  product_id: [123456, 789012, 345678]
});
```

**unarchiveProducts(request)** - Разархивирование товаров
```typescript
const result = await productApi.unarchiveProducts({
  product_id: [123456, 789012]
});
```

**deleteProducts(request)** - Удаление товаров
```typescript
const result = await productApi.deleteProducts({
  offers: [
    { offer_id: "ITEM001" },
    { product_id: 123456 }
  ]
});
```

### Получение информации о товарах

**getProductsList(request)** - Список товаров
```typescript
const products = await productApi.getProductsList({
  filter: {
    offer_id: ["ITEM001", "ITEM002"],
    visibility: "VISIBLE"
  },
  limit: 100
});
```

**getProductInfo(request)** - Подробная информация о товаре
```typescript
const info = await productApi.getProductInfo({
  sku: 987654321,
  offer_id: "ITEM001",
  product_id: 123456
});
```

**getProductInfoListV3(request)** - Расширенная информация V3
```typescript
const infoList = await productApi.getProductInfoListV3({
  filter: {
    offer_id: ["ITEM001", "ITEM002"],
    product_id: [123456, 789012]
  },
  limit: 50
});
```

### Импорт и управление товарами

**importProductsBySku(request)** - Импорт по SKU
```typescript
const importResult = await productApi.importProductsBySku({
  items: [
    { sku: 987654321, offer_id: "ITEM001" },
    { sku: 123456789, offer_id: "ITEM002" }
  ]
});
```

**importProducts(request)** - Общий импорт товаров
```typescript
const result = await productApi.importProducts({
  items: [
    {
      offer_id: "NEW_ITEM",
      barcode: "1234567890123",
      category_id: 15621,
      name: "Новый товар",
      price: "1500",
      old_price: "2000",
      currency_code: "RUB",
      attributes: [
        {
          complex_id: 0,
          id: 85,
          values: [{ dictionary_value_id: 971082156 }]
        }
      ]
    }
  ]
});
```

**getImportProductsInfo(request)** - Статус импорта
```typescript
const status = await productApi.getImportProductsInfo({
  task_id: "task_123456"
});
```

### Управление атрибутами и характеристиками

**updateProductAttributes(request)** - Обновление атрибутов
```typescript
const result = await productApi.updateProductAttributes({
  items: [
    {
      offer_id: "ITEM001",
      attributes: [
        {
          complex_id: 0,
          id: 85,
          values: [{ dictionary_value_id: 971082156 }]
        }
      ]
    }
  ]
});
```

**getProductAttributes(request)** - Атрибуты товара
```typescript
const attributes = await productApi.getProductAttributes({
  filter: {
    offer_id: ["ITEM001"],
    visibility: "VISIBLE"
  },
  limit: 100
});
```

**getCertificationTypes(request)** - Типы сертификации
```typescript
const certTypes = await productApi.getCertificationTypes({
  category_id: 15621,
  type_id: 1
});
```

### Управление изображениями

**importProductPictures(request)** - Импорт изображений
```typescript
const result = await productApi.importProductPictures({
  product_id: 123456,
  images: [
    {
      file_name: "product1.jpg",
      url: "https://example.com/images/product1.jpg"
    },
    {
      file_name: "product2.jpg",
      url: "https://example.com/images/product2.jpg"
    }
  ]
});
```

**getProductPictures(request)** - Получение изображений
```typescript
const pictures = await productApi.getProductPictures({
  product_id: [123456, 789012]
});
```

### Цены и остатки

**getProductStocks(request)** - Остатки товаров
```typescript
const stocks = await productApi.getProductStocks({
  filter: {
    offer_id: ["ITEM001", "ITEM002"],
    visibility: "VISIBLE"
  },
  limit: 100
});
```

**getProductPrices(request)** - Цены товаров
```typescript
const prices = await productApi.getProductPrices({
  filter: {
    offer_id: ["ITEM001", "ITEM002"],
    visibility: "VISIBLE"
  },
  limit: 100
});
```

### Рейтинги и аналитика

**getProductRating(request)** - Рейтинг товара
```typescript
const rating = await productApi.getProductRating({
  products: [
    { offer_id: "ITEM001" },
    { sku: 987654321 }
  ]
});
```

**getRelatedSKU(request)** - Связанные SKU
```typescript
const relatedSku = await productApi.getRelatedSKU({
  sku: [987654321, 123456789]
});
```

### Дополнительная информация

**getDiscountedProductInfo(request)** - Информация об уценке
```typescript
const discountedInfo = await productApi.getDiscountedProductInfo({
  discounted_skus: ["987654321", "123456789"]
});
```

**getProductDescription(request)** - Описание товара
```typescript
const description = await productApi.getProductDescription({
  offer_id: "ITEM001",
  product_id: 123456
});
```

**getProductSubscription(request)** - Подписки на товар
```typescript
const subscription = await productApi.getProductSubscription({
  offer_id: "ITEM001",
  sku: 987654321
});
```

**getUploadQuota(request)** - Квота загрузки
```typescript
const quota = await productApi.getUploadQuota();
```

**updateOfferID(request)** - Обновление артикула
```typescript
const result = await productApi.updateOfferID({
  update_offer_id: [
    {
      offer_id: "OLD_ITEM",
      new_offer_id: "NEW_ITEM"
    }
  ]
});
```

## TypeScript интерфейсы

```typescript
// Основные запросы
interface ProductArchiveRequest {
  product_id: number[];
}

interface ProductUnarchiveRequest {
  product_id: number[];
}

interface ProductListRequest {
  filter: {
    offer_id?: string[];
    product_id?: number[];
    visibility?: "VISIBLE" | "INVISIBLE" | "EMPTY_STOCK" | "NOT_MODERATED" | "MODERATED" | "DISABLED" | "STATE_FAILED_MODERATION" | "READY_TO_SUPPLY" | "VALIDATION_STATE_PENDING" | "VALIDATION_STATE_FAIL" | "VALIDATION_STATE_SUCCESS" | "TO_SUPPLY" | "IN_SALE" | "REMOVED_FROM_SALE" | "BANNED" | "OVERPRICED" | "CRITICALLY_OVERPRICED" | "EMPTY_BARCODE" | "BARCODE_EXISTS" | "QUARANTINE" | "ARCHIVED" | "OVERPRICED_WITH_STOCK" | "PARTIAL_APPROVED" | "IMAGE_ABSENT" | "MODERATION_BLOCK";
  };
  sort?: "created_at" | "updated_at" | "price" | "name";
  sort_dir?: "asc" | "desc";
  limit: number;
  last_id?: string;
}

interface ProductInfoRequest {
  sku?: number;
  offer_id?: string;
  product_id?: number;
}

interface ProductImportBySKURequest {
  items: Array<{
    sku: number;
    offer_id: string;
  }>;
}

interface ProductImportRequest {
  items: Array<{
    offer_id: string;
    barcode?: string;
    category_id?: number;
    name?: string;
    price?: string;
    old_price?: string;
    currency_code?: string;
    vat?: string;
    height?: number;
    depth?: number;
    width?: number;
    dimension_unit?: string;
    weight?: number;
    weight_unit?: string;
    images?: Array<{
      file_name: string;
      default?: boolean;
    }>;
    attributes: Array<{
      complex_id: number;
      id: number;
      values: Array<{
        dictionary_value_id?: number;
        value?: string;
      }>;
    }>;
  }>;
}

interface ProductAttributesUpdateRequest {
  items: Array<{
    offer_id: string;
    attributes: Array<{
      complex_id: number;
      id: number;
      values: Array<{
        dictionary_value_id?: number;
        value?: string;
      }>;
    }>;
  }>;
}

interface ProductPicturesImportRequest {
  product_id: number;
  images: Array<{
    file_name: string;
    url: string;
  }>;
}

interface ProductOfferIDUpdateRequest {
  update_offer_id: Array<{
    offer_id: string;
    new_offer_id: string;
  }>;
}

interface ProductDeleteRequest {
  offers: Array<{
    offer_id?: string;
    product_id?: number;
  }>;
}

// Ответы
interface ProductListResponse {
  items: Array<{
    product_id: number;
    offer_id: string;
    is_fbo_visible: boolean;
    is_fbs_visible: boolean;
    archived: boolean;
    is_discounted: boolean;
  }>;
  total: number;
  last_id: string;
}

interface ProductInfoResponse {
  product_id: number;
  offer_id: string;
  barcode: string;
  category_id: number;
  name: string;
  offer_ids: string[];
  price: string;
  old_price: string;
  premium_price: string;
  currency_code: string;
  marketing_price: string;
  min_ozon_price: string;
  min_price: string;
  sources: Array<{
    is_enabled: boolean;
    sku: number;
    source: string;
  }>;
  stocks: Array<{
    coming: number;
    present: number;
    reserved: number;
    type: string;
  }>;
  errors: string[];
  vat: string;
  visible: boolean;
  visibility_details: {
    has_price: boolean;
    has_stock: boolean;
    active_product: boolean;
  };
  price_index: string;
  images: Array<{
    file_name: string;
    default: boolean;
    index: number;
  }>;
  image360: string[];
  pdf_list: Array<{
    index: number;
    name: string;
    src_url: string;
  }>;
  attributes: Array<{
    attribute_id: number;
    complex_id: number;
    values: Array<{
      dictionary_value_id: number;
      value: string;
    }>;
  }>;
  complex_attributes: any[];
  color_image: string;
  last_id: string;
  weight: number;
  dimensions: {
    height: number;
    length: number;
    weight: number;
    width: number;
  };
  description_category_id: number;
  type_id: number;
  is_kgt: boolean;
  sku: number;
  rating: string;
  tax_rate: string;
  discounted_stocks: {
    coming: number;
    present: number;
    reserved: number;
  };
  is_prepayment: boolean;
  is_prepayment_allowed: boolean;
  images360: any[];
  has_discounted_item: boolean;
  barcodes: string[];
  updated_at: string;
  price_indexes: {
    external_index_data: {
      minimal_price: string;
      minimal_price_currency: string;
      price_index_value: number;
    };
    ozon_index_data: {
      minimal_price: string;
      minimal_price_currency: string;
      price_index_value: number;
    };
    price_index: string;
    self_marketplaces_index_data: {
      minimal_price: string;
      minimal_price_currency: string;
      price_index_value: number;
    };
  };
  status: {
    state: string;
    state_failed_moderation_reasons: string[];
    moderate_status: string;
    decline_reasons: string[];
    validation_state: string;
    state_name: string;
    state_description: string;
    is_failed_moderation: boolean;
    is_created: boolean;
    state_tooltip: string;
    item_errors: Array<{
      code: string;
      field: string;
      attribute_id: number;
      attribute_name: string;
      optional_description_elements: any;
      state_description: string;
      level: string;
    }>;
    state_updated_at: string;
  };
  state: string;
  service_type: string;
  fbo_sku: number;
  fbs_sku: number;
  currency_code2: string;
  tags: any[];
  loyalty_earn_rate: number;
  created_at: string;
  parent_id: number;
  rich_content_json: string;
  primary_image: string;
  brand: string;
  acquisition?: {
    url: string;
    text: string;
  };
}

interface ProductImportResponse {
  task_id: string;
}

interface ProductImportInfoResponse {
  result: Array<{
    offer_id: string;
    product_id: number;
    status: string;
    errors: Array<{
      code: string;
      message: string;
    }>;
  }>;
}

interface ProductAttributesResponse {
  items: Array<{
    product_id: number;
    offer_id: string;
    attributes: Array<{
      attribute_id: number;
      complex_id: number;
      values: Array<{
        dictionary_value_id: number;
        value: string;
      }>;
    }>;
  }>;
  total: number;
  last_id: string;
}

interface ProductCertificationTypesResponse {
  certificate_types: Array<{
    id: number;
    name: string;
    is_required: boolean;
  }>;
}

interface ProductPicturesImportResponse {
  pictures: Array<{
    product_id: number;
    status: string;
    url: string;
    error: string;
  }>;
}

interface ProductPicturesResponse {
  items: Array<{
    product_id: number;
    images: Array<{
      file_name: string;
      default: boolean;
      index: number;
    }>;
  }>;
}

interface ProductRatingResponse {
  products: Array<{
    offer_id: string;
    sku: number;
    rating: string;
    groups: Array<{
      key: string;
      rating: string;
      count: number;
    }>;
  }>;
}

interface RelatedSKUResponse {
  items: Array<{
    sku: number;
    related_skus: number[];
  }>;
}

interface DiscountedProductInfoResponse {
  items: Array<{
    discounted_sku: number;
    original_sku: number;
    condition: string;
    defects: string[];
    discount_percentage: number;
  }>;
}

interface ProductDescriptionResponse {
  description: string;
  short_description: string;
  rich_content_json: string;
}

interface ProductSubscriptionResponse {
  subscription_info: {
    subscription_plan: string;
    is_auto_renewal: boolean;
    next_payment_date: string;
    status: string;
  };
}

interface UploadQuotaResponse {
  quota: {
    used: number;
    limit: number;
    reset_date: string;
  };
}

interface UpdateOfferIDResponse {
  errors: Array<{
    offer_id: string;
    error: string;
  }>;
}

interface DeleteProductsResponse {
  status: Array<{
    is_deleted: boolean;
    offer_id: string;
    product_id: number;
    error: string;
  }>;
}
```

## Примеры использования

### Создание нового товара
```typescript
// 1. Импорт товара
const importResult = await productApi.importProducts({
  items: [
    {
      offer_id: "SMARTPHONE_001",
      barcode: "1234567890123",
      category_id: 15621,
      name: "Смартфон Premium XY",
      price: "45000",
      old_price: "50000",
      currency_code: "RUB",
      vat: "0.20",
      height: 150,
      depth: 10,
      width: 75,
      dimension_unit: "mm",
      weight: 200,
      weight_unit: "g",
      images: [
        { file_name: "smartphone_main.jpg", default: true },
        { file_name: "smartphone_side.jpg", default: false }
      ],
      attributes: [
        {
          complex_id: 0,
          id: 85, // Бренд
          values: [{ dictionary_value_id: 971082156 }]
        },
        {
          complex_id: 0,
          id: 5076, // Цвет
          values: [{ value: "Черный" }]
        }
      ]
    }
  ]
});

// 2. Проверка статуса импорта
const status = await productApi.getImportProductsInfo({
  task_id: importResult.task_id
});

// 3. Добавление изображений
if (status.result[0].status === "imported") {
  await productApi.importProductPictures({
    product_id: status.result[0].product_id,
    images: [
      {
        file_name: "smartphone_main.jpg",
        url: "https://example.com/images/smartphone_main.jpg"
      },
      {
        file_name: "smartphone_side.jpg", 
        url: "https://example.com/images/smartphone_side.jpg"
      }
    ]
  });
}
```

### Управление каталогом товаров
```typescript
// Получение списка товаров с фильтрацией
const productsList = await productApi.getProductsList({
  filter: {
    visibility: "VISIBLE",
    offer_id: ["SMARTPHONE_001", "TABLET_002"]
  },
  sort: "updated_at",
  sort_dir: "desc",
  limit: 50
});

// Получение подробной информации
const productInfo = await productApi.getProductInfo({
  offer_id: "SMARTPHONE_001"
});

// Обновление атрибутов
await productApi.updateProductAttributes({
  items: [
    {
      offer_id: "SMARTPHONE_001",
      attributes: [
        {
          complex_id: 0,
          id: 5076, // Цвет
          values: [{ value: "Синий" }]
        },
        {
          complex_id: 0,
          id: 8229, // Память
          values: [{ value: "128 ГБ" }]
        }
      ]
    }
  ]
});
```

### Анализ производительности товаров
```typescript
// Рейтинг товаров
const ratings = await productApi.getProductRating({
  products: [
    { offer_id: "SMARTPHONE_001" },
    { offer_id: "TABLET_002" },
    { sku: 987654321 }
  ]
});

ratings.products.forEach(product => {
  console.log(`Товар ${product.offer_id}: рейтинг ${product.rating}`);
  product.groups.forEach(group => {
    console.log(`  ${group.key}: ${group.rating} (${group.count} отзывов)`);
  });
});

// Связанные товары
const relatedSkus = await productApi.getRelatedSKU({
  sku: [987654321, 123456789]
});

relatedSkus.items.forEach(item => {
  console.log(`SKU ${item.sku} связан с: ${item.related_skus.join(", ")}`);
});
```

## Сложные сценарии

### ProductCatalogManager - Система управления каталогом
```typescript
class ProductCatalogManager {
  constructor(private api: ProductApi) {}

  async createProductFamily(familyData: ProductFamilyData): Promise<ProductFamily> {
    const tasks: string[] = [];
    
    // Импорт всех товаров семейства
    for (const product of familyData.products) {
      const importResult = await this.api.importProducts({
        items: [product]
      });
      tasks.push(importResult.task_id);
    }

    // Ожидание завершения импорта
    const results = await Promise.all(
      tasks.map(taskId => this.waitForImportCompletion(taskId))
    );

    // Добавление изображений
    await Promise.all(
      results.map(result => this.addProductImages(result))
    );

    return {
      family_id: familyData.family_id,
      products: results,
      created_at: new Date().toISOString()
    };
  }

  private async waitForImportCompletion(taskId: string): Promise<ProductImportResult> {
    let attempts = 0;
    const maxAttempts = 30;

    while (attempts < maxAttempts) {
      const status = await this.api.getImportProductsInfo({ task_id: taskId });
      
      if (status.result[0].status === "imported") {
        return status.result[0];
      }
      
      if (status.result[0].status === "failed") {
        throw new Error(`Import failed: ${status.result[0].errors.map(e => e.message).join(", ")}`);
      }

      await new Promise(resolve => setTimeout(resolve, 2000));
      attempts++;
    }

    throw new Error("Import timeout");
  }

  private async addProductImages(result: ProductImportResult): Promise<void> {
    if (result.images && result.images.length > 0) {
      await this.api.importProductPictures({
        product_id: result.product_id,
        images: result.images
      });
    }
  }

  async optimizeCatalog(): Promise<CatalogOptimizationReport> {
    // Получение всех товаров
    const allProducts = await this.getAllProducts();
    
    // Анализ производительности
    const performanceAnalysis = await this.analyzePerformance(allProducts);
    
    // Рекомендации по оптимизации
    return {
      total_products: allProducts.length,
      performance_analysis: performanceAnalysis,
      recommendations: this.generateRecommendations(performanceAnalysis)
    };
  }

  private async getAllProducts(): Promise<ProductInfo[]> {
    const products: ProductInfo[] = [];
    let lastId = "";

    do {
      const response = await this.api.getProductsList({
        filter: { visibility: "VISIBLE" },
        limit: 1000,
        last_id: lastId || undefined
      });

      for (const product of response.items) {
        const detailedInfo = await this.api.getProductInfo({
          product_id: product.product_id
        });
        products.push(detailedInfo);
      }

      lastId = response.last_id;
    } while (lastId);

    return products;
  }
}

interface ProductFamilyData {
  family_id: string;
  products: ProductImportRequest['items'];
}

interface ProductFamily {
  family_id: string;
  products: ProductImportResult[];
  created_at: string;
}

interface ProductImportResult {
  offer_id: string;
  product_id: number;
  status: string;
  images?: Array<{ file_name: string; url: string; }>;
}

interface CatalogOptimizationReport {
  total_products: number;
  performance_analysis: PerformanceAnalysis;
  recommendations: string[];
}

interface PerformanceAnalysis {
  low_rating_products: number;
  missing_images: number;
  incomplete_attributes: number;
  archive_candidates: number;
}
```

### AutomatedProductAnalyzer - Система аналитики товаров
```typescript
class AutomatedProductAnalyzer {
  constructor(private api: ProductApi) {}

  async generateInsightsReport(filters?: ProductListRequest['filter']): Promise<ProductInsightsReport> {
    // Получение товаров для анализа
    const products = await this.getProductsForAnalysis(filters);
    
    // Параллельный сбор данных
    const [ratings, stocks, prices, relatedData] = await Promise.all([
      this.collectRatingsData(products),
      this.collectStocksData(products),
      this.collectPricesData(products),
      this.collectRelatedSkuData(products)
    ]);

    // Анализ трендов
    const trends = this.analyzeTrends(products, ratings, stocks, prices);
    
    // Генерация рекомендаций
    const recommendations = this.generateActionableRecommendations(
      products, ratings, stocks, prices, relatedData
    );

    return {
      analysis_date: new Date().toISOString(),
      products_analyzed: products.length,
      ratings_analysis: this.analyzeRatings(ratings),
      inventory_analysis: this.analyzeInventory(stocks),
      pricing_analysis: this.analyzePricing(prices),
      trends_analysis: trends,
      cross_selling_opportunities: this.findCrossSelling(relatedData),
      actionable_recommendations: recommendations
    };
  }

  private async collectRatingsData(products: ProductInfo[]): Promise<Map<string, ProductRating>> {
    const ratingsMap = new Map<string, ProductRating>();
    const chunkSize = 100;

    for (let i = 0; i < products.length; i += chunkSize) {
      const chunk = products.slice(i, i + chunkSize);
      const ratingsResponse = await this.api.getProductRating({
        products: chunk.map(p => ({ offer_id: p.offer_id }))
      });

      ratingsResponse.products.forEach(rating => {
        ratingsMap.set(rating.offer_id, rating);
      });

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    return ratingsMap;
  }

  private generateActionableRecommendations(
    products: ProductInfo[],
    ratings: Map<string, ProductRating>,
    stocks: Map<string, ProductStock>,
    prices: Map<string, ProductPrice>,
    relatedData: Map<number, number[]>
  ): ActionableRecommendation[] {
    const recommendations: ActionableRecommendation[] = [];

    products.forEach(product => {
      const rating = ratings.get(product.offer_id);
      const stock = stocks.get(product.offer_id);
      const price = prices.get(product.offer_id);

      // Низкий рейтинг
      if (rating && parseFloat(rating.rating) < 4.0) {
        recommendations.push({
          type: "quality_improvement",
          priority: "high",
          offer_id: product.offer_id,
          action: "Анализ отзывов и улучшение качества товара",
          expected_impact: "Повышение рейтинга на 0.5+ баллов"
        });
      }

      // Избыточные остатки
      if (stock && stock.present > 100 && stock.reserved < 10) {
        recommendations.push({
          type: "inventory_optimization",
          priority: "medium",
          offer_id: product.offer_id,
          action: "Проведение акции или снижение цены для ускорения оборачиваемости",
          expected_impact: "Снижение остатков на 30-50%"
        });
      }

      // Ценовая оптимизация
      if (price && rating && parseFloat(rating.rating) > 4.5 && parseFloat(price.price) < parseFloat(price.old_price || "0") * 0.8) {
        recommendations.push({
          type: "pricing_optimization",
          priority: "high",
          offer_id: product.offer_id,
          action: "Возможность повышения цены на 10-15% при высоком рейтинге",
          expected_impact: "Увеличение маржинальности на 10-15%"
        });
      }
    });

    return recommendations.sort((a, b) => {
      const priorityOrder = { "high": 3, "medium": 2, "low": 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }
}

interface ProductInsightsReport {
  analysis_date: string;
  products_analyzed: number;
  ratings_analysis: RatingsAnalysis;
  inventory_analysis: InventoryAnalysis;
  pricing_analysis: PricingAnalysis;
  trends_analysis: TrendsAnalysis;
  cross_selling_opportunities: CrossSellingOpportunity[];
  actionable_recommendations: ActionableRecommendation[];
}

interface ActionableRecommendation {
  type: "quality_improvement" | "inventory_optimization" | "pricing_optimization" | "marketing_boost" | "cross_selling";
  priority: "high" | "medium" | "low";
  offer_id: string;
  action: string;
  expected_impact: string;
}
```

## Обработка ошибок

```typescript
try {
  const result = await productApi.importProducts({
    items: [productData]
  });
  
  // Отслеживание статуса импорта
  const status = await productApi.getImportProductsInfo({
    task_id: result.task_id
  });
  
  status.result.forEach(item => {
    if (item.errors.length > 0) {
      console.error(`Ошибки для ${item.offer_id}:`, item.errors);
    }
  });
} catch (error) {
  if (error.response?.status === 400) {
    console.error("Ошибка валидации данных:", error.response.data);
  } else if (error.response?.status === 429) {
    console.error("Превышен лимит запросов, повтор через 60 секунд");
    await new Promise(resolve => setTimeout(resolve, 60000));
  } else {
    console.error("Неожиданная ошибка:", error.message);
  }
}
```

## Лучшие практики

### Оптимизация производительности
```typescript
// Батчинг запросов для больших объемов данных
async function batchProductOperations<T>(
  items: T[],
  operation: (batch: T[]) => Promise<any>,
  batchSize: number = 100
): Promise<any[]> {
  const results = [];
  
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const result = await operation(batch);
    results.push(result);
    
    // Rate limiting между батчами
    if (i + batchSize < items.length) {
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  }
  
  return results;
}
```

### Управление жизненным циклом товара
```typescript
class ProductLifecycleManager {
  async createProduct(productData: ProductCreationData): Promise<string> {
    // 1. Импорт → 2. Изображения → 3. Атрибуты → 4. Активация
    const importResult = await this.api.importProducts({
      items: [productData.basicInfo]
    });
    
    await this.waitForImport(importResult.task_id);
    await this.addImages(productData.images);
    await this.setAttributes(productData.attributes);
    
    return productData.basicInfo.offer_id;
  }

  async retireProduct(offerId: string): Promise<void> {
    // 1. Архивирование → 2. Анализ связанных → 3. Очистка
    const productInfo = await this.api.getProductInfo({ offer_id: offerId });
    
    await this.api.archiveProducts({
      product_id: [productInfo.product_id]
    });
    
    // Анализ влияния на связанные товары
    await this.analyzeRelatedImpact(productInfo.sku);
  }
}
```

## Интеграционные заметки

- **Rate Limiting**: API поддерживает до 1000 запросов в минуту
- **Batch Processing**: Рекомендуется обрабатывать товары партиями по 100 штук
- **Асинхронный импорт**: Импорт товаров выполняется асинхронно, требуется отслеживание статуса
- **Изображения**: Загрузка изображений выполняется отдельно после создания товара
- **Атрибуты**: Критически важны для модерации и видимости товара
- **SKU связи**: Система автоматически определяет связанные товары для кросс-продаж
- **Квоты**: Существуют лимиты на загрузку изображений и создание товаров