# Multi-API Integration Tutorial

Learn how to combine multiple APIs from the OZON Seller SDK to create powerful, integrated business workflows.

## Overview

This tutorial demonstrates how to leverage the full power of the 32 API categories by integrating them into cohesive business processes. You'll learn to build comprehensive workflows that span product management, analytics, finance, fulfillment, and marketing.

## Prerequisites

- Completed [Quick Start Guide](./quick-start.md) and [Product Management Tutorial](./product-management.md)
- Understanding of async/await patterns and Promise handling
- Familiarity with OZON seller operations

## Integration Patterns

### 1. Complete Business Intelligence Dashboard

```typescript
import { 
  OzonSellerApiClient, 
  createApiKey, 
  createClientId 
} from '@ozon/seller-api';

class OzonBusinessIntelligence {
  private client: OzonSellerApiClient;

  constructor(apiKey: string, clientId: string) {
    this.client = new OzonSellerApiClient({
      apiKey: createApiKey(apiKey),
      clientId: createClientId(clientId)
    });
  }

  async generateComprehensiveDashboard() {
    try {
      console.log('📊 Generating comprehensive business dashboard...');

      // Parallel data collection for performance
      const [
        productMetrics,
        financialMetrics,
        fulfillmentMetrics,
        marketingMetrics,
        customerMetrics
      ] = await Promise.all([
        this.getProductMetrics(),
        this.getFinancialMetrics(),
        this.getFulfillmentMetrics(),
        this.getMarketingMetrics(),
        this.getCustomerMetrics()
      ]);

      const dashboard = {
        timestamp: new Date().toISOString(),
        overview: this.calculateOverviewMetrics([
          productMetrics,
          financialMetrics,
          fulfillmentMetrics,
          marketingMetrics,
          customerMetrics
        ]),
        products: productMetrics,
        finance: financialMetrics,
        fulfillment: fulfillmentMetrics,
        marketing: marketingMetrics,
        customer: customerMetrics,
        recommendations: this.generateRecommendations({
          productMetrics,
          financialMetrics,
          fulfillmentMetrics,
          marketingMetrics,
          customerMetrics
        })
      };

      return dashboard;
    } catch (error) {
      console.error('Dashboard generation failed:', error);
      throw error;
    }
  }

  private async getProductMetrics() {
    const [products, stocks, prices, analytics] = await Promise.all([
      // Product catalog overview
      this.client.product.getList({
        filter: {},
        last_id: "",
        limit: 1000
      }),
      
      // Stock levels across warehouses
      this.client.analytics.getStockOnWarehouses({
        limit: 1000,
        offset: 0,
        warehouse_type: "ALL"
      }),
      
      // Current pricing information
      this.client.product.getProductPrices({
        filter: { visibility: "VISIBLE" },
        limit: 1000
      }),
      
      // Stock turnover analytics
      this.client.analytics.getStocksTurnover({
        limit: 1000,
        offset: 0
      })
    ]);

    return {
      totalProducts: products.result?.items?.length || 0,
      visibleProducts: products.result?.items?.filter(p => p.visible)?.length || 0,
      averagePrice: this.calculateAveragePrice(prices.result?.items || []),
      totalInventoryValue: this.calculateInventoryValue(stocks.result?.rows || []),
      lowStockItems: stocks.result?.rows?.filter(s => (s.free_to_sell_amount || 0) < 5)?.length || 0,
      outOfStockItems: stocks.result?.rows?.filter(s => (s.free_to_sell_amount || 0) === 0)?.length || 0,
      turnoverRate: this.calculateTurnoverRate(analytics.result?.rows || [])
    };
  }

  private async getFinancialMetrics() {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const [transactions, cashFlow] = await Promise.all([
      // Recent transactions
      this.client.finance.getTransactionList({
        filter: {
          date: {
            from: oneMonthAgo.toISOString().split('T')[0],
            to: new Date().toISOString().split('T')[0]
          },
          operation_type: [],
          posting_number: "",
          transaction_type: "all"
        },
        page: 1,
        page_size: 1000
      }),
      
      // Cash flow statement
      this.client.report.getFinanceCashFlowStatement({
        date: {
          from: oneMonthAgo.toISOString().split('T')[0],
          to: new Date().toISOString().split('T')[0]
        },
        page: 1,
        page_size: 100
      })
    ]);

    const revenue = transactions.result?.transactions
      ?.filter(t => t.type === 'ClientReturnAgentOperation')
      ?.reduce((sum, t) => sum + parseFloat(t.amount || '0'), 0) || 0;

    const expenses = transactions.result?.transactions
      ?.filter(t => t.type !== 'ClientReturnAgentOperation')
      ?.reduce((sum, t) => sum + Math.abs(parseFloat(t.amount || '0')), 0) || 0;

    return {
      totalRevenue: revenue,
      totalExpenses: expenses,
      netProfit: revenue - expenses,
      transactionCount: transactions.result?.transactions?.length || 0,
      averageTransactionValue: revenue / (transactions.result?.transactions?.length || 1),
      cashFlowOperations: cashFlow.result?.operations?.length || 0
    };
  }

  private async getFulfillmentMetrics() {
    const [fboOrders, fbsOrders, deliveries, returns] = await Promise.all([
      // FBO unfulfilled orders
      this.client.fbo.getUnfulfilledList({
        limit: 1000,
        offset: 0
      }),
      
      // FBS orders
      this.client.fbs.getOrders({
        filter: {
          since: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          to: new Date().toISOString(),
          status: ""
        },
        limit: 1000,
        offset: 0
      }),
      
      // Delivery information
      this.client['delivery-fbs'].getDeliveryVariants({
        filter: {
          cutoff_from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          cutoff_to: new Date().toISOString().split('T')[0]
        },
        limit: 1000,
        offset: 0
      }),
      
      // Returns data
      this.client.return.getReturns({
        filter: {
          last_free_waiting_day_from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          last_free_waiting_day_to: new Date().toISOString().split('T')[0]
        },
        limit: 1000,
        offset: 0
      })
    ]);

    return {
      pendingFBOOrders: fboOrders.result?.orders?.length || 0,
      totalFBSOrders: fbsOrders.result?.orders?.length || 0,
      activeDeliveries: deliveries.result?.deliveries?.length || 0,
      returnRequests: returns.result?.returns?.length || 0,
      fulfillmentMix: {
        fbo: fboOrders.result?.orders?.length || 0,
        fbs: fbsOrders.result?.orders?.length || 0
      }
    };
  }

  private async getMarketingMetrics() {
    const [promotions, participatingProducts, discountTasks] = await Promise.all([
      // Available promotions
      this.client.promos.getActions(),
      
      // Get participating products for first available promotion
      this.client.promos.getActions().then(async (actions) => {
        if (actions.result?.length) {
          return this.client.promos.getParticipatingProducts({
            action_id: actions.result[0].id,
            limit: 1000
          });
        }
        return { result: { products: [] } };
      }),
      
      // Customer discount requests
      this.client.promos.getDiscountTasks({
        status: 'NEW',
        limit: 1000,
        page: 1
      })
    ]);

    return {
      availablePromotions: promotions.result?.length || 0,
      activePromotions: promotions.result?.filter(p => p.is_participating_available)?.length || 0,
      productsInPromotions: participatingProducts.result?.products?.length || 0,
      pendingDiscountRequests: discountTasks.result?.length || 0
    };
  }

  private async getCustomerMetrics() {
    const [reviews, questions, chats] = await Promise.all([
      // Product reviews
      this.client.review.getList({
        limit: 1000,
        offset: 0
      }),
      
      // Customer questions
      this.client['questions-answers'].getList({
        limit: 1000,
        offset: 0
      }),
      
      // Customer support chats
      this.client.chat.getList({
        chat_id_list: [],
        limit: 1000,
        offset: 0
      })
    ]);

    const averageRating = reviews.result?.reviews
      ?.reduce((sum, r) => sum + (r.rating || 0), 0) / (reviews.result?.reviews?.length || 1) || 0;

    return {
      totalReviews: reviews.result?.reviews?.length || 0,
      averageRating: Number(averageRating.toFixed(2)),
      unansweredQuestions: questions.result?.questions?.filter(q => !q.answer)?.length || 0,
      activeChatSessions: chats.result?.chats?.filter(c => c.chat_status === 'opened')?.length || 0,
      customerSatisfactionScore: this.calculateSatisfactionScore(reviews.result?.reviews || [])
    };
  }

  private calculateOverviewMetrics(allMetrics: any[]) {
    const [products, finance, fulfillment, marketing, customer] = allMetrics;
    
    return {
      healthScore: this.calculateHealthScore(allMetrics),
      keyMetrics: {
        totalRevenue: finance.totalRevenue,
        totalProducts: products.totalProducts,
        totalOrders: fulfillment.pendingFBOOrders + fulfillment.totalFBSOrders,
        customerRating: customer.averageRating
      },
      alerts: this.generateAlerts(allMetrics)
    };
  }

  private calculateHealthScore(allMetrics: any[]): number {
    const [products, finance, fulfillment, marketing, customer] = allMetrics;
    
    let score = 100;
    
    // Product health (30%)
    if (products.lowStockItems > products.totalProducts * 0.1) score -= 10;
    if (products.outOfStockItems > products.totalProducts * 0.05) score -= 15;
    if (products.turnoverRate < 2) score -= 5;
    
    // Financial health (25%)
    if (finance.netProfit < 0) score -= 20;
    if (finance.totalRevenue < 10000) score -= 5;
    
    // Fulfillment health (25%)
    if (fulfillment.returnRequests > fulfillment.totalFBSOrders * 0.1) score -= 10;
    if (fulfillment.pendingFBOOrders > 100) score -= 5;
    
    // Customer satisfaction (20%)
    if (customer.averageRating < 4.0) score -= 15;
    if (customer.unansweredQuestions > 10) score -= 5;
    
    return Math.max(0, score);
  }

  private generateAlerts(allMetrics: any[]): string[] {
    const [products, finance, fulfillment, marketing, customer] = allMetrics;
    const alerts = [];
    
    if (products.outOfStockItems > 0) {
      alerts.push(`⚠️ ${products.outOfStockItems} products are out of stock`);
    }
    
    if (finance.netProfit < 0) {
      alerts.push('🔴 Negative profit margin - review pricing strategy');
    }
    
    if (customer.averageRating < 4.0) {
      alerts.push('⭐ Low customer rating - focus on product quality and service');
    }
    
    if (customer.unansweredQuestions > 5) {
      alerts.push(`❓ ${customer.unansweredQuestions} unanswered customer questions`);
    }
    
    if (fulfillment.returnRequests > fulfillment.totalFBSOrders * 0.1) {
      alerts.push('📦 High return rate - investigate product quality issues');
    }
    
    return alerts;
  }

  private generateRecommendations(metrics: any): string[] {
    const recommendations = [];
    
    if (metrics.productMetrics.lowStockItems > 0) {
      recommendations.push('Restock low inventory items to prevent stockouts');
    }
    
    if (metrics.marketingMetrics.availablePromotions > 0) {
      recommendations.push('Consider joining available promotional campaigns');
    }
    
    if (metrics.customerMetrics.unansweredQuestions > 0) {
      recommendations.push('Respond to pending customer questions to improve service');
    }
    
    if (metrics.financialMetrics.netProfit > 0) {
      recommendations.push('Consider expanding successful product lines');
    }
    
    return recommendations;
  }

  // Helper methods
  private calculateAveragePrice(prices: any[]): number {
    if (!prices.length) return 0;
    const total = prices.reduce((sum, p) => sum + parseFloat(p.price?.price || '0'), 0);
    return Number((total / prices.length).toFixed(2));
  }

  private calculateInventoryValue(stocks: any[]): number {
    return stocks.reduce((sum, s) => {
      const quantity = s.free_to_sell_amount || 0;
      const price = parseFloat(s.price || '0');
      return sum + (quantity * price);
    }, 0);
  }

  private calculateTurnoverRate(turnoverData: any[]): number {
    if (!turnoverData.length) return 0;
    return turnoverData.reduce((sum, t) => sum + (t.turnover_days || 0), 0) / turnoverData.length;
  }

  private calculateSatisfactionScore(reviews: any[]): number {
    if (!reviews.length) return 0;
    const totalRating = reviews.reduce((sum, r) => sum + (r.rating || 0), 0);
    return Number(((totalRating / reviews.length) / 5 * 100).toFixed(1));
  }
}
```

### 2. Automated Order Processing Workflow

```typescript
class AutomatedOrderProcessor {
  private client: OzonSellerApiClient;

  constructor(apiKey: string, clientId: string) {
    this.client = new OzonSellerApiClient({
      apiKey: createApiKey(apiKey),
      clientId: createClientId(clientId)
    });
  }

  async processOrderLifecycle() {
    try {
      console.log('🔄 Starting automated order processing...');

      // 1. Get pending orders from both FBO and FBS
      const [fboOrders, fbsOrders] = await Promise.all([
        this.client.fbo.getUnfulfilledList({ limit: 100, offset: 0 }),
        this.client.fbs.getOrders({
          filter: {
            since: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            to: new Date().toISOString(),
            status: "awaiting_packaging"
          },
          limit: 100,
          offset: 0
        })
      ]);

      // 2. Process FBO orders
      await this.processFBOOrders(fboOrders.result?.orders || []);
      
      // 3. Process FBS orders
      await this.processFBSOrders(fbsOrders.result?.orders || []);
      
      // 4. Handle returns and cancellations
      await this.processReturnsAndCancellations();
      
      // 5. Update inventory based on orders
      await this.updateInventoryFromOrders();
      
      // 6. Generate shipping labels
      await this.generateShippingLabels();
      
      console.log('✅ Order processing completed');
      
      return {
        fboOrdersProcessed: fboOrders.result?.orders?.length || 0,
        fbsOrdersProcessed: fbsOrders.result?.orders?.length || 0,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Order processing failed:', error);
      throw error;
    }
  }

  private async processFBOOrders(orders: any[]) {
    console.log(`📦 Processing ${orders.length} FBO orders...`);
    
    for (const order of orders) {
      try {
        // Check product availability
        const availability = await this.checkProductAvailability(order.products);
        
        if (availability.allAvailable) {
          // Confirm order fulfillment
          await this.client.fbo.confirmOrder({
            order_id: order.order_id,
            confirmed: true
          });
          
          console.log(`✅ FBO order ${order.order_id} confirmed`);
        } else {
          // Handle partial availability
          await this.handlePartialAvailability(order, availability);
        }
      } catch (error) {
        console.error(`Failed to process FBO order ${order.order_id}:`, error);
      }
    }
  }

  private async processFBSOrders(orders: any[]) {
    console.log(`📦 Processing ${orders.length} FBS orders...`);
    
    for (const order of orders) {
      try {
        // Get delivery options
        const deliveryOptions = await this.client['delivery-fbs'].getDeliveryVariants({
          filter: {
            cutoff_from: new Date().toISOString().split('T')[0],
            cutoff_to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
          },
          limit: 10,
          offset: 0
        });

        if (deliveryOptions.result?.deliveries?.length) {
          // Package the order
          await this.client.fbs.packageOrder({
            order_id: order.order_id,
            packages: [{
              package_id: `pkg_${order.order_id}`,
              products: order.products.map((p: any) => ({
                product_id: p.product_id,
                quantity: p.quantity
              }))
            }]
          });

          console.log(`📦 FBS order ${order.order_id} packaged`);
        }
      } catch (error) {
        console.error(`Failed to process FBS order ${order.order_id}:`, error);
      }
    }
  }

  private async processReturnsAndCancellations() {
    console.log('🔄 Processing returns and cancellations...');
    
    // Get pending returns
    const returns = await this.client.return.getReturns({
      filter: {
        last_free_waiting_day_from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        last_free_waiting_day_to: new Date().toISOString().split('T')[0]
      },
      limit: 100,
      offset: 0
    });

    // Process each return
    for (const returnItem of returns.result?.returns || []) {
      try {
        // Approve return if conditions are met
        const shouldApprove = this.evaluateReturnConditions(returnItem);
        
        if (shouldApprove) {
          await this.client.return.approveReturn({
            return_id: returnItem.return_id,
            approved: true
          });
          
          console.log(`✅ Return ${returnItem.return_id} approved`);
        }
      } catch (error) {
        console.error(`Failed to process return ${returnItem.return_id}:`, error);
      }
    }

    // Get pending cancellations
    const cancellations = await this.client.cancellation.getCancellationList({
      filter: {
        cutoff_from: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        cutoff_to: new Date().toISOString(),
        status: ["pending"]
      },
      limit: 100,
      offset: 0
    });

    // Process cancellations
    for (const cancellation of cancellations.result?.cancellations || []) {
      try {
        await this.client.cancellation.approveCancellation({
          cancellation_id: cancellation.cancellation_id,
          approve: true
        });
        
        console.log(`✅ Cancellation ${cancellation.cancellation_id} processed`);
      } catch (error) {
        console.error(`Failed to process cancellation ${cancellation.cancellation_id}:`, error);
      }
    }
  }

  private async updateInventoryFromOrders() {
    console.log('📊 Updating inventory based on order activity...');
    
    // Get recent stock movements
    const stockData = await this.client.analytics.getStockOnWarehouses({
      limit: 1000,
      offset: 0,
      warehouse_type: "ALL"
    });

    // Identify products that need restocking
    const lowStockItems = stockData.result?.rows?.filter(item => 
      (item.free_to_sell_amount || 0) < 5
    ) || [];

    if (lowStockItems.length > 0) {
      console.log(`⚠️ Found ${lowStockItems.length} low stock items, updating inventory...`);
      
      const stockUpdates = lowStockItems.map(item => ({
        offer_id: item.sku || '',
        stock: 50, // Restock to 50 units
        warehouse_id: 12345 // Your warehouse ID
      })).filter(update => update.offer_id);

      if (stockUpdates.length > 0) {
        await this.client.fbs.updateStocks({ stocks: stockUpdates });
        console.log(`📦 Updated stock for ${stockUpdates.length} items`);
      }
    }
  }

  private async generateShippingLabels() {
    console.log('🏷️ Generating shipping labels...');
    
    // Get orders that need shipping labels
    const ordersNeedingLabels = await this.client.fbs.getOrders({
      filter: {
        since: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        to: new Date().toISOString(),
        status: "awaiting_deliver"
      },
      limit: 100,
      offset: 0
    });

    for (const order of ordersNeedingLabels.result?.orders || []) {
      try {
        // Generate shipping label
        const label = await this.client['fbs-rfbs-marks'].createLabel({
          order_id: order.order_id,
          label_type: "shipping"
        });

        if (label.result?.label_url) {
          console.log(`🏷️ Shipping label generated for order ${order.order_id}`);
        }
      } catch (error) {
        console.error(`Failed to generate label for order ${order.order_id}:`, error);
      }
    }
  }

  // Helper methods
  private async checkProductAvailability(products: any[]) {
    const availability = {
      allAvailable: true,
      unavailableProducts: [],
      availableProducts: []
    };

    for (const product of products) {
      const stock = await this.client.product.getProductStocks({
        filter: {
          product_id: [product.product_id],
          offer_id: [],
          visibility: "ALL"
        },
        limit: 1
      });

      const availableStock = stock.result?.items?.[0]?.stocks?.present || 0;
      
      if (availableStock >= product.quantity) {
        availability.availableProducts.push(product);
      } else {
        availability.allAvailable = false;
        availability.unavailableProducts.push(product);
      }
    }

    return availability;
  }

  private async handlePartialAvailability(order: any, availability: any) {
    // Implement business logic for partial fulfillment
    console.log(`⚠️ Partial availability for order ${order.order_id}`);
    
    if (availability.availableProducts.length > 0) {
      // Partially fulfill order
      console.log(`Partially fulfilling ${availability.availableProducts.length} items`);
    }
    
    // Notify customer about unavailable items
    console.log(`${availability.unavailableProducts.length} items unavailable`);
  }

  private evaluateReturnConditions(returnItem: any): boolean {
    // Implement return approval logic
    const daysSinceOrder = Math.floor(
      (Date.now() - new Date(returnItem.order_date).getTime()) / (1000 * 60 * 60 * 24)
    );
    
    // Auto-approve returns within 14 days for standard reasons
    return daysSinceOrder <= 14 && ['defective', 'wrong_item'].includes(returnItem.reason);
  }
}
```

### 3. Dynamic Pricing and Promotion Engine

```typescript
class DynamicPricingEngine {
  private client: OzonSellerApiClient;

  constructor(apiKey: string, clientId: string) {
    this.client = new OzonSellerApiClient({
      apiKey: createApiKey(apiKey),
      clientId: createClientId(clientId)
    });
  }

  async optimizePricingAndPromotions() {
    try {
      console.log('💰 Starting pricing and promotion optimization...');

      // 1. Analyze market conditions
      const marketAnalysis = await this.analyzeMarketConditions();
      
      // 2. Evaluate product performance
      const performanceData = await this.evaluateProductPerformance();
      
      // 3. Optimize pricing strategy
      const pricingUpdates = await this.calculateOptimalPricing(marketAnalysis, performanceData);
      
      // 4. Manage promotional campaigns
      const promotionResults = await this.managePromotionalCampaigns(performanceData);
      
      // 5. Handle customer discount requests
      await this.processDiscountRequests();
      
      return {
        pricingUpdates: pricingUpdates.length,
        promotionResults,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Pricing optimization failed:', error);
      throw error;
    }
  }

  private async analyzeMarketConditions() {
    // Get comprehensive product and pricing data
    const [products, prices, analytics] = await Promise.all([
      this.client.product.getList({
        filter: { visibility: 'VISIBLE' },
        last_id: "",
        limit: 1000
      }),
      
      this.client.product.getProductPrices({
        filter: { visibility: "VISIBLE" },
        limit: 1000
      }),
      
      this.client.analytics.getStocksTurnover({
        limit: 1000,
        offset: 0
      })
    ]);

    return {
      totalProducts: products.result?.items?.length || 0,
      averagePrice: this.calculateAveragePrice(prices.result?.items || []),
      priceDistribution: this.analyzePriceDistribution(prices.result?.items || []),
      turnoverData: analytics.result?.rows || []
    };
  }

  private async evaluateProductPerformance() {
    const stockData = await this.client.analytics.getStockOnWarehouses({
      limit: 1000,
      offset: 0,
      warehouse_type: "ALL"
    });

    const performance = {
      highPerformers: [],
      mediumPerformers: [],
      lowPerformers: [],
      categories: {}
    };

    for (const item of stockData.result?.rows || []) {
      const turnoverRate = item.turnover_days || 0;
      const stockLevel = item.free_to_sell_amount || 0;
      const price = parseFloat(item.price || '0');

      const performanceScore = this.calculatePerformanceScore({
        turnoverRate,
        stockLevel,
        price
      });

      const productData = {
        sku: item.sku,
        performance_score: performanceScore,
        turnover_rate: turnoverRate,
        stock_level: stockLevel,
        price: price
      };

      if (performanceScore > 80) {
        performance.highPerformers.push(productData);
      } else if (performanceScore > 50) {
        performance.mediumPerformers.push(productData);
      } else {
        performance.lowPerformers.push(productData);
      }
    }

    return performance;
  }

  private async calculateOptimalPricing(marketAnalysis: any, performanceData: any) {
    const pricingUpdates = [];

    // Price adjustments for low performers
    for (const product of performanceData.lowPerformers) {
      const currentPrice = product.price;
      const suggestedPrice = currentPrice * 0.9; // 10% discount
      
      pricingUpdates.push({
        offer_id: product.sku,
        price: suggestedPrice.toString(),
        old_price: currentPrice.toString(),
        reason: 'performance_boost'
      });
    }

    // Premium pricing for high performers
    for (const product of performanceData.highPerformers) {
      const currentPrice = product.price;
      const suggestedPrice = currentPrice * 1.05; // 5% increase
      
      pricingUpdates.push({
        offer_id: product.sku,
        price: suggestedPrice.toString(),
        old_price: currentPrice.toString(),
        reason: 'premium_positioning'
      });
    }

    // Apply pricing updates in batches
    if (pricingUpdates.length > 0) {
      const batchSize = 100;
      for (let i = 0; i < pricingUpdates.length; i += batchSize) {
        const batch = pricingUpdates.slice(i, i + batchSize);
        
        await this.client['pricing-strategy'].importPrices({
          prices: batch
        });
        
        console.log(`Updated prices for batch ${Math.floor(i/batchSize) + 1}`);
        
        // Rate limiting
        if (i + batchSize < pricingUpdates.length) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    }

    return pricingUpdates;
  }

  private async managePromotionalCampaigns(performanceData: any) {
    // Get available promotions
    const promotions = await this.client.promos.getActions();
    const availablePromotions = promotions.result?.filter(p => p.is_participating_available) || [];

    if (availablePromotions.length === 0) {
      console.log('No available promotions found');
      return { joined: 0, activated: 0 };
    }

    let joinedPromotions = 0;
    let activatedProducts = 0;

    for (const promotion of availablePromotions.slice(0, 3)) { // Limit to 3 promotions
      try {
        // Get eligible products
        const candidates = await this.client.promos.getCandidates({
          action_id: promotion.id,
          limit: 100
        });

        // Select products strategically
        const productsToActivate = this.selectProductsForPromotion(
          candidates.result?.products || [],
          performanceData
        );

        if (productsToActivate.length > 0) {
          // Activate products in promotion
          const activationResult = await this.client.promos.activateProducts({
            action_id: promotion.id,
            products: productsToActivate.map(p => ({
              product_id: p.product_id,
              action_price: (parseFloat(p.price) * 0.85).toString(), // 15% promotional discount
              stock: 50
            }))
          });

          const successfulActivations = activationResult.result?.results?.filter(r => r.is_updated)?.length || 0;
          
          if (successfulActivations > 0) {
            joinedPromotions++;
            activatedProducts += successfulActivations;
            console.log(`✅ Joined promotion ${promotion.id} with ${successfulActivations} products`);
          }
        }
      } catch (error) {
        console.error(`Failed to join promotion ${promotion.id}:`, error);
      }
    }

    return { joined: joinedPromotions, activated: activatedProducts };
  }

  private async processDiscountRequests() {
    // Get pending discount requests from customers
    const discountTasks = await this.client.promos.getDiscountTasks({
      status: 'NEW',
      limit: 100,
      page: 1
    });

    const approvals = [];
    const declines = [];

    for (const task of discountTasks.result || []) {
      const discountPercent = task.discount_percentage || 0;
      
      if (discountPercent <= 15 && discountPercent > 0) {
        // Approve reasonable discounts
        approvals.push({
          task_id: task.task_id,
          product_id: task.product_id,
          discount_percentage: discountPercent
        });
      } else {
        // Decline excessive discounts
        declines.push({
          task_id: task.task_id,
          product_id: task.product_id,
          decline_reason: 'Discount exceeds business policy limits'
        });
      }
    }

    // Process approvals and declines
    if (approvals.length > 0) {
      await this.client.promos.approveDiscountTasks({ tasks: approvals });
      console.log(`✅ Approved ${approvals.length} discount requests`);
    }

    if (declines.length > 0) {
      await this.client.promos.declineDiscountTasks({ tasks: declines });
      console.log(`❌ Declined ${declines.length} discount requests`);
    }

    return { approved: approvals.length, declined: declines.length };
  }

  // Helper methods
  private calculateAveragePrice(prices: any[]): number {
    if (!prices.length) return 0;
    const total = prices.reduce((sum, p) => sum + parseFloat(p.price?.price || '0'), 0);
    return total / prices.length;
  }

  private analyzePriceDistribution(prices: any[]) {
    const distribution = { low: 0, medium: 0, high: 0 };
    
    for (const price of prices) {
      const value = parseFloat(price.price?.price || '0');
      if (value < 1000) distribution.low++;
      else if (value < 5000) distribution.medium++;
      else distribution.high++;
    }
    
    return distribution;
  }

  private calculatePerformanceScore(metrics: any): number {
    const { turnoverRate, stockLevel, price } = metrics;
    
    let score = 50; // Base score
    
    // Turnover rate impact (40% weight)
    if (turnoverRate < 7) score += 20;
    else if (turnoverRate < 14) score += 10;
    else if (turnoverRate > 30) score -= 15;
    
    // Stock level impact (30% weight)
    if (stockLevel > 20) score += 15;
    else if (stockLevel < 5) score -= 20;
    
    // Price positioning impact (30% weight)
    if (price > 1000 && price < 10000) score += 15;
    else if (price > 10000) score += 5;
    
    return Math.max(0, Math.min(100, score));
  }

  private selectProductsForPromotion(candidates: any[], performanceData: any) {
    // Select medium performers for promotion (they have potential for growth)
    const mediumPerformerSkus = new Set(performanceData.mediumPerformers.map((p: any) => p.sku));
    
    return candidates
      .filter(c => c.is_available && mediumPerformerSkus.has(c.offer_id))
      .slice(0, 10); // Limit to 10 products per promotion
  }
}
```

## Complete Integration Example

Here's a comprehensive example that brings all the patterns together:

```typescript
class OzonSellerAutomationSuite {
  private client: OzonSellerApiClient;
  private businessIntelligence: OzonBusinessIntelligence;
  private orderProcessor: AutomatedOrderProcessor;
  private pricingEngine: DynamicPricingEngine;

  constructor(apiKey: string, clientId: string) {
    this.client = new OzonSellerApiClient({
      apiKey: createApiKey(apiKey),
      clientId: createClientId(clientId)
    });
    
    this.businessIntelligence = new OzonBusinessIntelligence(apiKey, clientId);
    this.orderProcessor = new AutomatedOrderProcessor(apiKey, clientId);
    this.pricingEngine = new DynamicPricingEngine(apiKey, clientId);
  }

  async runDailyAutomation() {
    try {
      console.log('🚀 Starting daily automation suite...');
      
      const startTime = Date.now();
      
      // Run all automation processes in parallel where possible
      const results = await Promise.allSettled([
        this.businessIntelligence.generateComprehensiveDashboard(),
        this.orderProcessor.processOrderLifecycle(),
        this.pricingEngine.optimizePricingAndPromotions()
      ]);

      const dashboard = results[0].status === 'fulfilled' ? results[0].value : null;
      const orderResults = results[1].status === 'fulfilled' ? results[1].value : null;
      const pricingResults = results[2].status === 'fulfilled' ? results[2].value : null;

      const executionTime = Date.now() - startTime;

      const summary = {
        timestamp: new Date().toISOString(),
        executionTime: `${executionTime}ms`,
        dashboard: dashboard?.overview || null,
        orders: orderResults || null,
        pricing: pricingResults || null,
        errors: results.filter(r => r.status === 'rejected').map(r => r.reason),
        recommendations: this.generateActionableRecommendations(dashboard, orderResults, pricingResults)
      };

      console.log('✅ Daily automation completed');
      console.log('📊 Summary:', summary);

      return summary;
    } catch (error) {
      console.error('❌ Daily automation failed:', error);
      throw error;
    }
  }

  private generateActionableRecommendations(dashboard: any, orders: any, pricing: any): string[] {
    const recommendations = [];

    if (dashboard?.alerts?.length > 0) {
      recommendations.push(`Address ${dashboard.alerts.length} critical alerts`);
    }

    if (orders?.fboOrdersProcessed > 0) {
      recommendations.push(`Monitor ${orders.fboOrdersProcessed} processed FBO orders`);
    }

    if (pricing?.pricingUpdates > 0) {
      recommendations.push(`Review ${pricing.pricingUpdates} pricing changes for effectiveness`);
    }

    if (!dashboard || !orders || !pricing) {
      recommendations.push('Some automation processes failed - review error logs');
    }

    return recommendations;
  }

  async generateWeeklyReport() {
    console.log('📋 Generating weekly business report...');
    
    // Comprehensive weekly analysis
    const weeklyData = await this.businessIntelligence.generateComprehensiveDashboard();
    
    // Additional weekly metrics
    const weeklyMetrics = await this.getWeeklyMetrics();
    
    return {
      period: 'weekly',
      timestamp: new Date().toISOString(),
      businessHealth: weeklyData.overview?.healthScore || 0,
      keyMetrics: weeklyData.overview?.keyMetrics || {},
      weeklyTrends: weeklyMetrics,
      actionItems: weeklyData.recommendations || []
    };
  }

  private async getWeeklyMetrics() {
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    
    const [financialReport, orderMetrics] = await Promise.all([
      this.client.report.getFinanceCashFlowStatement({
        date: {
          from: oneWeekAgo.toISOString().split('T')[0],
          to: new Date().toISOString().split('T')[0]
        },
        page: 1,
        page_size: 100
      }),
      
      this.getOrderMetrics(oneWeekAgo)
    ]);

    return {
      weeklyRevenue: this.calculateWeeklyRevenue(financialReport.result?.operations || []),
      orderVolume: orderMetrics.totalOrders,
      averageOrderValue: orderMetrics.averageOrderValue,
      returnRate: orderMetrics.returnRate
    };
  }

  private async getOrderMetrics(since: Date) {
    const [fboOrders, fbsOrders, returns] = await Promise.all([
      this.client.fbo.getOrdersList({
        filter: {
          since: since.toISOString(),
          to: new Date().toISOString()
        },
        limit: 1000,
        offset: 0
      }),
      
      this.client.fbs.getOrders({
        filter: {
          since: since.toISOString(),
          to: new Date().toISOString(),
          status: ""
        },
        limit: 1000,
        offset: 0
      }),
      
      this.client.return.getReturns({
        filter: {
          last_free_waiting_day_from: since.toISOString().split('T')[0],
          last_free_waiting_day_to: new Date().toISOString().split('T')[0]
        },
        limit: 1000,
        offset: 0
      })
    ]);

    const totalOrders = (fboOrders.result?.orders?.length || 0) + (fbsOrders.result?.orders?.length || 0);
    const totalReturns = returns.result?.returns?.length || 0;

    return {
      totalOrders,
      averageOrderValue: this.calculateAverageOrderValue([
        ...(fboOrders.result?.orders || []),
        ...(fbsOrders.result?.orders || [])
      ]),
      returnRate: totalOrders > 0 ? (totalReturns / totalOrders) * 100 : 0
    };
  }

  private calculateWeeklyRevenue(operations: any[]): number {
    return operations
      .filter(op => op.operation_type === 'ClientReturnAgentOperation')
      .reduce((sum, op) => sum + parseFloat(op.amount || '0'), 0);
  }

  private calculateAverageOrderValue(orders: any[]): number {
    if (!orders.length) return 0;
    
    const totalValue = orders.reduce((sum, order) => {
      return sum + (order.total_price || 0);
    }, 0);
    
    return totalValue / orders.length;
  }
}

// Usage example
async function runAutomation() {
  const automation = new OzonSellerAutomationSuite(
    'your-api-key',
    'your-client-id'
  );

  try {
    // Daily automation
    const dailyResults = await automation.runDailyAutomation();
    console.log('Daily automation results:', dailyResults);

    // Weekly report (run on Sundays)
    if (new Date().getDay() === 0) {
      const weeklyReport = await automation.generateWeeklyReport();
      console.log('Weekly report:', weeklyReport);
    }
  } catch (error) {
    console.error('Automation failed:', error);
  }
}

// Schedule automation
// setInterval(runAutomation, 24 * 60 * 60 * 1000); // Daily
```

## Best Practices for Multi-API Integration

### 1. Error Handling and Resilience
```typescript
class ResilientApiIntegration {
  async executeWithRetry<T>(operation: () => Promise<T>, maxRetries = 3): Promise<T> {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        if (attempt === maxRetries) throw error;
        
        const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, delay));
        
        console.log(`Retry attempt ${attempt} after ${delay}ms`);
      }
    }
    throw new Error('Max retries exceeded');
  }

  async executeParallelWithFallback<T>(
    operations: (() => Promise<T>)[],
    fallbackValues: T[]
  ): Promise<T[]> {
    const results = await Promise.allSettled(operations.map(op => op()));
    
    return results.map((result, index) => {
      if (result.status === 'fulfilled') {
        return result.value;
      } else {
        console.error(`Operation ${index} failed:`, result.reason);
        return fallbackValues[index];
      }
    });
  }
}
```

### 2. Rate Limiting and Performance
```typescript
class RateLimitedApiClient {
  private requestQueue: Array<() => Promise<any>> = [];
  private isProcessing = false;
  private requestsPerSecond = 10;

  async queueRequest<T>(request: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.requestQueue.push(async () => {
        try {
          const result = await request();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });

      this.processQueue();
    });
  }

  private async processQueue() {
    if (this.isProcessing || this.requestQueue.length === 0) return;
    
    this.isProcessing = true;
    
    while (this.requestQueue.length > 0) {
      const request = this.requestQueue.shift();
      if (request) {
        await request();
        await new Promise(resolve => setTimeout(resolve, 1000 / this.requestsPerSecond));
      }
    }
    
    this.isProcessing = false;
  }
}
```

### 3. Data Consistency and Caching
```typescript
class DataConsistencyManager {
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();

  async getCachedData<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttlMs = 5 * 60 * 1000
  ): Promise<T> {
    const cached = this.cache.get(key);
    
    if (cached && Date.now() - cached.timestamp < cached.ttl) {
      return cached.data;
    }

    const data = await fetcher();
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlMs
    });

    return data;
  }

  invalidateCache(pattern?: string) {
    if (pattern) {
      for (const key of this.cache.keys()) {
        if (key.includes(pattern)) {
          this.cache.delete(key);
        }
      }
    } else {
      this.cache.clear();
    }
  }
}
```

## Next Steps

- **[Analytics Dashboard](./analytics-dashboard.md)** - Build comprehensive analytics
- **[Automated Workflows](./automated-workflows.md)** - Advanced automation patterns
- **[High-Volume Operations](./high-volume-operations.md)** - Enterprise-scale implementations

---

*This multi-API integration tutorial demonstrates the power of combining all 32 OZON Seller API categories into cohesive business workflows.*