export interface TrackingNumberAssignment {
    posting_number: string;
    tracking_number: string;
}
export interface StatusChangeResult {
    error?: string;
    posting_number?: string;
    result?: boolean;
}
export interface DeliveryInterval {
    begin?: string;
    end?: string;
}
export interface NewTimeslot {
    from: string;
    to: string;
}
