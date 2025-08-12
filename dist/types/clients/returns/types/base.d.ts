export interface TimeRange {
    time_from?: string;
    time_to?: string;
}
export interface MoneyAmount {
    currency_code?: string;
    price?: string;
}
export interface ReturnPlace {
    id?: string;
    name?: string;
    address?: string;
}
export interface VisualStatus {
    id?: number;
    display_name?: string;
    sys_name?: string;
}
export type ReturnSchema = 'FBO' | 'FBS';
export type ReturnType = 'FullReturn' | 'PartialReturn';
export type VisualStatusName = 'DisputeOpened' | 'OnSellerApproval' | 'ArrivedAtReturnPlace' | 'OnSellerClarification' | 'OnSellerClarificationAfterPartialCompensation' | 'OfferedPartialCompensation' | 'ReturnMoneyApproved' | 'PartialCompensationReturned' | 'CancelledDisputeNotOpen' | 'Rejected' | 'CrmRejected' | 'Cancelled' | 'Approved' | 'ApprovedByOzon' | 'ReceivedBySeller' | 'MovingToSeller' | 'ReturnCompensated' | 'ReturningToSellerByCourier' | 'Utilizing' | 'Utilized' | 'MoneyReturned' | 'PartialCompensationInProcess' | 'DisputeYouOpened' | 'CompensationRejected' | 'DisputeOpening' | 'CompensationOffered' | 'WaitingCompensation' | 'SendingError' | 'CompensationRejectedBySla' | 'CompensationRejectedBySeller' | 'MovingToOzon' | 'ReturnedToOzon' | 'MoneyReturnedBySystem' | 'WaitingShipment';
