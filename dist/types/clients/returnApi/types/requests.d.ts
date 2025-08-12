export interface GetFbsReturnsInfoRequest {
    filter?: FbsReturnsInfoFilter;
    pagination: FbsReturnsInfoPagination;
}
export interface FbsReturnsInfoFilter {
    place_id?: number;
}
export interface FbsReturnsInfoPagination {
    last_id?: number;
    limit: number;
}
export interface EmptyRequest {
}
export interface ListGiveoutsRequest {
    last_id?: number;
    limit: number;
}
export interface GetGiveoutInfoRequest {
    giveout_id: number;
}
