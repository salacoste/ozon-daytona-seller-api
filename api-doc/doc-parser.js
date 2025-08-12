#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Скрипт для разбиения OZON Seller API OpenAPI 3.0 файла на управляемые блоки
 * Использование: node ozon-api-splitter.js <путь-к-openapi.json>
 */

class OzonAPISplitter {
  constructor(inputFile) {
    this.inputFile = inputFile;
    this.outputDir = 'ozon-api-documentation';
    this.api = null;
    this.tagGroups = {};
    this.tagGroupsMapping = {};
    this.usedSchemas = new Set();
    this.statistics = {
      totalPaths: 0,
      totalMethods: 0,
      totalSchemas: 0,
      groups: [],
      tagGroups: []
    };
  }

  // Главный метод обработки
  async process() {
    console.log('🚀 Начинаем обработку OZON Seller API файла...\n');
    
    try {
      // 1. Загрузка и парсинг файла
      this.loadAPIFile();
      
      // 2. Создание структуры директорий
      this.createOutputStructure();
      
      // 3. Обработка x-tagGroups
      this.processTagGroups();
      
      // 4. Сохранение общей информации
      this.saveGeneralInfo();
      
      // 5. Сохранение документационных тегов
      this.saveDocumentationTags();
      
      // 6. Группировка endpoints по тегам
      this.groupEndpointsByTags();
      
      // 7. Сохранение групп в отдельные файлы
      this.saveGroupFiles();
      
      // 7. Сохранение общих компонентов
      this.saveCommonComponents();
      
      // 8. Создание индексного файла и README
      this.createIndexFile();
      this.createReadmeFile();
      
      // 9. Вывод статистики
      this.printStatistics();
      
    } catch (error) {
      console.error('❌ Ошибка:', error.message);
      console.error(error.stack);
      process.exit(1);
    }
  }

  // Загрузка и парсинг OpenAPI файла
  loadAPIFile() {
    console.log(`📂 Загрузка файла: ${this.inputFile}`);
    
    if (!fs.existsSync(this.inputFile)) {
      throw new Error(`Файл не найден: ${this.inputFile}`);
    }
    
    const fileContent = fs.readFileSync(this.inputFile, 'utf8');
    this.api = JSON.parse(fileContent);
    
    console.log(`✅ Файл загружен`);
    console.log(`   📋 API: ${this.api.info?.title || 'Unknown'}`);
    console.log(`   🔖 Версия: ${this.api.info?.version || 'Unknown'}`);
    console.log(`   📚 OpenAPI: ${this.api.openapi}\n`);
  }

  // Создание структуры директорий
  createOutputStructure() {
    // Основная директория
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
    
    // Поддиректории для групп
    const subdirs = [
      'general',           // Общее описание
      'documentation',     // Документационные разделы
      'methods',          // Методы API
      'beta',             // Бета-методы
      'push',             // Пуш-уведомления
      'appendix',         // Приложения
      'components'        // Компоненты и схемы
    ];
    
    subdirs.forEach(dir => {
      const dirPath = path.join(this.outputDir, dir);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
    });
    
    console.log(`📁 Создана структура директорий: ${this.outputDir}\n`);
  }

  // Обработка x-tagGroups
  processTagGroups() {
    console.log('🏷️  Обработка групп тегов (x-tagGroups)...');
    
    if (this.api['x-tagGroups']) {
      this.api['x-tagGroups'].forEach((group, index) => {
        console.log(`   ${index + 1}. ${group.name} (${group.tags.length} тегов)`);
        
        // Создаем маппинг тега к группе
        group.tags.forEach(tag => {
          this.tagGroupsMapping[tag] = {
            groupName: group.name,
            groupIndex: index,
            dataSelector: group.dataSelector || null
          };
        });
        
        this.statistics.tagGroups.push({
          name: group.name,
          tagsCount: group.tags.length,
          tags: group.tags
        });
      });
      
      console.log(`✅ Обработано ${this.api['x-tagGroups'].length} групп тегов\n`);
    } else {
      console.log('⚠️  x-tagGroups не найдены, используем стандартную группировку\n');
    }
  }

  // Определение директории для тега
  getTagDirectory(tag) {
    const groupInfo = this.tagGroupsMapping[tag];
    
    if (!groupInfo) {
      return 'methods'; // По умолчанию
    }
    
    // Маппинг групп на директории
    const dirMapping = {
      'Общее описание': 'general',
      'Методы Seller API': 'methods',
      'Бета-методы Seller API': 'beta',
      'Пуш-уведомления': 'push',
      'Приложения': 'appendix',
      'Обновления': 'general'
    };
    
    return dirMapping[groupInfo.groupName] || 'methods';
  }

  // Сохранение общей информации API
  saveGeneralInfo() {
    const generalInfo = {
      openapi: this.api.openapi,
      info: {
        ...this.api.info,
        'x-logo': this.api.info['x-logo'] || null
      },
      servers: this.api.servers || [],
      security: this.api.security || [],
      externalDocs: this.api.externalDocs || null,
      'x-tagGroups': this.api['x-tagGroups'] || [],
      tags: this.api.tags || []
    };
    
    const filePath = path.join(this.outputDir, 'general', '00-api-info.json');
    fs.writeFileSync(filePath, JSON.stringify(generalInfo, null, 2));
    console.log(`📝 Сохранена общая информация: general/00-api-info.json`);
  }

  // Сохранение информационных тегов (документация)
  saveDocumentationTags() {
    console.log('\n📚 Сохранение документационных разделов...');
    
    if (!this.api.tags || this.api.tags.length === 0) {
      console.log('  ℹ️  Информационные теги не найдены');
      return;
    }
    
    const docDir = path.join(this.outputDir, 'documentation');
    if (!fs.existsSync(docDir)) {
      fs.mkdirSync(docDir, { recursive: true });
    }
    
    // Группируем теги по категориям из x-tagGroups
    const tagsByCategory = {};
    
    this.api.tags.forEach((tag, index) => {
      const category = this.tagGroupsMapping[tag.name]?.groupName || 'Другое';
      
      if (!tagsByCategory[category]) {
        tagsByCategory[category] = [];
      }
      
      tagsByCategory[category].push({
        index: index + 1,
        name: tag.name,
        displayName: tag['x-displayName'] || tag.name,
        description: tag.description || '',
        externalDocs: tag.externalDocs || null
      });
    });
    
    // Сохраняем теги по категориям
    Object.entries(tagsByCategory).forEach(([category, tags]) => {
      const safeCategoryName = category
        .replace(/[^a-z0-9а-яё]/gi, '-')
        .replace(/^-+|-+$/g, '')
        .toLowerCase();
      
      const fileName = `${safeCategoryName}.json`;
      const filePath = path.join(docDir, fileName);
      
      const categoryData = {
        category: category,
        tagsCount: tags.length,
        tags: tags
      };
      
      fs.writeFileSync(filePath, JSON.stringify(categoryData, null, 2));
      console.log(`  📄 documentation/${fileName} - ${tags.length} разделов документации`);
    });
    
    // Сохраняем также полный список тегов
    const allTagsData = {
      totalTags: this.api.tags.length,
      tags: this.api.tags.map((tag, index) => ({
        index: index + 1,
        name: tag.name,
        displayName: tag['x-displayName'] || tag.name,
        category: this.tagGroupsMapping[tag.name]?.groupName || 'Другое',
        hasDescription: !!tag.description,
        descriptionLength: tag.description ? tag.description.length : 0
      }))
    };
    
    const allTagsPath = path.join(docDir, '00-all-tags.json');
    fs.writeFileSync(allTagsPath, JSON.stringify(allTagsData, null, 2));
    console.log(`  📄 documentation/00-all-tags.json - полный список тегов`);
  }

  // Группировка endpoints по тегам
  groupEndpointsByTags() {
    console.log('\n🔍 Анализ и группировка endpoints...');
    
    if (!this.api.paths) {
      console.log('⚠️  В файле отсутствует секция paths');
      return;
    }
    
    // Создаем группу для endpoints без тегов
    this.tagGroups['_untagged'] = {
      name: 'Без категории',
      description: 'Методы без указанных тегов',
      displayName: 'Без категории',
      directory: 'methods',
      endpoints: []
    };
    
    // Обрабатываем каждый path
    for (const [pathUrl, pathItem] of Object.entries(this.api.paths)) {
      // Пропускаем информационные разделы (не содержат HTTP методов)
      const httpMethods = ['get', 'post', 'put', 'delete', 'patch', 'options', 'head'];
      const hasHttpMethod = Object.keys(pathItem).some(key => httpMethods.includes(key));
      
      if (!hasHttpMethod) {
        continue; // Пропускаем информационные разделы
      }
      
      this.statistics.totalPaths++;
      
      // Обрабатываем каждый HTTP метод
      for (const [httpMethod, operation] of Object.entries(pathItem)) {
        // Пропускаем специальные ключи OpenAPI
        if (!httpMethods.includes(httpMethod)) {
          continue;
        }
        
        this.statistics.totalMethods++;
        
        const tags = operation.tags || ['_untagged'];
        
        // Добавляем endpoint в соответствующие группы тегов
        for (const tag of tags) {
          if (!this.tagGroups[tag]) {
            // Находим описание тега из глобального списка
            const tagInfo = (this.api.tags || []).find(t => t.name === tag);
            this.tagGroups[tag] = {
              name: tag,
              displayName: tagInfo?.['x-displayName'] || tag,
              description: tagInfo?.description || '',
              externalDocs: tagInfo?.externalDocs || null,
              directory: this.getTagDirectory(tag),
              groupInfo: this.tagGroupsMapping[tag] || null,
              endpoints: []
            };
          }
          
          this.tagGroups[tag].endpoints.push({
            path: pathUrl,
            method: httpMethod.toUpperCase(),
            operation: operation
          });
          
          // Собираем используемые schemas
          this.extractUsedSchemas(operation);
        }
      }
    }
    
    // Удаляем пустую группу _untagged если она не используется
    if (this.tagGroups['_untagged'].endpoints.length === 0) {
      delete this.tagGroups['_untagged'];
    }
    
    console.log(`✅ Найдено ${Object.keys(this.tagGroups).length} тегов с методами`);
    console.log(`   📊 Всего методов: ${this.statistics.totalMethods}`);
    console.log(`   📂 Всего путей: ${this.statistics.totalPaths}`);
  }

  // Извлечение используемых схем из операции
  extractUsedSchemas(operation) {
    const jsonStr = JSON.stringify(operation);
    const schemaRefs = jsonStr.match(/"#\/components\/schemas\/([^"]+)"/g) || [];
    
    schemaRefs.forEach(ref => {
      const schemaName = ref.match(/"#\/components\/schemas\/([^"]+)"/)[1];
      this.usedSchemas.add(schemaName);
      
      // Рекурсивно добавляем зависимые схемы
      if (this.api.components?.schemas?.[schemaName]) {
        this.extractSchemaDependencies(schemaName);
      }
    });
  }

  // Рекурсивное извлечение зависимостей схемы
  extractSchemaDependencies(schemaName, visited = new Set()) {
    if (visited.has(schemaName)) return;
    visited.add(schemaName);
    
    const schema = this.api.components?.schemas?.[schemaName];
    if (!schema) return;
    
    const schemaStr = JSON.stringify(schema);
    const refs = schemaStr.match(/"#\/components\/schemas\/([^"]+)"/g) || [];
    
    refs.forEach(ref => {
      const depSchemaName = ref.match(/"#\/components\/schemas\/([^"]+)"/)[1];
      if (!this.usedSchemas.has(depSchemaName)) {
        this.usedSchemas.add(depSchemaName);
        this.extractSchemaDependencies(depSchemaName, visited);
      }
    });
  }

  // Сохранение групп в отдельные файлы
  saveGroupFiles() {
    console.log('\n💾 Сохранение групп методов...');
    
    // Группируем по директориям
    const groupsByDir = {};
    
    Object.entries(this.tagGroups).forEach(([tagName, group]) => {
      const dir = group.directory;
      if (!groupsByDir[dir]) {
        groupsByDir[dir] = [];
      }
      groupsByDir[dir].push([tagName, group]);
    });
    
    // Обрабатываем каждую директорию
    Object.entries(groupsByDir).forEach(([dir, groups]) => {
      console.log(`\n📂 ${dir}/`);
      
      // Сортируем группы по количеству endpoints
      groups.sort((a, b) => b[1].endpoints.length - a[1].endpoints.length);
      
      let fileIndex = 1;
      
      groups.forEach(([tagName, group]) => {
        // Формируем имя файла
        const safeTagName = tagName
          .replace(/[^a-z0-9а-яё]/gi, '-')
          .replace(/^-+|-+$/g, '')
          .toLowerCase();
        
        const fileName = `${String(fileIndex).padStart(2, '0')}-${safeTagName}.json`;
        
        // Находим связанные схемы для этой группы
        const groupSchemas = {};
        const groupSchemaNames = new Set();
        
        // Извлекаем схемы, используемые в этой группе
        group.endpoints.forEach(endpoint => {
          const operationStr = JSON.stringify(endpoint.operation);
          const schemaRefs = operationStr.match(/"#\/components\/schemas\/([^"]+)"/g) || [];
          
          schemaRefs.forEach(ref => {
            const schemaName = ref.match(/"#\/components\/schemas\/([^"]+)"/)[1];
            groupSchemaNames.add(schemaName);
          });
        });
        
        // Добавляем схемы и их зависимости
        groupSchemaNames.forEach(schemaName => {
          this.addSchemaWithDependencies(schemaName, groupSchemas);
        });
        
        // Формируем данные для сохранения
        const groupData = {
          metadata: {
            tag: tagName,
            name: group.name,
            displayName: group.displayName || group.name,
            description: group.description,
            externalDocs: group.externalDocs,
            directory: dir,
            groupInfo: group.groupInfo,
            endpointsCount: group.endpoints.length,
            schemasCount: Object.keys(groupSchemas).length,
            generatedAt: new Date().toISOString()
          },
          endpoints: group.endpoints.map(ep => ({
            path: ep.path,
            method: ep.method,
            operationId: ep.operation.operationId || null,
            summary: ep.operation.summary || null,
            description: ep.operation.description || null,
            deprecated: ep.operation.deprecated || false,
            security: ep.operation.security || null,
            operation: ep.operation
          })),
          schemas: groupSchemas
        };
        
        // Сохраняем файл
        const filePath = path.join(this.outputDir, dir, fileName);
        fs.writeFileSync(filePath, JSON.stringify(groupData, null, 2));
        
        console.log(`  📄 ${fileName} - ${group.endpoints.length} endpoints, ${Object.keys(groupSchemas).length} schemas`);
        
        // Добавляем в статистику
        this.statistics.groups.push({
          file: `${dir}/${fileName}`,
          tag: tagName,
          name: group.name,
          directory: dir,
          endpoints: group.endpoints.length,
          schemas: Object.keys(groupSchemas).length
        });
        
        fileIndex++;
      });
    });
  }

  // Добавление схемы со всеми зависимостями
  addSchemaWithDependencies(schemaName, targetSchemas, visited = new Set()) {
    if (visited.has(schemaName) || targetSchemas[schemaName] || !this.api.components?.schemas?.[schemaName]) {
      return;
    }
    visited.add(schemaName);
    
    targetSchemas[schemaName] = this.api.components.schemas[schemaName];
    
    // Находим зависимости
    const schemaStr = JSON.stringify(targetSchemas[schemaName]);
    const refs = schemaStr.match(/"#\/components\/schemas\/([^"]+)"/g) || [];
    
    refs.forEach(ref => {
      const depSchemaName = ref.match(/"#\/components\/schemas\/([^"]+)"/)[1];
      this.addSchemaWithDependencies(depSchemaName, targetSchemas, visited);
    });
  }

  // Сохранение общих компонентов
  saveCommonComponents() {
    console.log('\n📦 Сохранение общих компонентов...');
    
    const componentsDir = path.join(this.outputDir, 'components');
    
    // Сохраняем схемы по частям (если их много)
    if (this.api.components?.schemas) {
      const schemas = this.api.components.schemas;
      const schemaNames = Object.keys(schemas);
      const schemasPerFile = 100; // Максимум схем в файле
      
      if (schemaNames.length > schemasPerFile) {
        // Разбиваем на несколько файлов
        for (let i = 0; i < schemaNames.length; i += schemasPerFile) {
          const chunk = schemaNames.slice(i, i + schemasPerFile);
          const chunkSchemas = {};
          
          chunk.forEach(name => {
            chunkSchemas[name] = schemas[name];
          });
          
          const fileIndex = Math.floor(i / schemasPerFile) + 1;
          const fileName = `schemas-part-${String(fileIndex).padStart(2, '0')}.json`;
          const filePath = path.join(componentsDir, fileName);
          
          fs.writeFileSync(filePath, JSON.stringify({
            schemasCount: chunk.length,
            schemas: chunkSchemas
          }, null, 2));
          
          console.log(`  📄 ${fileName} - ${chunk.length} схем`);
        }
      } else {
        // Все схемы в одном файле
        const filePath = path.join(componentsDir, 'schemas.json');
        fs.writeFileSync(filePath, JSON.stringify({
          schemasCount: schemaNames.length,
          schemas: schemas
        }, null, 2));
        console.log(`  📄 schemas.json - ${schemaNames.length} схем`);
      }
      
      this.statistics.totalSchemas = schemaNames.length;
    }
    
    // Сохраняем остальные компоненты
    const otherComponents = {
      securitySchemes: this.api.components?.securitySchemes || {},
      responses: this.api.components?.responses || {},
      parameters: this.api.components?.parameters || {},
      examples: this.api.components?.examples || {},
      requestBodies: this.api.components?.requestBodies || {},
      headers: this.api.components?.headers || {},
      callbacks: this.api.components?.callbacks || {},
      links: this.api.components?.links || {}
    };
    
    // Удаляем пустые секции
    Object.keys(otherComponents).forEach(key => {
      if (Object.keys(otherComponents[key]).length === 0) {
        delete otherComponents[key];
      }
    });
    
    if (Object.keys(otherComponents).length > 0) {
      const filePath = path.join(componentsDir, 'other-components.json');
      fs.writeFileSync(filePath, JSON.stringify(otherComponents, null, 2));
      console.log(`  📄 other-components.json - дополнительные компоненты`);
    }
  }

  // Создание индексного файла
  createIndexFile() {
    console.log('\n📋 Создание индексного файла...');
    
    const index = {
      apiInfo: {
        title: this.api.info?.title || 'OZON Seller API',
        version: this.api.info?.version || '2.1',
        description: this.api.info?.description || '',
        logo: this.api.info['x-logo'] || null
      },
      structure: {
        tagGroups: this.statistics.tagGroups,
        directories: {
          general: 'Общая информация и введение',
          documentation: 'Документационные разделы с описанием концепций',
          methods: 'Основные методы API',
          beta: 'Бета-методы (экспериментальные)',
          push: 'Пуш-уведомления',
          appendix: 'Приложения и справочники',
          components: 'Схемы и компоненты'
        }
      },
      statistics: {
        totalPaths: this.statistics.totalPaths,
        totalMethods: this.statistics.totalMethods,
        totalSchemas: this.statistics.totalSchemas,
        totalGroups: this.statistics.groups.length,
        usedSchemas: this.usedSchemas.size
      },
      files: {
        byDirectory: {}
      },
      processingInstructions: {
        order: [
          '1. Начните с файла general/00-api-info.json для понимания структуры',
          '2. Обработайте группы в порядке: general → methods → beta → push → appendix',
          '3. Внутри каждой директории обрабатывайте файлы по порядку нумерации',
          '4. Компоненты в components/ используйте как справочник для схем',
          '5. Каждый файл группы самодостаточен и содержит все необходимые схемы'
        ],
        notes: [
          'Файлы пронумерованы по убыванию количества методов',
          'Схемы дублируются в файлах групп для удобства',
          'Полный набор схем находится в components/schemas*.json'
        ]
      },
      generatedAt: new Date().toISOString(),
      generatorVersion: '2.0.0'
    };
    
    // Группируем файлы по директориям
    this.statistics.groups.forEach(group => {
      const dir = group.directory;
      if (!index.files.byDirectory[dir]) {
        index.files.byDirectory[dir] = [];
      }
      index.files.byDirectory[dir].push({
        file: group.file.split('/')[1], // Только имя файла
        tag: group.tag,
        name: group.name,
        endpoints: group.endpoints,
        schemas: group.schemas
      });
    });
    
    const indexPath = path.join(this.outputDir, 'INDEX.json');
    fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));
    console.log(`  📄 INDEX.json - создан главный индексный файл`);
  }

  // Создание README файла
  createReadmeFile() {
    console.log('\n📝 Создание README файла...');
    
    const readme = `# OZON Seller API Documentation Structure

## 📋 Информация об API
- **Название**: ${this.api.info?.title || 'OZON Seller API'}
- **Версия**: ${this.api.info?.version || '2.1'}
- **OpenAPI**: ${this.api.openapi}
- **Дата генерации**: ${new Date().toLocaleString('ru-RU')}

## 📊 Статистика
- **Всего путей**: ${this.statistics.totalPaths}
- **Всего методов**: ${this.statistics.totalMethods}
- **Всего схем**: ${this.statistics.totalSchemas}
- **Групп методов**: ${this.statistics.groups.length}

## 📁 Структура директорий

\`\`\`
ozon-api-documentation/
├── INDEX.json                 # Главный индексный файл
├── README.md                  # Этот файл
├── general/                   # Общая информация
│   └── 00-api-info.json      # Информация об API
├── documentation/             # Документационные разделы
│   ├── 00-all-tags.json      # Полный список тегов
│   └── *.json                 # Группы документации
├── methods/                   # Основные методы API
│   ├── 01-*.json             # Группы методов
│   └── ...
├── beta/                      # Бета-методы
│   └── ...
├── push/                      # Пуш-уведомления
│   └── ...
├── appendix/                  # Приложения
│   └── ...
└── components/                # Компоненты и схемы
    ├── schemas*.json          # Схемы данных
    └── other-components.json  # Другие компоненты
\`\`\`

## 🏷️ Группы тегов

${this.statistics.tagGroups.map(group => 
  `### ${group.name}
- **Количество тегов**: ${group.tagsCount}
- **Теги**: ${group.tags.join(', ')}
`).join('\n')}

## 📚 Инструкция по использованию

1. **Начните с INDEX.json** - содержит полную навигацию по документации
2. **Изучите general/00-api-info.json** - общая информация об API
3. **Просмотрите documentation/** - документационные разделы с описанием концепций
4. **Обрабатывайте группы методов по порядку**:
   - general/ - введение и общие концепции
   - documentation/ - подробная документация
   - methods/ - основные рабочие методы
   - beta/ - экспериментальные методы
   - push/ - работа с уведомлениями
   - appendix/ - справочная информация
5. **Используйте components/** для полного списка схем данных

## 🔧 Формат файлов групп

Каждый файл группы методов содержит:
- **metadata** - метаинформация о группе
- **endpoints** - список методов с полным описанием
- **schemas** - связанные схемы данных

## 📌 Примечания

- Файлы внутри директорий отсортированы по количеству методов
- Каждый файл группы самодостаточен и содержит все необходимые схемы
- Полный набор всех схем находится в components/

---
*Сгенерировано с помощью OZON API Splitter v2.0*
`;
    
    const readmePath = path.join(this.outputDir, 'README.md');
    fs.writeFileSync(readmePath, readme);
    console.log(`  📄 README.md - создан файл с инструкциями`);
  }

  // Вывод статистики
  printStatistics() {
    console.log('\n' + '='.repeat(70));
    console.log('📊 СТАТИСТИКА ОБРАБОТКИ OZON SELLER API:');
    console.log('='.repeat(70));
    console.log(`  API:                     ${this.api.info?.title || 'Unknown'}`);
    console.log(`  Версия API:              ${this.api.info?.version || 'Unknown'}`);
    console.log(`  Всего путей (paths):     ${this.statistics.totalPaths}`);
    console.log(`  Всего методов:           ${this.statistics.totalMethods}`);
    console.log(`  Всего схем:              ${this.statistics.totalSchemas}`);
    console.log(`  Использовано схем:       ${this.usedSchemas.size}`);
    console.log(`  Групп тегов:             ${this.statistics.tagGroups.length}`);
    console.log(`  Файлов с методами:       ${this.statistics.groups.length}`);
    console.log('='.repeat(70));
    
    // Статистика по директориям
    const dirStats = {};
    this.statistics.groups.forEach(group => {
      if (!dirStats[group.directory]) {
        dirStats[group.directory] = { files: 0, methods: 0 };
      }
      dirStats[group.directory].files++;
      dirStats[group.directory].methods += group.endpoints;
    });
    
    console.log('\n📂 РАСПРЕДЕЛЕНИЕ ПО ДИРЕКТОРИЯМ:');
    console.log('-'.repeat(70));
    Object.entries(dirStats).forEach(([dir, stats]) => {
      console.log(`  ${dir.padEnd(15)} ${stats.files} файлов, ${stats.methods} методов`);
    });
    
    console.log('='.repeat(70));
    console.log('\n✨ Обработка завершена успешно!');
    console.log(`📂 Результаты сохранены в: ${path.resolve(this.outputDir)}`);
    console.log('\n💡 Рекомендации:');
    console.log('   1. Начните с изучения файла INDEX.json');
    console.log('   2. Прочитайте README.md для понимания структуры');
    console.log('   3. Передавайте файлы по одному, начиная с general/00-api-info.json');
  }
}

// Запуск скрипта
function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('🚀 OZON Seller API Documentation Splitter v2.0');
    console.log('='.repeat(50));
    console.log('Использование: node ozon-api-splitter.js <путь-к-openapi.json>');
    console.log('Пример: node ozon-api-splitter.js ozon-seller-api.json');
    console.log('\nОписание:');
    console.log('  Разбивает большой OpenAPI 3.0 файл OZON Seller API на');
    console.log('  управляемые блоки для создания документации.');
    console.log('\nРезультат:');
    console.log('  Создает директорию ozon-api-documentation/ со структурированными');
    console.log('  JSON файлами, готовыми для обработки.');
    process.exit(1);
  }
  
  const inputFile = args[0];
  const splitter = new OzonAPISplitter(inputFile);
  splitter.process();
}

// Запускаем если файл выполняется напрямую
if (require.main === module) {
  main();
}

module.exports = OzonAPISplitter;