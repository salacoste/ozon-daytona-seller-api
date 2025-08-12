"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolygonAPI = void 0;
class PolygonAPI {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async createPolygon(params) {
        return this.httpClient.post('/v1/polygon/create', params);
    }
    async bindPolygon(params) {
        return this.httpClient.post('/v1/polygon/bind', params);
    }
    validateCoordinates(coordinates) {
        const errors = [];
        if (!coordinates || coordinates.trim() === '') {
            errors.push('Coordinates not provided');
            return { isValid: false, errors };
        }
        try {
            const parsed = JSON.parse(coordinates);
            if (!Array.isArray(parsed) || !Array.isArray(parsed[0]) || !Array.isArray(parsed[0][0])) {
                errors.push('Invalid coordinate structure, expected [[[lat,lng],...]]');
                return { isValid: false, errors };
            }
            const coordinateLoop = parsed[0][0];
            if (coordinateLoop.length < 4) {
                errors.push('Non-full loops must have at least 4 unique vertices for polygons');
            }
            for (let i = 0; i < coordinateLoop.length; i++) {
                const point = coordinateLoop[i];
                if (!Array.isArray(point) || point.length !== 2) {
                    errors.push(`Invalid coordinates, must have two points in coordinate at index ${i}`);
                }
            }
            const firstPoint = coordinateLoop[0];
            const lastPoint = coordinateLoop[coordinateLoop.length - 1];
            if (JSON.stringify(firstPoint) !== JSON.stringify(lastPoint)) {
                errors.push('The first and last points in loop must be same');
            }
        }
        catch (parseError) {
            errors.push('Invalid JSON format for coordinates');
        }
        return { isValid: errors.length === 0, errors };
    }
    createCoordinatesString(points) {
        if (points.length < 3) {
            throw new Error('At least 3 points are required to create a polygon');
        }
        const coordinates = points.map(point => [point.lng, point.lat]);
        if (points[0]) {
            coordinates.push([points[0].lng, points[0].lat]);
        }
        return JSON.stringify([coordinates]);
    }
}
exports.PolygonAPI = PolygonAPI;
