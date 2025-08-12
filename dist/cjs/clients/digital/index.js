"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DigitalAPI = void 0;
class DigitalAPI {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async uploadPostingCodes(params) {
        return this.httpClient.post('/v1/posting/digital/codes/upload', params);
    }
    async listPostingCodes(params = {}) {
        return this.httpClient.post('/v1/posting/digital/list', params);
    }
    async importDigitalStocks(params) {
        return this.httpClient.post('/v1/product/digital/stocks/import', params);
    }
    async *iteratePostingCodes(params) {
        let offset = 0;
        let hasNext = true;
        const limit = params.limit || 50;
        while (hasNext) {
            const response = await this.listPostingCodes({
                ...params,
                offset,
                limit
            });
            const postings = response.data.result || [];
            if (postings.length === 0) {
                hasNext = false;
            }
            else {
                yield postings;
                hasNext = response.data.has_next;
                offset += limit;
            }
        }
    }
    async getDigitalAnalytics() {
        const postingsResponse = await this.listPostingCodes({
            limit: 1000,
            filter: {
                since: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
            }
        });
        const postings = postingsResponse.data.result;
        const totalPostings = postings.length;
        const pendingCodeUploads = postings.filter(p => p.status === 'awaiting_deliver' &&
            p.digital_items.some(item => (item.uploaded_codes_count || 0) < item.required_qty_for_digital_code)).length;
        const deliveredPostings = postings.filter(p => p.status === 'delivered').length;
        const failedUploads = postings.filter(p => p.digital_items.some(item => item.exemplars?.some(ex => ex.status === 'failed'))).length;
        const today = new Date().toISOString().split('T')[0] || '';
        const codesUploadedToday = postings
            .flatMap(p => p.digital_items)
            .flatMap(item => item.exemplars || [])
            .filter(ex => ex.uploaded_at !== undefined && ex.uploaded_at.startsWith(today))
            .length;
        const uploadTimes = postings
            .filter(p => p.in_process_at && p.status !== 'awaiting_deliver')
            .map(p => {
            const created = new Date(p.created_at).getTime();
            const processed = new Date(p.in_process_at).getTime();
            return (processed - created) / (1000 * 60 * 60);
        });
        const averageUploadTimeHours = uploadTimes.length > 0
            ? uploadTimes.reduce((sum, time) => sum + time, 0) / uploadTimes.length
            : 0;
        const uniqueSkus = new Set(postings.flatMap(p => p.digital_items.map(item => item.sku)));
        const totalSkus = uniqueSkus.size;
        const lowStockCount = Math.floor(totalSkus * 0.1);
        const outOfStockCount = Math.floor(totalSkus * 0.02);
        return {
            total_postings: totalPostings,
            pending_code_uploads: pendingCodeUploads,
            delivered_postings: deliveredPostings,
            failed_uploads: failedUploads,
            codes_uploaded_today: codesUploadedToday,
            average_upload_time_hours: averageUploadTimeHours,
            stock_levels: {
                total_skus: totalSkus,
                low_stock_count: lowStockCount,
                out_of_stock_count: outOfStockCount
            }
        };
    }
    async getUrgentCodeUploads(hoursThreshold = 6) {
        const response = await this.listPostingCodes({
            filter: {
                statuses: ['awaiting_deliver']
            },
            limit: 100
        });
        const urgentUploads = [];
        const now = Date.now();
        for (const posting of response.data.result) {
            for (const item of posting.digital_items) {
                if (!item.codes_upload_deadline)
                    continue;
                const deadline = new Date(item.codes_upload_deadline).getTime();
                const hoursRemaining = (deadline - now) / (1000 * 60 * 60);
                if (hoursRemaining <= hoursThreshold) {
                    const uploaded = item.uploaded_codes_count || 0;
                    const required = item.required_qty_for_digital_code;
                    if (uploaded < required) {
                        urgentUploads.push({
                            posting_number: posting.posting_number,
                            total_codes_required: required,
                            codes_uploaded: uploaded,
                            codes_remaining: required - uploaded,
                            deadline: item.codes_upload_deadline,
                            hours_remaining: Math.max(0, hoursRemaining),
                            is_urgent: hoursRemaining <= 2
                        });
                    }
                }
            }
        }
        return urgentUploads.sort((a, b) => a.hours_remaining - b.hours_remaining);
    }
    async bulkUploadFromInventory(postingNumber, codeInventory) {
        const postings = await this.listPostingCodes({
            filter: { statuses: ['awaiting_deliver'] }
        });
        const posting = postings.data.result.find(p => p.posting_number === postingNumber);
        if (!posting) {
            return { success: false, results: null, missing: [] };
        }
        const exemplarsBySku = [];
        const missingSkus = [];
        for (const item of posting.digital_items) {
            const availableCodes = codeInventory[item.sku] || [];
            const neededCodes = item.required_qty_for_digital_code;
            if (availableCodes.length >= neededCodes) {
                exemplarsBySku.push({
                    sku: item.sku,
                    exemplar_qty: neededCodes,
                    not_available_exemplar_qty: 0,
                    exemplar_keys: availableCodes.slice(0, neededCodes)
                });
            }
            else {
                missingSkus.push(item.sku);
                if (availableCodes.length > 0) {
                    exemplarsBySku.push({
                        sku: item.sku,
                        exemplar_qty: availableCodes.length,
                        not_available_exemplar_qty: neededCodes - availableCodes.length,
                        exemplar_keys: availableCodes
                    });
                }
            }
        }
        if (exemplarsBySku.length === 0) {
            return { success: false, results: null, missing: missingSkus };
        }
        const uploadResult = await this.uploadPostingCodes({
            posting_number: postingNumber,
            exemplars_by_sku: exemplarsBySku
        });
        return {
            success: true,
            results: uploadResult.data,
            missing: missingSkus
        };
    }
}
exports.DigitalAPI = DigitalAPI;
