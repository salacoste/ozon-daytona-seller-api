"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FBSLegacy = void 0;
const core_1 = require("./core");
const extended_1 = require("./extended");
const management_1 = require("./management");
class FBSLegacy {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.core = new core_1.FBSCore(httpClient);
        this.extended = new extended_1.FBSExtended(httpClient);
        this.management = new management_1.FBSManagement(httpClient);
    }
    async list(params = {}) {
        const v3Params = {
            dir: params.dir || 'ASC',
            filter: params.filter ? {
                since: params.filter.since || '',
                to: params.filter.to || '',
                ...(params.filter.status && { status: params.filter.status }),
                ...(params.filter.delivery_method_id && { delivery_method_id: params.filter.delivery_method_id }),
                ...(params.filter.provider_id && { provider_id: params.filter.provider_id }),
                ...(params.filter.warehouse_id && { warehouse_id: params.filter.warehouse_id.map(String) }),
            } : {
                since: '',
                to: ''
            },
            limit: params.limit ?? 100,
            offset: params.offset ?? 0,
        };
        return this.core.listV3(v3Params);
    }
    async get(postingNumber) {
        return this.core.getV3({
            posting_number: postingNumber,
            with: {
                analytics_data: true,
                barcodes: true,
                financial_data: false,
            }
        });
    }
    async getUnfulfilled(params = {}) {
        return this.core.getUnfulfilledV3({
            dir: 'ASC',
            filter: {
                cutoff_from: params.cutoff_from || '',
                cutoff_to: params.cutoff_to || '',
            },
            limit: params.limit ?? 100,
            offset: params.offset ?? 0,
        });
    }
    async getPackageLabel(postingNumbers) {
        const response = await this.extended.getPackageLabelPdfV2({
            posting_number: postingNumbers,
        });
        const contentString = response.data.content instanceof Uint8Array
            ? Buffer.from(response.data.content).toString('base64')
            : String(response.data.content || '');
        return {
            ...response,
            data: {
                result: contentString
            }
        };
    }
    async ship(params) {
        return this.httpClient.post('/v2/posting/fbs/ship', params);
    }
    async cancel(postingNumber, cancelReasonId) {
        return this.management.cancelPosting({
            posting_number: postingNumber,
            cancel_reason_id: cancelReasonId,
        });
    }
    async getDeliveryMethods() {
        return this.httpClient.post('/v1/delivery-method/list', {});
    }
    async getCancelReasons() {
        return this.management.getCancelReasonsList();
    }
    async createDigitalCodes(params) {
        return this.httpClient.post('/v1/posting/fbs/digital/codes', params);
    }
    async cancelPostingProducts(params) {
        return this.management.cancelPostingProducts(params);
    }
    async cancelPosting(params) {
        return this.management.cancelPosting(params);
    }
    async moveToArbitration(params) {
        return this.management.moveToArbitration(params);
    }
    async moveToAwaitingDelivery(params) {
        return this.management.moveToAwaitingDelivery(params);
    }
    async verifyPickupCode(params) {
        return this.management.verifyPickupCode(params);
    }
    async getETGB(params) {
        return this.management.getETGB(params);
    }
}
exports.FBSLegacy = FBSLegacy;
