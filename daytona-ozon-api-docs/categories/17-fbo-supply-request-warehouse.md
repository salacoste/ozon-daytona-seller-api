# FBO Supply Request - Warehouse & Cluster Management

**Warehouse & Cluster Management** - Warehouse discovery and cluster coordination for FBO Supply Request API.

## Overview

Warehouse & Cluster Management provides comprehensive warehouse discovery, cluster analysis, and location optimization for FBO supply requests. This includes warehouse search, cluster mapping, and intelligent warehouse selection across 2 core methods plus optimization utilities.

---

## 📋 Methods Overview

### 🏢 Warehouse Operations (2 methods)
1. **getClusterList** - Get cluster and warehouse information
2. **getWarehouseFboList** - Search FBO warehouse locations

### 🎯 Optimization Utilities
3. **Warehouse Selection Algorithms** - Intelligent warehouse selection
4. **Cluster Analysis Tools** - Regional optimization patterns

---

## 🏢 Warehouse Operations Methods

### getClusterList()
Gets comprehensive information about warehouse clusters and their associated warehouses.

```typescript
interface FboSupplyRequestClusterListRequest {
  region?: string;
}

interface FboSupplyRequestClusterListResponse {
  clusters?: Array<{
    cluster_id?: number;
    name?: string;
    region?: string;
    type?: 'REGIONAL' | 'METRO' | 'CROSS_DOCK';
    
    // Cluster capacity
    total_capacity?: {
      max_pallets?: number;
      available_pallets?: number;
      utilization_rate?: number;
    };
    
    // Geographic info
    coverage_area?: {
      cities?: string[];
      regions?: string[];
      postal_codes?: string[];
    };
    
    // Performance metrics
    performance?: {
      avg_processing_time?: number;  // hours
      on_time_rate?: number;         // percentage
      quality_score?: number;        // 0-100
    };
    
    // Associated warehouses
    warehouses?: Array<{
      warehouse_id?: number;
      name?: string;
      type?: 'DIRECT' | 'CROSS_DOCK';
      address?: string;
      city?: string;
      
      // Availability
      is_available?: boolean;
      is_accepting_supply?: boolean;
      capacity_utilization?: number;
      
      // Capacity details
      max_pallets?: number;
      available_pallets?: number;
      max_daily_orders?: number;
      
      // Specializations
      supported_categories?: string[];
      restrictions?: {
        min_order_value?: number;
        max_pallet_weight?: number;
        prohibited_items?: string[];
      };
      
      // Contact
      contact?: {
        phone?: string;
        email?: string;
        working_hours?: string;
      };
    }>;
  }>;
}

// Usage Example
const clusters = await fboSupplyRequestApi.getClusterList({
  region: 'Москва'
});

console.log('📍 Available Clusters:');
clusters.clusters?.forEach((cluster, index) => {
  console.log(`\n${index + 1}. ${cluster.name} (${cluster.type})`);
  console.log(`   Region: ${cluster.region}`);
  console.log(`   Cluster ID: ${cluster.cluster_id}`);
  
  // Capacity overview
  if (cluster.total_capacity) {
    const capacity = cluster.total_capacity;
    console.log(`   Capacity: ${capacity.available_pallets}/${capacity.max_pallets} pallets`);
    console.log(`   Utilization: ${capacity.utilization_rate}%`);
  }
  
  // Performance metrics
  if (cluster.performance) {
    const perf = cluster.performance;
    console.log(`   Performance: ${perf.on_time_rate}% on-time, ${perf.quality_score}/100 quality`);
    console.log(`   Avg processing: ${perf.avg_processing_time} hours`);
  }
  
  // Coverage area
  if (cluster.coverage_area) {
    console.log(`   Coverage: ${cluster.coverage_area.cities?.join(', ')}`);
  }
  
  // Warehouses in cluster
  console.log(`   Warehouses (${cluster.warehouses?.length}):`);
  cluster.warehouses?.forEach((warehouse, wIndex) => {
    const statusIcon = warehouse.is_available ? '✅' : '❌';
    const supplyIcon = warehouse.is_accepting_supply ? '📦' : '⛔';
    
    console.log(`     ${wIndex + 1}. ${statusIcon}${supplyIcon} ${warehouse.name}`);
    console.log(`        Type: ${warehouse.type}`);
    console.log(`        Location: ${warehouse.city}`);
    console.log(`        Capacity: ${warehouse.available_pallets}/${warehouse.max_pallets} pallets`);
    console.log(`        Utilization: ${warehouse.capacity_utilization}%`);
    
    if (warehouse.supported_categories?.length) {
      console.log(`        Categories: ${warehouse.supported_categories.slice(0, 3).join(', ')}${warehouse.supported_categories.length > 3 ? '...' : ''}`);
    }
    
    if (warehouse.restrictions) {
      const restr = warehouse.restrictions;
      if (restr.min_order_value) {
        console.log(`        Min order: ${restr.min_order_value} RUB`);
      }
      if (restr.max_pallet_weight) {
        console.log(`        Max pallet weight: ${restr.max_pallet_weight}kg`);
      }
    }
    
    if (warehouse.contact) {
      console.log(`        Contact: ${warehouse.contact.phone}`);
      console.log(`        Hours: ${warehouse.contact.working_hours}`);
    }
  });
});
```

### getWarehouseFboList()
Searches for available FBO warehouses based on specific criteria and location requirements.

```typescript
interface FboSupplyRequestWarehouseFboListRequest {
  region?: string;
  warehouse_type?: 'DIRECT' | 'CROSS_DOCK';
  min_capacity?: number;
  supported_categories?: string[];
}

interface FboSupplyRequestWarehouseFboListResponse {
  warehouses?: Array<{
    warehouse_id?: number;
    name?: string;
    type?: 'DIRECT' | 'CROSS_DOCK';
    address?: string;
    city?: string;
    region?: string;
    
    // Availability status
    is_available?: boolean;
    is_accepting_supply?: boolean;
    next_available_slot?: string;
    
    // Capacity information
    capacity_info?: {
      max_pallets?: number;
      available_pallets?: number;
      utilization_rate?: number;
      max_daily_orders?: number;
      current_daily_orders?: number;
    };
    
    // Service capabilities
    services?: {
      same_day_processing?: boolean;
      weekend_delivery?: boolean;
      fragile_items?: boolean;
      oversized_items?: boolean;
      temperature_controlled?: boolean;
    };
    
    // Requirements and restrictions
    requirements?: {
      min_order_value?: number;
      max_pallet_weight?: number;
      advance_booking_hours?: number;
      supported_categories?: string[];
      prohibited_categories?: string[];
    };
    
    // Performance and ratings
    metrics?: {
      processing_time?: number;      // average hours
      accuracy_rate?: number;        // percentage
      damage_rate?: number;          // percentage
      customer_rating?: number;      // 0-5 stars
      monthly_volume?: number;       // orders processed
    };
    
    // Cost information
    pricing?: {
      storage_cost_per_pallet?: number;    // RUB/day
      processing_fee?: number;             // RUB/order
      handling_fee?: number;               // RUB/pallet
      express_fee?: number;                // RUB for expedited
    };
    
    // Contact and logistics
    contact_info?: {
      phone?: string;
      email?: string;
      manager_name?: string;
      working_hours?: {
        weekdays?: string;
        weekends?: string;
        holidays?: string;
      };
    };
  }>;
  
  total_warehouses?: number;
  available_warehouses?: number;
  
  // Regional summary
  regional_summary?: {
    region?: string;
    total_capacity?: number;
    available_capacity?: number;
    average_utilization?: number;
    recommended_warehouse_ids?: number[];
  };
}

// Usage Example
const warehouses = await fboSupplyRequestApi.getWarehouseFboList({
  region: 'Москва',
  warehouse_type: 'DIRECT',
  min_capacity: 100,
  supported_categories: ['Electronics', 'Clothing']
});

console.log(`🏢 Found ${warehouses.available_warehouses}/${warehouses.total_warehouses} available warehouses`);

if (warehouses.regional_summary) {
  const summary = warehouses.regional_summary;
  console.log(`\n📊 Regional Summary (${summary.region}):`);
  console.log(`Total capacity: ${summary.total_capacity} pallets`);
  console.log(`Available: ${summary.available_capacity} pallets`);
  console.log(`Average utilization: ${summary.average_utilization}%`);
  
  if (summary.recommended_warehouse_ids?.length) {
    console.log(`Recommended warehouses: ${summary.recommended_warehouse_ids.join(', ')}`);
  }
}

console.log('\n🏭 Warehouse Details:');
warehouses.warehouses?.forEach((warehouse, index) => {
  const statusIcon = warehouse.is_available ? '✅' : '❌';
  const supplyIcon = warehouse.is_accepting_supply ? '📦' : '⛔';
  
  console.log(`\n${index + 1}. ${statusIcon}${supplyIcon} ${warehouse.name} (ID: ${warehouse.warehouse_id})`);
  console.log(`   Type: ${warehouse.type}`);
  console.log(`   Location: ${warehouse.city}, ${warehouse.address}`);
  
  // Capacity details
  if (warehouse.capacity_info) {
    const capacity = warehouse.capacity_info;
    console.log(`   Capacity: ${capacity.available_pallets}/${capacity.max_pallets} pallets (${capacity.utilization_rate}%)`);
    console.log(`   Daily orders: ${capacity.current_daily_orders}/${capacity.max_daily_orders}`);
  }
  
  // Next available slot
  if (warehouse.next_available_slot) {
    console.log(`   Next slot: ${warehouse.next_available_slot}`);
  }
  
  // Services
  if (warehouse.services) {
    const services = warehouse.services;
    const availableServices = [];
    if (services.same_day_processing) availableServices.push('Same-day');
    if (services.weekend_delivery) availableServices.push('Weekend');
    if (services.fragile_items) availableServices.push('Fragile');
    if (services.temperature_controlled) availableServices.push('Temp-controlled');
    
    if (availableServices.length) {
      console.log(`   Services: ${availableServices.join(', ')}`);
    }
  }
  
  // Performance metrics
  if (warehouse.metrics) {
    const metrics = warehouse.metrics;
    console.log(`   Performance:`);
    console.log(`     Processing: ${metrics.processing_time}h avg`);
    console.log(`     Accuracy: ${metrics.accuracy_rate}%`);
    console.log(`     Rating: ${metrics.customer_rating}/5 stars`);
    console.log(`     Monthly volume: ${metrics.monthly_volume} orders`);
    console.log(`     Damage rate: ${metrics.damage_rate}%`);
  }
  
  // Requirements
  if (warehouse.requirements) {
    const req = warehouse.requirements;
    console.log(`   Requirements:`);
    if (req.min_order_value) {
      console.log(`     Min order: ${req.min_order_value} RUB`);
    }
    if (req.max_pallet_weight) {
      console.log(`     Max pallet: ${req.max_pallet_weight}kg`);
    }
    if (req.advance_booking_hours) {
      console.log(`     Advance booking: ${req.advance_booking_hours}h`);
    }
    if (req.supported_categories?.length) {
      console.log(`     Categories: ${req.supported_categories.slice(0, 5).join(', ')}${req.supported_categories.length > 5 ? '...' : ''}`);
    }
  }
  
  // Pricing
  if (warehouse.pricing) {
    const pricing = warehouse.pricing;
    console.log(`   Pricing:`);
    console.log(`     Storage: ${pricing.storage_cost_per_pallet} RUB/day/pallet`);
    console.log(`     Processing: ${pricing.processing_fee} RUB/order`);
    console.log(`     Handling: ${pricing.handling_fee} RUB/pallet`);
    if (pricing.express_fee) {
      console.log(`     Express: ${pricing.express_fee} RUB`);
    }
  }
  
  // Contact
  if (warehouse.contact_info) {
    const contact = warehouse.contact_info;
    console.log(`   Contact: ${contact.phone} (${contact.manager_name})`);
    if (contact.working_hours) {
      console.log(`   Hours: ${contact.working_hours.weekdays}`);
    }
  }
});
```

---

## 🎯 Optimization Utilities

### Intelligent Warehouse Selection
```typescript
class WarehouseOptimizer {
  private readonly api: FboSupplyRequestApi;
  
  constructor(api: FboSupplyRequestApi) {
    this.api = api;
  }
  
  async selectOptimalWarehouse(criteria: {
    region: string;
    supplyType: 'DIRECT' | 'CROSS_DOCK';
    estimatedPallets: number;
    categories: string[];
    maxBudget?: number;
    priorityFactors: {
      cost: number;        // 0-1 weight
      speed: number;       // 0-1 weight
      reliability: number; // 0-1 weight
      capacity: number;    // 0-1 weight
    };
  }) {
    try {
      // Get available warehouses
      const result = await this.api.getWarehouseFboList({
        region: criteria.region,
        warehouse_type: criteria.supplyType,
        min_capacity: criteria.estimatedPallets,
        supported_categories: criteria.categories
      });
      
      if (!result.warehouses?.length) {
        throw new Error('No suitable warehouses found');
      }
      
      // Score each warehouse
      const scoredWarehouses = result.warehouses
        .filter(w => w.is_available && w.is_accepting_supply)
        .map(warehouse => ({
          warehouse,
          score: this.calculateWarehouseScore(warehouse, criteria)
        }))
        .sort((a, b) => b.score - a.score);
      
      if (scoredWarehouses.length === 0) {
        throw new Error('No available warehouses meet criteria');
      }
      
      const optimal = scoredWarehouses[0];
      
      console.log(`🎯 Optimal Warehouse Selected:`);
      console.log(`Name: ${optimal.warehouse.name}`);
      console.log(`Score: ${optimal.score.toFixed(2)}/100`);
      console.log(`Type: ${optimal.warehouse.type}`);
      console.log(`Location: ${optimal.warehouse.city}`);
      
      // Show alternatives
      console.log('\nTop 3 Alternatives:');
      scoredWarehouses.slice(1, 4).forEach((option, index) => {
        console.log(`${index + 2}. ${option.warehouse.name} - Score: ${option.score.toFixed(2)}`);
      });
      
      return {
        optimal: optimal.warehouse,
        alternatives: scoredWarehouses.slice(1, 3).map(s => s.warehouse),
        analysis: {
          totalOptions: result.warehouses.length,
          availableOptions: scoredWarehouses.length,
          optimalScore: optimal.score
        }
      };
      
    } catch (error) {
      console.error('Warehouse optimization failed:', error);
      throw error;
    }
  }
  
  private calculateWarehouseScore(warehouse: any, criteria: any): number {
    let score = 0;
    const factors = criteria.priorityFactors;
    
    // Cost score (0-25 points)
    if (warehouse.pricing && factors.cost > 0) {
      const totalDailyCost = warehouse.pricing.storage_cost_per_pallet * criteria.estimatedPallets;
      if (criteria.maxBudget) {
        const costRatio = totalDailyCost / criteria.maxBudget;
        score += Math.max(0, 25 - (costRatio * 25)) * factors.cost;
      } else {
        score += 20 * factors.cost; // Default score if no budget
      }
    }
    
    // Speed score (0-25 points)
    if (warehouse.metrics && factors.speed > 0) {
      const processingTime = warehouse.metrics.processing_time || 24;
      const speedScore = Math.max(0, 25 - (processingTime / 24 * 15));
      score += speedScore * factors.speed;
      
      // Bonus for same-day processing
      if (warehouse.services?.same_day_processing) {
        score += 5 * factors.speed;
      }
    }
    
    // Reliability score (0-25 points)
    if (warehouse.metrics && factors.reliability > 0) {
      const accuracyScore = (warehouse.metrics.accuracy_rate / 100) * 15;
      const ratingScore = (warehouse.metrics.customer_rating / 5) * 10;
      score += (accuracyScore + ratingScore) * factors.reliability;
    }
    
    // Capacity score (0-25 points)
    if (warehouse.capacity_info && factors.capacity > 0) {
      const utilizationRate = warehouse.capacity_info.utilization_rate || 50;
      const availabilityScore = Math.max(0, 25 - (utilizationRate / 100 * 20));
      score += availabilityScore * factors.capacity;
      
      // Bonus for high total capacity
      if (warehouse.capacity_info.max_pallets >= criteria.estimatedPallets * 3) {
        score += 5 * factors.capacity;
      }
    }
    
    return Math.min(100, Math.max(0, score));
  }
}

// Usage Example
const optimizer = new WarehouseOptimizer(fboSupplyRequestApi);

const optimalResult = await optimizer.selectOptimalWarehouse({
  region: 'Москва',
  supplyType: 'DIRECT',
  estimatedPallets: 20,
  categories: ['Electronics', 'Clothing'],
  maxBudget: 5000,
  priorityFactors: {
    cost: 0.3,
    speed: 0.4,
    reliability: 0.2,
    capacity: 0.1
  }
});
```

### Regional Cluster Analysis
```typescript
async function analyzeRegionalClusters(region: string) {
  const clusters = await fboSupplyRequestApi.getClusterList({ region });
  
  if (!clusters.clusters?.length) {
    console.log('No clusters found in region');
    return;
  }
  
  console.log(`📊 Regional Analysis: ${region}`);
  console.log(`Total clusters: ${clusters.clusters.length}`);
  
  // Aggregate metrics
  let totalCapacity = 0;
  let totalAvailable = 0;
  let totalWarehouses = 0;
  let totalPerformanceScore = 0;
  let performanceCount = 0;
  
  clusters.clusters.forEach(cluster => {
    if (cluster.total_capacity) {
      totalCapacity += cluster.total_capacity.max_pallets || 0;
      totalAvailable += cluster.total_capacity.available_pallets || 0;
    }
    
    totalWarehouses += cluster.warehouses?.length || 0;
    
    if (cluster.performance?.quality_score) {
      totalPerformanceScore += cluster.performance.quality_score;
      performanceCount++;
    }
  });
  
  const avgPerformance = performanceCount > 0 ? totalPerformanceScore / performanceCount : 0;
  const utilizationRate = totalCapacity > 0 ? ((totalCapacity - totalAvailable) / totalCapacity) * 100 : 0;
  
  console.log(`\nRegional Metrics:`);
  console.log(`Total capacity: ${totalCapacity} pallets`);
  console.log(`Available: ${totalAvailable} pallets`);
  console.log(`Utilization: ${utilizationRate.toFixed(1)}%`);
  console.log(`Total warehouses: ${totalWarehouses}`);
  console.log(`Average performance: ${avgPerformance.toFixed(1)}/100`);
  
  // Cluster recommendations
  const recommendedClusters = clusters.clusters
    .filter(c => c.total_capacity?.utilization_rate! < 80)
    .sort((a, b) => (b.performance?.quality_score || 0) - (a.performance?.quality_score || 0));
  
  console.log(`\nRecommended Clusters:`);
  recommendedClusters.slice(0, 3).forEach((cluster, index) => {
    console.log(`${index + 1}. ${cluster.name} - ${cluster.type}`);
    console.log(`   Quality: ${cluster.performance?.quality_score}/100`);
    console.log(`   Utilization: ${cluster.total_capacity?.utilization_rate}%`);
    console.log(`   Warehouses: ${cluster.warehouses?.length}`);
  });
  
  return {
    totalCapacity,
    totalAvailable,
    utilizationRate,
    totalWarehouses,
    avgPerformance,
    recommendedClusters: recommendedClusters.slice(0, 3)
  };
}
```

---

## 📊 API Endpoints Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `getClusterList` | `POST /v1/cluster/list` | Get cluster information |
| `getWarehouseFboList` | `POST /v1/warehouse/fbo/list` | Search FBO warehouses |

---

**[← Back to FBO Supply Request Main](./17-fbo-supply-request.md)**