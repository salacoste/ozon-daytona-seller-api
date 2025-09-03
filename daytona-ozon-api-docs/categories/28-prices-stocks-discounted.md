# Prices & Stocks API — Уценённые товары

Детальная документация по методу управления уценёнными товарами: получение информации о состоянии, дефектах и связи с основными товарами для схемы FBO.

## 📋 Метод уценённых товаров (1 метод)

### 🏷️ `getDiscountedProductInfo()` — Информация об уценённых товарах

---

## 🔧 TypeScript интерфейсы

### Запросы (Requests)

```typescript
// Запрос информации об уценённых товарах
interface PricesStocksGetDiscountedInfoRequest {
  discounted_skus: string[];          // SKU уценённых товаров
}
```

### Ответы (Responses)

```typescript
// Ответ с информацией об уценённых товарах
interface PricesStocksGetDiscountedInfoResponse {
  items?: DiscountedProductInfo[];    // детальная информация по каждому товару
}

interface DiscountedProductInfo {
  // Идентификаторы
  discounted_sku: number;             // SKU уценённого товара
  sku: number;                        // SKU основного товара
  
  // Состояние товара
  condition: ConditionType;           // новый или Б/У
  condition_estimation: ConditionScale; // оценка состояния от 1 до 7
  
  // Дефекты и повреждения
  defects?: string;                   // описание дефектов
  mechanical_damage?: string;         // механические повреждения
  package_damage?: string;            // повреждения упаковки
  packaging_violation?: string;       // нарушение целостности упаковки
  shortage?: string;                  // некомплектность
  
  // Причины уценки
  reason_damaged?: DamageReason;      // причина повреждения
  comment_reason_damaged?: string;    // комментарий к причине
  
  // Ремонт и гарантия
  repair?: RepairStatus;              // статус ремонта
  warranty_type?: WarrantyType;       // тип гарантии
}

// Типы состояния товара
type ConditionType = 'NEW' | 'USED';

// Шкала оценки состояния
type ConditionScale = '1' | '2' | '3' | '4' | '5' | '6' | '7';

// Причины повреждения
type DamageReason = 
  | 'TRANSPORTATION_DAMAGE'    // повреждение при транспортировке
  | 'STORAGE_DAMAGE'           // повреждение при хранении
  | 'CUSTOMER_RETURN'          // возврат от покупателя
  | 'MANUFACTURING_DEFECT'     // заводской брак
  | 'PACKAGING_ISSUE'          // проблемы с упаковкой
  | 'OTHER';                   // другие причины

// Статус ремонта
type RepairStatus = 'NOT_REPAIRED' | 'REPAIRED' | 'NOT_REPAIRABLE';

// Тип гарантии
type WarrantyType = 'FULL_WARRANTY' | 'LIMITED_WARRANTY' | 'NO_WARRANTY';
```

---

## 🏷️ getDiscountedProductInfo() — Информация об уценённых товарах

Получает детальную информацию о состоянии и дефектах уценённого товара по его SKU, а также возвращает SKU основного товара.

### 🔥 Ключевые особенности
- **Схема**: только FBO (Fulfillment by OZON)
- **Детализация**: полное описание состояния, дефектов и причин уценки
- **Связь**: информация о связи с основным товаром
- **Оценка**: шкала состояния от 1 (удовлетворительное) до 7 (как новый)

### 💡 Бизнес-логика уценённых товаров

**Уценённые товары** — это товары с различными дефектами или повреждениями, которые продаются со скидкой. Система OZON автоматически создаёт уценённые позиции для повреждённых товаров и связывает их с основными товарами.

### 🏥 Шкала оценки состояния

```typescript
const CONDITION_SCALE: Record<ConditionScale, string> = {
  '1': 'Удовлетворительное - значительные дефекты, функционально исправен',
  '2': 'Хорошее - заметные дефекты, не влияющие на функциональность',
  '3': 'Очень хорошее - незначительные дефекты',
  '4': 'Отличное - минимальные следы использования',
  '5': 'Как новый - практически без дефектов',
  '6': 'Как новый - только упаковка повреждена',
  '7': 'Как новый - товар в идеальном состоянии'
};
```

### 📝 Примеры использования

```typescript
// Получение информации об уценённых товарах
const discountedInfo = await pricesStocksApi.getDiscountedProductInfo({
  discounted_skus: ['987654321', '123456789', '456789123']
});

// Детальный анализ уценённых товаров
discountedInfo.items?.forEach(item => {
  console.log(`\n=== Уценённый товар SKU: ${item.discounted_sku} ===`);
  console.log(`🔗 Основной товар SKU: ${item.sku}`);
  console.log(`📊 Состояние: ${item.condition}`);
  console.log(`⭐ Оценка: ${item.condition_estimation}/7 (${CONDITION_SCALE[item.condition_estimation]})`);
  
  // Информация о дефектах
  if (item.defects) {
    console.log(`🚨 Дефекты: ${item.defects}`);
  }
  
  if (item.mechanical_damage) {
    console.log(`🔧 Механические повреждения: ${item.mechanical_damage}`);
  }
  
  if (item.package_damage) {
    console.log(`📦 Повреждения упаковки: ${item.package_damage}`);
  }
  
  if (item.shortage) {
    console.log(`❌ Некомплектность: ${item.shortage}`);
  }
  
  // Причины уценки
  if (item.reason_damaged) {
    console.log(`❓ Причина уценки: ${item.reason_damaged}`);
    if (item.comment_reason_damaged) {
      console.log(`💬 Комментарий: ${item.comment_reason_damaged}`);
    }
  }
  
  // Ремонт и гарантия
  if (item.repair) {
    console.log(`🛠️ Ремонт: ${item.repair}`);
  }
  
  if (item.warranty_type) {
    console.log(`🛡️ Гарантия: ${item.warranty_type}`);
  }
});

// Группировка товаров по состоянию
function categorizeByCondition(items: DiscountedProductInfo[]): ConditionCategories {
  return items.reduce((acc, item) => {
    const condition = parseInt(item.condition_estimation);
    
    if (condition >= 5) {
      acc.excellent.push(item);
    } else if (condition >= 3) {
      acc.good.push(item);
    } else {
      acc.acceptable.push(item);
    }
    
    return acc;
  }, {
    excellent: [] as DiscountedProductInfo[],  // 5-7 баллов
    good: [] as DiscountedProductInfo[],       // 3-4 балла
    acceptable: [] as DiscountedProductInfo[]  // 1-2 балла
  });
}

interface ConditionCategories {
  excellent: DiscountedProductInfo[];
  good: DiscountedProductInfo[];
  acceptable: DiscountedProductInfo[];
}
```

### 📊 Аналитический дашборд уценённых товаров

```typescript
class DiscountedProductAnalytics {
  constructor(private api: PricesStocksApi) {}

  async generateDiscountedReport(discountedSkus: string[]): Promise<DiscountedReport> {
    const discountedInfo = await this.api.getDiscountedProductInfo({ discounted_skus: discountedSkus });
    
    if (!discountedInfo.items || discountedInfo.items.length === 0) {
      return this.getEmptyReport();
    }

    return {
      totalProducts: discountedInfo.items.length,
      conditionAnalysis: this.analyzeConditions(discountedInfo.items),
      defectAnalysis: this.analyzeDefects(discountedInfo.items),
      reasonAnalysis: this.analyzeReasons(discountedInfo.items),
      repairAnalysis: this.analyzeRepairs(discountedInfo.items),
      warrantyAnalysis: this.analyzeWarranty(discountedInfo.items),
      recommendedActions: this.generateRecommendations(discountedInfo.items)
    };
  }

  private analyzeConditions(items: DiscountedProductInfo[]): ConditionAnalysis {
    const conditionCounts = new Map<ConditionScale, number>();
    const newVsUsed = { NEW: 0, USED: 0 };

    items.forEach(item => {
      // Подсчёт по шкале оценки
      const currentCount = conditionCounts.get(item.condition_estimation) || 0;
      conditionCounts.set(item.condition_estimation, currentCount + 1);
      
      // Подсчёт новых vs б/у
      if (item.condition === 'NEW') {
        newVsUsed.NEW++;
      } else {
        newVsUsed.USED++;
      }
    });

    // Группировка по качеству
    const qualityGroups = this.groupByQuality(items);

    return {
      conditionDistribution: Array.from(conditionCounts.entries()).map(([scale, count]) => ({
        scale,
        count,
        percentage: (count / items.length * 100),
        description: CONDITION_SCALE[scale]
      })),
      newVsUsed,
      qualityGroups: {
        excellent: qualityGroups.excellent.length,
        good: qualityGroups.good.length,
        acceptable: qualityGroups.acceptable.length
      },
      averageCondition: this.calculateAverageCondition(items)
    };
  }

  private analyzeDefects(items: DiscountedProductInfo[]): DefectAnalysis {
    const defectTypes = {
      mechanical: items.filter(i => i.mechanical_damage).length,
      packaging: items.filter(i => i.package_damage || i.packaging_violation).length,
      shortage: items.filter(i => i.shortage).length,
      general: items.filter(i => i.defects).length,
      noDefects: items.filter(i => !i.defects && !i.mechanical_damage && !i.package_damage).length
    };

    const totalWithDefects = items.length - defectTypes.noDefects;

    return {
      totalWithDefects,
      defectPercentage: (totalWithDefects / items.length * 100),
      defectTypes,
      commonDefects: this.findCommonDefects(items),
      severity: this.calculateDefectSeverity(items)
    };
  }

  private analyzeReasons(items: DiscountedProductInfo[]): ReasonAnalysis {
    const reasonCounts = new Map<string, number>();

    items.forEach(item => {
      if (item.reason_damaged) {
        const currentCount = reasonCounts.get(item.reason_damaged) || 0;
        reasonCounts.set(item.reason_damaged, currentCount + 1);
      }
    });

    return {
      totalWithReasons: Array.from(reasonCounts.values()).reduce((sum, count) => sum + count, 0),
      reasonDistribution: Array.from(reasonCounts.entries()).map(([reason, count]) => ({
        reason: reason as DamageReason,
        count,
        percentage: (count / items.length * 100)
      })).sort((a, b) => b.count - a.count),
      topReasons: Array.from(reasonCounts.entries())
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3)
    };
  }

  private analyzeRepairs(items: DiscountedProductInfo[]): RepairAnalysis {
    const repairCounts = { repaired: 0, notRepaired: 0, notRepairable: 0, unknown: 0 };

    items.forEach(item => {
      switch (item.repair) {
        case 'REPAIRED':
          repairCounts.repaired++;
          break;
        case 'NOT_REPAIRED':
          repairCounts.notRepaired++;
          break;
        case 'NOT_REPAIRABLE':
          repairCounts.notRepairable++;
          break;
        default:
          repairCounts.unknown++;
      }
    });

    return repairCounts;
  }

  private analyzeWarranty(items: DiscountedProductInfo[]): WarrantyAnalysis {
    const warrantyCounts = { full: 0, limited: 0, none: 0, unknown: 0 };

    items.forEach(item => {
      switch (item.warranty_type) {
        case 'FULL_WARRANTY':
          warrantyCounts.full++;
          break;
        case 'LIMITED_WARRANTY':
          warrantyCounts.limited++;
          break;
        case 'NO_WARRANTY':
          warrantyCounts.none++;
          break;
        default:
          warrantyCounts.unknown++;
      }
    });

    return warrantyCounts;
  }

  private generateRecommendations(items: DiscountedProductInfo[]): Recommendation[] {
    const recommendations: Recommendation[] = [];

    // Рекомендации по товарам с высокой оценкой состояния
    const excellentItems = items.filter(i => parseInt(i.condition_estimation) >= 5);
    if (excellentItems.length > 0) {
      recommendations.push({
        type: 'OPTIMIZE_PRICING',
        priority: 'HIGH',
        message: `${excellentItems.length} товаров имеют высокую оценку состояния (5-7)`,
        action: 'Рассмотрите увеличение цены или маркетинговое продвижение'
      });
    }

    // Рекомендации по товарам с дефектами упаковки
    const packagingIssues = items.filter(i => i.package_damage || i.packaging_violation);
    if (packagingIssues.length > 0) {
      recommendations.push({
        type: 'IMPROVE_PACKAGING',
        priority: 'MEDIUM',
        message: `${packagingIssues.length} товаров с проблемами упаковки`,
        action: 'Улучшите процессы упаковки и транспортировки'
      });
    }

    // Рекомендации по товарам без гарантии
    const noWarrantyItems = items.filter(i => i.warranty_type === 'NO_WARRANTY');
    if (noWarrantyItems.length > items.length * 0.3) {
      recommendations.push({
        type: 'WARRANTY_REVIEW',
        priority: 'LOW',
        message: `${noWarrantyItems.length} товаров без гарантии`,
        action: 'Рассмотрите возможность предоставления ограниченной гарантии'
      });
    }

    return recommendations;
  }

  private groupByQuality(items: DiscountedProductInfo[]): ConditionCategories {
    return categorizeByCondition(items);
  }

  private calculateAverageCondition(items: DiscountedProductInfo[]): number {
    const total = items.reduce((sum, item) => sum + parseInt(item.condition_estimation), 0);
    return total / items.length;
  }

  private findCommonDefects(items: DiscountedProductInfo[]): string[] {
    const defectMap = new Map<string, number>();

    items.forEach(item => {
      if (item.defects) {
        const currentCount = defectMap.get(item.defects) || 0;
        defectMap.set(item.defects, currentCount + 1);
      }
    });

    return Array.from(defectMap.entries())
      .filter(([, count]) => count >= 2) // Встречается минимум у 2 товаров
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([defect]) => defect);
  }

  private calculateDefectSeverity(items: DiscountedProductInfo[]): 'LOW' | 'MEDIUM' | 'HIGH' {
    const averageCondition = this.calculateAverageCondition(items);
    
    if (averageCondition >= 5) {
      return 'LOW';
    } else if (averageCondition >= 3) {
      return 'MEDIUM';
    } else {
      return 'HIGH';
    }
  }

  private getEmptyReport(): DiscountedReport {
    return {
      totalProducts: 0,
      conditionAnalysis: {
        conditionDistribution: [],
        newVsUsed: { NEW: 0, USED: 0 },
        qualityGroups: { excellent: 0, good: 0, acceptable: 0 },
        averageCondition: 0
      },
      defectAnalysis: {
        totalWithDefects: 0,
        defectPercentage: 0,
        defectTypes: { mechanical: 0, packaging: 0, shortage: 0, general: 0, noDefects: 0 },
        commonDefects: [],
        severity: 'LOW'
      },
      reasonAnalysis: {
        totalWithReasons: 0,
        reasonDistribution: [],
        topReasons: []
      },
      repairAnalysis: { repaired: 0, notRepaired: 0, notRepairable: 0, unknown: 0 },
      warrantyAnalysis: { full: 0, limited: 0, none: 0, unknown: 0 },
      recommendedActions: []
    };
  }
}

interface DiscountedReport {
  totalProducts: number;
  conditionAnalysis: ConditionAnalysis;
  defectAnalysis: DefectAnalysis;
  reasonAnalysis: ReasonAnalysis;
  repairAnalysis: RepairAnalysis;
  warrantyAnalysis: WarrantyAnalysis;
  recommendedActions: Recommendation[];
}

interface ConditionAnalysis {
  conditionDistribution: {
    scale: ConditionScale;
    count: number;
    percentage: number;
    description: string;
  }[];
  newVsUsed: { NEW: number; USED: number };
  qualityGroups: { excellent: number; good: number; acceptable: number };
  averageCondition: number;
}

interface DefectAnalysis {
  totalWithDefects: number;
  defectPercentage: number;
  defectTypes: {
    mechanical: number;
    packaging: number;
    shortage: number;
    general: number;
    noDefects: number;
  };
  commonDefects: string[];
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
}

interface ReasonAnalysis {
  totalWithReasons: number;
  reasonDistribution: {
    reason: DamageReason;
    count: number;
    percentage: number;
  }[];
  topReasons: [string, number][];
}

interface RepairAnalysis {
  repaired: number;
  notRepaired: number;
  notRepairable: number;
  unknown: number;
}

interface WarrantyAnalysis {
  full: number;
  limited: number;
  none: number;
  unknown: number;
}

interface Recommendation {
  type: 'OPTIMIZE_PRICING' | 'IMPROVE_PACKAGING' | 'WARRANTY_REVIEW' | 'QUALITY_CONTROL';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  message: string;
  action: string;
}
```

### 🔄 Автоматизированная система управления уценкой

```typescript
class DiscountedProductManager {
  constructor(private api: PricesStocksApi) {}

  async optimizeDiscountedPricing(skus: string[]): Promise<PricingOptimizationResult> {
    // Получаем информацию об уценённых товарах
    const discountedInfo = await this.api.getDiscountedProductInfo({ discounted_skus: skus });
    
    if (!discountedInfo.items) {
      return { optimized: 0, recommendations: [] };
    }

    const recommendations: PricingRecommendation[] = [];

    discountedInfo.items.forEach(item => {
      const recommendation = this.calculateOptimalDiscount(item);
      if (recommendation) {
        recommendations.push(recommendation);
      }
    });

    return {
      optimized: recommendations.length,
      recommendations
    };
  }

  private calculateOptimalDiscount(item: DiscountedProductInfo): PricingRecommendation | null {
    const conditionScore = parseInt(item.condition_estimation);
    let suggestedDiscount = 0;

    // Базовая скидка на основе состояния
    switch (conditionScore) {
      case 7:
      case 6:
        suggestedDiscount = 10; // Минимальная скидка для товаров "как новый"
        break;
      case 5:
        suggestedDiscount = 15;
        break;
      case 4:
        suggestedDiscount = 25;
        break;
      case 3:
        suggestedDiscount = 35;
        break;
      case 2:
        suggestedDiscount = 50;
        break;
      case 1:
        suggestedDiscount = 65; // Максимальная скидка
        break;
    }

    // Корректировки на основе дефектов
    if (item.mechanical_damage) {
      suggestedDiscount += 10;
    }

    if (item.shortage) {
      suggestedDiscount += 15;
    }

    if (item.packaging_violation && !item.package_damage) {
      suggestedDiscount += 5; // Только нарушение упаковки без повреждения
    }

    // Корректировки на основе ремонта
    if (item.repair === 'REPAIRED') {
      suggestedDiscount -= 5; // Уменьшаем скидку для отремонтированных товаров
    } else if (item.repair === 'NOT_REPAIRABLE') {
      suggestedDiscount += 20;
    }

    // Корректировки на основе гарантии
    if (item.warranty_type === 'FULL_WARRANTY') {
      suggestedDiscount -= 10;
    } else if (item.warranty_type === 'NO_WARRANTY') {
      suggestedDiscount += 10;
    }

    // Ограничиваем скидку в разумных пределах
    suggestedDiscount = Math.max(5, Math.min(80, suggestedDiscount));

    return {
      discountedSku: item.discounted_sku,
      originalSku: item.sku,
      currentCondition: conditionScore,
      suggestedDiscount,
      reasoning: this.generateReasoningText(item, suggestedDiscount),
      confidence: this.calculateConfidence(item, conditionScore)
    };
  }

  private generateReasoningText(item: DiscountedProductInfo, discount: number): string {
    const reasons: string[] = [];
    
    reasons.push(`Состояние ${item.condition_estimation}/7`);
    
    if (item.mechanical_damage) {
      reasons.push('механические повреждения');
    }
    
    if (item.shortage) {
      reasons.push('некомплектность');
    }
    
    if (item.repair === 'REPAIRED') {
      reasons.push('товар отремонтирован');
    }
    
    if (item.warranty_type === 'FULL_WARRANTY') {
      reasons.push('полная гарантия');
    } else if (item.warranty_type === 'NO_WARRANTY') {
      reasons.push('без гарантии');
    }

    return `Скидка ${discount}% на основе: ${reasons.join(', ')}`;
  }

  private calculateConfidence(item: DiscountedProductInfo, conditionScore: number): number {
    let confidence = 0.7; // Базовый уровень уверенности

    // Увеличиваем уверенность, если есть детальная информация
    if (item.defects) confidence += 0.1;
    if (item.reason_damaged) confidence += 0.1;
    if (item.warranty_type) confidence += 0.05;

    // Высокие и низкие оценки состояния более предсказуемы
    if (conditionScore >= 6 || conditionScore <= 2) {
      confidence += 0.05;
    }

    return Math.min(1.0, confidence);
  }

  async monitorDiscountedPerformance(skus: string[]): Promise<PerformanceReport> {
    const discountedInfo = await this.api.getDiscountedProductInfo({ discounted_skus: skus });
    
    // Здесь должна быть интеграция с Analytics API для получения данных о продажах
    // const salesData = await this.getSalesData(skus);
    
    return {
      totalProducts: discountedInfo.items?.length || 0,
      avgConditionScore: discountedInfo.items ? 
        discountedInfo.items.reduce((sum, item) => sum + parseInt(item.condition_estimation), 0) / discountedInfo.items.length : 0,
      recommendations: [
        'Отслеживайте конверсию уценённых товаров',
        'Сравнивайте продажи с основными товарами',
        'Анализируйте влияние скидки на скорость продаж'
      ]
    };
  }
}

interface PricingOptimizationResult {
  optimized: number;
  recommendations: PricingRecommendation[];
}

interface PricingRecommendation {
  discountedSku: number;
  originalSku: number;
  currentCondition: number;
  suggestedDiscount: number;
  reasoning: string;
  confidence: number;
}

interface PerformanceReport {
  totalProducts: number;
  avgConditionScore: number;
  recommendations: string[];
}
```

---

## 🔗 Интеграция с основными товарами

```typescript
class DiscountedProductIntegration {
  constructor(private api: PricesStocksApi) {}

  async linkDiscountedToOriginal(discountedSkus: string[]): Promise<ProductLink[]> {
    const discountedInfo = await this.api.getDiscountedProductInfo({ discounted_skus: discountedSkus });
    
    if (!discountedInfo.items) {
      return [];
    }

    return discountedInfo.items.map(item => ({
      discountedSku: item.discounted_sku.toString(),
      originalSku: item.sku.toString(),
      condition: item.condition,
      conditionScore: parseInt(item.condition_estimation),
      hasDefects: !!(item.defects || item.mechanical_damage || item.package_damage),
      isRepairable: item.repair !== 'NOT_REPAIRABLE',
      hasWarranty: item.warranty_type !== 'NO_WARRANTY'
    }));
  }

  async compareWithOriginalPrices(links: ProductLink[]): Promise<PriceComparison[]> {
    // Получаем цены основных товаров
    const originalSkus = links.map(link => link.originalSku);
    
    // Здесь должен быть вызов getPrices для основных товаров
    // const originalPrices = await this.api.getPrices({...});
    
    // Здесь должен быть вызов getPrices для уценённых товаров  
    // const discountedPrices = await this.api.getPrices({...});
    
    // Возвращаем mock данные для примера
    return links.map(link => ({
      originalSku: link.originalSku,
      discountedSku: link.discountedSku,
      originalPrice: 1000, // Заглушка
      discountedPrice: 700, // Заглушка
      discountPercentage: 30,
      conditionJustified: link.conditionScore >= 3 ? true : false
    }));
  }

  generateDiscountRecommendations(comparisons: PriceComparison[]): DiscountRecommendation[] {
    return comparisons.map(comparison => {
      let recommendedDiscount = 0;
      let reasoning = '';

      // Логика рекомендаций на основе сравнения цен
      if (comparison.conditionJustified) {
        recommendedDiscount = Math.min(comparison.discountPercentage + 5, 40);
        reasoning = 'Можно увеличить цену из-за хорошего состояния';
      } else {
        recommendedDiscount = Math.max(comparison.discountPercentage + 10, 50);
        reasoning = 'Рекомендуется увеличить скидку из-за плохого состояния';
      }

      return {
        discountedSku: comparison.discountedSku,
        currentDiscount: comparison.discountPercentage,
        recommendedDiscount,
        reasoning,
        priceImpact: comparison.originalPrice * (recommendedDiscount - comparison.discountPercentage) / 100
      };
    });
  }
}

interface ProductLink {
  discountedSku: string;
  originalSku: string;
  condition: ConditionType;
  conditionScore: number;
  hasDefects: boolean;
  isRepairable: boolean;
  hasWarranty: boolean;
}

interface PriceComparison {
  originalSku: string;
  discountedSku: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  conditionJustified: boolean;
}

interface DiscountRecommendation {
  discountedSku: string;
  currentDiscount: number;
  recommendedDiscount: number;
  reasoning: string;
  priceImpact: number;
}
```

---

## 🎯 Лучшие практики работы с уценёнными товарами

### ✅ Рекомендуемые подходы

1. **Регулярный аудит**: Проводите анализ уценённых товаров ежемесячно
2. **Оптимальная скидка**: Корректируйте скидку в зависимости от состояния товара
3. **Детальные описания**: Используйте подробные описания дефектов в карточках товаров
4. **Категоризация**: Группируйте товары по типу дефектов для лучшего управления
5. **Мониторинг продаж**: Отслеживайте конверсию уценённых товаров vs основных

### ⚠️ Частые ошибки

- **Неадекватные скидки**: слишком малые скидки для товаров с серьёзными дефектами
- **Игнорирование состояния**: одинаковые скидки для товаров с разным состоянием
- **Отсутствие описаний**: недостаточно детальные описания дефектов
- **Неправильное позиционирование**: продажа товаров в плохом состоянии без предупреждений

### 📊 KPI для уценённых товаров

- **Средняя оценка состояния**: > 4 балла
- **Конверсия уценённых товаров**: отношение к основным товарам
- **Время продажи**: скорость реализации по сравнению с основными товарами
- **Процент возвратов**: должен быть ниже среднего по категории