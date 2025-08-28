#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';

interface MethodInfo {
  name: string;
  description: string;
  inputType: string;
  outputType: string;
  example: string;
  httpMethod: string;
  endpoint: string;
}

interface CategoryInfo {
  name: string;
  description: string;
  methods: MethodInfo[];
  folderName: string;
}

class CategoryDocGenerator {
  private sourceDir = path.join(process.cwd(), 'src', 'categories');
  private outputDir = path.join(process.cwd(), 'daytona-ozon-api-docs');
  private categories: CategoryInfo[] = [];

  async generate(): Promise<void> {
    // eslint-disable-next-line no-console
    console.log('🚀 Генерация документации по категориям API...');
    
    // Создаем выходную директорию
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }

    // Получаем список категорий
    const categoryFolders = fs.readdirSync(this.sourceDir)
      .filter(item => fs.statSync(path.join(this.sourceDir, item)).isDirectory())
      .sort();

    // eslint-disable-next-line no-console
    console.log(`📁 Найдено ${categoryFolders.length} категорий API`);

    // Обрабатываем каждую категорию
    for (const folder of categoryFolders) {
      // eslint-disable-next-line no-console
      console.log(`📄 Обработка категории: ${folder}`);
      const categoryInfo = await this.processCategoryFolder(folder);
      if (categoryInfo) {
        this.categories.push(categoryInfo);
        await this.generateCategoryPage(categoryInfo);
      }
    }

    // Создаем индексную страницу
    await this.generateIndexPage();

    // eslint-disable-next-line no-console
    console.log(`✅ Документация создана! Файлов: ${this.categories.length + 1}`);
  }

  private async processCategoryFolder(folderName: string): Promise<CategoryInfo | null> {
    const indexPath = path.join(this.sourceDir, folderName, 'index.ts');
    
    if (!fs.existsSync(indexPath)) {
      // eslint-disable-next-line no-console
      console.warn(`⚠️ Файл index.ts не найден в ${folderName}`);
      return null;
    }

    const fileContent = fs.readFileSync(indexPath, 'utf-8');
    
    // Извлекаем название и описание категории из JSDoc
    const categoryMatch = fileContent.match(/\/\*\*([\s\S]*?)\*\/\s*export class (\w+)/);
    let categoryName = this.formatCategoryName(folderName);
    let description = `API методы для работы с ${categoryName.toLowerCase()}`;

    if (categoryMatch) {
      const jsdocContent = categoryMatch[1];
      const nameMatch = jsdocContent.match(/\* (.+) API/);
      if (nameMatch) categoryName = nameMatch[1];
      
      const descMatch = jsdocContent.match(/\* (.+)\n/);
      if (descMatch && !descMatch[1].includes('API')) {
        description = descMatch[1];
      }
    }

    // Извлекаем методы
    const methods = this.extractMethods(fileContent);

    return {
      name: categoryName,
      description,
      methods,
      folderName
    };
  }

  private extractMethods(fileContent: string): MethodInfo[] {
    const methods: MethodInfo[] = [];
    
    // Регулярное выражение для поиска методов с JSDoc
    const methodRegex = /\/\*\*([\s\S]*?)\*\/\s*async\s+(\w+)\s*\(([\s\S]*?)\)\s*:\s*Promise<([\w<>]+)>/g;
    
    let match;
    // eslint-disable-next-line no-cond-assign
    while ((match = methodRegex.exec(fileContent)) !== null) {
      const [, jsdocContent, methodName, params, returnType] = match;
      
      // Извлекаем информацию из JSDoc
      let description = 'API метод';
      let example = '';
      let httpMethod = 'POST';
      let endpoint = '';

      const descMatch = jsdocContent.match(/\* (.+?)(?:\n|\*\/)/);
      if (descMatch) description = descMatch[1];

      const exampleMatch = jsdocContent.match(/@example\s+([\s\S]*?)(?=@\w+|\*\/)/);
      if (exampleMatch) example = exampleMatch[1].trim();

      // Определяем HTTP метод из кода (упрощенная версия)
      const httpRegex = /this\.httpClient\.request\s*<[^>]*>\s*\(\s*['"](\w+)['"]/;
      const httpMatchResult = fileContent.match(httpRegex);
      if (httpMatchResult) {
        httpMethod = httpMatchResult[1];
      }

      // Извлекаем endpoint из кода
      const endpointRegex = /this\.httpClient\.request\s*<[^>]*>\s*\(\s*['"](\w+)['"],\s*['"]([^'"]+)['"]/;
      const endpointMatch = fileContent.match(endpointRegex);
      if (endpointMatch) {
        endpoint = endpointMatch[2];
      }

      // Извлекаем тип входных параметров
      let inputType = 'void';
      const paramMatch = params.match(/(\w+):\s*([\w<>[\]]+)/);
      if (paramMatch) inputType = paramMatch[2];

      methods.push({
        name: methodName,
        description,
        inputType,
        outputType: returnType,
        example,
        httpMethod,
        endpoint
      });
    }

    return methods;
  }

  private formatCategoryName(folderName: string): string {
    const nameMap: Record<string, string> = {
      'analytics': 'Аналитика',
      'barcode': 'Штрихкоды',
      'beta-method': 'Бета-методы',
      'brand': 'Бренды',
      'cancellation': 'Отмены',
      'category': 'Категории',
      'certification': 'Сертификация',
      'chat': 'Чат',
      'delivery-fbs': 'Доставка FBS',
      'delivery-rfbs': 'Доставка rFBS',
      'digital': 'Цифровые товары',
      'fbo-supply-request': 'Поставки FBO',
      'fbo': 'FBO',
      'fbs-rfbs-marks': 'Маркировка FBS/rFBS',
      'fbs': 'FBS',
      'finance': 'Финансы',
      'pass': 'Пропуска',
      'polygon': 'Полигоны',
      'premium': 'Премиум',
      'prices-stocks': 'Цены и остатки',
      'pricing-strategy': 'Стратегии цен',
      'product': 'Товары',
      'promos': 'Акции',
      'quants': 'Квант',
      'questions-answers': 'Вопросы и ответы',
      'report': 'Отчеты',
      'return': 'Возврат',
      'returns': 'Возвраты',
      'review': 'Отзывы',
      'rfbs-returns': 'Возвраты rFBS',
      'seller-rating': 'Рейтинг продавца',
      'supplier': 'Поставщик',
      'warehouse': 'Склад'
    };

    return nameMap[folderName] || folderName;
  }

  private async generateCategoryPage(category: CategoryInfo): Promise<void> {
    const fileName = `category-${category.folderName}.html`;
    const filePath = path.join(this.outputDir, fileName);

    const html = `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${category.name} API - OZON Seller API SDK</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f8f9fa;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px 20px;
            border-radius: 10px;
            margin-bottom: 30px;
            text-align: center;
        }
        
        .breadcrumb {
            margin-bottom: 20px;
            font-size: 14px;
            color: #666;
        }
        
        .breadcrumb a {
            color: #007bff;
            text-decoration: none;
        }
        
        .method {
            background: white;
            border-radius: 10px;
            padding: 25px;
            margin-bottom: 20px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .method-header {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
        }
        
        .method-name {
            font-size: 1.4em;
            font-weight: 600;
            color: #007bff;
        }
        
        .http-method {
            background: #28a745;
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.8em;
            margin-left: 15px;
        }
        
        .endpoint {
            font-family: monospace;
            background: #f1f3f4;
            padding: 8px 12px;
            border-radius: 5px;
            margin: 10px 0;
            font-size: 0.9em;
        }
        
        .type-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin: 15px 0;
        }
        
        .type-box {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #007bff;
        }
        
        .type-title {
            font-weight: 600;
            color: #555;
            margin-bottom: 8px;
        }
        
        .type-name {
            font-family: monospace;
            background: #e9ecef;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.9em;
        }
        
        .example {
            background: #2d3748;
            color: #e2e8f0;
            padding: 20px;
            border-radius: 8px;
            margin-top: 15px;
            overflow-x: auto;
            font-family: 'Monaco', 'Menlo', monospace;
            font-size: 0.9em;
            line-height: 1.4;
        }
        
        .back-link {
            display: inline-block;
            background: #007bff;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 25px;
            margin-top: 30px;
            transition: background 0.3s;
        }
        
        .back-link:hover {
            background: #0056b3;
        }
        
        @media (max-width: 768px) {
            .type-info {
                grid-template-columns: 1fr;
            }
            
            .method-header {
                flex-direction: column;
                align-items: flex-start;
            }
            
            .http-method {
                margin-left: 0;
                margin-top: 10px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="breadcrumb">
            <a href="./api-categories-index.html">← Все категории API</a>
        </div>
        
        <div class="header">
            <h1>${category.name} API</h1>
            <p>${category.description}</p>
            <p><strong>${category.methods.length}</strong> методов в категории</p>
        </div>
        
        ${category.methods.map(method => `
        <div class="method">
            <div class="method-header">
                <div class="method-name">${method.name}</div>
                <div class="http-method">${method.httpMethod}</div>
            </div>
            
            <p>${method.description}</p>
            
            ${method.endpoint ? `<div class="endpoint">${method.endpoint}</div>` : ''}
            
            <div class="type-info">
                <div class="type-box">
                    <div class="type-title">📥 Входные данные</div>
                    <div class="type-name">${method.inputType}</div>
                </div>
                <div class="type-box">
                    <div class="type-title">📤 Ответ</div>
                    <div class="type-name">${method.outputType}</div>
                </div>
            </div>
            
            ${method.example ? `
            <div class="example">${this.escapeHtml(method.example)}</div>
            ` : ''}
        </div>
        `).join('')}
        
        <a href="./api-categories-index.html" class="back-link">← Вернуться к списку категорий</a>
    </div>
</body>
</html>`;

    fs.writeFileSync(filePath, html, 'utf-8');
  }

  private async generateIndexPage(): Promise<void> {
    const fileName = 'api-categories-index.html';
    const filePath = path.join(this.outputDir, fileName);

    const totalMethods = this.categories.reduce((sum, cat) => sum + cat.methods.length, 0);

    const html = `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API Категории - OZON Seller API SDK</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f8f9fa;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 50px 20px;
            border-radius: 15px;
            margin-bottom: 40px;
            text-align: center;
        }
        
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 30px 0;
        }
        
        .stat {
            background: rgba(255,255,255,0.1);
            padding: 20px;
            border-radius: 10px;
            text-align: center;
        }
        
        .stat-number {
            font-size: 2.5em;
            font-weight: 700;
            display: block;
            margin-bottom: 5px;
        }
        
        .categories-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 20px;
            margin-top: 30px;
        }
        
        .category-card {
            background: white;
            border-radius: 10px;
            padding: 25px;
            text-decoration: none;
            color: inherit;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
            border-left: 5px solid #007bff;
        }
        
        .category-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 20px rgba(0,0,0,0.15);
        }
        
        .category-name {
            font-size: 1.3em;
            font-weight: 600;
            color: #007bff;
            margin-bottom: 10px;
        }
        
        .category-methods {
            color: #666;
            font-size: 0.9em;
            margin-top: 10px;
        }
        
        .back-link {
            display: inline-block;
            background: #007bff;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 25px;
            margin-bottom: 30px;
            transition: background 0.3s;
        }
        
        .back-link:hover {
            background: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <a href="../index.html" class="back-link">← Главная страница</a>
        
        <div class="header">
            <h1>📚 API Категории</h1>
            <p>Полный справочник всех методов OZON Seller API, сгруппированных по категориям</p>
            
            <div class="stats">
                <div class="stat">
                    <span class="stat-number">${this.categories.length}</span>
                    <span>Категорий API</span>
                </div>
                <div class="stat">
                    <span class="stat-number">${totalMethods}</span>
                    <span>Всего методов</span>
                </div>
            </div>
        </div>
        
        <div class="categories-grid">
            ${this.categories.map(category => `
            <a href="./category-${category.folderName}.html" class="category-card">
                <div class="category-name">${category.name}</div>
                <p>${category.description}</p>
                <div class="category-methods">${category.methods.length} методов</div>
            </a>
            `).join('')}
        </div>
    </div>
</body>
</html>`;

    fs.writeFileSync(filePath, html, 'utf-8');
  }

  private escapeHtml(text: string): string {
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  }
}

// Запускаем генератор
const generator = new CategoryDocGenerator();
// eslint-disable-next-line no-console
generator.generate().catch(console.error);