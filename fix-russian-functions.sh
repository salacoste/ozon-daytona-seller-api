#!/bin/bash

# Script to convert Russian function names and variables to English in Prices-Stocks files
# Keeps Russian comments and descriptions

echo "🔄 Converting Russian function names to English..."

FILES=(
  "/Users/r2d2/Documents/Code_Projects/spacechemical-nextjs/bmad-ozon-seller-api/daytona-ozon-api-docs/categories/22-prices-stocks-prices.md"
  "/Users/r2d2/Documents/Code_Projects/spacechemical-nextjs/bmad-ozon-seller-api/daytona-ozon-api-docs/categories/22-prices-stocks-stocks.md"
  "/Users/r2d2/Documents/Code_Projects/spacechemical-nextjs/bmad-ozon-seller-api/daytona-ozon-api-docs/categories/22-prices-stocks-timers.md"
  "/Users/r2d2/Documents/Code_Projects/spacechemical-nextjs/bmad-ozon-seller-api/daytona-ozon-api-docs/categories/22-prices-stocks-discounted.md"
)

# Function name mappings
declare -A FUNCTION_MAP=(
  # Prices functions
  ["обновитьЦеныТоваров"]="updateProductPrices"
  ["массовоеОбновлениеЦен"]="bulkPriceUpdate"
  ["установитьПремиумЦены"]="setPremiumPrices"
  ["получитьЦеныТоваров"]="getProductPrices"
  ["получитьВсеЦены"]="getAllPrices"
  ["анализЦеновойКонкурентоспособности"]="analyzePriceCompetitiveness"
  ["установитьСкидкуНаУценённыйТовар"]="setDiscountedProductDiscount"
  ["массовоУстановитьСкидкиНаУценённые"]="bulkSetDiscountedDiscounts"
  ["устойчивыеОперацииСЦенами"]="robustPriceOperations"
  
  # Stocks functions
  ["обновитьОстаткиТоваров"]="updateProductStocks"
  ["массовоеПополнениеОстатков"]="bulkStockReplenishment"
  ["обновитьОстаткиНаСкладах"]="updateStocksAcrossWarehouses"
  ["получитьОстаткиТоваров"]="getProductStocks"
  ["анализОстатковПоСкладам"]="analyzeStocksByWarehouses"
  ["мониторингКритическихОстатков"]="monitorCriticalStocks"
  ["получитьДетальнуюИнформациюПоСкладам"]="getDetailedWarehouseInfo"
  ["аудитРаспределенияПоСкладам"]="auditWarehouseDistribution"
  
  # Timers functions
  ["проверитьСтатусТаймеров"]="checkTimerStatus"
  ["анализЭффективностиТаймеров"]="analyzeTimerEffectiveness"
  ["мониторингКритическихТаймеров"]="monitorCriticalTimers"
  ["обновитьТаймерыТоваров"]="updateProductTimers"
  ["автообновлениеИстекающихТаймеров"]="autoUpdateExpiringTimers"
  ["массовоеОбновлениеТаймеров"]="bulkUpdateTimers"
  ["устойчивыеОперацииСТаймерами"]="robustTimerOperations"
  
  # Discounted functions
  ["получитьИнформациюОбУценённыхТоварах"]="getDiscountedProductsInfo"
  ["анализУценённыхТоваров"]="analyzeDiscountedProducts"
  ["оптимизацияПродажУценённыхТоваров"]="optimizeDiscountedSales"
  ["устойчивыеОперацииСУценённымиТоварами"]="robustDiscountedOperations"
)

# Variable name mappings
declare -A VARIABLE_MAP=(
  # Common variables
  ["результат"]="result"
  ["товар"]="product"
  ["товары"]="products"
  ["цена"]="price"
  ["цены"]="prices"
  ["остаток"]="stock"
  ["остатки"]="stocks"
  ["склад"]="warehouse"
  ["склады"]="warehouses"
  ["таймер"]="timer"
  ["таймеры"]="timers"
  ["статус"]="status"
  ["ошибка"]="error"
  ["ошибки"]="errors"
  ["количество"]="quantity"
  ["сумма"]="amount"
  ["период"]="period"
  
  # Specific variables
  ["обновлениеЦен"]="pricesUpdate"
  ["обновлениеОстатков"]="stocksUpdate"
  ["текущиеЦены"]="currentPrices"
  ["текущиеОстатки"]="currentStocks"
  ["статусТаймеров"]="timerStatus"
  ["инфоПоСкладам"]="warehouseInfo"
  ["поступлениеТоваров"]="productArrivals"
  ["складId"]="warehouseId"
  ["успешноОбновлено"]="successCount"
  ["ошибок"]="errorCount"
  ["всегоОпераций"]="totalOperations"
  ["успешныхОпераций"]="successfulOperations"
  ["остаткиТовара"]="productStocks"
  ["распределениеОстатков"]="stockDistribution"
  ["результатТовара"]="productResult"
  ["исходный"]="original"
  ["общееПоступление"]="totalArrival"
)

# Process each file
for file in "${FILES[@]}"; do
  if [[ -f "$file" ]]; then
    echo "📝 Processing $(basename "$file")..."
    
    # Create backup
    cp "$file" "${file}.backup"
    
    # Replace function names
    for russian in "${!FUNCTION_MAP[@]}"; do
      english="${FUNCTION_MAP[$russian]}"
      sed -i '' "s/async function ${russian}/async function ${english}/g" "$file"
      echo "   ✅ ${russian} → ${english}"
    done
    
    # Replace variable names
    for russian in "${!VARIABLE_MAP[@]}"; do
      english="${VARIABLE_MAP[$russian]}"
      # Replace in const/let/var declarations
      sed -i '' "s/const ${russian} =/const ${english} =/g" "$file"
      sed -i '' "s/let ${russian} =/let ${english} =/g" "$file"
      # Replace in usage (be careful with word boundaries)
      sed -i '' "s/\\.${russian}\\./.${english}./g" "$file"
      sed -i '' "s/\\.${russian}\\?/.${english}?/g" "$file"
      sed -i '' "s/${russian}\\.result/${english}.result/g" "$file"
      sed -i '' "s/${russian}\\.forEach/${english}.forEach/g" "$file"
      sed -i '' "s/\\$\{${russian}/\${${english}/g" "$file"
      echo "   🔄 ${russian} → ${english}"
    done
    
    echo "   ✅ Completed $(basename "$file")"
  else
    echo "   ❌ File not found: $file"
  fi
done

echo "🎉 Function name conversion completed!"
echo "💾 Backup files created with .backup extension"