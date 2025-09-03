# Supplier Reporting & Notifications

Система автоматической отчетности и уведомлений для мониторинга обработки таможенных счёт-фактур турецких продавцов.

**📊 ИНТЕЛЛЕКТУАЛЬНАЯ ОТЧЕТНОСТЬ** — Автоматическое создание отчетов, дашбордов и уведомлений для полного контроля процессов.

---

## 📊 Система отчетности

### ReportingSystem Class

```typescript
/**
 * Система автоматической генерации отчетов
 * Automatic report generation system
 */
export class SupplierReportingSystem {
  private readonly templates: Map<string, ReportTemplate> = new Map();
  private readonly generators: Map<string, ReportGenerator> = new Map();
  private readonly storage: ReportStorage;

  constructor(config: ReportingConfig) {
    this.storage = new ReportStorage(config.storage);
    this.initializeTemplates();
    this.initializeGenerators();
  }

  /**
   * Генерация полного отчета по экспортному пакету
   * Generate complete export batch report
   */
  async generateExportBatchReport(
    data: ExportReportData
  ): Promise<GeneratedReport> {
    console.log(`📊 Генерация отчета по экспорту: ${data.executionId}`);
    
    const reportId = this.generateReportId('export_batch');
    const startTime = Date.now();

    try {
      // Подготовка данных для отчета
      const reportData = await this.prepareReportData(data);
      
      // Генерация разделов отчета
      const sections = await this.generateReportSections(reportData);
      
      // Создание итогового отчета
      const report: GeneratedReport = {
        id: reportId,
        type: 'export_batch',
        title: `Отчет по обработке турецкого экспорта`,
        subtitle: `Пакет ${data.exportBatch.batchId} от ${new Date().toLocaleDateString('ru-RU')}`,
        generatedAt: new Date().toISOString(),
        generationTime: 0,
        sections,
        summary: this.generateSummarySection(reportData),
        attachments: await this.generateAttachments(reportData),
        metadata: {
          executionId: data.executionId,
          batchId: data.exportBatch.batchId,
          totalFiles: data.exportBatch.invoiceFiles.length,
          successRate: reportData.successRate
        }
      };

      report.generationTime = Date.now() - startTime;
      
      // Сохранение отчета
      await this.storage.saveReport(report);
      
      console.log(`✅ Отчет сгенерирован за ${Math.round(report.generationTime / 1000)}с`);
      console.log(`   📄 Разделов: ${sections.length}`);
      console.log(`   📎 Вложений: ${report.attachments?.length || 0}`);
      
      return report;
      
    } catch (error) {
      console.error(`❌ Ошибка генерации отчета:`, error);
      throw new Error(`Не удалось сгенерировать отчет: ${error}`);
    }
  }

  /**
   * Создание дашборда в реальном времени
   * Create real-time dashboard
   */
  async generateLiveDashboard(
    timeframe: DashboardTimeframe = '24h'
  ): Promise<LiveDashboard> {
    console.log(`📈 Генерация live дашборда (${timeframe})`);
    
    // Получение данных за указанный период
    const data = await this.collectDashboardData(timeframe);
    
    const dashboard: LiveDashboard = {
      id: this.generateDashboardId(),
      timeframe,
      lastUpdated: new Date().toISOString(),
      metrics: {
        totalInvoices: data.totalInvoices,
        successfulProcessing: data.successfulProcessing,
        failedProcessing: data.failedProcessing,
        averageProcessingTime: data.averageProcessingTime,
        totalAmount: data.totalAmount,
        topCurrencies: data.topCurrencies,
        topHsCodes: data.topHsCodes
      },
      charts: [
        await this.generateProcessingChart(data),
        await this.generateAmountChart(data),
        await this.generateErrorChart(data),
        await this.generateCurrencyChart(data)
      ],
      alerts: await this.generateDashboardAlerts(data),
      recommendations: await this.generateDashboardRecommendations(data)
    };

    console.log(`📊 Дашборд готов:`);
    console.log(`   📈 Метрик: ${Object.keys(dashboard.metrics).length}`);
    console.log(`   📊 Графиков: ${dashboard.charts.length}`);
    console.log(`   ⚠️ Алертов: ${dashboard.alerts.length}`);

    return dashboard;
  }

  /**
   * Генерация отчета по валютам
   * Generate currency analysis report
   */
  async generateCurrencyReport(
    period: ReportPeriod
  ): Promise<CurrencyAnalysisReport> {
    console.log(`💰 Анализ валют за период: ${period.from} - ${period.to}`);
    
    const currencyData = await this.collectCurrencyData(period);
    
    return {
      id: this.generateReportId('currency_analysis'),
      period,
      generatedAt: new Date().toISOString(),
      totalTransactions: currencyData.totalTransactions,
      totalAmount: currencyData.totalAmount,
      currencies: currencyData.currencies.map(curr => ({
        code: curr.code,
        name: curr.name,
        symbol: curr.symbol,
        transactionCount: curr.transactionCount,
        totalAmount: curr.totalAmount,
        averageAmount: curr.totalAmount / curr.transactionCount,
        percentage: (curr.transactionCount / currencyData.totalTransactions) * 100,
        trend: this.calculateCurrencyTrend(curr, period)
      })),
      insights: [
        `Основная валюта: ${currencyData.topCurrency.code} (${currencyData.topCurrency.percentage.toFixed(1)}%)`,
        `Средний размер счёт-фактуры: ${currencyData.averageInvoiceAmount.toFixed(2)} USD`,
        `Всего валют использовано: ${currencyData.currencies.length}`,
        `Динамика: ${currencyData.overallTrend}`
      ]
    };
  }

  /**
   * Генерация разделов отчета
   * Generate report sections
   */
  private async generateReportSections(
    data: ProcessedReportData
  ): Promise<ReportSection[]> {
    const sections: ReportSection[] = [];

    // Раздел "Обзор пакета"
    sections.push({
      title: 'Обзор пакета',
      type: 'overview',
      content: {
        batchInfo: {
          id: data.batchId,
          totalFiles: data.totalFiles,
          processedFiles: data.processedFiles,
          successRate: `${data.successRate.toFixed(1)}%`,
          totalAmount: `${data.totalAmount} ${data.currency}`,
          processingTime: `${Math.round(data.processingTime / 1000)}с`
        },
        statistics: [
          { label: 'Успешно обработано', value: data.successCount, color: 'green' },
          { label: 'Ошибок обработки', value: data.errorCount, color: 'red' },
          { label: 'Среднее время', value: `${Math.round(data.avgTime)}мс`, color: 'blue' }
        ]
      }
    });

    // Раздел "Детализация по файлам"
    sections.push({
      title: 'Детализация по файлам',
      type: 'detailed_results',
      content: {
        successfulFiles: data.results.filter(r => r.success).map(r => ({
          filename: r.filename,
          postingNumber: r.postingNumber,
          processingTime: `${r.processingTime}мс`,
          fileUrl: r.fileUrl
        })),
        failedFiles: data.results.filter(r => !r.success).map(r => ({
          filename: r.filename,
          postingNumber: r.postingNumber,
          error: r.error,
          isRetriable: this.isRetriableError(r.error || '')
        }))
      }
    });

    // Раздел "Анализ HS-кодов"
    sections.push({
      title: 'Анализ товарных позиций',
      type: 'hs_code_analysis',
      content: await this.analyzeHsCodesInBatch(data)
    });

    return sections;
  }

  /**
   * Инициализация шаблонов отчетов
   * Initialize report templates
   */
  private initializeTemplates(): void {
    // Шаблон отчета по экспорту
    this.templates.set('export_batch', {
      name: 'Отчет по экспортному пакету',
      sections: ['overview', 'detailed_results', 'hs_code_analysis', 'recommendations'],
      format: 'html',
      styling: 'corporate',
      includeCharts: true
    });

    // Шаблон валютного отчета
    this.templates.set('currency_analysis', {
      name: 'Анализ валют',
      sections: ['currency_breakdown', 'trends', 'recommendations'],
      format: 'html',
      styling: 'financial',
      includeCharts: true
    });

    // Шаблон дашборда
    this.templates.set('live_dashboard', {
      name: 'Live дашборд',
      sections: ['metrics', 'charts', 'alerts'],
      format: 'interactive',
      styling: 'dashboard',
      includeCharts: true,
      autoRefresh: true
    });
  }
}

/**
 * Типы для системы отчетности
 */
interface GeneratedReport {
  id: string;
  type: string;
  title: string;
  subtitle: string;
  generatedAt: string;
  generationTime: number;
  sections: ReportSection[];
  summary: ReportSummary;
  attachments?: ReportAttachment[];
  metadata: ReportMetadata;
}

interface LiveDashboard {
  id: string;
  timeframe: DashboardTimeframe;
  lastUpdated: string;
  metrics: DashboardMetrics;
  charts: DashboardChart[];
  alerts: DashboardAlert[];
  recommendations: DashboardRecommendation[];
}

interface ReportSection {
  title: string;
  type: string;
  content: any;
}

interface DashboardMetrics {
  totalInvoices: number;
  successfulProcessing: number;
  failedProcessing: number;
  averageProcessingTime: number;
  totalAmount: number;
  topCurrencies: CurrencyMetric[];
  topHsCodes: HsCodeMetric[];
}

type DashboardTimeframe = '1h' | '6h' | '24h' | '7d' | '30d';
```

---

## 📢 Система уведомлений

### NotificationManager Class

```typescript
/**
 * Менеджер уведомлений и алертов
 * Notifications and alerts manager
 */
export class SupplierNotificationManager {
  private readonly channels: Map<string, NotificationChannel> = new Map();
  private readonly subscribers: NotificationSubscriber[] = [];
  private readonly alertRules: AlertRule[] = [];

  constructor(config: NotificationConfig) {
    this.initializeChannels(config.channels);
    this.initializeSubscribers(config.subscribers);
    this.initializeAlertRules(config.alertRules);
  }

  /**
   * Отправка уведомления о завершении пакетной обработки
   * Send batch processing completion notification
   */
  async notifyBatchCompletion(
    executionId: string,
    result: BatchProcessingResult
  ): Promise<void> {
    console.log(`📢 Отправка уведомлений о завершении пакета: ${executionId}`);
    
    const notification: BatchCompletionNotification = {
      type: 'batch_completion',
      executionId,
      timestamp: new Date().toISOString(),
      severity: result.errorCount > 0 ? 'warning' : 'success',
      title: `Пакетная обработка завершена`,
      message: this.generateBatchCompletionMessage(result),
      data: {
        totalFiles: result.totalFiles,
        successCount: result.successCount,
        errorCount: result.errorCount,
        processingTime: result.totalProcessingTime,
        successRate: (result.successCount / result.totalFiles) * 100
      },
      actions: [
        {
          label: 'Просмотреть отчет',
          url: `/reports/${executionId}`,
          style: 'primary'
        },
        {
          label: 'Повторить ошибки',
          url: `/retry/${executionId}`,
          style: 'secondary',
          condition: result.errorCount > 0
        }
      ]
    };

    // Отправка через все активные каналы
    await this.broadcastNotification(notification);
  }

  /**
   * Отправка критического алерта
   * Send critical alert
   */
  async sendCriticalAlert(
    title: string,
    message: string,
    context?: AlertContext
  ): Promise<void> {
    console.log(`🚨 КРИТИЧЕСКИЙ АЛЕРТ: ${title}`);
    
    const alert: CriticalAlert = {
      type: 'critical_alert',
      id: this.generateAlertId(),
      timestamp: new Date().toISOString(),
      severity: 'critical',
      title,
      message,
      context,
      requiresImmediateAction: true,
      escalationLevel: 1
    };

    // Немедленная отправка через приоритетные каналы
    await this.sendImmediateAlert(alert);
    
    // Эскалация, если не подтверждено в течение 5 минут
    setTimeout(async () => {
      if (!await this.isAlertAcknowledged(alert.id)) {
        await this.escalateAlert(alert);
      }
    }, 5 * 60 * 1000);
  }

  /**
   * Настройка автоматических уведомлений
   * Configure automatic notifications
   */
  async configureAutomaticNotifications(
    rules: AutoNotificationRule[]
  ): Promise<void> {
    console.log(`⚙️ Настройка автоматических уведомлений: ${rules.length} правил`);
    
    for (const rule of rules) {
      console.log(`   📋 Правило: ${rule.name}`);
      console.log(`     Триггер: ${rule.trigger.type}`);
      console.log(`     Каналы: ${rule.channels.join(', ')}`);
      console.log(`     Получатели: ${rule.recipients.length} чел.`);
      
      // Регистрация обработчика события
      this.registerEventHandler(rule.trigger, async (eventData) => {
        if (await this.evaluateCondition(rule.condition, eventData)) {
          const notification = await this.generateRuleNotification(rule, eventData);
          await this.sendNotificationToChannels(notification, rule.channels, rule.recipients);
        }
      });
    }
    
    console.log(`✅ Автоматические уведомления настроены`);
  }

  /**
   * Отправка еженедельного сводного отчета
   * Send weekly summary report
   */
  async sendWeeklySummary(): Promise<void> {
    console.log(`📅 Генерация еженедельного сводного отчета`);
    
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - 7);
    
    const weeklyData = await this.collectWeeklyData(weekStart, new Date());
    
    const summary: WeeklySummaryNotification = {
      type: 'weekly_summary',
      timestamp: new Date().toISOString(),
      period: {
        from: weekStart.toISOString(),
        to: new Date().toISOString()
      },
      title: 'Еженедельный отчет по турецкому экспорту',
      message: this.generateWeeklySummaryMessage(weeklyData),
      data: weeklyData,
      attachments: [
        {
          name: 'weekly_report.pdf',
          type: 'application/pdf',
          url: weeklyData.reportUrl
        }
      ]
    };

    // Отправка подписчикам еженедельных отчетов
    const weeklySubscribers = this.subscribers.filter(s => 
      s.preferences.weeklyReports
    );
    
    await this.sendToSubscribers(summary, weeklySubscribers);
  }

  /**
   * Инициализация каналов уведомлений
   * Initialize notification channels
   */
  private initializeChannels(channelConfigs: ChannelConfig[]): void {
    channelConfigs.forEach(config => {
      let channel: NotificationChannel;
      
      switch (config.type) {
        case 'email':
          channel = new EmailNotificationChannel(config);
          break;
        case 'slack':
          channel = new SlackNotificationChannel(config);
          break;
        case 'telegram':
          channel = new TelegramNotificationChannel(config);
          break;
        case 'webhook':
          channel = new WebhookNotificationChannel(config);
          break;
        default:
          throw new Error(`Неподдерживаемый тип канала: ${config.type}`);
      }
      
      this.channels.set(config.name, channel);
      console.log(`📤 Канал инициализирован: ${config.name} (${config.type})`);
    });
  }

  /**
   * Генерация сообщения о завершении пакета
   * Generate batch completion message
   */
  private generateBatchCompletionMessage(result: BatchProcessingResult): string {
    const successRate = ((result.successCount / result.totalFiles) * 100).toFixed(1);
    const processingTime = Math.round(result.totalProcessingTime / 1000);
    
    let message = `Обработка пакета завершена:\n\n`;
    message += `📄 Всего файлов: ${result.totalFiles}\n`;
    message += `✅ Успешно: ${result.successCount}\n`;
    message += `❌ Ошибок: ${result.errorCount}\n`;
    message += `📈 Процент успеха: ${successRate}%\n`;
    message += `⏱️ Время обработки: ${processingTime}с\n\n`;
    
    if (result.errorCount > 0) {
      message += `⚠️ Внимание: Обнаружены ошибки обработки. `;
      message += `Рекомендуется просмотреть детальный отчет и повторить обработку проблемных файлов.`;
    } else {
      message += `🎉 Все файлы обработаны успешно!`;
    }
    
    return message;
  }

  /**
   * Рассылка уведомления по всем каналам
   * Broadcast notification across all channels
   */
  private async broadcastNotification(
    notification: BatchCompletionNotification
  ): Promise<void> {
    const promises = [];
    
    for (const [channelName, channel] of this.channels) {
      if (channel.isEnabled()) {
        console.log(`   📤 Отправка через ${channelName}...`);
        promises.push(
          channel.send(notification).catch(error => {
            console.error(`❌ Ошибка отправки через ${channelName}:`, error);
          })
        );
      }
    }
    
    await Promise.all(promises);
    console.log(`✅ Уведомление отправлено через ${promises.length} каналов`);
  }
}

/**
 * Типы для системы уведомлений
 */
interface BatchCompletionNotification {
  type: 'batch_completion';
  executionId: string;
  timestamp: string;
  severity: 'success' | 'warning' | 'error';
  title: string;
  message: string;
  data: {
    totalFiles: number;
    successCount: number;
    errorCount: number;
    processingTime: number;
    successRate: number;
  };
  actions: NotificationAction[];
}

interface CriticalAlert {
  type: 'critical_alert';
  id: string;
  timestamp: string;
  severity: 'critical';
  title: string;
  message: string;
  context?: AlertContext;
  requiresImmediateAction: boolean;
  escalationLevel: number;
}

interface NotificationAction {
  label: string;
  url: string;
  style: 'primary' | 'secondary' | 'danger';
  condition?: boolean;
}

interface AutoNotificationRule {
  name: string;
  description: string;
  trigger: NotificationTrigger;
  condition: NotificationCondition;
  channels: string[];
  recipients: NotificationRecipient[];
  template: string;
  enabled: boolean;
}

abstract class NotificationChannel {
  constructor(protected config: ChannelConfig) {}
  
  abstract send(notification: any): Promise<void>;
  abstract isEnabled(): boolean;
}

interface WeeklySummaryNotification {
  type: 'weekly_summary';
  timestamp: string;
  period: {
    from: string;
    to: string;
  };
  title: string;
  message: string;
  data: WeeklyData;
  attachments: NotificationAttachment[];
}
```

---

## 📱 Каналы уведомлений

### Email канал

```typescript
/**
 * Email канал уведомлений
 * Email notification channel
 */
export class EmailNotificationChannel extends NotificationChannel {
  private readonly transporter: any;
  
  constructor(config: EmailChannelConfig) {
    super(config);
    this.transporter = this.initializeTransporter(config);
  }

  async send(notification: any): Promise<void> {
    const emailData = this.formatEmailNotification(notification);
    
    try {
      await this.transporter.sendMail({
        from: this.config.from,
        to: emailData.recipients,
        subject: emailData.subject,
        html: emailData.htmlContent,
        attachments: emailData.attachments
      });
      
      console.log(`✅ Email отправлен: ${emailData.subject}`);
    } catch (error) {
      console.error(`❌ Ошибка отправки email:`, error);
      throw error;
    }
  }

  isEnabled(): boolean {
    return this.config.enabled && !!this.transporter;
  }

  private formatEmailNotification(notification: any): EmailData {
    return {
      recipients: this.getEmailRecipients(notification),
      subject: this.formatEmailSubject(notification),
      htmlContent: this.generateEmailHtml(notification),
      attachments: notification.attachments || []
    };
  }
}
```

### Slack канал

```typescript
/**
 * Slack канал уведомлений
 * Slack notification channel
 */
export class SlackNotificationChannel extends NotificationChannel {
  private readonly webhookUrl: string;
  
  constructor(config: SlackChannelConfig) {
    super(config);
    this.webhookUrl = config.webhookUrl;
  }

  async send(notification: any): Promise<void> {
    const slackMessage = this.formatSlackMessage(notification);
    
    try {
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slackMessage)
      });
      
      if (!response.ok) {
        throw new Error(`Slack API error: ${response.statusText}`);
      }
      
      console.log(`✅ Slack уведомление отправлено`);
    } catch (error) {
      console.error(`❌ Ошибка отправки в Slack:`, error);
      throw error;
    }
  }

  isEnabled(): boolean {
    return this.config.enabled && !!this.webhookUrl;
  }

  private formatSlackMessage(notification: any): SlackMessage {
    const color = this.getSlackColor(notification.severity);
    
    return {
      text: notification.title,
      attachments: [{
        color,
        title: notification.title,
        text: notification.message,
        fields: this.formatSlackFields(notification),
        actions: this.formatSlackActions(notification.actions),
        ts: Math.floor(Date.now() / 1000)
      }]
    };
  }
}
```

Система отчетности и уведомлений для Supplier API готова! Теперь завершу документацию:

<function_calls>
<invoke name="TodoWrite">
<parameter name="todos">[{"content": "Fix remaining 20+ Russian functions in Prices-Stocks files to English", "status": "pending", "activeForm": "MAJOR TASK: Convert 20+ Russian functions to English across 4 files - partially started"}, {"content": "Create comprehensive Supplier API documentation with all 4 methods", "status": "completed", "activeForm": "Created complete Supplier API documentation with enterprise automation"}, {"content": "Create Supplier API main overview file", "status": "completed", "activeForm": "Created main Supplier API overview with 4 methods"}, {"content": "Create Supplier invoice management chunk", "status": "completed", "activeForm": "Created detailed documentation for all 4 invoice management methods"}, {"content": "Create Supplier workflow automation chunk", "status": "completed", "activeForm": "Created comprehensive enterprise automation, reporting and notifications"}]