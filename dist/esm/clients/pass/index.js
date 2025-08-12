export class PassAPI {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async listPasses(params) {
        return this.httpClient.post('/v1/pass/list', params);
    }
    async createCarriagePass(params) {
        return this.httpClient.post('/v1/carriage/pass/create', params);
    }
    async updateCarriagePass(params) {
        return this.httpClient.post('/v1/carriage/pass/update', params);
    }
    async deleteCarriagePass(params) {
        return this.httpClient.post('/v1/carriage/pass/delete', params);
    }
    async createReturnPass(params) {
        return this.httpClient.post('/v1/return/pass/create', params);
    }
    async updateReturnPass(params) {
        return this.httpClient.post('/v1/return/pass/update', params);
    }
    async deleteReturnPass(params) {
        return this.httpClient.post('/v1/return/pass/delete', params);
    }
    async *iteratePasses(params) {
        let cursor;
        let hasNext = true;
        while (hasNext) {
            const response = await this.listPasses({
                ...params,
                ...(cursor && { cursor })
            });
            const passes = response.data.arrival_passes || [];
            if (passes.length === 0) {
                hasNext = false;
            }
            else {
                yield passes;
                cursor = response.data.cursor;
                hasNext = !!cursor;
            }
        }
    }
    async getActivePassesForWarehouses(warehouseIds) {
        const response = await this.listPasses({
            limit: 1000,
            filter: {
                warehouse_ids: warehouseIds,
                only_active_passes: true
            }
        });
        return response.data.arrival_passes || [];
    }
    async checkPassStatus(passId) {
        const response = await this.listPasses({
            limit: 1,
            filter: {
                arrival_pass_ids: [passId]
            }
        });
        const pass = response.data.arrival_passes?.[0];
        return pass?.is_active ? pass : null;
    }
    async createPassWithValidation(passData, carriageId) {
        const phoneRegex = /^\+7\d{10}$/;
        if (!phoneRegex.test(passData.driver_phone)) {
            return {
                success: false,
                error: 'Invalid phone format. Use +7XXXXXXXXXX'
            };
        }
        if (!passData.vehicle_license_plate || passData.vehicle_license_plate.length < 6) {
            return {
                success: false,
                error: 'Invalid license plate format'
            };
        }
        try {
            if (carriageId) {
                const response = await this.createCarriagePass({
                    carriage_id: carriageId,
                    arrival_passes: [passData]
                });
                const passId = response.data.arrival_pass_ids?.[0];
                return {
                    success: true,
                    ...(passId && { passId })
                };
            }
            else {
                const response = await this.createReturnPass({
                    arrival_passes: [passData]
                });
                const passId = response.data.arrival_pass_ids?.[0];
                return {
                    success: true,
                    ...(passId && { passId })
                };
            }
        }
        catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    }
}
