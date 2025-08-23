/**
 * Request types for SellerRating API
 * Seller performance rating
 * Ready for manual editing and enhancements
 */

/**
 * Типы рейтингов продавца
 * Seller rating types
 */
export type SellerRatingType = 
  | 'rating_on_time'                    // Процент заказов вовремя
  | 'rating_review_avg_score_total'     // Средняя оценка товаров
  | 'rating_price'                      // Индекс цен
  | 'rating_order_cancellation'         // Процент отмен FBS
  | 'rating_shipment_delay'             // Процент задержек FBS
  | 'rating_ssl'                        // Оценка работы по FBO
  | 'rating_on_time_supply_delivery'    // Процент поставок вовремя
  | 'rating_order_accuracy'             // Процент поставок без ошибок
  | 'rating_on_time_supply_cancellation' // Процент заявок без опоздания
  | 'rating_reaction_time'              // Время реакции в чате
  | 'rating_average_response_time'      // Среднее время ответа
  | 'rating_replied_dialogs_ratio';     // Доля диалогов с ответом

/**
 * Запрос истории рейтингов продавца
 * Seller rating history request
 */
export interface SellerRatingHistoryRequest {
  /** 
   * Начало периода
   * Period start date
   */
  date_from: string;
  
  /** 
   * Конец периода
   * Period end date
   */
  date_to: string;
  
  /** 
   * Фильтр по типам рейтингов
   * Rating types filter
   */
  ratings: SellerRatingType[];
  
  /** 
   * Включить информацию о штрафных баллах Premium
   * Include Premium penalty scores information
   */
  with_premium_scores?: boolean;
  
  readonly [key: string]: unknown;
}