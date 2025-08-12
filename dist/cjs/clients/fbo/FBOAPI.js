"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FBOAPI = void 0;
const core_1 = require("./core");
const supplyOrders_1 = require("./supplyOrders");
const timeslots_1 = require("./timeslots");
const passes_1 = require("./passes");
class FBOAPI {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.core = new core_1.FBOCore(httpClient);
        this.supplyOrders = new supplyOrders_1.FBOSupplyOrders(httpClient);
        this.timeslots = new timeslots_1.FBOTimeslots(httpClient);
        this.passes = new passes_1.FBOPasses(httpClient);
    }
    async getPostingListV2(params) {
        return this.core.list(params);
    }
    async getPostingV2(params) {
        return this.core.get(params);
    }
    async getPostingCancelReasonListV1() {
        return this.core.getCancelReasons();
    }
    async getSupplyOrderStatusCounterV1() {
        return this.supplyOrders.getStatusCounters();
    }
    async getSupplyOrderBundleV1(params) {
        return this.supplyOrders.getBundle(params);
    }
    async list(params) {
        return this.getPostingListV2(params);
    }
    async get(params) {
        return this.getPostingV2(params);
    }
    async getCancelReasons() {
        return this.getPostingCancelReasonListV1();
    }
    async getSupplyOrderStatusCounters() {
        return this.getSupplyOrderStatusCounterV1();
    }
    async getSupplyOrderBundle(params) {
        return this.getSupplyOrderBundleV1(params);
    }
    async getSupplyOrdersListV2(params) {
        return this.supplyOrders.getList(params);
    }
    async getSupplyOrdersV2(params) {
        return this.supplyOrders.get(params);
    }
    async getSupplierAvailableWarehousesV1() {
        return this.supplyOrders.getAvailableWarehouses();
    }
    async getSupplyOrdersList(params) {
        return this.getSupplyOrdersListV2(params);
    }
    async getSupplyOrder(params) {
        return this.getSupplyOrdersV2(params);
    }
    async getAvailableWarehouses() {
        return this.getSupplierAvailableWarehousesV1();
    }
    async getSupplyOrderTimeslotsV1(params) {
        return this.timeslots.get(params);
    }
    async updateSupplyOrderTimeslotV1(params) {
        return this.timeslots.update(params);
    }
    async getSupplyOrderTimeslotStatusV1(params) {
        return this.timeslots.getStatus(params);
    }
    async supplyOrderPassCreateV1(params) {
        return this.passes.create(params);
    }
    async getSupplyOrderPassStatusV1(params) {
        return this.passes.getStatus(params);
    }
    async getSupplyOrderTimeslots(params) {
        return this.getSupplyOrderTimeslotsV1(params);
    }
    async updateSupplyOrderTimeslot(params) {
        return this.updateSupplyOrderTimeslotV1(params);
    }
    async getSupplyOrderTimeslotStatus(params) {
        return this.getSupplyOrderTimeslotStatusV1(params);
    }
    async createSupplyOrderPass(params) {
        return this.supplyOrderPassCreateV1(params);
    }
    async getSupplyOrderPassStatus(params) {
        return this.getSupplyOrderPassStatusV1(params);
    }
    iteratePostingListV2(params, config) {
        return this.core.iterateOrders(params, config);
    }
    iterateSupplyOrderBundleV1(params, config) {
        return this.supplyOrders.iterateBundle(params, config);
    }
    iterateSupplyOrdersListV2(params, config) {
        return this.supplyOrders.iterateSupplyOrders(params, config);
    }
    iterateSupplyOrders(params, config) {
        return this.iterateSupplyOrdersListV2(params, config);
    }
    iterateOrders(params, config) {
        return this.iteratePostingListV2(params, config);
    }
}
exports.FBOAPI = FBOAPI;
