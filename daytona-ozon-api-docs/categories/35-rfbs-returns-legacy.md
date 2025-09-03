# Устаревшие методы RFBS Returns - Legacy Methods API

Документация по устаревшим методам RFBS Returns API, которые планируются к отключению. Эти методы сохранены для обратной совместимости, но рекомендуется перейти на современный `setAction()` метод.

**⚠️ УСТАРЕЛО И БУДЕТ ОТКЛЮЧЕНО** — все методы в этом разделе заменены унифицированным `setAction()` методом.

## 📊 Обзор устаревших методов

**Всего методов: 5** — legacy поддержка до полного перехода на современный API

### 💰 Финансовые операции (2 метода)
1. **compensate()** — Вернуть часть стоимости товара *(v2, устарел)*
2. **returnMoney()** — Вернуть деньги покупателю *(v2, устарел)*

### 📋 Управление статусами (3 метода)
3. **receiveReturn()** — Подтвердить получение товара на проверку *(v2, устарел)*
4. **reject()** — Отклонить заявку на возврат *(v2, устарел)*
5. **verify()** — Одобрить заявку на возврат *(v2, устарел)*

---

## 🔧 Миграционная карта

### Соответствие устаревших методов современному API

| Устаревший метод | Современная замена | Статус миграции |
|------------------|-------------------|-----------------|
| `compensate()` | `setAction({ action: 'compensate' })` | ✅ Готово |
| `returnMoney()` | `setAction({ action: 'return_money' })` | ✅ Готово |
| `receiveReturn()` | `setAction({ action: 'receive_return' })` | ✅ Готово |
| `reject()` | `setAction({ action: 'reject' })` | ✅ Готово |
| `verify()` | `setAction({ action: 'approve' })` | ✅ Готово |

### Временные рамки отключения
- **Q1 2024**: Предупреждения о планируемом отключении
- **Q2 2024**: Уведомления разработчиков за 6 месяцев
- **Q3 2024**: Активная миграция и поддержка перехода
- **Q4 2024**: Полное отключение устаревших методов

---

## 📚 TypeScript интерфейсы устаревших методов

### Частичная компенсация (compensate)

```typescript
/**
 * Запрос частичной компенсации (УСТАРЕЛ)
 * Partial compensation request (DEPRECATED)
 * 
 * @deprecated Используйте setAction({ action: 'compensate' }) вместо этого
 */
interface RfbsReturnsCompensateRequest {
  /** Идентификатор заявки на возврат */
  return_id: number;
  
  /** Сумма компенсации */
  compensation_amount: number;
  
  /** Причина частичной компенсации */
  reason?: string;
  
  /** Комментарий продавца */
  comment?: string;
  
  /** Компенсировать стоимость доставки */
  compensate_shipping?: boolean;
  
  readonly [key: string]: unknown;
}

/**
 * Пустой ответ для устаревших методов
 * Empty response for deprecated methods
 */
interface RfbsReturnsEmptyResponse {
  /** Результат операции (может отсутствовать) */
  result?: 'ok';
  
  readonly [key: string]: unknown;
}
```

### Полный возврат денег (returnMoney)

```typescript
/**
 * Запрос полного возврата денег (УСТАРЕЛ)
 * Full money return request (DEPRECATED)
 * 
 * @deprecated Используйте setAction({ action: 'return_money' }) вместо этого
 */
interface RfbsReturnsReturnMoneyRequest {
  /** Идентификатор заявки на возврат */
  return_id: number;
  
  /** Вернуть полную сумму */
  full_amount?: boolean;
  
  /** Компенсировать стоимость доставки */
  compensate_shipping?: boolean;
  
  /** Комментарий продавца */
  comment?: string;
  
  readonly [key: string]: unknown;
}
```

### Подтверждение получения (receiveReturn)

```typescript
/**
 * Запрос подтверждения получения товара (УСТАРЕЛ)
 * Receive return confirmation request (DEPRECATED)
 * 
 * @deprecated Используйте setAction({ action: 'receive_return' }) вместо этого
 */
interface RfbsReturnsReceiveReturnRequest {
  /** Идентификатор заявки на возврат */
  return_id: number;
  
  /** Дата получения товара */
  received_at?: string;
  
  /** Состояние полученного товара */
  condition?: string;
  
  /** Комментарий о состоянии товара */
  condition_comment?: string;
  
  readonly [key: string]: unknown;
}
```

### Отклонение заявки (reject)

```typescript
/**
 * Запрос отклонения заявки (УСТАРЕЛ)
 * Return rejection request (DEPRECATED)
 * 
 * @deprecated Используйте setAction({ action: 'reject' }) вместо этого
 */
interface RfbsReturnsRejectRequest {
  /** Идентификатор заявки на возврат */
  return_id: number;
  
  /** Комментарий с причиной отклонения */
  comment: string;
  
  /** Код причины отклонения */
  rejection_code?: string;
  
  readonly [key: string]: unknown;
}
```

### Одобрение заявки (verify)

```typescript
/**
 * Запрос одобрения заявки (УСТАРЕЛ)
 * Return approval request (DEPRECATED)
 * 
 * @deprecated Используйте setAction({ action: 'approve' }) вместо этого
 */
interface RfbsReturnsVerifyRequest {
  /** Идентификатор заявки на возврат */
  return_id: number;
  
  /** Комментарий продавца */
  comment?: string;
  
  /** Ожидаемая дата возврата товара */
  expected_return_date?: string;
  
  readonly [key: string]: unknown;
}
```

---

## 🔄 Примеры миграции

### Миграция compensate() → setAction()

```typescript
// ❌ УСТАРЕЛО - НЕ ИСПОЛЬЗУЙТЕ
await rfbsReturnsApi.compensate({
  return_id: 123456,
  compensation_amount: 500,
  reason: 'Частичная компенсация за дефект',
  comment: 'Товар имеет незначительный дефект'
});

// ✅ СОВРЕМЕННЫЙ СПОСОБ - ИСПОЛЬЗУЙТЕ
await rfbsReturnsApi.setAction({
  return_id: 123456,
  action: 'compensate',
  compensation_amount: 500,
  comment: 'Частичная компенсация за дефект. Товар имеет незначительный дефект.',
  metadata: {
    internal_notes: 'Мигрировано с устаревшего compensate() метода'
  }
});
```

### Миграция returnMoney() → setAction()

```typescript
// ❌ УСТАРЕЛО - НЕ ИСПОЛЬЗУЙТЕ
await rfbsReturnsApi.returnMoney({
  return_id: 123456,
  full_amount: true,
  compensate_shipping: true,
  comment: 'Товар оказался бракованным'
});

// ✅ СОВРЕМЕННЫЙ СПОСОБ - ИСПОЛЬЗУЙТЕ
await rfbsReturnsApi.setAction({
  return_id: 123456,
  action: 'return_money',
  comment: 'Товар оказался бракованным',
  compensate_shipping: true,
  metadata: {
    internal_notes: 'Мигрировано с устаревшего returnMoney() метода'
  }
});
```

### Миграция receiveReturn() → setAction()

```typescript
// ❌ УСТАРЕЛО - НЕ ИСПОЛЬЗУЙТЕ  
await rfbsReturnsApi.receiveReturn({
  return_id: 123456,
  received_at: '2024-01-20T10:00:00Z',
  condition: 'good',
  condition_comment: 'Товар в хорошем состоянии'
});

// ✅ СОВРЕМЕННЫЙ СПОСОБ - ИСПОЛЬЗУЙТЕ
await rfbsReturnsApi.setAction({
  return_id: 123456,
  action: 'receive_return',
  comment: 'Товар получен и проверен. Состояние: хорошее',
  metadata: {
    item_condition: 'good',
    internal_notes: 'Товар в хорошем состоянии. Мигрировано с receiveReturn()'
  }
});
```

### Миграция reject() → setAction()

```typescript
// ❌ УСТАРЕЛО - НЕ ИСПОЛЬЗУЙТЕ
await rfbsReturnsApi.reject({
  return_id: 123456,
  comment: 'Превышен срок возврата согласно политике',
  rejection_code: 'TIME_EXPIRED'
});

// ✅ СОВРЕМЕННЫЙ СПОСОБ - ИСПОЛЬЗУЙТЕ
await rfbsReturnsApi.setAction({
  return_id: 123456,
  action: 'reject',
  comment: 'Превышен срок возврата согласно политике',
  metadata: {
    rejection_reason: 'time_expired',
    internal_notes: 'Мигрировано с устаревшего reject() метода'
  }
});
```

### Миграция verify() → setAction()

```typescript
// ❌ УСТАРЕЛО - НЕ ИСПОЛЬЗУЙТЕ
await rfbsReturnsApi.verify({
  return_id: 123456,
  comment: 'Заявка одобрена для получения товара',
  expected_return_date: '2024-01-25T00:00:00Z'
});

// ✅ СОВРЕМЕННЫЙ СПОСОБ - ИСПОЛЬЗУЙТЕ  
await rfbsReturnsApi.setAction({
  return_id: 123456,
  action: 'approve',
  comment: 'Заявка одобрена для получения товара. Ожидаем возврат до 25.01.2024',
  metadata: {
    internal_notes: 'Мигрировано с устаревшего verify() метода'
  }
});
```

---

## 🛠️ Автоматическая миграция

### Утилита миграции кода

```typescript
/**
 * Утилита для автоматической миграции с устаревших методов
 * Migration utility for deprecated methods
 */
export class RfbsReturnsLegacyMigrator {
  constructor(
    private readonly rfbsReturnsApi: RfbsReturnsApi
  ) {}

  /**
   * Обертка для устаревшего compensate() с логированием
   * Wrapper for deprecated compensate() with logging
   */
  async compensateWithWarning(request: RfbsReturnsCompensateRequest): Promise<any> {
    console.warn(`⚠️ УСТАРЕЛО: compensate() метод устарел. Используйте setAction({ action: 'compensate' })`);
    console.warn(`📅 Планируется отключение в Q4 2024`);
    
    // Автоматически конвертируем в современный формат
    return await this.rfbsReturnsApi.setAction({
      return_id: request.return_id,
      action: 'compensate',
      compensation_amount: request.compensation_amount,
      comment: request.comment || request.reason || 'Частичная компенсация',
      compensate_shipping: request.compensate_shipping,
      metadata: {
        internal_notes: 'Автоматически мигрировано с compensate()',
        legacy_method: 'compensate',
        migration_date: new Date().toISOString()
      }
    });
  }

  /**
   * Обертка для устаревшего returnMoney() с логированием
   * Wrapper for deprecated returnMoney() with logging
   */
  async returnMoneyWithWarning(request: RfbsReturnsReturnMoneyRequest): Promise<any> {
    console.warn(`⚠️ УСТАРЕЛО: returnMoney() метод устарел. Используйте setAction({ action: 'return_money' })`);
    
    return await this.rfbsReturnsApi.setAction({
      return_id: request.return_id,
      action: 'return_money',
      comment: request.comment || 'Возврат полной стоимости товара',
      compensate_shipping: request.compensate_shipping,
      metadata: {
        internal_notes: 'Автоматически мигрировано с returnMoney()',
        legacy_method: 'returnMoney',
        migration_date: new Date().toISOString()
      }
    });
  }

  /**
   * Обертка для устаревшего receiveReturn() с логированием
   * Wrapper for deprecated receiveReturn() with logging
   */
  async receiveReturnWithWarning(request: RfbsReturnsReceiveReturnRequest): Promise<any> {
    console.warn(`⚠️ УСТАРЕЛО: receiveReturn() метод устарел. Используйте setAction({ action: 'receive_return' })`);
    
    return await this.rfbsReturnsApi.setAction({
      return_id: request.return_id,
      action: 'receive_return',
      comment: request.condition_comment || `Товар получен в состоянии: ${request.condition || 'неизвестно'}`,
      metadata: {
        item_condition: request.condition as any,
        received_at: request.received_at,
        internal_notes: 'Автоматически мигрировано с receiveReturn()',
        legacy_method: 'receiveReturn',
        migration_date: new Date().toISOString()
      }
    });
  }

  /**
   * Обертка для устаревшего reject() с логированием
   * Wrapper for deprecated reject() with logging
   */
  async rejectWithWarning(request: RfbsReturnsRejectRequest): Promise<any> {
    console.warn(`⚠️ УСТАРЕЛО: reject() метод устарел. Используйте setAction({ action: 'reject' })`);
    
    const rejectionReasonMap: Record<string, string> = {
      'TIME_EXPIRED': 'time_expired',
      'POLICY_VIOLATION': 'policy_violation',
      'CONDITION_UNACCEPTABLE': 'condition_unacceptable'
    };
    
    return await this.rfbsReturnsApi.setAction({
      return_id: request.return_id,
      action: 'reject',
      comment: request.comment,
      metadata: {
        rejection_reason: rejectionReasonMap[request.rejection_code || ''] || 'other',
        internal_notes: 'Автоматически мигрировано с reject()',
        legacy_method: 'reject',
        legacy_rejection_code: request.rejection_code,
        migration_date: new Date().toISOString()
      }
    });
  }

  /**
   * Обертка для устаревшего verify() с логированием
   * Wrapper for deprecated verify() with logging
   */
  async verifyWithWarning(request: RfbsReturnsVerifyRequest): Promise<any> {
    console.warn(`⚠️ УСТАРЕЛО: verify() метод устарел. Используйте setAction({ action: 'approve' })`);
    
    return await this.rfbsReturnsApi.setAction({
      return_id: request.return_id,
      action: 'approve',
      comment: request.comment || 'Заявка одобрена для получения товара',
      metadata: {
        expected_return_date: request.expected_return_date,
        internal_notes: 'Автоматически мигрировано с verify()',
        legacy_method: 'verify',
        migration_date: new Date().toISOString()
      }
    });
  }

  /**
   * Проверка совместимости legacy кода
   * Legacy code compatibility check
   */
  async checkLegacyCompatibility(): Promise<{
    supportedUntil: string;
    currentDate: string;
    daysRemaining: number;
    recommendedActions: string[];
  }> {
    const supportEndDate = new Date('2024-12-31');
    const currentDate = new Date();
    const daysRemaining = Math.max(0, Math.floor(
      (supportEndDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
    ));

    const recommendedActions = [];
    
    if (daysRemaining < 90) {
      recommendedActions.push('🚨 КРИТИЧНО: До отключения менее 90 дней! Срочно мигрируйте на новый API');
    } else if (daysRemaining < 180) {
      recommendedActions.push('⚠️ ВНИМАНИЕ: До отключения менее 6 месяцев. Планируйте миграцию');
    } else {
      recommendedActions.push('📝 РЕКОМЕНДАЦИЯ: Начните планирование миграции на новый API');
    }

    recommendedActions.push('📖 Изучите документацию современного setAction() метода');
    recommendedActions.push('🧪 Протестируйте новые методы в тестовой среде');
    recommendedActions.push('🔄 Создайте план поэтапной миграции');

    return {
      supportedUntil: supportEndDate.toISOString().split('T')[0],
      currentDate: currentDate.toISOString().split('T')[0],
      daysRemaining,
      recommendedActions
    };
  }

  /**
   * Генерация отчета использования устаревших методов
   * Generate deprecated methods usage report
   */
  generateMigrationReport(): {
    methods: Array<{
      name: string;
      status: 'deprecated';
      replacement: string;
      complexity: 'low' | 'medium' | 'high';
      estimatedEffort: string;
    }>;
    totalMethods: number;
    migrationGuide: string;
  } {
    const methods = [
      {
        name: 'compensate()',
        status: 'deprecated' as const,
        replacement: 'setAction({ action: "compensate" })',
        complexity: 'low' as const,
        estimatedEffort: '2-4 часа'
      },
      {
        name: 'returnMoney()',
        status: 'deprecated' as const,
        replacement: 'setAction({ action: "return_money" })',
        complexity: 'low' as const,
        estimatedEffort: '1-2 часа'
      },
      {
        name: 'receiveReturn()',
        status: 'deprecated' as const,
        replacement: 'setAction({ action: "receive_return" })',
        complexity: 'medium' as const,
        estimatedEffort: '4-6 часов'
      },
      {
        name: 'reject()',
        status: 'deprecated' as const,
        replacement: 'setAction({ action: "reject" })',
        complexity: 'low' as const,
        estimatedEffort: '1-2 часа'
      },
      {
        name: 'verify()',
        status: 'deprecated' as const,
        replacement: 'setAction({ action: "approve" })',
        complexity: 'low' as const,
        estimatedEffort: '1-2 часа'
      }
    ];

    return {
      methods,
      totalMethods: methods.length,
      migrationGuide: 'Следуйте примерам миграции в документации. Используйте RfbsReturnsLegacyMigrator для автоматического логирования и постепенного перехода.'
    };
  }
}
```

---

## 🎯 Практическое использование миграции

### Постепенная миграция с логированием

```typescript
import { RfbsReturnsApi } from 'daytona-ozon-seller-api';

// Создаем мигратор для контролируемого перехода
const migrator = new RfbsReturnsLegacyMigrator(rfbsReturnsApi);

// Пример использования в переходный период
const processReturnWithMigration = async (returnId: number) => {
  try {
    // Проверяем совместимость
    const compatibility = await migrator.checkLegacyCompatibility();
    console.log(`⏳ До отключения legacy API: ${compatibility.daysRemaining} дней`);
    
    if (compatibility.daysRemaining < 30) {
      console.error('🚨 КРИТИЧНО: Legacy API будет отключен менее чем через месяц!');
    }

    // Используем мигратор для контролируемого перехода
    // Это будет логировать предупреждения и автоматически использовать новый API
    await migrator.compensateWithWarning({
      return_id: returnId,
      compensation_amount: 500,
      reason: 'Частичная компенсация'
    });
    
  } catch (error) {
    console.error('Ошибка в процессе миграции:', error);
  }
};

// Генерация отчета о миграции
const generateMigrationAnalysis = async () => {
  const report = migrator.generateMigrationReport();
  
  console.log('📊 Анализ миграции RFBS Returns API:');
  console.log(`Всего устаревших методов: ${report.totalMethods}`);
  
  console.log('\n📝 Методы для миграции:');
  report.methods.forEach(method => {
    console.log(`  • ${method.name}`);
    console.log(`    → ${method.replacement}`);
    console.log(`    Сложность: ${method.complexity}`);
    console.log(`    Время: ${method.estimatedEffort}`);
    console.log('');
  });
  
  console.log('📖 Руководство по миграции:');
  console.log(report.migrationGuide);
  
  return report;
};
```

### Автоматическая замена в коде

```typescript
/**
 * Автоматический поиск и замена устаревших методов в коде
 * Automatic search and replace of deprecated methods in code
 */
class LegacyCodeReplacer {
  private readonly replacements = new Map([
    [
      /\.compensate\s*\(\s*{([^}]+)}\s*\)/g,
      (match: string, params: string) => {
        // Парсим параметры и конвертируем в новый формат
        return `.setAction({\n  action: 'compensate',\n  ${params.trim()}\n})`;
      }
    ],
    [
      /\.returnMoney\s*\(\s*{([^}]+)}\s*\)/g,
      (match: string, params: string) => {
        return `.setAction({\n  action: 'return_money',\n  ${params.trim()}\n})`;
      }
    ],
    [
      /\.verify\s*\(\s*{([^}]+)}\s*\)/g,
      (match: string, params: string) => {
        return `.setAction({\n  action: 'approve',\n  ${params.trim()}\n})`;
      }
    ]
    // Дополнительные правила замены...
  ]);

  replaceInFile(fileContent: string): string {
    let updatedContent = fileContent;
    
    for (const [pattern, replacement] of this.replacements) {
      updatedContent = updatedContent.replace(pattern, replacement as any);
    }
    
    // Добавляем комментарии о миграции
    if (updatedContent !== fileContent) {
      updatedContent = `// ✅ АВТОМАТИЧЕСКИ МИГРИРОВАНО: устаревшие RFBS Returns методы заменены на setAction()\n// Дата миграции: ${new Date().toISOString().split('T')[0]}\n\n${updatedContent}`;
    }
    
    return updatedContent;
  }

  generateMigrationScript(): string {
    return `
#!/bin/bash
# Скрипт автоматической миграции RFBS Returns API

echo "🚀 Начинаем миграцию RFBS Returns API..."

# Находим все TypeScript файлы с использованием устаревших методов
grep -r "\\.(compensate|returnMoney|receiveReturn|reject|verify)(" . --include="*.ts" --include="*.tsx" > legacy_usage.txt

if [ -s legacy_usage.txt ]; then
    echo "⚠️ Найдены файлы с устаревшими методами:"
    cat legacy_usage.txt
    echo ""
    echo "📝 Рекомендуется выполнить миграцию следующих методов:"
    echo "  • compensate() → setAction({ action: 'compensate' })"
    echo "  • returnMoney() → setAction({ action: 'return_money' })"
    echo "  • receiveReturn() → setAction({ action: 'receive_return' })"
    echo "  • reject() → setAction({ action: 'reject' })"
    echo "  • verify() → setAction({ action: 'approve' })"
else
    echo "✅ Устаревшие методы не найдены. Код готов к отключению legacy API."
fi

# Проверяем импорты
grep -r "RfbsReturns.*Request" . --include="*.ts" --include="*.tsx" > legacy_types.txt
if [ -s legacy_types.txt ]; then
    echo "📦 Найдены импорты устаревших типов - также требуют миграции"
fi

rm -f legacy_usage.txt legacy_types.txt
echo "✅ Анализ завершен"
`;
  }
}
```

---

## 💡 Рекомендации по миграции

### Планирование миграции

```typescript
/**
 * План миграции RFBS Returns API
 * RFBS Returns API migration plan
 */
interface MigrationPlan {
  phases: Array<{
    phase: number;
    name: string;
    duration: string;
    tasks: string[];
    deliverables: string[];
  }>;
  risks: string[];
  rollbackPlan: string[];
}

const createMigrationPlan = (): MigrationPlan => ({
  phases: [
    {
      phase: 1,
      name: 'Подготовка и анализ',
      duration: '1 неделя',
      tasks: [
        'Аудит текущего использования legacy методов',
        'Анализ зависимостей и интеграций',
        'Создание тестовой среды с новым API',
        'Разработка стратегии миграции'
      ],
      deliverables: [
        'Отчет об использовании legacy методов',
        'План миграции с временными рамками',
        'Тестовая среда готова к использованию'
      ]
    },
    {
      phase: 2,
      name: 'Разработка и тестирование',
      duration: '2-3 недели',
      tasks: [
        'Рефакторинг кода на новые методы',
        'Обновление типов TypeScript',
        'Создание wrapper-ов для переходного периода',
        'Разработка автотестов для нового API'
      ],
      deliverables: [
        'Обновленный код с новыми методами',
        'Полный набор тестов',
        'Документация по изменениям'
      ]
    },
    {
      phase: 3,
      name: 'Поэтапное развертывание',
      duration: '1-2 недели',
      tasks: [
        'Развертывание в тестовой среде',
        'Интеграционное тестирование',
        'Производственное развертывание',
        'Мониторинг работы нового API'
      ],
      deliverables: [
        'Работающее решение в продукции',
        'Отчеты о тестировании',
        'План мониторинга'
      ]
    }
  ],
  risks: [
    'Изменение поведения API может повлиять на бизнес-логику',
    'Legacy методы могут быть отключены раньше планируемого срока',
    'Неполная миграция может привести к ошибкам в продукции',
    'Зависимость от внешних систем, использующих старое API'
  ],
  rollbackPlan: [
    'Сохранить legacy обертки на случай необходимости отката',
    'Подготовить возможность быстрого переключения на старые методы',
    'Обеспечить резервные копии конфигурации',
    'Документировать процедуру отката'
  ]
});

// Использование плана миграции
const executeMigrationPlan = async () => {
  const plan = createMigrationPlan();
  console.log('📋 План миграции RFBS Returns API:');
  
  plan.phases.forEach((phase, index) => {
    console.log(`\n${phase.phase}. ${phase.name} (${phase.duration})`);
    console.log('Задачи:');
    phase.tasks.forEach(task => console.log(`  • ${task}`));
    console.log('Результаты:');
    phase.deliverables.forEach(deliverable => console.log(`  ✓ ${deliverable}`));
  });
  
  console.log('\n⚠️ Риски:');
  plan.risks.forEach(risk => console.log(`  • ${risk}`));
  
  console.log('\n🔙 План отката:');
  plan.rollbackPlan.forEach(step => console.log(`  • ${step}`));
};
```

### Чек-лист миграции

```markdown
## 📋 Чек-лист миграции RFBS Returns API

### Подготовка
- [ ] Проведен аудит использования legacy методов
- [ ] Определены все затронутые файлы и модули
- [ ] Создана резервная копия текущего кода
- [ ] Подготовлена тестовая среда

### Код
- [ ] Заменены все вызовы `compensate()` на `setAction({ action: 'compensate' })`
- [ ] Заменены все вызовы `returnMoney()` на `setAction({ action: 'return_money' })`
- [ ] Заменены все вызовы `receiveReturn()` на `setAction({ action: 'receive_return' })`
- [ ] Заменены все вызовы `reject()` на `setAction({ action: 'reject' })`  
- [ ] Заменены все вызовы `verify()` на `setAction({ action: 'approve' })`
- [ ] Обновлены типы TypeScript
- [ ] Удалены неиспользуемые импорты legacy типов

### Тестирование
- [ ] Написаны тесты для всех новых вызовов API
- [ ] Проведено интеграционное тестирование
- [ ] Проверена обработка ошибок
- [ ] Протестированы граничные случаи

### Документация
- [ ] Обновлена внутренняя документация
- [ ] Созданы комментарии к изменениям в коде
- [ ] Подготовлены инструкции для команды

### Развертывание
- [ ] Проведено тестирование в staging среде
- [ ] Настроен мониторинг новых API вызовов
- [ ] Подготовлен план отката
- [ ] Развертывание в продукции выполнено успешно

### Мониторинг
- [ ] Настроены алерты на ошибки нового API
- [ ] Контролируется производительность новых методов
- [ ] Отслеживаются метрики бизнес-процессов
- [ ] Команда обучена работе с новым API
```

Создана полная документация по устаревшим методам с планом миграции, автоматическими утилитами и чек-листом. Теперь создам финальную документацию по автоматизации и workflow.