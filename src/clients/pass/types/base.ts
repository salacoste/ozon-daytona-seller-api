/**
 * Pass API base types
 */

/**
 * Arrival pass information
 */
export interface ArrivalPass {
  /** Pass identifier */
  arrival_pass_id?: number;
  /** Arrival reasons list */
  arrival_reasons?: string[];
  /** Arrival time in UTC format */
  arrival_time?: string;
  /** Driver full name */
  driver_name?: string;
  /** Driver phone number */
  driver_phone?: string;
  /** Dropoff point identifier */
  dropoff_point_id?: number;
  /** Whether the pass is active */
  is_active?: boolean;
  /** Vehicle license plate number */
  vehicle_license_plate?: string;
  /** Vehicle model */
  vehicle_model?: string;
  /** Warehouse identifier */
  warehouse_id?: number;
}

/**
 * Arrival reason enumeration
 */
export enum ArrivalReason {
  /** FBS delivery */
  FBS_DELIVERY = 'FBS_DELIVERY',
  /** FBS returns pickup */
  FBS_RETURN = 'FBS_RETURN'
}

/**
 * Pass data for creation
 */
export interface PassCreateData {
  /** Driver full name */
  driver_name: string;
  /** Driver phone number */
  driver_phone: string;
  /** Vehicle license plate number */
  vehicle_license_plate: string;
  /** Vehicle model */
  vehicle_model: string;
  /** Whether returns will be picked up */
  with_returns?: boolean;
}

/**
 * Pass data for update
 */
export interface PassUpdateData extends PassCreateData {
  /** Pass identifier */
  id: number;
}