export type CancellationInitiator = 'OZON' | 'SELLER' | 'CLIENT' | 'SYSTEM' | 'DELIVERY';
export type CancellationStateFilter = 'ALL' | 'ON_APPROVAL' | 'APPROVED' | 'REJECTED';
export type CancellationState = 'ON_APPROVAL' | 'APPROVED' | 'REJECTED';
export interface CancellationReason {
    id?: number;
    name?: string;
}
export interface CancellationStateDetails {
    id?: number;
    name?: string;
    state?: CancellationState;
}
