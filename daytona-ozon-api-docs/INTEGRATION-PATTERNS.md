# 🔗 Паттерны интеграции OZON Seller API

Архитектурные решения и лучшие практики для интеграции с OZON Seller API.

## 📚 Содержание

- [Архитектурные паттерны](#архитектурные-паттерны)
- [Управление состоянием](#управление-состоянием)
- [Обработка ошибок](#обработка-ошибок)
- [Производительность](#производительность)
- [Безопасность](#безопасность)
- [Примеры архитектур](#примеры-архитектур)

## 🏗️ Архитектурные паттерны

### 1. Service Layer Pattern

Разделение бизнес-логики на отдельные сервисы для каждой области функциональности.

```typescript
// Базовый класс сервиса
abstract class BaseService {
  constructor(protected api: OzonSellerAPI) {}
  
  protected async withRetry<T>(operation: () => Promise<T>, maxRetries: number = 3): Promise<T> {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        if (attempt === maxRetries) throw error;
        await this.delay(Math.pow(2, attempt) * 1000);
      }
    }
    throw new Error('All retries exhausted');
  }
  
  protected delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Сервис управления товарами
class ProductService extends BaseService {
  async syncProduct(productData: ProductData): Promise<ProductSyncResult> {
    return this.withRetry(async () => {
      // 1. Проверяем существование товара
      const existingProduct = await this.findExistingProduct(productData.sku);
      
      if (existingProduct) {
        // 2. Обновляем существующий товар
        return await this.updateProduct(existingProduct.id, productData);
      } else {
        // 3. Создаем новый товар
        return await this.createProduct(productData);
      }
    });
  }
  
  private async findExistingProduct(sku: string): Promise<Product | null> {
    const products = await this.api.product.getList({
      filter: { offer_id: [sku] },
      limit: 1
    });
    
    return products.result?.items?.[0] || null;
  }
  
  private async createProduct(productData: ProductData): Promise<ProductSyncResult> {
    const createResult = await this.api.product.create([{
      name: productData.name,
      offer_id: productData.sku,
      category_id: productData.categoryId,
      price: productData.price.toString(),
      // ... остальные поля
    }]);
    
    const productId = createResult.result[0].product_id;
    
    // Устанавливаем остатки
    await this.api.pricesStocks.updateStocks([{
      product_id: productId,
      stock: productData.stock
    }]);
    
    return {
      success: true,
      productId,
      action: 'created'
    };
  }
  
  private async updateProduct(productId: number, productData: ProductData): Promise<ProductSyncResult> {
    // Обновляем информацию о товаре
    await this.api.product.updateInfo([{
      product_id: productId,
      name: productData.name,
      // ... остальные поля
    }]);
    
    // Обновляем цену
    await this.api.pricesStocks.updatePrices([{
      product_id: productId,
      price: productData.price.toString()
    }]);
    
    // Обновляем остатки
    await this.api.pricesStocks.updateStocks([{
      product_id: productId,
      stock: productData.stock
    }]);
    
    return {
      success: true,
      productId,
      action: 'updated'
    };
  }
}

// Сервис обработки заказов
class OrderService extends BaseService {
  async processNewOrders(): Promise<OrderProcessingResult[]> {
    const orders = await this.api.fbs.getOrdersList({
      filter: { status: 'awaiting_packaging' },
      limit: 100
    });
    
    const results: OrderProcessingResult[] = [];
    
    for (const order of orders.result) {
      try {
        const result = await this.processOrder(order);
        results.push(result);
      } catch (error) {
        results.push({
          orderId: order.posting_number,
          success: false,
          error: error.message
        });
      }
    }
    
    return results;
  }
  
  private async processOrder(order: any): Promise<OrderProcessingResult> {
    // 1. Проверяем доступность товаров
    const availabilityCheck = await this.checkOrderAvailability(order);
    if (!availabilityCheck.available) {
      throw new Error(`Insufficient stock: ${availabilityCheck.message}`);
    }
    
    // 2. Упаковываем заказ
    await this.api.fbs.packOrder({
      posting_number: order.posting_number,
      packages: [{
        products: order.products.map(p => ({
          product_id: p.product_id,
          quantity: p.quantity
        }))
      }]
    });
    
    // 3. Генерируем трек-номер и отгружаем
    const trackingNumber = await this.generateTrackingNumber();
    
    await this.api.fbs.shipOrder({
      posting_number: order.posting_number,
      tracking_number: trackingNumber,
      shipping_provider_id: 1
    });
    
    return {
      orderId: order.posting_number,
      success: true,
      trackingNumber
    };
  }
  
  private async checkOrderAvailability(order: any): Promise<AvailabilityCheck> {
    // Логика проверки наличия товаров
    return { available: true, message: '' };
  }
  
  private async generateTrackingNumber(): Promise<string> {
    return `TRACK_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
```

### 2. Repository Pattern

Абстракция доступа к данным для упрощения тестирования и смены источников данных.

```typescript
// Интерфейс репозитория
interface IProductRepository {
  getById(id: number): Promise<Product | null>;
  getByOfferIds(offerIds: string[]): Promise<Product[]>;
  create(productData: CreateProductData): Promise<Product>;
  update(id: number, updates: UpdateProductData): Promise<Product>;
  updatePrices(priceUpdates: PriceUpdate[]): Promise<void>;
  updateStocks(stockUpdates: StockUpdate[]): Promise<void>;
}

// Реализация для OZON API
class OzonProductRepository implements IProductRepository {
  constructor(private api: OzonSellerAPI) {}
  
  async getById(id: number): Promise<Product | null> {
    try {
      const response = await this.api.product.getInfo({ product_id: id });
      return this.mapApiProductToProduct(response.result);
    } catch (error) {
      if (error.code === 'PRODUCT_NOT_FOUND') {
        return null;
      }
      throw error;
    }
  }
  
  async getByOfferIds(offerIds: string[]): Promise<Product[]> {
    const response = await this.api.product.getList({
      filter: { offer_id: offerIds },
      limit: offerIds.length
    });
    
    return response.result?.items?.map(this.mapApiProductToProduct) || [];
  }
  
  async create(productData: CreateProductData): Promise<Product> {
    const response = await this.api.product.create([{
      name: productData.name,
      offer_id: productData.offerId,
      category_id: productData.categoryId,
      price: productData.price.toString(),
      // ... mapping остальных полей
    }]);
    
    const createdProductId = response.result[0].product_id;
    
    // Получаем созданный товар
    const product = await this.getById(createdProductId);
    if (!product) {
      throw new Error('Failed to retrieve created product');
    }
    
    return product;
  }
  
  async update(id: number, updates: UpdateProductData): Promise<Product> {
    await this.api.product.updateInfo([{
      product_id: id,
      name: updates.name,
      // ... mapping обновлений
    }]);
    
    const updatedProduct = await this.getById(id);
    if (!updatedProduct) {
      throw new Error('Failed to retrieve updated product');
    }
    
    return updatedProduct;
  }
  
  async updatePrices(priceUpdates: PriceUpdate[]): Promise<void> {
    const apiUpdates = priceUpdates.map(update => ({
      product_id: update.productId,
      price: update.price.toString()
    }));
    
    await this.api.pricesStocks.updatePrices(apiUpdates);
  }
  
  async updateStocks(stockUpdates: StockUpdate[]): Promise<void> {
    const apiUpdates = stockUpdates.map(update => ({
      product_id: update.productId,
      stock: update.stock
    }));
    
    await this.api.pricesStocks.updateStocks(apiUpdates);
  }
  
  private mapApiProductToProduct(apiProduct: any): Product {
    return {
      id: apiProduct.id,
      offerId: apiProduct.offer_id,
      name: apiProduct.name,
      price: parseFloat(apiProduct.marketing_price || '0'),
      stock: apiProduct.stocks?.coming || 0,
      // ... mapping остальных полей
    };
  }
}

// Использование в сервисе
class ProductManagementService {
  constructor(
    private productRepo: IProductRepository,
    private eventBus: EventBus
  ) {}
  
  async syncProducts(externalProducts: ExternalProduct[]): Promise<SyncResult> {
    const results = [];
    
    for (const externalProduct of externalProducts) {
      try {
        const existingProduct = await this.productRepo.getById(externalProduct.id);
        
        if (existingProduct) {
          const updatedProduct = await this.productRepo.update(existingProduct.id, {
            name: externalProduct.name,
            price: externalProduct.price
          });
          
          results.push({ action: 'updated', product: updatedProduct });
          this.eventBus.emit('product.updated', updatedProduct);
        } else {
          const newProduct = await this.productRepo.create({
            name: externalProduct.name,
            offerId: externalProduct.sku,
            categoryId: externalProduct.categoryId,
            price: externalProduct.price
          });
          
          results.push({ action: 'created', product: newProduct });
          this.eventBus.emit('product.created', newProduct);
        }
      } catch (error) {
        results.push({ action: 'error', error: error.message });
      }
    }
    
    return { results, totalProcessed: externalProducts.length };
  }
}
```

### 3. Event-Driven Architecture

Использование событий для слабосвязанной архитектуры и асинхронной обработки.

```typescript
// Система событий
class EventBus {
  private listeners: Map<string, Function[]> = new Map();
  
  on(event: string, listener: Function): void {
    const eventListeners = this.listeners.get(event) || [];
    eventListeners.push(listener);
    this.listeners.set(event, eventListeners);
  }
  
  emit(event: string, data: any): void {
    const eventListeners = this.listeners.get(event) || [];
    eventListeners.forEach(listener => {
      // Асинхронный вызов для неблокирующей обработки
      setImmediate(() => {
        try {
          listener(data);
        } catch (error) {
          console.error(`Error in event listener for ${event}:`, error);
        }
      });
    });
  }
}

// Типы событий
interface OrderEvents {
  'order.created': { order: Order };
  'order.shipped': { order: Order; trackingNumber: string };
  'order.cancelled': { order: Order; reason: string };
}

interface ProductEvents {
  'product.created': { product: Product };
  'product.updated': { product: Product };
  'product.stock.low': { product: Product; currentStock: number };
}

// Обработчики событий
class NotificationHandler {
  constructor(private eventBus: EventBus) {
    this.setupEventListeners();
  }
  
  private setupEventListeners(): void {
    this.eventBus.on('order.shipped', this.handleOrderShipped.bind(this));
    this.eventBus.on('product.stock.low', this.handleLowStock.bind(this));
  }
  
  private async handleOrderShipped(data: { order: Order; trackingNumber: string }): Promise<void> {
    // Отправляем уведомление покупателю
    await this.sendCustomerNotification(data.order, data.trackingNumber);
    
    // Логируем событие
    console.log(`Order ${data.order.id} shipped with tracking ${data.trackingNumber}`);
  }
  
  private async handleLowStock(data: { product: Product; currentStock: number }): Promise<void> {
    // Отправляем алерт менеджеру
    await this.sendStockAlert(data.product, data.currentStock);
  }
  
  private async sendCustomerNotification(order: Order, trackingNumber: string): Promise<void> {
    // Реализация отправки уведомления
  }
  
  private async sendStockAlert(product: Product, stock: number): Promise<void> {
    // Реализация отправки алерта
  }
}

// Интеграция с основными сервисами
class OrderProcessingService {
  constructor(
    private api: OzonSellerAPI,
    private eventBus: EventBus
  ) {}
  
  async shipOrder(orderId: string, trackingNumber: string): Promise<void> {
    const order = await this.getOrderById(orderId);
    
    await this.api.fbs.shipOrder({
      posting_number: orderId,
      tracking_number: trackingNumber,
      shipping_provider_id: 1
    });
    
    // Генерируем событие
    this.eventBus.emit('order.shipped', { order, trackingNumber });
  }
  
  private async getOrderById(orderId: string): Promise<Order> {
    // Реализация получения заказа
    return {} as Order;
  }
}
```

### 4. Command Pattern

Инкапсуляция операций в команды для лучшей организации кода и возможности отмены операций.

```typescript
// Базовая команда
abstract class Command {
  abstract execute(): Promise<any>;
  abstract undo?(): Promise<void>;
}

// Команды для товаров
class CreateProductCommand extends Command {
  constructor(
    private api: OzonSellerAPI,
    private productData: CreateProductData
  ) {
    super();
  }
  
  async execute(): Promise<Product> {
    const response = await this.api.product.create([{
      name: this.productData.name,
      offer_id: this.productData.offerId,
      category_id: this.productData.categoryId,
      price: this.productData.price.toString()
    }]);
    
    const productId = response.result[0].product_id;
    
    // Сохраняем ID для возможной отмены
    this.createdProductId = productId;
    
    return {
      id: productId,
      name: this.productData.name,
      offerId: this.productData.offerId,
      price: this.productData.price
    };
  }
  
  async undo(): Promise<void> {
    if (this.createdProductId) {
      await this.api.product.archive([this.createdProductId]);
    }
  }
  
  private createdProductId?: number;
}

class UpdatePricesCommand extends Command {
  constructor(
    private api: OzonSellerAPI,
    private priceUpdates: PriceUpdate[]
  ) {
    super();
  }
  
  async execute(): Promise<void> {
    // Сохраняем старые цены для возможной отмены
    this.oldPrices = await this.getCurrentPrices(this.priceUpdates.map(u => u.productId));
    
    const apiUpdates = this.priceUpdates.map(update => ({
      product_id: update.productId,
      price: update.price.toString()
    }));
    
    await this.api.pricesStocks.updatePrices(apiUpdates);
  }
  
  async undo(): Promise<void> {
    if (this.oldPrices.length > 0) {
      await this.api.pricesStocks.updatePrices(this.oldPrices);
    }
  }
  
  private async getCurrentPrices(productIds: number[]): Promise<any[]> {
    // Получаем текущие цены товаров
    return [];
  }
  
  private oldPrices: any[] = [];
}

// Менеджер команд
class CommandManager {
  private history: Command[] = [];
  private currentIndex = -1;
  
  async execute(command: Command): Promise<any> {
    const result = await command.execute();
    
    // Добавляем команду в историю
    this.history = this.history.slice(0, this.currentIndex + 1);
    this.history.push(command);
    this.currentIndex++;
    
    return result;
  }
  
  async undo(): Promise<void> {
    if (this.currentIndex >= 0) {
      const command = this.history[this.currentIndex];
      
      if (command.undo) {
        await command.undo();
      }
      
      this.currentIndex--;
    }
  }
  
  canUndo(): boolean {
    return this.currentIndex >= 0;
  }
  
  getHistory(): Command[] {
    return [...this.history];
  }
}

// Использование
class ProductManagementFacade {
  constructor(
    private api: OzonSellerAPI,
    private commandManager: CommandManager
  ) {}
  
  async createProduct(productData: CreateProductData): Promise<Product> {
    const command = new CreateProductCommand(this.api, productData);
    return await this.commandManager.execute(command);
  }
  
  async updatePrices(priceUpdates: PriceUpdate[]): Promise<void> {
    const command = new UpdatePricesCommand(this.api, priceUpdates);
    await this.commandManager.execute(command);
  }
  
  async undoLastOperation(): Promise<void> {
    if (this.commandManager.canUndo()) {
      await this.commandManager.undo();
    } else {
      throw new Error('No operations to undo');
    }
  }
}
```

## 🔄 Управление состоянием

### 1. State Machine Pattern

Управление сложными жизненными циклами сущностей с четкими переходами состояний.

```typescript
// Состояния заказа
enum OrderState {
  AWAITING_PACKAGING = 'awaiting_packaging',
  PACKAGING = 'packaging',
  AWAITING_DELIVER = 'awaiting_deliver',
  DELIVERING = 'delivering',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}

// События заказа
enum OrderEvent {
  PACK = 'pack',
  SHIP = 'ship',
  DELIVER = 'deliver',
  CANCEL = 'cancel'
}

// Конфигурация состояний
const orderStateMachine = {
  [OrderState.AWAITING_PACKAGING]: {
    [OrderEvent.PACK]: OrderState.PACKAGING,
    [OrderEvent.CANCEL]: OrderState.CANCELLED
  },
  [OrderState.PACKAGING]: {
    [OrderEvent.SHIP]: OrderState.AWAITING_DELIVER,
    [OrderEvent.CANCEL]: OrderState.CANCELLED
  },
  [OrderState.AWAITING_DELIVER]: {
    [OrderEvent.DELIVER]: OrderState.DELIVERING,
    [OrderEvent.CANCEL]: OrderState.CANCELLED
  },
  [OrderState.DELIVERING]: {
    [OrderEvent.DELIVER]: OrderState.DELIVERED
  },
  [OrderState.DELIVERED]: {},
  [OrderState.CANCELLED]: {}
};

// Менеджер состояний заказа
class OrderStateMachine {
  constructor(
    private api: OzonSellerAPI,
    private eventBus: EventBus
  ) {}
  
  async transition(order: Order, event: OrderEvent): Promise<Order> {
    const currentState = order.state;
    const allowedTransitions = orderStateMachine[currentState];
    
    if (!allowedTransitions[event]) {
      throw new Error(
        `Invalid transition from ${currentState} with event ${event}`
      );
    }
    
    const newState = allowedTransitions[event];
    
    // Выполняем действия при переходе
    await this.performTransitionActions(order, event, newState);
    
    // Обновляем состояние заказа
    const updatedOrder = { ...order, state: newState };
    
    // Генерируем событие
    this.eventBus.emit('order.state.changed', {
      order: updatedOrder,
      previousState: currentState,
      event
    });
    
    return updatedOrder;
  }
  
  private async performTransitionActions(
    order: Order,
    event: OrderEvent,
    newState: OrderState
  ): Promise<void> {
    switch (event) {
      case OrderEvent.PACK:
        await this.packOrder(order);
        break;
        
      case OrderEvent.SHIP:
        await this.shipOrder(order);
        break;
        
      case OrderEvent.CANCEL:
        await this.cancelOrder(order);
        break;
    }
  }
  
  private async packOrder(order: Order): Promise<void> {
    await this.api.fbs.packOrder({
      posting_number: order.id,
      packages: [{
        products: order.products.map(p => ({
          product_id: p.productId,
          quantity: p.quantity
        }))
      }]
    });
  }
  
  private async shipOrder(order: Order): Promise<void> {
    const trackingNumber = this.generateTrackingNumber();
    
    await this.api.fbs.shipOrder({
      posting_number: order.id,
      tracking_number: trackingNumber,
      shipping_provider_id: 1
    });
  }
  
  private async cancelOrder(order: Order): Promise<void> {
    await this.api.cancellation.cancelFbsOrder({
      posting_number: order.id,
      cancel_reason_id: 352,
      cancel_reason_message: 'Отмена по запросу'
    });
  }
  
  private generateTrackingNumber(): string {
    return `TRACK_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
```

### 2. Context Pattern

Управление контекстом операций с автоматической очисткой ресурсов.

```typescript
// Контекст операции
class OperationContext {
  private resources: Map<string, any> = new Map();
  private cleanup: Function[] = [];
  
  constructor(
    private api: OzonSellerAPI,
    private operationType: string
  ) {}
  
  addResource(name: string, resource: any): void {
    this.resources.set(name, resource);
  }
  
  getResource<T>(name: string): T | undefined {
    return this.resources.get(name);
  }
  
  onCleanup(cleanupFn: Function): void {
    this.cleanup.push(cleanupFn);
  }
  
  async dispose(): Promise<void> {
    for (const cleanupFn of this.cleanup.reverse()) {
      try {
        await cleanupFn();
      } catch (error) {
        console.error('Error during cleanup:', error);
      }
    }
    
    this.resources.clear();
    this.cleanup.length = 0;
  }
}

// Использование контекста
async function withOperationContext<T>(
  api: OzonSellerAPI,
  operationType: string,
  operation: (context: OperationContext) => Promise<T>
): Promise<T> {
  const context = new OperationContext(api, operationType);
  
  try {
    return await operation(context);
  } finally {
    await context.dispose();
  }
}

// Пример использования
async function bulkUpdateProducts(
  api: OzonSellerAPI,
  products: ProductUpdate[]
): Promise<BulkUpdateResult> {
  return withOperationContext(api, 'bulk-update-products', async (context) => {
    // Создаем временный файл для логирования
    const logFile = fs.createWriteStream('./bulk-update.log');
    context.addResource('logFile', logFile);
    context.onCleanup(() => logFile.close());
    
    // Создаем прогресс-трекер
    const progressTracker = new ProgressTracker(products.length);
    context.addResource('progressTracker', progressTracker);
    
    const results: UpdateResult[] = [];
    
    for (const product of products) {
      try {
        const result = await updateSingleProduct(api, product);
        results.push(result);
        
        logFile.write(`SUCCESS: ${product.id}\n`);
        progressTracker.increment();
      } catch (error) {
        results.push({
          productId: product.id,
          success: false,
          error: error.message
        });
        
        logFile.write(`ERROR: ${product.id} - ${error.message}\n`);
        progressTracker.increment();
      }
    }
    
    return {
      totalProcessed: products.length,
      successful: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length,
      results
    };
  });
}
```

## 🔧 Производительность

### 1. Batch Processing

Эффективная обработка больших объемов данных с помощью батчинга.

```typescript
class BatchProcessor<T, R> {
  constructor(
    private batchSize: number = 1000,
    private concurrency: number = 3,
    private delayBetweenBatches: number = 1000
  ) {}
  
  async process(
    items: T[],
    processor: (batch: T[]) => Promise<R[]>
  ): Promise<R[]> {
    const batches = this.createBatches(items, this.batchSize);
    const results: R[] = [];
    
    // Обрабатываем батчи с ограничением параллелизма
    for (let i = 0; i < batches.length; i += this.concurrency) {
      const batchGroup = batches.slice(i, i + this.concurrency);
      
      const batchPromises = batchGroup.map(async (batch, index) => {
        try {
          const batchResults = await processor(batch);
          console.log(
            `Batch ${i + index + 1}/${batches.length} completed: ${batch.length} items`
          );
          return batchResults;
        } catch (error) {
          console.error(`Batch ${i + index + 1} failed:`, error);
          return [];
        }
      });
      
      const batchGroupResults = await Promise.all(batchPromises);
      results.push(...batchGroupResults.flat());
      
      // Задержка между группами батчей
      if (i + this.concurrency < batches.length) {
        await this.delay(this.delayBetweenBatches);
      }
    }
    
    return results;
  }
  
  private createBatches<T>(items: T[], batchSize: number): T[][] {
    const batches: T[][] = [];
    
    for (let i = 0; i < items.length; i += batchSize) {
      batches.push(items.slice(i, i + batchSize));
    }
    
    return batches;
  }
  
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Использование для обновления цен
class PricingService {
  constructor(private api: OzonSellerAPI) {}
  
  async updatePricesBulk(priceUpdates: PriceUpdate[]): Promise<void> {
    const batchProcessor = new BatchProcessor<PriceUpdate, void>(
      1000, // размер батча
      2,    // параллелизм
      500   // задержка между батчами
    );
    
    await batchProcessor.process(
      priceUpdates,
      async (batch) => {
        const apiUpdates = batch.map(update => ({
          product_id: update.productId,
          price: update.price.toString()
        }));
        
        await this.api.pricesStocks.updatePrices(apiUpdates);
        return []; // void результат
      }
    );
  }
}
```

### 2. Caching Strategy

Многоуровневое кэширование для повышения производительности.

```typescript
// Интерфейс кэша
interface ICache {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttl?: number): Promise<void>;
  delete(key: string): Promise<void>;
  clear(): Promise<void>;
}

// Реализация кэша в памяти
class MemoryCache implements ICache {
  private cache = new Map<string, { value: any; expires: number }>();
  
  async get<T>(key: string): Promise<T | null> {
    const entry = this.cache.get(key);
    
    if (!entry) return null;
    
    if (Date.now() > entry.expires) {
      this.cache.delete(key);
      return null;
    }
    
    return entry.value;
  }
  
  async set<T>(key: string, value: T, ttl: number = 300000): Promise<void> {
    this.cache.set(key, {
      value,
      expires: Date.now() + ttl
    });
  }
  
  async delete(key: string): Promise<void> {
    this.cache.delete(key);
  }
  
  async clear(): Promise<void> {
    this.cache.clear();
  }
}

// Сервис с кэшированием
class CachedProductService {
  constructor(
    private api: OzonSellerAPI,
    private cache: ICache
  ) {}
  
  async getProduct(productId: number): Promise<Product> {
    const cacheKey = `product:${productId}`;
    
    // Пытаемся получить из кэша
    const cached = await this.cache.get<Product>(cacheKey);
    if (cached) {
      return cached;
    }
    
    // Получаем из API
    const response = await this.api.product.getInfo({ product_id: productId });
    const product = this.mapApiProduct(response.result);
    
    // Кэшируем на 5 минут
    await this.cache.set(cacheKey, product, 300000);
    
    return product;
  }
  
  async updateProduct(productId: number, updates: ProductUpdate): Promise<Product> {
    // Обновляем через API
    await this.api.product.updateInfo([{
      product_id: productId,
      ...updates
    }]);
    
    // Инвалидируем кэш
    await this.cache.delete(`product:${productId}`);
    
    // Получаем обновленные данные
    return this.getProduct(productId);
  }
  
  private mapApiProduct(apiProduct: any): Product {
    return {
      id: apiProduct.id,
      name: apiProduct.name,
      price: parseFloat(apiProduct.marketing_price || '0'),
      // ... mapping остальных полей
    };
  }
}
```

### 3. Connection Pooling

Управление соединениями для оптимизации сетевых запросов.

```typescript
// Менеджер соединений
class ConnectionPool {
  private activeConnections = 0;
  private queue: Array<{
    resolve: Function;
    reject: Function;
    timeout: NodeJS.Timeout;
  }> = [];
  
  constructor(
    private maxConnections: number = 10,
    private queueTimeout: number = 30000
  ) {}
  
  async acquire(): Promise<void> {
    if (this.activeConnections < this.maxConnections) {
      this.activeConnections++;
      return Promise.resolve();
    }
    
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        const index = this.queue.findIndex(item => item.resolve === resolve);
        if (index >= 0) {
          this.queue.splice(index, 1);
        }
        reject(new Error('Connection pool queue timeout'));
      }, this.queueTimeout);
      
      this.queue.push({ resolve, reject, timeout });
    });
  }
  
  release(): void {
    this.activeConnections--;
    
    if (this.queue.length > 0) {
      const next = this.queue.shift()!;
      clearTimeout(next.timeout);
      this.activeConnections++;
      next.resolve();
    }
  }
  
  getStats(): { active: number; queued: number; max: number } {
    return {
      active: this.activeConnections,
      queued: this.queue.length,
      max: this.maxConnections
    };
  }
}

// HTTP клиент с пулом соединений
class PooledOzonAPI {
  private connectionPool: ConnectionPool;
  
  constructor(
    private api: OzonSellerAPI,
    maxConnections: number = 10
  ) {
    this.connectionPool = new ConnectionPool(maxConnections);
  }
  
  async makeRequest<T>(requestFn: () => Promise<T>): Promise<T> {
    await this.connectionPool.acquire();
    
    try {
      return await requestFn();
    } finally {
      this.connectionPool.release();
    }
  }
  
  async getProducts(params: any): Promise<any> {
    return this.makeRequest(() => this.api.product.getList(params));
  }
  
  async updatePrices(updates: any[]): Promise<any> {
    return this.makeRequest(() => this.api.pricesStocks.updatePrices(updates));
  }
  
  getConnectionStats() {
    return this.connectionPool.getStats();
  }
}
```

## 🛡️ Безопасность

### 1. API Key Management

Безопасное управление API ключами с ротацией и мониторингом.

```typescript
// Интерфейс провайдера секретов
interface ISecretProvider {
  getSecret(key: string): Promise<string>;
  setSecret(key: string, value: string): Promise<void>;
  rotateSecret(key: string): Promise<string>;
}

// Реализация для переменных окружения
class EnvironmentSecretProvider implements ISecretProvider {
  async getSecret(key: string): Promise<string> {
    const value = process.env[key];
    if (!value) {
      throw new Error(`Secret ${key} not found in environment`);
    }
    return value;
  }
  
  async setSecret(key: string, value: string): Promise<void> {
    process.env[key] = value;
  }
  
  async rotateSecret(key: string): Promise<string> {
    // В реальной реализации здесь была бы логика
    // запроса нового ключа из внешней системы
    const newSecret = await this.requestNewSecret(key);
    await this.setSecret(key, newSecret);
    return newSecret;
  }
  
  private async requestNewSecret(key: string): Promise<string> {
    // Заглушка для демонстрации
    return `new_secret_${Date.now()}`;
  }
}

// Менеджер API ключей
class APIKeyManager {
  private currentKeys: Map<string, string> = new Map();
  private rotationSchedule: Map<string, NodeJS.Timeout> = new Map();
  
  constructor(
    private secretProvider: ISecretProvider,
    private rotationIntervalHours: number = 24 * 7 // раз в неделю
  ) {}
  
  async initialize(): Promise<void> {
    // Загружаем ключи
    const clientId = await this.secretProvider.getSecret('OZON_CLIENT_ID');
    const apiKey = await this.secretProvider.getSecret('OZON_API_KEY');
    
    this.currentKeys.set('clientId', clientId);
    this.currentKeys.set('apiKey', apiKey);
    
    // Планируем ротацию
    this.scheduleRotation('apiKey');
  }
  
  getCredentials(): { clientId: string; apiKey: string } {
    const clientId = this.currentKeys.get('clientId');
    const apiKey = this.currentKeys.get('apiKey');
    
    if (!clientId || !apiKey) {
      throw new Error('API credentials not initialized');
    }
    
    return { clientId, apiKey };
  }
  
  private scheduleRotation(keyType: string): void {
    const intervalMs = this.rotationIntervalHours * 60 * 60 * 1000;
    
    const timeout = setTimeout(async () => {
      try {
        await this.rotateKey(keyType);
        this.scheduleRotation(keyType); // Планируем следующую ротацию
      } catch (error) {
        console.error(`Failed to rotate ${keyType}:`, error);
        // Повторяем попытку через час
        setTimeout(() => this.scheduleRotation(keyType), 60 * 60 * 1000);
      }
    }, intervalMs);
    
    this.rotationSchedule.set(keyType, timeout);
  }
  
  private async rotateKey(keyType: string): Promise<void> {
    console.log(`Rotating ${keyType}...`);
    
    const secretKey = keyType === 'apiKey' ? 'OZON_API_KEY' : 'OZON_CLIENT_ID';
    const newKey = await this.secretProvider.rotateSecret(secretKey);
    
    this.currentKeys.set(keyType, newKey);
    
    console.log(`${keyType} rotated successfully`);
  }
  
  dispose(): void {
    for (const timeout of this.rotationSchedule.values()) {
      clearTimeout(timeout);
    }
    this.rotationSchedule.clear();
  }
}

// Фабрика API с автоматической ротацией ключей
class SecureOzonAPIFactory {
  constructor(private keyManager: APIKeyManager) {}
  
  createAPI(): OzonSellerAPI {
    const credentials = this.keyManager.getCredentials();
    
    return new OzonSellerAPI({
      clientId: credentials.clientId,
      apiKey: credentials.apiKey,
      // Другие настройки безопасности
      timeout: 30000,
      retryAttempts: 3
    });
  }
}
```

### 2. Request Validation

Валидация запросов и ответов для предотвращения ошибок.

```typescript
// Схемы валидации
const productCreateSchema = {
  type: 'object',
  required: ['name', 'offer_id', 'category_id', 'price'],
  properties: {
    name: { type: 'string', minLength: 1, maxLength: 500 },
    offer_id: { type: 'string', minLength: 1, maxLength: 50 },
    category_id: { type: 'number', minimum: 1 },
    price: { type: 'string', pattern: '^\\d+\\.\\d{2}$' },
    images: {
      type: 'array',
      items: { type: 'string', format: 'uri' },
      maxItems: 15
    }
  }
};

// Валидатор
class RequestValidator {
  private ajv: any;
  
  constructor() {
    // В реальном проекте используйте AJV или подобную библиотеку
    this.ajv = null; // Заглушка
  }
  
  validate(schema: any, data: any): ValidationResult {
    // Заглушка для демонстрации
    const errors: string[] = [];
    
    if (schema.required) {
      for (const field of schema.required) {
        if (!(field in data)) {
          errors.push(`Missing required field: ${field}`);
        }
      }
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }
}

// Обертка API с валидацией
class ValidatedOzonAPI {
  constructor(
    private api: OzonSellerAPI,
    private validator: RequestValidator
  ) {}
  
  async createProduct(productData: any): Promise<any> {
    // Валидируем входные данные
    const validation = this.validator.validate(productCreateSchema, productData);
    
    if (!validation.valid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }
    
    // Выполняем запрос
    const result = await this.api.product.create([productData]);
    
    // Можем также валидировать ответ
    this.validateResponse(result);
    
    return result;
  }
  
  private validateResponse(response: any): void {
    if (!response || typeof response !== 'object') {
      throw new Error('Invalid API response format');
    }
    
    if (response.error) {
      throw new Error(`API Error: ${response.error.message || 'Unknown error'}`);
    }
  }
}

interface ValidationResult {
  valid: boolean;
  errors: string[];
}
```

## 📱 Примеры архитектур

### 1. Микросервисная архитектура

```typescript
// Базовый микросервис
abstract class BaseMicroservice {
  protected api: OzonSellerAPI;
  protected eventBus: EventBus;
  protected logger: Logger;
  
  constructor(config: MicroserviceConfig) {
    this.api = new OzonSellerAPI(config.apiConfig);
    this.eventBus = config.eventBus;
    this.logger = config.logger;
  }
  
  abstract start(): Promise<void>;
  abstract stop(): Promise<void>;
  abstract getHealthStatus(): Promise<HealthStatus>;
}

// Сервис управления товарами
class ProductMicroservice extends BaseMicroservice {
  private productService: ProductService;
  
  constructor(config: MicroserviceConfig) {
    super(config);
    this.productService = new ProductService(this.api, this.eventBus);
  }
  
  async start(): Promise<void> {
    this.logger.info('Starting Product Microservice...');
    
    // Подписываемся на события
    this.eventBus.on('external.product.updated', this.handleExternalProductUpdate.bind(this));
    this.eventBus.on('inventory.stock.low', this.handleLowStock.bind(this));
    
    this.logger.info('Product Microservice started');
  }
  
  async stop(): Promise<void> {
    this.logger.info('Stopping Product Microservice...');
    // Очистка ресурсов
  }
  
  async getHealthStatus(): Promise<HealthStatus> {
    try {
      // Проверяем доступность API
      await this.api.product.getList({ limit: 1 });
      
      return {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        details: {
          apiConnection: 'ok',
          eventBusConnection: 'ok'
        }
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error.message
      };
    }
  }
  
  private async handleExternalProductUpdate(data: any): Promise<void> {
    await this.productService.syncProduct(data.product);
  }
  
  private async handleLowStock(data: any): Promise<void> {
    // Уведомляем о низком остатке
    this.logger.warn(`Low stock for product ${data.productId}: ${data.currentStock}`);
  }
}

// Сервис обработки заказов
class OrderMicroservice extends BaseMicroservice {
  private orderService: OrderService;
  private orderStateMachine: OrderStateMachine;
  
  constructor(config: MicroserviceConfig) {
    super(config);
    this.orderService = new OrderService(this.api, this.eventBus);
    this.orderStateMachine = new OrderStateMachine(this.api, this.eventBus);
  }
  
  async start(): Promise<void> {
    this.logger.info('Starting Order Microservice...');
    
    // Запускаем периодическую обработку заказов
    setInterval(() => {
      this.processNewOrders().catch(error => {
        this.logger.error('Error processing orders:', error);
      });
    }, 60000); // каждую минуту
    
    this.logger.info('Order Microservice started');
  }
  
  async stop(): Promise<void> {
    this.logger.info('Stopping Order Microservice...');
  }
  
  async getHealthStatus(): Promise<HealthStatus> {
    // Аналогично ProductMicroservice
    return { status: 'healthy', timestamp: new Date().toISOString() };
  }
  
  private async processNewOrders(): Promise<void> {
    const results = await this.orderService.processNewOrders();
    
    this.logger.info(`Processed ${results.length} orders`);
    
    for (const result of results) {
      if (result.success) {
        this.eventBus.emit('order.processed', { orderId: result.orderId });
      } else {
        this.eventBus.emit('order.processing.failed', {
          orderId: result.orderId,
          error: result.error
        });
      }
    }
  }
}

// Оркестратор микросервисов
class MicroserviceOrchestrator {
  private services: BaseMicroservice[] = [];
  private healthCheckInterval?: NodeJS.Timeout;
  
  addService(service: BaseMicroservice): void {
    this.services.push(service);
  }
  
  async startAll(): Promise<void> {
    console.log('Starting all microservices...');
    
    for (const service of this.services) {
      await service.start();
    }
    
    // Запускаем мониторинг здоровья
    this.startHealthChecks();
    
    console.log('All microservices started');
  }
  
  async stopAll(): Promise<void> {
    console.log('Stopping all microservices...');
    
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
    }
    
    for (const service of this.services.reverse()) {
      await service.stop();
    }
    
    console.log('All microservices stopped');
  }
  
  private startHealthChecks(): void {
    this.healthCheckInterval = setInterval(async () => {
      for (const service of this.services) {
        try {
          const health = await service.getHealthStatus();
          
          if (health.status === 'unhealthy') {
            console.error(`Service unhealthy:`, health);
          }
        } catch (error) {
          console.error('Health check failed:', error);
        }
      }
    }, 30000); // каждые 30 секунд
  }
}
```

### 2. Монолитная архитектура

```typescript
// Главное приложение
class OzonSellerApplication {
  private api: OzonSellerAPI;
  private services: {
    product: ProductService;
    order: OrderService;
    finance: FinanceService;
    analytics: AnalyticsService;
  };
  private scheduler: JobScheduler;
  private eventBus: EventBus;
  
  constructor(config: ApplicationConfig) {
    this.api = new OzonSellerAPI(config.apiConfig);
    this.eventBus = new EventBus();
    
    this.services = {
      product: new ProductService(this.api, this.eventBus),
      order: new OrderService(this.api, this.eventBus),
      finance: new FinanceService(this.api, this.eventBus),
      analytics: new AnalyticsService(this.api, this.eventBus)
    };
    
    this.scheduler = new JobScheduler();
    
    this.setupEventHandlers();
    this.scheduleJobs();
  }
  
  async start(): Promise<void> {
    console.log('Starting OZON Seller Application...');
    
    // Инициализация сервисов
    await Promise.all([
      this.services.product.initialize(),
      this.services.order.initialize(),
      this.services.finance.initialize(),
      this.services.analytics.initialize()
    ]);
    
    // Запуск планировщика
    this.scheduler.start();
    
    console.log('Application started successfully');
  }
  
  async stop(): Promise<void> {
    console.log('Stopping application...');
    
    this.scheduler.stop();
    
    await Promise.all([
      this.services.product.cleanup(),
      this.services.order.cleanup(),
      this.services.finance.cleanup(),
      this.services.analytics.cleanup()
    ]);
    
    console.log('Application stopped');
  }
  
  private setupEventHandlers(): void {
    // Продукты
    this.eventBus.on('product.created', this.handleProductCreated.bind(this));
    this.eventBus.on('product.stock.low', this.handleLowStock.bind(this));
    
    // Заказы
    this.eventBus.on('order.shipped', this.handleOrderShipped.bind(this));
    this.eventBus.on('order.cancelled', this.handleOrderCancelled.bind(this));
    
    // Финансы
    this.eventBus.on('payment.received', this.handlePaymentReceived.bind(this));
  }
  
  private scheduleJobs(): void {
    // Синхронизация товаров каждые 15 минут
    this.scheduler.addJob('sync-products', '*/15 * * * *', async () => {
      await this.services.product.syncAllProducts();
    });
    
    // Обработка заказов каждые 5 минут
    this.scheduler.addJob('process-orders', '*/5 * * * *', async () => {
      await this.services.order.processNewOrders();
    });
    
    // Генерация отчетов каждый день в 9:00
    this.scheduler.addJob('daily-report', '0 9 * * *', async () => {
      await this.services.analytics.generateDailyReport();
    });
  }
  
  private async handleProductCreated(data: any): Promise<void> {
    // Логика обработки создания товара
    await this.services.analytics.trackProductCreation(data.product);
  }
  
  private async handleLowStock(data: any): Promise<void> {
    // Отправляем уведомление о низком остатке
    console.log(`Low stock alert: Product ${data.productId} has ${data.stock} items left`);
  }
  
  private async handleOrderShipped(data: any): Promise<void> {
    // Обновляем аналитику
    await this.services.analytics.trackOrderShipment(data.order);
  }
  
  private async handleOrderCancelled(data: any): Promise<void> {
    // Логика обработки отмены заказа
    await this.services.analytics.trackOrderCancellation(data.order);
  }
  
  private async handlePaymentReceived(data: any): Promise<void> {
    // Обработка получения платежа
    await this.services.finance.processPayment(data.payment);
  }
  
  // Публичные методы для внешнего использования
  getProductService(): ProductService {
    return this.services.product;
  }
  
  getOrderService(): OrderService {
    return this.services.order;
  }
  
  getFinanceService(): FinanceService {
    return this.services.finance;
  }
  
  getAnalyticsService(): AnalyticsService {
    return this.services.analytics;
  }
}

// Планировщик задач
class JobScheduler {
  private jobs: Map<string, { cron: string; handler: Function; running: boolean }> = new Map();
  private intervals: Map<string, NodeJS.Timeout> = new Map();
  
  addJob(name: string, cronExpression: string, handler: Function): void {
    this.jobs.set(name, {
      cron: cronExpression,
      handler,
      running: false
    });
  }
  
  start(): void {
    for (const [name, job] of this.jobs) {
      this.scheduleJob(name, job);
    }
  }
  
  stop(): void {
    for (const interval of this.intervals.values()) {
      clearInterval(interval);
    }
    this.intervals.clear();
  }
  
  private scheduleJob(name: string, job: { cron: string; handler: Function; running: boolean }): void {
    // Упрощенная реализация - в реальном проекте используйте node-cron
    const intervalMs = this.parseCronToInterval(job.cron);
    
    const interval = setInterval(async () => {
      if (job.running) {
        console.log(`Job ${name} is already running, skipping...`);
        return;
      }
      
      job.running = true;
      
      try {
        console.log(`Executing job: ${name}`);
        await job.handler();
        console.log(`Job ${name} completed successfully`);
      } catch (error) {
        console.error(`Job ${name} failed:`, error);
      } finally {
        job.running = false;
      }
    }, intervalMs);
    
    this.intervals.set(name, interval);
  }
  
  private parseCronToInterval(cron: string): number {
    // Упрощенный парсер cron - только для демонстрации
    if (cron === '*/5 * * * *') return 5 * 60 * 1000; // 5 минут
    if (cron === '*/15 * * * *') return 15 * 60 * 1000; // 15 минут
    if (cron === '0 9 * * *') return 24 * 60 * 60 * 1000; // 24 часа
    
    return 60 * 1000; // По умолчанию 1 минута
  }
}
```

---

**📚 Заключение**

Представленные паттерны интеграции помогают создавать масштабируемые, надежные и поддерживаемые решения для работы с OZON Seller API. Выбор конкретного паттерна зависит от требований проекта, размера команды и архитектурных предпочтений.