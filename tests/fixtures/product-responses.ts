/**
 * Test fixtures for Product API responses
 * Provides realistic mock data for testing
 */

import { createProductId, createOfferId, createCategoryId } from '../../src/types/common/base.js';
import type {
  GetProductListResponse,
  GetProductStocksResponse,
  GetProductPricesResponse,
  GetProductAttributesResponse,
  ImportProductsResponse,
  ImportProductsStatusResponse,
  GetCertificateTypesResponse,
  ProductInfo
} from '../../src/types/responses/product.js';
import type { ProductBooleanResponse } from '../../src/types/common/base.js';

// Sample product data
export const SAMPLE_PRODUCT_INFO: ProductInfo = {
  id: createProductId(123456),
  name: 'Смартфон Apple iPhone 14 128GB Blue',
  offer_id: createOfferId('IPHONE14-128-BLUE'),
  barcode: '0194253414926',
  description: 'Смартфон Apple iPhone 14 с дисплеем 6.1 дюйма, двойной камерой и чипом A15 Bionic',
  category_id: createCategoryId(17036076),
  state: 'PUBLISHED',
  state_name: 'Опубликован',
  state_description: '',
  is_fbo_visible: true,
  is_fbs_visible: true,
  archived: false,
  is_discounted: false
};

// Product list response
export const PRODUCT_LIST_RESPONSE: GetProductListResponse = {
  result: {
    items: [
      SAMPLE_PRODUCT_INFO,
      {
        id: createProductId(123457),
        name: 'Смартфон Samsung Galaxy S23 256GB Black',
        offer_id: createOfferId('GALAXY-S23-256-BLACK'),
        barcode: '8806094736397',
        description: 'Смартфон Samsung Galaxy S23 с экраном 6.1 дюйма и тройной камерой',
        category_id: createCategoryId(17036076),
        state: 'MODERATED',
        state_name: 'На модерации',
        state_description: 'Товар проходит модерацию',
        is_fbo_visible: true,
        is_fbs_visible: false,
        archived: false,
        is_discounted: true
      }
    ],
    last_id: 'eyJpZCI6MTIzNDU3LCJkaXIiOiJuZXh0In0',
    total: 2
  }
};

// Product stocks response
export const PRODUCT_STOCKS_RESPONSE: GetProductStocksResponse = {
  result: [
    {
      offer_id: createOfferId('IPHONE14-128-BLUE'),
      product_id: createProductId(123456),
      stock: 25,
      reserved: 3
    },
    {
      offer_id: createOfferId('GALAXY-S23-256-BLACK'),
      product_id: createProductId(123457),
      stock: 0,
      reserved: 0
    }
  ]
};

// Product prices response
export const PRODUCT_PRICES_RESPONSE: GetProductPricesResponse = {
  result: {
    items: [
      {
        offer_id: createOfferId('IPHONE14-128-BLUE'),
        product_id: createProductId(123456),
        price: '79990.00',
        old_price: '89990.00',
        currency_code: 'RUB',
        min_price: '75990.00'
      },
      {
        offer_id: createOfferId('GALAXY-S23-256-BLACK'),
        product_id: createProductId(123457),
        price: '69990.00',
        old_price: '79990.00',
        currency_code: 'RUB',
        min_price: '65990.00'
      }
    ]
  }
};

// Product attributes response
export const PRODUCT_ATTRIBUTES_RESPONSE: GetProductAttributesResponse = {
  result: [
    {
      id: createProductId(123456),
      offer_id: createOfferId('IPHONE14-128-BLUE'),
      attributes: [
        {
          attribute_id: 85,
          complex_id: 0,
          attribute_name: 'Бренд',
          values: [
            {
              dictionary_value_id: 61725,
              value: 'Apple'
            }
          ]
        },
        {
          attribute_id: 10096,
          complex_id: 0,
          attribute_name: 'Цвет товара',
          values: [
            {
              dictionary_value_id: 61832,
              value: 'синий'
            }
          ]
        },
        {
          attribute_id: 21841,
          complex_id: 0,
          attribute_name: 'Объем встроенной памяти',
          values: [
            {
              dictionary_value_id: 0,
              value: '128'
            }
          ]
        }
      ]
    }
  ]
};

// Import products response
export const IMPORT_PRODUCTS_RESPONSE: ImportProductsResponse = {
  result: {
    task_id: 987654321
  }
};

// Import status response (in progress)
export const IMPORT_STATUS_PROCESSING: ImportProductsStatusResponse = {
  result: {
    total: 5,
    processed: 3,
    status: 'processing',
    items: [
      {
        offer_id: createOfferId('NEW-PRODUCT-001'),
        product_id: createProductId(999001),
        status: 'imported',
        errors: []
      },
      {
        offer_id: createOfferId('NEW-PRODUCT-002'),
        product_id: createProductId(999002),
        status: 'imported',
        errors: []
      },
      {
        offer_id: createOfferId('NEW-PRODUCT-003'),
        status: 'failed',
        errors: [
          {
            code: 'INVALID_BARCODE',
            message: 'Штрихкод товара не соответствует требованиям'
          }
        ]
      }
    ]
  }
};

// Import status response (completed)
export const IMPORT_STATUS_COMPLETED: ImportProductsStatusResponse = {
  result: {
    total: 5,
    processed: 5,
    status: 'completed',
    items: [
      {
        offer_id: createOfferId('NEW-PRODUCT-001'),
        product_id: createProductId(999001),
        status: 'imported',
        errors: []
      },
      {
        offer_id: createOfferId('NEW-PRODUCT-002'),
        product_id: createProductId(999002),
        status: 'imported',
        errors: []
      },
      {
        offer_id: createOfferId('NEW-PRODUCT-003'),
        status: 'failed',
        errors: [
          {
            code: 'INVALID_BARCODE',
            message: 'Штрихкод товара не соответствует требованиям'
          }
        ]
      },
      {
        offer_id: createOfferId('NEW-PRODUCT-004'),
        product_id: createProductId(999004),
        status: 'imported',
        errors: []
      },
      {
        offer_id: createOfferId('NEW-PRODUCT-005'),
        product_id: createProductId(999005),
        status: 'imported',
        errors: []
      }
    ]
  }
};

// Certificate types response
export const CERTIFICATE_TYPES_RESPONSE: GetCertificateTypesResponse = {
  result: [
    {
      id: 1,
      name: 'Декларация соответствия',
      mandatory: true
    },
    {
      id: 2,
      name: 'Сертификат соответствия',
      mandatory: false
    },
    {
      id: 3,
      name: 'Свидетельство о государственной регистрации',
      mandatory: false
    },
    {
      id: 4,
      name: 'Экспертное заключение',
      mandatory: false
    }
  ]
};

// Success boolean response
export const SUCCESS_RESPONSE: ProductBooleanResponse = {
  result: true
};

// Failure boolean response  
export const FAILURE_RESPONSE: ProductBooleanResponse = {
  result: false
};

// Discounted products response
export const DISCOUNTED_PRODUCTS_RESPONSE = {
  result: {
    discounted_skus: [
      {
        sku: 'IPHONE14-128-BLUE',
        discount_value: 10000,
        discount_percent: 12.5
      },
      {
        sku: 'GALAXY-S23-256-BLACK',
        discount_value: 5000,
        discount_percent: 7.1
      }
    ]
  }
};

// Empty responses for edge cases
export const EMPTY_PRODUCT_LIST: GetProductListResponse = {
  result: {
    items: [],
    last_id: '',
    total: 0
  }
};

export const EMPTY_STOCKS: GetProductStocksResponse = {
  result: []
};

export const EMPTY_PRICES: GetProductPricesResponse = {
  result: {
    items: []
  }
};

export const EMPTY_ATTRIBUTES: GetProductAttributesResponse = {
  result: []
};