export interface GetTreeRequest {
    readonly language?: 'DEFAULT' | 'RU' | 'EN' | 'TR' | 'ZH_HANS';
}
export interface CategoryTreeItem {
    description_category_id?: number;
    category_name?: string;
    type_id?: number;
    type_name?: string;
    disabled: boolean;
    children: CategoryTreeItem[];
}
export interface GetTreeResponse {
    result: CategoryTreeItem[];
}
