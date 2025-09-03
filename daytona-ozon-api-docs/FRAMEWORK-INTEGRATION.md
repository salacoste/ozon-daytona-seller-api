# 🚀 Интеграция с популярными фреймворками

Готовые примеры интеграции OZON Seller API SDK с популярными JavaScript/TypeScript фреймворками и платформами.

## 📋 Содержание

- [Next.js (React)](#nextjs-react)
- [Express.js](#expressjs)
- [Fastify](#fastify)
- [NestJS](#nestjs)
- [Vue.js + Nuxt](#vuejs--nuxt)
- [Svelte + SvelteKit](#svelte--sveltekit)
- [Electron Desktop App](#electron-desktop-app)
- [AWS Lambda (Serverless)](#aws-lambda-serverless)
- [Vercel Edge Functions](#vercel-edge-functions)
- [Docker контейнеризация](#docker-контейнеризация)

---

## Next.js (React)

### Структура проекта
```
src/
├── components/
│   ├── ProductManager.tsx
│   └── OrderProcessor.tsx
├── lib/
│   ├── ozon-client.ts
│   └── types.ts
├── pages/
│   ├── api/
│   │   ├── products/
│   │   └── orders/
│   └── dashboard/
└── hooks/
    └── useOzonAPI.ts
```

### Конфигурация клиента
```typescript
// src/lib/ozon-client.ts
import { OzonSellerAPI } from 'daytona-ozon-seller-api';

const api = new OzonSellerAPI({
  clientId: process.env.OZON_CLIENT_ID!,
  apiKey: process.env.OZON_API_KEY!,
  timeout: 30000,
  debug: process.env.NODE_ENV === 'development'
});

export { api };

// Типы для Next.js
export interface OzonConfig {
  clientId: string;
  apiKey: string;
  baseURL?: string;
}
```

### React Hook для API
```typescript
// src/hooks/useOzonAPI.ts
import { useState, useEffect } from 'react';
import { api } from '@/lib/ozon-client';

export function useOzonAPI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRequest = async <T>(
    request: () => Promise<T>
  ): Promise<T | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await request();
      return result;
    } catch (err: any) {
      setError(err.message || 'Произошла ошибка');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { api, loading, error, handleRequest };
}

// Пример использования в компоненте
export function useProducts() {
  const { api, loading, error, handleRequest } = useOzonAPI();
  
  const getProducts = (filters: any) => {
    return handleRequest(() => api.product.getList(filters));
  };
  
  const updateStock = (updates: any[]) => {
    return handleRequest(() => api.pricesStocks.updateStocks(updates));
  };
  
  return { getProducts, updateStock, loading, error };
}
```

### API Routes
```typescript
// src/pages/api/products/list.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { api } from '@/lib/ozon-client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { limit = 20, filter } = req.query;
    
    const products = await api.product.getList({
      limit: Number(limit),
      filter: filter ? JSON.parse(filter as string) : undefined
    });
    
    res.status(200).json(products);
  } catch (error: any) {
    console.error('Products API Error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch products',
      details: error.message 
    });
  }
}
```

### React Component
```tsx
// src/components/ProductManager.tsx
import React, { useState, useEffect } from 'react';
import { useProducts } from '@/hooks/useOzonAPI';

interface Product {
  id: number;
  name: string;
  offer_id: string;
  marketing_price?: string;
}

export function ProductManager() {
  const { getProducts, updateStock, loading, error } = useProducts();
  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    loadProducts();
  }, []);
  
  const loadProducts = async () => {
    const result = await getProducts({ limit: 50 });
    if (result?.result?.items) {
      setProducts(result.result.items);
    }
  };
  
  const handleStockUpdate = async (productId: number, stock: number) => {
    const result = await updateStock([{ product_id: productId, stock }]);
    if (result) {
      // Обновить локальное состояние
      loadProducts();
    }
  };
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Управление товарами</h1>
      
      {loading && <p>Загрузка...</p>}
      {error && <p className="text-red-500">Ошибка: {error}</p>}
      
      <div className="grid gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded">
            <h3 className="font-semibold">{product.name}</h3>
            <p>ID: {product.offer_id}</p>
            <p>Цена: {product.marketing_price} ₽</p>
            
            <button
              onClick={() => handleStockUpdate(product.id, 100)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Установить остаток: 100
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## Express.js

### Структура проекта
```
src/
├── controllers/
│   ├── productController.ts
│   └── orderController.ts
├── middleware/
│   ├── auth.ts
│   └── errorHandler.ts
├── routes/
│   ├── products.ts
│   └── orders.ts
├── services/
│   └── ozonService.ts
└── app.ts
```

### Сервис для OZON API
```typescript
// src/services/ozonService.ts
import { OzonSellerAPI } from 'daytona-ozon-seller-api';

class OzonService {
  private api: OzonSellerAPI;
  
  constructor() {
    this.api = new OzonSellerAPI({
      clientId: process.env.OZON_CLIENT_ID!,
      apiKey: process.env.OZON_API_KEY!,
      timeout: 30000
    });
  }
  
  async getProducts(filters: any) {
    try {
      return await this.api.product.getList(filters);
    } catch (error) {
      throw new Error(`Failed to get products: ${error.message}`);
    }
  }
  
  async processOrders(status: string = 'awaiting_packaging') {
    try {
      const orders = await this.api.fbs.getOrdersList({
        filter: { status },
        limit: 50
      });
      
      const processedOrders = [];
      
      for (const order of orders.result || []) {
        // Упаковка заказа
        await this.api.fbs.packOrder({
          posting_number: order.posting_number,
          packages: [{
            products: order.products.map(p => ({
              product_id: p.product_id,
              quantity: p.quantity
            }))
          }]
        });
        
        // Отправка в доставку
        await this.api.fbs.shipOrder({
          posting_number: order.posting_number,
          tracking_number: `TRACK${Date.now()}`
        });
        
        processedOrders.push(order.posting_number);
      }
      
      return processedOrders;
    } catch (error) {
      throw new Error(`Failed to process orders: ${error.message}`);
    }
  }
  
  async updatePricesBatch(updates: Array<{product_id: number, price: string}>) {
    const batchSize = 1000;
    const results = [];
    
    for (let i = 0; i < updates.length; i += batchSize) {
      const batch = updates.slice(i, i + batchSize);
      
      try {
        const result = await this.api.pricesStocks.updatePrices(batch);
        results.push(result);
        
        // Пауза между батчами
        if (i + batchSize < updates.length) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      } catch (error) {
        console.error(`Batch ${Math.floor(i/batchSize)} failed:`, error);
        throw error;
      }
    }
    
    return results;
  }
}

export default new OzonService();
```

### Контроллер продуктов
```typescript
// src/controllers/productController.ts
import { Request, Response } from 'express';
import ozonService from '../services/ozonService';

export class ProductController {
  async getProducts(req: Request, res: Response) {
    try {
      const { limit = 20, filter } = req.query;
      
      const products = await ozonService.getProducts({
        limit: Number(limit),
        filter: filter ? JSON.parse(filter as string) : undefined
      });
      
      res.json({
        success: true,
        data: products
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
  
  async updatePrices(req: Request, res: Response) {
    try {
      const { updates } = req.body;
      
      if (!Array.isArray(updates)) {
        return res.status(400).json({
          success: false,
          error: 'Updates must be an array'
        });
      }
      
      const results = await ozonService.updatePricesBatch(updates);
      
      res.json({
        success: true,
        data: results,
        processed: updates.length
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}
```

### Маршруты
```typescript
// src/routes/products.ts
import { Router } from 'express';
import { ProductController } from '../controllers/productController';

const router = Router();
const productController = new ProductController();

router.get('/list', productController.getProducts);
router.post('/prices', productController.updatePrices);

export default router;
```

### Основное приложение
```typescript
// src/app.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import productRoutes from './routes/products';
import orderRoutes from './routes/orders';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100 // лимит на IP
});
app.use(limiter);

// Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## NestJS

### Модуль OZON
```typescript
// src/ozon/ozon.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OzonService } from './ozon.service';
import { ProductController } from './controllers/product.controller';
import { OrderController } from './controllers/order.controller';

@Module({
  imports: [ConfigModule],
  providers: [OzonService],
  controllers: [ProductController, OrderController],
  exports: [OzonService]
})
export class OzonModule {}
```

### Сервис OZON
```typescript
// src/ozon/ozon.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OzonSellerAPI } from 'daytona-ozon-seller-api';

@Injectable()
export class OzonService {
  private readonly logger = new Logger(OzonService.name);
  private readonly api: OzonSellerAPI;
  
  constructor(private configService: ConfigService) {
    this.api = new OzonSellerAPI({
      clientId: this.configService.get<string>('OZON_CLIENT_ID')!,
      apiKey: this.configService.get<string>('OZON_API_KEY')!,
      timeout: 30000,
      debug: this.configService.get<string>('NODE_ENV') === 'development'
    });
  }
  
  async getProducts(filters: any) {
    try {
      this.logger.log(`Fetching products with filters: ${JSON.stringify(filters)}`);
      const result = await this.api.product.getList(filters);
      this.logger.log(`Found ${result.result?.items?.length || 0} products`);
      return result;
    } catch (error) {
      this.logger.error('Failed to fetch products', error);
      throw error;
    }
  }
  
  async updateStocks(updates: Array<{product_id: number, stock: number}>) {
    try {
      this.logger.log(`Updating stocks for ${updates.length} products`);
      const result = await this.api.pricesStocks.updateStocks(updates);
      this.logger.log('Stocks updated successfully');
      return result;
    } catch (error) {
      this.logger.error('Failed to update stocks', error);
      throw error;
    }
  }
}
```

### Контроллер с валидацией
```typescript
// src/ozon/controllers/product.controller.ts
import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Query, 
  BadRequestException,
  InternalServerErrorException 
} from '@nestjs/common';
import { IsNumber, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { OzonService } from '../ozon.service';

class StockUpdateDto {
  @IsNumber()
  product_id: number;
  
  @IsNumber()
  stock: number;
}

class UpdateStocksDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StockUpdateDto)
  updates: StockUpdateDto[];
}

@Controller('ozon/products')
export class ProductController {
  constructor(private readonly ozonService: OzonService) {}
  
  @Get('list')
  async getProducts(
    @Query('limit') limit?: string,
    @Query('filter') filter?: string
  ) {
    try {
      const filters = {
        limit: limit ? Number(limit) : 20,
        filter: filter ? JSON.parse(filter) : undefined
      };
      
      return await this.ozonService.getProducts(filters);
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }
  
  @Post('stocks')
  async updateStocks(@Body() updateStocksDto: UpdateStocksDto) {
    try {
      return await this.ozonService.updateStocks(updateStocksDto.updates);
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
```

### Глобальный фильтр ошибок
```typescript
// src/common/filters/ozon-exception.filter.ts
import { 
  ExceptionFilter, 
  Catch, 
  ArgumentsHost, 
  HttpException,
  Logger 
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class OzonExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(OzonExceptionFilter.name);
  
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    
    let status = 500;
    let message = 'Internal server error';
    
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    } else if (exception.message?.includes('OZON API')) {
      status = 502;
      message = 'OZON API error';
    }
    
    this.logger.error(
      `${request.method} ${request.url} - ${status} - ${message}`,
      exception.stack
    );
    
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      error: message
    });
  }
}
```

---

## AWS Lambda (Serverless)

### Serverless.yml конфигурация
```yaml
# serverless.yml
service: ozon-api-lambda

frameworkVersion: '3'

provider:
  name: aws
  runtime: nodejs18.x
  region: eu-west-1
  environment:
    OZON_CLIENT_ID: ${env:OZON_CLIENT_ID}
    OZON_API_KEY: ${env:OZON_API_KEY}
  timeout: 300
  memorySize: 512

functions:
  getProducts:
    handler: src/handlers/products.getProducts
    events:
      - httpApi:
          path: /products
          method: get
  
  processOrders:
    handler: src/handlers/orders.processOrders
    events:
      - schedule: rate(5 minutes)
      - httpApi:
          path: /orders/process
          method: post
  
  updatePrices:
    handler: src/handlers/products.updatePrices
    events:
      - httpApi:
          path: /products/prices
          method: post

plugins:
  - serverless-esbuild
  - serverless-offline

custom:
  esbuild:
    bundle: true
    minify: false
    sourcemap: true
    target: 'node18'
    define:
      'require.resolve': undefined
    platform: 'node'
    concurrency: 10
```

### Lambda обработчики
```typescript
// src/handlers/products.ts
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { OzonSellerAPI } from 'daytona-ozon-seller-api';

const api = new OzonSellerAPI({
  clientId: process.env.OZON_CLIENT_ID!,
  apiKey: process.env.OZON_API_KEY!,
  timeout: 30000
});

export const getProducts = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
  try {
    const { limit, filter } = event.queryStringParameters || {};
    
    const products = await api.product.getList({
      limit: limit ? Number(limit) : 20,
      filter: filter ? JSON.parse(filter) : undefined
    });
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: true,
        data: products
      })
    };
  } catch (error: any) {
    console.error('Lambda Error:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };
  }
};

export const updatePrices = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
  try {
    const { updates } = JSON.parse(event.body || '{}');
    
    if (!Array.isArray(updates)) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          error: 'Updates must be an array'
        })
      };
    }
    
    // Обработка батчами для избежания таймаутов
    const batchSize = 500;
    const results = [];
    
    for (let i = 0; i < updates.length; i += batchSize) {
      const batch = updates.slice(i, i + batchSize);
      const result = await api.pricesStocks.updatePrices(batch);
      results.push(result);
    }
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: true,
        data: results,
        processed: updates.length
      })
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };
  }
};
```

### Обработчик заказов с планировщиком
```typescript
// src/handlers/orders.ts
import { ScheduledEvent, APIGatewayProxyEventV2 } from 'aws-lambda';
import { OzonSellerAPI } from 'daytona-ozon-seller-api';

const api = new OzonSellerAPI({
  clientId: process.env.OZON_CLIENT_ID!,
  apiKey: process.env.OZON_API_KEY!
});

export const processOrders = async (
  event: ScheduledEvent | APIGatewayProxyEventV2
) => {
  try {
    console.log('Starting order processing...');
    
    // Получаем новые заказы
    const orders = await api.fbs.getOrdersList({
      filter: {
        status: 'awaiting_packaging'
      },
      limit: 100
    });
    
    const processedOrders = [];
    
    for (const order of orders.result || []) {
      try {
        // Упаковка заказа
        await api.fbs.packOrder({
          posting_number: order.posting_number,
          packages: [{
            products: order.products.map(p => ({
              product_id: p.product_id,
              quantity: p.quantity
            }))
          }]
        });
        
        // Отправка в доставку
        await api.fbs.shipOrder({
          posting_number: order.posting_number,
          tracking_number: `AUTO${Date.now()}`,
          shipping_provider_id: 1
        });
        
        processedOrders.push(order.posting_number);
        console.log(`Order ${order.posting_number} processed`);
        
      } catch (orderError: any) {
        console.error(`Failed to process order ${order.posting_number}:`, orderError);
      }
    }
    
    const result = {
      success: true,
      processed: processedOrders.length,
      orders: processedOrders,
      timestamp: new Date().toISOString()
    };
    
    console.log('Order processing completed:', result);
    
    // Для HTTP запросов возвращаем ответ
    if ('httpMethod' in event) {
      return {
        statusCode: 200,
        body: JSON.stringify(result)
      };
    }
    
    return result;
    
  } catch (error: any) {
    console.error('Order processing failed:', error);
    
    const errorResult = {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    };
    
    if ('httpMethod' in event) {
      return {
        statusCode: 500,
        body: JSON.stringify(errorResult)
      };
    }
    
    throw error;
  }
};
```

---

## Docker контейнеризация

### Dockerfile для Production
```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN npm run build

# Production image, copy all the files and run the application
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 ozonapp

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER ozonapp

EXPOSE 3000

ENV PORT 3000

CMD ["node", "dist/index.js"]
```

### Docker Compose для разработки
```yaml
# docker-compose.yml
version: '3.8'

services:
  ozon-api:
    build:
      context: .
      target: base
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - OZON_CLIENT_ID=${OZON_CLIENT_ID}
      - OZON_API_KEY=${OZON_API_KEY}
      - REDIS_URL=redis://redis:6379
    volumes:
      - .:/app
      - /app/node_modules
    command: npm run dev
    depends_on:
      - redis
      - postgres

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: ozonapp
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - ozon-api

volumes:
  redis_data:
  postgres_data:
```

### Многоступенчатая сборка для микросервисов
```dockerfile
# Dockerfile.microservice
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

FROM node:18-alpine AS dev
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

FROM dev AS build
RUN npm run build

FROM base AS production
COPY --from=build /app/dist ./dist
USER node
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

---

## Общие паттерны и лучшие практики

### Менеджер конфигурации
```typescript
// config/ozon.config.ts
interface OzonConfig {
  clientId: string;
  apiKey: string;
  baseURL: string;
  timeout: number;
  retryAttempts: number;
  debug: boolean;
}

export class OzonConfigManager {
  private static instance: OzonConfigManager;
  private config: OzonConfig;
  
  private constructor() {
    this.config = {
      clientId: process.env.OZON_CLIENT_ID || '',
      apiKey: process.env.OZON_API_KEY || '',
      baseURL: process.env.OZON_BASE_URL || 'https://api-seller.ozon.ru',
      timeout: Number(process.env.OZON_TIMEOUT) || 30000,
      retryAttempts: Number(process.env.OZON_RETRY_ATTEMPTS) || 3,
      debug: process.env.NODE_ENV === 'development'
    };
    
    this.validateConfig();
  }
  
  static getInstance(): OzonConfigManager {
    if (!OzonConfigManager.instance) {
      OzonConfigManager.instance = new OzonConfigManager();
    }
    return OzonConfigManager.instance;
  }
  
  private validateConfig() {
    if (!this.config.clientId) {
      throw new Error('OZON_CLIENT_ID is required');
    }
    if (!this.config.apiKey) {
      throw new Error('OZON_API_KEY is required');
    }
  }
  
  getConfig(): OzonConfig {
    return { ...this.config };
  }
}
```

### Универсальный HTTP клиент с повторными попытками
```typescript
// utils/http-client.ts
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export class RetryableHttpClient {
  private client: AxiosInstance;
  private maxRetries: number;
  
  constructor(config: AxiosRequestConfig, maxRetries: number = 3) {
    this.client = axios.create(config);
    this.maxRetries = maxRetries;
    
    this.setupInterceptors();
  }
  
  private setupInterceptors() {
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const config = error.config;
        
        if (!config._retryCount) {
          config._retryCount = 0;
        }
        
        const shouldRetry = 
          config._retryCount < this.maxRetries &&
          (error.response?.status >= 500 || !error.response);
        
        if (shouldRetry) {
          config._retryCount++;
          
          const delay = Math.pow(2, config._retryCount) * 1000;
          await new Promise(resolve => setTimeout(resolve, delay));
          
          return this.client(config);
        }
        
        return Promise.reject(error);
      }
    );
  }
  
  async request<T>(config: AxiosRequestConfig): Promise<T> {
    const response = await this.client(config);
    return response.data;
  }
}
```

### Мониторинг и логирование
```typescript
// utils/logger.ts
export class OzonAPILogger {
  private context: string;
  
  constructor(context: string = 'OzonAPI') {
    this.context = context;
  }
  
  log(message: string, data?: any) {
    console.log(`[${this.context}] ${new Date().toISOString()} - ${message}`, data || '');
  }
  
  error(message: string, error?: Error) {
    console.error(`[${this.context}] ${new Date().toISOString()} - ERROR: ${message}`, error || '');
  }
  
  warn(message: string, data?: any) {
    console.warn(`[${this.context}] ${new Date().toISOString()} - WARN: ${message}`, data || '');
  }
  
  performance<T>(operation: string, fn: () => Promise<T>): Promise<T> {
    const start = Date.now();
    return fn().then(
      result => {
        const duration = Date.now() - start;
        this.log(`${operation} completed in ${duration}ms`);
        return result;
      },
      error => {
        const duration = Date.now() - start;
        this.error(`${operation} failed after ${duration}ms`, error);
        throw error;
      }
    );
  }
}
```

---

## Заключение

Представленные примеры демонстрируют интеграцию OZON Seller API SDK с различными фреймворками и платформами. Каждый пример включает:

- ✅ **Конфигурацию окружения** - безопасное хранение ключей API
- ✅ **Обработку ошибок** - комплексная система обработки исключений
- ✅ **Логирование** - подробное логирование для отладки
- ✅ **Типизацию** - полная поддержка TypeScript
- ✅ **Масштабируемость** - архитектура для роста проекта
- ✅ **Безопасность** - лучшие практики защиты API

## 📚 Дополнительная информация

Для дополнительной информации обратитесь к:
- **[Быстрый старт](./QUICK-START.md)** - основы работы с SDK  
- **[Интеграционные паттерны](./INTEGRATION-PATTERNS.md)** - архитектурные решения
- **[API документация](./README.md)** - полное руководство по API
- **[GitHub репозиторий](https://github.com/salacoste/ozon-daytona-seller-api)** - исходный код и Issues
- **[NPM пакет](https://www.npmjs.com/package/daytona-ozon-seller-api)** - установка и обновления

## 🔗 Поддержка

- **Issues**: https://github.com/salacoste/ozon-daytona-seller-api/issues  
- **Discussions**: https://github.com/salacoste/ozon-daytona-seller-api/discussions
- **Pull Requests**: https://github.com/salacoste/ozon-daytona-seller-api/pulls