/**
 * Main CodeGenerator class
 */

import fs from 'fs/promises';
import path from 'path';
import type { IIndexData, ISchemaFile, IMethodFile } from './types';
import { P0_GROUPS } from './types';
import { generateInterface } from './utils';

export class CodeGenerator {
  private indexData: IIndexData | null = null;
  private allSchemas: Map<string, any> = new Map();
  private apiDocRoot: string;
  private outputRoot: string;
  
  constructor(apiDocRoot: string, outputRoot: string) {
    this.apiDocRoot = apiDocRoot;
    this.outputRoot = outputRoot;
  }

  /**
   * Load and parse INDEX.json
   */
  async loadIndex(): Promise<void> {
    console.log('📖 Loading INDEX.json...');
    
    const indexPath = path.join(this.apiDocRoot, 'INDEX.json');
    const indexContent = await fs.readFile(indexPath, 'utf-8');
    this.indexData = JSON.parse(indexContent);
    
    console.log(`✅ Loaded API info: ${this.indexData!.apiInfo.title} v${this.indexData!.apiInfo.version}`);
    console.log(`📊 Statistics: ${this.indexData!.statistics.totalPaths} paths, ${this.indexData!.statistics.totalSchemas} schemas`);
  }

  /**
   * Load all schema files from components/ directory
   */
  async loadSchemas(): Promise<void> {
    console.log('📚 Loading schema files...');
    
    const componentsDir = path.join(this.apiDocRoot, 'components');
    const files = await fs.readdir(componentsDir);
    const schemaFiles = files.filter(f => f.startsWith('schemas-part-') && f.endsWith('.json'));
    
    for (const file of schemaFiles) {
      console.log(`  Loading ${file}...`);
      const filePath = path.join(componentsDir, file);
      const content = await fs.readFile(filePath, 'utf-8');
      const schemaData: ISchemaFile = JSON.parse(content);
      
      // Merge schemas into global map
      Object.entries(schemaData.schemas).forEach(([name, schema]) => {
        this.allSchemas.set(name, schema);
      });
    }
    
    console.log(`✅ Loaded ${this.allSchemas.size} schemas from ${schemaFiles.length} files`);
  }

  /**
   * Get P0 groups from INDEX.json in priority order
   */
  getP0Groups(): Array<{file: string; tag: string; name: string; endpoints: number; schemas: number}> {
    if (!this.indexData) throw new Error('INDEX.json not loaded');
    
    const methods = this.indexData.files.byDirectory.methods;
    const p0Groups = methods.filter(group => P0_GROUPS.includes(group.tag));
    
    // Sort by P0_GROUPS order
    p0Groups.sort((a, b) => {
      const aIndex = P0_GROUPS.indexOf(a.tag);
      const bIndex = P0_GROUPS.indexOf(b.tag);
      return aIndex - bIndex;
    });
    
    console.log(`🎯 Found ${p0Groups.length} P0 groups:`, p0Groups.map(g => g.tag).join(', '));
    return p0Groups;
  }

  /**
   * Generate types for P0 groups
   */
  async generateP0Types(): Promise<void> {
    console.log('🏗️  Generating P0 group types...');
    
    // Ensure output directory exists
    await fs.mkdir(this.outputRoot, { recursive: true });

    const p0Groups = this.getP0Groups();
    
    for (const group of p0Groups) {
      console.log(`  Generating types for ${group.tag}...`);
      
      // Load method file to get referenced schemas
      const methodFile = path.join(this.apiDocRoot, 'methods', group.file);
      const methodContent = await fs.readFile(methodFile, 'utf-8');
      const methodData: IMethodFile = JSON.parse(methodContent);
      
      // Extract referenced schema names from endpoints
      const referencedSchemas = new Set<string>();
      
      // Scan method definitions for schema references
      const methodStr = JSON.stringify(methodData);
      const refMatches = methodStr.match(/#\/components\/schemas\/([a-zA-Z0-9_]+)/g) || [];
      refMatches.forEach(ref => {
        const schemaName = ref.replace('#/components/schemas/', '');
        referencedSchemas.add(schemaName);
      });

      // Also include schemas from the method file itself if they exist
      if (methodData.components && methodData.components.schemas) {
        Object.keys(methodData.components.schemas).forEach(schemaName => {
          referencedSchemas.add(schemaName);
          // Add local schemas to global map
          this.allSchemas.set(schemaName, methodData.components!.schemas![schemaName]);
        });
      }

      console.log(`    Found ${referencedSchemas.size} referenced schemas`);
      
      // Generate TypeScript interfaces
      const interfaces: string[] = [];
      const processedSchemas = new Set<string>();
      
      // Helper function to resolve dependencies
      const resolveSchema = (schemaName: string): void => {
        if (processedSchemas.has(schemaName) || !this.allSchemas.has(schemaName)) {
          return;
        }
        
        const schema = this.allSchemas.get(schemaName)!;
        
        // Find dependencies in this schema
        const schemaStr = JSON.stringify(schema);
        const deps = (schemaStr.match(/#\/components\/schemas\/([a-zA-Z0-9_]+)/g) || [])
          .map(ref => ref.replace('#/components/schemas/', ''));
        
        // Resolve dependencies first
        deps.forEach(dep => resolveSchema(dep));
        
        // Generate interface
        const interfaceCode = generateInterface(schemaName, schema);
        interfaces.push(interfaceCode);
        processedSchemas.add(schemaName);
      };

      // Resolve all referenced schemas and their dependencies
      referencedSchemas.forEach(schemaName => resolveSchema(schemaName));
      
      // Generate output file
      const outputContent = `/**
 * Generated types for ${group.tag} (${group.name})
 * 
 * This file is auto-generated from Ozon Seller API documentation.
 * Do not edit manually - changes will be overwritten.
 * 
 * Generated from: ${group.file}
 * Endpoints: ${group.endpoints}
 * Schemas: ${processedSchemas.size}
 */

${interfaces.join('\n\n')}
`;

      const outputFile = path.join(this.outputRoot, `${group.tag.toLowerCase()}.ts`);
      await fs.writeFile(outputFile, outputContent);
      
      console.log(`    ✅ Generated ${outputFile} with ${processedSchemas.size} types`);
    }
  }

  /**
   * Generate index file for all generated types
   */
  async generateIndex(): Promise<void> {
    console.log('📝 Generating types index...');
    
    const p0Groups = this.getP0Groups();
    const exports = p0Groups.map(group => 
      `export * from './${group.tag.toLowerCase()}';`
    ).join('\n');
    
    const indexContent = `/**
 * Generated types index for Ozon Seller API TypeScript SDK
 * 
 * This file is auto-generated and exports all P0 group types.
 * Do not edit manually - changes will be overwritten.
 * 
 * Generated at: ${new Date().toISOString()}
 */

${exports}
`;

    const indexFile = path.join(this.outputRoot, 'index.ts');
    await fs.writeFile(indexFile, indexContent);
    
    console.log(`✅ Generated ${indexFile}`);
  }

  /**
   * Run the complete code generation process
   */
  async generate(): Promise<void> {
    try {
      console.log('🚀 Starting Ozon API code generation...\n');
      
      await this.loadIndex();
      await this.loadSchemas();
      await this.generateP0Types();
      await this.generateIndex();
      
      console.log('\n✨ Code generation completed successfully!');
      console.log(`📁 Output directory: ${this.outputRoot}`);
      
    } catch (error) {
      console.error('❌ Code generation failed:', error);
      process.exit(1);
    }
  }
}