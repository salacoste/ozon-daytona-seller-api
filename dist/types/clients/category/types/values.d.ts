export interface GetAttributeValuesRequest {
    readonly attribute_id: number;
    readonly description_category_id: number;
    readonly type_id: number;
    readonly language?: 'DEFAULT' | 'RU' | 'EN' | 'TR' | 'ZH_HANS';
    readonly last_value_id?: number;
    readonly limit: number;
}
export interface AttributeValue {
    id: number;
    value: string;
    info?: string;
    picture?: string;
}
export interface GetAttributeValuesResponse {
    result: AttributeValue[];
    has_next?: boolean;
}
export interface SearchAttributeValuesRequest {
    readonly attribute_id: number;
    readonly description_category_id: number;
    readonly type_id: number;
    readonly value: string;
    readonly language?: 'DEFAULT' | 'RU' | 'EN' | 'TR' | 'ZH_HANS';
    readonly limit: number;
}
export interface SearchAttributeValuesResponse {
    result: AttributeValue[];
}
