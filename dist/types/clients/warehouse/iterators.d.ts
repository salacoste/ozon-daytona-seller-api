import type { WarehouseAPI } from './WarehouseAPI';
import type { IWarehouseDeliveryMethodListRequest, IDeliveryMethodListResponseDeliveryMethod } from '../../types/generated/warehouseapi';
export declare function iterateDeliveryMethods(warehouseAPI: WarehouseAPI, baseParams: Omit<IWarehouseDeliveryMethodListRequest, 'offset'>): AsyncGenerator<IDeliveryMethodListResponseDeliveryMethod, void, unknown>;
