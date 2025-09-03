# 🏷️ FBS Labels API - Этикетки и печать

**Методы для создания и получения этикеток отправлений FBS** — печать этикеток для упакованных товаров перед отгрузкой.

## 📋 Методы (4 endpoints)

| Метод | Endpoint | Назначение |
|-------|----------|------------|
| `packageLabel` | `/v2/posting/fbs/package-label` | Прямая печать этикеток (до 20 за раз) |
| `createLabelBatch` | `/v1/posting/fbs/package-label/create` | Создание задания на этикетки (асинхронно) |
| `createLabelBatchV2` | `/v2/posting/fbs/package-label/create` | Улучшенная версия с поддержкой размеров |
| `getLabelBatch` | `/v1/posting/fbs/package-label/get` | Получение готовых этикеток |

---

## 🚀 Быстрый старт

### Прямая печать этикеток
```typescript
try {
  // Печать этикеток сразу (до 20 отправлений)
  const label = await client.fbs.packageLabel({
    posting_number: ['12345-0001-1', '12345-0002-1']
  });

  if (label.content) {
    // Сохранить PDF из base64
    const pdfBuffer = Buffer.from(label.content, 'base64');
    console.log(`✅ PDF этикетка готова: ${pdfBuffer.length} байт`);
    
    // Сохранить в файл
    await fs.writeFile('labels.pdf', pdfBuffer);
  }
} catch (error) {
  if (error.message.includes("aren't ready")) {
    console.log('⏳ Этикетки не готовы, повторите через 45-60 сек');
  }
}
```

### Пакетное создание этикеток
```typescript
try {
  // 1. Создать задание на этикетки (для больших объемов)
  const batchTask = await client.fbs.createLabelBatchV2({
    posting_number: postingNumbers, // массив до 1000 отправлений
    label_type: 1 // тип этикетки
  });
  
  console.log(`🔄 Задание создано: ${batchTask.result.task_id}`);
  
  // 2. Получить готовые этикетки
  const labels = await client.fbs.getLabelBatch({
    task_id: batchTask.result.task_id
  });
  
  if (labels.result?.status === 'completed') {
    console.log(`✅ Этикетки готовы: ${labels.result.file_url}`);
  } else {
    console.log(`⏳ Статус: ${labels.result?.status}`);
  }
  
} catch (error) {
  console.error('❌ Ошибка создания этикеток:', error);
}
```

---

## 🎯 Методы API

### `packageLabel()` - Прямая печать
```typescript
interface FbsPackageLabelRequest {
  /** Номера отправлений (максимум 20) */
  posting_number: string[];
}

interface FbsPackageLabelResponse {
  /** PDF файл этикеток в base64 */
  content?: string;
}
```

### `createLabelBatchV2()` - Пакетное создание
```typescript
interface FbsCreateLabelBatchRequest {
  /** Номера отправлений (до 1000) */
  posting_number: string[];
  /** Тип этикетки */
  label_type?: number;
}

interface FbsCreateLabelBatchResponse {
  result: {
    /** ID задания для получения этикеток */
    task_id: number;
  };
}
```

### `getLabelBatch()` - Получение готовых этикеток
```typescript
interface FbsGetLabelBatchRequest {
  /** ID задания на создание этикеток */
  task_id: number;
}

interface FbsGetLabelBatchResponse {
  result?: {
    /** Статус задания */
    status: 'processing' | 'completed' | 'failed';
    /** URL файла с этикетками (если готово) */
    file_url?: string;
  };
}
```

---

## 💡 Практические примеры

### Обработка с повтором
```typescript
const createLabelWithRetry = async (postingNumbers: string[]) => {
  let attempts = 0;
  const maxAttempts = 5;
  
  while (attempts < maxAttempts) {
    try {
      const label = await client.fbs.packageLabel({
        posting_number: postingNumbers
      });
      
      return label;
    } catch (error) {
      if (error.message.includes("aren't ready")) {
        attempts++;
        console.log(`⏳ Попытка ${attempts}/${maxAttempts}`);
        await new Promise(resolve => setTimeout(resolve, 60000)); // 1 минута
      } else {
        throw error;
      }
    }
  }
  
  throw new Error('Этикетки не готовы после максимального количества попыток');
};
```

### Массовая обработка
```typescript
const processLargeLabeBatch = async (postingNumbers: string[]) => {
  const batchSize = 20; // Лимит для прямой печати
  const results = [];
  
  for (let i = 0; i < postingNumbers.length; i += batchSize) {
    const batch = postingNumbers.slice(i, i + batchSize);
    
    try {
      const labels = await createLabelWithRetry(batch);
      results.push(labels);
      
      console.log(`✅ Batch ${Math.floor(i / batchSize) + 1} готов`);
      
      // Пауза между запросами
      if (i + batchSize < postingNumbers.length) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    } catch (error) {
      console.error(`❌ Ошибка в batch ${Math.floor(i / batchSize) + 1}:`, error);
    }
  }
  
  return results;
};
```

---

## ⚠️ Ограничения

- **Прямая печать**: максимум 20 отправлений за запрос
- **Пакетная печать**: до 1000 отправлений в задании
- **Готовность**: рекомендуется запрашивать через 45-60 секунд после сборки
- **Повторы**: если этикетки не готовы, повторить через минуту

---

**💡 Следующий раздел**: [Работа с товарами (fbs-products.md)](./fbs-products.md)