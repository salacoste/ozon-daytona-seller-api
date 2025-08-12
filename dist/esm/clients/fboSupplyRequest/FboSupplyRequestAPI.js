import { FboSupplyRequestDrafts } from './drafts';
import { FboSupplyRequestSupply } from './supply';
import { FboSupplyRequestCargoes } from './cargoes';
import { FboSupplyRequestOrders } from './orders';
export class FboSupplyRequestAPI {
    constructor(httpClient) {
        this.drafts = new FboSupplyRequestDrafts(httpClient);
        this.supply = new FboSupplyRequestSupply(httpClient);
        this.cargoes = new FboSupplyRequestCargoes(httpClient);
        this.orders = new FboSupplyRequestOrders(httpClient);
    }
    async getClusterList(params) {
        return this.drafts.getClusterList(params);
    }
    async getWarehouseFboList(params) {
        return this.drafts.getWarehouseFboList(params);
    }
    async createDraft(params) {
        return this.drafts.createDraft(params);
    }
    async getDraftCreateInfo(params) {
        return this.drafts.getDraftCreateInfo(params);
    }
    async getDraftTimeslotInfo(params) {
        return this.drafts.getDraftTimeslotInfo(params);
    }
    async createSupply(params) {
        return this.supply.createSupply(params);
    }
    async getSupplyCreateStatus(params) {
        return this.supply.getSupplyCreateStatus(params);
    }
    async createCargoes(params) {
        return this.cargoes.createCargoes(params);
    }
    async getCargoesCreateInfo(params) {
        return this.cargoes.getCargoesCreateInfo(params);
    }
    async deleteCargoes(params) {
        return this.cargoes.deleteCargoes(params);
    }
    async getCargoesDeleteStatus(params) {
        return this.cargoes.getCargoesDeleteStatus(params);
    }
    async getCargoesRules(params) {
        return this.cargoes.getCargoesRules(params);
    }
    async createCargoesLabel(params) {
        return this.cargoes.createCargoesLabel(params);
    }
    async getCargoesLabel(params) {
        return this.cargoes.getCargoesLabel(params);
    }
    async getCargoesLabelFile(file_guid) {
        return this.cargoes.getCargoesLabelFile(file_guid);
    }
    async cancelSupplyOrder(params) {
        return this.orders.cancelSupplyOrder(params);
    }
    async getSupplyOrderCancelStatus(params) {
        return this.orders.getSupplyOrderCancelStatus(params);
    }
    async updateSupplyOrderContent(params) {
        return this.orders.updateSupplyOrderContent(params);
    }
    async getSupplyOrderContentUpdateStatus(params) {
        return this.orders.getSupplyOrderContentUpdateStatus(params);
    }
}
