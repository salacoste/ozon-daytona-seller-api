"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryrFBSAPI = void 0;
class DeliveryrFBSAPI {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async setTrackingNumbers(params) {
        return this.httpClient.post('/v2/fbs/posting/tracking-number/set', params);
    }
    async setSentBySeller(params) {
        return this.httpClient.post('/v2/fbs/posting/sent-by-seller', params);
    }
    async setDelivering(params) {
        return this.httpClient.post('/v2/fbs/posting/delivering', params);
    }
    async setLastMile(params) {
        return this.httpClient.post('/v2/fbs/posting/last-mile', params);
    }
    async setDelivered(params) {
        return this.httpClient.post('/v2/fbs/posting/delivered', params);
    }
    async getTimeslotChangeRestrictions(params) {
        return this.httpClient.post('/v1/posting/fbs/timeslot/change-restrictions', params);
    }
    async setTimeslot(params) {
        return this.httpClient.post('/v1/posting/fbs/timeslot/set', params);
    }
    async setCutoff(params) {
        return this.httpClient.post('/v1/posting/cutoff/set', params);
    }
    async batchUpdateStatus(postingNumbers, status) {
        let response;
        switch (status) {
            case 'sent':
                response = await this.setSentBySeller({ posting_number: postingNumbers });
                break;
            case 'delivering':
                response = await this.setDelivering({ posting_number: postingNumbers });
                break;
            case 'last_mile':
                response = await this.setLastMile({ posting_number: postingNumbers });
                break;
            case 'delivered':
                response = await this.setDelivered({ posting_number: postingNumbers });
                break;
        }
        const results = response.data.result || [];
        const successful = [];
        const failed = [];
        results.forEach((result) => {
            if (result.result && result.posting_number) {
                successful.push(result.posting_number);
            }
            else if (result.posting_number) {
                failed.push({
                    posting_number: result.posting_number,
                    error: result.error || 'Unknown error'
                });
            }
        });
        return {
            successful,
            failed,
            total: postingNumbers.length
        };
    }
    async canRescheduleDelivery(postingNumber) {
        const restrictions = await this.getTimeslotChangeRestrictions({
            posting_number: postingNumber
        });
        const remainingChanges = restrictions.data.remaining_changes_count || 0;
        const canReschedule = remainingChanges > 0;
        return {
            canReschedule,
            remainingChanges,
            availablePeriod: restrictions.data.delivery_interval ? {
                begin: restrictions.data.delivery_interval.begin || '',
                end: restrictions.data.delivery_interval.end || ''
            } : undefined
        };
    }
}
exports.DeliveryrFBSAPI = DeliveryrFBSAPI;
