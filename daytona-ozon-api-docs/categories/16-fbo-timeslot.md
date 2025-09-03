# FBO Timeslot & Logistics

**Timeslot & Logistics Management** - Warehouse timeslot coordination and logistics operations for FBO API.

## Overview

Timeslot & Logistics management handles warehouse delivery scheduling, timeslot availability checking, and logistics coordination for FBO supply orders. This ensures optimal warehouse capacity utilization and smooth delivery operations across 3 specialized methods.

---

## 📋 Methods Overview

### ⏰ Timeslot Management (3 methods)
1. **getSupplyOrderTimeslots** - Get available delivery timeslots
2. **getSupplyOrderTimeslotStatus** - Get timeslot status and occupancy
3. **updateSupplyOrderTimeslot** - Update order delivery timeslot

---

## ⏰ Timeslot Management Methods

### getSupplyOrderTimeslots()
Gets available delivery timeslots for warehouse with capacity and scheduling information.

```typescript
interface FboSupplyOrderTimeslotGetRequest {
  warehouse_id: number;     // Target warehouse ID
  date_from: string;        // Start date for timeslot search
  date_to: string;          // End date for timeslot search
  
  // Optional filters
  supply_type?: 'standard' | 'express' | 'bulk';
  min_duration?: number;    // Minimum timeslot duration in minutes
  max_pallets?: number;     // Maximum pallet capacity needed
}

interface FboSupplyOrderTimeslotGetResponse {
  warehouse_info?: {
    warehouse_id?: number;
    name?: string;
    address?: string;
    working_hours?: {
      monday?: { start: string; end: string; };
      tuesday?: { start: string; end: string; };
      wednesday?: { start: string; end: string; };
      thursday?: { start: string; end: string; };
      friday?: { start: string; end: string; };
      saturday?: { start: string; end: string; };
      sunday?: { start: string; end: string; };
    };
    contact_info?: {
      phone?: string;
      email?: string;
      manager?: string;
    };
  };
  
  timeslots?: Array<{
    timeslot_id?: string;
    date?: string;           // Date in YYYY-MM-DD format
    start_time?: string;     // Start time in HH:MM format
    end_time?: string;       // End time in HH:MM format
    duration?: number;       // Duration in minutes
    
    // Availability
    is_available?: boolean;
    available_capacity?: number;  // Available slots
    max_capacity?: number;        // Maximum slots
    current_occupancy?: number;   // Currently booked slots
    
    // Logistics info
    max_pallets?: number;
    max_vehicles?: number;
    
    // Pricing (if applicable)
    booking_fee?: number;
    express_fee?: number;
    
    // Restrictions
    restrictions?: {
      vehicle_types?: string[];
      min_advance_booking?: number;  // Hours
      cancellation_deadline?: number; // Hours before
    };
    
    // Status
    status?: 'available' | 'limited' | 'full' | 'closed';
    special_notes?: string;
  }>;
  
  // Summary
  total_timeslots?: number;
  available_timeslots?: number;
  recommended_timeslot_id?: string;
}

// Usage Example
const timeslots = await fboApi.getSupplyOrderTimeslots({
  warehouse_id: 123,
  date_from: '2024-01-15T00:00:00Z',
  date_to: '2024-01-22T00:00:00Z',
  supply_type: 'standard',
  max_pallets: 5
});

console.log(`Warehouse: ${timeslots.warehouse_info?.name}`);
console.log(`Address: ${timeslots.warehouse_info?.address}`);
console.log(`Contact: ${timeslots.warehouse_info?.contact_info?.phone}`);

console.log(`\nFound ${timeslots.available_timeslots}/${timeslots.total_timeslots} available timeslots`);

if (timeslots.recommended_timeslot_id) {
  console.log(`Recommended timeslot: ${timeslots.recommended_timeslot_id}`);
}

// Analyze timeslots
timeslots.timeslots?.forEach((slot, index) => {
  console.log(`\n${index + 1}. Timeslot ${slot.timeslot_id}`);
  console.log(`   Date: ${slot.date}`);
  console.log(`   Time: ${slot.start_time} - ${slot.end_time} (${slot.duration} min)`);
  console.log(`   Status: ${slot.status}`);
  
  if (slot.is_available) {
    console.log(`   ✅ Available: ${slot.available_capacity}/${slot.max_capacity} slots`);
    console.log(`   Capacity: ${slot.max_pallets} pallets, ${slot.max_vehicles} vehicles`);
    
    if (slot.booking_fee) {
      console.log(`   Booking fee: ${slot.booking_fee} RUB`);
    }
    
    if (slot.restrictions) {
      const restrictions = slot.restrictions;
      if (restrictions.vehicle_types?.length) {
        console.log(`   Allowed vehicles: ${restrictions.vehicle_types.join(', ')}`);
      }
      if (restrictions.min_advance_booking) {
        console.log(`   Min advance booking: ${restrictions.min_advance_booking} hours`);
      }
      if (restrictions.cancellation_deadline) {
        console.log(`   Cancellation deadline: ${restrictions.cancellation_deadline} hours before`);
      }
    }
  } else {
    console.log(`   ❌ Unavailable: ${slot.status}`);
    if (slot.current_occupancy) {
      console.log(`   Current occupancy: ${slot.current_occupancy}/${slot.max_capacity}`);
    }
  }
  
  if (slot.special_notes) {
    console.log(`   Note: ${slot.special_notes}`);
  }
});

// Working hours
if (timeslots.warehouse_info?.working_hours) {
  console.log('\nWarehouse Working Hours:');
  Object.entries(timeslots.warehouse_info.working_hours).forEach(([day, hours]) => {
    console.log(`${day}: ${hours.start} - ${hours.end}`);
  });
}
```

### getSupplyOrderTimeslotStatus()
Gets detailed status information for specific timeslot including current bookings.

```typescript
interface FboSupplyOrderTimeslotStatusRequest {
  timeslot_id: string;
}

interface FboSupplyOrderTimeslotStatusResponse {
  timeslot_id?: string;
  
  // Basic info
  warehouse_id?: number;
  warehouse_name?: string;
  date?: string;
  start_time?: string;
  end_time?: string;
  
  // Current status
  booking_status?: 'open' | 'limited' | 'full' | 'closed';
  is_available?: boolean;
  
  // Capacity details
  capacity_info?: {
    max_capacity?: number;
    current_bookings?: number;
    available_slots?: number;
    capacity_utilization?: number; // Percentage 0-100
    
    // Resource details
    max_pallets?: number;
    current_pallets?: number;
    available_pallets?: number;
    
    max_vehicles?: number;
    current_vehicles?: number;
    available_vehicles?: number;
  };
  
  // Current bookings (if available)
  current_bookings?: Array<{
    supply_order_id?: number;
    seller_name?: string;
    estimated_pallets?: number;
    booking_time?: string;
    status?: 'confirmed' | 'pending' | 'cancelled';
  }>;
  
  // Pricing
  pricing?: {
    base_fee?: number;
    peak_hour_multiplier?: number;
    current_price?: number;
    
    // Dynamic pricing
    demand_level?: 'low' | 'medium' | 'high';
    price_trend?: 'stable' | 'increasing' | 'decreasing';
  };
  
  // Operational info
  operational_info?: {
    weather_impact?: 'none' | 'minor' | 'major';
    traffic_conditions?: 'normal' | 'heavy' | 'congested';
    warehouse_efficiency?: number; // Percentage
    estimated_wait_time?: number;  // Minutes
    
    // Staff availability
    available_loaders?: number;
    available_supervisors?: number;
  };
  
  // Recommendations
  recommendations?: {
    better_alternatives?: string[]; // Other timeslot IDs
    optimal_pallet_count?: number;
    suggested_arrival_buffer?: number; // Minutes
    preparation_checklist?: string[];
  };
}

// Usage Example
const timeslotStatus = await fboApi.getSupplyOrderTimeslotStatus({
  timeslot_id: 'TS_123_20240115_0900'
});

console.log(`Timeslot Status: ${timeslotStatus.timeslot_id}`);
console.log(`Warehouse: ${timeslotStatus.warehouse_name}`);
console.log(`Date/Time: ${timeslotStatus.date} ${timeslotStatus.start_time}-${timeslotStatus.end_time}`);
console.log(`Booking Status: ${timeslotStatus.booking_status}`);

// Capacity analysis
if (timeslotStatus.capacity_info) {
  const capacity = timeslotStatus.capacity_info;
  console.log('\nCapacity Analysis:');
  console.log(`Overall: ${capacity.current_bookings}/${capacity.max_capacity} slots (${capacity.capacity_utilization}%)`);
  console.log(`Pallets: ${capacity.current_pallets}/${capacity.max_pallets} available: ${capacity.available_pallets}`);
  console.log(`Vehicles: ${capacity.current_vehicles}/${capacity.max_vehicles} available: ${capacity.available_vehicles}`);
  
  // Availability assessment
  if (capacity.capacity_utilization! <= 50) {
    console.log('✅ Low utilization - good availability');
  } else if (capacity.capacity_utilization! <= 80) {
    console.log('⚠️  Medium utilization - book soon');
  } else {
    console.log('🔴 High utilization - limited availability');
  }
}

// Current bookings
if (timeslotStatus.current_bookings?.length) {
  console.log('\nCurrent Bookings:');
  timeslotStatus.current_bookings.forEach((booking, index) => {
    console.log(`${index + 1}. Order ${booking.supply_order_id} - ${booking.seller_name}`);
    console.log(`   Pallets: ${booking.estimated_pallets}, Status: ${booking.status}`);
    console.log(`   Booked: ${booking.booking_time}`);
  });
}

// Pricing information
if (timeslotStatus.pricing) {
  const pricing = timeslotStatus.pricing;
  console.log('\nPricing Information:');
  console.log(`Base fee: ${pricing.base_fee} RUB`);
  console.log(`Current price: ${pricing.current_price} RUB`);
  console.log(`Demand level: ${pricing.demand_level}`);
  console.log(`Price trend: ${pricing.price_trend}`);
  
  if (pricing.peak_hour_multiplier && pricing.peak_hour_multiplier > 1) {
    console.log(`⚠️  Peak hour multiplier: ${pricing.peak_hour_multiplier}x`);
  }
}

// Operational conditions
if (timeslotStatus.operational_info) {
  const ops = timeslotStatus.operational_info;
  console.log('\nOperational Conditions:');
  console.log(`Weather impact: ${ops.weather_impact}`);
  console.log(`Traffic conditions: ${ops.traffic_conditions}`);
  console.log(`Warehouse efficiency: ${ops.warehouse_efficiency}%`);
  console.log(`Estimated wait time: ${ops.estimated_wait_time} minutes`);
  
  if (ops.available_loaders && ops.available_supervisors) {
    console.log(`Staff: ${ops.available_loaders} loaders, ${ops.available_supervisors} supervisors`);
  }
}

// Recommendations
if (timeslotStatus.recommendations) {
  const rec = timeslotStatus.recommendations;
  console.log('\nRecommendations:');
  
  if (rec.better_alternatives?.length) {
    console.log(`Better alternatives: ${rec.better_alternatives.join(', ')}`);
  }
  
  if (rec.optimal_pallet_count) {
    console.log(`Optimal pallet count: ${rec.optimal_pallet_count}`);
  }
  
  if (rec.suggested_arrival_buffer) {
    console.log(`Suggested arrival buffer: ${rec.suggested_arrival_buffer} minutes`);
  }
  
  if (rec.preparation_checklist?.length) {
    console.log('Preparation checklist:');
    rec.preparation_checklist.forEach((item, index) => {
      console.log(`  ${index + 1}. ${item}`);
    });
  }
}
```

### updateSupplyOrderTimeslot()
Updates delivery timeslot for existing supply order.

```typescript
interface FboSupplyOrderTimeslotUpdateRequest {
  supply_order_id: number;
  timeslot_id: string;
  
  // Additional info
  reason?: string;          // Reason for change
  notes?: string;           // Additional notes
  
  // Confirmation
  acknowledge_fees?: boolean; // Acknowledge potential fees
}

interface FboSupplyOrderTimeslotUpdateResponse {
  result?: 'success' | 'error';
  task_id?: string;         // Task ID for tracking
  
  // Updated information
  new_timeslot?: {
    timeslot_id?: string;
    date?: string;
    start_time?: string;
    end_time?: string;
    warehouse_name?: string;
  };
  
  // Previous information
  previous_timeslot?: {
    timeslot_id?: string;
    date?: string;
    start_time?: string;
    end_time?: string;
  };
  
  // Fees and costs
  fees?: {
    reschedule_fee?: number;
    peak_hour_fee?: number;
    total_fee?: number;
    currency?: string;
  };
  
  // Confirmation requirements
  requires_confirmation?: boolean;
  confirmation_deadline?: string;
  
  // Error information
  error_code?: string;
  error_message?: string;
  
  // Warnings
  warnings?: string[];
}

// Usage Example
const updateResult = await fboApi.updateSupplyOrderTimeslot({
  supply_order_id: 123456,
  timeslot_id: 'TS_123_20240118_1400',
  reason: 'Driver availability changed',
  notes: 'Rescheduled to afternoon slot due to morning conflicts',
  acknowledge_fees: true
});

if (updateResult.result === 'success') {
  console.log('✅ Timeslot updated successfully');
  console.log(`Task ID: ${updateResult.task_id}`);
  
  // Show updated timeslot
  if (updateResult.new_timeslot) {
    const newSlot = updateResult.new_timeslot;
    console.log('\nNew Timeslot:');
    console.log(`Timeslot ID: ${newSlot.timeslot_id}`);
    console.log(`Date/Time: ${newSlot.date} ${newSlot.start_time}-${newSlot.end_time}`);
    console.log(`Warehouse: ${newSlot.warehouse_name}`);
  }
  
  // Show previous timeslot for reference
  if (updateResult.previous_timeslot) {
    const prevSlot = updateResult.previous_timeslot;
    console.log('\nPrevious Timeslot:');
    console.log(`Date/Time: ${prevSlot.date} ${prevSlot.start_time}-${prevSlot.end_time}`);
  }
  
  // Fee information
  if (updateResult.fees && updateResult.fees.total_fee! > 0) {
    console.log('\nFees Applied:');
    if (updateResult.fees.reschedule_fee) {
      console.log(`Reschedule fee: ${updateResult.fees.reschedule_fee} ${updateResult.fees.currency}`);
    }
    if (updateResult.fees.peak_hour_fee) {
      console.log(`Peak hour fee: ${updateResult.fees.peak_hour_fee} ${updateResult.fees.currency}`);
    }
    console.log(`Total fee: ${updateResult.fees.total_fee} ${updateResult.fees.currency}`);
  }
  
  // Confirmation requirements
  if (updateResult.requires_confirmation) {
    console.log(`⚠️  Confirmation required by: ${updateResult.confirmation_deadline}`);
  }
  
  // Warnings
  if (updateResult.warnings?.length) {
    console.log('\nWarnings:');
    updateResult.warnings.forEach((warning, index) => {
      console.log(`${index + 1}. ${warning}`);
    });
  }
  
} else {
  console.error('❌ Timeslot update failed');
  console.error(`Error code: ${updateResult.error_code}`);
  console.error(`Error message: ${updateResult.error_message}`);
}
```

---

## 💼 Business Workflows

### 1. Smart Timeslot Selection
```typescript
class TimeslotOptimizer {
  private readonly fboApi: FboApi;
  
  constructor(fboApi: FboApi) {
    this.fboApi = fboApi;
  }
  
  async findOptimalTimeslot(
    warehouseId: number, 
    dateFrom: string, 
    dateTo: string,
    requirements: {
      maxPallets?: number;
      preferredTime?: 'morning' | 'afternoon' | 'evening';
      maxCost?: number;
      minAdvanceHours?: number;
    } = {}
  ) {
    try {
      // Get all available timeslots
      const timeslots = await this.fboApi.getSupplyOrderTimeslots({
        warehouse_id: warehouseId,
        date_from: dateFrom,
        date_to: dateTo,
        max_pallets: requirements.maxPallets
      });
      
      if (!timeslots.timeslots?.length) {
        throw new Error('No timeslots available for specified period');
      }
      
      console.log(`Analyzing ${timeslots.timeslots.length} available timeslots...`);
      
      // Score each timeslot
      const scoredTimeslots = await Promise.all(
        timeslots.timeslots
          .filter(slot => slot.is_available)
          .map(async slot => {
            const status = await this.fboApi.getSupplyOrderTimeslotStatus({
              timeslot_id: slot.timeslot_id!
            });
            
            return {
              slot,
              status,
              score: this.calculateTimeslotScore(slot, status, requirements)
            };
          })
      );
      
      // Sort by score (highest first)
      scoredTimeslots.sort((a, b) => b.score - a.score);
      
      const optimal = scoredTimeslots[0];
      
      console.log(`\n🎯 Optimal Timeslot Found:`);
      console.log(`Timeslot ID: ${optimal.slot.timeslot_id}`);
      console.log(`Date/Time: ${optimal.slot.date} ${optimal.slot.start_time}-${optimal.slot.end_time}`);
      console.log(`Score: ${optimal.score.toFixed(2)}/100`);
      console.log(`Availability: ${optimal.slot.available_capacity}/${optimal.slot.max_capacity} slots`);
      
      if (optimal.status.pricing) {
        console.log(`Cost: ${optimal.status.pricing.current_price} RUB`);
      }
      
      // Alternative recommendations
      console.log('\nTop 3 Alternatives:');
      scoredTimeslots.slice(1, 4).forEach((option, index) => {
        console.log(`${index + 2}. ${option.slot.timeslot_id} - Score: ${option.score.toFixed(2)}`);
        console.log(`   ${option.slot.date} ${option.slot.start_time}-${option.slot.end_time}`);
      });
      
      return {
        optimal: optimal.slot,
        alternatives: scoredTimeslots.slice(1, 3).map(s => s.slot),
        analysis: {
          totalOptions: timeslots.timeslots.length,
          availableOptions: scoredTimeslots.length,
          optimalScore: optimal.score
        }
      };
      
    } catch (error) {
      console.error('Timeslot optimization failed:', error);
      throw error;
    }
  }
  
  private calculateTimeslotScore(slot: any, status: any, requirements: any): number {
    let score = 0;
    
    // Base availability score (0-30 points)
    const utilizationRate = status.capacity_info?.capacity_utilization || 0;
    score += Math.max(0, 30 - (utilizationRate * 0.3)); // Lower utilization = higher score
    
    // Time preference score (0-20 points)
    if (requirements.preferredTime && slot.start_time) {
      const hour = parseInt(slot.start_time.split(':')[0]);
      const timeScore = this.getTimePreferenceScore(hour, requirements.preferredTime);
      score += timeScore;
    } else {
      score += 10; // Neutral score if no preference
    }
    
    // Cost score (0-20 points)
    if (status.pricing?.current_price && requirements.maxCost) {
      const costRatio = status.pricing.current_price / requirements.maxCost;
      score += Math.max(0, 20 - (costRatio * 20));
    } else {
      score += 15; // Default score if no cost constraints
    }
    
    // Operational efficiency score (0-15 points)
    if (status.operational_info?.warehouse_efficiency) {
      score += (status.operational_info.warehouse_efficiency / 100) * 15;
    } else {
      score += 10; // Default score
    }
    
    // Wait time score (0-10 points)
    if (status.operational_info?.estimated_wait_time) {
      const waitTime = status.operational_info.estimated_wait_time;
      score += Math.max(0, 10 - (waitTime / 10)); // Lower wait time = higher score
    } else {
      score += 8; // Default score
    }
    
    // Weather and traffic score (0-5 points)
    if (status.operational_info) {
      const ops = status.operational_info;
      if (ops.weather_impact === 'none' && ops.traffic_conditions === 'normal') {
        score += 5;
      } else if (ops.weather_impact === 'minor' || ops.traffic_conditions === 'heavy') {
        score += 3;
      } else {
        score += 1;
      }
    } else {
      score += 3; // Default score
    }
    
    return Math.min(100, Math.max(0, score));
  }
  
  private getTimePreferenceScore(hour: number, preference: string): number {
    switch (preference) {
      case 'morning':   // 6-11 AM
        return hour >= 6 && hour <= 11 ? 20 : Math.max(0, 20 - Math.abs(9 - hour) * 3);
      case 'afternoon': // 12-17 PM  
        return hour >= 12 && hour <= 17 ? 20 : Math.max(0, 20 - Math.abs(14 - hour) * 3);
      case 'evening':   // 18-22 PM
        return hour >= 18 && hour <= 22 ? 20 : Math.max(0, 20 - Math.abs(20 - hour) * 3);
      default:
        return 10;
    }
  }
}

// Usage Example
const optimizer = new TimeslotOptimizer(fboApi);

const optimalResult = await optimizer.findOptimalTimeslot(
  123, // warehouse_id
  '2024-01-15T00:00:00Z',
  '2024-01-22T00:00:00Z',
  {
    maxPallets: 10,
    preferredTime: 'morning',
    maxCost: 5000,
    minAdvanceHours: 24
  }
);

console.log('Optimization completed!');
console.log(`Optimal timeslot: ${optimalResult.optimal.timeslot_id}`);
console.log(`Score: ${optimalResult.analysis.optimalScore}/100`);
```

### 2. Dynamic Timeslot Monitoring
```typescript
class TimeslotMonitor {
  private readonly fboApi: FboApi;
  private monitoringTimeslots: Map<string, any> = new Map();
  
  constructor(fboApi: FboApi) {
    this.fboApi = fboApi;
  }
  
  addTimeslotToMonitor(timeslotId: string, thresholds: {
    maxUtilization?: number;
    maxWaitTime?: number;
    minEfficiency?: number;
  }) {
    this.monitoringTimeslots.set(timeslotId, thresholds);
    console.log(`Added ${timeslotId} to monitoring with thresholds:`, thresholds);
  }
  
  async checkTimeslots(): Promise<Array<{ timeslotId: string; alerts: string[]; status: any }>> {
    const results = [];
    
    for (const [timeslotId, thresholds] of this.monitoringTimeslots.entries()) {
      try {
        const status = await this.fboApi.getSupplyOrderTimeslotStatus({
          timeslot_id: timeslotId
        });
        
        const alerts = this.analyzeTimeslotStatus(status, thresholds);
        
        if (alerts.length > 0) {
          console.log(`🚨 Alerts for timeslot ${timeslotId}:`);
          alerts.forEach(alert => console.log(`  - ${alert}`));
        }
        
        results.push({ timeslotId, alerts, status });
        
      } catch (error) {
        console.error(`Failed to check timeslot ${timeslotId}:`, error);
        results.push({ 
          timeslotId, 
          alerts: [`Error checking status: ${error.message}`], 
          status: null 
        });
      }
    }
    
    return results;
  }
  
  private analyzeTimeslotStatus(status: any, thresholds: any): string[] {
    const alerts: string[] = [];
    
    // Check utilization
    if (thresholds.maxUtilization && status.capacity_info?.capacity_utilization) {
      if (status.capacity_info.capacity_utilization > thresholds.maxUtilization) {
        alerts.push(`High utilization: ${status.capacity_info.capacity_utilization}% (threshold: ${thresholds.maxUtilization}%)`);
      }
    }
    
    // Check wait time
    if (thresholds.maxWaitTime && status.operational_info?.estimated_wait_time) {
      if (status.operational_info.estimated_wait_time > thresholds.maxWaitTime) {
        alerts.push(`Long wait time: ${status.operational_info.estimated_wait_time} min (threshold: ${thresholds.maxWaitTime} min)`);
      }
    }
    
    // Check efficiency
    if (thresholds.minEfficiency && status.operational_info?.warehouse_efficiency) {
      if (status.operational_info.warehouse_efficiency < thresholds.minEfficiency) {
        alerts.push(`Low efficiency: ${status.operational_info.warehouse_efficiency}% (threshold: ${thresholds.minEfficiency}%)`);
      }
    }
    
    // Check operational conditions
    if (status.operational_info?.weather_impact === 'major') {
      alerts.push('Major weather impact detected');
    }
    
    if (status.operational_info?.traffic_conditions === 'congested') {
      alerts.push('Congested traffic conditions');
    }
    
    return alerts;
  }
  
  startMonitoring(intervalMinutes: number = 15): NodeJS.Timeout {
    console.log(`Starting timeslot monitoring (every ${intervalMinutes} minutes)`);
    
    return setInterval(async () => {
      console.log(`\n🔄 Checking ${this.monitoringTimeslots.size} timeslots...`);
      const results = await this.checkTimeslots();
      
      const alertCount = results.reduce((sum, result) => sum + result.alerts.length, 0);
      console.log(`Monitoring complete: ${alertCount} alerts detected`);
      
    }, intervalMinutes * 60 * 1000);
  }
}
```

---

## 🎯 Best Practices

### Timeslot Selection Strategy
```typescript
function selectTimeslotStrategy(requirements: any): string {
  // Cost-optimized strategy
  if (requirements.priority === 'cost') {
    return 'select_lowest_cost';
  }
  
  // Speed-optimized strategy  
  if (requirements.priority === 'speed') {
    return 'select_earliest_available';
  }
  
  // Reliability-optimized strategy
  if (requirements.priority === 'reliability') {
    return 'select_best_conditions';
  }
  
  return 'balanced_selection';
}
```

---

## 📊 API Endpoints Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `getSupplyOrderTimeslots` | `POST /v1/supply-order/timeslot/get` | Get available timeslots |
| `getSupplyOrderTimeslotStatus` | `POST /v1/supply-order/timeslot/status` | Get timeslot status |
| `updateSupplyOrderTimeslot` | `POST /v1/supply-order/timeslot/update` | Update order timeslot |

---

**[← Back to FBO API Main](./16-fbo.md)**