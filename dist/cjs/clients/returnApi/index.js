"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnAPI = void 0;
class ReturnAPI {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async getFbsReturnsInfo(params) {
        return this.httpClient.post('/v1/returns/company/fbs/info', params);
    }
    async checkGiveoutAccess(params = {}) {
        return this.httpClient.post('/v1/return/giveout/is-enabled', params);
    }
    async listGiveouts(params) {
        return this.httpClient.post('/v1/return/giveout/list', params);
    }
    async getGiveoutInfo(params) {
        return this.httpClient.post('/v1/return/giveout/info', params);
    }
    async getBarcodeText(params = {}) {
        return this.httpClient.post('/v1/return/giveout/barcode', params);
    }
    async getBarcodePdf(params = {}) {
        return this.httpClient.post('/v1/return/giveout/get-pdf', params);
    }
    async getBarcodePng(params = {}) {
        return this.httpClient.post('/v1/return/giveout/get-png', params);
    }
    async resetBarcode(params = {}) {
        return this.httpClient.post('/v1/return/giveout/barcode-reset', params);
    }
    async *iterateDropOffPoints(params) {
        let lastId;
        let hasNext = true;
        while (hasNext) {
            const response = await this.getFbsReturnsInfo({
                ...params,
                pagination: {
                    ...(lastId && { last_id: lastId }),
                    limit: params.limit || 500
                }
            });
            const points = response.data.drop_off_points || [];
            if (points.length === 0) {
                hasNext = false;
            }
            else {
                yield points;
                lastId = points.slice(-1)[0]?.id;
                hasNext = response.data.has_next || false;
            }
        }
    }
    async *iterateGiveouts(params) {
        let lastId;
        let hasNext = true;
        while (hasNext) {
            const response = await this.listGiveouts({
                ...params,
                ...(lastId && { last_id: lastId }),
                limit: params.limit || 100
            });
            const giveouts = response.data.giveouts || [];
            if (giveouts.length === 0) {
                hasNext = false;
            }
            else {
                yield giveouts;
                lastId = giveouts.slice(-1)[0]?.id;
                hasNext = response.data.has_next || false;
            }
        }
    }
    async getReturnSummary() {
        const points = [];
        for await (const page of this.iterateDropOffPoints({ limit: 500 })) {
            points.push(...page);
        }
        const totalReturns = points.reduce((sum, p) => sum + (p.returns_count || 0), 0);
        const totalBoxes = points.reduce((sum, p) => sum + (p.box_count || 0), 0);
        return {
            totalDropOffPoints: points.length,
            totalReturns,
            totalBoxes,
            locations: points.map(p => ({
                name: p.name || 'Unknown',
                returns: p.returns_count || 0,
                boxes: p.box_count || 0
            }))
        };
    }
    async hasReturnsAvailable() {
        const info = await this.getFbsReturnsInfo({
            pagination: { limit: 1 }
        });
        return (info.data.drop_off_points?.length || 0) > 0;
    }
    async downloadBarcodes() {
        const [pdfResponse, pngResponse, textResponse] = await Promise.all([
            this.getBarcodePdf().catch(() => ({ data: {} })),
            this.getBarcodePng().catch(() => ({ data: {} })),
            this.getBarcodeText().catch(() => ({ data: {} }))
        ]);
        const pdfContent = pdfResponse.data.file_content ? pdfResponse.data : undefined;
        const pngContent = pngResponse.data.file_content ? pngResponse.data : undefined;
        const textContent = textResponse.data.barcode;
        return {
            ...(pdfContent && { pdf: pdfContent }),
            ...(pngContent && { png: pngContent }),
            ...(textContent && { text: textContent })
        };
    }
}
exports.ReturnAPI = ReturnAPI;
