export interface DropOffPoint {
    address?: string;
    box_count?: number;
    id?: number;
    name?: string;
    pass_info?: PassInfo;
    place_id?: number;
    returns_count?: number;
    utc_offset?: string;
}
export interface PassInfo {
    is_required?: boolean;
    pass_info?: string;
}
export interface ReturnGiveout {
    id?: number;
    status?: string;
    created_at?: string;
    updated_at?: string;
    returns_count?: number;
    boxes_count?: number;
}
export interface FileContent {
    content_type?: string;
    file_name?: string;
    file_content?: string;
}
