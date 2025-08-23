/**
 * Basic usage example for @spacechemical/ozon-seller-api
 * This example demonstrates how to initialize the SDK and use the ProductAPI
 */

import { OzonSellerApiClient, createApiKey, createClientId } from "../index.js";

async function main(): Promise<void> {
  // Initialize the SDK with your credentials
  const client = new OzonSellerApiClient({
    apiKey: createApiKey(process.env["OZON_API_KEY"] || "your-api-key-here"),
    clientId: createClientId(process.env["OZON_CLIENT_ID"] || "your-client-id-here"),
    baseUrl: "https://api-seller.ozon.ru", // Optional: defaults to production
    timeout: 30000, // Optional: request timeout in ms
    retries: 3, // Optional: number of retries on failure
  });

  try {
    // Test the connection
    // eslint-disable-next-line no-console
    console.log("Testing connection...");
    const connectionTest = await client.testConnection();
    if (connectionTest.success) {
      // eslint-disable-next-line no-console
      console.log("✅ Connection successful");
    } else {
      // eslint-disable-next-line no-console
      console.log("❌ Connection failed:", connectionTest.message);
      return;
    }

    // Get SDK information
    const info = client.getInfo();
    // eslint-disable-next-line no-console
    console.log("📦 SDK Info:", {
      version: info.version,
      baseUrl: info.baseUrl,
      timeout: info.timeout,
    });

    // Example 1: Get product list
    // eslint-disable-next-line no-console
    console.log("\n📋 Getting product list...");
    const productList = await client.products.getList({
      limit: 5, // Get first 5 products
    });
    // eslint-disable-next-line no-console
    console.log(`Found ${productList.result.total} products total`);
    // eslint-disable-next-line no-console
    console.log("First few products:", productList.result.items.slice(0, 2));

    // Example 2: Get product stocks
    if (productList.result.items.length > 0) {
      // eslint-disable-next-line no-console
      console.log("\n📦 Getting product stocks...");
      const firstProduct = productList.result.items[0]!;
      const stocks = await client.products.getStocks({
        filter: {
          offer_id: [firstProduct.offer_id],
        },
      });
      // eslint-disable-next-line no-console
      console.log("Stock info:", stocks.result[0]);
    }

    // Example 3: Get product prices
    if (productList.result.items.length > 0) {
      // eslint-disable-next-line no-console
      console.log("\n💰 Getting product prices...");
      const firstProduct = productList.result.items[0]!;
      const prices = await client.products.getPrices({
        filter: {
          product_id: [firstProduct.id],
        },
      });
      // eslint-disable-next-line no-console
      console.log("Price info:", prices.result.items[0]);
    }

    // Example 4: Get certificate types
    // eslint-disable-next-line no-console
    console.log("\n📋 Getting certificate types...");
    const certificateTypes = await client.products.getCertificateTypes();
    // eslint-disable-next-line no-console
    console.log("Available certificate types:", certificateTypes.result.slice(0, 3));

    // Example 5: Import products by SKU (commented out as it modifies data)
    /*
    console.log('\n⬆️ Importing products by SKU...');
    const importResult = await client.products.importBySku({
      items: [
        {
          sku: 123456789,
          name: 'Test Product',
          offer_id: createOfferId('TEST-PRODUCT-001'),
          price: '1999.99',
          currency_code: 'RUB'
        }
      ]
    });
    console.log('Import task ID:', importResult.result.task_id);

    // Check import status
    const importStatus = await client.products.getImportInfo({
      task_id: importResult.result.task_id
    });
    console.log('Import status:', importStatus.result.status);
    */

    // eslint-disable-next-line no-console
    console.log("\n✅ All examples completed successfully!");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("❌ Error occurred:", error);

    // Handle different types of errors
    if (error instanceof Error) {
      // eslint-disable-next-line no-console
      console.error("Error details:", {
        name: error.name,
        message: error.message,
        // Show additional properties if it's an API error
        ...("status" in error && { status: (error as { status: number }).status }),
        ...("code" in error && { code: (error as { code: string }).code }),
      });
    }
  }
}

// Run the example if this file is executed directly
// Note: import.meta.url check is for ES modules only
// This check may not work in all environments
if (typeof import.meta !== "undefined" && import.meta.url === `file://${process.argv[1]}`) {
  // eslint-disable-next-line no-console
  main().catch(console.error);
}

export { main as runBasicExample };
