/**
 * Utility functions for code generation
 */

/**
 * Convert string to PascalCase
 */
export function toPascalCase(str: string): string {
  return str
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
    .replace(/^[a-z]/, chr => chr.toUpperCase());
}

/**
 * Convert OpenAPI schema to TypeScript type definition
 */
export function convertSchemaToTypeScript(
  name: string, 
  schema: any, 
  depth: number = 0
): string {
  if (depth > 10) {
    console.warn(`⚠️  Max recursion depth reached for schema: ${name}`);
    return 'any';
  }

  // Handle $ref
  if (schema.$ref) {
    const refName = schema.$ref.replace('#/components/schemas/', '');
    return `I${toPascalCase(refName)}`;
  }

  // Handle type
  if (schema.type) {
    switch (schema.type) {
      case 'string':
        if (schema.enum) {
          return schema.enum.map((v: string) => `'${v}'`).join(' | ');
        }
        if (schema.format === 'byte') return 'string';
        if (schema.format === 'date-time') return 'string';
        return 'string';
        
      case 'number':
      case 'integer':
        return 'number';
        
      case 'boolean':
        return 'boolean';
        
      case 'array':
        if (schema.items) {
          const itemType = convertSchemaToTypeScript(`${name}_item`, schema.items, depth + 1);
          return `${itemType}[]`;
        }
        return 'unknown[]';
        
      case 'object':
        if (!schema.properties) {
          if (schema.additionalProperties) {
            const valueType = convertSchemaToTypeScript(`${name}_value`, schema.additionalProperties, depth + 1);
            return `Record<string, ${valueType}>`;
          }
          return 'Record<string, unknown>';
        }
        
        // Generate interface properties
        const properties: string[] = [];
        Object.entries(schema.properties).forEach(([propName, propSchema]: [string, any]) => {
          const isRequired = schema.required?.includes(propName) || false;
          const propType = convertSchemaToTypeScript(`${name}_${propName}`, propSchema, depth + 1);
          const optional = isRequired ? '' : '?';
          const comment = propSchema.description ? 
            `  /** ${propSchema.description.replace(/\n/g, ' ').trim()} */\n` : '';
          properties.push(`${comment}  readonly ${propName}${optional}: ${propType};`);
        });
        
        return `{\n${properties.join('\n')}\n}`;
    }
  }

  // Handle allOf, oneOf, anyOf
  if (schema.allOf) {
    const types = schema.allOf.map((s: any, i: number) => 
      convertSchemaToTypeScript(`${name}_allOf_${i}`, s, depth + 1)
    );
    return types.join(' & ');
  }
  
  if (schema.oneOf || schema.anyOf) {
    const schemas = schema.oneOf || schema.anyOf;
    const types = schemas.map((s: any, i: number) => 
      convertSchemaToTypeScript(`${name}_oneOf_${i}`, s, depth + 1)
    );
    return types.join(' | ');
  }

  console.warn(`⚠️  Unknown schema type for ${name}:`, JSON.stringify(schema, null, 2));
  return 'unknown';
}

/**
 * Generate TypeScript interface for a schema
 */
export function generateInterface(name: string, schema: any): string {
  const interfaceName = `I${toPascalCase(name)}`;
  const typeDefinition = convertSchemaToTypeScript(name, schema);
  
  let description = '';
  if (schema.description) {
    description = `/**\n * ${schema.description.replace(/\n/g, '\n * ')}\n */\n`;
  }

  if (typeDefinition.startsWith('{')) {
    // Inline object type - convert to proper interface
    return `${description}export interface ${interfaceName} ${typeDefinition}`;
  } else {
    // Type alias
    return `${description}export type ${interfaceName} = ${typeDefinition};`;
  }
}