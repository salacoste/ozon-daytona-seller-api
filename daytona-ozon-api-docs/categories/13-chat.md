# 💬 Chat API - Общение с покупателями

**API для работы с чатами и сообщениями покупателей** — создание чатов, отправка сообщений и файлов, управление историей общения.

## ⚠️ **ТРЕБУЕТ ПОДПИСКУ PREMIUM PLUS**
Все методы Chat API доступны только для продавцов с подпиской Premium Plus.

## 📋 Методы (8 endpoints)

| Категория | Метод | Endpoint | Назначение |
|-----------|-------|----------|------------|
| **Управление чатами** | `startChat` | `/v1/chat/start` | Создание нового чата с покупателем |
| | `getChatListV3` | `/v3/chat/list` | Список чатов с фильтрацией |
| | ~~getChatListV2~~ | `/v2/chat/list` | ⚠️ Устарел, используйте v3 |
| **Сообщения** | `sendMessage` | `/v1/chat/send/message` | Отправка текстового сообщения |
| | `sendFile` | `/v1/chat/send/file` | Отправка файла |
| | `markAsRead` | `/v2/chat/read` | Отметка сообщений как прочитанных |
| **История** | `getChatHistoryV3` | `/v3/chat/history` | История сообщений чата |
| | ~~getChatHistoryV2~~ | `/v2/chat/history` | ⚠️ Отключается 13.07.2025 |

---

## 🚀 Быстрый старт

### Инициализация клиента
```typescript
import { OzonSellerAPI } from 'daytona-ozon-seller-api';

// ⚠️ Требуется подписка Premium Plus
const client = new OzonSellerAPI({
  clientId: 'your-client-id',
  apiKey: 'your-api-key'
});
```

### Базовый workflow общения с покупателем
```typescript
try {
  // 1. Получить список активных чатов
  const activeChats = await client.chat.getChatListV3({
    limit: 50,
    filter: {
      chat_status: 'Opened',
      unread_only: true
    }
  });

  console.log(`📊 Активных чатов: ${activeChats.chats?.length || 0}`);

  // 2. Создать новый чат по отправлению
  const newChat = await client.chat.startChat({
    posting_number: 'FBS-12345-0001-1'
  });

  if (newChat.result?.chat_id) {
    console.log(`💬 Создан чат: ${newChat.result.chat_id}`);

    // 3. Отправить приветственное сообщение
    await client.chat.sendMessage({
      chat_id: newChat.result.chat_id,
      text: 'Здравствуйте! Я готов ответить на ваши вопросы по заказу.'
    });

    // 4. Отправить инструкцию (файл)
    const fileContent = 'base64_encoded_file_content'; // PDF/изображение
    await client.chat.sendFile({
      chat_id: newChat.result.chat_id,
      base64_content: fileContent,
      name: 'care_instructions.pdf'
    });

    console.log('✅ Сообщения отправлены');
  }

  // 5. Обработать входящие сообщения
  for (const chatInfo of activeChats.chats || []) {
    if (chatInfo.unread_count && chatInfo.unread_count > 0) {
      console.log(`\n📩 Чат ${chatInfo.chat?.chat_id}: ${chatInfo.unread_count} непрочитанных`);
      
      // Получить историю чата
      const history = await client.chat.getChatHistoryV3({
        chat_id: chatInfo.chat!.chat_id,
        limit: 10,
        direction: 'Backward' // от новых к старым
      });

      // Показать последние сообщения
      history.messages?.slice(0, 3).forEach(message => {
        const sender = message.user?.type === 'Customer' ? '👤 Покупатель' : '🏪 Продавец';
        console.log(`   ${sender}: ${message.data?.join(' ')}`);
        
        if (message.is_image) {
          console.log(`     📷 Содержит изображение (статус модерации: ${message.moderate_image_status})`);
        }
      });

      // Отметить как прочитанное
      if (history.messages && history.messages.length > 0) {
        await client.chat.markAsRead({
          chat_id: chatInfo.chat!.chat_id,
          from_message_id: history.messages[0].message_id
        });
      }
    }
  }

} catch (error) {
  console.error('❌ Ошибка работы с чатами:', error);
}
```

---

## 🎯 Основные методы

### `startChat()` - Создание чата
```typescript
interface ChatStartRequest {
  /** Номер отправления */
  posting_number: string;
}

interface ChatStartResponse {
  result?: {
    /** ID созданного чата */
    chat_id: string;
  };
}
```

### `sendMessage()` - Отправка сообщения
```typescript
interface ChatSendMessageRequest {
  /** ID чата */
  chat_id: string;
  /** Текст сообщения (1-1000 символов) */
  text: string;
}

interface ChatSendMessageResponse {
  /** Результат операции */
  result: 'ok' | 'error';
}
```

### `sendFile()` - Отправка файла
```typescript
interface ChatSendFileRequest {
  /** ID чата */
  chat_id: string;
  /** Файл в base64 */
  base64_content?: string;
  /** Название файла с расширением */
  name?: string;
}
```

### `getChatListV3()` - Список чатов
```typescript
interface ChatListV3Request {
  /** Количество чатов (до 1000) */
  limit?: number;
  /** Курсор для пагинации */
  cursor?: string;
  /** Фильтры */
  filter?: {
    /** Статус чата */
    chat_status?: 'All' | 'Opened' | 'Closed';
    /** Только непрочитанные */
    unread_only?: boolean;
  };
}

interface ChatInfo {
  chat?: {
    chat_id: string;
    type: 'Buyer_Seller' | 'Seller_Support';
    status: 'Opened' | 'Closed';
  };
  /** Количество непрочитанных сообщений */
  unread_count?: number;
  /** Последнее сообщение */
  last_message?: ChatMessageV3;
}
```

### `getChatHistoryV3()` - История чата
```typescript
interface ChatHistoryV3Request {
  /** ID чата */
  chat_id: string;
  /** Направление сортировки */
  direction?: 'Forward' | 'Backward';
  /** ID сообщения для начала */
  from_message_id?: number;
  /** Лимит сообщений (до 1000) */
  limit?: number;
}

interface ChatMessageV3 {
  /** ID сообщения */
  message_id?: number;
  /** Дата создания */
  created_at?: string;
  /** Содержимое сообщения в Markdown */
  data?: string[];
  /** Содержит изображение */
  is_image?: boolean;
  /** Прочитано */
  is_read?: boolean;
  /** Статус модерации изображения */
  moderate_image_status?: 'PENDING' | 'APPROVED' | 'REJECTED';
  /** Пользователь */
  user?: {
    id?: string;
    name?: string;
    type?: string; // 'Customer' | 'Seller'
  };
}
```

---

## 💡 Практические примеры

### Система автоответов
```typescript
const autoReplySystem = async () => {
  try {
    // Получить чаты с непрочитанными сообщениями
    const unreadChats = await client.chat.getChatListV3({
      limit: 100,
      filter: {
        chat_status: 'Opened',
        unread_only: true
      }
    });

    console.log(`🔔 Чатов с непрочитанными сообщениями: ${unreadChats.chats?.length || 0}`);

    for (const chatInfo of unreadChats.chats || []) {
      if (!chatInfo.chat?.chat_id) continue;

      // Получить последние сообщения
      const history = await client.chat.getChatHistoryV3({
        chat_id: chatInfo.chat.chat_id,
        limit: 5,
        direction: 'Backward'
      });

      const lastCustomerMessage = history.messages?.find(
        msg => msg.user?.type === 'Customer' && !msg.is_read
      );

      if (lastCustomerMessage?.data) {
        const messageText = lastCustomerMessage.data.join(' ').toLowerCase();
        let autoReply = '';

        // Определить тип вопроса и подготовить ответ
        if (messageText.includes('трек') || messageText.includes('отслед')) {
          autoReply = 'Для отслеживания заказа используйте трек-номер, который был отправлен вам в SMS после отгрузки.';
        } else if (messageText.includes('возврат') || messageText.includes('верну')) {
          autoReply = 'Информация о возврате товара доступна в разделе "Мои заказы" в приложении OZON. Срок возврата - 14 дней с момента получения.';
        } else if (messageText.includes('размер') || messageText.includes('разме')) {
          autoReply = 'Таблица размеров представлена в описании товара. Если у вас остались вопросы по размерной сетке, уточните ваши параметры.';
        } else if (messageText.includes('доставк') || messageText.includes('когда')) {
          autoReply = 'Сроки доставки зависят от вашего региона. Точная дата доставки указана в заказе. При задержках мы обязательно уведомим вас.';
        } else if (messageText.includes('качеств') || messageText.includes('брак')) {
          autoReply = 'Мы очень серьезно относимся к качеству товаров. Пожалуйста, опишите проблему подробнее, и мы оперативно решим вопрос.';
        } else {
          // Универсальный ответ
          autoReply = 'Благодарим за обращение! Мы получили ваше сообщение и ответим в ближайшее время. Рабочие часы: пн-пт 9:00-18:00.';
        }

        // Отправить автоответ
        await client.chat.sendMessage({
          chat_id: chatInfo.chat.chat_id,
          text: autoReply
        });

        // Отметить как прочитанное
        if (lastCustomerMessage.message_id) {
          await client.chat.markAsRead({
            chat_id: chatInfo.chat.chat_id,
            from_message_id: lastCustomerMessage.message_id
          });
        }

        console.log(`✅ Автоответ отправлен в чат ${chatInfo.chat.chat_id}`);

        // Пауза между обработкой чатов
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

  } catch (error) {
    console.error('❌ Ошибка системы автоответов:', error);
  }
};
```

### Мониторинг и статистика чатов
```typescript
const monitorChatActivity = async () => {
  try {
    // Получить все чаты
    const allChats = await client.chat.getChatListV3({
      limit: 1000,
      filter: { chat_status: 'All' }
    });

    const stats = {
      total: allChats.chats?.length || 0,
      opened: 0,
      closed: 0,
      totalUnread: 0,
      chatsByType: {} as Record<string, number>,
      urgentChats: [] as any[]
    };

    console.log('📊 Анализ активности чатов...');

    for (const chatInfo of allChats.chats || []) {
      // Статистика по статусам
      if (chatInfo.chat?.status === 'Opened') {
        stats.opened++;
      } else if (chatInfo.chat?.status === 'Closed') {
        stats.closed++;
      }

      // Статистика по типам
      const chatType = chatInfo.chat?.type || 'Unknown';
      stats.chatsByType[chatType] = (stats.chatsByType[chatType] || 0) + 1;

      // Подсчет непрочитанных
      if (chatInfo.unread_count) {
        stats.totalUnread += chatInfo.unread_count;

        // Срочные чаты (много непрочитанных сообщений)
        if (chatInfo.unread_count >= 5) {
          stats.urgentChats.push({
            chatId: chatInfo.chat?.chat_id,
            unreadCount: chatInfo.unread_count,
            lastMessage: chatInfo.last_message?.created_at
          });
        }
      }
    }

    // Отчет
    console.log('\n📈 Статистика чатов:');
    console.log(`   Всего чатов: ${stats.total}`);
    console.log(`   Активных: ${stats.opened}`);
    console.log(`   Закрытых: ${stats.closed}`);
    console.log(`   Всего непрочитанных: ${stats.totalUnread}`);

    console.log('\n💬 Типы чатов:');
    Object.entries(stats.chatsByType).forEach(([type, count]) => {
      console.log(`   ${type}: ${count}`);
    });

    if (stats.urgentChats.length > 0) {
      console.log(`\n🚨 Срочные чаты (>= 5 непрочитанных): ${stats.urgentChats.length}`);
      stats.urgentChats.slice(0, 10).forEach((chat, index) => {
        console.log(`${index + 1}. Чат ${chat.chatId}: ${chat.unreadCount} сообщений`);
      });
    }

    return stats;

  } catch (error) {
    console.error('❌ Ошибка мониторинга чатов:', error);
  }
};
```

### Экспорт истории чатов
```typescript
const exportChatHistory = async (chatId: string, outputFile?: string) => {
  try {
    console.log(`📥 Экспорт истории чата ${chatId}...`);

    const allMessages: any[] = [];
    let fromMessageId: number | undefined;
    let hasMore = true;

    // Получить всю историю с пагинацией
    while (hasMore) {
      const history = await client.chat.getChatHistoryV3({
        chat_id: chatId,
        direction: 'Forward', // от старых к новым для экспорта
        from_message_id: fromMessageId,
        limit: 1000
      });

      if (history.messages && history.messages.length > 0) {
        allMessages.push(...history.messages);
        fromMessageId = history.messages[history.messages.length - 1].message_id;
        
        // Проверить, есть ли еще сообщения
        hasMore = history.messages.length === 1000;
      } else {
        hasMore = false;
      }

      console.log(`   Загружено сообщений: ${allMessages.length}`);
    }

    // Форматирование для экспорта
    const formattedHistory = allMessages.map(message => ({
      messageId: message.message_id,
      timestamp: message.created_at,
      sender: message.user?.name || message.user?.type || 'Unknown',
      senderType: message.user?.type,
      text: message.data?.join(' ') || '',
      hasImage: message.is_image || false,
      imageStatus: message.moderate_image_status,
      isRead: message.is_read
    }));

    // Статистика экспорта
    const exportStats = {
      totalMessages: formattedHistory.length,
      customerMessages: formattedHistory.filter(m => m.senderType === 'Customer').length,
      sellerMessages: formattedHistory.filter(m => m.senderType === 'Seller').length,
      imagesCount: formattedHistory.filter(m => m.hasImage).length,
      dateRange: {
        first: formattedHistory[0]?.timestamp,
        last: formattedHistory[formattedHistory.length - 1]?.timestamp
      }
    };

    console.log('\n📊 Статистика экспорта:');
    console.log(`   Всего сообщений: ${exportStats.totalMessages}`);
    console.log(`   От покупателя: ${exportStats.customerMessages}`);
    console.log(`   От продавца: ${exportStats.sellerMessages}`);
    console.log(`   С изображениями: ${exportStats.imagesCount}`);
    console.log(`   Период: ${exportStats.dateRange.first} - ${exportStats.dateRange.last}`);

    // Сохранить в файл, если указан путь
    if (outputFile) {
      const fs = require('fs').promises;
      await fs.writeFile(
        outputFile,
        JSON.stringify({
          chatId,
          exportDate: new Date().toISOString(),
          stats: exportStats,
          messages: formattedHistory
        }, null, 2)
      );
      console.log(`💾 История сохранена в файл: ${outputFile}`);
    }

    return {
      chatId,
      stats: exportStats,
      messages: formattedHistory
    };

  } catch (error) {
    console.error(`❌ Ошибка экспорта чата ${chatId}:`, error);
  }
};

// Использование
const chatExport = await exportChatHistory('chat-123', './chat-history.json');
```

### Отправка файлов с инструкциями
```typescript
const sendProductInstructions = async (chatId: string, productType: string) => {
  try {
    // Подготовить файлы инструкций в зависимости от типа товара
    const instructions = {
      'electronics': {
        fileName: 'electronics_manual.pdf',
        message: 'Прикрепляю инструкцию по использованию электронного устройства.'
      },
      'clothing': {
        fileName: 'care_instructions.pdf', 
        message: 'Отправляю рекомендации по уходу за изделием.'
      },
      'cosmetics': {
        fileName: 'usage_guide.pdf',
        message: 'Прикрепляю руководство по применению косметического средства.'
      },
      'default': {
        fileName: 'product_info.pdf',
        message: 'Прикрепляю дополнительную информацию о товаре.'
      }
    };

    const instruction = instructions[productType as keyof typeof instructions] || instructions.default;

    // В реальном приложении здесь был бы реальный файл
    const mockFileContent = btoa(`Инструкция для товара типа: ${productType}\n\nДата создания: ${new Date().toISOString()}`);

    // Отправить сообщение
    await client.chat.sendMessage({
      chat_id: chatId,
      text: instruction.message
    });

    // Отправить файл
    const fileResult = await client.chat.sendFile({
      chat_id: chatId,
      base64_content: mockFileContent,
      name: instruction.fileName
    });

    if (fileResult.result === 'ok') {
      console.log(`📎 Файл ${instruction.fileName} отправлен в чат ${chatId}`);
    }

    return { success: true, fileName: instruction.fileName };

  } catch (error) {
    console.error(`❌ Ошибка отправки инструкций в чат ${chatId}:`, error);
    return { success: false, error: error.message };
  }
};
```

---

## ⚠️ Ограничения и особенности

### Доступность
- 🔐 **Premium Plus**: все методы требуют подписку Premium Plus
- ❌ **Без подписки**: API недоступен

### Временные ограничения по типам доставки

#### **FBO (Fulfillment by Ozon)**
- **Создание чата**: только покупатель может начать чат
- **Ответ продавца**: в течение 48 часов с момента последнего сообщения покупателя

#### **FBS/rFBS (Fulfillment by Seller)**
- **Создание чата**: продавец может создать чат в течение 72 часов после оплаты или доставки
- **Активная фаза**: можно писать покупателю после оплаты и до 72 часов после доставки
- **Пассивная фаза**: только ответы на сообщения покупателя в течение 48 часов

### Лимиты контента
- **Длина сообщения**: 1-1000 символов plain text
- **Файлы**: поддерживаются в base64, ограничения по размеру
- **Изображения**: проходят модерацию (PENDING → APPROVED/REJECTED)

### Устаревшие методы
- ⚠️ **getChatHistoryV2**: отключается 13 июля 2025 года
- ⚠️ **getChatListV2**: устарел, используйте v3
- ✅ Переходите на v3 методы для новых интеграций

### Пагинация
- **Список чатов**: до 1000 чатов, курсор для следующей страницы
- **История чата**: до 1000 сообщений за запрос
- **Направления**: Forward (старые → новые), Backward (новые → старые)

### Статусы и типы
- **Статусы чатов**: All, Opened, Closed
- **Типы чатов**: Buyer_Seller (с покупателем), Seller_Support (с поддержкой)
- **Статусы модерации**: PENDING, APPROVED, REJECTED

### Рекомендации по использованию
- 🤖 **Автоматизация**: настройте систему автоответов для частых вопросов
- ⏰ **Время ответа**: отвечайте быстро для улучшения рейтинга
- 📊 **Мониторинг**: регулярно проверяйте непрочитанные сообщения
- 📁 **Файлы**: используйте для отправки инструкций и документов
- 📈 **Аналитика**: ведите статистику для улучшения сервиса

---

**💡 Совет**: Chat API - мощный инструмент для повышения лояльности покупателей. Быстрые и полезные ответы улучшают рейтинг продавца и увеличивают повторные покупки. Автоматизируйте частые вопросы, но оставляйте возможность для персонального общения в сложных ситуациях.