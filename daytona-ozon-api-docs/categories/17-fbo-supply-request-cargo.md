# FBO Supply Request - Cargo & Label Management

**Cargo & Label Management** - Comprehensive cargo operations and label generation for FBO Supply Request API.

## Overview

Cargo & Label Management handles physical cargo operations including creation, labeling, deletion, and compliance checking. This includes automated label generation, PDF export, cargo tracking, and rules validation across 8 specialized methods.

---

## 📋 Methods Overview

### 📦 Cargo Operations (5 methods)
1. **createCargoes** - Set up cargo containers
2. **getCargoesCreateInfo** - Get cargo creation status
3. **deleteCargoes** - Remove cargo containers
4. **getCargoesDeleteStatus** - Get deletion status
5. **getCargoRules** - Get cargo rules checklist

### 🏷️ Label Operations (3 methods)
6. **createCargoLabels** - Generate cargo labels
7. **getCargoLabels** - Get label generation status
8. **getCargoLabelsFile** - Download labels PDF

---

## 📦 Cargo Operations Methods

### createCargoes()
Creates cargo containers with product composition and physical specifications.

```typescript
interface FboSupplyRequestCargoesCreateRequest {
  supply_order_id: number;
  cargoes: Array<{
    cargo_number: string;
    weight: number;           // kg
    length: number;          // cm
    width: number;           // cm
    height: number;          // cm
    items: Array<{
      sku: string;
      quantity: number;
    }>;
  }>;
}

interface FboSupplyRequestCargoesCreateResponse {
  task_id?: string;
  status?: 'pending' | 'processing' | 'completed' | 'error';
}

// Usage Example
const cargoTask = await fboSupplyRequestApi.createCargoes({
  supply_order_id: 12345,
  cargoes: [
    {
      cargo_number: 'CARGO001',
      weight: 25.5,
      length: 40, width: 30, height: 20,
      items: [
        { sku: '123456789', quantity: 5 },
        { sku: '987654321', quantity: 3 }
      ]
    },
    {
      cargo_number: 'CARGO002',
      weight: 18.0,
      length: 35, width: 25, height: 15,
      items: [
        { sku: '555666777', quantity: 10 },
        { sku: '111222333', quantity: 2 }
      ]
    }
  ]
});

console.log(`Cargo creation task: ${cargoTask.task_id}`);
```

### getCargoesCreateInfo()
Gets detailed status and results of cargo creation operation.

```typescript
interface FboSupplyRequestCargoesCreateInfoResponse {
  status?: 'pending' | 'processing' | 'completed' | 'error';
  
  cargoes?: Array<{
    cargo_id?: number;
    cargo_number?: string;
    status?: 'created' | 'validated' | 'error';
    weight?: number;
    dimensions?: {
      length?: number;
      width?: number;
      height?: number;
      volume?: number;
    };
    items_count?: number;
    validation_messages?: string[];
  }>;
  
  errors?: Array<{
    cargo_number?: string;
    error_code?: string;
    error_message?: string;
  }>;
  
  summary?: {
    total_cargoes?: number;
    successful?: number;
    failed?: number;
    total_weight?: number;
    total_volume?: number;
  };
}

// Usage Example
const cargoInfo = await fboSupplyRequestApi.getCargoesCreateInfo({
  task_id: 'task_12345'
});

if (cargoInfo.status === 'completed') {
  console.log('✅ Cargo creation completed');
  
  if (cargoInfo.summary) {
    const summary = cargoInfo.summary;
    console.log(`Total: ${summary.successful}/${summary.total_cargoes} successful`);
    console.log(`Total weight: ${summary.total_weight}kg`);
    console.log(`Total volume: ${summary.total_volume}cm³`);
  }
  
  cargoInfo.cargoes?.forEach(cargo => {
    console.log(`\nCargo ${cargo.cargo_number}: ID ${cargo.cargo_id}`);
    console.log(`Weight: ${cargo.weight}kg, Status: ${cargo.status}`);
    console.log(`Dimensions: ${cargo.dimensions?.length}×${cargo.dimensions?.width}×${cargo.dimensions?.height}cm`);
    console.log(`Items: ${cargo.items_count}`);
    
    if (cargo.validation_messages?.length) {
      cargo.validation_messages.forEach(msg => {
        console.log(`📝 ${msg}`);
      });
    }
  });
  
  if (cargoInfo.errors?.length) {
    console.log('\n❌ Errors:');
    cargoInfo.errors.forEach(error => {
      console.log(`${error.cargo_number}: ${error.error_message}`);
    });
  }
}
```

---

## 🏷️ Label Operations Methods

### createCargoLabels()
Initiates cargo label generation for specified cargo containers.

```typescript
interface FboSupplyRequestCargoesLabelCreateRequest {
  supply_order_id: number;
  cargo_ids: number[];
}

interface FboSupplyRequestCargoesLabelCreateResponse {
  task_id?: string;
  status?: 'pending' | 'processing' | 'completed' | 'error';
}

// Usage Example
const labelTask = await fboSupplyRequestApi.createCargoLabels({
  supply_order_id: 12345,
  cargo_ids: [1001, 1002, 1003]
});

console.log(`Label generation task: ${labelTask.task_id}`);
```

### getCargoLabels()
Gets label generation status and download information.

```typescript
interface FboSupplyRequestCargoesLabelGetResponse {
  status?: 'pending' | 'processing' | 'completed' | 'error';
  file_guid?: string;
  file_url?: string;
  labels_count?: number;
  file_size?: number;          // bytes
  expires_at?: string;
  error_message?: string;
}

// Usage Example
const labelStatus = await fboSupplyRequestApi.getCargoLabels({
  task_id: 'task_12345'
});

if (labelStatus.status === 'completed' && labelStatus.file_guid) {
  console.log('✅ Labels ready for download');
  console.log(`File URL: ${labelStatus.file_url}`);
  console.log(`Labels count: ${labelStatus.labels_count}`);
  console.log(`File size: ${(labelStatus.file_size! / 1024).toFixed(2)} KB`);
  console.log(`Expires: ${labelStatus.expires_at}`);
} else if (labelStatus.status === 'processing') {
  console.log('⏳ Labels still generating...');
} else if (labelStatus.status === 'error') {
  console.error(`❌ Label generation failed: ${labelStatus.error_message}`);
}
```

---

## 💼 Business Workflows

### 1. Complete Cargo Setup Workflow
```typescript
class CargoManager {
  private readonly api: FboSupplyRequestApi;
  
  constructor(api: FboSupplyRequestApi) {
    this.api = api;
  }
  
  async setupCargoesWithLabels(
    supplyOrderId: number,
    cargoSpecs: Array<{
      number: string;
      weight: number;
      dimensions: { length: number; width: number; height: number; };
      items: Array<{ sku: string; quantity: number; }>;
    }>
  ) {
    try {
      // Step 1: Create cargoes
      console.log('📦 Creating cargoes...');
      const cargoTask = await this.api.createCargoes({
        supply_order_id: supplyOrderId,
        cargoes: cargoSpecs.map(spec => ({
          cargo_number: spec.number,
          weight: spec.weight,
          length: spec.dimensions.length,
          width: spec.dimensions.width,
          height: spec.dimensions.height,
          items: spec.items
        }))
      });
      
      // Step 2: Monitor cargo creation
      const cargoIds = await this.monitorCargoCreation(cargoTask.task_id!);
      console.log(`✅ Created ${cargoIds.length} cargoes`);
      
      // Step 3: Generate labels
      console.log('🏷️ Generating labels...');
      const labelTask = await this.api.createCargoLabels({
        supply_order_id: supplyOrderId,
        cargo_ids: cargoIds
      });
      
      // Step 4: Download labels
      const labelFile = await this.downloadLabels(labelTask.task_id!);
      console.log('✅ Labels downloaded successfully');
      
      return {
        cargoIds,
        labelFile,
        summary: `Created ${cargoIds.length} cargoes with labels`
      };
      
    } catch (error) {
      console.error('Cargo setup failed:', error);
      throw error;
    }
  }
  
  private async monitorCargoCreation(taskId: string): Promise<number[]> {
    while (true) {
      const info = await this.api.getCargoesCreateInfo({ task_id: taskId });
      
      if (info.status === 'completed') {
        const cargoIds = info.cargoes?.map(c => c.cargo_id!).filter(Boolean) || [];
        
        if (info.errors?.length) {
          console.warn(`⚠️  ${info.errors.length} cargo creation errors:`);
          info.errors.forEach(error => {
            console.warn(`  ${error.cargo_number}: ${error.error_message}`);
          });
        }
        
        return cargoIds;
      } else if (info.status === 'error') {
        throw new Error('Cargo creation failed');
      }
      
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
  
  private async downloadLabels(taskId: string): Promise<Blob> {
    while (true) {
      const status = await this.api.getCargoLabels({ task_id: taskId });
      
      if (status.status === 'completed' && status.file_guid) {
        const labelFile = await this.api.getCargoLabelsFile(status.file_guid);
        return labelFile.file;
      } else if (status.status === 'error') {
        throw new Error(`Label generation failed: ${status.error_message}`);
      }
      
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
}
```

---

## 📊 API Endpoints Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `createCargoes` | `POST /v1/cargoes/create` | Create cargo containers |
| `getCargoesCreateInfo` | `POST /v1/cargoes/create/info` | Get cargo creation status |
| `deleteCargoes` | `POST /v1/cargoes/delete` | Delete cargo containers |
| `getCargoesDeleteStatus` | `POST /v1/cargoes/delete/status` | Get deletion status |
| `getCargoRules` | `POST /v1/cargoes/rules/get` | Get cargo rules |
| `createCargoLabels` | `POST /v1/cargoes-label/create` | Generate labels |
| `getCargoLabels` | `POST /v1/cargoes-label/get` | Get label status |
| `getCargoLabelsFile` | `GET /v1/cargoes-label/file/{guid}` | Download labels PDF |

---

**[← Back to FBO Supply Request Main](./17-fbo-supply-request.md)**