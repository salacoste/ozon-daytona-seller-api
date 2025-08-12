export interface GetAttributesRequest {
    readonly description_category_id: number;
    readonly type_id: number;
    readonly language?: 'DEFAULT' | 'RU' | 'EN' | 'TR' | 'ZH_HANS';
}
export interface CategoryAttribute {
    id: number;
    attribute_complex_id: number;
    name: string;
    description: string;
    type: string;
    is_collection: boolean;
    is_required: boolean;
    is_aspect: boolean;
    max_value_count: number;
    group_name: string;
    group_id: number;
    dictionary_id: number;
    category_dependent: boolean;
    complex_is_collection: boolean;
}
export interface GetAttributesResponse {
    result: CategoryAttribute[];
}
