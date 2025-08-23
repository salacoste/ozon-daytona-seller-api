# Chat API - Управление чатами и общением с покупателями

Chat API предоставляет возможности для общения с покупателями через встроенную систему чатов OZON. Позволяет создавать новые чаты, отправлять сообщения и файлы, а также управлять историей переписки.

## Обзор API

**Количество методов:** 8  
**Основные функции:** Создание чатов, отправка сообщений и файлов, управление историей  
**Доступность:** Только для продавцов с подпиской Premium Plus  
**Ограничения:** Зависят от типа отправления (FBO/FBS/rFBS) и времени

⚠️ **Важно:** Методы v2 для списка чатов и истории устаревают. Рекомендуется использовать v3.

## Типы отправлений и ограничения

### Временные ограничения по типам отправления

**FBO (Fulfillment by OZON):**
- Чат может создать только покупатель
- Продавец может отвечать в течение 48 часов после последнего сообщения покупателя

**FBS и rFBS (Fulfillment by Seller):**
- Продавец может создать чат в течение 72 часов после оплаты или доставки
- После 72 часов можно только отвечать на сообщения покупателя (в течение 48 часов)

## Основные методы управления чатами

### 1. Создание нового чата

**Метод:** `startChat()`  
**Эндпоинт:** `POST /v1/chat/start`

Создает новый чат с покупателем по номеру отправления.

#### Параметры запроса

```typescript
interface ChatStartRequest {
  posting_number: string;          // Номер отправления
}
```

#### Пример использования

```typescript
import { OzonSellerApiClient } from '@spacechemical/ozon-seller-api';

const client = new OzonSellerApiClient({
  apiKey: 'your-api-key',
  clientId: 'your-client-id'
});

// Создать новый чат по отправлению
const chat = await client.chat.startChat({
  posting_number: 'FBS-12345'
});

console.log(`Чат создан с ID: ${chat.result?.chat_id}`);

// Проверить результат создания
if (chat.result?.chat_id) {
  console.log('✅ Чат успешно создан');
  console.log(`ID чата: ${chat.result.chat_id}`);
} else {
  console.log('❌ Не удалось создать чат');
}
```

### 2. Отправка сообщений

**Метод:** `sendMessage()`  
**Эндпоинт:** `POST /v1/chat/send/message`

Отправляет текстовое сообщение в существующий чат.

#### Параметры запроса

```typescript
interface ChatSendMessageRequest {
  chat_id: string;                 // ID чата
  text: string;                    // Текст сообщения
}
```

#### Пример использования

```typescript
// Отправить сообщение покупателю
const result = await client.chat.sendMessage({
  chat_id: 'chat-123',
  text: 'Здравствуйте! Ваш заказ готовится к отправке. Ожидаемая дата отгрузки - завтра.'
});

if (result.result === 'ok') {
  console.log('✅ Сообщение отправлено успешно');
} else {
  console.log('❌ Ошибка отправки сообщения');
}

// Отправка сообщения с информацией о доставке
const trackingResult = await client.chat.sendMessage({
  chat_id: 'chat-123',
  text: `📦 Ваш заказ отправлен!\n\nТрек-номер: 12345678901234\nОжидаемая доставка: 25.12.2024\n\nОтследить можно по ссылке: https://example.com/track/12345678901234`
});
```

### 3. Отправка файлов

**Метод:** `sendFile()`  
**Эндпоинт:** `POST /v1/chat/send/file`

Отправляет файл (изображение, документ) в чат.

#### Параметры запроса

```typescript
interface ChatSendFileRequest {
  chat_id: string;                 // ID чата
  base64_content: string;          // Содержимое файла в base64
  name: string;                    // Имя файла
}
```

#### Пример использования

```typescript
// Функция для конвертации файла в base64
const fileToBase64 = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      resolve(base64);
    };
    reader.onerror = error => reject(error);
  });
};

// Отправка файла-инструкции
const instructionFile = new File(['Инструкция по использованию товара...'], 'instruction.txt');
const base64Content = await fileToBase64(instructionFile);

const fileResult = await client.chat.sendFile({
  chat_id: 'chat-123',
  base64_content: base64Content,
  name: 'instruction.txt'
});

if (fileResult.result === 'ok') {
  console.log('✅ Файл отправлен успешно');
}

// Отправка изображения товара
const sendProductImage = async (chatId: string, imageFile: File) => {
  const base64Image = await fileToBase64(imageFile);
  
  return client.chat.sendFile({
    chat_id: chatId,
    base64_content: base64Image,
    name: imageFile.name
  });
};
```

### 4. Отметка сообщений как прочитанные

**Метод:** `markAsRead()`  
**Эндпоинт:** `POST /v2/chat/read`

Отмечает выбранное сообщение и все предыдущие как прочитанные.

#### Пример использования

```typescript
// Отметить сообщения как прочитанные
const readResult = await client.chat.markAsRead({
  chat_id: 'chat-123',
  from_message_id: 456
});

console.log(`Осталось непрочитанных сообщений: ${readResult.unread_count}`);

// Автоматическая отметка при получении новых сообщений
const markLatestAsRead = async (chatId: string) => {
  // Получить последние сообщения
  const history = await client.chat.getChatHistoryV3({
    chat_id: chatId,
    limit: 1,
    direction: 'Backward'
  });
  
  if (history.messages && history.messages.length > 0) {
    const latestMessage = history.messages[0];
    if (latestMessage.message_id) {
      await client.chat.markAsRead({
        chat_id: chatId,
        from_message_id: latestMessage.message_id
      });
    }
  }
};
```

## Методы получения информации о чатах

### 5. Получение списка чатов (v3)

**Метод:** `getChatListV3()`  
**Эндпоинт:** `POST /v3/chat/list`

Возвращает список чатов с фильтрацией и пагинацией.

#### Параметры запроса

```typescript
interface ChatListV3Request {
  limit?: number;                  // Количество чатов (по умолчанию 30)
  cursor?: string;                 // Курсор для пагинации
  filter?: {
    chat_status?: 'Opened' | 'Closed';
    unread_only?: boolean;         // Только с непрочитанными сообщениями
    posting_number?: string;       // Фильтр по номеру отправления
  };
}
```

#### Пример использования

```typescript
// Получить все открытые чаты с непрочитанными сообщениями
const unreadChats = await client.chat.getChatListV3({
  limit: 100,
  filter: {
    chat_status: 'Opened',
    unread_only: true
  }
});

console.log(`Найдено чатов с непрочитанными сообщениями: ${unreadChats.chats?.length || 0}`);

unreadChats.chats?.forEach(chatInfo => {
  console.log(`Чат ${chatInfo.chat?.chat_id}:`);
  console.log(`  Отправление: ${chatInfo.chat?.posting_number}`);
  console.log(`  Непрочитанных: ${chatInfo.unread_count}`);
  console.log(`  Последнее сообщение: ${chatInfo.last_message?.created_at}`);
});

// Получить все чаты с пагинацией
const getAllChats = async () => {
  const allChats = [];
  let cursor: string | undefined;
  
  do {
    const response = await client.chat.getChatListV3({
      limit: 100,
      cursor
    });
    
    if (response.chats) {
      allChats.push(...response.chats);
    }
    
    cursor = response.has_next ? response.cursor : undefined;
  } while (cursor);
  
  return allChats;
};
```

### 6. Получение истории чата (v3)

**Метод:** `getChatHistoryV3()`  
**Эндпоинт:** `POST /v3/chat/history`

Возвращает историю сообщений конкретного чата.

#### Параметры запроса

```typescript
interface ChatHistoryV3Request {
  chat_id: string;                 // ID чата
  limit?: number;                  // Количество сообщений (по умолчанию 30)
  direction?: 'Forward' | 'Backward'; // Направление (по умолчанию Backward)
  from_message_id?: number;        // ID сообщения для начала выборки
}
```

#### Пример использования

```typescript
// Получить последние 50 сообщений чата
const history = await client.chat.getChatHistoryV3({
  chat_id: 'chat-123',
  limit: 50,
  direction: 'Backward'
});

console.log(`Получено сообщений: ${history.messages?.length || 0}`);

history.messages?.forEach(message => {
  const timestamp = new Date(message.created_at!).toLocaleString();
  const sender = message.user?.name || 'Система';
  const content = message.data?.join(' ') || '';
  
  console.log(`[${timestamp}] ${sender}: ${content}`);
  
  if (message.is_image) {
    console.log('  📷 Содержит изображение');
  }
  
  if (message.files && message.files.length > 0) {
    console.log(`  📎 Файлы: ${message.files.map(f => f.name).join(', ')}`);
  }
});

// Получить всю историю чата
const getFullChatHistory = async (chatId: string) => {
  const allMessages = [];
  let fromMessageId: number | undefined;
  
  do {
    const response = await client.chat.getChatHistoryV3({
      chat_id: chatId,
      limit: 100,
      direction: 'Backward',
      from_message_id: fromMessageId
    });
    
    if (response.messages && response.messages.length > 0) {
      allMessages.push(...response.messages);
      
      // Получить ID самого старого сообщения для следующего запроса
      const oldestMessage = response.messages[response.messages.length - 1];
      fromMessageId = oldestMessage.message_id;
    } else {
      break;
    }
  } while (true);
  
  return allMessages.reverse(); // Вернуть в хронологическом порядке
};
```

### 7. Получение списка чатов (v2) - DEPRECATED

**Метод:** `getChatListV2()`  
⚠️ **Устарел:** Рекомендуется использовать `getChatListV3()`

### 8. Получение истории чата (v2) - DEPRECATED

**Метод:** `getChatHistoryV2()`  
⚠️ **Устарел:** Рекомендуется использовать `getChatHistoryV3()`

## Практические сценарии использования

### 1. Система автоматических уведомлений

```typescript
class ChatNotificationSystem {
  constructor(private client: OzonSellerApiClient) {}

  // Отправить уведомление о готовности заказа к отправке
  async notifyOrderReady(postingNumber: string, trackingNumber?: string) {
    try {
      // Создать чат или получить существующий
      const chat = await this.client.chat.startChat({
        posting_number: postingNumber
      });

      if (chat.result?.chat_id) {
        let message = `📦 Добрый день! Ваш заказ готов к отправке.`;
        
        if (trackingNumber) {
          message += `\n\n📋 Трек-номер для отслеживания: ${trackingNumber}`;
          message += `\n🚚 Заказ будет передан в службу доставки в ближайшее время.`;
        }
        
        message += `\n\n📞 Если у вас есть вопросы, напишите нам в этом чате.`;

        await this.client.chat.sendMessage({
          chat_id: chat.result.chat_id,
          text: message
        });

        console.log(`✅ Уведомление отправлено для заказа ${postingNumber}`);
      }
    } catch (error) {
      console.error(`❌ Ошибка отправки уведомления для ${postingNumber}:`, error);
    }
  }

  // Отправить уведомление о задержке доставки
  async notifyDeliveryDelay(postingNumber: string, newDeliveryDate: string, reason: string) {
    try {
      const chat = await this.client.chat.startChat({
        posting_number: postingNumber
      });

      if (chat.result?.chat_id) {
        const message = `⏰ К сожалению, доставка вашего заказа задерживается.\n\n` +
                       `📅 Новая ожидаемая дата доставки: ${newDeliveryDate}\n` +
                       `💬 Причина: ${reason}\n\n` +
                       `Приносим извинения за доставленные неудобства. ` +
                       `Если у вас есть вопросы, пожалуйста, напишите нам.`;

        await this.client.chat.sendMessage({
          chat_id: chat.result.chat_id,
          text: message
        });

        console.log(`✅ Уведомление о задержке отправлено для ${postingNumber}`);
      }
    } catch (error) {
      console.error(`❌ Ошибка отправки уведомления о задержке для ${postingNumber}:`, error);
    }
  }

  // Отправить инструкцию по использованию товара
  async sendProductInstructions(postingNumber: string, instructionFile: File) {
    try {
      const chat = await this.client.chat.startChat({
        posting_number: postingNumber
      });

      if (chat.result?.chat_id) {
        // Сначала отправляем сообщение
        await this.client.chat.sendMessage({
          chat_id: chat.result.chat_id,
          text: '📖 Отправляем вам инструкцию по использованию товара. Если возникнут вопросы, обращайтесь!'
        });

        // Затем отправляем файл
        const base64Content = await this.fileToBase64(instructionFile);
        
        await this.client.chat.sendFile({
          chat_id: chat.result.chat_id,
          base64_content: base64Content,
          name: instructionFile.name
        });

        console.log(`✅ Инструкция отправлена для заказа ${postingNumber}`);
      }
    } catch (error) {
      console.error(`❌ Ошибка отправки инструкции для ${postingNumber}:`, error);
    }
  }

  private async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1];
        resolve(base64);
      };
      reader.onerror = error => reject(error);
    });
  }
}

const notificationSystem = new ChatNotificationSystem(client);

// Уведомить о готовности заказов
await notificationSystem.notifyOrderReady('FBS-12345', 'TRACK123456');
await notificationSystem.notifyDeliveryDelay('FBS-12346', '28.12.2024', 'Задержка на складе поставщика');
```

### 2. Система мониторинга и автоответов

```typescript
class ChatMonitoringSystem {
  constructor(private client: OzonSellerApiClient) {}

  // Мониторинг непрочитанных сообщений
  async monitorUnreadMessages() {
    try {
      const unreadChats = await this.client.chat.getChatListV3({
        limit: 1000,
        filter: {
          unread_only: true,
          chat_status: 'Opened'
        }
      });

      console.log(`🔔 Найдено чатов с непрочитанными сообщениями: ${unreadChats.chats?.length || 0}`);

      for (const chatInfo of unreadChats.chats || []) {
        if (chatInfo.chat?.chat_id) {
          await this.processUnreadChat(chatInfo);
        }
      }
    } catch (error) {
      console.error('❌ Ошибка мониторинга чатов:', error);
    }
  }

  private async processUnreadChat(chatInfo: any) {
    const chatId = chatInfo.chat.chat_id;
    const unreadCount = chatInfo.unread_count;

    console.log(`📬 Обработка чата ${chatId} (${unreadCount} непрочитанных)`);

    // Получить последние сообщения
    const history = await this.client.chat.getChatHistoryV3({
      chat_id: chatId,
      limit: 10,
      direction: 'Backward'
    });

    // Анализировать сообщения на предмет автоответов
    const latestMessages = history.messages || [];
    for (const message of latestMessages) {
      if (message.user?.user_type === 'Customer' && !message.is_read_by_seller) {
        await this.processCustomerMessage(chatId, message);
      }
    }

    // Отметить сообщения как прочитанные
    if (latestMessages.length > 0) {
      const latestMessageId = latestMessages[0].message_id;
      if (latestMessageId) {
        await this.client.chat.markAsRead({
          chat_id: chatId,
          from_message_id: latestMessageId
        });
      }
    }
  }

  private async processCustomerMessage(chatId: string, message: any) {
    const messageText = (message.data || []).join(' ').toLowerCase();
    
    // Автоответы на часто задаваемые вопросы
    const autoResponses = [
      {
        keywords: ['где', 'заказ', 'трек', 'отслед'],
        response: 'Для отслеживания заказа используйте трек-номер в личном кабинете OZON или на сайте службы доставки. Если трек-номера нет, заказ еще готовится к отправке.'
      },
      {
        keywords: ['когда', 'доставк', 'получ'],
        response: 'Сроки доставки зависят от вашего региона и выбранного способа доставки. Обычно доставка занимает 1-5 рабочих дней с момента отправки.'
      },
      {
        keywords: ['возврат', 'верн', 'обмен'],
        response: 'Вы можете оформить возврат через ваш личный кабинет в разделе "Мои заказы" в течение 14 дней с момента получения товара. Товар должен быть в оригинальной упаковке.'
      },
      {
        keywords: ['размер', 'не подход', 'мал', 'велик'],
        response: 'При проблемах с размером вы можете оформить обмен или возврат. Рекомендуем обратиться в службу поддержки OZON для быстрого решения вопроса.'
      }
    ];

    for (const autoResponse of autoResponses) {
      if (autoResponse.keywords.some(keyword => messageText.includes(keyword))) {
        await this.client.chat.sendMessage({
          chat_id: chatId,
          text: `🤖 ${autoResponse.response}\n\nЕсли это не ответило на ваш вопрос, наш специалист свяжется с вами в ближайшее время.`
        });
        
        console.log(`🤖 Отправлен автоответ для чата ${chatId}`);
        break;
      }
    }
  }

  // Генерация отчета по активности чатов
  async generateChatReport(days: number = 7) {
    const allChats = await this.getAllChats();
    const now = new Date();
    const cutoffDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    const report = {
      totalChats: allChats.length,
      openChats: 0,
      closedChats: 0,
      unreadChats: 0,
      totalUnreadMessages: 0,
      recentActivity: 0,
      averageResponseTime: 0
    };

    for (const chatInfo of allChats) {
      // Статистика по статусам
      if (chatInfo.chat?.chat_status === 'Opened') {
        report.openChats++;
      } else {
        report.closedChats++;
      }

      // Непрочитанные сообщения
      if (chatInfo.unread_count > 0) {
        report.unreadChats++;
        report.totalUnreadMessages += chatInfo.unread_count;
      }

      // Активность за период
      if (chatInfo.last_message?.created_at) {
        const lastMessageDate = new Date(chatInfo.last_message.created_at);
        if (lastMessageDate >= cutoffDate) {
          report.recentActivity++;
        }
      }
    }

    console.log('📊 Отчет по чатам за последние', days, 'дней:');
    console.log(`Всего чатов: ${report.totalChats}`);
    console.log(`Открытых: ${report.openChats}, закрытых: ${report.closedChats}`);
    console.log(`Чатов с непрочитанными: ${report.unreadChats}`);
    console.log(`Всего непрочитанных сообщений: ${report.totalUnreadMessages}`);
    console.log(`Чатов с активностью за период: ${report.recentActivity}`);

    return report;
  }

  private async getAllChats() {
    const allChats = [];
    let cursor: string | undefined;

    do {
      const response = await this.client.chat.getChatListV3({
        limit: 1000,
        cursor
      });

      if (response.chats) {
        allChats.push(...response.chats);
      }

      cursor = response.has_next ? response.cursor : undefined;
    } while (cursor);

    return allChats;
  }
}

const monitoringSystem = new ChatMonitoringSystem(client);

// Настроить регулярный мониторинг
setInterval(async () => {
  await monitoringSystem.monitorUnreadMessages();
}, 5 * 60 * 1000); // Каждые 5 минут

// Генерировать отчет каждый день
setInterval(async () => {
  await monitoringSystem.generateChatReport(7);
}, 24 * 60 * 60 * 1000); // Каждые 24 часа
```

### 3. Шаблоны сообщений и массовые рассылки

```typescript
class ChatTemplateSystem {
  private templates: Map<string, MessageTemplate> = new Map();
  
  constructor(private client: OzonSellerApiClient) {
    this.initializeTemplates();
  }

  private initializeTemplates() {
    // Шаблоны сообщений
    this.templates.set('order_shipped', {
      title: 'Заказ отправлен',
      template: `📦 Ваш заказ отправлен!\n\n🚚 Трек-номер: {{trackingNumber}}\n📅 Ожидаемая доставка: {{deliveryDate}}\n\n📍 Отследить можно по ссылке: {{trackingUrl}}`
    });

    this.templates.set('order_delayed', {
      title: 'Задержка заказа',
      template: `⏰ К сожалению, ваш заказ задерживается.\n\n📅 Новая дата доставки: {{newDate}}\n💬 Причина: {{reason}}\n\nПриносим извинения за неудобства!`
    });

    this.templates.set('thank_you', {
      title: 'Благодарность за покупку',
      template: `🎉 Спасибо за покупку!\n\n⭐ Будем благодарны за отзыв о товаре.\n📞 При возникновении вопросов обращайтесь в чат.\n\n🛍️ Ждем вас снова!`
    });

    this.templates.set('product_care', {
      title: 'Уход за товаром',
      template: `🛡️ Рекомендации по уходу за товаром:\n\n{{careInstructions}}\n\n📖 Подробную инструкцию можно найти в упаковке.\n❓ Есть вопросы? Пишите нам!`
    });
  }

  // Отправить сообщение по шаблону
  async sendTemplateMessage(
    postingNumber: string, 
    templateKey: string, 
    variables: Record<string, string>
  ) {
    const template = this.templates.get(templateKey);
    if (!template) {
      throw new Error(`Шаблон ${templateKey} не найден`);
    }

    try {
      // Создать или получить чат
      const chat = await this.client.chat.startChat({
        posting_number: postingNumber
      });

      if (chat.result?.chat_id) {
        // Заменить переменные в шаблоне
        let message = template.template;
        Object.entries(variables).forEach(([key, value]) => {
          message = message.replace(new RegExp(`{{${key}}}`, 'g'), value);
        });

        await this.client.chat.sendMessage({
          chat_id: chat.result.chat_id,
          text: message
        });

        console.log(`✅ Отправлен шаблон "${template.title}" для ${postingNumber}`);
      }
    } catch (error) {
      console.error(`❌ Ошибка отправки шаблона для ${postingNumber}:`, error);
    }
  }

  // Массовая рассылка по списку заказов
  async sendBulkMessages(
    orders: Array<{
      postingNumber: string;
      templateKey: string;
      variables: Record<string, string>;
    }>,
    delayMs: number = 1000
  ) {
    console.log(`📨 Начинаем массовую рассылку для ${orders.length} заказов`);
    
    let successCount = 0;
    let errorCount = 0;

    for (const [index, order] of orders.entries()) {
      try {
        await this.sendTemplateMessage(
          order.postingNumber,
          order.templateKey,
          order.variables
        );
        successCount++;
      } catch (error) {
        console.error(`❌ Ошибка для заказа ${order.postingNumber}:`, error);
        errorCount++;
      }

      // Прогресс
      if ((index + 1) % 10 === 0) {
        console.log(`📊 Прогресс: ${index + 1}/${orders.length} (успешно: ${successCount}, ошибок: ${errorCount})`);
      }

      // Задержка между отправками для соблюдения лимитов
      if (index < orders.length - 1) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }

    console.log(`📊 Рассылка завершена: ${successCount} успешно, ${errorCount} ошибок`);
    return { successCount, errorCount };
  }

  // Добавить новый шаблон
  addTemplate(key: string, title: string, template: string) {
    this.templates.set(key, { title, template });
    console.log(`✅ Добавлен шаблон "${title}"`);
  }

  // Получить список шаблонов
  getTemplates() {
    return Array.from(this.templates.entries()).map(([key, template]) => ({
      key,
      title: template.title,
      preview: template.template.substring(0, 100) + '...'
    }));
  }
}

interface MessageTemplate {
  title: string;
  template: string;
}

const templateSystem = new ChatTemplateSystem(client);

// Примеры использования шаблонов
await templateSystem.sendTemplateMessage('FBS-12345', 'order_shipped', {
  trackingNumber: 'TRACK123456',
  deliveryDate: '25.12.2024',
  trackingUrl: 'https://example.com/track/TRACK123456'
});

await templateSystem.sendTemplateMessage('FBS-12346', 'product_care', {
  careInstructions: 'Стирка при температуре не выше 30°C. Не отжимать. Сушить в горизонтальном положении.'
});

// Массовая рассылка уведомлений об отправке
const shippingNotifications = [
  {
    postingNumber: 'FBS-12347',
    templateKey: 'order_shipped',
    variables: {
      trackingNumber: 'TRACK123457',
      deliveryDate: '26.12.2024',
      trackingUrl: 'https://example.com/track/TRACK123457'
    }
  },
  {
    postingNumber: 'FBS-12348', 
    templateKey: 'order_shipped',
    variables: {
      trackingNumber: 'TRACK123458',
      deliveryDate: '27.12.2024', 
      trackingUrl: 'https://example.com/track/TRACK123458'
    }
  }
];

await templateSystem.sendBulkMessages(shippingNotifications, 2000); // 2 секунды между сообщениями
```

## Обработка ошибок

### Типичные ошибки и их обработка

```typescript
try {
  const chat = await client.chat.startChat({
    posting_number: 'FBS-12345'
  });
} catch (error) {
  if (error.response?.status === 400) {
    const errorData = error.response.data;
    
    switch (errorData.code) {
      case 'POSTING_NOT_FOUND':
        console.error('Отправление не найдено');
        break;
      case 'CHAT_CREATION_NOT_ALLOWED':
        console.error('Создание чата не разрешено для данного типа отправления');
        break;
      case 'TIME_LIMIT_EXCEEDED':
        console.error('Время для создания чата истекло');
        break;
      case 'CHAT_ALREADY_EXISTS':
        console.error('Чат уже существует для данного отправления');
        break;
      default:
        console.error('Неизвестная ошибка:', errorData.message);
    }
  } else if (error.response?.status === 403) {
    console.error('Доступ запрещен. Убедитесь, что у вас есть подписка Premium Plus');
  } else if (error.response?.status === 429) {
    console.error('Превышен лимит запросов. Повторите попытку позже.');
  } else {
    console.error('Произошла ошибка:', error.message);
  }
}
```

## Лучшие практики

### 1. Соблюдение временных ограничений

```typescript
class ChatTimeManager {
  // Проверить возможность отправки сообщения
  static canSendMessage(postingType: 'FBO' | 'FBS' | 'rFBS', orderDate: Date, lastMessageDate?: Date): boolean {
    const now = new Date();
    const orderTime = orderDate.getTime();
    const currentTime = now.getTime();

    switch (postingType) {
      case 'FBO':
        // Можно отвечать только в течение 48 часов после последнего сообщения покупателя
        if (lastMessageDate) {
          const timeSinceLastMessage = currentTime - lastMessageDate.getTime();
          return timeSinceLastMessage <= 48 * 60 * 60 * 1000; // 48 часов
        }
        return false;

      case 'FBS':
      case 'rFBS':
        // Можно создавать чат в течение 72 часов после оплаты
        const timeSinceOrder = currentTime - orderTime;
        if (timeSinceOrder <= 72 * 60 * 60 * 1000) { // 72 часа
          return true;
        }
        
        // После 72 часов можно только отвечать в течение 48 часов
        if (lastMessageDate) {
          const timeSinceLastMessage = currentTime - lastMessageDate.getTime();
          return timeSinceLastMessage <= 48 * 60 * 60 * 1000;
        }
        
        return false;

      default:
        return false;
    }
  }
}
```

### 2. Управление rate limits

```typescript
class RateLimitedChatClient {
  private readonly requestQueue: Array<() => Promise<any>> = [];
  private readonly REQUEST_DELAY = 1000; // 1 секунда между запросами
  private isProcessing = false;

  constructor(private client: OzonSellerApiClient) {}

  async sendMessageWithRateLimit(chatId: string, text: string) {
    return this.enqueueRequest(async () => {
      return this.client.chat.sendMessage({ chat_id: chatId, text });
    });
  }

  private async enqueueRequest<T>(request: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.requestQueue.push(async () => {
        try {
          const result = await request();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });

      if (!this.isProcessing) {
        this.processQueue();
      }
    });
  }

  private async processQueue() {
    if (this.isProcessing || this.requestQueue.length === 0) return;
    
    this.isProcessing = true;

    while (this.requestQueue.length > 0) {
      const request = this.requestQueue.shift()!;
      await request();
      
      if (this.requestQueue.length > 0) {
        await new Promise(resolve => setTimeout(resolve, this.REQUEST_DELAY));
      }
    }

    this.isProcessing = false;
  }
}
```

### 3. Кэширование данных чатов

```typescript
class ChatCache {
  private chatListCache: Map<string, { data: any; timestamp: number }> = new Map();
  private historyCache: Map<string, { data: any; timestamp: number }> = new Map();
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 минут

  async getCachedChatList(client: OzonSellerApiClient, filter?: any): Promise<any> {
    const cacheKey = JSON.stringify(filter || {});
    const cached = this.chatListCache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached.data;
    }

    const data = await client.chat.getChatListV3({ filter });
    this.chatListCache.set(cacheKey, { data, timestamp: Date.now() });
    
    return data;
  }

  clearCache() {
    this.chatListCache.clear();
    this.historyCache.clear();
  }
}
```

---

**Связанные API:** Premium API (подписка Premium Plus), Questions-Answers API (общение с покупателями), Review API (отзывы покупателей)