import { DeliveryFbsCarriageManager } from './carriage';
import { DeliveryFbsActsManager } from './acts';
import { DeliveryFbsLabelsManager } from './labels';
import { DeliveryFbsPdfsManager } from './pdfs';
export class DeliveryFbsAPI {
    constructor(httpClient) {
        this.carriage = new DeliveryFbsCarriageManager(httpClient);
        this.acts = new DeliveryFbsActsManager(httpClient);
        this.labels = new DeliveryFbsLabelsManager(httpClient);
        this.pdfs = new DeliveryFbsPdfsManager(httpClient);
    }
    async createCarriage(...args) {
        return this.carriage.createCarriage(...args);
    }
    async approveCarriage(...args) {
        return this.carriage.approveCarriage(...args);
    }
    async setPostings(...args) {
        return this.carriage.setPostings(...args);
    }
    async cancelCarriage(...args) {
        return this.carriage.cancelCarriage(...args);
    }
    async getCarriageDeliveryList(...args) {
        return this.carriage.getCarriageDeliveryList(...args);
    }
    async getCarriage(...args) {
        return this.carriage.getCarriage(...args);
    }
    async createFBSAct(...args) {
        return this.acts.createFBSAct(...args);
    }
    async getAvailableCarriageList(...args) {
        return this.acts.getAvailableCarriageList(...args);
    }
    async *iterateAvailableCarriageList(...args) {
        yield* this.acts.iterateAvailableCarriageList(...args);
    }
    async splitFBSPosting(...args) {
        return this.acts.splitFBSPosting(...args);
    }
    async getActPostingsList(...args) {
        return this.acts.getActPostingsList(...args);
    }
    async getContainerLabels(...args) {
        return this.labels.getContainerLabels(...args);
    }
    async getBarcode(...args) {
        return this.labels.getBarcode(...args);
    }
    async getBarcodeText(...args) {
        return this.labels.getBarcodeText(...args);
    }
    async checkDigitalActStatus(...args) {
        return this.labels.checkDigitalActStatus(...args);
    }
    async getActPDF(...args) {
        return this.pdfs.getActPDF(...args);
    }
    async getFBSActsList(...args) {
        return this.pdfs.getFBSActsList(...args);
    }
    async *iterateFBSActsList(...args) {
        yield* this.pdfs.iterateFBSActsList(...args);
    }
    async getDigitalActPDF(...args) {
        return this.pdfs.getDigitalActPDF(...args);
    }
    async checkActStatus(...args) {
        return this.labels.checkActStatus(...args);
    }
}
