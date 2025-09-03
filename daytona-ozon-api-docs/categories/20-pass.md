# 20. API Пропуски

**API Пропуски** - Управление пропусками прибытия и доступом к складу для OZON Seller API.

## Overview

The Pass API provides comprehensive warehouse access control through digital arrival passes. This focused API manages vehicle and driver authorization for both regular deliveries and return processing, covering carriage pass management, return pass operations, and access control across 7 essential methods.

### Key Features
- **Carriage Pass Management**: Vehicle authorization for regular deliveries
- **Return Pass Operations**: Special passes for product returns processing
- **Driver Verification**: Driver license and identity validation
- **Access Control**: Warehouse security and entry management
- **Schedule Management**: Arrival time coordination and slot booking
- **Status Tracking**: Real-time pass status monitoring

---

## 📋 Available Methods

### Carriage Pass Operations
1. **createCarriagePass** - Create arrival passes for delivery carriages
2. **updateCarriagePass** - Update existing carriage pass information
3. **deleteCarriagePass** - Remove carriage passes
4. **getPassList** - Retrieve filtered list of passes with pagination

### Return Pass Operations
5. **createReturnPass** - Create passes for product returns
6. **updateReturnPass** - Update return pass details
7. **deleteReturnPass** - Remove return passes

---

## 🚀 Quick Start Example

```typescript
import { OzonSellerAPI } from 'daytona-ozon-seller-api';

const api = new OzonSellerAPI({
  clientId: 'your-client-id',
  apiKey: 'your-api-key'
});

// Complete pass management workflow
async function passManagementWorkflow() {
  // 1. Create carriage pass for regular delivery
  const carriagePass = await api.pass.createCarriagePass({
    carriage_id: 12345,
    arrival_passes: [{
      vehicle_number: 'А123БВ777',
      driver_name: 'Иванов Иван Иванович',
      driver_license: '12 34 567890',
      arrival_date: '2024-01-15T09:00:00Z',
      comment: 'Плановая поставка товаров'
    }, {
      vehicle_number: 'Б456ГД888',
      driver_name: 'Петров Петр Петрович',
      driver_license: '98 76 543210',
      arrival_date: '2024-01-15T14:00:00Z',
      comment: 'Дополнительная поставка'
    }]
  });
  
  console.log(`✅ Created ${carriagePass.arrival_pass_ids?.length} carriage passes`);
  carriagePass.arrival_pass_ids?.forEach(id => {
    console.log(`  Pass ID: ${id}`);
  });
  
  // 2. Create return pass for product returns
  const returnPass = await api.pass.createReturnPass({
    arrival_passes: [{
      vehicle_number: 'В456ГД888',
      driver_name: 'Петров Петр Петрович',
      driver_license: '98 76 543210',
      arrival_date: '2024-01-16T11:00:00Z',
      posting_number: '12345-0001-1',
      comment: 'Возврат товаров по претензии'
    }]
  });
  
  console.log(`✅ Created ${returnPass.arrival_pass_ids?.length} return passes`);
  
  // 3. Get all passes with filtering
  const allPasses = await api.pass.getPassList({
    limit: 100,
    filter: {
      carriage_id: 12345,
      status: 'ACTIVE',
      date_from: '2024-01-15',
      date_to: '2024-01-16',
      arrival_reason: 'FBS_DELIVERY',
      only_active_passes: true
    }
  });
  
  console.log(`📋 Found ${allPasses.arrival_passes?.length} active passes`);
  allPasses.arrival_passes?.forEach(pass => {
    console.log(`  ${pass.arrival_pass_id}: ${pass.vehicle_number} - ${pass.driver_name}`);
    console.log(`    Status: ${pass.status}, Arrival: ${pass.arrival_date}`);
  });
  
  // 4. Update pass information if needed
  if (carriagePass.arrival_pass_ids && carriagePass.arrival_pass_ids.length > 0) {
    await api.pass.updateCarriagePass({
      carriage_id: 12345,
      arrival_passes: [{
        arrival_pass_id: carriagePass.arrival_pass_ids[0],
        vehicle_number: 'А123БВ777',
        driver_name: 'Иванов Иван Иванович',
        driver_license: '12 34 567890',
        arrival_date: '2024-01-15T10:00:00Z', // Updated time
        comment: 'Время прибытия изменено'
      }]
    });
    
    console.log('✅ Pass updated successfully');
  }
}
```

---

## 📊 Core Data Models

### Pass Structure
```typescript
interface ArrivalPass {
  arrival_pass_id?: string;         // Pass identifier (for updates)
  vehicle_number: string;           // Vehicle license plate (required)
  driver_name: string;              // Full driver name (required)
  driver_license: string;           // Driver's license number (required)
  arrival_date: string;             // ISO 8601 arrival timestamp (required)
  comment?: string;                 // Optional notes or description
  posting_number?: string;          // For return passes - posting being returned
  
  // Response-only fields
  status?: PassStatus;              // Current pass status
  carriage_id?: number;             // Associated carriage ID
  warehouse_id?: string;            // Target warehouse identifier
  created_at?: string;              // Pass creation timestamp
  updated_at?: string;              // Last modification timestamp
}

type PassStatus = 
  | 'ACTIVE'                       // Pass is active and valid
  | 'EXPIRED'                      // Pass has expired
  | 'USED'                         // Pass has been used for entry
  | 'CANCELLED';                   // Pass has been cancelled

type ArrivalReason = 
  | 'FBS_DELIVERY'                 // FBS product delivery
  | 'FBO_SUPPLY'                   // FBO stock supply
  | 'RETURN_PROCESSING'            // Product return processing
  | 'MAINTENANCE'                  // Warehouse maintenance
  | 'OTHER';                       // Other reasons
```

### Filter Options
```typescript
interface PassFilter {
  carriage_id?: number;            // Filter by carriage ID
  status?: PassStatus;             // Filter by pass status
  arrival_reason?: ArrivalReason;  // Filter by arrival reason
  warehouse_ids?: string[];        // Filter by warehouse IDs
  date_from?: string;              // Start date filter (YYYY-MM-DD)
  date_to?: string;                // End date filter (YYYY-MM-DD)
  vehicle_number?: string;         // Filter by vehicle number
  driver_name?: string;            // Filter by driver name
  only_active_passes?: boolean;    // Show only active passes
}
```

---

## 🛠️ Method Details

## Carriage Pass Operations

### 1. createCarriagePass

Creates arrival passes for delivery carriages.

**Request Interface:**
```typescript
interface PassCreateCarriagePassRequest {
  carriage_id: number;             // Carriage identifier
  arrival_passes: Array<{
    vehicle_number: string;        // Vehicle license plate
    driver_name: string;           // Full driver name
    driver_license: string;        // Driver's license number
    arrival_date: string;          // ISO 8601 timestamp
    comment?: string;              // Optional description
  }>;
}
```

**Response Interface:**
```typescript
interface PassCreateCarriagePassResponse {
  arrival_pass_ids?: string[];     // Created pass identifiers
}
```

**Usage Examples:**

#### Single Vehicle Pass
```typescript
async function createSingleCarriagePass() {
  const result = await api.pass.createCarriagePass({
    carriage_id: 12345,
    arrival_passes: [{
      vehicle_number: 'А123БВ777',
      driver_name: 'Иванов Иван Иванович',
      driver_license: '12 34 567890',
      arrival_date: '2024-01-15T09:00:00Z',
      comment: 'Регулярная поставка'
    }]
  });
  
  if (result.arrival_pass_ids && result.arrival_pass_ids.length > 0) {
    console.log(`Pass created with ID: ${result.arrival_pass_ids[0]}`);
  }
}
```

#### Multiple Vehicle Passes
```typescript
async function createMultipleCarriagePasses() {
  const vehicles = [
    {
      vehicle_number: 'А111БВ222',
      driver_name: 'Петров Петр Петрович',
      driver_license: '11 22 333444',
      arrival_date: '2024-01-15T08:00:00Z',
      comment: 'Первая машина - основной груз'
    },
    {
      vehicle_number: 'В333ГД444',
      driver_name: 'Сидоров Сидор Сидорович',
      driver_license: '55 66 777888',
      arrival_date: '2024-01-15T10:00:00Z',
      comment: 'Вторая машина - дополнительный груз'
    },
    {
      vehicle_number: 'Г555ЕЖ666',
      driver_name: 'Козлов Козло Козлович',
      driver_license: '99 00 111222',
      arrival_date: '2024-01-15T12:00:00Z',
      comment: 'Третья машина - срочные товары'
    }
  ];
  
  const result = await api.pass.createCarriagePass({
    carriage_id: 12345,
    arrival_passes: vehicles
  });
  
  console.log(`Created ${result.arrival_pass_ids?.length} passes for convoy delivery`);
  result.arrival_pass_ids?.forEach((id, index) => {
    console.log(`Vehicle ${index + 1} (${vehicles[index].vehicle_number}): Pass ${id}`);
  });
}
```

### 2. updateCarriagePass

Updates existing carriage pass information.

**Request Interface:**
```typescript
interface PassUpdateCarriagePassRequest {
  carriage_id: number;
  arrival_passes: Array<{
    arrival_pass_id: string;       // Existing pass ID to update
    vehicle_number: string;
    driver_name: string;
    driver_license: string;
    arrival_date: string;
    comment?: string;
  }>;
}
```

**Usage Example:**
```typescript
async function updateCarriagePassInfo() {
  // Update arrival time and driver information
  await api.pass.updateCarriagePass({
    carriage_id: 12345,
    arrival_passes: [{
      arrival_pass_id: '67890',
      vehicle_number: 'А123БВ777',
      driver_name: 'Иванов Иван Петрович', // Changed middle name
      driver_license: '12 34 567890',
      arrival_date: '2024-01-15T11:00:00Z', // Delayed by 2 hours
      comment: 'Задержка из-за пробок'
    }]
  });
  
  console.log('Pass information updated successfully');
}
```

### 3. deleteCarriagePass

Removes carriage passes.

**Request Interface:**
```typescript
interface PassDeleteCarriagePassRequest {
  carriage_id: number;
  arrival_pass_ids: string[];      // Pass IDs to delete
}
```

**Usage Example:**
```typescript
async function cancelCarriagePasses(passIds: string[]) {
  await api.pass.deleteCarriagePass({
    carriage_id: 12345,
    arrival_pass_ids: passIds
  });
  
  console.log(`Cancelled ${passIds.length} carriage passes`);
}
```

---

## Return Pass Operations

### 4. createReturnPass

Creates passes for product returns.

**Request Interface:**
```typescript
interface PassCreateReturnPassRequest {
  arrival_passes: Array<{
    vehicle_number: string;
    driver_name: string;
    driver_license?: string;       // Optional for returns
    arrival_date: string;
    posting_number: string;        // Required for returns
    comment?: string;
  }>;
}
```

**Response Interface:**
```typescript
interface PassCreateReturnPassResponse {
  arrival_pass_ids?: string[];
}
```

**Usage Examples:**

#### Single Return Pass
```typescript
async function createSingleReturnPass() {
  const result = await api.pass.createReturnPass({
    arrival_passes: [{
      vehicle_number: 'Р777ЕТ999',
      driver_name: 'Возвратов Возврат Возвратович',
      driver_license: '77 88 999000',
      arrival_date: '2024-01-20T14:00:00Z',
      posting_number: '12345-0001-1',
      comment: 'Возврат товара по претензии клиента'
    }]
  });
  
  console.log(`Return pass created: ${result.arrival_pass_ids?.[0]}`);
}
```

#### Multiple Return Processing
```typescript
async function createMultipleReturnPasses() {
  const returns = [
    {
      vehicle_number: 'Р111ЕТ222',
      driver_name: 'Возвратов Первый Первович',
      posting_number: '12345-0001-1',
      arrival_date: '2024-01-20T09:00:00Z',
      comment: 'Брак при доставке'
    },
    {
      vehicle_number: 'Р333УР444',
      driver_name: 'Возвратов Второй Вторович',
      posting_number: '12345-0002-1',
      arrival_date: '2024-01-20T11:00:00Z',
      comment: 'Не подошёл размер'
    },
    {
      vehicle_number: 'Р555НЫ666',
      driver_name: 'Возвратов Третий Третьевич',
      posting_number: '12345-0003-1',
      arrival_date: '2024-01-20T13:00:00Z',
      comment: 'Отмена заказа клиентом'
    }
  ];
  
  const result = await api.pass.createReturnPass({
    arrival_passes: returns
  });
  
  console.log(`Created ${result.arrival_pass_ids?.length} return passes`);
}
```

### 5. updateReturnPass

Updates return pass details.

**Request Interface:**
```typescript
interface PassUpdateReturnPassRequest {
  arrival_passes: Array<{
    arrival_pass_id: string;
    vehicle_number: string;
    driver_name: string;
    driver_license?: string;
    arrival_date: string;
    posting_number: string;
    comment?: string;
  }>;
}
```

### 6. deleteReturnPass

Removes return passes.

**Request Interface:**
```typescript
interface PassDeleteReturnPassRequest {
  arrival_pass_ids: string[];
}
```

---

## Pass Listing and Monitoring

### 7. getPassList

Retrieves filtered list of passes with pagination.

**Request Interface:**
```typescript
interface PassListRequest {
  limit?: number;                  // Max 1000, default 100
  cursor?: string;                 // Pagination cursor
  filter?: {
    carriage_id?: number;
    status?: PassStatus;
    arrival_reason?: ArrivalReason;
    warehouse_ids?: string[];
    date_from?: string;            // YYYY-MM-DD
    date_to?: string;              // YYYY-MM-DD
    vehicle_number?: string;
    driver_name?: string;
    only_active_passes?: boolean;
  };
}
```

**Response Interface:**
```typescript
interface PassListResponse {
  arrival_passes?: Array<{
    arrival_pass_id: string;
    vehicle_number: string;
    driver_name: string;
    driver_license?: string;
    arrival_date: string;
    status: PassStatus;
    carriage_id?: number;
    posting_number?: string;       // For return passes
    warehouse_id?: string;
    arrival_reason?: ArrivalReason;
    comment?: string;
    created_at: string;
    updated_at?: string;
  }>;
  cursor?: string;                 // Next page cursor
  has_next: boolean;              // Whether more pages exist
}
```

**Usage Examples:**

#### Basic Pass Listing
```typescript
async function listActivePasses() {
  const passes = await api.pass.getPassList({
    limit: 50,
    filter: {
      status: 'ACTIVE',
      only_active_passes: true
    }
  });
  
  console.log(`Found ${passes.arrival_passes?.length} active passes`);
  passes.arrival_passes?.forEach(pass => {
    console.log(`${pass.arrival_pass_id}: ${pass.vehicle_number} - ${pass.driver_name}`);
    console.log(`  Arrival: ${new Date(pass.arrival_date).toLocaleString()}`);
    console.log(`  Status: ${pass.status}`);
  });
}
```

#### Paginated Pass Processing
```typescript
async function processAllPasses() {
  let cursor: string | undefined;
  let totalProcessed = 0;
  
  do {
    const passes = await api.pass.getPassList({
      limit: 100,
      cursor,
      filter: {
        date_from: '2024-01-01',
        date_to: '2024-01-31',
        arrival_reason: 'FBS_DELIVERY'
      }
    });
    
    // Process this batch
    if (passes.arrival_passes) {
      for (const pass of passes.arrival_passes) {
        console.log(`Processing pass ${pass.arrival_pass_id}`);
        
        // Check if pass is expiring soon
        const arrivalTime = new Date(pass.arrival_date).getTime();
        const now = Date.now();
        const hoursUntilArrival = (arrivalTime - now) / (1000 * 60 * 60);
        
        if (hoursUntilArrival < 2 && hoursUntilArrival > 0) {
          console.log(`⚠️ Pass ${pass.arrival_pass_id} expires in ${Math.round(hoursUntilArrival)} hours`);
        }
      }
      
      totalProcessed += passes.arrival_passes.length;
    }
    
    cursor = passes.cursor;
  } while (cursor);
  
  console.log(`Processed ${totalProcessed} total passes`);
}
```

#### Advanced Filtering
```typescript
async function getFilteredPasses() {
  const filters = [
    {
      name: 'Today\'s arrivals',
      filter: {
        date_from: new Date().toISOString().split('T')[0],
        date_to: new Date().toISOString().split('T')[0],
        status: 'ACTIVE'
      }
    },
    {
      name: 'Return processing',
      filter: {
        arrival_reason: 'RETURN_PROCESSING',
        only_active_passes: true
      }
    },
    {
      name: 'Specific warehouse',
      filter: {
        warehouse_ids: ['12345', '67890'],
        status: 'ACTIVE'
      }
    }
  ];
  
  for (const filterConfig of filters) {
    console.log(`\n📋 ${filterConfig.name}:`);
    
    const passes = await api.pass.getPassList({
      limit: 100,
      filter: filterConfig.filter
    });
    
    if (passes.arrival_passes && passes.arrival_passes.length > 0) {
      passes.arrival_passes.forEach(pass => {
        console.log(`  ${pass.vehicle_number} - ${pass.driver_name}`);
        console.log(`    Arrival: ${new Date(pass.arrival_date).toLocaleString()}`);
        if (pass.comment) console.log(`    Comment: ${pass.comment}`);
      });
    } else {
      console.log('  No passes found');
    }
  }
}
```

---

## 🏗️ Implementation Classes

### PassManager Class
```typescript
interface PassConfig {
  defaultWarningHours?: number;    // Hours before arrival to warn
  autoCleanupExpired?: boolean;    // Auto-remove expired passes
  batchSize?: number;              // Batch size for operations
  retryAttempts?: number;          // Retry attempts for failed operations
}

class PassManager {
  private api: OzonSellerAPI;
  private config: Required<PassConfig>;
  
  constructor(api: OzonSellerAPI, config: PassConfig = {}) {
    this.api = api;
    this.config = {
      defaultWarningHours: 2,
      autoCleanupExpired: true,
      batchSize: 10,
      retryAttempts: 3,
      ...config
    };
  }

  /**
   * Create and schedule multiple carriage passes
   */
  async scheduleCarriageDelivery(
    carriageId: number,
    vehicles: Array<{
      vehicleNumber: string;
      driverName: string;
      driverLicense: string;
      arrivalTime: Date;
      description?: string;
    }>
  ): Promise<{
    success: boolean;
    passIds: string[];
    failed: Array<{ vehicle: string; error: string }>;
  }> {
    const result = {
      success: false,
      passIds: [] as string[],
      failed: [] as Array<{ vehicle: string; error: string }>
    };

    try {
      // Validate arrival times
      const now = new Date();
      const validVehicles = vehicles.filter(vehicle => {
        if (vehicle.arrivalTime <= now) {
          result.failed.push({
            vehicle: vehicle.vehicleNumber,
            error: 'Arrival time must be in the future'
          });
          return false;
        }
        return true;
      });

      if (validVehicles.length === 0) {
        return result;
      }

      // Process in batches
      for (let i = 0; i < validVehicles.length; i += this.config.batchSize) {
        const batch = validVehicles.slice(i, i + this.config.batchSize);
        
        try {
          const passResult = await this.api.pass.createCarriagePass({
            carriage_id: carriageId,
            arrival_passes: batch.map(vehicle => ({
              vehicle_number: vehicle.vehicleNumber,
              driver_name: vehicle.driverName,
              driver_license: vehicle.driverLicense,
              arrival_date: vehicle.arrivalTime.toISOString(),
              comment: vehicle.description
            }))
          });

          if (passResult.arrival_pass_ids) {
            result.passIds.push(...passResult.arrival_pass_ids);
          }

        } catch (error: any) {
          // Add all vehicles in failed batch to failed array
          batch.forEach(vehicle => {
            result.failed.push({
              vehicle: vehicle.vehicleNumber,
              error: error.message
            });
          });
        }

        // Rate limiting between batches
        if (i + this.config.batchSize < validVehicles.length) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      result.success = result.passIds.length > 0;

    } catch (error: any) {
      vehicles.forEach(vehicle => {
        result.failed.push({
          vehicle: vehicle.vehicleNumber,
          error: error.message
        });
      });
    }

    return result;
  }

  /**
   * Monitor pass status and send notifications
   */
  async monitorPasses(): Promise<{
    total: number;
    active: number;
    expiring: number;
    expired: number;
    alerts: Array<{
      passId: string;
      vehicle: string;
      message: string;
      priority: 'low' | 'medium' | 'high';
    }>;
  }> {
    const monitoring = {
      total: 0,
      active: 0,
      expiring: 0,
      expired: 0,
      alerts: [] as Array<{
        passId: string;
        vehicle: string;
        message: string;
        priority: 'low' | 'medium' | 'high';
      }>
    };

    try {
      // Get all passes for monitoring
      const passes = await this.api.pass.getPassList({
        limit: 1000,
        filter: {
          date_from: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Last 24 hours
          date_to: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString().split('T')[0]  // Next 48 hours
        }
      });

      if (!passes.arrival_passes) return monitoring;

      monitoring.total = passes.arrival_passes.length;
      const now = Date.now();

      passes.arrival_passes.forEach(pass => {
        const arrivalTime = new Date(pass.arrival_date).getTime();
        const hoursUntilArrival = (arrivalTime - now) / (1000 * 60 * 60);

        switch (pass.status) {
          case 'ACTIVE':
            monitoring.active++;
            
            // Check if expiring soon
            if (hoursUntilArrival <= this.config.defaultWarningHours && hoursUntilArrival > 0) {
              monitoring.expiring++;
              monitoring.alerts.push({
                passId: pass.arrival_pass_id,
                vehicle: pass.vehicle_number,
                message: `Pass expires in ${Math.round(hoursUntilArrival)} hours`,
                priority: hoursUntilArrival <= 1 ? 'high' : 'medium'
              });
            }
            
            // Check if late
            if (hoursUntilArrival < 0) {
              monitoring.alerts.push({
                passId: pass.arrival_pass_id,
                vehicle: pass.vehicle_number,
                message: `Vehicle is ${Math.round(Math.abs(hoursUntilArrival))} hours late`,
                priority: 'high'
              });
            }
            break;

          case 'EXPIRED':
            monitoring.expired++;
            if (this.config.autoCleanupExpired) {
              monitoring.alerts.push({
                passId: pass.arrival_pass_id,
                vehicle: pass.vehicle_number,
                message: 'Expired pass scheduled for cleanup',
                priority: 'low'
              });
            }
            break;
        }
      });

    } catch (error: any) {
      console.error('Error monitoring passes:', error.message);
    }

    return monitoring;
  }

  /**
   * Bulk return pass creation for return processing
   */
  async processBulkReturns(
    returns: Array<{
      vehicleNumber: string;
      driverName: string;
      driverLicense?: string;
      postingNumber: string;
      arrivalTime: Date;
      reason?: string;
    }>
  ): Promise<{
    successful: number;
    failed: number;
    passIds: string[];
    errors: string[];
  }> {
    const result = {
      successful: 0,
      failed: 0,
      passIds: [] as string[],
      errors: [] as string[]
    };

    // Process in batches
    for (let i = 0; i < returns.length; i += this.config.batchSize) {
      const batch = returns.slice(i, i + this.config.batchSize);
      
      try {
        const returnResult = await this.api.pass.createReturnPass({
          arrival_passes: batch.map(returnItem => ({
            vehicle_number: returnItem.vehicleNumber,
            driver_name: returnItem.driverName,
            driver_license: returnItem.driverLicense,
            arrival_date: returnItem.arrivalTime.toISOString(),
            posting_number: returnItem.postingNumber,
            comment: returnItem.reason
          }))
        });

        if (returnResult.arrival_pass_ids) {
          result.successful += returnResult.arrival_pass_ids.length;
          result.passIds.push(...returnResult.arrival_pass_ids);
        }

      } catch (error: any) {
        result.failed += batch.length;
        result.errors.push(`Batch ${i}-${i + batch.length - 1}: ${error.message}`);
      }

      // Rate limiting
      if (i + this.config.batchSize < returns.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    return result;
  }

  /**
   * Generate pass reports and statistics
   */
  async generatePassReport(
    dateFrom: string,
    dateTo: string
  ): Promise<{
    summary: {
      totalPasses: number;
      carriagePasses: number;
      returnPasses: number;
      activeRate: number;
      completionRate: number;
    };
    statistics: {
      dailyBreakdown: Array<{
        date: string;
        created: number;
        expired: number;
        active: number;
      }>;
      topDrivers: Array<{
        name: string;
        passCount: number;
        onTimeRate: number;
      }>;
      warehouseDistribution: Array<{
        warehouseId: string;
        passCount: number;
        percentage: number;
      }>;
    };
  }> {
    const passes = await this.api.pass.getPassList({
      limit: 1000,
      filter: {
        date_from: dateFrom,
        date_to: dateTo
      }
    });

    const summary = {
      totalPasses: passes.arrival_passes?.length || 0,
      carriagePasses: 0,
      returnPasses: 0,
      activeRate: 0,
      completionRate: 0
    };

    const dailyStats = new Map<string, { created: number; expired: number; active: number }>();
    const driverStats = new Map<string, { count: number; onTime: number }>();
    const warehouseStats = new Map<string, number>();

    if (passes.arrival_passes) {
      let activeCount = 0;
      let completedCount = 0;

      passes.arrival_passes.forEach(pass => {
        // Categorize by type
        if (pass.carriage_id) {
          summary.carriagePasses++;
        } else if (pass.posting_number) {
          summary.returnPasses++;
        }

        // Status statistics
        if (pass.status === 'ACTIVE') activeCount++;
        if (pass.status === 'USED') completedCount++;

        // Daily breakdown
        const date = pass.created_at.split('T')[0];
        if (!dailyStats.has(date)) {
          dailyStats.set(date, { created: 0, expired: 0, active: 0 });
        }
        const dayStats = dailyStats.get(date)!;
        dayStats.created++;
        if (pass.status === 'EXPIRED') dayStats.expired++;
        if (pass.status === 'ACTIVE') dayStats.active++;

        // Driver statistics
        if (!driverStats.has(pass.driver_name)) {
          driverStats.set(pass.driver_name, { count: 0, onTime: 0 });
        }
        const driverStat = driverStats.get(pass.driver_name)!;
        driverStat.count++;
        if (pass.status === 'USED') driverStat.onTime++;

        // Warehouse distribution
        if (pass.warehouse_id) {
          warehouseStats.set(pass.warehouse_id, (warehouseStats.get(pass.warehouse_id) || 0) + 1);
        }
      });

      summary.activeRate = summary.totalPasses > 0 ? (activeCount / summary.totalPasses) * 100 : 0;
      summary.completionRate = summary.totalPasses > 0 ? (completedCount / summary.totalPasses) * 100 : 0;
    }

    return {
      summary,
      statistics: {
        dailyBreakdown: Array.from(dailyStats.entries()).map(([date, stats]) => ({
          date,
          ...stats
        })),
        topDrivers: Array.from(driverStats.entries())
          .map(([name, stats]) => ({
            name,
            passCount: stats.count,
            onTimeRate: stats.count > 0 ? (stats.onTime / stats.count) * 100 : 0
          }))
          .sort((a, b) => b.passCount - a.passCount)
          .slice(0, 10),
        warehouseDistribution: Array.from(warehouseStats.entries()).map(([warehouseId, count]) => ({
          warehouseId,
          passCount: count,
          percentage: summary.totalPasses > 0 ? (count / summary.totalPasses) * 100 : 0
        }))
      }
    };
  }
}
```

---

## 🔄 Business Workflows

### Complete Delivery Scheduling Workflow
```typescript
async function completeDeliveryScheduling() {
  const manager = new PassManager(api, {
    defaultWarningHours: 1,
    autoCleanupExpired: true
  });
  
  console.log('🚚 Complete Delivery Scheduling Workflow');
  
  // 1. Schedule carriage delivery with multiple vehicles
  const carriageId = 12345;
  const vehicles = [
    {
      vehicleNumber: 'А111БВ111',
      driverName: 'Иванов Иван Иванович',
      driverLicense: '11 11 111111',
      arrivalTime: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours from now
      description: 'Основная партия товаров'
    },
    {
      vehicleNumber: 'Б222ВГ222',
      driverName: 'Петров Петр Петрович',
      driverLicense: '22 22 222222',
      arrivalTime: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours from now
      description: 'Дополнительная партия'
    }
  ];
  
  const schedulingResult = await manager.scheduleCarriageDelivery(carriageId, vehicles);
  
  console.log(`✅ Scheduling Results:`);
  console.log(`- Successfully created: ${schedulingResult.passIds.length} passes`);
  console.log(`- Failed: ${schedulingResult.failed.length} vehicles`);
  
  if (schedulingResult.failed.length > 0) {
    console.log('❌ Failed vehicles:');
    schedulingResult.failed.forEach(failure => {
      console.log(`  - ${failure.vehicle}: ${failure.error}`);
    });
  }
  
  // 2. Schedule return processing
  const returns = [
    {
      vehicleNumber: 'Р777ЕТ999',
      driverName: 'Возвратов Возврат Возвратович',
      driverLicense: '77 77 777777',
      postingNumber: '12345-0001-1',
      arrivalTime: new Date(Date.now() + 8 * 60 * 60 * 1000),
      reason: 'Брак при доставке'
    }
  ];
  
  const returnResult = await manager.processBulkReturns(returns);
  console.log(`📦 Return Processing:`);
  console.log(`- Successful: ${returnResult.successful}`);
  console.log(`- Failed: ${returnResult.failed}`);
  
  // 3. Monitor current passes
  const monitoring = await manager.monitorPasses();
  console.log(`\n📊 Pass Monitoring:`);
  console.log(`- Total: ${monitoring.total}`);
  console.log(`- Active: ${monitoring.active}`);
  console.log(`- Expiring: ${monitoring.expiring}`);
  console.log(`- Expired: ${monitoring.expired}`);
  
  if (monitoring.alerts.length > 0) {
    console.log('\n🚨 Alerts:');
    monitoring.alerts.forEach(alert => {
      const priority = alert.priority.toUpperCase();
      console.log(`[${priority}] ${alert.vehicle}: ${alert.message}`);
    });
  }
  
  // 4. Generate daily report
  const today = new Date().toISOString().split('T')[0];
  const report = await manager.generatePassReport(today, today);
  
  console.log(`\n📈 Daily Report for ${today}:`);
  console.log(`- Total passes: ${report.summary.totalPasses}`);
  console.log(`- Carriage passes: ${report.summary.carriagePasses}`);
  console.log(`- Return passes: ${report.summary.returnPasses}`);
  console.log(`- Active rate: ${report.summary.activeRate.toFixed(1)}%`);
  console.log(`- Completion rate: ${report.summary.completionRate.toFixed(1)}%`);
  
  return {
    scheduling: schedulingResult,
    returns: returnResult,
    monitoring,
    report
  };
}
```

### Emergency Pass Management
```typescript
async function emergencyPassManagement() {
  console.log('🚨 Emergency Pass Management System');
  
  // 1. Find urgent deliveries (arriving in next 2 hours)
  const urgentDeliveries = await api.pass.getPassList({
    limit: 100,
    filter: {
      status: 'ACTIVE',
      date_from: new Date().toISOString().split('T')[0],
      date_to: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString().split('T')[0]
    }
  });
  
  console.log(`Found ${urgentDeliveries.arrival_passes?.length} urgent deliveries`);
  
  const now = Date.now();
  const criticalPasses: any[] = [];
  const emergencyActions: Array<{
    action: string;
    passId: string;
    vehicle: string;
    reason: string;
  }> = [];
  
  urgentDeliveries.arrival_passes?.forEach(pass => {
    const arrivalTime = new Date(pass.arrival_date).getTime();
    const hoursUntilArrival = (arrivalTime - now) / (1000 * 60 * 60);
    
    if (hoursUntilArrival < 1) {
      criticalPasses.push(pass);
      
      if (hoursUntilArrival < 0) {
        // Overdue
        emergencyActions.push({
          action: 'UPDATE_OR_CANCEL',
          passId: pass.arrival_pass_id,
          vehicle: pass.vehicle_number,
          reason: `Vehicle is ${Math.round(Math.abs(hoursUntilArrival))} hours overdue`
        });
      } else {
        // Critical timing
        emergencyActions.push({
          action: 'NOTIFY_WAREHOUSE',
          passId: pass.arrival_pass_id,
          vehicle: pass.vehicle_number,
          reason: `Vehicle arriving in ${Math.round(hoursUntilArrival * 60)} minutes`
        });
      }
    }
  });
  
  console.log(`\n🔴 Critical passes requiring immediate action: ${criticalPasses.length}`);
  
  // 2. Handle emergency updates
  for (const action of emergencyActions) {
    console.log(`${action.action}: ${action.vehicle} - ${action.reason}`);
    
    if (action.action === 'UPDATE_OR_CANCEL') {
      // In real scenario, you would check with logistics team
      const shouldCancel = Math.random() > 0.5; // Simulated decision
      
      if (shouldCancel) {
        try {
          // For carriage passes, we need carriage_id
          const passDetails = criticalPasses.find(p => p.arrival_pass_id === action.passId);
          if (passDetails && passDetails.carriage_id) {
            await api.pass.deleteCarriagePass({
              carriage_id: passDetails.carriage_id,
              arrival_pass_ids: [action.passId]
            });
            console.log(`  ✅ Cancelled overdue pass for ${action.vehicle}`);
          } else if (passDetails && passDetails.posting_number) {
            await api.pass.deleteReturnPass({
              arrival_pass_ids: [action.passId]
            });
            console.log(`  ✅ Cancelled overdue return pass for ${action.vehicle}`);
          }
        } catch (error: any) {
          console.error(`  ❌ Failed to cancel pass: ${error.message}`);
        }
      } else {
        // Reschedule for next day
        try {
          const passDetails = criticalPasses.find(p => p.arrival_pass_id === action.passId);
          const newArrivalTime = new Date(Date.now() + 24 * 60 * 60 * 1000); // Next day
          
          if (passDetails && passDetails.carriage_id) {
            await api.pass.updateCarriagePass({
              carriage_id: passDetails.carriage_id,
              arrival_passes: [{
                arrival_pass_id: action.passId,
                vehicle_number: passDetails.vehicle_number,
                driver_name: passDetails.driver_name,
                driver_license: passDetails.driver_license || '',
                arrival_date: newArrivalTime.toISOString(),
                comment: 'Rescheduled due to delay'
              }]
            });
            console.log(`  ✅ Rescheduled ${action.vehicle} for next day`);
          }
        } catch (error: any) {
          console.error(`  ❌ Failed to reschedule pass: ${error.message}`);
        }
      }
    }
  }
  
  return {
    totalChecked: urgentDeliveries.arrival_passes?.length || 0,
    criticalCount: criticalPasses.length,
    actionsPerformed: emergencyActions.length
  };
}
```

---

## ⚠️ Error Handling

### Common Error Scenarios
```typescript
async function robustPassOperations() {
  try {
    // Pass creation with validation
    const result = await api.pass.createCarriagePass({
      carriage_id: 12345,
      arrival_passes: [{
        vehicle_number: 'INVALID',
        driver_name: '',
        driver_license: 'INVALID',
        arrival_date: '2020-01-01T00:00:00Z', // Past date
        comment: 'Test pass'
      }]
    });
    
  } catch (error: any) {
    if (error.response?.status === 400) {
      console.error('Invalid pass parameters:', error.response.data);
      
      // Handle specific validation errors
      const errors = error.response.data.errors || [];
      errors.forEach(err => {
        switch (err.code) {
          case 'INVALID_VEHICLE_NUMBER':
            console.error('Fix: Use valid Russian license plate format (А123БВ777)');
            break;
          case 'EMPTY_DRIVER_NAME':
            console.error('Fix: Provide full driver name');
            break;
          case 'INVALID_DATE':
            console.error('Fix: Arrival date must be in the future');
            break;
          case 'INVALID_LICENSE':
            console.error('Fix: Use valid driver license format (12 34 567890)');
            break;
        }
      });
      
    } else if (error.response?.status === 404) {
      console.error('Carriage not found - check carriage_id');
      
    } else if (error.response?.status === 409) {
      console.error('Conflicting pass - vehicle may already have active pass');
      
    } else {
      console.error('Pass creation failed:', error.message);
    }
  }
  
  try {
    // Pass listing with pagination error handling
    const passes = await api.pass.getPassList({
      limit: 2000, // Exceeds maximum
      filter: { status: 'INVALID_STATUS' as any }
    });
    
  } catch (error: any) {
    if (error.response?.status === 400) {
      console.error('Invalid filter parameters');
      
      // Retry with corrected parameters
      const correctedPasses = await api.pass.getPassList({
        limit: 1000, // Max allowed
        filter: { status: 'ACTIVE' }
      });
      
      console.log(`Retrieved ${correctedPasses.arrival_passes?.length} passes with corrected parameters`);
    }
  }
}
```

---

## 📈 Performance Considerations

### Optimization Strategies
- **Batch Operations**: Process multiple passes in single requests
- **Pagination**: Use cursor-based pagination for large datasets
- **Caching**: Cache frequently accessed pass lists
- **Rate Limiting**: Implement delays between API calls
- **Filtering**: Use specific filters to reduce response sizes

### Resource Management
```typescript
class OptimizedPassManager extends PassManager {
  private passCache = new Map();
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes
  
  async getCachedPassList(filter: any): Promise<any> {
    const cacheKey = JSON.stringify(filter);
    const cached = this.passCache.get(cacheKey);
    
    if (cached && (Date.now() - cached.timestamp) < this.CACHE_TTL) {
      return cached.data;
    }
    
    const passes = await this.api.pass.getPassList({ filter });
    
    this.passCache.set(cacheKey, {
      data: passes,
      timestamp: Date.now()
    });
    
    return passes;
  }
  
  /**
   * Efficient pass monitoring with reduced API calls
   */
  async optimizedMonitoring(): Promise<any> {
    // Use cached data for frequent monitoring
    const todayFilter = {
      date_from: new Date().toISOString().split('T')[0],
      date_to: new Date().toISOString().split('T')[0]
    };
    
    const passes = await this.getCachedPassList(todayFilter);
    
    // Process monitoring data from cached results
    return this.processMonitoringData(passes);
  }
  
  private processMonitoringData(passes: any): any {
    // Implementation of monitoring logic using cached data
    return {
      processed: true,
      source: 'cache',
      passCount: passes.arrival_passes?.length || 0
    };
  }
}
```

---

## 🔗 Related Documentation

- **[Delivery FBS API (14-delivery-fbs.md)](./14-delivery-fbs.md)** - FBS delivery operations and carriage management
- **[FBO API (16-fbo.md)](./16-fbo.md)** - FBO operations and warehouse integration
- **[Warehouse API (warehouse.md)](./warehouse.md)** - Warehouse operations and management

---

**Implementation Status**: ✅ Complete  
**Last Updated**: 2024  
**API Version**: v1  
**Methods Count**: 7 methods (4 carriage operations, 3 return operations)