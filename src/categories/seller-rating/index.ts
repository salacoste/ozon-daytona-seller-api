/**
 * SellerRating API implementation
 * Seller performance rating
 */

import { HttpClient } from "../../core/http.js";
import type { RequestOptions } from "../../core/types.js";
import type { SellerRatingHistoryRequest } from "../../types/requests/seller-rating.js";
import type { SellerRatingHistoryResponse, SellerRatingSummaryResponse } from "../../types/responses/seller-rating.js";
import type { EmptyRequest } from "../../types/common/base.js";

/**
 * SellerRating API для получения информации о рейтингах продавца
 * SellerRating API for getting seller performance ratings information
 *
 * 📊 Соответствует разделу "Рейтинги → Рейтинги продавца" в личном кабинете
 * 📊 Corresponds to "Ratings → Seller Ratings" section in seller dashboard
 *
 * @example
 * ```typescript
 * // Получить текущие рейтинги продавца
 * const currentRatings = await sellerRatingApi.getCurrentRatings();
 *
 * // Получить историю рейтингов за месяц
 * const ratingHistory = await sellerRatingApi.getRatingHistory({
 *   date_from: '2024-01-01T00:00:00Z',
 *   date_to: '2024-01-31T23:59:59Z',
 *   ratings: ['rating_on_time', 'rating_review_avg_score_total'],
 *   with_premium_scores: true
 * });
 * ```
 */
export class SellerRatingApi {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Получить текущие рейтинги продавца
   * Get current seller ratings
   *
   * Возвращает текущий рейтинг продавца по всем показателям: индекс цен, доставки
   * вовремя, процент отмен, жалобы и другие. Соответствует разделу "Рейтинги →
   * Рейтинги продавца" в личном кабинете.
   *
   * @param options - Дополнительные опции запроса
   * @returns Текущие рейтинги продавца
   *
   * @example
   * ```typescript
   * const currentRatings = await sellerRatingApi.getCurrentRatings();
   *
   * console.log(`Premium статус: ${currentRatings.premium ? 'активен' : 'неактивен'}`);
   * console.log(`Premium Plus статус: ${currentRatings.premium_plus ? 'активен' : 'неактивен'}`);
   * console.log(`Штрафные баллы превышены: ${currentRatings.penalty_score_exceeded ? 'да' : 'нет'}`);
   *
   * // Обработать группы рейтингов
   * currentRatings.groups?.forEach(group => {
   *   console.log(`\nГруппа: ${group.group_name}`);
   *
   *   group.items?.forEach(item => {
   *     console.log(`  Рейтинг: ${item.name} (${item.rating})`);
   *     console.log(`  Текущее значение: ${item.current_value}`);
   *     console.log(`  Предыдущее значение: ${item.past_value}`);
   *     console.log(`  Статус: ${item.status}`);
   *     console.log(`  Тип значения: ${item.value_type}`);
   *     console.log(`  Направление: ${item.rating_direction}`);
   *
   *     if (item.change) {
   *       const changeIcon = item.change.direction === 'DIRECTION_RISE' ? '↗️' :
   *                         item.change.direction === 'DIRECTION_FALL' ? '↘️' : '➡️';
   *       const meaningIcon = item.change.meaning === 'MEANING_GOOD' ? '✅' :
   *                          item.change.meaning === 'MEANING_BAD' ? '❌' : '🔄';
   *       console.log(`  Изменение: ${changeIcon} ${meaningIcon}`);
   *     }
   *   });
   * });
   *
   * // Показать информацию об индексе локализации
   * if (currentRatings.localization_index && currentRatings.localization_index.length > 0) {
   *   const locIndex = currentRatings.localization_index[0];
   *   console.log(`\nИндекс локализации: ${locIndex.localization_percentage}%`);
   *   console.log(`Дата расчёта: ${locIndex.calculation_date}`);
   * } else {
   *   console.log('\nИндекс локализации: нет данных (нет продаж за последние 14 дней)');
   * }
   *
   * // Найти критичные рейтинги
   * const criticalRatings: RatingItem[] = [];
   * currentRatings.groups?.forEach(group => {
   *   group.items?.forEach(item => {
   *     if (item.status === 'CRITICAL') {
   *       criticalRatings.push(item);
   *     }
   *   });
   * });
   *
   * if (criticalRatings.length > 0) {
   *   console.log('\n⚠️ КРИТИЧНЫЕ РЕЙТИНГИ:');
   *   criticalRatings.forEach(rating => {
   *     console.log(`  - ${rating.name}: ${rating.current_value}`);
   *   });
   * }
   * ```
   */
  async getCurrentRatings(options?: RequestOptions): Promise<SellerRatingSummaryResponse> {
    return this.httpClient.request<EmptyRequest, SellerRatingSummaryResponse>("POST", "/v1/rating/summary", {}, options);
  }

  /**
   * Получить историю рейтингов продавца за период
   * Get seller rating history for period
   *
   * Возвращает информацию о рейтингах за заданный период с фильтром по нужным
   * рейтингам. Позволяет отслеживать динамику изменения показателей продавца.
   *
   * @param request - Параметры запроса истории рейтингов
   * @param options - Дополнительные опции запроса
   * @returns История рейтингов за период
   *
   * @example
   * ```typescript
   * // Получить историю основных рейтингов за последний месяц
   * const lastMonth = new Date();
   * lastMonth.setMonth(lastMonth.getMonth() - 1);
   *
   * const ratingHistory = await sellerRatingApi.getRatingHistory({
   *   date_from: lastMonth.toISOString(),
   *   date_to: new Date().toISOString(),
   *   ratings: [
   *     'rating_on_time',                // Заказы вовремя
   *     'rating_review_avg_score_total', // Средняя оценка
   *     'rating_price',                  // Индекс цен
   *     'rating_order_cancellation'      // Отмены заказов
   *   ],
   *   with_premium_scores: true
   * });
   *
   * // Обработать рейтинги
   * ratingHistory.ratings?.forEach(rating => {
   *   console.log(`\nРейтинг: ${rating.rating}`);
   *   console.log(`Пороги: опасный=${rating.danger_threshold}, премиум=${rating.premium_threshold}, предупреждение=${rating.warning_threshold}`);
   *
   *   // Показать значения по периодам
   *   rating.values?.forEach(value => {
   *     console.log(`  Период: ${value.date_from} - ${value.date_to}`);
   *     console.log(`  Значение: ${value.value}`);
   *
   *     if (value.status) {
   *       const statusFlags = [];
   *       if (value.status.danger) statusFlags.push('ОПАСНО');
   *       if (value.status.warning) statusFlags.push('ПРЕДУПРЕЖДЕНИЕ');
   *       if (value.status.premium) statusFlags.push('ПРЕМИУМ');
   *       console.log(`  Статус: ${statusFlags.join(', ') || 'ОК'}`);
   *     }
   *   });
   * });
   *
   * // Показать штрафные баллы Premium
   * if (ratingHistory.premium_scores && ratingHistory.premium_scores.length > 0) {
   *   console.log('\n💰 ШТРАФНЫЕ БАЛЛЫ PREMIUM:');
   *   ratingHistory.premium_scores.forEach(premiumScore => {
   *     console.log(`Рейтинг: ${premiumScore.rating}`);
   *     premiumScore.scores?.forEach(score => {
   *       console.log(`  Дата: ${score.date}`);
   *       console.log(`  Значение рейтинга: ${score.rating_value}`);
   *       console.log(`  Штрафных баллов: ${score.value}`);
   *     });
   *   });
   * }
   *
   * // Функция для мониторинга критичных изменений
   * const analyzeRatingTrends = (history: SellerRatingHistoryResponse) => {
   *   const alerts: string[] = [];
   *
   *   history.ratings?.forEach(rating => {
   *     const values = rating.values || [];
   *     if (values.length >= 2) {
   *       const latest = values[values.length - 1];
   *       const previous = values[values.length - 2];
   *
   *       if (latest.status?.danger && !previous.status?.danger) {
   *         alerts.push(`🚨 Рейтинг ${rating.rating} достиг опасного уровня!`);
   *       } else if (latest.status?.warning && !previous.status?.warning) {
   *         alerts.push(`⚠️ Рейтинг ${rating.rating} требует внимания`);
   *       }
   *     }
   *   });
   *
   *   return alerts;
   * };
   *
   * const alerts = analyzeRatingTrends(ratingHistory);
   * if (alerts.length > 0) {
   *   console.log('\n🔔 УВЕДОМЛЕНИЯ:');
   *   alerts.forEach(alert => console.log(alert));
   * }
   *
   * // Пример запроса детальной истории по одному рейтингу
   * const detailedOnTimeHistory = await sellerRatingApi.getRatingHistory({
   *   date_from: '2024-01-01T00:00:00Z',
   *   date_to: '2024-12-31T23:59:59Z',
   *   ratings: ['rating_on_time'],
   *   with_premium_scores: false
   * });
   *
   * console.log('\n📈 ДИНАМИКА РЕЙТИНГА "ЗАКАЗЫ ВОВРЕМЯ":');
   * detailedOnTimeHistory.ratings?.[0]?.values?.forEach(value => {
   *   const date = new Date(value.date_from || '').toLocaleDateString();
   *   console.log(`${date}: ${value.value}%`);
   * });
   * ```
   */
  async getRatingHistory(request: SellerRatingHistoryRequest, options?: RequestOptions): Promise<SellerRatingHistoryResponse> {
    return this.httpClient.request<SellerRatingHistoryRequest, SellerRatingHistoryResponse>("POST", "/v1/rating/history", request, options);
  }
}
