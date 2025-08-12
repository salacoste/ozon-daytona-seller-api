import type { PolygonBinding, WarehouseLocation } from './base';
export interface CreatePolygonRequest {
    coordinates: string;
}
export interface BindPolygonRequest {
    delivery_method_id: number;
    polygons: PolygonBinding[];
    warehouse_location: WarehouseLocation;
}
