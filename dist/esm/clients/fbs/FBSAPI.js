import { FBSCore } from './core';
import { FBSExtended } from './extended';
import { FBSManagement } from './management';
import { FBSLegacy } from './legacy';
import { FBSIterators } from './iterators';
export class FBSAPI {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.core = new FBSCore(httpClient);
        this.extended = new FBSExtended(httpClient);
        this.management = new FBSManagement(httpClient);
        this.legacy = new FBSLegacy(httpClient);
        this.iterators = new FBSIterators(this);
    }
    async getUnfulfilledV3(params) {
        return this.core.getUnfulfilledV3(params);
    }
    async listV3(params) {
        return this.core.listV3(params);
    }
    async getV3(params) {
        return this.core.getV3(params);
    }
    async getByBarcode(params) {
        return this.core.getByBarcode(params);
    }
    async setMultiBoxQuantity(params) {
        return this.core.setMultiBoxQuantity(params);
    }
    async changeProduct(params) {
        return this.core.changeProduct(params);
    }
    async listProductCountryV2(params) {
        return this.extended.listProductCountryV2(params);
    }
    async setProductCountryV2(params) {
        return this.extended.setProductCountryV2(params);
    }
    async getRestrictionsV1(params) {
        return this.extended.getRestrictionsV1(params);
    }
    async getPackageLabelPdfV2(params) {
        return this.extended.getPackageLabelPdfV2(params);
    }
    async createLabelBatchV1(params) {
        return this.extended.createLabelBatchV1(params);
    }
    async createLabelBatchV2(params) {
        return this.extended.createLabelBatchV2(params);
    }
    async getLabelBatchV1(params) {
        return this.extended.getLabelBatchV1(params);
    }
    async getCancelReasonV1(params) {
        return this.extended.getCancelReasonV1(params);
    }
    async getCancelReasonListV2(params) {
        return this.extended.getCancelReasonListV2(params);
    }
    async cancelPostingProductV2(params) {
        return this.management.cancelPostingProducts(params);
    }
    async cancelPostingV2(params) {
        return this.management.cancelPosting(params);
    }
    async moveToArbitrationV2(params) {
        return this.management.moveToArbitration(params);
    }
    async moveToAwaitingDeliveryV2(params) {
        return this.management.moveToAwaitingDelivery(params);
    }
    async verifyPickupCodeV1(params) {
        return this.management.verifyPickupCode(params);
    }
    async getEtgbV1(params) {
        return this.management.getETGB(params);
    }
    async getUnpaidLegalProductListV1(params) {
        return this.management.getUnpaidLegalProducts(params);
    }
    async getCountryList(params) {
        return this.listProductCountryV2(params);
    }
    async setProductCountry(params) {
        return this.setProductCountryV2(params);
    }
    async getRestrictions(params) {
        return this.getRestrictionsV1(params);
    }
    async getPackageLabelsV2(params) {
        return this.getPackageLabelPdfV2(params);
    }
    async createLabelBatch(params) {
        return this.createLabelBatchV1(params);
    }
    async getLabelBatch(params) {
        return this.getLabelBatchV1(params);
    }
    async getCancelReasonById(params) {
        return this.getCancelReasonV1(params);
    }
    async getCancelReasonsList(params) {
        return this.getCancelReasonListV2(params);
    }
    async cancelPostingProducts(params) {
        return this.cancelPostingProductV2(params);
    }
    async cancelPosting(params) {
        return this.cancelPostingV2(params);
    }
    async moveToArbitration(params) {
        return this.moveToArbitrationV2(params);
    }
    async moveToAwaitingDelivery(params) {
        return this.moveToAwaitingDeliveryV2(params);
    }
    async verifyPickupCode(params) {
        return this.verifyPickupCodeV1(params);
    }
    async getETGB(params) {
        return this.getEtgbV1(params);
    }
    async getUnpaidLegalProducts(params) {
        return this.getUnpaidLegalProductListV1(params);
    }
    async list(params) {
        return this.listV3(params);
    }
    async get(postingNumber, withOptions) {
        return this.getV3({
            posting_number: postingNumber,
            with: {
                analytics_data: withOptions?.analytics_data ?? true,
                barcodes: withOptions?.barcodes ?? true,
                financial_data: withOptions?.financial_data ?? false,
            },
        });
    }
    async ship(params) {
        return this.legacy.ship(params);
    }
    iterateUnfulfilled(params) {
        return this.iterators.iterateUnfulfilled(params);
    }
    iterateList(params) {
        return this.iterators.iterateList(params);
    }
    get managementMethods() { return this.management; }
    get legacyMethods() { return this.legacy; }
}
