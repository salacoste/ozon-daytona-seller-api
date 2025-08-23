# Promos API

Promos API для управления акциями и скидками с 8 методами для участия в промо-кампаниях Ozon.

## Обзор

Promos API предоставляет инструменты для участия в акциях Ozon, управления скидками и обработки заявок покупателей на льготные цены.

**Основные возможности:**
- 🎯 Просмотр доступных акций Ozon
- 📋 Получение списка товаров-кандидатов для акций
- 🚀 Добавление и удаление товаров из акций
- 💰 Обработка заявок покупателей на скидки
- 📊 Мониторинг участвующих товаров
- ⚡ Автоматизация промо-кампаний

## Доступные методы

### Управление акциями

**getActions()** - Список доступных акций
```typescript
const actions = await promosApi.getActions();
```

**getCandidates(request)** - Товары-кандидаты для акции
```typescript
const candidates = await promosApi.getCandidates({
  action_id: 12345,
  limit: 100,
  last_id: 0
});
```

**getParticipatingProducts(request)** - Участвующие в акции товары
```typescript
const participants = await promosApi.getParticipatingProducts({
  action_id: 12345,
  limit: 100
});
```

### Добавление и удаление товаров

**activateProducts(request)** - Добавить товары в акцию
```typescript
const activation = await promosApi.activateProducts({
  action_id: 12345,
  products: [{
    product_id: 67890,
    action_price: '999',
    stock: 50
  }]
});
```

**deactivateProducts(request)** - Удалить товары из акции
```typescript
const deactivation = await promosApi.deactivateProducts({
  action_id: 12345,
  product_ids: [67890, 11111]
});
```

### Заявки на скидки

**getDiscountTasks(request)** - Список заявок на скидку
```typescript
const tasks = await promosApi.getDiscountTasks({
  status: 'NEW',
  limit: 50,
  page: 1
});
```

**approveDiscountTasks(request)** - Согласовать заявки на скидку
```typescript
const approval = await promosApi.approveDiscountTasks({
  tasks: [{
    task_id: 'task_123',
    product_id: 67890,
    discount_percentage: 15
  }]
});
```

**declineDiscountTasks(request)** - Отклонить заявки на скидку
```typescript
const decline = await promosApi.declineDiscountTasks({
  tasks: [{
    task_id: 'task_456',
    product_id: 67890,
    decline_reason: 'Слишком большая скидка'
  }]
});
```

## TypeScript интерфейсы

```typescript
// Основные запросы
interface PromosGetProductsRequest {
  action_id: number;
  limit?: number;
  last_id?: number;
  page?: number;
}

interface PromosGetDiscountTasksRequest {
  status?: "NEW" | "SEEN" | "APPROVED" | "DECLINED";
  limit?: number;
  page?: number;
  product_id?: number;
}

interface PromosApproveDiscountTasksRequest {
  tasks: Array<{
    task_id: string;
    product_id: number;
    discount_percentage: number;
    action_price?: string;
  }>;
}

interface PromosDeclineDiscountTasksRequest {
  tasks: Array<{
    task_id: string;
    product_id: number;
    decline_reason: string;
  }>;
}

interface PromosActivateProductsRequest {
  action_id: number;
  products: Array<{
    product_id: number;
    action_price: string;
    stock?: number;
  }>;
}

interface PromosDeactivateProductsRequest {
  action_id: number;
  product_ids: number[];
}

// Ответы
interface PromosGetActionsResponse {
  result: Array<{
    id: number;
    title: string;
    description: string;
    date_start: string;
    date_end: string;
    status: "ACTIVE" | "UPCOMING" | "FINISHED" | "CANCELLED";
    is_participating_available: boolean;
    action_type: string;
    conditions: {
      min_discount_percentage?: number;
      max_discount_percentage?: number;
      min_action_price?: string;
      max_action_price?: string;
      categories?: number[];
      brands?: string[];
    };
    participation_info: {
      total_products: number;
      participating_products: number;
      max_products_allowed?: number;
    };
  }>;
}

interface PromosGetProductsResponse {
  result: {
    products: Array<{
      product_id: number;
      name: string;
      offer_id: string;
      sku: number;
      price: string;
      old_price?: string;
      currency_code: string;
      action_price?: string;
      stock?: number;
      is_available: boolean;
      restrictions?: Array<{
        type: string;
        message: string;
      }>;
    }>;
    has_next: boolean;
    last_id: number;
    total: number;
  };
}

interface PromosGetDiscountTasksResponse {
  result: Array<{
    task_id: string;
    product_id: number;
    product_name: string;
    offer_id: string;
    sku: number;
    current_price: string;
    desired_price: string;
    discount_percentage: number;
    status: "NEW" | "SEEN" | "APPROVED" | "DECLINED";
    customer_count: number;
    created_at: string;
    expires_at: string;
  }>;
  total: number;
  has_next: boolean;
}

interface PromosProcessDiscountTasksResponse {
  result: {
    processed_count: number;
    success_count: number;
    error_count: number;
    errors?: Array<{
      task_id: string;
      error_message: string;
    }>;
  };
}

interface PromosActivateProductsResponse {
  result: {
    results: Array<{
      product_id: number;
      is_updated: boolean;
      errors?: string[];
    }>;
  };
}

interface PromosDeactivateProductsResponse {
  result: {
    results: Array<{
      product_id: number;
      is_updated: boolean;
      errors?: string[];
    }>;
  };
}
```

## Примеры использования

### Участие в акции Ozon
```typescript
// 1. Получение списка доступных акций
const actions = await promosApi.getActions();

const suitableActions = actions.result.filter(action => 
  action.status === "ACTIVE" && 
  action.is_participating_available &&
  action.conditions.min_discount_percentage <= 20
);

// 2. Анализ товаров-кандидатов
for (const action of suitableActions) {
  console.log(`\nАнализ акции: ${action.title}`);
  console.log(`Период: ${action.date_start} - ${action.date_end}`);
  
  const candidates = await promosApi.getCandidates({
    action_id: action.id,
    limit: 100
  });

  const suitableCandidates = candidates.result.products.filter(product => 
    product.is_available && 
    parseInt(product.price) > 500 // минимальная цена
  );

  console.log(`Подходящих товаров: ${suitableCandidates.length}`);

  // 3. Добавление товаров в акцию
  if (suitableCandidates.length > 0) {
    const productsToActivate = suitableCandidates.slice(0, 10).map(product => ({
      product_id: product.product_id,
      action_price: (parseInt(product.price) * 0.85).toString(), // скидка 15%
      stock: 50
    }));

    const activationResult = await promosApi.activateProducts({
      action_id: action.id,
      products: productsToActivate
    });

    console.log(`Успешно добавлено: ${activationResult.result.results.filter(r => r.is_updated).length} товаров`);
  }
}
```

### Обработка заявок на скидки
```typescript
// Получение новых заявок на скидки
const newTasks = await promosApi.getDiscountTasks({
  status: 'NEW',
  limit: 50
});

console.log(`Новых заявок на скидки: ${newTasks.result.length}`);

// Анализ и обработка заявок
const tasksToApprove: PromosApproveDiscountTasksRequest['tasks'] = [];
const tasksToDecline: PromosDeclineDiscountTasksRequest['tasks'] = [];

newTasks.result.forEach(task => {
  const currentPrice = parseInt(task.current_price);
  const desiredPrice = parseInt(task.desired_price);
  const discountPercent = ((currentPrice - desiredPrice) / currentPrice) * 100;

  console.log(`\nЗаявка на товар: ${task.product_name}`);
  console.log(`Текущая цена: ${task.current_price}, желаемая: ${task.desired_price}`);
  console.log(`Скидка: ${discountPercent.toFixed(1)}%`);
  console.log(`Количество покупателей: ${task.customer_count}`);

  // Автоматическое принятие решений
  if (discountPercent <= 15 && task.customer_count >= 5) {
    // Одобряем скидки до 15% при наличии 5+ покупателей
    tasksToApprove.push({
      task_id: task.task_id,
      product_id: task.product_id,
      discount_percentage: Math.min(discountPercent, 15)
    });
  } else if (discountPercent > 25) {
    // Отклоняем слишком большие скидки
    tasksToDecline.push({
      task_id: task.task_id,
      product_id: task.product_id,
      decline_reason: `Слишком большая скидка: ${discountPercent.toFixed(1)}%`
    });
  }
});

// Пакетное одобрение заявок
if (tasksToApprove.length > 0) {
  const approvalResult = await promosApi.approveDiscountTasks({
    tasks: tasksToApprove
  });
  console.log(`\nОдобрено заявок: ${approvalResult.result.success_count}`);
}

// Пакетное отклонение заявок
if (tasksToDecline.length > 0) {
  const declineResult = await promosApi.declineDiscountTasks({
    tasks: tasksToDecline
  });
  console.log(`Отклонено заявок: ${declineResult.result.success_count}`);
}
```

### Мониторинг активных промо-кампаний
```typescript
// Проверка участвующих товаров во всех акциях
const actions = await promosApi.getActions();
const activeActions = actions.result.filter(a => a.status === "ACTIVE");

for (const action of activeActions) {
  const participants = await promosApi.getParticipatingProducts({
    action_id: action.id,
    limit: 1000
  });

  console.log(`\nАкция: ${action.title}`);
  console.log(`Участвует товаров: ${participants.result.products.length}`);
  
  // Анализ производительности товаров в акции
  const lowStockProducts = participants.result.products.filter(p => 
    p.stock !== undefined && p.stock < 10
  );
  
  const expensiveProducts = participants.result.products.filter(p => 
    parseFloat(p.action_price || "0") > parseFloat(p.price) * 1.1
  );

  if (lowStockProducts.length > 0) {
    console.log(`⚠️ Товары с низким остатком: ${lowStockProducts.length}`);
    
    // Можно автоматически удалить товары с нулевым остатком
    const zeroStockProducts = lowStockProducts
      .filter(p => p.stock === 0)
      .map(p => p.product_id);

    if (zeroStockProducts.length > 0) {
      await promosApi.deactivateProducts({
        action_id: action.id,
        product_ids: zeroStockProducts
      });
      console.log(`Удалено товаров без остатка: ${zeroStockProducts.length}`);
    }
  }

  if (expensiveProducts.length > 0) {
    console.log(`💰 Товары с высокой ценой в акции: ${expensiveProducts.length}`);
  }
}
```

## Сложные сценарии

### PromoCampaignManager - Автоматизированная система промо-кампаний
```typescript
class PromoCampaignManager {
  constructor(private api: PromosApi) {}

  async runAutomatedPromoStrategy(): Promise<PromoStrategyResult> {
    // 1. Анализ доступных акций
    const availableActions = await this.getOptimalActions();
    
    // 2. Подбор товаров для каждой акции
    const campaignPlan = await this.createCampaignPlan(availableActions);
    
    // 3. Исполнение плана
    const executionResults = await this.executeCampaignPlan(campaignPlan);
    
    // 4. Обработка заявок на скидки
    const discountResults = await this.processDiscountRequests();
    
    return {
      campaigns_executed: executionResults.length,
      total_products_activated: executionResults.reduce((sum, r) => sum + r.activated_count, 0),
      discount_tasks_processed: discountResults.processed_count,
      estimated_revenue_boost: this.calculateRevenueImpact(executionResults),
      recommendations: this.generateRecommendations(executionResults)
    };
  }

  private async getOptimalActions(): Promise<OptimalAction[]> {
    const actions = await this.api.getActions();
    
    return actions.result
      .filter(action => 
        action.status === "ACTIVE" && 
        action.is_participating_available &&
        new Date(action.date_end) > new Date(Date.now() + 24 * 60 * 60 * 1000) // минимум сутки до окончания
      )
      .map(action => ({
        ...action,
        priority: this.calculateActionPriority(action)
      }))
      .sort((a, b) => b.priority - a.priority)
      .slice(0, 5); // топ-5 акций
  }

  private calculateActionPriority(action: any): number {
    let score = 0;
    
    // Длительность акции (чем дольше, тем лучше)
    const daysLeft = Math.ceil((new Date(action.date_end).getTime() - Date.now()) / (24 * 60 * 60 * 1000));
    score += Math.min(daysLeft * 2, 20);
    
    // Тип акции (некоторые типы более выгодные)
    if (action.action_type === "FLASH_SALE") score += 15;
    if (action.action_type === "CATEGORY_PROMOTION") score += 10;
    
    // Ограничения на скидку (чем меньше минимальная скидка, тем лучше)
    if (action.conditions.min_discount_percentage) {
      score += Math.max(0, 20 - action.conditions.min_discount_percentage);
    }
    
    // Уже участвующие товары (не переполненная акция лучше)
    const participationRate = action.participation_info.participating_products / 
                             (action.participation_info.max_products_allowed || 1000);
    if (participationRate < 0.5) score += 10;
    
    return score;
  }

  private async createCampaignPlan(actions: OptimalAction[]): Promise<CampaignPlan[]> {
    const plans: CampaignPlan[] = [];
    
    for (const action of actions) {
      const candidates = await this.api.getCandidates({
        action_id: action.id,
        limit: 500
      });

      const selectedProducts = this.selectOptimalProducts(candidates.result.products, action);
      
      if (selectedProducts.length > 0) {
        plans.push({
          action_id: action.id,
          action_title: action.title,
          products: selectedProducts,
          expected_sales_boost: this.estimateSalesBoost(selectedProducts, action)
        });
      }
    }
    
    return plans;
  }

  private selectOptimalProducts(candidates: any[], action: any): PromoProduct[] {
    return candidates
      .filter(candidate => candidate.is_available)
      .map(candidate => ({
        product_id: candidate.product_id,
        name: candidate.name,
        current_price: parseFloat(candidate.price),
        suggested_action_price: this.calculateOptimalActionPrice(candidate, action),
        expected_margin: this.calculateExpectedMargin(candidate, action),
        priority_score: this.calculateProductPriority(candidate, action)
      }))
      .sort((a, b) => b.priority_score - a.priority_score)
      .slice(0, 50); // максимум 50 товаров на акцию
  }

  private async processDiscountRequests(): Promise<DiscountProcessResult> {
    const tasks = await this.api.getDiscountTasks({
      status: 'NEW',
      limit: 100
    });

    const decisions = this.analyzeDiscountRequests(tasks.result);
    
    // Пакетное одобрение
    if (decisions.approve.length > 0) {
      await this.api.approveDiscountTasks({ tasks: decisions.approve });
    }
    
    // Пакетное отклонение
    if (decisions.decline.length > 0) {
      await this.api.declineDiscountTasks({ tasks: decisions.decline });
    }

    return {
      processed_count: decisions.approve.length + decisions.decline.length,
      approved_count: decisions.approve.length,
      declined_count: decisions.decline.length,
      total_potential_revenue: decisions.approve.reduce((sum, task) => 
        sum + (parseFloat(task.discount_percentage.toString()) * task.product_id), 0)
    };
  }
}

interface OptimalAction {
  id: number;
  title: string;
  description: string;
  date_start: string;
  date_end: string;
  status: string;
  priority: number;
}

interface CampaignPlan {
  action_id: number;
  action_title: string;
  products: PromoProduct[];
  expected_sales_boost: number;
}

interface PromoProduct {
  product_id: number;
  name: string;
  current_price: number;
  suggested_action_price: number;
  expected_margin: number;
  priority_score: number;
}

interface PromoStrategyResult {
  campaigns_executed: number;
  total_products_activated: number;
  discount_tasks_processed: number;
  estimated_revenue_boost: number;
  recommendations: string[];
}
```

### SmartDiscountAnalyzer - Интеллектуальный анализатор скидок
```typescript
class SmartDiscountAnalyzer {
  constructor(private api: PromosApi) {}

  async analyzeDiscountOpportunities(): Promise<DiscountAnalysisReport> {
    // Получение всех заявок на скидки
    const allTasks = await this.getAllDiscountTasks();
    
    // Группировка по товарам и анализ трендов
    const productAnalysis = this.groupTasksByProduct(allTasks);
    
    // Анализ сезонности и трендов
    const trends = this.analyzeTrends(allTasks);
    
    // Конкурентный анализ
    const competitiveInsights = this.analyzeCompetitivePosition(allTasks);
    
    return {
      total_discount_requests: allTasks.length,
      unique_products: Object.keys(productAnalysis).length,
      average_discount_requested: this.calculateAverageDiscount(allTasks),
      trend_analysis: trends,
      competitive_insights: competitiveInsights,
      high_demand_products: this.identifyHighDemandProducts(productAnalysis),
      pricing_recommendations: this.generatePricingRecommendations(productAnalysis)
    };
  }

  private async getAllDiscountTasks(): Promise<DiscountTask[]> {
    const tasks: DiscountTask[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await this.api.getDiscountTasks({
        limit: 100,
        page: page
      });

      tasks.push(...response.result);
      hasMore = response.has_next;
      page++;

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    return tasks;
  }

  private analyzeTrends(tasks: DiscountTask[]): TrendAnalysis {
    const dailyRequests = new Map<string, number>();
    const weeklyDiscounts = new Map<number, number[]>();

    tasks.forEach(task => {
      const date = task.created_at.split('T')[0];
      dailyRequests.set(date, (dailyRequests.get(date) || 0) + 1);

      const week = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
      if (!weeklyDiscounts.has(week)) {
        weeklyDiscounts.set(week, []);
      }
      weeklyDiscounts.get(week)!.push(task.discount_percentage);
    });

    return {
      peak_request_days: this.findPeakDays(dailyRequests),
      average_weekly_discount: this.calculateWeeklyAverages(weeklyDiscounts),
      seasonal_patterns: this.identifySeasonalPatterns(dailyRequests),
      growth_rate: this.calculateGrowthRate(dailyRequests)
    };
  }

  private generatePricingRecommendations(productAnalysis: Map<number, ProductDiscountInfo>): PricingRecommendation[] {
    const recommendations: PricingRecommendation[] = [];

    productAnalysis.forEach((info, productId) => {
      const avgRequestedDiscount = info.requests.reduce((sum, r) => sum + r.discount_percentage, 0) / info.requests.length;
      const totalCustomerInterest = info.requests.reduce((sum, r) => sum + r.customer_count, 0);

      if (totalCustomerInterest >= 20 && avgRequestedDiscount <= 15) {
        recommendations.push({
          product_id: productId,
          recommendation_type: "PROACTIVE_DISCOUNT",
          suggested_discount: Math.floor(avgRequestedDiscount * 0.8), // 80% от запрашиваемой скидки
          rationale: `Высокий интерес (${totalCustomerInterest} покупателей), разумный размер скидки`,
          priority: "HIGH",
          estimated_sales_increase: Math.floor(totalCustomerInterest * 1.5)
        });
      } else if (avgRequestedDiscount > 25) {
        recommendations.push({
          product_id: productId,
          recommendation_type: "PRICE_REVIEW",
          suggested_discount: 0,
          rationale: `Слишком высокие запросы на скидку (${avgRequestedDiscount.toFixed(1)}%) - возможно, цена завышена`,
          priority: "MEDIUM",
          estimated_sales_increase: 0
        });
      }
    });

    return recommendations.sort((a, b) => {
      const priorityOrder = { "HIGH": 3, "MEDIUM": 2, "LOW": 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }
}

interface DiscountTask {
  task_id: string;
  product_id: number;
  product_name: string;
  current_price: string;
  desired_price: string;
  discount_percentage: number;
  customer_count: number;
  created_at: string;
  status: string;
}

interface DiscountAnalysisReport {
  total_discount_requests: number;
  unique_products: number;
  average_discount_requested: number;
  trend_analysis: TrendAnalysis;
  competitive_insights: CompetitiveInsights;
  high_demand_products: HighDemandProduct[];
  pricing_recommendations: PricingRecommendation[];
}
```

## Обработка ошибок

```typescript
try {
  const activationResult = await promosApi.activateProducts({
    action_id: 12345,
    products: [{
      product_id: 67890,
      action_price: '999',
      stock: 50
    }]
  });

  activationResult.result.results.forEach(result => {
    if (!result.is_updated && result.errors) {
      console.error(`Ошибки для товара ${result.product_id}:`, result.errors);
    }
  });
} catch (error) {
  if (error.response?.status === 400) {
    console.error("Ошибка валидации:", error.response.data);
  } else if (error.response?.status === 403) {
    console.error("Недостаточно прав для участия в акции");
  } else {
    console.error("Неожиданная ошибка:", error.message);
  }
}
```

## Лучшие практики

### Стратегия участия в акциях
```typescript
// Анализ ROI перед участием в акции
function calculatePromoROI(product: any, actionPrice: string): number {
  const currentMargin = parseFloat(product.price) * 0.3; // предполагаемая маржа 30%
  const actionMargin = parseFloat(actionPrice) * 0.3;
  const expectedSalesIncrease = 2.5; // ожидаемый рост продаж в 2.5 раза
  
  const currentProfit = currentMargin * 10; // текущая прибыль с 10 продаж
  const actionProfit = actionMargin * 10 * expectedSalesIncrease;
  
  return (actionProfit - currentProfit) / currentProfit;
}

// Автоматическое управление остатками в акциях
async function managePromoStock(
  promosApi: PromosApi, 
  actionId: number, 
  targetStockLevel: number
): Promise<void> {
  const participants = await promosApi.getParticipatingProducts({
    action_id: actionId,
    limit: 1000
  });

  const lowStockProducts = participants.result.products.filter(p => 
    p.stock !== undefined && p.stock < targetStockLevel
  );

  if (lowStockProducts.length > 0) {
    console.log(`Товары с низким остатком в акции ${actionId}: ${lowStockProducts.length}`);
    
    // Здесь можно интегрироваться с системой пополнения остатков
    // или временно удалить товары из акции
  }
}
```

### Оптимизация обработки заявок
```typescript
// Умная система принятия решений по заявкам на скидки
class DiscountDecisionEngine {
  private readonly rules = [
    {
      condition: (task: any) => task.discount_percentage <= 10 && task.customer_count >= 3,
      action: "APPROVE",
      priority: 1
    },
    {
      condition: (task: any) => task.discount_percentage <= 20 && task.customer_count >= 10,
      action: "APPROVE", 
      priority: 2
    },
    {
      condition: (task: any) => task.discount_percentage > 30,
      action: "DECLINE",
      priority: 1,
      reason: "Слишком большая скидка"
    }
  ];

  processTask(task: any): { action: string; reason?: string } {
    for (const rule of this.rules.sort((a, b) => a.priority - b.priority)) {
      if (rule.condition(task)) {
        return {
          action: rule.action,
          reason: rule.reason
        };
      }
    }
    return { action: "MANUAL_REVIEW" };
  }
}
```

## Интеграционные заметки

- **Rate Limiting**: API поддерживает до 500 запросов в минуту для акций
- **Batch Operations**: Рекомендуется обрабатывать товары и заявки пакетами
- **Real-time Updates**: Статусы акций обновляются в режиме реального времени
- **Stock Synchronization**: Остатки товаров в акциях должны синхронизироваться с основными остатками
- **Price Validation**: Цены в акциях проверяются на соответствие минимальным требованиям
- **Action Limits**: Существуют лимиты на количество товаров в одной акции
- **Geographic Restrictions**: Некоторые акции могут быть доступны только в определенных регионах