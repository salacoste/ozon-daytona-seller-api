export interface ArrivalPass {
    arrival_pass_id?: number;
    arrival_reasons?: string[];
    arrival_time?: string;
    driver_name?: string;
    driver_phone?: string;
    dropoff_point_id?: number;
    is_active?: boolean;
    vehicle_license_plate?: string;
    vehicle_model?: string;
    warehouse_id?: number;
}
export declare enum ArrivalReason {
    FBS_DELIVERY = "FBS_DELIVERY",
    FBS_RETURN = "FBS_RETURN"
}
export interface PassCreateData {
    driver_name: string;
    driver_phone: string;
    vehicle_license_plate: string;
    vehicle_model: string;
    with_returns?: boolean;
}
export interface PassUpdateData extends PassCreateData {
    id: number;
}
