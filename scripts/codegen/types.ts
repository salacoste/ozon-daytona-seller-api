/**
 * Type definitions for code generation
 */

export interface IIndexData {
  apiInfo: {
    title: string;
    version: number;
    description: string;
  };
  structure: {
    tagGroups: Array<{
      name: string;
      tagsCount: number;
      tags: string[];
    }>;
    directories: Record<string, string>;
  };
  statistics: {
    totalPaths: number;
    totalMethods: number;
    totalSchemas: number;
    totalGroups: number;
    usedSchemas: number;
  };
  files: {
    byDirectory: {
      methods: Array<{
        file: string;
        tag: string;
        name: string;
        endpoints: number;
        schemas: number;
      }>;
      beta: Array<{
        file: string;
        tag: string;
        name: string;
        endpoints: number;
        schemas: number;
      }>;
    };
  };
}

export interface ISchemaFile {
  schemasCount: number;
  schemas: Record<string, any>;
}

export interface IMethodFile {
  metadata: {
    tag: string;
    name: string;
    displayName: string;
    description: string;
    endpointsCount: number;
    schemasCount: number;
  };
  endpoints: Array<{
    path: string;
    method: string;
    operationId: string;
    summary: string;
    description: string;
    operation: any;
  }>;
  components?: {
    schemas: Record<string, any>;
  };
}

// P0 groups prioritized for initial implementation
export const P0_GROUPS = [
  'FBS',
  'FBO', 
  'FboSupplyRequest',
  'Prices&StocksAPI',
  'WarehouseAPI',
  'ProductAPI'
];